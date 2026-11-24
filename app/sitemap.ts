import type { MetadataRoute } from 'next';
import { ROUTES, absoluteUrl, educationPath, explorePath, upazilaPath } from '@/lib/i18n/routes';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';
import { UPAZILA_SLUGS, spotSlug } from '@/lib/i18n/entities';
import { DistrictService } from '@/lib/services/district.service';

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

// One URL per page: the language is a client-side preference, not part of the URL.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const e = (path: string, changeFrequency: Entry['changeFrequency'], priority: number): Entry => ({
    url: absoluteUrl(DEFAULT_LOCALE, path) || absoluteUrl(DEFAULT_LOCALE, '/'),
    lastModified: now,
    changeFrequency,
    priority,
  });

  const staticRoutes: [string, number][] = [
    [ROUTES.home, 1], [ROUTES.upazilas, 0.9], [ROUTES.healthcare, 0.9], [ROUTES.explore, 0.8], [ROUTES.education, 0.7],
    [ROUTES.transport, 0.7], [ROUTES.hospitality, 0.7], [ROUTES.banking, 0.7], [ROUTES.community, 0.6], [ROUTES.contribute, 0.5],
  ];
  const out: Entry[] = staticRoutes.map(([p, pr]) => e(p, p === ROUTES.home ? 'daily' : 'weekly', pr));
  UPAZILA_SLUGS.forEach(s => out.push(e(upazilaPath(s), 'monthly', 0.7)));

  const spots = await DistrictService.getDetailedExploreSpots().catch(() => []);
  for (const s of spots) out.push(e(explorePath(spotSlug(s)), 'monthly', 0.6));

  const inst = await DistrictService.getEducationalInstitutes({ limit: 100000 } as any).catch(() => null);
  for (const i of (inst as any)?.institutes ?? []) out.push(e(educationPath(i.id), 'yearly', 0.4));
  return out;
}
