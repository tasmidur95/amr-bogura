import type { ReactNode } from 'react';
import { staticPageMetadata } from '@/lib/i18n/seo';

export const generateMetadata = ({ params }: { params: { locale: string } }) =>
  staticPageMetadata('bn', 'banking');

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
