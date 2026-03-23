import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

const entscheidungsbaumDiagram = `@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

rectangle "Was suchst du?" as start

rectangle "Recht & Regulierung" as recht
rectangle "Technik & Tools" as technik
rectangle "Governance & Risiko" as governance

rectangle "RTR KI-Servicestelle\\nWKO AI Act\\nEU-Kommission" as recht_quellen
rectangle "n8n Starter Kit\\nHugging Face\\nDataCamp Tutorial" as technik_quellen
rectangle "NIST AI RMF\\nOECD.AI\\nGLACIS Guide" as governance_quellen

start -down-> recht
start -down-> technik
start -down-> governance

recht -down-> recht_quellen
technik -down-> technik_quellen
governance -down-> governance_quellen

@enduml`

export const metadata = {
  title: 'Vergleichbare Ressourcen \u2014 Wo du sonst noch lernen kannst | AI Engineering Wiki',
  description:
    'Ehrlicher Vergleich: Welche externen Quellen in bestimmten Bereichen besser sind als unsere Wiki. EU-Kommission, WKO, n8n, Hugging Face, NIST, OECD und mehr.',
}

const NIST_URL = 'https://www.nist.gov/itl/ai-risk-management-framework'

export default function VergleichAlternativenPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Tools</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Vergleichbare Ressourcen \u2014 Wo du sonst noch lernen kannst
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Wir sind nicht die einzige Quelle. Hier zeigen wir ehrlich, wo andere
          Quellen besser sind als wir \u2014 und warum du sie kennen solltest.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 5 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: M\u00e4rz 2026</span>
        </div>
      </div>

      <Callout type="summary" title="Überblick">
        Ehrlicher Vergleich: Wo andere Quellen besser sind als unsere Wiki — und wo wir punkten.
        EU-Kommission für Recht, Hugging Face für Modelle, NIST für Governance. Wir liefern
        DACH-Fokus, Praxis statt Theorie und alles an einem Ort.
      </Callout>

      <PlantUMLDiagram diagram={entscheidungsbaumDiagram} caption="Entscheidungsbaum: Je nach Thema die beste Quelle finden" />

      <div className="prose prose-invert max-w-none">
        <p className="text-white/70 leading-relaxed">
          Keine Wiki kann alles abdecken. Offizielle Stellen haben rechtlich
          belastbare Informationen, spezialisierte Plattformen haben tiefere
          Tool-Kenntnis und internationale Organisationen haben breitere
          Vergleichsdaten. Das hier ist unsere ehrliche Einordnung.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Wo andere besser sind</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Quelle</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">St\u00e4rke</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Besser als unsere Wiki bei</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Link</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">EU-Kommission</td>
                  <td className="py-3 px-4">Offizielle Regeln und Verordnungen</td>
                  <td className="py-3 px-4">Rechtlich belastbare Informationen zum AI Act</td>
                  <td className="py-3 px-4"><a href="https://digital-strategy.ec.europa.eu/en/policies/ai-office" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">digital-strategy.ec.europa.eu</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">RTR KI-Servicestelle</td>
                  <td className="py-3 px-4">\u00d6sterreich-spezifisch, mit AI Act Chatbot</td>
                  <td className="py-3 px-4">\u00d6sterreichische Einordnung und nationale Umsetzung</td>
                  <td className="py-3 px-4"><a href="https://www.rtr.at/rtr/service/ki-servicestelle/ki-servicestelle.de.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">rtr.at</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">WKO AI Act</td>
                  <td className="py-3 px-4">KMU-Perspektive, praxisnah</td>
                  <td className="py-3 px-4">Praxisnahe Unternehmenssicht f\u00fcr \u00f6sterreichische KMUs</td>
                  <td className="py-3 px-4"><a href="https://www.wko.at/digitalisierung/ai-act-eu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">wko.at</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">n8n AI Starter Kit</td>
                  <td className="py-3 px-4">Sofort einsetzbar, offiziell gepflegt</td>
                  <td className="py-3 px-4">Schneller Einstieg in n8n + AI mit einem Befehl</td>
                  <td className="py-3 px-4"><a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/n8n-io</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">Hugging Face</td>
                  <td className="py-3 px-4">Modell-Vielfalt, Community, Papers</td>
                  <td className="py-3 px-4">Modelle finden, testen, vergleichen und herunterladen</td>
                  <td className="py-3 px-4"><a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">huggingface.co</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">NIST AI RMF</td>
                  <td className="py-3 px-4">Governance, strukturiertes Risikomanagement</td>
                  <td className="py-3 px-4">Risikomanagement-Framework strukturiert aufbauen</td>
                  <td className="py-3 px-4"><a href={NIST_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">nist.gov</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">OECD.AI</td>
                  <td className="py-3 px-4">900+ AI-Politiken weltweit, L\u00e4ndervergleiche</td>
                  <td className="py-3 px-4">Internationale Vergleiche und Policy-\u00dcbersicht</td>
                  <td className="py-3 px-4"><a href="https://oecd.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">oecd.ai</a></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 font-medium text-white">DataCamp Tutorial</td>
                  <td className="py-3 px-4">Schritt-f\u00fcr-Schritt, gef\u00fchrt</td>
                  <td className="py-3 px-4">Gef\u00fchrtes Tutorial mit Docker, n8n, Qdrant und Ollama</td>
                  <td className="py-3 px-4"><a href="https://www.datacamp.com/de/tutorial/local-ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">datacamp.com</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">Was wir gut k\u00f6nnen</h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <ul className="text-white/70 space-y-2">
              <li><strong className="text-white">DACH-Fokus:</strong> Wir schreiben f\u00fcr \u00f6sterreichische und deutsche KMUs. Strompreise, F\u00f6rderungen, Rechtslage \u2014 alles aus unserer Region.</li>
              <li><strong className="text-white">Praxis statt Theorie:</strong> Jede Anleitung basiert auf echten Setups die in Produktion laufen. Keine Laborergebnisse.</li>
              <li><strong className="text-white">Alles an einem Ort:</strong> Von Compliance \u00fcber Hardware bis Workflow-Automation \u2014 ein Ort, eine Sprache, ein Kontext.</li>
              <li><strong className="text-white">Ehrliche Einschr\u00e4nkungen:</strong> Wir sagen wo lokal schlechter ist als Cloud und wo andere Quellen besser sind als wir.</li>
              <li><strong className="text-white">Kostenlos und ohne Tracking:</strong> Kein Login, keine Cookies, keine Paywall f\u00fcr Wiki-Inhalte.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Disclaimer</h3>
            <p className="text-white/70">
              Wir sind ein kleines \u00f6sterreichisches Unternehmen. Unsere Wiki-Artikel
              sind sorgf\u00e4ltig recherchiert und mit Quellen belegt, aber sie ersetzen
              keine Rechtsberatung. F\u00fcr rechtlich bindende Entscheidungen \u2014 besonders
              zu EU AI Act, DSGVO und Compliance \u2014 verwende die offiziellen Quellen
              der EU-Kommission, der RTR KI-Servicestelle oder deiner Rechtsberatung.
            </p>
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://digital-strategy.ec.europa.eu/en/policies/ai-office" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EU AI Office</a> \u2014 Zentrale EU-Stelle f\u00fcr AI-Regulierung</li>
            <li><a href="https://www.wko.at/digitalisierung/ai-act-eu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">WKO AI Act \u00dcbersicht</a> \u2014 Praxisnahe Unternehmenssicht zum EU AI Act</li>
            <li><a href="https://www.rtr.at/rtr/service/ki-servicestelle/ki-servicestelle.de.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RTR KI-Servicestelle</a> \u2014 \u00d6sterreichische KI-Servicestelle</li>
            <li><a href={NIST_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NIST AI Risk Management Framework</a> \u2014 US-Framework f\u00fcr AI-Risikomanagement</li>
            <li><a href="https://oecd.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OECD.AI Policy Observatory</a> \u2014 900+ AI-Politiken weltweit</li>
            <li><a href="https://github.com/n8n-io/self-hosted-ai-starter-kit" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n Self-hosted AI Starter Kit</a> \u2014 Offizielles n8n Starter Kit f\u00fcr lokale AI</li>
            <li><a href="https://docs.n8n.io/advanced-ai/intro-tutorial/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n AI Tutorial</a> \u2014 AI-Workflow mit n8n bauen</li>
            <li><a href="https://docs.n8n.io/hosting/starter-kits/ai-starter-kit/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">n8n AI Starter Kit Dokumentation</a> \u2014 Offizielle Starter Kit Docs</li>
            <li><a href="https://huggingface.co/docs/transformers/index" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Hugging Face Transformers</a> \u2014 Transformers-Bibliothek Dokumentation</li>
            <li><a href="https://huggingface.co/docs/hub/ollama" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Hugging Face Ollama/GGUF</a> \u2014 Ollama mit GGUF-Modellen von Hugging Face</li>
            <li><a href="https://www.datacamp.com/de/tutorial/local-ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">DataCamp: Lokale KI Tutorial</a> \u2014 Lokale KI mit Docker, n8n, Qdrant und Ollama</li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/tools/ai-tools-datenbank" className="text-blue-400 hover:text-blue-300">AI Tools Datenbank</a>
          {' · '}
          <a href="/tools/ollama-tutorial" className="text-blue-400 hover:text-blue-300">Ollama Tutorial</a>
          {' · '}
          <a href="/grundlagen/lokal-vs-cloud" className="text-blue-400 hover:text-blue-300">Lokal vs. Cloud</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
      </div>
    </div>
  )
}
