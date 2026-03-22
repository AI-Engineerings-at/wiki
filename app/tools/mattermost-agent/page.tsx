import Callout from "../../../components/Callout"

export const metadata = {
  title: 'Mattermost Agent Kommunikation | AI Engineering Wiki',
  description:
    'Mattermost als Kommunikationsbus für Multi-Agent Systeme: Bot-Setup, Webhooks, Polling, Nachrichtenformat und Audit-Trail in der Praxis.',
}

export default function MattermostAgent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Mattermost: Agent-Kommunikation</h1>
        <p className="text-gray-400 mt-2">Tools · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Mattermost ist ein self-hosted Messaging-Tool und dient als zentraler
            Kommunikationsbus für AI-Agenten. Webhooks, Bot-Integration,
            Thread-Support und DSGVO-konform — alles was ein Multi-Agent System
            für Koordination braucht.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Mattermost ist unser zentraler Kommunikationsbus für alle Agenten. Statt einzeln
          mit jedem Agent zu chatten, läuft alles über einen Nachrichtenkanal. Das macht
          Koordination einfach und schafft einen automatischen Audit-Trail.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Warum Mattermost?</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>Open Source — alle Daten bleiben lokal</li>
          <li>Webhook-fähig — perfekt für Automation</li>
          <li>Thread-Unterstützung — Kontexte bleiben sortiert</li>
          <li>Markdown-Support — strukturierte Nachrichten</li>
          <li>DSGVO-konform — kein US-Cloud-Zwang</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Setup</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Channel</th>
                <th className="text-left py-2 text-gray-400">Zweck</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">#echo_log</td>
                <td className="py-2">Haupt-Channel für Agent-Tasks</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">#infra-alerts</td>
                <td className="py-2">Monitoring-Alerts</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">#shop-orders</td>
                <td className="py-2">Bestellungen, Stripe</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">#dev-deployments</td>
                <td className="py-2">Deploy-Status</td>
              </tr>
              <tr>
                <td className="py-2">#email-inbox</td>
                <td className="py-2">Eingehende E-Mails</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Compose Setup</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# docker-compose.yml
services:
  mattermost:
    image: mattermost/mattermost-enterprise-edition
    ports:
      - "8065:8065"
    volumes:
      - ./data:/mattermost/data
      - ./config:/mattermost/config
    environment:
      - MM_SERVICESETTINGS_SITEURL=http://mattermost.local:8065
      - MM_SERVICESETTINGS_LISTENADDRESS=:8065
      - MM_TEAMSSETTINGS_SITENAME=Echo_log
    restart: unless-stopped`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Nach dem Start: http://localhost:8065 — erster User wird Admin.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Agent-Polling</h2>

        <p className="text-gray-300">
          Jeder Agent hat ein Polling-Skript, das ständig den Channel überwacht:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Python: Polling-Loop
import mattermostdriver

driver = Mattermost({
    'url': 'mattermost.example.com',
    'token': 'your-bot-token',
    'team_name': 'echo_log'
})

async def poll_channel():
    while True:
        posts = driver.posts.get_posts_for_channel('channel-id')
        for post in posts['posts'].values():
            if not post.get('metadata'):
                continue
            if '@jim01' in post['message']:
                task = parse_task(post['message'])
                result = await execute(task)
                post_response(post['root_id'], result)
        await asyncio.sleep(10)

# Start polling
asyncio.run(poll_channel())`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Nachrichten-Format</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Task-Request
@jim01 Bitte deploye die neue Landing Page auf .99

# Response (durch Agent)
@joe Deployment abgeschlossen.
- Branch: feature/new-landing
- URL: https://ai-engineering.at
- Build: erfolgreich
- Dauer: 3min 22s

# Thread-Antwort (besser für Debugging)
@joe Ich schaue mir das mal an...
- Checking branch exists...
- Running docker build...
- Deploying to production...
✓ Fertig!`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Webhook-Integration</h2>

        <p className="text-gray-300">
          Mattermost Webhooks ermöglichen externe Integration:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Outgoing Webhook (zu anderen Diensten)
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Neue Bestellung: EUR 49",
    "channel": "shop-orders",
    "username": "stripe-bot",
    "icon_emoji": ":moneybag:"
  }' \
  https://mattermost.example.com/hooks/xxx-webhook-id

# Incoming Webhook (von anderen Diensten)
# z.B. Stripe -> Webhook -> Mattermost
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "text": "🚨 Payment Failed: Kunde #12345",
    "attachments": [{
      "color": "#FF0000",
      "fields": [{"title": "Betrag", "value": "€49.00"}]
    }]
  }' \
  https://mattermost.example.com/hooks/xxx`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Bot erstellen</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-4">
          <li>Als Admin: Integration → Bot → "Bot erstellen"</li>
          <li>Token kopieren (wird nur einmal angezeigt)</li>
          <li>Bot zum Channel hinzufügen: Channel → Mitglieder → "Bot hinzufügen"</li>
        </ol>

        <h2 className="text-xl font-semibold text-white mt-8">Best Practices</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-4">
          <li>• <strong>Immer @mention verwenden</strong> — sonst ignorieren Agents</li>
          <li>• <strong>Klare Struktur</strong>: Task → Kontext → Erwartetes Ergebnis</li>
          <li>• <strong>Antworten im Thread</strong> — Channel bleibt sauber</li>
          <li>• <strong>Fehler sofort posten</strong> — Transparenz</li>
          <li>• <strong>Status-Updates</strong> bei langen Tasks</li>
        </ol>

        <Callout type="info" title="Nachrichten-Limit">
          <p>
            Mattermost hat ein Limit von 4.000 Zeichen pro Nachricht. Bei laengeren
            Agent-Antworten muss der Text automatisch an Absatz-Grenzen gesplittet
            werden.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Zusammenfassung</h3>
          <p className="text-gray-300">
            Mattermost ist das Nervensystem unseres Agenten-Teams. Jede Kommunikation
            wird automatisch geloggt — gut für Audit und Debugging.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://mattermost.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mattermost — Offizielle Website</a></li>
            <li><a href="https://developers.mattermost.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mattermost Developer Documentation</a> — API, Webhooks, Bots</li>
            <li><a href="https://github.com/mattermost/mattermost" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: mattermost/mattermost</a> — Source Code</li>
            <li><a href="https://developers.mattermost.com/api-documentation" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mattermost API Reference</a> — REST API v4</li>
          </ul>
        </section>
      </div>
    </div>
  )
}