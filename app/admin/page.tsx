'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { useToast } from '@/lib/context/ToastContext';

interface SpotItem {
  id: string;
  title: string;
  enTitle?: string;
  category: string;
  categoryBn: string;
  location: string;
  upazila: string;
  tag: string;
  coverImage: string;
  shortDesc: string;
  history?: string;
  howToReach?: string;
  timings?: string;
  entryFee?: string;
  isApproved: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
  contributor: {
    name: string;
    phone?: string;
    email?: string;
    date: string;
    note?: string;
  };
}

interface CommunityItem {
  id: string;
  category: string;
  name: string;
  group?: string;
  role?: string;
  badge?: string;
  upazila: string;
  detail: string;
  phone: string;
  created_at?: string;
  isApproved?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  contributorName?: string;
  contributorPhone?: string;
  rejectReason?: string;
}

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  location?: string;
  isApproved?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  spotId?: string;
  spotTitle?: string;
  rejectReason?: string;
}

interface SubmissionCounts {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  total: number;
  spotsPending: number;
  communityPending: number;
  reviewsPending: number;
  spotsApproved: number;
  communityApproved: number;
  reviewsApproved: number;
}

export default function AdminPage() {
  const { showToast } = useToast();

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Data States
  const [isLoading, setIsLoading] = useState(false);
  const [spots, setSpots] = useState<SpotItem[]>([]);
  const [community, setCommunity] = useState<CommunityItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [counts, setCounts] = useState<SubmissionCounts>({
    totalPending: 0,
    totalApproved: 0,
    totalRejected: 0,
    total: 0,
    spotsPending: 0,
    communityPending: 0,
    reviewsPending: 0,
    spotsApproved: 0,
    communityApproved: 0,
    reviewsApproved: 0
  });

  // Filter States
  const [activeStatusTab, setActiveStatusTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedType, setSelectedType] = useState<'all' | 'spot' | 'community' | 'review'>('all');
  const [selectedUpazila, setSelectedUpazila] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [inspectSpot, setInspectSpot] = useState<SpotItem | null>(null);
  const [inspectCommunity, setInspectCommunity] = useState<CommunityItem | null>(null);

  // Reject Modal
  const [rejectTarget, setRejectTarget] = useState<{
    type: 'spot' | 'community' | 'review';
    id: string;
    title: string;
  } | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState('অসম্পূর্ণ বা তথ্য যাচাই প্রয়োজন');

  // Check saved session on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('amar_bogura_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;
    setIsAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: passkeyInput.trim() })
      });
      const data = await res.json();

      if (data.success && data.token) {
        sessionStorage.setItem('amar_bogura_admin_token', data.token);
        setIsAuthenticated(true);
        showToast('অ্যাডমিন প্যানেলে স্বাগতম!');
        fetchSubmissions();
      } else {
        setAuthError(data.error || 'ভুল পাসকি! সঠিক কোড দিন (ডিফল্ট: bogura2026)');
      }
    } catch (err: any) {
      setAuthError('অথেনটিকেশন ব্যর্থ হয়েছে');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('amar_bogura_admin_token');
    setIsAuthenticated(false);
    setPasskeyInput('');
    showToast('সফলভাবে লগআউট সম্পন্ন হয়েছে');
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/submissions?status=all');
      const json = await res.json();
      if (json.success && json.data) {
        setSpots(json.data.spots || []);
        setCommunity(json.data.community || []);
        setReviews(json.data.reviews || []);
        if (json.data.counts) {
          setCounts(json.data.counts);
        }
      }
    } catch (err) {
      showToast('ডাটা লোড করতে ব্যর্থ হয়েছে', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Perform Approval Action
  const handleApprove = async (type: 'spot' | 'community' | 'review', id: string, title: string) => {
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action: 'approve' })
      });
      const json = await res.json();
      if (json.success) {
        showToast(`"${title}" সফলভাবে অনুমোদিত ও লাইভ হয়েছে!`);
        fetchSubmissions();
        if (inspectSpot?.id === id) setInspectSpot(null);
        if (inspectCommunity?.id === id) setInspectCommunity(null);
      } else {
        showToast(json.error || 'অনুমোদন ব্যর্থ হয়েছে', 'error');
      }
    } catch (err) {
      showToast('সার্ভার যোগাযোগে সমস্যা হয়েছে', 'error');
    }
  };

  // Confirm Reject
  const handleConfirmReject = async () => {
    if (!rejectTarget) return;
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: rejectTarget.type,
          id: rejectTarget.id,
          action: 'reject',
          reason: rejectReasonInput
        })
      });
      const json = await res.json();
      if (json.success) {
        showToast(`"${rejectTarget.title}" বাতিল করা হয়েছে।`);
        setRejectTarget(null);
        fetchSubmissions();
        if (inspectSpot?.id === rejectTarget.id) setInspectSpot(null);
        if (inspectCommunity?.id === rejectTarget.id) setInspectCommunity(null);
      } else {
        showToast(json.error || 'বাতিলকরণ ব্যর্থ হয়েছে', 'error');
      }
    } catch (err) {
      showToast('সার্ভার সমস্যা হয়েছে', 'error');
    }
  };

  // Delete Action
  const handleDelete = async (type: 'spot' | 'community' | 'review', id: string, title: string) => {
    if (!confirm(`আপনি কি নিশ্চিত যে "${title}" স্থায়ীভাবে মুছে ফেলতে চান?`)) return;

    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action: 'delete' })
      });
      const json = await res.json();
      if (json.success) {
        showToast(`"${title}" সফলভাবে মুছে ফেলা হয়েছে।`);
        fetchSubmissions();
      } else {
        showToast(json.error || 'মুছে ফেলা যায়নি', 'error');
      }
    } catch (err) {
      showToast('মুছতে সমস্যা হয়েছে', 'error');
    }
  };

  // 12 Upazilas of Bogura
  const upazilaList = [
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

  // ==========================================
  // LOGIN SCREEN (PIN PASSKEY GATE)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-800 rounded-3xl border border-slate-700 p-8 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <BrandLogo variant="full" size="lg" theme="dark" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
            <i className="fa-solid fa-lock"></i>
            <span>সুরক্ষিত মডারেশন ও অ্যাডমিন কনসোল</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            অ্যাডমিন প্রবেশাধিকার
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            নাগরিক অবদানসমূহ যাচাই, সম্পাদনা ও ওয়েবসাইটে লাইভ প্রকাশের জন্য পাসকি লিখুন।
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="password"
                  required
                  value={passkeyInput}
                  onChange={e => {
                    setPasskeyInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="অ্যাডমিন পাসকি দিন (যেমন: bogura2026)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono tracking-wider"
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
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAuthLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>যাচাই হচ্ছে...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span>লগইন করুন</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px] bg-slate-700/60 px-2.5 py-1 rounded-md text-amber-300 font-mono">
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
  // FILTERING LOGIC
  // ==========================================
  const filteredSpots = spots.filter(s => {
    const matchStatus =
      activeStatusTab === 'pending'
        ? s.status === 'pending' || !s.isApproved
        : activeStatusTab === 'approved'
        ? s.status === 'approved' || (s.isApproved && s.status !== 'rejected')
        : s.status === 'rejected';

    const matchUpazila = selectedUpazila === 'ALL' || s.upazila === selectedUpazila;
    const matchSearch =
      !searchQuery.trim() ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contributor.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchUpazila && matchSearch;
  });

  const filteredCommunity = community.filter(c => {
    const matchStatus =
      activeStatusTab === 'pending'
        ? c.status === 'pending' || !c.isApproved
        : activeStatusTab === 'approved'
        ? c.status === 'approved' || (c.isApproved && c.status !== 'rejected')
        : c.status === 'rejected';

    const matchUpazila = selectedUpazila === 'ALL' || c.upazila === selectedUpazila;
    const matchSearch =
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);

    return matchStatus && matchUpazila && matchSearch;
  });

  const filteredReviews = reviews.filter(r => {
    const matchStatus =
      activeStatusTab === 'pending'
        ? r.status === 'pending' || !r.isApproved
        : activeStatusTab === 'approved'
        ? r.status === 'approved' || (r.isApproved && r.status !== 'rejected')
        : r.status === 'rejected';

    const matchSearch =
      !searchQuery.trim() ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="shrink-0">
              <BrandLogo variant="horizontal" size="sm" theme="dark" />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-slate-700"></div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              মডারেশন প্যানেল
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contribute"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              <i className="fa-solid fa-plus text-emerald-400"></i>
              <span>নতুন অবদান ফরম</span>
            </Link>

            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-globe text-amber-400"></i>
              <span>ওয়েবসাইট</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="লগআউট"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Analytics & Metrics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Pending Queue Count Card */}
          <div
            onClick={() => setActiveStatusTab('pending')}
            className={`p-5 rounded-2xl border transition cursor-pointer shadow-sm ${
              activeStatusTab === 'pending'
                ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-500/30'
                : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                অপেক্ষমাণ আবেদন
              </span>
              <span
                className={`p-2 rounded-xl text-xs ${
                  activeStatusTab === 'pending' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
                }`}
              >
                <i className="fa-solid fa-clock animate-pulse"></i>
              </span>
            </div>
            <div className="text-3xl font-extrabold">{counts.totalPending}</div>
            <p className="text-[11px] opacity-80 mt-1">অনুমোদনের জন্য প্রস্তুত</p>
          </div>

          {/* Approved & Live Spots */}
          <div
            onClick={() => {
              setActiveStatusTab('approved');
              setSelectedType('spot');
            }}
            className={`p-5 rounded-2xl border transition cursor-pointer shadow-sm ${
              activeStatusTab === 'approved' && selectedType === 'spot'
                ? 'bg-emerald-800 text-white border-emerald-700 ring-2 ring-emerald-600/30'
                : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                দর্শনীয় স্থান (লাইভ)
              </span>
              <span className="p-2 rounded-xl text-xs bg-emerald-100 text-emerald-800">
                <i className="fa-solid fa-landmark"></i>
              </span>
            </div>
            <div className="text-3xl font-extrabold">{counts.spotsApproved}</div>
            <p className="text-[11px] text-slate-500 mt-1">ওয়েবসাইটে প্রকাশিত</p>
          </div>

          {/* Approved Community Posts */}
          <div
            onClick={() => {
              setActiveStatusTab('approved');
              setSelectedType('community');
            }}
            className={`p-5 rounded-2xl border transition cursor-pointer shadow-sm ${
              activeStatusTab === 'approved' && selectedType === 'community'
                ? 'bg-emerald-800 text-white border-emerald-700 ring-2 ring-emerald-600/30'
                : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                কমিউনিটি ও রক্তদাতা
              </span>
              <span className="p-2 rounded-xl text-xs bg-rose-100 text-rose-800">
                <i className="fa-solid fa-users"></i>
              </span>
            </div>
            <div className="text-3xl font-extrabold">{counts.communityApproved}</div>
            <p className="text-[11px] text-slate-500 mt-1">নাগরিক সেবা পোস্ট</p>
          </div>

          {/* Rejected Archive */}
          <div
            onClick={() => setActiveStatusTab('rejected')}
            className={`p-5 rounded-2xl border transition cursor-pointer shadow-sm ${
              activeStatusTab === 'rejected'
                ? 'bg-rose-900 text-white border-rose-800 ring-2 ring-rose-600/30'
                : 'bg-white text-slate-800 border-slate-200 hover:border-rose-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                বাতিলকৃত আবেদন
              </span>
              <span className="p-2 rounded-xl text-xs bg-rose-100 text-rose-800">
                <i className="fa-solid fa-ban"></i>
              </span>
            </div>
            <div className="text-3xl font-extrabold">{counts.totalRejected}</div>
            <p className="text-[11px] opacity-80 mt-1">সংশোধন বা বাতিলের রেকর্ড</p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Moderation Queue & Filter Bar */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
          {/* Status Tabs Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStatusTab('pending')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeStatusTab === 'pending'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <i className="fa-solid fa-hourglass-half text-amber-900"></i>
                <span>অপেক্ষমাণ কিউ</span>
                <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs font-mono">
                  {counts.totalPending}
                </span>
              </button>

              <button
                onClick={() => setActiveStatusTab('approved')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeStatusTab === 'approved'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <i className="fa-solid fa-check-double text-emerald-300"></i>
                <span>অনুমোদিত ও লাইভ</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono">
                  {counts.totalApproved}
                </span>
              </button>

              <button
                onClick={() => setActiveStatusTab('rejected')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeStatusTab === 'rejected'
                    ? 'bg-rose-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <i className="fa-solid fa-xmark text-rose-300"></i>
                <span>বাতিলকৃত</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono">
                  {counts.totalRejected}
                </span>
              </button>
            </div>

            <button
              onClick={fetchSubmissions}
              className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
            >
              <i className={`fa-solid fa-arrows-rotate ${isLoading ? 'fa-spin' : ''}`}></i>
              <span>রিফ্রেশ</span>
            </button>
          </div>

          {/* Category Pills & Search Controls */}
          <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Type selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                  selectedType === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                সকল বিভাগ
              </button>
              <button
                onClick={() => setSelectedType('spot')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
                  selectedType === 'spot'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <i className="fa-solid fa-landmark text-amber-500"></i>
                <span>দর্শনীয় স্থান ({filteredSpots.length})</span>
              </button>
              <button
                onClick={() => setSelectedType('community')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
                  selectedType === 'community'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <i className="fa-solid fa-users text-rose-500"></i>
                <span>কমিউনিটি ও রক্তদাতা ({filteredCommunity.length})</span>
              </button>
              <button
                onClick={() => setSelectedType('review')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
                  selectedType === 'review'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <i className="fa-solid fa-star text-yellow-500"></i>
                <span>রিভিউ ({filteredReviews.length})</span>
              </button>
            </div>

            {/* Upazila & Search */}
            <div className="flex items-center gap-2">
              <select
                value={selectedUpazila}
                onChange={e => setSelectedUpazila(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
              >
                {upazilaList.map(u => (
                  <option key={u} value={u}>
                    {u === 'ALL' ? 'সকল উপজেলা' : u}
                  </option>
                ))}
              </select>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="নাম বা বিবরণ খুঁজুন..."
                  className="pl-8 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30 w-44 sm:w-56"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-slate-400 text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUBMISSIONS LISTING */}
        {/* ======================================================== */}
        <div className="space-y-6">
          {/* SECTION 1: TOURIST SPOTS QUEUE */}
          {(selectedType === 'all' || selectedType === 'spot') && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-landmark text-emerald-800"></i>
                  <span>দর্শনীয় স্থান ও ঐতিহ্য তালিকা ({filteredSpots.length})</span>
                </h3>
              </div>

              {filteredSpots.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500">
                  এই ফিল্টারে কোনো দর্শনীয় স্থান নেই
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSpots.map(spot => (
                    <div
                      key={spot.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        {/* Header details */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                              {spot.upazila}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {spot.categoryBn}
                            </span>
                          </div>

                          {spot.status === 'approved' || spot.isApproved ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              লাইভ
                            </span>
                          ) : spot.status === 'rejected' ? (
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                              বাতিলকৃত
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold animate-pulse">
                              অপেক্ষমাণ
                            </span>
                          )}
                        </div>

                        {/* Title and Image Preview */}
                        <div className="flex gap-3 mb-3">
                          <img
                            src={spot.coverImage}
                            alt={spot.title}
                            className="w-20 h-16 rounded-xl object-cover shrink-0 border border-slate-200 bg-slate-100"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                              {spot.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              <i className="fa-solid fa-location-dot text-emerald-700 mr-1"></i>
                              {spot.location}
                            </p>
                            <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                              {spot.shortDesc}
                            </p>
                          </div>
                        </div>

                        {/* Contributor info badge */}
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <i className="fa-solid fa-user-pen text-emerald-700"></i>
                            <span className="font-semibold">{spot.contributor.name}</span>
                            {spot.contributor.phone && (
                              <span className="text-slate-500 font-mono">
                                ({spot.contributor.phone})
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-600 font-medium">
                            {spot.contributor.date}
                          </span>
                        </div>

                        {spot.rejectReason && (
                          <div className="mt-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px]">
                            <span className="font-bold">বাতিলের কারণ:</span> {spot.rejectReason}
                          </div>
                        )}
                      </div>

                      {/* Action Moderation Toolbar */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setInspectSpot(spot)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                        >
                          <i className="fa-solid fa-eye"></i>
                          <span>বিস্তারিত</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {spot.status !== 'approved' && !spot.isApproved && (
                            <button
                              onClick={() => handleApprove('spot', spot.id, spot.title)}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <i className="fa-solid fa-check"></i>
                              <span>অনুমোদন করুন</span>
                            </button>
                          )}

                          {spot.status !== 'rejected' && (
                            <button
                              onClick={() =>
                                setRejectTarget({
                                  type: 'spot',
                                  id: spot.id,
                                  title: spot.title
                                })
                              }
                              className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition cursor-pointer"
                              title="বাতিল করুন"
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          )}

                          {spot.isApproved && (
                            <Link
                              href={`/explore/${spot.id}`}
                              target="_blank"
                              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-emerald-800 text-xs font-semibold transition"
                              title="ওয়েবসাইটে দেখুন"
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </Link>
                          )}

                          <button
                            onClick={() => handleDelete('spot', spot.id, spot.title)}
                            className="px-2 py-1.5 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: COMMUNITY POSTS QUEUE */}
          {(selectedType === 'all' || selectedType === 'community') && (
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-users text-rose-700"></i>
                  <span>কমিউনিটি ও রক্তদাতা পোস্ট ({filteredCommunity.length})</span>
                </h3>
              </div>

              {filteredCommunity.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500">
                  এই ফিল্টারে কোনো কমিউনিটি পোস্ট নেই
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCommunity.map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                            {item.upazila}
                          </span>
                          {item.group ? (
                            <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 text-xs font-extrabold">
                              {item.group}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px]">
                              {item.category}
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                          {item.detail}
                        </p>
                        <p className="font-mono text-emerald-800 font-bold text-xs mt-2 flex items-center gap-1">
                          <i className="fa-solid fa-phone text-xs"></i>
                          <span>{item.phone}</span>
                        </p>

                        {item.rejectReason && (
                          <div className="mt-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px]">
                            <span className="font-bold">বাতিল নোট:</span> {item.rejectReason}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        {item.status !== 'approved' && !item.isApproved ? (
                          <button
                            onClick={() => handleApprove('community', item.id, item.name)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1 cursor-pointer"
                          >
                            <i className="fa-solid fa-check"></i>
                            <span>অনুমোদন</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-700">
                            লাইভ সক্রিয়
                          </span>
                        )}

                        <div className="flex items-center gap-1.5">
                          {item.status !== 'rejected' && (
                            <button
                              onClick={() =>
                                setRejectTarget({
                                  type: 'community',
                                  id: item.id,
                                  title: item.name
                                })
                              }
                              className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-medium border border-rose-200 transition cursor-pointer"
                              title="বাতিল করুন"
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete('community', item.id, item.name)}
                            className="px-2 py-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: REVIEWS QUEUE */}
          {(selectedType === 'all' || selectedType === 'review') && (
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-star text-amber-500"></i>
                  <span>পর্যটক রিভিউ ও প্রতিক্রিয়া ({filteredReviews.length})</span>
                </h3>
              </div>

              {filteredReviews.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500">
                  এই ফিল্টারে কোনো রিভিউ নেই
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredReviews.map(rev => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-900">
                            {rev.author}
                          </span>
                          <div className="flex text-amber-400 text-xs">
                            {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                              <i key={i} className="fa-solid fa-star"></i>
                            ))}
                          </div>
                        </div>

                        {rev.spotTitle && (
                          <p className="text-[11px] font-semibold text-emerald-800 mb-1">
                            স্থান: {rev.spotTitle}
                          </p>
                        )}

                        <p className="text-xs text-slate-600 italic">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                        <p className="text-[11px] text-slate-400 mt-2">
                          {rev.location || 'বগুড়া'} · {rev.date}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        {rev.status !== 'approved' && !rev.isApproved ? (
                          <button
                            onClick={() => handleApprove('review', rev.id, rev.author)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1 cursor-pointer"
                          >
                            <i className="fa-solid fa-check"></i>
                            <span>অনুমোদন</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-700">
                            লাইভ
                          </span>
                        )}

                        <button
                          onClick={() => handleDelete('review', rev.id, rev.author)}
                          className="px-2 py-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ======================================================== */}
      {/* INSPECT & EDIT SPOT MODAL */}
      {/* ======================================================== */}
      {inspectSpot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setInspectSpot(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                {inspectSpot.upazila}
              </span>
              <span className="text-xs text-slate-500">{inspectSpot.categoryBn}</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {inspectSpot.title}
            </h3>
            {inspectSpot.enTitle && (
              <p className="text-xs text-slate-500 mb-4">{inspectSpot.enTitle}</p>
            )}

            <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 mb-4">
              <img
                src={inspectSpot.coverImage}
                alt={inspectSpot.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-1">অবস্থান:</span>
                <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  {inspectSpot.location}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">সংক্ষিপ্ত বিবরণ:</span>
                <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
                  {inspectSpot.shortDesc}
                </p>
              </div>

              {inspectSpot.history && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1">ইতিহাস ও স্থাপত্য:</span>
                  <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
                    {inspectSpot.history}
                  </p>
                </div>
              )}

              {inspectSpot.howToReach && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1">কীভাবে যাবেন:</span>
                  <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
                    {inspectSpot.howToReach}
                  </p>
                </div>
              )}

              {/* Contributor Card */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <span className="font-bold text-amber-950 block mb-1 text-xs">
                  অবদানকারী তথ্য:
                </span>
                <p className="text-xs text-slate-700">
                  <strong>নাম:</strong> {inspectSpot.contributor.name}
                  {inspectSpot.contributor.phone && ` · ফোন: ${inspectSpot.contributor.phone}`}
                  {inspectSpot.contributor.email && ` · ইমেইল: ${inspectSpot.contributor.email}`}
                </p>
                {inspectSpot.contributor.note && (
                  <p className="text-xs text-slate-600 mt-1 italic">
                    &ldquo;{inspectSpot.contributor.note}&rdquo;
                  </p>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setInspectSpot(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                বন্ধ করুন
              </button>

              {inspectSpot.status !== 'approved' && !inspectSpot.isApproved && (
                <button
                  onClick={() => handleApprove('spot', inspectSpot.id, inspectSpot.title)}
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-check"></i>
                  <span>অনুমোদন ও প্রকাশ করুন</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* REJECT CONFIRMATION MODAL */}
      {/* ======================================================== */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              সাবমিশন বাতিল নিশ্চিতকরণ
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              &ldquo;{rejectTarget.title}&rdquo; বাতিল করা হচ্ছে। অবদানকারীর অবগতির জন্য বাতিলের কারণ নির্বাচন করুন:
            </p>

            <div className="space-y-2 mb-4">
              {[
                'অসম্পূর্ণ বা ভুল বিবরণ',
                'অস্পষ্ট বা কপিরাইটযুক্ত ছবি',
                'ডুপ্লিকেট বা পূর্বে যুক্ত তথ্য',
                'সঠিক অবস্থান বা প্রমাণক পাওয়া যায়নি'
              ].map(reason => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setRejectReasonInput(reason)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer ${
                    rejectReasonInput === reason
                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              value={rejectReasonInput}
              onChange={e => setRejectReasonInput(e.target.value)}
              placeholder="অথবা কাস্টম মন্তব্য লিখুন..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/30 mb-4"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRejectTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                নিশ্চিত বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
