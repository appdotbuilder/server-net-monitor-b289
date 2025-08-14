import React from 'react';
import { StatusIndicator } from './status-indicator';
import { AlertBadge } from './alert-badge';

interface NetworkMetric {
  latency: number;
  packet_loss: number;
  bytes_in: number;
  bytes_out: number;
  recorded_at: string;
}

interface Alert {
  id: number;
  severity: 'info' | 'warning' | 'critical';
  title: string;
}

interface NetworkDeviceCardProps {
  device: {
    id: number;
    name: string;
    ip_address: string;
    device_type: string;
    status: 'up' | 'down' | 'unknown';
    last_latency?: number;
    latest_metric?: NetworkMetric;
    alerts: Alert[];
  };
  [key: string]: unknown;
}

export function NetworkDeviceCard({ device }: NetworkDeviceCardProps) {
  const metric = device.latest_metric;
  const unresolvedAlerts = device.alerts || [];
  const criticalAlerts = unresolvedAlerts.filter(alert => alert.severity === 'critical');

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getDeviceIcon = (type: string) => {
    const icons = {
      router: '📡',
      switch: '🔀',
      firewall: '🛡️',
      server: '🖥️',
      workstation: '💻',
      other: '📱',
    };
    return icons[type as keyof typeof icons] || icons.other;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {getDeviceIcon(device.device_type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
            <p className="text-sm text-gray-600">{device.ip_address}</p>
            <p className="text-xs text-gray-500 capitalize">{device.device_type}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusIndicator status={device.status} />
          {criticalAlerts.length > 0 && (
            <AlertBadge severity="critical">
              {criticalAlerts.length} Critical
            </AlertBadge>
          )}
        </div>
      </div>

      {device.status === 'up' && (metric || device.last_latency) && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-600 mb-1">Latency</div>
              <div className="font-semibold text-lg">
                {(metric?.latency || device.last_latency || 0).toFixed(1)}ms
              </div>
            </div>
            {metric && (
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-gray-600 mb-1">Packet Loss</div>
                <div className="font-semibold text-lg">
                  {metric.packet_loss.toFixed(2)}%
                </div>
              </div>
            )}
          </div>

          {metric && (
            <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
              <span>⬇ {formatBytes(metric.bytes_in)}</span>
              <span>⬆ {formatBytes(metric.bytes_out)}</span>
            </div>
          )}
        </div>
      )}

      {device.status === 'down' && (
        <div className="text-center py-6 text-gray-500">
          <div className="text-3xl mb-2">⚠️</div>
          <p>Device is down</p>
        </div>
      )}
    </div>
  );
}