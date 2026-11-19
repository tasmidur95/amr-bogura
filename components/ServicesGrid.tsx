'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

interface ServicesGridProps {
  onNavigate: (view: string, anchor?: string) => void;
  onFilterHospital: (type: string) => void;
  onSwitchCommunityTab: (tab: string) => void;
}

export default function ServicesGrid({
  onNavigate,
  onFilterHospital,
  onSwitchCommunityTab,
}: ServicesGridProps) {
  const { t } = useLanguage();

  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-200">
            {t('sec01Badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {t('sec01Title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('sec01Subtitle')}
          </p>
        </div>
        <div className="text-xs text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 flex items-center gap-2 self-start sm:self-auto shadow-2xs">
          <i className="fa-solid fa-circle-check text-emerald-600"></i>
          <span>{t('verifiedBadge')}</span>
        </div>
      </div>

      {/* 8-Card Directory Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Service 1: Hospitals */}
        <button
          onClick={() => onNavigate('home', 'healthcare')}
          className="text-left group bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors flex items-center justify-center text-xl">
              <i className="fa-solid fa-hospital-user"></i>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              ১৮+ কেন্দ্র
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-800 transition-colors">
              {t('srvHospital')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('srvHospitalSub')}
            </p>
          </div>
        </button>

        {/* Service 2: Diagnostic */}
        <button
          onClick={() => {
            onFilterHospital('diagnostic');
            onNavigate('home', 'healthcare');
          }}
          className="text-left group bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 group-hover:bg-cyan-700 group-hover:text-white transition-colors flex items-center justify-center text-xl">
              <i className="fa-solid fa-microscope"></i>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
              ২৫+ ল্যাব
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-cyan-800 transition-colors">
              {t('srvDiagnostic')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('srvDiagnosticSub')}
            </p>
          </div>
        </button>

        {/* Service 3: Emergency */}
        <button
          onClick={() => onNavigate('home', 'emergency')}
          className="text-left group bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors flex items-center justify-center text-xl">
              <i className="fa-solid fa-truck-medical"></i>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              ২৪/৭ সেবা
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-rose-700 transition-colors">
              {t('srvEmergency')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('srvEmergencySub')}
            </p>
          </div>
        </button>

        {/* Service 4: Upazilas & Pourashavas */}
        <button
          onClick={() => onNavigate('upazilas')}
          className="text-left group bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors flex items-center justify-center text-xl">
              <i className="fa-solid fa-building-flag"></i>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              ১২ উপজেলা
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-800 transition-colors">
              {t('srvUpazila')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('srvUpazilaSub')}
            </p>
          </div>
        </button>

        {/* Service 5: Tourist Spots */}
        <button
          onClick={() => onNavigate('home', 'explore')}
          className="text-left group bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors flex items-center justify-center text-xl">
              <i className="fa-solid fa-gopuram"></i>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              ১০+ স্থান
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-teal-800 transition-colors">
              {t('srvExplore')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('srvExploreSub')}
            </p>
          </div>
        </button>

        {/* Service 6: History */}
        <button
          onClick={() => onNavigate('home', 'history')}
          className="text-left group bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-700 group-hover:bg-orange-700 group-hover:text-white transition-colors flex items-center justify-center text-xl">
              <i className="fa-solid fa-scroll"></i>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
              ১৮২১ সাল
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-orange-800 transition-colors">
              {t('srvHistory')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('srvHistorySub')}
            </p>
          </div>
        </button>

        {/* Service 7: District Map & Stats */}
        <button
          onClick={() => onNavigate('home', 'stats')}
          className="text-left group bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700 group-hover:text-white transition-colors flex items-center justify-center text-xl">
              <i className="fa-solid fa-chart-pie"></i>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
              ২,৮৯৮ কিমি²
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-800 transition-colors">
              {t('srvStats')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('srvStatsSub')}
            </p>
          </div>
        </button>

        {/* Service 8: Bogura Doi & Local Heritage */}
        <button
          onClick={() => {
            onSwitchCommunityTab('business');
            onNavigate('home', 'community');
          }}
          className="text-left group bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-700 group-hover:bg-yellow-600 group-hover:text-white transition-colors flex items-center justify-center text-xl">
              <i className="fa-solid fa-bowl-food"></i>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200">
              GI পণ্য
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg group-hover:text-yellow-800 transition-colors">
              {t('srvDoi')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t('srvDoiSub')}
            </p>
          </div>
        </button>
      </div>
    </section>
  );
}

