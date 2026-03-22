export const metadata = {
  title: 'AI Papers | AI Engineering Wiki',
  description:
    'Die wichtigsten Papers zu LLMs, RAG, Agents und AI Safety — auf Deutsch zusammengefasst und verständlich erklärt.',
}

export default function PapersPage() {
  const articles = [
    {
      title: 'Attention Is All You Need (2017)',
      description: 'Das Transformer-Paper: Warum Self-Attention die gesamte AI-Landschaft verändert hat.',
      href: '/papers/attention-is-all-you-need',
      date: '2026-03-21',
    },
    {
      title: 'Retrieval-Augmented Generation (2020)',
      description: 'RAG erklärt: Wie LLMs durch externe Wissensquellen besser und zuverlässiger werden.',
      href: '/papers/rag-paper',
      date: '2026-03-21',
    },
    {
      title: 'LoRA: Low-Rank Adaptation (2021)',
      description: 'Parameter-effizientes Fine-Tuning: Große Modelle anpassen ohne alles neu zu trainieren.',
      href: '/papers/lora-paper',
      date: '2026-03-21',
    },
    {
      title: 'ReAct: Reasoning and Acting (2022)',
      description: 'Das Agent-Pattern ReAct: Wie LLMs durch abwechselndes Denken und Handeln Aufgaben lösen.',
      href: '/papers/react-paper',
      date: '2026-03-21',
    },
    {
      title: 'Constitutional AI (2022)',
      description: 'AI Safety von Anthropic: Wie man AI-Systeme durch Prinzipien statt durch Menschen aligned.',
      href: '/papers/constitutional-ai',
      date: '2026-03-21',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Papers — Wichtige Forschung verständlich erklärt</h1>
        <p className="text-slate-400 mt-2">
          Die wichtigsten Papers zu LLMs, RAG, Agents und AI Safety — auf Deutsch zusammengefasst.
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
