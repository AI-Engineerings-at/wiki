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

Nur Standardbibliothek.
"""

import os
import re
import sys

# --- Soll-Werte (Lauf 3, 444255d) -------------------------------------------
SOLL_DIAGRAMM_SEITEN = 44
SOLL_LANG_EN = 74
SOLL_LANG_DE = 108
SOLL_SITEMAP_LOC = 182   # harte Regel laut Auftrag W1; bei neuer Seite hier bewusst anheben
SOLL_LLMS_ZIELE = 82

# --- Marker (aus dem Repo, nicht geraten) -----------------------------------
# app/global-error.tsx:14, app/(de)/error.tsx:16, app/en/error.tsx:16
ERROR_BOUNDARY_TEXT = "Etwas ist schiefgelaufen"
# components/PlantUMLDiagram.tsx (Fehlerzweig)
DIAGRAM_ERROR_TEXT = "Diagramm konnte nicht geladen werden"
# components/PlantUMLDynamic.tsx (SSR-Fallback) + PlantUMLDiagram.tsx (loading)
DIAGRAM_CONTAINER_TEXT = "Diagramm wird geladen"
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
                      if DIAGRAM_CONTAINER_TEXT not in contents[f]]
    ohne_svg = [rel(f, out_dir) for f in diag_pages
                if "<svg" not in contents[f] and "kroki.io" not in contents[f]]
    print(f"[2] Diagramm-Seiten (Marker {DIAGRAM_MARKERS}): ist {n_diag} / soll "
          f"{SOLL_DIAGRAMM_SEITEN} von {n_html} HTML")
    print(f"[2] davon mit Render-Container ('{DIAGRAM_CONTAINER_TEXT}'): "
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
