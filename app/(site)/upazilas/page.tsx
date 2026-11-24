'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import UpazilasPageView from '@/components/UpazilasPageView';
import { upazilasData, Upazila } from '@/lib/data/district-data';

export default function UpazilasPage() {
  const router = useRouter();
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

  const handleNavigate = (view: string, anchor?: string) => {
    if (view === 'home') {
      router.push(`/${anchor ? '#' + anchor : ''}`);
    } else if (view === 'upazilas') {
      router.push('/upazilas');
    }
  };

  const handleOpenDetail = (index: number) => {
    router.push(`/upazilas/${index}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar
        currentView="upazilas"
        onNavigate={handleNavigate}
        onOpenSearch={() => {}}
      />
      <main className="flex-1">
        <UpazilasPageView
          upazilas={upazilas}
          onNavigate={handleNavigate}
          onOpenDetail={handleOpenDetail}
        />
      </main>
      <Footer onNavigate={handleNavigate} onSwitchCommunityTab={() => {}} />
      <BottomNav currentView="upazilas" onNavigate={handleNavigate} />
    </div>
  );
}

