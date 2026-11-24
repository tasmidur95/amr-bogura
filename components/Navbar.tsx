'use client';

import Link, { useRouter } from '@/lib/i18n/navigation';
import React, { useState, useEffect } from 'react';
import BrandLogo from '@/components/BrandLogo';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';
import { useCommunityAuth } from '@/lib/context/CommunityAuthContext';
import { SiteContent } from '@/lib/data/district-data';
import { DEFAULT_LOCALE, otherLocale } from '@/lib/i18n/config';
import { translate } from '@/lib/i18n/messages';

interface NavbarProps {
  currentView: string;
  onNavigate?: (view: string, anchor?: string) => void;
  onOpenSearch?: () => void;
  siteContent?: SiteContent;
}

export default function Navbar({ currentView, onNavigate, onOpenSearch, siteContent }: NavbarProps) {
  const router = useRouter();
  const { locale, toggleLanguage, t } = useLanguage();
  const { showToast } = useToast();
  const { user, isLoggedIn, openAuthPage } = useCommunityAuth();
  const [activeContent, setActiveContent] = useState<SiteContent | undefined>(siteContent);
  // CMS banner text (site_content) is authored in the default language only
  const cms = locale === DEFAULT_LOCALE ? activeContent : undefined;

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
    const next = otherLocale(locale);
    toggleLanguage();
    showToast(translate(next, 'lang.switched'));
  };

  return (
    <>
      {/* Top Civic Alert Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{cms?.topNoticeLabel || t('notice.label')}</span>
            </span>
            <span className="truncate text-emerald-200/90">{cms?.topNoticeText || t('notice.text')}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-emerald-300">
            <span>
              <i className="fa-solid fa-location-dot text-amber-400 mr-1"></i>{' '}
              {cms?.divisionBadge || t('notice.division')}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Main Header & Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Identity with Cover-Photo inspired Logo */}
          <Link
            href="/"
            className="flex items-center group shrink-0 text-left cursor-pointer min-w-0"
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
              {t('nav.home')}
            </Link>
            <button
              onClick={() => handleNavClick('home', 'services')}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60 transition-all duration-200 ease-out active:scale-95 cursor-pointer"
            >
              {t('nav.services')}
            </button>
            <Link
              href="/upazilas"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'upazilas'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('nav.upazilas')}
            </Link>
            <Link
              href="/healthcare"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'healthcare'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('nav.healthcare')}
            </Link>
            <Link
              href="/education"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'education'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('nav.education')}
            </Link>
            <Link
              href="/explore"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'explore'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('nav.explore')}
            </Link>
            <Link
              href="/transport"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'transport'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('nav.transport')}
            </Link>
            <Link
              href="/hospitality"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'hospitality'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('nav.hospitality')}
            </Link>
            <Link
              href="/banking"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'banking'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('nav.banking')}
            </Link>
            {/* <button
              onClick={() => handleNavClick('home', 'history')}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60 transition-all duration-200 ease-out active:scale-95 cursor-pointer"
            >
              {t('nav.history')}
            </button> */}
            <Link
              href="/community"
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer ${currentView === 'community'
                ? 'font-semibold text-emerald-900 bg-white shadow-sm'
                : 'font-medium text-slate-600 hover:text-emerald-800 hover:bg-white/60'
                }`}
            >
              {t('nav.community')}
            </Link>

          </nav>

          {/* Right Action Controls: Search, Community Auth, Admin & Language Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => onOpenSearch ? onOpenSearch() : router.push('/explore')}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/80 transition flex items-center gap-1.5 sm:gap-2 text-sm cursor-pointer"
              title={t('nav.searchTitle')}
            >
              <i className="fa-solid fa-magnifying-glass text-emerald-700"></i>
              <span className="hidden sm:inline text-slate-500 text-xs font-medium">
                {t('nav.search')}
              </span>
            </button>

            {/* Bilingual Toggle Pill */}
            <button
              onClick={handleLangToggle}
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1 sm:gap-1.5 transition cursor-pointer shrink-0"
            >
              <i className="fa-solid fa-language text-amber-300 text-sm"></i>
              <span>
                <span className="sm:hidden">{t('lang.switchToShort')}</span>
                <span className="hidden sm:inline">{t('lang.switchTo')}</span>
              </span>
            </button>
            <Link
              href="/contribute"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out active:scale-95 cursor-pointer flex items-center gap-1.5 ${currentView === 'contribute'
                ? 'font-bold text-emerald-950 bg-emerald-100 shadow-sm border border-emerald-300'
                : 'font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                }`}
            >
              <i className="fa-solid fa-heart-circle-plus text-rose-500"></i>
              <span>{t('nav.contribute')}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
