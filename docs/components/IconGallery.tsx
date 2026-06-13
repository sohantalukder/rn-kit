'use client';

import { Check, Copy, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import IconByVariant from '../../src/components/atoms/icon-by-variant/IconByVariant';
import { iconNames, type IconName } from '../../src/assets/icons/names';
import ThemeProvider from '../../src/theme/ThemeProvider/ThemeProvider';
import type { ThemeStorageAdapter } from '../../src/theme/ThemeProvider/ThemeProvider';
import { formatIconName, getIconAnchor, getIconSearchText } from '../data/iconSearch';

type DocsTheme = 'light' | 'dark';

function getCurrentDocsTheme(): DocsTheme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function useDocsTheme() {
  const [docsTheme, setDocsTheme] = useState<DocsTheme>(getCurrentDocsTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDocsTheme(getCurrentDocsTheme());
    });

    observer.observe(document.documentElement, {
      attributeFilter: ['data-theme'],
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  return docsTheme;
}

export function IconGallery() {
  const docsTheme = useDocsTheme();
  const [query, setQuery] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<IconName | null>(null);
  const iconThemeStorage = useMemo<ThemeStorageAdapter>(
    () => ({
      getTheme: () => (docsTheme === 'light' ? 'default' : 'dark'),
      setTheme: () => undefined,
    }),
    [docsTheme]
  );

  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return iconNames;

    return iconNames.filter((name) => getIconSearchText(name).includes(normalizedQuery));
  }, [query]);

  const copyIconName = async (name: IconName) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedIcon(name);
      window.setTimeout(() => setCopiedIcon((current) => (current === name ? null : current)), 1300);
    } catch {
      setCopiedIcon(null);
    }
  };

  return (
    <div className="icon-gallery">
      <div className="icon-gallery-toolbar">
        <label className="icon-gallery-search">
          <Search size={17} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search icons"
            aria-label="Search icons"
          />
        </label>
        <span className="meta-badge">
          {filteredIcons.length} of {iconNames.length} icons
        </span>
      </div>

      <ThemeProvider key={docsTheme} storageAdapter={iconThemeStorage}>
        {filteredIcons.length > 0 ? (
          <div className="icon-grid">
            {filteredIcons.map((name) => {
              const label = formatIconName(name);
              const copied = copiedIcon === name;

              return (
                <article className="icon-card" id={getIconAnchor(name)} key={name}>
                  <button
                    className="icon-copy-button"
                    type="button"
                    onClick={() => copyIconName(name)}
                    aria-label={`Copy ${name} icon name`}
                  >
                    {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  </button>
                  <div className="icon-preview-box" aria-hidden="true">
                    <IconByVariant path={name} width={30} height={30} />
                  </div>
                  <div className="icon-card-copy">
                    <strong className="icon-card-title">{label}</strong>
                    <code>{name}</code>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="icon-empty" role="status">
            <strong>No icons found</strong>
            <span>Try a different icon name, state, or action keyword.</span>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}
