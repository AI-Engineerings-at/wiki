---
title: "Unsere Content-Pipeline: Von RSS bis Social Media"
date: "2026-03-07"
summary: "Wie wir mit n8n, Ollama und ComfyUI eine vollständig lokale Content-Pipeline aufgebaut haben — DSGVO-konform und ohne Cloud."
tags: ["n8n", "ollama", "comfyui", "automation", "local-first", "dsgvo"]
author: "AI Engineering"
---

# Unsere Content-Pipeline: Von RSS bis Social Media

<figure style="margin: 2rem 0;">
  <img src="/images/blog/content-pipeline-launch.png" alt="Content Pipeline von RSS bis Social Media" style="border-radius: 12px; width: 100%;" />
  <figcaption style="text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-top: 0.5rem;">Unsere Content-Pipeline: Von RSS-Aggregation bis Multi-Plattform Publishing</figcaption>
</figure>

Bei AI Engineering läuft die gesamte Content-Erstellung lokal auf unserer eigenen Infrastruktur. Kein Byte verlässt unser Netzwerk.

## Die Architektur

Unsere Pipeline besteht aus vier Stufen:

1. **RSS Aggregation** — 10 Quellen werden täglich ausgewertet
2. **AI Humanizer** — Ollama (Mistral Small) schreibt menschliche Texte
3. **Bildgenerierung** — ComfyUI mit FLUX.1 erstellt passende Bilder
4. **Multi-Plattform Publishing** — LinkedIn, Twitter, Facebook, Blog

Alles orchestriert durch n8n, alles lokal, alles DSGVO-konform.

## Warum lokal?

Die EU AI Act Deadline rückt naeher (2. August 2026). Unternehmen müssen nachweisen, wo ihre Daten verarbeitet werden. Mit unserem Setup ist die Antwort einfach: auf unseren eigenen Servern.

## Tech Stack

- **n8n** auf Docker Swarm — Workflow-Orchestrierung
- **Ollama** auf RTX 3090 (GPU-Server) — Text-Generierung
- **ComfyUI** auf RTX 3090 (GPU-Server) — Bild-Generierung
- **Social Poster** auf Fedora (Worker-Node) — CDP Browser-Automation

Mehr Details in unserem [n8n Workflow Bundle](/tools/n8n).
