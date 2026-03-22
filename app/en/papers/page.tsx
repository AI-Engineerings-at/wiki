export const metadata = {
  title: 'AI Papers | AI Engineering Wiki',
  description:
    'The most important papers on LLMs, RAG, Agents and AI Safety — summarized and explained in plain language.',
  openGraph: {
    images: [{ url: '/images/og/og-papers.png', width: 1200, height: 630, alt: 'AI Engineering Wiki — Papers' }],
  },
}

export default function PapersPage() {
  const articles = [
    {
      title: 'Attention Is All You Need (2017)',
      description: 'The Transformer paper: Why Self-Attention changed the entire AI landscape.',
      href: '/en/papers/attention-is-all-you-need',
      date: '2026-03-21',
    },
    {
      title: 'Retrieval-Augmented Generation (2020)',
      description: 'RAG explained: How LLMs become better and more reliable through external knowledge sources.',
      href: '/en/papers/rag-paper',
      date: '2026-03-21',
    },
    {
      title: 'LoRA: Low-Rank Adaptation (2021)',
      description: 'Parameter-efficient fine-tuning: Adapting large models without retraining everything.',
      href: '/en/papers/lora-paper',
      date: '2026-03-21',
    },
    {
      title: 'ReAct: Reasoning and Acting (2022)',
      description: 'The ReAct agent pattern: How LLMs solve tasks by alternating between thinking and acting.',
      href: '/en/papers/react-paper',
      date: '2026-03-21',
    },
    {
      title: 'Constitutional AI (2022)',
      description: 'AI Safety by Anthropic: How to align AI systems through principles instead of human feedback alone.',
      href: '/en/papers/constitutional-ai',
      date: '2026-03-21',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Papers — Key Research Made Accessible</h1>
        <p className="text-slate-400 mt-2">
          The most important papers on LLMs, RAG, Agents and AI Safety — summarized and explained.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-papers-research-v2.png" alt="AI Research Papers" className="rounded-xl border border-white/10 w-full" />
      </figure>

      <div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.href}
            href={article.href}
            className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-400 text-sm mt-1">{article.description}</p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{article.date}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
