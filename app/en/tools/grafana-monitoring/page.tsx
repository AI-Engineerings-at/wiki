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
        <p className="text-lg text-slate-300">
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

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Grafana Homelab Dashboard Pack</h3>
            <p className="text-slate-300 mb-4">
              22 pre-configured dashboards for Docker Swarm, Proxmox VE, Node Exporter Full, 
              Pi-hole, Traefik, NGINX. Alert Rules pre-configured.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">EUR 39</div>
            <a href="https://buy.stripe.com/3cIdR95Nt2DT81E0t6fQI03" className="inline-block bg-[#4262FF] text-slate-950 font-bold py-3 px-8 rounded-full">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
