'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  boguraUpazilasData,
  DetailedUpazilaData,
  UnionData,
  districtSummaryStats,
  searchVillages,
} from '@/lib/data/unions-villages-data';
import { useToast } from '@/lib/context/ToastContext';

interface UnionVillageExplorerProps {
  onLocateOnMap?: (lat: number, lng: number, name: string) => void;
}

export default function UnionVillageExplorer({ onLocateOnMap }: UnionVillageExplorerProps) {
  const { showToast } = useToast();

  const [selectedUpazilaId, setSelectedUpazilaId] = useState<string>('bogura-sadar');
  const [selectedUnionId, setSelectedUnionId] = useState<string>('sadar-gokul');
  const [villageSearchQuery, setVillageSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'browse' | 'search'>('browse');

  // Currently selected Upazila
  const currentUpazila = useMemo(() => {
    return boguraUpazilasData.find(u => u.id === selectedUpazilaId) || boguraUpazilasData[0];
  }, [selectedUpazilaId]);

  // Currently selected Union
  const currentUnion = useMemo(() => {
    return (
      currentUpazila.unions.find(un => un.id === selectedUnionId) ||
      currentUpazila.unions[0] ||
      null
    );
  }, [currentUpazila, selectedUnionId]);

  // Global search results across all villages
  const searchResults = useMemo(() => {
    if (!villageSearchQuery.trim()) return [];
    return searchVillages(villageSearchQuery);
  }, [villageSearchQuery]);

  const handleUpazilaChange = (upzId: string) => {
    setSelectedUpazilaId(upzId);
    const targetUpz = boguraUpazilasData.find(u => u.id === upzId);
    if (targetUpz && targetUpz.unions.length > 0) {
      setSelectedUnionId(targetUpz.unions[0].id);
    }
  };

  const handleCopyVillage = (vName: string, unName: string, upzName: string) => {
    navigator.clipboard?.writeText(`${vName}, ইউনিয়ন: ${unName}, উপজেলা: ${upzName}, বগুড়া`);
    showToast(`"${vName}" এর ঠিকানা কপি করা হয়েছে`);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Top Banner & District Summary Statistics */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/30">
              প্রশাসনিক ও ভৌগোলিক ডিরেক্টরি
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
              বগুড়ার উপজেলা, ইউনিয়ন ও গ্রাম তালিকা
            </h3>
            <p className="text-emerald-200/90 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              বগুড়া জেলার ১২টি উপজেলা, ১০৮টি প্রশাসনিক ইউনিয়ন পরিষদ এবং ২,৬৯২টি গ্রামের প্রামাণ্য তথ্যভাণ্ডার ও অবস্থান ডিরেক্টরি।
            </p>
          </div>

          {/* District Metrics Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-emerald-200 font-medium block">উপজেলা</span>
              <strong className="text-xl font-black text-amber-300">{districtSummaryStats.totalUpazilas}টি</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-emerald-200 font-medium block">ইউনিয়ন</span>
              <strong className="text-xl font-black text-white">{districtSummaryStats.totalUnions}টি</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-emerald-200 font-medium block">গ্রাম</span>
              <strong className="text-xl font-black text-amber-300">{districtSummaryStats.totalVillages}টি</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-emerald-200 font-medium block">পৌরসভা</span>
              <strong className="text-xl font-black text-white">{districtSummaryStats.totalPourashavas}টি</strong>
            </div>
          </div>
        </div>

        {/* Tab Switcher: Browse by Upazila/Union vs Instant Village Search */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-emerald-800/60">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'browse'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <i className="fa-solid fa-sitemap"></i>
            <span>উপজেলা ও ইউনিয়ন ব্রাউজ করুন</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'search'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>সরাসরি গ্রাম অনুসন্ধান</span>
          </button>
        </div>
      </div>

      {/* Main Body Content */}
      <div className="p-6 sm:p-8">
        {activeTab === 'browse' ? (
          <div className="space-y-6">
            {/* Step 1: Upazila Selector Buttons / Grid */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                ধাপ ১: উপজেলা নির্বাচন করুন ({boguraUpazilasData.length}টি উপজেলা)
              </label>
              <div className="flex flex-wrap gap-2">
                {boguraUpazilasData.map(u => {
                  const isSelected = u.id === selectedUpazilaId;
                  return (
                    <button
                      key={u.id}
                      onClick={() => handleUpazilaChange(u.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#0B4635] text-white shadow-sm ring-2 ring-[#0B4635]/30'
                          : 'bg-[#F9F8F4] hover:bg-emerald-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span className="text-[10px] opacity-70">#{u.serialBn}</span>
                      <span>{u.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200/80 text-slate-600'
                        }`}
                      >
                        {u.unionCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Union Selector for the current Upazila */}
            <div className="bg-[#F9F8F4] rounded-2xl p-4 sm:p-5 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <i className="fa-solid fa-landmark text-emerald-800"></i>
                  <span>
                    ধাপ ২: {currentUpazila.name} উপজেলার ইউনিয়ন পরিষদ ({currentUpazila.unions.length}টি)
                  </span>
                </label>
                <Link
                  href={`/upazilas/${currentUpazila.id}`}
                  className="text-xs font-bold text-[#C85A28] hover:underline self-start sm:self-auto"
                >
                  {currentUpazila.name} উপজেলার পূর্ণাঙ্গ পাতা দেখুন →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {currentUpazila.unions.map((un, uIdx) => {
                  const isCurrent = currentUnion?.id === un.id;
                  return (
                    <button
                      key={un.id}
                      onClick={() => setSelectedUnionId(un.id)}
                      className={`p-2.5 rounded-xl text-left transition cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-emerald-800 text-white shadow-md ring-2 ring-emerald-600'
                          : 'bg-white hover:bg-emerald-50/80 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold opacity-70">#{uIdx + 1}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-sm font-semibold ${
                            isCurrent ? 'bg-amber-300 text-emerald-950' : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {un.villageCount} গ্রাম
                        </span>
                      </div>
                      <p className="font-bold text-xs sm:text-sm mt-1 truncate">{un.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Current Union Profile & Full Village List */}
            {currentUnion && (
              <div className="bg-white rounded-2xl border-2 border-emerald-800/20 p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                        {currentUpazila.name} উপজেলা
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        ডাকঘর কোড: {currentUnion.postCode}
                      </span>
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-900 mt-1.5">
                      {currentUnion.name} ইউনিয়ন পরিষদ
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      📍 কার্যালয়: {currentUnion.officeLocation}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {onLocateOnMap && (
                      <button
                        onClick={() =>
                          onLocateOnMap(currentUnion.lat, currentUnion.lng, currentUnion.name)
                        }
                        className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                      >
                        <i className="fa-solid fa-crosshairs"></i>
                        <span>বাস্তব মানচিত্রে দেখুন</span>
                      </button>
                    )}
                    <a
                      href={`tel:${currentUnion.contactPhone || currentUpazila.unoPhone}`}
                      className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                    >
                      <i className="fa-solid fa-phone"></i>
                      <span>ইউনিয়ন হটলাইন</span>
                    </a>
                  </div>
                </div>

                {/* Village List Grid */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h5 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <i className="fa-solid fa-house-chimney text-[#C85A28]"></i>
                      <span>
                        {currentUnion.name} ইউনিয়নের অন্তর্ভুক্ত গ্রামসমূহ ({currentUnion.villages.length}টি)
                      </span>
                    </h5>
                    <span className="text-xs text-slate-400">ক্লিক করে ঠিকানা কপি করুন</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                    {currentUnion.villages.map((v, vIdx) => (
                      <div
                        key={v}
                        onClick={() => handleCopyVillage(v, currentUnion.name, currentUpazila.name)}
                        className="p-3 rounded-xl bg-[#F9F8F4] hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 transition cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span>গ্রাম #{vIdx + 1}</span>
                          <i className="fa-regular fa-copy opacity-0 group-hover:opacity-100 transition text-emerald-800"></i>
                        </div>
                        <p className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-900 truncate">
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tab: Instant Global Village Search */
          <div className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <label className="text-sm font-bold text-slate-800 block mb-2">
                বগুড়ার যেকোনো গ্রামের নাম লিখে অনুসন্ধান করুন:
              </label>
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  value={villageSearchQuery}
                  onChange={e => setVillageSearchQuery(e.target.value)}
                  placeholder="যেমন: গোকুল, মহাস্থান, বাগবাড়ী, চকলোকমান, পাকুল্লা, বিজরুল..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-sm font-medium transition"
                  autoFocus
                />
                {villageSearchQuery && (
                  <button
                    onClick={() => setVillageSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                টিপস: বাংলা বা ইংরেজি অক্ষরে গ্রামের নাম লিখুন। ২,৬৯২টি গ্রামের মধ্যে মিল থাকা ফলাফল প্রদর্শিত হবে।
              </p>
            </div>

            {/* Search Results Display */}
            {villageSearchQuery.trim() ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
                  <span>অনুসন্ধান ফলাফল: {searchResults.length}টি গ্রাম পাওয়া গেছে</span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {searchResults.map((res, idx) => (
                      <div
                        key={`${res.village}-${res.unionName}-${idx}`}
                        className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-emerald-500 transition shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                              পোস্ট কোড: {res.postCode}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-800">
                              {res.upazilaName} উপজেলা
                            </span>
                          </div>
                          <h6 className="font-extrabold text-base text-slate-900">গ্রাম: {res.village}</h6>
                          <p className="text-xs text-slate-600 mt-1">
                            ইউনিয়ন: <strong className="text-slate-800">{res.unionName}</strong>
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <button
                            onClick={() =>
                              handleCopyVillage(res.village, res.unionName, res.upazilaName)
                            }
                            className="text-slate-500 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer transition"
                          >
                            <i className="fa-regular fa-copy"></i>
                            <span>ঠিকানা কপি</span>
                          </button>

                          {onLocateOnMap && (
                            <button
                              onClick={() => onLocateOnMap(res.lat, res.lng, res.village)}
                              className="text-emerald-800 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer transition"
                            >
                              <span>ম্যাপে অবস্থান</span>
                              <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <i className="fa-solid fa-magnifying-glass text-3xl text-slate-300 mb-2"></i>
                    <p className="text-sm font-bold text-slate-700">কোনো গ্রাম খুঁজে পাওয়া যায়নি</p>
                    <p className="text-xs text-slate-500 mt-1">
                      বানান সঠিকভাবে লিখে পুনরায় চেষ্টা করুন অথবা উপরে উপজেলা অনুযায়ী ব্রাউজ করুন।
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                গ্রামের নাম লিখে সার্চ করুন
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
