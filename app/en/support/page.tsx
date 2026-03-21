export const metadata = {
  title: 'Support | AI Engineering Wiki',
  description:
    'Troubleshooting and help for your local AI stack: Ollama, n8n, Docker, networking and common failure modes.',
}

export default function SupportPage() {
  const articles = [
    {
      title: 'Troubleshooting Guide',
      description: 'Common problems with Ollama, n8n, Docker. Diagnosis and solutions.',
      href: '/en/support/troubleshooting',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Support</h1>
        <p className="text-gray-400 mt-2">
          Help with problems in your local AI stack.
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
