---
title: "Dein erster lokaler AI-Chatbot: Open WebUI in 10 Minuten einrichten"
date: "2026-03-12"
description: "Ollama läuft, aber du willst ein Browser-Interface. So richtest du Open WebUI ein — das ChatGPT-Interface für deinen lokalen Stack."
summary: "Ollama läuft, aber du willst ein Browser-Interface. So richtest du Open WebUI ein — das ChatGPT-Interface für deinen lokalen Stack."
tags: ["Open WebUI", "Chatbot", "Interface", "Ollama", "Anfänger"]
author: "AI Engineering"
series: "Lokaler AI-Stack: Von 0 bis Production"
seriesStep: 4
---

# Dein erster lokaler AI-Chatbot: Open WebUI in 10 Minuten einrichten

| Schritt | Was passiert | Ergebnis |
|---------|-------------|----------|
| 1 | Docker installieren (falls noch nicht vorhanden) | Docker Engine läuft |
| 2 | `docker run` mit Open WebUI Image | Container startet |
| 3 | Browser öffnen: `localhost:3000` | Login-Seite erscheint |
| 4 | Admin-Account anlegen | Zugang gesichert |
| 5 | Modell im Dropdown auswählen | Chat bereit |
| 6 | Erste Nachricht schreiben | Antwort vom lokalen LLM |

Du hast Ollama installiert. Jetzt willst du ein richtiges Interface — nicht nur die Kommandozeile.

`ollama run llama3.2` funktioniert, aber es ist kein Chat-Interface. Keine History, kein Modell-Wechsel per Klick, kein Upload. Open WebUI löst das.

## Was ist Open WebUI?

[Open WebUI](https://github.com/open-webui/open-webui) ist ein self-hosted Browser-Interface für Ollama — optisch und funktional nah an ChatGPT. Du bekommst Chat-History, Modell-Auswahl, Datei-Upload, System-Prompts und Benutzer-Management. Alles läuft lokal, kein Account, kein Abo, keine externe API. Das Projekt hat aktuell über 70.000 GitHub Stars und wird aktiv entwickelt ([Quelle](https://github.com/open-webui/open-webui)).

## Voraussetzung: Docker

Open WebUI läuft als Docker Container. Wenn Docker bei dir noch nicht installiert ist: Das kommt in Stufe 5 dieser Serie. Wenn du es schon hast, weiter.

Docker Desktop für Windows und Mac gibt es unter [docs.docker.com/get-docker](https://docs.docker.com/get-docker/).

## Installation: Ein Befehl

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

Das war es. Nach dem Download (500 MB bis 1 GB je nach Version) ist Open WebUI unter `http://localhost:3000` erreichbar.

Was der Befehl macht:

- `-p 3000:8080` — Port 3000 auf deinem Rechner, Port 8080 im Container
- `--add-host=host.docker.internal:host-gateway` — damit der Container deinen lokalen Ollama erreicht
- `-v open-webui:/app/backend/data` — persistenter Speicher für deine Chats und Einstellungen
- `--restart always` — Container startet automatisch neu nach Neustart

Beim ersten Aufruf richtest du einen Admin-Account ein. Kein Passwort wird irgendwo hochgeladen — das bleibt lokal in der SQLite-Datenbank im Volume.

## Modell auswählen

Nach dem Login siehst du oben links ein Dropdown mit allen Modellen, die Ollama kennt. Klick auf das Dropdown, wähle dein Modell, schreib deine erste Nachricht.

Falls das Dropdown leer ist: Ollama muss laufen und erreichbar sein. Prüfe mit `ollama list` im Terminal ob Modelle vorhanden sind. Falls nicht: `ollama pull llama3.2` oder `ollama pull qwen2.5:7b` — beides solide Einstiegsmodelle.

Einen Vergleich verschiedener Modelle und was sie können haben wir in [Stufe 3 dieser Serie](/blog/2026-03-12-ollama-installieren-schritt-fuer-schritt) beschrieben.

## Warum das DSGVO-konform ist

Die wichtigste Eigenschaft: Kein Byte verlasst deinen Rechner. Keine Anfrage geht an OpenAI, Anthropic oder irgendeinen anderen Cloud-Anbieter. Open WebUI sendet nichts nach aussen — weder deine Prompts noch die Antworten. Die einzige Verbindung nach aussen ist der initiale Docker-Pull vom GitHub Container Registry.

Das bedeutet: Du kannst vertrauliche Dokumente hochladen, interne Prozesse besprechen, Kundendaten analysieren — ohne rechtliche Grauzone. Für Unternehmen in der EU ist das kein Nice-to-have, sondern die Grundvoraussetzung.

Das Gleiche gilt für die Chat-History. Die wird in `open-webui:/app/backend/data` gespeichert — auf deiner Maschine, in deinem Dateisystem, unter deiner Kontrolle.

## Was du jetzt hast

Ein voll funktionsfaehiges, lokales Chat-Interface. Multi-Modell. Persistente History. Keine Cloud-Abhängigkeit. Das ist der Stack, auf dem wir intern seit Monaten arbeiten — nicht als Experiment, sondern in täglich genutzter Production-Umgebung.

---

**Quellen:**
- [github.com/open-webui/open-webui](https://github.com/open-webui/open-webui) — Source Code, Releases, Changelog
- [docs.openwebui.com](https://docs.openwebui.com) — Offizielle Dokumentation

---

Interface läuft? Dann lerne wie Docker deinen Stack production-ready macht — [Stufe 5: Docker Grundlagen für AI →](/blog/2026-03-12-docker-grundlagen-fuer-ai)
