# ComfyUI Correct Setup — Plan (Post-Mortem Informed)

> **For agentic workers:** Use superpowers:executing-plans. Follow the 4-phase gate model.
> **RULE:** Read before act. Verify before proceed. No guessing.

**Goal:** ComfyUI on .90 (RTX 3090) + .91 (RTX 4070 8GB) with persistent custom nodes, Joe's Ultra Quality workflow running, and 60 wiki thumbnails generated.

**Root Blocker:** TASK-2026-00378 — Custom nodes in ephemeral container filesystem. Every restart loses them.

---

## Phase 1: Build Docker Image WITH Custom Nodes (do once, get right)

**The fix:** Bake ALL custom nodes + dependencies into the Docker image. Never install at runtime again.

### Step 1: Create Dockerfile

Create `C:/Users/Legion/Documents/phantom-ai/media/comfyui-workflows/Dockerfile.production`:

```dockerfile
FROM pytorch/pytorch:2.6.0-cuda12.6-cudnn9-runtime

WORKDIR /workspace

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    git wget ffmpeg libgl1-mesa-glx libglib2.0-0 curl \
    && rm -rf /var/lib/apt/lists/*

# ComfyUI core (latest)
RUN git clone --depth 1 https://github.com/comfyanonymous/ComfyUI.git .
RUN pip install --no-cache-dir -r requirements.txt

# Custom Nodes — baked into image
RUN cd custom_nodes && \
    git clone --depth 1 https://github.com/ltdrdata/ComfyUI-Manager.git && \
    git clone --depth 1 https://github.com/ltdrdata/ComfyUI-Impact-Pack.git && \
    git clone --depth 1 https://github.com/ltdrdata/ComfyUI-Impact-Subpack.git && \
    git clone --depth 1 https://github.com/city96/ComfyUI-GGUF.git

# Impact Pack dependencies
RUN pip install --no-cache-dir scikit-image piexif ultralytics segment-anything-py gguf

# AI Engineering custom nodes (Logo + Text Overlay)
COPY ai_eng_nodes.py custom_nodes/ai-eng-nodes/ai_eng_nodes.py
RUN echo "from .ai_eng_nodes import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS" \
    > custom_nodes/ai-eng-nodes/__init__.py

# Fonts for Text Overlay
RUN mkdir -p custom_nodes/ComfyUI_Comfyroll_CustomNodes/fonts
COPY SpaceGrotesk-Bold.ttf custom_nodes/ComfyUI_Comfyroll_CustomNodes/fonts/
COPY Montserrat-Bold.ttf custom_nodes/ComfyUI_Comfyroll_CustomNodes/fonts/

# Logo for branding overlay
COPY logo-new.png input/logo-new.png

# Directories for volume mounts
RUN mkdir -p models/checkpoints models/unet models/clip models/vae \
    models/loras models/upscale_models models/ultralytics/bbox \
    output user/default/workflows input

EXPOSE 8188
CMD ["python", "main.py", "--listen", "0.0.0.0", "--port", "8188", "--disable-pinned-memory"]
```

### Step 2: Gather build context files

Copy to build directory:
- `ai_eng_nodes.py` from `C:/Users/Legion/Documents/ai_eng_nodes.py`
- `SpaceGrotesk-Bold.ttf` + `Montserrat-Bold.ttf` (download from Google Fonts)
- `logo-new.png` from `Playbook01/landing-page/public/logo-new.png`

### Step 3: Build on .90

```bash
scp -r build-context/ joe@10.40.10.90:comfyui-build/
ssh joe@10.40.10.90 "cd comfyui-build && docker build -t comfyui-prod:v2 -f Dockerfile.production ."
```

**Verify:** `docker run --rm comfyui-prod:v2 python -c "import importlib; print('OK')"`

### Step 4: Build on .91

Same image works on both GPUs — just different model files.

```bash
docker build -t comfyui-prod:v2 -f Dockerfile.production .
```

**GATE:** Do NOT proceed until both images build successfully and `docker logs` shows all custom nodes loaded without errors.

---

## Phase 2: Volume Architecture (models + output + user)

### .90 (RTX 3090 — Main Generator)

```bash
ssh joe@10.40.10.90 "docker stop comfyui; docker rm comfyui; \
docker run -d --name comfyui --gpus all -p 8188:8188 \
  -v comfyui-models:/workspace/models \
  -v C:\comfyui-output:/workspace/output \
  -v comfyui-user:/workspace/user \
  --restart unless-stopped \
  comfyui-prod:v2"
```

### .91 (RTX 4070 8GB — Upscale Worker)

```bash
docker stop comfyui-local; docker rm comfyui-local; \
docker run -d --name comfyui-local --gpus all -p 8189:8188 \
  -v comfyui-models-local:/workspace/models \
  -v C:/comfyui-output-local:/workspace/output \
  -v comfyui-user-local:/workspace/user \
  --restart unless-stopped \
  comfyui-prod:v2
```

**Verify on both:**
1. `curl -s http://<host>:<port>/system_stats` → GPU detected
2. `curl -s http://<host>:<port>/object_info/AIEngLogoOverlay` → AVAILABLE
3. `curl -s http://<host>:<port>/object_info/AIEngTextOverlay` → AVAILABLE
4. `curl -s http://<host>:<port>/object_info/FaceDetailer` → AVAILABLE
5. `curl -s http://<host>:<port>/object_info/UnetLoaderGGUF` → AVAILABLE

**GATE:** ALL 5 checks must pass on BOTH machines.

---

## Phase 3: Deploy Joe's Workflows + Models

### Models on .90 (already in comfyui-models volume from previous downloads)

Verify:
```bash
ssh joe@10.40.10.90 "docker exec comfyui ls -lh /workspace/models/unet/ /workspace/models/clip/ /workspace/models/vae/ /workspace/models/loras/ /workspace/models/upscale_models/"
```

Expected:
- `unet/flux2_dev_fp8mixed.safetensors` (35GB)
- `clip/mistral_3_small_flux2_fp8.safetensors` (18GB)
- `clip/clip_l.safetensors` (235MB)
- `clip/t5xxl_fp8_e4m3fn.safetensors` (4.6GB)
- `vae/flux2-vae.safetensors` (321MB)
- `loras/flux-detailer.safetensors` (656MB) — NOTE: FLUX.1 only, may not work with FLUX.2
- `upscale_models/4x_NMKD-Superscale-SP_178000_G.pth` (64MB)
- `ultralytics/bbox/face_yolov8m.pt` (50MB)

### Deploy Joe's workflows

```bash
# ULTRA workflow to .90
scp flux2-social-hq-ULTRA.json joe@10.40.10.90:flux2-social-hq-ULTRA.json
ssh joe@10.40.10.90 "docker cp flux2-social-hq-ULTRA.json comfyui:/workspace/user/default/workflows/"

# Upscale worker to .91
MSYS_NO_PATHCONV=1 docker cp flux2-upscale-worker-4070.json comfyui-local:/workspace/user/default/workflows/
```

### Test in UI

1. Open http://10.40.10.90:8188
2. Workflows sidebar → flux2-social-hq-ULTRA
3. Check: NO red nodes, NO alerts, NO validation errors
4. Click Run
5. Wait for completion (~3-5 min)
6. Check: output image exists in C:\comfyui-output\

**GATE:** Image generated successfully with Logo + Text overlay visible.

---

## Phase 4: Generate 60 Wiki Thumbnails

Only after Phases 1-3 are verified.

1. Update `scripts/generate-thumbnails.py` to use the ULTRA workflow API format
2. Test with 1 thumbnail
3. Verify output quality
4. Run full batch (60 images)
5. Optimize to WebP (<50KB)
6. Update articles.ts
7. Delete SVG placeholders
8. Build + test + push

---

## What NOT to do (learned from this session)

- Do NOT install custom nodes at runtime via docker exec
- Do NOT hand-write ComfyUI workflow JSON
- Do NOT assume LoRA compatibility across FLUX versions
- Do NOT use SSH for long-running downloads (use docker exec -d)
- Do NOT forget MSYS_NO_PATHCONV=1 on Windows
- Do NOT skip VRAM budget calculation
- Do NOT proceed without verifying each step
