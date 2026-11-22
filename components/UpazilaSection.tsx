'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Upazila } from '@/lib/data/district-data';

interface UpazilaSectionProps {
  upazilas: Upazila[];
  onNavigate: (view: string) => void;
  onOpenDetail: (index: number) => void;
  isHome?: boolean;
}

export default function UpazilaSection({
  upazilas,
  onNavigate,
  onOpenDetail,
  isHome = false,
}: UpazilaSectionProps) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = upazilas.filter(u => {
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.enName.toLowerCase().includes(q) ||
      u.landmark.toLowerCase().includes(q)
    );
  });

  const displayedUpazilas = isHome && !searchQuery ? filtered.slice(0, 6) : filtered;

  return (
    <section id="upazilas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-200">
            {t('upzBadge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {t('upzTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('upzSubtitle')}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-56">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="উপজেলা খুঁজুন..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <button
            onClick={() => onNavigate('upazilas')}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition cursor-pointer shrink-0"
          >
            <i className="fa-solid fa-earth-americas text-amber-300"></i>
            <span>মানচিত্র ও গ্রাম তালিকা ({upazilas.length})</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedUpazilas.map((u, idx) => {
          const originalIdx = upazilas.indexOf(u);
          const serial = language === 'bn' ? u.serialBn : u.serialEn;
          const name = language === 'bn' ? u.name : u.enName;
          const subName = language === 'bn' ? u.enName : u.name;

          return (
            <button
              key={u.serialBn}
              onClick={() => onOpenDetail(originalIdx)}
              className="text-left bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 card-hover flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    {serial}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-emerald-700 transition-colors">
                    {subName}{' '}
                    <i className="fa-solid fa-arrow-up-right-from-square ml-0.5 text-[10px]"></i>
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-800 transition-colors">
                  {name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {u.landmark}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-emerald-800">
                <span>{language === 'bn' ? u.unions : u.unionCountEn}</span>
                <span className="text-amber-700">{language === 'bn' ? u.area : u.areaEn}</span>
              </div>
            </button>
          );
        })}

        {isHome && !searchQuery && (
          <div className="col-span-full mt-2 p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 via-slate-50 to-emerald-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  শীর্ষ ৬টি উপজেলা প্রদর্শিত
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  বগুড়া জেলায় মোট ১২টি উপজেলা ও ১০৮টি ইউনিয়ন
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                বগুড়ার সকল ১২টি উপজেলার বিস্তারিত প্রোফাইল ও মানচিত্র
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                শেরপুর, শিবগঞ্জ, শাজাহানপুর, দুপচাঁচিয়া, সারিয়াকান্দিসহ সকল উপজেলার জনসংখ্যা, ঐতিহাসিক স্থান ও ইউনিয়ন তালিকা।
              </p>
            </div>
            <button
              onClick={() => onNavigate('upazilas')}
              className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 shrink-0 transition cursor-pointer"
            >
              <span>সকল ১২টি উপজেলা দেখুন</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

