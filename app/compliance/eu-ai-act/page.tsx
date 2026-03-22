// PlantUML via Kroki ersetzt Mermaid — Infografik-PNGs sind besser
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'EU AI Act | AI Engineering Wiki',
  description:
    'EU AI Act seit 1. August 2024 in Kraft. Art. 4 KI-Kompetenz gilt seit 02.02.2025, vollständige Anwendung ab 02.08.2026. Risikoklassen, Pflichten, Strafen.',
}

export default function EuAiActLeitfaden() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">EU AI Act: Was du wissen musst</h1>
        <p className="text-gray-400 mt-2">Compliance · 10 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Der EU AI Act (Verordnung 2024/1689) ist der weltweit erste umfassende
            Rechtsrahmen für Künstliche Intelligenz. Er klassifiziert AI-Systeme
            nach Risiko und definiert Pflichten für Anbieter und Betreiber. Für
            die meisten Self-Hosted AI-Setups gilt: Minimal Risk, keine besonderen
            Pflichten — aber Transparenz und Dokumentation sind trotzdem empfohlen.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Der EU AI Act (Verordnung 2024/1689) wurde am <strong>12. Juli 2024</strong> im
          EU-Amtsblatt veröffentlicht und ist am <strong>1. August 2024</strong> in Kraft
          getreten. Er ist der umfassendste Regelungsrahmen der EU für Künstliche Intelligenz.
          Einige Pflichten — wie die Verbote (Art. 5) und die KI-Kompetenz (Art. 4) — gelten
          bereits seit <strong>2. Februar 2025</strong>. Die vollständige Anwendung mit
          Enforcement und Strafen startet ab <strong>2. August 2026</strong>.
        </p>

        <Callout type="warning" title="Art. 4 KI-Kompetenz gilt BEREITS">
          <p>
            Die Pflicht zur KI-Kompetenz (Art. 4) gilt seit <strong>2. Februar 2025</strong>.
            Es gibt keine Einheitszertifizierung, keine Pflicht zu einem AI Officer und keine
            One-size-fits-all-Schulung. Die Überwachung und Durchsetzung (Enforcement)
            startet ab <strong>August 2026</strong>.
          </p>
        </Callout>

        <Callout type="warning" title="Strafen">
          <p>
            Bis zu 35 Millionen Euro oder 6% des globalen Jahresumsatzes sind möglich.
            Für KMU gelten etwas mildere Regeln, aber die Pflichten bleiben.
          </p>
        </Callout>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

title EU AI Act — Risikoklassen Pyramide

rectangle "VERBOTEN\\n(Unacceptable Risk)\\nSoziales Scoring, Manipulation,\\nbiometrische Fernidentifikation" as r1 #8B0000

rectangle "HOCH\\n(High Risk)\\nGesundheit, Bildung, Beschäftigung,\\nStrafverfolgung — strenge Pflichten" as r2 #1E3A5F

rectangle "BEGRENZT\\n(Limited Risk)\\nChatbots, Deepfakes —\\nTransparenzpflicht" as r3 #4a4a00

rectangle "MINIMAL\\n(Minimal Risk)\\nSpam-Filter, Empfehlungen,\\nHomelab AI — keine Pflichten" as r4 #22543d

r1 -[hidden]-> r2
r2 -[hidden]-> r3
r3 -[hidden]-> r4

note right of r4
  Die meisten Self-Hosted
  AI-Systeme fallen hierunter
end note
@enduml`}
          caption="EU AI Act Risikoklassen: Von verboten (oben) bis minimal (unten)"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Was regelt der EU AI Act?</h2>

        <p className="text-gray-300 mt-2">
          Der AI Act reguliert AI-Systeme basierend auf ihrem Risikopotenzial:
        </p>

        <figure className="my-8">
          <img src="/images/infographics/eu-ai-act-risiko-pyramide.png" alt="EU AI Act Risiko-Pyramide: 4 Stufen von Verboten bis Minimal" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">EU AI Act Risiko-Pyramide: Verboten, Hoch, Begrenzt, Minimal</figcaption>
        </figure>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-red-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">VERBOTEN</span>
            </div>
            <h3 className="font-semibold text-white">Unacceptable Risk</h3>
            <p className="text-gray-300 text-sm mt-1">
              Systeme, die Menschen manipulieren, soziales Scoring betreiben oder 
              biometrische Fernidentifikation in Echtzeit. Komplett verboten.
            </p>
          </div>

          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#3550DD] text-white text-xs font-bold px-2 py-1 rounded">HOCH</span>
            </div>
            <h3 className="font-semibold text-white">High Risk</h3>
            <p className="text-gray-300 text-sm mt-1">
              AI in kritischen Bereichen (Gesundheit, Bildung, Beschäftigung, 
              Strafverfolgung). Strenge Anforderungen an Dokumentation, Transparenz, 
              menschliche Aufsicht.
            </p>
          </div>

          <div className="bg-gray-900 border border-yellow-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded">MITTEL</span>
            </div>
            <h3 className="font-semibold text-white">Limited Risk</h3>
            <p className="text-gray-300 text-sm mt-1">
              Chatbots, Deepfakes, Emotionserkennung. Transparenzpflicht — 
              muss klar sein, dass man mit AI interagiert.
            </p>
          </div>

          <div className="bg-gray-900 border border-green-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">MINIMAL</span>
            </div>
            <h3 className="font-semibold text-white">Minimal Risk</h3>
            <p className="text-gray-300 text-sm mt-1">
              Spam-Filter, Empfehlungssysteme, Gaming-AI. Keine speziellen 
              Pflichten. Die meisten Homelab-AI-Systeme fallen hierunter.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Was das für typische Business-KI-Nutzung bedeutet</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Szenario</th>
                <th className="text-left py-2 text-gray-400">Risikostufe</th>
                <th className="text-left py-2 text-gray-400">Pflichten</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">LLM für Content-Erstellung</td>
                <td className="py-2">Minimal bis Begrenzt</td>
                <td className="py-2">Transparenz bei Veröffentlichung ohne menschliche Prüfung</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">KI-Kundensupport-Chatbot</td>
                <td className="py-2">Begrenzt</td>
                <td className="py-2">Nutzer müssen wissen, dass sie mit KI sprechen. Bei Entscheidungen über Leistungserbringung evtl. Hochrisiko.</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Interne Produktivität (E-Mail, Code, Zusammenfassungen)</td>
                <td className="py-2">Minimal</td>
                <td className="py-2">Keine spezifischen Pflichten, aber Dokumentation empfohlen</td>
              </tr>
              <tr>
                <td className="py-2">KI für Recruiting (Lebensläufe, Kandidaten-Ranking)</td>
                <td className="py-2 text-red-400 font-semibold">Hoch</td>
                <td className="py-2">Volle Compliance: Doku, Risikomanagement, menschliche Aufsicht</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Für wen gilt der AI Act?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Akteur</th>
                <th className="text-left py-2 text-gray-400">Pflichten</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">AI-Entwickler</td>
                <td className="py-2">Konformitätsbewertung, technische Dokumentation, Qualitätsmanagement</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Deployer (Nutzer)</td>
                <td className="py-2">Menschliche Aufsicht, Monitoring, Transparenz gegen Betroffene</td>
              </tr>
              <tr>
                <td className="py-2">Importeure/Händler</td>
                <td className="py-2">CE-Kennzeichnung, Konformitätserklärung</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Pflichten für High-Risk AI</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Bereich</th>
                <th className="text-left py-2 text-gray-400">Pflicht</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Dokumentation</td>
                <td className="py-2">Detaillierte technische Dokumentation vor Markteinführung: Verwendungszweck, Design, Methodik, Testergebnisse</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Risikomanagement</td>
                <td className="py-2">Dokumentierter, fortlaufender Prozess zur Identifizierung, Analyse und Minderung von Risiken — kein einmaliges Assessment</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Data Governance</td>
                <td className="py-2">Trainings- und Testdaten müssen Qualitätskriterien erfüllen. Datenquellen, Aufbereitungsmethoden und potenzielle Verzerrungen dokumentieren</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Transparenz</td>
                <td className="py-2">Klare Informationen über Fähigkeiten, Einschränkungen und Verwendungszweck. Nutzungsanweisungen bereitstellen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Menschliche Aufsicht</td>
                <td className="py-2">Menschen können Fähigkeiten und Grenzen verstehen, in Entscheidungen eingreifen und das System nicht nutzen oder Ergebnisse ignorieren</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Aufzeichnungspflicht</td>
                <td className="py-2">Automatische Protokollierung des Betriebs zur Nachverfolgbarkeit. Auf Anfrage den Behörden bereitstellen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Genauigkeit</td>
                <td className="py-2">Angemessene Genauigkeit, Robustheit, Cybersicherheit</td>
              </tr>
              <tr>
                <td className="py-2">Kennzeichnung</td>
                <td className="py-2">CE-Kennzeichnung, EU-Konformitätserklärung</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Timeline: Wann gilt was?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Datum</th>
                <th className="text-left py-2 text-gray-400">Was gilt</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-gray-400">12. Juli 2024</td>
                <td className="py-2">Im EU-Amtsblatt veröffentlicht</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-gray-400">01. Aug 2024</td>
                <td className="py-2">In Kraft getreten</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-green-400 font-semibold">02. Feb 2025</td>
                <td className="py-2 font-semibold">Verbote (Art. 5) + KI-Kompetenz (Art. 4) gelten BEREITS</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-blue-400">02. Aug 2025</td>
                <td className="py-2">Governance-Regeln + GPAI-Modelle (Transparenz, Copyright)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-red-400 font-semibold">02. Aug 2026</td>
                <td className="py-2 font-semibold">Vollständige Anwendung (High-Risk etc.) + Enforcement/Überwachung startet</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-500">02. Aug 2027</td>
                <td className="py-2">Hochrisiko-KI in regulierten Produkten</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Dreistufiges Sanktionssystem</h2>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Verstoss</th>
                <th className="text-left py-2 text-gray-400">Maximale Strafe</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Verbotene KI-Praktiken</td>
                <td className="py-2 text-red-400 font-semibold">35 Mio. EUR oder 7% des weltweiten Jahresumsatzes</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Hochrisiko-KI-Anforderungen</td>
                <td className="py-2">15 Mio. EUR oder 3% des Umsatzes</td>
              </tr>
              <tr>
                <td className="py-2">Falsche Angaben gegenüber Behörden</td>
                <td className="py-2">7,5 Mio. EUR oder 1% des Umsatzes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 mt-2">
          Für kleine und mittlere Unternehmen werden die Bussgelder verhältnismässig angepasst,
          aber sie sind immer noch erheblich genug, um die Existenz eines kleinen Unternehmens
          zu gefährden.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Was bedeutet das für Self-Hosted AI?</h2>

        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Gute Nachrichten:</h3>
          <ul className="text-gray-300 space-y-2">
            <li>✅ Die meisten Self-Hosted AI-Nutzungen fallen unter "Minimal Risk"</li>
            <li>✅ Keine CE-Kennzeichnung nötig</li>
            <li>✅ Keine Konformitätsbewertung erforderlich</li>
            <li>✅ Lokale Nutzung = volle Kontrolle = leichtere Compliance</li>
          </ul>
        </div>

        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Aber beachten:</h3>
          <ul className="text-gray-300 space-y-2">
            <li>⚠️ Wenn du AI als Produkt anbietest → andere Regeln</li>
            <li>⚠️ Automatisierte Entscheidungen mit rechtlicher Wirkung → High Risk</li>
            <li>⚠️ Biometrische Kategorisierung → verboten oder eingeschränkt</li>
            <li>⚠️ Chatbot-Nutzung → Transparenzpflicht (Kenntnis geben)</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Beispiel: AI-System kategorisieren</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Fragebogen zur Risikokategorisierung

## 1. Systemzweck
Was macht dein AI-System?
→ internen Kundensupport automatisieren

## 2. Entscheidungen mit rechtlicher Wirkung?
Können AI-Entscheidungen rechtliche Folgen haben?
→ Nein, nur Empfehlungen

## 3. Kritischer Bereich?
Gesundheit, Bildung, Beschäftigung, Finanzen?
→ Nein

## 4. Biometrische Daten?
Verarbeitet das System biometrische Daten?
→ Nein

## Ergebnis: MINIMAL RISK ✅
→ Keine speziellen Pflichten nötig

---

# Anders: Recruiting-Tool
## 1. Systemzweck
→ Bewerber screening und Ranking

## 2. Entscheidungen mit rechtlicher Wirkung?
→ Ja, beeinflusst Einstellungen

## 3. Kritischer Bereich?
→ Beschäftigung → HIGH RISK ❌
→ Dokumentation + menschliche Aufsicht nötig`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Checkliste: Bereitschaft für AI Act</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-gray-300 space-y-2">
            <li>☐ Kategorie deiner AI-Nutzung bestimmt (Minimal/Limited/High Risk)</li>
            <li>☐ Dokumentation, wie AI in deinem Unternehmen genutzt wird</li>
            <li>☐ Prozess für Transparenz (Nutzer wissen, dass AI im Einsatz)</li>
            <li>☐ Bei High Risk: Technische Dokumentation vorhanden</li>
            <li>☐ Menschliche Aufsicht sichergestellt (wer überwacht AI-Entscheidungen?)</li>
            <li>☐ Bei Chatbots: Transparente Kommunikation ("Du chatst mit einem Bot")</li>
            <li>☐ Löschkonzept für AI-generierte Daten</li>
            <li>☐ Regelmäßige Überprüfung der AI-Nutzung</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Unsere Empfehlung</h2>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
          <ol className="text-gray-300 space-y-2">
            <li>1. <strong>Kategorisiere</strong> deine AI-Nutzung (Minimal/Limited/High)</li>
            <li>2. <strong>Dokumentiere</strong> alle AI-Systeme (Art. 30 DSGVO + AI Act)</li>
            <li>3. <strong>Transparenz</strong> schaffen — Nutzer informieren</li>
            <li>4. <strong>Self-Hosted</strong> bevorzugen — volle Kontrolle, leichtere Compliance</li>
            <li>5. <strong>Monitoring</strong> — regelmäßig prüfen ob sich was geändert hat</li>
          </ol>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend</h3>
          <ul className="text-gray-300 space-y-1">
            <li>• <strong>KI-Kompetenz:</strong>{" "}
              <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">Art. 4 KI-Kompetenz Pflicht →</a>
            </li>
            <li>• <strong>DSGVO:</strong>{" "}
              <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:underline">DSGVO Grundlagen →</a>
            </li>
            <li>• <strong>DPIA:</strong>{" "}
              <a href="/compliance/dpia" className="text-blue-400 hover:underline">Datenschutz-Folgenabschätzung →</a>
            </li>
          </ul>
        </div>
        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EUR-Lex: Verordnung (EU) 2024/1689 — EU AI Act Volltext</a></li>
            <li><a href="https://artificialintelligenceact.eu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AI Act Explorer</a> — Interaktive Aufbereitung aller Artikel</li>
            <li><a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EU-Kommission: Regulatory Framework for AI</a> — Offizielle Übersicht</li>
            <li><a href="https://www.ris.bka.gv.at/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RIS — Rechtsinformationssystem des Bundes</a> — Österreichische Umsetzung</li>
            <li><a href="https://www.wko.at/oe/gruendung/ai-toolbox.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">WKO AI-Toolbox</a> — Praktische AI-Tools und Leitfäden der Wirtschaftskammer Österreich</li>
            <li><a href="https://www.rtr.at/rtr/service/ki-servicestelle/projekte-initiativen/Projekte_-_Initiativen.de.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RTR KI-Servicestelle</a> — Österreichische KI-Servicestelle, Projekte und Initiativen</li>
            <li><a href="https://www.ffg.at/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">FFG — Österreichische Forschungsförderungsgesellschaft</a> — Förderungen für AI-Projekte und Digitalisierung</li>
            <li><a href="https://caralegal.eu/blog/ki-richtlinie-unternehmen-leitfaden" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">caralegal KI-Richtlinie Guide & Vorlage</a> — Praktischer Guide für unternehmenseigene KI-Richtlinien</li>
            <li><a href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EU-Kommission: AI Literacy — Questions and Answers</a> — Offizielle FAQ zu Art. 4 KI-Kompetenz</li>
            <li><a href="https://www.wko.at/digitalisierung/ai-act-eu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">WKO AI Act Übersicht</a> — Praxisnahe Übersicht der Wirtschaftskammer Österreich zum EU AI Act für Unternehmen</li>
            <li><a href="https://digital-strategy.ec.europa.eu/en/policies/ai-office" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EU AI Office</a> — Zentrale Stelle der EU-Kommission für KI-Governance und Durchsetzung</li>
            <li><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NIST AI Risk Management Framework</a> — US-amerikanisches Rahmenwerk für KI-Risikomanagement</li>
            <li><a href="https://oecd.ai/en/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OECD.AI Policy Observatory</a> — Internationale KI-Policy-Datenbank und Ländervergleiche</li>
          </ul>
        </section>
      </div>
    </div>
  )
}