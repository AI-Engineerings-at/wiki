import { Metadata } from "next"
import Image from "next/image"
import Callout from "../../../../components/Callout"
import KeyTakeaway from "../../../../components/KeyTakeaway"
import ComparisonTable from "../../../../components/ComparisonTable"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "AI Stack Setup in 30 Minutes: Ollama + Open WebUI + Docker | AI Engineering Wiki",
  description:
    "Step-by-step: Install Ollama, download an LLM, start Open WebUI. Your own AI stack running locally in 30 minutes.",
}

export default function AiStackSetupPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          AI Stack Setup in 30 Minutes
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Ollama + Open WebUI + Docker: Your own ChatGPT clone, running locally
          on your hardware. No cloud, no API keys, no monthly costs.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 10 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="At a Glance">
          <p>
            In this tutorial, you set up a local AI stack in 30 minutes: Ollama
            as LLM backend, Open WebUI as chat interface, Docker as container
            runtime. At the end, you have a fully functional ChatGPT clone
            running on your own hardware.
          </p>
        </Callout>

        {/* Prerequisites */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Prerequisites
          </h2>

          <ComparisonTable
            headers={["What", "Minimum", "Recommended"]}
            rows={[
              ["GPU", "8 GB VRAM (7B models)", "24 GB VRAM / RTX 3090 (up to 34B models)"],
              ["RAM", "16 GB", "32 GB"],
              ["Storage", "50 GB free", "200 GB NVMe SSD"],
              ["OS", "Windows 10, macOS, Ubuntu 22.04+", "Ubuntu 24.04 LTS"],
              ["Docker", "Docker Desktop (Win/Mac) or Docker Engine (Linux)", "Docker Engine + NVIDIA Container Toolkit"],
            ]}
          />

          <Callout type="info" title="No GPU? Still works">
            <p>
              Ollama also runs on CPU — just significantly slower. A 7B model on
              a modern CPU (i7/Ryzen 7) delivers about 5-10 tok/s. Fine for
              testing, but you need a GPU for productive use.
            </p>
          </Callout>
        </section>

        {/* Step 1: Ollama */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step 1: Install Ollama (5 Minutes)
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
              Ollama installation: One command on Linux, installer on Windows/Mac.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Linux / macOS</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# One-command installation
curl -fsSL https://ollama.com/install.sh | sh

# Verify it works
ollama --version`}</code>
            </pre>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Windows</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Download from https://ollama.com/download
# Run installer
# Ollama runs as background service`}</code>
            </pre>
          </div>
        </section>

        {/* Step 2: Download Model */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step 2: Download Your First Model (5-10 Minutes)
          </h2>

          <div className="my-6">
            <Image
              src="/images/screenshots/ollama-pull.png"
              alt="Ollama Pull: Download a model"
              width={800}
              height={400}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              ollama pull downloads the model and stores it locally.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Download and test a model</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Recommended starter: Llama 3.3 (8B)
ollama pull llama3.3

# Test it directly
ollama run llama3.3

# Show installed models
ollama list`}</code>
            </pre>
          </div>

          <ComparisonTable
            headers={["Model", "Size", "VRAM", "Strength", "Command"]}
            rows={[
              ["Llama 3.3 (8B)", "4.7 GB", "~5 GB", "Fast all-rounder", "ollama pull llama3.3"],
              ["Mistral Small 3.1 (24B)", "14 GB", "~16 GB", "Strong German, beats GPT-4o Mini", "ollama pull mistral-small3.1"],
              ["Qwen3 14B", "9 GB", "~10 GB", "Good reasoning, 100+ languages", "ollama pull qwen3:14b"],
              ["DeepSeek R1 14B", "9 GB", "~10 GB", "Strong chain-of-thought reasoning", "ollama pull deepseek-r1:14b"],
            ]}
          />

          <Callout type="warning" title="Check VRAM">
            <p>
              If the model does not fit in VRAM, Ollama falls back to CPU — 5-10x
              slower. Check:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                nvidia-smi
              </code>{" "}
              (Linux/Windows) shows free VRAM. 24 GB GPU: max 34B models in Q4
              quantization. 70B does NOT fit on 24 GB.
            </p>
          </Callout>

          <div className="my-6">
            <Image
              src="/images/screenshots/ollama-run.png"
              alt="Ollama Run: Chat with local LLM"
              width={800}
              height={400}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              ollama run starts an interactive chat session in the terminal.
            </p>
          </div>
        </section>

        {/* Step 3: Open WebUI */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step 3: Start Open WebUI (5 Minutes)
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Terminal chat works for testing, but for daily use you want a web
            interface. Open WebUI looks like ChatGPT but runs locally and
            connects to your Ollama instance.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Docker Compose (recommended)</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Create docker-compose.yml
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

# Start
docker compose up -d

# Open browser: http://localhost:3000`}</code>
            </pre>
          </div>

          <Callout type="info" title="Linux: host-gateway">
            <p>
              On Linux the container needs{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                extra_hosts: host.docker.internal:host-gateway
              </code>{" "}
              to access the Ollama service on the host. On Windows and Mac,{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                host.docker.internal
              </code>{" "}
              is available automatically.
            </p>
          </Callout>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-white font-medium">Open browser</p>
                <p className="text-white/50 text-sm mt-1">
                  Navigate to{" "}
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
                <p className="text-white font-medium">Create account</p>
                <p className="text-white/50 text-sm mt-1">
                  The first user automatically becomes admin. Email and password
                  are freely chosen — everything stays local.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-white font-medium">Select model and start chatting</p>
                <p className="text-white/50 text-sm mt-1">
                  Open WebUI automatically detects all models installed in
                  Ollama. Select the model at the top and start chatting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Verification */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step 4: Verification (5 Minutes)
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Check that everything is running correctly:
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Ollama API reachable?
curl http://localhost:11434/api/tags
# Expected: JSON with your models

# Open WebUI running?
curl -I http://localhost:3000
# Expected: HTTP 200

# GPU being used?
nvidia-smi
# "ollama" should appear under Processes

# Docker container status
docker compose ps
# open-webui should show "Up"`}</code>
            </pre>
          </div>

          <Callout type="tip" title="Ollama REST API">
            <p>
              Ollama provides a full REST API on port 11434. You can call it from
              any program, script, or workflow:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                curl http://localhost:11434/api/chat -d
                &#123;&quot;model&quot;:&quot;llama3.3&quot;,&quot;messages&quot;:[&#123;&quot;role&quot;:&quot;user&quot;,&quot;content&quot;:&quot;Hello&quot;&#125;]&#125;
              </code>
              . Perfect for integration with n8n, Python scripts, or custom
              tools.
            </p>
          </Callout>
        </section>

        {/* Next Steps */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Next Steps
          </h2>

          <ComparisonTable
            headers={["What", "Why", "Wiki Article"]}
            rows={[
              ["Learn Docker basics", "Understand what happens under the hood", "/en/tools/docker-grundlagen"],
              ["Test multiple models", "Different strengths for different tasks", "/en/tools/model-selection"],
              ["Build n8n workflows", "Integrate LLM into automated processes", "/en/tools/n8n-fuer-anfaenger"],
              ["Set up monitoring", "Monitor GPU utilization and container health", "/en/tools/grafana-monitoring"],
              ["Check security", "Local does not automatically mean secure", "/en/security/self-hosted-sicherheit"],
            ]}
          />

          <Callout type="tip" title="Complete Guide">
            <p>
              This tutorial covers the quick start. For a comprehensive guide
              with hardware recommendations, network setup, backup strategy, and
              production hardening — our{" "}
              <a
                href="https://buy.stripe.com/8x28wP7VBbapbdQgs4fQI00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                The Local AI Stack Playbook (EUR 49)
              </a>{" "}
              walks you through the entire process.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "30 minutes: Install Ollama (5 min), download model (10 min), start Open WebUI (5 min), verify (5 min).",
            "Minimum: 8 GB VRAM for 7B models. Recommended: RTX 3090 (24 GB) for up to 34B models.",
            "Open WebUI is a full-featured ChatGPT interface — local, no cloud, no monthly costs.",
            "Ollama REST API (port 11434) enables integration into scripts, n8n workflows, and custom applications.",
            "No GPU? Works on CPU too, just slower (~5-10 tok/s instead of 40-112 tok/s).",
          ]}
        />

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Ollama
              </a>{" "}
              — Local LLM Runtime
            </li>
            <li>
              <a href="https://openwebui.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Open WebUI
              </a>{" "}
              — Self-hosted ChatGPT Interface
            </li>
            <li>
              <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Compose Documentation
              </a>{" "}
              — Container Orchestration
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
