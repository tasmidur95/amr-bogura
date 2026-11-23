// TypeScript mirror of the SQL function public.upazila_slug() (see supabase/migrations).
// Maps any spelling used in the data (Bangla / English / known variants / "A / B" composites)
// to the canonical upazila slug. Keep the two in sync.

const NORMALIZE = (s: string) =>
  s.split('/')[0].normalize('NFC').toLowerCase().replace(/[\s_.\-]+/g, '');

const MAP: Record<string, string> = {};
const add = (slug: string, ...names: string[]) => names.forEach(n => (MAP[NORMALIZE(n)] = slug));

add('bogura-sadar', 'বগুড়াসদর', 'bogurasadar', 'bogura(sadar)');
add('shibganj', 'শিবগঞ্জ', 'shibganj');
add('sherpur', 'শেরপুর', 'sherpur');
add('sonatala', 'সোনাতলা', 'sonatala', 'sonatola');
add('sariakandi', 'সারিয়াকান্দি', 'sariakandi');
add('gabtali', 'গাবতলী', 'gabtali');
add('dhunat', 'ধুনট', 'dhunat');
add('nandigram', 'নন্দীগ্রাম', 'nandigram');
add('kahaloo', 'কাহালু', 'kahalu', 'kahaloo');
add('dupchanchia', 'দুপচাঁচিয়া', 'দুপচাচিয়া', 'dupchanchia', 'dupchachia', 'dhupchanchia', 'dhupchachia');
add('adamdighi', 'আদমদীঘি', 'adamdighi');
add('shajahanpur', 'শাজাহানপুর', 'shajahanpur', 'shahjahanpur');

/** Canonical slug for an upazila name, or null if it is not one of the 12 upazilas of Bogura. */
export function upazilaSlug(name: string | null | undefined): string | null {
  if (!name) return null;
  return MAP[NORMALIZE(name)] ?? null;
}
