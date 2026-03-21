import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EU AI Act Compliance Checkliste | AI Engineering Wiki',
  description: 'Ihre 7-Schritte Checkliste zur EU AI Act Bereitschaft. Risikoklassen, Transparenzpflichten, Verbote - alles kompakt.',
}

export default function EUAIActChecklistePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">EU AI Act Compliance Checkliste</h1>
        <p className="text-slate-400 mt-2">Compliance · 6 min · Stand: März 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mt-0">Der EU AI Act in Kürze</h2>
          <p className="text-slate-300 mb-0">
            Der EU AI Act (Verordnung (EU) 2024/1689) ist das weltweit erste umfassende KI-Gesetz. 
            Strafen bis zu <strong>€35 Millionen</strong> oder <strong>7% des globalen Jahresumsatzes</strong>.
          </p>
        </div>

        <h2>Zeitplan: Wann was gilt</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 text-slate-400">Datum</th>
              <th className="text-left py-3 text-slate-400">Was gilt</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-3 font-mono text-blue-400">Feb 2025</td>
              <td className="py-3">Verbote (Art. 5), AI Literacy (Art. 4)</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-3 font-mono text-blue-400">Aug 2025</td>
              <td className="py-3">GPAI Modelle (Transparenz, Copyright)</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-3 font-mono text-red-400">Aug 2026</td>
              <td className="py-3"><strong>High-Risk Systeme</strong> (Haupttermin)</td>
            </tr>
            <tr>
              <td className="py-3 font-mono text-slate-500">Aug 2027</td>
              <td className="py-3">Hochrisiko in regulierten Produkten</td>
            </tr>
          </tbody>
        </table>

        <figure className="my-8">
          <img src="/images/infographics/eu-ai-act-7-schritte-checkliste.png" alt="EU AI Act 7 Schritte Checkliste — Von Inventory bis Monitoring" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">EU AI Act: 7 Schritte zur Compliance — deine Checkliste</figcaption>
        </figure>

        <h2>7 Schritte zur Compliance</h2>

        <h3>1. AI System Inventory erstellen</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Alle KI-Systeme im Unternehmen identifizieren</li>
          <li>Dokumentieren: Name, Anbieter, Version, Zweck</li>
          <li>Verantwortliche Personen zuweisen (AI Owner)</li>
          <li>Input-/Output-Daten kategorisieren</li>
        </ul>

        <figure className="my-8">
          <img src="/images/infographics/eu-ai-act-risikoklassen-entscheidungsbaum.png" alt="EU AI Act Risikoklassen Entscheidungsbaum — Verboten, Hoch, Begrenzt, Minimal" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Risikoklassen-Entscheidungsbaum: In welche Kategorie faellt dein KI-System?</figcaption>
        </figure>

        <h3>2. Risikoklassifizierung durchführen</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Risikostufe</th>
              <th className="text-left py-2 text-slate-400">Beispiele</th>
            <th className="text-left py-2 text-slate-400">Pflichten</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2 text-red-400 font-bold">Verboten</td>
              <td className="py-2">Social Scoring, Emotion Recognition</td>
              <td className="py-2">VERBOTEN</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2 text-blue-400 font-bold">Hochriskant</td>
              <td className="py-2">HR-Systeme, Kreditvergabe</td>
              <td className="py-2">Vollständige Compliance</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2 text-yellow-400 font-bold">Begrenztes Risiko</td>
              <td className="py-2">Chatbots, Deepfakes</td>
              <td className="py-2">Transparenzpflichten</td>
            </tr>
            <tr>
              <td className="py-2 text-green-400 font-bold">Minimal</td>
              <td className="py-2">Spam-Filter, Empfehlungen</td>
              <td className="py-2">Keine zusätzlichen Pflichten</td>
            </tr>
          </tbody>
        </table>

        <h3>3. Verbote prüfen (Article 5)</h3>
        <p className="text-slate-300">
          Diese Praktiken sind seit <strong>2. Februar 2025 verboten</strong>:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Manipulative KI, die Menschen zu schädlichen Entscheidungen bringt</li>
          <li>Social Scoring - Klassifizierung nach Sozialverhalten</li>
          <li>Automatisierte Risikobewertung durch Behörden</li>
          <li>Ungezieltes Sammeln von Gesichtsbildern aus dem Internet</li>
          <li>Emotion Recognition am Arbeitsplatz</li>
          <li>Biometrische Kategorisierung (Ausnahmen: Sicherheit)</li>
        </ul>

        <h3>4. Transparenzpflichten erfüllen</h3>
        <p className="text-slate-300">Für Chatbots und KI-generierte Inhalte:</p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Offenlegung: Nutzer wissen lassen, dass sie mit KI sprechen</li>
          <li>Kennzeichnung: KI-generierte Bilder/Audio/Texte als solche markieren</li>
          <li>Copyright-Compliance: Dokumentation der Trainingsdaten</li>
          <li>Nutzungsbedingungen aktualisieren</li>
        </ul>

        <h3>5. AI Literacy sicherstellen (Art. 4)</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Mitarbeiter im Umgang mit KI-Systemen schulen</li>
          <li>Schulungsnachweise dokumentieren</li>
          <li>Grundverständnis im Unternehmen etablieren</li>
        </ul>

        <h3>6. Dokumentation erstellen</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Technische Dokumentation für High-Risk Systeme</li>
          <li>Risikomanagement-Prozess dokumentieren</li>
          <li>Menschliche Aufsicht definieren</li>
        </ul>

        <h3>7. Monitoring einrichten</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Regelmäßige Überprüfung der AI-Systeme</li>
          <li>Prozess für Betroffenenbeschwerden</li>
          <li>Update-Prozess bei Regulierungsänderungen</li>
        </ul>

        <h2>Quellen</h2>
        <ul>
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Originaltext (EUR-Lex)</a></li>
          <li><a href="https://www.littledata.com/eu-ai-act-compliance-checklist/" target="_blank" className="text-blue-400 hover:underline">LittleData EU AI Act Checklist</a></li>
          <li><a href="https://t3-consultants.com/eu-ai-act-compliance-checklist-a-step-by-step-guide/" target="_blank" className="text-blue-400 hover:underline">T3 Consultants Step-by-Step Guide</a></li>
          <li><a href="https://www.eyreact.com/eu-ai-act-article-5-complete-guide-to-prohibited-ai-practices/" target="_blank" className="text-blue-400 hover:underline">EYreACT: Article 5 Guide</a></li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">DSGVO Compliance Bundle</h3>
            <p className="text-slate-300 mb-4">
              Alle Templates die du brauchst: Art. 30 VVT, DPIA, AVV-Checkliste, 
              EU AI Act Readiness Checkliste und mehr.
            </p>
            <ul className="text-sm text-slate-400 space-y-1 mb-4">
              <li>✓ Art. 30 Verarbeitungsverzeichnis (AI-Edition)</li>
              <li>✓ DPIA für KI-Systeme</li>
              <li>✓ EU AI Act Checkliste</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white mb-1">€79</div>
            <div className="text-sm text-slate-500 line-through mb-3">€129</div>
            <a 
              href="https://buy.stripe.com/bJe7sLb7N92ha9MejWfQI02" 
              className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-slate-950 font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Jetzt kaufen
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}