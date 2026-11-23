import fs from 'fs';
import path from 'path';
import { hashPassword, verifyPassword, needsRehash } from '@/lib/services/community-password';

export interface CommunityUser {
  id: string;
  name: string;
  username: string;
  phone: string;
  upazila: string;
  bloodGroup?: string;
  role?: string;
  bio?: string;
  isVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface StoredCommunityUser extends CommunityUser {
  passwordHash: string;
}

function getUsersFilePath(): string {
  return path.join(process.cwd(), 'amr-bogura-data', 'community', 'community-users.json');
}

const DEFAULT_USERS: StoredCommunityUser[] = [
  {
    id: 'usr-1',
    name: 'মোঃ তানভীর হাসান',
    username: 'bogura_citizen',
    phone: '01712-345678',
    upazila: 'বগুড়া সদর',
    bloodGroup: 'B+',
    role: 'নাগরিক সদস্য',
    isVerified: true,
    createdAt: '2026-01-15T10:00:00.000Z',
    passwordHash: hashPassword('user123'),
  },
  {
    id: 'usr-2',
    name: 'আব্দুল করিম',
    username: 'donor_karim',
    phone: '01711-223344',
    upazila: 'শেরপুর',
    bloodGroup: 'O+',
    role: 'নিয়মিত রক্তদাতা',
    isVerified: true,
    createdAt: '2026-02-01T12:00:00.000Z',
    passwordHash: hashPassword('user123'),
  },
];

export class CommunityAuthService {
  private static loadUsers(): StoredCommunityUser[] {
    try {
      const p = getUsersFilePath();
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load community users from file:', e);
    }

    // Initialize with default users
    CommunityAuthService.saveUsers(DEFAULT_USERS);
    return DEFAULT_USERS;
  }

  private static saveUsers(users: StoredCommunityUser[]): void {
    try {
      const p = getUsersFilePath();
      const dir = path.dirname(p);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(p, JSON.stringify(users, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save community users to disk:', e);
    }
  }

  static toPublicUser(user: StoredCommunityUser): CommunityUser {
    const { passwordHash, ...pub } = user;
    return pub;
  }

  static async register(data: {
    name: string;
    username: string;
    phone: string;
    upazila: string;
    password: string;
    bloodGroup?: string;
    role?: string;
  }): Promise<{ success: boolean; user?: CommunityUser; error?: string }> {
    const name = data.name.trim();
    const username = data.username.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');
    const phone = data.phone.trim();
    const upazila = data.upazila.trim();
    const password = data.password;

    if (!name || name.length < 2) {
      return { success: false, error: 'অনুগ্রহ করে আপনার সঠিক পূর্ণ নাম প্রদান করুন।' };
    }
    if (!username || username.length < 3) {
      return { success: false, error: 'ইউজারনেম কমপক্ষে ৩ অক্ষরের (ইংরেজি অক্ষর, সংখ্যা বা _) হতে হবে।' };
    }
    if (!phone || phone.length < 10) {
      return { success: false, error: 'সঠিক মোবাইল ফোন নম্বর প্রদান করুন।' };
    }
    if (!upazila) {
      return { success: false, error: 'অনুগ্রহ করে আপনার উপজেলা নির্বাচন করুন।' };
    }
    if (!password || password.length < 8) {
      return { success: false, error: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।' };
    }

    const users = CommunityAuthService.loadUsers();

    // Check duplicate username
    if (users.some(u => u.username.toLowerCase() === username)) {
      return {
        success: false,
        error: `"${username}" ইউজারনেমটি ইতিমধ্যে ব্যবহৃত। অন্য একটি ইউজারনেম পছন্দ করুন।`,
      };
    }

    // Check duplicate phone
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (users.some(u => u.phone.replace(/[\s-]/g, '') === cleanPhone)) {
      return {
        success: false,
        error: 'এই মোবাইল নম্বরটি দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট নিবন্ধিত আছে। লগইন করার চেষ্টা করুন।',
      };
    }

    const newUser: StoredCommunityUser = {
      id: `usr-${Date.now()}`,
      name,
      username,
      phone,
      upazila,
      bloodGroup: data.bloodGroup || undefined,
      role: data.role || (data.bloodGroup ? 'রক্তদাতা' : 'নাগরিক সদস্য'),
      isVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      passwordHash: hashPassword(password),
    };

    users.unshift(newUser);
    CommunityAuthService.saveUsers(users);

    const publicUser = CommunityAuthService.toPublicUser(newUser);

    return {
      success: true,
      user: publicUser,
    };
  }

  static async login(
    usernameOrPhone: string,
    password: string
  ): Promise<{ success: boolean; user?: CommunityUser; error?: string }> {
    const q = usernameOrPhone.trim();
    if (!q || !password) {
      return { success: false, error: 'ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন।' };
    }

    const cleanQ = q.toLowerCase();
    const cleanPhone = q.replace(/[\s-]/g, '');
    const users = CommunityAuthService.loadUsers();

    const matched = users.find(
      u =>
        u.username.toLowerCase() === cleanQ ||
        u.phone.replace(/[\s-]/g, '') === cleanPhone
    );

    if (!matched) {
      return {
        success: false,
        error: 'ইউজারনেম বা মোবাইল নম্বর খুঁজে পাওয়া যায়নি। সঠিক তথ্য দিন বা নতুন নিবন্ধন করুন।',
      };
    }

    if (!verifyPassword(password, matched.passwordHash)) {
      return {
        success: false,
        error: 'ভুল পাসওয়ার্ড! আপনার অ্যাকাউন্টের সঠিক পাসওয়ার্ড দিন।',
      };
    }

    // Upgrade legacy (base64) hashes to scrypt on successful login
    if (needsRehash(matched.passwordHash)) {
      matched.passwordHash = hashPassword(password);
    }

    // Update last login
    matched.lastLoginAt = new Date().toISOString();
    CommunityAuthService.saveUsers(users);

    const publicUser = CommunityAuthService.toPublicUser(matched);

    return {
      success: true,
      user: publicUser,
    };
  }

  static async updateProfile(
    id: string,
    patch: { name?: string; bio?: string; upazila?: string; bloodGroup?: string }
  ): Promise<{ success: boolean; user?: CommunityUser; error?: string }> {
    const users = CommunityAuthService.loadUsers();
    const u = users.find(x => x.id === id);
    if (!u) return { success: false, error: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি।' };

    if (patch.name !== undefined) {
      const name = patch.name.trim();
      if (name.length < 2 || name.length > 80) return { success: false, error: 'নাম ২–৮০ অক্ষরের হতে হবে।' };
      u.name = name;
    }
    if (patch.bio !== undefined) {
      const bio = patch.bio.trim();
      if (bio.length > 300) return { success: false, error: 'পরিচিতি সর্বোচ্চ ৩০০ অক্ষরের হতে পারবে।' };
      u.bio = bio || undefined;
    }
    if (patch.upazila !== undefined) {
      const upazila = patch.upazila.trim();
      if (!upazila) return { success: false, error: 'উপজেলা নির্বাচন করুন।' };
      u.upazila = upazila;
    }
    if (patch.bloodGroup !== undefined) {
      u.bloodGroup = patch.bloodGroup.trim() || undefined;
    }
    CommunityAuthService.saveUsers(users);
    return { success: true, user: CommunityAuthService.toPublicUser(u) };
  }

  static async getUserById(id: string): Promise<CommunityUser | null> {
    const users = CommunityAuthService.loadUsers();
    const user = users.find(u => u.id === id);
    return user ? CommunityAuthService.toPublicUser(user) : null;
  }
}

