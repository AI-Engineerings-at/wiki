'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="text-center max-w-md px-4">
        <h1 className="text-2xl font-bold text-white mb-4">
          Etwas ist schiefgelaufen
        </h1>
        <p className="text-slate-400 mb-6">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut oder
          gehe zur Startseite.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-2 px-6 rounded-full transition-all"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-full transition-all"
          >
            Startseite
          </Link>
        </div>
      </div>
    </div>
  )
}
