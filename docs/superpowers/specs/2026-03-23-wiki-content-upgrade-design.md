# Wiki Content Upgrade — Enterprise Grade Design Spec

**Datum:** 2026-03-23
**ERPNext:** TASK-2026-00339 (erweitert)
**Scope:** Kachel-Bilder, Content Feeds, Paper Pipeline, Test-Agent Erweiterung, Legal Scraper Integration

---

## 1. Vision

Die Wiki (wiki.ai-engineering.at) wird zur **zentralen, lebendigen Wissensbasis** fuer AI + Recht im DACH-Raum. Nicht statisch, sondern mit automatisierten Content-Feeds die neue Papers, Gesetzesaenderungen, Tool-Releases und Modell-Neuheiten einspielen — geprueft und kuratiert via `/approve`.

Alles an einem Ort. Immer aktuell. Enterprise Grade.

---

## 2. Kachel-Bilder (alle Kategorieseiten)

### Problem
Alle Artikel-Kacheln auf Kategorieseiten (Tools, Patterns, Security, Compliance, Papers, Grundlagen) sind reiner Text. Kein Bild, kein Logo, kein Thumbnail. Sieht aus wie eine Todo-Liste.

### Design-Regel
- **Grosse Kachel/Card (Hauptbild):** IMMER echtes Bild (Logo oder generiert). NIE grosses Emoji.
- **Kleine Inline-Elemente (Tags, Sidebar, Badges):** Emoji ist okay.

### Bild-Prioritaeten
1. **Offizielle Tool-Logos** — Docker, Ollama, n8n, Grafana, Proxmox, Mattermost, etc.
   - Lizenz: Open Source Projekte erlauben Logo-Nutzung fuer Educational/Editorial Content
   - Format: SVG bevorzugt, PNG Fallback
   - Groesse: 200x150px Thumbnail, optimiert (<50KB)
2. **ComfyUI-generierte Bilder** — fuer Konzepte ohne offizielles Logo (RAG, MCP, Model Selection, Agent Orchestration, Memory Management, etc.)
   - Workflow: `phantom-ai/n8n-workflows/comfyui-media-generator.json` (FLUX.2 Dev FP8 auf .90)
   - Neuer Workflow-Modus: "thumbnail" mit 512x384px Output (statt 1344x768)
   - Stil: Konsistent, branded, dark theme passend zur Wiki
3. **Emoji** — NUR als Notloesung fuer kleine Elemente, NIE als Hauptbild

### Betroffene Kacheln (~57)
| Kategorie | Anzahl | Bild-Typ |
|-----------|--------|----------|
| Tools | 17 | Logos (Docker, Ollama, n8n, Grafana, Proxmox, Mattermost) + generiert (RAG, MCP, Model Selection) |
| Patterns | 10 | Generiert (Agent Orchestration, Memory, Safety Hooks, etc.) |
| Security | 5 | Generiert (Firewall, Encryption, Backup, API Keys) |
| Compliance | 10 | Generiert (EU AI Act, DSGVO) + offizielle EU-Logos wo verfuegbar |
| Papers | 5+ | Generiert (paper-spezifisch) oder arXiv Thumbnail |
| Grundlagen | 10 | Generiert (LLM, Agent Team, Cloud vs Lokal) |

### Technische Umsetzung
- `Article` Type in `lib/articles.ts` erhaelt neues Feld: `thumbnail?: string` (Pfad zu `/images/thumbnails/`)
- Kategorieseiten-Component zeigt Thumbnail links neben Titel/Beschreibung
- Fallback: Wenn kein Thumbnail → generiertes Placeholder-Bild mit Kategorie-Icon
- Bilder in `/public/images/thumbnails/` — optimiert, WebP Format, max 50KB

### Guideline-Dokumentation
In `WIKI-STYLE-GUIDE.md` ergaenzen:
- Bild-Regeln (gross = echtes Bild, klein = Emoji okay)
- Thumbnail-Spezifikation (200x150px, WebP, <50KB)
- Logo-Lizenz-Checkliste
- ComfyUI Prompt-Vorlage fuer konsistenten Stil

---

## 3. Content Feed Pipeline

### Architektur

```
8 Quellen (RSS/API/Scrape)
    |
    v
n8n Workflows (je Quelle 1 Workflow)
    |
    v
open-notebook (zentrale Wissensbasis)
    |
    v
Ollama Zusammenfassung + Relevanz-Score + Kategorie-Zuweisung
    |
    v
Mattermost Vorschau (#wiki-content Channel)
    |
    v
Joe: /approve oder /reject
    |
    v
Wiki-Artikel generieren (Template pro Kategorie)
    |
    v
Git Commit → GitHub → CI/CD Quality Gate → Deploy
```

### Content-Quellen (8 Feeds)

| # | Quelle | Was | Frequenz | Methode | Wiki-Ziel |
|---|--------|-----|----------|---------|-----------|
| 1 | **arXiv** | AI Papers (cs.AI, cs.CL, cs.LG) | taeglich | RSS (existiert) | `/papers/` |
| 2 | **EUR-Lex** | EU AI Act Aenderungen, neue AI-Verordnungen | woechentlich | SPARQL/RSS | `/compliance/` News |
| 3 | **RIS Austria** | Oesterreichische Gesetze mit AI-Bezug | woechentlich | REST API | `/compliance/` News |
| 4 | **GitHub Releases** | Ollama, n8n, Docker, Grafana, Proxmox | bei Release | GitHub API/RSS | `/tools/` Release Notes |
| 5 | **AI Company Blogs** | Anthropic, OpenAI, Meta AI, Mistral, Google DeepMind | bei Erscheinen | RSS | `/papers/` oder `/grundlagen/` |
| 6 | **Hugging Face** | Trending Models, neue Datasets, Papers | taeglich | HF API + RSS | `/tools/` + `/papers/` |
| 7 | **WKO/FFG/RTR** | Oesterreichische Foerderungen, KI-Servicestelle | monatlich | Scrape | `/oesterreich/` |
| 8 | **NIST/OECD** | Internationale AI-Governance Standards | monatlich | RSS/Scrape | `/compliance/` |

### Bestehende Infrastruktur (wiederverwenden)
- arXiv Pipeline: `Playbook01/n8n-workflows/firma/arxiv-paper-pipeline.json` — AKTIV
- Legal Scraper: `projects/legal-scraper/` — BROKEN (TASK-2026-00288), muss gefixt werden
- Content Pipeline v1: Blog RSS → Ollama → Social Media — Pattern wiederverwenden
- ComfyUI Media Generator: Bild-Generierung fuer Thumbnails
- open-notebook: Zentrale Wissensbasis (RAG + Search)

### Qualitaetskontrolle (S9-konform)
- **Kein Auto-Publish** — IMMER `/approve` durch Joe
- **Relevanz-Filter:** Ollama bewertet jedes Paper/Update mit Score 1-10
  - Score < 5 → automatisch verworfen, stille Ablage in open-notebook
  - Score 5-7 → Mattermost Vorschau, Joe entscheidet
  - Score 8-10 → Mattermost Vorschau mit "EMPFOHLEN" Tag
- **Duplikat-Check:** open-notebook durchsuchen ob Thema schon existiert
- **Quellen-Pflicht:** Jeder generierte Artikel hat Originalquelle + Link + Datum
- **Kein Volltext-Kopieren:** Zusammenfassung + eigene Einordnung (wissenschaftlicher Standard)

### Wiki-Artikel Templates (pro Kategorie)
- **Paper Template:** Auf einen Blick, Problem, Loesung, Architektur, PlantUML Diagramm, Quellen
- **Compliance News Template:** Was hat sich geaendert, wer ist betroffen, was tun, Deadline, Quelle
- **Tool Release Template:** Version, wichtigste Aenderungen, Breaking Changes, Update-Anleitung
- **Model News Template:** Modellname, Parameter, Benchmarks, Verfuegbarkeit (lokal?), VRAM-Bedarf

---

## 4. Wiki-Struktur Erweiterung

### Neue Bereiche (in bestehende Kategorien integriert)

| Kategorie | Neuer Bereich | Beispiel-Inhalte |
|-----------|---------------|------------------|
| `/papers/` | Bleibt Hauptbereich fuer wissenschaftliche Papers | arXiv, HF Papers, Company Research |
| `/compliance/` | + "Aktuelles" Section | EUR-Lex Updates, RIS Aenderungen, NIST/OECD News |
| `/tools/` | + "Release Notes" Section | Ollama 0.6.x, n8n 1.x, Docker Updates |
| `/oesterreich/` | + Foerderungen/News | FFG Calls, WKO Updates, RTR Meldungen |
| `/grundlagen/` | Neue Artikel aus Paper-Erkenntnissen | "Hierarchisches Reasoning vs CoT" aus Paper-Pipeline |

### SEO-Struktur
- Jede Seite: `<title>`, `<meta description>`, Open Graph Tags, Canonical URL
- Sitemap: ALLE Seiten eingetragen (aktuell fehlen Blog-Posts)
- Structured Data: JSON-LD fuer Articles (Schema.org/Article)
- hreflang Tags: DE ↔ EN Verknuepfung

### Barrierefreiheit (a11y)
- WCAG 2.1 Level AA als Ziel
- Alle Bilder: Alt-Text (beschreibend, nicht "Bild von...")
- Heading-Hierarchie: h1 → h2 → h3 (keine Spruenge)
- Keyboard-Navigation: Alle interaktiven Elemente erreichbar
- Kontrast: Minimum 4.5:1 fuer Text, 3:1 fuer grosse Elemente
- Skip-to-Content Link (existiert bereits)
- ARIA-Labels auf Navigation und interaktiven Elementen

### DSGVO/Datenschutz
- **Keine externen Fonts** (Google Fonts CDN = DSGVO-Verstoss) — lokale Fonts verwenden
- **Keine Tracking-Cookies** ohne Consent Banner
- **Keine externen Analytics** ohne Datenschutzhinweis (Plausible ist self-hosted okay)
- **Keine externen Bilder** (Hotlinking von arXiv/HF) — immer lokal speichern
- **Impressum + Datenschutz** verlinkt (existiert, verweist auf ai-engineering.at)
- Alle externen Links: `rel="noopener noreferrer"` (existiert teilweise)

---

## 5. Test-Agent Erweiterung

### Bestehende Tests (aus TASK-2026-00339)
- `wiki-pages.spec.ts` — 137 Seiten: HTTP 200, h1, Console Errors
- `wiki-images.spec.ts` — Bilder laden auf Hub-Seiten
- `wiki-links.spec.ts` — Keine broken internal Links
- `wiki-i18n.spec.ts` — Sprachumschaltung DE↔EN

### Neue Tests (Enterprise Grade)

#### SEO Tests (`wiki-seo.spec.ts`)
- Jede Seite hat `<title>` (nicht leer, nicht default)
- Jede Seite hat `<meta name="description">` (min 50, max 160 Zeichen)
- Jede Seite hat Open Graph Tags (og:title, og:description, og:image)
- Jede Seite hat Canonical URL
- Keine doppelten h1 Tags
- Sitemap enthaelt ALLE Seiten

#### Barrierefreiheit Tests (`wiki-a11y.spec.ts`)
- Alle `<img>` haben `alt` Attribut (nicht leer)
- Heading-Hierarchie: kein h3 ohne vorheriges h2
- Alle Links haben erkennbaren Text (kein "hier klicken")
- Farbkontrast-Check (via Playwright axe-core Integration)
- Keyboard Tab-Order funktioniert
- Skip-to-Content Link vorhanden und funktional

#### DSGVO Tests (`wiki-privacy.spec.ts`)
- Keine requests an Google Fonts CDN (fonts.googleapis.com)
- Keine requests an Google Analytics (google-analytics.com)
- Keine requests an Facebook Pixel
- Alle externen Links haben `rel="noopener noreferrer"`
- Impressum + Datenschutz Links im Footer vorhanden und erreichbar

#### Quellen Tests (`wiki-sources.spec.ts`)
- Paper-Seiten haben mindestens 1 externe Quellenangabe
- Compliance-Seiten haben Link zu Originalgesetz
- Keine toten externen Links (Stichprobe, nicht alle)

### CI/CD Integration
Alle neuen Tests laufen im `quality-gate` Job — kein Deploy ohne:
1. Lint (existiert)
2. Build (existiert)
3. Page Tests (existiert)
4. SEO Tests (NEU)
5. a11y Tests (NEU)
6. DSGVO Tests (NEU)
7. Quellen Tests (NEU)

---

## 6. Legal Scraper Integration

### Status
- Projekt: `projects/legal-scraper/`
- Task: TASK-2026-00288
- Problem: Content Extraction liefert 0 chars
- Plan existiert: `phantom-ai/docs/superpowers/plans/2026-03-20-legal-scraper-production.md`

### Ziel-Integration
Legal Scraper wird als **modularer Feed** an die Content Pipeline angedockt:
```
Legal Scraper (EUR-Lex + RIS)
  → Change Detection (SHA-256 Hash)
  → Bei Aenderung: open-notebook Source erstellen
  → Ollama: Zusammenfassung + Relevanz
  → Mattermost: /approve
  → Wiki Compliance News Artikel
```

### Modularitaet
- Legal Scraper bleibt eigenstaendiges Projekt
- Kommunikation via REST API (FastAPI)
- Wiki-Integration ist ein separater n8n Workflow der die API abfragt
- Kein direkter Code-Dependency zwischen Legal Scraper und Wiki

---

## 7. Hugging Face Feed

### Was wir von HF beziehen
| Datentyp | HF Quelle | Wiki-Ziel | Methode |
|----------|-----------|-----------|---------|
| Trending Models | HF API `/models?sort=trending` | `/tools/` oder neuer Bereich | HF API |
| Neue Papers | HF Daily Papers (https://huggingface.co/papers) | `/papers/` | RSS/API |
| Model Releases | HF Blog RSS | `/grundlagen/` oder `/tools/` | RSS |
| Datasets | HF API `/datasets?sort=trending` | Nur open-notebook (intern) | HF API |

### Relevanz-Filter
- Nur Modelle die **lokal laufbar** sind (nicht >100B Parameter die GPU-Cluster brauchen)
- Nur Papers mit Bezug zu: Agents, RAG, Fine-Tuning, Safety, Compliance, Edge/Local
- Datasets nur intern in open-notebook, nicht in Wiki (zu technisch fuer KMU-Zielgruppe)

---

## 8. Rechtliches / Legal

### Was wir duerfen
- **Papers zusammenfassen + kommentieren** — wissenschaftlicher Standard, Fair Use
- **Gesetze zitieren** — Gesetzestexte sind gemeinfrei (kein Copyright)
- **Tool-Logos verwenden** — Open Source Projekte erlauben Editorial Use (Docker, Ollama, n8n etc.)
- **HF Model-Infos verwenden** — Oeffentliche API-Daten, Model Cards sind CC-lizenziert

### Was wir NICHT duerfen
- **Paper-Volltext kopieren** — nur Zusammenfassung + eigene Einordnung
- **Proprietaere Logos** ohne Pruefung — OpenAI/Anthropic/Google Logos brauchen Brand Guidelines Check
- **Bilder von Papers** direkt uebernehmen — Diagramme selbst erstellen (PlantUML)
- **Paywalled Content** scrapen — nur frei zugaengliche Quellen

### Quellenangabe-Pflicht
Jeder automatisch generierte Artikel enthaelt:
- Originaltitel + Autoren
- Link zum Original (arXiv, EUR-Lex, GitHub, HF)
- Datum der Quelle
- Hinweis: "Zusammenfassung und Einordnung durch AI Engineering"

---

## 9. Phasenplan

### Phase 1: Kachel-Bilder + Test-Erweiterung (Woche 1)
- Tool-Logos beschaffen + Lizenz pruefen
- ComfyUI Thumbnail-Workflow erstellen
- Thumbnails fuer alle 57 Kacheln generieren
- Article-Type um `thumbnail` erweitern
- Kategorieseiten-Component anpassen
- E2E Tests: SEO, a11y, DSGVO, Quellen
- WIKI-STYLE-GUIDE.md updaten

### Phase 2: Content Pipeline Kern (Woche 2)
- arXiv Pipeline erweitern (Ollama Summary + Relevanz + /approve)
- Paper Wiki-Artikel Template
- GitHub Releases Feed (Ollama, n8n, Docker)
- Tool Release Notes Template
- HF Trending Models Feed
- HF Papers Feed

### Phase 3: Compliance + Legal Feeds (Woche 3)
- Legal Scraper fixen (TASK-2026-00288)
- EUR-Lex Feed Workflow
- RIS Austria Feed Workflow
- Compliance News Template
- WKO/FFG/RTR Scraper

### Phase 4: Stabilisierung + Monitoring (Woche 4)
- AI Company Blogs Feed (Anthropic, OpenAI, Meta, Mistral, Google)
- NIST/OECD Feed
- Pipeline Monitoring (Grafana Dashboard)
- Fehler-Alerting wenn Feeds ausfallen
- Dokumentation finalisieren

---

## 10. Erfolgskriterien

- [ ] Alle 57+ Kacheln haben echte Bilder (kein grosses Emoji)
- [ ] 8 Content-Feeds aktiv und geprueft
- [ ] Neue Papers/Updates kommen via /approve in die Wiki
- [ ] CI/CD prueft: SEO, a11y, DSGVO, Quellen, Bilder, Links
- [ ] Kein Deploy ohne gruene Tests
- [ ] Legal Scraper laeuft und liefert Compliance-Updates
- [ ] WIKI-STYLE-GUIDE.md vollstaendig dokumentiert
- [ ] Alle Bilder <50KB, WebP, mit Alt-Text
- [ ] DSGVO-konform: keine externen Fonts/Tracker
- [ ] Barrierefreiheit: WCAG 2.1 AA
