import Callout from "../../../components/Callout"

export const metadata = {
  title: 'Was passiert am 02.08.2026? EU AI Act Enforcement-Start | AI Engineering Wiki',
  description:
    'Am 2. August 2026 starten Marktaufsicht und Strafrahmen des EU AI Act. Was nach dem Digital Omnibus (Juni 2026) konkret gilt, was verschoben wurde und welche 6 Schritte KMUs jetzt gehen müssen.',
}

export default function AiActAugust2026Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">02.08.2026 — was am Enforcement-Start des EU AI Act passiert</h1>
        <p className="text-gray-400 mt-2">Compliance · 10 min · Stand: Juli 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Überblick">
          Am <strong>2. August 2026</strong> beginnt die Anwendung der meisten
          Bestimmungen des EU AI Act — inklusive Marktaufsicht und Strafrahmen.
          Ab diesem Tag können Behörden Strafen verhängen — bis zu EUR 35 Mio.
          oder 7 % des weltweiten Jahresumsatzes (je nachdem, welcher Betrag
          höher ist). Der <strong>Digital Omnibus vom Juni 2026</strong> hat die
          Pflichten für Hochrisiko-KI verschoben (eigenständige Systeme auf
          02.12.2027, eingebettete auf 02.08.2028) — an Art. 4 (KI-Kompetenz,
          gilt seit 02.02.2025) und Art. 5 (Verbote) hat er nichts geändert.
          Wer KI im Unternehmen einsetzt, braucht weiterhin nachweisbare
          Schulung, ein KI-Inventar und einen dokumentierten Prozess für
          Risikoeinschätzung.
        </Callout>

        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mt-6">
          <p className="text-red-300 text-sm">
            <strong>Hard Date:</strong> 2. August 2026 — Anwendungsbeginn nach
            Art. 113 lit. b der Verordnung (EU) 2024/1689 für die meisten
            Bestimmungen. Der Digital Omnibus (EP-Billigung 16.06.2026) hat
            gezielt die Hochrisiko-Fristen und die Kennzeichnungspflicht
            verschoben — nicht aber Art. 4, Art. 5 oder den Start der
            Marktaufsicht.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Was ändert sich am 2. August 2026 konkret?</h2>

        <p className="text-gray-300">
          Bis dahin galten viele Teile des EU AI Act bereits — aber ohne aktiven
          Strafrahmen. Ab dem Enforcement-Datum greifen drei Blöcke parallel:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">1. Governance-Strukturen werden operativ</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>Nationale Aufsichtsbehörden (Market Surveillance Authorities) müssen benannt sein</li>
              <li>Notified Bodies für Konformitätsbewertung von High-Risk-Systemen sind akkreditiert</li>
              <li>Das European AI Office (Brüssel) übernimmt die Aufsicht über General-Purpose AI</li>
              <li>EU AI Board und Advisory Forum starten formell</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">2. GPAI-Pflichten (Art. 51-55) gelten verbindlich</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>Anbieter von General-Purpose AI Modellen (z.B. GPT, Llama, Mistral) müssen technische Dokumentation vorhalten</li>
              <li>Modelle mit systemischem Risiko (FLOPS-Schwelle 10^25) brauchen zusätzliche Risikobewertung + Cybersicherheit-Nachweise</li>
              <li>Transparenzpflicht: Trainings-Daten-Zusammenfassung muss veröffentlicht werden</li>
              <li>Copyright-Compliance gegenüber EU-Urheberrecht (Text-und-Data-Mining-Opt-Out)</li>
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">3. Art. 4 (KI-Kompetenz) wird behördlich durchsetzbar</h3>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>Art. 4 (KI-Kompetenz) gilt rechtlich seit 02.02.2025 — bislang ohne aktive Aufsicht</li>
              <li>Ab 02.08.2026: Die nationalen Marktaufsichtsbehörden können Art.-4-Verstöße mit Sanktionen und Maßnahmen nach nationalem Recht belegen (Art. 99 Abs. 1); Art. 99 Abs. 4 sieht für Art. 4 keinen eigenen EU-Bußgeldtatbestand vor</li>
              <li>Art. 5 (Verbote) wird durchsetzbar mit bis zu EUR 35 Mio. oder 7% Umsatz (Art. 99 Abs. 3)</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Digital Omnibus: Was am 02.08.2026 NICHT mehr startet</h2>

        <p className="text-gray-300">
          Das Europäische Parlament hat am <strong>16. Juni 2026</strong> die Änderungen aus dem
          „Digital Omnibus on AI&ldquo; in erster Lesung gebilligt (423/57/174). Damit verschieben
          sich gegenüber dem ursprünglichen Zeitplan:
        </p>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li><strong>Eigenständige Hochrisiko-KI (Anhang III):</strong> Pflichten ab 02.12.2027 statt 02.08.2026</li>
              <li><strong>Eingebettete Hochrisiko-KI (regulierte Produkte, Anhang I):</strong> Pflichten ab 02.08.2028 statt 02.08.2027</li>
              <li><strong>Maschinenlesbare Kennzeichnung KI-generierter Inhalte:</strong> für vor dem 02.08.2026 in Verkehr gebrachte Systeme bis 02.12.2026 verschoben</li>
              <li><strong>Neu:</strong> Verbot von „Nudifier&ldquo;-Apps und KI-generiertem Missbrauchsmaterial — Übergangsfrist bis 02.12.2026</li>
            </ul>
            <p className="text-gray-500 text-xs mt-3">
              Formale Annahme durch den Rat und Veröffentlichung im EU-Amtsblatt wurden für
              Juli 2026 erwartet.
              {/* [PRÜFEN] Amtsblatt-Veröffentlichung der Omnibus-Änderungsverordnung vor Publish
                  verifizieren (Stand Redaktionsschluss 17.07.2026 nicht T1-belegt). */}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Wer ist betroffen?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Rolle</th>
                <th className="text-left py-2 text-gray-400">Was ab 02.08.2026 verpflichtend ist</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>KMU als Deployer</strong></td>
                <td className="py-2">Nachweisbare KI-Kompetenz für alle Mitarbeitenden, die mit KI arbeiten. KI-Inventar pflichtig.</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>KMU als Provider</strong></td>
                <td className="py-2">Wer eigene KI-Funktionen in Produkten anbietet, braucht Risiko-Klassifizierung pro System.</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>GPAI-Anbieter</strong></td>
                <td className="py-2">Volle technische Dokumentation, Copyright-Statement, Trainingsdaten-Summary.</td>
              </tr>
              <tr>
                <td className="py-2 align-top"><strong>Behörden / öffentliche Stellen</strong></td>
                <td className="py-2">Zusätzlich: Fundamental-Rights-Impact-Assessment (Art. 27) für High-Risk-Systeme.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">6 Schritte für KMUs bis zum 02.08.2026</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ol className="text-gray-300 space-y-3">
            <li>
              <strong>1. KI-Inventar erstellen</strong>
              <p className="text-sm text-gray-400 mt-1">Welche KI-Tools werden eingesetzt? ChatGPT, Copilot, KI-Buchhaltung, KI-Übersetzer, Chatbot, Recruiting-KI — alles erfassen mit Hersteller, Zweck, Datenfluss.</p>
            </li>
            <li>
              <strong>2. Risikoklasse pro System bestimmen</strong>
              <p className="text-sm text-gray-400 mt-1">Verboten (Art. 5), High-Risk (Anhang III), Limited-Risk (Transparenzpflicht), Minimal-Risk. Vorlage: EU AI Act Risikoklassen.</p>
            </li>
            <li>
              <strong>3. KI-Kompetenz-Schulung dokumentieren</strong>
              <p className="text-sm text-gray-400 mt-1">Wer wurde wann zu welchem Thema geschult? Schulungsprotokolle, Teilnahmebestätigungen, jährliche Auffrischung.</p>
            </li>
            <li>
              <strong>4. Transparenz-Pflichten implementieren</strong>
              <p className="text-sm text-gray-400 mt-1">Chatbots, KI-generierte Inhalte (Bilder, Texte, Videos) sind kennzeichnungspflichtig. Disclaimer-Texte vorbereiten.</p>
            </li>
            <li>
              <strong>5. DPIA / Risikobewertung pro High-Risk-System</strong>
              <p className="text-sm text-gray-400 mt-1">Wenn personenbezogene Daten verarbeitet werden: Datenschutz-Folgenabschätzung. Bei High-Risk-KI zusätzlich KI-spezifische Risikobewertung.</p>
            </li>
            <li>
              <strong>6. Menschliche Aufsicht sicherstellen</strong>
              <p className="text-sm text-gray-400 mt-1">Art. 14 verlangt für High-Risk: KI-Entscheidungen müssen von Menschen überprüft werden können. Eskalationspfade definieren.</p>
            </li>
          </ol>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Timeline bis Enforcement</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Datum</th>
                <th className="text-left py-2 text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-gray-400">02.02.2025</td>
                <td className="py-2">Art. 4 (KI-Kompetenz) + Art. 5 (Verbote) bereits in Kraft — ohne Strafdurchsetzung</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-gray-400">02.08.2025</td>
                <td className="py-2">Governance-Regeln + GPAI-Pflichten gelten</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-red-400 font-semibold">02.08.2026</td>
                <td className="py-2 font-semibold">ENFORCEMENT-START — Marktaufsicht + Strafrahmen aktiv, die meisten Bestimmungen gelten (Hochrisiko-Pflichten per Omnibus verschoben)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-blue-400">02.12.2026</td>
                <td className="py-2">Omnibus: Kennzeichnungspflicht für Alt-Systeme + Ende Übergangsfrist Nudifier-Verbot</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 font-mono text-gray-500">02.12.2027</td>
                <td className="py-2">Omnibus: Pflichten für eigenständige Hochrisiko-KI (Anhang III)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-500">02.08.2028</td>
                <td className="py-2">Omnibus: Hochrisiko-KI in regulierten Produkten (Anhang I)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mt-6">
          <p className="text-yellow-200 text-sm">
            <strong>Faustregel für KMUs:</strong> Wenn dein Unternehmen ChatGPT, Copilot
            oder vergleichbare KI-Tools im Arbeitsalltag nutzt, brauchst du bis zum
            02.08.2026 mindestens: (a) ein dokumentiertes KI-Inventar, (b) Schulungsnachweise
            für alle Mitarbeitenden, (c) eine schriftliche Risikoeinschätzung pro System.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Häufige Missverständnisse</h2>

        <div className="space-y-3 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-300">
              <strong className="text-white">„Wir sind zu klein, das gilt nicht für uns."</strong>
              <br />
              Falsch. Es gibt keine KMU-Ausnahme von Art. 4. Reduzierte Strafhöchstbeträge ja,
              aber die Pflicht selbst gilt unabhängig von Unternehmensgröße.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-300">
              <strong className="text-white">„Wir nutzen nur ChatGPT, das ist doch kein KI-System nach AI Act."</strong>
              <br />
              Falsch. Sobald du ChatGPT geschäftlich einsetzt, bist du Deployer eines KI-Systems
              im Sinne der Verordnung — Art. 4 greift.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-300">
              <strong className="text-white">„Ein Online-Kurs reicht als Nachweis."</strong>
              <br />
              Nur teilweise. Der EU AI Act verlangt Schulung passend zur Rolle und zum Kontext —
              ein generischer 30-min-Kurs ist meist zu dünn. Buchhaltung, HR und Entwicklung brauchen
              unterschiedliche Inhalte.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-300">
              <strong className="text-white">„Erst wenn eine Behörde fragt, müssen wir reagieren."</strong>
              <br />
              Riskant. Bei einem Datenschutz-Vorfall mit KI-Beteiligung würde fehlende Dokumentation
              als verschärfender Umstand gewertet — auch ohne anlasslose Prüfung.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Was AI Engineering empfiehlt</h2>

        <p className="text-gray-300">
          Aus Sicht des AI Engineering Wiki ist die Reihenfolge wichtig: Erst das KI-Inventar,
          dann die Schulung, dann die Risikoeinschätzung. Wer mit der Risikobewertung beginnt,
          ohne zu wissen welche Systeme im Einsatz sind, dokumentiert auf Verdacht und verbringt
          mehr Zeit als nötig. Self-hosted Open-Source-Modelle (z.B. via Ollama) reduzieren die
          DSGVO-Last erheblich und vereinfachen die Risikobewertung — gleichzeitig bleibt die
          Pflicht zur KI-Kompetenz-Schulung bestehen, unabhängig vom Deployment-Ort.
        </p>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend in unserem Wiki</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">KI-Kompetenz nach Art. 4 — Praxis-Guide</a></li>
            <li>&#8226; <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act — Vollständige Übersicht</a></li>
            <li>&#8226; <a href="/compliance/eu-ai-act-checkliste" className="text-blue-400 hover:underline">EU AI Act Compliance Checkliste</a></li>
            <li>&#8226; <a href="/compliance/verifywise-integration" className="text-blue-400 hover:underline">VerifyWise — Open-Source-Tool für AI-Compliance</a></li>
            <li>&#8226; <a href="/compliance/edps-guidelines" className="text-blue-400 hover:underline">EDPS Guidelines — Was der EU-Datenschutzbeauftragte für KI vorgibt</a></li>
            <li>&#8226; <a href="/compliance/dpia" className="text-blue-400 hover:underline">DPIA — Datenschutz-Folgenabschätzung für KI</a></li>
            <li>&#8226; <a href="/compliance/self-assessment" className="text-blue-400 hover:underline">EU AI Act Readiness Check (interaktiv)</a></li>
          </ul>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-white mb-2">Weitere Inhalte auf den AI Engineering Plattformen</h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>&#8226; <strong>Hub:</strong> Kuratierte Skills und MCP Server für AI-Compliance-Workflows — <a href="https://hub.ai-engineering.at" target="_blank" className="text-blue-400 hover:underline">hub.ai-engineering.at</a></li>
            <li>&#8226; <strong>YouTube:</strong> Video-Erklärungen zu EU AI Act und Compliance — <a href="https://www.youtube.com/@AIEngineering-at" target="_blank" className="text-blue-400 hover:underline">@AIEngineering-at</a></li>
            <li>&#8226; <strong>LinkedIn:</strong> Updates zu Compliance-Deadlines — <a href="https://www.linkedin.com/in/joerg-fuchs-ai/" target="_blank" className="text-blue-400 hover:underline">Jörg Fuchs auf LinkedIn</a></li>
            <li>&#8226; <strong>GitHub:</strong> Open-Source-Vorlagen und Audit-Templates — <a href="https://github.com/AI-Engineering-at" target="_blank" className="text-blue-400 hover:underline">github.com/AI-Engineering-at</a></li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Quellen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Volltext (EUR-Lex, DE) — Verordnung (EU) 2024/1689</a></li>
          <li><a href="https://artificialintelligenceact.eu/" target="_blank" className="text-blue-400 hover:underline">AI Act Explorer — Interaktive Artikel-Datenbank</a></li>
          <li><a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" className="text-blue-400 hover:underline">EU-Kommission: Regulatory Framework for AI</a></li>
          <li><a href="https://digital-strategy.ec.europa.eu/en/policies/ai-office" target="_blank" className="text-blue-400 hover:underline">European AI Office — Aufsichtsbehörde für GPAI</a></li>
          <li><a href="https://www.wko.at/digitalisierung/ki-oesterreich" target="_blank" className="text-blue-400 hover:underline">WKO Österreich: Künstliche Intelligenz im Unternehmen</a></li>
          <li><a href="https://www.europarl.europa.eu/news/en/press-room/20260611IPR45207/ai-act-ep-approves-simplification-measures-and-nudifier-app-ban" target="_blank" className="text-blue-400 hover:underline">Europäisches Parlament: Pressemitteilung zur Plenarabstimmung Digital Omnibus on AI (16.06.2026)</a></li>
          <li><a href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers" target="_blank" className="text-blue-400 hover:underline">EU-Kommission: AI Literacy — Questions and Answers (Enforcement von Art. 4)</a></li>
        </ul>
      </div>
    </div>
  )
}
