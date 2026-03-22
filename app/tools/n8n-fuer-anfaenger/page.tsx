import { CaseStudyBox } from '../../../components/CaseStudyBox'
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'n8n für Anfänger | AI Engineering Wiki',
  description:
    'n8n Workflow-Automatisierung im lokalen AI-Stack: Installation, Nodes, Beispiele und Integration mit Ollama, Slack/Mattermost und Stripe.',
}

export default function N8nAnfänger() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">n8n: Workflow-Automatisierung</h1>
        <p className="text-gray-400 mt-2">Tools · 8 min</p>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Stand: März 2026</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">n8n 2.x</span>
        </div>
      </div>

      <figure className="my-8">
        <img src="/images/generated/hero-n8n-automation-v2.png" alt="n8n Workflow Automation" className="rounded-xl border border-white/10 w-full" />
        <figcaption className="text-center text-white/40 text-sm mt-2">n8n Workflow Automation</figcaption>
      </figure>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            n8n ist ein Open-Source Workflow-Automatisierungstool. Self-hosted,
            400+ Integrationen, visueller Editor. Verbindet Ollama, Stripe,
            Mattermost und mehr — ohne Programmierung. In 5 Minuten per Docker
            installiert.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          n8n ist ein leistungsstarkes Tool für Workflow-Automatisierung.
          Es verbindet Apps, Dienste und APIs — ohne Programmierung.
        </p>

        <CaseStudyBox
          tool="n8n"
          stat="36 aktiven Workflows"
          description="für Revenue-Pipeline, Content-Automation und Infrastruktur-Monitoring"
          blogLink="/blog/2026-03-08-36-n8n-workflows"
        />

        <figure className="my-8">
          <img src="/images/diagrams/tools-n8n-architektur.png" alt="n8n Architektur — Nodes, Workflows, Trigger und Integrationen" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">n8n Architektur: Wie Nodes, Workflows und Integrationen zusammenspielen</figcaption>
        </figure>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title n8n Workflow Architektur

rectangle "Trigger" as trigger #1E3A5F {
  rectangle "Webhook" as wh #0F172A
  rectangle "Cron / Schedule" as cron #0F172A
  rectangle "E-Mail Eingang" as email #0F172A
}

rectangle "Verarbeitung" as processing #1E3A5F {
  rectangle "IF / Switch" as logic #0F172A
  rectangle "Ollama LLM" as llm #0F172A
  rectangle "Code Node" as code #0F172A
  rectangle "Set / Transform" as transform #0F172A
}

rectangle "Ausgabe" as output #1E3A5F {
  rectangle "Mattermost / Slack" as chat #0F172A
  rectangle "Datenbank" as db #0F172A
  rectangle "E-Mail senden" as send #0F172A
  rectangle "HTTP Request" as http #0F172A
}

trigger --> processing
processing --> output
@enduml`}
          caption="n8n Workflow: Trigger lösen Verarbeitung aus, Ergebnisse gehen an Ausgabe-Nodes"
        />

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title Beispiel-Workflow: Stripe Payment Fulfillment

start
:Stripe Webhook empfangen;
if (Payment erfolgreich?) then (ja)
  :Bestelldaten extrahieren;
  :Ollama: Bestätigungsmail generieren;
  :E-Mail an Kunden senden;
  :Mattermost Notification;
else (nein)
  :Fehler loggen;
  :Alert an Admin;
endif
stop
@enduml`}
          caption="Beispiel: Stripe Payment Webhook triggert AI-generierte Bestätigungsmail"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Warum n8n?</h2>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-900 border border-green-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Vorteile</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong>Self-hosted</strong> — all data stays local</li>
              <li>• <strong>Open Source</strong> — free</li>
              <li>• <strong>400+ integrations</strong></li>
              <li>• <strong>Code nodes</strong> for custom logic</li>
            </ul>
          </div>
          <div className="bg-gray-900 border border-red-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Nachteile</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• <strong>More setup</strong> than cloud tools</li>
              <li>• <strong>You're responsible</strong> for hosting</li>
              <li>• <strong>Steeper learning curve</strong></li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Installation</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Grundkonzepte</h2>

        <p className="text-gray-300">
          <strong>Nodes</strong> sind die Bausteine. Jede Node macht eine Sache.
          <strong>Workflows</strong> verbinden Nodes zu Ketten.
          <strong>Expressions</strong> wie {"{{$json.name}}"} manipulieren Daten.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Nützliche Nodes</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>• <strong>HTTP Request</strong> — API calls</li>
          <li>• <strong>IF</strong> — Conditional branching</li>
          <li>• <strong>Set</strong> — Transform data</li>
          <li>• <strong>Function</strong> — Custom JavaScript code</li>
          <li>• <strong>Slack / Mattermost</strong> — Send messages</li>
          <li>• <strong>Ollama</strong> — Local LLMs</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Praktische Beispiele</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Stripe Payment -> E-Mail
Webhook (Stripe) -> IF (success) -> Email Send

# RSS -> Newsletter  
RSS Read (täglich) -> Slack -> Email Send

# Formular -> AI -> Speichern
Webhook -> Ollama -> Notion -> Slack`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Best Practices</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-2">
          <li>• <strong>Start small</strong> — first simple, then expand</li>
          <li>• <strong>Add error handling</strong></li>
          <li>• <strong>Use test mode</strong></li>
          <li>• <strong>Check logs</strong> for debugging</li>
        </ol>

        <Callout type="tip" title="n8n 2.x Expressions">
          <p>
            In n8n 2.x müssen Expressions mit einem = Zeichen beginnen.
            Beispiel: ={`{{ $json.name }}`} statt nur {`{{ $json.name }}`}.
            Datums-Formatierung nutzt Luxon (yyyy-MM-dd), nicht Moment.js.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Nächste Schritte</h3>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>n8n installieren mit Docker</li>
            <li>Ersten Workflow: Webhook → Slack-Notification</li>
            <li>AI-Workflows erkunden</li>
          </ul>
        </div>

        <Callout type="info" title="Siehe auch">
          <p>
            n8n bietet ein offizielles{" "}
            <a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Self-hosted AI Starter Kit
            </a>{" "}
            — ein guter Ausgangspunkt wenn du nur n8n + Ollama brauchst.
          </p>
        </Callout>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n.io — Offizielle Website</a></li>
            <li><a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Dokumentation</a> — Nodes, Expressions, API</li>
            <li><a href="https://github.com/n8n-io/n8n" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: n8n-io/n8n</a> — Source Code</li>
            <li><a href="https://community.n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Community Forum</a> — Hilfe und Workflow-Vorlagen</li>
            <li><a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Self-hosted AI Starter Kit</a> — Offizielles Starter Kit für lokale AI mit n8n, Ollama und Qdrant</li>
            <li><a href="https://docs.n8n.io/advanced-ai/intro-tutorial/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n AI Tutorial</a> — Offizielles Tutorial: AI-Workflow mit n8n bauen</li>
            <li><a href="https://docs.n8n.io/hosting/starter-kits/ai-starter-kit/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n AI Starter Kit Dokumentation</a> — Offizielle Dokumentation zum Self-hosted AI Starter Kit</li>
            <li><a href="https://www.datacamp.com/de/tutorial/local-ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">DataCamp: Lokale KI mit Docker, n8n, Qdrant und Ollama</a> — Schritt-für-Schritt Tutorial für lokale AI-Infrastruktur</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-slate-500">
          Alle Wiki-Artikel sind kostenlos. Wenn du fertige Templates und Bundles suchst:
        </p>
        <a
          href="https://www.ai-engineering.at"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block"
        >
          Produkte & Bundles ansehen →
        </a>
      </div>
    </div>
  )
}
