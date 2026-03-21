---
title: "49 Custom Skills für Claude Code — So automatisieren wir alles"
date: "2026-03-09"
summary: "Wie wir 49 maßgeschneiderte Skills gebaut haben, die unsere AI-Agents steuern."
tags: ["skills", "claude-code", "automation", "productivity"]
author: "AI Engineering"
---

# 49 Custom Skills für Claude Code — So automatisieren wir alles

<figure style="margin: 2rem 0;">
  <img src="/images/blog/49-custom-skills.png" alt="49 Custom Skills für Claude Code" style="border-radius: 12px; width: 100%;" />
  <figcaption style="text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-top: 0.5rem;">49 maßgeschneiderte Skills steuern unsere AI-Agents</figcaption>
</figure>

Wir betreiben 11 AI-Agents, 30+ Docker Services, und 56 n8n Workflows. Alles davon wird über Claude Code Skills gesteuert. 49 Stück, alle selbst gebaut, null externe Dependencies.

Hier ist, was wir draus gelernt haben.

## Was ein Skill eigentlich ist

Ein Skill ist eine `SKILL.md` Datei mit YAML Frontmatter und Prompt-Anweisungen. Claude Code lädt Skills automatisch aus `.claude/skills/` Verzeichnissen. Keine Installation, kein Package Manager, keine Runtime — eine Markdown-Datei.

```yaml
---
name: "deploy"
description: "Deploy Voice Gateway or Dashboard to Docker Swarm"
command_injection: "git log --oneline -5"
version: "1.2.0"
---
```

Der Body beschreibt Schritt für Schritt, was Claude tun soll. Fehlerfaelle inklusive.

## Die 6 Kategorien

/ *The 6 Categories — EN Summary*
/ *We organize skills into Infrastructure, Agent Management, Content, Marketing, Organization, and Operations. Each category maps to a specific repo and team responsibility.*

### Infrastructure & Ops (6 Skills)

Die Basis. Deploy-Automation, Swarm Recovery, VM Management, n8n Workflow-Operationen.

**Highlight: `swarm-raft-recovery`** — Wenn das Docker Swarm Quorum verloren geht (ist uns am 08.03 passiert), führt dieser Skill durch die Recovery: `--force-new-cluster`, Node Rejoin, Label-Restore, Service-Verifikation. Was frueher 3 Stunden gedauert hat, geht jetzt in 15 Minuten.

### Agent Management (7 Skills)

Jeder der 11 Agents braucht Credential-Zugriff, Task-Tracking, und Mattermost-Polling. Drei `mm-wait` Skills allein — einer pro Agent-Typ. Der `agent-vault` Skill ist die zentrale Schnittstelle zur Credential-Datenbank.

### Documentation & Orchestration (4 Skills)

`full-sync` ist der maechtiste hier: Eine 10-Schritt Pipeline die Docs aktualisiert, ERPNext Tasks synchronisiert, open-notebook beschickt, Git Commits macht, und das Ergebnis in Mattermost postet. Ein Befehl, alles synchron.

### Content & Creative (5 Skills)

Diagramme via Kroki, Content Quality Gates, ComfyUI Workflow-Design für Bildgenerierung. Der `content-quality` Skill prüft jeden Text gegen unseren Humanizer Score — kein AI-Jargon, keine Floskeln, Score muss über 85 liegen.

### Marketing (10 Skills)

Die größte Kategorie. SEO-Analyse, Ad Copy, Sales Funnel Mapping, Landing Page CRO, Marketing-Audits mit Score 0-100. Der `market-audit` Skill prüft 5 Dimensionen und gibt eine Gesamtnote mit konkreten Verbesserungsvorschlaegen.

### Organisation & Firma (5 Skills)

OKR-Tracking, Sprint-Planung, Meeting-Protokolle mit automatischen Action Items die direkt als ERPNext Tasks landen. Der `firma-finance` Skill zieht Stripe Revenue-Daten und erstellt Cashflow-Übersichten.

## Top 5 Skills im Detail

### 1. `deploy` — Der Arbeitstier-Skill

Kopiert Dateien via SCP, baut Docker Images, updated Swarm Services, prüft Health Endpoints. Kein manuelles SSH mehr.

### 2. `n8n-workflow-ops` — CRUD für Workflows

Erstellen, aktivieren, deaktivieren, importieren. Kennt die n8n 2.x Gotchas (Luxon statt Moment.js, `=` Prefix für Expressions, `active` ist read-only bei PUT).

### 3. `content-quality` — Der Humanizer

Prueft Texte gegen 24 Anti-AI-Writing-Regeln. Keine "pivotal", "landscape", "tapestry" Wörter. Kein "serves as" wenn "ist" reicht. Score unter 85 = automatischer Rewrite.

### 4. `jim-manager` — Team-Delegation

Zeigt Team-Status, offene Tasks, Agent-Verfügbarkeit. Entscheidet welcher Agent den nächsten Task bekommt. Der Orchestrator-Skill.

### 5. `skill-creator` — Meta-Skill

Erstellt neue Skills in 8 Schritten: Verzeichnis anlegen, Frontmatter generieren, Body scaffolden, Quality Gate prüfen, im Katalog eintragen. Ein Skill der Skills baut.

## Quality Gate

/ *Quality Gate — EN*
/ *Every skill must pass: complete frontmatter, clear instructions, error handling, no hardcoded credentials, cataloged, and tested at least once.*

Jeder Skill durchläuft vor der Freigabe:

1. **Frontmatter komplett** — name, description, version
2. **Body klar** — Schritt-für-Schritt, keine Unklarheiten
3. **Fehler-Handling** — Was passiert wenn etwas schiefgeht?
4. **Keine Credentials** — Alles via Vault, nie im Klartext
5. **Katalogisiert** — Im Skill-Katalog mit Kategorie und Trigger
6. **Getestet** — Mindestens 1x manuell ausgeführt

## Lifecycle

```
Idee → /skill-creator → Scaffolding
  → Body schreiben → Testen
  → Katalog eintragen → LIVE
  → Maintainen → Version bumpen
  → Veraltet? → DEPRECATED + Ersatz dokumentieren
```

Aktuell ist 1 von 49 Skills deprecated (`task-manager`, ersetzt durch ERPNext Tasks). Die anderen 48 sind aktiv im Einsatz.

## Zahlen

| Metrik | Wert |
|--------|------|
| Eigenbau-Skills | 49 |
| Externe Skills | 0 |
| Repos | 2 (phantom-ai + Playbook01) |
| Kategorien | 6 |
| Skills mit Scripts | 5 |
| Deprecated | 1 |
| Agents die Skills nutzen | 11 |

## Was wir gelernt haben

1. **Klein halten.** Ein Skill der 3 Dinge kann, wird zu einem Skill der keine davon gut kann. Lieber 3 fokussierte Skills.

2. **Trigger-Keywords sind alles.** Wenn Claude den Skill nicht findet, existiert er nicht. Die Description muss die richtigen Wörter enthalten.

3. **Fehler-Handling ins Body.** Nicht "Error? Frag den User." Sondern: "SSH Timeout? 3x Retry, dann abbrechen mit Log."

4. **Credentials nie im Skill.** Auch nicht "nur für Tests". Vault oder nichts.

5. **Deprecated != gelöscht.** Alte Skills bekommen ein Flag und einen Verweis auf den Ersatz. So bricht nichts.

## Zum Mitnehmen

Wer den kompletten Stack will — Skills, Agents, Infrastructure, Workflows: Das [Claude Code AI OS Template](https://buy.stripe.com/bJe9AT5Nt0vL81Efo0fQI07) für EUR 249 enthält unsere komplette Skill-Library mit 49 Skills, Agent-Definitionen und die Quality Gate Pipeline.
