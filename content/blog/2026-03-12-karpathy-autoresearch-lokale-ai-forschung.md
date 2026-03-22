---
title: "Karpathy's autoresearch: Autonome AI-Forschung auf deiner lokalen GPU"
date: "2026-03-12"
description: "26.000 GitHub Stars in 6 Tagen — was steckt hinter Andrej Karpathys neuestem Projekt? Und wie läuft es auf einer RTX 3090?"
summary: "26.000 GitHub Stars in 6 Tagen — was steckt hinter Andrej Karpathys neuestem Projekt? Und wie läuft es auf einer RTX 3090?"
tags: ["Local AI", "Forschung", "GPU", "Open Source", "Karpathy"]
author: "AI Engineering"
---

# Karpathy's autoresearch: Autonome AI-Forschung auf deiner lokalen GPU

<figure style="margin: 2rem 0;">
  <img src="/images/generated/hero-ai-data-flow.png" alt="KI-Datenfluss und Forschungsautomatisierung" style="border-radius: 12px; width: 100%;" />
</figure>

```
 ┌──────────────── autoresearch Pipeline ────────────────────────┐
 │                                                               │
 │   program.md          train.py          val_data.bin          │
 │       │                   │                  │                │
 │       ▼                   ▼                  │                │
 │  ┌─────────┐    ┌──────────────────┐         │                │
 │  │   LLM   │───>│  Code-Änderungen │         │                │
 │  │ (lokal/ │    │  (Architektur,   │         │                │
 │  │  Cloud) │    │   Hyperparams)   │         │                │
 │  └─────────┘    └────────┬─────────┘         │                │
 │                          │                   │                │
 │                          ▼                   ▼                │
 │                 ┌──────────────────────────────┐              │
 │                 │     Training (5 Min)         │              │
 │                 │     GPU: RTX 3090            │              │
 │                 └──────────────┬───────────────┘              │
 │                                │                              │
 │                                ▼                              │
 │                      ┌─────────────────┐                      │
 │                      │ val_bpb messen  │                      │
 │                      └────────┬────────┘                      │
 │                               │                               │
 │                    ┌──────────┴──────────┐                    │
 │                    │                     │                    │
 │              val_bpb besser?       val_bpb schlechter?       │
 │                    │                     │                    │
 │                    ▼                     ▼                    │
 │              BEHALTEN              ZURÜCKSETZEN              │
 │              nächste Iteration     auf letzten guten Stand   │
 │                    │                     │                    │
 │                    └──────────┬──────────┘                    │
 │                               │                               │
 │                         Loop endlos                           │
 └───────────────────────────────────────────────────────────────┘
```

26.469 GitHub Stars in 6 Tagen. Das Projekt wurde am 6. März 2026 veröffentlicht — mitten in der GTC-Woche — und ist seitdem das meistdiskutierte Open-Source-Projekt im LLM-Bereich. [Quelle](https://github.com/karpathy/autoresearch)

Was ist das? Und warum ist es für alle relevant, die AI lokal betreiben?

## Was autoresearch macht

autoresearch ist kein Inference-Tool. Kein Fine-Tuning. Kein Chat-Interface.

Es ist ein autonomer Forschungsagent für Pretraining-Experimente. Das bedeutet: Du gibst ihm eine Basis-Architektur und ein Trainings-Script (`train.py`), und er versucht eigenständig, das Modell durch Codeänderungen zu verbessern — ohne menschliches Eingreifen.

Der Agent verwendet ein LLM (z.B. GPT-4 oder ein lokales Modell) um `train.py` zu modifizieren, trainiert dann für 5 Minuten, misst die Validierungs-Perplexity (`val_bpb`), und entscheidet: besser oder schlechter?

## Der Loop — konkret

```
┌─────────────────────────────────────────────────────┐
│                  autoresearch Loop                  │
│                                                     │
│  Start                                              │
│    ↓                                                │
│  LLM analysiert train.py + bisherige Ergebnisse     │
│    ↓                                                │
│  LLM schreibt Änderungen (Architektur, Hyperparams) │
│    ↓                                                │
│  Training läuft: 5 Minuten                          │
│    ↓                                                │
│  val_bpb messen                                     │
│    ↓                                                │
│  val_bpb besser?                                    │
│    ├── JA  → Änderung behalten, nächste Iteration   │
│    └── NEIN → Reset auf letzten guten Stand         │
│                                                     │
│  Loop läuft: bis du ihn stoppst                     │
└─────────────────────────────────────────────────────┘
```

Das ist bewusst einfach gehalten. Kein kompliziertes Reward-Modell. Kein RL-Overkill. Nur: "Ist die Perplexity besser? Dann weiter."

Der Metrik `val_bpb` (Bits per Byte auf dem Validierungsset) ist ein standard Maß für Sprachmodell-Qualität. Niedriger = besser. [Quelle](https://github.com/karpathy/autoresearch/blob/main/train.py)

## program.md — das trifft uns direkt

Karpathy hat autoresearch mit einem `program.md` Konzept gebaut: eine leichtgewichtige Markdown-Datei die dem Agenten erklärt was er tun soll, welche Constraints gelten, wie er denken soll.

Das ist exakt das gleiche Prinzip wie unsere Skills. Eine SKILL.md definiert Frontmatter (Rolle, Tools, Dependencies) und Body (was der Agent tun soll). Der Agent liest das, handelt entsprechend, ohne dass jemand jede Entscheidung bestätigen muss.

Der Unterschied: Karpathy's program.md steuert Forschungsexperimente. Unsere SKILL.md steuert Operations-Tasks. Das Muster ist identisch.

## Läuft das auf einer RTX 3090?

Ja — mit reduzierten Settings. Die Standardkonfiguration ist für Multi-GPU-Cluster ausgelegt. Für eine einzelne RTX 3090 (24GB VRAM) gibt es empfohlene Anpassungen: [Quelle](https://github.com/karpathy/autoresearch#single-gpu-setup)

```python
# Reduzierte Settings für Single-GPU (RTX 3090)
batch_size = 4          # statt 32
context_length = 512    # statt 2048
n_layer = 6             # statt 12
n_embd = 256            # statt 768
```

Die 5-Minuten-Trainingsiterationen bleiben zeitlich stabil. Was sich ändert: die Modellkomplexität und damit der Erkenntnisgewinn pro Iteration. Für Proof-of-Concept-Experimente reicht das.

autoresearch setzt torch 2.9.1 und CUDA 12.8 voraus. Als Package Manager wird `uv` verwendet — schneller als pip, reproduzierbare Environments. [Quelle](https://github.com/karpathy/autoresearch/blob/main/requirements.txt)

## Der DSGVO-Angle

Wenn du autoresearch mit einem Cloud-LLM (OpenAI, Anthropic) als "Researcher-Agent" betreibst, gehen deine Trainingsdaten und Architektur-Details an externe Server. Bei medizinischen Daten, proprietären Architekturen, oder sensiblem Forschungsmaterial ist das ein Problem.

Die Alternative: lokales LLM als Researcher. qwen3.5:27b auf einer RTX 3090 kann die train.py-Modifikationen übernehmen. Kein Datentransfer. Keine API-Kosten. DSGVO-konform out of the box.

Der Kompromiss: Ein 27B-Modell denkt nicht so präzise über Architekturänderungen nach wie GPT-4o. Aber für viele Experimente reicht die Qualität — besonders wenn der Loop sowieso hunderte Iterationen dreht und schlechte Änderungen automatisch verworfen werden.

## Alternativen im Überblick

autoresearch ist nicht das einzige Tool in diesem Bereich:

- **LLM-Forge** — ähnlicher Ansatz, aber auf Fine-Tuning statt Pretraining fokussiert ([GitHub](https://github.com/bigcode-project/llm-forge))
- **NanoGPT** — Karpathys eigener minimaler GPT-Trainer, die Basis von autoresearch ([GitHub](https://github.com/karpathy/nanoGPT))
- **TinyML** — Framework für ressourcenbeschränkte Modelle, anderen Fokus aber verwandte Ziele ([tinyml.org](https://www.tinyml.org/))
- **AlphaCode / FunSearch** — Google DeepMinds Ansatz: LLMs die Programme schreiben und evaluieren ([Paper](https://arxiv.org/abs/2402.04788))

Der Unterschied zu allen genannten: autoresearch ist radikal einfach. 26.000 Stars in einer Woche kommen nicht von der Komplexität — sondern von der Einfachheit.

## Was das für uns bedeutet

Wir betreiben einen lokalen AI-Stack auf Hardware die autoresearch unterstützt. Die RTX 3090 läuft bereits als primärer LLM-Host mit qwen3.5:27b. Das Hinzufügen eines Forschungsloops darüber ist technisch straightforward.

Interessanter ist die konzeptuelle Frage: Wenn ein Agent eigenständig bessere Modelle trainieren kann — was bedeutet das für den Betrieb eines AI-Stacks in zwei Jahren?

Das ist kein Hype. autoresearch ist heute nützlich für Forschungsexperimente. Ob es zu etwas Grösserem wird, entscheiden die nächsten hundert Iterationen — im Loop, ohne Aufsicht.

## Zum Mitnehmen

- autoresearch ist für **Pretraining-Forschung**, nicht Inference oder Fine-Tuning
- Läuft auf **Single-GPU** mit reduzierten Settings (RTX 3090 getestet)
- Das **program.md Muster** ist dasselbe wie Skill-Definitionen in agentenbasierten Systemen
- **Vollständig lokal** ausführbar — mit lokalem LLM kein Datentransfer nötig
- MIT-Lizenz, aktive Entwicklung, letzter Commit heute

Das [Claude Code AI OS Template](https://buy.stripe.com/bJe9AT5Nt0vL81Efo0fQI07) enthält unsere vollständige Skill-Infrastruktur inklusive program.md-ähnlicher Agent-Definitionen für EUR 249.

---

*Wir betreiben eine RTX 3090 als primären GPU-Node im eigenen Homelab. autoresearch läuft darauf. Die reduced Settings sind von uns verifiziert.*
