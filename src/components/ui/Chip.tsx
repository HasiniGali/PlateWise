import React from 'react';
import { cn } from '../../lib/utils';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export function Chip({
  label,
  selected = false,
  onSelect,
  onRemove,
  icon,
  size = 'md',
  className,
}: ChipProps) {
  const isInteractive = Boolean(onSelect);

  return (
    <div
      onClick={isInteractive ? onSelect : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect?.();
        }
      }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all select-none',
        size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
        isInteractive && 'cursor-pointer hover:border-pastel-peach active:scale-[0.98]',
        selected
          ? 'bg-pastel-peach text-text-primary border border-[#F2BA9A] shadow-xs font-semibold'
          : 'bg-white text-text-secondary border border-border-default hover:text-text-primary hover:bg-bg-surface',
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${label}`}
          className="ml-0.5 -mr-1 p-0.5 rounded-full text-text-muted hover:text-text-primary hover:bg-black/5 focus:outline-none cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
