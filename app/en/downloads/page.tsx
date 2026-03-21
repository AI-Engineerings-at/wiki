export const metadata = {
  title: 'Downloads | AI Engineering Wiki',
  description:
    'Free templates for AI compliance, documentation and operations: templates, checklists and guides.',
}

export default function DownloadsPage() {
  const downloads = [
    {
      title: 'AI Policy Template',
      description:
        'Template for an internal AI policy — roles, obligations, training documentation per Art. 4 AI Competence.',
      href: '/en/compliance/ki-kompetenz-art4',
      category: 'Compliance',
    },
    {
      title: 'DPIA Template',
      description:
        'Data Protection Impact Assessment for AI systems — step-by-step guide with sample documentation.',
      href: '/en/compliance/dpia',
      category: 'Compliance',
    },
    {
      title: 'Art. 30 ROPA (AI Edition)',
      description:
        'Record of Processing Activities, extended with AI-specific fields like model type, training data and risk class.',
      href: '/en/compliance/dsgvo-grundlagen',
      category: 'Compliance',
    },
    {
      title: 'EU AI Act Checklist',
      description:
        '7-step guide to EU AI Act readiness — determine risk classes, check deadlines, implement obligations.',
      href: '/en/compliance/eu-ai-act-checkliste',
      category: 'Compliance',
    },
    {
      title: 'Tool Inventory Template',
      description:
        'Catalog of all AI tools used in the organization — provider, risk class, purpose, responsible person.',
      href: '/en/compliance/eu-ai-act',
      category: 'Compliance',
    },
    {
      title: 'Agent Onboarding Checklist',
      description:
        'Checklist for onboarding AI agents as digital employees — credentials, network, monitoring.',
      href: '/en/patterns/ai-agent-digital-employee',
      category: 'Patterns',
    },
    {
      title: 'Backup Strategy Template',
      description:
        '3-2-1 rule, automated backups for Ollama, n8n, PostgreSQL — template for backup documentation.',
      href: '/en/security/backup-strategie',
      category: 'Security',
    },
    {
      title: '30-Day Quickstart Plan',
      description:
        'Day-by-day guide to building your own AI stack — from hardware to your first agent.',
      href: '/en/grundlagen/30-tage-quickstart',
      category: 'Basics',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Downloads — Templates &amp; Checklists for AI in Business
        </h1>
        <p className="text-slate-400 mt-2">
          Free templates for AI compliance, documentation and operations.
          Each download links to the wiki article containing the full template.
        </p>
      </div>

      <div className="space-y-4">
        {downloads.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h2>
                <p className="text-slate-400 text-sm mt-1">{item.description}</p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap ml-4 bg-slate-800 px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
