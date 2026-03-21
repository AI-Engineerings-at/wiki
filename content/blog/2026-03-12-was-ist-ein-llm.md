---
title: "Was ist ein Large Language Model? Erklärt ohne Buzzwords"
date: "2026-03-12"
description: "LLM, GPT, Transformer — was steckt wirklich dahinter? Eine ehrliche Erklärung ohne Marketing-Sprache."
summary: "LLM, GPT, Transformer — was steckt wirklich dahinter? Eine ehrliche Erklärung ohne Marketing-Sprache."
tags: ["Grundlagen", "LLM", "AI Basics", "Anfänger"]
author: "AI Engineering"
series: "Lokaler AI-Stack: Von 0 bis Production"
seriesStep: 0
---

# Was ist ein Large Language Model? Erklärt ohne Buzzwords

```
┌─────────────────────────────────────────────────────────┐
│                 Transformer-Architektur                  │
│                                                         │
│   Input: "Die Hauptstadt von Österreich ist"            │
│       │                                                 │
│       ▼                                                 │
│   ┌──────────────┐                                      │
│   │  Tokenizer   │  Text → Token-IDs                    │
│   └──────┬───────┘                                      │
│          ▼                                              │
│   ┌──────────────┐                                      │
│   │  Embedding   │  Token-IDs → Vektoren                │
│   └──────┬───────┘                                      │
│          ▼                                              │
│   ┌──────────────┐  ×N Schichten (z.B. 32 bei 7B)       │
│   │  Attention   │  "Welche Tokens sind relevant?"       │
│   │  + FFN       │  Gewichtete Verknüpfungen             │
│   └──────┬───────┘                                      │
│          ▼                                              │
│   ┌──────────────┐                                      │
│   │  Output Head │  Wahrscheinlichkeiten für             │
│   └──────┬───────┘  nächstes Token                      │
│          ▼                                              │
│   Output: "Wien" (p=0.97)                               │
│                                                         │
│   Parameter = Gewichte in Attention + FFN Schichten      │
│   7B = 7 Milliarden Gewichte ≈ 4-8 GB VRAM              │
└─────────────────────────────────────────────────────────┘
```

ChatGPT benutzt es. Karpathy baut es. Die meisten können nicht erklären was es ist.

Das ist kein Vorwurf — die meisten Erklärungen sind entweder zu simpel ("es denkt wie ein Mensch") oder zu abstrakt ("es ist ein stochastischer Papagei"). Beides hilft nicht weiter.

Hier ist was wirklich passiert.

## Das Grundprinzip: Token-Prediction

Ein Large Language Model macht genau eine Sache: Es sagt vorher, welches Wort (genauer: welcher Token) als nächstes kommt.

Das klingt trivial. Ist es nicht.

Wenn du "Die Hauptstadt von Österreich ist" eingibst, hat ein gut trainiertes Modell Millionen ähnliche Texte gesehen und weiß: Das nächste Token ist mit sehr hoher Wahrscheinlichkeit "Wien". Wenn du aber "Erklär mir Quantenmechanik so wie ich 5 bin" eingibst, muss das Modell aus seinen Trainingsdaten eine Antwort zusammenbauen, die gleichzeitig kindgerecht und korrekt ist.

Das ist keine Suche. Das ist Kompression und Rekonstruktion von Wissen.

Token sind übrigens keine Wörter — sie sind Zeichenfolgen. "Österreich" kann ein einzelner Token sein. "unvorhergesehen" werden vielleicht in drei Tokens aufgeteilt. GPT-4 nutzt etwa 100.000 verschiedene Tokens, Llama-3-Modelle ähnlich viele.

## Kein Suchindex, keine Datenbank

Hier liegt das größte Missverständnis: Ein LLM ist keine Suchmaschine und keine Datenbank.

Google findet Dokumente, die existieren. Ein LLM generiert Antworten, die so noch nie existiert haben — aus komprimiertem Musterwissen. Das ist der Grund, warum ein Modell auf eine Frage über ein Ereignis von gestern keine sinnvolle Antwort geben kann: Es hat keine Verbindung zum Internet und kein aktuelles Wissen.

Das Wissen eines Modells ist eingefroren zum Zeitpunkt des Trainings. Das nennt sich Knowledge Cutoff.

## Warum Modelle manchmal lügen

Halluzination ist kein Bug, der noch gefixt wird. Es ist eine direkte Folge des Funktionsprinzips.

Das Modell hat kein Wahrheitsmodul. Es hat keine Möglichkeit zu "wissen", ob eine Aussage korrekt ist — es kann nur bewerten, wie wahrscheinlich eine Folge von Tokens gegeben dem Kontext ist. Wenn eine falsche Aussage in den Trainingsdaten häufig ähnlich wie eine wahre Aussage formuliert war, wird das Modell sie mit ähnlicher Konfidenz ausgeben.

Das ist der Grund, warum man LLM-Outputs in kritischen Bereichen immer verifiziert.

## Was "Parameter" bedeutet

Kurz und direkt: Parameter sind die Zahlen, die beim Training angepasst wurden. Ein Modell mit 7 Milliarden Parametern hat 7 Milliarden Gewichte in einem neuronalen Netz. Mehr Parameter bedeutet in der Regel mehr Kapazität für Wissen — aber auch mehr RAM-Bedarf und langsamere Inferenz.

Ein 7B-Modell braucht etwa 4–8 GB VRAM, ein 27B-Modell etwa 16–20 GB. Das ist relevant wenn du lokal arbeitest.

## Die Architektur dahinter

Alle modernen LLMs basieren auf der Transformer-Architektur, die 2017 von Google Brain vorgestellt wurde. Das Paper heißt "Attention Is All You Need" — und der Titel ist Programm. [Quelle: Vaswani et al., 2017](https://arxiv.org/abs/1706.03762)

Die zentrale Idee: Attention erlaubt dem Modell, beim Verarbeiten eines Tokens gleichzeitig auf alle anderen Tokens im Kontext zu achten — gewichtet nach Relevanz. Das macht Transformer so viel leistungsfähiger als frühere Architekturen.

Andrej Karpathy hat das in seinem Blog schon früh als überraschend effektiv beschrieben — zuerst für RNNs, später für Transformer. Sein Artikel "The Unreasonable Effectiveness of Recurrent Neural Networks" ist immer noch lesenswert als Einstieg in das Thema. [Quelle: karpathy.github.io](https://karpathy.github.io/2015/05/21/rnn-effectiveness/)

Wer tiefer einsteigen will: Karpathys `llm.c` Projekt implementiert einen GPT-2-ähnlichen Transformer in 1.000 Zeilen C. Keine Abstraktionen, kein Framework. [Quelle: github.com/karpathy/llm.c](https://github.com/karpathy/llm.c)

## Was das für dich bedeutet

LLMs sind mächtige Werkzeuge für Textzusammenfassung, Klassifikation, Codegenerierung, Übersetzung und Extraktion. Sie sind keine allwissenden Assistenten und kein Ersatz für Expertenwissen.

Das Wichtige: Du brauchst nicht OpenAI dafür. Modelle wie Qwen, Llama oder Mistral laufen lokal — auf deiner Hardware, ohne API-Kosten, ohne dass ein einziges Byte das Netzwerk verlässt.

---

**Jetzt weißt du was ein LLM ist. Der nächste Schritt: warum du es lokal betreiben solltest — und was das für DSGVO und EU AI Act bedeutet.**

→ **[Stufe 1: Warum du kein ChatGPT im Unternehmen nutzen solltest](/blog/2026-03-12-warum-lokale-ki-statt-cloud)**
