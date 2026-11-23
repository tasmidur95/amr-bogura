'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { boguraUpazilasGeoJson, getPolygonCentroid, UpazilaGeoFeature } from '@/lib/data/bogura-upazilas-geo';
import { boguraUpazilasData } from '@/lib/data/unions-villages-data';

interface BoguraGeoMapProps {
  onSelectUpazila?: (index: number) => void;
  hoveredIndex?: number | null;
  onHoverIndex?: (index: number | null) => void;
  heightClass?: string;
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
  const labelsLayerRef = useRef<any>(null);
  const selectedLayerRef = useRef<any>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedUpazila, setSelectedUpazila] = useState<UpazilaGeoFeature | null>(null);
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<number | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const activeHoverIdx =
    externalHoveredIndex !== undefined && externalHoveredIndex !== null
      ? externalHoveredIndex
      : internalHoveredIndex;

  // Highlight colors
  const HIGHLIGHT_COLOR = '#fbbf24'; // amber-400
  const HIGHLIGHT_BORDER = '#f59e0b'; // amber-500
  const HOVER_OPACITY = 0.85;
  const DEFAULT_OPACITY = 0.65;
  const SELECTED_OPACITY = 0.9;

  const getDefaultStyle = useCallback((feature: any) => ({
    fillColor: feature.properties.color,
    weight: 1.5,
    opacity: 0.9,
    color: '#1e293b',
    fillOpacity: DEFAULT_OPACITY,
  }), []);

  const getHoverStyle = useCallback(() => ({
    weight: 2.5,
    opacity: 1,
    color: '#fbbf24',
    fillOpacity: HOVER_OPACITY,
  }), []);

  const getSelectedStyle = useCallback(() => ({
    fillColor: HIGHLIGHT_COLOR,
    weight: 3,
    opacity: 1,
    color: HIGHLIGHT_BORDER,
    fillOpacity: SELECTED_OPACITY,
  }), []);

  // Initialize Leaflet map
  useEffect(() => {
    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = await import('leaflet');

      // Clean up previous instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Bogura district center
      const center: [number, number] = [24.84, 89.37];

      const map = L.map(mapContainerRef.current, {
        center,
        zoom: 10,
        minZoom: 9,
        maxZoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Dark tile layer (CartoDB Dark Matter) matching the reference screenshot
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(map);

      // Attribution
      L.control
        .attribution({ position: 'bottomleft', prefix: false })
        .addAttribution('© <a href="https://carto.com/">CARTO</a> · <a href="https://amar-bogura.bd">আমার বগুড়া</a>')
        .addTo(map);

      // Zoom control bottom-right (like the reference)
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Labels layer group
      const labelsGroup = L.layerGroup().addTo(map);
      labelsLayerRef.current = labelsGroup;

      // GeoJSON layer for upazila polygons
      const geoLayer = L.geoJSON(boguraUpazilasGeoJson as any, {
        style: (feature: any) => getDefaultStyle(feature),
        onEachFeature: (feature: any, layer: any) => {
          const props = feature.properties;
          const idx = props.index;

          // Click handler
          layer.on('click', () => {
            setSelectedUpazila(feature);

            // Reset all styles
            geoLayer.resetStyle();

            // Highlight selected
            layer.setStyle(getSelectedStyle());
            layer.bringToFront();
            selectedLayerRef.current = layer;

            // Callback
            if (onSelectUpazila) {
              onSelectUpazila(idx);
            }
          });

          // Hover handlers
          layer.on('mouseover', () => {
            if (selectedLayerRef.current !== layer) {
              layer.setStyle(getHoverStyle());
              layer.bringToFront();
              if (selectedLayerRef.current) {
                selectedLayerRef.current.bringToFront();
              }
            }
            setInternalHoveredIndex(idx);
            if (onHoverIndex) onHoverIndex(idx);
          });

          layer.on('mouseout', () => {
            if (selectedLayerRef.current !== layer) {
              geoLayer.resetStyle(layer);
            }
            setInternalHoveredIndex(null);
            if (onHoverIndex) onHoverIndex(null);
          });
        },
      }).addTo(map);

      geoLayerRef.current = geoLayer;

      // Add Bangla name labels at polygon centroids
      boguraUpazilasGeoJson.features.forEach((feature) => {
        const coords = feature.geometry.coordinates[0];
        const [lat, lng] = getPolygonCentroid(coords);

        const label = L.divIcon({
          className: 'upazila-label-icon',
          html: `<span style="
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            text-shadow: 0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6);
            white-space: nowrap;
            pointer-events: none;
            user-select: none;
            letter-spacing: 0.3px;
          ">${feature.properties.name}</span>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        L.marker([lat, lng], {
          icon: label,
          interactive: false,
          keyboard: false,
        }).addTo(labelsGroup);
      });

      // Fit map to GeoJSON bounds
      map.fitBounds(geoLayer.getBounds(), { padding: [20, 20] });

      setMapReady(true);
    }

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle external hover synchronization
  useEffect(() => {
    if (!geoLayerRef.current || !mapReady) return;

    geoLayerRef.current.eachLayer((layer: any) => {
      const feature = layer.feature;
      if (!feature) return;
      const idx = feature.properties.index;

      if (idx === externalHoveredIndex && selectedLayerRef.current !== layer) {
        layer.setStyle(getHoverStyle());
        layer.bringToFront();
        if (selectedLayerRef.current) selectedLayerRef.current.bringToFront();
      } else if (selectedLayerRef.current !== layer) {
        geoLayerRef.current.resetStyle(layer);
      }
    });
  }, [externalHoveredIndex, mapReady, getHoverStyle]);

  const handleResetSelection = useCallback(() => {
    setSelectedUpazila(null);
    selectedLayerRef.current = null;
    if (geoLayerRef.current) {
      geoLayerRef.current.resetStyle();
    }
    if (mapInstanceRef.current && geoLayerRef.current) {
      mapInstanceRef.current.fitBounds(geoLayerRef.current.getBounds(), {
        padding: [20, 20],
        duration: 0.5,
      });
    }
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Invalidate map size after transition
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
        if (geoLayerRef.current) {
          mapInstanceRef.current.fitBounds(geoLayerRef.current.getBounds(), {
            padding: [20, 20],
          });
        }
      }
    }, 300);
  };

  const detailedData =
    selectedUpazila && selectedUpazila.properties
      ? boguraUpazilasData[selectedUpazila.properties.index]
      : null;

  const hoveredData =
    activeHoverIdx !== null ? boguraUpazilasData[activeHoverIdx] : null;

  return (
    <div
      className={`relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : ''
      }`}
    >
      {/* Top Bar */}
      <div className="absolute top-3 inset-x-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Title */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-700/60 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <i className="fa-solid fa-map text-amber-400 text-sm"></i>
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white leading-tight">
              বগুড়া জেলার ইন্টারেক্টিভ মানচিত্র
            </h4>
            <p className="text-[10px] text-slate-400">
              ১২টি উপজেলা · ক্লিক করে হাইলাইট করুন
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {selectedUpazila && (
            <button
              onClick={handleResetSelection}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 backdrop-blur-md text-amber-400 text-xs font-bold border border-slate-700/60 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrows-rotate text-[10px]"></i>
              <span>রিসেট</span>
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-xl bg-slate-800/90 backdrop-blur-md text-white hover:text-amber-400 flex items-center justify-center shadow-lg border border-slate-700/60 transition cursor-pointer"
          >
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div
        ref={mapContainerRef}
        className={`w-full ${isFullscreen ? 'h-full' : heightClass} z-1`}
      />

      {/* Bottom Hover Info Bar */}
      <div className="absolute bottom-3 inset-x-3 z-[1000] flex flex-col sm:flex-row items-end sm:items-center justify-between gap-2 pointer-events-none">
        {/* Legend */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-slate-700/60 shadow-lg text-xs flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: '#4f7cac' }}></span>
            <span className="font-medium text-slate-300">উপজেলা সীমানা</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-400"></span>
            <span className="font-medium text-slate-300">নির্বাচিত / হাইলাইট</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            উপজেলায় ক্লিক করে বিস্তারিত দেখুন
          </span>
        </div>

        {/* Hovered Upazila Quick Card */}
        {hoveredData && !selectedUpazila && (
          <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700/60 shadow-xl max-w-xs text-xs animate-fade-in">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400 text-slate-900">
                #{hoveredData.serialBn}
              </span>
              <h5 className="font-extrabold text-sm">{hoveredData.name}</h5>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center font-bold">
              <div className="bg-white/10 px-1 py-1 rounded-md">
                <span className="text-slate-400 block font-normal">আয়তন</span>
                {hoveredData.area}
              </div>
              <div className="bg-white/10 px-1 py-1 rounded-md">
                <span className="text-slate-400 block font-normal">ইউনিয়ন</span>
                {hoveredData.unionCount}টি
              </div>
              <div className="bg-white/10 px-1 py-1 rounded-md">
                <span className="text-slate-400 block font-normal">গ্রাম</span>
                {hoveredData.villageCount}টি
              </div>
            </div>
          </div>
        )}

        {/* Selected Upazila Detail Card */}
        {selectedUpazila && detailedData && (
          <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl border border-amber-500/40 shadow-xl max-w-sm text-xs animate-fade-in">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-900">
                  #{detailedData.serialBn}
                </span>
                <h5 className="font-extrabold text-base text-white">
                  {detailedData.name} উপজেলা
                </h5>
              </div>
              <Link
                href={`/upazilas/${selectedUpazila.properties.index}`}
                className="text-amber-400 font-bold hover:underline text-xs flex items-center gap-1 shrink-0"
              >
                বিস্তারিত <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
            <p className="text-[11px] text-slate-300 mb-2 line-clamp-2">
              {detailedData.desc}
            </p>
            <div className="grid grid-cols-4 gap-1.5 text-[10px] text-center font-bold">
              <div className="bg-white/10 px-1 py-1.5 rounded-lg">
                <span className="text-slate-400 block font-normal mb-0.5">আয়তন</span>
                <span className="text-white">{detailedData.area}</span>
              </div>
              <div className="bg-white/10 px-1 py-1.5 rounded-lg">
                <span className="text-slate-400 block font-normal mb-0.5">জনসংখ্যা</span>
                <span className="text-amber-300">{detailedData.population}</span>
              </div>
              <div className="bg-white/10 px-1 py-1.5 rounded-lg">
                <span className="text-slate-400 block font-normal mb-0.5">ইউনিয়ন</span>
                <span className="text-emerald-300">{detailedData.unionCount}টি</span>
              </div>
              <div className="bg-white/10 px-1 py-1.5 rounded-lg">
                <span className="text-slate-400 block font-normal mb-0.5">গ্রাম</span>
                <span className="text-orange-300">{detailedData.villageCount}টি</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
              <i className="fa-solid fa-location-dot text-amber-400"></i>
              <span className="truncate">{detailedData.landmark}</span>
            </div>
          </div>
        )}
      </div>

      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />

      {/* Custom CSS for Leaflet dark theme */}
      <style jsx global>{`
        .upazila-label-icon {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .leaflet-control-zoom a {
          background: rgba(15, 23, 42, 0.9) !important;
          color: #e2e8f0 !important;
          border-color: rgba(71, 85, 105, 0.5) !important;
          backdrop-filter: blur(8px);
        }
        .leaflet-control-zoom a:hover {
          background: rgba(30, 41, 59, 0.95) !important;
          color: #fbbf24 !important;
        }
        .leaflet-control-attribution {
          background: rgba(15, 23, 42, 0.8) !important;
          color: #94a3b8 !important;
          font-size: 10px !important;
          border-radius: 8px !important;
          padding: 2px 6px !important;
        }
        .leaflet-control-attribution a {
          color: #60a5fa !important;
        }
      `}</style>
    </div>
  );
}
