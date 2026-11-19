'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Upazila } from '@/lib/data/district-data';

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
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  return (
    <section className="animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#F9F8F4] border-b border-slate-200/90 pt-7 pb-10 sm:pt-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mb-5">
            <button
              onClick={() => onNavigate('home')}
              className="text-emerald-800 hover:text-amber-700 font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <i className="fa-solid fa-house text-xs"></i>
              <span>{t('bcHome')}</span>
            </button>
            <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
            <span className="text-slate-800 font-semibold">{t('bcUpazilas')}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header Copy & District Summary Metrics */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#C85A28] bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200">
                <i className="fa-solid fa-layer-group"></i>
                <span>{t('upzPageEyebrow')}</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B4635] tracking-tight mt-3 leading-tight">
                {t('upzPageTitle')}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed max-w-2xl">
                {t('upzPageSubtitle')}
              </p>

              {/* District Summary Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500">{t('statUpzLabel')}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0B4635] mt-0.5">{t('statUpzVal')}</p>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500">{t('statUnionLabel')}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0B4635] mt-0.5">{t('statUnionVal')}</p>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500">{t('statPouraLabel')}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#C85A28] mt-0.5">{t('statPouraVal')}</p>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500">{t('statAreaLabel')}</p>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">{t('statAreaVal')}</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Bogura District SVG Map Card */}
            <div className="lg:col-span-5">
              <figure className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm relative">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold text-[#0B4635] flex items-center gap-1.5">
                    <i className="fa-solid fa-map-location-dot text-[#C85A28]"></i>
                    <span>{t('mapCardTitle')}</span>
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {hoveredUpazila
                      ? language === 'bn'
                        ? hoveredUpazila.name
                        : hoveredUpazila.enName
                      : language === 'bn'
                      ? 'উপজেলায় ক্লিক করুন'
                      : 'Click an upazila'}
                  </span>
                </div>

                {/* Interactive SVG Map */}
                <div className="relative bg-[#F9F8F4] rounded-2xl border border-slate-200/80 p-2 overflow-hidden">
                  <svg viewBox="0 0 420 360" className="w-full h-64 sm:h-72 select-none" role="img" aria-label="বগুড়া জেলার ১২টি উপজেলার মানচিত্র">
                    {/* Jamuna River Ribbon */}
                    <path d="M325 25 C355 85, 360 155, 342 225 C330 265, 315 305, 300 340" stroke="#bae6fd" strokeWidth="18" fill="none" strokeLinecap="round" />
                    <text x="352" y="165" fill="#0369a1" fontSize="10" fontWeight="700" transform="rotate(78 352 165)">যমুনা নদী</text>

                    {/* 02. Shibganj */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(1)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(1)}
                    >
                      <polygon points="120,32 195,28 205,85 165,105 112,92" fill={hoveredIndex === 1 ? '#a7f3d0' : '#d1fae5'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="156" y="68" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="700">শিবগঞ্জ</text>
                    </g>

                    {/* 04. Sonatala */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(3)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(3)}
                    >
                      <polygon points="195,28 275,34 290,82 232,92 205,85" fill={hoveredIndex === 3 ? '#fde68a' : '#fef3c7'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="242" y="65" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="700">সোনাতলা</text>
                    </g>

                    {/* 05. Sariakandi */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(4)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(4)}
                    >
                      <polygon points="275,34 328,55 338,165 295,195 258,155 262,90 290,82" fill={hoveredIndex === 4 ? '#bae6fd' : '#e0f2fe'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="298" y="128" textAnchor="middle" fill="#075985" fontSize="11" fontWeight="700">সারিয়াকান্দি</text>
                    </g>

                    {/* 06. Gabtali */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(5)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(5)}
                    >
                      <polygon points="205,85 262,90 258,155 215,165 195,125" fill={hoveredIndex === 5 ? '#a7f3d0' : '#d1fae5'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="230" y="128" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="700">গাবতলী</text>
                    </g>

                    {/* 10. Dupchanchia */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(9)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(9)}
                    >
                      <polygon points="75,92 125,92 132,145 78,148" fill={hoveredIndex === 9 ? '#fde68a' : '#fef3c7'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="103" y="123" textAnchor="middle" fill="#92400e" fontSize="10.5" fontWeight="700">দুপচাঁচিয়া</text>
                    </g>

                    {/* 11. Adamdighi */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(10)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(10)}
                    >
                      <polygon points="32,125 78,125 84,185 36,182" fill={hoveredIndex === 10 ? '#a7f3d0' : '#d1fae5'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="58" y="158" textAnchor="middle" fill="#064e3b" fontSize="10.5" fontWeight="700">আদমদীঘি</text>
                    </g>

                    {/* 09. Kahaloo */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(8)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(8)}
                    >
                      <polygon points="84,145 148,142 152,202 88,205" fill={hoveredIndex === 8 ? '#a7f3d0' : '#ecfdf5'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="118" y="177" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="700">কাহালু</text>
                    </g>

                    {/* 01. Bogura Sadar */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(0)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(0)}
                    >
                      <polygon points="148,100 198,100 215,165 152,175" fill="#C85A28" stroke="#0B4635" strokeWidth="2" />
                      <text x="181" y="142" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="800">বগুড়া সদর</text>
                    </g>

                    {/* 12. Shajahanpur */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(11)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(11)}
                    >
                      <polygon points="152,175 215,165 225,222 156,225" fill={hoveredIndex === 11 ? '#fde68a' : '#fef3c7'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="188" y="198" textAnchor="middle" fill="#92400e" fontSize="10.5" fontWeight="700">শাজাহানপুর</text>
                    </g>

                    {/* 08. Nandigram */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(7)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(7)}
                    >
                      <polygon points="82,205 156,205 154,282 88,278" fill={hoveredIndex === 7 ? '#a7f3d0' : '#d1fae5'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="120" y="246" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="700">নন্দীগ্রাম</text>
                    </g>

                    {/* 03. Sherpur */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(2)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(2)}
                    >
                      <polygon points="156,225 232,222 238,315 162,318" fill={hoveredIndex === 2 ? '#a7f3d0' : '#ecfdf5'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="197" y="274" textAnchor="middle" fill="#064e3b" fontSize="11.5" fontWeight="700">শেরপুর</text>
                    </g>

                    {/* 07. Dhunat */}
                    <g
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onMouseEnter={() => setHoveredIndex(6)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onOpenDetail(6)}
                    >
                      <polygon points="225,165 295,195 292,285 235,288" fill={hoveredIndex === 6 ? '#fde68a' : '#fef3c7'} stroke="#0B4635" strokeWidth="1.8" />
                      <text x="262" y="236" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="700">ধুনট</text>
                    </g>

                    {/* Karatoya trace */}
                    <path d="M168 30 C164 82, 182 128, 176 185 C172 238, 192 280, 198 320" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" fill="none" pointerEvents="none" />
                  </svg>

                  {/* Tooltip */}
                  {hoveredUpazila && (
                    <div className="absolute bottom-3 left-3 right-3 bg-emerald-950/95 text-white px-3.5 py-2.5 rounded-xl text-xs shadow-lg border border-emerald-700 flex items-center justify-between pointer-events-none animate-fade-in">
                      <div>
                        <p className="font-bold text-amber-300 text-sm">
                          {language === 'bn'
                            ? `${hoveredUpazila.serialBn}. ${hoveredUpazila.name} উপজেলা`
                            : `${hoveredUpazila.serialEn}. ${hoveredUpazila.enName} Upazila`}
                        </p>
                        <p className="text-emerald-100 text-[11px]">
                          {language === 'bn'
                            ? `আয়তন: ${hoveredUpazila.area} · ${hoveredUpazila.unions}`
                            : `Area: ${hoveredUpazila.areaEn} · ${hoveredUpazila.unionCountEn}`}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold bg-white/15 px-2 py-1 rounded-lg">
                        পাতা দেখুন →
                      </span>
                    </div>
                  )}
                </div>

                <figcaption className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">
                    {language === 'bn' ? 'মানচিত্রের যেকোনো উপজেলায় ক্লিক করুন' : 'Click on any upazila on the map'}
                  </span>
                  <button
                    onClick={() => {
                      const el = document.getElementById('upazilas-directory-list');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#0B4635] hover:text-[#C85A28] flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-compass"></i>
                    <span>{t('interactiveMapBtn')}</span>
                  </button>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls + 12 Upazila Cards Grid */}
      <div id="upazilas-directory-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
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
              পৌরসভা সমৃদ্ধ (১১)
            </button>
            <button
              onClick={() => setActiveFilter('jamuna')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                activeFilter === 'jamuna'
                  ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              যমুনা ও বাঙালি তীরবর্তী
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
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4635]"
            />
          </div>
        </div>

        {/* 12-Upazila Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
              {language === 'bn'
                ? 'নির্বাচিত ফিল্টার বা অনুসন্ধানে কোনো উপজেলা পাওয়া যায়নি।'
                : 'No upazilas matched your search or filter.'}
            </div>
          ) : (
            filtered.map(u => {
              const originalIdx = upazilas.indexOf(u);
              const serial = language === 'bn' ? u.serialBn : u.serialEn;
              const title = language === 'bn' ? u.name : u.enName;
              const subTitle = language === 'bn' ? u.enName : u.name;
              const summary = language === 'bn' ? u.desc : u.enDesc;
              const areaLabel = language === 'bn' ? 'আয়তন' : 'Area';
              const areaVal = language === 'bn' ? u.area : u.areaEn;
              const unionLabel = language === 'bn' ? 'ইউনিয়ন' : 'Unions';
              const unionVal = language === 'bn' ? u.unionCount : u.unionCountEn;
              const pouraVal = language === 'bn' ? u.pourashava : u.pourashavaEn;
              const linkText = language === 'bn' ? 'উপজেলার পাতা →' : 'Upazila Page →';

              return (
                <article
                  key={u.serialBn}
                  onMouseEnter={() => setHoveredIndex(originalIdx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onOpenDetail(originalIdx)}
                  className={`group bg-white rounded-3xl p-6 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer transition ${
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
                        {pouraVal}
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
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {summary}
                    </p>
                  </div>

                  <div>
                    {/* Structured Metrics Box */}
                    <dl className="grid grid-cols-2 gap-3 bg-[#F9F8F4] rounded-2xl p-3.5 border border-slate-200/80 mb-4">
                      <div>
                        <dt className="text-[11px] font-semibold text-slate-500">{areaLabel}</dt>
                        <dd className="text-sm font-bold text-slate-900 mt-0.5">{areaVal}</dd>
                      </div>
                      <div className="border-l border-slate-200 pl-3">
                        <dt className="text-[11px] font-semibold text-slate-500">{unionLabel}</dt>
                        <dd className="text-sm font-bold text-[#0B4635] mt-0.5">{unionVal}</dd>
                      </div>
                    </dl>

                    {/* Footer Link */}
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">
                        <i className="fa-solid fa-water text-sky-600 mr-1"></i> {u.rivers}
                      </span>
                      <span className="text-sm font-bold text-[#0B4635] group-hover:text-[#C85A28] transition-colors">
                        {linkText}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
