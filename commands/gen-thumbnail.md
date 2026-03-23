---
name: gen-thumbnail
description: Generate a thumbnail image for an article using ComfyUI or fetch an official logo
allowed-tools: Bash, Read, Write, WebFetch, Glob
---

Generate a thumbnail for a wiki article. Usage: `/gen-thumbnail <article-slug>`

## Process
1. Find the article in `lib/articles.ts`
2. Determine image type needed:
   - Tool with official logo → fetch logo
   - Concept/pattern → generate via ComfyUI
3. Generate or fetch image
4. Optimize to WebP, max 50KB
5. Save to `public/images/thumbnails/<category>/<slug>.webp`
6. Update `thumbnail` field in `lib/articles.ts`
7. Build and verify

## ComfyUI API
- Endpoint: http://10.40.10.90:8188/prompt
- Model: FLUX.2 Dev FP8
- Prompt prefix: "minimalist icon, dark background #0B0C0F, clean vector style, single subject centered, professional tech illustration"
