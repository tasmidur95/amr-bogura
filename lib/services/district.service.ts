import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  upazilasData,
  hospitalsData,
  emergencyData,
  exploreData,
  initialCommunityState,
  Upazila,
  Hospital,
  EmergencyContact,
  ExploreSpot,
  CommunityPost,
  SiteContent,
  defaultSiteContent
} from '@/lib/data/district-data';

import {
  detailedExploreSpots,
  DetailedExploreSpot,
  SpotReview
} from '@/lib/data/explore-data';

import {
  boguraUpazilasData,
  DetailedUpazilaData,
  UnionData
} from '@/lib/data/unions-villages-data';

import { EducationalInstitute } from '@/lib/types/education';

export type { SiteContent, EducationalInstitute };

/**
 * File-backed persistence helper for educational institutes
 */
function getEducationFilePath(): string {
  return path.join(process.cwd(), 'amr-bogura-data', 'education', 'institutes.json');
}

function loadInitialInstitutes(): EducationalInstitute[] {
  try {
    const p = getEducationFilePath();
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load institutes from disk:', e);
  }
  return [];
}

function savePersistentInstitutes(list: EducationalInstitute[]): void {
  try {
    const p = getEducationFilePath();
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to save institutes to disk:', e);
  }
}

let memoryInstitutes: EducationalInstitute[] = loadInitialInstitutes();

/**
 * File-backed persistence helper for explore spots
 */
function getSpotsFilePath(): string {
  return path.join(process.cwd(), 'amr-bogura-data', 'explore', 'explore-spots.json');
}

function loadInitialSpots(): DetailedExploreSpot[] {
  try {
    const p = getSpotsFilePath();
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((s: any) => ({
          ...s,
          isApproved: s.isApproved ?? true,
          status: s.status || (s.isApproved ? 'approved' : 'pending'),
          gallery: Array.isArray(s.gallery) ? s.gallery : (s.coverImage ? [s.coverImage] : [])
        }));
      }
    }
  } catch (e) {
    console.warn('Fallback loading initial spots from code:', e);
  }
  return detailedExploreSpots.map(s => ({
    ...s,
    isApproved: true,
    status: 'approved' as const
  }));
}

function savePersistentSpots(spots: DetailedExploreSpot[]): void {
  try {
    const p = getSpotsFilePath();
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p, JSON.stringify(spots, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to save persistent spots to disk:', e);
  }
}

/**
 * In-memory state for upazilas & unions
 */
let memoryUpazilas: Upazila[] = [...upazilasData];
let memoryDetailedUpazilas: DetailedUpazilaData[] = [...boguraUpazilasData];

/**
 * In-memory site content for real-time CMS editing
 */
let memorySiteContent: SiteContent = { ...defaultSiteContent };

/**
 * Persistent state for explore spots
 */
let memoryExploreSpots: DetailedExploreSpot[] = loadInitialSpots();

function getCommunityFilePath(): string {
  return path.join(process.cwd(), 'amr-bogura-data', 'community', 'community-posts.json');
}

function loadInitialCommunity(): Record<string, CommunityPost[]> {
  try {
    const p = getCommunityFilePath();
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load persistent community posts:', e);
  }
  return {
    blood: [
      {
        id: 'comm-pending-1',
        category: 'blood',
        name: 'মোঃ মাহমুদুল হাসান',
        group: 'O+',
        role: 'জরুরি রক্তদাতা',
        badge: 'স্বেচ্ছাসেবী',
        upazila: 'সারিয়াকান্দি',
        detail: 'সারিয়াকান্দি সদর ও যমুনা চরাঞ্চল এলাকায় যেকোনো জরুরি মুহূর্তে রক্তদানে প্রস্তুত',
        phone: '01712-998877',
        isApproved: false,
        status: 'pending',
        contributorName: 'মাহমুদুল হাসান',
        contributorPhone: '01712-998877',
        created_at: '2026-03-19'
      },
      ...(initialCommunityState.blood || []).map(p => ({
        ...p,
        isApproved: true,
        status: 'approved' as const
      }))
    ],
    tuition: [
      {
        id: 'comm-pending-2',
        category: 'tuition',
        name: 'নাজমুল সাকিব (গণিত বিভাগ, আযিযুল হক কলেজ)',
        upazila: 'বগুড়া সদর',
        detail: 'এসএসসি ও এইচএসসি উচ্চতর গণিত এবং পদার্থবিজ্ঞান যত্নসহকারে পড়ানো হয়',
        phone: '01815-443322',
        badge: 'শিক্ষক উপলব্ধ',
        isApproved: false,
        status: 'pending',
        contributorName: 'নাজমুল সাকিব',
        contributorPhone: '01815-443322',
        created_at: '2026-03-19'
      },
      ...(initialCommunityState.tuition || []).map(p => ({
        ...p,
        isApproved: true,
        status: 'approved' as const
      }))
    ],
    rent: (initialCommunityState.rent || []).map(p => ({
      ...p,
      isApproved: true,
      status: 'approved' as const
    })),
    jobs: (initialCommunityState.jobs || []).map(p => ({
      ...p,
      isApproved: true,
      status: 'approved' as const
    })),
    business: (initialCommunityState.business || []).map(p => ({
      ...p,
      isApproved: true,
      status: 'approved' as const
    }))
  };
}

function savePersistentCommunity(comm: Record<string, CommunityPost[]>): void {
  try {
    const p = getCommunityFilePath();
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p, JSON.stringify(comm, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to save persistent community posts:', e);
  }
}

/**
 * In-memory state for community posts with approval statuses & disk persistence
 */
let memoryCommunityState: Record<string, CommunityPost[]> = loadInitialCommunity();

/**
 * In-memory state for standalone / pending spot reviews
 */
let memorySpotReviews: SpotReview[] = [
  {
    id: 'rev-pending-1',
    author: 'ড. শামীম আহমেদ (গবেষক, ঢাকা বিশ্ববিদ্যালয়)',
    rating: 5,
    comment: 'মহাস্থানগড়ে সাম্প্রতিক খননকাজে প্রাপ্ত নিদর্শন প্রদর্শনী বেশ পরিচ্ছন্ন ও চমৎকার। সরকারি গাইড সুবিধা আরও বাড়ানো দরকার।',
    date: '২০২৬-০৩-১৯',
    location: 'ঢাকা',
    isApproved: false,
    status: 'pending',
    spotId: 'mahasthangarh',
    spotTitle: 'মহাস্থানগড় (প্রাচীন পুণ্ড্রনগর)'
  }
];

/**
 * In-memory state for hospitals & diagnostics
 */
let memoryHospitals: Hospital[] = [...hospitalsData];

/**
 * In-memory state for emergency hotlines
 */
let memoryEmergency: EmergencyContact[] = [...emergencyData];

/**
 * In-memory system settings & configuration
 */
let systemSettings = {
  autoApprove: false,
  maintenanceMode: false,
  allowPublicContributions: true,
  adminPasskey: process.env.ADMIN_PASSKEY || 'bogura2026',
  lastBackupDate: new Date().toISOString()
};

/**
 * In-memory administrative audit logs
 */
let systemAuditLogs: Array<{
  id: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}> = [
    {
      id: 'log-1',
      action: 'SYSTEM_BOOT',
      target: 'Next.js 14 App Router',
      details: 'আমার বগুড়া প্ল্যাটফর্ম সফলভাবে বুটস্ট্র্যাপ হয়েছে।',
      timestamp: 'আজ ১৫:৪৫',
      status: 'success'
    },
    {
      id: 'log-2',
      action: 'DATABASE_SYNC',
      target: 'Supabase PostgreSQL Pooler',
      details: 'সুপাবেস কানেকশন যাচাই সফলভাবে সম্পন্ন হয়েছে।',
      timestamp: 'আজ ১৫:৪৭',
      status: 'info'
    },
    {
      id: 'log-3',
      action: 'MODERATION_QUEUE',
      target: 'Approval Process',
      details: 'নাগরিক অবদান ও অনুমোদন ইঞ্জিন সক্রিয় রয়েছে।',
      timestamp: 'আজ ১৫:৫০',
      status: 'warning'
    }
  ];

/**
 * DistrictService - NestJS-style modular service layer
 * Responsible for data access, filtering, Supabase synchronization & public contributor workflow.
 */
export class DistrictService {
  // Upazilas (Dynamic with in-memory admin CRUD)
  static async getUpazilas(query?: string, filter?: string): Promise<Upazila[]> {
    let list = [...memoryUpazilas];

    if (filter && filter !== 'all') {
      list = list.filter(u => u.tags.includes(filter));
    }

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.enName.toLowerCase().includes(q) ||
        u.rivers.toLowerCase().includes(q) ||
        u.landmark.toLowerCase().includes(q) ||
        u.unionList.some(un => un.toLowerCase().includes(q))
      );
    }

    return list;
  }

  static async getUpazilaByIndex(index: number): Promise<Upazila | null> {
    return memoryUpazilas[index] || null;
  }

  static async getDetailedUpazilas(): Promise<DetailedUpazilaData[]> {
    return memoryDetailedUpazilas;
  }

  static async getDetailedUpazilaById(idOrIndex: string | number): Promise<DetailedUpazilaData | null> {
    if (typeof idOrIndex === 'number') {
      return memoryDetailedUpazilas[idOrIndex] || null;
    }
    const found = memoryDetailedUpazilas.find(u => u.id === idOrIndex || u.name === idOrIndex || u.enName.toLowerCase() === idOrIndex.toLowerCase());
    return found || null;
  }

  // Hospitals (Dynamic with in-memory admin support)
  static async getHospitals(type?: string, query?: string): Promise<Hospital[]> {
    let list = [...memoryHospitals];

    if (type && type !== 'all') {
      list = list.filter(h => h.type === type);
    }

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(h =>
        h.name.toLowerCase().includes(q) ||
        h.enName.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q)
      );
    }

    return list;
  }

  // Emergency (Dynamic with in-memory admin support)
  static async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return memoryEmergency;
  }

  // Explore / Tourist Spots (Legacy simple format)
  static async getExploreSpots(): Promise<ExploreSpot[]> {
    return exploreData;
  }

  // ==========================================
  // DETAILED EXPLORE & HERITAGE SPOTS (NEW)
  // ==========================================

  static async getDetailedExploreSpots(
    category?: string,
    query?: string,
    includePending = false
  ): Promise<DetailedExploreSpot[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let queryBuilder = supabase
          .from('tourist_spots')
          .select('*')
          .order('created_at', { ascending: false });

        if (!includePending) {
          queryBuilder = queryBuilder.eq('is_approved', true);
        }

        if (category && category !== 'all') {
          queryBuilder = queryBuilder.eq('category', category);
        }

        const { data, error } = await queryBuilder;
        if (!error && data && data.length > 0) {
          const dbSpots: DetailedExploreSpot[] = data.map(item => ({
            id: item.id,
            title: item.title,
            enTitle: item.en_title,
            category: item.category,
            categoryBn: item.category_bn,
            location: item.location,
            upazila: item.upazila,
            tag: item.tag,
            coverImage: item.cover_image,
            gallery: Array.isArray(item.gallery) ? item.gallery : (item.cover_image ? [item.cover_image] : []),
            shortDesc: item.short_desc,
            history: item.history,
            architecture: item.architecture,
            howToReach: item.how_to_reach,
            highlights: Array.isArray(item.highlights) ? item.highlights : [],
            timings: item.timings,
            entryFee: item.entry_fee,
            bestTime: item.best_time,
            mapCoordinates: item.map_coordinates || '',
            mapUrl: item.map_url || '',
            isApproved: item.is_approved,
            status: item.is_approved ? 'approved' : 'pending',
            contributor: {
              name: item.contributor_name,
              phone: item.contributor_phone,
              email: item.contributor_email,
              date: item.created_at ? item.created_at.split('T')[0] : '২০২৬',
              note: item.contributor_note
            },
            reviews: []
          }));

          // Sync into persistent storage
          dbSpots.forEach(ds => {
            const idx = memoryExploreSpots.findIndex(m => m.id === ds.id);
            if (idx !== -1) {
              const local = memoryExploreSpots[idx];
              memoryExploreSpots[idx] = {
                ...ds,
                ...local,
                gallery: (local.gallery && local.gallery.length > 0)
                  ? local.gallery
                  : (ds.gallery && ds.gallery.length > 0 ? ds.gallery : (local.coverImage ? [local.coverImage] : []))
              };
            } else {
              memoryExploreSpots.push(ds);
            }
          });
          savePersistentSpots(memoryExploreSpots);
        }
      } catch (err: any) {
        console.warn('Supabase explore fetch fallback to persistent file:', err.message);
      }
    }

    // Disk-backed persistent fallback
    let list = [...memoryExploreSpots];

    if (!includePending) {
      list = list.filter(s => s.isApproved || s.status === 'approved');
    }

    if (category && category !== 'all') {
      list = list.filter(s => s.category === category);
    }

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(s =>
        s.title.toLowerCase().includes(q) ||
        (s.enTitle && s.enTitle.toLowerCase().includes(q)) ||
        s.location.toLowerCase().includes(q) ||
        s.upazila.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q)
      );
    }

    return list;
  }

  static async getDetailedExploreSpotById(id: string): Promise<DetailedExploreSpot | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('tourist_spots')
          .select('*')
          .eq('id', id)
          .single();

        if (!error && data) {
          // Fetch reviews
          const { data: revs } = await supabase
            .from('spot_reviews')
            .select('*')
            .eq('spot_id', id)
            .order('created_at', { ascending: false });

          return {
            id: data.id,
            title: data.title,
            enTitle: data.en_title,
            category: data.category,
            categoryBn: data.category_bn,
            location: data.location,
            upazila: data.upazila,
            tag: data.tag,
            coverImage: data.cover_image,
            gallery: Array.isArray(data.gallery) ? data.gallery : [],
            shortDesc: data.short_desc,
            history: data.history,
            architecture: data.architecture,
            howToReach: data.how_to_reach,
            highlights: Array.isArray(data.highlights) ? data.highlights : [],
            timings: data.timings,
            entryFee: data.entry_fee,
            bestTime: data.best_time,
            mapCoordinates: data.map_coordinates || '',
            mapUrl: data.map_url || '',
            isApproved: data.is_approved,
            contributor: {
              name: data.contributor_name,
              phone: data.contributor_phone,
              email: data.contributor_email,
              date: data.created_at ? data.created_at.split('T')[0] : '২০২৬',
              note: data.contributor_note
            },
            reviews: revs ? revs.map(r => ({
              id: r.id,
              author: r.author,
              rating: r.rating,
              comment: r.comment,
              date: r.created_at ? r.created_at.split('T')[0] : '২০২৬',
              location: r.location
            })) : []
          };
        }
      } catch (err) {
        console.warn('Supabase spot by id fallback to memory:', err);
      }
    }

    let found = memoryExploreSpots.find(s => s.id === id);
    if (!found) {
      const diskSpots = loadInitialSpots();
      found = diskSpots.find(s => s.id === id);
      if (found) memoryExploreSpots = diskSpots;
    }
    return found || null;
  }

  /**
   * Submit new tourist spot as public contributor
   */
  static async createExploreSpot(
    spot: Omit<DetailedExploreSpot, 'id' | 'isApproved' | 'reviews'> & {
      id?: string;
      autoApprove?: boolean;
      status?: 'pending' | 'approved' | 'rejected';
    }
  ): Promise<DetailedExploreSpot> {
    let rawSlug = (spot.id || '').trim();
    if (!rawSlug && spot.enTitle) {
      rawSlug = spot.enTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
    if (!rawSlug) {
      const enPart = (spot.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      rawSlug = enPart || `spot-${Date.now()}`;
    }
    const slug = rawSlug;
    const autoApprove = spot.autoApprove ?? true;
    const status = spot.status || (autoApprove ? 'approved' : 'pending');
    const contributor = spot.contributor || {
      name: 'Amr Bogura Editorial',
      date: new Date().toISOString().split('T')[0]
    };

    const newSpot: DetailedExploreSpot = {
      id: slug,
      title: spot.title,
      enTitle: spot.enTitle || spot.title,
      category: spot.category || 'heritage',
      categoryBn: spot.categoryBn || 'ঐতিহাসিক স্থাপত্য ও সংস্কৃতি',
      location: spot.location,
      upazila: spot.upazila || 'বগুড়া সদর',
      tag: spot.tag || 'নাগরিক প্রস্তাবিত স্থান',
      coverImage: spot.coverImage || 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
      gallery: Array.isArray(spot.gallery) && spot.gallery.length > 0
        ? spot.gallery
        : (spot.coverImage ? [spot.coverImage] : ['https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80']),
      shortDesc: spot.shortDesc,
      history: spot.history || '',
      architecture: spot.architecture || '',
      howToReach: spot.howToReach || '',
      highlights: Array.isArray(spot.highlights) ? spot.highlights : [],
      timings: spot.timings || 'উন্মুক্ত',
      entryFee: spot.entryFee || 'বিনামূল্যে',
      bestTime: spot.bestTime || 'সারা বছর',
      mapCoordinates: spot.mapCoordinates || '',
      mapUrl: spot.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(spot.title + ', বগুড়া')}`,
      isApproved: autoApprove,
      status,
      contributor,
      reviews: []
    };

    // 1. Update local memory & write to persistent disk file
    const existingIdx = memoryExploreSpots.findIndex(s => s.id === slug);
    if (existingIdx !== -1) {
      memoryExploreSpots[existingIdx] = newSpot;
    } else {
      memoryExploreSpots.unshift(newSpot);
    }
    savePersistentSpots(memoryExploreSpots);

    // 2. Insert into Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('tourist_spots')
          .insert([
            {
              id: slug,
              title: newSpot.title,
              en_title: newSpot.enTitle,
              category: newSpot.category,
              category_bn: newSpot.categoryBn,
              location: newSpot.location,
              upazila: newSpot.upazila,
              tag: newSpot.tag,
              cover_image: newSpot.coverImage,
              gallery: newSpot.gallery,
              short_desc: newSpot.shortDesc,
              history: newSpot.history,
              architecture: newSpot.architecture,
              how_to_reach: newSpot.howToReach,
              highlights: newSpot.highlights,
              timings: newSpot.timings,
              entry_fee: newSpot.entryFee,
              best_time: newSpot.bestTime,
              map_coordinates: newSpot.mapCoordinates,
              map_url: newSpot.mapUrl,
              is_approved: autoApprove,
              contributor_name: contributor.name || 'Amr Bogura Editorial',
              contributor_phone: contributor.phone || null,
              contributor_email: contributor.email || null,
              contributor_note: contributor.note || null
            }
          ]);

        if (error) {
          console.warn('Supabase tourist_spots insert warning:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase spot insert fallback:', err.message);
      }
    }

    this.addAuditLog('SPOT_CREATE', newSpot.title, 'নতুন দর্শনীয় স্থান তৈরি করা হয়েছে।', 'info');
    return newSpot;
  }

  /**
   * Accept / Approve a contributor's tourist spot
   */
  static async acceptExploreSpot(id: string): Promise<boolean> {
    return this.approveSubmission('spot', id);
  }

  /**
   * Add a visitor review to a spot
   */
  static async addSpotReview(
    spotId: string,
    review: { author: string; rating: number; comment: string; location?: string }
  ): Promise<SpotReview> {
    const newReview: SpotReview = {
      id: `rev-${Date.now()}`,
      author: review.author,
      rating: review.rating,
      comment: review.comment,
      location: review.location || 'বগুড়া',
      date: '২০২৬',
      isApproved: true,
      status: 'approved',
      spotId
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('spot_reviews')
          .insert([
            {
              spot_id: spotId,
              author: review.author,
              rating: review.rating,
              comment: review.comment,
              location: review.location || null
            }
          ])
          .select()
          .single();

        if (!error && data) {
          newReview.id = data.id;
          newReview.date = data.created_at ? data.created_at.split('T')[0] : '২০২৬';
        }
      } catch (err) {
        console.warn('Supabase review insert fallback to memory:', err);
      }
    }

    const targetSpot = memoryExploreSpots.find(s => s.id === spotId);
    if (targetSpot) {
      newReview.spotTitle = targetSpot.title;
      if (!targetSpot.reviews) targetSpot.reviews = [];
      targetSpot.reviews.unshift(newReview);
      savePersistentSpots(memoryExploreSpots);
    }

    memorySpotReviews.unshift(newReview);
    return newReview;
  }

  // ==========================================
  // COMMUNITY POSTS
  // ==========================================
  static async getCommunityPosts(
    category?: string,
    upazila?: string,
    bloodGroup?: string,
    includePending = false
  ): Promise<CommunityPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let queryBuilder = supabase
          .from('community_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (!includePending) {
          queryBuilder = queryBuilder.eq('is_approved', true);
        }
        if (category) {
          queryBuilder = queryBuilder.eq('category', category);
        }
        if (upazila && upazila !== 'ALL') {
          queryBuilder = queryBuilder.eq('upazila', upazila);
        }
        if (bloodGroup && bloodGroup !== 'ALL') {
          queryBuilder = queryBuilder.eq('blood_group', bloodGroup);
        }

        const { data, error } = await queryBuilder;
        if (!error && data && data.length > 0) {
          return data.map(item => ({
            id: item.id,
            category: item.category,
            name: item.name,
            group: item.blood_group,
            role: item.blood_role,
            badge: item.badge,
            upazila: item.upazila,
            detail: item.detail,
            phone: item.phone,
            created_at: item.created_at,
            isApproved: item.is_approved,
            status: item.is_approved ? 'approved' : 'pending'
          }));
        }
      } catch (err) {
        console.warn('Supabase community fetch fallback to memory:', err);
      }
    }

    // In-Memory Fallback using memoryCommunityState
    const targetCategory = category || 'blood';
    let items = memoryCommunityState[targetCategory] || [];

    if (!includePending) {
      items = items.filter(i => i.isApproved !== false && i.status !== 'rejected');
    }

    if (upazila && upazila !== 'ALL') {
      items = items.filter(i => i.upazila === upazila);
    }

    if (targetCategory === 'blood' && bloodGroup && bloodGroup !== 'ALL') {
      items = items.filter(i => i.group === bloodGroup);
    }

    return items;
  }

  static async createCommunityPost(
    post: Omit<CommunityPost, 'id'> & { autoApprove?: boolean }
  ): Promise<CommunityPost> {
    const autoApprove = post.autoApprove ?? false; // Default pending for moderator queue!
    const status = autoApprove ? 'approved' : 'pending';

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('community_posts')
          .insert([
            {
              category: post.category,
              name: post.name,
              blood_group: post.group || null,
              blood_role: post.role || null,
              badge: post.badge || null,
              upazila: post.upazila,
              detail: post.detail,
              phone: post.phone,
              is_approved: autoApprove
            }
          ])
          .select()
          .single();

        if (!error && data) {
          const created: CommunityPost = {
            id: data.id,
            category: data.category,
            name: data.name,
            group: data.blood_group,
            role: data.blood_role,
            badge: data.badge,
            upazila: data.upazila,
            detail: data.detail,
            phone: data.phone,
            created_at: data.created_at,
            isApproved: data.is_approved,
            status: data.is_approved ? 'approved' : 'pending',
            contributorName: post.contributorName || post.name,
            contributorPhone: post.contributorPhone || post.phone
          };

          if (memoryCommunityState[post.category]) {
            memoryCommunityState[post.category].unshift(created);
            savePersistentCommunity(memoryCommunityState);
          }
          return created;
        }
      } catch (err) {
        console.warn('Supabase post insert fallback:', err);
      }
    }

    // Local in-memory prepend with persistent disk write
    const newPost: CommunityPost = {
      ...post,
      id: `comm-${Date.now()}`,
      isApproved: autoApprove,
      status,
      created_at: new Date().toISOString().split('T')[0]
    };

    if (!memoryCommunityState[post.category]) {
      memoryCommunityState[post.category] = [];
    }
    memoryCommunityState[post.category].unshift(newPost);
    savePersistentCommunity(memoryCommunityState);

    return newPost;
  }

  // ==========================================
  // ADMIN PANEL & MODERATION WORKFLOW
  // ==========================================

  /**
   * Fetch all submissions for Admin Panel (spots, community, reviews)
   */
  static async getAllAdminSubmissions(filter?: {
    type?: string;
    status?: string;
    search?: string;
    upazila?: string;
  }) {
    // 1. Gather Spots (freshly synced from persistent storage / Supabase)
    let spots = await this.getDetailedExploreSpots(undefined, undefined, true);

    // 2. Gather Community posts
    let community: CommunityPost[] = [];
    Object.keys(memoryCommunityState).forEach(cat => {
      community.push(...memoryCommunityState[cat]);
    });

    // 3. Gather Reviews
    let reviews: SpotReview[] = [...memorySpotReviews];
    memoryExploreSpots.forEach(s => {
      if (s.reviews && s.reviews.length > 0) {
        s.reviews.forEach(r => {
          if (!reviews.some(existing => existing.id === r.id)) {
            reviews.push({ ...r, spotId: s.id, spotTitle: s.title });
          }
        });
      }
    });

    // Calculate global counts
    const pendingSpots = spots.filter(s => s.status === 'pending' || !s.isApproved).length;
    const pendingComm = community.filter(c => c.status === 'pending' || !c.isApproved).length;
    const pendingRevs = reviews.filter(r => r.status === 'pending' || !r.isApproved).length;

    const approvedSpots = spots.filter(s => s.status === 'approved' || s.isApproved).length;
    const approvedComm = community.filter(c => c.status === 'approved' || c.isApproved).length;
    const approvedRevs = reviews.filter(r => r.status === 'approved' || r.isApproved).length;

    const rejectedSpots = spots.filter(s => s.status === 'rejected').length;
    const rejectedComm = community.filter(c => c.status === 'rejected').length;
    const rejectedRevs = reviews.filter(r => r.status === 'rejected').length;

    // Apply Filters if provided
    if (filter?.status && filter.status !== 'all') {
      const st = filter.status;
      if (st === 'pending') {
        spots = spots.filter(s => s.status === 'pending' || !s.isApproved);
        community = community.filter(c => c.status === 'pending' || !c.isApproved);
        reviews = reviews.filter(r => r.status === 'pending' || !r.isApproved);
      } else if (st === 'approved') {
        spots = spots.filter(s => s.status === 'approved' || (s.isApproved && s.status !== 'rejected'));
        community = community.filter(c => c.status === 'approved' || (c.isApproved && c.status !== 'rejected'));
        reviews = reviews.filter(r => r.status === 'approved' || (r.isApproved && r.status !== 'rejected'));
      } else if (st === 'rejected') {
        spots = spots.filter(s => s.status === 'rejected');
        community = community.filter(c => c.status === 'rejected');
        reviews = reviews.filter(r => r.status === 'rejected');
      }
    }

    if (filter?.upazila && filter.upazila !== 'ALL') {
      spots = spots.filter(s => s.upazila === filter.upazila);
      community = community.filter(c => c.upazila === filter.upazila);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      spots = spots.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.contributor.name.toLowerCase().includes(q) ||
        (s.contributor.phone && s.contributor.phone.includes(q))
      );
      community = community.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.detail.toLowerCase().includes(q) ||
        c.phone.includes(q)
      );
      reviews = reviews.filter(r =>
        r.author.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q)
      );
    }

    return {
      spots,
      community,
      reviews,
      counts: {
        totalPending: pendingSpots + pendingComm + pendingRevs,
        totalApproved: approvedSpots + approvedComm + approvedRevs,
        totalRejected: rejectedSpots + rejectedComm + rejectedRevs,
        total: spots.length + community.length + reviews.length,
        spotsPending: pendingSpots,
        communityPending: pendingComm,
        reviewsPending: pendingRevs,
        spotsApproved: approvedSpots,
        communityApproved: approvedComm,
        reviewsApproved: approvedRevs
      }
    };
  }

  /**
   * Auto-detect submission type from ID across spots, community posts, reviews, and institutes
   */
  static async detectSubmissionType(id: string): Promise<'spot' | 'community' | 'review' | 'education' | null> {
    if (!id) return null;

    // 1. Check spots
    let spot = memoryExploreSpots.find(s => s.id === id);
    if (!spot) {
      const diskSpots = loadInitialSpots();
      if (diskSpots.some(s => s.id === id)) return 'spot';
    } else {
      return 'spot';
    }

    // 2. Check community (memory + disk)
    for (const cat of Object.keys(memoryCommunityState)) {
      if (memoryCommunityState[cat].some(c => c.id === id)) return 'community';
    }
    const diskComm = loadInitialCommunity();
    for (const cat of Object.keys(diskComm)) {
      if (diskComm[cat].some(c => c.id === id)) {
        memoryCommunityState = diskComm;
        return 'community';
      }
    }

    // 3. Check reviews
    if (memorySpotReviews.some(r => r.id === id)) return 'review';
    for (const s of memoryExploreSpots) {
      if (s.reviews?.some(r => r.id === id)) return 'review';
    }

    // 4. Check educational institutes
    if (memoryInstitutes.some(i => i.id === id || i.eiin === id)) return 'education';
    const diskInst = loadInitialInstitutes();
    if (diskInst.some(i => i.id === id || i.eiin === id)) {
      memoryInstitutes = diskInst;
      return 'education';
    }

    return null;
  }

  /**
   * Approve any submission (spot, community, review, education) with disk & cross-type safety net
   */
  static async approveSubmission(type: 'spot' | 'community' | 'review' | 'education' | string, id: string): Promise<boolean> {
    if (!id) return false;

    // 1. Primary check based on requested type
    if (type === 'spot') {
      let spot = memoryExploreSpots.find(s => s.id === id);
      if (!spot) {
        const diskSpots = loadInitialSpots();
        const diskSpot = diskSpots.find(s => s.id === id);
        if (diskSpot) {
          memoryExploreSpots = diskSpots;
          spot = memoryExploreSpots.find(s => s.id === id);
        }
      }
      if (spot) {
        spot.isApproved = true;
        spot.status = 'approved';
        spot.rejectReason = undefined;
        savePersistentSpots(memoryExploreSpots);

        if (isSupabaseConfigured && supabase) {
          try {
            await supabase.from('tourist_spots').update({ is_approved: true }).eq('id', id);
          } catch (err) {
            console.warn('Supabase spot approve fallback:', err);
          }
        }
        return true;
      }
    } else if (type === 'community') {
      let found = false;
      for (const cat of Object.keys(memoryCommunityState)) {
        const item = memoryCommunityState[cat].find(c => c.id === id);
        if (item) {
          item.isApproved = true;
          item.status = 'approved';
          item.rejectReason = undefined;
          found = true;
          break;
        }
      }
      if (!found) {
        const diskComm = loadInitialCommunity();
        for (const cat of Object.keys(diskComm)) {
          const item = diskComm[cat].find(c => c.id === id);
          if (item) {
            item.isApproved = true;
            item.status = 'approved';
            item.rejectReason = undefined;
            memoryCommunityState = diskComm;
            found = true;
            break;
          }
        }
      }
      if (found) {
        savePersistentCommunity(memoryCommunityState);

        if (isSupabaseConfigured && supabase) {
          try {
            await supabase.from('community_posts').update({ is_approved: true }).eq('id', id);
          } catch (err) {
            console.warn('Supabase community approve fallback:', err);
          }
        }
        return true;
      }
    } else if (type === 'review') {
      const rev = memorySpotReviews.find(r => r.id === id);
      if (rev) {
        rev.isApproved = true;
        rev.status = 'approved';
        rev.rejectReason = undefined;
        return true;
      }
      for (const spot of memoryExploreSpots) {
        const r = spot.reviews?.find(rev => rev.id === id);
        if (r) {
          r.isApproved = true;
          r.status = 'approved';
          r.rejectReason = undefined;
          savePersistentSpots(memoryExploreSpots);
          return true;
        }
      }
    } else if (type === 'education' || type === 'institute') {
      let inst = memoryInstitutes.find(i => i.id === id || i.eiin === id);
      if (!inst) {
        const diskInst = loadInitialInstitutes();
        const foundInst = diskInst.find(i => i.id === id || i.eiin === id);
        if (foundInst) {
          memoryInstitutes = diskInst;
          inst = memoryInstitutes.find(i => i.id === id || i.eiin === id);
        }
      }
      if (inst) {
        inst.status = 'approved';
        savePersistentInstitutes(memoryInstitutes);
        return true;
      }
    }

    // 2. Cross-category fallback safety net (if type was imprecise or omitted)
    let anySpot = memoryExploreSpots.find(s => s.id === id);
    if (!anySpot) {
      const diskSpots = loadInitialSpots();
      const diskSpot = diskSpots.find(s => s.id === id);
      if (diskSpot) {
        memoryExploreSpots = diskSpots;
        anySpot = memoryExploreSpots.find(s => s.id === id);
      }
    }
    if (anySpot) {
      anySpot.isApproved = true;
      anySpot.status = 'approved';
      anySpot.rejectReason = undefined;
      savePersistentSpots(memoryExploreSpots);
      return true;
    }

    for (const cat of Object.keys(memoryCommunityState)) {
      const item = memoryCommunityState[cat].find(c => c.id === id);
      if (item) {
        item.isApproved = true;
        item.status = 'approved';
        item.rejectReason = undefined;
        savePersistentCommunity(memoryCommunityState);
        return true;
      }
    }
    const diskComm = loadInitialCommunity();
    for (const cat of Object.keys(diskComm)) {
      const item = diskComm[cat].find(c => c.id === id);
      if (item) {
        item.isApproved = true;
        item.status = 'approved';
        item.rejectReason = undefined;
        memoryCommunityState = diskComm;
        savePersistentCommunity(memoryCommunityState);
        return true;
      }
    }

    const anyRev = memorySpotReviews.find(r => r.id === id);
    if (anyRev) {
      anyRev.isApproved = true;
      anyRev.status = 'approved';
      anyRev.rejectReason = undefined;
      return true;
    }
    for (const spot of memoryExploreSpots) {
      const r = spot.reviews?.find(rev => rev.id === id);
      if (r) {
        r.isApproved = true;
        r.status = 'approved';
        r.rejectReason = undefined;
        savePersistentSpots(memoryExploreSpots);
        return true;
      }
    }

    const anyInst = memoryInstitutes.find(i => i.id === id || i.eiin === id);
    if (anyInst) {
      anyInst.status = 'approved';
      savePersistentInstitutes(memoryInstitutes);
      return true;
    }

    return false;
  }

  /**
   * Reject any submission with feedback reason
   */
  static async rejectSubmission(
    type: 'spot' | 'community' | 'review' | string,
    id: string,
    reason?: string
  ): Promise<boolean> {
    const feedback = reason || 'তথ্য যাচাই বা সংশোধন প্রয়োজন';

    if (type === 'spot') {
      let spot = memoryExploreSpots.find(s => s.id === id);
      if (!spot) {
        const diskSpots = loadInitialSpots();
        const diskSpot = diskSpots.find(s => s.id === id);
        if (diskSpot) {
          memoryExploreSpots = diskSpots;
          spot = memoryExploreSpots.find(s => s.id === id);
        }
      }
      if (spot) {
        spot.isApproved = false;
        spot.status = 'rejected';
        spot.rejectReason = feedback;
        savePersistentSpots(memoryExploreSpots);

        if (isSupabaseConfigured && supabase) {
          try {
            await supabase.from('tourist_spots').update({ is_approved: false }).eq('id', id);
          } catch (err) {
            console.warn('Supabase spot reject fallback:', err);
          }
        }
        return true;
      }
    } else if (type === 'community') {
      for (const cat of Object.keys(memoryCommunityState)) {
        const item = memoryCommunityState[cat].find(c => c.id === id);
        if (item) {
          item.isApproved = false;
          item.status = 'rejected';
          item.rejectReason = feedback;
          savePersistentCommunity(memoryCommunityState);

          if (isSupabaseConfigured && supabase) {
            try {
              await supabase.from('community_posts').update({ is_approved: false }).eq('id', id);
            } catch (err) {
              console.warn('Supabase community reject fallback:', err);
            }
          }
          return true;
        }
      }
    } else if (type === 'review') {
      const rev = memorySpotReviews.find(r => r.id === id);
      if (rev) {
        rev.isApproved = false;
        rev.status = 'rejected';
        rev.rejectReason = feedback;
        return true;
      }
      for (const spot of memoryExploreSpots) {
        const r = spot.reviews?.find(rev => rev.id === id);
        if (r) {
          r.isApproved = false;
          r.status = 'rejected';
          r.rejectReason = feedback;
          savePersistentSpots(memoryExploreSpots);
          return true;
        }
      }
    } else if (type === 'education' || type === 'institute') {
      let inst = memoryInstitutes.find(i => i.id === id || i.eiin === id);
      if (inst) {
        inst.status = 'pending';
        savePersistentInstitutes(memoryInstitutes);
        return true;
      }
    }

    // Safety net lookup
    for (const cat of Object.keys(memoryCommunityState)) {
      const item = memoryCommunityState[cat].find(c => c.id === id);
      if (item) {
        item.isApproved = false;
        item.status = 'rejected';
        item.rejectReason = feedback;
        savePersistentCommunity(memoryCommunityState);
        return true;
      }
    }
    const anySpot = memoryExploreSpots.find(s => s.id === id);
    if (anySpot) {
      anySpot.isApproved = false;
      anySpot.status = 'rejected';
      anySpot.rejectReason = feedback;
      savePersistentSpots(memoryExploreSpots);
      return true;
    }

    const anyInst = memoryInstitutes.find(i => i.id === id || i.eiin === id);
    if (anyInst) {
      anyInst.status = 'pending';
      savePersistentInstitutes(memoryInstitutes);
      return true;
    }

    return false;
  }

  /**
   * Delete any submission permanently
   */
  static async deleteSubmission(type: 'spot' | 'community' | 'review' | 'education' | string, id: string): Promise<boolean> {
    if (type === 'spot') {
      const idx = memoryExploreSpots.findIndex(s => s.id === id);
      if (idx !== -1) {
        memoryExploreSpots.splice(idx, 1);
        savePersistentSpots(memoryExploreSpots);

        if (isSupabaseConfigured && supabase) {
          try {
            await supabase.from('tourist_spots').delete().eq('id', id);
          } catch (err) {
            console.warn('Supabase spot delete fallback:', err);
          }
        }
        return true;
      }
    } else if (type === 'community') {
      for (const cat of Object.keys(memoryCommunityState)) {
        const idx = memoryCommunityState[cat].findIndex(c => c.id === id);
        if (idx !== -1) {
          memoryCommunityState[cat].splice(idx, 1);
          savePersistentCommunity(memoryCommunityState);

          if (isSupabaseConfigured && supabase) {
            try {
              await supabase.from('community_posts').delete().eq('id', id);
            } catch (err) {
              console.warn('Supabase community delete fallback:', err);
            }
          }
          return true;
        }
      }
    } else if (type === 'review') {
      const idx = memorySpotReviews.findIndex(r => r.id === id);
      if (idx !== -1) {
        memorySpotReviews.splice(idx, 1);
        return true;
      }
      for (const spot of memoryExploreSpots) {
        if (spot.reviews) {
          const rIdx = spot.reviews.findIndex(rev => rev.id === id);
          if (rIdx !== -1) {
            spot.reviews.splice(rIdx, 1);
            savePersistentSpots(memoryExploreSpots);
            return true;
          }
        }
      }
    } else if (type === 'education' || type === 'institute') {
      const idx = memoryInstitutes.findIndex(i => i.id === id || i.eiin === id);
      if (idx !== -1) {
        memoryInstitutes.splice(idx, 1);
        savePersistentInstitutes(memoryInstitutes);
        return true;
      }
    }

    // Safety net for delete
    for (const cat of Object.keys(memoryCommunityState)) {
      const idx = memoryCommunityState[cat].findIndex(c => c.id === id);
      if (idx !== -1) {
        memoryCommunityState[cat].splice(idx, 1);
        savePersistentCommunity(memoryCommunityState);
        return true;
      }
    }
    const sIdx = memoryExploreSpots.findIndex(s => s.id === id);
    if (sIdx !== -1) {
      memoryExploreSpots.splice(sIdx, 1);
      savePersistentSpots(memoryExploreSpots);
      return true;
    }
    const eIdx = memoryInstitutes.findIndex(i => i.id === id || i.eiin === id);
    if (eIdx !== -1) {
      memoryInstitutes.splice(eIdx, 1);
      savePersistentInstitutes(memoryInstitutes);
      return true;
    }

    // Safety net lookup
    for (const cat of Object.keys(memoryCommunityState)) {
      const idx = memoryCommunityState[cat].findIndex(c => c.id === id);
      if (idx !== -1) {
        memoryCommunityState[cat].splice(idx, 1);
        savePersistentCommunity(memoryCommunityState);
        return true;
      }
    }
    const spotIdx = memoryExploreSpots.findIndex(s => s.id === id);
    if (spotIdx !== -1) {
      memoryExploreSpots.splice(spotIdx, 1);
      savePersistentSpots(memoryExploreSpots);
      return true;
    }

    return false;
  }

  /**
   * Update submission details (edit and approve)
   */
  static async updateSubmission(type: 'spot' | 'community' | string, id: string, updates: any): Promise<boolean> {
    if (type === 'spot') {
      const spot = memoryExploreSpots.find(s => s.id === id);
      if (spot) {
        Object.assign(spot, updates);
        savePersistentSpots(memoryExploreSpots);
        return true;
      }
    } else if (type === 'community') {
      for (const cat of Object.keys(memoryCommunityState)) {
        const item = memoryCommunityState[cat].find(c => c.id === id);
        if (item) {
          Object.assign(item, updates);
          savePersistentCommunity(memoryCommunityState);
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Find contributions by contributor identifier (phone / email / name)
   */
  static async getContributorSubmissions(identifier: string) {
    const idf = identifier.trim().toLowerCase();
    if (!idf) return { spots: [], community: [] };

    const spots = memoryExploreSpots.filter(s => {
      const c = s.contributor;
      return (
        (c.phone && c.phone.toLowerCase().includes(idf)) ||
        (c.email && c.email.toLowerCase().includes(idf)) ||
        (c.name && c.name.toLowerCase().includes(idf))
      );
    });

    const community: CommunityPost[] = [];
    Object.keys(memoryCommunityState).forEach(cat => {
      memoryCommunityState[cat].forEach(p => {
        if (
          (p.phone && p.phone.toLowerCase().includes(idf)) ||
          (p.name && p.name.toLowerCase().includes(idf)) ||
          (p.contributorName && p.contributorName.toLowerCase().includes(idf)) ||
          (p.contributorPhone && p.contributorPhone.toLowerCase().includes(idf))
        ) {
          community.push(p);
        }
      });
    });

    return { spots, community };
  }

  // ==========================================
  // SYSTEM ADMIN & INFRASTRUCTURE CONTROLS
  // ==========================================

  /**
   * Add a new hospital or diagnostic clinic
   */
  static async addHospital(hospital: Hospital): Promise<Hospital> {
    const item: Hospital = {
      ...hospital,
      id: hospital.id || `hosp-${Date.now()}`
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('hospitals').insert([
          {
            name: item.name,
            en_name: item.enName || item.name,
            type: item.type,
            type_label: item.typeLabel,
            address: item.address,
            phone: item.phone,
            emergency: item.emergency
          }
        ]);
      } catch (e) {
        console.warn('Supabase hospital insert fallback', e);
      }
    }

    memoryHospitals.unshift(item);
    this.addAuditLog('HOSPITAL_ADD', item.name, `নতুন হাসপাতাল ডিরেক্টরিতে যুক্ত হয়েছে: ${item.address}`, 'success');
    return item;
  }

  /**
   * Update hospital information
   */
  static async updateHospital(nameOrId: string, updates: Partial<Hospital>): Promise<boolean> {
    const target = memoryHospitals.find(h => h.id === nameOrId || h.name === nameOrId);
    if (target) {
      Object.assign(target, updates);
      this.addAuditLog('HOSPITAL_UPDATE', target.name, 'হাসপাতালের তথ্য আপডেট করা হয়েছে।', 'info');
      return true;
    }
    return false;
  }

  /**
   * Delete hospital
   */
  static async deleteHospital(nameOrId: string): Promise<boolean> {
    const idx = memoryHospitals.findIndex(h => h.id === nameOrId || h.name === nameOrId);
    if (idx !== -1) {
      const removed = memoryHospitals.splice(idx, 1)[0];
      this.addAuditLog('HOSPITAL_DELETE', removed.name, 'হাসপাতাল তালিকা থেকে মুছে ফেলা হয়েছে।', 'warning');
      return true;
    }
    return false;
  }

  /**
   * Add an emergency hotline contact
   */
  static async addEmergencyContact(contact: EmergencyContact): Promise<EmergencyContact> {
    memoryEmergency.unshift(contact);
    this.addAuditLog('EMERGENCY_ADD', contact.title, `জরুরি সেবা হটলাইন যুক্ত হয়েছে: ${contact.number}`, 'success');
    return contact;
  }

  /**
   * Update emergency contact
   */
  static async updateEmergencyContact(title: string, updates: Partial<EmergencyContact>): Promise<boolean> {
    const target = memoryEmergency.find(e => e.title === title);
    if (target) {
      Object.assign(target, updates);
      this.addAuditLog('EMERGENCY_UPDATE', title, 'জরুরি সেবা হটলাইন আপডেট করা হয়েছে।', 'info');
      return true;
    }
    return false;
  }

  /**
   * Delete emergency contact
   */
  static async deleteEmergencyContact(title: string): Promise<boolean> {
    const idx = memoryEmergency.findIndex(e => e.title === title);
    if (idx !== -1) {
      memoryEmergency.splice(idx, 1);
      this.addAuditLog('EMERGENCY_DELETE', title, 'জরুরি সেবা মুছে ফেলা হয়েছে।', 'warning');
      return true;
    }
    return false;
  }

  // ==========================================
  // UPAZILAS & UNIONS MASTER CRUD
  // ==========================================

  /**
   * Add a new upazila
   */
  static async addUpazila(upazila: Upazila, detailed?: DetailedUpazilaData): Promise<Upazila> {
    memoryUpazilas.push(upazila);
    if (detailed) {
      memoryDetailedUpazilas.push(detailed);
    }
    this.addAuditLog('UPAZILA_ADD', upazila.name, `নতুন উপজেলা তালিকাভুক্ত হয়েছে: ${upazila.enName}`, 'success');
    return upazila;
  }

  /**
   * Update upazila
   */
  static async updateUpazila(nameOrSerial: string, updates: Partial<Upazila & DetailedUpazilaData>): Promise<boolean> {
    const target = memoryUpazilas.find(u => u.name === nameOrSerial || u.serialBn === nameOrSerial || u.enName.toLowerCase() === nameOrSerial.toLowerCase());
    if (target) {
      Object.assign(target, updates);
      const detailed = memoryDetailedUpazilas.find(u => u.name === nameOrSerial || u.serialBn === nameOrSerial || u.enName.toLowerCase() === nameOrSerial.toLowerCase());
      if (detailed) {
        Object.assign(detailed, updates);
      }
      this.addAuditLog('UPAZILA_UPDATE', target.name, 'উপজেলার তথ্য ও যোগাযোগ আপডেট করা হয়েছে।', 'info');
      return true;
    }
    return false;
  }

  /**
   * Delete upazila
   */
  static async deleteUpazila(nameOrSerial: string): Promise<boolean> {
    const idx = memoryUpazilas.findIndex(u => u.name === nameOrSerial || u.serialBn === nameOrSerial);
    if (idx !== -1) {
      const removed = memoryUpazilas.splice(idx, 1)[0];
      const dIdx = memoryDetailedUpazilas.findIndex(u => u.name === nameOrSerial || u.serialBn === nameOrSerial);
      if (dIdx !== -1) {
        memoryDetailedUpazilas.splice(dIdx, 1);
      }
      this.addAuditLog('UPAZILA_DELETE', removed.name, 'উপজেলা তালিকা থেকে মুছে ফেলা হয়েছে।', 'warning');
      return true;
    }
    return false;
  }

  /**
   * Add union to upazila
   */
  static async addUnion(upazilaName: string, union: UnionData): Promise<UnionData> {
    const target = memoryDetailedUpazilas.find(u => u.name === upazilaName || u.enName.toLowerCase() === upazilaName.toLowerCase());
    if (target) {
      target.unions.push(union);
      target.unionCount = target.unions.length;
    }
    const simpleTarget = memoryUpazilas.find(u => u.name === upazilaName);
    if (simpleTarget) {
      if (!simpleTarget.unionList.includes(union.name)) {
        simpleTarget.unionList.push(union.name);
      }
    }
    this.addAuditLog('UNION_ADD', union.name, `${upazilaName} উপজেলায় নতুন ইউনিয়ন যুক্ত হয়েছে`, 'success');
    return union;
  }

  /**
   * Update union
   */
  static async updateUnion(upazilaName: string, unionId: string, updates: Partial<UnionData>): Promise<boolean> {
    const target = memoryDetailedUpazilas.find(u => u.name === upazilaName);
    if (target) {
      const union = target.unions.find(un => un.id === unionId || un.name === unionId);
      if (union) {
        Object.assign(union, updates);
        this.addAuditLog('UNION_UPDATE', union.name, 'ইউনিয়নের বিবরণ আপডেট করা হয়েছে।', 'info');
        return true;
      }
    }
    return false;
  }

  /**
   * Delete union
   */
  static async deleteUnion(upazilaName: string, unionId: string): Promise<boolean> {
    const target = memoryDetailedUpazilas.find(u => u.name === upazilaName);
    if (target) {
      const idx = target.unions.findIndex(un => un.id === unionId || un.name === unionId);
      if (idx !== -1) {
        const removed = target.unions.splice(idx, 1)[0];
        target.unionCount = target.unions.length;
        this.addAuditLog('UNION_DELETE', removed.name, `${upazilaName} থেকে ইউনিয়ন মুছে ফেলা হয়েছে।`, 'warning');
        return true;
      }
    }
    return false;
  }

  // ==========================================
  // TOURIST SPOTS CRUD
  // ==========================================

  /**
   * Update tourist spot
   */
  static async updateExploreSpot(id: string, updates: Partial<DetailedExploreSpot>): Promise<boolean> {
    let spot = memoryExploreSpots.find(s => s.id === id);
    if (!spot) {
      const diskSpots = loadInitialSpots();
      const diskSpot = diskSpots.find(s => s.id === id);
      if (diskSpot) {
        memoryExploreSpots = diskSpots;
        spot = memoryExploreSpots.find(s => s.id === id);
      }
    }
    if (spot) {
      Object.assign(spot, updates);
      if (!Array.isArray(spot.gallery) || spot.gallery.length === 0) {
        spot.gallery = spot.coverImage ? [spot.coverImage] : [];
      }
      savePersistentSpots(memoryExploreSpots);

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('tourist_spots').update({
            title: spot.title,
            en_title: spot.enTitle,
            location: spot.location,
            upazila: spot.upazila,
            category: spot.category,
            category_bn: spot.categoryBn,
            tag: spot.tag,
            cover_image: spot.coverImage,
            gallery: Array.isArray(spot.gallery) ? spot.gallery : (spot.coverImage ? [spot.coverImage] : []),
            short_desc: spot.shortDesc,
            history: spot.history,
            architecture: spot.architecture,
            how_to_reach: spot.howToReach,
            highlights: Array.isArray(spot.highlights) ? spot.highlights : [],
            timings: spot.timings,
            entry_fee: spot.entryFee,
            best_time: spot.bestTime,
            map_coordinates: spot.mapCoordinates,
            map_url: spot.mapUrl
          }).eq('id', id);
        } catch (e) {
          console.warn('Supabase spot update fallback', e);
        }
      }
      this.addAuditLog('SPOT_UPDATE', spot.title, 'দর্শনীয় স্থানের তথ্য আপডেট করা হয়েছে।', 'info');
      return true;
    }
    return false;
  }

  /**
   * Delete tourist spot
   */
  static async deleteExploreSpot(id: string): Promise<boolean> {
    return this.deleteSubmission('spot', id);
  }

  // ==========================================
  // COMMUNITY & BLOOD CRUD
  // ==========================================

  /**
   * Update community post
   */
  static async updateCommunityPost(id: string, updates: Partial<CommunityPost>): Promise<boolean> {
    for (const cat of Object.keys(memoryCommunityState)) {
      const item = memoryCommunityState[cat].find(c => c.id === id);
      if (item) {
        Object.assign(item, updates);
        this.addAuditLog('COMMUNITY_UPDATE', item.name, 'কমিউনিটি এন্ট্রি আপডেট করা হয়েছে।', 'info');
        return true;
      }
    }
    return false;
  }

  /**
   * Delete community post
   */
  static async deleteCommunityPost(id: string): Promise<boolean> {
    return this.deleteSubmission('community', id);
  }

  // ==========================================
  // WEBSITE CONTENT CMS (HERO, BANNERS, NOTICES)
  // ==========================================

  /**
   * Get dynamic site content
   */
  static async getSiteContent(): Promise<SiteContent> {
    return memorySiteContent;
  }

  /**
   * Update dynamic site content
   */
  static async updateSiteContent(updates: Partial<SiteContent>): Promise<SiteContent> {
    Object.assign(memorySiteContent, updates);
    if (updates.stats) {
      Object.assign(memorySiteContent.stats, updates.stats);
    }
    this.addAuditLog('CMS_UPDATE', 'SiteContent', 'ওয়েবসাইটের ব্যানার ও টেক্সট কন্টেন্ট আপডেট করা হয়েছে।', 'success');
    return memorySiteContent;
  }

  /**
   * Add a system audit log entry
   */
  static addAuditLog(
    action: string,
    target: string,
    details: string,
    status: 'success' | 'warning' | 'info' = 'info'
  ) {
    systemAuditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      action,
      target,
      details,
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      status
    });
    if (systemAuditLogs.length > 50) {
      systemAuditLogs.pop();
    }
  }

  // ==========================================
  // EDUCATIONAL INSTITUTES & COLLEGES CRUD
  // ==========================================

  /**
   * Get all educational institutes with filtering, search, sorting and pagination
   */
  static async getEducationalInstitutes(filter?: {
    category?: string;
    upazila?: string;
    search?: string;
    sort?: 'rank' | 'gpa5' | 'name' | 'established';
    page?: number;
    limit?: number;
  }) {
    if (memoryInstitutes.length === 0) {
      memoryInstitutes = loadInitialInstitutes();
    }

    let list = [...memoryInstitutes];

    if (filter?.category && filter.category !== 'all') {
      if (filter.category === 'top50') {
        list = list.filter(i => typeof i.rank === 'number' && i.rank > 0 && i.rank <= 50);
      } else {
        list = list.filter(i => i.category === filter.category);
      }
    }

    if (filter?.upazila && filter.upazila !== 'ALL') {
      list = list.filter(i => i.upazila === filter.upazila);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.enName.toLowerCase().includes(q) ||
        (i.eiin && i.eiin.includes(q)) ||
        i.location.toLowerCase().includes(q) ||
        i.upazila.toLowerCase().includes(q) ||
        (i.principal && i.principal.toLowerCase().includes(q))
      );
    }

    // Sort
    const sortBy = filter?.sort || 'rank';
    if (sortBy === 'rank') {
      list.sort((a, b) => {
        const rA = a.rank && a.rank > 0 ? a.rank : 9999;
        const rB = b.rank && b.rank > 0 ? b.rank : 9999;
        return rA - rB;
      });
    } else if (sortBy === 'gpa5') {
      list.sort((a, b) => {
        const gA = parseInt((a.stats?.gpa5 || '0').replace(/,/g, ''), 10);
        const gB = parseInt((b.stats?.gpa5 || '0').replace(/,/g, ''), 10);
        return gB - gA;
      });
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'bn'));
    }

    const total = list.length;
    const page = filter?.page || 1;
    const limit = filter?.limit !== undefined ? filter.limit : 50;
    const paginated = limit > 0 ? list.slice((page - 1) * limit, page * limit) : list;
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;

    return {
      institutes: paginated,
      total,
      page,
      limit,
      totalPages
    };
  }

  /**
   * Get single educational institute by ID or EIIN
   */
  static async getEducationalInstituteById(idOrEiin: string): Promise<EducationalInstitute | null> {
    if (memoryInstitutes.length === 0) {
      memoryInstitutes = loadInitialInstitutes();
    }
    const found = memoryInstitutes.find(i => i.id === idOrEiin || i.eiin === idOrEiin);
    return found || null;
  }

  /**
   * Create new educational institute
   */
  static async createEducationalInstitute(data: Omit<EducationalInstitute, 'id'> & { id?: string }): Promise<EducationalInstitute> {
    let rawSlug = (data.id || '').trim();
    if (!rawSlug && data.enName) {
      rawSlug = data.enName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
    if (!rawSlug) {
      rawSlug = `inst-${Date.now()}`;
    }

    const newInst: EducationalInstitute = {
      id: rawSlug,
      name: data.name,
      enName: data.enName || data.name,
      eiin: data.eiin || '',
      rank: data.rank,
      category: data.category || 'college',
      categoryBn: data.categoryBn || 'কলেজ',
      upazila: data.upazila || 'বগুড়া সদর',
      location: data.location || '',
      established: data.established || '১৯৮০',
      management: data.management || 'বেসরকারি',
      educationLevel: data.educationLevel || 'উচ্চ মাধ্যমিক',
      board: data.board || 'রাজশাহী শিক্ষা বোর্ড',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
      logo: data.logo,
      phone: data.phone || '',
      email: data.email,
      website: data.website,
      principal: data.principal,
      stats: data.stats || {},
      facilities: Array.isArray(data.facilities) ? data.facilities : ['লাইব্রেরি', 'বিজ্ঞান ল্যাবরেটরি'],
      courses: Array.isArray(data.courses) ? data.courses : ['উচ্চ মাধ্যমিক (বিজ্ঞান, মানবিক, ব্যবসায় শিক্ষা)'],
      shortDesc: data.shortDesc || '',
      history: data.history || '',
      mapUrl: data.mapUrl,
      isFeatured: data.isFeatured ?? false,
      status: 'approved'
    };

    memoryInstitutes.unshift(newInst);
    savePersistentInstitutes(memoryInstitutes);
    this.addAuditLog('INSTITUTE_CREATE', newInst.name, `নতুন প্রতিষ্ঠান ${newInst.name} যোগ করা হয়েছে।`, 'info');

    return newInst;
  }

  /**
   * Update existing educational institute
   */
  static async updateEducationalInstitute(id: string, updates: Partial<EducationalInstitute>): Promise<boolean> {
    const inst = memoryInstitutes.find(i => i.id === id || i.eiin === id);
    if (inst) {
      Object.assign(inst, updates);
      savePersistentInstitutes(memoryInstitutes);
      this.addAuditLog('INSTITUTE_UPDATE', inst.name, `${inst.name} তথ্য আপডেট করা হয়েছে।`, 'info');
      return true;
    }
    return false;
  }

  /**
   * Delete educational institute
   */
  static async deleteEducationalInstitute(id: string): Promise<boolean> {
    const idx = memoryInstitutes.findIndex(i => i.id === id || i.eiin === id);
    if (idx !== -1) {
      const removed = memoryInstitutes.splice(idx, 1)[0];
      savePersistentInstitutes(memoryInstitutes);
      this.addAuditLog('INSTITUTE_DELETE', removed.name, `${removed.name} স্থায়ীভাবে মুছে ফেলা হয়েছে।`, 'warning');
      return true;
    }
    return false;
  }

  /**
   * System diagnostics and global telemetry
   */
  static async getSystemDiagnostics() {
    let communityCount = 0;
    Object.keys(memoryCommunityState).forEach(cat => {
      communityCount += memoryCommunityState[cat].length;
    });

    const pendingSpots = memoryExploreSpots.filter(s => s.status === 'pending' || !s.isApproved).length;
    let pendingCommunity = 0;
    Object.keys(memoryCommunityState).forEach(cat => {
      pendingCommunity += memoryCommunityState[cat].filter(c => c.status === 'pending' || !c.isApproved).length;
    });
    const pendingReviews = memorySpotReviews.filter(r => r.status === 'pending' || !r.isApproved).length;

    return {
      environment: {
        nodeVersion: process.version,
        framework: 'Next.js 14 (App Router) + NestJS Service Pattern',
        deployment: 'Vercel Serverless Ready',
        platform: 'Windows / Linux Web'
      },
      supabase: {
        isConfigured: isSupabaseConfigured,
        url: process.env.SUPABASE_URL || 'https://ooyflhbhxpbqaviyjsaq.supabase.co',
        status: isSupabaseConfigured ? 'সক্রিয় (Connected)' : 'ডেমো মোড (Fallback Memory Active)',
        poolerLatencyMs: 42
      },
      entityCounts: {
        upazilas: 12,
        unions: 108,
        villages: 2692,
        hospitals: memoryHospitals.length,
        emergencyContacts: memoryEmergency.length,
        exploreSpots: memoryExploreSpots.length,
        institutes: memoryInstitutes.length,
        communityPosts: communityCount,
        reviews: memorySpotReviews.length,
        pendingTotal: pendingSpots + pendingCommunity + pendingReviews
      },
      settings: systemSettings,
      auditLogs: systemAuditLogs
    };
  }

  /**
   * Update system settings
   */
  static async updateSystemSettings(updates: Partial<typeof systemSettings>) {
    Object.assign(systemSettings, updates);
    this.addAuditLog('SETTINGS_UPDATE', 'SystemConfig', 'সিস্টেম কনফিগারেশন সেটিংস পরিবর্তন করা হয়েছে।', 'info');
    return systemSettings;
  }

  /**
   * Full database JSON dump for 1-click backup
   */
  static async getFullBackupData() {
    return {
      meta: {
        district: 'Bogura (বগুড়া)',
        country: 'Bangladesh',
        exportedAt: new Date().toISOString(),
        version: '1.0.0-amar-bogura'
      },
      siteContent: memorySiteContent,
      upazilas: memoryUpazilas,
      detailedUpazilas: memoryDetailedUpazilas,
      hospitals: memoryHospitals,
      emergencyContacts: memoryEmergency,
      exploreSpots: memoryExploreSpots,
      institutes: memoryInstitutes,
      communityPosts: memoryCommunityState,
      reviews: memorySpotReviews,
      systemSettings,
      auditLogs: systemAuditLogs
    };
  }
}
