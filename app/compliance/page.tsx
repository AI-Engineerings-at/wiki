export const metadata = {
  title: 'Compliance | AI Engineering Wiki',
  description:
    'Was du als Unternehmen tun musst wenn du KI einsetzt: DSGVO, EU AI Act, Pflichten und Checklisten — verständlich erklärt.',
}

export default function CompliancePage() {
  const articles = [
    {
      title: 'DSGVO Grundlagen',
      description: 'Was die DSGVO für deine KI-Nutzung bedeutet — wann du Einwilligungen brauchst und was du dokumentieren musst.',
      href: '/compliance/dsgvo-grundlagen',
      date: '2026-02-28',
    },
    {
      title: 'EU AI Act',
      description: 'Das neue KI-Gesetz der EU: Was erlaubt ist, was verboten ist, und was du als Unternehmen tun musst.',
      href: '/compliance/eu-ai-act',
      date: '2026-02-28',
    },
    {
      title: 'KI-Kompetenz nach Art. 4',
      description: 'Dein Team muss KI-Grundwissen haben — das ist Pflicht. Wer betroffen ist und bis wann du handeln musst.',
      href: '/compliance/ki-kompetenz-art4',
      date: '2026-03-21',
    },
    {
      title: 'EU AI Act Checkliste',
      description: '7 Schritte zum Abhaken: Bist du bereit für den EU AI Act? Klare Anleitung mit Terminen.',
      href: '/compliance/eu-ai-act-checkliste',
      date: '2026-03-01',
    },
    {
      title: 'Verbotene AI-Praktiken',
      description: 'Diese KI-Anwendungen sind in der EU verboten — seit Februar 2025. Prüfe ob du betroffen bist.',
      href: '/compliance/verbotene-ai-praktiken',
      date: '2026-03-01',
    },
    {
      title: 'Chatbot Transparenzpflichten',
      description: 'Wenn dein Chatbot mit Kunden spricht, müssen die das wissen. So kennzeichnest du richtig.',
      href: '/compliance/chatbot-transparenzpflichten',
      date: '2026-03-01',
    },
    {
      title: 'Datenschutz-Folgenabschaetzung (DPIA)',
      description: 'Wann du eine Datenschutz-Folgenabschätzung brauchst und wie du sie ohne Anwalt erstellst.',
      href: '/compliance/dpia',
      date: '2026-03-21',
    },
    {
      title: 'Datenschutz Praxis',
      description: 'Die praktische Seite: Welche Dokumente du brauchst, welche Maßnahmen du treffen musst.',
      href: '/compliance/datenschutz-praxis',
      date: '2026-02-28',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Compliance</h1>
        <p className="text-slate-400 mt-2">
          Was du rechtlich beachten musst wenn du KI im Unternehmen einsetzt — ohne Juristendeutsch.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-eu-ai-act.png" alt="EU AI Act und DSGVO Compliance" className="rounded-xl border border-white/10 w-full" />
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
