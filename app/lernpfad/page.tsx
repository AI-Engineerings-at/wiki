'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ───────────────────────────── Quiz Data ───────────────────────────── */

const questions = [
  {
    id: 1,
    question: 'Was beschreibt dich am besten?',
    options: [
      { key: 'A', label: 'Ich führe ein Unternehmen / bin in der Geschäftsleitung' },
      { key: 'B', label: 'Ich bin in der IT / Administration' },
      { key: 'C', label: 'Ich bin Entwickler / Programmierer' },
      { key: 'D', label: 'Ich bin für Compliance / Recht zuständig' },
      { key: 'E', label: 'Ich bin komplett neu bei KI' },
    ],
  },
  {
    id: 2,
    question: 'Was willst du erreichen?',
    options: [
      { key: 'A', label: 'Verstehen was KI kostet und was sie kann' },
      { key: 'B', label: 'KI-Systeme einrichten und betreiben' },
      { key: 'C', label: 'Eigene KI-Anwendungen bauen' },
      { key: 'D', label: 'Compliance-Anforderungen erfüllen' },
      { key: 'E', label: 'Einfach mal anfangen und ausprobieren' },
    ],
  },
  {
    id: 3,
    question: 'Wie technisch bist du?',
    options: [
      { key: 'A', label: 'Nicht technisch — ich will Ergebnisse, keine Details' },
      { key: 'B', label: 'Grundkenntnisse — ich kenne mich mit PCs aus' },
      { key: 'C', label: 'Fortgeschritten — Terminal, Docker sind mir bekannt' },
      { key: 'D', label: 'Experte — Ich entwickle Software' },
    ],
  },
]

/* ───────────────────────────── Path Data ───────────────────────────── */

type PathId = 'management' | 'it-admin' | 'developer' | 'compliance' | 'beginner'

interface PathInfo {
  id: PathId
  icon: string
  title: string
  subtitle: string
  technical: string
  duration: string
  articleCount: number
  result: string
  articles: { href: string; title: string; description: string }[]
}

const paths: PathInfo[] = [
  {
    id: 'management',
    icon: '\u{1F3E2}',
    title: 'Geschäftsführung & Management',
    subtitle: 'Was KI für dein Unternehmen bedeutet — Kosten, Nutzen, Risiken, Pflichten',
    technical: 'Nein',
    duration: '~2h',
    articleCount: 6,
    result: 'Entscheidungen treffen',
    articles: [
      { href: '/grundlagen/ki-unternehmen', title: 'KI im Unternehmen: Was bringt es wirklich?', description: 'Chancen, Grenzen und konkrete Einsatzfelder — ohne Hype.' },
      { href: '/grundlagen/ai-kosten-vergleich', title: 'Was kostet KI? Der ehrliche Vergleich', description: 'Cloud-APIs vs. lokale Hardware: Was rechnet sich wann?' },
      { href: '/grundlagen/lokal-vs-cloud', title: 'Lokal vs Cloud: Was ist sicherer?', description: 'Datenschutz, Kontrolle, Abhängigkeit — die Fakten.' },
      { href: '/compliance/eu-ai-act', title: 'EU AI Act: Was du als Chef wissen musst', description: 'Die wichtigsten Pflichten auf einen Blick.' },
      { href: '/compliance/ki-kompetenz-art4', title: 'Art. 4: Was du tun MUSST', description: 'KI-Kompetenzpflicht seit Februar 2025 — betrifft jedes Unternehmen.' },
      { href: '/oesterreich', title: 'KI-Förderungen und Anlaufstellen in Österreich', description: 'Welche Förderungen es gibt und wo du Hilfe bekommst.' },
    ],
  },
  {
    id: 'it-admin',
    icon: '\u{1F6E0}\u{FE0F}',
    title: 'IT & Administration',
    subtitle: 'KI-Systeme einrichten, betreiben und absichern',
    technical: 'Mittel',
    duration: '~4h',
    articleCount: 7,
    result: 'Stack betreiben',
    articles: [
      { href: '/tools/ollama-tutorial', title: 'Ollama: Lokales LLM in 5 Minuten', description: 'Ein Befehl, ein Modell — los gehts.' },
      { href: '/tools/docker-grundlagen', title: 'Docker: Warum Container?', description: 'Was Docker ist und warum du es für KI brauchst.' },
      { href: '/tools/ai-stack-setup', title: 'Den kompletten AI-Stack einrichten', description: 'Ollama + Open WebUI + n8n — alles zusammen.' },
      { href: '/tools/grafana-monitoring', title: 'Monitoring: Siehst du ob alles läuft?', description: 'Grafana-Dashboards für deinen AI-Stack.' },
      { href: '/security/firewall-setup', title: 'Netzwerk absichern', description: 'Firewall-Regeln für selbst gehostete KI-Systeme.' },
      { href: '/security/backup-strategie', title: 'Backup: Wenn was schiefgeht', description: 'Automatische Backups — damit nichts verloren geht.' },
      { href: '/tools/n8n-fuer-anfaenger', title: 'Automatisierung mit n8n', description: 'Workflows bauen ohne Programmieren.' },
    ],
  },
  {
    id: 'developer',
    icon: '\u{1F4BB}',
    title: 'Entwickler',
    subtitle: 'KI-Anwendungen bauen: Agents, RAG, APIs',
    technical: 'Hoch',
    duration: '~6h',
    articleCount: 8,
    result: 'Apps bauen',
    articles: [
      { href: '/grundlagen/was-ist-ein-llm', title: 'Wie LLMs funktionieren', description: 'Token-Prediction, Attention, Context Window — die Grundlagen.' },
      { href: '/tools/model-selection', title: 'Welches Modell für welchen Zweck?', description: 'Qwen, Llama, Mistral — wann nimmst du was?' },
      { href: '/tools/rag-guide', title: 'RAG: Eigene Daten + LLM', description: 'Retrieval Augmented Generation — dein Wissen, dein Modell.' },
      { href: '/patterns/agent-orchestration-patterns', title: 'Agent Patterns', description: 'Sequential, Parallel, Hierarchical — die wichtigsten Muster.' },
      { href: '/patterns/memory-management', title: 'Memory & Context', description: 'Wie Agents sich erinnern und Kontext verwalten.' },
      { href: '/tools/mcp-server', title: 'MCP: Tools für LLMs', description: 'Model Context Protocol — so gibst du LLMs Werkzeuge.' },
      { href: '/patterns/self-improving-agents', title: 'Self-Improving Agents', description: 'Agents die aus Fehlern lernen und sich selbst verbessern.' },
      { href: '/tools/n8n-workflow-bundle', title: 'n8n AI Workflows', description: 'Fertige Workflow-Templates für typische AI-Aufgaben.' },
    ],
  },
  {
    id: 'compliance',
    icon: '\u{2696}\u{FE0F}',
    title: 'Compliance & Recht',
    subtitle: 'EU AI Act, DSGVO, Dokumentation — was Pflicht ist',
    technical: 'Nein',
    duration: '~3h',
    articleCount: 8,
    result: 'Compliance sichern',
    articles: [
      { href: '/compliance/eu-ai-act', title: 'EU AI Act Leitfaden', description: 'Der komplette Überblick — verständlich erklärt.' },
      { href: '/compliance/ki-kompetenz-art4', title: 'Art. 4 KI-Kompetenz (gilt seit 02.2025!)', description: 'Was Artikel 4 konkret von dir verlangt.' },
      { href: '/compliance/eu-ai-act-checkliste', title: 'Compliance Checkliste', description: 'Punkt für Punkt prüfen ob du alles erfüllst.' },
      { href: '/compliance/dsgvo-grundlagen', title: 'DSGVO für KI-Systeme', description: 'Datenschutz-Grundverordnung trifft auf KI.' },
      { href: '/compliance/dpia', title: 'Datenschutz-Folgenabschätzung', description: 'Wann du eine DPIA brauchst und wie du sie erstellst.' },
      { href: '/compliance/verbotene-ai-praktiken', title: 'Was VERBOTEN ist', description: 'Social Scoring, Emotionserkennung am Arbeitsplatz und mehr.' },
      { href: '/compliance/ai-agent-legal-framework', title: 'Agents rechtlich einordnen', description: 'Wer haftet wenn ein Agent Fehler macht?' },
      { href: '/downloads', title: 'Templates & Checklisten', description: 'Fertige Dokumente zum Herunterladen.' },
    ],
  },
  {
    id: 'beginner',
    icon: '\u{1F331}',
    title: 'Einsteiger',
    subtitle: 'Komplett neu? Hier startest du — Schritt für Schritt, kein Vorwissen nötig',
    technical: 'Nein',
    duration: '~4h',
    articleCount: 7,
    result: 'Grundlagen verstehen',
    articles: [
      { href: '/blog/2026-03-12-was-ist-ein-llm', title: 'Was ist KI? Einfach erklärt', description: 'Keine Fachbegriffe, keine Formeln — nur das Wesentliche.' },
      { href: '/blog/2026-03-12-warum-lokale-ki-statt-cloud', title: 'Warum lokal?', description: 'Warum deine Daten besser bei dir bleiben.' },
      { href: '/blog/2026-03-12-terminal-grundlagen-fuer-ai', title: '10 Befehle — mehr brauchst du nicht', description: 'Terminal-Grundlagen für absolute Anfänger.' },
      { href: '/blog/2026-03-12-ollama-installieren-schritt-fuer-schritt', title: 'Dein erstes LLM installieren', description: 'Ollama installieren — Schritt für Schritt mit Screenshots.' },
      { href: '/blog/2026-03-12-open-webui-erster-chatbot', title: 'Dein erster Chatbot', description: 'Open WebUI: ChatGPT-Oberfläche für dein lokales Modell.' },
      { href: '/blog/2026-03-12-docker-grundlagen-fuer-ai', title: 'Docker verstehen', description: 'Container, Images, Volumes — einfach erklärt.' },
      { href: '/grundlagen/30-tage-quickstart', title: '30-Tage Quickstart Plan', description: 'Dein Fahrplan für den ersten Monat mit lokaler KI.' },
    ],
  },
]

/* ───────────────────────────── Scoring ───────────────────────────── */

function recommendPath(answers: Record<number, string>): PathId {
  const scores: Record<PathId, number> = {
    management: 0,
    'it-admin': 0,
    developer: 0,
    compliance: 0,
    beginner: 0,
  }

  // Q1: Role
  const q1 = answers[1]
  if (q1 === 'A') scores.management += 3
  if (q1 === 'B') scores['it-admin'] += 3
  if (q1 === 'C') scores.developer += 3
  if (q1 === 'D') scores.compliance += 3
  if (q1 === 'E') scores.beginner += 3

  // Q2: Goal
  const q2 = answers[2]
  if (q2 === 'A') { scores.management += 2; scores.beginner += 1 }
  if (q2 === 'B') { scores['it-admin'] += 2; scores.developer += 1 }
  if (q2 === 'C') { scores.developer += 2; scores['it-admin'] += 1 }
  if (q2 === 'D') { scores.compliance += 2; scores.management += 1 }
  if (q2 === 'E') { scores.beginner += 2 }

  // Q3: Technical level
  const q3 = answers[3]
  if (q3 === 'A') { scores.management += 1; scores.compliance += 1; scores.beginner += 1 }
  if (q3 === 'B') { scores['it-admin'] += 1; scores.beginner += 1 }
  if (q3 === 'C') { scores['it-admin'] += 2; scores.developer += 1 }
  if (q3 === 'D') { scores.developer += 2 }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  return sorted[0][0] as PathId
}

/* ───────────────────────────── Progress Hook ───────────────────────────── */

function useProgress() {
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lernpfad-progress')
      if (stored) setCompleted(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  const toggle = (href: string) => {
    setCompleted(prev => {
      const next = prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
      try { localStorage.setItem('lernpfad-progress', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }

  return { completed: { has: (h: string) => completed.includes(h), size: completed.length }, toggle }
}

/* ───────────────────────────── Components ───────────────────────────── */

function QuizCard({
  question,
  options,
  selected,
  onSelect,
}: {
  question: string
  options: { key: string; label: string }[]
  selected: string | undefined
  onSelect: (key: string) => void
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">{question}</h3>
      <div className="space-y-2">
        {options.map(opt => (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
              selected === opt.key
                ? 'border-[#4262FF] bg-[#4262FF]/10 text-white'
                : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <span className={`inline-block w-6 font-mono font-bold ${selected === opt.key ? 'text-[#4262FF]' : 'text-slate-500'}`}>
              {opt.key})
            </span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function PathCard({
  path,
  isRecommended,
  defaultOpen,
  completed,
  onToggle,
}: {
  path: PathInfo
  isRecommended: boolean
  defaultOpen: boolean
  completed: { has: (h: string) => boolean; size: number }
  onToggle: (href: string) => void
}) {
  const [open, setOpen] = useState(defaultOpen)
  const done = path.articles.filter(a => completed.has(a.href)).length

  return (
    <div
      className={`rounded-xl border transition-colors ${
        isRecommended
          ? 'border-[#4262FF] bg-gradient-to-r from-[#4262FF]/5 to-blue-600/5'
          : 'border-slate-800 bg-slate-900'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <span className="text-2xl shrink-0 mt-0.5">{path.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-white">{path.title}</h3>
            {isRecommended && (
              <span className="text-xs bg-[#4262FF] text-white px-2 py-0.5 rounded font-medium">
                Empfohlen
              </span>
            )}
            <span className="text-xs text-slate-500">{path.duration} &middot; {path.articleCount} Artikel</span>
          </div>
          <p className="text-slate-400 text-sm mt-1">{path.subtitle}</p>
          {done > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4262FF] rounded-full transition-all"
                  style={{ width: `${(done / path.articles.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500">{done}/{path.articles.length}</span>
            </div>
          )}
        </div>
        <span className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}>
          &#9660;
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-2">
          {/* Completion Reward */}
          {done === path.articles.length && path.articles.length > 0 && (
            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-5 mb-4 text-center">
              <div className="text-3xl mb-2">🎉</div>
              <h4 className="text-lg font-bold text-white mb-1">Pfad abgeschlossen!</h4>
              <p className="text-sm text-slate-400 mb-3">
                Du hast alle {path.articles.length} Artikel durchgearbeitet. Hier ist dein Rabattcode:
              </p>
              <div className="inline-block bg-slate-950 border-2 border-emerald-500/50 rounded-lg px-6 py-3">
                <span className="text-2xl font-black text-emerald-400 tracking-widest">WIKI20</span>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                20% Rabatt auf alle Produkte & Kurse auf{' '}
                <a href="https://www.ai-engineering.at" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  ai-engineering.at
                </a>
              </p>
            </div>
          )}
          {path.articles.map((article, i) => (
            <div key={article.href} className="flex items-start gap-3 group">
              <button
                onClick={() => onToggle(article.href)}
                className={`shrink-0 mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  completed.has(article.href)
                    ? 'bg-[#4262FF] border-[#4262FF] text-white'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                aria-label={completed.has(article.href) ? 'Als ungelesen markieren' : 'Als gelesen markieren'}
              >
                {completed.has(article.href) && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <div className="flex-1 min-w-0">
                <Link
                  href={article.href}
                  className={`text-sm font-medium transition-colors ${
                    completed.has(article.href)
                      ? 'text-slate-500 line-through'
                      : 'text-white hover:text-[#4262FF]'
                  }`}
                >
                  <span className="text-slate-600 mr-2">{i + 1}.</span>
                  {article.title}
                </Link>
                <p className="text-xs text-slate-500 mt-0.5">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ───────────────────────────── Main Page ───────────────────────────── */

export default function LernpfadPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [recommended, setRecommended] = useState<PathId | null>(null)
  const [showAllPaths, setShowAllPaths] = useState(false)
  const { completed, toggle } = useProgress()

  const handleSelect = (qId: number, key: string) => {
    const next = { ...answers, [qId]: key }
    setAnswers(next)

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1)
      } else {
        // All answered
        setRecommended(recommendPath(next))
      }
    }, 300)
  }

  const resetQuiz = () => {
    setAnswers({})
    setCurrentQ(0)
    setRecommended(null)
  }

  const recommendedPath = recommended ? paths.find(p => p.id === recommended) : null

  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <p className="text-sm text-[#4262FF] font-semibold uppercase tracking-wide mb-2">
          Lernpfad
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Dein Weg in die lokale KI
        </h1>
        <p className="text-lg text-slate-400 mt-3 max-w-xl mx-auto">
          3 Fragen — dann zeigen wir dir genau die Artikel die DU brauchst.
          Kein Raten, kein Umherirren.
        </p>
      </div>

      {/* Quiz */}
      {!recommended && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < currentQ
                    ? 'bg-[#4262FF]'
                    : i === currentQ
                      ? 'bg-[#4262FF]/50'
                      : 'bg-slate-800'
                }`}
              />
            ))}
          </div>

          <p className="text-sm text-slate-500">
            Frage {currentQ + 1} von {questions.length}
          </p>

          <QuizCard
            question={questions[currentQ].question}
            options={questions[currentQ].options}
            selected={answers[questions[currentQ].id]}
            onSelect={key => handleSelect(questions[currentQ].id, key)}
          />
        </div>
      )}

      {/* Recommendation */}
      {recommended && recommendedPath && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#4262FF]/10 to-blue-600/5 border border-[#4262FF]/40 rounded-xl p-6 text-center">
            <p className="text-sm text-[#4262FF] font-semibold mb-2">Dein Pfad</p>
            <p className="text-2xl font-bold text-white">
              {recommendedPath.icon} {recommendedPath.title}
            </p>
            <p className="text-slate-400 text-sm mt-2">{recommendedPath.subtitle}</p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500">
              <span>{recommendedPath.duration} Lesezeit</span>
              <span>&middot;</span>
              <span>{recommendedPath.articleCount} Artikel</span>
              <span>&middot;</span>
              <span>Technisch: {recommendedPath.technical}</span>
            </div>
            <button
              onClick={resetQuiz}
              className="text-xs text-slate-500 hover:text-slate-400 mt-4 underline"
            >
              Quiz wiederholen
            </button>
          </div>

          <PathCard
            path={recommendedPath}
            isRecommended={true}
            defaultOpen={true}
            completed={completed}
            onToggle={toggle}
          />
        </div>
      )}

      {/* Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h2 className="text-base font-semibold text-white">Alle 5 Pfade im Vergleich</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 text-xs uppercase tracking-wide">
                <th className="p-3 pl-5 font-medium"></th>
                <th className="p-3 font-medium">{'\u{1F3E2}'} Geschäfts&shy;führung</th>
                <th className="p-3 font-medium">{'\u{1F6E0}\u{FE0F}'} IT/Admin</th>
                <th className="p-3 font-medium">{'\u{1F4BB}'} Entwickler</th>
                <th className="p-3 font-medium">{'\u{2696}\u{FE0F}'} Compliance</th>
                <th className="p-3 pr-5 font-medium">{'\u{1F331}'} Einsteiger</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-t border-slate-800">
                <td className="p-3 pl-5 text-slate-400 font-medium">Technisch?</td>
                <td className="p-3">Nein</td>
                <td className="p-3">Mittel</td>
                <td className="p-3">Hoch</td>
                <td className="p-3">Nein</td>
                <td className="p-3 pr-5">Nein</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="p-3 pl-5 text-slate-400 font-medium">Dauer</td>
                <td className="p-3">~2h</td>
                <td className="p-3">~4h</td>
                <td className="p-3">~6h</td>
                <td className="p-3">~3h</td>
                <td className="p-3 pr-5">~4h</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="p-3 pl-5 text-slate-400 font-medium">Artikel</td>
                <td className="p-3">6</td>
                <td className="p-3">7</td>
                <td className="p-3">8</td>
                <td className="p-3">8</td>
                <td className="p-3 pr-5">7</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="p-3 pl-5 text-slate-400 font-medium">Ergebnis</td>
                <td className="p-3">Entscheidungen treffen</td>
                <td className="p-3">Stack betreiben</td>
                <td className="p-3">Apps bauen</td>
                <td className="p-3">Compliance sichern</td>
                <td className="p-3 pr-5">Grundlagen verstehen</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* All Paths */}
      <div>
        <button
          onClick={() => setShowAllPaths(!showAllPaths)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors mb-4"
        >
          <span className={`transition-transform ${showAllPaths ? 'rotate-180' : ''}`}>&#9660;</span>
          Alle 5 Pfade auf einen Blick
        </button>

        {showAllPaths && (
          <div className="space-y-3">
            {paths.map(path => (
              <PathCard
                key={path.id}
                path={path}
                isRecommended={path.id === recommended}
                defaultOpen={false}
                completed={completed}
                onToggle={toggle}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          Bereit für den kompletten Stack?
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          Das P1 Playbook gibt dir getestete Configs, Grafana-Dashboards,
          n8n-Templates und DSGVO-Checklisten für deinen lokalen AI-Stack.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.ai-engineering.at/products"
            className="bg-[#4262FF] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Playbook P1 holen — EUR 49
          </a>
          <a
            href="https://www.ai-engineering.at/contact"
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Kostenlose Beratung
          </a>
        </div>
      </div>
    </div>
  )
}
