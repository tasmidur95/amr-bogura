'use client';

import React from 'react';
import Link from 'next/link';
import { useAdmin, AdminNavTab } from '@/lib/context/AdminContext';

const navMeta: Record<AdminNavTab, { label: string; icon: string }> = {
  overview: { label: 'ড্যাশবোর্ড ওভারভিউ', icon: 'fa-gauge-high' },
  moderation: { label: 'নাগরিক কিউ মডারেশন', icon: 'fa-shield-halved' },
  spots: { label: 'দর্শনীয় স্থান রেজিস্টার', icon: 'fa-landmark' },
  education: { label: 'শিক্ষাপ্রতিষ্ঠান ও কলেজ রেজিস্টার', icon: 'fa-graduation-cap' },
  hospitals: { label: 'স্বাস্থ্যসেবা রেজিস্টার', icon: 'fa-hospital' },
  emergency: { label: 'জরুরি সেবা রেজিস্টার', icon: 'fa-phone-volume' },
  community: { label: 'সিটিজেন পোস্ট রেজিস্টার', icon: 'fa-users' },
  upazilas: { label: 'উপজেলা ও ইউনিয়ন রেজিস্টার', icon: 'fa-map-location-dot' },
  cms: { label: 'ওয়েবসাইট ব্যানার সিএমএস', icon: 'fa-newspaper' },
  settings: { label: 'নিরাপত্তা ও অডিট রেজিস্টার', icon: 'fa-gears' },
};

export default function AdminHeader() {
  const {
    currentNav,
    setIsMobileSidebarOpen,
    systemDiag,
    isLoading,
    triggerRefresh,
    handleLogout,
  } = useAdmin();

  const currentMeta = navMeta[currentNav] || navMeta.overview;
  const latency = systemDiag?.supabase?.poolerLatencyMs || 42;

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-md h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 select-none">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          title="মেনু খুলুন"
        >
          <i className="fa-solid fa-bars text-base"></i>
        </button>

        {/* Dynamic Breadcrumb Hierarchy */}
        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-cubes text-[10px] text-emerald-400"></i>
              <span>অ্যাডমিন কনসোল</span>
            </span>
            <i className="fa-solid fa-chevron-right text-[8px] text-slate-600"></i>
            <span className="text-emerald-400 font-semibold">{currentMeta.label}</span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 leading-tight">
            <i className={`fa-solid ${currentMeta.icon} text-emerald-400 text-xs`}></i>
            <span>{currentMeta.label}</span>
          </h1>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Supabase DB Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/80 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ডাটাবেজ: অনলাইন</span>
          <span className="text-[10px] text-emerald-400/80 font-mono">({latency}ms)</span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={triggerRefresh}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          title="ডাটা রিফ্রেশ করুন"
        >
          <i className={`fa-solid fa-arrows-rotate text-emerald-400 ${isLoading ? 'fa-spin' : ''}`}></i>
          <span className="hidden sm:inline">রিফ্রেশ</span>
        </button>

        {/* Live Site Link */}
        <Link
          href="/"
          target="_blank"
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
          title="লাইভ সাইট দেখুন (নতুন ট্যাবে)"
        >
          <i className="fa-solid fa-globe text-emerald-400"></i>
          <span className="hidden sm:inline">লাইভ সাইট</span>
        </Link>

        {/* Super Admin Pill & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-lg bg-slate-800/60 text-xs text-slate-300">
            <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">
              ব
            </span>
            <span className="font-semibold text-slate-200 text-xs">অ্যাডমিন</span>
          </div>

          <button
            onClick={handleLogout}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            title="লগআউট"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="hidden md:inline">লগআউট</span>
          </button>
        </div>
      </div>
    </header>
  );
}

