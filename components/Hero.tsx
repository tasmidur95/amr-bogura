'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

interface HeroProps {
  onNavigate: (view: string, anchor?: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden terracotta-pattern text-white pt-10 pb-20 sm:pt-14 sm:pb-24">
        {/* Decorative Terracotta Arch SVG in background */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none">
          <svg className="w-80 h-80 sm:w-[440px] sm:h-[440px]" viewBox="0 0 200 200" fill="none">
            <circle cx="150" cy="150" r="120" stroke="#fbbf24" strokeWidth="16" strokeDasharray="10 8" />
            <circle cx="150" cy="150" r="85" stroke="#ffffff" strokeWidth="8" />
            <path d="M50 190 Q120 70 190 190" stroke="#fbbf24" strokeWidth="10" fill="none" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* District Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold mb-5">
              <i className="fa-solid fa-landmark-dome"></i>
              <span>{t('heroBadge')}</span>
            </div>

            {/* Poetic Bangla / English Headline */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white mb-4">
              {t('heroHeadline')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl">
              {t('heroSubtitle')}
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('home', 'healthcare')}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-950/25 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <i className="fa-solid fa-hospital"></i>
                <span>{t('ctaHospitals')}</span>
              </button>

              <button
                onClick={() => onNavigate('upazilas')}
                className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/25 font-semibold text-sm sm:text-base flex items-center gap-2.5 transition cursor-pointer"
              >
                <i className="fa-solid fa-map-location-dot text-amber-300"></i>
                <span>{t('ctaUpazilas')}</span>
              </button>

              <button
                onClick={() => onNavigate('home', 'community')}
                className="px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950/80 text-emerald-100 border border-emerald-700/60 font-medium text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <i className="fa-solid fa-droplet text-rose-400"></i>
                <span>{t('ctaBlood')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick-Link Cards Overlapping Hero Bottom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {/* Card 1: Hospitals */}
          <button
            onClick={() => onNavigate('home', 'healthcare')}
            className="text-left bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md card-hover flex items-start gap-3.5 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 text-lg border border-emerald-100">
              <i className="fa-solid fa-bed-pulse"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                {t('qlHospitalTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('qlHospitalDesc')}
              </p>
            </div>
          </button>

          {/* Card 2: Emergency */}
          <button
            onClick={() => onNavigate('home', 'emergency')}
            className="text-left bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md card-hover flex items-start gap-3.5 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 text-lg border border-rose-100">
              <i className="fa-solid fa-phone-volume"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                {t('qlEmergencyTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('qlEmergencyDesc')}
              </p>
            </div>
          </button>

          {/* Card 3: 12 Upazilas */}
          <button
            onClick={() => onNavigate('upazilas')}
            className="text-left bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md card-hover flex items-start gap-3.5 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 text-lg border border-amber-100">
              <i className="fa-solid fa-sitemap"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                {t('qlUpazilaTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('qlUpazilaDesc')}
              </p>
            </div>
          </button>

          {/* Card 4: Explore Heritage */}
          <button
            onClick={() => onNavigate('home', 'explore')}
            className="text-left bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md card-hover flex items-start gap-3.5 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 text-lg border border-teal-100">
              <i className="fa-solid fa-monument"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                {t('qlExploreTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t('qlExploreDesc')}
              </p>
            </div>
          </button>
        </div>
      </section>
    </>
  );
}

