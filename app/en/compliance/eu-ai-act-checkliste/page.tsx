import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EU AI Act Compliance Checklist | AI Engineering Wiki',
  description: 'Your 7-step guide to EU AI Act readiness. Risk classes, transparency requirements, prohibitions - everything compact.',
}

export default function EUAIActChecklistePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">EU AI Act Compliance Checklist</h1>
        <p className="text-slate-400 mt-2">Compliance · 6 min · Updated: March 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mt-0">The EU AI Act in Brief</h2>
          <p className="text-slate-300 mb-0">
            The EU AI Act (Regulation (EU) 2024/1689) is the world's first comprehensive AI law. 
            Penalties up to <strong>EUR 35 million</strong> or <strong>7% of global annual turnover</strong>.
          </p>
        </div>

        <h2>Timeline: What When</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 text-slate-400">Date</th>
              <th className="text-left py-3 text-slate-400">What Applies</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-3 font-mono text-blue-400">Feb 2025</td>
              <td className="py-3">Prohibitions (Art. 5), AI Literacy (Art. 4)</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-3 font-mono text-blue-400">Aug 2025</td>
              <td className="py-3">GPAI Models (Transparency, Copyright)</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-3 font-mono text-red-400">Aug 2026</td>
              <td className="py-3"><strong>High-Risk Systems</strong> (Main Deadline)</td>
            </tr>
            <tr>
              <td className="py-3 font-mono text-slate-500">Aug 2027</td>
              <td className="py-3">High-risk in regulated products</td>
            </tr>
          </tbody>
        </table>

        <h2>7 Steps to Compliance</h2>

        <h3>1. Create AI System Inventory</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Identify all AI systems in the company</li>
          <li>Document: name, provider, version, purpose</li>
          <li>Assign responsible persons (AI Owner)</li>
          <li>Categorize input/output data</li>
        </ul>

        <h3>2. Conduct Risk Classification</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Risk Level</th>
              <th className="text-left py-2 text-slate-400">Examples</th>
              <th className="text-left py-2 text-slate-400">Obligations</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2 text-red-400 font-bold">Prohibited</td>
              <td className="py-2">Social Scoring, Emotion Recognition</td>
              <td className="py-2">FORBIDDEN</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2 text-blue-400 font-bold">High-Risk</td>
              <td className="py-2">HR Systems, Credit Decisions</td>
              <td className="py-2">Full Compliance</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2 text-yellow-400 font-bold">Limited Risk</td>
              <td className="py-2">Chatbots, Deepfakes</td>
              <td className="py-2">Transparency</td>
            </tr>
            <tr>
              <td className="py-2 text-green-400 font-bold">Minimal</td>
              <td className="py-2">Spam Filters, Recommendations</td>
              <td className="py-2">No extra obligations</td>
            </tr>
          </tbody>
        </table>

        <h3>3. Check Prohibitions (Article 5)</h3>
        <p className="text-slate-300">
          These practices have been <strong>forbidden since 2 February 2025</strong>:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Manipulative AI that leads people to harmful decisions</li>
          <li>Social Scoring - classification by social behavior</li>
          <li>Automated risk assessment by authorities</li>
          <li>Untargeted collection of facial images from the internet</li>
          <li>Emotion recognition in the workplace</li>
          <li>Biometric categorization (exceptions: security)</li>
        </ul>

        <h3>4. Fulfill Transparency Requirements</h3>
        <p className="text-slate-300">For chatbots and AI-generated content:</p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Disclosure: Let users know they are talking to AI</li>
          <li>Labeling: Mark AI-generated images/audio/text as such</li>
          <li>Copyright compliance: Documentation of training data</li>
          <li>Update terms of service</li>
        </ul>

        <h3>5. Ensure AI Literacy (Art. 4)</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Train employees on AI systems</li>
          <li>Document training records</li>
          <li>Establish basic understanding in the company</li>
        </ul>

        <h2>Sources</h2>
        <ul>
          <li><a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Original Text (EUR-Lex)</a></li>
          <li><a href="https://www.littledata.com/eu-ai-act-compliance-checklist/" target="_blank" className="text-blue-400 hover:underline">LittleData EU AI Act Checklist</a></li>
          <li><a href="https://t3-consultants.com/eu-ai-act-compliance-checklist-a-step-by-step-guide/" target="_blank" className="text-blue-400 hover:underline">T3 Consultants Step-by-Step Guide</a></li>
          <li><a href="https://www.eyreact.com/eu-ai-act-article-5-complete-guide-to-prohibited-ai-practices/" target="_blank" className="text-blue-400 hover:underline">EYreACT: Article 5 Guide</a></li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-slate-500">
          All wiki articles are free. Looking for ready-made templates and bundles?
        </p>
        <a
          href="https://www.ai-engineering.at"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block"
        >
          View Products & Bundles →
        </a>
      </div>
    </div>
  )
}
