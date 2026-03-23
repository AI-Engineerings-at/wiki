---
name: wiki-legal-check
description: Use before publishing content with external sources, logos, or legal references. Verifies licensing, citation compliance, and content rights. Required before any content from arXiv, EUR-Lex, HF, or external blogs.
version: 1.0.0
---

# Wiki Legal Check Skill

Verify legal compliance of wiki content before publishing.

## When to Use
- Before adding external logos/images
- Before publishing paper summaries
- Before compliance articles with legal citations
- When using content from third-party sources

## Checklist

### Content Rights
- [ ] No full-text copying (summaries + own commentary only)
- [ ] Source properly cited (title, authors, link, date)
- [ ] "Zusammenfassung durch AI Engineering" disclaimer present
- [ ] Screenshots used under fair use (educational/review)

### Logo/Image Rights
- [ ] License checked (see table below)
- [ ] Open Source logo → allowed for editorial use
- [ ] Proprietary logo → brand guidelines checked
- [ ] AI-generated image → no copyright issues (our own generation)

### Legal Citations
- [ ] Laws cited with official source (EUR-Lex, RIS, dsb.gv.at)
- [ ] Article numbers correct
- [ ] "Stand: YYYY-MM-DD" date present on compliance articles
- [ ] Disclaimer: "Kein Ersatz fuer Rechtsberatung"

### Content Neutrality (Rechtliches Risiko)
Fear-Marketing Behauptungen sind rechtlich riskant (UWG, Irrefuehrung). Immer differenziert formulieren:
- [ ] Keine absoluten Negativ-Claims ohne Differenzierung
  - Falsch: "X ist nicht DSGVO-konform" → Richtig: "X KANN konform sein, WENN [Bedingungen]"
- [ ] Keine pauschalen Diskreditierungen von Wettbewerbern
- [ ] Rechtliche Aussagen mit Quellenbeleg versehen
- [ ] Bei Unsicherheit: Joe fragen statt raten

## License Quick Reference
| Source | License | Can We Use? |
|--------|---------|-------------|
| arXiv papers | Various (CC BY common) | Summarize yes, copy no |
| EU regulations | Public domain | Freely cite with link |
| Austrian laws (RIS) | Public domain | Freely cite with link |
| Open Source logos | Per project license | Usually yes (editorial) |
| HF model cards | CC-licensed | Yes with attribution |
| Proprietary logos | Brand guidelines | CHECK FIRST |

## Citation Template
```markdown
## Quellen
- **Original:** [Title] ([Year])
- **Autoren:** [Authors]
- **Link:** [URL]
- **Lizenz:** [License if applicable]
- *Zusammenfassung und Einordnung durch AI Engineering*
```
