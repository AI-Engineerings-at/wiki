#!/bin/bash
# Wiki Progress Logger — Läuft alle 10 Minuten
# Loggt: Seiten, Commits, Build-Status, Deploy, offene Punkte

WIKI_DIR="C:/Users/Legion/Documents/wiki"
LOG_FILE="C:/Users/Legion/Documents/wiki/logs/progress.log"
PLAN_FILE="C:/Users/Legion/Documents/Playbook01/docs/superpowers/plans/2026-03-22-wiki-finish-plan.md"

mkdir -p "$(dirname "$LOG_FILE")"

while true; do
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

  # Metriken sammeln
  PAGES=$(find "$WIKI_DIR/app" -name "page.tsx" 2>/dev/null | wc -l)
  DE_PAGES=$(find "$WIKI_DIR/app" -name "page.tsx" -not -path "*/en/*" 2>/dev/null | wc -l)
  EN_PAGES=$(find "$WIKI_DIR/app/en" -name "page.tsx" 2>/dev/null | wc -l)
  BLOG_POSTS=$(find "$WIKI_DIR/content/blog" -name "*.md" 2>/dev/null | wc -l)
  IMAGES=$(find "$WIKI_DIR/public/images" -name "*.png" -o -name "*.jpg" -o -name "*.svg" 2>/dev/null | wc -l)
  PLANTUML=$(grep -rl "PlantUMLDiagram\|PlantUMLDynamic" "$WIKI_DIR/app" --include="*.tsx" 2>/dev/null | wc -l)
  UNCOMMITTED=$(cd "$WIKI_DIR" && git status --short 2>/dev/null | wc -l)
  LAST_COMMIT=$(cd "$WIKI_DIR" && git log --oneline -1 2>/dev/null)
  LAST_DEPLOY=$(cd "$WIKI_DIR" && git log --oneline --all --grep="deploy\|Deploy" -1 2>/dev/null || echo "n/a")

  # Build-Check (schnell, nur Syntax)
  BUILD_OK="?"
  if cd "$WIKI_DIR" && npx next lint --quiet 2>/dev/null; then
    BUILD_OK="PASS"
  else
    BUILD_OK="WARN"
  fi

  # Plan-Fortschritt
  if [ -f "$PLAN_FILE" ]; then
    TOTAL_TASKS=$(grep -c "^\- \[" "$PLAN_FILE" 2>/dev/null || echo 0)
    DONE_TASKS=$(grep -c "^\- \[x\]" "$PLAN_FILE" 2>/dev/null || echo 0)
  else
    TOTAL_TASKS=0
    DONE_TASKS=0
  fi

  # Live-Check
  LIVE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://wiki.ai-engineering.at" 2>/dev/null || echo "OFFLINE")

  # ASCII-Umlaut Check
  UMLAUT_COUNT=$(grep -rn "ueber\|fuer \|Fuer \|Oesterreich\|Qualitaet\|einfuehren\|moeglich\|guenstig" "$WIKI_DIR/app" "$WIKI_DIR/components" --include="*.tsx" 2>/dev/null | grep -v "href\|src\|import\|Funktionsname" | wc -l)

  # Log schreiben
  cat >> "$LOG_FILE" << EOF
[$TIMESTAMP]
  Seiten: $PAGES (DE: $DE_PAGES, EN: $EN_PAGES)
  Blog: $BLOG_POSTS Posts
  Bilder: $IMAGES
  PlantUML: $PLANTUML Artikel
  Uncommitted: $UNCOMMITTED Dateien
  Umlaute-Fehler: $UMLAUT_COUNT
  Plan: $DONE_TASKS/$TOTAL_TASKS Tasks
  Live: $LIVE_STATUS
  Letzter Commit: $LAST_COMMIT
---
EOF

  echo "[$TIMESTAMP] Wiki: $PAGES Seiten, $UNCOMMITTED uncommitted, Plan $DONE_TASKS/$TOTAL_TASKS, Live: $LIVE_STATUS"

  sleep 600
done
