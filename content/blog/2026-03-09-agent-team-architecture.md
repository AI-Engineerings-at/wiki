---
title: "Agent Team Architecture — Wie 11 AI-Agents zusammenarbeiten"
date: "2026-03-09"
summary: "Multi-Agent Orchestration mit Claude Code — von der Theorie zur Praxis."
tags: ["agents", "architecture", "multi-agent", "orchestration"]
author: "AI Engineering"
---

# Agent Team Architecture — Wie 11 AI-Agents zusammenarbeiten

<figure style="margin: 2rem 0;">
  <img src="/images/blog/agent-team-architecture.png" alt="AI Agent Team Architektur mit 11 Agents" style="border-radius: 12px; width: 100%;" />
  <figcaption style="text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-top: 0.5rem;">Multi-Agent Architektur: 11 AI-Agents auf 5 Rechnern mit 49 Skills</figcaption>
</figure>

11 AI-Agents. 5 Rechner. 49 Skills. Ein self-hosted Chat-System als Backbone. Das ist kein Gedankenexperiment — das läuft seit Wochen in Production.

Hier ist, wie die Architektur funktioniert und was wir dabei gelernt haben.

## Die Grundidee

Ein Agent allein kann viel. Aber ein Agent der deployen, testen, dokumentieren, und Kunden-Emails beantworten soll, wird schnell zum Flaschenhals. Die Lösung: Spezialisierung.

Jeder Agent hat genau eine Rolle. Keiner kann alles, aber zusammen decken sie den kompletten Workflow ab — von Code bis Kundensupport.

## Die 4 Agent-Typen

### Orchestrator

Ein Agent der nicht selbst arbeitet, sondern koordiniert. In unserem Fall: **@jim**.

- Empfängt alle eingehenden Tasks
- Priorisiert nach Dringlichkeit und Abhängigkeiten
- Delegiert an den passenden Worker
- Trackt Fortschritt und prüft Ergebnisse
- Eskaliert an den CEO wenn nötig

Der Orchestrator ist der einzige Agent der mit dem CEO kommuniziert. Kein Worker darf direkt eskalieren — das vermeidet Chaos.

### Worker

Agents die Tasks ausführen. Jeder Worker hat einen klaren Scope:

| Worker | Scope | Maschine |
|--------|-------|----------|
| @jim01 | Code, Git, API, CI/CD, Deployments | Dev-PC |
| @lisa01 | n8n Workflows, Docker, Infrastructure | Worker-Node |
| @john01 | Browser-Tasks, Shop-Updates | Remote-PC |
| @codex_assistant | Code-Analyse via CLI Bridge | Worker-Node |

### Specialist

Agents mit tiefem Wissen in einem Bereich:

| Specialist | Fokus |
|-----------|-------|
| @jim02 | Browser-Tests, QA, Playwright |
| @echo_log | Conversational AI, 36 Tools, Memory |
| @copilot_cli | Research, Code-Generierung |
| @gemini_cli | Code Reviews, alternative Perspektiven |

Der Unterschied zum Worker: Specialists werden nicht für allgemeine Tasks eingesetzt. Sie kommen zum Einsatz wenn ihr Spezialgebiet gefragt ist.

### Observer

**@alerts** überwacht den Stack und meldet Probleme. Kein aktives Eingreifen — nur beobachten und Alarm schlagen. Das ist bewusst so: Ein Agent der gleichzeitig überwacht und eingreift, kann seine eigenen Fehler nicht erkennen.

## Delegation in der Praxis

/ *Delegation in Practice — EN Summary*
/ *Tasks flow from CEO to Orchestrator to Workers. Never skip levels. Destructive actions always require CEO approval. If a worker doesn't respond after 3 retries, escalate.*

### Der Happy Path

```
CEO gibt Richtung → @jim priorisiert
  → @jim delegiert an Worker → Worker führt aus
  → Worker meldet Ergebnis → @jim prüft
  → @jim meldet an CEO → Nächster Task
```

### Was passiert bei Problemen?

| Situation | Aktion |
|-----------|--------|
| Worker antwortet nicht | @jim: 3x Retry, dann CEO informieren |
| Task braucht Daten löschen | @jim fragt CEO — nie eigenmächtig |
| Zwei Worker brauchen gleiche Ressource | @jim koordiniert Reihenfolge |
| Unbekannter Task-Typ | @jim fragt CEO statt zu raten |

### Was NICHT passiert

- Kein Worker delegiert an einen anderen Worker
- Kein Worker kommuniziert direkt mit dem CEO
- Kein Agent löscht Daten ohne CEO-Freigabe
- Kein Agent postet mit dem Token eines anderen Agents

## Kommunikation

### Mattermost als Single Backbone

Alle Agent-Kommunikation läuft über ein self-hosted Mattermost. Warum nicht Slack oder Discord? Drei Gründe:

1. **Self-hosted** — keine Daten verlassen das Netzwerk
2. **Keine Rate Limits** — wir konfigurieren selbst
3. **Kostenlos** — bei 11 Agents wären das bei Slack EUR 88/Monat

### Channel-Architektur

Channels sind nach Funktion organisiert, nicht nach Agent:

```
#team-channel        → Agent-Koordination, Task-Updates
#ceo-dashboard       → KPIs, nur CEO liest
#shop-orders         → Automatische Stripe/Gumroad Notifications
#infra-alerts        → Monitoring-Alerts, Downtimes
#dev-deployments     → Git Commits, CI/CD Status
```

### Das Anti-Loop Problem

11 Agents in einem Chat-System können sich gegenseitig triggern. Agent A postet → Agent B reagiert → Agent A reagiert auf B → Endlosschleife.

Unsere Lösung: 6 Schutzschichten.

1. **Bot-ID Whitelist** — Agents ignorieren Nachrichten von anderen bekannten Bots
2. **Channel Blacklist** — bestimmte Channels sind für bestimmte Agents unsichtbar
3. **Tool-Call Dedup** — gleiche Tool-Calls werden nicht zweimal ausgeführt
4. **Keyword-Router** — nur explizite @mentions triggern Aktionen, nicht Namensnennungen
5. **STOP-Signals** — bei Fehlern wird sofort gestoppt
6. **Mention-Entschärfung** — `@echo_log` wird in Antworten zu `@echo-log` (kein Retrigger)

Das war nötig. Ohne diese Schichten hatten wir in der ersten Woche mehrere Endlosschleifen. Ein Agent hat 45 Nachrichten in 2 Minuten gepostet — der CEO war nicht begeistert.

## CLI Bridges

Nicht alle Agents laufen nativ in Claude Code. Copilot, Gemini, und Codex brauchen ihre eigenen CLIs. Dafür gibt es Bridges:

```
@echo_log erkennt: "Das braucht Copilot"
  → POST an #copilot-bridge Channel
  → Bridge-Service auf Worker-Node liest die Nachricht
  → Startet Copilot CLI mit dem Task
  → Postet das Ergebnis als @copilot_cli
  → @echo_log liest das Ergebnis
```

Bridges laufen als systemd User-Services. Jede Bridge hat ihren eigenen Token, eigenen Channel, eigenes Logging.

## Lessons Learned

### 1. Weniger Chat-Noise

In der ersten Version hat jeder Agent "Verstanden, ich fange an!" gepostet. Bei 11 Agents waren das 11 nutzlose Nachrichten. Jetzt gilt: Nur Ergebnisse posten. Keine Ankündigungen.

### 2. CEO ist kein Dispatcher

Früh haben Worker direkt beim CEO nachgefragt. Das skaliert nicht. Der Orchestrator muss alle Routing-Entscheidungen treffen. Der CEO gibt Richtung, nicht Einzelanweisungen.

### 3. Identität ist Pflicht

Jeder Agent hat seinen eigenen Mattermost-Token. Nie teilen, nie tauschen. Sonst ist der Audit Trail wertlos — du weißt nicht mehr wer was getan hat.

### 4. Observer dürfen nicht eingreifen

@alerts meldet "Disk voll". @alerts darf NICHT eigenmächtig aufräumen. Melden → Orchestrator entscheidet → Worker führt aus → Observer verifiziert.

### 5. STOP muss sofort wirken

Wenn der CEO "STOP" sagt, halten alle Agents an. Sofort. Kein "nur noch kurz fertig machen". Das haben wir am Tag 2 gelernt, nachdem ein Agent trotz STOP einen Deploy durchgezogen hat.

## Die Architektur als Diagramm

```
                    ┌─────────┐
                    │  @joe   │
                    │  (CEO)  │
                    └────┬────┘
                         │
                    ┌────▼────┐
                    │  @jim   │
                    │ (Orch.) │
                    └────┬────┘
           ┌─────────┬──┴──┬─────────┐
      ┌────▼──┐ ┌────▼──┐ ┌▼────┐ ┌──▼───┐
      │@jim01 │ │@lisa01│ │@jim02│ │@john01│
      │Worker │ │Worker │ │Spec.│ │Worker │
      └───────┘ └───────┘ └─────┘ └──────┘
                    │
              ┌─────┴─────┐
         ┌────▼──┐   ┌────▼────┐
         │@alerts│   │@echo_log│
         │ Obs.  │   │  Spec.  │
         └───────┘   └─────────┘
```

## Zahlen

| Metrik | Wert |
|--------|------|
| Agents | 11 |
| Agent-Typen | 4 (Orchestrator, Worker, Specialist, Observer) |
| Rechner | 5 |
| Chat-Channels | 8+ |
| Anti-Loop Schichten | 6 |
| Skills pro Agent (Durchschnitt) | ~8 |
| CLI Bridges | 3 (Copilot, Gemini, Codex) |

## Zum Mitnehmen

Das [AI Agent Team Blueprint](https://buy.stripe.com/00w3cv1xdemBgyadfSfQI05) für EUR 19 enthält alle 11 Agent-Definitionen mit Rollen, Permissions, Delegation-Matrix und Anti-Loop Konfiguration.
