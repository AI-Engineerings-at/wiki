export const metadata = {
  title: 'What is an LLM? Large Language Models Explained | AI Engineering Wiki',
  description:
    'What is a Large Language Model (LLM)? How do Transformers, Tokens, and Inference work? Model sizes, VRAM requirements, and practical tips.',
}

export default function WhatIsAnLLMPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Basics</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          What is a Large Language Model (LLM)?
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          How language models work, why they sometimes hallucinate, and what you
          need to run them locally.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 12 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        {/* Summary */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 my-6">
          <h3 className="text-lg font-bold text-white mt-0 mb-2">At a Glance</h3>
          <p className="text-white/70 mb-0">
            A Large Language Model (LLM) is a neural network trained on massive amounts
            of text that understands, generates, and translates language. LLMs predict
            word by word which token should come next. They can run locally on your own
            hardware — no cloud, no dependency.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            What exactly is an LLM?
          </h2>
          <p className="text-white/70 leading-relaxed">
            A Large Language Model is a form of artificial intelligence based on the
            Transformer architecture. The model was trained on billions of texts from
            the internet — books, Wikipedia, forums, scientific papers — and learned
            statistical patterns in language.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            The core idea: An LLM calculates a probability for each possible next word
            and then selects the most likely one. That sounds simple, but with 70 billion
            parameters and 128,000 tokens of context, the results are surprisingly good.
          </p>
        </section>

        {/* Section 2: Transformer Architecture */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Transformer Architecture (Simplified)
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Since the paper &quot;Attention is All You Need&quot; (2017), all modern LLMs
            are based on Transformers. The core idea: every word in a text &quot;looks at&quot;
            all other words simultaneously and learns which connections matter.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-sm text-white/40 mb-3 font-medium">Simplified Transformer Architecture</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">Input Text</span>
              <span className="text-green-400">&#8594;</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">Tokenizer</span>
              <span className="text-green-400">&#8594;</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">Embedding</span>
              <span className="text-green-400">&#8594;</span>
              <span className="bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/30">Self-Attention</span>
              <span className="text-green-400">&#8594;</span>
              <span className="bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/30">Feed-Forward</span>
              <span className="text-green-400">&#8594;</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">Output (next token)</span>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">What is Self-Attention?</h3>
            <p className="text-white/70 mb-0">
              Self-Attention is the mechanism that helps the model understand which words
              in a sentence belong together. When you write &quot;The dog chased the cat
              because he was hungry&quot; — Attention helps the model understand that &quot;he&quot;
              refers to &quot;dog&quot;, not &quot;cat&quot;.
            </p>
          </div>
        </section>

        {/* Section 3: Tokens */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Tokens: How LLMs Process Text
          </h2>
          <p className="text-white/70 leading-relaxed">
            LLMs do not read words — they read tokens. A token is a text fragment,
            often a word or part of a word. &quot;Datenschutzgrundverordnung&quot; (German
            for GDPR), for example, is split into 3-4 tokens. English texts require
            fewer tokens than German because most models were trained primarily on
            English data.
          </p>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">Rule of Thumb for Tokens</h3>
            <p className="text-white/70 mb-0">
              1 token is roughly 3/4 of an English word. For German, count about
              1 token per half word. A typical paragraph (100 words) is approximately
              130-150 tokens. A context window of 128K equals roughly 200 pages of text.
            </p>
          </div>
        </section>

        {/* Section 4: LLM vs Search Engine */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            LLM vs. Search Engine
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            A common misconception: LLMs are not search engines. They do not
            &quot;know&quot; anything — they calculate which answer is statistically
            most likely.
          </p>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-gray-400">Property</th>
                <th className="py-2 text-gray-400">Search Engine (Google)</th>
                <th className="py-2 text-gray-400">LLM (ChatGPT, Llama)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td className="py-2">Data Source</td><td className="py-2">Live index of the internet</td><td className="py-2">Training data (cutoff date)</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Timeliness</td><td className="py-2">Real-time</td><td className="py-2">Knowledge ends at training cutoff</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Response Format</td><td className="py-2">Links to websites</td><td className="py-2">Flowing text, code, tables</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Accuracy</td><td className="py-2">Source verifiable</td><td className="py-2">Can hallucinate (made-up facts)</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Personalization</td><td className="py-2">Based on search history</td><td className="py-2">Based on conversation</td></tr>
              <tr><td className="py-2">Cost</td><td className="py-2">Free (with ads)</td><td className="py-2">API costs or local hardware</td></tr>
            </tbody>
          </table>
        </section>

        {/* Section 5: Hallucinations */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Hallucinations: When LLMs Make Things Up
          </h2>
          <p className="text-white/70 leading-relaxed">
            LLMs can invent facts that sound convincing but are wrong. This happens
            because they do not &quot;know&quot; — they calculate statistical probabilities.
            When no good answer exists in the training data, they still generate
            something plausible.
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">Hallucination Risk</h3>
            <p className="text-white/70 mb-0">
              LLMs invent citations, laws, URLs, and statistics. Especially dangerous
              for: legal texts, medical advice, historical facts, and technical
              specifications. ALWAYS verify output before using it.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">Reducing Hallucinations</h3>
            <p className="text-white/70 mb-0">
              <strong>RAG (Retrieval Augmented Generation)</strong> is the best approach:
              instead of letting the model &quot;guess&quot;, you feed it real documents as
              context. The model then responds based on your data rather than its training
              data. More in the{" "}
              <a href="/en/tools/rag-guide" className="text-blue-400 hover:underline">
                RAG Complete Guide
              </a>.
            </p>
          </div>
        </section>

        {/* Section 6: Model Sizes */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Model Sizes: From 7B to 70B
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            &quot;B&quot; stands for billion parameters. More parameters means more
            &quot;knowledge&quot; and better quality — but also more VRAM and slower
            responses. The art lies in finding the right trade-off.
          </p>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-gray-400">Size</th>
                <th className="py-2 text-gray-400">VRAM (Q4)</th>
                <th className="py-2 text-gray-400">Speed (RTX 3090)</th>
                <th className="py-2 text-gray-400">Quality</th>
                <th className="py-2 text-gray-400">Example Models</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td className="py-2">7-8B</td><td className="py-2">~5 GB</td><td className="py-2">~112 tok/s</td><td className="py-2">Good for simple tasks</td><td className="py-2">Llama 3.3 8B, Mistral 7B, Qwen 2.5 7B</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">13-14B</td><td className="py-2">~10 GB</td><td className="py-2">43-57 tok/s</td><td className="py-2">Solid all-rounders</td><td className="py-2">Qwen3 14B, DeepSeek R1 14B</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">24-32B</td><td className="py-2">~16-20 GB</td><td className="py-2">~20-30 tok/s</td><td className="py-2">Near cloud quality</td><td className="py-2">Mistral Small 3.1 24B, Qwen 2.5 32B</td></tr>
              <tr><td className="py-2">70B</td><td className="py-2">~40 GB</td><td className="py-2">Does NOT fit on 24 GB GPU</td><td className="py-2">Best local quality</td><td className="py-2">Llama 3.3 70B, Qwen 2.5 72B</td></tr>
            </tbody>
          </table>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">70B Needs More Than 24 GB VRAM</h3>
            <p className="text-white/70 mb-0">
              A 70B model in Q4_K_M quantization requires about 40 GB VRAM. That does
              NOT fit on a single RTX 3090 or RTX 4090 (each 24 GB). For 70B you need
              48 GB+ (e.g., 2x RTX 3090 or an RTX 6000 Ada). With 24 GB VRAM, the limit
              is around 34B models.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">Hardware Recommendation</h3>
            <p className="text-white/70 mb-0">
              <strong>RTX 4060 (8 GB VRAM):</strong> 7B models, no problem.{" "}
              <strong>RTX 4070 Ti Super (16 GB):</strong> Up to 14B comfortably.{" "}
              <strong>RTX 3090/4090 (24 GB):</strong> Up to 32-34B quantized.{" "}
              The RTX 3090 used (EUR 750-1,123) remains the value king for local AI.
            </p>
          </div>
        </section>

        {/* Section 7: Quantization */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Quantization: Large Models on Small Hardware
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Quantization reduces the precision of model weights from 32-bit floating
            point numbers to 4 or 8 bits. This halves the VRAM requirement with minimal
            quality loss.
          </p>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-gray-400">Format</th>
                <th className="py-2 text-gray-400">Size vs. Original</th>
                <th className="py-2 text-gray-400">Quality</th>
                <th className="py-2 text-gray-400">Recommendation</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td className="py-2">FP16 / BF16</td><td className="py-2">50%</td><td className="py-2">100% (lossless)</td><td className="py-2">When VRAM is not an issue</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Q5_K_M</td><td className="py-2">~35%</td><td className="py-2">~99%</td><td className="py-2">Highest quality with compression</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Q4_K_M</td><td className="py-2">~25%</td><td className="py-2">~95%</td><td className="py-2">Best trade-off (standard)</td></tr>
              <tr><td className="py-2">Q3_K_M</td><td className="py-2">~20%</td><td className="py-2">~85%</td><td className="py-2">Only when VRAM is extremely tight</td></tr>
            </tbody>
          </table>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 my-6">
            <p className="text-white/70 mb-0">
              With Ollama, most models default to Q4_K_M quantization. You do not need
              to configure anything extra — just{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                ollama run llama3.3
              </code>{" "}
              and go.
            </p>
          </div>
        </section>

        {/* Section 8: Local vs Cloud */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Local vs. Cloud: Where Should the LLM Run?
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The key question for every business: own hardware or cloud API? Both have
            their place.
          </p>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-gray-400">Criterion</th>
                <th className="py-2 text-gray-400">Cloud API</th>
                <th className="py-2 text-gray-400">Local (Self-hosted)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td className="py-2">Quality</td><td className="py-2">Best available models</td><td className="py-2">For simple tasks ~95% equivalent, reasoning 20-25% weaker</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Privacy</td><td className="py-2">Data goes to third parties (US)</td><td className="py-2">Data stays with you (GDPR)</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Monthly Cost</td><td className="py-2">EUR 50-500+ (usage-based)</td><td className="py-2">~EUR 49 electricity (AT, 50% load) + EUR 750-2,000 hardware one-time</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Hardware Needed</td><td className="py-2">No</td><td className="py-2">GPU from EUR 350, used RTX 3090 from EUR 750</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">Availability</td><td className="py-2">Internet required</td><td className="py-2">Runs offline</td></tr>
              <tr><td className="py-2">Maintenance</td><td className="py-2">None</td><td className="py-2">Updates, monitoring (~1h/month)</td></tr>
            </tbody>
          </table>

          <h3 className="text-xl font-bold text-white mt-8 mb-4">
            Honest Benchmark: Cloud vs. Local
          </h3>
          <p className="text-white/70 leading-relaxed mb-4">
            The quality gap between cloud models and local models is real. Here are
            honest comparison numbers (as of March 2026):
          </p>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-gray-400">Benchmark</th>
                <th className="py-2 text-gray-400">GPT-4o (Cloud)</th>
                <th className="py-2 text-gray-400">Llama 3.3 70B (Local)</th>
                <th className="py-2 text-gray-400">Source</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td className="py-2">MMLU (Knowledge)</td><td className="py-2">85.9%</td><td className="py-2">86.0%</td><td className="py-2">Vellum</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">HumanEval (Code)</td><td className="py-2">84%</td><td className="py-2">88.4%</td><td className="py-2">Vellum / Bind AI</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2">IFEval (Instructions)</td><td className="py-2">84.6</td><td className="py-2">92.1</td><td className="py-2">Vellum</td></tr>
              <tr><td className="py-2">MATH (Mathematics)</td><td className="py-2">--</td><td className="py-2">77%</td><td className="py-2">Vellum</td></tr>
            </tbody>
          </table>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">Reading Benchmarks Correctly</h3>
            <p className="text-white/70 mb-0">
              Llama 3.3 70B surpasses GPT-4o in some benchmarks (MMLU, HumanEval, IFEval).
              But: 70B does NOT fit on a single 24 GB GPU. For local use, 8B-34B models
              are realistic — and the gap to cloud models is larger there, especially
              for complex reasoning.
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">The Quality Gap is REAL</h3>
            <p className="text-white/70 mb-0">
              Especially for complex reasoning (logical deductions, multi-step analysis,
              legal argumentation), cloud is clearly ahead. Local models are not &quot;almost
              as good&quot; — they are measurably worse. Hiding this would be dishonest.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">Where Local is Still Enough</h3>
            <p className="text-white/70 mb-0">
              For 80% of everyday tasks (data extraction, classification, simple Q&amp;A,
              summaries), local models are sufficient. For complex reasoning: use a cloud
              API as backup. The most honest approach is hybrid — local where it works,
              cloud where it counts.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 my-6">
            <h3 className="text-lg font-bold text-white mt-0 mb-2">Our Recommendation</h3>
            <p className="text-white/70 mb-0">
              Start local with Ollama + a 7B or 14B model. For tasks where quality is
              critical (e.g., contracts, complex analyses), use a cloud API as backup.
              This saves money and keeps your data under control. More:{" "}
              <a href="/en/grundlagen/lokal-vs-cloud" className="text-blue-400 hover:underline">
                Local vs. Cloud: The TCO Comparison
              </a>
            </p>
          </div>
        </section>

        {/* Section 9: Getting Started */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Get Started in 5 Minutes
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            You do not need an ML degree to run an LLM locally. With Ollama it takes
            3 steps:
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-white font-medium">Install Ollama</p>
                <p className="text-white/50 text-sm mt-1">
                  Download from{" "}
                  <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    ollama.com
                  </a>{" "}
                  — available for Windows, Mac, and Linux.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="text-white font-medium">Start a model</p>
                <pre className="bg-black/30 rounded-lg p-3 mt-2 overflow-x-auto">
                  <code className="text-sm text-green-400">
                    ollama run llama3.3
                  </code>
                </pre>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-white font-medium">Ask questions</p>
                <p className="text-white/50 text-sm mt-1">
                  The model runs on your GPU. No cloud, no API keys, no costs. The REST
                  API is available at{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                    http://localhost:11434
                  </code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaway */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
          <h3 className="text-lg font-bold text-white mt-0 mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-white/70">
            <li>LLMs predict the next token — they do not &quot;know&quot; anything, they calculate probabilities.</li>
            <li>More parameters = better quality, but more VRAM and slower. Q4_K_M quantization is the best trade-off.</li>
            <li>LLMs hallucinate. Always verify critical outputs. RAG significantly reduces the risk.</li>
            <li>Local LLMs on your own hardware (Ollama) are GDPR-compliant. RTX 3090 at 50% load: ~EUR 49/month electricity (AT: EUR 0.34/kWh).</li>
            <li>To get started: install Ollama, run llama3.3, up and running in 5 minutes.</li>
          </ul>
        </div>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://vellum.ai/blog/llama-3-3-70b-vs-gpt-4o" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Vellum: Llama 3.3 70B vs GPT-4o</a> — MMLU, HumanEval, IFEval, MATH benchmark data</li>
            <li><a href="https://blog.getbind.co/llama-3-3-70b-vs-gpt-4o-which-is-better-for-coding/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Bind AI: Llama 3.3 70B vs GPT-4o Coding</a> — HumanEval comparison</li>
            <li><a href="https://intuitionlabs.ai/articles/local-llm-deployment-24gb-gpu-optimization" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">IntuitionLabs: 24GB GPU Optimization</a> — VRAM limit 24 GB, max ~34B quantized</li>
            <li><a href="https://localaimaster.com/blog/best-gpus-for-ai-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LocalAIMaster: Best GPUs for AI</a> — Inference speed RTX 3090 (tok/s)</li>
            <li><a href="https://corelab.tech/llmgpu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CoreLab: LLM GPU Benchmarks</a> — 8B models ~112 tok/s on RTX 3090</li>
            <li><a href="https://www.globalpetrolprices.com/Austria/electricity_prices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GlobalPetrolPrices: Austria Electricity Prices</a> — Electricity price AT residential EUR 0.34/kWh (2026)</li>
            <li><a href="https://bestvaluegpu.com/en-eu/history/new-and-used-rtx-3090-price-history-and-specs/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">BestValueGPU: RTX 3090 Price History</a> — Used prices EUR 750-1,123</li>
          </ul>
        </section>

        {/* Further Reading */}
        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Further Reading</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <a href="/en/grundlagen/lokal-vs-cloud" className="text-blue-400 hover:underline">Local vs. Cloud: The TCO Comparison</a></li>
            <li>&#8226; <a href="/en/tools/ollama-tutorial" className="text-blue-400 hover:underline">Ollama: Local LLMs Made Easy</a></li>
            <li>&#8226; <a href="/en/tools/rag-guide" className="text-blue-400 hover:underline">RAG Complete Guide</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
