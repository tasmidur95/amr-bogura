'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Upazila } from '@/lib/data/district-data';
import { boguraUpazilasData, DetailedUpazilaData, UnionData } from '@/lib/data/unions-villages-data';
import RealMap from '@/components/RealMap';
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

  const [expandedUnionId, setExpandedUnionId] = useState<string | null>(
    detailedUpz.unions[0]?.id || null
  );
  const [villageSearch, setVillageSearch] = useState<string>('');

  const handleCopyVillage = (village: string, unionName: string) => {
    navigator.clipboard?.writeText(
      `${village}, ইউনিয়ন: ${unionName}, উপজেলা: ${detailedUpz.name}, বগুড়া`
    );
    showToast(`"${village}" এর ঠিকানা কপি করা হয়েছে`);
  };

  // Filter unions or villages if user types in search
  const filteredUnions = detailedUpz.unions.filter(un => {
    if (!villageSearch.trim()) return true;
    const q = villageSearch.trim().toLowerCase();
    const matchUnion = un.name.toLowerCase().includes(q);
    const matchVillage = un.villages.some(v => v.toLowerCase().includes(q));
    return matchUnion || matchVillage;
  });

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
        {/* Real Interactive Map for this Upazila */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-1 rounded-md border border-teal-200">
                বাস্তব মানচিত্র ও অবস্থান
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1.5">
                {detailedUpz.name} উপজেলার স্যাটেলাইট ও রোডম্যাপ
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              জিপিএস অবস্থান: {detailedUpz.lat.toFixed(4)}, {detailedUpz.lng.toFixed(4)}
            </span>
          </div>

          <RealMap initialUpazilaId={detailedUpz.id} heightClass="h-[360px] sm:h-[420px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: History & All Unions + Village Directory */}
          <div className="lg:col-span-7 space-y-6">
            {/* Historical Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                {language === 'bn' ? 'ইতিহাস ও পটভূমি' : 'Historical Overview'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3 mb-3">
                {u.name} উপজেলার পরিচিতি
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {u.historyNote}
              </p>
            </div>

            {/* Complete Interactive List of Unions & Village Lists */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    ইউনিয়ন পরিষদ ও গ্রাম তালিকা ({detailedUpz.unionCount}টি ইউনিয়ন, {detailedUpz.villageCount}টি গ্রাম)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    যেকোনো ইউনিয়নে ক্লিক করে তার অন্তর্ভুক্ত সকল গ্রামের নাম দেখুন
                  </p>
                </div>

                {/* Village Quick Search inside this Upazila */}
                <div className="relative w-full sm:w-60">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    type="text"
                    value={villageSearch}
                    onChange={e => setVillageSearch(e.target.value)}
                    placeholder="গ্রাম বা ইউনিয়ন খুঁজুন..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Unions Accordion / Card List */}
              <div className="space-y-3">
                {filteredUnions.map((un, uIdx) => {
                  const isExpanded = expandedUnionId === un.id;
                  return (
                    <div
                      key={un.id}
                      className="rounded-2xl border border-slate-200/80 overflow-hidden transition"
                    >
                      <button
                        onClick={() => setExpandedUnionId(isExpanded ? null : un.id)}
                        className={`w-full p-4 flex items-center justify-between text-left transition cursor-pointer ${
                          isExpanded ? 'bg-emerald-50/70 border-b border-emerald-200/60' : 'bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {uIdx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                                {un.name} ইউনিয়ন পরিষদ
                              </h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold">
                                {un.villageCount}টি গ্রাম
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              পোস্ট কোড: {un.postCode} | অফিস: {un.officeLocation}
                            </p>
                          </div>
                        </div>

                        <i
                          className={`fa-solid fa-chevron-down text-slate-400 text-xs transition duration-300 ${
                            isExpanded ? 'rotate-180 text-emerald-800' : ''
                          }`}
                        ></i>
                      </button>

                      {/* Expanded Village List Grid */}
                      {isExpanded && (
                        <div className="p-4 bg-[#F9F8F4] space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="font-bold text-slate-700">
                              {un.name} ইউনিয়নের গ্রাম তালিকা ({un.villages.length}টি):
                            </span>
                            <span>ক্লিক করে কপি করুন</span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {un.villages.map((v, vIdx) => (
                              <button
                                key={v}
                                onClick={() => handleCopyVillage(v, un.name)}
                                className="px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 border border-slate-200/80 hover:border-emerald-300 text-xs font-semibold text-left flex items-center justify-between group transition cursor-pointer"
                              >
                                <span className="truncate">{v}</span>
                                <i className="fa-regular fa-copy text-[10px] text-slate-400 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition shrink-0 ml-1"></i>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Landmarks, Admin & Emergency Quick Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Administrative Contacts (UNO & Police) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md border border-rose-200">
                প্রশাসনিক ও থানা যোগাযোগ
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3 mb-4">
                উপজেলা প্রশাসন হটলাইন
              </h3>

              <div className="space-y-3">
                <a
                  href={`tel:${detailedUpz.unoPhone}`}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center text-xs">
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">উপজেলা নির্বাহী অফিসার (ইউএনও)</p>
                      <p className="text-xs text-slate-500 font-mono">{detailedUpz.unoPhone}</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-phone text-emerald-800 group-hover:translate-x-1 transition"></i>
                </a>

                <a
                  href={`tel:${detailedUpz.policePhone}`}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-800 text-white flex items-center justify-center text-xs">
                      <i className="fa-solid fa-shield"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{u.name} থানা অফিসার ইনচার্জ (ওসি)</p>
                      <p className="text-xs text-slate-500 font-mono">{detailedUpz.policePhone}</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-phone text-blue-800 group-hover:translate-x-1 transition"></i>
                </a>

                <a
                  href={`tel:${detailedUpz.healthPhone}`}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-700 text-white flex items-center justify-center text-xs">
                      <i className="fa-solid fa-hospital"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">উপজেলা স্বাস্থ্য কমপ্লেক্স</p>
                      <p className="text-xs text-slate-500 font-mono">{detailedUpz.healthPhone}</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-phone text-rose-700 group-hover:translate-x-1 transition"></i>
                </a>
              </div>
            </div>

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
