---
title: "Warum du kein ChatGPT im Unternehmen nutzen solltest — und was stattdessen"
date: "2026-03-12"
description: "DSGVO Art. 5, EU AI Act, Datentransfer in die USA: Die drei Gründe warum Self-Hosted AI für Unternehmen Pflicht ist."
summary: "DSGVO Art. 5, EU AI Act, Datentransfer in die USA: Die drei Gründe warum Self-Hosted AI für Unternehmen Pflicht ist."
tags: ["DSGVO", "Local AI", "ChatGPT", "Compliance", "Anfänger"]
author: "AI Engineering"
series: "Lokaler AI-Stack: Von 0 bis Production"
seriesStep: 1
---

# Warum du kein ChatGPT im Unternehmen nutzen solltest — und was stattdessen

| Kriterium | Cloud AI (ChatGPT) | Lokale AI (Ollama) |
|-----------|--------------------|--------------------|
| Datenspeicherung | US-Server (OpenAI) | Dein eigener Server |
| DSGVO-Konformität | AVV + SCCs + DSFA nötig | Out of the box |
| EU AI Act Kontrolle | Blackbox, kein Zugriff | Volle Transparenz |
| API-Kosten | Pro Token, laufend | Einmalig Hardware |
| Modellqualität | GPT-4 (Spitze) | 7B-27B (solide) |
| Latenz | Netzwerkabhängig | Lokal, sofort |
| Verfügbarkeit | Abhängig von OpenAI | Deine Infrastruktur |
| Datentransfer USA | Ja (Schrems-II Risiko) | Kein Byte verlässt das Netz |

Jedes Mal wenn dein Mitarbeiter ChatGPT nutzt, verlassen Firmendaten den EU-Rechtsraum.

Das ist keine Übertreibung. Das ist was passiert, wenn jemand ein Kundendokument, eine interne E-Mail oder einen Vertragsentwurf in die Eingabemaske tippt. Der Text geht an OpenAI-Server in den USA. Was dort damit passiert — für Training, Logging, Compliance — liegt nicht in deiner Hand.

## Grund 1: DSGVO Art. 5 — Integrität und Vertraulichkeit

Die DSGVO schreibt in Art. 5 Abs. 1 lit. f) vor, dass personenbezogene Daten in einer Weise verarbeitet werden müssen, "die eine angemessene Sicherheit der personenbezogenen Daten gewährleistet, einschließlich Schutz vor unbefugter oder unrechtmäßiger Verarbeitung und vor unbeabsichtigtem Verlust, unbeabsichtigter Vernichtung oder unbeabsichtigter Schädigung durch geeignete technische und organisatorische Maßnahmen." [Quelle: EUR-Lex DSGVO](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679)

Wenn Kundendaten, Mitarbeiterdaten oder Vertragsinhalte über eine externe API übertragen werden, braucht das mindestens:

- Einen Auftragsverarbeitungsvertrag (AVV) mit OpenAI
- Standard-Vertragsklauseln (SCCs) für den Drittlandtransfer in die USA
- Eine dokumentierte Datenschutz-Folgenabschätzung (DSFA)

In der Praxis haben die wenigsten KMUs das vollständig umgesetzt. Die meisten Mitarbeiter nutzen ChatGPT ohne jede Rechtsgrundlage.

NOYB (None of Your Business), die österreichische Datenschutzorganisation, hat bereits Beschwerden gegen OpenAI wegen DSGVO-Verstößen eingereicht. [Quelle: noyb.eu](https://noyb.eu/en/noyb-files-complaint-against-chatgpt-maker-openai)

## Grund 2: EU AI Act — Deadline 2. August 2026

Ab dem 2. August 2026 gelten die Hochrisiko-Anforderungen des EU AI Acts vollständig. [Quelle: EUR-Lex EU AI Act](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689)

Was das konkret bedeutet: Wer AI-Systeme in Hochrisikobereichen einsetzt — Personalentscheidungen, Kreditvergabe, Sicherheitsinfrastruktur — muss ein Qualitätsmanagementsystem nachweisen, technische Dokumentation führen und eine Konformitätsbewertung durchführen.

Das ist schwer, wenn das Modell ein Black Box in der Cloud ist. Wer lokal betreibt, hat vollständige Kontrolle über:

- Welche Modellversion läuft
- Welche Daten verarbeitet werden
- Was protokolliert wird und was nicht

Das ist kein theoretischer Vorteil — das ist der Unterschied zwischen nachweisbarer Compliance und einem Haftungsrisiko.

## Grund 3: Datentransfer in die USA

Seit dem Schrems-II-Urteil des EuGH (2020) ist der Datentransfer in die USA rechtlich kompliziert. Das EU-US Data Privacy Framework (2023) gibt es zwar, aber es ist juristisch umstritten — weitere Klagen sind bereits anhängig. [Quelle: noyb.eu zum DPF](https://noyb.eu/en/us-surveillance-law-incompatible-eu-law-noyb-files-new-complaints-after-dpf)

Für Unternehmen, die auf Rechtssicherheit angewiesen sind: Selbst mit gültigem AVV und SCCs bleibt das Risiko, dass das Fundament unter dem Transfer rechtlich wegbricht.

Die einfachste Lösung: Daten verlassen das Netz nicht.

## Was "lokal" konkret bedeutet

Lokal heißt: Das Modell läuft auf deiner Hardware, in deinem Netzwerk. Kein API-Call geht nach draußen. Kein Token verlässt den Server.

Das ist mit heutiger Hardware erreichbar. Eine RTX 3090 (gebraucht ab ca. 600–800 EUR) schafft Modelle mit 27 Milliarden Parametern in guter Qualität. Für kleinere Aufgaben reicht eine RTX 2060 oder sogar CPU-only.

**Ollama** ist die einfachste Möglichkeit, das umzusetzen. Ein einzelner Befehl, und das Modell läuft:

```bash
ollama run qwen2.5:7b
```

Keine Registrierung. Kein API-Key. Kein Cloud-Vertrag. Das Modell läuft lokal, antwortet in Sekunden, und kein Byte verlässt das Netzwerk.

Wir betreiben unseren kompletten AI-Stack so — für Zusammenfassungen, Content-Erstellung, Meeting-Transkription und Automatisierungen. Alles lokal, alles DSGVO-konform out of the box.

## Die ehrliche Abwägung

Lokale Modelle sind kleiner als GPT-4. Für die meisten Business-Aufgaben — Zusammenfassungen, Klassifikation, Entwürfe, Übersetzungen — reichen 7B bis 27B Modelle aber vollständig aus.

Der Trade-off: etwas weniger Modellqualität an der Spitze vs. vollständige Datenkontrolle, keine laufenden API-Kosten, und rechtliche Sicherheit. Für die meisten Unternehmen ist das kein schwieriger Trade-off.

---

**Die Compliance-Argumente sind klar. Der nächste Schritt: Ollama in 5 Minuten installieren und das erste Modell lokal betreiben.**

→ **[Stufe 2: Terminal-Grundlagen für AI-Entwickler](/blog/2026-03-12-terminal-grundlagen-fuer-ai)**

---

Wenn du die DSGVO-Dokumentation für deinen AI-Einsatz brauchst: Das [DSGVO Compliance Bundle](/produkte) enthält Verarbeitungsverzeichnis, DSFA-Vorlage, AVV-Muster und eine AI-spezifische Checkliste für den EU AI Act — EUR 79, sofort einsetzbar.
