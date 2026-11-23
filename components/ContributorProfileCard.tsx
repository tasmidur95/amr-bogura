'use client';

import React, { useState } from 'react';
import { useCommunityAuth } from '@/lib/context/CommunityAuthContext';
import { useToast } from '@/lib/context/ToastContext';

const UPAZILAS = [
  'বগুড়া সদর', 'শেরপুর', 'শিবগঞ্জ', 'শাজাহানপুর', 'দুপচাঁচিয়া', 'সারিয়াকান্দি',
  'সোনাতলা', 'গাবতলী', 'কাহালু', 'নন্দীগ্রাম', 'আদমদীঘি', 'ধুনট',
];
const BLOOD = ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const toBn = (n: number | string) => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);

function level(approved: number) {
  if (approved >= 10) return { label: 'বিশিষ্ট অবদানকারী', cls: 'bg-amber-400 text-emerald-950' };
  if (approved >= 3) return { label: 'সক্রিয় অবদানকারী', cls: 'bg-emerald-200 text-emerald-950' };
  if (approved >= 1) return { label: 'নতুন অবদানকারী', cls: 'bg-sky-100 text-sky-900' };
  return { label: 'সদস্য', cls: 'bg-white/15 text-emerald-100' };
}

export default function ContributorProfileCard() {
  const { user, stats, updateProfile, logout } = useCommunityAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [upazila, setUpazila] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  if (!user) return null;

  const startEdit = () => {
    setName(user.name);
    setBio(user.bio || '');
    setUpazila(user.upazila);
    setBloodGroup(user.bloodGroup || '');
    setEditing(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateProfile({ name, bio, upazila, bloodGroup });
    setSaving(false);
    if (res.success) setEditing(false);
    else showToast(res.error || 'সংরক্ষণ করা যায়নি', 'error');
  };

  const lv = level(stats?.approved ?? 0);
  const initials = user.name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('');
  const since = new Date(user.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long' });

  const tiles: [string, number | undefined, string][] = [
    ['মোট অবদান', stats?.total, 'text-slate-900'],
    ['অনুমোদিত', stats?.approved, 'text-emerald-700'],
    ['অপেক্ষমাণ', stats?.pending, 'text-amber-700'],
    ['প্রত্যাখ্যাত', stats?.rejected, 'text-rose-700'],
  ];

  return (
    <section aria-label="অবদানকারী প্রোফাইল" className="mb-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center text-2xl font-black shrink-0 shadow">
          {initials || '?'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-extrabold truncate">{user.name}</h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lv.cls}`}>{lv.label}</span>
            {user.isVerified && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-emerald-100 flex items-center gap-1">
                <i className="fa-solid fa-circle-check"></i> ভেরিফায়েড
              </span>
            )}
          </div>
          <p className="text-xs text-emerald-100/90 mt-0.5">
            @{user.username} · {user.upazila}
            {user.bloodGroup ? ` · রক্তের গ্রুপ ${user.bloodGroup}` : ''} · সদস্য {since} থেকে
          </p>
          {user.bio && <p className="text-xs text-emerald-50 mt-1.5 max-w-2xl leading-relaxed">{user.bio}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={editing ? () => setEditing(false) : startEdit}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          >
            <i className={`fa-solid ${editing ? 'fa-xmark' : 'fa-pen'}`}></i>
            <span>{editing ? 'বাতিল' : 'প্রোফাইল সম্পাদনা'}</span>
          </button>
          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl bg-rose-500/90 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {editing ? (
        <form onSubmit={save} className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/60">
          <label className="block text-xs font-semibold text-slate-700">
            পূর্ণ নাম
            <input value={name} onChange={e => setName(e.target.value)} required minLength={2} maxLength={80}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30" />
          </label>
          <label className="block text-xs font-semibold text-slate-700">
            উপজেলা
            <select value={upazila} onChange={e => setUpazila(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30">
              {UPAZILAS.map(u => <option key={u}>{u}</option>)}
            </select>
          </label>
          <label className="block text-xs font-semibold text-slate-700">
            রক্তের গ্রুপ (ঐচ্ছিক)
            <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/30">
              {BLOOD.map(b => <option key={b} value={b}>{b || '— নেই —'}</option>)}
            </select>
          </label>
          <div className="text-xs text-slate-500 self-end pb-2">
            <i className="fa-solid fa-lock text-slate-400 mr-1"></i>
            ইউজারনেম ও মোবাইল নম্বর পরিবর্তনযোগ্য নয় (অবদান যাচাইয়ের জন্য)।
          </div>
          <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
            সংক্ষিপ্ত পরিচিতি ({toBn(bio.length)}/৩০০)
            <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={300} rows={3}
              placeholder="আপনি কোন এলাকা নিয়ে কাজ করতে আগ্রহী, বা কেন অবদান রাখেন..."
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30" />
          </label>
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-bold transition cursor-pointer disabled:opacity-50 flex items-center gap-2">
              {saving && <i className="fa-solid fa-circle-notch fa-spin"></i>}
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
          {tiles.map(([label, val, cls]) => (
            <div key={label} className="p-4 text-center">
              <p className={`text-2xl font-black ${cls}`}>{val === undefined ? '—' : toBn(val)}</p>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
