'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/lib/context/ToastContext';
import { useAdmin } from '@/lib/context/AdminContext';
import { DetailedUpazilaData, UnionData } from '@/lib/data/unions-villages-data';
import { SiteContent } from '@/lib/services/district.service';
import { EducationalInstitute } from '@/lib/types/education';
import AdminPagination, { toBnNumber } from '@/components/AdminPagination';
import AdminSkeletonLoader from '@/components/admin/AdminSkeletonLoader';

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
  const {
    currentNav,
    setCurrentNav,
    systemDiag,
    setSystemDiag,
    isLoading,
    setIsLoading,
    refreshKey,
    setBadgeCounts,
    isAuthenticated,
  } = useAdmin();

  // Dynamic Data Lists
  const [spots, setSpots] = useState<SpotItem[]>([]);
  const [community, setCommunity] = useState<CommunityItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [hospitals, setHospitals] = useState<HospitalItem[]>([]);
  const [emergencyList, setEmergencyList] = useState<EmergencyItem[]>([]);
  const [detailedUpazilas, setDetailedUpazilas] = useState<DetailedUpazilaData[]>([]);
  const [institutes, setInstitutes] = useState<EducationalInstitute[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  // Moderation Filter States
  const [activeStatusTab, setActiveStatusTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedType, setSelectedType] = useState<'all' | 'spot' | 'community' | 'review'>('all');
  const [selectedUpazila, setSelectedUpazila] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Spots Register Pagination & Filters
  const [spotsPage, setSpotsPage] = useState(1);
  const [spotsPageSize, setSpotsPageSize] = useState(10);
  const [spotsSearch, setSpotsSearch] = useState('');
  const [spotsCategoryFilter, setSpotsCategoryFilter] = useState('ALL');
  const [spotsUpazilaFilter, setSpotsUpazilaFilter] = useState('ALL');

  // 2. Hospitals Register Pagination & Filters
  const [hospitalsPage, setHospitalsPage] = useState(1);
  const [hospitalsPageSize, setHospitalsPageSize] = useState(10);
  const [hospitalsSearch, setHospitalsSearch] = useState('');
  const [hospitalsTypeFilter, setHospitalsTypeFilter] = useState('ALL');
  const [hospitalsUpazilaFilter, setHospitalsUpazilaFilter] = useState('ALL');

  // 3. Emergency Hotlines Register Pagination & Filters
  const [emergencyPage, setEmergencyPage] = useState(1);
  const [emergencyPageSize, setEmergencyPageSize] = useState(12);
  const [emergencySearch, setEmergencySearch] = useState('');
  const [emergencyViewMode, setEmergencyViewMode] = useState<'table' | 'grid'>('table');

  // 4. Community Register Pagination & Filters
  const [communityPage, setCommunityPage] = useState(1);
  const [communityPageSize, setCommunityPageSize] = useState(10);
  const [communitySearch, setCommunitySearch] = useState('');
  const [communityCategoryFilter, setCommunityCategoryFilter] = useState('ALL');
  const [communityUpazilaFilter, setCommunityUpazilaFilter] = useState('ALL');
  const [communityStatusFilter, setCommunityStatusFilter] = useState('ALL');
  const [communityViewMode, setCommunityViewMode] = useState<'table' | 'grid'>('table');

  // 5. Upazilas Register Pagination & Filters
  const [upazilasPage, setUpazilasPage] = useState(1);
  const [upazilasPageSize, setUpazilasPageSize] = useState(10);
  const [upazilasSearch, setUpazilasSearch] = useState('');

  // 6. Moderation Queue Pagination & Filters
  const [moderationPage, setModerationPage] = useState(1);
  const [moderationPageSize, setModerationPageSize] = useState(10);

  // 7. Educational Institutes Pagination & Filters
  const [educationPage, setEducationPage] = useState(1);
  const [educationPageSize, setEducationPageSize] = useState(10);
  const [educationSearch, setEducationSearch] = useState('');
  const [educationCategoryFilter, setEducationCategoryFilter] = useState('ALL');
  const [educationUpazilaFilter, setEducationUpazilaFilter] = useState('ALL');

  // 8. Audit Logs Pagination & Filters
  const [auditPage, setAuditPage] = useState(1);
  const [auditPageSize, setAuditPageSize] = useState(10);
  const [auditSearch, setAuditSearch] = useState('');

  // Modals for CRUD operations
  // Spot Form Modal (Add / Edit)
  const [spotModal, setSpotModal] = useState<{ isOpen: boolean; mode: 'add' | 'edit'; data: Partial<SpotItem> }>({
    isOpen: false,
    mode: 'add',
    data: {}
  });
  const [newSpotImageUrl, setNewSpotImageUrl] = useState('');

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

  // Education Form Modal (Add / Edit)
  const [educationModal, setEducationModal] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    data: Partial<EducationalInstitute>;
  }>({
    isOpen: false,
    mode: 'add',
    data: { category: 'college', upazila: 'বগুড়া সদর', management: 'সরকারি' }
  });
  const [inspectInstitute, setInspectInstitute] = useState<EducationalInstitute | null>(null);

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

  // Module-by-module / Page-by-page On-Demand Loading State
  const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({});
  const [tabLoading, setTabLoading] = useState<boolean>(false);

  // 1. Fetch Lightweight System Telemetry & Entity Counts (Only 1 fast query)
  const fetchSystemTelemetry = async () => {
    setIsLoading(true);
    const ts = Date.now();
    try {
      const sysRes = await fetch(`/api/admin/system?_t=${ts}`);
      const sysJson = await sysRes.json();
      if (sysJson.success && sysJson.data) {
        setSystemDiag(sysJson.data);
        const counts = sysJson.data.entityCounts || {};
        setBadgeCounts({
          pendingTotal: counts.pendingTotal || 0,
          spots: counts.exploreSpots || 0,
          education: counts.institutes || 0,
          hospitals: counts.hospitals || 0,
          emergency: counts.emergencyContacts || 0,
          community: counts.communityPosts || 0,
          upazilas: counts.upazilas || 12,
          reviews: counts.reviews || 0,
        });
      }
    } catch (err) {
      console.warn('System telemetry fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. On-Demand Module / Page-by-Page Data Loader
  const loadTabData = async (tab: string, force: boolean = false) => {
    // If already loaded and not forced to refresh, skip network call!
    if (!force && loadedTabs[tab]) {
      return;
    }

    setTabLoading(true);
    const ts = Date.now();

    try {
      switch (tab) {
        case 'overview':
          await fetchSystemTelemetry();
          break;

        case 'spots': {
          const res = await fetch(`/api/admin/spots?_t=${ts}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setSpots(json.data);
            setBadgeCounts(prev => ({ ...prev, spots: json.data.length }));
          }
          break;
        }

        case 'education': {
          const res = await fetch(`/api/admin/education?_t=${ts}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setInstitutes(json.data);
            setBadgeCounts(prev => ({ ...prev, education: json.data.length }));
          }
          break;
        }

        case 'hospitals': {
          const res = await fetch(`/api/admin/hospitals?_t=${ts}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setHospitals(json.data);
            setBadgeCounts(prev => ({ ...prev, hospitals: json.data.length }));
          }
          break;
        }

        case 'emergency': {
          const res = await fetch(`/api/admin/emergency?_t=${ts}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setEmergencyList(json.data);
            setBadgeCounts(prev => ({ ...prev, emergency: json.data.length }));
          }
          break;
        }

        case 'community': {
          const res = await fetch(`/api/admin/community?_t=${ts}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setCommunity(json.data);
            setBadgeCounts(prev => ({ ...prev, community: json.data.length }));
          }
          break;
        }

        case 'upazilas': {
          const res = await fetch(`/api/admin/upazilas?_t=${ts}`);
          const json = await res.json();
          if (json.success && json.data) {
            const list = json.data.detailed || [];
            setDetailedUpazilas(list);
            setBadgeCounts(prev => ({ ...prev, upazilas: list.length }));
          }
          break;
        }

        case 'moderation': {
          const res = await fetch(`/api/admin/submissions?status=all&_t=${ts}`);
          const json = await res.json();
          if (json.success && json.data) {
            const loadedSpots = json.data.spots || [];
            const loadedComm = json.data.community || [];
            const loadedRev = json.data.reviews || [];
            setSpots(loadedSpots);
            setCommunity(loadedComm);
            setReviews(loadedRev);
            const pendingCnt =
              loadedSpots.filter((s: SpotItem) => s.status === 'pending' || !s.isApproved).length +
              loadedComm.filter((c: CommunityItem) => c.status === 'pending' || !c.isApproved).length +
              loadedRev.filter((r: ReviewItem) => r.status === 'pending' || !r.isApproved).length;
            setBadgeCounts(prev => ({ ...prev, pendingTotal: pendingCnt }));
          }
          break;
        }

        case 'cms': {
          const res = await fetch(`/api/admin/content?_t=${ts}`);
          const json = await res.json();
          if (json.success && json.data) {
            setSiteContent(json.data);
          }
          break;
        }

        case 'settings': {
          await fetchSystemTelemetry();
          break;
        }
      }

      setLoadedTabs(prev => ({ ...prev, [tab]: true }));
    } catch (err) {
      console.warn(`Error loading tab data [${tab}]:`, err);
    } finally {
      setTabLoading(false);
    }
  };

  // 3. Fallback / Universal refresh for actions
  const fetchAllData = async () => {
    await fetchSystemTelemetry();
    await loadTabData(currentNav, true);
  };

  // 4. Initial telemetry load on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchSystemTelemetry();
    }
  }, [isAuthenticated]);

  // 5. On-Demand Tab Load when user navigates or triggers refresh
  useEffect(() => {
    if (isAuthenticated) {
      loadTabData(currentNav, refreshKey > 0);
    }
  }, [currentNav, isAuthenticated, refreshKey]);

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

    // Normalize and clean multiple image gallery
    let finalGallery: string[] = Array.isArray(data.gallery)
      ? data.gallery.map(g => (typeof g === 'string' ? g.trim() : '')).filter(Boolean)
      : [];

    const cover = (data.coverImage || (finalGallery.length > 0 ? finalGallery[0] : '')).trim();
    if (cover && !finalGallery.includes(cover)) {
      finalGallery.unshift(cover);
    }
    const finalCover = cover || (finalGallery.length > 0 ? finalGallery[0] : '');

    const payload = {
      ...data,
      coverImage: finalCover,
      gallery: finalGallery
    };

    try {
      const method = spotModal.mode === 'add' ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/spots', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(spotModal.mode === 'add' ? 'নতুন স্থান তৈরি ও লাইভ হয়েছে!' : 'স্থানের তথ্য সফলভাবে আপডেট হয়েছে!');
        setSpotModal({ isOpen: false, mode: 'add', data: {} });
        setNewSpotImageUrl('');
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
  // EDUCATIONAL INSTITUTES CRUD HANDLERS
  // ==========================================
  const handleSaveInstitute = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = educationModal.data;
    if (!data.name || !data.upazila) {
      showToast('প্রতিষ্ঠানের নাম ও উপজেলা আবশ্যক', 'error');
      return;
    }

    try {
      if (educationModal.mode === 'add') {
        const res = await fetch('/api/admin/education', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.success) {
          showToast('নতুন প্রতিষ্ঠান সফলভাবে যোগ করা হয়েছে!');
          setEducationModal({ isOpen: false, mode: 'add', data: {} });
          fetchAllData();
        } else {
          showToast(json.error || 'সংরক্ষণ ব্যর্থ', 'error');
        }
      } else {
        const res = await fetch('/api/admin/education', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: data.id, updates: data })
        });
        const json = await res.json();
        if (json.success) {
          showToast('প্রতিষ্ঠানের তথ্য সফলভাবে আপডেট হয়েছে!');
          setEducationModal({ isOpen: false, mode: 'edit', data: {} });
          fetchAllData();
        } else {
          showToast(json.error || 'আপডেট ব্যর্থ', 'error');
        }
      }
    } catch (err) {
      showToast('সার্ভার যোগাযোগে সমস্যা', 'error');
    }
  };

  const handleDeleteInstitute = async (id: string, name: string) => {
    if (!confirm(`আপনি কি "${name}" প্রতিষ্ঠানটি মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`/api/admin/education?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        showToast(`"${name}" সফলভাবে মুছে ফেলা হয়েছে!`);
        fetchAllData();
      } else {
        showToast(json.error || 'মুছে ফেলতে ব্যর্থ', 'error');
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

  const handleDeleteReview = async (id: string) => {
    if (!confirm('আপনি কি এই রিভিউটি মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch('/api/admin/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'review', id, reason: 'প্রশাসনিকভাবে অপসারিত' })
      });
      const json = await res.json();
      if (json.success) {
        showToast('রিভিউ মুছে ফেলা হয়েছে');
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
  // MODULE DATA FILTERS & PAGINATION
  // ==========================================

  // 1. Spots Filter & Pagination
  const filteredSpots = spots.filter(s => {
    const q = spotsSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      (s.enTitle && s.enTitle.toLowerCase().includes(q)) ||
      s.location.toLowerCase().includes(q) ||
      s.upazila.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q);
    const matchCat = spotsCategoryFilter === 'ALL' || s.category === spotsCategoryFilter;
    const matchUpazila = spotsUpazilaFilter === 'ALL' || s.upazila === spotsUpazilaFilter;
    return matchSearch && matchCat && matchUpazila;
  });
  const paginatedSpots = filteredSpots.slice((spotsPage - 1) * spotsPageSize, spotsPage * spotsPageSize);

  // 2. Hospitals Filter & Pagination
  const filteredHospitals = hospitals.filter(h => {
    const q = hospitalsSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      h.name.toLowerCase().includes(q) ||
      (h.enName && h.enName.toLowerCase().includes(q)) ||
      h.address.toLowerCase().includes(q) ||
      h.phone.toLowerCase().includes(q) ||
      (h.emergency && h.emergency.toLowerCase().includes(q));
    const matchType = hospitalsTypeFilter === 'ALL' || h.type === hospitalsTypeFilter;
    const matchUpazila = hospitalsUpazilaFilter === 'ALL' || h.address.includes(hospitalsUpazilaFilter);
    return matchSearch && matchType && matchUpazila;
  });
  const paginatedHospitals = filteredHospitals.slice((hospitalsPage - 1) * hospitalsPageSize, hospitalsPage * hospitalsPageSize);

  // 3. Emergency Filter & Pagination
  const filteredEmergency = emergencyList.filter(emg => {
    const q = emergencySearch.trim().toLowerCase();
    return !q || emg.title.toLowerCase().includes(q) || emg.number.toLowerCase().includes(q);
  });
  const paginatedEmergency = filteredEmergency.slice((emergencyPage - 1) * emergencyPageSize, emergencyPage * emergencyPageSize);

  // 4. Community Filter & Pagination
  const filteredCommunity = community.filter(c => {
    const q = communitySearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.detail.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.group && c.group.toLowerCase().includes(q)) ||
      c.upazila.toLowerCase().includes(q);
    const matchCat = communityCategoryFilter === 'ALL' || c.category === communityCategoryFilter;
    const matchUpazila = communityUpazilaFilter === 'ALL' || c.upazila === communityUpazilaFilter;
    const matchStatus =
      communityStatusFilter === 'ALL'
        ? true
        : communityStatusFilter === 'approved'
        ? c.isApproved || c.status === 'approved'
        : !c.isApproved || c.status === 'pending';
    return matchSearch && matchCat && matchUpazila && matchStatus;
  });
  const paginatedCommunity = filteredCommunity.slice((communityPage - 1) * communityPageSize, communityPage * communityPageSize);

  // 5. Upazilas Filter & Pagination
  const filteredUpazilas = detailedUpazilas.filter(u => {
    const q = upazilasSearch.trim().toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.enName.toLowerCase().includes(q) || u.postalCode.includes(q);
  });
  const paginatedUpazilas = filteredUpazilas.slice((upazilasPage - 1) * upazilasPageSize, upazilasPage * upazilasPageSize);

  // 6. Moderation Filter & Pagination
  interface ModerationRow {
    itemType: 'spot' | 'community' | 'review';
    id: string;
    title: string;
    subtitle: string;
    details: string;
    upazila?: string;
    image?: string;
    gallery?: string[];
    badge?: string;
    phone?: string;
    contributorName?: string;
    status: 'pending' | 'approved' | 'rejected';
    isApproved?: boolean;
    raw: any;
  }

  const allModerationItems: ModerationRow[] = [
    ...spots.map(s => ({
      itemType: 'spot' as const,
      id: s.id,
      title: s.title,
      subtitle: `${s.upazila} · ${s.categoryBn}`,
      details: s.shortDesc,
      upazila: s.upazila,
      image: s.coverImage,
      gallery: s.gallery,
      phone: s.contributor?.phone,
      contributorName: s.contributor?.name,
      status: (s.status || (s.isApproved ? 'approved' : 'pending')) as 'pending' | 'approved' | 'rejected',
      isApproved: s.isApproved,
      raw: s
    })),
    ...community.map(c => ({
      itemType: 'community' as const,
      id: c.id,
      title: c.name,
      subtitle: `${c.upazila} · ${c.category === 'blood' ? `রক্তদান (${c.group || 'O+'})` : c.category}`,
      details: c.detail,
      upazila: c.upazila,
      image: undefined,
      gallery: undefined,
      badge: c.group || c.badge,
      phone: c.phone,
      contributorName: c.contributorName || c.name,
      status: (c.status || (c.isApproved ? 'approved' : 'pending')) as 'pending' | 'approved' | 'rejected',
      isApproved: c.isApproved,
      raw: c
    })),
    ...reviews.map(r => ({
      itemType: 'review' as const,
      id: r.id,
      title: `${r.author} (রেটিং: ${r.rating}★)`,
      subtitle: r.spotTitle || 'দর্শনীয় স্থান রিভিউ',
      details: r.comment,
      upazila: undefined,
      image: undefined,
      gallery: undefined,
      badge: undefined,
      phone: undefined,
      contributorName: undefined,
      status: (r.status || (r.isApproved ? 'approved' : 'pending')) as 'pending' | 'approved' | 'rejected',
      isApproved: r.isApproved ?? true,
      raw: r
    }))
  ];

  const filteredModerationItems = allModerationItems.filter(item => {
    const matchStatus =
      activeStatusTab === 'pending'
        ? item.status === 'pending' || !item.isApproved
        : activeStatusTab === 'approved'
        ? item.status === 'approved' || (item.isApproved && item.status !== 'rejected')
        : item.status === 'rejected';

    const matchType = selectedType === 'all' || item.itemType === selectedType;
    const matchUpazila = selectedUpazila === 'ALL' || (item.upazila !== undefined && item.upazila === selectedUpazila);
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q);

    return matchStatus && matchType && matchUpazila && matchSearch;
  });

  const paginatedModerationItems = filteredModerationItems.slice(
    (moderationPage - 1) * moderationPageSize,
    moderationPage * moderationPageSize
  );

  // 7. Educational Institutes Filter & Pagination
  const filteredInstitutes = institutes.filter(inst => {
    const q = educationSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      inst.name.toLowerCase().includes(q) ||
      inst.enName.toLowerCase().includes(q) ||
      (inst.eiin && inst.eiin.includes(q)) ||
      inst.location.toLowerCase().includes(q) ||
      inst.upazila.toLowerCase().includes(q);
    const matchCat = educationCategoryFilter === 'ALL' || inst.category === educationCategoryFilter;
    const matchUpazila = educationUpazilaFilter === 'ALL' || inst.upazila === educationUpazilaFilter;
    return matchSearch && matchCat && matchUpazila;
  });
  const paginatedInstitutes = filteredInstitutes.slice(
    (educationPage - 1) * educationPageSize,
    educationPage * educationPageSize
  );

  // 8. Audit Logs Filter & Pagination
  const auditLogsList = systemDiag?.auditLogs || [];
  const filteredAuditLogs = auditLogsList.filter(log => {
    const q = auditSearch.trim().toLowerCase();
    return (
      !q ||
      log.action.toLowerCase().includes(q) ||
      log.target.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q)
    );
  });
  const paginatedAuditLogs = filteredAuditLogs.slice((auditPage - 1) * auditPageSize, auditPage * auditPageSize);

  // ==========================================
  // AUTHENTICATED SYSTEM ADMIN DASHBOARD (CMS)
  // ==========================================
  return (
    <div className="space-y-8">
        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {/* ======================================================== */}
        {currentNav === 'overview' && (
          tabLoading && !systemDiag ? (
            <AdminSkeletonLoader variant="dashboard" />
          ) : (
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-emerald-800"></i>
                  <h3 className="font-bold text-slate-900 text-sm">
                    প্রশাসনিক অডিট ও সিস্টেম ইভেন্ট লগ (Audit Activity Stream)
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={auditSearch}
                      onChange={e => {
                        setAuditSearch(e.target.value);
                        setAuditPage(1);
                      }}
                      placeholder="অডিট লগ ফিল্টার করুন..."
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-48 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    মোট: {toBnNumber(filteredAuditLogs.length)}টি
                  </span>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {paginatedAuditLogs.length > 0 ? (
                  paginatedAuditLogs.map(log => (
                    <div key={log.id} className="py-2.5 flex items-start justify-between gap-4 text-xs hover:bg-slate-50/60 px-2 rounded-xl transition">
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
                  ))
                ) : (
                  <div className="py-8 text-center text-slate-400">
                    <span>কোনো অডিট লগ পাওয়া যায়নি</span>
                  </div>
                )}
              </div>

              {/* Audit Logs Pagination */}
              <AdminPagination
                currentPage={auditPage}
                totalItems={filteredAuditLogs.length}
                pageSize={auditPageSize}
                onPageChange={setAuditPage}
                onPageSizeChange={setAuditPageSize}
              />
            </div>
          </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB 2: MODERATION & QUEUE */}
        {/* ======================================================== */}
        {currentNav === 'moderation' && (
          tabLoading && !loadedTabs['moderation'] ? (
            <AdminSkeletonLoader variant="moderation" />
          ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveStatusTab('pending');
                      setModerationPage(1);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeStatusTab === 'pending' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <i className="fa-solid fa-hourglass-half text-amber-900"></i>
                    <span>অপেক্ষমাণ কিউ</span>
                    <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs font-mono">{pendingTotalCount}</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveStatusTab('approved');
                      setModerationPage(1);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeStatusTab === 'approved' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <i className="fa-solid fa-check-double text-emerald-300"></i>
                    <span>অনুমোদিত ও লাইভ</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveStatusTab('rejected');
                      setModerationPage(1);
                    }}
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
                    onClick={() => {
                      setSelectedType('all');
                      setModerationPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                      selectedType === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    সকল বিভাগ
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('spot');
                      setModerationPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
                      selectedType === 'spot' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <i className="fa-solid fa-landmark text-amber-500"></i>
                    <span>দর্শনীয় স্থান ({spots.filter(s => activeStatusTab === 'pending' ? (!s.isApproved || s.status === 'pending') : (s.isApproved && s.status !== 'rejected')).length})</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('community');
                      setModerationPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-1.5 ${
                      selectedType === 'community' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <i className="fa-solid fa-users text-rose-500"></i>
                    <span>কমিউনিটি ও রক্তদাতা</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('review');
                      setModerationPage(1);
                    }}
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
                    onChange={e => {
                      setSelectedUpazila(e.target.value);
                      setModerationPage(1);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    {upazilaList.map(u => (
                      <option key={u} value={u}>{u === 'ALL' ? 'সকল উপজেলা' : u}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setModerationPage(1);
                    }}
                    placeholder="নাম বা বিবরণ খুঁজুন..."
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs w-44 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                  />
                  {(searchQuery || selectedType !== 'all' || selectedUpazila !== 'ALL') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedType('all');
                        setSelectedUpazila('ALL');
                        setModerationPage(1);
                      }}
                      className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                    >
                      ফিল্টার মুছুন
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Moderation Paginated Table */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {activeStatusTab === 'pending' ? 'অপেক্ষমাণ অনুমোদন তালিকা' : activeStatusTab === 'approved' ? 'অনুমোদিত ও লাইভ তালিকা' : 'বাতিলকৃত সাবমিশন তালিকা'}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                    {filteredModerationItems.length}টি এন্ট্রি
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">মিডিয়া / প্রতীক</th>
                      <th className="py-3 px-3">শিরোনাম ও সংক্ষিপ্ত তথ্য</th>
                      <th className="py-3 px-3">বিভাগ</th>
                      <th className="py-3 px-3">উপজেলা</th>
                      <th className="py-3 px-3">অবদানকারী ও যোগাযোগ</th>
                      <th className="py-3 px-3">অবস্থা</th>
                      <th className="py-3 px-3 text-right">অনুমোদন ও একশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedModerationItems.length > 0 ? (
                      paginatedModerationItems.map(item => (
                        <tr key={`${item.itemType}-${item.id}`} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                onClick={() => item.itemType === 'spot' && setInspectSpot(item.raw)}
                                className="w-12 h-10 rounded-lg object-cover border border-slate-200 cursor-pointer hover:opacity-80"
                                title="প্রিভিউ দেখুন"
                              />
                            ) : item.badge ? (
                              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 font-black text-xs border border-rose-200 flex items-center justify-center shrink-0">
                                {item.badge}
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                                <i className={item.itemType === 'review' ? 'fa-solid fa-star text-yellow-500' : 'fa-solid fa-file-lines text-slate-400'}></i>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 max-w-xs">
                            <span className="font-bold text-slate-900 block text-xs truncate" title={item.title}>
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-500 block truncate" title={item.subtitle}>
                              {item.subtitle}
                            </span>
                            <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5" title={item.details}>
                              {item.details}
                            </p>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                              item.itemType === 'spot'
                                ? 'bg-amber-100 text-amber-800'
                                : item.itemType === 'community'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {item.itemType === 'spot' ? 'দর্শনীয় স্থান' : item.itemType === 'community' ? 'কমিউনিটি' : 'রিভিউ'}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-medium text-slate-700">
                            {item.upazila ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px] border border-emerald-100">
                                {item.upazila}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">-</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {item.contributorName ? (
                              <div className="text-[11px]">
                                <span className="font-semibold text-slate-800 block">{item.contributorName}</span>
                                {item.phone && <span className="font-mono text-slate-500">{item.phone}</span>}
                              </div>
                            ) : item.phone ? (
                              <span className="font-mono text-[11px] text-slate-700">{item.phone}</span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">সাধারণ ভিজিটর</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                              item.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800 animate-pulse'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                item.status === 'approved' ? 'bg-emerald-600' : item.status === 'rejected' ? 'bg-rose-600' : 'bg-amber-600'
                              }`}></span>
                              {item.status === 'approved' ? 'অনুমোদিত' : item.status === 'rejected' ? 'বাতিলকৃত' : 'অপেক্ষমাণ'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {item.itemType === 'spot' && (
                                <button
                                  onClick={() => setInspectSpot(item.raw)}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                                  title="বিস্তারিত প্রিভিউ দেখুন"
                                >
                                  <i className="fa-regular fa-eye mr-1"></i>প্রিভিউ
                                </button>
                              )}

                              {item.status !== 'approved' && (
                                <button
                                  onClick={() => handleApprove(item.itemType, item.id, item.title)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition shadow-sm flex items-center gap-1"
                                  title="অনুমোদন করুন ও লাইভ প্রকাশ করুন"
                                >
                                  <i className="fa-solid fa-check"></i>
                                  <span>অনুমোদন</span>
                                </button>
                              )}

                              {item.status !== 'rejected' && (
                                <button
                                  onClick={() => setRejectTarget({ type: item.itemType, id: item.id, title: item.title })}
                                  className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs border border-rose-200 cursor-pointer transition"
                                  title="বাতিল করুন"
                                >
                                  <i className="fa-solid fa-xmark"></i>
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  if (item.itemType === 'spot') handleDeleteSpot(item.id, item.title);
                                  else if (item.itemType === 'community') handleDeleteCommunity(item.id, item.title);
                                  else handleDeleteReview(item.id);
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition"
                                title="মুছে ফেলুন"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <i className="fa-solid fa-clipboard-check text-3xl mb-2 text-slate-300 block"></i>
                          <span className="font-medium text-xs">কোনো সাবমিশন আইটেম পাওয়া যায়নি</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Moderation Pagination */}
              <div className="pt-4 border-t border-slate-100">
                <AdminPagination
                  currentPage={moderationPage}
                  totalItems={filteredModerationItems.length}
                  pageSize={moderationPageSize}
                  onPageChange={setModerationPage}
                  onPageSizeChange={setModerationPageSize}
                />
              </div>
            </div>
          </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB 3: SPOTS CRUD (দর্শনীয় স্থান ও ঐতিহ্য CMS) */}
        {/* ======================================================== */}
        {currentNav === 'spots' && (
          tabLoading && !loadedTabs['spots'] ? (
            <AdminSkeletonLoader variant="table" rows={6} />
          ) : (
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
                  onClick={() => {
                    setNewSpotImageUrl('');
                    setSpotModal({
                      isOpen: true,
                      mode: 'add',
                      data: {
                        category: 'archaeological',
                        categoryBn: 'প্রত্নতাত্ত্বিক নিদর্শন',
                        upazila: 'শিবগঞ্জ',
                        timings: 'সকাল ৯টা – বিকেল ৫টা',
                        entryFee: 'বিনামূল্যে',
                        coverImage: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
                        gallery: [
                          'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'
                        ]
                      }
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>+ নতুন স্থান যোগ করুন</span>
                </button>
              </div>

              {/* Register Search & Filters Bar */}
              <div className="pt-4 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={spotsSearch}
                      onChange={e => {
                        setSpotsSearch(e.target.value);
                        setSpotsPage(1);
                      }}
                      placeholder="স্থানের নাম বা উপজেলা খুঁজুন..."
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-56 sm:w-64 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={spotsCategoryFilter}
                    onChange={e => {
                      setSpotsCategoryFilter(e.target.value);
                      setSpotsPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    <option value="ALL">সকল ক্যাটাগরি</option>
                    <option value="archaeological">প্রত্নতাত্ত্বিক নিদর্শন</option>
                    <option value="nature">প্রাকৃতিক সৌন্দর্য</option>
                    <option value="heritage">ঐতিহাসিক স্থাপত্য</option>
                    <option value="religious">ধর্মীয় স্থান</option>
                  </select>

                  {/* Upazila Filter */}
                  <select
                    value={spotsUpazilaFilter}
                    onChange={e => {
                      setSpotsUpazilaFilter(e.target.value);
                      setSpotsPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    {upazilaList.map(u => (
                      <option key={u} value={u}>{u === 'ALL' ? 'সকল উপজেলা' : u}</option>
                    ))}
                  </select>

                  {(spotsSearch || spotsCategoryFilter !== 'ALL' || spotsUpazilaFilter !== 'ALL') && (
                    <button
                      onClick={() => {
                        setSpotsSearch('');
                        setSpotsCategoryFilter('ALL');
                        setSpotsUpazilaFilter('ALL');
                        setSpotsPage(1);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                    >
                      ফিল্টার মুছুন
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                    রেজিস্ট্রিকৃত মোট: {toBnNumber(filteredSpots.length)}টি স্থান
                  </span>
                </div>
              </div>

              {/* Spots Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">ছবি ও অ্যালবাম</th>
                      <th className="py-3 px-3">নাম ও অবস্থান</th>
                      <th className="py-3 px-3">উপজেলা</th>
                      <th className="py-3 px-3">ধরন</th>
                      <th className="py-3 px-3">সময়সূচি ও ফি</th>
                      <th className="py-3 px-3">অবস্থা</th>
                      <th className="py-3 px-3 text-right">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedSpots.length > 0 ? (
                      paginatedSpots.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3">
                            <div
                              onClick={() => setInspectSpot(s)}
                              className="relative group w-14 h-11 cursor-pointer"
                              title="অ্যালবাম প্রিভিউ দেখুন"
                            >
                              <img src={s.coverImage} alt={s.title} className="w-14 h-11 rounded-lg object-cover border border-slate-200 group-hover:opacity-90" />
                              {Array.isArray(s.gallery) && s.gallery.length > 1 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-emerald-800 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow flex items-center gap-0.5">
                                  <i className="fa-regular fa-images text-[8px]"></i>
                                  {toBnNumber(s.gallery.length)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-slate-900 block text-xs">{s.title}</span>
                            <span className="text-[11px] text-slate-500">{s.location}</span>
                          </td>
                          <td className="py-3 px-3 font-semibold text-emerald-800">{s.upazila}</td>
                          <td className="py-3 px-3 text-slate-600">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                              {s.categoryBn}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600">{s.timings} · {s.entryFee}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              s.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {s.isApproved ? 'লাইভ' : 'অপেক্ষমাণ'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setInspectSpot(s)}
                                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                                title="বিস্তারিত দেখুন"
                              >
                                <i className="fa-regular fa-eye"></i>
                              </button>
                              <button
                                onClick={() => {
                                  setNewSpotImageUrl('');
                                  const currentGallery = Array.isArray(s.gallery) && s.gallery.length > 0
                                    ? [...s.gallery]
                                    : (s.coverImage ? [s.coverImage] : []);
                                  setSpotModal({
                                    isOpen: true,
                                    mode: 'edit',
                                    data: {
                                      ...s,
                                      gallery: currentGallery
                                    }
                                  });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 cursor-pointer flex items-center gap-1"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                                <span>সম্পাদনা</span>
                              </button>
                              <button
                                onClick={() => handleDeleteSpot(s.id, s.title)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                                title="মুছে ফেলুন"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          <i className="fa-solid fa-circle-exclamation text-2xl mb-2 text-slate-300 block"></i>
                          <span>কোনো দর্শনীয় স্থান পাওয়া যায়নি</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Spots Pagination */}
              <AdminPagination
                currentPage={spotsPage}
                totalItems={filteredSpots.length}
                pageSize={spotsPageSize}
                onPageChange={setSpotsPage}
                onPageSizeChange={setSpotsPageSize}
              />
            </div>
          </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB: EDUCATIONAL INSTITUTES & COLLEGES REGISTER */}
        {/* ======================================================== */}
        {currentNav === 'education' && (
          tabLoading && !loadedTabs['education'] ? (
            <AdminSkeletonLoader variant="table" rows={6} />
          ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    বগুড়ার শিক্ষাপ্রতিষ্ঠান ও কলেজ রেজিস্টার (Education CMS)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    সোহোপ্যাথি শীর্ষ ৫০ কলেজ, বিশ্ববিদ্যালয়, মেডিকেল ও উচ্চ মাধ্যমিক প্রতিষ্ঠানের তথ্য, EIIN, ফলাফল ও প্রোফাইল ব্যবস্থাপনা
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEducationModal({
                      isOpen: true,
                      mode: 'add',
                      data: {
                        category: 'college',
                        categoryBn: 'কলেজ',
                        upazila: 'বগুড়া সদর',
                        management: 'সরকারি',
                        educationLevel: 'উচ্চ মাধ্যমিক ও স্নাতক',
                        board: 'রাজশাহী শিক্ষা বোর্ড',
                        coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
                        facilities: ['লাইব্রেরি', 'বিজ্ঞান ল্যাবরেটরি', 'খেলার মাঠ'],
                        courses: ['বিজ্ঞান', 'মানবিক', 'ব্যবসায় শিক্ষা'],
                        stats: { passRate: '৯৮%' }
                      }
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>+ নতুন প্রতিষ্ঠান যোগ করুন</span>
                </button>
              </div>

              {/* Register Search & Filters Bar */}
              <div className="pt-4 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={educationSearch}
                      onChange={e => {
                        setEducationSearch(e.target.value);
                        setEducationPage(1);
                      }}
                      placeholder="প্রতিষ্ঠানের নাম বা EIIN খুঁজুন..."
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-56 sm:w-64 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={educationCategoryFilter}
                    onChange={e => {
                      setEducationCategoryFilter(e.target.value);
                      setEducationPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    <option value="ALL">সকল ক্যাটাগরি</option>
                    <option value="school">মাধ্যমিক ও উচ্চ বিদ্যালয়</option>
                    <option value="madrasah">মাদ্রাসা শিক্ষা</option>
                    <option value="technical">কারিগরি ও ভোকেশনাল</option>
                    <option value="college">কলেজ ও বিশ্ববিদ্যালয় কলেজ</option>
                    <option value="school-college">স্কুল অ্যান্ড কলেজ</option>
                    <option value="kindergarten">কিন্ডারগার্টেন ও কেজি</option>
                    <option value="university">বিশ্ববিদ্যালয়</option>
                    <option value="medical">মেডিকেল কলেজ</option>
                    <option value="polytechnic">পলিটেকনিক ও কারিগরি</option>
                  </select>

                  {/* Upazila Filter */}
                  <select
                    value={educationUpazilaFilter}
                    onChange={e => {
                      setEducationUpazilaFilter(e.target.value);
                      setEducationPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    {upazilaList.map(u => (
                      <option key={u} value={u}>{u === 'ALL' ? 'সকল উপজেলা' : u}</option>
                    ))}
                  </select>

                  {(educationSearch || educationCategoryFilter !== 'ALL' || educationUpazilaFilter !== 'ALL') && (
                    <button
                      onClick={() => {
                        setEducationSearch('');
                        setEducationCategoryFilter('ALL');
                        setEducationUpazilaFilter('ALL');
                        setEducationPage(1);
                      }}
                      className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                    >
                      ফিল্টার মুছুন
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                    রেজিস্ট্রিকৃত মোট: {toBnNumber(filteredInstitutes.length)}টি প্রতিষ্ঠান
                  </span>
                </div>
              </div>

              {/* Education Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">ছবি ও র্যাঙ্ক</th>
                      <th className="py-3 px-3">নাম ও EIIN</th>
                      <th className="py-3 px-3">উপজেলা ও অবস্থান</th>
                      <th className="py-3 px-3">বিভাগ ও ধরন</th>
                      <th className="py-3 px-3">ফলাফল ও জিপিএ-৫</th>
                      <th className="py-3 px-3">শিক্ষা স্তর</th>
                      <th className="py-3 px-3 text-right">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedInstitutes.length > 0 ? (
                      paginatedInstitutes.map(inst => (
                        <tr key={inst.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3">
                            <div className="relative group w-14 h-11 cursor-pointer" onClick={() => setInspectInstitute(inst)}>
                              <img src={inst.coverImage} alt={inst.name} className="w-14 h-11 rounded-lg object-cover border border-slate-200 group-hover:opacity-90" />
                              {inst.rank && inst.rank > 0 && (
                                <span className="absolute -top-1.5 -left-1.5 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-md shadow">
                                  #{inst.rank}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-slate-900 block text-xs cursor-pointer hover:text-teal-800" onClick={() => setInspectInstitute(inst)}>
                              {inst.name}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-mono text-[10px] text-teal-800 bg-teal-50 px-1 rounded font-bold">EIIN: {inst.eiin}</span>
                              <span className="text-[11px] text-slate-400">স্থাপিত: {inst.established}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-semibold text-teal-800">
                            <span>{inst.upazila}</span>
                            <span className="text-[10px] text-slate-400 block font-normal">{inst.location}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium block w-fit">
                              {inst.categoryBn}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">{inst.management}</span>
                          </td>
                          <td className="py-3 px-3">
                            {inst.stats && (inst.stats.gpa5 || inst.stats.passRate) ? (
                              <div>
                                <span className="font-bold text-amber-600 text-[11px] block">
                                  জিপিএ-৫: {inst.stats.gpa5 || '০'}
                                </span>
                                <span className="text-[10px] text-emerald-700 block">
                                  পাস: {inst.stats.passRate || '৯৮%'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-400 text-[11px]">উচ্চশিক্ষা প্রতিষ্ঠান</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-slate-600 max-w-[130px] truncate" title={inst.educationLevel}>
                            {inst.educationLevel}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setInspectInstitute(inst)}
                                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                                title="প্রোফাইল প্রিভিউ"
                              >
                                <i className="fa-regular fa-eye"></i>
                              </button>
                              <button
                                onClick={() => {
                                  setEducationModal({
                                    isOpen: true,
                                    mode: 'edit',
                                    data: { ...inst }
                                  });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 cursor-pointer flex items-center gap-1"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                                <span>সম্পাদনা</span>
                              </button>
                              <button
                                onClick={() => handleDeleteInstitute(inst.id, inst.name)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                                title="মুছে ফেলুন"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          <i className="fa-solid fa-circle-exclamation text-2xl mb-2 text-slate-300 block"></i>
                          <span>কোনো শিক্ষাপ্রতিষ্ঠান পাওয়া যায়নি</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Education Pagination */}
              <AdminPagination
                currentPage={educationPage}
                totalItems={filteredInstitutes.length}
                pageSize={educationPageSize}
                onPageChange={setEducationPage}
                onPageSizeChange={setEducationPageSize}
              />
            </div>
          </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB 4: UPAZILAS & UNIONS CRUD */}
        {/* ======================================================== */}
        {currentNav === 'upazilas' && (
          tabLoading && !loadedTabs['upazilas'] ? (
            <AdminSkeletonLoader variant="table" rows={6} />
          ) : (
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

              {/* Search & Filters Bar */}
              <div className="pt-4 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={upazilasSearch}
                      onChange={e => {
                        setUpazilasSearch(e.target.value);
                        setUpazilasPage(1);
                      }}
                      placeholder="উপজেলার নাম বা পোস্টকোড খুঁজুন..."
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-56 sm:w-64 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {upazilasSearch && (
                    <button
                      onClick={() => {
                        setUpazilasSearch('');
                        setUpazilasPage(1);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                    >
                      মুছুন
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                    রেজিস্ট্রিকৃত মোট: {toBnNumber(filteredUpazilas.length)}টি উপজেলা
                  </span>
                </div>
              </div>

              {/* Upazilas Table */}
              <div className="overflow-x-auto pt-2">
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
                    {paginatedUpazilas.length > 0 ? (
                      paginatedUpazilas.map(u => (
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          <i className="fa-solid fa-map-location text-2xl mb-2 text-slate-300 block"></i>
                          <span>কোনো উপজেলা পাওয়া যায়নি</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Upazilas Pagination */}
              <AdminPagination
                currentPage={upazilasPage}
                totalItems={filteredUpazilas.length}
                pageSize={upazilasPageSize}
                onPageChange={setUpazilasPage}
                onPageSizeChange={setUpazilasPageSize}
              />
            </div>
          </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB 5: HOSPITALS CRUD */}
        {/* ======================================================== */}
        {currentNav === 'hospitals' && (
          tabLoading && !loadedTabs['hospitals'] ? (
            <AdminSkeletonLoader variant="table" rows={6} />
          ) : (
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

              {/* Register Search & Filters Bar */}
              <div className="pt-4 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={hospitalsSearch}
                      onChange={e => {
                        setHospitalsSearch(e.target.value);
                        setHospitalsPage(1);
                      }}
                      placeholder="হাসপাতালের নাম বা ঠিকানা খুঁজুন..."
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-56 sm:w-64 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* Type Filter */}
                  <select
                    value={hospitalsTypeFilter}
                    onChange={e => {
                      setHospitalsTypeFilter(e.target.value);
                      setHospitalsPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    <option value="ALL">সকল ধরন</option>
                    <option value="govt">সরকারি হাসপাতাল</option>
                    <option value="private">বেসরকারি ক্লিনিক</option>
                    <option value="diagnostic">ডায়াগনস্টিক সেন্টার</option>
                  </select>

                  {/* Upazila Filter */}
                  <select
                    value={hospitalsUpazilaFilter}
                    onChange={e => {
                      setHospitalsUpazilaFilter(e.target.value);
                      setHospitalsPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    {upazilaList.map(u => (
                      <option key={u} value={u}>{u === 'ALL' ? 'সকল উপজেলা' : u}</option>
                    ))}
                  </select>

                  {(hospitalsSearch || hospitalsTypeFilter !== 'ALL' || hospitalsUpazilaFilter !== 'ALL') && (
                    <button
                      onClick={() => {
                        setHospitalsSearch('');
                        setHospitalsTypeFilter('ALL');
                        setHospitalsUpazilaFilter('ALL');
                        setHospitalsPage(1);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                    >
                      ফিল্টার মুছুন
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                    রেজিস্ট্রিকৃত মোট: {toBnNumber(filteredHospitals.length)}টি প্রতিষ্ঠান
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto pt-2">
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
                    {paginatedHospitals.length > 0 ? (
                      paginatedHospitals.map((h, i) => (
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
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 cursor-pointer flex items-center gap-1"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                                <span>সম্পাদনা</span>
                              </button>
                              <button
                                onClick={() => handleDeleteHospital(h.name)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                                title="মুছে ফেলুন"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          <i className="fa-solid fa-hospital text-2xl mb-2 text-slate-300 block"></i>
                          <span>কোনো স্বাস্থ্যসেবা প্রতিষ্ঠান পাওয়া যায়নি</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Hospitals Pagination */}
              <AdminPagination
                currentPage={hospitalsPage}
                totalItems={filteredHospitals.length}
                pageSize={hospitalsPageSize}
                onPageChange={setHospitalsPage}
                onPageSizeChange={setHospitalsPageSize}
              />
            </div>
          </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB 6: EMERGENCY HOTLINES CRUD */}
        {/* ======================================================== */}
        {currentNav === 'emergency' && (
          tabLoading && !loadedTabs['emergency'] ? (
            <AdminSkeletonLoader variant="table" rows={6} />
          ) : (
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

              {/* Register Search & Filters Bar */}
              <div className="pt-4 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={emergencySearch}
                      onChange={e => {
                        setEmergencySearch(e.target.value);
                        setEmergencyPage(1);
                      }}
                      placeholder="হটলাইন বা সেবার নাম খুঁজুন..."
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-56 sm:w-64 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {emergencySearch && (
                    <button
                      onClick={() => {
                        setEmergencySearch('');
                        setEmergencyPage(1);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                    >
                      মুছুন
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    রেজিস্ট্রিকৃত মোট: {toBnNumber(filteredEmergency.length)}টি হটলাইন
                  </span>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
                    <button
                      onClick={() => setEmergencyViewMode('table')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                        emergencyViewMode === 'table' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      <i className="fa-solid fa-table-list text-xs"></i>
                      <span className="hidden sm:inline">টেবিল</span>
                    </button>
                    <button
                      onClick={() => setEmergencyViewMode('grid')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                        emergencyViewMode === 'grid' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      <i className="fa-solid fa-border-all text-xs"></i>
                      <span className="hidden sm:inline">গ্রিড</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* View Rendering */}
              {emergencyViewMode === 'table' ? (
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3">সেবার নাম</th>
                        <th className="py-3 px-3">হটলাইন নম্বর</th>
                        <th className="py-3 px-3">প্রাপ্যতা</th>
                        <th className="py-3 px-3">সরাসরি কল</th>
                        <th className="py-3 px-3 text-right">কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedEmergency.length > 0 ? (
                        paginatedEmergency.map((emg, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2.5">
                                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center text-xs">
                                  <i className={`fa-solid ${emg.icon || 'fa-phone'}`}></i>
                                </span>
                                <span className="font-bold text-slate-900">{emg.title}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-mono text-emerald-800 font-bold text-sm">
                              {emg.number}
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                ২৪ ঘণ্টা সচল
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <a
                                href={`tel:${emg.number.replace(/[^0-9+]/g, '')}`}
                                className="px-3 py-1 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition inline-flex items-center gap-1.5"
                              >
                                <i className="fa-solid fa-phone text-[10px]"></i>
                                <span>কল দিন</span>
                              </a>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setEmergencyModal({ isOpen: true, mode: 'edit', targetTitle: emg.title, data: emg })}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                                >
                                  সম্পাদনা
                                </button>
                                <button
                                  onClick={() => handleDeleteEmergency(emg.title)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                                  title="মুছে ফেলুন"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400">
                            <i className="fa-solid fa-phone-slash text-2xl mb-2 text-slate-300 block"></i>
                            <span>কোনো হটলাইন পাওয়া যায়নি</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {paginatedEmergency.length > 0 ? (
                    paginatedEmergency.map((emg, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <i className={`fa-solid ${emg.icon || 'fa-phone'} text-emerald-700 text-xs`}></i>
                            <h4 className="font-bold text-slate-900 text-sm">{emg.title}</h4>
                          </div>
                          <p className="font-mono text-emerald-800 font-bold text-base">{emg.number}</p>
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
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-slate-400">
                      <span>কোনো হটলাইন পাওয়া যায়নি</span>
                    </div>
                  )}
                </div>
              )}

              {/* Emergency Pagination */}
              <AdminPagination
                currentPage={emergencyPage}
                totalItems={filteredEmergency.length}
                pageSize={emergencyPageSize}
                onPageChange={setEmergencyPage}
                onPageSizeChange={setEmergencyPageSize}
                pageSizeOptions={[12, 24, 48]}
              />
            </div>
          </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB 7: BLOOD & COMMUNITY CRUD */}
        {/* ======================================================== */}
        {currentNav === 'community' && (
          tabLoading && !loadedTabs['community'] ? (
            <AdminSkeletonLoader variant="table" rows={6} />
          ) : (
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

              {/* Register Search & Filters Bar */}
              <div className="pt-4 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={communitySearch}
                      onChange={e => {
                        setCommunitySearch(e.target.value);
                        setCommunityPage(1);
                      }}
                      placeholder="নাম, ফোন বা বিবরণ খুঁজুন..."
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs w-52 sm:w-60 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={communityCategoryFilter}
                    onChange={e => {
                      setCommunityCategoryFilter(e.target.value);
                      setCommunityPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    <option value="ALL">সকল ক্যাটাগরি</option>
                    <option value="blood">রক্তদান (Blood)</option>
                    <option value="tuition">টিউশন (Tuition)</option>
                    <option value="rent">বাসা ভাড়া (Rent)</option>
                    <option value="jobs">চাকরি (Jobs)</option>
                    <option value="business">ব্যবসা ও সেবা (Trade)</option>
                  </select>

                  {/* Upazila Filter */}
                  <select
                    value={communityUpazilaFilter}
                    onChange={e => {
                      setCommunityUpazilaFilter(e.target.value);
                      setCommunityPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    {upazilaList.map(u => (
                      <option key={u} value={u}>{u === 'ALL' ? 'সকল উপজেলা' : u}</option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={communityStatusFilter}
                    onChange={e => {
                      setCommunityStatusFilter(e.target.value);
                      setCommunityPage(1);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                  >
                    <option value="ALL">সকল অবস্থা</option>
                    <option value="approved">অনুমোদিত</option>
                    <option value="pending">অপেক্ষমাণ</option>
                  </select>

                  {(communitySearch || communityCategoryFilter !== 'ALL' || communityUpazilaFilter !== 'ALL' || communityStatusFilter !== 'ALL') && (
                    <button
                      onClick={() => {
                        setCommunitySearch('');
                        setCommunityCategoryFilter('ALL');
                        setCommunityUpazilaFilter('ALL');
                        setCommunityStatusFilter('ALL');
                        setCommunityPage(1);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                    >
                      ফিল্টার মুছুন
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    মোট এন্ট্রি: {toBnNumber(filteredCommunity.length)}টি
                  </span>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
                    <button
                      onClick={() => setCommunityViewMode('table')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                        communityViewMode === 'table' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      <i className="fa-solid fa-table-list text-xs"></i>
                      <span className="hidden sm:inline">টেবিল</span>
                    </button>
                    <button
                      onClick={() => setCommunityViewMode('grid')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                        communityViewMode === 'grid' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      <i className="fa-solid fa-border-all text-xs"></i>
                      <span className="hidden sm:inline">গ্রিড</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* View Rendering */}
              {communityViewMode === 'table' ? (
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3">ক্যাটাগরি</th>
                        <th className="py-3 px-3">নাম ও ভূমিকা</th>
                        <th className="py-3 px-3">উপজেলা</th>
                        <th className="py-3 px-3">বিবরণ</th>
                        <th className="py-3 px-3">ফোন নম্বর</th>
                        <th className="py-3 px-3">অবস্থা</th>
                        <th className="py-3 px-3 text-right">কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedCommunity.length > 0 ? (
                        paginatedCommunity.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50 transition">
                            <td className="py-3 px-3">
                              {item.group ? (
                                <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 text-xs font-black">
                                  {item.group}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                                  {item.category}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-slate-900 block">{item.name}</span>
                              {item.role && <span className="text-[11px] text-slate-500">{item.role}</span>}
                            </td>
                            <td className="py-3 px-3 font-semibold text-emerald-800">{item.upazila}</td>
                            <td className="py-3 px-3 text-slate-600 max-w-xs truncate" title={item.detail}>
                              {item.detail}
                            </td>
                            <td className="py-3 px-3 font-mono text-emerald-800 font-bold">{item.phone}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {item.isApproved ? 'অনুমোদিত' : 'অপেক্ষমাণ'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setCommunityModal({ isOpen: true, mode: 'edit', data: item })}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 cursor-pointer flex items-center gap-1"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                  <span>সম্পাদনা</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteCommunity(item.id, item.name)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                                  title="মুছে ফেলুন"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            <i className="fa-solid fa-users-slash text-2xl mb-2 text-slate-300 block"></i>
                            <span>কোনো এন্ট্রি পাওয়া যায়নি</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {paginatedCommunity.length > 0 ? (
                    paginatedCommunity.map(item => (
                      <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
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
                          <span className={`text-[11px] font-semibold ${item.isApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
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
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-slate-400">
                      <span>কোনো এন্ট্রি পাওয়া যায়নি</span>
                    </div>
                  )}
                </div>
              )}

              {/* Community Pagination */}
              <AdminPagination
                currentPage={communityPage}
                totalItems={filteredCommunity.length}
                pageSize={communityPageSize}
                onPageChange={setCommunityPage}
                onPageSizeChange={setCommunityPageSize}
              />
            </div>
          </div>
          )
        )}

        {/* ======================================================== */}
        {/* TAB 8: WEBSITE BANNERS & CONTENT CMS */}
        {/* ======================================================== */}
        {currentNav === 'cms' && (
          tabLoading || !siteContent ? (
            <AdminSkeletonLoader variant="form" />
          ) : (
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
          )
        )}

        {/* ======================================================== */}
        {/* TAB 9: SETTINGS & BACKUP */}
        {/* ======================================================== */}
        {currentNav === 'settings' && (
          tabLoading && !systemDiag ? (
            <AdminSkeletonLoader variant="dashboard" />
          ) : (
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

            {/* System Audit Register */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-clock-rotate-left text-emerald-800"></i>
                  <h3 className="font-bold text-slate-900 text-sm">
                    সিস্টেম অডিট ও নিরাপত্তা কার্যক্রম লগ (Security Audit Log)
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  মোট অডিট এন্ট্রি: {toBnNumber(filteredAuditLogs.length)}টি
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {paginatedAuditLogs.map(log => (
                  <div key={log.id} className="py-2.5 flex items-start justify-between gap-4 text-xs hover:bg-slate-50/60 px-2 rounded-xl transition">
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

              <AdminPagination
                currentPage={auditPage}
                totalItems={filteredAuditLogs.length}
                pageSize={auditPageSize}
                onPageChange={setAuditPage}
                onPageSizeChange={setAuditPageSize}
              />
            </div>
          </div>
          )
        )}

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

              {/* ======================================================== */}
              {/* MULTIPLE IMAGE LINKS & GALLERY ALBUM MANAGER */}
              {/* ======================================================== */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <i className="fa-regular fa-images text-emerald-700 text-sm"></i>
                      <span>ছবির অ্যালবাম ও গ্যালারি (একাধিক ছবির লিংক যোগ ও সম্পাদনা)</span>
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      প্রধান কভার ছবি সহ একাধিক ছবির লিংক যুক্ত করুন। দর্শনার্থীরা বিস্তারিত পাতায় ছবিগুলো স্লাইড ও থাম্বনেইলে দেখতে পাবেন।
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0 shadow-2xs">
                    {Array.isArray(spotModal.data.gallery) && spotModal.data.gallery.length > 0 ? spotModal.data.gallery.length : (spotModal.data.coverImage ? 1 : 0)}টি ছবি
                  </span>
                </div>

                {/* 1. Main Cover Image Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-700">১. প্রধান কভার ছবির URL *</span>
                    {spotModal.data.coverImage && (
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        ✓ নির্বাচিত কভার
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={spotModal.data.coverImage || ''}
                      onChange={e => {
                        const val = e.target.value;
                        const gal = Array.isArray(spotModal.data.gallery) ? [...spotModal.data.gallery] : [];
                        if (val && !gal.includes(val)) gal.unshift(val);
                        setSpotModal({ ...spotModal, data: { ...spotModal.data, coverImage: val, gallery: gal } });
                      }}
                      placeholder="https://images.unsplash.com/... (প্রধান ছবির লিঙ্ক)"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                    {spotModal.data.coverImage && (
                      <div className="w-12 h-9 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-100">
                        <img
                          src={spotModal.data.coverImage}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                          onError={(e: any) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Add Additional Gallery Image */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">২. নতুন ছবির লিংক যোগ করুন (গ্যালারি অ্যালবাম)</span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newSpotImageUrl}
                      onChange={e => setNewSpotImageUrl(e.target.value)}
                      placeholder="https://... অতিরিক্ত যেকোনো ছবির সরাসরি লিঙ্ক দিন"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const url = newSpotImageUrl.trim();
                          if (!url) return;
                          const current = Array.isArray(spotModal.data.gallery) ? [...spotModal.data.gallery] : (spotModal.data.coverImage ? [spotModal.data.coverImage] : []);
                          if (!current.includes(url)) current.push(url);
                          setSpotModal({
                            ...spotModal,
                            data: {
                              ...spotModal.data,
                              gallery: current,
                              coverImage: spotModal.data.coverImage || url
                            }
                          });
                          setNewSpotImageUrl('');
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const url = newSpotImageUrl.trim();
                        if (!url) return;
                        const current = Array.isArray(spotModal.data.gallery) ? [...spotModal.data.gallery] : (spotModal.data.coverImage ? [spotModal.data.coverImage] : []);
                        if (!current.includes(url)) current.push(url);
                        setSpotModal({
                          ...spotModal,
                          data: {
                            ...spotModal.data,
                            gallery: current,
                            coverImage: spotModal.data.coverImage || url
                          }
                        });
                        setNewSpotImageUrl('');
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer transition flex items-center gap-1.5 shadow-xs"
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                      <span>+ ছবিতে যোগ করুন</span>
                    </button>
                  </div>
                </div>

                {/* 3. 1-Click Bogura Landmark Presets */}
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    অথবা বগুড়ার ঐতিহ্যবাহী ফ্রি স্টক ছবি থেকে ১-ক্লিকে যোগ করুন:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {[
                      { label: 'মহাস্থান দুর্গপ্রাচীর', url: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'ভাসুবিহার বৌদ্ধ মঠ', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'খেরুয়া মসজিদ শেরপুর', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'প্রেম যমুনার ঘাট', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'যোগীর ভবন মন্দির', url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80' }
                    ].map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const current = Array.isArray(spotModal.data.gallery) ? [...spotModal.data.gallery] : (spotModal.data.coverImage ? [spotModal.data.coverImage] : []);
                          if (!current.includes(sample.url)) current.push(sample.url);
                          setSpotModal({
                            ...spotModal,
                            data: {
                              ...spotModal.data,
                              gallery: current,
                              coverImage: spotModal.data.coverImage || sample.url
                            }
                          });
                        }}
                        className="p-1.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/60 transition text-left flex items-center gap-2 group cursor-pointer shadow-2xs"
                      >
                        <img src={sample.url} alt={sample.label} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        <span className="text-[10px] font-semibold text-slate-700 group-hover:text-emerald-900 truncate">
                          + {sample.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Interactive List of Added Gallery Images */}
                {Array.isArray(spotModal.data.gallery) && spotModal.data.gallery.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      সংযুক্ত ছবিসমূহ ({spotModal.data.gallery.length}টি) — সরাসরি সম্পাদনা করুন:
                    </span>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {spotModal.data.gallery.map((imgUrl, i) => {
                        const isCover = spotModal.data.coverImage === imgUrl;
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-2.5 p-2 rounded-xl border transition ${
                              isCover ? 'bg-emerald-50/80 border-emerald-300' : 'bg-white border-slate-200'
                            }`}
                          >
                            <span className="w-5 text-center text-[10px] font-bold text-slate-400 shrink-0">
                              #{i + 1}
                            </span>
                            <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100 relative">
                              <img
                                src={imgUrl}
                                alt={`gallery-${i}`}
                                className="w-full h-full object-cover"
                                onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=400&q=80'; }}
                              />
                            </div>
                            <input
                              type="url"
                              value={imgUrl}
                              onChange={e => {
                                const newUrl = e.target.value;
                                const updated = [...(spotModal.data.gallery || [])];
                                const old = updated[i];
                                updated[i] = newUrl;
                                const newCover = spotModal.data.coverImage === old ? newUrl : spotModal.data.coverImage;
                                setSpotModal({
                                  ...spotModal,
                                  data: { ...spotModal.data, gallery: updated, coverImage: newCover }
                                });
                              }}
                              className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                              placeholder="https://..."
                            />
                            <div className="flex items-center gap-1 shrink-0">
                              {isCover ? (
                                <span className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                                  <i className="fa-solid fa-star text-[9px]"></i>
                                  <span>কভার</span>
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSpotModal({
                                      ...spotModal,
                                      data: { ...spotModal.data, coverImage: imgUrl }
                                    });
                                  }}
                                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 text-[10px] font-semibold cursor-pointer transition"
                                  title="এই ছবিকে প্রধান কভার ছবি করুন"
                                >
                                  কভার করুন
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(spotModal.data.gallery || [])];
                                  const removed = updated[i];
                                  updated.splice(i, 1);
                                  const newCover = spotModal.data.coverImage === removed ? (updated[0] || '') : spotModal.data.coverImage;
                                  setSpotModal({
                                    ...spotModal,
                                    data: { ...spotModal.data, gallery: updated, coverImage: newCover }
                                  });
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition"
                                title="ছবি মুছে ফেলুন"
                              >
                                <i className="fa-solid fa-trash-can text-xs"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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
            <img src={inspectSpot.coverImage} alt={inspectSpot.title} className="w-full aspect-video rounded-2xl object-cover my-3 border border-slate-200 shadow-sm" />
            {Array.isArray(inspectSpot.gallery) && inspectSpot.gallery.length > 1 && (
              <div className="mb-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block mb-2">
                  <i className="fa-regular fa-images text-emerald-700 mr-1.5"></i>
                  অ্যালবাম গ্যালারি ({inspectSpot.gallery.length}টি ছবি):
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {inspectSpot.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                      <img
                        src={img}
                        alt={`${inspectSpot.title}-${idx}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=400&q=80'; }}
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

      {/* ======================================================== */}
      {/* MODAL 9: EDUCATION INSTITUTE FORM MODAL (ADD / EDIT) */}
      {/* ======================================================== */}
      {educationModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {educationModal.mode === 'add' ? 'নতুন শিক্ষাপ্রতিষ্ঠান যোগ করুন' : 'প্রতিষ্ঠান তথ্য সম্পাদনা'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">বগুড়া জেলা শিক্ষাপ্রতিষ্ঠান ও কলেজ ডিরেক্টরি এন্ট্রি</p>
              </div>
              <button
                onClick={() => setEducationModal({ isOpen: false, mode: 'add', data: {} })}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveInstitute} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠানের নাম (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={educationModal.data.name || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, name: e.target.value } }))}
                    placeholder="যেমন: সরকারি আজিজুল হক কলেজ, বগুড়া"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইংরেজি নাম (English)</label>
                  <input
                    type="text"
                    value={educationModal.data.enName || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, enName: e.target.value } }))}
                    placeholder="e.g. Govt. Azizul Haque College"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">EIIN কোড</label>
                  <input
                    type="text"
                    value={educationModal.data.eiin || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, eiin: e.target.value } }))}
                    placeholder="যেমন: 119246"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সোহোপ্যাথি র্যাঙ্ক (#)</label>
                  <input
                    type="number"
                    value={educationModal.data.rank || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, rank: parseInt(e.target.value, 10) || undefined } }))}
                    placeholder="যেমন: 1"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">উপজেলা *</label>
                  <select
                    value={educationModal.data.upazila || 'বগুড়া সদর'}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, upazila: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  >
                    {upazilaList.filter(u => u !== 'ALL').map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={educationModal.data.category || 'school'}
                    onChange={e => {
                      const val = e.target.value as any;
                      const bnMap: Record<string, string> = {
                        school: 'উচ্চ বিদ্যালয়',
                        madrasah: 'মাদ্রাসা',
                        technical: 'কারিগরি ও ভোকেশনাল',
                        college: 'কলেজ',
                        'school-college': 'স্কুল অ্যান্ড কলেজ',
                        kindergarten: 'কিন্ডারগার্টেন',
                        university: 'বিশ্ববিদ্যালয়',
                        medical: 'মেডিকেল কলেজ',
                        polytechnic: 'পলিটেকনিক ইনস্টিটিউট'
                      };
                      setEducationModal(prev => ({
                        ...prev,
                        data: { ...prev.data, category: val, categoryBn: bnMap[val] || 'প্রতিষ্ঠান' }
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="school">মাধ্যমিক ও উচ্চ বিদ্যালয়</option>
                    <option value="madrasah">মাদ্রাসা শিক্ষা</option>
                    <option value="technical">কারিগরি ও ভোকেশনাল</option>
                    <option value="college">কলেজ ও বিশ্ববিদ্যালয় কলেজ</option>
                    <option value="school-college">স্কুল অ্যান্ড কলেজ</option>
                    <option value="kindergarten">কিন্ডারগার্টেন ও কেজি</option>
                    <option value="university">বিশ্ববিদ্যালয়</option>
                    <option value="medical">মেডিকেল কলেজ</option>
                    <option value="polytechnic">পলিটেকনিক ও কারিগরি</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ম্যানেজমেন্ট</label>
                  <input
                    type="text"
                    value={educationModal.data.management || 'সরকারি'}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, management: e.target.value } }))}
                    placeholder="সরকারি / বেসরকারি / সামরিক"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">স্থাপিত সাল</label>
                  <input
                    type="text"
                    value={educationModal.data.established || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, established: e.target.value } }))}
                    placeholder="যেমন: ১৯৩৯"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সুনির্দিষ্ট অবস্থান ও ঠিকানা</label>
                <input
                  type="text"
                  value={educationModal.data.location || ''}
                  onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, location: e.target.value } }))}
                  placeholder="যেমন: ফুলবাড়ী, বগুড়া সদর"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              {/* Statistics */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">পরীক্ষার ফলাফল পরিসংখ্যান (Statistics)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">মোট পরীক্ষার্থী</label>
                    <input
                      type="text"
                      value={educationModal.data.stats?.appeared || ''}
                      onChange={e => setEducationModal(prev => ({
                        ...prev,
                        data: { ...prev.data, stats: { ...prev.data.stats, appeared: e.target.value } }
                      }))}
                      placeholder="যেমন: ২৭,১৭২"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">কৃতকার্য</label>
                    <input
                      type="text"
                      value={educationModal.data.stats?.passed || ''}
                      onChange={e => setEducationModal(prev => ({
                        ...prev,
                        data: { ...prev.data, stats: { ...prev.data.stats, passed: e.target.value } }
                      }))}
                      placeholder="যেমন: ২৬,৬৮৭"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">জিপিএ-৫</label>
                    <input
                      type="text"
                      value={educationModal.data.stats?.gpa5 || ''}
                      onChange={e => setEducationModal(prev => ({
                        ...prev,
                        data: { ...prev.data, stats: { ...prev.data.stats, gpa5: e.target.value } }
                      }))}
                      placeholder="যেমন: ১৫,৩৯২"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-bold text-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">পাসের হার</label>
                    <input
                      type="text"
                      value={educationModal.data.stats?.passRate || ''}
                      onChange={e => setEducationModal(prev => ({
                        ...prev,
                        data: { ...prev.data, stats: { ...prev.data.stats, passRate: e.target.value } }
                      }))}
                      placeholder="যেমন: ৯৮.২%"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white font-bold text-emerald-700"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">কভার ছবির URL</label>
                  <input
                    type="url"
                    value={educationModal.data.coverImage || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, coverImage: e.target.value } }))}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">যোগাযোগ ফোন</label>
                  <input
                    type="text"
                    value={educationModal.data.phone || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, phone: e.target.value } }))}
                    placeholder="051-65562"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অফিসিয়াল ওয়েবসাইট</label>
                  <input
                    type="url"
                    value={educationModal.data.website || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, website: e.target.value } }))}
                    placeholder="https://www.gahc.edu.bd"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অধ্যক্ষ / প্রধান শিক্ষক</label>
                  <input
                    type="text"
                    value={educationModal.data.principal || ''}
                    onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, principal: e.target.value } }))}
                    placeholder="যেমন: প্রফেসর মোঃ শাহজাহান আলী"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সংক্ষিপ্ত পরিচিতি</label>
                <textarea
                  rows={2}
                  value={educationModal.data.shortDesc || ''}
                  onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, shortDesc: e.target.value } }))}
                  placeholder="প্রতিষ্ঠানটির একাডেমিক পরিচয় ও সারসংক্ষেপ..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ইতিহাস ও ঐতিহ্য</label>
                <textarea
                  rows={3}
                  value={educationModal.data.history || ''}
                  onChange={e => setEducationModal(prev => ({ ...prev, data: { ...prev.data, history: e.target.value } }))}
                  placeholder="প্রতিষ্ঠার বিস্তারিত পটভূমি..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-1 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEducationModal({ isOpen: false, mode: 'add', data: {} })}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  {educationModal.mode === 'add' ? 'সংরক্ষণ করুন' : 'আপডেট করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 10: INSPECT INSTITUTE PREVIEW MODAL */}
      {/* ======================================================== */}
      {inspectInstitute && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setInspectInstitute(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="space-y-4">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-900">
                <img src={inspectInstitute.coverImage} alt={inspectInstitute.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold">{inspectInstitute.categoryBn}</span>
                  <h3 className="text-xl font-bold mt-1">{inspectInstitute.name}</h3>
                  <span className="text-xs text-slate-300 font-mono">EIIN: {inspectInstitute.eiin} · {inspectInstitute.upazila}</span>
                </div>
              </div>

              {inspectInstitute.stats && (
                <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">পরীক্ষার্থী</span>
                    <span className="text-xs font-bold text-slate-800">{inspectInstitute.stats.appeared || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">কৃতকার্য</span>
                    <span className="text-xs font-bold text-slate-800">{inspectInstitute.stats.passed || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">জিপিএ-৫</span>
                    <span className="text-xs font-bold text-amber-600">{inspectInstitute.stats.gpa5 || '০'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">পাসের হার</span>
                    <span className="text-xs font-bold text-emerald-700">{inspectInstitute.stats.passRate || '৯৮%'}</span>
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-700 leading-relaxed">{inspectInstitute.shortDesc}</p>

              <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div><span className="text-slate-400">অধ্যক্ষ:</span> <span className="font-semibold text-slate-800">{inspectInstitute.principal || 'N/A'}</span></div>
                <div><span className="text-slate-400">ফোন:</span> <span className="font-mono font-semibold text-slate-800">{inspectInstitute.phone}</span></div>
                <div><span className="text-slate-400">বোর্ড:</span> <span className="font-semibold text-slate-800">{inspectInstitute.board}</span></div>
                <div><span className="text-slate-400">স্থাপিত:</span> <span className="font-semibold text-slate-800">{inspectInstitute.established}</span></div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`/education/${inspectInstitute.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  <span>লাইভ প্রোফাইল পেজ দেখুন</span>
                </a>

                <button
                  onClick={() => setInspectInstitute(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
