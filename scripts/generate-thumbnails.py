#!/usr/bin/env python3
"""
generate-thumbnails.py — ComfyUI FLUX.2 Dev FP8 thumbnail generator
Reads lib/articles.ts, generates one 512x384 image per article,
saves to public/images/thumbnails/<category>/<slug>.png

Usage:
    python3 scripts/generate-thumbnails.py              # generate all missing
    python3 scripts/generate-thumbnails.py --dry-run    # parse only, no generation
    python3 scripts/generate-thumbnails.py --slug docker-vs-swarm  # single article
    python3 scripts/generate-thumbnails.py --force      # regenerate even if file exists
"""

import argparse
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
import urllib.parse
import uuid
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

COMFYUI_URL = "http://10.40.10.90:8188"
OLLAMA_URL  = "http://10.40.10.90:11434"

WIKI_ROOT   = Path(__file__).resolve().parent.parent
ARTICLES_TS = WIKI_ROOT / "lib" / "articles.ts"
OUTPUT_DIR  = WIKI_ROOT / "public" / "images" / "thumbnails"

VRAM_FREE_EVERY = 5   # call /free after every N generated images

# ---------------------------------------------------------------------------
# Prompt templates per category
# ---------------------------------------------------------------------------

CATEGORY_PROMPTS = {
    "tools": (
        "Technical illustration, {subject}, dark background, glowing interface elements, "
        "blue and cyan color scheme, isometric 3D style, professional tech aesthetic, "
        "clean minimal design, no text, no watermark"
    ),
    "grundlagen": (
        "Conceptual illustration, {subject}, dark gradient background, abstract geometric "
        "shapes, blue purple color palette, educational infographic style, modern flat design, "
        "no text, no watermark"
    ),
    "compliance": (
        "Legal and regulatory illustration, {subject}, dark background, gold and blue accents, "
        "formal professional style, shield and document motifs, clean corporate design, "
        "no text, no watermark"
    ),
    "patterns": (
        "Software architecture diagram illustration, {subject}, dark background, "
        "connected nodes and flows, green and teal color scheme, network topology style, "
        "technical blueprint aesthetic, no text, no watermark"
    ),
    "security": (
        "Cybersecurity illustration, {subject}, dark background, red and orange warning colors "
        "with blue safety highlights, lock and shield motifs, hacker aesthetic meets corporate, "
        "no text, no watermark"
    ),
    "papers": (
        "Academic research illustration, {subject}, dark background, scientific visualization, "
        "white and gold color scheme, neural network and equation motifs, elegant scholarly style, "
        "no text, no watermark"
    ),
    "oesterreich": (
        "Austrian technology illustration, {subject}, dark background, red and white color scheme, "
        "modern European style, government and innovation motifs, professional clean design, "
        "no text, no watermark"
    ),
    "downloads": (
        "Digital resources illustration, {subject}, dark background, blue and white color scheme, "
        "document and download motifs, clean minimal design, professional style, "
        "no text, no watermark"
    ),
}

DEFAULT_PROMPT = (
    "Technical illustration, {subject}, dark background, blue color scheme, "
    "modern professional design, clean minimal style, no text, no watermark"
)

# ---------------------------------------------------------------------------
# Subject hints per article slug
# ---------------------------------------------------------------------------

SUBJECTS = {
    # Tools (17)
    "docker-vs-swarm":           "Docker whale logo and swarm of containers, orchestration comparison, two paths diverging",
    "docker-grundlagen":         "Docker container stack with whale mascot, layered architecture, blue containers",
    "ai-stack-setup":            "AI software stack tower, Ollama and WebUI logos, glowing server rack",
    "ollama-tutorial":           "Ollama llama mascot, local LLM running on laptop, terminal window glow",
    "rag-guide":                 "Retrieval Augmented Generation pipeline, vector database, document retrieval arrows",
    "n8n-fuer-anfaenger":        "n8n workflow automation nodes, connected orange dots, visual flow diagram",
    "mattermost-agent":          "Chat interface with AI agent responses, message bubbles, team communication",
    "grafana-monitoring":        "Grafana dashboard panels, metrics graphs, monitoring charts glowing on dark",
    "proxmox-setup":             "Proxmox server virtualization, multiple VM boxes stacked, homelab rack",
    "model-selection":           "AI model comparison chart, multiple LLM models listed, selection matrix",
    "mcp-server":                "Model Context Protocol diagram, server-client connection, API plugs connecting",
    "open-source-projekte":      "Open source logos collection, GitHub octocat, collaborative code, community network",
    "ai-os-setup":               "AI operating system interface, Claude Code terminal, file structure tree, system setup",
    "n8n-workflow-bundle":       "Bundle of n8n workflow cards, 14 automation blueprints, stacked workflow diagrams",
    "ai-tools-datenbank":        "Database of AI tools grid, 68 tool cards, searchable catalog interface",
    "vergleich-alternativen":    "Comparison table of resources, side-by-side alternatives, honest review scales",
    "cli-coding-agents-vergleich": "CLI coding agents comparison, Claude Code and Gemini CLI terminals side by side",

    # Grundlagen (10)
    "was-ist-agent-orchestration": "AI agent conductor directing robot workers, orchestration hub with spokes",
    "multi-agent-systeme":       "Multiple AI agents as interconnected robots collaborating, network of agents",
    "agent-rollen":              "AI agent role cards, developer QA infra browser robots, team org chart",
    "lokal-vs-cloud":            "Local server versus cloud, scale balance weighing costs, TCO comparison",
    "ollama-vs-cloud":           "Ollama local llama versus cloud API, speed and privacy comparison",
    "ai-agent-team":             "AI agent team assembled, robot employees at workstations, team structure",
    "selfhosted-vs-cloud":       "Self-hosted server in home versus cloud data center, decision tree",
    "30-tage-quickstart":        "30-day calendar with AI milestones, progress bar, quickstart roadmap",
    "ki-unternehmen":            "Business building with AI brain inside, corporate AI adoption, ROI chart",
    "was-ist-ein-llm":           "Large Language Model explained, transformer architecture layers, token flow",

    # Compliance (10)
    "dsgvo-grundlagen":          "DSGVO EU data protection shield, personal data locked, Austrian flag accent",
    "eu-ai-act":                 "EU AI Act law document, risk pyramid classification, European parliament",
    "ki-kompetenz-art4":         "Article 4 AI competence training, graduation cap with AI circuit, deadline clock",
    "eu-ai-act-checkliste":      "EU AI Act checklist, 7 checkboxes being ticked, compliance ladder",
    "verbotene-ai-praktiken":    "Forbidden AI practices red X marks, social scoring crossed out, warning signs",
    "chatbot-transparenzpflichten": "Chatbot with transparency label, robot disclosure badge, AI identifier mark",
    "dpia":                      "Data Protection Impact Assessment flowchart, privacy risk evaluation diagram",
    "datenschutz-praxis":        "Practical data protection steps, TOM checklist, AVV document signing",
    "ai-agent-legal-framework":  "Legal framework for AI agents, law scales with robot, compliance package",
    "self-assessment":           "Interactive self-assessment quiz, 10 questions checklist, EU AI Act readiness meter",

    # Patterns (10)
    "agent-orchestration-patterns": "Orchestration pattern diagrams, hub and spoke, pipeline, hierarchical flows",
    "memory-management":         "AI agent memory layers, short-term and long-term storage, knowledge graph nodes",
    "task-delegation":           "Task delegation flow, orchestrator assigning tasks to specialist agents",
    "safety-hooks":              "Safety hooks as guardrails, output validation shields, automated safety checks",
    "heartbeat-monitoring":      "Heartbeat pulse monitor, agent health check pings, uptime dashboard",
    "ai-agent-digitaler-mitarbeiter": "AI agent as digital employee, onboarding badge, credential vault, network policy",
    "self-improving-agents":     "Self-improving agent feedback loop, corrections memory, recursive improvement cycle",
    "agent-skalierung":          "Agent team scaling diagram, adding new agents, multi-agent workflow growth",
    "evals-guardrails":          "LLM evaluation metrics dashboard, guardrail barriers, quality testing framework",
    "human-in-the-loop":         "Human approval checkpoint in AI workflow, oversight hand controlling robot arm",

    # Security (5)
    "self-hosted-sicherheit":    "6-layer security model fortress, network SSH firewall container layers",
    "verschluesselung":          "Encryption visualization, LUKS lock, TLS padlock, data encrypted in transit",
    "api-keys-sicher":           "API keys secured in vault, Hashicorp Vault logo, secret management interface",
    "firewall-setup":            "UFW firewall wall of fire, fail2ban blocking attacks, network segmentation",
    "backup-strategie":          "3-2-1 backup rule visualization, three copies two media one offsite",

    # Papers (6)
    "attention-is-all-you-need": "Transformer self-attention mechanism diagram, multi-head attention visualization",
    "rag-paper":                 "RAG paper retrieval pipeline, knowledge base connected to LLM generation",
    "lora-paper":                "LoRA low-rank adaptation matrices, efficient fine-tuning visualization",
    "react-paper":               "ReAct reasoning and acting loop, thought action observation cycle diagram",
    "constitutional-ai":         "Constitutional AI principles framework, Anthropic safety alignment diagram",
    "hierarchical-reasoning":    "Hierarchical reasoning model, 27M parameter network solving sudoku and pathfinding",

    # Other (2)
    "oesterreich":               "Austria KI landscape, red white red flag with AI circuit overlay, Wiener Staatsoper",
    "downloads":                 "Downloads collection, document templates stack, compliance checklists, free resources",
}

# ---------------------------------------------------------------------------
# ComfyUI workflow builder
# ---------------------------------------------------------------------------

def build_workflow(prompt: str, seed: int, filename_prefix: str) -> dict:
    """Build the ComfyUI API workflow JSON matching flux2-wiki-thumbnail."""
    return {
        "1": {
            "class_type": "UNETLoader",
            "inputs": {
                "unet_name": "flux2_dev_fp8mixed.safetensors",
                "weight_dtype": "fp8_e4m3fn"
            }
        },
        "2": {
            "class_type": "CLIPLoader",
            "inputs": {
                "clip_name": "mistral_3_small_flux2_fp8.safetensors",
                "type": "flux2"
            }
        },
        "3": {
            "class_type": "VAELoader",
            "inputs": {
                "vae_name": "flux2-vae.safetensors"
            }
        },
        "4": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["2", 0],
                "text": prompt
            }
        },
        "5": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["2", 0],
                "text": ""
            }
        },
        "6": {
            "class_type": "EmptyLatentImage",
            "inputs": {
                "width": 512,
                "height": 384,
                "batch_size": 1
            }
        },
        "7": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "positive": ["4", 0],
                "negative": ["5", 0],
                "latent_image": ["6", 0],
                "seed": seed,
                "steps": 20,
                "cfg": 1.0,
                "sampler_name": "euler",
                "scheduler": "beta",
                "denoise": 1.0
            }
        },
        "8": {
            "class_type": "VAEDecode",
            "inputs": {
                "samples": ["7", 0],
                "vae": ["3", 0]
            }
        },
        "9": {
            "class_type": "SaveImage",
            "inputs": {
                "images": ["8", 0],
                "filename_prefix": filename_prefix
            }
        },
        "10": {
            "class_type": "FluxGuidance",
            "inputs": {
                "conditioning": ["4", 0],
                "guidance": 3.5
            }
        }
    }


def build_workflow_with_guidance(prompt: str, seed: int, filename_prefix: str) -> dict:
    """Build ComfyUI workflow with FluxGuidance node wired into KSampler."""
    return {
        "1": {
            "class_type": "UNETLoader",
            "inputs": {
                "unet_name": "flux2_dev_fp8mixed.safetensors",
                "weight_dtype": "fp8_e4m3fn"
            }
        },
        "2": {
            "class_type": "CLIPLoader",
            "inputs": {
                "clip_name": "mistral_3_small_flux2_fp8.safetensors",
                "type": "flux2"
            }
        },
        "3": {
            "class_type": "VAELoader",
            "inputs": {
                "vae_name": "flux2-vae.safetensors"
            }
        },
        "4": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["2", 0],
                "text": prompt
            }
        },
        "5": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["2", 0],
                "text": ""
            }
        },
        "6": {
            "class_type": "EmptyLatentImage",
            "inputs": {
                "width": 512,
                "height": 384,
                "batch_size": 1
            }
        },
        "10": {
            "class_type": "FluxGuidance",
            "inputs": {
                "conditioning": ["4", 0],
                "guidance": 3.5
            }
        },
        "7": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "positive": ["10", 0],
                "negative": ["5", 0],
                "latent_image": ["6", 0],
                "seed": seed,
                "steps": 20,
                "cfg": 1.0,
                "sampler_name": "euler",
                "scheduler": "beta",
                "denoise": 1.0
            }
        },
        "8": {
            "class_type": "VAEDecode",
            "inputs": {
                "samples": ["7", 0],
                "vae": ["3", 0]
            }
        },
        "9": {
            "class_type": "SaveImage",
            "inputs": {
                "images": ["8", 0],
                "filename_prefix": filename_prefix
            }
        }
    }

# ---------------------------------------------------------------------------
# Article parser
# ---------------------------------------------------------------------------

def parse_articles(ts_file: Path) -> list[dict]:
    """Parse lib/articles.ts and return list of {category, slug, title}."""
    content = ts_file.read_text(encoding="utf-8")

    # Match href and category from article objects
    # Pattern: href: '/category/slug', ... category: 'category'
    # We extract href blocks and resolve slug + category from href
    pattern = re.compile(
        r"href:\s*'(/([^/]+)/([^']+))'.*?category:\s*'([^']+)'",
        re.DOTALL
    )

    # Also handle single-segment hrefs like /oesterreich and /downloads
    pattern_single = re.compile(
        r"href:\s*'(/([^/'\s]+))'[^}]*?category:\s*'([^']+)'",
        re.DOTALL
    )

    # Extract title too for logging
    block_pattern = re.compile(
        r"\{[^}]*title:\s*'([^']+)'[^}]*href:\s*'([^']+)'[^}]*category:\s*'([^']+)'[^}]*\}",
        re.DOTALL
    )

    articles = []
    seen_hrefs = set()

    for m in block_pattern.finditer(content):
        title    = m.group(1)
        href     = m.group(2)
        category = m.group(3)

        if href in seen_hrefs:
            continue
        seen_hrefs.add(href)

        parts = href.strip("/").split("/")
        if len(parts) == 2:
            slug = parts[1]
        elif len(parts) == 1:
            slug = parts[0]
        else:
            slug = parts[-1]

        articles.append({
            "title":    title,
            "href":     href,
            "category": category,
            "slug":     slug,
        })

    return articles

# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

def http_post(url: str, data: dict, timeout: int = 10) -> dict:
    payload = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read())


def http_get(url: str, timeout: int = 10) -> bytes:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def http_get_json(url: str, timeout: int = 10) -> dict:
    return json.loads(http_get(url, timeout=timeout))


def comfyui_queue_prompt(workflow: dict) -> str:
    """Submit workflow to ComfyUI and return prompt_id."""
    resp = http_post(
        f"{COMFYUI_URL}/prompt",
        {"prompt": workflow, "client_id": str(uuid.uuid4())},
        timeout=30
    )
    return resp["prompt_id"]


def comfyui_wait_for_result(prompt_id: str, timeout: int = 300) -> list[str]:
    """Poll /history until prompt is done. Returns list of output image filenames."""
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            history = http_get_json(f"{COMFYUI_URL}/history/{prompt_id}", timeout=15)
            if prompt_id in history:
                entry = history[prompt_id]
                outputs = entry.get("outputs", {})
                images = []
                for node_output in outputs.values():
                    for img in node_output.get("images", []):
                        images.append(img["filename"])
                return images
        except Exception as e:
            print(f"    [poll] {e}", file=sys.stderr)
        time.sleep(3)
    raise TimeoutError(f"ComfyUI did not finish prompt {prompt_id} within {timeout}s")


def comfyui_download_image(filename: str, dest: Path) -> None:
    """Download image from ComfyUI /view endpoint to dest."""
    url = f"{COMFYUI_URL}/view?filename={urllib.parse.quote(filename)}"
    data = http_get(url, timeout=60)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)


def comfyui_free_vram() -> None:
    """Call ComfyUI /free to release VRAM."""
    try:
        http_post(f"{COMFYUI_URL}/free", {"unload_models": True, "free_memory": True}, timeout=15)
        print("  [vram] freed VRAM via /free")
    except Exception as e:
        print(f"  [vram] /free failed: {e}", file=sys.stderr)


def ollama_unload() -> None:
    """Ask Ollama to unload all models to free VRAM."""
    try:
        resp = http_get_json(f"{OLLAMA_URL}/api/tags", timeout=5)
        models = [m["name"] for m in resp.get("models", [])]
        for model in models:
            try:
                http_post(
                    f"{OLLAMA_URL}/api/generate",
                    {"model": model, "keep_alive": 0},
                    timeout=10
                )
                print(f"  [ollama] unloaded {model}")
            except Exception as e:
                print(f"  [ollama] could not unload {model}: {e}", file=sys.stderr)
    except Exception as e:
        print(f"  [ollama] not reachable or no models: {e}", file=sys.stderr)

# ---------------------------------------------------------------------------
# Prompt builder
# ---------------------------------------------------------------------------

def build_prompt(category: str, slug: str) -> str:
    subject = SUBJECTS.get(slug, f"{slug.replace('-', ' ')} concept illustration")
    template = CATEGORY_PROMPTS.get(category, DEFAULT_PROMPT)
    return template.format(subject=subject)

# ---------------------------------------------------------------------------
# Main generation logic
# ---------------------------------------------------------------------------

def generate_article(article: dict, force: bool = False) -> bool:
    """
    Generate thumbnail for one article.
    Returns True on success, False on skip or error.
    """
    category = article["category"]
    slug     = article["slug"]
    title    = article["title"]

    out_path = OUTPUT_DIR / category / f"{slug}.png"

    # Also skip if .webp variant exists
    out_webp = OUTPUT_DIR / category / f"{slug}.webp"
    if not force and (out_path.exists() or out_webp.exists()):
        existing = out_webp if out_webp.exists() else out_path
        print(f"  [skip] {category}/{slug} — {existing.name} exists")
        return False

    prompt = build_prompt(category, slug)
    seed   = abs(hash(slug)) % (2**32)
    prefix = f"wiki/{category}/{slug}"

    print(f"  [gen]  {category}/{slug}")
    print(f"         prompt: {prompt[:80]}...")

    workflow = build_workflow_with_guidance(prompt, seed, prefix)

    try:
        prompt_id = comfyui_queue_prompt(workflow)
        print(f"         queued: {prompt_id}")

        images = comfyui_wait_for_result(prompt_id, timeout=300)
        if not images:
            print(f"  [err]  no output images for {slug}", file=sys.stderr)
            return False

        # Download first image
        comfyui_download_image(images[0], out_path)
        print(f"         saved:  {out_path.relative_to(WIKI_ROOT)}")
        return True

    except TimeoutError as e:
        print(f"  [err]  timeout for {slug}: {e}", file=sys.stderr)
        return False
    except urllib.error.URLError as e:
        print(f"  [err]  network error for {slug}: {e}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"  [err]  {slug}: {e}", file=sys.stderr)
        return False

# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Generate wiki thumbnails via ComfyUI FLUX.2")
    parser.add_argument("--dry-run", action="store_true", help="Parse articles only, do not generate")
    parser.add_argument("--force",   action="store_true", help="Regenerate even if file exists")
    parser.add_argument("--slug",    type=str,            help="Generate only this slug")
    args = parser.parse_args()

    # --- Parse articles ---
    print(f"Parsing {ARTICLES_TS} ...")
    articles = parse_articles(ARTICLES_TS)
    print(f"Found {len(articles)} articles")

    # --- Filter if --slug given ---
    if args.slug:
        articles = [a for a in articles if a["slug"] == args.slug]
        if not articles:
            print(f"ERROR: slug '{args.slug}' not found", file=sys.stderr)
            sys.exit(1)

    # --- Dry run: just show what would be generated ---
    if args.dry_run:
        print("\nDRY RUN — articles that would be generated:")
        for a in articles:
            out = OUTPUT_DIR / a["category"] / f"{a['slug']}.png"
            webp = OUTPUT_DIR / a["category"] / f"{a['slug']}.webp"
            status = "EXISTS" if (out.exists() or webp.exists()) else "MISSING"
            prompt_preview = build_prompt(a["category"], a["slug"])[:60]
            print(f"  [{status:7s}] {a['category']:12s} / {a['slug']:<40s}  {prompt_preview}...")
        print(f"\nTotal: {len(articles)} articles")
        return

    # --- Pre-generation: unload Ollama ---
    print("\nUnloading Ollama models to free VRAM ...")
    ollama_unload()

    # --- Check ComfyUI reachable ---
    print("Checking ComfyUI ...")
    try:
        http_get_json(f"{COMFYUI_URL}/system_stats", timeout=10)
        print("  ComfyUI reachable OK")
    except Exception as e:
        print(f"ERROR: ComfyUI not reachable at {COMFYUI_URL}: {e}", file=sys.stderr)
        sys.exit(1)

    # --- Generate ---
    generated = 0
    skipped   = 0
    errors    = 0

    print(f"\nGenerating thumbnails for {len(articles)} articles ...\n")

    for i, article in enumerate(articles):
        success = generate_article(article, force=args.force)
        if success:
            generated += 1
            # Free VRAM every N successful generations
            if generated % VRAM_FREE_EVERY == 0:
                comfyui_free_vram()
        elif success is False:
            # Distinguish skip vs error by checking file existence
            out = OUTPUT_DIR / article["category"] / f"{article['slug']}.png"
            webp = OUTPUT_DIR / article["category"] / f"{article['slug']}.webp"
            if out.exists() or webp.exists():
                skipped += 1
            else:
                errors += 1

    print(f"\nDone: {generated} generated, {skipped} skipped, {errors} errors")


if __name__ == "__main__":
    main()
