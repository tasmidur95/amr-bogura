import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DEFAULT_LOCALE, Locale } from '@/lib/i18n/config';
import { createT } from '@/lib/i18n/messages';
import { ROUTES, absoluteUrl, educationPath } from '@/lib/i18n/routes';
import { pageMetadata } from '@/lib/i18n/seo';
import { DistrictService } from '@/lib/services/district.service';

export const revalidate = 600;

async function load(locale: Locale, slug: string) {
  const inst = await DistrictService.getEducationalInstituteById(decodeURIComponent(slug));
  if (!inst || (inst as any).isApproved === false) return null;
  const name = locale === 'bn' ? inst.name : inst.name_en || inst.name;
  return { inst, name };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await load(DEFAULT_LOCALE, params.slug);
  if (!data) return {};
  const t = createT(DEFAULT_LOCALE);
  // institute pages exist in both languages under the same slug (the id)
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    paths: educationPath(data.inst.id),
    title: t('seo.instituteDetail.title', { name: data.name }),
    description: t('seo.instituteDetail.description', { name: data.name }),
  });
}

export default async function InstituteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const data = await load(DEFAULT_LOCALE, params.slug);
  if (!data) notFound();
  const t = createT(DEFAULT_LOCALE);
  const url = absoluteUrl(DEFAULT_LOCALE, educationPath(data.inst.id));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${url}#org`,
        name: data.name,
        url,
        inLanguage: DEFAULT_LOCALE,
        address: { '@type': 'PostalAddress', streetAddress: data.inst.location, addressRegion: 'Bogura', addressCountry: 'BD' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: absoluteUrl(DEFAULT_LOCALE, ROUTES.home) },
          { '@type': 'ListItem', position: 2, name: t('nav.education'), item: absoluteUrl(DEFAULT_LOCALE, ROUTES.education) },
          { '@type': 'ListItem', position: 3, name: data.name, item: url },
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
