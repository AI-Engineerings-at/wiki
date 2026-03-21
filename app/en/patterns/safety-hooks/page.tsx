import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Safety Hooks Pattern | AI Engineering Wiki',
  description: 'Guardrails, output validation, memory capture as automatic security layer.',
}

export default function SafetyHooksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Safety Hooks Pattern</h1>
        <p className="text-slate-400 mt-2">Patterns · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2>The Problem</h2>
        <p className="text-slate-300">
          You cant manually check every API call. But you need to ensure no harmful outputs, 
          data leaks, or unintended actions happen.
        </p>

        <h2>Solution: Safety Hooks</h2>
        <p className="text-slate-300">
          Hooks are automatic checks that run on every call.
        </p>

        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`User Input
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
User Response`}</code>
        </pre>

        <h2>Types of Hooks</h2>

        <h3>1. Input Validation Hook</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Check for forbidden words</li>
          <li>Validate JSON/syntax</li>
          <li>Check rate limits</li>
        </ul>

        <h3>2. Output Filter Hook</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Remove PII (Personally Identifiable Information)</li>
          <li>Block sensitive data (API keys, passwords)</li>
          <li>Format output by schema</li>
        </ul>

        <h3>3. Memory Capture Hook</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Save every successful call</li>
          <li>Log errors for debugging</li>
          <li>Enable future learning from past</li>
        </ul>

        <h2>Implementation in n8n</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`// n8n Function Node - Input Hook
const forbidden = ['hack', 'exploit', 'bypass'];
const input = $input.item.json.message;

for (const word of forbidden) {
  if (input.toLowerCase().includes(word)) {
    throw new Error('Input blocked by safety hook');
  }
}

return $input.item;`}</code>
        </pre>

        <h2>Best Practices</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Don't silently ignore hook errors</li>
          <li>Enable logging for audit trail</li>
          <li>Regularly update safety rules</li>
          <li>Reduce false positives with whitelists</li>
        </ul>

        <h2>Sources</h2>
        <ul>
          <li><a href="https://docs.anthropic.com/en/docs/safety" target="_blank" className="text-blue-400 hover:underline">Anthropic Safety Guidelines</a></li>
        </ul>
      </div>
    </div>
  )
}
