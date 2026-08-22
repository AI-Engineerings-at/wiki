'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { isEnglishPath } from '../lib/alternates'

export function ArticleFeedback() {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null)
  const isEn = isEnglishPath(usePathname() || '/')
  const t = isEn
    ? { q: 'Was this article helpful?', yes: 'Yes, helpful', no: 'No, not helpful',
        thanksYes: 'Thanks for your feedback! Glad the article helped.',
        thanksNo: 'Thanks for your feedback! We are working on improving the article.' }
    : { q: 'War dieser Artikel hilfreich?', yes: 'Ja, hilfreich', no: 'Nein, nicht hilfreich',
        thanksYes: 'Danke für dein Feedback! Freut uns, dass der Artikel geholfen hat.',
        thanksNo: 'Danke für dein Feedback! Wir arbeiten daran, den Artikel zu verbessern.' }

  if (voted) {
    return (
      <div className="mt-8 pt-6 border-t border-slate-800">
        <p className="text-sm text-slate-400">{voted === 'yes' ? t.thanksYes : t.thanksNo}</p>
      </div>
    )
  }

  return (
    <div className="mt-8 pt-6 border-t border-slate-800">
      <p className="text-sm text-slate-400 mb-3">{t.q}</p>
      <div className="flex gap-3">
        <button
          onClick={() => setVoted('yes')}
          className="px-4 py-2 text-sm bg-slate-800 hover:bg-green-900/50 border border-slate-700 hover:border-green-500/50 rounded-lg text-slate-300 hover:text-green-400 transition-colors"
        >
          {t.yes}
        </button>
        <button
          onClick={() => setVoted('no')}
          className="px-4 py-2 text-sm bg-slate-800 hover:bg-red-900/50 border border-slate-700 hover:border-red-500/50 rounded-lg text-slate-300 hover:text-red-400 transition-colors"
        >
          {t.no}
        </button>
      </div>
    </div>
  )
}
