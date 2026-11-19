'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { useToast } from '@/lib/context/ToastContext';
import { DetailedUpazilaData, UnionData } from '@/lib/data/unions-villages-data';
import { SiteContent } from '@/lib/services/district.service';

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
  gallery?: string[];
  shortDesc: string;
  history?: string;
  architecture?: string;
  howToReach?: string;
  timings?: string;
  entryFee?: string;
  bestTime?: string;
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

interface EmergencyItem {
  title: string;
  number: string;
  icon: string;
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

  // Primary Navigation
  const [currentNav, setCurrentNav] = useState<
    'overview' | 'moderation' | 'spots' | 'upazilas' | 'hospitals' | 'emergency' | 'community' | 'cms' | 'settings'
  >('overview');

  // Diagnostics & Telemetry
  const [systemDiag, setSystemDiag] = useState<SystemDiagnostics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Data Lists
  const [spots, setSpots] = useState<SpotItem[]>([]);
  const [community, setCommunity] = useState<CommunityItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [hospitals, setHospitals] = useState<HospitalItem[]>([]);
  const [emergencyList, setEmergencyList] = useState<EmergencyItem[]>([]);
  const [detailedUpazilas, setDetailedUpazilas] = useState<DetailedUpazilaData[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  // Moderation Filter States
  const [activeStatusTab, setActiveStatusTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedType, setSelectedType] = useState<'all' | 'spot' | 'community' | 'review'>('all');
  const [selectedUpazila, setSelectedUpazila] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals for CRUD operations
  // Spot Form Modal (Add / Edit)
  const [spotModal, setSpotModal] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; data: Partial<SpotItem> }>({
    isOpen: false,
    mode: 'add',
    data: {}
  });

  // Upazila Form Modal (Add / Edit)
  const [upazilaModal, setUpazilaModal] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; data: Partial<DetailedUpazilaData> }>({
    isOpen: false,
    mode: 'add',
    data: {}
  });

  // Union Manager Modal (Under Upazila)
  const [inspectUpazilaUnions, setInspectUpazilaUnions] = useState<DetailedUpazilaData | null>(null);
  const [newUnionName, setNewUnionName] = useState('');
  const [newUnionEnName, setNewUnionEnName] = useState('');
  const [newUnionPostcode, setNewUnionPostcode] = useState('');

  // Hospital Form Modal (Add / Edit)
  const [hospitalModal, setHospitalModal] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; targetKey?: string; data: Partial<HospitalItem> }>({
    isOpen: false,
    mode: 'add',
    data: { type: 'govt' }
  });

  // Emergency Form Modal (Add / Edit)
  const [emergencyModal, setEmergencyModal] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; targetTitle?: string; data: Partial<EmergencyItem> }>({
    isOpen: false,
    mode: 'add',
    data: {}
  });

  // Community Form Modal (Add / Edit)
  const [communityModal, setCommunityModal] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; data: Partial<CommunityItem> }>({
    isOpen: false,
    mode: 'add',
    data: { category: 'blood', group: 'O+' }
  });

  // Reject Modal
  const [rejectTarget, setRejectTarget] = useState<{ type: 'spot' | 'community' | 'review'; id: string; title: string } | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState('অসম্পূর্ণ বা তথ্য যাচাই প্রয়োজন');

  // Inspect Spot Full Details Modal
  const [inspectSpot, setInspectSpot] = useState<SpotItem | null>(null);

  // Passkey Settings
  const [newPasskey, setNewPasskey] = useState('');

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

  // Check saved session on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('amar_bogura_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // 1. Diagnostics & System Telemetry
      const sysRes = await fetch('/api/admin/system');
      const sysJson = await sysRes.json();
      if (sysJson.success && sysJson.data) {
        setSystemDiag(sysJson.data);
      }

      // 2. Submissions / Spots & Community
      const subRes = await fetch('/api/admin/submissions?status=all');
      const subJson = await subRes.json();
      if (subJson.success && subJson.data) {
        setSpots(subJson.data.spots || []);
        setCommunity(subJson.data.community || []);
        setReviews(subJson.data.reviews || []);
      }

      // 3. Hospitals
      const hospRes = await fetch('/api/admin/hospitals');
      const hospJson = await hospRes.json();
      if (hospJson.success && hospJson.data) {
        setHospitals(hospJson.data || []);
      }

      // 4. Emergency Contacts
      const emgRes = await fetch('/api/admin/emergency');
      const emgJson = await emgRes.json();
      if (emgJson.success && emgJson.data) {
        setEmergencyList(emgJson.data || []);
      }

      // 5. Upazilas with Unions
      const upaRes = await fetch('/api/admin/upazilas');
      const upaJson = await upaRes.json();
      if (upaJson.success && upaJson.data) {
        setDetailedUpazilas(upaJson.data.detailed || []);
      }

      // 6. Site Content CMS
      const contentRes = await fetch('/api/admin/content');
      const contentJson = await contentRes.json();
      if (contentJson.success && contentJson.data) {
        setSiteContent(contentJson.data);
      }
    } catch (err) {
      console.warn('Admin fetch error', err);
    } finally {
      setIsLoading(false);
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
        fetchAllData();
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

  // Toggle Policy Setting
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
        showToast(`পলিসি আপডেট: ${key} = ${newVal ? 'সক্রিয়' : 'নিষ্ক্রিয়'}`);
        fetchAllData();
      }
    } catch (err) {
      showToast('সেটিংস পরিবর্তনে সমস্যা হয়েছে', 'error');
    }
  };

  // Passkey Change
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
        fetchAllData();
      }
    } catch (err) {
      showToast('পাসকি পরিবর্তন ব্যর্থ', 'error');
    }
  };

  // ==========================================
  // SPOTS CRUD HANDLERS
  // ==========================================
  const handleSaveSpot = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = spotModal.data;
    if (!data.title || !data.location || !data.upazila || !data.shortDesc) {
      showToast('শিরোনাম, অবস্থান, উপজেলা ও বিবরণ আবশ্যক', 'error');
      return;
    }

    try {
      const method = spotModal.mode === 'add' ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/spots', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        showToast(spotModal.mode === 'add' ? 'নতুন স্থান তৈরি ও লাইভ হয়েছে!' : 'স্থানের তথ্য সফলভাবে আপডেট হয়েছে!');
        setSpotModal({ isOpen: false, mode: 'add', data: {} });
        fetchAllData();
      } else {
        showToast(json.error || 'সংরক্ষণ ব্যর্থ', 'error');
      }
    } catch (err) {
      showToast('সার্ভার যোগাযোগে সমস্যা', 'error');
    }
  };

  const handleDeleteSpot = async (id: string, title: string) => {
    if (!confirm(`আপনি কি "${title}" স্থানটি স্থায়ীভাবে মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`/api/admin/spots?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast(`"${title}" মুছে ফেলা হয়েছে`);
        fetchAllData();
      }
    } catch (err) {
      showToast('মুছে ফেলা ব্যর্থ', 'error');
    }
  };

  // ==========================================
  // UPAZILA & UNIONS CRUD HANDLERS
  // ==========================================
  const handleSaveUpazila = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = upazilaModal.data;
    if (!data.name || !data.area || !data.population) {
      showToast('নাম, আয়তন ও জনসংখ্যা আবশ্যক', 'error');
      return;
    }

    try {
      const method = upazilaModal.mode === 'add' ? 'POST' : 'PUT';
      const body = upazilaModal.mode === 'add'
        ? {
            upazila: {
              serialBn: data.serialBn || '১৩',
              serialEn: data.serialEn || '13',
              name: data.name,
              enName: data.enName || data.name,
              area: data.area,
              areaEn: data.area,
              unionCount: `${data.unionCount || 0}টি`,
              unionCountEn: `${data.unionCount || 0} Unions`,
              unions: `${data.unionCount || 0}টি ইউনিয়ন`,
              pourashava: data.pourashava || 'নাই',
              pourashavaEn: data.pourashava || 'None',
              hasPourashava: data.hasPourashava || false,
              tags: ['upazila'],
              postalCode: data.postalCode || '৫৮০০',
              rivers: data.rivers || 'করতোয়া',
              healthPhone: data.healthPhone || '01700-000000',
              landmark: data.landmark || data.name,
              desc: data.desc || data.name,
              enDesc: data.desc || data.name,
              historyNote: data.historyNote || data.name,
              unionList: []
            },
            detailed: data
          }
        : {
            name: data.name,
            updates: data
          };

      const res = await fetch('/api/admin/upazilas', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        showToast(upazilaModal.mode === 'add' ? 'নতুন উপজেলা যুক্ত হয়েছে!' : 'উপজেলা তথ্য আপডেট হয়েছে!');
        setUpazilaModal({ isOpen: false, mode: 'add', data: {} });
        fetchAllData();
      }
    } catch (err) {
      showToast('উপজেলা সংরক্ষণ ব্যর্থ', 'error');
    }
  };

  const handleDeleteUpazila = async (name: string) => {
    if (!confirm(`আপনি কি "${name}" উপজেলা মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`/api/admin/upazilas?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast(`"${name}" উপজেলা মুছে ফেলা হয়েছে`);
        fetchAllData();
      }
    } catch (err) {
      showToast('মুছে ফেলা ব্যর্থ', 'error');
    }
  };

  // Add Union to inspected Upazila
  const handleAddUnionToUpazila = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectUpazilaUnions || !newUnionName.trim()) return;

    try {
      const unionObj: UnionData = {
        id: `un-${Date.now()}`,
        name: newUnionName.trim(),
        enName: newUnionEnName.trim() || newUnionName.trim(),
        upazilaId: inspectUpazilaUnions.id,
        upazilaName: inspectUpazilaUnions.name,
        postCode: newUnionPostcode.trim() || inspectUpazilaUnions.postalCode,
        villageCount: 15,
        villages: ['গ্রাম ১', 'গ্রাম ২', 'গ্রাম ৩'],
        lat: inspectUpazilaUnions.lat,
        lng: inspectUpazilaUnions.lng,
        officeLocation: `${newUnionName.trim()} ইউনিয়ন পরিষদ ভবন`
      };

      const res = await fetch('/api/admin/upazilas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addUnion',
          upazilaName: inspectUpazilaUnions.name,
          union: unionObj
        })
      });
      const json = await res.json();
      if (json.success) {
        showToast('ইউনিয়ন সফলভাবে যুক্ত হয়েছে!');
        setNewUnionName('');
        setNewUnionEnName('');
        setNewUnionPostcode('');
        fetchAllData();
        // Update local modal view
        setInspectUpazilaUnions(prev => prev ? {
          ...prev,
          unions: [...prev.unions, unionObj],
          unionCount: prev.unions.length + 1
        } : null);
      }
    } catch (err) {
      showToast('ইউনিয়ন যুক্ত করা যায়নি', 'error');
    }
  };

  const handleDeleteUnion = async (unionId: string, unionName: string) => {
    if (!inspectUpazilaUnions || !confirm(`আপনি কি "${unionName}" ইউনিয়ন মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(
        `/api/admin/upazilas?action=deleteUnion&upazila=${encodeURIComponent(inspectUpazilaUnions.name)}&unionId=${encodeURIComponent(unionId)}`,
        { method: 'DELETE' }
      );
      const json = await res.json();
      if (json.success) {
        showToast(`"${unionName}" মুছে ফেলা হয়েছে`);
        setInspectUpazilaUnions(prev => prev ? {
          ...prev,
          unions: prev.unions.filter(u => u.id !== unionId && u.name !== unionId),
          unionCount: prev.unions.length - 1
        } : null);
        fetchAllData();
      }
    } catch (e) {
      showToast('ইউনিয়ন মুছতে সমস্যা হয়েছে', 'error');
    }
  };

  // ==========================================
  // HOSPITALS CRUD HANDLERS
  // ==========================================
  const handleSaveHospital = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = hospitalModal.data;
    if (!data.name || !data.address || !data.phone) {
      showToast('নাম, ঠিকানা ও ফোন নম্বর আবশ্যক', 'error');
      return;
    }

    try {
      const method = hospitalModal.mode === 'add' ? 'POST' : 'PUT';
      const body = hospitalModal.mode === 'add'
        ? data
        : { targetKey: hospitalModal.targetKey || data.name, ...data };

      const res = await fetch('/api/admin/hospitals', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        showToast(hospitalModal.mode === 'add' ? 'হাসপাতাল যুক্ত হয়েছে!' : 'হাসপাতাল তথ্য আপডেট হয়েছে!');
        setHospitalModal({ isOpen: false, mode: 'add', data: {} });
        fetchAllData();
      }
    } catch (err) {
      showToast('সংরক্ষণ ব্যর্থ', 'error');
    }
  };

  const handleDeleteHospital = async (name: string) => {
    if (!confirm(`আপনি কি "${name}" মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`/api/admin/hospitals?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('হাসপাতাল মুছে ফেলা হয়েছে');
        fetchAllData();
      }
    } catch (e) {
      showToast('মুছে ফেলা ব্যর্থ', 'error');
    }
  };

  // ==========================================
  // EMERGENCY CRUD HANDLERS
  // ==========================================
  const handleSaveEmergency = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = emergencyModal.data;
    if (!data.title || !data.number) {
      showToast('শিরোনাম ও নম্বর আবশ্যক', 'error');
      return;
    }

    try {
      const method = emergencyModal.mode === 'add' ? 'POST' : 'PUT';
      const body = emergencyModal.mode === 'add'
        ? data
        : { title: emergencyModal.targetTitle || data.title, updates: data };

      const res = await fetch('/api/admin/emergency', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        showToast(emergencyModal.mode === 'add' ? 'জরুরি সেবা যুক্ত হয়েছে!' : 'জরুরি সেবা আপডেট হয়েছে!');
        setEmergencyModal({ isOpen: false, mode: 'add', data: {} });
        fetchAllData();
      }
    } catch (e) {
      showToast('সংরক্ষণ ব্যর্থ', 'error');
    }
  };

  const handleDeleteEmergency = async (title: string) => {
    if (!confirm(`আপনি কি "${title}" হটলাইন মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`/api/admin/emergency?title=${encodeURIComponent(title)}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('হটলাইন মুছে ফেলা হয়েছে');
        fetchAllData();
      }
    } catch (e) {
      showToast('মুছে ফেলা ব্যর্থ', 'error');
    }
  };

  // ==========================================
  // COMMUNITY & BLOOD CRUD HANDLERS
  // ==========================================
  const handleSaveCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = communityModal.data;
    if (!data.name || !data.upazila || !data.detail || !data.phone) {
      showToast('নাম, উপজেলা, বিবরণ ও ফোন নম্বর আবশ্যক', 'error');
      return;
    }

    try {
      const method = communityModal.mode === 'add' ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/community', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        showToast(communityModal.mode === 'add' ? 'কমিউনিটি এন্ট্রি তৈরি হয়েছে!' : 'তথ্য আপডেট হয়েছে!');
        setCommunityModal({ isOpen: false, mode: 'add', data: {} });
        fetchAllData();
      }
    } catch (e) {
      showToast('সংরক্ষণ ব্যর্থ', 'error');
    }
  };

  const handleDeleteCommunity = async (id: string, name: string) => {
    if (!confirm(`আপনি কি "${name}" মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`/api/admin/community?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast('এন্ট্রি মুছে ফেলা হয়েছে');
        fetchAllData();
      }
    } catch (e) {
      showToast('মুছে ফেলা ব্যর্থ', 'error');
    }
  };

  // ==========================================
  // SITE CONTENT CMS HANDLER
  // ==========================================
  const handleSaveSiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteContent) return;

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteContent)
      });
      const json = await res.json();
      if (json.success) {
        showToast('ওয়েবসাইটের ব্যানার ও কন্টেন্ট সফলভাবে আপডেট হয়েছে!');
        fetchAllData();
      }
    } catch (err) {
      showToast('কন্টেন্ট আপডেট ব্যর্থ', 'error');
    }
  };

  // Moderation Approval / Reject
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
        fetchAllData();
        if (inspectSpot?.id === id) setInspectSpot(null);
      }
    } catch (err) {
      showToast('অনুমোদন ব্যর্থ', 'error');
    }
  };

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
        fetchAllData();
      }
    } catch (err) {
      showToast('বাতিল ব্যর্থ', 'error');
    }
  };

  // Pending Count
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
  // AUTHENTICATED SYSTEM ADMIN DASHBOARD (CMS)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Top Main Navigation Header */}
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
                <span>সিস্টেম অ্যাডমিন ও ডাইনামিক CMS</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick 1-Click JSON Backup */}
            <a
              href="/api/admin/backup"
              download
              className="px-3 py-1.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/40 text-xs font-semibold transition flex items-center gap-1.5"
              title="সম্পূর্ণ জেলা ডাটাবেজের ব্যাকআপ ডাউনলোড করুন"
            >
              <i className="fa-solid fa-cloud-arrow-down text-amber-300"></i>
              <span className="hidden sm:inline">JSON ব্যাকআপ</span>
            </a>

            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-globe text-amber-400"></i>
              <span className="hidden sm:inline">লাইভ সাইট</span>
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
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2 no-scrollbar" role="tablist">
            <button
              onClick={() => setCurrentNav('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentNav === 'moderation'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-shield-halved"></i>
              <span>অনুমোদন কিউ</span>
              {pendingTotalCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] animate-pulse">
                  {pendingTotalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentNav('spots')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentNav === 'spots'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-landmark text-amber-400"></i>
              <span>দর্শনীয় স্থান ({spots.length})</span>
            </button>

            <button
              onClick={() => setCurrentNav('upazilas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentNav === 'upazilas'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-map-location-dot"></i>
              <span>উপজেলা ও ইউনিয়ন ({detailedUpazilas.length})</span>
            </button>

            <button
              onClick={() => setCurrentNav('hospitals')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentNav === 'hospitals'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-hospital text-rose-400"></i>
              <span>হাসপাতাল ({hospitals.length})</span>
            </button>

            <button
              onClick={() => setCurrentNav('emergency')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentNav === 'emergency'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-phone-volume text-amber-300"></i>
              <span>জরুরি হটলাইন ({emergencyList.length})</span>
            </button>

            <button
              onClick={() => setCurrentNav('community')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentNav === 'community'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-users text-sky-400"></i>
              <span>রক্তদাতা ও কমিউনিটি ({community.length})</span>
            </button>

            <button
              onClick={() => setCurrentNav('cms')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentNav === 'cms'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-pen-nib text-amber-300"></i>
              <span>ওয়েবসাইট ব্যানার ও কন্টেন্ট</span>
            </button>

            <button
              onClick={() => setCurrentNav('settings')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                currentNav === 'settings'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <i className="fa-solid fa-gears"></i>
              <span>সেটিংস</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {/* ======================================================== */}
        {currentNav === 'overview' && (
          <div className="space-y-8">
            {/* System Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>সিস্টেম অবস্থা: ১০০% সক্রিয় ও গতিশীল CMS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    আমার বগুড়া · সিস্টেম অ্যাডমিন ও কন্টেন্ট কন্ট্রোল
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    ওয়েবসাইটের প্রতিটি তথ্য সরাসরি এই প্যানেল থেকে তৈরি, সম্পাদনা ও মুছে ফেলা যাবে
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={fetchAllData}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
                  >
                    <i className={`fa-solid fa-arrows-rotate ${isLoading ? 'fa-spin' : ''}`}></i>
                    <span>রিফ্রেশ</span>
                  </button>
                  <a
                    href="/api/admin/backup"
                    download
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition flex items-center gap-2"
                  >
                    <i className="fa-solid fa-cloud-arrow-down"></i>
                    <span>ব্যাকআপ নিন</span>
                  </a>
                </div>
              </div>

              {/* 3 Tech Stack Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">ডাটাবেজ স্ট্যাটাস</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                    <i className="fa-solid fa-database"></i>
                    <span>Supabase PostgreSQL + Memory Cache</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">রিয়েলটাইম রিঅ্যাকটিভ সিনক্রোনাইজেশন সক্রিয়</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">কন্টেন্ট ইঞ্জিন (CMS)</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                    <i className="fa-solid fa-bolt"></i>
                    <span>১০০% ডাইনামিক লাইভ আপডেট</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">কোনো কোডিং ছাড়াই সম্পূর্ণ ওয়েবসাইট পরিচালনা</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1">নিরাপত্তা ও পলিসি</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-400">
                    <i className="fa-solid fa-shield-check"></i>
                    <span>Passkey Protected SuperAdmin</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">সুপারঅ্যাডমিন সেশন পরিচালিত</p>
                </div>
              </div>
            </div>

            {/* Quick KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div
                onClick={() => setCurrentNav('spots')}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-[11px] font-bold uppercase">দর্শনীয় স্থান</span>
                  <i className="fa-solid fa-landmark text-amber-600"></i>
                </div>
                <div className="text-2xl font-black text-slate-900">{spots.length}টি</div>
                <p className="text-[10px] text-emerald-800 font-semibold mt-1">সম্পাদনা ও নতুন যোগ</p>
              </div>

              <div
                onClick={() => setCurrentNav('upazilas')}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-[11px] font-bold uppercase">উপজেলা ও ইউনিয়ন</span>
                  <i className="fa-solid fa-map-location-dot text-emerald-700"></i>
                </div>
                <div className="text-2xl font-black text-slate-900">{detailedUpazilas.length}টি</div>
                <p className="text-[10px] text-slate-500 mt-1">১০৮ ইউনিয়ন ও গ্রাম</p>
              </div>

              <div
                onClick={() => setCurrentNav('hospitals')}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-[11px] font-bold uppercase">হাসপাতাল</span>
                  <i className="fa-solid fa-hospital text-rose-700"></i>
                </div>
                <div className="text-2xl font-black text-slate-900">{hospitals.length}টি</div>
                <p className="text-[10px] text-slate-500 mt-1">জরুরি স্বাস্থ্যসেবা</p>
              </div>

              <div
                onClick={() => setCurrentNav('emergency')}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-[11px] font-bold uppercase">জরুরি হটলাইন</span>
                  <i className="fa-solid fa-phone-volume text-blue-700"></i>
                </div>
                <div className="text-2xl font-black text-slate-900">{emergencyList.length}টি</div>
                <p className="text-[10px] text-slate-500 mt-1">থানা ও ফায়ার সার্ভিস</p>
              </div>

              <div
                onClick={() => setCurrentNav('community')}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-600 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-[11px] font-bold uppercase">রক্তদাতা ও নোটিশ</span>
                  <i className="fa-solid fa-users text-sky-700"></i>
                </div>
                <div className="text-2xl font-black text-slate-900">{community.length}টি</div>
                <p className="text-[10px] text-slate-500 mt-1">কমিউনিটি নেটওয়ার্ক</p>
              </div>

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

            {/* Policy Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">পলিসি ১</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      systemDiag?.settings?.autoApprove ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {systemDiag?.settings?.autoApprove ? 'সরাসরি লাইভ' : 'মডারেশন অপেক্ষমাণ'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">স্বয়ংক্রিয় অনুমোদন</h4>
                  <p className="text-xs text-slate-600 mt-1">চালু থাকলে নাগরিক অবদান সরাসরি ওয়েবসাইটে চলে যাবে।</p>
                </div>
                <button
                  onClick={() => handleToggleSetting('autoApprove')}
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    systemDiag?.settings?.autoApprove ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {systemDiag?.settings?.autoApprove ? 'চালু (Active)' : 'বন্ধ (Manual Approval)'}
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">পলিসি ২</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      systemDiag?.settings?.allowPublicContributions ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {systemDiag?.settings?.allowPublicContributions ? 'উন্মুক্ত' : 'স্থগিত'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">নাগরিক অবদান ফরম</h4>
                  <p className="text-xs text-slate-600 mt-1">/contribute পেজে জনসাধারণের তথ্য পাঠানোর সুইচ।</p>
                </div>
                <button
                  onClick={() => handleToggleSetting('allowPublicContributions')}
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    systemDiag?.settings?.allowPublicContributions ? 'bg-emerald-800 text-white' : 'bg-rose-800 text-white'
                  }`}
                >
                  {systemDiag?.settings?.allowPublicContributions ? 'উন্মুক্ত (Open)' : 'স্থগিত (Paused)'}
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">পলিসি ৩</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      systemDiag?.settings?.maintenanceMode ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {systemDiag?.settings?.maintenanceMode ? 'রক্ষণাবেক্ষণ' : 'লাইভ প্রোডাকশন'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">মেইনটেন্যান্স মোড</h4>
                  <p className="text-xs text-slate-600 mt-1">ডাটাবেজ মাইগ্রেশনের সময় রক্ষণাবেক্ষণ ব্যানার চালু রাখুন।</p>
                </div>
                <button
                  onClick={() => handleToggleSetting('maintenanceMode')}
                  className={`mt-4 w-full py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    systemDiag?.settings?.maintenanceMode ? 'bg-rose-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {systemDiag?.settings?.maintenanceMode ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                </button>
              </div>
            </div>

            {/* Live Audit Log Stream */}
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
                  <div key={log.id} className="py-2.5 flex items-start justify-between gap-4 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className={`p-1.5 rounded-lg text-xs shrink-0 mt-0.5 ${
                        log.status === 'success' ? 'bg-emerald-100 text-emerald-700' : log.status === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700'
                      }`}>
                        <i className={`fa-solid ${log.status === 'success' ? 'fa-check' : log.status === 'warning' ? 'fa-triangle-exclamation' : 'fa-info'}`}></i>
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{log.action}</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px]">{log.target}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{log.details}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MODERATION & QUEUE */}
        {/* ======================================================== */}
        {currentNav === 'moderation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStatusTab('pending')}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeStatusTab === 'pending' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <i className="fa-solid fa-hourglass-half text-amber-900"></i>
                    <span>অপেক্ষমাণ কিউ</span>
                    <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs font-mono">{pendingTotalCount}</span>
                  </button>

                  <button
                    onClick={() => setActiveStatusTab('approved')}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeStatusTab === 'approved' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <i className="fa-solid fa-check-double text-emerald-300"></i>
                    <span>অনুমোদিত ও লাইভ</span>
                  </button>

                  <button
                    onClick={() => setActiveStatusTab('rejected')}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeStatusTab === 'rejected' ? 'bg-rose-800 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <i className="fa-solid fa-xmark text-rose-300"></i>
                    <span>বাতিলকৃত</span>
                  </button>
                </div>

                <button
                  onClick={fetchAllData}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
                >
                  <i className={`fa-solid fa-arrows-rotate ${isLoading ? 'fa-spin' : ''}`}></i>
                  <span>রিফ্রেশ</span>
                </button>
              </div>

              {/* Filters */}
              <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                      selectedType === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    সকল বিভাগ
                  </button>
                  <button
                    onClick={() => setSelectedType('spot')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
                      selectedType === 'spot' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <i className="fa-solid fa-landmark text-amber-500"></i>
                    <span>দর্শনীয় স্থান ({spots.filter(s => activeStatusTab === 'pending' ? (!s.isApproved || s.status === 'pending') : (s.isApproved && s.status !== 'rejected')).length})</span>
                  </button>
                  <button
                    onClick={() => setSelectedType('community')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
                      selectedType === 'community' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <i className="fa-solid fa-users text-rose-500"></i>
                    <span>কমিউনিটি ও রক্তদাতা</span>
                  </button>
                  <button
                    onClick={() => setSelectedType('review')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
                      selectedType === 'review' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <span>রিভিউ ({reviews.length})</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedUpazila}
                    onChange={e => setSelectedUpazila(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    {upazilaList.map(u => (
                      <option key={u} value={u}>{u === 'ALL' ? 'সকল উপজেলা' : u}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="নাম বা বিবরণ খুঁজুন..."
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs w-44"
                  />
                </div>
              </div>
            </div>

            {/* Moderation List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {spots
                .filter(s => activeStatusTab === 'pending' ? (!s.isApproved || s.status === 'pending') : activeStatusTab === 'approved' ? (s.isApproved && s.status !== 'rejected') : s.status === 'rejected')
                .filter(s => selectedUpazila === 'ALL' || s.upazila === selectedUpazila)
                .map(spot => (
                  <div key={spot.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold">{spot.upazila} · {spot.categoryBn}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          spot.status === 'approved' || spot.isApproved ? 'bg-emerald-100 text-emerald-800' : spot.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                        }`}>
                          {spot.status === 'approved' || spot.isApproved ? 'লাইভ' : spot.status === 'rejected' ? 'বাতিল' : 'অপেক্ষমাণ'}
                        </span>
                      </div>
                      <div className="flex gap-3 mb-2">
                        <img src={spot.coverImage} alt={spot.title} className="w-16 h-14 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{spot.title}</h4>
                          <p className="text-xs text-slate-500">{spot.location}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{spot.shortDesc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setInspectSpot(spot)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        বিস্তারিত
                      </button>

                      <div className="flex items-center gap-1.5">
                        {spot.status !== 'approved' && !spot.isApproved && (
                          <button
                            onClick={() => handleApprove('spot', spot.id, spot.title)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold"
                          >
                            <i className="fa-solid fa-check mr-1"></i> অনুমোদন
                          </button>
                        )}
                        {spot.status !== 'rejected' && (
                          <button
                            onClick={() => setRejectTarget({ type: 'spot', id: spot.id, title: spot.title })}
                            className="px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSpot(spot.id, spot.title)}
                          className="px-2 py-1.5 text-slate-400 hover:text-rose-600"
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

        {/* ======================================================== */}
        {/* TAB 3: SPOTS CRUD (দর্শনীয় স্থান ও ঐতিহ্য CMS) */}
        {/* ======================================================== */}
        {currentNav === 'spots' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    বগুড়ার দর্শনীয় স্থান ও ঐতিহ্য পরিক্রমা (Spots CMS)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    যেকোনো দর্শনীয় স্থানের নাম, ছবি, ইতিহাস, যাতায়াত ও টিকিট ফি সম্পাদনা বা নতুন স্থান যুক্ত করুন
                  </p>
                </div>

                <button
                  onClick={() => setSpotModal({
                    isOpen: true,
                    mode: 'add',
                    data: {
                      category: 'archaeological',
                      categoryBn: 'প্রত্নতাত্ত্বিক নিদর্শন',
                      upazila: 'শিবগঞ্জ',
                      timings: 'সকাল ৯টা – বিকেল ৫টা',
                      entryFee: 'বিনামূল্যে',
                      coverImage: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'
                    }
                  })}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>+ নতুন স্থান যোগ করুন</span>
                </button>
              </div>

              {/* Spots Table */}
              <div className="overflow-x-auto pt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">ছবি</th>
                      <th className="py-3 px-3">নাম ও অবস্থান</th>
                      <th className="py-3 px-3">উপজেলা</th>
                      <th className="py-3 px-3">ধরন</th>
                      <th className="py-3 px-3">সময়সূচি ও ফি</th>
                      <th className="py-3 px-3">অবস্থা</th>
                      <th className="py-3 px-3 text-right">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {spots.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3">
                          <img src={s.coverImage} alt={s.title} className="w-12 h-10 rounded-lg object-cover border" />
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 block">{s.title}</span>
                          <span className="text-[11px] text-slate-500">{s.location}</span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-emerald-800">{s.upazila}</td>
                        <td className="py-3 px-3 text-slate-600">{s.categoryBn}</td>
                        <td className="py-3 px-3 text-slate-600">{s.timings} · {s.entryFee}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {s.isApproved ? 'লাইভ' : 'অপেক্ষমাণ'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSpotModal({ isOpen: true, mode: 'edit', data: s })}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 cursor-pointer"
                            >
                              <i className="fa-solid fa-pen-to-square mr-1"></i> সম্পাদনা
                            </button>
                            <button
                              onClick={() => handleDeleteSpot(s.id, s.title)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
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
        {/* TAB 4: UPAZILAS & UNIONS CRUD */}
        {/* ======================================================== */}
        {currentNav === 'upazilas' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    উপজেলা ও ইউনিয়ন নিয়ন্ত্রণ (Upazilas & Unions Master)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    ১২টি উপজেলার প্রশাসনিক তথ্য, আয়তন, জনসংখ্যা ও সংশ্লিষ্ট ১০৮টি ইউনিয়নের গ্রাম তালিকা সম্পাদনা করুন
                  </p>
                </div>

                <button
                  onClick={() => setUpazilaModal({
                    isOpen: true,
                    mode: 'add',
                    data: {
                      serialBn: '১৩',
                      serialEn: '13',
                      hasPourashava: false,
                      unions: []
                    }
                  })}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>+ নতুন উপজেলা যুক্ত করুন</span>
                </button>
              </div>

              {/* Upazilas Table */}
              <div className="overflow-x-auto pt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">ক্রমিক</th>
                      <th className="py-3 px-3">উপজেলার নাম</th>
                      <th className="py-3 px-3">আয়তন ও জনসংখ্যা</th>
                      <th className="py-3 px-3">ইউনিয়ন ও গ্রাম</th>
                      <th className="py-3 px-3">ইউএনও হটলাইন</th>
                      <th className="py-3 px-3">থানা পুলিশ</th>
                      <th className="py-3 px-3 text-right">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {detailedUpazilas.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3 font-bold text-emerald-800">{u.serialBn}</td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 block text-sm">{u.name}</span>
                          <span className="text-[11px] text-slate-400">{u.enName} · {u.postalCode}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{u.area} · {u.population}</td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => setInspectUpazilaUnions(u)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 cursor-pointer"
                          >
                            {u.unionCount}টি ইউনিয়ন ও গ্রাম
                          </button>
                        </td>
                        <td className="py-3 px-3 font-mono text-emerald-700 font-semibold">{u.unoPhone}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{u.policePhone}</td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setUpazilaModal({ isOpen: true, mode: 'edit', data: u })}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                            >
                              সম্পাদনা
                            </button>
                            <button
                              onClick={() => handleDeleteUpazila(u.name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
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
        {/* TAB 5: HOSPITALS CRUD */}
        {/* ======================================================== */}
        {currentNav === 'hospitals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    হাসপাতাল ও ডায়াগনস্টিক ব্যবস্থাপনা (Hospitals CMS)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    বগুড়ার সরকারি ও বেসরকারি হাসপাতাল, ফোন নম্বর ও জরুরি হটলাইন যুক্ত বা সম্পাদনা করুন
                  </p>
                </div>

                <button
                  onClick={() => setHospitalModal({
                    isOpen: true,
                    mode: 'add',
                    data: { type: 'govt', typeLabel: 'সরকারি হাসপাতাল' }
                  })}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>+ নতুন হাসপাতাল যোগ করুন</span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto pt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">নাম</th>
                      <th className="py-3 px-3">ধরন</th>
                      <th className="py-3 px-3">ঠিকানা</th>
                      <th className="py-3 px-3">সাধারণ ফোন</th>
                      <th className="py-3 px-3">জরুরি হটলাইন</th>
                      <th className="py-3 px-3 text-right">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hospitals.map((h, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 block">{h.name}</span>
                          <span className="text-[11px] text-slate-400">{h.enName}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            h.type === 'govt' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {h.typeLabel}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{h.address}</td>
                        <td className="py-3 px-3 font-mono text-slate-700 font-semibold">{h.phone}</td>
                        <td className="py-3 px-3 font-mono text-rose-700 font-bold">{h.emergency}</td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setHospitalModal({ isOpen: true, mode: 'edit', targetKey: h.name, data: h })}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 cursor-pointer"
                            >
                              সম্পাদনা
                            </button>
                            <button
                              onClick={() => handleDeleteHospital(h.name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
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
        {/* TAB 6: EMERGENCY HOTLINES CRUD */}
        {/* ======================================================== */}
        {currentNav === 'emergency' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    জরুরি যোগাযোগ ও হটলাইন ডিরেক্টরি (Emergency Hotlines)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    বগুড়া পুলিশ সুপার, সদর থানা, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স নম্বর পরিচালনা করুন
                  </p>
                </div>

                <button
                  onClick={() => setEmergencyModal({
                    isOpen: true,
                    mode: 'add',
                    data: { icon: 'fa-phone-volume' }
                  })}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>+ নতুন হটলাইন যোগ করুন</span>
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {emergencyList.map((emg, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{emg.title}</h4>
                      <p className="font-mono text-emerald-800 font-bold text-base mt-1">{emg.number}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEmergencyModal({ isOpen: true, mode: 'edit', targetTitle: emg.title, data: emg })}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                      >
                        সম্পাদনা
                      </button>
                      <button
                        onClick={() => handleDeleteEmergency(emg.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: BLOOD & COMMUNITY CRUD */}
        {/* ======================================================== */}
        {currentNav === 'community' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    রক্তদাতা ও কমিউনিটি সার্ভিস CMS
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    রক্তের গ্রুপ, টিউশন, বাসা ভাড়া, চাকরি ও স্থানীয় ব্যবসার এন্ট্রি পরিচালনা
                  </p>
                </div>

                <button
                  onClick={() => setCommunityModal({
                    isOpen: true,
                    mode: 'add',
                    data: { category: 'blood', group: 'O+', role: 'নিয়মিত রক্তদাতা', upazila: 'বগুড়া সদর' }
                  })}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>+ নতুন এন্ট্রি যোগ করুন</span>
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {community.map(item => (
                  <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">{item.upazila}</span>
                        {item.group ? (
                          <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 text-xs font-black">{item.group}</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold">{item.category}</span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.detail}</p>
                      <p className="font-mono text-emerald-800 font-bold text-xs mt-2">{item.phone}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-700">
                        {item.isApproved ? 'অনুমোদিত' : 'অপেক্ষমাণ'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setCommunityModal({ isOpen: true, mode: 'edit', data: item })}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                        >
                          সম্পাদনা
                        </button>
                        <button
                          onClick={() => handleDeleteCommunity(item.id, item.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: WEBSITE BANNERS & CONTENT CMS */}
        {/* ======================================================== */}
        {currentNav === 'cms' && siteContent && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="pb-6 mb-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">
                  ওয়েবসাইট ব্যানার ও টেক্সট কন্টেন্ট CMS
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  ওয়েবসাইটের শীর্ষ নোটিস বার, হিরো ব্যানার, ইতিহাস বিবরণ ও ফুটার টেক্সট সরাসরি এখান থেকে পরিবর্তন করুন
                </p>
              </div>

              <form onSubmit={handleSaveSiteContent} className="space-y-6 text-xs sm:text-sm">
                {/* Notice Bar */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    ১. শীর্ষ নোটিস বার (Top Notice Bar)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">নোটিস লেবেল</label>
                      <input
                        type="text"
                        value={siteContent.topNoticeLabel}
                        onChange={e => setSiteContent({ ...siteContent, topNoticeLabel: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">বিভাগ ব্যাজ</label>
                      <input
                        type="text"
                        value={siteContent.divisionBadge}
                        onChange={e => setSiteContent({ ...siteContent, divisionBadge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">স্ক্রোলিং নোটিস বার্তা</label>
                    <input
                      type="text"
                      value={siteContent.topNoticeText}
                      onChange={e => setSiteContent({ ...siteContent, topNoticeText: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                {/* Hero Section */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    ২. হিরো ব্যানার (Hero Banner)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">হিরো ব্যাজ</label>
                      <input
                        type="text"
                        value={siteContent.heroBadge}
                        onChange={e => setSiteContent({ ...siteContent, heroBadge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">প্রধান শিরোনাম</label>
                      <input
                        type="text"
                        value={siteContent.heroTitle}
                        onChange={e => setSiteContent({ ...siteContent, heroTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">উপশিরোনাম ও ভূমিকা</label>
                    <textarea
                      rows={2}
                      value={siteContent.heroSubtitle}
                      onChange={e => setSiteContent({ ...siteContent, heroSubtitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">কভার ছবির URL</label>
                    <input
                      type="text"
                      value={siteContent.coverImageUrl}
                      onChange={e => setSiteContent({ ...siteContent, coverImageUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                {/* History Section */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    ৩. ইতিহাস ও ঐতিহ্য অংশ (History Section)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ইতিহাস শিরোনাম</label>
                      <input
                        type="text"
                        value={siteContent.historyTitle}
                        onChange={e => setSiteContent({ ...siteContent, historyTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ঐতিহাসিক কাল</label>
                      <input
                        type="text"
                        value={siteContent.historyPeriod}
                        onChange={e => setSiteContent({ ...siteContent, historyPeriod: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ইতিহাসের পূর্ণ বিবরণ</label>
                    <textarea
                      rows={3}
                      value={siteContent.historySummary}
                      onChange={e => setSiteContent({ ...siteContent, historySummary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    <i className="fa-solid fa-floppy-disk mr-2"></i>
                    ওয়েবসাইট কন্টেন্ট সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: SETTINGS & BACKUP */}
        {/* ======================================================== */}
        {currentNav === 'settings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-key text-emerald-700"></i>
                  <span>অ্যাডমিন পাসকি পরিবর্তন</span>
                </h3>
                <p className="text-xs text-slate-500 mb-4">অ্যাডমিন ড্যাশবোর্ডে প্রবেশের পাসকি আপডেট করুন।</p>

                <form onSubmit={handleChangePasskey} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">নতুন পাসকি (কমপক্ষে ৬ অক্ষর)</label>
                    <input
                      type="password"
                      required
                      value={newPasskey}
                      onChange={e => setNewPasskey(e.target.value)}
                      placeholder="নতুন পাসকি লিখুন..."
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
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

              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <i className="fa-solid fa-cloud-arrow-down text-amber-600"></i>
                    <span>সম্পূর্ণ ডাটাবেজ ব্যাকআপ ও এক্সপোর্ট</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    ১২টি উপজেলা, ১০৮টি ইউনিয়ন, ২,৬৯২টি গ্রাম, হাসপাতাল ও দর্শনীয় স্থানের সম্পূর্ণ ব্যাকআপ JSON ফরম্যাটে সংরক্ষণ করুন।
                  </p>
                </div>

                <a
                  href="/api/admin/backup"
                  download
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
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
      {/* MODAL 1: ADD / EDIT SPOT MODAL */}
      {/* ======================================================== */}
      {spotModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {spotModal.mode === 'add' ? 'নতুন দর্শনীয় স্থান যোগ করুন' : 'দর্শনীয় স্থান সম্পাদনা করুন'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">স্থানের সম্পূর্ণ বিবরণ ও ছবি হালনাগাদ করুন</p>

            <form onSubmit={handleSaveSpot} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">স্থানের নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={spotModal.data.title || ''}
                    onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, title: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">স্থানের নাম (ইংরেজিতে)</label>
                  <input
                    type="text"
                    value={spotModal.data.enTitle || ''}
                    onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, enTitle: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">উপজেলা *</label>
                  <select
                    value={spotModal.data.upazila || 'শিবগঞ্জ'}
                    onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, upazila: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {upazilaList.filter(u => u !== 'ALL').map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={spotModal.data.category || 'archaeological'}
                    onChange={e => {
                      const cat = e.target.value;
                      const bnMap: Record<string, string> = {
                        archaeological: 'প্রত্নতাত্ত্বিক নিদর্শন',
                        nature: 'নদী ও প্রাকৃতিক সৌন্দর্য',
                        religious: 'ধর্মীয় ও আধ্যাত্মিক স্থান',
                        heritage: 'ঐতিহাসিক স্থাপত্য ও সংস্কৃতি'
                      };
                      setSpotModal({ ...spotModal, data: { ...spotModal.data, category: cat, categoryBn: bnMap[cat] } });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="archaeological">প্রত্নতাত্ত্বিক নিদর্শন</option>
                    <option value="nature">নদী ও প্রাকৃতিক সৌন্দর্য</option>
                    <option value="religious">ধর্মীয় ও আধ্যাত্মিক স্থান</option>
                    <option value="heritage">ঐতিহাসিক স্থাপত্য ও সংস্কৃতি</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">অবস্থান / ঠিকানা *</label>
                <input
                  type="text"
                  required
                  value={spotModal.data.location || ''}
                  onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, location: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">কভার ছবির URL</label>
                <input
                  type="text"
                  value={spotModal.data.coverImage || ''}
                  onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, coverImage: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">সংক্ষিপ্ত পরিচিতি *</label>
                <textarea
                  rows={2}
                  required
                  value={spotModal.data.shortDesc || ''}
                  onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, shortDesc: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ইতিহাস ও স্থাপত্য</label>
                <textarea
                  rows={3}
                  value={spotModal.data.history || ''}
                  onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, history: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">যাতায়াত ব্যবস্থা</label>
                  <input
                    type="text"
                    value={spotModal.data.howToReach || ''}
                    onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, howToReach: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">সময়সূচি</label>
                  <input
                    type="text"
                    value={spotModal.data.timings || ''}
                    onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, timings: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">প্রবেশ ফি</label>
                  <input
                    type="text"
                    value={spotModal.data.entryFee || ''}
                    onChange={e => setSpotModal({ ...spotModal, data: { ...spotModal.data, entryFee: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSpotModal({ isOpen: false, mode: 'add', data: {} })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold"
                >
                  সংরক্ষণ ও প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: ADD / EDIT UPAZILA MODAL */}
      {/* ======================================================== */}
      {upazilaModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {upazilaModal.mode === 'add' ? 'নতুন উপজেলা যুক্ত করুন' : 'উপজেলা সম্পাদনা করুন'}
            </h3>

            <form onSubmit={handleSaveUpazila} className="space-y-3 text-xs mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">উপজেলার নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={upazilaModal.data.name || ''}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, name: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">উপজেলার নাম (ইংরেজিতে)</label>
                  <input
                    type="text"
                    value={upazilaModal.data.enName || ''}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, enName: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">আয়তন (বর্গকিমি) *</label>
                  <input
                    type="text"
                    required
                    value={upazilaModal.data.area || ''}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, area: e.target.value } })}
                    placeholder="১৭৬.৫৮ বর্গকিমি"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">জনসংখ্যা *</label>
                  <input
                    type="text"
                    required
                    value={upazilaModal.data.population || ''}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, population: e.target.value } })}
                    placeholder="৫,৫০,০০০+"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ইউনিয়ন সংখ্যা</label>
                  <input
                    type="number"
                    value={upazilaModal.data.unionCount || 0}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, unionCount: parseInt(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পোস্টকোড</label>
                  <input
                    type="text"
                    value={upazilaModal.data.postalCode || ''}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, postalCode: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পৌরসভা</label>
                  <input
                    type="text"
                    value={upazilaModal.data.pourashava || ''}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, pourashava: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ইউএনও হটলাইন</label>
                  <input
                    type="text"
                    value={upazilaModal.data.unoPhone || ''}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, unoPhone: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">থানা পুলিশ নম্বর</label>
                  <input
                    type="text"
                    value={upazilaModal.data.policePhone || ''}
                    onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, policePhone: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">সংক্ষিপ্ত পরিচিতি ও বৈশিষ্ট্য</label>
                <textarea
                  rows={2}
                  value={upazilaModal.data.desc || ''}
                  onChange={e => setUpazilaModal({ ...upazilaModal, data: { ...upazilaModal.data, desc: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUpazilaModal({ isOpen: false, mode: 'add', data: {} })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: INSPECT & MANAGE UNIONS MODAL */}
      {/* ======================================================== */}
      {inspectUpazilaUnions && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setInspectUpazilaUnions(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {inspectUpazilaUnions.name} — ইউনিয়ন ও গ্রাম নিয়ন্ত্রণ
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              মোট ইউনিয়ন: {inspectUpazilaUnions.unions.length}টি · গ্রাম সংখ্যা: {inspectUpazilaUnions.villageCount}টি
            </p>

            {/* Add Union Form */}
            <form onSubmit={handleAddUnionToUpazila} className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-5">
              <h4 className="font-bold text-emerald-950 text-xs mb-2">+ এই উপজেলায় নতুন ইউনিয়ন যুক্ত করুন</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  value={newUnionName}
                  onChange={e => setNewUnionName(e.target.value)}
                  placeholder="ইউনিয়নের নাম (বাংলায়) *"
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                />
                <input
                  type="text"
                  value={newUnionEnName}
                  onChange={e => setNewUnionEnName(e.target.value)}
                  placeholder="Union Name (English)"
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                />
                <input
                  type="text"
                  value={newUnionPostcode}
                  onChange={e => setNewUnionPostcode(e.target.value)}
                  placeholder="পোস্টকোড"
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
              <button
                type="submit"
                className="mt-2.5 px-4 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
              >
                যুক্ত করুন
              </button>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs max-h-[45vh] overflow-y-auto">
              {inspectUpazilaUnions.unions.map((un, idx) => (
                <div key={idx} className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-2">
                  <div>
                    <h5 className="font-bold text-slate-900">{un.name}</h5>
                    <p className="text-[11px] text-slate-500">পোস্টকোড: {un.postCode} · গ্রাম: {un.villageCount}টি</p>
                    <p className="text-[10px] text-slate-600 mt-1 line-clamp-1">গ্রাম: {un.villages.slice(0, 4).join(', ')}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUnion(un.id || un.name, un.name)}
                    className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                    title="ইউনিয়ন মুছে ফেলুন"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t flex justify-end">
              <button
                onClick={() => setInspectUpazilaUnions(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
              >
                সম্পন্ন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: ADD / EDIT HOSPITAL MODAL */}
      {/* ======================================================== */}
      {hospitalModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {hospitalModal.mode === 'add' ? 'নতুন হাসপাতাল যুক্ত করুন' : 'হাসপাতাল সম্পাদনা করুন'}
            </h3>

            <form onSubmit={handleSaveHospital} className="space-y-3 text-xs mt-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">হাসপাতালের নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  value={hospitalModal.data.name || ''}
                  onChange={e => setHospitalModal({ ...hospitalModal, data: { ...hospitalModal.data, name: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">হাসপাতালের নাম (ইংরেজিতে)</label>
                <input
                  type="text"
                  value={hospitalModal.data.enName || ''}
                  onChange={e => setHospitalModal({ ...hospitalModal, data: { ...hospitalModal.data, enName: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ধরন</label>
                  <select
                    value={hospitalModal.data.type || 'govt'}
                    onChange={e => {
                      const t = e.target.value as any;
                      const labelMap: Record<string, string> = {
                        govt: 'সরকারি হাসপাতাল',
                        private: 'বেসরকারি হাসপাতাল',
                        diagnostic: 'ডায়াগনস্টিক সেন্টার'
                      };
                      setHospitalModal({ ...hospitalModal, data: { ...hospitalModal.data, type: t, typeLabel: labelMap[t] } });
                    }}
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
                    value={hospitalModal.data.phone || ''}
                    onChange={e => setHospitalModal({ ...hospitalModal, data: { ...hospitalModal.data, phone: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ঠিকানা *</label>
                <input
                  type="text"
                  required
                  value={hospitalModal.data.address || ''}
                  onChange={e => setHospitalModal({ ...hospitalModal, data: { ...hospitalModal.data, address: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">জরুরি হটলাইন</label>
                <input
                  type="tel"
                  value={hospitalModal.data.emergency || ''}
                  onChange={e => setHospitalModal({ ...hospitalModal, data: { ...hospitalModal.data, emergency: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setHospitalModal({ isOpen: false, mode: 'add', data: {} })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: ADD / EDIT EMERGENCY MODAL */}
      {/* ======================================================== */}
      {emergencyModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {emergencyModal.mode === 'add' ? 'নতুন জরুরি হটলাইন যোগ করুন' : 'হটলাইন সম্পাদনা করুন'}
            </h3>

            <form onSubmit={handleSaveEmergency} className="space-y-3 text-xs mt-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">সেবার নাম / শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={emergencyModal.data.title || ''}
                  onChange={e => setEmergencyModal({ ...emergencyModal, data: { ...emergencyModal.data, title: e.target.value } })}
                  placeholder="উদা: বগুড়া জেলা ফায়ার সার্ভিস"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ফোন / হটলাইন নম্বর *</label>
                <input
                  type="text"
                  required
                  value={emergencyModal.data.number || ''}
                  onChange={e => setEmergencyModal({ ...emergencyModal, data: { ...emergencyModal.data, number: e.target.value } })}
                  placeholder="017XX-XXXXXX বা ৯৯৯"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEmergencyModal({ isOpen: false, mode: 'add', data: {} })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 6: ADD / EDIT COMMUNITY MODAL */}
      {/* ======================================================== */}
      {communityModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {communityModal.mode === 'add' ? 'নতুন কমিউনিটি এন্ট্রি যোগ করুন' : 'কমিউনিটি এন্ট্রি সম্পাদনা'}
            </h3>

            <form onSubmit={handleSaveCommunity} className="space-y-3 text-xs mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={communityModal.data.category || 'blood'}
                    onChange={e => setCommunityModal({ ...communityModal, data: { ...communityModal.data, category: e.target.value as any } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="blood">রক্তদাতা (Blood)</option>
                    <option value="tuition">টিউশন ও শিক্ষা</option>
                    <option value="rent">বাসা ও দোকান ভাড়া</option>
                    <option value="jobs">চাকরি ও পেশা</option>
                    <option value="business">স্থানীয় ব্যবসা ও দই</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">উপজেলা *</label>
                  <select
                    value={communityModal.data.upazila || 'বগুড়া সদর'}
                    onChange={e => setCommunityModal({ ...communityModal, data: { ...communityModal.data, upazila: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {upazilaList.filter(u => u !== 'ALL').map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">নাম বা শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={communityModal.data.name || ''}
                  onChange={e => setCommunityModal({ ...communityModal, data: { ...communityModal.data, name: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              {communityModal.data.category === 'blood' ? (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">রক্তের গ্রুপ</label>
                  <select
                    value={communityModal.data.group || 'O+'}
                    onChange={e => setCommunityModal({ ...communityModal, data: { ...communityModal.data, group: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-rose-700"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ব্যাজ / ট্যাগ</label>
                  <input
                    type="text"
                    value={communityModal.data.badge || ''}
                    onChange={e => setCommunityModal({ ...communityModal, data: { ...communityModal.data, badge: e.target.value } })}
                    placeholder="উদা: শিক্ষক উপলব্ধ / ফ্যামিলি বাসা"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={communityModal.data.phone || ''}
                  onChange={e => setCommunityModal({ ...communityModal, data: { ...communityModal.data, phone: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">বিস্তারিত বিবরণ *</label>
                <textarea
                  rows={3}
                  required
                  value={communityModal.data.detail || ''}
                  onChange={e => setCommunityModal({ ...communityModal, data: { ...communityModal.data, detail: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCommunityModal({ isOpen: false, mode: 'add', data: {} })}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 7: REJECT MODAL */}
      {/* ======================================================== */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">বাতিল নিশ্চিতকরণ</h3>
            <p className="text-xs text-slate-500 mb-4">&ldquo;{rejectTarget.title}&rdquo; বাতিল করা হচ্ছে।</p>

            <textarea
              rows={2}
              value={rejectReasonInput}
              onChange={e => setRejectReasonInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-700 text-white text-xs font-bold"
              >
                নিশ্চিত বাতিল
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 8: INSPECT SPOT DETAILS */}
      {/* ======================================================== */}
      {inspectSpot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setInspectSpot(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">{inspectSpot.upazila}</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-1">{inspectSpot.title}</h3>
            <img src={inspectSpot.coverImage} alt={inspectSpot.title} className="w-full aspect-video rounded-2xl object-cover my-3" />
            <p className="text-xs text-slate-700 leading-relaxed">{inspectSpot.shortDesc}</p>
            {inspectSpot.history && <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl">{inspectSpot.history}</p>}
            <div className="mt-4 pt-3 border-t flex justify-end gap-2">
              <button onClick={() => setInspectSpot(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
