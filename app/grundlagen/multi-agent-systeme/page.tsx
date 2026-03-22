import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Multi-Agent Systeme erklärt | AI Engineering Wiki',
  description:
    'Was ist ein Multi-Agent System (MAS)? Vorteile gegenüber einem einzelnen LLM, Rollen, Kommunikation und typische Architektur-Patterns aus der Praxis.',
}

export default function MultiAgentSysteme() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Multi-Agent Systeme erklärt</h1>
        <p className="text-gray-400 mt-2">Grundlagen · 7 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Ein Multi-Agent System (MAS) nutzt spezialisierte AI-Agenten, die
            parallel arbeiten und sich über ein Kommunikationsprotokoll
            koordinieren. Vorteile gegenüber einem einzelnen LLM: echte
            Arbeitsteilung, Memory pro Agent, klare Rollen und Verantwortung.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Ein Multi-Agent System (MAS) besteht aus mehreren autonomen AI-Agenten, die gemeinsam komplexe Probleme lösen.
          Im Vergleich zu einem einzelnen LLM kann ein MAS parallel arbeiten, Aufgaben aufteilen und Ergebnisse über
          ein definiertes Kommunikationsprotokoll zusammenführen.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/single-vs-multi-agent.png" alt="Single Agent vs Multi-Agent System — Vergleich" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Single Agent vs Multi-Agent: Warum Arbeitsteilung bei AI-Systemen besser funktioniert</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Warum mehrere Agenten?</h2>
        <p className="text-gray-300">
          Ein einzelnes LLM ist wie ein Generalist — es kann viel, aber nichts wirklich 
          perfekt. Multi-Agent Systeme nutzen das Prinzip der Arbeitsteilung:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Single-LLM Problem</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Kontext-Fenster ist begrenzt</li>
              <li>Keine echte Parallelität</li>
              <li>Vergisst Details zwischen Tasks</li>
              <li>Keine Spezialisierung</li>
            </ul>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Multi-Agent Vorteile</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Spezialisierte Agenten pro Aufgabe</li>
              <li>Echte Parallelarbeit</li>
              <li>Memory pro Agent (und/oder shared)</li>
              <li>Klare Rollen und Verantwortung</li>
            </ul>
          </div>
        </div>

        <figure className="my-8">
          <img src="/images/diagrams/multi-agent-architektur-muster.png" alt="Multi-Agent Architektur-Muster — Hierarchisch, Peer-to-Peer, Pipeline" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Multi-Agent Architektur: Hierarchisch, Peer-to-Peer und Pipeline im Vergleich</figcaption>
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

title Agent-Kommunikation in einem Multi-Agent System

rectangle "Benutzer" as user
rectangle "Manager Agent\\n(@jim)" as manager #1E3A5F
rectangle "Coder Agent\\n(@jim01)" as coder #0F172A
rectangle "Review Agent\\n(@lisa01)" as reviewer #0F172A
rectangle "Test Agent\\n(@john01)" as tester #0F172A
rectangle "Mattermost\\n(Kommunikationsbus)" as mm #1a1a2e

user --> manager : Anfrage
manager --> mm : Task verteilen
mm --> coder : Code schreiben
mm --> reviewer : Code prüfen
mm --> tester : Tests ausführen
coder --> mm : PR erstellt
reviewer --> mm : Approved
tester --> mm : Tests bestanden
mm --> manager : Ergebnisse
manager --> user : Fertig
@enduml`}
          caption="Agent-Kommunikation: Manager delegiert über Mattermost an spezialisierte Worker"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Architektur-Muster</h2>
        
        <h3 className="text-lg font-medium text-white mt-4">1. Hierarchisches Modell</h3>
        <p className="text-gray-300">
          Ein Manager-Agent delegiert Aufgaben an spezialisierte Worker-Agenten. 
          Unser Team funktioniert so: @jim (Manager) → @jim01, @lisa01, @john01 (Worker).
        </p>

        <h3 className="text-lg font-medium text-white mt-4">2. Peer-to-Peer Modell</h3>
        <p className="text-gray-300">
          Agenten kommunizieren gleichberechtigt. Bei komplexen Problemen stimmen 
          sie sich untereinander ab. Für kleinere Teams oder spezifische Tasks.
        </p>

        <h3 className="text-lg font-medium text-white mt-4">3. Pipeline-Modell</h3>
        <p className="text-gray-300">
          Agenten arbeiten sequenziell — die Ausgabe von Agent A wird zur Eingabe 
          von Agent B. Gut für linear aufgebaute Workflows.
        </p>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam componentBorderColor #334155
skinparam componentBackgroundColor #0F172A

title Architektur-Muster im Vergleich

rectangle "Hierarchisch" {
  rectangle "Manager" as h_mgr #1E3A5F
  rectangle "Worker A" as h_wa #0F172A
  rectangle "Worker B" as h_wb #0F172A
  rectangle "Worker C" as h_wc #0F172A
  h_mgr --> h_wa
  h_mgr --> h_wb
  h_mgr --> h_wc
}

rectangle "Peer-to-Peer" {
  rectangle "Agent X" as p_x #0F172A
  rectangle "Agent Y" as p_y #0F172A
  rectangle "Agent Z" as p_z #0F172A
  p_x <--> p_y
  p_y <--> p_z
  p_x <--> p_z
}

rectangle "Pipeline" {
  rectangle "Schritt 1" as s1 #0F172A
  rectangle "Schritt 2" as s2 #0F172A
  rectangle "Schritt 3" as s3 #0F172A
  s1 --> s2
  s2 --> s3
}
@enduml`}
          caption="Drei Architektur-Muster: Hierarchisch, Peer-to-Peer und Pipeline"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Kommunikationsparadigmen</h2>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Paradigma</th>
                <th className="text-left py-2 text-gray-400">Beschreibung</th>
                <th className="text-left py-2 text-gray-400">Use Case</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Blackboard</td>
                <td className="py-2">Gemeinsamer Speicher, alle lesen/schreiben</td>
                <td className="py-2">Brainstorming</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Message Passing</td>
                <td className="py-2">Direkte Nachrichten zwischen Agenten</td>
                <td className="py-2">Delegation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Contract Net</td>
                <td className="py-2">Task ausschreiben, Agent bietet</td>
                <td className="py-2">Dynamic workloads</td>
              </tr>
              <tr>
                <td className="py-2">Publish/Subscribe</td>
                <td className="py-2">Agenten abonnieren Topics</td>
                <td className="py-2">Event-driven</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Setup in der Praxis</h2>
        <p className="text-gray-300">
          Wir nutzen Mattermost als Kommunikationsbus. Das funktioniert so:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Beispiel: Feature-Request</h3>
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`User postet in #echo_log:
"Neue Feature: Dark Mode für Dashboard"

@jim (Manager) → priorisiert:
→ @jim01: Frontend-Implementation
→ @lisa01: CSS/Styling Review
→ @john01: Screenshot-Tests

@jim01 → setzt um → postet PR
@lisa01 → reviewed → approved
@john01 → tested → passed

@jim → merged → posted "Fertig"`}
          </pre>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Herausforderungen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Koordination:</strong> Agenten können sich in die Quere kommen</li>
          <li><strong>Konsistenz:</strong> Verschiedene Agenten können widersprüchliche Infos haben</li>
          <li><strong>Fehler:</strong> Ein fehlerhafter Agent kann die gesamte Kette beeinflussen</li>
          <li><strong>Monitoring:</strong> Es muss klar sein, welcher Agent was gemacht hat</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Best Practices</h2>
        <ol className="list-decimal list-inside text-gray-300 space-y-2">
          <li>Klare Rollen definieren — jeder Agent weiß, wofür er zuständig ist</li>
          <li>Gemeinsames Memory-System nutzen für Wissen, das alle brauchen</li>
          <li>Message-Format standardisieren (wir nutzen Markdown)</li>
          <li>Guardrails einbauen — Agenten dürfen nichts Destruktives ohne Bestätigung</li>
          <li>Alles loggen — Audit-Trail ist essentiell für DSGVO</li>
        </ol>

        <Callout type="tip" title="Praxis-Tipp">
          <p>
            Starte mit 2-3 Agenten (Manager + 1-2 Worker). Erst wenn die
            Koordination stabil läuft, weitere hinzufügen. Zu viele Agenten
            ohne klare Rollen führen zu Chaos, nicht zu Produktivität.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Zusammenfassung</h3>
          <p className="text-gray-300">
            Multi-Agent Systeme sind mächtiger als einzelne LLMs, aber sie brauchen
            Struktur. Mit klaren Rollen, einem Kommunikationsprotokoll und dem richtigen
            Tooling kannst du ein Team aufbauen, das autonom arbeitet — und das alles
            lokal und DSGVO-konform.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://docs.anthropic.com/en/docs/build-with-claude/agent-patterns" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Building Effective Agents</a> — Agent Patterns und Best Practices</li>
            <li><a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic Engineering: Building Effective Agents</a></li>
            <li><a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LangGraph Documentation</a> — Multi-Agent Orchestration Framework</li>
            <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: microsoft/autogen</a> — Multi-Agent Conversation Framework</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
