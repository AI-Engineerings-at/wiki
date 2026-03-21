---
title: "Self-Hosted Ollama: 7 Gotchas die jeder kennen muss"
date: "2026-03-08"
summary: "Ollama lokal betreiben klingt einfach. Ist es auch — bis du auf OOM-Crashes, VRAM-Konflikte und stille Fehler stoesst. Hier sind 7 Probleme und ihre Lösungen."
tags: ["ollama", "self-hosted", "gotchas", "gpu", "vram", "homelab", "local-first", "docker"]
author: "AI Engineering"
---

# Self-Hosted Ollama: 7 Gotchas die jeder kennen muss

<figure style="margin: 2rem 0;">
  <img src="/images/blog/ollama-self-hosted-gotchas.png" alt="Ollama Self-Hosted Gotchas" style="border-radius: 12px; width: 100%;" />
  <figcaption style="text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-top: 0.5rem;">7 Gotchas beim Self-Hosting von Ollama — OOM, VRAM und stille Fehler</figcaption>
</figure>

Ollama auf dem eigenen Server betreiben ist der erste Schritt zu einem unabhängigen AI-Stack. Aber zwischen "ollama pull mistral" und "Production-ready" liegen einige Fallen. Hier sind die 7 wichtigsten — aus unserer täglichen Erfahrung mit 3 Ollama-Instanzen auf unterschiedlicher Hardware.

## 1. OOM-Kills sind leise und tödlich

**Problem:** Dein 24GB-Modell braucht ~28GB RAM. Windows Desktop-Apps belegen schon 25GB. Der OOM-Killer schlaegt zu — ohne Warnung, ohne Log-Eintrag.

**Symptom:** `signal: killed` oder `llama runner process has terminated` in der API-Response. HTTP 500, aber kein hilfreicher Error.

**Lösung:**
- Ollama Logs prüfen: `journalctl -u ollama -f` (Linux) oder Event Viewer (Windows)
- VRAM-Monitoring einrichten (nvidia-smi, Prometheus nvidia_gpu_exporter)
- Modell-Größe an verfügbaren VRAM anpassen, nicht an GPU-Spec

## 2. VRAM-Konflikte mit anderen GPU-Services

**Problem:** Du betreibst Ollama UND ComfyUI auf derselben GPU. ComfyUI belegt VRAM für Bildgenerierung, Ollama will gleichzeitig ein LLM laden. Ergebnis: Einer von beiden crasht.

**Lösung:**
- Nicht gleichzeitig laufen lassen, ODER
- `keep_alive` in Ollama konfigurieren: kurze Zeiten für GPUs mit Shared-VRAM (z.B. 5 Minuten)
- OOM als transienten Fehler behandeln (kein langer Cooldown!)

## 3. Ein Fallback-Endpoint reicht nicht

**Problem:** GPU ist offline, überlastet, oder OOM. Dein einziger Ollama-Endpoint antwortet nicht. Alles steht.

**Lösung: 3-Level Fallback**
```
Primary:   GPU-Server (RTX 3090) → mistral-small3.2:24b
Secondary: Worker-Node (RTX 2060) → llama3.1:8b
Tertiary:  CPU-Node              → llama3.1:8b
```

Der Code probiert jeden Endpoint der Reihe nach. Timeout pro Versuch: 30 Sekunden. Wenn alle offline: statischer Fallback-Text statt Error.

**Wichtig:** Das gehört in EINEN Code-Block (try/catch Loop), nicht in 3 separate HTTP-Nodes mit IF-Bedingungen dazwischen.

## 4. API Keys und Tokens veralten still

**Problem:** Du hast den Ollama-Endpoint in deinem Workflow hardcoded. Drei Wochen später aenderst du was — der alte Key funktioniert noch (HTTP 200), aber Änderungen werden nicht persistent.

**Lösung:**
- API Keys IMMER frisch aus einem Credential-Store holen
- Nach jedem schreibenden API-Call sofort GET zur Verifikation
- Nie Keys aus Chat-History oder alten Sessions wiederverwenden

## 5. Modelle reagieren unterschiedlich auf Tool Calling

**Problem:** Du baust einen Agent mit Tool Calling. Funktioniert mit Mistral, aber nicht mit Gemma. Warum?

**Antwort:** Nicht jedes Modell unterstützt `.Tools` im Template. Manche Modelle ignorieren Tool-Definitionen komplett.

**Was hilft:**
- Modelcard auf ollama.com prüfen: "Tools" Support?
- Template anschauen: Ist `{{ .Tools }}` enthalten?
- Im Zweifel: Mistral-Modelle für Tool Calling, andere für Text

## 6. Embedding-Dimensionen müssen matchen

**Problem:** Du wechselst das Embedding-Modell von `nomic-embed-text` (768-dim) auf `mxbai-embed-large` (1024-dim). Deine ChromaDB hat noch die alten 768-dim Vektoren. Ergebnis: Dimension Mismatch Error.

**Lösung:**
- VOR dem Modell-Wechsel: Collection droppen oder neu erstellen
- Embedding-Modell als Config-Parameter, nicht hardcoded
- Immer `num_gpu=0` für Embeddings (CPU reicht, spart VRAM)

## 7. Docker vs. Native: Performance-Unterschied ist real

**Problem:** Ollama im Docker-Container auf dem GPU-Host läuft 20-30% langsamer als nativ.

**Warum:** Docker GPU-Passthrough (nvidia-container-toolkit) hat Overhead. Speziell bei VRAM-Management und Modell-Loading.

**Empfehlung:**
- GPU-Hosts: Ollama NATIV installieren (systemd Service)
- CPU-Fallback: Docker ist OK (kein GPU-Overhead)
- Monitoring: Response-Zeiten messen, nicht nur "funktioniert"

## Bonus: Was Claude Code User beachten müssen

Wenn du mit Claude Code Ollama-Integrationen baust:

- **Endpoint verifizieren** — `curl http://HOST:11434/api/tags` als Smoke-Test
- **Model-Name exakt** — `mistral-small3.2:24b` nicht `mistral-small` (anderes Modell!)
- **Timeout setzen** — 30s für Generation, 10s für Embedding, nie unlimited
- **Stream vs. Non-Stream** — für Pipelines immer `"stream": false`
- **Health-Check vor Workflow** — ist die GPU überhaupt frei?

## Checkliste für Production

- [ ] Mindestens 2 Ollama-Endpoints (GPU + CPU Fallback)
- [ ] VRAM-Monitoring eingerichtet
- [ ] OOM-Detection in Logs/Alerts
- [ ] keep_alive pro Endpoint konfiguriert
- [ ] API Keys in Credential-Store (nicht hardcoded)
- [ ] Embedding-Dimensionen dokumentiert
- [ ] Response-Zeit Baseline gemessen

---

*Wir betreiben 3 Ollama-Instanzen auf unterschiedlicher Hardware (RTX 3090, RTX 2060, CPU) im 24/7 Betrieb. Diese Gotchas haben wir alle selbst erlebt.*
