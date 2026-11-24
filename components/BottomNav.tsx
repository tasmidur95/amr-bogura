'use client';

import { useLanguage } from '@/lib/context/LanguageContext';
import Link from '@/lib/i18n/navigation';
import React, { useEffect, useRef } from 'react';

interface BottomNavProps {
  currentView: string;
  onNavigate?: (view: string, anchor?: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
  accentColor?: string;
}

export default function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: t('bottomNav.home'),
      href: '/',
      icon: 'fa-solid fa-house',
    },
    {
      id: 'upazilas',
      label: t('bottomNav.upazilas'),
      href: '/upazilas',
      icon: 'fa-solid fa-map-location-dot',
    },
    {
      id: 'healthcare',
      label: t('bottomNav.health'),
      href: '/healthcare',
      icon: 'fa-solid fa-notes-medical',
      accentColor: 'text-emerald-600',
    },
    {
      id: 'education',
      label: t('bottomNav.edu'),
      href: '/education',
      icon: 'fa-solid fa-graduation-cap',
      accentColor: 'text-indigo-600',
    },
    {
      id: 'transport',
      label: t('bottomNav.transport'),
      href: '/transport',
      icon: 'fa-solid fa-bus-simple',
      accentColor: 'text-blue-600',
    },
    {
      id: 'hospitality',
      label: t('bottomNav.hotel'),
      href: '/hospitality',
      icon: 'fa-solid fa-hotel',
      accentColor: 'text-amber-600',
    },
    {
      id: 'banking',
      label: t('bottomNav.bank'),
      href: '/banking',
      icon: 'fa-solid fa-building-columns',
      accentColor: 'text-emerald-700',
    },
    {
      id: 'community',
      label: t('bottomNav.community'),
      href: '/community',
      icon: 'fa-solid fa-users',
      accentColor: 'text-rose-600',
    },
    {
      id: 'explore',
      label: t('bottomNav.explore'),
      href: '/explore',
      icon: 'fa-solid fa-landmark',
      accentColor: 'text-teal-600',
    },
    {
      id: 'contribute',
      label: t('bottomNav.contribute'),
      href: '/contribute',
      icon: 'fa-solid fa-heart-circle-plus',
      accentColor: 'text-rose-500',
    },
    {
      id: 'admin',
      label: t('bottomNav.admin'),
      href: '/admin',
      icon: 'fa-solid fa-shield-halved',
      accentColor: 'text-slate-600',
    },
  ];

  // Auto-scroll the active menu item into the center of the mobile screen
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentView]);

  const handleClick = (item: NavItem, e: React.MouseEvent) => {
    if (onNavigate && (item.id === 'home' || item.id === 'upazilas')) {
      e.preventDefault();
      onNavigate(item.id);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      {/* Scrollable Container */}
      <div className="relative w-full">
        {/* Left Fade Hint */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none z-10" />

        {/* Horizontal Scroll Menu (Swipe left <-> right) */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 px-3 scroll-smooth touch-pan-x"
        >
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <Link
                key={item.id}
                ref={isActive ? activeItemRef : null}
                href={item.href}
                onClick={e => handleClick(item, e)}
                className={`min-w-[66px] shrink-0 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[11px] transition active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/90 shadow-2xs'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-50'
                }`}
              >
                <div className="relative">
                  <i
                    className={`${item.icon} text-base mb-1 ${
                      isActive ? 'text-emerald-800' : item.accentColor || 'text-slate-600'
                    }`}
                  ></i>
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  )}
                </div>
                <span className="truncate max-w-[62px] text-center whitespace-nowrap leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right Fade Hint */}
        <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>
    </nav>
  );
}
