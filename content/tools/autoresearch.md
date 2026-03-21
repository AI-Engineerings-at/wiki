---
title: "autoresearch — Autonome AI-Forschung"
description: "Karpathy's autonomer ML-Forschungs-Agent: Modifiziert, trainiert, bewertet und verwirft Experimente in einem Loop ohne menschlichen Eingriff."
date: "2026-03-12"
category: "tools"
tags: ["machine-learning", "automl", "forschung", "nanoGPT", "self-hosted"]
author: "AI Engineering"
---

# autoresearch

**autoresearch** ist ein autonomer Machine-Learning-Forschungsagent von Andrej Karpathy. Er modifiziert Modell-Architekturen, trainiert für ca. 5 Minuten, bewertet das Ergebnis und entscheidet automatisch, ob der Ansatz behalten oder verworfen wird — ohne menschliche Zwischenschritte.

[Quelle: GitHub karpathy/autoresearch](https://github.com/karpathy/autoresearch)

---

## Was ist autoresearch?

autoresearch ist ein experimentelles Framework, das den klassischen ML-Forschungszyklus automatisiert:

> "The program modifies and runs machine learning experiments, evaluating and discarding approaches automatically in a loop."

Das Ziel: Der Agent soll eigenständig Hypothesen testen — ähnlich wie ein menschlicher Forscher, nur schneller und ohne Pause.

[Quelle: karpathy/autoresearch README, abgerufen 2026-03-12](https://github.com/karpathy/autoresearch/blob/master/README.md)

---

## Wie funktioniert es?

Der Kern ist ein einfacher Forschungsloop:

```
1. MODIFY   — Agent ändert Modell-Architektur oder Hyperparameter
2. TRAIN    — Trainingsrun für ~5 Minuten (kurze Evaluation)
3. EVALUATE — Validierungs-Loss (val_bpb) messen
4. DECIDE   — Besser als vorher? → behalten. Schlechter? → zurücksetzen.
5. REPEAT   — Loop von vorne
```

**val_bpb** (Validation Bits Per Byte) ist die primäre Metrik: niedrigere Werte bedeuten bessere Kompression und damit bessere Sprachmodellierung.

[Quelle: karpathy/autoresearch, Architektur-Dokumentation](https://github.com/karpathy/autoresearch)

### Was modifiziert der Agent?

Der Agent hat Zugriff auf eine definierte Menge an "Forschungsaktionen":

- Attention-Mechanismus ändern (z.B. Window-Attention statt Full-Attention)
- Tiefe des Modells (DEPTH) anpassen
- Aktivierungsfunktionen tauschen
- Positional Encoding variieren
- Norm-Lagen umstrukturieren

Die erlaubten Aktionen werden über Konfigurationsparameter gesteuert.

---

## Voraussetzungen

| Komponente | Mindest-Anforderung | Empfehlen |
|------------|--------------------|-----------|
| GPU VRAM | 8 GB | 16–24 GB (RTX 3090) |
| CUDA | 12.8 | 12.8 |
| Python | 3.11+ | 3.12 |
| Paketmanager | uv | uv |
| Festplatte | 20 GB frei | 50 GB |
| RAM | 16 GB | 32 GB |

CUDA 12.8 ist erforderlich, da autoresearch PyTorch-Nightly-Features nutzt, die noch nicht in stabilen Releases enthalten sind.

[Quelle: karpathy/autoresearch, Requirements-Abschnitt](https://github.com/karpathy/autoresearch)

---

## Installation

autoresearch nutzt **uv** als schnellen Python-Paketmanager. Falls noch nicht installiert:

```bash
# uv installieren (Linux/macOS)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

[Quelle: Astral uv Dokumentation](https://docs.astral.sh/uv/getting-started/installation/)

### Schritt-für-Schritt

```bash
# 1. Repository klonen
git clone https://github.com/karpathy/autoresearch.git
cd autoresearch

# 2. Virtuelle Umgebung mit uv erstellen
uv venv --python 3.12
source .venv/bin/activate  # Linux/macOS
# oder: .venv\Scripts\activate  # Windows

# 3. Abhängigkeiten installieren
uv pip install -r requirements.txt

# 4. PyTorch Nightly (CUDA 12.8) installieren
uv pip install --pre torch --index-url https://download.pytorch.org/whl/nightly/cu128

# 5. Datensatz herunterladen (Shakespeare-Datensatz als Standard)
python data/shakespeare_char/prepare.py

# 6. Erster Lauf starten
python train.py config/train_shakespeare_char.py
```

[Quelle: karpathy/autoresearch, Installation Guide](https://github.com/karpathy/autoresearch)

---

## Auf RTX 3090 und kleineren GPUs

Die Standard-Konfiguration ist auf high-end Hardware ausgelegt. Für eine RTX 3090 (24 GB VRAM) oder kleinere GPUs empfehlen sich reduzierte Settings:

### Empfohlene Konfiguration (RTX 3090, 24 GB)

```python
# config/autoresearch_3090.py
# Reduzierte Tiefe für schnellere Experimente
DEPTH = 4              # Standard: 6-8
WINDOW_PATTERN = "L"   # L = Local Attention (VRAM-schonend)
                       # G = Global Attention (mehr VRAM)
batch_size = 16        # Standard: 32-64
block_size = 256       # Kontextfenster
n_head = 4             # Attention Heads
dropout = 0.1

# Training-Dauer pro Experiment (Minuten)
experiment_minutes = 5
```

### Für kleinere GPUs (8–12 GB VRAM)

```python
DEPTH = 2
WINDOW_PATTERN = "L"
batch_size = 8
block_size = 128
gradient_checkpointing = True  # VRAM sparen gegen Speed-Einbusse
```

**Wichtig**: `WINDOW_PATTERN = "L"` (Local Attention) reduziert den VRAM-Bedarf erheblich, da nicht alle Token mit allen anderen verglichen werden. Das Modell ist weniger ausdrucksstark, aber die Experimente laufen durch.

[Quelle: karpathy/autoresearch, GPU Configuration Notes](https://github.com/karpathy/autoresearch)

### VRAM-Schätzung

| Konfiguration | VRAM-Bedarf |
|---------------|-------------|
| DEPTH=2, Local Attention | ~4–6 GB |
| DEPTH=4, Local Attention | ~8–10 GB |
| DEPTH=6, Mixed Attention | ~16–20 GB |
| Standard-Config | ~22–24 GB |

---

## Praktisches Beispiel: Autonomer Forschungslauf

```bash
# Starte einen autonomen Lauf mit 20 Experimenten
python autoresearch.py \
  --config config/autoresearch_3090.py \
  --num_experiments 20 \
  --log_dir ./experiments/run_001

# Fortschritt überwachen
tail -f experiments/run_001/log.txt

# Ergebnisse zusammenfassen
python summarize.py experiments/run_001/
```

Der Agent loggt für jedes Experiment:
- Welche Änderung wurde ausprobiert
- Erreichter val_bpb nach 5 Minuten Training
- Entscheidung: behalten / verworfen
- Aktuelle Best-Konfiguration

---

## Alternativen

| Tool | Fokus | Ansatz | Link |
|------|-------|--------|------|
| **nanoGPT** | Einfaches GPT-Training | Manuell, pädagogisch | [github.com/karpathy/nanoGPT](https://github.com/karpathy/nanoGPT) |
| **AutoML (Google Cloud)** | Hyperparameter-Suche | Cloud-basiert, kostenpflichtig | [cloud.google.com/automl](https://cloud.google.com/automl) |
| **Optuna** | Hyperparameter-Optimierung | Python, lokal, bayesianisch | [optuna.readthedocs.io](https://optuna.readthedocs.io/) |
| **Ray Tune** | Distributed Hyperparameter-Suche | Skalierbar, multi-GPU | [docs.ray.io/en/latest/tune](https://docs.ray.io/en/latest/tune/index.html) |
| **NAS-Bench** | Neural Architecture Search Benchmark | Forschung, Vergleiche | [github.com/google-research/nasbench](https://github.com/google-research/nasbench) |
| **Keras Tuner** | Keras-spezifische Hyperparameter-Suche | Einfach, Keras-integriert | [keras.io/keras_tuner](https://keras.io/keras_tuner/) |

### autoresearch vs. Optuna

- **Optuna** optimiert Hyperparameter eines fixen Modells
- **autoresearch** verändert auch die Architektur selbst (Attention-Typ, Tiefe, Verbindungen)
- autoresearch ist explorativer — Optuna konvergenter

### autoresearch vs. nanoGPT

nanoGPT ist das Fundament: autoresearch baut darauf auf und automatisiert den Forschungsprozess, den nanoGPT manuell demonstriert.

[Quelle: karpathy, Twitter/X-Thread zu autoresearch, 2025](https://x.com/karpathy)

---

## Einschränkungen

- **Kein Produktions-Tool**: autoresearch ist ein Forschungsprototyp, kein stabiles Framework
- **CUDA 12.8 Pflicht**: Kein CPU-Modus, kein älteres CUDA
- **Kleine Modelle**: Der Loop ist auf kleine GPT-Varianten ausgelegt, nicht auf LLMs mit Milliarden Parametern
- **Keine Parallelisierung**: Experimente laufen sequenziell auf einer GPU

---

## Weiter lesen

- [nanoGPT — Minimales GPT Training](/tools/nanoGPT)
- [Ollama — Lokale LLM-Inferenz](/de/tools/ollama)
- [Self-Hosted AI Stack: Was brauche ich wirklich?](/blog/2026-03-08-dsgvo-konformer-ai-stack)
- [GPU-Auswahl für lokale AI-Workloads](/grundlagen/gpu-auswahl)

---

*Dieser Artikel wurde zuletzt am 12. März 2026 aktualisiert.*
*[Quelle: github.com/karpathy/autoresearch](https://github.com/karpathy/autoresearch), abgerufen 2026-03-12.*
