import type { Metadata } from 'next'
import { alternatesFor } from '../../../../lib/alternates'

/**
 * Die Seite selbst ist 'use client' (interaktiv) und kann kein `metadata`
 * exportieren — deshalb trägt dieses Layout Titel, Beschreibung, canonical
 * und hreflang (W7: 12 von 182 Seiten ohne eigenen Titel, Joes Augen Fund 22).
 */
export const metadata: Metadata = {
  openGraph: {
    type: 'article',
    images: [{ url: '/images/hero-2026-08/en/compliance/self-assessment.webp', width: 1344, height: 768, type: 'image/webp' }],
  },
  title: 'EU AI Act Readiness Check',
  description: 'Interactive 10-question self-assessment: how prepared is your company for the EU AI Act?',
  alternates: alternatesFor('/en/compliance/self-assessment'),
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
