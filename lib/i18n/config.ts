// Single source of truth for supported locales. Add a locale here, add its messages JSON in
// ./messages, and insert it into the `locales` table (see supabase/migrations/*_i18n.sql).

export const LOCALES = ['bn', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'bn';
/** localStorage key holding the visitor's language ('bn' | 'en'). */
export const LOCALE_STORAGE_KEY = 'amar-bogura-lang';

export const LOCALE_META: Record<
  Locale,
  { label: string; htmlLang: string; ogLocale: string; hreflang: string; dir: 'ltr' | 'rtl' }
> = {
  bn: { label: 'বাংলা', htmlLang: 'bn', ogLocale: 'bn_BD', hreflang: 'bn-BD', dir: 'ltr' },
  en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US', hreflang: 'en', dir: 'ltr' },
};

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://amar-bogura.vercel.app').replace(/\/$/, '');

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** The other locale(s) – used by the language toggle. */
export function otherLocale(locale: Locale): Locale {
  return LOCALES.find(l => l !== locale) ?? DEFAULT_LOCALE;
}

/** Pick the best supported locale from an Accept-Language header. */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const wanted = acceptLanguage
    .split(',')
    .map(part => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of wanted) {
    const base = tag.split('-')[0];
    const hit = LOCALES.find(l => l === base);
    if (hit) return hit;
  }
  return DEFAULT_LOCALE;
}
