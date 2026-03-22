import { CaseStudyBox } from '../../../components/CaseStudyBox'
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Ollama Tutorial | AI Engineering Wiki',
  description:
    'Ollama Tutorial: lokale LLMs installieren, Modelle auswählen, API nutzen und in deinen lokalen, DSGVO-konformen AI-Stack integrieren.',
}

export default function OllamaTutorial() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Ollama: Lokale LLMs einfach gemacht</h1>
        <p className="text-gray-400 mt-2">Tools · 8 min</p>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Stand: März 2026</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Ollama 0.5.x</span>
        </div>
      </div>

      <figure className="my-8">
        <img src="/images/generated/hero-ollama-local-ai.png" alt="Lokale KI mit Ollama" className="rounded-xl border border-white/10 w-full" />
        <figcaption className="text-center text-white/40 text-sm mt-2">Lokale KI mit Ollama</figcaption>
      </figure>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Ollama ist ein CLI-Tool für lokale LLMs. Installation in 5 Minuten,
            200+ Modelle verfügbar, REST API auf Port 11434. Keine Cloud noetig,
            keine API-Kosten, DSGVO-konform. Für den Einstieg reicht eine GPU
            mit 6 GB VRAM.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Ollama macht lokale Large Language Models zugänglich. Keine Cloud, keine API-Kosten,
          keine Daten, die irgendwohin fließen. In 5 Minuten hast du deinen eigenen AI-Chat
          auf deiner Hardware laufen.
        </p>

        <CaseStudyBox
          tool="Ollama"
          stat="3 Instanzen (RTX 3090, RTX 2060, CPU)"
          description="mit automatischem 3-Level Fallback und OOM-Detection"
          blogLink="/blog/2026-03-08-dsgvo-konformer-ai-stack"
        />

        <figure className="my-8">
          <img src="/images/infographics/ollama-stack.png" alt="Ollama Stack Architektur — CLI, API und Modelle" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Ollama Stack: Von der Installation bis zum produktiven Einsatz mit API und WebUI</figcaption>
        </figure>

        <figure className="my-8">
          <img src="/images/diagrams/tools-ollama-architektur.png" alt="Ollama Architektur — CLI, REST API, GPU und Modell-Management" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Ollama Architektur: Wie CLI, REST API und GPU zusammenspielen</figcaption>
        </figure>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A
skinparam componentBorderColor #334155
skinparam componentBackgroundColor #0F172A

title Ollama Setup und Architektur

rectangle "Benutzer" as user
rectangle "CLI\\nollama run" as cli #0F172A
rectangle "REST API\\nlocalhost:11434" as api #0F172A
rectangle "Ollama Server" as server #1E3A5F
rectangle "Modell-Registry\\n(ollama.com/library)" as registry #0F172A
rectangle "GPU\\n(NVIDIA CUDA)" as gpu #22543d
rectangle "Modell-Speicher\\n~/.ollama/models" as storage #0F172A

user --> cli : Chat
user --> api : HTTP Requests
cli --> server
api --> server
server --> gpu : Inferenz
server --> storage : Modelle laden
registry --> storage : ollama pull
@enduml`}
          caption="Ollama Architektur: CLI und REST API kommunizieren mit dem Server, der GPU und Modelle verwaltet"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Was ist Ollama?</h2>
        <p className="text-gray-300">
          Ollama ist ein CLI-Tool, um LLMs lokal zu betreiben. Unterstützt 200+ Modelle
          (Llama, Mistral, Qwen, Gemma, etc.) und läuft auf macOS (mit Metal GPU-Beschleunigung),
          Linux und Windows (nativ oder via WSL2).
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Unterstuetzte Modelle (Auswahl)</h3>
          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
            <div>
              <p className="text-white font-medium">Llama 3.3</p>
              <p className="text-gray-500">8B, 70B — Text, Code, Tool Calling</p>
            </div>
            <div>
              <p className="text-white font-medium">Mistral Small 3.2</p>
              <p className="text-gray-500">24B — Schnell, multilingual, 128K Context</p>
            </div>
            <div>
              <p className="text-white font-medium">Qwen 2.5</p>
              <p className="text-gray-500">0.5B bis 72B — Stark multilingual, Coding</p>
            </div>
            <div>
              <p className="text-white font-medium">Gemma 2</p>
              <p className="text-gray-500">2B, 9B, 27B — Google, effizient</p>
            </div>
            <div>
              <p className="text-white font-medium">Phi-3.5</p>
              <p className="text-gray-500">3.8B — Klein, aber schlau</p>
            </div>
            <div>
              <p className="text-white font-medium">mxbai-embed-large</p>
              <p className="text-gray-500">335M — Embeddings, 1024 Dimensionen</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Installation</h2>

        <figure className="my-8">
          <img src="/images/screenshots/ollama-install.png" alt="Ollama Installation im Terminal" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Ollama Installation: Ein Befehl genügt</figcaption>
        </figure>

        <h3 className="text-lg font-medium text-white mt-4">macOS</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">brew install ollama</code>
        </pre>

        <h3 className="text-lg font-medium text-white mt-4">Linux/WSL2</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">curl -fsSL https://ollama.com/install.sh | sh</code>
        </pre>

        <h3 className="text-lg font-medium text-white mt-4">Docker (unsere Empfehlung)</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`docker run -d \\
  --name ollama \\
  -v ollama_data:/root/.ollama \\
  -p 11434:11434 \\
  ollama/ollama:latest`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Modelle herunterladen</h2>

        <p className="text-gray-300">
          Das erste Model wird beim Start automatisch heruntergeladen. Du kannst
          auch explizit Modelle vorladen:
        </p>

        <figure className="my-8">
          <img src="/images/screenshots/ollama-pull.png" alt="ollama pull — Modell herunterladen" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">ollama pull: Modelle mit einem Befehl herunterladen</figcaption>
        </figure>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Modell herunterladen
ollama pull llama3.2

# Verfügbare Modelle anzeigen
ollama list

# Modell-Info anzeigen
ollama show llama3.2`}</code>
        </pre>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Empfohlene Starter-Modelle</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Modell</th>
                <th className="text-left py-2 text-gray-400">Größe</th>
                <th className="text-left py-2 text-gray-400">VRAM</th>
                <th className="text-left py-2 text-gray-400">Use Case</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">gemma2:2b</td>
                <td className="py-2">1.6 GB</td>
                <td className="py-2">~4 GB</td>
                <td className="py-2">Schnell, Einsteiger</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">llama3.3:8b</td>
                <td className="py-2">4.7 GB</td>
                <td className="py-2">~6 GB</td>
                <td className="py-2">Allrounder, Tool Calling</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">qwen2.5:14b</td>
                <td className="py-2">8.9 GB</td>
                <td className="py-2">~12 GB</td>
                <td className="py-2">Coding, multilingual</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">mistral-small3.2:24b</td>
                <td className="py-2">14 GB</td>
                <td className="py-2">~16 GB</td>
                <td className="py-2">Chat, Reasoning, 128K Context</td>
              </tr>
              <tr>
                <td className="py-2">mxbai-embed-large</td>
                <td className="py-2">0.7 GB</td>
                <td className="py-2">~2 GB</td>
                <td className="py-2">Embeddings (RAG)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Ollama nutzen</h2>

        <h3 className="text-lg font-medium text-white mt-4">Interaktiver Chat</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">ollama run llama3.2</code>
        </pre>

        <figure className="my-8">
          <img src="/images/screenshots/ollama-run.png" alt="ollama run — Interaktiver Chat im Terminal" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">ollama run: Interaktiver Chat direkt im Terminal</figcaption>
        </figure>

        <h3 className="text-lg font-medium text-white mt-4">REST API</h3>
        <p className="text-gray-300 mt-2">
          Ollama bietet eine REST API auf Port 11434:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Chat
curl -X POST http://localhost:11434/api/chat \\
  -d '{
    "model": "llama3.2",
    "messages": [
      { "role": "user", "content": "Hallo!" }
    ]
  }'

# Generate (einzelne Antwort)
curl -X POST http://localhost:11434/api/generate \\
  -d '{
    "model": "llama3.2",
    "prompt": "Was ist Docker?"
  }'`}</code>
        </pre>

        <figure className="my-8">
          <img src="/images/screenshots/ollama-api.png" alt="Ollama REST API — curl Beispiel" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Ollama REST API: Chat und Generate Endpoints auf localhost:11434</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">GPU-Konfiguration</h2>

        <p className="text-gray-300">
          Ollama nutzt automatisch verfügbare GPUs. Für Docker muss die GPU 
          durchgeschleift werden:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# NVIDIA GPU
docker run -d --gpus all \\
  --name ollama \\
  -v ollama_data:/root/.ollama \\
  -p 11434:11434 \\
  ollama/ollama:latest

# Oder mit docker-compose.yml
services:
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Docker Swarm Setup</h2>

        <p className="text-gray-300">
          In unserem 3-Node Swarm läuft Ollama auf der GPU-Node (docker-swarm3):
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`services:
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]
      placement:
        constraints:
          - node.hostname == docker-swarm3
    networks:
      - ai-network`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Web Interface: Open WebUI</h2>

        <p className="text-gray-300">
          Für ein ChatGPT-ähnliches Interface nutzen wir Open WebUI:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`services:
  open-webui:
    image: open-webui/open-webui:main
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes:
      - open-webui_data:/app/backend/data
    depends_on:
      - ollama
    networks:
      - ai-network`}</code>
        </pre>

        <Callout type="tip" title="GPU-Tipp">
          <p>
            Für Modelle bis 8B reicht eine GPU mit 6-8 GB VRAM (z.B. RTX 3060).
            Für 14B-24B Modelle brauchst du mindestens 12-16 GB (RTX 3080/3090).
            CPU-only geht auch, ist aber deutlich langsamer.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Nächste Schritte</h3>
          <ul className="text-gray-300 space-y-1">
            <li>• <strong>RAG aufsetzen:</strong>{" "}
              <a href="/tools/rag-guide" className="text-blue-400 hover:underline">RAG Complete Guide →</a>
            </li>
            <li>• <strong>Modelle vergleichen:</strong> Mehrere Modelle parallel testen</li>
            <li>• <strong>Monitoring:</strong> Prometheus Metriken aktivieren</li>
          </ul>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama — Offizielle Website</a></li>
            <li><a href="https://github.com/ollama/ollama" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: ollama/ollama</a> — Source Code und Dokumentation</li>
            <li><a href="https://ollama.com/library" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama Model Library</a> — Alle verfügbaren Modelle</li>
            <li><a href="https://github.com/open-webui/open-webui" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: Open WebUI</a> — ChatGPT-aehnliches Interface für Ollama</li>
            <li><a href="https://huggingface.co/docs/hub/ollama" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Hugging Face: Ollama mit GGUF-Modellen</a> — GGUF-Modelle direkt von Hugging Face in Ollama nutzen</li>
            <li><a href="https://huggingface.co/docs/transformers/index" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Hugging Face Transformers Dokumentation</a> — Offizielle Dokumentation der Transformers-Bibliothek</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
