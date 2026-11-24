'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import SearchModal from '@/components/SearchModal';
import { EducationalInstitute } from '@/lib/types/education';

export default function EducationProfilePage() {
  const params = useParams();
  const router = useRouter();
  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id || '';

  const [institute, setInstitute] = useState<EducationalInstitute | null>(null);
  const [related, setRelated] = useState<EducationalInstitute[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      if (!idStr) return;
      setIsLoading(true);
      try {
        const res = await fetch(`/api/education/${idStr}`);
        const json = await res.json();
        if (json.success && json.data) {
          const inst: EducationalInstitute = json.data;
          setInstitute(inst);

          // Fetch related in the same upazila
          if (inst.upazila) {
            try {
              const relRes = await fetch(`/api/education?upazila=${encodeURIComponent(inst.upazila)}&limit=6`);
              const relJson = await relRes.json();
              if (relJson.success && relJson.data?.institutes) {
                const filtered = relJson.data.institutes
                  .filter((i: EducationalInstitute) => i.id !== inst.id)
                  .slice(0, 3);
                setRelated(filtered);
              }
            } catch (err) {
              // Ignore related error
            }
          }
        } else {
          setInstitute(null);
        }
      } catch (err) {
        setInstitute(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [idStr]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar currentView="education" onOpenSearch={() => setIsSearchOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-600 mt-4">শিক্ষাপ্রতিষ্ঠানের তথ্য লোড হচ্ছে...</p>
        </div>
        <Footer />
        <BottomNav currentView="education" />
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar currentView="education" onOpenSearch={() => setIsSearchOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mb-4">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-900">প্রতিষ্ঠানটি পাওয়া যায়নি</h2>
          <p className="text-xs text-slate-500 mt-2">
            আপনার অনুরোধকৃত শিক্ষাপ্রতিষ্ঠানটির তথ্য বা EIIN পাওয়া যায়নি।
          </p>
          <Link
            href="/education"
            className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition"
          >
            ডিরেক্টরিতে ফিরে যান
          </Link>
        </div>
        <Footer />
        <BottomNav currentView="education" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar currentView="education" onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Header Breadcrumbs */}
      <div className="bg-slate-100 border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="w-full max-w-[1600px] mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-800 transition">হোম</Link>
          <span>/</span>
          <Link href="/education" className="hover:text-emerald-800 transition">শিক্ষাপ্রতিষ্ঠান ও কলেজ ডিরেক্টরি</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{institute.name}</span>
        </div>
      </div>

      {/* Hero Cover Page with Campus Photo */}
      <section className="relative w-full h-72 sm:h-96 lg:h-[420px] bg-slate-900 overflow-hidden">
        <img
          src={institute.coverImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80'}
          alt={institute.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 absolute inset-x-0 bottom-6 sm:bottom-8 z-10">
          <div className="max-w-4xl space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {institute.rank && institute.rank > 0 && (
                <span className="px-3.5 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5">
                  <i className="fa-solid fa-trophy"></i>
                  <span>সোহোপ্যাথি র্যাঙ্ক #{institute.rank}</span>
                </span>
              )}
              <span className="px-3 py-1 rounded-xl bg-slate-900/80 text-emerald-300 font-mono text-xs font-bold border border-emerald-400/30 backdrop-blur-md">
                EIIN: {institute.eiin}
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                {institute.categoryBn}
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-600/80 text-white text-xs font-semibold backdrop-blur-md">
                {institute.management}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {institute.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium flex items-center gap-2">
              <span>{institute.enName}</span>
              <span>·</span>
              <span className="text-emerald-300 flex items-center gap-1">
                <i className="fa-solid fa-location-dot text-rose-400"></i>
                {institute.location}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details, History, Results, Facilities (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Results Statistics Card */}
            {institute.stats && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-chart-column text-emerald-700"></i>
                    <span>পাবলিক পরীক্ষা ও একাডেমিক ফলাফল পরিসংখ্যান</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">সোহোপ্যাথি ও বোর্ড ডেটা</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                    <span className="text-xs text-emerald-800 font-medium block">মোট পরীক্ষার্থী</span>
                    <span className="text-xl font-black text-emerald-950 mt-1 block">{institute.stats.appeared || 'N/A'}</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">অংশগ্রহণকারী</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
                    <span className="text-xs text-teal-800 font-medium block">কৃতকার্য শিক্ষার্থী</span>
                    <span className="text-xl font-black text-teal-950 mt-1 block">{institute.stats.passed || 'N/A'}</span>
                    <span className="text-[10px] text-teal-600 block mt-0.5">সফলভাবে উত্তীর্ণ</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
                    <span className="text-xs text-amber-800 font-medium block">জিপিএ-৫ অর্জন</span>
                    <span className="text-xl font-black text-amber-950 mt-1 block">{institute.stats.gpa5 || '০'}</span>
                    <span className="text-[10px] text-amber-600 block mt-0.5">সর্বোচ্চ গ্রেড</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                    <span className="text-xs text-blue-800 font-medium block">গড় পাসের হার</span>
                    <span className="text-xl font-black text-blue-950 mt-1 block">{institute.stats.passRate || '৯৮%'}</span>
                    <span className="text-[10px] text-blue-600 block mt-0.5">সাফল্যের সূচক</span>
                  </div>
                </div>
              </div>
            )}

            {/* Overview & History */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <i className="fa-solid fa-landmark text-emerald-700"></i>
                <span>পরিচিতি ও ঐতিহাসিক পটভূমি</span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {institute.shortDesc}
              </p>
              {institute.history && (
                <div className="text-sm text-slate-600 leading-relaxed pt-2 space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-emerald-800">প্রতিষ্ঠার ইতিহাস</h4>
                  <p>{institute.history}</p>
                </div>
              )}
            </div>

            {/* Courses & Academic Offerings */}
            {institute.courses && institute.courses.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <i className="fa-solid fa-book-open-reader text-emerald-700"></i>
                  <span>অনুষদ, বিভাগ ও শিক্ষাক্রম</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {institute.courses.map((course, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Campus Facilities */}
            {institute.facilities && institute.facilities.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <i className="fa-solid fa-list-check text-emerald-700"></i>
                  <span>ক্যাম্পাস সুযোগ-সুবিধা</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {institute.facilities.map((fac, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <i className="fa-solid fa-circle-check text-teal-600 text-sm"></i>
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Details, Contact Card, Map, Related (1 Col) */}
          <div className="space-y-6">
            {/* Quick Profile Summary Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                একনজরে প্রাতিষ্ঠানিক তথ্য
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">EIIN কোড</span>
                  <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{institute.eiin}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">জেলা র্যাঙ্কিং</span>
                  <span className="font-bold text-amber-600">
                    {institute.rank && institute.rank > 0 ? `#${institute.rank}` : 'অ্যাক্রেডিটেড'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">স্থাপিত সাল</span>
                  <span className="font-semibold text-slate-800">{institute.established}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">ম্যানেজমেন্ট</span>
                  <span className="font-semibold text-slate-800">{institute.management}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">শিক্ষা স্তর</span>
                  <span className="font-semibold text-slate-800 text-right max-w-[180px] truncate">{institute.educationLevel}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">শিক্ষা বোর্ড</span>
                  <span className="font-semibold text-slate-800">{institute.board}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400 font-medium">অধ্যক্ষ / প্রধান</span>
                  <span className="font-semibold text-slate-800">{institute.principal || 'অধ্যক্ষ মহোদয়'}</span>
                </div>
              </div>
            </div>

            {/* Official Contact & Location Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                যোগাযোগ ও অবস্থান
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-phone text-emerald-700 mt-1"></i>
                  <div>
                    <span className="text-slate-400 block font-medium">হেল্পলাইন / টেলিফোন</span>
                    <a href={`tel:${institute.phone}`} className="font-bold text-emerald-800 font-mono hover:underline">
                      {institute.phone}
                    </a>
                  </div>
                </div>

                {institute.email && (
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-envelope text-emerald-700 mt-1"></i>
                    <div>
                      <span className="text-slate-400 block font-medium">ইমেইল</span>
                      <a href={`mailto:${institute.email}`} className="font-semibold text-slate-700 hover:underline">
                        {institute.email}
                      </a>
                    </div>
                  </div>
                )}

                {institute.website && (
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-globe text-emerald-700 mt-1"></i>
                    <div>
                      <span className="text-slate-400 block font-medium">অফিসিয়াল ওয়েবসাইট</span>
                      <a
                        href={institute.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-600 hover:underline break-all"
                      >
                        {institute.website}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-map-pin text-rose-500 mt-1"></i>
                  <div>
                    <span className="text-slate-400 block font-medium">ঠিকানা ও উপজেলা</span>
                    <span className="font-semibold text-slate-800">{institute.location}</span>
                  </div>
                </div>
              </div>

              {institute.mapUrl && (
                <div className="pt-2">
                  <a
                    href={institute.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <i className="fa-solid fa-map-location-dot"></i>
                    <span>গুগল ম্যাপে লোকেশন দেখুন</span>
                  </a>
                </div>
              )}
            </div>

            {/* Related Institutes in same Upazila */}
            {related.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                  {institute.upazila} উপজেলার অন্যান্য প্রতিষ্ঠান
                </h3>
                <div className="space-y-3">
                  {related.map(r => (
                    <Link
                      key={r.id}
                      href={`/education/${r.id}`}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 text-xs block group-hover:text-emerald-800 transition line-clamp-1">
                          {r.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">EIIN: {r.eiin}</span>
                      </div>
                      <i className="fa-solid fa-chevron-right text-slate-400 group-hover:text-emerald-700 text-xs transition"></i>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav currentView="education" />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(view, anchor) => {
          setIsSearchOpen(false);
          if (view === 'home') {
            router.push(`/${anchor ? '#' + anchor : ''}`);
          } else {
            router.push(`/${view}`);
          }
        }}
      />
    </div>
  );
}
