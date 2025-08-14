import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { MetricCard } from '@/components/metric-card';
import { ServerCard } from '@/components/server-card';
import { NetworkDeviceCard } from '@/components/network-device-card';
import { AlertBadge } from '@/components/alert-badge';

interface ServerMetric {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  running_processes: number;
  load_average: number;
  recorded_at: string;
}

interface NetworkMetric {
  latency: number;
  packet_loss: number;
  bytes_in: number;
  bytes_out: number;
  recorded_at: string;
}

interface Alert {
  id: number;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  created_at: string;
  alertable: {
    id: number;
    name: string;
  };
}

interface Server {
  id: number;
  name: string;
  ip_address: string;
  status: 'online' | 'offline' | 'maintenance';
  latest_metric?: ServerMetric;
  alerts: Alert[];
}

interface NetworkDevice {
  id: number;
  name: string;
  ip_address: string;
  device_type: string;
  status: 'up' | 'down' | 'unknown';
  last_latency?: number;
  latest_metric?: NetworkMetric;
  alerts: Alert[];
}

interface ServerStats {
  total: number;
  online: number;
  offline: number;
  maintenance: number;
}

interface NetworkStats {
  total: number;
  up: number;
  down: number;
  unknown: number;
}

interface Props {
  servers: Server[];
  networkDevices: NetworkDevice[];
  serverStats: ServerStats;
  networkStats: NetworkStats;
  recentAlerts: Alert[];
  criticalAlertsCount: number;
  [key: string]: unknown;
}

export default function Welcome({ 
  servers, 
  networkDevices, 
  serverStats, 
  networkStats, 
  recentAlerts, 
  criticalAlertsCount 
}: Props) {
  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      router.post(route('dashboard.refresh'), {}, {
        preserveState: true,
        preserveScroll: true,
        only: ['servers', 'networkDevices', 'serverStats', 'networkStats', 'recentAlerts', 'criticalAlertsCount']
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    router.post(route('dashboard.refresh'), {}, {
      preserveState: true,
      preserveScroll: true,
      only: ['servers', 'networkDevices', 'serverStats', 'networkStats', 'recentAlerts', 'criticalAlertsCount']
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                📊 Network & Server Monitor
              </h1>
              <p className="text-gray-600 mt-2">Real-time infrastructure monitoring dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              {criticalAlertsCount > 0 && (
                <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg">
                  <span className="text-xl">🚨</span>
                  <span className="font-semibold">{criticalAlertsCount} Critical Alerts</span>
                </div>
              )}
              <button
                onClick={handleRefresh}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Servers Online"
            value={`${serverStats.online}/${serverStats.total}`}
            icon="🖥️"
            color={serverStats.offline > 0 ? 'red' : 'green'}
          />
          <MetricCard
            title="Network Devices"
            value={`${networkStats.up}/${networkStats.total}`}
            icon="📡"
            color={networkStats.down > 0 ? 'red' : 'green'}
          />
          <MetricCard
            title="Active Alerts"
            value={recentAlerts.length}
            icon="🔔"
            color={criticalAlertsCount > 0 ? 'red' : recentAlerts.length > 0 ? 'yellow' : 'green'}
          />
          <MetricCard
            title="System Health"
            value={serverStats.offline === 0 && networkStats.down === 0 ? 'Healthy' : 'Issues'}
            icon={serverStats.offline === 0 && networkStats.down === 0 ? '✅' : '⚠️'}
            color={serverStats.offline === 0 && networkStats.down === 0 ? 'green' : 'red'}
          />
        </div>

        {/* Recent Alerts */}
        {recentAlerts.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                🚨 Recent Alerts
              </h2>
              <a href={route('alerts.index')} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </a>
            </div>
            <div className="space-y-3">
              {recentAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertBadge severity={alert.severity}>
                      {alert.severity.toUpperCase()}
                    </AlertBadge>
                    <div>
                      <p className="font-medium text-gray-900">{alert.title}</p>
                      <p className="text-sm text-gray-600">
                        {alert.alertable.name} - {alert.message}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(alert.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Servers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              🖥️ Servers ({serverStats.total})
            </h2>
            <a href={route('servers.index')} className="text-blue-600 hover:text-blue-700 font-medium">
              View All Servers →
            </a>
          </div>
          
          {servers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {servers.slice(0, 6).map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">🖥️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Servers Configured</h3>
              <p className="text-gray-600">Add servers to start monitoring their performance.</p>
            </div>
          )}
        </div>

        {/* Network Devices Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              📡 Network Devices ({networkStats.total})
            </h2>
            <a href={route('network-devices.index')} className="text-blue-600 hover:text-blue-700 font-medium">
              View All Devices →
            </a>
          </div>
          
          {networkDevices.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {networkDevices.slice(0, 6).map((device) => (
                <NetworkDeviceCard key={device.id} device={device} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">📡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Network Devices Configured</h3>
              <p className="text-gray-600">Add network devices to monitor their connectivity and performance.</p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            🔧 Monitoring Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600 text-sm">Live updates every 30 seconds with automatic refresh</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Metrics</h3>
              <p className="text-gray-600 text-sm">CPU, memory, disk usage, and network statistics</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🔔</div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Alerts</h3>
              <p className="text-gray-600 text-sm">Intelligent alerting system for critical issues</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Historical Data</h3>
              <p className="text-gray-600 text-sm">Track performance trends over time</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Network Monitoring</h3>
              <p className="text-gray-600 text-sm">Latency, bandwidth, and device status tracking</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-gray-600 text-sm">Monitor from anywhere on any device</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}