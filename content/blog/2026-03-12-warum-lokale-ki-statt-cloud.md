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

## Konkretes Kostenbeispiel: Cloud vs. Lokal

Nehmen wir ein mittelständisches Unternehmen, das AI für Kundensupport-Zusammenfassungen, interne Dokumentanalyse und E-Mail-Entwürfe nutzt. Angenommen: 1.000 Anfragen pro Tag, durchschnittlich 500 Input-Tokens und 300 Output-Tokens pro Anfrage.

**Cloud-Kosten (OpenAI GPT-4o):**
- Input: 1.000 × 500 Tokens × $2,50 / 1M Tokens = $1,25 pro Tag
- Output: 1.000 × 300 Tokens × $10,00 / 1M Tokens = $3,00 pro Tag
- Tageskosten: ca. $4,25
- Monatskosten: ca. $127,50
- Jahreskosten: ca. $1.530

Bei GPT-4 (nicht GPT-4o) liegen die Kosten bei ca. $30/Tag — also $10.950/Jahr. Und das skaliert linear: doppeltes Volumen, doppelte Kosten.

**Lokale Kosten (Ollama + RTX 3090):**
- Einmalig: gebrauchte RTX 3090 ca. EUR 700, oder eine RTX 4060 Ti 16GB ca. EUR 450
- Strom: ca. 300W unter Last, bei 8h/Tag = 2,4 kWh × EUR 0,30 = EUR 0,72/Tag
- Monatskosten Strom: ca. EUR 22
- Jahreskosten Strom: ca. EUR 264

Die Hardware amortisiert sich bei Cloud-Vergleich mit GPT-4o nach ca. 6 Monaten. Bei GPT-4 nach weniger als einem Monat. Danach fallen nur noch Stromkosten an.

Der Haken: Die lokalen Modelle (7B-27B Parameter) liefern nicht die gleiche Spitzenqualität wie GPT-4. Für die genannten Aufgaben — Zusammenfassungen, Klassifikation, Entwürfe — ist der Unterschied in der Praxis aber selten geschäftsrelevant.

## DSGVO: Die echten Risiken

Die DSGVO-Problematik geht tiefer als "Daten gehen in die USA". Hier die konkreten Risiken:

**Schrems II und der unsichere Drittlandtransfer.** Der EuGH hat 2020 im Schrems-II-Urteil den EU-US Privacy Shield für ungültig erklärt. Der Nachfolger, das EU-US Data Privacy Framework (DPF), steht seit 2023. Aber: Die zugrundeliegende US-Gesetzgebung (FISA Section 702, Executive Order 12333) hat sich nicht substantiell geändert. NOYB hat bereits angekündigt, auch das DPF anzufechten. Das Risiko eines "Schrems III" ist real. [Quelle: noyb.eu](https://noyb.eu/en/us-surveillance-law-incompatible-eu-law-noyb-files-new-complaints-after-dpf)

**Bußgelder.** Die DSGVO sieht Bußgelder von bis zu 20 Millionen Euro oder 4% des weltweiten Jahresumsatzes vor — je nachdem, was höher ist. Die italienische Datenschutzbehörde (Garante) hat ChatGPT 2023 vorübergehend gesperrt. Die polnische Behörde hat 2024 ein Bußgeld gegen einen Datenbroker wegen mangelnder Transparenz bei AI-Verarbeitung verhängt.

**Beweislastumkehr.** Unter der DSGVO muss der Verantwortliche (also dein Unternehmen) nachweisen, dass die Verarbeitung rechtmäßig ist — nicht die Behörde muss nachweisen, dass sie es nicht ist. Wenn du nicht dokumentieren kannst, wo Daten verarbeitet werden, hast du ein Problem.

**Mitarbeiter-Nutzung ohne Rechtsgrundlage.** Das unterschätzte Risiko: Mitarbeiter nutzen ChatGPT auf eigene Faust, ohne dass die IT-Abteilung davon weiß. Kundennamen, Vertragsinhalte, Personaldaten — alles landet in einem System ohne AVV, ohne DSFA, ohne dokumentierte Rechtsgrundlage. Das ist keine theoretische Gefahr, das passiert täglich in deutschen Unternehmen.

## Wann Cloud BESSER ist

Ehrliche Antwort: Es gibt Szenarien, in denen Cloud-AI die bessere Wahl ist.

**Spitzenqualität bei komplexem Reasoning.** Wenn du ein Modell brauchst, das 100-seitige juristische Dokumente analysiert und dabei subtile Widersprüche findet, ist GPT-4 oder Claude aktuell besser als jedes lokal betreibbare Modell. Die Lücke schließt sich, aber sie existiert noch.

**Kein eigenes AI-Team.** Wenn du weder die Kapazität noch das Know-how hast, eine lokale Infrastruktur aufzusetzen und zu warten, ist eine verwaltete Cloud-Lösung pragmatisch sinnvoller als eine schlecht betriebene lokale Installation.

**Seltene, hochwertige Anfragen.** Wenn du nur 10-20 Anfragen pro Tag hast und keine sensiblen Daten verarbeitest, lohnt sich die Hardware-Investition wirtschaftlich nicht.

**Multimodale Aufgaben.** Bildanalyse, Video-Verständnis, Audio-Transkription auf Spitzenniveau — hier ist die Cloud-Infrastruktur (noch) deutlich überlegen, insbesondere bei Echtzeit-Anforderungen.

## Der Hybrid-Ansatz: Das Beste aus beiden Welten

In der Praxis fahren viele Unternehmen am besten mit einem hybriden Setup:

**Lokal für sensible Daten:** Alle Aufgaben, die personenbezogene Daten, Vertragsinhalte, Finanzdaten oder interne Strategiedokumente berühren, laufen über den lokalen Stack. Ollama + Open WebUI + ein 14B oder 27B Modell deckt das ab.

**Cloud für nicht-sensible Spezialaufgaben:** Marketing-Texte ohne Kundenbezug, allgemeine Recherche, Kreativ-Brainstorming — das kann über eine Cloud-API laufen, sofern ein gültiger AVV existiert und keine personenbezogenen Daten im Prompt stehen.

**Konkretes Setup:**
1. Lokaler Ollama-Server mit `qwen2.5:14b` für den täglichen Betrieb
2. Open WebUI als Interface für alle Mitarbeiter
3. n8n-Workflow, der bei Bedarf an eine Cloud-API weiterleitet — aber nur für explizit freigegebene, nicht-sensible Aufgaben
4. Klare Richtlinie: Personenbezogene Daten verlassen das Netzwerk nie

Das ist kein Kompromiss — das ist die architektonisch saubere Lösung. Sensible Daten bleiben lokal, rechenintensive Spezialaufgaben gehen in die Cloud, und die Entscheidung wird nicht dem einzelnen Mitarbeiter überlassen, sondern technisch durchgesetzt.

## Die ehrliche Abwägung

Lokale Modelle sind kleiner als GPT-4. Für die meisten Business-Aufgaben — Zusammenfassungen, Klassifikation, Entwürfe, Übersetzungen — reichen 7B bis 27B Modelle aber vollständig aus.

Der Trade-off: etwas weniger Modellqualität an der Spitze vs. vollständige Datenkontrolle, keine laufenden API-Kosten, und rechtliche Sicherheit. Für die meisten Unternehmen ist das kein schwieriger Trade-off.

---

**Die Compliance-Argumente sind klar. Der nächste Schritt: Ollama in 5 Minuten installieren und das erste Modell lokal betreiben.**

→ **[Stufe 2: Terminal-Grundlagen für AI-Entwickler](/blog/2026-03-12-terminal-grundlagen-fuer-ai)**

---

Wenn du die DSGVO-Dokumentation für deinen AI-Einsatz brauchst: Das [DSGVO Compliance Bundle](/produkte) enthält Verarbeitungsverzeichnis, DSFA-Vorlage, AVV-Muster und eine AI-spezifische Checkliste für den EU AI Act — EUR 79, sofort einsetzbar.
