import Callout from "../../../../components/Callout"
import { alternatesFor } from '../../../../lib/alternates'

export const metadata = {
  alternates: alternatesFor('/compliance/verifywise-integration'),
  title: 'VerifyWise — Open-Source-Tool für EU AI Act Compliance',
  description:
    'VerifyWise ist ein Open-Source-Tool für AI-Governance, Risk und Compliance — speziell für EU AI Act und ISO 42001. Funktionen, Self-Hosting-Setup und Einordnung für DACH-KMUs.',
}

export default function VerifyWisePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">VerifyWise — Open-Source AI-Governance für EU AI Act</h1>
        <p className="text-gray-400 mt-2">Compliance · 9 min · Stand: Mai 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Überblick">
          <strong>VerifyWise</strong> ist ein Open-Source-Tool (BSL 1.1) für AI-Governance,
          Risk-Management und Compliance. Es deckt die EU AI Act und ISO 42001 ab und kann
          self-hosted betrieben werden — relevant für DACH-KMUs, die ihre Compliance-
          Dokumentation nicht in eine US-Cloud auslagern wollen. Funktionen: KI-Inventar,
          Risiko-Register, Vendor-Assessments, Policy-Templates, Audit-Trail.
          Einordnung: Solides Fundament für die Pflicht-Dokumentation ab 02.08.2026,
          ersetzt aber keine inhaltliche Beratung und keine KI-Kompetenz-Schulung.
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Was ist VerifyWise?</h2>

        <p className="text-gray-300">
          VerifyWise ist eine Open-Source-Plattform für „AI Governance, Risk and Compliance" (GRC),
          entwickelt vom Bluewave-Labs-Team. Lizenz: BSL 1.1. Das Tool bildet den Lebenszyklus
          von KI-Systemen ab — von der Erfassung im Inventar über die Risiko-Klassifizierung
          und Vendor-Bewertung bis zur Audit-Vorbereitung. Es positioniert sich als
          self-hosted-Alternative zu kommerziellen GRC-SaaS-Anbietern wie Credo AI, Holistic AI
          oder Fairly AI.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Welche Frameworks deckt VerifyWise ab?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <div className="table-wrap">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Framework</th>
                <th className="text-left py-2 text-gray-400">Was abgebildet ist</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>EU AI Act</strong></td>
                <td className="py-2">Risiko-Klassifizierung pro System, Pflichten je nach Klasse, Dokumentations-Templates</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>ISO 42001</strong></td>
                <td className="py-2">AI Management System (AIMS) Controls, Audit-Vorbereitung</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top"><strong>NIST AI RMF</strong></td>
                <td className="py-2">Govern / Map / Measure / Manage Funktionen</td>
              </tr>
              <tr>
                <td className="py-2 align-top"><strong>DSGVO</strong></td>
                <td className="py-2">DPIA-Verknüpfung, Vendor-Assessments, Daten-Inventar</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Funktionen im Überblick</h2>

        <div className="space-y-4 mt-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">1. KI-System-Inventar</h3>
            <p className="text-gray-300 text-sm mt-2">
              Zentrale Erfassung aller eingesetzten KI-Systeme mit Metadaten: Anbieter, Zweck,
              Datenkategorien, Nutzer, Lifecycle-Phase. Pflichtbasis für Art. 4 EU AI Act.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">2. Risiko-Register</h3>
            <p className="text-gray-300 text-sm mt-2">
              Pro System: Risikoklasse nach EU AI Act, Eintrittswahrscheinlichkeit,
              Schwere, dokumentierte Gegenmaßnahmen, Restrisiko. Audit-fähige Historie.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">3. Vendor-Assessment</h3>
            <p className="text-gray-300 text-sm mt-2">
              Strukturierte Fragebögen für KI-Anbieter: Trainings-Daten, Modell-Versionierung,
              DSGVO-Compliance, Sub-Auftragsverarbeiter, Drittland-Transfer.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">4. Policy-Templates</h3>
            <p className="text-gray-300 text-sm mt-2">
              Vorgefertigte Richtlinien: KI-Nutzungsrichtlinie, Incident-Response-Plan,
              Schulungsplan, Data-Governance-Policy. Anpassbar pro Organisation.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">5. Audit-Trail</h3>
            <p className="text-gray-300 text-sm mt-2">
              Wer hat wann welche Bewertung geändert. Wichtig für Nachweispflicht
              („nach besten Kräften" im Sinne Art. 4 EU AI Act).
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white">6. Role-based Access Control</h3>
            <p className="text-gray-300 text-sm mt-2">
              Rollen: Admin, Reviewer, Editor, Viewer. Trennung zwischen Compliance-Verantwortlichen
              und Fachabteilungen.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Self-Hosting Setup (Docker Compose)</h2>

        <p className="text-gray-300">
          VerifyWise lässt sich via Docker Compose lokal oder auf einem self-hosted Server
          betreiben. Empfohlener Stack: PostgreSQL + Node.js Backend + React Frontend.
          Minimal-Anforderungen: 2 vCPU, 4 GB RAM, 20 GB Storage.
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <p className="text-gray-300 font-mono text-xs">
            git clone https://github.com/verifywise-ai/verifywise.git<br />
            cd verifywise<br />
            cp .env.example .env<br />
            # .env anpassen (DB-Passwort, Admin-User, SMTP)<br />
            docker compose up -d
          </p>
        </div>

        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mt-4">
          <p className="text-yellow-300 text-sm">
            <strong>Sicherheit:</strong> Self-Hosted bedeutet auch Self-Patched. TLS via Reverse-Proxy
            (Caddy/Traefik), regelmässige Updates über git pull + docker compose pull, Backup
            der PostgreSQL-Datenbank. Nicht öffentlich exponieren ohne Auth-Proxy.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Wann passt VerifyWise zu deinem KMU?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <div className="table-wrap">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Profil</th>
                <th className="text-left py-2 text-gray-400">Empfehlung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top">1–10 Mitarbeitende, 1–3 KI-Tools</td>
                <td className="py-2">Excel/Markdown reicht. VerifyWise ist Overhead.</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top">10–50 Mitarbeitende, 5+ KI-Tools</td>
                <td className="py-2">VerifyWise lohnt sich. Strukturierte Dokumentation spart Zeit beim ersten Audit.</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top">50+ Mitarbeitende, mehrere Standorte</td>
                <td className="py-2">VerifyWise klar empfehlenswert. Audit-Trail + RBAC werden Pflicht.</td>
              </tr>
              <tr>
                <td className="py-2 align-top">KI-Anbieter (eigene Produkte)</td>
                <td className="py-2">VerifyWise als Basis, ergänzt durch eigene Modell-Cards und technische Dokumentation.</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Was VerifyWise nicht leistet</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li>Keine inhaltliche Beratung — die Bewertung „ist mein System High-Risk?" musst du selbst treffen</li>
          <li>Keine KI-Kompetenz-Schulung — Art. 4 verlangt geschulte Mitarbeitende, nicht nur Doku</li>
          <li>Keine technische Modell-Prüfung (Bias-Tests, Adversarial-Tests) — dafür braucht es separate Tools</li>
          <li>Keine Rechtsberatung — bei Unsicherheit zur Risikoklasse: Anwalt fragen</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Alternativen im Vergleich</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <div className="table-wrap">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Tool</th>
                <th className="text-left py-2 text-gray-400">Lizenz / Hosting</th>
                <th className="text-left py-2 text-gray-400">Anmerkung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top">VerifyWise</td>
                <td className="py-2">BSL 1.1 / Self-Hosted</td>
                <td className="py-2">Open Source, DACH-tauglich</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top">Credo AI</td>
                <td className="py-2">Proprietär / US-SaaS</td>
                <td className="py-2">Marktführer, aber Cloud-only und US-basiert</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 align-top">Holistic AI</td>
                <td className="py-2">Proprietär / SaaS</td>
                <td className="py-2">Stark in Bias-Auditing, Enterprise-Preise</td>
              </tr>
              <tr>
                <td className="py-2 align-top">Excel / Notion-Template</td>
                <td className="py-2">Frei / Self-Hosted</td>
                <td className="py-2">Für 1–3 Systeme ausreichend, skaliert nicht</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Empfohlener Workflow</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-2">
          <li>VerifyWise self-hosted aufsetzen (1–2 Stunden)</li>
          <li>KI-Inventar aus bestehenden Tools-Listen importieren</li>
          <li>Pro System die Risiko-Klassifizierung gemäß EU AI Act durchgehen</li>
          <li>Vendor-Assessments für kritische Anbieter (Microsoft, OpenAI, Anthropic, etc.) starten</li>
          <li>Policy-Templates anpassen und intern freigeben lassen</li>
          <li>Schulungsplan parallel aufsetzen — VerifyWise dokumentiert, Schulung muss extern erfolgen</li>
        </ol>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Weiterführend in unserem Wiki</h3>
          <ul className="text-gray-300 space-y-1">
            <li>&#8226; <a href="/compliance/ai-act-august-2026" className="text-blue-400 hover:underline">Was passiert am 02.08.2026 — Enforcement-Start</a></li>
            <li>&#8226; <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">KI-Kompetenz nach Art. 4 — Praxis-Guide</a></li>
            <li>&#8226; <a href="/compliance/eu-ai-act-checkliste" className="text-blue-400 hover:underline">EU AI Act Compliance Checkliste</a></li>
            <li>&#8226; <a href="/compliance/edps-guidelines" className="text-blue-400 hover:underline">EDPS Guidelines — EU-Datenschutzbeauftragter zu KI</a></li>
            <li>&#8226; <a href="/compliance/dpia" className="text-blue-400 hover:underline">DPIA — Datenschutz-Folgenabschätzung für KI</a></li>
            <li>&#8226; <a href="/tools/open-source-projekte" className="text-blue-400 hover:underline">Weitere kuratierte Open-Source-Tools für lokale AI</a></li>
          </ul>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-white mb-2">Weitere Inhalte auf den AI Engineering Plattformen</h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>&#8226; <strong>Hub:</strong> Kuratierte Skills und MCP Server (auch zu Compliance-Themen) — <a href="https://hub.ai-engineering.at" target="_blank" className="text-blue-400 hover:underline">hub.ai-engineering.at</a></li>
            <li>&#8226; <strong>YouTube:</strong> Tutorials zu Self-Hosted-Setups — <a href="https://www.youtube.com/@AIEngineering-at" target="_blank" className="text-blue-400 hover:underline">@AIEngineering-at</a></li>
            <li>&#8226; <strong>GitHub:</strong> Open-Source-Projekte und Templates — <a href="https://github.com/AI-Engineering-at" target="_blank" className="text-blue-400 hover:underline">github.com/AI-Engineering-at</a></li>
            <li>&#8226; <strong>LinkedIn:</strong> Updates zu Compliance-Tools und Deadlines — <a href="https://www.linkedin.com/in/joerg-fuchs-ai/" target="_blank" className="text-blue-400 hover:underline">Jörg Fuchs auf LinkedIn</a></li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Quellen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><a href="https://github.com/verifywise-ai/verifywise" target="_blank" className="text-blue-400 hover:underline">VerifyWise — GitHub Repository (Bluewave Labs)</a></li>
          <li><a href="https://verifywise.ai/" target="_blank" className="text-blue-400 hover:underline">VerifyWise — Projekt-Website</a></li>
          <li><a href="https://www.iso.org/standard/81230.html" target="_blank" className="text-blue-400 hover:underline">ISO/IEC 42001:2023 — Information technology — Artificial intelligence — Management system</a></li>
          <li><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" className="text-blue-400 hover:underline">NIST AI Risk Management Framework</a></li>
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Volltext (EUR-Lex, DE)</a></li>
        </ul>
      </div>
    </div>
  )
}
