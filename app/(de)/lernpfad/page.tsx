import type { Metadata } from 'next'
import { LernpfadSeite } from '../../../components/LernpfadSeite'
import { alternatesFor } from '../../../lib/alternates'
import { kopfzeile } from '../../../lib/lernpfad'

export const metadata: Metadata = {
  title: 'Lernpfad',
  description: `Vom ersten Satz über Sprachmodelle bis zum eigenen Stack — ${kopfzeile('de')}. Endet im Hub.`,
  alternates: alternatesFor('/lernpfad'),
}

export default function LernpfadPage() {
  return <LernpfadSeite lang="de" />
}
