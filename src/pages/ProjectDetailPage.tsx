import { useMemo } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { RoutePath } from '../types/portfolio';
import { EditorialImage } from '../components/EditorialImage';
import { LightboxItem } from '../components/Lightbox';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: RoutePath) => void;
  onOpenLightbox: (items: LightboxItem[], index: number) => void;
}

export function ProjectDetailPage({
  slug,
  onNavigate,
  onOpenLightbox,
}: ProjectDetailPageProps) {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = currentIndex >= 0 ? PROJECTS[currentIndex] : null;

  const prevProject =
    currentIndex >= 0
      ? PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length]
      : null;
  const nextProject =
    currentIndex >= 0 ? PROJECTS[(currentIndex + 1) % PROJECTS.length] : null;

  // Assemble unified lightbox gallery for this project
  const galleryItems = useMemo<LightboxItem[]>(() => {
    if (!project) return [];
    const items: LightboxItem[] = [
      { ...project.heroImage, sectionLabel: 'Main View' },
    ];
    project.designDrawings?.forEach((img) =>
      items.push({ ...img, sectionLabel: 'Design Drawing & Planting Plan' })
    );
    project.renderings?.forEach((img) =>
      items.push({ ...img, sectionLabel: '3D Visualization' })
    );
    project.constructionImages?.forEach((img) =>
      items.push({ ...img, sectionLabel: 'Construction Process' })
    );
    project.completedGallery?.forEach((img) =>
      items.push({ ...img, sectionLabel: 'Completed View' })
    );
    return items;
  }, [project]);

  const openMediaById = (mediaId: string) => {
    const idx = galleryItems.findIndex((item) => item.id === mediaId);
    onOpenLightbox(galleryItems, idx >= 0 ? idx : 0);
  };

  if (!project) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-24 text-center space-y-4">
        <h1 className="text-2xl font-medium text-ink">Project not found</h1>
        <p className="text-sm text-stone">요청하신 프로젝트를 찾을 수 없습니다.</p>
        <button
          type="button"
          onClick={() => onNavigate('/projects')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-sm font-medium hover:bg-moss transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Back to Projects</span>
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-10">
      {/* Breadcrumb Back Navigation */}
      <div className="pb-6">
        <a
          href="/projects"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/projects');
          }}
          className="inline-flex items-center gap-2 text-xs font-medium text-stone hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>All Projects</span>
          <span aria-hidden="true">/</span>
          <span className="text-ink">{project.indexNumber}</span>
        </a>
      </div>

      {/* 1. Hero Visual */}
      <EditorialImage
        src={project.heroImage.src}
        alt={project.heroImage.alt}
        aspectRatio="16/9"
        priority
        lightboxLabel={`Inspect ${project.titleEn} hero photograph`}
        onOpenLightbox={() => openMediaById(project.heroImage.id)}
      />

      {/* 2. Title & Metadata Header */}
      <header className="pt-8 pb-10 border-b border-ink/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone tabular-nums">
            <span className="font-mono text-ink/70">{project.indexNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.locationEn}</span>
            <span aria-hidden="true">·</span>
            <span>{project.period}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-ink">
            {project.titleEn}
          </h1>
          <p className="text-base sm:text-lg text-stone">{project.titleKr}</p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-4 lg:pt-0 border-t lg:border-t-0 border-ink/10">
          <div>
            <span className="text-stone block">Location</span>
            <span className="text-ink font-medium mt-0.5 block">{project.locationKr}</span>
          </div>
          {project.areaSqm && (
            <div>
              <span className="text-stone block">Site Area</span>
              <span className="text-ink font-medium font-mono tabular-nums mt-0.5 block">
                {project.areaSqm}
              </span>
            </div>
          )}
          <div>
            <span className="text-stone block">Period</span>
            <span className="text-ink font-medium font-mono tabular-nums mt-0.5 block">
              {project.period}
            </span>
          </div>
        </div>
      </header>

      {/* 3. Explicit Attribution Split: Studio Project Scope vs. My Role & Contribution */}
      <section className="py-12 border-b border-ink/10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Project Overview & Company Full Scope */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
              Project Overview & Full Scope
            </p>
            <div className="mt-3 p-5 bg-surface/60 border border-ink/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-stone">Studio / Company</span>
                <span className="font-medium text-ink">{project.company}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-2 border-t border-ink/10">
                <span className="text-stone">Project Total Scope</span>
                <span className="font-medium text-ink">
                  {project.projectScope.join(' · ')}
                </span>
              </div>
              {project.companyNoteEn && (
                <p className="text-xs text-stone pt-2 border-t border-ink/10">
                  {project.companyNoteEn}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-ink/85 leading-relaxed">
            {project.descriptionEn.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="space-y-3 text-sm text-stone leading-relaxed pt-2 border-t border-ink/10">
            {project.descriptionKr.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        {/* Right: My Actual Contribution */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 bg-paper border border-moss/25 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-ink/10">
              <div>
                <p className="text-xs font-medium tracking-[0.12em] uppercase text-moss">
                  My Role & Contribution
                </p>
                <p className="text-xs text-stone mt-0.5">본인 실제 담당 업무 및 기여 범위</p>
              </div>
              <span className="text-sm font-semibold text-moss">
                {project.myRole.join(' · ')}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium text-stone uppercase tracking-wider">
                Responsibilities (EN)
              </p>
              <ul className="space-y-2.5">
                {project.myResponsibilitiesEn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="w-4 h-4 text-moss shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-ink/10 space-y-2.5">
              <p className="text-xs font-medium text-stone uppercase tracking-wider">
                담당 실무 (KR)
              </p>
              <ul className="space-y-2">
                {project.myResponsibilitiesKr.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-stone leading-relaxed">
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Conditional Modular Asset Sections (Only rendered when assets exist) */}
      <div className="divide-y divide-ink/10">
        {project.designDrawings && project.designDrawings.length > 0 && (
          <section className="py-14 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
                  Design Documentation
                </p>
                <h2 className="text-xl sm:text-2xl font-medium text-ink mt-1">
                  Drawings & Planting Plan
                </h2>
              </div>
              <p className="text-xs text-stone">Click image to inspect plan details at 100% scale</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.designDrawings.map((drawing) => (
                <figure key={drawing.id} className="space-y-2.5">
                  <EditorialImage
                    src={drawing.src}
                    alt={drawing.alt}
                    aspectRatio={drawing.aspectRatio || '4/3'}
                    lightboxLabel={`Inspect ${drawing.captionEn}`}
                    onOpenLightbox={() => openMediaById(drawing.id)}
                  />
                  <figcaption className="text-xs text-stone">
                    <span className="text-ink">{drawing.captionEn}</span>
                    <span className="block mt-0.5">{drawing.captionKr}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.renderings && project.renderings.length > 0 && (
          <section className="py-14 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
                Spatial Study
              </p>
              <h2 className="text-xl sm:text-2xl font-medium text-ink mt-1">
                3D Visualization
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.renderings.map((render) => (
                <figure key={render.id} className="space-y-2.5">
                  <EditorialImage
                    src={render.src}
                    alt={render.alt}
                    aspectRatio={render.aspectRatio || '4/3'}
                    lightboxLabel={`Inspect ${render.captionEn}`}
                    onOpenLightbox={() => openMediaById(render.id)}
                  />
                  <figcaption className="text-xs text-stone">
                    <span className="text-ink">{render.captionEn}</span>
                    <span className="block mt-0.5">{render.captionKr}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.constructionImages && project.constructionImages.length > 0 && (
          <section className="py-14 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
                Site Execution
              </p>
              <h2 className="text-xl sm:text-2xl font-medium text-ink mt-1">
                Construction Process
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.constructionImages.map((img) => (
                <figure key={img.id} className="space-y-2.5">
                  <EditorialImage
                    src={img.src}
                    alt={img.alt}
                    aspectRatio={img.aspectRatio || '4/3'}
                    lightboxLabel={`Inspect ${img.captionEn}`}
                    onOpenLightbox={() => openMediaById(img.id)}
                  />
                  <figcaption className="text-xs text-stone">
                    <span className="text-ink">{img.captionEn}</span>
                    <span className="block mt-0.5">{img.captionKr}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.completedGallery && project.completedGallery.length > 0 && (
          <section className="py-14 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
                Built Outcome
              </p>
              <h2 className="text-xl sm:text-2xl font-medium text-ink mt-1">
                Completed Garden Views
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {project.completedGallery.map((img) => (
                <figure key={img.id} className="space-y-2.5">
                  <EditorialImage
                    src={img.src}
                    alt={img.alt}
                    aspectRatio={img.aspectRatio || '16/9'}
                    lightboxLabel={`Inspect ${img.captionEn}`}
                    onOpenLightbox={() => openMediaById(img.id)}
                  />
                  <figcaption className="text-xs text-stone flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span>
                      <strong className="font-normal text-ink">{img.captionEn}</strong> · {img.captionKr}
                    </span>
                    <span>Credit: {img.credit}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.maintenanceLogs && project.maintenanceLogs.length > 0 && (
          <section className="py-14 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
                Horticultural Stewardship
              </p>
              <h2 className="text-xl sm:text-2xl font-medium text-ink mt-1">
                Maintenance & Seasonal Care Log
              </h2>
            </div>

            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {project.maintenanceLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
                >
                  <div className="md:col-span-3 font-mono text-xs text-stone tabular-nums">
                    {log.year} · {log.season}
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-sm font-medium text-ink">{log.focusEn}</p>
                    <p className="text-xs text-stone mt-0.5">{log.focusKr}</p>
                  </div>
                  <div className="md:col-span-5 text-sm text-ink/80 leading-relaxed">
                    {log.notesEn}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 5. Credits & Rights Block */}
      <section className="mt-8 p-6 bg-surface/60 border border-ink/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div>
          <span className="text-stone block">Photography / Image Credit</span>
          <span className="text-ink font-medium mt-1 block">{project.credits.photography}</span>
        </div>
        <div>
          <span className="text-stone block">Project by</span>
          <span className="text-ink font-medium mt-1 block">{project.credits.projectBy}</span>
        </div>
        <div>
          <span className="text-stone block">My Role</span>
          <span className="text-moss font-semibold mt-1 block">{project.credits.roleSummary}</span>
        </div>
      </section>

      {/* 6. Previous / Next Project Navigation */}
      {prevProject && nextProject && (
        <nav
          aria-label="Project Pagination"
          className="mt-16 pt-8 border-t border-ink/10 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <a
            href={`/projects/${prevProject.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/projects/${prevProject.slug}`);
            }}
            className="group p-4 border border-ink/10 hover:border-moss/40 transition-colors flex items-center gap-4"
          >
            <ArrowLeft
              className="w-4 h-4 text-stone group-hover:text-moss transition-colors shrink-0"
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <span className="text-xs text-stone block">Previous Project</span>
              <span className="text-sm font-medium text-ink group-hover:text-moss transition-colors truncate block">
                {prevProject.indexNumber} · {prevProject.titleEn}
              </span>
            </div>
          </a>

          <a
            href={`/projects/${nextProject.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/projects/${nextProject.slug}`);
            }}
            className="group p-4 border border-ink/10 hover:border-moss/40 transition-colors flex items-center justify-end gap-4 text-right"
          >
            <div className="min-w-0">
              <span className="text-xs text-stone block">Next Project</span>
              <span className="text-sm font-medium text-ink group-hover:text-moss transition-colors truncate block">
                {nextProject.indexNumber} · {nextProject.titleEn}
              </span>
            </div>
            <ArrowRight
              className="w-4 h-4 text-stone group-hover:text-moss transition-colors shrink-0"
              strokeWidth={1.5}
            />
          </a>
        </nav>
      )}
    </article>
  );
}
