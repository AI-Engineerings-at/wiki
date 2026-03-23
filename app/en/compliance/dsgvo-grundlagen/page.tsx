import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDPR Basics | AI Engineering Wiki',
  description: 'What does GDPR mean for AI applications? Data protection, consent, retention.',
}

export default function DSGVOGrundlagenPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">GDPR Basics</h1>
        <p className="text-slate-400 mt-2">Compliance · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          GDPR (German: DSGVO) is the European data protection regulation. It applies to any company 
          processing personal data of EU citizens - regardless of where the company is located.
        </p>

        <h2>Key Principles</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>Lawfulness:</strong> You need a legal basis for processing</li>
          <li><strong>Purpose limitation:</strong> Only use data for stated purposes</li>
          <li><strong>Data minimization:</strong> Only collect what you need</li>
          <li><strong>Accuracy:</strong> Keep data accurate</li>
          <li><strong>Storage limitation:</strong> Delete when no longer needed</li>
          <li><strong>Integrity & confidentiality:</strong> Secure processing</li>
        </ul>

        <h2>Legal Bases (Art. 6)</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Basis</th>
              <th className="text-left py-2 text-slate-400">Description</th>
              <th className="text-left py-2 text-slate-400">AI Example</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">Consent</td>
              <td className="py-2">Voluntary, revocable</td>
              <td className="py-2">Newsletter, personalization</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Contract</td>
              <td className="py-2">Necessary for contract</td>
              <td className="py-2">Order processing</td>
            </tr>
            <tr>
              <td className="py-2">Legitimate interest</td>
              <td className="py-2">Balance with data subject rights</td>
              <td className="py-2">Fraud prevention</td>
            </tr>
          </tbody>
        </table>

        <h2>Rights of Data Subjects (Art. 15-22)</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li><strong>Right of access (Art. 15)</strong> — What data is processed?</li>
          <li><strong>Right to rectification (Art. 16)</strong> — Correct wrong data</li>
          <li><strong>Right to erasure (Art. 17)</strong> — "Right to be forgotten"</li>
          <li><strong>Right to restriction (Art. 18)</strong> — Stop processing</li>
          <li><strong>Data portability (Art. 20)</strong> — Move data to another system</li>
          <li><strong>Right to object (Art. 21)</strong> — Object to certain processing</li>
        </ul>

        <h2>Local AI = GDPR Advantage</h2>
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mt-4">
          <ul className="text-green-300 space-y-2">
            <li>✅ <strong>No third-country transfer</strong> — Data stays in EU</li>
            <li>✅ <strong>Full control</strong> — You decide who has access</li>
            <li>✅ <strong>No third-country transfer needed</strong> — Data stays in the EU (Art. 44 ff. GDPR)</li>
            <li>✅ <strong>Easy documentation</strong> — All on your hardware</li>
            <li>✅ <strong>Fast deletion</strong> — Physical control over data</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Related articles:{' '}
          <a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:text-blue-300">EU AI Act</a>
          {' · '}
          <a href="/en/compliance/chatbot-transparenzpflichten" className="text-blue-400 hover:text-blue-300">Chatbot Transparency</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          For implementation support, find <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">resources</a> at ai-engineering.at.
        </p>
      </div>
    </div>
  )
}
