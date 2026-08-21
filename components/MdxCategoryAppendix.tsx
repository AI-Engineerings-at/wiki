import { CategoryList } from './CategoryList'
import { mdxEntries } from '../lib/content'

/**
 * Anhang für die Registry-Kategorieseiten (grundlagen, compliance, tools,
 * patterns, security, papers — DE und EN): die generierten MDX-Artikel
 * derselben Kategorie aus dem Gesamtindex. Vorher waren sie nur über die
 * Seitenleiste erreichbar. Server-Komponente.
 */
export function MdxCategoryAppendix({ category, lang }: { category: string; lang: 'de' | 'en' }) {
  const entries = mdxEntries(lang)
    .filter((e) => e.category === category)
    .sort((a, b) => a.title.localeCompare(b.title))
  if (entries.length === 0) return null
  const en = lang === 'en'
  return (
    <section className="pt-8 border-t border-slate-800" aria-labelledby="mdx-appendix">
      <h2 id="mdx-appendix" className="text-xl font-bold text-white mb-2">
        {en ? `${entries.length} more articles (generated)` : `${entries.length} weitere Artikel (generiert)`}
      </h2>
      <p className="text-sm text-slate-400 mb-6">
        {en
          ? 'Generated in March 2026, not editorially reviewed — every article says so in its header.'
          : 'Generiert im März 2026, redaktionell nicht geprüft — jeder Artikel sagt das in seinem Kopf.'}
      </p>
      <CategoryList entries={entries} lang={lang} />
    </section>
  )
}
