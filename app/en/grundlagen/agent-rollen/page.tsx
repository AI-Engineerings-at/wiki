export const metadata = {
  title: 'Agent Roles & Responsibilities | AI Engineering Wiki',
  description:
    'Role model for Multi-Agent Systems: orchestrator, workers, QA/review and infra. Clear ownership, boundaries and escalation paths in practice.',
}

export default function AgentRollen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Agent Roles and Responsibilities</h1>
        <p className="text-gray-400 mt-2">Basics · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          A working multi-agent system needs clear roles. Each agent needs to know what its job is, 
          where its boundaries are, and who to escalate to when things go wrong — just like a human team.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">The Minimum Viable Team</h2>
        <p className="text-gray-300">
          For most use cases, you need at least these three roles:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">MANAGER</span>
              <h3 className="font-semibold text-white">Manager / Orchestrator</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Coordinates all other agents. Takes requests, prioritizes them, and delegates to the right workers. 
              In our setup: @jim
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">WORKER</span>
              <h3 className="font-semibold text-white">Worker / Executor</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Does the actual work. Writing code, setting up infrastructure, creating content. 
              In our setup: @jim01, @lisa01, @john01
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded">GUARD</span>
              <h3 className="font-semibold text-white">Guard / Quality Assurance</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Checks the workers' work. Runs tests, validates outputs, catches bugs. 
              Can be standalone or integrated into workers.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Why Agents Need Tool Restrictions</h2>
        <p className="text-gray-300">
          Why not just give every agent access to every tool? The answer is security. You would not
          give your intern the keys to the production server. Restricting access is not about mistrust
          — it is about preventing accidents.
        </p>
        <p className="text-gray-300 mt-2">
          A Researcher agent is a perfect example: Its job is to investigate and analyze. It reads
          files, searches for information, and compiles reports. But it cannot write files or execute
          system commands. A research task should never accidentally overwrite an important file. The
          restriction makes the agent safer without making it less useful for its actual job.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Context Loading: Why Each Agent Reads Different Files</h2>
        <p className="text-gray-300">
          When an agent is activated, it does not load every file in the system. It loads only the
          files relevant to its role. The Shop Manager loads the product catalog and pricing
          information. The Content Writer loads the brand voice guide and the editorial calendar.
        </p>
        <p className="text-gray-300 mt-2">
          This selective context loading serves two purposes: First, it keeps the agent focused —
          an agent with less but more relevant context delivers better results. Second, it saves
          token usage, meaning faster responses and lower API costs.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Extended Roles</h2>
        <p className="text-gray-300">
          For more complex setups, these roles can be added:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Role</th>
                <th className="text-left py-2 text-gray-400">Task</th>
                <th className="text-left py-2 text-gray-400">Tooling</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Researcher</td>
                <td className="py-2">Research, fact-checking, sources</td>
                <td className="py-2">Web search, RSS</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Browser</td>
                <td className="py-2">Web actions, screenshots</td>
                <td className="py-2">Playwright, Puppeteer</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Infra</td>
                <td className="py-2">Deploy, monitoring, backups</td>
                <td className="py-2">Docker, Prometheus</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Security</td>
                <td className="py-2">Access control, auditing</td>
                <td className="py-2">Vault, logs</td>
              </tr>
              <tr>
                <td className="py-2">Support</td>
                <td className="py-2">Customer requests, tickets</td>
                <td className="py-2">Email, chat</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Our Team as Reference</h2>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Agent</th>
                <th className="text-left py-2 text-gray-400">Role</th>
                <th className="text-left py-2 text-gray-400">Responsibility</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">@joe</td>
                <td className="py-2">CEO / Requester</td>
                <td className="py-2">Final decisions, business strategy</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">@jim</td>
                <td className="py-2">Manager</td>
                <td className="py-2">Prioritization, coordination, escalations</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">@jim01</td>
                <td className="py-2">Worker: Frontend/App/CI</td>
                <td className="py-2">Next.js, E2E tests, Git, deploy</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">@lisa01</td>
                <td className="py-2">Worker: Backend/Infra</td>
                <td className="py-2">n8n, Docker, monitoring, delivery</td>
              </tr>
              <tr>
                <td className="py-2 text-white">@john01</td>
                <td className="py-2">Worker: QA/Content</td>
                <td className="py-2">Testing, research, screenshots</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Responsibility Chains (RACI)</h2>
        <p className="text-gray-300">
          For every task, it should be clear who does what. We use RACI:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Letter</th>
                <th className="text-left py-2 text-gray-400">Meaning</th>
                <th className="text-left py-2 text-gray-400">In the team</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2"><strong>R</strong>esponsible</td>
                <td className="py-2">Does the task</td>
                <td className="py-2">Worker agent</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2"><strong>A</strong>ccountable</td>
                <td className="py-2">Responsible for result</td>
                <td className="py-2">Manager agent</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2"><strong>C</strong>onsulted</td>
                <td className="py-2">Gets asked</td>
                <td className="py-2">Other workers</td>
              </tr>
              <tr>
                <td className="py-2"><strong>I</strong>nformed</td>
                <td className="py-2">Gets told</td>
                <td className="py-2">Everyone / CEO</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Agent Collaboration and Handoffs</h2>
        <p className="text-gray-300">
          Sometimes a task requires more than one agent. For example: "Research our top competitor
          and then write a blog post comparing our product with theirs." This involves the Researcher
          agent gathering information and the Content Writer agent creating the blog post.
        </p>
        <p className="text-gray-300 mt-2">
          The system handles this through handoffs: The first agent completes its part of the work
          and stores the result. The second agent picks up that result as input and continues. Each
          agent works within its own boundaries, but the outcome is seamless collaboration — the
          security benefits of restricted specialists combined with the flexibility of multi-agent
          cooperation.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Defining Boundaries</h2>
        <p className="text-gray-300">
          Every agent needs to know what it should NOT do:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li>No credential changes without approval</li>
          <li>No destructive commands (rm -rf, etc.) without explicit approval</li>
          <li>No external API calls without context</li>
          <li>No outputs over 10,000 tokens without chunking</li>
          <li>No production changes without tests passing</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Escalation Paths</h2>
        <p className="text-gray-300">
          When something goes wrong, there are clear escalation levels:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <pre className="text-sm text-gray-300">
{`1. Worker detects problem → tries fix (2 attempts)
   ↓
2. Fix doesn't work → posts error + context in channel
   ↓
3. Manager (@jim) takes over → either:
   a) Solve it themselves
   b) Delegate to another worker
   ↓
4. Manager can't solve → escalates to CEO (@joe)
   ↓
5. CEO decides → continue / discard / get external help`}
          </pre>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Checklist: Define Your Own Roles</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>[ ] What tasks does my team have?</li>
            <li>[ ] Who is responsible for what (RACI)?</li>
            <li>[ ] What boundaries does each agent have?</li>
            <li>[ ] How do we escalate problems?</li>
            <li>[ ] What tools does each agent use?</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
