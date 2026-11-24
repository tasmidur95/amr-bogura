// Local PostgreSQL bootstrap for development.
//
//   npm run db:setup            create DB (if missing) + schema + migrations + seed (idempotent)
//   npm run db:setup -- --no-seed     schema + migrations only
//   npm run db:setup -- --reseed      re-apply supabase/seed/*.sql (safe: ON CONFLICT DO NOTHING)
//   npm run db:reset            DROP and recreate the local database, then set it up again
//
// Reads LOCAL_DATABASE_URL from the environment or .env.local, e.g.
//   LOCAL_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/amar_bogura
//
// SAFETY: refuses to run unless the host is localhost / 127.0.0.1 / ::1. It creates roles and
// (with --reset) drops the database, so it must never touch Supabase or any remote server.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { seedContent } from './db-seed-content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));

function readEnvLocal() {
  const file = path.join(root, '.env.local');
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return out;
}

const url = process.env.LOCAL_DATABASE_URL || readEnvLocal().LOCAL_DATABASE_URL;
if (!url) {
  console.error('LOCAL_DATABASE_URL is not set (put it in .env.local). Example:\n  LOCAL_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/amar_bogura');
  process.exit(1);
}

const u = new URL(url);
const dbName = decodeURIComponent(u.pathname.replace(/^\//, '')) || 'amar_bogura';
if (!['localhost', '127.0.0.1', '[::1]', '::1'].includes(u.hostname)) {
  console.error(`Refusing to run: host "${u.hostname}" is not local. This script is for a local development database only.`);
  process.exit(1);
}
if (!/^[a-z0-9_]+$/i.test(dbName)) {
  console.error(`Unsafe database name "${dbName}" (letters, digits and _ only).`);
  process.exit(1);
}

const adminUrl = new URL(url);
adminUrl.pathname = '/postgres';

const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');

async function main() {
  // 1. create (or reset) the database
  const admin = new pg.Client({ connectionString: adminUrl.toString() });
  await admin.connect();
  if (args.has('--reset')) {
    await admin.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()`, [dbName]);
    await admin.query(`DROP DATABASE IF EXISTS "${dbName}"`);
    console.log(`dropped database ${dbName}`);
  }
  const exists = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
  if (exists.rowCount === 0) {
    await admin.query(`CREATE DATABASE "${dbName}" ENCODING 'UTF8'`);
    console.log(`created database ${dbName}`);
  }
  await admin.end();

  const db = new pg.Client({ connectionString: url });
  await db.connect();

  // 2. Supabase-style roles so Row Level Security + grants behave like production
  await db.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon')          THEN CREATE ROLE anon NOLOGIN; END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN CREATE ROLE authenticated NOLOGIN; END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role')  THEN CREATE ROLE service_role NOLOGIN BYPASSRLS; END IF;
    END $$;
    GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
  `);

  await db.query(`CREATE TABLE IF NOT EXISTS public.schema_migrations (
    name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
  const applied = new Set((await db.query('SELECT name FROM public.schema_migrations')).rows.map(r => r.name));

  const apply = async (name, sql, { once = true } = {}) => {
    if (once && applied.has(name)) { console.log(`skip   ${name} (already applied)`); return; }
    process.stdout.write(`apply  ${name} ... `);
    await db.query('BEGIN');
    try {
      await db.query(sql);
      await db.query('INSERT INTO public.schema_migrations (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET applied_at = now()', [name]);
      await db.query('COMMIT');
      console.log('ok');
    } catch (e) {
      await db.query('ROLLBACK');
      console.log('FAILED');
      throw e;
    }
  };

  // 3. baseline -> migrations -> seed. The seed files are DATA ONLY and target the final schema,
  //    so they must run after every migration.
  // schema.sql is the legacy baseline. The consolidated migrations/00000000000000_init.sql replaces it
  // (creating both would give the old column names), so only apply it when init.sql is absent.
  if (!fs.existsSync(path.join(root, 'supabase/migrations/00000000000000_init.sql'))) {
    await apply('schema.sql', read('supabase/schema.sql'));
  }
  // Supabase grants everything to these roles by default; the migration then REVOKEs writes.
  await db.query(`GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role`);

  const migDir = path.join(root, 'supabase/migrations');
  const files = fs.existsSync(migDir) ? fs.readdirSync(migDir).filter(f => f.endsWith('.sql')).sort() : [];
  for (const f of files) {
    await apply(`migrations/${f}`, read(`supabase/migrations/${f}`));
    await db.query(`GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role`);
  }

  // 4. reference data: supabase/seed/NN_*.sql in dependency order (generated by npm run seed:all)
  if (!args.has('--no-seed')) {
    const seedDir = path.join(root, 'supabase/seed');
    const seedFiles = fs.existsSync(seedDir) ? fs.readdirSync(seedDir).filter(f => /^\d\d_.+\.sql$/.test(f)).sort() : [];
    if (!seedFiles.length) console.warn('no supabase/seed/*.sql found: run npm run seed:all');
    for (const f of seedFiles) {
      await apply(`seed/${f}`, read(`supabase/seed/${f}`), { once: !args.has('--reseed') });
    }

    // 5. editorial content + member accounts (spots, reviews, posts, members)
    console.log('content:', await seedContent(db));
  }

  // 6. summary
  const t = await db.query(`
    SELECT c.relname AS t, c.reltuples::bigint AS approx, c.relrowsecurity AS rls
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relname <> 'schema_migrations' ORDER BY 1`);
  console.log(`\n${dbName}: ${t.rowCount} tables`);
  for (const r of t.rows) {
    const n = (await db.query(`SELECT count(*)::int n FROM public."${r.t}"`)).rows[0].n;
    console.log(`  ${r.t.padEnd(24)} ${String(n).padStart(5)} rows   RLS ${r.rls ? 'on' : 'OFF'}`);
  }
  await db.end();
}

main().catch(e => { console.error('\n' + (e.message || e)); process.exit(1); });
