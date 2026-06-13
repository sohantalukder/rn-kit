import type { MetadataRoute } from 'next';
import { components, packageInfo } from '../docs/data/componentRegistry';
import { docPages } from '../docs/data/docsContent';
import { absoluteUrl } from '../docs/seo';

const staticRoutes = ['/', '/components', '/icons', '/packages'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...docPages.map((page) => `/docs/${page.slug}`),
    `/packages/${packageInfo.slug}`,
    ...components.map((component) => `/components/${component.slug}`),
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/components/') ? 0.8 : 0.7,
  }));
}
