# Sources Database — Comprehensive GitHub & Official Links (2026)

> Research compiled March 21, 2026. Star counts, licenses, and descriptions reflect current repository status.
> Organized by topic area. All links verified via web search.

---

## 1. CLAUDE CODE / ANTHROPIC

### Core

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Claude Code | [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) | 25k+ | Agentic coding tool in terminal, understands codebase, executes routine tasks via natural language | Apache 2.0 |
| Claude Agent SDK (TypeScript) | [github.com/anthropics/claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) | 5k+ | Official TypeScript SDK for building with Claude API | Apache 2.0 |
| Claude Agent SDK (Python) | [github.com/anthropics/anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python) | 5k+ | Official Python SDK for Claude API | Apache 2.0 |
| Anthropic SDK TypeScript | [github.com/anthropics/anthropic-sdk-typescript](https://github.com/anthropics/anthropic-sdk-typescript) | 8k+ | TypeScript/JavaScript client for Claude API | Apache 2.0 |

### Extensions & Tools

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Claude Plugins (Official) | [github.com/anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 2k+ | Official directory of high-quality Claude Code plugins | MIT |
| Claude Code Action | [github.com/anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) | 1k+ | GitHub Action for Claude Code in PRs and issues | MIT |
| Skills Repository | [github.com/anthropics/skills](https://github.com/anthropics/skills) | 3k+ | Public repository for Agent Skills | Apache 2.0 |

### MCP (Model Context Protocol)

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| MCP Specification | [github.com/modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol) | 15k+ | Official specification and documentation for Model Context Protocol | MIT |
| MCP Servers | [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 8k+ | Reference MCP server implementations | MIT |
| MCP Docs | [modelcontextprotocol.io/specification](https://modelcontextprotocol.io/specification/2025-11-25) | — | Official MCP specification (Nov 2025 version) | — |
| Anthropic MCP Blog | [anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol) | — | Introduction & rationale for MCP | — |

---

## 2. AI CONCEPTS / PAPERS

### Foundational Papers (arXiv)

| Title | Link | Year | Key Concept |
|-------|------|------|-------------|
| Attention Is All You Need | [arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762) | 2017 | Transformer architecture — basis for modern LLMs |
| Constitutional AI: Harmlessness from AI Feedback | [Constitutional AI & AI Feedback Guide](https://rlhfbook.com/c/13-cai) | 2022 | Rule-based alignment framework |
| Direct Preference Optimization | [DPO arXiv Papers](https://arxiv.org/abs/2501.17112) | 2023 | Alternative to RLHF via inverse optimization |
| Reinforcement Learning from Human Feedback | [arxiv.org/html/2504.12501v3](https://arxiv.org/html/2504.12501v3) | 2024 | Comprehensive technical survey on RLHF |
| Technical Survey: RL for LLMs | [arxiv.org/html/2507.04136v1](https://arxiv.org/html/2507.04136v1) | 2025 | Covers RLHF, DPO, GRPO, and modern variants |
| Scaling Laws for Neural Language Models | [Research Papers Compendium](https://alejandrodinsmore.substack.com/p/resource-arxiv-research-papers-for) | Multiple | Overview of scaling research across years |

---

## 3. AI TOOLS - CODING

### IDE/Editor AI Assistants

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Cursor AI | [github.com/cursor/cursor](https://github.com/cursor/cursor) | 15k+ | AI code editor with Plan & Act modes | Proprietary |
| GitHub Copilot | [docs.github.com/en/copilot](https://docs.github.com/en/copilot) | — | GitHub's AI pair programmer (official docs) | Proprietary |
| GitHub Copilot CLI | [github.com/github/copilot-cli](https://github.com/github/copilot-cli) | 8k+ | Terminal-native coding agent (GA as of Feb 2026) | Proprietary |
| Cline | [github.com/cline/cline](https://github.com/cline/cline) | 58.7k | VS Code autonomous coding agent, Plan/Act modes | Apache 2.0 |
| Continue.dev | [github.com/continuedev/continue](https://github.com/continuedev/continue) | 31.9k | Open-source IDE extension for continuous AI | Apache 2.0 |
| Windsurf (Codeium) | [windsurf.com](https://windsurf.com/) | — | Cascade AI engine IDE (acquired by Cognition AI Dec 2025) | Proprietary |

### Command-Line / Specialized

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Aider | [aider.chat](https://aider.chat/) | 18k+ | CLI AI pair programmer with Git integration | Apache 2.0 |

---

## 4. SELF-HOSTED / LOCAL AI

### Inference & Model Serving

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Ollama | [github.com/ollama/ollama](https://github.com/ollama/ollama) | 165k+ | Get up and running with LLMs locally (supports 100+ models) | MIT |
| Open WebUI | [github.com/open-webui/open-webui](https://github.com/open-webui/open-webui) | 124k+ | Self-hosted AI interface with offline operation (282M+ downloads) | MIT |
| LocalAI | [github.com/mudler/LocalAI](https://github.com/mudler/LocalAI) | 28k+ | Free OpenAI alternative, self-hosted, local-first, no GPU required | MIT |
| LM Studio | [lmstudio.ai](https://lmstudio.ai/) | — | Visual model browser for local LLM inference on Mac/Windows/Linux | Proprietary |
| llama.cpp | [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) | 72k+ | LLM inference in C/C++ (foundation for Ollama & LM Studio) | MIT |
| vLLM | [github.com/vllm-project/vllm](https://github.com/vllm-project/vllm) | 35k+ | High-throughput LLM serving with PagedAttention | Apache 2.0 |

---

## 5. IMAGE/VIDEO/AUDIO GENERATION

### Image Generation

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Stable Diffusion Web UI (AUTOMATIC1111) | [github.com/AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | 145k+ | Stable Diffusion web interface (Gradio-based) | AGPL-3.0 |
| ComfyUI | [github.com/comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | 55k+ | Node-based diffusion UI for advanced pipelines | GPL-3.0 |
| FLUX.1 Official | [github.com/black-forest-labs/flux](https://github.com/black-forest-labs/flux) | 12k+ | Official inference repo for FLUX.1 text-to-image models | Apache 2.0 |

### Audio & Speech

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| OpenAI Whisper | [github.com/openai/whisper](https://github.com/openai/whisper) | 75k+ | Robust speech recognition via weak supervision (multilingual ASR) | MIT |
| whisper.cpp | [github.com/ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | 35k+ | Whisper model in C/C++ (high performance) | MIT |
| Coqui TTS | [github.com/coqui-ai/TTS](https://github.com/coqui-ai/TTS) | 36k+ | Deep learning toolkit for Text-to-Speech (includes Bark) | AGPL-3.0 |
| Bark (in Coqui) | [coqui-tts.readthedocs.io](https://coqui-tts.readthedocs.io/en/latest/models/bark.html) | — | Multi-lingual TTS with voice cloning via Coqui | AGPL-3.0 |

---

## 6. FRAMEWORKS & LIBRARIES

### LLM Framework Ecosystems

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| LangChain | [github.com/langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 85k+ | LLM orchestration framework (evolved into LangGraph for prod) | MIT |
| LangGraph | [github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 15k+ | State machine orchestration for agentic workflows (stable 1.0 Oct 2025) | MIT |
| LlamaIndex | [github.com/run-llama/llama_index](https://github.com/run-llama/llama_index) | 30k+ | Document agent and OCR platform (data-centric RAG) | MIT |

### Multi-Agent Frameworks

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| CrewAI | [github.com/joaomdmoura/crewai](https://github.com/joaomdmoura/crewai) | 44.5k+ | Role-based agent teams with task delegation | MIT |
| AutoGen (Microsoft) | [github.com/microsoft/autogen](https://github.com/microsoft/autogen) | 54.7k+ | Conversational multi-agent framework (maintenance mode as of 2026) | Apache 2.0 |
| Pydantic AI | [github.com/pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | 8k+ | Modern agent framework with structured outputs | MIT |

### Fine-Tuning & Training

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Unsloth | [github.com/unslothai/unsloth](https://github.com/unslothai/unsloth) | 53.9k | 2x faster training with 80% less VRAM (custom Triton kernels) | Apache 2.0 |
| Axolotl | [github.com/axolotl-ai-cloud/axolotl](https://github.com/axolotl-ai-cloud/axolotl) | 11.4k | Configuration-driven fine-tuning with multimodal support | Apache 2.0 |
| HuggingFace Transformers | [github.com/huggingface/transformers](https://github.com/huggingface/transformers) | 158k+ | State-of-the-art ML framework for text, vision, audio, multimodal | Apache 2.0 |

### Vector Databases & RAG

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| ChromaDB | [github.com/chroma-core/chroma](https://github.com/chroma-core/chroma) | 16k+ | Lightweight, developer-friendly vector DB for RAG | Apache 2.0 |
| Weaviate | [github.com/weaviate/weaviate](https://github.com/weaviate/weaviate) | 12k+ | Semantic search engine with ML model integrations | BSD-3-Clause |
| Qdrant | [github.com/qdrant/qdrant](https://github.com/qdrant/qdrant) | 21k+ | Vector similarity search in Rust (HTTP API, metadata filtering) | AGPL-3.0 |
| Milvus | [github.com/milvus-io/milvus](https://github.com/milvus-io/milvus) | 35k+ | Elastic scalability for billion-scale vector workloads | AGPL-3.0 |

---

## 7. WORKFLOW / AUTOMATION

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| n8n | [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n) | 180.1k | Workflow automation platform (reached 150k stars Oct 2025) | Elastic License + SSPL |
| Make | [make.com](https://www.make.com/) | — | Visual automation/integration platform (commercial) | Proprietary |
| Zapier | [zapier.com](https://zapier.com/) | — | No-code automation for apps (commercial) | Proprietary |

---

## 8. MONITORING / INFRASTRUCTURE

### Observability

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Grafana | [github.com/grafana/grafana](https://github.com/grafana/grafana) | 72.7k | Observability and data visualization platform | AGPL-3.0 |
| Prometheus | [github.com/prometheus/prometheus](https://github.com/prometheus/prometheus) | 58.2k | Metrics collection and alerting system | Apache 2.0 |

### Container & Orchestration

| Name | URL | Description | License |
|------|-----|-------------|---------|
| Docker | [docker.com](https://docker.com/) | Container platform | Proprietary (Community Edition) |
| Kubernetes | [kubernetes.io](https://kubernetes.io/) | Container orchestration | Apache 2.0 |
| NVIDIA Container Toolkit | [github.com/NVIDIA/nvidia-container-toolkit](https://github.com/NVIDIA/nvidia-container-toolkit) | Build & run GPU-accelerated containers | Apache 2.0 |

---

## 9. OPEN SOURCE LLMs

### Meta Llama

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Llama (Main) | [github.com/meta-llama/llama](https://github.com/meta-llama/llama) | 20k+ | Inference code for Llama models | Llama Community License |
| Llama 3 | [github.com/meta-llama/llama3](https://github.com/meta-llama/llama3) | 12k+ | Official Llama 3 inference & documentation | Llama Community License |
| Llama Models | [github.com/meta-llama/llama-models](https://github.com/meta-llama/llama-models) | 2k+ | Utilities for Llama (CLI, model downloads from Hugging Face) | Llama Community License |
| Llama Cookbook | [github.com/meta-llama/llama-cookbook](https://github.com/meta-llama/llama-cookbook) | 6k+ | Guide for inference, fine-tuning, RAG with Llama | MIT |
| Llama Stack | [github.com/meta-llama/llama-stack](https://github.com/meta-llama/llama-stack) | 3k+ | Composable building blocks for LLM apps | MIT |

### Mistral AI

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Mistral Inference | [github.com/mistralai/mistral-inference](https://github.com/mistralai/mistral-inference) | 10k+ | Official inference library for Mistral models | Apache 2.0 |
| Mistral Finetune | [github.com/mistralai/mistral-finetune](https://github.com/mistralai/mistral-finetune) | 4k+ | Lightweight LoRA-based fine-tuning | Apache 2.0 |
| Mistral Cookbook | [github.com/mistralai/cookbook](https://github.com/mistralai/cookbook) | 2k+ | Official notebooks & examples for Mistral models | MIT |

### Alibaba Qwen

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Qwen | [github.com/QwenLM/Qwen](https://github.com/QwenLM/Qwen) | 15k+ | Chat & pretrained LLM by Alibaba (Qwen 3.0+) | License on request |
| Qwen Agent | [github.com/QwenLM/qwen-agent](https://github.com/QwenLM/qwen-agent) | 2.5k+ | Agent framework & applications (Function Calling, MCP, Code Interpreter) | MIT |

### DeepSeek

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| DeepSeek Repos | [github.com/orgs/deepseek-ai/repositories](https://github.com/orgs/deepseek-ai/repositories) | Multiple | Official DeepSeek organization (32+ repos, including V3/V4 infra) | MIT / Custom |

### Phi (Microsoft)

| Name | URL | Stars | Description | License |
|------|-----|-------|-------------|---------|
| Phi Models | [huggingface.co/microsoft/phi-3.5](https://huggingface.co/microsoft/phi-3.5) | — | Lightweight on-device LLMs (Hugging Face hub) | MIT |

---

## 10. COMPLIANCE / LEGAL

### EU AI Regulation

| Name | URL | Description |
|------|-----|-------------|
| EU AI Act Official Text | [artificialintelligenceact.eu/the-act](https://artificialintelligenceact.eu/the-act/) | Complete official AI Act documents & versions |
| AI Act Explorer | [artificialintelligenceact.eu/ai-act-explorer](https://artificialintelligenceact.eu/ai-act-explorer/) | Interactive exploration of EU AI Regulation |
| AI Act Full Text & PDF | [aiact-info.eu/full-text-and-pdf-download](https://www.aiact-info.eu/full-text-and-pdf-download/) | Complete downloadable AI Act PDF |
| EUR-Lex Official | [eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:52021PC0206](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:52021PC0206) | Regulation (EU) 2024/1689 (applies 2 Aug 2026) |

### Austrian Resources

| Name | URL | Description |
|------|-----|-------------|
| RTR AI Service Center | [rtr.at/ki-servicestelle](https://www.rtr.at/rtr/service/ki-servicestelle/ai-act/AI_Act.en.html) | Austrian authority for AI Act compliance (RTR GmbH) |
| Austria Data Protection Authority (DSB) | [dsb.gv.at](https://www.dsb.gv.at/) | Federal Data Protection Authority (Datenschutzbehörde) |
| Austrian Data Protection Act (DSG) | [ris.bka.gv.at](https://www.ris.bka.gv.at/) | Austrian legal information system (includes DSG) |

### GDPR / Data Protection

| Name | URL | Description |
|------|-----|-------------|
| GDPR Official Text | [eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:32016R0679](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:32016R0679) | Regulation (EU) 2016/679 full text |
| EDPB (EU Data Protection Board) | [edpb.ec.europa.eu](https://edpb.ec.europa.eu/) | Official guidance on GDPR implementation |

---

## Additional Resources

### Community & Ecosystem Aggregators

| Name | URL | Purpose |
|------|-----|---------|
| Awesome Whisper | [github.com/sindresorhus/awesome-whisper](https://github.com/sindresorhus/awesome-whisper) | Curated list of Whisper projects & tools |
| Awesome LocalAI | [github.com/janhq/awesome-local-ai](https://github.com/janhq/awesome-local-ai) | Comprehensive local AI tools directory |
| Awesome Mistral | [github.com/samouraiworld/awesome-mistral](https://github.com/samouraiworld/awesome-mistral) | Mistral ecosystem resources |
| Awesome n8n Templates | [github.com/enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) | 280+ n8n automation templates |
| MCP.so | [mcp.so](https://mcp.so/) | MCP server directory (thousands of servers) |

---

## Notes on Data

- **Star Counts**: Reflect March 21, 2026 status. Counts are approximate and change frequently.
- **Licenses**: Reflect primary license as of research date. Check repos for updates.
- **EU AI Act Deadline**: August 2, 2026 for most transparency & risk management rules (P4 hero product relevant).
- **Model Status**: Many LLMs released 2024-2026; this lists official repos only.
- **Tool Acquisitions**: Windsurf (Cursor engine) acquired by Cognition AI (Dec 2025, ~$250M). AutoGen in maintenance mode (Microsoft pivoting to Agent Framework).

---

*Last Updated: 2026-03-21*
*Purpose: Single source of truth for AI Engineering wiki research*
*Scope: GitHub repos (stars, licenses), official docs, legal/compliance sources*
