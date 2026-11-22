'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import BrandLogo from '@/components/BrandLogo';
import { SiteContent } from '@/lib/data/district-data';

interface HeroProps {
  onNavigate: (view: string, anchor?: string) => void;
  siteContent?: SiteContent;
  onOpenSearch?: () => void;
}

export default function Hero({ onNavigate, siteContent, onOpenSearch }: HeroProps) {
  const { t } = useLanguage();
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Cols: Branding & Hero Action Copy */}
            <div className="lg:col-span-7">
              {/* Brand Logo & District Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
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
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-6 max-w-2xl">
                {siteContent?.heroSubtitle || 'পুণ্ড্রবর্ধন মহাস্থানগড়, সাতমাথা জিরো পয়েন্ট, জিআই স্বীকৃত বগুড়ার দই, ১২টি উপজেলা এবং ২,৬৯২টি গ্রামের সমন্বয়ে উত্তরবঙ্গের প্রবেশদ্বারের আধুনিক তথ্য ও কমিউনিটি প্ল্যাটফর্ম।'}
              </p>

              {/* CRO Low-Friction Instant Search Bar */}
              <div className="mb-6 max-w-xl">
                <div
                  onClick={onOpenSearch}
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-2 sm:p-2.5 flex items-center justify-between gap-3 shadow-lg transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3 pl-2 sm:pl-3 text-slate-200">
                    <i className="fa-solid fa-magnifying-glass text-amber-400 group-hover:scale-110 transition"></i>
                    <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white">
                      হাসপাতাল, রক্তদাতা, বাস কাউন্টার বা উপজেলা খুঁজুন...
                    </span>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shrink-0 shadow-xs group-hover:bg-amber-400 transition">
                    অনুসন্ধান
                  </span>
                </div>

                {/* Quick Trending Intent Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[11px] text-emerald-200">
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

              {/* Focused High-Contrast Primary CTAs (Avoiding Decision Paralysis) */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('home', 'healthcare')}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-950/30 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer ring-2 ring-amber-400/50"
                >
                  <i className="fa-solid fa-hospital-user text-slate-950"></i>
                  <span>হাসপাতাল ও চিকিৎসাকেন্দ্র</span>
                </button>

                <button
                  onClick={() => onNavigate('home', 'community')}
                  className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/25 font-bold text-sm sm:text-base flex items-center gap-2 transition cursor-pointer"
                >
                  <i className="fa-solid fa-droplet text-rose-400"></i>
                  <span>রক্তদাতা নেটওয়ার্ক</span>
                </button>

                <button
                  onClick={() => onNavigate('upazilas')}
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950/80 text-emerald-100 border border-emerald-700/60 font-semibold text-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <i className="fa-solid fa-map-location-dot text-amber-300"></i>
                  <span>১২টি উপজেলা ও ম্যাপ</span>
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
                      src={coverImg}
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

      {/* CRO Trust & Credibility Bar (Social proof & quick emergency access) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
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

          <div className="flex items-center gap-2 shrink-0">
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
                src={coverImg}
                alt="আমার বগুড়া ফুল কভার আর্ট"
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
              />
            </div>

            <div className="p-4 bg-emerald-950 text-xs text-emerald-200 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-800">
              <p>
                অন্তর্ভুক্ত ঐতিহ্য: মহাস্থানগড় · সাতমাথা স্মৃতিস্তম্ভ · লাল দই · সারিয়াকান্দি যমুনা ঘাট · আলু ও শস্যভাণ্ডার
              </p>
              <a
                href={coverImg}
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
