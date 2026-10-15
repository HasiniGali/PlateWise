import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onClear,
      className,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold text-text-secondary tracking-wider uppercase font-sans"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-text-muted pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            value={value}
            className={cn(
              'w-full bg-white border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-150 shadow-2xs',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              leftIcon ? 'pl-10.5' : '',
              rightIcon || onClear ? 'pr-10' : '',
              error ? 'border-accent-coral focus:border-accent-coral focus:ring-accent-coral/20 text-accent-coral' : '',
              className
            )}
            {...props}
          />

          {onClear && value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear input"
              className="absolute right-3.5 text-text-muted hover:text-text-primary focus:outline-none cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {!onClear && rightIcon && (
            <div className="absolute right-3.5 text-text-muted pointer-events-none flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-accent-coral font-medium mt-0.5">{error}</p>}
        {!error && hint && <p className="text-xs text-text-muted mt-0.5">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
