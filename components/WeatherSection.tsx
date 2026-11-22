'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/lib/context/ToastContext';

interface WeatherData {
  location: string;
  location_bn: string;
  coordinates: { lat: number; lon: number };
  updated_at: string;
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    wind_direction: number;
    pressure: number;
    uv_index: number;
    is_day: boolean;
    weather_code: number;
    condition: string;
    condition_bn: string;
    icon: string;
  };
  today: {
    max_temp: number;
    min_temp: number;
    sunrise: string;
    sunset: string;
  };
  forecast: Array<{
    date: string;
    day_bn: string;
    max_temp: number;
    min_temp: number;
    weather_code: number;
    condition_bn: string;
    icon: string;
  }>;
  agricultural_advisory: string;
}

export default function WeatherSection() {
  const { showToast } = useToast();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  async function fetchWeather(showFeedback = false) {
    if (showFeedback) setRefreshing(true);
    try {
      const res = await fetch('/api/weather');
      const json = await res.json();
      if (json.success && json.data) {
        setWeather(json.data);
        if (showFeedback) {
          showToast('বগুড়ার রিয়েলটাইম আবহাওয়া সফলভাবে হালনাগাদ করা হয়েছে!');
        }
      }
    } catch (e) {
      console.error('Failed to fetch weather:', e);
    } finally {
      setLoading(false);
      if (showFeedback) setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  const toBnNumber = (num: number | string): string => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, w => bnDigits[parseInt(w, 10)]);
  };

  if (loading && !weather) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 min-h-[380px] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="h-5 w-48 rounded-md skeleton-shimmer" />
              <div className="h-7 w-64 rounded-md skeleton-shimmer" />
            </div>
            <div className="h-8 w-28 rounded-xl skeleton-shimmer" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 h-52 rounded-3xl skeleton-shimmer" />
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-24 rounded-2xl skeleton-shimmer" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!weather) return null;

  return (
    <section id="weather" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 overflow-hidden relative">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>রিয়েলটাইম আবহাওয়া • Live Weather</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                বগুড়া সদর (২৪.৮৫° উ, ৮৯.৩৮° পূ)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>বগুড়া জেলার লাইভ আবহাওয়া পরিস্থিতি</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              সর্বশেষ: <strong className="text-slate-800">{weather.updated_at}</strong>
            </span>
            <button
              onClick={() => fetchWeather(true)}
              disabled={refreshing}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="নতুন তথ্য সংগ্রহ করুন"
            >
              <i className={`fa-solid fa-arrows-rotate ${refreshing ? 'fa-spin' : ''}`}></i>
              <span className="hidden sm:inline">হালনাগাদ</span>
            </button>
          </div>
        </div>

        {/* Current Weather Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
          {/* Main Hero Weather Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-500/20 blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/15">
                  <i className="fa-solid fa-location-dot mr-1"></i> {weather.location_bn}
                </span>
                <span className="text-xs text-emerald-200">
                  {weather.current.is_day ? 'দিন' : 'রাত'}
                </span>
              </div>

              {/* Big Temp and Icon */}
              <div className="flex items-center justify-between mt-5">
                <div>
                  <div className="text-5xl sm:text-6xl font-black tracking-tight leading-none text-white">
                    {toBnNumber(weather.current.temp)}°<span className="text-2xl font-bold text-amber-300">সে.</span>
                  </div>
                  <p className="text-sm font-semibold text-emerald-200 mt-2">
                    অনুভূত তাপমাত্রা: <strong className="text-white">{toBnNumber(weather.current.feels_like)}° সে.</strong>
                  </p>
                </div>
                <div className="text-5xl sm:text-6xl text-center pr-2">
                  <i className={weather.current.icon}></i>
                </div>
              </div>

              {/* Weather Condition Text */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-lg font-bold text-amber-300">{weather.current.condition_bn}</p>
                <p className="text-xs text-emerald-100/80 mt-0.5">
                  আজকের সর্বোচ্চ {toBnNumber(weather.today.max_temp)}° সে. • সর্বনিম্ন {toBnNumber(weather.today.min_temp)}° সে.
                </p>
              </div>
            </div>

            {/* Sun Times */}
            <div className="relative z-10 grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-sun text-amber-400"></i>
                <div>
                  <span className="text-[10px] text-emerald-300 block">সূর্যোদয়</span>
                  <span className="font-bold text-white">{weather.today.sunrise}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-moon text-rose-300"></i>
                <div>
                  <span className="text-[10px] text-emerald-300 block">সূর্যাস্ত</span>
                  <span className="font-bold text-white">{weather.today.sunset}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metric Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* Metric 1: Humidity */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div className="flex items-center justify-between text-cyan-600 mb-2">
                <span className="text-xs font-bold text-slate-500">বাতাসের আর্দ্রতা</span>
                <i className="fa-solid fa-droplet text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {toBnNumber(weather.current.humidity)}<span className="text-sm font-bold text-slate-500">%</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {weather.current.humidity > 70 ? 'উচ্চ আর্দ্রতা' : 'স্বাভাবিক আর্দ্রতা'}
                </p>
              </div>
            </div>

            {/* Metric 2: Wind Speed */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div className="flex items-center justify-between text-blue-600 mb-2">
                <span className="text-xs font-bold text-slate-500">বাতাসের গতি</span>
                <i className="fa-solid fa-wind text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {toBnNumber(weather.current.wind_speed)}{' '}
                  <span className="text-xs font-bold text-slate-500">কিমি/ঘণ্টা</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">মৃদু বাতাস</p>
              </div>
            </div>

            {/* Metric 3: Air Pressure */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="text-xs font-bold text-slate-500">বায়ুমণ্ডলীয় চাপ</span>
                <i className="fa-solid fa-gauge-high text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {toBnNumber(weather.current.pressure)}{' '}
                  <span className="text-xs font-bold text-slate-500">hPa</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">স্থিতিশীল চাপ</p>
              </div>
            </div>

            {/* Metric 4: UV Index */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div className="flex items-center justify-between text-amber-600 mb-2">
                <span className="text-xs font-bold text-slate-500">ইউভি সূচক (UV)</span>
                <i className="fa-solid fa-shield-virus text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {toBnNumber(weather.current.uv_index)}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {weather.current.uv_index <= 2
                    ? 'কম ঝুঁকি'
                    : weather.current.uv_index <= 5
                    ? 'মধ্যম মাত্রা'
                    : 'উচ্চ সতর্কতা'}
                </p>
              </div>
            </div>

            {/* Metric 5: Daily High */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div className="flex items-center justify-between text-rose-600 mb-2">
                <span className="text-xs font-bold text-slate-500">সর্বোচ্চ তাপমাত্রা</span>
                <i className="fa-solid fa-temperature-arrow-up text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {toBnNumber(weather.today.max_temp)}°<span className="text-xs font-bold text-slate-500">সে.</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">আজকের সর্বোচ্চ</p>
              </div>
            </div>

            {/* Metric 6: Daily Low */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
              <div className="flex items-center justify-between text-teal-600 mb-2">
                <span className="text-xs font-bold text-slate-500">সর্বনিম্ন তাপমাত্রা</span>
                <i className="fa-solid fa-temperature-arrow-down text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">
                  {toBnNumber(weather.today.min_temp)}°<span className="text-xs font-bold text-slate-500">সে.</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">ভোর ও রাতের তাপমাত্রা</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast Row */}
        {weather.forecast && weather.forecast.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <i className="fa-solid fa-calendar-days text-teal-700"></i>
              <span>আগামী ৫ দিনের আবহাওয়া পূর্বাভাস</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {weather.forecast.map((f, fIdx) => (
                <div
                  key={fIdx}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                    fIdx === 0
                      ? 'bg-emerald-50/80 border-emerald-200'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800">{f.day_bn}</p>
                  <div className="my-2.5 text-2xl">
                    <i className={f.icon}></i>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-600 truncate">{f.condition_bn}</p>
                  <div className="mt-2 text-xs font-bold text-slate-900 flex items-center justify-center gap-1.5 pt-1.5 border-t border-slate-200/60">
                    <span className="text-amber-800">{toBnNumber(f.max_temp)}°</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-500">{toBnNumber(f.min_temp)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agricultural & Civic Advisory Banner */}
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 text-sm shadow-xs mt-0.5">
            <i className="fa-solid fa-seedling"></i>
          </div>
          <div className="flex-1 text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>বগুড়া কৃষি ও নাগরিক আবহাওয়া পরামর্শ</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                কৃষি বার্তা
              </span>
            </h4>
            <p className="text-slate-700 mt-1 leading-relaxed">
              {weather.agricultural_advisory}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

