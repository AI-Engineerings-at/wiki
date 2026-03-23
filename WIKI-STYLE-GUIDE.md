# Wiki & Blog Style Guide - AI Engineering

> Verbindliche Regeln fuer alle externen Inhalte. Stand: 2026-03-20.
> Maschinenlesbare Version: siehe interne Dokumentation
> SSOT-Hierarchie: `docs/BRAND-BIBLE-V2.md` -> `PRODUCT_STYLE_GUIDE.md` -> `docs/PUBLIC_MESSAGING_MATRIX.md` -> dieses Dokument

## 1. Sprache & Ton

- **Deutsch**, Du-Form, oesterreichisch-informell
- Direkt, technisch praezise, praxis-orientiert
- Keine Marketing-Sprache, kein Filler
- Ehrlich ueber Limitationen ("Funktioniert ab 16GB RAM. Unter 16GB: nicht empfohlen.")
- Technische Begriffe auf Englisch (Docker Compose, Self-hosted, AI-Stack)

## 1.1 Messaging-Hierarchie

- **Brand Bible V2** bestimmt Identitaet und Grundton.
- **Product Style Guide** bestimmt Produkt- und Marketing-Sprache.
- **Public Messaging Matrix** bestimmt Company Promise, Proof Pillars und CTA-Routing.
- Dieses Dokument bestimmt nur Format, Plattform-Regeln und Sanitizing fuer externe Inhalte.

## 2. Verbotene Phrasen (Humanizer Score >= 85)

Jeder Text wird automatisch gegen diese Patterns geprueft. Score < 85 = automatischer Rewrite via Ollama.

**Nie verwenden:**
- serves as, stands as, groundbreaking, vibrant, breathtaking, pivotal
- tapestry, landscape of, nestled, delve, foster, garner, intricate
- revolutionaer, bahnbrechend, Gamechanger, cutting-edge
- "it is important to note", "in today's fast-paced", "not just X but Y"
- "Ich bin begeistert", "Additionally", "In order to", "Due to the fact that"
- "rapidly evolving", "underscore", "crucial"

**Stattdessen:** Einfache, direkte Saetze. "ist" statt "serves as". Fakten statt Floskeln.

## 3. Artikel-Struktur

### Wiki-Artikel
```text
# Titel (H1)

Intro: 1-2 Saetze, worum es geht.

## Section 1 (H2)
Inhalt mit Code-Beispielen und Tabellen.

## Section 2 (H2)
...

## Checkliste
- [ ] Punkt 1
- [ ] Punkt 2
```

### Blog-Artikel
Wie Wiki, aber mit CTA am Ende:
```text
## Zum Mitnehmen

Unser [Produkt-Name](Stripe-Link) fuer EUR X enthaelt alles was du brauchst.
Wer tiefer rein will: zuerst Wiki-Artikel verlinken, dann relevantes Produkt nennen.
```

## 4. Code-Beispiele

- **IMMER** mit Language-Tag: ` ```bash `, ` ```python `, ` ```json `
- **Copy-paste-ready**: Keine Platzhalter ohne Erklaerung
- **Erwartete Ausgabe** zeigen wo sinnvoll
- JSON: valide (keine Trailing Commas)
- YAML: 2 Spaces Einrueckung (keine Tabs)

## 5. Anonymisierung (PFLICHT)

**NIEMALS** interne Infrastruktur-Details in externen Inhalten!

| Intern | Platzhalter |
|--------|-------------|
| 10.40.10.90 / .90 | GPU-Server |
| 10.40.10.99 / .99 | Worker-Node |
| 10.40.10.80 / .80 | Manager-Node |
| 10.40.10.82 / .82 | DB-Node |
| 10.40.10.83 / .83 | Swarm-Leader |
| :5678 | :\<n8n-port\> |
| :8188 | :\<comfyui-port\> |
| :8099 | :\<poster-port\> |
| :3000 | :\<grafana-port\> |
| :8065 | :\<mm-port\> |
| #echo_log | #team-channel |

**Ausnahme:** Ollama Port `:11434` darf bleiben (de-facto Standard).
**Behalten:** Service-Namen, Modell-Namen, Hardware-Specs (oeffentlich bekannt).

Alle Inhalte laufen automatisch durch den Sanitizer (`/content/sanitize` Endpoint).

## 6. Frontmatter (PFLICHT)

```yaml
---
title: "Artikel-Titel auf Deutsch"
date: "YYYY-MM-DD"
summary: "1-2 Saetze Zusammenfassung fuer Listing."
tags: ["tag1", "tag2", "tag3"]
author: "AI Engineering"
---
```

## 7. Terminologie

| Richtig | Falsch |
|---------|--------|
| Docker Compose | docker-compose, Docker-Compose |
| n8n | N8N, N8n |
| Ollama | OLLAMA |
| Self-hosted | selfhosted, self hosted |
| DSGVO | GDPR (ausser EU-weiter Kontext) |
| AI-Stack | AI Stack, AIStack |
| EU AI Act | EU-AI-Act |

## 8. Plattform-Anpassung

| Plattform | Laenge | Sprache | Code | CTA | Besonderheit |
|-----------|--------|---------|------|-----|-------------|
| Wiki | Unbegrenzt | DE, Du | Ja | Nein | Checkliste am Ende |
| Blog | Unbegrenzt | DE, Du | Ja | Ja (Stripe) | Help-first, dann relevanter CTA |
| LinkedIn | Max 3000 | DE, Du | Nein | Link | Hook-Opener Pflicht, knowledge-first |
| Twitter | Max 277 | DE, Du | Nein | Link | Auto-Truncation |
| Dev.to | Unbegrenzt | EN! | Ja | Link | Tags Pflicht, Canonical URL |

## 8.1 CTA-Routing

- **Educational Content** -> Wiki oder Artikel zuerst
- **Compliance-Problem Content** -> aktuelles Compliance-Angebot
- **Founder/Trust Content** -> About-Seite oder Wiki mit soft CTA
- Kein harter Pitch ohne passenden inhaltlichen Kontext

## 9. Automatisierung

Der Content Processor (`content_processor.py`) auf dem Social Poster erzwingt diese Regeln:

1. **Generierung**: Ollama mit plattform-spezifischem System-Prompt
2. **Humanizer**: Score-Check >= 85, automatischer Rewrite bei Bedarf
3. **Sanitizer**: Anonymisierung aller internen Details
4. **Platform-Adapter**: Laenge, Format, CTA-Anpassung, Messaging-Routing
5. **Approval**: Alles landet im Team-Chat zur Freigabe durch Joe

Kein Content wird ohne Humanizer + Sanitizer veroeffentlicht.

## Bilder & Thumbnails

### Kachel-Bilder (Thumbnails)
- Groesse: 200x150px Display, 512x384px Source
- Format: WebP bevorzugt, PNG Fallback
- Max Dateigroesse: 50KB
- Pfad: /public/images/thumbnails/<kategorie>/<slug>.webp
- Alt-Text: Immer beschreibend ("Docker Logo" nicht "Bild")
- Fallback: Kategorie-Emoji wenn kein Thumbnail vorhanden

### Bild-Prioritaeten
1. Offizielle Tool-Logos (Docker, Ollama, n8n, etc.)
2. ComfyUI-generierte Bilder (Konzepte ohne Logo)
3. Emoji (NUR als Fallback fuer kleine Elemente)

### Grosses Emoji als Hauptbild = VERBOTEN
Grosse Emojis als Hauptbild wirken unprofessionell. Immer echtes Bild verwenden.

## 10. Qualitaets-Checkliste

- [ ] Du-Form verwendet
- [ ] Keine AI-Floskeln (Humanizer Score >= 85)
- [ ] Keine internen IPs, Ports, Node-Namen (Sanitizer clean)
- [ ] Code-Beispiele mit Language-Tag und erwarteter Ausgabe
- [ ] Frontmatter vollstaendig (title, date, summary, tags, author)
- [ ] Terminologie konsistent
- [ ] Plattform-spezifische Regeln eingehalten
- [ ] CTA nur in Blog-Artikeln (nicht Wiki)
- [ ] Company Promise und Proof Pillars bleiben konsistent
- [ ] Laut vorlesen: klingt natuerlich, nicht generiert
