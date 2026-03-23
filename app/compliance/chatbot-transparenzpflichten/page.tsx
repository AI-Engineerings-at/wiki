import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chatbot Transparenzpflichten nach EU AI Act | AI Engineering Wiki',
  description: 'Was du bei Chatbots und KI-generierten Inhalten beachten musst. Kennzeichnungspflichten, Offenlegung, Copyright - alles kompakt.',
}

export default function ChatbotTransparenzpflichtenPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Chatbot Transparenzpflichten</h1>
        <p className="text-slate-400 mt-2">Compliance · 4 min · Stand: Feb 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mt-0 mb-2">Für "Begrenztes Risiko" Systeme</h2>
          <p className="text-slate-300 mb-0">
            Chatbots, KI-generierte Texte/Bilder/Audio und Deepfakes fallen unter 
            <strong>Article 50</strong>. Transparenzpflichten gelten seit August 2025.
          </p>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/chatbot-transparenzpflichten.png" alt="Chatbot Transparenzpflichten — KI-Identitaet, Kennzeichnung, Copyright" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Chatbot Transparenzpflichten: Was nach Art. 50 EU AI Act offengelegt werden muss</figcaption>
        </figure>

        <h2>Was muss offengelegt werden?</h2>

        <h3>1. KI-Identität offenlegen</h3>
        <p className="text-slate-300">
          Nutzer müssen klar und eindeutig wissen, dass sie mit einem KI-System interagieren.
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>"Powered by AI" oder "KI-Assistent" im Chat-Fenster</li>
          <li>Bei Voice: Ansage "Sie sprechen mit einem KI-System"</li>
          <li>Erste Nachricht: Hinweis auf KI-Natur</li>
        </ul>

        <h3>2. KI-generierte Inhalte kennzeichnen</h3>
        <p className="text-slate-300">
          Alle KI-generierten Outputs müssen als solche erkennbar sein:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Bilder: "KI-generiert" Wasserzeichen oder Metadata</li>
          <li>Audio: "KI-generierte Stimme" bei Text-to-Speech</li>
          <li>Video: "Deepfake" Kennung bei synthetischen Videos</li>
          <li>Text: Hinweis im Footer bei Artikeln</li>
        </ul>

        <h3>3. Urheberrechts-Compliance</h3>
        <p className="text-slate-300">
          Anbieter von General Purpose AI (GPAI) müssen dokumentieren:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Welche Daten für Training verwendet wurden</li>
          <li>Urheberrechtsinhaber benachrichtigen (opt-out System)</li>
          <li>Zusammenfassung der Trainingsdaten bereitstellen</li>
        </ul>

        <h3>4. Täuschung verhindern</h3>
        <p className="text-slate-300">
          <strong>Verbot:</strong> KI-Systeme so gestalten, dass sie Menschen täuschen.
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Keine menschenähnlichen Avatare ohne Kennzeichnung</li>
          <li>Keine gefälschten Reviews oder Bewertungen</li>
          <li>Keine manipulativen Design-Patterns</li>
        </ul>

        <h2>Checkliste für Unternehmen</h2>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
          <ul className="text-slate-300 space-y-2">
            <li>[ ] Chatbot-Interface: "KI-Assistent" Kennzeichnung</li>
            <li>[ ] Erste Nachricht: Hinweis auf KI-Natur</li>
            <li>[ ] KI-generierte Bilder: Wasserzeichen oder Metadata</li>
            <li>[ ] Nutzungsbedingungen: Hinweis auf KI-Einsatz</li>
            <li>[ ] Datenschutzerklärung: KI-Verarbeitung dokumentiert</li>
            <li>[ ] Trainingsdaten: Copyright-Compliance dokumentiert</li>
            <li>[ ] Opt-out: Verfahren für Urheberrechts-Claims</li>
          </ul>
        </div>

        <h2>Beispiele: Was gut / schlecht ist</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-2">✅ Richtig</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>"Ich bin ein KI-Assistent. Meine Antworten können Fehler enthalten."</li>
              <li>KI-generierte Bilder mit "AI" Wasserzeichen</li>
              <li>Klare Trennung: "Diese Zusammenfassung wurde von KI erstellt"</li>
            </ul>
          </div>
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h3 className="font-semibold text-red-400 mb-2">❌ Falsch</h3>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>Kein Hinweis dass es ein Bot ist</li>
              <li>Realistische menschliche Avatare ohne Kennzeichnung</li>
              <li>"Kundenbewertungen" die von KI generiert wurden</li>
            </ul>
          </div>
        </div>

        <h2>Implementation: KI-Hinweis in Chatbot</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# HTML: KI-Hinweis im Chat-Fenster
<div class="chat-header">
  <span class="bot-avatar">🤖</span>
  <span class="bot-name">KI-Assistent</span>
  <span class="ai-badge">Powered by AI</span>
</div>

<style>
.ai-badge {
  background: #10b981;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>

# Oder als erste Bot-Nachricht:
bot_message("""
Hallo! Ich bin ein KI-Assistent. 
Meine Antworten werden von AI generiert und können Fehler enthalten.

Für wichtige Entscheidungen bitte zusätzliche Quellen prüfen.
""")`}</code>
        </pre>

        <h2>Strafen bei Verstoß</h2>
        <p className="text-slate-300">
          Bei Nichteinhaltung der Transparenzpflichten:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Bußgeld bis zu <strong>€15 Mio.</strong> oder <strong>3% des Umsatzes</strong></li>
          <li>Abmahnungen durch Datenschutzbehörden</li>
          <li>Reputationsschäden</li>
        </ul>

        <h2>Quellen</h2>
        <ul>
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Originaltext (EUR-Lex) — Article 50</a></li>
          <li><a href="https://www.littledata.com/eu-ai-act-compliance-checklist/" target="_blank" className="text-blue-400 hover:underline">LittleData: EU AI Act Checklist</a></li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/compliance/eu-ai-act" className="text-blue-400 hover:text-blue-300">EU AI Act</a>
          {' · '}
          <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:text-blue-300">KI-Kompetenz Art. 4</a>
          {' · '}
          <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:text-blue-300">DSGVO Grundlagen</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
    </div>
  )
}