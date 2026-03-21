export const metadata = {
  title: 'Datenschutz-Folgenabschaetzung (DPIA) | AI Engineering Wiki',
  description:
    'DPIA fuer KI-Systeme: Wann ist eine Datenschutz-Folgenabschaetzung Pflicht, wie fuehrt man sie durch, und was muss dokumentiert werden.',
}

export default function DPIAPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Datenschutz-Folgenabschaetzung (DPIA)</h1>
        <p className="text-gray-400 mt-2">Compliance · 8 min · Stand: Maerz 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Eine Datenschutz-Folgenabschaetzung (Data Protection Impact Assessment, DPIA)
          ist nach Art. 35 DSGVO Pflicht, wenn eine Datenverarbeitung voraussichtlich ein
          hohes Risiko fuer die Rechte und Freiheiten natuerlicher Personen zur Folge hat.
          Bei KI-Systemen ist das haeufig der Fall.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Wann ist eine DPIA Pflicht?</h2>

        <p className="text-gray-300">
          Eine DPIA ist insbesondere erforderlich bei:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Automatisierten Einzelentscheidungen</strong> mit rechtlicher Wirkung (Art. 22 DSGVO)</li>
          <li><strong>Umfangreicher Verarbeitung besonderer Kategorien</strong> personenbezogener Daten</li>
          <li><strong>Systematischer Ueberwachung</strong> oeffentlich zugaenglicher Bereiche</li>
          <li><strong>Profiling</strong> mit erheblichen Auswirkungen auf Betroffene</li>
          <li><strong>Neuen Technologien</strong> (KI-Systeme gelten als neue Technologie)</li>
        </ul>

        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mt-4">
          <p className="text-yellow-300 text-sm">
            <strong>Faustregel:</strong> Wenn dein KI-System personenbezogene Daten verarbeitet
            und automatisierte Entscheidungen trifft oder Nutzerverhalten analysiert,
            brauchst du eine DPIA.
          </p>
        </div>

        <figure className="my-8">
          <img src="/images/diagrams/dpia-6-schritte-flow.png" alt="DPIA 6-Schritte Flow — Von der Beschreibung bis zur Ueberpruefung" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">DPIA in 6 Schritten: Der komplette Prozess fuer KI-Systeme</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">DPIA-Prozess in 6 Schritten</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ol className="text-gray-300 space-y-3">
            <li>
              <strong>1. Verarbeitung beschreiben</strong>
              <p className="text-sm text-gray-400 mt-1">Welche Daten, welcher Zweck, welche Rechtsgrundlage, welche Empfaenger?</p>
            </li>
            <li>
              <strong>2. Notwendigkeit und Verhaeltnismaessigkeit pruefen</strong>
              <p className="text-sm text-gray-400 mt-1">Ist die Verarbeitung fuer den Zweck erforderlich? Gibt es mildere Mittel?</p>
            </li>
            <li>
              <strong>3. Risiken fuer Betroffene bewerten</strong>
              <p className="text-sm text-gray-400 mt-1">Eintrittswahrscheinlichkeit und Schwere moeglicher Schaeden.</p>
            </li>
            <li>
              <strong>4. Massnahmen zur Risikominimierung definieren</strong>
              <p className="text-sm text-gray-400 mt-1">Technische und organisatorische Massnahmen (TOM), Pseudonymisierung, Zugriffskontrollen.</p>
            </li>
            <li>
              <strong>5. Dokumentation erstellen</strong>
              <p className="text-sm text-gray-400 mt-1">Ergebnisse schriftlich festhalten, Massnahmen und Restrisiken dokumentieren.</p>
            </li>
            <li>
              <strong>6. Regelmaessig ueberpruefen</strong>
              <p className="text-sm text-gray-400 mt-1">DPIA ist kein einmaliges Dokument — bei Aenderungen am System aktualisieren.</p>
            </li>
          </ol>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/dpia-risikomatrix.png" alt="DPIA Risikomatrix — Eintrittswahrscheinlichkeit vs Schwere" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">DPIA Risikomatrix: Eintrittswahrscheinlichkeit und Schwere bewerten</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">DPIA und EU AI Act</h2>

        <p className="text-gray-300">
          Der EU AI Act ergaenzt die DSGVO-DPIA um KI-spezifische Anforderungen:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>High-Risk KI-Systeme brauchen eine DPIA und zusaetzlich eine KI-spezifische Risikobewertung</li>
          <li>Art. 27 EU AI Act verlangt eine Grundrechte-Folgenabschaetzung fuer bestimmte Deployer</li>
          <li>Die DPIA kann mit der KI-Risikobewertung kombiniert werden</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Vorteil Self-Hosted KI</h2>

        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
          <p className="text-gray-300">
            Bei Self-Hosted KI (z.B. Ollama lokal) faellt die DPIA deutlich einfacher aus:
            Keine Drittlandtransfers, keine Auftragsverarbeitung, volle Kontrolle ueber die Daten.
            Das Restrisiko ist geringer als bei Cloud-KI.
          </p>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterfuehrend</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:underline">DSGVO Grundlagen</a></li>
            <li>&#8226; <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act: Was du wissen musst</a></li>
            <li>&#8226; <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">KI-Kompetenz nach Art. 4</a></li>
            <li>&#8226; <a href="/compliance/datenschutz-praxis" className="text-blue-400 hover:underline">Datenschutz Praxis</a></li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Quellen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679" target="_blank" className="text-blue-400 hover:underline">DSGVO Art. 35 — Datenschutz-Folgenabschaetzung (EUR-Lex)</a></li>
          <li><a href="https://www.dsb.gv.at/download-links/dokumente-zum-datenschutz.html" target="_blank" className="text-blue-400 hover:underline">Oesterreichische Datenschutzbehoerde — DPIA Ressourcen</a></li>
        </ul>
      </div>
    </div>
  )
}
