import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Orchestration Patterns | AI Engineering Wiki',
  description: 'Proven orchestration patterns for Multi-Agent Systems: sequential, parallel, hierarchical, router, and supervisor.',
}

export default function AgentOrchestrationPatternsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Agent Orchestration Patterns</h1>
        <p className="text-slate-400 mt-2">Patterns · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          How do you coordinate multiple AI agents? There are proven patterns for that.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">1. Sequential Pattern</h2>
        <p className="text-slate-300">
          Agent A → Agent B → Agent C. Each waits for the previous.
        </p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">Research → Summary → Translation</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">2. Parallel Pattern</h2>
        <p className="text-slate-300">
          Several agents work simultaneously on different tasks.
        </p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">Research A → \
Research B → \
Research C → Aggregate</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">3. Hierarchical Pattern</h2>
        <p className="text-slate-300">
          Manager coordinates sub-managers who coordinate workers.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">4. Hub & Spoke</h2>
        <p className="text-slate-300">
          Central hub connects to all agents, routes requests.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">5. Pipeline</h2>
        <p className="text-slate-300">
          Data flows through agents like a pipeline. Each transforms the data.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">When to Use What</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Pattern</th>
              <th className="text-left py-2 text-slate-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">Sequential</td>
              <td className="py-2">Dependent tasks</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Parallel</td>
              <td className="py-2">Independent tasks</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Hierarchical</td>
              <td className="py-2">Large teams</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Hub & Spoke</td>
              <td className="py-2">Simple routing</td>
            </tr>
            <tr>
              <td className="py-2">Pipeline</td>
              <td className="py-2">Data transformation</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
