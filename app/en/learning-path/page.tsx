import type { Metadata } from 'next'
import { LernpfadSeite } from '../../../components/LernpfadSeite'
import { alternatesFor } from '../../../lib/alternates'
import { kopfzeile } from '../../../lib/lernpfad'

export const metadata: Metadata = {
  title: 'Learning Path',
  description: `From your first sentence about language models to your own stack — ${kopfzeile('en')}. Ends in the Hub.`,
  alternates: alternatesFor('/en/learning-path'),
}

export default function LearningPathPage() {
  return <LernpfadSeite lang="en" />
}
