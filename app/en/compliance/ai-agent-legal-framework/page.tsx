import { Metadata } from "next"
import Callout from "../../../../components/Callout"
import KeyTakeaway from "../../../../components/KeyTakeaway"
import ComparisonTable from "../../../../components/ComparisonTable"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "AI Agent Legal Framework — EU AI Act Compliance | AI Engineering Wiki",
  description:
    "How to deploy AI agents legally: EU AI Act, GDPR, risk assessment, compliance documents and hash chain for tamper-proof documentation.",
}

export default function AIAgentLegalFrameworkENPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Compliance</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          AI Agent Legal Framework — EU AI Act Compliance
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          From risk assessment to a complete compliance package:
          how SMEs deploy digital employees legally.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 16 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="At a Glance">
          <p>
            From August 2026, companies deploying AI agents with customer contact must
            meet extensive compliance requirements. This framework connects the EU AI Act
            and GDPR into a practical process: risk assessment, document generation,
            killswitch configuration and tamper-proof hash chain. A wizard guides
            through the entire process.
          </p>
        </Callout>

        {/* Section 1 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Problem: Two Laws, No Tool
          </h2>
          <p className="text-white/70 leading-relaxed">
            Anyone deploying an AI agent in production must comply with two regulatory
            frameworks simultaneously: the EU AI Act (transparency, risk assessment,
            logging) and GDPR (data protection, processing records, data subject rights).
            For large enterprises, expensive compliance platforms exist (EUR 50,000+/year).
            For SMEs, as of March 2026, no comparable product exists.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            The result: most SMEs either ignore the topic or create documents manually
            in Word — with no connection between documents and no link to the actual
            agent configuration.
          </p>

          <Callout type="warning" title="Deadline: August 2, 2026">
            <p>
              EU AI Act transparency obligations (Art. 50) apply from this date.
              GDPR obligations (Art. 30, 35) already apply NOW for anyone processing
              personal data. Penalty: up to EUR 20 million or 4% of global annual turnover.
            </p>
          </Callout>
        </section>

        {/* Section 2 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Legal Requirements Overview
          </h2>

          <ComparisonTable
            headers={["Requirement", "Legal Source", "Deadline", "Max. Penalty"]}
            rows={[
              ["AI labeling at first contact", "EU AI Act Art. 50(1)", "02.08.2026", "EUR 15M / 3%"],
              ["Machine-readable content marking", "EU AI Act Art. 50(2)", "02.08.2026", "EUR 15M / 3%"],
              ["Human oversight / killswitch", "EU AI Act Art. 14", "02.08.2026", "EUR 15M / 3%"],
              ["Automatic log retention (min. 6 months)", "EU AI Act Art. 12", "02.08.2026", "EUR 15M / 3%"],
              ["Processing records", "GDPR Art. 30", "NOW", "EUR 20M / 4%"],
              ["DPIA before deployment", "GDPR Art. 35", "NOW", "EUR 20M / 4%"],
              ["Right to human review", "GDPR Art. 22", "NOW", "EUR 20M / 4%"],
            ]}
          />
        </section>

        {/* Section 3 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Wizard Approach: Documents and Configuration from One Process
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Core principle: compliance documents and agent configuration are generated
            in the same process. Not set up the agent first and then catch up on documentation —
            but both simultaneously. Only this way do reality and documentation match.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <p className="text-white font-medium mb-2">8-Step Wizard:</p>
            {[
              { step: "1", title: "Agent Identity", desc: "Define name, email, company, role and tasks" },
              { step: "2", title: "Risk Assessment", desc: "Questionnaire: Limited Risk or High Risk? 10-15 questions" },
              { step: "3", title: "Scope & Permissions", desc: "Which systems? Read/Write/Create per system" },
              { step: "4", title: "GDPR Compliance", desc: "DPIA, processing records, privacy notice (auto-populated)" },
              { step: "5", title: "EU AI Act Compliance", desc: "Art. 50 Transparency Kit: email signature, social bio, voice announcement" },
              { step: "6", title: "Killswitch & Human Oversight", desc: "3-level killswitch: PAUSE, STOP, DECOMMISSION" },
              { step: "7", title: "Generate Agent Configuration", desc: "SOUL.md, network policy, vault, start script" },
              { step: "8", title: "Finalize Compliance Package", desc: "PDF export, hash chain, git commit, ERP tracking" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                  {item.step}
                </span>
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-white/50 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Risk Assessment: Limited Risk vs. High Risk
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The EU AI Act distinguishes between risk classes. Most SME agents
            (customer service, email, social media) fall under &quot;Limited Risk&quot; —
            with transparency obligations but without the heavy requirements for
            high-risk systems.
          </p>

          <ComparisonTable
            headers={["Question", "If YES...", "Risk Class"]}
            rows={[
              ["Does the agent make decisions with legal effect?", "High Risk (Annex III)", "HIGH"],
              ["Does the agent process biometric data?", "High Risk or prohibited", "HIGH"],
              ["Does the agent evaluate people (scoring, profiling)?", "High Risk", "HIGH"],
              ["Does the agent only interact with customers (info, support)?", "Limited Risk", "LIMITED"],
              ["Does the agent only create content (text, image)?", "Limited Risk", "LIMITED"],
            ]}
          />

          <Callout type="tip" title="For Most SME Agents: Limited Risk">
            <p>
              An agent that answers emails, posts on social media or forwards
              customer inquiries is typically Limited Risk. This means: transparency
              obligations (labeling) but no DPIA under EU AI Act Art. 9 and no
              conformity assessment. The GDPR DPIA may still be required.
            </p>
          </Callout>
        </section>

        {/* Section 5 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            3-Level Killswitch: Human Oversight per Art. 14
          </h2>

          <ComparisonTable
            headers={["Level", "Action", "When to Use"]}
            rows={[
              ["Level 1: PAUSE", "Agent stops, saves state, waits for resume", "Agent behaves unexpectedly, situation unclear"],
              ["Level 2: STOP", "Immediately terminate, cancel all running actions", "Agent making errors that could cause damage"],
              ["Level 3: DECOMMISSION", "Permanently deactivate, revoke keys, archive logs", "Agent no longer needed or compromised"],
            ]}
          />

          <Callout type="info" title="Who Can Operate the Killswitch?">
            <p>
              This is defined in the wizard. Typical setup: the owner (CEO) can
              trigger all 3 levels. Team members can trigger Level 1 (PAUSE).
              Automated systems can trigger Level 1 on anomaly detection.
              Level 3 (DECOMMISSION) should always be manual.
            </p>
          </Callout>
        </section>

        {/* Section 6 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Hash Chain: Tamper-Proof Documentation
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Compliance documents must be provably unaltered. A SHA-256 hash chain
            ensures every change is traceable. If an old document is tampered with,
            all subsequent hashes break.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Hash chain principle:</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`Document v1  →  SHA-256: a1b2c3...  (previous: null)
Document v2  →  SHA-256: d4e5f6...  (previous: a1b2c3...)
Document v3  →  SHA-256: g7h8i9...  (previous: d4e5f6...)

Tamper with v1?
→ Hash of v1 changes
→ previous_hash of v2 no longer matches
→ Chain is broken = tampering detected`}</code>
            </pre>
          </div>

          <Callout type="info" title="Not Blockchain, Not eIDAS">
            <p>
              A hash chain is NOT a blockchain. It runs locally, needs no network
              and no cryptography infrastructure. It only proves that documents
              were not altered after the fact. For legally binding electronic
              signatures you need eIDAS / qualified signatures — that is a separate topic.
            </p>
          </Callout>
        </section>

        {/* Section 7 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Market Situation: No SME Product Available
          </h2>

          <ComparisonTable
            headers={["Provider", "Target", "Cost/Year", "Agent-Specific?"]}
            rows={[
              ["Credo AI", "Enterprise", "EUR 50,000+", "Yes, but not for SMEs"],
              ["Holistic AI", "Enterprise", "EUR 50,000+", "Partially"],
              ["OneTrust", "Enterprise", "EUR 50,000+", "No, generic"],
              ["AI Agent Legal Framework", "SME", "Open source (engine)", "Yes, incl. agent configuration"],
            ]}
          />

          <Callout type="info" title="AI Act Awareness Among SMEs">
            <p>
              Studies show: only 56 out of 100 DACH SMEs know about the EU AI Act
              (compared to 82 out of 100 for GDPR). Awareness is low, the deadline
              is close. Those who start now have an advantage.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "EU AI Act Art. 50 deadline: August 2, 2026. Transparency obligations for ALL AI systems with customer contact.",
            "GDPR obligations (Art. 30, 35) already apply NOW. A DPIA is required before deploying an AI agent.",
            "Compliance documents and agent configuration must come from the same process — otherwise documentation will not match reality.",
            "3-level killswitch (PAUSE, STOP, DECOMMISSION) is the practical path to Human Oversight per Art. 14.",
            "Hash chain (SHA-256) makes compliance documents tamper-proof — no blockchain needed, runs locally.",
            "No SME compliance tool exists currently. Those who act now gain an advantage before the deadline.",
          ]}
        />

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <span className="text-white/70">Base spec:</span>{" "}
              <span className="text-blue-400">Internal design specification</span>{" "}
              — AI Agent Legal Framework design (internal)
            </li>
            <li>
              <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                EU AI Act (Regulation 2024/1689)
              </a>{" "}
              — Full text on EUR-Lex
            </li>
            <li><a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act Overview</a> — Risk classes and obligations</li>
            <li><a href="/en/compliance/dpia" className="text-blue-400 hover:underline">Data Protection Impact Assessment (DPIA)</a> — When required, how to conduct</li>
            <li><a href="/en/compliance/dsgvo-grundlagen" className="text-blue-400 hover:underline">GDPR Basics</a> — Art. 30, Art. 35</li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
