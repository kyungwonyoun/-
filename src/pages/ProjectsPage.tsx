import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { ProjectCategory, RoutePath, WorkScope } from '../types/portfolio';
import { ProjectCard } from '../components/ProjectCard';

interface ProjectsPageProps {
  onNavigate: (path: RoutePath) => void;
}

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Residential',
  'Commercial',
  'Indoor',
  'Maintenance',
];

const SCOPES: ('All' | WorkScope)[] = ['All', 'Design', 'Construction', 'Maintenance'];

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedRoleScope, setSelectedRoleScope] = useState<'All' | WorkScope>('All');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const categoryMatch =
        selectedCategory === 'All' || project.category === selectedCategory;
      const roleMatch =
        selectedRoleScope === 'All' || project.myRole.includes(selectedRoleScope);
      return categoryMatch && roleMatch;
    });
  }, [selectedCategory, selectedRoleScope]);

  const hasActiveFilter = selectedCategory !== 'All' || selectedRoleScope !== 'All';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedRoleScope('All');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-10">
      {/* Page Title */}
      <div className="pb-10 border-b border-ink/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-stone">
            Built & Maintained Archive
          </p>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-ink mt-2">
            Projects
          </h1>
          <p className="text-sm sm:text-base text-stone mt-2 max-w-2xl">
            실제 수행 프로젝트 10선(샘플 구성). 프로젝트 전체 수행 범위(Project Scope)와 본인의 실제 담당 업무(My Role)를 구분하여 기록했습니다.
          </p>
        </div>

        <div className="text-xs text-stone font-mono tabular-nums shrink-0">
          Showing {String(filteredProjects.length).padStart(2, '0')} of{' '}
          {String(PROJECTS.length).padStart(2, '0')} projects
        </div>
      </div>

      {/* Filter Controls */}
      <div className="py-6 border-b border-ink/10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-stone mr-2 whitespace-nowrap">
            Typology:
          </span>
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-paper text-ink shadow-xs'
                      : 'text-stone hover:text-ink'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* My Role Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-stone mr-2 whitespace-nowrap">
            My Role:
          </span>
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface">
            {SCOPES.map((scope) => {
              const active = selectedRoleScope === scope;
              return (
                <button
                  key={scope}
                  type="button"
                  onClick={() => setSelectedRoleScope(scope)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-moss text-paper'
                      : 'text-stone hover:text-ink'
                  }`}
                >
                  {scope === 'All' ? 'All Roles' : scope}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 pt-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 border-b border-ink/10">
          <p className="text-base font-medium text-ink">
            No projects match the selected typology and role combination.
          </p>
          <p className="text-sm text-stone">
            선택한 조건({selectedCategory} · {selectedRoleScope})에 해당하는 프로젝트가 없습니다.
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 text-xs font-medium text-ink hover:border-moss hover:text-moss transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
