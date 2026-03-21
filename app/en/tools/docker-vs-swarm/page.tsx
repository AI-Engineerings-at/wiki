import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docker vs Docker Swarm for AI | AI Engineering Wiki',
  description: 'Which is right for AI? Compose for development, Swarm for production.',
}

export default function DockerVsSwarmPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Docker Compose vs Docker Swarm</h1>
        <p className="text-slate-400 mt-2">Tools · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          You want to set up Ollama, n8n, Grafana and Mattermost. Now the question: 
          Docker Compose or Docker Swarm? The answer determines how your stack scales.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Compose in 60 Seconds</h2>
        <p className="text-slate-300">
          Docker Compose is the best friend of every developer. You write a 
          <code>docker-compose.yml</code>, define your services (Ollama, PostgreSQL, 
          Redis, Grafana) and start with <code>docker-compose up</code>. Everything runs 
          on your local machine or a single server.
        </p>

        <h3 className="text-lg font-medium text-white mt-4">When Compose is perfect:</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Single-machine setups (laptop, one physical server)</li>
          <li>Development environments</li>
          <li>Small hobby projects</li>
          <li>Learning infrastructure</li>
          <li>GPU-intensive workloads (Ollama with A100 or 3090)</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Swarm in 60 Seconds</h2>
        <p className="text-slate-300">
          Docker Swarm is Dockers built-in orchestration platform. You cluster 3+ machines, 
          define managers and workers, and the cluster takes over: service scheduling, 
          load balancing, rolling updates, service discovery, high availability.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">The Direct Comparison</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Feature</th>
              <th className="text-left py-2 text-slate-400">Docker Compose</th>
              <th className="text-left py-2 text-slate-400">Docker Swarm</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">Setup Complexity</td>
              <td className="py-2">5 minutes</td>
              <td className="py-2">30 minutes (one-time)</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Multi-Host Support</td>
              <td className="py-2">❌ No</td>
              <td className="py-2">✅ Yes (3+ Nodes)</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">High Availability</td>
              <td className="py-2">❌ No (SPOF)</td>
              <td className="py-2">✅ Yes</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Rolling Updates</td>
              <td className="py-2">Manual stop/start</td>
              <td className="py-2">Built-in (Zero-Downtime)</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Load Balancing</td>
              <td className="py-2">❌ No</td>
              <td className="py-2">✅ Yes</td>
            </tr>
            <tr>
              <td className="py-2">GPU Passthrough</td>
              <td className="py-2">Simple</td>
              <td className="py-2">Node Constraints needed</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-semibold text-white mt-8">When to Use What?</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-900 border border-green-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">✅ Use Docker Compose if:</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• One machine. Nothing more planned.</li>
              <li>• Experimenting. Learning Ollama, n8n.</li>
              <li>• GPU-only. Whole stack on one 3090.</li>
              <li>• No uptime needed. Hobby project.</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">✅ Use Docker Swarm if:</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• 3+ VMs/servers. Proxmox cluster.</li>
              <li>• Production. Replicas, rolling updates.</li>
              <li>• Complex stack. 9+ services.</li>
              <li>• Team infrastructure.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-slate-500">
          All wiki articles are free. Looking for ready-made templates and bundles?
        </p>
        <a
          href="https://www.ai-engineering.at"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block"
        >
          View Products & Bundles →
        </a>
      </div>
    </div>
  )
}
