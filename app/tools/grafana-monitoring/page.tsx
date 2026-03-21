import { CaseStudyBox } from '../../../components/CaseStudyBox'
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Grafana Monitoring | AI Engineering Wiki',
  description:
    'Monitoring mit Prometheus + Grafana: Dashboards, Metriken, Alerting und Best Practices für Homelab und lokale AI-Infrastruktur.',
}

export default function GrafanaMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Grafana: Monitoring für Homelab</h1>
        <p className="text-gray-400 mt-2">Tools · 7 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Grafana + Prometheus bilden den Monitoring-Stack für dein Homelab.
            Prometheus sammelt Metriken, Grafana visualisiert sie. Mit Alertmanager
            bekommst du Benachrichtigungen bei Problemen. Open Source, self-hosted,
            100+ Datenquellen.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Grafana ist das Dashboard-Tool schlechthin, wenn es um Metriken geht.
          Egal ob Docker-Container, Server-Ressourcen oder deine eigenen Anwendungen —
          Grafana visualisiert alles, was du reingibst.
        </p>

        <CaseStudyBox
          tool="Grafana + Prometheus"
          stat="6 Dashboards auf 6 Nodes"
          description="die 31 Docker Services, GPU-Auslastung und LLM-Requests überwachen"
          blogLink="/blog/2026-03-08-31-docker-services-monitoring"
          productLink="https://buy.stripe.com/3cIdR95Nt2DT81E0t6fQI03"
          productName="Grafana Dashboard Pack (EUR 39)"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Warum Grafana?</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>• <strong>Open Source</strong> — kostenlos</li>
          <li>• <strong>100+ Datenquellen</strong> — Prometheus, InfluxDB, Elasticsearch</li>
          <li>• <strong>Flexible Dashboards</strong> — eigene Visualisierungen</li>
          <li>• <strong>Alerting</strong> — Benachrichtigungen bei Problemen</li>
          <li>• <strong>Self-hosted</strong> — alle Daten bleiben lokal</li>
        </ul>

        <figure className="my-8">
          <img src="/images/diagrams/tools-grafana-stack.png" alt="Grafana Monitoring Stack — Prometheus, Exporters, Alertmanager" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Grafana Stack: Prometheus, Exporters und Alertmanager im Zusammenspiel</figcaption>
        </figure>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam componentBorderColor #334155
skinparam componentBackgroundColor #0F172A

title Monitoring Stack: Prometheus + Grafana

rectangle "Datenquellen" as sources #1E3A5F {
  rectangle "Node Exporter\\n(CPU, RAM, Disk)" as node #0F172A
  rectangle "cAdvisor\\n(Container Metriken)" as cadvisor #0F172A
  rectangle "NVIDIA Exporter\\n(GPU Metriken)" as nvidia #0F172A
  rectangle "Ollama\\n(LLM Metriken)" as ollama #0F172A
}

rectangle "Prometheus\\n(Sammlung & Speicherung)" as prom #1E3A5F
rectangle "Alertmanager\\n(Benachrichtigungen)" as alert #0F172A
rectangle "Grafana\\n(Dashboards)" as grafana #22543d
rectangle "Benachrichtigung\\n(Slack, E-Mail)" as notify #0F172A

sources --> prom : Scrape alle 15s
prom --> grafana : PromQL Queries
prom --> alert : Alert Rules
alert --> notify : Notification
@enduml`}
          caption="Monitoring Stack: Exporter liefern Metriken an Prometheus, Grafana visualisiert, Alertmanager benachrichtigt"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Komponenten</h2>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Prometheus</h3>
            <p className="text-gray-300 text-sm mt-1">
              Time-Series-Datenbank. Sammelt Metriken von Exporters.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Grafana</h3>
            <p className="text-gray-300 text-sm mt-1">
              Visualisierung. Dashboards, Alerts, Benachrichtigungen.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Exporters</h3>
            <p className="text-gray-300 text-sm mt-1">
              Node Exporter, cAdvisor, custom Metrics.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Alertmanager</h3>
            <p className="text-gray-300 text-sm mt-1">
              Routing von Alerts. Slack, Email, PagerDuty.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Monitoring</h2>

          <p className="text-gray-300 mb-4">
            Hier ist unser docker-compose.yml für ein komplettes Monitoring-Stack:
          </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# docker-compose.yml
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"

  cadvisor:
    image: gcr.io/cadvisor/cadvisor
    ports:
      - "8080:8080"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Nach dem Starten über <code>docker compose up -d</code> findest du:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>• <strong>Grafana:</strong> http://localhost:3000 (admin/admin)</li>
          <li>• <strong>Prometheus:</strong> http://localhost:9090</li>
          <li>• <strong>Node Exporter:</strong> http://localhost:9100</li>
          <li>• <strong>cAdvisor:</strong> http://localhost:8080</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Prometheus Konfiguration</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Teste mit: <code>curl http://localhost:9090/api/v1/query?query=up</code>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Wichtige Metriken</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Metrik</th>
                <th className="text-left py-2 text-gray-400">Beschreibung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">CPU Usage</td>
                <td className="py-2">Prozentuale Auslastung</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Memory Usage</td>
                <td className="py-2">RAM in GB oder Prozent</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Disk Usage</td>
                <td className="py-2">Speicherplatz auf Festplatten</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Network I/O</td>
                <td className="py-2">Durchsatz in MB/s</td>
              </tr>
              <tr>
                <td className="py-2">Container Status</td>
                <td className="py-2">Running/Stopped/Restarting</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Alerting</h2>

        <p className="text-gray-300 mb-4">
          So richtest du Alerts ein, die dich bei Problemen benachrichtigen:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# alerts.yml - Alert-Regeln
groups:
- name: container_alerts
  rules:
  - alert: HighMemoryUsage
    expr: (container_memory_usage_bytes / container_spec_memory_limit_bytes) * 100 > 90
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "Container {{ $labels.name }} nutzt über 90% RAM"

  - alert: ContainerDown
    expr: up{job="docker"} == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Container {{ $labels.instance }} ist down"

  - alert: HighCPUUsage
    expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
    for: 10m
    labels:
      severity: warning`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Prometheus Query-Beispiele zum Testen:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Alle laufenden Container
up{job="docker"}

# Memory Usage in Prozent
(container_memory_usage_bytes / container_spec_memory_limit_bytes) * 100

# CPU Usage
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Unsere Dashboards</h2>

          <p className="text-gray-300">
            Wir nutzen 22 vorkonfigurierte Dashboards:
          </p>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>• <strong>Docker Swarm Overview</strong></li>
          <li>• <strong>Node Resources</strong> (CPU, RAM, Disk)</li>
          <li>• <strong>Container Details</strong></li>
          <li>• <strong>Network Traffic</strong></li>
          <li>• <strong>GPU Utilization</strong> (für Ollama)</li>
          <li>• <strong>n8n Workflow Status</strong></li>
          <li>• <strong>System Health Overview</strong></li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">GPU Monitoring für Ollama</h2>

        <p className="text-gray-300 mb-4">
          Für GPU-Monitoring brauchst du den nvidia-exporter:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# docker-compose.yml erweitern
  nvidia-exporter:
    image: nvcr.io/nvidia/prometheus-nvidia-exporter:latest
    environment:
      - NVIDIA_ADDR=unix:///run/nvidia.sock
    volumes:
      - /var/run/nvidia.sock:/var/run/nvidia.sock
    ports:
      - "9101:9101"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Wichtige GPU-Metriken in Prometheus:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# GPU Temperature
nvidia_gpu_temperature_celsius

# GPU Utilization
nvidia_gpu_utilization_percentage

# Memory Usage
nvidia_gpu_memory_used_bytes / nvidia_gpu_memory_total_bytes * 100

# Power Usage
nvidia_gpu_power_draw_watts`}</code>
        </pre>

        <Callout type="tip" title="Prometheus Config Reload">
          <p>
            Nach Aenderungen an prometheus.yml musst du nicht den Container neu
            starten. Ein einfaches curl -X POST http://localhost:9090/-/reload
            genügt, damit Prometheus die neue Konfiguration laedt.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Fazit</h3>
          <p className="text-slate-300">
            Ohne Monitoring fliegst du blind. Grafana + Prometheus gibt dir Sichtbarkeit
            über deine gesamte Infrastruktur — bevor Benutzer Probleme melden.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://grafana.com/docs/grafana/latest/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Grafana Dokumentation</a></li>
            <li><a href="https://prometheus.io/docs/introduction/overview/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Prometheus Docs: Overview</a></li>
            <li><a href="https://github.com/google/cadvisor" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: google/cadvisor</a> — Container Advisor für Docker-Metriken</li>
            <li><a href="https://grafana.com/grafana/dashboards/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Grafana Dashboard Library</a> — Fertige Dashboards zum Importieren</li>
          </ul>
        </section>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Grafana Homelab Dashboard Pack</h3>
            <p className="text-slate-300 mb-4">
              22 vorkonfigurierte Dashboards für Docker Swarm, Proxmox VE, Node Exporter Full, 
              Pi-hole, Traefik, NGINX. Alert Rules bereits konfiguriert.
            </p>
            <ul className="text-sm text-slate-400 space-y-1 mb-4">
              <li>✓ Docker Swarm + Proxmox VE</li>
              <li>✓ Node Exporter Full</li>
              <li>✓ Pi-hole, Traefik, NGINX</li>
              <li>✓ Alert Rules vorkonfiguriert</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">€39</div>
            <div className="text-sm text-slate-500 line-through mb-3">€59</div>
            <a 
              href="https://buy.stripe.com/3cIdR95Nt2DT81E0t6fQI03" 
              className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-slate-950 font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Jetzt kaufen
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}