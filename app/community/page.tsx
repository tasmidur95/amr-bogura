'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import CommunitySection from '@/components/CommunitySection';
import CommunityModal from '@/components/CommunityModal';
import { initialCommunityState, CommunityPost } from '@/lib/data/district-data';
import { useCommunityAuth } from '@/lib/context/CommunityAuthContext';

export default function CommunityPage() {
  const { user, isLoggedIn, logout, openAuthModal } = useCommunityAuth();
  const [activeTab, setActiveTab] = useState<string>('blood');
  const [communityData, setCommunityData] = useState<Record<string, CommunityPost[]>>(initialCommunityState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadCommunity() {
      try {
        const res = await fetch('/api/community');
        const json = await res.json();
        if (json.success && json.data) {
          // Group by category if returned as flat array
          if (Array.isArray(json.data)) {
            const grouped: Record<string, CommunityPost[]> = {
              blood: [],
              tuition: [],
              rent: [],
              jobs: [],
              business: [],
            };
            json.data.forEach((p: CommunityPost) => {
              const cat = p.category || 'blood';
              if (!grouped[cat]) grouped[cat] = [];
              grouped[cat].push(p);
            });
            setCommunityData(grouped);
          } else if (typeof json.data === 'object') {
            setCommunityData(json.data);
          }
        }
      } catch (e) {
        // Fallback to initial state
      }
    }
    loadCommunity();
  }, []);

  const handlePostCreated = (newPost: CommunityPost) => {
    setCommunityData(prev => {
      const catList = prev[newPost.category] || [];
      return {
        ...prev,
        [newPost.category]: [newPost, ...catList],
      };
    });
    setActiveTab(newPost.category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden w-full max-w-full">
      {/* Sticky Navbar */}
      <Navbar currentView="community" />

      {/* Hero Breadcrumb Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-800 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto min-w-0">
          <div className="flex items-center flex-wrap gap-2 text-xs font-semibold text-emerald-300 mb-3 min-w-0">
            <Link href="/" className="hover:text-white transition">
              হোম
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-amber-400">কমিউনিটি ও রক্তদাতা নেটওয়ার্ক</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-700/60 mb-2">
                <i className="fa-solid fa-droplet text-rose-400"></i>
                <span>নাগরিক সহায়তা পোর্টাল</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight break-words">
                বগুড়া রক্তদাতা ও নাগরিক তথ্য সেবা
              </h1>
              <p className="text-emerald-100 text-xs sm:text-base mt-1.5 leading-relaxed break-words">
                জরুরি রক্তের সন্ধান, টিউশন, বাসা ভাড়া, চাকরি ও স্থানীয় ব্যবসার সম্পূর্ণ তালিকা। রক্তদাতার ব্যক্তিগত গোপনীয়তা ও সুরক্ষা সংরক্ষিত।
              </p>
            </div>

            {/* Auth status & Post CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 min-w-0">
              {isLoggedIn && user ? (
                <div className="px-3.5 py-2 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-between sm:justify-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                    {user.name.slice(0, 1)}
                  </div>
                  <div className="flex flex-col text-left min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-xs text-white truncate max-w-[120px]">{user.name}</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-semibold flex items-center gap-0.5 shrink-0">
                        <i className="fa-solid fa-circle-check text-[9px] text-emerald-400"></i> ভেরিফায়েড
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-200/90 font-mono truncate">@{user.username} • {user.upazila}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/30 text-rose-300 hover:text-white transition text-xs cursor-pointer shrink-0"
                    title="লগআউট"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md flex items-center justify-center gap-2 transition cursor-pointer text-center"
                >
                  <i className="fa-solid fa-user-check text-emerald-300"></i>
                  <span>সদস্য লগইন / নিবন্ধন</span>
                </button>
              )}

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer text-center"
              >
                <i className="fa-solid fa-plus"></i>
                <span>নতুন তথ্য যোগ করুন</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mt-8 pt-6 border-t border-emerald-800/60 text-center w-full">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-rose-400">
                {communityData.blood?.length || 0}
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 truncate">নিবন্ধিত রক্তদাতা</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-amber-300">
                {communityData.tuition?.length || 0}
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 truncate">টিউশন ও শিক্ষক</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-teal-300">
                {communityData.rent?.length || 0}
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 truncate">বাসা ও দোকান ভাড়া</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0">
              <p className="text-xl sm:text-2xl font-black text-blue-300">
                {communityData.jobs?.length || 0}
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 truncate">স্থানীয় চাকরি</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 min-w-0 col-span-2 sm:col-span-1">
              <p className="text-xl sm:text-2xl font-black text-yellow-300">
                {communityData.business?.length || 0}
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 truncate">ব্যবসা ও বগুড়ার দই</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-4 w-full min-w-0 pb-24 md:pb-12">
        <CommunitySection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          communityData={communityData}
          onOpenModal={() => setIsModalOpen(true)}
          isHome={false}
        />

        {/* CRO Bottom Civic Conversion Closer Funnel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8 w-full min-w-0">
          <section className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-5 sm:p-10 border border-emerald-800 shadow-xl relative overflow-hidden w-full">
            <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 w-full">
              <div className="max-w-2xl text-center lg:text-left min-w-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-400/30 mb-3">
                  <i className="fa-solid fa-heart-pulse"></i>
                  <span>জরুরি নাগরিক অংশীদারিত্ব</span>
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight break-words">
                  রক্ত দিয়ে জীবন বাঁচান — বগুড়া ব্লাড নেটওয়ার্কে যুক্ত হোন
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed break-words">
                  আপনার মাত্র এক ব্যাগ রক্তে বেঁচে যেতে পারে বগুড়ার কোনো মুমূর্ষু রোগীর প্রাণ। শজিমেক, মোহাম্মদ আলী হাসপাতাল ও টিএমএসএসের রোগীদের দ্রুত রক্তের প্রয়োজনে নিজেকে রক্তদাতা হিসেবে তালিকাভুক্ত রাখুন।
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[11px] text-emerald-200 font-medium mt-4">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-check text-emerald-400"></i> সম্পূর্ণ গোপনীয়তা সুরক্ষা
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-check text-emerald-400"></i> কোনো বাণিজ্যিক লেনদেন নয়
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-check text-emerald-400"></i> সরাসরি রোগীর স্বজনের সাথে যোগাযোগ
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm shadow-lg text-center transition flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <i className="fa-solid fa-droplet group-hover:scale-125 transition-transform"></i>
                  <span>রক্তদাতা হিসেবে নাম লিখুন</span>
                </button>
                <Link
                  href="/healthcare"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 text-center transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-hospital text-emerald-300"></i>
                  <span>হাসপাতাল ডিরেক্টরি</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav currentView="community" />

      {/* Community Post Create Modal */}
      <CommunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCategory={activeTab}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
