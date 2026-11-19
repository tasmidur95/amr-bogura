'use client';

import React from 'react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string, anchor?: string) => void;
}

export default function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 gap-1 text-center">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 text-[11px] cursor-pointer ${
            currentView === 'home'
              ? 'text-emerald-800 font-bold'
              : 'text-slate-600 hover:text-emerald-800'
          }`}
        >
          <i className="fa-solid fa-house text-base mb-0.5"></i>
          <span>হোম</span>
        </button>

        <button
          onClick={() => onNavigate('upazilas')}
          className={`flex flex-col items-center justify-center py-1 text-[11px] cursor-pointer ${
            currentView === 'upazilas'
              ? 'text-emerald-800 font-bold'
              : 'text-slate-600 hover:text-emerald-800'
          }`}
        >
          <i className="fa-solid fa-map-location-dot text-base mb-0.5"></i>
          <span>উপজেলা</span>
        </button>

        <button
          onClick={() => onNavigate('home', 'healthcare')}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-emerald-800 text-[11px] cursor-pointer"
        >
          <i className="fa-solid fa-hospital text-base mb-0.5"></i>
          <span>স্বাস্থ্য</span>
        </button>

        <button
          onClick={() => onNavigate('home', 'explore')}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-emerald-800 text-[11px] cursor-pointer"
        >
          <i className="fa-solid fa-monument text-base mb-0.5"></i>
          <span>দর্শনীয়</span>
        </button>

        <button
          onClick={() => onNavigate('home', 'community')}
          className="flex flex-col items-center justify-center py-1 text-slate-600 hover:text-emerald-800 text-[11px] cursor-pointer"
        >
          <i className="fa-solid fa-users text-base mb-0.5"></i>
          <span>কমিউনিটি</span>
        </button>
      </div>
    </nav>
  );
}
