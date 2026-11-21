'use client';

import React from 'react';

export type SkeletonVariant = 'guard' | 'table' | 'dashboard' | 'form' | 'moderation';

interface AdminSkeletonLoaderProps {
  variant?: SkeletonVariant;
  rows?: number;
}

export default function AdminSkeletonLoader({
  variant = 'table',
  rows = 6,
}: AdminSkeletonLoaderProps) {
  // ==========================================
  // 1. GUARD / FULL DASHBOARD SHELL SKELETON
  // ==========================================
  if (variant === 'guard') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none overflow-hidden">
        <div className="flex flex-1 min-h-screen relative">
          {/* Sidebar Skeleton */}
          <aside className="w-64 sm:w-72 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 p-4 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-slate-800 animate-pulse" />
              <div className="space-y-1.5 flex-1">
                <div className="w-24 h-4 rounded bg-slate-800 animate-pulse" />
                <div className="w-16 h-2.5 rounded bg-slate-800/60 animate-pulse" />
              </div>
            </div>

            {/* Nav Group 1 */}
            <div className="space-y-2">
              <div className="w-20 h-3 rounded bg-slate-800/60 animate-pulse mb-3" />
              <div className="w-full h-10 rounded-xl bg-slate-800/80 animate-pulse" />
              <div className="w-full h-10 rounded-xl bg-slate-850 animate-pulse" />
            </div>

            {/* Nav Group 2 */}
            <div className="space-y-2">
              <div className="w-24 h-3 rounded bg-slate-800/60 animate-pulse mb-3" />
              <div className="w-full h-10 rounded-xl bg-slate-850 animate-pulse" />
              <div className="w-full h-10 rounded-xl bg-slate-850 animate-pulse" />
              <div className="w-full h-10 rounded-xl bg-slate-850 animate-pulse" />
              <div className="w-full h-10 rounded-xl bg-slate-850 animate-pulse" />
            </div>

            <div className="flex-1" />

            {/* Sidebar Bottom Card */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 animate-pulse">
              <div className="w-24 h-3 rounded bg-slate-800" />
              <div className="w-32 h-2.5 rounded bg-slate-800/70" />
            </div>
          </aside>

          {/* Main Area Skeleton */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Topbar Skeleton */}
            <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-28 h-4 rounded bg-slate-800 animate-pulse" />
                <div className="w-4 h-4 rounded bg-slate-800/50 animate-pulse" />
                <div className="w-36 h-4 rounded bg-slate-800 animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-8 rounded-full bg-slate-800 animate-pulse" />
                <div className="w-20 h-8 rounded-xl bg-slate-800 animate-pulse" />
                <div className="w-20 h-8 rounded-xl bg-slate-800 animate-pulse" />
              </div>
            </header>

            {/* Body Canvas Skeleton */}
            <main className="w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 space-y-6">
              {/* Top Banner Placeholder */}
              <div className="h-44 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between animate-pulse">
                <div className="space-y-2">
                  <div className="w-48 h-5 rounded-full bg-slate-800" />
                  <div className="w-80 h-7 rounded-xl bg-slate-800" />
                  <div className="w-96 h-3.5 rounded bg-slate-800/70" />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="h-8 rounded-xl bg-slate-800/60" />
                  <div className="h-8 rounded-xl bg-slate-800/60" />
                  <div className="h-8 rounded-xl bg-slate-800/60" />
                </div>
              </div>

              {/* 6 KPI Cards Placeholder */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 shadow-xs animate-pulse">
                    <div className="flex justify-between items-center">
                      <div className="w-16 h-3 rounded bg-slate-200" />
                      <div className="w-5 h-5 rounded-full bg-slate-200" />
                    </div>
                    <div className="w-12 h-6 rounded bg-slate-300" />
                    <div className="w-20 h-2.5 rounded bg-slate-200" />
                  </div>
                ))}
              </div>

              {/* Table / Register Container Skeleton */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="w-48 h-5 rounded bg-slate-200" />
                  <div className="w-32 h-8 rounded-xl bg-slate-200" />
                </div>
                <div className="space-y-3 pt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-12 rounded-xl bg-slate-100 flex items-center px-4 gap-4">
                      <div className="w-8 h-8 rounded-lg bg-slate-200" />
                      <div className="w-48 h-3.5 rounded bg-slate-200" />
                      <div className="w-24 h-3.5 rounded bg-slate-200 ml-auto" />
                      <div className="w-16 h-6 rounded-full bg-slate-200" />
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. DASHBOARD OVERVIEW SKELETON
  // ==========================================
  if (variant === 'dashboard') {
    return (
      <div className="space-y-6 animate-pulse select-none">
        {/* Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-md space-y-4">
          <div className="w-44 h-5 rounded-full bg-slate-700/80" />
          <div className="w-80 h-7 rounded bg-slate-700" />
          <div className="w-96 h-4 rounded bg-slate-700/60" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 h-16" />
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 h-16" />
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 h-16" />
          </div>
        </div>

        {/* 6 KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center">
                <div className="w-16 h-3 rounded bg-slate-200" />
                <div className="w-4 h-4 rounded bg-slate-200" />
              </div>
              <div className="w-14 h-7 rounded bg-slate-300" />
              <div className="w-20 h-2.5 rounded bg-slate-200" />
            </div>
          ))}
        </div>

        {/* Activity Feed Skeleton */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="w-48 h-5 rounded bg-slate-300" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="w-40 h-3.5 rounded bg-slate-300" />
                    <div className="w-24 h-2.5 rounded bg-slate-200" />
                  </div>
                </div>
                <div className="w-16 h-5 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. FORM / CMS SKELETON
  // ==========================================
  if (variant === 'form') {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs animate-pulse select-none">
        <div className="space-y-2 pb-4 border-b border-slate-100">
          <div className="w-48 h-6 rounded bg-slate-300" />
          <div className="w-72 h-3.5 rounded bg-slate-200" />
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="w-28 h-3 rounded bg-slate-200" />
            <div className="w-full h-11 rounded-xl bg-slate-100 border border-slate-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="w-28 h-3 rounded bg-slate-200" />
              <div className="w-full h-11 rounded-xl bg-slate-100 border border-slate-200" />
            </div>
            <div className="space-y-1.5">
              <div className="w-28 h-3 rounded bg-slate-200" />
              <div className="w-full h-11 rounded-xl bg-slate-100 border border-slate-200" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="w-32 h-3 rounded bg-slate-200" />
            <div className="w-full h-28 rounded-xl bg-slate-100 border border-slate-200" />
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <div className="w-36 h-10 rounded-xl bg-emerald-200" />
        </div>
      </div>
    );
  }

  // ==========================================
  // 4. MODERATION SKELETON
  // ==========================================
  if (variant === 'moderation') {
    return (
      <div className="space-y-6 animate-pulse select-none">
        {/* Banner */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 space-y-3">
          <div className="w-48 h-5 rounded bg-slate-700" />
          <div className="w-72 h-3.5 rounded bg-slate-700/60" />
          <div className="flex gap-2 pt-2">
            <div className="w-28 h-9 rounded-xl bg-slate-800" />
            <div className="w-28 h-9 rounded-xl bg-slate-800" />
            <div className="w-28 h-9 rounded-xl bg-slate-800" />
          </div>
        </div>

        {/* Moderation Items */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
                  <div className="space-y-2">
                    <div className="w-48 h-4 rounded bg-slate-300" />
                    <div className="w-32 h-2.5 rounded bg-slate-200" />
                  </div>
                </div>
                <div className="w-20 h-6 rounded-full bg-amber-100" />
              </div>
              <div className="w-full h-12 rounded-xl bg-slate-50 border border-slate-100" />
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <div className="w-20 h-8 rounded-xl bg-rose-100" />
                <div className="w-24 h-8 rounded-xl bg-emerald-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // 5. DEFAULT: TABLE / REGISTER SKELETON
  // ==========================================
  return (
    <div className="space-y-4 animate-pulse select-none">
      {/* Search & Filter Toolbar Skeleton */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex-1 flex flex-wrap gap-2.5 items-center">
          {/* Search box */}
          <div className="w-full sm:w-72 h-10 rounded-xl bg-slate-100 border border-slate-200" />
          {/* Filter dropdown 1 */}
          <div className="w-32 h-10 rounded-xl bg-slate-100 border border-slate-200" />
          {/* Filter dropdown 2 */}
          <div className="w-36 h-10 rounded-xl bg-slate-100 border border-slate-200" />
        </div>
        {/* Action Button */}
        <div className="w-36 h-10 rounded-xl bg-emerald-100 border border-emerald-200 self-end md:self-auto shrink-0" />
      </div>

      {/* Main Table Skeleton Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header Bar */}
        <div className="h-11 bg-slate-50 border-b border-slate-200 px-4 flex items-center justify-between">
          <div className="w-32 h-3.5 rounded bg-slate-200" />
          <div className="w-24 h-3.5 rounded bg-slate-200" />
          <div className="w-28 h-3.5 rounded bg-slate-200" />
          <div className="w-20 h-3.5 rounded bg-slate-200" />
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: rows }).map((_, idx) => (
            <div key={idx} className="p-3.5 sm:px-4 flex items-center gap-4">
              {/* Thumbnail / Icon */}
              <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />

              {/* Title & Description */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="w-48 sm:w-64 h-3.5 rounded bg-slate-300" />
                <div className="w-32 sm:w-44 h-2.5 rounded bg-slate-200" />
              </div>

              {/* Category / Upazila Badge */}
              <div className="hidden sm:block w-24 h-6 rounded-md bg-slate-100 border border-slate-200 shrink-0" />

              {/* Phone / Metadata */}
              <div className="hidden md:block w-28 h-3.5 rounded bg-slate-200 shrink-0" />

              {/* Status Pill */}
              <div className="w-16 h-5 rounded-full bg-slate-200 shrink-0" />

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200" />
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar Skeleton */}
        <div className="h-14 border-t border-slate-200 bg-slate-50/50 px-4 flex items-center justify-between">
          <div className="w-36 h-3 rounded bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-slate-200" />
            <div className="w-8 h-8 rounded-lg bg-slate-200" />
            <div className="w-8 h-8 rounded-lg bg-slate-200" />
            <div className="w-8 h-8 rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

