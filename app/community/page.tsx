'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import CommunitySection from '@/components/CommunitySection';
import CommunityModal from '@/components/CommunityModal';
import { initialCommunityState, CommunityPost } from '@/lib/data/district-data';

export default function CommunityPage() {
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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Sticky Navbar */}
      <Navbar currentView="community" />

      {/* Hero Breadcrumb Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-3">
            <Link href="/" className="hover:text-white transition">
              হোম
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-amber-400">কমিউনিটি ও রক্তদাতা নেটওয়ার্ক</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-700/60 mb-2">
                <i className="fa-solid fa-droplet text-rose-400"></i>
                <span>নাগরিক সহায়তা পোর্টাল</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                বগুড়া রক্তদাতা ও নাগরিক তথ্য সেবা
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
                জরুরি রক্তের সন্ধান, টিউশন, বাসা ভাড়া, চাকরি ও স্থানীয় ব্যবসার সম্পূর্ণ তালিকা। রক্তদাতার ব্যক্তিগত গোপনীয়তা ও সুরক্ষা সংরক্ষিত।
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md flex items-center gap-2 transition cursor-pointer"
              >
                <i className="fa-solid fa-plus"></i>
                <span>নতুন তথ্য যোগ করুন</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 pt-6 border-t border-emerald-800/60 text-center">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <p className="text-2xl font-black text-rose-400">
                {communityData.blood?.length || 0}
              </p>
              <p className="text-xs text-emerald-200 mt-0.5">নিবন্ধিত রক্তদাতা</p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <p className="text-2xl font-black text-amber-300">
                {communityData.tuition?.length || 0}
              </p>
              <p className="text-xs text-emerald-200 mt-0.5">টিউশন ও শিক্ষক</p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <p className="text-2xl font-black text-teal-300">
                {communityData.rent?.length || 0}
              </p>
              <p className="text-xs text-emerald-200 mt-0.5">বাসা ও দোকান ভাড়া</p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <p className="text-2xl font-black text-blue-300">
                {communityData.jobs?.length || 0}
              </p>
              <p className="text-xs text-emerald-200 mt-0.5">স্থানীয় চাকরি</p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
              <p className="text-2xl font-black text-yellow-300">
                {communityData.business?.length || 0}
              </p>
              <p className="text-xs text-emerald-200 mt-0.5">ব্যবসা ও বগুড়ার দই</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-4">
        <CommunitySection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          communityData={communityData}
          onOpenModal={() => setIsModalOpen(true)}
          isHome={false}
        />
      </main>

      {/* Footer & Navigation */}
      <Footer onSwitchCommunityTab={setActiveTab} />
      <BottomNav currentView="community" />

      {/* Post Modal */}
      <CommunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}

