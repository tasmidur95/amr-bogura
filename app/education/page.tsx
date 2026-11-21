'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { EducationalInstitute } from '@/lib/types/education';

export default function EducationPage() {
  const [institutes, setInstitutes] = useState<EducationalInstitute[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'rank' | 'gpa5' | 'name'>('rank');
  const [selectedInstitute, setSelectedInstitute] = useState<EducationalInstitute | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 24;

  const upazilaList = [
    'ALL',
    'বগুড়া সদর',
    'শাজাহানপুর',
    'শেরপুর',
    'শিবগঞ্জ',
    'দুপচাঁচিয়া',
    'আদমদীঘি',
    'কাহালু',
    'গাবতলী',
    'ধুনট',
    'সারিয়াকান্দি',
    'সোনাতলা',
    'নন্দীগ্রাম'
  ];

  const categories = [
    { key: 'all', label: 'সকল প্রতিষ্ঠান', icon: 'fa-graduation-cap' },
    { key: 'school', label: 'উচ্চ বিদ্যালয়', icon: 'fa-school' },
    { key: 'madrasah', label: 'মাদ্রাসা শিক্ষা', icon: 'fa-mosque' },
    { key: 'technical', label: 'কারিগরি ও ভোকেশনাল', icon: 'fa-gears' },
    { key: 'top50', label: 'শীর্ষ ৫০ কলেজ (Sohopathi)', icon: 'fa-trophy' },
    { key: 'college', label: 'কলেজ ও বিশ্ববিদ্যালয় কলেজ', icon: 'fa-building-columns' },
    { key: 'school-college', label: 'স্কুল অ্যান্ড কলেজ', icon: 'fa-chalkboard-user' },
    { key: 'kindergarten', label: 'কিন্ডারগার্টেন ও কেজি', icon: 'fa-shapes' },
    { key: 'university', label: 'বিশ্ববিদ্যালয়', icon: 'fa-award' },
    { key: 'medical', label: 'মেডিকেল কলেজ', icon: 'fa-user-doctor' }
  ];

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/education?limit=0');
      const json = await res.json();
      if (json.success && json.data?.institutes) {
        setInstitutes(json.data.institutes);
      }
    } catch (err) {
      console.warn('Failed to load education data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic Category Count
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: institutes.length };
    counts['top50'] = institutes.filter(i => typeof i.rank === 'number' && i.rank > 0 && i.rank <= 50).length;
    institutes.forEach(i => {
      counts[i.category] = (counts[i.category] || 0) + 1;
    });
    return counts;
  }, [institutes]);

  const filteredInstitutes = useMemo(() => {
    return institutes.filter(inst => {
      // Category filter
      let matchCat = true;
      if (selectedCategory === 'top50') {
        matchCat = typeof inst.rank === 'number' && inst.rank > 0 && inst.rank <= 50;
      } else if (selectedCategory !== 'all') {
        matchCat = inst.category === selectedCategory;
      }

      // Upazila filter
      const matchUpazila = selectedUpazila === 'ALL' || inst.upazila === selectedUpazila;

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        inst.name.toLowerCase().includes(q) ||
        inst.enName.toLowerCase().includes(q) ||
        (inst.eiin && inst.eiin.includes(q)) ||
        inst.location.toLowerCase().includes(q) ||
        inst.upazila.toLowerCase().includes(q);

      return matchCat && matchUpazila && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'rank') {
        const rA = a.rank && a.rank > 0 ? a.rank : 9999;
        const rB = b.rank && b.rank > 0 ? b.rank : 9999;
        return rA - rB;
      } else if (sortBy === 'gpa5') {
        const gA = parseInt((a.stats?.gpa5 || '0').replace(/,/g, ''), 10);
        const gB = parseInt((b.stats?.gpa5 || '0').replace(/,/g, ''), 10);
        return gB - gA;
      } else {
        return a.name.localeCompare(b.name, 'bn');
      }
    });
  }, [institutes, selectedCategory, selectedUpazila, searchQuery, sortBy]);

  // Pagination slicing
  const totalPages = Math.ceil(filteredInstitutes.length / pageSize) || 1;
  const paginatedInstitutes = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInstitutes.slice(start, start + pageSize);
  }, [filteredInstitutes, currentPage, pageSize]);

  const handleCategorySelect = (key: string) => {
    setSelectedCategory(key);
    setCurrentPage(1);
  };

  const handleUpazilaSelect = (up: string) => {
    setSelectedUpazila(up);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar currentView="education" />

      {/* Hero Cover Banner Section */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <i className="fa-solid fa-graduation-cap text-amber-400"></i>
              <span>বগুড়া জেলা শিক্ষাপ্রতিষ্ঠান, মাদ্রাসা, কারিগরি ও কেজি ডিরেক্টরি</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              বগুড়ার শিক্ষা মানচিত্র: <span className="text-emerald-400 underline decoration-emerald-500/40">স্কুল, কলেজ, মাদ্রাসা ও কারিগরি</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              সোহোপ্যাথি র্যাঙ্কিং, এডুপোর্টালবিডি ডেটাবেস এবং ১২টি উপজেলার মাধ্যমিক বিদ্যালয়, মাদ্রাসা, কারিগরি ও বৃত্তিমূলক কলেজ, কিন্ডারগার্টেন এবং বিশ্ববিদ্যালয়ের সমন্বিত ডিজিটাল রেজিস্টার।
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-left">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">জেলায় মোট প্রতিষ্ঠান</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">{institutes.length > 0 ? `${institutes.length}+ টি` : '৯১৩+ টি'}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">EIIN ভেরিফায়েড রেজিস্টার</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">উচ্চ বিদ্যালয়</span>
                <span className="text-xl sm:text-2xl font-black text-teal-300">{categoryCounts['school'] || 438}টি স্কুল</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">মাধ্যমিক ও সমমান</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">মাদ্রাসা ও কারিগরি</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300">{(categoryCounts['madrasah'] || 290) + (categoryCounts['technical'] || 85)}টি</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">মাদ্রাসা, বিএম ও ভোকেশনাল</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                <span className="text-[11px] text-slate-400 block font-medium">উপজেলা কভারেজ</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-300">১২টি উপজেলা</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">সমগ্র বগুড়া জেলা নেটওয়ার্ক</span>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="pt-4 max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <i className="fa-solid fa-magnifying-glass absolute left-4 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  placeholder="প্রতিষ্ঠানের নাম, EIIN কোড বা উপজেলা লিখে খুঁজুন..."
                  className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                  >
                    মুছুন
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
        {/* Category Pills & Filters */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills with Dynamic Counts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map(cat => {
                const count = categoryCounts[cat.key] || 0;
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <i className={`fa-solid ${cat.icon} text-xs`}></i>
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Upazila & Sorting */}
            <div className="flex items-center gap-3 shrink-0">
              <select
                value={selectedUpazila}
                onChange={e => handleUpazilaSelect(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white text-slate-700 cursor-pointer focus:ring-1 focus:ring-emerald-600"
              >
                {upazilaList.map(u => (
                  <option key={u} value={u}>
                    {u === 'ALL' ? 'সকল উপজেলা' : u}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={e => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white text-slate-700 cursor-pointer focus:ring-1 focus:ring-emerald-600"
              >
                <option value="rank">র্যাঙ্কিং ক্রমানুসারে</option>
                <option value="gpa5">জিপিএ-৫ সংখ্যা</option>
                <option value="name">নামের ক্রমানুসারে</option>
              </select>
            </div>
          </div>

          {/* Active Filter Status & Result Count */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              মোট <strong className="text-emerald-800 font-bold">{filteredInstitutes.length}</strong> টি প্রতিষ্ঠান পাওয়া গেছে
              {selectedUpazila !== 'ALL' && ` (${selectedUpazila} উপজেলা)`}
              {filteredInstitutes.length > 0 && (
                <span className="text-slate-400 ml-2">
                  (পৃষ্ঠা {currentPage} / {totalPages} — প্রতি পৃষ্ঠায় {pageSize}টি)
                </span>
              )}
            </span>
            <span className="text-[11px] text-slate-400">
              উৎস: Sohopathi, EduportalBD & জেলা রেজিস্টার
            </span>
          </div>
        </div>

        {/* Institutes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 animate-pulse">
                <div className="w-full h-44 bg-slate-200 rounded-2xl"></div>
                <div className="h-5 bg-slate-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="h-10 bg-slate-100 rounded-xl"></div>
                  <div className="h-10 bg-slate-100 rounded-xl"></div>
                  <div className="h-10 bg-slate-100 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedInstitutes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedInstitutes.map(inst => (
                <div
                  key={inst.id}
                  className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Card Cover Photo with Badges */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={inst.coverImage}
                        alt={inst.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                      {/* Rank Badge */}
                      {inst.rank && inst.rank > 0 && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-md flex items-center gap-1">
                          <i className="fa-solid fa-trophy text-[10px]"></i>
                          <span>র্যাঙ্ক #{inst.rank}</span>
                        </div>
                      )}

                      {/* EIIN Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-emerald-300 font-mono text-[11px] font-bold border border-emerald-400/30">
                        EIIN: {inst.eiin}
                      </div>

                      {/* Upazila & Category bottom overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="font-semibold text-emerald-300 flex items-center gap-1">
                          <i className="fa-solid fa-location-dot text-rose-400 text-[11px]"></i>
                          {inst.upazila}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold text-slate-100 border border-white/20">
                          {inst.categoryBn}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3
                          onClick={() => setSelectedInstitute(inst)}
                          className="font-black text-slate-900 text-base leading-snug group-hover:text-emerald-800 transition cursor-pointer line-clamp-1"
                          title={inst.name}
                        >
                          {inst.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                          {inst.enName}
                        </p>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {inst.shortDesc}
                      </p>

                      {/* Academic Result Stats Grid */}
                      {inst.stats && (inst.stats.appeared || inst.stats.gpa5) && (
                        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">পরীক্ষার্থী</span>
                            <span className="text-xs font-bold text-slate-800">{inst.stats.appeared || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">পাস হার</span>
                            <span className="text-xs font-bold text-emerald-700">{inst.stats.passRate || '৯৮%'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">জিপিএ-৫</span>
                            <span className="text-xs font-black text-amber-600">{inst.stats.gpa5 || '০'}</span>
                          </div>
                        </div>
                      )}

                      {/* Management & Established Details */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
                        <span>ধরন: <strong className="text-slate-700">{inst.management}</strong></span>
                        <span>শিক্ষা স্তর: <strong className="text-slate-700 truncate max-w-[120px]">{inst.educationLevel}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                    <Link
                      href={`/education/${inst.id}`}
                      className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold text-center transition cursor-pointer"
                    >
                      পূর্ণাঙ্গ প্রোফাইল
                    </Link>

                    <button
                      onClick={() => setSelectedInstitute(inst)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center gap-1.5"
                      title="দ্রুত ওভারভিউ দেখুন"
                    >
                      <i className="fa-solid fa-eye"></i>
                      <span>প্রিভিউ</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-600">
                  পৃষ্ঠা <strong>{currentPage}</strong> / <strong>{totalPages}</strong> (মোট {filteredInstitutes.length}টি প্রতিষ্ঠান)
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(1, prev - 1));
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <i className="fa-solid fa-chevron-left mr-1"></i> পূর্ববর্তী
                  </button>

                  {/* Page window pills */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                    .map((p, idx, arr) => {
                      const prevP = arr[idx - 1];
                      const showEllipsis = prevP && p - prevP > 1;
                      return (
                        <React.Fragment key={p}>
                          {showEllipsis && <span className="px-2 text-slate-400 text-xs">...</span>}
                          <button
                            onClick={() => {
                              setCurrentPage(p);
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                              currentPage === p
                                ? 'bg-emerald-800 text-white shadow-sm'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {p}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(totalPages, prev + 1));
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    পরবর্তী <i className="fa-solid fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
            <i className="fa-solid fa-school text-4xl text-slate-300"></i>
            <h4 className="font-bold text-slate-700 text-base">কোনো শিক্ষাপ্রতিষ্ঠান পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              অনুগ্রহ করে ভিন্ন কোনো উপজেলা বা কিওয়ার্ড দিয়ে সন্ধান করুন অথবা ফিল্টার পরিবর্তন করুন।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedUpazila('ALL');
                setCurrentPage(1);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold cursor-pointer"
            >
              সকল প্রতিষ্ঠান দেখুন
            </button>
          </div>
        )}
      </main>

      {/* Quick Interactive Profile Modal */}
      {selectedInstitute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Cover Image Banner */}
            <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
              <img
                src={selectedInstitute.coverImage}
                alt={selectedInstitute.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedInstitute(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center text-sm cursor-pointer shadow-md transition"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              {/* Rank and EIIN on Banner */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {selectedInstitute.rank && selectedInstitute.rank > 0 && (
                    <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-md">
                      র্যাঙ্ক #{selectedInstitute.rank}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-emerald-300 font-mono text-xs font-bold border border-emerald-400/30">
                    EIIN: {selectedInstitute.eiin}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                  {selectedInstitute.categoryBn}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedInstitute.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 flex items-center gap-2">
                  <span>{selectedInstitute.enName}</span>
                  <span>·</span>
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <i className="fa-solid fa-location-dot text-rose-500"></i>
                    {selectedInstitute.location}
                  </span>
                </p>
              </div>

              {/* Key Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">উপজেলা</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block">{selectedInstitute.upazila}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">ব্যবস্থাপনা</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block">{selectedInstitute.management}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">শিক্ষা স্তর</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">{selectedInstitute.educationLevel}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">শিক্ষা বোর্ড</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">{selectedInstitute.board}</span>
                </div>
              </div>

              {/* Exam Results if present */}
              {selectedInstitute.stats && (selectedInstitute.stats.appeared || selectedInstitute.stats.gpa5) && (
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <i className="fa-solid fa-chart-simple"></i>
                    <span>একাডেমিক ফলাফল ও পরীক্ষার পরিসংখ্যান</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded-xl shadow-xs">
                      <span className="text-[10px] text-slate-400 block">মোট পরীক্ষার্থী</span>
                      <strong className="text-slate-800">{selectedInstitute.stats.appeared || 'N/A'}</strong>
                    </div>
                    <div className="p-2 bg-white rounded-xl shadow-xs">
                      <span className="text-[10px] text-slate-400 block">কৃতকার্য</span>
                      <strong className="text-slate-800">{selectedInstitute.stats.passed || 'N/A'}</strong>
                    </div>
                    <div className="p-2 bg-white rounded-xl shadow-xs">
                      <span className="text-[10px] text-slate-400 block">পাসের হার</span>
                      <strong className="text-emerald-700">{selectedInstitute.stats.passRate || '৯৮%'}</strong>
                    </div>
                    <div className="p-2 bg-white rounded-xl shadow-xs">
                      <span className="text-[10px] text-slate-400 block">জিপিএ-৫</span>
                      <strong className="text-amber-600">{selectedInstitute.stats.gpa5 || '০'}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <h4 className="font-bold text-slate-800 text-sm">পরিচিতি ও বিবরণ</h4>
                <p>{selectedInstitute.shortDesc}</p>
                {selectedInstitute.history && <p className="pt-1">{selectedInstitute.history}</p>}
              </div>

              {/* Facilities */}
              {selectedInstitute.facilities && selectedInstitute.facilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs">ক্যাম্পাস সুযোগ-সুবিধা</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInstitute.facilities.map((fac, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 text-xs font-medium flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-check text-[10px] text-teal-600"></i>
                        <span>{fac}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  href={`/education/${selectedInstitute.id}`}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs text-center transition shadow-md"
                >
                  বিস্তারিত প্রোফাইল পেজে যান
                </Link>

                <button
                  onClick={() => setSelectedInstitute(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav currentView="education" />
    </div>
  );
}
