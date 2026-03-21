export const metadata = {
  title: 'Security | AI Engineering Wiki',
  description:
    'Security für lokale AI-Infrastruktur: API-Keys, Firewall, Netzwerk-Segmentation und Backup-Strategien (3-2-1).',
}

export default function SecurityPage() {
  const articles = [
    {
      title: 'API Keys sicher speichern',
      description: 'Vault, Environment Variables, Secrets Management für AI-Stack.',
      href: '/security/api-keys-sicher',
      date: '2026-02-28',
    },
    {
      title: 'Firewall Setup',
      description: 'UFW, fail2ban, Netzwerk-Segmentation für lokale AI-Infrastruktur.',
      href: '/security/firewall-setup',
      date: '2026-02-28',
    },
    {
      title: 'Backup Strategie',
      description: '3-2-1 Regel, automatisierte Backups für Ollama, n8n, PostgreSQL.',
      href: '/security/backup-strategie',
      date: '2026-02-28',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Security</h1>
        <p className="text-slate-400 mt-2">
          Sicherheit für lokale AI-Infrastruktur — von API-Keys bis Backup.
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
