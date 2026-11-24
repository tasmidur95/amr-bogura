import { upazilaSlug } from '@/lib/geo/upazila-slug';
import { DEFAULT_LOCALE, LOCALES, Locale } from './config';

/** Same rules as the SQL function public.slugify(): lower-case latin, digits, single hyphens. */
export const slugify = (s: string | null | undefined) =>
  (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// --- Upazilas: 12 fixed entities, index = geo_index = position in district-data ---------
export const UPAZILA_SLUGS = [
  'bogura-sadar', 'shibganj', 'sherpur', 'sonatala', 'sariakandi', 'gabtali',
  'dhunat', 'nandigram', 'kahaloo', 'dupchanchia', 'adamdighi', 'shajahanpur',
] as const;

/**
 * Slug of each upazila per locale. Identical by default; to give a locale its own slug, change the entry
 * here AND the matching row in content_translations. Index order = UPAZILA_SLUGS.
 */
export const UPAZILA_SLUGS_BY_LOCALE: Record<Locale, readonly string[]> = { bn: UPAZILA_SLUGS, en: UPAZILA_SLUGS };

export const upazilaSlugFor = (index: number, locale: Locale = DEFAULT_LOCALE) =>
  UPAZILA_SLUGS_BY_LOCALE[locale][index] ?? UPAZILA_SLUGS[0];

/** Slug of an upazila object from district-data (matches by its names, so admin-edited lists still work). */
export const upazilaSlugOf = (u: { name_en: string; name: string }, fallbackIndex = 0, locale: Locale = DEFAULT_LOCALE) => {
  const canonical = upazilaSlug(u.name_en) || upazilaSlug(u.name);
  const idx = canonical ? UPAZILA_SLUGS.indexOf(canonical as any) : fallbackIndex;
  return upazilaSlugFor(idx >= 0 ? idx : fallbackIndex, locale);
};

/** Resolve a URL slug (any locale's slug, or a legacy numeric index like /upazilas/3) to its index. */
export function resolveUpazilaIndex(slugOrIndex: string): { index: number; legacy: boolean } | null {
  const s = decodeURIComponent(slugOrIndex).toLowerCase();
  for (const l of LOCALES) {
    const i = UPAZILA_SLUGS_BY_LOCALE[l].indexOf(s);
    if (i >= 0) return { index: i, legacy: false };
  }
  if (/^\d+$/.test(s) && +s < UPAZILA_SLUGS.length) return { index: +s, legacy: true };
  const canonical = upazilaSlug(s);
  const byName = canonical ? UPAZILA_SLUGS.indexOf(canonical as any) : -1;
  return byName >= 0 ? { index: byName, legacy: true } : null;
}

// --- Educational institutes: the id already is an English-name slug (institutes.json) ---------------
export const instituteSlug = (inst: { id: string }) => inst.id;

// --- Tourist spots: the slug column (or the in-memory id, which already is a slug) -----------------
export const spotSlug = (s: { id: string; slug?: string }) => s.slug || s.id;
