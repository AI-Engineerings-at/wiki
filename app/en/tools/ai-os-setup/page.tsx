export const metadata = {
  title: 'AI OS Setup Guide | AI Engineering Wiki',
  description:
    'Set up Claude Code as an AI operating system: folder structure, business setup wizard, context files, and first commands in 15 minutes.',
}

export default function AiOsSetup() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI OS Setup Guide</h1>
        <p className="text-gray-400 mt-2">Tools · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          An AI OS turns Claude Code from a one-shot tool into a persistent operating system for
          your business. You need only Claude Code and Python 3.10+. Setup takes about fifteen
          minutes: copy the template, run the business wizard, test your first commands.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Prerequisites</h2>
        <p className="text-gray-300">
          You need exactly two things on your machine:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li><strong>Claude Code</strong> — Anthropic's command-line interface for Claude</li>
          <li><strong>Python 3.10+</strong> — most modern systems already have this</li>
        </ul>
        <p className="text-gray-300 mt-2">
          No Docker containers, no cloud services, no complex infrastructure. The AI OS runs
          entirely on your local machine through Claude Code.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Step 1: Understand the Folder Structure</h2>
        <p className="text-gray-300">
          The AI OS consists of three core folders:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">.claude/</h3>
            <p className="text-gray-300 text-sm mt-1">
              The "system" folder. Contains skills, agent definitions, hooks, and settings.
              Hidden by default on Mac and Linux (dot folder).
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">context/</h3>
            <p className="text-gray-300 text-sm mt-1">
              Your business information: company profile, brand voice, product catalog.
              Loaded automatically at every startup.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">memory/</h3>
            <p className="text-gray-300 text-sm mt-1">
              Persistent knowledge: MEMORY.md (core facts), daily logs, key decisions.
              Claude learns over time.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Step 2: Run the Business Setup Wizard</h2>
        <p className="text-gray-300">
          Open Claude Code in your project directory and start the setup wizard.
          The wizard has three phases:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Phase 1: Business Profile</h3>
            <p className="text-gray-300 text-sm mt-1">
              Business name, what you do, ideal customers, products and services, current business
              goals. Output: <code>context/my-business.md</code>
            </p>
          </div>

          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Phase 2: Brand Voice</h3>
            <p className="text-gray-300 text-sm mt-1">
              Communication style, formal or casual, frequently used words, example content.
              Output: <code>context/my-voice.md</code> — makes AI content sound like you instead
              of generic AI.
            </p>
          </div>

          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Phase 3: Operational Setup</h3>
            <p className="text-gray-300 text-sm mt-1">
              Workflows, tools, team size, processes. Payment providers, social media channels,
              newsletters. Output: <code>context/my-products.md</code>
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Step 3: Verify Everything Works</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Test</th>
                <th className="text-left py-2 text-gray-400">Command</th>
                <th className="text-left py-2 text-gray-400">Expected</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Context</td>
                <td className="py-2">"Show me my business profile"</td>
                <td className="py-2">Business name, products, target customers</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Skills</td>
                <td className="py-2">"What skills do you have?"</td>
                <td className="py-2">List of all available skills</td>
              </tr>
              <tr>
                <td className="py-2">Safety</td>
                <td className="py-2">"What safety hooks are active?"</td>
                <td className="py-2">Guardrail check, memory capture, output validation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Step 4: Try Your First Commands</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>"Create a task list for this week"</strong> — Activates the task manager skill</li>
          <li><strong>"Write a weekly business review"</strong> — Activates the weekly review skill</li>
          <li><strong>"Draft a LinkedIn post about [your topic]"</strong> — Activates content writer + social media agent, writes in your brand voice</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Common First-Time Issues</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Problem</th>
                <th className="text-left py-2 text-gray-400">Solution</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Claude does not know my business</td>
                <td className="py-2">Check context files or re-run the setup wizard</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Skills not found</td>
                <td className="py-2">Check <code>.claude/skills</code> folder, each skill needs a SKILL.md</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">No daily logs</td>
                <td className="py-2">Check memory capture hook: "What hooks are running?"</td>
              </tr>
              <tr>
                <td className="py-2">Permission errors</td>
                <td className="py-2">On Mac/Linux: <code>chmod +x</code> on hook scripts</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">What You Have Now</h2>
        <p className="text-gray-300">
          After setup, you have a configured AI operating system. Claude knows your business,
          has access to specialized skills, expert agents for different types of work, and
          safety guardrails. From this point forward, every time you open Claude Code in
          this project, it picks up right where you left off — no re-explaining, no
          context-setting.
        </p>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Further Reading</h3>
          <ul className="text-gray-300 space-y-1">
            <li>{"• "}<a href="/en/patterns/memory-management" className="text-blue-400 hover:underline">Memory Management Pattern</a> — How the memory system works</li>
            <li>{"• "}<a href="/en/grundlagen/agent-rollen" className="text-blue-400 hover:underline">Agent Roles</a> — Roles and responsibilities in the agent team</li>
            <li>{"• "}<a href="/en/patterns/agent-skalierung" className="text-blue-400 hover:underline">Scaling Agent Teams</a> — Adding agents and creating workflows</li>
          </ul>
        </div>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Claude Code Overview</a> — Official documentation</li>
            <li><a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Claude Code Memory</a> — CLAUDE.md and memory system</li>
            <li><a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Claude Code Repository</a> — Skills, agents, and hooks</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
