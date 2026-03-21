---
title: "Von RSS bis Social Media: Unsere vollautomatische Content-Pipeline"
date: "2026-03-08"
summary: "RSS-Feeds rein, fertige Social-Media-Posts raus. Mit n8n, Ollama, ComfyUI und CDP — komplett lokal, kein API-Zugang nötig, DSGVO-konform."
tags: ["content-pipeline", "n8n", "ollama", "comfyui", "cdp", "automation", "local-first", "dsgvo"]
author: "AI Engineering"
---

# Von RSS bis Social Media: Unsere vollautomatische Content-Pipeline

![Content-Pipeline von RSS bis Social Media](/images/blog/content-pipeline-launch.png)

Dieser Blogpost wurde teilweise von genau der Pipeline erstellt, die er beschreibt. Klingt meta? Ist es auch. Hier ist, wie das funktioniert.

## Die Architektur in 5 Schritten

```
RSS-Feeds → n8n (Aggregation) → Ollama (Humanizer) → ComfyUI (Bild) → CDP Poster (LinkedIn/Twitter)
```

Jeder Schritt läuft lokal. Kein externer API-Key nötig, kein Rate-Limit von OpenAI, kein Vendor-Lock-in. Und kein Byte verlässt unser Netzwerk — bis der fertige Post veröffentlicht wird.

### Schritt 1: RSS-Aggregation

n8n pollt 10 RSS-Quellen täglich. Tech-Blogs, AI-News, DSGVO-Updates. Ein Filter-Node sortiert nach Relevanz (Keywords: AI, DSGVO, Docker, Ollama, EU AI Act). Was durchkommt, geht an den Humanizer.

### Schritt 2: Ollama Humanizer

Hier wird es interessant. Wir schicken die RSS-Zusammenfassung nicht einfach an Ollama und posten das Ergebnis. Stattdessen läuft ein Humanizer-Layer mit strikten Regeln:

- Keine AI-Floskeln ("revolutionär", "bahnbrechend", "Gamechanger")
- Jeder Post muss einen DSGVO/Local-First-Winkel haben
- Regex Quick-Scan prüft auf typische AI-Muster
- Nur Posts mit Humanizer-Score >= 85 werden weiterverarbeitet

Das Modell: `mistral-small3.2:24b` auf der RTX 3090 (GPU-Server). Bei Ausfall springt der 3-Level Fallback ein (GPU-Server → Worker-Node → CPU-Fallback).

```bash
# Ollama API-Call fuer Content-Generierung
curl -s http://<ollama-host>:11434/api/generate \
  -d '{
    "model": "mistral-small3.2:24b",
    "prompt": "Schreibe einen LinkedIn-Post...",
    "stream": false
  }' | jq -r '.response'
```

### Schritt 3: Bildgenerierung mit ComfyUI

Für jeden Post generiert ComfyUI (FLUX.1-Modell, RTX 3090) ein passendes Bild. Der Workflow schickt den Post-Titel als Prompt, ComfyUI erzeugt ein 1024x1024 Bild mit 1.5x Upscaling.

Ergebnis: einzigartige Bilder statt Stock-Fotos. Und da ComfyUI lokal läuft, gibt es keine Lizenzprobleme und keine Abhängigkeit von DALL-E oder Midjourney.

### Schritt 4: Approval via Mattermost

Automatisch posten ohne Review? Nicht bei uns. Jeder generierte Post landet zuerst im Mattermost-Channel. Joe sieht den Text, das Bild, und die Zielplattform. Ein `/approve` Slash-Command gibt den Post frei.

Das klingt nach manuellem Aufwand, ist in der Praxis aber 10 Sekunden pro Post: Text lesen, passt oder Feedback geben. So bleibt die menschliche Kontrolle, ohne dass jemand Texte schreiben muss.

### Schritt 5: CDP Poster

Hier wird es technisch. Wir nutzen CDP (Chrome DevTools Protocol) statt offizielle APIs. Warum?

- **LinkedIn API:** Zugang nur für verifizierte Apps mit Review-Prozess. Wartezeit: Wochen bis Monate.
- **Twitter/X API:** Kostet ab 100 USD/Monat für Basic-Zugang.
- **CDP:** Kostenlos, funktioniert sofort, keine Genehmigung nötig.

Der Social Poster läuft auf einer dedizierten Fedora-Workstation mit einem dedizierten Chrome-Profil. CDP steuert den Browser wie ein Mensch: Login ist bereits persistent, der Poster öffnet den Compose-Dialog, tippt den Text, lädt das Bild hoch, und klickt auf Posten.

Ein paar Learnings aus der Praxis:

- LinkedIn's Media-Button muss innerhalb des Sharebox-Modals gesucht werden (3 Dialoge auf der Seite!)
- Twitter blockiert HeadlessChrome im User-Agent — UA Override ist Pflicht
- Twitter hat ein 280-Zeichen-Limit, der Humanizer kürzt automatisch auf 277 + "..."
- `force=True` auf jeden Button-Click, weil Modal-Overlays den Klick blockieren

## Der Cron

Montag und Donnerstag um 09:00 Uhr. n8n triggert den Workflow, der komplette Durchlauf (RSS → Humanizer → Bild → Mattermost) dauert etwa 2-3 Minuten. Nach Approval geht der Post in unter 30 Sekunden live.

## Was das kostet

Nichts. Keine API-Gebühren, kein SaaS-Abo, keine Plattform-Kosten. Die Hardware ist ohnehin da (Docker Swarm + GPU-Rechner), n8n und Ollama sind Open Source, ComfyUI auch.

Zum Vergleich: Ein Tool wie Buffer oder Hootsuite kostet ab 15 EUR/Monat. Dazu OpenAI API für Text (~20 EUR/Monat) und Midjourney für Bilder (~10 EUR/Monat). Macht 45+ EUR/Monat für etwas, das wir kostenlos und lokal betreiben.

## Zum Mitnehmen

Die Architektur hinter dieser Pipeline — inklusive n8n Workflow-Templates, Ollama-Prompts, und CDP-Setup-Anleitung — haben wir im [AI Agent Blueprint](https://buy.stripe.com/00w3cv1xdemBgyadfSfQI05) dokumentiert. EUR 19, 11 Dateien, sofort einsetzbar für die eigene Content-Pipeline.
