'use client';

import React, { useState, useEffect } from 'react';
import { useCommunityAuth } from '@/lib/context/CommunityAuthContext';

export default function CommunityAuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, login, register } = useCommunityAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regUpazila, setRegUpazila] = useState('বগুড়া সদর');
  const [regBloodGroup, setRegBloodGroup] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const upazilaOptions = [
    'বগুড়া সদর',
    'শেরপুর',
    'শিবগঞ্জ',
    'শাজাহানপুর',
    'দুপচাঁচিয়া',
    'সারিয়াকান্দি',
    'সোনাতলা',
    'গাবতলী',
    'কাহালু',
    'নন্দীগ্রাম',
    'আদমদীঘি',
    'ধুনট',
  ];

  const bloodGroupOptions = ['', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  useEffect(() => {
    if (isAuthModalOpen) {
      setActiveTab(authModalTab);
      setErrorMessage('');
    }
  }, [isAuthModalOpen, authModalTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleFillDemo = (username: string) => {
    setLoginIdentifier(username);
    setLoginPassword('user123');
    setErrorMessage('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMessage('ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন।');
      return;
    }

    setIsLoading(true);
    const res = await login(loginIdentifier.trim(), loginPassword.trim());
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'লগইন ব্যর্থ হয়েছে।');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim() || !regUsername.trim() || !regPhone.trim() || !regPassword.trim()) {
      setErrorMessage('নাম, ইউজারনেম, মোবাইল নম্বর ও পাসওয়ার্ড আবশ্যক।');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।');
      return;
    }

    setIsLoading(true);
    const res = await register({
      name: regName.trim(),
      username: regUsername.trim(),
      phone: regPhone.trim(),
      upazila: regUpazila,
      bloodGroup: regBloodGroup || undefined,
      password: regPassword.trim(),
    });
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'নিবন্ধন ব্যর্থ হয়েছে।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
            <i className="fa-solid fa-users"></i>
            <span>বগুড়া কমিউনিটি প্ল্যাটফর্ম</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            {activeTab === 'login' ? 'নাগরিক অ্যাকাউন্টে প্রবেশ' : 'নতুন সদস্য নিবন্ধন'}
          </h3>
          <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
            {activeTab === 'login'
              ? 'ইউজারনেম ও পাসওয়ার্ড দিয়ে লগইন করে ভেরিফায়েড সদস্য হিসেবে তথ্য শেয়ার করুন।'
              : 'বগুড়ার নাগরিক হিসেবে যুক্ত হতে সহজ তথ্য দিয়ে বিনামূল্যে অ্যাকাউন্ট তৈরি করুন।'}
          </p>

          {/* Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/30 rounded-xl mt-4 border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className="fa-solid fa-arrow-right-to-bracket text-[11px]"></i>
              <span>লগইন (Login)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
              }}
              className={`py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className="fa-solid fa-user-plus text-[11px]"></i>
              <span>নিবন্ধন (Register)</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-shake">
              <i className="fa-solid fa-circle-exclamation shrink-0 text-sm"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ===================== LOGIN FORM ===================== */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ইউজারনেম অথবা মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <i className="fa-solid fa-user text-xs"></i>
                  </span>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={e => setLoginIdentifier(e.target.value)}
                    placeholder="ইউজারনেম দিন (যেমন: bogura_citizen)"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    পাসওয়ার্ড <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                  >
                    {showPassword ? 'লুকান' : 'দেখুন'}
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <i className="fa-solid fa-lock text-xs"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="আপনার গোপন পাসওয়ার্ড"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans tracking-wide"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                  </button>
                </div>
              </div>

              {/* Demo auto-fill chip */}
              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-[11px] text-emerald-900 flex items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-emerald-800">ডেমো অ্যাকাউন্ট: </span>
                  <span className="font-mono">bogura_citizen</span> (পাস: <span className="font-mono">user123</span>)
                </div>
                <button
                  type="button"
                  onClick={() => handleFillDemo('bogura_citizen')}
                  className="px-2 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] shrink-0 transition cursor-pointer"
                >
                  অটোফিল
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    <span>যাচাই করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <span>লগইন করুন</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
                অ্যাকাউন্ট নেই?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMessage('');
                  }}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  নতুন অ্যাকাউন্ট নিবন্ধন করুন
                </button>
              </div>
            </form>
          )}

          {/* ===================== REGISTER FORM ===================== */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ইউজারনেম (Username) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={e => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="যেমন: rafiq_bogura"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">ছোট হাতের ইংরেজি অক্ষর ও সংখ্যা</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="০১XXXXXXXXX"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    উপজেলা নির্বাচন <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={regUpazila}
                    onChange={e => setRegUpazila(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {upazilaOptions.map(u => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    রক্তের গ্রুপ <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
                  </label>
                  <select
                    value={regBloodGroup}
                    onChange={e => setRegBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="">নির্বাচন করুন (না থাকলে খালি রাখুন)</option>
                    {bloodGroupOptions.filter(Boolean).map(bg => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    পাসওয়ার্ড <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="কমপক্ষে ৪ অক্ষর"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    পাসওয়ার্ড নিশ্চিত করুন <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={e => setRegConfirmPassword(e.target.value)}
                    placeholder="আবার টাইপ করুন"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 tracking-wide"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <i className="fa-solid fa-shield-halved text-emerald-600 mt-0.5 shrink-0"></i>
                <span>
                  নিবন্ধিত সদস্য হিসেবে আপনার প্রদত্ত রক্তের তথ্য, টিউশন বা ব্যবসায়িক পোস্ট ভেরিফায়েড ব্যাজসহ সরাসরি প্রকাশিত হবে।
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    <span>নিবন্ধন প্রস্তুত হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-user-check"></i>
                    <span>নিবন্ধন সম্পন্ন করুন</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMessage('');
                  }}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  সরাসরি লগইন করুন
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

