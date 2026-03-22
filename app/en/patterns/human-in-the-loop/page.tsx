import { Metadata } from "next"
import Callout from "../../../../components/Callout"
import KeyTakeaway from "../../../../components/KeyTakeaway"
import ComparisonTable from "../../../../components/ComparisonTable"
import PlantUMLDiagram from "../../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Human-in-the-Loop — Human-AI Collaboration | AI Engineering Wiki",
  description:
    "Approval workflows, escalation patterns, confidence thresholds, audit trail. EU AI Act Art. 14 human oversight. With n8n approval workflow example.",
}

export default function HumanInTheLoopENPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Patterns</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Human-in-the-Loop
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Why fully automated AI decisions are dangerous and how to implement
          approval workflows, escalation patterns and audit trails.
          Including EU AI Act Art. 14 requirements.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 13 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="At a Glance">
          <p>
            Human-in-the-Loop (HITL) means a human is involved in the AI
            system&apos;s decision process. Not for every minor task — but for
            critical, irreversible or uncertain decisions. The EU AI Act makes
            human oversight mandatory for high-risk systems (Art. 14). But even
            without regulation, HITL is the difference between a useful tool
            and a liability trap.
          </p>
        </Callout>

        {/* Section 1 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why Automated AI Decisions Are Dangerous
          </h2>
          <p className="text-white/70 leading-relaxed">
            LLMs are impressively good at generating plausible answers. But
            &quot;plausible&quot; is not &quot;correct.&quot; When an LLM automatically makes
            decisions — answering emails, approving invoices, modifying customer
            data — a single mistake can cause significant damage.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            The three main risks of fully automated AI decisions:
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-2">
            <li>
              <strong className="text-white">Hallucinations in Action:</strong> The
              LLM invents a customer number and modifies the wrong record.
            </li>
            <li>
              <strong className="text-white">Irreversible Actions:</strong> A
              deleted file, a sent email, an approved payment
              cannot be undone.
            </li>
            <li>
              <strong className="text-white">Liability:</strong> Who is liable when
              an AI agent makes a wrong decision? Without documented
              human oversight: the company.
            </li>
          </ul>

          <Callout type="warning" title="Real-World Example">
            <p>
              An AI agent automatically answers support tickets. A customer
              writes: &quot;Please cancel my subscription.&quot; The agent cancels — but
              it was an enterprise contract with a 12-month term and
              cancellation period. Without human approval, that would be an expensive mistake.
            </p>
          </Callout>
        </section>

        {/* Section 2: Approval Workflows */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Approval Workflows
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            An approval workflow interrupts the automatic flow and
            waits for human approval. The agent prepares the decision,
            but a human makes it.
          </p>

          <ComparisonTable
            headers={["Pattern", "When to Use", "Example"]}
            rows={[
              ["Pre-Approval", "Before every critical action", "Agent shows email draft, human clicks 'Send'"],
              ["Batch Approval", "Multiple decisions together", "Agent collects 10 support responses, human reviews all at once"],
              ["Exception-Only", "Only for deviations from standard", "Agent handles standard tickets itself, escalates only special cases"],
              ["Time-Delayed", "Delay before execution", "Agent plans action, 30 min wait, auto-execute if no veto"],
            ]}
          />

          <Callout type="info" title="Finding the Balance">
            <p>
              Too many approvals make the agent useless — if every action
              needs approval, you might as well do it yourself. The art
              is finding the right thresholds: what can the agent handle
              alone, what needs approval?
            </p>
          </Callout>
        </section>

        {/* Section 3: Escalation Patterns */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Escalation Patterns
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Escalation means the agent recognizes it cannot safely handle a
            situation and hands off to a human. This is not a failure —
            it&apos;s intelligent behavior.
          </p>

          <ComparisonTable
            headers={["Trigger", "Description", "Implementation"]}
            rows={[
              ["Low Confidence", "Agent is uncertain about the right action", "Confidence score < threshold → escalation"],
              ["Repeated Failure", "Agent has already failed at the same task type", "Error counter per task type > 1 → escalation"],
              ["Out of Scope", "Request falls outside the agent's mandate", "Topic classification → no match → escalation"],
              ["High Impact", "Action has potentially large consequences", "Action classification: delete, payment, contract → escalation"],
              ["Adversarial Input", "Suspected manipulation or injection", "Injection detection score > threshold → escalation"],
            ]}
          />

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-4">
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`Escalation Logic (Pseudocode):

function shouldEscalate(task, confidence, context):
  // Rule 1: Low confidence
  if confidence < 0.7:
    return { escalate: true, reason: "Low confidence" }

  // Rule 2: Critical action
  if task.action in ["delete", "payment", "contract_change"]:
    return { escalate: true, reason: "High impact action" }

  // Rule 3: Repeated failure
  if getErrorCount(task.type, last_24h) > 1:
    return { escalate: true, reason: "Repeated failures" }

  // Rule 4: Injection suspected
  if injectionScore(context.userInput) > 0.8:
    return { escalate: true, reason: "Possible injection" }

  return { escalate: false }`}</code>
            </pre>
          </div>
        </section>

        {/* Section 4: Confidence Thresholds */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Confidence Thresholds
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Confidence thresholds define at what certainty level the
            agent may act autonomously. There are three zones:
          </p>

          <ComparisonTable
            headers={["Zone", "Confidence", "Behavior"]}
            rows={[
              ["Green (Autonomous)", "> 0.85", "Agent executes action, logs result"],
              ["Yellow (Review)", "0.6 - 0.85", "Agent proposes action, waits for approval"],
              ["Red (Escalation)", "< 0.6", "Agent stops, escalates to human with context"],
            ]}
          />

          <Callout type="warning" title="LLM Confidence Is Unreliable">
            <p>
              LLMs are notoriously poorly calibrated — an LLM can be 95% confident
              and still be wrong. Confidence scores should therefore never be the
              sole decision basis. Combine them with rule-based checks
              (e.g., &quot;is this an irreversible action?&quot;) and historical error
              rates per task type.
            </p>
          </Callout>
        </section>

        {/* Section 5: Audit Trail */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Audit Trail &amp; Logging
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            A complete audit trail documents every decision of the AI system —
            what was decided, why, and who approved it. This is not just best
            practice but mandatory for high-risk systems under the EU AI Act.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            What Must Be Logged?
          </h3>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-4">
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`Audit Trail Entry:
{
  "timestamp": "2026-03-22T14:30:00Z",
  "agent_id": "support-agent-01",
  "task_type": "ticket_response",
  "input": "Customer asks about contract cancellation",
  "decision": "escalate_to_human",
  "confidence": 0.62,
  "reason": "High impact action (contract_change) + low confidence",
  "context_chunks": ["contract_123.pdf", "cancellation_terms.md"],
  "approved_by": "joe@example.com",
  "approved_at": "2026-03-22T14:35:00Z",
  "final_action": "manual_response_sent",
  "retention_days": 365
}`}</code>
            </pre>
          </div>

          <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-4">
            <li>
              <strong className="text-white">Immutability:</strong> Logs must not
              be modified after the fact. Append-only storage.
            </li>
            <li>
              <strong className="text-white">Retention:</strong> Store in GDPR-compliant
              fashion. Delete personal data after defined periods.
            </li>
            <li>
              <strong className="text-white">Accessibility:</strong> Supervisory
              authorities must be able to inspect logs. Machine-readable format.
            </li>
          </ul>
        </section>

        {/* Section 6: n8n Approval Workflow */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Practice: n8n Approval Workflow
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            A concrete approval workflow in n8n for a support agent:
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-4">
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`n8n Approval Workflow:

1. Trigger: New support ticket (Webhook)

2. AI Agent Node (Ollama/OpenAI)
   → Analyzes ticket: category, urgency, solution proposal
   → Output: { category, urgency, confidence, draft_response }

3. Switch Node: Confidence Check
   → confidence > 0.85 AND category == "standard"
     → Send directly (with disclaimer "AI-generated")
   → confidence 0.6-0.85 OR category == "billing"
     → Approval request (continue to step 4)
   → confidence < 0.6 OR category == "legal"
     → Direct escalation (continue to step 5)

4. Approval Request
   → Mattermost/Slack: Draft + context to support team
   → Wait Node: max 4 hours
   → Approved? → Send
   → Rejected? → Handle manually
   → Timeout? → Escalation

5. Escalation
   → Mark ticket as "human required"
   → Assign to next available agent
   → Attach AI analysis as context

6. Audit Log (at every exit)
   → Log decision, confidence, approval status`}</code>
            </pre>
          </div>
        </section>

        {/* Section 7: EU AI Act Art. 14 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            EU AI Act Art. 14: Human Oversight
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Article 14 of the EU AI Act requires that high-risk AI systems be
            designed so they can be effectively overseen by natural persons.
            The core requirements:
          </p>

          <ComparisonTable
            headers={["Requirement", "What Does It Mean?", "Implementation"]}
            rows={[
              ["Understand", "User must understand the system's capabilities and limitations", "Documentation, training, confidence display"],
              ["Monitor", "User must be able to monitor the system during operation", "Dashboard, alerts, real-time logging"],
              ["Intervene", "User must be able to intervene or stop at any time", "Kill switch, override, pause button"],
              ["Override", "User must be able to ignore AI recommendation", "Recommendation instead of automation, opt-out"],
            ]}
          />

          <Callout type="info" title="Art. 14(4): Proportionate Measures">
            <p>
              Oversight measures must be proportionate to the risk. A chatbot
              that answers opening hours needs less oversight than a system
              that makes credit decisions. The risk class determines
              the HITL level.
            </p>
          </Callout>
        </section>

        {/* PlantUML Diagram */}
        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title Human-in-the-Loop Approval Flow

start
:Incoming Task / Request;
:AI Agent analyzes;
:Calculate Confidence Score;

if (Confidence > 0.85\\nAND standard task?) then (yes)
  :Agent executes;
  :Write Audit Log;
else (no)
  if (Confidence > 0.6?) then (yes)
    :Send Approval Request\\nto Human;
    :Wait for Approval;
    if (Approved?) then (yes)
      :Agent executes;
      :Write Audit Log;
    else (no / timeout)
      :Handle manually;
      :Write Audit Log;
    endif
  else (no)
    #FF6347:Escalation;
    :Direct to Human\\nwith AI context;
    :Write Audit Log;
  endif
endif
stop
@enduml`}
          caption="Human-in-the-Loop Approval Flow: Three zones (Autonomous, Review, Escalation) based on confidence and task type"
        />

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Fully automated AI decisions are dangerous for critical, irreversible or uncertain actions.",
            "Approval workflows: Pre-Approval, Batch, Exception-Only or Time-Delayed — depending on risk and frequency.",
            "Escalation patterns: Low confidence, repeated failure, out of scope, high impact, adversarial input.",
            "Three confidence zones: Green (autonomous, >0.85), Yellow (review, 0.6-0.85), Red (escalation, <0.6).",
            "Audit trail is mandatory: Timestamp, decision, confidence, approver, final action — immutable and GDPR-compliant.",
            "EU AI Act Art. 14: High-risk systems must be understandable, monitorable, interruptible and overridable.",
          ]}
        />

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Regulation (EU) 2024/1689 — EU AI Act
              </a>{" "}
              — Article 14: Human Oversight
            </li>
            <li>
              <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                European Commission — AI Act Regulatory Framework
              </a>{" "}
              — Overview of risk classes and obligations
            </li>
            <li>
              <a href="https://docs.n8n.io/courses/level-two/chapter-5/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                n8n Documentation — Wait &amp; Approval Nodes
              </a>{" "}
              — Technical basis for approval workflows
            </li>
            <li>
              <a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:underline">
                EU AI Act — Wiki Article
              </a>{" "}
              — Risk classes, prohibitions, transparency obligations
            </li>
            <li>
              <a href="/en/patterns/safety-hooks" className="text-blue-400 hover:underline">
                Safety Hooks Pattern
              </a>{" "}
              — Guardrails and output validation
            </li>
            <li>
              <a href="/en/patterns/self-improving-agents" className="text-blue-400 hover:underline">
                Self-Improving Agents
              </a>{" "}
              — Self-escalation as HITL mechanism
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Need help implementing HITL workflows?
          </h3>
          <p className="text-white/60 text-sm mb-4">
            We help with designing approval workflows and escalation patterns —
            using n8n, Mattermost and EU AI Act compliance.
          </p>
          <a
            href="https://ai-engineering.at/kontakt"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Request consultation
          </a>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
