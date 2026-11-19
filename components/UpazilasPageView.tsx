'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Upazila } from '@/lib/data/district-data';
import RealMap from '@/components/RealMap';
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
  const [activeTab, setActiveTab] = useState<'cards' | 'map' | 'unions'>('cards');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mapFocusUpazilaId, setMapFocusUpazilaId] = useState<string>('all');

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

  const hoveredUpazila = hoveredIndex !== null ? upazilas[hoveredIndex] : null;

  const handleSelectFromMap = (upz: DetailedUpazilaData) => {
    const idx = boguraUpazilasData.findIndex(u => u.id === upz.id);
    if (idx !== -1) {
      onOpenDetail(idx);
    }
  };

  const handleLocateOnMap = (lat: number, lng: number, name: string) => {
    setActiveTab('map');
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
                বগুড়ার উপজেলা, ইউনিয়ন ও গ্রাম পরিষদ
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed max-w-2xl">
                বগুড়া জেলার ১২টি উপজেলা, ১২টি পৌরসভা, ১০৮টি প্রশাসনিক ইউনিয়ন এবং ২,৬৯২টি গ্রামের অবস্থান, ইতিহাস ও বাস্তব স্যাটেলাইট মানচিত্র।
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
                  <p className="text-[11px] font-semibold text-slate-500">মোট জনসংখ্যা</p>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 truncate">
                    ৩৭.৩৪ লাখ
                  </p>
                </div>
              </div>
            </div>

            {/* Right Mini Interactive SVG Map */}
            <div className="lg:col-span-5">
              <figure className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm relative">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold text-[#0B4635] flex items-center gap-1.5">
                    <i className="fa-solid fa-map-location-dot text-[#C85A28]"></i>
                    <span>দ্রুত উপজেলা পরিভ্রমণ</span>
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {hoveredUpazila ? hoveredUpazila.name : 'উপজেলায় ক্লিক করুন'}
                  </span>
                </div>

                {/* SVG Graphic */}
                <div className="relative bg-[#F9F8F4] rounded-2xl border border-slate-200/80 p-2 overflow-hidden">
                  <svg
                    viewBox="0 0 420 360"
                    className="w-full h-56 select-none"
                    role="img"
                    aria-label="বগুড়া জেলার ১২টি উপজেলার মানচিত্র"
                  >
                    <path
                      d="M325 25 C355 85, 360 155, 342 225 C330 265, 315 305, 300 340"
                      stroke="#bae6fd"
                      strokeWidth="18"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <text
                      x="352"
                      y="165"
                      fill="#0369a1"
                      fontSize="10"
                      fontWeight="700"
                      transform="rotate(78 352 165)"
                    >
                      যমুনা নদী
                    </text>

                    {/* Shibganj */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(1)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(1)}
                    >
                      <polygon
                        points="120,32 195,28 205,85 165,105 112,92"
                        fill={hoveredIndex === 1 ? '#a7f3d0' : '#d1fae5'}
                        stroke="#0B4635"
                        strokeWidth="1.8"
                      />
                      <text x="156" y="68" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="700">
                        শিবগঞ্জ
                      </text>
                    </g>

                    {/* Sonatala */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(3)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(3)}
                    >
                      <polygon
                        points="195,28 275,34 290,82 232,92 205,85"
                        fill={hoveredIndex === 3 ? '#fde68a' : '#fef3c7'}
                        stroke="#0B4635"
                        strokeWidth="1.8"
                      />
                      <text x="242" y="65" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="700">
                        সোনাতলা
                      </text>
                    </g>

                    {/* Sariakandi */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(4)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(4)}
                    >
                      <polygon
                        points="275,34 328,55 338,165 295,195 258,155 262,90 290,82"
                        fill={hoveredIndex === 4 ? '#bae6fd' : '#e0f2fe'}
                        stroke="#0B4635"
                        strokeWidth="1.8"
                      />
                      <text x="298" y="128" textAnchor="middle" fill="#075985" fontSize="11" fontWeight="700">
                        সারিয়াকান্দি
                      </text>
                    </g>

                    {/* Bogura Sadar */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(0)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(0)}
                    >
                      <polygon
                        points="165,105 215,95 225,165 178,175 148,138"
                        fill={hoveredIndex === 0 ? '#fed7aa' : '#ffedd5'}
                        stroke="#C85A28"
                        strokeWidth="2.2"
                      />
                      <text x="186" y="140" textAnchor="middle" fill="#9a3412" fontSize="11.5" fontWeight="800">
                        বগুড়া সদর
                      </text>
                    </g>

                    {/* Sherpur */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(2)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(2)}
                    >
                      <polygon
                        points="156,225 232,222 238,315 162,318"
                        fill={hoveredIndex === 2 ? '#a7f3d0' : '#ecfdf5'}
                        stroke="#0B4635"
                        strokeWidth="1.8"
                      />
                      <text x="197" y="274" textAnchor="middle" fill="#064e3b" fontSize="11.5" fontWeight="700">
                        শেরপুর
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">বাস্তব স্যাটেলাইট ম্যাপ দেখতে:</span>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="text-xs font-bold text-emerald-800 hover:text-[#C85A28] flex items-center gap-1 cursor-pointer"
                  >
                    <span>লাইভ রিয়েল ম্যাপ খুলুন</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Primary View Mode Navigation Bar */}
      <div id="main-content-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'cards'
                  ? 'bg-[#0B4635] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <i className="fa-solid fa-border-all"></i>
              <span>১২টি উপজেলা পরিচিতি</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-[#0B4635] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <i className="fa-solid fa-earth-americas text-sky-400"></i>
              <span>বাস্তব মানচিত্র (Real Map)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-400 text-emerald-950 font-black">
                লাইভ
              </span>
            </button>

            <button
              onClick={() => setActiveTab('unions')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'unions'
                  ? 'bg-[#0B4635] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <i className="fa-solid fa-sitemap text-[#C85A28]"></i>
              <span>ইউনিয়ন ও গ্রাম তালিকা (২,৬৯২ গ্রাম)</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium px-2 hidden lg:block">
            বগুড়া জেলা প্রশাসন ও স্থানীয় সরকার ডিরেক্টরি
          </div>
        </div>

        {/* Tab 1: Real Interactive Leaflet OpenStreetMap */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  বগুড়া জেলার বাস্তব স্যাটেলাইট ও প্রশাসনিক মানচিত্র
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  রোডম্যাপ ও উপগ্রহ চিত্রে বগুড়ার ১২টি উপজেলা সদর, ১০৮টি ইউনিয়ন পরিষদ এবং প্রধান ঐতিহাসিক নিদর্শনগুলোর সঠিক ভৌগোলিক অবস্থান।
                </p>
              </div>
            </div>

            <RealMap
              initialUpazilaId={mapFocusUpazilaId}
              onSelectUpazila={handleSelectFromMap}
              heightClass="h-[560px] sm:h-[660px]"
            />
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
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  সব ১২টি উপজেলা
                </button>
                <button
                  onClick={() => setActiveFilter('pourashava')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                    activeFilter === 'pourashava'
                      ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  পৌরসভা সমৃদ্ধ (১১টি)
                </button>
                <button
                  onClick={() => setActiveFilter('jamuna')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                    activeFilter === 'jamuna'
                      ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  যমুনা তীরবর্তী
                </button>
                <button
                  onClick={() => setActiveFilter('heritage')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                    activeFilter === 'heritage'
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
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0B4635]"
                />
              </div>
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

                  return (
                    <article
                      key={u.serialBn}
                      onMouseEnter={() => setHoveredIndex(originalIdx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(originalIdx)}
                      className={`group bg-white rounded-3xl p-6 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer transition shadow-2xs ${
                        hoveredIndex === originalIdx ? 'ring-2 ring-[#C85A28]' : ''
                      }`}
                    >
                      <div>
                        {/* Top Serial Number & Pourashava Badge */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="w-10 h-10 rounded-2xl bg-[#0B4635] text-white font-bold text-sm flex items-center justify-center shadow-xs group-hover:bg-[#C85A28] transition-colors">
                            {serial}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                              u.hasPourashava
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {u.pourashava}
                          </span>
                        </div>

                        {/* Upazila Name & English Subtitle */}
                        <div className="mb-2.5">
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0B4635] transition-colors">
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
      </div>
    </section>
  );
}
