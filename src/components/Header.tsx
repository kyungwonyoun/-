import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RoutePath } from '../types/portfolio';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

const NAV_ITEMS: { label: string; path: RoutePath }[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Other Works', path: '/other-works' },
];

export function Header({ currentPath, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: RoutePath) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const handleLinkClick = (path: RoutePath) => {
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="text-base sm:text-lg font-semibold tracking-[0.04em] text-ink whitespace-nowrap shrink-0"
        >
          KYUNGWON YOUN
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-stone"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.path);
                }}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  active ? 'text-ink' : 'text-stone hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-moss transition-transform duration-200 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('/contact')}
            className={`hidden md:inline-flex items-center justify-center px-5 py-2 text-xs font-medium tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
              isActive('/contact')
                ? 'bg-moss text-paper'
                : 'bg-ink text-paper hover:bg-moss'
            }`}
          >
            Contact
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-ink hover:bg-surface transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-ink/10 bg-paper px-5 py-4 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.path);
                }}
                className={`flex items-center justify-between min-h-[44px] px-2 text-base font-medium transition-colors ${
                  active ? 'text-moss' : 'text-ink hover:text-moss'
                }`}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-ink/10">
            <button
              type="button"
              onClick={() => handleLinkClick('/contact')}
              className="w-full min-h-[44px] bg-ink text-paper text-sm font-medium hover:bg-moss transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
