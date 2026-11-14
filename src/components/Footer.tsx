import { DESIGNER_PROFILE } from '../data/profile';
import { RoutePath } from '../types/portfolio';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-ink/10 bg-paper mt-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-ink/10">
          <div className="md:col-span-5 space-y-3">
            <p className="text-sm font-semibold tracking-[0.04em] text-ink">
              {DESIGNER_PROFILE.name}
            </p>
            <p className="text-xs tracking-[0.08em] text-stone uppercase">
              {DESIGNER_PROFILE.title} · {DESIGNER_PROFILE.locationEn}
            </p>
            <p className="text-sm text-stone max-w-sm leading-relaxed pt-1">
              {DESIGNER_PROFILE.philosophy.headlineEn}
              <span className="block text-xs text-stone/80 mt-1">
                {DESIGNER_PROFILE.philosophy.headlineKr}
              </span>
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <p className="text-xs font-medium tracking-wider uppercase text-stone mb-3">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {(
                [
                  { label: 'Home', path: '/' },
                  { label: 'About', path: '/about' },
                  { label: 'Projects (10)', path: '/projects' },
                  { label: 'Other Works', path: '/other-works' },
                  { label: 'Contact', path: '/contact' },
                ] as { label: string; path: RoutePath }[]
              ).map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    className="text-ink/80 hover:text-moss transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-medium tracking-wider uppercase text-stone">
              Direct Contact
            </p>
            <a
              href={`mailto:${DESIGNER_PROFILE.email}`}
              className="block text-sm font-medium text-ink hover:text-moss transition-colors"
            >
              {DESIGNER_PROFILE.email}
            </a>
            <a
              href={DESIGNER_PROFILE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-ink/80 hover:text-moss transition-colors"
            >
              Instagram · {DESIGNER_PROFILE.instagram.handle}
            </a>
            <p className="text-xs text-stone leading-relaxed pt-2">
              {DESIGNER_PROFILE.futurePracticeNote.noteEn}
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone">
          <p>© {new Date().getFullYear()} {DESIGNER_PROFILE.name}. All rights reserved.</p>
          <p>Sample Prototype v0.1 · Individual role & studio scope explicitly distinguished.</p>
        </div>
      </div>
    </footer>
  );
}
