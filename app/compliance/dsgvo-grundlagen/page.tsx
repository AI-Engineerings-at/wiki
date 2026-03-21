import { CaseStudyBox } from '../../../components/CaseStudyBox'
import Callout from "../../../components/Callout"

export const metadata = {
  title: 'DSGVO Grundlagen | AI Engineering Wiki',
  description:
    'DSGVO-Grundlagen für AI-Systeme: Pflichten, Rechtsgrundlagen, Dokumentation und Praxis-Hinweise. Kein Ersatz für Rechtsberatung.',
}

export default function DsgvoGrundlagen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">DSGVO Grundlagen für AI-Systeme</h1>
        <p className="text-gray-400 mt-2">Compliance · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Die DSGVO regelt den Schutz personenbezogener Daten in der EU. Für AI-Systeme
            bedeutet das: Rechtsgrundlage pruefen, Verarbeitungsverzeichnis fuehren,
            Betroffenenrechte sicherstellen und bei Hochrisiko-Verarbeitungen eine
            Datenschutz-Folgenabschaetzung durchfuehren. Self-Hosted AI hat dabei
            einen klaren Vorteil — kein Drittlandtransfer, volle Kontrolle.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Die Datenschutz-Grundverordnung (DSGVO) gilt seit 25. Mai 2018. Für Unternehmen,
          die AI-Systeme einsetzen, gibt es besondere Pflichten. Dieser Guide erklärt die
          Grundlagen — einfach und praxisnah.
        </p>

        <Callout type="warning" title="Keine Rechtsberatung">
          <p>
            Dies sind allgemeine Informationen, keine Rechtsberatung. Bei spezifischen
            Fragen wende dich an einen Datenschutzbeauftragten oder Anwalt.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Wer ist betroffen?</h2>
        
        <p className="text-gray-300 mt-2">
          Die DSGVO gilt für:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Unternehmen mit Sitz in der EU</li>
          <li>Unternehmen, die Daten von EU-Bürgern verarbeiten</li>
          <li>Alle, die personenbezogene Daten automatisiert verarbeiten</li>
        </ul>

        <figure className="my-8">
          <img src="/images/infographics/dsgvo-6-grundsaetze.png" alt="DSGVO 6 Grundsaetze — Rechtmaessigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integritaet" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Die 6 DSGVO-Grundsaetze nach Art. 5: Basis für jeden Datenschutz</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Die 6 Grundsätze (Art. 5)</h2>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">1. Rechtmäßigkeit, Transparenz</h3>
            <p className="text-gray-300 text-sm mt-1">
              Daten nur mit Rechtsgrundlage verarbeiten. Transparente Kommunikation gegenüber Betroffenen.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">2. Zweckbindung</h3>
            <p className="text-gray-300 text-sm mt-1">
              Daten nur für festgelegte, eindeutige und legitime Zwecke erheben. Nicht zweckentfremden.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">3. Datenminimierung</h3>
            <p className="text-gray-300 text-sm mt-1">
              Nur Daten erheben, die für den Zweck notwendig sind. So wenig wie möglich.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">4. Richtigkeit</h3>
            <p className="text-gray-300 text-sm mt-1">
              Daten müssen aktuell und korrekt sein. Unrichtige Daten sind zu löschen oder zu berichtigen.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">5. Speicherbegrenzung</h3>
            <p className="text-gray-300 text-sm mt-1">
              Daten nur so lange speichern, wie für den Zweck nötig. Dann löschen.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">6. Integrität & Vertraulichkeit</h3>
            <p className="text-gray-300 text-sm mt-1">
              Angemessene Sicherheit gewährleisten. Schutz vor unbefugtem Zugriff, Verlust, Zerstörung.
            </p>
          </div>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/dsgvo-checkliste.png" alt="DSGVO Checkliste für AI-Systeme" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">DSGVO Checkliste: Die wichtigsten Pflichten für AI-Systeme auf einen Blick</figcaption>
        </figure>

        <figure className="my-8">
          <img src="/images/infographics/dsgvo-rechtsgrundlagen.png" alt="DSGVO Rechtsgrundlagen nach Art. 6 — Einwilligung, Vertrag, berechtigtes Interesse" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">DSGVO Rechtsgrundlagen: Wann du personenbezogene Daten verarbeiten darfst</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Rechtsgrundlagen (Art. 6)</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Rechtsgrundlage</th>
                <th className="text-left py-2 text-gray-400">Beschreibung</th>
                <th className="text-left py-2 text-gray-400">AI-Beispiel</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Einwilligung</td>
                <td className="py-2">Freiwillig, widerrufbar</td>
                <td className="py-2">Newsletter, Personalisierung</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Vertrag</td>
                <td className="py-2">Zur Vertragserfüllung nötig</td>
                <td className="py-2">Bestellabwicklung</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Berechtigtes Interesse</td>
                <td className="py-2">Abwägung mit Rechten des Betroffenen</td>
                <td className="py-2">Betrugsprävention</td>
              </tr>
              <tr>
                <td className="py-2">Gesetzliche Pflicht</td>
                <td className="py-2">Rechtliche Verpflichtung</td>
                <td className="py-2">Buchhaltung</td>
              </tr>
            </tbody>
          </table>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/dsgvo-betroffenenrechte.png" alt="DSGVO Betroffenenrechte — Auskunft, Berichtigung, Loeschung, Widerspruch" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Betroffenenrechte nach DSGVO: Auskunft, Berichtigung, Loeschung und mehr</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Rechte der Betroffenen (Art. 15-22)</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Auskunftsrecht (Art. 15)</strong> — Welche Daten werden verarbeitet?</li>
          <li><strong>Recht auf Berichtigung (Art. 16)</strong> — Falsche Daten korrigieren</li>
          <li><strong>Recht auf Löschung (Art. 17)</strong> — "Recht auf Vergessenwerden"</li>
          <li><strong>Recht auf Einschränkung (Art. 18)</strong> — Verarbeitung stoppen</li>
          <li><strong>Datenübertragbarkeit (Art. 20)</strong> — Daten in anderes System mitnehmen</li>
          <li><strong>Widerspruch (Art. 21)</strong> — Gegen bestimmte Verarbeitungen widersprechen</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Pflichten für AI-Systeme</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Was du bei AI-Systemen beachten musst:</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Pflicht</th>
                <th className="text-left py-2 text-gray-400">Beschreibung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Verarbeitungsverzeichnis</td>
                <td className="py-2">Art. 30 — Dokumentation aller Verarbeitungen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Datenschutz-Folgenabschätzung</td>
                <td className="py-2">DPIA — Bei voraussichtlich hohem Risiko</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Auftragsverarbeitung</td>
                <td className="py-2">AVV — Mit allen Dienstleistern abschließen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Datenschutz-Folgenabschätzung</td>
                <td className="py-2">DPIA — Pflicht bei automatisierter Entscheidungsfindung</td>
              </tr>
              <tr>
                <td className="py-2">Transparenz</td>
                <td className="py-2">Betroffene über AI-Einsatz informieren</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Art. 30 Verarbeitungsverzeichnis</h2>

        <p className="text-gray-300">
          Jedes Unternehmen muss führen: Ein Verzeichnis aller Verarbeitungstätigkeiten.
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Muss enthalten:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Name und Kontakt des Verantwortlichen</li>
            <li>• Zweck der Verarbeitung</li>
            <li>• Kategorien personenbezogener Daten</li>
            <li>• Kategorien von Empfängern</li>
            <li>• Löschfristen</li>
            <li>• Beschreibung der technischen Maßnahmen (Art. 32)</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Beispiel: Verarbeitungsverzeichnis</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Verarbeitungsverzeichnis (Art. 30 DSGVO)

## 1. Verantwortlicher
Name: Max Mustermann
Adresse: Musterstraße 1, 1010 Wien
Email: max@musterfirma.at

## 2. Verarbeitung: Kundendaten

### Zweck
- Bestellabwicklung
- Kundenkommunikation
- Buchhaltung

### Kategorien personenbezogener Daten
- Name, Adresse, Email
- Bestellhistorie
- Zahlungsdaten

### Kategorien von Empfängern
- Stripe (Zahlungsabwicklung)
- Buchhaltung (gesetzliche Pflicht)

### Löschfristen
- Bestelldaten: 7 Jahre (Buchhaltung)
- Marketing-Daten: nach Widerruf

### Technische Maßnahmen (Art. 32)
- TLS-Verschlüsselung
- Zugangskontrollen
- Backups`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Lokaler AI-Stack = DSGVO-Vorteil</h2>

        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Warum Self-Hosted die DSGVO erleichtert:</h3>
          <ul className="text-gray-300 space-y-2">
            <li>✅ <strong>Kein Drittlandtransfer</strong> — Daten verlassen nicht die EU</li>
            <li>✅ <strong>Volle Kontrolle</strong> — Du bestimmst, wer Zugriff hat</li>
            <li>✅ <strong>Kein Cloud-Risiko</strong> — Keine USA-Patriot-Act Gefahr</li>
            <li>✅ <strong>Einfache Dokumentation</strong> — Alles auf deiner Hardware</li>
            <li>✅ <strong>Schnelle Löschung</strong> — physische Kontrolle über Daten</li>
          </ul>
        </div>

        <CaseStudyBox
          tool="einen komplett lokalen AI-Stack"
          stat="0 Cloud-Abhaengigkeiten"
          description="— alle Daten bleiben auf unseren eigenen Servern"
          blogLink="/blog/2026-03-08-dsgvo-konformer-ai-stack"
          productLink="https://buy.stripe.com/bJe7sLb7N92ha9MejWfQI02"
          productName="DSGVO Compliance Bundle (EUR 79)"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Checkliste: DSGVO-Bereitschaft</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-gray-300 space-y-2">
            <li>☐ Verarbeitungsverzeichnis (Art. 30) erstellt</li>
            <li>☐ Datenschutzerklärung auf Website</li>
            <li>☐ Impressum vollständig (ECG §5)</li>
            <li>☐ AVV mit allen Dienstleistern (Stripe, Hosting, etc.)</li>
            <li>☐ Löschkonzept dokumentiert</li>
            <li>☐ Betroffenenrechte-Prozesse definiert</li>
            <li>☐ Technische Maßnahmen (Art. 32) dokumentiert</li>
            <li>☐ DPIA durchgeführt (falls AI-Systeme Hochrisiko)</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend</h3>
          <ul className="text-slate-300 space-y-1">
            <li>• <strong>Art. 30 Template:</strong>{" "}
              <a href="/compliance/art30" className="text-blue-400 hover:underline">Verarbeitungsverzeichnis →</a>
            </li>
            <li>• <strong>DPIA für KI:</strong>{" "}
              <a href="/compliance/dpia" className="text-blue-400 hover:underline">Datenschutz-Folgenabschätzung →</a>
            </li>
            <li>• <strong>EU AI Act:</strong>{" "}
              <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline">Leitfaden →</a>
            </li>
          </ul>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EUR-Lex: Verordnung (EU) 2016/679 — DSGVO Volltext</a></li>
            <li><a href="https://www.dsb.gv.at/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Österreichische Datenschutzbehoerde (DSB)</a> — Nationale Aufsichtsbehoerde</li>
            <li><a href="https://www.edpb.europa.eu/edpb_en" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">European Data Protection Board (EDPB)</a> — Leitlinien und Empfehlungen</li>
            <li><a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001597" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RIS: Datenschutzgesetz (DSG)</a> — Österreichisches Datenschutzgesetz</li>
            <li><a href="https://www.rtr.at/rtr/service/ki-servicestelle/projekte-initiativen/Projekte_-_Initiativen.de.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RTR KI-Servicestelle</a> — Österreichische KI-Servicestelle, Projekte und Initiativen</li>
            <li><a href="https://caralegal.eu/blog/ki-richtlinie-guide-und-vorlage/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">caralegal KI-Richtlinie Guide & Vorlage</a> — Praktischer Guide für unternehmenseigene KI-Richtlinien</li>
          </ul>
        </section>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">DSGVO Compliance Bundle</h3>
            <p className="text-slate-300 mb-4">
              Alle Templates die du brauchst: Art. 30 VVT (AI-Edition), DPIA Datenschutz-Folgenabschätzung, 
              AVV-Vorlage, EU AI Act Compliance Checkliste, Betroffenenrechte-Prozess.
            </p>
            <ul className="text-sm text-slate-400 space-y-1 mb-4">
              <li>✓ Art. 30 Verarbeitungsverzeichnis (AI-Edition)</li>
              <li>✓ DPIA für KI-Systeme</li>
              <li>✓ AVV Checkliste</li>
              <li>✓ EU AI Act Readiness</li>
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