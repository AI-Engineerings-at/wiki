import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grafana Monitoring | AI Engineering Wiki',
  description: 'Monitoring with Prometheus + Grafana. Dashboards, alerts.',
}

export default function GrafanaMonitoringPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Grafana: Monitoring for Homelab</h1>
        <p className="text-slate-400 mt-2">Tools · 7 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">The Blind Flight Problem</h2>
        <p className="text-slate-300">
          Imagine you run a homelab with ten, twenty, or thirty services. Everything seems to be
          running fine. Then one day a customer tells you your website has been offline for six
          hours. Or you realize your backup disk has been full for two weeks. Or a Docker container
          has been silently restarting every fifteen minutes for hours — and nobody noticed.
        </p>
        <p className="text-slate-300 mt-2">
          That happens without monitoring. You are flying blind. Monitoring is the difference between
          "finding problems before anyone is affected" and "learning about problems from angry users."
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">What Good Monitoring Does</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><strong>Shows current state:</strong> Is everything healthy right now? Which services are running? How much disk space is left? You should be able to answer these in under ten seconds.</li>
          <li><strong>Shows trends over time:</strong> Your disk was at sixty percent last month and is now at eighty. At this rate, it will be full in six weeks. Trends tell you what is coming.</li>
          <li><strong>Alerts you to problems:</strong> When a threshold is exceeded — disk over ninety percent, service down for more than two minutes — monitoring sends you a notification in seconds, not hours.</li>
        </ul>

        <p className="text-lg text-slate-300 mt-6">
          Grafana is the dashboard tool for everything with metrics.
          Whether Docker containers, server resources or your own applications -
          Grafana visualizes everything.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Why Grafana?</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>Open Source - free</li>
          <li>100+ data sources - Prometheus, InfluxDB, Elasticsearch</li>
          <li>Flexible dashboards - custom visualizations</li>
          <li>Alerting - notifications when problems occur</li>
          <li>Self-hosted - all data stays local</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Components</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Prometheus</h3>
            <p className="text-slate-300 text-sm mt-1">
              Time-series database. Collects metrics from exporters.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Grafana</h3>
            <p className="text-slate-300 text-sm mt-1">
              Visualization. Dashboards, alerts, notifications.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Exporters</h3>
            <p className="text-slate-300 text-sm mt-1">
              Node Exporter, cAdvisor, custom metrics.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">Alertmanager</h3>
            <p className="text-slate-300 text-sm mt-1">
              Alert routing. Slack, Email, PagerDuty.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Installation</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    volumes:
      - ./grafana-data:/var/lib/grafana`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Key Metrics</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>CPU:</strong> usage_percent, load</li>
          <li><strong>Memory:</strong> used_bytes, available_bytes</li>
          <li><strong>Disk:</strong> read_bytes, write_bytes</li>
          <li><strong>Network:</strong> rx_bytes, tx_bytes</li>
          <li><strong>Docker:</strong> container_status, health</li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Related articles:{' '}
          <a href="/en/tools/docker-grundlagen" className="text-blue-400 hover:text-blue-300">Docker Basics</a>
          {' · '}
          <a href="/en/security/self-hosted-sicherheit" className="text-blue-400 hover:text-blue-300">Self-Hosted Security</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          For implementation support, find <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">resources</a> at ai-engineering.at.
        </p>
      </div>
    </div>
  )
}
