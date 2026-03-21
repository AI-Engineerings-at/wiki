import { Metadata } from 'next'
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata: Metadata = {
  title: 'Model Selection Guide | AI Engineering Wiki',
  description: 'Wähle das richtige AI-Modell für deinen Anwendungsfall — von Llama bis Mistral.',
}

export default function ModelSelectionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Model Selection Guide</h1>
        <p className="text-gray-400 mt-2">
          Wähle das richtige AI-Modell für deinen Anwendungsfall.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <figure className="my-8">
          <img src="/images/diagrams/tools-model-entscheidungsbaum.png" alt="Modell-Entscheidungsbaum — Welches AI-Modell für welchen Use Case" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Modell-Entscheidungsbaum: So findest du das richtige AI-Modell</figcaption>
        </figure>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title Modell-Entscheidungsbaum

start
if (VRAM verfügbar?) then (< 8 GB)
  :Small Models\\n(1-3B Parameter);
  :Gemma 2 2B\\nPhi-3.5 Mini;
elseif (8-16 GB) then
  :Medium Models\\n(7-14B Parameter);
  :Llama 3.3 8B\\nQwen3 14B;
elseif (16-24 GB) then
  :Large Models\\n(24-34B Parameter);
  :Mistral Small 3.1 24B\\nQwen 2.5 32B;
else (48 GB+)
  :XL Models\\n(70B Parameter);
  :Llama 3.3 70B;
endif

if (Deutsch wichtig?) then (ja)
  :Mistral Small 3.1\\noder Qwen3 14B;
else (nein)
endif

if (Komplexes Reasoning?) then (ja)
  :Cloud API empfohlen\\n(Claude, GPT-4o);
else (nein)
  :Lokal reicht aus;
endif
stop
@enduml`}
          caption="Entscheidungsbaum: VRAM bestimmt Modellgröße, Sprache und Reasoning bestimmen lokal vs. Cloud"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Die Entscheidung</h2>
        <p className="text-gray-300">
          Die Wahl des richtigen Modells ist der wichtigste technische Entschluss.
          Falsches Modell = schlechte Ergebnisse oder unnötige Kosten.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Modell-Kategorien</h2>

        <h3 className="text-lg font-semibold text-white mt-6">1. Small Models (1-3B Parameter)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>Beispiele:</strong> Llama 3.2 1B/3B, Gemma 2 2B, Phi-3.5 Mini</li>
          <li><strong>Hardware:</strong> CPU reicht, 4-6GB RAM</li>
          <li><strong>Latenz:</strong> &lt;100ms</li>
          <li><strong>Use Cases:</strong> Embeddings, Klassifikation, einfache Q&amp;A</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">2. Medium Models (7-14B Parameter)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>Beispiele:</strong> Llama 3.3 8B, Qwen3 14B, Gemma 2 9B</li>
          <li><strong>Hardware:</strong> 16GB RAM, GPU empfohlen (8-16GB VRAM)</li>
          <li><strong>Speed:</strong> 43-112 tok/s auf RTX 3090</li>
          <li><strong>Use Cases:</strong> Chat, Zusammenfassungen, Code-Generation, Tool Calling</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">3. Large Models (24B-34B Parameter)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>Beispiele:</strong> Mistral Small 3.1 (24B), Qwen 2.5 32B</li>
          <li><strong>Hardware:</strong> 24GB VRAM (RTX 3090/4090)</li>
          <li><strong>Speed:</strong> ~20-30 tok/s auf RTX 3090</li>
          <li><strong>Use Cases:</strong> Komplexe Reasoning, lange Dokumente, höchste lokale Qualität</li>
          <li><strong>Hinweis:</strong> 70B Modelle passen NICHT auf 24 GB VRAM — brauchen 48 GB+ oder Multi-GPU</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">4. Top Open Source (S-Tier, März 2026)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>GLM-5 (Z AI):</strong> Reasoning-Spezialist, GPQA Diamond 86%, HumanEval 90%, SWE-bench 77.8%</li>
          <li><strong>Kimi K2.5 (Moonshot AI):</strong> HumanEval 99%, AIME 96.1%, SWE-bench 76.8% — S-Tier</li>
          <li><strong>MiniMax M2.5:</strong> S-Tier im Artificial Analysis Leaderboard</li>
          <li><strong>Qwen 3.5 Plus:</strong> MMLU 88.4%, ~1/13 der Kosten von Claude Sonnet</li>
        </ul>

        <figure className="my-8">
          <img src="/images/infographics/tools-model-selection-vergleich.png" alt="Model Selection Vergleich — Parameter, Context, RAM, Qualität" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Modell-Vergleich: Parameter, Context-Window, RAM-Bedarf und Qualität</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Vergleichstabelle (Stand März 2026)</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 text-gray-400">Modell</th>
              <th className="py-2 text-gray-400">Parameter</th>
              <th className="py-2 text-gray-400">VRAM (Q4)</th>
              <th className="py-2 text-gray-400">tok/s (RTX 3090)</th>
              <th className="py-2 text-gray-400">Stärke</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800">
              <td className="py-2">Gemma 2 2B</td>
              <td className="py-2">2B</td>
              <td className="py-2">~2 GB</td>
              <td className="py-2">200+</td>
              <td className="py-2">Embeddings, Klassifikation</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Llama 3.3 8B</td>
              <td className="py-2">8B</td>
              <td className="py-2">~5 GB</td>
              <td className="py-2">~112</td>
              <td className="py-2">Allrounder, schnell</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Qwen3 14B</td>
              <td className="py-2">14B</td>
              <td className="py-2">~10 GB</td>
              <td className="py-2">43.2</td>
              <td className="py-2">Deutsch, multilingual</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Mistral Small 3.1</td>
              <td className="py-2">24B</td>
              <td className="py-2">~16 GB</td>
              <td className="py-2">~30</td>
              <td className="py-2">Deutsch (übertrifft GPT-4o Mini)</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Qwen 2.5 32B</td>
              <td className="py-2">32B</td>
              <td className="py-2">~20 GB</td>
              <td className="py-2">~20</td>
              <td className="py-2">Coding, Reasoning</td>
            </tr>
            <tr>
              <td className="py-2">Llama 3.3 70B</td>
              <td className="py-2">70B</td>
              <td className="py-2">~40 GB</td>
              <td className="py-2">Braucht 48 GB+</td>
              <td className="py-2">MMLU 86%, HumanEval 88.4%</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
          <p className="text-blue-300 text-sm">
            <strong>Deutsch-Tipp:</strong> Mistral Small 3.1 (24B) übertrifft GPT-4o Mini
            und Gemma 3 bei europäischen Sprachen — ideal für deutschsprachige
            Chat- und Content-Tasks auf lokaler Hardware.
          </p>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/tools-model-vram.png" alt="VRAM-Anforderungen pro Modell — GPU-Speicher Übersicht" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">VRAM-Anforderungen: Wie viel GPU-Speicher jedes Modell braucht</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Hardware-Anforderungen mit Ollama</h2>

        <p className="text-gray-300 mt-4">
          Hier ist, was du brauchst um die Modelle lokal zu betreiben:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Ollama Modelle laden und testen
ollama pull llama3.2

# Modelle auflisten
ollama list

# Mit Modell chatten
ollama run llama3.2 "Hallo, wer bist du?"

# Hardware check
ollama run llama3.2 "Wie viel RAM hast du verwendet?"`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Typische RAM-Belastung bei Ollama:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# VRAM Verbrauch (ca., Q4 quantisiert)
gemma2:2b           ~2GB VRAM   → 200+ tok/s
llama3.3:8b         ~5GB VRAM   → ~112 tok/s
qwen3:14b          ~10GB VRAM   → 43 tok/s
mistral-small3.1:24b ~16GB VRAM  → ~30 tok/s
qwen2.5:32b        ~20GB VRAM   → ~20 tok/s
llama3.3:70b       ~40GB VRAM   → PASST NICHT auf 24GB GPU!

# RTX 3090 (24 GB): Maximum ist ca. 34B (Q4_K_M)
# 70B braucht 48 GB+ (2x RTX 3090 oder RTX 6000 Ada)

# Mit quantized Modellen sparen
ollama pull llama3.3:q4_K_M   # 4-bit Quantisierung, ~5GB
ollama pull qwen3:14b         # 4-bit default, ~10GB`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Entscheidungshilfe</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>Budget gespart?</strong> → Llama 3.3 8B oder Qwen 2.5 7B (~112 tok/s auf RTX 3090)</li>
          <li><strong>Maximale lokale Qualität?</strong> → Mistral Small 3.1 24B oder Qwen 2.5 32B (passt auf 24 GB)</li>
          <li><strong>Schnelle Embeddings?</strong> → mxbai-embed-large (1024 dim)</li>
          <li><strong>Deutsch?</strong> → Mistral Small 3.1 (übertrifft GPT-4o Mini) oder Qwen3 14B</li>
          <li><strong>Absolut beste Qualität?</strong> → Cloud API: Claude Sonnet 4.5, GPT-4o oder Gemini 2.5 Pro</li>
          <li><strong>Open Source S-Tier?</strong> → GLM-5, Kimi K2.5, MiniMax M2.5 (brauchen grosse GPU oder Cloud-Hosting)</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Stack</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Wir nutzen (Stand März 2026):
# - mistral-small3.2:24b auf RTX 3090 (.90) für Chat/Code (stark bei Deutsch)
# - mxbai-embed-large auf RTX 2060 (.99) für Embeddings (1024 dim)
# - Cloud API (Claude Sonnet 4.5) für komplexes Reasoning

# docker-compose.yml Auszug
services:
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

# Environment Variables
OLLAMA_HOST=0.0.0.0:11434
OLLAMA_MODELS=/root/.ollama/models`}</code>
        </pre>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://artificialanalysis.ai/leaderboards/models" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Artificial Analysis LLM Leaderboard, März 2026</a> — Intelligence Index, 312 Modelle, Updates alle 72h</li>
            <li><a href="https://onyx.app/open-llm-leaderboard" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Onyx Open LLM Leaderboard</a> — Kimi K2.5 HumanEval 99%, AIME 96.1%</li>
            <li><a href="https://vellum.ai/blog/llama-3-3-70b-vs-gpt-4o" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Vellum: Llama 3.3 70B vs GPT-4o</a> — MMLU, HumanEval, IFEval Benchmarks</li>
            <li><a href="https://mistral.ai/news/mistral-small-3-1" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mistral AI: Mistral Small 3.1</a> — Übertrifft GPT-4o Mini bei europäischen Sprachen</li>
            <li><a href="https://localaimaster.com/blog/best-gpus-for-ai-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LocalAIMaster: Best GPUs for AI</a> — RTX 3090 tok/s Messwerte</li>
            <li><a href="https://corelab.tech/llmgpu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CoreLab: LLM GPU Benchmarks</a> — 8B ~112 tok/s auf RTX 3090</li>
            <li><a href="https://intuitionlabs.ai/articles/local-llm-deployment-24gb-gpu-optimization" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">IntuitionLabs: 24GB GPU Optimization</a> — Max ~34B auf 24 GB VRAM</li>
            <li><a href="https://ollama.com/library" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama Model Library</a> — Verfügbare Modelle und Quantisierungen</li>
            <li><a href="https://lmarena.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LMSYS Chatbot Arena</a> — Community-basiertes Modell-Ranking</li>
          </ul>
        </section>
      </div>
    </div>
  )
}