

export const metadata = {
  title: 'KI-Kompetenz nach Art. 4 EU AI Act | AI Engineering Wiki',
  description:
    'Art. 4 EU AI Act: KI-Kompetenz Pflicht gilt seit 02.02.2025 für alle Unternehmen. Enforcement ab 08.2026, Strafen bis EUR 15 Mio. Praxis-Guide für DACH-KMUs.',
}

export default function KIKompetenzArt4Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">KI-Kompetenz nach Art. 4 EU AI Act</h1>
        <p className="text-gray-400 mt-2">Compliance · 12 min · Stand: März 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4 mt-4">
          <p className="text-orange-300 text-sm">
            <strong>ACHTUNG: Art. 4 KI-Kompetenz gilt seit 2. Februar 2025!</strong> Die Pflicht
            zur KI-Kompetenz ist keine zukünftige Deadline — sie ist bereits in Kraft.
            Unternehmen, die KI-Systeme einsetzen, müssen <strong>jetzt</strong> sicherstellen,
            dass ihre Mitarbeitenden über ausreichende KI-Kompetenz verfügen. Es gibt keine
            Einheitszertifizierung, keine Pflicht zu einem AI Officer und keine
            One-size-fits-all-Schulung. Die <strong>Überwachung und Durchsetzung (Enforcement)
            mit Strafen bis EUR 15 Mio. oder 3% des weltweiten Jahresumsatzes</strong> startet
            ab <strong>August 2026</strong>.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Was ist Art. 4?</h2>
        <p className="text-gray-300">
          Artikel 4 des EU AI Act (Verordnung (EU) 2024/1689) verpflichtet <strong>alle
          Anbieter und Betreiber</strong> von KI-Systemen, sicherzustellen, dass ihr Personal
          über ein ausreichendes Mass an KI-Kompetenz verfügt. Das gilt unabhängig von der
          Risikoklasse des KI-Systems — also auch für Minimal-Risk-Anwendungen wie Chatbots
          oder Empfehlungssysteme.
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Art. 4 im Wortlaut (Kernaussage)</h3>
          <blockquote className="text-gray-300 text-sm italic border-l-4 border-blue-500 pl-4">
            &ldquo;Anbieter und Betreiber von KI-Systemen ergreifen Maßnahmen, um nach besten
            Kräften sicherzustellen, dass ihr Personal und andere Personen, die in ihrem
            Auftrag mit dem Betrieb und der Nutzung von KI-Systemen befasst sind, über ein
            ausreichendes Mass an KI-Kompetenz verfügen, wobei ihre technischen Kenntnisse,
            ihre Erfahrung, ihre Ausbildung und Schulung sowie der Kontext, in dem die
            KI-Systeme eingesetzt werden sollen, [...] zu berücksichtigen sind.&rdquo;
          </blockquote>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/ki-kompetenz-betroffen-matrix.png" alt="KI-Kompetenz Betroffenen-Matrix — Wer muss geschult werden" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Betroffenen-Matrix: Welche Rollen im Unternehmen KI-Kompetenz nachweisen müssen</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Wer ist betroffen?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Rolle</th>
                <th className="text-left py-2 text-gray-400">Beispiele</th>
                <th className="text-left py-2 text-gray-400">Betroffen?</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">KI-Anbieter</td>
                <td className="py-2">Software-Hersteller, SaaS mit KI-Features</td>
                <td className="py-2 text-red-400 font-bold">Ja</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">KI-Betreiber (Deployer)</td>
                <td className="py-2">Jedes Unternehmen das KI-Tools nutzt</td>
                <td className="py-2 text-red-400 font-bold">Ja</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Mitarbeitende</td>
                <td className="py-2">Alle die KI-Systeme bedienen oder damit arbeiten</td>
                <td className="py-2 text-red-400 font-bold">Ja</td>
              </tr>
              <tr>
                <td className="py-2">Endnutzer (Privatpersonen)</td>
                <td className="py-2">Private ChatGPT-Nutzung</td>
                <td className="py-2 text-green-400">Nein</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-300 mt-4">
          In Österreich sind schätzungsweise <strong>400.000 Unternehmen</strong> betroffen —
          jedes KMU, das ChatGPT, Copilot, KI-gestützte Buchhaltung oder andere KI-Tools
          einsetzt. In Deutschland und der Schweiz gilt das entsprechend für alle Firmen
          im EU/EWR-Raum.
        </p>

        <figure className="my-8">
          <img src="/images/infographics/art4-timeline.png" alt="Art. 4 EU AI Act Timeline — Fristen und Pflichten" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Art. 4 Timeline: Pflicht seit 02.02.2025 — Enforcement ab August 2026</figcaption>
        </figure>

        <figure className="my-8">
          <img src="/images/infographics/ki-kompetenz-schulungsplan.png" alt="KI-Kompetenz Schulungsplan — 4 Kompetenzbereiche" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">KI-Kompetenz Schulungsplan: Die 4 Kompetenzbereiche für Art. 4 Compliance</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Was muss geschult werden?</h2>

        <p className="text-gray-300">
          Der EU AI Act definiert keine fixen Lehrpläne, aber aus dem Gesetzestext und den
          Erwägungsgründen lassen sich folgende Kompetenzbereiche ableiten:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">1. Grundverständnis KI</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>Was ist künstliche Intelligenz, was kann sie, was nicht</li>
              <li>Unterschied zwischen regelbasierten Systemen und Machine Learning</li>
              <li>Grundbegriffe: Modell, Training, Inference, Halluzination</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">2. Risiken und Limitationen</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>Bias und Diskriminierung in KI-Ausgaben</li>
              <li>Halluzinationen und fehlerhafte Outputs</li>
              <li>Datenschutz-Risiken bei Cloud-KI (Drittlandtransfer)</li>
              <li>Manipulationsrisiken (Prompt Injection)</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">3. Rechtlicher Rahmen</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>EU AI Act Risikoklassen (Verboten, Hoch, Mittel, Minimal)</li>
              <li>Transparenzpflichten (Kennzeichnung von KI-generierten Inhalten)</li>
              <li>DSGVO-Anforderungen bei KI-Nutzung</li>
              <li>Dokumentationspflichten</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">4. Praktische Anwendung</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>Verantwortungsvoller Umgang mit KI-Tools im Arbeitsalltag</li>
              <li>Wann KI-Ergebnisse prüfen, wann vertrauen</li>
              <li>Meldepflichten bei Fehlfunktionen</li>
              <li>Menschliche Aufsicht sicherstellen</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Strafen bei Nichteinhaltung</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Verstoss</th>
                <th className="text-left py-2 text-gray-400">Strafe</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Verbotene KI-Praktiken (Art. 5)</td>
                <td className="py-2 text-red-400 font-bold">Bis EUR 35 Mio. oder 7% Umsatz</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Nichteinhaltung von Art. 4 (KI-Kompetenz)</td>
                <td className="py-2 text-red-400 font-bold">Bis EUR 15 Mio. oder 3% Umsatz</td>
              </tr>
              <tr>
                <td className="py-2">Falsche Angaben an Behörden</td>
                <td className="py-2 text-red-400 font-bold">Bis EUR 7,5 Mio. oder 1% Umsatz</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-500 text-xs mt-2">
            Für KMUs und Start-ups gelten proportionale Höchstbeträge — der jeweils niedrigere Betrag.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Timeline</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Datum</th>
                <th className="text-left py-2 text-gray-400">Was passiert</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-gray-400">12.07.2024</td>
                <td className="py-2">Im EU-Amtsblatt veröffentlicht</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-gray-400">01.08.2024</td>
                <td className="py-2">EU AI Act in Kraft getreten</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-green-400 font-semibold">02.02.2025</td>
                <td className="py-2 font-semibold">Verbote (Art. 5) + KI-Kompetenz (Art. 4) GELTEN BEREITS</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-blue-400">02.08.2025</td>
                <td className="py-2">Governance-Regeln gelten</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-red-400 font-semibold">02.08.2026</td>
                <td className="py-2 font-semibold">Vollständige Anwendung + Enforcement/Überwachung startet, Strafen möglich</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-500">02.08.2027</td>
                <td className="py-2">Hochrisiko-KI in regulierten Produkten</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Checkliste: KI-Kompetenz umsetzen</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-gray-300 space-y-2">
            <li>1. <strong>Inventar erstellen:</strong> Welche KI-Systeme setzt dein Unternehmen ein?</li>
            <li>2. <strong>Betroffene identifizieren:</strong> Welche Mitarbeitenden arbeiten mit KI?</li>
            <li>3. <strong>Schulungsbedarf ermitteln:</strong> Welches Kompetenzniveau ist nötig (abhängig von Rolle und Risikoklasse)?</li>
            <li>4. <strong>Schulungen durchführen:</strong> Grundlagen, Risiken, rechtlicher Rahmen, praktische Anwendung</li>
            <li>5. <strong>Dokumentation:</strong> Schulungsnachweise aufbewahren (wer, wann, was)</li>
            <li>6. <strong>Regelmäßig wiederholen:</strong> KI entwickelt sich schnell — Schulungen jährlich aktualisieren</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Schulungsnachweis führen</h2>

        <p className="text-gray-300">
          Der AI Act verlangt keine bestimmte Zertifizierung, aber du musst nachweisen können,
          dass du &ldquo;nach besten Kräften&rdquo; Maßnahmen ergriffen hast. Das bedeutet:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Schulungsprotokolle mit Datum, Teilnehmer, Inhalt</li>
          <li>Regelmäßige Auffrischung (mindestens jährlich)</li>
          <li>Anpassung an den Kontext (HR-Abteilung braucht andere Schulung als IT)</li>
          <li>Nachweisbare Materialien (Unterlagen, Tests, Teilnahmebestätigung)</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Österreich-spezifisch</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-gray-300 space-y-2">
            <li><strong>Zuständige Behörde:</strong> Noch nicht final festgelegt (Stand März 2026). Die RTR (Rundfunk und Telekom Regulierungs-GmbH) ist als Marktaufsichtsbehörde im Gespräch.</li>
            <li><strong>Gewerberecht:</strong> KI-Schulungen fallen unter freies Gewerbe (Lebens- und Sozialberatung, Unternehmensberatung) — keine Gewerbeberechtigung nötig für allgemeine KI-Schulungen.</li>
            <li><strong>WKO Förderungen:</strong> Digitalisierungsförderungen des BMAW können für KI-Schulungen genutzt werden.</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <strong>EU AI Act Überblick:</strong>{" "}
              <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act: Was du wissen musst</a>
            </li>
            <li>&#8226; <strong>Checkliste:</strong>{" "}
              <a href="/compliance/eu-ai-act-checkliste" className="text-blue-400 hover:underline">EU AI Act Compliance Checkliste</a>
            </li>
            <li>&#8226; <strong>Verbotene Praktiken:</strong>{" "}
              <a href="/compliance/verbotene-ai-praktiken" className="text-blue-400 hover:underline">Art. 5 Verbote</a>
            </li>
            <li>&#8226; <strong>DSGVO:</strong>{" "}
              <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:underline">DSGVO Grundlagen</a>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Quellen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Volltext (EUR-Lex, DE)</a></li>
          <li><a href="https://artificialintelligenceact.eu/article/4/" target="_blank" className="text-blue-400 hover:underline">Art. 4 AI Literacy (AI Act Explorer)</a></li>
          <li><a href="https://www.wko.at/digitalisierung/künstliche-intelligenz" target="_blank" className="text-blue-400 hover:underline">WKO: Künstliche Intelligenz im Unternehmen</a></li>
          <li><a href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers" target="_blank" className="text-blue-400 hover:underline">EU-Kommission: AI Literacy — Questions and Answers</a></li>
        </ul>
      </div>
    </div>
  )
}
