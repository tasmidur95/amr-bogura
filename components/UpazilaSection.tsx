'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Upazila } from '@/lib/data/district-data';
import { boguraUpazilasData } from '@/lib/data/unions-villages-data';

const BoguraGeoMap = dynamic(() => import('@/components/BoguraGeoMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] sm:h-[520px] rounded-3xl bg-[#F3F6F1] animate-pulse flex items-center justify-center text-slate-400 text-xs">
      মানচিত্র লোড হচ্ছে...
    </div>
  ),
});

interface UpazilaSectionProps {
  upazilas: Upazila[];
  onNavigate: (view: string) => void;
  onOpenDetail: (index: number) => void;
  isHome?: boolean;
}

type SortKey = 'serial' | 'population' | 'area';

const toBn = (n: number | string) =>
  String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);
const fmtBn = (n: number) => toBn(n.toLocaleString('en-IN'));

export default function UpazilaSection({ upazilas, onNavigate, onOpenDetail }: UpazilaSectionProps) {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('population');

  const rows = useMemo(() => boguraUpazilasData.map((d, index) => ({ d, index })), []);

  const totals = useMemo(
    () => ({
      population: rows.reduce((s, r) => s + r.d.populationCount, 0),
      area: rows.reduce((s, r) => s + r.d.areaSqKm, 0),
      unions: rows.reduce((s, r) => s + r.d.unionCount, 0),
      villages: rows.reduce((s, r) => s + r.d.villageCount, 0),
    }),
    [rows]
  );

  const sorted = useMemo(() => {
    const copy = [...rows];
    if (sortKey === 'population') copy.sort((a, b) => b.d.populationCount - a.d.populationCount);
    else if (sortKey === 'area') copy.sort((a, b) => b.d.areaSqKm - a.d.areaSqKm);
    return copy;
  }, [rows, sortKey]);

  const maxVal = Math.max(...rows.map(r => (sortKey === 'area' ? r.d.areaSqKm : r.d.populationCount)));

  return (
    <section id="upazilas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-200">
            {t('upzBadge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">{t('upzTitle')}</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            মানচিত্রে বা তালিকায় যেকোনো উপজেলায় ক্লিক করে ইউনিয়ন, গ্রাম ও জনসংখ্যার বিস্তারিত দেখুন
          </p>
        </div>
        <button
          onClick={() => onNavigate('upazilas')}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition cursor-pointer shrink-0"
        >
          <i className="fa-solid fa-earth-americas text-amber-300"></i>
          <span>সব উপজেলা ও ইউনিয়ন ({upazilas.length})</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* District totals strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'মোট জনসংখ্যা', value: fmtBn(totals.population), tone: 'text-[#0B4635]' },
          { label: 'মোট আয়তন', value: `${fmtBn(Math.round(totals.area))} বর্গ কিমি`, tone: 'text-slate-900' },
          { label: 'ইউনিয়ন পরিষদ', value: `${toBn(totals.unions)}টি`, tone: 'text-[#0B4635]' },
          { label: 'মোট গ্রাম', value: `${fmtBn(totals.villages)}টি`, tone: 'text-[#C85A28]' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
            <p className="text-[11px] font-semibold text-slate-500">{s.label}</p>
            <p className={`text-lg sm:text-xl font-extrabold mt-0.5 ${s.tone}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Map */}
        <div className="lg:col-span-7">
          <BoguraGeoMap
            onSelectUpazila={onOpenDetail}
            hoveredIndex={hoveredIndex}
            onHoverIndex={setHoveredIndex}
            heightClass="h-[420px] sm:h-[560px]"
          />
        </div>

        {/* Summary ranking list */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col lg:h-[562px]">
          <div className="p-4 border-b border-slate-100 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-extrabold text-slate-900 text-base">উপজেলা সারসংক্ষেপ</h3>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-[11px] font-bold">
                {([
                  ['population', 'জনসংখ্যা'],
                  ['area', 'আয়তন'],
                  ['serial', 'ক্রমিক'],
                ] as [SortKey, string][]).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setSortKey(k)}
                    className={`px-2 py-1 rounded-md transition cursor-pointer ${
                      sortKey === k ? 'bg-[#0B4635] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-100">
            {sorted.map(({ d, index }) => {
              const val = sortKey === 'area' ? d.areaSqKm : d.populationCount;
              const pct = Math.max(6, (val / maxVal) * 100);
              const active = hoveredIndex === index;
              return (
                <li key={d.id}>
                  <button
                    onClick={() => onOpenDetail(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    className={`w-full text-left px-4 py-3 transition cursor-pointer group ${
                      active ? 'bg-orange-50' : 'hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                            active ? 'bg-[#C85A28] text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {d.serialBn}
                        </span>
                        <span className="font-bold text-sm text-slate-900 truncate">{d.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#0B4635] shrink-0">
                        {sortKey === 'area' ? d.area : d.population}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${active ? 'bg-[#C85A28]' : 'bg-emerald-600'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500">
                      <span>{toBn(d.unionCount)}টি ইউনিয়ন</span>
                      <span>·</span>
                      <span>{toBn(d.villageCount)}টি গ্রাম</span>
                      {d.hasPourashava && (
                        <>
                          <span>·</span>
                          <span className="text-amber-700">পৌরসভা</span>
                        </>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
