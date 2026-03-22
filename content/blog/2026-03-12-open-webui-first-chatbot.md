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

<figure style="margin: 2rem 0;">
  <img src="/images/generated/hero-ai-agents.png" alt="AI agents and chatbot interaction" style="border-radius: 12px; width: 100%;" />
</figure>

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

## What the Interface Looks Like

When you open `http://localhost:3000` for the first time after creating your admin account, you land on a clean chat view. The layout is deliberately similar to ChatGPT — a sidebar on the left with your chat history, a model selector dropdown in the top area, and a large text input field at the bottom.

The sidebar lists all previous conversations. You can rename them, pin them, or delete them. Each conversation remembers which model was used, so you can switch models between chats without losing context.

The model dropdown shows every model Ollama has pulled locally. Next to each model name, you see the parameter count (e.g., "7B", "14B"). Clicking a model immediately switches the active model for that conversation.

Above the input field, you find buttons for file upload (drag-and-drop also works), web search toggle (if configured), and the system prompt editor. The system prompt field lets you define persistent instructions — for example, "Always respond in German" or "You are a technical documentation writer."

The settings panel (gear icon, top right) gives you access to user management, model configuration, connection settings, and interface customization. You can change the theme, configure API endpoints, and manage multiple Ollama instances from one dashboard.

## 5 Things to Try Immediately

**1. Set a System Prompt.** Click the system prompt icon above the input field. Enter something like: "You are an expert software engineer. Always provide code examples. Be concise." This instruction persists for the entire conversation and shapes every response. System prompts are one of the most underused features — they turn a generic chatbot into a specialized tool.

**2. Upload a Document with RAG.** Click the attachment icon or drag a PDF, text file, or Markdown file into the chat. Open WebUI will chunk the document, create embeddings, and use it as context for your questions. Ask "Summarize this document" or "What are the key findings in section 3?" — the model answers based on your uploaded content, not its training data.

**3. Switch Models Mid-Conversation.** Start a conversation with `llama3.2:3b` for quick drafts, then switch to `qwen2.5:14b` for a more nuanced response. The dropdown is live — no restart needed. This lets you use small models for brainstorming and larger models for final output, all in one session.

**4. Export Your Chats.** Open any conversation, click the three-dot menu, and select export. You get a clean JSON or Markdown file with the full conversation history. This is useful for documentation, sharing results with colleagues, or archiving important analyses.

**5. Set Up Multi-User Access.** In the admin settings, you can create additional user accounts. Each user gets their own chat history, their own system prompts, and their own model preferences. This turns Open WebUI from a personal tool into a team resource — still fully local, still zero data leaving the network.

## Troubleshooting

**Container starts but the page does not load.**
Check if port 3000 is already in use: `docker ps` shows all running containers and their port mappings. If another service occupies port 3000, change the mapping: `-p 3001:8080` instead. Also verify the container is actually running: `docker logs open-webui` shows the startup log. Look for errors related to database initialization or port binding.

**Model dropdown is empty.**
This means Open WebUI cannot reach your Ollama instance. The most common cause: Ollama is not running, or it is not listening on the expected address. Run `ollama list` in your terminal to confirm models are present. Then check the connection: `curl http://localhost:11434/api/tags` should return a JSON list of models. If you are on Linux and Ollama runs natively (not in Docker), ensure `OLLAMA_HOST=0.0.0.0` is set so it accepts connections from the Docker network. On Windows and Mac with Docker Desktop, `host.docker.internal` should resolve automatically.

**Model responds extremely slowly.**
Check if the model is running on GPU or falling back to CPU. In your terminal, run `ollama ps` while a request is active — it shows which model is loaded and whether it uses GPU acceleration. If the model exceeds your VRAM, it partially offloads to CPU, which can make responses 5-10x slower. Solution: use a smaller model. `llama3.2:3b` runs comfortably on 4 GB VRAM. `qwen2.5:7b` needs about 6 GB.

**Chat history disappeared after restart.**
If you did not use the `-v open-webui:/app/backend/data` volume flag during `docker run`, your data lives only inside the container and is lost when the container is removed. Recreate the container with the volume flag. Unfortunately, data from a container without a volume cannot be recovered after removal.

## Next Steps

**Open WebUI + n8n.** Open WebUI is great for interactive chat, but the real power comes when you connect it to automation. n8n can send requests to the Ollama API directly, process the responses, and trigger follow-up actions — all without Open WebUI. We cover this in our workflow automation posts.

**API Access.** Open WebUI exposes an OpenAI-compatible API. That means any tool that works with the OpenAI API — scripts, extensions, other applications — can connect to your local stack by pointing the base URL to `http://localhost:3000/api`. No code changes needed in most cases.

**Custom Models with Modelfiles.** Ollama supports Modelfiles — configuration files that let you create custom model variants. You can set a default system prompt, adjust temperature, define stop tokens, and layer your own fine-tuned adapters on top of base models. Open WebUI picks up these custom models automatically.

## What You Have Now

A fully functional, local chat interface. Multi-model. Persistent history. No cloud dependency. This is the stack we have been running internally for months — not as an experiment, but as a daily production environment.

---

**Sources:**
- [github.com/open-webui/open-webui](https://github.com/open-webui/open-webui) — source code, releases, changelog
- [docs.openwebui.com](https://docs.openwebui.com) — official documentation

---

Interface running? Next, learn how Docker makes your stack production-ready — [Step 5: Docker Basics for AI →](/blog/2026-03-12-docker-basics-for-ai)
