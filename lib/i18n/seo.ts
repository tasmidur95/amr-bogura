import type { Metadata } from 'next';
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, Locale, SITE_URL } from './config';
import { MessageKey, createT } from './messages';
import { ROUTES, RouteKey, absoluteUrl } from './routes';

type PagePaths = string | Partial<Record<Locale, string>>;

interface PageMetaInput {
  locale: Locale;
  /** Path without locale. Pass a per-locale map when the slug is translated. */
  paths: PagePaths;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

const pathFor = (paths: PagePaths, locale: Locale) =>
  typeof paths === 'string' ? paths : paths[locale] ?? paths[DEFAULT_LOCALE] ?? '/';

/** Canonical + hreflang alternates + Open Graph/Twitter for one localized page. */
export function pageMetadata({ locale, paths, title, description, image, noindex, type = 'website' }: PageMetaInput): Metadata {
  const t = createT(locale);
  const canonical = absoluteUrl(locale, pathFor(paths, locale));
  const img = image ?? '/images/amar-bogura-cover.jpg';
  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type,
      siteName: t('seo.siteName'),
      url: canonical,
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter(l => l !== locale).map(l => LOCALE_META[l].ogLocale),
      images: [{ url: img, width: 1200, height: 675, alt: t('seo.ogImageAlt') }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  };
}

/** SEO for a fixed page: keys seo.<page>.title / seo.<page>.description. */
export type StaticSeoPage =
  | 'upazilas' | 'healthcare' | 'education' | 'explore' | 'transport'
  | 'hospitality' | 'banking' | 'community' | 'contribute' | 'login';

export function staticPageMetadata(localeParam: Locale, page: StaticSeoPage, opts: { noindex?: boolean } = {}): Metadata {
  const t = createT(localeParam);
  return pageMetadata({
    locale: localeParam,
    paths: ROUTES[page as RouteKey],
    title: t(`seo.${page}.title` as MessageKey),
    description: t(`seo.${page}.description` as MessageKey),
    noindex: opts.noindex,
  });
}

export const metadataBase = new URL(SITE_URL);
