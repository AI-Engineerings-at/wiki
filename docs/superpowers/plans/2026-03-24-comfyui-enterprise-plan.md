# ComfyUI Enterprise Setup — Definitive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development.
> Steps use checkbox (`- [ ]`) syntax for tracking.
> **RULES:** Lies vor dem Tun. Verifiziere vor dem Weitergehen. Kein Raten.

**Goal:** Production-grade ComfyUI auf .90 + .91 mit allen empfohlenen Plugins, MCP-Integration, 5 Workflow-Varianten, KJNodes-Speedup, und 60 echte Wiki-Thumbnails.

**Architecture:** Docker Image v3 mit allen Plugins eingebacken. comfy-pilot MCP fuer direkte Claude Code ↔ ComfyUI Steuerung. 5 Workflows generiert via Python Script (wie create_comfyui_v3_workflows.py). KJNodes TeaCache fuer 2x Speedup.

**Tech Stack:** ComfyUI, FLUX.2 Dev FP8, Python 3.11, comfy-pilot MCP, KJNodes, Docker

---

## Bewiesene Basis

| Fakt | Quelle |
|------|--------|
| 500+ Bilder mit FLUX.2 Dev OHNE LoRA | comfyui_image.py Zeilen 297-388 |
| Workflow-JSONs wurden per Python Script generiert | create_comfyui_v3_workflows.py |
| Die JSONs sind UI-Backups, Pipeline baut dynamisch | media/comfyui-workflows/README.md |
| flux2-dev-social-hq.json hat 12 Nodes, 13 Links | Verifiziert |
| TeaCache gibt 2x Speedup bei FLUX.2 | KJNodes docs + community reports |
| Dual-GPU: nur Batch-Parallel, kein VRAM-Sharing | Research (separate Maschinen) |
| comfy-pilot: MCP-Server als Custom Node | ConstantineB6/comfy-pilot |

---

## Task 1: Docker Image v3 — Alle Plugins eingebacken

Baut auf comfyui-prod:v2 auf, fuegt fehlende Plugins hinzu.

**Files:**
- Modify: `C:/Users/Legion/Documents/comfyui-build/Dockerfile`

- [ ] **Step 1: Dockerfile erweitern**

Zum bestehenden Dockerfile (das bereits hat: Manager, Impact Pack, Subpack, GGUF, ai-eng-nodes, Fonts, Logo) hinzufuegen:

```dockerfile
# === NEU: Enterprise Plugins ===

# KJNodes — TeaCache, First Block Cache, Speedups
RUN cd custom_nodes && \
    git clone --depth 1 https://github.com/kijai/ComfyUI-KJNodes.git

# Custom-Scripts — Autocomplete, Auto-Queue, Bookmarks
RUN cd custom_nodes && \
    git clone --depth 1 https://github.com/pythongosssss/ComfyUI-Custom-Scripts.git

# rgthree — Power-User-Nodes, Link-Fixer
RUN cd custom_nodes && \
    git clone --depth 1 https://github.com/rgthree/rgthree-comfy.git

# Crystools — GPU/VRAM/RAM Monitoring in UI
RUN cd custom_nodes && \
    git clone --depth 1 https://github.com/crystian/ComfyUI-Crystools.git

# comfy-pilot — MCP Bridge (Claude Code ↔ ComfyUI)
RUN cd custom_nodes && \
    git clone --depth 1 https://github.com/ConstantineB6/comfy-pilot.git

# KJNodes dependencies
RUN pip install --no-cache-dir color-matcher
```

- [ ] **Step 2: Image bauen auf .90**

```bash
scp -r comfyui-build/* joe@10.40.10.90:comfyui-build/
ssh joe@10.40.10.90 "cd comfyui-build && docker build -t comfyui-prod:v3 -f Dockerfile ."
```

- [ ] **Step 3: Image bauen auf .91**

```bash
cd C:/Users/Legion/Documents/comfyui-build
docker build -t comfyui-prod:v3 .
```

- [ ] **Step 4: Container starten**

.90:
```bash
ssh joe@10.40.10.90 "docker rm -f comfyui && docker run -d --name comfyui --gpus all -p 8188:8188 \
  -v comfyui-models:/workspace/models \
  -v comfyui-output:/workspace/output \
  -v comfyui-user:/workspace/user \
  --restart unless-stopped comfyui-prod:v3"
```

.91:
```bash
MSYS_NO_PATHCONV=1 docker rm -f comfyui-local
MSYS_NO_PATHCONV=1 docker run -d --name comfyui-local --gpus all -p 8189:8188 \
  -v comfyui-models-local:/workspace/models \
  -v C:/comfyui-output-local:/workspace/output \
  -v comfyui-user-local:/workspace/user \
  --restart unless-stopped comfyui-prod:v3
```

- [ ] **Step 5: Verifizieren — ALLE Nodes auf beiden Maschinen**

```bash
for node in AIEngLogoOverlay AIEngTextOverlay UNETLoader CLIPLoader FluxGuidance \
  KSampler ImageScaleBy UpscaleModelLoader UnetLoaderGGUF \
  ApplyTeaCacheFlux ApplyFirstBlockCache; do
  r90=$(curl -s "http://10.40.10.90:8188/object_info/$node" 2>/dev/null | python3 -c "..." 2>/dev/null)
  r91=$(curl -s "http://localhost:8189/object_info/$node" 2>/dev/null | python3 -c "..." 2>/dev/null)
  echo "$node: .90=$r90 .91=$r91"
done
```

**GATE:** Alle Nodes OK auf beiden. Crystools zeigt GPU-Stats in UI.

- [ ] **Step 6: Commit Dockerfile**

```bash
git add comfyui-build/Dockerfile
git commit -m "feat: comfyui-prod:v3 with KJNodes, Crystools, comfy-pilot MCP, Custom-Scripts, rgthree"
```

---

## Task 2: MCP Integration (comfy-pilot)

- [ ] **Step 1: MCP Config fuer Claude Code**

Erstelle `.mcp.json` im Wiki-Repo oder in `.claude/`:

```json
{
  "mcpServers": {
    "comfyui": {
      "command": "python3",
      "args": ["/path/to/comfy-pilot/mcp_server.py"],
      "env": {
        "COMFYUI_URL": "http://10.40.10.90:8188"
      }
    }
  }
}
```

Oder alternativ via `artokun/comfyui-mcp` wenn comfy-pilot nicht funktioniert.

- [ ] **Step 2: Testen**

```
Claude: "Show me the current ComfyUI workflows"
Claude: "Load flux2-dev-social-hq workflow"
Claude: "Run the workflow with prompt 'Docker whale icon'"
```

- [ ] **Step 3: Dokumentieren**

Notiz: MCP ist optional fuer die Workflow-Erstellung. Die Workflows werden per Script generiert. MCP ist fuer Testing und Monitoring.

**GATE:** Claude Code kann ComfyUI ueber MCP ansprechen.

---

## Task 3: 5 Workflow-Varianten erstellen (via Python Script)

**Methode:** Python Script generiert UI-Format JSONs. Gleiche Methode wie `create_comfyui_v3_workflows.py`. Basiert auf dem verifizierten `flux2-dev-social-hq.json` Format (12 Nodes, 13 Links).

**Files:**
- Create: `scripts/create_wiki_workflows.py`

- [ ] **Step 1: Script schreiben**

Das Script generiert 5 JSON-Dateien im ComfyUI UI-Format:

```python
"""Generate 5 wiki workflow JSONs in ComfyUI UI format.
Based on create_comfyui_v3_workflows.py + flux2-dev-social-hq.json"""
import json
import uuid

# ... (Node builder functions)
# ... (Link builder functions)
# ... (5 workflow functions)

# Output:
# 1. wiki-thumbnail.json      — 512x384, 20 steps, Logo+Text
# 2. wiki-hero.json            — 1344x768, 28 steps, 1.5x, Logo
# 3. social-hq-v4.json         — variable, 28 steps, 1.5x, Logo+Text
# 4. blog-hero-4k.json         — 1344x768, 35 steps, 4x NMKD, Logo
# 5. ultra-4k.json             — 1024x1024, 35 steps, 4x NMKD, Logo+Text
```

Jeder Workflow hat:
- `"workflowRendererVersion": "Vue"` (KEIN frontendVersion!)
- `"flags": {}` auf jedem Node
- UUID als id
- `"version": 0.4`
- Korrekte `inputs[]` mit `link` Referenzen
- Korrekte `outputs[]` mit `links` Arrays
- Korrekte globale `links[]`

**Optional: KJNodes TeaCache Node einfuegen** (als bypass-barer Node vor KSampler):
- `ApplyTeaCacheFlux` mit `rel_l1_thresh: 0.4` fuer 2x Speedup
- Kann in UI ein/ausgeschaltet werden

- [ ] **Step 2: Script ausfuehren**

```bash
python3 scripts/create_wiki_workflows.py
```

Output: 5 JSON-Dateien in `media/comfyui-workflows/`

- [ ] **Step 3: Auf .90 deployen**

```bash
for wf in wiki-thumbnail wiki-hero social-hq-v4 blog-hero-4k ultra-4k; do
  scp "media/comfyui-workflows/$wf.json" joe@10.40.10.90:$wf.json
  ssh joe@10.40.10.90 "docker cp $wf.json comfyui:/workspace/user/default/workflows/"
done
```

- [ ] **Step 4: In UI laden und visuell pruefen**

Jeden Workflow in der UI oeffnen:
- Keine roten Nodes
- Keine fehlenden Verbindungen
- Alle Modell-Dropdowns zeigen die richtigen Werte

- [ ] **Step 5: Jeden Workflow 1x Run testen**

```
W1 (Thumbnail): Prompt "Docker whale", 512x384 → ~40s
W2 (Hero): Prompt "server room", 1344x768 → ~90s
W3 (Social): Prompt "AI orchestration", 1344x768 → ~90s
W4 (Blog 4K): Prompt "infrastructure", 1344x768 → ~180s (mit 4K Upscale)
W5 (Ultra): Prompt "tech illustration", 1024x1024 → ~240s (35 Steps + 4K)
```

Verifizieren: Bild existiert, Logo sichtbar, Qualitaet OK.

- [ ] **Step 6: Commit**

```bash
git add scripts/create_wiki_workflows.py media/comfyui-workflows/
git commit -m "feat: 5 wiki workflow JSONs (thumbnail, hero, social, blog-4k, ultra-4k)"
```

**GATE:** Alle 5 Workflows generieren Bilder in der UI. Keine Errors.

---

## Task 4: 60 Wiki-Thumbnails generieren

- [ ] **Step 1: Thumbnail-Generator Script**

```python
"""Generate 60 wiki thumbnails via ComfyUI API."""
# Liest articles.ts → 60 Artikel
# Pro Artikel: baut Workflow-Dict (wie comfyui_image.py)
# POST an ComfyUI API → poll → download → WebP optimize
```

Nutzt den W1 (Thumbnail) Workflow als Basis. Prompts pro Kategorie + Artikel.

- [ ] **Step 2: Test mit 3 Bildern**

```bash
python3 scripts/wiki_image_generator.py --slugs docker-vs-swarm,eu-ai-act,ollama-tutorial
```

- [ ] **Step 3: Batch (60 Bilder)**

```bash
python3 scripts/wiki_image_generator.py --all
```

Dauer: ~60 Min (60 Bilder × ~60s)

- [ ] **Step 4: PNG → WebP optimieren**

200x150px, quality 85, max 50KB pro Bild.

- [ ] **Step 5: SVG Placeholder loeschen**

```bash
rm -f public/images/thumbnails/**/*.svg
rm -f public/images/thumbnails/**/.gitkeep
```

- [ ] **Step 6: articles.ts updaten**

Alle 60 Artikel: `thumbnail: '/images/thumbnails/<cat>/<slug>.webp'`

- [ ] **Step 7: Build + Test + Push**

```bash
npm run build
npx serve out -l 3939 &
WIKI_URL=http://localhost:3939 npm run test:e2e
git add -A && git commit -m "feat: 60 real ComfyUI thumbnails replacing SVG placeholders"
git push origin main
```

**GATE:** 60 echte WebP Thumbnails live. CI gruen. Keine SVGs mehr.

---

## Task 5: Dokumentation + Cleanup

- [ ] **Step 1: WIKI-STYLE-GUIDE.md**
  - 5 Workflow-Beschreibungen mit Prompt-Templates
  - Bild-Pipeline Architektur
  - Thumbnail-Spezifikation

- [ ] **Step 2: Dockerfile + Scripts ins phantom-ai Repo**
  - `media/comfyui-workflows/Dockerfile.v3`
  - Scripts als Reference

- [ ] **Step 3: ERPNext Tasks schliessen**
  - TASK-371: SVG → echte Thumbnails
  - TASK-378: Custom Nodes persistent
  - TASK-376: .91 GGUF (Batch Worker Setup)

- [ ] **Step 4: open-notebook KB**
  - Workflow-Konfiguration
  - Plugin-Liste
  - MCP Setup

- [ ] **Step 5: Bild-Chaos aufraeumen**
  - 203 orphaned Files loeschen (nach Verifikation)
  - comfyui-from-90/ Ordner loeschen

---

## Zeitschaetzung

| Task | Zeit |
|------|------|
| 1. Docker Image v3 bauen | 20 min (Build) |
| 2. MCP Integration | 15 min |
| 3. 5 Workflows erstellen + testen | 45 min |
| 4. 60 Thumbnails generieren | 90 min |
| 5. Dokumentation + Cleanup | 30 min |
| **Total** | **~3.5 Stunden** |

---

## Warum DIESER Plan und kein anderer

1. **Docker Image mit allen Plugins** — Gotcha 13 gelernt: nie zur Laufzeit installieren
2. **Python Script generiert JSONs** — so wie die funktionierenden v3 Workflows erstellt wurden
3. **Kein LoRA** — FLUX.2 Dev braucht keins (32B Params, Mistral 3B Encoder)
4. **Kein FaceDetailer** — keine Gesichter in Wiki-Bildern
5. **KJNodes TeaCache** — 2x Speedup ohne Qualitaetsverlust
6. **MCP (comfy-pilot)** — direkter Zugriff statt SSH+Docker Chaos
7. **Workflows in UI testbar** — JSONs im UI-Format, nicht API-Format
8. **Bewiesener Stil** — gleicher Brand-Suffix wie 500+ Social Poster Bilder
