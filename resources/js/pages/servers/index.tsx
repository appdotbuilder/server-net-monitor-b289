import React from 'react';
import { ServerCard } from '@/components/server-card';

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

interface Server {
  id: number;
  name: string;
  ip_address: string;
  status: 'online' | 'offline' | 'maintenance';
  latest_metric?: ServerMetric;
  alerts: Alert[];
}

interface Props {
  servers: Server[];
  [key: string]: unknown;
}

export default function ServersIndex({ servers }: Props) {
  const onlineServers = servers.filter(s => s.status === 'online');
  const offlineServers = servers.filter(s => s.status === 'offline');
  const maintenanceServers = servers.filter(s => s.status === 'maintenance');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                🖥️ Servers
              </h1>
              <p className="text-gray-600 mt-2">
                {servers.length} total servers - {onlineServers.length} online, {offlineServers.length} offline
              </p>
            </div>
            <a
              href={route('home')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✅</div>
              <div>
                <div className="text-2xl font-bold text-green-800">{onlineServers.length}</div>
                <div className="text-green-700">Online</div>
              </div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">❌</div>
              <div>
                <div className="text-2xl font-bold text-red-800">{offlineServers.length}</div>
                <div className="text-red-700">Offline</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔧</div>
              <div>
                <div className="text-2xl font-bold text-yellow-800">{maintenanceServers.length}</div>
                <div className="text-yellow-700">Maintenance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Online Servers */}
        {onlineServers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              ✅ Online Servers ({onlineServers.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {onlineServers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>
        )}

        {/* Offline Servers */}
        {offlineServers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              ❌ Offline Servers ({offlineServers.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {offlineServers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>
        )}

        {/* Maintenance Servers */}
        {maintenanceServers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              🔧 Maintenance Servers ({maintenanceServers.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {maintenanceServers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>
        )}

        {servers.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🖥️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Servers Found</h3>
            <p className="text-gray-600">Add servers to start monitoring their performance.</p>
          </div>
        )}
      </div>
    </div>
  );
}