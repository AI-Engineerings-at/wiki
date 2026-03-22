"use client"

import { useState } from "react"

type Answer = "yes" | "partially" | "no" | null

type Question = {
  id: number
  text: string
  options: { label: string; value: Answer }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "Does your company use AI systems?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 2,
    text: "Do you know which AI tools are being used in the company?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Partially", value: "partially" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 3,
    text: "Is there an internal AI policy?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 4,
    text: "Have employees been trained on AI literacy (Art. 4)?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 5,
    text: "Is the risk level of your AI systems documented?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 6,
    text: "Is there a DPIA for your AI systems?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Not required", value: "partially" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 7,
    text: "Are your AI systems labeled as such (transparency)?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Partially", value: "partially" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 8,
    text: "Is there a process for AI incidents?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 9,
    text: "Are you familiar with the EU AI Act and its deadlines?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Partially", value: "partially" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 10,
    text: "Do you have an AI compliance officer?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
]

function getScore(answers: Record<number, Answer>): number {
  let score = 0
  for (const [, value] of Object.entries(answers)) {
    if (value === "yes") score += 1
  }
  return score
}

function getResult(score: number) {
  if (score >= 8) {
    return {
      level: "good" as const,
      title: "Well prepared",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      description:
        "Your company is on the right track. The essential foundations for the EU AI Act are in place. Make sure to review all measures regularly to keep them current.",
      recommendations: [
        "Schedule regular reviews of your AI inventory",
        "Keep training records up to date",
        "Mark deadlines in your calendar: Art. 4 deadline Aug 2, 2026",
      ],
    }
  }
  if (score >= 5) {
    return {
      level: "action" as const,
      title: "Action needed",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      description:
        "Some foundations are in place, but there are gaps. Use the recommendations and downloads below to address the open items systematically.",
      recommendations: [
        "Create an AI inventory — document all tools in use",
        "Create or complete an internal AI policy",
        "Plan employee training for Art. 4 AI literacy",
        "Perform risk classification for each AI system",
        "Review DPIA requirements for AI systems processing personal data",
      ],
    }
  }
  return {
    level: "urgent" as const,
    title: "Urgent action required",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description:
      "Your company has significant gaps in EU AI Act compliance. Start with the basics and work through the priority list below.",
    recommendations: [
      "Immediately: Take inventory — which AI systems are in use?",
      "Immediately: Check for prohibited AI practices (Art. 5, in force since Feb 2, 2025)",
      "Short-term: Appoint an AI compliance officer",
      "Short-term: Create an internal AI policy",
      "Medium-term: Risk classification for all AI systems",
      "Medium-term: Training plan for Art. 4 AI literacy (deadline Aug 2, 2026)",
      "Medium-term: Implement DPIA and transparency obligations",
    ],
  }
}

export default function SelfAssessmentPageEN() {
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
          10 questions for self-assessment: How well is your company prepared for the EU AI Act?
          Answer all questions and receive an instant evaluation with specific recommendations.
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
        <div className="font-bold text-white mb-2">Note</div>
        <div className="text-white/70 text-sm leading-relaxed">
          This self-assessment is for orientation purposes and does not replace legal advice.
          The questions are based on the requirements of the EU AI Act (Regulation (EU) 2024/1689)
          and the GDPR.
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
                      ? opt.value === "yes"
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                        : opt.value === "partially"
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
          Show results
        </button>
        {Object.keys(answers).length > 0 && (
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl font-semibold bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            Reset
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
            <h3 className="text-white font-semibold mb-2">Recommendations:</h3>
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
            <h3 className="text-white font-semibold mb-3">Further resources:</h3>
            <div className="grid gap-2">
              <a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:underline text-sm">
                EU AI Act — Overview and obligations →
              </a>
              <a href="/en/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline text-sm">
                Art. 4 AI Literacy — Training requirements →
              </a>
              <a href="/en/compliance/eu-ai-act-checkliste" className="text-blue-400 hover:underline text-sm">
                EU AI Act Checklist — 7-step guide →
              </a>
              <a href="/en/compliance/dpia" className="text-blue-400 hover:underline text-sm">
                DPIA for AI Systems →
              </a>
              <a href="/en/downloads" className="text-blue-400 hover:underline text-sm">
                Practice Downloads — Templates and guides →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Sources */}
      <section className="mt-16 pt-8 border-t border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
        <ul className="space-y-2 text-sm text-white/50">
          <li>
            <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Regulation (EU) 2024/1689
            </a> — EU AI Act full text
          </li>
          <li>
            <a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:underline">
              EU AI Act
            </a> — Wiki article with summary
          </li>
          <li>
            <a href="/en/compliance/ki-kompetenz-art4" className="text-blue-400 hover:underline">
              AI Literacy (Art. 4)
            </a> — Training obligations explained
          </li>
        </ul>
      </section>
    </div>
  )
}
