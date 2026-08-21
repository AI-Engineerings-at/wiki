#!/usr/bin/env python3
"""Hero-Motive je Wiki-Artikel aus ComfyUI (E44, Brief B1, TASK-2026-00894).

Nur Standardbibliothek. Liest das Wiki-Inventar (379 MDX) und die 14 TSX-Artikel
ohne Bild, baut je Slug einen Workflow (flux1-schnell-fp8, 1344x768, 4 Schritte),
sendet ihn seriell an ComfyUI, holt das PNG, prueft es (Groesse > 20 KB,
1344x768 laut IHDR, kein Fehler in /history), wandelt es mit cwebp (bereits auf
dem Mac vorhanden, kein Install) nach WebP und legt es unter
public/images/hero-2026-08/<lang>/<kategorie>/<slug>.webp ab.

EN-MDX mit DE-Zwilling (gleicher Slug, gespiegelte Kategorie) bekommen KEIN eigenes
Motiv, sondern eine echte Kopie der DE-Datei (statischer Export, kein Symlink).

Protokoll: scripts/bilder/protokoll-2026-08-21.csv, eine Zeile je Ziel-Datei
(slug, lang, kategorie, prompt_hash, seed, dauer_s, bytes, status).
status: ok | kopie-von-de | fehlt (mit Grund) | uebersprungen (Redirect-Seite).
Fehlschlaege werden einmal mit seed+1 wiederholt; nie ein Platzhalterbild (NN3).

Aufruf (aus dem Repo-Wurzelverzeichnis):
  python3 scripts/bilder/comfy-hero.py --limit 1          # Positivkontrolle
  python3 scripts/bilder/comfy-hero.py --limit 6          # die naechsten 5
  python3 scripts/bilder/comfy-hero.py                    # Rest
  python3 scripts/bilder/comfy-hero.py --plan             # nur Jobliste zaehlen
Bereits vorhandene, gueltige Zieldateien werden uebersprungen (wiederaufnehmbar).
"""
import argparse
import csv
import hashlib
import json
import os
import shutil
import struct
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid

COMFY = os.environ.get("COMFY_URL", "http://10.40.10.90:8188")
GUARD = os.environ.get("VRAM_GUARD_URL", "http://10.40.10.90:8190")
OWNER = "bild-agent"
CKPT = "flux1-schnell-fp8.safetensors"
W, H = 1344, 768
STEPS, CFG, SAMPLER, SCHED = 4, 1.0, "euler", "simple"
MIN_BYTES = 20 * 1024
MAX_WEBP = 200 * 1024

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT_ROOT = os.path.join(REPO, "public", "images", "hero-2026-08")
PROTOKOLL = os.path.join(HERE, "protokoll-2026-08-21.csv")
INVENTAR = os.path.expanduser("~/ai-kurse/doc/WIKI-INVENTAR-2026-08-21.csv")
TSX = os.path.join(HERE, "tsx-artikel-2026-08-21.csv")

STYLE = (
    "Abstract technical hero illustration, deep dark navy background almost black, "
    "luminous electric blue light, a few sparse neon mint green highlights, "
    "minimalist, clean geometry, cinematic depth of field, soft volumetric glow, "
    "high detail, no text, no letters, no typography, no logo, no watermark, "
    "no people, no faces."
)
NEGATIVE = "text, letters, words, watermark, logo, signature, face, person, blurry, low quality"

# Ein Motiv je Kategorie-Familie (Brief B1). DE- und EN-Kategorienamen.
MOTIV = {
    "tools": "interlocking precise tool geometry, machined metal shapes, gears and rails",
    "ai-tools": "interlocking precise tool geometry, floating modular instruments",
    "konzepte": "a glowing network graph of nodes and edges floating in space",
    "concepts": "a glowing network graph of nodes and edges floating in space",
    "compliance": "a layered shield and seal made of concentric rings and facets",
    "tutorials": "ascending steps of glowing building blocks, a path of cubes",
    "papers": "stacked translucent pages fanning out into a light spectrum",
    "vergleiche": "two contrasting geometric forms facing each other, split composition",
    "comparisons": "two contrasting geometric forms facing each other, split composition",
    "grundlagen": "foundation layers, stacked slabs and simple primitive solids",
    "architektur": "isometric wireframe structure, blueprint lines, scaffolding",
    "architecture": "isometric wireframe structure, blueprint lines, scaffolding",
    "mlops": "a pipeline of glowing cylinders and conveyors, flowing data streams",
    "patterns": "a repeating tessellation of modular tiles, interlocking pattern",
    "sicherheit": "a lock geometry inside a hexagonal mesh, layered barriers",
    "security": "a lock geometry inside a hexagonal mesh, layered barriers",
    "ethik": "a balanced scale, two orbs in equilibrium",
    "ethics": "a balanced scale, two orbs in equilibrium",
    "skills": "small geometric modules fitting together like puzzle pieces",
    "kategorien": "a grid of glowing tiles sorted into cells",
    "categories": "a grid of glowing tiles sorted into cells",
}
DE2EN = {
    "konzepte": "concepts", "vergleiche": "comparisons", "sicherheit": "security",
    "architektur": "architecture", "ethik": "ethics", "kategorien": "categories",
}


def log(msg):
    print(time.strftime("%H:%M:%S"), msg, flush=True)


def http(url, data=None, timeout=30):
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"} if data else {})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def seed_for(slug):
    return int(hashlib.sha256(slug.encode("utf-8")).hexdigest()[:12], 16)


def trim_words(text, n):
    words = text.split()
    return " ".join(words[:n])


def build_prompt(kategorie, titel, beschreibung):
    motiv = MOTIV.get(kategorie, "abstract geometric composition of glowing primitives")
    subject = trim_words(f"{titel}. {beschreibung}", 60)
    return f"{STYLE} Subject: {motiv}. Theme: {subject}"


def workflow(prompt, seed, prefix):
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CKPT}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["1", 1]}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"text": NEGATIVE, "clip": ["1", 1]}},
        "4": {"class_type": "EmptySD3LatentImage", "inputs": {"width": W, "height": H, "batch_size": 1}},
        "5": {"class_type": "KSampler", "inputs": {
            "model": ["1", 0], "positive": ["2", 0], "negative": ["3", 0], "latent_image": ["4", 0],
            "seed": seed, "steps": STEPS, "cfg": CFG, "sampler_name": SAMPLER, "scheduler": SCHED, "denoise": 1.0}},
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": prefix}},
    }


def png_size(path):
    with open(path, "rb") as f:
        head = f.read(24)
    if head[:8] != b"\x89PNG\r\n\x1a\n" or head[12:16] != b"IHDR":
        return None
    return struct.unpack(">II", head[16:24])


def webp_size(path):
    """Masse aus dem RIFF/WebP-Header (VP8, VP8L, VP8X)."""
    with open(path, "rb") as f:
        d = f.read(40)
    if d[:4] != b"RIFF" or d[8:12] != b"WEBP":
        return None
    chunk = d[12:16]
    if chunk == b"VP8X":
        w = 1 + int.from_bytes(d[24:27], "little")
        h = 1 + int.from_bytes(d[27:30], "little")
        return w, h
    if chunk == b"VP8L":
        b = d[21:25]
        w = 1 + (((b[1] & 0x3F) << 8) | b[0])
        h = 1 + (((b[3] & 0x0F) << 10) | (b[2] << 2) | ((b[1] & 0xC0) >> 6))
        return w, h
    if chunk == b"VP8 ":
        w = int.from_bytes(d[26:28], "little") & 0x3FFF
        h = int.from_bytes(d[28:30], "little") & 0x3FFF
        return w, h
    return None


def generate_one(prompt, seed, prefix, tmpdir):
    """Sendet den Workflow, wartet auf /history, holt das PNG. Gibt (png_path, fehler)."""
    client = str(uuid.uuid4())
    body = json.dumps({"prompt": workflow(prompt, seed, prefix), "client_id": client}).encode()
    try:
        resp = json.loads(http(f"{COMFY}/prompt", body))
    except urllib.error.HTTPError as e:
        return None, f"prompt HTTP {e.code}: {e.read()[:300]!r}"
    except Exception as e:  # noqa: BLE001
        return None, f"prompt: {e}"
    if "prompt_id" not in resp:
        return None, f"prompt ohne id: {json.dumps(resp)[:300]}"
    pid = resp["prompt_id"]
    deadline = time.time() + 300
    while time.time() < deadline:
        time.sleep(1.0)
        try:
            hist = json.loads(http(f"{COMFY}/history/{pid}"))
        except Exception:  # noqa: BLE001
            continue
        if pid not in hist:
            continue
        entry = hist[pid]
        st = entry.get("status", {})
        if st.get("status_str") == "error":
            msgs = [m for m in st.get("messages", []) if m and m[0] == "execution_error"]
            return None, f"history error: {json.dumps(msgs)[:400]}"
        images = []
        for node_out in entry.get("outputs", {}).values():
            images.extend(node_out.get("images", []))
        if images:
            im = images[0]
            q = urllib.parse.urlencode({"filename": im["filename"], "subfolder": im.get("subfolder", ""), "type": im.get("type", "output")})
            data = http(f"{COMFY}/view?{q}", timeout=120)
            p = os.path.join(tmpdir, im["filename"])
            with open(p, "wb") as f:
                f.write(data)
            return p, ""
        if st.get("completed"):
            return None, "history completed ohne Bild"
    return None, "timeout 300 s ohne /history-Ergebnis"


def to_webp(png, webp):
    os.makedirs(os.path.dirname(webp), exist_ok=True)
    for q in (82, 72, 62):
        r = subprocess.run(["cwebp", "-quiet", "-q", str(q), "-m", "6", png, "-o", webp], capture_output=True, text=True)
        if r.returncode != 0:
            return f"cwebp rc={r.returncode}: {r.stderr[:200]}"
        if os.path.getsize(webp) <= MAX_WEBP:
            return ""
    return ""  # groesser als 200 KB bleibt erlaubt, wird im Protokoll sichtbar (bytes)


def valid_target(path):
    if not os.path.isfile(path) or os.path.getsize(path) < MIN_BYTES:
        return False
    return webp_size(path) == (W, H)


def load_jobs():
    """Jobliste: (lang, kategorie, slug, titel, beschreibung, quelle, redirect_hinweis)."""
    jobs = []
    with open(INVENTAR, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["sprache"] not in ("de", "en"):
                continue  # 2 Blog-MDX: nicht im Auftrag
            jobs.append(dict(lang=r["sprache"], kategorie=r["kategorie"], slug=r["slug"],
                             titel=r["titel"], beschreibung=r["beschreibung"], quelle="mdx", hinweis=""))
    with open(TSX, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            jobs.append(dict(lang=r["sprache"], kategorie=r["kategorie"], slug=r["slug"],
                             titel=r["titel"], beschreibung=r["beschreibung"], quelle="tsx", hinweis=r["hinweis"]))
    # Zwillinge: EN-Eintrag mit gleichem Slug und gespiegelter Kategorie -> Kopie der DE-Datei
    by_key = {(j["lang"], j["kategorie"], j["slug"]): j for j in jobs}
    for j in jobs:
        j["twin"] = None
        j["twin_text"] = None
        if j["lang"] == "en":
            de_kat = next((d for d, e in DE2EN.items() if e == j["kategorie"]), j["kategorie"])
            de = by_key.get(("de", de_kat, j["slug"]))
            if de:
                j["twin"] = de
    for j in jobs:
        if j["lang"] == "de":
            en = by_key.get(("en", DE2EN.get(j["kategorie"], j["kategorie"]), j["slug"]))
            if en:
                j["twin_text"] = en  # englischer Titel/Summary fuer den Prompt
    # Reihenfolge: DE zuerst (damit Kopien ihre Quelle finden), dann EN
    jobs.sort(key=lambda j: (j["lang"] != "de", j["kategorie"], j["slug"]))
    return jobs


def target_path(j):
    return os.path.join(OUT_ROOT, j["lang"], j["kategorie"], f"{j['slug']}.webp")


def protokoll_append(row):
    new = not os.path.exists(PROTOKOLL)
    with open(PROTOKOLL, "a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if new:
            w.writerow(["slug", "lang", "kategorie", "prompt_hash", "seed", "dauer_s", "bytes", "status"])
        w.writerow(row)


def protokoll_done():
    done = set()
    if os.path.exists(PROTOKOLL):
        with open(PROTOKOLL, newline="", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                if r["status"] in ("ok", "kopie-von-de", "uebersprungen"):
                    done.add((r["lang"], r["kategorie"], r["slug"]))
    return done


def guard_wait_and_register(max_wait=1800):
    """Wartet, solange der Guard gesperrt ist (fremder Lock), traegt dann eine Lease ein."""
    t0 = time.time()
    while True:
        try:
            st = json.loads(http(f"{GUARD}/status", timeout=10))
        except Exception as e:  # noqa: BLE001
            log(f"guard /status nicht erreichbar: {e} — weiter ohne Guard-Lock (Lease wird trotzdem versucht)")
            st = {"locked": False}
        if not st.get("locked") or st.get("owner") == OWNER:
            break
        if time.time() - t0 > max_wait:
            return None, f"BLOCKED: Guard gesperrt von {st.get('owner')} ({st.get('job')}) seit > {max_wait} s"
        log(f"guard gesperrt von {st.get('owner')} — warte 60 s")
        time.sleep(60)
    try:
        body = json.dumps({"owner": OWNER, "job": "hero-2026-08 Wiki-Motive (Brief B1, TASK-2026-00894)",
                           "ttl": 3 * 3600, "model": CKPT, "host": "10.40.10.90"}).encode()
        resp = json.loads(http(f"{GUARD}/lease/register", body, timeout=10))
        return resp.get("lease_id") or resp.get("lease", {}).get("lease_id"), ""
    except Exception as e:  # noqa: BLE001
        log(f"lease/register fehlgeschlagen: {e}")
        return None, ""


def guard_release():
    try:
        resp = http(f"{GUARD}/lease/release", json.dumps({"owner": OWNER}).encode(), timeout=10)
        log(f"lease/release: {resp[:200]!r}")
    except Exception as e:  # noqa: BLE001
        log(f"lease/release fehlgeschlagen: {e}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="hoechstens n noch offene Ziele bearbeiten")
    ap.add_argument("--only", default="", help="nur diesen Slug")
    ap.add_argument("--plan", action="store_true", help="nur zaehlen, nichts erzeugen")
    ap.add_argument("--no-guard", action="store_true")
    a = ap.parse_args()

    jobs = load_jobs()
    n_de = sum(1 for j in jobs if j["lang"] == "de")
    n_en = sum(1 for j in jobs if j["lang"] == "en")
    n_copy = sum(1 for j in jobs if j["twin"])
    n_redirect = sum(1 for j in jobs if j["hinweis"].startswith("REDIRECT"))
    log(f"Ziele {len(jobs)} (de {n_de} · en {n_en}); davon Kopie-von-DE {n_copy}, Redirect {n_redirect}, "
        f"zu erzeugen {len(jobs) - n_copy - n_redirect}")
    done = protokoll_done()
    todo = [j for j in jobs if (j["lang"], j["kategorie"], j["slug"]) not in done and not valid_target(target_path(j))]
    if a.only:
        todo = [j for j in todo if j["slug"] == a.only]
    if a.limit:
        todo = todo[:a.limit]
    log(f"offen {len(todo)} von {len(jobs)} (protokolliert-ok {len(done)})")
    if a.plan:
        for j in todo[:5]:
            print(build_prompt(j["kategorie"], *(
                (j["twin_text"]["titel"], j["twin_text"]["beschreibung"]) if j["twin_text"] else (j["titel"], j["beschreibung"]))))
        return 0
    if not todo:
        return 0

    lease_id = None
    if not a.no_guard:
        lease_id, err = guard_wait_and_register()
        if err:
            log(err)
            return 2
        log(f"lease {lease_id}")

    tmpdir = tempfile.mkdtemp(prefix="comfy-hero-")
    ok = fail = 0
    try:
        for i, j in enumerate(todo, 1):
            key = f"{j['lang']}/{j['kategorie']}/{j['slug']}"
            tgt = target_path(j)
            t0 = time.time()
            if j["hinweis"].startswith("REDIRECT"):
                protokoll_append([j["slug"], j["lang"], j["kategorie"], "", "", 0, 0, f"uebersprungen: {j['hinweis']}"])
                log(f"[{i}/{len(todo)}] {key} uebersprungen (Redirect)")
                continue
            if j["twin"]:
                src = target_path(j["twin"])
                if valid_target(src):
                    os.makedirs(os.path.dirname(tgt), exist_ok=True)
                    shutil.copyfile(src, tgt)
                    protokoll_append([j["slug"], j["lang"], j["kategorie"], "", seed_for(j["slug"]), 0, os.path.getsize(tgt), "kopie-von-de"])
                    ok += 1
                    log(f"[{i}/{len(todo)}] {key} kopie-von-de ({os.path.getsize(tgt)} B)")
                else:
                    protokoll_append([j["slug"], j["lang"], j["kategorie"], "", "", 0, 0, "fehlt: DE-Zwilling ohne gueltige Datei"])
                    fail += 1
                    log(f"[{i}/{len(todo)}] {key} fehlt: DE-Zwilling {src} ungueltig")
                continue
            src_text = j["twin_text"] or j
            prompt = build_prompt(j["kategorie"], src_text["titel"], src_text["beschreibung"])
            phash = hashlib.sha256(prompt.encode("utf-8")).hexdigest()[:12]
            base_seed = seed_for(j["slug"])
            status = ""
            size = 0
            for attempt, seed in enumerate((base_seed, base_seed + 1)):
                prefix = f"hero-2026-08/{j['lang']}-{j['kategorie']}-{j['slug']}"
                png, err = generate_one(prompt, seed, prefix, tmpdir)
                if err:
                    status = f"fehlt: {err}"
                    log(f"[{i}/{len(todo)}] {key} Versuch {attempt + 1}: {err}")
                    continue
                dims = png_size(png)
                pbytes = os.path.getsize(png)
                if dims != (W, H) or pbytes < MIN_BYTES:
                    status = f"fehlt: PNG {dims} {pbytes} B"
                    log(f"[{i}/{len(todo)}] {key} Versuch {attempt + 1}: {status}")
                    os.remove(png)
                    continue
                err = to_webp(png, tgt)
                os.remove(png)
                if err:
                    status = f"fehlt: {err}"
                    continue
                if not valid_target(tgt):
                    status = f"fehlt: WebP ungueltig {webp_size(tgt)} {os.path.getsize(tgt)} B"
                    os.remove(tgt)
                    continue
                size = os.path.getsize(tgt)
                status = "ok"
                break
            dur = round(time.time() - t0, 1)
            protokoll_append([j["slug"], j["lang"], j["kategorie"], phash, seed, dur, size, status])
            if status == "ok":
                ok += 1
            else:
                fail += 1
            log(f"[{i}/{len(todo)}] {key} {status} seed={seed} {dur}s {size} B")
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)
        if not a.no_guard:
            guard_release()
    log(f"Ergebnis dieses Laufs: ok {ok} · fehlt {fail} von {len(todo)}")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
