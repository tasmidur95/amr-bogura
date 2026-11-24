'use client';

// The language is not in the URL any more, so these are plain re-exports. Kept so existing imports
// (`@/lib/i18n/navigation`) keep working.
export { default, default as Link } from 'next/link';
export { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
