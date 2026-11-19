'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Upazila } from '@/lib/data/district-data';

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
  const u = upazilas[upazilaIndex] || upazilas[0];

  const prevIdx = (upazilaIndex - 1 + upazilas.length) % upazilas.length;
  const nextIdx = (upazilaIndex + 1) % upazilas.length;
  const prevUpz = upazilas[prevIdx];
  const nextUpz = upazilas[nextIdx];

  return (
    <section className="animate-fade-in">
      {/* Detail Hero Header */}
      <div className="bg-[#F9F8F4] border-b border-slate-200/90 pt-7 pb-10 sm:pt-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mb-5">
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
              {language === 'bn' ? 'উপজেলা' : 'Upazilas'}
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
            <span>← {language === 'bn' ? 'সকল উপজেলায় ফিরুন' : 'Back to All Upazilas'}</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B4635] text-white text-xs font-bold mb-3">
                <span>উপজেলা ক্রমিক #{language === 'bn' ? u.serialBn : u.serialEn}</span>
                <span className="text-amber-300">·</span>
                <span className="text-amber-300">{u.enName} Upazila</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                {language === 'bn' ? `${u.name} উপজেলা` : `${u.enName} Upazila`}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-3xl leading-relaxed">
                {language === 'bn' ? u.desc : u.enDesc}
              </p>
            </div>
          </div>

          {/* 5 Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-8">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'আয়তন' : 'Area'}</p>
              <p className="text-base sm:text-lg font-extrabold text-[#0B4635] mt-1">{language === 'bn' ? u.area : u.areaEn}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'ইউনিয়ন সংখ্যা' : 'Unions'}</p>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">{language === 'bn' ? u.unions : u.unionCountEn}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'পৌরসভা' : 'Pourashava'}</p>
              <p className="text-sm sm:text-base font-bold text-[#C85A28] mt-1">{language === 'bn' ? u.pourashava : u.pourashavaEn}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'পোস্ট কোড' : 'Postal Code'}</p>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">{u.postalCode}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <p className="text-xs text-slate-500 font-medium">{language === 'bn' ? 'প্রধান নদ-নদী' : 'Major Rivers'}</p>
              <p className="text-sm sm:text-base font-bold text-sky-800 mt-1">{u.rivers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: History & All Unions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Historical Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                {language === 'bn' ? 'ইতিহাস ও ভৌগোলিক পরিচিতি' : 'Historical & Geographical Overview'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3 mb-3">
                {u.name} উপজেলার পটভূমি
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {u.historyNote}
              </p>
            </div>

            {/* Complete List of Unions */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {language === 'bn'
                      ? `${u.name} উপজেলার ইউনিয়নসমূহ (${u.unionCount})`
                      : `Unions of ${u.enName} (${u.unionCountEn})`}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">প্রশাসনিক ইউনিয়ন পরিষদের তালিকা</p>
                </div>
                <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm border border-emerald-200">
                  {u.unionList.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {u.unionList.map((unionName, uIdx) => (
                  <div
                    key={unionName}
                    className="px-3.5 py-2.5 rounded-xl bg-[#F9F8F4] border border-slate-200/80 flex items-center gap-2 text-sm font-semibold text-slate-800"
                  >
                    <span className="w-5 h-5 rounded-md bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {uIdx + 1}
                    </span>
                    <span className="truncate">{unionName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Landmarks & Health Quick Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Notable Landmarks */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-1 rounded-md border border-teal-200">
                দর্শনীয় ও ঐতিহাসিক স্থান
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3 mb-4">উল্লেখযোগ্য স্থান ও ঐতিহ্য</h3>
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
            </div>

            {/* Upazila Health & Emergency Quick Card */}
            <div className="bg-[#0B4635] text-white rounded-3xl p-6 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                জরুরি ও স্বাস্থ্যসেবা
              </span>
              <h3 className="text-lg font-bold mt-1">
                {u.name} উপজেলা স্বাস্থ্য ও জরুরি যোগাযোগ
              </h3>
              <p className="text-xs text-emerald-100/90 mt-1.5 leading-relaxed">
                উপজেলা স্বাস্থ্য কমপ্লেক্স ও জেলা জরুরি সেবার সাথে সরাসরি যুক্ত হোন।
              </p>

              <div className="mt-4 space-y-2.5">
                <a
                  href={`tel:${u.healthPhone}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs sm:text-sm flex items-center justify-between transition"
                >
                  <span>
                    <i className="fa-solid fa-hospital mr-1.5"></i> স্বাস্থ্য কমপ্লেক্স: {u.healthPhone}
                  </span>
                  <i className="fa-solid fa-phone"></i>
                </a>
                <button
                  onClick={() => onNavigate('home', 'community')}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm flex items-center justify-between transition cursor-pointer"
                >
                  <span>
                    <i className="fa-solid fa-droplet text-rose-300 mr-1.5"></i> {u.name} এলাকার রক্তদাতা খুঁজুন
                  </span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next Upazila Navigation Bar */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectUpazila(prevIdx)}
            className="text-left p-4 sm:p-5 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200 transition flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#0B4635] group-hover:text-white text-slate-700 flex items-center justify-center transition shrink-0">
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? '← পূর্ববর্তী উপজেলা' : '← Previous Upazila'}
              </p>
              <p className="font-bold text-slate-900 text-base mt-0.5">
                {prevUpz.serialBn}. {prevUpz.name} ({prevUpz.enName})
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectUpazila(nextIdx)}
            className="text-right p-4 sm:p-5 rounded-2xl bg-white hover:bg-emerald-50/60 border border-slate-200 transition flex items-center justify-end gap-3.5 cursor-pointer group"
          >
            <div>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'bn' ? 'পরবর্তী উপজেলা →' : 'Next Upazila →'}
              </p>
              <p className="font-bold text-slate-900 text-base mt-0.5">
                {nextUpz.serialBn}. {nextUpz.name} ({nextUpz.enName})
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#0B4635] group-hover:text-white text-slate-700 flex items-center justify-center transition shrink-0">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
