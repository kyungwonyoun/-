import { ArrowRight } from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/profile';
import { RoutePath } from '../types/portfolio';
import { EditorialImage } from '../components/EditorialImage';
import { LightboxItem } from '../components/Lightbox';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
  onOpenLightbox: (items: LightboxItem[], index: number) => void;
}

export function AboutPage({ onNavigate, onOpenLightbox }: AboutPageProps) {
  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-10">
      {/* Header */}
      <div className="pb-10 border-b border-ink/10">
        <p className="text-xs font-medium tracking-[0.14em] uppercase text-stone">
          Profile & Philosophy
        </p>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-ink mt-2">
          {DESIGNER_PROFILE.name}
        </h1>
        <p className="text-sm sm:text-base text-stone mt-2">
          {DESIGNER_PROFILE.title} · {DESIGNER_PROFILE.locationEn} ({DESIGNER_PROFILE.locationKr})
        </p>
      </div>

      {/* Portrait & Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-12 items-start">
        <div className="lg:col-span-5">
          <EditorialImage
            src={DESIGNER_PROFILE.portrait.src}
            alt={DESIGNER_PROFILE.portrait.alt}
            aspectRatio="3/4"
            priority
            lightboxLabel="View designer portrait"
            onOpenLightbox={() =>
              onOpenLightbox(
                [
                  {
                    id: 'about-portrait',
                    src: DESIGNER_PROFILE.portrait.src,
                    alt: DESIGNER_PROFILE.portrait.alt,
                    captionEn: `${DESIGNER_PROFILE.name} — ${DESIGNER_PROFILE.title}`,
                    captionKr: '정원에서 식재를 돌보고 있는 가든 디자이너 윤경원 (샘플 프로필 이미지)',
                    credit: DESIGNER_PROFILE.portrait.credit,
                    sectionLabel: 'Garden Portrait',
                  },
                ],
                0
              )
            }
          />
          <p className="mt-2.5 text-xs text-stone">
            Credit: {DESIGNER_PROFILE.portrait.credit}
          </p>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-ink">
              {DESIGNER_PROFILE.philosophy.headlineEn}
            </h2>
            <p className="text-sm text-moss font-medium">
              {DESIGNER_PROFILE.philosophy.headlineKr}
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-ink/85 leading-relaxed">
            {DESIGNER_PROFILE.bioEn.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-ink/10 space-y-3 text-sm text-stone leading-relaxed">
            {DESIGNER_PROFILE.bioKr.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Core Capabilities */}
      <section className="mt-20 pt-14 border-t border-ink/10">
        <div className="mb-8">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
            Areas of Practice
          </p>
          <h2 className="text-2xl font-medium tracking-tight text-ink mt-1">
            Scope of Work & Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DESIGNER_PROFILE.capabilities.map((cap) => (
            <div key={cap.number} className="p-6 bg-surface/60 border border-ink/10 space-y-3">
              <span className="font-mono text-xs text-moss tabular-nums">{cap.number}</span>
              <div>
                <h3 className="text-base font-semibold text-ink">{cap.titleEn}</h3>
                <p className="text-xs text-stone mt-0.5">{cap.titleKr}</p>
              </div>
              <p className="text-sm text-ink/80 leading-relaxed">{cap.descriptionEn}</p>
              <p className="text-xs text-stone leading-relaxed pt-2 border-t border-ink/10">
                {cap.descriptionKr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Timeline */}
      <section className="mt-20 pt-14 border-t border-ink/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              Background
            </p>
            <h2 className="text-2xl font-medium tracking-tight text-ink mt-1">
              Career & Experience
            </h2>
            <p className="text-xs text-stone mt-1">
              경력 및 주요 이력 (초기 시안용 샘플 데이터 — 추후 실제 이력 반영)
            </p>
          </div>
        </div>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {DESIGNER_PROFILE.career.map((entry, idx) => (
            <div
              key={idx}
              className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              <div className="md:col-span-3 font-mono text-xs sm:text-sm text-stone tabular-nums">
                {entry.period}
              </div>
              <div className="md:col-span-5 space-y-1">
                <h3 className="text-base font-medium text-ink">{entry.roleEn}</h3>
                <p className="text-xs text-stone">{entry.roleKr}</p>
                <p className="text-xs font-medium text-moss pt-1">{entry.organization}</p>
              </div>
              <div className="md:col-span-4 space-y-1">
                <p className="text-sm text-ink/80 leading-relaxed">{entry.focusEn}</p>
                <p className="text-xs text-stone leading-relaxed">{entry.focusKr}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Attribution Principle & Future Practice Note */}
      <section className="mt-20 pt-14 border-t border-ink/10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
            Portfolio Transparency
          </p>
          <h3 className="text-lg font-medium text-ink">
            Distinguishing Studio Scope from Individual Role
          </h3>
          <p className="text-sm text-stone leading-relaxed">
            Projects completed during employment at previous landscape studios clearly identify the
            employing company, the project’s full scope, and my specific hands-on responsibilities
            (e.g., planting plan, CAD documentation, site supervision, or maintenance). Unverified
            images or speculative competition entries are excluded.
          </p>
        </div>

        <div className="p-6 bg-surface/60 border border-ink/10 space-y-3">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
            Future Direction · {DESIGNER_PROFILE.futurePracticeNote.brandName}
          </p>
          <p className="text-sm text-ink/85 leading-relaxed">
            {DESIGNER_PROFILE.futurePracticeNote.noteEn}
          </p>
          <p className="text-xs text-stone leading-relaxed">
            {DESIGNER_PROFILE.futurePracticeNote.noteKr}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/projects')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-moss hover:underline cursor-pointer"
            >
              <span>Browse Built Projects</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
