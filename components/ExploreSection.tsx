'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { detailedExploreSpots } from '@/lib/data/explore-data';

interface ExploreSectionProps {
  exploreSpots?: any[];
}

export default function ExploreSection({ exploreSpots }: ExploreSectionProps = {}) {
  const { t } = useLanguage();

  const list = exploreSpots && exploreSpots.length > 0 ? exploreSpots : detailedExploreSpots;
  const previewSpots = list.slice(0, 6);

  return (
    <section id="explore" aria-labelledby="explore-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-3 sm:mb-5">
        <div>
          <h2 id="explore-title" className="text-xl sm:text-2xl font-bold text-slate-900">
            {t('expTitle')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{t('expSubtitle')}</p>
        </div>
        <Link
          href="/explore"
          className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition shrink-0 self-start sm:self-auto"
        >
          <span>সকল দর্শনীয় স্থান ({list.length})</span>
          <i className="fa-solid fa-arrow-right text-[10px]"></i>
        </Link>
      </div>

      {/* Swipeable row on mobile, grid from md */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-1">
        {previewSpots.map(spot => (
          <article
            key={spot.id}
            className="snap-start shrink-0 w-[78%] min-[480px]:w-[52%] md:w-auto bg-white rounded-2xl overflow-hidden border border-slate-200/90 card-hover shadow-2xs group"
          >
            <Link href={`/explore/${spot.id}`} className="block" aria-label={`${spot.title} — বিস্তারিত দেখুন`}>
              <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src={spot.coverImage}
                  alt={`${spot.title} — ${spot.upazila}, বগুড়া`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=70';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/85 text-emerald-200 border border-emerald-700/50">
                    {spot.categoryBn}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-emerald-950">{spot.upazila}</span>
                </div>
                <h3 className="absolute bottom-2.5 inset-x-3 text-white text-base font-bold leading-snug drop-shadow-xs">{spot.title}</h3>
              </div>
              <div className="p-3.5">
                <p className="text-[11px] font-semibold text-emerald-800 mb-1 flex items-center gap-1.5 truncate">
                  <i className="fa-solid fa-location-dot text-[#C85A28]"></i> {spot.location}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{spot.shortDesc}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
