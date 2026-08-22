#!/usr/bin/env python3
"""Hero-Bilder verdrahten (Brief W8b Schritt 3, E44).

Setzt in jedem MDX-Artikel unter content/de|en/<kategorie>/<slug>.mdx das
Frontmatter-Feld `image: /images/hero-2026-08/<lang>/<kategorie>/<slug>.webp`
— aber nur, wenn dort noch kein `image:` steht, und nur, wenn die WebP-Datei
wirklich existiert (kein Platzhalter, NN3).

Warum als Skript und nicht von Hand: 377 Dateien, und das Feld muss so stehen,
dass der EIGENE Frontmatter-Leser es findet (lib/content.ts + scripts/build-index.js,
YAML-Teilmenge `^([\\w-]+):\\s*(.*)$`) — nicht js-yaml: 15 von 406 Frontmatter-
Bloecke sind kein gueltiges YAML (W4). Deshalb wird die Zeile als letzte Zeile
des Frontmatter-Blocks eingefuegt: dort beendet sie eine offene `- item`-Liste
sauber (der Leser setzt listKey bei jedem `key:`-Treffer zurueck) und kann in
keinen mehrzeiligen Wert hineinfallen.

content/blog/ bleibt unberuehrt: fuer die 29 Blog-Beitraege wurde in E44/B1 kein
Motiv erzeugt (Auftrag waren 391 Artikel-Ziele = 377 MDX + 14 TSX), es gaebe also
keine Datei zum Verdrahten.

Idempotent. Nur Standardbibliothek.

Aufruf aus dem Repo-Wurzelverzeichnis:
  python3 scripts/bilder/verdrahten-2026-08-22.py --pruefen   # nur zaehlen
  python3 scripts/bilder/verdrahten-2026-08-22.py             # schreiben
"""
import argparse
import glob
import os
import re
import sys

FM = re.compile(r"^---\r?\n([\s\S]*?)\r?\n---\r?\n?", re.M)
HAT_IMAGE = re.compile(r"^image:\s*\S", re.M)


def ziel(pfad):
    _, lang, kategorie, name = pfad.split("/")
    return f"/images/hero-2026-08/{lang}/{kategorie}/{name[:-4]}.webp"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pruefen", action="store_true")
    a = ap.parse_args()

    dateien = []
    for lang in ("de", "en"):
        dateien += sorted(glob.glob(f"content/{lang}/*/*.mdx"))
    blog = sorted(glob.glob("content/blog/*.md") + glob.glob("content/blog/*.mdx"))

    gesetzt = schon = ohne_datei = ohne_fm = 0
    fehler = []
    for f in dateien:
        raw = open(f, encoding="utf-8").read()
        m = FM.match(raw)
        if not m:
            ohne_fm += 1
            fehler.append(f"{f}: kein Frontmatter-Block")
            continue
        if HAT_IMAGE.search(m.group(1)):
            schon += 1
            continue
        rel = ziel(f)
        if not os.path.isfile(rel.lstrip("/").replace("images/", "public/images/", 1)):
            ohne_datei += 1
            fehler.append(f"{f}: keine Datei unter public{rel}")
            continue
        if a.pruefen:
            gesetzt += 1
            continue
        kopf = m.group(1).rstrip("\n")
        neu = f"---\n{kopf}\nimage: {rel}\n---\n" + raw[m.end():]
        open(f, "w", encoding="utf-8").write(neu)
        gesetzt += 1

    print(f"MDX-Artikel (content/de|en/<kat>/<slug>.mdx): {len(dateien)}")
    print(f"  image: gesetzt        {gesetzt}")
    print(f"  hatte schon ein image {schon}")
    print(f"  ohne WebP-Datei       {ohne_datei}")
    print(f"  ohne Frontmatter      {ohne_fm}")
    print(f"Blog (content/blog/): {len(blog)} — bewusst NICHT verdrahtet "
          f"(kein Motiv erzeugt, E44/B1 deckte 377 MDX + 14 TSX ab)")
    print(f"Nenner gesamt: {len(dateien) + len(blog)} MDX/MD im Repo")
    for z in fehler[:20]:
        print("FEHLER", z)
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
