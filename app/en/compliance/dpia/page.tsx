export const metadata = {
  title: 'Data Protection Impact Assessment (DPIA) | AI Engineering Wiki',
  description:
    'DPIA for AI systems: When is a Data Protection Impact Assessment required, how to conduct one, and what to document.',
}

export default function DPIAPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Data Protection Impact Assessment (DPIA)</h1>
        <p className="text-gray-400 mt-2">Compliance · 8 min · Updated: March 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          A Data Protection Impact Assessment (DPIA) is required under Art. 35 GDPR
          when data processing is likely to result in a high risk to the rights and
          freedoms of natural persons. This is frequently the case with AI systems.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">When is a DPIA required?</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Automated individual decision-making</strong> with legal effects (Art. 22 GDPR)</li>
          <li><strong>Large-scale processing</strong> of special categories of personal data</li>
          <li><strong>Systematic monitoring</strong> of publicly accessible areas</li>
          <li><strong>Profiling</strong> with significant effects on data subjects</li>
          <li><strong>New technologies</strong> (AI systems qualify as new technology)</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">DPIA Process in 6 Steps</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ol className="text-gray-300 space-y-3">
            <li><strong>1. Describe the processing</strong> — What data, what purpose, what legal basis, what recipients?</li>
            <li><strong>2. Assess necessity and proportionality</strong> — Is the processing necessary? Are there less intrusive alternatives?</li>
            <li><strong>3. Evaluate risks to data subjects</strong> — Likelihood and severity of potential harm.</li>
            <li><strong>4. Define mitigation measures</strong> — Technical and organizational measures, pseudonymization, access controls.</li>
            <li><strong>5. Create documentation</strong> — Record findings, measures, and residual risks.</li>
            <li><strong>6. Review regularly</strong> — A DPIA is not a one-time document — update when the system changes.</li>
          </ol>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">DPIA and EU AI Act</h2>

        <p className="text-gray-300">
          The EU AI Act supplements the GDPR DPIA with AI-specific requirements:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>High-risk AI systems require a DPIA plus an AI-specific risk assessment</li>
          <li>Art. 27 EU AI Act requires a fundamental rights impact assessment for certain deployers</li>
          <li>The DPIA can be combined with the AI risk assessment</li>
        </ul>

        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-2">Self-Hosted AI Advantage</h3>
          <p className="text-gray-300">
            With self-hosted AI (e.g., Ollama locally), the DPIA is significantly simpler:
            no third-country transfers, no data processing agreements needed, full control
            over data. Residual risk is lower than with cloud AI.
          </p>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Further Reading</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <a href="/en/compliance/dsgvo-grundlagen" className="text-blue-400 hover:underline">GDPR Basics</a></li>
            <li>&#8226; <a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act Overview</a></li>
            <li>&#8226; <a href="/en/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">AI Literacy (Art. 4)</a></li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Sources</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679" target="_blank" className="text-blue-400 hover:underline">GDPR Art. 35 — Data Protection Impact Assessment (EUR-Lex)</a></li>
        </ul>
      </div>
    </div>
  )
}
