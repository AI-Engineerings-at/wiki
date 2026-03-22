export const metadata = {
  title: 'Patterns | AI Engineering Wiki',
  description:
    'Erprobte Agent-Orchestration Patterns aus der Praxis: Memory Management, Task Delegation, Safety Hooks und Monitoring.',
}

export default function PatternsPage() {
  const articles = [
    {
      title: 'Agent Orchestration Patterns',
      description: 'Übersicht über bewährte Orchestration-Patterns für Multi-Agent Systeme.',
      href: '/patterns/agent-orchestration-patterns',
      date: '2026-02-28',
    },
    {
      title: 'Memory Management Pattern',
      description: 'Wie AI-Agenten persistentes Wissen speichern und abrufen — CLAUDE.md, Topic Files, Knowledge Graphs.',
      href: '/patterns/memory-management',
      date: '2026-03-01',
    },
    {
      title: 'Task Delegation Pattern',
      description: 'Orchestrator verteilt Tasks an spezialisierte Agenten — Routing, Prioritäten, Deadlines.',
      href: '/patterns/task-delegation',
      date: '2026-03-01',
    },
    {
      title: 'Safety Hooks Pattern',
      description: 'Guardrails, Output-Validierung und Memory-Capture als automatische Sicherheitsschicht.',
      href: '/patterns/safety-hooks',
      date: '2026-03-01',
    },
    {
      title: 'Heartbeat & Monitoring Pattern',
      description: 'Wie du erkennst, ob Agenten laufen — Health Checks, Status-Updates, Alerting.',
      href: '/patterns/heartbeat-monitoring',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Patterns</h1>
        <p className="text-slate-400 mt-2">
          Erprobte Orchestration-Patterns für Multi-Agent Systeme in der Praxis.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-agent-orchestration.png" alt="Agent Orchestration Patterns" className="rounded-xl border border-white/10 w-full" />
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
