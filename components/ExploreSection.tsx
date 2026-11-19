'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';
import { ExploreSpot } from '@/lib/data/district-data';

interface ExploreSectionProps {
  exploreSpots: ExploreSpot[];
}

export default function ExploreSection({ exploreSpots }: ExploreSectionProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleDirections = (title: string) => {
    showToast(`${title} — গুগল ম্যাপে অবস্থান সংরক্ষিত হয়েছে`);
  };

  return (
    <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exploreSpots.map(spot => (
          <div
            key={spot.title}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 card-hover flex flex-col justify-between"
          >
            <div>
              {/* Artistic Vector Banner Header */}
              <div
                className={`h-36 bg-gradient-to-br ${spot.color} p-5 text-white relative overflow-hidden flex flex-col justify-between`}
              >
                <div className="absolute -right-4 -bottom-4 text-white/10 text-8xl pointer-events-none">
                  <i className="fa-solid fa-landmark"></i>
                </div>
                <span className="self-start text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20">
                  {spot.tag}
                </span>
                <div>
                  <p className="text-[11px] text-amber-300 font-medium">{spot.enTitle}</p>
                  <h3 className="text-lg font-bold leading-snug">{spot.title}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold text-emerald-800 mb-2 flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot text-amber-600"></i> {spot.location}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">{spot.desc}</p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">বগুড়া ঐতিহ্য গাইড</span>
              <button
                onClick={() => handleDirections(spot.title)}
                className="text-emerald-800 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer transition"
              >
                <span>দিকনির্দেশনা</span> <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
