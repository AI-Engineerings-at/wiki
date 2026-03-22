import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

const vergleichDiagram = `@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam noteBorderColor #334155
skinparam noteBackgroundColor #1E293B
skinparam noteFontColor #E2E8F0

title CLI Coding Agents — Entscheidungsbaum

rectangle "Was brauchst du?" as start

rectangle "Beste Reasoning-\\nQualitaet" as quality
rectangle "DSGVO / Lokal\\n(keine Cloud)" as dsgvo
rectangle "Kostenlos\\nstarten" as budget
rectangle "OpenAI-\\nOekosystem" as openai

rectangle "Claude Code\\n(Anthropic)" as cc #1E3A5F
rectangle "Mistral Vibe\\nDevstral 24B lokal" as mv #1E3A5F
rectangle "Gemini CLI\\nFree Tier" as gc #1E3A5F
rectangle "Codex CLI\\n(OpenAI)" as cx #1E3A5F

start -down-> quality
start -down-> dsgvo
start -down-> budget
start -down-> openai

quality -down-> cc
dsgvo -down-> mv
budget -down-> gc
openai -down-> cx

note right of cc
  MCP, Subagenten,
  Hooks, Skills
end note

note right of mv
  Open Source, MIT,
  RTX 3090 genuegt
end note

note right of gc
  1M Context,
  Multimodal
end note

note right of cx
  GPT-4o, o3,
  breites Tooling
end note

@enduml`

export const metadata = {
  title: 'CLI Coding Agents im Vergleich — Claude Code, Mistral Vibe, Gemini CLI, Codex CLI | AI Engineering Wiki',
  description:
    'Umfassender Vergleich von CLI Coding Agents: Claude Code, Mistral Vibe, Gemini CLI und OpenAI Codex CLI. Features, Preise, DSGVO-Tauglichkeit und Praxis-Tests.',
}

export default function CLICodingAgentsVergleichPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          CLI Coding Agents im Vergleich
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Claude Code, Mistral Vibe, Gemini CLI und OpenAI Codex CLI — ehrlicher Vergleich
          mit Feature-Matrix, Preisen, DSGVO-Bewertung und Praxis-Erfahrung.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 15 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: März 2026</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
            v1.0 — März 2026
          </span>
        </div>
      </div>

      <Callout type="summary" title="Überblick">
        Vier CLI Coding Agents im direkten Vergleich: Claude Code liefert die beste Reasoning-Qualität mit
        Subagenten und MCP-Integration. Mistral Vibe ist der einzige Agent der vollständig lokal läuft (DSGVO-konform,
        24B-Modell auf RTX 3090). Gemini CLI bietet ein kostenloses Free Tier mit 1M Context Window.
        Codex CLI integriert sich ins OpenAI-Ökosystem. Keiner ist perfekt — die Wahl hängt vom Anwendungsfall ab.
      </Callout>

      <PlantUMLDiagram diagram={vergleichDiagram} caption="Entscheidungsbaum: Welcher CLI Coding Agent passt zu deinem Anwendungsfall?" />

      <div className="prose prose-invert max-w-none">
        <p className="text-white/70 leading-relaxed">
          CLI Coding Agents sind Terminal-basierte AI-Assistenten, die direkt in deinem Dateisystem
          arbeiten: Code lesen, schreiben, editieren, Shell-Befehle ausführen und Git-Operationen
          durchführen. Im Gegensatz zu Chat-Interfaces wie ChatGPT oder Claude.ai arbeiten sie
          direkt in deinem Projekt-Kontext und können komplexe mehrstufige Aufgaben autonom erledigen.
        </p>
        <p className="text-white/70 leading-relaxed mt-4">
          Dieser Vergleich basiert auf unserer täglichen Praxis-Erfahrung. Wir nutzen Claude Code
          als Haupt-Tool und haben die Alternativen systematisch getestet. Die Bewertung ist ehrlich:
          Wo andere besser sind, sagen wir das.
        </p>

        {/* --- Die 4 Agents im Detail --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">Die 4 Agents im Detail</h2>

          {/* Claude Code */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">1. Claude Code (Anthropic)</h3>
                <p className="text-white/50 text-sm mt-1">CLI Agent mit dem stärksten Reasoning</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Unser Haupt-Tool
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-white/40 mb-1">Modell</p>
                <p className="text-white/80">Claude Opus 4.6 / Sonnet 4.6</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Open Source</p>
                <p className="text-white/80">CLI ist Open Source, Modell ist proprietär</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Lokal möglich</p>
                <p className="text-white/80">Nein — ausschließlich über Anthropic API</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Preis</p>
                <p className="text-white/80">Anthropic API: $3–15 / 1M Tokens</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Protocol</p>
                <p className="text-white/80">MCP (Model Context Protocol)</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Context Window</p>
                <p className="text-white/80">200K–1M Tokens</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-white/40 text-sm mb-1">Tools</p>
              <div className="flex flex-wrap gap-2">
                {['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob', 'Agent', 'WebFetch', 'WebSearch', 'NotebookEdit'].map(tool => (
                  <span key={tool} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-white/60">{tool}</span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-green-400 font-medium mb-1">Stärken</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Bestes Reasoning aller getesteten Agents</li>
                  <li>Subagenten für parallele Aufgaben</li>
                  <li>MCP-Integration (Notion, Playwright, Docker, etc.)</li>
                  <li>Hooks für automatische Qualitätssicherung</li>
                  <li>Skills und Plugin-System</li>
                  <li>Git Worktrees für isolierte Branches</li>
                  <li>Plan Mode für komplexe Aufgaben</li>
                </ul>
              </div>
              <div>
                <p className="text-red-400 font-medium mb-1">Schwächen</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Nicht lokal ausführbar — alle Daten gehen an Anthropic API</li>
                  <li>Teuer bei hohem Volumen ($150–500/Monat bei intensiver Nutzung)</li>
                  <li>Abhängigkeit von Anthropic als einzigem Anbieter</li>
                  <li>Kein Free Tier für die API</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-white/40 mb-1">Besonderheiten</p>
              <p className="text-white/70">
                Subagenten können parallel arbeiten und komplexe Aufgaben aufteilen. Hooks ermöglichen
                automatische Regeln (z.B. &quot;nie löschen ohne Bestätigung&quot;). CLAUDE.md-Dateien
                definieren projektspezifisches Verhalten. MCP-Server erweitern die Fähigkeiten um
                externe Tools (Datenbanken, Browser, APIs).
              </p>
            </div>
          </div>

          {/* Mistral Vibe */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">2. Mistral Vibe (Mistral AI)</h3>
                <p className="text-white/50 text-sm mt-1">Der einzige Agent der vollständig lokal läuft</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                Open Source / Lokal
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-white/40 mb-1">Modell</p>
                <p className="text-white/80">Devstral 2 (123B) / Devstral Small 2 (24B)</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Open Source</p>
                <p className="text-white/80">Ja — MIT / Apache 2.0</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Lokal möglich</p>
                <p className="text-white/80">Ja — Devstral Small 2 (24B) läuft auf RTX 3090</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Preis</p>
                <p className="text-white/80">Le Chat Plans oder Self-hosted kostenlos</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Protocol</p>
                <p className="text-white/80">ACP (Agent Communication Protocol)</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Context Window</p>
                <p className="text-white/80">~128K Tokens</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-white/40 text-sm mb-1">Tools</p>
              <div className="flex flex-wrap gap-2">
                {['File', 'Shell', 'Grep', 'Git'].map(tool => (
                  <span key={tool} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-white/60">{tool}</span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-green-400 font-medium mb-1">Stärken</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Vollständig Open Source (MIT / Apache 2.0)</li>
                  <li>Lokal ausführbar — keine Daten verlassen das Unternehmen</li>
                  <li>24B-Modell läuft auf Consumer-GPU (RTX 3090)</li>
                  <li>DSGVO-konform ohne zusätzliche Maßnahmen</li>
                  <li>Eigenes Protocol (ACP) für Agent-Kommunikation</li>
                </ul>
              </div>
              <div>
                <p className="text-red-400 font-medium mb-1">Schwächen</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Weniger Tool-Vielfalt als Claude Code (4 vs. 10+ Tools)</li>
                  <li>Jüngeres Ökosystem — weniger Plugins und Integrationen</li>
                  <li>Reasoning-Qualität unter Claude Opus 4.6</li>
                  <li>Kein MCP-Support (eigenes ACP-Protocol)</li>
                  <li>Turn-Limit bei komplexen Aufgaben (5 Turns im Test)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-white/40 mb-1">Getestete Version</p>
              <p className="text-white/70">v2.5.0</p>
            </div>
          </div>

          {/* Gemini CLI */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">3. Gemini CLI (Google)</h3>
                <p className="text-white/50 text-sm mt-1">Größtes Context Window und kostenloses Free Tier</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                Free Tier
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-white/40 mb-1">Modell</p>
                <p className="text-white/80">Gemini 2.5 Pro / Flash</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Open Source</p>
                <p className="text-white/80">CLI ist Open Source, Modell ist proprietär</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Lokal möglich</p>
                <p className="text-white/80">Nein — ausschließlich über Google AI API</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Preis</p>
                <p className="text-white/80">Google AI API (Free Tier vorhanden)</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Protocol</p>
                <p className="text-white/80">Standard API</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Context Window</p>
                <p className="text-white/80">1M+ Tokens</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-green-400 font-medium mb-1">Stärken</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>1M+ Context Window — größtes aller getesteten Agents</li>
                  <li>Kostenloses Free Tier für den Einstieg</li>
                  <li>Multimodale Fähigkeiten (Bilder, Code, Text)</li>
                  <li>98k+ GitHub Stars — große Community</li>
                </ul>
              </div>
              <div>
                <p className="text-red-400 font-medium mb-1">Schwächen</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Weniger Code-fokussiert als Claude Code</li>
                  <li>Abhängigkeit von Google-Infrastruktur</li>
                  <li>Nicht lokal ausführbar</li>
                  <li>Kein MCP-Support</li>
                  <li>Kein Subagenten-System</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-white/40 mb-1">GitHub</p>
              <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                github.com/google-gemini/gemini-cli
              </a>
              <span className="text-white/40 ml-2">(98k+ Stars)</span>
            </div>
          </div>

          {/* Codex CLI */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">4. OpenAI Codex CLI</h3>
                <p className="text-white/50 text-sm mt-1">OpenAI-Ökosystem mit GPT-4o und o3</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-white/40 mb-1">Modell</p>
                <p className="text-white/80">GPT-4o / o3</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Open Source</p>
                <p className="text-white/80">CLI ist Open Source, Modell ist proprietär</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Lokal möglich</p>
                <p className="text-white/80">Nein — ausschließlich über OpenAI API</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Preis</p>
                <p className="text-white/80">OpenAI API: $5–15 / 1M Tokens</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Protocol</p>
                <p className="text-white/80">Standard API</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Context Window</p>
                <p className="text-white/80">128K Tokens</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-green-400 font-medium mb-1">Stärken</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Breites OpenAI-Ökosystem und Community</li>
                  <li>GPT-4o-Qualität für Code-Aufgaben</li>
                  <li>Gute Integration mit bestehenden OpenAI-Workflows</li>
                </ul>
              </div>
              <div>
                <p className="text-red-400 font-medium mb-1">Schwächen</p>
                <ul className="text-white/70 space-y-1 list-disc list-inside">
                  <li>Nicht lokal ausführbar</li>
                  <li>Abhängigkeit von OpenAI</li>
                  <li>Teuer bei hohem Volumen</li>
                  <li>Kein MCP-Support</li>
                  <li>Kein Subagenten-System</li>
                  <li>Kleinstes Context Window (128K)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- Feature-Matrix --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Feature-Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Claude Code</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Mistral Vibe</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Gemini CLI</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Codex CLI</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Lokal möglich</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-green-400">Ja (24B)</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Open Source Modell</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-green-400">Ja (MIT/Apache)</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Subagenten</td>
                  <td className="py-3 px-4 text-green-400">Ja</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">MCP Support</td>
                  <td className="py-3 px-4 text-green-400">Ja</td>
                  <td className="py-3 px-4 text-yellow-400">Nein (ACP)</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Plugin System</td>
                  <td className="py-3 px-4 text-green-400">Ja</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Context Window</td>
                  <td className="py-3 px-4">200K–1M</td>
                  <td className="py-3 px-4">~128K</td>
                  <td className="py-3 px-4 text-green-400">1M+</td>
                  <td className="py-3 px-4">128K</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Hooks / Rules</td>
                  <td className="py-3 px-4 text-green-400">Ja</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Git Worktrees</td>
                  <td className="py-3 px-4 text-green-400">Ja</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">DSGVO-lokal</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-green-400">Ja</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Free Tier</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4 text-yellow-400">Lokal = kostenlos</td>
                  <td className="py-3 px-4 text-green-400">Ja</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Preis-Vergleich --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Kosten-Vergleich (geschätzt bei 1.000 Anfragen/Tag)</h2>
          <Callout type="warning" title="Schätzwerte">
            Die Kosten sind Schätzungen basierend auf durchschnittlicher Token-Nutzung pro Anfrage.
            Tatsächliche Kosten variieren stark je nach Prompt-Länge, Kontext-Größe und Aufgaben-Komplexität.
          </Callout>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Agent</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Kosten / Monat</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Lokal möglich</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Anmerkung</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Claude Code</td>
                  <td className="py-3 px-4">~$150–500</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4">Opus teurer, Sonnet günstiger</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Mistral Vibe (API)</td>
                  <td className="py-3 px-4">~$50–150</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">Via Le Chat oder Mistral API</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Mistral Vibe (Lokal)</td>
                  <td className="py-3 px-4 text-green-400">~49 EUR (Strom)</td>
                  <td className="py-3 px-4 text-green-400">Ja</td>
                  <td className="py-3 px-4">Einmalige Hardware-Kosten nicht eingerechnet</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Gemini CLI</td>
                  <td className="py-3 px-4 text-green-400">~$0–100</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4">Free Tier für geringe Nutzung</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Codex CLI</td>
                  <td className="py-3 px-4">~$150–500</td>
                  <td className="py-3 px-4 text-red-400">Nein</td>
                  <td className="py-3 px-4">GPT-4o und o3 ähnlich teuer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Praxis-Test --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Praxis-Test: Mistral Vibe v2.5.0</h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
            <p className="text-white/70 mb-4">
              Wir haben Mistral Vibe v2.5.0 auf dieser Wiki getestet, um einen direkten Vergleich
              mit unserem Haupt-Tool Claude Code zu haben.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold text-lg mt-0.5">+</span>
                <div>
                  <p className="text-white font-medium">Einfache Aufgabe (Dateien zählen)</p>
                  <p className="text-white/60 text-sm">Korrekt und schnell erledigt. Shell-Tool funktioniert zuverlässig.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold text-lg mt-0.5">−</span>
                <div>
                  <p className="text-white font-medium">Komplexe Aufgabe (Code-Analyse)</p>
                  <p className="text-white/60 text-sm">
                    Turn-Limit bei 5 Turns erreicht. Der Agent konnte die Aufgabe nicht vollständig
                    abschließen. Claude Code hat die gleiche Aufgabe in einer Session erledigt.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
              <p className="text-white/50 text-sm">
                <strong className="text-white/70">Fazit:</strong> Mistral Vibe funktioniert zuverlässig für einfache bis
                mittlere Tasks. Für komplexe, mehrstufige Workflows mit vielen Datei-Interaktionen
                ist Claude Code deutlich überlegen — sowohl in der Reasoning-Qualität als auch in
                der Tool-Vielfalt und dem fehlenden Turn-Limit.
              </p>
            </div>
          </div>
        </section>

        {/* --- Für wen was? --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Für wen eignet sich was?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2">Enterprise mit Budget</h3>
              <p className="text-white/60 text-sm mb-2">Claude Code</p>
              <p className="text-white/50 text-sm">
                Beste Reasoning-Qualität, Subagenten für parallele Aufgaben,
                MCP-Integration für Tool-Anbindung. Wenn Qualität wichtiger ist als Kosten.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2">DSGVO-kritisch / Self-Hosted</h3>
              <p className="text-white/60 text-sm mb-2">Mistral Vibe (lokal)</p>
              <p className="text-white/50 text-sm">
                Einzige Option wenn keine Daten das Unternehmen verlassen dürfen.
                Devstral Small 2 (24B) auf RTX 3090 genügt. Open Source, MIT-Lizenz.
              </p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2">Budget-bewusst</h3>
              <p className="text-white/60 text-sm mb-2">Gemini CLI</p>
              <p className="text-white/50 text-sm">
                Kostenloses Free Tier zum Ausprobieren. 1M Context Window für große Codebases.
                Gut zum Einstieg ohne finanzielle Verpflichtung.
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
              <h3 className="text-white font-bold mb-2">OpenAI-Ökosystem</h3>
              <p className="text-white/60 text-sm mb-2">Codex CLI</p>
              <p className="text-white/50 text-sm">
                Nahtlose Integration wenn bereits OpenAI-APIs und GPT-4o im Einsatz.
                Vertrautes Ökosystem, bewährte Modell-Qualität.
              </p>
            </div>
          </div>
        </section>

        {/* --- Unsere Empfehlung --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Unsere Empfehlung</h2>
          <Callout type="tip" title="Praxis-Empfehlung">
            Für AI Engineering nutzen wir Claude Code als Haupttool — wegen der Subagenten-Architektur,
            MCP-Integration und Reasoning-Qualität. Für DSGVO-kritische Umgebungen, in denen KEINE Daten
            das Unternehmen verlassen dürfen, ist Mistral Vibe mit Devstral Small 2 (24B, lokal auf RTX 3090)
            die beste Alternative. Die Kombination aus beiden deckt 95% aller Anwendungsfälle ab.
          </Callout>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mt-4">
            <h3 className="text-lg font-bold text-white mb-3">Ehrliche Einordnung</h3>
            <ul className="text-white/70 space-y-2 text-sm">
              <li>
                <strong className="text-white">Wir sind nicht neutral:</strong> Dieser Artikel wird mit Claude Code geschrieben.
                Wir nutzen es täglich und kennen es am besten. Die Stärken sind aus erster Hand, die Schwächen ebenso.
              </li>
              <li>
                <strong className="text-white">Kein Agent ist perfekt:</strong> Claude Code ist teuer und nicht lokal.
                Mistral Vibe ist weniger leistungsfähig bei komplexen Aufgaben. Gemini CLI ist weniger Code-fokussiert.
                Codex CLI hat das kleinste Context Window.
              </li>
              <li>
                <strong className="text-white">Der Markt bewegt sich schnell:</strong> Dieser Vergleich spiegelt den Stand
                März 2026 wider. Alle vier Anbieter veröffentlichen regelmäßig Updates.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Protocol-Vergleich --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Protocol-Vergleich: MCP vs. ACP</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Aspekt</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">MCP (Model Context Protocol)</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">ACP (Agent Communication Protocol)</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Entwickler</td>
                  <td className="py-3 px-4">Anthropic</td>
                  <td className="py-3 px-4">Mistral AI</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Fokus</td>
                  <td className="py-3 px-4">Tool-Integration (Dateisystem, APIs, DBs)</td>
                  <td className="py-3 px-4">Agent-zu-Agent-Kommunikation</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Ökosystem</td>
                  <td className="py-3 px-4">Groß (Notion, Playwright, Docker, etc.)</td>
                  <td className="py-3 px-4">Wachsend, noch jung</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Kompatibilität</td>
                  <td className="py-3 px-4">Breit (Claude, Cursor, Windsurf, etc.)</td>
                  <td className="py-3 px-4">Primär Mistral Vibe</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Open Standard</td>
                  <td className="py-3 px-4">Ja (offene Spezifikation)</td>
                  <td className="py-3 px-4">Ja (offene Spezifikation)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Quellen --- */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Claude Code Dokumentation</a> — Offizielle Anthropic-Dokumentation</li>
            <li><a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Claude Code GitHub</a> — Open Source CLI Repository</li>
            <li><a href="https://docs.mistral.ai/agents/vibe/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mistral Vibe Dokumentation</a> — Offizielle Mistral AI-Dokumentation</li>
            <li><a href="https://huggingface.co/mistralai/Devstral-Small-2" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Devstral Small 2 auf Hugging Face</a> — 24B-Modell für lokale Ausführung</li>
            <li><a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Gemini CLI GitHub</a> — Google Gemini CLI (98k+ Stars)</li>
            <li><a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI Codex CLI GitHub</a> — OpenAI Codex CLI Repository</li>
            <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Model Context Protocol (MCP)</a> — Offizielle MCP-Spezifikation</li>
            <li><a href="https://docs.mistral.ai/agents/acp/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Agent Communication Protocol (ACP)</a> — Offizielle ACP-Spezifikation</li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-slate-500">
            Alle Wiki-Artikel sind kostenlos. Wenn du fertige Templates und Bundles suchst:
          </p>
          <a href="https://www.ai-engineering.at" className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block">
            Produkte &amp; Bundles ansehen →
          </a>
        </div>
      </div>
    </div>
  )
}
