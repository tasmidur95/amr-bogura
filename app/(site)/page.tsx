'use client';

import { useRouter } from '@/lib/i18n/navigation';
import { upazilaPath, explorePath } from '@/lib/i18n/routes';
import { upazilaSlugFor, upazilaSlugOf, spotSlug } from '@/lib/i18n/entities';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';
import { absoluteUrl } from '@/lib/i18n/routes';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WeatherSection from '@/components/WeatherSection';
import DistrictOverviewSection from '@/components/DistrictOverviewSection';
import ServicesGrid from '@/components/ServicesGrid';
import CommunitySection from '@/components/CommunitySection';
import UpazilaSection from '@/components/UpazilaSection';
import UpazilasPageView from '@/components/UpazilasPageView';
import UpazilaDetailView from '@/components/UpazilaDetailView';
import HealthcareSection from '@/components/HealthcareSection';
import ExploreSection from '@/components/ExploreSection';
import HistorySection from '@/components/HistorySection';
import HomeFaq, { HOME_FAQS } from '@/components/HomeFaq';
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
  const router = useRouter();
  const { locale, t } = useLanguage();
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
    // Go to the real detail route: /upazilas/:id
    router.push(upazilaPath(upazilaSlugOf(upazilas[index], index)));
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

  // CMS text (site_content) is authored in the default language only; other locales use the message files
  const cmsContent = locale === DEFAULT_LOCALE ? siteContent : undefined;
  const siteUrl = absoluteUrl(locale, '/');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: t('seo.home.title'),
        inLanguage: locale === 'bn' ? 'bn-BD' : 'en',
        description: t('seo.home.description'),
      },
      {
        '@type': 'AdministrativeArea',
        '@id': `${siteUrl}/#bogura`,
        name: locale === 'bn' ? 'বগুড়া জেলা' : 'Bogura District',
        alternateName: locale === 'bn' ? 'Bogura District' : 'বগুড়া জেলা',
        containedInPlace: { '@type': 'Country', name: 'Bangladesh' },
        geo: { '@type': 'GeoCoordinates', latitude: 24.8465, longitude: 89.3732 },
        url: siteUrl,
      },
      // FAQ copy is Bangla-only for now; advertise it only on the Bangla page
      ...(locale === DEFAULT_LOCALE
        ? [{
            '@type': 'FAQPage',
            mainEntity: HOME_FAQS.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }]
        : []),
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {currentView === 'home' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* Sticky Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        siteContent={cmsContent}
      />

      {/* Main Content Areas based on current view */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            {/* CRO order: intent capture → quick gateways → urgent help → high-intent network → discovery → trust & info → answers */}

            {/* 1. Value proposition, instant search & primary CTAs */}
            <Hero
              onNavigate={handleNavigate}
              siteContent={cmsContent}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* 2. Quick gateways: 8 core services, one tap */}
            <ServicesGrid
              onNavigate={handleNavigate}
              onFilterHospital={setHospitalFilter}
              onSwitchCommunityTab={setActiveCommunityTab}
            />

            {/* 3. Highest urgency: emergency numbers first, then hospital directory */}
            <HealthcareSection
              hospitals={hospitals}
              emergencyContacts={emergencyContacts}
              currentFilter={hospitalFilter}
              onFilterChange={setHospitalFilter}
              isHome={true}
            />

            {/* 4. High-intent civic network: blood donors & community */}
            <CommunitySection
              activeTab={activeCommunityTab}
              onTabChange={setActiveCommunityTab}
              communityData={communityData}
              onOpenModal={() => setIsCommunityModalOpen(true)}
              isHome={true}
            />

            {/* 5. Administrative discovery: upazila summary map */}
            <UpazilaSection
              upazilas={upazilas}
              onNavigate={handleNavigate}
              onOpenDetail={handleOpenUpazilaDetail}
              isHome={true}
            />

            {/* 6. Explore: heritage & tourism */}
            <ExploreSection exploreSpots={exploreSpots} />

            {/* 7. Authority & trust: district at a glance */}
            <DistrictOverviewSection />

            {/* 8. Live context: weather */}
            <WeatherSection />

            {/* 9. Information: FAQ (also exposed as FAQPage structured data) */}
            <HomeFaq />

            {/* 10. Roots, district facts & contribution closer */}
            <HistorySection siteContent={cmsContent} />
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
        siteContent={cmsContent}
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

