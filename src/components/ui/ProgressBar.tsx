import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export interface ProgressBarProps {
  value: number; // Current value (e.g. spent)
  max: number;   // Maximum threshold (e.g. budget)
  label?: string;
  sublabel?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  sublabel,
  showPercent = true,
  size = 'md',
  className,
}: ProgressBarProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Percentage calculation (can exceed 100% when over-budget)
  const safeMax = max > 0 ? max : 1;
  const percentage = Math.round((value / safeMax) * 100);
  const clampedWidth = Math.min(100, Math.max(0, percentage));

  // Dynamic Pastel Color Shifting:
  // < 70% = Sage Green (Safe & Healthy)
  // 70% - 90% = Butter Yellow (Caution)
  // > 90% = Soft Pink / Coral (Warning)
  let fillColor = 'bg-pastel-sage';
  let textColor = 'text-[#2D5A37]';

  if (percentage >= 90) {
    fillColor = 'bg-[#F28B82]'; // Coral / Pink
    textColor = 'text-[#A83232]';
  } else if (percentage >= 70) {
    fillColor = 'bg-[#F9D776]'; // Warm Butter Gold
    textColor = 'text-[#876D00]';
  }

  const heightStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {label && <span className="font-semibold text-text-primary">{label}</span>}
            {sublabel && <span className="text-text-muted">{sublabel}</span>}
          </div>
          {showPercent && (
            <span className={cn('font-bold font-mono tracking-tight', textColor)}>
              {percentage}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div
        className={cn(
          'w-full bg-[#EFE5DB] border border-[#E5DACF] rounded-full overflow-hidden p-0.5',
          heightStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
      >
        <motion.div
          initial={prefersReducedMotion ? false : { width: 0 }}
          animate={{ width: `${clampedWidth}%` }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full transition-colors duration-300',
            fillColor
          )}
        />
      </div>
    </div>
  );
}
