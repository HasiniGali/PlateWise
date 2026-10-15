import { cn } from '../../lib/utils';
import { Button } from './Button';
import { AlertCircleIcon, RefreshIcon } from './Icons';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this information. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-accent-coral/30 bg-accent-coral/5 max-w-md mx-auto my-6',
        className
      )}
      role="alert"
    >
      <div className="w-12 h-12 rounded-xl bg-accent-coral/15 text-accent-coral flex items-center justify-center mb-3.5">
        <AlertCircleIcon size={24} />
      </div>

      <h3 className="text-base font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">{message}</p>

      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<RefreshIcon size={14} />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
