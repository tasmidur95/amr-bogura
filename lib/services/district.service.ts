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
let memoryExploreSpots: DetailedExploreSpot[] = [...detailedExploreSpots];

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

  // Hospitals
  static async getHospitals(type?: string, query?: string): Promise<Hospital[]> {
    let list = [...hospitalsData];

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

  // Emergency
  static async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return emergencyData;
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
    spot: Omit<DetailedExploreSpot, 'id' | 'isApproved' | 'reviews'> & { id?: string; autoApprove?: boolean }
  ): Promise<DetailedExploreSpot> {
    const slug = spot.id || spot.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `spot-${Date.now()}`;
    const autoApprove = spot.autoApprove ?? true; // Default auto-approve so contributors see their spot live!

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
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('tourist_spots')
          .update({ is_approved: true })
          .eq('id', id);

        if (!error) {
          const item = memoryExploreSpots.find(s => s.id === id);
          if (item) item.isApproved = true;
          return true;
        }
      } catch (err) {
        console.warn('Supabase spot accept fallback to memory:', err);
      }
    }

    const item = memoryExploreSpots.find(s => s.id === id);
    if (item) {
      item.isApproved = true;
      return true;
    }
    return false;
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
      date: '২০২৬'
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
      if (!targetSpot.reviews) targetSpot.reviews = [];
      targetSpot.reviews.unshift(newReview);
    }

    return newReview;
  }

  // ==========================================
  // COMMUNITY POSTS
  // ==========================================
  static async getCommunityPosts(category?: string, upazila?: string, bloodGroup?: string): Promise<CommunityPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let queryBuilder = supabase
          .from('community_posts')
          .select('*')
          .order('created_at', { ascending: false });

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
            created_at: item.created_at
          }));
        }
      } catch (err) {
        console.warn('Supabase community fetch fallback to memory:', err);
      }
    }

    // Default In-Memory Fallback
    const targetCategory = category || 'blood';
    let items = initialCommunityState[targetCategory] || [];

    if (upazila && upazila !== 'ALL') {
      items = items.filter(i => i.upazila === upazila);
    }

    if (targetCategory === 'blood' && bloodGroup && bloodGroup !== 'ALL') {
      items = items.filter(i => i.group === bloodGroup);
    }

    return items;
  }

  static async createCommunityPost(post: Omit<CommunityPost, 'id'>): Promise<CommunityPost> {
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
              phone: post.phone
            }
          ])
          .select()
          .single();

        if (!error && data) {
          return {
            id: data.id,
            category: data.category,
            name: data.name,
            group: data.blood_group,
            role: data.blood_role,
            badge: data.badge,
            upazila: data.upazila,
            detail: data.detail,
            phone: data.phone,
            created_at: data.created_at
          };
        }
      } catch (err) {
        console.warn('Supabase post insert fallback:', err);
      }
    }

    // Local in-memory prepend
    const newPost: CommunityPost = {
      ...post,
      id: `local-${Date.now()}`
    };

    if (initialCommunityState[post.category]) {
      initialCommunityState[post.category].unshift(newPost);
    }

    return newPost;
  }
}
