import { Locale, SITE_URL } from './config';

/** Fixed route constants – never hand-write a path string in a component. */
export const ROUTES = {
  home: '/',
  upazilas: '/upazilas',
  healthcare: '/healthcare',
  education: '/education',
  explore: '/explore',
  transport: '/transport',
  hospitality: '/hospitality',
  banking: '/banking',
  community: '/community',
  contribute: '/contribute',
  login: '/login',
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Detail pages are slug based: /upazilas/bogura-sadar, /explore/mahasthangarh … */
export const upazilaPath = (slug: string) => `${ROUTES.upazilas}/${slug}`;
export const explorePath = (slug: string) => `${ROUTES.explore}/${slug}`;
export const educationPath = (slug: string) => `${ROUTES.education}/${slug}`;

/** The language is NOT part of the URL (it is kept in localStorage), so paths are used as they are. */
export const localizePath = (path: string, _locale?: Locale): string => path;
export const splitLocale = (pathname: string): { locale: Locale | null; path: string } => ({ locale: null, path: pathname || '/' });

export const absoluteUrl = (_locale: Locale, path: string) => `${SITE_URL}${path}`.replace(/\/$/, '');
