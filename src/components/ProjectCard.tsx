import { ArrowUpRight } from 'lucide-react';
import { Project, RoutePath } from '../types/portfolio';
import { EditorialImage } from './EditorialImage';

interface ProjectCardProps {
  project: Project;
  onNavigate: (path: RoutePath) => void;
  featuredWide?: boolean;
}

export function ProjectCard({ project, onNavigate, featuredWide = false }: ProjectCardProps) {
  const handleClick = () => {
    onNavigate(`/projects/${project.slug}`);
  };

  return (
    <article className="group flex flex-col">
      <a
        href={`/projects/${project.slug}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        className="block focus-visible:outline-2 focus-visible:outline-moss"
      >
        <EditorialImage
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          aspectRatio={featuredWide ? '16/9' : '4/3'}
          imgClassName="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
        />

        <div className="pt-4">
          {/* Quiet unboxed metadata line */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone tabular-nums">
            <span className="font-mono text-ink/70">{project.indexNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.locationEn}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          {/* Bilingual Title */}
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-ink group-hover:text-moss transition-colors">
                {project.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-stone mt-0.5">{project.titleKr}</p>
            </div>
            <ArrowUpRight
              className="w-4 h-4 text-stone/60 shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-moss"
              strokeWidth={1.5}
            />
          </div>

          {/* Summary */}
          <p className="mt-2.5 text-sm text-stone leading-relaxed line-clamp-2">
            {project.summaryEn}
          </p>

          {/* Explicit Scope vs My Role Attribution */}
          <div className="mt-4 pt-3 border-t border-ink/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-stone block">Project Scope</span>
              <span className="text-ink/80 font-medium">
                {project.projectScope.join(' · ')}
              </span>
            </div>
            <div>
              <span className="text-stone block">My Role</span>
              <span className="text-moss font-semibold">
                {project.myRole.join(' · ')}
              </span>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
