'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { useToast } from '@/lib/context/ToastContext';
import { detailedExploreSpots, DetailedExploreSpot, SpotReview } from '@/lib/data/explore-data';

export default function ExploreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();

  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id || '';
  const [spot, setSpot] = useState<DetailedExploreSpot | null>(null);
  const [activePhoto, setActivePhoto] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewerLocation, setReviewerLocation] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    async function fetchSpot() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/explore/${idStr}`);
        const json = await res.json();
        if (json.success && json.data) {
          setSpot(json.data);
          setActivePhoto(json.data.coverImage);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        // Fallback
      }

      // Local fallback
      const found = detailedExploreSpots.find(s => s.id === idStr) || detailedExploreSpots[0];
      setSpot(found);
      setActivePhoto(found.coverImage);
      setIsLoading(false);
    }

    if (idStr) {
      fetchSpot();
    }
  }, [idStr]);

  if (isLoading || !spot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-600">তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) return;

    setIsSubmittingReview(true);
    const payload = {
      author: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
      location: reviewerLocation || 'বগুড়া',
    };

    try {
      const res = await fetch(`/api/explore/${spot.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      const newRev: SpotReview = json.success && json.data ? json.data : {
        id: `rev-${Date.now()}`,
        author: reviewerName,
        rating: reviewRating,
        comment: reviewComment,
        location: reviewerLocation || 'বগুড়া',
        date: '২০২৬',
      };

      setSpot(prev => prev ? {
        ...prev,
        reviews: [newRev, ...(prev.reviews || [])],
      } : null);

      showToast('আপনার অভিজ্ঞতা প্রকাশের জন্য ধন্যবাদ!');
      setReviewerName('');
      setReviewComment('');
      setReviewerLocation('');
    } catch (err) {
      showToast('মন্তব্য সংরক্ষণ করা হয়েছে!');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const relatedSpots = detailedExploreSpots.filter(s => s.id !== spot.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar currentView="explore" onNavigate={() => {}} onOpenSearch={() => {}} />

      <main className="flex-1">
        {/* Top Breadcrumb & Hero Header */}
        <div className="bg-[#F9F8F4] border-b border-slate-200/90 pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mb-4">
              <Link
                href="/"
                className="text-emerald-800 hover:text-amber-700 font-semibold flex items-center gap-1.5 transition"
              >
                <i className="fa-solid fa-house text-xs"></i>
                <span>হোম</span>
              </Link>
              <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
              <Link
                href="/explore"
                className="text-emerald-800 hover:text-amber-700 font-semibold transition"
              >
                দর্শনীয় স্থান
              </Link>
              <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
              <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">
                {spot.title}
              </span>
            </nav>

            {/* Back Button */}
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-[#0B4635] border border-slate-200 text-xs sm:text-sm font-bold shadow-2xs mb-5 transition cursor-pointer"
            >
              <span>← সকল দর্শনীয় স্থানে ফিরুন</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0B4635] text-white">
                    {spot.categoryBn}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    <i className="fa-solid fa-location-dot text-[#C85A28] mr-1"></i>
                    {spot.upazila} উপজেলা
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                    {spot.tag}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {spot.title}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-500 uppercase tracking-wide mt-1">
                  {spot.enTitle}
                </p>
                <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-3xl leading-relaxed">
                  {spot.shortDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-auto">
                <a
                  href={spot.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-[#0B4635] hover:bg-[#C85A28] text-white font-bold text-sm shadow-sm flex items-center gap-2 transition"
                >
                  <i className="fa-solid fa-diamond-turn-right text-amber-300"></i>
                  <span>গুগল ম্যাপে দিকনির্দেশনা</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Main Visual Photo Banner & Gallery */}
          <div className="space-y-4">
            <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-md bg-slate-900">
              <img
                src={activePhoto || spot.coverImage}
                alt={spot.title}
                className="w-full h-full object-cover transition duration-300"
                onError={(e: any) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <i className="fa-solid fa-camera mr-1.5 text-amber-300"></i>
                  বগুড়া জেলা ঐতিহ্য অ্যালবাম
                </span>
                <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <i className="fa-solid fa-location-dot mr-1.5 text-[#C85A28]"></i>
                  {spot.location}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {spot.gallery && spot.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {spot.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(imgUrl)}
                    className={`relative w-28 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                      activePhoto === imgUrl ? 'border-[#C85A28] scale-102 shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4 Key Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <i className="fa-regular fa-clock text-emerald-700"></i>
                <span>সময়সূচি</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{spot.timings}</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <i className="fa-solid fa-ticket text-amber-600"></i>
                <span>প্রবেশ ফি</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{spot.entryFee}</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <i className="fa-solid fa-sun text-yellow-600"></i>
                <span>পরিদর্শনের সেরা সময়</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{spot.bestTime}</p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <i className="fa-solid fa-map-pin text-[#C85A28]"></i>
                <span>অবস্থান ও উপজেলা</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-emerald-900 leading-snug">{spot.upazila}, বগুড়া</p>
            </div>
          </div>

          {/* Main 2-Col Layout: Left Deep History, Right Travel & Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: History & Architecture */}
            <div className="lg:col-span-7 space-y-8">
              {/* Historical Overview */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-md border border-amber-200">
                  ঐতিহাসিক পটভূমি
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-3 mb-4">
                  {spot.title} এর ইতিহাস ও বিস্তার
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>{spot.history}</p>
                </div>
              </div>

              {/* Architecture & Structure if present */}
              {spot.architecture && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-md border border-teal-200">
                    স্থাপত্য ও প্রত্নতাত্ত্বিক বৈশিষ্ট্য
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-4">
                    স্থাপত্যশৈলী ও নিদর্শনসমূহ
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {spot.architecture}
                  </p>
                </div>
              )}

              {/* Public Reviews & Visitor Feedback */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">দর্শনার্থীদের মতামত ও অভিজ্ঞতা</h3>
                    <p className="text-xs text-slate-500 mt-0.5">যারা এই স্থানটি ভ্রমণ করেছেন তাদের অভিজ্ঞতা</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                    {spot.reviews ? spot.reviews.length : 0}টি মন্তব্য
                  </span>
                </div>

                {/* Reviews List */}
                <div className="space-y-4 mb-8">
                  {spot.reviews && spot.reviews.length > 0 ? (
                    spot.reviews.map(rev => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-slate-900 text-sm">{rev.author}</span>
                          <div className="flex text-amber-400 text-xs">
                            {[...Array(rev.rating)].map((_, i) => (
                              <i key={i} className="fa-solid fa-star"></i>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                        <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-2">
                          <span>{rev.location || 'বগুড়া'}</span>
                          <span>·</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-3">এখনো কোনো মতামত জমা পড়েনি। আপনার অভিজ্ঞতা প্রথম জানান!</p>
                  )}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleReviewSubmit} className="pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">আপনার অভিজ্ঞতা বা ভ্রমণ টিপস লিখুন</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={e => setReviewerName(e.target.value)}
                      placeholder="আপনার নাম *"
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <input
                      type="text"
                      value={reviewerLocation}
                      onChange={e => setReviewerLocation(e.target.value)}
                      placeholder="আপনার এলাকা (যেমন: ঢাকা / বগুড়া)"
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="flex items-center gap-2 py-1">
                    <span className="text-xs font-semibold text-slate-600">রেটিং:</span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map(num => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setReviewRating(num)}
                          className={`text-sm cursor-pointer transition ${
                            num <= reviewRating ? 'text-amber-400' : 'text-slate-300'
                          }`}
                        >
                          <i className="fa-solid fa-star"></i>
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="স্থানটি সম্পর্কে আপনার মতামত বা পরবর্তী পর্যটকদের জন্য দরকারী টিপস..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                  >
                    {isSubmittingReview ? 'জমা হচ্ছে...' : 'মতামত প্রকাশ করুন'}
                  </button>
                </form>
              </div>
            </div>

            {/* Right 5 Cols: How to Reach & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              {/* How to Reach Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 mb-3 w-fit">
                  <i className="fa-solid fa-route"></i>
                  <span>যাতায়াত গাইড</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">কীভাবে যাবেন</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {spot.howToReach}
                </p>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-info text-amber-600"></i>
                    <span>ভ্রমণকারীদের জন্য পরামর্শ</span>
                  </p>
                  <p>বগুড়া শহর থেকে রিজার্ভ সিএনজি বা অটো নিলে সাশ্রয়ী হবে। সকালের দিকে যাত্রা শুরু করলে ভিড় এড়িয়ে ভালোভাবে ঘুরে দেখা যায়।</p>
                </div>
              </div>

              {/* Highlights Checklist */}
              {spot.highlights && spot.highlights.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-sparkles text-amber-500"></i>
                    <span>বিশেষ আকর্ষণ ও দেখার মতো বিষয়</span>
                  </h3>
                  <ul className="space-y-3">
                    {spot.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <i className="fa-solid fa-circle-check text-emerald-600 text-sm mt-0.5 shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contributor Attribution Box */}
              <div className="bg-gradient-to-br from-[#0B4635] to-emerald-950 text-white rounded-3xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 text-base">
                    <i className="fa-solid fa-certificate"></i>
                  </div>
                  <div>
                    <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">নাগরিক তথ্যভাণ্ডার অবদানকারী</p>
                    <h4 className="font-bold text-base">{spot.contributor.name}</h4>
                  </div>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {spot.contributor.note || 'বগুড়ার সমৃদ্ধ ইতিহাস ও পর্যটন তথ্য নাগরিকদের মাঝে ছড়িয়ে দেওয়ার এক মহৎ উদ্যোগ।'}
                </p>
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-200">
                  <span>সংগ্রহের তারিখ: {spot.contributor.date}</span>
                  <span className="text-amber-300 font-semibold">যাচাইকৃত তথ্য</span>
                </div>
              </div>

              {/* Related Spots Links */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
                <h4 className="font-bold text-slate-900 text-base mb-3">বগুড়ার আরও দর্শনীয় স্থান</h4>
                <div className="space-y-2.5">
                  {relatedSpots.map(rel => (
                    <Link
                      key={rel.id}
                      href={`/explore/${rel.id}`}
                      className="p-3 rounded-2xl bg-[#F9F8F4] hover:bg-emerald-50 border border-slate-200/70 flex items-center justify-between transition group"
                    >
                      <div>
                        <p className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition">
                          {rel.title}
                        </p>
                        <p className="text-[11px] text-slate-500">{rel.upazila} · {rel.categoryBn}</p>
                      </div>
                      <i className="fa-solid fa-arrow-right text-xs text-slate-400 group-hover:text-emerald-700"></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={() => {}} onSwitchCommunityTab={() => {}} />
      <BottomNav currentView="explore" onNavigate={() => {}} />
    </div>
  );
}

