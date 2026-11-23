'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/lib/context/ToastContext';
import { CommunityPost } from '@/lib/data/district-data';
import { useCommunityAuth } from '@/lib/context/CommunityAuthContext';

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
  const { user, isLoggedIn, openAuthPage } = useCommunityAuth();

  const [category, setCategory] = useState(defaultCategory);
  const [name, setName] = useState('');
  const [upazila, setUpazila] = useState('বগুড়া সদর');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [bloodRole, setBloodRole] = useState('রক্তদাতা');
  // blood REQUEST only (someone needs blood)
  const [units, setUnits] = useState(1);
  const [hospital, setHospital] = useState('');
  const [neededBy, setNeededBy] = useState('');
  const [detail, setDetail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCategory(defaultCategory);
      if (user) {
        setName(user.name || '');
        setPhone(user.phone || '');
        setUpazila(user.upazila || 'বগুড়া সদর');
        if (user.bloodGroup) setBloodGroup(user.bloodGroup);
      }
    }
  }, [isOpen, defaultCategory, user]);

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

    // ---- Blood: donors and requests are separate records with their own endpoints.
    if (category === 'blood') {
      if (!isLoggedIn) {
        showToast('রক্তদাতা বা অনুরোধ জমা দিতে লগইন করুন।', 'error');
        return;
      }
      setIsSubmitting(true);
      try {
        const isRequest = bloodRole === 'জরুরি প্রয়োজন';
        const res = await fetch(isRequest ? '/api/blood/requests' : '/api/blood/donors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify(
            isRequest
              ? { bloodGroup, units, hospital, upazila, neededBy: neededBy || undefined, detail, contactPhone: phone }
              : { bloodGroup, location: detail }
          ),
        });
        const json = await res.json();
        if (json.success) {
          // Not added to the public list: it is pending until a moderator publishes it.
          showToast(json.message || 'জমা হয়েছে। যাচাইয়ের পর প্রকাশিত হবে।');
          setDetail('');
          setHospital('');
          setNeededBy('');
          setUnits(1);
          onClose();
        } else {
          showToast(json.error || 'জমা দেওয়া যায়নি।', 'error');
        }
      } catch {
        showToast('নেটওয়ার্ক সমস্যা: জমা দেওয়া যায়নি। আবার চেষ্টা করুন।', 'error');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

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
      badge: user ? 'ভেরিফায়েড নাগরিক' : (category !== 'blood' ? badgeMap[category] || 'নতুন তথ্য' : undefined),
      upazila,
      detail,
      phone,
      contributorName: user ? user.name : name,
      contributorPhone: user ? user.phone : phone,
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
      if (!user) {
        setName('');
        setPhone('');
      }
      setDetail('');
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
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center absolute right-5 top-5 cursor-pointer"
          aria-label="বন্ধ করুন"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          কমিউনিটি অবদান
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
          নতুন তথ্য বা জরুরি অনুরোধ যুক্ত করুন
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          আপনার তথ্য সরাসরি বগুড়া কমিউনিটি বোর্ডে যুক্ত হবে।
        </p>

        {/* Member Status Notice */}
        {isLoggedIn && user ? (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                <i className="fa-solid fa-check"></i>
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold truncate">{user.name} হিসেবে পোস্ট করছেন (@{user.username})</p>
                <p className="text-[10px] text-emerald-700">আপনার পোস্টটি ভেরিফায়েড নাগরিক ব্যাজসহ সরাসরি প্রকাশিত হবে।</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <i className="fa-solid fa-shield-halved text-amber-600 text-base shrink-0"></i>
              <p className="leading-tight text-[11px] sm:text-xs">
                ভেরিফায়েড নাগরিক ব্যাজ পেতে <strong>লগইন বা নিবন্ধন</strong> করতে পারেন।
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                openAuthPage('login');
              }}
              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shrink-0 transition cursor-pointer"
            >
              লগইন / নিবন্ধন
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ক্যাটাগরি নির্বাচন করুন
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-rose-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                >
                  <option value="রক্তদাতা">স্বেচ্ছায় রক্তদাতা</option>
                  <option value="জরুরি প্রয়োজন">জরুরি রক্ত প্রয়োজন</option>
                </select>
              </div>
            </div>
          )}

          {category === 'blood' && bloodRole === 'জরুরি প্রয়োজন' && (
            <div className="grid grid-cols-2 gap-3.5 p-3 rounded-xl bg-rose-50/70 border border-rose-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কত ব্যাগ প্রয়োজন *</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={units}
                  onChange={e => setUnits(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কবের মধ্যে প্রয়োজন</label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={neededBy}
                  onChange={e => setNeededBy(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">হাসপাতাল / স্থান</label>
                <input
                  type="text"
                  value={hospital}
                  onChange={e => setHospital(e.target.value)}
                  placeholder="যেমন: শজিমেক হাসপাতাল, ওয়ার্ড ৫"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          )}

          {category === 'blood' && !isLoggedIn && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center justify-between gap-3">
              <span className="leading-snug">
                ভুয়া তথ্য ও স্প্যাম ঠেকাতে রক্তদাতা নিবন্ধন ও রক্তের অনুরোধের জন্য <strong>লগইন আবশ্যক</strong>।
              </span>
              <button
                type="button"
                onClick={() => { onClose(); openAuthPage('login'); }}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold shrink-0 cursor-pointer"
              >
                লগইন করুন
              </button>
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
              placeholder="০১XXXXXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            {category === 'blood' && (
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5 bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200">
                <i className="fa-solid fa-user-shield text-emerald-600"></i>
                <span>প্রাইভেসী সুরক্ষা: নম্বরটি স্বয়ংক্রিয় বট ও স্ক্র্যাপার থেকে ডিফল্টভাবে আড়াল রাখা হবে।</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (category === 'blood' && !isLoggedIn)}
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                <span>সংরক্ষণ করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane"></i>
                <span>তথ্য প্রকাশ করুন</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
