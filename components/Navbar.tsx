'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';
import { SiteContent } from '@/lib/data/district-data';

interface NavbarProps {
  currentView: string;
  onNavigate?: (view: string, anchor?: string) => void;
  onOpenSearch?: () => void;
  siteContent?: SiteContent;
}

export default function Navbar({ currentView, onNavigate, onOpenSearch, siteContent }: NavbarProps) {
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();
  const { showToast } = useToast();
  const [activeContent, setActiveContent] = useState<SiteContent | undefined>(siteContent);

  const handleNavClick = (view: string, anchor?: string) => {
    if (onNavigate) {
      onNavigate(view, anchor);
    } else {
      if (view === 'home') {
        router.push(`/${anchor ? '#' + anchor : ''}`);
      } else {
        router.push(`/${view}`);
      }
    }
  };

  useEffect(() => {
    if (siteContent) {
      setActiveContent(siteContent);
    } else {
      fetch('/api/site-content')
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            setActiveContent(json.data);
          }
        })
        .catch(() => { });
    }
  }, [siteContent]);

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
              <span>{activeContent?.topNoticeLabel || t('topNoticeLabel')}</span>
            </span>
            <span className="truncate text-emerald-200/90">{activeContent?.topNoticeText || t('topNoticeText')}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-emerald-300">
            <span>
              <i className="fa-solid fa-location-dot text-amber-400 mr-1"></i>{' '}
              {activeContent?.divisionBadge || t('divisionBadge')}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Main Header & Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity with Cover-Photo inspired Logo */}
          <Link
            href="/"
            className="flex items-center group shrink-0 text-left cursor-pointer"
          >
            <BrandLogo variant="horizontal" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'home'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('navHome')}
            </Link>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60 transition-all duration-200 ease-out active:scale-95 cursor-pointer"
            >
              {t('navServices')}
            </button>
            <Link
              href="/upazilas"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'upazilas'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('navUpazilas')}
            </Link>
            <Link
              href="/healthcare"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'healthcare'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('navHealthcare')}
            </Link>
            <Link
              href="/education"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'education'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {language === 'bn' ? 'শিক্ষাপ্রতিষ্ঠান' : 'Education'}
            </Link>
            <Link
              href="/explore"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'explore'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('navExplore')}
            </Link>
            <Link
              href="/transport"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'transport'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {language === 'bn' ? 'পরিবহন' : 'Transport'}
            </Link>
            <Link
              href="/hospitality"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'hospitality'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {language === 'bn' ? 'হোটেল-রেস্তোরাঁ' : 'Hospitality'}
            </Link>
            <button
              onClick={() => handleNavClick('home', 'history')}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60 transition-all duration-200 ease-out active:scale-95 cursor-pointer"
            >
              {t('navHistory')}
            </button>
            <Link
              href="/community"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'community'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('navCommunity')}
            </Link>
            <Link
              href="/contribute"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer flex items-center gap-1.5 ${currentView === 'contribute'
                ? 'font-bold text-emerald-950 bg-emerald-100 shadow-sm border border-emerald-300'
                : 'font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                }`}
            >
              <i className="fa-solid fa-heart-circle-plus text-rose-500"></i>
              <span>{language === 'bn' ? 'অবদান রাখুন' : 'Contribute'}</span>
            </Link>
          </nav>

          {/* Right Action Controls: Search, Admin & Language Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/80 transition flex items-center justify-center text-sm cursor-pointer"
              title="অ্যাডমিন প্যানেল"
            >
              <i className="fa-solid fa-shield-halved text-emerald-700"></i>
            </Link>

            <button
              onClick={() => onOpenSearch ? onOpenSearch() : router.push('/explore')}
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
