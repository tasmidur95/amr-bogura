'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upazila,
  Hospital,
  ExploreSpot,
  EmergencyContact,
  upazilasData,
  hospitalsData,
  emergencyData,
  exploreData
} from '@/lib/data/district-data';
import { detailedExploreSpots } from '@/lib/data/explore-data';
import { searchVillages } from '@/lib/data/unions-villages-data';
import { useToast } from '@/lib/context/ToastContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  upazilas?: Upazila[];
  hospitals?: Hospital[];
  exploreSpots?: ExploreSpot[];
  emergencyContacts?: EmergencyContact[];
  onNavigate?: (view: string, anchor?: string) => void;
  onOpenUpazilaDetail?: (index: number) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  upazilas = upazilasData,
  hospitals = hospitalsData,
  emergencyContacts = emergencyData,
  onNavigate = () => {},
  onOpenUpazilaDetail = () => {},
}: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const results: Array<{
    type: string;
    title: string;
    sub: string;
    action: () => void;
  }> = [];

  if (q) {
    // Upazilas
    upazilas.forEach((u, idx) => {
      if (
        u.name.toLowerCase().includes(q) ||
        u.enName.toLowerCase().includes(q) ||
        u.landmark.toLowerCase().includes(q) ||
        u.unionList.some(un => un.toLowerCase().includes(q))
      ) {
        results.push({
          type: 'উপজেলা',
          title: `${u.serialBn}. ${u.name} (${u.enName})`,
          sub: `${u.area} · ${u.unions}`,
          action: () => {
            onClose();
            router.push(`/upazilas/${idx}`);
          },
        });
      }
    });

    // Detailed Explore Spots
    detailedExploreSpots.forEach(e => {
      if (
        e.title.toLowerCase().includes(q) ||
        e.enTitle.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.upazila.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'দর্শনীয় স্থান',
          title: e.title,
          sub: `${e.location} · ${e.categoryBn}`,
          action: () => {
            onClose();
            router.push(`/explore/${e.id}`);
          },
        });
      }
    });

    // Hospitals
    hospitals.forEach(h => {
      if (
        h.name.toLowerCase().includes(q) ||
        h.enName.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'হাসপাতাল',
          title: h.name,
          sub: `${h.address} · ${h.phone}`,
          action: () => {
            onClose();
            onNavigate('home', 'healthcare');
          },
        });
      }
    });

    // Emergency
    emergencyContacts.forEach(em => {
      if (em.title.toLowerCase().includes(q) || em.number.includes(q)) {
        results.push({
          type: 'জরুরি নম্বর',
          title: em.title,
          sub: em.number,
          action: () => {
            onClose();
            if (navigator.clipboard) {
              navigator.clipboard.writeText(em.number);
              showToast(`কপি হয়েছে: ${em.title} (${em.number})`);
            }
          },
        });
      }
    });

    // Villages & Unions Search
    const villageHits = searchVillages(q).slice(0, 5);
    villageHits.forEach(v => {
      results.push({
        type: 'গ্রাম / ইউনিয়ন',
        title: `গ্রাম: ${v.village}`,
        sub: `${v.unionName} ইউনিয়ন, ${v.upazilaName} উপজেলা (ডাকঘর: ${v.postCode})`,
        action: () => {
          onClose();
          router.push(`/upazilas/${v.upazilaId}`);
        },
      });
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 backdrop-blur-xs p-4 pt-20 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <i className="fa-solid fa-magnifying-glass text-emerald-700 text-lg"></i>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="বগুড়ার দর্শনীয় স্থান, হাসপাতাল, উপজেলা বা জরুরি নম্বর..."
            className="w-full text-base focus:outline-none text-slate-900"
          />
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 mt-2">
          {!q ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              খুঁজতে টাইপ করুন (যেমন: মহাস্থানগড়, খেরুয়া মসজিদ, শজিমেক, শেরপুর, যমুনা ঘাট)
            </p>
          ) : results.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              "{query}" সম্পর্কিত কোনো তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            results.map((r, i) => (
              <button
                key={i}
                onClick={r.action}
                className="w-full text-left py-3 px-2 hover:bg-emerald-50/70 rounded-xl flex items-center justify-between gap-3 transition cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {r.type}
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{r.title}</p>
                  <p className="text-xs text-slate-500">{r.sub}</p>
                </div>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
