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
          The EU AI Act is the worlds first comprehensive AI regulation. It classifies AI systems by risk.
        </p>

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

        <h2>Timeline</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>Feb 2025:</strong> Prohibitions (Art. 5), AI Literacy</li>
          <li><strong>Aug 2025:</strong> GPAI models</li>
          <li><strong>Aug 2026:</strong> High-risk systems (MAIN)</li>
          <li><strong>Aug 2027:</strong> Regulated products</li>
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
      </div>
    </div>
  )
}
