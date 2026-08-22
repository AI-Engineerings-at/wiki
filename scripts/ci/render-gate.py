#!/usr/bin/env python3
"""Render-Gate für den statischen Export (out/) von wiki.ai-engineering.at.

Prüft ALLE out/**/*.html und schreibt je Prüfung `ist/soll` mit Nenner.
Exit 1 bei jeder Verletzung, Exit 2 wenn gar nichts erhoben werden konnte
(0 HTML-Dateien) — ein Null-Befund ohne Grundgesamtheit gilt nicht als grün.

Die Soll-Zahlen stammen aus der Browser-Abnahme Lauf 3 vom 2026-08-21
(fix/paritaet-2a@444255d, ~/ai-kurse/acceptance/wiki-lauf-2026-08-21-3998-444255d.md).
Weicht eine reine Anzahl (Diagramm-Seiten, Sprach-Verteilung, llms-Ziele)
vom Soll ab, ist das ein FUND und wird ausgegeben, aber kein Gate-Fehler —
das Gate fällt, wenn eine Struktur-Regel verletzt ist (Fehlerseite vorhanden,
Diagramm-Seite ohne Render-Container, falsches lang, Shop-Link, ...).

Was dieses Gate NICHT kann: PlantUML-Diagramme werden im Browser über
kroki.io nachgeladen (components/PlantUMLDiagram.tsx, fetch in useEffect).
Im statischen HTML steht der Render-Container mit dem Lade-Hinweis und die
Diagramm-Quelle (@startuml) im RSC-Payload — nicht das fertige SVG. Ob das
SVG wirklich erscheint, misst nur ein Browser-Lauf. Das `<svg`-Kriterium
aus dem Auftrag wird mitgeführt, ist aber nicht diagnostisch: Kopf- und
Fußzeile (SiteHeader/SiteFooter) enthalten auf jeder Seite Inline-SVG.

Seit 2026-08-21 (gesamt/wiki) zusätzlich [9]–[18]: Favicon-Pixelprobe, theme-color,
ASCII-Umlaute, EN-Shell, MDX-Seitenzahl, Suchindex, Lernpfad, Kopier-Knöpfe,
Tabellen-Wrapper, Titel, tote interne Links im Export. Soll-Zahlen aus
lib/generated/stats.json (scripts/build-index.js).

Seit 2026-08-22 (W8b) [19]: Hero-Bilder. Jede Artikelseite traegt genau ein
<img data-hero="1"> (components/ArticleHero.tsx), und jede Bilddatei, auf die
ein solches img zeigt, liegt wirklich unter out/. Nenner: MDX-Artikelseiten laut
lib/generated/stats.json + die TSX-Artikel aus scripts/bilder/tsx-artikel-2026-08-21.csv
ohne Redirect-Hinweis.

Nur Standardbibliothek.
"""

import csv
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import favicon_pixel_probe as fpp  # noqa: E402  (scripts/ci/favicon_pixel_probe.py, Standardbibliothek)

# --- Soll-Werte (Lauf 3, 444255d) -------------------------------------------
SOLL_DIAGRAMM_SEITEN = 44
SOLL_LANG_EN = 74
SOLL_LANG_DE = 108
# Seit E43 (2026-08-21) kommt die Seitenzahl aus lib/generated/stats.json
# (scripts/build-index.js): TSX + MDX + Blog + MDX-Kategorien = routes_total.
# Fehlt die Datei, gilt der Stand vor E43 (182) als Soll.
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STATS_FILE = os.path.join(REPO, "lib", "generated", "stats.json")
# Jobliste der TSX-Artikel aus E44/B1 — Nenner fuer Pruefung [19] (Hero-Bilder).
TSX_JOBS = os.path.join(REPO, "scripts", "bilder", "tsx-artikel-2026-08-21.csv")
STATS = json.load(open(STATS_FILE, encoding="utf-8")) if os.path.isfile(STATS_FILE) else {}
SOLL_SITEMAP_LOC = STATS.get("routes_total", 182)
SOLL_LLMS_ZIELE = 82

# --- Marker (aus dem Repo, nicht geraten) -----------------------------------
# app/global-error.tsx:14, app/(de)/error.tsx:16, app/en/error.tsx:16
ERROR_BOUNDARY_TEXT = "Etwas ist schiefgelaufen"
# components/PlantUMLDiagram.tsx (Fehlerzweig)
DIAGRAM_ERROR_TEXT = "Diagramm konnte nicht geladen werden"
# components/PlantUMLDynamic.tsx (SSR-Fallback) + PlantUMLDiagram.tsx (loading)
DIAGRAM_CONTAINER_TEXT = "Diagramm wird geladen"
DIAGRAM_CONTAINER_TEXT_EN = "Loading diagram"   # seit W3: Lade-Hinweis in der Sprache der Seite
DIAGRAM_MARKERS = ("@startuml", "kroki.io", 'class="mermaid')
TITLE_DUPLICATE = "| AI Engineering Wiki | AI Engineering Wiki"
# Verkaufs-Muster. Das bloße Wort "stripe"/"gumroad" steht auf 444255d in
# Rechtstexten (AGB, Datenschutz: Zahlungsdienstleister) und in Tutorials
# (API-Key-Rotation, n8n-Webhook) — abgenommen in Lauf 3. Gate-relevant sind
# Links und Kauf-Aufforderungen, nicht die Nennung eines Dienstleisters.
SHOP_PATTERNS = [
    re.compile(r'href="[^"]*/shop(?:[/"?#])'),
    re.compile(r"Produkte &(?:amp;)? Bundles"),
    re.compile(r"Products &(?:amp;)? Bundles"),
    re.compile(r"gumroad\.com"),
    re.compile(r"(?:buy|checkout)\.stripe\.com"),
    re.compile(r"ai-engineering\.at/products"),
]
# Informativ (kein Gate): bloße Wortnennung
SHOP_WORDS = re.compile(r"gumroad|stripe", re.IGNORECASE)
RECHTSSTAND = "2026/1744"
RECHTSSTAND_DATEI = os.path.join("compliance", "ki-kompetenz-art4", "index.html")
PRUEFEN_MARKER = "PRÜFEN"
HTML_LANG_RE = re.compile(r'<html[^>]*\slang="([^"]*)"')
LOC_RE = re.compile(r"<loc>\s*([^<\s]+)\s*</loc>")
LLMS_LINK_RE = re.compile(r"\]\((/[^)\s]*)\)")


def walk_html(out_dir):
    files = []
    for root, _dirs, names in os.walk(out_dir):
        for n in names:
            if n.endswith(".html"):
                files.append(os.path.join(root, n))
    files.sort()
    return files


def read(path):
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        return fh.read()


def rel(path, out_dir):
    return os.path.relpath(path, out_dir)


def main(argv):
    if len(argv) != 2:
        print("usage: render-gate.py <out-dir>", file=sys.stderr)
        return 2
    out_dir = argv[1].rstrip("/")
    if not os.path.isdir(out_dir):
        print(f"FEHLER: {out_dir} ist kein Verzeichnis", file=sys.stderr)
        return 2

    html_files = walk_html(out_dir)
    n_html = len(html_files)
    print(f"== Render-Gate über {out_dir}/ ==")
    print(f"Grundgesamtheit: {n_html} HTML-Dateien laut os.walk({out_dir}/**/*.html)")
    if n_html == 0:
        print("FEHLER: 0 HTML-Dateien — nichts erhoben, kein Befund möglich")
        return 2

    # Geroutete Seiten = index.html ohne Nexts Not-Found-Export (404/index.html).
    # Sonstige HTML (404.html, statische Dateien aus public/) werden gezaehlt
    # und benannt, aber nicht gegen Seiten-Regeln (lang, Sitemap) gehalten:
    # Lauf 1 (087aa1a) zeigte 404.html, 404/index.html und
    # images/kroki-test/compare.html ohne <html lang> — Nexts Not-Found liegt
    # ausserhalb beider Root-Layouts, compare.html ist eine Testdatei in public/.
    pages = [f for f in html_files
             if os.path.basename(f) == "index.html"
             and rel(f, out_dir) != os.path.join("404", "index.html")]
    n_pages = len(pages)
    sonstige = [rel(f, out_dir) for f in html_files if f not in pages]
    print(f"Geroutete Seiten (index.html ohne 404/): {n_pages} von {n_html} HTML-Dateien; "
          f"sonstige {len(sonstige)}: {sonstige}")

    verletzungen = []
    funde = []
    contents = {f: read(f) for f in html_files}

    # 1. Fehlerseiten -------------------------------------------------------
    err_pages = [rel(f, out_dir) for f, c in contents.items() if ERROR_BOUNDARY_TEXT in c]
    diag_err_pages = [rel(f, out_dir) for f, c in contents.items() if DIAGRAM_ERROR_TEXT in c]
    print(f"[1] Fehlerseiten ('{ERROR_BOUNDARY_TEXT}'): ist {len(err_pages)} / soll 0 "
          f"von {n_html} HTML")
    print(f"[1] Diagramm-Fehlertext ('{DIAGRAM_ERROR_TEXT}'): ist {len(diag_err_pages)} / soll 0 "
          f"von {n_html} HTML")
    if err_pages:
        verletzungen.append(f"Fehlerseiten: {err_pages}")
    if diag_err_pages:
        verletzungen.append(f"Diagramm-Fehlertext: {diag_err_pages}")

    # 2. Diagramm-Seiten ----------------------------------------------------
    diag_pages = [f for f, c in contents.items() if any(m in c for m in DIAGRAM_MARKERS)]
    n_diag = len(diag_pages)
    ohne_container = [rel(f, out_dir) for f in diag_pages
                      if DIAGRAM_CONTAINER_TEXT not in contents[f] and DIAGRAM_CONTAINER_TEXT_EN not in contents[f]]
    ohne_svg = [rel(f, out_dir) for f in diag_pages
                if "<svg" not in contents[f] and "kroki.io" not in contents[f]]
    print(f"[2] Diagramm-Seiten (Marker {DIAGRAM_MARKERS}): ist {n_diag} / soll "
          f"{SOLL_DIAGRAMM_SEITEN} von {n_html} HTML")
    print(f"[2] davon mit Render-Container ('{DIAGRAM_CONTAINER_TEXT}' / '{DIAGRAM_CONTAINER_TEXT_EN}'): "
          f"ist {n_diag - len(ohne_container)} / soll {n_diag} von {n_diag}")
    print(f"[2] davon mit <svg oder kroki.io-Quelle: ist {n_diag - len(ohne_svg)} / soll {n_diag} "
          f"von {n_diag} (nicht diagnostisch: Kopf-/Fußzeile tragen Inline-SVG; "
          f"Kroki-SVG entsteht erst im Browser)")
    if n_diag != SOLL_DIAGRAMM_SEITEN:
        funde.append(f"Diagramm-Seiten {n_diag} statt {SOLL_DIAGRAMM_SEITEN} (Fund, kein Gate-Fehler)")
    if ohne_container:
        verletzungen.append(f"Diagramm-Seiten ohne Render-Container: {ohne_container}")
    if ohne_svg:
        verletzungen.append(f"Diagramm-Seiten ohne <svg/kroki.io: {ohne_svg}")

    # 3. <html lang> --------------------------------------------------------
    en_prefix = os.path.join(out_dir, "en") + os.sep
    en_files = [f for f in pages if f.startswith(en_prefix)]
    de_files = [f for f in pages if not f.startswith(en_prefix)]

    def lang_of(f):
        m = HTML_LANG_RE.search(contents[f])
        return m.group(1) if m else None
    lang_falsch = []
    for files, soll in ((en_files, "en"), (de_files, "de")):
        for f in files:
            got = lang_of(f)
            if got != soll:
                lang_falsch.append(f"{rel(f, out_dir)}: lang={got!r}")
    n_en_ok = sum(1 for f in en_files if lang_of(f) == "en")
    n_de_ok = sum(1 for f in de_files if lang_of(f) == "de")
    print(f"[3] <html lang=\"en\"> unter {out_dir}/en/: ist {n_en_ok} / soll {len(en_files)} "
          f"von {len(en_files)} Seiten (Soll-Anzahl Lauf 3: {SOLL_LANG_EN})")
    print(f"[3] <html lang=\"de\"> sonst: ist {n_de_ok} / soll {len(de_files)} "
          f"von {len(de_files)} Seiten (Soll-Anzahl Lauf 3: {SOLL_LANG_DE})")
    sonstige_ohne_lang = [rel(f, out_dir) for f in html_files
                          if f not in pages and lang_of(f) is None]
    print(f"[3] informativ, kein Gate — sonstige HTML ohne <html lang>: "
          f"{len(sonstige_ohne_lang)} von {len(sonstige)}: {sonstige_ohne_lang}")
    if lang_falsch:
        verletzungen.append(f"lang falsch/fehlt: {lang_falsch}")
    if len(en_files) != SOLL_LANG_EN or len(de_files) != SOLL_LANG_DE:
        funde.append(f"Seiten-Verteilung en/de {len(en_files)}/{len(de_files)} statt "
                     f"{SOLL_LANG_EN}/{SOLL_LANG_DE} (Fund, kein Gate-Fehler)")

    # 4. Titel ---------------------------------------------------------------
    title_dup = [rel(f, out_dir) for f, c in contents.items() if TITLE_DUPLICATE in c]
    print(f"[4] Titel mit '{TITLE_DUPLICATE}': ist {len(title_dup)} / soll 0 von {n_html} HTML")
    if title_dup:
        verletzungen.append(f"Titel-Doppelung: {title_dup}")

    # 5. Shop-Muster ---------------------------------------------------------
    shop_hits = []
    for f, c in contents.items():
        for p in SHOP_PATTERNS:
            n = len(p.findall(c))
            if n:
                shop_hits.append(f"{rel(f, out_dir)}: {p.pattern} x{n}")
    shop_word_files = [rel(f, out_dir) for f, c in contents.items() if SHOP_WORDS.search(c)]
    print(f"[5] Shop-Muster ({len(SHOP_PATTERNS)} Muster: /shop-Link, Produkte/Products & Bundles, "
          f"gumroad.com, buy/checkout.stripe.com, ai-engineering.at/products): "
          f"ist {len(shop_hits)} / soll 0 Treffer über {n_html} HTML")
    print(f"[5] informativ, kein Gate — Dateien mit bloßem Wort gumroad|stripe: "
          f"{len(shop_word_files)} von {n_html} HTML: {shop_word_files}")
    if shop_hits:
        verletzungen.append(f"Shop-Muster: {shop_hits}")

    # 6. Rechtsstand ---------------------------------------------------------
    rs_path = os.path.join(out_dir, RECHTSSTAND_DATEI)
    if os.path.isfile(rs_path):
        n_rs = contents.get(rs_path, read(rs_path)).count(RECHTSSTAND)
        print(f"[6] Rechtsstand '{RECHTSSTAND}' in {RECHTSSTAND_DATEI}: ist {n_rs} / soll >= 1")
        if n_rs < 1:
            verletzungen.append(f"Rechtsstand {RECHTSSTAND} fehlt in {RECHTSSTAND_DATEI}")
    else:
        print(f"[6] Rechtsstand: {RECHTSSTAND_DATEI} FEHLT unter {out_dir}/")
        verletzungen.append(f"Datei fehlt: {RECHTSSTAND_DATEI}")

    # 7. PRÜFEN-Marker ---------------------------------------------------------
    pruefen = [rel(f, out_dir) for f, c in contents.items() if PRUEFEN_MARKER in c]
    print(f"[7] '{PRUEFEN_MARKER}'-Marker: ist {len(pruefen)} / soll 0 von {n_html} HTML")
    if pruefen:
        verletzungen.append(f"PRÜFEN-Marker: {pruefen}")

    # 8. Sitemap + llms.txt ----------------------------------------------------
    sm_path = os.path.join(out_dir, "sitemap.xml")
    if os.path.isfile(sm_path):
        locs = LOC_RE.findall(read(sm_path))
        n_loc = len(locs)
        print(f"[8] sitemap.xml <loc>: ist {n_loc} / soll {SOLL_SITEMAP_LOC} "
              f"(geroutete Seiten im Export: {n_pages})")
        if n_loc != SOLL_SITEMAP_LOC:
            verletzungen.append(f"sitemap.xml: {n_loc} <loc> statt {SOLL_SITEMAP_LOC}")
        if n_loc != n_pages:
            verletzungen.append(f"sitemap.xml: {n_loc} <loc> vs. {n_pages} geroutete Seiten")
    else:
        print(f"[8] sitemap.xml FEHLT unter {out_dir}/")
        verletzungen.append("sitemap.xml fehlt")

    llms_path = os.path.join(out_dir, "llms.txt")
    if os.path.isfile(llms_path):
        raw_links = LLMS_LINK_RE.findall(read(llms_path))
        targets = sorted(set(raw_links))
        missing = []
        for t in targets:
            t_clean = t.split("#", 1)[0].split("?", 1)[0]
            p = os.path.join(out_dir, t_clean.lstrip("/"))
            if t_clean.endswith("/") or not os.path.splitext(t_clean)[1]:
                cand = os.path.join(p, "index.html")
            else:
                cand = p
            if not os.path.isfile(cand):
                missing.append(t)
        print(f"[8] llms.txt: {len(raw_links)} Links roh / {len(targets)} eindeutig; "
              f"als Datei unter {out_dir}/ vorhanden: ist {len(targets) - len(missing)} / "
              f"soll {len(targets)} von {len(targets)} (Soll-Anzahl Lauf 3: {SOLL_LLMS_ZIELE})")
        if missing:
            verletzungen.append(f"llms.txt-Ziele ohne Datei: {missing}")
        if len(targets) != SOLL_LLMS_ZIELE:
            funde.append(f"llms.txt-Ziele {len(targets)} statt {SOLL_LLMS_ZIELE} (Fund, kein Gate-Fehler)")
    else:
        print(f"[8] llms.txt FEHLT unter {out_dir}/")
        verletzungen.append("llms.txt fehlt")

    # 9. Favicon deckend (W1) ---------------------------------------------------
    FAVICONS = ["favicon-16x16.png", "favicon-32x32.png", "favicon.ico", "apple-touch-icon.png",
                "android-chrome-192x192.png", "android-chrome-512x512.png"]
    fav_ok = 0
    fav_bilder = 0
    fav_fehler = []
    for name in FAVICONS:
        fp = os.path.join(out_dir, name)
        if not os.path.isfile(fp):
            fav_fehler.append(f"{name}: fehlt")
            continue
        try:
            imgs = fpp.images_in(open(fp, "rb").read())
        except Exception as exc:  # Dekodierfehler ist ein Befund, kein Absturz
            fav_fehler.append(f"{name}: nicht dekodierbar ({exc})")
            continue
        for label, w, h, px in imgs:
            fav_bilder += 1
            corners, n_ring, n_transp, n_light, center = fpp.measure(w, h, px)
            dunkel_mitte = center[3] >= 128 and (center[0] + center[1] + center[2]) / 3 < 160
            if n_light == 0 and all(c[3] == 255 for c in corners) and dunkel_mitte:
                fav_ok += 1
            else:
                fav_fehler.append(f"{name} ({label} {w}x{h}): Ecken {corners}, Ring {n_light} von {n_ring} transparent/hell, Mitte {center}")
    print(f"[9] Favicon deckend (4 Ecken Alpha 255, Randring 1-2 px 0 transparent/hell, Mitte dunkel): "
          f"ist {fav_ok} / soll {fav_bilder} Bilder in {len(FAVICONS)} Dateien (favicon.ico zählt 2)")
    if fav_fehler or fav_bilder < 7:
        verletzungen.append(f"Favicon: {fav_fehler or 'weniger als 7 Bilder: ' + str(fav_bilder)}")

    # 10. theme-color (W1) -------------------------------------------------------
    tc = [f for f in pages if 'name="theme-color" content="#020617"' in contents[f]]
    print(f"[10] <meta name=\"theme-color\" content=\"#020617\">: ist {len(tc)} / soll {n_pages} von {n_pages} Seiten")
    if len(tc) != n_pages:
        verletzungen.append(f"theme-color fehlt auf {n_pages - len(tc)} Seiten: "
                            f"{[rel(f, out_dir) for f in pages if f not in tc][:10]}")

    # 11. ASCII-Umlaute (W2): die 12 Strings aus der Fundliste ------------------
    UMLAUT_STRINGS = ["Joerg Fuchs", "Oesterreich", "Ueber mich", "Zuletzt geprueft", "Fuer die Umsetzung",
                      "Weiterfuehrende Artikel", "Daten schuetzt", "Schritt fuer Schritt", "EDPS Guidelines fuer KI",
                      "Aufsichtsbehoerden", "fuer DACH-KMUs", "Wissen ueber lokale KI"]
    um_hits = {}
    for f in pages:
        c = contents[f]
        for u in UMLAUT_STRINGS:
            n = c.count(u)
            if n:
                um_hits.setdefault(u, []).append(f"{rel(f, out_dir)} x{n}")
    n_um = sum(len(v) for v in um_hits.values())
    print(f"[11] ASCII-Umlaut-Strings ({len(UMLAUT_STRINGS)} aus der Fundliste 21.08.): ist {n_um} / soll 0 Treffer über {n_pages} Seiten")
    if um_hits:
        verletzungen.append(f"ASCII-Umlaute: { {k: v[:3] for k, v in um_hits.items()} }")
    # informativ: generische ASCII-Umlaut-Wörter im sichtbaren Text (ohne Code-Blöcke, ohne Attribute)
    generic = re.compile(r"\b(?:[Ff]uer|[Uu]eber|[Ss]chuetz\w*|[Pp]ruef\w*|[Oo]esterreich\w*|[Gg]epruef\w*|[Ff]uehr\w*|[Mm]oeglich\w*|[Zz]usaetzlich\w*)\b")
    gen_pages = 0
    gen_hits = 0
    for f in pages:
        body = re.sub(r"<pre[\s\S]*?</pre>|<script[\s\S]*?</script>|<[^>]+>", " ", contents[f])
        n = len(generic.findall(body))
        if n:
            gen_pages += 1
            gen_hits += n
    print(f"[11] informativ, kein Gate — generische ASCII-Umlaut-Wörter im Text (ohne <pre>/<script>/Attribute): "
          f"{gen_hits} Treffer auf {gen_pages} von {n_pages} Seiten")

    # 12. EN-Shell (W3): deutsche Shell-Strings auf /en/ ---------------------------
    EN_SHELL_DE = ["Artikel suchen", "War dieser Artikel hilfreich", "Weiter lernen", "Wiki durchsuchen",
                   "Verwandte Artikel", "Diagramm wird geladen", "Auf GitHub bearbeiten", "Über mich",
                   "Zum Lernpfad", "Alle Grundlagen", "Hauptnavigation", "Zum Inhalt springen"]
    en_hits = {}
    for f in en_files:
        for u in EN_SHELL_DE:
            if u in contents[f]:
                en_hits.setdefault(u, []).append(rel(f, out_dir))
    print(f"[12] deutsche Shell-Strings auf {out_dir}/en/ ({len(EN_SHELL_DE)} Strings): "
          f"ist {sum(len(v) for v in en_hits.values())} / soll 0 Treffer über {len(en_files)} EN-Seiten")
    if en_hits:
        verletzungen.append(f"EN-Shell deutsch: { {k: v[:3] for k, v in en_hits.items()} }")
    gh = [rel(f, out_dir) for f in html_files if "github.com/AI-Engineering-at/wiki/edit" in contents[f]]
    print(f"[12] GitHub-Edit-Links: ist {len(gh)} / soll 0 von {n_html} HTML")
    if gh:
        verletzungen.append(f"GitHub-Edit-Links: {gh[:5]}")

    # 13. MDX-Artikel (W4, E43): Seiten mit Wissensklassen-Zeile --------------------
    soll_mdx = STATS.get("mdx")
    wk = [f for f in pages if 'data-wissensklasse="generiert"' in contents[f]]
    wk_text = [f for f in wk if ("redaktionell nicht geprüft" in contents[f] or "not editorially reviewed" in contents[f])]
    print(f"[13] MDX-Seiten mit Wissensklassen-Kopf (data-wissensklasse): ist {len(wk)} / soll "
          f"{soll_mdx if soll_mdx is not None else '— (stats.json fehlt)'} von {n_pages} Seiten; "
          f"davon mit Text 'redaktionell nicht geprüft'/'not editorially reviewed': {len(wk_text)} / soll {len(wk)}")
    if soll_mdx is not None and len(wk) != soll_mdx:
        verletzungen.append(f"MDX-Seiten: {len(wk)} statt {soll_mdx}")
    if len(wk_text) != len(wk):
        verletzungen.append("Wissensklassen-Zeile ohne Text auf " + str(len(wk) - len(wk_text)) + " Seiten")
    soll_pages = STATS.get("routes_total")
    print(f"[13] geroutete Seiten gesamt: ist {n_pages} / soll {soll_pages if soll_pages else '— (stats.json fehlt)'} "
          f"(TSX {STATS.get('tsx', '—')} + MDX {STATS.get('mdx', '—')} + Blog {STATS.get('blog', '—')} + "
          f"MDX-Kategorien {STATS.get('mdx_categories_de', 0) + STATS.get('mdx_categories_en', 0)})")
    if soll_pages and n_pages != soll_pages:
        verletzungen.append(f"Seitenzahl {n_pages} statt {soll_pages}")

    # 14. Suchindex (W6) ------------------------------------------------------------
    si_path = os.path.join(out_dir, "search-index.json")
    if os.path.isfile(si_path):
        si = json.load(open(si_path, encoding="utf-8"))
        entries = si.get("entries", [])
        omni = [e["h"] for e in entries if "omnibus" in (e.get("w", "") + " " + e.get("d", "")).lower()]
        en_n = sum(1 for e in entries if e.get("l") == "en")
        blog_n = sum(1 for e in entries if e.get("c") == "blog")
        print(f"[14] search-index.json: ist {len(entries)} Einträge / soll >= 540 (EN {en_n}, Blog {blog_n}); "
              f"'omnibus' findet {len(omni)} Einträge, darunter /compliance/ki-kompetenz-art4: "
              f"{'ja' if '/compliance/ki-kompetenz-art4' in omni else 'NEIN'}")
        if len(entries) < 540:
            verletzungen.append(f"Suchindex {len(entries)} < 540")
        if "/compliance/ki-kompetenz-art4" not in omni:
            verletzungen.append("Suchindex: 'omnibus' findet /compliance/ki-kompetenz-art4 nicht")
    else:
        print(f"[14] search-index.json FEHLT unter {out_dir}/")
        verletzungen.append("search-index.json fehlt")

    # 15. Lernpfad (W5) --------------------------------------------------------------
    soll_lp = STATS.get("lernpfad_einheiten", 18)
    for lp_rel in (os.path.join("lernpfad", "index.html"), os.path.join("en", "learning-path", "index.html")):
        lp = os.path.join(out_dir, lp_rel)
        if not os.path.isfile(lp):
            print(f"[15] {lp_rel} FEHLT")
            verletzungen.append(f"{lp_rel} fehlt")
            continue
        c = contents.get(lp, read(lp))
        n_e = c.count("data-lernpfad-einheit=")
        hub = "https://hub.ai-engineering.at/" in c
        print(f"[15] {lp_rel}: Einheiten ist {n_e} / soll {soll_lp}; Hub-Link: {'ja' if hub else 'NEIN'}; "
              f"Kopfzeile: {'ja' if 'data-lernpfad-kopfzeile' in c else 'NEIN'}")
        if n_e != soll_lp or not hub:
            verletzungen.append(f"Lernpfad {lp_rel}: {n_e} Einheiten, Hub {hub}")
    # Einheit 18 zeigt auf den Hub: am Ziel messen, nicht nur im HTML suchen.
    try:
        import urllib.request
        req = urllib.request.Request("https://hub.ai-engineering.at/", headers={"User-Agent": "wiki-render-gate"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            hub_code = resp.status
        print(f"[15] Hub-Ziel https://hub.ai-engineering.at/ antwortet: HTTP {hub_code} / soll 200")
        if hub_code != 200:
            verletzungen.append(f"Hub-Ziel antwortet HTTP {hub_code}")
    except Exception as exc:
        print(f"[15] Hub-Ziel https://hub.ai-engineering.at/: UNVERIFIED ({exc}) — Netz vom Runner aus nicht erreichbar, kein Gate-Fehler")
        funde.append(f"Hub-Ziel nicht messbar: {exc}")
    weiter = [f for f in pages if 'data-lernpfad-weiter="1"' in contents[f]]
    soll_weiter = STATS.get("lernpfad_weiter_soll", 33)
    print(f"[15] Artikel mit 'Weiter im Lernpfad'-Kasten: ist {len(weiter)} / soll {soll_weiter} "
          f"(Artikel-Einheiten mit DE-Seite + mit EN-Seite laut lernpfad.yaml)")
    if len(weiter) != soll_weiter:
        verletzungen.append(f"Lernpfad-Weiter-Kasten auf {len(weiter)} statt {soll_weiter} Seiten")

    # 16. Struktur (W7): Kopier-Knöpfe, Tabellen, Titel ------------------------------
    n_pre = sum(len(re.findall(r"<pre[\s>]", contents[f])) for f in pages)
    n_copy = sum(contents[f].count('data-copy="1"') for f in pages)
    print(f"[16] Kopier-Knöpfe (data-copy): ist {n_copy} / soll {n_pre} = Zahl der <pre>-Blöcke über {n_pages} Seiten")
    if n_copy != n_pre:
        diff_pages = [rel(f, out_dir) for f in pages
                      if len(re.findall(r"<pre[\s>]", contents[f])) != contents[f].count('data-copy="1"')][:8]
        verletzungen.append(f"Kopier-Knöpfe {n_copy} != <pre> {n_pre}; z. B. {diff_pages}")
    n_tab = 0
    n_tab_ohne = 0
    tab_ohne_pages = []
    for f in pages:
        c = contents[f]
        for m in re.finditer(r"<table[\s>]", c):
            n_tab += 1
            before = c[max(0, m.start() - 160):m.start()]
            if "table-wrap" not in before and "overflow-x-auto" not in before:
                n_tab_ohne += 1
                if rel(f, out_dir) not in tab_ohne_pages:
                    tab_ohne_pages.append(rel(f, out_dir))
    print(f"[16] Tabellen ohne Scroll-Wrapper (table-wrap/overflow-x-auto in den 160 Zeichen davor): "
          f"ist {n_tab_ohne} / soll 0 von {n_tab} Tabellen")
    if n_tab_ohne:
        verletzungen.append(f"Tabellen ohne Wrapper: {n_tab_ohne}, z. B. {tab_ohne_pages[:6]}")
    title_re = re.compile(r"<title>([^<]*)</title>")
    ohne_titel = []
    for f in pages:
        m = title_re.search(contents[f])
        t = m.group(1) if m else ""
        r = rel(f, out_dir)
        if r in ("index.html", os.path.join("en", "index.html"), os.path.join("de", "index.html")):
            continue  # Startseiten tragen den Site-Titel als eigenen Titel
        if not t or ("|" not in t and " — " not in t):
            ohne_titel.append(f"{r}: {t!r}")
    print(f"[16] Seiten ohne eigenen <title> (kein '|'-Suffix, Startseiten ausgenommen): ist {len(ohne_titel)} / soll 0 von {n_pages}")
    if ohne_titel:
        verletzungen.append(f"ohne Titel: {ohne_titel[:8]}")

    # 17. Interne Links im Export (0 tote) ---------------------------------------------
    href_re = re.compile(r'href="(/[^"#?]*)')
    dead = {}
    n_links = 0
    for f in pages:
        for m in href_re.finditer(contents[f]):
            t = m.group(1)
            if t.startswith("/_next/") or t.startswith("//"):
                continue
            n_links += 1
            p = os.path.join(out_dir, t.lstrip("/"))
            ok = (os.path.isfile(p) or os.path.isfile(os.path.join(p, "index.html"))
                  or os.path.isfile(p.rstrip("/") + ".html"))
            if not ok:
                dead.setdefault(t, []).append(rel(f, out_dir))
    print(f"[17] interne Links (href=\"/…\") im Export: ist {len(dead)} tote Ziele / soll 0 von {n_links} Links über {n_pages} Seiten")
    if dead:
        verletzungen.append("tote interne Links: " + str({k: v[:2] for k, v in list(dead.items())[:10]}))

    # 18. Sprachumschalter ohne Pendant (informativ) --------------------------------------
    n_missing = sum(1 for f in pages if 'data-lang-missing="1"' in contents[f])
    print(f"[18] informativ, kein Gate — Seiten ohne Pendant in der anderen Sprache (Umschalter deaktiviert): "
          f"{n_missing} von {n_pages}")
    n_hreflang = sum(1 for f in pages if 'hreflang="en"' in contents[f])
    print(f"[18] informativ — Seiten mit hreflang: {n_hreflang} von {n_pages}")

    # 19. Hero-Bilder (W8b, E44) -----------------------------------------------------
    hero_re = re.compile(r'<img[^>]*\sdata-hero="1"[^>]*>')
    src_re = re.compile(r'\ssrc="([^"]+)"')
    heroes = {f: hero_re.findall(contents[f]) for f in pages}
    n_hero_pages = sum(1 for f in pages if heroes[f])
    mehrfach = [f"{rel(f, out_dir)}: {len(heroes[f])}" for f in pages if len(heroes[f]) > 1]
    print(f"[19] Seiten mit Hero-Bild (<img data-hero=\"1\">): ist {n_hero_pages} von {n_pages} Seiten")
    print(f"[19] Seiten mit MEHR als einem Hero-Bild: ist {len(mehrfach)} / soll 0 von {n_pages} Seiten")
    if mehrfach:
        verletzungen.append(f"mehr als ein Hero-Bild: {mehrfach[:8]}")

    # 19a: MDX-Artikelseiten (Marker aus [13]) — jede genau eines
    mdx_ohne = [rel(f, out_dir) for f in wk if not heroes[f]]
    print(f"[19] MDX-Artikelseiten mit Hero: ist {len(wk) - len(mdx_ohne)} / soll {len(wk)} "
          f"von {len(wk)} Seiten mit Wissensklassen-Kopf "
          f"(Soll laut stats.json: {soll_mdx if soll_mdx is not None else '—'})")
    if mdx_ohne:
        verletzungen.append(f"MDX-Artikelseiten ohne Hero-Bild: {len(mdx_ohne)}, z. B. {mdx_ohne[:6]}")

    # 19b: TSX-Artikel aus der E44-Jobliste (ohne Redirect-Seiten)
    tsx_soll = []
    tsx_redirect = []
    if os.path.isfile(TSX_JOBS):
        with open(TSX_JOBS, newline="", encoding="utf-8") as fh:
            for r in csv.DictReader(fh):
                if r.get("hinweis", "").startswith("REDIRECT"):
                    tsx_redirect.append(f"{r['kategorie']}/{r['slug']}")
                    continue
                tsx_soll.append(os.path.join(r["kategorie"], r["slug"], "index.html"))
        tsx_ohne = []
        tsx_fehlt = []
        for relp in tsx_soll:
            f = os.path.join(out_dir, relp)
            if f not in contents:
                tsx_fehlt.append(relp)
            elif not hero_re.search(contents[f]):
                tsx_ohne.append(relp)
        print(f"[19] TSX-Artikelseiten mit Hero: ist {len(tsx_soll) - len(tsx_ohne) - len(tsx_fehlt)} / "
              f"soll {len(tsx_soll)} von {len(tsx_soll)} laut scripts/bilder/tsx-artikel-2026-08-21.csv "
              f"(+{len(tsx_redirect)} Redirect-Seiten ohne Motiv, ausgenommen: {tsx_redirect})")
        if tsx_ohne:
            verletzungen.append(f"TSX-Artikelseiten ohne Hero-Bild: {tsx_ohne}")
        if tsx_fehlt:
            verletzungen.append(f"TSX-Artikelseiten aus der Jobliste nicht im Export: {tsx_fehlt}")
    else:
        print(f"[19] {TSX_JOBS} fehlt — TSX-Teil UNVERIFIED")
        funde.append("tsx-artikel-2026-08-21.csv fehlt: TSX-Hero-Nenner nicht pruefbar")

    # 19c: jede Hero-Datei existiert wirklich unter out/
    n_hero_img = 0
    hero_fehlt = {}
    for f in pages:
        for tag in heroes[f]:
            n_hero_img += 1
            m = src_re.search(tag)
            if not m:
                hero_fehlt.setdefault("<img ohne src>", []).append(rel(f, out_dir))
                continue
            src = m.group(1)
            if src.startswith("http"):
                hero_fehlt.setdefault(src, []).append(rel(f, out_dir))
                continue
            if not os.path.isfile(os.path.join(out_dir, src.lstrip("/"))):
                hero_fehlt.setdefault(src, []).append(rel(f, out_dir))
    print(f"[19] Hero-Bilder mit existierender Datei unter {out_dir}/: "
          f"ist {n_hero_img - sum(len(v) for v in hero_fehlt.values())} / soll {n_hero_img} "
          f"von {n_hero_img} Hero-<img> ueber {n_hero_pages} Seiten")
    if hero_fehlt:
        verletzungen.append("Hero-Bilddatei fehlt im Export: "
                            + str({k: v[:2] for k, v in list(hero_fehlt.items())[:10]}))

    # 19d: informativ — Kategorie-Thumbnails (components/CategoryList.tsx)
    n_thumb = sum(contents[f].count('data-thumb="1"') for f in pages)
    thumb_re = re.compile(r'<img[^>]*\sdata-thumb="1"[^>]*>')
    thumb_fehlt = set()
    for f in pages:
        for tag in thumb_re.findall(contents[f]):
            m = src_re.search(tag)
            if m and not os.path.isfile(os.path.join(out_dir, m.group(1).lstrip("/"))):
                thumb_fehlt.add(m.group(1))
    print(f"[19] Kategorie-Thumbnails (data-thumb): {n_thumb} ueber {n_pages} Seiten; "
          f"ohne Datei unter {out_dir}/: {len(thumb_fehlt)} / soll 0")
    if thumb_fehlt:
        verletzungen.append(f"Thumbnail-Datei fehlt im Export: {sorted(thumb_fehlt)[:8]}")

    # --- Bilanz ---------------------------------------------------------------
    print("== Bilanz ==")
    for f in funde:
        print(f"FUND: {f}")
    for v in verletzungen:
        print(f"VERLETZUNG: {v}")
    print(f"Verletzungen: {len(verletzungen)} · Funde: {len(funde)} · "
          f"Grundgesamtheit {n_html} HTML / {n_pages} Seiten")
    if verletzungen:
        print("RENDER-GATE: ROT")
        return 1
    print("RENDER-GATE: GRÜN")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
