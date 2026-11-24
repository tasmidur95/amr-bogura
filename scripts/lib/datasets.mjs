// Shared by scripts/seed.mjs (JSON/SQL -> database) and scripts/seed-export.mjs (database -> SQL).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// tables are listed parents-first (the export writes them in this order)
export const DATASETS = {
  healthcare: { file: '01_healthcare_facilities.sql', tables: ['healthcare_facilities'] },
  education: { file: '02_educational_institutes.sql', tables: ['educational_institutes'] },
  hospitality: { file: '03_hospitality_venues.sql', tables: ['hospitality_venues'] },
  transport: { file: '04_transport.sql', tables: ['transport_hubs', 'transport_services'] },
  banking: { file: '05_banking.sql', tables: ['banks', 'atm_booths'] },
  blood: { file: '06_blood.sql', tables: ['blood_banks', 'blood_donors'] },
  content: { file: '07_content.sql', content: true, tables: ['tourist_spots', 'spot_reviews', 'community_posts'] },
};
export const ALIASES = {
  hospital: 'healthcare', hospitals: 'healthcare', health: 'healthcare',
  institutes: 'education', institute: 'education', school: 'education', schools: 'education',
  hotel: 'hospitality', hotels: 'hospitality', restaurant: 'hospitality', restaurants: 'hospitality',
  bank: 'banking', banks: 'banking', atm: 'banking',
  'blood-donor': 'blood', 'blood-donors': 'blood', 'blood-doner': 'blood', donor: 'blood', donors: 'blood',
  spots: 'content', explore: 'content', community: 'content',
};

/** ['all'] | ['blood-donor,transport', 'hotels'] -> dataset keys in dependency order; exits on unknown names. */
export function resolveDatasets(words) {
  const selected = new Set();
  for (const w of words) {
    if (w === 'all') Object.keys(DATASETS).forEach(k => selected.add(k));
    else if (DATASETS[w]) selected.add(w);
    else if (ALIASES[w]) selected.add(ALIASES[w]);
    else { console.error(`unknown dataset "${w}". Use "list" to see them.`); process.exit(1); }
  }
  return Object.keys(DATASETS).filter(k => selected.has(k));
}

/** Local database URL from env/.env.local; refuses non-local hosts. */
export function localDbUrl() {
  let url = process.env.LOCAL_DATABASE_URL;
  const file = path.join(root, '.env.local');
  if (!url && fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*LOCAL_DATABASE_URL\s*=\s*(.*)\s*$/);
      if (m) url = m[1].replace(/^['"]|['"]$/g, '');
    }
  }
  if (!url) { console.error('LOCAL_DATABASE_URL is not set (put it in .env.local).'); process.exit(1); }
  if (!['localhost', '127.0.0.1', '[::1]', '::1'].includes(new URL(url).hostname)) {
    console.error('Refusing to run: host is not local.'); process.exit(1);
  }
  return url;
}

export function parseArgs(argv) {
  return {
    flags: new Set(argv.filter(a => a.startsWith('--') && !a.includes('='))),
    opts: Object.fromEntries(argv.filter(a => a.startsWith('--') && a.includes('=')).map(a => a.slice(2).split(/=(.*)/s).slice(0, 2))),
    words: argv.filter(a => !a.startsWith('--')).flatMap(a => a.split(',')).map(a => a.trim().toLowerCase()).filter(Boolean),
  };
}
