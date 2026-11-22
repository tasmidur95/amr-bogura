'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './ToastContext';
import { CommunityUser } from '@/lib/services/community-auth.service';

interface CommunityAuthContextType {
  user: CommunityUser | null;
  token: string | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (usernameOrPhone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (payload: {
    name: string;
    username: string;
    phone: string;
    upazila: string;
    password: string;
    bloodGroup?: string;
    role?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const CommunityAuthContext = createContext<CommunityAuthContextType | undefined>(undefined);

export function CommunityAuthProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [user, setUser] = useState<CommunityUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Restore saved community user session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('amar_bogura_community_user');
      const savedToken = localStorage.getItem('amar_bogura_community_token');
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch (e) {
      console.warn('Error reading saved community session:', e);
    }
  }, []);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (usernameOrPhone: string, password: string) => {
    try {
      const res = await fetch('/api/community/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username: usernameOrPhone,
          password,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('amar_bogura_community_user', JSON.stringify(data.user));
        localStorage.setItem('amar_bogura_community_token', data.token);
        showToast(data.message || 'সফলভাবে লগইন সম্পন্ন হয়েছে!');
        closeAuthModal();
        return { success: true };
      } else {
        return { success: false, error: data.error || 'লগইন ব্যর্থ হয়েছে।' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'নেটওয়ার্ক সংযোগ ত্রুটি' };
    }
  };

  const register = async (payload: {
    name: string;
    username: string;
    phone: string;
    upazila: string;
    password: string;
    bloodGroup?: string;
    role?: string;
  }) => {
    try {
      const res = await fetch('/api/community/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          ...payload,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('amar_bogura_community_user', JSON.stringify(data.user));
        localStorage.setItem('amar_bogura_community_token', data.token);
        showToast(data.message || 'সদস্য নিবন্ধন সফল হয়েছে!');
        closeAuthModal();
        return { success: true };
      } else {
        return { success: false, error: data.error || 'নিবন্ধন ব্যর্থ হয়েছে।' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'নেটওয়ার্ক সংযোগ ত্রুটি' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('amar_bogura_community_user');
      localStorage.removeItem('amar_bogura_community_token');
    } catch (e) {}
    showToast('কমিউনিটি অ্যাকাউন্ট থেকে লগআউট সম্পন্ন হয়েছে।');
  };

  return (
    <CommunityAuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
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

