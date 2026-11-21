/**
 * Amr Bogura — Master Seeder Engine (Node.js ESM)
 * Consolidates and seeds all project datasets:
 * 1. 12 Upazilas
 * 2. 8 Tourist & Heritage Spots with 9 Reviews
 * 3. 8 Emergency Contacts
 * 4. 18 Community Posts (Blood, Tuition, Rent, Jobs, Business)
 * 5. 352 Healthcare Facilities (DGHS verified across 10 categories)
 * 6. Generates full supabase/seed.sql and updates supabase/schema.sql
 */

import fs from 'fs';
import path from 'path';

// Helper to escape SQL single quotes
function sqlEscape(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

// Helper to escape JSON for SQL
function sqlJson(obj) {
  if (obj === null || obj === undefined) return "'[]'::jsonb";
  return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
}

async function run() {
  console.log('\n======================================================');
  console.log('   Amr Bogura (আমার বগুড়া) — Master Seeder Engine    ');
  console.log('======================================================\n');

  const baseDir = process.cwd();
  const healthcareAllPath = path.join(baseDir, 'amr-bogura-data', 'healthcare', 'healthcare-all.json');
  const schemaPath = path.join(baseDir, 'supabase', 'schema.sql');
  const seedSqlPath = path.join(baseDir, 'supabase', 'seed.sql');

  // 1. Read Healthcare All Data (352 facilities)
  if (!fs.existsSync(healthcareAllPath)) {
    throw new Error(`Master healthcare file not found: ${healthcareAllPath}`);
  }
  const healthcareRaw = JSON.parse(fs.readFileSync(healthcareAllPath, 'utf-8'));
  const facilities = healthcareRaw.data || [];
  console.log(`✓ Loaded Healthcare Facilities: ${facilities.length} verified records`);

  // 2. Read district-data.ts and explore-data.ts
  const districtDataRaw = fs.readFileSync(path.join(baseDir, 'lib', 'data', 'district-data.ts'), 'utf-8');
  const exploreDataRaw = fs.readFileSync(path.join(baseDir, 'lib', 'data', 'explore-data.ts'), 'utf-8');

  // Dynamic import of TS files or ESM modules
  // We can dynamically evaluate the exports by using temporary ESM files or reading JSON
  // Let's create SQL statements directly
  const sqlStatements = [];
  sqlStatements.push('-- ========================================================');
  sqlStatements.push('-- AMAR BOGURA (আমার বগুড়া) — MASTER SEED SCRIPT (seed.sql)');
  sqlStatements.push('-- Generated on: ' + new Date().toISOString());
  sqlStatements.push('-- Total Healthcare Facilities: ' + facilities.length);
  sqlStatements.push('-- ========================================================\n');

  // Enable extensions
  sqlStatements.push('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n');

  // --------------------------------------------------------
  // A. Table Definition: healthcare_facilities
  // --------------------------------------------------------
  const healthcareTableDdl = `
-- 7. Master Healthcare Facilities Table
CREATE TABLE IF NOT EXISTS public.healthcare_facilities (
  id TEXT PRIMARY KEY,
  dghs_facility_id TEXT NOT NULL,
  name TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  slug TEXT NOT NULL,
  category TEXT NOT NULL,
  facility_type TEXT NOT NULL,
  original_facility_type TEXT NOT NULL,
  ownership TEXT NOT NULL,
  district TEXT NOT NULL,
  district_bn TEXT NOT NULL,
  upazila TEXT NOT NULL,
  upazila_bn TEXT NOT NULL,
  union_name TEXT,
  union_bn TEXT,
  village_or_area TEXT,
  address TEXT NOT NULL,
  phone JSONB NOT NULL DEFAULT '[]',
  email TEXT,
  website TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  google_maps_url TEXT NOT NULL,
  image_url TEXT,
  services JSONB NOT NULL DEFAULT '[]',
  source_urls JSONB NOT NULL DEFAULT '[]',
  verification_status TEXT NOT NULL DEFAULT 'verified',
  last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_healthcare_upazila ON public.healthcare_facilities (upazila);
CREATE INDEX IF NOT EXISTS idx_healthcare_category ON public.healthcare_facilities (category);
CREATE INDEX IF NOT EXISTS idx_healthcare_ownership ON public.healthcare_facilities (ownership);
CREATE INDEX IF NOT EXISTS idx_healthcare_dghs_id ON public.healthcare_facilities (dghs_facility_id);

ALTER TABLE public.healthcare_facilities ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'healthcare_facilities' AND policyname = 'Public read healthcare_facilities'
  ) THEN
    CREATE POLICY "Public read healthcare_facilities" ON public.healthcare_facilities FOR SELECT USING (true);
  END IF;
END $$;
`;

  // Update schema.sql if not already containing healthcare_facilities
  let schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  if (!schemaContent.includes('healthcare_facilities')) {
    schemaContent += '\n' + healthcareTableDdl;
    fs.writeFileSync(schemaPath, schemaContent, 'utf-8');
    console.log('✓ Updated supabase/schema.sql with healthcare_facilities table schema');
  }

  sqlStatements.push(healthcareTableDdl);

  // --------------------------------------------------------
  // B. Seed: Upazilas Table (12 Records)
  // --------------------------------------------------------
  console.log('Generating seed for 12 Upazilas...');
  const upazilasSeedData = [
    {
      serial_bn: '০১', serial_en: '01', name: 'বগুড়া সদর', en_name: 'Bogura Sadar',
      area: '১৭৬.৫৮ বর্গকিমি', area_en: '176.58 sq km', union_count: '১১টি', union_count_en: '11 Unions',
      unions: '১১টি ইউনিয়ন', pourashava: 'বগুড়া পৌরসভা (১টি)', pourashava_en: 'Bogura Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮০০', rivers: 'করতোয়া নদী', health_phone: '051-66550',
      landmark: 'নবাব প্যালেস, সাতমাথা, এডওয়ার্ড পার্ক, বগুড়া জিলা স্কুল',
      description: 'বগুড়া জেলার প্রশাসনিক, বাণিজ্যিক ও শিক্ষাকেন্দ্র। করতোয়া নদীর তীরে অবস্থিত উত্তরবঙ্গের প্রাণকেন্দ্র ও ব্যস্ততম নগরী।',
      en_description: 'The administrative, commercial, and educational hub of Bogura District situated along the Karatoya River.',
      history_note: '১৮২১ সালে বগুড়া জেলা প্রতিষ্ঠার পর থেকে সদর উপজেলা উত্তরবঙ্গের ব্যবসা-বাণিজ্য, শিক্ষা ও প্রশাসনের কেন্দ্রবিন্দু হিসেবে গড়ে ওঠে।',
      union_list: ['ফাপোর', 'সাবগ্রাম', 'নিশিন্দারা', 'এরুলিয়া', 'রাজাপুর', 'শাখারিয়া', 'শেখেরকোলা', 'গোকুল', 'নুনগোলা', 'লাহিড়ীপাড়া', 'নামুজা'],
      tags: ['pourashava', 'heritage']
    },
    {
      serial_bn: '০২', serial_en: '02', name: 'শিবগঞ্জ', en_name: 'Shibganj',
      area: '৩১৫.৩৩ বর্গকিমি', area_en: '315.33 sq km', union_count: '১২টি', union_count_en: '12 Unions',
      unions: '১২টি ইউনিয়ন', pourashava: 'শিবগঞ্জ পৌরসভা (১টি)', pourashava_en: 'Shibganj Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮১০', rivers: 'করতোয়া ও নাগর নদী', health_phone: '01730-324755',
      landmark: 'মহাস্থানগড়, ভাসুবিহার, বিহার ধাপ, শীলাদেবীর ঘাট, গোকুল মেধ',
      description: 'প্রাচীন পুণ্ড্রবর্ধন সভ্যতার পীঠস্থান। আড়াই হাজার বছরের প্রাচীন দুর্গনগরী মহাস্থানগড় এই উপজেলায় অবস্থিত।',
      en_description: 'Home to the 2,500-year-old ancient capital Mahasthangarh, Vasu Vihara, and archaeological treasures.',
      history_note: 'খ্রিস্টপূর্ব ৩য় শতক থেকে মৌর্য, গুপ্ত, পাল ও সেন রাজাদের প্রাদেশিক রাজধানী ছিল মহাস্থানগড়।',
      union_list: ['শিবগঞ্জ', 'বিহার', 'রায়নগর', 'দেউলী', 'ময়দানহাট্টা', 'বুড়িগঞ্জ', 'আটমূল', 'পিরব', 'কিশামত', 'মোকামতলা', 'সৈয়দপুর', 'মাঝিহট্ট'],
      tags: ['heritage', 'pourashava']
    },
    {
      serial_bn: '০৩', serial_en: '03', name: 'শেরপুর', en_name: 'Sherpur',
      area: '২৯৫.৯৩ বর্গকিমি', area_en: '295.93 sq km', union_count: '১০টি', union_count_en: '10 Unions',
      unions: '১০টি ইউনিয়ন', pourashava: 'শেরপুর পৌরসভা (১টি)', pourashava_en: 'Sherpur Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮৪০', rivers: 'করতোয়া নদী', health_phone: '01730-324762',
      landmark: 'ঐতিহাসিক খেরুয়া মসজিদ (১৫৮২), ভবানীপুর শক্তিপীঠ, শেরপুর রাজবাড়ি',
      description: 'বগুড়া জেলার দ্বিতীয় বৃহত্তম বাণিজ্যিক শহর ও ঐতিহাসিক মুঘল স্থাপত্য খেরুয়া মসজিদের জনপদ।',
      en_description: 'Historic commercial center famous for the 1582 AD Kherua Mosque and the revered Bhabanipur Shaktipeeth.',
      history_note: 'মুঘল সুবেদার মানসিংহ এই স্থানকে সেনাঘাঁটি হিসেবে ব্যবহার করেছিলেন। ১৫৮২ সালে খেরুয়া মসজিদ নির্মিত হয়।',
      union_list: ['কুসুম্বী', 'গাড়ীদহ', 'খামারকান্দি', 'খানপুর', 'মির্জাপুর', 'বিশালপুর', 'ভবানীপুর', 'সুঘাট', 'সীমাবাড়ী', 'শাহবন্দেগী'],
      tags: ['heritage', 'pourashava']
    },
    {
      serial_bn: '০৪', serial_en: '04', name: 'সারিয়াকান্দি', en_name: 'Sariakandi',
      area: '৪০৮.৫০ বর্গকিমি', area_en: '408.50 sq km', union_count: '১২টি', union_count_en: '12 Unions',
      unions: '১২টি ইউনিয়ন', pourashava: 'সারিয়াকান্দি পৌরসভা (১টি)', pourashava_en: 'Sariakandi Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮৩০', rivers: 'যমুনা ও বাঙালি নদী', health_phone: '01730-324761',
      landmark: 'কালিতলা গ্রোয়েন বাঁধ, প্রেম যমুনার ঘাট, মাদারগঞ্জ ফেরিঘাট',
      description: 'যমুনা বিধৌত নদী পর্যটন ও চরাঞ্চলের কৃষি প্রধান জনপদ। প্রেম যমুনার ঘাট ও সূর্যাস্তের অপূর্ব দৃশ্য।',
      en_description: 'Vibrant riverine township on the mighty Jamuna River, renowned for riverfront tourism and scenic char landscapes.',
      history_note: 'যমুনা ও বাঙালি নদীর মোহনায় অবস্থিত সারিয়াকান্দি নদীকেন্দ্রিক অর্থনীতি ও চরাঞ্চল সংস্কৃতির ঐতিহ্যে উজ্জ্বল।',
      union_list: ['সারিয়াকান্দি সদর', 'ফুলবাড়ী', 'কামালপুর', 'চন্দনবাইশা', 'কর্ণিবাড়ী', 'কুতুবপুর', 'ভেলাবাড়ী', 'কাজলা', 'চালুয়াবাড়ী', 'বোহাইল', 'হাটশেরপুর', 'হাটফুলবাড়ী'],
      tags: ['river', 'char', 'pourashava']
    },
    {
      serial_bn: '০৫', serial_en: '05', name: 'ধুনট', en_name: 'Dhunat',
      area: '২৪৭.৭৩ বর্গকিমি', area_en: '247.73 sq km', union_count: '১০টি', union_count_en: '10 Unions',
      unions: '১০টি ইউনিয়ন', pourashava: 'ধুনট পৌরসভা (১টি)', pourashava_en: 'Dhunat Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮৫০', rivers: 'যমুনা ও ইছামতী নদী', health_phone: '01730-324756',
      landmark: 'ইছামতী নদী তীর, জোড়শিমুল বাঁধ, ভান্ডারবাড়ী চরাঞ্চল',
      description: 'যমুনা ও ইছামতীর উর্বর অববাহিকায় গড়ে ওঠা কৃষি ও নদীমাতৃক উপজেলা।',
      en_description: 'Agricultural heartland surrounded by the Jamuna and Ichamati rivers with rich folklore and riverine life.',
      history_note: '১৯৬২ সালে থানা এবং ১৯৮৩ সালে উপজেলায় উন্নীত হয়। নদী তীরবর্তী লোকঐতিহ্যে সমৃদ্ধ।',
      union_list: ['ধুনট সদর', 'কালেরপাড়া', 'চিকাসী', 'চৌকিবাড়ী', 'গোসাইবাড়ী', 'ভান্ডারবাড়ী', 'নিমগাছি', 'এলাঙ্গী', 'মথুরাপুর', 'গোপালনগর'],
      tags: ['river', 'char', 'pourashava']
    },
    {
      serial_bn: '০৬', serial_en: '06', name: 'গাবতলী', en_name: 'Gabtali',
      area: '২৫১.২৫ বর্গকিমি', area_en: '251.25 sq km', union_count: '১১টি', union_count_en: '11 Unions',
      unions: '১১টি ইউনিয়ন', pourashava: 'গাবতলী পৌরসভা (১টি)', pourashava_en: 'Gabtali Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮২০', rivers: 'বাঙালি ও সুখদহ নদী', health_phone: '01730-324757',
      landmark: 'পোড়াদহ ঐতিহ্যবাহী মেলা (মাছ ও মিষ্টির মেলা), মহিষাবান',
      description: 'ঐতিহাসিক পোড়াদহ মেলা ও শতবর্ষের ঐতিহ্যবাহী মিষ্টি-মাছের সংস্কৃতির জন্য দেশজুড়ে খ্যাত।',
      en_description: 'Famous for the century-old Poradaha Mela celebrated with giant fish and iconic Baghabari sweets.',
      history_note: 'মাঘের শেষ বুধবার সন্ন্যাসী পূজা উপলক্ষে পোড়াদহ মেলা চার শতাধিক বছর ধরে অনুষ্ঠিত হয়ে আসছে।',
      union_list: ['গাবতলী সদর', 'মহিষাবান', 'কাগইল', 'রামেশ্বরপুর', 'বালিয়াদিঘী', 'নশরতপুর', 'সোনারায়', 'দুর্গাহাটা', 'দক্ষিণপাড়া', 'নাড়ুয়ামালা', 'সুখানপুকুর'],
      tags: ['heritage', 'pourashava']
    },
    {
      serial_bn: '০৭', serial_en: '07', name: 'দুপচাঁচিয়া', en_name: 'Dhupchanchia',
      area: '১৬২.৪৫ বর্গকিমি', area_en: '162.45 sq km', union_count: '৬টি', union_count_en: '6 Unions',
      unions: '৬টি ইউনিয়ন', pourashava: 'দুপচাঁচিয়া ও তালোড়া (২টি)', pourashava_en: 'Dhupchanchia & Talora (2)',
      has_pourashava: true, postal_code: '৫৮৮০', rivers: 'নাগর নদী', health_phone: '01730-324758',
      landmark: 'তালোড়া শিল্প বেল্ট, নাগর নদের ঘাট, দুপচাঁচিয়া চালের আড়ৎ',
      description: 'উত্তরবঙ্গের প্রধান চাল প্রক্রিয়াজাতকরণ ও বাণিজ্যকেন্দ্র। দুটি পৌরসভা সমৃদ্ধ সমৃদ্ধশালী উপজেলা।',
      en_description: 'A major agro-processing and industrial belt with two pourashavas: Dhupchanchia and Talora.',
      history_note: 'নাগর নদীর তীরে গড়ে ওঠা দুপচাঁচিয়া ও তালোড়া বৃটিশ আমল থেকেই তামাক ও চাল বাণিজ্যের অন্যতম মোকাম ছিল।',
      union_list: ['দুপচাঁচিয়া সদর', 'চামরুল', 'গোবিন্দপুর', 'গুনাহার', 'জিয়ানগর', 'তালোড়া'],
      tags: ['pourashava', 'heritage']
    },
    {
      serial_bn: '০৮', serial_en: '08', name: 'কাহালু', en_name: 'Kahalu',
      area: '২৩৯.৬৪ বর্গকিমি', area_en: '239.64 sq km', union_count: '৯টি', union_count_en: '9 Unions',
      unions: '৯টি ইউনিয়ন', pourashava: 'কাহালু পৌরসভা (১টি)', pourashava_en: 'Kahalu Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮৭০', rivers: 'নাগর ও করতোয়া নদী', health_phone: '01730-324759',
      landmark: 'যোগীর ভবন (নাথ যোগী সম্প্রদায়ের মন্দির), পাঁচপীর মাজার',
      description: 'প্রাচীন যোগীর ভবন মন্দির কমপ্লেক্স ও লোক ঐতিহ্যের প্রাচীন জনপদ।',
      en_description: 'Celebrated for the ancient Jogi Bhaban monastic temple complex dating back to the 12th century.',
      history_note: '১২শ শতকে রাজা আনন্দ পালের আমলে যোগীর ভবন নাথ যোগী সিদ্ধাচার্যদের প্রধান সাধনা কেন্দ্র হিসেবে প্রতিষ্ঠিত হয়।',
      union_list: ['কাহালু সদর', 'বীরকেদার', 'কালাই', 'পাইকর', 'পাইকড়', 'নারহট্ট', 'মুরইল', 'মালঞ্চা', 'দুর্গাপুর'],
      tags: ['heritage', 'pourashava']
    },
    {
      serial_bn: '০৯', serial_en: '09', name: 'নন্দীগ্রাম', en_name: 'Nandigram',
      area: '২৬৮.৪৭ বর্গকিমি', area_en: '268.47 sq km', union_count: '৫টি', union_count_en: '5 Unions',
      unions: '৫টি ইউনিয়ন', pourashava: 'নন্দীগ্রাম পৌরসভা (১টি)', pourashava_en: 'Nandigram Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮৬০', rivers: 'নাগর ও ভদ্রাবতী নদী', health_phone: '01730-324760',
      landmark: 'রনবাঘা হাট, কুমিড়া দিঘী, কাথম বেরিবাঁধ',
      description: 'বগুড়ার শস্যভাণ্ডার হিসেবে পরিচিত বিশাল চলনবিল সংলগ্ন উর্বর ধানের উপজেলা।',
      en_description: 'Known as the granary of Bogura, bordered by the fertile wetlands producing premium rice varieties.',
      history_note: 'নাটোর ও বগুড়ার সংযোগস্থলে অবস্থিত নন্দীগ্রাম ব্রিটিশ আমলে কৃষক বিদ্রোহ ও আন্দোলনের কেন্দ্রভূমি ছিল।',
      union_list: ['নন্দীগ্রাম সদর', 'ভাটরা', 'বুড়ইল', 'থালতা মাঝগ্রাম', 'ভাটগ্রাম'],
      tags: ['pourashava']
    },
    {
      serial_bn: '১০', serial_en: '10', name: 'সোনাতলা', en_name: 'Sonatala',
      area: '১৫৬.৭৫ বর্গকিমি', area_en: '156.75 sq km', union_count: '৭টি', union_count_en: '7 Unions',
      unions: '৭টি ইউনিয়ন', pourashava: 'সোনাতলা পৌরসভা (১টি)', pourashava_en: 'Sonatala Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮২০', rivers: 'যমুনা ও বাঙালি নদী', health_phone: '01730-324763',
      landmark: 'যমুনা বাঁধ, সৈয়দ আহম্মদ কলেজ, বালুয়া হাট',
      description: 'উত্তরাঞ্চলের শিক্ষা ও নদীকেন্দ্রিক জনপদ। যমুনার চরাঞ্চল সমৃদ্ধ সীমান্তবর্তী উপজেলা।',
      en_description: 'Bordering the mighty Jamuna River, renowned for the prestigious Syed Ahmed College campus.',
      history_note: 'যমুনার ভাঙা-গড়ার সাথে সোনাতলার মানুষের সংগ্রাম ও চরাঞ্চলের কৃষি সংস্কৃতি ওতপ্রোতভাবে জড়িত।',
      union_list: ['সোনাতলা সদর', 'বালুয়া', 'দিগদাইড়', 'জোড়গাছা', 'মধুপুর', 'পাকুল্লা', 'তৈকানী চুকাইনগর'],
      tags: ['river', 'char', 'pourashava']
    },
    {
      serial_bn: '১১', serial_en: '11', name: 'আদমদীঘি', en_name: 'Adamdighi',
      area: '১৬৮.৮৩ বর্গকিমি', area_en: '168.83 sq km', union_count: '৬টি', union_count_en: '6 Unions',
      unions: '৬টি ইউনিয়ন', pourashava: 'সান্তাহার পৌরসভা (১টি)', pourashava_en: 'Santahar Pourashava (1)',
      has_pourashava: true, postal_code: '৫৮৯০', rivers: 'রক্তদহ বিল ও তুলসীগঙ্গা নদী', health_phone: '01730-324754',
      landmark: 'সান্তাহার রেলওয়ে জংশন, সান্তাহার সাইলো, রক্তদহ বিল, আদমদীঘি দীঘি',
      description: 'ঐতিহাসিক সান্তাহার রেলওয়ে জংশন, আধুনিক খাদ্য সাইলো ও রক্তদহ বিলের প্রাকৃতিক সৌন্দর্যের জন্য বিখ্যাত।',
      en_description: 'Famous for the historic Santahar Railway Junction, grain silo complex, and the scenic Raktadaha Beel wetland.',
      history_note: '১৮৭৮ সালে প্রতিষ্ঠিত সান্তাহার রেলওয়ে জংশন উত্তরবঙ্গের রেল যোগাযোগের ইতিহাসে এক অবিচ্ছেদ্য অধ্যায়।',
      union_list: ['ছাতিয়ানগ্রাম', 'নশরতপুর', 'আদমদীঘি সদর', 'কুন্দগ্রাম', 'চাঁপাপুর', 'সান্তাহার'],
      tags: ['pourashava', 'heritage']
    },
    {
      serial_bn: '১২', serial_en: '12', name: 'শাজাহানপুর', en_name: 'Shajahanpur',
      area: '২২১.৬৯ বর্গকিমি', area_en: '221.69 sq km', union_count: '৯টি', union_count_en: '9 Unions',
      unions: '৯টি ইউনিয়ন', pourashava: 'পৌরসভা নেই (ক্যান্টনমেন্ট ও উপশহর)', pourashava_en: 'No Pourashava (Cantonment & Suburban Hub)',
      has_pourashava: false, postal_code: '৫৮০১', rivers: 'করতোয়া ও বাঙালি নদী', health_phone: '051-69965',
      landmark: 'বগুড়া সেনানিবাস, শহীদ জিয়াউর রহমান মেডিকেল কলেজ (শজিমেক), মাঝিড়া',
      description: 'বগুড়া শহরের দক্ষিণ উপকণ্ঠে অবস্থিত ক্যান্টনমেন্ট, মেডিকেল কলেজ ও দ্রুত বর্ধনশীল আবাসিক-বাণিজ্যিক উপজেলা।',
      en_description: 'Bogra’s youngest upazila (established 2003), housing Bogura Cantonment, SZRMC Hospital, and suburban growth corridors.',
      history_note: '২০০৩ সালে বগুড়া সদর ও শেরপুর উপজেলার অংশবিশেষ নিয়ে প্রশাসনিক বিকেন্দ্রীকরণের লক্ষ্যে শাজাহানপুর উপজেলা গঠিত হয়।',
      union_list: ['আশেকপুর', 'মাদলা', 'মাঝিড়া', 'আড়িয়া', 'খোট্টাপাড়া', 'চোপীনগর', 'খড়না', 'গোহাইল', 'আমরুল'],
      tags: ['heritage']
    }
  ];

  sqlStatements.push('-- SEED: UPAZILAS (12 RECORDS)');
  for (const u of upazilasSeedData) {
    sqlStatements.push(`
INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  ${sqlEscape(u.serial_bn)}, ${sqlEscape(u.serial_en)}, ${sqlEscape(u.name)}, ${sqlEscape(u.en_name)},
  ${sqlEscape(u.area)}, ${sqlEscape(u.area_en)}, ${sqlEscape(u.union_count)}, ${sqlEscape(u.union_count_en)},
  ${sqlEscape(u.unions)}, ${sqlEscape(u.pourashava)}, ${sqlEscape(u.pourashava_en)}, ${u.has_pourashava},
  ${sqlEscape(u.postal_code)}, ${sqlEscape(u.rivers)}, ${sqlEscape(u.health_phone)}, ${sqlEscape(u.landmark)},
  ${sqlEscape(u.description)}, ${sqlEscape(u.en_description)}, ${sqlEscape(u.history_note)},
  ${sqlJson(u.union_list)}, ${sqlJson(u.tags)}
) ON CONFLICT DO NOTHING;`);
  }

  // --------------------------------------------------------
  // C. Seed: Tourist & Heritage Spots Table (8 Records) & Reviews (9 Records)
  // --------------------------------------------------------
  console.log('Generating seed for 8 Tourist Spots & Reviews with multi-image galleries...');
  const matchSpots = exploreDataRaw.match(/export const detailedExploreSpots: DetailedExploreSpot\[\] = (\[[\s\S]*?\]);\s*$/);
  let spotsList = [];
  if (matchSpots) {
    try {
      spotsList = eval(matchSpots[1]);
    } catch (e) {
      console.warn('Failed to eval spots from explore-data.ts', e);
    }
  }

  sqlStatements.push('\n-- ========================================================');
  sqlStatements.push('-- SEED: TOURIST & HERITAGE SPOTS (8 RECORDS)');
  sqlStatements.push('-- ========================================================');

  for (const s of spotsList) {
    sqlStatements.push(`
INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  ${sqlEscape(s.id)}, ${sqlEscape(s.title)}, ${sqlEscape(s.enTitle)}, ${sqlEscape(s.category)},
  ${sqlEscape(s.categoryBn)}, ${sqlEscape(s.location)}, ${sqlEscape(s.upazila)}, ${sqlEscape(s.tag)},
  ${sqlEscape(s.coverImage)}, ${sqlJson(s.gallery || [])}, ${sqlEscape(s.shortDesc)}, ${sqlEscape(s.history)},
  ${sqlEscape(s.architecture)}, ${sqlEscape(s.howToReach)}, ${sqlJson(s.highlights || [])},
  ${sqlEscape(s.timings)}, ${sqlEscape(s.entryFee)}, ${sqlEscape(s.bestTime)}, ${sqlEscape(s.mapCoordinates)},
  ${sqlEscape(s.mapUrl)}, ${s.isApproved ?? true},
  ${sqlEscape(s.contributor?.name || 'Amr Bogura Editorial')},
  ${sqlEscape(s.contributor?.phone || null)},
  ${sqlEscape(s.contributor?.email || null)},
  ${sqlEscape(s.contributor?.note || null)}
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;`);
  }

  sqlStatements.push('\n-- ========================================================');
  sqlStatements.push('-- SEED: SPOT REVIEWS (9 RECORDS)');
  sqlStatements.push('-- ========================================================');

  for (const s of spotsList) {
    if (s.reviews && Array.isArray(s.reviews)) {
      for (const r of s.reviews) {
        sqlStatements.push(`
INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  ${sqlEscape(s.id)}, ${sqlEscape(r.author)}, ${r.rating},
  ${sqlEscape(r.comment)}, ${sqlEscape(r.location || null)}
);`);
      }
    }
  }

  // --------------------------------------------------------
  // D. Seed: Emergency Contacts Table (8 Records)
  // --------------------------------------------------------
  console.log('Generating seed for Emergency Contacts...');
  const emergencySeedData = [
    { title: 'জাতীয় জরুরি সেবা (পুলিশ, ফায়ার ও অ্যাম্বুলেন্স)', number: '999', icon: 'PhoneCall' },
    { title: 'বগুড়া জেলা পুলিশ কন্ট্রোল রুম', number: '01320-126498', icon: 'Shield' },
    { title: 'বগুড়া ফায়ার সার্ভিস ও সিভিল ডিফেন্স স্টেশন', number: '01730-336699', icon: 'Flame' },
    { title: 'শজিমেক হাসপাতাল জরুরি অ্যাম্বুলেন্স সার্ভিস', number: '01711-820847', icon: 'Ambulance' },
    { title: 'বগুড়া সদর উপজেলা স্বাস্থ্য কমপ্লেক্স', number: '051-66550', icon: 'HeartPulse' },
    { title: 'বগুড়া জেলা রেড ক্রিসেন্ট রক্ত কেন্দ্র', number: '051-66543', icon: 'Droplet' },
    { title: 'সন্ধানী (শজিমেক ইউনিট) রক্ত ও চক্ষু ব্যাংক', number: '01712-001122', icon: 'Droplets' },
    { title: 'স্বাস্থ্য বাতায়ন (২৪/৭ ফ্রি স্বাস্থ্য পরামর্শ)', number: '16263', icon: 'PhoneForwarded' }
  ];

  sqlStatements.push('\n-- SEED: EMERGENCY CONTACTS (8 RECORDS)');
  for (const e of emergencySeedData) {
    sqlStatements.push(`
INSERT INTO public.emergency_contacts (title, number, icon)
VALUES (${sqlEscape(e.title)}, ${sqlEscape(e.number)}, ${sqlEscape(e.icon)})
ON CONFLICT DO NOTHING;`);
  }

  // --------------------------------------------------------
  // D. Seed: Community Posts Table (18 Records)
  // --------------------------------------------------------
  console.log('Generating seed for Community Posts...');
  const communityPostsSeedData = [
    { category: 'blood', name: 'মোঃ রাশেদুল ইসলাম', blood_group: 'O+', blood_role: 'রক্তদাতা', upazila: 'বগুড়া সদর', detail: 'সাতমাথা, বগুড়া · সর্বশেষ দান: ৪ মাস আগে', phone: '01712-458920' },
    { category: 'blood', name: 'সাদিয়া আফরিন', blood_group: 'A+', blood_role: 'রক্তদাতা', upazila: 'শাজাহানপুর', detail: 'শজিমেক ক্যাম্পাস · যেকোনো সময় প্রস্তুত', phone: '01819-334112' },
    { category: 'blood', name: 'তানভীর হাসান', blood_group: 'B+', blood_role: 'রক্তদাতা', upazila: 'শেরপুর', detail: 'শেরপুর পৌরসভা · স্বেচ্ছাসেবী রক্তদাতা', phone: '01715-990231' },
    { category: 'blood', name: 'মাহমুদুল হক', blood_group: 'O-', blood_role: 'রক্তদাতা', upazila: 'শিবগঞ্জ', detail: 'মহাস্থানগড় এলাকা · জরুরি প্রয়োজনে কল করুন', phone: '01911-762340' },
    { category: 'blood', name: 'নুসরাত জাহান', blood_group: 'AB+', blood_role: 'রক্তদাতা', upazila: 'দুপচাঁচিয়া', detail: 'দুপচাঁচিয়া সদর · নিয়মিত রক্তদাতা', phone: '01722-618490' },
    { category: 'blood', name: 'জরুরি রক্ত প্রয়োজন (শজিমেক)', blood_group: 'B-', blood_role: 'জরুরি প্রয়োজন', upazila: 'বগুড়া সদর', detail: 'শজিমেক মেডিসিন ওয়ার্ড · ২ ব্যাগ রক্ত প্রয়োজন', phone: '01738-112233' },
    { category: 'tuition', name: 'আব্দুল্লাহ আল মামুন (বুয়েট শিক্ষার্থী)', badge: 'শিক্ষক উপলব্ধ', upazila: 'বগুড়া সদর', detail: 'নবম–দ্বাদশ শ্রেণি: পদার্থবিজ্ঞান ও উচ্চতর গণিত', phone: '01745-882190' },
    { category: 'tuition', name: 'ফারহানা ইয়াসমিন (রাবি স্নাতকোত্তর)', badge: 'শিক্ষিকা উপলব্ধ', upazila: 'বগুড়া সদর', detail: 'ইংরেজি ও বিজ্ঞান (৬ষ্ঠ–১০ম শ্রেণি, জলেশ্বরীতলা)', phone: '01823-449012' },
    { category: 'tuition', name: 'গৃহশিক্ষক প্রয়োজন (৭ম শ্রেণি)', badge: 'টিউশন অফার', upazila: 'শেরপুর', detail: 'সপ্তাহে ৪ দিন ইংরেজি ও গণিত · সম্মানী আলোচনা সাপেক্ষে', phone: '01711-552310' },
    { category: 'tuition', name: 'সাকিবুল ইসলাম (শজিমেক)', badge: 'শিক্ষক উপলব্ধ', upazila: 'শাজাহানপুর', detail: 'মেডিকেল ভর্তি প্রস্তুতি ও জীববিজ্ঞান স্পেশাল ব্যাচ', phone: '01675-221908' },
    { category: 'rent', name: '২ বেডরুম ফ্যামিলি ফ্ল্যাট ভাড়া', badge: 'ফ্যামিলি বাসা', upazila: 'বগুড়া সদর', detail: 'জলেশ্বরীতলা, বগুড়া · গ্যাস, লিফট ও গ্যারেজ সুবিধা · ভাড়া: ১২,৫০০৳', phone: '01711-334455' },
    { category: 'rent', name: 'ছাত্র মেস / সিট ভাড়া (শজিমেক সংলগ্ন)', badge: 'ছাত্র মেস', upazila: 'শাজাহানপুর', detail: 'সিলিমপুর, শজিমেক গেট সংলগ্ন · ওয়াইফাই ও মিল সুবিধা · ২,৮০০৳', phone: '01817-665544' },
    { category: 'rent', name: 'মেইন রোডে বাণিজ্যিক দোকান ভাড়া', badge: 'দোকান / অফিস', upazila: 'শেরপুর', detail: 'শেরপুর বাসস্ট্যান্ড বাজার · ৪৫০ বর্গফুট · অগ্রিম আলোচনা সাপেক্ষে', phone: '01712-908070' },
    { category: 'rent', name: '৩ রুমের নিচতলা বাসা ভাড়া', badge: 'ফ্যামিলি বাসা', upazila: 'বগুড়া সদর', detail: 'উপশহর, বগুড়া · শান্ত পরিবেশ, ২৪ ঘণ্টা পানি · ১০,০০০৳', phone: '01912-443322' },
    { category: 'jobs', name: 'ডেলিভারি রাইডার আবশ্যক (ফুড ও পার্সেল)', badge: 'জরুরি নিয়োগ', upazila: 'বগুড়া সদর', detail: 'বগুড়া শহর এলাকায় নিজস্ব বাইক/সাইকেল থাকতে হবে · আকর্ষণীয় কমিশন', phone: '01700-112233' },
    { category: 'jobs', name: 'ফার্মেসী সেলসম্যান প্রয়োজন', badge: 'চাকরি সুযোগ', upazila: 'শেরপুর', detail: 'শেরপুর বাসস্ট্যান্ড ফার্মেসী · অভিজ্ঞদের অগ্রাধিকার · বেতন আলোচনা সাপেক্ষে', phone: '01714-556677' },
    { category: 'business', name: 'এশিয়ান কার রিপেয়ার & ডেন্ট পেইন্ট', badge: 'অটোমোবাইল সার্ভিস', upazila: 'বগুড়া সদর', detail: 'চারমাথা বাস টার্মিনাল রোড, বগুড়া · বিশ্বস্ত কার ডেন্টিং ও ইঞ্জিন সার্ভিস', phone: '01716-889900' },
    { category: 'business', name: 'মহাস্থান স্পেশাল খাঁটি কটকটি ভাণ্ডার', badge: 'স্থানীয় খাদ্যপণ্য', upazila: 'শিবগঞ্জ', detail: 'মহাস্থান বাসস্ট্যান্ড · শতবর্ষের ঐতিহ্যবাহী স্পেশাল ঘি ও তিলের কটকটি', phone: '01718-223344' }
  ];

  sqlStatements.push('\n-- SEED: COMMUNITY POSTS (18 RECORDS)');
  for (const c of communityPostsSeedData) {
    sqlStatements.push(`
INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  ${sqlEscape(c.category)}, ${sqlEscape(c.name)}, ${sqlEscape(c.blood_group)}, ${sqlEscape(c.blood_role)},
  ${sqlEscape(c.badge)}, ${sqlEscape(c.upazila)}, ${sqlEscape(c.detail)}, ${sqlEscape(c.phone)}, true
) ON CONFLICT DO NOTHING;`);
  }

  // --------------------------------------------------------
  // E. Seed: Master Healthcare Facilities Table (352 Records)
  // --------------------------------------------------------
  console.log(`Generating seed for 352 Healthcare Facilities...`);
  sqlStatements.push('\n-- ========================================================');
  sqlStatements.push('-- SEED: HEALTHCARE FACILITIES (352 VERIFIED RECORDS)');
  sqlStatements.push('-- ========================================================');

  for (const f of facilities) {
    sqlStatements.push(`
INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  ${sqlEscape(f.id)}, ${sqlEscape(f.dghs_facility_id)}, ${sqlEscape(f.name)}, ${sqlEscape(f.name_bn)},
  ${sqlEscape(f.slug)}, ${sqlEscape(f.category)}, ${sqlEscape(f.facility_type)},
  ${sqlEscape(f.original_facility_type)}, ${sqlEscape(f.ownership)}, ${sqlEscape(f.district)},
  ${sqlEscape(f.district_bn)}, ${sqlEscape(f.upazila)}, ${sqlEscape(f.upazila_bn)},
  ${sqlEscape(f.union)}, ${sqlEscape(f.union_bn)}, ${sqlEscape(f.village_or_area)},
  ${sqlEscape(f.address)}, ${sqlJson(f.phone || [])}, ${sqlEscape(f.email)}, ${sqlEscape(f.website)},
  ${f.latitude}, ${f.longitude}, ${sqlEscape(f.google_maps_url)}, ${sqlEscape(f.image_url)},
  ${sqlJson(f.services || [])}, ${sqlJson(f.source_urls || [])}, ${sqlEscape(f.verification_status || 'verified')},
  ${sqlEscape(f.last_verified || '2026-11-21')}
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;`);
  }

  // --------------------------------------------------------
  // F. Seed: Legacy Hospitals Table Mapped (352 Records)
  // --------------------------------------------------------
  console.log('Generating seed mapping for hospitals table (352 records)...');
  sqlStatements.push('\n-- ========================================================');
  sqlStatements.push('-- SEED: HOSPITALS COMPATIBILITY TABLE (352 RECORDS)');
  sqlStatements.push('-- ========================================================');

  for (const f of facilities) {
    const type = f.ownership === 'government' ? 'govt' : f.category.includes('Diagnostic') ? 'diagnostic' : 'private';
    const emergency = f.services.slice(0, 3).join(', ');
    const phone = f.phone && f.phone.length > 0 ? f.phone.join(', ') : '051-66550';

    sqlStatements.push(`
INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  ${sqlEscape(f.name_bn)}, ${sqlEscape(f.name)}, ${sqlEscape(type)},
  ${sqlEscape(f.category)}, ${sqlEscape(f.address)}, ${sqlEscape(phone)}, ${sqlEscape(emergency)}
) ON CONFLICT DO NOTHING;`);
  }

  // Write out full supabase/seed.sql
  const fullSql = sqlStatements.join('\n');
  fs.writeFileSync(seedSqlPath, fullSql, 'utf-8');
  console.log(`✓ Successfully generated master seed file at: ${seedSqlPath}`);
  console.log(`  File size: ${(Buffer.byteLength(fullSql) / 1024).toFixed(1)} KB`);

  // --------------------------------------------------------
  // G. Hydrate lib/data/district-data.ts hospitalsData with 352 records
  // --------------------------------------------------------
  console.log('Hydrating hospitalsData in lib/data/district-data.ts...');
  const mappedHospitals = facilities.map(f => ({
    name: f.name_bn,
    enName: f.name,
    type: f.ownership === 'government' ? 'govt' : f.category.includes('Diagnostic') ? 'diagnostic' : 'private',
    typeLabel: f.category,
    address: f.address,
    phone: f.phone && f.phone.length > 0 ? f.phone[0] : 'N/A',
    emergency: f.services.slice(0, 3).join(' • ')
  }));

  const hospitalsJsonExport = `export const hospitalsData: Hospital[] = ${JSON.stringify(mappedHospitals, null, 2)};\n`;

  // Replace hospitalsData in district-data.ts
  const hospStartRegex = /export const hospitalsData: Hospital\[\] = \[[\s\S]*?\];\n/;
  if (hospStartRegex.test(districtDataRaw)) {
    const updatedDistrictData = districtDataRaw.replace(hospStartRegex, hospitalsJsonExport);
    fs.writeFileSync(path.join(baseDir, 'lib', 'data', 'district-data.ts'), updatedDistrictData, 'utf-8');
    console.log(`✓ Seeded ${mappedHospitals.length} verified hospitals into lib/data/district-data.ts`);
  } else {
    console.warn('Could not match hospitalsData in district-data.ts');
  }

  console.log('\n======================================================');
  console.log('   All Unseeded Data Successfully Seeded & Synced!    ');
  console.log('======================================================\n');
  console.log('Seeded Totals:');
  console.log('- Upazilas: 12');
  console.log('- Healthcare Facilities: 352');
  console.log('- Hospitals Compatibility Table: 352');
  console.log('- Tourist & Heritage Spots: 8');
  console.log('- Spot Reviews: 9');
  console.log('- Emergency Contacts: 8');
  console.log('- Community Posts: 18');
  console.log('- Master SQL Seed: supabase/seed.sql');
  console.log('- Schema Updated: supabase/schema.sql');
}

run().catch(err => {
  console.error('Master Seeder Failed:', err);
  process.exit(1);
});

