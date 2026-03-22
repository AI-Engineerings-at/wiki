export const metadata = {
  title: 'Tools & Infrastruktur | AI Engineering Wiki',
  description:
    'Die Werkzeuge die du brauchst: KI installieren, automatisieren, überwachen. Schritt-für-Schritt Anleitungen.',
}

export default function ToolsPage() {
  const articles = [
    {
      title: 'Docker Compose vs Docker Swarm',
      description: 'Welches brauchst du? Einfacher Vergleich mit klarer Empfehlung je nach Situation.',
      href: '/tools/docker-vs-swarm',
      date: '2026-03-01',
    },
    {
      title: 'Ollama: Lokale LLMs einfach gemacht',
      description: 'Deine eigene KI in 5 Minuten installieren. Schritt für Schritt, mit Bildern.',
      href: '/tools/ollama-tutorial',
      date: '2026-03-01',
    },
    {
      title: 'RAG Complete Guide',
      description: 'Deine KI mit eigenem Firmenwissen füttern — damit sie Antworten aus DEINEN Dokumenten gibt, nicht aus dem Internet.',
      href: '/tools/rag-guide',
      date: '2026-03-01',
    },
    {
      title: 'n8n: Workflow-Automatisierung',
      description: 'Aufgaben automatisieren ohne zu programmieren: Emails beantworten, Berichte erstellen, Daten verarbeiten.',
      href: '/tools/n8n-für-anfaenger',
      date: '2026-03-01',
    },
    {
      title: 'Mattermost: Agent-Kommunikation',
      description: 'Deine KI-Agenten über einen Team-Chat steuern — Aufträge geben und Ergebnisse bekommen.',
      href: '/tools/mattermost-agent',
      date: '2026-03-01',
    },
    {
      title: 'Grafana: Monitoring für Homelab',
      description: 'Auf einen Blick sehen ob alles läuft — und automatisch gewarnt werden wenn nicht.',
      href: '/tools/grafana-monitoring',
      date: '2026-03-01',
    },
    {
      title: 'Proxmox: Homelab Virtualisierung',
      description: 'Einen Server in viele aufteilen — damit KI, Datenbank und Backup sauber getrennt laufen.',
      href: '/tools/proxmox-setup',
      date: '2026-03-01',
    },
    {
      title: 'Model Selection Guide',
      description: 'Welches KI-Modell passt zu dir? Ehrlicher Vergleich nach Qualität, Geschwindigkeit und Hardwarebedarf.',
      href: '/tools/model-selection',
      date: '2026-03-01',
    },
    {
      title: 'MCP Server Setup',
      description: 'Deiner KI Zugriff auf externe Werkzeuge geben — Dateien lesen, APIs aufrufen, Datenbanken abfragen.',
      href: '/tools/mcp-server',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Tools & Infrastruktur</h1>
        <p className="text-slate-400 mt-2">
          Die Werkzeuge die du brauchst — mit Anleitungen die auch ohne IT-Studium funktionieren.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-n8n-automation-v2.png" alt="Tools und Frameworks für den lokalen AI-Stack" className="rounded-xl border border-white/10 w-full" />
      </figure>

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
