'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'bn' | 'en';

export const translations = {
  bn: {
    topNoticeLabel: 'জরুরি হটলাইন:',
    topNoticeText: 'জাতীয় জরুরি সেবা ৯৯৯ · বগুড়া জেলা পুলিশ কন্ট্রোল রুম: ০১৩২০-১২৬৪৯৮ · ফায়ার সার্ভিস: ০১৭৩০-০০২৪২১',
    divisionBadge: 'রাজশাহী বিভাগ, বাংলাদেশ',
    brandTitle: 'আমার বগুড়া',
    brandSubtitle: 'Bogura District · রাজশাহী বিভাগ',
    navHome: 'হোম',
    navServices: 'সব সেবা',
    navUpazilas: 'উপজেলা',
    navHealthcare: 'স্বাস্থ্যসেবা',
    navExplore: 'দর্শনীয় স্থান',
    navHistory: 'ইতিহাস',
    navCommunity: 'কমিউনিটি',
    searchPlaceholderBtn: 'খুঁজুন...',
    heroBadge: 'বগুড়া জেলা · রাজশাহী বিভাগ',
    heroHeadline: 'করতোয়ার তীরে প্রাচীন পুণ্ড্রবর্ধনের ঐতিহ্যবাহী জনপদ',
    heroSubtitle: 'উপজেলা, ইউনিয়ন, হাসপাতাল, দর্শনীয় স্থান ও জরুরি সেবার তথ্য এক জায়গায়। উত্তরবঙ্গের প্রবেশদ্বার বগুড়ার নাগরিক ও কমিউনিটি ডিজিটাল প্ল্যাটফর্ম।',
    ctaHospitals: 'হাসপাতাল খুঁজুন',
    ctaUpazilas: 'উপজেলা দেখুন',
    ctaBlood: 'রক্তদাতা খুঁজুন',
    qlHospitalTitle: 'হাসপাতাল',
    qlHospitalDesc: 'সরকারি ও বেসরকারি স্বাস্থ্যকেন্দ্র',
    qlEmergencyTitle: 'জরুরি নম্বর',
    qlEmergencyDesc: '৯৯৯, পুলিশ, ফায়ার ও অ্যাম্বুলেন্স',
    qlUpazilaTitle: '১২টি উপজেলা',
    qlUpazilaDesc: 'পৌরসভা ও ১০৮টি ইউনিয়নের তথ্য',
    qlExploreTitle: 'দর্শনীয় স্থান',
    qlExploreDesc: 'মহাস্থানগড়, বেহুলার বাসর ও ঐতিহ্য',
    sec01Badge: 'সেকশন ০১ · নাগরিক ডিরেক্টরি',
    sec01Title: 'সব সেবা এক নজরে',
    sec01Subtitle: 'বগুড়া জেলার প্রয়োজনীয় সরকারি, স্বাস্থ্য, ঐতিহ্য ও প্রশাসনিক সেবাসমূহ',
    verifiedBadge: 'যাচাইকৃত জেলা তথ্যভাণ্ডার',
    srvHospital: 'হাসপাতাল',
    srvHospitalSub: 'শজিমেক, মোহাম্মদ আলী ও উপজেলা স্বাস্থ্য কমপ্লেক্স',
    srvDiagnostic: 'ডায়াগনস্টিক',
    srvDiagnosticSub: 'পপুলার, ইবনে সিনা, ল্যাবএইড ও আধুনিক প্যাথলজি',
    srvEmergency: 'জরুরি নম্বর',
    srvEmergencySub: 'পুলিশ, ফায়ার সার্ভিস, অ্যাম্বুলেন্স ও বিদ্যুৎ অফিস',
    srvUpazila: 'উপজেলা ও পৌরসভা',
    srvUpazilaSub: '১২টি উপজেলা, ১২টি পৌরসভা ও ১০৮টি ইউনিয়ন',
    srvExplore: 'দর্শনীয় স্থান',
    srvExploreSub: 'মহাস্থানগড়, গোকুল মেধ, খেরুয়া মসজিদ ও যমুনা ঘাট',
    srvHistory: 'জেলার ইতিহাস',
    srvHistorySub: 'পুণ্ড্রনগর থেকে ১৮২১ সালে জেলা প্রতিষ্ঠা ও মুক্তিযুদ্ধ',
    srvStats: 'মানচিত্র ও পরিসংখ্যান',
    srvStatsSub: 'আয়তন, জনসংখ্যা, নদ-নদী ও ভৌগোলিক পরিচিতি',
    srvDoi: 'বগুড়ার দই ও ঐতিহ্য',
    srvDoiSub: 'জিআই স্বীকৃত বগুড়ার দই, কটকটি ও স্থানীয় ব্যবসা',
    sec02Badge: 'সেকশন ০২ · নাগরিক সহযোগিতা',
    sec02Title: 'কমিউনিটি সেবা',
    sec02Subtitle: 'রক্তদাতা খুঁজুন, টিউশন, বাসা ভাড়া, স্থানীয় দক্ষ কর্মী ও বগুড়ার ঐতিহ্যবাহী ব্যবসা',
    btnPostCommunity: 'তথ্য যুক্ত করুন / অনুরোধ করুন',
    tabBlood: 'রক্তদাতা',
    tabTuition: 'টিউশন',
    tabRent: 'ভাড়া',
    tabJobs: 'কাজ ও দক্ষতা',
    tabBusiness: 'ব্যবসা ও ঐতিহ্য',
    upzBadge: 'প্রশাসনিক কাঠামো',
    upzTitle: 'বগুড়া জেলার ১২টি উপজেলা',
    upzSubtitle: 'যেকোনো উপজেলায় ক্লিক করে আয়তন, ইউনিয়ন, পৌরসভা ও উল্লেখযোগ্য বৈশিষ্ট্য জানুন',
    sec03Badge: 'সেকশন ০৩ · স্বাস্থ্য ও জরুরি',
    sec03Title: 'হাসপাতাল ও ডায়াগনস্টিক ডিরেক্টরি',
    sec03Subtitle: 'বগুড়ার প্রধান সরকারি মেডিকেল কলেজ, জেলা সদর হাসপাতাল ও বেসরকারি স্বাস্থ্যকেন্দ্র',
    emgBadge: '২৪/৭ জরুরি সহায়তা',
    emgTitle: 'বগুড়া জেলার জরুরি টেলিফোন নম্বরসমূহ',
    expBadge: 'পর্যটন ও প্রত্নতত্ত্ব',
    expTitle: 'বগুড়ার দর্শনীয় স্থান ও ঐতিহ্য',
    expSubtitle: 'আড়াই হাজার বছরের প্রাচীন সভ্যতা, বৌদ্ধ বিহার, সুলতানি মসজিদ ও করতোয়া-যমুনার প্রাকৃতিক সৌন্দর্য',
    hisBadge: 'ঐতিহাসিক পরিক্রমা',
    hisTitle: 'পুণ্ড্রবর্ধন থেকে আধুনিক বগুড়া',
    viewAllUpazilasBtn: 'সম্পূর্ণ উপজেলা পাতা',
    bcHome: 'হোম',
    bcUpazilas: 'উপজেলা',
    upzPageEyebrow: 'উপজেলা ও ইউনিয়ন',
    upzPageTitle: 'বগুড়া জেলার উপজেলা',
    upzPageSubtitle: 'বারোটি উপজেলা, তাদের ইউনিয়ন, আয়তন ও ইতিহাস। মানচিত্রে ক্লিক করে যেকোনো উপজেলায় যান।',
    statUpzLabel: 'মোট উপজেলা',
    statUpzVal: '১২টি',
    statUnionLabel: 'মোট ইউনিয়ন',
    statUnionVal: '১০৮টি',
    statPouraLabel: 'পৌরসভা',
    statPouraVal: '১২টি',
    statAreaLabel: 'মোট আয়তন',
    statAreaVal: '২,৮৯৮.৬৮ কিমি²',
    mapCardTitle: 'বগুড়া জেলার প্রশাসনিক মানচিত্র',
    interactiveMapBtn: 'ইন্টারেক্টিভ মানচিত্রে দেখুন'
  },
  en: {
    topNoticeLabel: 'Emergency Hotline:',
    topNoticeText: 'National Emergency 999 · Bogura District Police Control: 01320-126498 · Fire Service: 01730-002421',
    divisionBadge: 'Rajshahi Division, Bangladesh',
    brandTitle: 'Amar Bogura',
    brandSubtitle: 'আমার বগুড়া · Rajshahi Division',
    navHome: 'Home',
    navServices: 'Services',
    navUpazilas: 'Upazilas',
    navHealthcare: 'Healthcare',
    navExplore: 'Explore',
    navHistory: 'History',
    navCommunity: 'Community',
    searchPlaceholderBtn: 'Search...',
    heroBadge: 'Bogura District · Rajshahi Division',
    heroHeadline: 'Historic Land of Ancient Pundravardhana on the Banks of Karatoya',
    heroSubtitle: 'Upazilas, unions, hospitals, heritage landmarks, and emergency directories in one place — the civic digital portal for the Gateway to North Bengal.',
    ctaHospitals: 'Find Hospitals',
    ctaUpazilas: 'Explore Upazilas',
    ctaBlood: 'Find Blood Donors',
    qlHospitalTitle: 'Hospitals',
    qlHospitalDesc: 'Govt & Private Medical Centers',
    qlEmergencyTitle: 'Emergency',
    qlEmergencyDesc: '999, Police, Fire & Ambulance',
    qlUpazilaTitle: '12 Upazilas',
    qlUpazilaDesc: 'Pourashavas & 108 Unions Info',
    qlExploreTitle: 'Explore Bogura',
    qlExploreDesc: 'Mahasthangarh, Behula & Heritage',
    sec01Badge: 'SECTION 01 · CIVIC DIRECTORY',
    sec01Title: 'All Services at a Glance',
    sec01Subtitle: 'Essential government, healthcare, heritage, and administrative services of Bogura District',
    verifiedBadge: 'Verified District Directory',
    srvHospital: 'Hospitals',
    srvHospitalSub: 'SZRMC, Mohammad Ali Hospital & Upazila Complexes',
    srvDiagnostic: 'Diagnostics',
    srvDiagnosticSub: 'Popular, Ibn Sina, Labaid & Pathology Labs',
    srvEmergency: 'Emergency Numbers',
    srvEmergencySub: 'Police, Fire Service, Ambulance & Power Office',
    srvUpazila: 'Upazilas & Pourashavas',
    srvUpazilaSub: '12 Upazilas, 12 Pourashavas & 108 Unions',
    srvExplore: 'Tourist Landmarks',
    srvExploreSub: 'Mahasthangarh, Gokul Medh, Kherua Mosque & Jamuna',
    srvHistory: 'District History',
    srvHistorySub: 'From Pundranagara to 1821 District & Liberation War',
    srvStats: 'Map & Statistics',
    srvStatsSub: 'Area, population, rivers & geographic profile',
    srvDoi: 'Bogura Doi & Heritage',
    srvDoiSub: 'GI-certified Bogura Doi, Kotkoti & Local Businesses',
    sec02Badge: 'SECTION 02 · CITIZEN NETWORK',
    sec02Title: 'Community Services',
    sec02Subtitle: 'Find blood donors, tuition, house rentals, local skilled workers, and iconic Bogura businesses',
    btnPostCommunity: 'Add Listing / Request',
    tabBlood: 'Blood Donors',
    tabTuition: 'Tuition',
    tabRent: 'Rentals',
    tabJobs: 'Jobs & Skills',
    tabBusiness: 'Business & Doi',
    upzBadge: 'ADMINISTRATIVE STRUCTURE',
    upzTitle: '12 Upazilas of Bogura District',
    upzSubtitle: 'Click any upazila to inspect area, unions, pourashavas, and notable landmarks',
    sec03Badge: 'SECTION 03 · HEALTH & EMERGENCY',
    sec03Title: 'Hospitals & Diagnostics Directory',
    sec03Subtitle: 'Major government medical colleges, district hospitals, and private healthcare centers in Bogura',
    emgBadge: '24/7 EMERGENCY RESPONSE',
    emgTitle: 'Bogura District Emergency Telephone Numbers',
    expBadge: 'TOURISM & ARCHAEOLOGY',
    expTitle: 'Heritage & Landmarks of Bogura',
    expSubtitle: '2,500-year-old ancient civilization, Buddhist viharas, Sultanate mosques, and riverine beauty',
    hisBadge: 'HISTORICAL TIMELINE',
    hisTitle: 'From Pundravardhana to Modern Bogura',
    viewAllUpazilasBtn: 'Full Upazilas Page',
    bcHome: 'Home',
    bcUpazilas: 'Upazilas',
    upzPageEyebrow: 'UPAZILAS & UNIONS',
    upzPageTitle: 'Upazilas of Bogura District',
    upzPageSubtitle: 'Twelve upazilas, their unions, area, and history. Click on the map or cards to visit any upazila.',
    statUpzLabel: 'Total Upazilas',
    statUpzVal: '12',
    statUnionLabel: 'Total Unions',
    statUnionVal: '108',
    statPouraLabel: 'Pourashavas',
    statPouraVal: '12',
    statAreaLabel: 'Total Area',
    statAreaVal: '2,898.68 km²',
    mapCardTitle: 'Administrative Map of Bogura District',
    interactiveMapBtn: 'View on Interactive Map'
  }
};

type TranslationKey = keyof typeof translations['bn'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('bn');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations['bn'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
