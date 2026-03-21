import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Keys Secure Storage | AI Engineering Wiki',
  description: 'Vault, Environment Variables, Secrets Management for AI Stack.',
}

export default function ApiKeysSicherPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">API Keys: Secure Storage</h1>
        <p className="text-slate-400 mt-2">Security · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          API keys are the keys to your kingdom. If they leak, attackers have access to your AI, 
          your data, your money. Heres how to store them securely.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Never Do This</h2>
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <ul className="text-red-300 space-y-1">
            <li>❌ Store in source code (git)</li>
            <li>❌ Hardcode in config files</li>
            <li>❌ Share in Slack/Discord</li>
            <li>❌ Put in docker-compose.yml</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Best Practice: Environment Variables</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# .env file (NOT committed to git!)
OLLAMA_API_KEY=sk-xxx
STRIPE_SECRET_KEY=sk_xxx
DATABASE_URL=postgresql://...

# docker-compose.yml
services:
  app:
    image: myapp
    env_file:
      - .env`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Better: Docker Secrets</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# In Docker Swarm
echo "my_secret" | docker secret create api_key -

# docker-compose.yml
services:
  app:
    image: myapp
    secrets:
      - api_key

secrets:
  api_key:
    external: true`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Best: HashiCorp Vault</h2>
        <p className="text-slate-300">
          For production: Use Vault for centralized secrets management.
        </p>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Get secret at runtime
curl -H "X-Vault-Token: $VAULT_TOKEN" \\
  http://vault:8200/v1/secret/data/myapp/api-key`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Checklist</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Add .env to .gitignore</li>
          <li>Rotate keys regularly</li>
          <li>Use different keys for dev/prod</li>
          <li>Monitor for leaked keys (GitHub scanning)</li>
          <li>Set up alerts for unusual API usage</li>
        </ul>
      </div>
    </div>
  )
}
