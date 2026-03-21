import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EU AI Act | AI Engineering Wiki',
  description: 'Risk classes, prohibitions, transparency requirements for AI systems in the EU.',
}

export default function EUAIActPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">EU AI Act</h1>
        <p className="text-slate-400 mt-2">Compliance · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          The EU AI Act (Regulation 2024/1689) was published on <strong>12 July 2024</strong> and
          entered into force on <strong>1 August 2024</strong>. It is the world&apos;s first
          comprehensive AI regulation. Some obligations — such as the prohibitions (Art. 5) and
          AI literacy (Art. 4) — have been applicable since <strong>2 February 2025</strong>.
          Full application with enforcement and penalties starts from <strong>2 August 2026</strong>.
        </p>

        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 my-6">
          <div className="font-bold text-white mb-2">
            Art. 4 AI Literacy ALREADY APPLIES
          </div>
          <div className="text-white/70 text-sm leading-relaxed">
            <p>
              The AI literacy obligation (Art. 4) has been in force since <strong>2 February 2025</strong>.
              There is no single certification, no mandatory AI Officer role, and no
              one-size-fits-all training requirement. Enforcement and supervision
              starts from <strong>August 2026</strong>.
            </p>
          </div>
        </div>

        <h2>Risk Classes</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Class</th>
              <th className="text-left py-2 text-slate-400">Examples</th>
              <th className="text-left py-2 text-slate-400">Requirements</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2 text-red-400 font-bold">Unacceptable</td>
              <td className="py-2">Social scoring, manipulation</td>
              <td className="py-2">BANNED</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2 text-blue-400 font-bold">High</td>
              <td className="py-2">HR, credit, biometric</td>
              <td className="py-2">Full compliance</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2 text-yellow-400 font-bold">Limited</td>
              <td className="py-2">Chatbots, deepfakes</td>
              <td className="py-2">Transparency</td>
            </tr>
            <tr>
              <td className="py-2 text-green-400 font-bold">Minimal</td>
              <td className="py-2">Spam filters</td>
              <td className="py-2">None</td>
            </tr>
          </tbody>
        </table>

        <h2>Typical Business AI Scenarios</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Scenario</th>
              <th className="text-left py-2 text-slate-400">Risk Level</th>
              <th className="text-left py-2 text-slate-400">Obligations</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">LLM for content creation</td>
              <td className="py-2">Minimal to Limited</td>
              <td className="py-2">Transparency when publishing without human review</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">AI customer support chatbot</td>
              <td className="py-2">Limited</td>
              <td className="py-2">Users must know they are talking to AI. If it makes service decisions, may be high-risk.</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Internal productivity (email, code, summaries)</td>
              <td className="py-2">Minimal</td>
              <td className="py-2">No specific obligations, but documentation recommended</td>
            </tr>
            <tr>
              <td className="py-2">AI for recruiting (CV screening, candidate ranking)</td>
              <td className="py-2 text-red-400 font-semibold">High</td>
              <td className="py-2">Full compliance: documentation, risk management, human oversight</td>
            </tr>
          </tbody>
        </table>

        <h2>High-Risk Requirements Detail</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><strong>Risk management system:</strong> Documented, ongoing process to identify, analyze, and mitigate risks — not a one-time assessment</li>
          <li><strong>Data governance:</strong> Training and test data must meet quality criteria. Document data sources, preparation methods, and potential biases</li>
          <li><strong>Technical documentation:</strong> Detailed documentation before market placement including intended purpose, design methodology, and test results</li>
          <li><strong>Record-keeping:</strong> Automatic logging of AI system operations for traceability. Provide to authorities on request</li>
          <li><strong>Transparency:</strong> Clear information about capabilities, limitations, and intended use</li>
          <li><strong>Human oversight:</strong> Humans can understand capabilities and limits, intervene in decisions, and choose not to use the system</li>
        </ul>

        <h2>Timeline</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>12 Jul 2024:</strong> Published in EU Official Journal</li>
          <li><strong>1 Aug 2024:</strong> Entered into force</li>
          <li><strong className="text-green-400">2 Feb 2025:</strong> <strong>Prohibitions (Art. 5) + AI Literacy (Art. 4) ALREADY APPLY</strong></li>
          <li><strong>2 Aug 2025:</strong> Governance rules + GPAI models</li>
          <li><strong className="text-red-400">2 Aug 2026:</strong> <strong>Full application (high-risk etc.) + enforcement/supervision starts</strong></li>
          <li><strong>2 Aug 2027:</strong> High-risk AI in regulated products</li>
        </ul>

        <h2>Penalties</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Unacceptable risk: EUR 35M or 7% global revenue</li>
          <li>Non-compliance: EUR 15M or 3% global revenue</li>
          <li>Incorrect information: EUR 7.5M or 1% global revenue</li>
        </ul>

        <h2>What Local AI Helps With</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>No third-country transfer</li>
          <li>Full documentation possible</li>
          <li>Transparency easier to implement</li>
          <li>Data stays in EU</li>
        </ul>
        <h2>Sources</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EUR-Lex: Regulation (EU) 2024/1689 — EU AI Act Full Text</a></li>
          <li><a href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EU Commission: AI Literacy — Questions and Answers</a></li>
        </ul>
      </div>
    </div>
  )
}
