'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HealthcareFacility } from '@/lib/services/healthcare.service';
import 'leaflet/dist/leaflet.css';

interface HealthcareMapProps {
  facilities: HealthcareFacility[];
  selectedFacility: HealthcareFacility | null;
  onSelectFacility: (facility: HealthcareFacility) => void;
  heightClass?: string;
}

export default function HealthcareMap({
  facilities,
  selectedFacility,
  onSelectFacility,
  heightClass = 'h-[480px] sm:h-[580px]'
}: HealthcareMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const [mapType, setMapType] = useState<'streets' | 'satellite' | 'terrain'>('streets');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      const L = await import('leaflet');

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Bogura District Center: 24.8465, 89.3732
      const map = L.map(mapContainerRef.current, {
        center: [24.8465, 89.3732],
        zoom: 10,
        minZoom: 8,
        maxZoom: 18,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Base tile layer
      const tileUrl =
        mapType === 'satellite'
          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          : mapType === 'terrain'
          ? 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      const tileLayer = L.tileLayer(tileUrl, {
        attribution: '&copy; OpenStreetMap contributors | Amr Bogura'
      });
      tileLayer.addTo(map);

      const markersLayer = L.layerGroup();
      markersLayer.addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = markersLayer;

      renderMarkers(L, map, markersLayer);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapType]);

  // Update markers when facilities or selectedFacility changes
  useEffect(() => {
    async function updateMarkers() {
      if (!mapInstanceRef.current || !markersLayerRef.current) return;
      const L = await import('leaflet');
      renderMarkers(L, mapInstanceRef.current, markersLayerRef.current);
    }
    updateMarkers();
  }, [facilities, selectedFacility]);

  // Marker colors and icons by category
  const getMarkerConfig = (category: string, isSelected: boolean) => {
    let bg = '#047857'; // emerald
    let iconClass = 'fa-hospital';

    if (category.includes('Medical College') || category.includes('District Hospital')) {
      bg = '#b91c1c'; // deep red
      iconClass = 'fa-hospital-user';
    } else if (category.includes('Upazila Health Complex')) {
      bg = '#059669'; // emerald
      iconClass = 'fa-square-h';
    } else if (category.includes('Union Health')) {
      bg = '#0284c7'; // sky blue
      iconClass = 'fa-clinic-medical';
    } else if (category.includes('Community Clinic')) {
      bg = '#0d9488'; // teal
      iconClass = 'fa-house-chimney-medical';
    } else if (category.includes('Private')) {
      bg = '#4f46e5'; // indigo
      iconClass = 'fa-bed-pulse';
    } else if (category.includes('Diagnostic')) {
      bg = '#7c3aed'; // purple
      iconClass = 'fa-microscope';
    } else if (category.includes('Eye') || category.includes('Dental')) {
      bg = '#d97706'; // amber
      iconClass = category.includes('Eye') ? 'fa-eye' : 'fa-tooth';
    } else if (category.includes('Blood') || category.includes('Ambulance')) {
      bg = '#dc2626'; // crimson red
      iconClass = category.includes('Blood') ? 'fa-droplet' : 'fa-truck-medical';
    } else if (category.includes('NGO')) {
      bg = '#ea580c'; // orange
      iconClass = 'fa-hand-holding-heart';
    }

    const size = isSelected ? 42 : 32;
    const border = isSelected ? 'border-4 border-amber-400 scale-110 shadow-xl ring-4 ring-amber-300/50' : 'border-2 border-white shadow-md';

    const html = `
      <div style="background-color: ${bg}; width: ${size}px; height: ${size}px;"
           class="rounded-full flex items-center justify-center text-white transition-all transform ${border}">
        <i class="fa-solid ${iconClass} text-xs"></i>
      </div>
    `;

    return { html, size };
  };

  const renderMarkers = (L: any, map: any, layer: any) => {
    layer.clearLayers();
    if (!facilities || facilities.length === 0) return;

    const bounds: [number, number][] = [];

    facilities.forEach(f => {
      if (typeof f.latitude !== 'number' || typeof f.longitude !== 'number') return;
      bounds.push([f.latitude, f.longitude]);

      const isSelected = selectedFacility?.id === f.id;
      const { html, size } = getMarkerConfig(f.category, isSelected);

      const customIcon = L.divIcon({
        className: 'custom-facility-pin',
        html: html,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2]
      });

      const marker = L.marker([f.latitude, f.longitude], { icon: customIcon });

      const popupHtml = `
        <div class="p-2.5 max-w-[280px] font-sans">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
              f.ownership === 'government' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
            }">
              ${f.ownership === 'government' ? 'সরকারি' : f.ownership === 'private' ? 'বেসরকারি' : 'এনজিও'}
            </span>
            <span class="text-[10px] text-slate-500 font-medium">${f.upazila_bn}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-sm leading-snug">${f.name_bn}</h4>
          <p class="text-xs text-slate-600 mb-2 leading-relaxed">${f.address}</p>
          <div class="flex flex-wrap gap-1 mb-2">
            ${f.services.slice(0, 3).map(s => `<span class="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">${s}</span>`).join('')}
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            ${
              f.phone && f.phone.length > 0
                ? `<a href="tel:${f.phone[0]}" class="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950">
                    <i class="fa-solid fa-phone text-[10px]"></i> ${f.phone[0]}
                   </a>`
                : '<span class="text-xs text-slate-400">হটলাইন নেই</span>'
            }
            <a href="${f.google_maps_url}" target="_blank" rel="noopener noreferrer"
               class="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1">
              দিকনির্দেশনা <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 300, minWidth: 240 });

      marker.on('click', () => {
        onSelectFacility(f);
      });

      layer.addLayer(marker);

      if (isSelected) {
        marker.openPopup();
        map.setView([f.latitude, f.longitude], Math.max(map.getZoom(), 13), { animate: true });
      }
    });

    if (bounds.length > 0 && !selectedFacility) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current && facilities.length > 0) {
      const bounds = facilities.map(f => [f.latitude, f.longitude] as [number, number]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 ${heightClass} ${isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : ''}`}>
      {/* Map Responsive Floating Header Toolbar */}
      <div className="absolute top-2.5 sm:top-3 inset-x-2.5 sm:inset-x-3 z-[400] flex items-center justify-between gap-1.5 pointer-events-none">
        {/* Map Type Switcher */}
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 sm:p-1.5 rounded-xl shadow-md border border-slate-200 text-[11px] sm:text-xs pointer-events-auto">
          <button
            onClick={() => setMapType('streets')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
              mapType === 'streets' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            রাস্তাঘাট
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
              mapType === 'satellite' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            স্যাটেলাইট
          </button>
          <button
            onClick={() => setMapType('terrain')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
              mapType === 'terrain' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            টপোগ্রাফি
          </button>
        </div>

        {/* Floating Controls Right */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={handleResetView}
            title="বগুড়ার সীমানায় ফিট করুন"
            className="bg-white/95 hover:bg-white text-slate-700 hover:text-emerald-800 p-2 rounded-xl shadow-md border border-slate-200 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
          >
            <i className="fa-solid fa-arrows-to-eye"></i>
            <span className="hidden md:inline">রিসেট ভিউ</span>
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'ফুলস্ক্রিন বন্ধ' : 'ফুলস্ক্রিন ম্যাপ'}
            className="bg-white/95 hover:bg-white text-slate-700 hover:text-emerald-800 p-2 rounded-xl shadow-md border border-slate-200 text-xs transition cursor-pointer"
          >
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full bg-slate-100" />

      {/* Bottom Category Legend (Horizontal Scroll on Mobile) */}
      <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3 sm:right-auto z-[400] bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-xl shadow-md border border-slate-200 max-w-xl text-[10px] sm:text-[11px] text-slate-700 flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
        <span className="font-bold text-slate-900 flex items-center gap-1 shrink-0">
          <i className="fa-solid fa-layer-group text-emerald-800"></i> সূচক:
        </span>
        <span className="flex items-center gap-1 shrink-0"><span className="w-2.5 h-2.5 rounded-full bg-red-700"></span> সরকারি</span>
        <span className="flex items-center gap-1 shrink-0"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> স্বাস্থ্য কমপ্লেক্স</span>
        <span className="flex items-center gap-1 shrink-0"><span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> সাব-সেন্টার</span>
        <span className="flex items-center gap-1 shrink-0"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> বেসরকারি</span>
        <span className="flex items-center gap-1 shrink-0"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> ডায়াগনস্টিক</span>
        <span className="flex items-center gap-1 shrink-0"><span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> অ্যাম্বুলেন্স/ব্লাড</span>
      </div>
    </div>
  );
}

