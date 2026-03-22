'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ───────────────────────────── Quiz Data ───────────────────────────── */

const questions = [
  {
    id: 1,
    question: 'Which describes you best?',
    options: [
      { key: 'A', label: 'I run a company / I\'m in executive management' },
      { key: 'B', label: 'I\'m in IT / system administration' },
      { key: 'C', label: 'I\'m a developer / programmer' },
      { key: 'D', label: 'I\'m responsible for compliance / legal' },
      { key: 'E', label: 'I\'m completely new to AI' },
    ],
  },
  {
    id: 2,
    question: 'What do you want to achieve?',
    options: [
      { key: 'A', label: 'Understand what AI costs and what it can do' },
      { key: 'B', label: 'Set up and run AI systems' },
      { key: 'C', label: 'Build my own AI applications' },
      { key: 'D', label: 'Meet compliance requirements' },
      { key: 'E', label: 'Just get started and try things out' },
    ],
  },
  {
    id: 3,
    question: 'How technical are you?',
    options: [
      { key: 'A', label: 'Not technical — I want results, not details' },
      { key: 'B', label: 'Basic knowledge — I know my way around PCs' },
      { key: 'C', label: 'Advanced — Terminal, Docker are familiar to me' },
      { key: 'D', label: 'Expert — I develop software' },
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
    title: 'Executive & Management',
    subtitle: 'What AI means for your business — costs, benefits, risks, obligations',
    technical: 'No',
    duration: '~2h',
    articleCount: 6,
    result: 'Make decisions',
    articles: [
      { href: '/en/grundlagen/ki-unternehmen', title: 'AI in Business: What Does It Actually Deliver?', description: 'Opportunities, limits, and real use cases — no hype.' },
      { href: '/en/grundlagen/ai-kosten-vergleich', title: 'What Does AI Cost? The Honest Comparison', description: 'Cloud APIs vs. local hardware: what pays off when?' },
      { href: '/en/grundlagen/lokal-vs-cloud', title: 'Local vs Cloud: What Is More Secure?', description: 'Data protection, control, dependency — the facts.' },
      { href: '/en/compliance/eu-ai-act', title: 'EU AI Act: What You Need to Know as a Leader', description: 'The key obligations at a glance.' },
      { href: '/en/compliance/ki-kompetenz-art4', title: 'Art. 4: What You MUST Do', description: 'AI competence obligation since February 2025 — applies to every company.' },
      { href: '/en/austria', title: 'AI Funding and Resources in Austria', description: 'Available grants and where to get help.' },
    ],
  },
  {
    id: 'it-admin',
    icon: '\u{1F6E0}\u{FE0F}',
    title: 'IT & Administration',
    subtitle: 'Set up, run, and secure AI systems',
    technical: 'Medium',
    duration: '~4h',
    articleCount: 7,
    result: 'Run the stack',
    articles: [
      { href: '/en/tools/ollama-tutorial', title: 'Ollama: Local LLM in 5 Minutes', description: 'One command, one model — let\'s go.' },
      { href: '/en/tools/docker-grundlagen', title: 'Docker: Why Containers?', description: 'What Docker is and why you need it for AI.' },
      { href: '/en/tools/ai-stack-setup', title: 'Set Up the Complete AI Stack', description: 'Ollama + Open WebUI + n8n — all together.' },
      { href: '/en/tools/grafana-monitoring', title: 'Monitoring: Can You See If Everything Is Running?', description: 'Grafana dashboards for your AI stack.' },
      { href: '/en/security/firewall-setup', title: 'Secure the Network', description: 'Firewall rules for self-hosted AI systems.' },
      { href: '/en/security/backup-strategie', title: 'Backup: When Things Go Wrong', description: 'Automatic backups — so nothing gets lost.' },
      { href: '/en/tools/n8n-fuer-anfaenger', title: 'Automation with n8n', description: 'Build workflows without coding.' },
    ],
  },
  {
    id: 'developer',
    icon: '\u{1F4BB}',
    title: 'Developer',
    subtitle: 'Build AI applications: Agents, RAG, APIs',
    technical: 'High',
    duration: '~6h',
    articleCount: 8,
    result: 'Build apps',
    articles: [
      { href: '/en/grundlagen/was-ist-ein-llm', title: 'How LLMs Work', description: 'Token prediction, attention, context window — the fundamentals.' },
      { href: '/en/tools/model-selection', title: 'Which Model for Which Purpose?', description: 'Qwen, Llama, Mistral — when do you use what?' },
      { href: '/en/tools/rag-guide', title: 'RAG: Your Data + LLM', description: 'Retrieval Augmented Generation — your knowledge, your model.' },
      { href: '/en/patterns/agent-orchestration-patterns', title: 'Agent Patterns', description: 'Sequential, parallel, hierarchical — the key patterns.' },
      { href: '/en/patterns/memory-management', title: 'Memory & Context', description: 'How agents remember and manage context.' },
      { href: '/en/tools/mcp-server', title: 'MCP: Tools for LLMs', description: 'Model Context Protocol — giving LLMs real tools.' },
      { href: '/en/patterns/self-improving-agents', title: 'Self-Improving Agents', description: 'Agents that learn from mistakes and improve themselves.' },
      { href: '/en/tools/n8n-workflow-bundle', title: 'n8n AI Workflows', description: 'Ready-made workflow templates for typical AI tasks.' },
    ],
  },
  {
    id: 'compliance',
    icon: '\u{2696}\u{FE0F}',
    title: 'Compliance & Legal',
    subtitle: 'EU AI Act, GDPR, documentation — what is mandatory',
    technical: 'No',
    duration: '~3h',
    articleCount: 8,
    result: 'Ensure compliance',
    articles: [
      { href: '/en/compliance/eu-ai-act', title: 'EU AI Act Guide', description: 'The complete overview — explained clearly.' },
      { href: '/en/compliance/ki-kompetenz-art4', title: 'Art. 4 AI Competence (effective since 02/2025!)', description: 'What Article 4 specifically requires from you.' },
      { href: '/en/compliance/eu-ai-act-checkliste', title: 'Compliance Checklist', description: 'Check point by point whether you meet all requirements.' },
      { href: '/en/compliance/dsgvo-grundlagen', title: 'GDPR for AI Systems', description: 'Data protection regulation meets AI.' },
      { href: '/en/compliance/dpia', title: 'Data Protection Impact Assessment', description: 'When you need a DPIA and how to create one.' },
      { href: '/en/compliance/verbotene-ai-praktiken', title: 'What Is PROHIBITED', description: 'Social scoring, workplace emotion recognition, and more.' },
      { href: '/en/compliance/ai-agent-legal-framework', title: 'Legal Framework for Agents', description: 'Who is liable when an agent makes mistakes?' },
      { href: '/en/downloads', title: 'Templates & Checklists', description: 'Ready-to-use documents for download.' },
    ],
  },
  {
    id: 'beginner',
    icon: '\u{1F331}',
    title: 'Beginner',
    subtitle: 'Completely new? Start here — step by step, no prior knowledge needed',
    technical: 'No',
    duration: '~4h',
    articleCount: 7,
    result: 'Understand the basics',
    articles: [
      { href: '/blog/2026-03-12-was-ist-ein-llm', title: 'What Is AI? Simply Explained', description: 'No jargon, no formulas — just the essentials.' },
      { href: '/blog/2026-03-12-warum-lokale-ki-statt-cloud', title: 'Why Local?', description: 'Why your data is better off staying with you.' },
      { href: '/blog/2026-03-12-terminal-grundlagen-fuer-ai', title: '10 Commands — That\'s All You Need', description: 'Terminal basics for absolute beginners.' },
      { href: '/blog/2026-03-12-ollama-installieren-schritt-fuer-schritt', title: 'Install Your First LLM', description: 'Install Ollama — step by step with screenshots.' },
      { href: '/blog/2026-03-12-open-webui-erster-chatbot', title: 'Your First Chatbot', description: 'Open WebUI: ChatGPT-like interface for your local model.' },
      { href: '/blog/2026-03-12-docker-grundlagen-fuer-ai', title: 'Understanding Docker', description: 'Containers, images, volumes — simply explained.' },
      { href: '/en/grundlagen/30-tage-quickstart', title: '30-Day Quickstart Plan', description: 'Your roadmap for the first month with local AI.' },
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
      const stored = localStorage.getItem('learning-path-progress')
      if (stored) setCompleted(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  const toggle = (href: string) => {
    setCompleted(prev => {
      const next = prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
      try { localStorage.setItem('learning-path-progress', JSON.stringify(next)) } catch { /* ignore */ }
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
  completed: Set<string>
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
                Recommended
              </span>
            )}
            <span className="text-xs text-slate-500">{path.duration} &middot; {path.articleCount} articles</span>
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
          {path.articles.map((article, i) => (
            <div key={article.href} className="flex items-start gap-3 group">
              <button
                onClick={() => onToggle(article.href)}
                className={`shrink-0 mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  completed.has(article.href)
                    ? 'bg-[#4262FF] border-[#4262FF] text-white'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                aria-label={completed.has(article.href) ? 'Mark as unread' : 'Mark as read'}
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

export default function LearningPathPage() {
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
          Learning Path
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Your Path into Local AI
        </h1>
        <p className="text-lg text-slate-400 mt-3 max-w-xl mx-auto">
          3 questions — then we show you exactly the articles YOU need.
          No guessing, no wandering around.
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
            Question {currentQ + 1} of {questions.length}
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
            <p className="text-sm text-[#4262FF] font-semibold mb-2">Your Path</p>
            <p className="text-2xl font-bold text-white">
              {recommendedPath.icon} {recommendedPath.title}
            </p>
            <p className="text-slate-400 text-sm mt-2">{recommendedPath.subtitle}</p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500">
              <span>{recommendedPath.duration} reading time</span>
              <span>&middot;</span>
              <span>{recommendedPath.articleCount} articles</span>
              <span>&middot;</span>
              <span>Technical: {recommendedPath.technical}</span>
            </div>
            <button
              onClick={resetQuiz}
              className="text-xs text-slate-500 hover:text-slate-400 mt-4 underline"
            >
              Retake quiz
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
          <h2 className="text-base font-semibold text-white">All 5 Paths at a Glance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 text-xs uppercase tracking-wide">
                <th className="p-3 pl-5 font-medium"></th>
                <th className="p-3 font-medium">{'\u{1F3E2}'} Executive</th>
                <th className="p-3 font-medium">{'\u{1F6E0}\u{FE0F}'} IT/Admin</th>
                <th className="p-3 font-medium">{'\u{1F4BB}'} Developer</th>
                <th className="p-3 font-medium">{'\u{2696}\u{FE0F}'} Compliance</th>
                <th className="p-3 pr-5 font-medium">{'\u{1F331}'} Beginner</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-t border-slate-800">
                <td className="p-3 pl-5 text-slate-400 font-medium">Technical?</td>
                <td className="p-3">No</td>
                <td className="p-3">Medium</td>
                <td className="p-3">High</td>
                <td className="p-3">No</td>
                <td className="p-3 pr-5">No</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="p-3 pl-5 text-slate-400 font-medium">Duration</td>
                <td className="p-3">~2h</td>
                <td className="p-3">~4h</td>
                <td className="p-3">~6h</td>
                <td className="p-3">~3h</td>
                <td className="p-3 pr-5">~4h</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="p-3 pl-5 text-slate-400 font-medium">Articles</td>
                <td className="p-3">6</td>
                <td className="p-3">7</td>
                <td className="p-3">8</td>
                <td className="p-3">8</td>
                <td className="p-3 pr-5">7</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="p-3 pl-5 text-slate-400 font-medium">Outcome</td>
                <td className="p-3">Make decisions</td>
                <td className="p-3">Run the stack</td>
                <td className="p-3">Build apps</td>
                <td className="p-3">Ensure compliance</td>
                <td className="p-3 pr-5">Understand the basics</td>
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
          All 5 Paths at a Glance
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
          Ready for the complete stack?
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          The P1 Playbook gives you tested configs, Grafana dashboards,
          n8n templates, and GDPR checklists for your local AI stack.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.ai-engineering.at/products"
            className="bg-[#4262FF] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Playbook P1 — EUR 49
          </a>
          <a
            href="https://www.ai-engineering.at/contact"
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Free consultation
          </a>
        </div>
      </div>
    </div>
  )
}
