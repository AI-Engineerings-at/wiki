---
title: "So überwachen wir 31 Docker Services mit Grafana"
date: "2026-03-08"
summary: "Enterprise-Monitoring für 31 Docker Swarm Services auf 6 Nodes — komplett lokal mit Prometheus, Grafana, Alertmanager und Loki. Kein Byte verlässt unser Netzwerk."
tags: ["grafana", "prometheus", "docker-swarm", "monitoring", "local-first", "dsgvo"]
author: "AI Engineering"
---

# So überwachen wir 31 Docker Services mit Grafana

<figure style="margin: 2rem 0;">
  <img src="/images/blog/31-docker-services-monitoring.png" alt="Grafana Dashboard mit 31 Docker Services Monitoring" style="border-radius: 12px; width: 100%;" />
  <figcaption style="text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; margin-top: 0.5rem;">Unser Grafana Dashboard: 31 Docker Services auf einen Blick</figcaption>
</figure>

31 Docker Services, 6 Nodes, ein Monitoring-Stack. Alles lokal, alles DSGVO-konform, kein Byte verlässt unser Netzwerk. Hier zeigen wir, wie unser Setup aussieht und warum wir dafür keine Cloud brauchen.

## Die Infrastruktur: 6 Nodes, 3 Betriebssysteme

Unser Docker Swarm besteht aus 5 Nodes plus einem externen GPU-Rechner:

| Node | Rolle | Hardware |
|------|-------|----------|
| Manager 1 | Monitoring, Ops Dashboard, Voice Gateway | VM auf Proxmox |
| Manager 2 | ERPNext, Open WebUI, open-notebook | VM auf Proxmox |
| Leader | n8n, Team-Chat, Whisper STT, Ollama | VM auf Proxmox |
| Worker 1 | Home Assistant, CasaOS | Mini-PC/NUC |
| Worker 2 | Ollama GPU, CLI Bridges, Download-Issuer | Fedora, RTX 2060 |
| GPU-Server (Extern) | Ollama Primary, ComfyUI | Windows, RTX 3090 |

Drei Betriebssysteme (Ubuntu, Fedora, Windows), drei Swarm-Manager für Quorum, und ein externer Windows-Rechner mit der dicken GPU. Genau die Art Setup, die Cloud-Monitoring-Anbieter nicht abdecken.

## Der Monitoring-Stack

Unser Stack besteht aus vier Kernkomponenten, die als Docker Services auf dem Manager-Node laufen:

- **Prometheus** sammelt Metriken von allen Nodes (Scrape-Intervall: 15s)
- **Grafana** visualisiert alles auf 22 Dashboards
- **Alertmanager** schickt Warnungen an unseren Team-Chat-Channel
- **Loki + Promtail** aggregiert Container-Logs zentral

Alle Services haben `restart_policy: on-failure` gesetzt. Wenn ein Collector ausfällt, startet er automatisch neu.

## Node Exporters: Jeder Node meldet sich

Auf jedem Linux-Node läuft ein `node-exporter` als Docker Service. Der liefert CPU, RAM, Disk, Netzwerk-Metriken direkt an Prometheus. Das deckt 5 von 6 Nodes ab.

Für den Windows-Rechner war es aufwändiger. Windows hat keinen `node-exporter` im Docker. Stattdessen haben wir den `windows_exporter` als Windows-Service installiert und die Firewall für den Prometheus-Scrape-Port freigeschaltet. Das geht mit wenigen PowerShell-Befehlen — der `windows_exporter` bringt eine `--service install` Option mit.

Dazu läuft auf dem GPU-Server ein `nvidia_gpu_exporter` (GPU Exporter Port) für GPU-Metriken. Temperatur, VRAM-Auslastung, GPU-Load — alles in Grafana sichtbar.

## GPU-Monitoring mit DCGM

Auf der Fedora-Workstation (Worker-Node) läuft der NVIDIA DCGM Exporter als Docker Container. Die Installation ist ein einzelner `docker run`-Befehl mit `--gpus all` und dem offiziellen NVIDIA DCGM Exporter Image. Den Port konfiguriert man passend zum Prometheus-Scrape-Target.

Prometheus scraped beide GPU-Nodes und wir sehen in Grafana auf einen Blick, welche GPU gerade unter Last steht und ob ein Ollama-Modell OOM läuft.

## Ops Dashboard: 18/18 Healthy

Neben Grafana haben wir ein eigenes Ops Dashboard (Next.js). Das zeigt den Health-Status aller 18 Kern-Services auf einer Seite. Gruen = gesund, Rot = Alarm. Kein Login in Grafana nötig für den schnellen Überblick.

Das Dashboard prüft die Services aktiv: HTTP-Health-Checks gegen jeden Endpunkt, alle 60 Sekunden. Wenn ERPNext nicht antwortet oder n8n down ist, sehen wir das sofort.

## Alerting: Team-Chat statt PagerDuty

Alertmanager schickt Warnungen direkt an unseren Team-Chat-Server. Kein externer Dienst, kein Slack, kein PagerDuty. Eine Webhook-URL, ein Channel, fertig.

Typische Alerts:
- Node unreachable (länger als 2 Minuten)
- Disk Usage > 85%
- Container Restart Loop (> 3 Restarts in 5 Minuten)
- GPU OOM Detection (7 Patterns: cuda error, cudamalloc, cublas, vram, alloc)

## Was das in der Praxis bedeutet

Wir hatten am 7. März einen Fall, bei dem der komplette Monitoring-Stack für 2 Stunden ausgefallen ist (Prometheus, Grafana und Alertmanager gleichzeitig). Weil alle Services `restart_policy: on-failure` haben, kamen sie automatisch zurück. Die Lücke in den Metriken war sichtbar, aber kein Datenverlust.

Das ist der Vorteil von Local-First: Wir verstehen jeden Layer, wir kontrollieren jeden Neustart, und wir müssen niemandem erklären, warum unsere Monitoring-Daten das Netzwerk nicht verlassen.

## Fazit

Enterprise-Monitoring muss nicht teuer sein. Prometheus, Grafana, Alertmanager und Loki sind Open Source. Die einzige Investition ist Zeit für die Konfiguration. Dafür bekommt man volle Kontrolle und DSGVO-Konformität ohne Kompromisse.

Unser komplettes Grafana-Setup mit 22 vorkonfigurierten Dashboards gibt es als [Grafana Homelab Dashboard Pack](https://www.ai-engineering.at/products) für EUR 39. Alle Dashboards sind getestet mit Docker Swarm, node-exporter und GPU-Metriken.
