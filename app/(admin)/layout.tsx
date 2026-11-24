import React from 'react';
import '../globals.css';
import Providers from '@/components/Providers';
import HeadAssets from '@/components/HeadAssets';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';

// The admin console is not localised or indexed: it always runs in the default language.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} className="scroll-smooth">
      <HeadAssets />
      <body className="min-h-screen w-full antialiased selection:bg-emerald-700 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
