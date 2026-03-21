import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prohibited AI Practices under EU AI Act | AI Engineering Wiki',
  description: 'Article 5 prohibits certain AI practices. Social Scoring, Emotion Recognition, Biometric Surveillance - what has been forbidden since Feb 2025.',
}

export default function VerboteneAIPraktikenPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Prohibited AI Practices</h1>
        <p className="text-slate-400 mt-2">Compliance · 4 min · Updated: Feb 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mt-0 mb-2">Attention: In Force since 2 February 2025</h2>
          <p className="text-slate-300 mb-0">
            Article 5 of the EU AI Act prohibits certain AI practices absolutely. 
            No balancing, no exceptions — absolute prohibitions with penalties up to <strong>EUR 35M</strong>.
          </p>
        </div>

        <h2>The 6 Prohibited Practices</h2>

        <h3>1. Subversive Manipulation (Art. 5(1)(a))</h3>
        <p className="text-slate-300">
          <strong>What is prohibited:</strong> AI systems that lead people to harmful decisions 
          through "subliminal techniques" or deliberate deception.
        </p>
        <p className="text-slate-300">
          <strong>Example:</strong> An AI tool that manipulates impulsive purchasing behavior through hidden triggers.
        </p>

        <h3>2. Social Scoring (Art. 5(1)(b))</h3>
        <p className="text-slate-300">
          <strong>What is prohibited:</strong> AI systems that evaluate persons based on their 
          social behavior or non-legally justified criteria.
        </p>
        <p className="text-slate-300">
          <strong>Example:</strong> A system that assesses creditworthiness based on social media activity.
        </p>

        <h3>3. Biometric Categorization (Art. 5(1)(c))</h3>
        <p className="text-slate-300">
          <strong>What is prohibited:</strong> Use of biometric data to categorize 
          persons in real-time at public places.
        </p>
        <p className="text-slate-300">
          <strong>Example:</strong> Real-time facial recognition in public places to detect "suspicious behavior".
        </p>

        <h3>4. Emotion Recognition in Workplace (Art. 5(1)(d))</h3>
        <p className="text-slate-300">
          <strong>What is prohibited:</strong> AI systems for emotion recognition in the workplace 
          and educational institutions.
        </p>
        <p className="text-slate-300">
          <strong>Example:</strong> Webcam analysis during job interviews to assess "trustworthiness" or "nervousness".
        </p>

        <h3>5. Untargeted Facial Data Collection (Art. 5(1)(e))</h3>
        <p className="text-slate-300">
          <strong>What is prohibited:</strong> Creating or expanding databases through 
          untargeted collection of facial images from the internet.
        </p>
        <p className="text-slate-300">
          <strong>Example:</strong> Scraping social media profiles to create face recognition databases.
        </p>

        <h3>6. Government Social Scoring Systems (Art. 5(1)(f))</h3>
        <p className="text-slate-300">
          <strong>What is prohibited:</strong> AI systems by government agencies that score citizens based on 
          social behavior.
        </p>
        <p className="text-slate-300">
          <strong>Example:</strong> Automated decisions about social benefits based on "risk scores".
        </p>

        <h2>Exceptions</h2>
        <p className="text-slate-300">
          Certain biometric applications are allowed:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Facial recognition for law enforcement (with authorization)</li>
          <li>Emergency searches (missing persons, terrorism)</li>
          <li>Medical applications</li>
          <li>Critical infrastructure security</li>
        </ul>

        <h2>What Companies Must Do Now</h2>
        <ol className="list-decimal list-inside text-slate-300 space-y-2">
          <li>Check all AI systems for prohibited practices</li>
          <li>Update documentation of existing systems</li>
          <li>Review contracts with AI providers</li>
          <li>Create internal guidelines for permitted AI use</li>
        </ol>

        <h2>Sources</h2>
        <ul>
          <li><a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Original Text (EUR-Lex)</a></li>
          <li><a href="https://www.eyreact.com/eu-ai-act-article-5-complete-guide-to-prohibited-ai-practices/" target="_blank" className="text-blue-400 hover:underline">EYreACT: Article 5 Guide</a></li>
          <li><a href="https://fpf.org/blog/red-lines-under-the-eu-ai-act-understanding-prohibited-ai-practices-and-their-interplay-with-the-gdpr-dsa/" target="_blank" className="text-blue-400 hover:underline">FPF: Red Lines under EU AI Act</a></li>
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
