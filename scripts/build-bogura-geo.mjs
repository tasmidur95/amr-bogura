// Collects Bogura geo data from the ArcGIS BD CRIIPS MapServer and writes simplified GeoJSON to public/geo/.
//   public/geo/bogura-upazilas.json  (layer 122 + density from 358)
//   public/geo/bogura-unions.json    (layer 123: unions + municipal wards, + 2011 population from 364)
// Usage: node scripts/build-bogura-geo.mjs
import fs from 'node:fs';
const B = 'https://www.arcgisbd.com/server/rest/services/ADB005/CRIIPS/MapServer';
const q = (l, where, geom, fmt) => `${B}/${l}/query?where=${encodeURIComponent(where)}&outFields=*&outSR=4326&returnGeometry=${geom}&f=${fmt}`;
const get = async u => { const r = await fetch(u); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); };

const norm = s => String(s || '').toLowerCase().replace(/[^a-z]/g, '');
const UPZ_ORDER = ['bogurasadar','shibganj','sherpur','sonatala','sariakandi','gabtali','dhunat','nandigram','kahaloo','dupchanchia','adamdighi','shajahanpur'];
const UPZ_ALIAS = { dupchachia: 'dupchanchia', dhupchanchia: 'dupchanchia', sonatola: 'sonatala' };
const upzKey = s => { const k = norm(s); return UPZ_ALIAS[k] || k; };

function sqSegDist(p, a, b) {
  let x = a[0], y = a[1], dx = b[0]-x, dy = b[1]-y;
  if (dx || dy) { const t = ((p[0]-x)*dx+(p[1]-y)*dy)/(dx*dx+dy*dy); if (t>1){x=b[0];y=b[1];} else if (t>0){x+=dx*t;y+=dy*t;} }
  dx = p[0]-x; dy = p[1]-y; return dx*dx+dy*dy;
}
function dp(pts, tol) {
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length-1] = 1;
  const st = [[0, pts.length-1]];
  while (st.length) { const [f,l]=st.pop(); let m=tol*tol, idx=-1;
    for (let i=f+1;i<l;i++){const d=sqSegDist(pts[i],pts[f],pts[l]); if(d>m){m=d;idx=i;}}
    if (idx>-1){keep[idx]=1; st.push([f,idx],[idx,l]);} }
  return pts.filter((_,i)=>keep[i]);
}
const rnd = p => [+p[0].toFixed(5), +p[1].toFixed(5)];
const simplify = tol => g => {
  const ring = r => { const s = dp(r, tol).map(rnd); return s.length >= 4 ? s : r.map(rnd); };
  return g.type === 'Polygon'
    ? { type: 'Polygon', coordinates: g.coordinates.map(ring) }
    : { type: 'MultiPolygon', coordinates: g.coordinates.map(p => p.map(ring)) };
};
const write = (file, features) => {
  fs.writeFileSync(file, JSON.stringify({ type: 'FeatureCollection', features }));
  console.log(file, features.length, 'features', fs.statSync(file).size, 'bytes');
};
fs.mkdirSync('public/geo', { recursive: true });

// ---- Upazilas ----
const upz = await get(q(122, "District='Bogura'", true, 'geojson'));
const dens = await get(q(358, "District='Bogura'", false, 'json'));
const densBy = Object.fromEntries(dens.features.map(f => [upzKey(f.attributes.Upazila), f.attributes.PDen_SqKm]));
const simpU = simplify(0.0004);
write('public/geo/bogura-upazilas.json', upz.features.map(f => {
  const k = upzKey(f.properties.Upazila);
  const index = UPZ_ORDER.indexOf(k);
  if (index < 0) throw new Error('Unmapped upazila ' + f.properties.Upazila);
  return { type: 'Feature', properties: { index, name_en: f.properties.Upazila.trim(), area_sqkm: f.properties.Area_sqm, pop_density: densBy[k] ?? null }, geometry: simpU(f.geometry) };
}).sort((a, b) => a.properties.index - b.properties.index));

// ---- Unions + municipal wards ----
const uni = await get(q(123, "District='Bogura'", true, 'geojson'));
const pop = await get(q(364, "DISTNAME='Bogura'", false, 'json'));
const popBy = {};
for (const f of pop.features) {
  const a = f.attributes;
  popBy[upzKey(a.THANAME11) + '|' + norm(a.UNINAME11)] = { male: a.MALE, female: a.FEMALE, total: a.TOTAL };
}
// Fuzzy name join (the 2011 layer spells many union names differently)
const lev = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return d[a.length][b.length]; };
const used = new Set();
const NAME_ALIAS = { jamgram: 'jamgaon', kalai: 'kalaimajhpara', aria: 'ariabazar' };
const findPop = (k, name) => {
  const n = NAME_ALIAS[norm(name)] || norm(name), exact = k + '|' + n;
  if (popBy[exact] && !used.has(exact)) { used.add(exact); return popBy[exact]; }
  let best = null, bd = Infinity;
  for (const key of Object.keys(popBy)) {
    if (used.has(key) || !key.startsWith(k + '|') || key.includes('paura')) continue;
    const c = key.split('|')[1], d = lev(n, c) / Math.max(n.length, c.length);
    if (d < bd) { bd = d; best = key; }
  }
  if (best && bd <= 0.4) { used.add(best); return popBy[best]; }
  return null;
};
const simpN = simplify(0.0002);
let matched = 0, unions = 0;
const feats = uni.features.map(f => {
  const p = f.properties, k = upzKey(p.Upazila);
  const isWard = !!p.Municipal.trim();
  const name = p.UnName.trim();
  const rec = isWard ? null : findPop(k, name);
  if (!isWard) { unions++; if (rec) matched++; }
  return { type: 'Feature', properties: {
    upazila_index: UPZ_ORDER.indexOf(k), upazila_en: p.Upazila.trim(),
    kind: isWard ? 'ward' : 'union', name_en: name, municipal: isWard ? p.Municipal.trim() : null,
    area_sqkm: p.Area_sqm, pop_2011: rec?.total ?? null, pop_male_2011: rec?.male ?? null, pop_female_2011: rec?.female ?? null,
  }, geometry: simpN(f.geometry) };
}).sort((a, b) => a.properties.upazila_index - b.properties.upazila_index || a.properties.name_en.localeCompare(b.properties.name_en, 'en', { numeric: true }));
write('public/geo/bogura-unions.json', feats);
console.log(`union population joined: ${matched}/${unions}`);
