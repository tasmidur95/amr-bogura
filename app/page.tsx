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
  Upazila,
  Hospital,
  EmergencyContact,
  SiteContent,
  defaultSiteContent
} from '@/lib/data/district-data';
import { detailedExploreSpots } from '@/lib/data/explore-data';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'upazilas' | 'upazila-detail'>('home');
  const [selectedUpazilaIdx, setSelectedUpazilaIdx] = useState<number>(0);
  const [activeCommunityTab, setActiveCommunityTab] = useState<string>('blood');
  const [hospitalFilter, setHospitalFilter] = useState<string>('all');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState<boolean>(false);

  // Dynamic CMS & Entity States
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [upazilas, setUpazilas] = useState<Upazila[]>(upazilasData);
  const [hospitals, setHospitals] = useState<Hospital[]>(hospitalsData);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(emergencyData);
  const [exploreSpots, setExploreSpots] = useState<any[]>(detailedExploreSpots);
  const [communityData, setCommunityData] = useState<Record<string, CommunityPost[]>>(initialCommunityState);

  // Fetch initial dynamic content and entities from API
  useEffect(() => {
    async function loadDynamicContent() {
      try {
        const [contentRes, upzRes, hospRes, emRes, expRes, commRes] = await Promise.allSettled([
          fetch('/api/site-content').then(r => r.json()),
          fetch('/api/upazilas').then(r => r.json()),
          fetch('/api/hospitals').then(r => r.json()),
          fetch('/api/emergency').then(r => r.json()),
          fetch('/api/explore').then(r => r.json()),
          fetch('/api/community?category=blood').then(r => r.json()),
        ]);

        if (contentRes.status === 'fulfilled' && contentRes.value?.success && contentRes.value?.data) {
          setSiteContent(contentRes.value.data);
        }
        if (upzRes.status === 'fulfilled' && upzRes.value?.success && upzRes.value?.data) {
          setUpazilas(upzRes.value.data);
        }
        if (hospRes.status === 'fulfilled' && hospRes.value?.success && hospRes.value?.data) {
          setHospitals(hospRes.value.data);
        }
        if (emRes.status === 'fulfilled' && emRes.value?.success && emRes.value?.data) {
          setEmergencyContacts(emRes.value.data);
        }
        if (expRes.status === 'fulfilled' && expRes.value?.success && expRes.value?.data) {
          setExploreSpots(expRes.value.data);
        }
        if (commRes.status === 'fulfilled' && commRes.value?.success && commRes.value?.data?.length > 0) {
          setCommunityData(prev => ({
            ...prev,
            blood: commRes.value.data,
          }));
        }
      } catch (e) {
        // In-memory defaults already set
      }
    }
    loadDynamicContent();
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
        siteContent={siteContent}
      />

      {/* Main Content Areas based on current view */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <Hero onNavigate={handleNavigate} siteContent={siteContent} />
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
              upazilas={upazilas}
              onNavigate={handleNavigate}
              onOpenDetail={handleOpenUpazilaDetail}
            />
            <HealthcareSection
              hospitals={hospitals}
              emergencyContacts={emergencyContacts}
              currentFilter={hospitalFilter}
              onFilterChange={setHospitalFilter}
            />
            <ExploreSection exploreSpots={exploreSpots} />
            <HistorySection siteContent={siteContent} />
          </div>
        )}

        {currentView === 'upazilas' && (
          <UpazilasPageView
            upazilas={upazilas}
            onNavigate={handleNavigate}
            onOpenDetail={handleOpenUpazilaDetail}
          />
        )}

        {currentView === 'upazila-detail' && (
          <UpazilaDetailView
            upazilaIndex={selectedUpazilaIdx}
            upazilas={upazilas}
            onNavigate={handleNavigate}
            onSelectUpazila={setSelectedUpazilaIdx}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSwitchCommunityTab={setActiveCommunityTab}
        siteContent={siteContent}
      />

      {/* Mobile App Bottom Nav */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        upazilas={upazilas}
        hospitals={hospitals}
        exploreSpots={exploreSpots}
        emergencyContacts={emergencyContacts}
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

