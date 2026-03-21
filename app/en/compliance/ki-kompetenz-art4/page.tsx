export const metadata = {
  title: 'AI Literacy under Art. 4 EU AI Act | AI Engineering Wiki',
  description:
    'Art. 4 EU AI Act: AI literacy obligation applies since Feb 2, 2025. Enforcement from Aug 2026, penalties up to EUR 15M. Practical guide for SMEs.',
}

export default function AILiteracyArt4Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Literacy under Art. 4 EU AI Act</h1>
        <p className="text-gray-400 mt-2">Compliance · 12 min · Updated: March 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4 mt-4">
          <p className="text-orange-300 text-sm">
            <strong>ATTENTION: Art. 4 AI Literacy applies since 2 February 2025!</strong> The AI
            literacy obligation is not a future deadline — it is already in force.
            Companies using AI systems must <strong>now</strong> ensure that their staff has
            sufficient AI literacy. There is no single certification, no mandatory AI Officer
            role, and no one-size-fits-all training requirement.
            <strong> Enforcement with penalties up to EUR 15 million or 3% of global annual
            turnover</strong> starts from <strong>August 2026</strong>.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">What is Art. 4?</h2>
        <p className="text-gray-300">
          Article 4 of the EU AI Act (Regulation (EU) 2024/1689) requires <strong>all
          providers and deployers</strong> of AI systems to ensure that their staff has
          a sufficient level of AI literacy. This applies regardless of the risk class
          of the AI system — including minimal-risk applications like chatbots or
          recommendation engines.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Who is affected?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Role</th>
                <th className="text-left py-2 text-gray-400">Examples</th>
                <th className="text-left py-2 text-gray-400">Affected?</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">AI Providers</td>
                <td className="py-2">Software vendors, SaaS with AI features</td>
                <td className="py-2 text-red-400 font-bold">Yes</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">AI Deployers</td>
                <td className="py-2">Any company using AI tools</td>
                <td className="py-2 text-red-400 font-bold">Yes</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Staff</td>
                <td className="py-2">All employees operating or working with AI</td>
                <td className="py-2 text-red-400 font-bold">Yes</td>
              </tr>
              <tr>
                <td className="py-2">End users (private)</td>
                <td className="py-2">Personal ChatGPT use</td>
                <td className="py-2 text-green-400">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-300 mt-4">
          In Austria alone, an estimated <strong>400,000 companies</strong> are affected —
          every SME using ChatGPT, Copilot, AI-powered accounting or any other AI tool.
          The same applies to all companies in the EU/EEA.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">What must be trained?</h2>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">1. AI Fundamentals</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>What AI is, what it can do, what it cannot</li>
              <li>Difference between rule-based systems and machine learning</li>
              <li>Key concepts: model, training, inference, hallucination</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">2. Risks and Limitations</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>Bias and discrimination in AI outputs</li>
              <li>Hallucinations and incorrect outputs</li>
              <li>Privacy risks with cloud AI (third-country transfers)</li>
              <li>Manipulation risks (prompt injection)</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">3. Legal Framework</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>EU AI Act risk classes (Prohibited, High, Limited, Minimal)</li>
              <li>Transparency requirements (labeling AI-generated content)</li>
              <li>GDPR requirements for AI usage</li>
              <li>Documentation obligations</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">4. Practical Application</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>Responsible use of AI tools in daily work</li>
              <li>When to verify AI results, when to trust them</li>
              <li>Reporting obligations for malfunctions</li>
              <li>Ensuring human oversight</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Penalties</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Violation</th>
                <th className="text-left py-2 text-gray-400">Penalty</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Prohibited AI practices (Art. 5)</td>
                <td className="py-2 text-red-400 font-bold">Up to EUR 35M or 7% revenue</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Non-compliance with Art. 4 (AI literacy)</td>
                <td className="py-2 text-red-400 font-bold">Up to EUR 15M or 3% revenue</td>
              </tr>
              <tr>
                <td className="py-2">False information to authorities</td>
                <td className="py-2 text-red-400 font-bold">Up to EUR 7.5M or 1% revenue</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-500 text-xs mt-2">
            For SMEs and startups, proportionate caps apply — whichever amount is lower.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Checklist: Implementing AI Literacy</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-gray-300 space-y-2">
            <li>1. <strong>Create inventory:</strong> Which AI systems does your company use?</li>
            <li>2. <strong>Identify affected staff:</strong> Who works with AI?</li>
            <li>3. <strong>Assess training needs:</strong> What competency level is required (based on role and risk class)?</li>
            <li>4. <strong>Conduct training:</strong> Fundamentals, risks, legal framework, practical application</li>
            <li>5. <strong>Document everything:</strong> Keep training records (who, when, what)</li>
            <li>6. <strong>Repeat regularly:</strong> AI evolves fast — update training annually</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Further Reading</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act Overview</a></li>
            <li>&#8226; <a href="/en/compliance/eu-ai-act-checkliste" className="text-blue-400 hover:underline">EU AI Act Compliance Checklist</a></li>
            <li>&#8226; <a href="/en/compliance/verbotene-ai-praktiken" className="text-blue-400 hover:underline">Prohibited AI Practices (Art. 5)</a></li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Sources</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Full Text (EUR-Lex)</a></li>
          <li><a href="https://artificialintelligenceact.eu/article/4/" target="_blank" className="text-blue-400 hover:underline">Art. 4 AI Literacy (AI Act Explorer)</a></li>
          <li><a href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers" target="_blank" className="text-blue-400 hover:underline">EU Commission: AI Literacy — Questions and Answers</a></li>
        </ul>
      </div>
    </div>
  )
}
