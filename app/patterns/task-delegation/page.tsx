import Callout from "../../../components/Callout"

export const metadata = {
  title: 'Task Delegation Pattern | AI Engineering Wiki',
  description: 'Orchestrator verteilt Tasks an spezialisierte Agenten — Routing, Prioritäten, Deadlines.',
}

export default function TaskDelegationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Task Delegation Pattern</h1>
        <p className="text-gray-400 mt-2">
          Wie ein Orchestrator Tasks an spezialisierte Agenten verteilt.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Task Delegation trennt Orchestrierung von Ausführung. Ein Orchestrator
            klassifiziert Anfragen (Intent), routet sie an spezialisierte Agenten
            (Coder, Researcher, Reviewer) und aggregiert die Ergebnisse. Kernkonzepte:
            Intent Classification, Routing Matrix, Priority Queue mit Deadlines,
            Result Aggregation. Ohne Delegation wird jeder Agent zum Flaschenhals.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Das Problem</h2>
        <p>
          Ein einzelner Agent kann nicht alles besser als spezialisierte Tools.
          Du brauchst ein System, das den richtigen Agenten für die richtige
          Aufgabe auswählt.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/patterns-task-delegation.png" alt="Task Delegation Pattern — Orchestrator verteilt an spezialisierte Agenten" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Task Delegation: Wie der Orchestrator Aufgaben an spezialisierte Agenten verteilt</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Architektur</h2>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
          <code>{`User Request
     |
     v
[Orchestrator Agent]
     |
     +---> [Research Agent] ----> Web Search, Docs
     |
     +---> [Coder Agent] ----> Code Generation
     |
     +---> [Review Agent] ----> PR Review, Tests
     |
     v
  Final Response`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Implementierung</h2>

        <h3 className="text-lg font-semibold text-white mt-6">1. Intent Classification</h3>
        <p>
          Der Orchestrator klassifiziert die Benutzeranfrage und leitet sie
          an den passenden Agenten weiter.
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Intent Classification mit Ollama
from langchain.llms import Ollama

llm = Ollama(model="llama3.2")

def classify_intent(user_input: str) -> str:
    prompt = f"""
    Classify this request into one of: code, research, review, deploy, qa
    
    Request: {user_input}
    
    Return only the category, nothing else.
    """
    return llm(prompt).strip().lower()`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6">2. Routing Matrix</h3>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
          <code>{`const routes = {
  'code-generation': coderAgent,
  'research': researchAgent,
  'review': reviewAgent,
  'deployment': deployAgent,
  'question': qaAgent,
}

# Mit Ollama:
function route(task) {
  const intent = ollama.chat('llama3.2', task.prompt)
  return routes[intent] || qaAgent
}`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6">3. Priority Queue</h3>
        <p>
          Für mehrere gleichzeitige Tasks: Prioritäten setzen (1 = highest).
          Deadline-Tracking verhindert, dass Tasks ewig warten.
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Priority Queue mit Python
import heapq
from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class Task:
    priority: int  # 1 = highest
    deadline: datetime
    agent: str
    payload: dict
    
    def __lt__(self, other):
        return (self.priority, self.deadline) < (other.priority, other.deadline)

task_queue = []

def enqueue(task):
    heapq.heappush(task_queue, task)
    
def dequeue():
    task = heapq.heappop(task_queue)
    if datetime.now() > task.deadline:
        raise TimeoutError(f"Task {task.agent} timed out")
    return task

# Beispiel: Tasks einreihen
enqueue(Task(1, datetime.now() + timedelta(minutes=5), "coder", {"code": "..."}))
enqueue(Task(2, datetime.now() + timedelta(minutes=10), "reviewer", {"pr": "..."}))`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6">4. Result Aggregation</h3>
        <p>
          Der Orchestrator sammelt die Ergebnisse aller Sub-Agenten und
          synthetisiert eine finale Antwort.
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Result Aggregation
async def aggregate_results(sub_tasks: list) -> str:
    results = await asyncio.gather(
        *[execute_agent(task) for task in sub_tasks]
    )
    
    # Finale Synthese
    synthesis_prompt = f"""
    Du hast folgende Teilergebnisse:
    {chr(10).join(results)}
    
    Erstelle eine kohärente finale Antwort.
    """
    return llama3.2(synthesis_prompt)`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Wichtige Aspekte</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Timeout:</strong> Jeder Sub-Agent braucht ein Max-Timeout</li>
          <li><strong>Retry:</strong> Bei Fehlern max. 2x wiederholen</li>
          <li><strong>Fallback:</strong> Was tun, wenn alle Agenten fehlschlagen?</li>
          <li><strong>Cost Control:</strong> Budget-Limits pro Task</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Fallback-Strategie</h2>
        <p className="text-gray-300">
          Wenn ein Agent fehlschlägt, braucht der Orchestrator einen Plan B.
          Hier ein bewährtes Pattern mit Retry und Graceful Degradation:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Fallback mit Retry und Degradation
import asyncio
from typing import Optional

async def execute_with_fallback(
    task: Task,
    max_retries: int = 2,
    timeout: int = 30
) -> Optional[str]:
    """Execute task with retry and fallback logic"""

    for attempt in range(max_retries + 1):
        try:
            result = await asyncio.wait_for(
                execute_agent(task),
                timeout=timeout
            )
            return result

        except asyncio.TimeoutError:
            print(f"Attempt {attempt + 1}: Timeout after {timeout}s")

        except Exception as e:
            print(f"Attempt {attempt + 1}: Error: {e}")

    # Alle Retries fehlgeschlagen — Fallback
    return await fallback_handler(task)

async def fallback_handler(task: Task) -> str:
    """Graceful degradation wenn Agent nicht verfügbar"""
    return f"Task '{task.agent}' konnte nicht ausgeführt werden. " \\
           f"Bitte manuell prüfen: {task.payload}"`}</code>
        </pre>

        <Callout type="warning" title="Endlos-Schleifen vermeiden">
          <p>
            Ohne Timeout und Retry-Limit kann ein fehlgeschlagener Agent den
            gesamten Orchestrator blockieren. Setze immer ein Maximum für
            Retries (2-3) und ein Timeout pro Agent (30-60 Sekunden).
          </p>
        </Callout>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://arxiv.org/abs/2308.11432" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AutoGen: Multi-Agent Conversations (ArXiv)</a> — Microsoft Research zu Multi-Agent Orchestrierung</li>
            <li><a href="https://docs.python.org/3/library/asyncio.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Python asyncio Dokumentation</a> — Grundlage für async Task-Verarbeitung</li>
            <li><a href="https://docs.python.org/3/library/heapq.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Python heapq</a> — Priority Queue Implementierung</li>
            <li><a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Building Effective Agents</a> — Best Practices für Agent-Architekturen</li>
          </ul>
        </section>
      </div>
    </div>
  )
}