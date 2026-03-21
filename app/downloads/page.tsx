export const metadata = {
  title: 'Praxis-Downloads | AI Engineering Wiki',
  description:
    'Kostenlose Vorlagen für KI-Compliance, Dokumentation und Betrieb: Templates, Checklisten und Leitfäden.',
}

export default function DownloadsPage() {
  const downloads = [
    {
      title: 'KI-Richtlinie Template',
      description:
        'Vorlage für eine interne KI-Richtlinie — Rollen, Pflichten, Schulungsnachweis nach Art. 4 KI-Kompetenz.',
      href: '/compliance/ki-kompetenz-art4',
      category: 'Compliance',
    },
    {
      title: 'DPIA Vorlage',
      description:
        'Datenschutz-Folgenabschätzung für KI-Systeme — Schritt-für-Schritt-Anleitung mit Muster-Dokumentation.',
      href: '/compliance/dpia',
      category: 'Compliance',
    },
    {
      title: 'Art. 30 VVT (AI-Edition)',
      description:
        'Verzeichnis der Verarbeitungstätigkeiten, erweitert um KI-spezifische Felder wie Modelltyp, Trainingsdaten und Risikoklasse.',
      href: '/compliance/dsgvo-grundlagen',
      category: 'Compliance',
    },
    {
      title: 'EU AI Act Checkliste',
      description:
        '7-Schritte Leitfaden zur EU AI Act Bereitschaft — Risikoklassen bestimmen, Termine prüfen, Pflichten umsetzen.',
      href: '/compliance/eu-ai-act-checkliste',
      category: 'Compliance',
    },
    {
      title: 'Tool-Inventar Vorlage',
      description:
        'Erfassung aller im Unternehmen eingesetzten KI-Tools — Anbieter, Risikoklasse, Zweck, Verantwortlicher.',
      href: '/compliance/eu-ai-act',
      category: 'Compliance',
    },
    {
      title: 'Agent Onboarding Checkliste',
      description:
        'Checkliste für das Onboarding von AI-Agenten als digitale Mitarbeiter — Credentials, Netzwerk, Monitoring.',
      href: '/patterns/ai-agent-digitaler-mitarbeiter',
      category: 'Patterns',
    },
    {
      title: 'Backup-Strategie Template',
      description:
        '3-2-1 Regel, automatisierte Backups für Ollama, n8n, PostgreSQL — Vorlage für die Backup-Dokumentation.',
      href: '/security/backup-strategie',
      category: 'Security',
    },
    {
      title: '30-Tage Quickstart Plan',
      description:
        'Tag-für-Tag Anleitung zum Aufbau deines eigenen AI-Stacks — von der Hardware bis zum ersten Agenten.',
      href: '/grundlagen/30-tage-quickstart',
      category: 'Grundlagen',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Praxis-Downloads — Templates &amp; Checklisten für KI im Unternehmen
        </h1>
        <p className="text-slate-400 mt-2">
          Kostenlose Vorlagen für KI-Compliance, Dokumentation und Betrieb.
          Jeder Download verweist auf den Wiki-Artikel mit dem vollständigen Template.
        </p>
      </div>

      <div className="space-y-4">
        {downloads.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h2>
                <p className="text-slate-400 text-sm mt-1">{item.description}</p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap ml-4 bg-slate-800 px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
