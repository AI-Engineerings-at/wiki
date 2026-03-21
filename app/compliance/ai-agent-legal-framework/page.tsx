import { Metadata } from "next"
import Callout from "../../../components/Callout"
import KeyTakeaway from "../../../components/KeyTakeaway"
import ComparisonTable from "../../../components/ComparisonTable"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "AI Agent Legal Framework — EU AI Act Compliance | AI Engineering Wiki",
  description:
    "Wie du AI-Agenten gesetzeskonform einsetzt: EU AI Act, DSGVO, Risikobewertung, Compliance-Dokumente und Hash Chain fuer Manipulationssicherheit.",
}

export default function AIAgentLegalFrameworkPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Compliance</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          AI Agent Legal Framework — EU AI Act Compliance
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Von der Risikobewertung bis zum fertigen Compliance-Paket:
          Wie KMUs digitale Mitarbeiter gesetzeskonform einsetzen.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 16 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: Maerz 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Ab August 2026 muessen Unternehmen, die AI-Agenten mit Kundenkontakt einsetzen,
            umfangreiche Compliance-Anforderungen erfuellen. Dieses Framework verbindet
            EU AI Act und DSGVO zu einem praktischen Prozess: Risikobewertung, Dokumentengenerierung,
            Killswitch-Konfiguration und manipulationssichere Hash Chain. Ein Wizard fuehrt
            durch den gesamten Prozess.
          </p>
        </Callout>

        {/* Section 1: Das Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Das Problem: Zwei Gesetze, kein Werkzeug
          </h2>
          <p className="text-white/70 leading-relaxed">
            Wer einen AI-Agenten produktiv einsetzt, muss zwei Regelwerke gleichzeitig
            erfuellen: den EU AI Act (Transparenz, Risikobewertung, Logging) und die
            DSGVO (Datenschutz, Verarbeitungsverzeichnis, Betroffenenrechte). Fuer
            Grossunternehmen gibt es teure Compliance-Plattformen (50.000+ EUR/Jahr).
            Fuer KMUs existiert Stand Maerz 2026 kein vergleichbares Produkt.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Das Ergebnis: Die meisten KMUs ignorieren das Thema oder erstellen
            Dokumente manuell in Word — ohne Zusammenhang zwischen den Dokumenten
            und ohne Verbindung zur tatsaechlichen Agent-Konfiguration.
          </p>

          <Callout type="warning" title="Deadline: 2. August 2026">
            <p>
              Die Transparenzpflichten des EU AI Act (Art. 50) gelten ab diesem Datum.
              Die DSGVO-Pflichten (Art. 30, 35) gelten bereits JETZT fuer jeden,
              der personenbezogene Daten verarbeitet. Verstoss: bis zu 20 Mio. EUR
              oder 4% des weltweiten Jahresumsatzes.
            </p>
          </Callout>
        </section>

        {/* Section 2: Rechtsgrundlagen */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Rechtsgrundlagen im Ueberblick
          </h2>

          <ComparisonTable
            headers={["Anforderung", "Rechtsquelle", "Deadline", "Max. Strafe"]}
            rows={[
              ["AI-Kennzeichnung bei Erstkontakt", "EU AI Act Art. 50(1)", "02.08.2026", "15 Mio. EUR / 3%"],
              ["Maschinenlesbare Content-Markierung", "EU AI Act Art. 50(2)", "02.08.2026", "15 Mio. EUR / 3%"],
              ["Human Oversight / Killswitch", "EU AI Act Art. 14", "02.08.2026", "15 Mio. EUR / 3%"],
              ["Automatisches Log Retention (min. 6 Monate)", "EU AI Act Art. 12", "02.08.2026", "15 Mio. EUR / 3%"],
              ["Verarbeitungsverzeichnis", "DSGVO Art. 30", "JETZT", "20 Mio. EUR / 4%"],
              ["DPIA vor Inbetriebnahme", "DSGVO Art. 35", "JETZT", "20 Mio. EUR / 4%"],
              ["Recht auf menschliche Ueberpruefung", "DSGVO Art. 22", "JETZT", "20 Mio. EUR / 4%"],
            ]}
          />

          <Callout type="info" title="Oesterreich-spezifisch">
            <p>
              In Oesterreich ist die KI-Servicestelle bei der RTR die nationale AI-Behoerde.
              Die DSB (Datenschutzbehoerde) ist fuer DSGVO-Enforcement zustaendig.
              Compliance-Dokumente muessen auf Deutsch verfuegbar sein und innerhalb
              von 72 Stunden vorgelegt werden koennen.
            </p>
          </Callout>
        </section>

        {/* Section 3: Der Wizard-Ansatz */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Der Wizard-Ansatz: Dokumente und Konfiguration aus einem Prozess
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Das Kernprinzip: Compliance-Dokumente und Agent-Konfiguration werden
            im selben Prozess erzeugt. Nicht zuerst den Agent aufsetzen und dann
            die Dokumentation nachziehen — sondern beides gleichzeitig. Nur so
            stimmen Realitaet und Dokumentation ueberein.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <p className="text-white font-medium mb-2">8-Schritt Wizard:</p>
            {[
              { step: "1", title: "Agent Identity", desc: "Name, E-Mail, Firma, Rolle und Aufgaben definieren" },
              { step: "2", title: "Risk Assessment", desc: "Fragebogen: Limited Risk oder High Risk? 10-15 Fragen" },
              { step: "3", title: "Scope & Berechtigungen", desc: "Welche Systeme? Read/Write/Create pro System" },
              { step: "4", title: "DSGVO Compliance", desc: "DPIA, Verarbeitungsverzeichnis, Privacy Notice (auto-befuellt)" },
              { step: "5", title: "EU AI Act Compliance", desc: "Art. 50 Transparency Kit: E-Mail-Signatur, Social Bio, Voice-Ansage" },
              { step: "6", title: "Killswitch & Human Oversight", desc: "3-Level Killswitch: PAUSE, STOP, DECOMMISSION" },
              { step: "7", title: "Agent-Konfiguration generieren", desc: "SOUL.md, Network Policy, Vault, Start-Script" },
              { step: "8", title: "Compliance-Paket finalisieren", desc: "PDF-Export, Hash Chain, Git Commit, ERP-Tracking" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                  {item.step}
                </span>
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-white/50 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Risikobewertung */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Risikobewertung: Limited Risk vs. High Risk
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Der EU AI Act unterscheidet zwischen Risikoklassen. Die meisten
            KMU-Agenten (Kundenservice, E-Mail, Social Media) fallen unter
            &quot;Limited Risk&quot; — mit Transparenzpflichten, aber ohne die
            schweren Auflagen fuer Hochrisiko-Systeme.
          </p>

          <ComparisonTable
            headers={["Frage", "Wenn JA...", "Risikoklasse"]}
            rows={[
              ["Trifft der Agent Entscheidungen mit rechtlicher Wirkung?", "High Risk (Annex III)", "HIGH"],
              ["Verarbeitet der Agent biometrische Daten?", "High Risk oder verboten", "HIGH"],
              ["Bewertet der Agent Personen (Scoring, Profiling)?", "High Risk", "HIGH"],
              ["Interagiert der Agent nur mit Kunden (Info, Support)?", "Limited Risk", "LIMITED"],
              ["Erstellt der Agent nur Inhalte (Text, Bild)?", "Limited Risk", "LIMITED"],
            ]}
          />

          <Callout type="tip" title="Fuer die meisten KMU-Agenten: Limited Risk">
            <p>
              Ein Agent, der E-Mails beantwortet, Social Media postet oder
              Kundenanfragen weiterleitet, ist typischerweise Limited Risk.
              Das bedeutet: Transparenzpflichten (Kennzeichnung), aber keine
              DPIA nach EU AI Act Art. 9 und keine Konformitaetsbewertung.
              Die DSGVO-DPIA kann trotzdem noetig sein.
            </p>
          </Callout>
        </section>

        {/* Section 5: Die 7+ Compliance-Dokumente */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die Compliance-Dokumente
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Ein vollstaendiges Compliance-Paket besteht aus mindestens 7 Dokumenten.
            Jedes Dokument hat eine klare Rechtsgrundlage und einen definierten Zweck.
          </p>

          <ComparisonTable
            headers={["Dokument", "Rechtsquelle", "Zweck"]}
            rows={[
              ["Risk Assessment", "AI Act Art. 6", "Limited vs. High Risk Einstufung mit Begruendung"],
              ["DPIA", "DSGVO Art. 35", "Datenschutz-Folgenabschaetzung, vorbefuellt mit Agent-Scope"],
              ["Verarbeitungsverzeichnis", "DSGVO Art. 30", "Alle Datenverarbeitungen des Agents"],
              ["Privacy Notice", "DSGVO Art. 13/14", "Information fuer betroffene Personen"],
              ["Art. 50 Transparency Kit", "AI Act Art. 50", "E-Mail-Signatur, Social Bio, Voice-Ansage, Meta-Tags"],
              ["Killswitch & Oversight", "AI Act Art. 14", "3-Level Killswitch, Verantwortliche, Eskalation"],
              ["Log Policy", "AI Act Art. 12", "Was wird geloggt, Aufbewahrung, Zugriff"],
              ["Escalation Policy", "DSGVO Art. 22", "Recht auf menschliche Ueberpruefung"],
              ["Onboarding-Protokoll", "Gesamt", "Wer, was, wann, Killswitch-Verantwortliche, Freigabe"],
            ]}
          />
        </section>

        {/* Section 6: Killswitch */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            3-Level Killswitch: Human Oversight nach Art. 14
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Der EU AI Act verlangt, dass Menschen AI-Systeme jederzeit stoppen koennen.
            Ein gestuftes Killswitch-System macht das praktikabel.
          </p>

          <ComparisonTable
            headers={["Level", "Aktion", "Wann einsetzen"]}
            rows={[
              ["Level 1: PAUSE", "Agent stoppt, sichert State, wartet auf Resume", "Agent verhaelt sich unerwartet, Situation unklar"],
              ["Level 2: STOP", "Sofort beenden, alle laufenden Aktionen abbrechen", "Agent macht Fehler, die Schaden anrichten koennten"],
              ["Level 3: DECOMMISSION", "Permanent deaktivieren, Keys revoken, Logs archivieren", "Agent wird nicht mehr gebraucht oder ist kompromittiert"],
            ]}
          />

          <Callout type="info" title="Wer darf den Killswitch betaetigen?">
            <p>
              Das wird im Wizard definiert. Typisch: Der Owner (Geschaeftsfuehrer)
              kann alle 3 Level. Team-Mitglieder koennen Level 1 (PAUSE).
              Automatische Systeme koennen Level 1 bei Anomalie-Erkennung ausloesen.
              Level 3 (DECOMMISSION) sollte immer manuell sein.
            </p>
          </Callout>
        </section>

        {/* Section 7: Hash Chain */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Hash Chain: Manipulationssichere Dokumentation
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Compliance-Dokumente muessen nachweisbar unveraendert sein. Eine SHA-256
            Hash Chain stellt sicher, dass jede Aenderung nachvollziehbar ist.
            Wird ein altes Dokument manipuliert, brechen alle nachfolgenden Hashes.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Prinzip der Hash Chain:</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`Dokument v1  →  SHA-256: a1b2c3...  (previous: null)
Dokument v2  →  SHA-256: d4e5f6...  (previous: a1b2c3...)
Dokument v3  →  SHA-256: g7h8i9...  (previous: d4e5f6...)

Manipulation von v1?
→ Hash von v1 aendert sich
→ previous_hash von v2 stimmt nicht mehr
→ Kette ist gebrochen = Manipulation erkannt`}</code>
            </pre>
          </div>

          <Callout type="info" title="Kein Blockchain, kein ID Austria">
            <p>
              Eine Hash Chain ist KEINE Blockchain. Sie laeuft lokal, braucht kein
              Netzwerk und keine Kryptographie-Infrastruktur. Sie beweist nur, dass
              Dokumente nicht nachtraeglich veraendert wurden. Fuer rechtsverbindliche
              elektronische Signaturen braucht man ID Austria / eIDAS — das ist ein
              separates Thema.
            </p>
          </Callout>
        </section>

        {/* Section 8: Marktlage */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Marktlage: Kein KMU-Produkt vorhanden
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Stand Maerz 2026 gibt es fuer KMUs kein Compliance-Tool, das speziell
            auf AI-Agenten zugeschnitten ist.
          </p>

          <ComparisonTable
            headers={["Anbieter", "Zielgruppe", "Kosten/Jahr", "Agent-spezifisch?"]}
            rows={[
              ["Credo AI", "Enterprise", "50.000+ EUR", "Ja, aber nicht fuer KMU"],
              ["Holistic AI", "Enterprise", "50.000+ EUR", "Teilweise"],
              ["OneTrust", "Enterprise", "50.000+ EUR", "Nein, generisch"],
              ["AI Agent Legal Framework", "KMU", "Open Source (Engine)", "Ja, inkl. Agent-Konfiguration"],
            ]}
          />

          <Callout type="info" title="AI Act Bewusstsein bei KMUs">
            <p>
              Studien zeigen: Nur 56 von 100 DACH-KMUs kennen den EU AI Act
              (verglichen mit 82 von 100 bei der DSGVO). Das Bewusstsein ist niedrig,
              die Deadline nahe. Wer jetzt anfaengt, hat einen Vorsprung.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "EU AI Act Art. 50 Deadline: 2. August 2026. Transparenzpflichten fuer ALLE AI-Systeme mit Kundenkontakt.",
            "DSGVO-Pflichten (Art. 30, 35) gelten bereits JETZT. Eine DPIA ist vor der Inbetriebnahme eines AI-Agenten Pflicht.",
            "Compliance-Dokumente und Agent-Konfiguration muessen im selben Prozess entstehen — sonst stimmt die Doku nicht mit der Realitaet ueberein.",
            "3-Level Killswitch (PAUSE, STOP, DECOMMISSION) ist der praktische Weg zur Human Oversight nach Art. 14.",
            "Hash Chain (SHA-256) macht Compliance-Dokumente manipulationssicher — ohne Blockchain, lokal ausfuehrbar.",
            "Fuer KMUs existiert aktuell kein Compliance-Tool. Wer jetzt handelt, hat Vorsprung vor der Deadline.",
          ]}
        />

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <span className="text-white/70">Basis-Spec:</span>{" "}
              <span className="text-blue-400">phantom-ai/docs/superpowers/specs/2026-03-20-ai-agent-legal-framework-design.md</span>{" "}
              — AI Agent Legal Framework Design (intern)
            </li>
            <li>
              <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                EU AI Act (Verordnung 2024/1689)
              </a>{" "}
              — Volltext auf EUR-Lex
            </li>
            <li>
              <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline">EU AI Act Ueberblick</a> — Risikoklassen und Pflichten
            </li>
            <li>
              <a href="/compliance/dpia" className="text-blue-400 hover:underline">Datenschutz-Folgenabschaetzung (DPIA)</a> — Wann Pflicht, wie durchfuehren
            </li>
            <li>
              <a href="/compliance/dsgvo-grundlagen" className="text-blue-400 hover:underline">DSGVO Grundlagen</a> — Art. 30, Art. 35
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
