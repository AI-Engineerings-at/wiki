export const metadata = {
  title: 'Build an AI Agent Team | AI Engineering Wiki',
  description:
    'How to build an AI agent team: agent types, roles, tool integration and guardrails. Designed for GDPR-compliant, self-hosted setups.',
}

export default function AiAgentTeam() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Building an AI Agent Team</h1>
        <p className="text-gray-400 mt-2">Basics · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          One AI agent isn't enough. You need a team — specialized agents that work together.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">What is an AI Agent?</h2>

        <p className="text-gray-300 mt-2">
          An AI agent is a program that:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Plans independently</li>
          <li>Uses tools</li>
          <li>Makes decisions</li>
          <li>Processes feedback</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Types of Agents</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Type</th>
                <th className="text-left py-2 text-gray-400">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">ReAct Agent</td>
                <td className="py-2">Reasoning + Action</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Tool Agent</td>
                <td className="py-2">Uses external tools</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Planner Agent</td>
                <td className="py-2">Breaks down tasks</td>
              </tr>
              <tr>
                <td className="py-2">Critic Agent</td>
                <td className="py-2">Checks outputs</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Team Structure</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Our Team
Manager (Planner)
  → Developer (write code)
  → Tester (check things)
  → Researcher (research)
  → Deployer (ship it)`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Key Components</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Memory:</strong> Context between sessions</li>
          <li><strong>Tools:</strong> What the agent can do</li>
          <li><strong>Persona:</strong> Personality, rules</li>
          <li><strong>Guardrails:</strong> Limits on what it can't do</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Tools Integration</h2>

        <p className="text-gray-300">
          Our agents can:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Write and execute code</li>
          <li>Git operations</li>
          <li>Docker commands</li>
          <li>Read/write files</li>
          <li>Web research</li>
          <li>Post messages (Mattermost)</li>
        </ul>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Getting Started</h3>
          <p className="text-gray-300">
            Start with one agent. Then expand as needed.
          </p>
        </div>
      </div>
    </div>
  )
}
