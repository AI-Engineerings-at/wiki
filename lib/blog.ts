import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  author: string
  /** 'de' (Standard) oder 'en' — Frontmatter `lang`. EN-Posts liegen unter /en/blog/. */
  lang: 'de' | 'en'
  /** Slug des Pendants in der anderen Sprache (Frontmatter `pendant`), leer wenn keins. */
  pendant: string
  content: string
}

export interface BlogPostWithHtml extends BlogPost {
  html: string
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

export function getAllBlogPosts(lang?: 'de' | 'en'): BlogPost[] {
  const slugs = getAllBlogSlugs()
  const posts = slugs.map((slug) => getBlogPostBySlug(slug)).filter((p) => !lang || p.lang === lang)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getBlogPostBySlug(slug: string): BlogPost {
  let filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  }
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    summary: data.summary || '',
    tags: data.tags || [],
    author: data.author || '',
    lang: data.lang === 'en' ? 'en' : 'de',
    pendant: data.pendant ? String(data.pendant) : '',
    content,
  }
}

export async function renderMarkdown(markdown: string, lang: 'de' | 'en' = 'de'): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)

  let html = String(result)
  // W7: Tabellen scrollbar, Code-Blöcke mit Kopier-Knopf (Klick: components/CopyDelegate.tsx)
  const label = lang === 'en' ? 'Copy' : 'Kopieren'
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
  html = html
    .replace(/<pre>/g, `<div class="code-wrap"><button type="button" class="copy-btn" data-copy="1" aria-label="${label}">${label}</button><pre>`)
    .replace(/<\/pre>/g, '</pre></div>')
  return html
}
