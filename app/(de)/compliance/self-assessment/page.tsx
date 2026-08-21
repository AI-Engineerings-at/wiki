"use client"

import { useState } from "react"

type Answer = "ja" | "teilweise" | "nein" | null

type Question = {
  id: number
  text: string
  options: { label: string; value: Answer }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "Setzt dein Unternehmen KI-Systeme ein?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 2,
    text: "Weißt du welche KI-Tools im Unternehmen genutzt werden?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Teilweise", value: "teilweise" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 3,
    text: "Gibt es eine interne KI-Richtlinie?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 4,
    text: "Wurden Mitarbeiter zu KI-Kompetenz geschult (Art. 4)?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 5,
    text: "Ist dokumentiert welche Risikostufe eure KI-Systeme haben?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 6,
    text: "Gibt es eine DPIA für KI-Systeme?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Nicht nötig", value: "teilweise" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 7,
    text: "Sind eure KI-Systeme als solche gekennzeichnet (Transparenz)?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Teilweise", value: "teilweise" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 8,
    text: "Gibt es einen Prozess für KI-Vorfälle?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 9,
    text: "Kennt ihr den EU AI Act und seine Fristen?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Teilweise", value: "teilweise" },
      { label: "Nein", value: "nein" },
    ],
  },
  {
    id: 10,
    text: "Habt ihr einen KI-Beauftragten?",
    options: [
      { label: "Ja", value: "ja" },
      { label: "Nein", value: "nein" },
    ],
  },
]

function getScore(answers: Record<number, Answer>): number {
  let score = 0
  for (const [, value] of Object.entries(answers)) {
    if (value === "ja") score += 1
  }
  return score
}

function getResult(score: number) {
  if (score >= 8) {
    return {
      level: "good" as const,
      title: "Gut vorbereitet",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      description:
        "Euer Unternehmen ist auf einem guten Weg. Die wesentlichen Grundlagen für den EU AI Act sind vorhanden. Prüft regelmäßig, ob alle Maßnahmen aktuell bleiben.",
      recommendations: [
        "Regelmäßige Überprüfung des KI-Inventars einplanen",
        "Schulungsnachweise aktuell halten",
        "Fristen im Kalender markieren: Art. 4 Deadline 02.08.2026",
      ],
    }
  }
  if (score >= 5) {
    return {
      level: "action" as const,
      title: "Handlungsbedarf",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      description:
        "Einige Grundlagen sind vorhanden, aber es gibt Lücken. Nutze die Empfehlungen und Downloads, um die offenen Punkte gezielt abzuarbeiten.",
      recommendations: [
        "KI-Inventar erstellen — alle eingesetzten Tools erfassen",
        "Interne KI-Richtlinie erstellen oder vervollständigen",
        "Mitarbeiterschulungen zu Art. 4 KI-Kompetenz planen",
        "Risikoeinstufung für jedes KI-System durchführen",
        "DPIA für KI-Systeme mit personenbezogenen Daten prüfen",
      ],
    }
  }
  return {
    level: "urgent" as const,
    title: "Dringender Handlungsbedarf",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description:
      "Euer Unternehmen hat noch erhebliche Lücken bei der EU AI Act Compliance. Beginne mit den Grundlagen und arbeite die Prioritäten-Liste ab.",
    recommendations: [
      "Sofort: Bestandsaufnahme — welche KI-Systeme werden eingesetzt?",
      "Sofort: Prüfen ob verbotene KI-Praktiken vorliegen (Art. 5, seit 02.02.2025 in Kraft)",
      "Kurzfristig: KI-Beauftragten benennen",
      "Kurzfristig: Interne KI-Richtlinie erstellen",
      "Mittelfristig: Risikoeinstufung aller KI-Systeme",
      "Mittelfristig: Schulungsplan für Art. 4 KI-Kompetenz (Deadline 02.08.2026)",
      "Mittelfristig: DPIA und Transparenzpflichten umsetzen",
    ],
  }
}

export default function SelfAssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [showResult, setShowResult] = useState(false)

  const allAnswered = questions.every((q) => answers[q.id] != null)
  const score = getScore(answers)
  const result = getResult(score)

  function handleAnswer(questionId: number, value: Answer) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setShowResult(false)
  }

  function handleReset() {
    setAnswers({})
    setShowResult(false)
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-white">
          EU AI Act Readiness Check
        </h1>
        <p className="text-slate-400 mt-2">
          10 Fragen zur Selbsteinschätzung: Wie gut ist dein Unternehmen auf den EU AI Act vorbereitet?
          Beantworte alle Fragen und erhalte eine sofortige Auswertung mit konkreten Empfehlungen.
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
        <div className="font-bold text-white mb-2">Hinweis</div>
        <div className="text-white/70 text-sm leading-relaxed">
          Dieses Self-Assessment dient der Orientierung und ersetzt keine Rechtsberatung.
          Die Fragen basieren auf den Anforderungen des EU AI Act (Verordnung (EU) 2024/1689)
          und der DSGVO.
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <p className="text-white font-medium mb-4">
              <span className="text-slate-500 mr-2">{index + 1}.</span>
              {q.text}
            </p>
            <div className="flex flex-wrap gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(q.id, opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    answers[q.id] === opt.value
                      ? opt.value === "ja"
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                        : opt.value === "teilweise"
                        ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
                        : "bg-red-500/20 border-red-500/50 text-red-400"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit / Reset */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowResult(true)}
          disabled={!allAnswered}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
            allAnswered
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          Auswertung anzeigen
        </button>
        {Object.keys(answers).length > 0 && (
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl font-semibold bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            Zurücksetzen
          </button>
        )}
      </div>

      {/* Result */}
      {showResult && allAnswered && (
        <div className={`${result.bgColor} border ${result.borderColor} rounded-xl p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${result.color}`}>
              {result.title}
            </h2>
            <span className={`text-lg font-bold ${result.color}`}>
              {score}/10
            </span>
          </div>

          <p className="text-white/80 text-sm leading-relaxed">
            {result.description}
          </p>

          <div>
            <h3 className="text-white font-semibold mb-2">Empfehlungen:</h3>
            <ul className="space-y-1">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-slate-500 mt-0.5">-</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-white font-semibold mb-3">Weiterführende Ressourcen:</h3>
            <div className="grid gap-2">
              <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline text-sm">
                EU AI Act — Überblick und Pflichten →
              </a>
              <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline text-sm">
                Art. 4 KI-Kompetenz — Schulungspflicht →
              </a>
              <a href="/compliance/eu-ai-act-checkliste" className="text-blue-400 hover:underline text-sm">
                EU AI Act Checkliste — 7-Schritte Leitfaden →
              </a>
              <a href="/compliance/dpia" className="text-blue-400 hover:underline text-sm">
                DPIA für KI-Systeme →
              </a>
              <a href="/downloads" className="text-blue-400 hover:underline text-sm">
                Praxis-Downloads — Templates und Vorlagen →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Quellen */}
      <section className="mt-16 pt-8 border-t border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
        <ul className="space-y-2 text-sm text-white/50">
          <li>
            <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Verordnung (EU) 2024/1689
            </a> — EU AI Act Volltext
          </li>
          <li>
            <a href="/compliance/eu-ai-act" className="text-blue-400 hover:underline">
              EU AI Act
            </a> — Wiki-Artikel mit Zusammenfassung
          </li>
          <li>
            <a href="/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">
              KI-Kompetenz nach Art. 4
            </a> — Schulungspflichten erklärt
          </li>
        </ul>
      </section>
    </div>
  )
}
