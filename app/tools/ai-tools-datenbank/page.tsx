'use client'

import { useState, useMemo } from 'react'
import Callout from "../../../components/Callout"

type Tool = {
  name: string
  description: string
  url: string
  github: string
  stars: string
  license: string
  selfHosted: boolean
  tags: string[]
  inUse: boolean
}

type ToolCategory = {
  title: string
  icon: string
  description: string
  tools: Tool[]
}

const toolCategories: ToolCategory[] = [
  {
    title: 'LLM Runtimes',
    icon: '\u{1F999}',
    description: 'Lokale LLM-Ausführung und Inference-Engines für Self-Hosted AI.',
    tools: [
      { name: 'Ollama', description: 'Lokale LLM-Ausführung. Ein Befehl, Modell läuft.', url: 'https://ollama.com', github: 'https://github.com/ollama/ollama', stars: '120k+', license: 'MIT', selfHosted: true, tags: ['llm', 'local', 'inference'], inUse: true },
      { name: 'vLLM', description: 'High-Throughput Inference-Engine mit PagedAttention und kontinuierlichem Batching.', url: 'https://vllm.ai', github: 'https://github.com/vllm-project/vllm', stars: '50k+', license: 'Apache 2.0', selfHosted: true, tags: ['llm', 'inference', 'gpu'], inUse: false },
      { name: 'llama.cpp', description: 'LLM-Inferenz in C/C++. Läuft auf CPU und GPU, extrem optimiert.', url: 'https://github.com/ggerganov/llama.cpp', github: 'https://github.com/ggerganov/llama.cpp', stars: '75k+', license: 'MIT', selfHosted: true, tags: ['llm', 'cpu', 'gguf'], inUse: false },
      { name: 'LM Studio', description: 'Desktop-App für lokale LLMs. Modelle herunterladen und sofort nutzen.', url: 'https://lmstudio.ai', github: 'https://github.com/lmstudio-ai', stars: '—', license: 'Proprietär', selfHosted: true, tags: ['llm', 'desktop', 'gui'], inUse: false },
      { name: 'GPT4All', description: 'Open-Source LLM-Chatbot für Desktop. Privat, offline, keine API nötig.', url: 'https://gpt4all.io', github: 'https://github.com/nomic-ai/gpt4all', stars: '72k+', license: 'MIT', selfHosted: true, tags: ['llm', 'desktop', 'offline'], inUse: false },
      { name: 'LocalAI', description: 'Self-Hosted OpenAI-Alternative. Drop-in Replacement für die OpenAI API.', url: 'https://localai.io', github: 'https://github.com/mudler/LocalAI', stars: '30k+', license: 'MIT', selfHosted: true, tags: ['llm', 'openai-kompatibel', 'api'], inUse: false },
      { name: 'Jan', description: 'Open-Source ChatGPT-Alternative. 100% offline, läuft auf jedem Computer.', url: 'https://jan.ai', github: 'https://github.com/janhq/jan', stars: '25k+', license: 'AGPL-3.0', selfHosted: true, tags: ['llm', 'desktop', 'offline'], inUse: false },
    ],
  },
  {
    title: 'Chat Interfaces',
    icon: '\u{1F4AC}',
    description: 'Web-basierte Chat-Oberflächen für LLMs mit Multi-User, RAG und Plugin-Support.',
    tools: [
      { name: 'Open WebUI', description: 'Feature-reiche WebUI für Ollama und OpenAI-kompatible APIs. RAG, Multi-User, Plugins.', url: 'https://openwebui.com', github: 'https://github.com/open-webui/open-webui', stars: '60k+', license: 'MIT', selfHosted: true, tags: ['chat', 'webui', 'rag'], inUse: true },
      { name: 'LibreChat', description: 'ChatGPT-Klon mit MCP-Support, Multi-Provider und Multi-User Auth.', url: 'https://librechat.ai', github: 'https://github.com/danny-avila/LibreChat', stars: '22k+', license: 'MIT', selfHosted: true, tags: ['chat', 'mcp', 'multi-provider'], inUse: false },
      { name: 'Lobe Chat', description: 'Modernes Chat-Framework mit Plugin-System und Vision-Support.', url: 'https://lobehub.com', github: 'https://github.com/lobehub/lobe-chat', stars: '55k+', license: 'MIT', selfHosted: true, tags: ['chat', 'plugins', 'vision'], inUse: false },
      { name: 'Chatbot UI', description: 'Open-Source ChatGPT-Interface. Clean, schnell, erweiterbar.', url: 'https://chatbotui.com', github: 'https://github.com/mckaywrigley/chatbot-ui', stars: '29k+', license: 'MIT', selfHosted: true, tags: ['chat', 'minimal', 'nextjs'], inUse: false },
      { name: 'Big-AGI', description: 'AI-Suite für Profis: Multi-Model-Chat, Personas, Branching, Code-Interpreter.', url: 'https://big-agi.com', github: 'https://github.com/enricoros/big-AGI', stars: '6k+', license: 'MIT', selfHosted: true, tags: ['chat', 'multi-model', 'power-user'], inUse: false },
    ],
  },
  {
    title: 'Workflow Automation',
    icon: '\u{26A1}',
    description: 'Workflow-Engines und Automatisierungs-Plattformen mit nativer AI-Integration.',
    tools: [
      { name: 'n8n', description: 'Fair-Code Workflow-Automation mit 400+ Nodes und nativer AI-Integration.', url: 'https://n8n.io', github: 'https://github.com/n8n-io/n8n', stars: '55k+', license: 'Fair-Code', selfHosted: true, tags: ['automation', 'workflows', 'ai-nodes'], inUse: true },
      { name: 'Dify', description: 'LLM App Development Platform. Visual Workflow Builder, RAG, Agent-Orchestrierung.', url: 'https://dify.ai', github: 'https://github.com/langgenius/dify', stars: '70k+', license: 'Apache 2.0', selfHosted: true, tags: ['automation', 'llm-apps', 'rag'], inUse: false },
      { name: 'Flowise', description: 'Drag & Drop LLM Flow Builder. LangChain-basiert, No-Code.', url: 'https://flowiseai.com', github: 'https://github.com/FlowiseAI/Flowise', stars: '35k+', license: 'Apache 2.0', selfHosted: true, tags: ['automation', 'no-code', 'langchain'], inUse: false },
      { name: 'Activepieces', description: 'Open-Source Zapier-Alternative mit AI-Pieces und Self-Hosting.', url: 'https://activepieces.com', github: 'https://github.com/activepieces/activepieces', stars: '12k+', license: 'MIT', selfHosted: true, tags: ['automation', 'no-code', 'zapier-alternative'], inUse: false },
      { name: 'Kestra', description: 'Event-Driven Orchestration Platform. Workflows in Code oder UI.', url: 'https://kestra.io', github: 'https://github.com/kestra-io/kestra', stars: '15k+', license: 'Apache 2.0', selfHosted: true, tags: ['orchestration', 'event-driven', 'data'], inUse: false },
      { name: 'Langflow', description: 'Visual Framework für Multi-Agent und RAG-Anwendungen.', url: 'https://langflow.org', github: 'https://github.com/langflow-ai/langflow', stars: '45k+', license: 'MIT', selfHosted: true, tags: ['automation', 'visual', 'rag'], inUse: false },
    ],
  },
  {
    title: 'RAG & Search',
    icon: '\u{1F50D}',
    description: 'Vector-Datenbanken, Suchmaschinen und RAG-Frameworks für AI-Anwendungen.',
    tools: [
      { name: 'ChromaDB', description: 'AI-native Open-Source Embedding-Datenbank. Einfach zu starten, skaliert mit.', url: 'https://trychroma.com', github: 'https://github.com/chroma-core/chroma', stars: '18k+', license: 'Apache 2.0', selfHosted: true, tags: ['vector-db', 'embeddings', 'python'], inUse: false },
      { name: 'Weaviate', description: 'Cloud-native Vector-Datenbank mit Hybrid Search und Multi-Tenancy.', url: 'https://weaviate.io', github: 'https://github.com/weaviate/weaviate', stars: '12k+', license: 'BSD-3', selfHosted: true, tags: ['vector-db', 'hybrid-search', 'graphql'], inUse: false },
      { name: 'Meilisearch', description: 'Blitzschnelle Such-Engine mit Typo-Toleranz. Instant Search in Millisekunden.', url: 'https://meilisearch.com', github: 'https://github.com/meilisearch/meilisearch', stars: '50k+', license: 'MIT', selfHosted: true, tags: ['search', 'full-text', 'instant'], inUse: false },
      { name: 'Qdrant', description: 'High-Performance Vector Search Engine in Rust. Filterung, Payload, gRPC.', url: 'https://qdrant.tech', github: 'https://github.com/qdrant/qdrant', stars: '22k+', license: 'Apache 2.0', selfHosted: true, tags: ['vector-db', 'rust', 'performance'], inUse: false },
      { name: 'LanceDB', description: 'Serverlose Vector-Datenbank für AI. Kein Server nötig, embedded.', url: 'https://lancedb.com', github: 'https://github.com/lancedb/lancedb', stars: '5k+', license: 'Apache 2.0', selfHosted: true, tags: ['vector-db', 'serverless', 'embedded'], inUse: false },
      { name: 'open-notebook', description: 'Open-Source NotebookLM-Alternative. Knowledge Management mit AI.', url: 'https://github.com/lfnovo/open-notebook', github: 'https://github.com/lfnovo/open-notebook', stars: '1k+', license: 'MIT', selfHosted: true, tags: ['knowledge', 'notebook', 'rag'], inUse: true },
    ],
  },
  {
    title: 'Agent Frameworks',
    icon: '\u{1F916}',
    description: 'Frameworks für autonome AI-Agenten, Multi-Agent Systeme und Orchestrierung.',
    tools: [
      { name: 'LangChain', description: 'Framework für LLM-Anwendungen. Chains, Agents, Tools, Memory.', url: 'https://langchain.com', github: 'https://github.com/langchain-ai/langchain', stars: '100k+', license: 'MIT', selfHosted: true, tags: ['agents', 'chains', 'tools'], inUse: false },
      { name: 'LlamaIndex', description: 'Data Framework für LLM-Anwendungen. Indexing, Retrieval, Query Engines.', url: 'https://llamaindex.ai', github: 'https://github.com/run-llama/llama_index', stars: '38k+', license: 'MIT', selfHosted: true, tags: ['agents', 'data', 'indexing'], inUse: false },
      { name: 'AutoGen', description: 'Multi-Agent Conversation Framework von Microsoft. Agenten diskutieren und lösen Aufgaben.', url: 'https://microsoft.github.io/autogen/', github: 'https://github.com/microsoft/autogen', stars: '40k+', license: 'CC-BY-4.0', selfHosted: true, tags: ['agents', 'multi-agent', 'microsoft'], inUse: false },
      { name: 'CrewAI', description: 'Framework für rollenbasierte autonome AI-Agenten. Teams aus spezialisierten Agents.', url: 'https://crewai.com', github: 'https://github.com/crewAIInc/crewAI', stars: '25k+', license: 'MIT', selfHosted: true, tags: ['agents', 'roles', 'orchestration'], inUse: false },
      { name: 'Semantic Kernel', description: 'Microsofts SDK für AI-Integration in Apps. Planner, Plugins, Memory.', url: 'https://learn.microsoft.com/semantic-kernel/', github: 'https://github.com/microsoft/semantic-kernel', stars: '23k+', license: 'MIT', selfHosted: true, tags: ['agents', 'sdk', 'microsoft'], inUse: false },
      { name: 'Haystack', description: 'End-to-End NLP Framework. Pipelines für Search, QA und RAG.', url: 'https://haystack.deepset.ai', github: 'https://github.com/deepset-ai/haystack', stars: '18k+', license: 'Apache 2.0', selfHosted: true, tags: ['agents', 'pipelines', 'nlp'], inUse: false },
    ],
  },
  {
    title: 'MCP Servers',
    icon: '\u{1F527}',
    description: 'Model Context Protocol Server für Tool-Integration und AI-Anbindung.',
    tools: [
      { name: 'MCP Servers (Anthropic)', description: 'Offizielle MCP-Server-Sammlung von Anthropic. Filesystem, Git, Postgres, Slack, und mehr.', url: 'https://modelcontextprotocol.io', github: 'https://github.com/modelcontextprotocol/servers', stars: '18k+', license: 'MIT', selfHosted: true, tags: ['mcp', 'tools', 'official'], inUse: true },
      { name: 'Awesome MCP Servers', description: 'Community-kuratierte Liste von MCP-Servern für jeden Anwendungsfall.', url: 'https://github.com/punkpeye/awesome-mcp-servers', github: 'https://github.com/punkpeye/awesome-mcp-servers', stars: '40k+', license: 'CC0', selfHosted: false, tags: ['mcp', 'awesome-list', 'community'], inUse: false },
      { name: 'Playwright MCP', description: 'Browser-Automation via MCP. Websites steuern, Screenshots, Testing.', url: 'https://github.com/microsoft/playwright-mcp', github: 'https://github.com/microsoft/playwright-mcp', stars: '8k+', license: 'Apache 2.0', selfHosted: true, tags: ['mcp', 'browser', 'testing'], inUse: true },
      { name: 'Notion MCP', description: 'MCP-Server für Notion. Seiten lesen, erstellen, durchsuchen.', url: 'https://github.com/makenotion/notion-mcp-server', github: 'https://github.com/makenotion/notion-mcp-server', stars: '2k+', license: 'MIT', selfHosted: true, tags: ['mcp', 'notion', 'productivity'], inUse: true },
      { name: 'Docker MCP', description: 'MCP-Server für Docker. Container verwalten via AI-Agent.', url: 'https://github.com/docker/docker-mcp', github: 'https://github.com/docker/docker-mcp', stars: '1k+', license: 'Apache 2.0', selfHosted: true, tags: ['mcp', 'docker', 'infrastructure'], inUse: false },
    ],
  },
  {
    title: 'Monitoring',
    icon: '\u{1F4CA}',
    description: 'Observability, Metriken, Alerting und Uptime-Monitoring für AI-Infrastruktur.',
    tools: [
      { name: 'Grafana', description: 'Dashboards und Observability. Visualisierung für Prometheus, Loki und mehr.', url: 'https://grafana.com', github: 'https://github.com/grafana/grafana', stars: '66k+', license: 'AGPL-3.0', selfHosted: true, tags: ['dashboards', 'visualization', 'alerting'], inUse: true },
      { name: 'Prometheus', description: 'Monitoring und Alerting Toolkit. Time-Series Datenbank, PromQL.', url: 'https://prometheus.io', github: 'https://github.com/prometheus/prometheus', stars: '57k+', license: 'Apache 2.0', selfHosted: true, tags: ['metrics', 'time-series', 'alerting'], inUse: true },
      { name: 'Uptime Kuma', description: 'Self-Hosted Monitoring. Status-Pages, Notifications, Clean UI.', url: 'https://uptime.kuma.pet', github: 'https://github.com/louislam/uptime-kuma', stars: '65k+', license: 'MIT', selfHosted: true, tags: ['uptime', 'status-page', 'notifications'], inUse: true },
      { name: 'Netdata', description: 'Real-Time Infrastructure Monitoring. Auto-Discovery, Zero Config.', url: 'https://netdata.cloud', github: 'https://github.com/netdata/netdata', stars: '73k+', license: 'GPL-3.0', selfHosted: true, tags: ['real-time', 'auto-discovery', 'infrastructure'], inUse: false },
      { name: 'Langfuse', description: 'LLM Engineering Platform. Traces, Evals, Prompt Management, Kosten-Tracking.', url: 'https://langfuse.com', github: 'https://github.com/langfuse/langfuse', stars: '8k+', license: 'MIT', selfHosted: true, tags: ['llm-monitoring', 'tracing', 'evals'], inUse: false },
    ],
  },
  {
    title: 'Security & Compliance',
    icon: '\u{1F6E1}',
    description: 'Secrets Management, Container-Security, Intrusion Prevention und Schwachstellen-Scanning.',
    tools: [
      { name: 'Vault', description: 'Secrets Management von HashiCorp. API Keys, Zertifikate, Encryption.', url: 'https://vaultproject.io', github: 'https://github.com/hashicorp/vault', stars: '32k+', license: 'BUSL-1.1', selfHosted: true, tags: ['secrets', 'encryption', 'certificates'], inUse: false },
      { name: 'Trivy', description: 'All-in-One Security Scanner. Container, Filesystem, Git Repos, Kubernetes.', url: 'https://trivy.dev', github: 'https://github.com/aquasecurity/trivy', stars: '25k+', license: 'Apache 2.0', selfHosted: true, tags: ['scanner', 'container', 'vulnerabilities'], inUse: false },
      { name: 'CrowdSec', description: 'Open-Source Intrusion Prevention. Community-basierte IP-Blocklisten.', url: 'https://crowdsec.net', github: 'https://github.com/crowdsecurity/crowdsec', stars: '9k+', license: 'MIT', selfHosted: true, tags: ['ids', 'intrusion-prevention', 'community'], inUse: false },
      { name: 'Fail2ban', description: 'Brute-Force Protection. Überwacht Logs und bannt verdächtige IPs.', url: 'https://fail2ban.org', github: 'https://github.com/fail2ban/fail2ban', stars: '12k+', license: 'GPL-2.0', selfHosted: true, tags: ['brute-force', 'logs', 'banning'], inUse: true },
      { name: 'promptfoo', description: 'AI Red Teaming und Prompt Testing. LLM-Sicherheit validieren.', url: 'https://promptfoo.dev', github: 'https://github.com/promptfoo/promptfoo', stars: '5k+', license: 'MIT', selfHosted: true, tags: ['ai-security', 'red-team', 'testing'], inUse: false },
    ],
  },
  {
    title: 'Image Generation',
    icon: '\u{1F3A8}',
    description: 'Lokale Bildgenerierung mit Stable Diffusion, Flux und anderen Modellen.',
    tools: [
      { name: 'ComfyUI', description: 'Node-basierte UI für Stable Diffusion. Visueller Workflow Builder für Bildgenerierung.', url: 'https://comfyui.com', github: 'https://github.com/comfyanonymous/ComfyUI', stars: '70k+', license: 'GPL-3.0', selfHosted: true, tags: ['image-gen', 'nodes', 'workflows'], inUse: false },
      { name: 'Stable Diffusion WebUI', description: 'AUTOMATIC1111s WebUI. Der Klassiker für lokale Bildgenerierung.', url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', github: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', stars: '145k+', license: 'AGPL-3.0', selfHosted: true, tags: ['image-gen', 'webui', 'klassiker'], inUse: false },
      { name: 'Fooocus', description: 'Minimale UI für Bildgenerierung. Midjourney-Qualität, lokal, keine Config nötig.', url: 'https://github.com/lllyasviel/Fooocus', github: 'https://github.com/lllyasviel/Fooocus', stars: '42k+', license: 'GPL-3.0', selfHosted: true, tags: ['image-gen', 'simple', 'quality'], inUse: false },
      { name: 'InvokeAI', description: 'Professionelle Bildgenerierung mit Canvas, Controlnet und Workflows.', url: 'https://invoke.ai', github: 'https://github.com/invoke-ai/InvokeAI', stars: '24k+', license: 'Apache 2.0', selfHosted: true, tags: ['image-gen', 'canvas', 'professional'], inUse: false },
      { name: 'Stable Diffusion WebUI Forge', description: 'Optimierte Fork von A1111. Schneller, weniger VRAM, mehr Features.', url: 'https://github.com/lllyasviel/stable-diffusion-webui-forge', github: 'https://github.com/lllyasviel/stable-diffusion-webui-forge', stars: '10k+', license: 'AGPL-3.0', selfHosted: true, tags: ['image-gen', 'optimized', 'fork'], inUse: false },
    ],
  },
  {
    title: 'Speech & Audio',
    icon: '\u{1F399}',
    description: 'Speech-to-Text, Text-to-Speech und Audio-Verarbeitung mit lokalen Modellen.',
    tools: [
      { name: 'Whisper', description: 'OpenAIs Speech-to-Text Modell. Robust, multilingual, lokal einsetzbar.', url: 'https://openai.com/research/whisper', github: 'https://github.com/openai/whisper', stars: '75k+', license: 'MIT', selfHosted: true, tags: ['stt', 'multilingual', 'openai'], inUse: false },
      { name: 'Whisper.cpp', description: 'C/C++ Port von Whisper. Extrem schnell, läuft auf CPU.', url: 'https://github.com/ggerganov/whisper.cpp', github: 'https://github.com/ggerganov/whisper.cpp', stars: '38k+', license: 'MIT', selfHosted: true, tags: ['stt', 'cpp', 'fast'], inUse: false },
      { name: 'Piper TTS', description: 'Schnelle lokale Text-to-Speech Engine. Viele Stimmen, viele Sprachen.', url: 'https://github.com/rhasspy/piper', github: 'https://github.com/rhasspy/piper', stars: '8k+', license: 'MIT', selfHosted: true, tags: ['tts', 'local', 'multilingual'], inUse: false },
      { name: 'Coqui TTS', description: 'Deep Learning Text-to-Speech. Voice Cloning, Multi-Speaker, Multi-Language.', url: 'https://coqui.ai', github: 'https://github.com/coqui-ai/TTS', stars: '37k+', license: 'MPL-2.0', selfHosted: true, tags: ['tts', 'voice-cloning', 'deep-learning'], inUse: false },
      { name: 'Faster Whisper', description: 'CTranslate2-basierter Whisper. 4x schneller, gleiche Qualität.', url: 'https://github.com/SYSTRAN/faster-whisper', github: 'https://github.com/SYSTRAN/faster-whisper', stars: '14k+', license: 'MIT', selfHosted: true, tags: ['stt', 'optimized', 'fast'], inUse: false },
    ],
  },
  {
    title: 'Coding Assistants',
    icon: '\u{1F4DD}',
    description: 'AI-gestützte Programmier-Tools, Code-Completion und Terminal-Integration.',
    tools: [
      { name: 'Claude Code', description: 'Anthropics agentic Coding-Tool. Terminal-basiert, versteht ganze Codebases.', url: 'https://claude.ai/code', github: 'https://github.com/anthropics', stars: '—', license: 'Proprietär', selfHosted: false, tags: ['coding', 'terminal', 'agentic'], inUse: true },
      { name: 'GitHub Copilot', description: 'AI Pair Programmer von GitHub/OpenAI. Code-Suggestions direkt im Editor.', url: 'https://github.com/features/copilot', github: 'https://github.com/features/copilot', stars: '—', license: 'Proprietär', selfHosted: false, tags: ['coding', 'editor', 'suggestions'], inUse: false },
      { name: 'Cursor', description: 'AI-first Code Editor. Fork von VS Code mit integriertem AI-Chat und Editing.', url: 'https://cursor.com', github: 'https://github.com/getcursor/cursor', stars: '—', license: 'Proprietär', selfHosted: false, tags: ['coding', 'editor', 'ai-first'], inUse: false },
      { name: 'Cody', description: 'Sourcegraphs AI Coding Assistant. Versteht deine gesamte Codebase.', url: 'https://sourcegraph.com/cody', github: 'https://github.com/sourcegraph/cody', stars: '3k+', license: 'Apache 2.0', selfHosted: false, tags: ['coding', 'codebase', 'search'], inUse: false },
      { name: 'Continue', description: 'Open-Source AI Code Assistant. VS Code und JetBrains, lokale Modelle möglich.', url: 'https://continue.dev', github: 'https://github.com/continuedev/continue', stars: '22k+', license: 'Apache 2.0', selfHosted: true, tags: ['coding', 'open-source', 'local'], inUse: false },
      { name: 'Aider', description: 'AI Pair Programming im Terminal. Versteht Git, editiert Dateien direkt.', url: 'https://aider.chat', github: 'https://github.com/paul-gauthier/aider', stars: '25k+', license: 'Apache 2.0', selfHosted: true, tags: ['coding', 'terminal', 'git'], inUse: false },
    ],
  },
  {
    title: 'Infrastructure',
    icon: '\u{1F3D7}',
    description: 'Container, Virtualisierung, Reverse Proxies und Management-Tools für den AI-Stack.',
    tools: [
      { name: 'Docker', description: 'Container-Runtime. Basis für jeden Self-Hosted AI-Stack.', url: 'https://docker.com', github: 'https://github.com/moby/moby', stars: '70k+', license: 'Apache 2.0', selfHosted: true, tags: ['container', 'runtime', 'basis'], inUse: true },
      { name: 'Proxmox VE', description: 'Open-Source Virtualisierungsplattform. VMs, LXC, Clustering, GPU-Passthrough.', url: 'https://proxmox.com', github: 'https://git.proxmox.com', stars: '—', license: 'AGPL-3.0', selfHosted: true, tags: ['virtualization', 'hypervisor', 'cluster'], inUse: true },
      { name: 'Caddy', description: 'Moderner Web-Server mit automatischem HTTPS. Zero-Config TLS.', url: 'https://caddyserver.com', github: 'https://github.com/caddyserver/caddy', stars: '62k+', license: 'Apache 2.0', selfHosted: true, tags: ['webserver', 'https', 'reverse-proxy'], inUse: false },
      { name: 'Traefik', description: 'Cloud-nativer Reverse Proxy. Auto-Discovery, Let\'s Encrypt, Docker-Integration.', url: 'https://traefik.io', github: 'https://github.com/traefik/traefik', stars: '53k+', license: 'MIT', selfHosted: true, tags: ['reverse-proxy', 'docker', 'auto-discovery'], inUse: true },
      { name: 'Portainer', description: 'Container Management UI. Docker und Kubernetes per Web-Interface verwalten.', url: 'https://portainer.io', github: 'https://github.com/portainer/portainer', stars: '32k+', license: 'Zlib', selfHosted: true, tags: ['container', 'management', 'ui'], inUse: false },
      { name: 'Coolify', description: 'Self-Hostable Heroku/Netlify-Alternative. One-Click Deployments.', url: 'https://coolify.io', github: 'https://github.com/coollabsio/coolify', stars: '38k+', license: 'Apache 2.0', selfHosted: true, tags: ['paas', 'deployment', 'one-click'], inUse: false },
    ],
  },
]

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-colors group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
            {tool.inUse && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                Im Einsatz
              </span>
            )}
            {tool.selfHosted && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                Self-Hosted
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-1.5">{tool.description}</p>
        </div>
        <div className="text-right shrink-0 space-y-1">
          {tool.stars !== '—' && (
            <div className="text-xs text-yellow-500">{tool.stars} \u2B50</div>
          )}
          <div className="text-xs text-slate-500">{tool.license}</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-400 border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Website
          </a>
          <a
            href={tool.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AIToolsDatenbankPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showInUseOnly, setShowInUseOnly] = useState(false)
  const [showSelfHostedOnly, setShowSelfHostedOnly] = useState(false)

  const totalTools = toolCategories.reduce((sum, cat) => sum + cat.tools.length, 0)
  const inUseCount = toolCategories.reduce(
    (sum, cat) => sum + cat.tools.filter((t) => t.inUse).length,
    0
  )

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    return toolCategories
      .filter((cat) => !activeCategory || cat.title === activeCategory)
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter((tool) => {
          if (showInUseOnly && !tool.inUse) return false
          if (showSelfHostedOnly && !tool.selfHosted) return false
          if (!query) return true
          return (
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(query))
          )
        }),
      }))
      .filter((cat) => cat.tools.length > 0)
  }, [searchQuery, activeCategory, showInUseOnly, showSelfHostedOnly])

  const visibleTools = filteredCategories.reduce((sum, cat) => sum + cat.tools.length, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          AI Tools Datenbank
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Kuratierte Sammlung von {totalTools} Tools für lokale AI-Infrastruktur.
          Kategorisiert, durchsuchbar, mit echten Bewertungen.{' '}
          <span className="text-green-400">{inUseCount} Tools</span> setzen wir selbst produktiv ein.
        </p>
      </div>

      <Callout type="summary" title="Überblick">
        {totalTools} kuratierte AI-Tools in {toolCategories.length} Kategorien — von LLM Runtimes über Agent Frameworks
        bis Monitoring. Jedes Tool mit GitHub-Link, Lizenz, Star-Count und Self-Hosted-Status.
        Filterbar nach Kategorie, Suchbegriff und Einsatzstatus.
      </Callout>

      {/* Search & Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tool suchen — Name, Beschreibung oder Tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              \u2715
            </button>
          )}
        </div>

        {/* Filter Toggles */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowInUseOnly(!showInUseOnly)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              showInUseOnly
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
            }`}
          >
            Im Einsatz ({inUseCount})
          </button>
          <button
            onClick={() => setShowSelfHostedOnly(!showSelfHostedOnly)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              showSelfHostedOnly
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
            }`}
          >
            Self-Hosted
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              !activeCategory
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
            }`}
          >
            Alle ({totalTools})
          </button>
          {toolCategories.map((cat) => (
            <button
              key={cat.title}
              onClick={() =>
                setActiveCategory(activeCategory === cat.title ? null : cat.title)
              }
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                activeCategory === cat.title
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
              }`}
            >
              {cat.icon} {cat.title} ({cat.tools.length})
            </button>
          ))}
        </div>

        {/* Results count */}
        {(searchQuery || showInUseOnly || showSelfHostedOnly || activeCategory) && (
          <p className="text-sm text-slate-500">
            {visibleTools} von {totalTools} Tools angezeigt
          </p>
        )}
      </div>

      {/* Tool Grid */}
      {filteredCategories.map((cat) => (
        <section key={cat.title} className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
            <span className="text-2xl">{cat.icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-white">{cat.title}</h2>
              <p className="text-slate-500 text-sm">{cat.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {cat.tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </section>
      ))}

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="text-lg">Keine Tools gefunden.</p>
          <p className="text-sm mt-1">Versuche einen anderen Suchbegriff oder entferne Filter.</p>
        </div>
      )}

      {/* Footer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-sm text-slate-400">
        <p>
          {totalTools} Tools in {toolCategories.length} Kategorien.
          Star-Counts sind ungefähre Werte (Stand: März 2026).
          Tools mit dem Badge &quot;Im Einsatz&quot; werden von uns produktiv in unserer
          AI-Infrastruktur genutzt. Alle Angaben ohne Gewähr.
        </p>
      </div>

      {/* Quellen */}
      <section className="mt-16 pt-8 border-t border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
        <ul className="space-y-2 text-sm text-white/50">
          <li><a href="https://github.com/ollama/ollama" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama</a> — Lokale LLM Runtime (MIT)</li>
          <li><a href="https://github.com/open-webui/open-webui" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Open WebUI</a> — Feature-reiche Chat-Oberfläche für LLMs</li>
          <li><a href="https://github.com/n8n-io/n8n" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n</a> — Fair-Code Workflow Automation</li>
          <li><a href="https://github.com/langchain-ai/langchain" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LangChain</a> — Framework für LLM-Anwendungen</li>
          <li><a href="https://github.com/grafana/grafana" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Grafana</a> — Dashboards und Observability</li>
          <li><a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">MCP Servers</a> — Model Context Protocol Server (Anthropic)</li>
        </ul>
      </section>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/tools/vergleich-alternativen" className="text-blue-400 hover:text-blue-300">Vergleich Alternativen</a>
          {' · '}
          <a href="/tools/ollama-tutorial" className="text-blue-400 hover:text-blue-300">Ollama Tutorial</a>
          {' · '}
          <a href="/grundlagen/was-ist-ein-llm" className="text-blue-400 hover:text-blue-300">Was ist ein LLM?</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
    </div>
  )
}
