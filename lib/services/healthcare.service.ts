import fs from 'fs';
import path from 'path';

export interface HealthcareFacility {
  id: string;
  dghs_facility_id: string;
  name: string;
  name_bn: string;
  slug: string;
  category: string;
  facility_type: string;
  original_facility_type: string;
  ownership: 'government' | 'private' | 'ngo';
  district: string;
  district_bn: string;
  upazila: string;
  upazila_bn: string;
  union: string | null;
  union_bn: string | null;
  village_or_area: string | null;
  address: string;
  phone: string[];
  email: string | null;
  website: string | null;
  latitude: number;
  longitude: number;
  google_maps_url: string;
  image_url: string | null;
  services: string[];
  source_urls: string[];
  verification_status: 'verified' | 'partially_verified' | 'unverified';
  last_verified: string;
}

export interface HealthcareFilterOptions {
  upazila?: string;
  category?: string;
  ownership?: string;
  query?: string;
  emergencyOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface HealthcarePaginatedResult {
  facilities: HealthcareFacility[];
  total: number;
  page: number;
  totalPages: number;
  upazilas: { name: string; name_bn: string; count: number }[];
  categories: { name: string; count: number }[];
}

let cachedFacilities: HealthcareFacility[] | null = null;

export class HealthcareService {
  /**
   * Read all facilities from the master file with in-memory caching
   */
  public static getAllFacilities(): HealthcareFacility[] {
    if (cachedFacilities) {
      return cachedFacilities;
    }

    try {
      const filePath = path.join(process.cwd(), 'amr-bogura-data', 'healthcare', 'healthcare-all.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.data)) {
          cachedFacilities = parsed.data;
          return cachedFacilities!;
        }
      }
    } catch (err) {
      console.error('Error loading master healthcare dataset:', err);
    }

    return [];
  }

  /**
   * Filter and paginate facilities
   */
  public static getFacilities(options: HealthcareFilterOptions = {}): HealthcarePaginatedResult {
    const all = this.getAllFacilities();
    const {
      upazila = 'all',
      category = 'all',
      ownership = 'all',
      query = '',
      emergencyOnly = false,
      page = 1,
      limit = 24
    } = options;

    let filtered = [...all];

    // Upazila filter
    if (upazila && upazila !== 'all') {
      filtered = filtered.filter(f =>
        f.upazila.toLowerCase() === upazila.toLowerCase() ||
        f.upazila_bn === upazila
      );
    }

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(f =>
        f.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Ownership filter
    if (ownership && ownership !== 'all') {
      filtered = filtered.filter(f => f.ownership === ownership);
    }

    // Emergency filter
    if (emergencyOnly) {
      filtered = filtered.filter(f =>
        f.category === 'Ambulance Services' ||
        f.category === 'Blood Banks' ||
        f.services.some(s => s.includes('২৪/৭') || s.includes('জরুরী') || s.includes('জরুরি') || s.includes('Emergency'))
      );
    }

    // Search query
    if (query && query.trim().length > 0) {
      const q = query.trim().toLowerCase();
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.name_bn.includes(q) ||
        f.address.toLowerCase().includes(q) ||
        f.upazila.toLowerCase().includes(q) ||
        f.upazila_bn.includes(q) ||
        (f.union && f.union.toLowerCase().includes(q)) ||
        (f.union_bn && f.union_bn.includes(q)) ||
        (f.village_or_area && f.village_or_area.toLowerCase().includes(q)) ||
        f.services.some(s => s.toLowerCase().includes(q))
      );
    }

    // Upazila counts for tabs
    const upazilaMap = new Map<string, { name_bn: string; count: number }>();
    const upazilaBanglaMap: Record<string, string> = {
      "Bogura Sadar": "বগুড়া সদর",
      "Adamdighi": "আদমদীঘি",
      "Dhunat": "ধুনট",
      "Dhupchanchia": "দুপচাঁচিয়া",
      "Gabtali": "গাবতলী",
      "Kahalu": "কাহালু",
      "Nandigram": "নন্দীগ্রাম",
      "Sariakandi": "সারিয়াকান্দি",
      "Shajahanpur": "শাজাহানপুর",
      "Sherpur": "শেরপুর",
      "Shibganj": "শিবগঞ্জ",
      "Sonatala": "সোনাতলা"
    };

    for (const [enName, bnName] of Object.entries(upazilaBanglaMap)) {
      upazilaMap.set(enName, { name_bn: bnName, count: 0 });
    }

    for (const f of all) {
      const entry = upazilaMap.get(f.upazila);
      if (entry) {
        entry.count++;
      } else {
        upazilaMap.set(f.upazila, { name_bn: f.upazila_bn || f.upazila, count: 1 });
      }
    }

    const upazilas = Array.from(upazilaMap.entries()).map(([name, val]) => ({
      name,
      name_bn: val.name_bn,
      count: val.count
    }));

    // Category counts for tabs
    const catMap = new Map<string, number>();
    for (const f of all) {
      catMap.set(f.category, (catMap.get(f.category) || 0) + 1);
    }
    const categories = Array.from(catMap.entries()).map(([name, count]) => ({
      name,
      count
    }));

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const validPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (validPage - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      facilities: paginated,
      total,
      page: validPage,
      totalPages,
      upazilas,
      categories
    };
  }

  /**
   * Find facility by slug or DGHS ID
   */
  public static getFacilityBySlug(slug: string): HealthcareFacility | null {
    const all = this.getAllFacilities();
    return all.find(f => f.slug === slug || f.id === slug || f.dghs_facility_id === slug) || null;
  }

  /**
   * Get all emergency ambulance and blood bank facilities
   */
  public static getEmergencyFacilities(): HealthcareFacility[] {
    const all = this.getAllFacilities();
    return all.filter(f =>
      f.category === 'Ambulance Services' ||
      f.category === 'Blood Banks' ||
      f.services.some(s => s.includes('২৪/৭') || s.includes('জরুরী') || s.includes('Emergency'))
    );
  }
}

