---
title: "Skill-Erstellung Best Practices — Der offizielle Anthropic Standard"
date: "2026-03-09"
summary: "Wie du professionelle Claude Code Skills erstellst — mit offiziellem Anthropic Standard."
tags: ["skills", "best-practices", "tutorial", "claude-code"]
author: "AI Engineering"
---

# Skill-Erstellung Best Practices — Der offizielle Anthropic Standard

<figure style="margin: 2rem 0;">
  <img src="/images/blog/skill-creation-best-practices.png" alt="Skill-Erstellung Best Practices" style="border-radius: 12px; width: 100%;" />
  <figcaption style="text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-top: 0.5rem;">Best Practices für professionelle Claude Code Skills</figcaption>
</figure>

Claude Code Skills sind Markdown-Dateien. Klingt simpel. Aber zwischen "funktioniert irgendwie" und "funktioniert zuverlässig" liegt eine Menge Detail. Wir haben 49 Skills gebaut und dabei jede Falle mitgenommen, die es gibt.

Hier sind die Best Practices die wir daraus destilliert haben.

## Der offizielle Anthropic Standard

Anthropic definiert ein Skill als `SKILL.md` Datei in einem `.claude/skills/<name>/` Verzeichnis. Das Frontmatter folgt YAML-Syntax:

```yaml
---
name: "skill-name"
description: "Was der Skill tut — in einem Satz"
instructions: "Optional: Anweisungen als Frontmatter-String"
command_injection: "shell-command"
---
```

### Die 4 offiziellen Felder

**`name`** (Pflicht)
Eindeutiger Identifier. Lowercase, kebab-case. Keine Leerzeichen, keine Sonderzeichen.

```yaml
# Richtig
name: "deploy-voice-gateway"

# Falsch
name: "Deploy Voice Gateway"
name: "deploy_voice_gateway"
```

**`description`** (Pflicht)
Ein Satz, der erklärt was der Skill tut. Claude nutzt die Description um zu entscheiden, ob der Skill zum aktuellen Task passt. Trigger-Keywords gehören hier rein.

```yaml
description: "Deploy Voice Gateway or Dashboard to Docker Swarm — Trigger: deploy, VG, dashboard"
```

**`instructions`** (Optional)
Alternative zum Body-Text. Wenn du die Anweisungen lieber im Frontmatter als im Body haben willst. In der Praxis verwenden wir fast immer den Body — er ist lesbarer.

**`command_injection`** (Optional)
Ein Shell-Command dessen Output automatisch als Kontext injiziert wird, bevor Claude den Skill ausführt.

```yaml
command_injection: "git log --oneline -5 && docker service ls --format '{{.Name}} {{.Replicas}}'"
```

## String Substitutions

Claude Code ersetzt drei Variablen zur Laufzeit:

| Variable | Ersetzt durch | Beispiel |
|----------|--------------|---------|
| `$ARGUMENTS` | User-Input nach dem Trigger | "deploy voice-gateway" → "voice-gateway" |
| `${CLAUDE_SKILL_DIR}` | Absoluter Pfad zum Skill-Ordner | `/home/user/repo/.claude/skills/deploy/` |
| `${workspaceFolder}` | Absoluter Pfad zum Workspace | `/home/user/repo/` |

**Praxis-Beispiel:**

```markdown
Fuehre das Pre-Check Script aus:
${CLAUDE_SKILL_DIR}/pre-check.sh $ARGUMENTS

Speichere den Report in:
${workspaceFolder}/reports/deploy-$(date +%Y%m%d).md
```

## Dynamic Context — Command Injection richtig nutzen

Command Injection ist das mächtigste Feature. Claude sieht den Output bevor der Skill startet und kann Entscheidungen treffen.

### Gute Verwendungen

```yaml
# Aktuellen Git-Status zeigen
command_injection: "git status --short && git log --oneline -3"

# Laufende Services zeigen
command_injection: "docker service ls --format '{{.Name}} {{.Replicas}} {{.Image}}'"

# Aktuelle Vault-Keys auflisten (ohne Werte!)
command_injection: "python vault.py list"
```

### Schlechte Verwendungen

```yaml
# Zu langsam — blockiert den Skill-Start
command_injection: "find / -name '*.log' -mtime -1"

# Sicherheitsrisiko — zeigt Secrets
command_injection: "cat .env"

# Sinnlos — aendert sich nie
command_injection: "echo 'Hello World'"
```

**Faustregel:** Der Command muss in unter 2 Sekunden fertig sein und darf keine Secrets ausgeben.

## Best Practices aus 49 Skills

### 1. Ein Skill, ein Job

Der häufigste Fehler: Ein Skill der zu viel kann.

```yaml
# Schlecht
name: "infrastructure-manager"
description: "Manages everything: deploy, monitor, backup, recover, scale"

# Gut
name: "deploy"
description: "Deploy a specific service to Docker Swarm"
```

Wenn du "and" in der Description brauchst, sind es wahrscheinlich zwei Skills.

### 2. Fehler-Handling im Body

Nicht: "Bei Fehler frag den User." Sondern: Konkrete Maßnahmen.

```markdown
## Fehler-Handling

- **SSH Timeout**: 3x Retry mit 10s Pause. Nach 3. Versuch: Abbruch + Log.
- **Build Failure**: Logs anzeigen. NICHT automatisch neu bauen.
- **Service Update haengt**: `docker service ps <name>` pruefen.
  Wenn "Rejected": Image pruefen, Ports pruefen, Constraints pruefen.
- **Health Check fehlschlaegt**: 30s warten, erneut pruefen.
  Wenn 2x fehlschlaegt: Rollback mit `docker service rollback`.
```

### 3. Trigger-Keywords in die Description

Claude findet deinen Skill über die Description. Wenn die Keywords fehlen, wird der Skill nie aktiviert.

```yaml
# Wird gefunden bei: "deploy", "VG", "dashboard", "swarm"
description: "Deploy Voice Gateway or Dashboard to Docker Swarm"

# Wird NIE gefunden bei: "deploy my app"
description: "Service management tool"
```

### 4. Scripts neben die SKILL.md

Komplexe Logik gehört nicht in den Prompt-Body. Lege Scripts ins Skill-Verzeichnis:

```
.claude/skills/deploy/
  SKILL.md           → Anweisungen
  pre-check.sh       → Vorbedingungen pruefen
  verify-health.py   → Health Check nach Deploy
  rollback.sh        → Rollback-Procedure
```

Referenziere sie mit `${CLAUDE_SKILL_DIR}/pre-check.sh`.

### 5. Versionierung

Jeder Skill braucht eine Version. Bump bei jeder Änderung:

```yaml
version: "1.0.0"  # Initial
version: "1.1.0"  # Neue Funktion
version: "1.1.1"  # Bugfix
version: "2.0.0"  # Breaking Change
```

### 6. Keine Credentials

Nie. Auch nicht "nur zum Testen". Auch nicht auskommentiert.

```markdown
## Credentials

Alle Tokens via Vault laden:
- SSH Key: `vault.py get shared ssh KEY`
- MM Token: `vault.py get <agent> mattermost MM_TOKEN`
- API Key: `vault.py get shared erpnext API_KEY`
```

## Häufige Fehler

/ *Common Pitfalls — EN*
/ *1. Overloaded skills. 2. Missing triggers. 3. Hardcoded paths. 4. No error handling. 5. Stale command_injection.*

### 1. Skill wird nicht gefunden

**Ursache:** Description enthält nicht die richtigen Keywords.
**Fix:** Trigger-Keywords explizit auflisten.

### 2. Command Injection ist langsam

**Ursache:** Der injizierte Command braucht >5 Sekunden.
**Fix:** Command vereinfachen. `--tail 10` statt alles lesen. `--format` statt Post-Processing.

### 3. Skill funktioniert nur auf einem Rechner

**Ursache:** Hardcoded Pfade (`C:\Users\...` oder `/home/user/...`).
**Fix:** `${workspaceFolder}` und `${CLAUDE_SKILL_DIR}` verwenden.

### 4. Skill macht mehr als erwartet

**Ursache:** Body ist zu vage ("Analysiere und fixe das Problem").
**Fix:** Klare Grenzen setzen ("Analysiere das Problem. Zeige die Analyse. Frage vor dem Fix.").

### 5. Veraltete Error-Refs

**Ursache:** Error Registry wurde aktualisiert, Skill-Referenzen nicht.
**Fix:** Bei jedem Version-Bump: `error-refs` und `learning-refs` prüfen.

## Skill Quality Gate

Vor dem Einsatz muss jeder Skill bestehen:

- [ ] `name` eindeutig, kebab-case
- [ ] `description` mit Trigger-Keywords
- [ ] Body hat klare Schritt-für-Schritt Anweisungen
- [ ] Fehler-Handling dokumentiert
- [ ] Keine Credentials im Klartext
- [ ] `version` gesetzt
- [ ] Mindestens 1x manuell getestet
- [ ] Im Skill-Katalog eingetragen
- [ ] Command Injection (falls vorhanden) < 2s

## Zum Mitnehmen

Das [Claude Code AI OS Template](https://www.ai-engineering.at/products) für EUR 249 enthält unsere komplette Skill-Library mit 49 Skills, Agent-Definitionen und die Quality Gate Pipeline.
