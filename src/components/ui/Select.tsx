import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDownIcon } from './Icons';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, hint, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-bold text-text-secondary tracking-wider uppercase font-sans"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full bg-white border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary transition-all duration-150 appearance-none cursor-pointer shadow-2xs',
              'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              error ? 'border-accent-coral focus:border-accent-coral focus:ring-accent-coral/20' : '',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-white text-text-primary py-1"
              >
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 text-text-muted pointer-events-none">
            <ChevronDownIcon size={16} />
          </div>
        </div>

        {error && <p className="text-xs text-accent-coral font-medium mt-0.5">{error}</p>}
        {!error && hint && <p className="text-xs text-text-muted mt-0.5">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
