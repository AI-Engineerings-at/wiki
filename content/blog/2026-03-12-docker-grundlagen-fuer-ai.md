---
title: "Docker für AI: Warum Container deinen Stack production-ready machen"
date: "2026-03-12"
description: "Ohne Docker läuft dein AI-Stack nur auf deinem Rechner. Mit Docker läuft er überall. Der Einstieg für AI-Entwickler."
tags: ["Docker", "Container", "Production", "Setup", "Anfänger"]
author: "AI Engineering"
series: "Lokaler AI-Stack: Von 0 bis Production"
seriesStep: 5
---

# Docker für AI: Warum Container deinen Stack production-ready machen

Ohne Docker funktioniert dein AI-Stack auf einem anderen Rechner nicht. Mit Docker: `docker compose up`.

Das ist keine Übertreibung. Wenn du Ollama, Open WebUI und zugehörige Services ohne Container betreibst, hängen sie an den spezifischen Treibern, Pfaden und Abhängigkeiten deiner lokalen Installation. Auf einem anderen Rechner, auf einem Server, nach einem Betriebssystem-Update — gebrochen. Docker löst das strukturell.

## Was ist Docker?

Docker packt eine Anwendung zusammen mit allem, was sie braucht: Laufzeitumgebung, Abhängigkeiten, Konfiguration. Das ergibt ein Container-Image, das überall gleich läuft — auf deinem Laptop, auf einem Server, auf einer VM. Das zugrundeliegende Betriebssystem spielt keine Rolle mehr.

Container sind keine virtuellen Maschinen. Sie teilen sich den Kernel des Host-Systems, starten in Sekunden und brauchen deutlich weniger RAM als eine VM. Ein Prozess, eine Aufgabe, ein Container — das ist das Prinzip.

Docker hat über 20 Millionen aktive Nutzer weltweit ([Quelle](https://www.docker.com/press-release/docker-survey-2023/)). Die offizielle Dokumentation findet sich unter [docs.docker.com](https://docs.docker.com).

## Die 5 Befehle die du brauchst

```bash
# Welche Container laufen gerade?
docker ps

# Einen Container starten (Beispiel: Ollama)
docker run -d --name ollama -p 11434:11434 ollama/ollama

# Stack aus docker-compose.yml starten
docker compose up -d

# Logs eines Containers anzeigen
docker logs ollama

# Container stoppen
docker stop ollama
```

Das deckt 90 % der täglich verwendeten Docker-Befehle ab. Der Rest kommt mit der Zeit.

## docker-compose.yml: Dein Stack als Code

Anstatt jeden Container einzeln per `docker run` zu starten, definierst du deinen gesamten Stack in einer `docker-compose.yml`. Das ist die Datei, die du ins Git committst, mit dem Team teilst und auf dem Server deployst.

Minimales Beispiel für Ollama und Open WebUI:

```yaml
services:
  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama:/root/.ollama
    restart: unless-stopped

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - open-webui:/app/backend/data
    restart: unless-stopped
    depends_on:
      - ollama

volumes:
  ollama:
  open-webui:
```

`docker compose up -d` startet beide Services. `docker compose down` stoppt sie. Die Daten bleiben in den Volumes erhalten.

Die Compose-Spezifikation ist dokumentiert unter [compose-spec.io](https://compose-spec.io) ([GitHub](https://github.com/docker/compose)).

## Warum Docker für AI besonders wichtig ist

AI-Services bringen komplizierte Abhängigkeiten mit: CUDA-Treiber für GPU-Beschleunigung, Python-Versionen, spezifische Bibliotheks-Versionen die inkompatibel sein können. Ohne Container bedeutet "bei mir läuft es" gar nichts.

Konkrete Vorteile:

**GPU-Treiber:** NVIDIA stellt ein offizielles Docker-Image mit CUDA-Support bereit. `docker run --gpus all ollama/ollama` — fertig. Du installierst keine CUDA-Bibliotheken händig.

**Reproduzierbarkeit:** Jedes Teammitglied, jeder Server, jede Deployment-Umgebung läuft exakt dieselbe Version mit exakt denselben Abhängigkeiten.

**Isolation:** Verschiedene AI-Projekte mit inkompatiblen Python-Versionen? Kein Problem. Jeder Container hat seine eigene Umgebung.

**Updates:** Neue Version von Open WebUI? `docker pull ghcr.io/open-webui/open-webui:main && docker compose up -d`. Rollback: altes Image-Tag wieder setzen.

Auf unserem Stack laufen aktuell 31 Docker Services auf 5 Nodes — Ollama, Whisper STT, Mattermost, n8n, ERPNext, Grafana und mehr. Ohne Docker wäre das nicht administrierbar.

## Der nächste Schritt

Docker gibt dir Reproduzierbarkeit und Portabilität. Was fehlt noch für echte Production? Orchestrierung über mehrere Maschinen, Health Checks, automatische Restarts, Monitoring.

Das ist der Bereich, in dem Docker Swarm oder Kubernetes ins Spiel kommen. Wie 11 AI-Agents auf diesem Fundament zusammenarbeiten — und was eine solche Architektur in der Praxis bedeutet — beschreiben wir ausführlich in: [Agent Team Architecture: Wie wir 11 AI-Agents orchestrieren →](/blog/2026-03-09-agent-team-architecture)

Alle Details zum Aufbau des kompletten Stacks — von Ollama bis Docker Swarm, von Monitoring bis DSGVO-Konformität — gibt es in 70 Seiten kompakt: [Der Lokale AI-Stack Playbook für EUR 49](https://buy.stripe.com/8x28wP7VBbapbdQgs4fQI00)

---

**Quellen:**
- [docs.docker.com](https://docs.docker.com) — Offizielle Docker Dokumentation
- [compose-spec.io](https://compose-spec.io) — Compose-Spezifikation
- [github.com/docker/compose](https://github.com/docker/compose) — Docker Compose Source Code
