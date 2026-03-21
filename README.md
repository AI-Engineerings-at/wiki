# >_< AI Engineering Wiki

**URL:** https://wiki.ai-engineering.at
**Logo:** `>_<`

Die deutschsprachige Wissensdatenbank zu **Agentic Engineering**, Agent Orchestration, Multi-Agent Systemen und DSGVO-konformem AI-Stack.

---

## Inhalt

- [Uebersicht](#uebersicht)
- [Struktur](#struktur)
- [Sprachen](#sprachen)
- [Kategorien](#kategorien)
- [Produkt-CTAs](#produkt-ctas)
- [Lead Magnets](#lead-magnets)
- [Deployment](#deployment)
- [Entwicklung](#entwicklung)

---

## Uebersicht

Die Wiki enthaelt **80+ Artikel** in Deutsch und Englisch zum Thema:

- **Agentic Engineering** (Autonomous Agents, Blueprint Engines, MCP Tools)
- Agent Orchestration Patterns & Multi-Agent Systems
- Lokaler AI-Stack (Ollama, Docker, n8n)
- DSGVO/GDPR Compliance & EU AI Act
- Security & Monitoring
- Tools & Tutorials

---

## Branding

### Farben (v2 Blue/Slate Theme)
```css
--color-brand: #4262FF        /* Neon Blue (v2) */
--color-brand-hover: #3550DD  /* Darker Blue */
--color-bg-base: #020617      /* Slate 950 */
--color-bg-surface: #0f172a   /* Slate 900 */
--color-text-primary: #ffffff
--color-text-secondary: #cbd5e1
```

### Logo
- Wiki Logo: `>_<` (eigenes Wiki-Logo)
- Font: Geist Sans (Inter Fallback)
- Button text color: white on #4262FF

---

## Struktur

```
wiki/
├── app/
│   ├── globals.css          # Design Tokens (Blue/Slate Theme)
│   ├── layout.tsx           # Deutsche Navigation + Footer
│   ├── page.tsx             # Deutsche Startseite
│   ├── en/
│   │   ├── layout.tsx       # English Navigation
│   │   ├── page.tsx         # English Home
│   │   ├── grundlagen/      # Basics (10 Artikel)
│   │   ├── tools/           # Tools (9 Artikel)
│   │   ├── patterns/        # Patterns (5 Artikel)
│   │   ├── security/        # Security (3 Artikel)
│   │   ├── compliance/      # Compliance (6 Artikel)
│   │   └── support/         # Support (2 Artikel)
│   ├── grundlagen/          # German Basics
│   ├── tools/               # German Tools
│   ├── patterns/            # German Patterns
│   ├── security/            # German Security
│   ├── compliance/          # German Compliance
│   └── support/             # German Support
├── components/              # Shared Components (GlobalCta)
└── out/                     # Build Output
```

---

## Sprachen

| Sprache | URL | Seiten |
|---------|-----|--------|
| Deutsch | wiki.ai-engineering.at | 37+ |
| English | wiki.ai-engineering.at/en | 38+ |

---

## Kategorien

### Grundlagen (Basics)
- Was ist Agent Orchestration?
- Multi-Agent Systeme
- Agent Rollen & Verantwortung
- Lokal vs Cloud: TCO Vergleich
- Ollama vs Cloud LLM
- AI Agent Team aufbauen
- Self-hosted vs Cloud Services
- 30-Tage Quickstart Guide
- KI im Unternehmen
- AI Kosten Vergleich

### Tools
- Docker vs Docker Swarm
- Ollama Tutorial
- RAG Guide
- n8n fuer Anfaenger
- Mattermost Agent
- Grafana Monitoring
- Proxmox Setup
- MCP Server
- Model Selection Guide

### Patterns
- Agent Orchestration Patterns
- Memory Management
- Task Delegation
- Safety Hooks
- Heartbeat & Monitoring

### Security
- API Keys sicher speichern
- Firewall Setup
- Backup Strategie

### Compliance
- DSGVO Grundlagen
- EU AI Act
- EU AI Act Checkliste
- Verbotene AI-Praktiken
- Chatbot Transparenzpflichten
- Datenschutz Praxis

### Support
- Troubleshooting Guide

---

## Produkt-CTAs

Jeder Artikel enthaelt einen CTA zum passenden Produkt:

| Artikel | Produkt | Preis |
|---------|---------|-------|
| n8n fuer Anfaenger | n8n AI Workflow Bundle | EUR 29 |
| Docker vs Swarm | Playbook 01 | EUR 49 |
| Grafana Monitoring | Grafana Dashboard Pack | EUR 39 |
| DSGVO Grundlagen | DSGVO Compliance Bundle | EUR 79 |
| EU AI Act Checkliste | DSGVO Compliance Bundle | EUR 79 |
| Agent Orchestration | AI Agent Team Blueprint | EUR 19 |

---

## Lead Magnets

Kostenlose Ressourcen in `products/free-lead-magnet/`:

| Lead Magnet | Datei | Sprache |
|------------|--------|---------|
| EU AI Act Checkliste | eu-ai-act-checkliste.md | DE |
| EU AI Act Checklist | eu-ai-act-checkliste-en.md | EN |
| 30-Tage Quickstart | 30-tage-ai-stack-quickstart.md | DE |
| 30-Day Quickstart | 30-tage-ai-stack-quickstart-en.md | EN |
| Cost Calculator | local-ai-cost-calculator.md | DE |

---

## Deployment

### Voraussetzungen
- Node.js 18+
- Cloudflare Account

### Build
```bash
cd wiki
npm install
npm run build
```

### Deploy (Cloudflare Pages)
```bash
npx wrangler pages deploy out/
```

### Lokal testen
```bash
cd wiki
npm run dev
# Oeffne http://localhost:3000
```

---

## Statistik

| Metrik | Anzahl |
|--------|--------|
| Gesamt Seiten | 80 |
| Deutsche Artikel | 37+ |
| Englische Artikel | 38+ |
| Kategorien | 6 |
| Produkt-CTAs | 15+ |
| Lead Magnets | 5 |

---

## Wartung

### Neuen Artikel erstellen
1. Neue `page.tsx` in passender Kategorie erstellen
2. Metadata hinzufuegen:
```tsx
export const metadata = {
  title: 'Titel | AI Engineering Wiki',
  description: 'Beschreibung...',
}
```
3. Build testen: `npm run build`

---

## Lizenz

(c) 2026 AI Engineering — Alle Rechte vorbehalten

---

## Kontakt

- Website: https://www.ai-engineering.at
- Wiki: https://wiki.ai-engineering.at
- Email: kontakt@ai-engineering.at
