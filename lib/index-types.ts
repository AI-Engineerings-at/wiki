/** Ein Eintrag des Gesamtindex — TSX-Seite, MDX-Artikel oder Blog-Post. */
export type IndexSource = 'tsx' | 'mdx' | 'blog'

export type IndexEntry = {
  title: string
  description: string
  href: string
  lang: 'de' | 'en'
  category: string
  categoryLabel: string
  date: string
  source: IndexSource
  tags: string[]
  /** Wortzahl des Quelltexts (MDX/Blog); 0 bei TSX. */
  words: number
  /** Hero-Bild (Frontmatter `image:` oder Registry-Thumbnail), leer wenn keins. */
  image: string
  /** Quelldatei relativ zum Repo (MDX/Blog); leer bei TSX. */
  file: string
}

/** Eine Einheit des Lernpfads (content/lernpfad.yaml). */
export type LernpfadEinheit = {
  slug: string
  abschnitt: string
  position: number
  route_de: string
  route_en: string
  en_luecke?: string
  extern_geprueft?: string
  minuten: number
  minuten_quelle: string
  woerter: number
  lernziel_de: string
  lernziel_en: string
  voraussetzungen: string[]
  nachfolger: string[]
}

export type Lernpfad = {
  pfad: string
  titel_de: string
  titel_en: string
  einheiten_gesamt: number
  minuten_gesamt: number
  kopfzeile_de: string
  kopfzeile_en: string
  abschnitte: { id: string; titel_de: string; titel_en: string }[]
  einheiten: LernpfadEinheit[]
}
