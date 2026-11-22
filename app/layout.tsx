import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { ToastProvider } from '@/lib/context/ToastContext';
import RouteTransitionBar from '@/components/RouteTransitionBar';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://amar-bogura.vercel.app'),
  title: 'আমার বগুড়া | Amar Bogura — বগুড়া জেলা পোর্টাল ও কমিউনিটি প্ল্যাটফর্ম',
  description: 'করতোয়ার তীরে প্রাচীন পুণ্ড্রবর্ধনের ঐতিহ্যবাহী জনপদ। ১২টি উপজেলা, স্বাস্থ্যসেবা, জরুরি যোগাযোগ, রক্তদাতা নেটওয়ার্ক ও নাগরিক সেবার আধুনিক ডিজিটাল প্ল্যাটফর্ম।',
  keywords: ['Bogura', 'Amar Bogura', 'বগুড়া', 'আমার বগুড়া', 'District Portal', 'Pundravardhana', 'Mahasthangarh', 'Bogura Doi'],
  authors: [{ name: 'Amar Bogura Civic Initiative' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'আমার বগুড়া | Amar Bogura',
    description: 'বগুড়া জেলা পোর্টাল ও কমিউনিটি প্ল্যাটফর্ম — পুণ্ড্রনগর, মহাস্থানগড়, ১২টি উপজেলা ও ঐতিহ্যবাহী বগুড়ার দই',
    type: 'website',
    locale: 'bn_BD',
    images: [
      {
        url: '/images/amar-bogura-cover.jpg',
        width: 1200,
        height: 675,
        alt: 'আমার বগুড়া — অফিসিয়াল কভার ফটো ও লোগো',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'আমার বগুড়া | Amar Bogura',
    description: 'বগুড়া জেলা পোর্টাল ও কমিউনিটি প্ল্যাটফর্ম',
    images: ['/images/amar-bogura-cover.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        {/* Google Fonts - Standard Bilingual Bangla & English Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome 6 for exact iconography */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="min-h-screen w-full antialiased selection:bg-emerald-700 selection:text-white">
        <Suspense fallback={null}>
          <RouteTransitionBar />
        </Suspense>
        <LanguageProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

