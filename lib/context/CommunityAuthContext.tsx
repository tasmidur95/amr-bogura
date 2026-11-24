'use client';

import { usePathname, useRouter } from '@/lib/i18n/navigation';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useToast } from './ToastContext';
import { CommunityUser } from '@/lib/services/community-auth.service';

export interface ContributorStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
}

type Result = { success: boolean; error?: string };

interface CommunityAuthContextType {
  user: CommunityUser | null;
  stats: ContributorStats | null;
  /** false until the first session check finished (avoid flashing a login wall) */
  isReady: boolean;
  isLoggedIn: boolean;
  /** Go to the /login page (tab = which side opens first). Returns here afterwards. */
  openAuthPage: (tab?: 'login' | 'register') => void;
  login: (usernameOrPhone: string, password: string) => Promise<Result>;
  register: (payload: {
    name: string;
    username: string;
    phone: string;
    upazila: string;
    password: string;
    bloodGroup?: string;
    role?: string;
  }) => Promise<Result>;
  updateProfile: (patch: { name?: string; bio?: string; upazila?: string; bloodGroup?: string }) => Promise<Result>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const CommunityAuthContext = createContext<CommunityAuthContextType | undefined>(undefined);

const post = (body: object) =>
  fetch('/api/community/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  }).then(r => r.json());

export function CommunityAuthProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<CommunityUser | null>(null);
  const [stats, setStats] = useState<ContributorStats | null>(null);
  const [isReady, setIsReady] = useState(false);

  // The session lives in an httpOnly cookie; ask the server who we are.
  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/community/auth', { credentials: 'same-origin', cache: 'no-store' });
      const data = await res.json();
      setUser(data.user || null);
      setStats(data.user ? data.stats || null : null);
    } catch {
      setUser(null);
      setStats(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    // Remove the old insecure client-side session, if any.
    try {
      localStorage.removeItem('amar_bogura_community_user');
      localStorage.removeItem('amar_bogura_community_token');
    } catch {}
    refresh();
  }, [refresh]);

  const openAuthPage = (tab: 'login' | 'register' = 'login') => {
    const here = pathname && !pathname.startsWith('/login') ? pathname : '/contribute';
    router.push(`/login?tab=${tab}&next=${encodeURIComponent(here)}`);
  };

  const finishAuth = async (data: any, fallback: string): Promise<Result> => {
    if (data.success && data.user) {
      setUser(data.user);
      await refresh(); // loads stats too
      showToast(data.message || fallback);
      return { success: true };
    }
    return { success: false, error: data.error || 'ব্যর্থ হয়েছে।' };
  };

  const login = async (usernameOrPhone: string, password: string): Promise<Result> => {
    try {
      return await finishAuth(await post({ action: 'login', username: usernameOrPhone, password }), 'সফলভাবে লগইন সম্পন্ন হয়েছে!');
    } catch (err: any) {
      return { success: false, error: err.message || 'নেটওয়ার্ক সংযোগ ত্রুটি' };
    }
  };

  const register: CommunityAuthContextType['register'] = async payload => {
    try {
      return await finishAuth(await post({ action: 'register', ...payload }), 'সদস্য নিবন্ধন সফল হয়েছে!');
    } catch (err: any) {
      return { success: false, error: err.message || 'নেটওয়ার্ক সংযোগ ত্রুটি' };
    }
  };

  const updateProfile: CommunityAuthContextType['updateProfile'] = async patch => {
    try {
      const res = await fetch('/api/community/auth', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        showToast(data.message || 'প্রোফাইল হালনাগাদ হয়েছে।');
        return { success: true };
      }
      return { success: false, error: data.error || 'প্রোফাইল হালনাগাদ করা যায়নি।' };
    } catch (err: any) {
      return { success: false, error: err.message || 'নেটওয়ার্ক সংযোগ ত্রুটি' };
    }
  };

  const logout = async () => {
    try {
      await post({ action: 'logout' });
    } catch {}
    setUser(null);
    setStats(null);
    showToast('কমিউনিটি অ্যাকাউন্ট থেকে লগআউট সম্পন্ন হয়েছে।');
  };

  return (
    <CommunityAuthContext.Provider
      value={{
        user,
        stats,
        isReady,
        isLoggedIn: !!user,
        openAuthPage,
        login,
        register,
        updateProfile,
        refresh,
        logout,
      }}
    >
      {children}
    </CommunityAuthContext.Provider>
  );
}

export function useCommunityAuth() {
  const context = useContext(CommunityAuthContext);
  if (!context) {
    throw new Error('useCommunityAuth must be used within a CommunityAuthProvider');
  }
  return context;
}
