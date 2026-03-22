import Callout from "../../../components/Callout"

export const metadata = {
  title: 'Agent Team skalieren | AI Engineering Wiki',
  description:
    'Neue Agenten hinzufügen, Multi-Agent Workflows erstellen und ein Agent-Team skalieren: Schritt-für-Schritt-Anleitung mit Praxis-Patterns.',
}

export default function AgentSkalierung() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Agent Team skalieren und anpassen</h1>
        <p className="text-gray-400 mt-2">Patterns · 9 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Ein Agent-Team wächst mit deinen Anforderungen. Neue Agenten folgen einem
            Fünf-Schritte-Prozess: Rolle definieren, Bot erstellen, Konfiguration schreiben,
            Polling einrichten, beim Manager registrieren. Bei der Skalierung auf fünf oder
            mehr Agenten werden API-Kosten, Maschinenressourcen und Koordinationskomplexität
            zu wichtigen Faktoren.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Einen neuen Agenten hinzufügen</h2>
        <p className="text-gray-300">
          Das Hinzufügen eines neuen Agenten folgt einem wiederholbaren Prozess. Hier am
          Beispiel eines Kundensupport-Agenten:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">1</span>
              <h3 className="font-semibold text-white">Rolle definieren</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Was macht dieser Agent? Der Kundensupport-Agent liest eingehende Kunden-E-Mails,
              entwirft passende Antworten, kategorisiert die Anfrage und eskaliert komplexe
              Themen an einen Menschen.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">2</span>
              <h3 className="font-semibold text-white">Bot-Account erstellen</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Im Team-Chat (z.B. Team-Chat) einen neuen Bot erstellen mit beschreibendem
              Namen. Access Token generieren und sicher speichern.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">3</span>
              <h3 className="font-semibold text-white">Konfiguration schreiben</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Eine CLAUDE.md erstellen, die Rolle, Tools und Kontext definiert. Der Support-Agent
              braucht Zugriff auf Produktdokumentation, Preisinformationen, Rückgabe-Richtlinien
              und den Brand Voice Guide. Er sollte Dateien lesen und schreiben können, aber keine
              Systembefehle ausführen.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">4</span>
              <h3 className="font-semibold text-white">Polling konfigurieren</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Das Polling-Script mit dem Token und der User ID des neuen Bots konfigurieren
              und auf die passenden Channels einstellen.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">5</span>
              <h3 className="font-semibold text-white">Beim Manager registrieren</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Die CLAUDE.md des Managers aktualisieren, um den neuen Agenten ins Roster und die
              Delegationsregeln aufzunehmen. Definieren, wann der Manager Aufgaben an den neuen
              Agent routen soll.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Bestehende Rollen anpassen</h2>
        <p className="text-gray-300">
          Du kannst das Verhalten jedes Agenten ändern, indem du seine CLAUDE.md bearbeitest:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Aufgabenbereich erweitern:</strong> Dem Coding Agent die Verantwortung für Datenbank-Migrationen zusätzlich zur Feature-Entwicklung geben</li>
          <li><strong>Aufgabenbereich einengen:</strong> Einen Generalisten-Agenten in zwei Spezialisten aufteilen wenn die Arbeitslast wächst</li>
        </ul>
        <p className="text-gray-300 mt-2">
          Beim Einengen: Die Delegationsregeln des Managers aktualisieren. Wenn du den Coding
          Agent in Frontend und Backend aufteilst, muss der Manager wissen, welche Art von
          Aufgabe wohin geht.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Multi-Agent Workflows</h2>
        <p className="text-gray-300">
          Über einzelne Aufgaben hinaus kannst du koordinierte Abläufe erstellen, bei denen
          mehrere Agenten zusammenarbeiten:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Workflow</th>
                <th className="text-left py-2 text-gray-400">Ablauf</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 font-semibold">Content Pipeline</td>
                <td className="py-2">Research Agent erstellt Brief &#8594; Content Agent schreibt Post &#8594; QA Agent prüft &#8594; Manager koordiniert</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-semibold">Deployment</td>
                <td className="py-2">Coding Agent bereitet Release vor &#8594; QA testet &#8594; Coding deployed &#8594; Monitoring verifiziert &#8594; Content schreibt Release Notes</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Kunden-Onboarding</td>
                <td className="py-2">Support empfängt Kunde &#8594; Content erstellt Willkommens-Mail &#8594; Coding richtet Account ein &#8594; Manager trackt Abschluss</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-300 mt-4">
          Diese Workflows werden über die Delegations-Anweisungen des Managers implementiert.
          Du beschreibst die Schritte in der CLAUDE.md des Managers, und der Manager
          orchestriert die Sequenz automatisch.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Skalierungs-Faktoren</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Faktor</th>
                <th className="text-left py-2 text-gray-400">Details</th>
                <th className="text-left py-2 text-gray-400">Massnahme</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">API-Kosten</td>
                <td className="py-2">Jeder Agent verbraucht Credits bei der Aufgabenbearbeitung</td>
                <td className="py-2">Polling-Intervalle anpassen: beschäftigter Agent alle 30s, ruhiger alle 5min</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Maschinenressourcen</td>
                <td className="py-2">Jede Instanz nutzt Memory und CPU</td>
                <td className="py-2">2-3 Agenten pro Maschine, bei grösseren Teams auf mehrere Maschinen verteilen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Channel Noise</td>
                <td className="py-2">Mehr Agenten = geschäftigerer Hauptkanal</td>
                <td className="py-2">Sub-Channels für verschiedene Workflows erstellen</td>
              </tr>
              <tr>
                <td className="py-2">Koordination</td>
                <td className="py-2">Ab 5+ Agenten: informelle Koordination reicht nicht</td>
                <td className="py-2">Strukturierte Delegationsregeln, Prioritätssysteme, Konfliktlösung dokumentieren</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Fortgeschrittene Patterns</h2>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Zeitgesteuerte Agenten</h3>
            <p className="text-gray-300 text-sm mt-1">
              Nicht alle Agenten müssen auf Mentions reagieren. Manche arbeiten nach Zeitplan:
              Der Monitoring Agent prüft die Infrastruktur alle fünf Minuten, der Analytics Agent
              erstellt tägliche Reports, der Backup Agent verifiziert Backups jede Nacht. Für
              zeitgesteuerte Agenten die Polling-Loop durch ein Cron-getriggertes Script ersetzen.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Cross-Agent Memory</h3>
            <p className="text-gray-300 text-sm mt-1">
              Agenten können Kontext über eine gemeinsame MEMORY.md teilen. Der Coding Agent
              notiert ein Deployment, der QA Agent weiss dann was zu testen ist, der Monitoring
              Agent weiss worauf er achten muss. Shared Memory erzeugt Team-Bewusstsein ohne
              direkte Kommunikation.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Graceful Degradation</h3>
            <p className="text-gray-300 text-sm mt-1">
              Wenn ein Agent offline geht, sollte das System nicht zum Stillstand kommen. Der
              Manager sollte erkennen wenn eine delegierte Aufgabe keine Antwort bekommt und
              entweder einen Retry starten, an einen alternativen Agenten delegieren oder an
              einen Menschen eskalieren. Timeout-Logik in die CLAUDE.md des Managers einbauen.
            </p>
          </div>
        </div>

        <Callout type="tip" title="Praxis-Tipp">
          <p>
            Starte mit zwei bis drei Agenten und erweitere schrittweise. Jeder neue Agent
            sollte einen klaren, messbaren Nutzen haben. Lieber wenige Spezialisten als
            viele Generalisten.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend</h3>
          <ul className="text-gray-300 space-y-1">
            <li>{"• "}<a href="/grundlagen/agent-rollen" className="text-blue-400 hover:underline">Agent Rollen</a> — Das Rollenmodell verstehen</li>
            <li>{"• "}<a href="/grundlagen/ai-agent-team" className="text-blue-400 hover:underline">AI Agent Team aufbauen</a> — Von Null zum ersten Team</li>
            <li>{"• "}<a href="/patterns/memory-management" className="text-blue-400 hover:underline">Memory Management</a> — Wie Agenten Wissen über Sessions hinweg teilen</li>
          </ul>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://platform.claude.com/docs/en/docs/build-with-claude/agent-patterns" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Agent Patterns</a> — Multi-Agent Orchestration</li>
            <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Claude Code Overview</a> — Skills, Agents, Hooks</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
