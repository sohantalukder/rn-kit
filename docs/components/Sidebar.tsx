'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { components } from '../data/componentRegistry';
import { docPages } from '../data/docsContent';

type SidebarProps = {
  isOpen: boolean;
  onNavigate: () => void;
  onSearchOpen: () => void;
  pathname: string;
};

const visibleDocSlugs = new Set(['getting-started', 'installation', 'theming']);

const primaryLinks = [
  ...docPages
    .filter((page) => visibleDocSlugs.has(page.slug))
    .map((page) => ({
      href: `/docs/${page.slug}`,
      label: page.title,
    })),
];

const resourceLinks = [{ href: '/icons', label: 'Icons' }];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({
  isOpen,
  onNavigate,
  onSearchOpen,
  pathname,
}: SidebarProps) {
  return (
    <aside className={`sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="sidebar-inner">
        <button
          className="sidebar-search search-trigger"
          type="button"
          aria-label="Search documentation"
          onClick={onSearchOpen}
        >
          <Search size={15} aria-hidden="true" />
          <span>Search docs</span>
        </button>

        <nav aria-label="Documentation navigation">
          <section className="sidebar-section">
            <h2 className="sidebar-heading">Documentation</h2>
            {primaryLinks.map((item) => (
              <Link
                className={`sidebar-link${isActive(pathname, item.href) ? ' active' : ''}`}
                href={item.href}
                key={item.href}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            ))}
          </section>

          <section className="sidebar-section">
            <h2 className="sidebar-heading">Resources</h2>
            {resourceLinks.map((item) => (
              <Link
                className={`sidebar-link${isActive(pathname, item.href) ? ' active' : ''}`}
                href={item.href}
                key={item.href}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            ))}
          </section>

          <section className="sidebar-section">
            <h2 className="sidebar-heading">Components</h2>
            <div className="sidebar-component-list">
              {components.map((component) => {
                const href = `/components/${component.slug}`;
                return (
                  <Link
                    className={`sidebar-link${isActive(pathname, href) ? ' active' : ''}`}
                    href={href}
                    key={component.slug}
                    onClick={onNavigate}
                  >
                    {component.name}
                  </Link>
                );
              })}
            </div>
          </section>
        </nav>
      </div>
    </aside>
  );
}
