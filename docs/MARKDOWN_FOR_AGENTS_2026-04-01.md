# Markdown for Agents — Technical Documentation

**Date:** 2026-04-01
**Status:** Implemented
**Author:** AI Engineering HQ

## Problem

Cloudflare's "Markdown for Agents" feature is not available in the Free tier. When AI agents (ClaudeBot, GPTBot, PerplexityBot, etc.) visit our wiki, they get full HTML — which consumes ~5x more tokens than clean Markdown. This makes our content expensive to process and less likely to be cited by AI systems.

## Solution

A build-time script that generates clean Markdown versions of all wiki articles. Since the wiki uses `output: 'export'` (static export), API routes are not available. Instead, we generate static `.md` files into `public/md/` during the build process.

## Architecture

```
content/                          public/md/
  de/                               de/
    compliance/                       compliance/
      eu-ai-act-guide.mdx    ->       eu-ai-act-guide.md
    grundlagen/                      grundlagen/
      ollama-setup.mdx        ->       ollama-setup.md
  en/                               en/
    tutorials/                       tutorials/
      build-rag-pipeline.mdx  ->       build-rag-pipeline.md
                                   index.json  (article index)
```

## Files

| File | Purpose |
|------|---------|
| `scripts/generate-markdown-for-agents.js` | Build script — converts MDX to clean MD |
| `public/md/**/*.md` | Generated clean Markdown files (379 articles) |
| `public/md/index.json` | JSON index of all articles with metadata |
| `public/agents.json` | Agent discovery endpoint |
| `public/llms.txt` | Updated with `/md/` references |
| `public/robots.txt` | Updated with `/md/` discovery comments |

## What the Script Does

1. Finds all `.mdx` files in `content/`
2. Parses YAML frontmatter (keeps it intact)
3. Adds `source:` URL to frontmatter for attribution
4. Cleans MDX body:
   - Removes JSX component tags (`<Callout>`, `<Component />`)
   - Keeps content inside JSX block components
   - Preserves code blocks (does NOT strip Python imports in code fences)
   - Converts relative links to absolute URLs
   - Removes excessive blank lines
5. Writes clean `.md` files to `public/md/` (same directory structure)
6. Generates `index.json` with all articles, sorted by date

## Build Integration

```json
{
  "build": "node scripts/generate-markdown-for-agents.js && next build",
  "generate:md": "node scripts/generate-markdown-for-agents.js"
}
```

The `generate:md` script can also be run standalone for testing.

## Agent Discovery

Agents can discover our Markdown content via:

1. **`/agents.json`** — structured endpoint listing with examples
2. **`/llms.txt`** — human-readable index with direct Markdown links
3. **`/md/index.json`** — full article index with title, path, summary, date, tags, language
4. **`/robots.txt`** — comments pointing to discovery endpoints

## Token Savings

| Format | Typical Tokens (EU AI Act article) | Ratio |
|--------|-------------------------------------|-------|
| HTML (rendered page) | ~8,000 | 1x |
| Clean Markdown | ~1,600 | 0.2x |
| **Savings** | **~80%** | |

## Idempotency

The script is safe to run multiple times. It deletes the entire `public/md/` directory before regenerating. No state is preserved between runs.

## Future Improvements

- Add `Accept: text/markdown` header detection via Cloudflare Worker (when upgrading plan)
- Add `/md/llms-full.txt` — a single concatenated file of all articles for full-context ingestion
- Add content hash to index.json for cache busting
- Add category grouping to index.json
