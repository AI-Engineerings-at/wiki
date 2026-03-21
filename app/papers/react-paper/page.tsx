import { Metadata } from "next"
import Callout from "../../../components/Callout"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "ReAct: Reasoning and Acting erklärt | AI Engineering Wiki",
  description:
    "Das ReAct-Paper von Yao et al. (2022) verständlich erklärt: Wie LLMs durch abwechselndes Denken und Handeln zu leistungsfähigen Agenten werden.",
}

export default function ReActPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          ReAct: Synergizing Reasoning and Acting in Language Models
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Yao et al., 2022 — Das Paper, das zeigt, wie LLMs durch abwechselndes
          Nachdenken und Handeln komplexe Aufgaben lösen können.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 10 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: März 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            ReAct (Reasoning + Acting) ist ein Prompting-Pattern, bei dem ein LLM
            abwechselnd denkt (Reasoning) und handelt (Acting). Statt nur Text zu
            generieren, kann das Modell Tools aufrufen, Ergebnisse interpretieren und
            seinen Ansatz anpassen. ReAct ist die Grundlage für die meisten heutigen
            AI-Agent-Frameworks.
          </p>
        </Callout>

        {/* Das Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Das Problem: Denken allein reicht nicht
          </h2>
          <p className="text-white/70 leading-relaxed">
            Chain-of-Thought (CoT) Prompting hat gezeigt, dass LLMs besser werden, wenn
            sie ihre Gedanken schrittweise aufschreiben. Aber reines Denken hat Grenzen:
            Das Modell kann keine aktuellen Informationen abrufen, keine Berechnungen
            durchführen und keine externen Systeme abfragen.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Umgekehrt gibt es Systeme, die LLMs Tools verwenden lassen (Acting), aber
            ohne explizites Nachdenken. Diese handeln oft blind — ohne Plan, ohne
            Fehleranalyse, ohne Strategie-Anpassung.
          </p>
        </section>

        {/* Die ReAct-Idee */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die ReAct-Idee: Denken UND Handeln
          </h2>
          <p className="text-white/70 leading-relaxed">
            ReAct kombiniert beides in einem abwechselnden Loop:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Thought:</strong> Das Modell denkt nach —
              analysiert die aktuelle Situation, plant den nächsten Schritt, interpretiert
              vorherige Ergebnisse.
            </li>
            <li>
              <strong className="text-white">Action:</strong> Das Modell führt eine
              konkrete Aktion aus — z.B. eine Websuche, eine Berechnung, eine
              API-Abfrage.
            </li>
            <li>
              <strong className="text-white">Observation:</strong> Das Ergebnis der
              Aktion wird dem Modell zurückgegeben. Es dient als Input für den nächsten
              Thought.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Dieser Zyklus wiederholt sich, bis die Aufgabe gelöst ist.
          </p>
        </section>

        {/* Beispiel */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            ReAct in Aktion: Ein Beispiel
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Frage: &quot;In welchem Jahr wurde die Hauptstadt des Landes gegründet,
            in dem der Transformer erfunden wurde?&quot;
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4 font-mono text-xs text-white/80 space-y-3">
            <div>
              <span className="text-blue-400">Thought 1:</span> Ich muss herausfinden, wo der
              Transformer erfunden wurde. Das Paper kam von Google Brain/Google Research.
            </div>
            <div>
              <span className="text-green-400">Action 1:</span> Search[&quot;Attention Is All You Need
              paper authors location&quot;]
            </div>
            <div>
              <span className="text-yellow-400">Observation 1:</span> Das Paper wurde von
              Forschern bei Google in Mountain View, USA, und der University of Toronto
              verfasst.
            </div>
            <div>
              <span className="text-blue-400">Thought 2:</span> Die Autoren waren bei Google in
              den USA. Die Hauptstadt der USA ist Washington, D.C. Ich muss das
              Gründungsjahr finden.
            </div>
            <div>
              <span className="text-green-400">Action 2:</span> Search[&quot;Washington D.C.
              founding year&quot;]
            </div>
            <div>
              <span className="text-yellow-400">Observation 2:</span> Washington, D.C. wurde am
              16. Juli 1790 gegründet.
            </div>
            <div>
              <span className="text-blue-400">Thought 3:</span> Ich habe die Antwort: 1790.
            </div>
            <div>
              <span className="text-purple-400">Answer:</span> 1790
            </div>
          </div>
        </section>

        {/* Warum ReAct funktioniert */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Warum ReAct besser funktioniert
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Transparenz:</strong> Die Thought-Schritte
              machen den Denkprozess nachvollziehbar. Man kann sehen, warum das Modell
              eine bestimmte Aktion gewählt hat.
            </li>
            <li>
              <strong className="text-white">Fehlerkorrektur:</strong> Wenn eine Aktion
              ein unerwartetes Ergebnis liefert, kann das Modell seinen Ansatz anpassen.
              Es bleibt nicht stur bei einer falschen Strategie.
            </li>
            <li>
              <strong className="text-white">Grounding:</strong> Durch die Aktionen
              (Suche, Berechnung) basieren Antworten auf echten Daten statt auf
              Halluzinationen.
            </li>
            <li>
              <strong className="text-white">Flexibilität:</strong> Das Pattern
              funktioniert mit beliebigen Tools — Websuche, Datenbanken, APIs,
              Code-Ausführung.
            </li>
          </ul>
        </section>

        {/* ReAct in heutigen Frameworks */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            ReAct in heutigen Agent-Frameworks
          </h2>
          <p className="text-white/70 leading-relaxed">
            ReAct ist heute die Basis praktisch aller AI-Agent-Frameworks:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li><strong className="text-white">LangChain Agents:</strong> Implementieren den ReAct-Loop als Standard-Agent-Typ</li>
            <li><strong className="text-white">Claude Tool Use:</strong> Anthropics Function Calling folgt dem Thought-Action-Observation-Pattern</li>
            <li><strong className="text-white">AutoGPT / CrewAI:</strong> Multi-Agent-Systeme, bei denen jeder Agent intern ReAct verwendet</li>
            <li><strong className="text-white">Claude Code:</strong> Verwendet ebenfalls das ReAct-Muster für Code-Analyse und -Generierung</li>
          </ul>
          <Callout type="info" title="Weiterführend">
            <p>
              Für eine Übersicht über Agent-Patterns inklusive ReAct, siehe{" "}
              <a href="/patterns/agent-orchestration-patterns" className="text-blue-400 hover:underline">
                Agent Orchestration Patterns
              </a>.
            </p>
          </Callout>
        </section>

        {/* Quellen */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Quellen</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Yao, S. et al. (2022). &quot;ReAct: Synergizing Reasoning and Acting in Language Models.&quot;{" "}
              <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:2210.03629
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
