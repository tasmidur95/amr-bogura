'use client';

import { useRouter, useParams } from '@/lib/i18n/navigation';
import { upazilaPath } from '@/lib/i18n/routes';
import { resolveUpazilaIndex, upazilaSlugOf } from '@/lib/i18n/entities';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import UpazilaDetailView from '@/components/UpazilaDetailView';
import { upazilasData, Upazila } from '@/lib/data/district-data';

export default function UpazilaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [upazilas, setUpazilas] = useState<Upazila[]>(upazilasData);

  useEffect(() => {
    fetch('/api/upazilas')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          setUpazilas(json.data);
        }
      })
      .catch(() => {});
  }, []);

  // slug validity / legacy redirects are handled by ./layout.tsx; here we only need the index
  const slugStr = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || '';
  const validIndex = resolveUpazilaIndex(slugStr)?.index ?? 0;

  const handleNavigate = (view: string, anchor?: string) => {
    if (view === 'home') {
      router.push(`/${anchor ? '#' + anchor : ''}`);
    } else if (view === 'upazilas') {
      router.push('/upazilas');
    }
  };

  const handleSelectUpazila = (newIndex: number) => {
    router.push(upazilaPath(upazilaSlugOf(upazilas[newIndex], newIndex)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar
        currentView="upazila-detail"
        onNavigate={handleNavigate}
        onOpenSearch={() => {}}
      />
      <main className="flex-1">
        <UpazilaDetailView
          upazilaIndex={validIndex}
          upazilas={upazilas}
          onNavigate={handleNavigate}
          onSelectUpazila={handleSelectUpazila}
        />
      </main>
      <Footer onNavigate={handleNavigate} onSwitchCommunityTab={() => {}} />
      <BottomNav currentView="upazilas" onNavigate={handleNavigate} />
    </div>
  );
}

