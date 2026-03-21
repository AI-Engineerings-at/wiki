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
          When most people think of AI, they think of chatbots: You type a question, the AI answers,
          the conversation ends, and the AI forgets everything. That is single-shot interaction —
          useful, but limited.
        </p>
        <p className="text-gray-300 mt-2">
          An AI agent is different. An agent is an AI system that runs continuously, waits for tasks,
          executes them independently, and reports results — without you having to initiate every
          interaction. Instead of you going to the AI, the AI comes to you.
        </p>
        <p className="text-gray-300 mt-2">
          Think of the difference between a tool and an employee. A hammer is a tool — you pick it
          up, use it, put it down. An employee shows up every day, works independently, and escalates
          only when needed. AI agents are closer to the employee than to the tool.
        </p>
        <p className="text-gray-300 mt-2">
          An AI agent is a program that:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Plans independently</li>
          <li>Uses tools</li>
          <li>Makes decisions</li>
          <li>Processes feedback</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Why Multi-Agent Instead of Single Agent?</h2>
        <p className="text-gray-300">
          A single agent doing everything — coding, content, research, testing, monitoring — is
          like an employee who is simultaneously a developer, copywriter, QA tester, and sysadmin.
          It works on a small scale, but quality drops as the scope grows. Multi-agent teams solve
          this through specialization:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Better output quality:</strong> A focused agent delivers better results than a generalist. Its context is not diluted by irrelevant instructions.</li>
          <li><strong>Parallel execution:</strong> Multiple agents can work on different tasks simultaneously — code, blog post, and tests run in parallel instead of sequentially.</li>
          <li><strong>Clear accountability:</strong> When something goes wrong, you know which agent handled it. Debugging is easier.</li>
          <li><strong>Security through separation:</strong> The Research agent can read files but not modify them. The Content agent can draft posts but not publish them.</li>
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

        <h2 className="text-xl font-semibold text-white mt-8">Safety Rules from Real Incidents</h2>
        <p className="text-gray-300">
          Running an autonomous agent team teaches hard lessons. These rules come from real incidents:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Never allow destructive commands without human confirmation.</strong> An agent once deleted three hours of work because a task description was ambiguous.</li>
          <li><strong>Agents must never impersonate each other.</strong> Every agent must use its own bot token. Cross-posting breaks the audit trail.</li>
          <li><strong>Never overwrite shared memory files.</strong> Always append or edit specific sections, never replace the whole file.</li>
          <li><strong>Always announce before working on shared resources.</strong> When two agents modify the same file simultaneously, one agent's changes get overwritten.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">How Agents Communicate</h2>
        <p className="text-gray-300">
          In practice, agents communicate through team chat channels (e.g., Mattermost). Each agent
          has its own bot account. Tasks come in through the main channel, the manager delegates,
          and the assigned agent posts the result. This channel-based communication creates a
          transparent audit trail — you can trace exactly who did what and when.
        </p>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Getting Started</h3>
          <p className="text-gray-300">
            Start with one agent. Then expand as needed. Begin with the manager/orchestrator,
            then add workers as task volume grows.
          </p>
        </div>
      </div>
    </div>
  )
}
