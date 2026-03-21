import { CaseStudyBox } from '../../../components/CaseStudyBox'

export const metadata = {
  title: 'Agent Orchestration Patterns | AI Engineering Wiki',
  description:
    'Übersicht über bewährte Agent-Orchestration Patterns: sequential, parallel, hierarchical, router und supervisor. Praktisch erklärt.',
}

export default function AgentOrchestrationPatterns() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Agent Orchestration Patterns</h1>
        <p className="text-gray-400 mt-2">Patterns · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Wie koordinierst du mehrere AI-Agenten? Es gibt bewährte Patterns dafür.
        </p>

        <CaseStudyBox
          tool="ein 5-Agenten-Team"
          stat="5 spezialisierte AI Agents"
          description="die Tasks delegieren, Code schreiben und Infrastruktur verwalten"
          productLink="https://buy.stripe.com/00w3cv1xdemBgyadfSfQI05"
          productName="AI Agent Blueprint (EUR 19)"
        />

        <figure className="my-8">
          <img src="/images/diagrams/patterns-orchestration-overview.png" alt="Agent Orchestration Patterns Übersicht — Sequential, Parallel, Hierarchical, Router, Supervisor" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Orchestration Patterns: Die 5 wichtigsten Muster für Multi-Agent Systeme</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">1. Sequential Pattern</h2>
        <p className="text-gray-300">
          Agent A → Agent B → Agent C. Jeder wartet auf den vorherigen.
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`Recherche -> Zusammenfassung -> Übersetzung

# Beispiel: Blog-Post erstellen
research_agent.run("Thema: Container-Orchestrierung")
→ summary_agent.run(ergebnis)
→ translation_agent.run(zusammenfassung, "de")`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">2. Parallel Pattern</h2>
        <p className="text-gray-300">
          Mehrere Agenten arbeiten gleichzeitig an verschiedenen Aufgaben.
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Parallel: Gleiche Recherche, verschiedene Quellen
asyncio.gather(
    research_agent.run("Thema X auf Deutsch"),
    research_agent.run("Thema X auf Englisch"),
    research_agent.run("Thema X auf Französisch")
)
→ aggregate(alle_ergebnisse)`}</code>
        </pre>

        <figure className="my-8">
          <img src="/images/diagrams/patterns-orchestration-hierarchical.png" alt="Hierarchical Orchestration Pattern — Manager delegiert an Worker" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Hierarchical Pattern: Manager-Agent koordiniert spezialisierte Worker</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">3. Hierarchical Pattern</h2>
        <p className="text-gray-300">
          Manager-Agent delegiert an Worker-Agenten. Unser Praxismodell.
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Jim (Manager) delegiert an:
# - Researcher:Infos sammeln
# - Coder: Code schreiben  
# - Reviewer: Prüfen
# - Deployer: Veröffentlichen

# Jim's Entscheidungslogik
task = parse_user_request()
if task.requires_code:
    coder_result = coder_agent.execute(task)
    review_result = reviewer_agent.execute(coder_result)
if review_result.approved:
    deployer_agent.execute(coder_result)`}</code>
        </pre>

        <figure className="my-8">
          <img src="/images/diagrams/patterns-orchestration-router.png" alt="Router Orchestration Pattern — Intent Detection und Routing" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Router Pattern: Anfragen analysieren und an den richtigen Agenten weiterleiten</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">4. Router Pattern</h2>
        <p className="text-gray-300">
          Eingabe wird analysiert und an den passenden Agenten weitergeleitet.
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Intent Detection
intent = llm.classify(user_input)
# Intent: code_review, deployment, research, qa

router.dispatch(intent, user_input)
# code_review → reviewer_agent
# deployment → deployer_agent
# research → researcher_agent
# qa → qa_agent`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">5. Supervisor Pattern</h2>
        <p className="text-gray-300">
          Ein Supervisor-Agent koordiniert mehrere Sub-Agenten mit eigenem Loop.
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Supervisor Loop
while not task.complete:
    state = supervisor.evaluate(current_state)
    if state.needs_code:
        result = coder.execute(state.subtask)
    elif state.needs_review:
        result = reviewer.execute(state.subtask)
    else:
        task.complete = True`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Wichtige Quellen</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-sm text-gray-300 space-y-3">
            <li>
              <a href="https://arxiv.org/html/2601.13671v1" className="text-blue-400 hover:underline">
                "The Orchestration of Multi-Agent Systems" (arxiv, 2026)
              </a>
              <p className="text-gray-500 text-xs mt-1">
                Umfassender Überblick über Architekturen und Protokolle.
              </p>
            </li>
            <li>
              <a href="https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html" className="text-blue-400 hover:underline">
                Deloitte: AI Agent Orchestration (2026)
              </a>
              <p className="text-gray-500 text-xs mt-1">
                Enterprise-Adoption und Business Value.
              </p>
            </li>
            <li>
              <a href="https://www.kore.ai/blog/choosing-the-right-orchestration-pattern-for-multi-agent-systems" className="text-blue-400 hover:underline">
                Choosing the right orchestration pattern (Kore.ai)
              </a>
              <p className="text-gray-500 text-xs mt-1">
                Praktischer Vergleich der Patterns.
              </p>
            </li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Fazit</h3>
          <p className="text-gray-300">
            Das richtige Pattern hängt von deiner Aufgabe ab. Wir nutzen
            hierarchisch für Team-Koordination.
          </p>
        </div>
      </div>
    </div>
  )
}