import Link from 'next/link'

export const metadata = {
  title: 'Learning Path: From Zero to Production | AI Engineering Wiki',
  description:
    'The structured entry point into local AI systems — from the basics to a production-ready multi-agent stack. 8 levels, no prior knowledge required.',
}

const steps = [
  {
    level: 0,
    title: 'What is a Large Language Model?',
    description:
      'LLMs are not search engines and not thinking systems. Understand token prediction, hallucination, and why models sometimes make things up — before you start.',
    href: '/blog/2026-03-12-was-ist-ein-llm',
    readTime: '~8 min',
    available: true,
  },
  {
    level: 1,
    title: 'Why local instead of cloud?',
    description:
      'GDPR, EU AI Act, data sovereignty: what is at stake when company data flows into cloud models — and what this concretely means for you.',
    href: '/blog/2026-03-12-warum-lokale-ki-statt-cloud',
    readTime: '~7 min',
    available: true,
  },
  {
    level: 2,
    title: 'Terminal basics for AI',
    description:
      '10 commands — that is all that stands between you and your first local LLM. cd, curl, docker ps, ssh, grep and more.',
    href: '/blog/2026-03-12-terminal-grundlagen-für-ai',
    readTime: '~6 min',
    available: true,
  },
  {
    level: 3,
    title: 'Install Ollama',
    description:
      'Your first local model running in 5 minutes. One installation, one command — and you are chatting with Qwen or Llama completely offline.',
    href: '/blog/2026-03-12-ollama-installieren-schritt-für-schritt',
    readTime: '~8 min',
    available: true,
  },
  {
    level: 4,
    title: 'First chatbot with Open WebUI',
    description:
      'From terminal chat to a browser interface. Open WebUI gives you a ChatGPT-like interface for your local models — as a Docker container.',
    href: '/blog/2026-03-12-open-webui-erster-chatbot',
    readTime: '~10 min',
    available: true,
  },
  {
    level: 5,
    title: 'Docker basics for AI',
    description:
      'No modern AI stack runs without Docker. Containers, volumes, Compose — the concepts you actually need, without getting lost in irrelevant details.',
    href: '/blog/2026-03-12-docker-grundlagen-für-ai',
    readTime: '~12 min',
    available: true,
  },
  {
    level: 6,
    title: 'Build an agent stack',
    description:
      'Multiple agents working together. A manager agent delegates tasks to specialists. This is the core of modern AI Engineering.',
    href: '/en/grundlagen/ai-agent-team',
    readTime: '~25 min',
    available: true,
  },
  {
    level: 7,
    title: 'n8n automation',
    description:
      'AI without automation is just a chatbot. n8n connects your stack to emails, webhooks and APIs — so real workflows run without manual intervention.',
    href: '/en/tools/n8n-für-anfaenger',
    readTime: '~20 min',
    available: true,
  },
  {
    level: 8,
    title: 'Production Ready → Playbook',
    description:
      'Monitoring, security, backup. The complete stack with tested Docker Compose files, Grafana dashboards, n8n templates and GDPR checklists.',
    href: 'https://www.ai-engineering.at/products',
    readTime: 'EUR 49',
    available: true,
    isCta: true,
  },
]

export default function LearningPathPage() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <p className="text-sm text-[#4262FF] font-semibold uppercase tracking-wide mb-2">
          Learning Path
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          From Zero to Production
        </h1>
        <p className="text-lg text-slate-400 mt-3">
          The structured entry point into local AI systems — from the basics
          to a production-ready multi-agent stack. No prior knowledge required.
        </p>
      </div>

      {/* Target audience */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
          Who is this path for?
        </h2>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li className="flex gap-2">
            <span className="text-[#4262FF] shrink-0">→</span>
            Developers and IT professionals who want to <strong className="text-white">understand</strong> AI — not just use it
          </li>
          <li className="flex gap-2">
            <span className="text-[#4262FF] shrink-0">→</span>
            Companies that cannot use cloud solutions due to <strong className="text-white">GDPR and EU AI Act</strong>
          </li>
          <li className="flex gap-2">
            <span className="text-[#4262FF] shrink-0">→</span>
            Beginners without AI background who want to <strong className="text-white">learn step by step</strong>
          </li>
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.level} className="relative">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="absolute left-5 top-full w-px h-4 bg-slate-800 z-10" />
            )}

            {step.isCta ? (
              <a
                href={step.href}
                target={step.href.startsWith('http') ? '_blank' : undefined}
                rel={step.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block p-5 bg-gradient-to-r from-[#4262FF]/10 to-blue-600/5 border border-[#4262FF]/40 rounded-xl hover:border-[#4262FF] transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#4262FF] flex items-center justify-center text-white font-bold text-sm">
                    {step.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-white group-hover:text-[#4262FF] transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-xs bg-[#4262FF] text-white px-2 py-0.5 rounded font-medium">
                        {step.readTime}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              </a>
            ) : (
              <Link
                href={step.href}
                className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-[#4262FF]/50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm transition-colors">
                    {step.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-white group-hover:text-[#4262FF] transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-xs text-slate-500">{step.readTime}</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          Ready to build the complete stack?
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          The P1 Playbook gives you tested configs, Grafana dashboards,
          n8n templates and GDPR checklists for your local AI stack.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.ai-engineering.at/products"
            className="bg-[#4262FF] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Playbook P1 — EUR 49
          </a>
          <a
            href="https://www.ai-engineering.at/contact"
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Free consultation
          </a>
        </div>
      </div>
    </div>
  )
}
