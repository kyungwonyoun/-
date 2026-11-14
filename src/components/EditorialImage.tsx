import { useState } from 'react';
import { Expand, ImageOff } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '3/4' | 'auto';
  className?: string;
  imgClassName?: string;
  onOpenLightbox?: () => void;
  lightboxLabel?: string;
  priority?: boolean;
}

const ASPECT_CLASSES: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  auto: '',
};

export function EditorialImage({
  src,
  alt,
  aspectRatio = '4/3',
  className = '',
  imgClassName = '',
  onOpenLightbox,
  lightboxLabel = 'Inspect image',
  priority = false,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  const aspectClass = ASPECT_CLASSES[aspectRatio] ?? '';

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-surface border border-ink/10 flex flex-col items-center justify-center p-6 text-center ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-6 h-6 text-stone/60 mb-2" strokeWidth={1.5} />
        <p className="text-xs text-stone max-w-xs">{alt}</p>
      </div>
    );
  }

  if (onOpenLightbox) {
    return (
      <div className={`group relative w-full overflow-hidden bg-surface ${aspectClass} ${className}`}>
        <button
          type="button"
          onClick={onOpenLightbox}
          aria-label={lightboxLabel}
          className="block w-full h-full cursor-pointer text-left"
        >
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] ${imgClassName}`}
          />
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-paper/90 text-ink text-xs font-medium opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 border border-ink/10">
            <Expand className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>View</span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-surface ${aspectClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
