'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SiteContent } from '@/lib/data/district-data';

interface HeroProps {
  onNavigate: (view: string, anchor?: string) => void;
  siteContent?: SiteContent;
  onOpenSearch?: () => void;
}

export default function Hero({ onNavigate, siteContent, onOpenSearch }: HeroProps) {
  const { t } = useLanguage();
  const coverImg = siteContent?.coverImageUrl || '/images/amar-bogura-cover.jpg';

  return (
    <>
      {/* Hero Section with Official Cover Photo Backdrop */}
      <section id="home" className="relative overflow-hidden text-white pt-10 pb-20 sm:pt-14 sm:pb-28">
        {/* Cover Photo Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={coverImg}
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center max-w-3xl mx-auto">
            {/* Brand Logo & District Badge */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>{siteContent?.heroBadge || t('heroBadge')}</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30">
                ঐতিহ্য · কৃষি · সংস্কৃতি
              </span>
            </div>

            {/* Sculpted Typography */}
            <div className="mb-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                {siteContent?.heroTitle ? (
                  <>
                    {siteContent.heroTitle}{' '}
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                      এক ক্লিকে
                    </span>
                  </>
                ) : (
                  <>
                    বগুড়ার ইতিহাস, ঐতিহ্য ও নাগরিক সেবা{' '}
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                      এক ক্লিকে
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-6 max-w-2xl mx-auto text-center">
              {siteContent?.heroSubtitle || 'পুণ্ড্রবর্ধন মহাস্থানগড়, সাতমাথা জিরো পয়েন্ট, জিআই স্বীকৃত বগুড়ার দই, ১২টি উপজেলা এবং ২,৬৯২টি গ্রামের সমন্বয়ে উত্তরবঙ্গের প্রবেশদ্বারের আধুনিক তথ্য ও কমিউনিটি প্ল্যাটফর্ম।'}
            </p>

            {/* CRO Low-Friction Instant Search Bar */}
            <div className="mb-6 max-w-xl w-full mx-auto">
              <div
                onClick={onOpenSearch}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-2 sm:p-2.5 flex items-center justify-between gap-2.5 shadow-lg transition cursor-pointer group w-full text-left"
              >
                <div className="flex items-center gap-2.5 pl-2 sm:pl-3 text-slate-200 min-w-0 flex-1 overflow-hidden">
                  <i className="fa-solid fa-magnifying-glass text-amber-400 group-hover:scale-110 transition shrink-0 text-xs sm:text-sm"></i>
                  <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white truncate">
                    হাসপাতাল, রক্তদাতা, বাস কাউন্টার বা উপজেলা খুঁজুন...
                  </span>
                </div>
                <span className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shrink-0 shadow-xs group-hover:bg-amber-400 transition">
                  অনুসন্ধান
                </span>
              </div>

              {/* Quick Trending Intent Tags */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 text-[11px] text-emerald-200">
                <span className="text-amber-400/90 font-semibold mr-1">জনপ্রিয়:</span>
                <button
                  onClick={() => onNavigate('home', 'community')}
                  className="hover:text-white hover:underline cursor-pointer bg-white/10 px-2 py-0.5 rounded-md border border-white/10 transition"
                >
                  জরুরি রক্তদাতা
                </button>
                <button
                  onClick={() => onNavigate('home', 'healthcare')}
                  className="hover:text-white hover:underline cursor-pointer bg-white/10 px-2 py-0.5 rounded-md border border-white/10 transition"
                >
                  শজিমেক হাসপাতাল
                </button>
                <Link
                  href="/transport"
                  className="hover:text-white hover:underline cursor-pointer bg-white/10 px-2 py-0.5 rounded-md border border-white/10 transition"
                >
                  চারমাথা বাস টার্মিনাল
                </Link>
                <Link
                  href="/education"
                  className="hover:text-white hover:underline cursor-pointer bg-white/10 px-2 py-0.5 rounded-md border border-white/10 transition"
                >
                  আজিজুল হক কলেজ
                </Link>
                <Link
                  href="/explore"
                  className="hover:text-white hover:underline cursor-pointer bg-white/10 px-2 py-0.5 rounded-md border border-white/10 transition"
                >
                  মহাস্থানগড়
                </Link>
              </div>
            </div>

            {/* Focused High-Contrast Primary CTAs (Mobile Responsive) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full sm:w-auto mx-auto">
              <button
                onClick={() => onNavigate('home', 'healthcare')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer ring-1 ring-amber-400/50"
              >
                <i className="fa-solid fa-hospital-user text-slate-950 text-xs sm:text-sm"></i>
                <span>হাসপাতাল ও চিকিৎসাকেন্দ্র</span>
              </button>

              <button
                onClick={() => onNavigate('home', 'community')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/25 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <i className="fa-solid fa-droplet text-rose-400 text-xs sm:text-sm"></i>
                <span>রক্তদাতা নেটওয়ার্ক</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CRO Trust & Credibility Bar (Social proof & quick emergency access) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-600 font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <i className="fa-solid fa-circle-check text-emerald-600"></i>
              <span>জাতীয় বাতায়ন নির্দেশিকা</span>
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-notes-medical text-emerald-600"></i>
              <span><strong>৩৫২+</strong> স্বাস্থ্যকেন্দ্র</span>
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-rose-500"></i>
              <span><strong>৩৬+</strong> নিরাপদ রক্তদাতা</span>
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-graduation-cap text-indigo-600"></i>
              <span><strong>১,৫৭০+</strong> শিক্ষাপ্রতিষ্ঠান</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden lg:inline">
              জরুরি হেল্পলাইন:
            </span>
            <a
              href="tel:999"
              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition"
              title="জাতীয় জরুরি সেবা"
            >
              <i className="fa-solid fa-phone"></i>
              <span>৯৯৯</span>
            </a>
            <a
              href="tel:109"
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition"
              title="নারী ও শিশু হেল্পলাইন"
            >
              <i className="fa-solid fa-phone"></i>
              <span>১০৯</span>
            </a>
            <a
              href="tel:333"
              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition"
              title="জাতীয় তথ্য ও সেবা"
            >
              <i className="fa-solid fa-phone"></i>
              <span>৩৩৩</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
