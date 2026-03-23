import PlantUMLDiagram from "../../../../components/PlantUMLDynamic"

const comparisonDiagram = `@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam noteBorderColor #334155
skinparam noteBackgroundColor #1E293B
skinparam noteFontColor #E2E8F0

title CLI Coding Agents — Decision Tree

rectangle "What do you need?" as start

rectangle "Best Reasoning\\nQuality" as quality
rectangle "GDPR / Local\\n(no Cloud)" as gdpr
rectangle "Free to\\nstart" as budget
rectangle "OpenAI\\nEcosystem" as openai

rectangle "Claude Code\\n(Anthropic)" as cc #1E3A5F
rectangle "Mistral Vibe\\nDevstral 24B local" as mv #1E3A5F
rectangle "Gemini CLI\\nFree Tier" as gc #1E3A5F
rectangle "Codex CLI\\n(OpenAI)" as cx #1E3A5F

start -down-> quality
start -down-> gdpr
start -down-> budget
start -down-> openai

quality -down-> cc
gdpr -down-> mv
budget -down-> gc
openai -down-> cx

note right of cc
  MCP, Subagents,
  Hooks, Skills
end note

note right of mv
  Open Source, MIT,
  RTX 3090 sufficient
end note

note right of gc
  1M Context,
  Multimodal
end note

note right of cx
  GPT-4o, o3,
  broad tooling
end note

@enduml`

export const metadata = {
  title: 'CLI Coding Agents Compared — Claude Code, Mistral Vibe, Gemini CLI, Codex CLI | AI Engineering Wiki',
  description:
    'Comprehensive comparison of CLI Coding Agents: Claude Code, Mistral Vibe, Gemini CLI and OpenAI Codex CLI. Features, pricing, GDPR compliance and hands-on tests.',
}

export default function CLICodingAgentsComparisonPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          CLI Coding Agents Compared
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Claude Code, Mistral Vibe, Gemini CLI and OpenAI Codex CLI — honest comparison
          with feature matrix, pricing, GDPR assessment and hands-on experience.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 15 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
            v1.0 — March 2026
          </span>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5 my-6">
        <div className="font-bold text-white mb-2">Summary</div>
        <div className="text-white/70 text-sm leading-relaxed">
          Four CLI Coding Agents compared head-to-head: Claude Code delivers the best reasoning quality with
          subagents and MCP integration. Mistral Vibe is the only agent that runs fully locally (GDPR-compliant,
          24B model on RTX 3090). Gemini CLI offers a free tier with 1M context window.
          Codex CLI integrates into the OpenAI ecosystem. None is perfect — the choice depends on the use case.
        </div>
      </div>

      <PlantUMLDiagram diagram={comparisonDiagram} caption="Decision Tree: Which CLI Coding Agent fits your use case?" />

      <div className="prose prose-invert max-w-none">
        <p className="text-white/70 leading-relaxed">
          CLI Coding Agents are terminal-based AI assistants that work directly in your file system:
          reading, writing, and editing code, executing shell commands, and performing git operations.
          Unlike chat interfaces like ChatGPT or Claude.ai, they work directly in your project context
          and can autonomously complete complex multi-step tasks.
        </p>
        <p className="text-white/70 leading-relaxed mt-4">
          This comparison is based on our daily hands-on experience. We use Claude Code as our primary
          tool and have systematically tested the alternatives. The assessment is honest: where others
          are better, we say so.
        </p>

        {/* --- The 4 Agents in Detail --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">The 4 Agents in Detail</h2>

          {/* Claude Code */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">1. Claude Code (Anthropic)</h3>
                <p className="text-white/50 text-sm mt-1">CLI agent with the strongest reasoning</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Our Primary Tool
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-white/40 mb-1">Model</p>
                <p className="text-white/80">Claude Opus 4.6 / Sonnet 4.6</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Open Source</p>
                <p className="text-white/80">CLI is open source, model is proprietary</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Local Execution</p>
                <p className="text-white/80">No — Anthropic API only</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Pricing</p>
                <p className="text-white/80">Anthropic API: $3–15 / 1M Tokens</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Protocol</p>
                <p className="text-white/80">MCP (Model Context Protocol)</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Context Window</p>
                <p className="text-white/80">200K–1M Tokens</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-white/40 text-sm mb-1">Tools</p>
              <div className="flex flex-wrap gap-2">
                {['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob', 'Agent', 'WebFetch', 'WebSearch', 'NotebookEdit'].map(tool => (
                  <span key={tool} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-white/60">{tool}</span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-green-400 font-medium mb-1">Strengths</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Best reasoning of all tested agents</li>
                  <li>Subagents for parallel task execution</li>
                  <li>MCP integration (Notion, Playwright, Docker, etc.)</li>
                  <li>Hooks for automated quality assurance</li>
                  <li>Skills and plugin system</li>
                  <li>Git worktrees for isolated branches</li>
                  <li>Plan mode for complex tasks</li>
                </ul>
              </div>
              <div>
                <p className="text-red-400 font-medium mb-1">Weaknesses</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Not locally executable — all data goes to Anthropic API</li>
                  <li>Expensive at high volume ($150–500/month with intensive use)</li>
                  <li>Dependency on Anthropic as sole provider</li>
                  <li>No free tier for the API</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-white/40 mb-1">Key Features</p>
              <p className="text-white/70">
                Subagents can work in parallel and split complex tasks. Hooks enable automatic rules
                (e.g. &quot;never delete without confirmation&quot;). CLAUDE.md files define project-specific
                behavior. MCP servers extend capabilities with external tools (databases, browsers, APIs).
              </p>
            </div>
          </div>

          {/* Mistral Vibe */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">2. Mistral Vibe (Mistral AI)</h3>
                <p className="text-white/50 text-sm mt-1">The only agent that runs fully locally</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                Open Source / Local
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-white/40 mb-1">Model</p>
                <p className="text-white/80">Devstral 2 (123B) / Devstral Small 2 (24B)</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Open Source</p>
                <p className="text-white/80">Yes — MIT / Apache 2.0</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Local Execution</p>
                <p className="text-white/80">Yes — Devstral Small 2 (24B) runs on RTX 3090</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Pricing</p>
                <p className="text-white/80">Le Chat Plans or self-hosted free</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Protocol</p>
                <p className="text-white/80">ACP (Agent Communication Protocol)</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Context Window</p>
                <p className="text-white/80">~128K Tokens</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-white/40 text-sm mb-1">Tools</p>
              <div className="flex flex-wrap gap-2">
                {['File', 'Shell', 'Grep', 'Git'].map(tool => (
                  <span key={tool} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-white/60">{tool}</span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-green-400 font-medium mb-1">Strengths</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Fully open source (MIT / Apache 2.0)</li>
                  <li>Local execution — no data leaves the company</li>
                  <li>24B model runs on consumer GPU (RTX 3090)</li>
                  <li>GDPR-compliant without additional measures</li>
                  <li>Own protocol (ACP) for agent communication</li>
                </ul>
              </div>
              <div>
                <p className="text-red-400 font-medium mb-1">Weaknesses</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Less tool variety than Claude Code (4 vs. 10+ tools)</li>
                  <li>Younger ecosystem — fewer plugins and integrations</li>
                  <li>Reasoning quality below Claude Opus 4.6</li>
                  <li>No MCP support (own ACP protocol)</li>
                  <li>Turn limit on complex tasks (5 turns in our test)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-white/40 mb-1">Tested Version</p>
              <p className="text-white/70">v2.5.0</p>
            </div>
          </div>

          {/* Gemini CLI */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">3. Gemini CLI (Google)</h3>
                <p className="text-white/50 text-sm mt-1">Largest context window and free tier</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                Free Tier
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-white/40 mb-1">Model</p>
                <p className="text-white/80">Gemini 2.5 Pro / Flash</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Open Source</p>
                <p className="text-white/80">CLI is open source, model is proprietary</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Local Execution</p>
                <p className="text-white/80">No — Google AI API only</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Pricing</p>
                <p className="text-white/80">Google AI API (free tier available)</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Protocol</p>
                <p className="text-white/80">Standard API</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Context Window</p>
                <p className="text-white/80">1M+ Tokens</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-green-400 font-medium mb-1">Strengths</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>1M+ context window — largest of all tested agents</li>
                  <li>Free tier for getting started</li>
                  <li>Multimodal capabilities (images, code, text)</li>
                  <li>98k+ GitHub stars — large community</li>
                </ul>
              </div>
              <div>
                <p className="text-red-400 font-medium mb-1">Weaknesses</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Less code-focused than Claude Code</li>
                  <li>Dependency on Google infrastructure</li>
                  <li>Not locally executable</li>
                  <li>No MCP support</li>
                  <li>No subagent system</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-white/40 mb-1">GitHub</p>
              <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                github.com/google-gemini/gemini-cli
              </a>
              <span className="text-white/40 ml-2">(98k+ Stars)</span>
            </div>
          </div>

          {/* Codex CLI */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">4. OpenAI Codex CLI</h3>
                <p className="text-white/50 text-sm mt-1">OpenAI ecosystem with GPT-4o and o3</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-white/40 mb-1">Model</p>
                <p className="text-white/80">GPT-4o / o3</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Open Source</p>
                <p className="text-white/80">CLI is open source, model is proprietary</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Local Execution</p>
                <p className="text-white/80">No — OpenAI API only</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Pricing</p>
                <p className="text-white/80">OpenAI API: $5–15 / 1M Tokens</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Protocol</p>
                <p className="text-white/80">Standard API</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Context Window</p>
                <p className="text-white/80">128K Tokens</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-green-400 font-medium mb-1">Strengths</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Broad OpenAI ecosystem and community</li>
                  <li>GPT-4o quality for coding tasks</li>
                  <li>Good integration with existing OpenAI workflows</li>
                </ul>
              </div>
              <div>
                <p className="text-red-400 font-medium mb-1">Weaknesses</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Not locally executable</li>
                  <li>Dependency on OpenAI</li>
                  <li>Expensive at high volume</li>
                  <li>No MCP support</li>
                  <li>No subagent system</li>
                  <li>Smallest context window (128K)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- Feature Matrix --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Feature Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Claude Code</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Mistral Vibe</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Gemini CLI</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Codex CLI</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Local Execution</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-green-400">Yes (24B)</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Open Source Model</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-green-400">Yes (MIT/Apache)</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Subagents</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">MCP Support</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                  <td className="py-3 px-4 text-yellow-400">No (ACP)</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Plugin System</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Context Window</td>
                  <td className="py-3 px-4">200K–1M</td>
                  <td className="py-3 px-4">~128K</td>
                  <td className="py-3 px-4 text-green-400">1M+</td>
                  <td className="py-3 px-4">128K</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Hooks / Rules</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Git Worktrees</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">GDPR-local</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Free Tier</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4 text-yellow-400">Local = free</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Cost Comparison --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Cost Comparison (estimated at 1,000 requests/day)</h2>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 my-6">
            <div className="font-bold text-white mb-2">Important</div>
            <div className="text-white/70 text-sm leading-relaxed">
              Costs are estimates based on average token usage per request. Actual costs vary
              significantly depending on prompt length, context size and task complexity.
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Agent</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Cost / Month</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Local Possible</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Note</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Claude Code</td>
                  <td className="py-3 px-4">~$150–500</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4">Opus more expensive, Sonnet cheaper</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Mistral Vibe (API)</td>
                  <td className="py-3 px-4">~$50–150</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">Via Le Chat or Mistral API</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Mistral Vibe (Local)</td>
                  <td className="py-3 px-4 text-green-400">~$50 (electricity)</td>
                  <td className="py-3 px-4 text-green-400">Yes</td>
                  <td className="py-3 px-4">One-time hardware costs not included</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Gemini CLI</td>
                  <td className="py-3 px-4 text-green-400">~$0–100</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4">Free tier for low usage</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Codex CLI</td>
                  <td className="py-3 px-4">~$150–500</td>
                  <td className="py-3 px-4 text-red-400">No</td>
                  <td className="py-3 px-4">GPT-4o and o3 similarly priced</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Hands-on Test --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Hands-on Test: Mistral Vibe v2.5.0</h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
            <p className="text-white/70 mb-4">
              We tested Mistral Vibe v2.5.0 on this wiki to get a direct comparison with our
              primary tool Claude Code.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold text-lg mt-0.5">+</span>
                <div>
                  <p className="text-white font-medium">Simple task (counting files)</p>
                  <p className="text-white/60 text-sm">Completed correctly and quickly. Shell tool works reliably.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-lg mt-0.5">-</span>
                <div>
                  <p className="text-white font-medium">Complex task (code analysis)</p>
                  <p className="text-white/60 text-sm">
                    Hit turn limit at 5 turns. The agent could not fully complete the task.
                    Claude Code completed the same task in a single session.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
              <p className="text-white/50 text-sm">
                <strong className="text-white/70">Conclusion:</strong> Mistral Vibe works reliably for simple to medium
                tasks. For complex, multi-step workflows with many file interactions, Claude Code is
                significantly superior — both in reasoning quality and tool variety, with no turn limit.
              </p>
            </div>
          </div>
        </section>

        {/* --- Who should use what? --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Who Should Use What?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2">Enterprise with Budget</h3>
              <p className="text-white/60 text-sm mb-2">Claude Code</p>
              <p className="text-white/50 text-sm">
                Best reasoning quality, subagents for parallel tasks, MCP integration for
                tool connectivity. When quality matters more than cost.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2">GDPR-critical / Self-Hosted</h3>
              <p className="text-white/60 text-sm mb-2">Mistral Vibe (local)</p>
              <p className="text-white/50 text-sm">
                Only option when no data may leave the company. Devstral Small 2 (24B) on
                RTX 3090 is sufficient. Open source, MIT license.
              </p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2">Budget-conscious</h3>
              <p className="text-white/60 text-sm mb-2">Gemini CLI</p>
              <p className="text-white/50 text-sm">
                Free tier to try it out. 1M context window for large codebases. Good for
                getting started without financial commitment.
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2">OpenAI Ecosystem</h3>
              <p className="text-white/60 text-sm mb-2">Codex CLI</p>
              <p className="text-white/50 text-sm">
                Seamless integration if already using OpenAI APIs and GPT-4o. Familiar
                ecosystem, proven model quality.
              </p>
            </div>
          </div>
        </section>

        {/* --- Our Recommendation --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Our Recommendation</h2>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 my-6">
            <div className="font-bold text-white mb-2">Practical Recommendation</div>
            <div className="text-white/70 text-sm leading-relaxed">
              For AI Engineering we use Claude Code as our primary tool — for its subagent architecture,
              MCP integration and reasoning quality. For GDPR-critical environments where NO data may
              leave the company, Mistral Vibe with Devstral Small 2 (24B, locally on RTX 3090) is the
              best alternative. The combination of both covers 95% of all use cases.
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mt-4">
            <h3 className="text-lg font-bold text-white mb-3">Honest Assessment</h3>
            <ul className="text-white/70 space-y-2 text-sm">
              <li>
                <strong className="text-white">We are not neutral:</strong> This article is written with Claude Code.
                We use it daily and know it best. The strengths are first-hand, as are the weaknesses.
              </li>
              <li>
                <strong className="text-white">No agent is perfect:</strong> Claude Code is expensive and not local.
                Mistral Vibe is less capable on complex tasks. Gemini CLI is less code-focused.
                Codex CLI has the smallest context window.
              </li>
              <li>
                <strong className="text-white">The market moves fast:</strong> This comparison reflects the state of
                March 2026. All four providers release regular updates.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Protocol Comparison --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Protocol Comparison: MCP vs. ACP</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Aspect</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">MCP (Model Context Protocol)</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">ACP (Agent Communication Protocol)</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Developer</td>
                  <td className="py-3 px-4">Anthropic</td>
                  <td className="py-3 px-4">Mistral AI</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Focus</td>
                  <td className="py-3 px-4">Tool integration (filesystem, APIs, DBs)</td>
                  <td className="py-3 px-4">Agent-to-agent communication</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Ecosystem</td>
                  <td className="py-3 px-4">Large (Notion, Playwright, Docker, etc.)</td>
                  <td className="py-3 px-4">Growing, still young</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Compatibility</td>
                  <td className="py-3 px-4">Broad (Claude, Cursor, Windsurf, etc.)</td>
                  <td className="py-3 px-4">Primarily Mistral Vibe</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Open Standard</td>
                  <td className="py-3 px-4">Yes (open specification)</td>
                  <td className="py-3 px-4">Yes (open specification)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Sources --- */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Claude Code Documentation</a> — Official Anthropic documentation</li>
            <li><a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Claude Code GitHub</a> — Open source CLI repository</li>
            <li><a href="https://docs.mistral.ai/agents/vibe/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mistral Vibe Documentation</a> — Official Mistral AI documentation</li>
            <li><a href="https://huggingface.co/mistralai/Devstral-Small-2" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Devstral Small 2 on Hugging Face</a> — 24B model for local execution</li>
            <li><a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Gemini CLI GitHub</a> — Google Gemini CLI (98k+ Stars)</li>
            <li><a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI Codex CLI GitHub</a> — OpenAI Codex CLI repository</li>
            <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Model Context Protocol (MCP)</a> — Official MCP specification</li>
            <li><a href="https://docs.mistral.ai/agents/acp/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Agent Communication Protocol (ACP)</a> — Official ACP specification</li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Related articles:{' '}
          <a href="/en/tools/ai-tools-datenbank" className="text-blue-400 hover:text-blue-300">AI Tools Database</a>
          {' · '}
          <a href="/en/grundlagen/was-ist-ein-llm" className="text-blue-400 hover:text-blue-300">What is an LLM?</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          For implementation support, find <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">resources</a> at ai-engineering.at.
        </p>
      </div>
      </div>
    </div>
  )
}
