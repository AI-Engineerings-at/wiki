import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '30-Day Local AI-Stack Quickstart | AI Engineering Wiki',
  description: 'Build a local, GDPR-compliant AI stack in 30 days. Day-by-day guide: Docker, Ollama, n8n, monitoring.',
}

export default function Quickstart30TagePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">30-Day Local AI-Stack Quickstart</h1>
        <p className="text-slate-400 mt-2">Basics · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          Want to build a local AI stack? This day-by-day guide shows you how to go from zero 
          to a production-ready, GDPR-compliant AI stack in 30 days.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mt-0 mb-2">What You'll Have at the End</h2>
          <ul className="text-slate-300 mb-0">
            <li>Docker Swarm Cluster (3 Nodes)</li>
            <li>Ollama with local LLMs (Llama 3, Mistral)</li>
            <li>n8n Workflow Automation</li>
            <li>Monitoring with Prometheus + Grafana</li>
            <li>100% GDPR-compliant</li>
          </ul>
        </div>

        <h2>Phase 1: Foundation (Day 1-7)</h2>
        <ul className="list-disc list-inside text-slate-300">
          <li>Day 1: Hardware Check - Minimum 8GB RAM, Ubuntu 22.04</li>
          <li>Day 2: Docker Installation</li>
          <li>Day 3: Network & Security - UFW, SSH hardening</li>
          <li>Day 4-5: Docker Compose Basics</li>
          <li>Day 6-7: Documentation</li>
        </ul>

        <h2>Phase 2: AI Core (Day 8-14)</h2>
        <ul className="list-disc list-inside text-slate-300">
          <li>Day 8-9: Ollama Installation</li>
          <li>Day 10-11: Model Selection (Llama 3 8B, Mistral)</li>
          <li>Day 12-13: Chat Interface (Open WebUI)</li>
          <li>Day 14: RAG Basics (ChromaDB)</li>
        </ul>

        <h2>Phase 3: Automation (Day 15-21)</h2>
        <ul className="list-disc list-inside text-slate-300">
          <li>Day 15-16: n8n Installation</li>
          <li>Day 17-18: AI Workflows</li>
          <li>Day 19-20: Build Your Own Workflows</li>
          <li>Day 21: Integration & Testing</li>
        </ul>

        <h2>Phase 4: Production (Day 22-30)</h2>
        <ul className="list-disc list-inside text-slate-300">
          <li>Day 22-23: Monitoring (Prometheus + Grafana)</li>
          <li>Day 24-25: Alerting</li>
          <li>Day 26-27: Security Hardening</li>
          <li>Day 28-29: Backup & Recovery</li>
          <li>Day 30: Review & Optimization</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Playbook 01 — The Local AI Stack</h3>
            <p className="text-slate-300 mb-4">
              120+ pages of tested setups. Docker Swarm, Ollama + LLM Integration, 
              Hybrid RAG, Monitoring, GDPR templates — everything copy-paste ready.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">EUR 49</div>
            <a href="https://buy.stripe.com/8x28wP7VBbapbdQgs4fQI00" className="inline-block bg-[#4262FF] text-slate-950 font-bold py-3 px-8 rounded-full">
              Buy now — EUR 49
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
