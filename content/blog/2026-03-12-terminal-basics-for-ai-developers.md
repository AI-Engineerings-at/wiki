---
title: "Terminal Basics for AI Developers — the 10 Commands You Actually Need"
date: "2026-03-12"
description: "No CS degree needed. These 10 terminal commands are all you need to start your own AI stack."
summary: "No CS degree needed. These 10 terminal commands are all you need to start your own AI stack."
tags: ["Terminal", "Basics", "CLI", "Beginner", "Setup"]
author: "AI Engineering"
series: "Local AI Stack: From 0 to Production"
seriesStep: 2
---

# Terminal Basics for AI Developers — the 10 Commands You Actually Need

<figure style="margin: 2rem 0;">
  <img src="/images/generated/hero-ai-terminal.png" alt="Terminal and command line interface for AI development" style="border-radius: 12px; width: 100%;" />
</figure>

| Category | Commands | Use Case |
|----------|----------|----------|
| Navigation | `cd`, `ls`, `pwd` | Move around, find files |
| Networking | `curl`, `ssh` | API testing, remote access |
| Docker | `docker ps`, `docker logs` | Container management |
| Development | `git pull`, `cat`, `grep` | Code and config management |
| Packages | `pip` / `uv` | Install Python dependencies |

10 commands. That's all that stands between you and your first local LLM.

No CS degree, no Linux expertise required. Anyone who wants to run Ollama, check Docker containers, and download models needs exactly these 10 commands — nothing more.

## Why the Terminal at All?

Because almost every AI tool runs from the command line. Docker runs there. Python scripts start there. SSH connections to your server (when you eventually move to dedicated hardware) go through the terminal. Avoiding it means spending half your time wrestling with GUI wrappers that just call the terminal anyway. Direct is faster.

On Windows we recommend [Windows Terminal](https://aka.ms/terminal) + [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) — that gives you a full Linux environment without dual-booting.

## The 10 Commands

| Command | What it does | Example |
|---------|--------------|---------|
| `cd` | Change directory | `cd ~/projects/ai-stack` |
| `ls` / `dir` | List directory contents (Linux/Mac: `ls`, Windows: `dir`) | `ls -la` |
| `pwd` | Show current path (Print Working Directory) | `pwd` → `/home/joe/projects` |
| `curl` | Send HTTP requests — essential for API testing | `curl http://localhost:11434/api/tags` |
| `ssh` | Secure access to remote servers | `ssh joe@192.168.1.99` |
| `docker ps` | Show running containers | `docker ps --format "table {{.Names}}\t{{.Status}}"` |
| `git pull` | Pull the latest version from a repository | `git pull origin main` |
| `cat` | Output file contents directly | `cat .env` |
| `grep` | Search text in files or output | `docker logs ollama \| grep "error"` |
| `pip` / `uv` | Install Python packages (`uv` is significantly faster) | `uv pip install ollama` |

## Commands in Practice — Real Examples

Each command below shows at least two real-world use cases you will encounter when running a local AI stack.

**`cd` — navigate to your project:**
```bash
cd ~/projects/ai-stack          # jump to your AI project
cd ..                           # go up one level
cd -                            # jump back to previous directory
```

**`ls` — see what's in a directory:**
```bash
ls -la                          # show all files including hidden, with details
ls -lh ~/.ollama/models/        # show model files with human-readable sizes
ls *.yml                        # list only YAML files (e.g., docker-compose)
```

**`curl` — test APIs directly from the terminal:**
```bash
curl http://localhost:11434/api/tags                    # list Ollama models
curl -X POST http://localhost:11434/api/generate \
  -d '{"model":"qwen3.5:4b","prompt":"Hello"}'         # send a prompt
curl -s http://localhost:3000/health | python -m json.tool  # check Open WebUI health
```

**`grep` — find what matters in noisy output:**
```bash
docker logs ollama | grep "error"              # find errors in Ollama logs
grep -r "OLLAMA_HOST" ~/projects/              # find config references in your project
docker logs open-webui | grep -i "warning"     # case-insensitive warning search
```

**`docker ps` — know what's running:**
```bash
docker ps                                              # running containers
docker ps -a                                           # all containers including stopped
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"  # clean overview
```

## Three Things That Help Immediately

**Use Tab completion.** Start typing `cd pro` and press Tab — the terminal completes `projects/` automatically. Saves typing and prevents typos.

**Arrow key up.** The last command comes back with ↑. No retyping needed. Press Ctrl+R to search through your command history.

**`|` (pipe) connects commands.** `docker logs ollama | grep error` shows only lines containing "error" — instead of scrolling through hundreds of log lines. You can chain multiple pipes: `docker logs ollama | grep error | tail -5` shows only the last 5 error lines.

## Windows Users: WSL2 Is Worth It

Ollama runs natively on Windows. But many tools in the AI ecosystem are built for Linux. WSL2 gives you a full Ubuntu environment directly inside Windows — no VM, no dual-boot.

```bash
# Install WSL2 (PowerShell as Admin)
wsl --install
```

After a restart you have Ubuntu available in Windows Terminal. All 10 commands above work identically. Details: [WSL2 Documentation](https://learn.microsoft.com/en-us/windows/wsl/install).

For a deeper dive: the [Linux Foundation](https://www.linuxfoundation.org/resources/open-source-guides) has free introductory materials for the command line.

## Quick Test: Is Your Terminal Working?

Open Terminal (Windows Terminal, macOS Terminal, or a Linux shell) and type:

```bash
curl --version
```

If a version number appears — perfect. If not, curl isn't installed. On Windows: `winget install curl.curl`. On Ubuntu/WSL2: `sudo apt install curl`.

---

Terminal working? Then comes the real step: install Ollama and run your first model locally.

**Continue to Step 3: [Install Ollama in 5 Minutes →](/blog/2026-03-12-install-ollama-step-by-step)**

Or jump straight to the complete setup guide: the **[Local AI Playbook P1](https://www.ai-engineering.at/products/playbook-p1)** (EUR 49) takes you from terminal to a production-ready stack with browser interface, API access, and pre-configured Docker containers.
