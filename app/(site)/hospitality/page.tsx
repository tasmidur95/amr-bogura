'use client';

import Link from '@/lib/i18n/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { useToast } from '@/lib/context/ToastContext';

interface HospitalityItem {
  name: string;
  location: string;
  url?: string;
  facilities: string[];
  specialties?: string[];
  phone_number?: string;
  phone_numbers?: string[];
  banner_image?: string;
}

export default function HospitalityPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'hotel' | 'restaurant'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState<HospitalityItem[]>([]);
  const [restaurants, setRestaurants] = useState<HospitalityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemPhones, setSelectedItemPhones] = useState<{ name: string; numbers: string[] } | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch('/api/hospitality');
        const json = await res.json();
        if (json.success && json.data) {
          setHotels(json.data.hotels_and_resorts || []);
          setRestaurants(json.data.restaurants_and_doi || []);
        }
      } catch (e) {
        console.error('Failed to load hospitality data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCopyNumber = (phone: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      showToast(`কপি হয়েছে: ${label} (${phone})`);
    } else {
      showToast(`নম্বর: ${phone}`);
    }
  };

  const filteredHotels = useMemo(() => {
    if (activeTab === 'restaurant') return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return hotels;
    return hotels.filter(
      h =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.facilities.some(f => f.toLowerCase().includes(q))
    );
  }, [hotels, activeTab, searchQuery]);

  const filteredRestaurants = useMemo(() => {
    if (activeTab === 'hotel') return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return restaurants;
    return restaurants.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.facilities.some(f => f.toLowerCase().includes(q)) ||
        (r.specialties && r.specialties.some(s => s.toLowerCase().includes(q)))
    );
  }, [restaurants, activeTab, searchQuery]);

  const totalResults = filteredHotels.length + filteredRestaurants.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden w-full max-w-full">
      <Navbar currentView="hospitality" />

      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-amber-950 via-rose-950 to-slate-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-amber-900 overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
            alt="Hospitality in Bogura"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 w-full min-w-0">
          <div className="flex items-center flex-wrap gap-2 text-xs font-semibold text-amber-300 mb-3 min-w-0">
            <Link href="/" className="hover:text-white transition">
              হোম
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-amber-400">হোটেল, রিসোর্ট ও ঐতিহ্যবাহী খাবার</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl min-w-0">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
                <i className="fa-solid fa-hotel"></i>
                <span>বগুড়ার আতিথেয়তা ও রন্ধনশিল্প</span>
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">
                বগুড়ার হোটেল, রিসোর্ট ও ঐতিহ্যবাহী দই
              </h1>
              <p className="text-amber-100/90 text-xs sm:text-base mt-2 leading-relaxed break-words">
                আন্তর্জাতিক মানের ৫-তারকা মোমো ইন রিসোর্ট, নাজ গার্ডেন, হোটেল সিয়স্তা থেকে শুরু করে জিআই স্বীকৃত বিশ্বখ্যাত খাঁটি বগুড়ার দই, মিষ্টি ও গ্র্যান্ড রেস্তোরাঁর পূর্ণাঙ্গ ডিরেক্টরি।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
              <a
                href="#establishments"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <i className="fa-solid fa-utensils"></i>
                <span>তালিকা দেখুন</span>
              </a>
              <Link
                href="/contribute"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md transition flex items-center justify-center gap-2 text-center"
              >
                <i className="fa-solid fa-plus text-amber-300"></i>
                <span>নতুন প্রতিষ্ঠান যুক্ত করুন</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-8 pt-6 border-t border-amber-800/60 text-center w-full">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-amber-400">{hotels.length}</p>
              <p className="text-[11px] sm:text-xs text-amber-200 mt-0.5 leading-tight truncate">হোটেল ও রিসোর্ট</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-rose-300">{restaurants.length}</p>
              <p className="text-[11px] sm:text-xs text-amber-200 mt-0.5 leading-tight truncate">রেস্তোরাঁ ও মিষ্টি</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-emerald-300">GI</p>
              <p className="text-[11px] sm:text-xs text-amber-200 mt-0.5 leading-tight truncate">স্বীকৃত বগুড়ার দই</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-teal-300">২৪/৭</p>
              <p className="text-[11px] sm:text-xs text-amber-200 mt-0.5 leading-tight truncate">আতিথেয়তা সেবা</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main id="establishments" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full min-w-0 overflow-hidden sm:overflow-visible pb-24 md:pb-12">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-200/90 shadow-2xs mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full min-w-0 max-w-full pb-1 touch-pan-x">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সবগুলো প্রতিষ্ঠান ({hotels.length + restaurants.length})
            </button>
            <button
              onClick={() => setActiveTab('hotel')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'hotel'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-hotel mr-1.5"></i>
              হোটেল ও রিসোর্ট ({hotels.length})
            </button>
            <button
              onClick={() => setActiveTab('restaurant')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'restaurant'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-bowl-food mr-1.5"></i>
              রেস্তোরাঁ ও দই-মিষ্টি ({restaurants.length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 shrink-0 min-w-0">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="হোটেল, মিষ্টি বা এলাকার নাম..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 min-w-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer p-1"
                aria-label="ক্লিয়ার সার্চ"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* CRO Quick Intent Chips */}
        <div className="mb-6 -mt-3 sm:-mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs w-full min-w-0 max-w-full touch-pan-x">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <i className="fa-solid fa-utensils text-amber-600"></i>জনপ্রিয় অনুসন্ধান:
          </span>
          {[
            { label: 'মোমো ইন রিসোর্ট', q: 'মোমো ইন' },
            { label: 'হোটেল নাজ গার্ডেন', q: 'নাজ গার্ডেন' },
            { label: 'হোটেল সিয়স্তা', q: 'সিয়স্তা' },
            { label: 'পর্যটন মোটেল', q: 'পর্যটন' },
            { label: 'এশিয়া সুইটস', q: 'এশিয়া সুইটস' },
            { label: 'আকবরিয়া গ্র্যান্ড হোটেল', q: 'আকবরিয়া' },
            { label: 'শ্যামলী দই', q: 'শ্যামলী' },
            { label: 'সুইমিং পুল', q: 'সুইমিং' },
          ].map(chip => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setSearchQuery(chip.q)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition shrink-0 cursor-pointer ${
                searchQuery === chip.q
                  ? 'bg-amber-600 text-white font-bold'
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

        {/* Content Listing - Zero-Layout-Shift Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden space-y-3 p-4 min-w-0">
                <div className="h-44 w-full rounded-2xl skeleton-shimmer" />
                <div className="h-5 w-3/4 rounded-md skeleton-shimmer" />
                <div className="h-4 w-1/2 rounded-md skeleton-shimmer" />
                <div className="flex gap-2 pt-1">
                  <div className="h-5 w-16 rounded-md skeleton-shimmer" />
                  <div className="h-5 w-16 rounded-md skeleton-shimmer" />
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div className="h-8 w-28 rounded-xl skeleton-shimmer" />
                  <div className="h-8 w-16 rounded-xl skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-6 w-full">
            <i className="fa-solid fa-utensils text-4xl text-slate-300 mb-3"></i>
            <h3 className="text-lg font-bold text-slate-800">কোনো প্রতিষ্ঠান খুঁজে পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে অন্য নাম বা এলাকা দিয়ে অনুসন্ধান করুন।</p>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-10 w-full min-w-0">
            {/* Hotels Section */}
            {filteredHotels.length > 0 && (
              <div className="w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-4 sm:mb-5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-hotel"></i>
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                      হোটেল ও রিসোর্ট ({filteredHotels.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium shrink-0">আবাসন ও কনভেনশন</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                  {filteredHotels.map((item, idx) => {
                    const primaryPhone = item.phone_number || (item.phone_numbers && item.phone_numbers[0]);
                    const hasMultiplePhones = item.phone_numbers && item.phone_numbers.length > 1;

                    return (
                      <article
                        key={idx}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group w-full min-w-0"
                      >
                        <div className="min-w-0">
                          {/* Banner Photo */}
                          <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                            <img
                              src={
                                item.banner_image ||
                                'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
                              }
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              onError={(e: any) => {
                                e.target.src =
                                  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 truncate max-w-[130px]">
                              হোটেল / রিসোর্ট
                            </span>

                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/25 hover:bg-white/40 text-white backdrop-blur-md transition flex items-center gap-1 shrink-0"
                                title="অফিসিয়াল ওয়েবসাইট দেখুন"
                              >
                                <span>ওয়েবসাইট</span>
                                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                              </a>
                            )}

                            <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 text-white min-w-0">
                              <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-xs line-clamp-1">{item.name}</h3>
                              <p className="text-xs text-amber-300 mt-0.5 flex items-center gap-1 min-w-0">
                                <i className="fa-solid fa-location-dot shrink-0 text-[11px]"></i>
                                <span className="truncate min-w-0 flex-1">{item.location}</span>
                              </p>
                            </div>
                          </div>

                          {/* Facilities Pills */}
                          <div className="p-4 sm:p-5 min-w-0">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                              সুযোগ-সুবিধা ও সেবা
                            </h4>
                            <div className="flex flex-wrap gap-1.5 min-w-0">
                              {item.facilities.slice(0, 5).map((fac, fIdx) => (
                                <span
                                  key={fIdx}
                                  className="text-[11px] font-medium bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg break-words max-w-full"
                                >
                                  {fac}
                                </span>
                              ))}
                              {item.facilities.length > 5 && (
                                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
                                  +{item.facilities.length - 5} আরও
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Contact Action Bar */}
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                          {primaryPhone ? (
                            <a
                              href={`tel:${primaryPhone}`}
                              className="flex-1 min-w-0 py-2 px-2.5 sm:px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition overflow-hidden"
                            >
                              <i className="fa-solid fa-phone shrink-0 text-[11px]"></i>
                              <span className="truncate">{primaryPhone}</span>
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400 truncate flex-1 min-w-0">ফোন নম্বর সংরক্ষিত নেই</span>
                          )}

                          {primaryPhone && (
                            <button
                              onClick={() => handleCopyNumber(primaryPhone, item.name)}
                              className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                              title="নম্বর কপি করুন"
                            >
                              <i className="fa-regular fa-copy"></i>
                            </button>
                          )}

                          {hasMultiplePhones && (
                            <button
                              onClick={() =>
                                setSelectedItemPhones({
                                  name: item.name,
                                  numbers: item.phone_numbers || [],
                                })
                              }
                              className="shrink-0 py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition cursor-pointer"
                              title="সকল ফোন নম্বর দেখুন"
                            >
                              <span>+{item.phone_numbers!.length}</span>
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Restaurants Section */}
            {filteredRestaurants.length > 0 && (
              <div className="pt-4 sm:pt-6 w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-4 sm:mb-5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-bowl-food"></i>
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                      রেস্তোরাঁ ও ঐতিহ্যবাহী দই-মিষ্টি ({filteredRestaurants.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium shrink-0">রসনা বিলাস ও শতবর্ষী মিষ্টি</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                  {filteredRestaurants.map((item, idx) => {
                    const primaryPhone = item.phone_number || (item.phone_numbers && item.phone_numbers[0]);
                    const hasMultiplePhones = item.phone_numbers && item.phone_numbers.length > 1;

                    return (
                      <article
                        key={idx}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group w-full min-w-0"
                      >
                        <div className="min-w-0">
                          {/* Banner Photo */}
                          <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                            <img
                              src={
                                item.banner_image ||
                                'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
                              }
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              onError={(e: any) => {
                                e.target.src =
                                  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500 text-white truncate max-w-[130px]">
                              রেস্তোরাঁ / মিষ্টি
                            </span>

                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/25 hover:bg-white/40 text-white backdrop-blur-md transition flex items-center gap-1 shrink-0"
                              >
                                <span>ওয়েবসাইট</span>
                                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                              </a>
                            )}

                            <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 text-white min-w-0">
                              <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-xs line-clamp-1">{item.name}</h3>
                              <p className="text-xs text-amber-300 mt-0.5 flex items-center gap-1 min-w-0">
                                <i className="fa-solid fa-location-dot shrink-0 text-[11px]"></i>
                                <span className="truncate min-w-0 flex-1">{item.location}</span>
                              </p>
                            </div>
                          </div>

                          {/* Specialties and Facilities */}
                          <div className="p-4 sm:p-5 min-w-0">
                            {item.specialties && item.specialties.length > 0 && (
                              <div className="mb-3 min-w-0">
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-1.5 flex items-center gap-1">
                                  <i className="fa-solid fa-star text-[10px] shrink-0"></i> বিশেষ পদ ও খাবার
                                </h4>
                                <div className="flex flex-wrap gap-1.5 min-w-0">
                                  {item.specialties.map((spec, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="text-[11px] font-semibold bg-rose-50 border border-rose-200/80 text-rose-800 px-2 py-0.5 rounded-md break-words max-w-full"
                                    >
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                              সুযোগ-সুবিধা
                            </h4>
                            <div className="flex flex-wrap gap-1.5 min-w-0">
                              {item.facilities.slice(0, 4).map((fac, fIdx) => (
                                <span
                                  key={fIdx}
                                  className="text-[11px] font-medium bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg break-words max-w-full"
                                >
                                  {fac}
                                </span>
                              ))}
                              {item.facilities.length > 4 && (
                                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg shrink-0">
                                  +{item.facilities.length - 4} আরও
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Contact Action Bar */}
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                          {primaryPhone ? (
                            <a
                              href={`tel:${primaryPhone}`}
                              className="flex-1 min-w-0 py-2 px-2.5 sm:px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition overflow-hidden"
                            >
                              <i className="fa-solid fa-phone shrink-0 text-[11px]"></i>
                              <span className="truncate">{primaryPhone}</span>
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400 truncate flex-1 min-w-0">যোগাযোগ নম্বর অন-রিকোয়েস্ট</span>
                          )}

                          {primaryPhone && (
                            <button
                              onClick={() => handleCopyNumber(primaryPhone, item.name)}
                              className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                              title="নম্বর কপি করুন"
                            >
                              <i className="fa-regular fa-copy"></i>
                            </button>
                          )}

                          {hasMultiplePhones && (
                            <button
                              onClick={() =>
                                setSelectedItemPhones({
                                  name: item.name,
                                  numbers: item.phone_numbers || [],
                                })
                              }
                              className="shrink-0 py-2 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold transition cursor-pointer"
                              title="সকল ফোন নম্বর দেখুন"
                            >
                              <span>+{item.phone_numbers!.length}</span>
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CRO Bottom Civic Conversion Closer Funnel */}
        <section className="mt-10 sm:mt-14 rounded-3xl bg-gradient-to-r from-amber-950 via-rose-950 to-slate-900 text-white p-5 sm:p-10 border border-amber-800 shadow-xl relative overflow-hidden w-full">
          <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 w-full">
            <div className="max-w-2xl text-center lg:text-left min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-3">
                <i className="fa-solid fa-utensils"></i>
                <span>আতিথেয়তা ও খাবার নেটওয়ার্ক</span>
              </span>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight break-words">
                আপনার হোটেল, রিসোর্ট বা ঐতিহ্যবাহী মিষ্টির দোকান কি তালিকায় নেই?
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/90 mt-2 leading-relaxed break-words">
                বগুড়ায় আগত পর্যটক ও অতিথিদের কাছে আপনার প্রতিষ্ঠানকে বিশ্বস্তভাবে তুলে ধরতে অমর বগুড়া ডিজিটাল ডিরেক্টরিতে আপনার প্রতিষ্ঠান, যোগাযোগের নম্বর ও মেন্যু যুক্ত করুন।
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[11px] text-amber-200 font-medium mt-4">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-amber-400"></i> শতভাগ ফ্রি ব্যবসায়িক লিস্টিং
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-amber-400"></i> সরাসরি ফোন ও বুকিং সুবিধা
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-amber-400"></i> গুগল ম্যাপ লোকেশন লিংক
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/contribute"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg text-center transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <i className="fa-solid fa-plus-circle text-slate-950 group-hover:rotate-90 transition-transform"></i>
                <span>প্রতিষ্ঠান যুক্ত করুন</span>
              </Link>
              <Link
                href="/explore"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 text-center transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-landmark text-amber-300"></i>
                <span>দর্শনীয় স্থান দেখুন</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Multiple Phones Modal */}
      {selectedItemPhones && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 min-w-0">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 min-w-0">
              <div className="min-w-0 flex-1 mr-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">{selectedItemPhones.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">সকল যোগাযোগের ফোন নম্বরসমূহ</p>
              </div>
              <button
                onClick={() => setSelectedItemPhones(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {selectedItemPhones.numbers.map((phone, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/90 gap-2 min-w-0"
                >
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 truncate min-w-0 flex-1">{phone}</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <a
                      href={`tel:${phone}`}
                      className="py-1 px-2.5 sm:px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition"
                    >
                      <i className="fa-solid fa-phone text-[10px]"></i>
                      <span>কল</span>
                    </a>
                    <button
                      onClick={() => handleCopyNumber(phone, selectedItemPhones.name)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs transition cursor-pointer"
                      title="কপি করুন"
                    >
                      <i className="fa-regular fa-copy"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedItemPhones(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav currentView="hospitality" />
    </div>
  );
}
