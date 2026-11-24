'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { useToast } from '@/lib/context/ToastContext';
import { BankItem, AtmBoothItem, BankingData } from '@/lib/services/banking.service';

export default function BankingPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'central' | 'bank' | 'atm' | 'islamic' | 'crm' | 'state'>('all');
  const [selectedUpazila, setSelectedUpazila] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [bankingData, setBankingData] = useState<BankingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBankPhones, setSelectedBankPhones] = useState<{ name: string; numbers: string[] } | null>(null);

  const upazilaOptions = [
    'ALL',
    'বগুড়া সদর',
    'শেরপুর',
    'শিবগঞ্জ',
    'শাজাহানপুর',
    'দুপচাঁচিয়া',
    'সারিয়াকান্দি',
    'সোনাতলা',
    'গাবতলী',
    'কাহালু',
    'নন্দীগ্রাম',
    'আদমদীঘি',
    'ধুনট',
  ];

  useEffect(() => {
    async function loadBanking() {
      setLoading(true);
      try {
        const res = await fetch('/api/banking');
        const json = await res.json();
        if (json.success && json.data) {
          setBankingData(json.data);
        }
      } catch (e) {
        console.error('Failed to load banking data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadBanking();
  }, []);

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`কপি হয়েছে: ${label} (${text})`);
    } else {
      showToast(`নম্বর: ${text}`);
    }
  };

  const centralBank = useMemo(() => {
    if (!bankingData?.central_and_regulatory) return [];
    if (activeTab === 'bank' || activeTab === 'atm' || activeTab === 'islamic') return [];
    let list = bankingData.central_and_regulatory;
    if (selectedUpazila !== 'ALL') list = list.filter(b => b.upazila === selectedUpazila);
    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;
    return list.filter(
      b =>
        b.bank_name.toLowerCase().includes(q) ||
        b.bank_name_bn.includes(q) ||
        b.branch_name.toLowerCase().includes(q) ||
        b.branch_name_bn.includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.routing_number.includes(q) ||
        (b.swift_code && b.swift_code.toLowerCase().includes(q))
    );
  }, [bankingData, activeTab, selectedUpazila, searchQuery]);

  const filteredBanks = useMemo(() => {
    if (!bankingData?.banks) return [];
    if (activeTab === 'central' || activeTab === 'atm') return [];
    let list = bankingData.banks;

    if (activeTab === 'islamic') {
      list = list.filter(b => b.type === 'islamic_commercial');
    } else if (activeTab === 'crm') {
      list = list.filter(b => b.has_crm);
    } else if (activeTab === 'state') {
      list = list.filter(b => b.type === 'state_owned_commercial' || b.type === 'specialized_agricultural');
    }

    if (selectedUpazila !== 'ALL') {
      list = list.filter(b => b.upazila === selectedUpazila);
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      b =>
        b.bank_name.toLowerCase().includes(q) ||
        b.bank_name_bn.includes(q) ||
        b.branch_name.toLowerCase().includes(q) ||
        b.branch_name_bn.includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.routing_number.includes(q) ||
        (b.swift_code && b.swift_code.toLowerCase().includes(q)) ||
        b.facilities.some(f => f.toLowerCase().includes(q))
    );
  }, [bankingData, activeTab, selectedUpazila, searchQuery]);

  const filteredAtms = useMemo(() => {
    if (!bankingData?.atm_and_fast_track_booths) return [];
    if (activeTab === 'central' || activeTab === 'bank' || activeTab === 'state') return [];
    let list = bankingData.atm_and_fast_track_booths;

    if (activeTab === 'islamic') {
      list = list.filter(
        a => a.bank_name.toLowerCase().includes('islam') || a.booth_name.toLowerCase().includes('islam')
      );
    } else if (activeTab === 'crm') {
      list = list.filter(a =>
        a.services.some(s => s.toLowerCase().includes('deposit') || s.includes('সিআরএম') || s.includes('জমা'))
      );
    }

    if (selectedUpazila !== 'ALL') {
      list = list.filter(a => a.upazila === selectedUpazila);
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      a =>
        a.booth_name.toLowerCase().includes(q) ||
        a.bank_name.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.cards_accepted.some(c => c.toLowerCase().includes(q)) ||
        a.services.some(s => s.toLowerCase().includes(q))
    );
  }, [bankingData, activeTab, selectedUpazila, searchQuery]);

  const totalResults = centralBank.length + filteredBanks.length + filteredAtms.length;

  const stats = useMemo(() => {
    const rawBanks = bankingData?.banks || [];
    const centralCount = bankingData?.central_and_regulatory?.length || 0;
    const atmsCount = bankingData?.atm_and_fast_track_booths?.length || 0;
    const islamicCount = rawBanks.filter(b => b.type === 'islamic_commercial').length;
    const crmCount =
      rawBanks.filter(b => b.has_crm).length +
      (bankingData?.atm_and_fast_track_booths?.filter(a =>
        a.services.some(s => s.toLowerCase().includes('deposit') || s.includes('সিআরএম') || s.includes('জমা'))
      ).length || 0);

    return {
      totalBranches: rawBanks.length + centralCount,
      totalAtms: atmsCount,
      totalIslamic: islamicCount,
      totalCrms: crmCount,
    };
  }, [bankingData]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden w-full max-w-full">
      <Navbar currentView="banking" />

      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-950 via-emerald-950 to-blue-950 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1600&q=80"
            alt="Banking in Bogura"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 w-full min-w-0">
          <div className="flex items-center flex-wrap gap-2 text-xs font-semibold text-emerald-300 mb-3 min-w-0">
            <Link href="/" className="hover:text-white transition">
              হোম
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-amber-400">ব্যাংক ও এটিএম ডিরেক্টরি</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl min-w-0">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
                <i className="fa-solid fa-building-columns"></i>
                <span>আর্থিক হাব ও নিরাপদ লেনদেন (Financial Hub & ATM Network)</span>
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">
                বগুড়ার ব্যাংক শাখা ও ২৪/৭ এটিএম বুথ নির্দেশিকা
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-base mt-2 leading-relaxed break-words">
                বাংলাদেশ ব্যাংক বগুড়া কার্যালয়, সোনালী, জনতা, অগ্রণী, ডাচ্-বাংলা, ব্র্যাক, ইসলামী ব্যাংকসহ সকল তফসিলি ব্যাংকের প্রধান শাখা, রাউটিং নম্বর, সুইফট কোড এবং সার্বক্ষণিক এটিএম/সিআরএম বুথের পূর্ণাঙ্গ ডিরেক্টরি।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
              <a
                href="#banking-list"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <i className="fa-solid fa-building-columns"></i>
                <span>শাখা ও বুথ দেখুন</span>
              </a>
              <Link
                href="/contribute"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md transition flex items-center justify-center gap-2 text-center"
              >
                <i className="fa-solid fa-plus text-amber-300"></i>
                <span>ব্যাংক তথ্য যুক্ত করুন</span>
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-8 pt-6 border-t border-emerald-800/60 text-center w-full">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-amber-400">{stats.totalBranches}</p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 leading-tight truncate">তফসিলি ব্যাংক শাখা</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-emerald-300">{stats.totalAtms}+</p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 leading-tight truncate">২৪/৭ এটিএম বুথ</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-teal-300">{stats.totalIslamic}</p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 leading-tight truncate">ইসলামী ব্যাংকিং</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-rose-300">{stats.totalCrms}</p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 leading-tight truncate">নগদ জমা (CRM)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main id="banking-list" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full min-w-0 overflow-hidden sm:overflow-visible pb-24 md:pb-12">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-5 border border-slate-200/90 shadow-2xs mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full min-w-0 max-w-full pb-1 touch-pan-x">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সবগুলো ({(bankingData?.banks?.length || 0) + (bankingData?.atm_and_fast_track_booths?.length || 0) + (bankingData?.central_and_regulatory?.length || 0)})
            </button>
            <button
              onClick={() => setActiveTab('bank')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'bank'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-building-columns mr-1.5"></i>
              বাণিজ্যিক ব্যাংক ({bankingData?.banks?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('atm')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'atm'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-credit-card mr-1.5"></i>
              ২৪/৭ এটিএম বুথ ({bankingData?.atm_and_fast_track_booths?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('islamic')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'islamic'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-moon mr-1.5"></i>
              ইসলামী ব্যাংক ({stats.totalIslamic})
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'crm'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-money-bill-transfer mr-1.5"></i>
              নগদ জমা (CRM) ({stats.totalCrms})
            </button>
            <button
              onClick={() => setActiveTab('state')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'state'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-landmark mr-1.5"></i>
              রাষ্ট্রায়ত্ত ব্যাংক
            </button>
            <button
              onClick={() => setActiveTab('central')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer shrink-0 ${
                activeTab === 'central'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-building-flag mr-1.5"></i>
              বাংলাদেশ ব্যাংক
            </button>
          </div>

          {/* Search & Upazila Select */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 min-w-0">
            <select
              value={selectedUpazila}
              onChange={e => setSelectedUpazila(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              {upazilaOptions.map(u => (
                <option key={u} value={u}>
                  {u === 'ALL' ? 'সকল উপজেলা' : u}
                </option>
              ))}
            </select>

            <div className="relative w-full sm:w-64 shrink-0 min-w-0">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ব্যাংক, শাখা বা রাউটিং..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 min-w-0"
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
        </div>

        {/* CRO Quick-Search Intent Chips */}
        <div className="mb-6 -mt-3 sm:-mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs w-full min-w-0 max-w-full touch-pan-x">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <i className="fa-solid fa-magnifying-glass text-emerald-600"></i>জনপ্রিয় অনুসন্ধান:
          </span>
          {[
            { label: 'সাতমাথা শাখা', q: 'সাতমাথা' },
            { label: 'বড়গোলা', q: 'বড়গোলা' },
            { label: 'ডাচ্-বাংলা ফাস্ট ট্র্যাক', q: 'ডাচ্-বাংলা' },
            { label: 'ইসলামী ব্যাংক সিআরএম', q: 'ইসলামী ব্যাংক' },
            { label: 'ব্র্যাক ব্যাংক', q: 'ব্র্যাক' },
            { label: 'সোনালী ব্যাংক কর্পোরেট', q: 'সোনালী' },
            { label: 'রাকাব কৃষি ঋণ', q: 'রাকাব' },
            { label: 'বাংলাদেশ ব্যাংক', q: 'বাংলাদেশ ব্যাংক' },
          ].map(chip => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setSearchQuery(chip.q)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition shrink-0 cursor-pointer ${
                searchQuery === chip.q
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80'
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
            <i className="fa-solid fa-building-columns text-4xl text-slate-300 mb-3"></i>
            <h3 className="text-lg font-bold text-slate-800">কোনো ব্যাংক বা এটিএম বুথ পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে ভিন্ন নাম, এলাকা বা রাউটিং নম্বর দিয়ে খুঁজুন।</p>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-10 w-full min-w-0">
            {/* Central Bank Featured Highlight */}
            {centralBank.length > 0 && (
              <div className="w-full min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-sm font-bold shrink-0">
                    <i className="fa-solid fa-scale-balanced"></i>
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    কেন্দ্রীয় ব্যাংক ও মুদ্রা কর্তৃপক্ষ
                  </h2>
                </div>

                {centralBank.map(cb => (
                  <article
                    key={cb.id}
                    className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 sm:p-7 border border-emerald-800 shadow-lg relative overflow-hidden group min-w-0 w-full"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                      <div className="max-w-2xl min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
                            {cb.type_bn}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-xs font-mono font-bold">
                            রাউটিং: {cb.routing_number}
                          </span>
                          {cb.swift_code && (
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-mono">
                              SWIFT: {cb.swift_code}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">{cb.bank_name_bn}</h3>
                        <p className="text-xs text-slate-300 font-mono mt-0.5">{cb.bank_name}</p>
                        <p className="text-xs text-amber-300 mt-2 flex items-center gap-1.5">
                          <i className="fa-solid fa-location-dot"></i>
                          <span>{cb.location}</span>
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {cb.facilities.map((fac, fIdx) => (
                            <span
                              key={fIdx}
                              className="text-[11px] bg-white/10 border border-white/15 text-emerald-200 px-2.5 py-0.5 rounded-lg"
                            >
                              {fac}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-2.5 shrink-0">
                        <a
                          href={`tel:${cb.phone_number}`}
                          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition"
                        >
                          <i className="fa-solid fa-phone"></i>
                          <span>{cb.phone_number}</span>
                        </a>
                        <button
                          onClick={() =>
                            setSelectedBankPhones({
                              name: cb.bank_name_bn,
                              numbers: cb.phone_numbers,
                            })
                          }
                          className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <i className="fa-solid fa-address-book"></i>
                          <span>সকল টেলিফোন নম্বর</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Commercial Banks Section */}
            {filteredBanks.length > 0 && (
              <div className="w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-4 sm:mb-5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-building-columns"></i>
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                      তফসিলি ব্যাংক শাখা ({filteredBanks.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium shrink-0">রাউটিং নম্বর, সুইফট ও শাখা সেবা</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                  {filteredBanks.map(bank => {
                    const primaryPhone = bank.phone_number || (bank.phone_numbers && bank.phone_numbers[0]);
                    const hasMultiplePhones = bank.phone_numbers && bank.phone_numbers.length > 1;

                    return (
                      <article
                        key={bank.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group w-full min-w-0"
                      >
                        <div className="min-w-0">
                          {/* Card Header (No Card Image) */}
                          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2.5">
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80 truncate max-w-[150px]">
                                {bank.type_bn}
                              </span>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/80 truncate max-w-[120px]">
                                {bank.upazila}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 text-lg shadow-2xs group-hover:bg-emerald-800 transition-colors">
                                <i className="fa-solid fa-building-columns"></i>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
                                  {bank.bank_name_bn}
                                </h3>
                                <p className="text-xs text-emerald-700 font-semibold truncate">{bank.branch_name_bn}</p>
                                <p className="text-[10px] text-slate-400 font-mono truncate">{bank.bank_name} • {bank.branch_name}</p>
                              </div>
                            </div>
                          </div>

                          {/* Routing & Features Box */}
                          <div className="p-4 sm:p-5 min-w-0">
                            {/* Routing & Swift chips with 1-tap copy */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-3">
                              <button
                                onClick={() => handleCopy(bank.routing_number, `${bank.bank_name_bn} রাউটিং নম্বর`)}
                                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100 transition cursor-pointer"
                                title="রাউটিং নম্বর কপি করুন"
                              >
                                <span className="text-emerald-700 font-sans font-semibold">রাউটিং:</span>
                                <span>{bank.routing_number}</span>
                                <i className="fa-regular fa-copy text-[10px] ml-0.5 text-emerald-600"></i>
                              </button>

                              {bank.swift_code && (
                                <button
                                  onClick={() => handleCopy(bank.swift_code!, `${bank.bank_name_bn} সুইফট কোড`)}
                                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200/80 hover:bg-slate-200 transition cursor-pointer"
                                  title="সুইফট কোড কপি করুন"
                                >
                                  <span className="text-slate-500 font-sans font-semibold">SWIFT:</span>
                                  <span>{bank.swift_code}</span>
                                  <i className="fa-regular fa-copy text-[10px] ml-0.5 text-slate-500"></i>
                                </button>
                              )}
                            </div>

                            {/* Location line */}
                            <p className="text-xs text-slate-600 mb-3 flex items-start gap-1.5 min-w-0">
                              <i className="fa-solid fa-location-dot text-emerald-600 mt-0.5 shrink-0"></i>
                              <span className="line-clamp-2 leading-relaxed">{bank.location}</span>
                            </p>

                            {/* ATM / CRM Capability badges */}
                            <div className="flex items-center gap-1.5 mb-3">
                              {bank.has_atm && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                  <i className="fa-solid fa-credit-card text-[9px]"></i> ২৪/৭ এটিএম
                                </span>
                              )}
                              {bank.has_crm && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                                  <i className="fa-solid fa-money-bill-transfer text-[9px]"></i> সিআরএম নগদ জমা
                                </span>
                              )}
                              <span className="text-[10px] font-semibold text-slate-500 ml-auto flex items-center gap-1">
                                <i className="fa-solid fa-clock text-[9px]"></i> {bank.operating_hours.split('(')[0]}
                              </span>
                            </div>

                            {/* Facilities summary */}
                            <div className="pt-2 border-t border-slate-100">
                              <div className="flex flex-wrap gap-1 min-w-0">
                                {bank.facilities.slice(0, 3).map((f, fIdx) => (
                                  <span
                                    key={fIdx}
                                    className="text-[10px] bg-slate-50 border border-slate-200/70 text-slate-600 px-2 py-0.5 rounded-md break-words max-w-full"
                                  >
                                    {f}
                                  </span>
                                ))}
                                {bank.facilities.length > 3 && (
                                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                                    +{bank.facilities.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
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
                            <span className="text-xs text-slate-400 truncate flex-1 min-w-0">ফোন নম্বর প্রক্রিয়াধীন</span>
                          )}

                          {primaryPhone && (
                            <button
                              onClick={() => handleCopy(primaryPhone, bank.bank_name_bn)}
                              className="shrink-0 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                              title="নম্বর কপি করুন"
                            >
                              <i className="fa-regular fa-copy"></i>
                            </button>
                          )}

                          {bank.hotline && (
                            <a
                              href={`tel:${bank.hotline}`}
                              className="shrink-0 py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-mono font-bold transition flex items-center gap-1"
                              title="হটলাইন কল"
                            >
                              <i className="fa-solid fa-headset text-[10px] text-amber-600"></i>
                              <span>{bank.hotline}</span>
                            </a>
                          )}

                          {hasMultiplePhones && (
                            <button
                              onClick={() =>
                                setSelectedBankPhones({
                                  name: `${bank.bank_name_bn} (${bank.branch_name_bn})`,
                                  numbers: bank.phone_numbers,
                                })
                              }
                              className="shrink-0 py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition cursor-pointer"
                              title="সকল ফোন নম্বর দেখুন"
                            >
                              <span>+{bank.phone_numbers.length}</span>
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 24/7 ATM and Fast Track Booths Section */}
            {filteredAtms.length > 0 && (
              <div className="pt-4 sm:pt-6 w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-4 sm:mb-5 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-credit-card"></i>
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                      ২৪/৭ এটিএম ও ফাস্ট ট্র্যাক বুথ ({filteredAtms.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium shrink-0">সার্বক্ষণিক ক্যাশ আউট ও সিআরএম ডিপোজিট</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                  {filteredAtms.map(atm => (
                    <article
                      key={atm.id}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group w-full min-w-0"
                    >
                      <div className="min-w-0">
                        {/* Card Header (No Card Image) */}
                        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200/80 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
                              <span>{atm.operating_hours}</span>
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/80 truncate max-w-[120px]">
                              {atm.upazila}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 text-lg shadow-2xs group-hover:bg-teal-800 transition-colors">
                              <i className="fa-solid fa-credit-card"></i>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-teal-800 transition-colors">
                                {atm.booth_name}
                              </h3>
                              <p className="text-xs text-teal-700 font-semibold truncate">{atm.bank_name}</p>
                            </div>
                          </div>
                        </div>

                        {/* Location and Cards Accepted */}
                        <div className="p-4 sm:p-5 min-w-0">
                          <p className="text-xs text-slate-600 mb-3 flex items-start gap-1.5 min-w-0">
                            <i className="fa-solid fa-location-dot text-teal-600 mt-0.5 shrink-0"></i>
                            <span className="line-clamp-2 leading-relaxed">{atm.location}</span>
                          </p>

                          {/* Accepted Cards */}
                          <div className="mb-3">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                              <i className="fa-solid fa-credit-card text-[10px]"></i> গ্রহণযোগ্য কার্ডসমূহ
                            </h4>
                            <div className="flex flex-wrap gap-1 min-w-0">
                              {atm.cards_accepted.map((c, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200/80 px-2 py-0.5 rounded-md"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Services */}
                          <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                              <i className="fa-solid fa-gears text-[10px]"></i> বুথ সুবিধাসমূহ
                            </h4>
                            <div className="flex flex-wrap gap-1 min-w-0">
                              {atm.services.map((s, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[11px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200/70 px-2 py-0.5 rounded-md"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Action Bar */}
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 min-w-0">
                        <a
                          href={`tel:${atm.hotline}`}
                          className="flex-1 py-2 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition"
                        >
                          <i className="fa-solid fa-phone"></i>
                          <span>ব্যাংক হেল্পলাইন: {atm.hotline}</span>
                        </a>
                        <button
                          onClick={() => handleCopy(atm.location, atm.booth_name)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                          title="ঠিকানা কপি করুন"
                        >
                          <i className="fa-regular fa-copy"></i>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CRO Bottom Civic Conversion Closer Funnel */}
        <section className="mt-10 sm:mt-14 rounded-3xl bg-gradient-to-r from-slate-950 via-emerald-950 to-blue-950 text-white p-5 sm:p-10 border border-emerald-800 shadow-xl relative overflow-hidden w-full">
          <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 w-full">
            <div className="max-w-2xl text-center lg:text-left min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-3">
                <i className="fa-solid fa-building-columns"></i>
                <span>আর্থিক সেবা ও নিরাপদ ব্যাংকিং</span>
              </span>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight break-words">
                আপনার ব্যাংক শাখা বা নতুন এটিএম বুথ কি তালিকায় নেই?
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed break-words">
                বগুড়ার হাজারো ব্যবসায়ী, নাগরিক ও উদ্যোক্তাদের আর্থিক লেনদেন সহজ করতে আপনার ব্যাংকের নতুন শাখা, উপশাখা বা ২৪/৭ এটিএম বুথের সঠিক তথ্য অমর বগুড়া ডিজিটাল ডিরেক্টরিতে যুক্ত করুন।
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[11px] text-emerald-200 font-medium mt-4">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-emerald-400"></i> রাউটিং নম্বর ও সুইফট কোড যাচাই
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-emerald-400"></i> ১-ট্যাপে সরাসরি টেলিফোন ও হটলাইন
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-emerald-400"></i> শতভাগ ফ্রি ব্যবসায়িক তালিকাভুক্তি
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/contribute"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg text-center transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <i className="fa-solid fa-plus-circle text-slate-950 group-hover:rotate-90 transition-transform"></i>
                <span>ব্যাংকিং তথ্য যুক্ত করুন</span>
              </Link>
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
      </main>

      {/* Multiple Phones Modal */}
      {selectedBankPhones && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 min-w-0">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 min-w-0">
              <div className="min-w-0 flex-1 mr-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">{selectedBankPhones.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">সকল শাখা টেলিফোন ও মোবাইল নম্বর</p>
              </div>
              <button
                onClick={() => setSelectedBankPhones(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {selectedBankPhones.numbers.map((phone, pIdx) => (
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
                      onClick={() => handleCopy(phone, selectedBankPhones.name)}
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
                onClick={() => setSelectedBankPhones(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav currentView="banking" />
    </div>
  );
}

