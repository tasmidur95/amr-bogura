// Loads the sample editorial content that ships as JSON (community posts, explore spots and
// their reviews) into PostgreSQL, so the database is the complete source of truth.
// Idempotent: existing rows (same id) are left untouched, so local edits survive re-runs.
//
//   npm run db:seed-content          (also called by npm run db:setup)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = rel => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));

const statusOf = x => (x.status && ['pending', 'approved', 'rejected'].includes(x.status) ? x.status : x.isApproved ? 'approved' : 'pending');

export async function seedContent(db) {
  let posts = 0, spots = 0, reviews = 0, members = 0;

  // ---- members (login accounts) -> community_users. Password hashes are carried over as-is
  // (legacy hashes keep working and are upgraded to scrypt on the member's next login).
  const usersFile = path.join(root, 'amr-bogura-data/community/community-users.json');
  if (fs.existsSync(usersFile)) {
    for (const u of JSON.parse(fs.readFileSync(usersFile, 'utf8'))) {
      const r = await db.query(
        `INSERT INTO public.community_users
           (id, name, username, phone, upazila, blood_group, role, bio, is_verified, password_hash, created_at, last_login_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, COALESCE($11::timestamptz, now()), $12::timestamptz)
         ON CONFLICT DO NOTHING`,
        [u.id, u.name, u.username, u.phone, u.upazila, u.bloodGroup ?? null, u.role ?? 'নাগরিক সদস্য', u.bio ?? null,
         u.isVerified !== false, u.passwordHash, u.createdAt ?? null, u.lastLoginAt ?? null]
      );
      members += r.rowCount;
    }
  }

  // ---- community posts (tuition / rent / jobs / business).
  // Blood is NOT a community post: donors live in blood_donors (seed.sql) and requests in blood_requests.
  const all = Object.values(readJson('amr-bogura-data/community/community-posts.json')).flat().filter(p => p.category !== 'blood');
  for (const p of all) {
    const st = statusOf(p);
    const r = await db.query(
      `INSERT INTO public.community_posts
         (id, category, name, badge, upazila, detail, phone,
          is_approved, status, reject_reason, contributor_name, contributor_phone, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, COALESCE($13::timestamptz, now()))
       ON CONFLICT (id) DO NOTHING`,
      [p.id, p.category, p.name, p.badge ?? null, p.upazila, p.detail, p.phone,
       st === 'approved', st, p.rejectReason ?? null, p.contributorName ?? null, p.contributorPhone ?? null,
       p.created_at && !isNaN(Date.parse(p.created_at)) ? p.created_at : null]
    );
    posts += r.rowCount;
  }

  // ---- explore spots + reviews
  for (const s of readJson('amr-bogura-data/explore/explore-spots.json')) {
    const st = statusOf(s);
    const c = s.contributor || {};
    const r = await db.query(
      `INSERT INTO public.tourist_spots
         (id, title, en_title, category, category_bn, location, upazila, tag, cover_image, gallery,
          short_desc, history, architecture, how_to_reach, highlights, timings, entry_fee, best_time,
          map_coordinates, map_url, is_approved, status, contributor,
          contributor_name, contributor_phone, contributor_email, contributor_note)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11,$12,$13,$14,$15::jsonb,$16,$17,$18,$19,$20,$21,$22,$23::jsonb,$24,$25,$26,$27)
       ON CONFLICT (id) DO NOTHING`,
      [s.id, s.title, s.enTitle || s.title, s.category, s.categoryBn, s.location, s.upazila, s.tag || '', s.coverImage,
       JSON.stringify(s.gallery || []), s.shortDesc, s.history || s.shortDesc, s.architecture || '', s.howToReach || '',
       JSON.stringify(s.highlights || []), s.timings || '', s.entryFee || '', s.bestTime || '',
       s.mapCoordinates || null, s.mapUrl || null, st === 'approved', st, JSON.stringify(c),
       c.name ?? null, c.phone ?? null, c.email ?? null, c.note ?? null]
    );
    spots += r.rowCount;

    for (const rv of s.reviews || []) {
      const rr = await db.query(
        `INSERT INTO public.spot_reviews (id, spot_id, author, rating, comment, date, location)
         VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING`,
        [`${s.id}:${rv.id}`, s.id, rv.author, rv.rating, rv.comment, rv.date || '', rv.location ?? null]
      );
      reviews += rr.rowCount;
    }
  }
  return { members, posts, spots, reviews };
}

// Standalone run
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { default: pg } = await import('pg');
  const url = process.env.LOCAL_DATABASE_URL ||
    (fs.existsSync(path.join(root, '.env.local'))
      ? fs.readFileSync(path.join(root, '.env.local'), 'utf8').match(/^LOCAL_DATABASE_URL=(.*)$/m)?.[1]?.trim()
      : undefined);
  if (!url || !['localhost', '127.0.0.1', '[::1]'].includes(new URL(url).hostname)) {
    console.error('LOCAL_DATABASE_URL must be set and point at localhost.');
    process.exit(1);
  }
  const db = new pg.Client({ connectionString: url });
  await db.connect();
  console.log('seeded:', await seedContent(db));
  await db.end();
}
