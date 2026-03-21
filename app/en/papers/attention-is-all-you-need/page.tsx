import { Metadata } from "next"
import PlantUMLDiagram from "../../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Attention Is All You Need — Transformer Explained | AI Engineering Wiki",
  description:
    "The Transformer paper by Vaswani et al. (2017) explained: Self-Attention, Multi-Head Attention and why this paper changed the entire AI landscape.",
}

export default function AttentionPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Attention Is All You Need
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Vaswani et al., 2017 — The paper that introduced the Transformer architecture
          and enabled all of modern AI.
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
              &quot;Attention Is All You Need&quot; introduced the Transformer architecture in
              2017 — a model based entirely on attention mechanisms, dispensing with
              recurrence (RNNs) and convolutions. Originally developed for machine
              translation, it is now the foundation for GPT, BERT, LLaMA, and virtually
              every modern LLM.
            </p>
          </div>
        </div>

        {/* The Problem Before Transformers */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Problem Before Transformers
          </h2>
          <p className="text-white/70 leading-relaxed">
            Before 2017, Recurrent Neural Networks (RNNs) and LSTMs dominated natural
            language processing. These models process text sequentially — word by word,
            left to right. This had two major drawbacks:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">Slow training:</strong> Because each word
              must wait for the previous one, computation cannot be parallelized.
              More GPUs barely help.
            </li>
            <li>
              <strong className="text-white">Forgetfulness:</strong> With long texts,
              the model &quot;forgets&quot; the beginning. Information is lost over 100+ tokens
              (the vanishing gradient problem).
            </li>
          </ul>
        </section>

        {/* The Core Idea: Self-Attention */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Core Idea: Self-Attention
          </h2>
          <p className="text-white/70 leading-relaxed">
            The Transformer solves both problems with a single mechanism: Self-Attention.
            Instead of processing text sequentially, every word simultaneously looks at
            all other words in the sentence and calculates how relevant each one is.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Technically, this works via three vectors per word: Query (Q), Key (K), and
            Value (V). The attention formula computes a weighted sum:
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4 font-mono text-sm text-white/80">
            Attention(Q, K, V) = softmax(QK&#x1D40; / √d_k) · V
          </div>
          <p className="text-white/70 leading-relaxed mt-4">
            The &quot;√d_k&quot; is a scaling factor that prevents dot products from becoming
            too large at high dimensions. Softmax converts the scores into probabilities.
          </p>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B

title Self-Attention Mechanism

rectangle "Input Token" as input #334155
rectangle "Query (Q)" as q #1E3A5F
rectangle "Key (K)" as k #1E3A5F
rectangle "Value (V)" as v #1E3A5F
rectangle "Linear\\nProjection" as proj1 #334155
rectangle "Linear\\nProjection" as proj2 #334155
rectangle "Linear\\nProjection" as proj3 #334155
rectangle "QK^T / √d_k" as dot #2D1B69
rectangle "Softmax" as soft #2D1B69
rectangle "Weighted\\nSum" as weighted #2D1B69
rectangle "Attention Output" as output #065F46

input --> proj1
input --> proj2
input --> proj3
proj1 --> q
proj2 --> k
proj3 --> v
q --> dot
k --> dot
dot --> soft
soft --> weighted
v --> weighted
weighted --> output
@enduml`} caption="Self-Attention: Each token produces Q, K, V — attention weights determine which tokens are relevant" />
        </section>

        {/* Multi-Head Attention */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Multi-Head Attention
          </h2>
          <p className="text-white/70 leading-relaxed">
            A single attention computation captures only one type of relationship.
            The Transformer therefore uses Multi-Head Attention: The Q/K/V vectors are
            split into multiple &quot;heads,&quot; each learning a different kind of relationship
            (e.g., syntactic proximity, semantic similarity, coreference).
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            The original paper uses 8 heads. The results of all heads are concatenated
            and combined through a linear projection.
          </p>
        </section>

        {/* Encoder-Decoder Architecture */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encoder-Decoder Architecture
          </h2>
          <p className="text-white/70 leading-relaxed">
            The original Transformer consists of two parts:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">Encoder:</strong> Processes the input text
              and creates a context-rich representation. Consists of 6 identical layers
              with self-attention and feed-forward networks.
            </li>
            <li>
              <strong className="text-white">Decoder:</strong> Generates the output text
              word by word. In addition to self-attention, it has cross-attention to the
              encoder output. Also 6 layers.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Modern LLMs like GPT use only the decoder part (autoregressive models),
            while BERT uses only the encoder. This shows how flexible the architecture is.
          </p>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B
skinparam PackageBorderColor #4262FF
skinparam PackageBackgroundColor #0F172A

title Transformer Encoder-Decoder Architecture

package "Encoder (6x)" as enc {
  rectangle "Input Embedding\\n+ Positional Encoding" as ie #334155
  rectangle "Multi-Head\\nSelf-Attention" as mhsa #2D1B69
  rectangle "Add & Norm" as an1 #334155
  rectangle "Feed-Forward\\nNetwork" as ff1 #1E3A5F
  rectangle "Add & Norm" as an2 #334155
}

package "Decoder (6x)" as dec {
  rectangle "Output Embedding\\n+ Positional Encoding" as oe #334155
  rectangle "Masked Multi-Head\\nSelf-Attention" as mmhsa #2D1B69
  rectangle "Add & Norm" as an3 #334155
  rectangle "Multi-Head\\nCross-Attention" as mhca #7C3AED
  rectangle "Add & Norm" as an4 #334155
  rectangle "Feed-Forward\\nNetwork" as ff2 #1E3A5F
  rectangle "Add & Norm" as an5 #334155
}

rectangle "Linear Layer\\n+ Softmax" as linear #065F46
rectangle "Output\\nProbabilities" as outp #065F46

ie --> mhsa
mhsa --> an1
an1 --> ff1
ff1 --> an2

oe --> mmhsa
mmhsa --> an3
an3 --> mhca
an2 ..> mhca : Encoder Output
mhca --> an4
an4 --> ff2
ff2 --> an5
an5 --> linear
linear --> outp
@enduml`} caption="Transformer Architecture: Encoder processes input, Decoder generates output with cross-attention to Encoder" />
        </section>

        {/* Why It Was Revolutionary */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why Was This Paper Revolutionary?
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Parallelization:</strong> All attention
              computations can run simultaneously on GPUs. Training became orders of
              magnitude faster, making models with billions of parameters practical.
            </li>
            <li>
              <strong className="text-white">Long contexts:</strong> Self-attention
              connects every token directly to every other token. There is no information
              loss over distance.
            </li>
            <li>
              <strong className="text-white">Universal architecture:</strong> Transformers
              work not only for text. The same architecture is used today for images
              (Vision Transformer), audio (Whisper), code (Codex), and multimodal models.
            </li>
          </ul>
        </section>

        {/* Impact on Today's Models */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Impact on Today&apos;s Models
          </h2>
          <p className="text-white/70 leading-relaxed">
            Virtually every relevant AI model is based on the Transformer:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li><strong className="text-white">GPT Series (OpenAI):</strong> Decoder-only Transformer</li>
            <li><strong className="text-white">BERT (Google):</strong> Encoder-only Transformer</li>
            <li><strong className="text-white">LLaMA (Meta):</strong> Decoder-only with improvements like RMSNorm and SwiGLU</li>
            <li><strong className="text-white">Claude (Anthropic):</strong> Transformer-based with Constitutional AI</li>
            <li><strong className="text-white">Mistral, Qwen, Gemma:</strong> All Transformer variants</li>
          </ul>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Vaswani, A. et al. (2017). &quot;Attention Is All You Need.&quot;{" "}
              <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:1706.03762
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
