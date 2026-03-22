---
title: "Terminal-Grundlagen für AI-Entwickler — die 10 Befehle die du wirklich brauchst"
date: "2026-03-12"
description: "Kein Informatikstudium nötig. Diese 10 Terminal-Befehle reichen um deinen eigenen AI-Stack zu starten."
summary: "Kein Informatikstudium nötig. Diese 10 Terminal-Befehle reichen um deinen eigenen AI-Stack zu starten."
tags: ["Terminal", "Grundlagen", "CLI", "Anfänger", "Setup"]
author: "AI Engineering"
series: "Lokaler AI-Stack: Von 0 bis Production"
seriesStep: 2
---

# Terminal-Grundlagen für AI-Entwickler — die 10 Befehle die du wirklich brauchst

<figure style="margin: 2rem 0;">
  <img src="/images/generated/hero-ai-terminal.png" alt="Terminal und Kommandozeile fuer KI-Entwicklung" style="border-radius: 12px; width: 100%;" />
</figure>

| Kategorie | Befehle | Einsatzgebiet |
|-----------|---------|---------------|
| Navigation | `cd`, `ls`, `pwd` | Bewegen, Dateien finden |
| Netzwerk | `curl`, `ssh` | API-Tests, Remote-Zugriff |
| Docker | `docker ps`, `docker logs` | Container-Verwaltung |
| Entwicklung | `git pull`, `cat`, `grep` | Code und Config verwalten |
| Pakete | `pip` / `uv` | Python-Abhängigkeiten installieren |

10 Befehle. Das ist alles was zwischen dir und deinem ersten lokalen LLM steht.

Kein Informatikstudium, kein Linux-Expertenwissen. Wer Ollama starten, Docker-Container prüfen und Modelle herunterladen will, braucht genau diese 10 Befehle — mehr nicht.

## Warum überhaupt Terminal?

Weil AI-Tools fast alle über die Kommandozeile bedient werden. Docker läuft im Terminal. Python-Scripts starten dort. SSH-Verbindungen zu deinem Server (falls du später auf eigene Hardware ausweichst) gehen über Terminal. Wer das umgeht, verbringt die Hälfte der Zeit damit, GUI-Wrapper zu verstehen die sowieso nur das Terminal aufrufen. Direkt ist schneller.

Auf Windows empfehlen wir [Windows Terminal](https://aka.ms/terminal) + [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) — damit hast du eine vollwertige Linux-Umgebung, ohne Dual-Boot.

## Die 10 Befehle

| Befehl | Was er tut | Beispiel |
|--------|------------|---------|
| `cd` | Verzeichnis wechseln | `cd ~/projects/ai-stack` |
| `ls` / `dir` | Inhalt des Verzeichnisses anzeigen (Linux/Mac: `ls`, Windows: `dir`) | `ls -la` |
| `pwd` | Aktuellen Pfad anzeigen (Print Working Directory) | `pwd` → `/home/joe/projects` |
| `curl` | HTTP-Requests senden — unverzichtbar für API-Tests | `curl http://localhost:11434/api/tags` |
| `ssh` | Sicherer Zugriff auf remote Server | `ssh joe@192.168.1.99` |
| `docker ps` | Laufende Container anzeigen | `docker ps --format "table {{.Names}}\t{{.Status}}"` |
| `git pull` | Neueste Version aus dem Repository holen | `git pull origin main` |
| `cat` | Datei-Inhalt direkt ausgeben | `cat .env` |
| `grep` | Text in Dateien oder Output suchen | `docker logs ollama \| grep "error"` |
| `pip` / `uv` | Python-Pakete installieren (`uv` ist deutlich schneller) | `uv pip install ollama` |

## Befehle in der Praxis — echte Beispiele

Jeder Befehl hier zeigt mindestens zwei reale Anwendungsfälle, die dir beim Betrieb eines lokalen AI-Stacks begegnen werden.

**`cd` — zu deinem Projekt navigieren:**
```bash
cd ~/projects/ai-stack          # zum AI-Projekt springen
cd ..                           # eine Ebene hoch
cd -                            # zurück zum vorherigen Verzeichnis
```

**`ls` — sehen was in einem Verzeichnis liegt:**
```bash
ls -la                          # alle Dateien inkl. versteckte, mit Details
ls -lh ~/.ollama/models/        # Modelldateien mit lesbaren Größenangaben
ls *.yml                        # nur YAML-Dateien auflisten (z.B. docker-compose)
```

**`curl` — APIs direkt aus dem Terminal testen:**
```bash
curl http://localhost:11434/api/tags                    # Ollama-Modelle auflisten
curl -X POST http://localhost:11434/api/generate \
  -d '{"model":"qwen3.5:4b","prompt":"Hallo"}'         # einen Prompt senden
curl -s http://localhost:3000/health | python -m json.tool  # Open WebUI Health prüfen
```

**`grep` — das Wichtige im Rauschen finden:**
```bash
docker logs ollama | grep "error"              # Fehler in Ollama-Logs finden
grep -r "OLLAMA_HOST" ~/projects/              # Config-Referenzen im Projekt suchen
docker logs open-webui | grep -i "warning"     # Warnungen suchen (Groß/Klein egal)
```

**`docker ps` — wissen was läuft:**
```bash
docker ps                                              # laufende Container
docker ps -a                                           # alle Container inkl. gestoppte
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"  # saubere Übersicht
```

## Drei Dinge die sofort helfen

**Tab-Completion nutzen.** Fang mit `cd pro` an und drück Tab — das Terminal vervollständigt `projects/` automatisch. Spart Tipperei und verhindert Tippfehler.

**Pfeiltaste hoch.** Der letzte Befehl kommt mit ↑ zurück. Kein nochmal eintippen. Drück Strg+R um durch deine Befehlshistorie zu suchen.

**`|` (Pipe) verbindet Befehle.** `docker logs ollama | grep error` gibt nur Zeilen mit "error" aus — statt durch hunderte Logzeilen zu scrollen. Du kannst mehrere Pipes verketten: `docker logs ollama | grep error | tail -5` zeigt nur die letzten 5 Fehlerzeilen.

## Windows-Nutzer: WSL2 einrichten lohnt sich

Ollama läuft nativ auf Windows. Aber viele Tools im AI-Ökosystem sind für Linux gebaut. WSL2 gibt dir eine vollwertige Ubuntu-Umgebung direkt in Windows — ohne VM, ohne Dual-Boot.

```bash
# WSL2 installieren (PowerShell als Admin)
wsl --install
```

Nach dem Neustart hast du Ubuntu in Windows Terminal verfügbar. Alle 10 Befehle oben funktionieren dann identisch. Details: [WSL2 Dokumentation](https://learn.microsoft.com/en-us/windows/wsl/install).

Wer tiefer einsteigen will: Die [Linux Foundation](https://www.linuxfoundation.org/resources/open-source-guides) hat kostenlose Einführungsmaterialien für die Kommandozeile.

## Kurz-Test: Läuft dein Terminal?

Öffne Terminal (Windows Terminal, macOS Terminal, oder Linux-Shell) und tippe:

```bash
curl --version
```

Wenn eine Versionsnummer erscheint — perfekt. Wenn nicht, ist curl nicht installiert. Unter Windows: `winget install curl.curl`. Unter Ubuntu/WSL2: `sudo apt install curl`.

---

Terminal läuft? Dann kommt der eigentliche Schritt: Ollama installieren und das erste Modell lokal starten.

**Weiter zu Stufe 3: [Ollama installieren in 5 Minuten →](/blog/2026-03-12-ollama-installieren-schritt-fuer-schritt)**

Oder direkt zum kompletten Setup-Guide: Das **[Local AI Playbook P1](https://www.ai-engineering.at/products/playbook-p1)** (EUR 49) nimmt dich von Terminal bis zu einem produktionsfähigen Stack mit Browser-Interface, API-Zugang und fertig konfigurierten Docker-Containern.
