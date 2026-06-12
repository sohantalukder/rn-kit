import { components, packageInfo } from './componentRegistry';
import { docPages } from './docsContent';

export type NavigationItem = {
  href: string;
  label: string;
};

export const mainNavigation: NavigationItem[] = [
  { href: '/', label: 'Home' },
  ...docPages.map((page) => ({
    href: `/docs/${page.slug}`,
    label: page.title,
  })),
  { href: '/components', label: 'Components' },
  { href: '/icons', label: 'Icons' },
  { href: '/packages', label: 'Packages' },
  { href: `/packages/${packageInfo.slug}`, label: packageInfo.name },
  ...components.map((component) => ({
    href: `/components/${component.slug}`,
    label: component.name,
  })),
];

export function getPager(href: string) {
  const index = mainNavigation.findIndex((item) => item.href === href);

  return {
    next: index >= 0 ? mainNavigation[index + 1] : undefined,
    previous: index > 0 ? mainNavigation[index - 1] : undefined,
  };
}
