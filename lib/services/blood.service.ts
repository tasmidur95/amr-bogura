import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { supabaseWriter } from '@/lib/supabase-admin';
import { upazilaSlug } from '@/lib/geo/upazila-slug';
import type { CommunityPost } from '@/lib/data/district-data';
import type { CommunityUser } from '@/lib/services/community-auth.service';

// =====================================================================================
// Blood module
//
//   BloodDonor   a PERSON who can give blood (long-lived registry, one row per person)
//   BloodRequest a NEED for blood (hospital, units, needed-by, fulfilment) - time-limited
//
// They used to be mixed together as community_posts(category='blood'). Now they are separate
// records; `feed()` merges them only for display on the community page.
//
// Storage: PostgreSQL (Supabase or the local dev database) when configured, otherwise an
// in-memory demo store seeded from amr-bogura-data/blood/blood-donors.json.
// =====================================================================================

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export type ModerationStatus = 'pending' | 'approved' | 'rejected';
export type Urgency = 'normal' | 'urgent' | 'critical';
export type Fulfilment = 'open' | 'fulfilled' | 'cancelled';
export type BloodKind = 'blood_donor' | 'blood_request';

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  phone: string;
  altPhone?: string | null;
  upazila: string;
  location: string;
  availability: string;
  lastDonated?: string | null;
  totalDonations: number;
  badge?: string | null;
  isVerified: boolean;
  isApproved: boolean;
  status: ModerationStatus;
  rejectReason?: string | null;
  createdAt: string;
  contributorUserId?: string | null;
}

export interface BloodRequest {
  id: string;
  requesterName: string;
  bloodGroup: string;
  units: number;
  hospital?: string | null;
  upazila: string;
  neededBy?: string | null;
  urgency: Urgency;
  detail?: string | null;
  contactPhone: string;
  fulfilment: Fulfilment;
  isApproved: boolean;
  status: ModerationStatus;
  rejectReason?: string | null;
  createdAt: string;
  contributorUserId?: string | null;
}

export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: 'duplicate' | 'invalid' | 'limit' | 'forbidden' | 'not_found';
}

const phoneKey = (p: string) => (p || '').replace(/\D/g, '').slice(-10);
const today = () => new Date().toISOString().slice(0, 10);
const useDb = () => Boolean(isSupabaseConfigured && supabase && supabaseWriter);

// ---------------------------------------------------------------------------
// Row <-> object mapping
// ---------------------------------------------------------------------------
const donorFromRow = (r: any): BloodDonor => ({
  id: r.id,
  name: r.name,
  bloodGroup: r.blood_group,
  phone: r.phone,
  altPhone: r.alt_phone ?? null,
  upazila: r.upazila,
  location: r.location,
  availability: r.availability ?? 'রক্তদাতা',
  lastDonated: r.last_donated ?? null,
  totalDonations: r.total_donations ?? 0,
  badge: r.badge ?? null,
  isVerified: !!r.is_verified,
  isApproved: !!r.is_approved,
  status: r.status,
  rejectReason: r.reject_reason ?? null,
  createdAt: r.created_at,
  contributorUserId: r.contributor_user_id ?? null,
});

const requestFromRow = (r: any): BloodRequest => ({
  id: r.id,
  requesterName: r.requester_name,
  bloodGroup: r.blood_group,
  units: r.units,
  hospital: r.hospital ?? null,
  upazila: r.upazila,
  neededBy: r.needed_by ?? null,
  urgency: r.urgency,
  detail: r.detail ?? null,
  contactPhone: r.contact_phone,
  fulfilment: r.fulfilment,
  isApproved: !!r.is_approved,
  status: r.status,
  rejectReason: r.reject_reason ?? null,
  createdAt: r.created_at,
  contributorUserId: r.contributor_user_id ?? null,
});

// ---------------------------------------------------------------------------
// Display mapping (the community page renders CommunityPost-shaped cards)
// ---------------------------------------------------------------------------
export function donorToPost(d: BloodDonor): CommunityPost {
  return {
    id: d.id,
    category: 'blood',
    kind: 'blood_donor',
    name: d.name,
    group: d.bloodGroup,
    role: d.availability,
    badge: d.badge ?? undefined,
    upazila: d.upazila,
    detail: d.location,
    phone: d.phone,
    created_at: d.createdAt,
    isApproved: d.isApproved,
    status: d.status,
    rejectReason: d.rejectReason ?? undefined,
    lastDonated: d.lastDonated ?? undefined,
  };
}

export function requestToPost(r: BloodRequest): CommunityPost {
  const bits = [`${r.units} ব্যাগ রক্ত প্রয়োজন`];
  if (r.hospital) bits.push(r.hospital);
  if (r.neededBy) bits.push(`${r.neededBy} এর মধ্যে`);
  return {
    id: r.id,
    category: 'blood',
    kind: 'blood_request',
    name: r.requesterName,
    group: r.bloodGroup,
    role: 'জরুরি প্রয়োজন',
    upazila: r.upazila,
    detail: bits.join(' · ') + (r.detail ? ` — ${r.detail}` : ''),
    phone: r.contactPhone,
    created_at: r.createdAt,
    isApproved: r.isApproved,
    status: r.status,
    rejectReason: r.rejectReason ?? undefined,
    hospital: r.hospital ?? undefined,
    units: r.units,
    neededBy: r.neededBy ?? undefined,
    urgency: r.urgency,
    fulfilment: r.fulfilment,
  };
}

// ---------------------------------------------------------------------------
// In-memory demo store (used only when no database is configured)
// ---------------------------------------------------------------------------
interface MemStore { donors: BloodDonor[]; requests: BloodRequest[] }
let mem: MemStore | null = null;
const dataDir = () => path.join(process.cwd(), 'amr-bogura-data', 'blood');
const isUserCreated = (id: string) => id.startsWith('don-') || id.startsWith('req-');

function loadMem(): MemStore {
  if (mem) return mem;
  const store: MemStore = { donors: [], requests: [] };
  try {
    const reg = JSON.parse(fs.readFileSync(path.join(dataDir(), 'blood-donors.json'), 'utf-8'));
    for (const d of reg.donors || []) {
      store.donors.push({
        id: d.id, name: d.name, bloodGroup: d.blood_group, phone: d.phone, altPhone: d.alt_phone ?? null,
        upazila: d.upazila, location: d.location, availability: d.status || 'রক্তদাতা',
        lastDonated: d.last_donated ?? null, totalDonations: d.total_donations ?? 0, badge: d.badge ?? null,
        isVerified: true, isApproved: true, status: 'approved', createdAt: '2026-01-01T00:00:00.000Z',
      });
    }
  } catch (e) { console.warn('blood registry not loaded:', (e as Error).message); }
  try {
    const sub = JSON.parse(fs.readFileSync(path.join(dataDir(), 'blood-submissions.json'), 'utf-8'));
    store.donors.unshift(...(sub.donors || []));
    store.requests.unshift(...(sub.requests || []));
  } catch { /* no submissions yet */ }
  mem = store;
  return store;
}

function persistMem() {
  if (!mem) return;
  try {
    fs.mkdirSync(dataDir(), { recursive: true });
    fs.writeFileSync(
      path.join(dataDir(), 'blood-submissions.json'),
      JSON.stringify({ donors: mem.donors.filter(d => isUserCreated(d.id)), requests: mem.requests }, null, 2),
      'utf-8'
    );
  } catch (e) { console.warn('blood submissions not persisted:', (e as Error).message); }
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------
export class BloodService {
  // ---------------- reads ----------------
  static async listDonors(opts: { upazila?: string; bloodGroup?: string; includePending?: boolean } = {}): Promise<BloodDonor[]> {
    const { upazila, bloodGroup, includePending } = opts;
    const slug = upazila && upazila !== 'ALL' ? upazilaSlug(upazila) : null;

    if (useDb()) {
      let q = (includePending ? supabaseWriter! : supabase!).from('blood_donors').select('*').order('created_at', { ascending: false });
      if (!includePending) q = q.eq('is_approved', true);
      if (bloodGroup && bloodGroup !== 'ALL') q = q.eq('blood_group', bloodGroup);
      if (slug) q = q.eq('upazila_slug', slug);
      const { data, error } = await q;
      if (!error && data) return data.map(donorFromRow);
      console.warn('blood donors read fell back to memory:', error?.message);
    }

    return loadMem().donors.filter(d =>
      (includePending || d.isApproved) &&
      (!bloodGroup || bloodGroup === 'ALL' || d.bloodGroup === bloodGroup) &&
      (!upazila || upazila === 'ALL' || upazilaSlug(d.upazila) === slug));
  }

  static async listRequests(opts: { upazila?: string; bloodGroup?: string; includePending?: boolean; includeClosed?: boolean } = {}): Promise<BloodRequest[]> {
    const { upazila, bloodGroup, includePending, includeClosed } = opts;
    const slug = upazila && upazila !== 'ALL' ? upazilaSlug(upazila) : null;
    // public lists show only requests that are published, still open and not past their date
    const stillRelevant = (r: BloodRequest) => includeClosed || (r.fulfilment === 'open' && (!r.neededBy || r.neededBy >= today()));

    if (useDb()) {
      let q = (includePending ? supabaseWriter! : supabase!).from('blood_requests').select('*').order('created_at', { ascending: false });
      if (!includePending) q = q.eq('is_approved', true);
      if (bloodGroup && bloodGroup !== 'ALL') q = q.eq('blood_group', bloodGroup);
      if (slug) q = q.eq('upazila_slug', slug);
      const { data, error } = await q;
      if (!error && data) return data.map(requestFromRow).filter(stillRelevant);
      console.warn('blood requests read fell back to memory:', error?.message);
    }

    return loadMem().requests.filter(r =>
      (includePending || r.isApproved) && stillRelevant(r) &&
      (!bloodGroup || bloodGroup === 'ALL' || r.bloodGroup === bloodGroup) &&
      (!upazila || upazila === 'ALL' || upazilaSlug(r.upazila) === slug));
  }

  /** Display feed for the community page: open requests first (they are time-critical), then donors. */
  static async feed(opts: { upazila?: string; bloodGroup?: string } = {}): Promise<CommunityPost[]> {
    const [requests, donors] = await Promise.all([this.listRequests(opts), this.listDonors(opts)]);
    return [...requests.map(requestToPost), ...donors.map(donorToPost)];
  }

  // ---------------- writes by members ----------------
  static async createDonor(
    user: CommunityUser,
    input: { bloodGroup?: string; location?: string; availability?: string; lastDonated?: string }
  ): Promise<Result<BloodDonor>> {
    const group = (input.bloodGroup || user.bloodGroup || '').trim();
    if (!(BLOOD_GROUPS as readonly string[]).includes(group)) return { success: false, error: 'সঠিক রক্তের গ্রুপ নির্বাচন করুন।', code: 'invalid' };
    if (phoneKey(user.phone).length < 10) return { success: false, error: 'আপনার প্রোফাইলে সঠিক মোবাইল নম্বর নেই।', code: 'invalid' };
    if (!upazilaSlug(user.upazila)) return { success: false, error: 'আপনার প্রোফাইলের উপজেলা চেনা যায়নি।', code: 'invalid' };
    const lastDonated = (input.lastDonated || '').trim() || null;
    if (lastDonated && (isNaN(Date.parse(lastDonated)) || lastDonated > today())) return { success: false, error: 'সর্বশেষ রক্তদানের তারিখ সঠিক নয়।', code: 'invalid' };

    const row = {
      name: user.name,
      blood_group: group,
      phone: user.phone,                                   // identity always comes from the account
      upazila: user.upazila,
      location: (input.location || '').trim().slice(0, 160) || user.upazila,
      availability: (input.availability || '').trim().slice(0, 60) || 'রক্তদাতা',
      last_donated: lastDonated,
      total_donations: 0,
      contributor_user_id: user.id,
    };

    if (useDb()) {
      const { data, error } = await supabaseWriter!.from('blood_donors').insert([row]).select().single();
      if (error) {
        if (error.code === '23505') return { success: false, error: 'এই অ্যাকাউন্ট বা মোবাইল নম্বর দিয়ে ইতিমধ্যে রক্তদাতা হিসেবে নিবন্ধিত আছে।', code: 'duplicate' };
        console.warn('blood donor insert failed:', error.message);
        return { success: false, error: 'রক্তদাতা তালিকায় যুক্ত করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।' };
      }
      return { success: true, data: donorFromRow(data) };
    }

    const m = loadMem();
    if (m.donors.some(d => phoneKey(d.phone) === phoneKey(user.phone) || (d.contributorUserId && d.contributorUserId === user.id))) {
      return { success: false, error: 'এই অ্যাকাউন্ট বা মোবাইল নম্বর দিয়ে ইতিমধ্যে রক্তদাতা হিসেবে নিবন্ধিত আছে।', code: 'duplicate' };
    }
    const donor: BloodDonor = {
      id: `don-${Date.now().toString(36)}`, name: row.name, bloodGroup: group, phone: row.phone, upazila: row.upazila,
      location: row.location, availability: row.availability, lastDonated, totalDonations: 0, badge: null,
      isVerified: false, isApproved: false, status: 'pending', createdAt: new Date().toISOString(), contributorUserId: user.id,
    };
    m.donors.unshift(donor);
    persistMem();
    return { success: true, data: donor };
  }

  static async createRequest(
    user: CommunityUser,
    input: { bloodGroup?: string; units?: number; hospital?: string; upazila?: string; neededBy?: string; urgency?: string; detail?: string; contactPhone?: string }
  ): Promise<Result<BloodRequest>> {
    const group = (input.bloodGroup || '').trim();
    if (!(BLOOD_GROUPS as readonly string[]).includes(group)) return { success: false, error: 'সঠিক রক্তের গ্রুপ নির্বাচন করুন।', code: 'invalid' };
    const units = Math.round(Number(input.units ?? 1));
    if (!Number.isFinite(units) || units < 1 || units > 20) return { success: false, error: 'রক্তের পরিমাণ ১ থেকে ২০ ব্যাগের মধ্যে হতে হবে।', code: 'invalid' };
    const upazila = (input.upazila || user.upazila || '').trim();
    if (!upazilaSlug(upazila)) return { success: false, error: 'সঠিক উপজেলা নির্বাচন করুন।', code: 'invalid' };
    const phone = (input.contactPhone || user.phone || '').trim();
    if (phoneKey(phone).length < 10) return { success: false, error: 'যোগাযোগের জন্য সঠিক মোবাইল নম্বর দিন।', code: 'invalid' };
    const neededBy = (input.neededBy || '').trim() || null;
    if (neededBy && (isNaN(Date.parse(neededBy)) || neededBy < today())) return { success: false, error: '"কবে প্রয়োজন" তারিখটি আজ বা তার পরের হতে হবে।', code: 'invalid' };
    const urgency: Urgency = input.urgency === 'critical' || input.urgency === 'normal' ? input.urgency : 'urgent';

    // anti-spam: a member can have at most 5 open requests at a time
    const mine = await this.forContributor(user);
    if (mine.requests.filter(r => r.fulfilment === 'open' && r.status !== 'rejected').length >= 5) {
      return { success: false, error: 'আপনার ৫টি অনুরোধ এখনো খোলা আছে। আগেরগুলো পূরণ বা বাতিল করে নতুন অনুরোধ দিন।', code: 'limit' };
    }

    const row = {
      requester_name: user.name,
      blood_group: group,
      units,
      hospital: (input.hospital || '').trim().slice(0, 160) || null,
      upazila,
      needed_by: neededBy,
      urgency,
      detail: (input.detail || '').trim().slice(0, 500) || null,
      contact_phone: phone,
      contributor_user_id: user.id,
    };

    if (useDb()) {
      const { data, error } = await supabaseWriter!.from('blood_requests').insert([row]).select().single();
      if (error) {
        console.warn('blood request insert failed:', error.message);
        return { success: false, error: 'অনুরোধটি জমা দেওয়া যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।' };
      }
      return { success: true, data: requestFromRow(data) };
    }

    const req: BloodRequest = {
      id: `req-${Date.now().toString(36)}`, requesterName: row.requester_name, bloodGroup: group, units,
      hospital: row.hospital, upazila, neededBy, urgency, detail: row.detail, contactPhone: phone,
      fulfilment: 'open', isApproved: false, status: 'pending', createdAt: new Date().toISOString(), contributorUserId: user.id,
    };
    loadMem().requests.unshift(req);
    persistMem();
    return { success: true, data: req };
  }

  /** Requester closes their own request (found a donor / no longer needed). */
  static async setFulfilment(user: CommunityUser, id: string, value: 'fulfilled' | 'cancelled'): Promise<Result<BloodRequest>> {
    if (useDb()) {
      const found = await supabaseWriter!.from('blood_requests').select('*').eq('id', id).maybeSingle();
      if (found.error || !found.data) return { success: false, error: 'অনুরোধটি খুঁজে পাওয়া যায়নি।', code: 'not_found' };
      if (found.data.contributor_user_id !== user.id) return { success: false, error: 'শুধু অনুরোধকারীই এটি বন্ধ করতে পারেন।', code: 'forbidden' };
      const { data, error } = await supabaseWriter!.from('blood_requests').update({ fulfilment: value }).eq('id', id).select().single();
      if (error) return { success: false, error: 'হালনাগাদ করা যায়নি।' };
      return { success: true, data: requestFromRow(data) };
    }
    const r = loadMem().requests.find(x => x.id === id);
    if (!r) return { success: false, error: 'অনুরোধটি খুঁজে পাওয়া যায়নি।', code: 'not_found' };
    if (r.contributorUserId !== user.id) return { success: false, error: 'শুধু অনুরোধকারীই এটি বন্ধ করতে পারেন।', code: 'forbidden' };
    r.fulfilment = value;
    persistMem();
    return { success: true, data: r };
  }

  /** A member's own donor listing and requests, in every moderation state (for the tracker). */
  static async forContributor(user: CommunityUser): Promise<{ donors: BloodDonor[]; requests: BloodRequest[] }> {
    if (useDb()) {
      const [d, r] = await Promise.all([
        supabaseWriter!.from('blood_donors').select('*').eq('contributor_user_id', user.id).order('created_at', { ascending: false }),
        supabaseWriter!.from('blood_requests').select('*').eq('contributor_user_id', user.id).order('created_at', { ascending: false }),
      ]);
      if (!d.error && !r.error) return { donors: (d.data || []).map(donorFromRow), requests: (r.data || []).map(requestFromRow) };
    }
    const m = loadMem();
    return { donors: m.donors.filter(x => x.contributorUserId === user.id), requests: m.requests.filter(x => x.contributorUserId === user.id) };
  }

  // ---------------- moderation (admin / service role) ----------------
  static async adminList(): Promise<{ donors: BloodDonor[]; requests: BloodRequest[] }> {
    const [donors, requests] = await Promise.all([
      this.listDonors({ includePending: true }),
      this.listRequests({ includePending: true, includeClosed: true }),
    ]);
    return { donors, requests };
  }

  /** Which table does this id belong to? null if it is not a blood record. */
  static async findKind(id: string): Promise<BloodKind | null> {
    if (!id) return null;
    if (useDb()) {
      const d = await supabaseWriter!.from('blood_donors').select('id').eq('id', id).maybeSingle();
      if (!d.error && d.data) return 'blood_donor';
      const r = await supabaseWriter!.from('blood_requests').select('id').eq('id', id).maybeSingle();
      if (!r.error && r.data) return 'blood_request';
      return null;
    }
    const m = loadMem();
    if (m.donors.some(x => x.id === id)) return 'blood_donor';
    if (m.requests.some(x => x.id === id)) return 'blood_request';
    return null;
  }

  private static table(kind: BloodKind) { return kind === 'blood_donor' ? 'blood_donors' : 'blood_requests'; }

  static async approve(id: string): Promise<boolean> {
    const kind = await this.findKind(id);
    if (!kind) return false;
    if (useDb()) {
      const { error } = await supabaseWriter!.from(this.table(kind)).update({ status: 'approved' }).eq('id', id);
      return !error;
    }
    const item: any = (kind === 'blood_donor' ? loadMem().donors : loadMem().requests).find(x => x.id === id);
    item.isApproved = true; item.status = 'approved'; item.rejectReason = null;
    persistMem();
    return true;
  }

  static async reject(id: string, reason?: string): Promise<boolean> {
    const kind = await this.findKind(id);
    if (!kind) return false;
    if (useDb()) {
      const { error } = await supabaseWriter!.from(this.table(kind)).update({ status: 'rejected', reject_reason: reason || null }).eq('id', id);
      return !error;
    }
    const item: any = (kind === 'blood_donor' ? loadMem().donors : loadMem().requests).find(x => x.id === id);
    item.isApproved = false; item.status = 'rejected'; item.rejectReason = reason || null;
    persistMem();
    return true;
  }

  static async remove(id: string): Promise<boolean> {
    const kind = await this.findKind(id);
    if (!kind) return false;
    if (useDb()) {
      const { error } = await supabaseWriter!.from(this.table(kind)).delete().eq('id', id);
      return !error;
    }
    const m = loadMem();
    if (kind === 'blood_donor') m.donors = m.donors.filter(x => x.id !== id);
    else m.requests = m.requests.filter(x => x.id !== id);
    persistMem();
    return true;
  }
}
