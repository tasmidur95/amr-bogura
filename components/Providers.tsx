'use client';

import React, { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { ToastProvider } from '@/lib/context/ToastContext';
import { CommunityAuthProvider } from '@/lib/context/CommunityAuthContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>
        <CommunityAuthProvider>{children}</CommunityAuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}
