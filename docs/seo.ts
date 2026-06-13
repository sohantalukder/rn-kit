import type { Metadata } from 'next';
import { components, packageInfo } from './data/componentRegistry';

const fallbackSiteUrl = 'https://sohantalukder-rn-kit.vercel.app';

function normalizeSiteUrl(url?: string) {
  const normalizedUrl = url?.trim().replace(/\/+$/, '');

  return normalizedUrl || fallbackSiteUrl;
}

export const siteConfig = {
  name: '@sohantalukder/rn-kit docs',
  shortName: 'rn-kit',
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  title: '@sohantalukder/rn-kit docs',
  description:
    'Documentation for @sohantalukder/rn-kit, a typed React Native UI kit with theme primitives, polished components, and overlay providers.',
  author: 'Sohan Talukder',
  creator: '@sohantalukder',
  repository: 'https://github.com/sohantalukder/rn-kit',
  npm: 'https://www.npmjs.com/package/@sohantalukder/rn-kit',
  keywords: [
    'React Native UI kit',
    'React Native components',
    'rn-kit',
    '@sohantalukder/rn-kit',
    'React Native design system',
    'TypeScript UI components',
    'mobile app components',
    ...components.map((component) => `${component.name} component`),
  ],
};

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

type PageMetadata = {
  title: string;
  description: string;
  path?: string;
};

export function createPageMetadata({
  title,
  description,
  path = '/',
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteUrl('/og-image.svg'),
          width: 1200,
          height: 630,
          alt: `${packageInfo.name} documentation preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.creator,
      images: [absoluteUrl('/og-image.svg')],
    },
  };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.author,
  url: siteConfig.repository,
};

const publisherJsonLd = {
  '@type': 'Organization',
  name: siteConfig.author,
  url: siteConfig.repository,
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: publisherJsonLd,
};

export const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: packageInfo.name,
  codeRepository: siteConfig.repository,
  programmingLanguage: 'TypeScript',
  runtimePlatform: 'React Native',
  description: packageInfo.summary,
  license: `${siteConfig.repository}/blob/main/LICENSE`,
  version: packageInfo.version,
};
