#!/bin/bash
# Generate all 38 wiki thumbnails via Social Poster
# Run: bash wiki/scripts/generate-all-thumbnails.sh

SP="http://10.40.10.99:8099/generate-image"
FREE="http://10.40.10.90:8188/free"
OUT="/c/Users/Legion/Documents/wiki/public/images/thumbnails/generated"
mkdir -p "$OUT"

generate() {
  local slug="$1"
  local text="$2"
  local prompt="$3"

  echo "  $slug: $text..."
  curl -s -X POST $FREE -d '{"unload_models":true,"free_memory":true}' > /dev/null
  sleep 2

  local result=$(curl -s -X POST $SP -H "Content-Type: application/json" \
    -d "{\"prompt\":\"$prompt, dark navy background with subtle flowing data particles and soft bokeh lights, no text no words no letters no watermarks\",\"quality\":\"hq\",\"platform\":\"social\",\"text_overlay\":\"$text\"}" \
    --max-time 700 2>/dev/null)

  local model=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin).get('model_used','?'))" 2>/dev/null)
  local path=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin).get('image_path',''))" 2>/dev/null)

  if [ -n "$path" ] && [ "$path" != "" ] && [ "$path" != "None" ]; then
    scp joe@10.40.10.99:"$path" "$OUT/${slug}.png" 2>/dev/null
    echo "  -> $model -> $OUT/${slug}.png"
  else
    echo "  -> $model (no file)"
  fi
}

# Entlade Ollama
curl -s -X POST http://10.40.10.90:11434/api/generate -d '{"model":"mistral-small3.2:24b-128k","keep_alive":0}' > /dev/null 2>&1
sleep 5

echo "=== BATCH 2: Grundlagen 6-10 ==="
generate "ai-agent-team" "AI Agent Team" "glowing chess pieces on circuit board, each piece different color, strategic formation, neon cyan"
generate "selfhosted-vs-cloud" "Self-Hosted vs Cloud" "fortress of light on left with lock, floating castle in clouds on right, bridge of data between"
generate "30-tage-quickstart" "30-Day Quickstart" "glowing calendar pages flying upward in spiral, rocket launching from day 30, neon cyan trail"
generate "ai-im-unternehmen" "AI in Business" "corporate building silhouette with glowing AI brain on top, light spreading through windows, neon blue"
generate "was-ist-ein-llm" "Was ist ein LLM?" "massive book transforming into stream of glowing tokens, pages dissolving into data particles, neon cyan"

echo "=== BATCH 3: Compliance 11-15 ==="
generate "dsgvo-grundlagen" "DSGVO Grundlagen" "european union shield with 12 golden stars, data streams flowing around it, padlock in center, blue and gold glow"
generate "eu-ai-act" "EU AI Act" "EU parliament building silhouette with glowing AI circuit patterns, scales of justice in foreground, blue and gold"
generate "ki-kompetenz-art4" "KI-Kompetenz Art. 4" "graduation cap made of circuit traces sitting on glowing brain, knowledge metaphor, neon blue and gold"
generate "ai-act-checkliste" "AI Act Checklist" "floating holographic checklist with glowing checkmarks, items ticked off by light beam, green and blue glow"
generate "verbotene-ai-praktiken" "Prohibited AI" "red warning triangle with AI eye inside, cracks and ban symbol, forbidden practices metaphor, red and dark blue"

echo "=== BATCH 4: Compliance 16-20 ==="
generate "chatbot-transparenz" "Chatbot Transparency" "speech bubble made of glass showing visible gears and circuits inside, transparency metaphor, neon cyan"
generate "dpia" "DPIA Guide" "magnifying glass examining data flow, risk heatmap visible through lens, assessment metaphor, amber and blue"
generate "datenschutz-praxis" "Data Protection" "vault door half-open with golden light streaming out, data symbols inside, gold and blue"
generate "legal-framework" "Legal Framework" "legal gavel made of light striking on circuit board, sparks of compliance, gold and cyan"
generate "readiness-check" "Readiness Check" "speedometer gauge glowing from red to green, needle pointing to assessment zone, gradient red amber green"

echo "=== BATCH 5: Patterns 21-25 ==="
generate "orchestration-patterns" "Orchestration Patterns" "blueprint of interconnected gear wheels, each gear with glowing icon, design pattern, neon cyan lines"
generate "memory-pattern" "Memory Pattern" "brain with layers peeling back revealing storage disks, memory hierarchy, warm amber core cool blue outer"
generate "task-delegation" "Task Delegation" "hand dropping glowing task cards falling to waiting agent figures below, delegation waterfall, neon cyan"
generate "safety-hooks" "Safety Hooks" "fishing hooks of light catching falling error symbols before crash, safety net metaphor, red errors green hooks"
generate "monitoring-pattern" "Monitoring Pattern" "ECG heartbeat line pulsing across screen, each peak a service health check, vital signs, green pulse"

echo "=== BATCH 6: Konzepte 26-30 ==="
generate "digital-employee" "Digital Employee" "holographic office worker at desk, half human half digital, working alongside colleagues, warm and cyan"
generate "self-improving" "Self-Improving AI" "ouroboros snake made of circuit traces, evolution spiral, self-improvement loop, neon cyan"
generate "scaling-agents" "Scaling Agents" "single glowing figure multiplying into army of agents across grid, scaling metaphor, neon blue"
generate "evals-guardrails" "Evals and Guardrails" "highway with glowing guardrails, AI car driving between them, safe path metaphor, neon green rails"
generate "human-in-the-loop" "Human in the Loop" "human hand and robot hand jointly holding steering wheel, shared control, warm amber and cool cyan"

echo "=== BATCH 7: Papers 31-36 ==="
generate "attention-2017" "Attention (2017)" "spotlight beams converging on single point from multiple directions, attention mechanism, golden light beams"
generate "rag-2020" "RAG Paper (2020)" "open book with search beam reaching into library, pulling relevant pages back, retrieval metaphor, cyan beam"
generate "lora-2021" "LoRA Paper (2021)" "large neural network with small glowing adapter modules plugged in, lightweight modification, orange on blue"
generate "react-2022" "ReAct Paper (2022)" "thinking brain connected to acting hand, thought-action loop, reasoning meets execution, purple and cyan"
generate "constitutional-ai" "Constitutional AI (2022)" "AI brain in golden cage of rules but cage is open and AI stays inside, ethical choice, gold and blue"
generate "hrm-2025" "HRM Paper (2025)" "pyramid of reasoning layers each more abstract, hierarchical thinking, gradient blue to gold upward"

echo "=== BATCH 8: Security 37-41 ==="
generate "selfhosted-security" "Self-Hosted Security" "home server inside transparent shield bubble, attacks bouncing off, green shield neon"
generate "encryption" "Encryption" "data stream transforming from readable to encrypted through glowing cipher lock, green to scrambled"
generate "api-key-security" "API Key Security" "golden key inside vault with biometric lock, multiple security layers, gold key blue vault"
generate "firewall-setup" "Firewall Setup" "wall of fire made of code, packets filtered through some pass some burn, orange fire blue packets"
generate "backup-strategy" "Backup Strategy" "three data cubes stacked in pyramid 3-2-1 backup, arrows to cloud and external drive, cyan cubes"

echo "=== BATCH 9: Sonstige 42-43 ==="
generate "ai-in-austria" "AI in Austria" "austrian eagle silhouette with AI circuit patterns, alpine mountains background, red-white-red accent, cyan"
generate "downloads" "Downloads" "glowing download arrow landing in open folder, files materializing inside, resource library, neon cyan arrow"

echo ""
echo "=== ALLE 38 THUMBNAILS FERTIG ==="
ls "$OUT"/*.png 2>/dev/null | wc -l
echo "PNG Dateien in $OUT"
