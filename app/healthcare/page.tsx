'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import HealthcareMap from '@/components/HealthcareMap';
import { HealthcareFacility } from '@/lib/services/healthcare.service';

export default function HealthcarePage() {
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOwnership, setSelectedOwnership] = useState<string>('all');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'map'>('split');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 18;

  // Fetch facilities
  useEffect(() => {
    async function fetchHealthcare() {
      setLoading(true);
      try {
        const res = await fetch('/api/healthcare?limit=500');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setFacilities(json.data);
        }
      } catch (err) {
        console.error('Failed to load healthcare data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchHealthcare();
  }, []);

  // Filter facilities in-memory for instant responsive UI
  const filteredFacilities = useMemo(() => {
    return facilities.filter(f => {
      // Upazila filter
      if (selectedUpazila !== 'all' && f.upazila.toLowerCase() !== selectedUpazila.toLowerCase()) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'govt_hospitals') {
          if (!f.category.includes('Government District') && !f.category.includes('Medical Colleges') && !f.category.includes('Government Specialized')) {
            return false;
          }
        } else if (selectedCategory === 'uhc') {
          if (!f.category.includes('Upazila Health Complex') && !f.category.includes('Upazila Health Office')) {
            return false;
          }
        } else if (selectedCategory === 'uhsc') {
          if (f.category !== 'Union Health Sub-Centre') return false;
        } else if (selectedCategory === 'fwc') {
          if (f.category !== 'Union Health & Family Welfare Centre') return false;
        } else if (selectedCategory === 'cc') {
          if (f.category !== 'Community Clinic') return false;
        } else if (selectedCategory === 'private') {
          if (f.category !== 'Private Hospitals' && f.category !== 'Private Clinics') return false;
        } else if (selectedCategory === 'diagnostic') {
          if (f.category !== 'Diagnostic Centres') return false;
        } else if (selectedCategory === 'eye_dental') {
          if (f.category !== 'Eye Hospitals' && f.category !== 'Dental Clinics') return false;
        } else if (selectedCategory === 'ngo') {
          if (f.category !== 'NGO Healthcare Facilities') return false;
        } else if (selectedCategory === 'emergency_services') {
          if (f.category !== 'Ambulance Services' && f.category !== 'Blood Banks') return false;
        }
      }

      // Ownership filter
      if (selectedOwnership !== 'all' && f.ownership !== selectedOwnership) {
        return false;
      }

      // Emergency filter
      if (emergencyOnly) {
        const isEmergency =
          f.category === 'Ambulance Services' ||
          f.category === 'Blood Banks' ||
          f.services.some(s => s.includes('২৪/৭') || s.includes('জরুরী') || s.includes('Emergency') || s.includes('জরুরি'));
        if (!isEmergency) return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          f.name.toLowerCase().includes(q) ||
          f.name_bn.includes(q) ||
          f.address.toLowerCase().includes(q) ||
          f.upazila_bn.includes(q) ||
          (f.union_bn && f.union_bn.includes(q)) ||
          (f.village_or_area && f.village_or_area.toLowerCase().includes(q)) ||
          f.services.some(s => s.toLowerCase().includes(q));
        if (!match) return false;
      }

      return true;
    });
  }, [facilities, selectedUpazila, selectedCategory, selectedOwnership, emergencyOnly, searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedUpazila, selectedCategory, selectedOwnership, emergencyOnly, searchQuery]);

  // Paginated facilities
  const paginatedFacilities = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredFacilities.slice(start, start + itemsPerPage);
  }, [filteredFacilities, page]);

  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage) || 1;

  // Upazila List with counts
  const upazilaTabs = [
    { id: 'all', name_bn: 'সকল উপজেলা', count: facilities.length },
    { id: 'Bogura Sadar', name_bn: 'বগুড়া সদর', count: facilities.filter(f => f.upazila === 'Bogura Sadar').length },
    { id: 'Sherpur', name_bn: 'শেরপুর', count: facilities.filter(f => f.upazila === 'Sherpur').length },
    { id: 'Sariakandi', name_bn: 'সারিয়াকান্দি', count: facilities.filter(f => f.upazila === 'Sariakandi').length },
    { id: 'Dhunat', name_bn: 'ধুনট', count: facilities.filter(f => f.upazila === 'Dhunat').length },
    { id: 'Gabtali', name_bn: 'গাবতলী', count: facilities.filter(f => f.upazila === 'Gabtali').length },
    { id: 'Shibganj', name_bn: 'শিবগঞ্জ', count: facilities.filter(f => f.upazila === 'Shibganj').length },
    { id: 'Adamdighi', name_bn: 'আদমদীঘি', count: facilities.filter(f => f.upazila === 'Adamdighi').length },
    { id: 'Dhupchanchia', name_bn: 'দুপচাঁচিয়া', count: facilities.filter(f => f.upazila === 'Dhupchanchia').length },
    { id: 'Kahalu', name_bn: 'কাহালু', count: facilities.filter(f => f.upazila === 'Kahalu').length },
    { id: 'Shajahanpur', name_bn: 'শাজাহানপুর', count: facilities.filter(f => f.upazila === 'Shajahanpur').length },
    { id: 'Nandigram', name_bn: 'নন্দীগ্রাম', count: facilities.filter(f => f.upazila === 'Nandigram').length },
    { id: 'Sonatala', name_bn: 'সোনাতলা', count: facilities.filter(f => f.upazila === 'Sonatala').length }
  ];

  // Category filter tabs
  const categoryFilters = [
    { id: 'all', label: 'সব ক্যাটাগরি' },
    { id: 'govt_hospitals', label: 'সরকারি ও বিশেষায়িত হাসপাতাল' },
    { id: 'uhc', label: 'উপজেলা স্বাস্থ্য কমপ্লেক্স (UHC)' },
    { id: 'uhsc', label: 'ইউনিয়ন স্বাস্থ্য সাব-সেন্টার' },
    { id: 'fwc', label: 'পরিবার কল্যাণ কেন্দ্র (UH&FWC)' },
    { id: 'cc', label: 'কমিউনিটি ক্লিনিক (CCHST)' },
    { id: 'private', label: 'বেসরকারি হাসপাতাল ও ক্লিনিক' },
    { id: 'diagnostic', label: 'ডায়াগনস্টিক ও প্যাথলজি ল্যাব' },
    { id: 'eye_dental', label: 'চক্ষু ও ডেন্টাল ক্লিনিক' },
    { id: 'ngo', label: 'এনজিও স্বাস্থ্যসেবা' },
    { id: 'emergency_services', label: 'অ্যাম্বুলেন্স ও ব্লাড ব্যাংক' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar currentView="healthcare" />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-800 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          <div className="w-full max-w-[1600px] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  স্বাস্থ্য অধিদপ্তর (DGHS) ও ডিজিএফপি যাচাইকৃত ডাটাবেজ
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  বগুড়া জেলা স্বাস্থ্যসেবা ডিরেক্টরি ও ম্যাপ
                </h1>
                <p className="mt-2 text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
                  বগুড়ার ১২টি উপজেলার ৩৫২টি সরকারি ও বেসরকারি হাসপাতাল, স্বাস্থ্য কমপ্লেক্স, ইউনিয়ন সাব-সেন্টার, কমিউনিটি ক্লিনিক, ব্লাড ব্যাংক ও অ্যাম্বুলেন্স সেবা।
                </p>
              </div>

              {/* National Emergency Hotline Cards */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                <a
                  href="tel:16263"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-2xl transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition">
                    <i className="fa-solid fa-phone-volume text-lg"></i>
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-200 uppercase font-semibold block">স্বাস্থ্য বাতায়ন</span>
                    <span className="text-lg font-bold tracking-wide">১৬২৬৩</span>
                  </div>
                </a>

                <a
                  href="tel:999"
                  className="flex items-center gap-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md border border-red-400/30 p-3 rounded-2xl transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/40 flex items-center justify-center text-red-200 group-hover:scale-105 transition">
                    <i className="fa-solid fa-truck-medical text-lg"></i>
                  </div>
                  <div>
                    <span className="text-[11px] text-red-200 uppercase font-semibold block">জাতীয় জরুরী সেবা</span>
                    <span className="text-lg font-bold tracking-wide">৯৯৯</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Emergency Filter Shortcuts */}
            <div className="mt-6 pt-6 border-t border-emerald-700/60 flex flex-wrap items-center gap-2">
              <span className="text-xs text-emerald-200 font-semibold mr-1">দ্রুত সেবা:</span>
              <button
                onClick={() => {
                  setSelectedCategory('emergency_services');
                  setEmergencyOnly(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'emergency_services'
                    ? 'bg-amber-400 text-slate-900 shadow-md font-bold'
                    : 'bg-emerald-950/60 hover:bg-emerald-950 text-emerald-100 border border-emerald-600/50'
                }`}
              >
                <i className="fa-solid fa-truck-medical text-amber-300"></i> অ্যাম্বুলেন্স ও ব্লাড ব্যাংক (২০টি)
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('govt_hospitals');
                  setEmergencyOnly(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'govt_hospitals'
                    ? 'bg-amber-400 text-slate-900 shadow-md font-bold'
                    : 'bg-emerald-950/60 hover:bg-emerald-950 text-emerald-100 border border-emerald-600/50'
                }`}
              >
                <i className="fa-solid fa-hospital text-emerald-300"></i> জেলা হাসপাতাল ও মেডিকেল কলেজ (১৯টি)
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setEmergencyOnly(!emergencyOnly);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  emergencyOnly
                    ? 'bg-red-500 text-white shadow-md font-bold'
                    : 'bg-emerald-950/60 hover:bg-emerald-950 text-emerald-100 border border-emerald-600/50'
                }`}
              >
                <i className="fa-solid fa-clock text-red-300"></i> ২৪/৭ জরুরী সেবাসমূহ
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('cc');
                  setEmergencyOnly(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'cc'
                    ? 'bg-amber-400 text-slate-900 shadow-md font-bold'
                    : 'bg-emerald-950/60 hover:bg-emerald-950 text-emerald-100 border border-emerald-600/50'
                }`}
              >
                <i className="fa-solid fa-pills text-teal-300"></i> কমিউনিটি ক্লিনিক (বিনামূল্যে ৩০ প্রকার ওষুধ)
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          {/* Search & Control Card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-4 sm:p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="হাসপাতাল, ক্লিনিক, ইউনিয়ন, গ্রাম, ডাক্তার বা সেবার নাম লিখুন..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              {/* View Switcher & Result Count */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                <span className="text-xs text-slate-600 font-medium">
                  মোট <span className="font-bold text-emerald-800 text-sm">{filteredFacilities.length}</span> টি প্রতিষ্ঠান
                </span>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'split' ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <i className="fa-solid fa-table-columns"></i>
                    <span className="hidden sm:inline">স্প্লিট ভিউ</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'grid' ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <i className="fa-solid fa-grip"></i>
                    <span className="hidden sm:inline">তালিকা</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'map' ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <i className="fa-solid fa-map-location-dot"></i>
                    <span className="hidden sm:inline">পূর্ণ ম্যাপ</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Upazila Tabs Filter */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <i className="fa-solid fa-map-pin text-emerald-700"></i> উপজেলা বাছাই করুন:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {upazilaTabs.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUpazila(u.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      selectedUpazila === u.id
                        ? 'bg-emerald-800 text-white font-bold shadow-sm'
                        : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 font-medium'
                    }`}
                  >
                    <span>{u.name_bn}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedUpazila === u.id ? 'bg-emerald-950 text-emerald-100' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {u.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-2 pt-2 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-500 shrink-0 mr-1">ধরণ:</span>
              {categoryFilters.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setEmergencyOnly(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition cursor-pointer shrink-0 ${
                    selectedCategory === cat.id && !emergencyOnly
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">৩৫২টি স্বাস্থ্যসেবা প্রতিষ্ঠানের তথ্য লোড হচ্ছে...</p>
            </div>
          ) : (
            <>
              {/* VIEW MODE: MAP ONLY */}
              {viewMode === 'map' && (
                <div className="mb-8">
                  <HealthcareMap
                    facilities={filteredFacilities}
                    selectedFacility={selectedFacility}
                    onSelectFacility={(fac) => setSelectedFacility(fac)}
                    heightClass="h-[750px]"
                  />
                </div>
              )}

              {/* VIEW MODE: SPLIT (Map on Top, Grid Below) */}
              {viewMode === 'split' && (
                <div className="space-y-6 mb-8">
                  <HealthcareMap
                    facilities={filteredFacilities}
                    selectedFacility={selectedFacility}
                    onSelectFacility={(fac) => setSelectedFacility(fac)}
                    heightClass="h-[420px] sm:h-[480px]"
                  />

                  {/* Facility Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {paginatedFacilities.map((f) => (
                      <FacilityCard
                        key={f.id}
                        facility={f}
                        isSelected={selectedFacility?.id === f.id}
                        onSelect={() => setSelectedFacility(f)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW MODE: GRID ONLY */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
                  {paginatedFacilities.map((f) => (
                    <FacilityCard
                      key={f.id}
                      facility={f}
                      isSelected={selectedFacility?.id === f.id}
                      onSelect={() => setSelectedFacility(f)}
                    />
                  ))}
                </div>
              )}

              {/* Empty state */}
              {filteredFacilities.length === 0 && (
                <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 p-8 my-6">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3 text-2xl">
                    <i className="fa-solid fa-hospital-user"></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">কোন স্বাস্থ্যসেবা প্রতিষ্ঠান পাওয়া যায়নি</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
                    অনুসন্ধান ফিল্টার পরিবর্তন করে বা সব উপজেলা নির্বাচন করে পুনরায় চেষ্টা করুন।
                  </p>
                  <button
                    onClick={() => {
                      setSelectedUpazila('all');
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setEmergencyOnly(false);
                    }}
                    className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-semibold hover:bg-emerald-900 transition"
                  >
                    সব ফিল্টার রিসেট করুন
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition"
                  >
                    <i className="fa-solid fa-chevron-left mr-1"></i> আগের পাতা
                  </button>

                  <span className="text-xs text-slate-600 px-3 font-medium">
                    পৃষ্ঠা <span className="font-bold text-slate-900">{page}</span> / {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition"
                  >
                    পরের পাতা <i className="fa-solid fa-chevron-right ml-1"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav currentView="healthcare" />
    </div>
  );
}

// Facility Card Component
function FacilityCard({
  facility,
  isSelected,
  onSelect
}: {
  facility: HealthcareFacility;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const isEmergency =
    facility.category === 'Ambulance Services' ||
    facility.category === 'Blood Banks' ||
    facility.services.some(s => s.includes('২৪/৭') || s.includes('জরুরী') || s.includes('Emergency'));

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-lg cursor-pointer ${
        isSelected
          ? 'border-emerald-600 ring-2 ring-emerald-600/30 shadow-md bg-emerald-50/20'
          : 'border-slate-200/90 hover:border-emerald-300'
      }`}
    >
      <div>
        {/* Category & Badge Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                facility.ownership === 'government'
                  ? 'bg-emerald-100 text-emerald-800'
                  : facility.ownership === 'private'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {facility.ownership === 'government' ? 'সরকারি' : facility.ownership === 'private' ? 'বেসরকারি' : 'এনজিও'}
            </span>

            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              {facility.upazila_bn}
            </span>

            {facility.union_bn && (
              <span className="text-[10px] text-slate-500 font-medium">
                • {facility.union_bn}
              </span>
            )}
          </div>

          {isEmergency && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              ২৪/৭ জরুরী
            </span>
          )}
        </div>

        {/* Facility Title */}
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-800 transition">
          {facility.name_bn}
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-2.5 line-clamp-1">
          {facility.name}
        </p>

        {/* Address */}
        <div className="flex items-start gap-2 text-xs text-slate-600 mb-3.5">
          <i className="fa-solid fa-location-dot text-emerald-700 mt-0.5 shrink-0"></i>
          <span className="line-clamp-2 leading-relaxed">{facility.address}</span>
        </div>

        {/* Services Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {facility.services.slice(0, 3).map((service, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
            >
              {service}
            </span>
          ))}
          {facility.services.length > 3 && (
            <span className="text-[10px] text-slate-400 font-semibold self-center">
              +{facility.services.length - 3} আরও
            </span>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        {facility.phone && facility.phone.length > 0 ? (
          <a
            href={`tel:${facility.phone[0]}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 px-3 py-1.5 rounded-xl shadow-sm transition"
          >
            <i className="fa-solid fa-phone text-[10px]"></i>
            <span>{facility.phone[0]}</span>
          </a>
        ) : (
          <span className="text-xs text-slate-400 font-medium">হটলাইন নেই</span>
        )}

        <a
          href={facility.google_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-xl transition"
        >
          <span>ম্যাপে যান</span>
          <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
        </a>
      </div>
    </div>
  );
}
