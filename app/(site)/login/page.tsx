'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { useCommunityAuth } from '@/lib/context/CommunityAuthContext';

const UPAZILAS = [
  'বগুড়া সদর', 'শেরপুর', 'শিবগঞ্জ', 'শাজাহানপুর', 'দুপচাঁচিয়া', 'সারিয়াকান্দি',
  'সোনাতলা', 'গাবতলী', 'কাহালু', 'নন্দীগ্রাম', 'আদমদীঘি', 'ধুনট',
];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-700';

/** Only allow same-site relative redirects (blocks open-redirect via ?next=//evil.com) */
function safeNext(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/\\') || raw.startsWith('/login')) return '/contribute';
  return raw;
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-slate-700 mb-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-slate-400 mt-1">{hint}</span>}
    </label>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { isReady, isLoggedIn, login, register } = useCommunityAuth();

  const next = safeNext(params.get('next'));
  const [tab, setTab] = useState<'login' | 'register'>(params.get('tab') === 'register' ? 'register' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [upazila, setUpazila] = useState('বগুড়া সদর');
  const [bloodGroup, setBloodGroup] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // Already signed in → go straight to where the visitor was headed
  useEffect(() => {
    if (isReady && isLoggedIn) router.replace(next);
  }, [isReady, isLoggedIn, next, router]);

  const switchTab = (t: 'login' | 'register') => {
    setTab(t);
    setError('');
    router.replace(`/login?tab=${t}&next=${encodeURIComponent(next)}`, { scroll: false });
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!identifier.trim() || !password) return setError('ইউজারনেম এবং পাসওয়ার্ড উভয়ই দিন।');
    setLoading(true);
    const res = await login(identifier.trim(), password);
    setLoading(false);
    if (!res.success) setError(res.error || 'লগইন ব্যর্থ হয়েছে।');
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !username.trim() || !phone.trim()) return setError('নাম, ইউজারনেম ও মোবাইল নম্বর আবশ্যক।');
    if (regPassword.length < 8) return setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
    if (regPassword !== confirm) return setError('পাসওয়ার্ড এবং নিশ্চিতকরণ মিলছে না।');
    setLoading(true);
    const res = await register({ name: name.trim(), username: username.trim(), phone: phone.trim(), upazila, bloodGroup: bloodGroup || undefined, password: regPassword });
    setLoading(false);
    if (!res.success) setError(res.error || 'নিবন্ধন ব্যর্থ হয়েছে।');
  };

  const submitBtn = (label: string) => (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
    >
      {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className={`fa-solid ${tab === 'login' ? 'fa-right-to-bracket' : 'fa-user-plus'}`}></i>}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Slim top bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" aria-label="আমার বগুড়া — হোম"><BrandLogo size="sm" /></Link>
          <Link href="/" className="text-xs font-semibold text-emerald-800 hover:text-amber-700 flex items-center gap-1.5">
            <i className="fa-solid fa-arrow-left text-[10px]"></i> হোমে ফিরুন
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-stretch">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-0 lg:px-6 lg:py-10">
          {/* ======================= LEFT: FORM ======================= */}
          <aside className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white px-5 sm:px-10 py-10 lg:rounded-l-3xl flex flex-col justify-center">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

            <div className="relative max-w-md w-full mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-bold">
                <i className="fa-solid fa-hand-holding-heart"></i> সঠিক তথ্য, সুস্থ সমাজ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-snug mt-4">
                সঠিক তথ্য দিয়ে <span className="text-amber-300">বগুড়ার মানুষকে</span> সহায়তা করুন
              </h2>
              <p className="text-sm text-emerald-100/90 mt-3 leading-relaxed">
                আপনার দেওয়া একটি নির্ভুল ফোন নম্বর বা ঠিকানা হয়তো কারও জরুরি রক্ত, চিকিৎসা বা পথ খুঁজে পাওয়ার সবচেয়ে বড় ভরসা। তাই শুধু যাচাইকৃত, বাস্তব তথ্যই জমা দিন।
              </p>

              <ul className="mt-6 space-y-3.5">
                {[
                  ['fa-droplet', 'জীবন বাঁচায় সঠিক নম্বর', 'রক্তদাতা ও হাসপাতালের তথ্য ভুল হলে জরুরি মুহূর্তে সময় নষ্ট হয়।'],
                  ['fa-shield-halved', 'মডারেটর যাচাই', 'প্রতিটি অবদান প্রকাশের আগে যাচাই হয়; যাচাইয়ে উত্তীর্ণ না হলে কারণসহ জানানো হয়।'],
                  ['fa-id-card', 'আপনার অবদানকারী প্রোফাইল', 'জমা দেওয়া সব তথ্যের অবস্থা ও সম্মাননা স্তর এক জায়গায় দেখুন।'],
                  ['fa-map-location-dot', 'পুরো জেলার জন্য', '১২টি উপজেলা, ১০৮টি ইউনিয়ন ও ৩৫২+ স্বাস্থ্যকেন্দ্রের ডিরেক্টরি আপনার অবদানে সমৃদ্ধ হয়।'],
                ].map(([icon, title, desc]) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                      <i className={`fa-solid ${icon} text-sm`}></i>
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{title}</span>
                      <span className="block text-xs text-emerald-100/80 mt-0.5 leading-relaxed">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <ol className="mt-7 pt-6 border-t border-white/15 grid grid-cols-4 gap-2 text-center text-[11px]">
                {['নিবন্ধন', 'তথ্য জমা', 'যাচাই', 'প্রকাশ'].map((s, i) => (
                  <li key={s} className="relative">
                    <span className="mx-auto w-8 h-8 rounded-full bg-amber-400 text-emerald-950 font-black flex items-center justify-center text-xs">
                      {'১২৩৪'[i]}
                    </span>
                    <span className="block mt-1.5 text-emerald-100/90 font-semibold">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          {/* ======================= RGHT: FORM ======================= */}
          <section className="bg-white lg:rounded-r-3xl lg:border lg:border-r-0 border-slate-200 lg:shadow-xl px-5 sm:px-10 py-8 sm:py-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {tab === 'login' ? 'স্বাগতম, আবার দেখে ভালো লাগল' : 'নতুন অবদানকারী প্রোফাইল'}
              </h1>
              <p className="text-sm text-slate-500 mt-1.5">
                {tab === 'login'
                  ? 'অবদান রাখতে ও নিজের প্রোফাইল দেখতে লগইন করুন।'
                  : 'বিনামূল্যে নিবন্ধন করুন — এক মিনিটেই প্রোফাইল তৈরি।'}
              </p>

              {/* Tabs */}
              <div role="tablist" className="mt-6 grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100">
                {(['login', 'register'] as const).map(t => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => switchTab(t)}
                    className={`py-2 rounded-lg text-sm font-bold transition cursor-pointer ${tab === t ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {t === 'login' ? 'লগইন' : 'নিবন্ধন'}
                  </button>
                ))}
              </div>

              {error && (
                <div role="alert" className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                  <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                  <span>{error}</span>
                </div>
              )}

              {tab === 'login' ? (
                <form onSubmit={onLogin} className="mt-5 space-y-4">
                  <Field label="ইউজারনেম বা মোবাইল নম্বর" required>
                    <input className={inputCls} value={identifier} onChange={e => setIdentifier(e.target.value)} autoComplete="username" placeholder="যেমন: rafiq_bogura" />
                  </Field>
                  <Field label="পাসওয়ার্ড" required>
                    <div className="relative">
                      <input
                        className={`${inputCls} pr-10`}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        placeholder="আপনার পাসওয়ার্ড"
                      />
                      <button type="button" onClick={() => setShowPassword(v => !v)} aria-label="পাসওয়ার্ড দেখান/লুকান" className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-700 cursor-pointer">
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                      </button>
                    </div>
                  </Field>

                  {process.env.NODE_ENV !== 'production' && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between gap-2">
                      <span>ডেভেলপমেন্ট ডেমো: <b className="font-mono">bogura_citizen</b> / <b className="font-mono">user123</b></span>
                      <button type="button" onClick={() => { setIdentifier('bogura_citizen'); setPassword('user123'); }} className="px-2 py-1 rounded-md bg-amber-500 text-white font-bold text-[10px] cursor-pointer">অটোফিল</button>
                    </div>
                  )}

                  {submitBtn('লগইন করুন')}
                  <p className="text-center text-xs text-slate-500">
                    অ্যাকাউন্ট নেই?{' '}
                    <button type="button" onClick={() => switchTab('register')} className="text-emerald-700 font-bold hover:underline cursor-pointer">নতুন প্রোফাইল তৈরি করুন</button>
                  </p>
                </form>
              ) : (
                <form onSubmit={onRegister} className="mt-5 space-y-3.5">
                  <Field label="আপনার পূর্ণ নাম" required>
                    <input className={inputCls} value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="যেমন: মোঃ রফিকুল ইসলাম" />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Field label="ইউজারনেম" required hint="ছোট হাতের ইংরেজি অক্ষর, সংখ্যা ও _">
                      <input className={`${inputCls} font-mono`} value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} autoComplete="username" placeholder="rafiq_bogura" />
                    </Field>
                    <Field label="মোবাইল নম্বর" required>
                      <input className={inputCls} type="tel" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" placeholder="01XXXXXXXXX" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Field label="উপজেলা" required>
                      <select className={`${inputCls} cursor-pointer`} value={upazila} onChange={e => setUpazila(e.target.value)}>
                        {UPAZILAS.map(u => <option key={u}>{u}</option>)}
                      </select>
                    </Field>
                    <Field label="রক্তের গ্রুপ (ঐচ্ছিক)">
                      <select className={`${inputCls} cursor-pointer`} value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
                        <option value="">— নির্বাচন করুন —</option>
                        {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Field label="পাসওয়ার্ড" required hint="কমপক্ষে ৮ অক্ষর">
                      <input className={inputCls} type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} autoComplete="new-password" />
                    </Field>
                    <Field label="পাসওয়ার্ড নিশ্চিত করুন" required>
                      <input className={inputCls} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} autoComplete="new-password" />
                    </Field>
                  </div>
                  {submitBtn('প্রোফাইল তৈরি করুন')}
                  <p className="text-center text-xs text-slate-500">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <button type="button" onClick={() => switchTab('login')} className="text-emerald-700 font-bold hover:underline cursor-pointer">লগইন করুন</button>
                  </p>
                </form>
              )}
            </div>
          </section>



        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
