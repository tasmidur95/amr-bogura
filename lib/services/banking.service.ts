import fs from 'fs';
import path from 'path';

export interface BankItem {
  id: string;
  bank_name_en: string;
  bank_name: string;
  type_en: string;
  type: string;
  head_office_or_zonal_office?: string;
  branch_name_en: string;
  branch_name: string;
  location: string;
  upazila: string;
  routing_number: string;
  swift_code?: string;
  facilities: string[];
  has_atm: boolean;
  has_crm: boolean;
  operating_hours: string;
  hotline: string;
  phone_number: string;
  phone_numbers: string[];
  banner_image?: string;
}

export interface AtmBoothItem {
  id: string;
  booth_name: string;
  bank_name: string;
  location: string;
  upazila: string;
  cards_accepted: string[];
  services: string[];
  operating_hours: string;
  hotline: string;
  banner_image?: string;
}

export interface BankingData {
  district: string;
  meta: {
    title: string;
    title_bn: string;
    description: string;
    banking_hours: string;
    atm_availability: string;
  };
  central_and_regulatory: BankItem[];
  banks: BankItem[];
  atm_and_fast_track_booths: AtmBoothItem[];
}

function getBankingFilePath(): string {
  return path.join(process.cwd(), 'amr-bogura-data', 'banking', 'banks-and-atms.json');
}

export class BankingService {
  static getBankingData(): BankingData {
    try {
      const p = getBankingFilePath();
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Failed to load banking data:', e);
    }

    return {
      district: 'Bogura',
      meta: {
        title: 'Bogura District Banks & 24/7 ATM Directory',
        title_bn: 'বগুড়া জেলার ব্যাংক শাখা ও এটিএম বুথ নির্দেশিকা',
        description: 'Comprehensive verified directory of banks and ATMs across Bogura.',
        banking_hours: 'রোববার – বৃহস্পতিবার: সকাল ১০:০০ – বিকাল ৪:০০',
        atm_availability: '২৪/৭ সার্বক্ষণিক নগদ উত্তোলন ও সিআরএম নগদ জমা সুবিধা',
      },
      central_and_regulatory: [],
      banks: [],
      atm_and_fast_track_booths: [],
    };
  }

  static filterData(options: {
    type?: string;
    upazila?: string;
    q?: string;
    hasAtm?: boolean;
    hasCrm?: boolean;
  }) {
    const rawData = BankingService.getBankingData();
    const { type = 'all', upazila = 'ALL', q = '' } = options;
    const query = q.toLowerCase().trim();

    let central = [...rawData.central_and_regulatory];
    let banks = [...rawData.banks];
    let atms = [...rawData.atm_and_fast_track_booths];

    // Filter by Upazila
    if (upazila !== 'ALL') {
      central = central.filter(b => b.upazila === upazila);
      banks = banks.filter(b => b.upazila === upazila);
      atms = atms.filter(a => a.upazila === upazila);
    }

    // Filter by Type / Category
    if (type === 'central') {
      banks = [];
      atms = [];
    } else if (type === 'bank') {
      central = [];
      atms = [];
    } else if (type === 'atm') {
      central = [];
      banks = [];
    } else if (type === 'islamic') {
      central = [];
      banks = banks.filter(b => b.type_en === 'islamic_commercial');
      atms = atms.filter(a =>
        a.bank_name.toLowerCase().includes('islam') || a.booth_name.toLowerCase().includes('islam')
      );
    } else if (type === 'crm') {
      central = central.filter(b => b.has_crm);
      banks = banks.filter(b => b.has_crm);
      atms = atms.filter(a =>
        a.services.some(s => s.toLowerCase().includes('deposit') || s.includes('সিআরএম') || s.includes('জমা'))
      );
    } else if (type === 'state') {
      central = [];
      banks = banks.filter(b => b.type_en === 'state_owned_commercial' || b.type_en === 'specialized_agricultural');
      atms = [];
    } else if (type === 'private') {
      central = [];
      banks = banks.filter(b => b.type_en === 'private_commercial' || b.type_en === 'islamic_commercial');
      atms = [];
    }

    // Filter by Query
    if (query) {
      central = central.filter(
        b =>
          b.bank_name_en.toLowerCase().includes(query) ||
          b.bank_name.includes(query) ||
          b.branch_name_en.toLowerCase().includes(query) ||
          b.branch_name.includes(query) ||
          b.location.toLowerCase().includes(query) ||
          b.routing_number.includes(query) ||
          (b.swift_code && b.swift_code.toLowerCase().includes(query))
      );

      banks = banks.filter(
        b =>
          b.bank_name_en.toLowerCase().includes(query) ||
          b.bank_name.includes(query) ||
          b.branch_name_en.toLowerCase().includes(query) ||
          b.branch_name.includes(query) ||
          b.location.toLowerCase().includes(query) ||
          b.routing_number.includes(query) ||
          (b.swift_code && b.swift_code.toLowerCase().includes(query)) ||
          b.facilities.some(f => f.toLowerCase().includes(query))
      );

      atms = atms.filter(
        a =>
          a.booth_name.toLowerCase().includes(query) ||
          a.bank_name.toLowerCase().includes(query) ||
          a.location.toLowerCase().includes(query) ||
          a.cards_accepted.some(c => c.toLowerCase().includes(query)) ||
          a.services.some(s => s.toLowerCase().includes(query))
      );
    }

    const allBanksCount = rawData.banks.length + rawData.central_and_regulatory.length;
    const islamicCount = rawData.banks.filter(b => b.type_en === 'islamic_commercial').length;
    const crmCount =
      rawData.banks.filter(b => b.has_crm).length +
      rawData.atm_and_fast_track_booths.filter(a =>
        a.services.some(s => s.toLowerCase().includes('deposit') || s.includes('সিআরএম') || s.includes('জমা'))
      ).length;

    return {
      meta: rawData.meta,
      central_and_regulatory: central,
      banks,
      atm_and_fast_track_booths: atms,
      stats: {
        totalBranches: allBanksCount,
        totalAtms: rawData.atm_and_fast_track_booths.length,
        totalIslamic: islamicCount,
        totalCrms: crmCount,
      },
      total: central.length + banks.length + atms.length,
    };
  }
}

