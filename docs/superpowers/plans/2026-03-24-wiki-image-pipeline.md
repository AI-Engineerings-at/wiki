# Wiki Image Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 5 funktionierende ComfyUI Workflows (Thumbnail, Hero, Social, Blog-Hero, Ultra-4K) basierend auf dem bewiesenen Social Poster Setup, mit Dual-GPU Pipeline (.90 Generation + .91 Upscale), und 60 echte Wiki-Thumbnails generiert.

**Architecture:** Workflows werden als Python Dicts gebaut (wie `comfyui_image.py`), via API an ComfyUI geschickt, und nach erfolgreicher Generation aus der History als UI-JSON exportiert. Kein Hand-Editing von JSONs. Kein manuelles UI-Building.

**Tech Stack:** ComfyUI (comfyui-prod:v2) auf .90 (RTX 3090 24GB) + .91 (RTX 4070 8GB), Python 3.11, FLUX.2 Dev FP8

**Bewiesene Basis (500+ Bilder):**
```python
# Exakt aus comfyui_image.py Zeilen 297-388
UNETLoader:      flux2_dev_fp8mixed.safetensors, fp8_e4m3fn
CLIPLoader:      mistral_3_small_flux2_fp8.safetensors, type=flux2
VAELoader:       flux2-vae.safetensors
FluxGuidance:    3.5
KSampler:        28 steps, euler, beta, cfg=1.0, denoise=1.0
ImageScaleBy:    lanczos, 1.5x
AIEngLogoOverlay: logo-new.png, bottom-left, 12%, 3% padding, 0.85 opacity
AIEngTextOverlay: SpaceGrotesk-Bold, 72pt, brand_blue, center/top
```

---

## Voraussetzungen (verifiziert am 2026-03-23)

- [x] comfyui-prod:v2 Image mit allen Custom Nodes eingebacken
- [x] .90 Container laeuft mit Modell-Volume
- [x] .91 Container laeuft mit Modell-Volume
- [x] Alle Nodes: AIEngLogoOverlay, AIEngTextOverlay, FaceDetailer, UNETLoader, UnetLoaderGGUF — OK auf beiden
- [x] Modelle auf .90: UNET (35GB), Mistral CLIP (18GB), T5 CLIP (4.6GB), CLIP-L (235MB), VAE (321MB), NMKD Upscaler (64MB), YOLOv8m (50MB)

---

## File Map

### Neue Dateien
| Datei | Zweck |
|-------|-------|
| `scripts/wiki_image_workflows.py` | 5 Workflow-Builder-Funktionen (Python Dicts wie comfyui_image.py) |
| `scripts/wiki_image_generator.py` | Generator-Script: liest articles.ts, ruft Workflows auf, speichert Bilder |
| `scripts/comfyui_client.py` | Wiederverwendbarer ComfyUI API Client (queue, poll, download, free) |

### Modifizierte Dateien
| Datei | Aenderung |
|-------|-----------|
| `lib/articles.ts` | thumbnail Pfade: SVG → WebP |
| `WIKI-STYLE-GUIDE.md` | Bild-Pipeline Dokumentation |

### Geloeschte Dateien
| Datei | Grund |
|-------|-------|
| `public/images/thumbnails/**/*.svg` | Ersetzt durch echte Bilder |
| `scripts/generate-thumbnails.py` | Ersetzt durch wiki_image_generator.py |

---

## Task 1: ComfyUI API Client

Wiederverwendbarer Client der die API-Interaktion kapselt. Basiert auf dem Pattern aus `comfyui_image.py`.

**Files:**
- Create: `scripts/comfyui_client.py`

- [ ] **Step 1: Client schreiben**

```python
"""ComfyUI API Client — queue, poll, download, free."""
import requests
import time
import os

class ComfyUIClient:
    def __init__(self, host="http://10.40.10.90:8188", ollama_host="http://10.40.10.90:11434"):
        self.host = host
        self.ollama_host = ollama_host

    def health(self) -> dict:
        """Check ComfyUI health. Returns system stats."""
        r = requests.get(f"{self.host}/system_stats", timeout=10)
        r.raise_for_status()
        return r.json()

    def unload_ollama(self, model="qwen3.5:27b", wait=5):
        """Unload Ollama model to free VRAM before generation."""
        try:
            requests.post(f"{self.ollama_host}/api/generate",
                          json={"model": model, "keep_alive": 0}, timeout=10)
            time.sleep(wait)
        except Exception:
            pass  # Ollama may not be running

    def free_vram(self):
        """Free ComfyUI VRAM after generation."""
        requests.post(f"{self.host}/free",
                      json={"unload_models": True, "free_memory": True}, timeout=10)

    def queue(self, workflow: dict) -> str:
        """Queue a workflow. Returns prompt_id."""
        r = requests.post(f"{self.host}/prompt",
                          json={"prompt": workflow}, timeout=30)
        if r.status_code != 200:
            raise RuntimeError(f"Queue failed {r.status_code}: {r.text[:200]}")
        return r.json()["prompt_id"]

    def wait_for_result(self, prompt_id: str, save_node_id: str = "12",
                        timeout: int = 420, poll_interval: int = 10) -> str:
        """Poll history until job completes. Returns output filename."""
        for i in range(timeout // poll_interval):
            time.sleep(poll_interval)
            try:
                h = requests.get(f"{self.host}/history/{prompt_id}", timeout=10).json()
                if prompt_id in h:
                    status = h[prompt_id].get("status", {}).get("status_str", "?")
                    outputs = h[prompt_id].get("outputs", {})
                    if status == "success" and save_node_id in outputs:
                        images = outputs[save_node_id].get("images", [])
                        if images:
                            return images[0]["filename"]
                    if status == "error":
                        msgs = h[prompt_id]["status"].get("messages", [])
                        for m in msgs:
                            if isinstance(m, list) and len(m) > 1:
                                if isinstance(m[1], dict) and "exception_message" in m[1]:
                                    raise RuntimeError(f"ComfyUI error: {m[1]['exception_message'][:200]}")
                        raise RuntimeError("ComfyUI execution error (no details)")
            except requests.exceptions.RequestException:
                continue  # ComfyUI may be loading models
        raise TimeoutError(f"ComfyUI did not finish within {timeout}s")

    def download_image(self, filename: str, output_path: str):
        """Download generated image from ComfyUI output."""
        r = requests.get(f"{self.host}/view",
                         params={"filename": filename, "type": "output"}, timeout=30)
        r.raise_for_status()
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(r.content)
        return os.path.getsize(output_path)

    def generate(self, workflow: dict, save_node_id: str = "12",
                 output_path: str = None, timeout: int = 420) -> str:
        """Full pipeline: unload ollama → queue → wait → download → free."""
        self.unload_ollama()
        pid = self.queue(workflow)
        filename = self.wait_for_result(pid, save_node_id, timeout)
        if output_path:
            self.download_image(filename, output_path)
        self.free_vram()
        return filename
```

- [ ] **Step 2: Testen**

```python
# Quick health check
from comfyui_client import ComfyUIClient
client = ComfyUIClient()
stats = client.health()
print(f"GPU: {stats['devices'][0]['name']}")
```

- [ ] **Step 3: Commit**

```bash
git add scripts/comfyui_client.py
git commit -m "feat: add ComfyUI API client (queue, poll, download, free)"
```

---

## Task 2: 5 Workflow-Builder-Funktionen

Jede Funktion baut ein Workflow-Dict — exakt wie `comfyui_image.py` es tut.

**Files:**
- Create: `scripts/wiki_image_workflows.py`

- [ ] **Step 1: Base Workflow Funktion (gemeinsame Basis fuer alle 5)**

```python
"""Wiki Image Workflows — 5 variants based on proven Social Poster config."""
import random

# Proven base configuration (comfyui_image.py lines 297-388)
BASE_MODELS = {
    "unet": "flux2_dev_fp8mixed.safetensors",
    "unet_dtype": "fp8_e4m3fn",
    "clip": "mistral_3_small_flux2_fp8.safetensors",
    "clip_type": "flux2",
    "vae": "flux2-vae.safetensors",
}

BRAND_SUFFIX = (
    "isometric composition, neon cyan accent lights, dark navy background, "
    "professional photography style, ultra-detailed, 8k, sharp focus, "
    "no text, no words, no letters, no watermarks, no logo"
)

LOGO_CONFIG = {
    "logo_filename": "logo-new.png",
    "logo_width_percent": 12.0,
    "position": "bottom-left",
    "padding_percent": 3.0,
    "opacity": 0.85,
}

TEXT_CONFIG = {
    "font_name": "SpaceGrotesk-Bold",
    "font_size": 72,
    "style": "brand_blue",
    "align_h": "center",
    "align_v": "top",
    "margin_x": 50,
    "margin_y": 50,
    "intensity": 1.0,
    "color_top_hex": "#FFFFFF",
    "color_bottom_hex": "#4262FF",
    "glow_color_hex": "#4262FF",
}


def _base_nodes(width, height, steps, prompt, text_overlay=None, seed=None):
    """Build the base workflow dict used by all variants."""
    if seed is None:
        seed = random.randint(0, 2**32)

    full_prompt = f"{prompt}, {BRAND_SUFFIX}"

    nodes = {
        "1": {"class_type": "UNETLoader", "inputs": {
            "unet_name": BASE_MODELS["unet"],
            "weight_dtype": BASE_MODELS["unet_dtype"]}},
        "2": {"class_type": "CLIPLoader", "inputs": {
            "clip_name": BASE_MODELS["clip"],
            "type": BASE_MODELS["clip_type"]}},
        "3": {"class_type": "VAELoader", "inputs": {
            "vae_name": BASE_MODELS["vae"]}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {
            "batch_size": 1, "height": height, "width": width}},
        "5": {"class_type": "CLIPTextEncode", "inputs": {
            "clip": ["2", 0], "text": full_prompt}},
        "5b": {"class_type": "CLIPTextEncode", "inputs": {
            "clip": ["2", 0], "text": ""}},
        "6": {"class_type": "FluxGuidance", "inputs": {
            "conditioning": ["5", 0], "guidance": 3.5}},
        "7": {"class_type": "KSampler", "inputs": {
            "model": ["1", 0], "positive": ["6", 0], "negative": ["5b", 0],
            "latent_image": ["4", 0], "seed": seed, "steps": steps,
            "cfg": 1.0, "sampler_name": "euler", "scheduler": "beta",
            "denoise": 1.0}},
        "8": {"class_type": "VAEDecode", "inputs": {
            "samples": ["7", 0], "vae": ["3", 0]}},
    }

    # Current image source node for chaining
    current = "8"
    next_id = 9

    return nodes, current, next_id, full_prompt


def _add_upscale_1_5x(nodes, current, next_id):
    """Add 1.5x lanczos upscale."""
    nid = str(next_id)
    nodes[nid] = {"class_type": "ImageScaleBy", "inputs": {
        "image": [current, 0], "upscale_method": "lanczos", "scale_by": 1.5}}
    return nid, next_id + 1


def _add_4k_upscale(nodes, current, next_id):
    """Add 4x NMKD AI upscale + cap at 3840x2160."""
    loader_id = str(next_id)
    upscale_id = str(next_id + 1)
    cap_id = str(next_id + 2)

    nodes[loader_id] = {"class_type": "UpscaleModelLoader", "inputs": {
        "model_name": "4x_NMKD-Superscale-SP_178000_G.pth"}}
    nodes[upscale_id] = {"class_type": "ImageUpscaleWithModel", "inputs": {
        "upscale_model": [loader_id, 0], "image": [current, 0]}}
    nodes[cap_id] = {"class_type": "ImageScale", "inputs": {
        "image": [upscale_id, 0], "upscale_method": "lanczos",
        "width": 3840, "height": 2160, "crop": "disabled"}}

    return cap_id, next_id + 3


def _add_face_detailer(nodes, current, next_id):
    """Add FaceDetailer (2-cycle, 0.45 denoise)."""
    detector_id = str(next_id)
    detailer_id = str(next_id + 1)

    nodes[detector_id] = {"class_type": "UltralyticsDetectorProvider", "inputs": {
        "model_name": "bbox/face_yolov8m.pt"}}
    nodes[detailer_id] = {"class_type": "FaceDetailer", "inputs": {
        "image": [current, 0],
        "model": ["1", 0], "clip": ["2", 0], "vae": ["3", 0],
        "positive": ["6", 0], "negative": ["5b", 0],
        "bbox_detector": [detector_id, 0],
        "guide_size": 512, "guide_size_for": True,
        "max_size": 1024, "seed": 0, "steps": 20,
        "cfg": 1.0, "sampler_name": "euler", "scheduler": "beta",
        "denoise": 0.45, "feather": 5,
        "noise_mask": True, "force_inpaint": True,
        "bbox_threshold": 0.5, "bbox_dilation": 10,
        "bbox_crop_factor": 3.0, "sam_detection_hint": "center-1",
        "sam_dilation": 0, "sam_threshold": 0.93,
        "sam_bbox_expansion": 0, "sam_mask_hint_threshold": 0.7,
        "sam_mask_hint_use_negative": "False",
        "drop_size": 10, "wildcard": "", "cycle": 2,
        "inpaint_model": False, "noise_mask_feather": 20}}

    return detailer_id, next_id + 2


def _add_logo(nodes, current, next_id):
    """Add AI Engineering logo overlay."""
    nid = str(next_id)
    nodes[nid] = {"class_type": "AIEngLogoOverlay", "inputs": {
        "image": [current, 0], **LOGO_CONFIG}}
    return nid, next_id + 1


def _add_text(nodes, current, next_id, text="AI Engineering"):
    """Add AI Engineering text overlay."""
    nid = str(next_id)
    nodes[nid] = {"class_type": "AIEngTextOverlay", "inputs": {
        "image": [current, 0], "text": text, **TEXT_CONFIG}}
    return nid, next_id + 1


def _add_save(nodes, current, next_id, prefix="output"):
    """Add save node."""
    nid = str(next_id)
    nodes[nid] = {"class_type": "SaveImage", "inputs": {
        "images": [current, 0], "filename_prefix": prefix}}
    return nid, next_id + 1
```

- [ ] **Step 2: 5 Workflow-Funktionen**

```python
# === W1: WIKI THUMBNAIL (512x384, 20 steps, Logo+Text, kein Upscale) ===
def build_thumbnail(prompt, text="", seed=None):
    nodes, cur, nid, _ = _base_nodes(512, 384, 20, prompt, seed=seed)
    cur, nid = _add_logo(nodes, cur, nid)
    if text:
        cur, nid = _add_text(nodes, cur, nid, text)
    save_id, _ = _add_save(nodes, cur, nid, "wiki_thumb")
    return nodes, save_id


# === W2: WIKI HERO (1344x768, 28 steps, 1.5x upscale, Logo) ===
def build_hero(prompt, seed=None):
    nodes, cur, nid, _ = _base_nodes(1344, 768, 28, prompt, seed=seed)
    cur, nid = _add_upscale_1_5x(nodes, cur, nid)
    cur, nid = _add_logo(nodes, cur, nid)
    save_id, _ = _add_save(nodes, cur, nid, "wiki_hero")
    return nodes, save_id


# === W3: SOCIAL HQ (variabel, 28 steps, 1.5x, Logo+Text) ===
def build_social(prompt, text="AI Engineering", width=1344, height=768, seed=None):
    nodes, cur, nid, _ = _base_nodes(width, height, 28, prompt, seed=seed)
    cur, nid = _add_upscale_1_5x(nodes, cur, nid)
    cur, nid = _add_logo(nodes, cur, nid)
    cur, nid = _add_text(nodes, cur, nid, text)
    save_id, _ = _add_save(nodes, cur, nid, "social_hq")
    return nodes, save_id


# === W4: BLOG HERO (1344x768, 28 steps, 4K upscale via .91, Logo) ===
def build_blog_hero(prompt, seed=None):
    """Stage 1 on .90: generate + logo. Stage 2 on .91: 4K upscale."""
    # Stage 1: Generation auf .90
    nodes, cur, nid, _ = _base_nodes(1344, 768, 28, prompt, seed=seed)
    cur, nid = _add_logo(nodes, cur, nid)
    save_id, _ = _add_save(nodes, cur, nid, "blog_hero_raw")
    return nodes, save_id
    # Stage 2 (4K upscale) runs separately on .91 via build_upscale_only()


# === W5: ULTRA 4K (1024x1024, 35 steps, FaceDetailer, 4K, Logo+Text) ===
def build_ultra(prompt, text="AI Engineering", seed=None):
    nodes, cur, nid, _ = _base_nodes(1024, 1024, 35, prompt, seed=seed)
    cur, nid = _add_face_detailer(nodes, cur, nid)
    cur, nid = _add_4k_upscale(nodes, cur, nid)
    cur, nid = _add_logo(nodes, cur, nid)
    cur, nid = _add_text(nodes, cur, nid, text)
    save_id, _ = _add_save(nodes, cur, nid, "ultra_4k")
    return nodes, save_id


# === UPSCALE ONLY (.91 worker) ===
def build_upscale_only(input_image="input_from_3090.png"):
    """Run on .91 — 4x NMKD upscale only (~2GB VRAM)."""
    nodes = {
        "1": {"class_type": "LoadImage", "inputs": {"image": input_image}},
        "2": {"class_type": "UpscaleModelLoader", "inputs": {
            "model_name": "4x_NMKD-Superscale-SP_178000_G.pth"}},
        "3": {"class_type": "ImageUpscaleWithModel", "inputs": {
            "upscale_model": ["2", 0], "image": ["1", 0]}},
        "4": {"class_type": "ImageScale", "inputs": {
            "image": ["3", 0], "upscale_method": "lanczos",
            "width": 3840, "height": 2160, "crop": "disabled"}},
        "5": {"class_type": "SaveImage", "inputs": {
            "images": ["4", 0], "filename_prefix": "upscaled_4k"}},
    }
    return nodes, "5"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/wiki_image_workflows.py
git commit -m "feat: add 5 wiki image workflow builders (based on proven Social Poster)"
```

---

## Task 3: Verifizieren — Jeder Workflow 1x testen

- [ ] **Step 1: W1 Thumbnail testen**

```python
from comfyui_client import ComfyUIClient
from wiki_image_workflows import build_thumbnail

client = ComfyUIClient()
workflow, save_id = build_thumbnail("minimalist Docker whale icon, dark background")
filename = client.generate(workflow, save_id, "test_w1_thumb.png")
print(f"W1 OK: {filename}")
```

Verifizieren: Bild existiert, ~512x384, Logo sichtbar.

- [ ] **Step 2: W2 Hero testen**

```python
workflow, save_id = build_hero("panoramic server room with glowing racks")
filename = client.generate(workflow, save_id, "test_w2_hero.png", timeout=300)
print(f"W2 OK: {filename}")
```

Verifizieren: ~2016x1152 (1344x768 * 1.5), Logo sichtbar.

- [ ] **Step 3: W3 Social testen**

```python
workflow, save_id = build_social("AI agent orchestrating multiple tasks", text="Agent Orchestration")
filename = client.generate(workflow, save_id, "test_w3_social.png", timeout=300)
print(f"W3 OK: {filename}")
```

Verifizieren: Logo + Text sichtbar.

- [ ] **Step 4: W5 Ultra testen (W4 = W2 + .91 Upscale, testen wir separat)**

```python
workflow, save_id = build_ultra("photorealistic portrait of a tech professional", text="AI Engineering")
filename = client.generate(workflow, save_id, "test_w5_ultra.png", timeout=600)
print(f"W5 OK: {filename}")
```

Verifizieren: 3840x2160 (4K), Logo + Text sichtbar, Gesichter detailliert.

- [ ] **Step 5: .91 Upscale Worker testen**

```python
client_91 = ComfyUIClient(host="http://localhost:8189", ollama_host=None)
# First copy a test image to .91 input
workflow, save_id = build_upscale_only("test_w2_hero.png")
filename = client_91.generate(workflow, save_id, "test_upscale_4k.png", timeout=120)
print(f".91 Upscale OK: {filename}")
```

- [ ] **Step 6: Commit**

```bash
git add scripts/
git commit -m "feat: verify all 5 workflows generate correct images"
```

**GATE:** Alle 5 Workflows generieren Bilder. Logo + Text sichtbar. Keine Errors.

---

## Task 4: Wiki Thumbnail Generator (60 Bilder)

- [ ] **Step 1: Generator-Script schreiben**

```python
"""Generate real thumbnails for all 60 wiki articles."""
from comfyui_client import ComfyUIClient
from wiki_image_workflows import build_thumbnail
# ... (article parsing from articles.ts + prompt templates per category)
# ... (batch generation with progress tracking)
# ... (WebP optimization)
```

Nutzt den SUBJECTS dict und PROMPTS dict aus dem alten generate-thumbnails.py,
aber mit dem neuen Client + Workflow-Builder.

- [ ] **Step 2: Test mit 3 Bildern**

```bash
python3 scripts/wiki_image_generator.py --slug docker-vs-swarm,ollama-tutorial,eu-ai-act
```

- [ ] **Step 3: Batch (60 Bilder)**

```bash
python3 scripts/wiki_image_generator.py --all
```

~60 Min bei ~60s pro Bild.

- [ ] **Step 4: PNG → WebP optimieren**

```python
from PIL import Image
# Resize to 200x150, WebP quality 85, max 50KB
```

- [ ] **Step 5: SVG Placeholder loeschen + articles.ts updaten**

- [ ] **Step 6: Build + E2E Tests + Push**

```bash
npm run build && npx serve out -l 3939 &
WIKI_URL=http://localhost:3939 npm run test:e2e
git add -A && git commit && git push
```

**GATE:** 60 echte WebP Thumbnails in der Wiki. Keine SVG Placeholder. CI gruen.

---

## Task 5: Workflow JSONs fuer UI exportieren

Nach erfolgreicher API-Generation koennen wir die Workflows aus der ComfyUI History als UI-Format exportieren.

- [ ] **Step 1: Fuer jeden Workflow einmal in UI oeffnen**
  http://10.40.10.90:8188 → History → letzten erfolgreichen Job laden → Save As

- [ ] **Step 2: Exportierte JSONs im Repo speichern**

```bash
# Von .90 holen
scp joe@10.40.10.90:comfyui-user/default/workflows/*.json media/comfyui-workflows/
git add media/comfyui-workflows/
git commit -m "feat: export verified workflow JSONs from ComfyUI UI"
```

---

## Task 6: Dokumentation + ERPNext

- [ ] **Step 1: WIKI-STYLE-GUIDE.md updaten**
  - 5 Workflow-Beschreibungen
  - Prompt-Templates pro Kategorie
  - Bild-Spezifikationen

- [ ] **Step 2: ERPNext Tasks schliessen**
  - TASK-371: SVG → echte Thumbnails
  - TASK-378: Custom Nodes persistent (geloest durch Image)

- [ ] **Step 3: open-notebook Source**
  - Bewiesene Konfiguration dokumentieren

---

## Dual-GPU Pipeline

```
.90 (RTX 3090, 24GB)              .91 (RTX 4070, 8GB)
┌─────────────────────┐           ┌──────────────────┐
│ W1: Thumbnail       │           │ Upscale Worker   │
│ W2: Hero            │           │ (4x NMKD)        │
│ W3: Social HQ       │──raw──→  │ LoadImage → 4K   │
│ W4: Blog Hero (raw) │           │ → SaveImage      │
│ W5: Ultra 4K        │           └──────────────────┘
└─────────────────────┘
```

.90 generiert, .91 upscalet parallel. Fuer W4 (Blog Hero):
1. .90 generiert 1344x768 mit Logo → speichert als blog_hero_raw
2. .91 laedt blog_hero_raw → 4x NMKD → cap 3840x2160 → speichert als blog_hero_4k

---

## Zeitschaetzung

| Task | Zeit |
|------|------|
| 1. ComfyUI Client | 15 min |
| 2. 5 Workflow Builder | 30 min |
| 3. Verifizieren (5 Test-Bilder) | 30 min |
| 4. 60 Thumbnails generieren | 90 min |
| 5. UI Export | 15 min |
| 6. Doku + ERPNext | 15 min |
| **Total** | **~3.5 Stunden** |
