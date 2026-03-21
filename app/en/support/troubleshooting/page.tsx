import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Troubleshooting | AI Engineering Wiki',
  description: 'Common problems with Ollama, n8n, Docker. Diagnosis and solutions.',
}

export default function TroubleshootingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Troubleshooting Guide</h1>
        <p className="text-slate-400 mt-2">Support · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          Common problems and solutions for your AI stack.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Ollama Issues</h2>
        
        <h3 className="text-lg font-semibold text-white mt-6">Out of Memory</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Check memory
free -h

# Kill other processes
docker ps --format '{{.Names}}' | xargs -r docker kill

# Use smaller model
ollama run llama3:8b  # instead of 70b`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6">Model not found</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# List available models
ollama list

# Pull a model
ollama pull mistral`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Issues</h2>
        
        <h3 className="text-lg font-semibold text-white mt-6">Container won't start</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Check logs
docker logs container_name

# Check status
docker ps -a

# Restart
docker restart container_name`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6">Port already in use</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Find what's using the port
sudo lsof -i :5678

# Change port in docker-compose.yml
ports:
  - "5679:5678"`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">n8n Issues</h2>
        
        <h3 className="text-lg font-semibold text-white mt-6">Workflow not executing</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Check if workflow is activated</li>
          <li>Check execution logs</li>
          <li>Verify credentials</li>
          <li>Test individual nodes</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">Webhooks not working</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Check webhook URL is correct</li>
          <li>Verify firewall allows the port</li>
          <li>Check n8n logs</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Network Issues</h2>
        
        <h3 className="text-lg font-semibold text-white mt-6">Container can't reach internet</h3>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Test from inside container
docker exec container_name ping google.com

# Check DNS
docker exec container_name cat /etc/resolv.conf

# Restart Docker
sudo systemctl restart docker`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Debug Commands</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# All containers status
docker ps -a

# Resource usage
docker stats

# Logs (follow)
docker logs -f container_name

# Enter container
docker exec -it container_name /bin/bash`}</code>
        </pre>
      </div>
    </div>
  )
}
