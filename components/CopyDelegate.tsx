'use client'

import { useEffect } from 'react'

/**
 * Ein Klick-Horcher für alle Kopier-Knöpfe der Seite (W7).
 *
 * Die Knöpfe stehen als `<button data-copy>` im statischen HTML — in
 * Markdown-HTML (lib/content.ts, lib/blog.ts) und in TSX-Seiten
 * (components/CodeBlock.tsx) —, damit das Render-Gate sie zählen kann:
 * Kopier-Knöpfe = Code-Blöcke. Kopiert wird `textContent` des Nachbar-<pre>,
 * nie innerHTML; nichts aus dem Inhalt wird als HTML interpretiert.
 */
export function CopyDelegate() {
  useEffect(() => {
    function onClick(ev: MouseEvent) {
      const target = ev.target as HTMLElement | null
      const btn = target?.closest?.('button[data-copy]') as HTMLButtonElement | null
      if (!btn) return
      const pre = btn.parentElement?.querySelector('pre')
      const text = pre?.textContent ?? ''
      if (!text || !navigator.clipboard) return
      const label = btn.textContent
      navigator.clipboard.writeText(text).then(
        () => {
          btn.textContent = btn.getAttribute('data-done') || (document.documentElement.lang === 'en' ? 'Copied' : 'Kopiert')
          window.setTimeout(() => { btn.textContent = label }, 1500)
        },
        () => { /* Zwischenablage verweigert: Knopf bleibt, kein Fehlerdialog */ }
      )
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
