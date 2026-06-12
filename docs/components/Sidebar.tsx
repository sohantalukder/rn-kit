'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useMemo } from 'react';
import { components } from '../data/componentRegistry';
import { docPages } from '../data/docsContent';

type SidebarProps = {
  isOpen: boolean;
  onNavigate: () => void;
  onQueryChange: (query: string) => void;
  pathname: string;
  query: string;
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

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ isOpen, onNavigate, onQueryChange, pathname, query }: SidebarProps) {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredComponents = useMemo(
    () =>
      components.filter((component) =>
        [component.name, component.summary, component.importName, component.variants.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      ),
    [normalizedQuery]
  );

  const filteredLinks = primaryLinks.filter((item) =>
    item.label.toLowerCase().includes(normalizedQuery)
  );

  return (
    <aside className={`sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="sidebar-inner">
        <label className="sidebar-search">
          <Search size={15} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search docs"
            aria-label="Search documentation"
          />
        </label>

        <nav aria-label="Documentation navigation">
          <section className="sidebar-section">
            <h2 className="sidebar-heading">Documentation</h2>
            {filteredLinks.map((item) => (
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
              {filteredComponents.map((component) => {
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

          {normalizedQuery && filteredLinks.length === 0 && filteredComponents.length === 0 ? (
            <p className="sidebar-empty">No matches found.</p>
          ) : null}
        </nav>
      </div>
    </aside>
  );
}
