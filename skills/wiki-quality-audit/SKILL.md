---
name: wiki-quality-audit
description: Use after any content change, before releases, or when quality issues are suspected. Runs comprehensive SEO, accessibility, DSGVO, and source verification audits via Playwright E2E tests.
version: 1.0.0
---

# Wiki Quality Audit Skill

Run enterprise-grade quality checks on the wiki.

## When to Use
- After adding/modifying content
- Before pushing to main
- After CI/CD failures
- Periodic quality review

## Audit Categories

### 1. SEO (wiki-seo.spec.ts)
- `<title>` present, >10 chars, not default
- `<meta description>` present, 30-160 chars
- Exactly one `<h1>` per page
- sitemap.xml exists and has entries

### 2. Accessibility (wiki-a11y.spec.ts)
- All `<img>` have alt attribute
- Heading hierarchy correct (no skips >2 in main)
- Skip-to-content link present
- Keyboard navigation works

### 3. DSGVO/Privacy (wiki-privacy.spec.ts)
- No Google Fonts CDN requests
- No tracking service requests
- External links have rel="noopener noreferrer"
- Impressum + Datenschutz in footer

### 4. Sources (wiki-sources.spec.ts)
- Paper pages have external source links
- Compliance pages link to official legal sources

### 5. Pages (wiki-pages.spec.ts)
- All 137 pages return HTTP 200
- All pages have visible h1
- No console errors

## Run Commands
```bash
# All tests
npm run test:e2e

# Specific category
npx playwright test wiki-seo
npx playwright test wiki-a11y
npx playwright test wiki-privacy
npx playwright test wiki-sources
npx playwright test wiki-pages
```

## Fix Priority
1. **BLOCKER:** DSGVO violations, 404s → fix immediately
2. **HIGH:** Missing alt-text, meta descriptions → fix same session
3. **MEDIUM:** Heading hierarchy, OG tags → fix next session
4. **LOW:** Structured data, contrast → backlog
