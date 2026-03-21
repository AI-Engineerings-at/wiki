export const metadata = {
  title: 'Tools | AI Engineering Wiki',
  description:
    'Tools and infrastructure for your GDPR-compliant, 100% self-hosted AI stack: Docker, Ollama, n8n, Grafana, RAG, Proxmox and MCP.',
}

export default function ToolsPage() {
  const articles = [
    {
      title: 'Docker vs Docker Swarm',
      description: 'Which is right for AI? Compose for development, Swarm for production.',
      href: '/en/tools/docker-vs-swarm',
      date: '2026-03-01',
    },
    {
      title: 'Ollama Tutorial',
      description: 'Running local LLMs with Ollama. Models, API, integration.',
      href: '/en/tools/ollama-tutorial',
      date: '2026-03-01',
    },
    {
      title: 'RAG Guide',
      description: 'Retrieval-Augmented Generation with ChromaDB, Qdrant, Neo4j.',
      href: '/en/tools/rag-guide',
      date: '2026-03-01',
    },
    {
      title: 'n8n for Beginners',
      description: 'Workflow automation with n8n. Nodes, triggers, integrations.',
      href: '/en/tools/n8n-fuer-anfaenger',
      date: '2026-03-01',
    },
    {
      title: 'Mattermost Agent',
      description: 'Build an AI agent for Mattermost chat. Bot setup, prompts.',
      href: '/en/tools/mattermost-agent',
      date: '2026-03-01',
    },
    {
      title: 'Grafana Monitoring',
      description: 'Monitoring with Prometheus + Grafana. Dashboards, alerts.',
      href: '/en/tools/grafana-monitoring',
      date: '2026-03-01',
    },
    {
      title: 'Proxmox Setup',
      description: 'Virtualization with Proxmox VE. VMs, containers, cluster.',
      href: '/en/tools/proxmox-setup',
      date: '2026-03-01',
    },
    {
      title: 'MCP Server',
      description: 'Model Context Protocol. Connect Claude to your infrastructure.',
      href: '/en/tools/mcp-server',
      date: '2026-03-01',
    },
    {
      title: 'Model Selection Guide',
      description: 'Choose the right AI model. Llama, Mistral, Gemma — what to use.',
      href: '/en/tools/model-selection',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Tools</h1>
        <p className="text-slate-400 mt-2">
          Tools and technologies for your local AI stack.
        </p>
      </div>
      <div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.href}
            href={article.href}
            className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-400 text-sm mt-1">{article.description}</p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{article.date}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
