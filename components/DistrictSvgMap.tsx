'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { upazilasData, Upazila } from '@/lib/data/district-data';
import { boguraUpazilasData } from '@/lib/data/unions-villages-data';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useToast } from '@/lib/context/ToastContext';

interface DistrictSvgMapProps {
  onSelectUpazila?: (index: number) => void;
  hoveredIndex?: number | null;
  onHoverIndex?: (index: number | null) => void;
  className?: string;
}

export default function DistrictSvgMap({
  onSelectUpazila,
  hoveredIndex: externalHoveredIndex,
  onHoverIndex,
  className = '',
}: DistrictSvgMapProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const { showToast } = useToast();

  const [internalHoveredIndex, setInternalHoveredIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const activeHoverIdx =
    externalHoveredIndex !== undefined && externalHoveredIndex !== null
      ? externalHoveredIndex
      : internalHoveredIndex;

  const hoveredUpz = activeHoverIdx !== null ? upazilasData[activeHoverIdx] : null;
  const hoveredDetailed = activeHoverIdx !== null ? boguraUpazilasData[activeHoverIdx] : null;

  const handleMouseEnter = (idx: number) => {
    setInternalHoveredIndex(idx);
    if (onHoverIndex) onHoverIndex(idx);
  };

  const handleMouseLeave = () => {
    setInternalHoveredIndex(null);
    if (onHoverIndex) onHoverIndex(null);
  };

  const handleClick = (idx: number) => {
    if (onSelectUpazila) {
      onSelectUpazila(idx);
    } else {
      router.push(`/upazilas/${idx}`);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.25, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownloadMap = () => {
    if (!svgRef.current) return;
    try {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'bogura-district-administrative-map.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
      showToast('বগুড়া জেলার প্রশাসনিক মানচিত্র ডাউনলোড সম্পন্ন হয়েছে');
    } catch (err) {
      showToast('মানচিত্র ডাউনলোড ব্যর্থ হয়েছে');
    }
  };

  // 12 Upazilas geographic polygons and label positions
  const upazilaPolygons = [
    {
      idx: 0, // Bogura Sadar (Center Hub)
      name: 'বগুড়া সদর',
      enName: 'Bogura Sadar',
      points: '280,242 360,238 382,318 312,335 272,302 274,258',
      textX: 326,
      textY: 288,
      defaultFill: '#fed7aa', // amber-200
      hoverFill: '#fb923c', // orange-400
      strokeColor: '#C85A28',
      strokeWidth: 2.2,
      textColor: '#7c2d12',
    },
    {
      idx: 1, // Shibganj (North)
      name: 'শিবগঞ্জ',
      enName: 'Shibganj',
      points: '228,102 348,95 372,192 342,238 274,242 216,205 198,145',
      textX: 282,
      textY: 168,
      defaultFill: '#d1fae5', // emerald-100
      hoverFill: '#6ee7b7', // emerald-300
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#064e3b',
    },
    {
      idx: 2, // Sherpur (South)
      name: 'শেরপুর',
      enName: 'Sherpur',
      points: '272,408 376,402 396,540 342,572 268,568 252,468',
      textX: 322,
      textY: 486,
      defaultFill: '#ecfdf5', // emerald-50
      hoverFill: '#a7f3d0', // emerald-200
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#064e3b',
    },
    {
      idx: 3, // Sonatala (North-East)
      name: 'সোনাতলা',
      enName: 'Sonatala',
      points: '348,95 458,98 474,178 412,198 372,192',
      textX: 416,
      textY: 145,
      defaultFill: '#fef3c7', // amber-100
      hoverFill: '#fde047', // amber-300
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#78350f',
    },
    {
      idx: 4, // Sariakandi (East / Jamuna Bank)
      name: 'সারিয়াকান্দি',
      enName: 'Sariakandi',
      points: '458,98 558,135 572,330 514,375 442,312 436,210 474,178',
      textX: 506,
      textY: 248,
      defaultFill: '#e0f2fe', // sky-100
      hoverFill: '#7dd3fc', // sky-300
      strokeColor: '#0369a1',
      strokeWidth: 1.8,
      textColor: '#075985',
    },
    {
      idx: 5, // Gabtali (East-Central)
      name: 'গাবতলী',
      enName: 'Gabtali',
      points: '372,192 436,210 442,312 382,318 360,238',
      textX: 406,
      textY: 262,
      defaultFill: '#d1fae5', // emerald-100
      hoverFill: '#6ee7b7', // emerald-300
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#064e3b',
    },
    {
      idx: 6, // Dhunat (South-East)
      name: 'ধুনট',
      enName: 'Dhunat',
      points: '382,318 442,312 514,375 498,490 398,485 376,412',
      textX: 446,
      textY: 412,
      defaultFill: '#fef3c7', // amber-100
      hoverFill: '#fde047', // amber-300
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#78350f',
    },
    {
      idx: 7, // Nandigram (South-West)
      name: 'নন্দীগ্রাম',
      enName: 'Nandigram',
      points: '168,365 254,365 264,488 178,485 148,405',
      textX: 212,
      textY: 432,
      defaultFill: '#d1fae5', // emerald-100
      hoverFill: '#6ee7b7', // emerald-300
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#064e3b',
    },
    {
      idx: 8, // Kahaloo (West-Central)
      name: 'কাহালু',
      enName: 'Kahaloo',
      points: '190,235 274,242 278,340 198,345 168,290',
      textX: 232,
      textY: 295,
      defaultFill: '#ecfdf5', // emerald-50
      hoverFill: '#a7f3d0', // emerald-200
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#064e3b',
    },
    {
      idx: 9, // Dupchanchia (North-West)
      name: 'দুপচাঁচিয়া',
      enName: 'Dupchanchia',
      points: '150,145 224,145 234,230 156,235 130,185',
      textX: 186,
      textY: 192,
      defaultFill: '#fef3c7', // amber-100
      hoverFill: '#fde047', // amber-300
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#78350f',
    },
    {
      idx: 10, // Adamdighi (Far West)
      name: 'আদমদীঘি',
      enName: 'Adamdighi',
      points: '78,190 148,190 158,290 84,285 58,230',
      textX: 112,
      textY: 242,
      defaultFill: '#d1fae5', // emerald-100
      hoverFill: '#6ee7b7', // emerald-300
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#064e3b',
    },
    {
      idx: 11, // Shajahanpur (Central South)
      name: 'শাজাহানপুর',
      enName: 'Shajahanpur',
      points: '266,302 382,318 376,412 272,408 250,355',
      textX: 320,
      textY: 362,
      defaultFill: '#fef3c7', // amber-100
      hoverFill: '#fde047', // amber-300
      strokeColor: '#0B4635',
      strokeWidth: 1.8,
      textColor: '#78350f',
    },
  ];

  return (
    <figure
      ref={containerRef}
      className={`bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm relative ${className}`}
    >
      {/* Top Header Bar matching amargaibandha.bd */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-sm font-bold border border-emerald-200/80">
            <i className="fa-solid fa-map"></i>
          </span>
          <div>
            <h4 className="text-base font-extrabold text-[#0B4635] leading-tight">
              বগুড়া জেলার প্রশাসনিক মানচিত্র
            </h4>
            <p className="text-xs text-slate-500">
              ১২টি উপজেলা ও নদ-নদীর আন্তঃসংযোগ ভেক্টর মানচিত্র
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Download Map Button */}
          <button
            type="button"
            onClick={handleDownloadMap}
            title="মানচিত্রের ভেক্টর ইমেজ সংরক্ষণ করুন"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 px-3.5 text-xs font-bold text-slate-700 transition cursor-pointer"
          >
            <i className="fa-solid fa-download text-emerald-700"></i>
            <span>মানচিত্র ডাউনলোড</span>
          </button>

          {/* Hover Status Badge */}
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 hidden sm:inline-block">
            {hoveredUpz ? `${hoveredUpz.name} উপজেলা` : 'উপজেলায় ক্লিক করুন'}
          </span>
        </div>
      </div>

      {/* SVG Canvas Frame */}
      <div
        className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-[#F9F8F4] w-full"
        style={{ aspectRatio: '1.05' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 640 610"
          role="group"
          aria-label="বগুড়া জেলার ১২টি উপজেলার মানচিত্র"
          className="w-full h-full select-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        >
          <title>বগুড়া জেলার ১২টি উপজেলার প্রশাসনিক মানচিত্র</title>

          {/* Transformable Group for Pan & Zoom */}
          <g
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.25s ease-out',
            }}
          >
            {/* 1. Natural Jamuna River (যমুনা নদী) on the East */}
            <path
              d="M 520 80 C 585 180, 595 280, 580 400 C 565 470, 530 550, 485 615"
              stroke="#bae6fd"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 520 80 C 585 180, 595 280, 580 400 C 565 470, 530 550, 485 615"
              stroke="#0284c7"
              strokeWidth="3.5"
              strokeDasharray="8 6"
              fill="none"
            />
            <text
              x="575"
              y="260"
              fill="#0369a1"
              fontSize="12"
              fontWeight="800"
              transform="rotate(78 575 260)"
              className="pointer-events-none select-none tracking-wider"
            >
              যমুনা নদী
            </text>

            {/* 2. Karatoya River (করতোয়া নদী) flowing through the center */}
            <path
              d="M 305 90 C 298 160, 330 230, 318 310 C 308 385, 325 460, 330 560"
              stroke="#38bdf8"
              strokeWidth="2.8"
              strokeDasharray="5 4"
              fill="none"
              pointerEvents="none"
            />
            <text
              x="305"
              y="130"
              fill="#0284c7"
              fontSize="9"
              fontWeight="700"
              transform="rotate(82 305 130)"
              className="pointer-events-none select-none"
            >
              করতোয়া নদী
            </text>

            {/* 3. The 12 Upazila Vector Polygons */}
            {upazilaPolygons.map(upz => {
              const isHovered = activeHoverIdx === upz.idx;
              return (
                <g
                  key={upz.idx}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleMouseEnter(upz.idx)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(upz.idx)}
                >
                  <polygon
                    points={upz.points}
                    fill={isHovered ? upz.hoverFill : upz.defaultFill}
                    stroke={isHovered ? '#C85A28' : upz.strokeColor}
                    strokeWidth={isHovered ? 2.8 : upz.strokeWidth}
                    strokeLinejoin="round"
                    className="transition-colors duration-200"
                    style={{
                      filter: isHovered
                        ? 'drop-shadow(0 4px 10px rgba(200, 90, 40, 0.45))'
                        : 'none',
                    }}
                  />
                  {/* Upazila Bengali Name Label */}
                  <text
                    x={upz.textX}
                    y={upz.textY}
                    fontSize={upz.idx === 0 ? '13' : '11.5'}
                    fontWeight={upz.idx === 0 ? '800' : '700'}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isHovered ? '#0f172a' : upz.textColor}
                    stroke="#ffffff"
                    strokeWidth="3.2"
                    className="pointer-events-none select-none [paint-order:stroke]"
                  >
                    {upz.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Zoom Controls (+ / - / Reset) matching amargaibandha.bd */}
        <div className="absolute bottom-3 right-3 flex flex-col divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="বড় করুন"
            title="মানচিত্র বড় করুন (Zoom In)"
            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer text-xs"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            aria-label="ছোট করুন"
            title="মানচিত্র ছোট করুন (Zoom Out)"
            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-xs"
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            aria-label="মূল অবস্থানে ফিরুন"
            title="রিসেট ভিউ"
            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition cursor-pointer text-xs"
          >
            <i className="fa-solid fa-arrows-rotate text-[10px]"></i>
          </button>
        </div>

        {/* Hovered Upazila Floating Info Card on the Map */}
        {hoveredUpz && hoveredDetailed && (
          <div className="absolute bottom-3 left-3 right-16 sm:right-auto sm:max-w-xs bg-emerald-950/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-emerald-700/80 animate-fade-in pointer-events-none z-10">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400 text-emerald-950">
                #{hoveredUpz.serialBn} {hoveredUpz.enName}
              </span>
              <span className="text-[10px] text-emerald-300 font-semibold">
                {hoveredUpz.pourashava}
              </span>
            </div>
            <h5 className="text-base font-extrabold text-white">
              {hoveredUpz.name} উপজেলা
            </h5>
            <div className="grid grid-cols-3 gap-1.5 mt-2 text-[10px] text-center font-bold">
              <div className="bg-white/10 px-1 py-1 rounded-md">
                <span className="text-emerald-300 block font-normal">আয়তন</span>
                {hoveredUpz.area}
              </div>
              <div className="bg-white/10 px-1 py-1 rounded-md">
                <span className="text-emerald-300 block font-normal">ইউনিয়ন</span>
                {hoveredUpz.unionCount}
              </div>
              <div className="bg-white/10 px-1 py-1 rounded-md">
                <span className="text-emerald-300 block font-normal">গ্রাম</span>
                {hoveredDetailed.villageCount}টি
              </div>
            </div>
            <p className="text-[11px] text-emerald-200 mt-2 font-medium flex items-center justify-between">
              <span>ক্লিক করে বিস্তারিত পাতা দেখুন</span>
              <span className="text-amber-300 font-bold">→</span>
            </p>
          </div>
        )}
      </div>

      {/* Map Caption / Legend */}
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#fed7aa] border border-[#C85A28]"></span>
            <span>সদর</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#d1fae5] border border-[#0B4635]"></span>
            <span>উপজেলা</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-1.5 rounded-full bg-sky-300"></span>
            <span>যমুনা ও করতোয়া নদী</span>
          </span>
        </div>
        <span className="text-emerald-800 font-bold">
          মানচিত্রের যেকোনো উপজেলায় ক্লিক করে বিস্তারিত জানুন
        </span>
      </figcaption>
    </figure>
  );
}

