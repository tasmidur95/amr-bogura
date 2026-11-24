import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import '../globals.css';
import Providers from '@/components/Providers';
import HeadAssets from '@/components/HeadAssets';
import RouteTransitionBar from '@/components/RouteTransitionBar';
import { DEFAULT_LOCALE, LOCALE_META } from '@/lib/i18n/config';
import { createT } from '@/lib/i18n/messages';
import { ROUTES } from '@/lib/i18n/routes';
import { metadataBase, pageMetadata } from '@/lib/i18n/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = createT(DEFAULT_LOCALE);
  return {
    metadataBase,
    ...pageMetadata({
      locale: DEFAULT_LOCALE,
      paths: ROUTES.home,
      title: t('seo.home.title'),
      description: t('seo.home.description'),
    }),
    keywords: ['Bogura', 'Amar Bogura', 'বগুড়া', 'আমার বগুড়া', 'District Portal', 'Pundravardhana', 'Mahasthangarh', 'Bogura Doi'],
    authors: [{ name: 'Amar Bogura Civic Initiative' }],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    formatDetection: { telephone: false },
    icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
  };
}

// The server always renders the default language (bn). The visitor's choice lives in localStorage and is
// applied on the client (LanguageProvider), so URLs carry no language prefix.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = DEFAULT_LOCALE;

  return (
    <html lang={LOCALE_META[locale].htmlLang} dir={LOCALE_META[locale].dir} className="scroll-smooth">
      <HeadAssets />
      <body className="min-h-screen w-full antialiased selection:bg-emerald-700 selection:text-white">
        <Suspense fallback={null}>
          <RouteTransitionBar />
        </Suspense>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
