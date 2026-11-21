'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';
import { Hospital, EmergencyContact } from '@/lib/data/district-data';

interface HealthcareSectionProps {
  hospitals: Hospital[];
  emergencyContacts: EmergencyContact[];
  currentFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export default function HealthcareSection({
  hospitals,
  emergencyContacts,
  currentFilter = 'all',
  onFilterChange,
}: HealthcareSectionProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [internalFilter, setInternalFilter] = useState(currentFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const activeFilter = onFilterChange ? currentFilter : internalFilter;
  const setFilter = (type: string) => {
    if (onFilterChange) {
      onFilterChange(type);
    } else {
      setInternalFilter(type);
    }
  };

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`কপি হয়েছে: ${label} (${text})`);
    } else {
      showToast(`নম্বর: ${text}`);
    }
  };

  const filtered = hospitals.filter(h => {
    const matchesType = activeFilter === 'all' || h.type === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      h.name.toLowerCase().includes(q) ||
      h.enName.toLowerCase().includes(q) ||
      h.address.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });

  return (
    <section id="healthcare" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md border border-emerald-200">
            {t('sec03Badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {t('sec03Title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('sec03Subtitle')}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs transition cursor-pointer ${
              activeFilter === 'all'
                ? 'font-bold bg-emerald-800 text-white'
                : 'font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            সবগুলো
          </button>
          <button
            onClick={() => setFilter('govt')}
            className={`px-3.5 py-2 rounded-xl text-xs transition cursor-pointer ${
              activeFilter === 'govt'
                ? 'font-bold bg-emerald-800 text-white'
                : 'font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            সরকারি হাসপাতাল
          </button>
          <button
            onClick={() => setFilter('private')}
            className={`px-3.5 py-2 rounded-xl text-xs transition cursor-pointer ${
              activeFilter === 'private'
                ? 'font-bold bg-emerald-800 text-white'
                : 'font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            বেসরকারি
          </button>
          <button
            onClick={() => setFilter('diagnostic')}
            className={`px-3.5 py-2 rounded-xl text-xs transition cursor-pointer ${
              activeFilter === 'diagnostic'
                ? 'font-bold bg-emerald-800 text-white'
                : 'font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            ডায়াগনস্টিক
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="হাসপাতাল বা এলাকার নাম লিখুন (যেমন: শজিমেক, শেরপুর রোড)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            কোনো হাসপাতাল বা ডায়াগনস্টিক সেন্টার খুঁজে পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map(h => {
            const badgeColor =
              h.type === 'govt'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : h.type === 'private'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-cyan-50 text-cyan-800 border-cyan-200';

            return (
              <div
                key={h.name}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                      {h.typeLabel}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold">
                      <i className="fa-solid fa-circle-check"></i> সচল
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">{h.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{h.enName}</p>
                  <p className="text-xs text-slate-600 mt-3 flex items-start gap-1.5">
                    <i className="fa-solid fa-location-dot text-emerald-700 mt-0.5"></i>
                    <span>{h.address}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 flex items-start gap-1.5">
                    <i className="fa-solid fa-notes-medical text-amber-600 mt-0.5"></i>
                    <span>{h.emergency}</span>
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`tel:${h.phone}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <i className="fa-solid fa-phone"></i>
                    <span>{h.phone}</span>
                  </a>
                  <button
                    onClick={() => handleCopy(h.phone, h.name)}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                    title="নম্বর কপি করুন"
                  >
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Emergency Numbers Strip */}
      <div id="emergency" className="bg-gradient-to-br from-rose-950 via-rose-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-200 border border-rose-400/30">
              <i className="fa-solid fa-bell"></i> <span>{t('emgBadge')}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-2">{t('emgTitle')}</h3>
          </div>
          <a
            href="tel:999"
            className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition self-start sm:self-auto"
          >
            <i className="fa-solid fa-phone"></i>
            <span>জাতীয় জরুরি সেবা: ৯৯৯</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {emergencyContacts.map(item => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-rose-500/25 text-rose-200 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-rose-100/90 font-medium truncate">{item.title}</p>
                  <p className="text-base font-bold text-white tracking-wide mt-0.5">{item.number}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={`tel:${item.number}`}
                  className="w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition"
                  title="কল করুন"
                >
                  <i className="fa-solid fa-phone text-xs"></i>
                </a>
                <button
                  onClick={() => handleCopy(item.number, item.title)}
                  className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
                  title="কপি করুন"
                >
                  <i className="fa-regular fa-copy text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link to Full Directory & Map */}
      <div className="mt-8 bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            নতুন ডাটাবেজ
          </span>
          <h3 className="text-lg sm:text-xl font-bold mt-1.5">
            বগুড়ার ১২টি উপজেলার ৩৫২টি স্বাস্থ্যসেবা প্রতিষ্ঠান ম্যাপে দেখুন
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
            সরকারি হাসপাতাল, ইউনিয়ন সাব-সেন্টার, কমিউনিটি ক্লিনিক, ডায়াগনস্টিক, ব্লাড ব্যাংক ও অ্যাম্বুলেন্স তালিকা।
          </p>
        </div>
        <Link
          href="/healthcare"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-sm font-bold shadow transition shrink-0"
        >
          <span>পূর্ণ ডিরেক্টরি ও ম্যাপ খুলুন</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </Link>
      </div>
    </section>
  );
}

