import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Practices | AI Engineering Wiki',
  description: 'Practical implementation — TOM, DPA, documentation, data subject rights.',
}

export default function DatenschutzPraxisPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Privacy Practices</h1>
        <p className="text-slate-400 mt-2">Compliance · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          Practical steps to implement data protection in your AI projects.
        </p>

        <h2>Technical & Organizational Measures (TOM)</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Encryption at rest and in transit</li>
          <li>Access controls and authentication</li>
          <li>Logging and monitoring</li>
          <li>Regular security testing</li>
          <li>Staff training</li>
          <li>Incident response plan</li>
        </ul>

        <h2>Data Processing Agreement (DPA)</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Contract with all processors</li>
          <li>Processors must meet GDPR standards</li>
          <li>Right to audit</li>
          <li>Sub-processor approval required</li>
        </ul>

        <h2>Documentation</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Art. 30 Processing Records</li>
          <li>Data Protection Impact Assessment (DPIA)</li>
          <li>Consent management</li>
          <li>Processing purposes</li>
          <li>Retention schedules</li>
        </ul>

        <h2>Data Subject Rights</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Right</th>
              <th className="text-left py-2 text-slate-400">Deadline</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">Access</td>
              <td className="py-2">1 month</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Rectification</td>
              <td className="py-2">1 month</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Erasure</td>
              <td className="py-2">1 month</td>
            </tr>
            <tr>
              <td className="py-2">Portability</td>
              <td className="py-2">1 month</td>
            </tr>
          </tbody>
        </table>

        <h2>AI-Specific Considerations</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Log AI decisions for accountability</li>
          <li>Document training data sources</li>
          <li>Implement human oversight</li>
          <li>Regular bias testing</li>
          <li>Transparency in AI communications</li>
        </ul>
      </div>
    </div>
  )
}
