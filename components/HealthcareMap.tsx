'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { HealthcareFacility } from '@/lib/services/healthcare.service';
import { boguraUpazilasData } from '@/lib/data/unions-villages-data';
import 'leaflet/dist/leaflet.css';

const GEO_URL = '/geo/bogura-upazilas.json';

interface HealthcareMapProps {
  facilities: HealthcareFacility[];
  selectedFacility: HealthcareFacility | null;
  onSelectFacility: (facility: HealthcareFacility) => void;
  /** All facilities (unfiltered) used for per-upazila counts so counts stay stable while filtering */
  allFacilities?: HealthcareFacility[];
  /** Currently selected upazila id used by the page filter ('all' or e.g. 'Bogura Sadar') */
  selectedUpazila?: string;
  onSelectUpazila?: (upazilaId: string) => void;
  heightClass?: string;
}

// ---- Facility groups (colour + icon) ----------------------------------------------------------
type GroupKey = 'hospital' | 'primary' | 'private' | 'diagnostic' | 'emergency';

const GROUPS: Record<GroupKey, { label: string; color: string; icon: string }> = {
  hospital: { label: 'হাসপাতাল', color: '#B91C1C', icon: 'fa-hospital' },
  primary: { label: 'স্বাস্থ্যকেন্দ্র ও ক্লিনিক', color: '#0B7A55', icon: 'fa-house-medical' },
  private: { label: 'বেসরকারি ও এনজিও', color: '#4F46E5', icon: 'fa-bed-pulse' },
  diagnostic: { label: 'ডায়াগনস্টিক', color: '#7C3AED', icon: 'fa-microscope' },
  emergency: { label: 'অ্যাম্বুলেন্স ও ব্লাড', color: '#EA580C', icon: 'fa-truck-medical' },
};

function groupOf(category: string): GroupKey {
  if (/Blood|Ambulance/i.test(category)) return 'emergency';
  if (/Diagnostic/i.test(category)) return 'diagnostic';
  if (/Private|Eye|Dental|NGO/i.test(category)) return 'private';
  if (/Medical College|District Hospital|Specialized/i.test(category)) return 'hospital';
  return 'primary';
}

// ---- Upazila name → index in boguraUpazilasData / geo file ----------------------------------
const UPZ_KEYS = ['bogurasadar', 'shibganj', 'sherpur', 'sonatala', 'sariakandi', 'gabtali', 'dhunat', 'nandigram', 'kahaloo', 'dupchanchia', 'adamdighi', 'shajahanpur'];
const UPZ_ALIAS: Record<string, string> = { kahalu: 'kahaloo', dhupchanchia: 'dupchanchia', dupchachia: 'dupchanchia', sonatola: 'sonatala' };
const upzIndex = (name: string) => {
  const k = name.toLowerCase().replace(/[^a-z]/g, '');
  return UPZ_KEYS.indexOf(UPZ_ALIAS[k] || k);
};
// The page's filter id for an upazila index (matches facility.upazila spelling)
const PAGE_UPAZILA_ID = ['Bogura Sadar', 'Shibganj', 'Sherpur', 'Sonatala', 'Sariakandi', 'Gabtali', 'Dhunat', 'Nandigram', 'Kahalu', 'Dhupchanchia', 'Adamdighi', 'Shajahanpur'];

const SCALE = ['#EAF4EC', '#CFE6D5', '#AFD5BA', '#8CC29C', '#67AB7F'];
const fmtBn = (n: number) => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[+d]);

type BaseKey = 'plain' | 'streets' | 'satellite';

export default function HealthcareMap({
  facilities,
  selectedFacility,
  onSelectFacility,
  allFacilities,
  selectedUpazila = 'all',
  onSelectUpazila,
  heightClass = 'h-[480px] sm:h-[580px]',
}: HealthcareMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const LRef = useRef<any>(null);
  const baseLayerRef = useRef<any>(null);
  const upzLayerRef = useRef<any>(null);
  const dotsLayerRef = useRef<any>(null);
  const pinLayerRef = useRef<any>(null);
  const cb = useRef({ onSelectFacility, onSelectUpazila });
  cb.current = { onSelectFacility, onSelectUpazila };

  const [ready, setReady] = useState(false);
  const [base, setBase] = useState<BaseKey>('plain');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hidden, setHidden] = useState<Set<GroupKey>>(new Set());
  const [hoverUpz, setHoverUpz] = useState<number | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);
  // Open the legend by default only on wider screens
  useEffect(() => { if (window.innerWidth >= 640) setLegendOpen(true); }, []);

  // Counts
  const groupCounts = useMemo(() => {
    const c: Record<GroupKey, number> = { hospital: 0, primary: 0, private: 0, diagnostic: 0, emergency: 0 };
    facilities.forEach(f => { c[groupOf(f.category)]++; });
    return c;
  }, [facilities]);

  const upzCounts = useMemo(() => {
    const c = Array(12).fill(0) as number[];
    (allFacilities ?? facilities).forEach(f => { const i = upzIndex(f.upazila_en); if (i >= 0) c[i]++; });
    return c;
  }, [allFacilities, facilities]);
  const upzCountsRef = useRef(upzCounts);
  upzCountsRef.current = upzCounts;

  const selectedUpzIdx = selectedUpazila === 'all' ? -1 : PAGE_UPAZILA_ID.findIndex(x => x.toLowerCase() === selectedUpazila.toLowerCase());
  const selUpzRef = useRef(selectedUpzIdx);
  selUpzRef.current = selectedUpzIdx;
  const baseRef = useRef(base);
  baseRef.current = base;

  const upzStyle = useCallback((idx: number, hover = false) => {
    const counts = upzCountsRef.current;
    const max = Math.max(1, ...counts);
    const t = counts[idx] / max;
    const sel = idx === selUpzRef.current;
    const overTiles = baseRef.current !== 'plain';
    return {
      fillColor: sel ? '#F5B73B' : SCALE[Math.min(SCALE.length - 1, Math.floor(t * SCALE.length))],
      fillOpacity: overTiles ? (sel ? 0.35 : hover ? 0.3 : 0.12) : sel ? 0.55 : hover ? 0.95 : 0.85,
      color: sel ? '#C85A28' : overTiles ? '#0B4635' : '#ffffff',
      weight: sel ? 3 : overTiles ? 1.5 : 1.8,
      opacity: 1,
    };
  }, []);

  // ---- Init map ----------------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!containerRef.current) return;
      const L = await import('leaflet');
      LRef.current = L;
      let geo: any = null;
      try {
        const r = await fetch(GEO_URL);
        if (r.ok) geo = await r.json();
      } catch { /* boundaries are optional */ }
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: [24.8465, 89.3732], zoom: 10, minZoom: 9, maxZoom: 18,
        zoomControl: false, attributionControl: false, zoomSnap: 0.25,
      });
      mapRef.current = map;
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      L.control.attribution({ position: 'bottomleft', prefix: false }).addAttribution('সীমানা: ArcGIS BD · স্বাস্থ্য তথ্য: DGHS').addTo(map);

      if (geo) {
        const layer = L.geoJSON(geo, {
          style: (f: any) => upzStyle(f.properties.index),
          onEachFeature: (f: any, lyr: any) => {
            const idx: number = f.properties.index;
            lyr.bindTooltip(
              `<span class="hc-upz-label">${boguraUpazilasData[idx]?.name ?? f.properties.name_en}<b>${fmtBn(upzCountsRef.current[idx])}</b></span>`,
              { permanent: true, direction: 'center', className: 'hc-label', interactive: false }
            );
            lyr.on('mouseover', () => { setHoverUpz(idx); lyr.setStyle(upzStyle(idx, true)); });
            lyr.on('mouseout', () => { setHoverUpz(null); lyr.setStyle(upzStyle(idx)); });
            lyr.on('click', () => {
              const id = PAGE_UPAZILA_ID[idx];
              cb.current.onSelectUpazila?.(selUpzRef.current === idx ? 'all' : id);
            });
          },
        }).addTo(map);
        upzLayerRef.current = layer;
        map.fitBounds(layer.getBounds(), { padding: [16, 16] });
      }

      dotsLayerRef.current = L.layerGroup().addTo(map);
      pinLayerRef.current = L.layerGroup().addTo(map);
      setReady(true);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null; upzLayerRef.current = null; dotsLayerRef.current = null; pinLayerRef.current = null; baseLayerRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Base layer switch -------------------------------------------------------------------
  useEffect(() => {
    const L = LRef.current, map = mapRef.current;
    if (!ready || !L || !map) return;
    if (baseLayerRef.current) { map.removeLayer(baseLayerRef.current); baseLayerRef.current = null; }
    if (base === 'streets') {
      baseLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' });
    } else if (base === 'satellite') {
      baseLayerRef.current = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 });
    }
    if (baseLayerRef.current) { baseLayerRef.current.addTo(map); baseLayerRef.current.bringToBack(); }
    upzLayerRef.current?.eachLayer((l: any) => l.setStyle(upzStyle(l.feature.properties.index)));
  }, [base, ready, upzStyle]);

  // ---- Upazila restyle + label counts when data / filter changes ------------------------------
  useEffect(() => {
    if (!ready || !upzLayerRef.current) return;
    upzLayerRef.current.eachLayer((l: any) => {
      const idx = l.feature.properties.index;
      l.setStyle(upzStyle(idx));
      l.setTooltipContent(`<span class="hc-upz-label">${boguraUpazilasData[idx]?.name ?? ''}<b>${fmtBn(upzCounts[idx])}</b></span>`);
    });
  }, [upzCounts, selectedUpzIdx, ready, upzStyle]);

  // ---- Facility dots -------------------------------------------------------------------------
  useEffect(() => {
    const L = LRef.current;
    if (!ready || !L || !dotsLayerRef.current) return;
    const layer = dotsLayerRef.current;
    layer.clearLayers();
    facilities.forEach(f => {
      if (typeof f.latitude !== 'number' || typeof f.longitude !== 'number') return;
      const g = groupOf(f.category);
      if (hidden.has(g)) return;
      const big = g === 'hospital' || g === 'emergency';
      const m = L.circleMarker([f.latitude, f.longitude], {
        radius: big ? 7 : 5, fillColor: GROUPS[g].color, color: '#fff', weight: 1.5, fillOpacity: 0.95,
      });
      m.bindTooltip(f.name, { direction: 'top', offset: [0, -6], className: 'hc-tip' });
      m.on('click', (e: any) => { L.DomEvent.stopPropagation(e); cb.current.onSelectFacility(f); });
      layer.addLayer(m);
    });
  }, [facilities, hidden, ready]);

  // ---- Selected facility: pulsing pin + popup + fly ----------------------------------------------
  useEffect(() => {
    const L = LRef.current, map = mapRef.current;
    if (!ready || !L || !map || !pinLayerRef.current) return;
    pinLayerRef.current.clearLayers();
    const f = selectedFacility;
    if (!f || typeof f.latitude !== 'number') return;
    const g = GROUPS[groupOf(f.category)];
    const icon = L.divIcon({
      className: 'hc-pin',
      html: `<div class="hc-pin-inner" style="background:${g.color}"><i class="fa-solid ${g.icon}"></i></div><span class="hc-pulse" style="border-color:${g.color}"></span>`,
      iconSize: [40, 40], iconAnchor: [20, 20],
    });
    const owner = f.ownership === 'government' ? 'সরকারি' : f.ownership === 'private' ? 'বেসরকারি' : 'এনজিও';
    const popup = `
      <div class="hc-popup">
        <div class="hc-popup-tags"><span style="background:${g.color}1A;color:${g.color}">${g.label}</span><span>${owner}</span><span>${f.upazila}</span></div>
        <h4>${f.name}</h4>
        <p class="hc-addr">${f.address}</p>
        ${f.services?.length ? `<div class="hc-svc">${f.services.slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div>` : ''}
        <div class="hc-actions">
          ${f.phone?.length ? `<a class="hc-call" href="tel:${f.phone[0]}"><i class="fa-solid fa-phone"></i> ${f.phone[0]}</a>` : '<span class="hc-nophone">হটলাইন নেই</span>'}
          <a class="hc-dir" href="${f.google_maps_url}" target="_blank" rel="noopener noreferrer">দিকনির্দেশনা <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>`;
    const marker = L.marker([f.latitude, f.longitude], { icon, zIndexOffset: 1000 }).bindPopup(popup, { maxWidth: 290, minWidth: 230, className: 'hc-popup-wrap', offset: [0, -14] });
    pinLayerRef.current.addLayer(marker);
    map.flyTo([f.latitude, f.longitude], Math.max(map.getZoom(), 13), { duration: 0.6 });
    marker.openPopup();
  }, [selectedFacility, ready]);

  // ---- Fit to selected upazila / whole district -----------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map || !upzLayerRef.current || selectedFacility) return;
    if (selectedUpzIdx >= 0) {
      let target: any = null;
      upzLayerRef.current.eachLayer((l: any) => { if (l.feature.properties.index === selectedUpzIdx) target = l; });
      if (target) map.flyToBounds(target.getBounds(), { padding: [30, 30], duration: 0.6 });
    } else {
      map.flyToBounds(upzLayerRef.current.getBounds(), { padding: [16, 16], duration: 0.6 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUpzIdx, ready]);

  const resetView = () => {
    mapRef.current?.closePopup();
    if (selectedUpzIdx >= 0) onSelectUpazila?.('all');
    else if (upzLayerRef.current) mapRef.current?.flyToBounds(upzLayerRef.current.getBounds(), { padding: [16, 16], duration: 0.6 });
  };

  const toggleGroup = (g: GroupKey) =>
    setHidden(prev => { const n = new Set(prev); n.has(g) ? n.delete(g) : n.add(g); return n; });

  useEffect(() => {
    const t = setTimeout(() => mapRef.current?.invalidateSize(), 250);
    return () => clearTimeout(t);
  }, [isFullscreen]);

  const BASES: [BaseKey, string][] = [['plain', 'সীমানা'], ['streets', 'রাস্তা'], ['satellite', 'স্যাটেলাইট']];
  const shown = facilities.length - Array.from(hidden).reduce((s, g) => s + groupCounts[g], 0);

  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-emerald-900/15 bg-[#F9F8F4] ${heightClass} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : ''
      }`}
    >
      {/* Top bar */}
      <div className="absolute top-2.5 sm:top-3 inset-x-2.5 sm:inset-x-3 z-[400] flex items-start justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-[#0B4635] text-white px-3 py-2 rounded-xl shadow-lg min-w-0">
          <h4 className="text-xs sm:text-sm font-extrabold leading-tight flex items-center gap-1.5">
            <i className="fa-solid fa-hospital text-amber-300"></i>
            <span className="truncate">স্বাস্থ্যসেবা মানচিত্র</span>
          </h4>
          <p className="text-[10px] text-emerald-100/85">
            <b className="text-amber-300">{fmtBn(shown)}</b>টি প্রতিষ্ঠান
            {selectedUpzIdx >= 0 ? ` · ${boguraUpazilasData[selectedUpzIdx]?.name}` : ' · ১২টি উপজেলা'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto shrink-0">
          <div className="hidden min-[430px]:flex items-center gap-0.5 bg-white/95 backdrop-blur p-1 rounded-xl shadow border border-slate-200 text-[11px]">
            {BASES.map(([k, label]) => (
              <button key={k} onClick={() => setBase(k)} className={`px-2 py-1 rounded-lg font-semibold transition cursor-pointer ${base === k ? 'bg-[#0B4635] text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={resetView} title="রিসেট ভিউ" aria-label="রিসেট ভিউ" className="w-9 h-9 rounded-xl bg-white text-[#0B4635] hover:text-[#C85A28] flex items-center justify-center shadow border border-slate-200 transition cursor-pointer">
            <i className="fa-solid fa-arrows-to-eye text-xs"></i>
          </button>
          <button onClick={() => setIsFullscreen(v => !v)} title="ফুলস্ক্রিন" aria-label="ফুলস্ক্রিন" className="w-9 h-9 rounded-xl bg-white text-[#0B4635] hover:text-[#C85A28] flex items-center justify-center shadow border border-slate-200 transition cursor-pointer">
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
          </button>
        </div>
      </div>

      {/* Map canvas (themed background when no tiles) */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          backgroundImage:
            'radial-gradient(rgba(11,70,53,0.09) 1px, transparent 1px), radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F3F6F1 55%, #E4ECE4 100%)',
          backgroundSize: '18px 18px, 100% 100%',
        }}
      />
      {!ready && <div className="absolute inset-0 z-[300] flex items-center justify-center text-slate-500 text-xs pointer-events-none">মানচিত্র লোড হচ্ছে...</div>}

      {/* Hover upazila card (desktop) */}
      {hoverUpz !== null && (
        <div className="hidden sm:block absolute top-[68px] left-3 z-[400] pointer-events-none bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-200 text-xs">
          <div className="font-extrabold text-[#0B4635]">{boguraUpazilasData[hoverUpz]?.name} উপজেলা</div>
          <div className="text-[11px] text-slate-500">{fmtBn(upzCounts[hoverUpz])}টি প্রতিষ্ঠান · ক্লিক করে ফিল্টার করুন</div>
        </div>
      )}

      {/* Legend / group toggles */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-14 z-[400] pointer-events-none">
        <div className="pointer-events-auto inline-block bg-white/95 backdrop-blur rounded-xl shadow border border-slate-200 max-w-full">
          <button
            onClick={() => setLegendOpen(v => !v)}
            className="w-full flex items-center justify-between gap-3 px-3 py-1.5 text-[11px] font-bold text-slate-800 cursor-pointer"
          >
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-layer-group text-[#0B4635]"></i> ধরণ অনুযায়ী দেখুন</span>
            <i className={`fa-solid fa-chevron-${legendOpen ? 'down' : 'up'} text-[9px] text-slate-400`}></i>
          </button>
          {legendOpen && (
            <div className="px-2 pb-2 flex flex-wrap gap-1.5 max-w-[34rem]">
              <div className="min-[430px]:hidden w-full flex items-center gap-1 pb-1">
                {BASES.map(([k, label]) => (
                  <button key={k} onClick={() => setBase(k)} className={`flex-1 px-2 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer ${base === k ? 'bg-[#0B4635] text-white border-[#0B4635]' : 'text-slate-600 border-slate-200'}`}>{label}</button>
                ))}
              </div>
              {(Object.keys(GROUPS) as GroupKey[]).map(g => {
                const off = hidden.has(g);
                return (
                  <button
                    key={g}
                    onClick={() => toggleGroup(g)}
                    aria-pressed={!off}
                    className={`flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-lg border text-[11px] font-semibold transition cursor-pointer ${
                      off ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: off ? '#CBD5E1' : GROUPS[g].color }}></span>
                    <span>{GROUPS[g].label}</span>
                    <span className="text-[10px] text-slate-400">{fmtBn(groupCounts[g])}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .hc-label.leaflet-tooltip { background: transparent; border: none; box-shadow: none; padding: 0; }
        .hc-label.leaflet-tooltip::before { display: none; }
        .hc-upz-label { display: flex; flex-direction: column; align-items: center; line-height: 1.15; color: #0b4635; font-weight: 800; font-size: 11px; white-space: nowrap; text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 5px #fff; }
        .hc-upz-label b { font-size: 10px; color: #c85a28; }
        .hc-tip.leaflet-tooltip { font-size: 11px; font-weight: 700; color: #0b4635; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,.15); padding: 3px 8px; }
        .hc-pin { background: transparent; border: none; }
        .hc-pin-inner { width: 36px; height: 36px; margin: 2px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; color: #fff; border: 3px solid #F5B73B; box-shadow: 0 4px 12px rgba(0,0,0,.35); font-size: 13px; position: relative; z-index: 2; }
        .hc-pulse { position: absolute; inset: 0; border: 2px solid; border-radius: 9999px; animation: hcPulse 1.6s ease-out infinite; }
        @keyframes hcPulse { 0% { transform: scale(.7); opacity: .9; } 100% { transform: scale(1.6); opacity: 0; } }
        .hc-popup-wrap .leaflet-popup-content-wrapper { border-radius: 16px; padding: 0; box-shadow: 0 10px 30px rgba(0,0,0,.25); }
        .hc-popup-wrap .leaflet-popup-content { margin: 0; }
        .hc-popup { padding: 12px 14px; font-family: inherit; }
        .hc-popup-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px; }
        .hc-popup-tags span { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 6px; background: #f1f5f9; color: #475569; }
        .hc-popup h4 { font-size: 14px; font-weight: 800; color: #0f172a; line-height: 1.3; margin: 0 0 3px; }
        .hc-addr { font-size: 12px; color: #475569; margin: 0 0 8px; line-height: 1.4; }
        .hc-svc { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
        .hc-svc span { font-size: 10px; background: #ecfdf5; color: #065f46; padding: 2px 6px; border-radius: 6px; }
        .hc-actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; }
        .hc-call { background: #0b4635; color: #fff !important; font-size: 12px; font-weight: 700; padding: 6px 10px; border-radius: 10px; text-decoration: none; }
        .hc-dir { font-size: 12px; font-weight: 700; color: #c85a28 !important; text-decoration: none; }
        .hc-nophone { font-size: 12px; color: #94a3b8; }
        .leaflet-control-zoom { border: none !important; box-shadow: 0 2px 8px rgba(0,0,0,.15) !important; }
        .leaflet-control-zoom a { background: #fff !important; color: #0b4635 !important; }
        .leaflet-control-attribution { background: rgba(255,255,255,.8) !important; color: #64748b !important; font-size: 10px !important; border-radius: 8px !important; }
        .leaflet-interactive { cursor: pointer; }
      `}</style>
    </div>
  );
}
