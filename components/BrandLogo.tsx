'use client';

import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'emblem' | 'horizontal' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({
  variant = 'horizontal',
  size = 'md',
  theme = 'light',
  className = '',
  showText = true,
}: BrandLogoProps) {
  // Size dimensions
  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: { title: 'text-base', sub: 'text-[9px]' },
    md: { title: 'text-lg sm:text-xl', sub: 'text-[10px] sm:text-[11px]' },
    lg: { title: 'text-2xl sm:text-3xl', sub: 'text-xs sm:text-sm' },
    xl: { title: 'text-3xl sm:text-4xl', sub: 'text-sm' },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Iconic Vector Emblem based on Cover Photo */}
      <div
        className={`${emblemSizes[size]} shrink-0 relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-1 shadow-md shadow-emerald-950/20 border border-amber-400/40 group-hover:scale-105 transition-transform duration-300`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
          <defs>
            {/* Rich Golden Gradient from Cover Photo */}
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Terracotta Brick Gradient */}
            <linearGradient id="logoTerracotta" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>

            {/* Karatoya Emerald Gradient */}
            <linearGradient id="logoEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Doi Clay Pot Gradient */}
            <linearGradient id="doiPot" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Glowing Doi Texture */}
            <radialGradient id="doiGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
          </defs>

          {/* 1. Terracotta Mandala Decorative Outer Ring Border */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#logoGold)"
            strokeWidth="1.6"
            strokeDasharray="4 2.5"
            opacity="0.85"
          />
          <circle
            cx="50"
            cy="50"
            r="43"
            stroke="url(#logoEmerald)"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* 2. Mahasthangarh Ancient Stepped Terracotta Mound (Right-Center) */}
          <path
            d="M 38 48 Q 58 35 78 44 L 84 66 L 32 66 Z"
            fill="url(#logoTerracotta)"
            opacity="0.9"
          />
          <path
            d="M 44 44 Q 58 36 72 42 L 75 52 L 41 52 Z"
            fill="#B45309"
            opacity="0.95"
          />
          <path
            d="M 50 38 Q 58 33 66 37 L 68 44 L 48 44 Z"
            fill="#F59E0B"
            opacity="0.9"
          />

          {/* 3. Satmatha Monument (বগুড়া সাতমাথা জিরো পয়েন্ট মিনার ও বৃত্তাকার বেষ্টনী) */}
          {/* Circular Roundabout base */}
          <ellipse
            cx="48"
            cy="70"
            rx="22"
            ry="7.5"
            fill="#1E293B"
            stroke="url(#logoGold)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="48"
            cy="70"
            rx="16"
            ry="5"
            fill="#0F172A"
          />

          {/* White Monument Column */}
          <path
            d="M 45 42 L 51 42 L 52 65 L 44 65 Z"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="0.8"
          />
          {/* Monument Cap & Beacon */}
          <ellipse
            cx="48"
            cy="42"
            rx="6"
            ry="2.2"
            fill="#E2E8F0"
          />
          <circle
            cx="48"
            cy="39"
            r="2.5"
            fill="url(#logoGold)"
          />
          {/* Side wings */}
          <path
            d="M 40 50 L 44 50 L 44 65 L 39 65 Z"
            fill="#CBD5E1"
          />
          <path
            d="M 52 50 L 56 50 L 57 65 L 52 65 Z"
            fill="#CBD5E1"
          />

          {/* 4. Traditional Bogura Doi Clay Pot (ঐতিহ্যবাহী বগুড়ার দইয়ের মাটির সরা) */}
          <g transform="translate(18, 62)">
            {/* Clay pot rim & body */}
            <path
              d="M 4 8 C 4 16, 26 16, 26 8 C 26 5, 4 5, 4 8 Z"
              fill="url(#doiPot)"
              stroke="#9A3412"
              strokeWidth="0.8"
            />
            {/* Golden Doi Top */}
            <ellipse
              cx="15"
              cy="7.5"
              rx="9.5"
              ry="3.8"
              fill="url(#doiGlow)"
            />
            {/* Steaming aroma curl */}
            <path
              d="M 13 4 Q 14 1 16 0.5"
              stroke="#FEF08A"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M 17 4 Q 18 2 19 1"
              stroke="#FEF08A"
              strokeWidth="0.7"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          </g>

          {/* 5. Karatoya & Jamuna River Waves (নদীমাতৃক জলরেখা) */}
          <path
            d="M 14 78 Q 28 72 42 78 T 72 77 T 90 81"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M 18 83 Q 32 78 46 83 T 76 82 T 86 86"
            stroke="url(#logoGold)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />

          {/* Top Star/Emblem Sparkle */}
          <path
            d="M 50 14 L 51.5 17.5 L 55 19 L 51.5 20.5 L 50 24 L 48.5 20.5 L 45 19 L 48.5 17.5 Z"
            fill="url(#logoGold)"
          />
        </svg>
      </div>

      {/* Typography: "আমার বগুড়া | My Bogura" styled exactly like the cover typography */}
      {showText && variant !== 'emblem' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight leading-none drop-shadow-2xs ${theme === 'dark'
                  ? 'text-white'
                  : 'bg-gradient-to-r from-emerald-950 via-emerald-800 to-amber-700 bg-clip-text text-transparent'
                } ${textSizes[size].title}`}
              style={{
                fontFamily: 'var(--font-noto), var(--font-hind), sans-serif',
              }}
            >
              আমার বগুড়া
            </span>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-2xs">
              BD
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
            <span
              className={`font-bold italic tracking-wide ${theme === 'dark' ? 'text-amber-300' : 'text-[#C85A28]'
                } ${textSizes[size].sub}`}
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              My Bogura
            </span>
            <span className={theme === 'dark' ? 'text-emerald-400' : 'text-slate-400'}>·</span>
            <span
              className={`text-[10px] font-semibold ${theme === 'dark' ? 'text-emerald-200' : 'text-emerald-800'
                }`}
            >
              নাগরিক পোর্টাল
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
