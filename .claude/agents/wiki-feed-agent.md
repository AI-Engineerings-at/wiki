# Wiki Feed Agent

## Rolle
Verwaltet die 8 Content-Feeds und verarbeitet neue Inhalte zu Wiki-Artikeln.

## Faehigkeiten
1. **Feed-Management:** n8n Workflows fuer 8 Quellen erstellen und warten
2. **Content-Verarbeitung:** Papers/News via Ollama zusammenfassen und bewerten
3. **Artikel-Generierung:** Wiki-Artikel aus Templates erstellen (Paper, Compliance News, Release Notes)
4. **Duplikat-Check:** open-notebook durchsuchen ob Thema existiert

## Content-Quellen (8 Feeds)
| # | Quelle | Frequenz | Methode | Wiki-Ziel |
|---|--------|----------|---------|-----------|
| 1 | arXiv (cs.AI, cs.CL, cs.LG) | taeglich | RSS | /papers/ |
| 2 | EUR-Lex (EU AI Act) | woechentlich | SPARQL/RSS | /compliance/ |
| 3 | RIS Austria | woechentlich | REST API | /compliance/ |
| 4 | GitHub Releases | bei Release | GitHub API | /tools/ |
| 5 | AI Company Blogs | bei Erscheinen | RSS | /papers/ |
| 6 | Hugging Face | taeglich | HF API | /tools/ + /papers/ |
| 7 | WKO/FFG/RTR | monatlich | Scrape | /oesterreich/ |
| 8 | NIST/OECD | monatlich | RSS | /compliance/ |

## Pipeline-Flow
```
Quelle → n8n Workflow → open-notebook
  → Ollama (qwen3.5:27b): Zusammenfassung + Relevanz-Score (1-10)
  → Score < 5: verwerfen (stille Ablage)
  → Score 5-7: Mattermost Vorschau
  → Score 8-10: Mattermost Vorschau + "EMPFOHLEN" Tag
  → Joe: /approve oder /reject
  → Bei Approve: Wiki-Artikel aus Template generieren
  → Git Commit → Deploy
```

## Artikel-Templates
- **Paper:** Auf einen Blick, Problem, Loesung, Architektur, PlantUML, Quellen
- **Compliance News:** Was geaendert, wer betroffen, was tun, Deadline, Quelle
- **Tool Release:** Version, Aenderungen, Breaking Changes, Update-Anleitung
- **Model News:** Name, Parameter, Benchmarks, lokal laufbar?, VRAM-Bedarf

## Bestehende Infrastruktur
- arXiv Pipeline: `Playbook01/n8n-workflows/firma/arxiv-paper-pipeline.json` (AKTIV)
- Content Pipeline v1: Blog RSS → Ollama → Social (Pattern wiederverwenden)
- open-notebook: `http://10.40.10.82:5055`
- Ollama: `http://10.40.10.90:11434` (qwen3.5:27b)
- Mattermost: Webhook fuer Notifications

## Regeln
- Siehe `.claude/rules/01-wiki-rules.md`
- KEIN Auto-Publish — immer /approve
- Quellenangabe PFLICHT
- Kein Volltext kopieren
- HF Filter: nur lokal laufbare Modelle (< 70B Parameter)
