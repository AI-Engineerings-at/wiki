---
title: "Ollama installieren in 5 Minuten — Schritt für Schritt (Windows, Mac, Linux)"
date: "2026-03-12"
description: "Von 0 zum laufenden lokalen LLM in 5 Minuten. Getestet auf Windows 11, macOS Sonoma und Ubuntu 24.04."
summary: "Von 0 zum laufenden lokalen LLM in 5 Minuten. Getestet auf Windows 11, macOS Sonoma und Ubuntu 24.04."
tags: ["Ollama", "Installation", "LLM", "Anfänger", "Local AI"]
author: "AI Engineering"
series: "Lokaler AI-Stack: Von 0 bis Production"
seriesStep: 3
---

# Ollama installieren in 5 Minuten — Schritt für Schritt (Windows, Mac, Linux)

5 Minuten. Dann läuft qwen3.5:4b auf deiner eigenen Hardware.

Kein Cloud-Account, keine API-Kosten, keine Daten die irgendwo hochgeladen werden. Getestet auf Windows 11, macOS Sonoma und Ubuntu 24.04.

## Was ist Ollama?

[Ollama](https://ollama.com) ist ein lokaler LLM-Runner — ein Programm das Sprachmodelle auf deiner eigenen Hardware ausführt und eine API bereitstellt, die OpenAI-kompatibel ist. Das bedeutet: Tools die für ChatGPT gebaut sind, funktionieren ohne Änderungen auch mit Ollama. Wir betreiben 3 Ollama-Instanzen auf unterschiedlicher Hardware im 24/7-Betrieb. Das hier ist das Setup das funktioniert.

## Installation

### Windows 11

**Option 1: winget (empfohlen)**
```powershell
winget install Ollama.Ollama
```

**Option 2: Direkter Download**
Installer von [ollama.com/download](https://ollama.com/download/windows) herunterladen und ausführen. Ollama läuft danach als Windows-Dienst im Hintergrund.

GPU-Support (NVIDIA) wird automatisch erkannt wenn die CUDA-Treiber installiert sind. Kein weiterer Konfigurationsaufwand. AMD GPUs werden über ROCm unterstützt — Details im [Ollama GitHub](https://github.com/ollama/ollama/blob/main/docs/gpu.md).

### macOS (Sonoma, Ventura, Monterey)

```bash
brew install ollama
```

Ohne Homebrew: Direkter Download unter [ollama.com/download/mac](https://ollama.com/download/mac). Apple Silicon (M1/M2/M3/M4) wird vollständig unterstützt — die integrierte GPU wird automatisch genutzt.

### Linux (Ubuntu 24.04, Debian, Fedora)

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Der Installer richtet Ollama als systemd-Service ein. Nach der Installation läuft Ollama automatisch beim Systemstart. GPU-Support für NVIDIA und AMD wird erkannt sofern die Treiber vorhanden sind.

## Erster Test: Ein Modell laden und starten

```bash
ollama run qwen3.5:4b
```

Beim ersten Aufruf wird das Modell heruntergeladen (~2.5 GB). Danach startet eine interaktive Chat-Session direkt im Terminal:

```
>>> Erkläre Docker in einem Satz.
Docker ist eine Plattform die Anwendungen in isolierten Containern verpackt,
damit sie überall gleich laufen — unabhängig vom Host-System.

>>> /bye
```

Mit `/bye` beendest du die Session. Das Modell bleibt lokal gespeichert und steht sofort wieder zur Verfügung.

Die API läuft parallel auf `http://localhost:11434`. Test:

```bash
curl http://localhost:11434/api/tags
```

Das gibt alle lokal verfügbaren Modelle als JSON zurück.

## Welches Modell für welchen VRAM?

VRAM ist der limitierende Faktor — nicht RAM. Wenn deine GPU nicht genug VRAM hat, läuft das Modell auf der CPU weiter (deutlich langsamer, aber funktionsfähig).

| VRAM | Empfohlenes Modell | Download-Größe | Kontext |
|------|-------------------|----------------|---------|
| 4 GB | `qwen3.5:4b` | ~2.5 GB | 256K Token |
| 8 GB | `qwen3.5:8b` | ~5 GB | 256K Token |
| 16 GB | `qwen3.5:14b` | ~9 GB | 256K Token |
| 24 GB | `qwen3.5:27b` | ~17 GB | 256K Token |

Wir nutzen `qwen3.5:27b` auf einer RTX 3090 (24 GB) als primäres Modell — [Ollama Model Library](https://ollama.com/library) listet alle verfügbaren Modelle mit Größenangaben.

Kein dedizierter GPU-VRAM? Kein Problem. `qwen3.5:4b` läuft auch auf der CPU — langsamer, aber für erste Tests völlig ausreichend. Auf einem modernen Laptop-Prozessor sind das ca. 3-8 Token pro Sekunde.

## Modell-Verwaltung

```bash
# Alle lokal verfügbaren Modelle anzeigen
ollama list

# Modell herunterladen ohne direkt zu starten
ollama pull llama3.2:3b

# Modell entfernen
ollama rm llama3.2:3b
```

Modelle werden unter `~/.ollama/models` gespeichert (Linux/macOS) oder `C:\Users\<name>\.ollama\models` (Windows). Auf einer SSD mit mindestens 20 GB freiem Speicher empfehlen wir `qwen3.5:4b` + ein zweites Modell für Vergleiche.

## Was als nächstes?

Ollama läuft. Die API antwortet. Das ist die Basis. Jetzt fehlt noch ein Browser-Interface damit du ohne Terminal chatten kannst — und eine saubere Konfiguration damit Ollama auch nach einem Neustart zuverlässig startet.

**Weiter zu Stufe 4: Browser-Interface einrichten mit Open WebUI →**

Oder direkt zum kompletten Setup — das **[Local AI Playbook P1](https://www.ai-engineering.at/products/playbook-p1)** (EUR 49) enthält fertig konfigurierte Docker-Compose-Files für Ollama + Open WebUI + Monitoring, detaillierte Anleitungen für alle Betriebssysteme, und den kompletten Stack den wir selbst in Production betreiben.

---

*Quellen: [ollama.com](https://ollama.com) — offizielle Dokumentation. [github.com/ollama/ollama](https://github.com/ollama/ollama) — Source Code und GPU-Support Details. [ollama.com/library](https://ollama.com/library) — vollständige Modell-Bibliothek mit Größenangaben und Benchmarks.*
