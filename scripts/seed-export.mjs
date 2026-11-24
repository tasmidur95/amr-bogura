// Inverse of seed.mjs: database -> data-only SQL seed files.
//
//   npm run seed:export -- all
//   npm run seed:export -- healthcare blood
//   npm run seed:export -- banking --out=supabase/seed      overwrite the real seed files
//   npm run seed:export -- list
//
// Default output is supabase/seed-export/ (so the committed seeds are never overwritten by accident).
// Files use the same names as supabase/seed/*.sql and the same shape: INSERT ... ON CONFLICT DO NOTHING,
// rows ordered by primary key, so a re-export of unchanged data is byte-identical.
// Generated columns (upazila_slug, phone_digits ...) are skipped; they are recomputed on insert.
// Never exported: community_users (password hashes) and contributor_user_id links.
import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';
import { DATASETS, parseArgs, resolveDatasets, localDbUrl, root } from './lib/datasets.mjs';

const { opts, words } = parseArgs(process.argv.slice(2));
if (!words.length || words.includes('list') || words.includes('help')) {
  console.log('usage: npm run seed:export -- <dataset...|all> [--out=dir]\n\ndatasets:');
  for (const [k, v] of Object.entries(DATASETS)) console.log(`  ${k.padEnd(12)} ${v.tables.join(', ')}  ->  ${v.file}`);
  process.exit(0);
}
const order = resolveDatasets(words);
const outDir = path.resolve(root, opts.out || 'supabase/seed-export');
const SKIP_COLUMNS = new Set(['contributor_user_id']);

// return dates/timestamps as plain strings so they round-trip exactly
pg.types.setTypeParser(1082, v => v);
pg.types.setTypeParser(1114, v => v);
pg.types.setTypeParser(1184, v => new Date(v).toISOString());

const lit = (v, type) => {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  if (type === 'jsonb' || type === 'json') return `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
  if (Array.isArray(v)) throw new Error('array columns are not supported by the exporter');
  return `'${String(v).replace(/'/g, "''")}'`;
};

const db = new pg.Client({ connectionString: localDbUrl() });
await db.connect();
fs.mkdirSync(outDir, { recursive: true });
try {
  for (const k of order) {
    const ds = DATASETS[k];
    let sql = `-- ${k.toUpperCase()} — exported from the database by scripts/seed-export.mjs. Data only; safe to re-run.\n`;
    const counts = [];
    for (const table of ds.tables) {
      const cols = (await db.query(
        `SELECT column_name, data_type FROM information_schema.columns
         WHERE table_schema = 'public' AND table_name = $1 AND is_generated = 'NEVER' ORDER BY ordinal_position`, [table]
      )).rows.filter(c => !SKIP_COLUMNS.has(c.column_name));
      if (!cols.length) throw new Error(`table public.${table} not found – run npm run db:setup first`);
      const pk = (await db.query(
        `SELECT a.attname FROM pg_index i JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
         WHERE i.indrelid = $1::regclass AND i.indisprimary`, [`public.${table}`])).rows.map(r => `"${r.attname}"`);
      const rows = (await db.query(`SELECT ${cols.map(c => `"${c.column_name}"`).join(', ')} FROM public."${table}" ORDER BY ${pk.join(', ') || '1'}`)).rows;
      counts.push(`${table}=${rows.length}`);
      sql += `\n-- ${table} (${rows.length} rows)\n`;
      const head = `INSERT INTO public.${table} (${cols.map(c => `"${c.column_name}"`.replace(/"/g, '')).join(', ')}) VALUES\n`;
      for (let i = 0; i < rows.length; i += 50) {
        const chunk = rows.slice(i, i + 50).map(r => '  (' + cols.map(c => lit(r[c.column_name], c.data_type)).join(', ') + ')');
        sql += head + chunk.join(',\n') + `\nON CONFLICT DO NOTHING;\n`;
      }
    }
    fs.writeFileSync(path.join(outDir, ds.file), sql, 'utf8');
    console.log(`${ds.file.padEnd(32)} ${counts.join(', ')}`);
  }
  console.log(`\nwrote ${order.length} file(s) to ${path.relative(root, outDir) || '.'}`);
} catch (e) {
  console.error('\nFAILED:', e.message || e);
  process.exitCode = 1;
} finally {
  await db.end();
}
