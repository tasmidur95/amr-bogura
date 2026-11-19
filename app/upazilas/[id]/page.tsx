'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import UpazilaDetailView from '@/components/UpazilaDetailView';
import { upazilasData } from '@/lib/data/district-data';

export default function UpazilaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id || '0';
  const index = parseInt(idStr, 10);
  const validIndex = isNaN(index) || index < 0 || index >= upazilasData.length ? 0 : index;

  const handleNavigate = (view: string, anchor?: string) => {
    if (view === 'home') {
      router.push(`/${anchor ? '#' + anchor : ''}`);
    } else if (view === 'upazilas') {
      router.push('/upazilas');
    }
  };

  const handleSelectUpazila = (newIndex: number) => {
    router.push(`/upazilas/${newIndex}`);
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
          upazilas={upazilasData}
          onNavigate={handleNavigate}
          onSelectUpazila={handleSelectUpazila}
        />
      </main>
      <Footer onNavigate={handleNavigate} onSwitchCommunityTab={() => {}} />
      <BottomNav currentView="upazilas" onNavigate={handleNavigate} />
    </div>
  );
}
