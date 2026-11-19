'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import CommunitySection from '@/components/CommunitySection';
import UpazilaSection from '@/components/UpazilaSection';
import UpazilasPageView from '@/components/UpazilasPageView';
import UpazilaDetailView from '@/components/UpazilaDetailView';
import HealthcareSection from '@/components/HealthcareSection';
import ExploreSection from '@/components/ExploreSection';
import HistorySection from '@/components/HistorySection';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import SearchModal from '@/components/SearchModal';
import CommunityModal from '@/components/CommunityModal';

import {
  upazilasData,
  hospitalsData,
  emergencyData,
  exploreData,
  initialCommunityState,
  CommunityPost,
} from '@/lib/data/district-data';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'upazilas' | 'upazila-detail'>('home');
  const [selectedUpazilaIdx, setSelectedUpazilaIdx] = useState<number>(0);
  const [activeCommunityTab, setActiveCommunityTab] = useState<string>('blood');
  const [hospitalFilter, setHospitalFilter] = useState<string>('all');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState<boolean>(false);
  const [communityData, setCommunityData] = useState<Record<string, CommunityPost[]>>(initialCommunityState);

  // Fetch initial community data from API (Supabase or fallback)
  useEffect(() => {
    async function loadCommunity() {
      try {
        const res = await fetch('/api/community?category=blood');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setCommunityData(prev => ({
            ...prev,
            blood: json.data,
          }));
        }
      } catch (e) {
        // Fallback already in memory
      }
    }
    loadCommunity();
  }, []);

  const handleNavigate = (view: string, anchor?: string) => {
    if (view === 'home' || view === 'upazilas' || view === 'upazila-detail') {
      setCurrentView(view as any);
    }

    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenUpazilaDetail = (index: number) => {
    setSelectedUpazilaIdx(index);
    setCurrentView('upazila-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostCreated = (newPost: CommunityPost) => {
    setCommunityData(prev => {
      const catList = prev[newPost.category] || [];
      return {
        ...prev,
        [newPost.category]: [newPost, ...catList],
      };
    });
    setActiveCommunityTab(newPost.category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Sticky Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Areas based on current view */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <Hero onNavigate={handleNavigate} />
            <ServicesGrid
              onNavigate={handleNavigate}
              onFilterHospital={setHospitalFilter}
              onSwitchCommunityTab={setActiveCommunityTab}
            />
            <CommunitySection
              activeTab={activeCommunityTab}
              onTabChange={setActiveCommunityTab}
              communityData={communityData}
              onOpenModal={() => setIsCommunityModalOpen(true)}
            />
            <UpazilaSection
              upazilas={upazilasData}
              onNavigate={handleNavigate}
              onOpenDetail={handleOpenUpazilaDetail}
            />
            <HealthcareSection
              hospitals={hospitalsData}
              emergencyContacts={emergencyData}
              currentFilter={hospitalFilter}
              onFilterChange={setHospitalFilter}
            />
            <ExploreSection exploreSpots={exploreData} />
            <HistorySection />
          </div>
        )}

        {currentView === 'upazilas' && (
          <UpazilasPageView
            upazilas={upazilasData}
            onNavigate={handleNavigate}
            onOpenDetail={handleOpenUpazilaDetail}
          />
        )}

        {currentView === 'upazila-detail' && (
          <UpazilaDetailView
            upazilaIndex={selectedUpazilaIdx}
            upazilas={upazilasData}
            onNavigate={handleNavigate}
            onSelectUpazila={setSelectedUpazilaIdx}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSwitchCommunityTab={setActiveCommunityTab}
      />

      {/* Mobile App Bottom Nav */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        upazilas={upazilasData}
        hospitals={hospitalsData}
        exploreSpots={exploreData}
        emergencyContacts={emergencyData}
        onNavigate={handleNavigate}
        onOpenUpazilaDetail={handleOpenUpazilaDetail}
      />

      {/* Community Post / Request Modal */}
      <CommunityModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        defaultCategory={activeCommunityTab}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
