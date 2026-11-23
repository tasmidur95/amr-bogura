-- =====================================================================================
-- AMAR BOGURA — SCHEMA OPTIMISATION MIGRATION            2026-11-23
--
-- Apply AFTER supabase/schema.sql (and seed.sql if you use it). Safe to re-run.
-- Runs fine on an existing database: it only adds / renames / tightens, never drops data.
--
-- What it fixes
--   1. DRIFT   The app writes columns the old schema never had (community_posts.blood_group,
--              tourist_spots.how_to_reach, contributor_*, ...) and omits NOT NULL columns
--              (ids, review date) -> every Supabase write failed and silently fell back to
--              memory. Also creates the missing `hospitals` table.
--   2. KEYS    `upazila` was free text (English in one table, Bangla in the rest, even
--              "বগুড়া সদর / শাজাহানপুর"). Adds a canonical `upazila_ref` + a derived, indexed,
--              foreign-keyed `upazila_slug` on every table.
--   3. SPEED   No index existed beyond primary keys. Adds partial / composite / trigram /
--              unique indexes matching the app's real filters.
--   4. QUALITY CHECK constraints for enumerations and ranges; moderation state kept
--              consistent (is_approved <-> status); updated_at maintained automatically.
--   5. SECURITY Row Level Security was OFF: with the public anon key anyone could read,
--              edit or delete every table through the REST API. Now public = read-only
--              (published rows only); writes need the server-side service_role key.
--   6. AUTH    community_users table (replaces the tracked JSON file) + contributor links.
--
-- Behaviour change to be aware of: community_posts / tourist_spots now default to
-- UNPUBLISHED (is_approved = false, status = 'pending'). Rows must be approved to show up.
-- =====================================================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;   -- fast ILIKE / similarity search (Bangla + English names)
CREATE EXTENSION IF NOT EXISTS citext;    -- case-insensitive usernames

-- Helper: add a constraint once, then validate it against existing rows.
CREATE OR REPLACE FUNCTION pg_temp.add_constraint(tbl text, cname text, def text)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = cname AND conrelid = tbl::regclass
  ) THEN
    EXECUTE format('ALTER TABLE %s ADD CONSTRAINT %I %s NOT VALID', tbl, cname, def);
  END IF;
  EXECUTE format('ALTER TABLE %s VALIDATE CONSTRAINT %I', tbl, cname);
END $$;

-- =====================================================================================
-- 1. CANONICAL UPAZILA KEY
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.upazila_ref (
  slug       text PRIMARY KEY,
  name_bn    text NOT NULL UNIQUE,
  name_en    text NOT NULL UNIQUE,
  geo_index  smallint NOT NULL UNIQUE      -- index used by the app / GeoJSON (0..11)
);

INSERT INTO public.upazila_ref (slug, name_bn, name_en, geo_index) VALUES
  ('bogura-sadar', normalize('বগুড়া সদর',   NFC), 'Bogura Sadar',  0),
  ('shibganj',     normalize('শিবগঞ্জ',      NFC), 'Shibganj',      1),
  ('sherpur',      normalize('শেরপুর',       NFC), 'Sherpur',       2),
  ('sonatala',     normalize('সোনাতলা',      NFC), 'Sonatala',      3),
  ('sariakandi',   normalize('সারিয়াকান্দি', NFC), 'Sariakandi',    4),
  ('gabtali',      normalize('গাবতলী',       NFC), 'Gabtali',       5),
  ('dhunat',       normalize('ধুনট',         NFC), 'Dhunat',        6),
  ('nandigram',    normalize('নন্দীগ্রাম',    NFC), 'Nandigram',     7),
  ('kahaloo',      normalize('কাহালু',       NFC), 'Kahaloo',       8),
  ('dupchanchia',  normalize('দুপচাঁচিয়া',   NFC), 'Dupchanchia',   9),
  ('adamdighi',    normalize('আদমদীঘি',      NFC), 'Adamdighi',    10),
  ('shajahanpur',  normalize('শাজাহানপুর',    NFC), 'Shajahanpur',  11)
ON CONFLICT (slug) DO NOTHING;

-- Maps any spelling used in the data (Bangla / English / known variants / "A / B" composites)
-- to the canonical slug. IMMUTABLE so it can back an indexed GENERATED column.
-- A composite value takes its first part; unknown text maps to NULL (rejected by the CHECKs below).
CREATE OR REPLACE FUNCTION public.upazila_slug(txt text)
RETURNS text LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT CASE regexp_replace(lower(normalize(split_part(coalesce(txt, ''), '/', 1), NFC)), '[\s_.\-]+', '', 'g')
    WHEN normalize('বগুড়াসদর', NFC) THEN 'bogura-sadar'
    WHEN 'bogurasadar' THEN 'bogura-sadar'
    WHEN 'bogura(sadar)' THEN 'bogura-sadar'
    WHEN normalize('শিবগঞ্জ', NFC) THEN 'shibganj'
    WHEN 'shibganj' THEN 'shibganj'
    WHEN normalize('শেরপুর', NFC) THEN 'sherpur'
    WHEN 'sherpur' THEN 'sherpur'
    WHEN normalize('সোনাতলা', NFC) THEN 'sonatala'
    WHEN 'sonatala' THEN 'sonatala'
    WHEN 'sonatola' THEN 'sonatala'
    WHEN normalize('সারিয়াকান্দি', NFC) THEN 'sariakandi'
    WHEN 'sariakandi' THEN 'sariakandi'
    WHEN normalize('গাবতলী', NFC) THEN 'gabtali'
    WHEN 'gabtali' THEN 'gabtali'
    WHEN normalize('ধুনট', NFC) THEN 'dhunat'
    WHEN 'dhunat' THEN 'dhunat'
    WHEN normalize('নন্দীগ্রাম', NFC) THEN 'nandigram'
    WHEN 'nandigram' THEN 'nandigram'
    WHEN normalize('কাহালু', NFC) THEN 'kahaloo'
    WHEN 'kahalu' THEN 'kahaloo'
    WHEN 'kahaloo' THEN 'kahaloo'
    WHEN normalize('দুপচাঁচিয়া', NFC) THEN 'dupchanchia'
    WHEN normalize('দুপচাচিয়া', NFC) THEN 'dupchanchia'
    WHEN 'dupchanchia' THEN 'dupchanchia'
    WHEN 'dupchachia' THEN 'dupchanchia'
    WHEN 'dhupchanchia' THEN 'dupchanchia'
    WHEN 'dhupchachia' THEN 'dupchanchia'
    WHEN normalize('আদমদীঘি', NFC) THEN 'adamdighi'
    WHEN 'adamdighi' THEN 'adamdighi'
    WHEN normalize('শাজাহানপুর', NFC) THEN 'shajahanpur'
    WHEN 'shajahanpur' THEN 'shajahanpur'
    WHEN 'shahjahanpur' THEN 'shajahanpur'
  END
$$;

-- =====================================================================================
-- 2. FIX SCHEMA <-> CODE DRIFT
-- =====================================================================================

-- 2a. community_posts: the app (and the NestJS service) use blood_group / blood_role
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='community_posts' AND column_name='group') THEN
    ALTER TABLE public.community_posts RENAME COLUMN "group" TO blood_group;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='community_posts' AND column_name='role') THEN
    ALTER TABLE public.community_posts RENAME COLUMN role TO blood_role;
  END IF;
END $$;

ALTER TABLE public.community_posts
  ADD COLUMN IF NOT EXISTS reject_reason       text,
  ADD COLUMN IF NOT EXISTS reviewed_at         timestamptz,
  ADD COLUMN IF NOT EXISTS contributor_user_id text,
  ADD COLUMN IF NOT EXISTS updated_at          timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.community_posts
  ALTER COLUMN id          SET DEFAULT gen_random_uuid()::text,   -- inserts do not send an id
  ALTER COLUMN is_approved SET DEFAULT false,                    -- unpublished until moderated
  ALTER COLUMN status      SET DEFAULT 'pending';
UPDATE public.community_posts SET status = 'approved' WHERE status IS NULL AND is_approved;
UPDATE public.community_posts SET status = 'pending'  WHERE status IS NULL;
ALTER TABLE public.community_posts ALTER COLUMN status SET NOT NULL;

-- 2b. tourist_spots: columns the app writes but the schema lacked + a real moderation state
ALTER TABLE public.tourist_spots
  ADD COLUMN IF NOT EXISTS how_to_reach        text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS contributor_name    text,
  ADD COLUMN IF NOT EXISTS contributor_phone   text,
  ADD COLUMN IF NOT EXISTS contributor_email   text,
  ADD COLUMN IF NOT EXISTS contributor_note    text,
  ADD COLUMN IF NOT EXISTS status              text,
  ADD COLUMN IF NOT EXISTS reject_reason       text,
  ADD COLUMN IF NOT EXISTS reviewed_at         timestamptz,
  ADD COLUMN IF NOT EXISTS contributor_user_id text,
  ADD COLUMN IF NOT EXISTS updated_at          timestamptz NOT NULL DEFAULT now();
UPDATE public.tourist_spots SET status = CASE WHEN is_approved THEN 'approved' ELSE 'pending' END WHERE status IS NULL;
ALTER TABLE public.tourist_spots
  ALTER COLUMN status      SET DEFAULT 'pending',
  ALTER COLUMN status      SET NOT NULL,
  ALTER COLUMN is_approved SET DEFAULT false;

-- 2c. spot_reviews: inserts send neither id nor date
ALTER TABLE public.spot_reviews
  ALTER COLUMN id   SET DEFAULT gen_random_uuid()::text,
  ALTER COLUMN date SET DEFAULT to_char(now() AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD');

-- 2d. hospitals: written by DistrictService.addHospital but never defined
CREATE TABLE IF NOT EXISTS public.hospitals (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  en_name     text NOT NULL,
  type        text NOT NULL,
  type_label  text NOT NULL,
  address     text NOT NULL,
  phone       text NOT NULL,
  emergency   text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- =====================================================================================
-- 3. MEMBERS (moves login off the tracked JSON file)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.community_users (
  id            text PRIMARY KEY DEFAULT ('usr-' || replace(gen_random_uuid()::text, '-', '')),
  name          text NOT NULL,
  username      citext NOT NULL UNIQUE,
  phone         text NOT NULL,
  phone_digits  text GENERATED ALWAYS AS (regexp_replace(phone, '\D', '', 'g')) STORED,
  upazila       text NOT NULL,
  blood_group   text,
  role          text NOT NULL DEFAULT 'নাগরিক সদস্য',
  bio           text,
  is_verified   boolean NOT NULL DEFAULT true,
  password_hash text NOT NULL,                       -- scrypt$<salt>$<hash>, never exposed to clients
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- =====================================================================================
-- 4. DERIVED upazila_slug (+ FK) ON EVERY TABLE THAT HAS A free-text upazila
-- =====================================================================================
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'healthcare_facilities','educational_institutes','hospitality_venues','transport_hubs',
    'banks','atm_booths','blood_banks','blood_donors','tourist_spots','community_posts','community_users'
  ] LOOP
    EXECUTE format(
      'ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS upazila_slug text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED',
      t);
    PERFORM pg_temp.add_constraint('public.' || t, t || '_upazila_slug_fkey',
      'FOREIGN KEY (upazila_slug) REFERENCES public.upazila_ref(slug)');
    -- every row must resolve to a real upazila (blocks typos / unknown values)
    PERFORM pg_temp.add_constraint('public.' || t, t || '_upazila_known',
      'CHECK (upazila_slug IS NOT NULL)');
  END LOOP;
END $$;

-- Contributor links (SET NULL: deleting a member must not delete published content)
SELECT pg_temp.add_constraint('public.community_posts', 'community_posts_contributor_fkey',
  'FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL');
SELECT pg_temp.add_constraint('public.tourist_spots', 'tourist_spots_contributor_fkey',
  'FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL');

-- =====================================================================================
-- 5. DATA-QUALITY CONSTRAINTS
-- =====================================================================================
-- healthcare
SELECT pg_temp.add_constraint('public.healthcare_facilities', 'hc_ownership_chk',
  $$CHECK (ownership IN ('government','private','ngo'))$$);
SELECT pg_temp.add_constraint('public.healthcare_facilities', 'hc_verification_chk',
  $$CHECK (verification_status IN ('verified','partially_verified','unverified'))$$);
SELECT pg_temp.add_constraint('public.healthcare_facilities', 'hc_latlng_chk',     -- Bangladesh bounding box
  'CHECK (latitude BETWEEN 20.5 AND 26.7 AND longitude BETWEEN 88.0 AND 92.8)');
-- blood
SELECT pg_temp.add_constraint('public.blood_donors', 'donor_group_chk',
  $$CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-'))$$);
SELECT pg_temp.add_constraint('public.blood_donors', 'donor_total_chk', 'CHECK (total_donations >= 0)');
-- moderation
SELECT pg_temp.add_constraint('public.community_posts', 'cp_status_chk',
  $$CHECK (status IN ('pending','approved','rejected'))$$);
SELECT pg_temp.add_constraint('public.community_posts', 'cp_category_chk',
  $$CHECK (category IN ('blood','tuition','rent','jobs','business'))$$);
SELECT pg_temp.add_constraint('public.community_posts', 'cp_blood_group_chk',
  $$CHECK (blood_group IS NULL OR blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-'))$$);
SELECT pg_temp.add_constraint('public.tourist_spots', 'ts_status_chk',
  $$CHECK (status IN ('pending','approved','rejected'))$$);
SELECT pg_temp.add_constraint('public.hospitals', 'hospitals_type_chk',
  $$CHECK (type IN ('govt','private','diagnostic'))$$);
SELECT pg_temp.add_constraint('public.community_users', 'cu_blood_group_chk',
  $$CHECK (blood_group IS NULL OR blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-'))$$);

-- Natural keys that are verified unique in the data (EIIN is NOT: the source has real duplicates)
CREATE UNIQUE INDEX IF NOT EXISTS healthcare_facilities_slug_key        ON public.healthcare_facilities (slug);
CREATE UNIQUE INDEX IF NOT EXISTS healthcare_facilities_dghs_id_key     ON public.healthcare_facilities (dghs_facility_id);
CREATE UNIQUE INDEX IF NOT EXISTS community_users_phone_digits_key      ON public.community_users (phone_digits);

-- =====================================================================================
-- 6. MODERATION: one source of truth, no divergence between is_approved and status
--    App writes is_approved (legacy); new code may write status. Either works; both stay equal.
-- =====================================================================================
CREATE OR REPLACE FUNCTION public.sync_moderation_state()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status = 'rejected' THEN
      NEW.is_approved := false;
    ELSIF NEW.is_approved OR NEW.status = 'approved' THEN
      NEW.is_approved := true;  NEW.status := 'approved';
    ELSE
      NEW.is_approved := false; NEW.status := 'pending';
    END IF;
  ELSE
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      NEW.is_approved := (NEW.status = 'approved');
    ELSIF NEW.is_approved IS DISTINCT FROM OLD.is_approved THEN
      NEW.status := CASE WHEN NEW.is_approved THEN 'approved'
                         WHEN OLD.status = 'rejected' THEN 'rejected' ELSE 'pending' END;
    END IF;
  END IF;
  IF NEW.status IS DISTINCT FROM 'rejected' THEN NEW.reject_reason := NULL; END IF;
  IF TG_OP = 'INSERT' OR NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.reviewed_at := CASE WHEN NEW.status = 'pending' THEN NULL ELSE now() END;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_sync_moderation ON public.community_posts;
CREATE TRIGGER trg_sync_moderation BEFORE INSERT OR UPDATE ON public.community_posts
  FOR EACH ROW EXECUTE FUNCTION public.sync_moderation_state();
DROP TRIGGER IF EXISTS trg_sync_moderation ON public.tourist_spots;
CREATE TRIGGER trg_sync_moderation BEFORE INSERT OR UPDATE ON public.tourist_spots
  FOR EACH ROW EXECUTE FUNCTION public.sync_moderation_state();

-- updated_at maintained by the database
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END $$;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['community_posts','tourist_spots','hospitals','community_users'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_set_updated_at ON public.%I', t);
    EXECUTE format('CREATE TRIGGER trg_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()', t);
  END LOOP;
END $$;

-- =====================================================================================
-- 7. INDEXES (match the app's real filters; partial indexes keep them small)
-- =====================================================================================
-- healthcare directory: filter by upazila + category, search by name
CREATE INDEX IF NOT EXISTS hc_upazila_category_idx  ON public.healthcare_facilities (upazila_slug, category);
CREATE INDEX IF NOT EXISTS hc_ownership_idx         ON public.healthcare_facilities (ownership);
CREATE INDEX IF NOT EXISTS hc_name_bn_trgm_idx      ON public.healthcare_facilities USING gin (name_bn gin_trgm_ops);
CREATE INDEX IF NOT EXISTS hc_name_trgm_idx         ON public.healthcare_facilities USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS hc_phone_gin_idx         ON public.healthcare_facilities USING gin (phone jsonb_path_ops);
CREATE INDEX IF NOT EXISTS hc_latlng_idx            ON public.healthcare_facilities (latitude, longitude);

-- education
CREATE INDEX IF NOT EXISTS edu_upazila_category_idx ON public.educational_institutes (upazila_slug, category) WHERE is_approved;
CREATE INDEX IF NOT EXISTS edu_name_bn_trgm_idx     ON public.educational_institutes USING gin (name_bn gin_trgm_ops);
CREATE INDEX IF NOT EXISTS edu_eiin_idx             ON public.educational_institutes (eiin) WHERE eiin IS NOT NULL AND eiin <> '';

-- other directories
CREATE INDEX IF NOT EXISTS hospitality_upazila_idx ON public.hospitality_venues (upazila_slug, category);
CREATE INDEX IF NOT EXISTS transport_hubs_idx      ON public.transport_hubs (upazila_slug, category);
CREATE INDEX IF NOT EXISTS banks_upazila_idx       ON public.banks (upazila_slug);
CREATE INDEX IF NOT EXISTS banks_routing_idx       ON public.banks (routing_number) WHERE routing_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS atm_upazila_idx         ON public.atm_booths (upazila_slug);
CREATE INDEX IF NOT EXISTS blood_banks_upazila_idx ON public.blood_banks (upazila_slug);

-- blood donor search = group + upazila (most urgent query in the product)
CREATE INDEX IF NOT EXISTS donors_group_upazila_idx ON public.blood_donors (blood_group, upazila_slug) WHERE is_verified;
CREATE INDEX IF NOT EXISTS donors_phone_idx         ON public.blood_donors (phone);

-- published content (what the public API reads) ...
CREATE INDEX IF NOT EXISTS spots_published_idx  ON public.tourist_spots (category, created_at DESC) WHERE is_approved;
CREATE INDEX IF NOT EXISTS spots_upazila_idx    ON public.tourist_spots (upazila_slug) WHERE is_approved;
CREATE INDEX IF NOT EXISTS posts_feed_idx       ON public.community_posts (category, upazila_slug, created_at DESC) WHERE is_approved;
CREATE INDEX IF NOT EXISTS posts_blood_idx      ON public.community_posts (blood_group, upazila_slug) WHERE is_approved AND category = 'blood';
-- ... moderation queues (tiny: only pending rows) ...
CREATE INDEX IF NOT EXISTS spots_pending_idx    ON public.tourist_spots (created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS posts_pending_idx    ON public.community_posts (created_at) WHERE status = 'pending';
-- ... contributor "my submissions" and unindexed foreign keys
CREATE INDEX IF NOT EXISTS spots_contributor_idx ON public.tourist_spots (contributor_user_id) WHERE contributor_user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS posts_contributor_idx ON public.community_posts (contributor_user_id) WHERE contributor_user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS reviews_spot_idx      ON public.spot_reviews (spot_id, created_at DESC);   -- FK was unindexed

-- =====================================================================================
-- 8. SECURITY: ROW LEVEL SECURITY + PRIVILEGES
--    Public (anon key) = read published rows only. All writes go through the server
--    with the service_role key, which bypasses RLS. community_users is not readable at all.
-- =====================================================================================
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'upazila_ref','upazilas','healthcare_facilities','educational_institutes','hospitality_venues',
    'transport_hubs','transport_services','banks','atm_booths','blood_banks','blood_donors',
    'hospitals','spot_reviews','tourist_spots','community_posts','community_users'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;

  -- reference / directory data: public read
  FOREACH t IN ARRAY ARRAY[
    'upazila_ref','upazilas','healthcare_facilities','educational_institutes','hospitality_venues',
    'transport_hubs','transport_services','banks','atm_booths','blood_banks','hospitals','spot_reviews'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS public_read ON public.%I', t);
    EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT USING (true)', t);
  END LOOP;
END $$;

-- donors: verified only
DROP POLICY IF EXISTS public_read ON public.blood_donors;
CREATE POLICY public_read ON public.blood_donors FOR SELECT USING (is_verified);
-- user-generated content: only published rows are visible
DROP POLICY IF EXISTS public_read ON public.tourist_spots;
CREATE POLICY public_read ON public.tourist_spots FOR SELECT USING (is_approved);
DROP POLICY IF EXISTS public_read ON public.community_posts;
CREATE POLICY public_read ON public.community_posts FOR SELECT USING (is_approved);
-- community_users: RLS on + no policy = invisible to anon/authenticated

-- Defence in depth: even if a policy were added by mistake, the public roles cannot write.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM anon;
    REVOKE ALL ON public.community_users FROM anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM authenticated;
    REVOKE ALL ON public.community_users FROM authenticated;
  END IF;
END $$;

ANALYZE;
