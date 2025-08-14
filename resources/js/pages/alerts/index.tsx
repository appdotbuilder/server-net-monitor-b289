import React from 'react';
import { router } from '@inertiajs/react';
import { AlertBadge } from '@/components/alert-badge';

interface Alert {
  id: number;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  is_resolved: boolean;
  created_at: string;
  resolved_at?: string;
  alertable: {
    id: number;
    name: string;
    ip_address?: string;
  };
}

interface AlertsData {
  data: Alert[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Props {
  alerts: AlertsData;
  [key: string]: unknown;
}

export default function AlertsIndex({ alerts }: Props) {
  const unresolvedAlerts = alerts.data.filter(alert => !alert.is_resolved);
  const resolvedAlerts = alerts.data.filter(alert => alert.is_resolved);
  const criticalAlerts = unresolvedAlerts.filter(alert => alert.severity === 'critical');

  const handleResolveAlert = (alertId: number) => {
    router.put(route('alerts.update', alertId), {}, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        // Alert resolved successfully
      }
    });
  };

  const getAlertIcon = (type: string) => {
    const icons = {
      cpu_high: '⚡',
      memory_high: '💾',
      disk_full: '💿',
      server_down: '🖥️',
      device_down: '📡',
      high_latency: '🌐',
    };
    return icons[type as keyof typeof icons] || '🔔';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                🚨 Alerts
              </h1>
              <p className="text-gray-600 mt-2">
                {alerts.total} total alerts - {unresolvedAlerts.length} unresolved, {criticalAlerts.length} critical
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
        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🚨</div>
              <div>
                <div className="text-2xl font-bold text-red-800">{criticalAlerts.length}</div>
                <div className="text-red-700">Critical</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚠️</div>
              <div>
                <div className="text-2xl font-bold text-yellow-800">{unresolvedAlerts.length}</div>
                <div className="text-yellow-700">Unresolved</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✅</div>
              <div>
                <div className="text-2xl font-bold text-green-800">{resolvedAlerts.length}</div>
                <div className="text-green-700">Resolved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Unresolved Alerts */}
        {unresolvedAlerts.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                ⚠️ Unresolved Alerts ({unresolvedAlerts.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {unresolvedAlerts.map((alert) => (
                <div key={alert.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertBadge severity={alert.severity}>
                            {alert.severity.toUpperCase()}
                          </AlertBadge>
                          <span className="text-sm text-gray-500">
                            {alert.alertable.name} ({alert.alertable.ip_address})
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{alert.message}</p>
                        <p className="text-sm text-gray-500">
                          Created: {formatDate(alert.created_at)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleResolveAlert(alert.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      ✓ Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resolved Alerts */}
        {resolvedAlerts.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                ✅ Resolved Alerts ({resolvedAlerts.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {resolvedAlerts.map((alert) => (
                <div key={alert.id} className="p-6 opacity-75">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertBadge severity={alert.severity}>
                          {alert.severity.toUpperCase()}
                        </AlertBadge>
                        <span className="text-sm text-gray-500">
                          {alert.alertable.name} ({alert.alertable.ip_address})
                        </span>
                        <span className="text-sm text-green-600 font-medium">✓ RESOLVED</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {alert.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{alert.message}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Created: {formatDate(alert.created_at)}</span>
                        {alert.resolved_at && (
                          <span>Resolved: {formatDate(alert.resolved_at)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {alerts.total === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alerts Found</h3>
            <p className="text-gray-600">Your infrastructure is running smoothly with no alerts.</p>
          </div>
        )}

        {/* Pagination */}
        {alerts.last_page > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              {Array.from({ length: alerts.last_page }, (_, i) => i + 1).map((page) => (
                <a
                  key={page}
                  href={`?page=${page}`}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    page === alerts.current_page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {page}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}