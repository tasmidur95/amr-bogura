// One seed entry point.
//
//   npm run seed -- all
//   npm run seed -- healthcare blood hospitality
//   npm run seed -- transport --truncate        empty that dataset's tables first, then re-seed
//   npm run seed -- list                        show the datasets
//
// Datasets: healthcare, education, hospitality, transport, banking, blood, content (explore spots,
// reviews, community posts, members). Aliases: hospital(s)=healthcare, blood-donor(s)/donors=blood,
// bank/atm=banking, hotel(s)/restaurant(s)=hospitality, institutes/school(s)=education, spots/community=content.
//
// SQL datasets are rebuilt from amr-bogura-data/*.json (scripts/seed-all.mjs) before they are applied;
// pass --no-generate to apply the existing supabase/seed/*.sql as they are.
// Rows already present are left alone (ON CONFLICT DO NOTHING), so re-running is safe.
//
// SAFETY: local PostgreSQL only (LOCAL_DATABASE_URL in env or .env.local), same rule as db-setup.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import pg from 'pg';
import { seedContent } from './db-seed-content.mjs';
import { DATASETS, parseArgs, resolveDatasets, localDbUrl, root } from './lib/datasets.mjs';

const { flags, words } = parseArgs(process.argv.slice(2));

if (!words.length || words.includes('list') || words.includes('help')) {
  console.log('usage: npm run seed -- <dataset...|all> [--truncate] [--no-generate]\n\ndatasets:');
  for (const [k, v] of Object.entries(DATASETS)) console.log(`  ${k.padEnd(12)} ${v.tables.join(', ')}`);
  console.log('  all          every dataset above');
  process.exit(0);
}
const order = resolveDatasets(words);
const url = localDbUrl();

// 1. rebuild the SQL files from the JSON datasets
if (order.some(k => DATASETS[k].file && !DATASETS[k].content) && !flags.has('--no-generate')) {
  const r = spawnSync(process.execPath, [path.join(root, 'scripts/seed-all.mjs')], { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

// 2. apply
const db = new pg.Client({ connectionString: url });
await db.connect();
try {
  if (flags.has('--truncate')) {
    // children first: reviews -> spots, donors/requests keep their own seed
    const tables = order.flatMap(k => DATASETS[k].tables);
    await db.query(`TRUNCATE ${tables.map(t => `public."${t}"`).join(', ')} RESTART IDENTITY CASCADE`);
    console.log(`truncated: ${tables.join(', ')}`);
  }
  for (const k of order) {
    const ds = DATASETS[k];
    process.stdout.write(`seed ${k} ... `);
    if (ds.content) {
      console.log(JSON.stringify(await seedContent(db)));
    } else {
      const sql = fs.readFileSync(path.join(root, 'supabase/seed', ds.file), 'utf8');
      await db.query('BEGIN');
      try { await db.query(sql); await db.query('COMMIT'); } catch (e) { await db.query('ROLLBACK'); throw e; }
      const counts = [];
      for (const t of ds.tables) counts.push(`${t}=${(await db.query(`SELECT count(*)::int n FROM public."${t}"`)).rows[0].n}`);
      console.log(counts.join(', '));
    }
  }
} catch (e) {
  console.error('\nFAILED:', e.message || e);
  process.exitCode = 1;
} finally {
  await db.end();
}
