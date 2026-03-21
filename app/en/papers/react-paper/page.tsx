import { Metadata } from "next"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "ReAct: Reasoning and Acting Explained | AI Engineering Wiki",
  description:
    "The ReAct paper by Yao et al. (2022) explained: How LLMs become capable agents by alternating between thinking and acting.",
}

export default function ReActPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          ReAct: Synergizing Reasoning and Acting in Language Models
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Yao et al., 2022 — The paper that shows how LLMs solve complex tasks by
          alternating between thinking and acting.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 10 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        {/* Summary */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5 my-6">
          <div className="font-bold text-white mb-2">At a Glance</div>
          <div className="text-white/70 text-sm leading-relaxed">
            <p>
              ReAct (Reasoning + Acting) is a prompting pattern where an LLM alternates
              between thinking (reasoning) and doing (acting). Instead of just generating
              text, the model can call tools, interpret results, and adapt its approach.
              ReAct is the foundation for most current AI agent frameworks.
            </p>
          </div>
        </div>

        {/* The Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Problem: Thinking Alone Isn&apos;t Enough
          </h2>
          <p className="text-white/70 leading-relaxed">
            Chain-of-Thought (CoT) prompting showed that LLMs improve when they write out
            their reasoning step by step. But pure thinking has limits: The model cannot
            access current information, perform calculations, or query external systems.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Conversely, there are systems that let LLMs use tools (acting), but without
            explicit reasoning. These often act blindly — without a plan, error analysis,
            or strategy adjustment.
          </p>
        </section>

        {/* The ReAct Idea */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The ReAct Idea: Thinking AND Acting
          </h2>
          <p className="text-white/70 leading-relaxed">
            ReAct combines both in an alternating loop:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Thought:</strong> The model thinks — analyzes
              the current situation, plans the next step, interprets previous results.
            </li>
            <li>
              <strong className="text-white">Action:</strong> The model executes a concrete
              action — e.g., a web search, calculation, or API call.
            </li>
            <li>
              <strong className="text-white">Observation:</strong> The result of the action
              is returned to the model. It serves as input for the next thought.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            This cycle repeats until the task is solved.
          </p>
        </section>

        {/* Example */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            ReAct in Action: An Example
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Question: &quot;In what year was the capital of the country where the
            Transformer was invented founded?&quot;
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4 font-mono text-xs text-white/80 space-y-3">
            <div>
              <span className="text-blue-400">Thought 1:</span> I need to find out where
              the Transformer was invented. The paper came from Google Brain/Google Research.
            </div>
            <div>
              <span className="text-green-400">Action 1:</span> Search[&quot;Attention Is All You Need
              paper authors location&quot;]
            </div>
            <div>
              <span className="text-yellow-400">Observation 1:</span> The paper was authored by
              researchers at Google in Mountain View, USA, and the University of Toronto.
            </div>
            <div>
              <span className="text-blue-400">Thought 2:</span> The authors were at Google in
              the USA. The capital of the USA is Washington, D.C. I need to find the
              founding year.
            </div>
            <div>
              <span className="text-green-400">Action 2:</span> Search[&quot;Washington D.C.
              founding year&quot;]
            </div>
            <div>
              <span className="text-yellow-400">Observation 2:</span> Washington, D.C. was
              founded on July 16, 1790.
            </div>
            <div>
              <span className="text-blue-400">Thought 3:</span> I have the answer: 1790.
            </div>
            <div>
              <span className="text-purple-400">Answer:</span> 1790
            </div>
          </div>
        </section>

        {/* Why ReAct Works */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why ReAct Works Better
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Transparency:</strong> The thought steps make
              the reasoning process traceable. You can see why the model chose a
              particular action.
            </li>
            <li>
              <strong className="text-white">Error correction:</strong> When an action
              returns an unexpected result, the model can adjust its approach instead
              of stubbornly sticking to a wrong strategy.
            </li>
            <li>
              <strong className="text-white">Grounding:</strong> Through actions (search,
              computation), answers are based on real data rather than hallucinations.
            </li>
            <li>
              <strong className="text-white">Flexibility:</strong> The pattern works with
              any tools — web search, databases, APIs, code execution.
            </li>
          </ul>
        </section>

        {/* ReAct in Today's Frameworks */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            ReAct in Today&apos;s Agent Frameworks
          </h2>
          <p className="text-white/70 leading-relaxed">
            ReAct is the basis of virtually all AI agent frameworks today:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li><strong className="text-white">LangChain Agents:</strong> Implement the ReAct loop as the default agent type</li>
            <li><strong className="text-white">Claude Tool Use:</strong> Anthropic&apos;s function calling follows the Thought-Action-Observation pattern</li>
            <li><strong className="text-white">AutoGPT / CrewAI:</strong> Multi-agent systems where each agent internally uses ReAct</li>
            <li><strong className="text-white">Claude Code:</strong> Also uses the ReAct pattern for code analysis and generation</li>
          </ul>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Yao, S. et al. (2022). &quot;ReAct: Synergizing Reasoning and Acting in Language Models.&quot;{" "}
              <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:2210.03629
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
