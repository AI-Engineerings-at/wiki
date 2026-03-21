---
title: "Your First Local AI Chatbot: Set Up Open WebUI in 10 Minutes"
date: "2026-03-12"
description: "Ollama is running, but you want a browser interface. Here's how to set up Open WebUI — the ChatGPT-like interface for your local stack."
summary: "Ollama is running, but you want a browser interface. Here's how to set up Open WebUI — the ChatGPT-like interface for your local stack."
tags: ["Open WebUI", "Chatbot", "Interface", "Ollama", "Beginner"]
author: "AI Engineering"
series: "Local AI Stack: From 0 to Production"
seriesStep: 4
---

# Your First Local AI Chatbot: Set Up Open WebUI in 10 Minutes

| Step | What happens | Result |
|------|-------------|--------|
| 1 | Install Docker (if not already present) | Docker Engine running |
| 2 | `docker run` with Open WebUI image | Container starts |
| 3 | Open browser: `localhost:3000` | Login page appears |
| 4 | Create admin account | Access secured |
| 5 | Select model from dropdown | Chat ready |
| 6 | Type your first message | Response from local LLM |

You have Ollama installed. Now you want a real interface — not just the command line.

`ollama run llama3.2` works, but it is not a chat interface. No history, no model switching with a click, no file upload. Open WebUI fixes that.

## What Is Open WebUI?

[Open WebUI](https://github.com/open-webui/open-webui) is a self-hosted browser interface for Ollama — visually and functionally close to ChatGPT. You get chat history, model selection, file upload, system prompts, and user management. Everything runs locally, no account, no subscription, no external API. The project currently has over 70,000 GitHub stars and is under active development ([source](https://github.com/open-webui/open-webui)).

## Prerequisite: Docker

Open WebUI runs as a Docker container. If Docker is not installed yet: that is covered in Step 5 of this series. If you already have it, read on.

Docker Desktop for Windows and Mac is available at [docs.docker.com/get-docker](https://docs.docker.com/get-docker/).

## Installation: One Command

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

That is it. After the download (500 MB to 1 GB depending on version), Open WebUI is available at `http://localhost:3000`.

What the command does:

- `-p 3000:8080` — port 3000 on your machine, port 8080 inside the container
- `--add-host=host.docker.internal:host-gateway` — lets the container reach your local Ollama instance
- `-v open-webui:/app/backend/data` — persistent storage for your chats and settings
- `--restart always` — container restarts automatically after a reboot

On first access, you create an admin account. No password is uploaded anywhere — it stays local in the SQLite database inside the volume.

## Selecting a Model

After logging in, you see a dropdown in the top left with all models Ollama knows about. Click the dropdown, select your model, type your first message.

If the dropdown is empty: Ollama needs to be running and reachable. Check with `ollama list` in the terminal to see if models are available. If not: `ollama pull llama3.2` or `ollama pull qwen2.5:7b` — both solid entry-level models.

We covered a comparison of different models and what they are good at in [Step 3 of this series](/blog/2026-03-12-install-ollama-step-by-step).

## Why This Is GDPR-Compliant

The most important property: not a single byte leaves your machine. No request goes to OpenAI, Anthropic, or any other cloud provider. Open WebUI sends nothing outward — neither your prompts nor the responses. The only external connection is the initial Docker pull from GitHub Container Registry.

This means: you can upload confidential documents, discuss internal processes, analyze customer data — without legal grey areas. For businesses in the EU, this is not a nice-to-have, it is the baseline requirement.

The same applies to chat history. It is stored in `open-webui:/app/backend/data` — on your machine, in your file system, under your control.

## What You Have Now

A fully functional, local chat interface. Multi-model. Persistent history. No cloud dependency. This is the stack we have been running internally for months — not as an experiment, but as a daily production environment.

---

**Sources:**
- [github.com/open-webui/open-webui](https://github.com/open-webui/open-webui) — source code, releases, changelog
- [docs.openwebui.com](https://docs.openwebui.com) — official documentation

---

Interface running? Next, learn how Docker makes your stack production-ready — [Step 5: Docker Basics for AI →](/blog/2026-03-12-docker-basics-for-ai)
