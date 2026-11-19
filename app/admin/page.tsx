'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { useToast } from '@/lib/context/ToastContext';
import { boguraUpazilasData, DetailedUpazilaData } from '@/lib/data/unions-villages-data';

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

interface HospitalItem {
  id?: string;
  name: string;
  enName?: string;
  type: 'govt' | 'private' | 'diagnostic';
  typeLabel: string;
  address: string;
  phone: string;
  emergency: string;
}

interface SystemDiagnostics {
  environment: {
    nodeVersion: string;
    framework: string;
    deployment: string;
    platform: string;
  };
  supabase: {
    isConfigured: boolean;
    url: string;
    status: string;
    poolerLatencyMs: number;
  };
  entityCounts: {
    upazilas: number;
    unions: number;
    villages: number;
    hospitals: number;
    emergencyContacts: number;
    exploreSpots: number;
    communityPosts: number;
    reviews: number;
    pendingTotal: number;
  };
  settings: {
    autoApprove: boolean;
    maintenanceMode: boolean;
    allowPublicContributions: boolean;
    adminPasskey: string;
    lastBackupDate: string;
  };
  auditLogs: Array<{
    id: string;
    action: string;
    target: string;
    details: string;
    timestamp: string;
    status: 'success' | 'warning' | 'info';
  }>;
}

export default function AdminPage() {
  const { showToast } = useToast();

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Primary Navigation Tab
  const [currentNav, setCurrentNav] = useState<'overview' | 'moderation' | 'upazilas' | 'hospitals' | 'community' | 'settings'>('overview');

  // Diagnostics & System Telemetry
  const [systemDiag, setSystemDiag] = useState<SystemDiagnostics | null>(null);
  const [isLoadingDiag, setIsLoadingDiag] = useState(false);

  // Moderation States
  const [spots, setSpots] = useState<SpotItem[]>([]);
  const [community, setCommunity] = useState<CommunityItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [hospitals, setHospitals] = useState<HospitalItem[]>([]);

  // Moderation Filters
  const [activeStatusTab, setActiveStatusTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedType, setSelectedType] = useState<'all' | 'spot' | 'community' | 'review'>('all');
  const [selectedUpazila, setSelectedUpazila] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [inspectSpot, setInspectSpot] = useState<SpotItem | null>(null);
  const [rejectTarget, setRejectTarget] = useState<{ type: 'spot' | 'community' | 'review'; id: string; title: string } | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState('অসম্পূর্ণ বা তথ্য যাচাই প্রয়োজন');
  const [inspectUpazila, setInspectUpazila] = useState<DetailedUpazilaData | null>(null);

  // Add Hospital Modal
  const [isAddHospitalOpen, setIsAddHospitalOpen] = useState(false);
  const [hospName, setHospName] = useState('');
  const [hospEnName, setHospEnName] = useState('');
  const [hospType, setHospType] = useState<'govt' | 'private' | 'diagnostic'>('govt');
  const [hospAddress, setHospAddress] = useState('');
  const [hospPhone, setHospPhone] = useState('');
  const [hospEmergency, setHospEmergency] = useState('');

  // Change Passkey State
  const [newPasskey, setNewPasskey] = useState('');

  // Check saved session on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('amar_bogura_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      fetchSystemData();
    }
  }, []);

  const fetchSystemData = async () => {
    setIsLoadingDiag(true);
    try {
      // 1. Fetch system diagnostics
      const sysRes = await fetch('/api/admin/system');
      const sysJson = await sysRes.json();
      if (sysJson.success && sysJson.data) {
        setSystemDiag(sysJson.data);
      }

      // 2. Fetch moderation submissions
      const subRes = await fetch('/api/admin/submissions?status=all');
      const subJson = await subRes.json();
      if (subJson.success && subJson.data) {
        setSpots(subJson.data.spots || []);
        setCommunity(subJson.data.community || []);
        setReviews(subJson.data.reviews || []);
      }

      // 3. Fetch hospitals
      const hospRes = await fetch('/api/admin/hospitals');
      const hospJson = await hospRes.json();
      if (hospJson.success && hospJson.data) {
        setHospitals(hospJson.data || []);
      }
    } catch (e) {
      console.warn('System data fetch error', e);
    } finally {
      setIsLoadingDiag(false);
    }
  };

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
        showToast('সিস্টেম অ্যাডমিন প্যানেলে স্বাগতম!');
        fetchSystemData();
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

  // Toggle Policy Settings
  const handleToggleSetting = async (key: 'autoApprove' | 'maintenanceMode' | 'allowPublicContributions') => {
    if (!systemDiag) return;
    const currentVal = systemDiag.settings[key];
    const newVal = !currentVal;

    try {
      const res = await fetch('/api/admin/system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: { [key]: newVal },
          action: 'SETTING_TOGGLE',
          details: `${key} মোড ${newVal ? 'চালু' : 'বন্ধ'} করা হয়েছে`
        })
      });
      const json = await res.json();
      if (json.success) {
        setSystemDiag(prev => prev ? {
          ...prev,
          settings: { ...prev.settings, [key]: newVal }
        } : null);
        showToast(`পলিসি পরিবর্তন: ${key} এখন ${newVal ? 'সক্রিয়' : 'নিষ্ক্রিয়'}`);
        fetchSystemData();
      }
    } catch (err) {
      showToast('সেটিংস পরিবর্তনে সমস্যা হয়েছে', 'error');
    }
  };

  // Handle Passkey Change
  const handleChangePasskey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasskey.trim() || newPasskey.length < 6) {
      showToast('পাসকি কমপক্ষে ৬ অক্ষরের হতে হবে', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: { adminPasskey: newPasskey.trim() },
          action: 'PASSKEY_CHANGE',
          details: 'সিস্টেম অ্যাডমিন পাসকি পরিবর্তন করা হয়েছে'
        })
      });
      const json = await res.json();
      if (json.success) {
        showToast('অ্যাডমিন পাসকি সফলভাবে আপডেট হয়েছে!');
        setNewPasskey('');
        fetchSystemData();
      }
    } catch (err) {
      showToast('পাসকি পরিবর্তন ব্যর্থ', 'error');
    }
  };

  // Moderation: Approve Action
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
        fetchSystemData();
        if (inspectSpot?.id === id) setInspectSpot(null);
      } else {
        showToast(json.error || 'অনুমোদন ব্যর্থ হয়েছে', 'error');
      }
    } catch (err) {
      showToast('সার্ভার যোগাযোগে সমস্যা হয়েছে', 'error');
    }
  };

  // Moderation: Confirm Reject
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
        fetchSystemData();
      }
    } catch (err) {
      showToast('সার্ভার সমস্যা হয়েছে', 'error');
    }
  };

  // Moderation: Delete Action
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
        fetchSystemData();
      }
    } catch (err) {
      showToast('মুছতে সমস্যা হয়েছে', 'error');
    }
  };

  // Add Hospital
  const handleAddHospital = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospName.trim() || !hospAddress.trim() || !hospPhone.trim()) {
      showToast('নাম, ঠিকানা ও ফোন নম্বর আবশ্যক', 'error');
      return;
    }

    try {
      const typeLabelMap: Record<string, string> = {
        govt: 'সরকারি হাসপাতাল',
        private: 'বেসরকারি হাসপাতাল',
        diagnostic: 'ডায়াগনস্টিক ও স্পেশালাইজড'
      };

      const res = await fetch('/api/admin/hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: hospName,
          enName: hospEnName || hospName,
          type: hospType,
          typeLabel: typeLabelMap[hospType],
          address: hospAddress,
          phone: hospPhone,
          emergency: hospEmergency || hospPhone
        })
      });

      const json = await res.json();
      if (json.success) {
        showToast('হাসপাতালটি সফলভাবে যুক্ত হয়েছে!');
        setIsAddHospitalOpen(false);
        setHospName('');
        setHospEnName('');
        setHospAddress('');
        setHospPhone('');
        setHospEmergency('');
        fetchSystemData();
      }
    } catch (err) {
      showToast('সংযোজন ব্যর্থ', 'error');
    }
  };

  // Delete Hospital
  const handleDeleteHospital = async (name: string) => {
    if (!confirm(`আপনি কি "${name}" মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`/api/admin/hospitals?name=${encodeURIComponent(name)}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        showToast('হাসপাতালটি মুছে ফেলা হয়েছে');
        fetchSystemData();
      }
    } catch (e) {
      showToast('মুছে ফেলা ব্যর্থ', 'error');
    }
  };

  // 12 Upazilas
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

  // Filtering for Moderation
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

  // Calculate Pending Total
  const pendingTotalCount =
    spots.filter(s => s.status === 'pending' || !s.isApproved).length +
    community.filter(c => c.status === 'pending' || !c.isApproved).length +
    reviews.filter(r => r.status === 'pending' || !r.isApproved).length;

  // ==========================================
  // LOGIN SCREEN (PASSKEY GATE)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <BrandLogo variant="full" size="lg" theme="dark" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
            <i className="fa-solid fa-server"></i>
            <span>সিস্টেম অ্যাডমিন কনসোল ও অবকাঠামো</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-2">
            অ্যাডমিন প্রবেশাধিকার
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            আমার বগুড়া প্ল্যাটফর্মের সিস্টেম ডায়াগনস্টিকস, ডাটাবেজ ব্যাকআপ, উপজেলা ও মডারেশন কিউ নিয়ন্ত্রণের জন্য মাস্টার পাসকি দিন।
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
                  onChange={e => {
                    setPasskeyInput(e.target.value);
                    setAuthError('');
                  }}
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
  // AUTHENTICATED SYSTEM ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Top System Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="shrink-0 flex items-center">
              <BrandLogo variant="horizontal" size="sm" theme="dark" />
            </Link>
            <div className="hidden md:block h-5 w-px bg-slate-700"></div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>সিস্টেম অ্যাডমিন কনসোল</span>
              </span>
              <span className="text-slate-400">v1.0.0</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Supabase status indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs">
              <i className="fa-solid fa-database text-emerald-400"></i>
              <span className="text-slate-300">সুপাবেস:</span>
              <span className="text-emerald-400 font-semibold">
                {systemDiag?.supabase?.isConfigured ? 'কানেক্টেড (42ms)' : 'মেমোরি মোড'}
              </span>
            </div>

            {/* Quick 1-Click Backup Export */}
            <a
              href="/api/admin/backup"
              download
              className="px-3 py-1.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/40 text-xs font-semibold transition flex items-center gap-1.5"
              title="সম্পূর্ণ ডাটাবেজ ব্যাকআপ ডাউনলোড করুন"
            >
              <i className="fa-solid fa-cloud-arrow-down text-amber-300"></i>
              <span className="hidden sm:inline">ব্যাকআপ</span>
            </a>

            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-globe text-amber-400"></i>
              <span className="hidden sm:inline">ওয়েবসাইট</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-200 border border-rose-800/50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </div>

        {/* System Admin Primary Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar" role="tablist">
            <button
              onClick={() => setCurrentNav('overview')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                currentNav === 'overview'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-chart-pie"></i>
              <span>সার্বিক ড্যাশবোর্ড</span>
            </button>

            <button
              onClick={() => setCurrentNav('moderation')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                currentNav === 'moderation'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-shield-halved"></i>
              <span>অনুমোদন কিউ</span>
              {pendingTotalCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs animate-pulse">
                  {pendingTotalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentNav('upazilas')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                currentNav === 'upazilas'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-map-location-dot"></i>
              <span>উপজেলা ও ইউনিয়ন (১২)</span>
            </button>

            <button
              onClick={() => setCurrentNav('hospitals')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                currentNav === 'hospitals'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-hospital"></i>
              <span>হাসপাতাল ও ডিরেক্টরি</span>
            </button>

            <button
              onClick={() => setCurrentNav('community')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                currentNav === 'community'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-droplet text-rose-400"></i>
              <span>রক্তদাতা ও কমিউনিটি</span>
            </button>

            <button
              onClick={() => setCurrentNav('settings')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                currentNav === 'settings'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-gears"></i>
              <span>সিস্টেম কনফিগারেশন</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Admin Content Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ======================================================== */}
        {/* TAB 1: SYSTEM OVERVIEW & DIAGNOSTICS */}
        {/* ======================================================== */}
        {currentNav === 'overview' && (
          <div className="space-y-8">
            {/* System Infrastructure Telemetry Bar */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>সিস্টেম স্টেটাস: ১০০% সক্রিয় ও নিরাপদ</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    আমার বগুড়া · সিস্টেম অ্যাডমিন ড্যাশবোর্ড
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    পুণ্ড্রনগরীর ১২টি উপজেলা, ১০৮টি ইউনিয়ন, জরুরি স্বাস্থ্যসেবা ও নাগরিক মডারেশন নিয়ন্ত্রণ কেন্দ্র
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchSystemData}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
                  >
                    <i className={`fa-solid fa-arrows-rotate ${isLoadingDiag ? 'fa-spin' : ''}`}></i>
                    <span>টেলিমেট্রি রিফ্রেশ</span>
                  </button>

                  <a
                    href="/api/admin/backup"
                    download
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition flex items-center gap-2"
                  >
                    <i className="fa-solid fa-download"></i>
                    <span>ডাটাবেজ ব্যাকআপ (JSON)</span>
                  </a>
                </div>
              </div>

              {/* 3 Tech Stack Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">ডাটাবেজ ইঞ্জিন</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                    <i className="fa-solid fa-database"></i>
                    <span>PostgreSQL (Supabase Pooler)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">aws-1-ap-northeast-1 / Latency: 42ms</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">অ্যাপ ফ্রেমওয়ার্ক</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                    <i className="fa-brands fa-react"></i>
                    <span>Next.js 14 App Router</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">NestJS Service Layer · Vercel Hosting Ready</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">অ্যাক্সেস কন্ট্রোল ও পলিসি</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-400">
                    <i className="fa-solid fa-shield-check"></i>
                    <span>Passkey Protected SuperAdmin</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">সেশন অথেনটিকেশন সক্রিয়</p>
                </div>
              </div>
            </div>

            {/* 6 District Master KPI Metric Cards */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-chart-simple text-emerald-800"></i>
                <span>জেলাভিত্তিক মূল মেট্রিক্স ও রিসোর্স পরিসংখ্যান</span>
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {/* 1. Upazilas */}
                <div
                  onClick={() => setCurrentNav('upazilas')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase">উপজেলা</span>
                    <i className="fa-solid fa-map-location-dot text-emerald-700"></i>
                  </div>
                  <div className="text-2xl font-black text-slate-900">১২টি</div>
                  <p className="text-[10px] text-emerald-800 font-semibold mt-1">১০০% ভেরিফাইড</p>
                </div>

                {/* 2. Unions */}
                <div
                  onClick={() => setCurrentNav('upazilas')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase">ইউনিয়ন</span>
                    <i className="fa-solid fa-landmark-flag text-blue-700"></i>
                  </div>
                  <div className="text-2xl font-black text-slate-900">১০৮টি</div>
                  <p className="text-[10px] text-slate-500 mt-1">সকল চেয়ারম্যান তালিকা</p>
                </div>

                {/* 3. Villages */}
                <div
                  onClick={() => setCurrentNav('upazilas')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase">গ্রাম ও মৌজা</span>
                    <i className="fa-solid fa-tree text-green-700"></i>
                  </div>
                  <div className="text-2xl font-black text-slate-900">২,৬৯২</div>
                  <p className="text-[10px] text-slate-500 mt-1">জিও-ট্যাগ সংরক্ষিত</p>
                </div>

                {/* 4. Hospitals */}
                <div
                  onClick={() => setCurrentNav('hospitals')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase">হাসপাতাল</span>
                    <i className="fa-solid fa-hospital text-rose-700"></i>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{hospitals.length}টি</div>
                  <p className="text-[10px] text-slate-500 mt-1">জরুরি হটলাইন সংযুক্ত</p>
                </div>

                {/* 5. Spots */}
                <div
                  onClick={() => {
                    setCurrentNav('moderation');
                    setSelectedType('spot');
                  }}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase">দর্শনীয় স্থান</span>
                    <i className="fa-solid fa-landmark text-amber-700"></i>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{spots.length}টি</div>
                  <p className="text-[10px] text-slate-500 mt-1">ঐতিহ্যবাহী স্থাপনা</p>
                </div>

                {/* 6. Pending Submissions */}
                <div
                  onClick={() => {
                    setCurrentNav('moderation');
                    setActiveStatusTab('pending');
                  }}
                  className="bg-amber-500 text-slate-950 p-4 rounded-2xl border border-amber-400 shadow-sm transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-slate-950/80 mb-2">
                    <span className="text-[11px] font-bold uppercase">মডারেশন কিউ</span>
                    <i className="fa-solid fa-clock animate-pulse"></i>
                  </div>
                  <div className="text-2xl font-black">{pendingTotalCount}টি</div>
                  <p className="text-[10px] font-bold mt-1">অনুমোদনের অপেক্ষায়</p>
                </div>
              </div>
            </div>

            {/* System Policy Switches & Live Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Policy 1: Auto-Approve Mode */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      নাগরিক অবদান পলিসি
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        systemDiag?.settings?.autoApprove
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {systemDiag?.settings?.autoApprove ? 'সরাসরি লাইভ' : 'মডারেশন বাধ্যতামূলক'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    স্বয়ংক্রিয় অনুমোদন (Auto-Approve)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    চালু থাকলে নাগরিক অবদান সরাসরি ওয়েবসাইটে লাইভ হয়ে যাবে। বন্ধ থাকলে অ্যাডমিনের ম্যানুয়াল অনুমোদনের পর প্রদর্শিত হবে।
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">বর্তমান অবস্থা:</span>
                  <button
                    onClick={() => handleToggleSetting('autoApprove')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      systemDiag?.settings?.autoApprove
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {systemDiag?.settings?.autoApprove ? 'চালু (Active)' : 'বন্ধ (Manual Approval)'}
                  </button>
                </div>
              </div>

              {/* Policy 2: Public Contributions */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      নাগরিক এন্ট্রি গ্রহণ
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        systemDiag?.settings?.allowPublicContributions
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {systemDiag?.settings?.allowPublicContributions ? 'উন্মুক্ত' : 'স্থগিত'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    নাগরিক সাবমিশন ফরম
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    /contribute পেজে দর্শনার্থী ও স্বেচ্ছাসেবীদের নতুন স্থান ও রক্তদাতার তথ্য পাঠানো সচল বা সাময়িক স্থগিত রাখার সুইচ।
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">বর্তমান অবস্থা:</span>
                  <button
                    onClick={() => handleToggleSetting('allowPublicContributions')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      systemDiag?.settings?.allowPublicContributions
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-rose-800 text-white'
                    }`}
                  >
                    {systemDiag?.settings?.allowPublicContributions ? 'উন্মুক্ত (Open)' : 'স্থগিত (Paused)'}
                  </button>
                </div>
              </div>

              {/* Policy 3: Maintenance Mode */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      সিস্টেম রক্ষণাবেক্ষণ
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        systemDiag?.settings?.maintenanceMode
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {systemDiag?.settings?.maintenanceMode ? 'রক্ষণাবেক্ষণ চলছে' : 'লাইভ প্রোডাকশন'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    মেইনটেন্যান্স মোড (Maintenance)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    ডাটাবেজ মাইগ্রেশন বা সিস্টেম আপগ্রেডের সময় জনসাধারণের জন্য সাময়িক রক্ষণাবেক্ষণ ব্যানার চালু রাখুন।
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">বর্তমান অবস্থা:</span>
                  <button
                    onClick={() => handleToggleSetting('maintenanceMode')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      systemDiag?.settings?.maintenanceMode
                        ? 'bg-rose-800 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {systemDiag?.settings?.maintenanceMode ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </button>
                </div>
              </div>
            </div>

            {/* Administrative Audit Logs Stream */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-emerald-800"></i>
                  <h3 className="font-bold text-slate-900 text-sm">
                    প্রশাসনিক অডিট ও সিস্টেম ইভেন্ট লগ (Audit Activity Stream)
                  </h3>
                </div>
                <span className="text-xs text-slate-500">সর্বশেষ ৫০টি ইভেন্ট</span>
              </div>

              <div className="divide-y divide-slate-100">
                {(systemDiag?.auditLogs || []).map(log => (
                  <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                    <div className="flex items-start gap-3">
                      <span
                        className={`p-1.5 rounded-lg text-xs shrink-0 mt-0.5 ${
                          log.status === 'success'
                            ? 'bg-emerald-100 text-emerald-700'
                            : log.status === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            log.status === 'success'
                              ? 'fa-check'
                              : log.status === 'warning'
                              ? 'fa-triangle-exclamation'
                              : 'fa-info'
                          }`}
                        ></i>
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{log.action}</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px]">
                            {log.target}
                          </span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{log.details}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                      {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MODERATION & APPROVAL QUEUE */}
        {/* ======================================================== */}
        {currentNav === 'moderation' && (
          <div className="space-y-6">
            {/* Moderation Controls Header */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
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
                      {pendingTotalCount}
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
                  </button>
                </div>

                <button
                  onClick={fetchSystemData}
                  className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
                >
                  <i className={`fa-solid fa-arrows-rotate ${isLoadingDiag ? 'fa-spin' : ''}`}></i>
                  <span>রিফ্রেশ</span>
                </button>
              </div>

              {/* Filters */}
              <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
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

            {/* SPOTS */}
            {(selectedType === 'all' || selectedType === 'spot') && (
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-landmark text-emerald-800"></i>
                  <span>দর্শনীয় স্থান কিউ ({filteredSpots.length})</span>
                </h3>

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
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                              {spot.upazila} · {spot.categoryBn}
                            </span>
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

                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <i className="fa-solid fa-user-pen text-emerald-700"></i>
                              <span className="font-semibold">{spot.contributor.name}</span>
                              {spot.contributor.phone && (
                                <span className="text-slate-500 font-mono">({spot.contributor.phone})</span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500">{spot.contributor.date}</span>
                          </div>

                          {spot.rejectReason && (
                            <div className="mt-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px]">
                              <span className="font-bold">বাতিলের কারণ:</span> {spot.rejectReason}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setInspectSpot(spot)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                          >
                            <i className="fa-solid fa-eye mr-1"></i> বিস্তারিত
                          </button>

                          <div className="flex items-center gap-1.5">
                            {spot.status !== 'approved' && !spot.isApproved && (
                              <button
                                onClick={() => handleApprove('spot', spot.id, spot.title)}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer flex items-center gap-1.5"
                              >
                                <i className="fa-solid fa-check"></i>
                                <span>অনুমোদন করুন</span>
                              </button>
                            )}

                            {spot.status !== 'rejected' && (
                              <button
                                onClick={() => setRejectTarget({ type: 'spot', id: spot.id, title: spot.title })}
                                className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer"
                                title="বাতিল করুন"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            )}

                            {spot.isApproved && (
                              <Link
                                href={`/explore/${spot.id}`}
                                target="_blank"
                                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-emerald-800 text-xs font-semibold"
                                title="ওয়েবসাইটে দেখুন"
                              >
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                              </Link>
                            )}

                            <button
                              onClick={() => handleDelete('spot', spot.id, spot.title)}
                              className="px-2 py-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
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

            {/* COMMUNITY */}
            {(selectedType === 'all' || selectedType === 'community') && (
              <div className="pt-4">
                <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-users text-rose-700"></i>
                  <span>কমিউনিটি ও রক্তদাতা এন্ট্রি ({filteredCommunity.length})</span>
                </h3>

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

                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">{item.detail}</p>
                        <p className="font-mono text-emerald-800 font-bold text-xs mt-2 flex items-center gap-1">
                          <i className="fa-solid fa-phone text-xs"></i>
                          <span>{item.phone}</span>
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        {item.status !== 'approved' && !item.isApproved ? (
                          <button
                            onClick={() => handleApprove('community', item.id, item.name)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer flex items-center gap-1"
                          >
                            <i className="fa-solid fa-check"></i>
                            <span>অনুমোদন</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-700">লাইভ সক্রিয়</span>
                        )}

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setRejectTarget({ type: 'community', id: item.id, title: item.name })}
                            className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-medium border border-rose-200 cursor-pointer"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                          <button
                            onClick={() => handleDelete('community', item.id, item.name)}
                            className="px-2 py-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: 12 UPAZILAS & UNIONS MASTER DIRECTORY */}
        {/* ======================================================== */}
        {currentNav === 'upazilas' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    বগুড়া জেলার ১২টি উপজেলা ও ১০৮টি ইউনিয়ন নিয়ন্ত্রক
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    আয়তন, জনসংখ্যা, ইউনিয়ন সংখ্যা, মৌজা ও গ্রামভিত্তিক প্রশাসনিক তালিকা
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                    মোট গ্রাম: ২,৬৯২টি
                  </span>
                </div>
              </div>

              {/* Upazilas Master Table */}
              <div className="overflow-x-auto pt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">ক্রমিক</th>
                      <th className="py-3 px-4">উপজেলার নাম</th>
                      <th className="py-3 px-4">আয়তন</th>
                      <th className="py-3 px-4">ইউনিয়ন</th>
                      <th className="py-3 px-4">গ্রাম সংখ্যা</th>
                      <th className="py-3 px-4">ইউএনও হটলাইন</th>
                      <th className="py-3 px-4">থানা পুলিশ</th>
                      <th className="py-3 px-4 text-right">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {boguraUpazilasData.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-bold text-emerald-800">{u.serialBn}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block text-sm">{u.name}</span>
                          <span className="text-[11px] text-slate-400">{u.enName} · পোস্টকোড: {u.postalCode}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{u.area}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">{u.unionCount}টি</td>
                        <td className="py-3.5 px-4 text-slate-600">{u.villageCount}টি গ্রাম</td>
                        <td className="py-3.5 px-4 font-mono text-emerald-700">{u.unoPhone}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">{u.policePhone}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setInspectUpazila(u)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition cursor-pointer"
                          >
                            ইউনিয়ন ও গ্রাম ({u.unions.length})
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: HOSPITALS & HEALTHCARE DIRECTORY */}
        {/* ======================================================== */}
        {currentNav === 'hospitals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    বগুড়া স্বাস্থ্যসেবা ও হাসপাতাল ডিরেক্টরি
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    সরকারি মেডিকেল কলেজ, উপজেলা স্বাস্থ্য কমপ্লেক্স ও ডায়াগনস্টিক সেন্টারের হটলাইন
                  </p>
                </div>

                <button
                  onClick={() => setIsAddHospitalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>নতুন হাসপাতাল যুক্ত করুন</span>
                </button>
              </div>

              {/* Hospitals Table */}
              <div className="overflow-x-auto pt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">হাসপাতালের নাম</th>
                      <th className="py-3 px-4">ধরন</th>
                      <th className="py-3 px-4">ঠিকানা</th>
                      <th className="py-3 px-4">সাধারণ ফোন</th>
                      <th className="py-3 px-4">জরুরি হটলাইন</th>
                      <th className="py-3 px-4 text-right">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hospitals.map((h, i) => (
                      <tr key={i} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block text-sm">{h.name}</span>
                          <span className="text-[11px] text-slate-400">{h.enName}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              h.type === 'govt'
                                ? 'bg-emerald-100 text-emerald-800'
                                : h.type === 'private'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {h.typeLabel}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{h.address}</td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">{h.phone}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-rose-700">{h.emergency}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteHospital(h.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: BLOOD DONORS & COMMUNITY HUB */}
        {/* ======================================================== */}
        {currentNav === 'community' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    বগুড়া রক্তদাতা নেটওয়ার্ক ও নাগরিক সার্ভিস হাব
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    জরুরি রক্তের গ্রুপ অনুসারে দাতা যাচাই, টিউশন, বাসা ভাড়া ও স্থানীয় ব্যবসায়ীদের ডেটাবেজ
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-800 font-bold text-xs border border-rose-200">
                    রক্তদাতা ও নোটিশ: {community.length}টি
                  </span>
                </div>
              </div>

              {/* Community Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {community.map(item => (
                  <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {item.upazila}
                        </span>
                        {item.group ? (
                          <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-black">
                            {item.group}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                            {item.category}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.detail}</p>
                      <p className="font-mono text-emerald-800 font-bold text-xs mt-2 flex items-center gap-1">
                        <i className="fa-solid fa-phone text-xs"></i>
                        <span>{item.phone}</span>
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-700">
                        {item.isApproved ? 'অনুমোদিত' : 'অপেক্ষমাণ'}
                      </span>
                      <button
                        onClick={() => handleDelete('community', item.id, item.name)}
                        className="text-xs text-slate-400 hover:text-rose-600 transition cursor-pointer"
                      >
                        <i className="fa-solid fa-trash mr-1"></i> মুছুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: SYSTEM SETTINGS & DATABASE BACKUP */}
        {/* ======================================================== */}
        {currentNav === 'settings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Change Passkey */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-key text-emerald-700"></i>
                  <span>অ্যাডমিন পাসকি পরিবর্তন</span>
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  অ্যাডমিন ড্যাশবোর্ডে প্রবেশাধিকারের জন্য নতুন সিকিউর পিন বা পাসকি সেট করুন।
                </p>

                <form onSubmit={handleChangePasskey} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      নতুন পাসকি (কমপক্ষে ৬ অক্ষর)
                    </label>
                    <input
                      type="password"
                      required
                      value={newPasskey}
                      onChange={e => setNewPasskey(e.target.value)}
                      placeholder="নতুন পাসকি লিখুন..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                  >
                    পাসকি সংরক্ষণ করুন
                  </button>
                </form>
              </div>

              {/* Database Backup & Export */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <i className="fa-solid fa-cloud-arrow-down text-amber-600"></i>
                    <span>সম্পূর্ণ ডাটাবেজ ব্যাকআপ ও ডাউনলোড</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    ১২টি উপজেলা, ১০৮টি ইউনিয়ন, ২,৬৯২টি গ্রাম, হাসপাতাল ডিরেক্টরি, দর্শনীয় স্থান ও রক্তদাতা নেটওয়ার্কের সম্পূর্ণ ব্যাকআপ JSON ফরম্যাটে এক ক্লিকে ডাউনলোড করুন।
                  </p>
                </div>

                <a
                  href="/api/admin/backup"
                  download
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 text-center"
                >
                  <i className="fa-solid fa-download"></i>
                  <span>amar-bogura-backup.json ডাউনলোড করুন</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: INSPECT SPOT */}
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

            <h3 className="text-2xl font-bold text-slate-900 mb-1">{inspectSpot.title}</h3>

            <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 mb-4 mt-3">
              <img src={inspectSpot.coverImage} alt={inspectSpot.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-1">অবস্থান:</span>
                <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">{inspectSpot.location}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">সংক্ষিপ্ত পরিচিতি:</span>
                <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">{inspectSpot.shortDesc}</p>
              </div>

              {inspectSpot.history && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1">ইতিহাস:</span>
                  <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">{inspectSpot.history}</p>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                <span className="font-bold text-amber-950 block mb-1">অবদানকারী:</span>
                <p className="text-slate-700">
                  {inspectSpot.contributor.name}
                  {inspectSpot.contributor.phone && ` · ফোন: ${inspectSpot.contributor.phone}`}
                  {inspectSpot.contributor.email && ` · ইমেইল: ${inspectSpot.contributor.email}`}
                </p>
              </div>
            </div>

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
      {/* MODAL 2: INSPECT UPAZILA & UNIONS */}
      {/* ======================================================== */}
      {inspectUpazila && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setInspectUpazila(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              উপজেলা কোড: {inspectUpazila.serialBn}
            </span>

            <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-1">
              {inspectUpazila.name} ({inspectUpazila.enName})
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              আয়তন: {inspectUpazila.area} · জনসংখ্যা: {inspectUpazila.population} · মোট ইউনিয়ন: {inspectUpazila.unionCount}টি · গ্রাম: {inspectUpazila.villageCount}টি
            </p>

            <h4 className="font-bold text-slate-900 text-xs mb-3 uppercase tracking-wider">
              ইউনিয়নভিত্তিক তালিকা ও গ্রামের বিবরণ:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs max-h-[50vh] overflow-y-auto pr-1">
              {inspectUpazila.unions.map((un, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>{un.name}</span>
                    <span className="text-[10px] text-emerald-800 font-mono bg-emerald-100 px-2 py-0.5 rounded-md">
                      গ্রাম: {un.villageCount}টি
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    পোস্টকোড: {un.postCode} · অফিস: {un.officeLocation}
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2 line-clamp-2">
                    <strong>গ্রামসমূহ:</strong> {un.villages.slice(0, 5).join(', ')}...
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setInspectUpazila(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: REJECT CONFIRMATION */}
      {/* ======================================================== */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">সাবমিশন বাতিল নিশ্চিতকরণ</h3>
            <p className="text-xs text-slate-500 mb-4">&ldquo;{rejectTarget.title}&rdquo; বাতিল করা হচ্ছে।</p>

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
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs mb-4"
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

      {/* ======================================================== */}
      {/* MODAL 4: ADD HOSPITAL */}
      {/* ======================================================== */}
      {isAddHospitalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">নতুন হাসপাতাল বা ক্লিনিক যুক্ত করুন</h3>
            <p className="text-xs text-slate-500 mb-4">বগুড়া স্বাস্থ্যসেবা ডিরেক্টরিতে নতুন তথ্য যোগ করুন</p>

            <form onSubmit={handleAddHospital} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">হাসপাতালের নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  value={hospName}
                  onChange={e => setHospName(e.target.value)}
                  placeholder="উদা: বগুড়া নার্সিং হোম"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">হাসপাতালের নাম (ইংরেজিতে)</label>
                <input
                  type="text"
                  value={hospEnName}
                  onChange={e => setHospEnName(e.target.value)}
                  placeholder="e.g. Bogura Nursing Home"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">হাসপাতালের ধরন</label>
                  <select
                    value={hospType}
                    onChange={e => setHospType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="govt">সরকারি হাসপাতাল</option>
                    <option value="private">বেসরকারি হাসপাতাল</option>
                    <option value="diagnostic">ডায়াগনস্টিক সেন্টার</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ফোন নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={hospPhone}
                    onChange={e => setHospPhone(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ঠিকানা / অবস্থান *</label>
                <input
                  type="text"
                  required
                  value={hospAddress}
                  onChange={e => setHospAddress(e.target.value)}
                  placeholder="উদা: জলেশ্বরীতলা, বগুড়া"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">২৪ ঘণ্টা জরুরি হটলাইন</label>
                <input
                  type="tel"
                  value={hospEmergency}
                  onChange={e => setHospEmergency(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddHospitalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
