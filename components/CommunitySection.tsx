'use client';

import Link from '@/lib/i18n/navigation';
import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';
import { CommunityPost } from '@/lib/data/district-data';
import { useCommunityAuth } from '@/lib/context/CommunityAuthContext';

interface CommunitySectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  communityData: Record<string, CommunityPost[]>;
  onOpenModal: () => void;
  isHome?: boolean;
}

export default function CommunitySection({
  activeTab,
  onTabChange,
  communityData,
  onOpenModal,
  isHome = false,
}: CommunitySectionProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { user, isLoggedIn, openAuthPage } = useCommunityAuth();

  const [selectedUpazila, setSelectedUpazila] = useState('ALL');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('ALL');
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [showBloodBanks, setShowBloodBanks] = useState(false);
  const [showAll, setShowAll] = useState(false);
  // Blood tab: donors (people who can give) and requests (someone needs blood) are different things
  const [bloodView, setBloodView] = useState<'all' | 'donor' | 'request'>('all');

  const emergencyBloodBanks = [
    { name: 'সন্ধানী (শজিমেক ইউনিট)', phone: '051-60862', mobile: '01712-252525', location: 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ' },
    { name: 'রেড ক্রিসেন্ট রক্ত কেন্দ্র', phone: '051-66543', mobile: '01711-385036', location: 'সূত্রাপুর, বগুড়া সদর' },
    { name: 'বাঁধন (আজিজুল হক কলেজ)', phone: '01719-334455', mobile: '01724-889900', location: 'সরকারি আজিজুল হক কলেজ ক্যাম্পাস' },
    { name: 'টিএমএসএস ব্লাড ব্যাংক', phone: '051-65555', mobile: '01713-377000', location: 'নওদাপাড়া, রংপুর রোড' },
    { name: 'মোহাম্মদ আলী হাসপাতাল ব্লাড ব্যাংক', phone: '051-66020', mobile: '01711-020626', location: 'হাসপাতাল রোড, বগুড়া' },
  ];

  const upazilaOptions = [
    'ALL',
    'বগুড়া সদর',
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
    'ধুনট'
  ];

  const bloodGroups = ['ALL', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const maskPhoneNumber = (phone: string) => {
    if (!phone) return '';
    const clean = phone.replace(/[\s-]/g, '');
    if (clean.length >= 10) {
      const prefix = clean.slice(0, 5);
      const suffix = clean.slice(-3);
      return `${prefix}-•••${suffix}`;
    }
    return '••••••••••';
  };

  const toggleRevealPhone = (id: string, name: string) => {
    setRevealedPhones(prev => {
      const isCurrentlyRevealed = !!prev[id];
      if (!isCurrentlyRevealed) {
        showToast(`${name}-এর যোগাযোগ নম্বর প্রদর্শিত হচ্ছে`);
      }
      return { ...prev, [id]: !isCurrentlyRevealed };
    });
  };

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`কপি হয়েছে: ${label} (${text})`);
    } else {
      showToast(`নম্বর: ${text}`);
    }
  };

  const currentItems = communityData[activeTab] || [];

  const filteredItems = currentItems.filter(item => {
    const matchUpazila = selectedUpazila === 'ALL' || item.upazila === selectedUpazila;
    const matchBlood =
      activeTab !== 'blood' ||
      selectedBloodGroup === 'ALL' ||
      item.group === selectedBloodGroup;
    const matchKind =
      activeTab !== 'blood' ||
      bloodView === 'all' ||
      (bloodView === 'request' ? item.kind === 'blood_request' : item.kind !== 'blood_request');
    return matchUpazila && matchBlood && matchKind;
  });

  const bloodItems = communityData.blood || [];
  const requestCount = bloodItems.filter(i => i.kind === 'blood_request').length;
  const donorCount = bloodItems.length - requestCount;

  const displayedItems = (isHome && !showAll) ? filteredItems.slice(0, 6) : filteredItems;

  return (
    <section id="community" aria-labelledby="community-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-3.5 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {t('community.badge')}
            </span>
            <h2 id="community-title" className="text-xl sm:text-3xl font-bold text-slate-900 mt-2">
              {t('community.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              {t('community.subtitle')}
            </p>
          </div>

          {/* Action Buttons to Post/Contribute */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contribute"
              className="px-4 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <i className="fa-solid fa-heart-circle-plus text-rose-500"></i>
              <span>অবদান পোর্টাল</span>
            </Link>

            <button
              onClick={onOpenModal}
              className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <i className="fa-solid fa-plus"></i>
              <span>{t('community.addButton')}</span>
            </button>
          </div>
        </div>

        {/* Community Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 border-b border-slate-100" role="tablist">
          {/* Blood */}
          <button
            onClick={() => onTabChange('blood')}
            className={`px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shrink-0 transition cursor-pointer ${
              activeTab === 'blood'
                ? 'font-bold bg-emerald-800 text-white shadow-sm'
                : 'font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <i className="fa-solid fa-droplet text-rose-400"></i>
            <span>{t('community.tabs.blood')}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/20">
              {(communityData.blood || []).filter(p => p.kind !== 'blood_request').length}
            </span>
          </button>

          {/* Tuition */}
          <button
            onClick={() => onTabChange('tuition')}
            className={`px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shrink-0 transition cursor-pointer ${
              activeTab === 'tuition'
                ? 'font-bold bg-emerald-800 text-white shadow-sm'
                : 'font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <i className="fa-solid fa-graduation-cap text-emerald-700"></i>
            <span>{t('community.tabs.tuition')}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {communityData.tuition?.length || 0}
            </span>
          </button>

          {/* Rent */}
          <button
            onClick={() => onTabChange('rent')}
            className={`px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shrink-0 transition cursor-pointer ${
              activeTab === 'rent'
                ? 'font-bold bg-emerald-800 text-white shadow-sm'
                : 'font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <i className="fa-solid fa-house-chimney text-amber-600"></i>
            <span>{t('community.tabs.rent')}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {communityData.rent?.length || 0}
            </span>
          </button>

          {/* Jobs */}
          <button
            onClick={() => onTabChange('jobs')}
            className={`px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shrink-0 transition cursor-pointer ${
              activeTab === 'jobs'
                ? 'font-bold bg-emerald-800 text-white shadow-sm'
                : 'font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <i className="fa-solid fa-briefcase text-indigo-600"></i>
            <span>{t('community.tabs.jobs')}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {communityData.jobs?.length || 0}
            </span>
          </button>

          {/* Business */}
          <button
            onClick={() => onTabChange('business')}
            className={`px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shrink-0 transition cursor-pointer ${
              activeTab === 'business'
                ? 'font-bold bg-emerald-800 text-white shadow-sm'
                : 'font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <i className="fa-solid fa-store text-amber-700"></i>
            <span>{t('community.tabs.business')}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {communityData.business?.length || 0}
            </span>
          </button>
        </div>

        {/* Community Platform Citizen Banner */}
        {!isLoggedIn && (
          <div className="mt-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 text-sm shadow-xs">
                <i className="fa-solid fa-users-viewfinder"></i>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <span>বগুড়া কমিউনিটি প্ল্যাটফর্ম সদস্যপদ</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full border border-emerald-200">
                    ফ্রি নিবন্ধন
                  </span>
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                  ভেরিফায়েড নাগরিক হিসেবে রক্তদান, টিউশন, বাসা ভাড়া বা চাকরির তথ্য সরাসরি যুক্ত করতে লগইন বা নতুন অ্যাকাউন্ট নিবন্ধন করুন।
                </p>
              </div>
            </div>
            <button
              onClick={() => openAuthPage('login')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <i className="fa-solid fa-arrow-right-to-bracket text-[11px]"></i>
              <span>লগইন / নিবন্ধন</span>
            </button>
          </div>
        )}

        {/* Dynamic Filters Bar */}
        <div className="pt-5 pb-3 flex flex-wrap items-center gap-3">
          {/* Upazila select */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">উপজেলা:</span>
            <select
              value={selectedUpazila}
              onChange={e => setSelectedUpazila(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              {upazilaOptions.map(u => (
                <option key={u} value={u}>
                  {u === 'ALL' ? 'সব উপজেলা' : u}
                </option>
              ))}
            </select>
          </div>

          {/* Donors vs requests */}
          {activeTab === 'blood' && (
            <div role="tablist" aria-label="রক্তদাতা ও রক্তের অনুরোধ" className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 w-fit max-w-full overflow-x-auto no-scrollbar">
              {([
                ['all', 'সবগুলো', bloodItems.length],
                ['donor', 'রক্তদাতা', donorCount],
                ['request', 'রক্ত প্রয়োজন', requestCount],
              ] as const).map(([key, label, n]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={bloodView === key}
                  onClick={() => setBloodView(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${bloodView === key ? (key === 'request' ? 'bg-rose-600 text-white shadow-xs' : 'bg-white text-emerald-800 shadow-xs') : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <span>{label}</span>
                  <span className="text-[10px] opacity-70">{n}</span>
                </button>
              ))}
            </div>
          )}

          {/* Blood group pills if blood tab is active */}
          {activeTab === 'blood' && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-500 mr-1 shrink-0">গ্রুপ:</span>
              <div className="flex items-center gap-1.5 shrink-0">
                {bloodGroups.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedBloodGroup(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedBloodGroup === g
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    {g === 'ALL' ? 'সব' : g}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowBloodBanks(!showBloodBanks)}
                className={`ml-2 px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                  showBloodBanks
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <span>জরুরি ব্লাড ব্যাংক ({emergencyBloodBanks.length})</span>
                <i className={`fa-solid fa-chevron-${showBloodBanks ? 'up' : 'down'} text-[10px]`}></i>
              </button>
            </div>
          )}
        </div>

        {/* Blood Donor Privacy Shield Alert Banner */}
        {activeTab === 'blood' && (
          <div className="mt-4 mb-3 p-4 rounded-2xl bg-gradient-to-r from-rose-50/90 via-amber-50/70 to-emerald-50/80 border border-rose-200/80 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 text-sm shadow-xs">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <div className="flex-1 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span>রক্তদাতা প্রাইভেসী ও সুরক্ষা গার্ড</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                      <i className="fa-solid fa-shield-halved text-emerald-700"></i> সুরক্ষিত
                    </span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    <i className="fa-solid fa-lock text-rose-500 mr-1"></i> স্ক্র্যাপার ও স্প্যাম সুরক্ষিত
                  </span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed text-xs">
                  রক্তদাতাদের ব্যক্তিগত গোপনীয়তা রক্ষায় যোগাযোগের নম্বরগুলো ডিফল্টভাবে সুরক্ষিত রাখা হয়েছে। রোগীর <strong>জরুরি রক্তের প্রয়োজনে</strong> সংশ্লিষ্ট ডোনার কার্ডের <em>"নম্বর দেখুন ও কল করুন"</em> বাটনে ক্লিক করুন। অনুগ্রহ করে অযাচিত বা অ-জরুরি উদ্দেশ্যে কল করা থেকে বিরত থাকুন।
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-slate-500 text-[11px] font-medium pt-2 border-t border-rose-200/60">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <i className="fa-solid fa-circle-check"></i> সম্পূর্ণ বিনামূল্যে রক্তদান
                  </span>
                  <span className="inline-flex items-center gap-1 text-rose-700 font-semibold">
                    <i className="fa-solid fa-ban"></i> কোনো আর্থিক লেনদেন নয়
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <i className="fa-solid fa-phone-volume"></i> ২৪/৭ সন্ধানী শজিমেক: <strong>051-60862</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Blood Banks Quick Drawer (when active) */}
        {activeTab === 'blood' && showBloodBanks && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <i className="fa-solid fa-hospital-user text-emerald-700"></i>
                <span>বগুড়া জেলার প্রাতিষ্ঠানিক ব্লাড ব্যাংক ও হটলাইন</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ২৪/৭ প্রস্তুত
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {emergencyBloodBanks.map((bb, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{bb.name}</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      <i className="fa-solid fa-location-dot text-rose-500 mr-1"></i>{bb.location}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-200/60">
                    <a
                      href={`tel:${bb.mobile || bb.phone}`}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <i className="fa-solid fa-phone"></i> <span>{bb.mobile || bb.phone}</span>
                    </a>
                    {bb.phone && bb.mobile && (
                      <a
                        href={`tel:${bb.phone}`}
                        className="py-1.5 px-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                        title="টিঅ্যান্ডটি ফোন"
                      >
                        <i className="fa-solid fa-phone-flip text-[10px]"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Cards Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-1 animate-fade-in overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-3.5 px-3.5 md:mx-0 md:px-0 [&>*]:snap-start [&>*]:shrink-0 [&>*]:w-[82%] min-[480px]:[&>*]:w-[55%] md:[&>*]:w-auto">
          {displayedItems.length === 0 ? (
            <div className="col-span-full text-center py-10 bg-slate-50 rounded-2xl border border-slate-200/70">
              <p className="text-sm text-slate-500">
                নির্বাচিত ফিল্টারে কোনো তথ্য পাওয়া যায়নি। নতুন তথ্য যুক্ত করতে উপরের বাটনে ক্লিক করুন।
              </p>
            </div>
          ) : (
            displayedItems.map(item => {
              if (activeTab === 'blood') {
                const isUrgent = item.role === 'জরুরি প্রয়োজন' || item.role === 'জরুরি রক্তদাতা';
                const isRevealed = !!revealedPhones[item.id];
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-4 sm:p-5 border ${
                      isUrgent
                        ? 'bg-rose-50/60 border-rose-200'
                        : 'bg-slate-50/70 border-slate-200/90'
                    } card-hover flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`w-11 h-11 rounded-xl ${
                            isUrgent
                              ? 'bg-rose-600 text-white'
                              : 'bg-rose-100 text-rose-700 border border-rose-200'
                          } font-extrabold text-base flex items-center justify-center shadow-xs`}
                        >
                          {item.group}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                              isUrgent
                                ? 'bg-rose-600 text-white animate-pulse'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {item.role || 'রক্তদাতা'}
                          </span>
                          {(item.badge === 'ভেরিফায়েড নাগরিক' || item.isApproved) && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                              <i className="fa-solid fa-circle-check text-emerald-600"></i> ভেরিফায়েড
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1" title="ব্যক্তিগত গোপনীয়তা সক্রিয়">
                          <i className={`fa-solid ${isRevealed ? 'fa-lock-open text-emerald-600' : 'fa-shield text-slate-400'}`}></i>
                          <span>{isRevealed ? 'উন্মুক্ত' : 'সুরক্ষিত'}</span>
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-800 mt-1">
                        <i className="fa-solid fa-location-dot mr-1"></i> {item.upazila}
                      </p>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.detail}</p>
                    </div>

                    {/* Privacy-Preserved Contact Action Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-200/70">
                      {!isRevealed ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleRevealPhone(item.id, item.name)}
                            className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs active:scale-[0.98]"
                          >
                            <i className="fa-solid fa-phone-volume"></i>
                            <span>নম্বর দেখুন ও কল করুন</span>
                          </button>
                          <span
                            className="text-xs font-mono font-semibold text-slate-400 bg-white px-2.5 py-2 rounded-xl border border-slate-200"
                            title="গোপনীয়তার স্বার্থে নম্বরটি আড়াল করা আছে"
                          >
                            {maskPhoneNumber(item.phone)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 animate-fade-in">
                          <a
                            href={`tel:${item.phone}`}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                          >
                            <i className="fa-solid fa-phone"></i> <span>{item.phone}</span>
                          </a>
                          <button
                            onClick={() => handleCopy(item.phone, item.name)}
                            className="py-2 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                            title="কপি করুন"
                          >
                            <i className="fa-regular fa-copy"></i>
                          </button>
                          <button
                            onClick={() => toggleRevealPhone(item.id, item.name)}
                            className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs cursor-pointer"
                            title="নম্বর আড়াল করুন"
                          >
                            <i className="fa-solid fa-eye-slash"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Tuition, Rent, Jobs, Business Cards
              return (
                <div
                  key={item.id}
                  className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/90 card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          {item.badge}
                        </span>
                        {(item.badge === 'ভেরিফায়েড নাগরিক' || item.isApproved) && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <i className="fa-solid fa-circle-check text-emerald-600"></i> ভেরিফায়েড
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-emerald-800">
                        <i className="fa-solid fa-location-dot text-amber-600 mr-0.5"></i>{' '}
                        {item.upazila}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-2">
                    <a
                      href={`tel:${item.phone}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <i className="fa-solid fa-phone"></i>{' '}
                      <span>যোগাযোগ: {item.phone}</span>
                    </a>
                    <button
                      onClick={() => handleCopy(item.phone, item.name)}
                      className="py-2 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                      title="কপি করুন"
                    >
                      <i className="fa-regular fa-copy"></i>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Short list expander & details page link when on Home */}
        {isHome && filteredItems.length > 6 && (
          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>
                মোট <strong>{filteredItems.length}</strong>টি তথ্যের মধ্যে শীর্ষ <strong>{displayedItems.length}</strong>টি প্রদর্শিত হচ্ছে
              </span>
            </div>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <i className={`fa-solid ${showAll ? 'fa-compress' : 'fa-expand'}`}></i>
                <span>{showAll ? 'সংক্ষিপ্ত করুন' : `আরও ${filteredItems.length - 6}টি দেখুন`}</span>
              </button>
              <Link
                href="/community"
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition"
              >
                <span>সকল রক্তদাতা ও পোস্ট দেখুন</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

