# Wiki Real Thumbnails — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all 22 SVG placeholder thumbnails with real ComfyUI-generated images and fix remaining wiki issues (EN sidebar slugs, missing thumbnails for 7 articles).

**Architecture:** Create a dedicated ComfyUI thumbnail workflow (512x384, no overlay), generate 60 images via API, optimize to WebP <50KB, update articles.ts, verify via E2E tests.

**Tech Stack:** ComfyUI (FLUX.2 Dev FP8 on .90), Sharp/cwebp for optimization, Playwright E2E

**Prerequisite:** ComfyUI on .90 must be running with FLUX.2 Dev FP8 models loaded. Ollama on .90 must be unloaded before generation (`POST :11434/api/generate {"model":"qwen3.5:27b","keep_alive":0}`).

---

## Current State

| Metric | Value |
|--------|-------|
| Total articles | 60 |
| Articles with SVG placeholder thumbnails | 18 (tools only) |
| Articles with no thumbnail at all | 42 (grundlagen, compliance, patterns, security, papers, oesterreich, downloads) |
| SVG files to replace | 16 (tools/) + 5 (category defaults) = 21 |
| Real ComfyUI images needed | 60 (one per article) |
| EN Sidebar slug bug | /en/oesterreich/ should be /en/austria/ |

## File Map

### New Files
| File | Purpose |
|------|---------|
| `media/comfyui-workflows/flux2-wiki-thumbnail.json` | ComfyUI workflow for thumbnail generation (512x384, no overlay) |
| `scripts/generate-thumbnails.py` | Python script: reads articles.ts, generates prompts, calls ComfyUI API, downloads results |
| `scripts/optimize-thumbnails.sh` | Converts PNG to WebP, resizes to 200x150, ensures <50KB |
| `public/images/thumbnails/<category>/<slug>.webp` | 60 real thumbnail images |

### Modified Files
| File | Changes |
|------|---------|
| `lib/articles.ts` | Add thumbnail paths for all 42 missing articles, fix 18 SVG paths to .webp |
| `components/Sidebar.tsx` | Use getEnHref() for EN article links |
| `WIKI-STYLE-GUIDE.md` | Update thumbnail section: no SVG placeholders, only real images |

### Deleted Files
| File | Reason |
|------|--------|
| `public/images/thumbnails/tools/*.svg` | Replaced by real .webp images |
| `public/images/thumbnails/*/default.svg` | Replaced by real .webp images |
| `public/images/thumbnails/*/.gitkeep` | No longer needed |

---

## Task 1: Create ComfyUI Thumbnail Workflow

**Files:**
- Create: `media/comfyui-workflows/flux2-wiki-thumbnail.json`
- Reference: `media/comfyui-workflows/flux2-dev-social-hq.json` (copy and simplify)

The thumbnail workflow is a simplified version of social-hq:
- Same UNET (flux2_dev_fp8mixed, fp8_e4m3fn)
- Same CLIP (mistral_3_small_flux2_fp8, type flux2)
- Same VAE (flux2-vae)
- **Smaller image:** 512x384 instead of 1024x1024
- **No overlay:** No AIEngLogoOverlay, no AIEngTextOverlay
- **No upscale:** No ImageScaleBy
- **Fewer steps:** 20 instead of 28 (thumbnails don't need max quality)
- **Save prefix:** `wiki_thumb`

- [ ] **Step 1: Copy social-hq workflow and simplify**

Copy `flux2-dev-social-hq.json`, remove nodes 9 (ImageScaleBy), 10 (AIEngLogoOverlay), 11+ (AIEngTextOverlay), and renumber SaveImage to connect directly to VAEDecode. Change EmptyLatentImage to 512x384. Change KSampler steps to 20. Change SaveImage prefix to `wiki_thumb`.

- [ ] **Step 2: Upload workflow to ComfyUI**

```bash
cat media/comfyui-workflows/flux2-wiki-thumbnail.json | \
  ssh joe@10.40.10.90 "docker exec -i comfyui sh -c 'cat > /workspace/user/default/workflows/flux2-wiki-thumbnail.json'"
```

- [ ] **Step 3: Test workflow in ComfyUI UI**

Open http://10.40.10.90:8188, load flux2-wiki-thumbnail workflow, set a test prompt ("minimalist Docker whale icon, dark background"), click Run. Verify image generated at 512x384.

- [ ] **Step 4: Commit workflow**

```bash
git add media/comfyui-workflows/flux2-wiki-thumbnail.json
git commit -m "feat: add ComfyUI thumbnail workflow (512x384, no overlay)"
```

---

## Task 2: Create Thumbnail Generation Script

**Files:**
- Create: `scripts/generate-thumbnails.py`

This script reads articles.ts, generates appropriate prompts per article, calls ComfyUI API, and saves results.

- [ ] **Step 1: Write the script**

```python
#!/usr/bin/env python3
"""Generate real thumbnails for all wiki articles via ComfyUI FLUX.2 API."""

import json
import os
import re
import requests
import time
import sys

COMFYUI_URL = "http://10.40.10.90:8188"
OUTPUT_DIR = "public/images/thumbnails"
ARTICLES_FILE = "lib/articles.ts"

# Prompt templates per category
PROMPTS = {
    "tools": "minimalist tech icon, dark background #0B0C0F, {subject}, blue accent #4262FF, clean flat illustration, professional, centered",
    "grundlagen": "minimalist concept icon, dark background #0B0C0F, {subject}, blue accent #4262FF, clean abstract illustration, centered",
    "compliance": "minimalist legal icon, dark background #0B0C0F, {subject}, blue accent #4262FF, clean professional illustration, centered",
    "patterns": "minimalist architecture icon, dark background #0B0C0F, {subject}, blue accent #4262FF, clean diagram style, centered",
    "security": "minimalist security icon, dark background #0B0C0F, {subject}, blue accent #4262FF, clean shield/lock style, centered",
    "papers": "minimalist research icon, dark background #0B0C0F, {subject}, blue accent #4262FF, clean academic style, centered",
    "oesterreich": "minimalist Austria icon, dark background #0B0C0F, Austrian flag mountains, blue accent #4262FF, clean illustration, centered",
    "downloads": "minimalist download icon, dark background #0B0C0F, document with arrow, blue accent #4262FF, clean illustration, centered",
}

# Subject hints per article slug
SUBJECTS = {
    "docker-vs-swarm": "Docker whale with container boxes",
    "docker-grundlagen": "Docker container stack layers",
    "ai-stack-setup": "server rack with glowing AI chip",
    "ollama-tutorial": "llama silhouette with neural network",
    "rag-guide": "document with magnifying glass and database",
    "n8n-fuer-anfaenger": "connected workflow nodes automation",
    "mattermost-agent": "chat bubbles with robot icon",
    "grafana-monitoring": "dashboard with charts and graphs",
    "proxmox-setup": "server virtualization cubes",
    "model-selection": "brain with comparison arrows",
    "mcp-server": "plug connector with data streams",
    "open-source-projekte": "open padlock with code brackets",
    "ai-os-setup": "terminal window with AI cursor",
    "n8n-workflow-bundle": "package box with workflow nodes",
    "ai-tools-datenbank": "database cylinder with gear",
    "vergleich-alternativen": "balance scale comparison",
    "cli-coding-agents-vergleich": "terminal with multiple cursors",
    "was-ist-agent-orchestration": "conductor directing multiple agents",
    "multi-agent-systeme": "connected nodes network",
    "agent-rollen": "team of specialized robots",
    "lokal-vs-cloud": "house vs cloud with arrows",
    "ollama-vs-cloud": "llama vs cloud comparison",
    "ai-agent-team": "team of AI agents collaborating",
    "selfhosted-vs-cloud": "server room vs cloud",
    "30-tage-quickstart": "calendar with rocket launch",
    "ki-unternehmen": "office building with AI brain",
    "was-ist-ein-llm": "neural network transformer architecture",
    "dsgvo-grundlagen": "EU shield with privacy lock",
    "eu-ai-act": "EU stars with AI regulation document",
    "ki-kompetenz-art4": "graduation cap with AI chip",
    "eu-ai-act-checkliste": "checklist with EU flag",
    "verbotene-ai-praktiken": "prohibited sign with AI eye",
    "chatbot-transparenzpflichten": "chatbot with transparency window",
    "dpia": "risk assessment document with magnifying glass",
    "datenschutz-praxis": "data protection hands shielding data",
    "ai-agent-legal-framework": "legal scales with AI agent",
    "self-assessment": "questionnaire with checkmarks",
    "agent-orchestration-patterns": "conductor orchestrating data flows",
    "memory-management": "brain with filing cabinet drawers",
    "task-delegation": "dispatcher routing tasks to agents",
    "safety-hooks": "guardrail barrier protecting system",
    "heartbeat-monitoring": "heartbeat pulse with server icons",
    "ai-agent-digitaler-mitarbeiter": "robot at office desk",
    "self-improving-agents": "spiral upward learning loop",
    "agent-skalierung": "scaling graph with agent icons multiplying",
    "evals-guardrails": "quality gate with measurement tools",
    "human-in-the-loop": "human hand approving AI output",
    "self-hosted-sicherheit": "layered security shield with server",
    "verschluesselung": "locked padlock with encrypted data stream",
    "api-keys-sicher": "key in vault safe",
    "firewall-setup": "firewall wall with allowed/blocked arrows",
    "backup-strategie": "backup disks with restore arrow",
    "attention-is-all-you-need": "transformer attention matrix visualization",
    "rag-paper": "document retrieval with neural augmentation",
    "lora-paper": "large model with small adapter layers",
    "react-paper": "thinking and acting loop arrows",
    "constitutional-ai": "AI with constitutional rulebook",
    "hierarchical-reasoning": "two-level brain hierarchy modules",
    "oesterreich": "Austrian flag with AI circuit pattern",
    "downloads": "download folder with template documents",
}


def parse_articles():
    """Parse articles.ts and return list of (category, slug, title)."""
    with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    articles = re.findall(
        r"title: '([^']+)'.*?href: '(/[^']+)'.*?category: '([^']+)'",
        content, re.DOTALL
    )
    result = []
    for title, href, category in articles:
        slug = href.strip("/").split("/")[-1]
        result.append((category, slug, title))
    return result


def build_workflow(prompt_text):
    """Build ComfyUI API workflow for thumbnail generation."""
    return {
        "1": {"class_type": "UNETLoader", "inputs": {
            "unet_name": "flux2_dev_fp8mixed.safetensors",
            "weight_dtype": "fp8_e4m3fn"}},
        "2": {"class_type": "CLIPLoader", "inputs": {
            "clip_name": "mistral_3_small_flux2_fp8.safetensors",
            "type": "flux2"}},
        "3": {"class_type": "VAELoader", "inputs": {
            "vae_name": "flux2-vae.safetensors"}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {
            "batch_size": 1, "height": 384, "width": 512}},
        "5": {"class_type": "CLIPTextEncode", "inputs": {
            "clip": ["2", 0], "text": prompt_text}},
        "5b": {"class_type": "CLIPTextEncode", "inputs": {
            "clip": ["2", 0], "text": ""}},
        "6": {"class_type": "FluxGuidance", "inputs": {
            "conditioning": ["5", 0], "guidance": 3.5}},
        "7": {"class_type": "KSampler", "inputs": {
            "model": ["1", 0], "positive": ["6", 0], "negative": ["5b", 0],
            "latent_image": ["4", 0], "seed": 0, "steps": 20,
            "cfg": 1.0, "sampler_name": "euler", "scheduler": "beta",
            "denoise": 1.0}},
        "8": {"class_type": "VAEDecode", "inputs": {
            "samples": ["7", 0], "vae": ["3", 0]}},
        "9": {"class_type": "SaveImage", "inputs": {
            "images": ["8", 0], "filename_prefix": "wiki_thumb"}},
    }


def generate_image(prompt_text, seed=42):
    """Queue a ComfyUI job and wait for completion. Returns filename."""
    workflow = build_workflow(prompt_text)
    workflow["7"]["inputs"]["seed"] = seed

    resp = requests.post(f"{COMFYUI_URL}/prompt", json={"prompt": workflow})
    if resp.status_code != 200:
        print(f"  Queue failed: {resp.status_code}")
        return None

    prompt_id = resp.json()["prompt_id"]

    for i in range(120):  # Max 10 min
        time.sleep(5)
        try:
            hist = requests.get(f"{COMFYUI_URL}/history/{prompt_id}", timeout=10).json()
        except Exception:
            continue

        if prompt_id in hist:
            outputs = hist[prompt_id].get("outputs", {})
            if "9" in outputs and outputs["9"].get("images"):
                filename = outputs["9"]["images"][0]["filename"]
                return filename

            status = hist[prompt_id].get("status", {})
            if status.get("status_str") == "error":
                msgs = status.get("messages", [])
                for m in msgs:
                    if isinstance(m, list) and len(m) > 1:
                        if isinstance(m[1], dict) and "exception_message" in m[1]:
                            print(f"  ERROR: {m[1]['exception_message'][:200]}")
                return None

    print("  TIMEOUT after 10 min")
    return None


def download_image(filename, output_path):
    """Download generated image from ComfyUI."""
    url = f"{COMFYUI_URL}/view?filename={filename}&type=output"
    resp = requests.get(url)
    if resp.status_code == 200:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(resp.content)
        return True
    return False


def free_vram():
    """Free ComfyUI VRAM after generation batch."""
    requests.post(f"{COMFYUI_URL}/free",
                  json={"unload_models": True, "free_memory": True})


def main():
    articles = parse_articles()
    print(f"Found {len(articles)} articles")

    # Unload Ollama first
    try:
        requests.post("http://10.40.10.90:11434/api/generate",
                      json={"model": "qwen3.5:27b", "keep_alive": 0}, timeout=10)
        print("Ollama unloaded")
        time.sleep(5)
    except Exception:
        print("Ollama not reachable (may already be unloaded)")

    generated = 0
    failed = 0

    for i, (category, slug, title) in enumerate(articles):
        output_path = f"{OUTPUT_DIR}/{category}/{slug}.png"

        # Skip if already exists as .webp (real image)
        webp_path = f"{OUTPUT_DIR}/{category}/{slug}.webp"
        if os.path.exists(webp_path) and os.path.getsize(webp_path) > 1000:
            print(f"[{i+1}/{len(articles)}] SKIP {category}/{slug} (webp exists)")
            continue

        # Build prompt
        subject = SUBJECTS.get(slug, title)
        template = PROMPTS.get(category, PROMPTS["tools"])
        prompt = template.format(subject=subject)

        print(f"[{i+1}/{len(articles)}] Generating {category}/{slug}...")
        print(f"  Prompt: {prompt[:80]}...")

        filename = generate_image(prompt, seed=42 + i)
        if filename:
            if download_image(filename, output_path):
                generated += 1
                print(f"  OK: {output_path} ({os.path.getsize(output_path)} bytes)")
            else:
                failed += 1
                print(f"  DOWNLOAD FAILED")
        else:
            failed += 1
            print(f"  GENERATION FAILED")

        # Free VRAM every 5 images
        if (i + 1) % 5 == 0:
            free_vram()
            time.sleep(3)

    print(f"\nDone: {generated} generated, {failed} failed")
    free_vram()


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Test with ONE article**

```bash
# Test: generate only docker thumbnail
python3 scripts/generate-thumbnails.py --slug docker-vs-swarm
```

Verify: `public/images/thumbnails/tools/docker-vs-swarm.png` exists and looks correct.

- [ ] **Step 3: Commit script**

```bash
git add scripts/generate-thumbnails.py
git commit -m "feat: add thumbnail generation script (ComfyUI FLUX.2 API)"
```

---

## Task 3: Generate ALL 60 Thumbnails

- [ ] **Step 1: Unload Ollama, run full generation**

```bash
curl -s -X POST http://10.40.10.90:11434/api/generate -d '{"model":"qwen3.5:27b","keep_alive":0}'
sleep 5
python3 scripts/generate-thumbnails.py
```

Expected: ~60 images generated, each ~60-90s = ~60-90 min total.
Free VRAM every 5 images automatically.

- [ ] **Step 2: Verify all images exist**

```bash
find public/images/thumbnails -name "*.png" | wc -l
# Expected: 60
```

- [ ] **Step 3: Optimize to WebP**

```bash
# Install cwebp if not available
# pip install Pillow

python3 -c "
from PIL import Image
import os, glob

for png in glob.glob('public/images/thumbnails/**/*.png', recursive=True):
    webp = png.replace('.png', '.webp')
    img = Image.open(png)
    img = img.resize((200, 150), Image.LANCZOS)
    img.save(webp, 'WEBP', quality=85)
    size = os.path.getsize(webp)
    print(f'{webp}: {size//1024}KB')
    if size > 50000:
        # Re-save with lower quality
        img.save(webp, 'WEBP', quality=60)
        print(f'  Re-saved at q60: {os.path.getsize(webp)//1024}KB')
    os.remove(png)  # Delete PNG after WebP created
"
```

- [ ] **Step 4: Delete SVG placeholders**

```bash
rm -f public/images/thumbnails/tools/*.svg
rm -f public/images/thumbnails/*/default.svg
rm -f public/images/thumbnails/*/.gitkeep
```

- [ ] **Step 5: Commit all images**

```bash
git add public/images/thumbnails/
git commit -m "feat: replace all SVG placeholders with real ComfyUI thumbnails

60 thumbnails generated via FLUX.2 Dev FP8 on RTX 3090.
All images optimized to WebP, <50KB each.
SVG placeholders deleted (S9 compliance)."
```

---

## Task 4: Update articles.ts with Real Thumbnail Paths

- [ ] **Step 1: Update ALL articles with .webp paths**

In `lib/articles.ts`, update every article to have `thumbnail: '/images/thumbnails/<category>/<slug>.webp'`.

For the 18 tools articles that already have SVG paths, change `.svg` to `.webp`.
For the 42 articles without thumbnails, add the `thumbnail` field.

- [ ] **Step 2: Build to verify**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add lib/articles.ts
git commit -m "feat: update all 60 articles with real WebP thumbnail paths"
```

---

## Task 5: Fix EN Sidebar Slug Bug

**Root Cause:** `Sidebar.tsx` renders article links using `article.href` directly. On EN pages, this produces `/en/tools/ai-tools-datenbank/` instead of `/en/tools/ai-tools-database/`.

**Files:**
- Modify: `components/Sidebar.tsx`
- Reference: `lib/articles.ts` (getEnHref function)

- [ ] **Step 1: Read Sidebar.tsx and understand how links are rendered**

The Sidebar maps `categories` → `cat.articles` → `<Link href={article.href}>`. On EN pages, it needs to use `getEnHref(article.href)` instead.

- [ ] **Step 2: Fix Sidebar to detect EN and use getEnHref**

```typescript
import { categories, getEnHref } from '../lib/articles'
import { usePathname } from 'next/navigation'

// Inside Sidebar component:
const isEn = pathname.startsWith('/en/')

// When rendering article links:
href={isEn ? getEnHref(article.href) : article.href}
```

- [ ] **Step 3: Also fix category hub links for EN**

The category href (e.g., `/oesterreich`) needs translation too:
```typescript
const catHref = isEn ? `/en${deToEnSlugMap[cat.href] || cat.href}` : cat.href
```

Add `/oesterreich` → `/austria` to the `deToEnSlugMap` in articles.ts if not already there.

- [ ] **Step 4: Build + verify**

```bash
npm run build
# Check /en/ page doesn't have /en/oesterreich/ link
```

- [ ] **Step 5: Commit**

```bash
git add components/Sidebar.tsx lib/articles.ts
git commit -m "fix: EN sidebar uses translated slugs via getEnHref

Fixes /en/oesterreich/ → /en/austria/ and all other
German slugs on EN pages. TASK-2026-00373."
```

---

## Task 6: Update WIKI-STYLE-GUIDE + Delete Orphaned Images

- [ ] **Step 1: Update WIKI-STYLE-GUIDE.md**

Remove any mention of SVG placeholders. Add:
```markdown
### Thumbnail-Erstellung
- Alle Thumbnails werden via ComfyUI FLUX.2 generiert
- Script: `scripts/generate-thumbnails.py`
- Workflow: `media/comfyui-workflows/flux2-wiki-thumbnail.json`
- SVG Placeholder sind VERBOTEN (S9)
- Jeder neue Artikel MUSS ein echtes Thumbnail haben bevor er deployed wird
```

- [ ] **Step 2: Clean up orphaned images (203 files, 266MB)**

Based on the image audit, delete:
- `public/images/comfyui-from-90/` — 102 files, 0 code references
- `public/images/generated/` old v1 hero images (keep only v2)
- `public/images/products/` — 0 code references
- `public/images/kroki-test/` — test files

```bash
rm -rf public/images/comfyui-from-90/
rm -rf public/images/kroki-test/
rm -rf public/images/products/
# Delete v1 hero images (keep v2)
find public/images/generated -name "hero-*" ! -name "*-v2*" -delete
```

**IMPORTANT:** Verify each deletion with `grep -r "filename" app/` before deleting!

- [ ] **Step 3: Commit**

```bash
git add -A public/images/ WIKI-STYLE-GUIDE.md
git commit -m "chore: clean up 203 orphaned images (266MB freed)

Deleted: comfyui-from-90 dump, old v1 heroes, test files.
Updated WIKI-STYLE-GUIDE with real thumbnail workflow."
```

---

## Task 7: Final Verification

- [ ] **Step 1: Build**

```bash
npm run build
```

- [ ] **Step 2: Run E2E tests locally**

```bash
npx serve out -l 3939 &
sleep 2
WIKI_URL=http://localhost:3939 npx playwright test --reporter=list
kill %1
```

Expected: 183+ tests pass.

- [ ] **Step 3: Visual verification in browser**

Open `http://localhost:3939/tools/` — every article card should show a real thumbnail image, not an emoji or SVG.

- [ ] **Step 4: Push + verify CI**

```bash
git push origin main
# Wait for CI to pass
gh run list --repo AI-Engineerings-at/wiki --limit 1
```

- [ ] **Step 5: Live verification after deploy**

Open `https://wiki.ai-engineering.at/tools/` — thumbnails visible.
Open `https://wiki.ai-engineering.at/en/` — no /en/oesterreich/ broken link.

- [ ] **Step 6: Update ERPNext tasks**

Close: TASK-2026-00371, TASK-2026-00372, TASK-2026-00373

- [ ] **Step 7: ComfyUI /free**

```bash
curl -s -X POST http://10.40.10.90:8188/free -d '{"unload_models":true,"free_memory":true}'
```

---

## Summary

| Task | Time Est. | Depends On |
|------|-----------|------------|
| 1. Create thumbnail workflow | 15 min | ComfyUI running |
| 2. Create generation script | 20 min | Task 1 |
| 3. Generate 60 thumbnails | 60-90 min | Task 2 |
| 4. Update articles.ts | 10 min | Task 3 |
| 5. Fix EN sidebar slugs | 15 min | Independent |
| 6. Style guide + cleanup | 15 min | Task 3 |
| 7. Final verification | 15 min | All above |
| **Total** | **~3 hours** | |

## Risks
- ComfyUI OOM during batch generation → /free every 5 images
- Some prompts may generate poor images → manual review, re-generate with different seed
- WebP optimization may exceed 50KB → reduce quality to 60
- EN sidebar fix may break other EN pages → test all EN routes
