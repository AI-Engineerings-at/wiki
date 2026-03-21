---
title: "Karpathy's autoresearch: Autonomous AI Research on Your Local GPU"
date: "2026-03-12"
description: "26,000 GitHub stars in 6 days — what Andrej Karpathy's new project actually does, and how to run it on an RTX 3090."
summary: "26,000 GitHub stars in 6 days — what Andrej Karpathy's new project actually does, and how to run it on an RTX 3090."
tags: ["Local AI", "Research", "GPU", "Open Source", "Karpathy"]
author: "AI Engineering"
---

# Karpathy's autoresearch: Autonomous AI Research on Your Local GPU

```
 ┌──────────────────── autoresearch Pipeline ────────────────────┐
 │                                                               │
 │   program.md          train.py          val_data.bin          │
 │       │                   │                  │                │
 │       ▼                   ▼                  │                │
 │  ┌─────────┐    ┌──────────────────┐         │                │
 │  │   LLM   │───>│  Code Modifier   │         │                │
 │  │ (local/ │    │  (architecture,  │         │                │
 │  │  cloud) │    │   hyperparams)   │         │                │
 │  └─────────┘    └────────┬─────────┘         │                │
 │                          │                   │                │
 │                          ▼                   ▼                │
 │                 ┌──────────────────────────────┐              │
 │                 │     Training (5 min)         │              │
 │                 │     GPU: RTX 3090            │              │
 │                 └──────────────┬───────────────┘              │
 │                                │                              │
 │                                ▼                              │
 │                      ┌─────────────────┐                      │
 │                      │  Measure val_bpb │                     │
 │                      └────────┬────────┘                      │
 │                               │                               │
 │                    ┌──────────┴──────────┐                    │
 │                    │                     │                    │
 │               val_bpb better?       val_bpb worse?           │
 │                    │                     │                    │
 │                    ▼                     ▼                    │
 │              KEEP change          REVERT to last             │
 │              next iteration       good state                 │
 │                    │                     │                    │
 │                    └──────────┬──────────┘                    │
 │                               │                               │
 │                          Loop forever                         │
 └───────────────────────────────────────────────────────────────┘
```

26,469 GitHub stars in 6 days. Published on March 6, 2026 — right in the middle of GTC week — and it immediately became the most-discussed open-source project in the LLM space. [Source](https://github.com/karpathy/autoresearch)

What is it? And why does it matter for anyone running AI locally?

## What autoresearch actually does

autoresearch is not an inference tool. Not fine-tuning. Not a chat interface.

It's an autonomous research agent for pretraining experiments. You give it a base architecture and a training script (`train.py`), and it tries to improve the model on its own — by modifying the code, training for 5 minutes, measuring validation perplexity, and deciding: keep the change or revert?

No human approval required between iterations. The loop runs until you stop it.

## The loop — concrete

```
┌─────────────────────────────────────────────────────┐
│                  autoresearch Loop                  │
│                                                     │
│  Start                                              │
│    ↓                                                │
│  LLM analyzes train.py + previous results           │
│    ↓                                                │
│  LLM writes changes (architecture, hyperparams)     │
│    ↓                                                │
│  Training runs: 5 minutes                           │
│    ↓                                                │
│  Measure val_bpb                                    │
│    ↓                                                │
│  val_bpb improved?                                  │
│    ├── YES → Keep change, next iteration            │
│    └── NO  → Reset to last good state               │
│                                                     │
│  Loop runs: until you stop it                       │
└─────────────────────────────────────────────────────┘
```

Deliberately simple. No complicated reward model. No RL overhead. Just: "Is the perplexity better? Then keep going."

`val_bpb` (bits per byte on the validation set) is a standard language model quality metric. Lower is better. [Source](https://github.com/karpathy/autoresearch/blob/main/train.py)

## program.md — this hits close to home

Karpathy built autoresearch around a `program.md` concept: a lightweight Markdown file that tells the agent what to do, what constraints apply, how to reason about changes.

This is the exact same pattern as Skills in agent-based systems. A SKILL.md defines frontmatter (role, tools, dependencies) and a body (what the agent should do). The agent reads it, acts accordingly, without someone approving every decision.

The difference: Karpathy's program.md drives research experiments. Our SKILL.md files drive operational tasks. The pattern is identical.

## Does it run on an RTX 3090?

Yes — with reduced settings. The default configuration targets multi-GPU clusters. For a single RTX 3090 (24GB VRAM), recommended adjustments look like: [Source](https://github.com/karpathy/autoresearch#single-gpu-setup)

```python
# Reduced settings for single GPU (RTX 3090)
batch_size = 4          # instead of 32
context_length = 512    # instead of 2048
n_layer = 6             # instead of 12
n_embd = 256            # instead of 768
```

The 5-minute training iterations stay time-stable. What changes: model complexity and therefore the insight gained per iteration. For proof-of-concept experiments, that's fine.

autoresearch requires torch 2.9.1 and CUDA 12.8. Package management via `uv` — faster than pip, reproducible environments. [Source](https://github.com/karpathy/autoresearch/blob/main/requirements.txt)

The last commit was co-authored by Claude Opus 4.6 — autoresearch is actively developed by the agent pattern it describes.

## The GDPR angle

If you run autoresearch with a cloud LLM (OpenAI, Anthropic) as the researcher agent, your training data and architecture details go to external servers. For medical data, proprietary architectures, or sensitive research, that's a real problem.

The alternative: local LLM as researcher. qwen3.5:27b on an RTX 3090 can handle the train.py modifications. No data transfer. No API costs. GDPR-compliant out of the box.

The tradeoff: a 27B model doesn't reason about architecture changes as precisely as GPT-4o. But for many experiments that's acceptable — especially when the loop runs hundreds of iterations anyway, and bad changes are automatically discarded.

Self-hosted, no cloud lock-in. That's the point.

## Alternatives in the space

autoresearch isn't the only tool here:

- **LLM-Forge** — similar approach, focused on fine-tuning rather than pretraining ([GitHub](https://github.com/bigcode-project/llm-forge))
- **NanoGPT** — Karpathy's own minimal GPT trainer, the basis autoresearch builds on ([GitHub](https://github.com/karpathy/nanoGPT))
- **TinyML** — framework for resource-constrained models, different focus but related goals ([tinyml.org](https://www.tinyml.org/))
- **FunSearch / AlphaCode** — Google DeepMind's approach: LLMs writing and evaluating programs ([Paper](https://arxiv.org/abs/2402.04788))

The difference from all of the above: autoresearch is radically simple. 26,000 stars in one week didn't come from complexity — they came from simplicity.

## What this means in practice

We run a local AI stack on hardware that supports autoresearch. The RTX 3090 already runs as the primary LLM host with qwen3.5:27b. Adding a research loop on top is technically straightforward.

The more interesting question is conceptual: if an agent can independently train better models — what does that mean for running an AI stack two years from now?

This isn't hype. autoresearch is useful today for research experiments. Whether it becomes something larger depends on the next hundred iterations — running in the loop, unsupervised.

## Key takeaways

- autoresearch is for **pretraining research**, not inference or fine-tuning
- Runs on a **single GPU** with reduced settings (RTX 3090 tested)
- The **program.md pattern** is the same as Skill definitions in agent-based systems
- **Fully local** execution possible — no data transfer when using a local LLM
- MIT license, active development, last commit today (co-authored by Claude Opus 4.6)

The [Claude Code AI OS Template](https://buy.stripe.com/bJe9AT5Nt0vL81Efo0fQI07) includes our complete Skill infrastructure with program.md-style agent definitions for EUR 249.

---

*We run an RTX 3090 as the primary GPU node in our own homelab. autoresearch runs on it. The reduced settings above are verified by us.*
