'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Upazila } from '@/lib/data/district-data';
import RealMap from '@/components/RealMap';
import DistrictSvgMap from '@/components/DistrictSvgMap';
import dynamic from 'next/dynamic';

const BoguraGeoMap = dynamic(() => import('@/components/BoguraGeoMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] sm:h-[620px] rounded-3xl bg-slate-900 animate-pulse flex items-center justify-center">
      <div className="text-center text-slate-400">
        <i className="fa-solid fa-map text-3xl mb-2 block opacity-40"></i>
        <span className="text-xs font-medium">মানচিত্র লোড হচ্ছে...</span>
      </div>
    </div>
  ),
});
import UnionVillageExplorer from '@/components/UnionVillageExplorer';
import { districtSummaryStats, boguraUpazilasData, DetailedUpazilaData } from '@/lib/data/unions-villages-data';

interface UpazilasPageViewProps {
  upazilas: Upazila[];
  onNavigate: (view: string, anchor?: string) => void;
  onOpenDetail: (index: number) => void;
}

export default function UpazilasPageView({
  upazilas,
  onNavigate,
  onOpenDetail,
}: UpazilasPageViewProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'cards' | 'map' | 'unions'>('map');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mapFocusUpazilaId, setMapFocusUpazilaId] = useState<string>('all');
  const [mapSubView, setMapSubView] = useState<'vector' | 'satellite' | 'geo'>('geo');

  const filtered = upazilas.filter(u => {
    const matchesFilter = activeFilter === 'all' || u.tags.includes(activeFilter);
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.enName.toLowerCase().includes(q) ||
      u.rivers.toLowerCase().includes(q) ||
      u.landmark.toLowerCase().includes(q) ||
      u.unionList.some(un => un.toLowerCase().includes(q));
    return matchesFilter && matchesQuery;
  });

  const handleSelectFromMap = (upz: DetailedUpazilaData) => {
    const idx = boguraUpazilasData.findIndex(u => u.id === upz.id);
    if (idx !== -1) {
      onOpenDetail(idx);
    }
  };

  const handleLocateOnMap = (lat: number, lng: number, name: string) => {
    setActiveTab('map');
    setMapSubView('satellite');
    const el = document.getElementById('main-content-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="animate-fade-in pb-16">
      {/* Header Banner */}
      <div className="bg-[#F9F8F4] border-b border-slate-200/90 pt-7 pb-10 sm:pt-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mb-5"
          >
            <button
              onClick={() => onNavigate('home')}
              className="text-emerald-800 hover:text-amber-700 font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <i className="fa-solid fa-house text-xs"></i>
              <span>{t('bcHome')}</span>
            </button>
            <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
            <span className="text-slate-800 font-semibold">উপজেলা, ইউনিয়ন ও গ্রাম</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header Copy & District Summary Metrics */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#C85A28] bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200">
                <i className="fa-solid fa-layer-group"></i>
                <span>প্রশাসনিক ও ভৌগোলিক তথ্যভাণ্ডার</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] tracking-tight mt-3 leading-tight">
                বগুড়া জেলার উপজেলা ও মানচিত্র
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed max-w-2xl">
                বারোটি উপজেলা, তাদের ইউনিয়ন, আয়তন ও ইতিহাস। মানচিত্রে ক্লিক করে যেকোনো উপজেলার বিস্তারিত পাতায় যান।
              </p>

              {/* District Summary Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500">মোট উপজেলা</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0B4635] mt-0.5">
                    {districtSummaryStats.totalUpazilas}টি
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500">ইউনিয়ন পরিষদ</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0B4635] mt-0.5">
                    {districtSummaryStats.totalUnions}টি
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500">মোট গ্রাম সংখ্যা</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#C85A28] mt-0.5">
                    {districtSummaryStats.totalVillages}টি
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500">মোট আয়তন</p>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 truncate">
                    {districtSummaryStats.totalArea}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Interactive Bogura GeoJSON Map Card */}
            <div className="lg:col-span-5">
              <BoguraGeoMap
                onSelectUpazila={onOpenDetail}
                hoveredIndex={hoveredIndex}
                onHoverIndex={setHoveredIndex}
                heightClass="h-[380px] sm:h-[420px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Primary View Mode Navigation Bar */}
      <div id="main-content-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${activeTab === 'map'
                ? 'bg-[#0B4635] text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
            >
              <i className="fa-solid fa-earth-americas text-sky-400"></i>
              <span>প্রশাসনিক ও বাস্তব মানচিত্র</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-400 text-emerald-950 font-black">
                লাইভ
              </span>
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${activeTab === 'cards'
                ? 'bg-[#0B4635] text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
            >
              <i className="fa-solid fa-border-all"></i>
              <span>১২টি উপজেলা পরিচিতি</span>
            </button>



            <button
              onClick={() => setActiveTab('unions')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${activeTab === 'unions'
                ? 'bg-[#0B4635] text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
            >
              <i className="fa-solid fa-sitemap text-[#C85A28]"></i>
              <span>ইউনিয়ন ও গ্রাম তালিকা ({districtSummaryStats.totalVillages} গ্রাম)</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium px-2 hidden lg:block">
            বগুড়া জেলা প্রশাসন ও স্থানীয় সরকার ডিরেক্টরি
          </div>
        </div>

        {/* Tab 1: Map View (Both SVG District Vector Map like amargaibandha.bd and Leaflet Satellite Map) */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {mapSubView === 'geo'
                    ? 'বগুড়া জেলার ইন্টারেক্টিভ প্রশাসনিক মানচিত্র'
                    : mapSubView === 'vector'
                      ? 'বগুড়া জেলার প্রশাসনিক সীমানা ভেক্টর মানচিত্র'
                      : 'বগুড়া জেলার বাস্তব স্যাটেলাইট ও ওপেনস্ট্রিটম্যাপ টাইলস'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {mapSubView === 'geo'
                    ? 'GeoJSON সীমানা মানচিত্র — উপজেলায় ক্লিক করে হাইলাইট করুন ও বিস্তারিত দেখুন'
                    : mapSubView === 'vector'
                      ? 'ভেক্টর মানচিত্র — জুম, প্যান এবং এসভিজি ডাউনলোড সুবিধা'
                      : 'লাইভ স্যাটেলাইট ইমেজ, জিপিএস মার্কার ও ইউনিয়ন পরিষদ লোকেশন'}
                </p>
              </div>

              {/* Sub-toggle: GeoJSON Map vs Vector SVG vs Leaflet Satellite */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl overflow-x-auto">
                <button
                  onClick={() => setMapSubView('geo')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${mapSubView === 'geo'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <i className="fa-solid fa-earth-asia mr-1"></i>
                  ইন্টারেক্টিভ ম্যাপ
                </button>

                <button
                  onClick={() => setMapSubView('satellite')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${mapSubView === 'satellite'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <i className="fa-solid fa-satellite mr-1"></i>
                  ম্যাপ
                </button>
              </div>
            </div>

            {mapSubView === 'geo' ? (
              <BoguraGeoMap
                onSelectUpazila={onOpenDetail}
                hoveredIndex={hoveredIndex}
                onHoverIndex={setHoveredIndex}
                heightClass="h-[560px] sm:h-[660px]"
              />
            ) : mapSubView === 'vector' ? (
              <div className="max-w-4xl mx-auto">
                <DistrictSvgMap
                  onSelectUpazila={onOpenDetail}
                  hoveredIndex={hoveredIndex}
                  onHoverIndex={setHoveredIndex}
                />
              </div>
            ) : (
              <RealMap
                initialUpazilaId={mapFocusUpazilaId}
                onSelectUpazila={handleSelectFromMap}
                heightClass="h-[560px] sm:h-[660px]"
              />
            )}
          </div>
        )}

        {/* Tab 2: Union & Village Comprehensive Explorer */}
        {activeTab === 'unions' && (
          <UnionVillageExplorer onLocateOnMap={handleLocateOnMap} />
        )}

        {/* Tab 3: 12-Upazila Cards Directory */}
        {activeTab === 'cards' && (
          <div className="space-y-8">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${activeFilter === 'all'
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  সব ১২টি উপজেলা
                </button>
                <button
                  onClick={() => setActiveFilter('pourashava')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${activeFilter === 'pourashava'
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  পৌরসভা সমৃদ্ধ (১১টি)
                </button>
                <button
                  onClick={() => setActiveFilter('jamuna')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${activeFilter === 'jamuna'
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  যমুনা তীরবর্তী
                </button>
                <button
                  onClick={() => setActiveFilter('heritage')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${activeFilter === 'heritage'
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  প্রত্নতত্ত্ব ও ঐতিহ্য
                </button>
              </div>

              <div className="relative w-full md:w-72">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="উপজেলা, ইউনিয়ন বা নদীর নাম..."
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0B4635]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>

            {/* CRO Quick-Intent Upazila Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs -mt-4">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                <i className="fa-solid fa-bolt text-amber-500"></i>দ্রুত বাছাই:
              </span>
              {[
                { label: 'বগুড়া সদর', q: 'সদর' },
                { label: 'শিবগঞ্জ', q: 'শিবগঞ্জ' },
                { label: 'শেরপুর', q: 'শেরপুর' },
                { label: 'সারিয়াকান্দি (যমুনা)', q: 'সারিয়াকান্দি' },
                { label: 'দুপচাঁচিয়া', q: 'দুপচাঁচিয়া' },
                { label: 'কাহালু', q: 'কাহালু' },
                { label: 'গাবতলী', q: 'গাবতলী' },
                { label: 'ধুনট', q: 'ধুনট' },
              ].map(chip => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => setSearchQuery(chip.q)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition shrink-0 cursor-pointer ${searchQuery === chip.q
                    ? 'bg-[#0B4635] text-white font-bold'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80'
                    }`}
                >
                  {chip.label}
                </button>
              ))}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2 py-1 rounded-lg text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition shrink-0 cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-left mr-1"></i>রিসেট
                </button>
              )}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
                  নির্বাচিত ফিল্টার বা অনুসন্ধানে কোনো উপজেলা পাওয়া যায়নি।
                </div>
              ) : (
                filtered.map(u => {
                  const originalIdx = upazilas.indexOf(u);
                  const serial = language === 'bn' ? u.serialBn : u.serialEn;
                  const title = language === 'bn' ? u.name : u.enName;
                  const subTitle = language === 'bn' ? u.enName : u.name;
                  const summary = language === 'bn' ? u.desc : u.enDesc;
                  const detailed = boguraUpazilasData[originalIdx] || boguraUpazilasData[0];
                  const isHovered = hoveredIndex === originalIdx;

                  return (
                    <article
                      key={u.serialBn}
                      onMouseEnter={() => setHoveredIndex(originalIdx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(originalIdx)}
                      className={`group bg-white rounded-3xl p-6 border card-hover flex flex-col justify-between cursor-pointer transition shadow-2xs ${isHovered
                        ? 'border-[#C85A28] ring-2 ring-[#C85A28]/40 shadow-md'
                        : 'border-slate-200/90'
                        }`}
                    >
                      <div>
                        {/* Top Serial Number & Pourashava Badge */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span
                            className={`w-10 h-10 rounded-2xl text-white font-bold text-sm flex items-center justify-center shadow-xs transition-colors ${isHovered ? 'bg-[#C85A28]' : 'bg-[#0B4635]'
                              }`}
                          >
                            {serial}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${u.hasPourashava
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                          >
                            {u.pourashava}
                          </span>
                        </div>

                        {/* Upazila Name & English Subtitle */}
                        <div className="mb-2.5">
                          <h2
                            className={`text-xl sm:text-2xl font-bold transition-colors ${isHovered ? 'text-[#C85A28]' : 'text-slate-900 group-hover:text-[#0B4635]'
                              }`}
                          >
                            {title}
                          </h2>
                          <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase mt-0.5">
                            {subTitle} Upazila
                          </p>
                        </div>

                        {/* Summary */}
                        <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
                          {summary}
                        </p>
                      </div>

                      <div>
                        {/* Structured Metrics Box */}
                        <dl className="grid grid-cols-3 gap-2 bg-[#F9F8F4] rounded-2xl p-3 border border-slate-200/80 mb-4 text-center">
                          <div>
                            <dt className="text-[10px] font-semibold text-slate-500">আয়তন</dt>
                            <dd className="text-xs font-bold text-slate-900 mt-0.5 truncate">{u.area}</dd>
                          </div>
                          <div className="border-x border-slate-200 px-1">
                            <dt className="text-[10px] font-semibold text-slate-500">ইউনিয়ন</dt>
                            <dd className="text-xs font-bold text-[#0B4635] mt-0.5">{u.unionCount}</dd>
                          </div>
                          <div>
                            <dt className="text-[10px] font-semibold text-slate-500">গ্রাম</dt>
                            <dd className="text-xs font-bold text-[#C85A28] mt-0.5">
                              {detailed.villageCount}টি
                            </dd>
                          </div>
                        </dl>

                        {/* Footer Link & Real Map Quick Jump */}
                        <div className="pt-1 flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              setMapFocusUpazilaId(detailed.id);
                              setActiveTab('map');
                            }}
                            className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1"
                          >
                            <i className="fa-solid fa-location-crosshairs"></i>
                            <span>ম্যাপে দেখুন</span>
                          </button>

                          <span className="font-bold text-[#0B4635] group-hover:text-[#C85A28] flex items-center gap-1 transition-colors">
                            <span>গ্রাম তালিকা ও বিবরণ</span>
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* CRO Bottom Civic Conversion Closer Funnel */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#0B4635] via-emerald-950 to-slate-900 text-white p-6 sm:p-10 border border-emerald-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-3">
                <i className="fa-solid fa-map-location"></i>
                <span>ইউনিয়ন ও গ্রাম হালনাগাদ নেটওয়ার্ক</span>
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                আপনার ইউনিয়ন বা গ্রামের তথ্য কি অসম্পূর্ণ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                বগুড়ার ১০৮টি ইউনিয়ন ও ২,৫০০+ গ্রামের পূর্ণাঙ্গ ডাটাবেজ সমৃদ্ধ করতে আপনার এলাকার ইতিহাস, দর্শনীয় স্থান, নদী কিংবা স্থানীয় সেবা নাগরিক তথ্যভাণ্ডারে যুক্ত করুন।
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] text-amber-200 font-medium mt-4">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-amber-400"></i> জেলা প্রশাসন ও জাতীয় তথ্য বাতায়ন স্বীকৃত
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-amber-400"></i> নাগরিক অবদানকারী হিসেবে প্রোফাইল
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-amber-400"></i> ওপেন জিওগ্রাফিক ডাটাবেজ
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/contribute"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg text-center transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <i className="fa-solid fa-plus-circle text-slate-950 group-hover:rotate-90 transition-transform"></i>
                <span>ইউনিয়ন/গ্রাম তথ্য যুক্ত করুন</span>
              </Link>
              <Link
                href="/healthcare"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 text-center transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-hospital text-emerald-300"></i>
                <span>উপজেলা হাসপাতাল তালিকা</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
