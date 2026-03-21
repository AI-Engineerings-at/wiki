---
title: "DSGVO-konformer AI-Stack: Kein Byte verlässt unser Netzwerk"
date: "2026-03-08"
summary: "LLM, Spracherkennung, Text-to-Speech, Bildgenerierung — alles lokal auf eigener Hardware. Warum das nicht nur für die DSGVO wichtig ist, sondern auch für den EU AI Act ab August 2026."
tags: ["dsgvo", "ai-stack", "ollama", "whisper", "local-first", "eu-ai-act"]
author: "AI Engineering"
---

# DSGVO-konformer AI-Stack: Kein Byte verlässt unser Netzwerk

<figure style="margin: 2rem 0;">
  <img src="/images/blog/dsgvo-konformer-ai-stack.png" alt="DSGVO-konformer AI-Stack Architektur" style="border-radius: 12px; width: 100%;" />
  <figcaption style="text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-top: 0.5rem;">Unser DSGVO-konformer AI-Stack: LLM, STT, TTS und Bildgenerierung — alles lokal</figcaption>
</figure>

Wenn ein Unternehmen ChatGPT nutzt, verlassen die eingegebenen Daten das eigene Netzwerk. Bei jeder Anfrage. Bei jedem Prompt. Bei jedem Dokument, das man zur Analyse hochlädt. Für viele Firmen in der DACH-Region ist das ein Problem — nicht nur aus Überzeugung, sondern weil die DSGVO und ab August 2026 der EU AI Act klare Regeln setzen.

Wir zeigen, wie ein kompletter AI-Stack aussieht, der nichts nach außen schickt.

## Die vier Säulen unseres Stacks

### 1. Ollama — Sprachmodelle lokal

Ollama läuft bei uns auf drei Nodes mit automatischem Fallback:

| Node | GPU | Hauptmodell | Rolle |
|------|-----|-------------|-------|
| GPU-Server | RTX 3090 (24 GB) | mistral-small3.2:24b | Primary |
| Worker-Node | RTX 2060 (6 GB) | llama3.2:3b | Secondary |
| CPU-Node | CPU only | llama3.1:8b | Tertiary |

17 Modelle sind verfügbar, von kleinen 3B-Modellen bis zu 24B-Parametern. Die Fallback-Kette schaltet automatisch um, wenn ein Node nicht erreichbar ist oder OOM (Out of Memory) auftritt. In der Praxis bedeutet das: selbst wenn der Windows-Rechner mit der 3090 neu startet, laufen alle AI-Funktionen weiter.

```bash
# Modell-Status abfragen
curl -s http://<ollama-host>:11434/api/tags | jq '.models[].name'
```

### 2. Whisper — Spracherkennung lokal

OpenAI's Whisper läuft als Docker Container auf einem dedizierten Swarm-Node, erreichbar über das Wyoming-Protokoll. Modell: `small`, Sprache: Deutsch.

Jedes Audio-File wird lokal transkribiert. Keine Cloud-API, kein Upload zu externen Servern. Das ist besonders relevant für Firmen, die Meetings oder Kundengespräche transkribieren wollen. Die Daten bleiben dort, wo sie hingehören: im eigenen Netzwerk.

### 3. Piper — Text-to-Speech lokal

Piper liest Texte vor, komplett offline. Zwei Replicas laufen auf dem Docker Swarm für Ausfallsicherheit. Deutsche Stimmen sind verfügbar, die Qualität ist überraschend gut für ein lokales Modell.

Zusammen mit Whisper ergibt das eine komplette Voice-Pipeline: Sprache rein, Text raus, Antwort generieren, Sprache raus. Alles lokal.

### 4. ComfyUI — Bildgenerierung lokal

ComfyUI läuft auf der RTX 3090 (GPU-Server) mit dem FLUX.1-Modell. Social-Media-Bilder, Produktfotos, Illustrationen — alles wird lokal generiert. Mit 1.5x Upscaling für höhere Auflösung.

Für Firmen, die Marketingmaterial erstellen, ist das relevant: Keine Bilder werden an Midjourney oder DALL-E geschickt. Keine Trainingsdaten landen bei Drittanbietern.

## Warum lokal? Die rechtliche Lage

### DSGVO (seit 2018)

Die DSGVO verlangt, dass personenbezogene Daten nur mit Rechtsgrundlage verarbeitet werden dürfen. Wenn ein Mitarbeiter Kundendaten in ChatGPT eingibt, ist das eine Datenübermittlung an einen Drittanbieter in den USA. Dafür braucht man mindestens:

- Einen Auftragsverarbeitungsvertrag (AVV)
- Standard-Vertragsklauseln (SCCs) für den Drittlandtransfer
- Eine Datenschutz-Folgenabschätzung (DSFA)

Oder man verarbeitet lokal. Dann braucht man nichts davon.

### EU AI Act (ab 2. August 2026)

Der EU AI Act bringt zusätzliche Anforderungen: Transparenzpflichten, Dokumentation der AI-Systeme, Risikobewertungen. Hochrisiko-AI-Systeme müssen ein Qualitätsmanagementsystem nachweisen.

Wer seine AI-Modelle lokal betreibt, hat einen klaren Vorteil: vollständige Kontrolle über die Modellversion, die Trainingsdaten (bei Fine-Tuning), und die Verarbeitungslogik. Kein Vendor kann das Modell ändern, ohne dass man es merkt.

Die Deadline ist der 2. August 2026 — das sind noch 5 Monate.

## Kostenvergleich: Cloud vs. Lokal

Eine ehrliche Rechnung:

| Posten | Cloud (monatlich) | Lokal (einmalig) |
|--------|-------------------|-------------------|
| LLM API (GPT-4 Level) | 200-500 EUR | RTX 3090: ~800 EUR (gebraucht) |
| Spracherkennung | 50-100 EUR | Im Stack enthalten |
| Bildgenerierung | 50-200 EUR | Im Stack enthalten |
| Text-to-Speech | 20-50 EUR | Im Stack enthalten |
| **Gesamt** | **320-850 EUR/Monat** | **~800 EUR einmalig** |

Nach 1-3 Monaten hat sich die Hardware amortisiert. Und man hat die volle Kontrolle.

Natürlich gibt es Trade-offs: lokale Modelle sind kleiner als GPT-4. Für die meisten Business-Aufgaben (Zusammenfassungen, Klassifikation, Content-Erstellung, Übersetzungen) reichen sie aber völlig aus. Wir betreiben unser gesamtes Unternehmen damit.

## In der Praxis

Unsere täglich genutzten AI-Funktionen:

- **Email-Zusammenfassungen:** Ollama liest 40+ Emails, fasst sie zusammen, postet ins CEO-Dashboard
- **Content-Erstellung:** RSS → Ollama Humanizer → Social-Media-Posts (Montag + Donnerstag automatisch)
- **Meeting-Transkription:** Whisper transkribiert, Ollama extrahiert Action Items
- **Bildgenerierung:** ComfyUI erstellt Social-Media-Bilder aus Text-Prompts
- **Automatische Antworten:** Ollama entwirft Antworten auf LinkedIn-DMs, Joe reviewed und sendet

Alle diese Workflows laufen über n8n, und kein einziger davon braucht eine externe API.

## Zum Mitnehmen

Wir haben unsere komplette DSGVO-Dokumentation und Compliance-Checklisten als [DSGVO Compliance Bundle](https://buy.stripe.com/bJe7sLb7N92ha9MejWfQI02) zusammengestellt — EUR 79, 6 Templates, sofort einsetzbar. Enthalten: Verarbeitungsverzeichnis, DSFA-Vorlage, AVV-Muster, und eine AI-spezifische Checkliste für den EU AI Act.
