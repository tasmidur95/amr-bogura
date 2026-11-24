import type { ReactNode } from 'react';
import { staticPageMetadata } from '@/lib/i18n/seo';

// Account pages should not appear in search results
export const generateMetadata = ({ params }: { params: { locale: string } }) =>
  staticPageMetadata('bn', 'login', { noindex: true });

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
