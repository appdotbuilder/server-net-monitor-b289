import React from 'react';

interface AlertBadgeProps {
  severity: 'info' | 'warning' | 'critical';
  children: React.ReactNode;
  [key: string]: unknown;
}

export function AlertBadge({ severity, children }: AlertBadgeProps) {
  const severityClasses = {
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${severityClasses[severity]}`}>
      {children}
    </span>
  );
}