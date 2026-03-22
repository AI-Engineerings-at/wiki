'use client'

import { useState, useMemo } from 'react'

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
    description: 'Local LLM execution and inference engines for self-hosted AI.',
    tools: [
      { name: 'Ollama', description: 'Local LLM execution. One command, model running.', url: 'https://ollama.com', github: 'https://github.com/ollama/ollama', stars: '120k+', license: 'MIT', selfHosted: true, tags: ['llm', 'local', 'inference'], inUse: true },
      { name: 'vLLM', description: 'High-throughput inference engine with PagedAttention and continuous batching.', url: 'https://vllm.ai', github: 'https://github.com/vllm-project/vllm', stars: '50k+', license: 'Apache 2.0', selfHosted: true, tags: ['llm', 'inference', 'gpu'], inUse: false },
      { name: 'llama.cpp', description: 'LLM inference in C/C++. Runs on CPU and GPU, extremely optimized.', url: 'https://github.com/ggerganov/llama.cpp', github: 'https://github.com/ggerganov/llama.cpp', stars: '75k+', license: 'MIT', selfHosted: true, tags: ['llm', 'cpu', 'gguf'], inUse: false },
      { name: 'LM Studio', description: 'Desktop app for local LLMs. Download models and use them instantly.', url: 'https://lmstudio.ai', github: 'https://github.com/lmstudio-ai', stars: '\u2014', license: 'Proprietary', selfHosted: true, tags: ['llm', 'desktop', 'gui'], inUse: false },
      { name: 'GPT4All', description: 'Open-source LLM chatbot for desktop. Private, offline, no API needed.', url: 'https://gpt4all.io', github: 'https://github.com/nomic-ai/gpt4all', stars: '72k+', license: 'MIT', selfHosted: true, tags: ['llm', 'desktop', 'offline'], inUse: false },
      { name: 'LocalAI', description: 'Self-hosted OpenAI alternative. Drop-in replacement for the OpenAI API.', url: 'https://localai.io', github: 'https://github.com/mudler/LocalAI', stars: '30k+', license: 'MIT', selfHosted: true, tags: ['llm', 'openai-compatible', 'api'], inUse: false },
      { name: 'Jan', description: 'Open-source ChatGPT alternative. 100% offline, runs on any computer.', url: 'https://jan.ai', github: 'https://github.com/janhq/jan', stars: '25k+', license: 'AGPL-3.0', selfHosted: true, tags: ['llm', 'desktop', 'offline'], inUse: false },
    ],
  },
  {
    title: 'Chat Interfaces',
    icon: '\u{1F4AC}',
    description: 'Web-based chat interfaces for LLMs with multi-user, RAG and plugin support.',
    tools: [
      { name: 'Open WebUI', description: 'Feature-rich WebUI for Ollama and OpenAI-compatible APIs. RAG, multi-user, plugins.', url: 'https://openwebui.com', github: 'https://github.com/open-webui/open-webui', stars: '60k+', license: 'MIT', selfHosted: true, tags: ['chat', 'webui', 'rag'], inUse: true },
      { name: 'LibreChat', description: 'ChatGPT clone with MCP support, multi-provider and multi-user auth.', url: 'https://librechat.ai', github: 'https://github.com/danny-avila/LibreChat', stars: '22k+', license: 'MIT', selfHosted: true, tags: ['chat', 'mcp', 'multi-provider'], inUse: false },
      { name: 'Lobe Chat', description: 'Modern chat framework with plugin system and vision support.', url: 'https://lobehub.com', github: 'https://github.com/lobehub/lobe-chat', stars: '55k+', license: 'MIT', selfHosted: true, tags: ['chat', 'plugins', 'vision'], inUse: false },
      { name: 'Chatbot UI', description: 'Open-source ChatGPT interface. Clean, fast, extensible.', url: 'https://chatbotui.com', github: 'https://github.com/mckaywrigley/chatbot-ui', stars: '29k+', license: 'MIT', selfHosted: true, tags: ['chat', 'minimal', 'nextjs'], inUse: false },
      { name: 'Big-AGI', description: 'AI suite for professionals: multi-model chat, personas, branching, code interpreter.', url: 'https://big-agi.com', github: 'https://github.com/enricoros/big-AGI', stars: '6k+', license: 'MIT', selfHosted: true, tags: ['chat', 'multi-model', 'power-user'], inUse: false },
    ],
  },
  {
    title: 'Workflow Automation',
    icon: '\u{26A1}',
    description: 'Workflow engines and automation platforms with native AI integration.',
    tools: [
      { name: 'n8n', description: 'Fair-code workflow automation with 400+ nodes and native AI integration.', url: 'https://n8n.io', github: 'https://github.com/n8n-io/n8n', stars: '55k+', license: 'Fair-Code', selfHosted: true, tags: ['automation', 'workflows', 'ai-nodes'], inUse: true },
      { name: 'Dify', description: 'LLM app development platform. Visual workflow builder, RAG, agent orchestration.', url: 'https://dify.ai', github: 'https://github.com/langgenius/dify', stars: '70k+', license: 'Apache 2.0', selfHosted: true, tags: ['automation', 'llm-apps', 'rag'], inUse: false },
      { name: 'Flowise', description: 'Drag & drop LLM flow builder. LangChain-based, no-code.', url: 'https://flowiseai.com', github: 'https://github.com/FlowiseAI/Flowise', stars: '35k+', license: 'Apache 2.0', selfHosted: true, tags: ['automation', 'no-code', 'langchain'], inUse: false },
      { name: 'Activepieces', description: 'Open-source Zapier alternative with AI pieces and self-hosting.', url: 'https://activepieces.com', github: 'https://github.com/activepieces/activepieces', stars: '12k+', license: 'MIT', selfHosted: true, tags: ['automation', 'no-code', 'zapier-alternative'], inUse: false },
      { name: 'Kestra', description: 'Event-driven orchestration platform. Workflows in code or UI.', url: 'https://kestra.io', github: 'https://github.com/kestra-io/kestra', stars: '15k+', license: 'Apache 2.0', selfHosted: true, tags: ['orchestration', 'event-driven', 'data'], inUse: false },
      { name: 'Langflow', description: 'Visual framework for multi-agent and RAG applications.', url: 'https://langflow.org', github: 'https://github.com/langflow-ai/langflow', stars: '45k+', license: 'MIT', selfHosted: true, tags: ['automation', 'visual', 'rag'], inUse: false },
    ],
  },
  {
    title: 'RAG & Search',
    icon: '\u{1F50D}',
    description: 'Vector databases, search engines and RAG frameworks for AI applications.',
    tools: [
      { name: 'ChromaDB', description: 'AI-native open-source embedding database. Easy to start, scales with you.', url: 'https://trychroma.com', github: 'https://github.com/chroma-core/chroma', stars: '18k+', license: 'Apache 2.0', selfHosted: true, tags: ['vector-db', 'embeddings', 'python'], inUse: false },
      { name: 'Weaviate', description: 'Cloud-native vector database with hybrid search and multi-tenancy.', url: 'https://weaviate.io', github: 'https://github.com/weaviate/weaviate', stars: '12k+', license: 'BSD-3', selfHosted: true, tags: ['vector-db', 'hybrid-search', 'graphql'], inUse: false },
      { name: 'Meilisearch', description: 'Lightning-fast search engine with typo tolerance. Instant search in milliseconds.', url: 'https://meilisearch.com', github: 'https://github.com/meilisearch/meilisearch', stars: '50k+', license: 'MIT', selfHosted: true, tags: ['search', 'full-text', 'instant'], inUse: false },
      { name: 'Qdrant', description: 'High-performance vector search engine in Rust. Filtering, payload, gRPC.', url: 'https://qdrant.tech', github: 'https://github.com/qdrant/qdrant', stars: '22k+', license: 'Apache 2.0', selfHosted: true, tags: ['vector-db', 'rust', 'performance'], inUse: false },
      { name: 'LanceDB', description: 'Serverless vector database for AI. No server needed, embedded.', url: 'https://lancedb.com', github: 'https://github.com/lancedb/lancedb', stars: '5k+', license: 'Apache 2.0', selfHosted: true, tags: ['vector-db', 'serverless', 'embedded'], inUse: false },
      { name: 'open-notebook', description: 'Open-source NotebookLM alternative. Knowledge management with AI.', url: 'https://github.com/lfnovo/open-notebook', github: 'https://github.com/lfnovo/open-notebook', stars: '1k+', license: 'MIT', selfHosted: true, tags: ['knowledge', 'notebook', 'rag'], inUse: true },
    ],
  },
  {
    title: 'Agent Frameworks',
    icon: '\u{1F916}',
    description: 'Frameworks for autonomous AI agents, multi-agent systems and orchestration.',
    tools: [
      { name: 'LangChain', description: 'Framework for LLM applications. Chains, agents, tools, memory.', url: 'https://langchain.com', github: 'https://github.com/langchain-ai/langchain', stars: '100k+', license: 'MIT', selfHosted: true, tags: ['agents', 'chains', 'tools'], inUse: false },
      { name: 'LlamaIndex', description: 'Data framework for LLM applications. Indexing, retrieval, query engines.', url: 'https://llamaindex.ai', github: 'https://github.com/run-llama/llama_index', stars: '38k+', license: 'MIT', selfHosted: true, tags: ['agents', 'data', 'indexing'], inUse: false },
      { name: 'AutoGen', description: 'Multi-agent conversation framework by Microsoft. Agents discuss and solve tasks.', url: 'https://microsoft.github.io/autogen/', github: 'https://github.com/microsoft/autogen', stars: '40k+', license: 'CC-BY-4.0', selfHosted: true, tags: ['agents', 'multi-agent', 'microsoft'], inUse: false },
      { name: 'CrewAI', description: 'Framework for role-based autonomous AI agents. Teams of specialized agents.', url: 'https://crewai.com', github: 'https://github.com/crewAIInc/crewAI', stars: '25k+', license: 'MIT', selfHosted: true, tags: ['agents', 'roles', 'orchestration'], inUse: false },
      { name: 'Semantic Kernel', description: 'Microsoft SDK for AI integration in apps. Planner, plugins, memory.', url: 'https://learn.microsoft.com/semantic-kernel/', github: 'https://github.com/microsoft/semantic-kernel', stars: '23k+', license: 'MIT', selfHosted: true, tags: ['agents', 'sdk', 'microsoft'], inUse: false },
      { name: 'Haystack', description: 'End-to-end NLP framework. Pipelines for search, QA and RAG.', url: 'https://haystack.deepset.ai', github: 'https://github.com/deepset-ai/haystack', stars: '18k+', license: 'Apache 2.0', selfHosted: true, tags: ['agents', 'pipelines', 'nlp'], inUse: false },
    ],
  },
  {
    title: 'MCP Servers',
    icon: '\u{1F527}',
    description: 'Model Context Protocol servers for tool integration and AI connectivity.',
    tools: [
      { name: 'MCP Servers (Anthropic)', description: 'Official MCP server collection by Anthropic. Filesystem, Git, Postgres, Slack, and more.', url: 'https://modelcontextprotocol.io', github: 'https://github.com/modelcontextprotocol/servers', stars: '18k+', license: 'MIT', selfHosted: true, tags: ['mcp', 'tools', 'official'], inUse: true },
      { name: 'Awesome MCP Servers', description: 'Community-curated list of MCP servers for every use case.', url: 'https://github.com/punkpeye/awesome-mcp-servers', github: 'https://github.com/punkpeye/awesome-mcp-servers', stars: '40k+', license: 'CC0', selfHosted: false, tags: ['mcp', 'awesome-list', 'community'], inUse: false },
      { name: 'Playwright MCP', description: 'Browser automation via MCP. Control websites, screenshots, testing.', url: 'https://github.com/microsoft/playwright-mcp', github: 'https://github.com/microsoft/playwright-mcp', stars: '8k+', license: 'Apache 2.0', selfHosted: true, tags: ['mcp', 'browser', 'testing'], inUse: true },
      { name: 'Notion MCP', description: 'MCP server for Notion. Read, create, and search pages.', url: 'https://github.com/makenotion/notion-mcp-server', github: 'https://github.com/makenotion/notion-mcp-server', stars: '2k+', license: 'MIT', selfHosted: true, tags: ['mcp', 'notion', 'productivity'], inUse: true },
      { name: 'Docker MCP', description: 'MCP server for Docker. Manage containers via AI agent.', url: 'https://github.com/docker/docker-mcp', github: 'https://github.com/docker/docker-mcp', stars: '1k+', license: 'Apache 2.0', selfHosted: true, tags: ['mcp', 'docker', 'infrastructure'], inUse: false },
    ],
  },
  {
    title: 'Monitoring',
    icon: '\u{1F4CA}',
    description: 'Observability, metrics, alerting and uptime monitoring for AI infrastructure.',
    tools: [
      { name: 'Grafana', description: 'Dashboards and observability. Visualization for Prometheus, Loki and more.', url: 'https://grafana.com', github: 'https://github.com/grafana/grafana', stars: '66k+', license: 'AGPL-3.0', selfHosted: true, tags: ['dashboards', 'visualization', 'alerting'], inUse: true },
      { name: 'Prometheus', description: 'Monitoring and alerting toolkit. Time-series database, PromQL.', url: 'https://prometheus.io', github: 'https://github.com/prometheus/prometheus', stars: '57k+', license: 'Apache 2.0', selfHosted: true, tags: ['metrics', 'time-series', 'alerting'], inUse: true },
      { name: 'Uptime Kuma', description: 'Self-hosted monitoring. Status pages, notifications, clean UI.', url: 'https://uptime.kuma.pet', github: 'https://github.com/louislam/uptime-kuma', stars: '65k+', license: 'MIT', selfHosted: true, tags: ['uptime', 'status-page', 'notifications'], inUse: true },
      { name: 'Netdata', description: 'Real-time infrastructure monitoring. Auto-discovery, zero config.', url: 'https://netdata.cloud', github: 'https://github.com/netdata/netdata', stars: '73k+', license: 'GPL-3.0', selfHosted: true, tags: ['real-time', 'auto-discovery', 'infrastructure'], inUse: false },
      { name: 'Langfuse', description: 'LLM engineering platform. Traces, evals, prompt management, cost tracking.', url: 'https://langfuse.com', github: 'https://github.com/langfuse/langfuse', stars: '8k+', license: 'MIT', selfHosted: true, tags: ['llm-monitoring', 'tracing', 'evals'], inUse: false },
    ],
  },
  {
    title: 'Security & Compliance',
    icon: '\u{1F6E1}',
    description: 'Secrets management, container security, intrusion prevention and vulnerability scanning.',
    tools: [
      { name: 'Vault', description: 'Secrets management by HashiCorp. API keys, certificates, encryption.', url: 'https://vaultproject.io', github: 'https://github.com/hashicorp/vault', stars: '32k+', license: 'BUSL-1.1', selfHosted: true, tags: ['secrets', 'encryption', 'certificates'], inUse: false },
      { name: 'Trivy', description: 'All-in-one security scanner. Containers, filesystem, git repos, Kubernetes.', url: 'https://trivy.dev', github: 'https://github.com/aquasecurity/trivy', stars: '25k+', license: 'Apache 2.0', selfHosted: true, tags: ['scanner', 'container', 'vulnerabilities'], inUse: false },
      { name: 'CrowdSec', description: 'Open-source intrusion prevention. Community-based IP blocklists.', url: 'https://crowdsec.net', github: 'https://github.com/crowdsecurity/crowdsec', stars: '9k+', license: 'MIT', selfHosted: true, tags: ['ids', 'intrusion-prevention', 'community'], inUse: false },
      { name: 'Fail2ban', description: 'Brute-force protection. Monitors logs and bans suspicious IPs.', url: 'https://fail2ban.org', github: 'https://github.com/fail2ban/fail2ban', stars: '12k+', license: 'GPL-2.0', selfHosted: true, tags: ['brute-force', 'logs', 'banning'], inUse: true },
      { name: 'promptfoo', description: 'AI red teaming and prompt testing. Validate LLM security.', url: 'https://promptfoo.dev', github: 'https://github.com/promptfoo/promptfoo', stars: '5k+', license: 'MIT', selfHosted: true, tags: ['ai-security', 'red-team', 'testing'], inUse: false },
    ],
  },
  {
    title: 'Image Generation',
    icon: '\u{1F3A8}',
    description: 'Local image generation with Stable Diffusion, Flux and other models.',
    tools: [
      { name: 'ComfyUI', description: 'Node-based UI for Stable Diffusion. Visual workflow builder for image generation.', url: 'https://comfyui.com', github: 'https://github.com/comfyanonymous/ComfyUI', stars: '70k+', license: 'GPL-3.0', selfHosted: true, tags: ['image-gen', 'nodes', 'workflows'], inUse: false },
      { name: 'Stable Diffusion WebUI', description: 'AUTOMATIC1111 WebUI. The classic for local image generation.', url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', github: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', stars: '145k+', license: 'AGPL-3.0', selfHosted: true, tags: ['image-gen', 'webui', 'classic'], inUse: false },
      { name: 'Fooocus', description: 'Minimal UI for image generation. Midjourney quality, local, no config needed.', url: 'https://github.com/lllyasviel/Fooocus', github: 'https://github.com/lllyasviel/Fooocus', stars: '42k+', license: 'GPL-3.0', selfHosted: true, tags: ['image-gen', 'simple', 'quality'], inUse: false },
      { name: 'InvokeAI', description: 'Professional image generation with canvas, ControlNet and workflows.', url: 'https://invoke.ai', github: 'https://github.com/invoke-ai/InvokeAI', stars: '24k+', license: 'Apache 2.0', selfHosted: true, tags: ['image-gen', 'canvas', 'professional'], inUse: false },
      { name: 'Stable Diffusion WebUI Forge', description: 'Optimized fork of A1111. Faster, less VRAM, more features.', url: 'https://github.com/lllyasviel/stable-diffusion-webui-forge', github: 'https://github.com/lllyasviel/stable-diffusion-webui-forge', stars: '10k+', license: 'AGPL-3.0', selfHosted: true, tags: ['image-gen', 'optimized', 'fork'], inUse: false },
    ],
  },
  {
    title: 'Speech & Audio',
    icon: '\u{1F399}',
    description: 'Speech-to-text, text-to-speech and audio processing with local models.',
    tools: [
      { name: 'Whisper', description: 'OpenAI speech-to-text model. Robust, multilingual, locally deployable.', url: 'https://openai.com/research/whisper', github: 'https://github.com/openai/whisper', stars: '75k+', license: 'MIT', selfHosted: true, tags: ['stt', 'multilingual', 'openai'], inUse: false },
      { name: 'Whisper.cpp', description: 'C/C++ port of Whisper. Extremely fast, runs on CPU.', url: 'https://github.com/ggerganov/whisper.cpp', github: 'https://github.com/ggerganov/whisper.cpp', stars: '38k+', license: 'MIT', selfHosted: true, tags: ['stt', 'cpp', 'fast'], inUse: false },
      { name: 'Piper TTS', description: 'Fast local text-to-speech engine. Many voices, many languages.', url: 'https://github.com/rhasspy/piper', github: 'https://github.com/rhasspy/piper', stars: '8k+', license: 'MIT', selfHosted: true, tags: ['tts', 'local', 'multilingual'], inUse: false },
      { name: 'Coqui TTS', description: 'Deep learning text-to-speech. Voice cloning, multi-speaker, multi-language.', url: 'https://coqui.ai', github: 'https://github.com/coqui-ai/TTS', stars: '37k+', license: 'MPL-2.0', selfHosted: true, tags: ['tts', 'voice-cloning', 'deep-learning'], inUse: false },
      { name: 'Faster Whisper', description: 'CTranslate2-based Whisper. 4x faster, same quality.', url: 'https://github.com/SYSTRAN/faster-whisper', github: 'https://github.com/SYSTRAN/faster-whisper', stars: '14k+', license: 'MIT', selfHosted: true, tags: ['stt', 'optimized', 'fast'], inUse: false },
    ],
  },
  {
    title: 'Coding Assistants',
    icon: '\u{1F4DD}',
    description: 'AI-powered coding tools, code completion and terminal integration.',
    tools: [
      { name: 'Claude Code', description: 'Anthropic\'s agentic coding tool. Terminal-based, understands entire codebases.', url: 'https://claude.ai/code', github: 'https://github.com/anthropics', stars: '\u2014', license: 'Proprietary', selfHosted: false, tags: ['coding', 'terminal', 'agentic'], inUse: true },
      { name: 'GitHub Copilot', description: 'AI pair programmer by GitHub/OpenAI. Code suggestions directly in editor.', url: 'https://github.com/features/copilot', github: 'https://github.com/features/copilot', stars: '\u2014', license: 'Proprietary', selfHosted: false, tags: ['coding', 'editor', 'suggestions'], inUse: false },
      { name: 'Cursor', description: 'AI-first code editor. VS Code fork with integrated AI chat and editing.', url: 'https://cursor.com', github: 'https://github.com/getcursor/cursor', stars: '\u2014', license: 'Proprietary', selfHosted: false, tags: ['coding', 'editor', 'ai-first'], inUse: false },
      { name: 'Cody', description: 'Sourcegraph\'s AI coding assistant. Understands your entire codebase.', url: 'https://sourcegraph.com/cody', github: 'https://github.com/sourcegraph/cody', stars: '3k+', license: 'Apache 2.0', selfHosted: false, tags: ['coding', 'codebase', 'search'], inUse: false },
      { name: 'Continue', description: 'Open-source AI code assistant. VS Code and JetBrains, local models supported.', url: 'https://continue.dev', github: 'https://github.com/continuedev/continue', stars: '22k+', license: 'Apache 2.0', selfHosted: true, tags: ['coding', 'open-source', 'local'], inUse: false },
      { name: 'Aider', description: 'AI pair programming in the terminal. Git-aware, edits files directly.', url: 'https://aider.chat', github: 'https://github.com/paul-gauthier/aider', stars: '25k+', license: 'Apache 2.0', selfHosted: true, tags: ['coding', 'terminal', 'git'], inUse: false },
    ],
  },
  {
    title: 'Infrastructure',
    icon: '\u{1F3D7}',
    description: 'Containers, virtualization, reverse proxies and management tools for the AI stack.',
    tools: [
      { name: 'Docker', description: 'Container runtime. Foundation of every self-hosted AI stack.', url: 'https://docker.com', github: 'https://github.com/moby/moby', stars: '70k+', license: 'Apache 2.0', selfHosted: true, tags: ['container', 'runtime', 'foundation'], inUse: true },
      { name: 'Proxmox VE', description: 'Open-source virtualization platform. VMs, LXC, clustering, GPU passthrough.', url: 'https://proxmox.com', github: 'https://git.proxmox.com', stars: '\u2014', license: 'AGPL-3.0', selfHosted: true, tags: ['virtualization', 'hypervisor', 'cluster'], inUse: true },
      { name: 'Caddy', description: 'Modern web server with automatic HTTPS. Zero-config TLS.', url: 'https://caddyserver.com', github: 'https://github.com/caddyserver/caddy', stars: '62k+', license: 'Apache 2.0', selfHosted: true, tags: ['webserver', 'https', 'reverse-proxy'], inUse: false },
      { name: 'Traefik', description: 'Cloud-native reverse proxy. Auto-discovery, Let\'s Encrypt, Docker integration.', url: 'https://traefik.io', github: 'https://github.com/traefik/traefik', stars: '53k+', license: 'MIT', selfHosted: true, tags: ['reverse-proxy', 'docker', 'auto-discovery'], inUse: true },
      { name: 'Portainer', description: 'Container management UI. Manage Docker and Kubernetes via web interface.', url: 'https://portainer.io', github: 'https://github.com/portainer/portainer', stars: '32k+', license: 'Zlib', selfHosted: true, tags: ['container', 'management', 'ui'], inUse: false },
      { name: 'Coolify', description: 'Self-hostable Heroku/Netlify alternative. One-click deployments.', url: 'https://coolify.io', github: 'https://github.com/coollabsio/coolify', stars: '38k+', license: 'Apache 2.0', selfHosted: true, tags: ['paas', 'deployment', 'one-click'], inUse: false },
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
                In Use
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
          {tool.stars !== '\u2014' && (
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

export default function AIToolsDatabasePage() {
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
          AI Tools Database
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Curated collection of {totalTools} tools for local AI infrastructure.
          Categorized, searchable, with real ratings.{' '}
          <span className="text-green-400">{inUseCount} tools</span> are actively used in our production stack.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools \u2014 name, description or tag..."
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
            In Use ({inUseCount})
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
            All ({totalTools})
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
            Showing {visibleTools} of {totalTools} tools
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
          <p className="text-lg">No tools found.</p>
          <p className="text-sm mt-1">Try a different search term or remove filters.</p>
        </div>
      )}

      {/* Footer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-sm text-slate-400">
        <p>
          {totalTools} tools in {toolCategories.length} categories.
          Star counts are approximate values (as of March 2026).
          Tools with the &quot;In Use&quot; badge are actively used in our production
          AI infrastructure. All information without guarantee.
        </p>
      </div>
    </div>
  )
}
