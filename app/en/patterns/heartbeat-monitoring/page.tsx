import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Heartbeat & Monitoring | AI Engineering Wiki',
  description: 'How to know if agents are running. Health checks, status updates, alerting.',
}

export default function HeartbeatMonitoringPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Heartbeat & Monitoring</h1>
        <p className="text-slate-400 mt-2">Patterns · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">The Problem</h2>
        <p className="text-slate-300">
          When an agent hangs or uses tokens uncontrollably, you usually only notice 
          when the bill arrives. You need monitoring.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Heartbeat Pattern</h2>
        <p className="text-slate-300">
          A regular signal that tells the system: "I'm still alive".
        </p>

        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`// Heartbeat Loop (pseudocode)
every 60 seconds:
  status = agent.healthCheck()
  metrics.publish('agent_heartbeat', {
    status: status,
    timestamp: now(),
    uptime: uptime(),
    tokens_used: tokens.total()
  })
  
  if status != 'healthy':
    alert.oncall('Agent unhealthy', status)`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Metrics to Capture</h2>

        <h3 className="text-lg font-semibold text-white mt-6">Agent Metrics</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Requests per minute</li>
          <li>Average latency</li>
          <li>Token usage (input/output)</li>
          <li>Error rate</li>
          <li>Queue length</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">System Metrics</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>CPU / RAM usage</li>
          <li>GPU utilization (for local models)</li>
          <li>Disk I/O</li>
          <li>Network traffic</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Alerting Rules</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Prometheus Alert Rules
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
      summary: "High token usage detected"`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Tools</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>Grafana + Prometheus:</strong> Standard for metrics</li>
          <li><strong>Uptime Kuma:</strong> Simple health check dashboard</li>
          <li><strong>n8n Webhook Monitor:</strong> Built-in error tracking</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Practice Tip</h2>
        <p className="text-slate-300">
          Start with simple health endpoint checks (HTTP 200 OK). 
          Only when that works, extend to detailed metrics. 
          Everything else is over-engineering.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Sources</h2>
        <ul>
          <li><a href="https://prometheus.io/docs/alerting/latest/alertmanager/" target="_blank" className="text-blue-400 hover:underline">Prometheus Alerting</a></li>
          <li><a href="https://grafana.com/docs/grafana/latest/" target="_blank" className="text-blue-400 hover:underline">Grafana Docs</a></li>
        </ul>
      </div>
    </div>
  )
}
