# Wiki Style Guide — Verbindliche Richtlinie

> Jede Seite MUSS diesem Guide folgen. Keine Ausnahmen.
> Stand: 22.03.2026

---

## 1. Seiten-Typen

### Typ A: Artikel-Seite (z.B. /tools/ollama-tutorial)
```
1. Hero-Bild (gebrandetes ComfyUI-Bild, passend zum Thema)
2. h1 Titel
3. Untertitel: Kategorie · Lesezeit · Stand-Badge
4. Callout "summary" (3 Sätze: Was, Warum, Für wen)
5. Inhalt (prose prose-invert)
   - Abschnitte mit h2
   - Code-Beispiele wo sinnvoll
   - PlantUML-Diagramm (mindestens 1)
   - Infografiken/Screenshots wo vorhanden
6. Quellen-Section (mindestens 3 echte URLs)
7. Dezenter CTA (1 Zeile, Link auf ai-engineering.at/products)
```

### Typ B: Kategorie-Seite (z.B. /grundlagen)
```
1. Hero-Bild (gebrandetes ComfyUI-Bild)
2. h1 Kategorie-Name
3. Beschreibung (1 Satz, menschlich, kein Jargon)
4. Artikel-Grid (Cards mit Titel, Beschreibung, Datum)
```

### Typ C: Blog-Post
```
1. Hero-Bild (MUSS zum Thema passen, NICHT zufällig zugewiesen!)
2. h1 Titel
3. Meta: Datum, Autor, Lesezeit, Tags
4. Inhalt (prose prose-lg)
5. Share-Buttons (X, LinkedIn)
6. Verwandte Artikel (3 Stück, gleiche Tags)
7. Dezenter CTA
```

### Typ D: Interaktive Seite (z.B. /lernpfad, /self-assessment)
```
1. Hero-Bild
2. h1 Titel + Beschreibung
3. Interaktives Element (Quiz, Assessment)
4. Ergebnis/Pfad
```

---

## 2. Bilder-Regeln

- **Jede Seite braucht mindestens 1 Bild** (Hero-Bild oder Infografik)
- **Bilder MÜSSEN zum Thema passen** — nicht zufällig zuweisen
- **Keine Duplikate** — jedes Bild nur 1x verwenden
- **Format**: rounded-xl, border border-white/10, w-full
- **Alt-Text**: Beschreibend, nicht leer
- **Quelle**: ComfyUI generiert (Branded) ODER echte Screenshots
- **KEINE Platzhalter oder Stock-Fotos**

## 3. CSS-Klassen (einheitlich)

| Element | Klasse |
|---------|--------|
| Card Background | `bg-slate-900` |
| Card Border | `border-slate-800` |
| Card Rounding | `rounded-xl` |
| Card Hover | `hover:border-blue-500/50` |
| Text Primary | `text-white` |
| Text Secondary | `text-slate-300` |
| Text Muted | `text-slate-400` |
| Text Faint | `text-slate-500` |
| Accent | `text-[#4262FF]` oder `text-blue-400` |

**VERBOTEN**: `gray-*` Klassen (nur `slate-*`), `rounded-lg` auf Cards (nur `rounded-xl`)

## 4. Sprache

- **Du-Form**, nicht "man" oder passiv
- **Kein Jargon** ohne Erklärung
- **Konkrete Beispiele** statt Abstraktion
- **Keine Marketing-Sprache** ("revolutionär", "einzigartig", "weltweit bester")
- **Umlaute**: ü, ö, ä — NIEMALS ue, oe, ae in sichtbarem Text
- **Quellen**: Jeder Artikel mit echten, verifizierten URLs

## 5. Komponenten

| Komponente | Wann verwenden |
|------------|---------------|
| `Callout type="summary"` | Am Anfang jedes Artikels |
| `Callout type="warning"` | Bei rechtlichen Hinweisen |
| `Callout type="tip"` | Bei praktischen Tipps |
| `PlantUMLDiagram` | Mindestens 1 pro Artikel |
| `ComparisonTable` | Bei Vergleichen |
| `KeyTakeaway` | Am Ende langer Artikel |

## 6. Footer/CTA

- **KEINE Stripe-Links im Wiki** — nur ai-engineering.at/products
- **KEIN Preis im Wiki** — Preise nur auf der Shop-Seite
- **Dezenter CTA**: 1 Zeile Text + 1 Link, mehr nicht

---

*Dieser Guide ist VERBINDLICH. Jede Seite die nicht folgt, muss überarbeitet werden.*
