import { Metadata } from 'next'
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata: Metadata = {
  title: 'Heartbeat & Monitoring Pattern | AI Engineering Wiki',
  description: 'Wie du weißt, ob Agenten laufen — Health Checks, Status-Updates, Alerting.',
}

export default function HeartbeatMonitoringPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Heartbeat & Monitoring</h1>
        <p className="text-gray-400 mt-2">
          Health Checks, Status-Updates und Alerting für AI-Agenten.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Heartbeat Monitoring stellt sicher, dass AI-Agenten laufen und reagieren.
            Jeder Agent sendet regelmäßig ein Signal (Heartbeat). Bleibt es aus,
            greift Alerting. Implementierung mit Prometheus + Grafana, Alerting über
            Alertmanager. Ohne Monitoring merkst du Ausfälle erst, wenn es zu spät ist.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Das Problem</h2>
        <p>
          Wenn ein Agent hängen bleibt oder unkontrolliert Token verbraucht,
          merkst du es meist erst, wenn die Rechnung kommt. Du brauchst
          Überwachung.
        </p>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title Heartbeat Monitoring Flow

start
repeat
  :Agent sendet Heartbeat\\n(alle 60 Sekunden);
  :Health Check ausführen;
  if (Status = healthy?) then (ja)
    :Metrik an Prometheus\\npublizieren;
  else (nein)
    :Status = unhealthy;
    :Alert an Alertmanager;
    :Benachrichtigung\\n(Slack, E-Mail);
  endif
  :60 Sekunden warten;
repeat while (Agent aktiv?)
:Agent gestoppt;
stop
@enduml`}
          caption="Heartbeat Flow: Agent sendet regelmäßig Signale, bei Ausbleiben greift Alerting"
        />

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

title Monitoring Stack Übersicht

rectangle "AI Agenten" as agents #1E3A5F {
  rectangle "Agent 1\\n(Heartbeat)" as a1 #0F172A
  rectangle "Agent 2\\n(Heartbeat)" as a2 #0F172A
  rectangle "Agent 3\\n(Heartbeat)" as a3 #0F172A
}

rectangle "Prometheus" as prom #1E3A5F
rectangle "Alertmanager" as alert #0F172A
rectangle "Grafana\\n(Dashboards)" as grafana #22543d
rectangle "Uptime Kuma\\n(HTTP Checks)" as kuma #0F172A
rectangle "Slack / E-Mail" as notify #0F172A

agents --> prom : Metriken
prom --> grafana : Visualisierung
prom --> alert : Alert Rules
alert --> notify : Benachrichtigung
kuma --> notify : Status-Alerts
@enduml`}
          caption="Monitoring Stack: Agenten liefern Metriken, Prometheus speichert, Grafana zeigt, Alertmanager warnt"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Heartbeat Pattern</h2>
        <p>
          Ein regelmäßiges Signal, das dem System mitteilt: „Ich lebe noch“.
        </p>

        <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
{`// Heartbeat Loop (Pseudocode)
every 60 seconds:
  status = agent.healthCheck()
  metrics.publish('agent_heartbeat', {
    status: status,
    timestamp: now(),
    uptime: uptime(),
    tokens_used: tokens.total()
  })
  
  if status != 'healthy':
    alert.oncall('Agent unhealthy', status)`}
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Python Implementation</h2>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Heartbeat Service
import asyncio
import time
from datetime import datetime

class Heartbeat:
    def __init__(self, agent_name: str, interval: int = 60):
        self.agent_name = agent_name
        self.interval = interval
        self.last_beat = datetime.now()
        self.status = "healthy"
        
    async def beat(self):
        """Send heartbeat to monitoring"""
        self.last_beat = datetime.now()
        
        # Check Agent Health
        try:
            health = await self.agent.health_check()
            self.status = "healthy" if health else "degraded"
        except:
            self.status = "unhealthy"
            
        # Publish to Prometheus
        metrics.agent_heartbeat.labels(
            agent=self.agent_name,
            status=self.status
        ).inc()
        
    async def run(self):
        """Main heartbeat loop"""
        while True:
            await self.beat()
            await asyncio.sleep(self.interval)
            
    def is_alive(self, timeout: int = 180):
        """Check ob Agent noch lebt"""
        elapsed = (datetime.now() - self.last_beat).total_seconds()
        return elapsed < timeout

# Usage
heartbeat = Heartbeat("jim01", interval=60)
asyncio.create_task(heartbeat.run())`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Metriken erfassen</h2>

        <h3 className="text-lg font-semibold text-white mt-6">Agent Metrics</h3>
        <ul>
          <li>Requests pro Minute</li>
          <li>Durchschnittliche Latenz</li>
          <li>Token-Verbrauch (Input/Output)</li>
          <li>Fehlerrate</li>
          <li>Queue-Länge</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">System Metrics</h3>
        <ul>
          <li>CPU / RAM Auslastung</li>
          <li>GPU Utilization (bei Local Models)</li>
          <li>Disk I/O</li>
          <li>Network Traffic</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Alerting Regeln</h2>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
{`# Prometheus Alert Rules
groups:
- name: agent-alerts
  rules:
  - alert: AgentDown
    expr: up{job="ai-agent"} == 0
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Agent {{ $labels.instance }} is down"
      
  - alert: HighTokenUsage
    expr: rate(token_usage_total[1h]) > 1000000
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "High token usage detected"

  - alert: AgentStuck
    expr: time() - agent_last_beat > 300
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Agent {{ $labels.agent }} stuck for > 5min"`}
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Tools</h2>
        <ul>
          <li><strong>Grafana + Prometheus:</strong> Standard für Metrics</li>
          <li><strong>Uptime Kuma:</strong> Einfaches Health-Check Dashboard</li>
          <li><strong>n8n Webhook Monitor:</strong> Built-in Error Tracking</li>
        </ul>

        <Callout type="tip" title="Praxis-Tipp">
          <p>
            Beginne mit einfachen Health-Endpoint Checks (HTTP 200 OK).
            Erst wenn das läuft, erweiterst du auf detaillierte Metrics.
            Alles andere ist Over-Engineering.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Uptime Kuma als einfache Alternative</h2>
        <p>
          Nicht jedes Setup braucht Prometheus. Uptime Kuma ist ein
          Self-hosted Monitoring Tool mit Web-UI, das HTTP-Checks,
          TCP-Checks und Docker-Container überwachen kann:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Uptime Kuma als Docker Container
docker run -d \\
  --name uptime-kuma \\
  --restart=always \\
  -p 3001:3001 \\
  -v uptime-kuma:/app/data \\
  louislam/uptime-kuma:1

# Danach erreichbar unter http://localhost:3001
# Monitors anlegen:
# - HTTP(s) Check auf deine Agent-Endpoints
# - TCP Check auf Ollama Port 11434
# - Docker Container Check (Socket einbinden)

# Notifications konfigurieren:
# - Mattermost Webhook
# - E-Mail
# - Telegram Bot`}</code>
        </pre>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://prometheus.io/docs/alerting/latest/alertmanager/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Prometheus Alertmanager</a> — Alerting und Notification-Routing</li>
            <li><a href="https://grafana.com/docs/grafana/latest/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Grafana Dokumentation</a> — Dashboards und Visualisierung</li>
            <li><a href="https://github.com/louislam/uptime-kuma" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Uptime Kuma</a> — Self-hosted Monitoring Tool</li>
            <li><a href="https://prometheus.io/docs/concepts/metric_types/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Prometheus Metric Types</a> — Gauges, Counters, Histograms</li>
          </ul>
        </section>
      </div>
    </div>
  )
}