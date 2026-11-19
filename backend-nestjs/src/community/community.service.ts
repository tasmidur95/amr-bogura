import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private inMemoryPosts: Record<string, any[]> = {
    blood: [
      { id: '1', name: 'মোঃ রাশেদুল ইসলাম', group: 'O+', role: 'রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'সাতমাথা, বগুড়া · সর্বশেষ দান: ৪ মাস আগে', phone: '01712-458920' },
      { id: '2', name: 'সাদিয়া আফরিন', group: 'A+', role: 'রক্তদাতা', upazila: 'শাজাহানপুর', detail: 'শজিমেক ক্যাম্পাস · যেকোনো সময় প্রস্তুত', phone: '01819-334112' }
    ]
  };

  async findAll(category = 'blood', upazila = 'ALL', bloodGroup = 'ALL') {
    const supabase = this.supabaseService.getClient();
    if (supabase) {
      let query = supabase.from('community_posts').select('*').order('created_at', { ascending: false });
      if (category) query = query.eq('category', category);
      if (upazila !== 'ALL') query = query.eq('upazila', upazila);
      if (bloodGroup !== 'ALL') query = query.eq('blood_group', bloodGroup);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    return this.inMemoryPosts[category] || [];
  }

  async create(dto: CreatePostDto) {
    const supabase = this.supabaseService.getClient();
    if (supabase) {
      const { data, error } = await supabase.from('community_posts').insert([{
        category: dto.category,
        name: dto.name,
        blood_group: dto.group,
        blood_role: dto.role,
        badge: dto.badge,
        upazila: dto.upazila,
        detail: dto.detail,
        phone: dto.phone
      }]).select().single();
      if (!error && data) return data;
    }

    const newPost = { id: Date.now().toString(), ...dto };
    if (!this.inMemoryPosts[dto.category]) this.inMemoryPosts[dto.category] = [];
    this.inMemoryPosts[dto.category].unshift(newPost);
    return newPost;
  }
}

