---
title: "What Is a Large Language Model? Explained Without Buzzwords"
date: "2026-03-12"
description: "LLM, GPT, Transformer — what's actually going on inside? An honest explanation without marketing speak."
summary: "LLM, GPT, Transformer — what's actually going on inside? An honest explanation without marketing speak."
tags: ["Basics", "LLM", "AI Basics", "Beginner"]
author: "AI Engineering"
series: "Local AI Stack: From 0 to Production"
seriesStep: 0
---

# What Is a Large Language Model? Explained Without Buzzwords

<figure style="margin: 2rem 0;">
  <img src="/images/generated/hero-ai-neural-network.png" alt="Neural network and AI visualization" style="border-radius: 12px; width: 100%;" />
</figure>

```
┌─────────────────────────────────────────────────────────┐
│                 Transformer Architecture                 │
│                                                         │
│   Input: "The capital of Austria is"                    │
│       │                                                 │
│       ▼                                                 │
│   ┌──────────────┐                                      │
│   │  Tokenizer   │  Text → Token IDs                    │
│   └──────┬───────┘                                      │
│          ▼                                              │
│   ┌──────────────┐                                      │
│   │  Embedding   │  Token IDs → Vectors                 │
│   └──────┬───────┘                                      │
│          ▼                                              │
│   ┌──────────────┐  ×N layers (e.g. 32 for 7B)          │
│   │  Attention   │  "Which tokens are relevant?"         │
│   │  + FFN       │  Weighted connections                 │
│   └──────┬───────┘                                      │
│          ▼                                              │
│   ┌──────────────┐                                      │
│   │  Output Head │  Probabilities for                    │
│   └──────┬───────┘  next token                          │
│          ▼                                              │
│   Output: "Vienna" (p=0.97)                             │
│                                                         │
│   Parameters = weights in Attention + FFN layers         │
│   7B = 7 billion weights ≈ 4-8 GB VRAM                  │
└─────────────────────────────────────────────────────────┘
```

ChatGPT uses it. Karpathy builds it. Most people can't explain what it actually is.

That's not a criticism — most explanations are either too simplistic ("it thinks like a human") or too abstract ("it's a stochastic parrot"). Neither is useful.

Here's what's actually happening.

## The Core Principle: Token Prediction

A Large Language Model does exactly one thing: it predicts which word (more precisely, which token) comes next.

That sounds trivial. It isn't.

When you type "The capital of Austria is", a well-trained model has seen millions of similar texts and knows: the next token is almost certainly "Vienna". But when you type "Explain quantum mechanics like I'm five", the model must reconstruct an answer from its training data that is simultaneously child-friendly and correct.

That's not a search. That's compression and reconstruction of knowledge.

Tokens are not words, by the way — they're character sequences. "Austria" might be a single token. "unprecedented" might be split into three. GPT-4 uses roughly 100,000 distinct tokens; Llama-3 models work similarly.

## Not a Search Index, Not a Database

This is the biggest misunderstanding: an LLM is not a search engine and not a database.

Google finds documents that exist. An LLM generates responses that have never existed in that exact form — from compressed pattern knowledge. That's why a model can't give you a meaningful answer about something that happened yesterday: it has no internet connection and no current knowledge.

A model's knowledge is frozen at the time of training. That's called the knowledge cutoff.

## Why Models Sometimes Lie

Hallucination is not a bug that will eventually be fixed. It's a direct consequence of how the system works.

The model has no truth module. It has no way of "knowing" whether a statement is correct — it can only assess how likely a sequence of tokens is given the context. If an incorrect statement appeared frequently in the training data phrased similarly to a true one, the model will output it with similar confidence.

That's why you always verify LLM outputs in critical domains.

## What "Parameters" Means

Short and direct: parameters are the numbers that were adjusted during training. A model with 7 billion parameters has 7 billion weights in a neural network. More parameters generally means more capacity for knowledge — but also more RAM requirements and slower inference.

A 7B model needs roughly 4–8 GB of VRAM; a 27B model needs about 16–20 GB. That's relevant when you're running locally.

## The Architecture Behind It

All modern LLMs are based on the Transformer architecture, introduced by Google Brain in 2017. The paper is called "Attention Is All You Need" — and the title says it all. [Source: Vaswani et al., 2017](https://arxiv.org/abs/1706.03762)

The central idea: attention allows the model to consider all other tokens in context simultaneously when processing any given token — weighted by relevance. That's what makes Transformers so much more powerful than earlier architectures.

Andrej Karpathy described this kind of effectiveness early on — first for RNNs, later for Transformers. His post "The Unreasonable Effectiveness of Recurrent Neural Networks" is still worth reading as an entry point into the topic. [Source: karpathy.github.io](https://karpathy.github.io/2015/05/21/rnn-effectiveness/)

For those who want to go deeper: Karpathy's `llm.c` project implements a GPT-2-style Transformer in 1,000 lines of C. No abstractions, no framework. [Source: github.com/karpathy/llm.c](https://github.com/karpathy/llm.c)

## What an LLM CANNOT Do

As impressive as the capabilities are, LLMs have fundamental limitations that no amount of training or scaling will fully resolve:

**Hallucinations are systemic.** An LLM cannot distinguish between "true" and "sounds plausible". It generates the most probable token sequence, not the most correct one. This means it invents sources, statistics, people, and events — with the same confidence as correct statements. In medical, legal, or financial contexts, this is a dealbreaker without human oversight.

**No real understanding.** An LLM does not understand language in the human sense. It recognizes statistical patterns in text. It can explain a joke because it has seen millions of joke explanations — not because it understands humour. This is an important distinction because it determines where you can rely on the output and where you cannot.

**Context limits.** Every model has a context window — the maximum number of tokens it can process at once. Llama 3.2 supports 128,000 tokens; smaller models often max out at 4,096 or 8,192. If your document exceeds the context window, the beginning is simply truncated. The model does not "forget" — it never saw the information in the first place.

**No access to reality.** An LLM has no internet access, no database connection, and no knowledge of events after the training cutoff. If you ask "What happened yesterday?", it guesses — or admits it does not know (if it was well-trained).

**Mathematics and logical reasoning.** LLMs are weak at arithmetic, formal logic, and multi-step reasoning. They can miscalculate 17 x 24 while eloquently writing about number theory. This is because calculation is not pattern matching.

## Which Model for Which Purpose?

| Task | Recommended Model | Parameters | VRAM Required | Notes |
|------|------------------|------------|---------------|-------|
| Quick drafts, brainstorming | Llama 3.2 3B | 3B | ~3 GB | Fast, good for simple tasks |
| Email summaries, classification | Qwen 2.5 7B | 7B | ~5 GB | Good VRAM-to-performance ratio |
| Code generation | Qwen 2.5 Coder 14B | 14B | ~10 GB | Specialised for coding tasks |
| Technical documentation | Qwen 2.5 14B | 14B | ~10 GB | Solid for longer, structured text |
| Complex analysis, longer texts | Qwen 2.5 27B | 27B | ~18 GB | Needs RTX 3090 or better |
| Multilingual tasks | Mistral Small 24B | 24B | ~16 GB | Strong across European languages |
| Simple chat, low hardware | Phi-3.5 Mini 3.8B | 3.8B | ~3 GB | Microsoft's compact model |

These values are approximations for quantised versions (Q4_K_M). Non-quantised models require roughly double the VRAM.

## Running LLMs Locally

The simplest way to run an LLM locally is [Ollama](https://ollama.com). A single command is enough:

```bash
ollama run qwen2.5:7b
```

Ollama handles the download, quantisation, and GPU management. You need:

- **Minimum:** 8 GB RAM, a reasonably modern CPU — this runs 3B models on CPU (slow but functional)
- **Recommended:** 16 GB RAM, a GPU with 6+ GB VRAM (e.g., RTX 2060, RTX 3060) — this runs 7B models smoothly
- **Optimal:** 24+ GB VRAM (RTX 3090, RTX 4090) — this runs 27B models at good speed

If you don't have a dedicated GPU: Ollama can also run models on CPU. A 3B model on a modern laptop (M1/M2 Mac or current Intel/AMD) responds in roughly 2-5 seconds per paragraph. Not fast, but sufficient for many tasks.

More details in [Step 3: Install Ollama](/blog/2026-03-12-install-ollama-step-by-step) of this series.

## What This Means for You

LLMs are powerful tools for text summarization, classification, code generation, translation, and extraction. They are not all-knowing assistants and no substitute for domain expertise.

The important part: you don't need OpenAI for this. Models like Qwen, Llama, or Mistral run locally — on your hardware, without API costs, without a single byte leaving your network.

---

**Now you know what an LLM is. The next step: why you should run it locally — and what that means for GDPR and the EU AI Act.**

→ **[Step 1: Why You Shouldn't Use ChatGPT at Work](/blog/2026-03-12-why-local-ai-instead-of-cloud)**
