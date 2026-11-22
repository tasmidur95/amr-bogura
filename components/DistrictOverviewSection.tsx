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

  return (
    <section id="district-overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-10 border border-emerald-900">
        {/* Background Decorative Rings */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-700/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-amber-500/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold mb-3 shadow-xs">
              <i className="fa-solid fa-chart-pie text-amber-400"></i>
              <span>বগুড়া জেলা এক নজরে • District Master Overview</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              ঐতিহাসিক পুণ্ড্রবর্ধন থেকে আধুনিক উত্তরবঙ্গের অর্থনৈতিক প্রাণকেন্দ্র
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base mt-2.5 leading-relaxed">
              করতোয়া নদীর তীরের আড়াই হাজার বছরের মহাস্থানগড়, সমৃদ্ধ কৃষি ও শিল্প, ১২টি উপজেলা, ৩৫২+ চিকিৎসাকেন্দ্র এবং আন্তঃজেলা যোগাযোগ ব্যবস্থার সমন্বয়ে বগুড়া জেলার একটি পূর্ণাঙ্গ তথ্যচিত্র।
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Link
              href="/explore"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <i className="fa-solid fa-landmark text-slate-900"></i>
              <span>দর্শনীয় স্থান ও ঐতিহ্য</span>
            </Link>
            <Link
              href="/contribute"
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md transition flex items-center gap-2"
            >
              <i className="fa-solid fa-plus text-amber-300"></i>
              <span>তথ্য যুক্ত করুন</span>
            </Link>
          </div>
        </div>

        {/* Quick Highlights Counters Strip */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-8 mt-8 border-t border-emerald-800/80 text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">১২টি</p>
            <p className="text-[11px] text-emerald-200 mt-1 font-semibold">উপজেলা ও পৌরসভা</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-emerald-300">৩৫২+</p>
            <p className="text-[11px] text-emerald-200 mt-1 font-semibold">স্বাস্থ্যসেবা প্রতিষ্ঠান</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-teal-300">১,৫৭০+</p>
            <p className="text-[11px] text-emerald-200 mt-1 font-semibold">শিক্ষাপ্রতিষ্ঠান</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-blue-300">১০টি</p>
            <p className="text-[11px] text-emerald-200 mt-1 font-semibold">যোগাযোগ হাব ও জংশন</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-rose-300">৪১+</p>
            <p className="text-[11px] text-emerald-200 mt-1 font-semibold">হোটেল ও রেস্তোরাঁ</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-yellow-300">GI</p>
            <p className="text-[11px] text-emerald-200 mt-1 font-semibold">স্বীকৃত বগুড়ার দই</p>
          </div>
        </div>
      </div>

      {/* 6 Key Pillar Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pillars.map(pillar => (
          <div
            key={pillar.id}
            className={`bg-white rounded-3xl p-6 border ${pillar.borderColor} shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.bgGrad} flex items-center justify-center text-xl ${pillar.textColor} border ${pillar.borderColor} group-hover:scale-110 transition duration-300`}
                >
                  <i className={`fa-solid ${pillar.icon}`}></i>
                </div>
                <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${pillar.badgeBg} border`}>
                  {pillar.metric}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {pillar.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {pillar.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {pillar.metricLabel}
              </span>
              <Link
                href={pillar.href}
                className={`text-xs font-bold ${pillar.textColor} hover:underline flex items-center gap-1.5 transition`}
              >
                <span>{pillar.linkText}</span>
                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-0.5 transition"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

