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

| Criterion | Cloud AI (ChatGPT) | Local AI (Ollama) |
|-----------|--------------------|--------------------|
| Data storage | US servers (OpenAI) | Your own server |
| GDPR compliance | DPA + SCCs + DPIA required | Out of the box |
| EU AI Act control | Black box, no access | Full transparency |
| API costs | Per token, ongoing | One-time hardware |
| Model quality | GPT-4 (top tier) | 7B-27B (solid) |
| Latency | Network dependent | Local, instant |
| Availability | Depends on OpenAI | Your infrastructure |
| US data transfer | Yes (Schrems II risk) | No byte leaves the network |

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

## Concrete Cost Example: Cloud vs. Local

Consider a mid-sized company using AI for customer support summaries, internal document analysis, and email drafts. Assumption: 1,000 requests per day, averaging 500 input tokens and 300 output tokens per request.

**Cloud costs (OpenAI GPT-4o):**
- Input: 1,000 × 500 tokens × $2.50 / 1M tokens = $1.25 per day
- Output: 1,000 × 300 tokens × $10.00 / 1M tokens = $3.00 per day
- Daily cost: approx. $4.25
- Monthly cost: approx. $127.50
- Annual cost: approx. $1,530

With GPT-4 (not GPT-4o), costs run around $30/day — roughly $10,950/year. And it scales linearly: double the volume, double the cost.

**Local costs (Ollama + RTX 3090):**
- One-time: used RTX 3090 approx. €700, or RTX 4060 Ti 16GB approx. €450
- Electricity: approx. 300W under load, at 8h/day = 2.4 kWh × €0.30 = €0.72/day
- Monthly electricity: approx. €22
- Annual electricity: approx. €264

The hardware pays for itself within about 6 months compared to GPT-4o pricing. With GPT-4, less than one month. After that, only electricity costs remain.

The catch: local models (7B-27B parameters) do not deliver the same peak quality as GPT-4. For the tasks listed — summaries, classification, drafts — the difference is rarely business-critical in practice.

## GDPR: The Real Risks

The GDPR problem goes deeper than "data goes to the US". Here are the concrete risks:

**Schrems II and unstable legal foundations.** The CJEU invalidated the EU-US Privacy Shield in 2020 with the Schrems II ruling. Its successor, the EU-US Data Privacy Framework (DPF), has been in place since 2023. But the underlying US legislation (FISA Section 702, Executive Order 12333) has not substantively changed. NOYB has already announced plans to challenge the DPF. The risk of a "Schrems III" is real. [Source: noyb.eu](https://noyb.eu/en/us-surveillance-law-incompatible-eu-law-noyb-files-new-complaints-after-dpf)

**Fines.** The GDPR allows fines of up to €20 million or 4% of global annual revenue — whichever is higher. The Italian data protection authority (Garante) temporarily banned ChatGPT in 2023. The Polish authority issued a fine against a data broker in 2024 for lack of transparency in AI processing.

**Reversed burden of proof.** Under the GDPR, the controller (your company) must demonstrate that processing is lawful — not the authority proving it isn't. If you cannot document where data is processed, you have a problem.

**Employee use without legal basis.** The underestimated risk: employees use ChatGPT on their own, without IT knowing. Customer names, contract content, HR data — all end up in a system with no DPA, no DPIA, no documented legal basis. This is not a theoretical danger; it happens daily in European companies.

## When Cloud IS Better

Honest answer: there are scenarios where cloud AI is the better choice.

**Peak quality for complex reasoning.** If you need a model that analyzes 100-page legal documents and catches subtle contradictions, GPT-4 or Claude currently outperforms any locally runnable model. The gap is closing, but it still exists.

**No in-house AI team.** If you lack the capacity or expertise to set up and maintain local infrastructure, a managed cloud solution is pragmatically more sensible than a poorly operated local installation.

**Infrequent, high-value queries.** If you only have 10-20 requests per day and process no sensitive data, the hardware investment does not pay off economically.

**Multimodal tasks.** Image analysis, video understanding, top-tier audio transcription — cloud infrastructure is (still) significantly superior here, especially for real-time requirements.

## The Hybrid Approach: Best of Both Worlds

In practice, many companies are best served by a hybrid setup:

**Local for sensitive data:** All tasks involving personal data, contract content, financial data, or internal strategy documents run through the local stack. Ollama + Open WebUI + a 14B or 27B model covers this.

**Cloud for non-sensitive specialist tasks:** Marketing copy without customer references, general research, creative brainstorming — this can run through a cloud API, provided a valid DPA exists and no personal data appears in the prompt.

**Concrete setup:**
1. Local Ollama server with `qwen2.5:14b` for daily operations
2. Open WebUI as the interface for all employees
3. n8n workflow that routes to a cloud API on demand — but only for explicitly approved, non-sensitive tasks
4. Clear policy: personal data never leaves the network

This is not a compromise — it is the architecturally clean solution. Sensitive data stays local, compute-intensive specialist tasks go to the cloud, and the decision is not left to the individual employee but enforced technically.

## The Honest Trade-off

Local models are smaller than GPT-4. For most business tasks — summaries, classification, drafts, translations — 7B to 27B models are completely sufficient.

The trade-off: slightly less top-end model quality vs. full data control, no ongoing API costs, and legal certainty. For most companies, that's not a difficult trade-off.

---

**The compliance arguments are clear. The next step: install Ollama in 5 minutes and run your first local model.**

→ **[Step 2: Terminal Basics for AI Developers](/blog/2026-03-12-terminal-basics-for-ai-developers)**

---

If you need GDPR documentation for your AI deployment: the [DSGVO Compliance Bundle](/products) includes a processing register, DPIA template, DPA template, and an AI-specific checklist for the EU AI Act — €79, ready to use immediately.
