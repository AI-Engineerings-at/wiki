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

Die EU AI Act Deadline rückt näher (2. August 2026). Unternehmen müssen nachweisen, wo ihre Daten verarbeitet werden. Mit unserem Setup ist die Antwort einfach: auf unseren eigenen Servern.

## Tech Stack

- **n8n** auf Docker Swarm — Workflow-Orchestrierung
- **Ollama** auf RTX 3090 (GPU-Server) — Text-Generierung
- **ComfyUI** auf RTX 3090 (GPU-Server) — Bild-Generierung
- **Social Poster** auf Fedora (Worker-Node) — CDP Browser-Automation

## Wie die Pipeline konkret funktioniert

Die RSS-Aggregation läuft als n8n-Workflow, der alle 6 Stunden 10 vordefinierte Quellen abfragt — darunter Fachblogs, GitHub Trending und Branchen-Newsletter. Neue Einträge werden dedupliziert und in eine Warteschlange geschrieben.

Aus dieser Warteschlange zieht der AI Humanizer einzelne Artikel. Ollama erhält den Originaltext zusammen mit einem System-Prompt, der Tonalität, Zielgruppe und Länge vorgibt. Das Ergebnis ist kein umgeschriebener Artikel, sondern ein eigenständiger Text, der das Thema aus unserer Perspektive behandelt. Mistral Small 3.1 24B ist dafür das bevorzugte Modell — schnell genug für Batch-Verarbeitung und qualitativ ausreichend für Social-Media-Texte.

Die Bildgenerierung über ComfyUI nutzt FLUX.1-schnell als Basis-Modell. Jeder generierte Text bekommt automatisch ein passendes Bild zugewiesen, basierend auf einem Prompt, den Ollama aus dem fertigen Text ableitet. Das Bild wird lokal gespeichert und dem Post zugeordnet.

Der Social Poster ist ein Node.js-Service, der über das Chrome DevTools Protocol (CDP) Beiträge auf LinkedIn, Twitter und Facebook veröffentlicht. Keine offiziellen APIs — stattdessen Browser-Automation, weil die API-Zugänge für organische Posts bei den meisten Plattformen eingeschränkt oder kostenpflichtig sind.

Die gesamte Kette — vom RSS-Feed bis zum veröffentlichten Social-Media-Post — läuft ohne manuellen Eingriff. Fehler werden über Grafana-Alerts gemeldet. Die durchschnittliche Verarbeitungszeit pro Artikel liegt bei 4-6 Minuten, davon ca. 90 Sekunden für die Bildgenerierung.

Mehr Details in unserem [n8n Workflow Bundle](/tools/n8n).
