import Callout from "../../../components/Callout"

export const metadata = {
  title: 'AI Agent Team aufbauen | AI Engineering Wiki',
  description:
    'Wie du ein AI-Agent-Team aufbaust: Agent-Typen, Rollen, Tools-Integration und Guardrails. Praxisnah, lokal und DSGVO-konform gedacht.',
}

export default function AiAgentTeam() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Agent Team aufbauen</h1>
        <p className="text-gray-400 mt-2">Grundlagen · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Ein AI-Agent Team besteht aus spezialisierten Agenten (ReAct, Tool,
            Planner, Critic) die zusammenarbeiten. Jeder Agent hat Memory, Tools,
            Persona und Guardrails. Starte mit einem Agent, dann erweitere.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Ein AI-Agent ist nicht genug. Du brauchst ein Team — spezialisierte Agenten, die zusammenarbeiten.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/ai-agent-typen-uebersicht.png" alt="AI Agent Typen — ReAct, Tool, Planner, Critic" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">AI Agent Typen: Von ReAct bis Critic — welcher Agent für welchen Zweck</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Was ist ein AI Agent?</h2>

        <p className="text-gray-300 mt-2">
          Wenn die meisten Leute an KI denken, denken sie an Chatbots: Du tippst eine Frage ein,
          die KI antwortet, die Konversation endet und die KI vergisst alles. Das ist
          Single-Shot-Interaktion — nützlich, aber begrenzt.
        </p>
        <p className="text-gray-300 mt-2">
          Ein KI-Agent ist etwas anderes. Ein Agent ist ein KI-System, das kontinuierlich läuft,
          auf Aufgaben wartet, sie eigenständig ausführt und Ergebnisse meldet — ohne dass du jede
          Interaktion anstossen musst. Statt dass du zur KI gehst, kommt die KI zu dir.
        </p>
        <p className="text-gray-300 mt-2">
          Denk an den Unterschied zwischen einem Werkzeug und einem Mitarbeiter. Ein Hammer ist ein
          Werkzeug — du nimmst ihn, benutzt ihn, legst ihn weg. Ein Mitarbeiter kommt jeden Tag,
          erledigt Arbeit eigenständig und eskaliert nur wenn nötig. KI-Agenten sind näher am
          Mitarbeiter als am Werkzeug.
        </p>
        <p className="text-gray-300 mt-2">
          Ein AI-Agent ist ein Programm, das:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Selbstständig plant</li>
          <li>Werkzeuge nutzt</li>
          <li>Entscheidungen trifft</li>
          <li>Feedback verarbeitet</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Warum Multi-Agent statt Einzelagent?</h2>
        <p className="text-gray-300">
          Ein einzelner Agent, der alles macht — Coding, Content, Recherche, Testing, Monitoring —
          ist wie ein Mitarbeiter, der gleichzeitig Entwickler, Texter, QA-Tester und
          Systemadministrator ist. Im Kleinen funktioniert das, aber die Qualität sinkt mit
          wachsendem Aufgabenbereich. Multi-Agent Teams lösen das durch Spezialisierung:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Bessere Output-Qualität:</strong> Ein fokussierter Agent liefert bessere Ergebnisse als ein Generalist. Sein Kontext wird nicht durch irrelevante Anweisungen verwässert.</li>
          <li><strong>Parallele Ausführung:</strong> Mehrere Agenten können gleichzeitig an verschiedenen Aufgaben arbeiten — Code, Blogpost und Tests laufen parallel statt nacheinander.</li>
          <li><strong>Klare Verantwortlichkeit:</strong> Wenn etwas schiefgeht, weisst du welcher Agent es bearbeitet hat. Debugging ist einfacher.</li>
          <li><strong>Sicherheit durch Trennung:</strong> Der Research Agent kann Dateien lesen aber nicht ändern. Der Content Agent kann Posts entwerfen aber nicht veröffentlichen.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Arten von Agenten</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Typ</th>
                <th className="text-left py-2 text-gray-400">Beschreibung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">ReAct Agent</td>
                <td className="py-2">Reasoning + Action</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Tool Agent</td>
                <td className="py-2">Nutzt externe Tools</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Planner Agent</td>
                <td className="py-2">Zerlegt Aufgaben</td>
              </tr>
              <tr>
                <td className="py-2">Critic Agent</td>
                <td className="py-2">Prüft Outputs</td>
              </tr>
            </tbody>
          </table>
        </div>

        <figure className="my-8">
          <img src="/images/diagrams/ai-agent-team-architektur.png" alt="AI Agent Team Architektur — Manager delegiert an spezialisierte Worker" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">AI Agent Team Architektur: So arbeiten spezialisierte Agenten zusammen</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Team-Struktur</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Unser Team
Manager (Planner)
  → Developer (Code schreiben)
  → Tester (Prüfen)
  → Researcher (Recherche)
  → Deployer (Verteilen)`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Wichtige Komponenten</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Memory:</strong> Kontext zwischen Sessions</li>
          <li><strong>Tools:</strong> Was der Agent tun kann</li>
          <li><strong>Persona:</strong> Persönlichkeit, Regeln</li>
          <li><strong>Guardrails:</strong> Grenzen, was er nicht darf</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Tools-Integration</h2>

        <p className="text-gray-300">
          Unsere Agenten können:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Code schreiben und ausführen</li>
          <li>Git-Operationen</li>
          <li>Docker Commands</li>
          <li>Dateien lesen/schreiben</li>
          <li>Web recherchieren</li>
          <li>Nachrichten posten (Mattermost)</li>
        </ul>

        <Callout type="warning" title="Guardrails sind Pflicht">
          <p>
            Ohne Guardrails kann ein Agent destruktive Aktionen ausführen —
            Dateien löschen, falsche Deployments machen, Credentials leaken.
            Definiere klare Grenzen was ein Agent NICHT darf, bevor du ihm
            Tools gibst.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Safety Rules aus echten Vorfällen</h2>
        <p className="text-gray-300">
          Ein autonomes Agent-Team zu betreiben lehrt harte Lektionen. Diese Regeln stammen aus
          echten Vorfällen:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Keine destruktiven Befehle ohne menschliche Bestätigung.</strong> Ein Agent hat einmal drei Stunden Arbeit gelöscht weil eine Aufgabenbeschreibung mehrdeutig war.</li>
          <li><strong>Agenten dürfen sich nie gegenseitig imitieren.</strong> Jeder Agent muss seinen eigenen Bot Token verwenden. Cross-Posting bricht den Audit Trail.</li>
          <li><strong>Shared Memory Files nie überschreiben.</strong> Immer anhängen oder spezifische Abschnitte bearbeiten, nie die ganze Datei ersetzen.</li>
          <li><strong>Ankündigen bevor man an Shared Resources arbeitet.</strong> Wenn zwei Agenten gleichzeitig die gleiche Datei ändern, werden die Änderungen eines Agenten überschrieben.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Wie Agenten kommunizieren</h2>
        <p className="text-gray-300">
          In der Praxis kommunizieren Agenten über Team-Chat-Kanäle (z.B. Mattermost). Jeder Agent
          hat seinen eigenen Bot-Account. Aufgaben kommen über den Hauptkanal herein, der Manager
          delegiert, und der zugewiesene Agent postet das Ergebnis. Diese kanalbasierte Kommunikation
          erzeugt einen transparenten Audit Trail — du kannst genau nachvollziehen, wer was gemacht
          hat und wann.
        </p>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Start</h3>
          <p className="text-gray-300">
            Beginne mit einem Agenten. Dann erweitere — je nach Bedarf. Starte mit dem
            Manager/Orchestrator, füge dann Worker hinzu wenn das Aufgabenvolumen wächst.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://platform.claude.com/docs/en/docs/build-with-claude/agent-patterns" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Agent Patterns</a> — ReAct, Tool Use, Orchestration</li>
            <li><a href="https://react-lm.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ReAct: Synergizing Reasoning and Acting</a> — Original Paper</li>
            <li><a href="https://platform.claude.com/docs/en/docs/build-with-claude/tool-use" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Tool Use</a> — Function Calling Dokumentation</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
