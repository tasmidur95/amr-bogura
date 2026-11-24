'use client';

import Link from '@/lib/i18n/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { useToast } from '@/lib/context/ToastContext';
import { useLocalized } from '@/lib/i18n/useLocalized';

interface TransportHub {
  id: string;
  name_en: string;
  name: string;
  category: string;
  category_label: string;
  location: string;
  upazila: string;
  description: string;
  connected_routes: string[];
  facilities: string[];
  operating_hours: string;
  phone_number?: string;
  phone_numbers?: string[];
  banner_image?: string;
}

interface TransportService {
  id: string;
  operator_name_en: string;
  operator_name: string;
  service_type_en: string;
  service_type: string;
  headquarters_or_main_depot?: string;
  online_booking_url?: string;
  description: string;
  facilities: string[];
  major_routes: string[];
  counters_in_bogura?: Array<{
    counter_name: string;
    location: string;
    phone_numbers: string[];
  }>;
  phone_number?: string;
  phone_numbers?: string[];
  banner_image?: string;
}

export default function TransportPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'hub' | 'bus' | 'train' | 'rental'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hubsRaw, setHubs] = useState<TransportHub[]>([]);
  const [servicesRaw, setServices] = useState<TransportService[]>([]);
  const hubs = useLocalized(hubsRaw);
  const services = useLocalized(servicesRaw);
  const [loading, setLoading] = useState(true);
  const [selectedPhones, setSelectedPhones] = useState<{ name: string; numbers: string[] } | null>(null);

  useEffect(() => {
    async function loadTransport() {
      setLoading(true);
      try {
        const res = await fetch('/api/transport');
        const json = await res.json();
        if (json.success && json.data) {
          setHubs(json.data.transport_hubs || []);
          setServices(json.data.transport_services || []);
        }
      } catch (e) {
        console.error('Failed to load transport data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadTransport();
  }, []);

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`কপি হয়েছে: ${label} (${text})`);
    } else {
      showToast(`নম্বর: ${text}`);
    }
  };

  const filteredHubs = useMemo(() => {
    if (activeTab === 'bus' || activeTab === 'train' || activeTab === 'rental') return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return hubs;
    return hubs.filter(
      h =>
        h.name_en.toLowerCase().includes(q) ||
        h.name.includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.upazila.includes(q) ||
        h.connected_routes.some(r => r.toLowerCase().includes(q))
    );
  }, [hubs, activeTab, searchQuery]);

  const filteredServices = useMemo(() => {
    if (activeTab === 'hub') return [];
    let list = services;
    if (activeTab === 'bus') {
      list = list.filter(s => s.service_type_en === 'intercity_bus');
    } else if (activeTab === 'train') {
      list = list.filter(s => s.service_type_en === 'intercity_express_train');
    } else if (activeTab === 'rental') {
      list = list.filter(s => s.service_type_en === 'rent_a_car');
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      s =>
        s.operator_name_en.toLowerCase().includes(q) ||
        s.operator_name.includes(q) ||
        s.major_routes.some(r => r.toLowerCase().includes(q)) ||
        (s.counters_in_bogura &&
          s.counters_in_bogura.some(
            c => c.counter_name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)
          ))
    );
  }, [services, activeTab, searchQuery]);

  const busesCount = services.filter(s => s.service_type_en === 'intercity_bus').length;
  const trainsCount = services.filter(s => s.service_type_en === 'intercity_express_train').length;
  const rentalsCount = services.filter(s => s.service_type_en === 'rent_a_car').length;
  const totalResults = filteredHubs.length + filteredServices.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden w-full max-w-full">
      <Navbar currentView="transport" />

      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900 overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80"
            alt="Transport in Bogura"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 w-full min-w-0">
          <div className="flex items-center flex-wrap gap-2 text-xs font-semibold text-blue-300 mb-3 min-w-0">
            <Link href="/" className="hover:text-white transition">
              হোম
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-amber-400">যাতায়াত ও পরিবহন হাব</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl min-w-0">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
                <i className="fa-solid fa-road"></i>
                <span>উত্তরবঙ্গের প্রবেশদ্বার (Gateway to North Bengal)</span>
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">
                বগুড়ার পরিবহন হাব ও যোগাযোগ ব্যবস্থা
              </h1>
              <p className="text-blue-100/90 text-xs sm:text-base mt-2 leading-relaxed break-words">
                চারমাথা ও ঠনঠনিয়া কেন্দ্রীয় বাস টার্মিনাল, ঐতিহ্যবাহী সান্তাহার রেলওয়ে জংশন, আন্তঃজেলা দূরপাল্লার এসি/নন-এসি বাস কাউন্টার এবং ২৪/৭ রেন্ট-এ-কার সার্ভিসের বিস্তারিত ডিরেক্টরি।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
              <a
                href="#transport-list"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <i className="fa-solid fa-bus"></i>
                <span>টার্মিনাল ও সার্ভিস দেখুন</span>
              </a>
              <Link
                href="/contribute"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md transition flex items-center justify-center gap-2 text-center"
              >
                <i className="fa-solid fa-plus text-amber-300"></i>
                <span>পরিবহন তথ্য যুক্ত করুন</span>
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-8 pt-6 border-t border-blue-800/60 text-center w-full">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-amber-400">{hubs.length}</p>
              <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5 leading-tight truncate">টার্মিনাল ও স্টেশন</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-emerald-300">{busesCount}</p>
              <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5 leading-tight truncate">আন্তঃজেলা বাস</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-teal-300">{trainsCount}</p>
              <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5 leading-tight truncate">এক্সপ্রেস ট্রেন</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-rose-300">২৪/৭</p>
              <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5 leading-tight truncate">রেন্ট-এ-কার সার্ভিস</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main id="transport-list" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full min-w-0 overflow-hidden sm:overflow-visible pb-24 md:pb-12">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-200/90 shadow-2xs mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full min-w-0 max-w-full pb-1 touch-pan-x">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'all'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সবগুলো ({hubs.length + services.length})
            </button>
            <button
              onClick={() => setActiveTab('hub')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'hub'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-building-flag mr-1.5"></i>
              টার্মিনাল ও স্টেশন ({hubs.length})
            </button>
            <button
              onClick={() => setActiveTab('bus')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'bus'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-bus mr-1.5"></i>
              বাস সার্ভিস ({busesCount})
            </button>
            <button
              onClick={() => setActiveTab('train')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'train'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-train mr-1.5"></i>
              ট্রেন সার্ভিস ({trainsCount})
            </button>
            <button
              onClick={() => setActiveTab('rental')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'rental'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-car mr-1.5"></i>
              রেন্ট-এ-কার ({rentalsCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 shrink-0 min-w-0">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="টার্মিনাল, রুট বা অপারেটর..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 min-w-0"
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

        {/* CRO Quick-Search Intent Chips */}
        <div className="mb-6 -mt-3 sm:-mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs w-full min-w-0 max-w-full touch-pan-x">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <i className="fa-solid fa-route text-blue-600"></i>জনপ্রিয় অনুসন্ধান:
          </span>
          {[
            { label: 'চারমাথা কেন্দ্রীয় বাস টার্মিনাল', q: 'চারমাথা' },
            { label: 'বগুড়া রেলওয়ে স্টেশন', q: 'রেলওয়ে' },
            { label: 'শ্যামলী পরিবহন', q: 'শ্যামলী' },
            { label: 'হানিফ এন্টারপ্রাইজ', q: 'হানিফ' },
            { label: 'একতা পরিবহন', q: 'একতা' },
            { label: 'ঢাকা-বগুড়া রুট', q: 'ঢাকা' },
            { label: 'রেন্ট-এ-কার', q: 'রেন্ট' },
          ].map(chip => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setSearchQuery(chip.q)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition shrink-0 cursor-pointer ${
                searchQuery === chip.q
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80'
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
            <i className="fa-solid fa-bus text-4xl text-slate-300 mb-3"></i>
            <h3 className="text-lg font-bold text-slate-800">কোনো পরিবহন তথ্য পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে রুট বা টার্মিনালের নাম পরিবর্তন করে খুঁজুন।</p>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-10 w-full min-w-0">
            {/* Hubs Section */}
            {filteredHubs.length > 0 && (
              <div className="w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-4 sm:mb-5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-building-flag"></i>
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                      প্রধান পরিবহন হাব ও টার্মিনাল ({filteredHubs.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium shrink-0">বাস টার্মিনাল ও রেলওয়ে স্টেশন</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                  {filteredHubs.map(hub => {
                    const primaryPhone = hub.phone_number || (hub.phone_numbers && hub.phone_numbers[0]);
                    const hasMultiplePhones = hub.phone_numbers && hub.phone_numbers.length > 1;

                    return (
                      <article
                        key={hub.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group w-full min-w-0"
                      >
                        <div className="min-w-0">
                          {/* Card Header (No Card Image) */}
                          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2.5">
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200/80 truncate max-w-[140px]">
                                {hub.category_label}
                              </span>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/80 truncate max-w-[120px]">
                                {hub.upazila}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 text-lg shadow-2xs group-hover:bg-blue-700 transition-colors">
                                <i className={`fa-solid ${hub.category === 'railway' ? 'fa-train-subway' : 'fa-bus'}`}></i>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-blue-700 transition-colors">
                                  {hub.name}
                                </h3>
                                <p className="text-[10px] text-slate-400 font-mono truncate">{hub.name_en !== hub.name ? hub.name_en : ''}</p>
                                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1 min-w-0">
                                  <i className="fa-solid fa-location-dot shrink-0 text-[11px] text-amber-600"></i>
                                  <span className="truncate min-w-0 flex-1">{hub.location}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Routes & Facilities */}
                          <div className="p-4 sm:p-5 min-w-0">
                            <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                              {hub.description}
                            </p>

                            <div className="mb-3 min-w-0">
                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-800 mb-1.5 flex items-center gap-1">
                                <i className="fa-solid fa-route shrink-0"></i> প্রধান সংযুক্ত রুটসমূহ
                              </h4>
                              <div className="flex flex-wrap gap-1 min-w-0">
                                {hub.connected_routes.slice(0, 4).map((r, rIdx) => (
                                  <span
                                    key={rIdx}
                                    className="text-[11px] font-medium bg-blue-50 text-blue-900 border border-blue-200/70 px-2 py-0.5 rounded-md break-words max-w-full"
                                  >
                                    {r}
                                  </span>
                                ))}
                                {hub.connected_routes.length > 4 && (
                                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                                    +{hub.connected_routes.length - 4}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 pt-2 border-t border-slate-100 min-w-0">
                              <i className="fa-solid fa-clock shrink-0"></i>
                              <span className="truncate min-w-0 flex-1">অপারেটিং সময়: {hub.operating_hours}</span>
                            </div>
                          </div>
                        </div>

                        {/* Contact Action Bar */}
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                          {primaryPhone ? (
                            <a
                              href={`tel:${primaryPhone}`}
                              className="flex-1 min-w-0 py-2 px-2.5 sm:px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition overflow-hidden"
                            >
                              <i className="fa-solid fa-phone shrink-0 text-[11px]"></i>
                              <span className="truncate">{primaryPhone}</span>
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400 truncate flex-1 min-w-0">হটলাইন নম্বর প্রক্রিয়াধীন</span>
                          )}

                          {primaryPhone && (
                            <button
                              onClick={() => handleCopy(primaryPhone, hub.name)}
                              className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                              title="নম্বর কপি করুন"
                            >
                              <i className="fa-regular fa-copy"></i>
                            </button>
                          )}

                          {hasMultiplePhones && (
                            <button
                              onClick={() =>
                                setSelectedPhones({
                                  name: hub.name,
                                  numbers: hub.phone_numbers || [],
                                })
                              }
                              className="shrink-0 py-2 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition cursor-pointer"
                              title="সকল ফোন নম্বর দেখুন"
                            >
                              <span>+{hub.phone_numbers!.length}</span>
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Services Section */}
            {filteredServices.length > 0 && (
              <div className="pt-4 sm:pt-6 w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-4 sm:mb-5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-ticket"></i>
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                      পরিবহন অপারেটর ও এক্সপ্রেস সার্ভিস ({filteredServices.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium shrink-0">বাস, ট্রেন ও গাড়ি ভাড়া</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                  {filteredServices.map(service => {
                    const primaryPhone = service.phone_number || (service.phone_numbers && service.phone_numbers[0]);
                    const hasMultiplePhones = service.phone_numbers && service.phone_numbers.length > 1;

                    return (
                      <article
                        key={service.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group w-full min-w-0"
                      >
                        <div className="min-w-0">
                          {/* Card Header (No Card Image) */}
                          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2.5">
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80 truncate max-w-[140px]">
                                {service.service_type}
                              </span>

                              {service.online_booking_url && (
                                <a
                                  href={service.online_booking_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1 shrink-0 shadow-2xs"
                                >
                                  <span>ই-টিকেট</span>
                                  <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                                </a>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 text-lg shadow-2xs group-hover:bg-emerald-800 transition-colors">
                                <i className="fa-solid fa-bus-simple"></i>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
                                  {service.operator_name}
                                </h3>
                                <p className="text-[10px] text-slate-400 font-mono truncate">
                                  {service.operator_name_en !== service.operator_name ? service.operator_name_en : ''}
                                </p>
                                {service.headquarters_or_main_depot && (
                                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-1 min-w-0">
                                    <i className="fa-solid fa-map-pin shrink-0 text-[11px] text-emerald-600"></i>
                                    <span className="truncate min-w-0 flex-1">{service.headquarters_or_main_depot}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Major Routes & Counters */}
                          <div className="p-4 sm:p-5 min-w-0">
                            <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                              {service.description}
                            </p>

                            <div className="mb-3 min-w-0">
                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1">
                                <i className="fa-solid fa-arrows-split-up-and-left shrink-0"></i> প্রধান রুটসমূহ
                              </h4>
                              <div className="flex flex-wrap gap-1 min-w-0">
                                {service.major_routes.slice(0, 3).map((r, rIdx) => (
                                  <span
                                    key={rIdx}
                                    className="text-[11px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200/70 px-2 py-0.5 rounded-md break-words max-w-full"
                                  >
                                    {r}
                                  </span>
                                ))}
                                {service.major_routes.length > 3 && (
                                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                                    +{service.major_routes.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Counters in Bogura Summary */}
                            {service.counters_in_bogura && service.counters_in_bogura.length > 0 && (
                              <div className="pt-2 border-t border-slate-100 min-w-0">
                                <h4 className="text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                                  <span>বগুড়ার প্রধান কাউন্টারসমূহ</span>
                                  <span className="text-[10px] text-slate-400">
                                    {service.counters_in_bogura.length}টি কাউন্টার
                                  </span>
                                </h4>
                                <div className="space-y-1 min-w-0">
                                  {service.counters_in_bogura.slice(0, 2).map((cnt, cIdx) => (
                                    <div
                                      key={cIdx}
                                      className="text-xs flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-200/60 min-w-0 gap-2"
                                    >
                                      <span className="font-semibold text-slate-800 truncate min-w-0 flex-1">
                                        {cnt.counter_name}
                                      </span>
                                      <span className="font-mono text-[11px] text-emerald-700 shrink-0">
                                        {cnt.phone_numbers[0]}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Contact Action Bar */}
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                          {primaryPhone ? (
                            <a
                              href={`tel:${primaryPhone}`}
                              className="flex-1 min-w-0 py-2 px-2.5 sm:px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition overflow-hidden"
                            >
                              <i className="fa-solid fa-phone shrink-0 text-[11px]"></i>
                              <span className="truncate">{primaryPhone}</span>
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400 truncate flex-1 min-w-0">কাউন্টার থেকে টিকেট সংগ্রহ করুন</span>
                          )}

                          {primaryPhone && (
                            <button
                              onClick={() => handleCopy(primaryPhone, service.operator_name)}
                              className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                              title="নম্বর কপি করুন"
                            >
                              <i className="fa-regular fa-copy"></i>
                            </button>
                          )}

                          {hasMultiplePhones && (
                            <button
                              onClick={() =>
                                setSelectedPhones({
                                  name: service.operator_name,
                                  numbers: service.phone_numbers || [],
                                })
                              }
                              className="shrink-0 py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition cursor-pointer"
                              title="সকল ফোন নম্বর দেখুন"
                            >
                              <span>+{service.phone_numbers!.length}</span>
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
        <section className="mt-10 sm:mt-14 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-10 border border-blue-800 shadow-xl relative overflow-hidden w-full">
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 w-full">
            <div className="max-w-2xl text-center lg:text-left min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-3">
                <i className="fa-solid fa-bus"></i>
                <span>যোগাযোগ ও পরিবহন নেটওয়ার্ক</span>
              </span>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight break-words">
                আপনার বাস সার্ভিস, কাউন্টার বা রেন্ট-এ-কার কি তালিকায় বাদ পড়েছে?
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-2 leading-relaxed break-words">
                বগুড়ার হাজারো দৈনিক যাত্রী ও দূরদূরান্ত থেকে আগত মানুষদের যাতায়াত নির্বিঘ্ন করতে আপনার বাস সার্ভিস, কাউন্টারের মোবাইল নম্বর ও রুটের তথ্য যুক্ত করুন।
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[11px] text-blue-200 font-medium mt-4">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-emerald-400"></i> ১-ট্যাপে সরাসরি ফোন ও যোগাযোগ
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-emerald-400"></i> অনলাইন টিকিট বুকিং লিংক
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-emerald-400"></i> বিনামূল্যে তালিকাভুক্তি
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/contribute"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg text-center transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <i className="fa-solid fa-plus-circle text-slate-950 group-hover:rotate-90 transition-transform"></i>
                <span>পরিবহন সেবা যুক্ত করুন</span>
              </Link>
              <a
                href="https://eticket.railway.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 text-center transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-train text-amber-300"></i>
                <span>রেলওয়ে ই-টিকেট</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Multiple Phones Modal */}
      {selectedPhones && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 min-w-0">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 min-w-0">
              <div className="min-w-0 flex-1 mr-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">{selectedPhones.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">সকল বুকিং ও কাউন্টার নম্বরসমূহ</p>
              </div>
              <button
                onClick={() => setSelectedPhones(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {selectedPhones.numbers.map((phone, pIdx) => (
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
                      onClick={() => handleCopy(phone, selectedPhones.name)}
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
                onClick={() => setSelectedPhones(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav currentView="transport" />
    </div>
  );
}
