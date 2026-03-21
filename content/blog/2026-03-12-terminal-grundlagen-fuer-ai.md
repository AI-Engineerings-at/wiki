---
title: "Terminal-Grundlagen für AI-Entwickler — die 10 Befehle die du wirklich brauchst"
date: "2026-03-12"
description: "Kein Informatikstudium nötig. Diese 10 Terminal-Befehle reichen um deinen eigenen AI-Stack zu starten."
tags: ["Terminal", "Grundlagen", "CLI", "Anfänger", "Setup"]
author: "AI Engineering"
series: "Lokaler AI-Stack: Von 0 bis Production"
seriesStep: 2
---

# Terminal-Grundlagen für AI-Entwickler — die 10 Befehle die du wirklich brauchst

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

## Drei Dinge die sofort helfen

**Tab-Completion nutzen.** Fang mit `cd pro` an und drück Tab — das Terminal vervollständigt `projects/` automatisch. Spart tipperei und verhindert Tippfehler.

**Pfeiltaste hoch.** Der letzte Befehl kommt mit ↑ zurück. Kein nochmal eintippen.

**`|` (Pipe) verbindet Befehle.** `docker logs ollama | grep error` gibt nur Zeilen mit "error" aus — statt durch hunderte Logzeilen zu scrollen.

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
