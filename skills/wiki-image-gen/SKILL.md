---
name: wiki-image-gen
description: Use when articles need thumbnail images, hero images, or diagrams. Handles logo fetching, ComfyUI generation on .90, image optimization, and alt-text creation.
version: 1.0.0
---

# Wiki Image Generation Skill

Generate and manage images for wiki articles.

## When to Use
- New article needs a thumbnail
- Category page has cards without images
- Article needs a hero image or diagram
- Existing images need optimization

## Process

### For Tool Logos
1. Check license table in `agents/legal-checker.md`
2. Download official SVG from project's GitHub/website
3. Optimize: resize to 200x150px display size
4. Save to `public/images/thumbnails/<category>/<slug>.svg`
5. Update `lib/articles.ts` thumbnail field

### For Generated Images (ComfyUI)
1. Connect to ComfyUI API: `http://10.40.10.90:8188/prompt`
2. Use FLUX.2 Dev FP8 model
3. Prompt template:
   ```
   minimalist icon, dark background #0B0C0F, clean vector style,
   single subject centered, professional tech illustration,
   [SUBJECT], blue accent #4262FF
   ```
4. Generate at 512x384px
5. Convert to WebP, max 50KB
6. Save to `public/images/thumbnails/<category>/<slug>.webp`

### For PlantUML Diagrams
1. Write PlantUML source in article
2. Use Kroki service or local PlantUML for rendering
3. Save rendered SVG alongside article

## Quality Checklist
- [ ] Image < 50KB (thumbnails) or < 500KB (hero)
- [ ] WebP format (SVG for logos)
- [ ] Alt-text set (descriptive, not "image of...")
- [ ] articles.ts thumbnail field updated
- [ ] Build passes: `npm run build`

## File Paths
```
public/images/thumbnails/
  tools/<slug>.svg or .webp
  patterns/<slug>.svg or .webp
  security/<slug>.svg or .webp
  compliance/<slug>.svg or .webp
  papers/<slug>.svg or .webp
  grundlagen/<slug>.svg or .webp
```
