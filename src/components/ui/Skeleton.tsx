import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
}

export function Skeleton({
  variant = 'rectangular',
  className,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'h-4 rounded',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-bg-surface/80 border border-border-subtle/50',
        variantStyles[variant],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
