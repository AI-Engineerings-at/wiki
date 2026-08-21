import type { Metadata } from 'next'
import { alternatesFor } from '../../../../lib/alternates'

/**
 * Die Seite selbst ist 'use client' (interaktiv) und kann kein `metadata`
 * exportieren — deshalb trägt dieses Layout Titel, Beschreibung, canonical
 * und hreflang (W7: 12 von 182 Seiten ohne eigenen Titel, Joes Augen Fund 22). Diese Seite leitet auf /grundlagen/lokal-vs-cloud weiter (Altlast, 4 von 154 Routen); der Titel sagt das ehrlich.
 */
export const metadata: Metadata = {
  title: 'Redirect: Local AI vs. Cloud',
  description: 'This address redirects to the article "Local AI vs. Cloud: the TCO comparison".',
  alternates: alternatesFor('/en/grundlagen/selfhosted-vs-cloud'),
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
