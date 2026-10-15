import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-border-default bg-bg-surface/30 max-w-md mx-auto my-6',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted mb-4 shadow-inner">
        {icon || (
          <span className="text-2xl" role="img" aria-label="Empty">
            🍽️
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold text-text-primary mb-1.5">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-xs">{description}</p>

      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
