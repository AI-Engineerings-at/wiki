export const metadata = {
  title: 'Support | AI Engineering Wiki',
  description:
    'Troubleshooting und Hilfe für deinen lokalen AI-Stack: Ollama, n8n, Docker, Networking und typische Fehlerbilder.',
}

export default function SupportPage() {
  const articles = [
    {
      title: 'Troubleshooting Guide',
      description: 'Häufige Probleme mit Ollama, n8n, Docker — Diagnose und Lösungen.',
      href: '/support/troubleshooting',
      date: '2026-02-28',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Support</h1>
        <p className="text-gray-400 mt-2">
          Hilfe bei Problemen mit deinem lokalen AI-Stack.
        </p>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.href}
            href={article.href}
            className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-brand-blue transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-brand-blue transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{article.description}</p>
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap ml-4">{article.date}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
