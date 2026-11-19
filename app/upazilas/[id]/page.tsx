'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import UpazilaDetailView from '@/components/UpazilaDetailView';
import { upazilasData, Upazila } from '@/lib/data/district-data';
import { boguraUpazilasData } from '@/lib/data/unions-villages-data';

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

  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id || '0';
  const num = parseInt(idStr, 10);
  let validIndex = 0;

  if (!isNaN(num) && num >= 0 && num < upazilas.length) {
    validIndex = num;
  } else {
    const slugIdx = boguraUpazilasData.findIndex(
      u => u.id.toLowerCase() === idStr.toLowerCase()
    );
    if (slugIdx !== -1) {
      validIndex = slugIdx;
    }
  }

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

