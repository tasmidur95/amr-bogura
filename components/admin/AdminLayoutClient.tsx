'use client';

import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { AdminProvider, useAdmin } from '@/lib/context/AdminContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminSkeletonLoader from './AdminSkeletonLoader';

function AdminShell({ children }: { children: React.ReactNode }) {
  const {
    isCheckingAuth,
    isAuthenticated,
    isSidebarExpanded,
    passkeyInput,
    setPasskeyInput,
    isAuthLoading,
    authError,
    handleLogin,
  } = useAdmin();

  // ==========================================
  // 1. AUTH GUARD: CHECKING SESSION STATE
  // ==========================================
  if (isCheckingAuth) {
    return <AdminSkeletonLoader variant="guard" />;
  }

  // ==========================================
  // 2. LOGIN SCREEN (AUTHENTICATION GATE)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 -mb-20 md:mb-0">
        <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <BrandLogo variant="full" size="lg" theme="dark" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
            <i className="fa-solid fa-server"></i>
            <span>সিস্টেম অ্যাডমিন ও ডাইনামিক কন্টেন্ট কনসোল</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-2">
            অ্যাডমিন প্রবেশাধিকার
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            ওয়েবসাইটের সকল কন্টেন্ট (ব্যানার, উপজেলা, ইউনিয়ন, দর্শনীয় স্থান, হাসপাতাল, রক্তদাতা ও জরুরি হটলাইন) সম্পাদনা ও নিয়ন্ত্রণের জন্য মাস্টার পাসকি দিন।
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <i className="fa-solid fa-key text-emerald-400"></i>
                </span>
                <input
                  type="password"
                  required
                  value={passkeyInput}
                  onChange={e => setPasskeyInput(e.target.value)}
                  placeholder="অ্যাডমিন পাসকি দিন (যেমন: bogura2026)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono tracking-wider"
                />
              </div>
              {authError && (
                <p className="text-xs text-rose-400 text-left mt-2 flex items-center gap-1">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAuthLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>যাচাই হচ্ছে...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>ড্যাশবোর্ডে প্রবেশ করুন</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px] bg-slate-800 px-2.5 py-1 rounded-md text-amber-300 font-mono">
              ডিফল্ট পাসকি: bogura2026
            </span>
            <Link
              href="/"
              className="hover:text-emerald-400 transition flex items-center gap-1 text-slate-300"
            >
              <span>ওয়েবসাইটে ফিরুন</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED ADMIN DASHBOARD LAYOUT
  // ==========================================
  return (
    <div className="admin-console-root min-h-screen w-full bg-slate-100 text-slate-800 flex flex-col">
      <div className="flex flex-1 min-h-screen relative w-full">
        {/* Left Modular Admin Sidebar */}
        <AdminSidebar />

        {/* Main Administrative Work Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? 'md:pl-64 sm:md:pl-72' : 'md:pl-20'
          }`}
        >
          {/* Top Sticky Admin Header */}
          <AdminHeader />

          {/* Module Content Canvas (100% full width, no unwanted margins) */}
          <main className="w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
            {children}
          </main>

          {/* Administrative Footer Note */}
          <footer className="border-t border-slate-200/80 bg-white/60 px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>আমার বগুড়া ডিজিটাল প্রশাসনিক পোর্টাল ও কন্টেন্ট ইঞ্জিন</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>ভার্সন: v2.6.4</span>
              <span>•</span>
              <span>Supabase REST + PostgREST</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}

