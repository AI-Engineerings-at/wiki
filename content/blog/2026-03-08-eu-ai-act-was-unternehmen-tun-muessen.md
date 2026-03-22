---
title: "EU AI Act 2026: Was Unternehmen jetzt tun müssen"
date: "2026-03-08"
summary: "Am 2. August 2026 greifen die ersten Pflichten des EU AI Act. Risikokategorien, Dokumentationspflichten, und was Unternehmen konkret tun müssen — mit 5-Punkte-Checkliste."
tags: ["eu-ai-act", "dsgvo", "compliance", "unternehmen", "local-first", "regulierung"]
author: "AI Engineering"
---

# EU AI Act 2026: Was Unternehmen jetzt tun müssen

<figure style="margin: 2rem 0;">
  <img src="/images/blog/eu-ai-act-was-unternehmen-tun-muessen.png" alt="EU AI Act 2026 — Was Unternehmen tun müssen" style="border-radius: 12px; width: 100%;" />
  <figcaption style="text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-top: 0.5rem;">EU AI Act 2026: Risikokategorien und Pflichten für Unternehmen</figcaption>
</figure>

Am 2. August 2026 treten zentrale Teile des EU AI Act in Kraft. Das betrifft nicht nur Tech-Konzerne, sondern jedes Unternehmen in der EU, das AI-Systeme einsetzt — und das sind mittlerweile die meisten. Wer ChatGPT, Copilot oder eigene ML-Modelle nutzt, muss handeln.

Noch 5 Monate. Hier ist, was zu tun ist.

## Was der EU AI Act regelt

Der EU AI Act ist die weltweit erste umfassende AI-Regulierung. Er klassifiziert AI-Systeme nach Risiko und legt je nach Kategorie unterschiedliche Pflichten fest.

### Die 4 Risikokategorien

**Unannehmbares Risiko (verboten)**
AI-Systeme, die grundlegende Rechte verletzen. Dazu gehören: Social Scoring durch Behörden, biometrische Echtzeit-Überwachung im öffentlichen Raum (mit Ausnahmen), und Systeme, die menschliches Verhalten manipulieren. Diese Systeme dürfen in der EU nicht betrieben werden.

**Hohes Risiko**
AI in kritischen Bereichen: Personalauswahl, Kreditvergabe, Bildung, Strafverfolgung, medizinische Geräte. Hier greifen die strengsten Pflichten: Risikomanagement, Daten-Governance, technische Dokumentation, Logging, menschliche Aufsicht, Genauigkeits- und Robustheitsanforderungen.

**Begrenztes Risiko (Transparenzpflichten)**
Chatbots, generative AI, Deepfakes. Nutzer müssen informiert werden, dass sie mit einem AI-System interagieren. Generierte Inhalte müssen als solche gekennzeichnet sein. Das betrifft praktisch jedes Unternehmen, das Chatbots auf der Website hat oder AI-generierten Content veröffentlicht.

**Minimales Risiko**
Spamfilter, AI in Videospielen, einfache Empfehlungssysteme. Keine besonderen Pflichten, aber freiwillige Verhaltenskodizes werden empfohlen.

## Was das für Unternehmen bedeutet

Die meisten Unternehmen in der DACH-Region fallen in die Kategorien "begrenztes Risiko" und "hohes Risiko". Konkret heißt das:

### Dokumentationspflicht

Jedes AI-System muss dokumentiert sein: Welches Modell wird eingesetzt? Von welchem Anbieter? Welche Daten werden verarbeitet? Wo werden sie verarbeitet?

Wer ChatGPT über die API einbindet, muss dokumentieren, dass personenbezogene Daten an OpenAI (USA) übertragen werden. Wer Ollama lokal betreibt, schreibt in die Dokumentation: "Verarbeitung auf eigener Hardware im internen Netzwerk, keine Datenübertragung an Dritte."

### Transparenz gegenüber Nutzern

Wenn ein Chatbot auf der Firmenwebsite läuft, muss klar erkennbar sein, dass es sich um eine AI handelt. Das gilt auch für AI-generierte Texte, Bilder, und Audioinhalte. Ein einfacher Hinweis wie "Dieser Text wurde mit Hilfe von AI erstellt" reicht in vielen Fällen aus.

### Risikobewertung

Für Hochrisiko-Systeme (HR-Software, Kreditscoring, medizinische Anwendungen) wird eine formale Risikobewertung verlangt. Diese muss regelmäßig aktualisiert werden und umfasst: Genauigkeit des Modells, mögliche Verzerrungen (Bias), Auswirkungen auf betroffene Personen, und Maßnahmen zur Risikominderung.

### Logging und Nachvollziehbarkeit

Hochrisiko-Systeme müssen Logs führen, die eine Nachverfolgung ermöglichen. Welche Eingaben hat das System erhalten? Welche Ausgaben hat es produziert? Wann wurde das Modell zuletzt aktualisiert?

Bei Cloud-Anbietern ist das oft intransparent — man weiß nicht, welche Modellversion gerade läuft. Bei einem lokalen Setup kontrolliert man das selbst.

## Der Vorteil von Local-First

Unternehmen, die ihre AI-Systeme lokal betreiben, haben es bei der Compliance deutlich einfacher:

- **Datenverarbeitung:** Kein Drittlandtransfer, keine SCCs, keine DSFA für externe Anbieter
- **Modellkontrolle:** Genaue Versionierung, kein überraschendes Model-Update durch den Anbieter
- **Logging:** Volle Kontrolle über Log-Speicherung und -Aufbewahrung
- **Transparenz:** Man weiss genau, was das Modell kann und was nicht
- **Kosten:** Keine laufenden API-Gebühren, Hardware amortisiert sich schnell

Das heißt nicht, dass Cloud-AI verboten ist. Aber der Compliance-Aufwand ist bei lokaler Verarbeitung wesentlich geringer.

## 5-Punkte-Checkliste für Unternehmen

### 1. Bestandsaufnahme aller AI-Systeme

Welche AI-Tools werden im Unternehmen eingesetzt? Nicht nur offiziell, sondern auch inoffiziell (Mitarbeiter, die privat ChatGPT für Arbeitsaufgaben nutzen). Eine Liste mit: Tool-Name, Anbieter, Datentypen, Einsatzzweck, Risikokategorie.

### 2. Risikokategorisierung

Jedes identifizierte AI-System einer der vier Kategorien zuordnen. Im Zweifel: höhere Kategorie wählen. Die Bewertung sollte von jemandem gemacht werden, der sowohl die technischen als auch die rechtlichen Aspekte versteht.

### 3. Dokumentation erstellen

Für jedes System mit begrenztem oder hohem Risiko: technische Dokumentation, Datenfluss-Diagramm, Risikobeurteilung. Für Hochrisiko-Systeme zusätzlich: Qualitätsmanagementsystem, Genauigkeitsmetriken, Bias-Analyse.

### 4. Transparenzmaßnahmen umsetzen

Chatbots kennzeichnen, AI-generierten Content markieren, Nutzer informieren. Das ist oft der einfachste Schritt, wird aber am häufigsten vergessen.

### 5. Datenstrategie überprüfen

Wo werden AI-Daten verarbeitet? Wenn extern: welche Verträge bestehen? Wenn intern: ist die Infrastruktur dokumentiert? Ein lokaler AI-Stack löst viele dieser Fragen automatisch.

## Die Deadline nutzen

5 Monate klingt nach viel Zeit. Aber Dokumentation schreiben, Prozesse anpassen, und eventuell die AI-Infrastruktur umstellen braucht Zeit. Wer jetzt anfängt, hat genug Puffer. Wer bis Juni wartet, wird hektisch.

Der EU AI Act ist keine Strafe, sondern eine Chance. Unternehmen, die ihre AI-Nutzung früh dokumentieren und auf lokale Verarbeitung setzen, haben einen Wettbewerbsvorteil: Sie können ihren Kunden nachweisen, dass ihre Daten sicher sind. In der DACH-Region, wo Datenschutz ein Verkaufsargument ist, kann das den Unterschied machen.

## Zum Mitnehmen

Wir haben unsere Compliance-Vorlagen als [DSGVO Compliance Bundle](https://www.ai-engineering.at/products) zusammengestellt: 6 Templates für EUR 79. Enthalten: Verarbeitungsverzeichnis, Datenschutz-Folgenabschätzung (DSFA), Auftragsverarbeitungsvertrag (AVV), AI-Risikobewertung, Transparenzhinweise, und eine EU AI Act Compliance-Checkliste.
