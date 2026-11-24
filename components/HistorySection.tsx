'use client';

import Link from '@/lib/i18n/navigation';
import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SiteContent } from '@/lib/data/district-data';

interface HistorySectionProps {
  siteContent?: SiteContent;
}

export default function HistorySection({ siteContent }: HistorySectionProps = {}) {
  const { t } = useLanguage();

  return (
    <section id="history" aria-labelledby="history-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* History Timeline Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
              {siteContent?.historyBadge || t('history.badge')}
            </span>
            {siteContent?.historyPeriod && (
              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <i className="fa-regular fa-clock mr-1 text-emerald-600"></i>
                {siteContent.historyPeriod}
              </span>
            )}
          </div>
          <h2 id="history-title" className="text-xl sm:text-3xl font-bold text-slate-900 mt-2 mb-3">
            {siteContent?.historyTitle || t('history.title')}
          </h2>

          {siteContent?.historySummary && (
            <div className="p-4 mb-6 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
              <p>{siteContent.historySummary}</p>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
            {/* Milestone 1 */}
            <div className="relative pl-10">
              <span className="w-7 h-7 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center absolute left-0 top-0.5 shadow">
                ১
              </span>
              <span className="text-xs font-bold text-amber-700">খ্রিস্টপূর্ব ৩য় শতাব্দী · মৌর্য যুগ</span>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-0.5">প্রাচীন রাজধানী পুণ্ড্রনগর (মহাস্থানগড়)</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                করতোয়া নদীর পশ্চিম তীরে অবস্থিত মহাস্থানগড় ছিল প্রাচীন পুণ্ড্রবর্ধন রাজ্যের রাজধানী। এখান থেকে প্রাপ্ত ব্রাহ্মী শিলালিপি বাংলা অঞ্চলের প্রাচীনতম লিখিত নিদর্শন।
              </p>
            </div>

            {/* Milestone 2 */}
            <div className="relative pl-10">
              <span className="w-7 h-7 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center absolute left-0 top-0.5 shadow">
                ২
              </span>
              <span className="text-xs font-bold text-amber-700">পাল ও সুলতানি আমল · অষ্টম–ষোড়শ শতাব্দী</span>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-0.5">বৌদ্ধ বিহার ও সুলতানি স্থাপত্যের বিকাশ</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                পাল আমলে ভাসু বিহার ও বিহার ধাপ জ্ঞানচর্চার কেন্দ্রে পরিণত হয়। পরবর্তীতে ১৫৮২ সালে শেরপুরে নির্মিত ঐতিহাসিক খেরুয়া মসজিদ সুলতানি ও মুঘল স্থাপত্যের অপূর্ব নিদর্শন বহন করে।
              </p>
            </div>

            {/* Milestone 3 */}
            <div className="relative pl-10">
              <span className="w-7 h-7 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center absolute left-0 top-0.5 shadow">
                ৩
              </span>
              <span className="text-xs font-bold text-amber-700">১৮২১ সাল · ব্রিটিশ প্রশাসনিক সংস্কার</span>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-0.5">স্বতন্ত্র বগুড়া জেলা প্রতিষ্ঠা</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                রাজশাহী, রংপুর ও দিনাজপুর জেলার অংশবিশেষ নিয়ে ১৮২১ সালের ১৩ এপ্রিল স্বতন্ত্র বগুড়া জেলা গঠিত হয়। সুলতান গিয়াসউদ্দিন বলবনের পুত্র নাসিরউদ্দিন বগরা খানের নামানুসারে 'বগুড়া' নামকরণ হয়।
              </p>
            </div>

            {/* Milestone 4 */}
            <div className="relative pl-10">
              <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center absolute left-0 top-0.5 shadow">
                ৪
              </span>
              <span className="text-xs font-bold text-amber-700">১৯৭১ · মহান মুক্তিযুদ্ধ ও উত্তরবঙ্গের প্রাণকেন্দ্র</span>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-0.5">মুক্তিযুদ্ধে বীরত্বগাথা ও বর্তমান বগুড়া</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                ১৯৭১ সালের মুক্তিযুদ্ধে ৭ নম্বর সেক্টরের অধীনে বগুড়ার মুক্তিযোদ্ধারা অসীম সাহসিকতায় যুদ্ধ করেন। বর্তমানে বগুড়া উত্তরবঙ্গের শিক্ষা, চিকিৎসা, কৃষি ও ক্ষুদ্র-মাঝারি শিল্পের প্রধান কেন্দ্র।
              </p>
            </div>
          </div>
        </div>

        {/* District Stats & Map Card (5 cols) */}
        <div id="stats" className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="bg-emerald-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-md">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">এক নজরে বগুড়া</span>
                <h3 className="text-xl font-bold mt-1">জেলা পরিসংখ্যান ও পরিচিতি</h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 text-xl">
                <i className="fa-solid fa-map"></i>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              <div className="bg-white/10 rounded-xl p-3 sm:p-4 border border-white/10">
                <p className="text-xs text-emerald-200">উপজেলা ও থানা</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {siteContent?.stats?.upazilas ? siteContent.stats.upazilas.replace('টি', '') : '১২'}{' '}
                  <span className="text-xs font-normal text-amber-300">টি উপজেলা</span>
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 sm:p-4 border border-white/10">
                <p className="text-xs text-emerald-200">ইউনিয়ন পরিষদ</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {siteContent?.stats?.unions ? siteContent.stats.unions.replace('টি', '') : '১০৮'}{' '}
                  <span className="text-xs font-normal text-amber-300">টি ইউনিয়ন</span>
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 sm:p-4 border border-white/10">
                <p className="text-xs text-emerald-200">গ্রাম ও মহল্লা</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {siteContent?.stats?.villages ? siteContent.stats.villages.replace('টি', '') : '২,৬৯২'}{' '}
                  <span className="text-xs font-normal text-amber-300">টি গ্রাম</span>
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 sm:p-4 border border-white/10">
                <p className="text-xs text-emerald-200">আনুমানিক জনসংখ্যা</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {siteContent?.stats?.population || '৩৫+ লক্ষ'}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/10 space-y-2.5 text-sm text-emerald-100">
              <div className="flex justify-between">
                <span className="text-emerald-300">প্রধান নদ-নদী:</span>
                <span className="font-semibold">করতোয়া, যমুনা, বাঙালি, নাগর</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">সংসদীয় আসন:</span>
                <span className="font-semibold">৭টি (বগুড়া-১ থেকে বগুড়া-৭)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">জিআই স্বীকৃত পণ্য:</span>
                <span className="font-semibold text-amber-300">বগুড়ার দই (২০২৩)</span>
              </div>
            </div>
          </div>

          {/* Stylized Vector Map Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-900 text-base">ভৌগোলিক অবস্থান ও সীমানা</h4>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                উত্তরবঙ্গের প্রাণকেন্দ্র
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 flex flex-col items-center">
              <svg className="hidden sm:block w-full max-w-[260px] h-48" viewBox="0 0 260 220" fill="none">
                <path
                  d="M95 20 L145 18 L175 45 L195 95 L182 145 L155 185 L110 198 L72 182 L48 140 L55 88 L72 48 Z"
                  fill="#ecfdf5"
                  stroke="#047857"
                  strokeWidth="3"
                />
                <path
                  d="M118 18 C112 65, 132 105, 116 150 C108 175, 122 192, 125 200"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
                <path
                  d="M180 42 C202 85, 200 130, 172 175"
                  stroke="#0284c7"
                  strokeWidth="4"
                  opacity="0.5"
                />
                <circle cx="120" cy="105" r="6" fill="#d97706" />
                <text x="130" y="109" fill="#064e3b" fontSize="11" fontWeight="bold">
                  বগুড়া সদর
                </text>
                <circle cx="116" cy="58" r="4.5" fill="#059669" />
                <text x="64" y="55" fill="#0f172a" fontSize="9.5" fontWeight="600">
                  মহাস্থানগড়
                </text>
                <circle cx="132" cy="162" r="4.5" fill="#059669" />
                <text x="139" y="166" fill="#0f172a" fontSize="9.5" fontWeight="600">
                  শেরপুর
                </text>
                <circle cx="176" cy="96" r="4.5" fill="#059669" />
                <text x="128" y="88" fill="#0f172a" fontSize="9" fontWeight="600">
                  সারিয়াকান্দি
                </text>
              </svg>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600 mt-2 w-full pt-3 border-t border-slate-200/70">
                <div>
                  <strong className="text-slate-800">উত্তরে:</strong> গাইবান্ধা ও জয়পুরহাট
                </div>
                <div>
                  <strong className="text-slate-800">দক্ষিণে:</strong> নাটোর ও সিরাজগঞ্জ
                </div>
                <div>
                  <strong className="text-slate-800">পূর্বে:</strong> জামালপুর (যমুনা নদী)
                </div>
                <div>
                  <strong className="text-slate-800">পশ্চিমে:</strong> নওগাঁ জেলা
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Conversion Closer: Civic Contribution Banner */}
      <div className="mt-6 sm:mt-10 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
              <i className="fa-solid fa-heart-circle-plus text-rose-400"></i>
              <span>নাগরিক সম্পৃক্ততা ও অবদান</span>
            </span>
            <h3 className="text-lg sm:text-2xl font-black tracking-tight leading-snug">
              আপনি কি বগুড়ার কোনো নির্ভরযোগ্য তথ্য জানেন?
            </h3>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
              আপনার এলাকার নতুন চিকিৎসাকেন্দ্র, রক্তদাতা নিবন্ধন, দর্শনীয় স্থান, হোটেল বা শিক্ষাপ্রতিষ্ঠানের তথ্য দিয়ে আমার বগুড়া প্ল্যাটফর্মকে সমৃদ্ধ করুন।
            </p>
          </div>
          <Link
            href="/contribute"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 shrink-0"
          >
            <i className="fa-solid fa-plus text-slate-900"></i>
            <span>নাগরিক তথ্য অবদান রাখুন</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

