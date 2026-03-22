import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'MCP Server | AI Engineering Wiki',
  description:
    'Model Context Protocol (MCP): Verbinde Claude Desktop mit deiner Infrastruktur. Setup, Beispiel-Server und typische Queries für Homelab/AI-Stack.',
}

export default function McpServer() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">MCP Server für Claude Desktop</h1>
        <p className="text-gray-400 mt-2">Tools · 5 min</p>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Stand: März 2026</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">MCP Protocol 1.x</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            MCP ist ein offener Standard von Anthropic, der Claude Desktop mit
            externen Tools verbindet. Du kannst eigene Server schreiben (Python,
            TypeScript), die Docker, Proxmox, Grafana oder Ollama steuern —
            alles per natürlicher Sprache. Setup in unter 10 Minuten mit FastMCP.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Model Context Protocol (MCP) verbindet Claude Desktop mit deiner Infrastruktur.
        </p>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam componentBorderColor #334155
skinparam componentBackgroundColor #0F172A

title MCP (Model Context Protocol) Architektur

rectangle "Claude Desktop" as claude #1E3A5F
rectangle "MCP Protokoll\\n(stdio / SSE)" as proto #4a4a00

rectangle "MCP Server" as servers #1E3A5F {
  rectangle "Portainer Server\\n(Docker Container)" as s1 #0F172A
  rectangle "Proxmox Server\\n(VMs, LXCs)" as s2 #0F172A
  rectangle "n8n Server\\n(Workflows)" as s3 #0F172A
  rectangle "Ollama Server\\n(LLM Modelle)" as s4 #0F172A
  rectangle "Grafana Server\\n(Dashboards)" as s5 #0F172A
}

rectangle "Infrastruktur" as infra #22543d {
  rectangle "Docker Swarm" as d1 #0F172A
  rectangle "Proxmox VE" as d2 #0F172A
  rectangle "n8n Instance" as d3 #0F172A
  rectangle "Ollama GPU" as d4 #0F172A
  rectangle "Grafana" as d5 #0F172A
}

claude --> proto : Natürliche Sprache
proto --> servers : Tool Calls
servers --> infra : API Requests
infra --> servers : Responses
servers --> proto : Ergebnisse
proto --> claude : Antwort
@enduml`}
          caption="MCP Architektur: Claude Desktop kommuniziert über MCP-Server mit der gesamten Infrastruktur"
        />

        <figure className="my-8">
          <img src="/images/diagrams/tools-mcp-architektur.png" alt="MCP Server Architektur" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">MCP Server Architektur</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Was ist MCP?</h2>
        <p className="text-gray-300 mt-2">
          MCP ist ein offener Standard von Anthropic. Er ermöglicht Claude, 
          mit externen Tools und Datenquellen zu kommunizieren.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Unsere MCP Server</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Server</th>
                <th className="text-left py-2 text-gray-400">Tools</th>
                <th className="text-left py-2 text-gray-400">Steuert</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Portainer</td>
                <td className="py-2">5</td>
                <td className="py-2">Docker Container</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Proxmox</td>
                <td className="py-2">6</td>
                <td className="py-2">VMs, LXCs</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">n8n</td>
                <td className="py-2">5</td>
                <td className="py-2">Workflows</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Ollama</td>
                <td className="py-2">4</td>
                <td className="py-2">LLM-Modelle</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Grafana</td>
                <td className="py-2">6</td>
                <td className="py-2">Dashboards</td>
              </tr>
              <tr>
                <td className="py-2">Uptime Kuma</td>
                <td className="py-2">3</td>
                <td className="py-2">Monitoring</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Installation</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# 1. Python installieren
pip install mcp

# 2. Claude Desktop config
# ~/.config/Claude/claude_desktop_config.json

{
  "mcpServers": {
    "homelab": {
      "command": "python3",
      "args": ["/path/to/server.py"]
    }
  }
}`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Nach dem Neustart von Claude Desktop siehst du die verfügbaren Tools im Menü.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/tools-skills-architektur.png" alt="Skills Architektur" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Skills Architektur</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Eigener MCP Server mit FastMCP</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# 1. FastMCP installieren
pip install fastmcp

# 2. server.py erstellen
from fastmcp import FastMCP
import subprocess

mcp = FastMCP("Homelab Server")

@mcp.tool()
def run_docker_command(command: str) -> str:
    """Führe Docker Commands aus"""
    result = subprocess.run(
        command.split(),
        capture_output=True,
        text=True
    )
    return result.stdout + result.stderr

@mcp.tool()  
def get_container_status() -> list:
    """Liste alle laufenden Container"""
    result = subprocess.run(
        ["docker", "ps", "--format", "{{.Names}}"],
        capture_output=True,
        text=True
    )
    return result.stdout.strip().split("\n")

@mcp.tool()
def restart_service(service: str) -> str:
    """Starte einen Docker Service neu"""
    result = subprocess.run(
        ["docker-compose", "restart", service],
        capture_output=True,
        text=True
    )
    return f"Service {service} restartet"

if __name__ == "__main__":
    mcp.run(transport="stdio")`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Beispiel-Queries</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>• <strong>"Welche Container laufen gerade?"</strong></li>
          <li>• <strong>"Starte die docker-swarm3 VM"</strong></li>
          <li>• <strong>"Zeig mir alle aktiven Alerts"</strong></li>
          <li>• <strong>"Wie viel VRAM nutzt Ollama?"</strong></li>
        </ul>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Erwartete Claude-Antworten:

User: "Welche Container laufen gerade?"
Claude: "Ich frage mal schnell die Docker-API..."
→ nutzt get_container_status()
→ "Aktuell laufen: nginx, postgres, redis, ollama"

User: "Starte den n8n Container neu"
Claude: "Klar, einen Moment..."
→ nutzt restart_service("n8n")
→ "Done. n8n läuft wieder."`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Offizielle Quellen</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-sm text-gray-300 space-y-2">
            <li>
              <a href="https://modelcontextprotocol.io" className="text-blue-400 hover:underline">
                modelcontextprotocol.io
              </a>
              <p className="text-gray-500 text-xs">Offizielle Dokumentation</p>
            </li>
            <li>
              <a href="https://github.com/PrefectHQ/fastmcp" className="text-blue-400 hover:underline">
                FastMCP Framework
              </a>
              <p className="text-gray-500 text-xs">Python-Framework für MCP-Server</p>
            </li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Fazit</h3>
          <p className="text-gray-300">
            MCP ermöglicht Claude, deine gesamte Infrastruktur zu steuern — 
            per Natural Language.
          </p>
        </div>
      </div>
    </div>
  )
}