'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './ToastContext';

export type AdminNavTab =
  | 'overview'
  | 'moderation'
  | 'spots'
  | 'education'
  | 'upazilas'
  | 'hospitals'
  | 'emergency'
  | 'community'
  | 'cms'
  | 'settings';

export interface AdminBadgeCounts {
  pendingTotal: number;
  spots: number;
  education?: number;
  hospitals: number;
  emergency: number;
  community: number;
  upazilas: number;
  reviews: number;
}

export interface AdminUser {
  username: string;
  role: string;
  district?: string;
  division?: string;
  authorizedAt?: string;
}

export interface SystemDiagnostics {
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

interface AdminContextType {
  // Authentication Guard
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  adminUsernameInput: string;
  setAdminUsernameInput: (val: string) => void;
  adminPasswordInput: string;
  setAdminPasswordInput: (val: string) => void;
  passkeyInput: string;
  setPasskeyInput: (val: string) => void;
  adminUser: AdminUser | null;
  isAuthLoading: boolean;
  authError: string;
  setAuthError: (val: string) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleLogout: () => void;

  // Navigation
  currentNav: AdminNavTab;
  setCurrentNav: (nav: AdminNavTab) => void;

  // Sidebar state
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (val: boolean) => void;

  // Badges & Telemetry
  badgeCounts: AdminBadgeCounts;
  setBadgeCounts: React.Dispatch<React.SetStateAction<AdminBadgeCounts>>;
  systemDiag: SystemDiagnostics | null;
  setSystemDiag: React.Dispatch<React.SetStateAction<SystemDiagnostics | null>>;

  // Data Loading & Refresh
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  activeTabLoading: boolean;
  setActiveTabLoading: (val: boolean) => void;
  refreshKey: number;
  triggerRefresh: () => void;
}

const defaultBadgeCounts: AdminBadgeCounts = {
  pendingTotal: 0,
  spots: 0,
  hospitals: 0,
  emergency: 0,
  community: 0,
  upazilas: 12,
  reviews: 0,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();

  // Authentication & Guard State
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUsernameInput, setAdminUsernameInput] = useState<string>('admin');
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [passkeyInput, setPasskeyInputState] = useState<string>('');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // Primary Navigation
  const [currentNav, setCurrentNavState] = useState<AdminNavTab>('overview');

  // Sidebar state (Expanded / Mini)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Badge Counts for Modules
  const [badgeCounts, setBadgeCounts] = useState<AdminBadgeCounts>(defaultBadgeCounts);

  // System Diagnostics & Telemetry
  const [systemDiag, setSystemDiag] = useState<SystemDiagnostics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTabLoading, setActiveTabLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const setPasskeyInput = (val: string) => {
    setPasskeyInputState(val);
    setAdminPasswordInput(val);
  };

  // Restore saved session & sidebar preferences on mount (Auth Guard)
  useEffect(() => {
    try {
      const savedToken = sessionStorage.getItem('amar_bogura_admin_token');
      const savedUser = sessionStorage.getItem('amar_bogura_admin_user');
      if (savedToken) {
        setIsAuthenticated(true);
        if (savedUser) {
          setAdminUser(JSON.parse(savedUser));
        }
      } else {
        setIsAuthenticated(false);
      }

      const savedSidebar = localStorage.getItem('amar_bogura_admin_sidebar_expanded');
      if (savedSidebar !== null) {
        setIsSidebarExpanded(savedSidebar === 'true');
      }

      // Check URL query param for default tab
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab') as AdminNavTab;
        const validTabs: AdminNavTab[] = [
          'overview',
          'moderation',
          'spots',
          'upazilas',
          'hospitals',
          'emergency',
          'community',
          'cms',
          'settings',
        ];
        if (tab && validTabs.includes(tab)) {
          setCurrentNavState(tab);
        }
      }
    } catch (e) {
      console.warn('Error reading admin session/preferences:', e);
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  const setCurrentNav = (nav: AdminNavTab) => {
    setCurrentNavState(nav);
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', nav);
        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {}
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => {
      const next = !prev;
      try {
        localStorage.setItem('amar_bogura_admin_sidebar_expanded', String(next));
      } catch (e) {}
      return next;
    });
  };

  const triggerRefresh = () => {
    setRefreshKey(k => k + 1);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveUser = adminUsernameInput.trim();
    const effectivePass = (adminPasswordInput || passkeyInput).trim();

    if (!effectiveUser || !effectivePass) {
      setAuthError('ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন।');
      return;
    }

    setIsAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: effectiveUser,
          password: effectivePass,
          passkey: effectivePass,
        }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        sessionStorage.setItem('amar_bogura_admin_token', data.token);
        if (data.user) {
          sessionStorage.setItem('amar_bogura_admin_user', JSON.stringify(data.user));
          setAdminUser(data.user);
        }
        setIsAuthenticated(true);
        showToast('সিস্টেম অ্যাডমিন প্যানেলে স্বাগতম!');
        triggerRefresh();
      } else {
        setAuthError(data.error || 'ভুল ইউজারনেম বা পাসওয়ার্ড! (ডিফল্ট: admin / bogura2026)');
      }
    } catch (err: any) {
      setAuthError('অথেনটিকেশন ব্যর্থ হয়েছে');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('amar_bogura_admin_token');
    sessionStorage.removeItem('amar_bogura_admin_user');
    setIsAuthenticated(false);
    setAdminUser(null);
    setAdminPasswordInput('');
    setPasskeyInputState('');
    showToast('সফলভাবে অ্যাডমিন লগআউট সম্পন্ন হয়েছে');
  };

  return (
    <AdminContext.Provider
      value={{
        isCheckingAuth,
        isAuthenticated,
        setIsAuthenticated,
        adminUsernameInput,
        setAdminUsernameInput,
        adminPasswordInput,
        setAdminPasswordInput,
        passkeyInput,
        setPasskeyInput,
        adminUser,
        isAuthLoading,
        authError,
        setAuthError,
        handleLogin,
        handleLogout,
        currentNav,
        setCurrentNav,
        isSidebarExpanded,
        toggleSidebar,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        badgeCounts,
        setBadgeCounts,
        systemDiag,
        setSystemDiag,
        isLoading,
        setIsLoading,
        activeTabLoading,
        setActiveTabLoading,
        refreshKey,
        triggerRefresh,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
