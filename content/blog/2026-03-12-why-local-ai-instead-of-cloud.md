---
title: "Why You Shouldn't Use ChatGPT at Work — and What to Use Instead"
date: "2026-03-12"
description: "GDPR Art. 5, EU AI Act, data transfer to the US: three reasons why self-hosted AI is mandatory for European companies."
summary: "GDPR Art. 5, EU AI Act, data transfer to the US: three reasons why self-hosted AI is mandatory for European companies."
tags: ["GDPR", "Local AI", "ChatGPT", "Compliance", "Beginner"]
author: "AI Engineering"
series: "Local AI Stack: From 0 to Production"
seriesStep: 1
---

# Why You Shouldn't Use ChatGPT at Work — and What to Use Instead

Every time your employee uses ChatGPT, company data leaves EU jurisdiction.

That's not an exaggeration. That's what happens when someone types a customer document, an internal email, or a contract draft into the input box. The text goes to OpenAI servers in the US. What happens there — for training, logging, compliance — is not in your hands.

## Reason 1: GDPR Art. 5 — Integrity and Confidentiality

GDPR Article 5(1)(f) requires that personal data be processed "in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures." [Source: EUR-Lex GDPR](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679)

When customer data, employee data, or contract content is transmitted through an external API, you need at minimum:

- A Data Processing Agreement (DPA) with OpenAI
- Standard Contractual Clauses (SCCs) for the third-country transfer to the US
- A documented Data Protection Impact Assessment (DPIA)

In practice, very few SMEs have this fully in place. Most employees use ChatGPT without any legal basis.

NOYB (None of Your Business), the Austrian data protection organisation, has already filed complaints against OpenAI for GDPR violations. [Source: noyb.eu](https://noyb.eu/en/noyb-files-complaint-against-chatgpt-maker-openai)

## Reason 2: EU AI Act — Deadline 2 August 2026

From 2 August 2026, the high-risk requirements of the EU AI Act apply in full. [Source: EUR-Lex EU AI Act](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689)

What this means concretely: anyone deploying AI systems in high-risk areas — HR decisions, credit assessment, safety infrastructure — must demonstrate a quality management system, maintain technical documentation, and conduct a conformity assessment.

That's difficult when the model is a black box in the cloud. Running locally gives you full control over:

- Which model version is running
- Which data gets processed
- What is logged and what isn't

That's not a theoretical advantage — it's the difference between demonstrable compliance and a liability risk.

## Reason 3: Data Transfer to the US

Since the Schrems II ruling of the Court of Justice of the EU (2020), data transfers to the US have been legally complex. The EU-US Data Privacy Framework (2023) exists, but it's legally contested — further lawsuits are already pending. [Source: noyb.eu on the DPF](https://noyb.eu/en/us-surveillance-law-incompatible-eu-law-noyb-files-new-complaints-after-dpf)

For companies that depend on legal certainty: even with a valid DPA and SCCs, the risk remains that the legal foundation for the transfer collapses.

The simplest solution: data doesn't leave the network at all.

## What "Local" Actually Means

Local means: the model runs on your hardware, in your network. No API call goes outside. No token leaves the server.

This is achievable with today's hardware. An RTX 3090 (used, from roughly €600–800) can run models with 27 billion parameters at good quality. For lighter tasks, an RTX 2060 or even CPU-only is enough.

**Ollama** is the simplest way to make this happen. A single command, and the model runs:

```bash
ollama run qwen2.5:7b
```

No registration. No API key. No cloud contract. The model runs locally, responds in seconds, and no byte leaves the network.

We run our entire AI stack this way — for summaries, content creation, meeting transcription, and automation. All local, all GDPR-compliant out of the box.

## The Honest Trade-off

Local models are smaller than GPT-4. For most business tasks — summaries, classification, drafts, translations — 7B to 27B models are completely sufficient.

The trade-off: slightly less top-end model quality vs. full data control, no ongoing API costs, and legal certainty. For most companies, that's not a difficult trade-off.

---

**The compliance arguments are clear. The next step: install Ollama in 5 minutes and run your first local model.**

→ **[Step 2: Terminal Basics for AI Developers](/blog/2026-03-12-terminal-basics-for-ai-developers)**

---

If you need GDPR documentation for your AI deployment: the [DSGVO Compliance Bundle](/products) includes a processing register, DPIA template, DPA template, and an AI-specific checklist for the EU AI Act — €79, ready to use immediately.
