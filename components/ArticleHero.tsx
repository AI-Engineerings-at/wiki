/**
 * Hero-Motiv einer Artikelseite (E44, W8b).
 *
 * Ein Bild je Artikel unter /images/hero-2026-08/<lang>/<kategorie>/<slug>.webp,
 * 1344x768 (scripts/bilder/comfy-hero.py). `alt` ist der Artikeltitel — die Motive
 * sind abstrakt und tragen keine eigene Information, deshalb beschreibt der Titel
 * sie besser als eine Bildbeschreibung.
 *
 * Kein next/image: der Export ist statisch (output: 'export'), der Optimizer
 * damit aus; ein <img> mit width/height reserviert den Platz und verhindert den
 * Layout-Sprung. `priority` = erstes Bild der Seite (eager), sonst lazy.
 *
 * `data-hero="1"` ist der Messpunkt fuer Pruefung [19] in scripts/ci/render-gate.py.
 */
export function ArticleHero({ src, alt, priority = true }: { src: string; alt: string; priority?: boolean }) {
  if (!src) return null
  return (
    <figure className="mb-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1344}
        height={768}
        data-hero="1"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full rounded-2xl border border-slate-800"
      />
    </figure>
  )
}
