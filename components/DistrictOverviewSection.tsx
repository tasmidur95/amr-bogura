'use client';

import React from 'react';
import Link from 'next/link';

export default function DistrictOverviewSection() {
  const pillars = [
    {
      id: 'admin',
      title: 'ভৌগোলিক ও প্রশাসনিক কাঠামো',
      subtitle: '১২টি উপজেলা • ১০৮টি ইউনিয়ন • ২,৬৯২টি গ্রাম',
      metric: '২,৮৯৮.২৫ কিমি²',
      metricLabel: 'মোট ভৌগোলিক আয়তন',
      icon: 'fa-building-columns',
      color: 'amber',
      bgGrad: 'from-amber-500/10 to-amber-500/5',
      borderColor: 'border-amber-200/80',
      textColor: 'text-amber-800',
      badgeBg: 'bg-amber-100 text-amber-900',
      desc: 'করতোয়া বিধৌত প্রাচীন পুণ্ড্রবর্ধনভূমি। ৪টি পৌরসভা ও ১২টি উপজেলার সমন্বয়ে উত্তরবঙ্গের অন্যতম বৃহৎ প্রশাসনিক ও বাণিজ্যকেন্দ্র।',
      linkText: 'উপজেলা ও ইউনিয়ন প্রোফাইল',
      href: '/upazilas',
    },
    {
      id: 'healthcare',
      title: 'স্বাস্থ্যসেবা ও জরুরি ব্যবস্থা',
      subtitle: '১০০০ শয্যার শজিমেক • ১২টি উপজেলা স্বাস্থ্য কমপ্লেক্স',
      metric: '৩৫২+ কেন্দ্র',
      metricLabel: 'নিবন্ধিত স্বাস্থ্য অবকাঠামো',
      icon: 'fa-notes-medical',
      color: 'emerald',
      bgGrad: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-200/80',
      textColor: 'text-emerald-800',
      badgeBg: 'bg-emerald-100 text-emerald-900',
      desc: 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল (শজিমেক), মোহাম্মদ আলী জেলা হাসপাতাল ও ইউনিয়ন পর্যায়ে ২৪/৭ বিস্তৃত স্বাস্থ্য নেটওয়ার্ক।',
      linkText: 'হাসপাতাল ডিরেক্টরি ও ম্যাপ',
      href: '/healthcare',
    },
    {
      id: 'transport',
      title: 'উত্তরবঙ্গের প্রবেশদ্বার (পরিবহন হাব)',
      subtitle: 'কেন্দ্রীয় টার্মিনাল • সান্তাহার জংশন • আন্তঃজেলা কোচ',
      metric: '১০টি টার্মিনাল',
      metricLabel: 'প্রধান যোগাযোগ হাব ও জংশন',
      icon: 'fa-bus-simple',
      color: 'blue',
      bgGrad: 'from-blue-500/10 to-blue-500/5',
      borderColor: 'border-blue-200/80',
      textColor: 'text-blue-800',
      badgeBg: 'bg-blue-100 text-blue-900',
      desc: 'চারমাথা ও ঠনঠনিয়া কেন্দ্রীয় বাস টার্মিনাল, ঐতিহ্যবাহী সান্তাহার রেলওয়ে জংশন এবং দেশের সকল বিভাগের সাথে সরাসরি ২৪/৭ যোগাযোগ।',
      linkText: 'টার্মিনাল ও পরিবহন সেবা',
      href: '/transport',
    },
    {
      id: 'hospitality',
      title: 'আতিথেয়তা ও ঐতিহ্যবাহী খাবার',
      subtitle: '৫-তারকা মোমো ইন • নাজ গার্ডেন • জিআই বগুড়ার দই',
      metric: '৪১+ প্রতিষ্ঠান',
      metricLabel: 'হোটেল, রিসোর্ট ও মিষ্টির দোকান',
      icon: 'fa-hotel',
      color: 'rose',
      bgGrad: 'from-rose-500/10 to-rose-500/5',
      borderColor: 'border-rose-200/80',
      textColor: 'text-rose-800',
      badgeBg: 'bg-rose-100 text-rose-900',
      desc: 'আন্তর্জাতিক মানের রিসোর্ট, আধুনিক মোটেল ও বিশ্বখ্যাত ভৌগোলিক নির্দেশক (GI) স্বীকৃতিপ্রাপ্ত শতবর্ষী বগুড়ার খাঁটি দই-মিষ্টির রসনা বিলাস।',
      linkText: 'হোটেল ও রেস্তোরাঁ গাইড',
      href: '/hospitality',
    },
    {
      id: 'education',
      title: 'শিক্ষা ও মেধার তীর্থভূমি',
      subtitle: 'সরকারি আজিজুল হক কলেজ • জিলা স্কুল • পলিটেকনিক',
      metric: '১,৫৭০+ প্রতিষ্ঠান',
      metricLabel: 'স্কুল, কলেজ ও মাদ্রাসা',
      icon: 'fa-graduation-cap',
      color: 'indigo',
      bgGrad: 'from-indigo-500/10 to-indigo-500/5',
      borderColor: 'border-indigo-200/80',
      textColor: 'text-indigo-800',
      badgeBg: 'bg-indigo-100 text-indigo-900',
      desc: 'উত্তরবঙ্গের অন্যতম শীর্ষ বিদ্যাপীঠ সরকারি আজিজুল হক কলেজ, ঐতিহ্যবাহী বগুড়া জিলা স্কুল ও কারিগরি শিক্ষা কেন্দ্রের সমাহার।',
      linkText: 'শিক্ষা প্রতিষ্ঠান ডিরেক্টরি',
      href: '/education',
    },
    {
      id: 'community',
      title: 'নাগরিক নেটওয়ার্ক ও রক্তদাতা ডাটাবেজ',
      subtitle: '৮টি ব্লাড গ্রুপ • ১২ উপজেলা • সন্ধানী ও রেড ক্রিসেন্ট',
      metric: '৩৬+ রক্তদাতা',
      metricLabel: 'নিবন্ধিত জীবন রক্ষাকারী ডোনার',
      icon: 'fa-users',
      color: 'teal',
      bgGrad: 'from-teal-500/10 to-teal-500/5',
      borderColor: 'border-teal-200/80',
      textColor: 'text-teal-800',
      badgeBg: 'bg-teal-100 text-teal-900',
      desc: 'জরুরি রক্তের চাহিদা পূরণ, প্রাইভেসি-সুরক্ষিত ফোন নম্বর, টিউশন, বাসা ভাড়া ও চাকরি সন্ধানকারীদের নিয়ে এক স্বয়ংসম্পূর্ণ নাগরিক ফোরাম।',
      linkText: 'কমিউনিটি ও রক্তদাতা পোর্টাল',
      href: '/community',
    },
  ];

  const stats = [
    { v: '১২টি', l: 'উপজেলা ও পৌরসভা', c: 'text-amber-400' },
    { v: '৩৫২+', l: 'স্বাস্থ্যসেবা প্রতিষ্ঠান', c: 'text-emerald-300' },
    { v: '১,৫৭০+', l: 'শিক্ষাপ্রতিষ্ঠান', c: 'text-teal-300' },
    { v: '১০টি', l: 'যোগাযোগ হাব ও জংশন', c: 'text-blue-300' },
    { v: '৪১+', l: 'হোটেল ও রেস্তোরাঁ', c: 'text-rose-300' },
    { v: 'GI', l: 'স্বীকৃত বগুড়ার দই', c: 'text-yellow-300' },
  ];

  return (
    <section id="district-overview" aria-labelledby="overview-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Summary + key figures */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl relative overflow-hidden mb-4 sm:mb-6 border border-emerald-900">
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-emerald-700/20 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[11px] font-bold mb-2">
              <i className="fa-solid fa-chart-pie text-amber-400"></i>
              <span>বগুড়া জেলা এক নজরে</span>
            </span>
            <h2 id="overview-title" className="text-lg sm:text-3xl font-black tracking-tight leading-snug">
              ঐতিহাসিক পুণ্ড্রবর্ধন থেকে আধুনিক উত্তরবঙ্গের অর্থনৈতিক প্রাণকেন্দ্র
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-2 leading-relaxed">
              করতোয়ার তীরের আড়াই হাজার বছরের মহাস্থানগড়, ১২টি উপজেলা, ৩৫২+ চিকিৎসাকেন্দ্র ও আন্তঃজেলা যোগাযোগ ব্যবস্থার সমন্বয়ে বগুড়া জেলার পূর্ণাঙ্গ তথ্যচিত্র।
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/explore" className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2">
              <i className="fa-solid fa-landmark"></i>
              <span>দর্শনীয় স্থান</span>
            </Link>
            <Link href="/contribute" className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/25 transition flex items-center gap-2">
              <i className="fa-solid fa-plus text-amber-300"></i>
              <span>তথ্য যুক্ত করুন</span>
            </Link>
          </div>
        </div>

        <dl className="relative z-10 grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 pt-4 mt-4 border-t border-emerald-800/80 text-center">
          {stats.map(s => (
            <div key={s.l} className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10">
              <dd className={`text-lg sm:text-2xl font-black leading-none ${s.c}`}>{s.v}</dd>
              <dt className="text-[10px] sm:text-[11px] text-emerald-200 mt-1 font-semibold leading-tight">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Pillars: compact tappable rows on mobile, richer cards from md */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {pillars.map(pillar => (
          <Link
            key={pillar.id}
            href={pillar.href}
            className={`bg-white rounded-2xl p-3.5 sm:p-5 border ${pillar.borderColor} shadow-2xs hover:shadow-md transition flex items-start gap-3 group`}
          >
            <span className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-gradient-to-br ${pillar.bgGrad} flex items-center justify-center text-lg ${pillar.textColor} border ${pillar.borderColor}`}>
              <i className={`fa-solid ${pillar.icon}`}></i>
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">{pillar.title}</h3>
                <span className={`hidden min-[420px]:inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full ${pillar.badgeBg} whitespace-nowrap`}>{pillar.metric}</span>
              </span>
              <span className="block text-[11px] text-slate-500 mt-0.5 line-clamp-1">{pillar.subtitle}</span>
              <span className="hidden sm:block text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">{pillar.desc}</span>
              <span className={`mt-1.5 sm:mt-3 inline-flex items-center gap-1.5 text-xs font-bold ${pillar.textColor}`}>
                {pillar.linkText}
                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-0.5 transition"></i>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
