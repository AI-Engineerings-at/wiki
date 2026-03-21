import Callout from "../../../components/Callout"

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
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Systematisches Debugging in 5 Schritten: Problem verstehen, Daten sammeln,
            Hypothese bilden, testen, dokumentieren. Wichtigste Tools: docker logs,
            docker stats, docker network inspect. Häufigste Ursachen: Port-Konflikte,
            OOM-Kills, Netzwerk-Isolation, fehlende Volumes. Immer Logs zuerst prüfen.
          </p>
        </Callout>

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

        <h2 className="text-xl font-semibold text-white mt-8">Ollama Troubleshooting</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Problem</th>
                <th className="text-left py-2 text-gray-400">Ursache</th>
                <th className="text-left py-2 text-gray-400">Lösung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">GPU nicht erkannt</td>
                <td className="py-2">nvidia-container-toolkit fehlt</td>
                <td className="py-2"><code>nvidia-smi</code> im Container prüfen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">OOM bei großen Modellen</td>
                <td className="py-2">Nicht genug VRAM</td>
                <td className="py-2">Kleineres Modell oder Quantisierung (Q4_K_M)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Connection refused :11434</td>
                <td className="py-2">Ollama bindet nur auf localhost</td>
                <td className="py-2"><code>OLLAMA_HOST=0.0.0.0</code> setzen</td>
              </tr>
              <tr>
                <td className="py-2">Langsame Inferenz</td>
                <td className="py-2">CPU-Fallback statt GPU</td>
                <td className="py-2"><code>ollama ps</code> — prüfen ob GPU genutzt wird</td>
              </tr>
            </tbody>
          </table>
        </div>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Ollama Debug-Befehle
# GPU-Status prüfen
docker exec ollama nvidia-smi

# Laufende Modelle anzeigen
docker exec ollama ollama ps

# Modell-Details (VRAM-Bedarf)
docker exec ollama ollama show llama3.2 --modelfile

# Ollama Logs
docker logs ollama --tail 50

# API Health-Check
curl http://localhost:11434/api/tags`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">n8n Troubleshooting</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Problem</th>
                <th className="text-left py-2 text-gray-400">Ursache</th>
                <th className="text-left py-2 text-gray-400">Lösung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Workflows verschwunden</td>
                <td className="py-2">Volume nicht persistiert</td>
                <td className="py-2">Volume-Mount auf <code>/home/node/.n8n</code> prüfen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Webhook nicht erreichbar</td>
                <td className="py-2">WEBHOOK_URL falsch</td>
                <td className="py-2"><code>N8N_WEBHOOK_URL</code> korrekt setzen</td>
              </tr>
              <tr>
                <td className="py-2">DB-Verbindung fehlgeschlagen</td>
                <td className="py-2">PostgreSQL nicht erreichbar</td>
                <td className="py-2">Netzwerk und <code>DB_POSTGRESDB_HOST</code> prüfen</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Docker und OOM-Kills">
          <p>
            Wenn ein Container plötzlich stoppt ohne Fehlermeldung in den Logs,
            wurde er wahrscheinlich vom Kernel wegen Speichermangel gekillt.
            Prüfe mit <code>docker inspect container_name | grep OOMKilled</code> und
            erhöhe das Memory-Limit oder reduziere die Last.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Checkliste bei Problemen</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>[ ] Logs geprüft?</li>
            <li>[ ] Container läuft?</li>
            <li>[ ] Ports frei?</li>
            <li>[ ] Genug Ressourcen (RAM, VRAM, Disk)?</li>
            <li>[ ] Netzwerk erreichbar?</li>
            <li>[ ] Volumes korrekt gemountet?</li>
            <li>[ ] Environment-Variablen gesetzt?</li>
          </ul>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://docs.docker.com/engine/daemon/logs/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Docker Docs: Logging</a> — Container-Logs konfigurieren und lesen</li>
            <li><a href="https://github.com/ollama/ollama/blob/main/docs/troubleshooting.md" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama Troubleshooting</a> — Offizielle Fehlerbehandlung</li>
            <li><a href="https://docs.n8n.io/hosting/configuration/environment-variables/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Environment Variables</a> — Konfiguration und Debugging</li>
            <li><a href="https://docs.docker.com/engine/swarm/how-swarm-mode-works/services/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Docker Docs: Swarm Services</a> — Service-Debugging im Cluster</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
