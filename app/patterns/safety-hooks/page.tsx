import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Safety Hooks Pattern | Playbook01 Wiki',
  description: 'Guardrails, Output-Validierung und Memory-Capture als automatische Sicherheitsschicht.',
}

export default function SafetyHooksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Safety Hooks Pattern</h1>
        <p className="text-gray-400 mt-2">
          Automatische Sicherheitsschichten für AI-Agenten.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2>Das Problem</h2>
        <p>
          Du kannst nicht jeden API-Call manuell prüfen. Aber du musst
          sicherstellen, dass keine schädlichen Outputs, Datenlecks oder
          unbeabsichtigte Aktionen passieren.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/patterns-safety-hooks.png" alt="Safety Hooks Pattern — Input Validation, Output Filter, Memory Capture" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Safety Hooks: Automatische Sicherheitsschichten fuer jeden AI-Agent Call</figcaption>
        </figure>

        <h2>Lösung: Safety Hooks</h2>
        <p>
          Hooks sind automatische Prüfungen, die bei jedem Call ausgeführt werden.
        </p>

        <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
{`User Input
     |
     v
[Input Validation Hook]
     |         |
     |        (Block if invalid)
     v
[Agent Execution]
     |
     v
[Output Filter Hook]
     |         |
     |        (Block/modify if unsafe)
     v
[Memory Capture Hook]
     |         |
     +----> Save to persistent storage
     |
     v
User Response`}
        </pre>

        <h2>Typen von Hooks</h2>

        <h3>1. Input Validation Hook</h3>
        <ul>
          <li>Prüft auf verbotene Wörter</li>
          <li>Validiert JSON/Syntax</li>
          <li>Checkt Rate-Limits</li>
        </ul>

        <h3>2. Output Filter Hook</h3>
        <ul>
          <li>Entfernt PII (Personally Identifiable Information)</li>
          <li>Blockiert sensitive Daten (API-Keys, Passwörter)</li>
          <li>Formatiert Output nach Schema</li>
        </ul>

        <h3>3. Memory Capture Hook</h3>
        <ul>
          <li>Speichert jeden erfolgreichen Call</li>
          <li>Loggt Fehler für Debugging</li>
          <li>Ermöglicht spüres Lernen aus Vergangenheit</li>
        </ul>

        <h2>Implementierung in Python</h2>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Safety Hooks als Decorator
from functools import wraps
import re
import logging

logger = logging.getLogger(__name__)

def input_validation_hook(forbidden_words: list):
    """Blockiert Inputs mit verbotenen Wörtern"""
    def decorator(func):
        @wraps(func)
        def wrapper(user_input, *args, **kwargs):
            for word in forbidden_words:
                if word.lower() in user_input.lower():
                    logger.warning(f"Blocked input containing: {word}")
                    raise ValueError("Input contains forbidden content")
            return func(user_input, *args, **kwargs)
        return wrapper
    return decorator

def output_filter_hook(patterns: list):
    """Filtert sensitive Daten aus Output"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            for pattern, replacement in patterns:
                result = re.sub(pattern, replacement, result)
            return result
        return wrapper
    return decorator

# Usage:
@input_validation_hook(forbidden_words=["hack", "exploit", "bypass"])
@output_filter_hook(patterns=[
    (r"sk-\w+", "[API_KEY_REDACTED]"),
    (r"\d{3}-\d{2}-\d{4}", "[SSN_REDACTED]")
])
def agent_execute(prompt: str) -> str:
    # Hier passiert die eigentliche Agent-Logik
    return llama3.2(prompt)`}</code>
        </pre>

        <h2>Implementierung in n8n</h2>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
{`// n8n Function Node - Input Hook
const forbidden = ['hack', 'exploit', 'bypass'];
const input = $input.item.json.message;

for (const word of forbidden) {
  if (input.toLowerCase().includes(word)) {
    throw new Error('Input blocked by safety hook');
  }
}

return $input.item;`}
        </pre>

        <h2>Memory Capture Hook</h2>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Memory Capture Hook - speichert jeden Call
import sqlite3
from datetime import datetime

def memory_capture_hook(func):
    @wraps(func)
    def wrapper(prompt, *args, **kwargs):
        start_time = datetime.now()
        try:
            result = func(prompt, *args, **kwargs)
            status = "success"
        except Exception as e:
            result = str(e)
            status = "error"
        
        # In SQLite speichern
        conn = sqlite3.connect('agent_memory.db')
        conn.execute("""
            INSERT INTO interactions 
            (prompt, result, status, duration_ms, timestamp)
            VALUES (?, ?, ?, ?, ?)
        """, (
            prompt, 
            result[:1000],  # Truncate für DB
            status, 
            (datetime.now() - start_time).total_seconds() * 1000,
            datetime.now().isoformat()
        ))
        conn.commit()
        
        return result
    return wrapper`}</code>
        </pre>

        <h2>Best Practices</h2>
        <ul>
          <li>Hook-Fehler nicht stillschweigend ignorieren</li>
          <li>Logging für Audit-Trail aktivieren</li>
          <li>Regelmäßig Safety Rules aktualisieren</li>
          <li>False Positives reduzieren durch Whitelists</li>
        </ul>

        <h2>Quellen</h2>
        <ul>
          <li><a href="https://docs.anthropic.com/en/docs/safety" target="_blank" className="text-brand-blue hover:underline">Anthropic Safety Guidelines</a></li>
        </ul>
      </div>
    </div>
  )
}