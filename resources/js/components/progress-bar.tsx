import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'green' | 'red' | 'yellow' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  [key: string]: unknown;
}

export function ProgressBar({ value, max = 100, label, color = 'blue', size = 'md' }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorClasses = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
  };

  // Auto-color based on percentage if not specified
  let autoColor = color;
  if (color === 'blue' && percentage > 80) {
    autoColor = 'red';
  } else if (color === 'blue' && percentage > 60) {
    autoColor = 'yellow';
  } else if (color === 'blue') {
    autoColor = 'green';
  }

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          <span>{value.toFixed(1)}{max === 100 ? '%' : ''}</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[autoColor]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}