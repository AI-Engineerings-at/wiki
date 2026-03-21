import Callout from "../../../components/Callout"

export const metadata = {
  title: 'AI OS Setup Guide | AI Engineering Wiki',
  description:
    'Claude Code als AI-Betriebssystem einrichten: Ordnerstruktur, Business-Setup-Wizard, Context-Dateien und erste Befehle in 15 Minuten.',
}

export default function AiOsSetup() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI OS Setup Guide</h1>
        <p className="text-gray-400 mt-2">Tools · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Ein AI OS verwandelt Claude Code von einem Einmal-Tool in ein persistentes
            Betriebssystem für dein Business. Du brauchst nur Claude Code und Python 3.10+.
            Die Einrichtung dauert circa fünfzehn Minuten: Template kopieren, Business-Wizard
            durchlaufen, erste Befehle testen.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Voraussetzungen</h2>
        <p className="text-gray-300">
          Du brauchst genau zwei Dinge auf deinem Rechner:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li><strong>Claude Code</strong> — Anthropics Kommandozeilen-Interface für Claude</li>
          <li><strong>Python 3.10+</strong> — die meisten modernen Systeme haben das bereits</li>
        </ul>
        <p className="text-gray-300 mt-2">
          Keine Docker Container, keine Cloud-Services, keine komplexe Infrastruktur. Das AI OS
          läuft komplett auf deinem lokalen Rechner über Claude Code.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Schritt 1: Die Ordnerstruktur verstehen</h2>
        <p className="text-gray-300">
          Das AI OS besteht aus drei Kernordnern:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">.claude/</h3>
            <p className="text-gray-300 text-sm mt-1">
              Der "System"-Ordner. Enthält Skills, Agent-Definitionen, Hooks und Einstellungen.
              Auf Mac und Linux standardmässig versteckt (Punkt-Ordner).
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">context/</h3>
            <p className="text-gray-300 text-sm mt-1">
              Deine Business-Informationen: Firmenprofil, Markenstimme, Produktkatalog.
              Wird automatisch bei jedem Start geladen.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">memory/</h3>
            <p className="text-gray-300 text-sm mt-1">
              Persistentes Wissen: MEMORY.md (Kernfakten), Tagesprotokolle,
              wichtige Entscheidungen. Claude lernt über die Zeit.
            </p>
          </div>
        </div>

        <Callout type="warning" title="Ordner nicht umbenennen">
          <p>
            Claude sucht die Ordner an bestimmten Stellen. Ein Umbenennen
            würde den Discovery-Mechanismus kaputt machen.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Schritt 2: Den Business-Setup-Wizard ausführen</h2>
        <p className="text-gray-300">
          Öffne Claude Code in deinem Projektverzeichnis und starte den Setup-Wizard.
          Der Wizard hat drei Phasen:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Phase 1: Firmenprofil</h3>
            <p className="text-gray-300 text-sm mt-1">
              Firmenname, was du machst, ideale Kunden, Produkte und Dienstleistungen,
              aktuelle Geschäftsziele. Ergebnis: <code>context/my-business.md</code>
            </p>
          </div>

          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Phase 2: Markenstimme</h3>
            <p className="text-gray-300 text-sm mt-1">
              Kommunikationsstil, formell oder locker, häufig verwendete Wörter, Beispielinhalte.
              Ergebnis: <code>context/my-voice.md</code> — damit klingt AI-Content nach dir statt
              nach generischer KI.
            </p>
          </div>

          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Phase 3: Operatives Setup</h3>
            <p className="text-gray-300 text-sm mt-1">
              Workflows, Tools, Teamgrösse, Prozesse. Zahlungsanbieter, Social-Media-Kanäle,
              Newsletter. Ergebnis: <code>context/my-products.md</code>
            </p>
          </div>
        </div>

        <p className="text-gray-300 mt-4">
          Der ganze Prozess dauert etwa zehn Minuten. Die generierten Context-Dateien werden
          automatisch bei jedem Claude-Start geladen.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Schritt 3: Prüfen ob alles funktioniert</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Test</th>
                <th className="text-left py-2 text-gray-400">Befehl</th>
                <th className="text-left py-2 text-gray-400">Erwartung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Context</td>
                <td className="py-2">"Zeig mir mein Firmenprofil"</td>
                <td className="py-2">Firmenname, Produkte, Zielkunden</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Skills</td>
                <td className="py-2">"Welche Skills hast du?"</td>
                <td className="py-2">Liste aller verfügbaren Skills</td>
              </tr>
              <tr>
                <td className="py-2">Safety</td>
                <td className="py-2">"Welche Safety Hooks sind aktiv?"</td>
                <td className="py-2">Guardrail Check, Memory Capture, Output Validation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-300 mt-4">
          Wenn eine Prüfung fehlschlägt: Stelle sicher, dass du Claude Code aus dem richtigen
          Verzeichnis ausführst — demjenigen, das den <code>.claude</code>-Ordner enthält.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Schritt 4: Erste Befehle ausprobieren</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>"Erstelle eine Aufgabenliste für diese Woche"</strong> — Aktiviert den Task-Manager-Skill</li>
          <li><strong>"Schreib ein wöchentliches Business-Review"</strong> — Aktiviert den Weekly-Review-Skill</li>
          <li><strong>"Entwirf einen LinkedIn-Post über [dein Thema]"</strong> — Aktiviert Content-Writer + Social-Media-Agent, schreibt in deiner Markenstimme</li>
        </ul>
        <p className="text-gray-300 mt-2">
          Du gibst keine detaillierten Anweisungen zu Format, Ton oder Struktur. Das AI OS erledigt
          das automatisch, weil es dein Business, deine Stimme und die Funktionsweise jeder Plattform kennt.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Häufige Probleme beim ersten Mal</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Problem</th>
                <th className="text-left py-2 text-gray-400">Lösung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Claude kennt mein Business nicht</td>
                <td className="py-2">Context-Dateien prüfen oder Setup-Wizard erneut ausführen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Skills werden nicht gefunden</td>
                <td className="py-2"><code>.claude/skills</code>-Ordner prüfen, jeder Skill braucht eine SKILL.md</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Keine Tagesprotokolle</td>
                <td className="py-2">Memory-Capture-Hook prüfen: "Welche Hooks laufen?"</td>
              </tr>
              <tr>
                <td className="py-2">Berechtigungsfehler</td>
                <td className="py-2">Auf Mac/Linux: <code>chmod +x</code> auf die Hook-Scripts</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Was du jetzt hast</h2>
        <p className="text-gray-300">
          Nach dem Setup hast du ein konfiguriertes AI-Betriebssystem. Claude kennt dein
          Business, hat Zugang zu spezialisierten Skills, Experten-Agents für verschiedene
          Aufgaben und Safety Guardrails. Ab jetzt macht Claude jedes Mal, wenn du es
          in diesem Projekt öffnest, genau dort weiter, wo du aufgehört hast — kein
          Neu-Erklären, kein Kontext-Setzen.
        </p>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend</h3>
          <ul className="text-gray-300 space-y-1">
            <li>{"• "}<a href="/patterns/memory-management" className="text-blue-400 hover:underline">Memory Management Pattern</a> — Wie das Memory-System funktioniert</li>
            <li>{"• "}<a href="/grundlagen/agent-rollen" className="text-blue-400 hover:underline">Agent Rollen</a> — Rollen und Verantwortung im Agent-Team</li>
            <li>{"• "}<a href="/patterns/agent-skalierung" className="text-blue-400 hover:underline">Agent Team skalieren</a> — Neue Agenten hinzufügen und Workflows erstellen</li>
          </ul>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Claude Code Overview</a> — Offizielle Dokumentation</li>
            <li><a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Claude Code Memory</a> — CLAUDE.md und Memory-System</li>
            <li><a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Claude Code Repository</a> — Skills, Agents und Hooks</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
