#!/usr/bin/env python3
"""Hero + og:image in jede TSX-Artikelseite verdrahten (Brief W9 Block A Schritt 4).

Gegenstueck zu scripts/bilder/verdrahten-2026-08-22.py (das die 377 MDX-Artikel
ueber das Frontmatter-Feld `image:` bedient). TSX-Seiten holen ihr Bild nicht aus
einem Frontmatter, sondern tragen es zweimal im Quelltext:

  1. `<ArticleHero src=… alt=… />` als erstes Kind der Wurzel-<div> (components/
     ArticleHero.tsx, Messpunkt `data-hero="1"` fuer Pruefung [19] im Render-Gate)
  2. `openGraph.images[0].url` im `export const metadata`-Block — bei
     'use client'-Seiten im Nachbar-layout.tsx (Spalte meta_datei der CSV)

So machen es die 12 Seiten, die es am 2026-08-22 schon hatten (E44/B1); dieses
Skript zieht die restlichen nach. Nenner und Zuordnung kommen aus
scripts/bilder/tsx-artikel-2026-08-22.csv (scripts/bilder/tsx-inventar.py).

Kein Platzhalter (NN3): eine Seite wird nur verdrahtet, wenn die WebP-Datei
wirklich unter public/ liegt. Fehlt sie, ist das ein FEHLER mit Pfad, kein
stiller Ersatz durch og-image.png.

Idempotent. Nur Standardbibliothek.

Aufruf aus dem Repo-Wurzelverzeichnis:
  python3 scripts/bilder/tsx-verdrahten-2026-08-22.py --pruefen   # nur zaehlen
  python3 scripts/bilder/tsx-verdrahten-2026-08-22.py             # schreiben
"""
import argparse
import csv
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
CSV_DATEI = os.path.join(HERE, "tsx-artikel-2026-08-22.csv")

IMPORT_ZEILE = "import { ArticleHero } from '../../../../components/ArticleHero'"
DEFAULT_RE = re.compile(r"export default function [\w]+\([^)]*\)\s*\{")
# Die Wurzel-<div> der Standard-Ausfuhr: erstes `return (` auf Funktionsrumpf-Ebene
# NACH `export default function` — nicht das return einer Hilfskomponente darueber
# (app/en/tools/ai-tools-database/page.tsx hat drei return-Bloecke).
ROOT_RE = re.compile(r"(^  return \(\s*\n)(\s*)(<div[^\n]*>)\n", re.M)
META_RE = re.compile(r"(export const metadata(?::\s*\w+)?\s*=\s*\{)")
OG_IMAGES_RE = re.compile(r"(openGraph\s*:\s*\{)([\s\S]{0,400}?)\n(\s*)\}")
OG_URL_RE = re.compile(r"(images\s*:\s*\[\s*\{\s*url:\s*)'[^']*'")


def hero_pfad(r):
    return f"/images/hero-2026-08/{r['lang']}/{r['kategorie']}/{r['slug']}.webp"


def og_block(hero, einzug):
    return (f"{einzug}openGraph: {{\n"
            f"{einzug}  type: 'article',\n"
            f"{einzug}  images: [{{ url: '{hero}', width: 1344, height: 768, type: 'image/webp' }}],\n"
            f"{einzug}}},\n")


def js_string(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


def setze_hero(src, hero, titel):
    """<ArticleHero> als erstes Kind der Wurzel-<div>; Import ergaenzen."""
    if "data-hero" in src:
        return src, "html-hero-direkt"
    if "<ArticleHero" in src:
        # schon verdrahtet: nur den Pfad korrigieren, falls er abweicht
        neu = re.sub(r'(<ArticleHero\s+src=)"[^"]*"', r'\g<1>"' + hero + '"', src, count=1)
        return neu, "schon"
    d = DEFAULT_RE.search(src)
    if not d:
        return src, "FEHLER: keine `export default function` gefunden"
    m = ROOT_RE.search(src, d.end())
    if not m:
        return src, "FEHLER: keine Wurzel-<div> im return gefunden"
    einzug = m.group(2) + "  "
    tag = (f"{einzug}<ArticleHero src=\"{hero}\" alt={{{js_string(titel)}}} />\n")
    src = src[:m.end()] + tag + src[m.end():]
    if "components/ArticleHero" not in src:
        # Nach der letzten Import-Zeile des KOPF-Blocks einsetzen — nicht nach dem
        # letzten `import` der Datei: Code-Beispiele im Fliesstext enthalten Python-
        # Zeilen wie `import sqlite3` (6 von 109 Seiten, gemessen 2026-08-22), und
        # ein Import mitten in einem Template-String ist ein Syntaxfehler.
        p = 0
        for zeile in src.split("\n"):
            if zeile.startswith(("import ", "'use client'", '"use client"')) or not zeile.strip():
                p += len(zeile) + 1
                if zeile.startswith("import "):
                    kopf_ende = p
            else:
                break
        kopf_ende = locals().get("kopf_ende", 0)
        if kopf_ende:
            src = src[:kopf_ende] + IMPORT_ZEILE + "\n" + src[kopf_ende:]
        else:
            src = IMPORT_ZEILE + "\n" + src
    return src, "gesetzt"


def setze_og(src, hero):
    """openGraph.images auf das Hero-WebP setzen (anlegen, wenn nicht vorhanden)."""
    if "openGraph" in src:
        if re.search(r"images\s*:\s*\[", src):
            neu, n = OG_URL_RE.subn(r"\g<1>'" + hero + "'", src, count=1)
            return neu, ("schon" if neu == src else "korrigiert")
        m = OG_IMAGES_RE.search(src)
        if not m:
            return src, "FEHLER: openGraph ohne images und ohne erkennbares Ende"
        einzug = m.group(3)
        zeile = (f"\n{einzug}  images: [{{ url: '{hero}', width: 1344, height: 768,"
                 f" type: 'image/webp' }}],")
        return src[:m.end(2)] + zeile + src[m.end(2):], "gesetzt"
    m = META_RE.search(src)
    if not m:
        return src, "FEHLER: kein `export const metadata`-Block"
    return src[:m.end()] + "\n" + og_block(hero, "  ") + src[m.end():].lstrip("\n"), "gesetzt"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pruefen", action="store_true")
    a = ap.parse_args()

    rows = list(csv.DictReader(open(CSV_DATEI, newline="", encoding="utf-8")))
    zaehler = {"hero_gesetzt": 0, "hero_schon": 0, "og_gesetzt": 0, "og_korrigiert": 0,
               "og_schon": 0, "redirect": 0, "ohne_datei": 0}
    fehler = []
    for r in rows:
        if r["hinweis"].startswith("REDIRECT"):
            zaehler["redirect"] += 1
            continue
        hero = hero_pfad(r)
        if not os.path.isfile(os.path.join(REPO, "public", hero.lstrip("/"))):
            zaehler["ohne_datei"] += 1
            fehler.append(f"{r['route']}: keine Datei unter public{hero}")
            continue
        # 1) Hero in page.tsx
        pfad = os.path.join(REPO, r["datei"])
        src = open(pfad, encoding="utf-8").read()
        neu, st = setze_hero(src, hero, r["titel"])
        if st.startswith("FEHLER"):
            fehler.append(f"{r['route']} ({r['datei']}): {st}")
        else:
            zaehler["hero_gesetzt" if st == "gesetzt" else "hero_schon"] += 1
            if neu != src and not a.pruefen:
                open(pfad, "w", encoding="utf-8").write(neu)
        # 2) og:image im metadata-Traeger
        mpfad = os.path.join(REPO, r["meta_datei"])
        msrc = open(mpfad, encoding="utf-8").read() if mpfad != pfad else (neu if not a.pruefen else src)
        mneu, mst = setze_og(msrc, hero)
        if mst.startswith("FEHLER"):
            fehler.append(f"{r['route']} ({r['meta_datei']}): {mst}")
        else:
            zaehler["og_" + mst] += 1
            if mneu != msrc and not a.pruefen:
                open(mpfad, "w", encoding="utf-8").write(mneu)

    print(f"TSX-Artikelseiten laut {os.path.relpath(CSV_DATEI, REPO)}: {len(rows)}")
    for k, v in zaehler.items():
        print(f"  {k:14s} {v}")
    print(f"  fehler         {len(fehler)}")
    for z in fehler[:25]:
        print("FEHLER", z)
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
