import Callout from "../../../components/Callout"

export const metadata = {
  title: 'Was ist Agent Orchestration? | AI Engineering Wiki',
  description:
    'Agent Orchestration koordiniert mehrere spezialisierte AI-Agenten. Grundlagen, Rollen, Kommunikationsfluss und Vorteile von Multi-Agent Systemen.',
}

export default function WasIstAgentOrchestration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Was ist Agent Orchestration?</h1>
        <p className="text-gray-400 mt-2">Grundlagen · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Agent Orchestration koordiniert mehrere spezialisierte AI-Agenten.
            Ein Manager-Agent delegiert Aufgaben an Worker. Kommunikation läuft
            über einen Nachrichtenbus (z.B. Mattermost). Vorteile: Parallelisierung,
            Spezialisierung, Auditierbarkeit — alles lokal und DSGVO-konform.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Agent Orchestration koordiniert mehrere AI-Agenten, die gemeinsam komplexe Aufgaben abarbeiten.
          Du hast nicht nur einen Chat, sondern ein Team aus spezialisierten Agenten mit klaren Rollen.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/agent-orchestration-diagram.png" alt="Agent Orchestration Diagram — Manager delegiert an spezialisierte Worker-Agenten" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Agent Orchestration: Wie ein Manager-Agent Aufgaben an spezialisierte Worker verteilt</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Das Problem mit einem einzelnen LLM</h2>
        <p className="text-gray-300">
          Ein einzelnes Large Language Model (LLM) wie ChatGPT kann viele Aufgaben erledigen, 
          aber es hat klare Grenzen:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Kein dauerhaftes Gedächtnis zwischen Sitzungen</li>
          <li>Kann keine Codeänderungen selbst ausführen</li>
          <li>Hat keinen Zugriff auf deine Infrastruktur</li>
          <li>Arbeitet isoliert — kein Teamwork möglich</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Die Lösung: Multi-Agent System</h2>
        <p className="text-gray-300">
          Bei Agent Orchestration erstellst du mehrere spezialisierte Agenten, die jeweils eine 
          spezifische Rolle haben:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Beispiel: Agent-Team</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Agent</th>
                <th className="text-left py-2 text-gray-400">Rolle</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">@jim</td>
                <td className="py-2">Manager — Priorisierung, Freigaben</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">@jim01</td>
                <td className="py-2">Frontend/App/CI — Next.js, Tests</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">@lisa01</td>
                <td className="py-2">Backend/Infra — n8n, Docker, Monitoring</td>
              </tr>
              <tr>
                <td className="py-2">@john01</td>
                <td className="py-2">QA/Content — Testing, Research</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Kommunikation</h2>
        <p className="text-gray-300">
          Die Agenten kommunizieren über einen zentralen Bus. Bei uns ist das Mattermost. 
          Jeder Agent hat eigene Polling-Skripte, die auf für ihn relevante Nachrichten reagieren.
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-2">Kommunikationsfluss</h3>
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`1. Joe postet Task in #echo_log
    ↓
2. @jim (Manager) priorisiert und delegiert
    ↓
3. @jim01 → Code schreiben
   @lisa01 → Infrastruktur vorbereiten
   @john01 → Content prüfen
    ↓
4. Alle posten Ergebnisse zurück
    ↓
5. @jim aggregiert und meldet Fertig`}
          </pre>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Vorteile</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Parallelisierung:</strong> Mehrere Agenten gleichzeitig arbeiten lassen</li>
          <li><strong>Spezialisierung:</strong> Jeder Agent ist Experte für seinen Bereich</li>
          <li><strong>Skalierbarkeit:</strong> Neuen Agent hinzufügen ist einfach</li>
          <li><strong>Auditierbarkeit:</strong> Jede Aktion wird in Mattermost geloggt</li>
          <li><strong>DSGVO:</strong> Alles bleibt lokal — kein Training auf deinen Prompts</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Technische Umsetzung</h2>
        <p className="text-gray-300">
          Für unser Setup nutzen wir:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Mattermost</strong> — Team-Kommunikation als Nachrichtenbus</li>
          <li><strong>n8n</strong> — Workflow-Automatisierung</li>
          <li><strong>Docker Swarm</strong> — Container-Orchestrierung</li>
          <li><strong>Claude Code</strong> — CLI-Zugriff auf LLM-Fähigkeiten</li>
          <li><strong>Prometheus + Grafana</strong> — Monitoring</li>
        </ul>

        <Callout type="tip" title="Einstieg">
          <p>
            Du brauchst kein komplexes Framework für den Start. Ein LLM mit
            Tool-Zugriff (z.B. Claude Code CLI) plus Mattermost als Nachrichtenbus
            reicht für die ersten Agent-Workflows.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Nächste Schritte</h3>
          <p className="text-gray-300">
            Mehr über Multi-Agent Systeme? Weiter zu:{" "}
            <a href="/grundlagen/multi-agent-systeme" className="text-blue-400 hover:underline">
              Multi-Agent Systeme erklärt →
            </a>
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic Engineering: Building Effective Agents</a></li>
            <li><a href="https://docs.anthropic.com/en/docs/build-with-claude/agent-patterns" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic Docs: Agent Patterns</a></li>
            <li><a href="https://mattermost.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mattermost</a> — Self-hosted Messaging als Agent-Kommunikationsbus</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
