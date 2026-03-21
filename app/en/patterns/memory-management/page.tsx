import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memory Management Pattern | AI Engineering Wiki',
  description: 'How AI agents store and retrieve persistent knowledge. CLAUDE.md, Topic Files, Knowledge Graphs.',
}

export default function MemoryManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Memory Management Pattern</h1>
        <p className="text-slate-400 mt-2">Patterns · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">The Problem</h2>
        <p className="text-slate-300">
          Every API call is an empty session. Your agent doesnt know what happened yesterday. 
          Memory Management solves this through structured persistence.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Solutions</h2>

        <h3 className="text-lg font-semibold text-white mt-6">1. CLAUDE.md / PROJECT.md</h3>
        <p className="text-slate-300">
          The simplest method: A Markdown file in the project root containing all important info. 
          Loaded automatically on every run.
        </p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Project Context
- Stack: Ollama + n8n + PostgreSQL
- Target audience: SMEs in Austria
- Current Tasks: ...

# Decisions
- Docker Compose for Deployment
- PostgreSQL for data`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6">2. Topic Files</h3>
        <p className="text-slate-300">
          For more complex projects: Multiple Markdown files in a /docs directory. 
          Each file covers one topic (Architecture, API, Deployment, etc.).
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">3. Knowledge Graphs</h3>
        <p className="text-slate-300">
          For knowledge bases with millions of tokens: Vector databases like 
          pgvector or ChromaDB. Store documents, code, logs as embeddings 
          and find them with natural language.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">When to Use What?</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2">Method</th>
              <th className="py-2">Tokens</th>
              <th className="py-2">Latency</th>
              <th className="py-2">Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800">
              <td className="py-2">CLAUDE.md</td>
              <td className="py-2">~8K</td>
              <td className="py-2">0ms</td>
              <td className="py-2">Minimal</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Topic Files</td>
              <td className="py-2">~50K</td>
              <td className="py-2">~50ms</td>
              <td className="py-2">Low</td>
            </tr>
            <tr>
              <td className="py-2">Knowledge Graph</td>
              <td className="py-2">Unlimited</td>
              <td className="py-2">~200ms</td>
              <td className="py-2">High</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-semibold text-white mt-8">Practice Tip</h2>
        <p className="text-slate-300">
          Start with CLAUDE.md. That works for 90% of projects. Only when you 
          really build a knowledge base larger than 50K tokens do you need vector databases.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Sources</h2>
        <ul>
          <li><a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" className="text-blue-400 hover:underline">Anthropic Memory Docs</a></li>
          <li><a href="https://github.com/anthropics/claude-code" target="_blank" className="text-blue-400 hover:underline">CLAUDE.md Specification</a></li>
        </ul>
      </div>
    </div>
  )
}
