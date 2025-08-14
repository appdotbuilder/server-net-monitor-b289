import React from 'react';
import { StatusIndicator } from './status-indicator';
import { ProgressBar } from './progress-bar';
import { AlertBadge } from './alert-badge';

interface ServerMetric {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  running_processes: number;
  load_average: number;
  recorded_at: string;
}

interface Alert {
  id: number;
  severity: 'info' | 'warning' | 'critical';
  title: string;
}

interface ServerCardProps {
  server: {
    id: number;
    name: string;
    ip_address: string;
    status: 'online' | 'offline' | 'maintenance';
    latest_metric?: ServerMetric;
    alerts: Alert[];
  };
  [key: string]: unknown;
}

export function ServerCard({ server }: ServerCardProps) {
  const metric = server.latest_metric;
  const unresolvedAlerts = server.alerts || [];
  const criticalAlerts = unresolvedAlerts.filter(alert => alert.severity === 'critical');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{server.name}</h3>
          <p className="text-sm text-gray-600">{server.ip_address}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusIndicator status={server.status} />
          {criticalAlerts.length > 0 && (
            <AlertBadge severity="critical">
              {criticalAlerts.length} Critical
            </AlertBadge>
          )}
        </div>
      </div>

      {metric && server.status === 'online' && (
        <div className="space-y-3">
          <ProgressBar
            value={metric.cpu_usage}
            label="CPU Usage"
            color="blue"
          />
          <ProgressBar
            value={metric.memory_usage}
            label="Memory Usage"
            color="blue"
          />
          <ProgressBar
            value={metric.disk_usage}
            label="Disk Usage"
            color="blue"
          />
          
          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <span>Processes: {metric.running_processes}</span>
            <span>Load: {metric.load_average}</span>
          </div>
        </div>
      )}

      {server.status === 'offline' && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔌</div>
          <p>Server is offline</p>
        </div>
      )}
    </div>
  );
}