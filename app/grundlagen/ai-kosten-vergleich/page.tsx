import Callout from "../../../components/Callout"
import ComparisonTable from "../../../components/ComparisonTable"

export const metadata = {
  title: 'AI Kosten Vergleich | AI Engineering Wiki',
  description:
    'Realistischer Kostenvergleich 2026: lokal vs Cloud vs hybrid. Setup, laufende Kosten, GPU/Hardware und typische Business-Workloads.',
}

export default function AiKostenVergleich() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI-Kosten: Lokal vs Cloud vs Hybrid</h1>
        <p className="text-gray-400 mt-2">Grundlagen · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Was kostet AI 2026? Hier ist der realistische Vergleich für lokale Modelle, Cloud APIs und Hybrid.
        </p>

        <figure className="my-8">
          <img src="/images/infographics/ai-kosten-vergleich-balken.png" alt="AI Kosten Vergleich — Cloud vs Lokal vs Hybrid Balkendiagramm" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">AI Kosten 2026: Cloud, Lokal und Hybrid im direkten Vergleich</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Kostenübersicht 2026 (ehrlich)</h2>

        <ComparisonTable
          headers={["Option", "Hardware (einmalig)", "Laufend/Monat", "Was du bekommst"]}
          rows={[
            ["Cloud API (GPT-4o)", "EUR 0", "EUR 100-500", "Beste Qualität — $5/$15 pro 1M Tokens (Stand März 2026)"],
            ["Cloud API (Claude Sonnet 4)", "EUR 0", "EUR 50-200", "Sehr gute Qualität — $3/$15 pro 1M Tokens"],
            ["Cloud API (Gemini 2.5 Pro)", "EUR 0", "EUR 30-150", "Stark bei Reasoning — $1.25/$10 pro 1M Tokens"],
            ["Lokal (RTX 3090, gebr.)", "EUR 750-1.123", "~EUR 49 (Strom, AT)", "Bis 34B Modelle, 80% der Tasks gut"],
            ["Lokal (RTX 4090)", "EUR 1.800-2.000", "~EUR 49 (Strom, AT)", "Wie 3090, etwas schneller, gleiche VRAM-Grenze"],
            ["Hybrid (unser Setup)", "EUR 750-1.123", "EUR 70-90 (Strom + Cloud)", "Bester Kompromiss aus Kosten und Qualität"],
          ]}
        />

        <Callout type="warning" title="Hardware-Kosten nicht vergessen">
          <p>
            Lokale AI kostet EUR 750-2.000 einmalig für die GPU plus EUR 500-800 für das System.
            Dazu kommen ~EUR 49/Monat Stromkosten bei 50% Last (AT: EUR 0,34/kWh).
            &quot;Kostenlos nach Anschaffung&quot; ist falsch. TCO Jahr 1: ca. EUR 2.000-2.300,
            ab Jahr 2: ca. EUR 588/Jahr (nur Strom).
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Hardware-Optionen (Preis-Leistung)</h2>

        <ComparisonTable
          headers={["GPU", "Preis (EUR)", "VRAM", "Modelle", "Strom/Monat (50% Last, AT)"]}
          rows={[
            ["RTX 3060 12GB", "~350", "12 GB", "Nur 7B Modelle", "~EUR 21"],
            ["RTX 4070 Ti Super", "~800", "16 GB", "Bis 14B", "~EUR 24"],
            ["RTX 3090 (gebraucht)", "750-1.123", "24 GB", "Bis 34B quantisiert", "~EUR 49"],
            ["RTX 4090", "1.800-2.000", "24 GB", "Bis 34B komfortabel", "~EUR 55"],
          ]}
        />

        <figure className="my-8">
          <img src="/images/infographics/ai-kosten-break-even.png" alt="AI Kosten Break-Even — Ab wann sich lokale AI rechnet" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Break-Even Analyse: Ab wann lokale AI günstiger ist als Cloud</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Break-Even (ehrlich)</h2>
        <p className="text-gray-300 mt-2">
          Der echte Break-Even für Self-Hosting liegt laut DevTk.AI bei 50-200 Millionen
          Tokens pro Monat. Unter 2M Tokens/Tag ist die Cloud API günstiger (Prem AI).
          Die versteckten Kosten (Engineering, Wartung, Updates) werden laut AISuperior
          3-5x unterschätzt, der Engineering-Anteil macht 45-55% des TCO aus.
        </p>

        <Callout type="info" title="Qualitätslücke beachten">
          <p>
            Selbst wenn lokal günstiger ist: Für komplexes Reasoning (Logik, juristische
            Analyse, mehrstufige Aufgaben) liegt Cloud ~25% vorne. Der Break-Even gilt nur
            für Tasks, die lokale Modelle auch wirklich gut können.
          </p>
        </Callout>

        <ComparisonTable
          headers={["Task", "GPT-4o (Cloud)", "Llama 3.3 70B (Lokal)"]}
          rows={[
            ["Reasoning / Logik", "69%", "44%"],
            ["Klassifikation", "73%", "70%"],
            ["Code Generation", "Sehr gut", "~85-90% der Cloud-Qualität"],
            ["Einfache Extraktion", "Exzellent", "~95% gleichwertig"],
          ]}
        />

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI Pricing, März 2026</a> — GPT-4o $2.50/$10, GPT-4o-mini $0.15/$0.60 pro 1M Tokens</li>
            <li><a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic Pricing, März 2026</a> — Claude Sonnet $3/$15, Opus $5/$25 pro 1M Tokens</li>
            <li><a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Gemini Pricing, März 2026</a> — Gemini 2.5 Pro $1.25/$10 pro 1M Tokens</li>
            <li><a href="https://www.globalpetrolprices.com/Austria/electricity_prices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GlobalPetrolPrices: Austria 2026</a> — Strompreis AT Privat EUR 0,34/kWh</li>
            <li><a href="https://bestvaluegpu.com/en-eu/history/new-and-used-rtx-3090-price-history-and-specs/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">BestValueGPU: RTX 3090</a> — Gebrauchtpreise EUR 750-1.123</li>
            <li><a href="https://devtk.ai/en/blog/self-hosting-llm-vs-api-cost-2026/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">DevTk.AI: Self-Hosting vs API 2026</a> — Break-Even bei 50M-200M Tokens/Monat</li>
            <li><a href="https://blog.premai.io/self-hosted-llm-guide-setup-tools-cost-comparison-2026/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Prem AI: Self-Hosted LLM Guide 2026</a> — Unter 2M Tokens/Tag ist API günstiger</li>
            <li><a href="https://aisuperior.com/open-source-llm-deployment-cost/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AISuperior: LLM Deployment Cost</a> — Hidden Cost Faktor 3-5x, Engineering 45-55%</li>
            <li><a href="https://localaimaster.com/blog/best-gpus-for-ai-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LocalAIMaster: Best GPUs for AI</a> — Inference Speed RTX 3090</li>
            <li><a href="https://vellum.ai/blog/llama-3-3-70b-vs-gpt-4o" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Vellum: Llama 3.3 70B vs GPT-4o</a> — Benchmark-Vergleich MMLU, HumanEval, IFEval</li>
          </ul>
        </section>

        <h2 className="text-xl font-semibold text-white mt-8">Empfehlung</h2>
        <p className="text-gray-300 mt-2">
          Starte mit Cloud, wenn du schnell testen willst oder geringe Nutzung hast.
          Für laufende Workloads (Automation, interne Tools) lohnt sich lokal nach
          6-12 Monaten. Der ehrlichste Ansatz ist Hybrid: lokal für Volumen-Tasks
          (Extraktion, Klassifikation, Q&amp;A), Cloud-API für komplexes Reasoning.
          So bekommst du das Beste aus beiden Welten — ohne dir etwas vorzumachen.
        </p>

        <Callout type="tip" title="Der ehrliche Hybrid-Ansatz">
          <p>
            Lokal für 80% der alltäglichen Tasks. Cloud-API für die 20% wo
            Qualität kritisch ist. Investition: EUR 750-1.123 Hardware + EUR 70-90/Monat
            laufend (Strom + Cloud). Das ist weniger als reine Cloud, aber auch nicht &quot;kostenlos&quot;.
          </p>
        </Callout>
      </div>
    </div>
  )
}
