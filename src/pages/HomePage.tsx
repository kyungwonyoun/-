import { ArrowRight } from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/profile';
import { FEATURED_PROJECTS, PROJECTS } from '../data/projects';
import { RoutePath } from '../types/portfolio';
import { EditorialImage } from '../components/EditorialImage';
import { ProjectCard } from '../components/ProjectCard';
import { LightboxItem } from '../components/Lightbox';

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
  onOpenLightbox: (items: LightboxItem[], index: number) => void;
}

export function HomePage({ onNavigate, onOpenLightbox }: HomePageProps) {
  return (
    <div>
      {/* Hero Section: Representative Architectural Garden Visual + Philosophy */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-8 sm:pb-10">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-stone">
              {DESIGNER_PROFILE.title} · {DESIGNER_PROFILE.locationEn}
            </p>
            <h1 className="text-[clamp(2.15rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-tight text-ink">
              {DESIGNER_PROFILE.philosophy.headlineEn}
            </h1>
            <p className="text-sm sm:text-base text-stone leading-relaxed max-w-xl">
              {DESIGNER_PROFILE.philosophy.headlineKr}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end justify-end gap-5">
            <p className="text-sm text-stone leading-relaxed max-w-md lg:text-right">
              {DESIGNER_PROFILE.philosophy.leadEn}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-moss text-paper text-sm font-medium hover:bg-moss-hover transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/about');
                }}
                className="text-sm font-medium text-ink hover:text-moss border-b border-ink/30 hover:border-moss pb-0.5 transition-colors whitespace-nowrap"
              >
                About Practice
              </a>
            </div>
          </div>
        </div>

        {/* Full-Width Architectural Hero Image */}
        <div className="relative">
          <EditorialImage
            src={DESIGNER_PROFILE.heroVisual.src}
            alt={DESIGNER_PROFILE.heroVisual.alt}
            aspectRatio="16/9"
            priority
            lightboxLabel="Inspect featured courtyard garden photograph"
            onOpenLightbox={() =>
              onOpenLightbox(
                [
                  {
                    id: 'hero-main',
                    src: DESIGNER_PROFILE.heroVisual.src,
                    alt: DESIGNER_PROFILE.heroVisual.alt,
                    captionEn: 'Architectural residential courtyard framing hornbeams, limestone paving, and grasses.',
                    captionKr: '다간 서어나무와 석회석 포장, 그라스류가 어우러진 주택 중정 전경.',
                    credit: DESIGNER_PROFILE.heroVisual.credit,
                    sectionLabel: 'Featured Visual',
                  },
                ],
                0
              )
            }
          />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone">
            <span>Selected Residential Courtyard Archive · Seoul</span>
            <span>Credit: {DESIGNER_PROFILE.heroVisual.credit}</span>
          </div>
        </div>
      </section>

      {/* Editorial Capabilities & Attribution Principle Strip */}
      <section className="border-y border-ink/10 bg-surface/50">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 space-y-2">
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
                Practice Standard
              </p>
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-ink">
                Built works with transparent authorship.
              </h2>
              <p className="text-xs text-stone">
                실제 수행 프로젝트와 개인 담당 업무의 명확한 구분
              </p>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {DESIGNER_PROFILE.capabilities.map((cap) => (
                <div key={cap.number} className="space-y-2">
                  <span className="font-mono text-xs text-moss tabular-nums">{cap.number}.</span>
                  <h3 className="text-sm font-semibold text-ink">{cap.titleEn}</h3>
                  <p className="text-xs text-stone leading-relaxed">{cap.descriptionEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Projects Grid */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-20 sm:pt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-ink/10">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              Selected Works
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-ink mt-1">
              Featured Projects
            </h2>
            <p className="text-sm text-stone mt-1">
              주요 수행 프로젝트 미리보기 · 총 {PROJECTS.length}건 중 대표 4건
            </p>
          </div>

          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/projects');
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-moss transition-colors whitespace-nowrap shrink-0"
          >
            <span>View All {PROJECTS.length} Projects</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pt-10">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* About & Philosophy Editorial Split */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-24 sm:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-t border-ink/10 pt-16">
          <div className="lg:col-span-5">
            <EditorialImage
              src={DESIGNER_PROFILE.portrait.src}
              alt={DESIGNER_PROFILE.portrait.alt}
              aspectRatio="3/4"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              About the Designer
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl leading-snug text-ink italic font-normal">
              “Gardens mature slowly. Designing them requires listening to soil, shadow, and daily human life.”
            </h2>
            <p className="text-sm sm:text-base text-stone leading-relaxed">
              {DESIGNER_PROFILE.bioEn[0]} {DESIGNER_PROFILE.bioEn[2]}
            </p>
            <p className="text-sm text-stone/90 leading-relaxed">
              {DESIGNER_PROFILE.bioKr[0]}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/25 text-sm font-medium text-ink hover:border-moss hover:text-moss transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Read Full Profile & Career</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="text-sm font-medium text-moss hover:underline whitespace-nowrap"
              >
                Inquire for a Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
