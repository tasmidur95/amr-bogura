import type { Metadata } from 'next';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export const metadata: Metadata = {
  title: 'সিস্টেম অ্যাডমিন ও কনসোল | আমার বগুড়া',
  description: 'আমার বগুড়া জেলা পোর্টাল প্রশাসনিক নিয়ন্ত্রণ ও কন্টেন্ট ম্যানেজমেন্ট সিস্টেম।',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

