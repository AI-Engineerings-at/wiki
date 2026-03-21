export const metadata = {
  title: 'Open Source Tools & Projects | AI Engineering Wiki',
  description:
    'Curated list of the best open source tools for local AI: LLM runtimes, agent frameworks, RAG, monitoring, automation and security.',
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
      'Local LLM execution, inference engines and chat interfaces for self-hosted AI.',
    tools: [
      {
        name: 'Ollama',
        url: 'https://github.com/ollama/ollama',
        description:
          'Get up and running with large language models — local LLM runtime.',
        tags: ['LLM', 'Local', 'GPU', 'In Use'],
      },
      {
        name: 'Ollama Python',
        url: 'https://github.com/ollama/ollama-python',
        description: 'Python library for the Ollama API.',
        tags: ['Python', 'SDK', 'In Use'],
      },
      {
        name: 'Open WebUI',
        url: 'https://github.com/open-webui/open-webui',
        description:
          'User-friendly WebUI for LLMs — supports Ollama and OpenAI-compatible APIs.',
        tags: ['WebUI', 'Chat', 'Self-Hosted', 'In Use'],
      },
      {
        name: 'LocalAI',
        url: 'https://github.com/mudler/LocalAI',
        description:
          'Free, open source OpenAI alternative — self-hosted, no GPU required.',
        tags: ['LLM', 'OpenAI-compatible', 'CPU'],
      },
      {
        name: 'exo',
        url: 'https://github.com/exo-explore/exo',
        description:
          'Run AI models on your own hardware — cluster across multiple devices.',
        tags: ['LLM', 'Cluster', 'Multi-Device'],
      },
      {
        name: 'BitNet',
        url: 'https://github.com/microsoft/BitNet',
        description:
          'Official inference framework for 1-bit LLMs by Microsoft.',
        tags: ['LLM', 'Optimization', '1-Bit'],
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
          'Enhanced ChatGPT clone with MCP support, multi-provider and multi-user auth.',
        tags: ['Chat', 'WebUI', 'MCP'],
      },
    ],
  },
  {
    title: 'Agent Frameworks',
    description:
      'Frameworks and platforms for autonomous AI agents, multi-agent systems and orchestration.',
    tools: [
      {
        name: 'CrewAI',
        url: 'https://github.com/crewAIInc/crewAI',
        description:
          'Framework for orchestrating role-playing, autonomous AI agents.',
        tags: ['Agents', 'Orchestration', 'Multi-Agent'],
      },
      {
        name: 'CrewAI Examples',
        url: 'https://github.com/crewAIInc/crewAI-examples',
        description: 'Collection of CrewAI example workflows and use cases.',
        tags: ['Agents', 'Examples'],
      },
      {
        name: 'AutoGen',
        url: 'https://github.com/microsoft/autogen',
        description:
          'An open-source framework for building AI agent systems by Microsoft.',
        tags: ['Agents', 'Microsoft', 'Multi-Agent'],
      },
      {
        name: 'DeepAgents',
        url: 'https://github.com/langchain-ai/deepagents',
        description:
          'LangChain/LangGraph agent with planning and subagents.',
        tags: ['Agents', 'LangChain', 'Planning'],
      },
      {
        name: 'mem0',
        url: 'https://github.com/mem0ai/mem0',
        description:
          'The memory layer for AI apps — persistent memory for AI agents.',
        tags: ['Memory', 'Agents', 'Persistence'],
      },
      {
        name: 'Hindsight',
        url: 'https://github.com/vectorize-io/hindsight',
        description: 'Agent memory that learns.',
        tags: ['Memory', 'Agents', 'Learning'],
      },
      {
        name: 'Eliza',
        url: 'https://github.com/elizaOS/eliza',
        description: 'Autonomous agents for everyone.',
        tags: ['Agents', 'Autonomy'],
      },
      {
        name: 'Agent Squad',
        url: 'https://github.com/awslabs/agent-squad',
        description:
          'Multi-agent management framework by AWS Labs.',
        tags: ['Agents', 'AWS', 'Orchestration'],
      },
      {
        name: 'Hermes Agent',
        url: 'https://github.com/NousResearch/hermes-agent',
        description:
          'An agent that grows with you — by NousResearch.',
        tags: ['Agents', 'NousResearch'],
      },
      {
        name: 'LobeHub',
        url: 'https://github.com/lobehub/lobehub',
        description: 'Multi-agent collaboration platform.',
        tags: ['Agents', 'Platform', 'Collaboration'],
      },
      {
        name: 'Maestro',
        url: 'https://github.com/RunMaestro/Maestro',
        description: 'Agent orchestration command center.',
        tags: ['Agents', 'Orchestration'],
      },
      {
        name: 'ChatDev',
        url: 'https://github.com/OpenBMB/ChatDev',
        description:
          'Communicative agents for software development.',
        tags: ['Agents', 'Development'],
      },
      {
        name: 'ruflo',
        url: 'https://github.com/ruvnet/ruflo',
        description: 'Multi-agent swarm orchestration for Claude.',
        tags: ['Agents', 'Claude', 'Swarm'],
      },
      {
        name: 'OpenViking',
        url: 'https://github.com/volcengine/OpenViking',
        description:
          'Context database for AI agents — memory, resources and skills.',
        tags: ['Memory', 'Agents', 'Context'],
      },
      {
        name: '12-Factor Agents',
        url: 'https://github.com/humanlayer/12-factor-agents',
        description:
          'Principles for building production-grade LLM software.',
        tags: ['Best Practices', 'Architecture', 'Learning'],
      },
      {
        name: 'Awesome AI Agents',
        url: 'https://github.com/e2b-dev/awesome-ai-agents',
        description:
          'Curated list of autonomous AI agents and agent frameworks.',
        tags: ['Awesome List', 'Reference'],
      },
    ],
  },
  {
    title: 'Workflow Automation',
    description:
      'Workflow engines and automation platforms with native AI integration.',
    tools: [
      {
        name: 'n8n',
        url: 'https://github.com/n8n-io/n8n',
        description:
          'Fair-code workflow automation platform with native AI capabilities.',
        tags: ['Automation', 'Workflows', 'AI', 'In Use'],
      },
      {
        name: 'n8n Workflows (Community)',
        url: 'https://github.com/Zie619/n8n-workflows',
        description: 'Large collection of n8n community workflows.',
        tags: ['n8n', 'Examples', 'Community'],
      },
      {
        name: 'Kestra',
        url: 'https://github.com/kestra-io/kestra',
        description:
          'Event-driven orchestration platform to build workflows in code or from UI.',
        tags: ['Orchestration', 'Event-Driven'],
      },
    ],
  },
  {
    title: 'RAG & Knowledge',
    description:
      'Vector databases, RAG frameworks and knowledge management for AI applications.',
    tools: [
      {
        name: 'open-notebook',
        url: 'https://github.com/lfnovo/open-notebook',
        description:
          'Open source NotebookLM alternative — knowledge management with AI.',
        tags: ['Knowledge', 'Notebook', 'In Use'],
      },
      {
        name: 'Qdrant',
        url: 'https://github.com/qdrant/qdrant',
        description:
          'High-performance, massive-scale vector search engine written in Rust.',
        tags: ['Vector DB', 'Rust', 'Search'],
      },
      {
        name: 'Quivr',
        url: 'https://github.com/QuivrHQ/quivr',
        description:
          'Opinionated RAG for generative AI applications.',
        tags: ['RAG', 'GenAI'],
      },
      {
        name: 'OpenRAG',
        url: 'https://github.com/langflow-ai/openrag',
        description:
          'RAG platform built on Langflow, Docling and OpenSearch.',
        tags: ['RAG', 'Langflow', 'OpenSearch'],
      },
      {
        name: 'PageIndex',
        url: 'https://github.com/VectifyAI/PageIndex',
        description:
          'Document indexing for vectorless RAG — RAG without a vector database.',
        tags: ['RAG', 'Indexing', 'Vectorless'],
      },
      {
        name: 'LEANN',
        url: 'https://github.com/yichuan-w/LEANN',
        description:
          'RAG with 97% storage reduction, 100% local and private.',
        tags: ['RAG', 'Optimization', 'Privacy'],
      },
      {
        name: 'OpenDataLoader PDF',
        url: 'https://github.com/opendataloader-project/opendataloader-pdf',
        description: 'PDF parser for AI-ready data.',
        tags: ['PDF', 'Data Ingestion', 'Parser'],
      },
    ],
  },
  {
    title: 'Claude Code & OpenClaw Ecosystem',
    description:
      'Skills, plugins, hooks and resources for Claude Code and the OpenClaw ecosystem.',
    tools: [
      {
        name: 'Anthropic Skills',
        url: 'https://github.com/anthropics/skills',
        description: 'Official agent skills repository by Anthropic.',
        tags: ['Claude', 'Skills', 'Official'],
      },
      {
        name: 'Claude Cookbooks',
        url: 'https://github.com/anthropics/claude-cookbooks',
        description:
          'Official Claude notebooks and recipes by Anthropic.',
        tags: ['Claude', 'Tutorials', 'Official'],
      },
      {
        name: 'Claude Plugins Official',
        url: 'https://github.com/anthropics/claude-plugins-official',
        description: 'Official Claude Code plugins.',
        tags: ['Claude', 'Plugins', 'Official'],
      },
      {
        name: 'Knowledge Work Plugins',
        url: 'https://github.com/anthropics/knowledge-work-plugins',
        description: 'Knowledge worker plugins for Claude.',
        tags: ['Claude', 'Plugins', 'Knowledge'],
      },
      {
        name: 'Superpowers',
        url: 'https://github.com/obra/superpowers',
        description:
          'Agentic skills framework and methodology for Claude Code.',
        tags: ['Claude', 'Skills', 'Methodology'],
      },
      {
        name: 'Claude Code Hooks Mastery',
        url: 'https://github.com/disler/claude-code-hooks-mastery',
        description: 'Comprehensive guide for Claude Code hooks.',
        tags: ['Claude', 'Hooks', 'Learning'],
      },
      {
        name: 'Claude Code Hooks Multi-Agent Observability',
        url: 'https://github.com/disler/claude-code-hooks-multi-agent-observability',
        description:
          'Multi-agent monitoring and observability via Claude Code hooks.',
        tags: ['Claude', 'Hooks', 'Monitoring'],
      },
      {
        name: 'Awesome Claude Code Toolkit',
        url: 'https://github.com/rohitg00/awesome-claude-code-toolkit',
        description: 'Comprehensive Claude Code toolkit by the community.',
        tags: ['Claude', 'Awesome List'],
      },
      {
        name: 'Awesome OpenClaw Use Cases',
        url: 'https://github.com/hesamsheikh/awesome-openclaw-usecases',
        description: 'Community-curated OpenClaw use cases.',
        tags: ['OpenClaw', 'Awesome List'],
      },
      {
        name: 'Context Hub',
        url: 'https://github.com/andrewyng/context-hub',
        description: 'Andrew Ng\'s context hub for AI agents.',
        tags: ['Context', 'Agents'],
      },
    ],
  },
  {
    title: 'Infrastructure & DevOps',
    description:
      'Reverse proxies, document management, server security and observability.',
    tools: [
      {
        name: 'Traefik',
        url: 'https://github.com/traefik/traefik',
        description:
          'The cloud native application proxy — modern reverse proxy and load balancer.',
        tags: ['Reverse Proxy', 'Cloud Native', 'In Use'],
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
          'Comprehensive guide to securing a Linux server.',
        tags: ['Security', 'Linux', 'Learning'],
      },
      {
        name: 'Awesome Sysadmin',
        url: 'https://github.com/awesome-foss/awesome-sysadmin',
        description:
          'Curated list of open source sysadmin tools and resources.',
        tags: ['Sysadmin', 'Awesome List'],
      },
      {
        name: 'Playwright',
        url: 'https://github.com/microsoft/playwright',
        description:
          'Framework for web testing and automation by Microsoft.',
        tags: ['Testing', 'Automation', 'Browser', 'In Use'],
      },
      {
        name: 'Langfuse',
        url: 'https://github.com/langfuse/langfuse',
        description:
          'Open source LLM engineering platform — traces, evals, prompt management, metrics.',
        tags: ['Observability', 'LLM', 'Monitoring'],
      },
    ],
  },
  {
    title: 'Security & Compliance',
    description:
      'AI security testing, red teaming and vulnerability scanning for AI systems.',
    tools: [
      {
        name: 'promptfoo',
        url: 'https://github.com/promptfoo/promptfoo',
        description:
          'Test your prompts, agents, and RAGs — AI red teaming and pentesting.',
        tags: ['Security', 'Red Team', 'Testing'],
      },
      {
        name: 'Strix',
        url: 'https://github.com/usestrix/strix',
        description:
          'Open source AI hackers for automated vulnerability scanning.',
        tags: ['Security', 'Scanning', 'AI'],
      },
    ],
  },
  {
    title: 'Other Tools',
    description:
      'Web scraping, voice AI, API development and other useful open source tools.',
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
          'Open source offline speech-to-text.',
        tags: ['STT', 'Offline', 'Voice'],
      },
      {
        name: 'LiveKit Agents',
        url: 'https://github.com/livekit/agents',
        description:
          'Build real-time multimodal AI applications — framework for voice AI agents.',
        tags: ['Voice', 'Realtime', 'Agents'],
      },
      {
        name: 'NocoDB',
        url: 'https://github.com/nocodb/nocodb',
        description:
          'Open source Airtable alternative — self-hostable no-code database.',
        tags: ['No-Code', 'Database', 'Self-Hosted'],
      },
      {
        name: 'Lightpanda Browser',
        url: 'https://github.com/lightpanda-io/browser',
        description:
          'Headless browser for AI and automation.',
        tags: ['Browser', 'Headless', 'Automation'],
      },
      {
        name: 'LLM Server Docs',
        url: 'https://github.com/varunvasudeva1/llm-server-docs',
        description:
          'Complete documentation for building your own LLM server on Debian.',
        tags: ['LLM', 'Server', 'Learning'],
      },
      {
        name: 'Hoppscotch',
        url: 'https://github.com/hoppscotch/hoppscotch',
        description:
          'Open source API development ecosystem.',
        tags: ['API', 'Development', 'Self-Hosted'],
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
          'Home Assistant integration for LLM Vision — image analysis with local models.',
        tags: ['Home Assistant', 'Vision', 'Smart Home'],
      },
      {
        name: 'HA Ollama Addon',
        url: 'https://github.com/SirUli/homeassistant-ollama-addon',
        description:
          'Home Assistant addon for Ollama — local LLMs in your smart home.',
        tags: ['Home Assistant', 'Ollama', 'Smart Home'],
      },
    ],
  },
  {
    title: 'Learning Resources',
    description:
      'Books, courses and collections for learning AI engineering, ML and LLMs.',
    tools: [
      {
        name: 'LLMs from Scratch',
        url: 'https://github.com/rasbt/LLMs-from-scratch',
        description:
          'Build a Large Language Model (From Scratch) — LLM implementation in PyTorch.',
        tags: ['Book', 'PyTorch', 'Learning'],
      },
      {
        name: 'Awesome LLM Apps',
        url: 'https://github.com/Shubhamsaboo/awesome-llm-apps',
        description:
          'Collection of awesome LLM apps with AI Agents and RAG using OpenAI, Anthropic, Gemini.',
        tags: ['Awesome List', 'LLM', 'Reference'],
      },
      {
        name: 'ML Engineering Open Book',
        url: 'https://github.com/stas00/ml-engineering',
        description:
          'Machine Learning Engineering Open Book — comprehensive ML reference.',
        tags: ['Book', 'ML', 'Learning'],
      },
      {
        name: 'AI Engineering Hub',
        url: 'https://github.com/patchy631/ai-engineering-hub',
        description:
          'Tutorials on LLMs, RAGs and AI agent applications.',
        tags: ['Tutorials', 'LLM', 'RAG'],
      },
      {
        name: 'CS249r ML Systems (Harvard)',
        url: 'https://github.com/harvard-edge/cs249r_book',
        description:
          'Machine Learning Systems — textbook by Harvard.',
        tags: ['Book', 'Harvard', 'ML Systems'],
      },
    ],
  },
]

function TagBadge({ tag }: { tag: string }) {
  const isActive = tag === 'In Use'
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

export default function OpenSourceProjectsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Open Source Tools &amp; Projects
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Curated collection of the best open source tools for local AI,
          agent frameworks, RAG, monitoring and automation. All tools are
          self-hostable and available on GitHub.
        </p>
        <p className="text-slate-500 text-sm mt-2">
          {categories.reduce((sum, cat) => sum + cat.tools.length, 0)} tools in{' '}
          {categories.length} categories | Last updated: March 2026
        </p>
      </div>

      {/* Table of Contents */}
      <nav className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          Categories
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

      {/* Categories */}
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
          This list is based on a systematic analysis of 239 GitHub starred repos.
          Only projects with a relevance score of at least 7/10 for local AI
          infrastructure and self-hosted setups were included. Descriptions are
          sourced from the official GitHub repositories.
        </p>
      </div>
    </div>
  )
}
