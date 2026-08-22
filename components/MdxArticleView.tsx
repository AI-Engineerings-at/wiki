import { ArticleHero } from './ArticleHero'
import { WikiLink as Link } from './WikiLink'
import type { MdxArticle } from '../lib/content'
import { lesezeitMinuten } from '../lib/lesezeit'

/**
 * Seitenkopf + Rumpf eines MDX-Artikels (E43).
 *
 * Die Wissensklassen-Zeile ist Pflicht und sichtbar (E28, NN3): diese Texte
 * sind im März 2026 generiert und redaktionell nicht geprüft — das steht
 * über dem Artikel, nicht im Impressum. Der Leser soll es sehen, bevor er
 * liest.
 */
export function MdxArticleView({ article, html }: { article: MdxArticle; html: string }) {
  const en = article.lang === 'en'
  const catHref = (en ? '/en' : '') + '/' + article.category
  const stand = article.stand || (en ? 'unknown' : 'unbekannt')
  const klasse = en
    ? `Generated · as of ${stand} · not editorially reviewed`
    : `Generiert · Stand ${stand} · redaktionell nicht geprüft`
  const minutes = lesezeitMinuten(article.words)
  const heroSrc = article.image || ''

  return (
    <article className="max-w-4xl">
      <header className="mb-8">
        <div className="text-xs text-slate-500 mb-2">
          <Link href={catHref} className="hover:text-blue-400">{article.categoryLabel}</Link>
          {article.date && <span> · {article.date}</span>}
          {minutes > 0 && <span data-lesezeit={minutes}> · ~{minutes} min</span>}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">{article.title}</h1>
        {article.description && (
          <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-2xl">{article.description}</p>
        )}
        <p
          className="mt-5 inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300"
          data-wissensklasse="generiert"
        >
          <span aria-hidden="true">⚠</span> {klasse}
        </p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((t) => (
              <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{t}</span>
            ))}
          </div>
        )}
      </header>

      {heroSrc && <ArticleHero src={heroSrc} alt={article.title} />}

      {/* Inhalt aus content/<lang>/<kategorie>/<slug>.mdx — Repo-Inhalt, kein Nutzer-Input;
          rohes HTML aus dem Markdown wird beim Rendern verworfen (lib/content.ts). */}
      <div className="article-body prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
