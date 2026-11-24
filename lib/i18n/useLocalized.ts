'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { localizeData } from './format';

/** `const facilities = useLocalized(rawFacilities)` → text fields switch to their `_en` value in English. */
export function useLocalized<T>(data: T): T {
  const { locale } = useLanguage();
  return useMemo(() => localizeData(data, locale), [data, locale]);
}
