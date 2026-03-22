export const metadata = {
  title: 'Patterns | AI Engineering Wiki',
  description:
    'Proven Agent Orchestration patterns: memory management, task delegation, safety hooks and monitoring for Multi-Agent Systems.',
  openGraph: {
    images: [{ url: '/images/og/og-patterns.png', width: 1200, height: 630, alt: 'AI Engineering Wiki — Patterns' }],
  },
}

export default function PatternsPage() {
  const articles = [
    {
      title: 'Agent Orchestration Patterns',
      description: 'Overview of proven orchestration patterns for Multi-Agent Systems.',
      href: '/en/patterns/agent-orchestration-patterns',
      date: '2026-03-01',
    },
    {
      title: 'Memory Management Pattern',
      description: 'How AI agents store and retrieve persistent knowledge.',
      href: '/en/patterns/memory-management',
      date: '2026-03-01',
    },
    {
      title: 'Task Delegation Pattern',
      description: 'How an orchestrator assigns tasks to specialized agents (routing, priority, deadlines).',
      href: '/en/patterns/task-delegation',
      date: '2026-03-01',
    },
    {
      title: 'Safety Hooks Pattern',
      description: 'Guardrails, output validation, and memory capture as an automatic safety layer.',
      href: '/en/patterns/safety-hooks',
      date: '2026-03-01',
    },
    {
      title: 'Heartbeat & Monitoring',
      description: 'How to know if agents are running: health checks, status updates, and alerting.',
      href: '/en/patterns/heartbeat-monitoring',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Patterns</h1>
        <p className="text-slate-400 mt-2">
          Proven orchestration patterns for Multi-Agent Systems in practice.
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
