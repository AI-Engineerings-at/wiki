export const metadata = {
  title: 'Scaling Agent Teams | AI Engineering Wiki',
  description:
    'Add new agents, create multi-agent workflows, and scale an agent team: step-by-step guide with practical patterns.',
}

export default function AgentScaling() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Scaling and Customizing Agent Teams</h1>
        <p className="text-gray-400 mt-2">Patterns · 9 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          An agent team grows with your requirements. New agents follow a five-step process:
          define role, create bot, write configuration, set up polling, register with manager.
          When scaling to five or more agents, API costs, machine resources, and coordination
          complexity become important factors.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Adding a New Agent</h2>
        <p className="text-gray-300">
          Adding a new agent follows a repeatable process. Here is an example with a customer
          support agent:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">1</span>
              <h3 className="font-semibold text-white">Define the Role</h3>
            </div>
            <p className="text-gray-300 text-sm">
              What does this agent do? The customer support agent reads incoming customer emails,
              drafts appropriate responses, categorizes the inquiry, and escalates complex issues
              to a human.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">2</span>
              <h3 className="font-semibold text-white">Create Bot Account</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Create a new bot in the team chat (e.g., Mattermost) with a descriptive name.
              Generate the access token and store it securely.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">3</span>
              <h3 className="font-semibold text-white">Write Configuration</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Create a CLAUDE.md that defines the role, tools, and context. The support agent
              needs access to product documentation, pricing information, return policies, and
              the brand voice guide. It should be able to read and write files but not execute
              system commands.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">4</span>
              <h3 className="font-semibold text-white">Configure Polling</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Configure the polling script with the new bot's token and user ID and set it to
              monitor the appropriate channels.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">5</span>
              <h3 className="font-semibold text-white">Register with Manager</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Update the manager's CLAUDE.md to include the new agent in its roster and
              delegation rules. Define when the manager should route tasks to the new agent.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Adjusting Existing Roles</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Expand scope:</strong> Give the coding agent responsibility for database migrations in addition to feature development</li>
          <li><strong>Narrow scope:</strong> Split a generalist agent into two specialists when the workload grows</li>
        </ul>
        <p className="text-gray-300 mt-2">
          When narrowing scope: Update the manager's delegation rules. If you split the coding
          agent into frontend and backend, the manager needs to know which type of task goes where.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Multi-Agent Workflows</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Workflow</th>
                <th className="text-left py-2 text-gray-400">Sequence</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 font-semibold">Content Pipeline</td>
                <td className="py-2">Research Agent creates brief &#8594; Content Agent writes post &#8594; QA Agent reviews &#8594; Manager coordinates</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-semibold">Deployment</td>
                <td className="py-2">Coding Agent prepares release &#8594; QA tests &#8594; Coding deploys &#8594; Monitoring verifies &#8594; Content writes release notes</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Customer Onboarding</td>
                <td className="py-2">Support receives customer &#8594; Content creates welcome email &#8594; Coding provisions account &#8594; Manager tracks completion</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Scaling Factors</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Factor</th>
                <th className="text-left py-2 text-gray-400">Details</th>
                <th className="text-left py-2 text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">API Costs</td>
                <td className="py-2">Each agent consumes credits when processing tasks</td>
                <td className="py-2">Adjust polling intervals: busy agent every 30s, quiet agent every 5min</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Machine Resources</td>
                <td className="py-2">Each instance uses memory and CPU</td>
                <td className="py-2">2-3 agents per machine, distribute across machines for larger teams</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Channel Noise</td>
                <td className="py-2">More agents = busier main channel</td>
                <td className="py-2">Create sub-channels for different workflows</td>
              </tr>
              <tr>
                <td className="py-2">Coordination</td>
                <td className="py-2">With 5+ agents: casual coordination is not enough</td>
                <td className="py-2">Document structured delegation rules, priority systems, conflict resolution</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Advanced Patterns</h2>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Scheduled Agents</h3>
            <p className="text-gray-300 text-sm mt-1">
              Not all agents need to respond to mentions. Some work on schedules: the monitoring
              agent checks infrastructure every five minutes, the analytics agent compiles daily
              reports, the backup agent verifies backups every night. For scheduled agents, replace
              the polling loop with a cron-triggered script.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Cross-Agent Memory</h3>
            <p className="text-gray-300 text-sm mt-1">
              Agents can share context through a common MEMORY.md file. The coding agent notes
              a deployment, the QA agent then knows what to test, the monitoring agent knows
              what to watch for. Shared memory creates team awareness without direct communication.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Graceful Degradation</h3>
            <p className="text-gray-300 text-sm mt-1">
              When an agent goes offline, the system should not grind to a halt. The manager
              should recognize when a delegated task gets no response and either retry, delegate
              to an alternative agent, or escalate to a human. Build this timeout logic into
              the manager's CLAUDE.md.
            </p>
          </div>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Further Reading</h3>
          <ul className="text-gray-300 space-y-1">
            <li>{"• "}<a href="/en/grundlagen/agent-rollen" className="text-blue-400 hover:underline">Agent Roles</a> — Understanding the role model</li>
            <li>{"• "}<a href="/en/grundlagen/ai-agent-team" className="text-blue-400 hover:underline">Building an AI Agent Team</a> — From zero to first team</li>
            <li>{"• "}<a href="/en/patterns/memory-management" className="text-blue-400 hover:underline">Memory Management</a> — How agents share knowledge across sessions</li>
          </ul>
        </div>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://platform.claude.com/docs/en/docs/build-with-claude/agent-patterns" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Agent Patterns</a> — Multi-Agent Orchestration</li>
            <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Claude Code Overview</a> — Skills, agents, hooks</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
