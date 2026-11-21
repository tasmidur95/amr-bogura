'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { useLanguage } from '@/lib/context/LanguageContext';
import { SiteContent } from '@/lib/data/district-data';

interface FooterProps {
  onNavigate?: (view: string, anchor?: string) => void;
  onSwitchCommunityTab?: (tab: string) => void;
  siteContent?: SiteContent;
}

export default function Footer({ onNavigate, onSwitchCommunityTab, siteContent }: FooterProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [activeContent, setActiveContent] = useState<SiteContent | undefined>(siteContent);

  const handleNav = (view: string, anchor?: string) => {
    if (onNavigate) {
      onNavigate(view, anchor);
    } else {
      if (view === 'home') {
        router.push(`/${anchor ? '#' + anchor : ''}`);
      } else {
        router.push(`/${view}`);
      }
    }
  };

  const handleCommunity = (tab: string) => {
    if (onSwitchCommunityTab) {
      onSwitchCommunityTab(tab);
    }
    handleNav('home', 'community');
  };

  useEffect(() => {
    if (siteContent) {
      setActiveContent(siteContent);
    } else {
      fetch('/api/site-content')
        .then(res => res.json())
        .then(json => {
          if (json.success && json.data) {
            setActiveContent(json.data);
          }
        })
        .catch(() => {});
    }
  }, [siteContent]);

  return (
    <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-900">
          <div className="md:col-span-2">
            <div className="mb-4">
              <BrandLogo variant="horizontal" size="lg" theme="dark" />
            </div>
            <p className="text-sm text-emerald-300/90 max-w-md leading-relaxed">
              {activeContent?.footerText || 'করতোয়া বিধৌত প্রাচীন পুণ্ড্রবর্ধনের ইতিহাস, ১২টি উপজেলার তথ্য, জরুরি স্বাস্থ্যসেবা, রক্তদাতা নেটওয়ার্ক ও স্থানীয় কমিউনিটিকে এক সুতোয় গাঁথার একটি নাগরিক উদ্যোগ।'}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li>
                <button
                  onClick={() => handleNav('home', 'services')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  সব নাগরিক সেবা
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('upazilas')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  ১২টি উপজেলা ডিরেক্টরি
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('home', 'healthcare')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  হাসপাতাল ও ডায়াগনস্টিক
                </button>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="hover:text-amber-300 transition text-left cursor-pointer block"
                >
                  দর্শনীয় স্থান ও ঐতিহ্য
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="hover:text-amber-300 transition text-left cursor-pointer flex items-center gap-1.5 text-amber-300 font-semibold"
                >
                  <i className="fa-solid fa-heart-circle-plus text-rose-400"></i>
                  <span>নাগরিক অবদান রাখুন</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-amber-300 transition text-left cursor-pointer flex items-center gap-1.5 opacity-80"
                >
                  <i className="fa-solid fa-shield-halved text-emerald-400"></i>
                  <span>অ্যাডমিন প্যানেল</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">কমিউনিটি প্ল্যাটফর্ম</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li>
                <button
                  onClick={() => handleCommunity('blood')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  রক্তদাতা নেটওয়ার্ক
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCommunity('tuition')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  টিউশন ও শিক্ষা
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCommunity('rent')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  বাসা ও দোকান ভাড়া
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCommunity('business')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  বগুড়ার দই ও স্থানীয় ব্যবসা
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-400">
          <p>© ২০২৬ আমার বগুড়া (Amar Bogura) — বগুড়া জেলার নাগরিকদের জন্য নির্মিত।</p>
          <p>তথ্যসূত্র: বাংলাদেশ জাতীয় তথ্য বাতায়ন (বগুড়া জেলা) ও স্থানীয় কমিউনিটি ডিরেক্টরি।</p>
        </div>
      </div>
    </footer>
  );
}

