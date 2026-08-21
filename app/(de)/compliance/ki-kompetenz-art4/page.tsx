import { alternatesFor } from '../../../../lib/alternates'


export const metadata = {
  alternates: alternatesFor('/compliance/ki-kompetenz-art4'),
  title: 'KI-Kompetenz nach Art. 4 EU AI Act',
  description:
    'Art. 4 EU AI Act: KI-Kompetenz Pflicht gilt seit 02.02.2025 für alle Unternehmen — auch nach dem Digital Omnibus 2026. Aufsicht durch nationale Marktaufsicht seit 02.08.2026. Praxis-Guide für DACH-KMUs.',
}

export default function KIKompetenzArt4Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">KI-Kompetenz nach Art. 4 EU AI Act</h1>
        <p className="text-gray-400 mt-2">Compliance · 12 min · Stand: 21. August 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4 mt-4">
          <p className="text-orange-300 text-sm">
            <strong>ACHTUNG: Art. 4 KI-Kompetenz gilt seit 2. Februar 2025!</strong> Die Pflicht
            zur KI-Kompetenz ist keine zukünftige Deadline — sie ist bereits in Kraft, und der
            Digital Omnibus vom Juni 2026 hat daran <strong>nichts geändert</strong>. Unternehmen,
            die KI-Systeme einsetzen, müssen <strong>jetzt</strong> sicherstellen, dass ihre
            Mitarbeitenden über ausreichende KI-Kompetenz verfügen. Es gibt keine
            Einheitszertifizierung, keine Pflicht zu einem AI Officer und keine
            One-size-fits-all-Schulung. Die <strong>Überwachung und Durchsetzung durch die
            nationalen Marktaufsichtsbehörden</strong> läuft seit <strong>2. August 2026</strong>;
            Sanktionen für Art.-4-Verstöße richten sich nach nationalem Recht (Art. 99 Abs. 1) —
            Details im Abschnitt „Was droht bei Nichteinhaltung?&ldquo; unten.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Digital Omnibus (Juni 2026): Was sich geändert hat — und was nicht</h2>

        <p className="text-gray-300">
          Am <strong>16. Juni 2026</strong> hat das Europäische Parlament die Änderungen am
          EU AI Act aus dem „Digital Omnibus on AI&ldquo; in erster Lesung gebilligt
          (423 Ja-Stimmen, 57 Nein, 174 Enthaltungen). Das Paket geht auf den
          Kommissionsvorschlag vom 19. November 2025 zurück. Der Rechtsakt ist inzwischen in
          Kraft: Die <strong>Verordnung (EU) 2026/1744</strong> vom 8. Juli 2026 wurde am
          <strong>24. Juli 2026</strong> im EU-Amtsblatt veröffentlicht
          (ABl. L, 2026/1744; CELEX 32026R1744) und ist am <strong>27. Juli 2026</strong>
          in Kraft getreten — also vor dem 2. August 2026. Geprüft an EUR-Lex am 21.08.2026.
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Regelung</th>
                <th className="text-left py-2 text-gray-400">Vor Omnibus</th>
                <th className="text-left py-2 text-gray-400">Nach Omnibus</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 font-semibold">Art. 4 KI-Kompetenz</td>
                <td className="py-2">Gilt seit 02.02.2025</td>
                <td className="py-2 text-green-400 font-semibold">UNVERÄNDERT — gilt weiter</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-semibold">Art. 5 Verbote</td>
                <td className="py-2">Gilt seit 02.02.2025</td>
                <td className="py-2 text-green-400 font-semibold">UNVERÄNDERT — gilt weiter</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Hochrisiko-Pflichten (eigenständige Systeme, Anhang III)</td>
                <td className="py-2">02.08.2026</td>
                <td className="py-2 text-blue-400">02.12.2027</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Hochrisiko-Pflichten (eingebettet in regulierte Produkte)</td>
                <td className="py-2">02.08.2027</td>
                <td className="py-2 text-blue-400">02.08.2028</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Maschinenlesbare Kennzeichnung KI-generierter Inhalte</td>
                <td className="py-2">02.08.2026</td>
                <td className="py-2 text-blue-400">02.12.2026 (für vor dem 02.08.2026 in Verkehr gebrachte Systeme)</td>
              </tr>
              <tr>
                <td className="py-2">Neu: Verbot von „Nudifier&ldquo;-Apps / KI-generiertem Missbrauchsmaterial</td>
                <td className="py-2">—</td>
                <td className="py-2 text-blue-400">Übergangsfrist bis 02.12.2026</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4 mt-4">
          <p className="text-orange-300 text-sm">
            <strong>Kernbotschaft für KMUs:</strong> Der Digital Omnibus verschiebt
            Hochrisiko-Fristen — er ist <strong>keine Entwarnung für Art. 4</strong>. Die
            KI-Kompetenz-Pflicht gilt unverändert seit Februar 2025, und die Aufsicht durch
            die nationalen Marktaufsichtsbehörden läuft seit dem 2. August 2026.
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
          <figcaption className="text-center text-white/40 text-sm mt-2">Art. 4 Timeline: Pflicht seit 02.02.2025 — Enforcement seit August 2026</figcaption>
        </figure>

        <figure className="my-8">
          <img src="/images/infographics/ki-kompetenz-schulungsplan.png" alt="KI-Kompetenz Schulungsplan — 4 Kompetenzbereiche" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">KI-Kompetenz Schulungsplan: Die 4 Kompetenzbereiche für die Umsetzung von Art. 4</figcaption>
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

        <h2 className="text-xl font-semibold text-white mt-8">Was droht bei Nichteinhaltung?</h2>

        <p className="text-gray-300">
          Wichtig für die ehrliche Einordnung: Art. 4 ist im EU-Bußgeldkatalog des
          Art. 99 Abs. 4 <strong>nicht als eigener Bußgeldtatbestand gelistet</strong>. Verstöße
          gegen die KI-Kompetenz-Pflicht werden stattdessen über zwei Wege durchgesetzt
          (Quelle: EU-Kommission, AI-Literacy-FAQ):
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li><strong>Öffentliche Durchsetzung:</strong> Die nationalen Marktaufsichtsbehörden
            können seit dem 2. August 2026 Verstöße gegen Art. 4 mit Sanktionen und
            Aufsichtsmaßnahmen belegen — auf Basis der nationalen Sanktionsregeln, die die
            Mitgliedstaaten nach Art. 99 Abs. 1 festlegen müssen. Die Durchsetzung folgt
            einem Verhältnismäßigkeitsansatz.</li>
          <li><strong>Private Durchsetzung / Haftung:</strong> Kommt es zu einem Schaden, weil
            Personal ohne ausreichende Schulung mit einem KI-System gearbeitet hat, kann
            fehlende KI-Kompetenz nach nationalem Recht haftungsrelevant werden.</li>
        </ul>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Verstoss</th>
                <th className="text-left py-2 text-gray-400">Rahmen</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Verbotene KI-Praktiken (Art. 5)</td>
                <td className="py-2 text-red-400 font-bold">Bis EUR 35 Mio. oder 7% Umsatz (Art. 99 Abs. 3)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Verstöße gegen die in Art. 99 Abs. 4 gelisteten Pflichten (z.B. Betreiberpflichten für Hochrisiko-KI nach Art. 26, Transparenz nach Art. 50)</td>
                <td className="py-2 text-red-400 font-bold">Bis EUR 15 Mio. oder 3% Umsatz</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Falsche Angaben an Behörden</td>
                <td className="py-2 text-red-400 font-bold">Bis EUR 7,5 Mio. oder 1% Umsatz (Art. 99 Abs. 5)</td>
              </tr>
              <tr>
                <td className="py-2">Nichteinhaltung von Art. 4 (KI-Kompetenz)</td>
                <td className="py-2 text-orange-300">Sanktionen und Maßnahmen nach nationalem Recht (Art. 99 Abs. 1) + Haftungsrisiko im Schadensfall</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-500 text-xs mt-2">
            Für KMUs und Start-ups gelten proportionale Höchstbeträge — der jeweils niedrigere Betrag.
            Fehlende Schulungsnachweise wirken zudem in jedem Aufsichts- oder Haftungsverfahren
            als erschwerender Umstand.
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
                <td className="py-2 font-semibold">Marktaufsicht + Durchsetzung gestartet (inkl. Art. 4); die meisten übrigen Bestimmungen gelten</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-blue-400">02.12.2026</td>
                <td className="py-2">Omnibus: maschinenlesbare Kennzeichnung KI-generierter Inhalte (Alt-Systeme) + Ende der Übergangsfrist für das Nudifier-Verbot</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-gray-500">02.12.2027</td>
                <td className="py-2">Omnibus: Pflichten für eigenständige Hochrisiko-KI (Anhang III) — vorher 02.08.2026</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-500">02.08.2028</td>
                <td className="py-2">Omnibus: Hochrisiko-KI in regulierten Produkten (Anhang I) — vorher 02.08.2027</td>
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
            <li><strong>Zuständige Behörde:</strong> Stand 21.08.2026 ist in Österreich
              <strong>keine nationale Marktüberwachungsbehörde nach dem AI Act kundgemacht</strong>.
              Im konsolidierten Bundesrecht (RIS) liegt dazu kein Gesetz vor: Die Titelsuche
              „künstliche Intelligenz&ldquo; liefert am 21.08.2026 keinen Treffer
              (Positivkontrolle „Datenschutzgesetz&ldquo; über dieselbe Suche: 144 Treffer).
              Der Entschließungsantrag 517/A(E) „KI-Behörde endlich benennen&ldquo; wurde im
              Wissenschaftsausschuss des Nationalrats zuletzt am 3. Juni 2026 vertagt.
              Die RTR (Rundfunk und Telekom Regulierungs-GmbH) betreibt die KI-Servicestelle
              als Informations- und Anlaufstelle — das ist eine Service-, keine Aufsichtsfunktion.
              Geprüft an RIS und parlament.gv.at am 21.08.2026.
            </li>
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
            {/* Schulungs-Link — aktivieren, sobald kurse.ai-engineering.at live ist
                (vor Aktivierung: DNS + HTTP live prüfen, M-Regel Live-Status pre Brand-Claim):
            <li>&#8226; <strong>Schulung:</strong>{" "}
              <a href="https://kurse.ai-engineering.at" className="text-blue-400 hover:underline">
                KI-Kompetenz-Schulungen für KMUs (kurse.ai-engineering.at)
              </a>
            </li>
            */}
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Quellen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Volltext (EUR-Lex, DE)</a></li>
          <li><a href="https://artificialintelligenceact.eu/article/4/" target="_blank" className="text-blue-400 hover:underline">Art. 4 AI Literacy (AI Act Explorer)</a></li>
          <li><a href="https://www.wko.at/digitalisierung/ki-oesterreich" target="_blank" className="text-blue-400 hover:underline">WKO: Künstliche Intelligenz im Unternehmen</a></li>
          <li><a href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers" target="_blank" className="text-blue-400 hover:underline">EU-Kommission: AI Literacy — Questions and Answers</a></li>
          <li><a href="https://www.europarl.europa.eu/news/en/press-room/20260611IPR45207/ai-act-ep-approves-simplification-measures-and-nudifier-app-ban" target="_blank" className="text-blue-400 hover:underline">Europäisches Parlament: Pressemitteilung zur Plenarabstimmung Digital Omnibus on AI (16.06.2026)</a></li>
          <li><a href="https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/" target="_blank" className="text-blue-400 hover:underline">Rat der EU: Vorläufige Einigung zum Digital Omnibus on AI (07.05.2026)</a></li>
        </ul>
      </div>
    </div>
  )
}
