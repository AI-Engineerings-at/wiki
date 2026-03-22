export const metadata = {
  title: 'Basics | AI Engineering Wiki',
  description:
    'Getting started with Agent Orchestration, Multi-Agent Systems and a GDPR-compliant local AI stack: roles, costs, local vs cloud, quickstart.',
  openGraph: {
    images: [{ url: '/images/og/og-grundlagen.png', width: 1200, height: 630, alt: 'AI Engineering Wiki — Grundlagen' }],
  },
}

export default function BasicsPage() {
  const articles = [
    {
      title: 'What is Agent Orchestration?',
      description: 'Introduction to Agent Orchestration and Multi-Agent Systems.',
      href: '/en/grundlagen/was-ist-agent-orchestration',
      date: '2026-03-01',
    },
    {
      title: 'Multi-Agent Systems Explained',
      description: "How multiple AI agents work together and why it's better than a single LLM.",
      href: '/en/grundlagen/multi-agent-systeme',
      date: '2026-03-01',
    },
    {
      title: 'Agent Roles & Responsibilities',
      description: 'Developer, QA, Infra, Browser — what roles does an agent team need?',
      href: '/en/grundlagen/agent-rollen',
      date: '2026-03-01',
    },
    {
      title: 'Local AI vs Cloud: TCO Comparison',
      description: 'What does Self-Hosted AI really cost? Hardware, electricity, maintenance vs API costs.',
      href: '/en/grundlagen/lokal-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: 'Ollama vs Cloud LLM',
      description: 'When local, when cloud? Quality, costs, data privacy.',
      href: '/en/grundlagen/ollama-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: 'Building an AI Agent Team',
      description: 'Types of agents, team structure, tools integration.',
      href: '/en/grundlagen/ai-agent-team',
      date: '2026-03-01',
    },
    {
      title: 'Self-hosted vs Cloud Services',
      description: 'Which services to self-host, and which to run in the cloud.',
      href: '/en/grundlagen/selfhosted-vs-cloud',
      date: '2026-03-01',
    },
    {
      title: '30-Day Quickstart Guide',
      description: 'Build your own AI stack in 30 days. Day-by-day guide.',
      href: '/en/grundlagen/30-tage-quickstart',
      date: '2026-03-01',
    },
    {
      title: 'AI in the Enterprise',
      description: 'Why companies use local AI: privacy, cost control, and sovereignty.',
      href: '/en/grundlagen/ki-unternehmen',
      date: '2026-03-01',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Basics</h1>
        <p className="text-slate-400 mt-2">
          Getting started with Agent Orchestration, Multi-Agent Systems and AI Infrastructure.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-was-ist-llm.png" alt="AI Basics — LLMs, Agents, local systems" className="rounded-xl border border-white/10 w-full" />
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
