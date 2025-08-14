import React from 'react';
import { NetworkDeviceCard } from '@/components/network-device-card';

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

interface Props {
  devices: NetworkDevice[];
  [key: string]: unknown;
}

export default function NetworkDevicesIndex({ devices }: Props) {
  const upDevices = devices.filter(d => d.status === 'up');
  const downDevices = devices.filter(d => d.status === 'down');
  const unknownDevices = devices.filter(d => d.status === 'unknown');

  const deviceTypeGroups = devices.reduce((acc, device) => {
    if (!acc[device.device_type]) {
      acc[device.device_type] = [];
    }
    acc[device.device_type].push(device);
    return acc;
  }, {} as Record<string, NetworkDevice[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                📡 Network Devices
              </h1>
              <p className="text-gray-600 mt-2">
                {devices.length} total devices - {upDevices.length} up, {downDevices.length} down
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
                <div className="text-2xl font-bold text-green-800">{upDevices.length}</div>
                <div className="text-green-700">Up</div>
              </div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">❌</div>
              <div>
                <div className="text-2xl font-bold text-red-800">{downDevices.length}</div>
                <div className="text-red-700">Down</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">❓</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{unknownDevices.length}</div>
                <div className="text-gray-700">Unknown</div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Type Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Device Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(deviceTypeGroups).map(([type, typeDevices]) => {
              const getIcon = (deviceType: string) => {
                const icons = {
                  router: '📡',
                  switch: '🔀',
                  firewall: '🛡️',
                  server: '🖥️',
                  workstation: '💻',
                  other: '📱',
                };
                return icons[deviceType as keyof typeof icons] || icons.other;
              };

              return (
                <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">{getIcon(type)}</div>
                  <div className="font-semibold text-gray-900">{typeDevices.length}</div>
                  <div className="text-sm text-gray-600 capitalize">{type}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Up Devices */}
        {upDevices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              ✅ Online Devices ({upDevices.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {upDevices.map((device) => (
                <NetworkDeviceCard key={device.id} device={device} />
              ))}
            </div>
          </div>
        )}

        {/* Down Devices */}
        {downDevices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              ❌ Offline Devices ({downDevices.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {downDevices.map((device) => (
                <NetworkDeviceCard key={device.id} device={device} />
              ))}
            </div>
          </div>
        )}

        {/* Unknown Devices */}
        {unknownDevices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              ❓ Unknown Status ({unknownDevices.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {unknownDevices.map((device) => (
                <NetworkDeviceCard key={device.id} device={device} />
              ))}
            </div>
          </div>
        )}

        {devices.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Network Devices Found</h3>
            <p className="text-gray-600">Add network devices to monitor their connectivity and performance.</p>
          </div>
        )}
      </div>
    </div>
  );
}