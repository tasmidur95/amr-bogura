'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, LOCALE_STORAGE_KEY, Locale, isLocale, otherLocale } from '@/lib/i18n/config';
import { MessageKey, TFunction, translate } from '@/lib/i18n/messages';

export type Language = Locale;
export type { MessageKey };

interface LanguageContextType {
  /** Active language ('bn' | 'en'), kept in localStorage – never in the URL */
  locale: Locale;
  /** Alias of `locale`, kept for existing components */
  language: Locale;
  /** Translate a fixed message key, e.g. t('nav.home') or t('footer.copyright', { year }) */
  t: TFunction;
  setLanguage: (lang: Locale) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const readStored = (): Locale | null => {
  try {
    const v = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(v) ? v : null;
  } catch {
    return null;
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server and first client render both use the default language (no hydration mismatch);
  // the saved choice is applied right after mount.
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = readStored();
    if (saved) setLocale(saved);
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCALE_STORAGE_KEY && isLocale(e.newValue)) setLocale(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  const t = useCallback<TFunction>((key, vars) => translate(locale, key, vars), [locale]);

  const setLanguage = useCallback((next: Locale) => {
    setLocale(next);
    try { window.localStorage.setItem(LOCALE_STORAGE_KEY, next); } catch { /* private mode: still works for this visit */ }
  }, []);

  const value = useMemo<LanguageContextType>(
    () => ({ locale, language: locale, t, setLanguage, toggleLanguage: () => setLanguage(otherLocale(locale)) }),
    [locale, t, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

export { DEFAULT_LOCALE, LOCALES };
