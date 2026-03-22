import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What is Agent Orchestration? | AI Engineering Wiki',
  description: 'Agent Orchestration coordinates multiple specialized AI agents. Roles, communication flow, and why it beats a single LLM.',
}

export default function WasIstAgentOrchestrationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">What is Agent Orchestration?</h1>
        <p className="text-gray-400 mt-2">Basics · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Agent Orchestration coordinates multiple AI agents that work together on complex tasks.
          Instead of a single chat, you run a team of specialized agents with clear responsibilities.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">The problem with a single LLM</h2>
        <p className="text-gray-300">
          A single Large Language Model (LLM) like ChatGPT can handle plenty of tasks, but it has real limits:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>No persistent memory between sessions</li>
          <li>Can't execute code changes on its own</li>
          <li>No access to your infrastructure</li>
          <li>Works in isolation — no teamwork possible</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">The solution: Multi-Agent System</h2>
        <p className="text-gray-300">
          With agent orchestration, you create multiple specialized agents, each with a specific role:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Example: Agent Team</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Agent</th>
                <th className="text-left py-2 text-gray-400">Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Manager-Agent</td>
                <td className="py-2">Manager — prioritization, approvals</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Developer-Agent</td>
                <td className="py-2">Frontend/App/CI — Next.js, tests</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Infrastructure-Agent</td>
                <td className="py-2">Backend/Infra — n8n, Docker, monitoring</td>
              </tr>
              <tr>
                <td className="py-2">QA-Agent</td>
                <td className="py-2">QA/Content — testing, research</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Communication</h2>
        <p className="text-gray-300">
          Agents communicate through a central bus. We use Team-Chat for this. 
          Each agent has its own polling scripts that respond to messages relevant to them.
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-2">Communication flow</h3>
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`1. Joe posts task in #echo_log
    ↓
2. Manager-Agent (Manager) prioritizes and delegates
    ↓
3. Developer-Agent → writes code
   Infrastructure-Agent → prepares infrastructure
   QA-Agent → checks content
    ↓
4. All post results back
    ↓
5. Manager-Agent aggregates and reports completion`}
          </pre>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Benefits</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Parallelization:</strong> Run multiple agents at the same time</li>
          <li><strong>Specialization:</strong> Each agent is an expert in their domain</li>
          <li><strong>Scalability:</strong> Adding a new agent is straightforward</li>
          <li><strong>Auditability:</strong> Every action gets logged to Team-Chat</li>
          <li><strong>GDPR:</strong> Everything stays local — no prompt training on your data</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Tech Stack</h2>
        <p className="text-gray-300">
          Our setup uses:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Team-Chat</strong> — Team chat as the message bus</li>
          <li><strong>n8n</strong> — Workflow automation</li>
          <li><strong>Docker Swarm</strong> — Container orchestration</li>
          <li><strong>Claude Code</strong> — CLI access to LLM capabilities</li>
          <li><strong>Prometheus + Grafana</strong> — Monitoring</li>
        </ul>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Next steps</h3>
          <p className="text-gray-300">
            Want to learn more about Multi-Agent Systems? Continue to:{" "}
            <a href="/en/grundlagen/multi-agent-systeme" className="text-blue-400 hover:underline">
              Multi-Agent Systems Explained →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
