'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Upazila } from '@/lib/data/district-data';
import { boguraUpazilasData, DetailedUpazilaData, UnionData } from '@/lib/data/unions-villages-data';
import type { UnionGeoStats } from '@/components/UpazilaUnionMap';
import dynamic from 'next/dynamic';

const UpazilaUnionMap = dynamic(() => import('@/components/UpazilaUnionMap'), {
  ssr: false,
  loading: () => <div className="h-[420px] sm:h-[480px] rounded-3xl bg-slate-100 animate-pulse" />,
});
import { useToast } from '@/lib/context/ToastContext';

interface UpazilaDetailViewProps {
  upazilaIndex: number;
  upazilas: Upazila[];
  onNavigate: (view: string, anchor?: string) => void;
  onSelectUpazila: (index: number) => void;
}

export default function UpazilaDetailView({
  upazilaIndex,
  upazilas,
  onNavigate,
  onSelectUpazila,
}: UpazilaDetailViewProps) {
  const { language } = useLanguage();
  const { showToast } = useToast();

  const u = upazilas[upazilaIndex] || upazilas[0];
  const detailedUpz: DetailedUpazilaData =
    boguraUpazilasData[upazilaIndex] || boguraUpazilasData[0];

  const prevIdx = (upazilaIndex - 1 + upazilas.length) % upazilas.length;
  const nextIdx = (upazilaIndex + 1) % upazilas.length;
  const prevUpz = upazilas[prevIdx];
  const nextUpz = upazilas[nextIdx];

  // Single source of truth for the selected union (map click, list click or accordion)
  const [selectedUnionId, setSelectedUnionId] = useState<string | null>(null);
  const [geoStats, setGeoStats] = useState<Record<string, UnionGeoStats>>({});
  const [unionSearch, setUnionSearch] = useState('');
  const selectedUnion = detailedUpz.unions.find(x => x.id === selectedUnionId) || null;
  const selectedStats = selectedUnionId ? geoStats[selectedUnionId] : undefined;
  // Previous / next union (wraps around)
  const unionCount = detailedUpz.unions.length;
  const selectedPos = detailedUpz.unions.findIndex(x => x.id === selectedUnionId);
  const prevUnion = selectedPos >= 0 ? detailedUpz.unions[(selectedPos - 1 + unionCount) % unionCount] : null;
  const nextUnion = selectedPos >= 0 ? detailedUpz.unions[(selectedPos + 1) % unionCount] : null;

  const handleCopyVillage = (village: string, unionName: string) => {
    navigator.clipboard?.writeText(
      `${village}, ইউনিয়ন: ${unionName}, উপজেলা: ${detailedUpz.name}, বগুড়া`
    );
    showToast(`"${village}" এর ঠিকানা কপি করা হয়েছে`);
  };

  return (
    <section className="animate-fade-in pb-16">
      {/* Detail Hero Header */}
      <div className="bg-[#F9F8F4] border-b border-slate-200/90 pt-7 pb-10 sm:pt-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mb-5"
          >
            <button
              onClick={() => onNavigate('home')}
              className="text-emerald-800 hover:text-amber-700 font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <i className="fa-solid fa-house text-xs"></i>
              <span>{language === 'bn' ? 'হোম' : 'Home'}</span>
            </button>
            <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
            <button
              onClick={() => onNavigate('upazilas')}
              className="text-emerald-800 hover:text-amber-700 font-semibold transition cursor-pointer"
            >
              {language === 'bn' ? 'উপজেলা ও ইউনিয়ন' : 'Upazilas & Unions'}
            </button>
            <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
            <span className="text-slate-800 font-bold">
              {language === 'bn' ? u.name : u.enName}
            </span>
          </nav>

          {/* Back Button */}
          <button
            onClick={() => onNavigate('upazilas')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#0B4635] border border-slate-200 text-xs sm:text-sm font-bold shadow-2xs mb-6 transition cursor-pointer"
          >
            <span>← {language === 'bn' ? 'সকল উপজেলা ও ম্যাপে ফিরুন' : 'Back to All Upazilas & Map'}</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B4635] text-white text-xs font-bold mb-3">
                <span>উপজেলা ক্রমিক #{language === 'bn' ? u.serialBn : u.serialEn}</span>
                <span className="text-amber-300">·</span>
                <span className="text-amber-300">{u.enName} Upazila</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                {language === 'bn' ? `${u.name} উপজেলা` : `${u.enName} Upazila`}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed">
                {language === 'bn' ? u.desc : u.enDesc}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <a
                  href="#union-explorer"
                  className="px-5 py-3 rounded-2xl bg-[#0B4635] hover:bg-emerald-900 text-white font-bold text-sm shadow-md flex items-center gap-2 transition"
                >
                  <i className="fa-solid fa-map-location-dot text-amber-300"></i>
                  <span>ইউনিয়ন মানচিত্র দেখুন</span>
                </a>
                <a
                  href={`tel:${detailedUpz.unoPhone}`}
                  className="px-5 py-3 rounded-2xl bg-white hover:bg-orange-50 text-[#C85A28] border border-[#C85A28]/30 font-bold text-sm flex items-center gap-2 transition"
                >
                  <i className="fa-solid fa-phone"></i>
                  <span>ইউএনও অফিসে কল</span>
                </a>
              </div>
            </div>
          </div>

          {/* 6 Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-8">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? 'আয়তন' : 'Area'}
              </p>
              <p className="text-base sm:text-lg font-extrabold text-[#0B4635] mt-1">
                {language === 'bn' ? u.area : u.areaEn}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? 'মোট জনসংখ্যা' : 'Population'}
              </p>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                {detailedUpz.population}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? 'ইউনিয়ন সংখ্যা' : 'Unions'}
              </p>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                {detailedUpz.unionCount}টি ইউনিয়ন
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? 'মোট গ্রাম সংখ্যা' : 'Total Villages'}
              </p>
              <p className="text-base sm:text-lg font-extrabold text-[#C85A28] mt-1">
                {detailedUpz.villageCount}টি গ্রাম
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? 'শিক্ষার হার' : 'Literacy Rate'}
              </p>
              <p className="text-base sm:text-lg font-extrabold text-emerald-800 mt-1">
                {detailedUpz.literacyRate}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? 'পোস্ট কোড' : 'Postal Code'}
              </p>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                {u.postalCode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Hotline band: top of page, one-tap calls */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B4635] via-emerald-900 to-[#0B4635] p-4 sm:p-5 shadow-lg border border-emerald-800 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="lg:w-60 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse"></span>
                জরুরি যোগাযোগ
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white mt-2 leading-tight">
                {detailedUpz.name} উপজেলা প্রশাসন হটলাইন
              </h2>
              <p className="text-[11px] text-emerald-100/80 mt-0.5">এক ট্যাপেই সরাসরি কল করুন</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
              {[
                { label: 'উপজেলা নির্বাহী অফিসার (ইউএনও)', phone: detailedUpz.unoPhone, icon: 'fa-user-tie', tone: 'bg-emerald-100 text-emerald-900' },
                { label: `${u.name} থানা (ওসি)`, phone: detailedUpz.policePhone, icon: 'fa-shield', tone: 'bg-blue-100 text-blue-900' },
                { label: 'উপজেলা স্বাস্থ্য কমপ্লেক্স', phone: detailedUpz.healthPhone, icon: 'fa-hospital', tone: 'bg-rose-100 text-rose-900' },
              ].map(c => (
                <a
                  key={c.label}
                  href={`tel:${c.phone}`}
                  className="group bg-white hover:bg-amber-50 rounded-2xl p-3.5 flex items-center gap-3 shadow-md transition hover:-translate-y-0.5"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base shrink-0 ${c.tone}`}>
                    <i className={`fa-solid ${c.icon}`}></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-500 leading-tight truncate">{c.label}</p>
                    <p className="text-sm font-extrabold text-slate-900 font-mono mt-0.5 whitespace-nowrap">{c.phone}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#C85A28] text-white flex items-center justify-center text-xs shrink-0 group-hover:scale-110 transition">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Union Explorer: interactive map + live detail panel */}
        <div id="union-explorer" className="scroll-mt-24 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-1 rounded-md border border-teal-200">
                ইন্টারেক্টিভ ইউনিয়ন মানচিত্র
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5">
                {detailedUpz.name} উপজেলার {detailedUpz.unionCount}টি ইউনিয়ন — মানচিত্রে ক্লিক করে জানুন
              </h2>
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <i className="fa-solid fa-hand-pointer text-[#C85A28]"></i>
              ইউনিয়ন বেছে নিলে গ্রাম, জনসংখ্যা ও যোগাযোগ পাবেন
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-7">
              <UpazilaUnionMap
                key={upazilaIndex}
                upazilaIndex={upazilaIndex}
                selectedUnionId={selectedUnionId}
                onSelectUnion={setSelectedUnionId}
                onStats={st => setGeoStats(st)}
              />
            </div>

            <aside className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden lg:h-[562px]">
              {selectedUnion ? (
                <div className="animate-fade-in flex flex-col h-full">
                  <div className="bg-gradient-to-r from-[#0B4635] to-emerald-800 text-white p-5 shrink-0">
                    <button
                      onClick={() => setSelectedUnionId(null)}
                      className="text-[11px] font-bold text-emerald-100 hover:text-white mb-2 flex items-center gap-1 cursor-pointer"
                    >
                      <i className="fa-solid fa-arrow-left text-[10px]"></i> সব ইউনিয়ন
                    </button>
                    <h3 className="text-xl font-extrabold">{selectedUnion.name} ইউনিয়ন</h3>
                    <p className="text-xs text-emerald-100/90 mt-0.5">
                      {selectedUnion.enName} · {detailedUpz.name} উপজেলা, বগুড়া
                    </p>
                  </div>

                  <div className="p-5 space-y-4 flex-1 min-h-0 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-[#F9F8F4] border border-slate-200/80 rounded-xl py-2">
                        <p className="text-[10px] text-slate-500">জনসংখ্যা (২০১১)</p>
                        <p className="text-sm font-extrabold text-[#C85A28]">
                          {selectedStats?.pop_2011 != null ? selectedStats.pop_2011.toLocaleString('en-IN') : '—'}
                        </p>
                      </div>
                      <div className="bg-[#F9F8F4] border border-slate-200/80 rounded-xl py-2">
                        <p className="text-[10px] text-slate-500">আয়তন</p>
                        <p className="text-sm font-extrabold text-slate-900">
                          {selectedStats ? `${selectedStats.area_sqkm} বর্গ কিমি` : '—'}
                        </p>
                      </div>
                      <div className="bg-[#F9F8F4] border border-slate-200/80 rounded-xl py-2">
                        <p className="text-[10px] text-slate-500">গ্রাম</p>
                        <p className="text-sm font-extrabold text-[#0B4635]">{selectedUnion.villageCount}টি</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1.5">
                      <p><i className="fa-solid fa-envelope text-slate-400 w-4"></i> পোস্ট কোড: <b className="text-slate-900">{selectedUnion.postCode}</b></p>
                      <p><i className="fa-solid fa-location-dot text-slate-400 w-4"></i> অফিস: <b className="text-slate-900">{selectedUnion.officeLocation}</b></p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-800">গ্রাম তালিকা ({selectedUnion.villages.length}টি)</span>
                        <span className="text-slate-400">ক্লিক করে ঠিকানা কপি</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
                        {selectedUnion.villages.map(v => (
                          <button
                            key={v}
                            onClick={() => handleCopyVillage(v, selectedUnion.name)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/70 text-[11px] font-semibold cursor-pointer transition"
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Pinned quick actions, just above the prev/next pagination */}
                  <div className="shrink-0 px-5 py-3 border-t border-slate-200/90 bg-white">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${selectedUnion.contactPhone || detailedUpz.unoPhone}`}
                        className="px-3 py-2.5 rounded-xl bg-[#0B4635] hover:bg-emerald-900 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition"
                      >
                        <i className="fa-solid fa-phone"></i> কল করুন
                      </a>
                      <Link
                        href="/healthcare"
                        className="px-3 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold text-center flex items-center justify-center gap-1.5 transition"
                      >
                        <i className="fa-solid fa-hospital"></i> স্বাস্থ্যসেবা
                      </Link>
                    </div>
                    <Link
                      href="/contribute"
                      className="block mt-2 px-3 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black text-center transition"
                    >
                      <i className="fa-solid fa-plus-circle mr-1.5"></i>এই ইউনিয়নের তথ্য যুক্ত / সংশোধন করুন
                    </Link>
                  </div>
                  {/* Previous / Next union (panel footer) */}
                  {prevUnion && nextUnion && unionCount > 1 && (
                    <div className="flex items-stretch shrink-0 border-t border-slate-200/90 bg-[#F9F8F4]">
                      <button
                        onClick={() => setSelectedUnionId(prevUnion.id)}
                        className="flex-1 min-w-0 px-4 py-2.5 text-left hover:bg-emerald-50 transition cursor-pointer group"
                      >
                        <span className="block text-[10px] text-slate-500">
                          <i className="fa-solid fa-chevron-left text-[9px] mr-1 group-hover:-translate-x-0.5 inline-block transition"></i>পূর্ববর্তী
                        </span>
                        <span className="block text-xs font-bold text-slate-900 truncate">{prevUnion.name}</span>
                      </button>
                      <span className="self-center px-2 text-[11px] font-bold text-slate-400 border-x border-slate-200 py-2 shrink-0">
                        {selectedPos + 1} / {unionCount}
                      </span>
                      <button
                        onClick={() => setSelectedUnionId(nextUnion.id)}
                        className="flex-1 min-w-0 px-4 py-2.5 text-right hover:bg-emerald-50 transition cursor-pointer group"
                      >
                        <span className="block text-[10px] text-slate-500">
                          পরবর্তী<i className="fa-solid fa-chevron-right text-[9px] ml-1 group-hover:translate-x-0.5 inline-block transition"></i>
                        </span>
                        <span className="block text-xs font-bold text-slate-900 truncate">{nextUnion.name}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#C85A28] flex items-center justify-center">
                      <i className="fa-solid fa-hand-pointer"></i>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">ইউনিয়ন পরিষদ ও গ্রাম তালিকা</h3>
                      <p className="text-xs text-slate-500">10টি ইউনিয়ন, 213টি গ্রাম</p>
                    </div>
                  </div>
                  <div className="relative mb-3">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={unionSearch}
                      onChange={e => setUnionSearch(e.target.value)}
                      placeholder="ইউনিয়নের নাম..."
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1 min-h-0 overflow-y-auto pr-1">
                    {detailedUpz.unions
                      .filter(x => !unionSearch.trim() || x.name.includes(unionSearch.trim()) || x.enName.toLowerCase().includes(unionSearch.trim().toLowerCase()))
                      .map(x => (
                        <button
                          key={x.id}
                          onClick={() => setSelectedUnionId(x.id)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-left transition cursor-pointer group"
                        >
                          <span>
                            <span className="font-bold text-sm text-slate-900">{x.name}</span>
                            <span className="text-[11px] text-slate-400 ml-2">{x.villageCount}টি গ্রাম</span>
                          </span>
                          <span className="text-[11px] font-bold text-[#C85A28]">
                            {geoStats[x.id]?.pop_2011 != null ? geoStats[x.id].pop_2011!.toLocaleString('en-IN') : ''}
                            <i className="fa-solid fa-chevron-right text-[9px] text-slate-300 group-hover:text-emerald-700 ml-2"></i>
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Notable Landmarks with Explore Page Links */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-1 rounded-md border border-teal-200">
                দর্শনীয় ও ঐতিহ্যবাহী স্থান
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3 mb-4">
                উল্লেখযোগ্য স্থান ও ঐতিহ্য
              </h3>
              <div className="space-y-2.5">
                {u.landmark.split(',').map(spot => (
                  <div
                    key={spot}
                    className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 text-xs mt-0.5">
                      <i className="fa-solid fa-landmark"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{spot.trim()}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{u.name}, বগুড়া</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href="/explore"
                  className="text-emerald-800 hover:text-amber-700 text-xs font-bold flex items-center justify-between"
                >
                  <span>সকল দর্শনীয় স্থানের বিস্তারিত গাইড দেখুন</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Rivers & Geographic Card */}
            <div className="bg-sky-50 rounded-3xl p-6 border border-sky-200">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-900">
                নদীমাতৃক ভৌগোলিক অবস্থান
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">
                প্রধান নদ-নদী: {u.rivers}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                পলিগঠিত উর্বর মাটি এবং নদী অববাহিকা {u.name} উপজেলার কৃষি ও সংস্কৃতিকে সমৃদ্ধ করেছে।
              </p>
            </div>
          </div>
        </div>

        {/* Previous / Next Upazila Navigation Bar */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectUpazila(prevIdx)}
            className="p-4 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 text-left transition cursor-pointer flex items-center gap-3 group"
          >
            <i className="fa-solid fa-arrow-left text-slate-400 group-hover:text-emerald-800 transition"></i>
            <div>
              <p className="text-xs text-slate-500 font-medium">পূর্ববর্তী উপজেলা</p>
              <p className="font-bold text-slate-900 text-sm">
                #{language === 'bn' ? prevUpz.serialBn : prevUpz.serialEn} {prevUpz.name} উপজেলা
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectUpazila(nextIdx)}
            className="p-4 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 text-right transition cursor-pointer flex items-center justify-end gap-3 group"
          >
            <div>
              <p className="text-xs text-slate-500 font-medium">পরবর্তী উপজেলা</p>
              <p className="font-bold text-slate-900 text-sm">
                #{language === 'bn' ? nextUpz.serialBn : nextUpz.serialEn} {nextUpz.name} উপজেলা
              </p>
            </div>
            <i className="fa-solid fa-arrow-right text-slate-400 group-hover:text-emerald-800 transition"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
