export const metadata = {
  title: 'AI Cost Comparison | AI Engineering Wiki',
  description:
    'Realistic 2026 cost comparison: local vs cloud vs hybrid AI. Setup, ongoing cost, GPU/hardware and typical business workloads.',
}

export default function AiKostenVergleich() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Costs: Local vs Cloud vs Hybrid</h1>
        <p className="text-gray-400 mt-2">Basics · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          What does AI cost in 2026? Here's a practical comparison of local models, cloud APIs, and hybrid setups.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Cost Overview 2026</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Option</th>
                <th className="text-left py-2 text-gray-400">Setup</th>
                <th className="text-left py-2 text-gray-400">Ongoing/Month</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Cloud API (GPT-4)</td>
                <td className="py-2">€0</td>
                <td className="py-2">€100-500</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Cloud API (Claude)</td>
                <td className="py-2">€0</td>
                <td className="py-2">€50-200</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Local (RTX 3090)</td>
                <td className="py-2">€600</td>
                <td className="py-2">€30-50</td>
              </tr>
              <tr>
                <td className="py-2">Hybrid</td>
                <td className="py-2">€400</td>
                <td className="py-2">€30-100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Break-Even</h2>
        <p className="text-gray-300 mt-2">
          Local often becomes cheaper at around 100,000 tokens/month compared to cloud (depends on model and prompt length).
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Sources</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-sm text-gray-300 space-y-3">
            <li>
              <a href="https://aidevdayindia.org/blogs/best-ai-laptop-2026/cost-of-running-llm-locally-vs-cloud.html" className="text-blue-400 hover:underline">
                AI Dev Day: Cost of Running LLM Locally vs Cloud 2026
              </a>
              <p className="text-gray-500 text-xs mt-1">
                ROI analysis for developers (Feb 2026).
              </p>
            </li>
            <li>
              <a href="https://www.aipricingmaster.com/blog/self-hosting-ai-models-cost-vs-api" className="text-blue-400 hover:underline">
                AI Pricing Master: Self-Hosting vs API Pricing
              </a>
              <p className="text-gray-500 text-xs mt-1">
                Complete cost analysis (Jan 2026).
              </p>
            </li>
            <li>
              <a href="https://betonai.net/the-real-cost-of-running-ai-in-2026-complete-pricing-breakdown/" className="text-blue-400 hover:underline">
                Bet on AI: Real Cost of Running AI 2026
              </a>
              <p className="text-gray-500 text-xs mt-1">
                Complete pricing breakdown.
              </p>
            </li>
            <li>
              <a href="https://localaimaster.com/blog/local-ai-vs-chatgpt-cost" className="text-blue-400 hover:underline">
                LocalAIMaster: Local vs ChatGPT Cost
              </a>
              <p className="text-gray-500 text-xs mt-1">
                5-year TCO comparison.
              </p>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Recommendation</h2>
        <p className="text-gray-300 mt-2">
          Start with cloud if you want to validate quickly. For ongoing workloads (automation, internal tools), local usually wins.
          For many teams, hybrid is the default: local for volume, cloud for occasional high-end tasks.
        </p>
      </div>
    </div>
  )
}
