'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

interface FooterProps {
  onNavigate: (view: string, anchor?: string) => void;
  onSwitchCommunityTab: (tab: string) => void;
}

export default function Footer({ onNavigate, onSwitchCommunityTab }: FooterProps) {
  const { language } = useLanguage();

  return (
    <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-900">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
                <i className="fa-solid fa-landmark-dome"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">আমার বগুড়া · Amar Bogura</h3>
                <p className="text-xs text-emerald-400">বগুড়া জেলা নাগরিক ও কমিউনিটি ডিজিটাল পোর্টাল</p>
              </div>
            </div>
            <p className="text-sm text-emerald-300/90 max-w-md leading-relaxed">
              করতোয়া বিধৌত প্রাচীন পুণ্ড্রবর্ধনের ইতিহাস, ১২টি উপজেলার তথ্য, জরুরি স্বাস্থ্যসেবা, রক্তদাতা নেটওয়ার্ক ও স্থানীয় কমিউনিটিকে এক সুতোয় গাঁথার একটি নাগরিক উদ্যোগ।
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li>
                <button
                  onClick={() => onNavigate('home', 'services')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  সব নাগরিক সেবা
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('upazilas')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  ১২টি উপজেলা ডিরেক্টরি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'healthcare')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  হাসপাতাল ও ডায়াগনস্টিক
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'explore')}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  দর্শনীয় স্থান ও ঐতিহ্য
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">কমিউনিটি প্ল্যাটফর্ম</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li>
                <button
                  onClick={() => {
                    onSwitchCommunityTab('blood');
                    onNavigate('home', 'community');
                  }}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  রক্তদাতা নেটওয়ার্ক
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSwitchCommunityTab('tuition');
                    onNavigate('home', 'community');
                  }}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  টিউশন ও শিক্ষা
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSwitchCommunityTab('rent');
                    onNavigate('home', 'community');
                  }}
                  className="hover:text-amber-300 transition text-left cursor-pointer"
                >
                  বাসা ও দোকান ভাড়া
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSwitchCommunityTab('business');
                    onNavigate('home', 'community');
                  }}
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
