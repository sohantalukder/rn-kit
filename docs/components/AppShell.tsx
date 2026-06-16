'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { packageInfo } from '../data/componentRegistry';
import { docPages } from '../data/docsContent';
import { SearchDialog } from './SearchDialog';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';

export type TocItem = {
  id: string;
  title: string;
};

type AppShellProps = {
  children: React.ReactNode;
};

const homeToc = [
  { id: 'overview', title: 'Overview' },
  { id: 'quick-start', title: 'Quick start' },
  { id: 'explore', title: 'Explore' },
];

const componentsToc = [
  { id: 'overview', title: 'Overview' },
  { id: 'library', title: 'Library' },
];

const iconsToc = [
  { id: 'overview', title: 'Overview' },
  { id: 'usage', title: 'Usage' },
  { id: 'library', title: 'Library' },
];

const componentDetailToc = [
  { id: 'preview', title: 'Preview' },
  { id: 'usage', title: 'Usage' },
  { id: 'props', title: 'Props' },
  { id: 'theme', title: 'Theme' },
  { id: 'variants', title: 'Variants' },
  { id: 'best-practices', title: 'Best Practices' },
];

const packagesToc = [
  { id: 'packages', title: 'Packages' },
  { id: 'structure', title: 'Structure' },
];

const packageDetailToc = [
  { id: 'install', title: 'Install' },
  { id: 'usage', title: 'Usage' },
  { id: 'components', title: 'Components' },
  { id: 'docs', title: 'Docs' },
];

function getToc(pathname: string): TocItem[] {
  if (pathname === '/') return homeToc;
  if (pathname === '/components') return componentsToc;
  if (pathname === '/icons') return iconsToc;
  if (pathname.startsWith('/components/')) return componentDetailToc;
  if (pathname === '/packages') return packagesToc;
  if (pathname.startsWith('/packages/')) return packageDetailToc;

  if (pathname.startsWith('/docs/')) {
    const slug = pathname.split('/')[2];
    const page = docPages.find((item) => item.slug === slug);
    return page?.sections.map((section) => ({ id: section.id, title: section.title })) ?? [];
  }

  return [];
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const toc = getToc(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || (!event.metaKey && !event.ctrlKey)) {
        return;
      }

      event.preventDefault();
      setIsSearchOpen(true);
    };

    window.addEventListener('keydown', handleSearchShortcut);

    return () => {
      window.removeEventListener('keydown', handleSearchShortcut);
    };
  }, []);

  return (
    <div className="docs-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button
            className="icon-control mobile-menu-button"
            type="button"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
          <Link href="/" className="brand-mark" onClick={() => setIsOpen(false)}>
            <span>
              <strong>rn-kit</strong>
              <small>{packageInfo.name}</small>
            </span>
          </Link>
        </div>

        <button
          className="topbar-search search-trigger"
          type="button"
          aria-label="Search documentation"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search size={16} aria-hidden="true" />
          <span>Search docs</span>
          <kbd className="search-shortcut" aria-hidden="true">
            Ctrl/Cmd K
          </kbd>
        </button>

        <div className="topbar-actions">
          <span className="version-pill">v{packageInfo.version}</span>
          <ThemeToggle />
        </div>
      </header>

      <Sidebar
        isOpen={isOpen}
        onNavigate={() => setIsOpen(false)}
        onSearchOpen={() => setIsSearchOpen(true)}
        pathname={pathname}
      />

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {isOpen ? (
        <button
          className="sidebar-scrim"
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <main className="docs-main">
        <div className="docs-layout">
          <div className="docs-container">{children}</div>
          {toc.length > 0 ? (
            <aside className="toc" aria-label="On this page">
              <strong>On this page</strong>
              {toc.map((item) => (
                <a href={`#${item.id}`} key={item.id}>
                  {item.title}
                </a>
              ))}
            </aside>
          ) : null}
        </div>
      </main>
    </div>
  );
}
