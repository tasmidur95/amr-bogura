'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';
import { CommunityPost } from '@/lib/data/district-data';

interface CommunitySectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  communityData: Record<string, CommunityPost[]>;
  onOpenModal: () => void;
}

export default function CommunitySection({
  activeTab,
  onTabChange,
  communityData,
  onOpenModal,
}: CommunitySectionProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [selectedUpazila, setSelectedUpazila] = useState('ALL');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('ALL');

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
    return matchUpazila && matchBlood;
  });

  return (
    <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {t('sec02Badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              {t('sec02Title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              {t('sec02Subtitle')}
            </p>
          </div>

          {/* Action Button to Post/Contribute */}
          <button
            onClick={onOpenModal}
            className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition shrink-0 cursor-pointer"
          >
            <i className="fa-solid fa-plus"></i>
            <span>{t('btnPostCommunity')}</span>
          </button>
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
            <span>{t('tabBlood')}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/20">
              {communityData.blood?.length || 0}
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
            <span>{t('tabTuition')}</span>
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
            <span>{t('tabRent')}</span>
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
            <span>{t('tabJobs')}</span>
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
            <span>{t('tabBusiness')}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {communityData.business?.length || 0}
            </span>
          </button>
        </div>

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

          {/* Blood group pills if blood tab is active */}
          {activeTab === 'blood' && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-500 mr-1">গ্রুপ:</span>
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
          )}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 animate-fade-in">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-10 bg-slate-50 rounded-2xl border border-slate-200/70">
              <p className="text-sm text-slate-500">
                নির্বাচিত ফিল্টারে কোনো তথ্য পাওয়া যায়নি। নতুন তথ্য যুক্ত করতে উপরের বাটনে ক্লিক করুন।
              </p>
            </div>
          ) : (
            filteredItems.map(item => {
              if (activeTab === 'blood') {
                const isUrgent = item.role === 'জরুরি প্রয়োজন';
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
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            isUrgent
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {item.role}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                      <p className="text-xs font-semibold text-emerald-800 mt-1">
                        <i className="fa-solid fa-location-dot mr-1"></i> {item.upazila}
                      </p>
                      <p className="text-xs text-slate-600 mt-1.5">{item.detail}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-2">
                      <a
                        href={`tel:${item.phone}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
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
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        {item.badge}
                      </span>
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
      </div>
    </section>
  );
}
