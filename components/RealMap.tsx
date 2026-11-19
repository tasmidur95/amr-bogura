'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { boguraUpazilasData, DetailedUpazilaData, UnionData } from '@/lib/data/unions-villages-data';
import { detailedExploreSpots } from '@/lib/data/explore-data';

interface RealMapProps {
  initialUpazilaId?: string;
  heightClass?: string;
  onSelectUpazila?: (upazila: DetailedUpazilaData) => void;
  showSpotMarkers?: boolean;
}

export default function RealMap({
  initialUpazilaId,
  heightClass = 'h-[520px] sm:h-[620px]',
  onSelectUpazila,
  showSpotMarkers = true,
}: RealMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const spotsLayerRef = useRef<any>(null);
  const unionsLayerRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  const [mapType, setMapType] = useState<'streets' | 'satellite' | 'terrain'>('streets');
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<string>(initialUpazilaId || 'all');
  const [showUnions, setShowUnions] = useState<boolean>(false);
  const [showSpots, setShowSpots] = useState<boolean>(showSpotMarkers);
  const [activeInfo, setActiveInfo] = useState<DetailedUpazilaData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Initialize Leaflet map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      // Dynamically load leaflet
      const L = await import('leaflet');

      // Make sure container is not already initialized
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Bogura center coordinates
      const defaultCenter: [number, number] = [24.8465, 89.3777]; // Satmatha, Bogura
      const defaultZoom = 10;

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        minZoom: 9,
        maxZoom: 18,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Add Zoom Control to top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Create base tile layers
      const getTileUrl = (type: string) => {
        if (type === 'satellite') {
          return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        }
        if (type === 'terrain') {
          return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
        }
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      };

      const tileLayer = L.tileLayer(getTileUrl(mapType), {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & <a href="https://amar-bogura.bd">আমার বগুড়া</a>',
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Create Layer Groups
      const upazilaGroup = L.layerGroup().addTo(map);
      const spotsGroup = L.layerGroup().addTo(map);
      const unionsGroup = L.layerGroup().addTo(map);

      markersLayerRef.current = upazilaGroup;
      spotsLayerRef.current = spotsGroup;
      unionsLayerRef.current = unionsGroup;

      // Render Upazila Markers
      boguraUpazilasData.forEach(upz => {
        const customIcon = L.divIcon({
          className: 'custom-upazila-marker',
          html: `
            <div style="
              background: #C85A28;
              color: #ffffff;
              padding: 4px 8px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 700;
              box-shadow: 0 4px 12px rgba(0,0,0,0.35);
              border: 2px solid #ffffff;
              display: flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
              cursor: pointer;
            ">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#FDE047;"></span>
              <span>${upz.name}</span>
            </div>
          `,
          iconSize: [110, 28],
          iconAnchor: [55, 14],
        });

        const marker = L.marker([upz.lat, upz.lng], { icon: customIcon }).addTo(upazilaGroup);

        const popupContent = `
          <div style="font-family: inherit; font-size: 13px; line-height: 1.5; color: #1e293b; min-width: 210px; padding: 4px;">
            <div style="border-bottom: 2px solid #C85A28; padding-bottom: 6px; margin-bottom: 8px;">
              <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #C85A28; background: #FEF3C7; padding: 2px 6px; border-radius: 4px;">ক্রমিক #${upz.serialBn}</span>
              <h4 style="font-size: 16px; font-weight: 800; color: #0B4635; margin: 4px 0 0 0;">${upz.name} উপজেলা</h4>
              <p style="font-size: 11px; color: #64748b; margin: 0;">${upz.enName} Upazila</p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px; font-size: 11px;">
              <div><strong>আয়তন:</strong> ${upz.area}</div>
              <div><strong>জনসংখ্যা:</strong> ${upz.population}</div>
              <div><strong>ইউনিয়ন:</strong> ${upz.unionCount}টি</div>
              <div><strong>গ্রাম:</strong> ${upz.villageCount}টি</div>
            </div>
            <p style="font-size: 11px; color: #475569; margin: 0 0 8px 0; max-height: 48px; overflow: hidden;">
              ${upz.desc}
            </p>
            <div style="display: flex; gap: 6px;">
              <a href="/upazilas/${upz.id}" style="
                background: #0B4635;
                color: #ffffff;
                text-decoration: none;
                font-size: 11px;
                font-weight: 700;
                padding: 4px 8px;
                border-radius: 6px;
                display: inline-block;
                text-align: center;
                flex: 1;
              ">বিস্তারিত ও গ্রাম তালিকা →</a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 260 });

        marker.on('click', () => {
          setActiveInfo(upz);
          if (onSelectUpazila) {
            onSelectUpazila(upz);
          }
        });
      });

      // Render Heritage & Explore Spots
      detailedExploreSpots.forEach(spot => {
        // Approximate coordinates if not parsed
        const coords = spot.mapCoordinates.split(',').map(s => parseFloat(s.trim()));
        const spotLat = coords[0] || 24.8465;
        const spotLng = coords[1] || 89.3777;

        const spotIcon = L.divIcon({
          className: 'custom-spot-marker',
          html: `
            <div style="
              background: #0B4635;
              color: #FDE047;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 2px solid #ffffff;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              cursor: pointer;
            ">
              🏛️
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const spotMarker = L.marker([spotLat, spotLng], { icon: spotIcon }).addTo(spotsGroup);

        const spotPopup = `
          <div style="font-family: inherit; font-size: 12px; line-height: 1.4; color: #1e293b; min-width: 200px;">
            <img src="${spot.coverImage}" alt="${spot.title}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
            <span style="font-size: 9px; font-weight: 700; color: #047857; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">${spot.categoryBn}</span>
            <h5 style="font-size: 14px; font-weight: 700; margin: 3px 0; color: #0f172a;">${spot.title}</h5>
            <p style="font-size: 11px; color: #64748b; margin: 0 0 6px 0;">📍 ${spot.location}</p>
            <a href="/explore/${spot.id}" style="
              background: #C85A28;
              color: #ffffff;
              text-decoration: none;
              font-size: 11px;
              font-weight: 700;
              padding: 4px 8px;
              border-radius: 6px;
              display: block;
              text-align: center;
            ">দর্শনীয় স্থানের পূর্ণ বিবরণ →</a>
          </div>
        `;
        spotMarker.bindPopup(spotPopup, { maxWidth: 220 });
      });

      // If specific initialUpazilaId is given, zoom there
      if (initialUpazilaId && initialUpazilaId !== 'all') {
        const target = boguraUpazilasData.find(u => u.id === initialUpazilaId);
        if (target) {
          map.setView([target.lat, target.lng], 12);
          setActiveInfo(target);
        }
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Map Type Change
  useEffect(() => {
    if (!tileLayerRef.current) return;
    const urls: Record<string, string> = {
      satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    };
    tileLayerRef.current.setUrl(urls[mapType] || urls.streets);
  }, [mapType]);

  // Handle Layer Toggles
  useEffect(() => {
    if (!mapInstanceRef.current || !spotsLayerRef.current) return;
    if (showSpots) {
      if (!mapInstanceRef.current.hasLayer(spotsLayerRef.current)) {
        mapInstanceRef.current.addLayer(spotsLayerRef.current);
      }
    } else {
      if (mapInstanceRef.current.hasLayer(spotsLayerRef.current)) {
        mapInstanceRef.current.removeLayer(spotsLayerRef.current);
      }
    }
  }, [showSpots]);

  // Handle Upazila Selection & FlyTo
  const handleSelectUpazilaChange = (upazilaId: string) => {
    setSelectedUpazilaId(upazilaId);
    if (!mapInstanceRef.current) return;

    if (upazilaId === 'all') {
      mapInstanceRef.current.flyTo([24.8465, 89.3777], 10, { duration: 1.2 });
      setActiveInfo(null);
      if (unionsLayerRef.current) {
        unionsLayerRef.current.clearLayers();
      }
      return;
    }

    const upz = boguraUpazilasData.find(u => u.id === upazilaId);
    if (upz) {
      mapInstanceRef.current.flyTo([upz.lat, upz.lng], 12, { duration: 1.2 });
      setActiveInfo(upz);
      if (onSelectUpazila) {
        onSelectUpazila(upz);
      }

      // Load all unions for this selected Upazila on the real map
      if (unionsLayerRef.current) {
        unionsLayerRef.current.clearLayers();
        import('leaflet').then(L => {
          upz.unions.forEach(un => {
            const unionIcon = L.divIcon({
              className: 'custom-union-marker',
              html: `
                <div style="
                  background: #0284c7;
                  color: #ffffff;
                  padding: 2px 6px;
                  border-radius: 9999px;
                  font-size: 10px;
                  font-weight: 600;
                  border: 1.5px solid #ffffff;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
                  white-space: nowrap;
                  cursor: pointer;
                ">
                  🏘️ ${un.name} (${un.villageCount} গ্রাম)
                </div>
              `,
              iconSize: [95, 22],
              iconAnchor: [47, 11],
            });

            const unionMarker = L.marker([un.lat, un.lng], { icon: unionIcon }).addTo(unionsLayerRef.current);

            const unionPopup = `
              <div style="font-size: 12px; line-height: 1.4; color: #1e293b; min-width: 200px;">
                <h5 style="font-size: 14px; font-weight: 700; color: #0284c7; margin: 0 0 4px 0;">${un.name} ইউনিয়ন পরিষদ</h5>
                <p style="font-size: 11px; color: #64748b; margin: 0 0 6px 0;">উপজেলা: ${upz.name} | পোস্ট কোড: ${un.postCode}</p>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px; margin-bottom: 6px;">
                  <strong style="color: #0B4635;">গ্রাম সংখ্যা: ${un.villageCount}টি</strong>
                  <p style="font-size: 10.5px; color: #475569; margin: 4px 0 0 0; max-height: 60px; overflow-y: auto;">
                    ${un.villages.join(', ')}
                  </p>
                </div>
                <p style="font-size: 10px; color: #64748b; margin: 0;">📍 অফিস: ${un.officeLocation}</p>
              </div>
            `;
            unionMarker.bindPopup(unionPopup, { maxWidth: 220 });
          });
        });
      }
    }
  };

  const resetView = () => {
    setSelectedUpazilaId('all');
    setActiveInfo(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([24.8465, 89.3777], 10, { duration: 1 });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : ''
      }`}
    >
      {/* Top Map Control Bar */}
      <div className="absolute top-3 inset-x-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Controls: Upazila Selector & Reset */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-slate-200/90">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
            <i className="fa-solid fa-map-location-dot text-[#C85A28]"></i>
            <span className="hidden sm:inline">উপজেলা নির্বাচন:</span>
          </label>
          <select
            value={selectedUpazilaId}
            onChange={e => handleSelectUpazilaChange(e.target.value)}
            className="text-xs font-bold text-emerald-950 bg-emerald-50/80 border border-emerald-300 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="all">🗺️ সমগ্র বগুড়া জেলা (১২টি উপজেলা)</option>
            {boguraUpazilasData.map(u => (
              <option key={u.id} value={u.id}>
                #{u.serialBn} {u.name} ({u.unionCount} ইউনিয়ন, {u.villageCount} গ্রাম)
              </option>
            ))}
          </select>

          <button
            onClick={resetView}
            title="মূল ম্যাপে ফিরে যান"
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>

        {/* Right Controls: Layer Switcher & Fullscreen */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Map Type Switcher */}
          <div className="flex items-center bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-md border border-slate-200/90 text-xs font-bold">
            <button
              onClick={() => setMapType('streets')}
              className={`px-2.5 py-1 rounded-xl transition cursor-pointer ${
                mapType === 'streets'
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              রোডম্যাপ
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded-xl transition cursor-pointer ${
                mapType === 'satellite'
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛰️ স্যাটেলাইট
            </button>
            <button
              onClick={() => setMapType('terrain')}
              className={`hidden md:block px-2.5 py-1 rounded-xl transition cursor-pointer ${
                mapType === 'terrain'
                  ? 'bg-emerald-800 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              টপোগ্রাফি
            </button>
          </div>

          {/* Toggle Spots Filter */}
          <button
            onClick={() => setShowSpots(!showSpots)}
            title="দর্শনীয় স্থান পিন টগল করুন"
            className={`px-2.5 py-1.5 rounded-2xl text-xs font-bold border transition shadow-md cursor-pointer ${
              showSpots
                ? 'bg-amber-400 text-slate-950 border-amber-500'
                : 'bg-white/95 text-slate-600 border-slate-200'
            }`}
          >
            🏛️ দর্শনীয় স্থান
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-2xl bg-white/95 backdrop-blur-md text-slate-700 hover:text-emerald-800 flex items-center justify-center shadow-md border border-slate-200 text-xs transition cursor-pointer"
          >
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>
        </div>
      </div>

      {/* Real Map Canvas */}
      <div ref={mapContainerRef} className={`w-full ${isFullscreen ? 'h-full' : heightClass} z-1`} />

      {/* Bottom Floating Legend / Quick Status Bar */}
      <div className="absolute bottom-3 inset-x-3 z-[1000] flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-emerald-950/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-emerald-800/60 shadow-lg text-xs flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C85A28] border border-white"></span>
            <span className="font-semibold">১২টি উপজেলা সদর</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] border border-white"></span>
            <span className="font-semibold">১০৮টি ইউনিয়ন পরিষদ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-300">🏛️</span>
            <span className="font-semibold">৮টি প্রধান ঐতিহাসিক স্থান</span>
          </div>
          <span className="text-emerald-400 hidden md:inline">|</span>
          <span className="text-emerald-200 text-[11px] hidden md:inline">
            জুম করে যেকোনো উপজেলা বা ইউনিয়নের গ্রাম বিস্তারিত দেখুন
          </span>
        </div>

        {activeInfo && (
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-xl max-w-sm text-xs">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h5 className="font-extrabold text-slate-900 text-sm">{activeInfo.name} উপজেলা</h5>
              <Link
                href={`/upazilas/${activeInfo.id}`}
                className="text-emerald-800 font-bold hover:underline"
              >
                বিস্তারিত →
              </Link>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-1 mb-1.5">{activeInfo.landmark}</p>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center font-bold">
              <div className="bg-emerald-50 text-emerald-900 p-1 rounded-md">
                {activeInfo.unionCount} ইউনিয়ন
              </div>
              <div className="bg-amber-50 text-amber-900 p-1 rounded-md">
                {activeInfo.villageCount} গ্রাম
              </div>
              <div className="bg-blue-50 text-blue-900 p-1 rounded-md">
                {activeInfo.population}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leaflet CSS inline import to guarantee proper styles */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
    </div>
  );
}

