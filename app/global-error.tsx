'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="de">
      <body className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold mb-4">Etwas ist schiefgelaufen</h1>
          <p className="text-slate-400 mb-6">
            Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
          </p>
          <button
            onClick={() => reset()}
            className="bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-2 px-6 rounded-full transition-all"
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  )
}
