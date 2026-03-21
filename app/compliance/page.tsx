export const metadata = {
  title: 'Compliance | AI Engineering Wiki',
  description:
    'DSGVO und EU AI Act in der Praxis: Grundlagen, Transparenzpflichten, verbotene Praktiken und Checklisten fuer AI-Systeme.',
}

export default function CompliancePage() {
  const articles = [
    {
      title: 'DSGVO Grundlagen',
      description: 'Was bedeutet DSGVO fuer AI-Anwendungen — Datenschutz, Einwilligung, Loeschfristen.',
      href: '/compliance/dsgvo-grundlagen',
      date: '2026-02-28',
    },
    {
      title: 'EU AI Act',
      description: 'Risikoklassen, Verbote, Transparenzpflichten fuer AI-Systeme in der EU.',
      href: '/compliance/eu-ai-act',
      date: '2026-02-28',
    },
    {
      title: 'KI-Kompetenz nach Art. 4',
      description: 'KI-Kompetenz Pflicht: Wer ist betroffen, was muss geschult werden, Deadline 02.08.2026.',
      href: '/compliance/ki-kompetenz-art4',
      date: '2026-03-21',
    },
    {
      title: 'EU AI Act Checkliste',
      description: '7-Schritte Leitfaden zur EU AI Act Bereitschaft. Risikoklassen, Termine, Pflichten.',
      href: '/compliance/eu-ai-act-checkliste',
      date: '2026-03-01',
    },
    {
      title: 'Verbotene AI-Praktiken',
      description: 'Article 5 - Was seit Feb 2025 verboten ist. Social Scoring, Emotion Recognition.',
      href: '/compliance/verbotene-ai-praktiken',
      date: '2026-03-01',
    },
    {
      title: 'Chatbot Transparenzpflichten',
      description: 'Kennzeichnungspflichten fuer Chatbots und KI-generierte Inhalte.',
      href: '/compliance/chatbot-transparenzpflichten',
      date: '2026-03-01',
    },
    {
      title: 'Datenschutz-Folgenabschaetzung (DPIA)',
      description: 'Wann ist eine DPIA Pflicht, wie fuehrt man sie durch, DPIA und EU AI Act.',
      href: '/compliance/dpia',
      date: '2026-03-21',
    },
    {
      title: 'Datenschutz Praxis',
      description: 'Praktische Umsetzung — TOM, AVV, Dokumentation, Betroffenenrechte.',
      href: '/compliance/datenschutz-praxis',
      date: '2026-02-28',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Compliance</h1>
        <p className="text-slate-400 mt-2">
          DSGVO und EU AI Act — rechtliche Anforderungen fuer AI-Systeme.
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
