import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { localized } from '@/lib/i18n/format';
import { DEFAULT_LOCALE as locale, SITE_URL } from '@/lib/i18n/config';
import { createT } from '@/lib/i18n/messages';
import { ROUTES, absoluteUrl, upazilaPath } from '@/lib/i18n/routes';
import { pageMetadata } from '@/lib/i18n/seo';
import { UPAZILA_SLUGS, resolveUpazilaIndex, upazilaSlugFor } from '@/lib/i18n/entities';
import { DistrictService } from '@/lib/services/district.service';
import { upazilasData } from '@/lib/data/district-data';

export function generateStaticParams() {
  return UPAZILA_SLUGS.map(slug => ({ slug }));
}

const load = async (index: number) => (await DistrictService.getUpazilaByIndex(index)) ?? upazilasData[index];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const hit = resolveUpazilaIndex(params.slug);
  if (!hit) return {};
  const u = await load(hit.index);
  const t = createT(locale);
  const name = localized(locale, u.name, u.name_en);
  const summary = (localized(locale, u.desc, u.description_en)) || '';
  return pageMetadata({
    locale,
    paths: upazilaPath(upazilaSlugFor(hit.index, locale)),
    title: t('seo.upazilaDetail.title', { name }),
    description: summary ? summary.slice(0, 160) : t('seo.upazilaDetail.description', { name }),
  });
}

export default async function UpazilaLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const slug = params.slug;
  const hit = resolveUpazilaIndex(slug);
  if (!hit) notFound();
  const canonicalSlug = upazilaSlugFor(hit.index, locale);
  // legacy /upazilas/3 and spelling variants -> the one canonical slug URL (permanent, keeps link equity)
  if (hit.legacy || slug !== canonicalSlug) permanentRedirect(upazilaPath(canonicalSlug));

  const u = await load(hit.index);
  const t = createT(locale);
  const name = localized(locale, u.name, u.name_en);
  const url = absoluteUrl(locale, upazilaPath(canonicalSlug));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AdministrativeArea',
        '@id': `${url}#place`,
        name: t('upazilaDetail.heading', { name }),
        description: localized(locale, u.desc, u.description_en),
        url,
        inLanguage: locale,
        containedInPlace: { '@type': 'AdministrativeArea', name: locale === 'bn' ? 'বগুড়া জেলা' : 'Bogura District' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: absoluteUrl(locale, ROUTES.home) || SITE_URL },
          { '@type': 'ListItem', position: 2, name: t('breadcrumb.upazilas'), item: absoluteUrl(locale, ROUTES.upazilas) },
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
