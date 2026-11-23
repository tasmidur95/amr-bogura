'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import SearchModal from '@/components/SearchModal';
import { useToast } from '@/lib/context/ToastContext';
import { useCommunityAuth } from '@/lib/context/CommunityAuthContext';
import ContributorProfileCard from '@/components/ContributorProfileCard';

interface SavedContribution {
  id: string;
  type: 'spot' | 'community';
  title: string;
  category: string;
  upazila: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
  coverImage?: string;
}

function ContributeWorkspace() {
  const { showToast } = useToast();
  const { user, refresh } = useCommunityAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeType, setActiveType] = useState<'spot' | 'blood' | 'tuition' | 'rent' | 'jobs'>('spot');

  // Tourist Spot Form States
  const [spotTitle, setSpotTitle] = useState('');
  const [spotEnTitle, setSpotEnTitle] = useState('');
  const [spotCategory, setSpotCategory] = useState<'archaeological' | 'nature' | 'religious' | 'heritage'>('archaeological');
  const [spotUpazila, setSpotUpazila] = useState('শিবগঞ্জ');
  const [spotLocation, setSpotLocation] = useState('');
  const [spotTag, setSpotTag] = useState('');
  const [spotCoverImage, setSpotCoverImage] = useState('https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80');
  const [spotGallery, setSpotGallery] = useState<string[]>([]);
  const [customGalleryUrl, setCustomGalleryUrl] = useState('');
  const [spotShortDesc, setSpotShortDesc] = useState('');
  const [spotHistory, setSpotHistory] = useState('');
  const [spotHowToReach, setSpotHowToReach] = useState('');
  const [spotTimings, setSpotTimings] = useState('সকাল ৯টা – বিকেল ৫টা');
  const [spotEntryFee, setSpotEntryFee] = useState('বিনামূল্যে');
  const [spotHighlights, setSpotHighlights] = useState('');

  // Community / Blood Form States
  const [commName, setCommName] = useState('');
  const [commPhone, setCommPhone] = useState('');
  const [commUpazila, setCommUpazila] = useState('বগুড়া সদর');
  const [commBloodGroup, setCommBloodGroup] = useState('O+');
  const [commRole, setCommRole] = useState('নিয়মিত রক্তদাতা');
  const [commBadge, setCommBadge] = useState('উপলব্ধ');
  const [commDetail, setCommDetail] = useState('');

  // Contributor Info
  const [contributorName] = useState(user?.name || '');
  const [contributorPhone] = useState(user?.phone || '');
  const [contributorEmail, setContributorEmail] = useState('');
  const [contributorNote, setContributorNote] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myContributions, setMyContributions] = useState<SavedContribution[]>([]);

  // 12 Upazilas
  const upazilaList = [
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

  // Presets of Royalty-Free Unsplash Images
  const sampleImages = [
    { label: 'প্রাচীন ঢিবি / পুণ্ড্রনগর', url: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80' },
    { label: 'টেরাকোটা ও প্রাচীন স্থাপত্য', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80' },
    { label: 'সুলতানি আমলের মসজিদ', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80' },
    { label: 'যমুনা নদী ও বাঁধ', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
    { label: 'ঐতিহাসিক মন্দির / আশ্রম', url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80' }
  ];

  // Load this member's own contributions from the server (requires login)
  const loadMyContributions = async (quiet = true) => {
    try {
      const res = await fetch('/api/contribute', { credentials: 'same-origin', cache: 'no-store' });
      const json = await res.json();
      if (!json.success || !json.data) return;
      const { spots, community } = json.data;
      const items: SavedContribution[] = [
        ...(spots || []).map((s: any) => ({
          id: s.id,
          type: 'spot' as const,
          title: s.title,
          category: s.categoryBn,
          upazila: s.upazila,
          date: s.contributor?.date || '',
          status: s.status || (s.isApproved ? 'approved' : 'pending'),
          rejectReason: s.rejectReason,
          coverImage: s.coverImage,
        })),
        ...(community || []).map((c: any) => ({
          id: c.id,
          type: 'community' as const,
          title: c.name,
          category: c.category,
          upazila: c.upazila,
          date: c.created_at || '',
          status: c.status || (c.isApproved ? 'approved' : 'pending'),
          rejectReason: c.rejectReason,
        })),
      ];
      setMyContributions(items);
      refresh(); // update the profile counters
      if (!quiet) showToast('অবদানের স্ট্যাটাস হালনাগাদ হয়েছে!');
    } catch (err) {
      console.warn('Load contributions error', err);
    }
  };

  useEffect(() => {
    loadMyContributions(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After a successful submit: show it immediately, then re-sync from the server
  const saveContributionToLocal = (item: SavedContribution) => {
    setMyContributions(prev => [item, ...prev.filter(i => i.id !== item.id)]);
    loadMyContributions(true);
  };

  const refreshStatuses = () => loadMyContributions(false);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributorName.trim()) {
      showToast('অনুগ্রহ করে আপনার নাম প্রদান করুন', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      if (activeType === 'spot') {
        if (!spotTitle.trim() || !spotLocation.trim() || !spotShortDesc.trim()) {
          showToast('স্থানের শিরোনাম, অবস্থান ও সংক্ষিপ্ত বিবরণ আবশ্যক', 'error');
          setIsSubmitting(false);
          return;
        }

        const categoryBnMap: Record<string, string> = {
          archaeological: 'প্রত্নতাত্ত্বিক নিদর্শন',
          nature: 'নদী ও প্রাকৃতিক সৌন্দর্য',
          religious: 'ধর্মীয় ও আধ্যাত্মিক স্থান',
          heritage: 'ঐতিহাসিক স্থাপত্য ও সংস্কৃতি'
        };

        const highlightsArr = spotHighlights
          .split(',')
          .map(h => h.trim())
          .filter(Boolean);

        const payload = {
          type: 'spot',
          data: {
            title: spotTitle,
            enTitle: spotEnTitle || spotTitle,
            category: spotCategory,
            categoryBn: categoryBnMap[spotCategory] || 'ঐতিহ্য ও দর্শনীয় স্থান',
            location: spotLocation,
            upazila: spotUpazila,
            tag: spotTag || 'নাগরিক প্রস্তাবিত স্থান',
            coverImage: spotCoverImage,
            gallery: Array.from(new Set([spotCoverImage, ...spotGallery].filter(Boolean))),
            shortDesc: spotShortDesc,
            history: spotHistory || spotShortDesc,
            architecture: '',
            howToReach: spotHowToReach || 'বগুড়া শহর থেকে বাস বা সিএনজি যোগে পৌঁছানো যায়।',
            highlights: highlightsArr.length > 0 ? highlightsArr : [spotTitle, spotLocation],
            timings: spotTimings,
            entryFee: spotEntryFee,
            bestTime: 'সারা বছর',
            mapCoordinates: '',
            mapUrl: `https://maps.google.com/?q=${encodeURIComponent(spotTitle + ', বগুড়া')}`,
            contributorName,
            contributorPhone,
            contributorEmail,
            contributorNote
          }
        };

        const res = await fetch('/api/contribute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const json = await res.json();
        if (json.success && json.data) {
          saveContributionToLocal({
            id: json.data.id,
            type: 'spot',
            title: json.data.title,
            category: json.data.categoryBn,
            upazila: json.data.upazila,
            date: 'আজ',
            status: 'pending',
            coverImage: json.data.coverImage
          });

          showToast('ধন্যবাদ! আপনার দর্শনীয় স্থানটি জমা হয়েছে। মডারেটরের অনুমোদনের অপেক্ষায় রয়েছে।');
          // Reset form
          setSpotTitle('');
          setSpotEnTitle('');
          setSpotLocation('');
          setSpotShortDesc('');
          setSpotHistory('');
          setSpotHowToReach('');
        } else {
          showToast(json.error || 'জমা দিতে সমস্যা হয়েছে', 'error');
        }
      } else {
        // Community submission
        if (!commName.trim() || !commPhone.trim() || !commDetail.trim()) {
          showToast('নাম/শিরোনাম, ফোন নম্বর ও বিস্তারিত বিবরণ আবশ্যক', 'error');
          setIsSubmitting(false);
          return;
        }

        const payload = {
          type: 'community',
          data: {
            category: activeType === 'blood' ? 'blood' : activeType,
            name: commName,
            group: activeType === 'blood' ? commBloodGroup : undefined,
            role: activeType === 'blood' ? commRole : undefined,
            badge: activeType !== 'blood' ? commBadge : undefined,
            upazila: commUpazila,
            detail: commDetail,
            phone: commPhone,
            contributorName,
            contributorPhone
          }
        };

        const res = await fetch('/api/contribute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const json = await res.json();
        if (json.success && json.data) {
          saveContributionToLocal({
            id: json.data.id,
            type: 'community',
            title: json.data.name,
            category: activeType === 'blood' ? `রক্তদাতা (${commBloodGroup})` : activeType,
            upazila: json.data.upazila,
            date: 'আজ',
            status: 'pending'
          });

          showToast('আপনার তথ্যটি জমা হয়েছে! মডারেশন শেষে তা কমিউনিটিতে যুক্ত হবে।');
          setCommName('');
          setCommPhone('');
          setCommDetail('');
        } else {
          showToast(json.error || 'জমা দিতে সমস্যা হয়েছে', 'error');
        }
      }
    } catch (err: any) {
      showToast(err.message || 'নেটওয়ার্ক সংযোগে সমস্যা হয়েছে', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar
        currentView="contribute"
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Contributor Hero Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-3">
              <i className="fa-solid fa-heart-circle-bolt animate-pulse"></i>
              <span>নাগরিক অবদান ও ঐতিহ্য সংরক্ষণ পোর্টাল</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              আমার বগুড়ায় অবদান রাখুন
            </h1>
            <p className="mt-2 text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              বগুড়ার অদেখা প্রত্নতাত্ত্বিক নিদর্শন, দর্শনীয় স্থান, স্থানীয় রক্তদাতা নেটওয়ার্ক কিংবা জরুরি নাগরিক সেবা যুক্ত করে প্রাচীন পুণ্ড্রনগরীর ডিজিটাল বাতায়নকে সমৃদ্ধ করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#tracker"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>আমার অবদান ট্র্যাকার ({myContributions.length})</span>
            </a>
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/20 font-semibold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <i className="fa-solid fa-shield-halved text-amber-400"></i>
              <span>অ্যাডমিন প্যানেল</span>
            </Link>
          </div>
        </div>
      </div>

      {/* CRO Trust Proof & Reassurance Ribbon */}
      <div className="bg-emerald-900/10 border-b border-emerald-900/20 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-emerald-950">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-700"></i>
            <span>১০০% নাগরিক উদ্যোগ ও উন্মুক্ত পোর্টাল</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-emerald-700"></i>
            <span>রক্তদাতা ও অবদানকারীর তথ্য সম্পূর্ণ সুরক্ষিত</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-bolt text-amber-600"></i>
            <span>২ থেকে ১২ ঘণ্টার মধ্যে দ্রুত যাচাই ও লাইভ</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-award text-emerald-700"></i>
            <span>নাগরিক সম্মাননা ও কন্ট্রিবিউটর ক্রেডিট</span>
          </div>
        </div>
      </div>

      {/* Main Work Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <ContributorProfileCard />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Category Tabs */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Visual Step Progress Indicator */}
            <div className="mb-8 pb-5 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <div className="flex items-center gap-2 text-emerald-800">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">১</span>
                <span>তথ্যের ধরণ</span>
              </div>
              <div className="h-0.5 flex-1 bg-emerald-200 mx-2"></div>
              <div className="flex items-center gap-2 text-emerald-800">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">২</span>
                <span>তথ্য ও বিবরণ</span>
              </div>
              <div className="h-0.5 flex-1 bg-slate-200 mx-2"></div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">৩</span>
                <span>লাইভ ট্র্যাকিং</span>
              </div>
            </div>

            {/* Category Selector Tabs */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                ১. কি ধরনের তথ্য অবদান রাখতে চান নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveType('spot')}
                  className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    activeType === 'spot'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-sm ring-2 ring-emerald-600/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className="fa-solid fa-landmark text-lg text-emerald-700"></i>
                  <span className="text-xs">দর্শনীয় স্থান</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveType('blood')}
                  className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    activeType === 'blood'
                      ? 'border-rose-500 bg-rose-50 text-rose-900 font-bold shadow-sm ring-2 ring-rose-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className="fa-solid fa-droplet text-lg text-rose-600"></i>
                  <span className="text-xs">রক্তদাতা</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveType('tuition')}
                  className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    activeType === 'tuition'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-sm ring-2 ring-blue-600/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className="fa-solid fa-graduation-cap text-lg text-blue-700"></i>
                  <span className="text-xs">টিউশন / শিক্ষা</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveType('rent')}
                  className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    activeType === 'rent'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-sm ring-2 ring-amber-600/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className="fa-solid fa-house-chimney text-lg text-amber-700"></i>
                  <span className="text-xs">বাসা / দোকান</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveType('jobs')}
                  className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    activeType === 'jobs'
                      ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold shadow-sm ring-2 ring-teal-600/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className="fa-solid fa-briefcase text-lg text-teal-700"></i>
                  <span className="text-xs">পেশা ও কাজ</span>
                </button>
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeType === 'spot' ? (
                <>
                  {/* Tourist Spot Specific Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        স্থানের নাম (বাংলায়) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={spotTitle}
                        onChange={e => setSpotTitle(e.target.value)}
                        placeholder="উদা: সুকা শকুনী প্রাচীন ঢিবি"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        স্থানের নাম (ইংরেজিতে)
                      </label>
                      <input
                        type="text"
                        value={spotEnTitle}
                        onChange={e => setSpotEnTitle(e.target.value)}
                        placeholder="e.g. Suka Shakuni Ancient Mound"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        উপজেলা <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={spotUpazila}
                        onChange={e => setSpotUpazila(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      >
                        {upazilaList.map(u => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ধরন / ক্যাটাগরি
                      </label>
                      <select
                        value={spotCategory}
                        onChange={e => setSpotCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      >
                        <option value="archaeological">প্রত্নতাত্ত্বিক নিদর্শন</option>
                        <option value="nature">নদী ও প্রাকৃতিক সৌন্দর্য</option>
                        <option value="religious">ধর্মীয় ও আধ্যাত্মিক স্থান</option>
                        <option value="heritage">ঐতিহাসিক স্থাপত্য ও সংস্কৃতি</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      নির্দিষ্ট অবস্থান / ঠিকানা <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={spotLocation}
                      onChange={e => setSpotLocation(e.target.value)}
                      placeholder="উদা: মুরইল ইউনিয়ন, কাহালু, বগুড়া"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                    />
                  </div>

                  {/* Curated Royalty-Free Photo Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      কভার ছবি (ফ্রি স্টক ছবি বা আপনার ছবির লিঙ্ক)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
                      {sampleImages.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSpotCoverImage(img.url)}
                          className={`group relative rounded-xl overflow-hidden aspect-video border-2 transition text-left ${
                            spotCoverImage === img.url
                              ? 'border-emerald-600 ring-2 ring-emerald-600/30 shadow-sm'
                              : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.label}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1.5">
                            <span className="text-[10px] text-white font-medium truncate">
                              {img.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <input
                      type="url"
                      value={spotCoverImage}
                      onChange={e => setSpotCoverImage(e.target.value)}
                      placeholder="অথবা সরাসরি ছবির ইমেজ URL দিন (https://...)"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                    />
                  </div>

                  {/* Additional Gallery Photos */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-800">
                        <i className="fa-regular fa-images text-emerald-700 mr-1.5"></i>
                        অতিরিক্ত ছবির লিংক যোগ করুন (গ্যালারি অ্যালবাম)
                      </label>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {spotGallery.length}টি অতিরিক্ত ছবি
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      এই স্থানটির আরও ছবি থাকলে তার লিংক যুক্ত করুন। দর্শনার্থীরা অ্যালবামে এগুলো স্লাইড করে দেখতে পাবেন।
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={customGalleryUrl}
                        onChange={e => setCustomGalleryUrl(e.target.value)}
                        placeholder="https://... অন্য কোনো ছবির সরাসরি ইমেজ লিঙ্ক দিন"
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = customGalleryUrl.trim();
                            if (val && !spotGallery.includes(val)) {
                              setSpotGallery(prev => [...prev, val]);
                              setCustomGalleryUrl('');
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const val = customGalleryUrl.trim();
                          if (val && !spotGallery.includes(val)) {
                            setSpotGallery(prev => [...prev, val]);
                            setCustomGalleryUrl('');
                          }
                        }}
                        className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer transition flex items-center gap-1"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                        <span>যোগ করুন</span>
                      </button>
                    </div>

                    {spotGallery.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {spotGallery.map((img, idx) => (
                          <div key={idx} className="relative group w-20 h-14 rounded-xl overflow-hidden border border-slate-300 shadow-2xs">
                            <img src={img} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setSpotGallery(prev => prev.filter((_, i) => i !== idx))}
                              className="absolute top-1 right-1 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] opacity-90 hover:opacity-100 transition shadow cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      সংক্ষিপ্ত পরিচিতি <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={spotShortDesc}
                      onChange={e => setSpotShortDesc(e.target.value)}
                      placeholder="এক বা দুই বাক্যে এই স্থানটির বিশেষত্ব বর্ণনা করুন..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ঐতিহাসিক প্রেক্ষাপট ও বিস্তারিত বিবরণ
                    </label>
                    <textarea
                      rows={3}
                      value={spotHistory}
                      onChange={e => setSpotHistory(e.target.value)}
                      placeholder="স্থানটির অতীত ইতিহাস, লোকগাথা বা প্রত্নতাত্ত্বিক তথ্য..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        যাতায়াত ব্যবস্থা
                      </label>
                      <input
                        type="text"
                        value={spotHowToReach}
                        onChange={e => setSpotHowToReach(e.target.value)}
                        placeholder="বগুড়া চারমাথা থেকে সিএনজি যোগে..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        সময়সূচি
                      </label>
                      <input
                        type="text"
                        value={spotTimings}
                        onChange={e => setSpotTimings(e.target.value)}
                        placeholder="সারাদিন উন্মুক্ত"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        প্রবেশ ফি
                      </label>
                      <input
                        type="text"
                        value={spotEntryFee}
                        onChange={e => setSpotEntryFee(e.target.value)}
                        placeholder="বিনামূল্যে"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Community / Blood Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {activeType === 'blood' ? 'রক্তদাতার পুরো নাম' : 'পোস্টের শিরোনাম / প্রার্থীর নাম'}{' '}
                        <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={commName}
                        onChange={e => setCommName(e.target.value)}
                        placeholder={activeType === 'blood' ? 'উদা: মোঃ আরিফুল ইসলাম' : 'উদা: জলেশ্বরীতলা ৩ রুমের বাসা ভাড়া'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        যোগাযোগের মোবাইল নম্বর <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={commPhone}
                        onChange={e => setCommPhone(e.target.value)}
                        placeholder="017XX-XXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        উপজেলা <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={commUpazila}
                        onChange={e => setCommUpazila(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                      >
                        {upazilaList.map(u => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>

                    {activeType === 'blood' ? (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          রক্তের গ্রুপ <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={commBloodGroup}
                          onChange={e => setCommBloodGroup(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white font-bold text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500"
                        >
                          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                            <option key={bg} value={bg}>
                              {bg}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          ট্যাগ / ব্যাজ
                        </label>
                        <input
                          type="text"
                          value={commBadge}
                          onChange={e => setCommBadge(e.target.value)}
                          placeholder="উদা: শিক্ষক উপলব্ধ / ফ্যামিলি বাসা / ফুল-টাইম"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      বিস্তারিত বিবরণ ও শর্তাবলী <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={commDetail}
                      onChange={e => setCommDetail(e.target.value)}
                      placeholder={
                        activeType === 'blood'
                          ? 'সর্বশেষ রক্তদানের তারিখ, এলাকা এবং কোন সময় কল করা সুবিধাজনক...'
                          : 'বাসা/টিউশন/কাজের বিস্তারিত বিবরণ ও সুযোগ-সুবিধা...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                    />
                  </div>
                </>
              )}

              {/* Contributor Identity Section */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-id-card text-emerald-700"></i>
                  <span>অবদানকারী পরিচয় ও সম্মাননা তথ্য</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      আপনার নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contributorName}
                      readOnly
                      title="আপনার প্রোফাইল থেকে নেওয়া হয়েছে"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 text-xs cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="tel"
                      value={contributorPhone}
                      readOnly
                      title="আপনার প্রোফাইল থেকে নেওয়া হয়েছে"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 text-xs cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ইমেইল (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      value={contributorEmail}
                      onChange={e => setContributorEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
                    />
                  </div>
                </div>
              </div>

              {/* Submission Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      <span>তথ্য যাচাই করে জমা হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane"></i>
                      <span>অনুমোদনের জন্য জমা দিন</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  <i className="fa-solid fa-shield-check text-emerald-600 mr-1"></i>
                  প্রতিটি অবদান অ্যাডমিন মডারেশনের মাধ্যমে যাচাই হয়ে ওয়েবসাইটে লাইভ প্রকাশিত হবে।
                </p>

                {/* CRO Friction Reduction Box */}
                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 flex items-start gap-2.5">
                  <i className="fa-solid fa-circle-info text-emerald-700 mt-0.5 shrink-0 text-sm"></i>
                  <div className="leading-relaxed">
                    <span className="font-bold text-slate-800">জমা দেওয়ার পর কি হবে?</span> আপনার তথ্যটি সরাসরি ট্র্যাকিং আইডিসহ মডারেশন কিউতে সংরক্ষিত হবে। আপনি নিচে আপনার মোবাইল নম্বর লিখে যেকোনো সময় স্ট্যাটাস ট্র্যাক করতে পারবেন।
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Live Card Preview & Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Interactive Preview Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  লাইভ কার্ড প্রিভিউ
                </span>
                <span className="text-[11px] text-slate-600">ওয়েবসাইটে যেমন দেখাবে</span>
              </div>

              {activeType === 'spot' ? (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={spotCoverImage || sampleImages[0].url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold">
                      {spotUpazila}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-base line-clamp-1">
                      {spotTitle || 'প্রস্তাবিত দর্শনীয় স্থানের নাম'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-emerald-700"></i>
                      <span>{spotLocation || 'উপজেলা ও জেলা'}</span>
                    </p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {spotShortDesc || 'স্থানটির সংক্ষিপ্ত সৌন্দর্য ও ইতিহাস এখানে প্রদর্শিত হবে...'}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-800 font-semibold flex items-center gap-1">
                        <i className="fa-solid fa-user text-slate-600"></i>
                        {contributorName || 'অবদানকারী'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-medium border border-amber-200">
                        অপেক্ষমাণ
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {commName || 'পোস্টের শিরোনাম / রক্তদাতার নাম'}
                    </span>
                    {activeType === 'blood' ? (
                      <span className="px-2 py-1 rounded-lg bg-rose-100 text-rose-800 font-black text-xs">
                        {commBloodGroup}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        {commBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-800 font-medium mt-1">
                    <i className="fa-solid fa-location-dot mr-1"></i> {commUpazila}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {commDetail || 'বিস্তারিত বিবরণ এখানে প্রদর্শিত হবে...'}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-700 font-bold">
                      {commPhone || '017XX-XXXXXX'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                      মডারেশন প্রক্রিয়াধীন
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Contributor Honor & Guidelines */}
            <div className="bg-gradient-to-br from-emerald-50 to-amber-50/50 rounded-3xl border border-emerald-200/60 p-5">
              <h4 className="font-bold text-emerald-950 text-sm mb-3 flex items-center gap-2">
                <i className="fa-solid fa-award text-amber-600"></i>
                <span>অবদানকারীর সম্মাননা ও নীতি</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-emerald-600 mt-0.5 shrink-0"></i>
                  <span>
                    <strong>নাগরিক ক্রেডিট:</strong> আপনার দেওয়া প্রতিটি তথ্যের সাথে অবদানকারী হিসেবে আপনার নাম প্রদর্শিত হবে।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-emerald-600 mt-0.5 shrink-0"></i>
                  <span>
                    <strong>সঠিক তথ্য:</strong> ইতিহাস ও অবস্থান যথাসম্ভব নির্ভুলভাবে উল্লেখ করুন।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-emerald-600 mt-0.5 shrink-0"></i>
                  <span>
                    <strong>দ্রুত অনুমোদন:</strong> সাধারণত ২৪ ঘণ্টার মধ্যে আমাদের মডারেটররা তথ্য যাচাই করে লাইভ করেন।
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Contributor Tracker Section (আমার অবদান ট্র্যাকার) */}
        {/* ======================================================== */}
        <section id="tracker" className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                <i className="fa-solid fa-radar"></i>
                <span>লাইভ ট্র্যাকার</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                আমার অবদান ও অনুমোদনের অবস্থা
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                আপনার প্রেরিত তথ্যের বর্তমান মডারেশন স্ট্যাটাস ও ইতিহাস ট্র্যাক করুন
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={refreshStatuses}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-arrows-rotate text-emerald-700"></i>
                <span>স্ট্যাটাস রিফ্রেশ</span>
              </button>
            </div>
          </div>

          {/* List of User's Contributions */}
          {myContributions.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
              <i className="fa-solid fa-folder-open text-4xl text-slate-300 mb-3"></i>
              <h3 className="text-base font-bold text-slate-700">এখনো কোনো অবদান জমা দেননি</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                উপরের ফরমটি পূরণ করে আপনার প্রিয় দর্শনীয় স্থান বা রক্তদাতার তথ্য জমা দিন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myContributions.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {item.upazila} · {item.date}
                      </span>
                      {/* Status Badges */}
                      {item.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <i className="fa-solid fa-circle-check text-emerald-600"></i>
                          <span>অনুমোদিত ও লাইভ</span>
                        </span>
                      ) : item.status === 'rejected' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          <i className="fa-solid fa-circle-xmark text-rose-600"></i>
                          <span>সংশোধন প্রয়োজন</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <i className="fa-solid fa-hourglass-half text-amber-600"></i>
                          <span>অপেক্ষমাণ (Pending)</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-emerald-800 font-medium mt-0.5">
                      {item.category}
                    </p>

                    {item.rejectReason && (
                      <div className="mt-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                        <span className="font-bold">মডারেটর নোট:</span> {item.rejectReason}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      ID: {item.id.slice(0, 10)}...
                    </span>
                    {item.status === 'approved' ? (
                      <Link
                        href={item.type === 'spot' ? `/explore/${item.id}` : '/#community'}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                      >
                        <span>সরাসরি দেখুন</span>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                      </Link>
                    ) : (
                      <span className="text-[11px] text-amber-700 font-medium">
                        মডারেশন কিউতে সংরক্ষিত
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <BottomNav currentView="contribute" />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={() => {}}
      />
    </div>
  );
}


function ContributeGate() {
  const { isReady, isLoggedIn, openAuthPage } = useCommunityAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (isReady && isLoggedIn) return <ContributeWorkspace />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar currentView="contribute" onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1 bg-gradient-to-br from-emerald-950 via-emerald-900 to-amber-950 px-4 py-12 sm:py-20 flex items-center">
        <div className="max-w-xl mx-auto w-full">
          {!isReady ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-2xl" aria-busy="true">
              <i className="fa-solid fa-circle-notch fa-spin text-2xl text-emerald-700"></i>
              <p className="text-sm text-slate-500 mt-3">যাচাই করা হচ্ছে...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-4">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900">অবদান রাখতে লগইন করুন</h1>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  দর্শনীয় স্থান, রক্তদাতা বা কমিউনিটি তথ্য জমা দিতে ইউজারনেম ও পাসওয়ার্ড দিয়ে লগইন করুন। নতুন হলে বিনামূল্যে নিবন্ধন করে অবদানকারী প্রোফাইল তৈরি করুন।
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openAuthPage('login')}
                    className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-right-to-bracket"></i> লগইন করুন
                  </button>
                  <button
                    onClick={() => openAuthPage('register')}
                    className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-user-plus"></i> নতুন প্রোফাইল তৈরি
                  </button>
                </div>
              </div>

              <ul className="bg-slate-50 border-t border-slate-100 px-6 sm:px-8 py-5 grid gap-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2.5"><i className="fa-solid fa-id-card text-emerald-700 w-4"></i> অবদানকারী প্রোফাইল ও সম্মাননা স্তর</li>
                <li className="flex items-center gap-2.5"><i className="fa-solid fa-clock-rotate-left text-emerald-700 w-4"></i> আপনার সব অবদানের অনুমোদন-অবস্থা এক জায়গায়</li>
                <li className="flex items-center gap-2.5"><i className="fa-solid fa-shield-halved text-emerald-700 w-4"></i> ভেরিফায়েড সদস্যের তথ্য — স্প্যাম ও ভুয়া তথ্য প্রতিরোধ</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav currentView="contribute" />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={() => {}} />
    </div>
  );
}

export default function ContributePage() {
  return <ContributeGate />;
}
