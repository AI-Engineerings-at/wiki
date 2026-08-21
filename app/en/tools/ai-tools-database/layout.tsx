import type { Metadata } from 'next'
import { alternatesFor } from '../../../../lib/alternates'

/**
 * Die Seite selbst ist 'use client' (interaktiv) und kann kein `metadata`
 * exportieren — deshalb trägt dieses Layout Titel, Beschreibung, canonical
 * und hreflang (W7: 12 von 182 Seiten ohne eigenen Titel, Joes Augen Fund 22).
 */
export const metadata: Metadata = {
  title: 'AI Tools Database',
  description: 'Curated collection of tools for local AI infrastructure: LLM runtimes, chat interfaces, RAG, agents, monitoring and more.',
  alternates: alternatesFor('/en/tools/ai-tools-database'),
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
