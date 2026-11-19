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

/**
 * DistrictService - NestJS-style modular service layer
 * Responsible for data access, filtering, and Supabase synchronization.
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

  // Explore / Tourist Spots
  static async getExploreSpots(): Promise<ExploreSpot[]> {
    return exploreData;
  }

  // Community Posts
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
