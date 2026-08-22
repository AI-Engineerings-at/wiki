import { CodeBlock } from '../../../../components/CodeBlock'
import { Metadata } from 'next'
import { alternatesFor } from '../../../../lib/alternates'
import { ArticleHero } from '../../../../components/ArticleHero'

export const metadata: Metadata = {
  openGraph: {
    type: 'article',
    images: [{ url: '/images/hero-2026-08/en/tools/mcp-server.webp', width: 1344, height: 768, type: 'image/webp' }],
  },
  alternates: alternatesFor('/en/tools/mcp-server'),
  title: 'MCP Server',
  description: 'Model Context Protocol. Connect Claude to your infrastructure.',
}

export default function MCPServerPage() {
  return (
    <div className="space-y-8">
      <ArticleHero src="/images/hero-2026-08/en/tools/mcp-server.webp" alt={'MCP Server'} />
      <div>
        <h1 className="text-3xl font-bold text-white">MCP Server</h1>
        <p className="text-slate-400 mt-2">Tools · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          MCP (Model Context Protocol) connects AI assistants like Claude directly to your infrastructure.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/tools-mcp-architektur.png" alt="What is MCP? — illustration from the German article" className="rounded-xl border border-white/10 w-full" loading="lazy" />
        </figure>
        <h2 className="text-xl font-semibold text-white mt-8">What is MCP?</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Open standard for AI-tool integration</li>
          <li>Claude can access your servers</li>
          <li>Read metrics, trigger workflows</li>
          <li>Self-hosted - no cloud needed</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Popular MCP Servers</h2>
        <div className="table-wrap">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Server</th>
              <th className="text-left py-2 text-slate-400">Purpose</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">Docker MCP</td>
              <td className="py-2">Container management</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Prometheus MCP</td>
              <td className="py-2">Read metrics</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Grafana MCP</td>
              <td className="py-2">Dashboards, alerts</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Proxmox MCP</td>
              <td className="py-2">VM management</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">n8n MCP</td>
              <td className="py-2">Trigger workflows</td>
            </tr>
            <tr>
              <td className="py-2">Ollama MCP</td>
              <td className="py-2">Local LLMs</td>
            </tr>
          </tbody>
        </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Setup Example</h2>
        <CodeBlock lang="en">
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# claude_desktop_config.json

{
  "mcpServers": {
    "docker": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-docker"]
    },
    "prometheus": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-prometheus"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed"]
    }
  }
}`}</code>
        </pre>
        </CodeBlock>

        <figure className="my-8">
          <img src="/images/diagrams/tools-skills-architektur.png" alt="Use Cases — illustration from the German article" className="rounded-xl border border-white/10 w-full" loading="lazy" />
        </figure>
        <h2 className="text-xl font-semibold text-white mt-8">Use Cases</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>"Show me CPU usage of my Docker containers"</li>
          <li>"Restart the n8n container"</li>
          <li>"Trigger the backup workflow"</li>
          <li>"What alerts do we have in Grafana?"</li>
        </ul>
      </div>
    </div>
  )
}
