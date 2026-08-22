#!/usr/bin/env python3
"""Nenner der TSX-Artikelseiten erheben (Brief W9 Block A Schritt 1).

Die Jobliste aus E44/B1 (`tsx-artikel-2026-08-21.csv`) deckte nur die 14 DE-TSX-
Seiten ab, die damals ohne Bild waren. Fuer W9 wird der volle Nenner gebraucht:
welche TSX-Route ist ein Artikel (Inhalt), welche ist Index/Kategorie/Sonderseite.

Regel, aus dem app/-Baum abgeleitet (nicht geraten):
  Artikel  = statische Route mit genau zwei Segmenten <kategorie>/<slug>
             (DE: app/(de)/<kat>/<slug>/page.tsx, EN: app/en/<kat>/<slug>/page.tsx)
  kein Artikel = dynamische Routen ([kategorie], [slug]), Blog, Startseiten,
             Kategorie-Indexseiten (ein Segment) und Rechtstexte/Sonderseiten
             (agb, datenschutz, impressum, downloads, lernpfad, oesterreich, de,
             support, blog, terms, privacy, imprint, learning-path, austria).

Je Zeile wird zusaetzlich gemessen:
  titel/beschreibung  aus `export const metadata` (title:/description:) — bei
                      'use client'-Seiten aus dem Nachbar-layout.tsx (Spalte meta_datei)
  hinweis             REDIRECT, wenn die Datei router.replace(...) enthaelt
  hat_webp            <ArticleHero> oder .webp im Quelltext UND Datei unter public/
  hat_png             .png/.svg-Bild im Quelltext (Thumbnail statt Hero)
  hat_og              openGraph.images im metadata-Block
  de_pendant          DE-Route laut lib/alternates.ts (nur fuer EN-Zeilen)

Ausgabe: scripts/bilder/tsx-artikel-2026-08-22.csv
Nur Standardbibliothek.
"""
import csv
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(HERE, "tsx-artikel-2026-08-22.csv")
ALT = os.path.join(REPO, "lib", "alternates.ts")

# Ein-Segment-Routen sind Index/Sonderseiten; diese Namen sind zusaetzlich
# als KATEGORIE ausgeschlossen (ihre Unterseiten sind keine Wiki-Artikel).
KEIN_ARTIKEL_KAT = {"blog"}

PAIR_RE = re.compile(r"\[\s*'([^']+)'\s*,\s*'([^']+)'\s*\]")
TITLE_RE = re.compile(r"^\s*title:\s*(['\"`])([\s\S]*?)\1", re.M)
DESC_RE = re.compile(r"^\s*description:\s*\n?\s*(['\"`])([\s\S]*?)\1", re.M)


def routes():
    """(route, lang, kategorie, slug, datei) je statischer 2-Segment-Route."""
    res = []
    for base, lang, prefix in ((os.path.join(REPO, "app", "(de)"), "de", ""),
                               (os.path.join(REPO, "app", "en"), "en", "/en")):
        for root, _d, names in os.walk(base):
            if "page.tsx" not in names:
                continue
            rel = os.path.relpath(root, base)
            if rel == ".":
                continue
            parts = rel.split(os.sep)
            if len(parts) != 2:
                continue
            kat, slug = parts
            if "[" in kat or "[" in slug or kat in KEIN_ARTIKEL_KAT:
                continue
            res.append((f"{prefix}/{kat}/{slug}", lang, kat, slug,
                        os.path.join(root, "page.tsx")))
    res.sort()
    return res


def de_pendants():
    """EN-Route -> DE-Route aus lib/alternates.ts."""
    m = {}
    for de, en in PAIR_RE.findall(open(ALT, encoding="utf-8").read()):
        if en.startswith("/en"):
            m[en] = de
    return m


def meta(src):
    i = src.find("export const metadata")
    block = src[i:i + 2000] if i >= 0 else ""
    t = TITLE_RE.search(block)
    d = DESC_RE.search(block)
    def clean(s):
        s = re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)
        return re.sub(r"\s+", " ", s).replace("\\'", "'").strip()
    return (clean(t.group(2)) if t else "", clean(d.group(2)) if d else "")


def main():
    pend = de_pendants()
    rows = []
    for route, lang, kat, slug, datei in routes():
        src = open(datei, encoding="utf-8").read()
        # 'use client'-Seiten koennen kein `metadata` exportieren; ihr Titel steht
        # im Nachbar-layout.tsx (z. B. app/(de)/compliance/self-assessment/).
        meta_datei = datei
        layout = os.path.join(os.path.dirname(datei), "layout.tsx")
        if "export const metadata" not in src and os.path.isfile(layout):
            meta_datei = layout
            titel, besch = meta(open(layout, encoding="utf-8").read())
        else:
            titel, besch = meta(src)
        hinweis = ""
        rr = re.search(r"router\.replace\(\s*'([^']+)'", src)
        if rr:
            hinweis = f"REDIRECT: router.replace('{rr.group(1)}') — kein Motiv"
        webps = re.findall(r'"(/images/[^"]+\.webp)"', src)
        hat_webp = ""
        for w in webps:
            if os.path.isfile(os.path.join(REPO, "public", w.lstrip("/"))):
                hat_webp = w
                break
        pngs = [p for p in re.findall(r'"(/images/[^"]+\.(?:png|svg|jpg))"', src)
                if "og-image" not in p]
        hat_og = "ja" if re.search(r"openGraph", src) else ""
        rows.append(dict(route=route, lang=lang, kategorie=kat, slug=slug,
                         titel=titel, beschreibung=besch,
                         hat_webp=hat_webp, hat_png=pngs[0] if pngs else "",
                         hat_og=hat_og,
                         de_pendant=pend.get(route, "") if lang == "en" else "",
                         datei=os.path.relpath(datei, REPO),
                         meta_datei=os.path.relpath(meta_datei, REPO), hinweis=hinweis))
    with open(OUT, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=["route", "lang", "kategorie", "slug", "titel",
                                           "beschreibung", "hat_webp", "hat_png", "hat_og",
                                           "de_pendant", "datei", "meta_datei", "hinweis"])
        w.writeheader()
        for r in rows:
            w.writerow(r)
    n_de = sum(1 for r in rows if r["lang"] == "de")
    n_en = sum(1 for r in rows if r["lang"] == "en")
    n_red = sum(1 for r in rows if r["hinweis"])
    n_webp = sum(1 for r in rows if r["hat_webp"])
    n_png = sum(1 for r in rows if r["hat_png"] and not r["hat_webp"])
    n_ohne = sum(1 for r in rows if not r["hat_webp"] and not r["hat_png"] and not r["hinweis"])
    n_pend_fehlt = sum(1 for r in rows if r["lang"] == "en" and not r["de_pendant"])
    print(f"TSX-Artikelseiten gesamt: {len(rows)} (de {n_de} · en {n_en})")
    print(f"  davon Redirect-Stub (kein Motiv): {n_red}")
    print(f"  mit WebP-Hero (Datei existiert):  {n_webp}")
    print(f"  nur PNG/SVG-Bild:                 {n_png}")
    print(f"  ohne jedes Bild:                  {n_ohne}")
    print(f"  EN-Zeilen ohne DE-Pendant laut lib/alternates.ts: {n_pend_fehlt}")
    print(f"geschrieben: {os.path.relpath(OUT, REPO)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
