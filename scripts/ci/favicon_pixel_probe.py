#!/usr/bin/env python3
"""Misst Eckpixel und Randring (1-2 px) von PNG/ICO-Dateien ohne Fremdpakete.
Aufruf: favicon_pixel_probe.py <datei> [<datei>...]
Ausgabe: je Datei Format, Masse, RGBA an den 4 Ecken, Anteil nicht-dunkler Randpixel,
und Mittelpixel als Positivkontrolle (die Form muss dunkel sein, sonst misst die Sonde nichts)."""
import struct, sys, zlib

def decode_png(data):
    assert data[:8] == b"\x89PNG\r\n\x1a\n", "kein PNG"
    pos = 8; idat = b""; w = h = bitdepth = ctype = None; palette = None; trns = None
    while pos < len(data):
        ln, = struct.unpack(">I", data[pos:pos+4]); typ = data[pos+4:pos+8]
        chunk = data[pos+8:pos+8+ln]; pos += 12 + ln
        if typ == b"IHDR":
            w, h, bitdepth, ctype, _, _, interlace = struct.unpack(">IIBBBBB", chunk)
            assert interlace == 0, "interlaced nicht unterstuetzt"
        elif typ == b"PLTE": palette = chunk
        elif typ == b"tRNS": trns = chunk
        elif typ == b"IDAT": idat += chunk
        elif typ == b"IEND": break
    raw = zlib.decompress(idat)
    assert bitdepth == 8, f"bitdepth {bitdepth} nicht unterstuetzt"
    ch = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[ctype]
    stride = w * ch; out = []; prev = bytearray(stride); p = 0
    for y in range(h):
        f = raw[p]; p += 1; line = bytearray(raw[p:p+stride]); p += stride
        for i in range(stride):
            a = line[i-ch] if i >= ch else 0; b = prev[i]; c = prev[i-ch] if i >= ch else 0
            if f == 1: line[i] = (line[i] + a) & 255
            elif f == 2: line[i] = (line[i] + b) & 255
            elif f == 3: line[i] = (line[i] + ((a + b) >> 1)) & 255
            elif f == 4:
                pa = abs(b - c); pb = abs(a - c); pc = abs(a + b - 2*c)
                pr = a if pa <= pb and pa <= pc else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 255
        out.append(bytes(line)); prev = line
    def px(x, y):
        row = out[y]; v = row[x*ch:(x+1)*ch]
        if ctype == 6: return tuple(v)
        if ctype == 2: return (v[0], v[1], v[2], 255)
        if ctype == 0: return (v[0], v[0], v[0], 255)
        if ctype == 4: return (v[0], v[0], v[0], v[1])
        if ctype == 3:
            i = v[0]; r, g, b = palette[3*i:3*i+3]
            a = trns[i] if trns and i < len(trns) else 255
            return (r, g, b, a)
    return w, h, px

def decode_bmp_ico(entry, w, h):
    # BMP ohne Dateikopf: BITMAPINFOHEADER, 32bpp BGRA, bottom-up, Hoehe doppelt (XOR+AND)
    hs, bw, bh, planes, bpp = struct.unpack("<IiiHH", entry[:16])
    assert bpp == 32, f"bpp {bpp} nicht unterstuetzt"
    off = hs; stride = bw * 4
    def px(x, y):
        row = (h - 1 - y); o = off + row * stride + x * 4
        b, g, r, a = entry[o:o+4]
        return (r, g, b, a)
    return bw, h, px

def measure(w, h, px):
    """Zahlen ohne Ausgabe: (Ecken, Ringpixel, transparent, transparent-oder-hell, Mittelpixel)."""
    corners = [px(0, 0), px(w - 1, 0), px(0, h - 1), px(w - 1, h - 1)]
    ring = [px(x, y) for y in range(h) for x in range(w) if min(x, y, w - 1 - x, h - 1 - y) < 2]
    n_transp = sum(1 for p in ring if p[3] < 128)
    n_light = sum(1 for p in ring if p[3] < 128 or (p[0] + p[1] + p[2]) / 3 > 160)
    return corners, len(ring), n_transp, n_light, px(w // 2, h // 2)


def images_in(data):
    """Alle Bilder einer Datei (PNG: eins; ICO: je Eintrag) als (label, w, h, px)."""
    out = []
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        w, h, px = decode_png(data); out.append(("png", w, h, px))
    elif data[:4] == b"\x00\x00\x01\x00":
        n, = struct.unpack("<H", data[4:6])
        for i in range(n):
            e = data[6 + 16 * i:6 + 16 * (i + 1)]
            bw, bh, _, _, _, _, size, off = struct.unpack("<BBBBHHII", e)
            bw = bw or 256; bh = bh or 256
            sub = data[off:off + size]
            if sub[:8] == b"\x89PNG\r\n\x1a\n":
                w, h, px = decode_png(sub); out.append((f"ico[{i}] png", w, h, px))
            else:
                w, h, px = decode_bmp_ico(sub, bw, bh); out.append((f"ico[{i}] bmp", w, h, px))
    return out


def analyze(name, w, h, px):
    corners = {"(0,0)": px(0,0), f"({w-1},0)": px(w-1,0), f"(0,{h-1})": px(0,h-1), f"({w-1},{h-1})": px(w-1,h-1)}
    ring = []
    for y in range(h):
        for x in range(w):
            if min(x, y, w-1-x, h-1-y) < 2: ring.append(px(x, y))
    def is_light_or_transparent(p):
        r, g, b, a = p
        return a < 128 or (r + g + b) / 3 > 160
    n_light = sum(1 for p in ring if is_light_or_transparent(p))
    n_transp = sum(1 for p in ring if p[3] < 128)
    center = px(w//2, h//2)
    print(f"\n== {name}: {w}x{h}")
    for k, v in corners.items(): print(f"  Ecke {k}: RGBA{v}")
    print(f"  Randring 1-2px: {len(ring)} px, davon transparent {n_transp}, transparent-oder-hell {n_light}")
    print(f"  Mittelpixel ({w//2},{h//2}): RGBA{center}  [Positivkontrolle: Form dunkel?]")
    # Ring-Farben gruppiert
    from collections import Counter
    cnt = Counter(ring).most_common(4)
    print("  haeufigste Randfarben:", cnt)

def main(argv):
    for fn in argv:
        data = open(fn, "rb").read()
        imgs = images_in(data)
        if not imgs:
            print(f"\n== {fn}: unbekanntes Format {data[:8]!r}")
        for label, w, h, px in imgs:
            analyze(f"{fn} ({label})", w, h, px)


if __name__ == "__main__":
    main(sys.argv[1:])
