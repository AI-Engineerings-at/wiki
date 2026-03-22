import { Metadata } from "next"
import Callout from "../../../components/Callout"
import KeyTakeaway from "../../../components/KeyTakeaway"
import ComparisonTable from "../../../components/ComparisonTable"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Human-in-the-Loop — Mensch-KI Zusammenarbeit | AI Engineering Wiki",
  description:
    "Approval Workflows, Escalation Patterns, Confidence Thresholds, Audit Trail. EU AI Act Art. 14 Human Oversight. Mit n8n Approval Workflow Beispiel.",
}

export default function HumanInTheLoopPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Patterns</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Human-in-the-Loop
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Warum vollautomatische KI-Entscheidungen gefährlich sind und wie du
          Approval Workflows, Escalation Patterns und Audit Trails implementierst.
          Inklusive EU AI Act Art. 14 Anforderungen.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 13 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: März 2026</span>
        </div>
      </div>

      <figure className="my-8">
        <img src="/images/generated/hero-human-in-loop.png" alt="Human-in-the-Loop Approval" className="rounded-xl border border-white/10 w-full" />
        <figcaption className="text-center text-white/40 text-sm mt-2">Human-in-the-Loop Approval</figcaption>
      </figure>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Human-in-the-Loop (HITL) bedeutet: Ein Mensch ist in den
            Entscheidungsprozess des AI-Systems eingebunden. Nicht bei jeder
            Kleinigkeit — sondern bei kritischen, irreversiblen oder unsicheren
            Entscheidungen. Der EU AI Act macht Human Oversight für
            Hochrisiko-Systeme zur Pflicht (Art. 14). Aber auch ohne Regulierung
            ist HITL der Unterschied zwischen einem nützlichen Tool und einer
            Haftungsfalle.
          </p>
        </Callout>

        {/* Section 1: Warum automatische Entscheidungen gefährlich sind */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Warum automatische KI-Entscheidungen gefährlich sind
          </h2>
          <p className="text-white/70 leading-relaxed">
            LLMs sind beeindruckend gut im Generieren plausibler Antworten. Aber
            &quot;plausibel&quot; ist nicht &quot;korrekt&quot;. Wenn ein LLM automatisch
            Entscheidungen trifft — E-Mails beantwortet, Rechnungen freigibt,
            Kundendaten ändert — kann ein einzelner Fehler erheblichen Schaden
            anrichten.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Die drei Hauptrisiken vollautomatischer KI-Entscheidungen:
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-2">
            <li>
              <strong className="text-white">Halluzinationen in Aktion:</strong> Das
              LLM erfindet eine Kundennummer und ändert den falschen Datensatz.
            </li>
            <li>
              <strong className="text-white">Irreversible Aktionen:</strong> Eine
              gelöschte Datei, eine gesendete E-Mail, eine freigegebene Zahlung
              kann nicht rückgängig gemacht werden.
            </li>
            <li>
              <strong className="text-white">Haftung:</strong> Wer haftet, wenn ein
              AI-Agent eine falsche Entscheidung trifft? Ohne dokumentierte
              menschliche Aufsicht: das Unternehmen.
            </li>
          </ul>

          <Callout type="warning" title="Praxis-Beispiel">
            <p>
              Ein AI-Agent beantwortet Support-Tickets automatisch. Ein Kunde
              schreibt: &quot;Bitte stornieren Sie mein Abo.&quot; Der Agent storniert —
              aber es war ein Enterprise-Vertrag mit 12 Monaten Laufzeit und
              Kündigungsfrist. Ohne Human Approval wäre das ein teurer Fehler.
            </p>
          </Callout>
        </section>

        {/* Section 2: Approval Workflows */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Approval Workflows
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Ein Approval Workflow unterbricht den automatischen Ablauf und
            wartet auf menschliche Freigabe. Der Agent bereitet die Entscheidung
            vor, aber ein Mensch trifft sie.
          </p>

          <ComparisonTable
            headers={["Muster", "Wann einsetzen", "Beispiel"]}
            rows={[
              ["Pre-Approval", "Vor jeder kritischen Aktion", "Agent zeigt E-Mail-Entwurf, Mensch klickt 'Senden'"],
              ["Batch Approval", "Mehrere Entscheidungen zusammen", "Agent sammelt 10 Support-Antworten, Mensch reviewed alle auf einmal"],
              ["Exception-Only", "Nur bei Abweichungen vom Standard", "Agent bearbeitet Standard-Tickets selbst, eskaliert nur Sonderfälle"],
              ["Time-Delayed", "Verzögerung vor Ausführung", "Agent plant Aktion, 30 Min Wartezeit, automatische Ausführung wenn kein Veto"],
            ]}
          />

          <Callout type="info" title="Balance finden">
            <p>
              Zu viele Approvals machen den Agent nutzlos — wenn jede Aktion
              genehmigt werden muss, kann man es gleich selbst machen. Die Kunst
              ist, die richtigen Schwellenwerte zu finden: Was kann der Agent
              allein, was braucht Freigabe?
            </p>
          </Callout>
        </section>

        {/* Section 3: Escalation Patterns */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Escalation Patterns
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Escalation bedeutet: Der Agent erkennt selbst, dass er eine Situation
            nicht sicher bewältigen kann und übergibt an einen Menschen. Das ist
            kein Fehler — das ist intelligentes Verhalten.
          </p>

          <ComparisonTable
            headers={["Trigger", "Beschreibung", "Implementierung"]}
            rows={[
              ["Low Confidence", "Agent ist unsicher über die richtige Aktion", "Confidence Score < Threshold → Eskalation"],
              ["Wiederholter Fehler", "Agent hat dieselbe Aufgabe bereits falsch bearbeitet", "Error Counter pro Task-Typ > 1 → Eskalation"],
              ["Out of Scope", "Anfrage liegt außerhalb des Agent-Mandats", "Topic Classification → kein Match → Eskalation"],
              ["High Impact", "Aktion hat potenziell große Auswirkungen", "Aktions-Klassifikation: delete, payment, contract → Eskalation"],
              ["Adversarial Input", "Verdacht auf Manipulation oder Injection", "Injection Detection Score > Threshold → Eskalation"],
            ]}
          />

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-4">
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`Escalation-Logik (Pseudocode):

function shouldEscalate(task, confidence, context):
  // Regel 1: Niedrige Confidence
  if confidence < 0.7:
    return { escalate: true, reason: "Low confidence" }

  // Regel 2: Kritische Aktion
  if task.action in ["delete", "payment", "contract_change"]:
    return { escalate: true, reason: "High impact action" }

  // Regel 3: Wiederholter Fehler
  if getErrorCount(task.type, last_24h) > 1:
    return { escalate: true, reason: "Repeated failures" }

  // Regel 4: Injection-Verdacht
  if injectionScore(context.userInput) > 0.8:
    return { escalate: true, reason: "Possible injection" }

  return { escalate: false }`}</code>
            </pre>
          </div>
        </section>

        {/* Section 4: Confidence Thresholds */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Confidence Thresholds
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Confidence Thresholds definieren, ab welchem Sicherheitsgrad der
            Agent autonom handeln darf. Es gibt drei Zonen:
          </p>

          <ComparisonTable
            headers={["Zone", "Confidence", "Verhalten"]}
            rows={[
              ["Grün (Autonom)", "> 0.85", "Agent führt Aktion aus, loggt Ergebnis"],
              ["Gelb (Review)", "0.6 - 0.85", "Agent schlägt Aktion vor, wartet auf Approval"],
              ["Rot (Eskalation)", "< 0.6", "Agent stoppt, eskaliert an Menschen mit Kontext"],
            ]}
          />

          <Callout type="warning" title="LLM Confidence ist unzuverlässig">
            <p>
              LLMs sind notorisch schlecht kalibriert — ein LLM kann 95% sicher
              sein und trotzdem falsch liegen. Confidence Scores sollten deshalb nie
              die einzige Entscheidungsgrundlage sein. Kombiniere sie mit
              regelbasierten Checks (z.B. &quot;ist dies eine irreversible Aktion?&quot;)
              und historischen Fehlerraten pro Task-Typ.
            </p>
          </Callout>
        </section>

        {/* Section 5: Audit Trail / Logging */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Audit Trail &amp; Logging
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Ein vollständiger Audit Trail dokumentiert jede Entscheidung des
            AI-Systems — was wurde entschieden, warum, und wer hat es genehmigt.
            Das ist nicht nur Best Practice, sondern für Hochrisiko-Systeme unter
            dem EU AI Act Pflicht.
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            Was muss geloggt werden?
          </h3>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-4">
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`Audit Trail Entry:
{
  "timestamp": "2026-03-22T14:30:00Z",
  "agent_id": "support-agent-01",
  "task_type": "ticket_response",
  "input": "Kunde fragt nach Vertragskündigung",
  "decision": "escalate_to_human",
  "confidence": 0.62,
  "reason": "High impact action (contract_change) + low confidence",
  "context_chunks": ["vertrag_123.pdf", "kuendigungsfrist.md"],
  "approved_by": "joe@example.com",
  "approved_at": "2026-03-22T14:35:00Z",
  "final_action": "manual_response_sent",
  "retention_days": 365
}`}</code>
            </pre>
          </div>

          <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-4">
            <li>
              <strong className="text-white">Immutability:</strong> Logs dürfen
              nachträglich nicht verändert werden. Append-only Storage.
            </li>
            <li>
              <strong className="text-white">Retention:</strong> DSGVO-konform
              aufbewahren. Personenbezogene Daten nach definierten Fristen löschen.
            </li>
            <li>
              <strong className="text-white">Zugänglichkeit:</strong> Aufsichtsbehörden
              müssen Logs einsehen können. Maschinenlesbares Format.
            </li>
          </ul>
        </section>

        {/* Section 6: n8n Approval Workflow */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Praxis: n8n Approval Workflow
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Ein konkreter Approval-Workflow in n8n für einen Support-Agenten:
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-4">
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`n8n Approval Workflow:

1. Trigger: Neues Support-Ticket (Webhook)

2. AI Agent Node (Ollama/OpenAI)
   → Analysiert Ticket: Kategorie, Dringlichkeit, Lösungsvorschlag
   → Output: { category, urgency, confidence, draft_response }

3. Switch Node: Confidence Check
   → confidence > 0.85 UND category == "standard"
     → Direkt senden (mit Disclaimer "KI-generiert")
   → confidence 0.6-0.85 ODER category == "billing"
     → Approval Request (weiter zu Schritt 4)
   → confidence < 0.6 ODER category == "legal"
     → Direkte Eskalation (weiter zu Schritt 5)

4. Approval Request
   → Mattermost/Slack: Entwurf + Kontext an Support-Team
   → Wait Node: max 4 Stunden
   → Approved? → Senden
   → Rejected? → Manuell bearbeiten
   → Timeout? → Eskalation

5. Eskalation
   → Ticket als "Mensch erforderlich" markieren
   → Assign an nächsten verfügbaren Mitarbeiter
   → AI-Analyse als Kontext anhängen

6. Audit Log (bei jedem Ausgang)
   → Entscheidung, Confidence, Approval-Status loggen`}</code>
            </pre>
          </div>
        </section>

        {/* Section 7: EU AI Act Art. 14 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            EU AI Act Art. 14: Human Oversight
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Artikel 14 des EU AI Act schreibt vor, dass Hochrisiko-AI-Systeme so
            gestaltet sein müssen, dass sie von natürlichen Personen wirksam
            beaufsichtigt werden können. Die Kernforderungen:
          </p>

          <ComparisonTable
            headers={["Anforderung", "Was bedeutet das?", "Umsetzung"]}
            rows={[
              ["Verstehen", "Nutzer muss Fähigkeiten und Grenzen des Systems verstehen", "Dokumentation, Training, Confidence-Anzeige"],
              ["Überwachen", "Nutzer muss das System während des Betriebs überwachen können", "Dashboard, Alerts, Echtzeit-Logging"],
              ["Eingreifen", "Nutzer muss jederzeit eingreifen oder stoppen können", "Kill Switch, Override, Pause-Button"],
              ["Ignorieren", "Nutzer muss AI-Empfehlung ignorieren können", "Recommendation statt Automation, Opt-Out"],
            ]}
          />

          <Callout type="info" title="Art. 14 Abs. 4: Angemessene Maßnahmen">
            <p>
              Die Überwachungsmaßnahmen müssen dem Risiko angemessen sein.
              Ein Chatbot, der Öffnungszeiten beantwortet, braucht weniger Oversight
              als ein System, das Kreditentscheidungen trifft. Die Risikoklasse
              bestimmt den HITL-Level.
            </p>
          </Callout>
        </section>

        {/* PlantUML Diagramm */}
        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title Human-in-the-Loop Approval Flow

start
:Task / Anfrage eingehend;
:AI Agent analysiert;
:Confidence Score berechnen;

if (Confidence > 0.85\\nUND Standard-Task?) then (ja)
  :Agent führt aus;
  :Audit Log schreiben;
else (nein)
  if (Confidence > 0.6?) then (ja)
    :Approval Request\\nan Mensch senden;
    :Warten auf Freigabe;
    if (Genehmigt?) then (ja)
      :Agent führt aus;
      :Audit Log schreiben;
    else (nein / Timeout)
      :Manuell bearbeiten;
      :Audit Log schreiben;
    endif
  else (nein)
    #FF6347:Eskalation;
    :Direkt an Mensch\\nmit AI-Kontext;
    :Audit Log schreiben;
  endif
endif
stop
@enduml`}
          caption="Human-in-the-Loop Approval Flow: Drei Zonen (Autonom, Review, Eskalation) basierend auf Confidence und Task-Typ"
        />

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Vollautomatische KI-Entscheidungen sind bei kritischen, irreversiblen oder unsicheren Aktionen gefährlich.",
            "Approval Workflows: Pre-Approval, Batch, Exception-Only oder Time-Delayed — je nach Risiko und Frequenz.",
            "Escalation Patterns: Low Confidence, wiederholter Fehler, Out of Scope, High Impact, Adversarial Input.",
            "Drei Confidence-Zonen: Grün (autonom, >0.85), Gelb (Review, 0.6-0.85), Rot (Eskalation, <0.6).",
            "Audit Trail ist Pflicht: Timestamp, Decision, Confidence, Approver, Final Action — immutable und DSGVO-konform.",
            "EU AI Act Art. 14: Hochrisiko-Systeme müssen verstehbar, überwachbar, unterbrechbar und überstimmbar sein.",
          ]}
        />

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Verordnung (EU) 2024/1689 — EU AI Act
              </a>{" "}
              — Artikel 14: Menschliche Aufsicht (Human Oversight)
            </li>
            <li>
              <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                European Commission — AI Act Regulatory Framework
              </a>{" "}
              — Übersicht zu Risikoklassen und Pflichten
            </li>
            <li>
              <a href="https://docs.n8n.io/courses/level-two/chapter-5/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                n8n Documentation — Wait &amp; Approval Nodes
              </a>{" "}
              — Technische Basis für Approval Workflows
            </li>
            <li>
              <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline">
                EU AI Act — Wiki-Artikel
              </a>{" "}
              — Risikoklassen, Verbote, Transparenzpflichten
            </li>
            <li>
              <a href="/patterns/safety-hooks" className="text-blue-400 hover:underline">
                Safety Hooks Pattern
              </a>{" "}
              — Guardrails und Output-Validierung
            </li>
            <li>
              <a href="/patterns/self-improving-agents" className="text-blue-400 hover:underline">
                Self-Improving Agents
              </a>{" "}
              — Self-Eskalation als HITL-Mechanismus
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            HITL-Workflows implementieren?
          </h3>
          <p className="text-white/60 text-sm mb-4">
            Wir helfen beim Design von Approval Workflows und Escalation Patterns —
            mit n8n, Mattermost und EU AI Act Compliance.
          </p>
          <a
            href="https://ai-engineering.at/kontakt"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Beratung anfragen
          </a>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
