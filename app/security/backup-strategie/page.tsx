import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Backup Strategie | AI Engineering Wiki',
  description:
    'Backup-Strategie für deinen lokalen AI-Stack: 3-2-1 Regel, Restore-Tests, n8n/Ollama/Postgres sichern und Automatisierung in der Praxis.',
}

export default function BackupStrategie() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Backup Strategie für Homelab</h1>
        <p className="text-gray-400 mt-2">Security · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            3-2-1 Regel: 3 Kopien, 2 verschiedene Medien, 1 Offsite. Docker Volumes
            taeglich sichern, Configs bei Aenderung. Restic für verschluesselte
            Backups, Rclone für Cloud-Sync. Restore testen — ein Backup das du
            nicht wiederherstellen kannst ist keins.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Backups sind langweilig bis du sie brauchst. Dann sind sie lebensrettend.
          Hier ist unsere Strategie.
        </p>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

title Backup Pipeline: 3-2-1 Strategie

rectangle "Produktionsdaten" as prod #1E3A5F {
  rectangle "Docker Volumes" as dv #0F172A
  rectangle "Configs" as cfg #0F172A
  rectangle "Git Repos" as git #0F172A
}

rectangle "Kopie 1: Lokal" as local #22543d {
  rectangle "Restic auf NAS\\n(täglich, verschlüsselt)" as nas #0F172A
}

rectangle "Kopie 2: Offsite" as offsite #1E3A5F {
  rectangle "Rclone → Backblaze B2\\n(wöchentlich, verschlüsselt)" as cloud #0F172A
}

rectangle "Kopie 3: Git" as gitcopy #4a4a00 {
  rectangle "GitHub\\n(automatisch bei Push)" as gh #0F172A
}

prod --> local : Restic Backup
prod --> offsite : Rclone Sync
prod --> gitcopy : git push

rectangle "Restore Test\\n(monatlich)" as test #8B0000
local --> test : Verify
offsite --> test : Verify
@enduml`}
          caption="3-2-1 Backup: 3 Kopien, 2 Medien (NAS + Cloud), 1 Offsite — mit regelmäßigem Restore-Test"
        />

        <h2 className="text-xl font-semibold text-white mt-8">3-2-1 Regel</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>3</strong> Kopien deiner Daten</li>
          <li><strong>2</strong> verschiedene Medien (SSD, NAS, Cloud)</li>
          <li><strong>1</strong> Kopie offsite (außer Haus)</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Was sichern?</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Daten</th>
                <th className="text-left py-2 text-gray-400">Priorität</th>
                <th className="text-left py-2 text-gray-400">Häufigkeit</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Docker Volumes</td>
                <td className="py-2">Hoch</td>
                <td className="py-2">Täglich</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Configs</td>
                <td className="py-2">Hoch</td>
                <td className="py-2">Bei Änderung</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Git Repos</td>
                <td className="py-2">Hoch</td>
                <td className="py-2">Auto (GitHub)</td>
              </tr>
              <tr>
                <td className="py-2">Media/Downloads</td>
                <td className="py-2">Niedrig</td>
                <td className="py-2">Wöchentlich</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Backup Tools</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Restic</strong> - Einfach, verschlüsselt, dedup</li>
          <li><strong>Rclone</strong> - Cloud-Sync</li>
          <li><strong>Duplicati</strong> - Web-UI</li>
          <li><strong>Proxmox Backup</strong> - Wenn PVE genutzt</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Beispiel: Restic</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Restic installieren
sudo apt install restic
# oder
pip install restic

# Repository initialisieren
restic -r /mnt/backup init

# Oder mit Password
restic -r /mnt/backup -p $RESTIC_PASSWORD backup /home/data

# Backup erstellen
restic -r /mnt/backup -p $RESTIC_PASSWORD backup /home/data

# Backup planen (cron)
0 2 * * * RESTIC_PASSWORD=meinpass restic -r /mnt/backup backup /home/data

# Aufräumen (nur 7 Tage behalten)
restic forget --keep-daily 7 --prune

# Test-Restore
restic restore latest --target /tmp/restore

# Snapshots anzeigen
restic snapshots`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Rclone für Cloud-Backup</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Rclone konfigurieren
rclone config

# Zu Cloud backupen
rclone copy /local/data remote:backup -P

# Oder mit crypt (verschlüsselt)
rclone copy /local/data crypt-remote:backup -P

# Backup Script
#!/bin/bash
# backup.sh
rclone sync /data remote:backup \
  --exclude "*.tmp" \
  --exclude ".git/**" \
  --progress \
  --transfers 4`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Volume Backup</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Volume sichern
docker run --rm \
  -v postgres_data:/data \
  -v $(pwd):/backup \
  alpine \
  tar czf /backup/postgres-backup.tar.gz -C /data .

# Volume restore
docker run --rm \
  -v postgres_data:/data \
  -v $(pwd):/backup \
  alpine \
  tar xzf /backup/postgres-backup.tar.gz -C /data

# Automatisch mit cron
# 0 3 * * * /opt/scripts/docker-backup.sh`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Wichtige Regeln</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-4">
          <li>• <strong>Backups testen</strong> — nicht lesen dürfen ist nutzlos</li>
          <li>• <strong>Automatisch laufen lassen</strong></li>
          <li>• <strong>Offsite</strong> — mindestens eine Kopie woanders</li>
          <li>• <strong>Versionieren</strong> — können Änderungen rückgängig machen</li>
        </ol>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Setup</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Unser Backup Stack:
# 1. Lokal: Restic auf NAS (täglich)
# 2. Cloud: Rclone zu Backblaze B2 (wöchentlich)
# 3. Git: Alle Configs in Git (auto)

# /opt/backup.sh
#!/bin/bash
set -e

export RESTIC_PASSWORD="xxx"
BACKUP_DIR="/mnt/nas/backup"

# Docker Volumes
docker run --rm \
  -v postgres_data:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf $BACKUP_DIR/postgres-$(date +%Y%m%d).tar.gz -C /data .

# Configs
restic -r $BACKUP_DIR/configs backup /opt/configs

# Cleanup (alte backups)
restic forget --keep-daily 7 --keep-weekly 4 --prune

# Cloud Sync
rclone sync $BACKUP_DIR remote:homelab-backup --transfers 2`}</code>
        </pre>

        <Callout type="warning" title="Restore testen">
          <p>
            Ein Backup ohne regelmaessigen Restore-Test ist wertlos. Teste
            mindestens monatlich, ob du aus deinen Backups wiederherstellen kannst.
            Am besten automatisiert per Cron.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Checkliste</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>[ ] Backup-Skript vorhanden?</li>
            <li>[ ] Automatisch (cron)?</li>
            <li>[ ] Test-Restore funktioniert?</li>
            <li>[ ] Offsite-Kopie existiert?</li>
          </ul>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://restic.net/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Restic — Backup-Tool</a> — Schnell, sicher, dedupliziert</li>
            <li><a href="https://rclone.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Rclone</a> — Cloud-Sync für 70+ Storage-Provider</li>
            <li><a href="https://www.backblaze.com/cloud-storage" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Backblaze B2</a> — Guenstiger Cloud-Storage für Offsite-Backups</li>
            <li><a href="https://www.proxmox.com/en/proxmox-backup-server" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Proxmox Backup Server</a> — Spezialisierte Backup-Loesung für PVE</li>
          </ul>
        </section>
      </div>
    </div>
  )
}