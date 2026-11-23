-- =====================================================================================
-- AMAR BOGURA — UUID PRIMARY KEYS EVERYWHERE                          2026-11-23
--
-- Every table gets  id uuid PRIMARY KEY DEFAULT gen_random_uuid().
--
--   * rows created at runtime      -> random UUID from the database
--   * seeded / existing rows       -> DETERMINISTIC UUIDv5 = f(table, old id) under a fixed
--                                     project namespace, so a database migrated from text ids and
--                                     a database built from the seed files get IDENTICAL ids
--   * old readable id              -> kept as `legacy_id` (unique) on imported tables;
--                                     tourist_spots keeps it as `slug` (used in URLs)
--   * foreign keys                 -> converted to uuid with the same mapping, then re-created
--
-- Apply after 20261123000100_split_blood_donors_requests.sql. Safe to re-run.
-- Deploy the matching app version together with this migration (spots are now addressed by slug).
-- =====================================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   -- uuid_generate_v5

-- Helper (session-local): add a constraint once, then validate it against existing rows.
CREATE OR REPLACE FUNCTION pg_temp.add_constraint(tbl text, cname text, def text)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = cname AND conrelid = tbl::regclass) THEN
    EXECUTE format('ALTER TABLE %s ADD CONSTRAINT %I %s NOT VALID', tbl, cname, def);
  END IF;
  EXECUTE format('ALTER TABLE %s VALIDATE CONSTRAINT %I', tbl, cname);
END $$;

-- ------------------------------------------------------------------------------------
-- 0. THE id MAPPING.  NEVER CHANGE THE NAMESPACE: seed files and migrations depend on it.
--    A value that already looks like a UUID is kept as is.
-- ------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.uuid_of(tbl text, legacy text)
RETURNS uuid LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT CASE
    WHEN legacy ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN legacy::uuid
    ELSE uuid_generate_v5('a3f7c1d2-5b8e-4c9a-9d41-7e2b6f0c8a15'::uuid, tbl || ':' || legacy)
  END
$$;

-- ------------------------------------------------------------------------------------
-- 1. tourist_spots: the old text id IS the public slug (/explore/<slug>)
-- ------------------------------------------------------------------------------------
ALTER TABLE public.tourist_spots ADD COLUMN IF NOT EXISTS slug text;
DO $$ BEGIN
  IF (SELECT data_type FROM information_schema.columns
      WHERE table_schema='public' AND table_name='tourist_spots' AND column_name='id') = 'text' THEN
    UPDATE public.tourist_spots SET slug = id WHERE slug IS NULL;
  END IF;
END $$;
ALTER TABLE public.tourist_spots ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS tourist_spots_slug_key ON public.tourist_spots (slug);

-- ------------------------------------------------------------------------------------
-- 2. Drop foreign keys that point at text ids (re-created in step 5)
-- ------------------------------------------------------------------------------------
ALTER TABLE public.spot_reviews   DROP CONSTRAINT IF EXISTS spot_reviews_spot_id_fkey;
ALTER TABLE public.community_posts DROP CONSTRAINT IF EXISTS community_posts_contributor_fkey;
ALTER TABLE public.tourist_spots  DROP CONSTRAINT IF EXISTS tourist_spots_contributor_fkey;
ALTER TABLE public.blood_donors   DROP CONSTRAINT IF EXISTS donor_user_fkey;
ALTER TABLE public.blood_requests DROP CONSTRAINT IF EXISTS blood_requests_contributor_user_id_fkey;

-- ------------------------------------------------------------------------------------
-- 3. Convert primary keys text -> uuid
-- ------------------------------------------------------------------------------------
DO $$
DECLARE
  t text;
  has_legacy boolean;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'healthcare_facilities','educational_institutes','hospitality_venues','transport_hubs','transport_services',
    'banks','atm_booths','blood_banks','blood_donors','blood_requests',
    'community_posts','community_users','spot_reviews','tourist_spots'
  ] LOOP
    IF (SELECT data_type FROM information_schema.columns
        WHERE table_schema='public' AND table_name=t AND column_name='id') = 'text' THEN

      -- keep the old readable id (tourist_spots keeps it as slug instead)
      IF t <> 'tourist_spots' THEN
        EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS legacy_id text', t);
        EXECUTE format($f$UPDATE public.%I SET legacy_id = id
                          WHERE legacy_id IS NULL
                            AND id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'$f$, t);
        EXECUTE format('CREATE UNIQUE INDEX IF NOT EXISTS %I ON public.%I (legacy_id) WHERE legacy_id IS NOT NULL',
                       t || '_legacy_id_key', t);
      END IF;

      EXECUTE format('ALTER TABLE public.%I ALTER COLUMN id DROP DEFAULT', t);
      EXECUTE format('ALTER TABLE public.%I ALTER COLUMN id TYPE uuid USING public.uuid_of(%L, id)', t, t);
      EXECUTE format('ALTER TABLE public.%I ALTER COLUMN id SET DEFAULT gen_random_uuid()', t);
    END IF;
  END LOOP;
END $$;

-- ------------------------------------------------------------------------------------
-- 4. Convert the columns that REFERENCE those ids (same mapping => values line up)
-- ------------------------------------------------------------------------------------
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT * FROM (VALUES
      ('spot_reviews',    'spot_id',             'tourist_spots'),
      ('community_posts', 'contributor_user_id', 'community_users'),
      ('tourist_spots',   'contributor_user_id', 'community_users'),
      ('blood_donors',    'contributor_user_id', 'community_users'),
      ('blood_requests',  'contributor_user_id', 'community_users')
    ) AS x(tbl, col, ref)
  LOOP
    IF (SELECT data_type FROM information_schema.columns
        WHERE table_schema='public' AND table_name=r.tbl AND column_name=r.col) = 'text' THEN
      EXECUTE format('ALTER TABLE public.%I ALTER COLUMN %I TYPE uuid USING public.uuid_of(%L, %I)',
                     r.tbl, r.col, r.ref, r.col);
    END IF;
  END LOOP;
END $$;

-- ------------------------------------------------------------------------------------
-- 5. Re-create the foreign keys (now uuid -> uuid)
-- ------------------------------------------------------------------------------------
SELECT pg_temp.add_constraint('public.spot_reviews', 'spot_reviews_spot_id_fkey',
  'FOREIGN KEY (spot_id) REFERENCES public.tourist_spots(id) ON DELETE CASCADE');
SELECT pg_temp.add_constraint('public.community_posts', 'community_posts_contributor_fkey',
  'FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL');
SELECT pg_temp.add_constraint('public.tourist_spots', 'tourist_spots_contributor_fkey',
  'FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL');
SELECT pg_temp.add_constraint('public.blood_donors', 'donor_user_fkey',
  'FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL');
SELECT pg_temp.add_constraint('public.blood_requests', 'blood_requests_contributor_user_id_fkey',
  'FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL');

-- ------------------------------------------------------------------------------------
-- 6. upazila_ref: uuid primary key; `slug` stays UNIQUE and remains the join key used by
--    the upazila_slug columns (so every table can be filtered by a stable, readable key)
-- ------------------------------------------------------------------------------------
DO $$
DECLARE t text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_schema='public' AND table_name='upazila_ref' AND column_name='id') THEN
    ALTER TABLE public.upazila_ref ADD COLUMN id uuid;
    UPDATE public.upazila_ref SET id = public.uuid_of('upazila_ref', slug);
    ALTER TABLE public.upazila_ref DROP CONSTRAINT upazila_ref_pkey CASCADE;     -- also drops the FKs that used it
    ALTER TABLE public.upazila_ref
      ALTER COLUMN id SET NOT NULL,
      ALTER COLUMN id SET DEFAULT gen_random_uuid(),
      ADD CONSTRAINT upazila_ref_pkey PRIMARY KEY (id),
      ADD CONSTRAINT upazila_ref_slug_key UNIQUE (slug);

    FOREACH t IN ARRAY ARRAY[
      'healthcare_facilities','educational_institutes','hospitality_venues','transport_hubs',
      'banks','atm_booths','blood_banks','blood_donors','tourist_spots','community_posts','community_users'
    ] LOOP
      PERFORM pg_temp.add_constraint('public.' || t, t || '_upazila_slug_fkey',
        'FOREIGN KEY (upazila_slug) REFERENCES public.upazila_ref(slug)');
    END LOOP;
    PERFORM pg_temp.add_constraint('public.blood_requests', 'req_upazila_fkey',
      'FOREIGN KEY (upazila_slug) REFERENCES public.upazila_ref(slug)');
  END IF;
END $$;

-- ------------------------------------------------------------------------------------
-- 7. Remaining tables: consistent default
-- ------------------------------------------------------------------------------------
ALTER TABLE public.upazilas ALTER COLUMN id SET DEFAULT gen_random_uuid();   -- was uuid_generate_v4()
-- hospitals already uses uuid + gen_random_uuid()

ANALYZE;
