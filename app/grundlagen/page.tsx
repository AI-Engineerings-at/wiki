export const metadata = {
  title: 'Grundlagen | AI Engineering Wiki',
  description:
    'Die Basis: Was ist KI, warum lokal statt Cloud, was kostet es wirklich — und wie baust du dein erstes System auf.',
}

export default function GrundlagenPage() {
  const articles = [
    {
      title: 'Was ist Agent Orchestration?',
      description: 'Wie du mehrere KI-Helfer koordinierst, damit sie zusammenarbeiten statt sich in die Quere kommen.',
      href: '/grundlagen/was-ist-agent-orchestration',
      date: '2026-03-01',
    },
    {
      title: 'Multi-Agent Systeme erklärt',
      description: 'Einer recherchiert, einer schreibt, einer prüft — warum ein Team aus KI-Agenten mehr schafft als ein einzelner Chatbot.',
      href: '/grundlagen/multi-agent-systeme',
      date: '2026-03-01',
    },
    {
      title: 'Agent Rollen & Verantwortung',
      description: 'Welche Aufgaben kann ein KI-Agent übernehmen? Vom Entwickler über die Qualitätskontrolle bis zur Recherche.',
      href: '/grundlagen/agent-rollen',
      date: '2026-03-01',
    },
    {
      title: 'Lokale AI vs. Cloud: Der TCO-Vergleich',
      description: 'Was kostet eigene KI wirklich? Ehrlicher Vergleich: eigene Hardware vs. monatliche Cloud-Rechnung.',
      href: '/grundlagen/lokal-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: 'Ollama vs Cloud LLM: Vergleich',
      description: 'Wann lohnt sich eigene KI, wann reicht die Cloud? Eine ehrliche Entscheidungshilfe.',
      href: '/grundlagen/ollama-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: 'AI Agent Team aufbauen',
      description: 'Schritt für Schritt dein eigenes KI-Team zusammenstellen — welche Agenten du brauchst und wie sie zusammenspielen.',
      href: '/grundlagen/ai-agent-team',
      date: '2026-03-01',
    },
    {
      title: 'Self-hosted vs Cloud Services',
      description: 'Nicht alles muss auf deinem eigenen Server laufen. Wo sich eigenes Hosting lohnt und wo die Cloud reicht.',
      href: '/grundlagen/selfhosted-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: '30-Tage Quickstart Guide',
      description: 'In 30 Tagen zur eigenen KI. Tag für Tag eine Aufgabe — am Ende hast du ein laufendes System.',
      href: '/grundlagen/30-tage-quickstart',
      date: '2026-03-01',
    },
    {
      title: 'AI im Unternehmen',
      description: 'Warum immer mehr Unternehmen eigene KI einsetzen — und welche konkreten Vorteile das bringt.',
      href: '/grundlagen/ki-unternehmen',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Grundlagen</h1>
        <p className="text-slate-400 mt-2">
          Was KI kann, was sie kostet, und wie du sie sinnvoll einsetzt — verständlich erklärt.
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
