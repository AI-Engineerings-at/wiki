export const metadata = {
  title: 'Troubleshooting | AI Engineering Wiki',
  description:
    'Systematisches Troubleshooting für deinen lokalen AI-Stack: Logs, Netzwerk, Container, Ollama, n8n und typische Fehlerbilder in 5 Schritten.',
}

export default function Troubleshooting() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Troubleshooting Leitfaden</h1>
        <p className="text-gray-400 mt-2">Support · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Wenn etwas nicht funktioniert, brauchst du einen systematischen Ansatz. 
          Hier sind unsere bewährten Methoden.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Die 5 Schritte Methode</h2>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">1. Problem verstehen</h3>
            <p className="text-gray-300 text-sm mt-1">
              Was genau passiert? Wann tritt es auf? Was sollte passieren?
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">2. Daten sammeln</h3>
            <p className="text-gray-300 text-sm mt-1">
              Logs anschauen, Fehlermeldungen notieren, Zeitstempel finden.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">3. Hypothese bilden</h3>
            <p className="text-gray-300 text-sm mt-1">
              Was ist die wahrscheinlichste Ursache? Nicht die seltenste.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">4. Testen</h3>
            <p className="text-gray-300 text-sm mt-1">
              Eine Änderung nach der anderen. Nicht mehrere auf einmal.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">5. Dokumentieren</h3>
            <p className="text-gray-300 text-sm mt-1">
              Was war das Problem? Wie wurde es gelöst? Für nächstes Mal.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Häufige Probleme Docker</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Problem</th>
                <th className="text-left py-2 text-gray-400">Lösung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Container startet nicht</td>
                <td className="py-2">docker logs container_name</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Port schon belegt</td>
                <td className="py-2">docker ps | grep port</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Out of Memory</td>
                <td className="py-2">docker stats</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Network-Fehler</td>
                <td className="py-2">docker network ls</td>
              </tr>
              <tr>
                <td className="py-2">Volume-Fehler</td>
                <td className="py-2">docker volume ls</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Wichtige Debug-Befehle</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Container-Logs
docker logs -f container_name
docker logs --tail 100 container_name

# Live-Stats
docker stats

# Alle Container
docker ps -a

# Netzwerk
docker network inspect bridge
docker network ls

# Volumes
docker volume ls
docker volume inspect volume_name

# Bash im Container
docker exec -it container_name /bin/bash

# Neustart
docker restart container_name`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Swarm Debugging</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Service-Status
docker service ls
docker service ps service_name

# Service-Logs
docker service logs -f service_name

# Service-Infos
docker service inspect service_name

# Nodes
docker node ls

# Cluster-Status
docker info`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Log-Analyse</h2>

        <p className="text-gray-300">
          Logs sind dein wichtigstes Werkzeug:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li>Immer mit Timestamps - wann begann das Problem?</li>
          <li>Nach ERROR und WARNING suchen</li>
          <li>Kontext beachten - was passierte davor?</li>
          <li>Stack Traces vollständig kopieren</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Monitoring hilft</h2>

        <p className="text-gray-300">
          Mit Grafana + Prometheus siehst du Probleme früher:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>CPU-Spitzen</li>
          <li>Memory-Leaks</li>
          <li>Container-Restarts</li>
          <li>Network-Fehler</li>
        </ul>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Checkliste bei Problemen</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>[ ] Logs geprüft?</li>
            <li>[ ] Container läuft?</li>
            <li>[ ] Ports frei?</li>
            <li>[ ] genug Ressourcen?</li>
            <li>[ ] Netzwerk erreichbar?</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
