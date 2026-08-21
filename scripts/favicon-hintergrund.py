#!/usr/bin/env python3
"""
Legt einen deckenden Hintergrund hinter die Marke in den Favicon-Dateien.

Warum: favicon-16x16, favicon-32x32, apple-touch-icon und die beiden
android-chrome-Dateien sind colortype 6 mit Alpha 0 an allen vier Ecken —
transparent, ohne Hintergrundfarbe. Die Marke in der Mitte ist hell
(241,241,241). Im hellen Browser-Tab scheint das Tab-Weiss durch, das Logo
wirkt weiss statt schwarz (Joe, 2026-08-21).

Die Farbe #020617 ist nicht gewaehlt, sondern uebernommen: sie steht als
`background_color` in public/site.webmanifest, das Wiki deklariert sie also
selbst als seine Dunkelfarbe.

Reine Standardbibliothek (zlib, struct) — auf diesem Mac gibt es weder PIL
noch ImageMagick (gemessen: `import PIL` -> ModuleNotFoundError,
`which magick convert` -> leer).

Umkehrbar: die transparenten Originale werden vor der ersten Aenderung nach
scripts/favicon-src/ kopiert und bleiben dort. Das Skript liest IMMER von
dort und schreibt nach public/ — mehrfaches Laufen aendert nichts.

  python3 scripts/favicon-hintergrund.py pruefen   # misst Ecken + Mitte
  python3 scripts/favicon-hintergrund.py setzen    # legt den Hintergrund
"""

import os
import shutil
import struct
import sys
import zlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')
SRC_DIR = os.path.join(ROOT, 'scripts', 'favicon-src')

# #020617 — background_color aus public/site.webmanifest
BG = (0x02, 0x06, 0x17)

PNG_TARGETS = [
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
]
ICO_TARGET = 'favicon.ico'

PNG_SIG = b'\x89PNG\r\n\x1a\n'


# --------------------------------------------------------------------------
# PNG lesen
# --------------------------------------------------------------------------

def parse_chunks(data):
    if data[:8] != PNG_SIG:
        raise ValueError('keine PNG-Signatur')
    chunks, i = [], 8
    while i < len(data):
        (length,) = struct.unpack('>I', data[i:i + 4])
        ctype = data[i + 4:i + 8]
        payload = data[i + 8:i + 8 + length]
        chunks.append((ctype, payload))
        i += 12 + length
    return chunks


def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    if pb <= pc:
        return b
    return c


def unfilter(raw, width, height, bpp):
    """Filtertypen 0-4 rueckgaengig (PNG-Spezifikation 9.2)."""
    stride = width * bpp
    out = bytearray(stride * height)
    pos = 0
    for y in range(height):
        ftype = raw[pos]
        pos += 1
        line = bytearray(raw[pos:pos + stride])
        pos += stride
        row_start = y * stride
        prev_start = row_start - stride
        for x in range(stride):
            val = line[x]
            left = out[row_start + x - bpp] if x >= bpp else 0
            up = out[prev_start + x] if y > 0 else 0
            upleft = out[prev_start + x - bpp] if (y > 0 and x >= bpp) else 0
            if ftype == 0:
                pass
            elif ftype == 1:
                val = (val + left) & 0xFF
            elif ftype == 2:
                val = (val + up) & 0xFF
            elif ftype == 3:
                val = (val + ((left + up) >> 1)) & 0xFF
            elif ftype == 4:
                val = (val + paeth(left, up, upleft)) & 0xFF
            else:
                raise ValueError('unbekannter Filtertyp %d in Zeile %d' % (ftype, y))
            out[row_start + x] = val
    return out


def read_png(data):
    chunks = parse_chunks(data)
    ihdr = dict(chunks)[b'IHDR']
    width, height, depth, ctype, comp, filt, interlace = struct.unpack('>IIBBBBB', ihdr)
    if depth != 8 or ctype != 6:
        raise ValueError('nur 8 bit RGBA (colortype 6) unterstuetzt, hier depth=%d ctype=%d'
                         % (depth, ctype))
    if interlace != 0:
        raise ValueError('interlaced PNG wird nicht unterstuetzt')
    idat = b''.join(p for t, p in chunks if t == b'IDAT')
    pixels = unfilter(zlib.decompress(idat), width, height, 4)
    return width, height, pixels


# --------------------------------------------------------------------------
# PNG schreiben
# --------------------------------------------------------------------------

def chunk(ctype, payload):
    return (struct.pack('>I', len(payload)) + ctype + payload
            + struct.pack('>I', zlib.crc32(ctype + payload) & 0xFFFFFFFF))


def write_png(width, height, pixels):
    stride = width * 4
    raw = bytearray()
    for y in range(height):
        raw.append(0)  # Filtertyp 0 (None)
        raw += pixels[y * stride:(y + 1) * stride]
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    return (PNG_SIG + chunk(b'IHDR', ihdr)
            + chunk(b'IDAT', zlib.compress(bytes(raw), 9))
            + chunk(b'IEND', b''))


# --------------------------------------------------------------------------
# Compositing
# --------------------------------------------------------------------------

def composite(width, height, pixels, bg):
    """out = src*a + bg*(1-a) je Kanal, Alpha danach 255."""
    out = bytearray(pixels)
    for i in range(0, len(out), 4):
        a = out[i + 3]
        if a == 255:
            continue
        for c in range(3):
            src = out[i + c]
            # ganzzahlig, mit Rundung: (src*a + bg*(255-a) + 127) // 255
            out[i + c] = (src * a + bg[c] * (255 - a) + 127) // 255
        out[i + 3] = 255
    return out


def corners(width, height, pixels):
    def px(x, y):
        i = (y * width + x) * 4
        return tuple(pixels[i:i + 4])
    return [px(0, 0), px(width - 1, 0), px(0, height - 1), px(width - 1, height - 1)]


def center(width, height, pixels):
    i = ((height // 2) * width + (width // 2)) * 4
    return tuple(pixels[i:i + 4])


# --------------------------------------------------------------------------
# ICO
# --------------------------------------------------------------------------

def read_ico(data):
    reserved, typ, count = struct.unpack('<HHH', data[:6])
    if reserved != 0 or typ != 1:
        raise ValueError('keine ICO-Datei')
    images = []
    for k in range(count):
        off = 6 + 16 * k
        bw, bh, ncol, res, planes, bpp, size, offset = struct.unpack('<BBBBHHII', data[off:off + 16])
        blob = data[offset:offset + size]
        if blob[:8] != PNG_SIG:
            raise ValueError('Eintrag %d ist kein eingebettetes PNG' % k)
        images.append(blob)
    return images


def write_ico(pngs):
    count = len(pngs)
    header = struct.pack('<HHH', 0, 1, count)
    entries, blobs = b'', b''
    offset = 6 + 16 * count
    for blob in pngs:
        w, h, _d, _c, _co, _f, _i = struct.unpack('>IIBBBBB', parse_chunks(blob)[0][1])
        entries += struct.pack('<BBBBHHII',
                               0 if w >= 256 else w, 0 if h >= 256 else h,
                               0, 0, 1, 32, len(blob), offset)
        blobs += blob
        offset += len(blob)
    return header + entries + blobs


# --------------------------------------------------------------------------
# Modi
# --------------------------------------------------------------------------

def quelle(name):
    """Quelle ist das transparente Original in scripts/favicon-src/."""
    src = os.path.join(SRC_DIR, name)
    if not os.path.exists(src):
        os.makedirs(SRC_DIR, exist_ok=True)
        shutil.copy2(os.path.join(PUBLIC, name), src)
        print('  Original gesichert: scripts/favicon-src/%s' % name)
    return src


def zeige(label, width, height, pixels):
    ck = corners(width, height, pixels)
    gleich = len(set(ck)) == 1
    print('  %-34s %4dx%-4d Ecken=%s%s  Mitte=%s'
          % (label, width, height, ck[0], ' (4/4 gleich)' if gleich else ' UNEINHEITLICH: %s' % ck,
             center(width, height, pixels)))
    return ck


def modus_pruefen(basis):
    print('Messung in %s' % basis)
    alle = []
    for name in PNG_TARGETS:
        path = os.path.join(basis, name)
        if not os.path.exists(path):
            print('  %-34s FEHLT' % name)
            continue
        w, h, px = read_png(open(path, 'rb').read())
        alle.append((name, zeige(name, w, h, px)))
    ico_path = os.path.join(basis, ICO_TARGET)
    if os.path.exists(ico_path):
        pngs = read_ico(open(ico_path, 'rb').read())
        print('  %-34s %d eingebettete PNGs, %d B'
              % (ICO_TARGET, len(pngs), os.path.getsize(ico_path)))
        for k, blob in enumerate(pngs):
            w, h, px = read_png(blob)
            alle.append(('%s[%d]' % (ICO_TARGET, k), zeige('  [%d]' % k, w, h, px)))
    return alle


def modus_setzen():
    print('Hintergrund #%02X%02X%02X hinter die Marke legen' % BG)
    for name in PNG_TARGETS:
        src = quelle(name)
        w, h, px = read_png(open(src, 'rb').read())
        out = composite(w, h, px, BG)
        with open(os.path.join(PUBLIC, name), 'wb') as fh:
            fh.write(write_png(w, h, out))
        print('  geschrieben: public/%s (%dx%d)' % (name, w, h))

    src = quelle(ICO_TARGET)
    pngs = read_ico(open(src, 'rb').read())
    neu = []
    for blob in pngs:
        w, h, px = read_png(blob)
        neu.append(write_png(w, h, composite(w, h, px, BG)))
    with open(os.path.join(PUBLIC, ICO_TARGET), 'wb') as fh:
        fh.write(write_ico(neu))
    print('  geschrieben: public/%s (%d eingebettete PNGs)' % (ICO_TARGET, len(neu)))


if __name__ == '__main__':
    modus = sys.argv[1] if len(sys.argv) > 1 else 'pruefen'
    if modus == 'pruefen':
        basis = sys.argv[2] if len(sys.argv) > 2 else PUBLIC
        modus_pruefen(basis)
    elif modus == 'setzen':
        modus_setzen()
    else:
        print(__doc__)
        sys.exit(2)
