'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { boguraUpazilasData } from '@/lib/data/unions-villages-data';

// Real upazila boundaries (ArcGIS BD CRIIPS layer, simplified) — see scripts/build-upazila-geo.mjs
const GEO_URL = '/geo/bogura-upazilas.json';

interface BoguraGeoMapProps {
  onSelectUpazila?: (index: number) => void;
  hoveredIndex?: number | null;
  onHoverIndex?: (index: number | null) => void;
  heightClass?: string;
}

type Metric = 'population' | 'area' | 'unions';

const METRICS: { key: Metric; label: string; unit: string }[] = [
  { key: 'population', label: 'জনসংখ্যা', unit: 'জন' },
  { key: 'area', label: 'আয়তন', unit: 'বর্গ কিমি' },
  { key: 'unions', label: 'ইউনিয়ন', unit: 'টি' },
];

// Site theme palette
const THEME = {
  forest: '#0B4635',
  terracotta: '#C85A28',
  amber: '#F5B73B',
  cream: '#F9F8F4',
  // light -> dark emerald scale for the choropleth
  scale: ['#E3F1E6', '#BFDFC8', '#93C8A3', '#62AB7C', '#3A8A5C', '#1F6B45', '#0B4635'],
};

function metricValue(idx: number, metric: Metric): number {
  const d = boguraUpazilasData[idx];
  if (!d) return 0;
  if (metric === 'population') return d.populationCount;
  if (metric === 'area') return d.areaSqKm;
  return d.unionCount;
}

export default function BoguraGeoMap({
  onSelectUpazila,
  hoveredIndex: externalHoveredIndex,
  onHoverIndex,
  heightClass = 'h-[520px] sm:h-[620px]',
}: BoguraGeoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const geoLayerRef = useRef<any>(null);
  const selectedIdxRef = useRef<number | null>(null);
  const hoverIdxRef = useRef<number | null>(null);
  const metricRef = useRef<Metric>('population');
  const cbRef = useRef({ onSelectUpazila, onHoverIndex });
  cbRef.current = { onSelectUpazila, onHoverIndex };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [internalHover, setInternalHover] = useState<number | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [metric, setMetric] = useState<Metric>('population');

  const activeHoverIdx = externalHoveredIndex ?? internalHover;

  // Per-metric min/max for the choropleth
  const range = useMemo(() => {
    const vals = boguraUpazilasData.map((_, i) => metricValue(i, metric));
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [metric]);
  const rangeRef = useRef(range);
  rangeRef.current = range;

  const fillFor = useCallback((idx: number) => {
    const { min, max } = rangeRef.current;
    const t = max === min ? 0 : (metricValue(idx, metricRef.current) - min) / (max - min);
    const i = Math.min(THEME.scale.length - 1, Math.floor(t * THEME.scale.length));
    return THEME.scale[i];
  }, []);

  const styleFor = useCallback(
    (idx: number) => {
      if (idx === selectedIdxRef.current) {
        return { fillColor: THEME.amber, color: THEME.terracotta, weight: 3.5, opacity: 1, fillOpacity: 0.92, dashArray: '' };
      }
      if (idx === hoverIdxRef.current) {
        return { fillColor: THEME.terracotta, color: '#fff', weight: 3, opacity: 1, fillOpacity: 0.88, dashArray: '' };
      }
      return { fillColor: fillFor(idx), color: '#ffffff', weight: 1.8, opacity: 1, fillOpacity: 0.85, dashArray: '' };
    },
    [fillFor]
  );

  const restyle = useCallback(() => {
    const geo = geoLayerRef.current;
    if (!geo) return;
    geo.eachLayer((layer: any) => {
      const idx = layer.feature.properties.index;
      layer.setStyle(styleFor(idx));
      if (idx === hoverIdxRef.current || idx === selectedIdxRef.current) layer.bringToFront();
    });
    geo.eachLayer((layer: any) => {
      if (layer.feature.properties.index === selectedIdxRef.current) layer.bringToFront();
    });
  }, [styleFor]);

  // Initialise map
  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      if (!mapContainerRef.current) return;
      const L = await import('leaflet');
      let geojson: any;
      try {
        const res = await fetch(GEO_URL);
        if (!res.ok) throw new Error('geo fetch failed');
        geojson = await res.json();
      } catch {
        if (!cancelled) setLoadError(true);
        return;
      }
      if (cancelled || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [24.84, 89.37],
        zoom: 10,
        minZoom: 9,
        maxZoom: 14,
        zoomControl: false,
        attributionControl: false,
        zoomSnap: 0.25,
      });
      mapInstanceRef.current = map;

      // No third-party tiles: boundaries sit on a themed background (see container style)
      L.control
        .attribution({ position: 'bottomleft', prefix: false })
        .addAttribution('সীমানা: ArcGIS BD (CRIIPS) · আমার বগুড়া')
        .addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const geoLayer = L.geoJSON(geojson, {
        style: (f: any) => styleFor(f.properties.index),
        onEachFeature: (feature: any, layer: any) => {
          const idx: number = feature.properties.index;
          const d = boguraUpazilasData[idx];

          // Permanent bilingual label at polygon centre
          layer.bindTooltip(
            `<span class="upz-label-bn">${d?.name ?? feature.properties.name_en}</span>`,
            { permanent: true, direction: 'center', className: 'upz-label', interactive: false }
          );

          layer.on('click', () => {
            selectedIdxRef.current = idx;
            setSelectedIdx(idx);
            restyle();
            map.flyToBounds(layer.getBounds(), { padding: [40, 40], duration: 0.6, maxZoom: 12 });
            cbRef.current.onSelectUpazila?.(idx);
          });
          layer.on('mouseover', () => {
            hoverIdxRef.current = idx;
            setInternalHover(idx);
            cbRef.current.onHoverIndex?.(idx);
            restyle();
          });
          layer.on('mouseout', () => {
            hoverIdxRef.current = null;
            setInternalHover(null);
            cbRef.current.onHoverIndex?.(null);
            restyle();
          });
        },
      }).addTo(map);

      geoLayerRef.current = geoLayer;
      map.fitBounds(geoLayer.getBounds(), { padding: [16, 16] });
      setMapReady(true);
    }

    initMap();
    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      geoLayerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Metric change → recolour
  useEffect(() => {
    metricRef.current = metric;
    if (mapReady) restyle();
  }, [metric, mapReady, restyle]);

  // External hover (cards list) → highlight on map
  useEffect(() => {
    if (!mapReady) return;
    hoverIdxRef.current = externalHoveredIndex ?? null;
    restyle();
  }, [externalHoveredIndex, mapReady, restyle]);

  const resetView = useCallback(() => {
    selectedIdxRef.current = null;
    setSelectedIdx(null);
    restyle();
    if (mapInstanceRef.current && geoLayerRef.current) {
      mapInstanceRef.current.flyToBounds(geoLayerRef.current.getBounds(), { padding: [16, 16], duration: 0.6 });
    }
  }, [restyle]);

  const toggleFullscreen = () => {
    setIsFullscreen(v => !v);
    setTimeout(() => {
      const map = mapInstanceRef.current;
      if (!map) return;
      map.invalidateSize();
      if (geoLayerRef.current) map.fitBounds(geoLayerRef.current.getBounds(), { padding: [16, 16] });
    }, 300);
  };

  const selected = selectedIdx !== null ? boguraUpazilasData[selectedIdx] : null;
  const hovered = activeHoverIdx !== null && activeHoverIdx !== undefined ? boguraUpazilasData[activeHoverIdx] : null;
  const currentMetric = METRICS.find(m => m.key === metric)!;

  return (
    <div
      className={`relative bg-[#F9F8F4] rounded-3xl overflow-hidden border border-emerald-900/15 shadow-xl ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : ''
      }`}
    >
      {/* Top bar */}
      <div className="absolute top-3 inset-x-3 z-[1000] flex flex-wrap items-start justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-[#0B4635] text-white px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center">
            <i className="fa-solid fa-map-location-dot text-amber-300 text-sm"></i>
          </div>
          <div>
            <h4 className="text-sm font-extrabold leading-tight">বগুড়া জেলার ইন্টারেক্টিভ মানচিত্র</h4>
            <p className="text-[10px] text-emerald-100/80">১২টি উপজেলা · ক্লিক করে বিস্তারিত দেখুন</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {selected && (
            <button
              onClick={resetView}
              className="px-3 py-1.5 rounded-xl bg-white text-[#C85A28] text-xs font-bold border border-[#C85A28]/30 hover:bg-orange-50 shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrows-rotate text-[10px]"></i>
              <span>রিসেট</span>
            </button>
          )}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="w-9 h-9 rounded-xl bg-white text-[#0B4635] hover:text-[#C85A28] flex items-center justify-center shadow border border-slate-200 transition cursor-pointer"
          >
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
          </button>
        </div>
      </div>

      {/* Metric switcher */}
      <div className="absolute top-[68px] left-3 z-[1000] pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur p-1 rounded-xl shadow border border-slate-200">
        {METRICS.map(m => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              metric === m.key ? 'bg-[#0B4635] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Map canvas */}
      <div ref={mapContainerRef} className={`w-full ${isFullscreen ? 'h-full' : heightClass}`} style={{
          background:
            'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F3F6F1 55%, #E4ECE4 100%)',
          backgroundImage:
            'radial-gradient(rgba(11,70,53,0.10) 1px, transparent 1px), radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F3F6F1 55%, #E4ECE4 100%)',
          backgroundSize: '18px 18px, 100% 100%',
        }}
      />

      {!mapReady && (
        <div className="absolute inset-0 z-[900] flex items-center justify-center text-slate-500 text-xs font-medium pointer-events-none">
          {loadError ? 'মানচিত্র লোড করা যায়নি' : 'মানচিত্র লোড হচ্ছে...'}
        </div>
      )}

      {/* Bottom: legend + info card */}
      <div className="absolute bottom-3 inset-x-3 z-[1000] flex flex-col sm:flex-row items-end sm:items-end justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur px-3 py-2 rounded-2xl border border-slate-200 shadow text-[11px]">
          <div className="font-bold text-slate-700 mb-1">
            {currentMetric.label} ({currentMetric.unit})
          </div>
          <div className="flex h-2.5 rounded-full overflow-hidden w-40">
            {THEME.scale.map(c => (
              <span key={c} className="flex-1" style={{ background: c }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-0.5 w-40">
            <span>কম</span>
            <span>বেশি</span>
          </div>
        </div>

        {selected ? (
          <div className="pointer-events-auto bg-white p-4 rounded-2xl border-2 border-[#F5B73B] shadow-xl max-w-sm w-full text-xs animate-fade-in">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-lg bg-[#F5B73B] text-emerald-950">
                  #{selected.serialBn}
                </span>
                <h5 className="font-extrabold text-base text-[#0B4635] truncate">{selected.name} উপজেলা</h5>
              </div>
              <Link
                href={`/upazilas/${selectedIdx}`}
                className="text-[#C85A28] font-bold hover:underline text-xs flex items-center gap-1 shrink-0"
              >
                বিস্তারিত <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
            <p className="text-[11px] text-slate-600 mb-2 line-clamp-2">{selected.desc}</p>
            <div className="grid grid-cols-4 gap-1.5 text-[10px] text-center font-bold">
              {[
                ['আয়তন', selected.area, 'text-slate-900'],
                ['জনসংখ্যা', selected.population, 'text-[#C85A28]'],
                ['ইউনিয়ন', `${selected.unionCount}টি`, 'text-[#0B4635]'],
                ['গ্রাম', `${selected.villageCount}টি`, 'text-[#C85A28]'],
              ].map(([k, v, cls]) => (
                <div key={k} className="bg-[#F9F8F4] border border-slate-200/80 px-1 py-1.5 rounded-lg">
                  <span className="text-slate-500 block font-normal mb-0.5">{k}</span>
                  <span className={cls}>{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
              <i className="fa-solid fa-location-dot text-[#C85A28]"></i>
              <span className="truncate">{selected.landmark}</span>
            </div>
          </div>
        ) : hovered ? (
          <div className="pointer-events-auto bg-white p-3 rounded-2xl border border-slate-200 shadow-xl max-w-xs text-xs animate-fade-in">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#C85A28] text-white">#{hovered.serialBn}</span>
              <h5 className="font-extrabold text-sm text-[#0B4635]">{hovered.name}</h5>
              <span className="text-[10px] text-slate-400">{hovered.enName}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center font-bold">
              <div className="bg-[#F9F8F4] px-1 py-1 rounded-md">
                <span className="text-slate-500 block font-normal">আয়তন</span>
                {hovered.area}
              </div>
              <div className="bg-[#F9F8F4] px-1 py-1 rounded-md">
                <span className="text-slate-500 block font-normal">ইউনিয়ন</span>
                {hovered.unionCount}টি
              </div>
              <div className="bg-[#F9F8F4] px-1 py-1 rounded-md">
                <span className="text-slate-500 block font-normal">জনসংখ্যা</span>
                {hovered.population}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />

      <style jsx global>{`
        .upz-label.leaflet-tooltip {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          color: #0b4635;
          font-weight: 800;
          font-size: 11px;
          white-space: nowrap;
          text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 5px #fff;
        }
        .upz-label.leaflet-tooltip::before {
          display: none;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
        }
        .leaflet-control-zoom a {
          background: #fff !important;
          color: #0b4635 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f9f8f4 !important;
          color: #c85a28 !important;
        }
        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.8) !important;
          color: #64748b !important;
          font-size: 10px !important;
          border-radius: 8px !important;
          padding: 2px 6px !important;
        }
        .leaflet-interactive {
          cursor: pointer;
          transition: fill 0.15s;
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
