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
}

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
    name: 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল (শজিমেক)',
    enName: 'Shaheed Ziaur Rahman Medical College Hospital (SZRMC)',
    type: 'govt',
    typeLabel: 'সরকারি মেডিকেল কলেজ',
    address: 'সিলিমপুর, বগুড়া সদর / শাজাহানপুর',
    phone: '051-69965',
    emergency: '২৪/৭ জরুরি বিভাগ, আইসিইউ ও ট্রমা সেন্টার'
  },
  {
    name: '২৫০ শয্যা বিশিষ্ট মোহাম্মদ আলী জেলা হাসপাতাল',
    enName: '250-Bed Mohammad Ali District Hospital',
    type: 'govt',
    typeLabel: 'জেলা সদর হাসপাতাল',
    address: 'শেরপুর রোড, বগুড়া সদর',
    phone: '051-66550',
    emergency: '২৪/৭ জরুরি বিভাগ, সার্জারি ও মাতৃসদন'
  },
  {
    name: 'টিএমএসএস মেডিকেল কলেজ ও রাফাতুল্লাহ কমিউনিটি হাসপাতাল',
    enName: 'TMSS Medical College & Rafatullah Community Hospital',
    type: 'private',
    typeLabel: 'বেসরকারি মেডিকেল কলেজ',
    address: 'ঠেঙ্গামারা, রংপুর রোড, বগুড়া সদর',
    phone: '01713-377077',
    emergency: '২৪/৭ জরুরি বিভাগ, কার্ডিয়াক ও বিশেষজ্ঞ সেবা'
  },
  {
    name: 'পপুলার ডায়াগনস্টিক সেন্টার লিমিটেড (বগুড়া শাখা)',
    enName: 'Popular Diagnostic Centre Ltd.',
    type: 'diagnostic',
    typeLabel: 'ডায়াগনস্টিক ও কনসালটেশন',
    address: 'শেরপুর রোড, ঠনঠনিয়া, বগুড়া',
    phone: '09613-787812',
    emergency: 'এমআরআই, সিটি স্ক্যান ও বিশেষজ্ঞ চিকিৎসক চেম্বার'
  },
  {
    name: 'ইবনে সিনা ডায়াগনস্টিক অ্যান্ড কনসালটেশন সেন্টার',
    enName: 'Ibn Sina Diagnostic & Consultation Center',
    type: 'diagnostic',
    typeLabel: 'ডায়াগনস্টিক সেন্টার',
    address: 'শেরপুর রোড, কলোনি, বগুড়া',
    phone: '09610-009622',
    emergency: 'আধুনিক প্যাথলজি, আল্ট্রাসনোগ্রাম ও বিশেষজ্ঞ সেবা'
  },
  {
    name: 'শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
    enName: 'Sherpur Upazila Health Complex',
    type: 'govt',
    typeLabel: 'উপজেলা স্বাস্থ্য কমপ্লেক্স',
    address: 'শেরপুর, বগুড়া',
    phone: '01730-324762',
    emergency: '২৪/৭ জরুরি বিভাগ ও প্রাথমিক স্বাস্থ্যসেবা'
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
    { id: 'b1', category: 'blood', name: 'মোঃ রাশেদুল ইসলাম', group: 'O+', role: 'রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'সাতমাথা, বগুড়া · সর্বশেষ দান: ৪ মাস আগে', phone: '01712-458920' },
    { id: 'b2', category: 'blood', name: 'সাদিয়া আফরিন', group: 'A+', role: 'রক্তদাতা', upazila: 'শাজাহানপুর', detail: 'শজিমেক ক্যাম্পাস · যেকোনো সময় প্রস্তুত', phone: '01819-334112' },
    { id: 'b3', category: 'blood', name: 'তানভীর হাসান', group: 'B+', role: 'রক্তদাতা', upazila: 'শেরপুর', detail: 'শেরপুর পৌরসভা · স্বেচ্ছাসেবী রক্তদাতা', phone: '01715-990231' },
    { id: 'b4', category: 'blood', name: 'মাহমুদুল হক', group: 'O-', role: 'রক্তদাতা', upazila: 'শিবগঞ্জ', detail: 'মহাস্থানগড় এলাকা · জরুরি প্রয়োজনে কল করুন', phone: '01911-762340' },
    { id: 'b5', category: 'blood', name: 'নুসরাত জাহান', group: 'AB+', role: 'রক্তদাতা', upazila: 'দুপচাঁচিয়া', detail: 'দুপচাঁচিয়া সদর · নিয়মিত রক্তদাতা', phone: '01722-618490' },
    { id: 'b6', category: 'blood', name: 'জরুরি রক্ত প্রয়োজন (শজিমেক)', group: 'B-', role: 'জরুরি প্রয়োজন', upazila: 'বগুড়া সদর', detail: 'শজিমেক মেডিসিন ওয়ার্ড · ২ ব্যাগ রক্ত প্রয়োজন', phone: '01738-112233' }
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

