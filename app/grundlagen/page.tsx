export const metadata = {
  title: 'Grundlagen | AI Engineering Wiki',
  description:
    'Einstieg in Agent Orchestration, Multi-Agent Systeme und lokalen AI-Stack: Rollen, Kosten, lokal vs Cloud, Quickstart.',
}

export default function GrundlagenPage() {
  const articles = [
    {
      title: 'Was ist Agent Orchestration?',
      description: 'Einführung in Agent Orchestration und Multi-Agent Systeme.',
      href: '/grundlagen/was-ist-agent-orchestration',
      date: '2026-03-01',
    },
    {
      title: 'Multi-Agent Systeme erklärt',
      description: 'Wie mehrere AI-Agenten zusammenarbeiten und warum das besser ist als ein einzelnes LLM.',
      href: '/grundlagen/multi-agent-systeme',
      date: '2026-03-01',
    },
    {
      title: 'Agent Rollen & Verantwortung',
      description: 'Developer, QA, Infra, Browser — welche Rollen braucht ein Agent-Team?',
      href: '/grundlagen/agent-rollen',
      date: '2026-03-01',
    },
    {
      title: 'Lokale AI vs. Cloud: Der TCO-Vergleich',
      description: 'Was kostet Self-Hosted AI wirklich? Hardware, Strom, Wartung vs. API-Kosten.',
      href: '/grundlagen/lokal-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: 'Ollama vs Cloud LLM: Vergleich',
      description: 'Wann lokal, wann Cloud? Qualität, Kosten, Datenschutz.',
      href: '/grundlagen/ollama-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: 'AI Agent Team aufbauen',
      description: 'Arten von Agenten, Team-Struktur, Tools-Integration.',
      href: '/grundlagen/ai-agent-team',
      date: '2026-03-01',
    },
    {
      title: 'Self-hosted vs Cloud Services',
      description: 'Welche Services selbst hosten, welche in die Cloud?',
      href: '/grundlagen/selfhosted-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: '30-Tage Quickstart Guide',
      description: 'In 30 Tagen zum eigenen AI-Stack. Tag-für-Tag Anleitung.',
      href: '/grundlagen/30-tage-quickstart',
      date: '2026-03-01',
    },
    {
      title: 'AI im Unternehmen',
      description: 'Warum Unternehmen lokale AI einsetzen: Datenschutz, Kostenkontrolle, Souveränität.',
      href: '/grundlagen/ki-unternehmen',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Grundlagen</h1>
        <p className="text-slate-400 mt-2">
          Einstieg in Agent Orchestration, Multi-Agent Systeme und AI Infrastructure.
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
