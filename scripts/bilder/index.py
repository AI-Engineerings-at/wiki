#!/usr/bin/env python3
"""Schreibt scripts/bilder/INDEX-2026-08-21.md aus dem Protokoll und den Dateien
unter public/images/hero-2026-08/. Nur Standardbibliothek. Jede Zahl mit Nenner.
Aufruf: python3 scripts/bilder/index.py [--sha <sha7>]
"""
import argparse
import collections
import csv
import os
import subprocess
import time

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT_ROOT = os.path.join(REPO, "public", "images", "hero-2026-08")
PROTOKOLL = os.path.join(HERE, "protokoll-2026-08-21.csv")
INDEX = os.path.join(HERE, "INDEX-2026-08-21.md")
SOLL = 391


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sha", default="")
    a = ap.parse_args()
    rows = list(csv.DictReader(open(PROTOKOLL, newline="", encoding="utf-8")))
    # letzte Zeile je Ziel gewinnt (Wiederaufnahme)
    last = {}
    for r in rows:
        last[(r["lang"], r["kategorie"], r["slug"])] = r
    st = collections.Counter("ok" if r["status"] == "ok" else r["status"].split(":")[0] for r in last.values())
    files = []
    for root, _, names in os.walk(OUT_ROOT):
        for n in names:
            if n.endswith(".webp"):
                files.append(os.path.join(root, n))
    total_bytes = sum(os.path.getsize(f) for f in files)
    gen = [r for r in last.values() if r["status"] == "ok"]
    dauer = sum(float(r["dauer_s"] or 0) for r in gen)
    big = [r for r in gen if int(r["bytes"] or 0) > 200 * 1024]
    per_lang = collections.Counter((r["lang"], "ok" if r["status"] == "ok" else r["status"].split(":")[0]) for r in last.values())
    fehlt = [r for r in last.values() if r["status"].startswith("fehlt")]
    ueber = [r for r in last.values() if r["status"].startswith("uebersprungen")]
    sha = a.sha or subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=REPO, capture_output=True, text=True).stdout.strip()

    L = []
    L.append("# Hero-Motive 2026-08 — Index (Brief B1, E44, TASK-2026-00894)\n")
    L.append(f"Stand: {time.strftime('%Y-%m-%d %H:%M')} · `gesamt/bilder@{sha}` · Quelle: `scripts/bilder/protokoll-2026-08-21.csv` "
             f"({len(rows)} Zeilen, {len(last)} Ziele) + `ls public/images/hero-2026-08/**/*.webp` ({len(files)} Dateien)\n")
    L.append("| Maß | ist | soll |\n|---|---|---|")
    L.append(f"| Ziele protokolliert | {len(last)} von {SOLL} | 391 (377 MDX + 14 TSX) |")
    L.append(f"| `status=ok` (erzeugt aus ComfyUI) | {st.get('ok', 0)} von {SOLL} | — |")
    L.append(f"| `status=kopie-von-de` (EN mit DE-Zwilling, echte Kopie) | {st.get('kopie-von-de', 0)} von {SOLL} | — |")
    L.append(f"| ok + kopie | {st.get('ok', 0) + st.get('kopie-von-de', 0)} von {SOLL} | ≥ 370 |")
    L.append(f"| `status=uebersprungen` (Redirect-Seiten) | {len(ueber)} von {SOLL} | mit Grund |")
    L.append(f"| `status=fehlt` | {len(fehlt)} von {SOLL} | mit Grund |")
    L.append(f"| WebP-Dateien auf Platte | {len(files)} | = ok + kopie |")
    L.append(f"| Gesamtgröße | {total_bytes / 1024 / 1024:.1f} MB | — |")
    L.append(f"| Ø Größe je Datei | {total_bytes / max(len(files), 1) / 1024:.0f} KB | ≤ 200 KB |")
    L.append(f"| Dateien > 200 KB | {len(big)} von {len(gen)} erzeugten | 0 |")
    L.append(f"| Erzeugungsdauer (Summe dauer_s der ok-Zeilen) | {dauer / 60:.1f} min | — |")
    L.append("")
    L.append("## Je Sprache\n")
    L.append("| lang | ok | kopie-von-de | uebersprungen | fehlt |\n|---|---|---|---|---|")
    for lang in ("de", "en"):
        L.append(f"| {lang} | {per_lang.get((lang, 'ok'), 0)} | {per_lang.get((lang, 'kopie-von-de'), 0)} | "
                 f"{per_lang.get((lang, 'uebersprungen'), 0)} | {per_lang.get((lang, 'fehlt'), 0)} |")
    L.append("")
    L.append("## Was fehlt, mit Grund\n")
    if not fehlt and not ueber:
        L.append("—")
    for r in ueber + fehlt:
        L.append(f"- `{r['lang']}/{r['kategorie']}/{r['slug']}` — {r['status']}")
    L.append("")
    L.append("## Beispiele (Pfad unter `public/images/hero-2026-08/`)\n")
    seen = set()
    for r in sorted(gen, key=lambda r: (r["kategorie"], r["slug"])):
        if r["kategorie"] in seen:
            continue
        seen.add(r["kategorie"])
        L.append(f"- `{r['lang']}/{r['kategorie']}/{r['slug']}.webp` — seed {r['seed']}, {int(r['bytes']) // 1024} KB, {r['dauer_s']} s")
    L.append("")
    L.append("## Erzeugung\n")
    L.append("ComfyUI `10.40.10.90:8188` (v0.18.1, RTX 3090) · `flux1-schnell-fp8.safetensors` über `CheckpointLoaderSimple` · "
             "`EmptySD3LatentImage` 1344×768 · KSampler 4 Schritte, cfg 1.0, euler/simple · Seed = sha256(slug)[:12] · "
             "PNG → `cwebp -q 82/72/62 -m 6` · Gate: > 20 KB, 1344×768 (IHDR + RIFF), kein `/history`-Fehler; 1 Wiederholung mit Seed+1.\n")
    L.append("Prompt = Stil-Präfix (dunkel, elektrisch-blau, sparsam neon-mint, keine Schrift/Gesichter/Logos) + Motiv je Kategorie-Familie "
             "+ Titel + Summary (≤ 60 Wörter; für DE-Artikel mit EN-Zwilling der englische Text, sonst der deutsche). "
             "Negativ-Prompt ist verdrahtet, wirkt bei cfg 1.0 aber nicht — der Stil-Präfix trägt das Verbot.\n")
    L.append("Nicht erledigt von diesem Skript: Verdrahtung der Bilder in MDX-Frontmatter/TSX (Wiki-Bauer, W8); OG-Bilder; "
             "ComfyUI-Ausgabeordner auf `.90` (`output/hero-2026-08/`) enthält die PNG-Originale — Aufräumen dort ist Brains Hoheit.\n")
    with open(INDEX, "w", encoding="utf-8") as f:
        f.write("\n".join(L) + "\n")
    print("\n".join(L[:16]))


if __name__ == "__main__":
    main()
