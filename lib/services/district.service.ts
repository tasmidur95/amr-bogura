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
  CommunityPost
} from '@/lib/data/district-data';

import {
  detailedExploreSpots,
  DetailedExploreSpot,
  SpotReview
} from '@/lib/data/explore-data';

/**
 * In-memory state for explore spots and pending contributions
 */
let memoryExploreSpots: DetailedExploreSpot[] = [
  ...detailedExploreSpots.map(s => ({
    ...s,
    isApproved: true,
    status: 'approved' as const
  })),
  {
    id: 'suka-shakuni-mound',
    title: 'সুকা শকুনী প্রাচীন প্রত্নতাত্ত্বিক ঢিবি',
    enTitle: 'Suka Shakuni Ancient Archaeological Mound',
    category: 'archaeological',
    categoryBn: 'প্রত্নতাত্ত্বিক নিদর্শন',
    location: 'মুরইল ইউনিয়ন, কাহালু, বগুড়া',
    upazila: 'কাহালু',
    tag: 'নাগরিক প্রস্তাবিত স্থান',
    coverImage: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDesc: 'কাহালু উপজেলার ঐতিহাসিক সমৃদ্ধ প্রাচীন ঢিবি যা এখনো সংরক্ষিত খননকাজের অপেক্ষায় রয়েছে।',
    history: 'সুকা শকুনী ঢিবি বগুড়ার অন্যতম অনাবিষ্কৃত প্রত্নস্থান। স্থানীয় জনশ্রুতি মতে প্রাচীন রাজা ও সুফি সাধকদের স্মৃতিবিজড়িত এই ঢিবিটি প্রাচীন পুণ্ড্রনগরের বহিঃসীমার নিদর্শন।',
    architecture: 'মাটির ঢিবি ও প্রাচীন পোড়ামাটির ইটের অবশিষ্টাংশ।',
    howToReach: 'বগুড়া চারমাথা থেকে কাহালু মুরইল বাসস্ট্যান্ড, সেখান থেকে অটোরিকশায় ৫ মিনিট।',
    highlights: ['প্রাচীন মাটির ঢিবি', 'পুণ্ড্রনগর সমসাময়িক নিদর্শন', 'শান্ত পল্লি পরিবেশ'],
    timings: 'সূর্যোদয় থেকে সূর্যাস্ত',
    entryFee: 'বিনামূল্যে',
    bestTime: 'শীতকাল',
    mapCoordinates: '24.8123, 89.2845',
    mapUrl: 'https://maps.google.com/?q=Kahaloo+Bogura',
    isApproved: false,
    status: 'pending',
    contributor: {
      name: 'আরিফুল ইসলাম তনয়',
      phone: '01719-887766',
      email: 'ariful.kahalu@gmail.com',
      date: '২০২৬-০৩-১৯',
      note: 'কাহালুর এই প্রাচীন স্থানটিকে সরকারিভাবে দ্রুত সংরক্ষণের অনুরোধ জানাচ্ছি।'
    },
    reviews: []
  }
];

/**
 * In-memory state for community posts with approval statuses
 */
let memoryCommunityState: Record<string, CommunityPost[]> = {
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
  // Upazilas
  static async getUpazilas(query?: string, filter?: string): Promise<Upazila[]> {
    let list = [...upazilasData];

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
    return upazilasData[index] || null;
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
          return data.map(item => ({
            id: item.id,
            title: item.title,
            enTitle: item.en_title,
            category: item.category,
            categoryBn: item.category_bn,
            location: item.location,
            upazila: item.upazila,
            tag: item.tag,
            coverImage: item.cover_image,
            gallery: Array.isArray(item.gallery) ? item.gallery : [],
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
            contributor: {
              name: item.contributor_name,
              phone: item.contributor_phone,
              email: item.contributor_email,
              date: item.created_at ? item.created_at.split('T')[0] : '২০২৬',
              note: item.contributor_note
            },
            reviews: []
          }));
        }
      } catch (err) {
        console.warn('Supabase explore fetch fallback to memory:', err);
      }
    }

    // In-memory fallback
    let list = [...memoryExploreSpots];

    if (!includePending) {
      list = list.filter(s => s.isApproved);
    }

    if (category && category !== 'all') {
      list = list.filter(s => s.category === category);
    }

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.enTitle.toLowerCase().includes(q) ||
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

    const found = memoryExploreSpots.find(s => s.id === id);
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
    const slug = spot.id || spot.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `spot-${Date.now()}`;
    const autoApprove = spot.autoApprove ?? false; // Default pending for contributor moderation!
    const status = spot.status || (autoApprove ? 'approved' : 'pending');

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('tourist_spots')
          .insert([
            {
              id: slug,
              title: spot.title,
              en_title: spot.enTitle || spot.title,
              category: spot.category,
              category_bn: spot.categoryBn,
              location: spot.location,
              upazila: spot.upazila,
              tag: spot.tag || 'নাগরিক প্রস্তাবিত স্থান',
              cover_image: spot.coverImage || 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
              gallery: spot.gallery || [],
              short_desc: spot.shortDesc,
              history: spot.history,
              architecture: spot.architecture,
              how_to_reach: spot.howToReach,
              highlights: spot.highlights || [],
              timings: spot.timings || 'উন্মুক্ত',
              entry_fee: spot.entryFee || 'বিনামূল্যে',
              best_time: spot.bestTime || 'সারা বছর',
              map_coordinates: spot.mapCoordinates || '',
              map_url: spot.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(spot.title + ', বগুড়া')}`,
              is_approved: autoApprove,
              contributor_name: spot.contributor.name,
              contributor_phone: spot.contributor.phone || null,
              contributor_email: spot.contributor.email || null,
              contributor_note: spot.contributor.note || null
            }
          ])
          .select()
          .single();

        if (!error && data) {
          const created: DetailedExploreSpot = {
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
            status: data.is_approved ? 'approved' : 'pending',
            contributor: {
              name: data.contributor_name,
              phone: data.contributor_phone,
              email: data.contributor_email,
              date: data.created_at ? data.created_at.split('T')[0] : '২০২৬',
              note: data.contributor_note
            },
            reviews: []
          };
          memoryExploreSpots.unshift(created);
          return created;
        }
      } catch (err) {
        console.warn('Supabase spot insert fallback to memory:', err);
      }
    }

    // Local fallback
    const newSpot: DetailedExploreSpot = {
      id: slug,
      title: spot.title,
      enTitle: spot.enTitle || spot.title,
      category: spot.category,
      categoryBn: spot.categoryBn,
      location: spot.location,
      upazila: spot.upazila,
      tag: spot.tag || 'নাগরিক প্রস্তাবিত স্থান',
      coverImage: spot.coverImage || 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
      gallery: spot.gallery || [],
      shortDesc: spot.shortDesc,
      history: spot.history,
      architecture: spot.architecture,
      howToReach: spot.howToReach,
      highlights: spot.highlights || [],
      timings: spot.timings || 'উন্মুক্ত',
      entryFee: spot.entryFee || 'বিনামূল্যে',
      bestTime: spot.bestTime || 'সারা বছর',
      mapCoordinates: spot.mapCoordinates || '',
      mapUrl: spot.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(spot.title + ', বগুড়া')}`,
      isApproved: autoApprove,
      status,
      contributor: spot.contributor,
      reviews: []
    };

    memoryExploreSpots.unshift(newSpot);
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
          }
          return created;
        }
      } catch (err) {
        console.warn('Supabase post insert fallback:', err);
      }
    }

    // Local in-memory prepend
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
    // 1. Gather Spots
    let spots = [...memoryExploreSpots];

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
   * Approve any submission (spot, community, review)
   */
  static async approveSubmission(type: 'spot' | 'community' | 'review', id: string): Promise<boolean> {
    if (type === 'spot') {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('tourist_spots').update({ is_approved: true }).eq('id', id);
        } catch (err) {
          console.warn('Supabase spot approve fallback:', err);
        }
      }
      const spot = memoryExploreSpots.find(s => s.id === id);
      if (spot) {
        spot.isApproved = true;
        spot.status = 'approved';
        spot.rejectReason = undefined;
        return true;
      }
    } else if (type === 'community') {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('community_posts').update({ is_approved: true }).eq('id', id);
        } catch (err) {
          console.warn('Supabase community approve fallback:', err);
        }
      }
      for (const cat of Object.keys(memoryCommunityState)) {
        const item = memoryCommunityState[cat].find(c => c.id === id);
        if (item) {
          item.isApproved = true;
          item.status = 'approved';
          item.rejectReason = undefined;
          return true;
        }
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
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Reject any submission with feedback reason
   */
  static async rejectSubmission(
    type: 'spot' | 'community' | 'review',
    id: string,
    reason?: string
  ): Promise<boolean> {
    const feedback = reason || 'তথ্য যাচাই বা সংশোধন প্রয়োজন';

    if (type === 'spot') {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('tourist_spots').update({ is_approved: false }).eq('id', id);
        } catch (err) {
          console.warn('Supabase spot reject fallback:', err);
        }
      }
      const spot = memoryExploreSpots.find(s => s.id === id);
      if (spot) {
        spot.isApproved = false;
        spot.status = 'rejected';
        spot.rejectReason = feedback;
        return true;
      }
    } else if (type === 'community') {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('community_posts').update({ is_approved: false }).eq('id', id);
        } catch (err) {
          console.warn('Supabase community reject fallback:', err);
        }
      }
      for (const cat of Object.keys(memoryCommunityState)) {
        const item = memoryCommunityState[cat].find(c => c.id === id);
        if (item) {
          item.isApproved = false;
          item.status = 'rejected';
          item.rejectReason = feedback;
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
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Delete any submission permanently
   */
  static async deleteSubmission(type: 'spot' | 'community' | 'review', id: string): Promise<boolean> {
    if (type === 'spot') {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('tourist_spots').delete().eq('id', id);
        } catch (err) {
          console.warn('Supabase spot delete fallback:', err);
        }
      }
      const idx = memoryExploreSpots.findIndex(s => s.id === id);
      if (idx !== -1) {
        memoryExploreSpots.splice(idx, 1);
        return true;
      }
    } else if (type === 'community') {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('community_posts').delete().eq('id', id);
        } catch (err) {
          console.warn('Supabase community delete fallback:', err);
        }
      }
      for (const cat of Object.keys(memoryCommunityState)) {
        const idx = memoryCommunityState[cat].findIndex(c => c.id === id);
        if (idx !== -1) {
          memoryCommunityState[cat].splice(idx, 1);
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
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Update submission details (edit and approve)
   */
  static async updateSubmission(type: 'spot' | 'community', id: string, updates: any): Promise<boolean> {
    if (type === 'spot') {
      const spot = memoryExploreSpots.find(s => s.id === id);
      if (spot) {
        Object.assign(spot, updates);
        return true;
      }
    } else if (type === 'community') {
      for (const cat of Object.keys(memoryCommunityState)) {
        const item = memoryCommunityState[cat].find(c => c.id === id);
        if (item) {
          Object.assign(item, updates);
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
      upazilas: upazilasData,
      hospitals: memoryHospitals,
      emergencyContacts: memoryEmergency,
      exploreSpots: memoryExploreSpots,
      communityPosts: memoryCommunityState,
      reviews: memorySpotReviews,
      systemSettings,
      auditLogs: systemAuditLogs
    };
  }
}
