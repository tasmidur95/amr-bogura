import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { localized } from '@/lib/i18n/format';
import { DEFAULT_LOCALE as locale } from '@/lib/i18n/config';
import { createT } from '@/lib/i18n/messages';
import { ROUTES, absoluteUrl, explorePath } from '@/lib/i18n/routes';
import { pageMetadata } from '@/lib/i18n/seo';
import { spotSlug } from '@/lib/i18n/entities';
import { DistrictService } from '@/lib/services/district.service';

export const revalidate = 600;

async function loadSpot(slug: string) {
  const spot = await DistrictService.getDetailedExploreSpotById(decodeURIComponent(slug));
  if (!spot || spot.isApproved === false) return null;
  const canonical = spotSlug(spot);
  const path = explorePath(canonical);
  const name = localized(locale, spot.title, spot.title_en);
  return { spot, canonical, path, name };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await loadSpot(params.slug);
  if (!data) return {};
  const t = createT(locale);
  const { spot, path, name } = data;
  return pageMetadata({
    locale,
    paths: path,
    title: t('seo.spotDetail.title', { name }),
    description: (spot.shortDesc || t('seo.spotDetail.description', { name })).slice(0, 160),
    image: spot.coverImage,
    type: 'article',
  });
}

export default async function SpotLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const data = await loadSpot(params.slug);
  if (!data) notFound();
  const { spot, canonical, path, name } = data;
  // id -> canonical slug
  if (decodeURIComponent(params.slug) !== canonical) permanentRedirect(path);

  const t = createT(locale);
  const url = absoluteUrl(locale, path);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristAttraction',
        '@id': `${url}#spot`,
        name,
        description: spot.shortDesc,
        url,
        image: spot.coverImage,
        inLanguage: locale,
        address: { '@type': 'PostalAddress', addressLocality: spot.location, addressRegion: locale === 'bn' ? 'বগুড়া' : 'Bogura', addressCountry: 'BD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: absoluteUrl(locale, ROUTES.home) },
          { '@type': 'ListItem', position: 2, name: t('nav.explore'), item: absoluteUrl(locale, ROUTES.explore) },
          { '@type': 'ListItem', position: 3, name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
