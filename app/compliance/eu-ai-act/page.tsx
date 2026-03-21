// PlantUML via Kroki ersetzt Mermaid — Infografik-PNGs sind besser
import Callout from "../../../components/Callout"

export const metadata = {
  title: 'EU AI Act | AI Engineering Wiki',
  description:
    'EU AI Act ab 2. August 2026: Risikoklassen, Pflichten, Transparenz und Strafen. Praxis-Guide für Unternehmen mit AI-Systemen.',
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
            Rechtsrahmen für Kuenstliche Intelligenz. Er klassifiziert AI-Systeme
            nach Risiko und definiert Pflichten für Anbieter und Betreiber. Für
            die meisten Self-Hosted AI-Setups gilt: Minimal Risk, keine besonderen
            Pflichten — aber Transparenz und Dokumentation sind trotzdem empfohlen.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Der EU AI Act tritt am <strong>2. August 2026</strong> in Kraft. Er ist der
          weltweit strengste Regelungsrahmen für Künstliche Intelligenz. Für Unternehmen,
          die AI einsetzen, gelten ab diesem Datum neue Pflichten — mit empfindlichen
          Strafen bei Nichteinhaltung.
        </p>

        <Callout type="warning" title="Strafen">
          <p>
            Bis zu 35 Millionen Euro oder 6% des globalen Jahresumsatzes sind moeglich.
            Für KMU gelten etwas mildere Regeln, aber die Pflichten bleiben.
          </p>
        </Callout>

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
                <td className="py-2">Technische Dokumentation aller Systeme</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Risikomanagement</td>
                <td className="py-2">Kontinuierlicher Prozess zur Risikobewertung</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Transparenz</td>
                <td className="py-2">Nutzern mitteilen, dass sie mit AI interagieren</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Menschliche Aufsicht</td>
                <td className="py-2">Menschen können Entscheidungen überprüfen und eingreifen</td>
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
                <td className="py-2">12. Juli 2024</td>
                <td className="py-2">AI Act im EU-Amtsblatt veröffentlicht, 01. Aug 2024 in Kraft getreten</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">02. Feb 2025</td>
                <td className="py-2">Verbote (Art. 5) und KI-Kompetenz (Art. 4) gelten</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">02. Aug 2025</td>
                <td className="py-2">GPAI-Modelle (Transparenz, Copyright)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-semibold text-red-400">02. Aug 2026</td>
                <td className="py-2 font-semibold">Vollstaendig anwendbar. Strafen moeglich.</td>
              </tr>
              <tr>
                <td className="py-2">02. Aug 2027</td>
                <td className="py-2">Hochrisiko-KI in regulierten Produkten</td>
              </tr>
            </tbody>
          </table>
        </div>

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
              <a href="/compliance/dpia" className="text-blue-400 hover:underline">Datenschutz-Folgenabschaetzung →</a>
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
          </ul>
        </section>
      </div>
    </div>
  )
}