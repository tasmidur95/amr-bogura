'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import BrandLogo from '@/components/BrandLogo';

interface HeroProps {
  onNavigate: (view: string, anchor?: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage();
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  return (
    <>
      {/* Hero Section with Official Cover Photo Backdrop */}
      <section id="home" className="relative overflow-hidden text-white pt-10 pb-20 sm:pt-14 sm:pb-28">
        {/* Cover Photo Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/amar-bogura-cover.jpg"
            alt="আমার বগুড়া কভার ফটো"
            className="w-full h-full object-cover object-center scale-105 filter blur-xs"
          />
          {/* Multi-layered dark gradient overlay for crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/85 to-slate-950/75"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/40"></div>
          {/* Subtle terracotta tint */}
          <div className="absolute inset-0 bg-[#C85A28]/15 mix-blend-overlay"></div>
        </div>

        {/* Decorative corner mandala ornament */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-15 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-amber-300 stroke-current">
            <circle cx="100" cy="0" r="80" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="100" cy="0" r="60" strokeWidth="1.5" />
            <circle cx="100" cy="0" r="40" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Cols: Branding & Hero Action Copy */}
            <div className="lg:col-span-7">
              {/* Brand Logo & District Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>{t('heroBadge')}</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30">
                  ঐতিহ্য · কৃষি · সংস্কৃতি
                </span>
              </div>

              {/* Sculpted Typography */}
              <div className="mb-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                  বগুড়ার ইতিহাস, ঐতিহ্য ও নাগরিক সেবা{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                    এক ক্লিকে
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl">
                পুণ্ড্রবর্ধন মহাস্থানগড়, সাতমাথা জিরো পয়েন্ট, জিআই স্বীকৃত বগুড়ার দই, ১২টি উপজেলা এবং ২,৬৯২টি গ্রামের সমন্বয়ে উত্তরবঙ্গের প্রবেশদ্বারের আধুনিক তথ্য ও কমিউনিটি প্ল্যাটফর্ম।
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
                  className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/25 font-bold text-sm sm:text-base flex items-center gap-2.5 transition cursor-pointer"
                >
                  <i className="fa-solid fa-map-location-dot text-amber-300"></i>
                  <span>১২টি উপজেলা ও মানচিত্র</span>
                </button>

                <button
                  onClick={() => onNavigate('home', 'community')}
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950/80 text-emerald-100 border border-emerald-700/60 font-semibold text-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <i className="fa-solid fa-droplet text-rose-400"></i>
                  <span>{t('ctaBlood')}</span>
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Framed Official Cover Photo Showcase */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400/40 via-emerald-500/30 to-orange-500/40 blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/60 bg-emerald-950/90 shadow-2xl">
                  {/* Cover Photo */}
                  <div
                    onClick={() => setIsCoverModalOpen(true)}
                    className="relative cursor-pointer overflow-hidden aspect-video w-full"
                  >
                    <img
                      src="/images/amar-bogura-cover.jpg"
                      alt="আমার বগুড়া অফিসিয়াল কভার ফটো"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                    {/* Badge on Photo */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/85 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-amber-400/30">
                      <i className="fa-solid fa-image"></i>
                      <span>অফিসিয়াল কভার আর্ট</span>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 flex items-end justify-between text-white">
                      <div>
                        <h4 className="text-sm font-extrabold text-amber-300 drop-shadow-md">
                          আমার বগুড়া · My Bogura
                        </h4>
                        <p className="text-[10px] text-emerald-100 font-medium">
                          মহাস্থানগড় · সাতমাথা · লাল দই · নদীমাতৃক ঐতিহ্য
                        </p>
                      </div>

                      <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs text-white hover:bg-amber-400 hover:text-emerald-950 transition">
                        <i className="fa-solid fa-expand"></i>
                      </span>
                    </div>
                  </div>

                  {/* Logo Details Strip */}
                  <div className="p-4 bg-emerald-950/95 flex items-center justify-between border-t border-emerald-800/80">
                    <div className="flex items-center gap-2.5">
                      <BrandLogo variant="emblem" size="sm" />
                      <div>
                        <p className="text-xs font-bold text-white">অফিসিয়াল ব্র্যান্ড প্রতীক</p>
                        <p className="text-[10px] text-emerald-300">কভার ফটো অবলম্বনে নির্মিত লোগো</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsCoverModalOpen(true)}
                      className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>পূর্ণাঙ্গ ছবি</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
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

          {/* Card 3: 12 Upazilas & Real Map */}
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
                ১২ উপজেলা ও মানচিত্র
              </p>
            </div>
          </button>

          {/* Card 4: Explore Heritage Spots */}
          <button
            onClick={() => onNavigate('home', 'explore')}
            className="text-left bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md card-hover flex items-start gap-3.5 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 text-lg border border-teal-100">
              <i className="fa-solid fa-gopuram"></i>
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

      {/* Lightbox Modal for Full Resolution Cover Photo */}
      {isCoverModalOpen && (
        <div
          onClick={() => setIsCoverModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-pointer"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl"
          >
            <div className="p-4 bg-emerald-950 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <BrandLogo variant="emblem" size="sm" />
                <h4 className="text-white font-bold text-sm">
                  আমার বগুড়া — অফিসিয়াল কভার আর্ট ও লোগো
                </h4>
              </div>
              <button
                onClick={() => setIsCoverModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="relative">
              <img
                src="/images/amar-bogura-cover.jpg"
                alt="আমার বগুড়া ফুল কভার আর্ট"
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
              />
            </div>

            <div className="p-4 bg-emerald-950 text-xs text-emerald-200 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-800">
              <p>
                অন্তর্ভুক্ত ঐতিহ্য: মহাস্থানগড় · সাতমাথা স্মৃতিস্তম্ভ · লাল দই · সারিয়াকান্দি যমুনা ঘাট · আলু ও শস্যভাণ্ডার
              </p>
              <a
                href="/images/amar-bogura-cover.jpg"
                download="amar-bogura-cover.jpg"
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1.5"
              >
                <i className="fa-solid fa-download"></i>
                <span>ছবি ডাউনলোড করুন</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
