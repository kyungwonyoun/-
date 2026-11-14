import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { OTHER_WORKS } from '../data/otherWorks';
import { OtherWork, OtherWorkCategory } from '../types/portfolio';
import { EditorialImage } from '../components/EditorialImage';
import { LightboxItem } from '../components/Lightbox';

interface OtherWorksPageProps {
  onOpenLightbox: (items: LightboxItem[], index: number) => void;
}

const CATEGORIES: ('All' | OtherWorkCategory)[] = [
  'All',
  'Indoor Styling',
  'Spatial Curation',
  'Publications',
];

export function OtherWorksPage({ onOpenLightbox }: OtherWorksPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | OtherWorkCategory>('All');
  const [activeArticle, setActiveArticle] = useState<OtherWork | null>(null);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return OTHER_WORKS;
    return OTHER_WORKS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (!activeArticle) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeArticle]);

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-10">
      {/* Header */}
      <div className="pb-10 border-b border-ink/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-stone">
            Botanical Styling, Exhibitions & Writing
          </p>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-ink mt-2">
            Other Works
          </h1>
          <p className="text-sm sm:text-base text-stone mt-2 max-w-2xl">
            실내 정원 스타일링, 전시 공간 디렉팅, 정원·조경 관련 잡지 기고 및 에세이 아카이브입니다.
          </p>
        </div>

        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface shrink-0">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active ? 'bg-paper text-ink shadow-xs' : 'text-stone hover:text-ink'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 pt-12">
        {filtered.map((work) => (
          <article key={work.id} className="flex flex-col border-b border-ink/10 pb-10">
            <EditorialImage
              src={work.image.src}
              alt={work.image.alt}
              aspectRatio="4/3"
              lightboxLabel={`Inspect ${work.titleEn}`}
              onOpenLightbox={() =>
                onOpenLightbox(
                  [
                    {
                      ...work.image,
                      sectionLabel: work.category,
                    },
                  ],
                  0
                )
              }
            />

            <div className="pt-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone tabular-nums">
                  <span className="font-mono text-ink/70">{work.indexNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{work.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{work.year}</span>
                </div>

                <h2 className="text-xl font-medium tracking-tight text-ink mt-2">
                  {work.titleEn}
                </h2>
                <p className="text-xs sm:text-sm text-stone mt-0.5">{work.titleKr}</p>

                <p className="text-sm text-ink/80 leading-relaxed mt-3">
                  {work.summaryEn}
                </p>
                <p className="text-xs text-stone leading-relaxed mt-1.5">
                  {work.summaryKr}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between gap-4 text-xs">
                <span className="text-stone truncate">{work.clientOrVenue}</span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(work)}
                  className="inline-flex items-center gap-1.5 font-medium text-moss hover:underline cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Read Note</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Editorial Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeArticle.titleEn}
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-paper border border-ink/15 max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-10 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-ink/10">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone tabular-nums">
                  <span>{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.year}</span>
                </div>
                <h3 className="text-2xl font-medium text-ink mt-1.5">
                  {activeArticle.titleEn}
                </h3>
                <p className="text-sm text-stone mt-0.5">{activeArticle.titleKr}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close reader"
                className="w-10 h-10 flex items-center justify-center text-stone hover:text-ink hover:bg-surface transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <EditorialImage
              src={activeArticle.image.src}
              alt={activeArticle.image.alt}
              aspectRatio="4/3"
            />

            <div className="space-y-4 text-sm sm:text-base text-ink/85 leading-relaxed">
              {activeArticle.detailsEn.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-ink/10 space-y-3 text-sm text-stone leading-relaxed">
              {activeArticle.detailsKr.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone">
              <span>{activeArticle.clientOrVenue}</span>
              <span>{activeArticle.credits}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
