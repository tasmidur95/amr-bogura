'use client';

import Link from '@/lib/i18n/navigation';
import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { formatNumber } from '@/lib/i18n/format';
import { useToast } from '@/lib/context/ToastContext';
import { Hospital, EmergencyContact } from '@/lib/data/district-data';
import { useLocalized } from '@/lib/i18n/useLocalized';

interface HealthcareSectionProps {
  hospitals: Hospital[];
  emergencyContacts: EmergencyContact[];
  currentFilter?: string;
  onFilterChange?: (filter: string) => void;
  isHome?: boolean;
}

const FILTERS: [string, string][] = [
  ['all', 'home.health.fAll'],
  ['govt', 'home.health.fGovt'],
  ['private', 'home.health.fPrivate'],
  ['diagnostic', 'home.health.fDiag'],
];

export default function HealthcareSection({
  hospitals: hospitalsRaw,
  emergencyContacts,
  currentFilter = 'all',
  onFilterChange,
  isHome = false,
}: HealthcareSectionProps) {
  const { t, locale } = useLanguage();
  const hospitals = useLocalized(hospitalsRaw);
  const { showToast } = useToast();
  const [internalFilter, setInternalFilter] = useState(currentFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const activeFilter = onFilterChange ? currentFilter : internalFilter;
  const setFilter = (type: string) => (onFilterChange ? onFilterChange(type) : setInternalFilter(type));

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(t('home.health.copied', { label, text }));
    } else {
      showToast(t('home.health.number', { text }));
    }
  };

  const filtered = hospitals.filter(h => {
    const matchesType = activeFilter === 'all' || h.type === activeFilter;
    const q = searchQuery.toLowerCase();
    return matchesType && (h.name.toLowerCase().includes(q) || h.name_en.toLowerCase().includes(q) || h.address.toLowerCase().includes(q));
  });
  const displayedHospitals = isHome ? filtered.slice(0, 6) : filtered;

  return (
    <section id="healthcare" aria-labelledby="healthcare-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* 1. Emergency first: highest urgency, one-tap calls */}
      <div id="emergency" className="bg-gradient-to-br from-rose-950 via-rose-900 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-lg scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-200 border border-rose-400/30">
              <i className="fa-solid fa-bell"></i> <span>{t('emergency.badge')}</span>
            </span>
            <h2 className="text-lg sm:text-2xl font-bold mt-1.5 leading-snug">{t('emergency.title')}</h2>
          </div>
          <a
            href="tel:999"
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition sm:self-auto"
          >
            <i className="fa-solid fa-phone"></i>
            <span>{t('home.health.national', { n: formatNumber('999', locale) })}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {emergencyContacts.map(item => (
            <div key={item.title} className="bg-white/10 border border-white/15 rounded-xl px-3 py-2.5 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] text-rose-100/90 font-medium truncate">{item.title}</p>
                <p className="text-sm sm:text-base font-bold text-white tracking-wide">{item.number}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <a href={`tel:${item.number}`} className="w-9 h-9 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition" aria-label={`${item.title} — ${t('home.health.call')}`}>
                  <i className="fa-solid fa-phone text-xs"></i>
                </a>
                <button onClick={() => handleCopy(item.number, item.title)} className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer" aria-label={t('home.health.copy')}>
                  <i className="fa-regular fa-copy text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Hospital directory preview */}
      <div className="mt-6 sm:mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-3">
          <div>
            <h2 id="healthcare-title" className="text-xl sm:text-2xl font-bold text-slate-900">
              {t('healthcare.title')}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{t('healthcare.subtitle')}</p>
          </div>
          {isHome && (
            <Link href="/healthcare" className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-xs transition self-start sm:self-auto shrink-0">
              <span>{t('home.health.allCentres', { n: formatNumber(352, locale) })}</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          )}
        </div>

        {/* Filters + search on one compact row */}
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {FILTERS.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 transition cursor-pointer ${
                  activeFilter === key ? 'font-bold bg-emerald-800 text-white' : 'font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t(label as MessageKey)}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto sm:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('home.health.search')}
              aria-label={t('home.health.searchLabel')}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Swipeable row on mobile, grid from md */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-1">
          {displayedHospitals.length === 0 ? (
            <div className="col-span-full w-full text-center py-8 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              {t('home.health.none')}
            </div>
          ) : (
            displayedHospitals.map(h => {
              const badgeColor =
                h.type === 'govt'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : h.type === 'private'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-cyan-50 text-cyan-800 border-cyan-200';
              return (
                <article key={h.name} className="snap-start shrink-0 w-[78%] min-[480px]:w-[55%] md:w-auto bg-white rounded-2xl p-4 border border-slate-200/90 card-hover flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>{h.typeLabel}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        <i className="fa-solid fa-circle-check"></i> {t('home.health.active')}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{h.name}</h3>
                    <p className="text-[11px] text-slate-400">{h.name_en !== h.name ? h.name_en : ''}</p>
                    <p className="text-xs text-slate-600 mt-2 flex items-start gap-1.5 line-clamp-2">
                      <i className="fa-solid fa-location-dot text-emerald-700 mt-0.5"></i>
                      <span>{h.address}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 flex items-start gap-1.5 line-clamp-1">
                      <i className="fa-solid fa-notes-medical text-amber-600 mt-0.5"></i>
                      <span>{h.emergency}</span>
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <a href={`tel:${h.phone}`} className="flex-1 py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition">
                      <i className="fa-solid fa-phone"></i>
                      <span>{h.phone}</span>
                    </a>
                    <button onClick={() => handleCopy(h.phone, h.name)} className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer" aria-label={t('home.health.copyNumber')}>
                      <i className="fa-regular fa-copy"></i>
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Single slim CTA (replaces two overlapping banners) */}
        {isHome && (
          <Link
            href="/healthcare"
            className="mt-3 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md hover:from-emerald-700 hover:to-teal-700 transition"
          >
            <span className="text-xs sm:text-sm font-bold leading-snug">
              {t('home.health.banner', { u: formatNumber(12, locale), n: formatNumber(352, locale) })}
            </span>
            <span className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-900 text-xs font-bold flex items-center gap-1.5">
              {t('home.health.open')} <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
