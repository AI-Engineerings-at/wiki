import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Agent Rollen & Verantwortung | AI Engineering Wiki',
  description:
    'Rollenmodell für Multi-Agent Systeme: Orchestrator, Worker, QA/Review und Infra. Klare Verantwortung, Boundaries und Eskalation in der Praxis.',
}

const agentRollenDiagram = `@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

rectangle "CEO / Auftraggeber" as ceo
rectangle "Manager / Orchestrator" as manager
rectangle "Worker: Frontend" as worker1
rectangle "Worker: Backend" as worker2
rectangle "Worker: QA/Content" as worker3
rectangle "Guard / Quality Assurance" as guard
rectangle "Researcher" as researcher
rectangle "Browser Agent" as browser

ceo -down-> manager : delegiert
manager -down-> worker1 : koordiniert
manager -down-> worker2 : koordiniert
manager -down-> worker3 : koordiniert
manager -down-> guard : prüft
worker1 -right-> guard : Output
worker2 -right-> guard : Output
worker3 -right-> guard : Output
manager -down-> researcher : Recherche
manager -down-> browser : Web-Aktionen

@enduml`

export default function AgentRollen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Agent Rollen und Verantwortung</h1>
        <p className="text-gray-400 mt-2">Grundlagen · 6 min</p>
      </div>

      <Callout type="summary" title="Überblick">
        Rollenmodell für Multi-Agent Systeme: Manager/Orchestrator koordiniert, Worker führen aus,
        Guards prüfen die Qualität. Mit RACI-Matrix, Eskalationspfaden und konkreten Beispielen
        aus unserem eigenen Agent-Team.
      </Callout>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Ein Multi-Agent System funktioniert nur mit klaren Rollen. Jeder Agent muss wissen, was seine Aufgabe ist,
          welche Boundaries er hat und an wen er bei Problemen eskaliert — wie in einem menschlichen Team.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/agent-rollen-pyramide.png" alt="Agent Rollen Pyramide — CEO, Manager, Worker, Guard" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Agent Rollen Pyramide: Von CEO über Manager zu spezialisierten Workern</figcaption>
        </figure>

        <PlantUMLDiagram diagram={agentRollenDiagram} caption="Rollen-Übersicht: CEO, Manager, Worker, Guard, Researcher und Browser Agent" />

        <h2 className="text-xl font-semibold text-white mt-8">Das Minimum Viable Team</h2>
        <p className="text-gray-300">
          Für die meisten Anwendungen brauchst du mindestens diese drei Rollen:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">MANAGER</span>
              <h3 className="font-semibold text-white">Manager / Orchestrator</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Koordiniert alle anderen Agenten. Nimmt Anfragen entgegen, priorisiert sie 
              und delegiert an die richtigen Worker. Bei uns: Manager-Agent
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">WORKER</span>
              <h3 className="font-semibold text-white">Worker / Executor</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Führt die eigentliche Arbeit aus. Code schreiben, Infrastruktur aufsetzen, 
              Content erstellen. Bei uns: Developer-Agent, Infrastructure-Agent, QA-Agent
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded">GUARD</span>
              <h3 className="font-semibold text-white">Guard / Quality Assurance</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Prüft die Arbeit der Worker. Läuft Tests, validiert Outputs, verhindert 
              Fehler. Kann eigenständig sein oder in Worker integriert.
            </p>
          </div>
        </div>

        <figure className="my-8">
          <img src="/images/diagrams/agent-rollen-minimum-viable-team.png" alt="Minimum Viable Agent Team — Manager, Worker, Guard" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Minimum Viable Team: Die drei Rollen die jedes Agent-System braucht</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Warum Agenten Tool-Einschränkungen brauchen</h2>
        <p className="text-gray-300">
          Warum nicht einfach jedem Agent Zugang zu jedem Tool geben? Die Antwort ist Sicherheit.
          Du würdest deinem Praktikanten nicht die Schlüssel zum Produktionsserver geben. Zugang
          einschränken ist keine Frage von Misstrauen — es geht darum, Unfälle zu verhindern.
        </p>
        <p className="text-gray-300 mt-2">
          Ein Researcher-Agent ist ein gutes Beispiel: Sein Job ist es, zu untersuchen und zu
          analysieren. Er liest Dateien, sucht nach Informationen und stellt Reports zusammen.
          Aber er kann keine Dateien schreiben oder Systembefehle ausführen. Eine Rechercheaufgabe
          sollte nie versehentlich eine wichtige Datei überschreiben. Die Einschränkung macht den
          Agent sicherer, ohne ihn für seinen eigentlichen Job weniger nützlich zu machen.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Context Loading: Warum jeder Agent andere Dateien liest</h2>
        <p className="text-gray-300">
          Wenn ein Agent aktiviert wird, lädt er nicht jede Datei im System. Er lädt nur die
          Dateien, die für seine Rolle relevant sind. Der Shop Manager lädt den Produktkatalog
          und Preisinformationen. Der Content Writer lädt den Brand-Voice-Guide und den
          Redaktionskalender.
        </p>
        <p className="text-gray-300 mt-2">
          Dieses selektive Context Loading dient zwei Zwecken: Erstens hält es den Agent fokussiert —
          ein Agent mit weniger, aber relevanterem Kontext liefert bessere Ergebnisse. Zweitens spart
          es Token-Nutzung, was schnellere Antworten und niedrigere API-Kosten bedeutet.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Erweiterte Rollen</h2>
        <p className="text-gray-300">
          Für komplexere Setups können diese Rollen hinzukommen:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Rolle</th>
                <th className="text-left py-2 text-gray-400">Aufgabe</th>
                <th className="text-left py-2 text-gray-400">Tooling</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Researcher</td>
                <td className="py-2">Recherche, Fakten-Check, Quellen</td>
                <td className="py-2">Web-Search, RSS</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Browser</td>
                <td className="py-2">Web-Aktionen, Screenshots</td>
                <td className="py-2">Playwright, Puppeteer</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Infra</td>
                <td className="py-2">Deploy, Monitoring, Backups</td>
                <td className="py-2">Docker, Prometheus</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Security</td>
                <td className="py-2">Access Control, Auditing</td>
                <td className="py-2">Vault, Logs</td>
              </tr>
              <tr>
                <td className="py-2">Support</td>
                <td className="py-2">Kundenanfragen, Tickets</td>
                <td className="py-2">Email, Chat</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Team als Referenz</h2>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Agent</th>
                <th className="text-left py-2 text-gray-400">Rolle</th>
                <th className="text-left py-2 text-gray-400">Verantwortung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">CEO</td>
                <td className="py-2">CEO / Auftraggeber</td>
                <td className="py-2">Finale Entscheidungen, Business-Strategie</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">Manager-Agent</td>
                <td className="py-2">Manager</td>
                <td className="py-2">Priorisierung, Koordination, Eskalationen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">Developer-Agent</td>
                <td className="py-2">Worker: Frontend/App/CI</td>
                <td className="py-2">Next.js, E2E Tests, Git, Deploy</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">Infrastructure-Agent</td>
                <td className="py-2">Worker: Backend/Infra</td>
                <td className="py-2">n8n, Docker, Monitoring, Delivery</td>
              </tr>
              <tr>
                <td className="py-2 text-white">QA-Agent</td>
                <td className="py-2">Worker: QA/Content</td>
                <td className="py-2">Testing, Research, Screenshots</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Verantwortungsketten (RACI)</h2>
        <p className="text-gray-300">
          Für jede Aufgabe sollte klar sein, wer was macht. Wir nutzen RACI:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Buchstabe</th>
                <th className="text-left py-2 text-gray-400">Bedeutung</th>
                <th className="text-left py-2 text-gray-400">Im Team</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2"><strong>R</strong>esponsible</td>
                <td className="py-2">Führt die Aufgabe aus</td>
                <td className="py-2">Worker-Agent</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2"><strong>A</strong>ccountable</td>
                <td className="py-2">Verantwortlich für Ergebnis</td>
                <td className="py-2">Manager-Agent</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2"><strong>C</strong>onsulted</td>
                <td className="py-2">Wird gefragt</td>
                <td className="py-2">Andere Worker</td>
              </tr>
              <tr>
                <td className="py-2"><strong>I</strong>nformed</td>
                <td className="py-2">Wird informiert</td>
                <td className="py-2">Alle / CEO</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Agent-Zusammenarbeit und Handoffs</h2>
        <p className="text-gray-300">
          Manchmal erfordert eine Aufgabe mehr als einen Agent. Zum Beispiel: "Recherchiere unseren
          Top-Konkurrenten und schreib dann einen Blogpost, der unser Produkt mit ihrem vergleicht."
          Das beinhaltet, dass der Researcher-Agent Informationen sammelt und der Content-Writer-Agent
          den Blogpost erstellt.
        </p>
        <p className="text-gray-300 mt-2">
          Das System löst das durch Handoffs: Der erste Agent erledigt seinen Teil der Arbeit und
          speichert das Ergebnis. Der zweite Agent nimmt dieses Ergebnis als Input und macht weiter.
          Jeder Agent arbeitet innerhalb seiner eigenen Grenzen, aber das Ergebnis ist eine nahtlose
          Zusammenarbeit — die Sicherheitsvorteile eingeschränkter Spezialisten kombiniert mit der
          Flexibilität von Multi-Agent-Zusammenarbeit.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Boundaries definieren</h2>
        <p className="text-gray-300">
          Jeder Agent muss wissen, was er NICHT tun darf:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li>Keine Änderungen an Credentials ohne Bestätigung</li>
          <li>Keine destructive Commands (rm -rf, etc.) ohne explizite Freigabe</li>
          <li>Keine externen API-Calls ohne Kontext</li>
          <li>Keine Outputs über 10.000 Tokens ohne Chunking</li>
          <li>Keine Änderungen an Produktionssystemen ohne Tests</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Eskalationspfade</h2>
        <p className="text-gray-300">
          Wenn etwas schiefgeht, gibt es klare Eskalationsstufen:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <pre className="text-sm text-gray-300">
{`1. Worker erkennt Problem → versucht Fix (2 Versuche)
   ↓
2. Fix funktioniert nicht → postet Error + Context in Channel
   ↓
3. Manager (Manager-Agent) übernimmt → entweder:
   a) Selbst lösen
   b) An anderen Worker delegieren
   ↓
4. Manager kann nicht lösen → eskaliert an CEO (CEO)
   ↓
5. CEO entscheidet → weitermachen / verwerfen / extern holen`}
          </pre>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Checkliste: Eigene Rollen definieren</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>[ ] Welche Aufgaben hat mein Team?</li>
            <li>[ ] Wer ist wofür verantwortlich (RACI)?</li>
            <li>[ ] Welche Boundaries hat jeder Agent?</li>
            <li>[ ] Wie eskaliert man bei Problemen?</li>
            <li>[ ] Welche Tools nutzt jeder Agent?</li>
          </ul>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://github.com/crewAIInc/crewAI" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CrewAI</a> — Framework für rollenbasierte AI-Agenten</li>
            <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AutoGen</a> — Multi-Agent Conversation Framework (Microsoft)</li>
            <li><a href="https://github.com/humanlayer/12-factor-agents" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">12-Factor Agents</a> — Prinzipien für produktionstaugliche LLM-Software</li>
            <li><a href="https://github.com/anthropics/skills" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic Skills</a> — Offizielle Agent Skills von Anthropic</li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/grundlagen/was-ist-agent-orchestration" className="text-blue-400 hover:text-blue-300">Was ist Agent Orchestration</a>
          {' · '}
          <a href="/patterns/agent-orchestration-patterns" className="text-blue-400 hover:text-blue-300">Agent Orchestration Patterns</a>
          {' · '}
          <a href="/grundlagen/multi-agent-systeme" className="text-blue-400 hover:text-blue-300">Multi-Agent Systeme</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
      </div>
    </div>
  )
}
