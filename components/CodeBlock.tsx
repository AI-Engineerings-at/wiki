import type { ReactNode } from 'react'

/**
 * Hülle um ein <pre> in TSX-Seiten: Kopier-Knopf im statischen HTML
 * (W7 — 192 Code-Blöcke in app/**, vorher 0 Kopier-Knöpfe). Klick-Logik
 * in components/CopyDelegate.tsx (ein Horcher, kein Handler je Knopf).
 */
export function CodeBlock({ children, lang = 'de' }: { children: ReactNode; lang?: 'de' | 'en' }) {
  const label = lang === 'en' ? 'Copy' : 'Kopieren'
  return (
    <div className="code-wrap">
      <button type="button" className="copy-btn" data-copy="1" aria-label={label}>{label}</button>
      {children}
    </div>
  )
}
