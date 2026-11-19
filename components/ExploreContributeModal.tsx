'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/lib/context/ToastContext';
import { DetailedExploreSpot } from '@/lib/data/explore-data';

interface ExploreContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpotAdded: (spot: DetailedExploreSpot) => void;
}

export default function ExploreContributeModal({
  isOpen,
  onClose,
  onSpotAdded,
}: ExploreContributeModalProps) {
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [enTitle, setEnTitle] = useState('');
  const [category, setCategory] = useState<'archaeological' | 'nature' | 'religious' | 'heritage'>('archaeological');
  const [upazila, setUpazila] = useState('বগুড়া সদর');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [history, setHistory] = useState('');
  const [howToReach, setHowToReach] = useState('');
  const [timings, setTimings] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [contributorPhone, setContributorPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const categoryBnMap: Record<string, string> = {
    archaeological: 'প্রত্নতাত্ত্বিক নিদর্শন',
    nature: 'নদী ও প্রাকৃতিক সৌন্দর্য',
    religious: 'ধর্মীয় ও আধ্যাত্মিক স্থান',
    heritage: 'ঐতিহাসিক স্থাপত্য ও সংস্কৃতি',
  };

  const sampleImages = [
    { label: 'প্রাচীন ঢিবি / প্রত্নতত্ত্ব', url: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80' },
    { label: 'ঐতিহাসিক মন্দির / আশ্রম', url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80' },
    { label: 'সুলতানি মসজিদ / টেরাকোটা', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80' },
    { label: 'নদী / জলরাশি / স্পার বাঁধ', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !upazila || !shortDesc || !contributorName) {
      showToast('অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন', 'error');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title,
      enTitle: enTitle || title,
      category,
      categoryBn: categoryBnMap[category] || 'দর্শনীয় স্থান',
      location,
      upazila,
      tag: tag || 'নাগরিক প্রস্তাবিত স্থান',
      coverImage: coverImage || sampleImages[0].url,
      gallery: [coverImage || sampleImages[0].url],
      shortDesc,
      history: history || shortDesc,
      architecture: '',
      howToReach: howToReach || 'বগুড়া শহর থেকে বাস বা সিএনজি যোগে পৌঁছানো যায়।',
      highlights: [title, location],
      timings: timings || 'সারাদিন উন্মুক্ত',
      entryFee: entryFee || 'বিনামূল্যে',
      bestTime: 'সারা বছর',
      contributorName,
      contributorPhone,
      autoApprove: true,
    };

    try {
      const res = await fetch('/api/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success && json.data) {
        onSpotAdded(json.data);
      } else {
        // Local in-memory fallback
        onSpotAdded({
          id: `spot-${Date.now()}`,
          ...payload,
          architecture: '',
          highlights: [title],
          bestTime: 'সারা বছর',
          mapCoordinates: '',
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(title + ', বগুড়া')}`,
          isApproved: true,
          contributor: {
            name: contributorName,
            phone: contributorPhone,
            date: '২০২৬',
          },
          reviews: [],
        });
      }

      showToast('ধন্যবাদ! আপনার প্রস্তাবিত দর্শনীয় স্থানটি যুক্ত করা হয়েছে।');
      onClose();
    } catch (err) {
      showToast('সংরক্ষণ ব্যর্থ হয়েছে, আবার চেষ্টা করুন।', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center absolute right-5 top-5 cursor-pointer"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            নাগরিক অবদান
          </span>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            বগুড়া জেলা তথ্যভাণ্ডার
          </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mt-2">
          নতুন দর্শনীয় স্থান বা ঐতিহ্য যুক্ত করুন
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          আপনার জানা বগুড়ার কোনো ঐতিহাসিক ঢিবি, নদী ঘাট, পুরাতন মসজিদ বা ঐতিহ্যবাহী স্থানের বিবরণ দিন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                স্থানের নাম (বাংলায়) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="যেমন: খেরুয়া মসজিদ"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                English Name
              </label>
              <input
                type="text"
                value={enTitle}
                onChange={e => setEnTitle(e.target.value)}
                placeholder="e.g. Historic Kherua Mosque"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ক্যাটাগরি *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer font-medium"
              >
                <option value="archaeological">প্রত্নতাত্ত্বিক নিদর্শন ও প্রাচীন সভ্যতা</option>
                <option value="nature">নদী পর্যটন ও প্রাকৃতিক সৌন্দর্য</option>
                <option value="religious">ধর্মীয় ও ঐতিহাসিক তীর্থ</option>
                <option value="heritage">ঐতিহাসিক স্থাপত্য ও সংস্কৃতি</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                উপজেলা *
              </label>
              <select
                value={upazila}
                onChange={e => setUpazila(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer font-medium"
              >
                <option value="বগুড়া সদর">বগুড়া সদর</option>
                <option value="শিবগঞ্জ">শিবগঞ্জ</option>
                <option value="শেরপুর">শেরপুর</option>
                <option value="সারিয়াকান্দি">সারিয়াকান্দি</option>
                <option value="সোনাতলা">সোনাতলা</option>
                <option value="গাবতলী">গাবতলী</option>
                <option value="কাহালু">কাহালু</option>
                <option value="দুপচাঁচিয়া">দুপচাঁচিয়া</option>
                <option value="আদমদীঘি">আদমদীঘি</option>
                <option value="নন্দীগ্রাম">নন্দীগ্রাম</option>
                <option value="ধুনট">ধুনট</option>
                <option value="শাজাহানপুর">শাজাহানপুর</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                নির্দিষ্ট অবস্থান / ঠিকানা *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="যেমন: খন্দকারটোলা, শেরপুর, বগুড়া"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                বিশেষ ট্যাগ বা ব্যাজ
              </label>
              <input
                type="text"
                value={tag}
                onChange={e => setTag(e.target.value)}
                placeholder="যেমন: ১৫৮২ সালের সুলতানি স্থাপত্য"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Image URL with Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ছবির লিংক (Image URL - Unsplash / Wikimedia / ফ্রি লিংক)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 mb-2"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">নমুনা ফ্রি ছবি:</span>
              {sampleImages.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCoverImage(img.url)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition cursor-pointer"
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              এক নজরে সংক্ষিপ্ত বিবরণ *
            </label>
            <textarea
              required
              rows={2}
              value={shortDesc}
              onChange={e => setShortDesc(e.target.value)}
              placeholder="এই স্থানটি কেন বিখ্যাত? এর মূল পরিচিতি লিখুন..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ঐতিহাসিক পটভূমি ও বিস্তারিত বিবরণ
            </label>
            <textarea
              rows={3}
              value={history}
              onChange={e => setHistory(e.target.value)}
              placeholder="স্থানটির নির্মাণকাল, কে নির্মাণ করেছিলেন, প্রত্নতাত্ত্বিক গুরুত্ব বা স্থানীয় ইতিহাস..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                কীভাবে যাবেন (যাতায়াত ব্যবস্থা)
              </label>
              <input
                type="text"
                value={howToReach}
                onChange={e => setHowToReach(e.target.value)}
                placeholder="যেমন: বগুড়া সাতমাথা থেকে সিএনজি বা বাসে..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                প্রবেশ ফি ও সময়সূচি
              </label>
              <input
                type="text"
                value={timings}
                onChange={e => setTimings(e.target.value)}
                placeholder="যেমন: সকাল ৯টা – বিকেল ৫টা · বিনামূল্যে"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Contributor Information */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
            <h4 className="text-xs font-bold text-emerald-900 mb-2.5 flex items-center gap-1.5">
              <i className="fa-solid fa-user-pen text-emerald-700"></i>
              <span>আপনার পরিচয় (অবদানকারীর তথ্য)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  আপনার পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  required
                  value={contributorName}
                  onChange={e => setContributorName(e.target.value)}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  মোবাইল নম্বর (ঐচ্ছিক)
                </label>
                <input
                  type="tel"
                  value={contributorPhone}
                  onChange={e => setContributorPhone(e.target.value)}
                  placeholder="০১৭১X-XXXXXX"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-paper-plane"></i>
            <span>{isSubmitting ? 'তথ্য সংরক্ষণ করা হচ্ছে...' : 'স্থানটি সরাসরি প্রকাশ করুন'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
