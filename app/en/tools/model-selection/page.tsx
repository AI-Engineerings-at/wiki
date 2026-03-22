export const metadata = {
  title: 'Model Selection Guide | AI Engineering Wiki',
  description: 'Choose the right AI model for your use case — from Llama to Mistral.',
}

export default function ModelSelectionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Model Selection Guide</h1>
        <p className="text-gray-400 mt-2">
          Choose the right AI model for your use case.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <figure className="my-8">
          <img src="/images/diagrams/tools-model-entscheidungsbaum.png" alt="Model Decision Tree — Which AI model for which use case" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Model Decision Tree: How to find the right AI model</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">The Decision</h2>
        <p className="text-gray-300">
          Choosing the right model is the most important technical decision.
          Wrong model = bad results or unnecessary costs.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Model Categories</h2>

        <h3 className="text-lg font-semibold text-white mt-6">1. Small Models (1-3B Parameters)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>Examples:</strong> Llama 3.2 1B/3B, Gemma 2 2B, Phi-3.5 Mini</li>
          <li><strong>Hardware:</strong> CPU is sufficient, 4-6GB RAM</li>
          <li><strong>Latency:</strong> &lt;100ms</li>
          <li><strong>Use Cases:</strong> Embeddings, classification, simple Q&amp;A</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">2. Medium Models (7-14B Parameters)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>Examples:</strong> Llama 3.3 8B, Qwen3 14B, Gemma 2 9B</li>
          <li><strong>Hardware:</strong> 16GB RAM, GPU recommended (8-16GB VRAM)</li>
          <li><strong>Speed:</strong> 43-112 tok/s on RTX 3090</li>
          <li><strong>Use Cases:</strong> Chat, summarization, code generation, tool calling</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">3. Large Models (24B-34B Parameters)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>Examples:</strong> Mistral Small 3.1 (24B), Qwen 2.5 32B</li>
          <li><strong>Hardware:</strong> 24GB VRAM (RTX 3090/4090)</li>
          <li><strong>Speed:</strong> ~20-30 tok/s on RTX 3090</li>
          <li><strong>Use Cases:</strong> Complex reasoning, long documents, highest local quality</li>
          <li><strong>Note:</strong> 70B models do NOT fit on 24 GB VRAM — require 48 GB+ or multi-GPU</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6">4. Top Open Source (S-Tier, March 2026)</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>GLM-5 (Z AI):</strong> Reasoning specialist, GPQA Diamond 86%, HumanEval 90%, SWE-bench 77.8%</li>
          <li><strong>Kimi K2.5 (Moonshot AI):</strong> HumanEval 99%, AIME 96.1%, SWE-bench 76.8% — S-Tier</li>
          <li><strong>MiniMax M2.5:</strong> S-Tier in Artificial Analysis Leaderboard</li>
          <li><strong>Qwen 3.5 Plus:</strong> MMLU 88.4%, ~1/13 the cost of Claude Sonnet</li>
        </ul>

        <figure className="my-8">
          <img src="/images/infographics/tools-model-selection-vergleich.png" alt="Model Selection Comparison — Parameters, Context, RAM, Quality" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Model Comparison: Parameters, Context Window, RAM Requirements, and Quality</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Comparison Table (as of March 2026)</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 text-gray-400">Model</th>
              <th className="py-2 text-gray-400">Parameters</th>
              <th className="py-2 text-gray-400">VRAM (Q4)</th>
              <th className="py-2 text-gray-400">tok/s (RTX 3090)</th>
              <th className="py-2 text-gray-400">Strength</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800">
              <td className="py-2">Gemma 2 2B</td>
              <td className="py-2">2B</td>
              <td className="py-2">~2 GB</td>
              <td className="py-2">200+</td>
              <td className="py-2">Embeddings, classification</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Llama 3.3 8B</td>
              <td className="py-2">8B</td>
              <td className="py-2">~5 GB</td>
              <td className="py-2">~112</td>
              <td className="py-2">All-rounder, fast</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Qwen3 14B</td>
              <td className="py-2">14B</td>
              <td className="py-2">~10 GB</td>
              <td className="py-2">43.2</td>
              <td className="py-2">German, multilingual</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Mistral Small 3.1</td>
              <td className="py-2">24B</td>
              <td className="py-2">~16 GB</td>
              <td className="py-2">~30</td>
              <td className="py-2">German (outperforms GPT-4o Mini)</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Qwen 2.5 32B</td>
              <td className="py-2">32B</td>
              <td className="py-2">~20 GB</td>
              <td className="py-2">~20</td>
              <td className="py-2">Coding, reasoning</td>
            </tr>
            <tr>
              <td className="py-2">Llama 3.3 70B</td>
              <td className="py-2">70B</td>
              <td className="py-2">~40 GB</td>
              <td className="py-2">Needs 48 GB+</td>
              <td className="py-2">MMLU 86%, HumanEval 88.4%</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
          <p className="text-blue-300 text-sm">
            <strong>German Tip:</strong> Mistral Small 3.1 (24B) outperforms GPT-4o Mini
            and Gemma 3 for European languages — ideal for German-language chat and
            content tasks on local hardware.
          </p>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/tools-model-vram.png" alt="VRAM Requirements per Model — GPU Memory Overview" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">VRAM Requirements: How much GPU memory each model needs</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Hardware Requirements with Ollama</h2>

        <p className="text-gray-300 mt-4">
          Here is what you need to run the models locally:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Load and test Ollama models
ollama pull llama3.2

# List models
ollama list

# Chat with a model
ollama run llama3.2 "Hello, who are you?"

# Hardware check
ollama run llama3.2 "How much RAM did you use?"`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Typical RAM usage with Ollama:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# VRAM usage (approx., Q4 quantized)
gemma2:2b           ~2GB VRAM   → 200+ tok/s
llama3.3:8b         ~5GB VRAM   → ~112 tok/s
qwen3:14b          ~10GB VRAM   → 43 tok/s
mistral-small3.1:24b ~16GB VRAM  → ~30 tok/s
qwen2.5:32b        ~20GB VRAM   → ~20 tok/s
llama3.3:70b       ~40GB VRAM   → DOES NOT FIT on 24GB GPU!

# RTX 3090 (24 GB): Maximum is about 34B (Q4_K_M)
# 70B needs 48 GB+ (2x RTX 3090 or RTX 6000 Ada)

# Save with quantized models
ollama pull llama3.3:q4_K_M   # 4-bit quantization, ~5GB
ollama pull qwen3:14b         # 4-bit default, ~10GB`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Decision Guide</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><strong>Budget-friendly?</strong> Llama 3.3 8B or Qwen 2.5 7B (~112 tok/s on RTX 3090)</li>
          <li><strong>Maximum local quality?</strong> Mistral Small 3.1 24B or Qwen 2.5 32B (fits on 24 GB)</li>
          <li><strong>Fast embeddings?</strong> mxbai-embed-large (1024 dim)</li>
          <li><strong>German language?</strong> Mistral Small 3.1 (outperforms GPT-4o Mini) or Qwen3 14B</li>
          <li><strong>Absolute best quality?</strong> Cloud API: Claude Sonnet 4.5, GPT-4o, or Gemini 2.5 Pro</li>
          <li><strong>Open Source S-Tier?</strong> GLM-5, Kimi K2.5, MiniMax M2.5 (need large GPU or cloud hosting)</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Our Stack</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# We use (as of March 2026):
# - mistral-small3.2:24b on RTX 3090 (.90) for chat/code (strong in German)
# - mxbai-embed-large on RTX 2060 (.99) for embeddings (1024 dim)
# - Cloud API (Claude Sonnet 4.5) for complex reasoning

# docker-compose.yml excerpt
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
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://artificialanalysis.ai/leaderboards/models" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Artificial Analysis LLM Leaderboard, March 2026</a> — Intelligence Index, 312 models, updates every 72h</li>
            <li><a href="https://onyx.app/open-llm-leaderboard" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Onyx Open LLM Leaderboard</a> — Kimi K2.5 HumanEval 99%, AIME 96.1%</li>
            <li><a href="https://vellum.ai/blog/llama-3-3-70b-vs-gpt-4o" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Vellum: Llama 3.3 70B vs GPT-4o</a> — MMLU, HumanEval, IFEval benchmarks</li>
            <li><a href="https://mistral.ai/news/mistral-small-3-1" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mistral AI: Mistral Small 3.1</a> — Outperforms GPT-4o Mini for European languages</li>
            <li><a href="https://localaimaster.com/blog/best-gpus-for-ai-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LocalAIMaster: Best GPUs for AI</a> — RTX 3090 tok/s measurements</li>
            <li><a href="https://corelab.tech/llmgpu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CoreLab: LLM GPU Benchmarks</a> — 8B ~112 tok/s on RTX 3090</li>
            <li><a href="https://intuitionlabs.ai/articles/local-llm-deployment-24gb-gpu-optimization" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">IntuitionLabs: 24GB GPU Optimization</a> — Max ~34B on 24 GB VRAM</li>
            <li><a href="https://ollama.com/library" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama Model Library</a> — Available models and quantizations</li>
            <li><a href="https://arena.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LMSYS Chatbot Arena</a> — Community-based model ranking</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
