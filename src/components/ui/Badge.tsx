import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({
  variant = 'default',
  size = 'sm',
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-bg-surface text-text-secondary border-border-default',
    primary: 'bg-pastel-peach/60 text-text-primary border-[#F2C0A2]',
    success: 'bg-pastel-sage/60 text-[#2D5A37] border-[#A8CCAA]',
    warning: 'bg-pastel-butter/80 text-[#735A00] border-[#F2DA91]',
    danger: 'bg-pastel-pink/60 text-[#9C2A24] border-[#F5A3B5]',
    info: 'bg-pastel-lavender/60 text-[#49446D] border-[#CFC7ED]',
  };

  const sizeStyles = {
    sm: 'text-[11px] font-medium px-2.5 py-0.5 rounded-full border',
    md: 'text-xs font-semibold px-3 py-1 rounded-full border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
