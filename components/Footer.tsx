'use client';

import Link, { useRouter } from '@/lib/i18n/navigation';
import React, { useState, useEffect } from 'react';
import BrandLogo from '@/components/BrandLogo';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SiteContent } from '@/lib/data/district-data';

interface FooterProps {
  onNavigate?: (view: string, anchor?: string) => void;
  onSwitchCommunityTab?: (tab: string) => void;
  siteContent?: SiteContent;
}

export default function Footer({ onNavigate, onSwitchCommunityTab, siteContent }: FooterProps) {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [activeContent, setActiveContent] = useState<SiteContent | undefined>(siteContent);
  // CMS banner text (site_content) is authored in the default language only
  const cms = locale === DEFAULT_LOCALE ? activeContent : undefined;

  const handleNav = (view: string, anchor?: string) => {
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

  const handleCommunity = (tab: string) => {
    if (onSwitchCommunityTab) {
      onSwitchCommunityTab(tab);
    }
    handleNav('home', 'community');
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
        .catch(() => {});
    }
  }, [siteContent]);

  return (
    <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-900">
          <div className="md:col-span-2">
            <div className="mb-4">
              <BrandLogo variant="horizontal" size="lg" theme="dark" />
            </div>
            <p className="text-sm text-emerald-300/90 max-w-md leading-relaxed">
              {cms?.footerText || t('footer.about')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li>
                <button
                  onClick={() => handleNav('home', 'services')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  {t('footer.allServices')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('upazilas')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  {t('footer.upazilaDirectory')}
                </button>
              </li>
              <li>
                <Link
                  href="/healthcare"
                  className="hover:text-amber-300 transition text-left cursor-pointer block"
                >
                  {t('footer.hospitals')}
                </Link>
              </li>
              <li>
                <Link
                  href="/transport"
                  className="hover:text-amber-300 transition text-left cursor-pointer block"
                >
                  {t('footer.transport')}
                </Link>
              </li>
              <li>
                <Link
                  href="/hospitality"
                  className="hover:text-amber-300 transition text-left cursor-pointer block"
                >
                  {t('footer.hospitality')}
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="hover:text-amber-300 transition text-left cursor-pointer block"
                >
                  {t('footer.explore')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="hover:text-amber-300 transition text-left cursor-pointer flex items-center gap-1.5 text-amber-300 font-semibold"
                >
                  <i className="fa-solid fa-heart-circle-plus text-rose-400"></i>
                  <span>{t('footer.contribute')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-amber-300 transition text-left cursor-pointer flex items-center gap-1.5 opacity-80"
                >
                  <i className="fa-solid fa-shield-halved text-emerald-400"></i>
                  <span>{t('footer.admin')}</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">{t('footer.communityTitle')}</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li>
                <button
                  onClick={() => handleCommunity('blood')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  {t('footer.blood')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCommunity('tuition')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  {t('footer.tuition')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCommunity('rent')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  {t('footer.rent')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCommunity('business')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  {t('footer.business')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-400">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p>{t('footer.sources')}</p>
        </div>
      </div>
    </footer>
  );
}

