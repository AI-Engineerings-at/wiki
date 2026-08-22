import { BlogIndexPage } from '../../../components/BlogIndexPage'
import { alternatesFor } from '../../../lib/alternates'

export const metadata = {
  alternates: alternatesFor('/blog'),
  title: 'Blog',
  description:
    'Praxis-Artikel zu lokalem AI-Stack, Automation, DSGVO-Compliance und Agent Orchestration.',
}

export default function BlogIndex() {
  return <BlogIndexPage lang="de" />
}
