import en from './en.json';
import bn from './bn.json';
import { DEFAULT_LOCALE, Locale } from '../config';

/**
 * UI text lives in ./en.json and ./bn.json, addressed ONLY by fixed dotted keys ("nav.home").
 *  - `MessageKey` is derived from en.json, so `t('nav.hom')` is a compile error.
 *  - bn.json is assigned to the same type below, so a key missing in either file fails type-check.
 */
type Messages = typeof en;
type Flatten<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Flatten<T[K], `${P}${K}.`>;
}[keyof T & string];

export type MessageKey = Flatten<Messages>;

const dictionaries: Record<Locale, Messages> = { en, bn };

const flat = (obj: Record<string, any>, prefix = '', out: Record<string, string> = {}) => {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') out[prefix + k] = v;
    else flat(v, `${prefix}${k}.`, out);
  }
  return out;
};

const flatCache: Partial<Record<Locale, Record<string, string>>> = {};
export function getMessages(locale: Locale): Record<string, string> {
  return (flatCache[locale] ??= flat(dictionaries[locale]));
}

export type TranslateVars = Record<string, string | number>;
export type TFunction = (key: MessageKey, vars?: TranslateVars) => string;

/** Lookup with fallback: requested locale → default locale → the key itself (visible in dev). */
export function translate(locale: Locale, key: MessageKey, vars?: TranslateVars): string {
  const raw =
    getMessages(locale)[key] ?? getMessages(DEFAULT_LOCALE)[key] ?? key;
  return vars ? raw.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? String(vars[name]) : m)) : raw;
}

export function createT(locale: Locale): TFunction {
  return (key, vars) => translate(locale, key, vars);
}
