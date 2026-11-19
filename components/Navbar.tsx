'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, anchor?: string) => void;
  onOpenSearch: () => void;
}

export default function Navbar({ currentView, onNavigate, onOpenSearch }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const { showToast } = useToast();

  const handleLangToggle = () => {
    toggleLanguage();
    showToast(
      language === 'bn' ? 'Language switched to English' : 'ভাষা বাংলায় পরিবর্তন করা হয়েছে'
    );
  };

  return (
    <>
      {/* Top Civic Alert Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{t('topNoticeLabel')}</span>
            </span>
            <span className="truncate text-emerald-200/90">{t('topNoticeText')}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-emerald-300">
            <span>
              <i className="fa-solid fa-location-dot text-amber-400 mr-1"></i>{' '}
              {t('divisionBadge')}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Main Header & Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 20h18M5 20V10l7-6 7 6v10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17c3-1.5 6 1.5 10 0s7 1.5 10 0" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-emerald-900 leading-none">
                  {t('brandTitle')}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  BD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {t('brandSubtitle')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition cursor-pointer ${
                currentView === 'home'
                  ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                  : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
              }`}
            >
              {t('navHome')}
            </Link>
            <button
              onClick={() => onNavigate('home', 'services')}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60 transition cursor-pointer"
            >
              {t('navServices')}
            </button>
            <Link
              href="/upazilas"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition cursor-pointer ${
                currentView === 'upazilas'
                  ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                  : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
              }`}
            >
              {t('navUpazilas')}
            </Link>
            <button
              onClick={() => onNavigate('home', 'healthcare')}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60 transition cursor-pointer"
            >
              {t('navHealthcare')}
            </button>
            <Link
              href="/explore"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition cursor-pointer ${
                currentView === 'explore'
                  ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                  : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
              }`}
            >
              {t('navExplore')}
            </Link>
            <button
              onClick={() => onNavigate('home', 'history')}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60 transition cursor-pointer"
            >
              {t('navHistory')}
            </button>
            <button
              onClick={() => onNavigate('home', 'community')}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60 transition cursor-pointer"
            >
              {t('navCommunity')}
            </button>
          </nav>

          {/* Right Action Controls: Search & Language Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/80 transition flex items-center gap-2 text-sm cursor-pointer"
              title="Search Bogura"
            >
              <i className="fa-solid fa-magnifying-glass text-emerald-700"></i>
              <span className="hidden sm:inline text-slate-500 text-xs font-medium">
                {t('searchPlaceholderBtn')}
              </span>
            </button>

            {/* Bilingual Toggle Pill */}
            <button
              onClick={handleLangToggle}
              className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <i className="fa-solid fa-language text-amber-300 text-sm"></i>
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
