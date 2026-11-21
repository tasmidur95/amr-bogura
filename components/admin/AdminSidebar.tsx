'use client';

import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { useAdmin, AdminNavTab } from '@/lib/context/AdminContext';
import { toBnNumber } from '@/components/AdminPagination';

interface NavItemDef {
  id: AdminNavTab;
  label: string;
  shortLabel: string;
  group: 'core' | 'registers' | 'system';
  icon: string;
  badgeKey?: 'pendingTotal' | 'spots' | 'education' | 'hospitals' | 'emergency' | 'community' | 'upazilas';
  badgeColor?: string;
}

const navItems: NavItemDef[] = [
  // 1. Core Controls
  {
    id: 'overview',
    label: 'ড্যাশবোর্ড ওভারভিউ',
    shortLabel: 'ওভারভিউ',
    group: 'core',
    icon: 'fa-gauge-high',
  },
  {
    id: 'moderation',
    label: 'নাগরিক কিউ মডারেশন',
    shortLabel: 'মডারেশন',
    group: 'core',
    icon: 'fa-shield-halved',
    badgeKey: 'pendingTotal',
    badgeColor: 'bg-amber-400 text-slate-950 font-black animate-pulse',
  },

  // 2. Module Registers
  {
    id: 'spots',
    label: 'দর্শনীয় স্থান রেজিস্টার',
    shortLabel: 'দর্শনীয় স্থান',
    group: 'registers',
    icon: 'fa-landmark',
    badgeKey: 'spots',
    badgeColor: 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50',
  },
  {
    id: 'education',
    label: 'শিক্ষাপ্রতিষ্ঠান ও কলেজ রেজিস্টার',
    shortLabel: 'শিক্ষাপ্রতিষ্ঠান',
    group: 'registers',
    icon: 'fa-graduation-cap',
    badgeKey: 'education',
    badgeColor: 'bg-teal-900/80 text-teal-300 border border-teal-700/50',
  },
  {
    id: 'hospitals',
    label: 'স্বাস্থ্যসেবা রেজিস্টার',
    shortLabel: 'স্বাস্থ্যসেবা',
    group: 'registers',
    icon: 'fa-hospital',
    badgeKey: 'hospitals',
    badgeColor: 'bg-blue-900/80 text-blue-300 border border-blue-700/50',
  },
  {
    id: 'emergency',
    label: 'জরুরি সেবা রেজিস্টার',
    shortLabel: 'জরুরি সেবা',
    group: 'registers',
    icon: 'fa-phone-volume',
    badgeKey: 'emergency',
    badgeColor: 'bg-amber-900/80 text-amber-300 border border-amber-700/50',
  },
  {
    id: 'community',
    label: 'সিটিজেন পোস্ট রেজিস্টার',
    shortLabel: 'কমিউনিটি',
    group: 'registers',
    icon: 'fa-users',
    badgeKey: 'community',
    badgeColor: 'bg-purple-900/80 text-purple-300 border border-purple-700/50',
  },
  {
    id: 'upazilas',
    label: 'উপজেলা ও ইউনিয়ন রেজিস্টার',
    shortLabel: 'উপজেলা',
    group: 'registers',
    icon: 'fa-map-location-dot',
    badgeKey: 'upazilas',
    badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700/50',
  },

  // 3. Content & System Controls
  {
    id: 'cms',
    label: 'ওয়েবসাইট ব্যানার সিএমএস',
    shortLabel: 'ব্যানার CMS',
    group: 'system',
    icon: 'fa-newspaper',
  },
  {
    id: 'settings',
    label: 'নিরাপত্তা ও অডিট রেজিস্টার',
    shortLabel: 'সেটিংস',
    group: 'system',
    icon: 'fa-gears',
  },
];

export default function AdminSidebar() {
  const {
    currentNav,
    setCurrentNav,
    isSidebarExpanded,
    toggleSidebar,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    badgeCounts,
    handleLogout,
  } = useAdmin();

  const getBadgeValue = (item: NavItemDef) => {
    if (!item.badgeKey) return null;
    const count = badgeCounts[item.badgeKey];
    if (count === undefined || count === null) return null;
    if (item.badgeKey === 'pendingTotal' && count === 0) return null;
    return toBnNumber(count);
  };

  return (
    <>
      {/* 1. Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* 2. Admin Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-950 border-r border-slate-800/90 text-white shadow-2xl transition-all duration-300 ease-in-out select-none ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isSidebarExpanded ? 'w-64 sm:w-72' : 'w-20'}`}
      >
        {/* Sidebar Header & Brand */}
        <div className="h-16 px-4 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-slate-950">
          {isSidebarExpanded ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Link href="/" className="shrink-0 flex items-center">
                <BrandLogo variant="horizontal" size="sm" theme="dark" />
              </Link>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                CMS
              </span>
            </div>
          ) : (
            <div className="mx-auto">
              <Link href="/" className="shrink-0 flex items-center" title="আমার বগুড়া">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center font-black text-white text-base shadow-md ring-1 ring-emerald-500/40">
                  ব
                </span>
              </Link>
            </div>
          )}

          {/* Desktop Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title={isSidebarExpanded ? 'মিনি সাইডবার (সংক্ষেপ করুন)' : 'সাইডবার প্রসারিত করুন'}
          >
            <i className={`fa-solid ${isSidebarExpanded ? 'fa-angles-left' : 'fa-angles-right'} text-xs`}></i>
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="সাইডবার বন্ধ করুন"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Sidebar Navigation Body */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 no-scrollbar">
          {/* Group 1: Core Navigation */}
          <div>
            {isSidebarExpanded && (
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 mb-1.5">
                প্রধান কন্ট্রোল
              </div>
            )}
            <div className="space-y-1">
              {navItems
                .filter(item => item.group === 'core')
                .map(item => {
                  const isActive = currentNav === item.id;
                  const badge = getBadgeValue(item);

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentNav(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full transition flex items-center rounded-xl cursor-pointer relative ${
                        isSidebarExpanded
                          ? `px-3 py-2.5 justify-between text-xs font-bold ${
                              isActive
                                ? 'bg-gradient-to-r from-emerald-900/90 to-emerald-800 text-white shadow-md border border-emerald-600/50'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`
                          : `h-11 justify-center group ${
                              isActive
                                ? 'bg-emerald-800 text-white shadow-md ring-1 ring-emerald-500/40'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`
                      }`}
                      title={!isSidebarExpanded ? item.label : undefined}
                    >
                      {isActive && isSidebarExpanded && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-400 rounded-r shadow-xs"></span>
                      )}

                      <div className="flex items-center gap-3">
                        <i
                          className={`fa-solid ${item.icon} text-sm ${
                            isActive ? 'text-emerald-300' : 'text-slate-400'
                          }`}
                        ></i>
                        {isSidebarExpanded && <span>{item.label}</span>}
                      </div>

                      {/* Badge in Expanded mode */}
                      {isSidebarExpanded && badge !== null && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.badgeColor || 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {badge}
                        </span>
                      )}

                      {/* Tooltip & notification dot in Mini mode */}
                      {!isSidebarExpanded && (
                        <>
                          {badge !== null && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          )}
                          <div className="absolute left-full ml-3.5 px-3 py-1.5 rounded-xl bg-slate-950 text-white border border-slate-700 shadow-2xl text-xs whitespace-nowrap z-50 pointer-events-none hidden group-hover:flex items-center gap-2">
                            <span>{item.label}</span>
                            {badge !== null && (
                              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                                {badge}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Group 2: Module Registers */}
          <div>
            {isSidebarExpanded && (
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 mb-1.5">
                মডিউল রেজিস্টার
              </div>
            )}
            <div className="space-y-1">
              {navItems
                .filter(item => item.group === 'registers')
                .map(item => {
                  const isActive = currentNav === item.id;
                  const badge = getBadgeValue(item);

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentNav(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full transition flex items-center rounded-xl cursor-pointer relative ${
                        isSidebarExpanded
                          ? `px-3 py-2.5 justify-between text-xs font-bold ${
                              isActive
                                ? 'bg-gradient-to-r from-emerald-900/90 to-emerald-800 text-white shadow-md border border-emerald-600/50'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`
                          : `h-11 justify-center group ${
                              isActive
                                ? 'bg-emerald-800 text-white shadow-md ring-1 ring-emerald-500/40'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`
                      }`}
                      title={!isSidebarExpanded ? item.label : undefined}
                    >
                      {isActive && isSidebarExpanded && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-400 rounded-r shadow-xs"></span>
                      )}

                      <div className="flex items-center gap-3">
                        <i
                          className={`fa-solid ${item.icon} text-sm ${
                            isActive ? 'text-emerald-300' : 'text-slate-400'
                          }`}
                        ></i>
                        {isSidebarExpanded && <span>{item.label}</span>}
                      </div>

                      {/* Badge in Expanded mode */}
                      {isSidebarExpanded && badge !== null && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.badgeColor || 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {badge}
                        </span>
                      )}

                      {/* Tooltip in Mini mode */}
                      {!isSidebarExpanded && (
                        <div className="absolute left-full ml-3.5 px-3 py-1.5 rounded-xl bg-slate-950 text-white border border-slate-700 shadow-2xl text-xs whitespace-nowrap z-50 pointer-events-none hidden group-hover:flex items-center gap-2">
                          <span>{item.label}</span>
                          {badge !== null && (
                            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                              {badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Group 3: System & Content */}
          <div>
            {isSidebarExpanded && (
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 mb-1.5">
                কনটেন্ট ও সিস্টেম
              </div>
            )}
            <div className="space-y-1">
              {navItems
                .filter(item => item.group === 'system')
                .map(item => {
                  const isActive = currentNav === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentNav(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full transition flex items-center rounded-xl cursor-pointer relative ${
                        isSidebarExpanded
                          ? `px-3 py-2.5 justify-between text-xs font-bold ${
                              isActive
                                ? 'bg-gradient-to-r from-emerald-900/90 to-emerald-800 text-white shadow-md border border-emerald-600/50'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`
                          : `h-11 justify-center group ${
                              isActive
                                ? 'bg-emerald-800 text-white shadow-md ring-1 ring-emerald-500/40'
                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`
                      }`}
                      title={!isSidebarExpanded ? item.label : undefined}
                    >
                      {isActive && isSidebarExpanded && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-400 rounded-r shadow-xs"></span>
                      )}

                      <div className="flex items-center gap-3">
                        <i
                          className={`fa-solid ${item.icon} text-sm ${
                            isActive ? 'text-emerald-300' : 'text-slate-400'
                          }`}
                        ></i>
                        {isSidebarExpanded && <span>{item.label}</span>}
                      </div>

                      {!isSidebarExpanded && (
                        <div className="absolute left-full ml-3.5 px-3 py-1.5 rounded-xl bg-slate-950 text-white border border-slate-700 shadow-2xl text-xs whitespace-nowrap z-50 pointer-events-none hidden group-hover:flex items-center gap-2">
                          <span>{item.label}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 shrink-0">
          {isSidebarExpanded ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2.5 py-2 bg-slate-900/90 rounded-xl text-xs border border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    ব
                  </span>
                  <div>
                    <span className="font-bold text-slate-200 block text-[11px] leading-tight">
                      সুপার অ্যাডমিন
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      সেশন সক্রিয়
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                  title="লগআউট"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <a
                  href="/api/admin/backup"
                  download
                  className="px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80 transition flex items-center justify-center gap-1.5"
                  title="JSON ব্যাকআপ ডাউনলোড"
                >
                  <i className="fa-solid fa-cloud-arrow-down text-amber-300"></i>
                  <span>ব্যাকআপ</span>
                </a>
                <Link
                  href="/"
                  target="_blank"
                  className="px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80 transition flex items-center justify-center gap-1.5"
                  title="ওয়েবসাইট দেখুন"
                >
                  <i className="fa-solid fa-globe text-emerald-400"></i>
                  <span>লাইভ সাইট</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1">
              <a
                href="/api/admin/backup"
                download
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center relative group cursor-pointer"
                title="ব্যাকআপ ডাউনলোড"
              >
                <i className="fa-solid fa-cloud-arrow-down text-amber-300 text-xs"></i>
                <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-950 text-white border border-slate-700 text-xs whitespace-nowrap z-50 pointer-events-none hidden group-hover:block">
                  JSON ব্যাকআপ
                </div>
              </a>
              <Link
                href="/"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center relative group"
                title="লাইভ সাইট"
              >
                <i className="fa-solid fa-globe text-emerald-400 text-xs"></i>
                <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-950 text-white border border-slate-700 text-xs whitespace-nowrap z-50 pointer-events-none hidden group-hover:block">
                  লাইভ সাইট
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 flex items-center justify-center relative group cursor-pointer"
                title="লগআউট"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                <div className="absolute left-full ml-3 px-2 py-1 rounded-lg bg-slate-950 text-white border border-slate-700 text-xs whitespace-nowrap z-50 pointer-events-none hidden group-hover:block">
                  লগআউট
                </div>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

