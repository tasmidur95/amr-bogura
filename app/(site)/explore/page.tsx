'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import ExploreContributeModal from '@/components/ExploreContributeModal';
import { useToast } from '@/lib/context/ToastContext';
import { detailedExploreSpots, DetailedExploreSpot } from '@/lib/data/explore-data';

export default function ExploreIndexPage() {
  const { showToast } = useToast();
  const [spots, setSpots] = useState<DetailedExploreSpot[]>(detailedExploreSpots);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showPendingOnly, setShowPendingOnly] = useState<boolean>(false);

  // Fetch from live API / Supabase
  useEffect(() => {
    async function loadSpots() {
      try {
        const res = await fetch('/api/explore?includePending=true');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setSpots(json.data);
        }
      } catch (e) {
        // Fallback to local
      }
    }
    loadSpots();
  }, []);

  const handleSpotAdded = (newSpot: DetailedExploreSpot) => {
    setSpots(prev => [newSpot, ...prev]);
  };

  const handleAcceptSpot = async (id: string, title: string) => {
    try {
      const res = await fetch(`/api/explore/${id}`, {
        method: 'PATCH',
      });
      const json = await res.json();
      if (json.success) {
        setSpots(prev =>
          prev.map(s => (s.id === id ? { ...s, isApproved: true } : s))
        );
        showToast(`"${title}" স্থানটি সফলভাবে অনুমোদিত ও প্রদর্শিত হয়েছে!`);
      }
    } catch (e) {
      // Local fallback
      setSpots(prev =>
        prev.map(s => (s.id === id ? { ...s, isApproved: true } : s))
      );
      showToast(`"${title}" স্থানটি অনুমোদিত হয়েছে!`);
    }
  };

  const filteredSpots = spots.filter(spot => {
    if (showPendingOnly && spot.isApproved) return false;
    if (!showPendingOnly && !spot.isApproved) return false;

    const matchesCategory =
      activeCategory === 'all' || spot.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      spot.title.toLowerCase().includes(q) ||
      spot.enTitle.toLowerCase().includes(q) ||
      spot.location.toLowerCase().includes(q) ||
      spot.upazila.toLowerCase().includes(q) ||
      spot.shortDesc.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  const pendingCount = spots.filter(s => !s.isApproved).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar currentView="explore" />

      <main className="flex-1">
        {/* Explore Hero Banner (modeled on amargaibandha.bd/explore) */}
        <div className="bg-[#F9F8F4] border-b border-slate-200/90 pt-8 pb-10 sm:pt-12 sm:pb-14">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mb-5">
              <Link
                href="/"
                className="text-emerald-800 hover:text-amber-700 font-semibold flex items-center gap-1.5 transition"
              >
                <i className="fa-solid fa-house text-xs"></i>
                <span>হোম</span>
              </Link>
              <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
              <span className="text-slate-800 font-semibold">বগুড়ার দর্শনীয় স্থান</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#C85A28] bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200">
                  <i className="fa-solid fa-landmark"></i>
                  <span>ঐতিহ্য ও পর্যটন পরিক্রমা</span>
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B4635] tracking-tight mt-3 leading-tight">
                  বগুড়ার দর্শনীয় স্থান ও ঐতিহ্য
                </h1>
                <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed max-w-2xl">
                  আড়াই হাজার বছরের প্রাচীন পুণ্ড্রনগর (মহাস্থানগড়), বেহুলার বাসর ঘর, সুলতানি খেরুয়া মসজিদ এবং করতোয়া-যমুনার নয়নাভিরাম নদী পর্যটনের পূর্ণাঙ্গ গাইড।
                </p>
              </div>

              {/* Action: Open Contribute Modal or Page */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contribute"
                  className="px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-950/15 flex items-center gap-2 transition cursor-pointer"
                >
                  <i className="fa-solid fa-heart-circle-plus text-amber-300"></i>
                  <span>নাগরিক অবদান প্যানেল</span>
                </Link>

                {pendingCount > 0 && (
                  <button
                    onClick={() => setShowPendingOnly(prev => !prev)}
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      showPendingOnly
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white border border-amber-300 text-amber-800 hover:bg-amber-50'
                    }`}
                  >
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <span>অপেক্ষমাণ অবদান ({pendingCount})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-xs text-slate-500 font-medium">মোট দর্শনীয় স্থান</p>
                <p className="text-2xl font-extrabold text-[#0B4635] mt-1">{spots.length}টি</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-xs text-slate-500 font-medium">প্রত্নতাত্ত্বিক স্থান</p>
                <p className="text-2xl font-extrabold text-amber-700 mt-1">
                  {spots.filter(s => s.category === 'archaeological').length}টি
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-xs text-slate-500 font-medium">নদী ও প্রকৃতি</p>
                <p className="text-2xl font-extrabold text-sky-700 mt-1">
                  {spots.filter(s => s.category === 'nature').length}টি
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                <p className="text-xs text-slate-500 font-medium">নাগরিক অবদানকারী</p>
                <p className="text-2xl font-extrabold text-emerald-700 mt-1">
                  {new Set(spots.map(s => s.contributor.name)).size}+
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chips & Search Bar */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setShowPendingOnly(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                  activeCategory === 'all' && !showPendingOnly
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                সকল দর্শনীয় স্থান ({spots.filter(s => s.isApproved).length})
              </button>

              <button
                onClick={() => {
                  setActiveCategory('archaeological');
                  setShowPendingOnly(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                  activeCategory === 'archaeological' && !showPendingOnly
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                প্রত্নতাত্ত্বিক নিদর্শন
              </button>

              <button
                onClick={() => {
                  setActiveCategory('nature');
                  setShowPendingOnly(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                  activeCategory === 'nature' && !showPendingOnly
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                নদী ও চরাঞ্চল
              </button>

              <button
                onClick={() => {
                  setActiveCategory('heritage');
                  setShowPendingOnly(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                  activeCategory === 'heritage' && !showPendingOnly
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                স্থাপত্য ও ঐতিহ্য
              </button>

              <button
                onClick={() => {
                  setActiveCategory('religious');
                  setShowPendingOnly(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                  activeCategory === 'religious' && !showPendingOnly
                    ? 'bg-[#0B4635] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                ধর্মীয় তীর্থ ও আশ্রম
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="মহাস্থানগড়, খেরুয়া মসজিদ, যমুনা ঘাট..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4635]"
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

          {/* CRO Quick-Search Intent Chips */}
          <div className="mb-6 -mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <i className="fa-solid fa-compass text-[#C85A28]"></i>জনপ্রিয় পর্যটন স্থান:
            </span>
            {[
              { label: 'মহাস্থানগড়', q: 'মহাস্থানগড়' },
              { label: 'ভাসু বিহার', q: 'ভাসু বিহার' },
              { label: 'খেরুয়া মসজিদ', q: 'খেরুয়া' },
              { label: 'গোকুল মেধ', q: 'গোকুল মেধ' },
              { label: 'বেহুলার বাসর ঘর', q: 'বাসর ঘর' },
              { label: 'যমুনা স্পার বাঁধ', q: 'যমুনা' },
              { label: 'ভবানীপুর শক্তিপীঠ', q: 'ভবানীপুর' },
            ].map(chip => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setSearchQuery(chip.q)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition shrink-0 cursor-pointer ${
                  searchQuery === chip.q
                    ? 'bg-[#0B4635] text-white font-bold'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80'
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

          {/* Pending Submissions Alert Banner if active */}
          {showPendingOnly && (
            <div className="mb-8 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-triangle-exclamation text-amber-600 text-lg"></i>
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">নাগরিকদের প্রস্তাবিত স্থানসমূহ</h4>
                  <p className="text-xs text-amber-800">
                    এগুলো নাগরিকদের দ্বারা প্রস্তাবিত। আপনি এক ক্লিকে "অনুমোদন করুন" বাটনে চাপ দিয়ে লাইভ ডিরেক্টরিতে যুক্ত করতে পারেন।
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPendingOnly(false)}
                className="text-xs font-bold text-amber-900 underline cursor-pointer"
              >
                সব দর্শনীয় স্থানে ফিরুন
              </button>
            </div>
          )}

          {/* Spots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500">
                <i className="fa-solid fa-map-location-dot text-4xl text-slate-300 mb-3 block"></i>
                <p className="text-base font-semibold">কোনো দর্শনীয় স্থান পাওয়া যায়নি।</p>
                <p className="text-xs text-slate-400 mt-1">অনুসন্ধান পরিবর্তন করুন অথবা আপনি নিজেই নতুন কোনো স্থান যুক্ত করুন।</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  নতুন স্থান প্রস্তাব করুন
                </button>
              </div>
            ) : (
              filteredSpots.map(spot => (
                <article
                  key={spot.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 card-hover flex flex-col justify-between shadow-2xs group"
                >
                  <div>
                    {/* Cover Image Container */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <img
                        src={spot.coverImage}
                        alt={spot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e: any) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      {/* Top Badges */}
                      <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md text-emerald-200 border border-emerald-700/50">
                          {spot.categoryBn}
                        </span>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-emerald-950 shadow-xs">
                          {spot.upazila}
                        </span>
                      </div>

                      {/* Title on bottom of image */}
                      <div className="absolute bottom-3.5 inset-x-4 text-white">
                        <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block">
                          {spot.enTitle}
                        </span>
                        <h2 className="text-xl font-bold leading-tight drop-shadow-xs">
                          {spot.title}
                        </h2>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5">
                      <p className="text-xs font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
                        <i className="fa-solid fa-location-dot text-[#C85A28]"></i>
                        <span className="truncate">{spot.location}</span>
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {spot.shortDesc}
                      </p>

                      {/* Quick Timings & Entry Badge */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <i className="fa-regular fa-clock text-emerald-700"></i>
                          <span className="truncate max-w-[140px]">{spot.timings}</span>
                        </span>
                        <span className="font-semibold text-slate-700">
                          {spot.entryFee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100/80 flex items-center justify-between gap-3 bg-slate-50/50">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <i className="fa-solid fa-user-check text-emerald-700"></i>
                      <span className="truncate max-w-[110px]">{spot.contributor.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {!spot.isApproved && (
                        <button
                          onClick={() => handleAcceptSpot(spot.id, spot.title)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                        >
                          <i className="fa-solid fa-check"></i>
                          <span>অনুমোদন</span>
                        </button>
                      )}

                      <Link
                        href={`/explore/${spot.id}`}
                        className="py-2 px-3.5 rounded-xl bg-[#0B4635] hover:bg-[#C85A28] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>বিস্তারিত</span>
                        <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* CRO Bottom Civic Conversion Closer Funnel */}
          <section className="mt-14 rounded-3xl bg-gradient-to-r from-[#0B4635] via-emerald-950 to-slate-900 text-white p-6 sm:p-10 border border-emerald-800 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl text-center lg:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-3">
                  <i className="fa-solid fa-camera-retro"></i>
                  <span>নাগরিক ঐতিহ্য সংরক্ষণ</span>
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                  বগুড়ার কোন ঐতিহাসিক স্থান বা নদী পর্যটন স্পট বাদ পড়েছে?
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                  আপনার এলাকার প্রাচীন ঢিবি, টেরাকোটা মন্দির, জমিদার বাড়ি কিংবা মনকাড়া নদী পর্যটনের তথ্য ও ছবি জমা দিয়ে পুণ্ড্রবর্ধনের ইতিহাসকে ডিজিটাল আর্কাইভে অমর করে রাখুন।
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] text-amber-200 font-medium mt-4">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-check text-amber-400"></i> অবদানকারীর নাম ও নাগরিক স্বীকৃতি
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-check text-amber-400"></i> সারা দেশের পর্যটকদের নির্ভরযোগ্য গাইড
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-check text-amber-400"></i> পর্যটন পুলিশ ও জেলা প্রশাসন তথ্য
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg text-center transition flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <i className="fa-solid fa-plus-circle text-slate-950 group-hover:rotate-90 transition-transform"></i>
                  <span>নতুন দর্শনীয় স্থান যোগ করুন</span>
                </button>
                <Link
                  href="/hospitality"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 text-center transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-hotel text-amber-300"></i>
                  <span>হোটেল ও রেস্তোরাঁ</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav currentView="explore" />

      {/* Contributor Submission Modal */}
      <ExploreContributeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSpotAdded={handleSpotAdded}
      />
    </div>
  );
}

