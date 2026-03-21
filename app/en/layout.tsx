import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'AI Engineering Wiki — Agentic Engineering Knowledge Base',
    template: '%s | AI Engineering Wiki',
  },
  description:
    'The knowledge base for Agentic Engineering, Agent Orchestration, Multi-Agent Systems and GDPR-compliant AI stacks.',
  openGraph: {
    locale: 'en_US',
  },
}

export default function EnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div lang="en">{children}</div>
}
