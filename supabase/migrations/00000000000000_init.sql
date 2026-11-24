-- =====================================================================================
-- AMAR BOGURA v2 — CONSOLIDATED SCHEMA (Fresh Database)
-- Generated: 2026-11-23
--
-- This is the FINAL schema that merges:
--   • supabase/schema.sql (original baseline)
--   • 20261123000000_optimize_schema.sql (drift fixes, indexes, RLS, community_users)
--   • 20261123000100_split_blood_donors_requests.sql (blood_requests table)
--   • 20261123000200_uuid_primary_keys.sql (uuid PKs everywhere)
--
-- Apply to a CLEAN database:  amr-bogura-v2
-- Then run seed files:  supabase/seed/01..06_*.sql
-- =====================================================================================

-- TEXT COLUMN CONVENTION: the plain column holds Bangla (default language), the `_en` suffix holds English.
--   e.g. name = "বগুড়া সদর", name_en = "Bogura Sadar". Codes (category, ownership, status ...) are language-neutral.
--   `_en` columns are OPTIONAL (nullable): the UI falls back to the Bangla value when it is empty.
--   A `_label` column is the Bangla display label of a code (category_label); the UI maps code -> label per locale.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS citext;

-- =====================================================================================
-- DETERMINISTIC UUID MAPPING
-- Seed files use uuid_of(table, legacy_id) so IDs are identical across environments.
-- NEVER change the namespace UUID.
-- =====================================================================================
CREATE OR REPLACE FUNCTION public.uuid_of(tbl text, legacy text)
RETURNS uuid LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT CASE
    WHEN legacy ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN legacy::uuid
    ELSE uuid_generate_v5('a3f7c1d2-5b8e-4c9a-9d41-7e2b6f0c8a15'::uuid, tbl || ':' || legacy)
  END
$$;

-- =====================================================================================
-- CANONICAL UPAZILA REFERENCE
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.upazila_ref (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       text NOT NULL UNIQUE,
  name    text NOT NULL UNIQUE,
  name_en    text UNIQUE,
  geo_index  smallint NOT NULL UNIQUE
);

INSERT INTO public.upazila_ref (id, slug, name, name_en, geo_index) VALUES
  (public.uuid_of('upazila_ref', 'bogura-sadar'), 'bogura-sadar', 'বগুড়া সদর',      'Bogura Sadar',  0),
  (public.uuid_of('upazila_ref', 'shibganj'),     'shibganj',     'শিবগঞ্জ',         'Shibganj',      1),
  (public.uuid_of('upazila_ref', 'sherpur'),       'sherpur',      'শেরপুর',          'Sherpur',       2),
  (public.uuid_of('upazila_ref', 'sonatala'),      'sonatala',     'সোনাতলা',         'Sonatala',      3),
  (public.uuid_of('upazila_ref', 'sariakandi'),    'sariakandi',   'সারিয়াকান্দি',    'Sariakandi',    4),
  (public.uuid_of('upazila_ref', 'gabtali'),       'gabtali',      'গাবতলী',          'Gabtali',       5),
  (public.uuid_of('upazila_ref', 'dhunat'),        'dhunat',       'ধুনট',            'Dhunat',        6),
  (public.uuid_of('upazila_ref', 'nandigram'),     'nandigram',    'নন্দীগ্রাম',       'Nandigram',     7),
  (public.uuid_of('upazila_ref', 'kahaloo'),       'kahaloo',      'কাহালু',          'Kahaloo',       8),
  (public.uuid_of('upazila_ref', 'dupchanchia'),   'dupchanchia',  'দুপচাঁচিয়া',      'Dupchanchia',   9),
  (public.uuid_of('upazila_ref', 'adamdighi'),     'adamdighi',    'আদমদীঘি',         'Adamdighi',    10),
  (public.uuid_of('upazila_ref', 'shajahanpur'),   'shajahanpur',  'শাজাহানপুর',       'Shajahanpur',  11)
ON CONFLICT (slug) DO NOTHING;

-- Upazila slug resolver: maps any known Bangla/English spelling → canonical slug
CREATE OR REPLACE FUNCTION public.upazila_slug(txt text)
RETURNS text LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT CASE regexp_replace(lower(normalize(split_part(coalesce(txt, ''), '/', 1), NFC)), '[\s_.\-]+', '', 'g')
    WHEN 'বগুড়াসদর'       THEN 'bogura-sadar'
    WHEN 'bogurasadar'     THEN 'bogura-sadar'
    WHEN 'bogura(sadar)'   THEN 'bogura-sadar'
    WHEN 'শিবগঞ্জ'          THEN 'shibganj'
    WHEN 'shibganj'        THEN 'shibganj'
    WHEN 'শেরপুর'           THEN 'sherpur'
    WHEN 'sherpur'         THEN 'sherpur'
    WHEN 'সোনাতলা'          THEN 'sonatala'
    WHEN 'sonatala'        THEN 'sonatala'
    WHEN 'sonatola'        THEN 'sonatala'
    WHEN 'সারিয়াকান্দি'     THEN 'sariakandi'
    WHEN 'sariakandi'      THEN 'sariakandi'
    WHEN 'গাবতলী'           THEN 'gabtali'
    WHEN 'gabtali'         THEN 'gabtali'
    WHEN 'ধুনট'             THEN 'dhunat'
    WHEN 'dhunat'          THEN 'dhunat'
    WHEN 'নন্দীগ্রাম'        THEN 'nandigram'
    WHEN 'nandigram'       THEN 'nandigram'
    WHEN 'কাহালু'           THEN 'kahaloo'
    WHEN 'kahalu'          THEN 'kahaloo'
    WHEN 'kahaloo'         THEN 'kahaloo'
    WHEN 'দুপচাঁচিয়া'       THEN 'dupchanchia'
    WHEN 'দুপচাচিয়া'        THEN 'dupchanchia'
    WHEN 'dupchanchia'     THEN 'dupchanchia'
    WHEN 'dupchachia'      THEN 'dupchanchia'
    WHEN 'dhupchanchia'    THEN 'dupchanchia'
    WHEN 'dhupchachia'     THEN 'dupchanchia'
    WHEN 'আদমদীঘি'          THEN 'adamdighi'
    WHEN 'adamdighi'       THEN 'adamdighi'
    WHEN 'শাজাহানপুর'       THEN 'shajahanpur'
    WHEN 'shajahanpur'     THEN 'shajahanpur'
    WHEN 'shahjahanpur'    THEN 'shajahanpur'
  END
$$;

-- =====================================================================================
-- 1. UPAZILAS (admin directory, separate from upazila_ref)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.upazilas (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial        text NOT NULL,
  serial_en        text,
  name             text NOT NULL,
  name_en          text,
  area             text NOT NULL,
  area_en          text,
  union_count      text NOT NULL,
  union_count_en   text,
  unions           text,
  pourashava       text,
  pourashava_en    text,
  has_pourashava   boolean DEFAULT false,
  postal_code      text,
  rivers           text,
  health_phone     text,
  landmark         text,
  description      text,
  description_en   text,
  history_note     text,
  union_list       jsonb DEFAULT '[]'::jsonb,
  tags             jsonb DEFAULT '[]'::jsonb,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- =====================================================================================
-- 2. HEALTHCARE FACILITIES (DGHS — 352 records)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.healthcare_facilities (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id              text,
  dghs_facility_id      text NOT NULL,
  name_en                   text,
  name                text NOT NULL,
  slug                   text NOT NULL,
  category               text NOT NULL,
  facility_type          text NOT NULL,
  original_facility_type text NOT NULL,
  ownership              text NOT NULL,
  district_en               text,
  district            text NOT NULL,
  upazila_en                text,
  upazila             text NOT NULL,
  upazila_slug           text GENERATED ALWAYS AS (public.upazila_slug(coalesce(upazila_en, upazila))) STORED
                           REFERENCES public.upazila_ref(slug),
  union_name_en             text,
  union_name               text,
  village_or_area        text,
  address                text NOT NULL,
  phone                  jsonb NOT NULL DEFAULT '[]'::jsonb,
  email                  text,
  website                text,
  latitude               double precision NOT NULL,
  longitude              double precision NOT NULL,
  google_maps_url        text NOT NULL,
  image_url              text,
  services               jsonb NOT NULL DEFAULT '[]'::jsonb,
  source_urls            jsonb NOT NULL DEFAULT '[]'::jsonb,
  verification_status    text NOT NULL DEFAULT 'verified',
  last_verified          date NOT NULL DEFAULT CURRENT_DATE,
  created_at             timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT hc_ownership_chk CHECK (ownership IN ('government','private','ngo')),
  CONSTRAINT hc_verification_chk CHECK (verification_status IN ('verified','partially_verified','unverified')),
  CONSTRAINT hc_latlng_chk CHECK (latitude BETWEEN 20.5 AND 26.7 AND longitude BETWEEN 88.0 AND 92.8),
  CONSTRAINT hc_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS healthcare_facilities_slug_key ON public.healthcare_facilities (slug);
CREATE UNIQUE INDEX IF NOT EXISTS healthcare_facilities_dghs_id_key ON public.healthcare_facilities (dghs_facility_id);
CREATE UNIQUE INDEX IF NOT EXISTS healthcare_facilities_legacy_id_key ON public.healthcare_facilities (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 3. EDUCATIONAL INSTITUTES (913 records)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.educational_institutes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id        text,
  name_en             text,
  name          text NOT NULL,
  category         text NOT NULL,
  category_label      text NOT NULL,
  upazila_en          text,
  upazila       text NOT NULL,
  upazila_slug     text GENERATED ALWAYS AS (public.upazila_slug(coalesce(upazila_en, upazila))) STORED
                     REFERENCES public.upazila_ref(slug),
  eiin             text,
  established      text,
  location         text NOT NULL,
  phone            text,
  phone_numbers    jsonb DEFAULT '[]'::jsonb,
  email            text,
  website          text,
  cover_image      text,
  is_approved      boolean DEFAULT true,
  created_at       timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT edu_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS educational_institutes_legacy_id_key ON public.educational_institutes (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 4. TOURIST SPOTS
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.tourist_spots (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                 text NOT NULL UNIQUE,
  legacy_id            text,
  title                text NOT NULL,
  title_en             text,
  category             text NOT NULL,
  category_label          text NOT NULL,
  location             text NOT NULL,
  upazila              text NOT NULL,
  upazila_slug         text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                         REFERENCES public.upazila_ref(slug),
  tag                  text NOT NULL,
  cover_image          text NOT NULL,
  gallery              jsonb DEFAULT '[]'::jsonb,
  short_desc           text NOT NULL,
  history              text NOT NULL,
  architecture         text NOT NULL,
  highlights           jsonb DEFAULT '[]'::jsonb,
  timings              text NOT NULL,
  entry_fee            text NOT NULL,
  best_time            text NOT NULL,
  how_to_reach         text NOT NULL DEFAULT '',
  map_coordinates      text,
  map_url              text,
  is_approved          boolean NOT NULL DEFAULT false,
  status               text NOT NULL DEFAULT 'pending',
  reject_reason        text,
  reviewed_at          timestamptz,
  contributor          jsonb DEFAULT '{}'::jsonb,
  contributor_name     text,
  contributor_phone    text,
  contributor_email    text,
  contributor_note     text,
  contributor_user_id  uuid,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT ts_status_chk CHECK (status IN ('pending','approved','rejected')),
  CONSTRAINT ts_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS tourist_spots_legacy_id_key ON public.tourist_spots (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 5. SPOT REVIEWS
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.spot_reviews (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id   text,
  spot_id     uuid REFERENCES public.tourist_spots(id) ON DELETE CASCADE,
  author      text NOT NULL,
  rating      integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     text NOT NULL,
  date        text NOT NULL DEFAULT to_char(now() AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD'),
  location    text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS spot_reviews_legacy_id_key ON public.spot_reviews (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 6. COMMUNITY USERS (auth — replaces JSON file)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.community_users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id     text,
  name          text NOT NULL,
  username      citext NOT NULL UNIQUE,
  phone         text NOT NULL,
  phone_digits  text GENERATED ALWAYS AS (regexp_replace(phone, '\D', '', 'g')) STORED,
  upazila       text NOT NULL,
  upazila_slug  text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                  REFERENCES public.upazila_ref(slug),
  blood_group   text,
  role          text NOT NULL DEFAULT 'নাগরিক সদস্য',
  bio           text,
  is_verified   boolean NOT NULL DEFAULT true,
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz,
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT cu_blood_group_chk CHECK (blood_group IS NULL OR blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  CONSTRAINT cu_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS community_users_phone_digits_key ON public.community_users (phone_digits);
CREATE UNIQUE INDEX IF NOT EXISTS community_users_legacy_id_key ON public.community_users (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 7. COMMUNITY POSTS (tuition, rent, jobs, business — NO blood)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.community_posts (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id            text,
  category             text NOT NULL,
  name                 text NOT NULL,
  badge                text,
  upazila              text NOT NULL,
  upazila_slug         text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                         REFERENCES public.upazila_ref(slug),
  detail               text NOT NULL,
  phone                text NOT NULL,
  is_approved          boolean NOT NULL DEFAULT false,
  status               text NOT NULL DEFAULT 'pending',
  reject_reason        text,
  reviewed_at          timestamptz,
  contributor_name     text,
  contributor_phone    text,
  contributor_user_id  uuid,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT cp_category_chk CHECK (category IN ('tuition','rent','jobs','business')),
  CONSTRAINT cp_status_chk CHECK (status IN ('pending','approved','rejected')),
  CONSTRAINT cp_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS community_posts_legacy_id_key ON public.community_posts (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 8. HOSPITALITY VENUES
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.hospitality_venues (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id      text,
  name           text NOT NULL,
  category       text NOT NULL,
  location       text NOT NULL,
  upazila        text DEFAULT 'বগুড়া সদর',
  upazila_slug   text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                   REFERENCES public.upazila_ref(slug),
  url            text,
  facilities     jsonb DEFAULT '[]'::jsonb,
  phone_number   text,
  phone_numbers  jsonb DEFAULT '[]'::jsonb,
  banner_image   text,
  created_at     timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT hv_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS hospitality_venues_legacy_id_key ON public.hospitality_venues (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 9. TRANSPORT HUBS & SERVICES
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.transport_hubs (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id        text,
  name_en             text,
  name          text NOT NULL,
  category         text NOT NULL,
  category_label      text NOT NULL,
  location         text NOT NULL,
  upazila          text NOT NULL,
  upazila_slug     text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                     REFERENCES public.upazila_ref(slug),
  description      text,
  connected_routes jsonb DEFAULT '[]'::jsonb,
  facilities       jsonb DEFAULT '[]'::jsonb,
  operating_hours  text,
  phone_number     text,
  phone_numbers    jsonb DEFAULT '[]'::jsonb,
  banner_image     text,
  created_at       timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT th_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS transport_hubs_legacy_id_key ON public.transport_hubs (legacy_id) WHERE legacy_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.transport_services (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id          text,
  operator_name_en      text,
  operator_name   text NOT NULL,
  service_type_en       text,
  service_type    text NOT NULL,
  headquarters       text,
  online_booking_url text,
  description        text,
  facilities         jsonb DEFAULT '[]'::jsonb,
  major_routes       jsonb DEFAULT '[]'::jsonb,
  counters           jsonb DEFAULT '[]'::jsonb,
  phone_number       text,
  phone_numbers      jsonb DEFAULT '[]'::jsonb,
  banner_image       text,
  created_at         timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS transport_services_legacy_id_key ON public.transport_services (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 10. BANKS & ATM BOOTHS
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.banks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id       text,
  bank_name_en       text,
  bank_name    text NOT NULL,
  type_en            text,
  type         text NOT NULL,
  branch_name_en     text,
  branch_name  text NOT NULL,
  location        text NOT NULL,
  upazila         text NOT NULL,
  upazila_slug    text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                    REFERENCES public.upazila_ref(slug),
  routing_number  text,
  swift_code      text,
  facilities      jsonb DEFAULT '[]'::jsonb,
  has_atm         boolean DEFAULT true,
  has_crm         boolean DEFAULT false,
  operating_hours text,
  hotline         text,
  phone_number    text,
  phone_numbers   jsonb DEFAULT '[]'::jsonb,
  banner_image    text,
  created_at      timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT banks_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS banks_legacy_id_key ON public.banks (legacy_id) WHERE legacy_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.atm_booths (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id       text,
  booth_name      text NOT NULL,
  bank_name       text NOT NULL,
  location        text NOT NULL,
  upazila         text NOT NULL,
  upazila_slug    text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                    REFERENCES public.upazila_ref(slug),
  cards_accepted  jsonb DEFAULT '[]'::jsonb,
  services        jsonb DEFAULT '[]'::jsonb,
  operating_hours text DEFAULT '24/7',
  hotline         text,
  banner_image    text,
  created_at      timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT atm_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS atm_booths_legacy_id_key ON public.atm_booths (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 11. BLOOD BANKS
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.blood_banks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id       text,
  name_en            text,
  name         text NOT NULL,
  location        text NOT NULL,
  upazila         text NOT NULL,
  upazila_slug    text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                    REFERENCES public.upazila_ref(slug),
  operating_hours text,
  services        jsonb DEFAULT '[]'::jsonb,
  hotlines        jsonb DEFAULT '[]'::jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT bb_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS blood_banks_legacy_id_key ON public.blood_banks (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 12. BLOOD DONORS (registry — one per person)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.blood_donors (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id            text,
  name                 text NOT NULL,
  blood_group          text NOT NULL,
  phone                text NOT NULL,
  alt_phone            text,
  phone_key            text GENERATED ALWAYS AS (right(regexp_replace(phone, '\D', '', 'g'), 10)) STORED,
  upazila              text NOT NULL,
  upazila_slug         text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                         REFERENCES public.upazila_ref(slug),
  location             text NOT NULL,
  availability         text NOT NULL DEFAULT 'প্রস্তুত',
  last_donated         text,
  total_donations      integer DEFAULT 1,
  badge                text,
  is_verified          boolean NOT NULL DEFAULT false,
  is_approved          boolean NOT NULL DEFAULT false,
  status               text NOT NULL DEFAULT 'pending',
  reject_reason        text,
  reviewed_at          timestamptz,
  contributor_user_id  uuid,
  source_post_id       text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT donor_group_chk CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  CONSTRAINT donor_total_chk CHECK (total_donations >= 0),
  CONSTRAINT donor_status_chk CHECK (status IN ('pending','approved','rejected')),
  CONSTRAINT donor_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS blood_donors_phone_key_uidx ON public.blood_donors (phone_key);
CREATE UNIQUE INDEX IF NOT EXISTS blood_donors_user_uidx ON public.blood_donors (contributor_user_id) WHERE contributor_user_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS blood_donors_source_uidx ON public.blood_donors (source_post_id) WHERE source_post_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS blood_donors_legacy_id_key ON public.blood_donors (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 13. BLOOD REQUESTS (time-limited "someone needs blood")
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.blood_requests (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id            text,
  requester_name       text NOT NULL,
  blood_group          text NOT NULL,
  units                smallint NOT NULL DEFAULT 1,
  hospital             text,
  upazila              text NOT NULL,
  upazila_slug         text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED
                         REFERENCES public.upazila_ref(slug),
  needed_by            date,
  urgency              text NOT NULL DEFAULT 'urgent',
  detail               text,
  contact_phone        text NOT NULL,
  fulfilment           text NOT NULL DEFAULT 'open',
  is_approved          boolean NOT NULL DEFAULT false,
  status               text NOT NULL DEFAULT 'pending',
  reject_reason        text,
  reviewed_at          timestamptz,
  contributor_user_id  uuid REFERENCES public.community_users(id) ON DELETE SET NULL,
  source_post_id       text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT req_group_chk CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  CONSTRAINT req_units_chk CHECK (units BETWEEN 1 AND 20),
  CONSTRAINT req_urgency_chk CHECK (urgency IN ('normal','urgent','critical')),
  CONSTRAINT req_fulfilment_chk CHECK (fulfilment IN ('open','fulfilled','cancelled')),
  CONSTRAINT req_status_chk CHECK (status IN ('pending','approved','rejected')),
  CONSTRAINT req_upazila_known CHECK (upazila_slug IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS blood_requests_source_uidx ON public.blood_requests (source_post_id) WHERE source_post_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS blood_requests_legacy_id_key ON public.blood_requests (legacy_id) WHERE legacy_id IS NOT NULL;

-- =====================================================================================
-- 14. HOSPITALS (manual admin-added)
-- =====================================================================================
CREATE TABLE IF NOT EXISTS public.hospitals (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  name_en     text,
  type        text NOT NULL,
  type_label  text NOT NULL,
  address     text NOT NULL,
  phone       text NOT NULL,
  emergency   text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT hospitals_type_chk CHECK (type IN ('govt','private','diagnostic'))
);

-- =====================================================================================
-- FOREIGN KEYS (deferred so table creation order doesn't matter)
-- =====================================================================================
ALTER TABLE public.community_posts
  ADD CONSTRAINT community_posts_contributor_fkey
    FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL;
ALTER TABLE public.tourist_spots
  ADD CONSTRAINT tourist_spots_contributor_fkey
    FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL;
ALTER TABLE public.blood_donors
  ADD CONSTRAINT donor_user_fkey
    FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL;

-- =====================================================================================
-- TRIGGERS: moderation sync & updated_at
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

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END $$;

-- Apply moderation trigger to all user-generated content tables
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['community_posts','tourist_spots','blood_donors','blood_requests'] LOOP
    EXECUTE format('CREATE TRIGGER trg_sync_moderation BEFORE INSERT OR UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.sync_moderation_state()', t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['community_posts','tourist_spots','hospitals','community_users','blood_donors','blood_requests'] LOOP
    EXECUTE format('CREATE TRIGGER trg_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()', t);
  END LOOP;
END $$;

-- =====================================================================================
-- INDEXES (match the app's real filters; partial indexes keep them small)
-- =====================================================================================
-- healthcare
CREATE INDEX IF NOT EXISTS hc_upazila_category_idx ON public.healthcare_facilities (upazila_slug, category);
CREATE INDEX IF NOT EXISTS hc_ownership_idx ON public.healthcare_facilities (ownership);
CREATE INDEX IF NOT EXISTS hc_name_trgm_idx ON public.healthcare_facilities USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS hc_name_en_trgm_idx ON public.healthcare_facilities USING gin (name_en gin_trgm_ops);
CREATE INDEX IF NOT EXISTS hc_phone_gin_idx ON public.healthcare_facilities USING gin (phone jsonb_path_ops);
CREATE INDEX IF NOT EXISTS hc_latlng_idx ON public.healthcare_facilities (latitude, longitude);

-- education
CREATE INDEX IF NOT EXISTS edu_upazila_category_idx ON public.educational_institutes (upazila_slug, category) WHERE is_approved;
CREATE INDEX IF NOT EXISTS edu_name_trgm_idx ON public.educational_institutes USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS edu_eiin_idx ON public.educational_institutes (eiin) WHERE eiin IS NOT NULL AND eiin <> '';

-- directories
CREATE INDEX IF NOT EXISTS hospitality_upazila_idx ON public.hospitality_venues (upazila_slug, category);
CREATE INDEX IF NOT EXISTS transport_hubs_idx ON public.transport_hubs (upazila_slug, category);
CREATE INDEX IF NOT EXISTS banks_upazila_idx ON public.banks (upazila_slug);
CREATE INDEX IF NOT EXISTS banks_routing_idx ON public.banks (routing_number) WHERE routing_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS atm_upazila_idx ON public.atm_booths (upazila_slug);
CREATE INDEX IF NOT EXISTS blood_banks_upazila_idx ON public.blood_banks (upazila_slug);

-- blood donors
CREATE INDEX IF NOT EXISTS donors_search_idx ON public.blood_donors (blood_group, upazila_slug) WHERE is_approved;
CREATE INDEX IF NOT EXISTS donors_phone_idx ON public.blood_donors (phone);
CREATE INDEX IF NOT EXISTS donors_pending_idx ON public.blood_donors (created_at) WHERE status = 'pending';

-- blood requests
CREATE INDEX IF NOT EXISTS requests_open_idx ON public.blood_requests (blood_group, upazila_slug, created_at DESC) WHERE is_approved AND fulfilment = 'open';
CREATE INDEX IF NOT EXISTS requests_pending_idx ON public.blood_requests (created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS requests_owner_idx ON public.blood_requests (contributor_user_id) WHERE contributor_user_id IS NOT NULL;

-- published content
CREATE INDEX IF NOT EXISTS spots_published_idx ON public.tourist_spots (category, created_at DESC) WHERE is_approved;
CREATE INDEX IF NOT EXISTS spots_upazila_idx ON public.tourist_spots (upazila_slug) WHERE is_approved;
CREATE INDEX IF NOT EXISTS spots_pending_idx ON public.tourist_spots (created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS spots_contributor_idx ON public.tourist_spots (contributor_user_id) WHERE contributor_user_id IS NOT NULL;

-- community posts
CREATE INDEX IF NOT EXISTS posts_feed_idx ON public.community_posts (category, upazila_slug, created_at DESC) WHERE is_approved;
CREATE INDEX IF NOT EXISTS posts_pending_idx ON public.community_posts (created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS posts_contributor_idx ON public.community_posts (contributor_user_id) WHERE contributor_user_id IS NOT NULL;

-- reviews
CREATE INDEX IF NOT EXISTS reviews_spot_idx ON public.spot_reviews (spot_id, created_at DESC);

-- =====================================================================================
-- ROW LEVEL SECURITY
-- =====================================================================================
DO $$
DECLARE t text;
BEGIN
  -- Enable RLS on all tables
  FOREACH t IN ARRAY ARRAY[
    'upazila_ref','upazilas','healthcare_facilities','educational_institutes','hospitality_venues',
    'transport_hubs','transport_services','banks','atm_booths','blood_banks','blood_donors',
    'blood_requests','hospitals','spot_reviews','tourist_spots','community_posts','community_users'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;

  -- Public directory data: full read access
  FOREACH t IN ARRAY ARRAY[
    'upazila_ref','upazilas','healthcare_facilities','educational_institutes','hospitality_venues',
    'transport_hubs','transport_services','banks','atm_booths','blood_banks','hospitals','spot_reviews'
  ] LOOP
    EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT USING (true)', t);
  END LOOP;
END $$;

-- Moderated content: only published rows visible to public
CREATE POLICY public_read ON public.blood_donors FOR SELECT USING (is_approved);
CREATE POLICY public_read ON public.blood_requests FOR SELECT USING (is_approved);
CREATE POLICY public_read ON public.tourist_spots FOR SELECT USING (is_approved);
CREATE POLICY public_read ON public.community_posts FOR SELECT USING (is_approved);
-- community_users: RLS on + no policy = invisible to anon/authenticated

-- Privilege guard: public roles are read-only even if policies were added by mistake
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM anon;
    REVOKE ALL ON public.community_users FROM anon;
    GRANT SELECT ON public.blood_requests TO anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM authenticated;
    REVOKE ALL ON public.community_users FROM authenticated;
    GRANT SELECT ON public.blood_requests TO authenticated;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT ALL ON public.blood_requests TO service_role;
  END IF;
END $$;

ANALYZE;
