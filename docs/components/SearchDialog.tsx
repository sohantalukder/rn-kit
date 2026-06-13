'use client';

import { ChevronRight, Hash, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { iconNames } from '../../src/assets/icons/names';
import { components } from '../data/componentRegistry';
import { docPages } from '../data/docsContent';
import { formatIconName, getIconAnchor, getIconSearchText } from '../data/iconSearch';

type SearchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  group: string;
  keywords?: string;
};

type AlgoliaHit = {
  objectID?: string;
  url?: string;
  href?: string;
  path?: string;
  slug?: string;
  title?: string;
  name?: string;
  description?: string;
  summary?: string;
  content?: string;
  type?: string;
  category?: string;
  section?: string;
  hierarchy?: {
    lvl0?: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
    lvl4?: string;
  };
};

type AlgoliaResponse = {
  hits?: AlgoliaHit[];
};

const algoliaConfig = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
};

const hasAlgoliaConfig = Boolean(
  algoliaConfig.appId && algoliaConfig.apiKey && algoliaConfig.indexName
);

const componentGroups: Record<string, string> = {
  Badge: 'Display',
  Button: 'Actions',
  IconButton: 'Actions',
  Ripple: 'Actions',
  Text: 'Typography',
  ClickableText: 'Typography',
  TextInput: 'Inputs',
  MultilineInput: 'Inputs',
  OTPInput: 'Inputs',
  PasswordInput: 'Inputs',
  SelectList: 'Inputs',
  MultiSelect: 'Inputs',
  Checkbox: 'Inputs',
  Radio: 'Inputs',
  Switch: 'Inputs',
  Slider: 'Inputs',
  Loader: 'Feedback',
  Skeleton: 'Feedback',
  EmptyContent: 'Feedback',
  NoInternet: 'Feedback',
  Toast: 'Feedback',
  Dialog: 'Overlays',
  BottomSheet: 'Overlays',
  SlideModal: 'Overlays',
  Image: 'Media',
  Avatar: 'Media',
  PhotoCarousel: 'Media',
  Card: 'Layout',
  Divider: 'Layout',
  ScreenContainer: 'Layout',
  StatusBar: 'Supporting',
  IconByVariant: 'Supporting',
};

const searchableComponents = components.map((component) => ({
  id: `component-${component.slug}`,
  title: component.name,
  description: component.summary,
  href: `/components/${component.slug}`,
  group: componentGroups[component.name] ?? 'Components',
  keywords: [
    component.name,
    component.summary,
    component.importName,
    component.primaryProps.join(' '),
    component.variants.join(' '),
  ].join(' '),
}));

const searchableDocs = docPages.flatMap((page) => [
  {
    id: `doc-${page.slug}`,
    title: page.title,
    description: page.description,
    href: `/docs/${page.slug}`,
    group: 'Documentation',
    keywords: [page.title, page.description, page.badge ?? ''].join(' '),
  },
  ...page.sections.map((section) => ({
    id: `doc-${page.slug}-${section.id}`,
    title: section.title,
    description: page.title,
    href: `/docs/${page.slug}#${section.id}`,
    group: page.title,
    keywords: [
      section.title,
      page.title,
      section.body?.join(' ') ?? '',
      section.list?.join(' ') ?? '',
      section.code?.value ?? '',
    ].join(' '),
  })),
]);

const searchableIcons: SearchResult[] = iconNames.map((name) => ({
  id: `icon-${name}`,
  title: formatIconName(name),
  description: `Registered icon key: ${name}`,
  href: `/icons#${getIconAnchor(name)}`,
  group: 'Icons',
  keywords: getIconSearchText(name),
}));

const searchEntries: SearchResult[] = [...searchableDocs, ...searchableComponents, ...searchableIcons];

function filterResults(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return searchEntries
      .filter((item) => item.group === 'Documentation' || item.group === 'Actions')
      .slice(0, 8);
  }

  return searchEntries
    .map((item) => {
      const haystack = `${item.title} ${item.description} ${item.group} ${item.keywords}`.toLowerCase();
      const titleIndex = item.title.toLowerCase().indexOf(normalizedQuery);
      const groupIndex = item.group.toLowerCase().indexOf(normalizedQuery);
      const score =
        titleIndex === 0 ? 0 : titleIndex > -1 ? 1 : groupIndex > -1 ? 2 : haystack.includes(normalizedQuery) ? 3 : 9;

      return { item, score };
    })
    .filter(({ score }) => score < 9)
    .sort((a, b) => a.score - b.score || a.item.title.localeCompare(b.item.title))
    .map(({ item }) => item)
    .slice(0, 18);
}

function truncateDescription(value: string) {
  return value.length > 124 ? `${value.slice(0, 121)}...` : value;
}

function normalizeAlgoliaHref(hit: AlgoliaHit) {
  const rawHref = hit.url ?? hit.href ?? hit.path ?? (hit.slug ? `/${hit.slug}` : '');

  if (!rawHref) return '/';

  try {
    const url = new URL(rawHref, window.location.origin);
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return rawHref.startsWith('/') ? rawHref : `/${rawHref}`;
  }
}

function mapAlgoliaHit(hit: AlgoliaHit): SearchResult {
  const title =
    hit.title ??
    hit.name ??
    hit.hierarchy?.lvl4 ??
    hit.hierarchy?.lvl3 ??
    hit.hierarchy?.lvl2 ??
    hit.hierarchy?.lvl1 ??
    hit.hierarchy?.lvl0 ??
    'Untitled';
  const description =
    hit.description ??
    hit.summary ??
    hit.content ??
    hit.hierarchy?.lvl1 ??
    hit.section ??
    hit.type ??
    '';

  return {
    id: hit.objectID ?? normalizeAlgoliaHref(hit),
    title,
    description: truncateDescription(description),
    href: normalizeAlgoliaHref(hit),
    group: hit.category ?? hit.type ?? hit.hierarchy?.lvl0 ?? 'Search results',
  };
}

function highlightMatch(title: string, query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) return title;

  const matchIndex = title.toLowerCase().indexOf(normalizedQuery.toLowerCase());

  if (matchIndex === -1) return title;

  const before = title.slice(0, matchIndex);
  const match = title.slice(matchIndex, matchIndex + normalizedQuery.length);
  const after = title.slice(matchIndex + normalizedQuery.length);

  return (
    <>
      {before}
      <mark>{match}</mark>
      {after}
    </>
  );
}

function groupResults(results: SearchResult[]) {
  return results.reduce<Record<string, SearchResult[]>>((groups, result) => {
    groups[result.group] = groups[result.group] ?? [];
    groups[result.group].push(result);
    return groups;
  }, {});
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [algoliaResults, setAlgoliaResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const localResults = useMemo(() => filterResults(query), [query]);
  const shouldUseAlgolia = hasAlgoliaConfig && query.trim().length > 0 && !searchError;
  const results = shouldUseAlgolia ? algoliaResults : localResults;
  const groupedResults = useMemo(() => groupResults(results), [results]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setActiveIndex(0);

    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (!isOpen || !hasAlgoliaConfig || !normalizedQuery) {
      setAlgoliaResults([]);
      setIsLoading(false);
      setSearchError('');
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);
    setSearchError('');

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/${encodeURIComponent(
            algoliaConfig.indexName ?? ''
          )}/query`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Algolia-API-Key': algoliaConfig.apiKey ?? '',
              'X-Algolia-Application-Id': algoliaConfig.appId ?? '',
            },
            body: JSON.stringify({
              query: normalizedQuery,
              hitsPerPage: 18,
            }),
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error('Algolia search request failed');
        }

        const data = (await response.json()) as AlgoliaResponse;
        setAlgoliaResults((data.hits ?? []).map(mapAlgoliaHit));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setAlgoliaResults([]);
        setSearchError('Algolia search is unavailable. Showing local docs results.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, query]);

  if (!isOpen) return null;

  const goToResult = (result: SearchResult) => {
    router.push(result.href);
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      goToResult(results[activeIndex]);
    }
  };

  let resultIndex = -1;

  return (
    <div className="search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation">
      <button className="search-dialog-backdrop" type="button" aria-label="Close search" onClick={onClose} />
      <div className="search-panel">
        <div className="search-panel-input">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search docs and components"
            aria-label="Search docs and components"
          />
          <kbd aria-hidden="true">esc</kbd>
        </div>

        <div className="search-results">
          {isLoading ? <p className="search-empty">Searching Algolia...</p> : null}
          {searchError ? <p className="search-empty">{searchError}</p> : null}
          {!isLoading && results.length > 0 ? (
            Object.entries(groupedResults).map(([group, groupItems]) => (
              <section className="search-result-group" key={group}>
                <h2>{group}</h2>
                <div className="search-result-list">
                  {groupItems.map((result) => {
                    resultIndex += 1;
                    const currentIndex = resultIndex;
                    const isActive = currentIndex === activeIndex;

                    return (
                      <button
                        className={`search-result${isActive ? ' active' : ''}`}
                        key={result.id}
                        type="button"
                        onClick={() => goToResult(result)}
                        onMouseEnter={() => setActiveIndex(currentIndex)}
                      >
                        <span className="search-result-icon">
                          <Hash size={16} aria-hidden="true" />
                        </span>
                        <span className="search-result-copy">
                          <span className="search-result-title">{highlightMatch(result.title, query)}</span>
                          <span className="search-result-description">{result.description}</span>
                        </span>
                        <ChevronRight size={16} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          ) : null}
          {!isLoading && results.length === 0 ? (
            <p className="search-empty">No matches found.</p>
          ) : null}
        </div>

        <div className="search-panel-footer">
          <span>{hasAlgoliaConfig ? 'Search by Algolia' : 'Local search preview'}</span>
        </div>
      </div>
    </div>
  );
}
