import { Metadata } from "next"
import Image from "next/image"
import Callout from "../../../components/Callout"
import KeyTakeaway from "../../../components/KeyTakeaway"
import ComparisonTable from "../../../components/ComparisonTable"

import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Docker Grundlagen: Container, Compose & Swarm | AI Engineering Wiki",
  description:
    "Docker fuer AI-Workloads verstehen: Container vs VMs, Docker Compose fuer lokale Stacks, Docker Swarm fuer Multi-Node Deployments. Praxisnah erklaert.",
}

export default function DockerGrundlagenPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Docker Grundlagen: Container, Compose &amp; Swarm
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Warum Container die Basis jeder lokalen AI-Infrastruktur sind, wie
          Docker Compose funktioniert und wann du Docker Swarm brauchst.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 14 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: Maerz 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Docker packt Software in Container — isolierte Einheiten, die
            ueberall gleich laufen. Fuer einen lokalen AI-Stack ist Docker die
            Grundlage: Ollama, Open WebUI, n8n, Grafana — alles laeuft in
            Containern. Docker Compose orchestriert mehrere Container auf einem
            Rechner, Docker Swarm verteilt sie auf mehrere.
          </p>
        </Callout>

        {/* Section 1: Was ist Docker */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Was ist Docker?
          </h2>
          <p className="text-white/70 leading-relaxed">
            Docker ist eine Plattform, die Software in Container verpackt. Ein
            Container enthaelt alles was die Software braucht — Code,
            Laufzeit-Umgebung, System-Bibliotheken, Konfiguration. Du
            installierst nicht mehr &quot;Programm X auf Betriebssystem Y&quot;
            sondern startest einen Container, der alles mitbringt.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Das loest das klassische Problem &quot;bei mir funktioniert es
            aber&quot;: Container laufen auf deinem Laptop genauso wie auf
            einem Server.
          </p>
        </section>

        {/* Section 2: Container vs VM */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Container vs. Virtuelle Maschinen
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Container und VMs loesen aehnliche Probleme, aber auf verschiedenen
            Ebenen. Container sind leichtgewichtiger, VMs sind staerker isoliert.
          </p>

          <div className="my-6">
            <Image
              src="/images/diagrams/tools-docker-architektur.png"
              alt="Docker Architektur: Container vs VMs"
              width={800}
              height={450}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              Docker Container teilen sich den Host-Kernel, VMs haben jeweils
              ein eigenes Betriebssystem.
            </p>
          </div>

          <ComparisonTable
            headers={["Eigenschaft", "Container (Docker)", "Virtuelle Maschine"]}
            rows={[
              [
                "Startzeit",
                "Sekunden",
                "Minuten",
              ],
              [
                "Groesse",
                "MBs (Image)",
                "GBs (volles OS)",
              ],
              [
                "Isolation",
                "Prozess-Level (Kernel geteilt)",
                "Hardware-Level (eigener Kernel)",
              ],
              [
                "Performance",
                "Nahezu nativ",
                "Overhead durch Hypervisor",
              ],
              [
                "GPU-Zugriff",
                "NVIDIA Container Toolkit",
                "GPU-Passthrough (IOMMU/PCIe)",
              ],
              [
                "Anwendungsfall",
                "Services, Microservices, AI-Stacks",
                "Komplette OS-Isolation, Windows auf Linux",
              ],
            ]}
          />

          <Callout type="tip" title="Wann was?">
            <p>
              Fuer AI-Workloads: <strong>Docker Container</strong> fuer alles
              was schnell starten und leichtgewichtig sein soll (Ollama, n8n,
              Grafana). <strong>VMs</strong> fuer Hardware-Isolation (GPU
              Passthrough an eine dedizierte AI-VM) oder wenn du mehrere
              Betriebssysteme brauchst. In der Praxis: beides kombinieren — VMs
              fuer die Hosts, Container fuer die Services.
            </p>
          </Callout>
        </section>

        {/* Section 3: Docker Compose */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Docker Compose: Mehrere Container als Stack
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Docker Compose definiert Multi-Container-Anwendungen in einer
            einzigen YAML-Datei. Statt 5 separate{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
              docker run
            </code>{" "}
            Befehle zu tippen, schreibst du eine{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
              docker-compose.yml
            </code>{" "}
            und startest alles mit einem Befehl.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Beispiel: Minimaler AI-Stack</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# docker-compose.yml
services:
  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama-data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama

volumes:
  ollama-data:`}</code>
            </pre>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Starten und Stoppen</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Stack starten (im Hintergrund)
docker compose up -d

# Status pruefen
docker compose ps

# Logs ansehen
docker compose logs -f ollama

# Stack stoppen
docker compose down

# Stack stoppen UND Volumes loeschen (ACHTUNG: Daten weg!)
docker compose down -v`}</code>
            </pre>
          </div>

          <Callout type="warning" title="Volumes sind deine Daten">
            <p>
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                docker compose down -v
              </code>{" "}
              loescht ALLE Volumes — also alle gespeicherten Modelle, Datenbanken,
              Konfigurationen. Ohne{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                -v
              </code>{" "}
              bleiben die Daten erhalten und der naechste{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                docker compose up
              </code>{" "}
              nutzt sie weiter.
            </p>
          </Callout>
        </section>

        {/* Section 4: Docker Swarm */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Docker Swarm: Container ueber mehrere Rechner
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Docker Swarm macht aus mehreren Rechnern einen Cluster. Services
            laufen auf dem Node, der gerade Kapazitaet hat. Faellt ein Node aus,
            werden die Container automatisch auf andere Nodes verschoben.
          </p>

          <ComparisonTable
            headers={["Eigenschaft", "Docker Compose", "Docker Swarm"]}
            rows={[
              ["Hosts", "1 Rechner", "Mehrere Rechner (Cluster)"],
              ["High Availability", "Nein", "Ja (Auto-Failover)"],
              ["Rolling Updates", "Nein", "Ja (Zero-Downtime)"],
              ["Load Balancing", "Nein (manuell)", "Ja (Ingress Mesh)"],
              ["Secrets Management", "Umgebungsvariablen", "Docker Secrets (verschluesselt)"],
              ["Komplexitaet", "Niedrig", "Mittel"],
              ["Empfehlung", "Entwicklung, kleine Setups", "Produktion, mehrere Rechner"],
            ]}
          />

          <Callout type="info" title="Compose oder Swarm?">
            <p>
              Starte mit Docker Compose. Wenn du nur einen Rechner hast, reicht
              das voellig. Docker Swarm brauchst du erst wenn du mehrere Rechner
              hast und Services ausfallsicher betreiben willst. Die
              Compose-Dateien lassen sich mit kleinen Anpassungen als Swarm
              Stacks deployen.
            </p>
          </Callout>
        </section>

        {/* Section 5: GPU in Docker */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            GPU-Zugriff in Docker
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Fuer AI-Workloads brauchen Container GPU-Zugriff. Das NVIDIA
            Container Toolkit macht GPUs in Docker verfuegbar.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-white font-medium">NVIDIA Treiber installieren</p>
                <p className="text-white/50 text-sm mt-1">
                  Auf dem Host-System muessen die NVIDIA-Treiber installiert sein.
                  In Ubuntu:{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                    sudo apt install nvidia-driver-550
                  </code>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="text-white font-medium">NVIDIA Container Toolkit</p>
                <pre className="bg-black/30 rounded-lg p-3 mt-2 overflow-x-auto">
                  <code className="text-sm text-green-400">{`# Installation (Ubuntu/Debian)
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \\
  | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker`}</code>
                </pre>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-white font-medium">Testen</p>
                <pre className="bg-black/30 rounded-lg p-3 mt-2 overflow-x-auto">
                  <code className="text-sm text-green-400">{`docker run --rm --gpus all nvidia/cuda:12.6.0-base-ubuntu24.04 nvidia-smi`}</code>
                </pre>
              </div>
            </div>
          </div>

          <Callout type="warning" title="GPU in Swarm">
            <p>
              Docker Swarm hat KEINE native GPU-Unterstuetzung fuer{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                --gpus
              </code>
              . Workaround: Node Labels setzen (z.B.{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                gpu=rtx3090
              </code>
              ) und Services per{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                placement constraints
              </code>{" "}
              auf GPU-Nodes pinnen. Zusaetzlich das NVIDIA Runtime als Default
              in{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                /etc/docker/daemon.json
              </code>{" "}
              setzen.
            </p>
          </Callout>
        </section>

        {/* Section 6: Praxis-Tipps */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Praxis-Tipps fuer den Alltag
          </h2>

          <ComparisonTable
            headers={["Situation", "Befehl", "Was es tut"]}
            rows={[
              [
                "Container laeuft nicht",
                "docker compose logs service-name",
                "Zeigt Fehlermeldungen des Containers",
              ],
              [
                "Disk voll",
                "docker system prune -a",
                "Loescht ungenutzte Images, Container, Netzwerke",
              ],
              [
                "Neustart nach Update",
                "docker compose pull && docker compose up -d",
                "Zieht neue Images und startet Container neu",
              ],
              [
                "In Container schauen",
                "docker exec -it container-name bash",
                "Oeffnet Shell im laufenden Container",
              ],
              [
                "Ressourcen pruefen",
                "docker stats",
                "Zeigt CPU, RAM, Netzwerk pro Container",
              ],
            ]}
          />

          <Callout type="tip" title="Logging begrenzen">
            <p>
              Docker-Container koennen extrem grosse Logfiles erzeugen. Setze in
              der{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                docker-compose.yml
              </code>{" "}
              pro Service ein Log-Limit:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                logging: options: max-size: &quot;50m&quot;
              </code>
              . Ohne dieses Limit haben wir in der Praxis schon 55 GB Logfiles
              gesehen.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Container sind leichtgewichtiger als VMs — Sekunden statt Minuten zum Starten, MBs statt GBs.",
            "Docker Compose definiert Multi-Container-Stacks in einer YAML-Datei. Ein Befehl startet alles.",
            "Docker Swarm verteilt Container auf mehrere Rechner mit Auto-Failover. Brauchst du erst ab 2+ Nodes.",
            "GPU in Docker braucht das NVIDIA Container Toolkit. In Swarm: Node Labels + Placement Constraints.",
            "Volumes sind deine Daten. docker compose down -v loescht ALLES. Ohne -v bleiben Daten erhalten.",
          ]}
        />

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://docs.docker.com/get-started/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Documentation: Get Started
              </a>{" "}
              — Offizielle Einfuehrung in Docker
            </li>
            <li>
              <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Compose Documentation
              </a>{" "}
              — Referenz fuer docker-compose.yml
            </li>
            <li>
              <a href="https://docs.docker.com/engine/swarm/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Swarm Mode
              </a>{" "}
              — Swarm-Architektur und Befehle
            </li>
            <li>
              <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/overview.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                NVIDIA Container Toolkit
              </a>{" "}
              — GPU-Zugriff in Docker-Containern
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
