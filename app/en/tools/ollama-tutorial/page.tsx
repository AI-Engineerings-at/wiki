export const metadata = {
  title: 'Ollama Tutorial | AI Engineering Wiki',
  description:
    'Run local LLMs with Ollama: install, pick models, use the API and integrate into a GDPR-compliant, 100% self-hosted AI stack.',
}

export default function OllamaTutorial() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Ollama: Local LLMs Made Easy</h1>
        <p className="text-gray-400 mt-2">Tools · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Ollama makes local Large Language Models accessible. No cloud, no API costs, 
          no data flowing anywhere. In 5 minutes you have your own AI chat running 
          on your hardware.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">What is Ollama?</h2>
        <p className="text-gray-300">
          Ollama is a CLI tool to run LLMs locally. Supports 132+ models 
          (Llama, Mistral, CodeLlama, etc.) and runs on macOS (with Metal GPU acceleration), 
          Linux and Windows (via WSL2).
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Supported Models (Selection)</h3>
          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
            <div>
              <p className="text-white font-medium">Llama 3.2</p>
              <p className="text-gray-500">1B, 3B, 8B, 70B — Text and Vision</p>
            </div>
            <div>
              <p className="text-white font-medium">Mistral</p>
              <p className="text-gray-500">7B — Fast, efficient</p>
            </div>
            <div>
              <p className="text-white font-medium">Phi</p>
              <p className="text-gray-500">3.5B — Small but smart</p>
            </div>
            <div>
              <p className="text-white font-medium">CodeLlama</p>
              <p className="text-gray-500">7B, 13B, 34B — Coding specialized</p>
            </div>
            <div>
              <p className="text-white font-medium">Qwen</p>
              <p className="text-gray-500">0.5B to 72B — multilingual</p>
            </div>
            <div>
              <p className="text-white font-medium">Gemma</p>
              <p className="text-gray-500">2B, 7B — Google</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Installation</h2>

        <h3 className="text-lg font-medium text-white mt-4">macOS</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">brew install ollama</code>
        </pre>

        <h3 className="text-lg font-medium text-white mt-4">Linux/WSL2</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">curl -fsSL https://ollama.com/install.sh | sh</code>
        </pre>

        <h3 className="text-lg font-medium text-white mt-4">Docker (our recommendation)</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`docker run -d \\
  --name ollama \\
  -v ollama_data:/root/.ollama \\
  -p 11434:11434 \\
  ollama/ollama:latest`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Download Models</h2>

        <p className="text-gray-300">
          The first model is downloaded automatically on first start. You can also 
          preload models explicitly:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Download model
ollama pull llama3.2

# List available models
ollama list

# Show model info
ollama show llama3.2`}</code>
        </pre>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Recommended Starter Models</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Model</th>
                <th className="text-left py-2 text-gray-400">Size</th>
                <th className="text-left py-2 text-gray-400">VRAM</th>
                <th className="text-left py-2 text-gray-400">Use Case</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">phi3:3.8b</td>
                <td className="py-2">2.3 GB</td>
                <td className="py-2">~4 GB</td>
                <td className="py-2">Fast, beginner</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">llama3.2:1b</td>
                <td className="py-2">1.3 GB</td>
                <td className="py-2">~2 GB</td>
                <td className="py-2">Lightweight, fast</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">llama3.2:3b</td>
                <td className="py-2">3.8 GB</td>
                <td className="py-2">~6 GB</td>
                <td className="py-2">Balance</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">llama3.1:8b</td>
                <td className="py-2">4.7 GB</td>
                <td className="py-2">~8 GB</td>
                <td className="py-2">Advanced</td>
              </tr>
              <tr>
                <td className="py-2">mistral:7b</td>
                <td className="py-2">4.1 GB</td>
                <td className="py-2">~8 GB</td>
                <td className="py-2">Coding, reasoning</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Using Ollama</h2>

        <h3 className="text-lg font-medium text-white mt-4">Interactive Chat</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">ollama run llama3.2</code>
        </pre>

        <h3 className="text-lg font-medium text-white mt-4">REST API</h3>
        <p className="text-gray-300 mt-2">
          Ollama provides a REST API on port 11434:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Chat
curl -X POST http://localhost:11434/api/chat \\
  -d '{
    "model": "llama3.2",
    "messages": [
      { "role": "user", "content": "Hello!" }
    ]
  }'

# Generate (single response)
curl -X POST http://localhost:11434/api/generate \\
  -d '{
    "model": "llama3.2",
    "prompt": "What is Docker?"
  }'`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">GPU Configuration</h2>

        <p className="text-gray-300">
          Ollama automatically uses available GPUs. For Docker, the GPU 
          needs to be passed through:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# NVIDIA GPU
docker run -d --gpus all \\
  --name ollama \\
  -v ollama_data:/root/.ollama \\
  -p 11434:11434 \\
  ollama/ollama:latest

# Or with docker-compose.yml
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

        <h2 className="text-xl font-semibold text-white mt-8">Our Docker Swarm Setup</h2>

        <p className="text-gray-300">
          In our 3-node Swarm, Ollama runs on the GPU node (docker-swarm3):
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
          For a ChatGPT-like interface, we use Open WebUI:
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

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Next Steps</h3>
          <ul className="text-gray-300 space-y-1">
            <li>• <strong>Set up RAG:</strong>{" "}
              <a href="/en/tools/rag-guide" className="text-blue-400 hover:underline">RAG Complete Guide →</a>
            </li>
            <li>• <strong>Compare models:</strong> Test multiple models in parallel</li>
            <li>• <strong>Monitoring:</strong> Enable Prometheus metrics</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
