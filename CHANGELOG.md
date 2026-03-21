# Changelog

Alle wesentlichen Änderungen an der AI Engineering Wiki.

## [1.2.0] — 2026-03-22

### Hinzugefügt
- Österreich-Portal: RTR, WKO, FFG, aws, Digital Austria, AI Tinkerers (DE+EN)
- Praxis-Downloads: 8 Templates & Checklisten verlinkt (DE+EN)
- Open-Source-Tools: 58 kuratierte Tools in 9 Kategorien (DE+EN)
- AI OS Setup Guide (DE+EN) — aus Produkt-Guides
- Agent Team Skalierung (DE+EN) — aus Produkt-Guides
- 10 PlantUML-Diagramme in Papers (Transformer, RAG, LoRA, ReAct, CAI)
- sitemap.xml (60+ URLs) + robots.txt
- Skip-to-Content Link + main Landmark
- Custom 404-Seite bilingual

### Verbessert
- AI Act Timeline korrigiert: Art. 4 gilt seit 02.02.2025
- 5 Artikel mit Produkt-Guide-Content angereichert
- 14 Blog-Posts mit visuellen Elementen (ASCII, Tabellen)
- 4 kurze Posts erweitert (186→434, 320→653, 453→853, 479→914)
- 36 Blog-Umlaut-Fixes + 14 Frontmatter vereinheitlicht
- Version-Badges in 9 Tool-Artikeln
- LangChain Code: ChatOllama statt legacy OllamaLLM
- OG-Image in Metadata referenziert
- EN layout lang="en"
- 2 kaputte Links gefixt
- aria-labels für Barrierefreiheit

### Entfernt
- Stripe-CTAs aus 23 Wiki-Artikeln (Wissen/Verkauf sauber getrennt)
- "S9" internes Jargon von Homepage

### Infrastruktur
- GitHub Actions CI/CD für Cloudflare Pages
- 5 Repos PUBLIC mit Enterprise-Grade READMEs
- legal-scraper PII-bereinigt und PUBLIC
- Alle Repo-Descriptions gesetzt
- 3 Firecrawl API Keys im Vault

## [1.1.0] — 2026-03-21

### Hinzugefügt
- **Papers-Kategorie**: 5 Artikel (DE+EN) — Attention, RAG, LoRA, ReAct, Constitutional AI
- **22 PlantUML-Diagramme** in 19 Artikeln (Transformer, Agent-Kommunikation, Risikoklassen, NemoClaw, MCP Architecture u.v.m.)
- **Custom 404-Seite** bilingual (DE/EN) mit Suchfeld und Kategorie-Links
- **GitHub Actions CI/CD** — Auto-Deploy nach Cloudflare Pages bei Push auf main
- **EN Startseite** auf DE-Niveau angeglichen (Eagle Hero, Tools, Compliance, Links)
- **Blog Redesign** — Featured Post, Card-Grid, Hero-Images, Tag-Filter, Lesezeit, Share-Links
- **Lernpfad Upgrade** — 4 Phasen, Icons, Zeitangaben, Fortschrittsbalken, AT-Ressourcen
- **Österreichische Quellen** — WKO AI-Toolbox, RTR KI-Servicestelle, FFG, caralegal in 5+ Artikeln
- **Nützliche Links** auf Homepage — Ollama Library, arXiv, HuggingFace, WKO, RTR, FFG
- **Coming Soon EN** — kurse.ai-engineering.at englische Version
- **DEPLOY.md** — Deployment-Dokumentation

### Verbessert
- 5 schwache Artikel auf 8/10 gebracht (heartbeat, task-delegation, memory, troubleshooting, mcp-server)
- 859 Umlaut-Fixes (ue→ü, oe→ö, ae→ä) in 58 Dateien
- GPT-4o Preise auf Stand März 2026 ($5/$15 pro 1M Tokens)
- EU AI Act Datum korrigiert (12. Juli 2024 Amtsblatt)
- Blog Posts: Umlaute, Hero-Images, kaputte Links repariert
- Homepage: Eagle-Hero statt leer, keine Werbung als erstes, nützliche Inhalte zuerst

### Architektur
- Eigene GitHub-Repo (extrahiert aus Playbook01)
- Repo PUBLIC: github.com/AI-Engineerings-at/wiki
- GitHub Actions Workflow für Cloudflare Pages Deploy
- next.config.mjs mit `output: 'export'` für Static Export

### Qualität
- Wahrheitscheck: 10 Artikel manuell geprüft, 2 Fehler gefunden und gefixt
- Alle 49 Content-Artikel haben Quellen-Section
- Keine Mock-Daten, keine Fake-Benchmarks (S9-Regel)
- Build verifiziert: 0 Errors
- 3 Firecrawl API Keys im Vault für zukünftige Paper-Pipeline

## [1.0.0] — 2026-03-21

### Hinzugefügt
- 106+ Artikel (53 DE + 53 EN) zu AI, LLMs, Compliance, Tools, Patterns, Security
- Homepage mit Eagle-Hero, Tools-Library, Compliance-Section, nützliche Links
- Language Switcher DE/EN im Header (Desktop + Mobile)
- Custom Components: Callout, KeyTakeaway, ComparisonTable, PlantUML (Kroki)
- SearchBar, Breadcrumbs, Sidebar, RelatedArticles, ArticleFeedback
- PlantUML Diagramme via Kroki API (transparenter Hintergrund)
- EU AI Act Compliance-Artikel mit Timeline und Checkliste
- DSGVO Grundlagen mit Art. 30, DPIA, Betroffenenrechte
- Quellen-Sections in 60+ Artikeln (echte URLs, S9-konform)
- Produkt-Thumbnails in `/images/products/`
- OG-Image und Logo

### Architektur
- Next.js 14 App Router + Tailwind CSS
- Cloudflare Pages Deployment
- Eigene GitHub-Repo (extrahiert aus Playbook01)

### Qualität
- Wahrheitscheck: Alle Hardware-Angaben, Preise, Benchmarks geprüft
- Umlaute korrekt (ü, ö, ä — nicht ue, oe, ae)
- Keine Mock-Daten, keine Fake-Benchmarks (S9-Regel)
- GPT-4o Preise auf Stand März 2026 aktualisiert
- EU AI Act Datum korrigiert (12. Juli 2024 Amtsblatt)
