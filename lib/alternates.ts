/**
 * DE↔EN-Paartabelle — die einzige Wahrheit darüber, welche Seite ein
 * Pendant in der anderen Sprache hat.
 *
 * Warum es sie gibt: Sprachumschalter und EN-Startseite haben den Pfad
 * vorher mechanisch umgeschrieben (`/en` + Pfad bzw. Präfix abschneiden),
 * ohne zu prüfen, ob das Ziel existiert. Der BFS-Crawl über das gebaute
 * Wiki fand am 2026-08-21 dadurch 49 tote interne Pfade (54 nicht-200
 * minus 5 Crawler-Artefakte mit angehängtem Slash).
 *
 * Erhoben am 2026-08-21 aus dem app/-Baum:
 *   74 EN-Routen, 80 Nicht-EN-Routen (`find app -name page.tsx` → 154)
 *   74 Paare (64 namensgleich, 10 umbenannt)
 *   0 EN-Routen ohne DE-Pendant, 6 DE-Routen ohne EN-Pendant
 *
 * DE-Routen ohne EN-Pendant (6):
 *   /blog
 *   /blog/[slug]
 *   /compliance/ai-act-august-2026
 *   /compliance/edps-guidelines
 *   /compliance/verifywise-integration
 *   /de
 *
 * 2026-08-22 (W9 C): /grundlagen/ollama-vs-cloud und /grundlagen/selfhosted-vs-cloud
 * sind hier raus — die beiden Weiterleitungs-Attrappen wurden durch eine echte
 * 301 in public/_redirects ersetzt und die Routen aus app/ entfernt.
 *
 * Wer eine Route hinzufügt, ergänzt hier die Zeile. `npm run check:links`
 * prüft, dass beide Seiten jeder Zeile existieren.
 */

import { EXTRA_PAIRS } from './generated/index'

/** [DE-Pfad, EN-Pfad] — ohne abschließenden Schrägstrich. */
export const languagePairs: ReadonlyArray<readonly [string, string]> = [
  ['/', '/en'],
  ['/agb', '/en/terms'],
  ['/compliance', '/en/compliance'],
  ['/compliance/ai-agent-legal-framework', '/en/compliance/ai-agent-legal-framework'],
  ['/compliance/chatbot-transparenzpflichten', '/en/compliance/chatbot-transparenzpflichten'],
  ['/compliance/datenschutz-praxis', '/en/compliance/datenschutz-praxis'],
  ['/compliance/dpia', '/en/compliance/dpia'],
  ['/compliance/dsgvo-grundlagen', '/en/compliance/dsgvo-grundlagen'],
  ['/compliance/eu-ai-act', '/en/compliance/eu-ai-act'],
  ['/compliance/eu-ai-act-checkliste', '/en/compliance/eu-ai-act-checkliste'],
  ['/compliance/ki-kompetenz-art4', '/en/compliance/ki-kompetenz-art4'],
  ['/compliance/self-assessment', '/en/compliance/self-assessment'],
  ['/compliance/verbotene-ai-praktiken', '/en/compliance/verbotene-ai-praktiken'],
  ['/datenschutz', '/en/privacy'],
  ['/downloads', '/en/downloads'],
  ['/grundlagen', '/en/grundlagen'],
  ['/grundlagen/30-tage-quickstart', '/en/grundlagen/30-tage-quickstart'],
  ['/grundlagen/agent-rollen', '/en/grundlagen/agent-rollen'],
  ['/grundlagen/ai-agent-team', '/en/grundlagen/ai-agent-team'],
  ['/grundlagen/ai-kosten-vergleich', '/en/grundlagen/ai-kosten-vergleich'],
  ['/grundlagen/ki-unternehmen', '/en/grundlagen/ki-unternehmen'],
  ['/grundlagen/lokal-vs-cloud', '/en/grundlagen/lokal-vs-cloud'],
  ['/grundlagen/multi-agent-systeme', '/en/grundlagen/multi-agent-systeme'],
  ['/grundlagen/was-ist-agent-orchestration', '/en/grundlagen/was-ist-agent-orchestration'],
  ['/grundlagen/was-ist-ein-llm', '/en/grundlagen/was-ist-ein-llm'],
  ['/impressum', '/en/imprint'],
  ['/lernpfad', '/en/learning-path'],
  ['/oesterreich', '/en/austria'],
  ['/papers', '/en/papers'],
  ['/papers/attention-is-all-you-need', '/en/papers/attention-is-all-you-need'],
  ['/papers/constitutional-ai', '/en/papers/constitutional-ai'],
  ['/papers/hierarchical-reasoning', '/en/papers/hierarchical-reasoning'],
  ['/papers/lora-paper', '/en/papers/lora-paper'],
  ['/papers/rag-paper', '/en/papers/rag-paper'],
  ['/papers/react-paper', '/en/papers/react-paper'],
  ['/patterns', '/en/patterns'],
  ['/patterns/agent-orchestration-patterns', '/en/patterns/agent-orchestration-patterns'],
  ['/patterns/agent-skalierung', '/en/patterns/agent-skalierung'],
  ['/patterns/ai-agent-digitaler-mitarbeiter', '/en/patterns/ai-agent-digital-employee'],
  ['/patterns/evals-guardrails', '/en/patterns/evals-guardrails'],
  ['/patterns/heartbeat-monitoring', '/en/patterns/heartbeat-monitoring'],
  ['/patterns/human-in-the-loop', '/en/patterns/human-in-the-loop'],
  ['/patterns/memory-management', '/en/patterns/memory-management'],
  ['/patterns/safety-hooks', '/en/patterns/safety-hooks'],
  ['/patterns/self-improving-agents', '/en/patterns/self-improving-agents'],
  ['/patterns/task-delegation', '/en/patterns/task-delegation'],
  ['/security', '/en/security'],
  ['/security/api-keys-sicher', '/en/security/api-keys-sicher'],
  ['/security/backup-strategie', '/en/security/backup-strategie'],
  ['/security/firewall-setup', '/en/security/firewall-setup'],
  ['/security/self-hosted-sicherheit', '/en/security/self-hosted-sicherheit'],
  ['/security/verschluesselung', '/en/security/verschluesselung'],
  ['/support', '/en/support'],
  ['/support/troubleshooting', '/en/support/troubleshooting'],
  ['/tools', '/en/tools'],
  ['/tools/ai-os-setup', '/en/tools/ai-os-setup'],
  ['/tools/ai-stack-setup', '/en/tools/ai-stack-setup'],
  ['/tools/ai-tools-datenbank', '/en/tools/ai-tools-database'],
  ['/tools/cli-coding-agents-vergleich', '/en/tools/cli-coding-agents-comparison'],
  ['/tools/docker-grundlagen', '/en/tools/docker-grundlagen'],
  ['/tools/docker-vs-swarm', '/en/tools/docker-vs-swarm'],
  ['/tools/grafana-monitoring', '/en/tools/grafana-monitoring'],
  ['/tools/mattermost-agent', '/en/tools/mattermost-agent'],
  ['/tools/mcp-server', '/en/tools/mcp-server'],
  ['/tools/model-selection', '/en/tools/model-selection'],
  ['/tools/n8n-fuer-anfaenger', '/en/tools/n8n-fuer-anfaenger'],
  ['/tools/n8n-workflow-bundle', '/en/tools/n8n-workflow-bundle'],
  ['/tools/ollama-tutorial', '/en/tools/ollama-tutorial'],
  ['/tools/open-source-projekte', '/en/tools/open-source-projects'],
  ['/tools/proxmox-setup', '/en/tools/proxmox-setup'],
  ['/tools/rag-guide', '/en/tools/rag-guide'],
  ['/tools/vergleich-alternativen', '/en/tools/comparison-alternatives'],
]

/**
 * Alle Paare: TSX-Tabelle oben + EXTRA_PAIRS aus dem generierten Index
 * (Blog-Posts mit `pendant`, MDX-Artikel mit gleichem Slug in der
 * gespiegelten Kategorie, MDX-Kategorie-Seiten). scripts/build-index.js
 * nimmt nur Paare auf, deren beide Seiten als Datei existieren.
 */
export const allLanguagePairs: ReadonlyArray<readonly [string, string]> = [...languagePairs, ...EXTRA_PAIRS]

const deToEn = new Map(allLanguagePairs.map(([de, en]) => [de, en]))
const enToDe = new Map(allLanguagePairs.map(([de, en]) => [en, de]))

/**
 * Pfad ohne abschließenden Schrägstrich.
 *
 * Nötig, weil `trailingSlash: true` gesetzt ist: `usePathname()` liefert
 * `/en/austria/`, die Tabelle führt `/en/austria`. Genau diese Differenz
 * hat die alte Tabelle in SiteHeader wirkungslos gemacht — sie war richtig
 * befüllt und wurde nie getroffen.
 */
export function normalizePath(pathname: string): string {
  const clean = pathname.split('#')[0].split('?')[0]
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1)
  return clean === '' ? '/' : clean
}

export function isEnglishPath(pathname: string): boolean {
  const p = normalizePath(pathname)
  return p === '/en' || p.startsWith('/en/')
}

/**
 * Das Pendant in der anderen Sprache — oder `null`, wenn es keines gibt.
 * Gibt nie einen Pfad zurück, der nicht als Route existiert.
 */
export function alternatePath(pathname: string): string | null {
  const p = normalizePath(pathname)
  return (isEnglishPath(p) ? enToDe.get(p) : deToEn.get(p)) ?? null
}

/**
 * Ziel des Sprachumschalters — oder `null`, wenn es kein Pendant gibt.
 *
 * Bis 2026-08-21 ging es ohne Pendant auf die Startseite der Zielsprache;
 * gemessen: 30 von 30 Blog-Seiten landeten auf /en/ (Joes Augen, Fund 15).
 * Jetzt zeigt der Umschalter ohne Pendant nichts vor: der Knopf ist sichtbar
 * deaktiviert mit dem Hinweis „nur auf Deutsch"/„only in English".
 */
export function switchLanguageHref(pathname: string): string | null {
  return alternatePath(pathname)
}

/** Hat diese Seite ein Pendant in der anderen Sprache? */
export function hasAlternate(pathname: string): boolean {
  return alternatePath(pathname) !== null
}

/** Muss zu `metadataBase` in app/layout.tsx passen. */
const BASE_URL = 'https://wiki.ai-engineering.at'

/** Absolute URL mit abschließendem Schrägstrich — `trailingSlash: true`. */
function absoluteUrl(pathname: string): string {
  const p = normalizePath(pathname)
  return p === '/' ? `${BASE_URL}/` : `${BASE_URL}${p}/`
}

/**
 * `alternates`-Block für das `metadata`-Objekt einer Seite: `canonical`
 * immer, `languages` nur bei echtem Pendant.
 *
 * Befund davor (Stufe 1 §6): 5 von 154 Seiten trugen ein `canonical`,
 * 0 ein `hreflang`. Ein hreflang auf eine Seite, die es nicht gibt, wäre
 * schlimmer als keines — deshalb kommt `languages` aus der Paartabelle
 * oben und nicht aus einer Pfadregel.
 *
 * `x-default` zeigt auf die deutsche Fassung: das Wiki ist deutschsprachig,
 * die EN-Seiten sind die Übersetzung.
 */
export function alternatesFor(pathname: string): {
  canonical: string
  languages?: Record<string, string>
} {
  const p = normalizePath(pathname)
  const canonical = absoluteUrl(p)
  const other = alternatePath(p)
  if (!other) return { canonical }

  const dePath = isEnglishPath(p) ? other : p
  const enPath = isEnglishPath(p) ? p : other
  return {
    canonical,
    languages: {
      de: absoluteUrl(dePath),
      en: absoluteUrl(enPath),
      'x-default': absoluteUrl(dePath),
    },
  }
}
