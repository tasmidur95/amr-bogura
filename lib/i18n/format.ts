import { Locale } from './config';

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

/** Numbers are not stored per language: keep ASCII digits in data and convert here. */
export function formatNumber(value: number | string, locale: Locale): string {
  const s = typeof value === 'number' ? value.toLocaleString('en-US') : String(value);
  return locale === 'bn' ? s.replace(/\d/g, d => BN_DIGITS[+d]) : s;
}

/** `_en` fields are optional: show the English value only when it exists, otherwise the Bangla default. */
export function localized(locale: Locale, bn: string, en?: string | null): string {
  return locale === 'en' && en ? en : bn;
}

// Pairs are `field` (Bangla) + `field_en` (English, optional). Classification codes keep their own meaning.
const NOT_TEXT = new Set(['type', 'service_type', 'category', 'upazila_slug', 'id']);

/**
 * English view of a record/list: every `field` that has a non-empty `field_en` gets that value.
 * Empty/missing `_en` keeps the Bangla default. For 'bn' the data is returned untouched.
 * `_en` keys stay as they are, so filters/search that use them keep working.
 */
export function localizeData<T>(value: T, locale: Locale): T {
  if (locale === 'bn' || value == null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(v => localizeData(v, locale)) as unknown as T;
  const src = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(src)) out[k] = localizeData(src[k], locale);
  for (const k of Object.keys(src)) {
    if (!k.endsWith('_en')) continue;
    const base = k.slice(0, -3);
    const en = src[k];
    if (!NOT_TEXT.has(base) && typeof en === 'string' && en.trim() && typeof src[base] === 'string') {
      out[`__bn_${base}`] = src[base]; // original Bangla value, for filters that compare it
      out[base] = en;
    }
  }
  return out as T;
}
