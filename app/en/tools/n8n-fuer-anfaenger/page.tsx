import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'n8n for Beginners | AI Engineering Wiki',
  description: 'Workflow automation with n8n. Getting started, nodes, triggers, integrations.',
}

export default function N8nAnfaenger() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">n8n: Workflow Automation</h1>
        <p className="text-slate-400 mt-2">Tools · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          n8n is a powerful workflow automation tool. 
          It connects apps, services and APIs — without programming.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Why n8n?</h2>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-900 border border-green-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Advantages</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>Self-hosted - all data stays local</li>
              <li>Open Source - free</li>
              <li>400+ integrations</li>
              <li>Code nodes for custom logic</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-red-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Disadvantages</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>More setup than cloud tools</li>
              <li>You are responsible for hosting</li>
              <li>Steeper learning curve</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Installation</h2>

        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-slate-300">{`services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Basic Concepts</h2>

        <p className="text-slate-300">
          <strong>Nodes</strong> are the building blocks. Each node does one thing.
          <strong>Workflows</strong> connect nodes into chains.
          <strong>Expressions</strong> like {"{{$json.name}}"} manipulate data.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Useful Nodes</h2>

        <ul className="list-disc list-inside text-slate-300 space-y-1 mt-2">
          <li>HTTP Request - API calls</li>
          <li>IF - Conditional branching</li>
          <li>Set - Transform data</li>
          <li>Function - Custom JavaScript code</li>
          <li>Slack / Mattermost - Send messages</li>
          <li>Ollama - Local LLMs</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Practical Examples</h2>

        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Stripe Payment → E-Mail
Webhook (Stripe) → IF (success) → Email Send

# RSS → Newsletter  
RSS Read (daily) → Slack → Email Send

# Form → AI → Save
Webhook → Ollama → Notion → Slack`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Best Practices</h2>

        <ol className="list-decimal list-inside text-slate-300 space-y-2 mt-2">
          <li>Start small - first simple, then expand</li>
          <li>Add error handling</li>
          <li>Use test mode</li>
          <li>Check logs for debugging</li>
        </ol>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">n8n AI Workflow Bundle</h3>
            <p className="text-slate-300 mb-4">
              13 ready-made workflow JSONs: Stripe Payment, Ollama LLM Integration, AIOps Alert Pipeline, 
              Daily Status Report — all ready to use.
            </p>
            <ul className="text-sm text-slate-400 space-y-1 mb-4">
              <li>✓ Stripe Payment Fulfillment</li>
              <li>✓ AIOps Alert Pipeline</li>
              <li>✓ Ollama LLM Integration</li>
              <li>✓ Instant import (30s)</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">EUR 29</div>
            <div className="text-sm text-slate-500 line-through mb-3">EUR 49</div>
            <a 
              href="https://buy.stripe.com/8x2fZh7VB2DT2Hk1xafQI01" 
              className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-slate-950 font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
