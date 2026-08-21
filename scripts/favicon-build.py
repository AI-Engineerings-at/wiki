#!/usr/bin/env python3
"""
Favicon-Satz mit deckendem Grund #020617 — 7 von 7 Dateien, bis in alle vier Ecken.

Befund (Joes Augen, 2026-08-21 §1): favicon-16/32, favicon.ico (beide Groessen)
und android-chrome-192/512 hatten 4 transparente Ecken und 228 von 240
Randpixeln transparent. Auf einem hellen Tab-Streifen wird jedes transparente
Pixel weiss — das ist der weisse Rand, den Joe meldet. Nur apple-touch-icon
war deckend (P9d). Die Commit-Kette P9 -> P9c hatte den Grund wieder entfernt.

Dieses Skript legt das V2-Hexagon (scripts/favicon-varianten/erzeuge-varianten.py,
Rendering A fuer 512/192/180/32, Rendering B fuer 16) auf ein vollflaechiges
#020617-Quadrat — Alpha ueberall 255 — und schreibt:

  public/favicon-16x16.png · favicon-32x32.png · favicon.ico (16+32, PNG
  eingebettet) · apple-touch-icon.png · android-chrome-192x192.png ·
  android-chrome-512x512.png

Reine Standardbibliothek (zlib, struct). Beweis: scripts/ci/favicon_pixel_probe.py
im Render-Gate — 0 transparente oder helle Randpixel je Datei.

Aufruf:  python3 scripts/favicon-build.py
"""

import importlib.util
import os
import sys

HIER = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HIER)


def lade(name, pfad):
    spec = importlib.util.spec_from_file_location(name, pfad)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


fh = lade('fh', os.path.join(HIER, 'favicon-hintergrund.py'))
ev = lade('ev', os.path.join(HIER, 'favicon-varianten', 'erzeuge-varianten.py'))

ZIELE = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
}


def main():
    public = os.path.join(ROOT, 'public')
    marke = ev.lade_marke()
    n = ev.N
    gross, _ = ev.v2_hexagon(marke, luft=0.10, kontur_px=16.0)
    klein, _ = ev.v2_hexagon(marke, luft=0.08, kontur_px=32.0)
    # Deckender Grund VOR dem Skalieren: so hat auch der Randring der kleinen
    # Groessen Alpha 255 (ein Box-Filter ueber transparente Ecken erzeugt sonst
    # halbtransparente Randpixel).
    gross_d = fh.composite(n, n, gross, ev.DUNKEL)
    klein_d = fh.composite(n, n, klein, ev.DUNKEL)

    bilder = {}
    for name, g in ZIELE.items():
        basis = klein_d if g == 16 else gross_d
        px = basis if g == n else ev.box_skalieren(basis, g)
        # Sicherheitsnetz: Alpha ueberall 255, egal was der Filter liefert.
        for i in range(3, len(px), 4):
            px[i] = 255
        bilder[g] = px
        open(os.path.join(public, name), 'wb').write(fh.write_png(g, g, px))
        ecken = [tuple(px[(y * g + x) * 4:(y * g + x) * 4 + 4])
                 for x, y in ((0, 0), (g - 1, 0), (0, g - 1), (g - 1, g - 1))]
        print('  public/%-28s %3dx%-3d Ecken %s' % (name, g, g, ecken))

    ico = fh.write_ico([fh.write_png(16, 16, bilder[16]),
                        fh.write_png(32, 32, bilder[32])])
    open(os.path.join(public, 'favicon.ico'), 'wb').write(ico)
    print('  public/%-28s 16+32 PNG-eingebettet, %d B' % ('favicon.ico', len(ico)))
    return 0


if __name__ == '__main__':
    sys.exit(main())
