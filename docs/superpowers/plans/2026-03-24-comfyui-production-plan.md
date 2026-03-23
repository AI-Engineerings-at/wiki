# ComfyUI Production Setup — B+C Plan

> **For agentic workers:** Use superpowers:subagent-driven-development.

**Goal:** Zwei funktionierende Workflows: B (bewährter Social Poster, sofort einsatzbereit) und C (ULTRA ohne LoRA, mit FaceDetailer + 4K). Dann 60 Wiki-Thumbnails mit B generieren.

**Basis:** Der Social Poster (`comfyui_image.py`) hat 500+ Bilder mit FLUX.2 Dev OHNE LoRA generiert. Das ist der bewiesene, funktionierende Workflow. Wir reproduzieren ihn exakt.

**Tech Stack:** ComfyUI (comfyui-prod:v2), FLUX.2 Dev FP8 auf .90 (RTX 3090), .91 (RTX 4070) als Upscale Worker

---

## Bewiesene Konfiguration (aus comfyui_image.py)

```
UNETLoader: flux2_dev_fp8mixed.safetensors, weight_dtype=fp8_e4m3fn
CLIPLoader: mistral_3_small_flux2_fp8.safetensors, type=flux2
VAELoader:  flux2-vae.safetensors
KSampler:   28 steps, euler, beta, cfg=1.0, guidance=3.5
Upscale:    ImageScaleBy 1.5x lanczos
Branding:   AIEngLogoOverlay (bottom-left, 12%, 0.85) + AIEngTextOverlay (brand_blue, top-center)
```

Kein LoRA. Kein FaceDetailer. Kein 4K Upscale. Funktioniert.

---

## Die zwei Workflows

### Workflow B: "Social HQ" (Reproduktion des bewährten Setups)

```
FLUX.2 Dev FP8 → KSampler 28 Steps → VAEDecode → 1.5x Upscale → Logo → Text → Save
```

- Fuer: Wiki-Thumbnails, Social Media Posts, Blog Hero Images
- Ausgangsgroesse: variabel (1024x1024, 1344x768, etc.)
- Endgroesse: 1.5x (z.B. 1536x1536 oder 2016x1152)
- Generierungszeit: ~180s (cold) / ~60s (warm)
- VRAM Peak: ~21GB

### Workflow C: "ULTRA" (B + FaceDetailer + 4K Upscale, OHNE LoRA)

```
FLUX.2 Dev FP8 → KSampler 35 Steps → VAEDecode → FaceDetailer → 4x NMKD → Cap 3840x2160 → Logo → Text → Save
```

- Fuer: Hero Images, Produktbilder, Praesentation-Assets
- Endgroesse: 3840x2160 (4K UHD)
- Generierungszeit: ~300-400s
- VRAM Peak: ~22GB (sequentiell, nicht gleichzeitig)
- .91 Alternative: Upscale-Worker-Only (4x NMKD auf .91, ~2GB VRAM)

---

## Task 1: Workflow B in ComfyUI UI bauen (NICHT JSON schreiben!)

**Methode:** Workflow in der ComfyUI UI zusammenklicken (Gotcha 15: nie JSON von Hand).

- [ ] **Step 1: ComfyUI UI oeffnen**
  http://10.40.10.90:8188, neuen leeren Workflow erstellen

- [ ] **Step 2: Nodes hinzufuegen (Rechtsklick → Add Node)**
  1. UNETLoader → `flux2_dev_fp8mixed.safetensors`, weight_dtype=`fp8_e4m3fn`
  2. CLIPLoader → `mistral_3_small_flux2_fp8.safetensors`, type=`flux2`
  3. VAELoader → `flux2-vae.safetensors`
  4. EmptyLatentImage → width=1024, height=1024, batch=1
  5. CLIPTextEncode (Positive) → Prompt-Text einfuegen
  6. CLIPTextEncode (Negative) → leer lassen
  7. FluxGuidance → guidance=3.5
  8. KSampler → steps=28, cfg=1.0, sampler=euler, scheduler=beta, denoise=1.0
  9. VAEDecode
  10. ImageScaleBy → method=lanczos, scale_by=1.5
  11. AIEngLogoOverlay → logo-new.png, bottom-left, 12%, padding 3%, opacity 0.85
  12. AIEngTextOverlay → text="AI Engineering", font=SpaceGrotesk-Bold, size=72, style=brand_blue, align=center/top
  13. SaveImage → prefix=social_hq

- [ ] **Step 3: Nodes verbinden**
  ```
  UNET(1) → KSampler.model
  CLIP(2) → Positive(5).clip + Negative(6).clip
  Positive(5) → FluxGuidance(7) → KSampler.positive
  Negative(6) → KSampler.negative
  VAE(3) → VAEDecode.vae
  EmptyLatent(4) → KSampler.latent_image
  KSampler → VAEDecode → ImageScaleBy → LogoOverlay → TextOverlay → Save
  ```

- [ ] **Step 4: Speichern als "social-hq-v3"**
  Ctrl+S oder Workflow Menu → Save

- [ ] **Step 5: Testen — Run druecken**
  Vorher: Ollama entladen (`curl -s -X POST http://10.40.10.90:11434/api/generate -d '{"model":"qwen3.5:27b","keep_alive":0}'`)
  Run → Warten → Bild pruefen (Logo sichtbar? Text sichtbar? Qualitaet OK?)

- [ ] **Step 6: Workflow JSON exportieren**
  Workflow Menu → Export → social-hq-v3.json speichern
  Das ist die EINZIGE Art wie wir Workflow JSONs erstellen — aus der UI exportiert.

**GATE:** Bild existiert, Logo + Text sichtbar, keine Errors. Erst dann weiter.

---

## Task 2: Workflow C in UI bauen (B + FaceDetailer + 4K)

Basiert auf dem funktionierenden Workflow B.

- [ ] **Step 1: Workflow B duplizieren**
  Workflow B laden → Save As "ultra-v2"

- [ ] **Step 2: Zusaetzliche Nodes einfuegen**
  Nach VAEDecode, VOR ImageScaleBy:
  - UltralyticsDetectorProvider → bbox/face_yolov8m.pt
  - FaceDetailer → guide_size=512, bbox, 20 steps, euler, beta, denoise=0.45, 2 cycles

  ImageScaleBy(1.5x) ERSETZEN durch:
  - UpscaleModelLoader → 4x_NMKD-Superscale-SP_178000_G.pth
  - ImageUpscaleWithModel (4x AI Upscale)
  - ImageScale → width=3840, height=2160, method=lanczos, crop=disabled

  KSampler Steps von 28 auf 35 erhoehen.

- [ ] **Step 3: Verbindungen pruefen**
  FaceDetailer braucht: image, model, clip, vae, positive, negative, bbox_detector
  Alle von den gleichen Quellen wie KSampler (UNET→model, CLIP→clip, VAE→vae, FluxGuidance→positive, empty→negative)

- [ ] **Step 4: Speichern + Testen**
  Run → Warten (~300-400s) → 4K Bild pruefen

- [ ] **Step 5: Exportieren als ultra-v2.json**

**GATE:** 4K Bild generiert mit FaceDetailer + Logo + Text.

---

## Task 3: Workflow B fuer Thumbnails anpassen

- [ ] **Step 1: Workflow B laden → Save As "wiki-thumbnail-v2"**

- [ ] **Step 2: Aendern:**
  - EmptyLatentImage: 512x384 (Thumbnail-Groesse)
  - KSampler Steps: 20 (schneller, reicht fuer Thumbnails)
  - ImageScaleBy: 1.0 (kein Upscale noetig)
  - SaveImage prefix: wiki_thumb

- [ ] **Step 3: Testen mit einem Prompt**
  Prompt: "minimalist Docker whale icon, dark navy background #0B0C0F, neon blue accent #4262FF, clean flat vector, professional tech illustration"

- [ ] **Step 4: Exportieren als wiki-thumbnail-v2.json**

**GATE:** Thumbnail sieht gut aus bei 512x384 mit Logo + Text.

---

## Task 4: generate-thumbnails.py anpassen

- [ ] **Step 1: Exportierten wiki-thumbnail-v2.json als API-Format konvertieren**
  ComfyUI exportiert UI-Format. Fuer API brauchen wir das Prompt-Format.
  Methode: In der UI "Save (API Format)" waehlen, oder via Python konvertieren.

- [ ] **Step 2: Script anpassen**
  `scripts/generate-thumbnails.py` muss den exportierten Workflow verwenden, nicht handgebaute API-Calls.

- [ ] **Step 3: Test mit 1 Bild**
  ```bash
  python3 scripts/generate-thumbnails.py --slug docker-vs-swarm
  ```

- [ ] **Step 4: Batch (60 Bilder)**
  ```bash
  python3 scripts/generate-thumbnails.py
  ```
  ~60 Min bei ~60s pro Bild (20 Steps, 512x384)

- [ ] **Step 5: Optimieren + Deployen**
  PNG → WebP (<50KB), articles.ts updaten, SVG Placeholder loeschen, build + push

**GATE:** 60 echte Thumbnails in der Wiki, keine Placeholder.

---

## Task 5: .91 Upscale Worker (fuer Workflow C)

- [ ] **Step 1: Upscale Worker Workflow in UI auf .91 bauen**
  http://localhost:8189
  Nodes: LoadImage → UpscaleModelLoader (4x_NMKD) → ImageUpscaleWithModel → SaveImage

- [ ] **Step 2: 4x_NMKD Modell auf .91 sicherstellen**
  Falls nicht im Volume: runterladen (64MB)

- [ ] **Step 3: Testen**
  Ein Bild von .90 Output nehmen → auf .91 hochladen → Upscale → pruefen

---

## Reihenfolge

```
Task 1 (Workflow B in UI) → GATE
  ↓
Task 2 (Workflow C in UI) → GATE    [parallel moeglich]
Task 3 (Thumbnail Workflow) → GATE
  ↓
Task 4 (60 Thumbnails generieren) → GATE
  ↓
Task 5 (.91 Upscale Worker)         [unabhaengig, parallel]
```

## Regeln

1. **Workflows NUR in der UI bauen** — nie JSON editieren (Gotcha 15)
2. **Bewährte Konfiguration reproduzieren** — exakt wie comfyui_image.py
3. **Kein LoRA fuer FLUX.2 Dev** — existiert nicht, ist nicht noetig
4. **Ollama entladen vor Generation** — `keep_alive:0`
5. **VRAM /free nach Generation** — `unload_models:true, free_memory:true`
6. **Verifizieren nach jedem Schritt** — Bild existiert + sieht korrekt aus
7. **MSYS_NO_PATHCONV=1** bei jedem Docker-Befehl
