---
title: "Install Ollama in 5 Minutes — Step by Step (Windows, Mac, Linux)"
date: "2026-03-12"
description: "From zero to running local LLM in 5 minutes. Tested on Windows 11, macOS Sonoma and Ubuntu 24.04."
summary: "From zero to running local LLM in 5 minutes. Tested on Windows 11, macOS Sonoma and Ubuntu 24.04."
tags: ["Ollama", "Installation", "LLM", "Beginner", "Local AI"]
author: "AI Engineering"
series: "Local AI Stack: From 0 to Production"
seriesStep: 3
---

# Install Ollama in 5 Minutes — Step by Step (Windows, Mac, Linux)

5 minutes. Then qwen3.5:4b runs on your own hardware.

No cloud account, no API costs, no data being uploaded anywhere. Tested on Windows 11, macOS Sonoma, and Ubuntu 24.04.

## What Is Ollama?

[Ollama](https://ollama.com) is a local LLM runner — a program that executes language models on your own hardware and exposes an OpenAI-compatible API. That means: tools built for ChatGPT work with Ollama without modification. We run 3 Ollama instances on different hardware in 24/7 operation. This is the setup that works.

## Installation

### Windows 11

**Option 1: winget (recommended)**
```powershell
winget install Ollama.Ollama
```

**Option 2: Direct download**
Download the installer from [ollama.com/download](https://ollama.com/download/windows) and run it. Ollama then runs as a Windows service in the background.

GPU support (NVIDIA) is detected automatically if CUDA drivers are installed — no additional configuration needed. AMD GPUs are supported via ROCm — details in the [Ollama GitHub](https://github.com/ollama/ollama/blob/main/docs/gpu.md).

### macOS (Sonoma, Ventura, Monterey)

```bash
brew install ollama
```

Without Homebrew: direct download at [ollama.com/download/mac](https://ollama.com/download/mac). Apple Silicon (M1/M2/M3/M4) is fully supported — the integrated GPU is used automatically.

### Linux (Ubuntu 24.04, Debian, Fedora)

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

The installer sets up Ollama as a systemd service. After installation, Ollama starts automatically at boot. GPU support for NVIDIA and AMD is detected if drivers are present.

## First Test: Load and Run a Model

```bash
ollama run qwen3.5:4b
```

On the first run, the model downloads (~2.5 GB). Then an interactive chat session starts directly in the terminal:

```
>>> Explain Docker in one sentence.
Docker is a platform that packages applications in isolated containers so they
run the same everywhere — regardless of the host system.

>>> /bye
```

`/bye` ends the session. The model stays stored locally and is immediately available again.

The API runs in parallel at `http://localhost:11434`. Test it:

```bash
curl http://localhost:11434/api/tags
```

This returns all locally available models as JSON.

## Which Model for Which VRAM?

VRAM is the limiting factor — not RAM. If your GPU doesn't have enough VRAM, the model continues running on the CPU (noticeably slower, but functional).

| VRAM | Recommended Model | Download Size | Context |
|------|------------------|---------------|---------|
| 4 GB | `qwen3.5:4b` | ~2.5 GB | 256K tokens |
| 8 GB | `qwen3.5:8b` | ~5 GB | 256K tokens |
| 16 GB | `qwen3.5:14b` | ~9 GB | 256K tokens |
| 24 GB | `qwen3.5:27b` | ~17 GB | 256K tokens |

We use `qwen3.5:27b` on an RTX 3090 (24 GB) as our primary model — [Ollama Model Library](https://ollama.com/library) lists all available models with size information.

No dedicated GPU VRAM? No problem. `qwen3.5:4b` runs on CPU too — slower, but perfectly fine for first tests. On a modern laptop processor that's roughly 3-8 tokens per second.

## Model Management

```bash
# Show all locally available models
ollama list

# Download a model without immediately starting it
ollama pull llama3.2:3b

# Remove a model
ollama rm llama3.2:3b
```

Models are stored at `~/.ollama/models` (Linux/macOS) or `C:\Users\<name>\.ollama\models` (Windows). On an SSD with at least 20 GB free space we recommend `qwen3.5:4b` plus a second model for comparison.

## What's Next?

Ollama is running. The API responds. That's the foundation. What's still missing is a browser interface so you can chat without a terminal — and a clean configuration so Ollama reliably starts after a reboot.

**Continue to Step 4: Set Up a Browser Interface with Open WebUI →**

Or go straight to the complete setup — the **[Local AI Playbook P1](https://www.ai-engineering.at/products/playbook-p1)** (EUR 49) includes pre-configured Docker Compose files for Ollama + Open WebUI + monitoring, detailed instructions for all operating systems, and the complete stack we run in production ourselves.

---

*Sources: [ollama.com](https://ollama.com) — official documentation. [github.com/ollama/ollama](https://github.com/ollama/ollama) — source code and GPU support details. [ollama.com/library](https://ollama.com/library) — complete model library with size information and benchmarks.*
