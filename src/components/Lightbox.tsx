import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { MediaAsset } from '../types/portfolio';

export interface LightboxItem extends MediaAsset {
  sectionLabel?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({ items, activeIndex, onClose, onChangeIndex }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);

  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const current = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    setZoomed(false);
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && items.length > 1) {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight' && items.length > 1) {
        onChangeIndex((activeIndex + 1) % items.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onChangeIndex]);

  if (!isOpen || !current || activeIndex === null) return null;

  const handlePrev = () => {
    onChangeIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    onChangeIndex((activeIndex + 1) % items.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141412]/95 text-paper flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={current.captionEn || current.alt}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 h-16 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 text-xs text-white/75 min-w-0">
          {current.sectionLabel && (
            <>
              <span className="font-medium text-white whitespace-nowrap">{current.sectionLabel}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span className="font-mono tabular-nums whitespace-nowrap">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
          >
            {zoomed ? (
              <>
                <ZoomOut className="w-4 h-4" strokeWidth={1.5} />
                <span>Fit View</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-4 h-4" strokeWidth={1.5} />
                <span>Inspect 100%</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="inline-flex items-center justify-center w-11 h-11 text-white/85 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Media Stage */}
      <div className="relative flex-1 overflow-auto flex items-center justify-center p-4 sm:p-10">
        {items.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white border border-white/15 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
        )}

        <div
          className={
            zoomed
              ? 'max-w-none cursor-zoom-out'
              : 'max-w-5xl max-h-[72vh] flex items-center justify-center cursor-zoom-in'
          }
          onClick={() => setZoomed((z) => !z)}
        >
          <img
            src={current.src}
            alt={current.alt}
            referrerPolicy="no-referrer"
            className={
              zoomed
                ? 'w-auto max-w-[1600px] h-auto object-contain'
                : 'max-h-[72vh] w-auto max-w-full object-contain'
            }
          />
        </div>

        {items.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white border border-white/15 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Caption & Credit Footer */}
      <div className="border-t border-white/10 px-5 sm:px-8 py-4 shrink-0 bg-[#141412]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-sm text-white">{current.captionEn}</p>
            <p className="text-xs text-white/65 mt-0.5">{current.captionKr}</p>
          </div>
          <p className="text-xs text-white/65 whitespace-nowrap shrink-0">
            Credit: {current.credit}
          </p>
        </div>
      </div>
    </div>
  );
}
