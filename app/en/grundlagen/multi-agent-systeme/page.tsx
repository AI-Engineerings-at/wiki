import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Multi-Agent Systems Explained | AI Engineering Wiki',
  description: 'How multiple AI agents work together, how they communicate, and why it beats a single LLM.',
}

export default function MultiAgentSystemePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Multi-Agent Systems Explained</h1>
        <p className="text-slate-400 mt-2">Basics · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          Multi-Agent Systems (MAS) are systems where multiple AI agents work together to solve complex problems. 
          Instead of one all-powerful AI, you have specialized agents that communicate and collaborate.
        </p>

        <h2>Why Multiple Agents?</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>Specialization:</strong> Each agent can be optimized for a specific task</li>
          <li><strong>Scalability:</strong> Add more agents as needed</li>
          <li><strong>Robustness:</strong> System continues even if one agent fails</li>
          <li><strong>Cost efficiency:</strong> Use simple agents for simple tasks</li>
        </ul>

        <h2>Agent Types</h2>

        <h3>1. Research Agent</h3>
        <p className="text-slate-300">Searches the web, reads documents, gathers information.</p>

        <h3>2. Coder Agent</h3>
        <p className="text-slate-300">Writes code, fixes bugs, implements features.</p>

        <h3>3. Review Agent</h3>
        <p className="text-slate-300">Reviews code, checks tests, ensures quality.</p>

        <h3>4. Deploy Agent</h3>
        <p className="text-slate-300">Deploys to production, manages infrastructure.</p>

        <h3>5. QA Agent</h3>
        <p className="text-slate-300">Runs tests, reports bugs, validates outputs.</p>

        <h2>Communication Patterns</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Pattern</th>
              <th className="text-left py-2 text-slate-400">Use Case</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">Message Passing</td>
              <td className="py-2">Direct communication between agents</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Blackboard</td>
              <td className="py-2">Shared memory all agents access</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Publish/Subscribe</td>
              <td className="py-2">Agents subscribe to topics</td>
            </tr>
            <tr>
              <td className="py-2">Orchestrator</td>
              <td className="py-2">Central agent coordinates all</td>
            </tr>
          </tbody>
        </table>

        <h2>Real-World Example</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`User: "Write a web app"
  |
  v
[Orchestrator]
  |
  +--> [Research Agent] --> "Best frameworks for web apps"
  |
  +--> [Coder Agent] --> "Writes the code"
  |
  +--> [Review Agent] --> "Reviews the code"
  |
  v
Final Web App`}</code>
        </pre>
      </div>
    </div>
  )
}
