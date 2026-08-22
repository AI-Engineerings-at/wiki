import { BlogIndexPage } from '../../../components/BlogIndexPage'
import { alternatesFor } from '../../../lib/alternates'

export const metadata = {
  alternates: alternatesFor('/en/blog'),
  title: 'Blog',
  description:
    'Hands-on articles on the local AI stack, automation, GDPR compliance and agent orchestration.',
}

export default function BlogIndexEn() {
  return <BlogIndexPage lang="en" />
}
