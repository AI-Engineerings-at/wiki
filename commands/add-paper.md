---
name: add-paper
description: Add a new paper to the wiki from an arXiv or HF URL
allowed-tools: WebFetch, Read, Write, Edit, Bash, Grep, Glob
---

Add a new paper to the wiki. Usage: `/add-paper <url>`

## Process
1. Fetch the paper from the provided URL (arXiv or Hugging Face)
2. Use the `wiki-legal-check` skill to verify we can summarize it
3. Use the `wiki-content-feed` skill to generate the article
4. Use the `wiki-image-gen` skill to create a thumbnail
5. Use the `wiki-quality-audit` skill to verify quality
6. Build and commit

## Important
- Read `.claude/rules/01-wiki-rules.md` first
- Create BOTH DE and EN versions
- Add to `lib/articles.ts` registry
- Add to `relatedArticlesMap` with related papers
- Include PlantUML diagram if paper has architecture
- Build must pass before committing
