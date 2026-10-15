import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export function Card({
  hoverEffect = false,
  padding = 'md',
  glow = false,
  className,
  children,
  ...props
}: CardProps) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-border-subtle bg-bg-card text-text-primary transition-all duration-200 shadow-xs',
        hoverEffect && 'hover:border-border-default hover:bg-bg-card-hover hover:shadow-md hover:-translate-y-0.5',
        glow && 'border-pastel-peach shadow-md shadow-pastel-peach/30',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
