import type { MetadataRoute } from 'next';
import { detailedExploreSpots } from '@/lib/data/explore-data';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://amar-bogura.vercel.app').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: [string, number][] = [
    ['', 1],
    ['/upazilas', 0.9],
    ['/healthcare', 0.9],
    ['/explore', 0.8],
    ['/education', 0.7],
    ['/transport', 0.7],
    ['/hospitality', 0.7],
    ['/banking', 0.7],
    ['/community', 0.6],
    ['/contribute', 0.5],
  ];

  return [
    ...staticRoutes.map(([path, priority]) => ({
      url: `${SITE}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('daily' as const) : ('weekly' as const),
      priority,
    })),
    // 12 upazila detail pages
    ...Array.from({ length: 12 }, (_, i) => ({
      url: `${SITE}/upazilas/${i}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...detailedExploreSpots.map(s => ({
      url: `${SITE}/explore/${s.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
