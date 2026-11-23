'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { boguraUpazilasData } from '@/lib/data/unions-villages-data';
import { matchUnions } from '@/lib/geo/union-match';

const GEO_URL = '/geo/bogura-unions.json';
const SCALE = ['#E3F1E6', '#BFDFC8', '#93C8A3', '#62AB7C', '#3A8A5C', '#1F6B45', '#0B4635'];
const TERRACOTTA = '#C85A28';
const AMBER = '#F5B73B';
const WARD_FILL = '#F3E3D3';

export interface UnionGeoStats {
  pop_2011: number | null;
  pop_male_2011: number | null;
  pop_female_2011: number | null;
  area_sqkm: number;
}

interface Props {
  upazilaIndex: number;
  selectedUnionId: string | null;
  onSelectUnion: (unionId: string | null) => void;
  /** Called once the geo data is loaded: stats keyed by the app's union id. */
  onStats?: (stats: Record<string, UnionGeoStats>, range: { min: number; max: number }) => void;
  heightClass?: string;
}

const fmt = (n: number | null | undefined) => (n == null ? '—' : n.toLocaleString('en-IN'));

export default function UpazilaUnionMap({
  upazilaIndex,
  selectedUnionId,
  onSelectUnion,
  onStats,
  heightClass = 'h-[440px] sm:h-[560px]',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const byUnionId = useRef<Map<string, any>>(new Map());
  const selLayerRef = useRef<any>(null);
  const rangeRef = useRef({ min: 0, max: 1 });
  const cb = useRef({ onSelectUnion, onStats });
  cb.current = { onSelectUnion, onStats };

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [showWards, setShowWards] = useState(true);
  const [hasWards, setHasWards] = useState(false);
  const [hover, setHover] = useState<any>(null);
  const [range, setRange] = useState({ min: 0, max: 1 });

  const upz = boguraUpazilasData[upazilaIndex];

  const styleFor = useCallback((f: any, state: 'base' | 'hover' | 'sel') => {
    const p = f.properties;
    if (state === 'sel') return { fillColor: AMBER, color: TERRACOTTA, weight: 3, opacity: 1, fillOpacity: 0.95 };
    if (state === 'hover') return { fillColor: TERRACOTTA, color: '#fff', weight: 2.5, opacity: 1, fillOpacity: 0.9 };
    if (p.kind === 'ward') return { fillColor: WARD_FILL, color: '#C9A27E', weight: 1, opacity: 1, fillOpacity: 0.95 };
    const { min, max } = rangeRef.current;
    const t = max === min || p.pop_2011 == null ? 0 : (p.pop_2011 - min) / (max - min);
    return {
      fillColor: SCALE[Math.min(SCALE.length - 1, Math.floor(t * SCALE.length))],
      color: '#fff', weight: 1.8, opacity: 1, fillOpacity: 0.88,
    };
  }, []);

  // Build the map
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!containerRef.current) return;
      const L = await import('leaflet');
      let data: any;
      try {
        const r = await fetch(GEO_URL);
        if (!r.ok) throw new Error();
        data = await r.json();
      } catch {
        if (!cancelled) setError(true);
        return;
      }
      if (cancelled || !containerRef.current) return;

      const features = data.features.filter((f: any) => f.properties.upazila_index === upazilaIndex);
      const unionFeats = features.filter((f: any) => f.properties.kind === 'union');
      const pops = unionFeats.map((f: any) => f.properties.pop_2011).filter((v: any) => v != null);
      const rg = { min: Math.min(...pops), max: Math.max(...pops) };
      rangeRef.current = rg;
      setRange(rg);
      setHasWards(features.some((f: any) => f.properties.kind === 'ward'));

      const idByGeoName = matchUnions(unionFeats.map((f: any) => f.properties.name_en), upz?.unions || []);
      const unionById = new Map((upz?.unions || []).map(u => [u.id, u]));

      const stats: Record<string, UnionGeoStats> = {};
      unionFeats.forEach((f: any) => {
        const id = idByGeoName.get(f.properties.name_en);
        if (id) stats[id] = { pop_2011: f.properties.pop_2011, pop_male_2011: f.properties.pop_male_2011, pop_female_2011: f.properties.pop_female_2011, area_sqkm: f.properties.area_sqkm };
      });

      const map = L.map(containerRef.current, { zoomControl: false, attributionControl: false, minZoom: 9, maxZoom: 15, zoomSnap: 0.25 });
      mapRef.current = map;
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      L.control.attribution({ position: 'bottomleft', prefix: false })
        .addAttribution('সীমানা: ArcGIS BD · জনসংখ্যা: BBS ২০১১').addTo(map);

      byUnionId.current = new Map();
      const layer = L.geoJSON({ type: 'FeatureCollection', features } as any, {
        style: (f: any) => styleFor(f, 'base'),
        onEachFeature: (f: any, lyr: any) => {
          const p = f.properties;
          const unionId = p.kind === 'union' ? idByGeoName.get(p.name_en) : undefined;
          const un = unionId ? unionById.get(unionId) : undefined;
          if (unionId) byUnionId.current.set(unionId, lyr);
          lyr.__unionId = unionId;

          if (p.kind === 'union') {
            lyr.bindTooltip(`<span>${un?.name || p.name_en}</span>`, { permanent: true, direction: 'center', className: 'union-label', interactive: false });
          }
          lyr.on('mouseover', () => {
            if (selLayerRef.current !== lyr) lyr.setStyle(styleFor(f, 'hover'));
            lyr.bringToFront(); selLayerRef.current?.bringToFront();
            setHover({ ...p, bn: un?.name });
          });
          lyr.on('mouseout', () => {
            if (selLayerRef.current !== lyr) lyr.setStyle(styleFor(f, 'base'));
            setHover(null);
          });
          lyr.on('click', () => {
            if (p.kind === 'union') cb.current.onSelectUnion(unionId ?? null);
          });
        },
      }).addTo(map);
      layerRef.current = layer;
      map.fitBounds(layer.getBounds(), { padding: [16, 16] });
      cb.current.onStats?.(stats, rg);
      setReady(true);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null; layerRef.current = null; selLayerRef.current = null;
      byUnionId.current = new Map();
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upazilaIndex]);

  // Sync highlight with selectedUnionId (map click OR list/chip click)
  useEffect(() => {
    if (!ready || !mapRef.current || !layerRef.current) return;
    if (selLayerRef.current) selLayerRef.current.setStyle(styleFor(selLayerRef.current.feature, 'base'));
    const lyr = selectedUnionId ? byUnionId.current.get(selectedUnionId) : null;
    selLayerRef.current = lyr || null;
    if (lyr) {
      lyr.setStyle(styleFor(lyr.feature, 'sel'));
      lyr.bringToFront();
      mapRef.current.flyToBounds(lyr.getBounds(), { padding: [50, 50], duration: 0.5, maxZoom: 13 });
    } else {
      mapRef.current.flyToBounds(layerRef.current.getBounds(), { padding: [16, 16], duration: 0.5 });
    }
  }, [selectedUnionId, ready, styleFor]);

  // Ward toggle
  useEffect(() => {
    if (!ready || !layerRef.current) return;
    layerRef.current.eachLayer((lyr: any) => {
      if (lyr.feature.properties.kind !== 'ward') return;
      lyr.setStyle({ opacity: showWards ? 1 : 0, fillOpacity: showWards ? 0.95 : 0 });
      const el = lyr.getElement?.();
      if (el) el.style.pointerEvents = showWards ? '' : 'none';
    });
  }, [showWards, ready]);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-emerald-900/15 shadow-xl bg-[#F9F8F4]">
      <div className="absolute top-3 inset-x-3 z-[1000] flex flex-wrap items-start justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-[#0B4635] text-white px-3.5 py-2 rounded-2xl shadow-lg">
          <h4 className="text-sm font-extrabold leading-tight">{upz?.name} উপজেলার ইউনিয়ন মানচিত্র</h4>
          <p className="text-[10px] text-emerald-100/80">যেকোনো ইউনিয়নে ক্লিক করুন · রঙ = জনসংখ্যা</p>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          {selectedUnionId && (
            <button onClick={() => onSelectUnion(null)} className="px-3 py-1.5 rounded-xl bg-white text-[#C85A28] text-xs font-bold border border-[#C85A28]/30 shadow cursor-pointer">
              <i className="fa-solid fa-arrows-rotate text-[10px] mr-1"></i>সব ইউনিয়ন
            </button>
          )}
          {hasWards && (
            <button
              onClick={() => setShowWards(v => !v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border shadow cursor-pointer ${showWards ? 'bg-[#F3E3D3] text-[#8a4a1f] border-[#C9A27E]' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              পৌরসভা ওয়ার্ড {showWards ? 'চালু' : 'বন্ধ'}
            </button>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className={`w-full ${heightClass}`}
        style={{
          backgroundImage:
            'radial-gradient(rgba(11,70,53,0.10) 1px, transparent 1px), radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F3F6F1 55%, #E4ECE4 100%)',
          backgroundSize: '18px 18px, 100% 100%',
        }}
      />
      {!ready && (
        <div className="absolute inset-0 z-[900] flex items-center justify-center text-slate-500 text-xs pointer-events-none">
          {error ? 'মানচিত্র লোড করা যায়নি' : 'মানচিত্র লোড হচ্ছে...'}
        </div>
      )}

      <div className="absolute bottom-3 inset-x-3 z-[1000] flex flex-col sm:flex-row items-end justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur px-3 py-2 rounded-2xl border border-slate-200 shadow text-[11px]">
          <div className="font-bold text-slate-700 mb-1">জনসংখ্যা (২০১১)</div>
          <div className="flex h-2.5 rounded-full overflow-hidden w-36">
            {SCALE.map(c => <span key={c} className="flex-1" style={{ background: c }} />)}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5 w-36">
            <span>{fmt(range.min)}</span><span>{fmt(range.max)}</span>
          </div>
        </div>

        {hover && (
          <div className="pointer-events-none bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-200 text-xs max-w-[15rem]">
            <div className="font-extrabold text-[#0B4635] truncate">
              {hover.kind === 'ward' ? `${hover.municipal} — ${hover.name_en}` : hover.bn || hover.name_en}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {hover.kind === 'ward' ? `আয়তন ${hover.area_sqkm} বর্গ কিমি` : `জনসংখ্যা ${fmt(hover.pop_2011)} · ক্লিক করে দেখুন`}
            </div>
          </div>
        )}
      </div>

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      <style jsx global>{`
        .union-label.leaflet-tooltip {
          background: transparent; border: none; box-shadow: none; padding: 0;
          color: #0b4635; font-weight: 800; font-size: 10px; white-space: nowrap;
          text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 5px #fff;
        }
        .union-label.leaflet-tooltip::before { display: none; }
        .leaflet-control-zoom { border: none !important; box-shadow: 0 2px 8px rgba(0,0,0,.15) !important; }
        .leaflet-control-zoom a { background: #fff !important; color: #0b4635 !important; }
        .leaflet-control-attribution { background: rgba(255,255,255,.8) !important; color: #64748b !important; font-size: 10px !important; border-radius: 8px !important; }
        .leaflet-interactive { cursor: pointer; }
      `}</style>
    </div>
  );
}
