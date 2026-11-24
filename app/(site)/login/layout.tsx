import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'লগইন ও নিবন্ধন | আমার বগুড়া',
  description: 'আমার বগুড়ায় লগইন করুন বা নতুন অবদানকারী প্রোফাইল তৈরি করুন।',
  // Account pages should not appear in search results
  robots: { index: false, follow: false },
  alternates: { canonical: '/login' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
