import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Datenschutz Praxis | AI Engineering Wiki',
  description:
    'DSGVO in der Praxis umsetzen: technische und organisatorische Massnahmen (TOM), Zugriffskontrollen, Logging, Monitoring und Checklisten.',
}

const dsgvoProzessDiagram = `@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

rectangle "Datenerhebung\\n(Art. 5, 6 DSGVO)" as erhebung
rectangle "Verarbeitung\\n(Art. 30 VVT)" as verarbeitung
rectangle "Technische Maßnahmen\\n(Art. 32 TOM)" as tom
rectangle "Betroffenenrechte\\n(Art. 15-22)" as rechte
rectangle "Löschung\\n(Löschkonzept)" as loeschung
rectangle "Audit & Überprüfung\\n(Regelmäßig)" as audit

erhebung -down-> verarbeitung : Rechtsgrundlage prüfen
verarbeitung -down-> tom : Schutzmaßnahmen
tom -down-> rechte : Auskunft, Berichtigung
rechte -down-> loeschung : Aufbewahrungsfrist
loeschung -down-> audit : Dokumentation
audit -up-> erhebung : Kontinuierliche\\nVerbesserung

@enduml`

export default function DatenschutzPraxis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Datenschutz in der Praxis</h1>
        <p className="text-gray-400 mt-2">Compliance · 6 min</p>
      </div>

      <Callout type="summary" title="Überblick">
        DSGVO in der Praxis umsetzen: Technische Maßnahmen (TLS, Verschlüsselung, Zugriffskontrollen),
        organisatorische Maßnahmen (DSB, Schulungen, AVV) und konkrete Checklisten.
        Mit Code-Beispielen für TLS-Konfiguration und einer vollständigen AVV-Prüfliste.
      </Callout>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Wie setzt man DSGVO in der Praxis um? Konkrete Maßnahmen und Checklisten.
        </p>

        <PlantUMLDiagram diagram={dsgvoProzessDiagram} caption="DSGVO-Prozess: Von der Erhebung über Verarbeitung und TOM bis zur Löschung und Audit" />

        <figure className="my-8">
          <img src="/images/infographics/datenschutz-tom-uebersicht.png" alt="Datenschutz TOM Übersicht — Technische und organisatorische Massnahmen" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">TOM Übersicht: Technische und organisatorische Massnahmen nach Art. 32 DSGVO</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Technische Maßnahmen</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>Verschlüsselung (TLS, At-Rest)</li>
          <li>Zugriffskontrollen</li>
          <li>Logging und Monitoring</li>
          <li>Regelmäßige Updates</li>
          <li>Penetrationstests</li>
        </ul>

        <figure className="my-8">
          <img src="/images/diagrams/datenschutz-verschluesselung.png" alt="Datenschutz Verschluesselung — TLS, At-Rest, Datenbank" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Verschluesselung in der Praxis: TLS, At-Rest und Datenbank-Verschluesselung</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Technische Maßnahmen: Code-Beispiele</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# TLS-Konfiguration in Nginx
server {
    listen 443 ssl http2;
    
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
}

# Datenbank-Verschlüsselung (PostgreSQL)
# postgresql.conf
ssl = on
ssl_cert_file = '/etc/ssl/certs/ssl-cert.crt'
ssl_key_file = '/etc/ssl/private/ssl-cert.key'

# At-Rest Verschlüsselung (LUKS)
# /etc/crypttab
data UUID=xxx none luks`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Organisatorische Maßnahmen</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>Datenschutzbeauftragter (falls nötig)</li>
          <li>Mitarbeiter-Schulungen</li>
          <li>Verarbeitungsverzeichnis (Art. 30)</li>
          <li>Auftragsverarbeitungsverträge</li>
          <li>Löschkonzept</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Wichtige Quellen</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-sm text-gray-300 space-y-3">
            <li>
              <a href="https://www.glacis.io/guide-eu-ai-act" className="text-blue-400 hover:underline">
                GLACIS: EU AI Act Compliance Guide 2026
              </a>
              <p className="text-gray-500 text-xs mt-1">
                Umfassender Compliance-Leitfaden (Dez 2025).
              </p>
            </li>
            <li>
              <a href="https://www.littledata.com/eu-ai-act-compliance-checklist/" className="text-blue-400 hover:underline">
                LittleData: EU AI Act Compliance Checklist
              </a>
              <p className="text-gray-500 text-xs mt-1">
                7-Schritte-Checkliste für Unternehmen.
              </p>
            </li>
            <li>
              <a href="https://www.digitalapplied.com/blog/eu-ai-act-2026-compliance-european-business-guide" className="text-blue-400 hover:underline">
                Digital Applied: EU AI Act Compliance Guide
              </a>
              <p className="text-gray-500 text-xs mt-1">
                Business-orientierter Leitfaden mit Checklisten.
              </p>
            </li>
          </ul>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/tools-dsgvo-ampel.png" alt="DSGVO-Ampel: Welche Tools sind konform?" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">DSGVO-Ampel: Welche Tools sind konform?</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">DSGVO-spezifisch</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>Art. 5 - Grundsätze</li>
          <li>Art. 6 - Rechtsgrundlagen</li>
          <li>Art. 13/14 - Informationspflichten</li>
          <li>Art. 15-22 - Betroffenenrechte</li>
          <li>Art. 30 - Verarbeitungsverzeichnis</li>
          <li>Art. 32 - Technische Maßnahmen</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">AVV Checkliste</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Auftragsverarbeitungsvertrag (AVV) Prüfliste

## ✓ Pflichtinhalte (Art. 28 DSGVO)
[ ] Gegenstand und Dauer der Verarbeitung
[ ] Art und Zweck der Verarbeitung
[ ] Kategorien betroffener Personen
[ ] Art der personenbezogenen Daten

## ✓ Weisungsrechte
[ ] Weisungen nur schriftlich
[ ] Unterweisung dokumentieren
[ ] Weisungsprotokoll führen

## ✓ Sicherheitsmaßnahmen
[ ] Technische Maßnahmen (Art. 32)
[ ] Organisatorische Maßnahmen
[ ] Vertraulichkeitsverpflichtung Mitarbeiter

## ✓ Subunternehmer
[ ] Genehmigung für Subunternehmer
[ ] Subunternehmer müssen gleiche Standards erfüllen
[ ] Liste der genehmigten Subunternehmer

## ✓ Unterstützung bei Betroffenenrechten
[ ] Auskunftserteilung
[ ] Löschung/Richtigkeit
[ ] Datenportabilität

## ✓ Melde- und Mitteilungspflichten
[ ] Datenschutzverletzungen innerhalb 72h
[ ] Protokollierung von Vorfällen

## ✓ Auditrechte
[ ] Vor-Ort-Audits möglich
[ ] Fragebogen-Audits akzeptiert
[ ] Zertifizierungen als Nachweis`}</code>
        </pre>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Checkliste</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>[] Verarbeitungsverzeichnis geführt?</li>
            <li>[] Datenschutzerklärung verfügbar?</li>
            <li>[] AVV mit Dienstleistern?</li>
            <li>[] Löschkonzept dokumentiert?</li>
            <li>[] Technische Maßnahmen implementiert?</li>
            <li>[] Mitarbeiter geschult?</li>
          </ul>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">DSGVO Volltext (EUR-Lex)</a> — Datenschutz-Grundverordnung</li>
            <li><a href="https://www.glacis.io/guide-eu-ai-act" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GLACIS: EU AI Act Compliance Guide 2026</a> — Umfassender Compliance-Leitfaden</li>
            <li><a href="https://www.littledata.com/eu-ai-act-compliance-checklist/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LittleData: EU AI Act Compliance Checklist</a> — 7-Schritte-Checkliste</li>
            <li><a href="https://dsb.gv.at/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Österreichische Datenschutzbehörde</a> — DSGVO-Durchsetzung in Österreich</li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/compliance/dpia" className="text-blue-400 hover:text-blue-300">DPIA fuer KI-Systeme</a>
          {' · '}
          <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:text-blue-300">DSGVO Grundlagen</a>
          {' · '}
          <a href="/security/verschluesselung" className="text-blue-400 hover:text-blue-300">Verschluesselung</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
      </div>
    </div>
  )
}