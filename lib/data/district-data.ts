export interface Upazila {
  serialBn: string;
  serialEn: string;
  name: string;
  enName: string;
  area: string;
  areaEn: string;
  unionCount: string;
  unionCountEn: string;
  unions: string;
  pourashava: string;
  pourashavaEn: string;
  hasPourashava: boolean;
  tags: string[];
  postalCode: string;
  rivers: string;
  healthPhone: string;
  landmark: string;
  desc: string;
  enDesc: string;
  historyNote: string;
  unionList: string[];
}

export interface Hospital {
  id?: string;
  name: string;
  enName: string;
  type: 'govt' | 'private' | 'diagnostic';
  typeLabel: string;
  address: string;
  phone: string;
  emergency: string;
}

export interface EmergencyContact {
  title: string;
  number: string;
  icon: string;
}

export interface ExploreSpot {
  title: string;
  enTitle: string;
  location: string;
  tag: string;
  desc: string;
  icon: string;
  color: string;
}

export interface CommunityPost {
  id: string;
  category: 'blood' | 'tuition' | 'rent' | 'jobs' | 'business';
  name: string;
  group?: string; // For blood
  role?: string;  // For blood
  badge?: string; // For tuition, rent, jobs, business
  upazila: string;
  detail: string;
  phone: string;
  created_at?: string;
  isApproved?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  contributorName?: string;
  contributorPhone?: string;
  rejectReason?: string;
  // Blood module (blood_donors / blood_requests are separate records; the feed merges them for display)
  kind?: 'blood_donor' | 'blood_request';
  hospital?: string;
  units?: number;
  neededBy?: string;
  urgency?: 'normal' | 'urgent' | 'critical';
  fulfilment?: 'open' | 'fulfilled' | 'cancelled';
  lastDonated?: string;
}

export interface SiteContent {
  topNoticeLabel: string;
  topNoticeText: string;
  divisionBadge: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  coverImageUrl: string;
  historyBadge: string;
  historyTitle: string;
  historySummary: string;
  historyPeriod: string;
  footerText: string;
  stats: {
    upazilas: string;
    unions: string;
    villages: string;
    population: string;
  };
}

export const defaultSiteContent: SiteContent = {
  topNoticeLabel: 'জরুরি বিজ্ঞপ্তি',
  topNoticeText: 'বগুড়া জেলা তথ্য বাতায়নে স্বাগতম — আড়াই হাজার বছরের পুণ্ড্রনগরীর ডিজিটাল সেবা ও তথ্য হাব।',
  divisionBadge: 'রাজশাহী বিভাগ · উত্তরবঙ্গ',
  heroBadge: 'করতোয়া বিধৌত প্রাচীন পুণ্ড্রবর্ধন',
  heroTitle: 'আমার বগুড়া',
  heroSubtitle: 'আড়াই হাজার বছরের ইতিহাস ও ঐতিহ্যে সমৃদ্ধ পুণ্ড্রনগরী। ১২টি উপজেলার পূর্ণাঙ্গ প্রশাসনিক তথ্য, জরুরি স্বাস্থ্যসেবা, রক্তদাতা নেটওয়ার্ক ও নাগরিক সেবায় একটি সমন্বিত ডিজিটাল বাতায়ন।',
  coverImageUrl: '/images/amar-bogura-cover.jpg',
  historyBadge: 'আড়াই হাজার বছরের গৌরবগাথা',
  historyTitle: 'প্রাচীন পুণ্ড্রনগর থেকে আধুনিক বগুড়া',
  historySummary: 'করতোয়া নদীর তীরে গড়ে ওঠা পুণ্ড্রবর্ধনের রাজধানী মহাস্থানগড় প্রাচীন বাংলার সর্বাপেক্ষা সমৃদ্ধ সুরক্ষিত নগর। মৌর্য, গুপ্ত, পাল ও সেন আমলের শিলালিপি, টেরাকোটা ফলক ও সুলতানি স্থাপত্যে সমৃদ্ধ এই ঐতিহাসিক জনপদ।',
  historyPeriod: 'খ্রিস্টপূর্ব ৩য় শতক থেকে বর্তমান',
  footerText: 'করতোয়া বিধৌত প্রাচীন পুণ্ড্রবর্ধনের ইতিহাস, ১২টি উপজেলার তথ্য, জরুরি স্বাস্থ্যসেবা, রক্তদাতা নেটওয়ার্ক ও স্থানীয় কমিউনিটিকে এক সুতোয় গাঁথার একটি নাগরিক উদ্যোগ।',
  stats: {
    upazilas: '১২টি',
    unions: '১০৮টি',
    villages: '২,৬৯২টি',
    population: '৩৫+ লক্ষ'
  }
};

export const upazilasData: Upazila[] = [
  {
    serialBn: '০১',
    serialEn: '01',
    name: 'বগুড়া সদর',
    enName: 'Bogura Sadar',
    area: '১৭৬.৫৮ বর্গকিমি',
    areaEn: '176.58 sq km',
    unionCount: '১১টি',
    unionCountEn: '11 Unions',
    unions: '১১টি ইউনিয়ন',
    pourashava: 'বগুড়া পৌরসভা (১টি)',
    pourashavaEn: 'Bogura Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'heritage'],
    postalCode: '৫৮০০',
    rivers: 'করতোয়া নদী',
    healthPhone: '051-66550',
    landmark: 'নবাব প্যালেস, সাতমাথা, এডওয়ার্ড পার্ক, বগুড়া জিলা স্কুল',
    desc: 'বগুড়া জেলার প্রশাসনিক, বাণিজ্যিক ও শিক্ষাকেন্দ্র। করতোয়া নদীর তীরে অবস্থিত উত্তরবঙ্গের প্রাণকেন্দ্র ও ব্যস্ততম নগরী।',
    enDesc: 'The administrative, commercial, and educational hub of Bogura District situated along the Karatoya River.',
    historyNote: '১৮২১ সালে বগুড়া জেলা প্রতিষ্ঠার পর থেকে সদর উপজেলা উত্তরবঙ্গের ব্যবসা-বাণিজ্য, শিক্ষা ও প্রশাসনের কেন্দ্রবিন্দু হিসেবে গড়ে ওঠে। সাতমাথা ও নবাব প্যালেস এই শহরের ঐতিহাসিক সাক্ষী।',
    unionList: ['ফাপোর', 'সাবগ্রাম', 'নিশিন্দারা', 'এরুলিয়া', 'রাজাপুর', 'শাখারিয়া', 'শেখেরকোলা', 'গোকুল', 'নুনগোলা', 'লাহিড়ীপাড়া', 'নামুজা']
  },
  {
    serialBn: '০২',
    serialEn: '02',
    name: 'শিবগঞ্জ',
    enName: 'Shibganj',
    area: '৩১৫.৩৩ বর্গকিমি',
    areaEn: '315.33 sq km',
    unionCount: '১২টি',
    unionCountEn: '12 Unions',
    unions: '১২টি ইউনিয়ন',
    pourashava: 'শিবগঞ্জ পৌরসভা (১টি)',
    pourashavaEn: 'Shibganj Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'heritage'],
    postalCode: '৫৮১০',
    rivers: 'করতোয়া ও নাগর নদী',
    healthPhone: '01730-324763',
    landmark: 'মহাস্থানগড়, বেহুলার বাসর ঘর (গোকুল মেধ), ভাসু বিহার, মহাস্থানের কটকটি',
    desc: 'প্রাচীন পুণ্ড্রবর্ধনের রাজধানী মহাস্থানগড় ও আড়াই হাজার বছরের প্রত্নতাত্ত্বিক নিদর্শনে সমৃদ্ধ ঐতিহ্যবাহী জনপদ।',
    enDesc: 'Home to Mahasthangarh, the 3rd-century BCE capital of ancient Pundravardhana, Gokul Medh, and Vasu Vihara.',
    historyNote: 'খ্রিস্টপূর্ব তৃতীয় শতাব্দীর মৌর্য যুগ থেকে পাল ও সেন আমল পর্যন্ত শিবগঞ্জের মহাস্থানগড় ছিল বাংলার অন্যতম প্রধান রাজধানী ও বৌদ্ধ জ্ঞানচর্চার কেন্দ্র।',
    unionList: ['ময়দানহাট্টা', 'কিচক', 'আটমূল', 'পিরব', 'মাঝিহট্ট', 'বুড়িগঞ্জ', 'বিহার', 'শিবগঞ্জ', 'দেউলী', 'সৈয়দপুর', 'মোকামতলা', 'রায়নগর']
  },
  {
    serialBn: '০৩',
    serialEn: '03',
    name: 'শেরপুর',
    enName: 'Sherpur',
    area: '২৯৬.২৭ বর্গকিমি',
    areaEn: '296.27 sq km',
    unionCount: '১০টি',
    unionCountEn: '10 Unions',
    unions: '১০টি ইউনিয়ন',
    pourashava: 'শেরপুর পৌরসভা (১টি)',
    pourashavaEn: 'Sherpur Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'heritage'],
    postalCode: '৫৮৪০',
    rivers: 'করতোয়া ও বাঙালি নদী',
    healthPhone: '01730-324762',
    landmark: 'ঐতিহাসিক খেরুয়া মসজিদ (১৫৮২), ভবানীপুর শক্তিপীঠ, শাহ বন্দেগী মাজার, দই শিল্প',
    desc: 'সুলতানি স্থাপত্য খেরুয়া মসজিদ, ভবানীপুর মন্দির এবং জিআই স্বীকৃত বগুড়ার দই উৎপাদনের অন্যতম ঐতিহাসিক কেন্দ্র।',
    enDesc: 'Renowned for the 1582 Sultanate-era Kherua Mosque, Bhabanipur Shaktipeeth, and authentic Bogura Doi craftsmanship.',
    historyNote: 'মুঘল ও সুলতানি আমলে শেরপুর ছিল একটি গুরুত্বপূর্ণ সামরিক ও প্রশাসনিক ঘাঁটি। ১৫৮২ সালে নির্মিত খেরুয়া মসজিদ এখানকার স্থাপত্য ঐতিহ্যের উজ্জ্বল নিদর্শন।',
    unionList: ['কুসুম্বী', 'গাড়ীদহ', 'খামারকান্দি', 'খানপুর', 'মির্জাপুর', 'বিশালপুর', 'ভবানীপুর', 'সুঘাট', 'সীমাবাড়ী', 'শাহবন্দেগী']
  },
  {
    serialBn: '০৪',
    serialEn: '04',
    name: 'সোনাতলা',
    enName: 'Sonatala',
    area: '১৫৬.৭৫ বর্গকিমি',
    areaEn: '156.75 sq km',
    unionCount: '৭টি',
    unionCountEn: '7 Unions',
    unions: '৭টি ইউনিয়ন',
    pourashava: 'সোনাতলা পৌরসভা (১টি)',
    pourashavaEn: 'Sonatala Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'jamuna'],
    postalCode: '৫৮২৬',
    rivers: 'যমুনা ও বাঙালি নদী',
    healthPhone: '01730-324764',
    landmark: 'যমুনা ও বাঙালি নদীর মোহনা, হরিখালী হাট, সোনাতলা রেলস্টেশন',
    desc: 'বগুড়ার উত্তর-পূর্বাঞ্চলে যমুনা ও বাঙালি নদীর মোহনায় অবস্থিত উর্বর কৃষি ও নদীমাতৃক জনপদ।',
    enDesc: 'A fertile riverine upazila in northeastern Bogura situated at the confluence of the Jamuna and Bangali rivers.',
    historyNote: 'যমুনা ও বাঙালি নদীর পলিগঠিত উর্বর ভূমিতে ধান, পাট ও মরিচ চাষের জন্য সোনাতলা সুপ্রাচীনকাল থেকেই প্রসিদ্ধ।',
    unionList: ['সোনাতলা সদর', 'বালুয়া', 'দিগদাইড়', 'জোড়গাছা', 'মধুপুর', 'তেকানী চুকাইনগর', 'পাকুল্লা']
  },
  {
    serialBn: '০৫',
    serialEn: '05',
    name: 'সারিয়াকান্দি',
    enName: 'Sariakandi',
    area: '৪০৮.৫০ বর্গকিমি',
    areaEn: '408.50 sq km',
    unionCount: '১২টি',
    unionCountEn: '12 Unions',
    unions: '১২টি ইউনিয়ন',
    pourashava: 'সারিয়াকান্দি পৌরসভা (১টি)',
    pourashavaEn: 'Sariakandi Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'jamuna'],
    postalCode: '৫৮৩০',
    rivers: 'যমুনা, বাঙালি ও সুখদহ নদী',
    healthPhone: '01730-324761',
    landmark: 'প্রেম যমুনার ঘাট, কালিতলা গ্রোয়েন বাঁধ, যমুনার চরাঞ্চল',
    desc: 'আয়তনে বগুড়ার বৃহত্তম উপজেলা; যমুনা নদীর বিশাল জলরাশি, চরাঞ্চল কৃষি ও প্রাকৃতিক সৌন্দর্যের লীলাভূমি।',
    enDesc: 'The largest upazila in Bogura by area, celebrated for the sweeping Jamuna riverfront, Kalitala Groin, and char agriculture.',
    historyNote: 'যমুনা নদীর তীরবর্তী সারিয়াকান্দি নৌবাণিজ্য, মৎস্য সম্পদ এবং চরাঞ্চলের ভুট্টা ও মরিচ উৎপাদনে জেলার অর্থনীতিতে বড় ভূমিকা রাখে।',
    unionList: ['সারিয়াকান্দি সদর', 'নারচী', 'ভেলাবাড়ী', 'চন্দনবাইশা', 'কুতুবপুর', 'কর্ণিবাড়ী', 'বোহাইল', 'হাটশেরপুর', 'কাজলা', 'চালুয়াবাড়ী', 'কামালপুর', 'ফুলবাড়ী']
  },
  {
    serialBn: '০৬',
    serialEn: '06',
    name: 'গাবতলী',
    enName: 'Gabtali',
    area: '২৩৯.৬০ বর্গকিমি',
    areaEn: '239.60 sq km',
    unionCount: '১১টি',
    unionCountEn: '11 Unions',
    unions: '১১টি ইউনিয়ন',
    pourashava: 'গাবতলী পৌরসভা (১টি)',
    pourashavaEn: 'Gabtali Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'jamuna'],
    postalCode: '৫৮২০',
    rivers: 'বাঙালি ও ইছামতি নদী',
    healthPhone: '01730-324757',
    landmark: 'বাগবাড়ী, ঐতিহ্যবাহী পোড়াদহ মাছের মেলা, সুখানপুকুর',
    desc: 'বাঙালি ও ইছামতি নদী বিধৌত কৃষি সমৃদ্ধ উপজেলা এবং শতবর্ষী ঐতিহ্যবাহী পোড়াদহ মেলার জন্য বিখ্যাত।',
    enDesc: 'An agriculture-rich upazila along the Bangali and Ichamati rivers, famous for Bagbari and the traditional Poradaha Fair.',
    historyNote: 'প্রতি বছর মাঘ মাসের শেষ বুধবার অনুষ্ঠিত ঐতিহ্যবাহী পোড়াদহ মেলা এবং সবজি ও ধান উৎপাদনের জন্য গাবতলী দেশব্যাপী পরিচিত।',
    unionList: ['গাবতলী সদর', 'নেপালতলী', 'সোনাবাড়ী', 'কাগইল', 'রামেশ্বরপুর', 'মহিষাবান', 'দক্ষিণপাড়া', 'দুর্গাহাটা', 'বালিয়াদিঘী', 'নাড়ুয়ামালা', 'নশিপুর']
  },
  {
    serialBn: '০৭',
    serialEn: '07',
    name: 'ধুনট',
    enName: 'Dhunat',
    area: '২৪৭.৭৩ বর্গকিমি',
    areaEn: '247.73 sq km',
    unionCount: '১০টি',
    unionCountEn: '10 Unions',
    unions: '১০টি ইউনিয়ন',
    pourashava: 'ধুনট পৌরসভা (১টি)',
    pourashavaEn: 'Dhunat Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'jamuna'],
    postalCode: '৫৮৫০',
    rivers: 'যমুনা, বাঙালি ও ইছামতি নদী',
    healthPhone: '01730-324756',
    landmark: 'যমুনা স্পার বাঁধ (শহরাবাড়ী ঘাট), গোসাইবাড়ী, এলাঙ্গী',
    desc: 'বগুড়ার দক্ষিণ-পূর্বাঞ্চলে যমুনা ও বাঙালি অববাহিকার শান্ত, সুজলা-সুফলা কৃষি ও মৎস্য সমৃদ্ধ উপজেলা।',
    enDesc: 'Situated in southeastern Bogura within the Jamuna and Bangali river basin, known for scenic river spurs and agriculture.',
    historyNote: 'যমুনা ও বাঙালি নদীর তীরবর্তী ধুনট উপজেলা প্রাচীন নৌপথ ও উর্বর ফসলি জমির জন্য সমৃদ্ধ এক জনপদ।',
    unionList: ['ধুনট সদর', 'নিমগাছী', 'চিকাশী', 'গোসাইবাড়ী', 'ভান্ডারবাড়ী', 'এলাঙ্গী', 'কালেরপাড়া', 'চৌকিবাড়ী', 'মথুরাপুর', 'গোপালনগর']
  },
  {
    serialBn: '০৮',
    serialEn: '08',
    name: 'নন্দীগ্রাম',
    enName: 'Nandigram',
    area: '২৬৫.৪৭ বর্গকিমি',
    areaEn: '265.47 sq km',
    unionCount: '৫টি',
    unionCountEn: '5 Unions',
    unions: '৫টি ইউনিয়ন',
    pourashava: 'নন্দীগ্রাম পৌরসভা (১টি)',
    pourashavaEn: 'Nandigram Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava'],
    postalCode: '৫৮৬০',
    rivers: 'নাগর ও ভদ্রাবতী নদী',
    healthPhone: '01730-324760',
    landmark: 'বিজরুল, ওমরপুর হাট, বরেন্দ্র শস্যভাণ্ডার অঞ্চল',
    desc: 'বগুড়ার দক্ষিণাঞ্চলের প্রধান শস্যভাণ্ডার; বরেন্দ্র ভূমির উর্বর আমন ও বোরো ধান উৎপাদনের জন্য প্রসিদ্ধ।',
    enDesc: 'The southern granary of Bogura situated in the fertile Barind tract, vital for paddy and winter crop production.',
    historyNote: 'বরেন্দ্র অঞ্চলের সমতল ও উর্বর কৃষিভূমি নিয়ে গঠিত নন্দীগ্রাম উপজেলা জেলার খাদ্য উদ্বৃত্ত তৈরিতে অগ্রণী ভূমিকা রাখে।',
    unionList: ['বুড়ইল', 'নন্দীগ্রাম সদর', 'ভাটরা', 'থালতা মাঝগ্রাম', 'ভাটগ্রাম']
  },
  {
    serialBn: '০৯',
    serialEn: '09',
    name: 'কাহালু',
    enName: 'Kahaloo',
    area: '২৪০.৪২ বর্গকিমি',
    areaEn: '240.42 sq km',
    unionCount: '৯টি',
    unionCountEn: '9 Unions',
    unions: '৯টি ইউনিয়ন',
    pourashava: 'কাহালু পৌরসভা (১টি)',
    pourashavaEn: 'Kahaloo Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'heritage'],
    postalCode: '৫৮৭০',
    rivers: 'নাগর নদী',
    healthPhone: '01730-324758',
    landmark: 'যোগীর ভবন আশ্রম ও মন্দির কমপ্লেক্স, নাগর নদী, নারহট্ট',
    desc: 'নাগর নদীর তীরে অবস্থিত উন্নত মানের চাল উৎপাদন ও প্রাচীন স্থাপত্য নিদর্শন যোগীর ভবনের জন্য পরিচিত।',
    enDesc: 'Located along the Nagar River, known for quality rice production and the historic Jogir Bhaban temple complex.',
    historyNote: 'কাহালুর যোগীর ভবন নাথপন্থী সন্ন্যাসীদের প্রাচীন আস্তানা ও টেরাকোটা অলংকৃত মন্দির স্থাপত্যের জন্য প্রত্নতাত্ত্বিকভাবে গুরুত্বপূর্ণ।',
    unionList: ['বীরকেদার', 'কালাই', 'পাইকড়', 'নারহট্ট', 'কাহালু সদর', 'মুরইল', 'দুর্গাপুর', 'জামগ্রাম', 'মালঞ্চা']
  },
  {
    serialBn: '১০',
    serialEn: '10',
    name: 'দুপচাঁচিয়া',
    enName: 'Dupchanchia',
    area: '১৬২.৪৫ বর্গকিমি',
    areaEn: '162.45 sq km',
    unionCount: '৬টি',
    unionCountEn: '6 Unions',
    unions: '৬টি ইউনিয়ন',
    pourashava: '২টি পৌরসভা (দুপচাঁচিয়া ও তালোড়া)',
    pourashavaEn: '2 Pourashavas (Dupchanchia & Talora)',
    hasPourashava: true,
    tags: ['pourashava'],
    postalCode: '৫৮৮০',
    rivers: 'নাগর ও ইছামতি নদী',
    healthPhone: '01730-324755',
    landmark: 'তালোড়া বন্দর, উত্তরবঙ্গের অটো রাইস মিল শিল্পাঞ্চল',
    desc: 'দুটি পৌরসভা সমৃদ্ধ উপজেলা এবং উত্তরবঙ্গের অন্যতম প্রধান চালকল (অটো রাইস মিল) ও শস্য বাণিজ্য কেন্দ্র।',
    enDesc: 'Uniquely home to two pourashavas (Dupchanchia & Talora) and North Bengal’s major modern rice-milling hub.',
    historyNote: 'ব্রিটিশ আমল থেকেই তালোড়া বন্দর ও দুপচাঁচিয়া শস্য প্রক্রিয়াজাতকরণ ও চাল ব্যবসার অন্যতম প্রধান কেন্দ্র হিসেবে পরিচিত।',
    unionList: ['জিয়ানগর', 'চামরুল', 'দুপচাঁচিয়া সদর', 'গুনাহার', 'গোবিন্দপুর', 'তালোড়া']
  },
  {
    serialBn: '১১',
    serialEn: '11',
    name: 'আদমদীঘি',
    enName: 'Adamdighi',
    area: '১৬৮.৮৩ বর্গকিমি',
    areaEn: '168.83 sq km',
    unionCount: '৬টি',
    unionCountEn: '6 Unions',
    unions: '৬টি ইউনিয়ন',
    pourashava: 'সান্তাহার পৌরসভা (১টি)',
    pourashavaEn: 'Santahar Pourashava (1)',
    hasPourashava: true,
    tags: ['pourashava', 'heritage'],
    postalCode: '৫৮৯০',
    rivers: 'রক্তদহ বিল ও তুলসীগঙ্গা নদী',
    healthPhone: '01730-324754',
    landmark: 'সান্তাহার রেলওয়ে জংশন, সান্তাহার সাইলো, রক্তদহ বিল, আদমদীঘি দীঘি',
    desc: 'ঐতিহাসিক সান্তাহার রেলওয়ে জংশন, আধুনিক খাদ্য সাইলো ও রক্তদহ বিলের প্রাকৃতিক সৌন্দর্যের জন্য বিখ্যাত।',
    enDesc: 'Famous for the historic Santahar Railway Junction, grain silo complex, and the scenic Raktadaha Beel wetland.',
    historyNote: '১৮৭৮ সালে প্রতিষ্ঠিত সান্তাহার রেলওয়ে জংশন উত্তরবঙ্গের রেল যোগাযোগের ইতিহাসে এক অবিচ্ছেদ্য অধ্যায়।',
    unionList: ['ছাতিয়ানগ্রাম', 'নশরতপুর', 'আদমদীঘি সদর', 'কুন্দগ্রাম', 'চাঁপাপুর', 'সান্তাহার']
  },
  {
    serialBn: '১২',
    serialEn: '12',
    name: 'শাজাহানপুর',
    enName: 'Shajahanpur',
    area: '২২১.৬৯ বর্গকিমি',
    areaEn: '221.69 sq km',
    unionCount: '৯টি',
    unionCountEn: '9 Unions',
    unions: '৯টি ইউনিয়ন',
    pourashava: 'পৌরসভা নেই (ক্যান্টনমেন্ট ও উপশহর)',
    pourashavaEn: 'No Pourashava (Cantonment & Suburban Hub)',
    hasPourashava: false,
    tags: ['heritage'],
    postalCode: '৫৮০১',
    rivers: 'করতোয়া ও বাঙালি নদী',
    healthPhone: '051-69965',
    landmark: 'বগুড়া সেনানিবাস, শহীদ জিয়াউর রহমান মেডিকেল কলেজ (শজিমেক), মাঝিড়া',
    desc: 'বগুড়া শহরের দক্ষিণ উপকণ্ঠে অবস্থিত ক্যান্টনমেন্ট, মেডিকেল কলেজ ও দ্রুত বর্ধনশীল আবাসিক-বাণিজ্যিক উপজেলা।',
    enDesc: 'Bogura’s youngest upazila (established 2003), housing Bogura Cantonment, SZRMC Hospital, and suburban growth corridors.',
    historyNote: '২০০৩ সালে বগুড়া সদর ও শেরপুর উপজেলার অংশবিশেষ নিয়ে প্রশাসনিক বিকেন্দ্রীকরণের লক্ষ্যে শাজাহানপুর উপজেলা গঠিত হয়।',
    unionList: ['আশেকপুর', 'মাদলা', 'মাঝিড়া', 'আড়িয়া', 'খোট্টাপাড়া', 'চোপীনগর', 'খড়না', 'গোহাইল', 'আমরুল']
  }
];

export const hospitalsData: Hospital[] = [
  {
    "name": "আদমদীঘি উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Adamdighi Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "বগুড়া-নওগাঁ মহাসড়ক, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "জরুরি বিভাগ (২৪ ঘণ্টা) • বহির্বিভাগ (OPD) • আন্তঃবিভাগ (৫০ শয্যা)"
  },
  {
    "name": "বগুড়া (সদর) উপজেলা স্বাস্থ্য ও পরিবার পরিকল্পনা কার্যালয়",
    "enName": "Bogura (Sadar) Upazila Health Office",
    "type": "govt",
    "typeLabel": "Upazila Health Office",
    "address": "ওয়ার্ড নং ১০, বগুড়া পৌরসভা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-66550",
    "emergency": "উপজেলা স্বাস্থ্য প্রশাসন • ইপিআই ও টিকাদান সমন্বয় • প্রাথমিক স্বাস্থ্যসেবা তদারকি"
  },
  {
    "name": "ধুনট উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Dhunat Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "হাসপাতাল রোড, ১ নং ওয়ার্ড, ধুনট পৌরসভা, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "জরুরি বিভাগ (২৪ ঘণ্টা) • বহির্বিভাগ (OPD) • আন্তঃবিভাগ (৫০ শয্যা)"
  },
  {
    "name": "দুপচাঁচিয়া উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Dhupchanchia Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "হাসপাতাল রোড, দুপচাঁচিয়া পৌরসভা, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "জরুরি সেবা (২৪ ঘণ্টা) • অ্যাম্বুলেন্স সার্ভিস • বহির্বিভাগ ও আন্তঃবিভাগ (৫০ শয্যা)"
  },
  {
    "name": "গাবতলী উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Gabtali Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "বগুড়া-গাবতলী সড়ক, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "জরুরি বিভাগ (২৪ ঘণ্টা) • বহির্বিভাগ (OPD) • আন্তঃবিভাগ (৫০ শয্যা)"
  },
  {
    "name": "কাহালু উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Kahaloo Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "বগুড়া-নওগাঁ মহাসড়ক, কাহালু পৌরসভা, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "জরুরি বিভাগ (২৪ ঘণ্টা) • বহির্বিভাগ (OPD) • আন্তঃবিভাগ (৫০ শয্যা)"
  },
  {
    "name": "নন্দীগ্রাম উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Nandigram Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "বিজরুল, ভাটগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "২৪ ঘণ্টা জরুরি সেবা • বহির্বিভাগ • ৫০ শয্যা ইনডোর কেয়ার"
  },
  {
    "name": "সারিয়াকান্দি উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Sariakandi Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "সারিয়াকান্দি সদর, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "জরুরি বিভাগ (২৪ ঘণ্টা) • বহির্বিভাগ (OPD) • ৫০ শয্যা ভর্তি সুবিধা"
  },
  {
    "name": "শাজাহানপুর উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Shajahanpur Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "মাঝিড়া, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "জরুরি সেবা (২৪ ঘণ্টা) • হাইওয়ে দুর্ঘটনা জরুরি ট্রমা প্রাথমিক সেবা • বহির্বিভাগ"
  },
  {
    "name": "শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Sherpur Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "শহীদ ছুনু রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "05029-77047",
    "emergency": "জরুরি বিভাগ (২৪ ঘণ্টা) • বহির্বিভাগ (OPD) • ৫০ শয্যা আন্তঃবিভাগ"
  },
  {
    "name": "শিবগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Shibganj Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "বানাইল, শিবগঞ্জ পৌরসভা, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "05033-69018",
    "emergency": "২৪ ঘণ্টা জরুরি বিভাগ • বহির্বিভাগ • ৫০ শয্যা ইনডোর কেয়ার"
  },
  {
    "name": "সোনাতলা উপজেলা স্বাস্থ্য কমপ্লেক্স",
    "enName": "Sonatala Upazila Health Complex",
    "type": "govt",
    "typeLabel": "Upazila Health Complex",
    "address": "হাসপাতাল রোড, সোনাতলা পৌরসভা, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "জরুরি বিভাগ (২৪ ঘণ্টা) • বহির্বিভাগ (OPD) • ৫০ শয্যা ভর্তি সুবিধা"
  },
  {
    "name": "বগুড়া সিভিল সার্জন কার্যালয়",
    "enName": "Bogra Civil Surgeon Office",
    "type": "govt",
    "typeLabel": "District Health Administration",
    "address": "জলেশ্বরীতলা, ওয়ার্ড নং ৭, বগুড়া পৌরসভা, বগুড়া - ৫৮০০",
    "phone": "02589902130",
    "emergency": "জেলা স্বাস্থ্য প্রশাসন ও সমন্বয় • সিভিল সার্জন মেডিকেল বোর্ড • জরুরি স্বাস্থ্য নিয়ন্ত্রণ কক্ষ (কন্ট্রোল রুম)"
  },
  {
    "name": "বগুড়া জেলা রিজার্ভ ইপিআই স্টোর ও প্রশিক্ষণ কেন্দ্র",
    "enName": "Bogra District Reserve EPI Store & Training Centre",
    "type": "govt",
    "typeLabel": "Vaccine & Cold Chain Logistics",
    "address": "সিভিল সার্জন চত্বর, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "02589902130",
    "emergency": "টিকা ও কোল্ড চেইন সংরক্ষণ • ১২টি উপজেলার টিকা সরবরাহ • স্বাস্থ্য সহকারী ও টিকাদানকারী প্রশিক্ষণ"
  },
  {
    "name": "হাজারদীঘি (নূনগোলা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Hazardighi (Noongola) Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "হাজারদীঘি, নূনগোলা ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • জরুরি প্রাথমিক চিকিৎসা • গর্ভবতী ও প্রসূতি মায়েদের সেবা"
  },
  {
    "name": "মাদারগঞ্জ (লাহিড়ীপাড়া) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Mothergonj Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "মাদারগঞ্জ বাজার, লাহিড়ীপাড়া ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "সাধারণ স্বাস্থ্যসেবা • উপ-সহকারী কমিউনিটি মেডিকেল অফিসার পরামর্শ • প্রসূতি ও ধাত্রীবিদ্যা সেবা"
  },
  {
    "name": "নওদাপাড়া (নিশিন্দারা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Nawdapara (Nishindara) Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "নওদাপাড়া, নিশিন্দারা ইউনিয়ন, বগুড়া-রংপুর মহাসড়ক সংলগ্ন, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "বহির্বিভাগ সেবা (OPD) • প্রাথমিক দুর্ঘটনা ও ট্রমা ড্রেসিং • মা ও শিশু স্বাস্থ্য সেবা"
  },
  {
    "name": "এরুলিয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Erulia Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "এরুলিয়া বাজার, বগুড়া-নওগাঁ সড়ক, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "প্রাথমিক চিকিৎসাসেবা • গর্ভকালীন সেবা (ANC) • প্রসবোত্তর সেবা (PNC)"
  },
  {
    "name": "ফাপোর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Fapor Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ফাপোর বাজার, ফাপোর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • মা ও শিশু স্বাস্থ্য সেবা • টিকা কেন্দ্র"
  },
  {
    "name": "কুন্দগ্রাম ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Kundagram Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "কুন্দগ্রাম বাজার, কুন্দগ্রাম ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "প্রাথমিক চিকিৎসা • গর্ভবতী মায়ের চেকআপ • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "চাঁপাপুর (কাঞ্চনপুর) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Champapur (Kanchanpur) Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "কাঞ্চনপুর, চাঁপাপুর ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • মা ও শিশু পরিচর্যা • ইপিআই টিকাদান"
  },
  {
    "name": "ছাতিয়ানগ্রাম ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Chhatiangram Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ছাতিয়ানগ্রাম রেলগেট সংলগ্ন, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "সাধারণ বহির্বিভাগ • প্রসূতি সেবা • শিশু রোগ প্রতিরোধ ও টিকা"
  },
  {
    "name": "সান্তাহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Santahar Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ছোটকি, সান্তাহার ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৫০",
    "phone": "01730-324620",
    "emergency": "বহির্বিভাগ সেবা • প্রাথমিক স্বাস্থ্য পরামর্শ • মাতৃত্ব ও প্রসবকালীন সেবা"
  },
  {
    "name": "ভান্ডারবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Bhandarbari Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ভান্ডারবাড়ী বাজার, যমুনা তীরবর্তী এলাকা, ভান্ডারবাড়ী, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "চরাঞ্চলের জরুরি প্রাথমিক চিকিৎসা • বন্যা কালীন জরুরি সেবা • প্রসূতি ও মা-শিশু স্বাস্থ্য"
  },
  {
    "name": "গোপালনগর (ছিকর) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Gopalnagar (Chhikar) Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ছিকর, গোপালনগর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • মা ও শিশু পরিচর্যা • টিকা কেন্দ্র"
  },
  {
    "name": "মথুরাপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Mathurapur Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "মথুরাপুর বাজার, মথুরাপুর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "বহির্বিভাগ স্বাস্থ্যসেবা • গর্ভবতী মায়ের পুষ্টি ও চেকআপ • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "এলাঙ্গী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Elangi Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "এলাঙ্গী বাজার, এলাঙ্গী ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "সাধারণ প্রাথমিক চিকিৎসা • মা ও শিশু স্বাস্থ্য সেবা • টিকাদান ও ইপিআই প্রোগ্রাম"
  },
  {
    "name": "গুণাহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Gunahar Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "গুণাহার তালুকদার বাড়ি সড়ক, গুণাহার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "বহির্বিভাগ চিকিৎসাসেবা • জরুরি ফার্স্ট এইড ও ড্রেসিং • প্রসূতি ও শিশু স্বাস্থ্য"
  },
  {
    "name": "তালোড়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Talora Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "তালোড়া রেলওয়ে বাজার, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • মাতৃত্ব ও প্রসবকালীন সেবা • শিশু রোগ প্রতিরোধ ও টিকা"
  },
  {
    "name": "গোবিন্দপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Gobindapur Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "গোবিন্দপুর বাজার, গোবিন্দপুর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "সাধারণ স্বাস্থ্যসেবা • গর্ভবতী চেকআপ • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "চামরুল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Chamrul Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "চামরুল বাজার, চামরুল ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "প্রাথমিক চিকিৎসা • মা ও শিশু পরিচর্যা • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "রামেশ্বরপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Rameshwarpur Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "রামেশ্বরপুর বাজার, রামেশ্বরপুর ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • প্রসূতি ও শিশু স্বাস্থ্য সেবা • নিয়মিত টিকাদান"
  },
  {
    "name": "সোনারায় ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Sonaray Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "সোনারায় বাজার, সোনারায় ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "বহির্বিভাগ চিকিৎসাসেবা • গর্ভবতী চেকআপ ও পরামর্শ • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "দূর্গাহাটা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Durgahata Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "দূর্গাহাটা বাজার, দূর্গাহাটা ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "সাধারণ প্রাথমিক চিকিৎসা • মা ও শিশু পরিচর্যা • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "সুখানপুকুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Sukhanpukur Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "সুখানপুকুর রেল স্টেশন সড়ক, সুখানপুকুর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "বহির্বিভাগ চিকিৎসাসেবা • জরুরি ফার্স্ট এইড • মাতৃত্ব ও নবজাতক স্বাস্থ্য"
  },
  {
    "name": "পিলকুঞ্জ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Pilkunja Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "পিলকুঞ্জ, মুরইল ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "সাধারণ প্রাথমিক চিকিৎসা • গর্ভবতী মায়ের সেবা • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "মালঞ্চা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Malancha Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "মালঞ্চা বাজার, মালঞ্চা ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "বহির্বিভাগ চিকিৎসাসেবা • প্রসূতি ও শিশু স্বাস্থ্য • টিকা কেন্দ্র"
  },
  {
    "name": "নারহট্ট ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Narhatta Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "নারহট্ট বাজার, নারহট্ট ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "সাধারণ স্বাস্থ্যসেবা • মাতৃত্ব ও প্রসবকালীন সেবা • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "দুর্গাপুর (পাইকড়) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Durgapur (Paikar) Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "দুর্গাপুর, পাইকড় ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "বহির্বিভাগ সেবা • মা ও শিশু পরিচর্যা • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "থালতা মাঝগ্রাম (বাশো) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Thalta Majhgram (Basho) Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "বাশো, থালতা মাঝগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "প্রাথমিক চিকিৎসা সেবা • গর্ভবতী মায়ের চেকআপ • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "বুড়ইল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Burail Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "বুড়ইল বাজার, বুড়ইল ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "বহির্বিভাগ চিকিৎসাসেবা • প্রসূতি ও শিশু স্বাস্থ্য • ইপিআই সম্প্রসারিত টিকাদান"
  },
  {
    "name": "ভাটরা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Bhatra Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ভাটরা বাজার, ভাটরা ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "সাধারণ প্রাথমিক চিকিৎসা • মা ও শিশু পরিচর্যা • টিকা প্রদান"
  },
  {
    "name": "নন্দীগ্রাম সদর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Nandigram Sadar Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ওমরপুর, নন্দীগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "বহির্বিভাগ সেবা • মাতৃত্ব ও প্রসবকালীন সেবা • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "হাটফুলবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Hatfulbari Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "হাটফুলবাড়ী বাজার, ফুলবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • বন্যাপ্রবণ এলাকার জরুরি চিকিৎসা • মা ও শিশু পরিচর্যা"
  },
  {
    "name": "হাটশেরপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Hatsherpur Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "হাটশেরপুর বাজার, হাটশেরপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "প্রাথমিক স্বাস্থ্যসেবা • গর্ভবতী মা ও নবজাতক পরিচর্যা • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "জোড়গাছা (ভেলাবাড়ী) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Jorgacha (Bhelabari) Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "জোড়গাছা, ভেলাবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "সাধারণ বহির্বিভাগ • মা ও শিশু স্বাস্থ্য সেবা • টিকা কেন্দ্র"
  },
  {
    "name": "নাওখিলা (চন্দনবাইশা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Nawkhila (Chandanbaisha) Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "নাওখিলা, চন্দনবাইশা বাঁধ এলাকা, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "যমুনা চরাঞ্চলের জরুরি স্বাস্থ্যসেবা • গর্ভবতী মায়ের চেকআপ • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "আড়িয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Aria Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "আড়িয়া বাজার, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "সাধারণ বহির্বিভাগ • হাইওয়ে দুর্ঘটনা প্রাথমিক ড্রেসিং • মা ও শিশু পরিচর্যা"
  },
  {
    "name": "মাদলা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Madla Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "মাদলা বাজার, মাদলা ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "প্রাথমিক স্বাস্থ্যসেবা • গর্ভবতী চেকআপ • ইপিআই সম্প্রসারিত টিকাদান"
  },
  {
    "name": "গোহাইল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Gohail Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "গোহাইল বাজার, গোহাইল ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "সাধারণ বহির্বিভাগ • প্রসূতি ও শিশু স্বাস্থ্য সেবা • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "আমরুল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Amrool Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ডেমাজানী বাজার, আমরুল ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "সাধারণ প্রাথমিক চিকিৎসা • মা ও শিশু পরিচর্যা • টিকা কেন্দ্র"
  },
  {
    "name": "ভবানীপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Bhabanipur Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "ভবানীপুর বাজার ও শক্তিপীঠ সড়ক, ভবানীপুর, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "সাধারণ বহির্বিভাগ • প্রসূতি ও শিশু স্বাস্থ্য সেবা • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "সীমাবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Shimabari Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "সীমাবাড়ী বাজার, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "মহাসড়ক সংলগ্ন জরুরি ট্রমা ড্রেসিং • সাধারণ বহির্বিভাগ • মা ও শিশু পরিচর্যা"
  },
  {
    "name": "মির্জাপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Mirzapur Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "মির্জাপুর বাজার, মির্জাপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "সাধারণ প্রাথমিক চিকিৎসা • গর্ভবতী মা ও নবজাতক সেবা • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "গাড়ীদহ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Garidaha Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "কালসীমটি, আরডিএ সংলগ্ন, গাড়ীদহ, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "বহির্বিভাগ চিকিৎসাসেবা • মাতৃত্ব ও প্রসবকালীন সেবা • টিকা কেন্দ্র"
  },
  {
    "name": "মোকামতলা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Mokamtala Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "মোকামতলা বাজার, রংপুর মহাসড়ক সংলগ্ন, মোকামতলা, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "মহাসড়ক সংলগ্ন জরুরি ট্রমা ড্রেসিং • সাধারণ বহির্বিভাগ সেবা • প্রসূতি ও শিশু স্বাস্থ্য"
  },
  {
    "name": "বুড়িগঞ্জ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Buriganj Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "বুড়িগঞ্জ বাজার, বুড়িগঞ্জ ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "সাধারণ স্বাস্থ্যসেবা • গর্ভবতী মায়ের চেকআপ • ইপিআই সম্প্রসারিত টিকাদান"
  },
  {
    "name": "দেউলী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Deuli Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "দেউলী বাজার, দেউলী ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • মা ও শিশু পরিচর্যা • টিকা কেন্দ্র"
  },
  {
    "name": "বিহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Bihar Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "বিহার বাজার, ভাসু বিহার সংলগ্ন, বিহার, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "ঐতিহাসিক জনপদের সাধারণ স্বাস্থ্যসেবা • প্রসূতি ও শিশু স্বাস্থ্য • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "দিগদাইড় ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Digdair Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "দিগদাইড় বাজার, দিগদাইড় ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "সাধারণ প্রাথমিক চিকিৎসা • গর্ভবতী মা ও নবজাতক সেবা • ইপিআই নিয়মিত টিকাদান"
  },
  {
    "name": "মধুপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Madhupur Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "মধুপুর বাজার, মধুপুর ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসা • মা ও শিশু পরিচর্যা • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "পাকুল্লা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Pakulla Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "পাকুল্লা বাজার, যমুনা নদী সংলগ্ন এলাকা, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "যমুনা চরাঞ্চলের জরুরি স্বাস্থ্যসেবা • বন্যা প্রতিরোধ প্রাথমিক চিকিৎসা • মা ও শিশু স্বাস্থ্য পরিচর্যা"
  },
  {
    "name": "বালুয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র",
    "enName": "Balua Union Health Sub Center",
    "type": "govt",
    "typeLabel": "Union Health Sub-Centre",
    "address": "বালুয়া হাট, বালুয়া ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "সাধারণ বহির্বিভাগ চিকিৎসাসেবা • প্রসূতি ও মা-শিশু স্বাস্থ্য • ইপিআই সম্প্রসারিত টিকাদান"
  },
  {
    "name": "সাবগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Sabgram Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "সাবগ্রাম বাজার সংলগ্ন, সাবগ্রাম ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01715-632145",
    "emergency": "প্রসূতি ও গর্ভকালীন সেবা (ANC) • স্বাভাবিক প্রসব সেবা (২৪/৭ ডেলিভারি) • প্রসবোত্তর সেবা (PNC)"
  },
  {
    "name": "শাকপালা (রাজাপুর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Shakpala (Rajapur) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "শাকপালা, রাজাপুর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "শেখেরকোলা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Sekherkola Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "শেখেরকোলা বাজার সংলগ্ন, শেখেরকোলা ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "গর্ভকালীন ও প্রসবোত্তর পরিচর্যা • ২৪/৭ স্বাভাবিক প্রসব • সাধারণ রোগী চিকিৎসাসেবা"
  },
  {
    "name": "বাঘোপাড়া (গোকুল) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Baghopara (Gokul) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "বাঘোপাড়া, গোকুল ইউনিয়ন, বগুড়া-রংপুর মহাসড়ক, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "প্রসূতি সেবা ও স্বাভাবিক প্রসব • গর্ভবতী মায়েদের পুষ্টি কাউন্সেলিং • পরিবার পরিকল্পনা পদ্ধতি সামগ্রী বিতরণ"
  },
  {
    "name": "এরুলিয়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Erulia Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "এরুলিয়া পরিষদ কমপ্লেক্স সংলগ্ন, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "গর্ভকালীন পরীক্ষা (ANC) • ২৪ ঘণ্টা স্বাভাবিক ডেলিভারি • প্রসবোত্তর পরীক্ষা (PNC)"
  },
  {
    "name": "ফাপোর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Fapor Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "ফাপোর পশ্চিমপাড়া, ফাপোর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-458920",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • পরিবার পরিকল্পনা পরামর্শ • কৈশোরকালীন সেবা কর্নার"
  },
  {
    "name": "নসরতপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Nasratpur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "নসরতপুর রেলওয়ে স্টেশন সংলগ্ন, নসরতপুর, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "২৪/৭ স্বাভাবিক প্রসব • গর্ভকালীন যত্ন (ANC) • প্রসবোত্তর যত্ন (PNC)"
  },
  {
    "name": "আদমদীঘি সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Adamdighi Sadar Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "পুরাতন হাসপাতাল রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • পরিবার পরিকল্পনা পদ্ধতি ও কাউন্সেলিং • কৈশোর কর্নার"
  },
  {
    "name": "চাঁপাপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Champapur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "চাঁপাপুর বাজার, চাঁপাপুর ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "গর্ভবতী চেকআপ • স্বাভাবিক ডেলিভারি • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "ছাতিয়ানগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Chhatiangram Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "পরিষদ চত্বর, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "প্রসূতি সেবা • নরমাল ডেলিভারি • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "কুন্দগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kundagram Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কুন্দগ্রাম হাই স্কুল রোড, কুন্দগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০",
    "phone": "01730-324620",
    "emergency": "স্বাভাবিক প্রসব সেবা • মাতৃত্বকালীন পুষ্টি ও সেবা • পরিবার পরিকল্পনা ক্লিনিক"
  },
  {
    "name": "চৌকিবাড়ি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Choukibari Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "চৌকিবাড়ি বাজার, চৌকিবাড়ি ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা) • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "বেড়েরবাড়ি (গোপালনগর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Bererbari (Gopalnagar) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "বেড়েরবাড়ি, গোপালনগর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "নিমগাছি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Nimgachhi Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "নিমগাছি বাজার, নিমগাছি ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "কালেরপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kalerpara Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কালেরপাড়া বাজার, কালেরপাড়া ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "গর্ভবতী চেকআপ • নরমাল ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "এলাঙ্গী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Elangi Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "এলাঙ্গী হাই স্কুল রোড, এলাঙ্গী ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "মথুরাপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Mathurapur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "মথুরাপুর পুরাতন বাজার, মথুরাপুর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "গর্ভকালীন যত্ন • স্বাভাবিক ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "জিয়ানগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Zianagar Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "জিয়ানগর বাজার, জিয়ানগর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "স্বাভাবিক প্রসব সেবা • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "দুপচাঁচিয়া সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Dupchanchia Sadar Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "খাঁতাখালী, দুপচাঁচিয়া সদর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • পরিবার পরিকল্পনা কাউন্সেলিং • কৈশোর কর্নার"
  },
  {
    "name": "গুণাহার ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Gunahar Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "গুণাহার বাজার, গুণাহার ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "স্বাভাবিক প্রসব সেবা • গর্ভকালীন যত্ন • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "গোবিন্দপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Gobindapur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "পরিষদ চত্বর, গোবিন্দপুর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "প্রসূতি সেবা • নরমাল ডেলিভারি • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "চামরুল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Chamrul Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "চামরুল স্কুল রোড, চামরুল ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324622",
    "emergency": "স্বাভাবিক প্রসব সেবা • মাতৃত্বকালীন পুষ্টি ও সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "আগুনাথিরহাট ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Agunatirhat Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "আগুনাথিরহাট বাজার, নারুয়ামালা ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা) • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "বালিয়া দিঘী (কোলাকোপা) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Balia Dighi (Kolakopa) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কোলাকোপা, বালিয়া দিঘী ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "কাগইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kagail Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কাগইল বাজার, কাগইল ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "নাসিপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Nasipur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "নাসিপুর বাজার, নাসিপুর ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "গর্ভবতী চেকআপ • নরমাল ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "নেপালতলী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Nepaltali Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "নেপালতলী বাজার, নেপালতলী ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "মহিষাবান ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Mahishaban Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "পোড়াদহ সংলগ্ন, মহিষাবান ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "গর্ভকালীন যত্ন • স্বাভাবিক ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "মুরইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Murail Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "মুরইল বাজার সংলগ্ন, মুরইল ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "স্বাভাবিক প্রসব সেবা • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "কালাই মাঝপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kalai Majhpara Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "মাঝপাড়া বাজার, কালাই মাঝপাড়া ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • পরিবার পরিকল্পনা পদ্ধতি • কৈশোর কর্নার"
  },
  {
    "name": "জামগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Jamgaon Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "জামগ্রাম বাজার, জামগ্রাম ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "স্বাভাবিক প্রসব সেবা • গর্ভকালীন যত্ন • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "আঘোর (মালঞ্চা) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Aghor (Malancha) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "আঘোর, মালঞ্চা ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "প্রসূতি সেবা • নরমাল ডেলিভারি • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "নারহট্ট ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Narahatta Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "নারহট্ট স্কুল রোড, নারহট্ট ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "স্বাভাবিক প্রসব সেবা • মাতৃত্বকালীন পুষ্টি ও সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "ভাটরা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Bhatra Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "ভাটরা হাই স্কুল রোড, ভাটরা ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা) • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "বুড়ইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Burail Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "বুড়ইল পরিষদ কমপ্লেক্স, বুড়ইল ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "থালতা মাঝগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Thalta Majhgram Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "থালতা বাজার, থালতা মাঝগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "নন্দীগ্রাম সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Nandigram Sadar Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "ওমরপুর, নন্দীগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324625",
    "emergency": "গর্ভবতী চেকআপ • নরমাল ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "চালুয়াবাড়ী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Chaluabari Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "চালুয়াবাড়ী যমুনা চর এলাকা, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "চরাঞ্চলের জরুরি স্বাভাবিক প্রসব • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "কর্ণিবাড়ী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kornibari Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কর্ণিবাড়ী বাজার, কর্ণিবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "বোহাইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Bohail Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "বোহাইল বাজার, যমুনা চর এলাকা, বোহাইল ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "চরাঞ্চল প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "কাজলা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kazla Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কাজলা বাজার, কাজলা ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "গর্ভবতী চেকআপ • নরমাল ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "কামালপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kamalpur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কামালপুর বাজার, কামালপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "কুতুবপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kutubpur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কুতুবপুর বাজার, কুতুবপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "গর্ভকালীন যত্ন • স্বাভাবিক ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "খোট্টাপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Khottapara Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "খোট্টাপাড়া বাজার, খোট্টাপাড়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা) • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "চোপিনগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Chopinagar Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "চোপিনগর বাজার, চোপিনগর ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "আশেকপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Ashekpur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "রাণীরহাট, আশেকপুর ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "মাঝিড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Majhira Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "মাঝিড়া সেনানিবাস সংলগ্ন, মাঝিড়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "গর্ভবতী চেকআপ • নরমাল ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "আড়িয়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Aria Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "রহিমাবাদ সড়ক, আড়িয়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01701-248646",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "কুসুম্বী (আলতাদিঘী) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kusumbi (Altadighi) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "আলতাদিঘী, কুসুম্বী ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা) • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "বিশালপুর (পাঁচুয়াল) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Bishalpur (Pachual) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "পাঁচুয়াল, বিশালপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "সুঘাট (জয়লাজুয়ান) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Sughat (Joylajowan) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "জয়লাজুয়ান, সুঘাট ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "খামারকান্দি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Khamarkandi Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "খামারকান্দি বাজার, খামারকান্দি ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "গর্ভবতী চেকআপ • নরমাল ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "খানপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Khanpur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "খানপুর বাজার, খানপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "গাড়ীদহ (কালসীমটি) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Garidaha (Kalsimati) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কালসীমটি, আরডিএ সংলগ্ন, গাড়ীদহ ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01701-248647",
    "emergency": "স্বাভাবিক প্রসব সেবা • মাতৃত্বকালীন পুষ্টি ও সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "গঙ্গানগর (সৈয়দপুর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Ganganagar (Sayedpur) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "গঙ্গানগর, সৈয়দপুর ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা) • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "ময়দানহাটা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Maydanhat Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "ময়দানহাটা বাজার, ময়দানহাটা ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "পীরব ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Pirab Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "পীরব বাজার, পীরব ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "রায়নগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Raynagar Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "রায়নগর বাজার, রায়নগর ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "গর্ভবতী চেকআপ • নরমাল ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "আটমূল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Atmul Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "আটমূল বাজার, আটমূল ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "কিচক ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Kichak Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "কিচক বাজার, কিচক ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324628",
    "emergency": "গর্ভকালীন যত্ন • স্বাভাবিক ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "জোড়গাছা (ভেলুরপাড়া) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Jorgacha (Valurpara) Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "ভেলুরপাড়া রেল স্টেশন সংলগ্ন, জোড়গাছা ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা) • গর্ভবতী মা ও নবজাতক সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "দিগদাইড় ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Digdair Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "দিগদাইড় হাই স্কুল রোড, দিগদাইড় ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "মধুপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Madhupur Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "মধুপুর বাজার, মধুপুর ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "প্রসূতি সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "পাকুল্লা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Pakulla Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "পাকুল্লা বাজার, যমুনা বন্যা নিয়ন্ত্রণ বাঁধ, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "চরাঞ্চল প্রসূতি সেবা • নরমাল ডেলিভারি • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "তৈকানী চুকাইনগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র",
    "enName": "Tekani Chukainagar Union Health & Family Welfare Centre",
    "type": "govt",
    "typeLabel": "Union Health & Family Welfare Centre",
    "address": "চুকাইনগর বাজার, যমুনা তীরবর্তী এলাকা, তৈকানী চুকাইনগর, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01701-248649",
    "emergency": "চরাঞ্চল মা ও শিশু স্বাস্থ্য সেবা • স্বাভাবিক প্রসব • পরিবার পরিকল্পনা সেবা"
  },
  {
    "name": "শিকারপুর কমিউনিটি ক্লিনিক",
    "enName": "Shikarpur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "শিকারপুর গ্রাম, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-780101",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ বিতরণ • প্রাথমিক স্বাস্থ্য সেবা • মা ও শিশু স্বাস্থ্য সেবা"
  },
  {
    "name": "কৈচর কমিউনিটি ক্লিনিক",
    "enName": "Koichor Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "কৈচর দক্ষিণপাড়া, ফাঁপোর, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-780102",
    "emergency": "বিনামূল্যে প্রয়োজনীয় ওষুধ • সাধারণ রোগের প্রাথমিক চিকিৎসা • গর্ভবতী ও প্রসূতি সেবা"
  },
  {
    "name": "পলাশবাড়ী কমিউনিটি ক্লিনিক",
    "enName": "Palashbari Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "পলাশবাড়ী গ্রাম, গোকুল, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-780103",
    "emergency": "প্রাথমিক স্বাস্থ্যসেবা • বিনামূল্যে ওষুধ সরবরাহ • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "কাজীপুর কমিউনিটি ক্লিনিক",
    "enName": "Kazipur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "কাজীপুর পশ্চিমপাড়া, লাহিড়ীপাড়া, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-780104",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু স্বাস্থ্য সেবা • স্বাভাবিক প্রসব রেফারেল"
  },
  {
    "name": "বাকশৈল কমিউনিটি ক্লিনিক",
    "enName": "Baksmoil Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বাকশৈল গ্রাম, নামুজা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-780105",
    "emergency": "প্রাথমিক চিকিৎসা • জরুরী রেফারেল সেবা • গর্ভকালীন চেকআপ"
  },
  {
    "name": "চকলোকমান কমিউনিটি ক্লিনিক",
    "enName": "Choklokman Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "চকলোকমান বাজার সংলগ্ন, সাবগ্রাম, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-780106",
    "emergency": "বিনামূল্যে ওষুধ বিতরণ • পরিবার পরিকল্পনা উপাদান বিতরণ • রক্তচাপ ও ডায়াবেটিস স্ক্রিনিং"
  },
  {
    "name": "শালগ্রাম কমিউনিটি ক্লিনিক",
    "enName": "Shalgram Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "শালগ্রাম, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01713-780107",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • বিনামূল্যে ওষুধ • টিকা প্রদান"
  },
  {
    "name": "উথরাইল কমিউনিটি ক্লিনিক",
    "enName": "Uthrail Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "উথরাইল গ্রাম, চাঁপাপুর, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01713-780108",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু স্বাস্থ্য • পরিবার পরিকল্পনা"
  },
  {
    "name": "বাগবাড়ি কমিউনিটি ক্লিনিক",
    "enName": "Bagbari Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বাগবাড়ি গ্রাম, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01713-780109",
    "emergency": "সাধারণ রোগীর চিকিৎসা • গর্ভকালীন যত্ন • পুষ্টি কার্যক্রম"
  },
  {
    "name": "তারাপুর কমিউনিটি ক্লিনিক",
    "enName": "Tarapur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "তারাপুর, কুন্দগ্রাম, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01713-780110",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • ওষুধ বিতরণ • মা ও শিশু যত্ন"
  },
  {
    "name": "মুরইল কমিউনিটি ক্লিনিক",
    "enName": "Murail CC (Nasratpur)",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "মুরইল গ্রাম, নসরতপুর, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01713-780111",
    "emergency": "বিনামূল্যে ওষুধ • প্রাথমিক চিকিৎসা • গর্ভবতী সেবা"
  },
  {
    "name": "সান্দিড়া কমিউনিটি ক্লিনিক",
    "enName": "Sandira Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "সান্দিড়া, সান্তাহার গ্রামীণ এলাকা, আদমদীঘি, বগুড়া - ৫৮৯১",
    "phone": "01713-780112",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু স্বাস্থ্য সেবা • কৈশোরবান্ধব সেবা"
  },
  {
    "name": "বৈশাখী চর কমিউনিটি ক্লিনিক",
    "enName": "Boishakhi Char Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বৈশাখী চর, যমুনা নদীর অববাহিকা, ভান্ডারবাড়ী, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01713-780113",
    "emergency": "চরাঞ্চল জরুরী প্রাথমিক স্বাস্থ্য সেবা • বিনামূল্যে ওষুধ • প্রসবপূর্ব পরামর্শ"
  },
  {
    "name": "দিঘলকান্দি কমিউনিটি ক্লিনিক",
    "enName": "Dighalkandi Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "দিঘলকান্দি, চৌকিবাড়ী, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01713-780114",
    "emergency": "প্রাথমিক চিকিৎসা • ওষুধ বিতরণ • মা ও শিশু স্বাস্থ্য সেবা"
  },
  {
    "name": "বড়চাপড়া কমিউনিটি ক্লিনিক",
    "enName": "Boro Chapra Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বড়চাপড়া, চিকাশী, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01713-780115",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • সাধারণ রোগীর সেবা • গর্ভবতী চেকআপ"
  },
  {
    "name": "বিলকাজুলী কমিউনিটি ক্লিনিক",
    "enName": "Bilkajuli Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বিলকাজুলী, এলাঙ্গী, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01713-780116",
    "emergency": "প্রাথমিক চিকিৎসা • ওষুধ বিতরণ • শিশু পুষ্টি পর্যবেক্ষণ"
  },
  {
    "name": "বানিয়াযান কমিউনিটি ক্লিনিক",
    "enName": "Baniyajan Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বানিয়াযান, গোসাইবাড়ী, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01713-780117",
    "emergency": "বিনামূল্যে ওষুধ • মা ও শিশু যত্ন • পরিবার পরিকল্পনা পরামর্শ"
  },
  {
    "name": "নান্দিয়ারপাড়া কমিউনিটি ক্লিনিক",
    "enName": "Nandiyarpara Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "নান্দিয়ারপাড়া, নিমগাছি, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01713-780118",
    "emergency": "বিনামূল্যে ওষুধ বিতরণ • প্রাথমিক স্বাস্থ্য সেবা • গর্ভবতী মায়েদের পরামর্শ"
  },
  {
    "name": "ফেঁপি কমিউনিটি ক্লিনিক",
    "enName": "Phepi Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "ফেঁপি গ্রাম, চামরুল, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01713-780119",
    "emergency": "বিনামূল্যে ওষুধ • প্রাথমিক চিকিৎসা • মা ও শিশু যত্ন"
  },
  {
    "name": "কুর্শাহার কমিউনিটি ক্লিনিক",
    "enName": "Kurshahar Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "কুর্শাহার, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01713-780120",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • গর্ভবতী স্বাস্থ্য পরীক্ষা"
  },
  {
    "name": "বালুকা কমিউনিটি ক্লিনিক",
    "enName": "Baluka Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বালুকা গ্রাম, গোবিন্দপুর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01713-780121",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু স্বাস্থ্য • পরিবার পরিকল্পনা"
  },
  {
    "name": "সুখানগাড়ী কমিউনিটি ক্লিনিক",
    "enName": "Sukhangari Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "সুখানগাড়ী গ্রাম, গুনাহার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01713-780122",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • ওষুধ সরবরাহ • গর্ভবতী সেবা"
  },
  {
    "name": "দেবখন্ড কমিউনিটি ক্লিনিক",
    "enName": "Debkhanda Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "দেবখন্ড গ্রাম, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01713-780123",
    "emergency": "বিনামূল্যে ওষুধ • মা ও শিশু স্বাস্থ্য সেবা • কৈশোরকালীন পরামর্শ"
  },
  {
    "name": "পোথা কমিউনিটি ক্লিনিক",
    "enName": "Potha Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "পোথা গ্রাম, জিয়ানগর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01713-780124",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • বিনামূল্যে ওষুধ বিতরণ • পরিবার পরিকল্পনা"
  },
  {
    "name": "মালিয়ান্দহ কমিউনিটি ক্লিনিক",
    "enName": "Maliandaha Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "মালিয়ান্দহ গ্রাম, বালিয়াদিঘী, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-780125",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • প্রাথমিক চিকিৎসা • মা ও শিশু স্বাস্থ্য"
  },
  {
    "name": "দেওপাড়া কমিউনিটি ক্লিনিক",
    "enName": "Deopara Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "দেওপাড়া, কাগইল, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-780126",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • গর্ভবতী সেবা"
  },
  {
    "name": "পেরী কমিউনিটি ক্লিনিক",
    "enName": "Peri Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "পেরী গ্রাম, মহিষাবান, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-780127",
    "emergency": "বিনামূল্যে ওষুধ • মা ও শিশু যত্ন • শিশু বৃদ্ধি পর্যবেক্ষণ"
  },
  {
    "name": "উজগ্রাম কমিউনিটি ক্লিনিক",
    "enName": "Ujgram Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "উজগ্রাম, নাছিপুর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-780128",
    "emergency": "প্রাথমিক চিকিৎসা • ওষুধ বিতরণ • প্রসবপূর্ব যত্ন"
  },
  {
    "name": "পাচকাথিয়া কমিউনিটি ক্লিনিক",
    "enName": "Pachkathia Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "পাচকাথিয়া গ্রাম, রামেশ্বরপুর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-780129",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু যত্ন • ইপিআই টিকাদান"
  },
  {
    "name": "তিলকপুর কমিউনিটি ক্লিনিক",
    "enName": "Tilokpur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "তিলকপুর গ্রাম, সুখানপুকুর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-780130",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • ওষুধ বিতরণ • পরিবার পরিকল্পনা"
  },
  {
    "name": "ভাল্লুক কমিউনিটি ক্লিনিক",
    "enName": "Bhalluk Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "ভাল্লুক গ্রাম, বীরকেদার, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01713-780131",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • প্রাথমিক স্বাস্থ্য সেবা • গর্ভবতী সেবা"
  },
  {
    "name": "জামতলী কমিউনিটি ক্লিনিক",
    "enName": "Jamtoli Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "জামতলী বাজার সংলগ্ন, দুর্গাপুর, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01713-780132",
    "emergency": "প্রাথমিক সেবা • বিনামূল্যে ওষুধ • মা ও শিশু যত্ন"
  },
  {
    "name": "ডিপইল কমিউনিটি ক্লিনিক",
    "enName": "Dipail Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "ডিপইল গ্রাম, মালঞ্চা, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01713-780133",
    "emergency": "বিনামূল্যে ওষুধ বিতরণ • মা ও শিশু স্বাস্থ্য • ইপিআই টিকাদান"
  },
  {
    "name": "পাতাঞ্জ কমিউনিটি ক্লিনিক",
    "enName": "Patanj Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "পাতাঞ্জ গ্রাম, নারহট্ট, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01713-780134",
    "emergency": "সাধারণ রোগীর চিকিৎসা • গর্ভকালীন চেকআপ • পুষ্টি শিক্ষা"
  },
  {
    "name": "ছাতরা কমিউনিটি ক্লিনিক",
    "enName": "Chhatra Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "ছাতরা গ্রাম, পাইকর, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01713-780135",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু যত্ন • টিকা কার্যক্রম"
  },
  {
    "name": "ঢাকান্টা কমিউনিটি ক্লিনিক",
    "enName": "Dhakanta Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "ঢাকান্টা, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01713-780136",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • ওষুধ সরবরাহ • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "দমদমা কমিউনিটি ক্লিনিক",
    "enName": "Damdama CC (Bhatra)",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "দমদমা গ্রাম, ভাটরা, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01713-780137",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • প্রাথমিক চিকিৎসা • মা ও শিশু যত্ন"
  },
  {
    "name": "মুরাদপুর কমিউনিটি ক্লিনিক",
    "enName": "Muradpur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "মুরাদপুর গ্রাম, বুড়ইল, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01713-780138",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • গর্ভবতী মায়েদের যত্ন"
  },
  {
    "name": "কাথম কমিউনিটি ক্লিনিক",
    "enName": "Katham Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "কাথম গ্রাম, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01713-780139",
    "emergency": "বিনামূল্যে ওষুধ • মা ও শিশু স্বাস্থ্য • টিকা প্রদান"
  },
  {
    "name": "রনবাঘা কমিউনিটি ক্লিনিক",
    "enName": "Ranbagha Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "রনবাঘা বাজার সংলগ্ন, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01713-780140",
    "emergency": "প্রাথমিক চিকিৎসা • বিনামূল্যে ওষুধ • গর্ভবতী চেকআপ"
  },
  {
    "name": "নিমাইদিঘী কমিউনিটি ক্লিনিক",
    "enName": "Nimaidighi Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "নিমাইদিঘী গ্রাম, থালতা মাঝগ্রাম, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01713-780141",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু যত্ন • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "থালতা কমিউনিটি ক্লিনিক",
    "enName": "Thalta Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "থালতা গ্রাম, থালতা মাঝগ্রাম, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01713-780142",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • মা ও শিশু স্বাস্থ্য সেবা"
  },
  {
    "name": "পারতিত পরল কমিউনিটি ক্লিনিক",
    "enName": "Partitparol Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "পারতিত পরল, ভেলাবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01713-780143",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • প্রাথমিক চিকিৎসা • মা ও শিশু স্বাস্থ্য"
  },
  {
    "name": "ধারাবর্ষা চর কমিউনিটি ক্লিনিক",
    "enName": "Dharabarsha Char Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "ধারাবর্ষা চর, যমুনা নদী তীরবর্তী, বোহাইল, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01713-780144",
    "emergency": "চরাঞ্চলের জরুরী স্বাস্থ্য সেবা • ওষুধ বিতরণ • প্রসবপূর্ব যত্ন"
  },
  {
    "name": "কাজীর চর কমিউনিটি ক্লিনিক",
    "enName": "Kajir Char Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "কাজীর চর, চালুয়াবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01713-780145",
    "emergency": "বিনামূল্যে ওষুধ • মা ও শিশু স্বাস্থ্য সেবা • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "রামচন্দ্রপুর কমিউনিটি ক্লিনিক",
    "enName": "Ramchandrapur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "রামচন্দ্রপুর গ্রাম, ফুলবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01713-780146",
    "emergency": "প্রাথমিক সেবা • বিনামূল্যে ওষুধ • গর্ভবতী চেকআপ"
  },
  {
    "name": "নিজবোল কমিউনিটি ক্লিনিক",
    "enName": "Nijbol Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "নিজবোল গ্রাম, হাটশেরপুর, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01713-780147",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু যত্ন • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "চর বেনুপুর কমিউনিটি ক্লিনিক",
    "enName": "Char Benupur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "চর বেনুপুর চর এলাকা, কাজলা, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01713-780148",
    "emergency": "চরাঞ্চলের মা ও শিশু স্বাস্থ্য • বিনামূল্যে ওষুধ • স্বাভাবিক প্রসব রেফারেল"
  },
  {
    "name": "রানীরহাট কমিউনিটি ক্লিনিক",
    "enName": "Ranirhat CC (Amrool)",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "রানীরহাট বাজার সংলগ্ন, আমরুল, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-780149",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • প্রাথমিক স্বাস্থ্য সেবা • গর্ভবতী মায়েদের যত্ন"
  },
  {
    "name": "রহিমাবাদ কমিউনিটি ক্লিনিক",
    "enName": "Rahimabad Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "রহিমাবাদ গ্রাম, আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-780150",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • মা ও শিশু স্বাস্থ্য"
  },
  {
    "name": "রানীরপাড়া কমিউনিটি ক্লিনিক",
    "enName": "Ranirpara Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "রানীরপাড়া, আশেকপুর, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-780151",
    "emergency": "বিনামূল্যে ওষুধ • গর্ভবতী সেবা • শিশু পুষ্টি পর্যবেক্ষণ"
  },
  {
    "name": "খাদাস কমিউনিটি ক্লিনিক",
    "enName": "Khadas Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "খাদাস গ্রাম, চোপীনগর, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-780152",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • বিনামূল্যে ওষুধ • টিকা কেন্দ্র"
  },
  {
    "name": "গয়নাবান্দ কমিউনিটি ক্লিনিক",
    "enName": "Goynaband Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "গয়নাবান্দ গ্রাম, খরনা, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-780153",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু যত্ন • ইপিআই টিকাদান"
  },
  {
    "name": "বিহিগ্রাম কমিউনিটি ক্লিনিক",
    "enName": "Bihigram Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বিহিগ্রাম, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-780154",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "বেলগাড়ী কমিউনিটি ক্লিনিক",
    "enName": "Belgari Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বেলগাড়ী গ্রাম, ভবানীপুর, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01713-780155",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • প্রাথমিক চিকিৎসা • মা ও শিশু স্বাস্থ্য"
  },
  {
    "name": "রানীনগর কমিউনিটি ক্লিনিক",
    "enName": "Raninagar Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "রানীনগর, বিশালপুর, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01713-780156",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • গর্ভবতী সেবা"
  },
  {
    "name": "চকপাথালিয়া কমিউনিটি ক্লিনিক",
    "enName": "Chokpathalia Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "চকপাথালিয়া, গাড়ীদহ, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01713-780157",
    "emergency": "বিনামূল্যে ওষুধ • মা ও শিশু যত্ন • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "বিলনালুয়া কমিউনিটি ক্লিনিক",
    "enName": "Bilnalua Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "বিলনালুয়া গ্রাম, খানপুর, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01713-780158",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • ওষুধ সরবরাহ • গর্ভবতী মায়েদের পরামর্শ"
  },
  {
    "name": "কালিশহর কমিউনিটি ক্লিনিক",
    "enName": "Kalishahar Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "কালিশহর গ্রাম, কুসুম্বী, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01713-780159",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু যত্ন • ইপিআই টিকাদান"
  },
  {
    "name": "চান্দাইকোনা বর্ডার কমিউনিটি ক্লিনিক",
    "enName": "Chandaikona Border Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "চান্দাইকোনা সীমান্ত সংলগ্ন, সীমাবাড়ী, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01713-780160",
    "emergency": "প্রাথমিক সেবা • বিনামূল্যে ওষুধ • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "চককানু কমিউনিটি ক্লিনিক",
    "enName": "Chokkanu Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "চককানু গ্রাম, আটমূল, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01713-780161",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • প্রাথমিক চিকিৎসা • মা ও শিশু স্বাস্থ্য"
  },
  {
    "name": "ভাসুবিহার কমিউনিটি ক্লিনিক",
    "enName": "Vasu Vihara Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "ভাসুবিহার প্রত্নতাত্ত্বিক এলাকা সংলগ্ন, বিহার, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01713-780162",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • গর্ভবতী সেবা"
  },
  {
    "name": "চন্ডিহারা কমিউনিটি ক্লিনিক",
    "enName": "Chondihara Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "চন্ডিহারা গ্রাম, বুড়িগঞ্জ, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01713-780163",
    "emergency": "বিনামূল্যে ওষুধ • মা ও শিশু যত্ন • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "মহাস্থানগড় কমিউনিটি ক্লিনিক",
    "enName": "Mahasthangarh Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "মহাস্থানগড় ঐতিহাসিক প্রাচীর সংলগ্ন, দেউলী, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01713-780164",
    "emergency": "প্রাথমিক চিকিৎসা • ওষুধ বিতরণ • ট্যুরিস্ট জরুরী ফার্স্ট এইড"
  },
  {
    "name": "জয়পুর কমিউনিটি ক্লিনিক",
    "enName": "Joypur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "জয়পুর গ্রাম, কিচক, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01713-780165",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • মা ও শিশু যত্ন • ইপিআই টিকাদান"
  },
  {
    "name": "খামারপাড়া কমিউনিটি ক্লিনিক",
    "enName": "Khamarpara Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "খামারপাড়া গ্রাম, ময়দানহাট্টা, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01713-780166",
    "emergency": "প্রাথমিক সেবা • বিনামূল্যে ওষুধ • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "নিশ্চিন্তপুর কমিউনিটি ক্লিনিক",
    "enName": "Nishchintapur Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "নিশ্চিন্তপুর গ্রাম, বালুয়া, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01713-780167",
    "emergency": "বিনামূল্যে ৩০ প্রকার ওষুধ • প্রাথমিক চিকিৎসা • মা ও শিশু স্বাস্থ্য"
  },
  {
    "name": "তেকানী কমিউনিটি ক্লিনিক",
    "enName": "Tekani Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "তেকানী গ্রাম, দিগদাইড়, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01713-780168",
    "emergency": "প্রাথমিক সেবা • ওষুধ বিতরণ • গর্ভবতী সেবা"
  },
  {
    "name": "কালাইহাটা কমিউনিটি ক্লিনিক",
    "enName": "Kalaihata Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "কালাইহাটা গ্রাম, জোড়গাছা, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01713-780169",
    "emergency": "বিনামূল্যে ওষুধ • মা ও শিশু যত্ন • ইপিআই টিকাদান কেন্দ্র"
  },
  {
    "name": "হুয়াকুয়া কমিউনিটি ক্লিনিক",
    "enName": "Huakuwa Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "হুয়াকুয়া গ্রাম, মধুপুর, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01713-780170",
    "emergency": "প্রাথমিক স্বাস্থ্য সেবা • ওষুধ সরবরাহ • গর্ভবতী মায়েদের পরামর্শ"
  },
  {
    "name": "যমুনা চর কমিউনিটি ক্লিনিক",
    "enName": "Jamuna Char CC (Pakulla)",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "যমুনা চর ও বাঁধ সংলগ্ন এলাকা, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01713-780171",
    "emergency": "চরাঞ্চল জরুরী প্রাথমিক স্বাস্থ্য সেবা • বিনামূল্যে ওষুধ • মা ও শিশু যত্ন"
  },
  {
    "name": "চুকাইনগর বাঁধ কমিউনিটি ক্লিনিক",
    "enName": "Chukainagar Embankment Community Clinic",
    "type": "govt",
    "typeLabel": "Community Clinic",
    "address": "চুকাইনগর বন্যা নিয়ন্ত্রণ বাঁধ সংলগ্ন, তৈকানী চুকাইনগর, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01713-780172",
    "emergency": "চরাঞ্চলের মা ও শিশু স্বাস্থ্য সেবা • বিনামূল্যে ৩০ প্রকার ওষুধ • পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল",
    "enName": "Shaheed Ziaur Rahman Medical College Hospital (SZRMCH)",
    "type": "govt",
    "typeLabel": "Medical Colleges and Hospitals",
    "address": "সিলিমপুর, মেডিকেল রোড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-60862",
    "emergency": "২৪/৭ জরুরী বিভাগ (Emergency) • নিবিড় পরিচর্যা কেন্দ্র (ICU) • করোনারি কেয়ার ইউনিট (CCU)"
  },
  {
    "name": "মোহাম্মদ আলী ২৫০ শয্যা বিশিষ্ট জেলা হাসপাতাল, বগুড়া",
    "enName": "Mohammad Ali 250-Bed District Hospital, Bogura",
    "type": "govt",
    "typeLabel": "Government District Hospitals",
    "address": "হাসপাতাল রোড, রেলওয়ে স্টেশন সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-66020",
    "emergency": "২৪/৭ জরুরী সেবা • ২৫০ শয্যা ইনডোর ও আউটডোর চিকিৎসা • জেনারেল সার্জারি ও ল্যাপারোস্কোপিক সার্জারি"
  },
  {
    "name": "বগুড়া পুলিশ হাসপাতাল",
    "enName": "Bogura Police Hospital",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "পুলিশ লাইন্স কম্পাউন্ড, নিশিন্দারা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-373801",
    "emergency": "পুলিশ সদস্য ও সাধারণ রোগীদের জরুরী চিকিৎসা • ৫০ শয্যা ইনডোর সেবা • মেডিসিন ও অর্থোপেডিক আউটডোর"
  },
  {
    "name": "বগুড়া জেলা কারাগার হাসপাতাল",
    "enName": "Bogura District Jail Hospital",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "বগুড়া জেলা কারাগার প্রাঙ্গণ, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-64531",
    "emergency": "কারাবন্দীদের জন্য ২৪/৭ চিকিৎসাসেবা • ইনপেশেন্ট পর্যবেক্ষণ ওয়ার্ড • মানসিক স্বাস্থ্য ও সাইকিয়াট্রিক পরামর্শ"
  },
  {
    "name": "সান্তাহার রেলওয়ে হাসপাতাল, বগুড়া",
    "enName": "Santahar Railway Hospital, Bogura",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "রেলওয়ে স্টেশন কলোনি, সান্তাহার জংশন, আদমদীঘি, বগুড়া - ৫৮৯১",
    "phone": "01711-692140",
    "emergency": "রেলওয়ে কর্মকর্তা-কর্মচারী ও সাধারণ জনগণের বহির্বিভাগ সেবা • ২০ শয্যা ইনডোর ওয়ার্ড • জরুরী ট্রমা ও প্রাথমিক চিকিৎসা"
  },
  {
    "name": "বগুড়া বক্ষব্যাধি হাসপাতাল (যক্ষ্মা হাসপাতাল)",
    "enName": "Bogura Chest Disease Hospital",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "মালতীনগর, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-65489",
    "emergency": "বিশেষায়িত বক্ষব্যাধি ও যক্ষ্মা (TB) চিকিৎসা • জিন-এক্সপার্ট (GeneXpert MTB/RIF) ল্যাব টেস্ট • ২০ শয্যা ইনডোর বক্ষব্যাধি কেয়ার"
  },
  {
    "name": "বগুড়া বক্ষব্যাধি ক্লিনিক (টিবি ক্লিনিক)",
    "enName": "Bogura Chest Disease Clinic (TB Clinic)",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "বড়গোলা, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-67891",
    "emergency": "বিনামূল্যে ডটস (DOTS) যক্ষ্মা চিকিৎসা ও ওষুধ বিতরণ • কফ ও স্পুটাম মাইক্রোস্কোপি টেস্ট • বক্ষব্যাধি বহির্বিভাগ ও স্বাস্থ্য শিক্ষা"
  },
  {
    "name": "মা ও শিশু কল্যাণ কেন্দ্র (MCWC), বগুড়া",
    "enName": "Maternal and Child Welfare Centre (MCWC), Bogura",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "থানা রোড, কাটনারপাড়া সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-66712",
    "emergency": "২৪/৭ জরুরি প্রসূতি সেবা (CEmONC) • স্বাভাবিক প্রসব ও সিজারিয়ান সেকশন অপারেশন • গর্ভকালীন (ANC) ও প্রসবোত্তর (PNC) যত্ন"
  },
  {
    "name": "সোনাতলা ২০ শয্যা বিশিষ্ট হাসপাতাল",
    "enName": "Sonatala 20-Bed Specialized Hospital",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "বালুয়া হাট সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01730-324632",
    "emergency": "২৪ ঘন্টা জরুরী চিকিৎসা সেবা • ২০ শয্যা অন্তর্বিভাগ চিকিৎসা • স্বাভাবিক প্রসব সেবা ও রেফারেল"
  },
  {
    "name": "চন্দনবাইশা ২০ শয্যা বিশিষ্ট হাসপাতাল, সারিয়াকান্দি",
    "enName": "Chandanbaisha 20-Bed Riverine Hospital, Sariakandi",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "চন্দনবাইশা বাজার, যমুনা নদী তীরবর্তী অঞ্চল, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324633",
    "emergency": "যমুনা চরাঞ্চলের জরুরি চিকিৎসা সেবা • ২০ শয্যা ইনডোর ওয়ার্ড • সাপের কামড়ের অ্যান্টিভেনম চিকিৎসা (Snakebite Management)"
  },
  {
    "name": "তালোড়া ২০ শয্যা বিশিষ্ট হাসপাতাল, দুপচাঁচিয়া",
    "enName": "Talora 20-Bed Hospital, Dhupchanchia",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "তালোড়া শিল্প এলাকা, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-324634",
    "emergency": "শিল্প এলাকার শ্রমিক ও জনগণের জরুরী ট্রমা চিকিৎসা • ২০ শয্যা অন্তর্বিভাগ সেবা • বহির্বিভাগে অভিজ্ঞ চিকিৎসক পরামর্শ"
  },
  {
    "name": "ভান্ডারবাড়ী ১০ শয্যা বিশিষ্ট চর হাসপাতাল, ধুনট",
    "enName": "Bhandarbari 10-Bed Char Hospital, Dhunat",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "ভান্ডারবাড়ী বন্যা নিয়ন্ত্রণ বাঁধ সংলগ্ন, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324635",
    "emergency": "চরাঞ্চল নদীমাতৃক জরুরী চিকিৎসা সেবা • ১০ শয্যা ইনডোর পর্যবেক্ষণ • ডায়রিয়া ও পানিবাহিত রোগের জরুরি ব্যবস্থাপনা"
  },
  {
    "name": "শেরপুর মা ও শিশু কল্যাণ কেন্দ্র (MCWC)",
    "enName": "Sherpur Maternal & Child Welfare Centre (MCWC)",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "পৌরসভা রোড, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01712-895621",
    "emergency": "২৪/৭ স্বাভাবিক প্রসব ও জরুরি ধাত্রীবিদ্যা • ১০ শয্যা প্রসূতি ইনডোর ওয়ার্ড • গর্ভবতী মায়েদের প্রসবপূর্ব ও প্রসবোত্তর চেকআপ"
  },
  {
    "name": "শিবগঞ্জ ট্রমা ও জরুরী সেবা কেন্দ্র (মোকামতলা)",
    "enName": "Shibganj Highway Trauma & Emergency Centre",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "ঢাকা-বগুড়া-রংপুর মহাসড়ক সংযোগস্থল, মোকামতলা, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-324636",
    "emergency": "মহাসড়ক সড়ক দুর্ঘটনার জরুরী চিকিৎসা ও ট্রমা রিসাসিটেশন • ফ্র্যাকচার ও অস্থিভঙ্গ জরুরি ইমোবিলাইজেশন • জরুরী রক্তপাত নিয়ন্ত্রণ ও অক্সিজেন সাপোর্ট"
  },
  {
    "name": "গাবতলী গ্রামীণ চক্ষু ও বিশেষায়িত সেবা কেন্দ্র",
    "enName": "Gabtali Rural Eye & Specialized Care Hospital",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "থানা মোড়, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324637",
    "emergency": "প্রাথমিক চক্ষু চিকিৎসা ও দৃষ্টি পরীক্ষা • ছানিপড়া (Cataract) স্ক্রিনিং ও লেন্স প্রতিস্থাপন রেফারেল • গ্লুকোমা ও অন্ধত্ব প্রতিরোধ কার্যক্রম"
  },
  {
    "name": "কাহালু বিশেষায়িত এনসিডি ও ডায়াবেটিস সেন্টার",
    "enName": "Kahalu Specialized NCD & Diabetes Centre",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "হাসপাতাল রোড, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324638",
    "emergency": "ডায়াবেটিস ও উচ্চ রক্তচাপের দীর্ঘমেয়াদী নিয়ন্ত্রণ ও সেবা • হৃদরোগ ও কার্ডিওভাসকুলার রিস্ক স্ক্রিনিং • ইসিজি (ECG) ও বায়োকেমিক্যাল ল্যাব টেস্ট"
  },
  {
    "name": "নন্দীগ্রাম গ্রামীণ প্রসূতি সেবা কেন্দ্র",
    "enName": "Nandigram Rural Maternity Centre",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "ওমরপুর বাজার সংলগ্ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-324639",
    "emergency": "২৪/৭ স্বাভাবিক প্রসব ও মিডওয়াইফারি কেয়ার • ১০ শয্যা প্রসব পরবর্তী নিবিড় পর্যবেক্ষণ ওয়ার্ড • গর্ভকালীন চেকআপ ও রক্তাল্পতা প্রতিরোধ"
  },
  {
    "name": "শাজাহানপুর মহাসড়ক জরুরী সেবা কেন্দ্র",
    "enName": "Shajahanpur Highway Emergency Response Unit",
    "type": "govt",
    "typeLabel": "Government Specialized Hospitals",
    "address": "ঢাকা-বগুড়া মহাসড়ক (নয়মাইল মোড়), আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01730-324640",
    "emergency": "মহাসড়ক দ্রুত জরুরী রেসপন্স ও এক্সিডেন্ট ফার্স্ট এইড • মারাত্মক আঘাতপ্রাপ্তদের স্থিতিশীলকরণ ও সিপিআর • জরুরী অক্সিজেন ও রক্তক্ষরণ নিয়ন্ত্রণ"
  },
  {
    "name": "টিএমএসএস মেডিকেল কলেজ ও রফাতুল্লাহ কমিউনিটি হাসপাতাল",
    "enName": "TMSS Medical College & Rafatullah Community Hospital (TMC & RCH)",
    "type": "private",
    "typeLabel": "Medical Colleges and Hospitals",
    "address": "ঠেঙ্গামারা, রংপুর রোড, গোকুল, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-78567",
    "emergency": "১০০০ শয্যা বিশেষায়িত ইনডোর ও আউটডোর সেবা • ২৪/৭ জরুরী ও ট্রমা কেয়ার • আইসিইউ (ICU), সিসিইউ (CCU), এনআইসিইউ (NICU)"
  },
  {
    "name": "পপুলার হাসপাতাল ও কনসালটেশন সেন্টার, বগুড়া",
    "enName": "Popular Hospital & Consultation Centre, Bogura",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "থানা রোড, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-69361",
    "emergency": "২৪/৭ জরুরী সেবা ও ইনডোর কেয়ার • মডার্ন অপারেশন থিয়েটার (OT) • ল্যাপারোস্কোপিক জেনারেল সার্জারি"
  },
  {
    "name": "ইবনে সিনা হাসপাতাল ও ডায়াগনস্টিক সেন্টার, বগুড়া",
    "enName": "Ibn Sina Hospital & Diagnostic Centre, Bogura",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "কানোচগাড়ী, শেরপুর রোড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-69234",
    "emergency": "২৪/৭ বিশেষজ্ঞ চিকিৎসক পরামর্শ ও ইনডোর চিকিৎসা • মডার্ন আইসিইউ (ICU) ও এনআইসিইউ (NICU) • হৃদরোগ ও মেডিসিন ইউনিট"
  },
  {
    "name": "বগুড়া খ্রিস্টান মিশন হাসপাতাল",
    "enName": "Bogura Christian Mission Hospital",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "থানা রোড, মিশন কম্পাউন্ড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-66432",
    "emergency": "সুলভ মূল্যে সাধারণ চিকিৎসা ও শয্যা সেবা • মাতৃ ও শিশু স্বাস্থ্য সেবা • স্বাভাবিক প্রসব ও সিজারিয়ান সেকশন"
  },
  {
    "name": "শামসুদ্দীন মেমোরিয়াল হাসপাতাল, বগুড়া",
    "enName": "Shamsuddin Memorial Hospital, Bogura",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "কালীতলা, স্টেশন রোড সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-62890",
    "emergency": "৫০ শয্যা ইনডোর চিকিৎসা • জেনারেল সার্জারি ও ইউরোলজি • গাইনী ও প্রসূতি ওয়ার্ড"
  },
  {
    "name": "রেইনবো হাসপাতাল ও ডায়াগনস্টিক সেন্টার, বগুড়া",
    "enName": "Rainbow Hospital & Diagnostic Centre, Bogura",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "মেডিকেল কলেজ রোড, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01711-223344",
    "emergency": "২৪/৭ জরুরী ট্রমা ও ক্যাজুয়ালটি সেবা • মেডিকেল কলেজ সংলগ্ন বিশেষজ্ঞ কনসালটেশন • আধুনিক অপারেশন থিয়েটার"
  },
  {
    "name": "প্রাইম ক্লিনিক অ্যান্ড হাসপাতাল, বগুড়া",
    "enName": "Prime Clinic & Hospital, Bogura",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "জলেশ্বরীতলা মেইন রোড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-67123",
    "emergency": "বিশেষজ্ঞ ডাক্তারদের নিয়মিত চেম্বার • ৩০ শয্যা কেবিন ও জেনারেল ওয়ার্ড • ল্যাপারোস্কোপি ও কসমেটিক সার্জারি"
  },
  {
    "name": "সান্তাহার জেনারেল হাসপাতাল ও ক্লিনিক",
    "enName": "Santahar General Hospital & Clinic",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "রেলগেট এলাকা, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১",
    "phone": "01712-349811",
    "emergency": "২৫ শয্যা ইনডোর ও কেবিন সুবিধা • ২৪ ঘন্টা জরুরী ডেলিভারি ও সিজারিয়ান অপারেশন • জেনারেল সার্জারি ও অর্থোপেডিক ফার্স্ট এইড"
  },
  {
    "name": "সেবা ক্লিনিক অ্যান্ড ডায়াগনস্টিক সেন্টার, আদমদীঘি",
    "enName": "Sheba Clinic & Diagnostic Centre, Adamdighi",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "আদমদীঘি বাসস্ট্যান্ড রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01718-456712",
    "emergency": "ইনপেশেন্ট কেয়ার ও নরমাল ডেলিভারি • বহির্বিভাগ বিশেষজ্ঞ ডাক্তার কনসালটেশন • আল্ট্রাসনোগ্রাফি ও রক্তের সম্পূর্ণ পরীক্ষা"
  },
  {
    "name": "ধুনট সেন্ট্রাল ক্লিনিক অ্যান্ড নার্সিং হোম",
    "enName": "Dhunat Central Clinic & Nursing Home",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "থানা রোড, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01715-442299",
    "emergency": "২৪/৭ জরুরী প্রসূতি ও ডেলিভারি সেবা • সিজারিয়ান সেকশন ও এ্যাপেন্ডিসাইটিস অপারেশন • ২০ শয্যা নার্সিং হোম ওয়ার্ড ও কেবিন"
  },
  {
    "name": "বিক্রমপুর মডেল ক্লিনিক, ধুনট",
    "enName": "Bikrampur Model Clinic, Dhunat",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01716-889900",
    "emergency": "১৫ শয্যা ইনডোর কেয়ার • গাইনী ও প্রসূতি কনসালটেশন • সাধারণ রোগীর চিকিৎসা ও ওষুধ বিতরণ"
  },
  {
    "name": "দুপচাঁচিয়া জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম",
    "enName": "Dhupchanchia General Hospital & Nursing Home",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01712-665544",
    "emergency": "৩০ শয্যা ইনডোর ও পোস্ট-অপারেটিভ কেয়ার • ২৪ ঘন্টা অপারেশন থিয়েটার সুবিধা • মহাসড়ক এক্সিডেন্ট ইমার্জেন্সি কেয়ার"
  },
  {
    "name": "তালোড়া ডিজিটাল ক্লিনিক অ্যান্ড হাসপাতাল",
    "enName": "Talora Digital Clinic & Hospital",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "রেলওয়ে স্টেশন রোড, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01714-332211",
    "emergency": "১৫ শয্যা ইনডোর সেবা • স্বাভাবিক প্রসব ও জরুরি রেফারেল • ডিজিটাল এক্স-রে ও বায়োকেমিস্ট্রি টেস্ট"
  },
  {
    "name": "গাবতলী সেন্ট্রাল হাসপাতাল ও কনসালটেশন সেন্টার",
    "enName": "Gabtali Central Hospital & Consultation Centre",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-998877",
    "emergency": "২৫ শয্যা কেবিন ও জেনারেল ইনডোর ওয়ার্ড • ২৪/৭ জরুরী বিভাগ ও ডেলিভারি ইউনিট • জেনারেল সার্জারি ও গাইনী অপারেশন"
  },
  {
    "name": "সোনারায় হেলথ কেয়ার ক্লিনিক, গাবতলী",
    "enName": "Sonaray Health Care Clinic, Gabtali",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "সোনারায় বাজার রোড, সোনারায়, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01718-221144",
    "emergency": "১৫ শয্যা গ্রামীণ ইনডোর সেবা • মা ও শিশু পরিচর্যা • নরমাল ডেলিভারি ও প্রাথমিক চিকিৎসা"
  },
  {
    "name": "কাহালু মডেল ক্লিনিক অ্যান্ড নার্সিং হোম",
    "enName": "Kahalu Model Clinic & Nursing Home",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "রেলগেট সংলগ্ন, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01711-778899",
    "emergency": "২০ শয্যা ইনডোর ও প্রসূতি সেবা • জরুরী সিজারিয়ান সেকশন ও এ্যাপেন্ডিক্স অপারেশন • আল্ট্রাসনোগ্রাম ও ডিজিটাল এক্স-রে"
  },
  {
    "name": "মুরইল হেলথ কেয়ার অ্যান্ড ক্লিনিক, কাহালু",
    "enName": "Murail Health Care & Clinic, Kahalu",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01716-334477",
    "emergency": "১৫ শয্যা ইনডোর পর্যবেক্ষণ • প্রাথমিক সার্জারি ও ফার্স্ট এইড • স্বাভাবিক প্রসব সেবা"
  },
  {
    "name": "নন্দীগ্রাম জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম",
    "enName": "Nandigram General Hospital & Nursing Home",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01712-887711",
    "emergency": "২৫ শয্যা ইনডোর ও কেবিন চিকিৎসা • ২৪ ঘন্টা জরুরি সেবা ও অপারেশন থিয়েটার • গাইনী ও প্রসূতি সার্জারি"
  },
  {
    "name": "ওমরপুর সেন্ট্রাল ক্লিনিক, নন্দীগ্রাম",
    "enName": "Omarpur Central Clinic, Nandigram",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "বগুড়া-নাটোর মহাসড়ক, ওমরপুর, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01715-667788",
    "emergency": "১৫ শয্যা ইনডোর ওয়ার্ড • মহাসড়ক জরুরী দুর্ঘটনা চিকিৎসা • স্বাভাবিক প্রসব সেবা"
  },
  {
    "name": "সারিয়াকান্দি যমুনা ক্লিনিক অ্যান্ড নার্সিং হোম",
    "enName": "Sariakandi Jamuna Clinic & Nursing Home",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01714-556677",
    "emergency": "২০ শয্যা ইনডোর ও কেবিন সুবিধা • নদী তীরবর্তী জরুরি প্রসূতি ও ডেলিভারি সেবা • সিজারিয়ান ও জেনারেল সার্জারি"
  },
  {
    "name": "চন্দনবাইশা সেবা ক্লিনিক, সারিয়াকান্দি",
    "enName": "Chandanbaisha Seba Clinic, Sariakandi",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "চন্দনবাইশা বাজার সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01716-443322",
    "emergency": "১৫ শয্যা চরাঞ্চল ইনডোর চিকিৎসা • স্বাভাবিক প্রসব সেবা ও মা ও শিশু যত্ন • জরুরী ফার্স্ট এইড ও ড্রেসিং"
  },
  {
    "name": "মাঝিড়া ক্যান্টনমেন্ট জেনারেল হাসপাতাল অ্যান্ড ক্লিনিক",
    "enName": "Majhira Cantonment General Hospital & Clinic",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "বগুড়া সেনানিবাস গেট সংলগ্ন, ঢাকা রোড, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-445566",
    "emergency": "৩০ শয্যা ইনডোর ও পোস্ট-অপারেটিভ ওয়ার্ড • ২৪/৭ জরুরী ট্রমা ও ক্যাজুয়ালটি সেবা • জেনারেল সার্জারি ও গাইনী অপারেশন"
  },
  {
    "name": "আড়িয়া মডেল হাসপাতাল অ্যান্ড নার্সিং হোম, শাজাহানপুর",
    "enName": "Aria Model Hospital & Nursing Home, Shajahanpur",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "ঢাকা-বগুড়া মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01718-990011",
    "emergency": "২৫ শয্যা আধুনিক ইনডোর সুবিধা • মহাসড়ক সড়ক দুর্ঘটনার জরুরি চিকিৎসা • স্বাভাবিক ও সিজারিয়ান প্রসব সেবা"
  },
  {
    "name": "শেরপুর সেন্ট্রাল হাসপাতাল অ্যান্ড ডায়াগনস্টিক সেন্টার",
    "enName": "Sherpur Central Hospital & Diagnostic Centre",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01711-667788",
    "emergency": "৪০ শয্যা কেবিন ও জেনারেল ওয়ার্ড • ২৪ ঘন্টা অপারেশন থিয়েটার ও সিজারিয়ান সেকশন • মহাসড়ক এক্সিডেন্ট ও জরুরি ট্রমা সেবা"
  },
  {
    "name": "আপন জেনারেল হাসপাতাল অ্যান্ড ক্লিনিক, শেরপুর",
    "enName": "Apan General Hospital & Clinic, Sherpur",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "বাসস্ট্যান্ড সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01715-223344",
    "emergency": "২৫ শয্যা ইনডোর রোগী ভর্তি • জেনারেল সার্জারি ও গাইনী কেয়ার • স্বাভাবিক প্রসব সেবা"
  },
  {
    "name": "সীমাবাড়ী লাইফ কেয়ার ক্লিনিক, শেরপুর",
    "enName": "Shimabari Life Care Clinic, Sherpur",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "ঢাকা-বগুড়া মহাসড়ক, সীমাবাড়ী বাজার, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01716-112233",
    "emergency": "১৫ শয্যা ইনডোর ও প্রসূতি যত্ন • হাইওয়ে জরুরি ফার্স্ট এইড ও অক্সিজেন সাপোর্ট • স্বাভাবিক প্রসব"
  },
  {
    "name": "মোকামতলা জেনারেল হাসপাতাল অ্যান্ড ট্রমা সেন্টার",
    "enName": "Mokamtala General Hospital & Trauma Centre (Private)",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01712-556677",
    "emergency": "৩৫ শয্যা ইনডোর ও কেবিন ওয়ার্ড • ২৪/৭ মহাসড়ক সড়ক দুর্ঘটনা ও অর্থোপেডিক ট্রমা সার্জারি • জরুরী ডেলিভারি ও সিজারিয়ান সেকশন"
  },
  {
    "name": "শিবগঞ্জ মডেল হাসপাতাল অ্যান্ড নার্সিং হোম",
    "enName": "Shibganj Model Hospital & Nursing Home",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01714-778899",
    "emergency": "২৫ শয্যা ইনডোর চিকিৎসা • জেনারেল সার্জারি ও গাইনী কেয়ার • স্বাভাবিক প্রসব ও সিজারিয়ান অপারেশন"
  },
  {
    "name": "সোনাতলা জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম",
    "enName": "Sonatala General Hospital & Nursing Home",
    "type": "private",
    "typeLabel": "Private Hospitals",
    "address": "স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01711-889900",
    "emergency": "২৫ শয্যা ইনডোর ও কেবিন ব্যবস্থা • ২৪ ঘন্টা জরুরী ডেলিভারি ও সিজারিয়ান অপারেশন • জেনারেল সার্জারি ও এ্যাপেন্ডিসাইটিস কেয়ার"
  },
  {
    "name": "বালুয়া মডার্ন ক্লিনিক, সোনাতলা",
    "enName": "Balua Modern Clinic, Sonatala",
    "type": "private",
    "typeLabel": "Private Clinics",
    "address": "বালুয়া হাট বাজার সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01715-334455",
    "emergency": "১৫ শয্যা ইনডোর পর্যবেক্ষণ • স্বাভাবিক প্রসব সেবা • প্রাথমিক চিকিৎসা ও ফার্স্ট এইড"
  },
  {
    "name": "পপুলার ডায়াগনস্টিক সেন্টার লি., বগুড়া",
    "enName": "Popular Diagnostic Centre Ltd., Bogura",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "থানা রোড, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-69361",
    "emergency": "১.৫ টেসলা এমআরআই (1.5T MRI) • ১২৮-স্লাইস মাল্টি-ডিটেক্টর সিটি স্ক্যান (128-Slice CT Scan) • ফোর-ডি কালার ডপলার আল্ট্রাসনোগ্রাফি (4D USG)"
  },
  {
    "name": "মেদিনোভা মেডিকেল সার্ভিসেস লি., বগুড়া",
    "enName": "Medinova Medical Services Ltd., Bogura",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "কানোচগাড়ী, শেরপুর রোড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-69123",
    "emergency": "মাল্টি-স্লাইস স্পাইরাল সিটি স্ক্যান • ডিজিটাল রেডিওলজি ও ফ্লুরোস্কোপি • কার্ডিয়াক ইকোকার্ডিওগ্রাফি ও ইটিটি (ETT)"
  },
  {
    "name": "ল্যাবএইড ডায়াগনস্টিক লি., বগুড়া",
    "enName": "Labaid Diagnostic Ltd., Bogura",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-69871",
    "emergency": "কার্ডিয়াক ডায়াগনস্টিকস (Eco, ETT, Holter ECG) • ডিজিটাল এক্স-রে ও আল্ট্রাসাউন্ড • মলিকুলার বায়োলজি ও আরটি-পিসিআর (RT-PCR)"
  },
  {
    "name": "ডক্টরস ডায়াগনস্টিক সেন্টার, বগুড়া",
    "enName": "Doctors Diagnostic Centre, Bogura",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "মেডিকেল কলেজ মেইন গেট সংলগ্ন, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01712-445588",
    "emergency": "২৪/৭ জরুরী ল্যাব ইনভেস্টিগেশন • ইলেক্ট্রোলাইটস ও আর্টারিয়াল ব্লাড গ্যাস (ABG) • হিমাটোলজি ও কমপ্লিট ব্লাড কাউন্ট (CBC)"
  },
  {
    "name": "এপেক্স ডায়াগনস্টিক সেন্টার, বগুড়া",
    "enName": "Apex Diagnostic Centre & Consultation, Bogura",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "বড়গোলা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-64512",
    "emergency": "রুটিন বায়োকেমিস্ট্রি ও লিভার ফাংশন টেস্ট • ইউরিন ও স্টুল রুটিন মাইক্রোস্কোপি • ডিজিটাল ডেন্টাল ওপিজি এক্স-রে"
  },
  {
    "name": "মডার্ন ডায়াগনস্টিক সেন্টার, বগুড়া",
    "enName": "Modern Diagnostic Centre, Bogura",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "স্টেশন রোড, রেলওয়ে স্টেশন সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-66219",
    "emergency": "ক্লিনিক্যাল প্যাথলজি ও হিমাটোলজি • টু-ডি ও ফোর-ডি ইউএসজি (USG) • ডিজিটাল ১২-লিড ইসিজি (ECG)"
  },
  {
    "name": "সান্তাহার ডিজিটাল ডায়াগনস্টিক সেন্টার",
    "enName": "Santahar Digital Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "স্টেশন রোড, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১",
    "phone": "01711-224466",
    "emergency": "ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসনোগ্রাফি • রুটিন বায়োকেমিস্ট্রি ও রক্তের সম্পূর্ণ পরীক্ষা • ইসিজি ও হার্ট রেট অ্যানালাইসিস"
  },
  {
    "name": "আদমদীঘি সেন্ট্রাল ডায়াগনস্টিক সেন্টার",
    "enName": "Adamdighi Central Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "বাসস্ট্যান্ড সংলগ্ন, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01715-337799",
    "emergency": "রক্তের গ্লুকোজ ও লিপিড প্রোফাইল • লিভার ও কিডনি ফাংশন টেস্ট (LFT, RFT) • প্রেগন্যান্সি আল্ট্রাসাউন্ড"
  },
  {
    "name": "ধুনট মডার্ন ডায়াগনস্টিক অ্যান্ড কনসালটেশন সেন্টার",
    "enName": "Dhunat Modern Diagnostic & Consultation Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01714-882211",
    "emergency": "ডিজিটাল এক্স-রে ও কালার ডপলার ইউএসজি • ক্লিনিক্যাল বায়োকেমিস্ট্রি ও ইলেক্ট্রোলাইটস • ডায়াবেটিস ও এইচবিএওয়ানসি (HbA1c) টেস্ট"
  },
  {
    "name": "যমুনা ডায়াগনস্টিক সেন্টার, ধুনট",
    "enName": "Jamuna Diagnostic Centre, Dhunat",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "থানা রোড, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01718-993344",
    "emergency": "রুটিন প্যাথলজি ও ব্লাড সিবিসি (CBC with ESR) • ইউরিন প্রেগন্যান্সি ও রুটিন এক্সামিনেশন • হোল এবডোমেন আল্ট্রাসনোগ্রাম"
  },
  {
    "name": "দুপচাঁচিয়া ডিজিটাল ডায়াগনস্টিক সেন্টার",
    "enName": "Dhupchanchia Digital Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01712-991122",
    "emergency": "হাই-ফ্রিকোয়েন্সি ডিজিটাল এক্স-রে • ফোর-ডি কালার ডপলার ইউএসজি • অটোমেটেড হিমাটোলজি অ্যানালাইজার"
  },
  {
    "name": "তালোড়া মডেল ডায়াগনস্টিক সেন্টার, দুপচাঁচিয়া",
    "enName": "Talora Model Diagnostic Centre, Dhupchanchia",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "রেলওয়ে বাজার, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01716-558833",
    "emergency": "ক্লিনিক্যাল প্যাথলজি ও ব্লাড গ্রুপিং • স্পুটাম ও কফ পরীক্ষা • আল্ট্রাসনোগ্রাম ও ডিজিটাল ইসিজি"
  },
  {
    "name": "গাবতলী ডিজিটাল ডায়াগনস্টিক সেন্টার",
    "enName": "Gabtali Digital Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-662288",
    "emergency": "ডিজিটাল এক্স-রে ও চেস্ট রেডিওলজি • হোল এবডোমেন ও প্রেগন্যান্সি আল্ট্রাসাউন্ড • অটোমেটেড বায়োকেমিস্ট্রি টেস্ট"
  },
  {
    "name": "সোনারায় সেন্ট্রাল ডায়াগনস্টিক সেন্টার, গাবতলী",
    "enName": "Sonaray Central Diagnostic Centre, Gabtali",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "সোনারায় বাজার, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01719-441155",
    "emergency": "ক্লিনিক্যাল প্যাথলজি ও ব্লাড স্ক্রিনিং • ইউরিন ও স্টুল রুটিন পরীক্ষা • আল্ট্রাসনোগ্রাফি ও রক্তচাপ পরীক্ষা"
  },
  {
    "name": "কাহালু ডিজিটাল ডায়াগনস্টিক সেন্টার",
    "enName": "Kahalu Digital Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01711-447788",
    "emergency": "ডিজিটাল এক্স-রে ও কালার ডপলার ইউএসজি • কমপ্লিট ব্লাড কাউন্ট (CBC) ও সিরাম ক্রিয়েটিনিন • লিপিড প্রোফাইল ও ইউরিক এসিড"
  },
  {
    "name": "মুরইল মডেল ডায়াগনস্টিক সেন্টার, কাহালু",
    "enName": "Murail Model Diagnostic Centre, Kahalu",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01717-882244",
    "emergency": "বেসিক প্যাথলজি ও হেমাটোলজি • রক্তের গ্রুপ ও ক্রস-ম্যাচিং • প্রেগন্যান্সি আল্ট্রাসাউন্ড"
  },
  {
    "name": "নন্দীগ্রাম সেন্ট্রাল ডায়াগনস্টিক সেন্টার",
    "enName": "Nandigram Central Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01712-338800",
    "emergency": "ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসাউন্ড • বায়োকেমিস্ট্রি অ্যানালাইজার টেস্ট • লিপিড ও লিভার প্রোফাইল"
  },
  {
    "name": "ওমরপুর ডিজিটাল ডায়াগনস্টিক সেন্টার, নন্দীগ্রাম",
    "enName": "Omarpur Digital Diagnostic Centre, Nandigram",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "বগুড়া-নাটোর মহাসড়ক, ওমরপুর, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01715-771133",
    "emergency": "রুটিন ব্লাড টেস্টিং ও মাইক্রোস্কোপি • ইউরিন রুটিন ও স্পুটাম পরীক্ষা • আল্ট্রাসনোগ্রাফি ও ডিজিটাল ইসিজি"
  },
  {
    "name": "সারিয়াকান্দি মডার্ন ডায়াগনস্টিক সেন্টার",
    "enName": "Sariakandi Modern Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01714-229988",
    "emergency": "ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসনোগ্রাম • লিভার ও কিডনি ফাংশন টেস্ট • গর্ভবতী মায়েদের নিয়মিত পরীক্ষা ও ইসিজি"
  },
  {
    "name": "চন্দনবাইশা চরাঞ্চল ডায়াগনস্টিক সেন্টার, সারিয়াকান্দি",
    "enName": "Chandanbaisha Riverine Diagnostic Centre, Sariakandi",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "চন্দনবাইশা বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01716-119955",
    "emergency": "চরাঞ্চল কোল্ড-চেইন সংরক্ষিত রক্তের টেস্ট • ম্যালেরিয়া, ডেঙ্গু ও টাইফয়েড র‌্যাপিড টেস্ট • বেসিক বায়োকেমিস্ট্রি ও গ্লুকোজ পরীক্ষা"
  },
  {
    "name": "মাঝিড়া ক্যান্টনমেন্ট ডায়াগনস্টিক সেন্টার",
    "enName": "Majhira Cantonment Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "ক্যান্টনমেন্ট গেট সংলগ্ন, ঢাকা রোড, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-118844",
    "emergency": "মাল্টি-স্লাইস ডিজিটাল রেডিওলজি • ফোর-ডি কালার আল্ট্রাসাউন্ড • কার্ডিয়াক বায়োমার্কার্স (Troponin-I, CK-MB)"
  },
  {
    "name": "আড়িয়া ডিজিটাল ডায়াগনস্টিক সেন্টার, শাজাহানপুর",
    "enName": "Aria Digital Diagnostic Centre, Shajahanpur",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "ঢাকা-বগুড়া মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01718-442266",
    "emergency": "মহাসড়ক ট্রমা জরুরি ডিজিটাল এক্স-রে • ব্লাড গ্রুপিং ও ক্রস-ম্যাচিং • সিরাম ইলেক্ট্রোলাইটস ও রুটিন বায়োকেমিস্ট্রি"
  },
  {
    "name": "শেরপুর মডার্ন ডায়াগনস্টিক সেন্টার",
    "enName": "Sherpur Modern Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01711-554422",
    "emergency": "৫০০ এমএ হাই-ফ্রিকোয়েন্সি ডিজিটাল এক্স-রে • ফোর-ডি কালার আল্ট্রাসাউন্ড ও ইকোকার্ডিওগ্রাফি • সম্পূর্ণ অটোমেটেড বায়োকেমিস্ট্রি ও হরমোন টেস্ট"
  },
  {
    "name": "আপন ডায়াগনস্টিক অ্যান্ড কনসালটেশন সেন্টার, শেরপুর",
    "enName": "Apan Diagnostic & Consultation Centre, Sherpur",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "বাসস্ট্যান্ড সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01715-993311",
    "emergency": "কমপ্লিট ব্লাড কাউন্ট (CBC) ও পিভিএফ (PBF) • থাইরয়েড হরমোন (T3, T4, TSH) টেস্ট • লিভার ও রেনাল প্রোফাইল"
  },
  {
    "name": "সীমাবাড়ী ডিজিটাল ডায়াগনস্টিক সেন্টার, শেরপুর",
    "enName": "Shimabari Digital Diagnostic Centre, Sherpur",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "ঢাকা-বগুড়া মহাসড়ক, সীমাবাড়ী বাজার, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01716-884422",
    "emergency": "মহাসড়ক এক্সিডেন্ট জরুরি রেডিওলজি • রুটিন প্যাথলজি ও ব্লাড সুগার টেস্ট • আল্ট্রাসনোগ্রাফি"
  },
  {
    "name": "মোকামতলা সেন্ট্রাল ডায়াগনস্টিক সেন্টার",
    "enName": "Mokamtala Central Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01712-448833",
    "emergency": "ডিজিটাল স্কেলিটাল ও ট্রমা এক্স-রে • জরুরী ট্রমা ইউএসজি ও ফ্লুইড অ্যাসেসমেন্ট • র‌্যাপিড সিবিসি ও ব্লাড ক্রস-ম্যাচিং"
  },
  {
    "name": "শিবগঞ্জ ডিজিটাল ডায়াগনস্টিক সেন্টার",
    "enName": "Shibganj Digital Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01714-337711",
    "emergency": "ফোর-ডি কালার আল্ট্রাসনোগ্রাফি • রুটিন বায়োকেমিস্ট্রি ও লিভার প্যানেল • ক্লিনিক্যাল প্যাথলজি ও হরমোন টেস্ট"
  },
  {
    "name": "সোনাতলা মডার্ন ডায়াগনস্টিক সেন্টার",
    "enName": "Sonatala Modern Diagnostic Centre",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01711-773355",
    "emergency": "হাই-রেজোলিউশন ডিজিটাল এক্স-রে • প্রেগন্যান্সি ও অ্যাবডোমেন আল্ট্রাসনোগ্রাম • রক্তের সম্পূর্ণ বায়োকেমিক্যাল পরীক্ষা"
  },
  {
    "name": "বালুয়া ডিজিটাল ডায়াগনস্টিক সেন্টার, সোনাতলা",
    "enName": "Balua Digital Diagnostic Centre, Sonatala",
    "type": "diagnostic",
    "typeLabel": "Diagnostic Centres",
    "address": "বালুয়া হাট সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01715-228844",
    "emergency": "ক্লিনিক্যাল প্যাথলজি ও ইউরিন/স্টুল মাইক্রোস্কোপি • র‌্যাপিড ডায়াগনস্টিক টেস্ট (ম্যালেরিয়া, ডেঙ্গু) • আল্ট্রাসনোগ্রাফি ও রক্ত পরীক্ষা"
  },
  {
    "name": "বগুড়া ডায়াবেটিক সমিতি হাসপাতাল",
    "enName": "Bogura Diabetic Association Hospital",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "সূত্রাপুর, শেরপুর রোড সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-66254",
    "emergency": "বিশেষায়িত ডায়াবেটিস চিকিৎসা ও গাইডেন্স • ডায়াবেটিক রেটিনোপ্যাথি চক্ষু স্ক্রিনিং • ডায়াবেটিক ফুট কেয়ার ও আলসার সার্জারি"
  },
  {
    "name": "ডা. মতিন চক্ষু হাসপাতাল ও রিসার্চ ইনস্টিটিউট, বগুড়া",
    "enName": "Dr. Matin Eye Hospital & Research Institute, Bogura",
    "type": "private",
    "typeLabel": "Eye Hospitals",
    "address": "জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-63821",
    "emergency": "আধুনিক ফ্যাকো ছানি অপারেশন (Phaco Surgery) • রেটিনা ও ভিট্রিও-রেটিনাল লেজার সার্জারি • গ্লুকোমা ও অকুলোপ্লাস্টি অপারেশন"
  },
  {
    "name": "বগুড়া চক্ষু হাসপাতাল",
    "enName": "Bogura Eye Hospital",
    "type": "private",
    "typeLabel": "Eye Hospitals",
    "address": "মালতীনগর, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-65123",
    "emergency": "কম্পিউটারাইজড দৃষ্টি পরীক্ষা ও চশমার প্রেসক্রিপশন • মাইক্রো-ইনসিশন ক্যাটারেক্ট সার্জারি (MICS) • লেজার ট্রিটমেন্ট ও লো-ভিশন এইড"
  },
  {
    "name": "স্পেশালাইজড ডেন্টাল কেয়ার অ্যান্ড ওরাল সার্জারি, বগুড়া",
    "enName": "Specialized Dental Care & Oral Surgery, Bogura",
    "type": "private",
    "typeLabel": "Dental Clinics",
    "address": "শেরপুর রোড, কানোচগাড়ী, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01711-882233",
    "emergency": "রুট ক্যানেল ট্রিটমেন্ট (RCT) ও ক্রাউন ক্যাপ • ডেন্টাল ইমপ্লান্ট ও ব্রিজিং • অর্থোডন্টিক ব্র্যাকেটস ও বাঁকা দাঁত সোজা করা"
  },
  {
    "name": "বগুড়া বিশেষায়িত শিশু ও মাতৃ হাসপাতাল",
    "enName": "Bogura Specialized Child & Maternity Hospital",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "মেডিকেল রোড, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-225577",
    "emergency": "নবজাতক নিবিড় পরিচর্যা (NICU) ও ফটোথেরাপি • শিশুরোগ বিশেষজ্ঞ কনসালটেশন ও ইনডোর ওয়ার্ড • পেডিয়াট্রিক সার্জারি ও শিশু সার্জিক্যাল আইসিইউ"
  },
  {
    "name": "সিআরপি (পক্ষাঘাতগ্রস্তদের পুনর্বাসন কেন্দ্র) — বগুড়া",
    "enName": "Centre for the Rehabilitation of the Paralysed (CRP) - Bogura",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "হাইওয়ে লিংক রোড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01730-059588",
    "emergency": "স্ট্রোক ও স্পাইনাল কর্ড ইনজুরি ফিজিওথেরাপি • সেরিব্রাল পালসি (CP) আক্রান্ত শিশুদের পুনর্বাসন • অকুপেশনাল থেরাপি ও স্পিচ থেরাপি"
  },
  {
    "name": "সান্তাহার ডায়াবেটিক ও চক্ষু সেবা কেন্দ্র",
    "enName": "Santahar Diabetic & Eye Care Centre",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "স্টেশন রোড, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১",
    "phone": "01712-668811",
    "emergency": "ডায়াবেটিস নিয়মিত চেকআপ ও নিয়ন্ত্রণ • কম্পিউটারাইজড চক্ষু পরীক্ষা ও ছানি স্ক্রিনিং • ডায়াবেটিক রেটিনোপ্যাথি প্রাথমিক মূল্যায়ন"
  },
  {
    "name": "আদমদীঘি স্পেশালাইজড ডেন্টাল ক্লিনিক",
    "enName": "Adamdighi Specialized Dental Clinic",
    "type": "private",
    "typeLabel": "Dental Clinics",
    "address": "বাসস্ট্যান্ড সংলগ্ন, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01718-335577",
    "emergency": "দাঁতের আধুনিক ফিলিং ও রুট ক্যানেল • আল্ট্রাসনিক ডেন্টাল স্কেলিং ও পলিশিং • ব্যথামুক্ত দাঁত তোলা ও কৃত্রিম দাঁত সংযোজন"
  },
  {
    "name": "ধুনট উপজেলা ডায়াবেটিক সমিতি ক্লিনিক",
    "enName": "Dhunat Upazila Diabetic Samity Clinic",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01715-779922",
    "emergency": "রক্তে শর্করার মাত্রা নিয়মিত পর্যবেক্ষণ • ইনসুলিন গ্রহণ কৌশল প্রশিক্ষণ • উচ্চ রক্তচাপ ও কিডনি জটিলতা স্ক্রিনিং"
  },
  {
    "name": "ধুনট স্মাইল ডেন্টাল কেয়ার",
    "enName": "Dhunat Smile Dental Care",
    "type": "private",
    "typeLabel": "Dental Clinics",
    "address": "থানা মোড়, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01719-224466",
    "emergency": "ব্যথামুক্ত দাঁত তোলা ও চিকিৎসা • কসমেটিক ফিলিং ও রুট ক্যানেল • স্কেলিং ও মাড়ির রোগের চিকিৎসা"
  },
  {
    "name": "দুপচাঁচিয়া ডায়াবেটিক সমিতি সাব-সেন্টার",
    "enName": "Dhupchanchia Diabetic Association Sub-Centre",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "থানা মোড়, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01712-558800",
    "emergency": "ডায়াবেটিস শনাক্তকরণ ও নিয়মিত চিকিৎসা • এইচবিএওয়ানসি ও গ্লুকোজ পরীক্ষা • ডায়াবেটিক কার্ড রেজিস্ট্রেশন"
  },
  {
    "name": "দুপচাঁচিয়া চক্ষু ও ডেন্টাল কেয়ার",
    "enName": "Dhupchanchia Eye & Dental Care",
    "type": "private",
    "typeLabel": "Eye Hospitals",
    "address": "বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01716-447722",
    "emergency": "কম্পিউটারাইজড চোখের পাওয়ার পরীক্ষা • ছানিপড়া রোগীদের প্রাথমিক মূল্যায়ন • দাঁতের ফিলিং, স্কেলিং ও রুট ক্যানেল"
  },
  {
    "name": "গাবতলী ডায়াবেটিক কেয়ার সেন্টার",
    "enName": "Gabtali Diabetic Care Centre",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-881199",
    "emergency": "ডায়াবেটিস রোগীদের সার্বক্ষণিক পর্যবেক্ষণ • ফাস্টিং ও ২ ঘন্টা পরের ব্লাড সুগার টেস্ট • লিপিড ও ব্লাড প্রেশার ট্র্যাকিং"
  },
  {
    "name": "গাবতলী মডার্ন চক্ষু ক্লিনিক",
    "enName": "Gabtali Modern Eye Clinic",
    "type": "private",
    "typeLabel": "Eye Hospitals",
    "address": "গাবতলী বাজার রোড, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01718-553311",
    "emergency": "দৃষ্টিশক্তি পরীক্ষা ও চশমার পাওয়ার নির্ধারণ • গ্রামীণ ছানি অপারেশন ক্যাম্প ও রেফারেল • ড্রাই আই ও কনজাংকটিভাইটিস চিকিৎসা"
  },
  {
    "name": "কাহালু ডায়াবেটিক কনসালটেশন সেন্টার",
    "enName": "Kahalu Diabetic Consultation Centre",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "হাসপাতাল রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01711-669933",
    "emergency": "দীর্ঘস্থায়ী ডায়াবেটিসের বিশেষায়িত চিকিৎসা • রক্তে শর্করার তাৎক্ষণিক পরীক্ষা • ডায়াবেটিক স্নায়বিক জটিলতা নিরূপণ"
  },
  {
    "name": "কাহালু ডেন্টাল অ্যান্ড ম্যাক্সিলোফেসিয়াল কেয়ার",
    "enName": "Kahalu Dental & Maxillofacial Care",
    "type": "private",
    "typeLabel": "Dental Clinics",
    "address": "রেলগেট সংলগ্ন, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01717-336688",
    "emergency": "দাঁত ক্ষয় প্রতিরোধ ও ফিলিং • আল্ট্রাসোনিক স্কেলিং ও দাঁতের যত্ন • মাইনর ওরাল সার্জারি ও দাঁত তোলা"
  },
  {
    "name": "নন্দীগ্রাম ডায়াবেটিক অ্যান্ড ক্রনিক কেয়ার সেন্টার",
    "enName": "Nandigram Diabetic & Chronic Care Centre",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "বাসস্ট্যান্ড, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01712-449911",
    "emergency": "ডায়াবেটিস রোগী মনিটরিং ও খাদ্য পরামর্শ • হাইপারটেনশন ও কার্ডিয়াক রিস্ক স্ক্রিনিং • নিয়মিত ব্লাড সুগার ও লিপিড প্রোফাইল"
  },
  {
    "name": "নন্দীগ্রাম স্পেশালাইজড চক্ষু সেবা",
    "enName": "Nandigram Specialized Eye Care",
    "type": "private",
    "typeLabel": "Eye Hospitals",
    "address": "ওমরপুর মোড়, বগুড়া-নাটোর মহাসড়ক, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01715-882255",
    "emergency": "কম্পিউটারে চোখের দৃষ্টি পরীক্ষা • ছানি রোগী সনাক্তকরণ ও অপারেশন কাউন্সেলিং • গ্লুকোমা স্ক্রিনিং ও চোখের ড্রপ পরামর্শ"
  },
  {
    "name": "সারিয়াকান্দি ডায়াবেটিক ও চরাঞ্চল স্বাস্থ্য কল্যাণ ক্লিনিক",
    "enName": "Sariakandi Diabetic & Char Health Welfare Clinic",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01714-338822",
    "emergency": "চরাঞ্চলের রোগীদের বিশেষায়িত ডায়াবেটিস সেবা • ব্লাড গ্লুকোজ ও ব্লাড প্রেশার পরীক্ষা • খাদ্যাভ্যাস ও স্বাস্থ্যকর জীবনযাপন নির্দেশনা"
  },
  {
    "name": "সারিয়াকান্দি নদীমাতৃক চক্ষু সেবা ইউনিট",
    "enName": "Sariakandi Riverine Eye Care Unit",
    "type": "private",
    "typeLabel": "Eye Hospitals",
    "address": "সারিয়াকান্দি বাজার সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01716-227744",
    "emergency": "যমুনা চরাঞ্চলের মানুষের চোখের ছানি পরীক্ষা • দৃষ্টি ত্রুটি নির্ণয় ও সাশ্রয়ী মূল্যে চশমা বিতরণ • চোখের ইনফেকশন ও অ্যালার্জির চিকিৎসা"
  },
  {
    "name": "শাজাহানপুর ডায়াবেটিক ও এনসিডি পুনর্বাসন কেন্দ্র",
    "enName": "Shajahanpur Diabetic & NCD Rehabilitation Centre",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "ঢাকা-বগুড়া মহাসড়ক, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-229955",
    "emergency": "ডায়াবেটিস ও দীর্ঘস্থায়ী অসংক্রামক রোগ নিয়ন্ত্রণ • স্ট্রোক পরবর্তী ফিজিওথেরাপি ও পুনর্বাসন • প্যারালাইসিস ও জয়েন্ট পেইনের থেরাপি"
  },
  {
    "name": "আড়িয়া ডেন্টাল অ্যান্ড ওরাল হেলথ ক্লিনিক, শাজাহানপুর",
    "enName": "Aria Dental & Oral Health Clinic, Shajahanpur",
    "type": "private",
    "typeLabel": "Dental Clinics",
    "address": "ঢাকা মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01718-557733",
    "emergency": "দাঁতের আধুনিক রুট ক্যানেল ও লাইট কিউর ফিলিং • আল্ট্রাসোনিক স্কেলিং ও দাগ দূরীকরণ • আক্কেল দাঁতের জটিল সার্জারি"
  },
  {
    "name": "শেরপুর ডায়াবেটিক হাসপাতাল",
    "enName": "Sherpur Diabetic Hospital",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01711-443311",
    "emergency": "৩০ শয্যা বিশেষায়িত ডায়াবেটিস ইনডোর ও ডে-কেয়ার • ডায়াবেটিক নেফ্রোপ্যাথি ও কিডনি জটিলতা চিকিৎসা • ইনসুলিন ব্যাংক ও নিয়মিত ব্লাড সুগার প্রোফাইল"
  },
  {
    "name": "শেরপুর বিশেষায়িত চক্ষু হাসপাতাল",
    "enName": "Sherpur Specialized Eye Hospital",
    "type": "private",
    "typeLabel": "Eye Hospitals",
    "address": "বাসস্ট্যান্ড রোড, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01715-884466",
    "emergency": "মাইক্রো-সার্জারি ফ্যাকো ছানি অপারেশন • কম্পিউটারাইজড অটো-রিফ্রাকশন ও চশমা • ২৫ শয্যা চক্ষু ইনডোর ওয়ার্ড"
  },
  {
    "name": "শেরপুর ডেন্টাল কেয়ার অ্যান্ড ওরাল সার্জারি",
    "enName": "Sherpur Dental Care & Oral Surgery",
    "type": "private",
    "typeLabel": "Dental Clinics",
    "address": "কলেজ রোড, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01716-773399",
    "emergency": "রুট ক্যানেল ট্রিটমেন্ট (RCT) ও মেটাল/পোরসেলিন ক্যাপ • দাঁতের বন্ডিং ও কসমেটিক ফিলিং • মাড়ির রক্তক্ষরণ ও পাইওরিয়ার চিকিৎসা"
  },
  {
    "name": "শিবগঞ্জ ডায়াবেটিক অ্যান্ড ক্রনিক কেয়ার সেন্টার",
    "enName": "Shibganj Diabetic & Chronic Care Centre",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01712-339944",
    "emergency": "ডায়াবেটিস রোগীদের নিয়মিত গ্লুকোজ পর্যবেক্ষণ • এইচবিএওয়ানসি ও কিডনি স্ক্রিনিং • ডায়াবেটিক পায়ের যত্ন ও আলসার প্রতিরোধ"
  },
  {
    "name": "মোকামতলা চক্ষু ও ডেন্টাল কেয়ার সেন্টার, শিবগঞ্জ",
    "enName": "Mokamtala Eye & Dental Care Centre, Shibganj",
    "type": "private",
    "typeLabel": "Eye Hospitals",
    "address": "রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01714-226688",
    "emergency": "কম্পিউটারে চোখের দৃষ্টি পরীক্ষা ও চশমা • চোখের ছানি পরীক্ষা ও রেফারেল • দাঁতের ফিলিং, স্কেলিং ও রুট ক্যানেল"
  },
  {
    "name": "সোনাতলা ডায়াবেটিক সমিতি সাব-সেন্টার",
    "enName": "Sonatala Diabetic Association Sub-Centre",
    "type": "private",
    "typeLabel": "Specialized Healthcare Facilities",
    "address": "স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01711-662244",
    "emergency": "রুটিন ডায়াবেটিস সনাক্তকরণ ও চিকিৎসা • রক্তচাপ ও কার্ডিওভাসকুলার মনিটরিং • ইনসুলিন সরবরাহ ও খাদ্য নিয়ন্ত্রণ শিক্ষা"
  },
  {
    "name": "সোনাতলা স্মাইল ডেন্টাল ক্লিনিক",
    "enName": "Sonatala Smile Dental Clinic",
    "type": "private",
    "typeLabel": "Dental Clinics",
    "address": "সোনাতলা বাজার রোড, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01715-117733",
    "emergency": "ব্যথামুক্ত দাঁত তোলা ও চিকিৎসা • কম্পোজিট ফিলিং ও রুট ক্যানেল • দাঁতের স্কেলিং ও মাড়ির প্রদাহের যত্ন"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, বগুড়া সদর",
    "enName": "Surjer Hashi Clinic (SHN), Bogura Sadar",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "সূত্রাপুর, মালতীনগর রোড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-64582",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা (MCH) • স্বাভাবিক প্রসব সেবা ও রেফারেল • গর্ভকালীন (ANC) ও প্রসবোত্তর (PNC) যত্ন"
  },
  {
    "name": "ম্যারি স্টোপস ক্লিনিক, বগুড়া",
    "enName": "Marie Stopes Clinic, Bogura",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-69211",
    "emergency": "নিরাপদ মাতৃত্ব ও স্বাভাবিক প্রসব সেবা • জরায়ুমুখের ক্যান্সার স্ক্রিনিং (VIA Test) • পরিবার পরিকল্পনা সামগ্রী ও স্থায়ী পদ্ধতি"
  },
  {
    "name": "ব্র্যাক স্বাস্থ্য কেন্দ্র, বগুড়া সদর",
    "enName": "BRAC Health Centre, Bogura Sadar",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "এরুলিয়া বাজার সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01713-069811",
    "emergency": "কমিউনিটি গর্ভবতী চেকআপ • শিশুর পুষ্টি ও বৃদ্ধি পর্যবেক্ষণ • যক্ষ্মা ও সংক্রামক রোগ নিয়ন্ত্রণ স্ক্রিনিং"
  },
  {
    "name": "ঘাসফুল স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র, বগুড়া",
    "enName": "Ghashful Health & Family Welfare Centre, Bogura",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "ফাঁপোর গ্রাম, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01711-447700",
    "emergency": "মাতৃস্বাস্থ্য ও পুষ্টি শিক্ষা • টিকা ও সাধারণ প্রাথমিক চিকিৎসা • কিশোরী স্বাস্থ্য সচেতনতা"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, সান্তাহার (আদমদীঘি)",
    "enName": "Surjer Hashi Clinic, Santahar (Adamdighi)",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "রেলওয়ে কলোনি সংলগ্ন, সান্তাহার, আদমদীঘি, বগুড়া - ৫৮৯১",
    "phone": "01712-446688",
    "emergency": "মা ও শিশু প্রাথমিক সেবা • নরমাল ডেলিভারি ও প্রসূতি যত্ন • টিকা ও পুষ্টি কর্মসূচি"
  },
  {
    "name": "টিএমএসএস কমিউনিটি স্বাস্থ্য কেন্দ্র, আদমদীঘি",
    "enName": "TMSS Community Health Centre, Adamdighi",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "বাসস্ট্যান্ড রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01713-377112",
    "emergency": "গ্রামীণ মা ও শিশু স্বাস্থ্য সেবা • বিনামূল্যে পরামর্শ ও সাশ্রয়ী ওষুধ • স্বাভাবিক প্রসব সহায়তা"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, ধুনট",
    "enName": "Surjer Hashi Clinic, Dhunat",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স সংলগ্ন, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01714-771188",
    "emergency": "গর্ভবতী মায়েদের যত্ন ও স্বাভাবিক প্রসব • শিশু পুষ্টি ও টিকাদান • সাধারণ রোগীর আউটডোর চিকিৎসা"
  },
  {
    "name": "ব্র্যাক মাতৃ ও শিশু স্বাস্থ্য ক্লিনিক, ধুনট",
    "enName": "BRAC Maternal & Child Health Clinic, Dhunat",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "চিকাশী বাজার, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01713-069812",
    "emergency": "চরাঞ্চল সংলগ্ন মা ও শিশু স্বাস্থ্য • ডায়রিয়া ও নিউমোনিয়া প্রাথমিক চিকিৎসা • ইপিআই টিকাদান ও ভিটামিন এ ক্যাপসুল"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, দুপচাঁচিয়া",
    "enName": "Surjer Hashi Clinic, Dhupchanchia",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "থানা মোড়, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01712-331199",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • নিরাপদ স্বাভাবিক প্রসব • ইপিআই টিকা প্রদান"
  },
  {
    "name": "টিএমএসএস স্বাস্থ্য সেবা কেন্দ্র, দুপচাঁচিয়া",
    "enName": "TMSS Health Care Centre, Dhupchanchia",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "তালোড়া বাজার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01713-377113",
    "emergency": "শিল্প এলাকার শ্রমিকদের প্রাথমিক চিকিৎসা • মাতৃস্বাস্থ্য ও পুষ্টি সেবা • সাধারণ রোগীর আউটডোর কনসালটেশন"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, গাবতলী",
    "enName": "Surjer Hashi Clinic, Gabtali",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-448822",
    "emergency": "মাতৃ ও শিশু স্বাস্থ্য সেবা • স্বাভাবিক প্রসব সেবা ও পরিবার পরিকল্পনা • শিশুর টিকাদান ও পুষ্টি সহায়তা"
  },
  {
    "name": "টিএমএসএস স্বাস্থ্য কেন্দ্র, গাবতলী",
    "enName": "TMSS Health Centre, Gabtali",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "বালিয়াদিঘী বাজার, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01713-377114",
    "emergency": "গ্রামীণ কমিউনিটি স্বাস্থ্য সেবা • গর্ভবতী চেকআপ ও মা ও শিশু যত্ন • অল্প খরচে প্রয়োজনীয় ওষুধ বিতরণ"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, কাহালু",
    "enName": "Surjer Hashi Clinic, Kahalu",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01711-552277",
    "emergency": "গর্ভবতী মায়েদের প্রসবপূর্ব ও প্রসবোত্তর চেকআপ • স্বাভাবিক প্রসব সেবা • শিশুর টিকাদান ও বৃদ্ধি পর্যবেক্ষণ"
  },
  {
    "name": "টিএমএসএস স্বাস্থ্য কেন্দ্র, কাহালু",
    "enName": "TMSS Health Centre, Kahalu",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01713-377115",
    "emergency": "প্রাথমিক স্বাস্থ্য ও মা-শিশু পরামর্শ • স্বাভাবিক প্রসব সহায়তা • ওষুধ সরবরাহ ও কাউন্সেলিং"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, নন্দীগ্রাম",
    "enName": "Surjer Hashi Clinic, Nandigram",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01712-221177",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা • ইপিআই টিকাদান ও ভিটামিন বিতরণ"
  },
  {
    "name": "টিএমএসএস স্বাস্থ্য কেন্দ্র, নন্দীগ্রাম",
    "enName": "TMSS Health Centre, Nandigram",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "ভাটরা বাজার, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01713-377116",
    "emergency": "গ্রামীণ কমিউনিটি স্বাস্থ্য সেবা • প্রসূতি যত্ন ও টিকা কার্যক্রম • প্রাথমিক চিকিৎসা ও ফার্স্ট এইড"
  },
  {
    "name": "ব্র্যাক চরাঞ্চল স্বাস্থ্য ও পুষ্টি কেন্দ্র, সারিয়াকান্দি",
    "enName": "BRAC Char Health & Nutrition Centre, Sariakandi",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "কুতুবপুর চর সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01713-069813",
    "emergency": "যমুনা চরাঞ্চলের মানুষের জন্য বিশেষ স্বাস্থ্য সেবা • মা ও শিশুর পুষ্টি ও টিকাদান • বন্যা ও দুর্যোগকালীন মেডিকেল সহায়তা"
  },
  {
    "name": "টিএমএসএস চরাঞ্চল কমিউনিটি ক্লিনিক, সারিয়াকান্দি",
    "enName": "TMSS Char Community Clinic, Sariakandi",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "চালুয়াবাড়ী দ্বীপ চর, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01713-377117",
    "emergency": "চরাঞ্চলের প্রত্যন্ত জনগোষ্ঠীর স্বাস্থ্য সেবা • স্বাভাবিক প্রসব ও নিরাপদ মাতৃত্ব • বিনামূল্যে প্রাথমিক ওষুধ বিতরণ"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, শাজাহানপুর",
    "enName": "Surjer Hashi Clinic, Shajahanpur",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "ঢাকা মহাসড়ক সংলগ্ন, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-661133",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব সেবা ও পরিবার পরিকল্পনা • ইপিআই টিকাদান ও স্বাস্থ্য শিক্ষা"
  },
  {
    "name": "টিএমএসএস কমিউনিটি স্বাস্থ্য কেন্দ্র, শাজাহানপুর",
    "enName": "TMSS Community Health Centre, Shajahanpur",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01713-377118",
    "emergency": "প্রাথমিক স্বাস্থ্য ও মা-শিশু সেবা • স্বাভাবিক প্রসব ও টিকা • সাশ্রয়ী প্যাথলজি টেস্ট ও ওষুধ"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, শেরপুর",
    "enName": "Surjer Hashi Clinic, Sherpur",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01711-337722",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • ২৪ ঘন্টা নিরাপদ প্রসব সেবা • ইপিআই টিকাদান ও ভিটামিন কর্মসূচি"
  },
  {
    "name": "ম্যারি স্টোপস মাতৃসেবা কেন্দ্র, শেরপুর",
    "enName": "Marie Stopes Maternal Centre, Sherpur",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "বাসস্ট্যান্ড রোড, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01712-881144",
    "emergency": "নিরাপদ মাতৃত্ব ও স্বাভাবিক প্রসব • জরায়ুমুখের ক্যান্সার স্ক্রিনিং ও প্রজনন স্বাস্থ্য • আধুনিক পরিবার পরিকল্পনা পদ্ধতি"
  },
  {
    "name": "ব্র্যাক স্বাস্থ্য কেন্দ্র, শেরপুর",
    "enName": "BRAC Health Centre, Sherpur",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "মির্জাপুর বাজার, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01713-069814",
    "emergency": "কমিউনিটি গর্ভবতী চেকআপ • শিশু পুষ্টি ও স্বাভাবিক প্রসব সচেতনতা • সংক্রামক রোগ নিয়ন্ত্রণ ও চিকিৎসা"
  },
  {
    "name": "সূর্যের হাসি ক্লিনিক, শিবগঞ্জ",
    "enName": "Surjer Hashi Clinic, Shibganj",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01712-774411",
    "emergency": "মা ও শিশু স্বাস্থ্য সেবা • স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা • টিকা ও ভিটামিন বিতরণ"
  },
  {
    "name": "ব্র্যাক প্রাথমিক স্বাস্থ্য কেন্দ্র, শিবগঞ্জ",
    "enName": "BRAC Primary Health Centre, Shibganj",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "মোকামতলা মোড় সংলগ্ন, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01713-069815",
    "emergency": "কমিউনিটি গর্ভবতী স্বাস্থ্য পরীক্ষা • শিশু পুষ্টি ও বৃদ্ধি পর্যবেক্ষণ • টিবি ও সাধারণ স্বাস্থ্য পরামর্শ"
  },
  {
    "name": "টিএমএসএস স্বাস্থ্য সেবা সাব-সেন্টার, সোনাতলা",
    "enName": "TMSS Health Care Sub-Centre, Sonatala",
    "type": "private",
    "typeLabel": "NGO Healthcare Facilities",
    "address": "স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01713-377119",
    "emergency": "মা ও শিশু স্বাস্থ্য পরিচর্যা • স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা • টিকা ও পুষ্টি কর্মসূচি"
  },
  {
    "name": "বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি রক্ত কেন্দ্র, বগুড়া",
    "enName": "Bangladesh Red Crescent Society Blood Centre, Bogura",
    "type": "private",
    "typeLabel": "Blood Banks",
    "address": "রেড ক্রিসেন্ট ভবন, সূত্রাপুর, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-66543",
    "emergency": "২৪/৭ জরুরি রক্ত সরবরাহ ও ব্লাড গ্রুপিং • প্যাকড রেড ব্লাড সেলস (PRBC) সেপারেশন • ফ্রেশ ফ্রোজেন প্লাজমা (FFP) ও প্লেটলেট কনসেনট্রেট"
  },
  {
    "name": "সন্ধানী (শজিমেক ইউনিট) রক্ত ব্যাংক ও মরণোত্তর চক্ষুদান কেন্দ্র",
    "enName": "Sandhani (SZMC Unit) Blood Bank & Eye Donation Centre",
    "type": "private",
    "typeLabel": "Blood Banks",
    "address": "শহীদ জিয়াউর রহমান মেডিকেল কলেজ ক্যাম্পাস, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-60862",
    "emergency": "২৪ ঘন্টা জরুরি রক্তের গ্রুপ নির্ণয় ও ক্রস-ম্যাচিং • স্বেচ্ছায় রক্তদান সংগ্রহ ও রোগীর জন্য রক্ত সরবরাহ • মরণোত্তর কর্নিয়া সংগ্রহ ও চক্ষু ব্যাংক সংরক্ষণ"
  },
  {
    "name": "মোহাম্মদ আলী হাসপাতাল রক্ত পরিসঞ্চালন কেন্দ্র",
    "enName": "Mohammad Ali Hospital Blood Transfusion Centre",
    "type": "govt",
    "typeLabel": "Blood Banks",
    "address": "মোহাম্মদ আলী হাসপাতাল কম্পাউন্ড, হাসপাতাল রোড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-66020",
    "emergency": "হাসপাতালে ভর্তি ও জরুরি রোগীদের নিরাপদ রক্ত পরিসঞ্চালন • ব্লাড গ্রুপিং ও অ্যান্টিবডি স্ক্রিনিং • রক্তের পাঁচ প্রকার সংক্রামক রোগ পরীক্ষা"
  },
  {
    "name": "টিএমএসএস ব্লাড ব্যাংক ও ট্রান্সফিউশন মেডিসিন সেন্টার",
    "enName": "TMSS Blood Bank & Transfusion Medicine Centre",
    "type": "private",
    "typeLabel": "Blood Banks",
    "address": "টিএমএসএস মেডিকেল কলেজ হাসপাতাল, ঠেঙ্গামারা, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-78567",
    "emergency": "২৪/৭ সার্বক্ষণিক রক্তের উপাদান পৃথকীকরণ (Blood Components) • ক্রায়োপ্রিসিপিটেট ও ফ্রেশ প্লাজমা প্রস্তুতি • নিরাপদ ক্রস-ম্যাচিং ও স্ক্রিনিং"
  },
  {
    "name": "বাঁধন (স্বেচ্ছায় রক্তদাতাদের সংগঠন) — বগুড়া জেলা ইউনিট",
    "enName": "Badhan Blood Donation Network, Bogura District",
    "type": "private",
    "typeLabel": "Blood Banks",
    "address": "সরকারি আজিজুল হক কলেজ প্রাঙ্গণ, ফুলবাড়ি, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "01711-998877",
    "emergency": "জরুরি রোগীর জন্য তাৎক্ষণিক বিনামূল্যে রক্তদাতা ব্যবস্থা • বিনামূল্যে রক্তের গ্রুপ নির্ণয় ক্যাম্পেইন • তরুণ ও শিক্ষার্থীদের মধ্যে স্বেচ্ছায় রক্তদান সচেতনতা"
  },
  {
    "name": "ফায়ার সার্ভিস ও সিভিল ডিফেন্স কেন্দ্রীয় অ্যাম্বুলেন্স ইউনিট, বগুড়া",
    "enName": "Fire Service & Civil Defence Central Ambulance Unit, Bogura",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "ফায়ার স্টেশন কম্পাউন্ড, স্টেশন রোড, বগুড়া সদর, বগুড়া - ৫৮০০",
    "phone": "051-65555",
    "emergency": "২৪/৭ জরুরি দুর্ঘটনা ও ট্রমা পরিবহন (১৬১৬৩ / ৯৯৯) • অক্সিজেন ও ফার্স্ট এইড সজ্জিত অ্যাম্বুলেন্স • বন্যা, অগ্নিকাণ্ড ও দুর্যোগে আহতদের দ্রুত হাসপাতালে স্থানান্তর"
  },
  {
    "name": "শজিমেক হাসপাতাল নিবিড় পরিচর্যা (ICU) অ্যাম্বুলেন্স বহর",
    "enName": "SZRMCH Critical Care & ICU Ambulance Fleet",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল, সিলিমপুর, বগুড়া - ৫৮০০",
    "phone": "01711-820847",
    "emergency": "অ্যাডভান্সড লাইফ সাপোর্ট (ALS) ও পোর্টেবল ভেন্টিলেটর • আইসিইউ অন হুইলস (ICU on Wheels) ঢাকা ও বিভাগীয় স্থানান্তর • কার্ডিয়াক ডিফিব্রিলেটর ও সার্বক্ষণিক প্যারামেডিক"
  },
  {
    "name": "আদমদীঘি ফায়ার সার্ভিস ও হাসপাতাল জরুরি অ্যাম্বুলেন্স",
    "enName": "Adamdighi Fire Service & Hospital Emergency Ambulance",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স প্রাঙ্গণ, আদমদীঘি, বগুড়া - ৫৮৯২",
    "phone": "01730-002211",
    "emergency": "২৪/৭ জরুরি রোগী পরিবহন ও অক্সিজেন সহায়তা • রেলওয়ে জংশন ও মহাসড়ক দুর্ঘটনা রেসপন্স • বগুড়া মেডিকেল কলেজ হাসপাতালে জরুরি রেফারেল"
  },
  {
    "name": "ধুনট উপজেলা স্বাস্থ্য কমপ্লেক্স জরুরি অ্যাম্বুলেন্স",
    "enName": "Dhunat Upazila Health Complex Emergency Ambulance",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স, ধুনট, বগুড়া - ৫৮৫০",
    "phone": "01730-324621",
    "emergency": "২৪ ঘন্টা জরুরি প্রসূতি ও সাধারণ রোগী পরিবহন • অক্সিজেন সিলিন্ডার ও প্রাথমিক ট্রমা কেয়ার • জরুরি রেফারেল সার্ভিস"
  },
  {
    "name": "দুপচাঁচিয়া ফায়ার সার্ভিস ও হাসপাতাল অ্যাম্বুলেন্স ইউনিট",
    "enName": "Dhupchanchia Fire Service & Hospital Ambulance Unit",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স, দুপচাঁচিয়া, বগুড়া - ৫৮৮০",
    "phone": "01730-002212",
    "emergency": "মহাসড়ক সড়ক দুর্ঘটনার জরুরি রেসপন্স • ২৪/৭ রোগী স্থানান্তর ও অক্সিজেন সাপোর্ট • শজিমেক হাসপাতালে জরুরি রেফারেল"
  },
  {
    "name": "গাবতলী উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস",
    "enName": "Gabtali Upazila Health Complex Ambulance Service",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স প্রাঙ্গণ, গাবতলী, বগুড়া - ৫৮২০",
    "phone": "01730-324623",
    "emergency": "জরুরি প্রসূতি ও জটিল রোগী পরিবহন • ২৪/৭ জরুরি অক্সিজেন সুবিধা • বগুড়া সদর হাসপাতালে দ্রুত স্থানান্তর"
  },
  {
    "name": "কাহালু উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস",
    "enName": "Kahalu Upazila Health Complex Ambulance Service",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স, কাহালু, বগুড়া - ৫৮৭০",
    "phone": "01730-324624",
    "emergency": "২৪ ঘন্টা জরুরি রোগী পরিবহন • ফার্স্ট এইড ও অক্সিজেন সাপোর্ট • রেফারেল পরিবহন সুবিধা"
  },
  {
    "name": "নন্দীগ্রাম ফায়ার সার্ভিস ও হাসপাতাল জরুরি অ্যাম্বুলেন্স",
    "enName": "Nandigram Fire Service & Hospital Emergency Ambulance",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স, নন্দীগ্রাম, বগুড়া - ৫৮৬০",
    "phone": "01730-002213",
    "emergency": "বগুড়া-নাটোর মহাসড়ক জরুরি দুর্ঘটনা রেসপন্স • ২৪/৭ জরুরি অক্সিজেন সাপোর্ট অ্যাম্বুলেন্স • মেডিকেল কলেজ হাসপাতালে রেফারেল"
  },
  {
    "name": "সারিয়াকান্দি নদীমাতৃক স্পিডবোট ও সড়ক অ্যাম্বুলেন্স সার্ভিস",
    "enName": "Sariakandi Riverine Speedboat & Road Ambulance Service",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "যমুনা নদী ঘাট ও উপজেলা স্বাস্থ্য কমপ্লেক্স, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01730-324626",
    "emergency": "যমুনা চরাঞ্চলের জন্য বিশেষায়িত দ্রুতগামী ওয়াটার অ্যাম্বুলেন্স (Speedboat Ambulance) • ২৪/৭ জরুরি বন্যা ও দুর্যোগকালীন রোগী উদ্ধার • সড়ক অ্যাম্বুলেন্স যোগে জেলা হাসপাতালে স্থানান্তর"
  },
  {
    "name": "সারিয়াকান্দি স্বেচ্ছায় রক্তদাতা নেটওয়ার্ক",
    "enName": "Sariakandi Voluntary Blood Donor Network",
    "type": "private",
    "typeLabel": "Blood Banks",
    "address": "থানা রোড, সারিয়াকান্দি, বগুড়া - ৫৮৩০",
    "phone": "01716-448822",
    "emergency": "চরাঞ্চল ও নদী তীরবর্তী রোগীদের জন্য তাৎক্ষণিক রক্তদাতা ব্যবস্থা • রক্তের গ্রুপ ও ক্রস-ম্যাচিং সমন্বয় • জরুরি প্রসব ও রক্তক্ষরণে লাইফ সেভিং সহায়তা"
  },
  {
    "name": "শাজাহানপুর মহাসড়ক ফায়ার সার্ভিস ও জরুরি অ্যাম্বুলেন্স",
    "enName": "Shajahanpur Highway Fire Service & Emergency Ambulance",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "ঢাকা মহাসড়ক, মাঝিড়া ফায়ার স্টেশন, শাজাহানপুর, বগুড়া - ৫৮০১",
    "phone": "01730-002214",
    "emergency": "২৪/৭ মহাসড়ক দুর্ঘটনা জরুরি রেসপন্স • গুরুতর ট্রমা রোগীদের শজিমেক হাসপাতালে দ্রুত স্থানান্তর • অক্সিজেন ও লাইফ সাপোর্ট সরঞ্জাম"
  },
  {
    "name": "শেরপুর উপজেলা ফায়ার সার্ভিস ও হাসপাতাল অ্যাম্বুলেন্স বহর",
    "enName": "Sherpur Upazila Fire Service & Hospital Ambulance Fleet",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01730-002215",
    "emergency": "ঢাকা-বগুড়া মহাসড়ক এক্সিডেন্ট ইমার্জেন্সি রেসপন্স • ২৪/৭ জরুরি রোগী পরিবহন ও অক্সিজেন • বগুড়া সদর ও ঢাকা রেফারেল সহায়তা"
  },
  {
    "name": "শেরপুর উপজেলা রক্তদান ক্লাব",
    "enName": "Sherpur Upazila Blood Donation Club",
    "type": "private",
    "typeLabel": "Blood Banks",
    "address": "কলেজ রোড, শেরপুর, বগুড়া - ৫৮৪০",
    "phone": "01715-334411",
    "emergency": "জরুরি রোগীদের জন্য ২৪ ঘন্টা রক্তদাতা সরবরাহ • রক্তের গ্রুপ পরীক্ষা ও সচেতনতা • থ্যালাসেমিয়া ও প্রসূতি রোগীদের রক্ত সহায়তা"
  },
  {
    "name": "শিবগঞ্জ ফায়ার সার্ভিস ও মহাসড়ক ট্রমা অ্যাম্বুলেন্স ইউনিট",
    "enName": "Shibganj Fire Service & Highway Trauma Ambulance Unit",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "মোকামতলা মোড়, রংপুর মহাসড়ক, শিবগঞ্জ, বগুড়া - ৫৮১০",
    "phone": "01730-002216",
    "emergency": "রংপুর-বগুড়া মহাসড়ক দুর্ঘটনা দ্রুত পরিবহন • ২৪/৭ জরুরি অক্সিজেন ও ট্রমা ইমোবিলাইজেশন • শজিমেক হাসপাতালে দ্রুত রেফারেল"
  },
  {
    "name": "সোনাতলা উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস",
    "enName": "Sonatala Upazila Health Complex Ambulance Service",
    "type": "govt",
    "typeLabel": "Ambulance Services",
    "address": "উপজেলা স্বাস্থ্য কমপ্লেক্স, সোনাতলা, বগুড়া - ৫৮২০",
    "phone": "01730-324630",
    "emergency": "২৪ ঘন্টা জরুরি প্রসূতি ও সাধারণ রোগী পরিবহন • অক্সিজেন সজ্জিত অ্যাম্বুলেন্স সেবা • বগুড়া সদর হাসপাতালে জরুরি রেফারেল"
  }
];

export const emergencyData: EmergencyContact[] = [
  { title: 'জাতীয় জরুরি সেবা (পুলিশ, ফায়ার ও অ্যাম্বুলেন্স)', number: '999', icon: 'PhoneCall' },
  { title: 'বগুড়া জেলা পুলিশ কন্ট্রোল রুম', number: '01320-126498', icon: 'Shield' },
  { title: 'বগুড়া সদর থানা (অফিসার ইনচার্জ)', number: '01320-126402', icon: 'Building' },
  { title: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স, বগুড়া', number: '01730-002421', icon: 'Flame' },
  { title: 'নেসকো (বিদ্যুৎ অভিযোগ কেন্দ্র, বগুড়া)', number: '16603', icon: 'Zap' },
  { title: 'শজিমেক অ্যাম্বুলেন্স ও জরুরি ডেস্ক', number: '051-69965', icon: 'Ambulance' }
];

export const exploreData: ExploreSpot[] = [
  {
    title: 'মহাস্থানগড় (প্রাচীন পুণ্ড্রনগর)',
    enTitle: 'Mahasthangarh Citadel',
    location: 'শিবগঞ্জ উপজেলা, বগুড়া',
    tag: 'প্রত্নতাত্ত্বিক নিদর্শন',
    desc: 'খ্রিস্টপূর্ব ৩য় শতাব্দীর প্রাচীন পুণ্ড্রবর্ধন রাজ্যের রাজধানী। করতোয়া নদীর তীরে অবস্থিত বাংলাদেশের প্রাচীনতম নগর সভ্যতার নিদর্শন ও জাদুঘর।',
    icon: 'Landmark',
    color: 'from-amber-700 to-orange-800'
  },
  {
    title: 'বেহুলার বাসর ঘর (গোকুল মেধ)',
    enTitle: 'Gokul Medh (Behula Lakshindar)',
    location: 'গোকুল, শিবগঞ্জ, বগুড়া',
    tag: 'ঐতিহাসিক স্থাপনা',
    desc: 'মহাস্থানগড়ের ২ কিমি দক্ষিণে অবস্থিত ১৭২টি কুঠুরি বিশিষ্ট অনন্য স্থাপত্য নিদর্শন, যা লোককাহিনী ও বৌদ্ধ স্তূপের ইতিহাসের সাথে জড়িত।',
    icon: 'Building',
    color: 'from-emerald-800 to-teal-900'
  },
  {
    title: 'ভাসু বিহার (নরপতির ধাপ)',
    enTitle: 'Vasu Vihara Buddhist Monastery',
    location: 'বিহার, শিবগঞ্জ, বগুড়া',
    tag: 'প্রাচীন বৌদ্ধ বিহার',
    desc: 'চীনা পরিব্রাজক হিউয়েন সাং বর্ণিত "পো-শি-পো" বিহার। এখানে প্রাচীন বৌদ্ধ সংঘারাম, পোড়ামাটির ফলক ও ব্রোঞ্জ মূর্তি আবিষ্কৃত হয়েছে।',
    icon: 'Compass',
    color: 'from-teal-800 to-emerald-900'
  },
  {
    title: 'ঐতিহাসিক খেরুয়া মসজিদ (১৫৮২)',
    enTitle: 'Historic Kherua Mosque',
    location: 'খন্দকারটোলা, শেরপুর, বগুড়া',
    tag: 'সুলতানি স্থাপত্য',
    desc: '১৫৮২ সালে জওহর আলী কাকশালের পুত্র মির্জা মুরাদ খান কাকশাল নির্মিত তিন গম্বুজ বিশিষ্ট অপূর্ব পোড়ামাটির অলংকরণ সমৃদ্ধ মসজিদ।',
    icon: 'Castle',
    color: 'from-emerald-900 to-slate-900'
  },
  {
    title: 'প্রেম যমুনার ঘাট ও কালিতলা গ্রোয়েন',
    enTitle: 'Sariakandi Jamuna Ghat',
    location: 'সারিয়াকান্দি, বগুড়া',
    tag: 'নদী পর্যটন',
    desc: 'যমুনা নদীর বিশাল জলরাশি, সূর্যোদয়-সূর্যাস্ত এবং নৌকা ভ্রমণের জন্য বগুড়াবাসীর অন্যতম জনপ্রিয় অবকাশ কেন্দ্র।',
    icon: 'Waves',
    color: 'from-sky-800 to-cyan-900'
  },
  {
    title: 'নবাব প্যালেস ও বগুড়ার দই ঐতিহ্য',
    enTitle: 'Nawab Palace & Bogura Doi Heritage',
    location: 'সূত্রাপুর ও সাতমাথা, বগুড়া সদর',
    tag: 'ঐতিহ্য ও সংস্কৃতি',
    desc: 'পাকিস্তানের সাবেক প্রধানমন্ত্রী মোহাম্মদ আলী বগুড়ার ঐতিহাসিক নবাব প্যালেস এবং বগুড়ার বিশ্বখ্যাত জিআই স্বীকৃত দই ও মহাস্থানের কটকটি।',
    icon: 'Crown',
    color: 'from-amber-800 to-yellow-900'
  }
];

export const initialCommunityState: Record<string, CommunityPost[]> = {
  blood: [
    { id: 'donor-op-1', category: 'blood', name: 'মোঃ রাশেদুল ইসলাম', group: 'O+', role: 'রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'সাতমাথা / সূত্রাপুর · নিয়মিত রক্তদাতা (৪ মাস আগে দান)', phone: '01712-458920' },
    { id: 'donor-op-2', category: 'blood', name: 'মাহমুদুল হাসান', group: 'O+', role: 'জরুরি রক্তদাতা', upazila: 'সারিয়াকান্দি', detail: 'সারিয়াকান্দি সদর ও চরাঞ্চল · যেকোনো জরুরি মুহূর্তে প্রস্তুত', phone: '01712-998877' },
    { id: 'donor-op-3', category: 'blood', name: 'শাকিল আহমেদ', group: 'O+', role: 'রক্তদাতা', upazila: 'শাজাহানপুর', detail: 'বনানী ও মাঝিরা ক্যান্টনমেন্ট সংলগ্ন · যেকোনো সময় প্রস্তুত', phone: '01711-234567' },
    { id: 'donor-op-4', category: 'blood', name: 'রেজাউল করিম', group: 'O+', role: 'রক্তদাতা', upazila: 'শেরপুর', detail: 'শেরপুর পৌরসভা বাজার এলাকা · প্রস্তুত', phone: '01715-443322' },
    { id: 'donor-op-5', category: 'blood', name: 'বিপ্লব কুমার রায়', group: 'O+', role: 'রক্তদাতা', upazila: 'দুপচাঁচিয়া', detail: 'দুপচাঁচিয়া বাসস্ট্যান্ড মোড় · নিয়মিত রক্তদাতা', phone: '01723-556677' },
    { id: 'donor-op-6', category: 'blood', name: 'ইমরান হোসেন', group: 'O+', role: 'রক্তদাতা', upazila: 'গাবতলী', detail: 'গাবতলী রেলস্টেশন এলাকা · প্রস্তুত', phone: '01734-667788' },
    { id: 'donor-on-1', category: 'blood', name: 'মাহমুদুল হক', group: 'O-', role: 'জরুরি রক্তদাতা', upazila: 'শিবগঞ্জ', detail: 'মহাস্থানগড় ও শিবগঞ্জ · সার্বজনীন বিরল দাতা (এখন প্রস্তুত)', phone: '01911-762340' },
    { id: 'donor-on-2', category: 'blood', name: 'মিজানুর রহমান', group: 'O-', role: 'রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'উপশহর / কলোনি এলাকা · বিরল গ্রুপ প্রস্তুত', phone: '01716-889900' },
    { id: 'donor-on-3', category: 'blood', name: 'শরিফুল ইসলাম', group: 'O-', role: 'রক্তদাতা', upazila: 'শেরপুর', detail: 'শেরপুর বাসস্ট্যান্ড · জরুরি মুহূর্তে প্রস্তুত', phone: '01725-334455' },
    { id: 'donor-on-4', category: 'blood', name: 'তৌহিদুল আলম', group: 'O-', role: 'রক্তদাতা', upazila: 'আদমদীঘি', detail: 'সান্তাহার রেলওয়ে জংশন এলাকা · প্রস্তুত', phone: '01736-445566' },
    { id: 'donor-ap-1', category: 'blood', name: 'সাদিয়া আফরিন', group: 'A+', role: 'রক্তদাতা', upazila: 'শাজাহানপুর', detail: 'শজিমেক ক্যাম্পাস / সিলিমপুর · যেকোনো সময় প্রস্তুত', phone: '01819-334112' },
    { id: 'donor-ap-2', category: 'blood', name: 'তানভীর আহমেদ', group: 'A+', role: 'রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'জলেশ্বরীতলা / রহমান নগর · নিয়মিত রক্তদাতা', phone: '01718-445566' },
    { id: 'donor-ap-3', category: 'blood', name: 'আল-আমিন হোসেন', group: 'A+', role: 'রক্তদাতা', upazila: 'শেরপুর', detail: 'শেরপুর শহর ও বারোদুয়ারি · প্রস্তুত', phone: '01729-556677' },
    { id: 'donor-ap-4', category: 'blood', name: 'রোকনুজ্জামান রোকন', group: 'A+', role: 'রক্তদাতা', upazila: 'শিবগঞ্জ', detail: 'মোকামতলা হাইওয়ে মোড় · জরুরি রক্তদাতা', phone: '01740-667788' },
    { id: 'donor-ap-5', category: 'blood', name: 'মেহেদী হাসান', group: 'A+', role: 'রক্তদাতা', upazila: 'দুপচাঁচিয়া', detail: 'দুপচাঁচিয়া বাজার ও কলেজ রোড · প্রস্তুত', phone: '01751-778899' },
    { id: 'donor-ap-6', category: 'blood', name: 'সোহেল রানা', group: 'A+', role: 'রক্তদাতা', upazila: 'গাবতলী', detail: 'কাগইল বাজার ও গাবতলী সদর · যেকোনো সময় প্রস্তুত', phone: '01762-889900' },
    { id: 'donor-an-1', category: 'blood', name: 'ডাঃ আসিফ ইকবাল', group: 'A-', role: 'জরুরি রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'শজিমেক হাসপাতাল কম্পাউন্ড · বিরল গ্রুপ প্রস্তুত', phone: '01714-778899' },
    { id: 'donor-an-2', category: 'blood', name: 'ফারহানা আক্তার', group: 'A-', role: 'রক্তদাতা', upazila: 'শাজাহানপুর', detail: 'মাঝিরা ক্যান্টনমেন্ট এলাকা · বিরল গ্রুপ প্রস্তুত', phone: '01825-889900' },
    { id: 'donor-an-3', category: 'blood', name: 'জাহিদুল ইসলাম', group: 'A-', role: 'রক্তদাতা', upazila: 'কাহালু', detail: 'কাহালু রেলস্টেশন সংলগ্ন · জরুরি রক্তদাতা', phone: '01736-990011' },
    { id: 'donor-an-4', category: 'blood', name: 'শামীম রেজা', group: 'A-', role: 'রক্তদাতা', upazila: 'সোনাতলা', detail: 'সোনাতলা উপজেলা সদর · প্রস্তুত', phone: '01747-112233' },
    { id: 'donor-bp-1', category: 'blood', name: 'তানভীর হাসান', group: 'B+', role: 'রক্তদাতা', upazila: 'শেরপুর', detail: 'শেরপুর পৌরসভা ও বাসস্ট্যান্ড · নিয়মিত রক্তদাতা', phone: '01715-990231' },
    { id: 'donor-bp-2', category: 'blood', name: 'কামরুল ইসলাম', group: 'B+', role: 'রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'সাতমাথা ও চেলোপাড়া · যেকোনো সময় প্রস্তুত', phone: '01726-112233' },
    { id: 'donor-bp-3', category: 'blood', name: 'তারিকুল ইসলাম', group: 'B+', role: 'রক্তদাতা', upazila: 'আদমদীঘি', detail: 'সান্তাহার পৌরসভা বাজার · প্রস্তুত', phone: '01737-223344' },
    { id: 'donor-bp-4', category: 'blood', name: 'সজিব মিয়া', group: 'B+', role: 'রক্তদাতা', upazila: 'ধুনট', detail: 'ধুনট সদর বাজার এলাকা · জরুরি রক্তদাতা', phone: '01748-334455' },
    { id: 'donor-bp-5', category: 'blood', name: 'আশিকুর রহমান', group: 'B+', role: 'রক্তদাতা', upazila: 'সারিয়াকান্দি', detail: 'সারিয়াকান্দি কালিতলা ঘাট এলাকা · প্রস্তুত', phone: '01759-445566' },
    { id: 'donor-bp-6', category: 'blood', name: 'শাহাদাত হোসেন', group: 'B+', role: 'রক্তদাতা', upazila: 'নন্দীগ্রাম', detail: 'নন্দীগ্রাম বাসস্ট্যান্ড · যেকোনো সময় প্রস্তুত', phone: '01770-556677' },
    { id: 'donor-bn-1', category: 'blood', name: 'মাহফুজুর রহমান', group: 'B-', role: 'জরুরি রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'ছিলিমপুর / শজিমেক সংলগ্ন এলাকা · বিরল গ্রুপ প্রস্তুত', phone: '01738-112233' },
    { id: 'donor-bn-2', category: 'blood', name: 'নজরুল ইসলাম', group: 'B-', role: 'রক্তদাতা', upazila: 'শিবগঞ্জ', detail: 'শিবগঞ্জ থানা মোড় · বিরল গ্রুপ প্রস্তুত', phone: '01749-223344' },
    { id: 'donor-bn-3', category: 'blood', name: 'আরিফ বিল্লাহ', group: 'B-', role: 'রক্তদাতা', upazila: 'শেরপুর', detail: 'শেরপুর কলেজ রোড · জরুরি প্রয়োজনে প্রস্তুত', phone: '01760-334455' },
    { id: 'donor-abp-1', category: 'blood', name: 'নুসরাত জাহান', group: 'AB+', role: 'রক্তদাতা', upazila: 'দুপচাঁচিয়া', detail: 'দুপচাঁচিয়া সদর ও পৌরসভা · নিয়মিত রক্তদাতা', phone: '01722-618490' },
    { id: 'donor-abp-2', category: 'blood', name: 'শাহরিয়ার কবির', group: 'AB+', role: 'রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'সূত্রাপুর / নবাববাড়ী রোড · যেকোনো সময় প্রস্তুত', phone: '01733-778899' },
    { id: 'donor-abp-3', category: 'blood', name: 'আনিসুর রহমান', group: 'AB+', role: 'রক্তদাতা', upazila: 'কাহালু', detail: 'কাহালু বাজার মোড় · প্রস্তুত', phone: '01744-889900' },
    { id: 'donor-abp-4', category: 'blood', name: 'জাহাঙ্গীর আলম', group: 'AB+', role: 'রক্তদাতা', upazila: 'নন্দীগ্রাম', detail: 'নন্দীগ্রাম পৌর এলাকা · নিয়মিত রক্তদাতা', phone: '01755-990011' },
    { id: 'donor-abn-1', category: 'blood', name: 'ডাঃ মাসুদ পারভেজ', group: 'AB-', role: 'জরুরি রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'শজিমেক হাসপাতাল · অতি বিরল গ্রুপ প্রস্তুত', phone: '01711-889911' },
    { id: 'donor-abn-2', category: 'blood', name: 'রিফাত হাসান', group: 'AB-', role: 'রক্তদাতা', upazila: 'শেরপুর', detail: 'শেরপুর শহরের কলেজ রোড · অতি বিরল গ্রুপ প্রস্তুত', phone: '01722-990022' },
    { id: 'donor-abn-3', category: 'blood', name: 'মনিরুল ইসলাম', group: 'AB-', role: 'রক্তদাতা', upazila: 'শিবগঞ্জ', detail: 'মহাস্থানগড় ও শিবগঞ্জ সদর · অতি বিরল গ্রুপ প্রস্তুত', phone: '01733-112244' }
  ],
  tuition: [
    { id: 't1', category: 'tuition', name: 'আব্দুল্লাহ আল মামুন (বুয়েট শিক্ষার্থী)', upazila: 'বগুড়া সদর', detail: 'নবম–দ্বাদশ শ্রেণি: পদার্থবিজ্ঞান ও উচ্চতর গণিত', phone: '01745-882190', badge: 'শিক্ষক উপলব্ধ' },
    { id: 't2', category: 'tuition', name: 'ফারহানা ইয়াসমিন (রাবি স্নাতকোত্তর)', upazila: 'বগুড়া সদর', detail: 'ইংরেজি ও বিজ্ঞান (৬ষ্ঠ–১০ম শ্রেণি, জলেশ্বরীতলা)', phone: '01823-449012', badge: 'শিক্ষিকা উপলব্ধ' },
    { id: 't3', category: 'tuition', name: 'গৃহশিক্ষক প্রয়োজন (৭ম শ্রেণি)', upazila: 'শেরপুর', detail: 'সপ্তাহে ৪ দিন ইংরেজি ও গণিত · সম্মানী আলোচনা সাপেক্ষে', phone: '01711-552310', badge: 'টিউশন অফার' },
    { id: 't4', category: 'tuition', name: 'সাকিবুল ইসলাম (শজিমেক)', upazila: 'শাজাহানপুর', detail: 'মেডিকেল ভর্তি প্রস্তুতি ও জীববিজ্ঞান স্পেশাল ব্যাচ', phone: '01675-221908', badge: 'শিক্ষক উপলব্ধ' }
  ],
  rent: [
    { id: 'r1', category: 'rent', name: '২ বেডরুম ফ্যামিলি ফ্ল্যাট ভাড়া', upazila: 'বগুড়া সদর', detail: 'জলেশ্বরীতলা, বগুড়া · গ্যাস, লিফট ও গ্যারেজ সুবিধা · ভাড়া: ১২,৫০০৳', phone: '01711-334455', badge: 'ফ্যামিলি বাসা' },
    { id: 'r2', category: 'rent', name: 'ছাত্র মেস / সিট ভাড়া (শজিমেক সংলগ্ন)', upazila: 'শাজাহানপুর', detail: 'সিলিমপুর, শজিমেক গেট সংলগ্ন · ওয়াইফাই ও মিল সুবিধা · ২,৮০০৳', phone: '01817-665544', badge: 'ছাত্র মেস' },
    { id: 'r3', category: 'rent', name: 'মেইন রোডে বাণিজ্যিক দোকান ভাড়া', upazila: 'শেরপুর', detail: 'শেরপুর বাসস্ট্যান্ড বাজার · ৪৫০ বর্গফুট · অগ্রিম আলোচনা সাপেক্ষে', phone: '01712-908070', badge: 'দোকান / অফিস' },
    { id: 'r4', category: 'rent', name: '৩ রুমের নিচতলা বাসা ভাড়া', upazila: 'বগুড়া সদর', detail: 'উপশহর, বগুড়া · শান্ত পরিবেশ, ২৪ ঘণ্টা পানি · ১০,০০০৳', phone: '01912-443322', badge: 'ফ্যামিলি বাসা' }
  ],
  jobs: [
    { id: 'j1', category: 'jobs', name: 'মোঃ শফিকুল ইসলাম — দক্ষ ইলেকট্রিশিয়ান', upazila: 'বগুড়া সদর', detail: 'বাসাবাড়ি ও অফিসের ওয়্যারিং, আইপিএস ও এসি সার্ভিসিং', phone: '01725-778899', badge: 'দক্ষ টেকনিশিয়ান' },
    { id: 'j2', category: 'jobs', name: 'রফিকুল আলম — অভিজ্ঞ প্রাইভেট কার ড্রাইভার', upazila: 'বগুড়া সদর', detail: 'বৈধ পেশাদার লাইসেন্সধারী · ঢাকা ও উত্তরবঙ্গ রুটে অভিজ্ঞ', phone: '01815-123987', badge: 'ড্রাইভার' },
    { id: 'j3', category: 'jobs', name: 'সেলস এক্সিকিউটিভ নিয়োগ (বগুড়া জোন)', upazila: 'বগুড়া সদর', detail: 'স্থানীয় এগ্রো ও ফুড কোম্পানিতে ফিল্ড অফিসার প্রয়োজন', phone: '01713-556677', badge: 'চাকরির বিজ্ঞপ্তি' },
    { id: 'j4', category: 'jobs', name: 'হাবিবুর রহমান — প্লাম্বার ও স্যানিটারি মিস্ত্রি', upazila: 'শেরপুর', detail: 'পানির লাইন, মোটর ও আধুনিক বাথরুম ফিটিংস কাজ', phone: '01921-654321', badge: 'স্যানিটারি কর্মী' }
  ],
  business: [
    { id: 'bu1', category: 'business', name: 'এশিয়া সুইটমিট অ্যান্ড কোল্ড ড্রিংকস', upazila: 'বগুড়া সদর', detail: 'কবি নজরুল ইসলাম সড়ক, বগুড়া · ঐতিহ্যবাহী শাহী দই ও মিষ্টান্ন', phone: '051-66294', badge: 'জিআই বগুড়ার দই' },
    { id: 'bu2', category: 'business', name: 'আকবরিয়া গ্র্যান্ড হোটেল অ্যান্ড সুইটস', upazila: 'বগুড়া সদর', detail: 'থানা রোড, বগুড়া · শতবর্ষী ঐতিহ্যবাহী দই, লাচ্ছা সেমাই ও রেস্তোরাঁ', phone: '01711-311222', badge: 'শতবর্ষী ঐতিহ্য' },
    { id: 'bu3', category: 'business', name: 'মহাস্থান দই ঘর ও কটকটি ভান্ডার', upazila: 'শিবগঞ্জ', detail: 'মহাস্থানগড় বাসস্ট্যান্ড · খাঁটি সরের দই ও প্রসিদ্ধ মহাস্থানের কটকটি', phone: '01718-445566', badge: 'দই ও কটকটি' },
    { id: 'bu4', category: 'business', name: 'শেরপুর সাউদিয়া দই ঘর', upazila: 'শেরপুর', detail: 'শেরপুর বাজার, বগুড়া · খাঁটি দুধের তৈরি স্পেশাল ক্ষীরসা দই', phone: '01714-778800', badge: 'শেরপুরের দই' },
    { id: 'bu5', category: 'business', name: 'বগুড়া এগ্রো মেশিনারিজ ও ফাউন্ড্রি হাব', upazila: 'বগুড়া সদর', detail: 'বিসিক শিল্পনগরী ও রেলওয়ে মার্কেট · কৃষি যন্ত্রপাতি ও খুচরা যন্ত্রাংশ', phone: '01712-304050', badge: 'স্থানীয় শিল্প' }
  ]
};

