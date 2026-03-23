---
name: wiki-content-feed
description: Use when adding new content to the wiki from external sources (arXiv papers, legal updates, tool releases, HF models). Handles the full pipeline from source to wiki article with quality checks.
version: 1.0.0
---

# Wiki Content Feed Skill

Process external content into wiki articles.

## When to Use
- Adding a new paper to /papers/
- Creating a compliance update in /compliance/
- Documenting a tool release in /tools/
- Adding HF model info to the wiki

## Process

### Step 1: Identify Source
Determine content type and source URL. Verify the source is:
- Publicly accessible (no paywalled content)
- Relevant to wiki scope (AI, compliance, local infrastructure)
- Not already covered (search open-notebook + existing wiki articles)

### Step 2: Fetch + Summarize
- Fetch source content via WebFetch or API
- Summarize using Ollama (qwen3.5:27b at http://10.40.10.90:11434)
- Assign relevance score 1-10
- Score < 5 → skip, log to open-notebook only
- Score 5+ → proceed to article generation

### Step 3: Generate Article
Use the correct template based on content type:
- Papers → `content/de/papers/` + `content/en/papers/`
- Compliance → compliance news section
- Tools → tool release notes
- Include: title, summary, source link, date, author

### Step 4: Quality Check
Before committing:
- [ ] Quellenangabe vorhanden?
- [ ] Kein Volltext kopiert?
- [ ] Alt-Texte auf Bildern?
- [ ] DE + EN Version?
- [ ] articles.ts updated?
- [ ] Kein aggressiver Produkt-CTA? ("Jetzt kaufen", "Produkte ansehen →" sind VERBOTEN)
- [ ] Neutral formuliert? (Keine absoluten Behauptungen ohne Beleg)
- [ ] Pro UND Contra dargestellt? (Einseitige Darstellung = Qualitaetsmangel)
- [ ] Artikel beantwortet die Frage VOLLSTAENDIG? (Kein Teaser fuer Produkte)
- [ ] Falls Produkt-Hinweis: nur ein dezenter, kursiver Satz ganz am Ende?

### Step 5: Register
- Add to `lib/articles.ts` (article entry + relatedArticlesMap)
- Create page in `app/` directory
- Build: `npm run build`
- Commit + push

## Templates
See `agents/content-feeder.md` for full article templates.
