import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { ToastProvider } from '@/lib/context/ToastContext';

export const metadata: Metadata = {
  title: 'আমার বগুড়া | Amar Bogura — বগুড়া জেলা পোর্টাল ও কমিউনিটি প্ল্যাটফর্ম',
  description: 'করতোয়ার তীরে প্রাচীন পুণ্ড্রবর্ধনের ঐতিহ্যবাহী জনপদ। ১২টি উপজেলা, স্বাস্থ্যসেবা, জরুরি যোগাযোগ, রক্তদাতা নেটওয়ার্ক ও নাগরিক সেবার আধুনিক ডিজিটাল প্ল্যাটফর্ম।',
  keywords: ['Bogura', 'Amar Bogura', 'বগুড়া', 'আমার বগুড়া', 'District Portal', 'Pundravardhana', 'Mahasthangarh', 'Bogura Doi'],
  authors: [{ name: 'Amar Bogura Civic Initiative' }],
  openGraph: {
    title: 'আমার বগুড়া | Amar Bogura',
    description: 'বগুড়া জেলা পোর্টাল ও কমিউনিটি প্ল্যাটফর্ম',
    type: 'website',
    locale: 'bn_BD',
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
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome 6 for exact iconography */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="pb-20 md:pb-0 antialiased selection:bg-emerald-700 selection:text-white">
        <LanguageProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
