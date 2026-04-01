# Home Assistant Homelab Research — Umfassender Bericht

> Recherche-Datum: 2026-03-26
> Kontext: HA auf 10.40.10.8 (CasaOS NUC), 2x TP-Link Kasa Plugs, 3x NVIDIA GPUs, Docker Swarm, Grafana+Prometheus auf .80

---

## 1. Smart Plug Power Monitoring — Best Practices

### Aktuelle Situation
- TP-Link Kasa Plug auf .64 (Server-Rack) und .66 (IT-Gesamt)
- Beide liefern Watt (Power) und kWh (Energy) Sensoren

### Best Practices

**Hierarchie nutzen (Upstream Devices):**
HA unterstuetzt Parent-Child-Beziehungen zwischen Energiequellen. Der Plug auf .66 (IT-Gesamt) sollte als "Upstream Device" fuer .64 (Server-Rack) konfiguriert werden. So wird Doppelzaehlung im Energy Dashboard verhindert.

**Polling-Intervall beachten:**
TP-Link Power Strip Child Plugs aktualisieren nur alle 60 Sekunden. Einzelne Plugs sind schneller (~10s). Fuer praezises Monitoring reicht das, fuer Echtzeit-Alerts sollte man das beruecksichtigen.

**Empfohlene Zusatz-Hardware:**
| Plug | Preis | Vorteil |
|------|-------|---------|
| Shelly Plug S Gen3 | ~20 EUR | 1-Sekunden-Aufloesung, lokale API, kein Cloud-Zwang |
| NOUS A1T (Tasmota) | ~12 EUR | Vorgeflasht mit Tasmota, MQTT direkt, guenstigste Option |
| Athom Tasmota EU Plug V2 | ~15 EUR | ESP8266, Tasmota ab Werk, Energy Monitoring |

**Empfehlung:** Fuer jede GPU-Maschine (.90, .91, .99) einen eigenen Shelly Plug S Gen3 oder NOUS A1T anschaffen. So misst man den realen Stromverbrauch pro Node, nicht nur geschaetzt ueber nvidia-smi.

### Quellen
- https://community.home-assistant.io/t/what-are-the-recommended-energy-monitoring-smart-plugs-for-ha/589681
- https://www.home-assistant.io/docs/energy/individual-devices/
- https://smartwattflow.com/blog/home-assistant-energy-monitoring-guide

---

## 2. Energy Dashboard Konfiguration

### Setup-Schritte

1. **Settings > Dashboards > Energy** oeffnen (oder Sidebar "Energy")
2. Seit HA 2026.3: Drei Tabs — Electricity, Gas, Water
3. **Electricity Grid Consumption** hinzufuegen:
   - Entity: `sensor.kasa_plug_66_total_energy` (IT-Gesamt, kWh)
   - Preis: Statisch 0.15 EUR/kWh eintragen
4. **Individual Devices** hinzufuegen:
   - `sensor.kasa_plug_64_total_energy` (Server-Rack)
   - Upstream Device: den .66 Plug waehlen
5. Spaeter: GPU-Nodes als weitere Individual Devices

### Sensor-Anforderungen
- `device_class: energy`
- `state_class: total_increasing`
- `unit_of_measurement: kWh`

Wenn ein Plug nur Watt (Power) liefert, muss ein **Riemann Sum Integral** Sensor erstellt werden:

```yaml
sensor:
  - platform: integration
    source: sensor.kasa_plug_64_current_consumption
    name: "Server Rack Energy"
    unit_prefix: k
    round: 2
    method: left
```

### Quellen
- https://www.home-assistant.io/docs/energy/
- https://www.home-assistant.io/docs/energy/electricity-grid/
- https://www.home-assistant.io/docs/energy/individual-devices/

---

## 3. TP-Link Kasa Integration — Bekannte Probleme

### Authentifizierung

**Aktueller Stand (2026.3):**
Neuere Kasa-Firmware erfordert TP-Link Cloud Credentials (E-Mail + Passwort) fuer lokalen Zugriff. Das ist kein Cloud-Zwang — die Kommunikation bleibt lokal, aber die Authentifizierung nutzt ein Cloud-basiertes Challenge-Response.

**Bekannte Probleme:**
1. **Challenge Response Fehler:** "Device response did not match our challenge" — haeufig nach Firmware-Update
2. **Re-Authentifizierung nach Stromausfall:** Plugs verlieren Auth wenn sie Strom verlieren
3. **Gross-/Kleinschreibung:** E-Mail-Adresse ist case-sensitive, manchmal hilft erster Buchstabe gross

**Loesungen:**
- In Kasa App: **Settings > Third-Party Compatibility** aktivieren
- Automatische Firmware-Updates deaktivieren (verhindert Breaking Changes)
- Statische IP-Adressen vergeben (Auto-Discovery funktioniert nicht ueber Subnets)
- Bei persistenten Problemen: Plug aus Kasa-App entfernen, neu koppeln

### Empfehlung fuer unser Setup
Die Kasa Plugs auf .64 und .66 funktionieren, aber die Cloud-Abhaengigkeit bei der Authentifizierung ist ein Risiko. Langfristig auf Tasmota/Shelly-basierte Plugs migrieren fuer volle lokale Kontrolle.

### Quellen
- https://www.home-assistant.io/integrations/tplink/
- https://community.home-assistant.io/t/tp-link-smart-home-integration-authentication/717058
- https://community.home-assistant.io/t/kasa-tp-link-hs300s-lose-authentication-if-they-drop-power/950526

---

## 4. REST API — Energiedaten lesen

### Home Assistant REST API

**Endpoint:** `http://10.40.10.8:8123/api/states/{entity_id}`

**Authentifizierung:** Long-Lived Access Token (Settings > Security > Long-Lived Access Tokens)

**Beispiel — Aktuellen Stromverbrauch abrufen:**
```bash
curl -s -H "Authorization: Bearer TOKEN" \
  http://10.40.10.8:8123/api/states/sensor.kasa_plug_66_current_consumption | jq '.state'
```

**Beispiel — Alle Energie-Sensoren abrufen:**
```bash
curl -s -H "Authorization: Bearer TOKEN" \
  http://10.40.10.8:8123/api/states | jq '[.[] | select(.entity_id | startswith("sensor.kasa"))]'
```

### Prometheus Exporter (fuer Grafana)

In HA `configuration.yaml`:
```yaml
prometheus:
  namespace: homeassistant
  filter:
    include_domains:
      - sensor
      - switch
    include_entity_globs:
      - sensor.kasa_*
      - sensor.*_gpu_*
      - sensor.*_energy*
      - sensor.*_power*
```

Dann in Prometheus auf .80 als Scrape Target hinzufuegen:
```yaml
scrape_configs:
  - job_name: 'homeassistant'
    metrics_path: /api/prometheus
    bearer_token: 'LONG_LIVED_ACCESS_TOKEN'
    scheme: http
    static_configs:
      - targets: ['10.40.10.8:8123']
```

### Quellen
- https://developers.home-assistant.io/docs/api/rest/
- https://www.home-assistant.io/integrations/prometheus/
- https://www.home-assistant.io/integrations/sensor.rest/

---

## 5. Automatisierungen fuer Stromverbrauch

### Empfohlene Automations

**1. Hoher Verbrauch Alert:**
```yaml
automation:
  - alias: "Alert: Server-Rack hoher Verbrauch"
    trigger:
      - platform: numeric_state
        entity_id: sensor.kasa_plug_64_current_consumption
        above: 800
        for: "00:05:00"
    action:
      - service: notify.notify
        data:
          title: "Stromverbrauch Server-Rack"
          message: "Server-Rack zieht {{ states('sensor.kasa_plug_64_current_consumption') }}W seit 5 Minuten!"
```

**2. Idle-Erkennung (GPU-Nodes verbrauchen zu viel im Idle):**
```yaml
automation:
  - alias: "Alert: GPU-Node Idle aber hoher Verbrauch"
    trigger:
      - platform: numeric_state
        entity_id: sensor.gpu_node_90_power
        above: 150
        for: "00:30:00"
    condition:
      - condition: numeric_state
        entity_id: sensor.gpu_node_90_utilization
        below: 5
    action:
      - service: notify.notify
        data:
          message: "Node .90 zieht {{ states('sensor.gpu_node_90_power') }}W bei {{ states('sensor.gpu_node_90_utilization') }}% GPU-Last. Suspend?"
```

**3. Tages-Report:**
```yaml
automation:
  - alias: "Daily Energy Report"
    trigger:
      - platform: time
        at: "23:55:00"
    action:
      - service: notify.notify
        data:
          title: "Tages-Energiebericht"
          message: >
            IT-Gesamt heute: {{ states('sensor.kasa_plug_66_today_energy') }} kWh
            ({{ (states('sensor.kasa_plug_66_today_energy') | float * 0.15) | round(2) }} EUR)
            Server-Rack: {{ states('sensor.kasa_plug_64_today_energy') }} kWh
```

**4. Stromausfall-Erkennung:**
```yaml
automation:
  - alias: "Alert: Plug offline"
    trigger:
      - platform: state
        entity_id: switch.kasa_plug_64
        to: "unavailable"
        for: "00:02:00"
    action:
      - service: notify.notify
        data:
          title: "WARNUNG"
          message: "Smart Plug Server-Rack ist offline seit 2 Minuten!"
```

### Quellen
- https://www.home-assistant.io/integrations/alert/
- https://community.home-assistant.io/t/automated-notification-of-energy-entity-power-usage/330614
- https://community.home-assistant.io/t/how-to-automate-alerting-a-change-in-power-usage/696598

---

## 6. GPU Power Monitoring

### Optionen

**Option A: nvml-gpu-ha (Empfohlen)**
- Go-Binary, nutzt NVIDIA NVML direkt
- Exponiert per MQTT: Power Draw (W), GPU Utilization (%), VRAM (%), Temperatur, P-State
- Docker-Image verfuegbar: `ghcr.io/pccr10001/nvml-gpu-ha:latest`
- HA Auto-Discovery ueber MQTT

**Konfiguration pro GPU-Node:**
```toml
# /etc/nvml-gpu-ha.conf
mqtt_host = "10.40.10.8"
mqtt_port = 1883
mqtt_username = "homeassistant"
mqtt_password = "SECRET"
mqtt_lwt_enable = true
polling_period = 10
```

**Docker Compose (auf jedem GPU-Node):**
```yaml
services:
  nvml-gpu-ha:
    image: ghcr.io/pccr10001/nvml-gpu-ha:latest
    runtime: nvidia
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
      - MQTT_HOST=10.40.10.8
      - MQTT_PORT=1883
    restart: unless-stopped
```

**Option B: smi2mqtt**
- Python-basiert, nutzt nvidia-smi CLI
- Gleiche Metriken: GPU Util, VRAM, Power, Energy
- Einfacher zu deployen, aber weniger robust als NVML

**Option C: Prometheus nvidia_gpu_exporter (bereits vorhanden?)**
- Wenn bereits `nvidia_gpu_exporter` auf den Nodes laeuft, kann HA die Daten ueber den Prometheus-Umweg lesen
- Aber: Kein direktes HA-Entity, nur Grafana-Dashboards

### Wichtig: nvidia-smi vs. Smart Plug
| Methode | Misst | Genauigkeit |
|---------|-------|-------------|
| nvidia-smi / NVML | GPU-Board Power Draw | Nur GPU, nicht PSU-Verluste, nicht CPU/RAM |
| Smart Plug am Node | Gesamtverbrauch des Rechners | Realer Stromverbrauch inkl. aller Komponenten |

**Empfehlung:** Beides nutzen. Smart Plug fuer reale Kosten, NVML fuer GPU-spezifische Korrelation (Workload vs. Verbrauch).

### Quellen
- https://github.com/pccr10001/nvml-gpu-ha
- https://community.home-assistant.io/t/smi2mqtt-nvidia-gpu-monitoring-via-mqtt-nvidia-smi/922787
- https://github.com/tamisoft/nvidia-smi2ha

---

## 7. Docker Container Monitoring

### Optionen

**Option A: Portainer Integration (Offiziell ab HA 2026.3)**
- Offizielle HA-Integration
- Sensoren: CPU Usage, Memory Usage, Memory %, Memory Limit
- Voraussetzung: Portainer muss laufen
- Wenn Portainer bereits im Stack ist: Einfachste Loesung

**Option B: Monitor Docker (HACS Custom Integration)**
- GitHub: `ualex73/monitor_docker`
- Zeigt: Container State, CPU, Memory, Network, Uptime
- Installation ueber HACS
- Braucht Zugriff auf Docker Socket

**Option C: Docker Socket Proxy (Sicherste Option)**
- Nutzt `tecnativa/docker-socket-proxy` als Middleware
- HA kommuniziert nicht direkt mit Docker Socket
- Ideal fuer Docker Swarm Setup wo HA auf anderem Host laeuft

### Empfehlung fuer unser Setup
Da HA auf dem CasaOS NUC (.8) laeuft und Docker Swarm auf anderen Nodes:
1. **Portainer Integration** aktivieren (Portainer managed den Swarm sowieso)
2. Fuer tieferes Monitoring: Prometheus + cAdvisor auf jedem Node (wahrscheinlich schon vorhanden auf .80)
3. HA als zusaetzliches Dashboard, nicht als Ersatz fuer Grafana

### Quellen
- https://www.home-assistant.io/integrations/portainer/
- https://github.com/ualex73/monitor_docker
- https://community.home-assistant.io/t/custom-integration-ha-docker-socket-proxy-secure-real-time-container-monitoring/980791

---

## 8. Kostenberechnung

### Statischer Preis (unser Fall: 0.15 EUR/kWh)

Im Energy Dashboard unter **Electricity Grid > Configure**:
- "Use a static price" waehlen
- 0.15 EUR/kWh eintragen
- HA berechnet automatisch Tages-/Wochen-/Monatskosten

### Template Sensor fuer Echtzeit-Kosten

```yaml
template:
  - sensor:
      - name: "IT Kosten heute"
        unit_of_measurement: "EUR"
        state: >
          {{ (states('sensor.kasa_plug_66_today_energy') | float(0) * 0.15) | round(2) }}

      - name: "IT Kosten Monat"
        unit_of_measurement: "EUR"
        state: >
          {{ (states('sensor.kasa_plug_66_monthly_energy') | float(0) * 0.15) | round(2) }}

      - name: "Server-Rack Kosten heute"
        unit_of_measurement: "EUR"
        state: >
          {{ (states('sensor.kasa_plug_64_today_energy') | float(0) * 0.15) | round(2) }}
```

### Utility Meter fuer praezise Perioden

```yaml
utility_meter:
  server_rack_energy_daily:
    source: sensor.kasa_plug_64_total_energy
    cycle: daily
  server_rack_energy_monthly:
    source: sensor.kasa_plug_64_total_energy
    cycle: monthly
  it_total_energy_daily:
    source: sensor.kasa_plug_66_total_energy
    cycle: daily
  it_total_energy_monthly:
    source: sensor.kasa_plug_66_total_energy
    cycle: monthly
```

### Quellen
- https://www.home-assistant.io/docs/energy/electricity-grid/
- https://community.home-assistant.io/t/solved-calculate-cost-for-individual-device-cost-kwh/523880
- https://github.com/martinarva/dynamic_energy_cost

---

## 9. Grafana Integration

### Architektur

```
HA (10.40.10.8) --[/api/prometheus]--> Prometheus (10.40.10.80) --> Grafana (10.40.10.80)
```

### Setup-Schritte

**1. HA: Prometheus Exporter aktivieren**
```yaml
# configuration.yaml auf HA
prometheus:
  namespace: ha
  filter:
    include_entity_globs:
      - sensor.*energy*
      - sensor.*power*
      - sensor.*consumption*
      - sensor.*gpu*
      - sensor.*temperature*
      - switch.kasa_*
```

**2. HA: Long-Lived Access Token erstellen**
Settings > Security > Long-Lived Access Tokens > Create Token

**3. Prometheus: Scrape Config hinzufuegen**
```yaml
# prometheus.yml auf .80
scrape_configs:
  - job_name: 'homeassistant'
    scrape_interval: 30s
    metrics_path: /api/prometheus
    bearer_token: 'HA_LONG_LIVED_TOKEN'
    static_configs:
      - targets: ['10.40.10.8:8123']
```

**4. Grafana: Dashboard erstellen**
- Vorgefertigtes Dashboard: https://grafana.com/grafana/dashboards/22928-home-assistant-sensor-data/
- Eigenes Dashboard mit Panels fuer:
  - Gesamtverbrauch (W) ueber Zeit
  - Tagesverbrauch (kWh) als Bar Chart
  - Kosten (EUR) als Stat Panel
  - GPU Power Draw pro Node

### Vorteile gegenueber HA Energy Dashboard
| Feature | HA Energy Dashboard | Grafana |
|---------|-------------------|---------|
| Langzeit-Retention | ~10 Tage detailliert | Unbegrenzt (Prometheus) |
| Custom Queries | Limitiert | PromQL, volle Flexibilitaet |
| Alerting | HA Automations | Grafana Alerts + Alert Manager |
| Multi-Source | Nur HA-Entities | Alles was Prometheus scrapt |

### Quellen
- https://www.home-assistant.io/integrations/prometheus/
- https://grafana.com/blog/monitoring-a-furnace-with-home-assistant-prometheus-and-grafana/
- https://grafana.com/grafana/dashboards/22928-home-assistant-sensor-data/

---

## 10. MQTT Smart Plug — Cloud-freie Alternative

### Warum MQTT?
- Kein Cloud-Account noetig
- Keine Authentifizierungs-Probleme
- Schnellere Reaktionszeiten
- Funktioniert ohne Internet

### Tasmota-basierte Plugs

**NOUS A1T (vorgeflasht mit Tasmota):**
- ~12 EUR, sofort einsatzbereit
- Energy Monitoring: Voltage, Current, Power, Energy
- MQTT Auto-Discovery fuer HA

**Athom Tasmota EU Plug V2:**
- ~15 EUR, ESP8266
- Tasmota ab Werk

### Setup-Flow

1. **MQTT Broker auf HA installieren** (Mosquitto Add-on)
2. **Plug einschalten** → erstellt WLAN AP `tasmota-XXXX`
3. **WLAN konfigurieren** → 192.168.4.1, eigenes WLAN eintragen
4. **MQTT konfigurieren** → Broker IP: 10.40.10.8, Port: 1883
5. **Auto-Discovery** → HA erkennt den Plug automatisch

### Tasmota Console Commands
```
# MQTT konfigurieren
Backlog MqttHost 10.40.10.8; MqttPort 1883; MqttUser mqtt_user; MqttPassword mqtt_pass

# HA Discovery aktivieren
SetOption19 0
so73 1

# Telemetry-Intervall (Sekunden)
TelePeriod 30

# Strom-Kalibrierung (optional, fuer praezise Messung)
PowerSet 60.0
VoltageSet 230.0
CurrentSet 0.261
```

### Migration der Kasa Plugs?
Die TP-Link Kasa Plugs koennen NICHT mit Tasmota geflasht werden (geschlossene Hardware). Optionen:
1. Kasa Plugs behalten fuer Gesamt-Monitoring (.64, .66)
2. Neue Tasmota/Shelly Plugs fuer GPU-Nodes kaufen
3. Langfristig Kasa durch lokale Plugs ersetzen

### Quellen
- https://tasmota.github.io/docs/Home-Assistant/
- https://www.home-assistant.io/integrations/tasmota/
- https://www.athom.tech/blank-1/EU-plug

---

## Konkrete Verbesserungsvorschlaege

### Sofort umsetzbar (0 EUR)

| # | Aktion | Aufwand |
|---|--------|---------|
| 1 | Energy Dashboard in HA konfigurieren (Plugs .64 + .66 hinzufuegen) | 15 min |
| 2 | Strompreis 0.15 EUR/kWh im Energy Dashboard eintragen | 2 min |
| 3 | Upstream-Beziehung .66 > .64 setzen | 2 min |
| 4 | Prometheus Exporter in HA aktivieren | 10 min |
| 5 | Prometheus Scrape Target auf .80 hinzufuegen | 10 min |
| 6 | Utility Meter Sensoren fuer Daily/Monthly erstellen | 10 min |
| 7 | Template Sensoren fuer Kosten-Berechnung erstellen | 10 min |
| 8 | Basis-Automations: Hoher Verbrauch Alert, Plug Offline Alert | 15 min |
| 9 | Tages-Report Automation erstellen | 10 min |
| 10 | Grafana Dashboard fuer HA-Energiedaten erstellen | 30 min |

### Kurzfristig (< 50 EUR)

| # | Aktion | Kosten | Aufwand |
|---|--------|--------|---------|
| 11 | 3x NOUS A1T (Tasmota) fuer GPU-Nodes .90, .91, .99 | ~36 EUR | 1h |
| 12 | Mosquitto MQTT Broker auf HA installieren | 0 EUR | 15 min |
| 13 | nvml-gpu-ha auf allen 3 GPU-Nodes deployen | 0 EUR | 1h |

### Mittelfristig

| # | Aktion | Nutzen |
|---|--------|--------|
| 14 | Kasa Plugs durch Shelly Plug S Gen3 ersetzen | Volle lokale Kontrolle, keine Cloud-Auth |
| 15 | Grafana Alerts fuer Kostenbudgets einrichten | Automatische Warnung bei X EUR/Tag |
| 16 | GPU Idle-Detection mit Auto-Suspend | Strom sparen wenn GPUs nicht genutzt |

### Geschaetztes Einsparpotenzial

Bei typischem Homelab-Betrieb:
- **GPU Idle-Erkennung:** RTX 3090 idle = ~50W, suspend = ~5W → bei 16h idle/Tag: ~0.7 kWh/Tag = ~0.10 EUR/Tag = **~3 EUR/Monat pro GPU**
- **3 GPUs optimiert:** ~9 EUR/Monat
- **Visibility allein** fuehrt erfahrungsgemaess zu ~10-15% Einsparung durch bewussteren Umgang

---

## Architektur-Uebersicht

```
                    +------------------+
                    |   Grafana (.80)  |
                    |   Dashboards +   |
                    |   Alerts         |
                    +--------+---------+
                             |
                    +--------+---------+
                    | Prometheus (.80) |
                    | Long-term Store  |
                    +--------+---------+
                             |
              +--------------+--------------+
              |                             |
    +---------+----------+     +-----------+-----------+
    |  Home Assistant     |     |  Node Exporters       |
    |  10.40.10.8         |     |  cAdvisor, nvidia_gpu |
    |  /api/prometheus    |     |  auf .80-.99          |
    +---------+----------+     +------------------------+
              |
    +---------+----------+
    |  Smart Plugs        |
    |  .64 Server-Rack    |
    |  .66 IT-Gesamt      |
    |  + neue Tasmota     |
    |    fuer GPU-Nodes   |
    +---------------------+
              |
    +---------+----------+
    |  MQTT Broker        |
    |  (Mosquitto auf HA) |
    |  GPU Metrics via    |
    |  nvml-gpu-ha        |
    +---------------------+
```

---

## Fazit

Das Setup hat starkes Potenzial. Die zwei Kasa Plugs liefern bereits Basisdaten, aber es fehlt:
1. **Granularitaet** — kein Per-Node-Monitoring fuer die 3 GPU-Maschinen
2. **Langzeitspeicher** — HA allein speichert nur ~10 Tage detailliert
3. **Korrelation** — Strom-Daten muessen mit GPU-Workload korreliert werden

Die wichtigsten naechsten Schritte:
1. Energy Dashboard + Prometheus Exporter in HA konfigurieren (heute, 30 min)
2. Grafana Dashboard auf .80 bauen (heute, 30 min)
3. 3x Tasmota-Plugs bestellen fuer GPU-Nodes (~36 EUR)
4. nvml-gpu-ha auf GPU-Nodes deployen (nach Plug-Lieferung)
