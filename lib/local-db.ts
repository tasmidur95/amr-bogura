import { Pool, PoolClient, types } from 'pg';

// ---------------------------------------------------------------------------------------
// Local PostgreSQL adapter (development only)
//
// Exposes the small slice of the supabase-js query API that DistrictService uses
// (from / select / insert / update / delete / eq / neq / in / order / limit / single),
// but runs real SQL against a local Postgres. That lets the same service code work against
// Supabase in production and a local database in development.
//
// Each query runs in its own transaction with `SET LOCAL ROLE <role>`:
//   - 'anon'         -> same Row Level Security as the public Supabase key
//   - 'service_role' -> bypasses RLS like the server-side service key
// so local development catches RLS mistakes before they reach production.
// ---------------------------------------------------------------------------------------

// Return timestamps / dates as strings, like PostgREST does (the app calls .split('T') on them)
types.setTypeParser(1184, v => new Date(v).toISOString()); // timestamptz
types.setTypeParser(1114, v => new Date(v + 'Z').toISOString()); // timestamp
types.setTypeParser(1082, v => v); // date -> 'YYYY-MM-DD'

type Role = 'anon' | 'service_role';
type Filter = { col: string; op: '=' | '<>' | 'IN'; val: any };
type Result<T = any> = { data: T | null; error: { message: string; code?: string } | null };

const IDENT = /^[a-z_][a-z0-9_]*$/i;
const ident = (s: string) => {
  if (!IDENT.test(s)) throw new Error(`Invalid SQL identifier: ${s}`);
  return `"${s}"`;
};

// jsonb columns receive JS arrays / objects: serialise them (node-pg would send arrays as PG arrays)
const param = (v: any) =>
  v !== null && typeof v === 'object' && !(v instanceof Date) && !Buffer.isBuffer(v) ? JSON.stringify(v) : v;

const g = globalThis as unknown as { __localPgPool?: Pool };
function getPool(url: string): Pool {
  if (!g.__localPgPool) g.__localPgPool = new Pool({ connectionString: url, max: 5, idleTimeoutMillis: 10_000 });
  return g.__localPgPool;
}

class QueryBuilder implements PromiseLike<Result> {
  private action: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private cols = '*';
  private rows: Record<string, any>[] = [];
  private patch: Record<string, any> = {};
  private filters: Filter[] = [];
  private orders: string[] = [];
  private lim?: number;
  private returning = false;
  private mode: 'many' | 'single' | 'maybeSingle' = 'many';

  constructor(private pool: Pool, private role: Role, private table: string) {}

  select(cols = '*') {
    if (this.action === 'select') this.cols = cols;
    else this.returning = true; // insert/update/delete ... .select() => RETURNING *
    return this;
  }
  insert(rows: Record<string, any> | Record<string, any>[]) {
    this.action = 'insert';
    this.rows = Array.isArray(rows) ? rows : [rows];
    return this;
  }
  update(patch: Record<string, any>) {
    this.action = 'update';
    this.patch = patch;
    return this;
  }
  delete() {
    this.action = 'delete';
    return this;
  }
  eq(col: string, val: any) { this.filters.push({ col, op: '=', val }); return this; }
  neq(col: string, val: any) { this.filters.push({ col, op: '<>', val }); return this; }
  in(col: string, val: any[]) { this.filters.push({ col, op: 'IN', val }); return this; }
  order(col: string, opts: { ascending?: boolean } = {}) {
    this.orders.push(`${ident(col)} ${opts.ascending === false ? 'DESC' : 'ASC'}`);
    return this;
  }
  limit(n: number) { this.lim = n; return this; }
  single() { this.mode = 'single'; return this; }
  maybeSingle() { this.mode = 'maybeSingle'; return this; }

  private build(): { sql: string; values: any[] } {
    const values: any[] = [];
    const bind = (v: any) => { values.push(param(v)); return `$${values.length}`; };
    const where = () => {
      if (!this.filters.length) return '';
      return ' WHERE ' + this.filters.map(f => {
        if (f.op === 'IN') return `${ident(f.col)} = ANY(${bind(f.val)})`;
        return `${ident(f.col)} ${f.op} ${bind(f.val)}`;
      }).join(' AND ');
    };
    const ret = this.returning ? ' RETURNING *' : '';

    if (this.action === 'insert') {
      const cols = Array.from(new Set(this.rows.flatMap(r => Object.keys(r))));
      if (!cols.length) throw new Error('insert() called with no columns');
      const tuples = this.rows.map(r => '(' + cols.map(c => (c in r ? bind(r[c]) : 'DEFAULT')).join(', ') + ')');
      return { sql: `INSERT INTO public.${ident(this.table)} (${cols.map(ident).join(', ')}) VALUES ${tuples.join(', ')}${ret}`, values };
    }
    if (this.action === 'update') {
      const sets = Object.entries(this.patch).filter(([, v]) => v !== undefined).map(([k, v]) => `${ident(k)} = ${bind(v)}`);
      if (!sets.length) throw new Error('update() called with no values');
      return { sql: `UPDATE public.${ident(this.table)} SET ${sets.join(', ')}${where()}${ret}`, values };
    }
    if (this.action === 'delete') {
      return { sql: `DELETE FROM public.${ident(this.table)}${where()}${ret}`, values };
    }
    const cols = this.cols.trim() === '*' ? '*' : this.cols.split(',').map(c => ident(c.trim())).join(', ');
    const order = this.orders.length ? ' ORDER BY ' + this.orders.join(', ') : '';
    const lim = this.lim !== undefined ? ` LIMIT ${Math.max(0, Math.floor(this.lim))}` : '';
    return { sql: `SELECT ${cols} FROM public.${ident(this.table)}${where()}${order}${lim}`, values };
  }

  private async run(): Promise<Result> {
    let client: PoolClient | undefined;
    try {
      const { sql, values } = this.build();
      client = await this.pool.connect();
      await client.query('BEGIN');
      try {
        await client.query(`SET LOCAL ROLE ${this.role}`);
        const res = await client.query(sql, values);
        await client.query('COMMIT');

        const wantsRows = this.action === 'select' || this.returning;
        if (!wantsRows) return { data: null, error: null };
        if (this.mode === 'many') return { data: res.rows, error: null };
        if (res.rows.length === 1) return { data: res.rows[0], error: null };
        if (res.rows.length === 0 && this.mode === 'maybeSingle') return { data: null, error: null };
        return {
          data: null,
          error: { code: 'PGRST116', message: res.rows.length === 0 ? 'The result contains 0 rows' : 'The result contains multiple rows' },
        };
      } catch (e) {
        await client.query('ROLLBACK').catch(() => {});
        throw e;
      }
    } catch (e: any) {
      return { data: null, error: { message: e.message || String(e), code: e.code } };
    } finally {
      client?.release();
    }
  }

  then<A = Result, B = never>(
    onfulfilled?: ((value: Result) => A | PromiseLike<A>) | null,
    onrejected?: ((reason: any) => B | PromiseLike<B>) | null
  ): PromiseLike<A | B> {
    return this.run().then(onfulfilled, onrejected);
  }
}

export interface LocalClient {
  from(table: string): QueryBuilder;
}

/** Returns a supabase-js-shaped client for the local database, or null when not configured. */
export function createLocalClient(role: Role): LocalClient | null {
  const url = process.env.LOCAL_DATABASE_URL;
  // Development only: a production build can never be switched onto a local database by accident.
  if (!url || process.env.NODE_ENV === 'production' || typeof window !== 'undefined') return null;
  const pool = getPool(url);
  return { from: (table: string) => new QueryBuilder(pool, role, table) };
}

/** Test hook: build a client on an explicit pool (used by scripts/tests). */
export function createLocalClientForPool(pool: Pool, role: Role): LocalClient {
  return { from: (table: string) => new QueryBuilder(pool, role, table) };
}

export const isLocalDbConfigured = Boolean(
  process.env.LOCAL_DATABASE_URL && process.env.NODE_ENV !== 'production' && typeof window === 'undefined'
);
