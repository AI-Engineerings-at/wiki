import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Backup Strategy | AI Engineering Wiki',
  description: '3-2-1 rule, automated backups for Ollama, n8n, PostgreSQL.',
}

export default function BackupStrategiePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Backup Strategy</h1>
        <p className="text-slate-400 mt-2">Security · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          Backups are your insurance policy. Heres how to backup your AI stack properly.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">3-2-1 Rule</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>3</strong> copies of data</li>
          <li><strong>2</strong> different storage types</li>
          <li><strong>1</strong> copy offsite</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">What to Backup</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Service</th>
              <th className="text-left py-2 text-slate-400">Data</th>
              <th className="text-left py-2 text-slate-400">Priority</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">PostgreSQL</td>
              <td className="py-2">Database dumps</td>
              <td className="py-2 text-red-400">Critical</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Ollama</td>
              <td className="py-2">Models (~4GB each)</td>
              <td className="py-2 text-yellow-400">High</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">n8n</td>
              <td className="py-2">Workflows JSON</td>
              <td className="py-2 text-yellow-400">High</td>
            </tr>
            <tr>
              <td className="py-2">Docker configs</td>
              <td className="py-2">docker-compose.yml</td>
              <td className="py-2 text-green-400">Medium</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-semibold text-white mt-8">Backup Script</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`#!/bin/bash
DATE=$(date +%Y%m%d_%H%M)

# PostgreSQL
docker exec postgres pg_dump -U user db > backup_$DATE.sql

# n8n
tar czf n8n_$DATE.tar.gz ./n8n-data

# Ollama models
tar czf ollama_$DATE.tar.gz /var/lib/ollama

# Upload to remote
rclone copy . remote:backups/$DATE/

# Keep only 7 days locally
find . -name "*.sql" -mtime +7 -delete`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Cron Schedule</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# /etc/cron.d/backup
# Daily at 2am
0 2 * * * root /opt/scripts/backup.sh`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Recovery Test</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Test restore quarterly</li>
          <li>Document recovery steps</li>
          <li>Verify backups are complete</li>
          <li>Test with team</li>
        </ul>
      </div>
    </div>
  )
}
