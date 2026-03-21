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

## Wie das Interface aussieht

Wenn du `http://localhost:3000` zum ersten Mal öffnest und deinen Admin-Account erstellt hast, landest du auf einer aufgeräumten Chat-Ansicht. Das Layout ist bewusst an ChatGPT angelehnt — eine Sidebar links mit deiner Chat-History, ein Modell-Dropdown oben, und ein großes Eingabefeld unten.

Die Sidebar listet alle bisherigen Gespräche auf. Du kannst sie umbenennen, anpinnen oder löschen. Jedes Gespräch merkt sich, welches Modell verwendet wurde — du kannst also zwischen Chats das Modell wechseln, ohne den Kontext zu verlieren.

Das Modell-Dropdown zeigt jedes Modell, das Ollama lokal gezogen hat. Neben jedem Modellnamen siehst du die Parametergröße (z.B. "7B", "14B"). Ein Klick wechselt sofort das aktive Modell für dieses Gespräch.

Über dem Eingabefeld findest du Buttons für Datei-Upload (Drag-and-Drop funktioniert auch), Web-Suche (falls konfiguriert) und den System-Prompt-Editor. Das System-Prompt-Feld lässt dich persistente Anweisungen definieren — zum Beispiel "Antworte immer auf Deutsch" oder "Du bist ein technischer Dokumentationsschreiber."

Das Einstellungs-Panel (Zahnrad-Icon oben rechts) gibt dir Zugriff auf Benutzerverwaltung, Modell-Konfiguration, Verbindungseinstellungen und Interface-Anpassung. Du kannst das Theme ändern, API-Endpunkte konfigurieren und mehrere Ollama-Instanzen von einem Dashboard aus verwalten.

## 5 Dinge die du sofort ausprobieren solltest

**1. System Prompt setzen.** Klick auf das System-Prompt-Icon über dem Eingabefeld. Gib etwas ein wie: "Du bist ein erfahrener Software-Entwickler. Gib immer Code-Beispiele. Sei präzise." Diese Anweisung gilt für das gesamte Gespräch und beeinflusst jede Antwort. System Prompts sind eines der am meisten unterschätzten Features — sie verwandeln einen generischen Chatbot in ein spezialisiertes Werkzeug.

**2. Dokument hochladen mit RAG.** Klick auf das Anhang-Icon oder ziehe eine PDF-, Text- oder Markdown-Datei in den Chat. Open WebUI zerlegt das Dokument in Chunks, erstellt Embeddings und nutzt es als Kontext für deine Fragen. Frag "Fasse dieses Dokument zusammen" oder "Was sind die wichtigsten Erkenntnisse in Abschnitt 3?" — das Modell antwortet basierend auf deinem hochgeladenen Inhalt, nicht auf seinen Trainingsdaten.

**3. Modell mitten im Gespräch wechseln.** Starte ein Gespräch mit `llama3.2:3b` für schnelle Entwürfe, dann wechsle zu `qwen2.5:14b` für eine differenziertere Antwort. Das Dropdown ist live — kein Neustart nötig. So kannst du kleine Modelle fürs Brainstorming und größere Modelle für die finale Ausgabe nutzen, alles in einer Session.

**4. Chats exportieren.** Öffne ein beliebiges Gespräch, klick auf das Drei-Punkte-Menü und wähle Export. Du bekommst eine saubere JSON- oder Markdown-Datei mit dem vollständigen Gesprächsverlauf. Das ist nützlich für Dokumentation, zum Teilen von Ergebnissen mit Kollegen oder zum Archivieren wichtiger Analysen.

**5. Multi-User einrichten.** In den Admin-Einstellungen kannst du zusätzliche Benutzerkonten erstellen. Jeder Benutzer bekommt seine eigene Chat-History, seine eigenen System Prompts und seine eigenen Modell-Präferenzen. Das macht Open WebUI vom persönlichen Tool zur Team-Ressource — immer noch vollständig lokal, immer noch null Daten die das Netzwerk verlassen.

## Troubleshooting

**Container startet, aber die Seite lädt nicht.**
Prüfe ob Port 3000 bereits belegt ist: `docker ps` zeigt alle laufenden Container und ihre Port-Mappings. Wenn ein anderer Service Port 3000 belegt, ändere das Mapping: `-p 3001:8080` statt `-p 3000:8080`. Verifiziere auch, dass der Container tatsächlich läuft: `docker logs open-webui` zeigt das Startup-Log. Achte auf Fehler bei der Datenbank-Initialisierung oder Port-Bindung.

**Modell-Dropdown ist leer.**
Das bedeutet: Open WebUI kann deine Ollama-Instanz nicht erreichen. Die häufigste Ursache: Ollama läuft nicht, oder es lauscht nicht auf der erwarteten Adresse. Führe `ollama list` in deinem Terminal aus, um zu bestätigen, dass Modelle vorhanden sind. Dann prüfe die Verbindung: `curl http://localhost:11434/api/tags` sollte eine JSON-Liste der Modelle zurückgeben. Wenn du unter Linux arbeitest und Ollama nativ läuft (nicht in Docker), stelle sicher, dass `OLLAMA_HOST=0.0.0.0` gesetzt ist, damit Verbindungen aus dem Docker-Netzwerk akzeptiert werden. Unter Windows und Mac mit Docker Desktop sollte `host.docker.internal` automatisch aufgelöst werden.

**Modell antwortet extrem langsam.**
Prüfe ob das Modell auf der GPU läuft oder auf die CPU zurückfällt. Führe in deinem Terminal `ollama ps` aus, während eine Anfrage aktiv ist — es zeigt welches Modell geladen ist und ob GPU-Beschleunigung genutzt wird. Wenn das Modell deinen VRAM übersteigt, lagert es teilweise auf die CPU aus, was Antworten 5-10x langsamer macht. Lösung: ein kleineres Modell verwenden. `llama3.2:3b` läuft komfortabel mit 4 GB VRAM. `qwen2.5:7b` braucht etwa 6 GB.

**Chat-History verschwunden nach Neustart.**
Wenn du beim `docker run` das Volume-Flag `-v open-webui:/app/backend/data` nicht verwendet hast, leben deine Daten nur im Container und gehen beim Entfernen verloren. Erstelle den Container mit dem Volume-Flag neu. Leider können Daten aus einem Container ohne Volume nach dem Entfernen nicht wiederhergestellt werden.

## Nächste Schritte

**Open WebUI + n8n.** Open WebUI ist großartig für interaktiven Chat, aber die wahre Stärke kommt, wenn du es mit Automatisierung verbindest. n8n kann Anfragen direkt an die Ollama-API senden, die Antworten verarbeiten und Folgeaktionen auslösen — alles ohne Open WebUI. Das behandeln wir in unseren Workflow-Automatisierungs-Posts.

**API-Zugriff.** Open WebUI stellt eine OpenAI-kompatible API bereit. Das bedeutet: Jedes Tool, das mit der OpenAI-API funktioniert — Skripte, Extensions, andere Anwendungen — kann sich mit deinem lokalen Stack verbinden, indem du die Base URL auf `http://localhost:3000/api` zeigst. In den meisten Fällen sind keine Code-Änderungen nötig.

**Custom Models mit Modelfiles.** Ollama unterstützt Modelfiles — Konfigurationsdateien, mit denen du eigene Modell-Varianten erstellen kannst. Du kannst einen Standard-System-Prompt setzen, die Temperature anpassen, Stop-Tokens definieren und eigene feingetunete Adapter auf Basis-Modelle aufsetzen. Open WebUI erkennt diese Custom Models automatisch.

## Was du jetzt hast

Ein voll funktionsfähiges, lokales Chat-Interface. Multi-Modell. Persistente History. Keine Cloud-Abhängigkeit. Das ist der Stack, auf dem wir intern seit Monaten arbeiten — nicht als Experiment, sondern in täglich genutzter Production-Umgebung.

---

**Quellen:**
- [github.com/open-webui/open-webui](https://github.com/open-webui/open-webui) — Source Code, Releases, Changelog
- [docs.openwebui.com](https://docs.openwebui.com) — Offizielle Dokumentation

---

Interface läuft? Dann lerne wie Docker deinen Stack production-ready macht — [Stufe 5: Docker Grundlagen für AI →](/blog/2026-03-12-docker-grundlagen-fuer-ai)
