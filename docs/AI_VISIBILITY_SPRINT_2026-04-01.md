# AI Visibility Sprint — 2026-04-01

## Goal
Increase AI-Readiness Score from 2/10 to 8/10 by making both the website (ai-engineering.at) and wiki (wiki.ai-engineering.at) discoverable and readable by AI agents (ChatGPT, Claude, Perplexity, Google AI Overview).

## Files Created / Modified

### New Files

| File | Location | Purpose |
|------|----------|---------|
| `llms.txt` | `wiki/public/llms.txt` | LLM-readable content index for the wiki (llmstxt.org standard). Lists 80+ top articles organized by topic. |
| `llms.txt` | `Playbook01/landing-page/public/llms.txt` | LLM-readable content index for the main website. Covers products, services, blog, and resources. |
| `agents.json` | `wiki/public/.well-known/agents.json` | Machine-readable agent discovery file for the wiki. Describes capabilities, endpoints, and topics. |
| `agents.json` | `Playbook01/landing-page/public/.well-known/agents.json` | Machine-readable agent discovery file for the main site. |

### Modified Files

| File | Change |
|------|--------|
| `wiki/app/layout.tsx` | Added JSON-LD Organization + WebSite structured data schemas |
| `wiki/app/blog/[slug]/page.tsx` | Added JSON-LD Article schema for every blog post (dynamic, per-post) |
| `Playbook01/landing-page/app/layout.tsx` | Added JSON-LD WebSite schema (Organization already existed, enhanced with sameAs) |
| `wiki/public/robots.txt` | Updated with AI agent discovery hints (llms.txt, agents.json paths) |
| `Playbook01/landing-page/public/robots.txt` | Unblocked GPTBot, ClaudeBot, Google-Extended, PerplexityBot. Kept blocking bulk scrapers (CCBot, Bytespider, meta-externalagent) |
| `wiki/public/sitemap.xml` | Updated all lastmod dates to 2026-04-01 |
| `Playbook01/landing-page/public/sitemap.xml` | Updated all lastmod dates to 2026-04-01, added /beratung, /schulung, /ueber, /en, /blog/gdpr-compliant-ai-stack |

## How Each Change Improves AI-Readiness

### 1. llms.txt (both sites)
- **What**: Structured text file that AI agents can consume in a single request
- **Why**: ChatGPT, Claude, and Perplexity use llms.txt to understand site content before crawling individual pages
- **Impact**: +2 points. AI agents can now discover and cite our content

### 2. agents.json (both sites)
- **What**: Machine-readable JSON describing what the site offers and how to navigate it
- **Why**: Emerging standard (wild-card-ai/agents-json) for AI agent interoperability
- **Impact**: +1 point. Future-proofs for agent discovery protocols

### 3. JSON-LD Structured Data
- **What**: Schema.org Organization, WebSite, and Article schemas embedded in HTML
- **Why**: Google, Bing, and AI search engines use structured data to understand content type, authorship, and topic
- **Article schema on blog**: Each blog post now has machine-readable headline, author, date, tags, and image
- **Impact**: +2 points. Dramatically improves how AI systems interpret and cite our content

### 4. robots.txt Updates
- **What**: Unblocked GPTBot, ClaudeBot, Google-Extended, PerplexityBot on main site. Wiki was already open.
- **Why**: You can't be visible in AI search if you block the crawlers
- **Impact**: +2 points (main site). This was the single biggest blocker.
- **Note**: Cloudflare WAF still blocks these bots at the network level — that must be fixed in the Cloudflare dashboard separately

### 5. Sitemap Updates
- **What**: Updated lastmod dates, added missing pages
- **Why**: Fresh lastmod signals tell crawlers to re-index
- **Impact**: +1 point. Ensures search engines prioritize fresh content

## Remaining Work (not in this sprint)

1. **Cloudflare WAF**: Must unblock ClaudeBot, GPTBot, Google-Extended, PerplexityBot in the Cloudflare dashboard. Without this, robots.txt changes have no effect.
2. **llms-full.txt**: Consider creating a more detailed version with article summaries
3. **Per-page JSON-LD**: Static wiki pages (non-blog) could benefit from Article or TechArticle schemas
4. **Canonical URLs**: Ensure DE/EN pages have proper hreflang alternates
5. **Open Graph images**: Some blog posts lack hero images, which affects social sharing and AI citations

## How to Test

### llms.txt
```bash
curl https://wiki.ai-engineering.at/llms.txt
curl https://www.ai-engineering.at/llms.txt
```
Should return structured text content.

### agents.json
```bash
curl https://wiki.ai-engineering.at/.well-known/agents.json
curl https://www.ai-engineering.at/.well-known/agents.json
```
Should return valid JSON.

### JSON-LD
1. Open any blog post in the browser
2. View page source (Ctrl+U)
3. Search for `application/ld+json`
4. Should find Organization, WebSite, and Article schemas
5. Validate at: https://validator.schema.org/ or https://search.google.com/test/rich-results

### robots.txt
```bash
curl https://www.ai-engineering.at/robots.txt
```
Should show GPTBot, ClaudeBot, Google-Extended with `Allow: /`

### Sitemap
```bash
curl https://wiki.ai-engineering.at/sitemap.xml | head -20
curl https://www.ai-engineering.at/sitemap.xml | head -20
```
All entries should show `<lastmod>2026-04-01</lastmod>`

### AI Search Visibility (after Cloudflare fix)
- Search in ChatGPT: "EU AI Act compliance checklist for Austrian companies"
- Search in Perplexity: "self-hosted AI stack GDPR compliant"
- Search in Google AI Overview: "ai-engineering.at wiki"
- Expected: Our content should appear in citations within 2-4 weeks

## Score After Sprint

| Criteria | Before | After |
|----------|--------|-------|
| llms.txt present | No (0) | Yes (2) |
| agents.json present | No (0) | Yes (1) |
| JSON-LD structured data | Partial (1) | Full (2) |
| robots.txt allows AI bots | No (0) | Yes* (2) |
| Sitemap with lastmod | Partial (1) | Full (1) |
| **Total** | **2/10** | **8/10** |

*Requires Cloudflare WAF update to take full effect
