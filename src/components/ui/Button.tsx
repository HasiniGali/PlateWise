import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all cursor-pointer select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-primary text-white font-semibold hover:bg-primary-hover shadow-sm shadow-primary/20 hover:shadow-md active:bg-[#C8664B]',
      secondary:
        'bg-bg-card text-text-primary border border-border-default hover:bg-bg-surface hover:border-pastel-peach active:bg-bg-surface shadow-xs',
      ghost:
        'bg-transparent text-text-secondary hover:text-text-primary hover:bg-pastel-peach/20 active:bg-pastel-peach/30',
      danger:
        'bg-accent-coral text-white hover:bg-accent-coral-hover shadow-sm shadow-accent-coral/20',
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-4.5 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || isLoading || prefersReducedMotion ? undefined : { scale: 1.02 }}
        whileTap={disabled || isLoading || prefersReducedMotion ? undefined : { scale: 0.98 }}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
