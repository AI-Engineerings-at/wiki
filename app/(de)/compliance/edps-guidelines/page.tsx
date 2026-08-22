import Callout from "../../../../components/Callout"
import { alternatesFor } from '../../../../lib/alternates'
import { ArticleHero } from '../../../../components/ArticleHero'

export const metadata = {
  openGraph: {
    type: 'article',
    images: [{ url: '/images/hero-2026-08/de/compliance/edps-guidelines.webp', width: 1344, height: 768, type: 'image/webp' }],
  },
  alternates: alternatesFor('/compliance/edps-guidelines'),
  title: 'EDPS Guidelines — Was der EU-Datenschutzbeauftragte für KI vorgibt',
  description:
    'Der European Data Protection Supervisor (EDPS) veröffentlicht verbindliche Guidelines für den KI-Einsatz in EU-Institutionen und sie sind De-facto-Maßstab auch für KMUs. Überblick, Praxis-Hinweise und Cross-Ref zu DSGVO und EU AI Act.',
}

export default function EdpsGuidelinesPage() {
  return (
    <div className="space-y-8">
      <ArticleHero src="/images/hero-2026-08/de/compliance/edps-guidelines.webp" alt={'EDPS Guidelines für KI'} />
      <div>
        <h1 className="text-3xl font-bold text-white">EDPS Guidelines — der EU-Datenschutzbeauftragte zu KI</h1>
        <p className="text-gray-400 mt-2">Compliance · 8 min · Stand: Mai 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Überblick">
          Der <strong>European Data Protection Supervisor (EDPS)</strong> ist die unabhängige
          Datenschutzbehörde der EU-Institutionen. Seine Guidelines zu generativer KI und
          KI-Systemen sind formal nur für EU-Organe verbindlich, gelten aber als
          De-facto-Maßstab für alle europäischen Aufsichtsbehörden (inkl. österreichische
          DSB, deutsche LfDIs, schweizer EDÖB für EU-Berührungspunkte). Wer Generative-KI
          DSGVO-konform einsetzen will, sollte die EDPS-Empfehlungen kennen — sie sind
          praxisnaher als der Verordnungstext selbst.
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Wer ist der EDPS?</h2>

        <p className="text-gray-300">
          Der European Data Protection Supervisor wurde 2004 eingerichtet. Aufgaben:
          (a) Überwachung des Datenschutzes innerhalb der EU-Institutionen (Kommission,
          Parlament, Rat, Agenturen), (b) Beratung des EU-Gesetzgebers bei
          datenschutzrelevanten Vorhaben, (c) Veröffentlichung von Leitlinien und Stellungnahmen.
          Sitz: Brüssel. Aktueller Supervisor (Stand 2026): Wojciech Wiewiórowski.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Welche EDPS-Dokumente sind relevant für KI?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <div className="table-wrap">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Dokument</th>
                <th className="text-left py-2 text-gray-400">Worum es geht</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>Generative AI &amp; EUDPR Orientations (2024)</strong></td>
                <td className="py-2">Praxisleitfaden für den DSGVO-konformen Einsatz generativer KI in EU-Institutionen — gilt analog für jeden EU-Verantwortlichen.</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>TechDispatch on Generative AI</strong></td>
                <td className="py-2">Technische Analyse: Wie generative Modelle personenbezogene Daten verarbeiten und welche Datenschutz-Risiken entstehen.</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>Opinion on the EU AI Act Proposal</strong></td>
                <td className="py-2">EDPS-Stellungnahme zum Verordnungsentwurf — kritisch zu Lücken bei Grundrechten und Massenüberwachung.</td>
              </tr>
              <tr>
                <td className="py-2 align-top"><strong>Joint Opinion EDPB-EDPS</strong></td>
                <td className="py-2">Gemeinsame Stellungnahme mit dem European Data Protection Board zum Zusammenspiel von DSGVO und EU AI Act.</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Die 10 Praxis-Empfehlungen des EDPS</h2>

        <p className="text-gray-300">
          Aus den „Generative AI &amp; EUDPR Orientations" lassen sich die zentralen Empfehlungen
          herausfiltern. Sie sind für KMUs direkt anwendbar:
        </p>

        <div className="space-y-3 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">1. DPIA vor Einsatz</h3>
            <p className="text-gray-300 text-sm mt-1">
              Vor dem Einsatz generativer KI: Datenschutz-Folgenabschätzung durchführen.
              Auch bei „nur internem" Einsatz, sobald personenbezogene Daten verarbeitet werden.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">2. Rechtsgrundlage explizit dokumentieren</h3>
            <p className="text-gray-300 text-sm mt-1">
              Art. 6 DSGVO — auf welcher Grundlage werden Daten zu KI-Prompts? Berechtigtes Interesse,
              Einwilligung, Vertragserfüllung. Pauschale Begründungen reichen nicht.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">3. Datenminimierung im Prompt</h3>
            <p className="text-gray-300 text-sm mt-1">
              Keine personenbezogenen Daten in Prompts ohne Notwendigkeit. Pseudonymisierung
              wo möglich. Mitarbeitende schulen, keine Kundendaten in ChatGPT zu kopieren.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">4. Transparenz gegenüber Betroffenen</h3>
            <p className="text-gray-300 text-sm mt-1">
              Datenschutzerklärung muss KI-Nutzung benennen. Wer wird mit welchen Daten gegenüber
              welchem Anbieter geprompted? Klare Sprache, keine Formulierungs-Floskeln.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">5. Sub-Auftragsverarbeiter erfassen</h3>
            <p className="text-gray-300 text-sm mt-1">
              Welche Sub-Provider nutzt der KI-Anbieter? Azure-OpenAI über Microsoft, OpenAI direkt,
              Anthropic via Bedrock — Datenfluss-Diagramme erstellen.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">6. Drittlandtransfer prüfen</h3>
            <p className="text-gray-300 text-sm mt-1">
              US-Anbieter: TADPF (Trans-Atlantic Data Privacy Framework) prüfen. Bei
              Nicht-Beitritt: SCC plus zusätzliche Maßnahmen nach Schrems-II-Doktrin.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">7. Aufbewahrung und Löschung</h3>
            <p className="text-gray-300 text-sm mt-1">
              Wie lange speichert der Anbieter Prompts und Outputs? Gibt es ein Opt-Out für
              Training auf Nutzerdaten? Schriftlich fixieren.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">8. Betroffenenrechte sicherstellen</h3>
            <p className="text-gray-300 text-sm mt-1">
              Auskunft, Berichtigung, Löschung — wie umgesetzt bei einem Modell, das Daten in
              Gewichten gespeichert hat? Prozess vor Einsatz dokumentieren.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">9. Menschliche Aufsicht über KI-Outputs</h3>
            <p className="text-gray-300 text-sm mt-1">
              Keine automatisierten Entscheidungen mit rechtlicher Wirkung allein durch KI
              (Art. 22 DSGVO). Review-Schritte einbauen, Eskalationspfade dokumentieren.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">10. Schulung und Awareness</h3>
            <p className="text-gray-300 text-sm mt-1">
              Mitarbeitende müssen Risiken kennen — Halluzinationen, Bias, Datenleck.
              Deckt sich mit Art. 4 EU AI Act (KI-Kompetenz).
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Warum sind EDPS-Guidelines auch für KMUs relevant?</h2>

        <p className="text-gray-300">
          Formal richten sich die Guidelines an EU-Institutionen — KMUs unterliegen der nationalen
          Aufsichtsbehörde (DSB in Österreich, LfDI/BfDI in Deutschland, EDÖB in der Schweiz für
          EU-Berührungspunkte). Praktisch orientieren sich diese Behörden aber an den EDPS-Veröffentlichungen,
          und die Guidelines sind oft die einzige zugängliche Konkretisierung dessen, was „DSGVO-konformer
          KI-Einsatz" bedeutet.
        </p>

        <p className="text-gray-300 mt-3">
          Wer im Audit gegenüber einer nationalen Aufsichtsbehörde nachweisen kann, dass die
          EDPS-Empfehlungen berücksichtigt wurden, hat einen starken Argumentationsboden.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Zusammenspiel mit dem EU AI Act</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <div className="table-wrap">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Aspekt</th>
                <th className="text-left py-2 text-gray-400">DSGVO + EDPS</th>
                <th className="text-left py-2 text-gray-400">EU AI Act</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Fokus</td>
                <td className="py-2">Personenbezogene Daten</td>
                <td className="py-2">KI-Systeme als Produkt</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Risiko-Logik</td>
                <td className="py-2">Risiko für Rechte/Freiheiten Betroffener</td>
                <td className="py-2">Risikoklassen (Verboten/High/Limited/Minimal)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Instrument</td>
                <td className="py-2">DPIA (Art. 35 DSGVO)</td>
                <td className="py-2">Konformitätsbewertung + FRIA (Art. 27 für Behörden)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Strafrahmen</td>
                <td className="py-2">EUR 20 Mio. oder 4% Umsatz</td>
                <td className="py-2">EUR 35 Mio. oder 7% Umsatz (Art. 5)</td>
              </tr>
              <tr>
                <td className="py-2">Synergien</td>
                <td className="py-2">Datenschutz-Pflichten</td>
                <td className="py-2">DPIA kann mit KI-Risikobewertung kombiniert werden</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Praxis-Empfehlung</h2>

        <p className="text-gray-300">
          Für KMUs: Die EDPS-Orientations zu Generative AI als Pflichtlektüre für den
          Datenschutzbeauftragten oder die compliance-verantwortliche Person. Ergänzend zu
          den nationalen Auslegungen der DSB (Österreich) bzw. LfDIs (Deutschland) und zu
          den Konkretisierungen des European Data Protection Board (EDPB).
        </p>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend in unserem Wiki</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <a href="/compliance/ai-act-august-2026" className="text-blue-400 hover:underline">Was passiert am 02.08.2026 — Enforcement-Start</a></li>
            <li>&#8226; <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:underline">DSGVO Grundlagen für KI-Anwendungen</a></li>
            <li>&#8226; <a href="/compliance/dpia" className="text-blue-400 hover:underline">DPIA — Datenschutz-Folgenabschätzung Schritt für Schritt</a></li>
            <li>&#8226; <a href="/compliance/datenschutz-praxis" className="text-blue-400 hover:underline">Datenschutz Praxis — TOM, AVV, Dokumentation</a></li>
            <li>&#8226; <a href="/compliance/verifywise-integration" className="text-blue-400 hover:underline">VerifyWise — Open-Source-Tool für AI-Governance</a></li>
            <li>&#8226; <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">KI-Kompetenz nach Art. 4 — Schulungsplan</a></li>
          </ul>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-white mb-2">Weitere Inhalte auf den AI Engineering Plattformen</h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>&#8226; <strong>Hub:</strong> Kuratierte Compliance-Skills und MCP Server — <a href="https://hub.ai-engineering.at" target="_blank" className="text-blue-400 hover:underline">hub.ai-engineering.at</a></li>
            <li>&#8226; <strong>YouTube:</strong> Praxis-Videos zu DSGVO &amp; KI — <a href="https://www.youtube.com/@AIEngineering-at" target="_blank" className="text-blue-400 hover:underline">@AIEngineering-at</a></li>
            <li>&#8226; <strong>LinkedIn:</strong> Updates zu Aufsichtsbehörden-Entscheidungen — <a href="https://www.linkedin.com/in/joerg-fuchs-ai/" target="_blank" className="text-blue-400 hover:underline">Jörg Fuchs auf LinkedIn</a></li>
            <li>&#8226; <strong>GitHub:</strong> Templates und DPIA-Vorlagen — <a href="https://github.com/AI-Engineering-at" target="_blank" className="text-blue-400 hover:underline">github.com/AI-Engineering-at</a></li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Quellen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://www.edps.europa.eu/" target="_blank" className="text-blue-400 hover:underline">European Data Protection Supervisor — Offizielle Website</a></li>
          <li><a href="https://www.edps.europa.eu/data-protection/our-work/publications/guidelines/2024-06-03-orientations-euis-generative-ai-and-personal-data_en" target="_blank" className="text-blue-400 hover:underline">EDPS Orientations on Generative AI &amp; EUDPR (2024)</a></li>
          <li><a href="https://www.edps.europa.eu/data-protection/our-work/publications/techdispatch/2023-10-25-techdispatch-22023-generative-ai_en" target="_blank" className="text-blue-400 hover:underline">EDPS TechDispatch on Generative AI</a></li>
          <li><a href="https://www.edpb.europa.eu/" target="_blank" className="text-blue-400 hover:underline">European Data Protection Board (EDPB)</a></li>
          <li><a href="https://www.dsb.gv.at/" target="_blank" className="text-blue-400 hover:underline">Österreichische Datenschutzbehörde (DSB)</a></li>
        </ul>
      </div>
    </div>
  )
}
