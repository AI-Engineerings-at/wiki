export const metadata = {
  title: 'Comparable Resources \u2014 Where Else You Can Learn | AI Engineering Wiki',
  description:
    'Honest comparison: Which external sources are better than our wiki in certain areas. EU Commission, WKO, n8n, Hugging Face, NIST, OECD and more.',
}

const NIST_URL = 'https://www.nist.gov/itl/ai-risk-management-framework'

export default function ComparisonAlternativesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Comparable Resources \u2014 Where Else You Can Learn
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          We are not the only source. Here we honestly show where other
          sources are better than us \u2014 and why you should know about them.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 5 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-white/70 leading-relaxed">
          No wiki can cover everything. Official bodies have legally binding
          information, specialized platforms have deeper tool knowledge, and
          international organizations have broader comparison data. This is
          our honest assessment.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Where others are better</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Source</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Strength</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Better than our wiki at</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Link</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">EU Commission</td>
                  <td className="py-3 px-4">Official rules and regulations</td>
                  <td className="py-3 px-4">Legally binding information on the AI Act</td>
                  <td className="py-3 px-4"><a href="https://digital-strategy.ec.europa.eu/en/policies/ai-office" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">digital-strategy.ec.europa.eu</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">RTR AI Service Centre</td>
                  <td className="py-3 px-4">Austria-specific, with AI Act chatbot</td>
                  <td className="py-3 px-4">Austrian context and national implementation</td>
                  <td className="py-3 px-4"><a href="https://www.rtr.at/rtr/service/ki-servicestelle/ki-servicestelle.de.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">rtr.at</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">WKO AI Act</td>
                  <td className="py-3 px-4">SME perspective, practical</td>
                  <td className="py-3 px-4">Practical business perspective for Austrian SMEs</td>
                  <td className="py-3 px-4"><a href="https://www.wko.at/digitalisierung/ai-act-eu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">wko.at</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">n8n AI Starter Kit</td>
                  <td className="py-3 px-4">Ready to use, officially maintained</td>
                  <td className="py-3 px-4">Quick start with n8n + AI in one command</td>
                  <td className="py-3 px-4"><a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/n8n-io</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Hugging Face</td>
                  <td className="py-3 px-4">Model variety, community, papers</td>
                  <td className="py-3 px-4">Finding, testing, comparing and downloading models</td>
                  <td className="py-3 px-4"><a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">huggingface.co</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">NIST AI RMF</td>
                  <td className="py-3 px-4">Governance, structured risk management</td>
                  <td className="py-3 px-4">Building a structured risk management framework</td>
                  <td className="py-3 px-4"><a href={NIST_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">nist.gov</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">OECD.AI</td>
                  <td className="py-3 px-4">900+ AI policies worldwide, country comparisons</td>
                  <td className="py-3 px-4">International comparisons and policy overview</td>
                  <td className="py-3 px-4"><a href="https://oecd.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">oecd.ai</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">DataCamp Tutorial</td>
                  <td className="py-3 px-4">Step-by-step, guided</td>
                  <td className="py-3 px-4">Guided tutorial with Docker, n8n, Qdrant and Ollama</td>
                  <td className="py-3 px-4"><a href="https://www.datacamp.com/de/tutorial/local-ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">datacamp.com</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">What we do well</h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <ul className="text-white/70 space-y-2">
              <li><strong className="text-white">DACH focus:</strong> We write for Austrian and German SMEs. Electricity prices, subsidies, legal situation \u2014 all from our region.</li>
              <li><strong className="text-white">Practice over theory:</strong> Every guide is based on real setups running in production. No lab results.</li>
              <li><strong className="text-white">Everything in one place:</strong> From compliance to hardware to workflow automation \u2014 one place, one language, one context.</li>
              <li><strong className="text-white">Honest limitations:</strong> We say where local is worse than cloud and where other sources are better than us.</li>
              <li><strong className="text-white">Free and no tracking:</strong> No login, no cookies, no paywall for wiki content.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Disclaimer</h3>
            <p className="text-white/70">
              We are a small Austrian company. Our wiki articles are carefully
              researched and cited, but they do not replace legal advice. For
              legally binding decisions \u2014 especially regarding the EU AI Act,
              GDPR and compliance \u2014 use the official sources from the EU
              Commission, the RTR AI Service Centre, or your legal counsel.
            </p>
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://digital-strategy.ec.europa.eu/en/policies/ai-office" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EU AI Office</a> \u2014 Central EU body for AI regulation</li>
            <li><a href="https://www.wko.at/digitalisierung/ai-act-eu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">WKO AI Act Overview</a> \u2014 Practical business perspective on the EU AI Act</li>
            <li><a href="https://www.rtr.at/rtr/service/ki-servicestelle/ki-servicestelle.de.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RTR AI Service Centre</a> \u2014 Austrian AI Service Centre</li>
            <li><a href={NIST_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NIST AI Risk Management Framework</a> \u2014 US framework for AI risk management</li>
            <li><a href="https://oecd.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OECD.AI Policy Observatory</a> \u2014 900+ AI policies worldwide</li>
            <li><a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Self-hosted AI Starter Kit</a> \u2014 Official n8n starter kit for local AI</li>
            <li><a href="https://docs.n8n.io/advanced-ai/intro-tutorial/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n AI Tutorial</a> \u2014 Build AI workflows with n8n</li>
            <li><a href="https://docs.n8n.io/hosting/starter-kits/ai-starter-kit/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n AI Starter Kit Documentation</a> \u2014 Official starter kit docs</li>
            <li><a href="https://huggingface.co/docs/transformers/index" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Hugging Face Transformers</a> \u2014 Transformers library documentation</li>
            <li><a href="https://huggingface.co/docs/hub/ollama" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Hugging Face Ollama/GGUF</a> \u2014 Use GGUF models from Hugging Face with Ollama</li>
            <li><a href="https://www.datacamp.com/de/tutorial/local-ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">DataCamp: Local AI Tutorial</a> \u2014 Local AI with Docker, n8n, Qdrant and Ollama</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
