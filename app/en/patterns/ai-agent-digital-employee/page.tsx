import { Metadata } from "next"
import Callout from "../../../../components/Callout"
import KeyTakeaway from "../../../../components/KeyTakeaway"
import ComparisonTable from "../../../../components/ComparisonTable"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "AI Agent as Digital Employee — Patterns & Architecture | AI Engineering Wiki",
  description:
    "How to onboard an AI agent as a digital employee: security architecture, skill system, credential isolation and EU AI Act compliance.",
}

export default function AIAgentDigitalEmployeePage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Patterns</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          AI Agent as Digital Employee
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          How to treat an AI agent like a new hire: probation period, own credentials,
          limited permissions and clear rules.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 14 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="At a Glance">
          <p>
            An AI agent is not a tool you install — it is a digital employee you onboard.
            That means: own identity, own credentials, limited permissions, probation period
            and EU AI Act compliance. This article covers the architecture patterns that
            make this possible.
          </p>
        </Callout>

        {/* Section 1 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Mental Model: Agent = Employee
          </h2>
          <p className="text-white/70 leading-relaxed">
            The most common mistake with AI agents: treating them like software tools.
            Install, add API key, done. That works for a single chatbot. But once an
            agent reads emails independently, contacts customers or writes to enterprise
            systems, it needs the same care as a new hire.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Concretely: own credentials, limited permissions, a probation period with
            gradual access expansion and clear rules for external communication.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Principle of Least Privilege
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Every agent gets ONLY the permissions it needs for its job. Nothing more.
            Same principle as with human employees: an accountant does not need SSH
            access to the server.
          </p>

          <ComparisonTable
            headers={["Area", "Human Employee", "AI Agent"]}
            rows={[
              ["Identity", "Own company account, own email", "Own system user, own API keys"],
              ["Permissions", "Only for their department", "Only for defined doctypes/endpoints"],
              ["Credentials", "Own password, own badge", "Own vault, isolated from other agents"],
              ["Network", "VPN access only for their systems", "Network policy: deny-by-default, only allowlisted endpoints"],
              ["Probation", "3-6 months, gradually more responsibility", "30 days read-only, then gradual write permissions"],
            ]}
          />
        </section>

        {/* Section 3 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Credential Isolation: Every Agent Gets Its Own Vault
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            One of the most critical points: agents must NEVER share credentials.
            If Agent A is compromised, Agent B must not be affected.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Typical vault structure per agent:</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`agent-vault/
  llm.env        # LLM provider API keys
  services.env   # External services (TTS, email, etc.)
  erp.env        # ERP system access (own user!)
  identity.env   # Agent name, email, token`}</code>
            </pre>
          </div>

          <Callout type="warning" title="Shared Credentials Are a Security Risk">
            <p>
              When multiple agents use the same API key, you cannot distinguish who
              did what in the audit log. Plus, one compromised key means ALL agents
              are affected. Every agent gets its own keys, own tokens, own vault.
            </p>
          </Callout>
        </section>

        {/* Section 4 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Network Policy: Deny-by-Default
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            An agent should only reach the endpoints it needs for its work.
            Everything else is blocked. This prevents a compromised agent from
            accessing internal systems.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Example network policy (YAML):</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`allowed:
  - host: "api.llm-provider.com"     # LLM inference
    port: 443
  - host: "erp.internal"             # ERP (customer doctypes only)
    port: 8082
  - host: "imap.provider.com"        # Email read
    port: 993
blocked:
  - host: "*"                        # Everything else`}</code>
            </pre>
          </div>

          <Callout type="tip" title="Bind Gateway to Localhost">
            <p>
              The agent gateway should listen on 127.0.0.1, not 0.0.0.0.
              Remote access goes through a VPN (e.g. Netbird, WireGuard).
              This prevents the agent endpoint from being reachable on the open network.
            </p>
          </Callout>
        </section>

        {/* Section 5 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Skills Instead of Plugins: Keeping Control
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Agent capabilities are defined as Markdown skills, not executable code.
            This is a deliberate security decision: a Markdown skill describes WHAT
            the agent should do, but the agent executes code in a sandbox.
          </p>

          <ComparisonTable
            headers={["Property", "Plugin (Code)", "Skill (Markdown)"]}
            rows={[
              ["Execution", "Direct code access", "Description, agent interprets"],
              ["Security", "Can execute anything", "Sandbox execution"],
              ["Review", "Code review needed", "Reading text is enough"],
              ["Maintenance", "API changes break code", "Description stays stable"],
              ["Supply Chain", "Dependencies can be malicious", "No external dependencies"],
            ]}
          />

          <Callout type="warning" title="Be Careful with Community Plugins">
            <p>
              Research shows that a significant portion of community plugins for agent
              frameworks can have security issues — from credential leaks to remote code
              execution. Write your skills yourself. Adopt logic and patterns from the
              community, but write the code yourself.
            </p>
          </Callout>
        </section>

        {/* Section 6 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Two-Tier Heartbeat: 90% Token Savings
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            An agent needs to regularly check if there is work to do. But every
            LLM call costs tokens. The solution: a two-tier heartbeat system.
          </p>

          <ComparisonTable
            headers={["Tier", "What Happens", "Cost", "Latency"]}
            rows={[
              ["Tier 1 (Cheap)", "Simple checks: HTTP status, email count, file exists", "0 tokens, just HTTP calls", "< 500ms"],
              ["Tier 2 (LLM)", "Classification, summarization, decision", "100-300 tokens", "1-3s"],
            ]}
          />

          <p className="text-white/70 leading-relaxed mt-4">
            Tier 2 is ONLY triggered when Tier 1 detects an anomaly. Example: Tier 1
            checks &quot;Are there new emails?&quot; (HTTP call, 0 tokens). Only if yes,
            Tier 2 calls the LLM for classification and summarization.
          </p>

          <Callout type="tip" title="Practical Calculation">
            <p>
              With a heartbeat every 5 minutes, that is 288 checks per day.
              Without two-tier: 288 LLM calls (~86,000 tokens). With two-tier
              and 10% anomaly rate: 29 LLM calls (~8,600 tokens).
              That is a 90% reduction — with the same response speed.
            </p>
          </Callout>
        </section>

        {/* Section 7 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            EU AI Act: Transparency Requirements
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            From August 2, 2026, AI systems with customer contact must be transparently
            labeled (Art. 50). This applies to AI agents deployed as digital employees.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <p className="text-white font-medium">Email Signature</p>
                <p className="text-white/50 text-sm mt-1">&quot;Max Mustermann | AI-powered Assistant | Company GmbH&quot;</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <p className="text-white font-medium">Social Media Bio</p>
                <p className="text-white/50 text-sm mt-1">&quot;AI Employee at Company GmbH&quot; — clear and visible</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <p className="text-white font-medium">Voice/Phone</p>
                <p className="text-white/50 text-sm mt-1">Automatic announcement at the start: &quot;I am an AI-powered assistant.&quot;</p>
              </div>
            </div>
          </div>

          <Callout type="warning" title="Deadline: August 2, 2026">
            <p>
              Art. 50 EU AI Act transparency obligations apply from August 2026.
              Penalty: up to EUR 15 million or 3% of global annual turnover.
              SMEs get a lower cap (Art. 99), but the obligation itself is the same.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Treat AI agents like new hires: own identity, own credentials, limited permissions.",
            "Credential isolation is not optional. Every agent gets its own vault.",
            "Network policy: deny-by-default. The agent only reaches the endpoints it needs.",
            "Skills instead of plugins: Markdown descriptions instead of executable code. Safer and more maintainable.",
            "Two-tier heartbeat saves 90% tokens: cheap checks first, LLM only on anomaly.",
            "EU AI Act labeling mandatory from August 2026. Prepare now, not later.",
          ]}
        />

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <span className="text-white/70">Base spec:</span>{" "}
              <span className="text-blue-400">Internal design specification</span>{" "}
              — AI Agent onboarding design (internal)
            </li>
            <li><a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act Overview</a> — Art. 50 transparency obligations</li>
            <li><a href="/en/patterns/safety-hooks" className="text-blue-400 hover:underline">Safety Hooks Pattern</a> — Guardrails and output validation</li>
            <li><a href="/en/patterns/heartbeat-monitoring" className="text-blue-400 hover:underline">Heartbeat &amp; Monitoring Pattern</a> — Health checks and alerting</li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
