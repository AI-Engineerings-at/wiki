import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI in the Enterprise | AI Engineering Wiki',
  description: 'Why companies use local AI: data privacy (GDPR), cost control, and operational sovereignty.',
}

export default function KIUnternehmenPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AI in the Enterprise</h1>
        <p className="text-slate-400 mt-2">Basics · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2>The Paradigm Shift</h2>
        <p className="text-slate-300">
          Cloud AI is fast to start, but not always the right default. Local AI gives you data sovereignty,
          predictable costs, and control over access and operations.
        </p>

        <h2>Benefits of Local AI</h2>
        <h3>1. Data Sovereignty</h3>
        <p className="text-slate-300">
          Your data never leaves your network. Less compliance risk, fewer GDPR headaches.
          You control access and what happens with your data.
        </p>

        <h3>2. Costs</h3>
        <p className="text-slate-300">
          No pay-per-token fees. After the initial setup, ongoing costs are predictable 
          and often 70-90% lower than cloud alternatives.
        </p>

        <h3>3. Latency</h3>
        <p className="text-slate-300">
          Local models respond in milliseconds. No network dependency, no downtime 
          due to internet issues.
        </p>

        <h3>4. Customization</h3>
        <p className="text-slate-300">
          You can fine-tune models, create own embeddings, implement RAG - all 
          without external dependencies.
        </p>

        <h2>Typical Use Cases</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>Customer Support:</strong> Automated German-language responses</li>
          <li><strong>Document Processing:</strong> Contract analysis, invoice parsing</li>
          <li><strong>Internal Search:</strong> Search knowledge base</li>
          <li><strong>Code Assistance:</strong> Custom coding model for your team</li>
        </ul>

        <h2>Requirements</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>At least 16GB RAM (better 32GB+)</li>
          <li>Modern CPU or GPU for fast inference</li>
          <li>Basic understanding of Docker / Linux</li>
          <li>IT resources for maintenance</li>
        </ul>

        <h2>Cost Comparison (Example)</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2">Scenario</th>
              <th className="py-2">Cloud (GPT-4)</th>
              <th className="py-2">Local (Llama 3)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800">
              <td className="py-2">10,000 requests/month</td>
              <td className="py-2">~EUR 200</td>
              <td className="py-2">~EUR 20 (electricity)</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">100,000 requests/month</td>
              <td className="py-2">~EUR 2,000</td>
              <td className="py-2">~EUR 50</td>
            </tr>
            <tr>
              <td className="py-2">Setup costs</td>
              <td className="py-2">0 EUR</td>
              <td className="py-2">~EUR 2,000</td>
            </tr>
          </tbody>
        </table>

        <h2>Conclusion</h2>
        <p className="text-slate-300">
          Local AI is not for everyone. If you take privacy seriously, want cost control, and can run the stack,
          local is often the better option. Break-even is frequently around 20,000-50,000 API calls per month.
        </p>
      </div>
    </div>
  )
}
