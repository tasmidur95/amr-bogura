'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/lib/context/ToastContext';
import { CommunityPost } from '@/lib/data/district-data';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  onPostCreated: (post: CommunityPost) => void;
}

export default function CommunityModal({
  isOpen,
  onClose,
  defaultCategory = 'blood',
  onPostCreated,
}: CommunityModalProps) {
  const { showToast } = useToast();

  const [category, setCategory] = useState(defaultCategory);
  const [name, setName] = useState('');
  const [upazila, setUpazila] = useState('বগুড়া সদর');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [bloodRole, setBloodRole] = useState('রক্তদাতা');
  const [detail, setDetail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCategory(defaultCategory);
    }
  }, [isOpen, defaultCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !upazila || !detail || !phone) return;

    setIsSubmitting(true);

    const badgeMap: Record<string, string> = {
      tuition: 'নতুন টিউশন',
      rent: 'ভাড়া বিজ্ঞপ্তি',
      jobs: 'কাজ ও দক্ষতা',
      business: 'স্থানীয় ব্যবসা',
    };

    const postPayload = {
      category: category as any,
      name,
      group: category === 'blood' ? bloodGroup : undefined,
      role: category === 'blood' ? bloodRole : undefined,
      badge: category !== 'blood' ? badgeMap[category] || 'নতুন তথ্য' : undefined,
      upazila,
      detail,
      phone,
    };

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
      });

      const json = await res.json();
      if (json.success && json.data) {
        onPostCreated(json.data);
      } else {
        // Fallback local post
        onPostCreated({
          id: `local-${Date.now()}`,
          ...postPayload,
        });
      }

      showToast('আপনার তথ্য সফলভাবে বগুড়া কমিউনিটি বোর্ডে যুক্ত হয়েছে!');
      setName('');
      setDetail('');
      setPhone('');
      onClose();
    } catch (err) {
      // Local fallback on network error
      onPostCreated({
        id: `local-${Date.now()}`,
        ...postPayload,
      });
      showToast('আপনার তথ্য সফলভাবে বগুড়া কমিউনিটি বোর্ডে যুক্ত হয়েছে!');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center absolute right-5 top-5 cursor-pointer"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          কমিউনিটি অবদান
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-2">
          নতুন তথ্য বা জরুরি অনুরোধ যুক্ত করুন
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          আপনার তথ্য সরাসরি বগুড়া কমিউনিটি বোর্ডে যুক্ত হবে।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ক্যাটাগরি নির্বাচন করুন
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="blood">রক্তদাতা নিবন্ধন / জরুরি রক্তের অনুরোধ</option>
              <option value="tuition">টিউশন (শিক্ষক / শিক্ষার্থী প্রয়োজন)</option>
              <option value="rent">বাসা / মেস / দোকান ভাড়া</option>
              <option value="jobs">কাজ ও স্থানীয় দক্ষ কর্মী</option>
              <option value="business">স্থানীয় ব্যবসা ও বগুড়ার দই</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                নাম / প্রতিষ্ঠানের নাম *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                উপজেলা / এলাকা *
              </label>
              <select
                value={upazila}
                onChange={e => setUpazila(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="বগুড়া সদর">বগুড়া সদর</option>
                <option value="শেরপুর">শেরপুর</option>
                <option value="শিবগঞ্জ">শিবগঞ্জ</option>
                <option value="শাজাহানপুর">শাজাহানপুর</option>
                <option value="সারিয়াকান্দি">সারিয়াকান্দি</option>
                <option value="সোনাতলা">সোনাতলা</option>
                <option value="গাবতলী">গাবতলী</option>
                <option value="কাহালু">কাহালু</option>
                <option value="দুপচাঁচিয়া">দুপচাঁচিয়া</option>
                <option value="আদমদীঘি">আদমদীঘি</option>
                <option value="নন্দীগ্রাম">নন্দীগ্রাম</option>
                <option value="ধুনট">ধুনট</option>
              </select>
            </div>
          </div>

          {/* Blood Specific Field */}
          {category === 'blood' && (
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  রক্তের গ্রুপ *
                </label>
                <select
                  value={bloodGroup}
                  onChange={e => setBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-rose-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="A+">A+ (এ পজিটিভ)</option>
                  <option value="A-">A- (এ নেগেটিভ)</option>
                  <option value="B+">B+ (বি পজিটিভ)</option>
                  <option value="B-">B- (বি নেগেটিভ)</option>
                  <option value="O+">O+ (ও পজিটিভ)</option>
                  <option value="O-">O- (ও নেগেটিভ)</option>
                  <option value="AB+">AB+ (এবি পজিটিভ)</option>
                  <option value="AB-">AB- (এবি নেগেটিভ)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ধরন</label>
                <select
                  value={bloodRole}
                  onChange={e => setBloodRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="রক্তদাতা">স্বেচ্ছায় রক্তদাতা</option>
                  <option value="জরুরি প্রয়োজন">জরুরি রক্ত প্রয়োজন</option>
                </select>
              </div>
            </div>
          )}

          {/* General Detail Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              বিস্তারিত তথ্য / বিষয় / পদবি *
            </label>
            <input
              type="text"
              required
              value={detail}
              onChange={e => setDetail(e.target.value)}
              placeholder="যেমন: গণিত ও বিজ্ঞান টিউশন / ২ রুম ফ্ল্যাট ভাড়া / ইলেকট্রিশিয়ান"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              মোবাইল নম্বর *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="০১৭XX-XXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-sm shadow-md transition cursor-pointer"
          >
            {isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'তথ্য প্রকাশ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
