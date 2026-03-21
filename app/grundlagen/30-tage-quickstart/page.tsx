import { Metadata } from 'next'
import Callout from "../../../components/Callout"

export const metadata: Metadata = {
  title: '30-Tage Local AI-Stack Quickstart | AI Engineering Wiki',
  description: 'In 30 Tagen zum eigenen AI-Stack. Tag-für-Tag Anleitung: Docker, Ollama, n8n, Monitoring.',
}

export default function Quickstart30TagePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">30-Tage Local AI-Stack Quickstart</h1>
        <p className="text-slate-400 mt-2">Grundlagen · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            In 30 Tagen von Null zum produktiven, DSGVO-konformen AI-Stack.
            Phase 1: Docker + Netzwerk (Tag 1-7). Phase 2: Ollama + LLMs (Tag 8-14).
            Phase 3: n8n Automatisierung (Tag 15-21). Phase 4: Monitoring +
            Security + Backup (Tag 22-30).
          </p>
        </Callout>

        <p className="text-lg text-slate-300">
          Du willst einen lokalen AI-Stack aufbauen? Diese Tag-für-Tag Anleitung zeigt dir,
          wie du in 30 Tagen von Null zu einem produktiven, DSGVO-konformen Stack kommst.
        </p>

        <figure className="my-8">
          <img src="/images/infographics/30-tage-quickstart-timeline.png" alt="30 Tage Quickstart Timeline — Von Null zum produktiven AI-Stack" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">30-Tage Timeline: Schritt für Schritt zum eigenen lokalen AI-Stack</figcaption>
        </figure>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mt-0 mb-2">Was du am Ende hast</h2>
          <ul className="text-slate-300 mb-0">
            <li>Docker Swarm Cluster (3 Nodes)</li>
            <li>Ollama mit lokalen LLMs (Llama 3, Mistral)</li>
            <li>n8n Workflow-Automatisierung</li>
            <li>Monitoring mit Prometheus + Grafana</li>
            <li>100% DSGVO-konform</li>
          </ul>
        </div>

        <h2>Phase 1: Foundation (Tag 1-7)</h2>

        <figure className="my-8">
          <img src="/images/infographics/30-tage-quickstart-hardware.png" alt="Hardware-Empfehlungen für lokale AI — GPU, RAM, CPU" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Hardware-Empfehlungen: Was du für deinen lokalen AI-Stack brauchst</figcaption>
        </figure>

        <h3>Tag 1: Hardware-Check</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>Minimum: 8GB RAM, 4 CPU-Kerne</li>
          <li>Empfohlen: 32GB RAM, 8+ CPU, GPU (RTX 3060+)</li>
          <li>Ubuntu 22.04 LTS installieren</li>
        </ul>

        <h3>Tag 2: Docker Installation</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
docker --version`}</code>
        </pre>

        <h3>Tag 3: Netzwerk und Security</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>UFW Firewall aktivieren</li>
          <li>SSH-Hardening (Key-Auth, Fail2Ban)</li>
          <li>Backup-Lösung planen</li>
        </ul>

        <figure className="my-8">
          <img src="/images/screenshots/docker-ps.png" alt="docker ps — Laufende Container anzeigen" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">docker ps: Deine ersten Container laufen</figcaption>
        </figure>

        <h3>Tag 4-5: Docker Compose</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>docker-compose.yml erstellen</li>
          <li>Erste Services starten (Traefik)</li>
          <li>Container-Management lernen</li>
        </ul>

        <h3>Tag 6-7: Dokumentation</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>README.md erstellen</li>
          <li>Architektur-Diagramm</li>
          <li>Zugangsdaten in Passwort-Manager</li>
        </ul>

        <h2>Phase 2: AI Core (Tag 8-14)</h2>

        <h3>Tag 8-9: Ollama</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3:8b
ollama pull mistral`}</code>
        </pre>

        <h3>Tag 10-11: Modell-Auswahl</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Use-Case</th>
              <th className="text-left py-2 text-slate-400">Modell</th>
              <th className="text-left py-2 text-slate-400">RAM</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">Chat/Q&A</td>
              <td className="py-2">Llama 3 8B</td>
              <td className="py-2">~16GB</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Code</td>
              <td className="py-2">CodeLlama</td>
              <td className="py-2">~16GB</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Embedding</td>
              <td className="py-2">Nomic-embed-text</td>
              <td className="py-2">~4GB</td>
            </tr>
            <tr>
              <td className="py-2">Maximum Quality</td>
              <td className="py-2">Llama 3 70B</td>
              <td className="py-2">~140GB</td>
            </tr>
          </tbody>
        </table>

        <h3>Tag 12-13: Chat Interface</h3>
        <p className="text-slate-300">Open WebUI oder Alternative installieren</p>

        <h3>Tag 14: RAG (optional)</h3>
        <p className="text-slate-300">ChromaDB oder Qdrant für Dokumenten-Suche</p>

        <h2>Phase 3: Automation (Tag 15-21)</h2>

        <h3>Tag 15-16: n8n Installation</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"`}</code>
        </pre>

        <h3>Tag 17-18: AI-Workflows</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>Ollama-Node in n8n konfigurieren</li>
          <li>Ersten AI-Workflow erstellen</li>
          <li>Test mit Produktionsdaten</li>
        </ul>

        <h3>Tag 19-20: Eigene Workflows</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>E-Mail-Antworten mit AI</li>
          <li>Dokumenten-Zusammenfassung</li>
          <li>Support-Ticket-Kategorisierung</li>
        </ul>

        <h2>Phase 4: Production (Tag 22-30)</h2>

        <h3>Tag 22-23: Monitoring</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>Prometheus + Grafana installieren</li>
          <li>Grundlegende Dashboards</li>
        </ul>

        <h3>Tag 24-25: Alerting</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>Prometheus Alert Rules</li>
          <li>Benachrichtigungen (E-Mail, Slack)</li>
        </ul>

        <h3>Tag 26-27: Security Hardening</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>API-Keys in Umgebungsvariablen</li>
          <li>Rate Limiting</li>
          <li>Regelmäßige Updates</li>
        </ul>

        <h3>Tag 28-29: Backup und Recovery</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>Backup-Skript erstellen</li>
          <li>Automatisierte Backups (cron)</li>
          <li>Recovery-Prozedur dokumentieren</li>
        </ul>

        <h3>Tag 30: Review</h3>
        <ul className="list-disc list-inside text-slate-300">
          <li>Vollständige Dokumentation</li>
          <li>Monitoring optimieren</li>
          <li>Runbook erstellen</li>
        </ul>

        <Callout type="tip" title="Hardware-Budget">
          <p>
            Ein gebrauchter Mini-Server mit 32 GB RAM und einer gebrauchten
            RTX 3090 (ab ca. 750 Euro) reicht für die meisten lokalen AI-Workloads.
            Für den Einstieg tut es auch ein Desktop-PC mit 16 GB RAM.
          </p>
        </Callout>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama</a> — Lokale LLMs</li>
            <li><a href="https://docs.docker.com/get-started/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Docker: Get Started</a> — Offizielle Docker-Anleitung</li>
            <li><a href="https://n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n.io</a> — Workflow-Automatisierung</li>
            <li><a href="https://grafana.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Grafana</a> — Monitoring und Dashboards</li>
          </ul>
        </section>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Der Lokale AI-Stack — Playbook</h3>
            <p className="text-slate-300 mb-4">
              120+ Seiten praxiserprobte Anleitungen. Docker Swarm Setup, Ollama + LLM Integration, 
              Hybrid RAG, Monitoring, DSGVO-Templates — alles copy-paste ready.
            </p>
            <ul className="text-sm text-slate-400 space-y-1 mb-4">
              <li>✓ 8 Kapitel, 120+ Seiten</li>
              <li>✓ Docker Swarm Multi-Node</li>
              <li>✓ DSGVO-Dokumentations-Templates</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">EUR 49</div>
            <div className="text-sm text-slate-500 line-through mb-3">EUR 79</div>
            <a 
              href="https://buy.stripe.com/8x28wP7VBbapbdQgs4fQI00" 
              className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-slate-950 font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Jetzt kaufen — EUR 49
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
