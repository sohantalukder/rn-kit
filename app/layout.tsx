import type { Metadata } from 'next';
import Script from 'next/script';
import { AppShell } from '../docs/components/AppShell';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '@sohantalukder/rn-kit docs',
    template: '%s',
  },
  description: 'Modern component documentation for @sohantalukder/rn-kit.',
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
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
