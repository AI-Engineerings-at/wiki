export const metadata = {
  title: 'Compliance | AI Engineering Wiki',
  description:
    'GDPR and EU AI Act in practice: basics, transparency requirements, prohibited practices and readiness checklists for AI systems.',
}

export default function CompliancePage() {
  const articles = [
    {
      title: 'GDPR Basics',
      description: 'What does GDPR mean for AI applications? Data protection, consent, retention.',
      href: '/en/compliance/dsgvo-grundlagen',
      date: '2026-03-01',
    },
    {
      title: 'EU AI Act',
      description: 'Risk classes, prohibitions, transparency requirements for AI systems in the EU.',
      href: '/en/compliance/eu-ai-act',
      date: '2026-03-01',
    },
    {
      title: 'AI Literacy (Art. 4)',
      description: 'AI literacy obligation under Art. 4 EU AI Act. Who is affected, deadline Aug 2, 2026.',
      href: '/en/compliance/ki-kompetenz-art4',
      date: '2026-03-21',
    },
    {
      title: 'EU AI Act Compliance Checklist',
      description: '7-step guide to EU AI Act readiness. Risk classes, deadlines, requirements.',
      href: '/en/compliance/eu-ai-act-checkliste',
      date: '2026-03-01',
    },
    {
      title: 'Prohibited AI Practices',
      description: 'Article 5 — What has been forbidden since Feb 2025. Social Scoring, Emotion Recognition.',
      href: '/en/compliance/verbotene-ai-praktiken',
      date: '2026-03-01',
    },
    {
      title: 'Chatbot Transparency Requirements',
      description: 'Labeling requirements for chatbots and AI-generated content.',
      href: '/en/compliance/chatbot-transparenzpflichten',
      date: '2026-03-01',
    },
    {
      title: 'Data Protection Impact Assessment (DPIA)',
      description: 'When is a DPIA required, how to conduct one, DPIA and EU AI Act.',
      href: '/en/compliance/dpia',
      date: '2026-03-21',
    },
    {
      title: 'Privacy Practices',
      description: 'Practical implementation — TOM, DPA, documentation, data subject rights.',
      href: '/en/compliance/datenschutz-praxis',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Compliance</h1>
        <p className="text-slate-400 mt-2">
          GDPR and EU AI Act — legal requirements for AI systems.
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
