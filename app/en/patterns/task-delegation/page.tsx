import { CodeBlock } from '../../../../components/CodeBlock'
import { Metadata } from 'next'
import { alternatesFor } from '../../../../lib/alternates'
import { ArticleHero } from '../../../../components/ArticleHero'

export const metadata: Metadata = {
  openGraph: {
    type: 'article',
    images: [{ url: '/images/hero-2026-08/en/patterns/task-delegation.webp', width: 1344, height: 768, type: 'image/webp' }],
  },
  alternates: alternatesFor('/en/patterns/task-delegation'),
  title: 'Task Delegation Pattern',
  description: 'Orchestrator assigns tasks to specialized agents. Routing, priorities, deadlines.',
}

export default function TaskDelegationPage() {
  return (
    <div className="space-y-8">
      <ArticleHero src="/images/hero-2026-08/en/patterns/task-delegation.webp" alt={'Task Delegation Pattern'} />
      <div>
        <h1 className="text-3xl font-bold text-white">Task Delegation Pattern</h1>
        <p className="text-slate-400 mt-2">Patterns · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">The Problem</h2>
        <p className="text-slate-300">
          A single agent can't do everything better than specialized tools. 
          You need a system that selects the right agent for the right task.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/patterns-task-delegation.png" alt="Architecture — illustration from the German article" className="rounded-xl border border-white/10 w-full" loading="lazy" />
        </figure>
        <h2 className="text-xl font-semibold text-white mt-8">Architecture</h2>
        <CodeBlock lang="en">
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`User Request
     |
     v
[Orchestrator Agent]
     |
     +---> [Research Agent] ----> Web Search, Docs
     |
     +---> [Coder Agent] ----> Code Generation
     |
     +---> [Review Agent] ----> PR Review, Tests
     |
     v
  Final Response`}</code>
        </pre>
        </CodeBlock>

        <h2 className="text-xl font-semibold text-white mt-8">Implementation</h2>

        <h3 className="text-lg font-semibold text-white mt-6">1. Intent Classification</h3>
        <p className="text-slate-300">
          The Orchestrator classifies the user request and routes it to the appropriate agent.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">2. Routing Matrix</h3>
        <CodeBlock lang="en">
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`const routes = {
  'code-generation': coderAgent,
  'research': researchAgent,
  'review': reviewAgent,
  'deployment': deployAgent,
  'question': qaAgent,
}`}</code>
        </pre>
        </CodeBlock>

        <h3 className="text-lg font-semibold text-white mt-6">3. Priority Queue</h3>
        <p className="text-slate-300">
          For multiple concurrent tasks: Set priorities (1 = highest). 
          Deadline tracking prevents tasks from waiting forever.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">4. Result Aggregation</h3>
        <p className="text-slate-300">
          The Orchestrator collects results from all sub-agents and synthesizes a final response.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Important Aspects</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>Timeout:</strong> Each sub-agent needs a max timeout</li>
          <li><strong>Retry:</strong> Max 2x on errors</li>
          <li><strong>Fallback:</strong> What if all agents fail?</li>
          <li><strong>Cost Control:</strong> Budget limits per task</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Sources</h2>
        <ul>
          <li><a href="https://arxiv.org/abs/2308.11432" target="_blank" className="text-blue-400 hover:underline">Agent Architectures (ArXiv)</a></li>
          <li><a href="https://kore.ai/" target="_blank" className="text-blue-400 hover:underline">Kore.ai Agent Orchestration</a></li>
        </ul>
      </div>
    </div>
  )
}
