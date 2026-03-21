import { Metadata } from "next"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "LoRA: Low-Rank Adaptation Explained | AI Engineering Wiki",
  description:
    "The LoRA paper by Hu et al. (2021) explained: Parameter-efficient fine-tuning of large language models without retraining all weights.",
}

export default function LoRAPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          LoRA: Low-Rank Adaptation of Large Language Models
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Hu et al., 2021 — How to efficiently adapt large models to new tasks
          with a fraction of the parameters.
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
              LoRA (Low-Rank Adaptation) enables adapting large language models to specific
              tasks without modifying all model parameters. Instead of updating entire
              weight matrices, LoRA adds small, trainable matrices. This drastically reduces
              memory requirements and training time.
            </p>
          </div>
        </div>

        {/* The Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Problem: Fine-Tuning Is Expensive
          </h2>
          <p className="text-white/70 leading-relaxed">
            Adapting a pretrained LLM to a specific task (fine-tuning) normally means
            updating all model parameters. For a model with 7 billion parameters, that
            means 7 billion values need to be stored, computed, and optimized.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            This requires enormous GPU resources. Full fine-tuning of a 70B model needs
            multiple high-end GPUs with over 100 GB of combined VRAM. For most companies
            and developers, this is not practical.
          </p>
        </section>

        {/* The LoRA Idea */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The LoRA Idea: Low-Rank Decomposition
          </h2>
          <p className="text-white/70 leading-relaxed">
            LoRA&apos;s central insight: The changes made to weight matrices during
            fine-tuning have a low rank. This means the actual adaptation can be
            represented by much smaller matrices.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Instead of modifying a large weight matrix W directly, LoRA adds two small
            matrices A and B:
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4 font-mono text-sm text-white/80">
            W&apos; = W + BA
            <br />
            <br />
            W: Original matrix (frozen, not trained)
            <br />
            B: Small matrix (d x r), trainable
            <br />
            A: Small matrix (r x d), trainable
            <br />
            r: Rank (typically 4-64, much smaller than d)
          </div>
          <p className="text-white/70 leading-relaxed mt-4">
            The original weights W remain frozen. Only the small matrices A and B are
            trained. With rank r=16 and dimension d=4096, you train 131,072 parameters
            per layer instead of 16.7 million — a reduction by a factor of 128.
          </p>
        </section>

        {/* How LoRA Works */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            How LoRA Works Technically
          </h2>
          <p className="text-white/70 leading-relaxed">
            LoRA is typically applied to the attention matrices (Q, K, V, O) of the
            Transformer. The process:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">1. Freeze:</strong> All original model
              parameters are frozen (requires_grad=False). They do not change during
              training.
            </li>
            <li>
              <strong className="text-white">2. Insert LoRA modules:</strong> Small
              matrices A and B are inserted alongside each selected weight matrix.
              A is randomly initialized, B with zeros (so the starting state is
              identical to the original).
            </li>
            <li>
              <strong className="text-white">3. Train:</strong> Only the LoRA matrices
              are trained. This requires a fraction of the memory and compute time.
            </li>
            <li>
              <strong className="text-white">4. Merge:</strong> After training, the
              LoRA matrices can be merged into the original weights (W + BA). The result
              is a normal model with no additional latency.
            </li>
          </ul>
        </section>

        {/* Advantages */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Advantages of LoRA
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Memory efficiency:</strong> Instead of
              duplicating the entire model, you store only the small LoRA adapters.
              A LoRA adapter for a 7B model is typically only 10-50 MB.
            </li>
            <li>
              <strong className="text-white">Fast training:</strong> Fewer trainable
              parameters mean faster training steps and less GPU memory required.
            </li>
            <li>
              <strong className="text-white">No quality loss:</strong> With properly
              chosen rank, LoRA achieves results comparable to full fine-tuning.
            </li>
            <li>
              <strong className="text-white">Adapter switching:</strong> Multiple LoRA
              adapters can be trained for different tasks and swapped at runtime — on
              the same base model.
            </li>
          </ul>
        </section>

        {/* Variants */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Further Developments: QLoRA and DoRA
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">QLoRA (2023):</strong> Combines LoRA with
              4-bit quantization. The base model is loaded in 4-bit, LoRA matrices
              trained in 16-bit. This allows fine-tuning a 70B model on a single GPU.
            </li>
            <li>
              <strong className="text-white">DoRA (2024):</strong> Decomposed LoRA
              separates weights into magnitude and direction, applying LoRA only to the
              direction. This improves training quality.
            </li>
          </ul>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Hu, E. J. et al. (2021). &quot;LoRA: Low-Rank Adaptation of Large Language Models.&quot;{" "}
              <a href="https://arxiv.org/abs/2106.09685" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:2106.09685
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
