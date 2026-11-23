// Matches union names from the BBS/ArcGIS geo data to the app's own union records.
// The two sources spell many names differently (Fapor/Fanpore, Sonabari/Sonaray ...),
// so we assign pairs greedily by smallest normalized edit distance.

const clean = (s: string) =>
  s.toLowerCase().replace(/\b(sadar|paurashava|pourashava|union)\b/g, '').replace(/[^a-z]/g, '');

function lev(a: string, b: string): number {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

/** Returns Map<geoName, unionId>. Unmatched geo names are simply absent. */
export function matchUnions(geoNames: string[], unions: { id: string; enName: string }[]): Map<string, string> {
  const pairs: { g: string; u: string; d: number }[] = [];
  for (const g of geoNames) {
    const gc = clean(g) || g.toLowerCase();
    for (const u of unions) {
      const uc = clean(u.enName) || u.enName.toLowerCase();
      pairs.push({ g, u: u.id, d: lev(gc, uc) / Math.max(gc.length, uc.length) });
    }
  }
  pairs.sort((a, b) => a.d - b.d);
  const out = new Map<string, string>();
  const usedU = new Set<string>();
  for (const p of pairs) {
    if (p.d > 0.55 || out.has(p.g) || usedU.has(p.u)) continue;
    out.set(p.g, p.u);
    usedU.add(p.u);
  }
  return out;
}
