'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { packageInfo } from '../data/componentRegistry';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';

export type TocItem = {
  id: string;
  title: string;
};

type AppShellProps = {
  children: React.ReactNode;
  toc?: TocItem[];
};

export function AppShell({ children, toc = [] }: AppShellProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

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
            <span className="brand-symbol">RK</span>
            <span>
              <strong>rn-kit</strong>
              <small>{packageInfo.name}</small>
            </span>
          </Link>
        </div>

        <label className="topbar-search">
          <Search size={16} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search docs"
            aria-label="Search documentation"
          />
        </label>

        <div className="topbar-actions">
          <span className="version-pill">v{packageInfo.version}</span>
          <ThemeToggle />
        </div>
      </header>

      <Sidebar
        isOpen={isOpen}
        onNavigate={() => setIsOpen(false)}
        onQueryChange={setQuery}
        pathname={pathname}
        query={query}
      />

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
