import Callout from "../../../components/Callout"

export const metadata = {
  title: 'Open Source Tools & Projekte | AI Engineering Wiki',
  description:
    'Kuratierte Liste empfehlenswerter Open-Source-Tools für lokale AI: LLM Runtimes, Agent Frameworks, RAG, Monitoring, Automation und Security.',
}

type Tool = {
  name: string
  url: string
  description: string
  tags: string[]
}

type Category = {
  title: string
  description: string
  tools: Tool[]
}

const categories: Category[] = [
  {
    title: 'LLM Runtimes & Interfaces',
    description:
      'Lokale LLM-Ausführung, Inference-Engines und Chat-Interfaces für Self-Hosted AI.',
    tools: [
      {
        name: 'Ollama',
        url: 'https://github.com/ollama/ollama',
        description:
          'Lokale LLM Runtime — get up and running with large language models.',
        tags: ['LLM', 'Lokal', 'GPU', 'Im Einsatz'],
      },
      {
        name: 'Ollama Python',
        url: 'https://github.com/ollama/ollama-python',
        description: 'Python-Library für die Ollama API.',
        tags: ['Python', 'SDK', 'Im Einsatz'],
      },
      {
        name: 'Open WebUI',
        url: 'https://github.com/open-webui/open-webui',
        description:
          'User-friendly WebUI für LLMs — unterstützt Ollama und OpenAI-kompatible APIs.',
        tags: ['WebUI', 'Chat', 'Self-Hosted', 'Im Einsatz'],
      },
      {
        name: 'LocalAI',
        url: 'https://github.com/mudler/LocalAI',
        description:
          'Open Source Alternative zu OpenAI — self-hosted, läuft auch ohne GPU.',
        tags: ['LLM', 'OpenAI-kompatibel', 'CPU'],
      },
      {
        name: 'exo',
        url: 'https://github.com/exo-explore/exo',
        description:
          'Run AI models on your own hardware — Cluster über mehrere Geräte.',
        tags: ['LLM', 'Cluster', 'Multi-Device'],
      },
      {
        name: 'BitNet',
        url: 'https://github.com/microsoft/BitNet',
        description:
          'Official inference framework for 1-bit LLMs von Microsoft.',
        tags: ['LLM', 'Optimierung', '1-Bit'],
      },
      {
        name: 'vLLM',
        url: 'https://github.com/vllm-project/vllm-omni',
        description:
          'High-throughput and memory-efficient inference and serving engine for LLMs.',
        tags: ['LLM', 'Inference', 'Multi-Modal'],
      },
      {
        name: 'LibreChat',
        url: 'https://github.com/danny-avila/LibreChat',
        description:
          'Enhanced ChatGPT Clone mit MCP-Support, Multi-Provider und Multi-User Auth.',
        tags: ['Chat', 'WebUI', 'MCP'],
      },
    ],
  },
  {
    title: 'Agent Frameworks',
    description:
      'Frameworks und Plattformen für autonome AI-Agenten, Multi-Agent Systeme und Orchestrierung.',
    tools: [
      {
        name: 'CrewAI',
        url: 'https://github.com/crewAIInc/crewAI',
        description:
          'Framework for orchestrating role-playing, autonomous AI agents.',
        tags: ['Agents', 'Orchestrierung', 'Multi-Agent'],
      },
      {
        name: 'CrewAI Examples',
        url: 'https://github.com/crewAIInc/crewAI-examples',
        description: 'Sammlung von CrewAI-Beispiel-Workflows und Use Cases.',
        tags: ['Agents', 'Beispiele'],
      },
      {
        name: 'AutoGen',
        url: 'https://github.com/microsoft/autogen',
        description:
          'An open-source framework for building AI agent systems von Microsoft.',
        tags: ['Agents', 'Microsoft', 'Multi-Agent'],
      },
      {
        name: 'DeepAgents',
        url: 'https://github.com/langchain-ai/deepagents',
        description:
          'LangChain/LangGraph Agent mit Planning und Subagents.',
        tags: ['Agents', 'LangChain', 'Planning'],
      },
      {
        name: 'mem0',
        url: 'https://github.com/mem0ai/mem0',
        description:
          'The Memory layer for AI apps — persistentes Gedächtnis für AI Agents.',
        tags: ['Memory', 'Agents', 'Persistenz'],
      },
      {
        name: 'Hindsight',
        url: 'https://github.com/vectorize-io/hindsight',
        description: 'Agent memory that learns — lernfähiges Agent-Gedächtnis.',
        tags: ['Memory', 'Agents', 'Learning'],
      },
      {
        name: 'Eliza',
        url: 'https://github.com/elizaOS/eliza',
        description: 'Autonomous agents for everyone — Agent-Framework für alle.',
        tags: ['Agents', 'Autonomie'],
      },
      {
        name: 'Agent Squad',
        url: 'https://github.com/awslabs/agent-squad',
        description:
          'Multi-Agent Management Framework von AWS Labs.',
        tags: ['Agents', 'AWS', 'Orchestrierung'],
      },
      {
        name: 'Hermes Agent',
        url: 'https://github.com/NousResearch/hermes-agent',
        description:
          'An agent that grows with you — von NousResearch.',
        tags: ['Agents', 'NousResearch'],
      },
      {
        name: 'LobeHub',
        url: 'https://github.com/lobehub/lobehub',
        description: 'Multi-Agent Collaboration Platform.',
        tags: ['Agents', 'Plattform', 'Kollaboration'],
      },
      {
        name: 'Maestro',
        url: 'https://github.com/RunMaestro/Maestro',
        description: 'Agent Orchestration Command Center.',
        tags: ['Agents', 'Orchestrierung'],
      },
      {
        name: 'ChatDev',
        url: 'https://github.com/OpenBMB/ChatDev',
        description:
          'Communicative agents for software development — Multi-Agent Dev Collaboration.',
        tags: ['Agents', 'Entwicklung'],
      },
      {
        name: 'ruflo',
        url: 'https://github.com/ruvnet/ruflo',
        description: 'Multi-Agent Swarm Orchestration für Claude.',
        tags: ['Agents', 'Claude', 'Swarm'],
      },
      {
        name: 'OpenViking',
        url: 'https://github.com/volcengine/OpenViking',
        description:
          'Context Database for AI Agents — Memory, Resources und Skills.',
        tags: ['Memory', 'Agents', 'Context'],
      },
      {
        name: '12-Factor Agents',
        url: 'https://github.com/humanlayer/12-factor-agents',
        description:
          'Prinzipien für den Bau von produktionstauglicher LLM-Software.',
        tags: ['Best Practices', 'Architektur', 'Lernressource'],
      },
      {
        name: 'Awesome AI Agents',
        url: 'https://github.com/e2b-dev/awesome-ai-agents',
        description:
          'Kuratierte Liste autonomer AI Agents und Agent-Frameworks.',
        tags: ['Awesome-Liste', 'Referenz'],
      },
    ],
  },
  {
    title: 'Workflow Automation',
    description:
      'Workflow-Engines und Automatisierungs-Plattformen mit nativer AI-Integration.',
    tools: [
      {
        name: 'n8n',
        url: 'https://github.com/n8n-io/n8n',
        description:
          'Fair-code workflow automation platform with native AI capabilities.',
        tags: ['Automation', 'Workflows', 'AI', 'Im Einsatz'],
      },
      {
        name: 'n8n Workflows (Community)',
        url: 'https://github.com/Zie619/n8n-workflows',
        description: 'Riesige Sammlung von n8n Community-Workflows.',
        tags: ['n8n', 'Beispiele', 'Community'],
      },
      {
        name: 'n8n Self-hosted AI Starter Kit',
        url: 'https://github.com/n8n-io/self-hosted-ai-starter-kit',
        description:
          'Offizielles Starter Kit von n8n für Self-hosted AI mit Ollama, Qdrant und PostgreSQL.',
        tags: ['n8n', 'Starter Kit', 'Self-Hosted', 'Ollama'],
      },
      {
        name: 'Kestra',
        url: 'https://github.com/kestra-io/kestra',
        description:
          'Event-driven orchestration platform to build workflows in code or from UI.',
        tags: ['Orchestrierung', 'Event-Driven'],
      },
    ],
  },
  {
    title: 'RAG & Knowledge',
    description:
      'Vector-Datenbanken, RAG-Frameworks und Knowledge-Management für AI-Anwendungen.',
    tools: [
      {
        name: 'open-notebook',
        url: 'https://github.com/lfnovo/open-notebook',
        description:
          'Open Source NotebookLM Alternative — Knowledge-Management mit AI.',
        tags: ['Knowledge', 'Notebook', 'Im Einsatz'],
      },
      {
        name: 'Qdrant',
        url: 'https://github.com/qdrant/qdrant',
        description:
          'High-performance, massive-scale vector search engine written in Rust.',
        tags: ['Vector DB', 'Rust', 'Suche'],
      },
      {
        name: 'Quivr',
        url: 'https://github.com/QuivrHQ/quivr',
        description:
          'Opinionated RAG für generative AI Anwendungen.',
        tags: ['RAG', 'GenAI'],
      },
      {
        name: 'OpenRAG',
        url: 'https://github.com/langflow-ai/openrag',
        description:
          'RAG Platform basierend auf Langflow, Docling und OpenSearch.',
        tags: ['RAG', 'Langflow', 'OpenSearch'],
      },
      {
        name: 'PageIndex',
        url: 'https://github.com/VectifyAI/PageIndex',
        description:
          'Document indexing for vectorless RAG — RAG ohne Vector-Datenbank.',
        tags: ['RAG', 'Indexing', 'Vectorless'],
      },
      {
        name: 'LEANN',
        url: 'https://github.com/yichuan-w/LEANN',
        description:
          'RAG mit 97% Storage-Einsparung, 100% lokal und privat.',
        tags: ['RAG', 'Optimierung', 'Privacy'],
      },
      {
        name: 'OpenDataLoader PDF',
        url: 'https://github.com/opendataloader-project/opendataloader-pdf',
        description: 'PDF Parser für AI-ready Daten.',
        tags: ['PDF', 'Data Ingestion', 'Parser'],
      },
    ],
  },
  {
    title: 'Claude Code & OpenClaw Ecosystem',
    description:
      'Skills, Plugins, Hooks und Ressourcen rund um Claude Code und das OpenClaw-Ökosystem.',
    tools: [
      {
        name: 'Anthropic Skills',
        url: 'https://github.com/anthropics/skills',
        description: 'Offizielle Agent Skills Repository von Anthropic.',
        tags: ['Claude', 'Skills', 'Offiziell'],
      },
      {
        name: 'Claude Cookbooks',
        url: 'https://github.com/anthropics/claude-cookbooks',
        description:
          'Offizielle Claude Notebooks und Recipes von Anthropic.',
        tags: ['Claude', 'Tutorials', 'Offiziell'],
      },
      {
        name: 'Claude Plugins Official',
        url: 'https://github.com/anthropics/claude-plugins-official',
        description: 'Offizielle Claude Code Plugins.',
        tags: ['Claude', 'Plugins', 'Offiziell'],
      },
      {
        name: 'Knowledge Work Plugins',
        url: 'https://github.com/anthropics/knowledge-work-plugins',
        description: 'Knowledge Worker Plugins für Claude.',
        tags: ['Claude', 'Plugins', 'Knowledge'],
      },
      {
        name: 'Superpowers',
        url: 'https://github.com/obra/superpowers',
        description:
          'Agentic Skills Framework und Methodik für Claude Code.',
        tags: ['Claude', 'Skills', 'Methodik'],
      },
      {
        name: 'Claude Code Hooks Mastery',
        url: 'https://github.com/disler/claude-code-hooks-mastery',
        description: 'Umfassender Guide für Claude Code Hooks.',
        tags: ['Claude', 'Hooks', 'Lernressource'],
      },
      {
        name: 'Claude Code Hooks Multi-Agent Observability',
        url: 'https://github.com/disler/claude-code-hooks-multi-agent-observability',
        description:
          'Multi-Agent Monitoring und Observability via Claude Code Hooks.',
        tags: ['Claude', 'Hooks', 'Monitoring'],
      },
      {
        name: 'Awesome Claude Code Toolkit',
        url: 'https://github.com/rohitg00/awesome-claude-code-toolkit',
        description: 'Umfassendes Claude Code Toolkit der Community.',
        tags: ['Claude', 'Awesome-Liste'],
      },
      {
        name: 'Awesome OpenClaw Use Cases',
        url: 'https://github.com/hesamsheikh/awesome-openclaw-usecases',
        description: 'Community-kuratierte OpenClaw Use Cases.',
        tags: ['OpenClaw', 'Awesome-Liste'],
      },
      {
        name: 'Context Hub',
        url: 'https://github.com/andrewyng/context-hub',
        description: 'Andrew Ngs Context Hub für AI Agents.',
        tags: ['Context', 'Agents'],
      },
    ],
  },
  {
    title: 'Infrastructure & DevOps',
    description:
      'Reverse Proxies, Dokumentenmanagement, Server-Security und Observability.',
    tools: [
      {
        name: 'Traefik',
        url: 'https://github.com/traefik/traefik',
        description:
          'The Cloud Native Application Proxy — moderner Reverse Proxy und Load Balancer.',
        tags: ['Reverse Proxy', 'Cloud Native', 'Im Einsatz'],
      },
      {
        name: 'Paperless-ngx',
        url: 'https://github.com/paperless-ngx/paperless-ngx',
        description:
          'Document management system — scan, index, archive your physical documents.',
        tags: ['DMS', 'Self-Hosted', 'OCR'],
      },
      {
        name: 'How To Secure A Linux Server',
        url: 'https://github.com/imthenachoman/How-To-Secure-A-Linux-Server',
        description:
          'Umfassender Guide zur Absicherung eines Linux-Servers.',
        tags: ['Security', 'Linux', 'Lernressource'],
      },
      {
        name: 'Awesome Sysadmin',
        url: 'https://github.com/awesome-foss/awesome-sysadmin',
        description:
          'Kuratierte Liste von Open Source Sysadmin-Tools und Ressourcen.',
        tags: ['Sysadmin', 'Awesome-Liste'],
      },
      {
        name: 'Playwright',
        url: 'https://github.com/microsoft/playwright',
        description:
          'Framework for web testing and automation von Microsoft.',
        tags: ['Testing', 'Automation', 'Browser', 'Im Einsatz'],
      },
      {
        name: 'Langfuse',
        url: 'https://github.com/langfuse/langfuse',
        description:
          'Open source LLM engineering platform — Traces, Evals, Prompt Management, Metrics.',
        tags: ['Observability', 'LLM', 'Monitoring'],
      },
    ],
  },
  {
    title: 'Security & Compliance',
    description:
      'AI Security Testing, Red Teaming und Vulnerability Scanning für AI-Systeme.',
    tools: [
      {
        name: 'promptfoo',
        url: 'https://github.com/promptfoo/promptfoo',
        description:
          'Test your prompts, agents, and RAGs — AI Red Teaming und Pentesting.',
        tags: ['Security', 'Red Team', 'Testing'],
      },
      {
        name: 'Strix',
        url: 'https://github.com/usestrix/strix',
        description:
          'Open source AI hackers für automatisiertes Vulnerability Scanning.',
        tags: ['Security', 'Scanning', 'AI'],
      },
    ],
  },
  {
    title: 'Sonstige Tools',
    description:
      'Web Scraping, Voice AI, API-Entwicklung und weitere nützliche Open-Source-Tools.',
    tools: [
      {
        name: 'Firecrawl',
        url: 'https://github.com/firecrawl/firecrawl',
        description:
          'Turn websites into LLM-ready markdown or structured data.',
        tags: ['Web Scraping', 'Markdown', 'LLM'],
      },
      {
        name: 'Handy',
        url: 'https://github.com/cjpais/Handy',
        description:
          'Open source offline-fähiges Speech-to-Text.',
        tags: ['STT', 'Offline', 'Voice'],
      },
      {
        name: 'LiveKit Agents',
        url: 'https://github.com/livekit/agents',
        description:
          'Build real-time multimodal AI applications — Framework für Voice AI Agents.',
        tags: ['Voice', 'Realtime', 'Agents'],
      },
      {
        name: 'NocoDB',
        url: 'https://github.com/nocodb/nocodb',
        description:
          'Open source Airtable alternative — self-hostbare No-Code-Datenbank.',
        tags: ['No-Code', 'Datenbank', 'Self-Hosted'],
      },
      {
        name: 'Lightpanda Browser',
        url: 'https://github.com/lightpanda-io/browser',
        description:
          'Headless Browser für AI und Automation.',
        tags: ['Browser', 'Headless', 'Automation'],
      },
      {
        name: 'LLM Server Docs',
        url: 'https://github.com/varunvasudeva1/llm-server-docs',
        description:
          'Komplette Dokumentation für den Aufbau eines eigenen LLM-Servers auf Debian.',
        tags: ['LLM', 'Server', 'Lernressource'],
      },
      {
        name: 'Hoppscotch',
        url: 'https://github.com/hoppscotch/hoppscotch',
        description:
          'Open source API development ecosystem.',
        tags: ['API', 'Entwicklung', 'Self-Hosted'],
      },
      {
        name: 'Remotion',
        url: 'https://github.com/remotion-dev/remotion',
        description: 'Make videos programmatically with React.',
        tags: ['Video', 'React', 'Content'],
      },
      {
        name: 'HA LLM Vision',
        url: 'https://github.com/valentinfrlch/ha-llmvision',
        description:
          'Home Assistant Integration für LLM Vision — Bildanalyse mit lokalen Modellen.',
        tags: ['Home Assistant', 'Vision', 'Smart Home'],
      },
      {
        name: 'HA Ollama Addon',
        url: 'https://github.com/SirUli/homeassistant-ollama-addon',
        description:
          'Home Assistant Addon für Ollama — lokale LLMs im Smart Home.',
        tags: ['Home Assistant', 'Ollama', 'Smart Home'],
      },
    ],
  },
  {
    title: 'Lernressourcen',
    description:
      'Bücher, Kurse und Sammlungen zum Lernen von AI Engineering, ML und LLMs.',
    tools: [
      {
        name: 'LLMs from Scratch',
        url: 'https://github.com/rasbt/LLMs-from-scratch',
        description:
          'Build a Large Language Model (From Scratch) — LLM-Implementierung in PyTorch.',
        tags: ['Buch', 'PyTorch', 'Lernressource'],
      },
      {
        name: 'Awesome LLM Apps',
        url: 'https://github.com/Shubhamsaboo/awesome-llm-apps',
        description:
          'Collection of awesome LLM apps with AI Agents and RAG using OpenAI, Anthropic, Gemini.',
        tags: ['Awesome-Liste', 'LLM', 'Referenz'],
      },
      {
        name: 'ML Engineering Open Book',
        url: 'https://github.com/stas00/ml-engineering',
        description:
          'Machine Learning Engineering Open Book — umfassendes ML-Nachschlagewerk.',
        tags: ['Buch', 'ML', 'Lernressource'],
      },
      {
        name: 'AI Engineering Hub',
        url: 'https://github.com/patchy631/ai-engineering-hub',
        description:
          'Tutorials zu LLMs, RAGs und AI Agent Anwendungen.',
        tags: ['Tutorials', 'LLM', 'RAG'],
      },
      {
        name: 'CS249r ML Systems (Harvard)',
        url: 'https://github.com/harvard-edge/cs249r_book',
        description:
          'Machine Learning Systems — Lehrbuch von Harvard.',
        tags: ['Buch', 'Harvard', 'ML Systems'],
      },
      {
        name: 'DataCamp: Lokale AI Tutorial',
        url: 'https://www.datacamp.com/de/tutorial/local-ai',
        description:
          'Praxistutorial von DataCamp zum Aufsetzen und Nutzen lokaler KI-Modelle.',
        tags: ['Tutorial', 'Lokal', 'Lernressource'],
      },
    ],
  },
]

function TagBadge({ tag }: { tag: string }) {
  const isActive = tag === 'Im Einsatz'
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs rounded-full ${
        isActive
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-slate-800 text-slate-400 border border-slate-700'
      }`}
    >
      {tag}
    </span>
  )
}

export default function OpenSourceProjektePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Open Source Tools &amp; Projekte
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Kuratierte Sammlung empfehlenswerter Open-Source-Tools für lokale AI,
          Agent-Frameworks, RAG, Monitoring und Automation. Alle Tools sind
          Self-Hosted-fähig und auf GitHub verfügbar.
        </p>
        <p className="text-slate-500 text-sm mt-2">
          {categories.reduce((sum, cat) => sum + cat.tools.length, 0)} Tools in{' '}
          {categories.length} Kategorien | Zuletzt aktualisiert: März 2026
        </p>
      </div>

      <Callout type="summary" title="Überblick">
        {categories.reduce((sum, cat) => sum + cat.tools.length, 0)} kuratierte Open-Source-Tools
        in {categories.length} Kategorien — von LLM Runtimes über Agent Frameworks bis Security.
        Alle Tools sind Self-Hosted-fähig und auf GitHub verfügbar. Tools mit dem Tag
        &quot;Im Einsatz&quot; nutzen wir selbst in Produktion.
      </Callout>

      {/* Inhaltsverzeichnis */}
      <nav className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          Kategorien
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={`#${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-sm text-blue-400 hover:text-blue-300 bg-slate-800 px-3 py-1.5 rounded-lg transition-colors"
            >
              {cat.title} ({cat.tools.length})
            </a>
          ))}
        </div>
      </nav>

      {/* Kategorien */}
      {categories.map((cat) => (
        <section
          key={cat.title}
          id={cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
            {cat.title}
          </h2>
          <p className="text-slate-400 text-sm">{cat.description}</p>
          <div className="space-y-3">
            {cat.tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {tool.description}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0 mt-1">
                    github.com
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tool.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-sm text-slate-400">
        <p>
          Diese Liste basiert auf einer systematischen Analyse von 239 GitHub-Starred-Repos.
          Aufgenommen wurden nur Projekte mit einer Relevanz von mindestens 7/10 für
          lokale AI-Infrastruktur und Self-Hosted-Setups. Die Beschreibungen stammen
          aus den offiziellen GitHub-Repositories.
        </p>
      </div>

      {/* Quellen */}
      <section className="mt-16 pt-8 border-t border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
        <ul className="space-y-2 text-sm text-white/50">
          <li><a href="https://github.com/ollama/ollama" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama</a> — Lokale LLM Runtime</li>
          <li><a href="https://github.com/crewAIInc/crewAI" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CrewAI</a> — Multi-Agent Orchestrierung</li>
          <li><a href="https://github.com/n8n-io/n8n" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n</a> — Workflow Automation</li>
          <li><a href="https://github.com/qdrant/qdrant" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Qdrant</a> — Vector Search Engine</li>
          <li><a href="https://github.com/langfuse/langfuse" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Langfuse</a> — LLM Observability</li>
          <li><a href="https://github.com/promptfoo/promptfoo" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">promptfoo</a> — AI Red Teaming und Prompt Testing</li>
        </ul>
      </section>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/tools/ai-tools-datenbank" className="text-blue-400 hover:text-blue-300">AI Tools Datenbank</a>
          {' · '}
          <a href="/tools/ollama-tutorial" className="text-blue-400 hover:text-blue-300">Ollama Tutorial</a>
          {' · '}
          <a href="/grundlagen/lokal-vs-cloud" className="text-blue-400 hover:text-blue-300">Lokal vs. Cloud</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
    </div>
  )
}
