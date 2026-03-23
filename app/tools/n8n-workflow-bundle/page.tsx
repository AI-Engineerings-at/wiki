import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'n8n AI Workflow Bundle v3 | AI Engineering Wiki',
  description:
    '14 produktionsreife n8n-Workflows mit Error Handling, Dual-LLM-Fallback und DSGVO-Compliance. Architektur, Kategorien und Best Practices.',
}

export default function N8nWorkflowBundle() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          n8n AI Workflow Bundle v3
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          14 Enterprise-Workflows für lokale Automatisierung mit Error Handling,
          Dual-LLM-Fallback und strukturiertem Logging.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Stand: März 2026</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">n8n 2.x</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">v3.0</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            14 produktionsreife n8n-Workflows in 5 Kategorien: Email, Social Media,
            Revenue, Infrastruktur und Lead-Generierung. Jeder Workflow hat einen
            integrierten Error Handler, Dual-LLM-Fallback (Ollama + Cloud) und
            strukturiertes Logging. Alle Daten bleiben lokal — DSGVO-konform.
          </p>
        </Callout>

        {/* Konzept */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Was sind AI-Workflows in n8n?</h2>
          <p className="text-white/70 leading-relaxed">
            Ein AI-Workflow in n8n ist eine Kette von Nodes, die einen Geschäftsprozess
            automatisiert und dabei ein Large Language Model (LLM) für Textverarbeitung
            einsetzt. Der Unterschied zu klassischen n8n-Workflows: Mindestens eine Node
            ruft ein LLM auf — lokal via Ollama oder über eine Cloud-API.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Typische Einsatzbereiche: E-Mail-Zusammenfassungen, Content-Generierung,
            Lead-Qualifizierung, Support-Antworten und Datenextraktion aus
            unstrukturiertem Text. Das LLM übernimmt die Aufgaben, die regelbasierte
            Automation nicht lösen kann — Verständnis von Kontext, Tonalität und Absicht.
          </p>
        </section>

        {/* Kategorien */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Die Workflow-Kategorien</h2>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Email (3 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Daily Digest — E-Mails zusammenfassen und in Chat posten</li>
                <li>Auto-Responder — häufige Anfragen mit AI beantworten</li>
                <li>Lead Capture — Kontaktdaten aus E-Mails extrahieren</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Social Media (3 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Content Generator — Posts aus RSS-Feeds generieren</li>
                <li>Post Scheduler — Veröffentlichung planen und ausführen</li>
                <li>Engagement Monitor — Mentions und Kommentare überwachen</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Revenue (3 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Stripe Payment Pipeline — Webhook bis Download-Link</li>
                <li>Weekly Report — Umsatzdaten aggregieren und reporten</li>
                <li>Subscription Lifecycle — Trial, Kündigung, Upgrade</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Infrastruktur (3 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Health Check — Container, Ollama, Disk-Usage prüfen</li>
                <li>Backup Monitor — Backup-Status verifizieren und alerten</li>
                <li>Service Restart — Ausgefallene Services automatisch neustarten</li>
              </ul>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 md:col-span-2">
              <h3 className="font-semibold text-white mb-2">Lead-Generierung (2 Workflows)</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Lead Qualification — AI-Scoring nach Firmengröße, Branche, Anfrage-Qualität</li>
                <li>Lead Nurture Sequence — Personalisierte Follow-up-E-Mails basierend auf Score</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Architektur-Diagramm */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Workflow-Architektur</h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Alle 14 Workflows folgen derselben Architektur. Der Error Handler ist kein
            separater Workflow, sondern als Branch in jeden Workflow integriert.
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

title n8n AI Workflow Bundle — Architektur

rectangle "Trigger" as trigger #1E3A5F {
  rectangle "Webhook" as wh #0F172A
  rectangle "Cron / Schedule" as cron #0F172A
  rectangle "E-Mail Eingang" as email #0F172A
}

rectangle "Verarbeitung" as processing #1E3A5F {
  rectangle "Daten extrahieren" as extract #0F172A
  rectangle "IF / Switch" as logic #0F172A
  rectangle "Transform / Set" as transform #0F172A
}

rectangle "LLM (Dual-Fallback)" as llm #1E3A5F {
  rectangle "Ollama (Primary)" as ollama #0F172A
  rectangle "Cloud API (Fallback)" as cloud #0F172A
}

rectangle "Ausgabe" as output #1E3A5F {
  rectangle "Team-Chat / Slack" as chat #0F172A
  rectangle "E-Mail senden" as send #0F172A
  rectangle "HTTP / API" as http #0F172A
}

rectangle "Error Handler" as error #5F1E1E {
  rectangle "Error Trigger" as errtrigger #0F172A
  rectangle "Log + Notify" as errlog #0F172A
  rectangle "Retry (optional)" as retry #0F172A
}

trigger --> processing
processing --> llm
ollama ..> cloud : Fallback bei Fehler
llm --> output
trigger ..> error : bei Fehler
processing ..> error : bei Fehler
llm ..> error : bei Fehler
output ..> error : bei Fehler
errtrigger --> errlog
errlog --> retry
@enduml`}
            caption="Workflow-Architektur: Trigger → Verarbeitung → LLM (Dual-Fallback) → Ausgabe, mit durchgängigem Error Handler"
          />
        </section>

        {/* Error Handler Pattern */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Error Handling Pattern</h2>
          <p className="text-white/70 leading-relaxed">
            Das Error Handling in v3 basiert auf dem n8n Error Trigger Node. Dieser
            Node wird automatisch ausgelöst, wenn irgendeine Node im Workflow einen
            Fehler wirft — egal ob HTTP-Timeout, Ollama-Fehler oder ungültige Daten.
          </p>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-white mb-2">Was der Error Handler macht</h3>
            <ol className="text-gray-300 text-sm space-y-2">
              <li><strong>1. Fehler strukturiert loggen</strong> — Workflow-Name, Node-Name, Fehlermeldung, Zeitstempel als JSON</li>
              <li><strong>2. Notification senden</strong> — Team-Chat, Slack oder E-Mail (konfigurierbar)</li>
              <li><strong>3. Retry auslösen (optional)</strong> — mit konfigurierbarem Delay (Standard: 30 Sekunden) und maximalem Retry-Count (Standard: 3)</li>
              <li><strong>4. Eskalation</strong> — nach Erreichen des Retry-Limits wird eine Eskalations-Nachricht gesendet</li>
            </ol>
          </div>

          <Callout type="tip" title="Error Handler konfigurieren">
            <p>
              Der Error Handler nutzt dieselben Notification-Credentials wie der
              Haupt-Workflow. Du musst nur die Credentials einmal einrichten —
              der Error Handler verwendet sie automatisch.
            </p>
          </Callout>
        </section>

        {/* Dual-LLM Pattern */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Dual-LLM Pattern</h2>
          <p className="text-white/70 leading-relaxed">
            Workflows mit Textgenerierung nutzen zwei LLM-Quellen in einer
            Fallback-Kette. Der primäre Call geht an Ollama (lokal). Nur wenn
            Ollama nicht erreichbar ist oder einen Fehler zurückgibt, wird der
            Cloud-Fallback aktiviert.
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
:Prompt vorbereiten;
:Ollama Call (lokal);
if (Antwort OK?) then (ja)
  :Lokale Antwort verwenden;
else (nein)
  :Cloud API Call (Fallback);
  if (Antwort OK?) then (ja)
    :Cloud-Antwort verwenden;
  else (nein)
    :Error Handler aktivieren;
    stop
  endif
endif
:Ergebnis weiterverarbeiten;
stop
@enduml`}
            caption="Dual-LLM: Ollama zuerst, Cloud nur als Fallback. Beide Fehler führen zum Error Handler."
          />

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-white mb-2">Konfiguration</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li><strong>Ollama-URL</strong> — Standard: http://localhost:11434, anpassbar pro Workflow</li>
              <li><strong>Modell</strong> — frei wählbar (Mistral, Llama, Qwen, etc.)</li>
              <li><strong>Cloud-Provider</strong> — OpenAI oder Anthropic (Credential in n8n hinterlegen)</li>
              <li><strong>Nur-Lokal-Modus</strong> — Cloud-Branch deaktivieren, Error Handler meldet Ollama-Ausfälle</li>
            </ul>
          </div>

          <Callout type="warning" title="DSGVO-Hinweis">
            <p>
              Wenn du den Cloud-Fallback aktivierst, werden Daten an externe Server
              gesendet. Prüfe, ob das für deinen Anwendungsfall DSGVO-konform ist.
              Im Nur-Lokal-Modus verlassen keine Daten dein Netzwerk.
            </p>
          </Callout>
        </section>

        {/* Best Practices */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Best Practices für n8n AI-Workflows</h2>

          <div className="space-y-4 mt-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">1. Credentials nie in Nodes hardcoden</h3>
              <p className="text-gray-300 text-sm">
                Nutze n8n Credentials für alle externen Services. Das erleichtert
                Rotation, Auditing und verhindert, dass API-Keys in exportierten
                Workflows landen.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">2. Test-Modus vor Aktivierung</h3>
              <p className="text-gray-300 text-sm">
                Teste jeden Workflow im Manual-Modus, bevor du ihn aktivierst.
                Prüfe insbesondere den Error Handler — löse absichtlich einen Fehler
                aus (z.B. falsche Ollama-URL) und verifiziere, dass die Notification ankommt.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">3. Ein Workflow pro Aufgabe</h3>
              <p className="text-gray-300 text-sm">
                Baue keine Mega-Workflows, die alles machen. Jeder Workflow im Bundle
                hat genau eine Aufgabe. Das erleichtert Debugging, Monitoring und
                unabhängige Aktivierung/Deaktivierung.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">4. PostgreSQL statt SQLite</h3>
              <p className="text-gray-300 text-sm">
                Für produktive n8n-Instanzen: Nutze PostgreSQL als Backend-Datenbank.
                SQLite hat Lock-Probleme bei parallelen Workflow-Ausführungen und
                skaliert nicht über einen Node hinaus.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">5. n8n 2.x Expression-Syntax beachten</h3>
              <p className="text-gray-300 text-sm">
                In n8n 2.x müssen Expressions mit einem = Zeichen beginnen:
                ={`{{ $json.name }}`} statt nur {`{{ $json.name }}`}. Datumsformat
                ist Luxon-Syntax: yyyy-MM-dd, nicht YYYY-MM-DD.
              </p>
            </div>
          </div>
        </section>

        {/* Voraussetzungen */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Voraussetzungen</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 pr-4 text-white">Komponente</th>
                  <th className="text-left py-2 pr-4 text-white">Minimum</th>
                  <th className="text-left py-2 text-white">Empfohlen</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">n8n</td>
                  <td className="py-2 pr-4">2.0+</td>
                  <td className="py-2">2.x (aktuellste Version)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">Ollama</td>
                  <td className="py-2 pr-4">0.3+</td>
                  <td className="py-2">Aktuellste Version mit GPU-Support</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">Datenbank</td>
                  <td className="py-2 pr-4">SQLite (mitgeliefert)</td>
                  <td className="py-2">PostgreSQL 15+</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">Docker</td>
                  <td className="py-2 pr-4">Docker Compose</td>
                  <td className="py-2">Docker Swarm für Multi-Node</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 pr-4">GPU (für Ollama)</td>
                  <td className="py-2 pr-4">6 GB VRAM</td>
                  <td className="py-2">24 GB VRAM (RTX 3090/4090)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n.io — Offizielle Website</a></li>
            <li><a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Dokumentation</a> — Nodes, Expressions, API</li>
            <li><a href="https://docs.n8n.io/flow-logic/error-handling/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Error Handling</a> — Offizielle Dokumentation zu Error Trigger Nodes</li>
            <li><a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama</a> — Lokale LLM Runtime</li>
            <li><a href="/blog/2026-03-22-n8n-ai-workflow-bundle-v3" className="text-blue-400 hover:underline">Blog: n8n AI Workflow Bundle v3</a> — Einführungsartikel mit Setup-Anleitung</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/tools/n8n-fuer-anfaenger" className="text-blue-400 hover:text-blue-300">n8n fuer Anfaenger</a>
          {' · '}
          <a href="/tools/rag-guide" className="text-blue-400 hover:text-blue-300">RAG Guide</a>
          {' · '}
          <a href="/tools/grafana-monitoring" className="text-blue-400 hover:text-blue-300">Grafana Monitoring</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
    </div>
  )
}
