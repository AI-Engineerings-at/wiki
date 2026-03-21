# Blog Hero Image Guidelines

> Standards fuer Blog-Artikel-Bilder auf wiki.ai-engineering.at

## Technische Specs

| Eigenschaft | Wert |
|-------------|------|
| Format | PNG (bevorzugt) oder WebP |
| Groesse | 1344 x 768 px (16:9 landscape) |
| Speicherort | `wiki/public/images/blog/<slug>.png` |
| Frontmatter | `image: "/images/blog/<slug>.png"` |
| Max Dateigrösse | 500 KB (ggf. mit tinypng komprimieren) |

## Generierung via Social Poster

```bash
curl -X POST http://10.40.10.99:8099/generate-image \
  -H 'Content-Type: application/json' \
  -d '{
    "prompt": "<beschreibender Prompt>",
    "aspect": "landscape",
    "size": "1344x768",
    "quality": "hq",
    "content_style": "tech",
    "style": "modern"
  }'
```

Response: `{"success": true, "image_path": "/home/joe/social-images/generated/img_*.png"}`

Dann Bild per SCP holen:
```bash
scp joe@10.40.10.99:<image_path> wiki/public/images/blog/<slug>.png
```

## Prompt-Richtlinien

1. **Kein Text im Bild** — Titel steht im HTML darueber, nicht im Bild
2. **Dunkler Hintergrund** — passt zum Dark Theme der Wiki
3. **Tech-Aesthetic** — Server, Dashboards, Diagramme, Circuits, Code
4. **Farbpalette** — Blau (#4262FF), Dunkelgrau, akzentfarben passend zum Thema
5. **Keine Gesichter/Personen** — abstrakt und professionell halten
6. **Beschreibend, nicht generisch** — Prompt soll den Artikel-Inhalt widerspiegeln

### Prompt-Template

```
professional tech illustration, [Artikel-spezifische Szene],
dark background with [Akzentfarbe] accents, modern minimal style
```

### Beispiele nach Kategorie

| Kategorie | Stil-Elemente |
|-----------|---------------|
| Monitoring | Dashboard panels, metrics graphs, server rack |
| Automation | Workflow nodes, connection lines, data flow arrows |
| Security | Shield icons, lock symbols, red/blue contrast |
| Compliance | EU symbols, documents, checkmarks, official aesthetic |
| AI/LLM | Neural networks, GPU cards, circuit patterns |

## MDX Frontmatter

```markdown
---
title: "Artikel-Titel"
date: "2026-03-10"
summary: "Zusammenfassung..."
tags: ["tag1", "tag2"]
author: "AI Engineering"
image: "/images/blog/artikel-slug.png"
---
```

## Darstellung

- **Blog-Listing** (`/blog`): Bild als Card-Header, 16:9, hover-zoom Effekt
- **Blog-Detail** (`/blog/[slug]`): Volles Hero-Bild oben, 16:9, rounded corners
- **Ohne Bild**: Artikel wird ohne Bild-Sektion angezeigt (graceful fallback)

## n8n Content Pipeline

Der n8n Workflow **Content Pipeline v1** (`ncFEbOB3j18SRJmL`) hat einen "Generate Image" Node der automatisch Bilder via Social Poster generiert. Endpoint: `POST http://10.40.10.99:8099/generate-image` (NICHT `/image`!).
