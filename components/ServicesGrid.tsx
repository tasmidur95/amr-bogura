'use client';

import Link from '@/lib/i18n/navigation';
import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

interface ServicesGridProps {
  onNavigate: (view: string, anchor?: string) => void;
  onFilterHospital: (type: string) => void;
  onSwitchCommunityTab: (tab: string) => void;
}

interface Service {
  key: string;
  title: string;
  sub: string;
  badge: string;
  icon: string;
  tone: string; // tailwind classes for icon bubble
  href?: string;
  onClick?: () => void;
}

export default function ServicesGrid({ onNavigate, onFilterHospital, onSwitchCommunityTab }: ServicesGridProps) {
  const { t } = useLanguage();

  const services: Service[] = [
    { key: 'hospital', title: t('services.items.hospital.title'), sub: t('services.items.hospital.desc'), badge: t('home.services.badgeHospital'), icon: 'fa-hospital-user', tone: 'bg-emerald-50 text-emerald-700', href: '/healthcare' },
    { key: 'diagnostic', title: t('services.items.diagnostic.title'), sub: t('services.items.diagnostic.desc'), badge: t('home.services.badgeLab'), icon: 'fa-microscope', tone: 'bg-cyan-50 text-cyan-700', onClick: () => { onFilterHospital('diagnostic'); onNavigate('home', 'healthcare'); } },
    { key: 'emergency', title: t('services.items.emergency.title'), sub: t('services.items.emergency.desc'), badge: t('home.services.badgeAlways'), icon: 'fa-truck-medical', tone: 'bg-rose-50 text-rose-600', onClick: () => onNavigate('home', 'emergency') },
    { key: 'upazila', title: t('services.items.upazila.title'), sub: t('services.items.upazila.desc'), badge: t('home.services.badgeUpazila'), icon: 'fa-building-flag', tone: 'bg-amber-50 text-amber-700', href: '/upazilas' },
    { key: 'explore', title: t('services.items.explore.title'), sub: t('services.items.explore.desc'), badge: t('home.services.badgeSpots'), icon: 'fa-gopuram', tone: 'bg-teal-50 text-teal-700', href: '/explore' },
    { key: 'banking', title: t('home.services.bankTitle'), sub: t('home.services.bankDesc'), badge: t('home.services.badgeAtm'), icon: 'fa-building-columns', tone: 'bg-emerald-50 text-emerald-800', href: '/banking' },
    { key: 'doi', title: t('services.items.doi.title'), sub: t('services.items.doi.desc'), badge: t('home.services.badgeGi'), icon: 'fa-bowl-food', tone: 'bg-yellow-50 text-yellow-700', onClick: () => { onSwitchCommunityTab('business'); onNavigate('home', 'community'); } },
    { key: 'history', title: t('services.items.history.title'), sub: t('services.items.history.desc'), badge: t('home.services.badgeYear'), icon: 'fa-scroll', tone: 'bg-orange-50 text-orange-700', onClick: () => onNavigate('home', 'history') },
  ];

  const cardClass =
    'group text-left bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/90 card-hover flex flex-col items-center sm:items-stretch text-center sm:text-left gap-2 cursor-pointer min-w-0';

  const inner = (s: Service) => (
    <>
      <div className="flex items-center justify-center sm:justify-between w-full">
        <span className={`w-11 h-11 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg ${s.tone} group-hover:scale-105 transition`}>
          <i className={`fa-solid ${s.icon}`}></i>
        </span>
        <span className="hidden sm:inline text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
          {s.badge}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-slate-900 text-[13px] sm:text-base leading-tight group-hover:text-emerald-800 transition-colors">
          {s.title}
        </h3>
        <p className="hidden sm:block text-xs text-slate-500 mt-1 line-clamp-2">{s.sub}</p>
      </div>
    </>
  );

  return (
    <section id="services" aria-labelledby="services-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4 sm:pb-6">
      <div className="flex items-end justify-between gap-3 mb-3 sm:mb-5">
        <div>
          <h2 id="services-title" className="text-xl sm:text-2xl font-bold text-slate-900">
            {t('services.title')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5 hidden sm:block">{t('services.subtitle')}</p>
        </div>
        <span className="text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5 shrink-0">
          <i className="fa-solid fa-circle-check text-emerald-600"></i>
          <span>{t('services.verified')}</span>
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {services.map(s =>
          s.href ? (
            <Link key={s.key} href={s.href} className={cardClass}>
              {inner(s)}
            </Link>
          ) : (
            <button key={s.key} onClick={s.onClick} className={cardClass}>
              {inner(s)}
            </button>
          )
        )}
      </div>
    </section>
  );
}
