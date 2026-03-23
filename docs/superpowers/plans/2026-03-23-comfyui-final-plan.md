# ComfyUI Production Workflow — Final Plan

> **For agentic workers:** Use superpowers:subagent-driven-development.
> Steps use checkbox syntax for tracking.

**Goal:** Funktionierender ComfyUI Workflow auf .90 fuer Wiki Thumbnails + Social Media mit Logo + Text Overlay.

**Architecture:** Joe's ULTRA Workflow nutzen, LoRA-Node bypassen (kein FLUX.2-kompatibler Isometric LoRA existiert), stattdessen FLUX.2 Dev ohne LoRA (hat bereits exzellente Qualitaet bei 35 Steps). Alternativ: Flux2 Turbo LoRA fuer Speed.

**Tech Stack:** ComfyUI (comfyui-prod:v2 Image), FLUX.2 Dev FP8, RTX 3090 24GB

---

## Bestandsaufnahme (verifiziert)

### Was FUNKTIONIERT auf .90
- [x] Docker Image comfyui-prod:v2 mit allen Custom Nodes eingebacken
- [x] Alle Nodes laden: AIEngLogoOverlay, AIEngTextOverlay, FaceDetailer, UNETLoader, UnetLoaderGGUF
- [x] Modelle im Volume: flux2_dev_fp8mixed (35GB), mistral_3_small_flux2_fp8 (18GB), flux2-vae (321MB), 4x_NMKD (64MB)
- [x] Logo + Fonts im Image
- [x] Workflow flux2-social-hq-ULTRA.json in UI sichtbar

### Was FEHLT
- [ ] `isometric-tech-style.safetensors` LoRA — existiert NICHT. Joe's Workflow ist ein Beispiel.
- [ ] Kein FLUX.2 Dev kompatibler Detail-LoRA existiert (nur fuer Klein 9B)

### Optionen

| Option | LoRA | Qualitaet | Kompatibel |
|--------|------|-----------|------------|
| A. FLUX.2 Dev OHNE LoRA, 35 Steps | Keins | Sehr gut | JA |
| B. FLUX.2 Dev + Turbo LoRA (8 Steps) | Flux2TurboComfyv2 | Gut, 4x schneller | JA |
| C. FLUX.2 Klein 9B + Detail LoRA | Klein-spezifisch | Gut | JA aber anderes Modell |

**Empfehlung: Option A** — FLUX.2 Dev bei 35 Steps ist bereits Ultra Quality. Kein LoRA noetig. FaceDetailer + 4K Upscale + Logo + Text funktionieren alle ohne LoRA.

---

## Task 1: LoRA-Node in Joe's Workflow bypassen

**Warum:** Kein FLUX.2-kompatibler Isometric LoRA existiert. Die LoRA-Node muss deaktiviert (bypass) oder entfernt werden.

**Methode:** In der ComfyUI UI: Rechtsklick auf LoRA-Node → "Bypass" oder "Mute". Dann UNET und CLIP direkt an KSampler + Prompt verbinden.

- [ ] **Step 1: Workflow in UI oeffnen**
  Open http://10.40.10.90:8188, load flux2-social-hq-ULTRA

- [ ] **Step 2: LoRA Node bypassen**
  Rechtsklick auf "LoRA — Isometric Tech Style" Node → Bypass/Mute
  ODER: In der JSON widgets_values fuer LoRA strength auf 0.0 setzen

- [ ] **Step 3: Verbindungen pruefen**
  - UNET (Node 1) → direkt zu KSampler model input
  - CLIP (Node 2) → direkt zu Positive/Negative Prompt clip input
  (Wenn LoRA bypassed ist, leitet ComfyUI automatisch durch)

- [ ] **Step 4: Run testen**
  Click Run. Warten auf Completion. Bild pruefen.

- [ ] **Step 5: Workflow aus UI exportieren**
  Workflow speichern (Ctrl+S in UI). Das exportierte JSON hat korrekte Links.

---

## Task 2: Test-Bild generieren und verifizieren

- [ ] **Step 1: Ollama entladen**
  ```bash
  curl -s -X POST http://10.40.10.90:11434/api/generate -d '{"model":"qwen3.5:27b","keep_alive":0}'
  ```

- [ ] **Step 2: Run in UI mit Test-Prompt**
  Positive Prompt: "isometric server rack with glowing AI chip, neon blue accent lights, dark navy background, professional tech illustration, ultra-detailed, 8k"

- [ ] **Step 3: Warten + Verifizieren**
  - Generation ~3-5 min (35 Steps + FaceDetailer + 4K Upscale)
  - Output pruefen: Bild existiert, Logo sichtbar (bottom-left), Text sichtbar (top-center)
  - VRAM-Peak dokumentieren

- [ ] **Step 4: /free ausfuehren**
  ```bash
  curl -s -X POST http://10.40.10.90:8188/free -d '{"unload_models":true,"free_memory":true}'
  ```

---

## Task 3: Thumbnail-Workflow ableiten (ohne FaceDetailer + Upscale)

Fuer Wiki-Thumbnails brauchen wir NICHT die volle Ultra Quality Pipeline.
Thumbnails sind 200x150px — 4K Upscale ist Verschwendung.

- [ ] **Step 1: In UI den ULTRA Workflow vereinfachen**
  - FaceDetailer Node → Bypass (Thumbnails haben selten Gesichter)
  - 4K Upscale → Bypass (Thumbnails sind klein)
  - ImageScale Cap → Bypass
  - Ergebnis: FLUX.2 Dev → VAEDecode → Logo → Text → Save

- [ ] **Step 2: EmptyLatentImage auf 512x384 aendern**
  Thumbnail-Groesse statt 1024x1024

- [ ] **Step 3: Steps auf 20 reduzieren**
  Thumbnails brauchen nicht 35 Steps

- [ ] **Step 4: Als "flux2-wiki-thumbnail" speichern**
  Workflow → Save As → flux2-wiki-thumbnail

- [ ] **Step 5: Test-Thumbnail generieren**
  Run mit einem Prompt, Bild pruefen

---

## Task 4: 60 Thumbnails generieren

Erst NACH Task 1-3 verifiziert.

- [ ] **Step 1: generate-thumbnails.py anpassen**
  Script muss den gespeicherten Workflow (aus Task 3, Step 4) als API-Format nutzen.
  NICHT manuell API-Calls bauen — den von ComfyUI exportierten Workflow verwenden.

- [ ] **Step 2: Test mit 1 Bild**
  ```bash
  python3 scripts/generate-thumbnails.py --slug docker-vs-swarm
  ```
  Verifizieren: Bild existiert, sieht gut aus

- [ ] **Step 3: Batch-Generation (60 Bilder)**
  ```bash
  python3 scripts/generate-thumbnails.py
  ```
  ~60-90 Minuten bei 60-90s pro Bild

- [ ] **Step 4: Optimieren zu WebP**
  Alle PNGs → WebP, max 50KB, 200x150px

- [ ] **Step 5: SVG Placeholder loeschen + articles.ts updaten**

- [ ] **Step 6: Build + Test + Push**

---

## Regeln (aus Post-Mortem)

1. **LESE Joe's Workflow bevor du ihn deployest** — pruefe ALLE Model-Dependencies
2. **Bypasse was nicht funktioniert** statt stundenlang nach einem nicht-existierenden Modell zu suchen
3. **Baue Workflows in der UI** — nie JSON von Hand schreiben (Gotcha 15)
4. **Verifiziere nach jedem Schritt** — kein "sollte funktionieren"
5. **MSYS_NO_PATHCONV=1** bei jedem Docker-Befehl (Gotcha 14)
