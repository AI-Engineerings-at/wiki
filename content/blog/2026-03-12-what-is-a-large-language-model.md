---
title: "What Is a Large Language Model? Explained Without Buzzwords"
date: "2026-03-12"
description: "LLM, GPT, Transformer — what's actually going on inside? An honest explanation without marketing speak."
tags: ["Basics", "LLM", "AI Basics", "Beginner"]
author: "AI Engineering"
series: "Local AI Stack: From 0 to Production"
seriesStep: 0
---

# What Is a Large Language Model? Explained Without Buzzwords

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

## What This Means for You

LLMs are powerful tools for text summarization, classification, code generation, translation, and extraction. They are not all-knowing assistants and no substitute for domain expertise.

The important part: you don't need OpenAI for this. Models like Qwen, Llama, or Mistral run locally — on your hardware, without API costs, without a single byte leaving your network.

---

**Now you know what an LLM is. The next step: why you should run it locally — and what that means for GDPR and the EU AI Act.**

→ **[Step 1: Why You Shouldn't Use ChatGPT at Work](/blog/2026-03-12-why-local-ai-instead-of-cloud)**
