import { lesezeitMinuten } from '../lib/lesezeit'

/**
 * Lesezeit in der Brotkrumen-Zeile.
 *
 * Bis 2026-08-22 zaehlte diese Komponente nach der Hydration selbst die Woerter
 * im DOM (`document.querySelector('main').textContent`) und teilte durch 200 —
 * eine zweite Formel neben der in components/MdxArticleView.tsx. Auf derselben
 * Seite standen dadurch zwei Zahlen. Jetzt kommt die Wortzahl aus dem Index und
 * die Formel aus lib/lesezeit.ts; ohne bekannte Wortzahl wird nichts angezeigt.
 */
export function ReadingTime({ words }: { words: number }) {
  const minuten = lesezeitMinuten(words)
  if (minuten === 0) return null

  return (
    <span className="text-xs text-slate-500" data-lesezeit={minuten}>
      ~{minuten} min
    </span>
  )
}
