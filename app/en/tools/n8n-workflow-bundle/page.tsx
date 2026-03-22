import Callout from "../../../../components/Callout"
import PlantUMLDiagram from "../../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'n8n AI Workflow Bundle v3 | AI Engineering Wiki',
  description:
    '14 production-ready n8n workflows with error handling, dual-LLM fallback and GDPR compliance. Architecture, categories and best practices.',
}

export default function N8nWorkflowBundlePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          n8n AI Workflow Bundle v3
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          14 enterprise workflows for local automation with error handling,
          dual-LLM fallback and structured logging.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Updated: March 2026</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">n8n 2.x</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">v3.0</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="At a Glance">
          <p>
            14 production-ready n8n workflows in 5 categories: Email, Social Media,
            Revenue, Infrastructure and Lead Generation. Every workflow includes a
            built-in error handler, dual-LLM fallback (Ollama + Cloud) and
            structured logging. All data stays local — GDPR compliant.
          </p>
        </Callout>

        {/* Concept */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">What are AI Workflows in n8n?</h2>
          <p className="text-white/70 leading-relaxed">
            An AI workflow in n8n is a chain of nodes that automates a business
            process while using a Large Language Model (LLM) for text processing.
            The difference to classic n8n workflows: at least one node calls an
            LLM — locally via Ollama or through a cloud API.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Typical use cases: email summarization, content generation,
            lead qualification, support responses and data extraction from
            unstructured text. The LLM handles tasks that rule-based automation
            cannot solve — understanding context, tone and intent.
          </p>
        </section>

        {/* Categories */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Workflow Categories</h2>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Email (3 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Daily Digest — summarize emails and post to chat</li>
                <li>Auto-Responder — answer common inquiries with AI</li>
                <li>Lead Capture — extract contact data from emails</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Social Media (3 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Content Generator — create posts from RSS feeds</li>
                <li>Post Scheduler — schedule and publish posts</li>
                <li>Engagement Monitor — track mentions and comments</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Revenue (3 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Stripe Payment Pipeline — webhook to download link</li>
                <li>Weekly Report — aggregate revenue data and report</li>
                <li>Subscription Lifecycle — trial, cancellation, upgrade</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Infrastructure (3 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Health Check — monitor containers, Ollama, disk usage</li>
                <li>Backup Monitor — verify backup status and alert</li>
                <li>Service Restart — auto-restart failed services</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 md:col-span-2">
              <h3 className="font-semibold text-white mb-2">Lead Generation (2 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Lead Qualification — AI scoring by company size, industry, inquiry quality</li>
                <li>Lead Nurture Sequence — personalized follow-up emails based on score</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Workflow Architecture</h2>
          <p className="text-white/70 leading-relaxed mb-4">
            All 14 workflows follow the same architecture. The error handler is not
            a separate workflow but integrated as a branch into every workflow.
          </p>

          <PlantUMLDiagram
            diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title n8n AI Workflow Bundle — Architecture

rectangle "Trigger" as trigger #1E3A5F {
  rectangle "Webhook" as wh #0F172A
  rectangle "Cron / Schedule" as cron #0F172A
  rectangle "Email Inbound" as email #0F172A
}

rectangle "Processing" as processing #1E3A5F {
  rectangle "Extract Data" as extract #0F172A
  rectangle "IF / Switch" as logic #0F172A
  rectangle "Transform / Set" as transform #0F172A
}

rectangle "LLM (Dual Fallback)" as llm #1E3A5F {
  rectangle "Ollama (Primary)" as ollama #0F172A
  rectangle "Cloud API (Fallback)" as cloud #0F172A
}

rectangle "Output" as output #1E3A5F {
  rectangle "Team-Chat / Slack" as chat #0F172A
  rectangle "Send Email" as send #0F172A
  rectangle "HTTP / API" as http #0F172A
}

rectangle "Error Handler" as error #5F1E1E {
  rectangle "Error Trigger" as errtrigger #0F172A
  rectangle "Log + Notify" as errlog #0F172A
  rectangle "Retry (optional)" as retry #0F172A
}

trigger --> processing
processing --> llm
ollama ..> cloud : Fallback on error
llm --> output
trigger ..> error : on error
processing ..> error : on error
llm ..> error : on error
output ..> error : on error
errtrigger --> errlog
errlog --> retry
@enduml`}
            caption="Workflow architecture: Trigger → Processing → LLM (Dual Fallback) → Output, with end-to-end error handling"
          />
        </section>

        {/* Error Handler Pattern */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Error Handling Pattern</h2>
          <p className="text-white/70 leading-relaxed">
            Error handling in v3 is based on the n8n Error Trigger node. This
            node fires automatically when any node in the workflow throws an
            error — whether it is an HTTP timeout, Ollama failure or invalid data.
          </p>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-white mb-2">What the Error Handler Does</h3>
            <ol className="text-gray-300 text-sm space-y-2">
              <li><strong>1. Structured logging</strong> — workflow name, node name, error message, timestamp as JSON</li>
              <li><strong>2. Send notification</strong> — Team-Chat, Slack or email (configurable)</li>
              <li><strong>3. Trigger retry (optional)</strong> — configurable delay (default: 30 seconds) and max retry count (default: 3)</li>
              <li><strong>4. Escalation</strong> — after reaching retry limit, an escalation message is sent</li>
            </ol>
          </div>

          <Callout type="tip" title="Configuring the Error Handler">
            <p>
              The error handler uses the same notification credentials as the
              main workflow. You only need to set up credentials once —
              the error handler picks them up automatically.
            </p>
          </Callout>
        </section>

        {/* Dual-LLM Pattern */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Dual-LLM Pattern</h2>
          <p className="text-white/70 leading-relaxed">
            Workflows with text generation use two LLM sources in a fallback
            chain. The primary call goes to Ollama (local). Only when Ollama
            is unreachable or returns an error does the cloud fallback activate.
          </p>

          <PlantUMLDiagram
            diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title Dual-LLM Fallback Pattern

start
:Prepare prompt;
:Ollama call (local);
if (Response OK?) then (yes)
  :Use local response;
else (no)
  :Cloud API call (fallback);
  if (Response OK?) then (yes)
    :Use cloud response;
  else (no)
    :Activate error handler;
    stop
  endif
endif
:Process result;
stop
@enduml`}
            caption="Dual-LLM: Ollama first, cloud only as fallback. Both failures lead to error handler."
          />

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-white mb-2">Configuration</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li><strong>Ollama URL</strong> — default: http://localhost:11434, configurable per workflow</li>
              <li><strong>Model</strong> — freely selectable (Mistral, Llama, Qwen, etc.)</li>
              <li><strong>Cloud provider</strong> — OpenAI or Anthropic (credential stored in n8n)</li>
              <li><strong>Local-only mode</strong> — disable cloud branch, error handler reports Ollama outages</li>
            </ul>
          </div>

          <Callout type="warning" title="GDPR Note">
            <p>
              If you enable the cloud fallback, data is sent to external servers.
              Verify whether this is GDPR compliant for your use case. In
              local-only mode, no data leaves your network.
            </p>
          </Callout>
        </section>

        {/* Best Practices */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Best Practices for n8n AI Workflows</h2>

          <div className="space-y-4 mt-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">1. Never hardcode credentials in nodes</h3>
              <p className="text-gray-300 text-sm">
                Use n8n Credentials for all external services. This simplifies
                rotation, auditing and prevents API keys from ending up in
                exported workflows.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">2. Test mode before activation</h3>
              <p className="text-gray-300 text-sm">
                Test every workflow in manual mode before activating it. Especially
                test the error handler — trigger an error deliberately (e.g., wrong
                Ollama URL) and verify the notification arrives.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">3. One workflow per task</h3>
              <p className="text-gray-300 text-sm">
                Do not build mega-workflows that do everything. Each workflow in the
                bundle has exactly one responsibility. This simplifies debugging,
                monitoring and independent activation/deactivation.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">4. PostgreSQL over SQLite</h3>
              <p className="text-gray-300 text-sm">
                For production n8n instances: use PostgreSQL as backend database.
                SQLite has locking issues with parallel workflow executions and does
                not scale beyond a single node.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">5. Mind n8n 2.x expression syntax</h3>
              <p className="text-gray-300 text-sm">
                In n8n 2.x, expressions must start with an = sign:
                ={`{{ $json.name }}`} instead of just {`{{ $json.name }}`}. Date
                formatting uses Luxon syntax: yyyy-MM-dd, not YYYY-MM-DD.
              </p>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 pr-4 text-white">Component</th>
                  <th className="text-left py-2 pr-4 text-white">Minimum</th>
                  <th className="text-left py-2 text-white">Recommended</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">n8n</td>
                  <td className="py-2 pr-4">2.0+</td>
                  <td className="py-2">2.x (latest version)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">Ollama</td>
                  <td className="py-2 pr-4">0.3+</td>
                  <td className="py-2">Latest version with GPU support</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">Database</td>
                  <td className="py-2 pr-4">SQLite (built-in)</td>
                  <td className="py-2">PostgreSQL 15+</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">Docker</td>
                  <td className="py-2 pr-4">Docker Compose</td>
                  <td className="py-2">Docker Swarm for multi-node</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">GPU (for Ollama)</td>
                  <td className="py-2 pr-4">6 GB VRAM</td>
                  <td className="py-2">24 GB VRAM (RTX 3090/4090)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n.io — Official Website</a></li>
            <li><a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Documentation</a> — Nodes, Expressions, API</li>
            <li><a href="https://docs.n8n.io/flow-logic/error-handling/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Error Handling</a> — Official docs on Error Trigger Nodes</li>
            <li><a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama</a> — Local LLM Runtime</li>
            <li><a href="/blog/2026-03-22-n8n-ai-workflow-bundle-v3" className="text-blue-400 hover:underline">Blog: n8n AI Workflow Bundle v3</a> — Introduction with setup guide</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-slate-500">
          All wiki articles are free. Looking for ready-made templates and bundles?
        </p>
        <a
          href="https://www.ai-engineering.at"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block"
        >
          View Products & Bundles →
        </a>
      </div>
    </div>
  )
}
