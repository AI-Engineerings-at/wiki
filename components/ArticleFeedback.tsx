'use client'

import { useState } from 'react'

export function ArticleFeedback() {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null)

  if (voted) {
    return (
      <div className="mt-8 pt-6 border-t border-slate-800">
        <p className="text-sm text-slate-400">
          {voted === 'yes'
            ? 'Danke für dein Feedback! Freut uns, dass der Artikel geholfen hat.'
            : 'Danke für dein Feedback! Wir arbeiten daran, den Artikel zu verbessern.'}
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 pt-6 border-t border-slate-800">
      <p className="text-sm text-slate-400 mb-3">War dieser Artikel hilfreich?</p>
      <div className="flex gap-3">
        <button
          onClick={() => setVoted('yes')}
          className="px-4 py-2 text-sm bg-slate-800 hover:bg-green-900/50 border border-slate-700 hover:border-green-500/50 rounded-lg text-slate-300 hover:text-green-400 transition-colors"
        >
          Ja, hilfreich
        </button>
        <button
          onClick={() => setVoted('no')}
          className="px-4 py-2 text-sm bg-slate-800 hover:bg-red-900/50 border border-slate-700 hover:border-red-500/50 rounded-lg text-slate-300 hover:text-red-400 transition-colors"
        >
          Nein, nicht hilfreich
        </button>
      </div>
    </div>
  )
}
