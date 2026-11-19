'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';
import { detailedExploreSpots, DetailedExploreSpot } from '@/lib/data/explore-data';
import { ExploreSpot } from '@/lib/data/district-data';

interface ExploreSectionProps {
  exploreSpots?: ExploreSpot[] | DetailedExploreSpot[];
}

export default function ExploreSection({ exploreSpots }: ExploreSectionProps = {}) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleDirections = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`${title} — গুগল ম্যাপে অবস্থান সংরক্ষিত হয়েছে`);
  };

  const previewSpots = detailedExploreSpots.slice(0, 6);

  return (
    <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-md border border-teal-200">
            {t('expBadge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {t('expTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {t('expSubtitle')}
          </p>
        </div>

        <Link
          href="/explore"
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <span>সকল দর্শনীয় স্থান ({detailedExploreSpots.length})</span>
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previewSpots.map(spot => (
          <article
            key={spot.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 card-hover flex flex-col justify-between shadow-2xs group"
          >
            <div>
              {/* Cover Photo Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={spot.coverImage}
                  alt={spot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e: any) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/85 backdrop-blur-md text-emerald-200 border border-emerald-700/50">
                    {spot.categoryBn}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-emerald-950">
                    {spot.upazila}
                  </span>
                </div>

                <div className="absolute bottom-3 inset-x-4 text-white">
                  <p className="text-[10px] text-amber-300 font-medium uppercase tracking-wider">{spot.enTitle}</p>
                  <h3 className="text-lg font-bold leading-snug drop-shadow-xs">{spot.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot text-[#C85A28]"></i> {spot.location}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{spot.shortDesc}</p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={(e) => handleDirections(spot.title, e)}
                className="text-slate-500 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer transition"
              >
                <i className="fa-solid fa-diamond-turn-right text-emerald-700"></i>
                <span>দিকনির্দেশনা</span>
              </button>

              <Link
                href={`/explore/${spot.id}`}
                className="text-emerald-800 hover:text-[#C85A28] font-bold flex items-center gap-1.5 cursor-pointer transition"
              >
                <span>বিস্তারিত দেখুন</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
