import Link from 'next/link'

export const metadata = {
  title: 'AI Engineering Wiki — Agent Orchestration & Local AI Stack',
  description:
    'Knowledge base for GDPR-compliant, 100% self-hosted AI stacks: Agent Orchestration, Multi-Agent Systems, tools, security and compliance.',
}

export default function HomePage() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          AI Engineering <span className="text-[#4262FF]">Wiki</span>
        </h1>
        <p className="text-xl text-slate-400">
          The knowledge base for local AI, GDPR-compliant stacks, Agent Orchestration and Multi-Agent Systems.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/en/grundlagen" className="group">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all h-full">
            <div className="text-3xl mb-3">📚</div>
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Basics</h2>
            <p className="text-slate-400 text-sm mt-2">
              Agent Orchestration, Multi-Agent Systems, Local vs Cloud, Costs
            </p>
          </div>
        </Link>

        <Link href="/en/tools" className="group">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all h-full">
            <div className="text-3xl mb-3">🛠️</div>
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Tools</h2>
            <p className="text-slate-400 text-sm mt-2">
              Ollama, n8n, Docker, Grafana, RAG, Proxmox
            </p>
          </div>
        </Link>

        <Link href="/en/patterns" className="group">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all h-full">
            <div className="text-3xl mb-3">🔄</div>
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Patterns</h2>
            <p className="text-slate-400 text-sm mt-2">
              Memory Management, Task Delegation, Safety Hooks, Monitoring
            </p>
          </div>
        </Link>

        <Link href="/en/security" className="group">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all h-full">
            <div className="text-3xl mb-3">🔒</div>
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Security</h2>
            <p className="text-slate-400 text-sm mt-2">
              API Keys, Firewall, Backup Strategies
            </p>
          </div>
        </Link>

        <Link href="/en/compliance" className="group">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all h-full">
            <div className="text-3xl mb-3">⚖️</div>
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Compliance</h2>
            <p className="text-slate-400 text-sm mt-2">
              GDPR, EU AI Act, Privacy Practices
            </p>
          </div>
        </Link>

        <Link href="/en/support" className="group">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all h-full">
            <div className="text-3xl mb-3">🆘</div>
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Support</h2>
            <p className="text-slate-400 text-sm mt-2">
              Troubleshooting, Common Issues
            </p>
          </div>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to build your AI Stack?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Get the complete playbook with 120+ pages of tested setups, code snippets, and GDPR templates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://buy.stripe.com/8x28wP7VBbapbdQgs4fQI00" 
              className="bg-[#4262FF] hover:bg-[#3550DD] text-slate-950 font-bold py-3 px-8 rounded-full transition-all hover:scale-105"
            >
              Get Playbook 01 — €49
            </a>
            <a 
              href="https://www.ai-engineering.at/products" 
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full transition-all"
            >
              View All Products
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
