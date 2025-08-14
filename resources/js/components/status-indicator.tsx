import React from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'maintenance' | 'up' | 'down' | 'unknown';
  size?: 'sm' | 'md' | 'lg';
  [key: string]: unknown;
}

export function StatusIndicator({ status, size = 'md' }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const statusConfig = {
    online: { color: 'bg-green-500', label: 'Online' },
    up: { color: 'bg-green-500', label: 'Up' },
    offline: { color: 'bg-red-500', label: 'Offline' },
    down: { color: 'bg-red-500', label: 'Down' },
    maintenance: { color: 'bg-yellow-500', label: 'Maintenance' },
    unknown: { color: 'bg-gray-400', label: 'Unknown' },
  };

  const config = statusConfig[status] || statusConfig.unknown;

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-full ${config.color} ${sizeClasses[size]}`} />
      <span className="text-sm font-medium capitalize">{config.label}</span>
    </div>
  );
}