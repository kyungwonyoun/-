/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Lightbox, LightboxItem } from './components/Lightbox';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { OtherWorksPage } from './pages/OtherWorksPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { RoutePath } from './types/portfolio';

function normalizePath(pathname: string): RoutePath {
  if (!pathname || pathname === '/') return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  if (
    trimmed === '/about' ||
    trimmed === '/projects' ||
    trimmed === '/other-works' ||
    trimmed === '/contact' ||
    trimmed.startsWith('/projects/')
  ) {
    return trimmed as RoutePath;
  }
  return '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    normalizePath(window.location.pathname)
  );
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: RoutePath) => {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openLightbox = useCallback((items: LightboxItem[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const renderPage = () => {
    if (currentPath === '/') {
      return <HomePage onNavigate={navigate} onOpenLightbox={openLightbox} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} onOpenLightbox={openLightbox} />;
    }
    if (currentPath === '/projects') {
      return <ProjectsPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '');
      return (
        <ProjectDetailPage
          slug={slug}
          onNavigate={navigate}
          onOpenLightbox={openLightbox}
        />
      );
    }
    if (currentPath === '/other-works') {
      return <OtherWorksPage onOpenLightbox={openLightbox} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    return <HomePage onNavigate={navigate} onOpenLightbox={openLightbox} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-moss selection:text-paper">
      <Header currentPath={currentPath} onNavigate={navigate} />

      <main className="flex-1">{renderPage()}</main>

      <Footer onNavigate={navigate} />

      <Lightbox
        items={lightboxItems}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onChangeIndex={setLightboxIndex}
      />
    </div>
  );
}
