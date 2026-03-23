import { CaseStudyBox } from '../../../components/CaseStudyBox'
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Docker Compose vs Docker Swarm | AI Engineering Wiki',
  description:
    'Vergleich Docker Compose vs Docker Swarm für AI-Workloads: Setup, Skalierung, Updates, Observability und was 2026 in Production wirklich zählt.',
}

export default function DockerVsSwarm() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Docker Compose vs Docker Swarm: Welches für AI?</h1>
        <p className="text-gray-400 mt-2">Tools · 6 min</p>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Stand: März 2026</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Docker 27.x</span>
        </div>
      </div>

      <figure className="my-8">
        <img src="/images/generated/hero-docker-container.png" alt="Docker Container Orchestration" className="rounded-xl border border-white/10 w-full" />
        <figcaption className="text-center text-white/40 text-sm mt-2">Docker Container Orchestration</figcaption>
      </figure>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Docker Compose = ein Rechner, schnelles Setup, ideal zum Lernen.
            Docker Swarm = mehrere Rechner, Rolling Updates, High Availability.
            Für Homelab mit einer GPU: Compose. Für Production mit 3+ Nodes: Swarm.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Du willst Ollama, n8n, Grafana und Team-Chat aufsetzen. Jetzt die Frage:
          Docker Compose oder Docker Swarm? Die Antwort bestimmt, wie dein Stack
          skaliert — und ob er 2026 noch funktioniert.
        </p>

        <CaseStudyBox
          tool="Docker Swarm"
          stat="31 Services auf 6 Nodes"
          description="inklusive GPU Workloads, Monitoring und Automatisierung"
          blogLink="/blog/2026-03-08-31-docker-services-monitoring"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Docker Compose in 60 Sekunden</h2>
        <p className="text-gray-300">
          Docker Compose ist der beste Freund jedes Entwicklers. Du schreibst eine 
          <code>docker-compose.yml</code>, definierst deine Services (Ollama, PostgreSQL, 
          Redis, Grafana) und startest mit <code>docker compose up</code>. Alles läuft 
          auf deinem lokalen Rechner oder einem einzelnen Server.
        </p>

        <h3 className="text-lg font-medium text-white mt-4">Wann Compose perfekt ist:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Ein-Maschine-Setups (Laptop, ein physischer Server)</li>
          <li>Entwicklungsumgebungen</li>
          <li>Kleine Hobby-Projekte</li>
          <li>Infrastruktur lernen</li>
          <li>GPU-intensive Workloads (Ollama mit A100 oder 3090)</li>
        </ul>

        <h3 className="text-lg font-medium text-white mt-4">Die Limitation:</h3>
        <p className="text-gray-300">
          Es lebt und stirbt mit deinem einen Host. Wenn deine Maschine abstürzt, 
          geht alles offline. Wenn du Ollama ohne Downtime updaten willst, stoppst du 
          den gesamten Stack. Und wenn du Services über mehrere Maschinen verteilen willst... 
          geht nicht.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/tools-docker-architektur.png" alt="Docker Architektur" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Docker Architektur</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Swarm in 60 Sekunden</h2>
        <p className="text-gray-300">
          Docker Swarm ist die eingebaute Orchestrierungsplattform von Docker. Du 
          clusterst 3+ Maschinen, definierst Manager und Worker, und der Cluster 
          übernimmt den Rest: Service-Scheduling, Load Balancing, Rolling Updates, 
          Service Discovery, High Availability.
        </p>

        <h3 className="text-lg font-medium text-white mt-4">Wann Swarm sinnvoll ist:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Mehrere Server (3+ Maschinen)</li>
          <li>Production-Grade Uptime-Anforderungen</li>
          <li>Rolling Updates ohne Downtime</li>
          <li>Service-Skalierung und Load Balancing</li>
          <li>Infrastruktur, die Node-Ausfälle überlebt</li>
        </ul>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam componentBorderColor #334155
skinparam componentBackgroundColor #0F172A

title Docker Compose vs Docker Swarm

rectangle "Docker Compose" as compose #1E3A5F {
  rectangle "Ein Host" as host1 #0F172A
  rectangle "Ollama" as c_oll #0F172A
  rectangle "n8n" as c_n8n #0F172A
  rectangle "Grafana" as c_graf #0F172A
  rectangle "PostgreSQL" as c_pg #0F172A
  host1 --> c_oll
  host1 --> c_n8n
  host1 --> c_graf
  host1 --> c_pg
}

rectangle "Docker Swarm" as swarm #22543d {
  rectangle "Manager Node" as mgr #1E3A5F
  rectangle "Worker 1\\n(GPU)" as w1 #0F172A
  rectangle "Worker 2" as w2 #0F172A
  rectangle "Worker 3" as w3 #0F172A
  mgr --> w1 : Ollama
  mgr --> w2 : n8n, Grafana
  mgr --> w3 : PostgreSQL
}
@enduml`}
          caption="Compose: alles auf einem Host. Swarm: Services verteilt über mehrere Nodes"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Der direkte Vergleich</h2>

        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mt-4 overflow-x-auto">
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
                <td className="py-2">Setup-Komplexität</td>
                <td className="py-2">5 Minuten</td>
                <td className="py-2">30 Minuten (einmalig)</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2">Multi-Host Support</td>
                <td className="py-2">Nein</td>
                <td className="py-2">Ja (3+ Nodes)</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2">High Availability</td>
                <td className="py-2">Nein (Single Point of Failure)</td>
                <td className="py-2">Ja (Replicas, Manager Quorum)</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2">Rolling Updates</td>
                <td className="py-2">Manuell stop/start</td>
                <td className="py-2">Eingebaut (Zero-Downtime)</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2">Load Balancing</td>
                <td className="py-2">Nein</td>
                <td className="py-2">Ja (Ingress)</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2">Service Discovery</td>
                <td className="py-2">Docker Network</td>
                <td className="py-2">DNS-basiert, Cluster-weit</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2">GPU Passthrough</td>
                <td className="py-2">Einfach</td>
                <td className="py-2">Node Constraints/Labels nötig</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Setup: 3-Node Swarm für AI</h2>
        
        <p className="text-gray-300">
          So läuft unser Stack in Production:
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Infrastruktur</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• 3 Proxmox VMs (je 8 CPU Kerne, 16GB RAM)</li>
            <li>• 3 Manager Nodes (Quorum von 3 — jeder 2. kann ausfallen)</li>
            <li>• Verschlüsseltes Overlay-Netzwerk über alle Nodes</li>
          </ul>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Service Placement</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• <strong>Ollama</strong> gepinnt auf <code>docker-swarm3</code> (GPU Node)</li>
            <li>• <strong>n8n</strong> verteilt über alle Nodes (mit PostgreSQL)</li>
            <li>• <strong>Grafana + Prometheus</strong> auf dem Swarm</li>
            <li>• <strong>PostgreSQL + Redis</strong> auf dedizierten Nodes</li>
            <li>• <strong>Portainer</strong> für visuelle Cluster-Verwaltung</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Was wir gelernt haben</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-4">
          <li>
            <strong>GPU-Pinning ist Pflicht.</strong> Ollama muss auf der Maschine mit 
            GPU-Zugang laufen. In Swarm pinnst du den Service: 
            <code>deploy.placement.constraints: [node.hostname == docker-swarm3]</code>
          </li>
          <li>
            <strong>Quorum von 3 ist Minimum.</strong> Mit 3 Managern kannst du 1 verlieren 
            und der Cluster lebt. Mit 2 kannst du keine Ausfälle tolerieren.
          </li>
          <li>
            <strong>Overlay-Netzwerke brauchen Verständnis.</strong> Jeder Service bekommt 
            seinen eigenen DNS-Namen (z.B. <code>ollama:11434</code>).
          </li>
          <li>
            <strong>Persistent Storage ist der harte Teil.</strong> Docker Volumes funktionieren 
            über Nodes nur mit NFS oder distributed Treibern.
          </li>
          <li>
            <strong>Monitoring wird essentiell.</strong> Mit 3 Nodes brauchst du Prometheus 
            + Grafana für Sichtbarkeit.
          </li>
        </ol>

        <h2 className="text-xl font-semibold text-white mt-8">Wann was nutzen?</h2>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-900 border border-green-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Docker Compose nutzen wenn:</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Eine Maschine. Mehr nicht geplant.</li>
              <li>• Experimentierst. Lernst Ollama, n8n.</li>
              <li>• GPU-nur. Ganzer Stack auf einer 3090.</li>
              <li>• Kein Uptime nötig. Hobby-Projekt.</li>
              <li>• Schnelle Iteration. Wöchentlich Änderungen.</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2">Docker Swarm nutzen wenn:</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• 3+ VMs/Servers. Proxmox Cluster.</li>
              <li>• Production. Replicas, Rolling Updates.</li>
              <li>• Komplexer Stack. 9+ Services.</li>
              <li>• Team-Infrastruktur. Mehrere Nutzer.</li>
              <li>• Langfristig. Läuft für Jahre.</li>
            </ul>
          </div>
        </div>

        <Callout type="tip" title="GPU-Pinning in Swarm">
          <p>
            Ollama muss auf der Node mit GPU laufen. Nutze
            deploy.placement.constraints: [node.hostname == gpu-node] in deiner
            Swarm-Konfiguration. Ohne Pinning landet der Service auf einem
            zufaelligen Node — ohne GPU.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Fazit</h3>
          <p className="text-gray-300">
            Für Self-hosted AI über eine Maschine hinaus ist Docker Swarm die
            minimale viable Orchestrierungsschicht. Es ist nicht Kubernetes (was
            bei 3-20 Nodes Overkill wäre), aber es ist weit besser als manuelles
            Management mit Shell-Skripten.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Docker Docs: Docker Compose</a></li>
            <li><a href="https://docs.docker.com/engine/swarm/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Docker Docs: Swarm Mode Overview</a></li>
            <li><a href="https://docs.docker.com/engine/swarm/services/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Docker Docs: Deploy Services to a Swarm</a></li>
            <li><a href="https://docs.docker.com/compose/how-tos/gpu-support/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Docker Docs: GPU Support in Compose</a></li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/tools/docker-grundlagen" className="text-blue-400 hover:text-blue-300">Docker Grundlagen</a>
          {' · '}
          <a href="/tools/ai-stack-setup" className="text-blue-400 hover:text-blue-300">AI Stack Setup</a>
          {' · '}
          <a href="/tools/grafana-monitoring" className="text-blue-400 hover:text-blue-300">Grafana Monitoring</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
    </div>
  )
}
