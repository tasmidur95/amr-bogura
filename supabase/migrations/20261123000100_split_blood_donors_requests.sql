-- =====================================================================================
-- AMAR BOGURA — SEPARATE BLOOD DONORS FROM BLOOD REQUESTS            2026-11-23
--
-- Before: the same people lived twice (blood_donors registry + community_posts category
-- 'blood'), and community_posts mixed two different things: a donor OFFERING blood and a
-- patient's family NEEDING blood ("জরুরি প্রয়োজন").
--
-- After:
--   blood_donors    one registry of donors (a person, long-lived)         <- source of truth
--   blood_requests  time-limited "someone needs blood" (hospital, units, needed-by, fulfilment)
--   community_posts tuition / rent / jobs / business only
--
-- Existing blood posts are MIGRATED first (merged into donors by phone, requests moved
-- across); the migration aborts and rolls back if any post cannot be accounted for.
-- Apply after 20261123000000_optimize_schema.sql. Safe to re-run.
-- =====================================================================================

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
-- 1. blood_donors: registry + moderation + owner
-- ------------------------------------------------------------------------------------
DO $$ BEGIN
  -- the old free-text `status` ("প্রস্তুত", "নিয়মিত রক্তদাতা" ...) is an availability label;
  -- `status` becomes the moderation state shared with the other user-generated tables
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='blood_donors' AND column_name='status')
     AND NOT EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema='public' AND table_name='blood_donors' AND column_name='availability') THEN
    ALTER TABLE public.blood_donors RENAME COLUMN status TO availability;
  END IF;
END $$;

ALTER TABLE public.blood_donors
  ADD COLUMN IF NOT EXISTS is_approved         boolean,
  ADD COLUMN IF NOT EXISTS status              text,
  ADD COLUMN IF NOT EXISTS reject_reason       text,
  ADD COLUMN IF NOT EXISTS reviewed_at         timestamptz,
  ADD COLUMN IF NOT EXISTS contributor_user_id text,
  ADD COLUMN IF NOT EXISTS source_post_id      text,
  ADD COLUMN IF NOT EXISTS updated_at          timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS phone_key           text GENERATED ALWAYS AS (right(regexp_replace(phone, '\D', '', 'g'), 10)) STORED;

-- existing rows were published (is_verified = true): keep them published
UPDATE public.blood_donors SET is_approved = is_verified WHERE is_approved IS NULL;
UPDATE public.blood_donors SET status = CASE WHEN is_approved THEN 'approved' ELSE 'pending' END WHERE status IS NULL;
ALTER TABLE public.blood_donors
  ALTER COLUMN is_approved SET NOT NULL,
  ALTER COLUMN is_approved SET DEFAULT false,         -- new listings wait for a moderator
  ALTER COLUMN status      SET NOT NULL,
  ALTER COLUMN status      SET DEFAULT 'pending',
  ALTER COLUMN is_verified SET DEFAULT false,         -- "identity checked by a moderator", not "published"
  ALTER COLUMN id          SET DEFAULT ('don-' || replace(gen_random_uuid()::text, '-', ''));

SELECT pg_temp.add_constraint('public.blood_donors', 'donor_status_chk',
  $$CHECK (status IN ('pending','approved','rejected'))$$);
SELECT pg_temp.add_constraint('public.blood_donors', 'donor_user_fkey',
  'FOREIGN KEY (contributor_user_id) REFERENCES public.community_users(id) ON DELETE SET NULL');

-- one donor per person (same phone = same person); one listing per member account
CREATE UNIQUE INDEX IF NOT EXISTS blood_donors_phone_key_uidx ON public.blood_donors (phone_key);
CREATE UNIQUE INDEX IF NOT EXISTS blood_donors_user_uidx      ON public.blood_donors (contributor_user_id) WHERE contributor_user_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS blood_donors_source_uidx    ON public.blood_donors (source_post_id)      WHERE source_post_id IS NOT NULL;

DROP INDEX IF EXISTS public.donors_group_upazila_idx;
CREATE INDEX IF NOT EXISTS donors_search_idx  ON public.blood_donors (blood_group, upazila_slug) WHERE is_approved;
CREATE INDEX IF NOT EXISTS donors_pending_idx ON public.blood_donors (created_at) WHERE status = 'pending';

DROP TRIGGER IF EXISTS trg_sync_moderation ON public.blood_donors;
CREATE TRIGGER trg_sync_moderation BEFORE INSERT OR UPDATE ON public.blood_donors
  FOR EACH ROW EXECUTE FUNCTION public.sync_moderation_state();
DROP TRIGGER IF EXISTS trg_set_updated_at ON public.blood_donors;
CREATE TRIGGER trg_set_updated_at BEFORE UPDATE ON public.blood_donors
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP POLICY IF EXISTS public_read ON public.blood_donors;
CREATE POLICY public_read ON public.blood_donors FOR SELECT USING (is_approved);

-- ------------------------------------------------------------------------------------
-- 2. blood_requests: "someone needs blood"
-- ------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blood_requests (
  id                  text PRIMARY KEY DEFAULT ('req-' || replace(gen_random_uuid()::text, '-', '')),
  requester_name      text NOT NULL,
  blood_group         text NOT NULL,
  units               smallint NOT NULL DEFAULT 1,
  hospital            text,
  upazila             text NOT NULL,
  upazila_slug        text GENERATED ALWAYS AS (public.upazila_slug(upazila)) STORED,
  needed_by           date,
  urgency             text NOT NULL DEFAULT 'urgent',
  detail              text,
  contact_phone       text NOT NULL,
  fulfilment          text NOT NULL DEFAULT 'open',        -- what happened to the request
  -- moderation (same convention as the other user-generated tables)
  is_approved         boolean NOT NULL DEFAULT false,
  status              text NOT NULL DEFAULT 'pending',
  reject_reason       text,
  reviewed_at         timestamptz,
  contributor_user_id text REFERENCES public.community_users(id) ON DELETE SET NULL,
  source_post_id      text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

SELECT pg_temp.add_constraint('public.blood_requests', 'req_group_chk',
  $$CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-'))$$);
SELECT pg_temp.add_constraint('public.blood_requests', 'req_units_chk',      'CHECK (units BETWEEN 1 AND 20)');
SELECT pg_temp.add_constraint('public.blood_requests', 'req_urgency_chk',
  $$CHECK (urgency IN ('normal','urgent','critical'))$$);
SELECT pg_temp.add_constraint('public.blood_requests', 'req_fulfilment_chk',
  $$CHECK (fulfilment IN ('open','fulfilled','cancelled'))$$);
SELECT pg_temp.add_constraint('public.blood_requests', 'req_status_chk',
  $$CHECK (status IN ('pending','approved','rejected'))$$);
SELECT pg_temp.add_constraint('public.blood_requests', 'req_upazila_fkey',
  'FOREIGN KEY (upazila_slug) REFERENCES public.upazila_ref(slug)');
SELECT pg_temp.add_constraint('public.blood_requests', 'req_upazila_known', 'CHECK (upazila_slug IS NOT NULL)');

CREATE UNIQUE INDEX IF NOT EXISTS blood_requests_source_uidx ON public.blood_requests (source_post_id) WHERE source_post_id IS NOT NULL;
-- what the public page lists: published AND still open, newest / most urgent first
CREATE INDEX IF NOT EXISTS requests_open_idx    ON public.blood_requests (blood_group, upazila_slug, created_at DESC) WHERE is_approved AND fulfilment = 'open';
CREATE INDEX IF NOT EXISTS requests_pending_idx ON public.blood_requests (created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS requests_owner_idx   ON public.blood_requests (contributor_user_id) WHERE contributor_user_id IS NOT NULL;

DROP TRIGGER IF EXISTS trg_sync_moderation ON public.blood_requests;
CREATE TRIGGER trg_sync_moderation BEFORE INSERT OR UPDATE ON public.blood_requests
  FOR EACH ROW EXECUTE FUNCTION public.sync_moderation_state();
DROP TRIGGER IF EXISTS trg_set_updated_at ON public.blood_requests;
CREATE TRIGGER trg_set_updated_at BEFORE UPDATE ON public.blood_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS public_read ON public.blood_requests;
CREATE POLICY public_read ON public.blood_requests FOR SELECT USING (is_approved);

-- Public roles: read-only (RLS then limits that to published rows). Explicit grants so this works
-- on any Postgres, not just where Supabase's default privileges apply.
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    GRANT SELECT ON public.blood_requests TO anon;
    REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.blood_requests FROM anon; END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    GRANT SELECT ON public.blood_requests TO authenticated;
    REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.blood_requests FROM authenticated; END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT ALL ON public.blood_requests TO service_role; END IF;
END $$;

-- ------------------------------------------------------------------------------------
-- 3. MOVE the old community_posts(category='blood') rows
-- ------------------------------------------------------------------------------------
DO $$
DECLARE
  has_cols boolean;
  n_posts  int := 0;
  n_donor_new int := 0;
  n_donor_dup int := 0;
  n_req    int := 0;
  missing  int;
BEGIN
  -- only runs while the legacy columns still exist (i.e. the first time)
  SELECT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_schema='public' AND table_name='community_posts' AND column_name='blood_group')
    INTO has_cols;

  IF has_cols THEN
    SELECT count(*) INTO n_posts FROM public.community_posts WHERE category = 'blood';

    -- 3a. requests ("জরুরি প্রয়োজন") -> blood_requests
    INSERT INTO public.blood_requests
      (requester_name, blood_group, units, hospital, upazila, urgency, detail, contact_phone,
       is_approved, status, reject_reason, created_at, source_post_id)
    SELECT p.name, p.blood_group, 1, NULL, p.upazila, 'urgent', p.detail, p.phone,
           p.is_approved, p.status, p.reject_reason, p.created_at, p.id
    FROM public.community_posts p
    WHERE p.category = 'blood' AND p.blood_role = 'জরুরি প্রয়োজন' AND p.blood_group IS NOT NULL
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS n_req = ROW_COUNT;

    -- 3b. everything else are donor offers -> blood_donors (one per phone; the registry row wins)
    INSERT INTO public.blood_donors
      (name, blood_group, phone, upazila, location, availability, badge,
       is_verified, is_approved, status, reject_reason, created_at, source_post_id)
    SELECT DISTINCT ON (right(regexp_replace(p.phone, '\D', '', 'g'), 10))
           p.name, p.blood_group, p.phone, p.upazila, p.upazila,
           coalesce(p.blood_role, 'রক্তদাতা'), p.badge,
           false, p.is_approved, p.status, p.reject_reason, p.created_at, p.id
    FROM public.community_posts p
    WHERE p.category = 'blood' AND p.blood_group IS NOT NULL
      AND coalesce(p.blood_role, '') <> 'জরুরি প্রয়োজন'
      AND NOT EXISTS (SELECT 1 FROM public.blood_donors d
                      WHERE d.phone_key = right(regexp_replace(p.phone, '\D', '', 'g'), 10))
    ORDER BY right(regexp_replace(p.phone, '\D', '', 'g'), 10), p.is_approved DESC, p.created_at DESC
    ON CONFLICT DO NOTHING;
    GET DIAGNOSTICS n_donor_new = ROW_COUNT;

    -- 3c. SAFETY NET: every blood post must now be represented, otherwise abort (full rollback)
    SELECT count(*) INTO missing
    FROM public.community_posts p
    WHERE p.category = 'blood'
      AND NOT EXISTS (SELECT 1 FROM public.blood_requests r WHERE r.source_post_id = p.id)
      AND NOT EXISTS (SELECT 1 FROM public.blood_donors d
                      WHERE d.phone_key = right(regexp_replace(p.phone, '\D', '', 'g'), 10));
    IF missing > 0 THEN
      RAISE EXCEPTION 'blood split aborted: % of % blood posts could not be migrated (e.g. missing blood group)', missing, n_posts;
    END IF;

    n_donor_dup := n_posts - n_req - n_donor_new;
    RAISE NOTICE 'blood split: % posts -> % requests, % new donors, % already in the registry (merged)',
                 n_posts, n_req, n_donor_new, n_donor_dup;

    DELETE FROM public.community_posts WHERE category = 'blood';
  END IF;
END $$;

-- ------------------------------------------------------------------------------------
-- 4. community_posts no longer knows about blood
-- ------------------------------------------------------------------------------------
ALTER TABLE public.community_posts DROP CONSTRAINT IF EXISTS cp_category_chk;
ALTER TABLE public.community_posts DROP CONSTRAINT IF EXISTS cp_blood_group_chk;
DROP INDEX IF EXISTS public.posts_blood_idx;
ALTER TABLE public.community_posts DROP COLUMN IF EXISTS blood_group;
ALTER TABLE public.community_posts DROP COLUMN IF EXISTS blood_role;
SELECT pg_temp.add_constraint('public.community_posts', 'cp_category_chk',
  $$CHECK (category IN ('tuition','rent','jobs','business'))$$);

ANALYZE;
