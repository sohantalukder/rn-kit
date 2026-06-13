import type { Metadata } from 'next';
import Script from 'next/script';
import { AppShell } from '../docs/components/AppShell';
import {
  createPageMetadata,
  siteConfig,
  softwareJsonLd,
  websiteJsonLd,
} from '../docs/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: '/',
  }),
  title: {
    default: siteConfig.title,
    template: '%s',
  },
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.author, url: siteConfig.repository }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: siteConfig.keywords,
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="rn-kit-docs-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('rn-kit-docs-theme')||'dark';document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareJsonLd),
          }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
