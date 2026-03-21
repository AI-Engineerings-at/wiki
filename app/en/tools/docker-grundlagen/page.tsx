import { Metadata } from "next"
import Image from "next/image"
import Callout from "../../../../components/Callout"
import KeyTakeaway from "../../../../components/KeyTakeaway"
import ComparisonTable from "../../../../components/ComparisonTable"

import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Docker Basics: Containers, Compose & Swarm | AI Engineering Wiki",
  description:
    "Understand Docker for AI workloads: Containers vs VMs, Docker Compose for local stacks, Docker Swarm for multi-node deployments. Hands-on guide.",
}

export default function DockerBasicsPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Docker Basics: Containers, Compose &amp; Swarm
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Why containers are the foundation of any local AI infrastructure, how
          Docker Compose works, and when you need Docker Swarm.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 14 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="At a Glance">
          <p>
            Docker packages software into containers — isolated units that run
            the same everywhere. For a local AI stack, Docker is the foundation:
            Ollama, Open WebUI, n8n, Grafana — everything runs in containers.
            Docker Compose orchestrates multiple containers on one machine,
            Docker Swarm distributes them across multiple machines.
          </p>
        </Callout>

        {/* Section 1: What is Docker */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            What is Docker?
          </h2>
          <p className="text-white/70 leading-relaxed">
            Docker is a platform that packages software into containers. A
            container includes everything the software needs — code, runtime,
            system libraries, configuration. Instead of installing &quot;program
            X on operating system Y,&quot; you start a container that brings
            everything with it.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            This solves the classic &quot;it works on my machine&quot; problem:
            containers run on your laptop the same way they run on a server.
          </p>
        </section>

        {/* Section 2: Container vs VM */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Containers vs. Virtual Machines
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Containers and VMs solve similar problems but at different levels.
            Containers are lighter, VMs provide stronger isolation.
          </p>

          <div className="my-6">
            <Image
              src="/images/diagrams/tools-docker-architektur.png"
              alt="Docker Architecture: Containers vs VMs"
              width={800}
              height={450}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              Docker containers share the host kernel, VMs each have their own
              operating system.
            </p>
          </div>

          <ComparisonTable
            headers={["Property", "Container (Docker)", "Virtual Machine"]}
            rows={[
              ["Startup Time", "Seconds", "Minutes"],
              ["Size", "MBs (image)", "GBs (full OS)"],
              ["Isolation", "Process-level (shared kernel)", "Hardware-level (own kernel)"],
              ["Performance", "Near native", "Overhead from hypervisor"],
              ["GPU Access", "NVIDIA Container Toolkit", "GPU Passthrough (IOMMU/PCIe)"],
              ["Use Case", "Services, microservices, AI stacks", "Full OS isolation, Windows on Linux"],
            ]}
          />

          <Callout type="tip" title="When to use what?">
            <p>
              For AI workloads: <strong>Docker containers</strong> for everything
              that needs to start fast and stay lightweight (Ollama, n8n,
              Grafana). <strong>VMs</strong> for hardware isolation (GPU
              passthrough to a dedicated AI VM) or when you need multiple
              operating systems. In practice: combine both — VMs for hosts,
              containers for services.
            </p>
          </Callout>
        </section>

        {/* Section 3: Docker Compose */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Docker Compose: Multiple Containers as a Stack
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Docker Compose defines multi-container applications in a single YAML
            file. Instead of typing 5 separate{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
              docker run
            </code>{" "}
            commands, you write a{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
              docker-compose.yml
            </code>{" "}
            and start everything with one command.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Example: Minimal AI Stack</p>
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
            <p className="text-white font-medium mb-3">Start and Stop</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Start stack (background)
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f ollama

# Stop stack
docker compose down

# Stop stack AND delete volumes (CAUTION: data lost!)
docker compose down -v`}</code>
            </pre>
          </div>

          <Callout type="warning" title="Volumes are your data">
            <p>
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                docker compose down -v
              </code>{" "}
              deletes ALL volumes — all stored models, databases,
              configurations. Without{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                -v
              </code>
              , data is preserved and the next{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                docker compose up
              </code>{" "}
              reuses it.
            </p>
          </Callout>
        </section>

        {/* Section 4: Docker Swarm */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Docker Swarm: Containers Across Multiple Machines
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Docker Swarm turns multiple machines into a cluster. Services run on
            whichever node has capacity. If a node goes down, containers are
            automatically moved to other nodes.
          </p>

          <ComparisonTable
            headers={["Property", "Docker Compose", "Docker Swarm"]}
            rows={[
              ["Hosts", "1 machine", "Multiple machines (cluster)"],
              ["High Availability", "No", "Yes (auto-failover)"],
              ["Rolling Updates", "No", "Yes (zero-downtime)"],
              ["Load Balancing", "No (manual)", "Yes (ingress mesh)"],
              ["Secrets Management", "Environment variables", "Docker Secrets (encrypted)"],
              ["Complexity", "Low", "Medium"],
              ["Recommendation", "Development, small setups", "Production, multiple machines"],
            ]}
          />

          <Callout type="info" title="Compose or Swarm?">
            <p>
              Start with Docker Compose. If you only have one machine, that is
              perfectly sufficient. You only need Docker Swarm when you have
              multiple machines and want to run services with high availability.
              Compose files can be deployed as Swarm stacks with minor
              adjustments.
            </p>
          </Callout>
        </section>

        {/* Section 5: GPU in Docker */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            GPU Access in Docker
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            For AI workloads, containers need GPU access. The NVIDIA Container
            Toolkit makes GPUs available inside Docker.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-white font-medium">Install NVIDIA Drivers</p>
                <p className="text-white/50 text-sm mt-1">
                  NVIDIA drivers must be installed on the host system. On
                  Ubuntu:{" "}
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
                <p className="text-white font-medium">Test</p>
                <pre className="bg-black/30 rounded-lg p-3 mt-2 overflow-x-auto">
                  <code className="text-sm text-green-400">{`docker run --rm --gpus all nvidia/cuda:12.6.0-base-ubuntu24.04 nvidia-smi`}</code>
                </pre>
              </div>
            </div>
          </div>

          <Callout type="warning" title="GPU in Swarm">
            <p>
              Docker Swarm has NO native GPU support for{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                --gpus
              </code>
              . Workaround: Set node labels (e.g.,{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                gpu=rtx3090
              </code>
              ) and pin services via{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                placement constraints
              </code>
              . Additionally, set the NVIDIA runtime as default in{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                /etc/docker/daemon.json
              </code>
              .
            </p>
          </Callout>
        </section>

        {/* Section 6: Practical Tips */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Practical Tips
          </h2>

          <ComparisonTable
            headers={["Situation", "Command", "What it Does"]}
            rows={[
              ["Container not running", "docker compose logs service-name", "Shows error messages of the container"],
              ["Disk full", "docker system prune -a", "Deletes unused images, containers, networks"],
              ["Restart after update", "docker compose pull && docker compose up -d", "Pulls new images and restarts containers"],
              ["Inspect container", "docker exec -it container-name bash", "Opens shell inside running container"],
              ["Check resources", "docker stats", "Shows CPU, RAM, network per container"],
            ]}
          />

          <Callout type="tip" title="Limit Logging">
            <p>
              Docker containers can produce extremely large log files. Set a log
              limit per service in your{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                docker-compose.yml
              </code>
              :{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                logging: options: max-size: &quot;50m&quot;
              </code>
              . Without this limit, we have seen 55 GB log files in practice.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Containers are lighter than VMs — seconds to start instead of minutes, MBs instead of GBs.",
            "Docker Compose defines multi-container stacks in a YAML file. One command starts everything.",
            "Docker Swarm distributes containers across multiple machines with auto-failover. Only needed with 2+ nodes.",
            "GPU in Docker requires the NVIDIA Container Toolkit. In Swarm: node labels + placement constraints.",
            "Volumes are your data. docker compose down -v deletes EVERYTHING. Without -v, data is preserved.",
          ]}
        />

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://docs.docker.com/get-started/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Documentation: Get Started
              </a>{" "}
              — Official Docker introduction
            </li>
            <li>
              <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Compose Documentation
              </a>{" "}
              — docker-compose.yml reference
            </li>
            <li>
              <a href="https://docs.docker.com/engine/swarm/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Swarm Mode
              </a>{" "}
              — Swarm architecture and commands
            </li>
            <li>
              <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/overview.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                NVIDIA Container Toolkit
              </a>{" "}
              — GPU access in Docker containers
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
