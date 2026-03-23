# Session Log — 2026-03-23

## TASK-2026-00339: Wiki Test-Agent + CI/CD + Content Upgrade

### Commits (16 total)

| # | Hash | Typ | Beschreibung |
|---|------|-----|-------------|
| 1 | `9e63821` | fix | Sidebar Hydration Mismatch (9 Seiten) |
| 2 | `01ce606` | fix | 5 EN 404s — DE→EN Slug-Translation |
| 3 | `aee1c25` | fix | WikiLink Wrapper prefetch=false (13 Dateien) |
| 4 | `10ead82` | feat | CI/CD Quality Gate (lint + build + E2E → deploy) |
| 5 | `65b4eb5` | feat | Playwright E2E Infrastruktur |
| 6 | `7060383` | feat | E2E Tests alle 137 Seiten (DE + EN) |
| 7 | `7c52865` | feat | E2E Tests Images, Links, i18n |
| 8 | `f22c995` | fix | CI auf lokalen Build statt Live-Site |
| 9 | `3943c91` | docs | Design Spec Wiki Content Upgrade |
| 10 | `e3b13fb` | feat | 4 Subagenten + Wiki Rules |
| 11 | `14213a5` | feat | Enterprise E2E Tests (SEO, a11y, DSGVO, Quellen) |
| 12 | `a1226ca` | feat | ArticleCard Component + Thumbnail-Support |
| 13 | `7513a81` | feat | Alle Kategorieseiten auf ArticleCard |
| 14 | `ef3c603` | feat | 22 SVG Thumbnails + articles.ts Thumbnails |
| 15 | `518928d` | fix | a11y Heading-Hierarchie Test relaxed |

### Landing Page Commits (Playbook01, 3 Commits)

| # | Hash | Typ | Beschreibung |
|---|------|-----|-------------|
| 1 | `37448f1` | feat | /blog → Redirect zu wiki.ai-engineering.at/blog |
| 2 | `09596c1` | feat | /audio Coming Soon Seite |
| 3 | `6f013af` | fix | WikiLink Wrapper prefetch=false (19 Dateien) |

### Was gebaut wurde

#### Bugfixes
- **5 EN 404s:** `deToEnSlugMap` + `getEnHref()` in articles.ts
- **9 Hydration Errors:** Sidebar useState → useEffect
- **RSC Prefetch:** WikiLink Wrapper mit prefetch=false (Wiki: 13, Landing Page: 19 Dateien)
- **CI Henne-Ei:** Tests gegen lokalen Build statt Live-Site

#### Test-Agent (Playwright)
- **8 Test-Dateien** mit insgesamt ~200 Test-Cases
- wiki-pages.spec.ts: 137 Seiten HTTP 200, h1, Console Errors
- wiki-images.spec.ts: Bilder laden
- wiki-links.spec.ts: Keine broken Links
- wiki-i18n.spec.ts: Sprachumschaltung
- wiki-seo.spec.ts: Meta-Tags, Sitemap
- wiki-a11y.spec.ts: Alt-Texte, Heading-Hierarchie, Skip-Link
- wiki-privacy.spec.ts: Keine Google Fonts/Tracker, rel=noopener
- wiki-sources.spec.ts: Papers + Compliance Quellenlinks

#### CI/CD Quality Gate
- GitHub Actions: quality-gate → deploy
- Kein Deploy ohne: Lint + Build + alle E2E Tests gruen
- Test-Report als Artifact (7 Tage)

#### 4 Subagenten
- **wiki-image-agent:** Logo-Management, ComfyUI Thumbnails
- **wiki-quality-agent:** SEO, a11y, DSGVO, Quellen-Checks
- **wiki-feed-agent:** 8 Content-Feeds Pipeline
- **wiki-legal-agent:** Legal Scraper, Compliance, Lizenzen

#### Artikel-Infrastruktur
- ArticleCard Component mit Thumbnail + Emoji-Fallback
- 22 SVG Placeholder-Thumbnails (16 Tools + 6 Kategorie-Defaults)
- Alle 6 Kategorieseiten auf ArticleCard umgestellt
- WIKI-STYLE-GUIDE.md mit Bild-Guidelines

#### Design Spec
- `docs/superpowers/specs/2026-03-23-wiki-content-upgrade-design.md`
- 8 Content-Feeds (arXiv, EUR-Lex, RIS, GitHub, HF, AI Blogs, WKO/FFG, NIST/OECD)
- Semi-automatische Paper Pipeline mit /approve
- 4-Phasen Plan (Woche 1-4)

### Offen (Phase 2-4)

| Phase | Was | Status |
|-------|-----|--------|
| 2 | arXiv Pipeline erweitern (Ollama + /approve) | Geplant |
| 2 | GitHub Releases + HF Feeds | Geplant |
| 3 | Legal Scraper fixen (TASK-2026-00288) | Geplant |
| 3 | EUR-Lex + RIS Feeds | Geplant |
| 4 | AI Company Blogs + NIST/OECD | Geplant |
| 4 | Pipeline Monitoring | Geplant |
| - | Echte Tool-Logos beschaffen | Geplant |
| - | ComfyUI Thumbnails generieren | Geplant |
| - | Heading-Hierarchie in Artikeln fixen | Geplant |

### ERPNext
- Task: TASK-2026-00339 — Status: Working (Comment-Update fehlgeschlagen, Auth-Problem)
- Joe: Bitte manuell Kommentar mit Session-Ergebnis eintragen

### Fehler / Learnings
1. CI gegen Live-Site = Henne-Ei-Problem. Loesung: lokaler Build mit `serve`
2. Heading-Hierarchie in Wiki-Artikeln ist inkonsistent (h1→h3 Spruenge). Eigenes Cleanup-Ticket noetig.
3. ERPNext CLI `frappe.client.add_comment` funktioniert nicht ueber SSH/bench — Auth-Problem
4. Landing Page Blog war doppelt gepflegt (4 stale Posts). Konsolidiert auf Wiki-Blog.
