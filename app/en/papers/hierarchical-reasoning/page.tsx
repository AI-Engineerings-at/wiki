import { Metadata } from "next"
import PlantUMLDiagram from "../../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Hierarchical Reasoning Model (2025) — Recurrent AI Without Chain-of-Thought | AI Engineering Wiki",
  description:
    "The Hierarchical Reasoning Model (HRM) solves complex tasks like Sudoku, maze pathfinding and ARC with just 27M parameters and 1000 training samples — without Chain-of-Thought.",
}

export default function HierarchicalReasoningPageEN() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Hierarchical Reasoning Model
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Wang et al., 2025 — A recurrent architecture with only 27 million parameters
          that solves complex planning and reasoning tasks without Chain-of-Thought.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 8 min</span>
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
              The Hierarchical Reasoning Model (HRM) demonstrates that strong reasoning
              does not require enormous models. With only 27 million parameters and just
              1000 training examples, it masters Sudoku, maze navigation, and ARC puzzles
              — without the usual Chain-of-Thought approach. Instead, it uses two recurrent
              modules: one for abstract planning and one for concrete computation.
            </p>
          </div>
        </div>

        {/* The Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Problem: Reasoning Is Expensive
          </h2>
          <p className="text-white/70 leading-relaxed">
            Modern large language models (LLMs) typically solve complex reasoning tasks
            through Chain-of-Thought (CoT): the model writes out its thinking process
            explicitly as text, step by step. This works — but it is expensive. More
            tokens, more compute, more cost.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            On top of that, more complex tasks typically require more parameters. GPT-4 is
            estimated at roughly 1.8 trillion parameters. For many businesses, that is not
            a realistic option — neither in terms of cost nor data privacy, when data must
            not leave the premises.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            The HRM paper asks a fundamentally different question: does reasoning really
            need to be that large and that explicit?
          </p>
        </section>

        {/* The Approach */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Approach: Hierarchical Recurrent Processing
          </h2>
          <p className="text-white/70 leading-relaxed">
            The core idea of HRM is simple but powerful: reasoning happens on two levels
            simultaneously — similar to how humans plan strategically and execute concrete
            actions without narrating every thought out loud.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            The model is recurrent: it processes the same input multiple times across
            several &quot;thinking rounds&quot; (recurrent steps) before producing an answer.
            This internal processing space replaces the explicit reasoning text used in CoT.
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">No Chain-of-Thought required:</strong>{" "}
              Thinking happens internally in the network&apos;s activations, not as visible text.
            </li>
            <li>
              <strong className="text-white">Only 1000 training examples:</strong>{" "}
              Instead of millions of samples, a tiny dataset suffices — a remarkable result.
            </li>
            <li>
              <strong className="text-white">27 million parameters:</strong>{" "}
              Small enough to run locally on consumer hardware.
            </li>
          </ul>
        </section>

        {/* Architecture */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Architecture: Two Modules, Two Levels
          </h2>
          <p className="text-white/70 leading-relaxed">
            HRM consists of two recurrent modules that work together hierarchically:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">High-Level Module:</strong>{" "}
              Responsible for abstract, strategic planning. It processes the task at a
              high level and provides direction and strategy. This module runs slowly —
              few iterations per task.
            </li>
            <li>
              <strong className="text-white">Low-Level Module:</strong>{" "}
              Handles detailed, concrete computation. It carries out the strategy set by
              the high-level module in small steps. This module runs faster and iterates
              more frequently.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Both modules exchange state information — the high-level module can adjust its
            state when the low-level module encounters obstacles. This creates a dynamic
            loop between planning and execution.
          </p>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B
skinparam PackageBorderColor #4262FF
skinparam PackageBackgroundColor #0F172A

title HRM — Hierarchical Two-Module Architecture

rectangle "Input\\n(Task)" as input #334155

package "High-Level Module\\n(Abstract Planning)" as hl {
  rectangle "Strategic\\nState H_t" as hstate #2D1B69
  rectangle "Direction &\\nStrategy" as strategy #2D1B69
}

package "Low-Level Module\\n(Detailed Computation)" as ll {
  rectangle "Detailed\\nState L_t" as lstate #1E3A5F
  rectangle "Concrete\\nExecution" as exec #1E3A5F
}

rectangle "Output\\n(Solution)" as output #065F46

input --> hstate
hstate --> strategy
strategy --> lstate : Direction guidance
lstate --> exec
exec --> hstate : Feedback (state update)
exec --> output

note right of hl
  Few iterations
  Slow cycles
  Global strategy
end note

note right of ll
  Many iterations
  Fast cycles
  Local details
end note
@enduml`} caption="HRM Architecture: The high-level module plans abstractly, the low-level module executes concretely — both communicate via state vectors" />
        </section>

        {/* Results */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Results: Small Beats Large
          </h2>
          <p className="text-white/70 leading-relaxed">
            The authors test HRM on three different task types that require different kinds
            of reasoning:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Sudoku:</strong>{" "}
              The model reliably solves Sudoku puzzles. Sudoku requires systematic
              elimination and backtracking — classic strengths of hierarchical planning.
            </li>
            <li>
              <strong className="text-white">Maze Navigation:</strong>{" "}
              HRM finds paths through complex mazes. The high-level module plans the
              overall route, the low-level module navigates the individual steps.
            </li>
            <li>
              <strong className="text-white">ARC (Abstraction and Reasoning Corpus):</strong>{" "}
              ARC is considered a particularly hard benchmark for abstract pattern recognition.
              HRM achieves notable results — without any Chain-of-Thought.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            The remarkable part: these results are achieved with only 27 million parameters
            and 1000 training examples — a fraction of what comparable approaches require.
          </p>
        </section>

        {/* Business Relevance */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            What Does This Mean for My Business?
          </h2>
          <p className="text-white/70 leading-relaxed">
            The HRM paper is especially relevant for SMEs that want or need to run AI
            locally — for example due to data privacy requirements (GDPR) or limited
            budgets. Three concrete implications:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Local deployment becomes more realistic:</strong>{" "}
              A 27M parameter model runs on any modern laptop or small server. No cloud
              dependency, no data sharing with external providers.
            </li>
            <li>
              <strong className="text-white">Specialized small models:</strong>{" "}
              Research shows that for clearly defined tasks (planning, routing, puzzles,
              structured decisions), small specialized models can perform surprisingly well
              — at a fraction of the cost.
            </li>
            <li>
              <strong className="text-white">Fine-tuning with few data points:</strong>{" "}
              1000 training examples is realistic for many businesses. This means your
              own data could be enough to train a specialized model without needing to
              collect massive datasets.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            <strong className="text-white">Important caveat:</strong> HRM is not a
            universal model. It is optimized for structured reasoning tasks, not free text
            generation or conversation. The use case makes sense where clear rules and
            structured problems dominate — for example in planning systems, process
            optimization, or decision support.
          </p>
        </section>

        {/* Context */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Context: Why Does This Paper Matter?
          </h2>
          <p className="text-white/70 leading-relaxed">
            The HRM paper appeared in June 2025 and sits within a growing research
            direction questioning whether large models are really necessary for everything.
            While industry pushes toward ever-larger models, this research shows that
            architecture can replace size.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            The idea of splitting reasoning into two levels — strategic and tactical — is
            not new. It appears in classical AI planning (STRIPS, HTN), cognitive science
            (System 1 and System 2 per Kahneman), and robotics. HRM successfully
            transfers this principle into a neural network.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            For practitioners, this means: the search for the right model should not
            start only with size and benchmark scores, but with architecture. A
            well-designed small model can outperform a generalist large model on specific
            tasks — while being faster and cheaper.
          </p>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Wang, G., Li, J., Sun, Y., Chen, X., Liu, C., Wu, Y., Lu, M., Song, S.,
              Abbasi Yadkori, Y. (2025). &quot;Hierarchical Reasoning Model.&quot;{" "}
              <a
                href="https://arxiv.org/abs/2506.21734"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                arXiv:2506.21734
              </a>
              {" "}(submitted 2025-06-26, revised 2025-08-04)
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
