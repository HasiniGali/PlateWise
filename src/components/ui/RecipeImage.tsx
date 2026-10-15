import { useState } from 'react';
import { cn } from '../../lib/utils';

export interface RecipeImageProps {
  slug: string;
  title: string;
  emoji: string;
  imageUrl?: string;
  gradient?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'wide';
}

/**
 * Resilient, high-quality image component for PlateWise.
 * Displays authentic food photography with progressive loading.
 * If the image fails or network is offline, it falls back seamlessly
 * to an elegant pastel gradient and dish icon, avoiding broken image icons.
 */
export function RecipeImage({
  slug,
  title,
  emoji,
  imageUrl,
  gradient = 'from-[#FFE8D6] via-[#FFCDB2] to-[#FFF9F2]',
  className,
  aspectRatio = 'video',
}: RecipeImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectStyles = {
    square: 'aspect-square',
    video: 'aspect-[16/10]',
    wide: 'aspect-[2/1]',
  };

  // Resolved source: custom imageUrl, then public asset, or fallback
  const resolvedSrc = imageUrl || `/images/recipes/${slug}.jpg`;

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl bg-bg-surface flex items-center justify-center select-none shadow-inner',
        aspectStyles[aspectRatio],
        className
      )}
    >
      {/* Base layer: Warm pastel gradient + emoji badge */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300',
          gradient,
          imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'
        )}
      >
        <span className="text-4xl sm:text-5xl drop-shadow-sm select-none" role="img" aria-label={title}>
          {emoji}
        </span>
        <span className="text-xs text-text-secondary mt-1 font-medium font-sans">
          {title}
        </span>
      </div>

      {/* Primary food photography */}
      {!imageError && (
        <img
          src={resolvedSrc}
          alt={`Freshly prepared ${title}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  );
}
