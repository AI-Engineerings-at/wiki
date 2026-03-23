---
name: wiki-audit
description: Run a full quality audit on the wiki (SEO, a11y, DSGVO, sources)
allowed-tools: Bash, Read, Grep, Glob
---

Run a comprehensive wiki quality audit.

## Process
1. Build the wiki: `cd wiki && npm run build`
2. Start local server: `npx serve out -l 3939 &`
3. Run all E2E tests: `WIKI_URL=http://localhost:3939 npm run test:e2e`
4. Report findings by category (SEO/a11y/DSGVO/Sources/Pages)
5. List all failures with severity (BLOCKER/HIGH/MEDIUM/LOW)
6. Fix BLOCKER and HIGH issues immediately
7. Kill server: `kill %1`

## Output Format
```
=== WIKI QUALITY AUDIT ===
SEO: X/Y passed
a11y: X/Y passed
DSGVO: X/Y passed
Sources: X/Y passed
Pages: X/Y passed

BLOCKERS: [list]
HIGH: [list]
MEDIUM: [list]
```
