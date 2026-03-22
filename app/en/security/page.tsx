export const metadata = {
  title: 'Security | AI Engineering Wiki',
  description:
    'Security for local AI infrastructure: API key handling, firewall setup, network segmentation and backup strategies.',
  openGraph: {
    images: [{ url: '/images/og/og-security.png', width: 1200, height: 630, alt: 'AI Engineering Wiki — Security' }],
  },
}

export default function SecurityPage() {
  const articles = [
    {
      title: 'Secure API Key Storage',
      description: 'Vault, Environment Variables, Secrets Management for AI Stack.',
      href: '/en/security/api-keys-sicher',
      date: '2026-03-01',
    },
    {
      title: 'Firewall Setup',
      description: 'UFW, fail2ban, network segmentation for local AI infrastructure.',
      href: '/en/security/firewall-setup',
      date: '2026-03-01',
    },
    {
      title: 'Backup Strategy',
      description: '3-2-1 rule, automated backups for Ollama, n8n, PostgreSQL.',
      href: '/en/security/backup-strategie',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Security</h1>
        <p className="text-gray-400 mt-2">
          Security for local AI infrastructure — from API keys to backup.
        </p>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.href}
            href={article.href}
            className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{article.description}</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{article.date}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
