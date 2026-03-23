import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Datenschutz-Folgenabschätzung (DPIA) | AI Engineering Wiki',
  description:
    'DPIA für KI-Systeme: Wann ist eine Datenschutz-Folgenabschätzung Pflicht, wie führt man sie durch, und was muss dokumentiert werden.',
}

const dpiaAblaufDiagram = `@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

rectangle "1. Screening\\nDPIA erforderlich?" as screening
rectangle "2. Beschreibung\\nDaten, Zweck, Rechtsgrundlage" as beschreibung
rectangle "3. Analyse\\nNotwendigkeit & Verhältnismäßigkeit" as analyse
rectangle "4. Bewertung\\nRisiken für Betroffene" as bewertung
rectangle "5. Maßnahmen\\nTOM, Pseudonymisierung" as massnahmen
rectangle "6. Dokumentation\\nErgebnisse festhalten" as doku
rectangle "Regelmäßige\\nÜberprüfung" as review

screening -down-> beschreibung : Ja, DPIA nötig
beschreibung -down-> analyse
analyse -down-> bewertung
bewertung -down-> massnahmen
massnahmen -down-> doku
doku -down-> review
review -up-> beschreibung : Bei Änderungen\\naktualisieren

@enduml`

export default function DPIAPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Datenschutz-Folgenabschätzung (DPIA)</h1>
        <p className="text-gray-400 mt-2">Compliance · 8 min · Stand: März 2026</p>
      </div>

      <Callout type="summary" title="Überblick">
        DPIA (Data Protection Impact Assessment) nach Art. 35 DSGVO: Wann ist sie Pflicht,
        wie führt man sie in 6 Schritten durch, und was bedeutet der EU AI Act für die
        Folgenabschätzung bei KI-Systemen. Inklusive Risikomatrix und Vorteil Self-Hosted KI.
      </Callout>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Eine Datenschutz-Folgenabschätzung (Data Protection Impact Assessment, DPIA)
          ist nach Art. 35 DSGVO Pflicht, wenn eine Datenverarbeitung voraussichtlich ein
          hohes Risiko für die Rechte und Freiheiten natürlicher Personen zur Folge hat.
          Bei KI-Systemen ist das häufig der Fall.
        </p>

        <PlantUMLDiagram diagram={dpiaAblaufDiagram} caption="DPIA-Ablauf: Screening → Beschreibung → Analyse → Bewertung → Maßnahmen → Dokumentation" />

        <h2 className="text-xl font-semibold text-white mt-8">Wann ist eine DPIA Pflicht?</h2>

        <p className="text-gray-300">
          Eine DPIA ist insbesondere erforderlich bei:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Automatisierten Einzelentscheidungen</strong> mit rechtlicher Wirkung (Art. 22 DSGVO)</li>
          <li><strong>Umfangreicher Verarbeitung besonderer Kategorien</strong> personenbezogener Daten</li>
          <li><strong>Systematischer Überwachung</strong> öffentlich zugänglicher Bereiche</li>
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
          <img src="/images/diagrams/dpia-6-schritte-flow.png" alt="DPIA 6-Schritte Flow — Von der Beschreibung bis zur Überprüfung" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">DPIA in 6 Schritten: Der komplette Prozess für KI-Systeme</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">DPIA-Prozess in 6 Schritten</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ol className="text-gray-300 space-y-3">
            <li>
              <strong>1. Verarbeitung beschreiben</strong>
              <p className="text-sm text-gray-400 mt-1">Welche Daten, welcher Zweck, welche Rechtsgrundlage, welche Empfänger?</p>
            </li>
            <li>
              <strong>2. Notwendigkeit und Verhältnismäßigkeit prüfen</strong>
              <p className="text-sm text-gray-400 mt-1">Ist die Verarbeitung für den Zweck erforderlich? Gibt es mildere Mittel?</p>
            </li>
            <li>
              <strong>3. Risiken für Betroffene bewerten</strong>
              <p className="text-sm text-gray-400 mt-1">Eintrittswahrscheinlichkeit und Schwere möglicher Schäden.</p>
            </li>
            <li>
              <strong>4. Maßnahmen zur Risikominimierung definieren</strong>
              <p className="text-sm text-gray-400 mt-1">Technische und organisatorische Maßnahmen (TOM), Pseudonymisierung, Zugriffskontrollen.</p>
            </li>
            <li>
              <strong>5. Dokumentation erstellen</strong>
              <p className="text-sm text-gray-400 mt-1">Ergebnisse schriftlich festhalten, Maßnahmen und Restrisiken dokumentieren.</p>
            </li>
            <li>
              <strong>6. Regelmäßig überprüfen</strong>
              <p className="text-sm text-gray-400 mt-1">DPIA ist kein einmaliges Dokument — bei Änderungen am System aktualisieren.</p>
            </li>
          </ol>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/dpia-risikomatrix.png" alt="DPIA Risikomatrix — Eintrittswahrscheinlichkeit vs Schwere" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">DPIA Risikomatrix: Eintrittswahrscheinlichkeit und Schwere bewerten</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">DPIA und EU AI Act</h2>

        <p className="text-gray-300">
          Der EU AI Act ergänzt die DSGVO-DPIA um KI-spezifische Anforderungen:
        </p>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>High-Risk KI-Systeme brauchen eine DPIA und zusätzlich eine KI-spezifische Risikobewertung</li>
          <li>Art. 27 EU AI Act verlangt eine Grundrechte-Folgenabschätzung für bestimmte Deployer</li>
          <li>Die DPIA kann mit der KI-Risikobewertung kombiniert werden</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Vorteil Self-Hosted KI</h2>

        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
          <p className="text-gray-300">
            Bei Self-Hosted KI (z.B. Ollama lokal) fällt die DPIA deutlich einfacher aus:
            Keine Drittlandtransfers, keine Auftragsverarbeitung, volle Kontrolle über die Daten.
            Das Restrisiko ist geringer als bei Cloud-KI.
          </p>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:underline">DSGVO Grundlagen</a></li>
            <li>&#8226; <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act: Was du wissen musst</a></li>
            <li>&#8226; <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">KI-Kompetenz nach Art. 4</a></li>
            <li>&#8226; <a href="/compliance/datenschutz-praxis" className="text-blue-400 hover:underline">Datenschutz Praxis</a></li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Quellen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679" target="_blank" className="text-blue-400 hover:underline">DSGVO Art. 35 — Datenschutz-Folgenabschätzung (EUR-Lex)</a></li>
          <li><a href="https://dsb.gv.at/download-links/dokumente-zum-datenschutz.html" target="_blank" className="text-blue-400 hover:underline">Österreichische Datenschutzbehörde — DPIA Ressourcen</a></li>
        </ul>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:text-blue-300">DSGVO Grundlagen</a>
          {' · '}
          <a href="/compliance/datenschutz-praxis" className="text-blue-400 hover:text-blue-300">Datenschutz Praxis</a>
          {' · '}
          <a href="/compliance/eu-ai-act-checkliste" className="text-blue-400 hover:text-blue-300">EU AI Act Checkliste</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
      </div>
    </div>
  )
}
