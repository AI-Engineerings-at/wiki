import { Metadata } from "next"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Constitutional AI Explained | AI Engineering Wiki",
  description:
    "The Constitutional AI paper by Bai et al. (2022, Anthropic) explained: How to align AI systems through principles instead of human feedback alone.",
}

export default function ConstitutionalAIPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Constitutional AI: Harmlessness from AI Feedback
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Bai et al., 2022 (Anthropic) — How to make AI systems safe and helpful
          by giving them principles instead of relying solely on human feedback.
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
              Constitutional AI (CAI) is Anthropic&apos;s approach to AI safety. Instead
              of relying exclusively on human feedback (RLHF), the model receives a
              &quot;constitution&quot; — a set of principles like &quot;Be helpful, harmless, and
              honest.&quot; The model then learns to align its responses to these principles.
              This reduces the need for human annotation and makes the alignment process
              more transparent.
            </p>
          </div>
        </div>

        {/* The Problem with RLHF */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Problem: RLHF Alone Isn&apos;t Enough
          </h2>
          <p className="text-white/70 leading-relaxed">
            Reinforcement Learning from Human Feedback (RLHF) was the first successful
            approach to making LLMs &quot;aligned&quot; — helpful and safe. Human annotators rate
            model outputs, and the model is trained to get better ratings.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            But RLHF has weaknesses:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">Scaling:</strong> Human annotation is expensive
              and slow. Every new capability requires thousands of rated examples.
            </li>
            <li>
              <strong className="text-white">Inconsistency:</strong> Different annotators
              rate differently. There is no uniform standard for &quot;helpful&quot; or &quot;harmless.&quot;
            </li>
            <li>
              <strong className="text-white">Opacity:</strong> It is unclear what rules
              the model has actually learned. The criteria are implicit in the rating data.
            </li>
          </ul>
        </section>

        {/* The CAI Method */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The CAI Method: Principles Instead of Just Feedback
          </h2>
          <p className="text-white/70 leading-relaxed">
            Constitutional AI solves these problems in two phases:
          </p>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">
            Phase 1: Supervised Self-Critique (SL-CAI)
          </h3>
          <ul className="text-white/70 mt-2 space-y-3">
            <li>
              <strong className="text-white">Step 1:</strong> The model generates a
              response to a potentially problematic question.
            </li>
            <li>
              <strong className="text-white">Step 2:</strong> The model is asked to
              critique its own response against the constitutional principles
              (self-critique). E.g.: &quot;Identify whether this response could harm someone.&quot;
            </li>
            <li>
              <strong className="text-white">Step 3:</strong> The model revises its
              response based on the critique (revision).
            </li>
            <li>
              <strong className="text-white">Step 4:</strong> The revised response is
              used as a training data point.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">
            Phase 2: RL from AI Feedback (RLAIF)
          </h3>
          <p className="text-white/70 leading-relaxed">
            In the second phase, a reward model is trained — but instead of human ratings,
            it is trained with AI-generated ratings. The model compares response pairs and
            selects the better one based on the constitutional principles. This AI feedback
            model is then used for RLHF.
          </p>
        </section>

        {/* The Constitution */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            What&apos;s in the Constitution?
          </h2>
          <p className="text-white/70 leading-relaxed">
            The &quot;constitution&quot; consists of explicit principles that serve as guidelines
            for the model. Examples from the paper:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>&quot;Choose the response that is least likely to be viewed as harmful or unethical.&quot;</li>
            <li>&quot;Choose the response that seems most wise, ethical, and morally sound.&quot;</li>
            <li>&quot;Choose the response that does not support discrimination.&quot;</li>
            <li>&quot;Choose the response that best reflects the values of a good AI assistant.&quot;</li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            The key advantage: These principles are explicit, traceable, and modifiable.
            They can be adapted, extended, or specialized for different use cases.
          </p>
        </section>

        {/* Why CAI Matters */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why Constitutional AI Matters
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Transparency:</strong> The rules are
              explicitly formulated and can be audited. It is clear why the model
              prefers certain responses.
            </li>
            <li>
              <strong className="text-white">Scalability:</strong> AI feedback is cheaper
              and faster than human feedback. The model can train itself on millions of
              examples.
            </li>
            <li>
              <strong className="text-white">Less evasive:</strong> Models with CAI are
              typically more helpful than purely RLHF-trained models because they don&apos;t
              learn to respond to everything with &quot;I can&apos;t answer that.&quot;
            </li>
            <li>
              <strong className="text-white">Iterable:</strong> The constitution can be
              updated without repeating the entire training. New principles can be tested
              and evaluated.
            </li>
          </ul>
        </section>

        {/* Relevance for Practice */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Relevance for Practice
          </h2>
          <p className="text-white/70 leading-relaxed">
            The CAI concept influences not just Anthropic&apos;s Claude, but the entire
            AI safety discussion:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">System Prompts:</strong> The idea of giving
              a model explicit rules is reflected in every system prompt. CLAUDE.md files
              are essentially a local &quot;constitution.&quot;
            </li>
            <li>
              <strong className="text-white">EU AI Act:</strong> The transparency and
              documentation requirements of the EU AI Act align well with the CAI
              approach — explicit rules instead of black-box behavior.
            </li>
            <li>
              <strong className="text-white">Self-Improving Agents:</strong> The principle
              of self-critique appears in modern agent patterns like self-reflection and
              self-improving agents.
            </li>
          </ul>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Bai, Y. et al. (2022). &quot;Constitutional AI: Harmlessness from AI Feedback.&quot;{" "}
              <a href="https://arxiv.org/abs/2212.08073" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:2212.08073
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
