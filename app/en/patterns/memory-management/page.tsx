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

        <h2 className="text-xl font-semibold text-white mt-8">The Three-Tier Memory System in Practice</h2>
        <p className="text-slate-300">
          A productive memory system solves the forgetting problem with three tiers that work
          together: core knowledge (always loaded), daily logs (session history), and optional
          vector memory (semantic search).
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">Tier 1: MEMORY.md — The Core Brain</h3>
        <p className="text-slate-300">
          The most important file in the system. Think of it as the essential briefing loaded at
          every single start. What goes in? Active projects and their status, important decisions,
          current business priorities, links to important resources. Rule: Keep it under two hundred
          lines — a bloated memory file wastes tokens and dilutes important information.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">Tier 2: Daily Logs — The Activity Record</h3>
        <p className="text-slate-300">
          While MEMORY.md stores "what matters now", daily logs store "what happened each day". A
          work journal that writes itself: completed tasks, decisions made, content created. Daily
          logs enable searchable history, feed weekly review skills, and ensure continuity — the
          next session can pick up exactly where the last one left off.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">Tier 3: Vector Memory — Semantic Search</h3>
        <p className="text-slate-300">
          Optional but powerful. Vector memory enables semantic search across accumulated knowledge
          — based on meaning, not just keywords. You can ask "What was our approach to customer
          onboarding?" and the system finds relevant information even when the exact words do not
          match.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Context Files: Permanent Foundation Knowledge</h2>
        <p className="text-slate-300">
          Memory stores what happens over time. Context files store the permanent foundations — the
          things about your business that do not change day to day:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
          <li><strong>my-business.md</strong> — Company profile, mission, target customers, revenue model</li>
          <li><strong>my-voice.md</strong> — Communication style, tone, example content</li>
          <li><strong>my-products.md</strong> — Product catalog, pricing, features, differentiation</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Technical Implementations</h2>

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

        <h2 className="text-xl font-semibold text-white mt-8">Keeping Memory Clean</h2>
        <p className="text-slate-300">
          Memory maintenance is like keeping a tidy desk. Without regular cleanup, important
          things get buried under piles of outdated information.
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-2 mt-2">
          <li>The two-hundred-line rule for MEMORY.md is the most important — move older entries to the daily logs archive</li>
          <li>Keep MEMORY.md focused on current priorities, active projects, and essential reference information</li>
          <li>Daily logs are automatically organized by date — archive older logs once a month</li>
          <li>Never store secrets, credentials, or API keys in memory files</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">The Real Benefit: Continuity</h2>
        <p className="text-slate-300">
          This is what memory management looks like in practice: Monday you tell the system about
          a new client project — details get stored in the daily log and the project is marked
          active in MEMORY.md. Tuesday you ask for a proposal — the system already knows the
          details and writes in your brand voice. Wednesday client feedback arrives, Thursday
          you can ask for the project status and get a complete summary across all days.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Sources</h2>
        <ul>
          <li><a href="https://code.claude.com/docs/en/memory" target="_blank" className="text-blue-400 hover:underline">Anthropic Memory Docs</a></li>
          <li><a href="https://github.com/anthropics/claude-code" target="_blank" className="text-blue-400 hover:underline">CLAUDE.md Specification</a></li>
        </ul>
      </div>
    </div>
  )
}
