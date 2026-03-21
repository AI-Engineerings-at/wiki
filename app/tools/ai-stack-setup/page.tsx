import { Metadata } from "next"
import Image from "next/image"
import Callout from "../../../components/Callout"
import KeyTakeaway from "../../../components/KeyTakeaway"
import ComparisonTable from "../../../components/ComparisonTable"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "AI Stack Setup in 30 Minuten: Ollama + Open WebUI + Docker | AI Engineering Wiki",
  description:
    "Schritt-für-Schritt: Ollama installieren, LLM herunterladen, Open WebUI starten. In 30 Minuten läuft dein eigener AI-Stack lokal.",
}

export default function AiStackSetupPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          AI Stack Setup in 30 Minuten
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Ollama + Open WebUI + Docker: Dein eigener ChatGPT-Klon, lokal auf
          deiner Hardware. Keine Cloud, keine API-Keys, keine monatlichen
          Kosten.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 10 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: März 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            In diesem Tutorial setzt du in 30 Minuten einen lokalen AI-Stack auf:
            Ollama als LLM-Backend, Open WebUI als Chat-Interface, Docker als
            Container-Runtime. Am Ende hast du einen voll funktionsfähigen
            ChatGPT-Klon der auf deiner eigenen Hardware läuft.
          </p>
        </Callout>

        {/* Voraussetzungen */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Voraussetzungen
          </h2>

          <ComparisonTable
            headers={["Was", "Minimum", "Empfohlen"]}
            rows={[
              ["GPU", "8 GB VRAM (7B Modelle)", "24 GB VRAM / RTX 3090 (bis 34B Modelle)"],
              ["RAM", "16 GB", "32 GB"],
              ["Festplatte", "50 GB frei", "200 GB NVMe SSD"],
              ["Betriebssystem", "Windows 10, macOS, Ubuntu 22.04+", "Ubuntu 24.04 LTS"],
              ["Docker", "Docker Desktop (Win/Mac) oder Docker Engine (Linux)", "Docker Engine + NVIDIA Container Toolkit"],
            ]}
          />

          <Callout type="info" title="Keine GPU? Geht auch">
            <p>
              Ollama läuft auch auf der CPU — nur deutlich langsamer. Ein 7B
              Modell auf einer modernen CPU (i7/Ryzen 7) liefert ca. 5-10 tok/s.
              Zum Testen reicht das, für produktive Nutzung brauchst du eine
              GPU.
            </p>
          </Callout>
        </section>

        {/* Schritt 1: Ollama */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Schritt 1: Ollama installieren (5 Minuten)
          </h2>

          <div className="my-6">
            <Image
              src="/images/screenshots/ollama-install.png"
              alt="Ollama Installation"
              width={800}
              height={400}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              Ollama-Installation: Ein Befehl auf Linux, Installer auf Windows/Mac.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Linux / macOS</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Ein-Befehl Installation
curl -fsSL https://ollama.com/install.sh | sh

# Prüfen ob es läuft
ollama --version`}</code>
            </pre>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Windows</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Download von https://ollama.com/download
# Installer ausführen
# Ollama läuft als Hintergrund-Service`}</code>
            </pre>
          </div>
        </section>

        {/* Schritt 2: Modell laden */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Schritt 2: Erstes Modell herunterladen (5-10 Minuten)
          </h2>

          <div className="my-6">
            <Image
              src="/images/screenshots/ollama-pull.png"
              alt="Ollama Pull: Modell herunterladen"
              width={800}
              height={400}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              ollama pull lädt das Modell herunter und speichert es lokal.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Modell herunterladen und testen</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Empfehlung für den Einstieg: Llama 3.3 (8B)
ollama pull llama3.3

# Direkt testen
ollama run llama3.3

# Installierte Modelle anzeigen
ollama list`}</code>
            </pre>
          </div>

          <ComparisonTable
            headers={["Modell", "Größe", "VRAM", "Stärke", "Befehl"]}
            rows={[
              ["Llama 3.3 (8B)", "4.7 GB", "~5 GB", "Schneller Allrounder", "ollama pull llama3.3"],
              ["Mistral Small 3.1 (24B)", "14 GB", "~16 GB", "Starkes Deutsch, übertrifft GPT-4o Mini", "ollama pull mistral-small3.1"],
              ["Qwen3 14B", "9 GB", "~10 GB", "Gutes Reasoning, 100+ Sprachen", "ollama pull qwen3:14b"],
              ["DeepSeek R1 14B", "9 GB", "~10 GB", "Starkes Chain-of-Thought Reasoning", "ollama pull deepseek-r1:14b"],
            ]}
          />

          <Callout type="warning" title="VRAM prüfen">
            <p>
              Wenn das Modell nicht in den VRAM passt, lagert Ollama auf die CPU
              aus — das ist 5-10x langsamer. Prüfen:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                nvidia-smi
              </code>{" "}
              (Linux/Windows) zeigt den freien VRAM. 24 GB GPU: maximal 34B
              Modelle in Q4 Quantisierung. 70B passt NICHT auf 24 GB.
            </p>
          </Callout>

          <div className="my-6">
            <Image
              src="/images/screenshots/ollama-run.png"
              alt="Ollama Run: Chat mit lokalem LLM"
              width={800}
              height={400}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              ollama run startet eine interaktive Chat-Session im Terminal.
            </p>
          </div>
        </section>

        {/* Schritt 3: Open WebUI */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Schritt 3: Open WebUI starten (5 Minuten)
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Terminal-Chat ist OK zum Testen, aber für den Alltag willst du ein
            Web-Interface. Open WebUI sieht aus wie ChatGPT, läuft aber lokal
            und verbindet sich mit deinem Ollama.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Docker Compose (empfohlen)</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# docker-compose.yml erstellen
cat > docker-compose.yml << 'EOF'
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://host.docker.internal:11434
    volumes:
      - open-webui-data:/app/backend/data
    extra_hosts:
      - "host.docker.internal:host-gateway"
    restart: unless-stopped

volumes:
  open-webui-data:
EOF

# Starten
docker compose up -d

# Browser öffnen: http://localhost:3000`}</code>
            </pre>
          </div>

          <Callout type="info" title="Linux: host-gateway">
            <p>
              Auf Linux braucht der Container{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                extra_hosts: host.docker.internal:host-gateway
              </code>{" "}
              um auf den Ollama-Service auf dem Host zuzugreifen. Auf Windows und
              Mac ist{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                host.docker.internal
              </code>{" "}
              automatisch verfügbar.
            </p>
          </Callout>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-white font-medium">Browser öffnen</p>
                <p className="text-white/50 text-sm mt-1">
                  Navigiere zu{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                    http://localhost:3000
                  </code>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="text-white font-medium">Account erstellen</p>
                <p className="text-white/50 text-sm mt-1">
                  Der erste User wird automatisch Admin. E-Mail und Passwort
                  frei wählbar — alles bleibt lokal.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-white font-medium">Modell auswählen und chatten</p>
                <p className="text-white/50 text-sm mt-1">
                  Open WebUI erkennt automatisch alle Modelle die in Ollama
                  installiert sind. Oben das Modell wählen und loschatten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Schritt 4: Verifikation */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Schritt 4: Verifikation (5 Minuten)
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Prüfe ob alles korrekt läuft:
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Ollama API erreichbar?
curl http://localhost:11434/api/tags
# Erwartete Antwort: JSON mit deinen Modellen

# Open WebUI läuft?
curl -I http://localhost:3000
# Erwartete Antwort: HTTP 200

# GPU wird genutzt?
nvidia-smi
# "ollama" sollte unter Processes auftauchen

# Docker Container Status
docker compose ps
# open-webui sollte "Up" sein`}</code>
            </pre>
          </div>

          <Callout type="tip" title="Ollama REST API">
            <p>
              Ollama bietet eine vollständige REST API unter Port 11434. Du
              kannst sie aus jedem Programm, Script oder Workflow ansprechen:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                curl http://localhost:11434/api/chat -d
                &#123;&quot;model&quot;:&quot;llama3.3&quot;,&quot;messages&quot;:[&#123;&quot;role&quot;:&quot;user&quot;,&quot;content&quot;:&quot;Hallo&quot;&#125;]&#125;
              </code>
              . Perfekt für Integration mit n8n, Python-Scripts oder eigene
              Tools.
            </p>
          </Callout>
        </section>

        {/* Nächste Schritte */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Nächste Schritte
          </h2>

          <ComparisonTable
            headers={["Was", "Warum", "Wiki-Artikel"]}
            rows={[
              ["Docker Grundlagen lernen", "Verstehen was unter der Haube passiert", "/tools/docker-grundlagen"],
              ["Mehrere Modelle testen", "Verschiedene Stärken für verschiedene Aufgaben", "/tools/model-selection"],
              ["n8n Workflows bauen", "LLM in automatisierte Prozesse einbinden", "/tools/n8n-für-anfänger"],
              ["Monitoring einrichten", "GPU-Auslastung und Container-Health überwachen", "/tools/grafana-monitoring"],
              ["Security prüfen", "Lokal heisst nicht automatisch sicher", "/security/self-hosted-sicherheit"],
            ]}
          />

          <Callout type="tip" title="Komplett-Anleitung">
            <p>
              Dieses Tutorial deckt den Schnellstart ab. Für eine umfassende
              Anleitung mit Hardware-Empfehlungen, Network Setup, Backup-Strategie
              und Produktionshärtung — unser{" "}
              <a
                href="https://buy.stripe.com/8x28wP7VBbapbdQgs4fQI00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Der Lokale AI-Stack Playbook (EUR 49)
              </a>{" "}
              führt dich durch den gesamten Prozess.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "30 Minuten: Ollama installieren (5 min), Modell laden (10 min), Open WebUI starten (5 min), verifizieren (5 min).",
            "Minimum: 8 GB VRAM für 7B Modelle. Empfohlen: RTX 3090 (24 GB) für bis zu 34B Modelle.",
            "Open WebUI ist ein vollwertiges ChatGPT-Interface — lokal, ohne Cloud, ohne monatliche Kosten.",
            "Ollama REST API (Port 11434) erlaubt Integration in Scripts, n8n Workflows und eigene Anwendungen.",
            "Keine GPU? Geht auch auf CPU, nur langsamer (~5-10 tok/s statt 40-112 tok/s).",
          ]}
        />

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Ollama
              </a>{" "}
              — Lokale LLM-Runtime
            </li>
            <li>
              <a href="https://openwebui.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Open WebUI
              </a>{" "}
              — Self-hosted ChatGPT-Interface
            </li>
            <li>
              <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Compose Documentation
              </a>{" "}
              — Container-Orchestrierung
            </li>
            <li>
              <a href="https://localaimaster.com/blog/best-gpus-for-ai-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                LocalAIMaster: Best GPUs for AI
              </a>{" "}
              — GPU Inference Benchmarks (tok/s)
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
