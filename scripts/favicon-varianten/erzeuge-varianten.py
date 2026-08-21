#!/usr/bin/env python3
"""
Drei Formvarianten fuer das Favicon — VORSCHAU, nicht ausgeliefert.

Joe, 2026-08-21 14:00: "kannst du die Form auch aendern? Was Ungewoehnliches
am besten ^^"

Quelle ist die transparente Marke aus scripts/favicon-src/
android-chrome-512x512.png. Nichts hiervon wird nach public/ geschrieben.

V1 Terminal-Fenster · V2 Hexagon · V3 Prompt-Blase

Reine Standardbibliothek. Formkanten mit 2 px Antialiasing ueber eine
vorzeichenbehaftete Abstandsfunktion (SDF); die Marke wird per Binaersuche
so skaliert, dass ueberall mindestens 10 % Luft zur Formkante bleibt —
gemessen an derselben SDF, nicht geschaetzt.
"""

import importlib.util
import math
import os
import struct
import sys

HIER = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HIER))

spec = importlib.util.spec_from_file_location(
    'fh', os.path.join(ROOT, 'scripts', 'favicon-hintergrund.py'))
fh = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fh)

QUELLE = os.path.join(ROOT, 'scripts', 'favicon-src', 'android-chrome-512x512.png')
AUSGABE = HIER
KOPIE = '/Users/mackbook/ai-kurse/doc/favicon-varianten-2026-08-21'

N = 512                      # Arbeitsaufloesung
AA = 2.0                     # Kantenbreite in Pixeln bei 512
LUFT = 0.10                  # Mindestabstand Marke <-> Formkante
GROESSEN = [512, 192, 180, 32, 16]

DUNKEL = (0x02, 0x06, 0x17)  # #020617  background_color aus site.webmanifest
LEISTE = (0x0F, 0x17, 0x2A)  # #0F172A  Titelleiste
BLAU = (0x42, 0x62, 0xFF)    # #4262FF  theme_color aus site.webmanifest


# ---------------------------------------------------------------- Abstaende

def sd_box(px, py, cx, cy, hw, hh):
    dx, dy = abs(px - cx) - hw, abs(py - cy) - hh
    ox, oy = max(dx, 0.0), max(dy, 0.0)
    return math.hypot(ox, oy) + min(max(dx, dy), 0.0)


def sd_rrect(px, py, cx, cy, hw, hh, r):
    return sd_box(px, py, cx, cy, hw - r, hh - r) - r


def sd_circle(px, py, cx, cy, r):
    return math.hypot(px - cx, py - cy) - r


def sd_polygon(px, py, pts):
    """Exakte SDF eines Polygons (Abstand + Innen/Aussen per Kreuzungszahl)."""
    d = float('inf')
    inside = False
    n = len(pts)
    for i in range(n):
        ax, ay = pts[i]
        bx, by = pts[(i + 1) % n]
        ex, ey = bx - ax, by - ay
        wx, wy = px - ax, py - ay
        t = max(0.0, min(1.0, (wx * ex + wy * ey) / (ex * ex + ey * ey)))
        d = min(d, math.hypot(wx - ex * t, wy - ey * t))
        if (ay > py) != (by > py) and px < ax + (py - ay) / (by - ay) * ex:
            inside = not inside
    return -d if inside else d


def deckung(d):
    """SDF -> Deckung 0..1 mit AA-Breite."""
    return max(0.0, min(1.0, 0.5 - d / AA))


# ---------------------------------------------------------------- Marke

def lade_marke():
    w, h, px = fh.read_png(open(QUELLE, 'rb').read())
    xs0, ys0, xs1, ys1 = w, h, -1, -1
    for y in range(h):
        row = y * w
        for x in range(w):
            if px[(row + x) * 4 + 3] > 16:
                if x < xs0: xs0 = x
                if x > xs1: xs1 = x
                if y < ys0: ys0 = y
                if y > ys1: ys1 = y
    return w, h, px, (xs0, ys0, xs1, ys1)


def marke_auf(ziel, w, h, px, bbox, cx, cy, breite, hoehe):
    """Marke bilinear in das Rechteck (cx,cy,breite,hoehe) einsetzen."""
    x0, y0, x1, y1 = bbox
    bw, bh = x1 - x0 + 1, y1 - y0 + 1
    lx, ty = cx - breite / 2.0, cy - hoehe / 2.0
    for j in range(max(0, int(ty)), min(N, int(ty + hoehe) + 2)):
        for i in range(max(0, int(lx)), min(N, int(lx + breite) + 2)):
            u = (i + 0.5 - lx) / breite
            v = (j + 0.5 - ty) / hoehe
            if not (0.0 <= u < 1.0 and 0.0 <= v < 1.0):
                continue
            sx, sy = x0 + u * bw - 0.5, y0 + v * bh - 0.5
            ix, iy = int(math.floor(sx)), int(math.floor(sy))
            fx, fy = sx - ix, sy - iy
            acc = [0.0] * 4
            for dy in (0, 1):
                for dx in (0, 1):
                    xx = min(max(ix + dx, 0), w - 1)
                    yy = min(max(iy + dy, 0), h - 1)
                    wgt = (fx if dx else 1 - fx) * (fy if dy else 1 - fy)
                    o = (yy * w + xx) * 4
                    for c in range(4):
                        acc[c] += px[o + c] * wgt
            a = acc[3] / 255.0
            if a <= 0.0:
                continue
            o = (j * N + i) * 4
            da = ziel[o + 3] / 255.0
            na = a + da * (1 - a)
            for c in range(3):
                sv = acc[c]
                ziel[o + c] = int(round((sv * a + ziel[o + c] * da * (1 - a)) / na))
            ziel[o + 3] = int(round(na * 255))


def groesste_marke(sdf, cx, cy, seiten, rand):
    """Binaersuche: groesste Marke, die ueberall `rand` Abstand zur Kante haelt."""
    lo, hi = 0.0, float(N)
    for _ in range(40):
        mid = (lo + hi) / 2.0
        hw, hh = mid / 2.0, mid * seiten / 2.0
        ecken = [(cx - hw, cy - hh), (cx + hw, cy - hh),
                 (cx - hw, cy + hh), (cx + hw, cy + hh),
                 (cx, cy - hh), (cx, cy + hh), (cx - hw, cy), (cx + hw, cy)]
        if all(sdf(x, y) <= -rand for x, y in ecken):
            lo = mid
        else:
            hi = mid
    return lo, lo * seiten


# ---------------------------------------------------------------- Varianten

def leere():
    return bytearray(N * N * 4)


def male(ziel, sdf, farbe):
    for y in range(N):
        for x in range(N):
            c = deckung(sdf(x + 0.5, y + 0.5))
            if c <= 0.0:
                continue
            o = (y * N + x) * 4
            da = ziel[o + 3] / 255.0
            na = c + da * (1 - c)
            for k in range(3):
                ziel[o + k] = int(round((farbe[k] * c + ziel[o + k] * da * (1 - c)) / na))
            ziel[o + 3] = int(round(na * 255))


def v1_terminal(marke):
    w, h, px, bbox = marke
    R = 0.18 * N
    aussen = lambda x, y: sd_rrect(x, y, N / 2, N / 2, N / 2, N / 2, R)
    img = leere()
    male(img, aussen, DUNKEL)
    # Titelleiste: oberes Band, an der Form beschnitten
    lh = 0.12 * N
    leiste = lambda x, y: max(aussen(x, y), sd_box(x, y, N / 2, lh / 2, N / 2, lh / 2))
    male(img, leiste, LEISTE)
    # drei Punkte
    r = 0.022 * N
    for k, fx in enumerate((0.075, 0.155, 0.235)):
        male(img, (lambda cx: lambda x, y: sd_circle(x, y, cx, lh / 2, r))(fx * N), BLAU)
    # Marke unter der Leiste
    cy = lh + (N - lh) / 2.0
    seiten = (bbox[3] - bbox[1] + 1) / float(bbox[2] - bbox[0] + 1)
    innen = lambda x, y: max(aussen(x, y), -(y - lh))   # Form ohne Titelleiste
    bw, bh = groesste_marke(innen, N / 2, cy, seiten, LUFT * N)
    marke_auf(img, w, h, px, bbox, N / 2, cy, bw, bh)
    return img, aussen


def v2_hexagon(marke, luft=LUFT, kontur_px=16.0):
    """Flaches Sechseck, spitze Seiten links/rechts.

    `luft`      Mindestabstand Marke <-> Formkante, Anteil der Kantenlaenge.
    `kontur_px` Konturbreite bei 512. Fuer eine Zielgroesse g gilt:
                Breite bei g = kontur_px * g / 512. Fuer 1 px bei 16 -> 32.
    """
    w, h, px, bbox = marke
    cy, hh = N / 2.0, 0.40 * N
    pts = [(0.0, cy), (0.25 * N, cy - hh), (0.75 * N, cy - hh),
           (float(N), cy), (0.75 * N, cy + hh), (0.25 * N, cy + hh)]
    aussen = lambda x, y: sd_polygon(x, y, pts)
    img = leere()
    male(img, aussen, DUNKEL)
    kontur = lambda x, y: max(aussen(x, y), -(aussen(x, y) + kontur_px))
    male(img, kontur, BLAU)
    seiten = (bbox[3] - bbox[1] + 1) / float(bbox[2] - bbox[0] + 1)
    bw, bh = groesste_marke(aussen, N / 2, cy, seiten, luft * N)
    marke_auf(img, w, h, px, bbox, N / 2, cy, bw, bh)
    return img, aussen


def v3_blase(marke):
    w, h, px, bbox = marke
    cx, cy, r = N / 2.0, 0.46 * N, 0.42 * N
    kreis = lambda x, y: sd_circle(x, y, cx, cy, r)
    # Cursor-Balken unten rechts, ausserhalb des Kreises
    bx, by = 0.80 * N, 0.87 * N
    bhw, bhh = 0.045 * N, 0.105 * N
    balken = lambda x, y: sd_rrect(x, y, bx, by, bhw, bhh, 0.012 * N)
    aussen = lambda x, y: min(kreis(x, y), balken(x, y))
    img = leere()
    male(img, kreis, DUNKEL)
    male(img, balken, BLAU)
    seiten = (bbox[3] - bbox[1] + 1) / float(bbox[2] - bbox[0] + 1)
    bw, bh = groesste_marke(kreis, cx, cy, seiten, LUFT * N)
    marke_auf(img, w, h, px, bbox, cx, cy, bw, bh)
    return img, aussen


# ---------------------------------------------------------------- Skalieren

def box_skalieren(src, ziel):
    """Flaechenmittel mit vormultipliziertem Alpha (kein Farbsaum)."""
    s = N / float(ziel)
    out = bytearray(ziel * ziel * 4)
    for j in range(ziel):
        y0, y1 = j * s, (j + 1) * s
        for i in range(ziel):
            x0, x1 = i * s, (i + 1) * s
            ar = ag = ab = aa = wsum = 0.0
            for yy in range(int(y0), min(int(math.ceil(y1)), N)):
                wy = min(y1, yy + 1) - max(y0, yy)
                if wy <= 0: continue
                for xx in range(int(x0), min(int(math.ceil(x1)), N)):
                    wx = min(x1, xx + 1) - max(x0, xx)
                    if wx <= 0: continue
                    wgt = wx * wy
                    o = (yy * N + xx) * 4
                    a = src[o + 3] / 255.0
                    ar += src[o] * a * wgt
                    ag += src[o + 1] * a * wgt
                    ab += src[o + 2] * a * wgt
                    aa += a * wgt
                    wsum += wgt
            o = (j * ziel + i) * 4
            if aa > 0.0:
                out[o] = min(255, int(round(ar / aa)))
                out[o + 1] = min(255, int(round(ag / aa)))
                out[o + 2] = min(255, int(round(ab / aa)))
            out[o + 3] = min(255, int(round(aa / wsum * 255)))
    return out


# ---------------------------------------------------------------- Hauptteil

def main():
    os.makedirs(AUSGABE, exist_ok=True)
    os.makedirs(KOPIE, exist_ok=True)
    marke = lade_marke()
    _x0, _y0, _x1, _y1 = marke[3]
    print('Marke: bbox x %d..%d (%d) y %d..%d (%d), alpha>16'
          % (_x0, _x1, _x1 - _x0 + 1, _y0, _y1, _y1 - _y0 + 1))
    varianten = [('v1-terminal', v1_terminal), ('v2-hexagon', v2_hexagon),
                 ('v3-prompt-blase', v3_blase)]
    ergebnis = {}
    for name, fn in varianten:
        img, sdf = fn(marke)
        ergebnis[name] = {'sdf': sdf}
        for g in GROESSEN:
            klein = img if g == N else box_skalieren(img, g)
            pfad = os.path.join(AUSGABE, '%s-%d.png' % (name, g))
            open(pfad, 'wb').write(fh.write_png(g, g, klein))
            ergebnis[name][g] = klein
            if g == N:
                open(os.path.join(KOPIE, '%s-512.png' % name), 'wb').write(
                    fh.write_png(g, g, klein))
        print('  %s: %s' % (name, ', '.join(str(g) for g in GROESSEN)))
    return ergebnis, marke


ZIELE = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
}


def final():
    """V2 Hexagon in die sechs Zielformate nach public/ schreiben.

    Zwei Renderings statt einem: bei 16 px laesst das Sechseck mit 10 % Luft
    zu wenig Flaeche fuer den Adler (gemessen: hellstes Pixel (130,132,140),
    Min-Kanal 130). Fuer 16 px daher 8 % Luft und eine Kontur, die bei der
    Zielgroesse 1 px breit ist (32 px bei 512 -> 32*16/512 = 1).

    Warum 8 % und nicht 6 %: gemessene Reihe des hellsten Markenpixels bei
    16 px (Min-Kanal) ueber die Luft — 10 % -> 130, 8 % -> 142, 6 % -> 139,
    4 % -> 157, 2 % -> 167. Der Verlauf ist nicht monoton, weil die Marke bei
    jeder Luft anders auf das 32:1-Mittelungsraster faellt. Im freigegebenen
    Bereich (>= 6 %) ist 8 % das Maximum. Das Ziel Min-Kanal > 150 ist erst
    bei 4 % erreichbar und liegt damit ausserhalb der Freigabe.
    """
    public = os.path.join(ROOT, 'public')
    marke = lade_marke()
    _x0, _y0, _x1, _y1 = marke[3]
    print('Marke: bbox x %d..%d (%d) y %d..%d (%d), alpha>16'
          % (_x0, _x1, _x1 - _x0 + 1, _y0, _y1, _y1 - _y0 + 1))

    gross, sdf = v2_hexagon(marke, luft=0.10, kontur_px=16.0)
    klein, _ = v2_hexagon(marke, luft=0.08, kontur_px=32.0)
    print('Rendering A: Luft 10 %, Kontur 16 px@512  -> 512/192/180/32')
    print('Rendering B: Luft  8 %, Kontur 32 px@512  -> 16')

    bilder = {}
    for name, g in ZIELE.items():
        basis = klein if g == 16 else gross
        px = basis if g == N else box_skalieren(basis, g)
        bilder[g] = px
        open(os.path.join(public, name), 'wb').write(fh.write_png(g, g, px))
        print('  public/%-28s %dx%d' % (name, g, g))

    ico = fh.write_ico([fh.write_png(16, 16, bilder[16]),
                        fh.write_png(32, 32, bilder[32])])
    open(os.path.join(public, 'favicon.ico'), 'wb').write(ico)
    print('  public/%-28s 16+32, %d B' % ('favicon.ico', len(ico)))
    return sdf


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'final':
        final()
    else:
        main()
