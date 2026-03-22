---
title: "n8n AI Workflow Bundle v3: 14 Enterprise-Workflows für lokale Automatisierung"
date: "2026-03-22"
summary: "14 produktionsreife n8n-Workflows mit Error Handling, Dual-LLM-Fallback, DSGVO-Compliance und Monitoring. Was drin ist, warum v3 und für wen."
tags: ["n8n", "workflow", "automation", "local-first", "enterprise"]
author: "AI Engineering"
---

# n8n AI Workflow Bundle v3: 14 Enterprise-Workflows für lokale Automatisierung

Das n8n AI Workflow Bundle ist eine Sammlung von 14 produktionsreifen n8n-Workflows. Jeder Workflow ist als JSON-Datei exportiert, direkt importierbar in jede n8n-Instanz ab Version 2.x. Kein SaaS, keine Cloud-Abhängigkeit, keine monatlichen Kosten nach dem Kauf.

## Was ist das n8n AI Workflow Bundle?

14 Workflows im JSON-Format. Jeder Workflow wurde in einer produktiven Umgebung entwickelt und getestet — auf Docker Swarm mit PostgreSQL-Backend, Ollama als LLM-Runtime und Mattermost als Kommunikationskanal. Die Workflows decken fünf Bereiche ab: E-Mail-Automatisierung, Social Media, Revenue-Pipeline, Infrastruktur-Monitoring und Lead-Generierung.

Das Bundle ist kein Tutorial und kein Kurs. Es sind fertige Workflows, die du importierst, an deine Umgebung anpasst (API-Keys, Endpoints, Channel-Namen) und aktivierst. Jeder Workflow enthält Inline-Kommentare, die erklären, was jede Node macht und warum sie so konfiguriert ist.

## Was ist neu in v3?

### Error Handler Pattern

Jeder Workflow in v3 hat einen dedizierten Error Handler. In v2 liefen Fehler ins Leere — der Workflow stoppte, niemand wurde benachrichtigt. In v3 fängt ein Error Trigger Node jeden Fehler ab, loggt ihn strukturiert (Workflow-Name, Node-Name, Fehlermeldung, Zeitstempel) und sendet eine Notification an Mattermost oder Slack. Optional wird ein Retry ausgelöst — mit konfigurierbarem Delay und maximalem Retry-Count.

Das Error Handler Pattern ist kein Zusatz-Workflow, sondern in jeden einzelnen der 14 Workflows integriert. Du musst es nicht separat einrichten.

### Dual-LLM Fallback

Workflows, die Text generieren (E-Mail-Zusammenfassungen, Social-Media-Posts, Lead-Qualifizierung), nutzen ein Dual-LLM-Pattern:

1. **Primary**: Lokales Modell via Ollama (z.B. Mistral, Llama, Qwen)
2. **Fallback**: Cloud-API (OpenAI, Anthropic) — nur wenn Ollama nicht erreichbar ist oder einen Fehler wirft

Der Fallback ist optional. Wenn du ausschließlich lokal arbeiten willst, deaktivierst du den Cloud-Fallback-Branch. Der Workflow funktioniert dann nur mit Ollama — und der Error Handler meldet, wenn Ollama down ist.

Warum Dual-LLM? In der Praxis fällt Ollama gelegentlich aus: GPU-Treiber-Updates, VRAM-Overflow bei parallelen Anfragen, Neustart nach Windows-Updates. Der Fallback verhindert, dass zeitkritische Workflows (z.B. Stripe Payment Confirmation) steckenbleiben.

### Enterprise Architecture

v3 nutzt eine einheitliche Architektur für alle 14 Workflows:

- **Structured Logging**: Jeder Workflow schreibt strukturierte Logs (JSON) mit Correlation-ID
- **Idempotenz**: Webhook-basierte Workflows prüfen auf Duplikate via Hash
- **Rate Limiting**: HTTP-Nodes haben konfigurierbare Pausen zwischen Requests
- **Credential Separation**: Alle Credentials sind als n8n Credentials gespeichert, nicht hardcoded in Nodes

## Die 14 Workflows

| Nr. | Name | Kategorie | Was es tut |
|-----|------|-----------|------------|
| 1 | Email Daily Digest | Email | Sammelt neue E-Mails, fasst sie per Ollama zusammen, postet Digest in Mattermost/Slack |
| 2 | Email Auto-Responder | Email | Beantwortet häufige Anfragen automatisch mit AI-generierten Antworten |
| 3 | Email Lead Capture | Email | Extrahiert Kontaktdaten aus eingehenden E-Mails, erstellt Leads in CRM |
| 4 | Social Content Generator | Social | Generiert Social-Media-Posts aus RSS-Feeds mit Ollama und Humanizer-Regeln |
| 5 | Social Post Scheduler | Social | Plant und veröffentlicht Posts auf LinkedIn und Twitter via CDP |
| 6 | Social Engagement Monitor | Social | Überwacht Mentions und Kommentare, benachrichtigt bei relevanten Interaktionen |
| 7 | Stripe Payment Pipeline | Revenue | Empfängt Stripe Webhooks, generiert Download-Links (HMAC-signiert), sendet Bestätigungsmail |
| 8 | Revenue Weekly Report | Revenue | Aggregiert Stripe-Daten der Woche, erstellt Report mit Trends und Anomalien |
| 9 | Subscription Lifecycle | Revenue | Verwaltet Trial-Ablauf, Kündigungen, Upgrades — mit automatischen E-Mails |
| 10 | Infra Health Check | Infra | Prüft Docker-Container-Status, Ollama-Erreichbarkeit, Disk-Usage alle 5 Minuten |
| 11 | Backup Monitor | Infra | Verifiziert, dass Backups gelaufen sind, alertet bei fehlenden oder fehlerhaften Backups |
| 12 | Service Restart Handler | Infra | Erkennt ausgefallene Services und führt automatischen Restart durch (mit Eskalation) |
| 13 | Lead Qualification | Lead | Bewertet eingehende Leads per AI-Scoring (Firmengröße, Branche, Anfrage-Qualität) |
| 14 | Lead Nurture Sequence | Lead | Sendet personalisierte Follow-up-E-Mails basierend auf Lead-Score und Verhalten |

## Für wen ist das Bundle?

**KMU mit bestehender n8n-Instanz**: Du hast n8n bereits laufen, wahrscheinlich mit ein paar eigenen Workflows. Das Bundle gibt dir 14 getestete Workflows, die du nicht selbst bauen musst. Zeitersparnis: je nach Workflow 2–8 Stunden pro Workflow.

**Self-Hosted Teams**: Du betreibst deine Infrastruktur selbst — Docker, Proxmox, eigene Server. Die Workflows sind für genau diese Umgebung gebaut. Keine Abhängigkeit von Zapier, Make oder anderen SaaS-Tools.

**DSGVO-sensitive Unternehmen**: Alle Workflows verarbeiten Daten lokal. E-Mail-Inhalte, Kundendaten aus Stripe, Lead-Informationen — alles bleibt in deinem Netzwerk. Der Cloud-LLM-Fallback ist optional und kann komplett deaktiviert werden.

**Nicht geeignet für**: Teams ohne n8n-Erfahrung. Das Bundle setzt voraus, dass du weißt, was Nodes, Workflows, Credentials und Expressions in n8n sind. Wenn du n8n noch nie benutzt hast, starte mit dem [n8n Anfänger-Guide](/tools/n8n-für-anfaenger) im Wiki.

## Setup: Wie importieren?

Der Import funktioniert in drei Schritten:

**Schritt 1: JSON-Datei importieren**

Öffne n8n, klicke auf "Workflows" → "Import from File", wähle die JSON-Datei des gewünschten Workflows. n8n erstellt den Workflow mit allen Nodes und Verbindungen.

**Schritt 2: Credentials anpassen**

Jeder Workflow nutzt n8n Credentials für externe Services (Ollama, Stripe, Mattermost, SMTP). Erstelle die benötigten Credentials in n8n unter "Settings" → "Credentials" und weise sie den entsprechenden Nodes zu. Die Inline-Kommentare in jedem Workflow listen die benötigten Credentials auf.

**Schritt 3: Konfiguration prüfen und aktivieren**

Passe Endpoints an (Ollama-URL, Mattermost-Channel, SMTP-Server), teste den Workflow im Test-Modus, und aktiviere ihn. Die Error Handler sind sofort funktionsfähig — sie nutzen dieselben Notification-Credentials.

## Ehrliche Einschränkungen

- **n8n Grundkenntnisse sind Pflicht.** Du musst wissen, was Nodes, Expressions und Credentials sind. Das Bundle erklärt nicht, wie n8n funktioniert.
- **Anpassung ist notwendig.** Die Workflows sind Templates, keine Plug-and-Play-Lösungen. Du musst Endpoints, Channel-Namen und Credentials an deine Umgebung anpassen.
- **Ollama muss laufen.** Die AI-Workflows setzen eine erreichbare Ollama-Instanz voraus. Ohne Ollama funktionieren nur die Non-AI-Workflows (Health Check, Backup Monitor).
- **n8n 2.x erforderlich.** Die Workflows nutzen n8n 2.x Syntax (Luxon-Datums, Expression-Prefix). In n8n 1.x funktionieren sie nicht ohne Anpassungen.
- **Kein Support inklusive.** Du bekommst die Workflows, nicht einen Berater. Die Inline-Kommentare und die Wiki-Dokumentation sind deine Referenz.

## Technische Details

Alle Workflows nutzen dieselben Architektur-Patterns:

```
Trigger → Verarbeitung → LLM (optional) → Ausgabe → Error Handler
```

Der Error Handler ist als separater Branch implementiert, der über den n8n Error Trigger Node angebunden ist. Er fängt Fehler aus jeder Node im Workflow ab und leitet sie an den konfigurierten Notification-Kanal weiter.

Das Dual-LLM-Pattern nutzt einen IF-Node nach dem Ollama-Call: Wenn die Antwort leer ist oder der HTTP-Status nicht 200 war, wird der Cloud-Fallback-Branch aktiviert. Der Fallback nutzt dieselbe Prompt-Struktur — nur der Endpoint ändert sich.

## Weiterführende Informationen

Eine ausführliche technische Dokumentation aller Workflow-Kategorien, des Error Handler Patterns und des Dual-LLM Patterns findest du im [Wiki-Artikel: n8n AI Workflow Bundle](/tools/n8n-workflow-bundle).

---

Alle Wiki-Artikel sind kostenlos. Produkte und Bundles findest du auf [ai-engineering.at](https://www.ai-engineering.at).
