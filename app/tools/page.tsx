export const metadata = {
  title: 'Tools & Infrastruktur | AI Engineering Wiki',
  description:
    'Tools und Infrastruktur für deinen lokalen AI-Stack: Docker Swarm, Ollama, RAG, n8n, Mattermost, Grafana und Proxmox.',
}

export default function ToolsPage() {
  const articles = [
    {
      title: 'Docker Compose vs Docker Swarm',
      description: 'Welches für AI-Workloads? Vergleich, Use Cases, Entscheidungshilfe.',
      href: '/tools/docker-vs-swarm',
      date: '2026-03-01',
    },
    {
      title: 'Ollama: Lokale LLMs einfach gemacht',
      description: 'Installation, Modelle, GPU-Setup, REST API, Open WebUI Integration.',
      href: '/tools/ollama-tutorial',
      date: '2026-03-01',
    },
    {
      title: 'RAG Complete Guide',
      description: 'Retrieval Augmented Generation: Vector Databases, Embeddings, Hybrid Search.',
      href: '/tools/rag-guide',
      date: '2026-03-01',
    },
    {
      title: 'n8n: Workflow-Automatisierung',
      description: 'Grundlagen, Nodes, Workflow-Beispiele, AI-Integration.',
      href: '/tools/n8n-fuer-anfaenger',
      date: '2026-03-01',
    },
    {
      title: 'Mattermost: Agent-Kommunikation',
      description: 'Polling, Webhooks, Nachrichten-Format, Team-Kommunikation.',
      href: '/tools/mattermost-agent',
      date: '2026-03-01',
    },
    {
      title: 'Grafana: Monitoring für Homelab',
      description: 'Prometheus, Dashboards, Alerting, Container-Metriken.',
      href: '/tools/grafana-monitoring',
      date: '2026-03-01',
    },
    {
      title: 'Proxmox: Homelab Virtualisierung',
      description: 'Installation, VMs, LXC, GPU-Passthrough, Backup-Strategie.',
      href: '/tools/proxmox-setup',
      date: '2026-03-01',
    },
    {
      title: 'Model Selection Guide',
      description: 'Waehle das richtige AI-Modell fuer deinen Anwendungsfall — von Llama bis Mistral.',
      href: '/tools/model-selection',
      date: '2026-03-01',
    },
    {
      title: 'MCP Server Setup',
      description: 'Model Context Protocol Server fuer AI-Integrationen aufsetzen.',
      href: '/tools/mcp-server',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Tools & Infrastruktur</h1>
        <p className="text-slate-400 mt-2">
          Die Tools und Services hinter einem produktionsreifen AI-Stack.
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
