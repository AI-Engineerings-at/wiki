export const metadata = {
  title: 'Local vs Cloud: TCO Comparison | AI Engineering Wiki',
  description:
    'TCO comparison for AI workloads: cloud APIs vs a local AI stack (Ollama, n8n, monitoring). Costs, risks, privacy and operations in practice.',
}

export default function LokalVsCloud() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Local AI vs Cloud: The TCO Comparison</h1>
        <p className="text-gray-400 mt-2">Basics · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Cloud AI looks cheap — no hardware to buy, no maintenance, just start. 
          But the hidden costs add up. Here's our honest comparison based on real usage.
        </p>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
          <p className="text-blue-300 text-sm">
            <strong>Note:</strong> This is our comparison for the use case "continuous 
            AI agent for business automation". For one-off analyses or prototypes, 
            cloud can be cheaper.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">The Scenarios</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">Cloud Usage</h3>
            <p className="text-gray-300 text-sm">
              100 daily API calls to OpenAI/Gemini/Claude for workflow automation, 
              support chatbot, and content generation.
            </p>
          </div>
          <div className="bg-gray-900 border border-green-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">Local Stack</h3>
            <p className="text-gray-300 text-sm">
              Ollama on your own hardware (RTX 3090), n8n for automation,
              self-hosted monitoring. Everything runs 24/7.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Cost Comparison (per month)</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Cost Item</th>
                <th className="text-right py-2 text-gray-400">Cloud</th>
                <th className="text-right py-2 text-gray-400">Local</th>
                <th className="text-right py-2 text-gray-400">Difference</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">API costs</td>
                <td className="text-right py-2 text-red-400">€150-300</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2 text-red-400">-€150-300</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Hardware/Amortization</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2">€25-50</td>
                <td className="text-right py-2 text-green-400">+€25-50</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Electricity (estimated)</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2">€20-40</td>
                <td className="text-right py-2 text-green-400">+€20-40</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Hosting/Server</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2">€10-20</td>
                <td className="text-right py-2 text-green-400">+€10-20</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Monitoring/Tools</td>
                <td className="text-right py-2">€20-50</td>
                <td className="text-right py-2">€0*</td>
                <td className="text-right py-2 text-green-400">-€20-50</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">GDPR compliance</td>
                <td className="text-right py-2 text-red-400">€50-200</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2 text-green-400">-€50-200</td>
              </tr>
              <tr className="border-t-2 border-gray-600">
                <td className="py-2 font-semibold text-white">Total/Month</td>
                <td className="text-right py-2 font-semibold text-red-400">€220-550</td>
                <td className="text-right py-2 font-semibold text-green-400">€55-110</td>
                <td className="text-right py-2 font-semibold text-green-400">-€165-440</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-500 text-xs mt-2">*Grafana + Prometheus are open source, free</p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">The Hidden Cloud Costs</h2>
        
        <ul className="list-disc list-inside text-gray-300 space-y-3 mt-4">
          <li>
            <strong>API costs escalate</strong> — The more workflows you automate, 
            the more calls. Often 2-3x higher than initially planned.
          </li>
          <li>
            <strong>GDPR risk</strong> — Data goes to the US. Art. 44 ff. GDPR 
            requires additional measures (SCCs, TIAs). Legal counsel: €1,000+.
          </li>
          <li>
            <strong>Vendor lock-in</strong> — Your prompts, workflows, data are with 
            the provider. Switching is expensive and time-consuming.
          </li>
          <li>
            <strong>Rate limits</strong> — Cloud providers throttle with heavy usage. 
            Business plans cost extra again.
          </li>
          <li>
            <strong>Data incidents</strong> — Every data leak is your problem. 
            Local systems = less risk.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">When Cloud is Cheaper</h2>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Use Case</th>
                <th className="text-left py-2 text-gray-400">Recommendation</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Prototype (few calls/month)</td>
                <td className="py-2 text-green-400">Cloud — no setup needed</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">One-off analyses</td>
                <td className="py-2 text-green-400">Cloud — pay-as-you-go</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">No budget for hardware</td>
                <td className="py-2 text-green-400">Start cloud, switch later</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Few internal tools</td>
                <td className="py-2 text-green-400">Cloud — overscale for little use</td>
              </tr>
              <tr>
                <td className="py-2 text-white font-semibold">Continuous automation (our use case)</td>
                <td className="py-2 text-green-400 font-semibold">Local — cheaper after 6 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Break-Even Analysis</h2>
        
        <p className="text-gray-300">
          When does switching to local make sense?
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <pre className="text-gray-300">
{`Assumptions:
- RTX 3090 used: €600 (amortized over 24 months = €25/month)
- Electricity: €30/month
- Other costs (hosting, maintenance): €20/month
- Total local: ~€75/month

Break-even with cloud (estimated €200/month):
→ After 3 months: €600 (cloud) vs €225 (local) = €375 saved
→ After 12 months: €2,400 (cloud) vs €900 (local) = €1,500 saved
→ After 24 months: €4,800 (cloud) vs €1,800 (local) = €3,000 saved`}
          </pre>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Hardware Recommendations</h2>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">GPU</th>
                <th className="text-left py-2 text-gray-400">VRAM</th>
                <th className="text-left py-2 text-gray-400">Price (used)</th>
                <th className="text-left py-2 text-gray-400">Models</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">RTX 3060</td>
                <td className="py-2">12GB</td>
                <td className="py-2">€200-250</td>
                <td className="py-2">Llama 3.2 7B, Mistral 7B</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">RTX 4070</td>
                <td className="py-2">12GB</td>
                <td className="py-2">€400-500</td>
                <td className="py-2">Llama 3.1 8B, Qwen 14B</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">RTX 3090</td>
                <td className="py-2">24GB</td>
                <td className="py-2">€500-700</td>
                <td className="py-2">Llama 3.1 70B (Quantized)</td>
              </tr>
              <tr>
                <td className="py-2">RTX 4090</td>
                <td className="py-2">24GB</td>
                <td className="py-2">€1,200-1,500</td>
                <td className="py-2">Llama 3.1 70B, Qwen 72B</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Our Recommendation</h2>
        
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-2">Hybrid Approach (our setup)</h3>
          <ul className="text-gray-300 space-y-2">
            <li><strong>Local:</strong> Ollama for regular tasks, n8n workflows, monitoring</li>
            <li><strong>Cloud:</strong> GPT-4o for complex reasoning tasks (few calls/month)</li>
            <li><strong>Result:</strong> Best of both worlds — cost-efficient and powerful</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Conclusion</h3>
          <p className="text-gray-300">
            At ~100 API calls per month, local becomes cheaper. Plus you get 
            GDPR benefits (no third-country transfer) and independence from 
            cloud providers. Our recommendation: Start with cloud (prototype), 
            then switch to local (production).
          </p>
        </div>
      </div>
    </div>
  )
}
