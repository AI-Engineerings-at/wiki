import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mattermost AI Agent | AI Engineering Wiki',
  description: 'Build an AI agent for Mattermost chat. Bot setup, prompts.',
}

export default function MattermostAgentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Mattermost AI Agent</h1>
        <p className="text-slate-400 mt-2">Tools · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          A Mattermost bot brings AI to your team chat. This guide shows you how to set it up.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Why Mattermost?</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Open Source - self-hosted</li>
          <li>Full data control</li>
          <li>Enterprise features</li>
          <li>Integrations with everything</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Bot Setup</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# 1. Create Bot Account
# In Mattermost: System Console > Integrations > Bot Accounts

# 2. Get Access Token
# Save the token securely!

# 3. Add to channel
/memberadd @ai-bot`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Python Bot Example</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`import mattermost
from mattermost import Webhook

# Connect to Mattermost
client = mattermost.Client('your-instance.com')
client.login('bot-email', 'bot-token')

# Simple AI response
@client.on_message
def handle_message(event):
    if event.text.startswith('!ai'):
        prompt = event.text[3:]
        response = ollama.chat('llama3', prompt)
        client.post_message(event.channel, response)`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">With n8n</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Use Mattermost Node in n8n</li>
          <li>Trigger on new messages</li>
          <li>Connect to Ollama</li>
          <li>Post response back</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Commands</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Command</th>
              <th className="text-left py-2 text-slate-400">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">!ai What is...?</td>
              <td className="py-2">Ask AI anything</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">!summarize</td>
              <td className="py-2">Summarize thread</td>
            </tr>
            <tr>
              <td className="py-2">!help</td>
              <td className="py-2">Show help</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
