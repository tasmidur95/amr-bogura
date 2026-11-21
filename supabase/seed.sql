-- ========================================================
-- AMAR BOGURA (আমার বগুড়া) — MASTER SEED SCRIPT (seed.sql)
-- Generated on: 2026-11-21T06:17:13.681Z
-- Total Healthcare Facilities: 352
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


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

-- SEED: UPAZILAS (12 RECORDS)

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০১', '01', 'বগুড়া সদর', 'Bogura Sadar',
  '১৭৬.৫৮ বর্গকিমি', '176.58 sq km', '১১টি', '11 Unions',
  '১১টি ইউনিয়ন', 'বগুড়া পৌরসভা (১টি)', 'Bogura Pourashava (1)', true,
  '৫৮০০', 'করতোয়া নদী', '051-66550', 'নবাব প্যালেস, সাতমাথা, এডওয়ার্ড পার্ক, বগুড়া জিলা স্কুল',
  'বগুড়া জেলার প্রশাসনিক, বাণিজ্যিক ও শিক্ষাকেন্দ্র। করতোয়া নদীর তীরে অবস্থিত উত্তরবঙ্গের প্রাণকেন্দ্র ও ব্যস্ততম নগরী।', 'The administrative, commercial, and educational hub of Bogura District situated along the Karatoya River.', '১৮২১ সালে বগুড়া জেলা প্রতিষ্ঠার পর থেকে সদর উপজেলা উত্তরবঙ্গের ব্যবসা-বাণিজ্য, শিক্ষা ও প্রশাসনের কেন্দ্রবিন্দু হিসেবে গড়ে ওঠে।',
  '["ফাপোর","সাবগ্রাম","নিশিন্দারা","এরুলিয়া","রাজাপুর","শাখারিয়া","শেখেরকোলা","গোকুল","নুনগোলা","লাহিড়ীপাড়া","নামুজা"]'::jsonb, '["pourashava","heritage"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০২', '02', 'শিবগঞ্জ', 'Shibganj',
  '৩১৫.৩৩ বর্গকিমি', '315.33 sq km', '১২টি', '12 Unions',
  '১২টি ইউনিয়ন', 'শিবগঞ্জ পৌরসভা (১টি)', 'Shibganj Pourashava (1)', true,
  '৫৮১০', 'করতোয়া ও নাগর নদী', '01730-324755', 'মহাস্থানগড়, ভাসুবিহার, বিহার ধাপ, শীলাদেবীর ঘাট, গোকুল মেধ',
  'প্রাচীন পুণ্ড্রবর্ধন সভ্যতার পীঠস্থান। আড়াই হাজার বছরের প্রাচীন দুর্গনগরী মহাস্থানগড় এই উপজেলায় অবস্থিত।', 'Home to the 2,500-year-old ancient capital Mahasthangarh, Vasu Vihara, and archaeological treasures.', 'খ্রিস্টপূর্ব ৩য় শতক থেকে মৌর্য, গুপ্ত, পাল ও সেন রাজাদের প্রাদেশিক রাজধানী ছিল মহাস্থানগড়।',
  '["শিবগঞ্জ","বিহার","রায়নগর","দেউলী","ময়দানহাট্টা","বুড়িগঞ্জ","আটমূল","পিরব","কিশামত","মোকামতলা","সৈয়দপুর","মাঝিহট্ট"]'::jsonb, '["heritage","pourashava"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০৩', '03', 'শেরপুর', 'Sherpur',
  '২৯৫.৯৩ বর্গকিমি', '295.93 sq km', '১০টি', '10 Unions',
  '১০টি ইউনিয়ন', 'শেরপুর পৌরসভা (১টি)', 'Sherpur Pourashava (1)', true,
  '৫৮৪০', 'করতোয়া নদী', '01730-324762', 'ঐতিহাসিক খেরুয়া মসজিদ (১৫৮২), ভবানীপুর শক্তিপীঠ, শেরপুর রাজবাড়ি',
  'বগুড়া জেলার দ্বিতীয় বৃহত্তম বাণিজ্যিক শহর ও ঐতিহাসিক মুঘল স্থাপত্য খেরুয়া মসজিদের জনপদ।', 'Historic commercial center famous for the 1582 AD Kherua Mosque and the revered Bhabanipur Shaktipeeth.', 'মুঘল সুবেদার মানসিংহ এই স্থানকে সেনাঘাঁটি হিসেবে ব্যবহার করেছিলেন। ১৫৮২ সালে খেরুয়া মসজিদ নির্মিত হয়।',
  '["কুসুম্বী","গাড়ীদহ","খামারকান্দি","খানপুর","মির্জাপুর","বিশালপুর","ভবানীপুর","সুঘাট","সীমাবাড়ী","শাহবন্দেগী"]'::jsonb, '["heritage","pourashava"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০৪', '04', 'সারিয়াকান্দি', 'Sariakandi',
  '৪০৮.৫০ বর্গকিমি', '408.50 sq km', '১২টি', '12 Unions',
  '১২টি ইউনিয়ন', 'সারিয়াকান্দি পৌরসভা (১টি)', 'Sariakandi Pourashava (1)', true,
  '৫৮৩০', 'যমুনা ও বাঙালি নদী', '01730-324761', 'কালিতলা গ্রোয়েন বাঁধ, প্রেম যমুনার ঘাট, মাদারগঞ্জ ফেরিঘাট',
  'যমুনা বিধৌত নদী পর্যটন ও চরাঞ্চলের কৃষি প্রধান জনপদ। প্রেম যমুনার ঘাট ও সূর্যাস্তের অপূর্ব দৃশ্য।', 'Vibrant riverine township on the mighty Jamuna River, renowned for riverfront tourism and scenic char landscapes.', 'যমুনা ও বাঙালি নদীর মোহনায় অবস্থিত সারিয়াকান্দি নদীকেন্দ্রিক অর্থনীতি ও চরাঞ্চল সংস্কৃতির ঐতিহ্যে উজ্জ্বল।',
  '["সারিয়াকান্দি সদর","ফুলবাড়ী","কামালপুর","চন্দনবাইশা","কর্ণিবাড়ী","কুতুবপুর","ভেলাবাড়ী","কাজলা","চালুয়াবাড়ী","বোহাইল","হাটশেরপুর","হাটফুলবাড়ী"]'::jsonb, '["river","char","pourashava"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০৫', '05', 'ধুনট', 'Dhunat',
  '২৪৭.৭৩ বর্গকিমি', '247.73 sq km', '১০টি', '10 Unions',
  '১০টি ইউনিয়ন', 'ধুনট পৌরসভা (১টি)', 'Dhunat Pourashava (1)', true,
  '৫৮৫০', 'যমুনা ও ইছামতী নদী', '01730-324756', 'ইছামতী নদী তীর, জোড়শিমুল বাঁধ, ভান্ডারবাড়ী চরাঞ্চল',
  'যমুনা ও ইছামতীর উর্বর অববাহিকায় গড়ে ওঠা কৃষি ও নদীমাতৃক উপজেলা।', 'Agricultural heartland surrounded by the Jamuna and Ichamati rivers with rich folklore and riverine life.', '১৯৬২ সালে থানা এবং ১৯৮৩ সালে উপজেলায় উন্নীত হয়। নদী তীরবর্তী লোকঐতিহ্যে সমৃদ্ধ।',
  '["ধুনট সদর","কালেরপাড়া","চিকাসী","চৌকিবাড়ী","গোসাইবাড়ী","ভান্ডারবাড়ী","নিমগাছি","এলাঙ্গী","মথুরাপুর","গোপালনগর"]'::jsonb, '["river","char","pourashava"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০৬', '06', 'গাবতলী', 'Gabtali',
  '২৫১.২৫ বর্গকিমি', '251.25 sq km', '১১টি', '11 Unions',
  '১১টি ইউনিয়ন', 'গাবতলী পৌরসভা (১টি)', 'Gabtali Pourashava (1)', true,
  '৫৮২০', 'বাঙালি ও সুখদহ নদী', '01730-324757', 'পোড়াদহ ঐতিহ্যবাহী মেলা (মাছ ও মিষ্টির মেলা), মহিষাবান',
  'ঐতিহাসিক পোড়াদহ মেলা ও শতবর্ষের ঐতিহ্যবাহী মিষ্টি-মাছের সংস্কৃতির জন্য দেশজুড়ে খ্যাত।', 'Famous for the century-old Poradaha Mela celebrated with giant fish and iconic Baghabari sweets.', 'মাঘের শেষ বুধবার সন্ন্যাসী পূজা উপলক্ষে পোড়াদহ মেলা চার শতাধিক বছর ধরে অনুষ্ঠিত হয়ে আসছে।',
  '["গাবতলী সদর","মহিষাবান","কাগইল","রামেশ্বরপুর","বালিয়াদিঘী","নশরতপুর","সোনারায়","দুর্গাহাটা","দক্ষিণপাড়া","নাড়ুয়ামালা","সুখানপুকুর"]'::jsonb, '["heritage","pourashava"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০৭', '07', 'দুপচাঁচিয়া', 'Dhupchanchia',
  '১৬২.৪৫ বর্গকিমি', '162.45 sq km', '৬টি', '6 Unions',
  '৬টি ইউনিয়ন', 'দুপচাঁচিয়া ও তালোড়া (২টি)', 'Dhupchanchia & Talora (2)', true,
  '৫৮৮০', 'নাগর নদী', '01730-324758', 'তালোড়া শিল্প বেল্ট, নাগর নদের ঘাট, দুপচাঁচিয়া চালের আড়ৎ',
  'উত্তরবঙ্গের প্রধান চাল প্রক্রিয়াজাতকরণ ও বাণিজ্যকেন্দ্র। দুটি পৌরসভা সমৃদ্ধ সমৃদ্ধশালী উপজেলা।', 'A major agro-processing and industrial belt with two pourashavas: Dhupchanchia and Talora.', 'নাগর নদীর তীরে গড়ে ওঠা দুপচাঁচিয়া ও তালোড়া বৃটিশ আমল থেকেই তামাক ও চাল বাণিজ্যের অন্যতম মোকাম ছিল।',
  '["দুপচাঁচিয়া সদর","চামরুল","গোবিন্দপুর","গুনাহার","জিয়ানগর","তালোড়া"]'::jsonb, '["pourashava","heritage"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০৮', '08', 'কাহালু', 'Kahalu',
  '২৩৯.৬৪ বর্গকিমি', '239.64 sq km', '৯টি', '9 Unions',
  '৯টি ইউনিয়ন', 'কাহালু পৌরসভা (১টি)', 'Kahalu Pourashava (1)', true,
  '৫৮৭০', 'নাগর ও করতোয়া নদী', '01730-324759', 'যোগীর ভবন (নাথ যোগী সম্প্রদায়ের মন্দির), পাঁচপীর মাজার',
  'প্রাচীন যোগীর ভবন মন্দির কমপ্লেক্স ও লোক ঐতিহ্যের প্রাচীন জনপদ।', 'Celebrated for the ancient Jogi Bhaban monastic temple complex dating back to the 12th century.', '১২শ শতকে রাজা আনন্দ পালের আমলে যোগীর ভবন নাথ যোগী সিদ্ধাচার্যদের প্রধান সাধনা কেন্দ্র হিসেবে প্রতিষ্ঠিত হয়।',
  '["কাহালু সদর","বীরকেদার","কালাই","পাইকর","পাইকড়","নারহট্ট","মুরইল","মালঞ্চা","দুর্গাপুর"]'::jsonb, '["heritage","pourashava"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '০৯', '09', 'নন্দীগ্রাম', 'Nandigram',
  '২৬৮.৪৭ বর্গকিমি', '268.47 sq km', '৫টি', '5 Unions',
  '৫টি ইউনিয়ন', 'নন্দীগ্রাম পৌরসভা (১টি)', 'Nandigram Pourashava (1)', true,
  '৫৮৬০', 'নাগর ও ভদ্রাবতী নদী', '01730-324760', 'রনবাঘা হাট, কুমিড়া দিঘী, কাথম বেরিবাঁধ',
  'বগুড়ার শস্যভাণ্ডার হিসেবে পরিচিত বিশাল চলনবিল সংলগ্ন উর্বর ধানের উপজেলা।', 'Known as the granary of Bogura, bordered by the fertile wetlands producing premium rice varieties.', 'নাটোর ও বগুড়ার সংযোগস্থলে অবস্থিত নন্দীগ্রাম ব্রিটিশ আমলে কৃষক বিদ্রোহ ও আন্দোলনের কেন্দ্রভূমি ছিল।',
  '["নন্দীগ্রাম সদর","ভাটরা","বুড়ইল","থালতা মাঝগ্রাম","ভাটগ্রাম"]'::jsonb, '["pourashava"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '১০', '10', 'সোনাতলা', 'Sonatala',
  '১৫৬.৭৫ বর্গকিমি', '156.75 sq km', '৭টি', '7 Unions',
  '৭টি ইউনিয়ন', 'সোনাতলা পৌরসভা (১টি)', 'Sonatala Pourashava (1)', true,
  '৫৮২০', 'যমুনা ও বাঙালি নদী', '01730-324763', 'যমুনা বাঁধ, সৈয়দ আহম্মদ কলেজ, বালুয়া হাট',
  'উত্তরাঞ্চলের শিক্ষা ও নদীকেন্দ্রিক জনপদ। যমুনার চরাঞ্চল সমৃদ্ধ সীমান্তবর্তী উপজেলা।', 'Bordering the mighty Jamuna River, renowned for the prestigious Syed Ahmed College campus.', 'যমুনার ভাঙা-গড়ার সাথে সোনাতলার মানুষের সংগ্রাম ও চরাঞ্চলের কৃষি সংস্কৃতি ওতপ্রোতভাবে জড়িত।',
  '["সোনাতলা সদর","বালুয়া","দিগদাইড়","জোড়গাছা","মধুপুর","পাকুল্লা","তৈকানী চুকাইনগর"]'::jsonb, '["river","char","pourashava"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '১১', '11', 'আদমদীঘি', 'Adamdighi',
  '১৬৮.৮৩ বর্গকিমি', '168.83 sq km', '৬টি', '6 Unions',
  '৬টি ইউনিয়ন', 'সান্তাহার পৌরসভা (১টি)', 'Santahar Pourashava (1)', true,
  '৫৮৯০', 'রক্তদহ বিল ও তুলসীগঙ্গা নদী', '01730-324754', 'সান্তাহার রেলওয়ে জংশন, সান্তাহার সাইলো, রক্তদহ বিল, আদমদীঘি দীঘি',
  'ঐতিহাসিক সান্তাহার রেলওয়ে জংশন, আধুনিক খাদ্য সাইলো ও রক্তদহ বিলের প্রাকৃতিক সৌন্দর্যের জন্য বিখ্যাত।', 'Famous for the historic Santahar Railway Junction, grain silo complex, and the scenic Raktadaha Beel wetland.', '১৮৭৮ সালে প্রতিষ্ঠিত সান্তাহার রেলওয়ে জংশন উত্তরবঙ্গের রেল যোগাযোগের ইতিহাসে এক অবিচ্ছেদ্য অধ্যায়।',
  '["ছাতিয়ানগ্রাম","নশরতপুর","আদমদীঘি সদর","কুন্দগ্রাম","চাঁপাপুর","সান্তাহার"]'::jsonb, '["pourashava","heritage"]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO public.upazilas (
  serial_bn, serial_en, name, en_name, area, area_en, union_count, union_count_en,
  unions, pourashava, pourashava_en, has_pourashava, postal_code, rivers, health_phone,
  landmark, description, en_description, history_note, union_list, tags
) VALUES (
  '১২', '12', 'শাজাহানপুর', 'Shajahanpur',
  '২২১.৬৯ বর্গকিমি', '221.69 sq km', '৯টি', '9 Unions',
  '৯টি ইউনিয়ন', 'পৌরসভা নেই (ক্যান্টনমেন্ট ও উপশহর)', 'No Pourashava (Cantonment & Suburban Hub)', false,
  '৫৮০১', 'করতোয়া ও বাঙালি নদী', '051-69965', 'বগুড়া সেনানিবাস, শহীদ জিয়াউর রহমান মেডিকেল কলেজ (শজিমেক), মাঝিড়া',
  'বগুড়া শহরের দক্ষিণ উপকণ্ঠে অবস্থিত ক্যান্টনমেন্ট, মেডিকেল কলেজ ও দ্রুত বর্ধনশীল আবাসিক-বাণিজ্যিক উপজেলা।', 'Bogra’s youngest upazila (established 2003), housing Bogura Cantonment, SZRMC Hospital, and suburban growth corridors.', '২০০৩ সালে বগুড়া সদর ও শেরপুর উপজেলার অংশবিশেষ নিয়ে প্রশাসনিক বিকেন্দ্রীকরণের লক্ষ্যে শাজাহানপুর উপজেলা গঠিত হয়।',
  '["আশেকপুর","মাদলা","মাঝিড়া","আড়িয়া","খোট্টাপাড়া","চোপীনগর","খড়না","গোহাইল","আমরুল"]'::jsonb, '["heritage"]'::jsonb
) ON CONFLICT DO NOTHING;

-- ========================================================
-- SEED: TOURIST & HERITAGE SPOTS (8 RECORDS)
-- ========================================================

INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  'mahasthangarh', 'মহাস্থানগড় (প্রাচীন পুণ্ড্রনগর)', 'Mahasthangarh Ancient Citadel', 'archaeological',
  'প্রত্নতাত্ত্বিক নিদর্শন', 'মহাস্থান, শিবগঞ্জ উপজেলা, বগুড়া', 'শিবগঞ্জ', 'ইউনেস্কো সম্ভাব্য ঐতিহ্য',
  'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80', '["https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"]'::jsonb, 'খ্রিস্টপূর্ব ৩য় শতাব্দীর পুণ্ড্রবর্ধন রাজ্যের রাজধানী। করতোয়া নদীর তীরে অবস্থিত বাংলাদেশের প্রাচীনতম সুরক্ষিত নগর সভ্যতার ধ্বংসাবশেষ।', 'মহাস্থানগড় বাংলাদেশের অন্যতম প্রাচীন ও সমৃদ্ধ প্রত্নতাত্ত্বিক স্থান। খ্রিস্টপূর্ব ৩য় শতক থেকে দ্বাদশ শতক পর্যন্ত প্রায় দেড় হাজার বছর ধরে এটি মৌর্য, শুঙ্গ, গুপ্ত, পাল ও সেন রাজাদের অধীনে প্রাচীন পুণ্ড্রবর্ধন ভুক্তির রাজধানী "পুণ্ড্রনগর" হিসেবে পরিচিত ছিল। ১৮৭৯ সালে প্রত্নতাত্ত্বিক আলেকজান্ডার কানিংহাম প্রথম এটি চিহ্নিত করেন। এখান থেকে পাওয়া ব্রাহ্মী শিলালিপিটি সমগ্র বাংলার প্রাচীনতম লিখিত ঐতিহাসিক দলিল।',
  'নগরটি করতোয়া নদীর পশ্চিম তীরে আয়তাকার মাটির প্রাচীর ও পরিখা দ্বারা সুরক্ষিত ছিল। প্রাচীরবেষ্টিত নগরের দৈর্ঘ্য উত্তর-দক্ষিণে প্রায় ১,৫২৩ মিটার এবং প্রস্থ পূর্ব-পশ্চিমে ১,৩৭২ মিটার। নগরের অভ্যন্তরে জিয়ত কুণ্ড (জীবনকূপ), পরশুরামের প্রাসাদ, বৈরাগীর ভিটা, গোবিন্দ ভিটা এবং মহাস্থান জাদুঘর অবস্থিত। জাদুঘরে মৌর্য, গুপ্ত ও পাল আমলের পোড়ামাটির ফলক, স্বর্ণ ও ব্রোঞ্জ মুদ্রা, কালো পাথরের মূর্তি এবং প্রাচীন তৈজসপত্র সংরক্ষিত রয়েছে।', 'বগুড়া শহরের কেন্দ্রস্থল সাতমাথা অথবা চারমাথা কেন্দ্রীয় বাস টার্মিনাল থেকে রংপুর-বগুড়া মহাসড়ক ধরে মাত্র ১২-১৩ কিলোমিটার উত্তরে মহাস্থান বাসস্ট্যান্ড। সাতমাথা থেকে সিএনজি, অটোরিকশা বা বাসে মাত্র ২৫-৩০ মিনিটে পৌঁছানো যায়। ভাড়া জনপ্রতি ৩০-৪০ টাকা।', '["প্রাচীন পুণ্ড্রনগরের সুউচ্চ মাটির দুর্গপ্রাচীর ও পরিখা","পরশুরামের প্রাসাদ ও ঐতিহাসিক জিয়ত কুণ্ড","করতোয়া নদীর তীরের নান্দনিক গোবিন্দ ভিটা মন্দির ধ্বংসাবশেষ","সরকারি প্রত্নতাত্ত্বিক জাদুঘর ও দুর্লভ ব্রাহ্মী লিপির রেপ্লিকা","মহাস্থান বাসস্ট্যান্ডের বিখ্যাত খাঁটি মহাস্থানের কটকটি"]'::jsonb,
  'গ্রীষ্মকালে সকাল ১০টা – সন্ধ্যা ৬টা; শীতকালে সকাল ৯টা – বিকেল ৫টা (প্রতি রবিবার পূর্ণদিবস ও সোমবার অর্ধদিবস জাদুঘর বন্ধ থাকে; প্রত্নতাত্ত্বিক ঢিবি উন্মুক্ত)।', 'দেশি পর্যটক: ৩০ টাকা, শিক্ষার্থী: ৫ টাকা, সার্কভুক্ত দেশ: ১০০ টাকা, অন্যান্য বিদেশি পর্যটক: ৫০০ টাকা।', 'অক্টোবর থেকে মার্চ (শীতকাল ও বসন্তকালে আবহাওয়া সবচেয়ে মনোরম থাকে)।', '24.9606° N, 89.3458° E',
  'https://maps.google.com/?q=Mahasthangarh,Bogura', true,
  'ড. তানভীর আহমেদ (বগুড়া ইতিহাস পরিষদ)',
  NULL,
  NULL,
  'বাংলাদেশ প্রত্নতত্ত্ব অধিদপ্তরের তথ্য সমন্বয়ে সংকলিত'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;

INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  'gokul-medh', 'বেহুলার বাসর ঘর (গোকুল মেধ)', 'Gokul Medh (Behula Lakshindar)', 'archaeological',
  'প্রত্নতাত্ত্বিক নিদর্শন', 'গোকুল গ্রাম, শিবগঞ্জ উপজেলা, বগুড়া', 'শিবগঞ্জ', 'মনসামঙ্গল কিংবদন্তি',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80', '["https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80"]'::jsonb, 'মহাস্থানগড় থেকে ২ কিমি দক্ষিণে অবস্থিত ১৭২টি অন্ধ কুঠুরি বিশিষ্ট অনন্য স্তরভিত্তিক বৌদ্ধ স্তূপ ও স্থাপত্য নিদর্শন।', 'লোকবিশ্বাস অনুসারে এটি চাঁদ সওদাগরের পুত্র লখিন্দর ও সতী বেহুলার লোহার বাসর ঘর হিসেবে খ্যাত হলেও এটি মূলত ৭ম-১১শ শতাব্দীর একটি বৃহৎ বৌদ্ধ স্তূপ ও মন্দির কমপ্লেক্স। ১৯৩৪-৩৬ সালে ননীগোপাল মজুমদারের প্রত্নতাত্ত্বিক খননে এই অনন্য পিরামিড সদৃশ স্থাপত্যটি উন্মোচিত হয়। পরবর্তী সেন আমলে এটি শিব মন্দিরে রূপান্তরিত হয়েছিল বলে ঐতিহাসিকদের ধারণা।',
  'স্থাপত্যের দিক থেকে গোকুল মেধ অবিভক্ত বাংলার স্থাপত্যকলার এক অনন্য বিস্ময়। ভূমিধস রোধ ও উচ্চতা বৃদ্ধির কৌশল হিসেবে ইট দিয়ে তৈরি ১৭২টি সমান্তরাল অন্ধ প্রকোষ্ঠের (Blind Cells) ওপর মূল মন্দিরটি উঁচু করে নির্মাণ করা হয়েছিল। এর বহির্বলয় স্তরবিশিষ্ট সিঁড়ির মতো ধাপে ধাপে ওপরে উঠেছে, যা প্রাচীন ভারতীয় সেলুলার আর্কিটেকচারের এক উজ্জ্বল নিদর্শন।', 'বগুড়া শহর থেকে উত্তরে মহাস্থানগড় যাওয়ার পথে গোকুল বাসস্ট্যান্ড নেমে পূর্বে মাত্র ১ কিলোমিটার ভেতরে অটোরিকশা বা হেঁটে যাওয়া যায়। শহর থেকে মোট দূরত্ব প্রায় ৯ কিমি।', '["১৭২টি সুবিন্যস্ত সেলুলার অন্ধ কুঠুরি কাঠামো","উঁচু ঢিবির ওপর থেকে চারপাশের সবুজ মাঠ ও গ্রামের মনোরম দৃশ্য","বেহুলা-লখিন্দরের রোমাঞ্চকর লোকগাথা","শান্ত ও মনোরম গ্রামীণ পরিবেশ"]'::jsonb,
  'প্রতিদিন সকাল ৯টা থেকে বিকেল ৫টা পর্যন্ত উন্মুক্ত।', 'প্রত্নতত্ত্ব অধিদপ্তর নির্ধারিত সাধারণ প্রবেশ ফি: ২০ টাকা।', 'নভেম্বর থেকে ফেব্রুয়ারি।', '24.9458° N, 89.3492° E',
  'https://maps.google.com/?q=Gokul+Medh,Bogura', true,
  'আরিফুল হক',
  NULL,
  NULL,
  'স্থানীয় ইতিহাস সংগ্রাহক'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;

INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  'vasu-vihara', 'ভাসু বিহার (নরপতির ধাপ)', 'Vasu Vihara Buddhist Monastery', 'archaeological',
  'বৌদ্ধ বিহার ও প্রত্নতত্ত্ব', 'বিহার গ্রাম, শিবগঞ্জ উপজেলা, বগুড়া', 'শিবগঞ্জ', 'হিউয়েন সাং বর্ণিত পো-শি-পো',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80', '["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80"]'::jsonb, 'চীনা পরিব্রাজক হিউয়েন সাং-এর ভ্রমণবৃত্তান্তে উল্লেখিত ঐতিহাসিক "পো-শি-পো" বিহারের ধ্বংসাবশেষ।', 'সপ্তম শতাব্দীতে বিখ্যাত চীনা তীর্থযাত্রী হিউয়েন সাং পুণ্ড্রবর্ধন ভ্রমণকালে নগর থেকে ৬ মাইল পশ্চিমে অবস্থিত "পো-শি-পো" (Po-Shi-Po) বিহারের কথা লিখেছিলেন, যেখানে ৭০০ বৌদ্ধ ভিক্ষু বাস করতেন। পরবর্তীতে ১৯৭৩-৭৪ সালে খননের মাধ্যমে বর্তমান ভাসু বিহারে দুটি মাঝারি মাপের বৌদ্ধ মঠ ও একটি মন্দিরের ধ্বংসাবশেষ আবিষ্কৃত হয়। এখান থেকে প্রায় ৮৫টির বেশি ব্রোঞ্জ মূর্তি ও সিলমোহর উদ্ধার করা হয়েছে।',
  'কমপ্লেক্সটিতে দুটি চতুষ্কোণ বিহার রয়েছে। বড় বিহারটিতে ৩০টি ভিক্ষু কক্ষ এবং ছোট বিহারটিতে ২৬টি কক্ষ উন্মোচিত হয়েছে। কক্ষগুলোর মাঝে উন্মুক্ত প্রাঙ্গণ ও প্রদক্ষিণ পথ রয়েছে। দেয়ালের গায়ে চমৎকার পোড়ামাটির ফলকচিত্র (টেরাকোটা) পাওয়া গেছে যা তৎকালীন ধর্মীয় ও সামাজিক জীবনের চিত্র তুলে ধরে।', 'মহাস্থানগড় থেকে প্রায় ৬ কিলোমিটার উত্তর-পশ্চিমে শিবগঞ্জ উপজেলার বিহার ইউনিয়নে অবস্থিত। বগুড়া শহর থেকে সরাসরি সিএনজি রিজার্ভ করে যাওয়া সুবিধাজনক।', '["পাল যুগের সুপরিকল্পিত বৌদ্ধ সংঘারামের স্থাপত্য","ভিক্ষুদের ধ্যান কক্ষ ও কেন্দ্রীয় প্রাঙ্গণ","প্রশান্ত দীঘি ও সুপ্রাচীন বৃক্ষরাজিতে ঘেরা নীরব পরিবেশ","হিউয়েন সাং-এর ঐতিহাসিক স্মৃতিবিজড়িত জনপদ"]'::jsonb,
  'সূর্যোদয় থেকে সূর্যাস্ত।', 'বিনামূল্যে উন্মুক্ত / সাধারণ এলাকা।', 'শরৎ ও শীতকাল।', '24.9817° N, 89.2894° E',
  'https://maps.google.com/?q=Vasu+Bihara,Bogura', true,
  'অধ্যাপক শফিকুল ইসলাম',
  NULL,
  NULL,
  'প্রত্নতত্ত্ব গবেষক'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;

INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  'kherua-mosque', 'ঐতিহাসিক খেরুয়া মসজিদ (১৫৮২)', 'Historic Kherua Mosque', 'heritage',
  'সুলতানি ও মুঘল স্থাপত্য', 'খন্দকারটোলা, শেরপুর উপজেলা, বগুড়া', 'শেরপুর', '১৫৮২ সালের স্থাপত্য',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', '["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80"]'::jsonb, '১৫৮২ খ্রিস্টাব্দে নির্মিত তিন গম্বুজ বিশিষ্ট অপূর্ব পোড়ামাটির টেরাকোটা অলংকরণ সমৃদ্ধ সুলতানি-মুঘল ট্রানজিশনাল মসজিদ।', 'মুঘল সম্রাট আকবরের আমলে ১৫৮২ খ্রিস্টাব্দে কাকশাল বিদ্রোহীদের অন্যতম নেতা জওহর আলী কাকশালের পুত্র মির্জা মুরাদ খান কাকশাল এই অনন্য মসজিদটি নির্মাণ করেন। মসজিদের উত্তর ও দক্ষিণ দরজার ফার্সি শিলালিপিতে এর সুনির্দিষ্ট নির্মাণকাল উল্লেখ রয়েছে। এটি বাংলার সুলতানি স্থাপত্য থেকে মুঘল স্থাপত্যে রূপান্তরের এক অনন্য জীবন্ত দলিল।',
  'মসজিদটি উত্তর-দক্ষিণে ১৭.২৭ মিটার দীর্ঘ এবং পূর্ব-পশ্চিমে ৭.৪২ মিটার চওড়া। এর দেয়াল প্রায় ১.৮১ মিটার পুরু। এর ছাদে তিনটি সুষম গোলাকার গম্বুজ রয়েছে এবং চার কোণে চারটি অষ্টভুজাকার কর্নার টাওয়ার বা মিনার রয়েছে। পূর্ব দেয়ালে তিনটি খিলানযুক্ত প্রবেশপথ এবং পশ্চিম দেয়ালে তিনটি চমৎকার মেহরাব রয়েছে যা জ্যামিতিক নকশা ও পোড়ামাটির পদ্মফুল দিয়ে সুসজ্জিত।', 'বগুড়া শহর থেকে ঢাকা মহাসড়ক ধরে দক্ষিণ দিকে প্রায় ২২ কিলোমিটার গেলে শেরপুর পৌরসভা। শেরপুর বাসস্ট্যান্ড থেকে রিকশা বা হেঁটে ১ কিলোমিটার পশ্চিমে খন্দকারটোলা গ্রামে মসজিদটি অবস্থিত।', '["সাড়ে চার শত বছরের প্রাচীন নিখুঁত তিন গম্বুজ কাঠামো","অষ্টভুজাকার কারুকার্যময় চার কোণ মিনার","সুলতানি আমলের বাঁকানো কার্নিশ ও পোড়ামাটির কারুকাজ","মূল ফার্সি শিলালিপি"]'::jsonb,
  'সারাদিন উন্মুক্ত (নিয়মিত ৫ ওয়াক্ত নামাজ আদায় করা হয়)।', 'সম্পূর্ণ বিনামূল্যে।', 'সারা বছরই পরিদর্শনযোগ্য।', '24.6732° N, 89.4216° E',
  'https://maps.google.com/?q=Kherua+Mosque+Sherpur+Bogura', true,
  'মাওলানা আব্দুল মান্নান',
  NULL,
  NULL,
  'শেরপুর ইতিহাস ও ঐতিহ্য সংরক্ষণ কমিটি'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;

INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  'sariakandi-jamuna-ghat', 'প্রেম যমুনার ঘাট ও কালিতলা গ্রোয়েন', 'Sariakandi Jamuna Ghat & Kalitala Groin', 'nature',
  'নদী পর্যটন ও চরাঞ্চল', 'কালিতলা, সারিয়াকান্দি উপজেলা, বগুড়া', 'সারিয়াকান্দি', 'যমুনার সূর্যাস্ত ও নৌকাভ্রমণ',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', '["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"]'::jsonb, 'যমুনা নদীর বিশাল জলরাশি, কালিতলা স্পার বাঁধ, চরাঞ্চল কৃষি ও সূর্যাস্তের মনোরম প্রাকৃতিক পর্যটন কেন্দ্র।', 'সারিয়াকান্দির কালিতলা ও প্রেম যমুনার ঘাট যমুনা নদীর ভাঙন রোধে নির্মিত কংক্রিট গ্রোয়েন বাঁধ হলেও এর নয়নাভিরাম নৈসর্গিক সৌন্দর্য এটিকে উত্তরবঙ্গের অন্যতম জনপ্রিয় নদী অবকাশ কেন্দ্রে পরিণত করেছে। বর্ষায় যমুনার উত্তাল ঢেউ এবং শীতকালে শান্ত জল ও বালুকাময় চরের রূপ প্রকৃতিপ্রেমীদের মুগ্ধ করে।',
  'যমুনার বুকে শত শত মিটার দীর্ঘ কংক্রিটের স্পার বাঁধ নদীর গভীরে বিস্তৃত। এখানে দাঁড়িয়ে নদীর বুক চিরে বয়ে যাওয়া নির্মল হাওয়া উপভোগ করা যায়। ঘাট থেকে ইঞ্জিনচালিত দেশি নৌকায় করে যমুনার দুর্গম চরাঞ্চল, মহিষের বাথান এবং লাল মরিচের বিস্তীর্ণ ক্ষেত দর্শন করা যায়।', 'বগুড়া শহর থেকে পূর্বে প্রায় ২৩ কিলোমিটার দূরত্বে সারিয়াকান্দি উপজেলা সদর। সাতমাথা থেকে সারিয়াকান্দির সরাসরি বাস, সিএনজি অটোরিকশা নিয়মিত চলাচল করে। সময় লাগে প্রায় ৪৫-৫০ মিনিট। ঘাট পর্যন্ত অটোরিকশা যায়।', '["যমুনা নদীর বুকে সূর্যাস্ত ও সূর্যোদয়ের অপূর্ব ক্যানভাস","কালিতলা ও দীঘলকান্দি গ্রোয়েন বাঁধে হেঁটে বেড়ানো","দেশি কাঠের নৌকায় নদীভ্রমণ ও চরাঞ্চল পরিদর্শন","তাজা যমুনার বৈরাগী, বাতাসি ও নদীর মাছ ভাজা"]'::jsonb,
  'ভোর ৫টা থেকে রাত ৮টা।', 'ঘাটে প্রবেশের কোনো ফি নেই। নৌকাভ্রমণ আলোচনা সাপেক্ষে (২০০–১০০০৳)।', 'বর্ষাকাল (জুলাই-সেপ্টেম্বর) এবং শীতকালে চরের প্রাকৃতিক রূপ দেখার জন্য (নভেম্বর-ফেব্রুয়ারি)।', '24.8912° N, 89.5824° E',
  'https://maps.google.com/?q=Sariakandi+Jamuna+Ghat,Bogura', true,
  'রাশেদুল কবির',
  NULL,
  NULL,
  'সারিয়াকান্দি পর্যটন ফোরাম'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;

INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  'nawab-palace', 'নবাব প্যাaleস ও বগুড়ার দই ঐতিহ্য', 'Bogura Nawab Palace & Doi Heritage', 'heritage',
  'ঐতিহ্য ও সংস্কৃতি', 'সূত্রাপুর ও সাতমাথা, বগুড়া সদর', 'বগুড়া সদর', 'জিআই স্বীকৃত দই ও শতবর্ষী ইতিহাস',
  'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80', '["https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80"]'::jsonb, 'পাকিস্তানের সাবেক প্রধানমন্ত্রী মোহাম্মদ আলী বগুড়ার ঐতিহাসিক নবাব প্যালেস এবং বগুড়ার বিশ্বখ্যাত জিআই স্বীকৃত দই শিল্প।', 'বগুড়ার নবাব পরিবার উনবিংশ ও বিংশ শতাব্দীতে অবিভক্ত বাংলা ও উপমহাদেশের রাজনীতি ও শিক্ষায় গভীর প্রভাব রেখেছিল। এই পরিবারের কৃতী সন্তান মোহাম্মদ আলী বগুড়া পাকিস্তানের তৃতীয় প্রধানমন্ত্রী ছিলেন। তাদের ঐতিহাসিক প্রাসাদ সূত্রাপুরে অবস্থিত। পাশেই সাতমাথা ও কবি নজরুল ইসলাম সড়কে গড়ে উঠেছে বিশ্বখ্যাত বগুড়ার দই ও মিষ্টির শতবর্ষী ঐতিহ্য, যা ২০২৩ সালে আন্তর্জাতিক ভৌগোলিক নির্দেশক (GI) সনদ অর্জন করে।',
  'ব্রিটিশ ঔপনিবেশিক ইন্দো-ইউরোপীয় স্থাপত্যরীতিতে নির্মিত নবাব প্যালেসে সুদৃশ্য তোরণ, অলংকৃত থাম ও সুবিশাল বারান্দা রয়েছে। সাতমাথাকে ঘিরে শতবর্ষী আকবরিয়া, এশিয়া সুইটমিট ও গৌরগোপালের ঐতিহ্যবাহী সরা দইয়ের দোকানগুলো বগুড়ার সাংস্কৃতিক পরিচয়ের অবিচ্ছেদ্য অংশ।', 'বগুড়া শহরের কেন্দ্রস্থল সাতমাথা থেকে মাত্র ৫০০ মিটার দক্ষিণে সূত্রাপুরে হেঁটে বা রিকশায় যাওয়া যায়।', '["ঐতিহাসিক নবাব পরিবারের প্রাসাদ ও জাদুঘর সংগ্রহ","আন্তর্জাতিক জিআই সনদপ্রাপ্ত পোড়ামাটির সরায় পাতা খাঁটি বগুড়ার দই","শতবর্ষী ঐতিহ্যবাহী আকবরিয়ার লাচ্ছা সেমাই ও গ্র্যান্ড রেস্তোরাঁ","বগুড়ার প্রাণকেন্দ্র সাতমাথা মোড় ও ঐতিহাসিক এডওয়ার্ড পার্ক"]'::jsonb,
  'প্যালেস এলাকা: সকাল ১০টা – বিকেল ৫টা; দই ও মিষ্টি বিপণি: সকাল ৭টা – রাত ১১টা।', 'বিনামূল্যে পরিদর্শনযোগ্য।', 'সারা বছর।', '24.8481° N, 89.3730° E',
  'https://maps.google.com/?q=Nawab+Palace+Bogura', true,
  'মোঃ কামরুল হাসান',
  NULL,
  NULL,
  'বগুড়া সাংস্কৃতিক পরিষদ'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;

INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  'jogir-bhaban', 'যোগীর ভবন ও মন্দির কমপ্লেক্স', 'Jogir Bhaban Temple Complex', 'religious',
  'ধর্মীয় ও প্রত্নতাত্ত্বিক আশ্রম', 'পাইকড়, কাহালু উপজেলা, বগুড়া', 'কাহালু', 'সুপ্রাচীন নাথপন্থী তীর্থ',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80', '["https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80"]'::jsonb, 'নাগর নদীর তীরে অবস্থিত নাথপন্থী সাধকদের ৮৮ একর বিস্তৃত প্রাচীন আশ্রম, শিব মন্দির ও পোড়ামাটির ফলকচিত্র।', 'কাহালুর যোগীর ভবন সুপ্রাচীন কাল থেকেই নাথপন্থী যোগী ও সন্ন্যাসীদের প্রধান সাধনক্ষেত্র হিসেবে খ্যাত। কিংবদন্তি অনুসারে গোরক্ষনাথ ও মীননাথের অনুসারীরা এখানে সাধনা করতেন। পরবর্তীতে সেন আমলে এবং মুঘল আমলে রাজা মানসিংহ এই আশ্রম পরিদর্শনে এসেছিলেন বলে জনশ্রুতি রয়েছে। এখানকার মন্দিরগুলো প্রাচীন বাংলার টেরাকোটা শিল্পের সমৃদ্ধ নিদর্শন বহন করে।',
  'যোগীর ভবনে ৪টি প্রাচীন মন্দির রয়েছে: সর্বেশ্বর মন্দির, কালা ভৈরব মন্দির, গোরক্ষনাথ মন্দির এবং দুর্গা মন্দির। দেয়ালগুলোতে দেব-দেবী, ফুল-লতাপাতা এবং জ্যামিতিক নকশার পোড়ামাটির ফলক স্থাপিত। কমপ্লেক্সের পাশে রয়েছে সুপ্রাচীন কুয়া ও বটবৃক্ষ।', 'বগুড়া শহর থেকে কাহালু হয়ে পশ্চিমে প্রায় ১৬ কিমি। কাহালু বাসস্ট্যান্ড থেকে অটোরিকশায় পাইকড় ইউনিয়নের যোগীর ভবনে পৌঁছানো যায়।', '["প্রাচীন নাথপন্থী যোগী আশ্রম ও ঐতিহ্য","টেরাকোটা অলংকৃত সর্বেশ্বর ও কালা ভৈরব মন্দির","নিভৃত পল্লী প্রকৃতির ভেতর শান্তির আবহ"]'::jsonb,
  'সকাল ৮টা থেকে সন্ধ্যা ৬টা পর্যন্ত।', 'বিনামূল্যে উন্মুক্ত।', 'শীতকাল ও শিবরাত্রির সময়।', '24.8725° N, 89.2431° E',
  'https://maps.google.com/?q=Jogir+Bhaban+Kahaloo', true,
  'বিপ্লব কুমার মহন্ত',
  NULL,
  NULL,
  'যোগীর ভবন সেবা পরিষদ'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;

INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag,
  cover_image, gallery, short_desc, history, architecture, how_to_reach,
  highlights, timings, entry_fee, best_time, map_coordinates, map_url,
  is_approved, contributor_name, contributor_phone, contributor_email, contributor_note
) VALUES (
  'bhabanipur-shaktipeeth', 'ভবানীপুর শক্তিপীঠ ও অপরাজিতা তীর্থ', 'Bhabanipur Shaktipeeth Temple', 'religious',
  'ধর্মীয় ও ঐতিহাসিক তীর্থ', 'ভবানীপুর, শেরপুর উপজেলা, বগুড়া', 'শেরপুর', 'উপমহাদেশের ৫১ শক্তিপীঠের এক পীঠ',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80', '["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"]'::jsonb, 'হিন্দু পৌরাণিক বিশ্বাসের ৫১ শক্তিপীঠের অন্যতম পবিত্র তীর্থ; নাটোরের রানী ভবানীর স্মৃতিবিজড়িত মন্দির প্রাঙ্গণ।', 'হিন্দু পৌরাণিক বিশ্বাস অনুসারে দেবী সতীর বাম পায়ের নূপুর বা অর্ঘ্য এখানে পতিত হয়েছিল। ফলে এটি শক্তিপীঠ হিসেবে উপমহাদেশব্যাপী বিখ্যাত। নাটোরের দানশীল রানী ভবানী এই মন্দিরের ভক্ত ছিলেন এবং তিনি মন্দিরের সংস্কার ও প্রাঙ্গণে বিশাল পুকুর ও অতিথিশালা নির্মাণ করেছিলেন। প্রতি বছর মাঘী পূর্ণিমায় এখানে ঐতিহ্যবাহী মেলা ও ভক্তদের ঢল নামে।',
  'প্রাচীরঘেরা মনোরম মন্দির প্রাঙ্গণে প্রধান ভবানী মন্দির, শিব মন্দির ও বেলবরণ ডালা অবস্থিত। পাশেই রয়েছে রানী ভবানীর খননকৃত সুবৃহৎ পুকুর ও নাটমন্দির। লাল ইটের প্রাচীর ও প্রাচীন স্থাপত্যের অবয়ব এখনও বিদ্যমান।', 'শেরপুর উপজেলা সদর থেকে দক্ষিণ-পশ্চিমে প্রায় ১২ কিলোমিটার দূরে ভবানীপুর ইউনিয়নে অবস্থিত। বগুড়া শহর থেকে মোট দূরত্ব প্রায় ৩৪ কিমি। শেরপুর থেকে সরাসরি সিএনজি পাওয়া যায়।', '["উপমহাদেশের ৫১ শক্তিপীঠের এক অন্যতম জাগ্রত তীর্থ","রানী ভবানীর স্মৃতিবিজড়িত ঐতিহাসিক দীঘি ও স্থাপত্য","শান্ত ও ছায়াঘেরা আধ্যাত্মিক পরিবেশ"]'::jsonb,
  'প্রতিদিন সকাল ৬টা – দুপুর ১২টা এবং বিকেল ৪টা – রাত ৮টা।', 'বিনামূল্যে উন্মুক্ত।', 'অক্টোবর থেকে মার্চ এবং মাঘী পূর্ণিমা উৎসবের সময়।', '24.6053° N, 89.3789° E',
  'https://maps.google.com/?q=Bhabanipur+Temple+Sherpur+Bogura', true,
  'অসিত কুমার নন্দী',
  NULL,
  NULL,
  'ভবানীপুর মন্দির পরিচালনা পরিষদ'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;

-- ========================================================
-- SEED: SPOT REVIEWS (9 RECORDS)
-- ========================================================

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'mahasthangarh', 'ফারহানা ইসলাম', 5,
  'বাংলার আড়াই হাজার বছরের জীবন্ত ইতিহাস। জাদুঘরটি অত্যন্ত সমৃদ্ধ এবং গোবিন্দ ভিটার পাশের নদীর দৃশ্য মন জুড়িয়ে দেয়।', 'ঢাকা'
);

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'mahasthangarh', 'মোঃ নাজমুল হুদা', 5,
  'পারিবারিক ভ্রমণের জন্য দারুণ জায়গা। মহাস্থানের বিখ্যাত কটকটি মিস করবেন না!', 'রাজশাহী'
);

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'gokul-medh', 'মাহবুব আলম', 5,
  'ইটের সূক্ষ্ম গাঁথুনি এবং ধাপে ধাপে ওপরে ওঠা স্থাপত্য চোখ জুড়িয়ে দেয়। বিকেলের আলোয় ছবি তোলার দারুণ স্পট।', 'বগুড়া'
);

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'vasu-vihara', 'অনন্যা রায়', 5,
  'পাহাড়পুরের মতোই অপূর্ব অনুভূতি দেয়। কোলাহলমুক্ত নিস্তব্ধ এক প্রাচীন পরিবেশ।', 'সিলেট'
);

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'kherua-mosque', 'সৈয়দ সাজিদ হাসান', 5,
  'লাল ইটের এমন পরিচ্ছন্ন ও টেকসই প্রাচীন মসজিদ বাংলাদেশে বিরল। শেরপুরের দই খাবার পর এখানে কাটানো সময় চিরস্মরণীয়।', 'ঢাকা'
);

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'sariakandi-jamuna-ghat', 'শায়লা শারমিন', 5,
  'যমুনার বাতাসে বুক ভরে নিঃশ্বাস নেওয়ার সেরা জায়গা। বিকেলে নৌকা ভ্রমণের অভিজ্ঞতা অসাধারণ।', 'বগুড়া'
);

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'nawab-palace', 'তানজিম আহমেদ', 5,
  'বগুড়ায় এসে সাতমাথায় নবাব প্যালেস দেখে সরা দই না খেলে বগুড়া সফর অপূর্ণ থেকে যায়!', 'চট্টগ্রাম'
);

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'jogir-bhaban', 'দীপ্ত চ্যাটার্জী', 5,
  'প্রকৃতির মাঝে এত চমৎকার ঐতিহাসিক মন্দির কমপ্লেক্স দেখে মন ভরে গেল। শান্তিপ্রিয় পর্যটকদের অবশ্যই আসা উচিত।', 'খুলনা'
);

INSERT INTO public.spot_reviews (spot_id, author, rating, comment, location)
VALUES (
  'bhabanipur-shaktipeeth', 'প্রিয়াঙ্কা সেন', 5,
  'অত্যন্ত শান্ত, পবিত্র ও ভক্তিময় পরিবেশ। নাটোরের রানী ভবানীর ইতিহাসের স্মৃতিচিহ্ন আজও জীবন্ত।', 'ঢাকা'
);

-- SEED: EMERGENCY CONTACTS (8 RECORDS)

INSERT INTO public.emergency_contacts (title, number, icon)
VALUES ('জাতীয় জরুরি সেবা (পুলিশ, ফায়ার ও অ্যাম্বুলেন্স)', '999', 'PhoneCall')
ON CONFLICT DO NOTHING;

INSERT INTO public.emergency_contacts (title, number, icon)
VALUES ('বগুড়া জেলা পুলিশ কন্ট্রোল রুম', '01320-126498', 'Shield')
ON CONFLICT DO NOTHING;

INSERT INTO public.emergency_contacts (title, number, icon)
VALUES ('বগুড়া ফায়ার সার্ভিস ও সিভিল ডিফেন্স স্টেশন', '01730-336699', 'Flame')
ON CONFLICT DO NOTHING;

INSERT INTO public.emergency_contacts (title, number, icon)
VALUES ('শজিমেক হাসপাতাল জরুরি অ্যাম্বুলেন্স সার্ভিস', '01711-820847', 'Ambulance')
ON CONFLICT DO NOTHING;

INSERT INTO public.emergency_contacts (title, number, icon)
VALUES ('বগুড়া সদর উপজেলা স্বাস্থ্য কমপ্লেক্স', '051-66550', 'HeartPulse')
ON CONFLICT DO NOTHING;

INSERT INTO public.emergency_contacts (title, number, icon)
VALUES ('বগুড়া জেলা রেড ক্রিসেন্ট রক্ত কেন্দ্র', '051-66543', 'Droplet')
ON CONFLICT DO NOTHING;

INSERT INTO public.emergency_contacts (title, number, icon)
VALUES ('সন্ধানী (শজিমেক ইউনিট) রক্ত ও চক্ষু ব্যাংক', '01712-001122', 'Droplets')
ON CONFLICT DO NOTHING;

INSERT INTO public.emergency_contacts (title, number, icon)
VALUES ('স্বাস্থ্য বাতায়ন (২৪/৭ ফ্রি স্বাস্থ্য পরামর্শ)', '16263', 'PhoneForwarded')
ON CONFLICT DO NOTHING;

-- SEED: COMMUNITY POSTS (18 RECORDS)

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'blood', 'মোঃ রাশেদুল ইসলাম', 'O+', 'রক্তদাতা',
  NULL, 'বগুড়া সদর', 'সাতমাথা, বগুড়া · সর্বশেষ দান: ৪ মাস আগে', '01712-458920', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'blood', 'সাদিয়া আফরিন', 'A+', 'রক্তদাতা',
  NULL, 'শাজাহানপুর', 'শজিমেক ক্যাম্পাস · যেকোনো সময় প্রস্তুত', '01819-334112', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'blood', 'তানভীর হাসান', 'B+', 'রক্তদাতা',
  NULL, 'শেরপুর', 'শেরপুর পৌরসভা · স্বেচ্ছাসেবী রক্তদাতা', '01715-990231', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'blood', 'মাহমুদুল হক', 'O-', 'রক্তদাতা',
  NULL, 'শিবগঞ্জ', 'মহাস্থানগড় এলাকা · জরুরি প্রয়োজনে কল করুন', '01911-762340', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'blood', 'নুসরাত জাহান', 'AB+', 'রক্তদাতা',
  NULL, 'দুপচাঁচিয়া', 'দুপচাঁচিয়া সদর · নিয়মিত রক্তদাতা', '01722-618490', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'blood', 'জরুরি রক্ত প্রয়োজন (শজিমেক)', 'B-', 'জরুরি প্রয়োজন',
  NULL, 'বগুড়া সদর', 'শজিমেক মেডিসিন ওয়ার্ড · ২ ব্যাগ রক্ত প্রয়োজন', '01738-112233', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'tuition', 'আব্দুল্লাহ আল মামুন (বুয়েট শিক্ষার্থী)', NULL, NULL,
  'শিক্ষক উপলব্ধ', 'বগুড়া সদর', 'নবম–দ্বাদশ শ্রেণি: পদার্থবিজ্ঞান ও উচ্চতর গণিত', '01745-882190', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'tuition', 'ফারহানা ইয়াসমিন (রাবি স্নাতকোত্তর)', NULL, NULL,
  'শিক্ষিকা উপলব্ধ', 'বগুড়া সদর', 'ইংরেজি ও বিজ্ঞান (৬ষ্ঠ–১০ম শ্রেণি, জলেশ্বরীতলা)', '01823-449012', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'tuition', 'গৃহশিক্ষক প্রয়োজন (৭ম শ্রেণি)', NULL, NULL,
  'টিউশন অফার', 'শেরপুর', 'সপ্তাহে ৪ দিন ইংরেজি ও গণিত · সম্মানী আলোচনা সাপেক্ষে', '01711-552310', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'tuition', 'সাকিবুল ইসলাম (শজিমেক)', NULL, NULL,
  'শিক্ষক উপলব্ধ', 'শাজাহানপুর', 'মেডিকেল ভর্তি প্রস্তুতি ও জীববিজ্ঞান স্পেশাল ব্যাচ', '01675-221908', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'rent', '২ বেডরুম ফ্যামিলি ফ্ল্যাট ভাড়া', NULL, NULL,
  'ফ্যামিলি বাসা', 'বগুড়া সদর', 'জলেশ্বরীতলা, বগুড়া · গ্যাস, লিফট ও গ্যারেজ সুবিধা · ভাড়া: ১২,৫০০৳', '01711-334455', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'rent', 'ছাত্র মেস / সিট ভাড়া (শজিমেক সংলগ্ন)', NULL, NULL,
  'ছাত্র মেস', 'শাজাহানপুর', 'সিলিমপুর, শজিমেক গেট সংলগ্ন · ওয়াইফাই ও মিল সুবিধা · ২,৮০০৳', '01817-665544', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'rent', 'মেইন রোডে বাণিজ্যিক দোকান ভাড়া', NULL, NULL,
  'দোকান / অফিস', 'শেরপুর', 'শেরপুর বাসস্ট্যান্ড বাজার · ৪৫০ বর্গফুট · অগ্রিম আলোচনা সাপেক্ষে', '01712-908070', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'rent', '৩ রুমের নিচতলা বাসা ভাড়া', NULL, NULL,
  'ফ্যামিলি বাসা', 'বগুড়া সদর', 'উপশহর, বগুড়া · শান্ত পরিবেশ, ২৪ ঘণ্টা পানি · ১০,০০০৳', '01912-443322', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'jobs', 'ডেলিভারি রাইডার আবশ্যক (ফুড ও পার্সেল)', NULL, NULL,
  'জরুরি নিয়োগ', 'বগুড়া সদর', 'বগুড়া শহর এলাকায় নিজস্ব বাইক/সাইকেল থাকতে হবে · আকর্ষণীয় কমিশন', '01700-112233', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'jobs', 'ফার্মেসী সেলসম্যান প্রয়োজন', NULL, NULL,
  'চাকরি সুযোগ', 'শেরপুর', 'শেরপুর বাসস্ট্যান্ড ফার্মেসী · অভিজ্ঞদের অগ্রাধিকার · বেতন আলোচনা সাপেক্ষে', '01714-556677', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'business', 'এশিয়ান কার রিপেয়ার & ডেন্ট পেইন্ট', NULL, NULL,
  'অটোমোবাইল সার্ভিস', 'বগুড়া সদর', 'চারমাথা বাস টার্মিনাল রোড, বগুড়া · বিশ্বস্ত কার ডেন্টিং ও ইঞ্জিন সার্ভিস', '01716-889900', true
) ON CONFLICT DO NOTHING;

INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone, is_approved)
VALUES (
  'business', 'মহাস্থান স্পেশাল খাঁটি কটকটি ভাণ্ডার', NULL, NULL,
  'স্থানীয় খাদ্যপণ্য', 'শিবগঞ্জ', 'মহাস্থান বাসস্ট্যান্ড · শতবর্ষের ঐতিহ্যবাহী স্পেশাল ঘি ও তিলের কটকটি', '01718-223344', true
) ON CONFLICT DO NOTHING;

-- ========================================================
-- SEED: HEALTHCARE FACILITIES (352 VERIFIED RECORDS)
-- ========================================================

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001095', '10001095', 'Adamdighi Upazila Health Complex', 'আদমদীঘি উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'adamdighi-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Adamdighi Sadar', 'আদমদীঘি সদর', 'Bogura-Naogaon Highway, Adamdighi',
  'বগুড়া-নওগাঁ মহাসড়ক, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620","01710-751224"]'::jsonb, 'adamdighi@uhfpo.dghs.gov.bd', 'http://adamdighi.bogra.gov.bd',
  24.7735, 89.0435, 'https://maps.google.com/?q=24.7735,89.0435', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি বিভাগ (২৪ ঘণ্টা)","বহির্বিভাগ (OPD)","আন্তঃবিভাগ (৫০ শয্যা)","জরুরি প্রসূতি সেবা (EOC)","টিকা ও ইপিআই কার্যক্রম","ল্যাবরেটরি ও প্যাথলজি","এক্স-রে ও আল্ট্রাসনোগ্রাফি","এনসিডি কর্নার","আইএমসিআই ও পুষ্টি কর্নার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001103', '10001103', 'Bogura (Sadar) Upazila Health Office', 'বগুড়া (সদর) উপজেলা স্বাস্থ্য ও পরিবার পরিকল্পনা কার্যালয়',
  'bogura-sadar-upazila-health-office', 'Upazila Health Office', 'government_office',
  'Upazila Health Office', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Bogura Pourashava', 'বগুড়া পৌরসভা', 'Urban Ward No-10, Bogura',
  'ওয়ার্ড নং ১০, বগুড়া পৌরসভা, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-66550","01712-458920"]'::jsonb, 'bogra.sadar@uhfpo.dghs.gov.bd', 'http://sadar.bogra.gov.bd',
  24.8465, 89.3732, 'https://maps.google.com/?q=24.8465,89.3732', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["উপজেলা স্বাস্থ্য প্রশাসন","ইপিআই ও টিকাদান সমন্বয়","প্রাথমিক স্বাস্থ্যসেবা তদারকি","কমিউনিটি ক্লিনিক পর্যবেক্ষণ","রোগ নিয়ন্ত্রণ ও জনস্বাস্থ্য তদারকি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001115', '10001115', 'Dhunat Upazila Health Complex', 'ধুনট উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'dhunat-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Pourashava', 'ধুনট পৌরসভা', 'Ward No-01, Hospital Road, Dhunat',
  'হাসপাতাল রোড, ১ নং ওয়ার্ড, ধুনট পৌরসভা, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621","01712-889922"]'::jsonb, 'dhunat@uhfpo.dghs.gov.bd', 'http://dhunat.bogra.gov.bd',
  24.6833, 89.5375, 'https://maps.google.com/?q=24.6833,89.5375', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি বিভাগ (২৪ ঘণ্টা)","বহির্বিভাগ (OPD)","আন্তঃবিভাগ (৫০ শয্যা)","জরুরি প্রসূতি সেবা (EOC)","টিকা ও ইপিআই","ল্যাবরেটরি টেস্ট","এনসিডি ও ডায়াবেটিস কর্নার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001117', '10001117', 'Dhupchanchia Upazila Health Complex', 'দুপচাঁচিয়া উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'dhupchanchia-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dupchanchia Pourashava', 'দুপচাঁচিয়া পৌরসভা', 'Hospital Road, Dupchanchia',
  'হাসপাতাল রোড, দুপচাঁচিয়া পৌরসভা, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622","01303-460210"]'::jsonb, 'dhubchanchia@uhfpo.dghs.gov.bd', 'http://dupchanchia.bogra.gov.bd',
  24.875, 89.168, 'https://maps.google.com/?q=24.8750,89.1680', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি সেবা (২৪ ঘণ্টা)","অ্যাম্বুলেন্স সার্ভিস","বহির্বিভাগ ও আন্তঃবিভাগ (৫০ শয্যা)","নরমাল ডেলিভারি ও প্রসূতি সেবা","ল্যাব ডায়াগনস্টিক","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001122', '10001122', 'Gabtali Upazila Health Complex', 'গাবতলী উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'gabtali-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Gabtali Sadar', 'গাবতলী সদর', 'Bogura-Gabtali Road, Gabtali',
  'বগুড়া-গাবতলী সড়ক, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'gabtali@uhfpo.dghs.gov.bd', 'http://gabtali.bogra.gov.bd',
  24.8872, 89.4975, 'https://maps.google.com/?q=24.8872,89.4975', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি বিভাগ (২৪ ঘণ্টা)","বহির্বিভাগ (OPD)","আন্তঃবিভাগ (৫০ শয্যা)","জরুরি প্রসব ও নবজাতক সেবা","প্যাথলজি ও এক্স-রে","ইপিআই ও পরিবার পরিকল্পনা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001128', '10001128', 'Kahaloo Upazila Health Complex', 'কাহালু উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'kahaloo-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahaloo Pourashava', 'কাহালু পৌরসভা', 'Bogura-Naogaon Road, Kahaloo',
  'বগুড়া-নওগাঁ মহাসড়ক, কাহালু পৌরসভা, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624","01712-445566"]'::jsonb, 'kahaloo@uhfpo.dghs.gov.bd', 'http://kahaloo.bogra.gov.bd',
  24.825, 89.2625, 'https://maps.google.com/?q=24.8250,89.2625', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি বিভাগ (২৪ ঘণ্টা)","বহির্বিভাগ (OPD)","আন্তঃবিভাগ (৫০ শয্যা)","জরুরি প্রসূতি সেবা","ল্যাবরেটরি টেস্ট","ইপিআই টিকাদান ও পুষ্টি সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001135', '10001135', 'Nandigram Upazila Health Complex', 'নন্দীগ্রাম উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'nandigram-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Bhatgram Union', 'ভাটগ্রাম ইউনিয়ন', 'Bizrul, Nandigram',
  'বিজরুল, ভাটগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'nandigram@uhfpo.dghs.gov.bd', 'http://nandigram.bogra.gov.bd',
  24.678, 89.231, 'https://maps.google.com/?q=24.6780,89.2310', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["২৪ ঘণ্টা জরুরি সেবা","বহির্বিভাগ","৫০ শয্যা ইনডোর কেয়ার","ইওসি প্রসূতি সেবা","টিকা কেন্দ্র","প্যাথলজি ও ফার্মেসি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001140', '10001140', 'Sariakandi Upazila Health Complex', 'সারিয়াকান্দি উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'sariakandi-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Sariakandi Sadar', 'সারিয়াকান্দি সদর', 'Jamuna Embankment Area, Sariakandi',
  'সারিয়াকান্দি সদর, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'sariakandi@uhfpo.dghs.gov.bd', 'http://sariakandi.bogra.gov.bd',
  24.889, 89.621, 'https://maps.google.com/?q=24.8890,89.6210', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি বিভাগ (২৪ ঘণ্টা)","বহির্বিভাগ (OPD)","৫০ শয্যা ভর্তি সুবিধা","বন্যা ও দুর্যোগকালীন জরুরি চিকিৎসা","নরমাল ডেলিভারি","ল্যাবরেটরি টেস্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001143', '10001143', 'Shajahanpur Upazila Health Complex', 'শাজাহানপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'shajahanpur-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Majhira Union', 'মাঝিড়া ইউনিয়ন', 'Majhira, Shajahanpur',
  'মাঝিড়া, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646","01711-301782","01730-324877"]'::jsonb, 'shajahanpur@uhfpo.dghs.gov.bd', 'http://shajahanpur.bogra.gov.bd',
  24.764, 89.378, 'https://maps.google.com/?q=24.7640,89.3780', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি সেবা (২৪ ঘণ্টা)","হাইওয়ে দুর্ঘটনা জরুরি ট্রমা প্রাথমিক সেবা","বহির্বিভাগ","৫০ শয্যা আন্তঃবিভাগ","প্রসূতি সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001147', '10001147', 'Sherpur Upazila Health Complex', 'শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'sherpur-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Shahid Chhunu Road, Sherpur',
  'শহীদ ছুনু রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '["05029-77047","01701-248647","01730-324627"]'::jsonb, 'sherpur@uhfpo.dghs.gov.bd', 'http://health.sherpur.bogra.gov.bd',
  24.672, 89.4215, 'https://maps.google.com/?q=24.6720,89.4215', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি বিভাগ (২৪ ঘণ্টা)","বহির্বিভাগ (OPD)","৫০ শয্যা আন্তঃবিভাগ","জরুরি প্রসূতি সেবা (EOC)","এক্স-রে ও প্যাথলজি","ইপিআই টিকাদান কেন্দ্র","অ্যাম্বুলেন্স সার্ভিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd","http://health.sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001156', '10001156', 'Shibganj Upazila Health Complex', 'শিবগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'shibganj-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Shibganj Pourashava', 'শিবগঞ্জ পৌরসভা', 'Banail, Shibganj',
  'বানাইল, শিবগঞ্জ পৌরসভা, শিবগঞ্জ, বগুড়া - ৫৮১০', '["05033-69018","01730-324628","01701-248648"]'::jsonb, 'shibganj@uhfpo.dghs.gov.bd', 'http://shibganj.bogra.gov.bd',
  24.981, 89.324, 'https://maps.google.com/?q=24.9810,89.3240', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["২৪ ঘণ্টা জরুরি বিভাগ","বহির্বিভাগ","৫০ শয্যা ইনডোর কেয়ার","নরমাল ডেলিভারি ও সিজারিয়ান সুবিধা","ল্যাব টেস্ট","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001159', '10001159', 'Sonatala Upazila Health Complex', 'সোনাতলা উপজেলা স্বাস্থ্য কমপ্লেক্স',
  'sonatala-upazila-health-complex', 'Upazila Health Complex', 'government_hospital',
  'Upazila Health Complex (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Sonatala Pourashava', 'সোনাতলা পৌরসভা', 'Hospital Road, Sonatala',
  'হাসপাতাল রোড, সোনাতলা পৌরসভা, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649","01717-547622","01730-324629"]'::jsonb, 'sonatala@uhfpo.dghs.gov.bd', 'http://sonatala.bogra.gov.bd',
  25.012, 89.505, 'https://maps.google.com/?q=25.0120,89.5050', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি বিভাগ (২৪ ঘণ্টা)","বহির্বিভাগ (OPD)","৫০ শয্যা ভর্তি সুবিধা","প্রসূতি ও শিশু স্বাস্থ্য","ল্যাবরেটরি টেস্ট","ইপিআই ও পুষ্টি কর্নার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd","https://dghs.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001104', '10001104', 'Bogra Civil Surgeon Office', 'বগুড়া সিভিল সার্জন কার্যালয়',
  'bogra-civil-surgeon-office', 'District Health Administration', 'government_office',
  'District Level Office', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Bogura Pourashava', 'বগুড়া পৌরসভা', 'Urban Ward No-07, Jaleshwaritola',
  'জলেশ্বরীতলা, ওয়ার্ড নং ৭, বগুড়া পৌরসভা, বগুড়া - ৫৮০০', '["02589902130","01712-458920"]'::jsonb, 'bogra@cs.dghs.gov.bd', 'http://cs.bogra.gov.bd',
  24.8485, 89.3712, 'https://maps.google.com/?q=24.8485,89.3712', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["জেলা স্বাস্থ্য প্রশাসন ও সমন্বয়","সিভিল সার্জন মেডিকেল বোর্ড","জরুরি স্বাস্থ্য নিয়ন্ত্রণ কক্ষ (কন্ট্রোল রুম)","ইপিআই কোল্ড চেইন হাব","বেসরকারি ক্লিনিক ও ডায়াগনস্টিক নিবন্ধন ও লাইসেন্সিং"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://cs.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001105', '10001105', 'Bogra District Reserve EPI Store & Training Centre', 'বগুড়া জেলা রিজার্ভ ইপিআই স্টোর ও প্রশিক্ষণ কেন্দ্র',
  'bogra-district-reserve-epi-store-training-centre', 'Vaccine & Cold Chain Logistics', 'government_facility',
  'District EPI Store', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Bogura Pourashava', 'বগুড়া পৌরসভা', 'Civil Surgeon Compound, Jaleshwaritola',
  'সিভিল সার্জন চত্বর, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০', '["02589902130"]'::jsonb, 'bogra.epi@dghs.gov.bd', 'http://cs.bogra.gov.bd',
  24.8488, 89.3715, 'https://maps.google.com/?q=24.8488,89.3715', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["টিকা ও কোল্ড চেইন সংরক্ষণ","১২টি উপজেলার টিকা সরবরাহ","স্বাস্থ্য সহকারী ও টিকাদানকারী প্রশিক্ষণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://cs.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001100', '10001100', 'Hazardighi (Noongola) Union Health Sub Center', 'হাজারদীঘি (নূনগোলা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'hazardighi-noongola-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Noongola', 'নূনগোলা', 'Hazardighi, Noongola',
  'হাজারদীঘি, নূনগোলা ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-458920","051-66550"]'::jsonb, 'hazardighi_nungola@usc.dghs.gov.bd', 'http://noongolaup.bogra.gov.bd',
  24.8912, 89.3145, 'https://maps.google.com/?q=24.8912,89.3145', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","জরুরি প্রাথমিক চিকিৎসা","গর্ভবতী ও প্রসূতি মায়েদের সেবা","ইপিআই নিয়মিত টিকাদান","বিনামূল্যে প্রয়োজনীয় সরকারি ওষুধ বিতরণ","শিশু স্বাস্থ্য ও পুষ্টি পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001101', '10001101', 'Mothergonj Union Health Sub Center', 'মাদারগঞ্জ (লাহিড়ীপাড়া) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'mothergonj-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Lahiripara', 'লাহিড়ীপাড়া', 'Mothergonj Bazar, Lahiripara',
  'মাদারগঞ্জ বাজার, লাহিড়ীপাড়া ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-458920","051-66550"]'::jsonb, 'mothergonj_lahiripara@usc.dghs.gov.bd', 'http://lahiriparaup.bogra.gov.bd',
  24.912, 89.342, 'https://maps.google.com/?q=24.9120,89.3420', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ স্বাস্থ্যসেবা","উপ-সহকারী কমিউনিটি মেডিকেল অফিসার পরামর্শ","প্রসূতি ও ধাত্রীবিদ্যা সেবা","ইপিআই সম্প্রসারিত টিকাদান","ডায়রিয়া ও ওআরএস কর্নার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001102', '10001102', 'Nawdapara (Nishindara) Union Health Sub Center', 'নওদাপাড়া (নিশিন্দারা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'nawdapara-nishindara-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Nishindara', 'নিশিন্দারা', 'Nawdapara, Rangpur Road',
  'নওদাপাড়া, নিশিন্দারা ইউনিয়ন, বগুড়া-রংপুর মহাসড়ক সংলগ্ন, বগুড়া - ৫৮০০', '["01712-458920","051-66550"]'::jsonb, 'nawdapara_nishindara@usc.dghs.gov.bd', 'http://nishindaraup.bogra.gov.bd',
  24.8725, 89.356, 'https://maps.google.com/?q=24.8725,89.3560', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ সেবা (OPD)","প্রাথমিক দুর্ঘটনা ও ট্রমা ড্রেসিং","মা ও শিশু স্বাস্থ্য সেবা","ইপিআই টিকাদান কেন্দ্র","জরুরি রেফারাল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001106', '10001106', 'Erulia Union Health Sub Center', 'এরুলিয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'erulia-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Erulia', 'এরুলিয়া', 'Erulia Bazar, Bogura-Naogaon Road',
  'এরুলিয়া বাজার, বগুড়া-নওগাঁ সড়ক, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-458920"]'::jsonb, 'erulia@usc.dghs.gov.bd', 'http://eruliaup.bogra.gov.bd',
  24.856, 89.308, 'https://maps.google.com/?q=24.8560,89.3080', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসাসেবা","গর্ভকালীন সেবা (ANC)","প্রসবোত্তর সেবা (PNC)","টিকা প্রদান ও পুষ্টি সাপ্লিমেন্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001107', '10001107', 'Fapor Union Health Sub Center', 'ফাপোর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'fapor-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Fapor', 'ফাপোর', 'Fapor Bazar, Bogura Sadar',
  'ফাপোর বাজার, ফাপোর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-458920"]'::jsonb, 'fapor@usc.dghs.gov.bd', 'http://faporup.bogra.gov.bd',
  24.811, 89.362, 'https://maps.google.com/?q=24.8110,89.3620', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","মা ও শিশু স্বাস্থ্য সেবা","টিকা কেন্দ্র","বিনামূল্যে সরকারি ঔষধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001096', '10001096', 'Kundagram Union Health Sub Center', 'কুন্দগ্রাম ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'kundagram-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Kundagram', 'কুন্দগ্রাম', 'Kundagram Bazar, Adamdighi',
  'কুন্দগ্রাম বাজার, কুন্দগ্রাম ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620"]'::jsonb, 'kundagram@usc.dghs.gov.bd', 'http://kundagramup.bogra.gov.bd',
  24.734, 89.068, 'https://maps.google.com/?q=24.7340,89.0680', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা","গর্ভবতী মায়ের চেকআপ","ইপিআই নিয়মিত টিকাদান","পুষ্টি পরামর্শ ও সাধারণ ওষুধ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001097', '10001097', 'Champapur (Kanchanpur) Union Health Sub Center', 'চাঁপাপুর (কাঞ্চনপুর) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'champapur-kanchanpur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Champapur', 'চাঁপাপুর', 'Kanchanpur, Champapur',
  'কাঞ্চনপুর, চাঁপাপুর ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620"]'::jsonb, 'champapur@usc.dghs.gov.bd', 'http://champapurup.bogra.gov.bd',
  24.789, 89.008, 'https://maps.google.com/?q=24.7890,89.0080', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","মা ও শিশু পরিচর্যা","ইপিআই টিকাদান","জরুরি রেফারাল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001098', '10001098', 'Chhatiangram Union Health Sub Center', 'ছাতিয়ানগ্রাম ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'chhatiangram-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Chhatiangram', 'ছাতিয়ানগ্রাম', 'Chhatiangram Railgate Area',
  'ছাতিয়ানগ্রাম রেলগেট সংলগ্ন, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620"]'::jsonb, 'chhatiangram@usc.dghs.gov.bd', 'http://chhatiangramup.bogra.gov.bd',
  24.815, 88.986, 'https://maps.google.com/?q=24.8150,88.9860', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ","প্রসূতি সেবা","শিশু রোগ প্রতিরোধ ও টিকা","বিনামূল্যে ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001099', '10001099', 'Santahar Union Health Sub Center', 'সান্তাহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'santahar-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Santahar', 'সান্তাহার', 'Chhotoki, Santahar',
  'ছোটকি, সান্তাহার ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৫০', '["01730-324620"]'::jsonb, 'santahar@usc.dghs.gov.bd', 'http://santaharup.bogra.gov.bd',
  24.792, 88.971, 'https://maps.google.com/?q=24.7920,88.9710', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ সেবা","প্রাথমিক স্বাস্থ্য পরামর্শ","মাতৃত্ব ও প্রসবকালীন সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001116', '10001116', 'Bhandarbari Union Health Sub Center', 'ভান্ডারবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'bhandarbari-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Bhandarbari', 'ভান্ডারবাড়ী', 'Bhandarbari Bazar, Jamuna Riverfront',
  'ভান্ডারবাড়ী বাজার, যমুনা তীরবর্তী এলাকা, ভান্ডারবাড়ী, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'bhandarbari@usc.dghs.gov.bd', 'http://bhandarbariup.bogra.gov.bd',
  24.632, 89.601, 'https://maps.google.com/?q=24.6320,89.6010', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চলের জরুরি প্রাথমিক চিকিৎসা","বন্যা কালীন জরুরি সেবা","প্রসূতি ও মা-শিশু স্বাস্থ্য","নিয়মিত ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001118', '10001118', 'Gopalnagar (Chhikar) Union Health Sub Center', 'গোপালনগর (ছিকর) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'gopalnagar-chhikar-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Gopalnagar', 'গোপালনগর', 'Chhikar, Gopalnagar',
  'ছিকর, গোপালনগর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'gopalnagar@usc.dghs.gov.bd', 'http://gopalnagarup.bogra.gov.bd',
  24.664, 89.589, 'https://maps.google.com/?q=24.6640,89.5890', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","মা ও শিশু পরিচর্যা","টিকা কেন্দ্র","জরুরি রেফারাল সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001119', '10001119', 'Mathurapur Union Health Sub Center', 'মথুরাপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'mathurapur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Mathurapur', 'মথুরাপুর', 'Mathurapur Bazar, Dhunat',
  'মথুরাপুর বাজার, মথুরাপুর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'mathurapur@usc.dghs.gov.bd', 'http://mathurapurup.bogra.gov.bd',
  24.652, 89.478, 'https://maps.google.com/?q=24.6520,89.4780', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ স্বাস্থ্যসেবা","গর্ভবতী মায়ের পুষ্টি ও চেকআপ","ইপিআই নিয়মিত টিকাদান","সরকারি ওষুধ সরবরাহ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001120', '10001120', 'Elangi Union Health Sub Center', 'এলাঙ্গী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'elangi-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Elangi', 'এলাঙ্গী', 'Elangi Bazar, Dhunat',
  'এলাঙ্গী বাজার, এলাঙ্গী ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'elangi@usc.dghs.gov.bd', 'http://elangiup.bogra.gov.bd',
  24.718, 89.512, 'https://maps.google.com/?q=24.7180,89.5120', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ প্রাথমিক চিকিৎসা","মা ও শিশু স্বাস্থ্য সেবা","টিকাদান ও ইপিআই প্রোগ্রাম","স্বাস্থ্য শিক্ষা ও পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001121', '10001121', 'Gunahar Union Health Sub Center', 'গুণাহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'gunahar-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Gunahar', 'গুণাহার', 'Gunahar Talukdar Bari Road, Dupchanchia',
  'গুণাহার তালুকদার বাড়ি সড়ক, গুণাহার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'gunahar@usc.dghs.gov.bd', 'http://gunaharup.bogra.gov.bd',
  24.851, 89.143, 'https://maps.google.com/?q=24.8510,89.1430', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ চিকিৎসাসেবা","জরুরি ফার্স্ট এইড ও ড্রেসিং","প্রসূতি ও শিশু স্বাস্থ্য","ইপিআই সম্প্রসারিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001125', '10001125', 'Talora Union Health Sub Center', 'তালোড়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'talora-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Talora', 'তালোড়া', 'Talora Railway Bazar, Dupchanchia',
  'তালোড়া রেলওয়ে বাজার, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'talora@usc.dghs.gov.bd', 'http://taloraup.bogra.gov.bd',
  24.832, 89.182, 'https://maps.google.com/?q=24.8320,89.1820', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","মাতৃত্ব ও প্রসবকালীন সেবা","শিশু রোগ প্রতিরোধ ও টিকা","বিনামূল্যে সরকারি ঔষধ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001126', '10001126', 'Gobindapur Union Health Sub Center', 'গোবিন্দপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'gobindapur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Gobindapur', 'গোবিন্দপুর', 'Gobindapur Bazar, Dupchanchia',
  'গোবিন্দপুর বাজার, গোবিন্দপুর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'gobindapur@usc.dghs.gov.bd', 'http://gobindapurup.bogra.gov.bd',
  24.912, 89.151, 'https://maps.google.com/?q=24.9120,89.1510', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ স্বাস্থ্যসেবা","গর্ভবতী চেকআপ","ইপিআই নিয়মিত টিকাদান","জরুরি রেফারাল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001127', '10001127', 'Chamrul Union Health Sub Center', 'চামরুল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'chamrul-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Chamrul', 'চামরুল', 'Chamrul Bazar, Dupchanchia',
  'চামরুল বাজার, চামরুল ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'chamrul@usc.dghs.gov.bd', 'http://chamrulup.bogra.gov.bd',
  24.896, 89.208, 'https://maps.google.com/?q=24.8960,89.2080', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা","মা ও শিশু পরিচর্যা","ইপিআই টিকাদান কেন্দ্র","ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001123', '10001123', 'Rameshwarpur Union Health Sub Center', 'রামেশ্বরপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'rameshwarpur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Rameshwarpur', 'রামেশ্বরপুর', 'Rameshwarpur Bazar, Gabtali',
  'রামেশ্বরপুর বাজার, রামেশ্বরপুর ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'rameshwarpur@usc.dghs.gov.bd', 'http://rameshwarpurup.bogra.gov.bd',
  24.842, 89.551, 'https://maps.google.com/?q=24.8420,89.5510', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","প্রসূতি ও শিশু স্বাস্থ্য সেবা","নিয়মিত টিকাদান","বিনামূল্যে প্রয়োজনীয় ঔষধ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001124', '10001124', 'Sonaray Union Health Sub Center', 'সোনারায় ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'sonaray-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Sonaray', 'সোনারায়', 'Sonaray Bazar, Gabtali',
  'সোনারায় বাজার, সোনারায় ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'sonaray@usc.dghs.gov.bd', 'http://sonarayup.bogra.gov.bd',
  24.925, 89.472, 'https://maps.google.com/?q=24.9250,89.4720', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ চিকিৎসাসেবা","গর্ভবতী চেকআপ ও পরামর্শ","ইপিআই নিয়মিত টিকাদান","জরুরি রেফারাল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001129', '10001129', 'Durgahata Union Health Sub Center', 'দূর্গাহাটা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'durgahata-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Durgahata', 'দূর্গাহাটা', 'Durgahata Bazar, Gabtali',
  'দূর্গাহাটা বাজার, দূর্গাহাটা ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'durgahata@usc.dghs.gov.bd', 'http://durgahataup.bogra.gov.bd',
  24.841, 89.498, 'https://maps.google.com/?q=24.8410,89.4980', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ প্রাথমিক চিকিৎসা","মা ও শিশু পরিচর্যা","ইপিআই টিকাদান কেন্দ্র","সরকারি ওষুধ সরবরাহ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001130', '10001130', 'Sukhanpukur Union Health Sub Center', 'সুখানপুকুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'sukhanpukur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Sukhanpukur', 'সুখানপুকুর', 'Sukhanpukur Railway Station Road',
  'সুখানপুকুর রেল স্টেশন সড়ক, সুখানপুকুর, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'sukhanpukur@usc.dghs.gov.bd', 'http://sukhanpukurup.bogra.gov.bd',
  24.942, 89.508, 'https://maps.google.com/?q=24.9420,89.5080', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ চিকিৎসাসেবা","জরুরি ফার্স্ট এইড","মাতৃত্ব ও নবজাতক স্বাস্থ্য","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001131', '10001131', 'Pilkunja Union Health Sub Center', 'পিলকুঞ্জ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'pilkunja-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Murail', 'মুরইল', 'Pilkunja, Murail Union, Kahaloo',
  'পিলকুঞ্জ, মুরইল ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'pilkunja@usc.dghs.gov.bd', 'http://murailup.bogra.gov.bd',
  24.811, 89.278, 'https://maps.google.com/?q=24.8110,89.2780', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ প্রাথমিক চিকিৎসা","গর্ভবতী মায়ের সেবা","ইপিআই নিয়মিত টিকাদান","বিনামূল্যে ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001132', '10001132', 'Malancha Union Health Sub Center', 'মালঞ্চা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'malancha-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Malancha', 'মালঞ্চা', 'Malancha Bazar, Kahaloo',
  'মালঞ্চা বাজার, মালঞ্চা ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'malancha@usc.dghs.gov.bd', 'http://malanchaup.bogra.gov.bd',
  24.789, 89.231, 'https://maps.google.com/?q=24.7890,89.2310', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ চিকিৎসাসেবা","প্রসূতি ও শিশু স্বাস্থ্য","টিকা কেন্দ্র","সরকারি ওষুধ সরবরাহ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001133', '10001133', 'Narhatta Union Health Sub Center', 'নারহট্ট ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'narhatta-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Narahatta', 'নারহট্ট', 'Narhatta Bazar, Kahaloo',
  'নারহট্ট বাজার, নারহট্ট ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'narhatta@usc.dghs.gov.bd', 'http://narhattaup.bogra.gov.bd',
  24.756, 89.254, 'https://maps.google.com/?q=24.7560,89.2540', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ স্বাস্থ্যসেবা","মাতৃত্ব ও প্রসবকালীন সেবা","ইপিআই নিয়মিত টিকাদান","জরুরি রেফারাল সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001134', '10001134', 'Durgapur (Paikar) Union Health Sub Center', 'দুর্গাপুর (পাইকড়) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'durgapur-paikar-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Paikar', 'পাইকড়', 'Durgapur, Paikar, Kahaloo',
  'দুর্গাপুর, পাইকড় ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'durgapur_kahalu@usc.dghs.gov.bd', 'http://paikarup.bogra.gov.bd',
  24.864, 89.252, 'https://maps.google.com/?q=24.8640,89.2520', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ সেবা","মা ও শিশু পরিচর্যা","ইপিআই টিকাদান কেন্দ্র","বিনামূল্যে ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001136', '10001136', 'Thalta Majhgram (Basho) Union Health Sub Center', 'থালতা মাঝগ্রাম (বাশো) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'thalta-majhgram-basho-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Thalta Majhgram', 'থালতা মাঝগ্রাম', 'Basho, Thalta Majhgram',
  'বাশো, থালতা মাঝগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'thaltamajhgram@usc.dghs.gov.bd', 'http://thaltamajhgramup.bogra.gov.bd',
  24.621, 89.189, 'https://maps.google.com/?q=24.6210,89.1890', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা সেবা","গর্ভবতী মায়ের চেকআপ","ইপিআই নিয়মিত টিকাদান","ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001137', '10001137', 'Burail Union Health Sub Center', 'বুড়ইল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'burail-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Burail', 'বুড়ইল', 'Burail Bazar, Nandigram',
  'বুড়ইল বাজার, বুড়ইল ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'burail@usc.dghs.gov.bd', 'http://burailup.bogra.gov.bd',
  24.712, 89.262, 'https://maps.google.com/?q=24.7120,89.2620', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ চিকিৎসাসেবা","প্রসূতি ও শিশু স্বাস্থ্য","ইপিআই সম্প্রসারিত টিকাদান","জরুরি রেফারাল সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001138', '10001138', 'Bhatra Union Health Sub Center', 'ভাটরা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'bhatra-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Bhatra', 'ভাটরা', 'Bhatra Bazar, Nandigram',
  'ভাটরা বাজার, ভাটরা ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'bhatra@usc.dghs.gov.bd', 'http://bhatraup.bogra.gov.bd',
  24.654, 89.156, 'https://maps.google.com/?q=24.6540,89.1560', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ প্রাথমিক চিকিৎসা","মা ও শিশু পরিচর্যা","টিকা প্রদান","বিনামূল্যে সরকারি ঔষধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001139', '10001139', 'Nandigram Sadar Union Health Sub Center', 'নন্দীগ্রাম সদর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'nandigram-sadar-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Union', 'নন্দীগ্রাম ইউনিয়ন', 'Omarpur, Nandigram',
  'ওমরপুর, নন্দীগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'nandigram_union@usc.dghs.gov.bd', 'http://nandigramup.bogra.gov.bd',
  24.698, 89.215, 'https://maps.google.com/?q=24.6980,89.2150', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ সেবা","মাতৃত্ব ও প্রসবকালীন সেবা","ইপিআই নিয়মিত টিকাদান","জরুরি রেফারাল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001141', '10001141', 'Hatfulbari Union Health Sub Center', 'হাটফুলবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'hatfulbari-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Fulbari', 'ফুলবাড়ী', 'Hatfulbari Bazar, Sariakandi',
  'হাটফুলবাড়ী বাজার, ফুলবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'hatfulbari@usc.dghs.gov.bd', 'http://fulbariup.bogra.gov.bd',
  24.912, 89.589, 'https://maps.google.com/?q=24.9120,89.5890', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","বন্যাপ্রবণ এলাকার জরুরি চিকিৎসা","মা ও শিশু পরিচর্যা","ইপিআই টিকাদান ও পুষ্টি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001142', '10001142', 'Hatsherpur Union Health Sub Center', 'হাটশেরপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'hatsherpur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Hatsherpur', 'হাটশেরপুর', 'Hatsherpur Bazar, Sariakandi',
  'হাটশেরপুর বাজার, হাটশেরপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'hatsherpur@usc.dghs.gov.bd', 'http://hatsherpurup.bogra.gov.bd',
  24.954, 89.574, 'https://maps.google.com/?q=24.9540,89.5740', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্যসেবা","গর্ভবতী মা ও নবজাতক পরিচর্যা","ইপিআই নিয়মিত টিকাদান","সরকারি ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001144', '10001144', 'Jorgacha (Bhelabari) Union Health Sub Center', 'জোড়গাছা (ভেলাবাড়ী) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'jorgacha-bhelabari-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Bhelabari', 'ভেলাবাড়ী', 'Jorgacha, Bhelabari, Sariakandi',
  'জোড়গাছা, ভেলাবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'jorgacha_bhelabari@usc.dghs.gov.bd', 'http://bhelabariup.bogra.gov.bd',
  24.935, 89.612, 'https://maps.google.com/?q=24.9350,89.6120', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ","মা ও শিশু স্বাস্থ্য সেবা","টিকা কেন্দ্র","জরুরি রেফারাল সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001145', '10001145', 'Nawkhila (Chandanbaisha) Union Health Sub Center', 'নাওখিলা (চন্দনবাইশা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'nawkhila-chandanbaisha-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Chandanbaisha', 'চন্দনবাইশা', 'Nawkhila, Chandanbaisha Embankment',
  'নাওখিলা, চন্দনবাইশা বাঁধ এলাকা, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'nawkhila@usc.dghs.gov.bd', 'http://chandanbaishaup.bogra.gov.bd',
  24.842, 89.654, 'https://maps.google.com/?q=24.8420,89.6540', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["যমুনা চরাঞ্চলের জরুরি স্বাস্থ্যসেবা","গর্ভবতী মায়ের চেকআপ","ইপিআই নিয়মিত টিকাদান","বিনামূল্যে জরুরি ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001146', '10001146', 'Aria Union Health Sub Center', 'আড়িয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'aria-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Aria', 'আড়িয়া', 'Aria Bazar, Dhaka-Bogura Highway',
  'আড়িয়া বাজার, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'aria@usc.dghs.gov.bd', 'http://ariaup.bogra.gov.bd',
  24.789, 89.384, 'https://maps.google.com/?q=24.7890,89.3840', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ","হাইওয়ে দুর্ঘটনা প্রাথমিক ড্রেসিং","মা ও শিশু পরিচর্যা","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001148', '10001148', 'Madla Union Health Sub Center', 'মাদলা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'madla-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Madla', 'মাদলা', 'Madla Bazar, Shajahanpur',
  'মাদলা বাজার, মাদলা ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'madla@usc.dghs.gov.bd', 'http://madlaup.bogra.gov.bd',
  24.782, 89.412, 'https://maps.google.com/?q=24.7820,89.4120', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্যসেবা","গর্ভবতী চেকআপ","ইপিআই সম্প্রসারিত টিকাদান","বিনামূল্যে সরকারি ঔষধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001149', '10001149', 'Gohail Union Health Sub Center', 'গোহাইল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'gohail-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Gohail', 'গোহাইল', 'Gohail Bazar, Shajahanpur',
  'গোহাইল বাজার, গোহাইল ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'gohail@usc.dghs.gov.bd', 'http://gohailup.bogra.gov.bd',
  24.715, 89.318, 'https://maps.google.com/?q=24.7150,89.3180', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ","প্রসূতি ও শিশু স্বাস্থ্য সেবা","ইপিআই টিকাদান কেন্দ্র","জরুরি রেফারাল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001150', '10001150', 'Amrool Union Health Sub Center', 'আমরুল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'amrool-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Amrool', 'আমরুল', 'Demajani Bazar, Amrool',
  'ডেমাজানী বাজার, আমরুল ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'amrool@usc.dghs.gov.bd', 'http://amroolup.bogra.gov.bd',
  24.712, 89.412, 'https://maps.google.com/?q=24.7120,89.4120', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ প্রাথমিক চিকিৎসা","মা ও শিশু পরিচর্যা","টিকা কেন্দ্র","বিনামূল্যে সরকারি ঔষধ সরবরাহ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001151', '10001151', 'Bhabanipur Union Health Sub Center', 'ভবানীপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'bhabanipur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Bhabanipur', 'ভবানীপুর', 'Bhabanipur Shaktipitha Road',
  'ভবানীপুর বাজার ও শক্তিপীঠ সড়ক, ভবানীপুর, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647","05029-77047"]'::jsonb, 'bhabanipur@usc.dghs.gov.bd', 'http://bhabanipurup.bogra.gov.bd',
  24.602, 89.458, 'https://maps.google.com/?q=24.6020,89.4580', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ","প্রসূতি ও শিশু স্বাস্থ্য সেবা","ইপিআই নিয়মিত টিকাদান","জরুরি রেফারাল সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001152', '10001152', 'Shimabari Union Health Sub Center', 'সীমাবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'shimabari-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Shimabari', 'সীমাবাড়ী', 'Shimabari Bazar, Dhaka-Bogura Highway',
  'সীমাবাড়ী বাজার, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647","05029-77047"]'::jsonb, 'shimabari@usc.dghs.gov.bd', 'http://shimabariup.bogra.gov.bd',
  24.598, 89.489, 'https://maps.google.com/?q=24.5980,89.4890', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মহাসড়ক সংলগ্ন জরুরি ট্রমা ড্রেসিং","সাধারণ বহির্বিভাগ","মা ও শিশু পরিচর্যা","ইপিআই টিকাদান কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001153', '10001153', 'Mirzapur Union Health Sub Center', 'মির্জাপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'mirzapur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Mirzapur', 'মির্জাপুর', 'Mirzapur Bazar, Sherpur',
  'মির্জাপুর বাজার, মির্জাপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647"]'::jsonb, 'mirzapur@usc.dghs.gov.bd', 'http://mirzapurup.bogra.gov.bd',
  24.715, 89.418, 'https://maps.google.com/?q=24.7150,89.4180', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ প্রাথমিক চিকিৎসা","গর্ভবতী মা ও নবজাতক সেবা","ইপিআই নিয়মিত টিকাদান","সরকারি ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001154', '10001154', 'Garidaha Union Health Sub Center', 'গাড়ীদহ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'garidaha-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Garidaha', 'গাড়ীদহ', 'Kalsimati, RDA Road, Garidaha',
  'কালসীমটি, আরডিএ সংলগ্ন, গাড়ীদহ, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647"]'::jsonb, 'garidaha@usc.dghs.gov.bd', 'http://garidahaup.bogra.gov.bd',
  24.708, 89.395, 'https://maps.google.com/?q=24.7080,89.3950', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বহির্বিভাগ চিকিৎসাসেবা","মাতৃত্ব ও প্রসবকালীন সেবা","টিকা কেন্দ্র","বিনামূল্যে সরকারি ঔষধ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001155', '10001155', 'Mokamtala Union Health Sub Center', 'মোকামতলা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'mokamtala-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Mokamtala', 'মোকামতলা', 'Mokamtala Bazar, Rangpur Highway',
  'মোকামতলা বাজার, রংপুর মহাসড়ক সংলগ্ন, মোকামতলা, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628","05033-69018"]'::jsonb, 'mokamtala@usc.dghs.gov.bd', 'http://mokamtalaup.bogra.gov.bd',
  24.998, 89.345, 'https://maps.google.com/?q=24.9980,89.3450', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মহাসড়ক সংলগ্ন জরুরি ট্রমা ড্রেসিং","সাধারণ বহির্বিভাগ সেবা","প্রসূতি ও শিশু স্বাস্থ্য","ইপিআই নিয়মিত টিকাদান","জরুরি রেফারাল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001157', '10001157', 'Buriganj Union Health Sub Center', 'বুড়িগঞ্জ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'buriganj-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Buriganj', 'বুড়িগঞ্জ', 'Buriganj Bazar, Shibganj',
  'বুড়িগঞ্জ বাজার, বুড়িগঞ্জ ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'buriganj@usc.dghs.gov.bd', 'http://buriganjup.bogra.gov.bd',
  24.956, 89.284, 'https://maps.google.com/?q=24.9560,89.2840', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ স্বাস্থ্যসেবা","গর্ভবতী মায়ের চেকআপ","ইপিআই সম্প্রসারিত টিকাদান","সরকারি ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001158', '10001158', 'Deuli Union Health Sub Center', 'দেউলী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'deuli-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Deuli', 'দেউলী', 'Deuli Bazar, Shibganj',
  'দেউলী বাজার, দেউলী ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'deuli@usc.dghs.gov.bd', 'http://deuliup.bogra.gov.bd',
  25.041, 89.312, 'https://maps.google.com/?q=25.0410,89.3120', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","মা ও শিশু পরিচর্যা","টিকা কেন্দ্র","বিনামূল্যে প্রয়োজনীয় ঔষধ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001160', '10001160', 'Bihar Union Health Sub Center', 'বিহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'bihar-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Bihar', 'বিহার', 'Bihar Bazar, Near Vasu Vihara',
  'বিহার বাজার, ভাসু বিহার সংলগ্ন, বিহার, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'bihar@usc.dghs.gov.bd', 'http://biharup.bogra.gov.bd',
  24.975, 89.348, 'https://maps.google.com/?q=24.9750,89.3480', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["ঐতিহাসিক জনপদের সাধারণ স্বাস্থ্যসেবা","প্রসূতি ও শিশু স্বাস্থ্য","ইপিআই নিয়মিত টিকাদান","ওষুধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001161', '10001161', 'Digdair Union Health Sub Center', 'দিগদাইড় ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'digdair-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Digdair', 'দিগদাইড়', 'Digdair Bazar, Sonatala',
  'দিগদাইড় বাজার, দিগদাইড় ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'digdair@usc.dghs.gov.bd', 'http://digdairup.bogra.gov.bd',
  25.038, 89.475, 'https://maps.google.com/?q=25.0380,89.4750', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ প্রাথমিক চিকিৎসা","গর্ভবতী মা ও নবজাতক সেবা","ইপিআই নিয়মিত টিকাদান","সরকারি ওষুধ সরবরাহ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001162', '10001162', 'Madhupur Union Health Sub Center', 'মধুপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'madhupur-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Madhupur', 'মধুপুর', 'Madhupur Bazar, Sonatala',
  'মধুপুর বাজার, মধুপুর ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'madhupur@usc.dghs.gov.bd', 'http://madhupurup.bogra.gov.bd',
  25.056, 89.512, 'https://maps.google.com/?q=25.0560,89.5120', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসা","মা ও শিশু পরিচর্যা","ইপিআই টিকাদান কেন্দ্র","জরুরি রেফারাল সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001163', '10001163', 'Pakulla Union Health Sub Center', 'পাকুল্লা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'pakulla-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Pakulla', 'পাকুল্লা', 'Pakulla Bazar, Jamuna Riverfront',
  'পাকুল্লা বাজার, যমুনা নদী সংলগ্ন এলাকা, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'pakulla@usc.dghs.gov.bd', 'http://pakullaup.bogra.gov.bd',
  25.015, 89.562, 'https://maps.google.com/?q=25.0150,89.5620', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["যমুনা চরাঞ্চলের জরুরি স্বাস্থ্যসেবা","বন্যা প্রতিরোধ প্রাথমিক চিকিৎসা","মা ও শিশু স্বাস্থ্য পরিচর্যা","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-10001164', '10001164', 'Balua Union Health Sub Center', 'বালুয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
  'balua-union-health-sub-center', 'Union Health Sub-Centre', 'union_health_sub_centre',
  'Union Health Sub Centre', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Balua', 'বালুয়া', 'Balua Hat, Sonatala',
  'বালুয়া হাট, বালুয়া ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'balua@usc.dghs.gov.bd', 'http://baluaup.bogra.gov.bd',
  24.978, 89.498, 'https://maps.google.com/?q=24.9780,89.4980', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ বহির্বিভাগ চিকিৎসাসেবা","প্রসূতি ও মা-শিশু স্বাস্থ্য","ইপিআই সম্প্রসারিত টিকাদান","বিনামূল্যে সরকারি ঔষধ বিতরণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-19'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001201', '10001201', 'Sabgram Union Health & Family Welfare Centre', 'সাবগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'sabgram-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Sabgram', 'সাবগ্রাম', 'Sabgram Bazar Road',
  'সাবগ্রাম বাজার সংলগ্ন, সাবগ্রাম ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["01715-632145","051-66550"]'::jsonb, 'sabgram@fwc.dgfp.gov.bd', 'http://sabgramup.bogra.gov.bd',
  24.8361, 89.4052, 'https://maps.google.com/?q=24.8361,89.4052', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি ও গর্ভকালীন সেবা (ANC)","স্বাভাবিক প্রসব সেবা (২৪/৭ ডেলিভারি)","প্রসবোত্তর সেবা (PNC)","পরিবার পরিকল্পনা পদ্ধতি ও কাউন্সেলিং","কৈশোরকালীন স্বাস্থ্য কর্নার","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001202', '10001202', 'Shakpala (Rajapur) Union Health & Family Welfare Centre', 'শাকপালা (রাজাপুর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'shakpala-rajapur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Rajapur', 'রাজাপুর', 'Shakpala, Rajapur',
  'শাকপালা, রাজাপুর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-458920"]'::jsonb, 'rajapur@fwc.dgfp.gov.bd', 'http://rajapurup.bogra.gov.bd',
  24.8214, 89.3495, 'https://maps.google.com/?q=24.8214,89.3495', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা পরামর্শ","ইপিআই নিয়মিত টিকাদান","কৈশোরকালীন স্বাস্থ্য সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001203', '10001203', 'Sekherkola Union Health & Family Welfare Centre', 'শেখেরকোলা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'sekherkola-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Sekherkola', 'শেখেরকোলা', 'Sekherkola Bazar',
  'শেখেরকোলা বাজার সংলগ্ন, শেখেরকোলা ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-458920"]'::jsonb, 'sekherkola@fwc.dgfp.gov.bd', 'http://sekherkolaup.bogra.gov.bd',
  24.9085, 89.3892, 'https://maps.google.com/?q=24.9085,89.3892', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভকালীন ও প্রসবোত্তর পরিচর্যা","২৪/৭ স্বাভাবিক প্রসব","সাধারণ রোগী চিকিৎসাসেবা","ইপিআই টিকাদান ও ভিটামিন এ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001204', '10001204', 'Baghopara (Gokul) Union Health & Family Welfare Centre', 'বাঘোপাড়া (গোকুল) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'baghopara-gokul-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Gokul', 'গোকুল', 'Baghopara, Rangpur Road',
  'বাঘোপাড়া, গোকুল ইউনিয়ন, বগুড়া-রংপুর মহাসড়ক, বগুড়া - ৫৮০০', '["01712-458920"]'::jsonb, 'gokul@fwc.dgfp.gov.bd', 'http://gokulup.bogra.gov.bd',
  24.8965, 89.3615, 'https://maps.google.com/?q=24.8965,89.3615', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা ও স্বাভাবিক প্রসব","গর্ভবতী মায়েদের পুষ্টি কাউন্সেলিং","পরিবার পরিকল্পনা পদ্ধতি সামগ্রী বিতরণ","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001205', '10001205', 'Erulia Union Health & Family Welfare Centre', 'এরুলিয়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'erulia-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Erulia', 'এরুলিয়া', 'Erulia Union Complex',
  'এরুলিয়া পরিষদ কমপ্লেক্স সংলগ্ন, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-458920"]'::jsonb, 'erulia@fwc.dgfp.gov.bd', 'http://eruliaup.bogra.gov.bd',
  24.8582, 89.3094, 'https://maps.google.com/?q=24.8582,89.3094', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভকালীন পরীক্ষা (ANC)","২৪ ঘণ্টা স্বাভাবিক ডেলিভারি","প্রসবোত্তর পরীক্ষা (PNC)","স্থায়ী ও অস্থায়ী পরিবার পরিকল্পনা সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001206', '10001206', 'Fapor Union Health & Family Welfare Centre', 'ফাপোর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'fapor-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Fapor', 'ফাপোর', 'Fapor West Para',
  'ফাপোর পশ্চিমপাড়া, ফাপোর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-458920"]'::jsonb, 'fapor@fwc.dgfp.gov.bd', 'http://faporup.bogra.gov.bd',
  24.8192, 89.3621, 'https://maps.google.com/?q=24.8192,89.3621', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","পরিবার পরিকল্পনা পরামর্শ","কৈশোরকালীন সেবা কর্নার","ইপিআই টিকাদান কার্যক্রম"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001207', '10001207', 'Nasratpur Union Health & Family Welfare Centre', 'নসরতপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'nasratpur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Nasratpur', 'নসরতপুর', 'Nasratpur Railway Station Bazar',
  'নসরতপুর রেলওয়ে স্টেশন সংলগ্ন, নসরতপুর, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620"]'::jsonb, 'nasratpur@fwc.dgfp.gov.bd', 'http://nasratpurup.bogra.gov.bd',
  24.7985, 89.0285, 'https://maps.google.com/?q=24.7985,89.0285', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ স্বাভাবিক প্রসব","গর্ভকালীন যত্ন (ANC)","প্রসবোত্তর যত্ন (PNC)","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001208', '10001208', 'Adamdighi Sadar Union Health & Family Welfare Centre', 'আদমদীঘি সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'adamdighi-sadar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Adamdighi Sadar', 'আদমদীঘি সদর', 'Adamdighi Old Hospital Road',
  'পুরাতন হাসপাতাল রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620"]'::jsonb, 'adamdighi_sadar@fwc.dgfp.gov.bd', 'http://adamdighisadarup.bogra.gov.bd',
  24.7745, 89.0415, 'https://maps.google.com/?q=24.7745,89.0415', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","পরিবার পরিকল্পনা পদ্ধতি ও কাউন্সেলিং","কৈশোর কর্নার","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001209', '10001209', 'Champapur Union Health & Family Welfare Centre', 'চাঁপাপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'champapur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Champapur', 'চাঁপাপুর', 'Champapur Bazar',
  'চাঁপাপুর বাজার, চাঁপাপুর ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620"]'::jsonb, 'champapur@fwc.dgfp.gov.bd', 'http://champapurup.bogra.gov.bd',
  24.7865, 89.0065, 'https://maps.google.com/?q=24.7865,89.0065', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী চেকআপ","স্বাভাবিক ডেলিভারি","পরিবার পরিকল্পনা পদ্ধতি","শিশু স্বাস্থ্য ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001210', '10001210', 'Chhatiangram Union Health & Family Welfare Centre', 'ছাতিয়ানগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'chhatiangram-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Chhatiangram', 'ছাতিয়ানগ্রাম', 'Chhatiangram Parishad Compound',
  'পরিষদ চত্বর, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620"]'::jsonb, 'chhatiangram@fwc.dgfp.gov.bd', 'http://chhatiangramup.bogra.gov.bd',
  24.8142, 88.9875, 'https://maps.google.com/?q=24.8142,88.9875', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","নরমাল ডেলিভারি","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001211', '10001211', 'Kundagram Union Health & Family Welfare Centre', 'কুন্দগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kundagram-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Kundagram', 'কুন্দগ্রাম', 'Kundagram High School Road',
  'কুন্দগ্রাম হাই স্কুল রোড, কুন্দগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০', '["01730-324620"]'::jsonb, 'kundagram@fwc.dgfp.gov.bd', 'http://kundagramup.bogra.gov.bd',
  24.7328, 89.0665, 'https://maps.google.com/?q=24.7328,89.0665', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা","মাতৃত্বকালীন পুষ্টি ও সেবা","পরিবার পরিকল্পনা ক্লিনিক","টিকা ও শিশুর যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001212', '10001212', 'Choukibari Union Health & Family Welfare Centre', 'চৌকিবাড়ি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'choukibari-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Choukibari', 'চৌকিবাড়ি', 'Choukibari Bazar',
  'চৌকিবাড়ি বাজার, চৌকিবাড়ি ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'choukibari@fwc.dgfp.gov.bd', 'http://choukibariup.bogra.gov.bd',
  24.6715, 89.5185, 'https://maps.google.com/?q=24.6715,89.5185', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা)","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকাদান কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001213', '10001213', 'Bererbari (Gopalnagar) Union Health & Family Welfare Centre', 'বেড়েরবাড়ি (গোপালনগর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'bererbari-gopalnagar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Gopalnagar', 'গোপালনগর', 'Bererbari, Gopalnagar',
  'বেড়েরবাড়ি, গোপালনগর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'gopalnagar@fwc.dgfp.gov.bd', 'http://gopalnagarup.bogra.gov.bd',
  24.6625, 89.5842, 'https://maps.google.com/?q=24.6625,89.5842', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001214', '10001214', 'Nimgachhi Union Health & Family Welfare Centre', 'নিমগাছি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'nimgachhi-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Nimgachhi', 'নিমগাছি', 'Nimgachhi Bazar',
  'নিমগাছি বাজার, নিমগাছি ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'nimgachhi@fwc.dgfp.gov.bd', 'http://nimgachhiup.bogra.gov.bd',
  24.7412, 89.5312, 'https://maps.google.com/?q=24.7412,89.5312', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা পদ্ধতি","শিশু রোগ প্রতিরোধ ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001215', '10001215', 'Kalerpara Union Health & Family Welfare Centre', 'কালেরপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kalerpara-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Kalerpara', 'কালেরপাড়া', 'Kalerpara Bazar',
  'কালেরপাড়া বাজার, কালেরপাড়া ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'kalerpara@fwc.dgfp.gov.bd', 'http://kalerparaup.bogra.gov.bd',
  24.7085, 89.5645, 'https://maps.google.com/?q=24.7085,89.5645', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী চেকআপ","নরমাল ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","টিকা ও শিশু স্বাস্থ্য"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001216', '10001216', 'Elangi Union Health & Family Welfare Centre', 'এলাঙ্গী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'elangi-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Elangi', 'এলাঙ্গী', 'Elangi High School Road',
  'এলাঙ্গী হাই স্কুল রোড, এলাঙ্গী ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'elangi@fwc.dgfp.gov.bd', 'http://elangiup.bogra.gov.bd',
  24.7175, 89.5115, 'https://maps.google.com/?q=24.7175,89.5115', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001217', '10001217', 'Mathurapur Union Health & Family Welfare Centre', 'মথুরাপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'mathurapur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Mathurapur', 'মথুরাপুর', 'Mathurapur Old Bazar',
  'মথুরাপুর পুরাতন বাজার, মথুরাপুর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621"]'::jsonb, 'mathurapur@fwc.dgfp.gov.bd', 'http://mathurapurup.bogra.gov.bd',
  24.6515, 89.4775, 'https://maps.google.com/?q=24.6515,89.4775', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভকালীন যত্ন","স্বাভাবিক ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","শিশু স্বাস্থ্য সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001218', '10001218', 'Zianagar Union Health & Family Welfare Centre', 'জিয়ানগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'zianagar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Zianagar', 'জিয়ানগর', 'Zianagar Bazar',
  'জিয়ানগর বাজার, জিয়ানগর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'zianagar@fwc.dgfp.gov.bd', 'http://zianagarup.bogra.gov.bd',
  24.8725, 89.1125, 'https://maps.google.com/?q=24.8725,89.1125', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001219', '10001219', 'Dupchanchia Sadar Union Health & Family Welfare Centre', 'দুপচাঁচিয়া সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'dupchanchia-sadar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dupchanchia Sadar', 'দুপচাঁচিয়া সদর', 'Khatakhali, Dupchanchia',
  'খাঁতাখালী, দুপচাঁচিয়া সদর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'dupchanchia_sadar@fwc.dgfp.gov.bd', 'http://dupchanchiasadarup.bogra.gov.bd',
  24.8812, 89.1712, 'https://maps.google.com/?q=24.8812,89.1712', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","পরিবার পরিকল্পনা কাউন্সেলিং","কৈশোর কর্নার","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001220', '10001220', 'Gunahar Union Health & Family Welfare Centre', 'গুণাহার ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'gunahar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Gunahar', 'গুণাহার', 'Gunahar Bazar',
  'গুণাহার বাজার, গুণাহার ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'gunahar@fwc.dgfp.gov.bd', 'http://gunaharup.bogra.gov.bd',
  24.8525, 89.1415, 'https://maps.google.com/?q=24.8525,89.1415', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা","গর্ভকালীন যত্ন","পরিবার পরিকল্পনা পদ্ধতি","শিশু স্বাস্থ্য ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001221', '10001221', 'Gobindapur Union Health & Family Welfare Centre', 'গোবিন্দপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'gobindapur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Gobindapur', 'গোবিন্দপুর', 'Gobindapur Parishad Area',
  'পরিষদ চত্বর, গোবিন্দপুর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'gobindapur@fwc.dgfp.gov.bd', 'http://gobindapurup.bogra.gov.bd',
  24.9135, 89.1525, 'https://maps.google.com/?q=24.9135,89.1525', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","নরমাল ডেলিভারি","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001222', '10001222', 'Chamrul Union Health & Family Welfare Centre', 'চামরুল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'chamrul-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Chamrul', 'চামরুল', 'Chamrul School Road',
  'চামরুল স্কুল রোড, চামরুল ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324622"]'::jsonb, 'chamrul@fwc.dgfp.gov.bd', 'http://chamrulup.bogra.gov.bd',
  24.8975, 89.2065, 'https://maps.google.com/?q=24.8975,89.2065', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা","মাতৃত্বকালীন পুষ্টি ও সেবা","পরিবার পরিকল্পনা পদ্ধতি","টিকা ও শিশুর যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://dupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001223', '10001223', 'Agunatirhat Union Health & Family Welfare Centre', 'আগুনাথিরহাট ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'agunatirhat-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Naruamala', 'নারুয়ামালা', 'Agunatirhat Bazar',
  'আগুনাথিরহাট বাজার, নারুয়ামালা ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'naruamala@fwc.dgfp.gov.bd', 'http://naruamalaup.bogra.gov.bd',
  24.9142, 89.5215, 'https://maps.google.com/?q=24.9142,89.5215', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা)","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001224', '10001224', 'Balia Dighi (Kolakopa) Union Health & Family Welfare Centre', 'বালিয়া দিঘী (কোলাকোপা) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'balia-dighi-kolakopa-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Balia Dighi', 'বালিয়া দিঘী', 'Kolakopa, Balia Dighi',
  'কোলাকোপা, বালিয়া দিঘী ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'baliadighi@fwc.dgfp.gov.bd', 'http://baliadighiup.bogra.gov.bd',
  24.8715, 89.5342, 'https://maps.google.com/?q=24.8715,89.5342', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001225', '10001225', 'Kagail Union Health & Family Welfare Centre', 'কাগইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kagail-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Kagail', 'কাগইল', 'Kagail Bazar',
  'কাগইল বাজার, কাগইল ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'kagail@fwc.dgfp.gov.bd', 'http://kagailup.bogra.gov.bd',
  24.9312, 89.4525, 'https://maps.google.com/?q=24.9312,89.4525', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা পদ্ধতি","শিশু রোগ প্রতিরোধ ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001226', '10001226', 'Nasipur Union Health & Family Welfare Centre', 'নাসিপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'nasipur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Nasipur', 'নাসিপুর', 'Nasipur Bazar',
  'নাসিপুর বাজার, নাসিপুর ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'nasipur@fwc.dgfp.gov.bd', 'http://nasipurup.bogra.gov.bd',
  24.8785, 89.4412, 'https://maps.google.com/?q=24.8785,89.4412', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী চেকআপ","নরমাল ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","টিকা ও শিশু স্বাস্থ্য"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001227', '10001227', 'Nepaltali Union Health & Family Welfare Centre', 'নেপালতলী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'nepaltali-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Nepaltali', 'নেপালতলী', 'Nepaltali Bazar',
  'নেপালতলী বাজার, নেপালতলী ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'nepaltali@fwc.dgfp.gov.bd', 'http://nepaltaliup.bogra.gov.bd',
  24.8615, 89.5125, 'https://maps.google.com/?q=24.8615,89.5125', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001228', '10001228', 'Mahishaban Union Health & Family Welfare Centre', 'মহিষাবান ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'mahishaban-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Mahishaban', 'মহিষাবান', 'Pora Daho Mela Area',
  'পোড়াদহ সংলগ্ন, মহিষাবান ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623"]'::jsonb, 'mahishaban@fwc.dgfp.gov.bd', 'http://mahishabanup.bogra.gov.bd',
  24.8912, 89.4715, 'https://maps.google.com/?q=24.8912,89.4715', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভকালীন যত্ন","স্বাভাবিক ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","শিশু স্বাস্থ্য সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001229', '10001229', 'Murail Union Health & Family Welfare Centre', 'মুরইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'murail-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Murail', 'মুরইল', 'Murail Bazar, Highway Road',
  'মুরইল বাজার সংলগ্ন, মুরইল ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'murail@fwc.dgfp.gov.bd', 'http://murailup.bogra.gov.bd',
  24.8125, 89.2792, 'https://maps.google.com/?q=24.8125,89.2792', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001230', '10001230', 'Kalai Majhpara Union Health & Family Welfare Centre', 'কালাই মাঝপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kalai-majhpara-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kalai Majhpara', 'কালাই মাঝপাড়া', 'Majhpara Bazar',
  'মাঝপাড়া বাজার, কালাই মাঝপাড়া ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'kalai_majhpara@fwc.dgfp.gov.bd', 'http://kalaimajhparaup.bogra.gov.bd',
  24.8315, 89.2145, 'https://maps.google.com/?q=24.8315,89.2145', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","পরিবার পরিকল্পনা পদ্ধতি","কৈশোর কর্নার","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001231', '10001231', 'Jamgaon Union Health & Family Welfare Centre', 'জামগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'jamgaon-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Jamgaon', 'জামগ্রাম', 'Jamgaon Bazar',
  'জামগ্রাম বাজার, জামগ্রাম ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'jamgaon@fwc.dgfp.gov.bd', 'http://jamgaonup.bogra.gov.bd',
  24.8712, 89.2185, 'https://maps.google.com/?q=24.8712,89.2185', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা","গর্ভকালীন যত্ন","পরিবার পরিকল্পনা পদ্ধতি","শিশু স্বাস্থ্য ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001232', '10001232', 'Aghor (Malancha) Union Health & Family Welfare Centre', 'আঘোর (মালঞ্চা) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'aghor-malancha-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Malancha', 'মালঞ্চা', 'Aghor, Malancha',
  'আঘোর, মালঞ্চা ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'malancha@fwc.dgfp.gov.bd', 'http://malanchaup.bogra.gov.bd',
  24.7875, 89.2325, 'https://maps.google.com/?q=24.7875,89.2325', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","নরমাল ডেলিভারি","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001233', '10001233', 'Narahatta Union Health & Family Welfare Centre', 'নারহট্ট ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'narahatta-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Narahatta', 'নারহট্ট', 'Narahatta School Road',
  'নারহট্ট স্কুল রোড, নারহট্ট ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624"]'::jsonb, 'narahatta@fwc.dgfp.gov.bd', 'http://narhattaup.bogra.gov.bd',
  24.7575, 89.2535, 'https://maps.google.com/?q=24.7575,89.2535', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা","মাতৃত্বকালীন পুষ্টি ও সেবা","পরিবার পরিকল্পনা পদ্ধতি","টিকা ও শিশুর যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://kahaloo.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001234', '10001234', 'Bhatra Union Health & Family Welfare Centre', 'ভাটরা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'bhatra-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Bhatra', 'ভাটরা', 'Bhatra High School Road',
  'ভাটরা হাই স্কুল রোড, ভাটরা ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'bhatra@fwc.dgfp.gov.bd', 'http://bhatraup.bogra.gov.bd',
  24.6535, 89.1555, 'https://maps.google.com/?q=24.6535,89.1555', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা)","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001235', '10001235', 'Burail Union Health & Family Welfare Centre', 'বুড়ইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'burail-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Burail', 'বুড়ইল', 'Burail Union Complex',
  'বুড়ইল পরিষদ কমপ্লেক্স, বুড়ইল ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'burail@fwc.dgfp.gov.bd', 'http://burailup.bogra.gov.bd',
  24.7135, 89.2615, 'https://maps.google.com/?q=24.7135,89.2615', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001236', '10001236', 'Thalta Majhgram Union Health & Family Welfare Centre', 'থালতা মাঝগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'thalta-majhgram-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Thalta Majhgram', 'থালতা মাঝগ্রাম', 'Thalta Bazar',
  'থালতা বাজার, থালতা মাঝগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'thaltamajhgram@fwc.dgfp.gov.bd', 'http://thaltamajhgramup.bogra.gov.bd',
  24.6225, 89.1885, 'https://maps.google.com/?q=24.6225,89.1885', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা পদ্ধতি","শিশু রোগ প্রতিরোধ ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001237', '10001237', 'Nandigram Sadar Union Health & Family Welfare Centre', 'নন্দীগ্রাম সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'nandigram-sadar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Union', 'নন্দীগ্রাম ইউনিয়ন', 'Omarpur High School Area',
  'ওমরপুর, নন্দীগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324625"]'::jsonb, 'nandigram@fwc.dgfp.gov.bd', 'http://nandigramup.bogra.gov.bd',
  24.6975, 89.2145, 'https://maps.google.com/?q=24.6975,89.2145', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী চেকআপ","নরমাল ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","টিকা ও শিশু স্বাস্থ্য"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001238', '10001238', 'Chaluabari Union Health & Family Welfare Centre', 'চালুয়াবাড়ী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'chaluabari-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Chaluabari', 'চালুয়াবাড়ী', 'Chaluabari Jamuna Char',
  'চালুয়াবাড়ী যমুনা চর এলাকা, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'chaluabari@fwc.dgfp.gov.bd', 'http://chaluabariup.bogra.gov.bd',
  24.9812, 89.6645, 'https://maps.google.com/?q=24.9812,89.6645', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চলের জরুরি স্বাভাবিক প্রসব","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001239', '10001239', 'Kornibari Union Health & Family Welfare Centre', 'কর্ণিবাড়ী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kornibari-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Kornibari', 'কর্ণিবাড়ী', 'Kornibari Bazar',
  'কর্ণিবাড়ী বাজার, কর্ণিবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'kornibari@fwc.dgfp.gov.bd', 'http://kornibariup.bogra.gov.bd',
  24.8115, 89.6425, 'https://maps.google.com/?q=24.8115,89.6425', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001240', '10001240', 'Bohail Union Health & Family Welfare Centre', 'বোহাইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'bohail-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Bohail', 'বোহাইল', 'Bohail Bazar, Jamuna Char',
  'বোহাইল বাজার, যমুনা চর এলাকা, বোহাইল ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'bohail@fwc.dgfp.gov.bd', 'http://bohailup.bogra.gov.bd',
  24.7825, 89.6515, 'https://maps.google.com/?q=24.7825,89.6515', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা সেবা","শিশু রোগ প্রতিরোধ ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001241', '10001241', 'Kazla Union Health & Family Welfare Centre', 'কাজলা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kazla-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Kazla', 'কাজলা', 'Kazla Bazar',
  'কাজলা বাজার, কাজলা ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'kazla@fwc.dgfp.gov.bd', 'http://kazlaup.bogra.gov.bd',
  24.8615, 89.6742, 'https://maps.google.com/?q=24.8615,89.6742', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী চেকআপ","নরমাল ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","টিকা ও শিশু স্বাস্থ্য"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001242', '10001242', 'Kamalpur Union Health & Family Welfare Centre', 'কামালপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kamalpur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Kamalpur', 'কামালপুর', 'Kamalpur Bazar',
  'কামালপুর বাজার, কামালপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'kamalpur@fwc.dgfp.gov.bd', 'http://kamalpurup.bogra.gov.bd',
  24.8325, 89.6115, 'https://maps.google.com/?q=24.8325,89.6115', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001243', '10001243', 'Kutubpur Union Health & Family Welfare Centre', 'কুতুবপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kutubpur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Kutubpur', 'কুতুবপুর', 'Kutubpur Bazar',
  'কুতুবপুর বাজার, কুতুবপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626"]'::jsonb, 'kutubpur@fwc.dgfp.gov.bd', 'http://kutubpurup.bogra.gov.bd',
  24.8512, 89.5895, 'https://maps.google.com/?q=24.8512,89.5895', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভকালীন যত্ন","স্বাভাবিক ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","শিশু স্বাস্থ্য সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001244', '10001244', 'Khottapara Union Health & Family Welfare Centre', 'খোট্টাপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'khottapara-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Khotta Para', 'খোট্টাপাড়া', 'Khottapara Bazar',
  'খোট্টাপাড়া বাজার, খোট্টাপাড়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'khottapara@fwc.dgfp.gov.bd', 'http://khottaparaup.bogra.gov.bd',
  24.7415, 89.4312, 'https://maps.google.com/?q=24.7415,89.4312', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা)","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001245', '10001245', 'Chopinagar Union Health & Family Welfare Centre', 'চোপিনগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'chopinagar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Chopinagar', 'চোপিনগর', 'Chopinagar Bazar',
  'চোপিনগর বাজার, চোপিনগর ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'chopinagar@fwc.dgfp.gov.bd', 'http://chopinagarup.bogra.gov.bd',
  24.7525, 89.4185, 'https://maps.google.com/?q=24.7525,89.4185', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001246', '10001246', 'Ashekpur Union Health & Family Welfare Centre', 'আশেকপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'ashekpur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Ashekpur', 'আশেকপুর', 'Ranirhat, Ashekpur',
  'রাণীরহাট, আশেকপুর ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'ashekpur@fwc.dgfp.gov.bd', 'http://ashekpurup.bogra.gov.bd',
  24.8115, 89.3912, 'https://maps.google.com/?q=24.8115,89.3912', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা পদ্ধতি","শিশু রোগ প্রতিরোধ ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001247', '10001247', 'Majhira Union Health & Family Welfare Centre', 'মাঝিড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'majhira-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Majhira', 'মাঝিড়া', 'Majhira Cantonment Road',
  'মাঝিড়া সেনানিবাস সংলগ্ন, মাঝিড়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'majhira@fwc.dgfp.gov.bd', 'http://majhiraup.bogra.gov.bd',
  24.7665, 89.3792, 'https://maps.google.com/?q=24.7665,89.3792', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী চেকআপ","নরমাল ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","টিকা ও শিশু স্বাস্থ্য"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001248', '10001248', 'Aria Union Health & Family Welfare Centre', 'আড়িয়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'aria-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Aria', 'আড়িয়া', 'Aria Rahimabad Road',
  'রহিমাবাদ সড়ক, আড়িয়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01701-248646"]'::jsonb, 'aria@fwc.dgfp.gov.bd', 'http://ariaup.bogra.gov.bd',
  24.7875, 89.3825, 'https://maps.google.com/?q=24.7875,89.3825', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001249', '10001249', 'Kusumbi (Altadighi) Union Health & Family Welfare Centre', 'কুসুম্বী (আলতাদিঘী) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kusumbi-altadighi-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Kusumbi', 'কুসুম্বী', 'Altadighi, Kusumbi',
  'আলতাদিঘী, কুসুম্বী ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647"]'::jsonb, 'kusumbi@fwc.dgfp.gov.bd', 'http://kusumbiup.bogra.gov.bd',
  24.6415, 89.3785, 'https://maps.google.com/?q=24.6415,89.3785', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা)","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001250', '10001250', 'Bishalpur (Pachual) Union Health & Family Welfare Centre', 'বিশালপুর (পাঁচুয়াল) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'bishalpur-pachual-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Bishalpur', 'বিশালপুর', 'Pachual, Bishalpur',
  'পাঁচুয়াল, বিশালপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647"]'::jsonb, 'bishalpur@fwc.dgfp.gov.bd', 'http://bishalpurup.bogra.gov.bd',
  24.5825, 89.3645, 'https://maps.google.com/?q=24.5825,89.3645', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001251', '10001251', 'Sughat (Joylajowan) Union Health & Family Welfare Centre', 'সুঘাট (জয়লাজুয়ান) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'sughat-joylajowan-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sughat', 'সুঘাট', 'Joylajowan, Sughat',
  'জয়লাজুয়ান, সুঘাট ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647"]'::jsonb, 'sughat@fwc.dgfp.gov.bd', 'http://sughatup.bogra.gov.bd',
  24.6315, 89.5125, 'https://maps.google.com/?q=24.6315,89.5125', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা পদ্ধতি","শিশু রোগ প্রতিরোধ ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001252', '10001252', 'Khamarkandi Union Health & Family Welfare Centre', 'খামারকান্দি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'khamarkandi-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Khamarkandi', 'খামারকান্দি', 'Khamarkandi Bazar',
  'খামারকান্দি বাজার, খামারকান্দি ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647"]'::jsonb, 'khamarkandi@fwc.dgfp.gov.bd', 'http://khamarkandiup.bogra.gov.bd',
  24.6815, 89.4725, 'https://maps.google.com/?q=24.6815,89.4725', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী চেকআপ","নরমাল ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","টিকা ও শিশু স্বাস্থ্য"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001253', '10001253', 'Khanpur Union Health & Family Welfare Centre', 'খানপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'khanpur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Khanpur', 'খানপুর', 'Khanpur Bazar',
  'খানপুর বাজার, খানপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647"]'::jsonb, 'khanpur@fwc.dgfp.gov.bd', 'http://khanpurup.bogra.gov.bd',
  24.6312, 89.4312, 'https://maps.google.com/?q=24.6312,89.4312', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001254', '10001254', 'Garidaha (Kalsimati) Union Health & Family Welfare Centre', 'গাড়ীদহ (কালসীমটি) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'garidaha-kalsimati-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Garidaha', 'গাড়ীদহ', 'Kalsimati, RDA Road',
  'কালসীমটি, আরডিএ সংলগ্ন, গাড়ীদহ ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '["01701-248647"]'::jsonb, 'garidaha@fwc.dgfp.gov.bd', 'http://garidahaup.bogra.gov.bd',
  24.7065, 89.3942, 'https://maps.google.com/?q=24.7065,89.3942', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা","মাতৃত্বকালীন পুষ্টি ও সেবা","পরিবার পরিকল্পনা পদ্ধতি","টিকা ও শিশুর যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001255', '10001255', 'Ganganagar (Sayedpur) Union Health & Family Welfare Centre', 'গঙ্গানগর (সৈয়দপুর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'ganganagar-sayedpur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Sayedpur', 'সৈয়দপুর', 'Ganganagar, Sayedpur',
  'গঙ্গানগর, সৈয়দপুর ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'sayedpur@fwc.dgfp.gov.bd', 'http://sayedpurup.bogra.gov.bd',
  25.0125, 89.2815, 'https://maps.google.com/?q=25.0125,89.2815', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা)","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001256', '10001256', 'Maydanhat Union Health & Family Welfare Centre', 'ময়দানহাটা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'maydanhat-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Maydanhatta', 'ময়দানহাটা', 'Maydanhat Bazar',
  'ময়দানহাটা বাজার, ময়দানহাটা ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'maydanhatta@fwc.dgfp.gov.bd', 'http://maydanhattaup.bogra.gov.bd',
  24.9315, 89.3142, 'https://maps.google.com/?q=24.9315,89.3142', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001257', '10001257', 'Pirab Union Health & Family Welfare Centre', 'পীরব ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'pirab-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Pirab', 'পীরব', 'Pirab Bazar',
  'পীরব বাজার, পীরব ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'pirab@fwc.dgfp.gov.bd', 'http://pirabup.bogra.gov.bd',
  24.9542, 89.3715, 'https://maps.google.com/?q=24.9542,89.3715', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা পদ্ধতি","শিশু রোগ প্রতিরোধ ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001258', '10001258', 'Raynagar Union Health & Family Welfare Centre', 'রায়নগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'raynagar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Raynagar', 'রায়নগর', 'Raynagar Bazar',
  'রায়নগর বাজার, রায়নগর ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'raynagar@fwc.dgfp.gov.bd', 'http://raynagarup.bogra.gov.bd',
  24.9875, 89.3115, 'https://maps.google.com/?q=24.9875,89.3115', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী চেকআপ","নরমাল ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","টিকা ও শিশু স্বাস্থ্য"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001259', '10001259', 'Atmul Union Health & Family Welfare Centre', 'আটমূল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'atmul-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Atmul', 'আটমূল', 'Atmul Bazar',
  'আটমূল বাজার, আটমূল ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'atmul@fwc.dgfp.gov.bd', 'http://atmulup.bogra.gov.bd',
  25.0212, 89.3645, 'https://maps.google.com/?q=25.0212,89.3645', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001260', '10001260', 'Kichak Union Health & Family Welfare Centre', 'কিচক ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'kichak-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Kichak', 'কিচক', 'Kichak Bazar',
  'কিচক বাজার, কিচক ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324628"]'::jsonb, 'kichak@fwc.dgfp.gov.bd', 'http://kichakup.bogra.gov.bd',
  25.0512, 89.2612, 'https://maps.google.com/?q=25.0512,89.2612', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভকালীন যত্ন","স্বাভাবিক ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","শিশু স্বাস্থ্য সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001261', '10001261', 'Jorgacha (Valurpara) Union Health & Family Welfare Centre', 'জোড়গাছা (ভেলুরপাড়া) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'jorgacha-valurpara-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Jorgacha', 'জোড়গাছা', 'Valurpara Railway Station Area',
  'ভেলুরপাড়া রেল স্টেশন সংলগ্ন, জোড়গাছা ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'jorgacha@fwc.dgfp.gov.bd', 'http://jorgachaup.bogra.gov.bd',
  24.9612, 89.5115, 'https://maps.google.com/?q=24.9612,89.5115', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা)","গর্ভবতী মা ও নবজাতক সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই নিয়মিত টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001262', '10001262', 'Digdair Union Health & Family Welfare Centre', 'দিগদাইড় ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'digdair-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Digdair', 'দিগদাইড়', 'Digdair High School Road',
  'দিগদাইড় হাই স্কুল রোড, দিগদাইড় ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'digdair@fwc.dgfp.gov.bd', 'http://digdairup.bogra.gov.bd',
  25.0392, 89.4762, 'https://maps.google.com/?q=25.0392,89.4762', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001263', '10001263', 'Madhupur Union Health & Family Welfare Centre', 'মধুপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'madhupur-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Madhupur', 'মধুপুর', 'Madhupur Bazar',
  'মধুপুর বাজার, মধুপুর ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'madhupur@fwc.dgfp.gov.bd', 'http://madhupurup.bogra.gov.bd',
  25.0575, 89.5112, 'https://maps.google.com/?q=25.0575,89.5112', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রসূতি সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা পদ্ধতি","শিশু রোগ প্রতিরোধ ও টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001264', '10001264', 'Pakulla Union Health & Family Welfare Centre', 'পাকুল্লা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'pakulla-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Pakulla', 'পাকুল্লা', 'Pakulla Bazar, Jamuna Embankment',
  'পাকুল্লা বাজার, যমুনা বন্যা নিয়ন্ত্রণ বাঁধ, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'pakulla@fwc.dgfp.gov.bd', 'http://pakullaup.bogra.gov.bd',
  25.0162, 89.5612, 'https://maps.google.com/?q=25.0162,89.5612', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল প্রসূতি সেবা","নরমাল ডেলিভারি","পরিবার পরিকল্পনা পরামর্শ","টিকা ও শিশু স্বাস্থ্য"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dgfp-fwc-10001265', '10001265', 'Tekani Chukainagar Union Health & Family Welfare Centre', 'তৈকানী চুকাইনগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র',
  'tekani-chukainagar-uhfwc', 'Union Health & Family Welfare Centre', 'union_health_family_welfare_centre',
  'Union Health and Family Welfare Centre (UH&FWC)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Tekani Chukainagar', 'তৈকানী চুকাইনগর', 'Chukainagar Bazar, Jamuna Embankment',
  'চুকাইনগর বাজার, যমুনা তীরবর্তী এলাকা, তৈকানী চুকাইনগর, সোনাতলা, বগুড়া - ৫৮২০', '["01701-248649"]'::jsonb, 'tekanichukainagar@fwc.dgfp.gov.bd', 'http://tekanichukainagarup.bogra.gov.bd',
  25.0412, 89.5785, 'https://maps.google.com/?q=25.0412,89.5785', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল মা ও শিশু স্বাস্থ্য সেবা","স্বাভাবিক প্রসব","পরিবার পরিকল্পনা সেবা","ইপিআই টিকাদান কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001301', '10001301', 'Shikarpur Community Clinic', 'শিকারপুর কমিউনিটি ক্লিনিক',
  'shikarpur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Erulia', 'এরুলিয়া', 'Shikarpur Village',
  'শিকারপুর গ্রাম, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-780101"]'::jsonb, 'shikarpur@cc.dghs.gov.bd', 'http://eruliaup.bogra.gov.bd',
  24.8725, 89.3142, 'https://maps.google.com/?q=24.8725,89.3142', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ বিতরণ","প্রাথমিক স্বাস্থ্য সেবা","মা ও শিশু স্বাস্থ্য সেবা","গর্ভবতী মায়েদের প্রসবপূর্ব যত্ন","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://bogurasadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001302', '10001302', 'Koichor Community Clinic', 'কৈচর কমিউনিটি ক্লিনিক',
  'koichor-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Fapor', 'ফাঁপোর', 'Koichor South Para',
  'কৈচর দক্ষিণপাড়া, ফাঁপোর, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-780102"]'::jsonb, 'koichor@cc.dghs.gov.bd', 'http://faporup.bogra.gov.bd',
  24.8115, 89.3648, 'https://maps.google.com/?q=24.8115,89.3648', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে প্রয়োজনীয় ওষুধ","সাধারণ রোগের প্রাথমিক চিকিৎসা","গর্ভবতী ও প্রসূতি সেবা","শিশু স্বাস্থ্য ও পুষ্টি পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://bogurasadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001303', '10001303', 'Palashbari Community Clinic', 'পলাশবাড়ী কমিউনিটি ক্লিনিক',
  'palashbari-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Gokul', 'গোকুল', 'Palashbari Village',
  'পলাশবাড়ী গ্রাম, গোকুল, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-780103"]'::jsonb, 'palashbari@cc.dghs.gov.bd', 'http://gokulup.bogra.gov.bd',
  24.9125, 89.3621, 'https://maps.google.com/?q=24.9125,89.3621', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্যসেবা","বিনামূল্যে ওষুধ সরবরাহ","পরিবার পরিকল্পনা পরামর্শ","কৈশোরকালীন স্বাস্থ্য পরামর্শ","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://bogurasadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001304', '10001304', 'Kazipur Community Clinic', 'কাজীপুর কমিউনিটি ক্লিনিক',
  'kazipur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Lahiripara', 'লাহিড়ীপাড়া', 'Kazipur West Para',
  'কাজীপুর পশ্চিমপাড়া, লাহিড়ীপাড়া, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-780104"]'::jsonb, 'kazipur@cc.dghs.gov.bd', 'http://lahiriparaup.bogra.gov.bd',
  24.8985, 89.3195, 'https://maps.google.com/?q=24.8985,89.3195', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু স্বাস্থ্য সেবা","স্বাভাবিক প্রসব রেফারেল","পুষ্টি শিক্ষা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://bogurasadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001305', '10001305', 'Baksmoil Community Clinic', 'বাকশৈল কমিউনিটি ক্লিনিক',
  'baksmoil-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Namuja', 'নামুজা', 'Baksmoil Village',
  'বাকশৈল গ্রাম, নামুজা, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-780105"]'::jsonb, 'baksmoil@cc.dghs.gov.bd', 'http://namujaup.bogra.gov.bd',
  24.9452, 89.3082, 'https://maps.google.com/?q=24.9452,89.3082', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা","জরুরী রেফারেল সেবা","গর্ভকালীন চেকআপ","নিয়মিত টিকাদান কার্যক্রম"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://bogurasadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001306', '10001306', 'Choklokman Community Clinic', 'চকলোকমান কমিউনিটি ক্লিনিক',
  'choklokman-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Sabgram', 'সাবগ্রাম', 'Choklokman Bazar Area',
  'চকলোকমান বাজার সংলগ্ন, সাবগ্রাম, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-780106"]'::jsonb, 'choklokman@cc.dghs.gov.bd', 'http://sabgramup.bogra.gov.bd',
  24.8458, 89.3952, 'https://maps.google.com/?q=24.8458,89.3952', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ বিতরণ","পরিবার পরিকল্পনা উপাদান বিতরণ","রক্তচাপ ও ডায়াবেটিস স্ক্রিনিং","মা ও শিশু যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://bogurasadar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001307', '10001307', 'Shalgram Community Clinic', 'শালগ্রাম কমিউনিটি ক্লিনিক',
  'shalgram-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Adamdighi Sadar', 'আদমদীঘি সদর', 'Shalgram Village',
  'শালগ্রাম, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '["01713-780107"]'::jsonb, 'shalgram@cc.dghs.gov.bd', 'http://adamdighi.bogra.gov.bd',
  24.7892, 88.9951, 'https://maps.google.com/?q=24.7892,88.9951', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","বিনামূল্যে ওষুধ","টিকা প্রদান","গর্ভবতী চেকআপ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001308', '10001308', 'Uthrail Community Clinic', 'উথরাইল কমিউনিটি ক্লিনিক',
  'uthrail-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Champapur', 'চাঁপাপুর', 'Uthrail Village',
  'উথরাইল গ্রাম, চাঁপাপুর, আদমদীঘি, বগুড়া - ৫৮৯২', '["01713-780108"]'::jsonb, 'uthrail@cc.dghs.gov.bd', 'http://champapurup.bogra.gov.bd',
  24.7521, 89.0215, 'https://maps.google.com/?q=24.7521,89.0215', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু স্বাস্থ্য","পরিবার পরিকল্পনা","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001309', '10001309', 'Bagbari Community Clinic', 'বাগবাড়ি কমিউনিটি ক্লিনিক',
  'bagbari-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Chhatiangram', 'ছাতিয়ানগ্রাম', 'Bagbari Village',
  'বাগবাড়ি গ্রাম, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৯২', '["01713-780109"]'::jsonb, 'bagbari@cc.dghs.gov.bd', 'http://chhatiangramup.bogra.gov.bd',
  24.8124, 89.0652, 'https://maps.google.com/?q=24.8124,89.0652', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ রোগীর চিকিৎসা","গর্ভকালীন যত্ন","পুষ্টি কার্যক্রম","রেফারেল সার্ভিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001310', '10001310', 'Tarapur Community Clinic', 'তারাপুর কমিউনিটি ক্লিনিক',
  'tarapur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Kundagram', 'কুন্দগ্রাম', 'Tarapur Village',
  'তারাপুর, কুন্দগ্রাম, আদমদীঘি, বগুড়া - ৫৮৯২', '["01713-780110"]'::jsonb, 'tarapur@cc.dghs.gov.bd', 'http://kundagramup.bogra.gov.bd',
  24.7312, 88.9814, 'https://maps.google.com/?q=24.7312,88.9814', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","ওষুধ বিতরণ","মা ও শিশু যত্ন","ইপিআই টিকাদান কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001311', '10001311', 'Murail CC (Nasratpur)', 'মুরইল কমিউনিটি ক্লিনিক',
  'murail-nasratpur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Nasratpur', 'নসরতপুর', 'Murail Village',
  'মুরইল গ্রাম, নসরতপুর, আদমদীঘি, বগুড়া - ৫৮৯২', '["01713-780111"]'::jsonb, 'murailnasratpur@cc.dghs.gov.bd', 'http://nasratpurup.bogra.gov.bd',
  24.8145, 89.0289, 'https://maps.google.com/?q=24.8145,89.0289', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","প্রাথমিক চিকিৎসা","গর্ভবতী সেবা","পরিবার পরিকল্পনা পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001312', '10001312', 'Sandira Community Clinic', 'সান্দিড়া কমিউনিটি ক্লিনিক',
  'sandira-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Santahar', 'সান্তাহার', 'Sandira Village',
  'সান্দিড়া, সান্তাহার গ্রামীণ এলাকা, আদমদীঘি, বগুড়া - ৫৮৯১', '["01713-780112"]'::jsonb, 'sandira@cc.dghs.gov.bd', 'http://santaharup.bogra.gov.bd',
  24.7731, 88.9452, 'https://maps.google.com/?q=24.7731,88.9452', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু স্বাস্থ্য সেবা","কৈশোরবান্ধব সেবা","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001313', '10001313', 'Boishakhi Char Community Clinic', 'বৈশাখী চর কমিউনিটি ক্লিনিক',
  'boishakhi-char-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Bhandarbari', 'ভান্ডারবাড়ী', 'Boishakhi Char, Jamuna Basin',
  'বৈশাখী চর, যমুনা নদীর অববাহিকা, ভান্ডারবাড়ী, ধুনট, বগুড়া - ৫৮৫০', '["01713-780113"]'::jsonb, 'boishakhichar@cc.dghs.gov.bd', 'http://bhandarbariup.bogra.gov.bd',
  24.6542, 89.6251, 'https://maps.google.com/?q=24.6542,89.6251', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল জরুরী প্রাথমিক স্বাস্থ্য সেবা","বিনামূল্যে ওষুধ","প্রসবপূর্ব পরামর্শ","টিকা প্রদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001314', '10001314', 'Dighalkandi Community Clinic', 'দিঘলকান্দি কমিউনিটি ক্লিনিক',
  'dighalkandi-dhunat-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Chawkibari', 'চৌকিবাড়ী', 'Dighalkandi Village',
  'দিঘলকান্দি, চৌকিবাড়ী, ধুনট, বগুড়া - ৫৮৫০', '["01713-780114"]'::jsonb, 'dighalkandidhunat@cc.dghs.gov.bd', 'http://chawkibariup.bogra.gov.bd',
  24.6852, 89.5412, 'https://maps.google.com/?q=24.6852,89.5412', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা","ওষুধ বিতরণ","মা ও শিশু স্বাস্থ্য সেবা","পরিবার পরিকল্পনা পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001315', '10001315', 'Boro Chapra Community Clinic', 'বড়চাপড়া কমিউনিটি ক্লিনিক',
  'boro-chapra-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Chikashi', 'চিকাশী', 'Boro Chapra Village',
  'বড়চাপড়া, চিকাশী, ধুনট, বগুড়া - ৫৮৫০', '["01713-780115"]'::jsonb, 'borochapra@cc.dghs.gov.bd', 'http://chikashiup.bogra.gov.bd',
  24.7125, 89.5714, 'https://maps.google.com/?q=24.7125,89.5714', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","সাধারণ রোগীর সেবা","গর্ভবতী চেকআপ","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001316', '10001316', 'Bilkajuli Community Clinic', 'বিলকাজুলী কমিউনিটি ক্লিনিক',
  'bilkajuli-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Elangi', 'এলাঙ্গী', 'Bilkajuli Village',
  'বিলকাজুলী, এলাঙ্গী, ধুনট, বগুড়া - ৫৮৫০', '["01713-780116"]'::jsonb, 'bilkajuli@cc.dghs.gov.bd', 'http://elangiup.bogra.gov.bd',
  24.6985, 89.4752, 'https://maps.google.com/?q=24.6985,89.4752', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা","ওষুধ বিতরণ","শিশু পুষ্টি পর্যবেক্ষণ","রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001317', '10001317', 'Baniyajan Community Clinic', 'বানিয়াযান কমিউনিটি ক্লিনিক',
  'baniyajan-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Goshaibari', 'গোসাইবাড়ী', 'Baniyajan Village',
  'বানিয়াযান, গোসাইবাড়ী, ধুনট, বগুড়া - ৫৮৫০', '["01713-780117"]'::jsonb, 'baniyajan@cc.dghs.gov.bd', 'http://goshaibariup.bogra.gov.bd',
  24.6321, 89.5892, 'https://maps.google.com/?q=24.6321,89.5892', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","মা ও শিশু যত্ন","পরিবার পরিকল্পনা পরামর্শ","টিকা দান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001318', '10001318', 'Nandiyarpara Community Clinic', 'নান্দিয়ারপাড়া কমিউনিটি ক্লিনিক',
  'nandiyarpara-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Nimgachhi', 'নিমগাছি', 'Nandiyarpara Village',
  'নান্দিয়ারপাড়া, নিমগাছি, ধুনট, বগুড়া - ৫৮৫০', '["01713-780118"]'::jsonb, 'nandiyarpara@cc.dghs.gov.bd', 'http://nimgachhiup.bogra.gov.bd',
  24.7412, 89.5125, 'https://maps.google.com/?q=24.7412,89.5125', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ বিতরণ","প্রাথমিক স্বাস্থ্য সেবা","গর্ভবতী মায়েদের পরামর্শ","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001319', '10001319', 'Phepi Community Clinic', 'ফেঁপি কমিউনিটি ক্লিনিক',
  'phepi-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Chamrul', 'চামরুল', 'Phepi Village',
  'ফেঁপি গ্রাম, চামরুল, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01713-780119"]'::jsonb, 'phepi@cc.dghs.gov.bd', 'http://chamrulup.bogra.gov.bd',
  24.8952, 89.1425, 'https://maps.google.com/?q=24.8952,89.1425', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","প্রাথমিক চিকিৎসা","মা ও শিশু যত্ন","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001320', '10001320', 'Kurshahar Community Clinic', 'কুর্শাহার কমিউনিটি ক্লিনিক',
  'kurshahar-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dhupchanchia Sadar', 'দুপচাঁচিয়া সদর', 'Kurshahar Village',
  'কুর্শাহার, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01713-780120"]'::jsonb, 'kurshahar@cc.dghs.gov.bd', 'http://dhupchanchia.bogra.gov.bd',
  24.8715, 89.1752, 'https://maps.google.com/?q=24.8715,89.1752', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","গর্ভবতী স্বাস্থ্য পরীক্ষা","টিকা কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001321', '10001321', 'Baluka Community Clinic', 'বালুকা কমিউনিটি ক্লিনিক',
  'baluka-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Gobindapur', 'গোবিন্দপুর', 'Baluka Village',
  'বালুকা গ্রাম, গোবিন্দপুর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01713-780121"]'::jsonb, 'baluka@cc.dghs.gov.bd', 'http://gobindapurup.bogra.gov.bd',
  24.8512, 89.1251, 'https://maps.google.com/?q=24.8512,89.1251', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু স্বাস্থ্য","পরিবার পরিকল্পনা","শিশু পুষ্টি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001322', '10001322', 'Sukhangari Community Clinic', 'সুখানগাড়ী কমিউনিটি ক্লিনিক',
  'sukhangari-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Gunahar', 'গুনাহার', 'Sukhangari Village',
  'সুখানগাড়ী গ্রাম, গুনাহার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01713-780122"]'::jsonb, 'sukhangari@cc.dghs.gov.bd', 'http://gunaharup.bogra.gov.bd',
  24.8824, 89.2152, 'https://maps.google.com/?q=24.8824,89.2152', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","ওষুধ সরবরাহ","গর্ভবতী সেবা","রেফারেল সার্ভিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001323', '10001323', 'Debkhanda Community Clinic', 'দেবখন্ড কমিউনিটি ক্লিনিক',
  'debkhanda-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Talora', 'তালোড়া', 'Debkhanda Village',
  'দেবখন্ড গ্রাম, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01713-780123"]'::jsonb, 'debkhanda@cc.dghs.gov.bd', 'http://taloraup.bogra.gov.bd',
  24.8321, 89.1562, 'https://maps.google.com/?q=24.8321,89.1562', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","মা ও শিশু স্বাস্থ্য সেবা","কৈশোরকালীন পরামর্শ","ইপিআই টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001324', '10001324', 'Potha Community Clinic', 'পোথা কমিউনিটি ক্লিনিক',
  'potha-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Zianagar', 'জিয়ানগর', 'Potha Village',
  'পোথা গ্রাম, জিয়ানগর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01713-780124"]'::jsonb, 'potha@cc.dghs.gov.bd', 'http://zianagarup.bogra.gov.bd',
  24.9142, 89.1985, 'https://maps.google.com/?q=24.9142,89.1985', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","বিনামূল্যে ওষুধ বিতরণ","পরিবার পরিকল্পনা","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001325', '10001325', 'Maliandaha Community Clinic', 'মালিয়ান্দহ কমিউনিটি ক্লিনিক',
  'maliandaha-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Baliadighi', 'বালিয়াদিঘী', 'Maliandaha Village',
  'মালিয়ান্দহ গ্রাম, বালিয়াদিঘী, গাবতলী, বগুড়া - ৫৮২০', '["01713-780125"]'::jsonb, 'maliandaha@cc.dghs.gov.bd', 'http://baliadighiup.bogra.gov.bd',
  24.8624, 89.5125, 'https://maps.google.com/?q=24.8624,89.5125', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","প্রাথমিক চিকিৎসা","মা ও শিশু স্বাস্থ্য","টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001326', '10001326', 'Deopara Community Clinic', 'দেওপাড়া কমিউনিটি ক্লিনিক',
  'deopara-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Kagail', 'কাগইল', 'Deopara Village',
  'দেওপাড়া, কাগইল, গাবতলী, বগুড়া - ৫৮২০', '["01713-780126"]'::jsonb, 'deopara@cc.dghs.gov.bd', 'http://kagailup.bogra.gov.bd',
  24.9215, 89.4751, 'https://maps.google.com/?q=24.9215,89.4751', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","গর্ভবতী সেবা","পরিবার পরিকল্পনা পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001327', '10001327', 'Peri Community Clinic', 'পেরী কমিউনিটি ক্লিনিক',
  'peri-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Mohisaban', 'মহিষাবান', 'Peri Village',
  'পেরী গ্রাম, মহিষাবান, গাবতলী, বগুড়া - ৫৮২০', '["01713-780127"]'::jsonb, 'peri@cc.dghs.gov.bd', 'http://mohisabanup.bogra.gov.bd',
  24.8415, 89.4421, 'https://maps.google.com/?q=24.8415,89.4421', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","মা ও শিশু যত্ন","শিশু বৃদ্ধি পর্যবেক্ষণ","টিকা কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001328', '10001328', 'Ujgram Community Clinic', 'উজগ্রাম কমিউনিটি ক্লিনিক',
  'ujgram-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Nasipur', 'নাছিপুর', 'Ujgram Village',
  'উজগ্রাম, নাছিপুর, গাবতলী, বগুড়া - ৫৮২০', '["01713-780128"]'::jsonb, 'ujgram@cc.dghs.gov.bd', 'http://nasipurup.bogra.gov.bd',
  24.8912, 89.4215, 'https://maps.google.com/?q=24.8912,89.4215', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা","ওষুধ বিতরণ","প্রসবপূর্ব যত্ন","রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001329', '10001329', 'Pachkathia Community Clinic', 'পাচকাথিয়া কমিউনিটি ক্লিনিক',
  'pachkathia-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Rameshwarpur', 'রামেশ্বরপুর', 'Pachkathia Village',
  'পাচকাথিয়া গ্রাম, রামেশ্বরপুর, গাবতলী, বগুড়া - ৫৮২০', '["01713-780129"]'::jsonb, 'pachkathia@cc.dghs.gov.bd', 'http://rameshwarpurup.bogra.gov.bd',
  24.8315, 89.4892, 'https://maps.google.com/?q=24.8315,89.4892', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান","পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001330', '10001330', 'Tilokpur Community Clinic', 'তিলকপুর কমিউনিটি ক্লিনিক',
  'tilokpur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Sukhanpukur', 'সুখানপুকুর', 'Tilokpur Village',
  'তিলকপুর গ্রাম, সুখানপুকুর, গাবতলী, বগুড়া - ৫৮২০', '["01713-780130"]'::jsonb, 'tilokpur@cc.dghs.gov.bd', 'http://sukhanpukurup.bogra.gov.bd',
  24.9512, 89.4921, 'https://maps.google.com/?q=24.9512,89.4921', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","ওষুধ বিতরণ","পরিবার পরিকল্পনা","জরুরী রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001331', '10001331', 'Bhalluk Community Clinic', 'ভাল্লুক কমিউনিটি ক্লিনিক',
  'bhalluk-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Bir Kedar', 'বীরকেদার', 'Bhalluk Village',
  'ভাল্লুক গ্রাম, বীরকেদার, কাহালু, বগুড়া - ৫৮৭০', '["01713-780131"]'::jsonb, 'bhalluk@cc.dghs.gov.bd', 'http://birkedarup.bogra.gov.bd',
  24.7952, 89.2152, 'https://maps.google.com/?q=24.7952,89.2152', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","প্রাথমিক স্বাস্থ্য সেবা","গর্ভবতী সেবা","টিকা প্রদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001332', '10001332', 'Jamtoli Community Clinic', 'জামতলী কমিউনিটি ক্লিনিক',
  'jamtoli-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Durgapur', 'দুর্গাপুর', 'Jamtoli Bazar Area',
  'জামতলী বাজার সংলগ্ন, দুর্গাপুর, কাহালু, বগুড়া - ৫৮৭০', '["01713-780132"]'::jsonb, 'jamtoli@cc.dghs.gov.bd', 'http://durgapurup.bogra.gov.bd',
  24.8124, 89.2612, 'https://maps.google.com/?q=24.8124,89.2612', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","বিনামূল্যে ওষুধ","মা ও শিশু যত্ন","পরিবার পরিকল্পনা পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001333', '10001333', 'Dipail Community Clinic', 'ডিপইল কমিউনিটি ক্লিনিক',
  'dipail-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Malancha', 'মালঞ্চা', 'Dipail Village',
  'ডিপইল গ্রাম, মালঞ্চা, কাহালু, বগুড়া - ৫৮৭০', '["01713-780133"]'::jsonb, 'dipail@cc.dghs.gov.bd', 'http://malanchaup.bogra.gov.bd',
  24.7712, 89.2815, 'https://maps.google.com/?q=24.7712,89.2815', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ বিতরণ","মা ও শিশু স্বাস্থ্য","ইপিআই টিকাদান","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001334', '10001334', 'Patanj Community Clinic', 'পাতাঞ্জ কমিউনিটি ক্লিনিক',
  'patanj-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Narhatta', 'নারহট্ট', 'Patanj Village',
  'পাতাঞ্জ গ্রাম, নারহট্ট, কাহালু, বগুড়া - ৫৮৭০', '["01713-780134"]'::jsonb, 'patanj@cc.dghs.gov.bd', 'http://narhattaup.bogra.gov.bd',
  24.7415, 89.2452, 'https://maps.google.com/?q=24.7415,89.2452', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["সাধারণ রোগীর চিকিৎসা","গর্ভকালীন চেকআপ","পুষ্টি শিক্ষা","রেফারেল সার্ভিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001335', '10001335', 'Chhatra Community Clinic', 'ছাতরা কমিউনিটি ক্লিনিক',
  'chhatra-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Paikar', 'পাইকর', 'Chhatra Village',
  'ছাতরা গ্রাম, পাইকর, কাহালু, বগুড়া - ৫৮৭০', '["01713-780135"]'::jsonb, 'chhatra@cc.dghs.gov.bd', 'http://paikarup.bogra.gov.bd',
  24.8452, 89.2312, 'https://maps.google.com/?q=24.8452,89.2312', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু যত্ন","টিকা কার্যক্রম","পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001336', '10001336', 'Dhakanta Community Clinic', 'ঢাকান্টা কমিউনিটি ক্লিনিক',
  'dhakanta-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahalu Sadar', 'কাহালু সদর', 'Dhakanta Village',
  'ঢাকান্টা, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '["01713-780136"]'::jsonb, 'dhakanta@cc.dghs.gov.bd', 'http://kahalu.bogra.gov.bd',
  24.8251, 89.2685, 'https://maps.google.com/?q=24.8251,89.2685', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","ওষুধ সরবরাহ","পরিবার পরিকল্পনা পদ্ধতি","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001337', '10001337', 'Damdama CC (Bhatra)', 'দমদমা কমিউনিটি ক্লিনিক',
  'damdama-bhatra-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Bhatra', 'ভাটরা', 'Damdama Village',
  'দমদমা গ্রাম, ভাটরা, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01713-780137"]'::jsonb, 'damdamabhatra@cc.dghs.gov.bd', 'http://bhatraup.bogra.gov.bd',
  24.6215, 89.2152, 'https://maps.google.com/?q=24.6215,89.2152', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","প্রাথমিক চিকিৎসা","মা ও শিশু যত্ন","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001338', '10001338', 'Muradpur Community Clinic', 'মুরাদপুর কমিউনিটি ক্লিনিক',
  'muradpur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Burail', 'বুড়ইল', 'Muradpur Village',
  'মুরাদপুর গ্রাম, বুড়ইল, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01713-780138"]'::jsonb, 'muradpur@cc.dghs.gov.bd', 'http://burailup.bogra.gov.bd',
  24.6452, 89.2451, 'https://maps.google.com/?q=24.6452,89.2451', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","গর্ভবতী মায়েদের যত্ন","পরিবার পরিকল্পনা সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001339', '10001339', 'Katham Community Clinic', 'কাথম কমিউনিটি ক্লিনিক',
  'katham-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Katham Village',
  'কাথম গ্রাম, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01713-780139"]'::jsonb, 'katham@cc.dghs.gov.bd', 'http://nandigram.bogra.gov.bd',
  24.6721, 89.1985, 'https://maps.google.com/?q=24.6721,89.1985', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","মা ও শিশু স্বাস্থ্য","টিকা প্রদান","রেফারেল সার্ভিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001340', '10001340', 'Ranbagha Community Clinic', 'রনবাঘা কমিউনিটি ক্লিনিক',
  'ranbagha-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Ranbagha Bazar Area',
  'রনবাঘা বাজার সংলগ্ন, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01713-780140"]'::jsonb, 'ranbagha@cc.dghs.gov.bd', 'http://nandigram.bogra.gov.bd',
  24.6985, 89.1742, 'https://maps.google.com/?q=24.6985,89.1742', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা","বিনামূল্যে ওষুধ","গর্ভবতী চেকআপ","ইপিআই টিকাদান কেন্দ্র"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001341', '10001341', 'Nimaidighi Community Clinic', 'নিমাইদিঘী কমিউনিটি ক্লিনিক',
  'nimaidighi-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Thalta Majhgram', 'থালতা মাঝগ্রাম', 'Nimaidighi Village',
  'নিমাইদিঘী গ্রাম, থালতা মাঝগ্রাম, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01713-780141"]'::jsonb, 'nimaidighi@cc.dghs.gov.bd', 'http://thaltamajhgramup.bogra.gov.bd',
  24.7125, 89.1352, 'https://maps.google.com/?q=24.7125,89.1352', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু যত্ন","পরিবার পরিকল্পনা পদ্ধতি","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001342', '10001342', 'Thalta Community Clinic', 'থালতা কমিউনিটি ক্লিনিক',
  'thalta-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Thalta Majhgram', 'থালতা মাঝগ্রাম', 'Thalta Village',
  'থালতা গ্রাম, থালতা মাঝগ্রাম, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01713-780142"]'::jsonb, 'thalta@cc.dghs.gov.bd', 'http://thaltamajhgramup.bogra.gov.bd',
  24.7315, 89.1512, 'https://maps.google.com/?q=24.7315,89.1512', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","মা ও শিশু স্বাস্থ্য সেবা","টিকা প্রদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001343', '10001343', 'Partitparol Community Clinic', 'পারতিত পরল কমিউনিটি ক্লিনিক',
  'partitparol-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Bhelabari', 'ভেলাবাড়ী', 'Partitparol Village',
  'পারতিত পরল, ভেলাবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01713-780143"]'::jsonb, 'partitparol@cc.dghs.gov.bd', 'http://bhelabariup.bogra.gov.bd',
  24.9652, 89.5412, 'https://maps.google.com/?q=24.9652,89.5412', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","প্রাথমিক চিকিৎসা","মা ও শিশু স্বাস্থ্য","টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001344', '10001344', 'Dharabarsha Char Community Clinic', 'ধারাবর্ষা চর কমিউনিটি ক্লিনিক',
  'dharabarsha-char-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Bohail', 'বোহাইল', 'Dharabarsha Char, Jamuna Basin',
  'ধারাবর্ষা চর, যমুনা নদী তীরবর্তী, বোহাইল, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01713-780144"]'::jsonb, 'dharabarshachar@cc.dghs.gov.bd', 'http://bohailup.bogra.gov.bd',
  24.8152, 89.6452, 'https://maps.google.com/?q=24.8152,89.6452', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চলের জরুরী স্বাস্থ্য সেবা","ওষুধ বিতরণ","প্রসবপূর্ব যত্ন","রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001345', '10001345', 'Kajir Char Community Clinic', 'কাজীর চর কমিউনিটি ক্লিনিক',
  'kajir-char-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Chaluabari', 'চালুয়াবাড়ী', 'Kajir Char, Jamuna Embankment',
  'কাজীর চর, চালুয়াবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01713-780145"]'::jsonb, 'kajirchar@cc.dghs.gov.bd', 'http://chaluabariup.bogra.gov.bd',
  25.0452, 89.6125, 'https://maps.google.com/?q=25.0452,89.6125', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","মা ও শিশু স্বাস্থ্য সেবা","পরিবার পরিকল্পনা পদ্ধতি","ইপিআই টিকা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001346', '10001346', 'Ramchandrapur Community Clinic', 'রামচন্দ্রপুর কমিউনিটি ক্লিনিক',
  'ramchandrapur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Fulbari', 'ফুলবাড়ী', 'Ramchandrapur Village',
  'রামচন্দ্রপুর গ্রাম, ফুলবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01713-780146"]'::jsonb, 'ramchandrapur@cc.dghs.gov.bd', 'http://fulbariup.bogra.gov.bd',
  24.8952, 89.5742, 'https://maps.google.com/?q=24.8952,89.5742', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","বিনামূল্যে ওষুধ","গর্ভবতী চেকআপ","শিশু পুষ্টি কার্যক্রম"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001347', '10001347', 'Nijbol Community Clinic', 'নিজবোল কমিউনিটি ক্লিনিক',
  'nijbol-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Hatsherpur', 'হাটশেরপুর', 'Nijbol Village',
  'নিজবোল গ্রাম, হাটশেরপুর, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01713-780147"]'::jsonb, 'nijbol@cc.dghs.gov.bd', 'http://hatsherpurup.bogra.gov.bd',
  24.9315, 89.5985, 'https://maps.google.com/?q=24.9315,89.5985', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান কেন্দ্র","পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001348', '10001348', 'Char Benupur Community Clinic', 'চর বেনুপুর কমিউনিটি ক্লিনিক',
  'char-benupur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Kazla', 'কাজলা', 'Char Benupur Island',
  'চর বেনুপুর চর এলাকা, কাজলা, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01713-780148"]'::jsonb, 'charbenupur@cc.dghs.gov.bd', 'http://kazlaup.bogra.gov.bd',
  24.8715, 89.6542, 'https://maps.google.com/?q=24.8715,89.6542', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চলের মা ও শিশু স্বাস্থ্য","বিনামূল্যে ওষুধ","স্বাভাবিক প্রসব রেফারেল","টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001349', '10001349', 'Ranirhat CC (Amrool)', 'রানীরহাট কমিউনিটি ক্লিনিক',
  'ranirhat-amrool-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Amrool', 'আমরুল', 'Ranirhat Bazar Area',
  'রানীরহাট বাজার সংলগ্ন, আমরুল, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-780149"]'::jsonb, 'ranirhatamrool@cc.dghs.gov.bd', 'http://amroolup.bogra.gov.bd',
  24.7125, 89.3752, 'https://maps.google.com/?q=24.7125,89.3752', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","প্রাথমিক স্বাস্থ্য সেবা","গর্ভবতী মায়েদের যত্ন","টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001350', '10001350', 'Rahimabad Community Clinic', 'রহিমাবাদ কমিউনিটি ক্লিনিক',
  'rahimabad-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Aria', 'আড়িয়া', 'Rahimabad Village',
  'রহিমাবাদ গ্রাম, আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-780150"]'::jsonb, 'rahimabad@cc.dghs.gov.bd', 'http://ariaup.bogra.gov.bd',
  24.7652, 89.4125, 'https://maps.google.com/?q=24.7652,89.4125', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","মা ও শিশু স্বাস্থ্য","পরিবার পরিকল্পনা পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001351', '10001351', 'Ranirpara Community Clinic', 'রানীরপাড়া কমিউনিটি ক্লিনিক',
  'ranirpara-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Ashekpur', 'আশেকপুর', 'Ranirpara Village',
  'রানীরপাড়া, আশেকপুর, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-780151"]'::jsonb, 'ranirpara@cc.dghs.gov.bd', 'http://ashekpurup.bogra.gov.bd',
  24.8012, 89.3452, 'https://maps.google.com/?q=24.8012,89.3452', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","গর্ভবতী সেবা","শিশু পুষ্টি পর্যবেক্ষণ","রেফারেল সার্ভিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001352', '10001352', 'Khadas Community Clinic', 'খাদাস কমিউনিটি ক্লিনিক',
  'khadas-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Chopinagar', 'চোপীনগর', 'Khadas Village',
  'খাদাস গ্রাম, চোপীনগর, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-780152"]'::jsonb, 'khadas@cc.dghs.gov.bd', 'http://chopinagarup.bogra.gov.bd',
  24.7412, 89.4452, 'https://maps.google.com/?q=24.7412,89.4452', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","বিনামূল্যে ওষুধ","টিকা কেন্দ্র","মা ও শিশু যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001353', '10001353', 'Goynaband Community Clinic', 'গয়নাবান্দ কমিউনিটি ক্লিনিক',
  'goynaband-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Kharna', 'খরনা', 'Goynaband Village',
  'গয়নাবান্দ গ্রাম, খরনা, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-780153"]'::jsonb, 'goynaband@cc.dghs.gov.bd', 'http://kharnaup.bogra.gov.bd',
  24.7315, 89.3985, 'https://maps.google.com/?q=24.7315,89.3985', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001354', '10001354', 'Bihigram Community Clinic', 'বিহিগ্রাম কমিউনিটি ক্লিনিক',
  'bihigram-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Majhira', 'মাঝিড়া', 'Bihigram Village',
  'বিহিগ্রাম, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-780154"]'::jsonb, 'bihigram@cc.dghs.gov.bd', 'http://mazhiraup.bogra.gov.bd',
  24.7824, 89.3952, 'https://maps.google.com/?q=24.7824,89.3952', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","পরিবার পরিকল্পনা পদ্ধতি","কৈশোরকালীন স্বাস্থ্য পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001355', '10001355', 'Belgari Community Clinic', 'বেলগাড়ী কমিউনিটি ক্লিনিক',
  'belgari-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Bhabanipur', 'ভবানীপুর', 'Belgari Village',
  'বেলগাড়ী গ্রাম, ভবানীপুর, শেরপুর, বগুড়া - ৫৮৪০', '["01713-780155"]'::jsonb, 'belgari@cc.dghs.gov.bd', 'http://bhabanipurup.bogra.gov.bd',
  24.6152, 89.3451, 'https://maps.google.com/?q=24.6152,89.3451', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","প্রাথমিক চিকিৎসা","মা ও শিশু স্বাস্থ্য","টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001356', '10001356', 'Raninagar Community Clinic', 'রানীনগর কমিউনিটি ক্লিনিক',
  'raninagar-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Bishalpur', 'বিশালপুর', 'Raninagar Village',
  'রানীনগর, বিশালপুর, শেরপুর, বগুড়া - ৫৮৪০', '["01713-780156"]'::jsonb, 'raninagar@cc.dghs.gov.bd', 'http://bishalpurup.bogra.gov.bd',
  24.6412, 89.3125, 'https://maps.google.com/?q=24.6412,89.3125', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","গর্ভবতী সেবা","পরিবার পরিকল্পনা পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001357', '10001357', 'Chokpathalia Community Clinic', 'চকপাথালিয়া কমিউনিটি ক্লিনিক',
  'chokpathalia-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Garidaha', 'গাড়ীদহ', 'Chokpathalia Village',
  'চকপাথালিয়া, গাড়ীদহ, শেরপুর, বগুড়া - ৫৮৪০', '["01713-780157"]'::jsonb, 'chokpathalia@cc.dghs.gov.bd', 'http://garidahaup.bogra.gov.bd',
  24.6915, 89.4125, 'https://maps.google.com/?q=24.6915,89.4125', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান কেন্দ্র","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001358', '10001358', 'Bilnalua Community Clinic', 'বিলনালুয়া কমিউনিটি ক্লিনিক',
  'bilnalua-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Khanpur', 'খানপুর', 'Bilnalua Village',
  'বিলনালুয়া গ্রাম, খানপুর, শেরপুর, বগুড়া - ৫৮৪০', '["01713-780158"]'::jsonb, 'bilnalua@cc.dghs.gov.bd', 'http://khanpurup.bogra.gov.bd',
  24.6812, 89.4892, 'https://maps.google.com/?q=24.6812,89.4892', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","ওষুধ সরবরাহ","গর্ভবতী মায়েদের পরামর্শ","শিশু পুষ্টি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001359', '10001359', 'Kalishahar Community Clinic', 'কালিশহর কমিউনিটি ক্লিনিক',
  'kalishahar-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Kusumbi', 'কুসুম্বী', 'Kalishahar Village',
  'কালিশহর গ্রাম, কুসুম্বী, শেরপুর, বগুড়া - ৫৮৪০', '["01713-780159"]'::jsonb, 'kalishahar@cc.dghs.gov.bd', 'http://kusumbiup.bogra.gov.bd',
  24.6512, 89.3752, 'https://maps.google.com/?q=24.6512,89.3752', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001360', '10001360', 'Chandaikona Border Community Clinic', 'চান্দাইকোনা বর্ডার কমিউনিটি ক্লিনিক',
  'chandaikona-border-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Shimabari', 'সীমাবাড়ী', 'Chandaikona Border Para',
  'চান্দাইকোনা সীমান্ত সংলগ্ন, সীমাবাড়ী, শেরপুর, বগুড়া - ৫৮৪০', '["01713-780160"]'::jsonb, 'chandaikona@cc.dghs.gov.bd', 'http://shimabariup.bogra.gov.bd',
  24.5815, 89.4512, 'https://maps.google.com/?q=24.5815,89.4512', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","বিনামূল্যে ওষুধ","পরিবার পরিকল্পনা পদ্ধতি","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001361', '10001361', 'Chokkanu Community Clinic', 'চককানু কমিউনিটি ক্লিনিক',
  'chokkanu-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Atmul', 'আটমূল', 'Chokkanu Village',
  'চককানু গ্রাম, আটমূল, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01713-780161"]'::jsonb, 'chokkanu@cc.dghs.gov.bd', 'http://atmulup.bogra.gov.bd',
  25.0412, 89.3125, 'https://maps.google.com/?q=25.0412,89.3125', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","প্রাথমিক চিকিৎসা","মা ও শিশু স্বাস্থ্য","টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001362', '10001362', 'Vasu Vihara Community Clinic', 'ভাসুবিহার কমিউনিটি ক্লিনিক',
  'vasu-vihara-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Bihar', 'বিহার', 'Vasu Vihara Archeological Site Area',
  'ভাসুবিহার প্রত্নতাত্ত্বিক এলাকা সংলগ্ন, বিহার, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01713-780162"]'::jsonb, 'vasuvihara@cc.dghs.gov.bd', 'http://biharup.bogra.gov.bd',
  24.9815, 89.3452, 'https://maps.google.com/?q=24.9815,89.3452', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","গর্ভবতী সেবা","পরিবার পরিকল্পনা পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001363', '10001363', 'Chondihara Community Clinic', 'চন্ডিহারা কমিউনিটি ক্লিনিক',
  'chondihara-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Buriganj', 'বুড়িগঞ্জ', 'Chondihara Village',
  'চন্ডিহারা গ্রাম, বুড়িগঞ্জ, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01713-780163"]'::jsonb, 'chondihara@cc.dghs.gov.bd', 'http://buriganjup.bogra.gov.bd',
  25.0125, 89.2892, 'https://maps.google.com/?q=25.0125,89.2892', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান কেন্দ্র","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001364', '10001364', 'Mahasthangarh Community Clinic', 'মহাস্থানগড় কমিউনিটি ক্লিনিক',
  'mahasthangarh-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Deuli', 'দেউলী', 'Mahasthangarh Rampart Area',
  'মহাস্থানগড় ঐতিহাসিক প্রাচীর সংলগ্ন, দেউলী, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01713-780164"]'::jsonb, 'mahasthangarh@cc.dghs.gov.bd', 'http://deuliup.bogra.gov.bd',
  24.9621, 89.3458, 'https://maps.google.com/?q=24.9621,89.3458', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চিকিৎসা","ওষুধ বিতরণ","ট্যুরিস্ট জরুরী ফার্স্ট এইড","মা ও শিশু যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001365', '10001365', 'Joypur Community Clinic', 'জয়পুর কমিউনিটি ক্লিনিক',
  'joypur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Kichak', 'কিচক', 'Joypur Village',
  'জয়পুর গ্রাম, কিচক, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01713-780165"]'::jsonb, 'joypur@cc.dghs.gov.bd', 'http://kichakup.bogra.gov.bd',
  25.0752, 89.2612, 'https://maps.google.com/?q=25.0752,89.2612', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001366', '10001366', 'Khamarpara Community Clinic', 'খামারপাড়া কমিউনিটি ক্লিনিক',
  'khamarpara-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Maidanhatta', 'ময়দানহাট্টা', 'Khamarpara Village',
  'খামারপাড়া গ্রাম, ময়দানহাট্টা, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01713-780166"]'::jsonb, 'khamarpara@cc.dghs.gov.bd', 'http://maidanhattaup.bogra.gov.bd',
  25.0215, 89.2315, 'https://maps.google.com/?q=25.0215,89.2315', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","বিনামূল্যে ওষুধ","পরিবার পরিকল্পনা পদ্ধতি","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001367', '10001367', 'Nishchintapur Community Clinic', 'নিশ্চিন্তপুর কমিউনিটি ক্লিনিক',
  'nishchintapur-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Balua', 'বালুয়া', 'Nishchintapur Village',
  'নিশ্চিন্তপুর গ্রাম, বালুয়া, সোনাতলা, বগুড়া - ৫৮২০', '["01713-780167"]'::jsonb, 'nishchintapur@cc.dghs.gov.bd', 'http://baluaup.bogra.gov.bd',
  24.9752, 89.5125, 'https://maps.google.com/?q=24.9752,89.5125', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ৩০ প্রকার ওষুধ","প্রাথমিক চিকিৎসা","মা ও শিশু স্বাস্থ্য","টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001368', '10001368', 'Tekani Community Clinic', 'তেকানী কমিউনিটি ক্লিনিক',
  'tekani-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Digdair', 'দিগদাইড়', 'Tekani Village',
  'তেকানী গ্রাম, দিগদাইড়, সোনাতলা, বগুড়া - ৫৮২০', '["01713-780168"]'::jsonb, 'tekani@cc.dghs.gov.bd', 'http://digdairup.bogra.gov.bd',
  25.0125, 89.4892, 'https://maps.google.com/?q=25.0125,89.4892', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক সেবা","ওষুধ বিতরণ","গর্ভবতী সেবা","পরিবার পরিকল্পনা পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001369', '10001369', 'Kalaihata Community Clinic', 'কালাইহাটা কমিউনিটি ক্লিনিক',
  'kalaihata-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Jorgachha', 'জোড়গাছা', 'Kalaihata Village',
  'কালাইহাটা গ্রাম, জোড়গাছা, সোনাতলা, বগুড়া - ৫৮২০', '["01713-780169"]'::jsonb, 'kalaihata@cc.dghs.gov.bd', 'http://jorgachhaup.bogra.gov.bd',
  24.9912, 89.5312, 'https://maps.google.com/?q=24.9912,89.5312', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান কেন্দ্র","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001370', '10001370', 'Huakuwa Community Clinic', 'হুয়াকুয়া কমিউনিটি ক্লিনিক',
  'huakuwa-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Madhupur', 'মধুপুর', 'Huakuwa Village',
  'হুয়াকুয়া গ্রাম, মধুপুর, সোনাতলা, বগুড়া - ৫৮২০', '["01713-780170"]'::jsonb, 'huakuwa@cc.dghs.gov.bd', 'http://madhupurup.bogra.gov.bd',
  25.0315, 89.4715, 'https://maps.google.com/?q=25.0315,89.4715', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য সেবা","ওষুধ সরবরাহ","গর্ভবতী মায়েদের পরামর্শ","শিশু পুষ্টি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001371', '10001371', 'Jamuna Char CC (Pakulla)', 'যমুনা চর কমিউনিটি ক্লিনিক',
  'jamuna-char-pakulla-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Pakulla', 'পাকুল্লা', 'Jamuna Char, Embankment Area',
  'যমুনা চর ও বাঁধ সংলগ্ন এলাকা, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০', '["01713-780171"]'::jsonb, 'jamunacharpakulla@cc.dghs.gov.bd', 'http://pakullaup.bogra.gov.bd',
  25.0215, 89.5714, 'https://maps.google.com/?q=25.0215,89.5714', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল জরুরী প্রাথমিক স্বাস্থ্য সেবা","বিনামূল্যে ওষুধ","মা ও শিশু যত্ন","ইপিআই টিকাদান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'cchst-cc-10001372', '10001372', 'Chukainagar Embankment Community Clinic', 'চুকাইনগর বাঁধ কমিউনিটি ক্লিনিক',
  'chukainagar-embankment-community-clinic', 'Community Clinic', 'community_clinic',
  'Community Clinic (CCHST)', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Tekani Chukainagar', 'তৈকানী চুকাইনগর', 'Chukainagar Flood Embankment',
  'চুকাইনগর বন্যা নিয়ন্ত্রণ বাঁধ সংলগ্ন, তৈকানী চুকাইনগর, সোনাতলা, বগুড়া - ৫৮২০', '["01713-780172"]'::jsonb, 'chukainagar@cc.dghs.gov.bd', 'http://tekanichukainagarup.bogra.gov.bd',
  25.0512, 89.5892, 'https://maps.google.com/?q=25.0512,89.5892', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চলের মা ও শিশু স্বাস্থ্য সেবা","বিনামূল্যে ৩০ প্রকার ওষুধ","পরিবার পরিকল্পনা পদ্ধতি","রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","http://communityclinic.gov.bd","https://dghs.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001111', '10001111', 'Shaheed Ziaur Rahman Medical College Hospital (SZRMCH)', 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল',
  'shaheed-ziaur-rahman-medical-college-hospital', 'Medical Colleges and Hospitals', 'tertiary_medical_college_hospital',
  'Medical College Hospital (1000 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Silimpur',
  'সিলিমপুর, মেডিকেল রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-60862","01711-820847","01730-324610"]'::jsonb, 'szrmch.bogra@gmail.com', 'http://szrmc.gov.bd',
  24.8194, 89.3625, 'https://maps.google.com/?q=24.8194,89.3625', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরী বিভাগ (Emergency)","নিবিড় পরিচর্যা কেন্দ্র (ICU)","করোনারি কেয়ার ইউনিট (CCU)","নবজাতক নিবিড় পরিচর্যা (NICU)","কিডনি ডায়ালাইসিস ইউনিট","বার্ন ও প্লাস্টিক সার্জারি ইউনিট","নিউরোসার্জারি ও অর্থোপেডিকস","কার্ডিওলজি ও কার্ডিওথোরাসিক সার্জারি","অনকোলজি ও ক্যান্সার ডে-কেয়ার","সিটি স্ক্যান ও এমআরআই (MRI)"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://szrmc.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001109', '10001109', 'Mohammad Ali 250-Bed District Hospital, Bogura', 'মোহাম্মদ আলী ২৫০ শয্যা বিশিষ্ট জেলা হাসপাতাল, বগুড়া',
  'mohammad-ali-250-bed-district-hospital', 'Government District Hospitals', 'secondary_district_hospital',
  'District Hospital (250 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Station Road, Hospital Area',
  'হাসপাতাল রোড, রেলওয়ে স্টেশন সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-66020","01730-324631"]'::jsonb, 'bogra250@hos.dghs.gov.bd', 'http://bogra250bedhospital.gov.bd',
  24.8475, 89.3758, 'https://maps.google.com/?q=24.8475,89.3758', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরী সেবা","২৫০ শয্যা ইনডোর ও আউটডোর চিকিৎসা","জেনারেল সার্জারি ও ল্যাপারোস্কোপিক সার্জারি","গাইনী ও প্রসূতি বিভাগ (CEmONC)","শিশুরোগ ও এসসিএনইউ (SCANU)","ডিজিটাল এক্স-রে ও অত্যাধুনিক প্যাথলজি","ডায়ালাইসিস ও ব্লাড ব্যাংক সেবা","করোনা ও আইসোলেশন ওয়ার্ড"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra250bedhospital.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001168', '10001168', 'Bogura Police Hospital', 'বগুড়া পুলিশ হাসপাতাল',
  'bogura-police-hospital', 'Government Specialized Hospitals', 'specialized_police_hospital',
  'Police Hospital (50 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Police Lines, Nishindara',
  'পুলিশ লাইন্স কম্পাউন্ড, নিশিন্দারা, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-373801","051-65522"]'::jsonb, 'policehospital.bogura@dghs.gov.bd', 'http://bogra.police.gov.bd',
  24.8624, 89.3615, 'https://maps.google.com/?q=24.8624,89.3615', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["পুলিশ সদস্য ও সাধারণ রোগীদের জরুরী চিকিৎসা","৫০ শয্যা ইনডোর সেবা","মেডিসিন ও অর্থোপেডিক আউটডোর","ডেন্টাল ইউনিট","প্যাথলজিক্যাল ল্যাবরেটরি","ফার্মেসী সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.police.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001169', '10001169', 'Bogura District Jail Hospital', 'বগুড়া জেলা কারাগার হাসপাতাল',
  'bogura-district-jail-hospital', 'Government Specialized Hospitals', 'prison_hospital',
  'Prison Hospital', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Bogra Central Jail Area',
  'বগুড়া জেলা কারাগার প্রাঙ্গণ, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-64531"]'::jsonb, 'jailhospital.bogura@dghs.gov.bd', 'http://prison.bogra.gov.bd',
  24.8512, 89.3824, 'https://maps.google.com/?q=24.8512,89.3824', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["কারাবন্দীদের জন্য ২৪/৭ চিকিৎসাসেবা","ইনপেশেন্ট পর্যবেক্ষণ ওয়ার্ড","মানসিক স্বাস্থ্য ও সাইকিয়াট্রিক পরামর্শ","সংক্রামক রোগ নিয়ন্ত্রণ ও চিকিৎসা","জরুরী রেফারেল ব্যবস্থা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://prison.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001170', '10001170', 'Santahar Railway Hospital, Bogura', 'সান্তাহার রেলওয়ে হাসপাতাল, বগুড়া',
  'santahar-railway-hospital', 'Government Specialized Hospitals', 'railway_hospital',
  'Railway Hospital (20 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Santahar', 'সান্তাহার', NULL,
  'রেলওয়ে স্টেশন কলোনি, সান্তাহার জংশন, আদমদীঘি, বগুড়া - ৫৮৯১', '["01711-692140","0741-62320"]'::jsonb, 'railwayhospital.santahar@dghs.gov.bd', 'http://railway.gov.bd',
  24.7891, 88.9482, 'https://maps.google.com/?q=24.7891,88.9482', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["রেলওয়ে কর্মকর্তা-কর্মচারী ও সাধারণ জনগণের বহির্বিভাগ সেবা","২০ শয্যা ইনডোর ওয়ার্ড","জরুরী ট্রমা ও প্রাথমিক চিকিৎসা","ফার্মেসী ও টিকাদান সেবা","নিয়মিত প্যাথলজি টেস্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://railway.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001171', '10001171', 'Bogura Chest Disease Hospital', 'বগুড়া বক্ষব্যাধি হাসপাতাল (যক্ষ্মা হাসপাতাল)',
  'bogura-chest-disease-hospital', 'Government Specialized Hospitals', 'chest_disease_hospital',
  'Chest Disease Hospital (20 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Malotinagar',
  'মালতীনগর, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-65489","01711-345892"]'::jsonb, 'cdh.bogura@dghs.gov.bd', 'http://bogra.gov.bd',
  24.8385, 89.3712, 'https://maps.google.com/?q=24.8385,89.3712', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["বিশেষায়িত বক্ষব্যাধি ও যক্ষ্মা (TB) চিকিৎসা","জিন-এক্সপার্ট (GeneXpert MTB/RIF) ল্যাব টেস্ট","২০ শয্যা ইনডোর বক্ষব্যাধি কেয়ার","অ্যাজমা ও সিওপিডি (COPD) ক্লিনিক","ডিজিটাল চেস্ট এক্স-রে"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001172', '10001172', 'Bogura Chest Disease Clinic (TB Clinic)', 'বগুড়া বক্ষব্যাধি ক্লিনিক (টিবি ক্লিনিক)',
  'bogura-chest-disease-clinic', 'Government Specialized Hospitals', 'chest_disease_clinic',
  'Chest Disease Clinic', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Barogola / Jaleshwaritola',
  'বড়গোলা, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-67891"]'::jsonb, 'cdc.bogura@dghs.gov.bd', 'http://bogra.gov.bd',
  24.8521, 89.3695, 'https://maps.google.com/?q=24.8521,89.3695', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিনামূল্যে ডটস (DOTS) যক্ষ্মা চিকিৎসা ও ওষুধ বিতরণ","কফ ও স্পুটাম মাইক্রোস্কোপি টেস্ট","বক্ষব্যাধি বহির্বিভাগ ও স্বাস্থ্য শিক্ষা","যোগাযোগকারী সনাক্তকরণ ও স্ক্রিনিং"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001173', '10001173', 'Maternal and Child Welfare Centre (MCWC), Bogura', 'মা ও শিশু কল্যাণ কেন্দ্র (MCWC), বগুড়া',
  'mcwc-bogura', 'Government Specialized Hospitals', 'maternal_child_welfare_centre',
  'Maternal & Child Welfare Centre (20 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Thana Road',
  'থানা রোড, কাটনারপাড়া সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-66712","01712-458921"]'::jsonb, 'mcwc.bogura@dgfp.gov.bd', 'http://dgfp.bogra.gov.bd',
  24.8489, 89.3715, 'https://maps.google.com/?q=24.8489,89.3715', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরি প্রসূতি সেবা (CEmONC)","স্বাভাবিক প্রসব ও সিজারিয়ান সেকশন অপারেশন","গর্ভকালীন (ANC) ও প্রসবোত্তর (PNC) যত্ন","নবজাতকের জরুরি স্বাস্থ্য সেবা","স্থায়ী ও দীর্ঘমেয়াদী পরিবার পরিকল্পনা পদ্ধতি","কৈশোরবান্ধব স্বাস্থ্য সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dgfp.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001174', '10001174', 'Sonatala 20-Bed Specialized Hospital', 'সোনাতলা ২০ শয্যা বিশিষ্ট হাসপাতাল',
  'sonatala-20-bed-hospital', 'Government Specialized Hospitals', 'specialized_upazila_hospital',
  'Upazila 20-Bed Hospital', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Balua', 'বালুয়া', NULL,
  'বালুয়া হাট সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০', '["01730-324632","01712-985612"]'::jsonb, 'sonatala20bed@hos.dghs.gov.bd', 'http://sonatala.bogra.gov.bd',
  24.9824, 89.5215, 'https://maps.google.com/?q=24.9824,89.5215', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["২৪ ঘন্টা জরুরী চিকিৎসা সেবা","২০ শয্যা অন্তর্বিভাগ চিকিৎসা","স্বাভাবিক প্রসব সেবা ও রেফারেল","মাইনর সার্জারি ও ফার্স্ট এইড","প্যাথলজিক্যাল ল্যাব টেস্ট ও আল্ট্রাসনোগ্রাফি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001175', '10001175', 'Chandanbaisha 20-Bed Riverine Hospital, Sariakandi', 'চন্দনবাইশা ২০ শয্যা বিশিষ্ট হাসপাতাল, সারিয়াকান্দি',
  'chandanbaisha-20-bed-hospital', 'Government Specialized Hospitals', 'riverine_char_hospital',
  'Upazila 20-Bed Hospital', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Chandanbaisha', 'চন্দনবাইশা', NULL,
  'চন্দনবাইশা বাজার, যমুনা নদী তীরবর্তী অঞ্চল, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324633","01714-889922"]'::jsonb, 'chandanbaisha20bed@hos.dghs.gov.bd', 'http://sariakandi.bogra.gov.bd',
  24.8452, 89.6152, 'https://maps.google.com/?q=24.8452,89.6152', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["যমুনা চরাঞ্চলের জরুরি চিকিৎসা সেবা","২০ শয্যা ইনডোর ওয়ার্ড","সাপের কামড়ের অ্যান্টিভেনম চিকিৎসা (Snakebite Management)","বন্যা ও দুর্যোগকালীন জরুরি মেডিক্যাল রেসপন্স","নিরাপদ প্রসব ও মাতৃস্বাস্থ্য সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001176', '10001176', 'Talora 20-Bed Hospital, Dhupchanchia', 'তালোড়া ২০ শয্যা বিশিষ্ট হাসপাতাল, দুপচাঁচিয়া',
  'talora-20-bed-hospital', 'Government Specialized Hospitals', 'specialized_upazila_hospital',
  'Upazila 20-Bed Hospital', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Talora', 'তালোড়া', NULL,
  'তালোড়া শিল্প এলাকা, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-324634","01712-441199"]'::jsonb, 'talora20bed@hos.dghs.gov.bd', 'http://dhupchanchia.bogra.gov.bd',
  24.8362, 89.1624, 'https://maps.google.com/?q=24.8362,89.1624', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["শিল্প এলাকার শ্রমিক ও জনগণের জরুরী ট্রমা চিকিৎসা","২০ শয্যা অন্তর্বিভাগ সেবা","বহির্বিভাগে অভিজ্ঞ চিকিৎসক পরামর্শ","মাতৃ ও শিশু স্বাস্থ্য সেবা","নিয়মিত টিকাদান কার্যক্রম"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001177', '10001177', 'Bhandarbari 10-Bed Char Hospital, Dhunat', 'ভান্ডারবাড়ী ১০ শয্যা বিশিষ্ট চর হাসপাতাল, ধুনট',
  'bhandarbari-10-bed-hospital', 'Government Specialized Hospitals', 'riverine_char_hospital',
  'Char Specialized Hospital (10 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Bhandarbari', 'ভান্ডারবাড়ী', NULL,
  'ভান্ডারবাড়ী বন্যা নিয়ন্ত্রণ বাঁধ সংলগ্ন, ধুনট, বগুড়া - ৫৮৫০', '["01730-324635","01715-662288"]'::jsonb, 'bhandarbari10bed@hos.dghs.gov.bd', 'http://dhunat.bogra.gov.bd',
  24.6612, 89.6195, 'https://maps.google.com/?q=24.6612,89.6195', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল নদীমাতৃক জরুরী চিকিৎসা সেবা","১০ শয্যা ইনডোর পর্যবেক্ষণ","ডায়রিয়া ও পানিবাহিত রোগের জরুরি ব্যবস্থাপনা","প্রসব সেবা ও রেফারেল","জরুরী ফার্স্ট এইড ও সর্পদংশন চিকিৎসা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001178', '10001178', 'Sherpur Maternal & Child Welfare Centre (MCWC)', 'শেরপুর মা ও শিশু কল্যাণ কেন্দ্র (MCWC)',
  'sherpur-mcwc', 'Government Specialized Hospitals', 'maternal_child_welfare_centre',
  'Maternal & Child Welfare Centre (10 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  NULL, NULL, 'Sherpur Pourashava Area',
  'পৌরসভা রোড, শেরপুর, বগুড়া - ৫৮৪০', '["01712-895621","05029-77210"]'::jsonb, 'mcwc.sherpur@dgfp.gov.bd', 'http://sherpur.bogra.gov.bd',
  24.6782, 89.4285, 'https://maps.google.com/?q=24.6782,89.4285', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ স্বাভাবিক প্রসব ও জরুরি ধাত্রীবিদ্যা","১০ শয্যা প্রসূতি ইনডোর ওয়ার্ড","গর্ভবতী মায়েদের প্রসবপূর্ব ও প্রসবোত্তর চেকআপ","নবজাতক টিকাদান ও পুষ্টি সেবা","পরিবার পরিকল্পনা ক্লিনিক্যাল মেথডস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001179', '10001179', 'Shibganj Highway Trauma & Emergency Centre', 'শিবগঞ্জ ট্রমা ও জরুরী সেবা কেন্দ্র (মোকামতলা)',
  'shibganj-trauma-emergency-centre', 'Government Specialized Hospitals', 'highway_trauma_centre',
  'Specialized Highway Trauma Centre', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Mokamtala', 'মোকামতলা', NULL,
  'ঢাকা-বগুড়া-রংপুর মহাসড়ক সংযোগস্থল, মোকামতলা, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-324636","01716-554433"]'::jsonb, 'trauma.mokamtala@hos.dghs.gov.bd', 'http://shibganj.bogra.gov.bd',
  25.0012, 89.3512, 'https://maps.google.com/?q=25.0012,89.3512', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মহাসড়ক সড়ক দুর্ঘটনার জরুরী চিকিৎসা ও ট্রমা রিসাসিটেশন","ফ্র্যাকচার ও অস্থিভঙ্গ জরুরি ইমোবিলাইজেশন","জরুরী রক্তপাত নিয়ন্ত্রণ ও অক্সিজেন সাপোর্ট","মেডিকেল কলেজ হাসপাতালে দ্রুত অ্যাম্বুলেন্স রেফারেল","২৪/৭ জরুরী মেডিক্যাল টিম"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001180', '10001180', 'Gabtali Rural Eye & Specialized Care Hospital', 'গাবতলী গ্রামীণ চক্ষু ও বিশেষায়িত সেবা কেন্দ্র',
  'gabtali-rural-eye-specialized-hospital', 'Government Specialized Hospitals', 'specialized_eye_care_hospital',
  'Specialized Eye Hospital (10 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Gabtali Sadar', 'গাবতলী সদর', NULL,
  'থানা মোড়, গাবতলী, বগুড়া - ৫৮২০', '["01730-324637","01712-337711"]'::jsonb, 'eye.gabtali@hos.dghs.gov.bd', 'http://gabtali.bogra.gov.bd',
  24.8785, 89.4621, 'https://maps.google.com/?q=24.8785,89.4621', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক চক্ষু চিকিৎসা ও দৃষ্টি পরীক্ষা","ছানিপড়া (Cataract) স্ক্রিনিং ও লেন্স প্রতিস্থাপন রেফারেল","গ্লুকোমা ও অন্ধত্ব প্রতিরোধ কার্যক্রম","১০ শয্যা প্রাথমিক পর্যবেক্ষণ ওয়ার্ড","সাধারণ রোগীর বহির্বিভাগীয় পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001181', '10001181', 'Kahalu Specialized NCD & Diabetes Centre', 'কাহালু বিশেষায়িত এনসিডি ও ডায়াবেটিস সেন্টার',
  'kahalu-specialized-ncd-diabetes-centre', 'Government Specialized Hospitals', 'specialized_ncd_centre',
  'Specialized NCD Care Hospital', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahalu Sadar', 'কাহালু সদর', NULL,
  'হাসপাতাল রোড, কাহালু, বগুড়া - ৫৮৭০', '["01730-324638","01718-223344"]'::jsonb, 'ncd.kahalu@hos.dghs.gov.bd', 'http://kahalu.bogra.gov.bd',
  24.8295, 89.2612, 'https://maps.google.com/?q=24.8295,89.2612', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["ডায়াবেটিস ও উচ্চ রক্তচাপের দীর্ঘমেয়াদী নিয়ন্ত্রণ ও সেবা","হৃদরোগ ও কার্ডিওভাসকুলার রিস্ক স্ক্রিনিং","ইসিজি (ECG) ও বায়োকেমিক্যাল ল্যাব টেস্ট","স্বাস্থ্যকর খাদ্যতালিকা ও পুষ্টি পরামর্শ","বিনামূল্যে ইনসুলিন ও এনসিডি ওষুধ বিতরণ কর্নার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001182', '10001182', 'Nandigram Rural Maternity Centre', 'নন্দীগ্রাম গ্রামীণ প্রসূতি সেবা কেন্দ্র',
  'nandigram-rural-maternity-centre', 'Government Specialized Hospitals', 'rural_maternity_centre',
  'Rural Maternity Hospital (10 Bed)', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', NULL,
  'ওমরপুর বাজার সংলগ্ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-324639","01719-887766"]'::jsonb, 'maternity.nandigram@hos.dghs.gov.bd', 'http://nandigram.bogra.gov.bd',
  24.6852, 89.1824, 'https://maps.google.com/?q=24.6852,89.1824', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ স্বাভাবিক প্রসব ও মিডওয়াইফারি কেয়ার","১০ শয্যা প্রসব পরবর্তী নিবিড় পর্যবেক্ষণ ওয়ার্ড","গর্ভকালীন চেকআপ ও রক্তাল্পতা প্রতিরোধ","ক্যাঙ্গারু মাদার কেয়ার (KMC) ইউনিট","ইপিআই টিকাদান ও পরিবার পরিকল্পনা পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'gov-hosp-10001183', '10001183', 'Shajahanpur Highway Emergency Response Unit', 'শাজাহানপুর মহাসড়ক জরুরী সেবা কেন্দ্র',
  'shajahanpur-highway-emergency-unit', 'Government Specialized Hospitals', 'highway_emergency_unit',
  'Highway Emergency Response Unit', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Aria', 'আড়িয়া', NULL,
  'ঢাকা-বগুড়া মহাসড়ক (নয়মাইল মোড়), আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১', '["01730-324640","01711-229988"]'::jsonb, 'highway.shajahanpur@hos.dghs.gov.bd', 'http://shajahanpur.bogra.gov.bd',
  24.7612, 89.4085, 'https://maps.google.com/?q=24.7612,89.4085', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["মহাসড়ক দ্রুত জরুরী রেসপন্স ও এক্সিডেন্ট ফার্স্ট এইড","মারাত্মক আঘাতপ্রাপ্তদের স্থিতিশীলকরণ ও সিপিআর","জরুরী অক্সিজেন ও রক্তক্ষরণ নিয়ন্ত্রণ","শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতালে রেফারেল","২৪/৭ এয়ারওয়ে ও লাইফ সাপোর্ট সহায়তা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001001', '20001001', 'TMSS Medical College & Rafatullah Community Hospital (TMC & RCH)', 'টিএমএসএস মেডিকেল কলেজ ও রফাতুল্লাহ কমিউনিটি হাসপাতাল',
  'tmss-medical-college-rafatullah-community-hospital', 'Medical Colleges and Hospitals', 'private_medical_college_hospital',
  'Private Medical College Hospital (1000 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Gokul', 'গোকুল', 'Thengamara, Rangpur Road',
  'ঠেঙ্গামারা, রংপুর রোড, গোকুল, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-78567","01711-426749","01755-630222"]'::jsonb, 'tmcrch@tmsshealth.com', 'https://tmsshealth.com',
  24.8985, 89.3512, 'https://maps.google.com/?q=24.8985,89.3512', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["১০০০ শয্যা বিশেষায়িত ইনডোর ও আউটডোর সেবা","২৪/৭ জরুরী ও ট্রমা কেয়ার","আইসিইউ (ICU), সিসিইউ (CCU), এনআইসিইউ (NICU)","কিডনি ডায়ালাইসিস ও নেফ্রোলজি সেন্টার","ক্যান্সার ও অনকোলজি রেডিওথেরাপি","কার্ডিয়াক ক্যাথল্যাব ও বাইপাস সার্জারি","এমআরআই (1.5 Tesla MRI) ও ১২৮ স্লাইস সিটি স্ক্যান"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001002', '20001002', 'Popular Hospital & Consultation Centre, Bogura', 'পপুলার হাসপাতাল ও কনসালটেশন সেন্টার, বগুড়া',
  'popular-hospital-bogura', 'Private Hospitals', 'private_specialized_hospital',
  'Private General Hospital (100 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Thana Road, Jaleshwaritola',
  'থানা রোড, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-69361","01755-667788","09613-787807"]'::jsonb, 'bogra@popular.com.bd', 'https://popular.com.bd',
  24.8512, 89.3725, 'https://maps.google.com/?q=24.8512,89.3725', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরী সেবা ও ইনডোর কেয়ার","মডার্ন অপারেশন থিয়েটার (OT)","ল্যাপারোস্কোপিক জেনারেল সার্জারি","গাইনী ও প্রসূতি সেবা","ডিজিটাল এক্স-রে ও অটোমেটেড প্যাথলজি","আইসিইউ ও এইচডিইউ সাপোর্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://popular.com.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001003', '20001003', 'Ibn Sina Hospital & Diagnostic Centre, Bogura', 'ইবনে সিনা হাসপাতাল ও ডায়াগনস্টিক সেন্টার, বগুড়া',
  'ibn-sina-hospital-bogura', 'Private Hospitals', 'private_specialized_hospital',
  'Private General Hospital (100 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Kanochgari, Sherpur Road',
  'কানোচগাড়ী, শেরপুর রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-69234","01713-334455","09610-010615"]'::jsonb, 'bogra@ibnsinatrust.com', 'https://ibnsinatrust.com',
  24.8385, 89.3712, 'https://maps.google.com/?q=24.8385,89.3712', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ বিশেষজ্ঞ চিকিৎসক পরামর্শ ও ইনডোর চিকিৎসা","মডার্ন আইসিইউ (ICU) ও এনআইসিইউ (NICU)","হৃদরোগ ও মেডিসিন ইউনিট","অর্থোপেডিক ও জয়েন্ট রিপ্লেসমেন্ট সার্জারি","ডিজিটাল ম্যামোগ্রাফি ও কালার ডপলার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://ibnsinatrust.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001004', '20001004', 'Bogura Christian Mission Hospital', 'বগুড়া খ্রিস্টান মিশন হাসপাতাল',
  'bogura-christian-mission-hospital', 'Private Hospitals', 'private_charitable_hospital',
  'Charitable Hospital (75 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Thana Road, Church Compound',
  'থানা রোড, মিশন কম্পাউন্ড, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-66432","01711-987654"]'::jsonb, 'missionhospital.bogura@gmail.com', 'http://bogra.gov.bd',
  24.8462, 89.3705, 'https://maps.google.com/?q=24.8462,89.3705', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["সুলভ মূল্যে সাধারণ চিকিৎসা ও শয্যা সেবা","মাতৃ ও শিশু স্বাস্থ্য সেবা","স্বাভাবিক প্রসব ও সিজারিয়ান সেকশন","চক্ষু ও সাধারণ বহির্বিভাগীয় চিকিৎসা","দরিদ্র রোগীদের জন্য বিশেষ স্বাস্থ্য তহবিল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001005', '20001005', 'Shamsuddin Memorial Hospital, Bogura', 'শামসুদ্দীন মেমোরিয়াল হাসপাতাল, বগুড়া',
  'shamsuddin-memorial-hospital-bogura', 'Private Hospitals', 'private_general_hospital',
  'Private General Hospital (50 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Kalitala, Station Road',
  'কালীতলা, স্টেশন রোড সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-62890","01712-113355"]'::jsonb, 'shamsuddinhospital.bgr@gmail.com', 'http://bogra.gov.bd',
  24.8495, 89.3782, 'https://maps.google.com/?q=24.8495,89.3782', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["৫০ শয্যা ইনডোর চিকিৎসা","জেনারেল সার্জারি ও ইউরোলজি","গাইনী ও প্রসূতি ওয়ার্ড","২৪ ঘন্টা ফার্মেসী ও জরুরী সেবা","রুটিন প্যাথলজিক্যাল ইনভেস্টিগেশন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001006', '20001006', 'Rainbow Hospital & Diagnostic Centre, Bogura', 'রেইনবো হাসপাতাল ও ডায়াগনস্টিক সেন্টার, বগুড়া',
  'rainbow-hospital-bogura', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital & Clinic (50 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Silimpur, Medical Road',
  'মেডিকেল কলেজ রোড, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '["01711-223344","051-64112"]'::jsonb, 'rainbowhospital.bogra@gmail.com', 'http://bogra.gov.bd',
  24.8215, 89.3638, 'https://maps.google.com/?q=24.8215,89.3638', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরী ট্রমা ও ক্যাজুয়ালটি সেবা","মেডিকেল কলেজ সংলগ্ন বিশেষজ্ঞ কনসালটেশন","আধুনিক অপারেশন থিয়েটার","ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসনোগ্রাম","পোস্ট-অপারেটিভ নিবিড় পর্যবেক্ষণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001007', '20001007', 'Prime Clinic & Hospital, Bogura', 'প্রাইম ক্লিনিক অ্যান্ড হাসপাতাল, বগুড়া',
  'prime-clinic-hospital-bogura', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (30 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Jaleshwaritola',
  'জলেশ্বরীতলা মেইন রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-67123","01715-998811"]'::jsonb, 'primeclinic.bogra@yahoo.com', 'http://bogra.gov.bd',
  24.8532, 89.3685, 'https://maps.google.com/?q=24.8532,89.3685', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["বিশেষজ্ঞ ডাক্তারদের নিয়মিত চেম্বার","৩০ শয্যা কেবিন ও জেনারেল ওয়ার্ড","ল্যাপারোস্কোপি ও কসমেটিক সার্জারি","ইসিজি ও আধুনিক ল্যাবরেটরি সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001008', '20001008', 'Santahar General Hospital & Clinic', 'সান্তাহার জেনারেল হাসপাতাল ও ক্লিনিক',
  'santahar-general-hospital-clinic', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (25 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Santahar', 'সান্তাহার', 'Rail Gate Area, Santahar Pourashava',
  'রেলগেট এলাকা, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১', '["01712-349811","0741-62450"]'::jsonb, 'santahargeneralhospital@gmail.com', 'http://santahar.bogra.gov.bd',
  24.7865, 88.9492, 'https://maps.google.com/?q=24.7865,88.9492', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["২৫ শয্যা ইনডোর ও কেবিন সুবিধা","২৪ ঘন্টা জরুরী ডেলিভারি ও সিজারিয়ান অপারেশন","জেনারেল সার্জারি ও অর্থোপেডিক ফার্স্ট এইড","ডিজিটাল এক্স-রে ও ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://santahar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001009', '20001009', 'Sheba Clinic & Diagnostic Centre, Adamdighi', 'সেবা ক্লিনিক অ্যান্ড ডায়াগনস্টিক সেন্টার, আদমদীঘি',
  'sheba-clinic-adamdighi', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (20 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Adamdighi Sadar', 'আদমদীঘি সদর', 'Bus Stand Area',
  'আদমদীঘি বাসস্ট্যান্ড রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '["01718-456712"]'::jsonb, 'shebaclinic.adamdighi@gmail.com', 'http://adamdighi.bogra.gov.bd',
  24.7782, 88.9954, 'https://maps.google.com/?q=24.7782,88.9954', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["ইনপেশেন্ট কেয়ার ও নরমাল ডেলিভারি","বহির্বিভাগ বিশেষজ্ঞ ডাক্তার কনসালটেশন","আল্ট্রাসনোগ্রাফি ও রক্তের সম্পূর্ণ পরীক্ষা","২৪ ঘন্টা ফার্মেসী সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001010', '20001010', 'Dhunat Central Clinic & Nursing Home', 'ধুনট সেন্ট্রাল ক্লিনিক অ্যান্ড নার্সিং হোম',
  'dhunat-central-clinic-nursing-home', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (20 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Sadar', 'ধুনট সদর', 'Thana Road, Dhunat Bazar',
  'থানা রোড, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০', '["01715-442299","01722-881144"]'::jsonb, 'dhunatcentralclinic@gmail.com', 'http://dhunat.bogra.gov.bd',
  24.6752, 89.5385, 'https://maps.google.com/?q=24.6752,89.5385', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরী প্রসূতি ও ডেলিভারি সেবা","সিজারিয়ান সেকশন ও এ্যাপেন্ডিসাইটিস অপারেশন","২০ শয্যা নার্সিং হোম ওয়ার্ড ও কেবিন","প্যাথলজিক্যাল ডায়াগনস্টিক ল্যাব"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001011', '20001011', 'Bikrampur Model Clinic, Dhunat', 'বিক্রমপুর মডেল ক্লিনিক, ধুনট',
  'bikrampur-model-clinic-dhunat', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (15 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Sadar', 'ধুনট সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট, বগুড়া - ৫৮৫০', '["01716-889900"]'::jsonb, 'bikrampurclinic.dhunat@gmail.com', 'http://dhunat.bogra.gov.bd',
  24.6785, 89.5412, 'https://maps.google.com/?q=24.6785,89.5412', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["১৫ শয্যা ইনডোর কেয়ার","গাইনী ও প্রসূতি কনসালটেশন","সাধারণ রোগীর চিকিৎসা ও ওষুধ বিতরণ","আল্ট্রাসনোগ্রাম ও ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001012', '20001012', 'Dhupchanchia General Hospital & Nursing Home', 'দুপচাঁচিয়া জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম',
  'dhupchanchia-general-hospital-nursing-home', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (30 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dhupchanchia Sadar', 'দুপচাঁচিয়া সদর', 'Bogura-Naogaon Highway',
  'বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01712-665544","01720-334411"]'::jsonb, 'dhupchanchiageneral@gmail.com', 'http://dhupchanchia.bogra.gov.bd',
  24.8752, 89.1712, 'https://maps.google.com/?q=24.8752,89.1712', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["৩০ শয্যা ইনডোর ও পোস্ট-অপারেটিভ কেয়ার","২৪ ঘন্টা অপারেশন থিয়েটার সুবিধা","মহাসড়ক এক্সিডেন্ট ইমার্জেন্সি কেয়ার","অর্থোপেডিক ও প্রসূতি সার্জারি","কম্পিউটারাইজড প্যাথলজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001013', '20001013', 'Talora Digital Clinic & Hospital', 'তালোড়া ডিজিটাল ক্লিনিক অ্যান্ড হাসপাতাল',
  'talora-digital-clinic-hospital', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (15 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Talora', 'তালোড়া', 'Railway Station Road, Talora',
  'রেলওয়ে স্টেশন রোড, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01714-332211"]'::jsonb, 'taloradigitalclinic@gmail.com', 'http://taloraup.bogra.gov.bd',
  24.8345, 89.1595, 'https://maps.google.com/?q=24.8345,89.1595', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["১৫ শয্যা ইনডোর সেবা","স্বাভাবিক প্রসব ও জরুরি রেফারেল","ডিজিটাল এক্স-রে ও বায়োকেমিস্ট্রি টেস্ট","২৪ ঘন্টা ফার্মেসী"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://taloraup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001014', '20001014', 'Gabtali Central Hospital & Consultation Centre', 'গাবতলী সেন্ট্রাল হাসপাতাল ও কনসালটেশন সেন্টার',
  'gabtali-central-hospital', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (25 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Gabtali Sadar', 'গাবতলী সদর', 'Thana Mor',
  'থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '["01713-998877","01725-112233"]'::jsonb, 'gabtalicentralhospital@gmail.com', 'http://gabtali.bogra.gov.bd',
  24.8812, 89.4635, 'https://maps.google.com/?q=24.8812,89.4635', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["২৫ শয্যা কেবিন ও জেনারেল ইনডোর ওয়ার্ড","২৪/৭ জরুরী বিভাগ ও ডেলিভারি ইউনিট","জেনারেল সার্জারি ও গাইনী অপারেশন","আল্ট্রাসনোগ্রাফি ও ডায়াগনস্টিক ল্যাব"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001015', '20001015', 'Sonaray Health Care Clinic, Gabtali', 'সোনারায় হেলথ কেয়ার ক্লিনিক, গাবতলী',
  'sonaray-health-care-clinic-gabtali', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (15 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Sonaray', 'সোনারায়', 'Sonaray Bazar',
  'সোনারায় বাজার রোড, সোনারায়, গাবতলী, বগুড়া - ৫৮২০', '["01718-221144"]'::jsonb, 'sonarayclinic@gmail.com', 'http://sonarayup.bogra.gov.bd',
  24.8524, 89.4752, 'https://maps.google.com/?q=24.8524,89.4752', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["১৫ শয্যা গ্রামীণ ইনডোর সেবা","মা ও শিশু পরিচর্যা","নরমাল ডেলিভারি ও প্রাথমিক চিকিৎসা","ইসিজি ও রুটিন রক্ত পরীক্ষা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sonarayup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001016', '20001016', 'Kahalu Model Clinic & Nursing Home', 'কাহালু মডেল ক্লিনিক অ্যান্ড নার্সিং হোম',
  'kahalu-model-clinic-nursing-home', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (20 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahalu Sadar', 'কাহালু সদর', 'Rail Gate Area',
  'রেলগেট সংলগ্ন, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '["01711-778899","01724-556677"]'::jsonb, 'kahalumodelclinic@gmail.com', 'http://kahalu.bogra.gov.bd',
  24.8275, 89.2635, 'https://maps.google.com/?q=24.8275,89.2635', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["২০ শয্যা ইনডোর ও প্রসূতি সেবা","জরুরী সিজারিয়ান সেকশন ও এ্যাপেন্ডিক্স অপারেশন","আল্ট্রাসনোগ্রাম ও ডিজিটাল এক্স-রে","২৪ ঘন্টা অ্যাম্বুলেন্স সহায়তা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001017', '20001017', 'Murail Health Care & Clinic, Kahalu', 'মুরইল হেলথ কেয়ার অ্যান্ড ক্লিনিক, কাহালু',
  'murail-health-care-clinic-kahalu', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (15 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Murail', 'মুরইল', 'Murail Bazar',
  'মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০', '["01716-334477"]'::jsonb, 'murailhealthcare@gmail.com', 'http://murailup.bogra.gov.bd',
  24.7985, 89.2412, 'https://maps.google.com/?q=24.7985,89.2412', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["১৫ শয্যা ইনডোর পর্যবেক্ষণ","প্রাথমিক সার্জারি ও ফার্স্ট এইড","স্বাভাবিক প্রসব সেবা","প্যাথলজিক্যাল পরীক্ষা নিরীক্ষা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://murailup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001018', '20001018', 'Nandigram General Hospital & Nursing Home', 'নন্দীগ্রাম জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম',
  'nandigram-general-hospital-nursing-home', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (25 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Bus Stand Area',
  'বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01712-887711","01726-443322"]'::jsonb, 'nandigramgeneralhospital@gmail.com', 'http://nandigram.bogra.gov.bd',
  24.6785, 89.1912, 'https://maps.google.com/?q=24.6785,89.1912', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["২৫ শয্যা ইনডোর ও কেবিন চিকিৎসা","২৪ ঘন্টা জরুরি সেবা ও অপারেশন থিয়েটার","গাইনী ও প্রসূতি সার্জারি","ডিজিটাল এক্স-রে ও ল্যাবরেটরি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001019', '20001019', 'Omarpur Central Clinic, Nandigram', 'ওমরপুর সেন্ট্রাল ক্লিনিক, নন্দীগ্রাম',
  'omarpur-central-clinic-nandigram', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (15 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Omarpur, Natore Highway',
  'বগুড়া-নাটোর মহাসড়ক, ওমরপুর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01715-667788"]'::jsonb, 'omarpurclinic@gmail.com', 'http://nandigram.bogra.gov.bd',
  24.6885, 89.1845, 'https://maps.google.com/?q=24.6885,89.1845', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["১৫ শয্যা ইনডোর ওয়ার্ড","মহাসড়ক জরুরী দুর্ঘটনা চিকিৎসা","স্বাভাবিক প্রসব সেবা","প্যাথলজি ও ফার্মেসী"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001020', '20001020', 'Sariakandi Jamuna Clinic & Nursing Home', 'সারিয়াকান্দি যমুনা ক্লিনিক অ্যান্ড নার্সিং হোম',
  'sariakandi-jamuna-clinic-nursing-home', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (20 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Sariakandi Sadar', 'সারিয়াকান্দি সদর', 'Thana Road, Sariakandi Bazar',
  'থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01714-556677","01723-998811"]'::jsonb, 'jamunaclinic.sariakandi@gmail.com', 'http://sariakandi.bogra.gov.bd',
  24.8892, 89.5685, 'https://maps.google.com/?q=24.8892,89.5685', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["২০ শয্যা ইনডোর ও কেবিন সুবিধা","নদী তীরবর্তী জরুরি প্রসূতি ও ডেলিভারি সেবা","সিজারিয়ান ও জেনারেল সার্জারি","সাপের কামড়ের প্রাথমিক ব্যবস্থাপনা ও রেফারেল","প্যাথলজিক্যাল পরীক্ষা ও আল্ট্রাসনোগ্রাম"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001021', '20001021', 'Chandanbaisha Seba Clinic, Sariakandi', 'চন্দনবাইশা সেবা ক্লিনিক, সারিয়াকান্দি',
  'chandanbaisha-seba-clinic-sariakandi', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (15 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Chandanbaisha', 'চন্দনবাইশা', 'Chandanbaisha Bazar',
  'চন্দনবাইশা বাজার সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01716-443322"]'::jsonb, 'chandanbaishasebaclinic@gmail.com', 'http://chandanbaishaup.bogra.gov.bd',
  24.8465, 89.6135, 'https://maps.google.com/?q=24.8465,89.6135', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["১৫ শয্যা চরাঞ্চল ইনডোর চিকিৎসা","স্বাভাবিক প্রসব সেবা ও মা ও শিশু যত্ন","জরুরী ফার্স্ট এইড ও ড্রেসিং","ফার্মেসী ও ল্যাব সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://chandanbaishaup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001022', '20001022', 'Majhira Cantonment General Hospital & Clinic', 'মাঝিড়া ক্যান্টনমেন্ট জেনারেল হাসপাতাল অ্যান্ড ক্লিনিক',
  'majhira-cantonment-general-hospital', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (30 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Majhira', 'মাঝিড়া', 'Cantonment Gate, Dhaka Road',
  'বগুড়া সেনানিবাস গেট সংলগ্ন, ঢাকা রোড, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-445566","01727-889900"]'::jsonb, 'mafhirahospital@gmail.com', 'http://shajahanpur.bogra.gov.bd',
  24.7812, 89.3945, 'https://maps.google.com/?q=24.7812,89.3945', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["৩০ শয্যা ইনডোর ও পোস্ট-অপারেটিভ ওয়ার্ড","২৪/৭ জরুরী ট্রমা ও ক্যাজুয়ালটি সেবা","জেনারেল সার্জারি ও গাইনী অপারেশন","ডিজিটাল এক্স-রে ও অটোমেটেড প্যাথলজি ল্যাব","২৪ ঘন্টা সার্বক্ষণিক অ্যাম্বুলেন্স"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001023', '20001023', 'Aria Model Hospital & Nursing Home, Shajahanpur', 'আড়িয়া মডেল হাসপাতাল অ্যান্ড নার্সিং হোম, শাজাহানপুর',
  'aria-model-hospital-shajahanpur', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (25 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Aria', 'আড়িয়া', 'Aria Bazar, Dhaka Highway',
  'ঢাকা-বগুড়া মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১', '["01718-990011"]'::jsonb, 'ariamodelhospital@gmail.com', 'http://ariaup.bogra.gov.bd',
  24.7645, 89.4112, 'https://maps.google.com/?q=24.7645,89.4112', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["২৫ শয্যা আধুনিক ইনডোর সুবিধা","মহাসড়ক সড়ক দুর্ঘটনার জরুরি চিকিৎসা","স্বাভাবিক ও সিজারিয়ান প্রসব সেবা","আল্ট্রাসনোগ্রাফি ও রক্তের সব পরীক্ষা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://ariaup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001024', '20001024', 'Sherpur Central Hospital & Diagnostic Centre', 'শেরপুর সেন্ট্রাল হাসপাতাল অ্যান্ড ডায়াগনস্টিক সেন্টার',
  'sherpur-central-hospital-diagnostic', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (40 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Dhaka Road, Sherpur Sadar',
  'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '["01711-667788","05029-77340"]'::jsonb, 'sherpurcentralhospital@gmail.com', 'http://sherpur.bogra.gov.bd',
  24.6795, 89.4295, 'https://maps.google.com/?q=24.6795,89.4295', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["৪০ শয্যা কেবিন ও জেনারেল ওয়ার্ড","২৪ ঘন্টা অপারেশন থিয়েটার ও সিজারিয়ান সেকশন","মহাসড়ক এক্সিডেন্ট ও জরুরি ট্রমা সেবা","ডিজিটাল এক্স-রে, আল্ট্রাসনোগ্রাম ও ইসিজি","২৪ ঘন্টা ফার্মেসী ও অ্যাম্বুলেন্স সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001025', '20001025', 'Apan General Hospital & Clinic, Sherpur', 'আপন জেনারেল হাসপাতাল অ্যান্ড ক্লিনিক, শেরপুর',
  'apan-general-hospital-sherpur', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (25 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Bus Stand Area',
  'বাসস্ট্যান্ড সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০', '["01715-223344"]'::jsonb, 'apangeneralhospital@gmail.com', 'http://sherpur.bogra.gov.bd',
  24.6762, 89.4271, 'https://maps.google.com/?q=24.6762,89.4271', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["২৫ শয্যা ইনডোর রোগী ভর্তি","জেনারেল সার্জারি ও গাইনী কেয়ার","স্বাভাবিক প্রসব সেবা","ল্যাবরেটরি টেস্ট ও সার্বক্ষণিক ডাক্তার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001026', '20001026', 'Shimabari Life Care Clinic, Sherpur', 'সীমাবাড়ী লাইফ কেয়ার ক্লিনিক, শেরপুর',
  'shimabari-life-care-clinic-sherpur', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (15 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Shimabari', 'সীমাবাড়ী', 'Shimabari Bazar, Dhaka Highway',
  'ঢাকা-বগুড়া মহাসড়ক, সীমাবাড়ী বাজার, শেরপুর, বগুড়া - ৫৮৪০', '["01716-112233"]'::jsonb, 'shimabarilifecare@gmail.com', 'http://shimabariup.bogra.gov.bd',
  24.5845, 89.4521, 'https://maps.google.com/?q=24.5845,89.4521', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["১৫ শয্যা ইনডোর ও প্রসূতি যত্ন","হাইওয়ে জরুরি ফার্স্ট এইড ও অক্সিজেন সাপোর্ট","স্বাভাবিক প্রসব","প্যাথলজি ও ফার্মেসী"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shimabariup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001027', '20001027', 'Mokamtala General Hospital & Trauma Centre (Private)', 'মোকামতলা জেনারেল হাসপাতাল অ্যান্ড ট্রমা সেন্টার',
  'mokamtala-general-hospital-trauma-centre', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (35 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Mokamtala', 'মোকামতলা', 'Rangpur Road, Mokamtala Mor',
  'রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01712-556677","01721-334455"]'::jsonb, 'mokamtalageneral@gmail.com', 'http://shibganj.bogra.gov.bd',
  25.0025, 89.3524, 'https://maps.google.com/?q=25.0025,89.3524', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["৩৫ শয্যা ইনডোর ও কেবিন ওয়ার্ড","২৪/৭ মহাসড়ক সড়ক দুর্ঘটনা ও অর্থোপেডিক ট্রমা সার্জারি","জরুরী ডেলিভারি ও সিজারিয়ান সেকশন","ডিজিটাল এক্স-রে ও অটোমেটেড প্যাথলজি","২৪ ঘন্টা এয়ারওয়ে সাপোর্ট ও অ্যাম্বুলেন্স"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001028', '20001028', 'Shibganj Model Hospital & Nursing Home', 'শিবগঞ্জ মডেল হাসপাতাল অ্যান্ড নার্সিং হোম',
  'shibganj-model-hospital-nursing-home', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (25 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Shibganj Sadar', 'শিবগঞ্জ সদর', 'Thana Mor',
  'থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01714-778899"]'::jsonb, 'shibganjmodelhospital@gmail.com', 'http://shibganj.bogra.gov.bd',
  24.9785, 89.3145, 'https://maps.google.com/?q=24.9785,89.3145', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
  '["২৫ শয্যা ইনডোর চিকিৎসা","জেনারেল সার্জারি ও গাইনী কেয়ার","স্বাভাবিক প্রসব ও সিজারিয়ান অপারেশন","আল্ট্রাসনোগ্রাম ও ইসিজি সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001029', '20001029', 'Sonatala General Hospital & Nursing Home', 'সোনাতলা জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম',
  'sonatala-general-hospital-nursing-home', 'Private Hospitals', 'private_general_hospital',
  'Private Hospital (25 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Sonatala Sadar', 'সোনাতলা সদর', 'Station Road, Sonatala Bazar',
  'স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০', '["01711-889900","01728-445566"]'::jsonb, 'sonatalageneralhospital@gmail.com', 'http://sonatala.bogra.gov.bd',
  24.9985, 89.4985, 'https://maps.google.com/?q=24.9985,89.4985', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
  '["২৫ শয্যা ইনডোর ও কেবিন ব্যবস্থা","২৪ ঘন্টা জরুরী ডেলিভারি ও সিজারিয়ান অপারেশন","জেনারেল সার্জারি ও এ্যাপেন্ডিসাইটিস কেয়ার","ডিজিটাল এক্স-রে ও সম্পূর্ণ প্যাথলজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-pvt-20001030', '20001030', 'Balua Modern Clinic, Sonatala', 'বালুয়া মডার্ন ক্লিনিক, সোনাতলা',
  'balua-modern-clinic-sonatala', 'Private Clinics', 'private_specialized_clinic',
  'Private Clinic (15 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Balua', 'বালুয়া', 'Balua Hat',
  'বালুয়া হাট বাজার সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০', '["01715-334455"]'::jsonb, 'baluamodernclinic@gmail.com', 'http://baluaup.bogra.gov.bd',
  24.9795, 89.5185, 'https://maps.google.com/?q=24.9795,89.5185', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["১৫ শয্যা ইনডোর পর্যবেক্ষণ","স্বাভাবিক প্রসব সেবা","প্রাথমিক চিকিৎসা ও ফার্স্ট এইড","প্যাথলজিক্যাল ল্যাবরেটরি ও ফার্মেসী"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://baluaup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001001', '30001001', 'Popular Diagnostic Centre Ltd., Bogura', 'পপুলার ডায়াগনস্টিক সেন্টার লি., বগুড়া',
  'popular-diagnostic-centre-bogura', 'Diagnostic Centres', 'diagnostic_centre',
  'Specialized Diagnostic Centre & Laboratory', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Thana Road, Jaleshwaritola',
  'থানা রোড, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-69361","09613-787807","01755-667788"]'::jsonb, 'bogra.branch@populardiagnostic.com', 'https://populardiagnostic.com',
  24.8505, 89.3718, 'https://maps.google.com/?q=24.8505,89.3718', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["১.৫ টেসলা এমআরআই (1.5T MRI)","১২৮-স্লাইস মাল্টি-ডিটেক্টর সিটি স্ক্যান (128-Slice CT Scan)","ফোর-ডি কালার ডপলার আল্ট্রাসনোগ্রাফি (4D USG)","হাই-ফ্রিকোয়েন্সি ডিজিটাল এক্স-রে ও ওপিজি (OPG)","অটোমেটেড বায়োকেমিস্ট্রি ও হরমোন অ্যানালাইসিস","হিস্টোপ্যাথলজি ও সাইটোপ্যাথলজি","ডিজিটাল ম্যামোগ্রাফি ও বোন ডেনসিটোমেট্রি (BMD)"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://populardiagnostic.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001002', '30001002', 'Medinova Medical Services Ltd., Bogura', 'মেদিনোভা মেডিকেল সার্ভিসেস লি., বগুড়া',
  'medinova-medical-services-bogura', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre & Imaging Facility', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Kanochgari, Sherpur Road',
  'কানোচগাড়ী, শেরপুর রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-69123","01711-567890"]'::jsonb, 'medinovabogra@gmail.com', 'https://medinovadiagnostic.com',
  24.8392, 89.3715, 'https://maps.google.com/?q=24.8392,89.3715', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["মাল্টি-স্লাইস স্পাইরাল সিটি স্ক্যান","ডিজিটাল রেডিওলজি ও ফ্লুরোস্কোপি","কার্ডিয়াক ইকোকার্ডিওগ্রাফি ও ইটিটি (ETT)","মাইক্রোবায়োলজি ও কালচার সেনসিটিভিটি","অটোমেটেড ইমিউনোলজি ও সেরোলজি টেস্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://medinovadiagnostic.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001003', '30001003', 'Labaid Diagnostic Ltd., Bogura', 'ল্যাবএইড ডায়াগনস্টিক লি., বগুড়া',
  'labaid-diagnostic-bogura', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre & Cardiac Investigation', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Jaleshwaritola',
  'জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-69871","01766-662233","10606"]'::jsonb, 'info@labaidgroup.com', 'https://labaid.com.bd',
  24.8525, 89.3678, 'https://maps.google.com/?q=24.8525,89.3678', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["কার্ডিয়াক ডায়াগনস্টিকস (Eco, ETT, Holter ECG)","ডিজিটাল এক্স-রে ও আল্ট্রাসাউন্ড","মলিকুলার বায়োলজি ও আরটি-পিসিআর (RT-PCR)","সম্পূর্ণ রক্তের বায়োকেমিক্যাল প্রোফাইল","বিশেষজ্ঞ ডাক্তারদের চেম্বার কনসালটেশন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://labaid.com.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001004', '30001004', 'Doctors Diagnostic Centre, Bogura', 'ডক্টরস ডায়াগনস্টিক সেন্টার, বগুড়া',
  'doctors-diagnostic-centre-bogura', 'Diagnostic Centres', 'diagnostic_centre',
  'Clinical Diagnostic Laboratory', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Silimpur, Medical College Gate',
  'মেডিকেল কলেজ মেইন গেট সংলগ্ন, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '["01712-445588","051-64589"]'::jsonb, 'doctorsdiagnostic.bogra@gmail.com', 'http://bogra.gov.bd',
  24.8205, 89.3642, 'https://maps.google.com/?q=24.8205,89.3642', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরী ল্যাব ইনভেস্টিগেশন","ইলেক্ট্রোলাইটস ও আর্টারিয়াল ব্লাড গ্যাস (ABG)","হিমাটোলজি ও কমপ্লিট ব্লাড কাউন্ট (CBC)","জরুরি আল্ট্রাসনোগ্রাম ও ডিজিটাল এক্স-রে"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001005', '30001005', 'Apex Diagnostic Centre & Consultation, Bogura', 'এপেক্স ডায়াগনস্টিক সেন্টার, বগুড়া',
  'apex-diagnostic-centre-bogura', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre & Laboratory', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Borogola',
  'বড়গোলা, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-64512","01711-889922"]'::jsonb, 'apexdiagnostic.bogra@gmail.com', 'http://bogra.gov.bd',
  24.8542, 89.3698, 'https://maps.google.com/?q=24.8542,89.3698', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["রুটিন বায়োকেমিস্ট্রি ও লিভার ফাংশন টেস্ট","ইউরিন ও স্টুল রুটিন মাইক্রোস্কোপি","ডিজিটাল ডেন্টাল ওপিজি এক্স-রে","রক্তের লিপিড প্রোফাইল ও ডায়াবেটিস পরীক্ষা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001006', '30001006', 'Modern Diagnostic Centre, Bogura', 'মডার্ন ডায়াগনস্টিক সেন্টার, বগুড়া',
  'modern-diagnostic-centre-bogura', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Station Road',
  'স্টেশন রোড, রেলওয়ে স্টেশন সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-66219","01715-332211"]'::jsonb, 'moderndiagnostic.bgr@gmail.com', 'http://bogra.gov.bd',
  24.8482, 89.3765, 'https://maps.google.com/?q=24.8482,89.3765', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["ক্লিনিক্যাল প্যাথলজি ও হিমাটোলজি","টু-ডি ও ফোর-ডি ইউএসজি (USG)","ডিজিটাল ১২-লিড ইসিজি (ECG)","এন্ডোস্কোপি ও গ্যাস্ট্রিক ইনভেস্টিগেশন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001007', '30001007', 'Santahar Digital Diagnostic Centre', 'সান্তাহার ডিজিটাল ডায়াগনস্টিক সেন্টার',
  'santahar-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre & Lab', 'private', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Santahar', 'সান্তাহার', 'Station Road, Santahar Pourashava',
  'স্টেশন রোড, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১', '["01711-224466","0741-62410"]'::jsonb, 'santahardiagnostic@gmail.com', 'http://santahar.bogra.gov.bd',
  24.7872, 88.9485, 'https://maps.google.com/?q=24.7872,88.9485', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসনোগ্রাফি","রুটিন বায়োকেমিস্ট্রি ও রক্তের সম্পূর্ণ পরীক্ষা","ইসিজি ও হার্ট রেট অ্যানালাইসিস","টাইফয়েড, ডেঙ্গু ও ম্যালেরিয়া দ্রুত পরীক্ষা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://santahar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001008', '30001008', 'Adamdighi Central Diagnostic Centre', 'আদমদীঘি সেন্ট্রাল ডায়াগনস্টিক সেন্টার',
  'adamdighi-central-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Adamdighi Sadar', 'আদমদীঘি সদর', 'Bus Stand Area',
  'বাসস্ট্যান্ড সংলগ্ন, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '["01715-337799"]'::jsonb, 'adamdighidiagnostic@gmail.com', 'http://adamdighi.bogra.gov.bd',
  24.7795, 88.9942, 'https://maps.google.com/?q=24.7795,88.9942', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["রক্তের গ্লুকোজ ও লিপিড প্রোফাইল","লিভার ও কিডনি ফাংশন টেস্ট (LFT, RFT)","প্রেগন্যান্সি আল্ট্রাসাউন্ড","ইউরিন রুটিন ও মাইক্রোস্কোপি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001009', '30001009', 'Dhunat Modern Diagnostic & Consultation Centre', 'ধুনট মডার্ন ডায়াগনস্টিক অ্যান্ড কনসালটেশন সেন্টার',
  'dhunat-modern-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Sadar', 'ধুনট সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০', '["01714-882211"]'::jsonb, 'dhunatmoderndiagnostic@gmail.com', 'http://dhunat.bogra.gov.bd',
  24.6775, 89.5405, 'https://maps.google.com/?q=24.6775,89.5405', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["ডিজিটাল এক্স-রে ও কালার ডপলার ইউএসজি","ক্লিনিক্যাল বায়োকেমিস্ট্রি ও ইলেক্ট্রোলাইটস","ডায়াবেটিস ও এইচবিএওয়ানসি (HbA1c) টেস্ট","ইসিজি ও কার্ডিয়াক কনসালটেশন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001010', '30001010', 'Jamuna Diagnostic Centre, Dhunat', 'যমুনা ডায়াগনস্টিক সেন্টার, ধুনট',
  'jamuna-diagnostic-centre-dhunat', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Sadar', 'ধুনট সদর', 'Thana Road, Dhunat Bazar',
  'থানা রোড, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০', '["01718-993344"]'::jsonb, 'jamunadiagnostic.dhunat@gmail.com', 'http://dhunat.bogra.gov.bd',
  24.6745, 89.5392, 'https://maps.google.com/?q=24.6745,89.5392', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["রুটিন প্যাথলজি ও ব্লাড সিবিসি (CBC with ESR)","ইউরিন প্রেগন্যান্সি ও রুটিন এক্সামিনেশন","হোল এবডোমেন আল্ট্রাসনোগ্রাম","জরুরি প্যাথলজি সাপোর্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001011', '30001011', 'Dhupchanchia Digital Diagnostic Centre', 'দুপচাঁচিয়া ডিজিটাল ডায়াগনস্টিক সেন্টার',
  'dhupchanchia-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dhupchanchia Sadar', 'দুপচাঁচিয়া সদর', 'Bogura-Naogaon Highway',
  'বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01712-991122","01725-334488"]'::jsonb, 'dhupchanchiadiagnostic@gmail.com', 'http://dhupchanchia.bogra.gov.bd',
  24.8742, 89.1725, 'https://maps.google.com/?q=24.8742,89.1725', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["হাই-ফ্রিকোয়েন্সি ডিজিটাল এক্স-রে","ফোর-ডি কালার ডপলার ইউএসজি","অটোমেটেড হিমাটোলজি অ্যানালাইজার","থাইরয়েড ও হরমোন টেস্ট প্রোফাইল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001012', '30001012', 'Talora Model Diagnostic Centre, Dhupchanchia', 'তালোড়া মডেল ডায়াগনস্টিক সেন্টার, দুপচাঁচিয়া',
  'talora-model-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Talora', 'তালোড়া', 'Railway Bazar, Talora',
  'রেলওয়ে বাজার, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01716-558833"]'::jsonb, 'taloradiagnostic@gmail.com', 'http://taloraup.bogra.gov.bd',
  24.8352, 89.1612, 'https://maps.google.com/?q=24.8352,89.1612', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["ক্লিনিক্যাল প্যাথলজি ও ব্লাড গ্রুপিং","স্পুটাম ও কফ পরীক্ষা","আল্ট্রাসনোগ্রাম ও ডিজিটাল ইসিজি","ডায়াবেটিস ফাস্টিং ও পোস্ট প্র্যান্ডিয়াল টেস্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://taloraup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001013', '30001013', 'Gabtali Digital Diagnostic Centre', 'গাবতলী ডিজিটাল ডায়াগনস্টিক সেন্টার',
  'gabtali-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Gabtali Sadar', 'গাবতলী সদর', 'Thana Mor',
  'থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '["01713-662288"]'::jsonb, 'gabtalidiagnostic@gmail.com', 'http://gabtali.bogra.gov.bd',
  24.8795, 89.4642, 'https://maps.google.com/?q=24.8795,89.4642', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["ডিজিটাল এক্স-রে ও চেস্ট রেডিওলজি","হোল এবডোমেন ও প্রেগন্যান্সি আল্ট্রাসাউন্ড","অটোমেটেড বায়োকেমিস্ট্রি টেস্ট","১২-লিড কম্পিউটারাইজড ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001014', '30001014', 'Sonaray Central Diagnostic Centre, Gabtali', 'সোনারায় সেন্ট্রাল ডায়াগনস্টিক সেন্টার, গাবতলী',
  'sonaray-central-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Sonaray', 'সোনারায়', 'Sonaray Bazar',
  'সোনারায় বাজার, গাবতলী, বগুড়া - ৫৮২০', '["01719-441155"]'::jsonb, 'sonaraydiagnostic@gmail.com', 'http://sonarayup.bogra.gov.bd',
  24.8535, 89.4765, 'https://maps.google.com/?q=24.8535,89.4765', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["ক্লিনিক্যাল প্যাথলজি ও ব্লাড স্ক্রিনিং","ইউরিন ও স্টুল রুটিন পরীক্ষা","আল্ট্রাসনোগ্রাফি ও রক্তচাপ পরীক্ষা","ডায়াবেটিস পর্যবেক্ষণ সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sonarayup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001015', '30001015', 'Kahalu Digital Diagnostic Centre', 'কাহালু ডিজিটাল ডায়াগনস্টিক সেন্টার',
  'kahalu-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahalu Sadar', 'কাহালু সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '["01711-447788","01724-665522"]'::jsonb, 'kahaludiagnostic@gmail.com', 'http://kahalu.bogra.gov.bd',
  24.8285, 89.2625, 'https://maps.google.com/?q=24.8285,89.2625', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["ডিজিটাল এক্স-রে ও কালার ডপলার ইউএসজি","কমপ্লিট ব্লাড কাউন্ট (CBC) ও সিরাম ক্রিয়েটিনিন","লিপিড প্রোফাইল ও ইউরিক এসিড","কম্পিউটারাইজড ইসিজি ও ডাক্তার কনসালটেশন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001016', '30001016', 'Murail Model Diagnostic Centre, Kahalu', 'মুরইল মডেল ডায়াগনস্টিক সেন্টার, কাহালু',
  'murail-model-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Murail', 'মুরইল', 'Murail Bazar',
  'মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০', '["01717-882244"]'::jsonb, 'muraildiagnostic@gmail.com', 'http://murailup.bogra.gov.bd',
  24.7995, 89.2425, 'https://maps.google.com/?q=24.7995,89.2425', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["বেসিক প্যাথলজি ও হেমাটোলজি","রক্তের গ্রুপ ও ক্রস-ম্যাচিং","প্রেগন্যান্সি আল্ট্রাসাউন্ড","ডায়াবেটিস দ্রুত টেস্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://murailup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001017', '30001017', 'Nandigram Central Diagnostic Centre', 'নন্দীগ্রাম সেন্ট্রাল ডায়াগনস্টিক সেন্টার',
  'nandigram-central-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Bus Stand Area',
  'বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01712-338800","01725-778899"]'::jsonb, 'nandigramdiagnostic@gmail.com', 'http://nandigram.bogra.gov.bd',
  24.6792, 89.1925, 'https://maps.google.com/?q=24.6792,89.1925', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসাউন্ড","বায়োকেমিস্ট্রি অ্যানালাইজার টেস্ট","লিপিড ও লিভার প্রোফাইল","১২-লিড ডিজিটাল ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001018', '30001018', 'Omarpur Digital Diagnostic Centre, Nandigram', 'ওমরপুর ডিজিটাল ডায়াগনস্টিক সেন্টার, নন্দীগ্রাম',
  'omarpur-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Natore-Bogura Highway, Omarpur',
  'বগুড়া-নাটোর মহাসড়ক, ওমরপুর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01715-771133"]'::jsonb, 'omarpurdiagnostic@gmail.com', 'http://nandigram.bogra.gov.bd',
  24.6892, 89.1852, 'https://maps.google.com/?q=24.6892,89.1852', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["রুটিন ব্লাড টেস্টিং ও মাইক্রোস্কোপি","ইউরিন রুটিন ও স্পুটাম পরীক্ষা","আল্ট্রাসনোগ্রাফি ও ডিজিটাল ইসিজি","হাইওয়ে জরুরি ফার্স্ট এইড ডায়াগনস্টিক"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001019', '30001019', 'Sariakandi Modern Diagnostic Centre', 'সারিয়াকান্দি মডার্ন ডায়াগনস্টিক সেন্টার',
  'sariakandi-modern-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Sariakandi Sadar', 'সারিয়াকান্দি সদর', 'Thana Road',
  'থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01714-229988"]'::jsonb, 'sariakandidiagnostic@gmail.com', 'http://sariakandi.bogra.gov.bd',
  24.8885, 89.5672, 'https://maps.google.com/?q=24.8885,89.5672', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসনোগ্রাম","লিভার ও কিডনি ফাংশন টেস্ট","গর্ভবতী মায়েদের নিয়মিত পরীক্ষা ও ইসিজি","রক্তের ক্যালসিয়াম ও ইউরিক এসিড"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001020', '30001020', 'Chandanbaisha Riverine Diagnostic Centre, Sariakandi', 'চন্দনবাইশা চরাঞ্চল ডায়াগনস্টিক সেন্টার, সারিয়াকান্দি',
  'chandanbaisha-riverine-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Chandanbaisha', 'চন্দনবাইশা', 'Chandanbaisha Bazar',
  'চন্দনবাইশা বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01716-119955"]'::jsonb, 'chandanbaishadiagnostic@gmail.com', 'http://chandanbaishaup.bogra.gov.bd',
  24.8472, 89.6142, 'https://maps.google.com/?q=24.8472,89.6142', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল কোল্ড-চেইন সংরক্ষিত রক্তের টেস্ট","ম্যালেরিয়া, ডেঙ্গু ও টাইফয়েড র‌্যাপিড টেস্ট","বেসিক বায়োকেমিস্ট্রি ও গ্লুকোজ পরীক্ষা","জরুরি ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://chandanbaishaup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001021', '30001021', 'Majhira Cantonment Diagnostic Centre', 'মাঝিড়া ক্যান্টনমেন্ট ডায়াগনস্টিক সেন্টার',
  'majhira-cantonment-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Majhira', 'মাঝিড়া', 'Cantonment Gate, Dhaka Road',
  'ক্যান্টনমেন্ট গেট সংলগ্ন, ঢাকা রোড, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-118844","01726-554477"]'::jsonb, 'mafhiradiagnostic@gmail.com', 'http://shajahanpur.bogra.gov.bd',
  24.7825, 89.3958, 'https://maps.google.com/?q=24.7825,89.3958', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মাল্টি-স্লাইস ডিজিটাল রেডিওলজি","ফোর-ডি কালার আল্ট্রাসাউন্ড","কার্ডিয়াক বায়োমার্কার্স (Troponin-I, CK-MB)","সম্পূর্ণ অটোমেটেড হিমাটোলজি অ্যানালাইসিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001022', '30001022', 'Aria Digital Diagnostic Centre, Shajahanpur', 'আড়িয়া ডিজিটাল ডায়াগনস্টিক সেন্টার, শাজাহানপুর',
  'aria-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Aria', 'আড়িয়া', 'Dhaka Highway, Aria Bazar',
  'ঢাকা-বগুড়া মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১', '["01718-442266"]'::jsonb, 'ariadiagnostic@gmail.com', 'http://ariaup.bogra.gov.bd',
  24.7658, 89.4125, 'https://maps.google.com/?q=24.7658,89.4125', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["মহাসড়ক ট্রমা জরুরি ডিজিটাল এক্স-রে","ব্লাড গ্রুপিং ও ক্রস-ম্যাচিং","সিরাম ইলেক্ট্রোলাইটস ও রুটিন বায়োকেমিস্ট্রি","আল্ট্রাসনোগ্রাফি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://ariaup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001023', '30001023', 'Sherpur Modern Diagnostic Centre', 'শেরপুর মডার্ন ডায়াগনস্টিক সেন্টার',
  'sherpur-modern-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Dhaka Road, Sherpur Sadar',
  'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '["01711-554422","05029-77412"]'::jsonb, 'sherpurmoderndiagnostic@gmail.com', 'http://sherpur.bogra.gov.bd',
  24.6788, 89.4288, 'https://maps.google.com/?q=24.6788,89.4288', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["৫০০ এমএ হাই-ফ্রিকোয়েন্সি ডিজিটাল এক্স-রে","ফোর-ডি কালার আল্ট্রাসাউন্ড ও ইকোকার্ডিওগ্রাফি","সম্পূর্ণ অটোমেটেড বায়োকেমিস্ট্রি ও হরমোন টেস্ট","ক্লিনিক্যাল হিস্টোপ্যাথলজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001024', '30001024', 'Apan Diagnostic & Consultation Centre, Sherpur', 'আপন ডায়াগনস্টিক অ্যান্ড কনসালটেশন সেন্টার, শেরপুর',
  'apan-diagnostic-centre-sherpur', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Bus Stand Area',
  'বাসস্ট্যান্ড সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০', '["01715-993311"]'::jsonb, 'apandiagnostic.sherpur@gmail.com', 'http://sherpur.bogra.gov.bd',
  24.6755, 89.4265, 'https://maps.google.com/?q=24.6755,89.4265', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["কমপ্লিট ব্লাড কাউন্ট (CBC) ও পিভিএফ (PBF)","থাইরয়েড হরমোন (T3, T4, TSH) টেস্ট","লিভার ও রেনাল প্রোফাইল","১২-চ্যানেল ডিজিটাল ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001025', '30001025', 'Shimabari Digital Diagnostic Centre, Sherpur', 'সীমাবাড়ী ডিজিটাল ডায়াগনস্টিক সেন্টার, শেরপুর',
  'shimabari-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Shimabari', 'সীমাবাড়ী', 'Dhaka Highway, Shimabari Bazar',
  'ঢাকা-বগুড়া মহাসড়ক, সীমাবাড়ী বাজার, শেরপুর, বগুড়া - ৫৮৪০', '["01716-884422"]'::jsonb, 'shimabaridiagnostic@gmail.com', 'http://shimabariup.bogra.gov.bd',
  24.5852, 89.4535, 'https://maps.google.com/?q=24.5852,89.4535', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["মহাসড়ক এক্সিডেন্ট জরুরি রেডিওলজি","রুটিন প্যাথলজি ও ব্লাড সুগার টেস্ট","আল্ট্রাসনোগ্রাফি","জরুরি ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shimabariup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001026', '30001026', 'Mokamtala Central Diagnostic Centre', 'মোকামতলা সেন্ট্রাল ডায়াগনস্টিক সেন্টার',
  'mokamtala-central-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Mokamtala', 'মোকামতলা', 'Rangpur Road, Mokamtala Mor',
  'রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01712-448833","01720-998811"]'::jsonb, 'mokamtaladiagnostic@gmail.com', 'http://shibganj.bogra.gov.bd',
  25.0032, 89.3535, 'https://maps.google.com/?q=25.0032,89.3535', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["ডিজিটাল স্কেলিটাল ও ট্রমা এক্স-রে","জরুরী ট্রমা ইউএসজি ও ফ্লুইড অ্যাসেসমেন্ট","র‌্যাপিড সিবিসি ও ব্লাড ক্রস-ম্যাচিং","ইসিজি ও কার্ডিয়াক এনজাইম টেস্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001027', '30001027', 'Shibganj Digital Diagnostic Centre', 'শিবগঞ্জ ডিজিটাল ডায়াগনস্টিক সেন্টার',
  'shibganj-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Shibganj Sadar', 'শিবগঞ্জ সদর', 'Thana Mor',
  'থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01714-337711"]'::jsonb, 'shibganjdiagnostic@gmail.com', 'http://shibganj.bogra.gov.bd',
  24.9792, 89.3152, 'https://maps.google.com/?q=24.9792,89.3152', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["ফোর-ডি কালার আল্ট্রাসনোগ্রাফি","রুটিন বায়োকেমিস্ট্রি ও লিভার প্যানেল","ক্লিনিক্যাল প্যাথলজি ও হরমোন টেস্ট","ডায়াবেটিস কমপ্লিট স্ক্রিনিং"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001028', '30001028', 'Sonatala Modern Diagnostic Centre', 'সোনাতলা মডার্ন ডায়াগনস্টিক সেন্টার',
  'sonatala-modern-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Sonatala Sadar', 'সোনাতলা সদর', 'Station Road, Sonatala Bazar',
  'স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০', '["01711-773355","01724-112288"]'::jsonb, 'sonatalamoderndiagnostic@gmail.com', 'http://sonatala.bogra.gov.bd',
  24.9992, 89.4992, 'https://maps.google.com/?q=24.9992,89.4992', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["হাই-রেজোলিউশন ডিজিটাল এক্স-রে","প্রেগন্যান্সি ও অ্যাবডোমেন আল্ট্রাসনোগ্রাম","রক্তের সম্পূর্ণ বায়োকেমিক্যাল পরীক্ষা","১২-লিড কম্পিউটারাইজড ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-diag-30001029', '30001029', 'Balua Digital Diagnostic Centre, Sonatala', 'বালুয়া ডিজিটাল ডায়াগনস্টিক সেন্টার, সোনাতলা',
  'balua-digital-diagnostic-centre', 'Diagnostic Centres', 'diagnostic_centre',
  'Diagnostic Centre', 'private', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Balua', 'বালুয়া', 'Balua Hat',
  'বালুয়া হাট সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০', '["01715-228844"]'::jsonb, 'baluadiagnostic@gmail.com', 'http://baluaup.bogra.gov.bd',
  24.9805, 89.5195, 'https://maps.google.com/?q=24.9805,89.5195', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["ক্লিনিক্যাল প্যাথলজি ও ইউরিন/স্টুল মাইক্রোস্কোপি","র‌্যাপিড ডায়াগনস্টিক টেস্ট (ম্যালেরিয়া, ডেঙ্গু)","আল্ট্রাসনোগ্রাফি ও রক্ত পরীক্ষা","ইসিজি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://baluaup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001001', '40001001', 'Bogura Diabetic Association Hospital', 'বগুড়া ডায়াবেটিক সমিতি হাসপাতাল',
  'bogura-diabetic-association-hospital', 'Specialized Healthcare Facilities', 'specialized_diabetic_hospital',
  'Specialized Diabetic Hospital (75 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Sutrapur',
  'সূত্রাপুর, শেরপুর রোড সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-66254","01711-348921"]'::jsonb, 'bogra.diabetic@gmail.com', 'http://bogra.gov.bd',
  24.8452, 89.3725, 'https://maps.google.com/?q=24.8452,89.3725', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["বিশেষায়িত ডায়াবেটিস চিকিৎসা ও গাইডেন্স","ডায়াবেটিক রেটিনোপ্যাথি চক্ষু স্ক্রিনিং","ডায়াবেটিক ফুট কেয়ার ও আলসার সার্জারি","কিডনি ও কার্ডিয়াক জটিলতা মূল্যায়ন","ইনসুলিন ব্যাংক ও খাদ্যতালিকা পরামর্শ","৭৫ শয্যা ইনডোর ও ডে-কেয়ার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001002', '40001002', 'Dr. Matin Eye Hospital & Research Institute, Bogura', 'ডা. মতিন চক্ষু হাসপাতাল ও রিসার্চ ইনস্টিটিউট, বগুড়া',
  'dr-matin-eye-hospital-bogura', 'Eye Hospitals', 'specialized_eye_hospital',
  'Tertiary Specialized Eye Hospital (100 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Jaleshwaritola',
  'জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-63821","01713-375544"]'::jsonb, 'drmatineyehospital@gmail.com', 'http://bogra.gov.bd',
  24.8518, 89.3665, 'https://maps.google.com/?q=24.8518,89.3665', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["আধুনিক ফ্যাকো ছানি অপারেশন (Phaco Surgery)","রেটিনা ও ভিট্রিও-রেটিনাল লেজার সার্জারি","গ্লুকোমা ও অকুলোপ্লাস্টি অপারেশন","শিশুদের বিশেষায়িত পেডিয়াট্রিক চক্ষু চিকিৎসা","কর্নিয়া ও রিফ্রাক্টিভ সার্জারি","১০০ শয্যা ইনডোর ও আধুনিক অপটিক্যাল সেন্টার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001003', '40001003', 'Bogura Eye Hospital', 'বগুড়া চক্ষু হাসপাতাল',
  'bogura-eye-hospital', 'Eye Hospitals', 'specialized_eye_hospital',
  'Specialized Eye Hospital (50 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Malotinagar',
  'মালতীনগর, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-65123","01712-446699"]'::jsonb, 'bograeyehospital@gmail.com', 'http://bogra.gov.bd',
  24.8365, 89.3721, 'https://maps.google.com/?q=24.8365,89.3721', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["কম্পিউটারাইজড দৃষ্টি পরীক্ষা ও চশমার প্রেসক্রিপশন","মাইক্রো-ইনসিশন ক্যাটারেক্ট সার্জারি (MICS)","লেজার ট্রিটমেন্ট ও লো-ভিশন এইড","৫০ শয্যা ইনডোর চক্ষু কেয়ার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001004', '40001004', 'Specialized Dental Care & Oral Surgery, Bogura', 'স্পেশালাইজড ডেন্টাল কেয়ার অ্যান্ড ওরাল সার্জারি, বগুড়া',
  'specialized-dental-care-bogura', 'Dental Clinics', 'specialized_dental_clinic',
  'Specialized Dental Surgery Centre', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Sherpur Road, Kanochgari',
  'শেরপুর রোড, কানোচগাড়ী, বগুড়া সদর, বগুড়া - ৫৮০০', '["01711-882233","051-68912"]'::jsonb, 'boguradentalcare@gmail.com', 'http://bogra.gov.bd',
  24.8412, 89.3718, 'https://maps.google.com/?q=24.8412,89.3718', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["রুট ক্যানেল ট্রিটমেন্ট (RCT) ও ক্রাউন ক্যাপ","ডেন্টাল ইমপ্লান্ট ও ব্রিজিং","অর্থোডন্টিক ব্র্যাকেটস ও বাঁকা দাঁত সোজা করা","মুখ ও চোয়ালের ম্যাক্সিলোফেসিয়াল সার্জারি","ডিজিটাল ওপিজি ডেন্টাল এক্স-রে"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001005', '40001005', 'Bogura Specialized Child & Maternity Hospital', 'বগুড়া বিশেষায়িত শিশু ও মাতৃ হাসপাতাল',
  'bogura-specialized-child-maternity-hospital', 'Specialized Healthcare Facilities', 'specialized_pediatric_hospital',
  'Specialized Pediatric & Maternity Hospital (50 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Silimpur, Medical Road',
  'মেডিকেল রোড, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-225577","051-64812"]'::jsonb, 'bograchildhospital@gmail.com', 'http://bogra.gov.bd',
  24.8225, 89.3621, 'https://maps.google.com/?q=24.8225,89.3621', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["নবজাতক নিবিড় পরিচর্যা (NICU) ও ফটোথেরাপি","শিশুরোগ বিশেষজ্ঞ কনসালটেশন ও ইনডোর ওয়ার্ড","পেডিয়াট্রিক সার্জারি ও শিশু সার্জিক্যাল আইসিইউ","শিশুর শারীরিক বৃদ্ধি ও মানসিক বিকাশ পরামর্শ","৫০ শয্যা মা ও শিশু বিশেষায়িত কেয়ার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001006', '40001006', 'Centre for the Rehabilitation of the Paralysed (CRP) - Bogura', 'সিআরপি (পক্ষাঘাতগ্রস্তদের পুনর্বাসন কেন্দ্র) — বগুড়া',
  'crp-bogura-rehabilitation-centre', 'Specialized Healthcare Facilities', 'physical_rehabilitation_centre',
  'Specialized Physical Rehabilitation Hospital', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Shajahanpur-Sadar Highway Link',
  'হাইওয়ে লিংক রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '["01730-059588","051-69850"]'::jsonb, 'bogra@crp-bangladesh.org', 'https://crp-bangladesh.org',
  24.8052, 89.3812, 'https://maps.google.com/?q=24.8052,89.3812', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["স্ট্রোক ও স্পাইনাল কর্ড ইনজুরি ফিজিওথেরাপি","সেরিব্রাল পালসি (CP) আক্রান্ত শিশুদের পুনর্বাসন","অকুপেশনাল থেরাপি ও স্পিচ থেরাপি","কৃত্রিম অঙ্গ ও সহায়ক যন্ত্রপাতি (Prosthetics & Orthotics)","পক্ষাঘাতগ্রস্তদের বৃত্তিমূলক প্রশিক্ষণ ও কাউন্সেলিং"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://crp-bangladesh.org"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001007', '40001007', 'Santahar Diabetic & Eye Care Centre', 'সান্তাহার ডায়াবেটিক ও চক্ষু সেবা কেন্দ্র',
  'santahar-diabetic-eye-care-centre', 'Specialized Healthcare Facilities', 'specialized_diabetic_eye_clinic',
  'Specialized Outpatient Clinic', 'private', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Santahar', 'সান্তাহার', 'Station Road, Santahar Pourashava',
  'স্টেশন রোড, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১', '["01712-668811"]'::jsonb, 'santahardiabeticeye@gmail.com', 'http://santahar.bogra.gov.bd',
  24.7885, 88.9472, 'https://maps.google.com/?q=24.7885,88.9472', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["ডায়াবেটিস নিয়মিত চেকআপ ও নিয়ন্ত্রণ","কম্পিউটারাইজড চক্ষু পরীক্ষা ও ছানি স্ক্রিনিং","ডায়াবেটিক রেটিনোপ্যাথি প্রাথমিক মূল্যায়ন","চশমা ও অপটিক্যাল সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://santahar.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001008', '40001008', 'Adamdighi Specialized Dental Clinic', 'আদমদীঘি স্পেশালাইজড ডেন্টাল ক্লিনিক',
  'adamdighi-specialized-dental-clinic', 'Dental Clinics', 'specialized_dental_clinic',
  'Dental Clinic', 'private', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Adamdighi Sadar', 'আদমদীঘি সদর', 'Bus Stand Area',
  'বাসস্ট্যান্ড সংলগ্ন, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '["01718-335577"]'::jsonb, 'adamdighidental@gmail.com', 'http://adamdighi.bogra.gov.bd',
  24.7788, 88.9961, 'https://maps.google.com/?q=24.7788,88.9961', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["দাঁতের আধুনিক ফিলিং ও রুট ক্যানেল","আল্ট্রাসনিক ডেন্টাল স্কেলিং ও পলিশিং","ব্যথামুক্ত দাঁত তোলা ও কৃত্রিম দাঁত সংযোজন","দাঁতের জরুরি চিকিৎসা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001009', '40001009', 'Dhunat Upazila Diabetic Samity Clinic', 'ধুনট উপজেলা ডায়াবেটিক সমিতি ক্লিনিক',
  'dhunat-diabetic-samity-clinic', 'Specialized Healthcare Facilities', 'specialized_diabetic_clinic',
  'Specialized Diabetic Clinic', 'private', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Sadar', 'ধুনট সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০', '["01715-779922"]'::jsonb, 'dhunatdiabetic@gmail.com', 'http://dhunat.bogra.gov.bd',
  24.6765, 89.5418, 'https://maps.google.com/?q=24.6765,89.5418', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["রক্তে শর্করার মাত্রা নিয়মিত পর্যবেক্ষণ","ইনসুলিন গ্রহণ কৌশল প্রশিক্ষণ","উচ্চ রক্তচাপ ও কিডনি জটিলতা স্ক্রিনিং","ডায়েট ও জীবনযাপন পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001010', '40001010', 'Dhunat Smile Dental Care', 'ধুনট স্মাইল ডেন্টাল কেয়ার',
  'dhunat-smile-dental-care', 'Dental Clinics', 'specialized_dental_clinic',
  'Dental Clinic', 'private', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Sadar', 'ধুনট সদর', 'Thana Mor',
  'থানা মোড়, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০', '["01719-224466"]'::jsonb, 'dhunatdental@gmail.com', 'http://dhunat.bogra.gov.bd',
  24.6738, 89.5388, 'https://maps.google.com/?q=24.6738,89.5388', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["ব্যথামুক্ত দাঁত তোলা ও চিকিৎসা","কসমেটিক ফিলিং ও রুট ক্যানেল","স্কেলিং ও মাড়ির রোগের চিকিৎসা","শিশুদের দাঁতের যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001011', '40001011', 'Dhupchanchia Diabetic Association Sub-Centre', 'দুপচাঁচিয়া ডায়াবেটিক সমিতি সাব-সেন্টার',
  'dhupchanchia-diabetic-association', 'Specialized Healthcare Facilities', 'specialized_diabetic_clinic',
  'Specialized Diabetic Clinic', 'private', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dhupchanchia Sadar', 'দুপচাঁচিয়া সদর', 'Thana Mor',
  'থানা মোড়, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01712-558800"]'::jsonb, 'dhupchanchiadiabetic@gmail.com', 'http://dhupchanchia.bogra.gov.bd',
  24.8735, 89.1738, 'https://maps.google.com/?q=24.8735,89.1738', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["ডায়াবেটিস শনাক্তকরণ ও নিয়মিত চিকিৎসা","এইচবিএওয়ানসি ও গ্লুকোজ পরীক্ষা","ডায়াবেটিক কার্ড রেজিস্ট্রেশন","পুষ্টিবিদ দ্বারা পথ্য নির্ধারণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001012', '40001012', 'Dhupchanchia Eye & Dental Care', 'দুপচাঁচিয়া চক্ষু ও ডেন্টাল কেয়ার',
  'dhupchanchia-eye-dental-care', 'Eye Hospitals', 'specialized_eye_dental_clinic',
  'Specialized Outpatient Clinic', 'private', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dhupchanchia Sadar', 'দুপচাঁচিয়া সদর', 'Bogura-Naogaon Highway',
  'বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01716-447722"]'::jsonb, 'dhupchanchiaeyedental@gmail.com', 'http://dhupchanchia.bogra.gov.bd',
  24.8762, 89.1705, 'https://maps.google.com/?q=24.8762,89.1705', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["কম্পিউটারাইজড চোখের পাওয়ার পরীক্ষা","ছানিপড়া রোগীদের প্রাথমিক মূল্যায়ন","দাঁতের ফিলিং, স্কেলিং ও রুট ক্যানেল","চোখ ও দাঁতের আধুনিক চিকিৎসা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001013', '40001013', 'Gabtali Diabetic Care Centre', 'গাবতলী ডায়াবেটিক কেয়ার সেন্টার',
  'gabtali-diabetic-care-centre', 'Specialized Healthcare Facilities', 'specialized_diabetic_clinic',
  'Specialized Diabetic Clinic', 'private', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Gabtali Sadar', 'গাবতলী সদর', 'Thana Mor',
  'থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '["01713-881199"]'::jsonb, 'gabtalidiabetic@gmail.com', 'http://gabtali.bogra.gov.bd',
  24.8805, 89.4628, 'https://maps.google.com/?q=24.8805,89.4628', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["ডায়াবেটিস রোগীদের সার্বক্ষণিক পর্যবেক্ষণ","ফাস্টিং ও ২ ঘন্টা পরের ব্লাড সুগার টেস্ট","লিপিড ও ব্লাড প্রেশার ট্র্যাকিং","ডায়াবেটিক সচেতনতা প্রশিক্ষণ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001014', '40001014', 'Gabtali Modern Eye Clinic', 'গাবতলী মডার্ন চক্ষু ক্লিনিক',
  'gabtali-modern-eye-clinic', 'Eye Hospitals', 'specialized_eye_clinic',
  'Eye Care Clinic', 'private', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Gabtali Sadar', 'গাবতলী সদর', 'Gabtali Bazar',
  'গাবতলী বাজার রোড, গাবতলী, বগুড়া - ৫৮২০', '["01718-553311"]'::jsonb, 'gabtalieye@gmail.com', 'http://gabtali.bogra.gov.bd',
  24.8772, 89.4655, 'https://maps.google.com/?q=24.8772,89.4655', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["দৃষ্টিশক্তি পরীক্ষা ও চশমার পাওয়ার নির্ধারণ","গ্রামীণ ছানি অপারেশন ক্যাম্প ও রেফারেল","ড্রাই আই ও কনজাংকটিভাইটিস চিকিৎসা","জরুরি চোখের ফার্স্ট এইড"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001015', '40001015', 'Kahalu Diabetic Consultation Centre', 'কাহালু ডায়াবেটিক কনসালটেশন সেন্টার',
  'kahalu-diabetic-consultation-centre', 'Specialized Healthcare Facilities', 'specialized_diabetic_clinic',
  'Specialized Diabetic Clinic', 'private', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahalu Sadar', 'কাহালু সদর', 'Hospital Road',
  'হাসপাতাল রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '["01711-669933"]'::jsonb, 'kahaludiabetic@gmail.com', 'http://kahalu.bogra.gov.bd',
  24.8278, 89.2642, 'https://maps.google.com/?q=24.8278,89.2642', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["দীর্ঘস্থায়ী ডায়াবেটিসের বিশেষায়িত চিকিৎসা","রক্তে শর্করার তাৎক্ষণিক পরীক্ষা","ডায়াবেটিক স্নায়বিক জটিলতা নিরূপণ","নিয়মিত বিশেষজ্ঞ ডাক্তারের পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001016', '40001016', 'Kahalu Dental & Maxillofacial Care', 'কাহালু ডেন্টাল অ্যান্ড ম্যাক্সিলোফেসিয়াল কেয়ার',
  'kahalu-dental-care', 'Dental Clinics', 'specialized_dental_clinic',
  'Dental Clinic', 'private', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahalu Sadar', 'কাহালু সদর', 'Rail Gate Area',
  'রেলগেট সংলগ্ন, কাহালু, বগুড়া - ৫৮৭০', '["01717-336688"]'::jsonb, 'kahaludental@gmail.com', 'http://kahalu.bogra.gov.bd',
  24.8265, 89.2618, 'https://maps.google.com/?q=24.8265,89.2618', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["দাঁত ক্ষয় প্রতিরোধ ও ফিলিং","আল্ট্রাসোনিক স্কেলিং ও দাঁতের যত্ন","মাইনর ওরাল সার্জারি ও দাঁত তোলা","শিশুদের দাঁতের সঠিক বিন্যাস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001017', '40001017', 'Nandigram Diabetic & Chronic Care Centre', 'নন্দীগ্রাম ডায়াবেটিক অ্যান্ড ক্রনিক কেয়ার সেন্টার',
  'nandigram-diabetic-chronic-care', 'Specialized Healthcare Facilities', 'specialized_diabetic_clinic',
  'Specialized Diabetic Clinic', 'private', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Bus Stand Area',
  'বাসস্ট্যান্ড, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01712-449911"]'::jsonb, 'nandigramdiabetic@gmail.com', 'http://nandigram.bogra.gov.bd',
  24.6778, 89.1932, 'https://maps.google.com/?q=24.6778,89.1932', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["ডায়াবেটিস রোগী মনিটরিং ও খাদ্য পরামর্শ","হাইপারটেনশন ও কার্ডিয়াক রিস্ক স্ক্রিনিং","নিয়মিত ব্লাড সুগার ও লিপিড প্রোফাইল","ডায়াবেটিক কমপ্লিকেশন প্রতিরোধ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001018', '40001018', 'Nandigram Specialized Eye Care', 'নন্দীগ্রাম স্পেশালাইজড চক্ষু সেবা',
  'nandigram-specialized-eye-care', 'Eye Hospitals', 'specialized_eye_clinic',
  'Eye Care Clinic', 'private', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Omarpur Mor',
  'ওমরপুর মোড়, বগুড়া-নাটোর মহাসড়ক, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01715-882255"]'::jsonb, 'nandigrameye@gmail.com', 'http://nandigram.bogra.gov.bd',
  24.6875, 89.1865, 'https://maps.google.com/?q=24.6875,89.1865', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["কম্পিউটারে চোখের দৃষ্টি পরীক্ষা","ছানি রোগী সনাক্তকরণ ও অপারেশন কাউন্সেলিং","গ্লুকোমা স্ক্রিনিং ও চোখের ড্রপ পরামর্শ","আধুনিক চশমা সরবরাহ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001019', '40001019', 'Sariakandi Diabetic & Char Health Welfare Clinic', 'সারিয়াকান্দি ডায়াবেটিক ও চরাঞ্চল স্বাস্থ্য কল্যাণ ক্লিনিক',
  'sariakandi-diabetic-char-health-clinic', 'Specialized Healthcare Facilities', 'specialized_diabetic_clinic',
  'Specialized Diabetic Clinic', 'private', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Sariakandi Sadar', 'সারিয়াকান্দি সদর', 'Thana Road, Sariakandi Bazar',
  'থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01714-338822"]'::jsonb, 'sariakandidiabetic@gmail.com', 'http://sariakandi.bogra.gov.bd',
  24.8878, 89.5665, 'https://maps.google.com/?q=24.8878,89.5665', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চলের রোগীদের বিশেষায়িত ডায়াবেটিস সেবা","ব্লাড গ্লুকোজ ও ব্লাড প্রেশার পরীক্ষা","খাদ্যাভ্যাস ও স্বাস্থ্যকর জীবনযাপন নির্দেশনা","জরুরি রেফারেল সহায়তা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001020', '40001020', 'Sariakandi Riverine Eye Care Unit', 'সারিয়াকান্দি নদীমাতৃক চক্ষু সেবা ইউনিট',
  'sariakandi-riverine-eye-care-unit', 'Eye Hospitals', 'specialized_eye_clinic',
  'Eye Care Clinic', 'private', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Sariakandi Sadar', 'সারিয়াকান্দি সদর', 'Sariakandi Bazar',
  'সারিয়াকান্দি বাজার সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01716-227744"]'::jsonb, 'sariakandieye@gmail.com', 'http://sariakandi.bogra.gov.bd',
  24.8902, 89.5695, 'https://maps.google.com/?q=24.8902,89.5695', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["যমুনা চরাঞ্চলের মানুষের চোখের ছানি পরীক্ষা","দৃষ্টি ত্রুটি নির্ণয় ও সাশ্রয়ী মূল্যে চশমা বিতরণ","চোখের ইনফেকশন ও অ্যালার্জির চিকিৎসা","ছানি অপারেশন রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001021', '40001021', 'Shajahanpur Diabetic & NCD Rehabilitation Centre', 'শাজাহানপুর ডায়াবেটিক ও এনসিডি পুনর্বাসন কেন্দ্র',
  'shajahanpur-diabetic-ncd-rehabilitation', 'Specialized Healthcare Facilities', 'specialized_diabetic_rehab_clinic',
  'Specialized Rehabilitation Clinic', 'private', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Majhira', 'মাঝিড়া', 'Dhaka Highway, Majhira',
  'ঢাকা-বগুড়া মহাসড়ক, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-229955"]'::jsonb, 'shajahanpurdiabetic@gmail.com', 'http://shajahanpur.bogra.gov.bd',
  24.7832, 89.3965, 'https://maps.google.com/?q=24.7832,89.3965', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["ডায়াবেটিস ও দীর্ঘস্থায়ী অসংক্রামক রোগ নিয়ন্ত্রণ","স্ট্রোক পরবর্তী ফিজিওথেরাপি ও পুনর্বাসন","প্যারালাইসিস ও জয়েন্ট পেইনের থেরাপি","পুষ্টিবিদ ও ফিজিওথেরাপিস্ট পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001022', '40001022', 'Aria Dental & Oral Health Clinic, Shajahanpur', 'আড়িয়া ডেন্টাল অ্যান্ড ওরাল হেলথ ক্লিনিক, শাজাহানপুর',
  'aria-dental-oral-health-shajahanpur', 'Dental Clinics', 'specialized_dental_clinic',
  'Dental Clinic', 'private', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Aria', 'আড়িয়া', 'Aria Bazar, Dhaka Highway',
  'ঢাকা মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১', '["01718-557733"]'::jsonb, 'ariadental@gmail.com', 'http://ariaup.bogra.gov.bd',
  24.7665, 89.4132, 'https://maps.google.com/?q=24.7665,89.4132', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["দাঁতের আধুনিক রুট ক্যানেল ও লাইট কিউর ফিলিং","আল্ট্রাসোনিক স্কেলিং ও দাগ দূরীকরণ","আক্কেল দাঁতের জটিল সার্জারি","শিশুদের দাঁতের সঠিক যত্ন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://ariaup.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001023', '40001023', 'Sherpur Diabetic Hospital', 'শেরপুর ডায়াবেটিক হাসপাতাল',
  'sherpur-diabetic-hospital', 'Specialized Healthcare Facilities', 'specialized_diabetic_hospital',
  'Specialized Diabetic Hospital (30 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Dhaka Road, Sherpur Sadar',
  'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '["01711-443311","05029-77510"]'::jsonb, 'sherpurdiabetichospital@gmail.com', 'http://sherpur.bogra.gov.bd',
  24.6775, 89.4298, 'https://maps.google.com/?q=24.6775,89.4298', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["৩০ শয্যা বিশেষায়িত ডায়াবেটিস ইনডোর ও ডে-কেয়ার","ডায়াবেটিক নেফ্রোপ্যাথি ও কিডনি জটিলতা চিকিৎসা","ইনসুলিন ব্যাংক ও নিয়মিত ব্লাড সুগার প্রোফাইল","ডায়াবেটিক ফুট আলসার সার্জিক্যাল ড্রেসিং","বিশেষজ্ঞ ডাক্তারের সার্বক্ষণিক চেম্বার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001024', '40001024', 'Sherpur Specialized Eye Hospital', 'শেরপুর বিশেষায়িত চক্ষু হাসপাতাল',
  'sherpur-specialized-eye-hospital', 'Eye Hospitals', 'specialized_eye_hospital',
  'Specialized Eye Hospital (25 Bed)', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Bus Stand Road',
  'বাসস্ট্যান্ড রোড, শেরপুর, বগুড়া - ৫৮৪০', '["01715-884466"]'::jsonb, 'sherpureyehospital@gmail.com', 'http://sherpur.bogra.gov.bd',
  24.6748, 89.4258, 'https://maps.google.com/?q=24.6748,89.4258', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মাইক্রো-সার্জারি ফ্যাকো ছানি অপারেশন","কম্পিউটারাইজড অটো-রিফ্রাকশন ও চশমা","২৫ শয্যা চক্ষু ইনডোর ওয়ার্ড","গ্লুকোমা ও শিশুদের চোখের ছানি চিকিৎসা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001025', '40001025', 'Sherpur Dental Care & Oral Surgery', 'শেরপুর ডেন্টাল কেয়ার অ্যান্ড ওরাল সার্জারি',
  'sherpur-dental-care-oral-surgery', 'Dental Clinics', 'specialized_dental_clinic',
  'Dental Clinic', 'private', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'College Road',
  'কলেজ রোড, শেরপুর, বগুড়া - ৫৮৪০', '["01716-773399"]'::jsonb, 'sherpurdental@gmail.com', 'http://sherpur.bogra.gov.bd',
  24.6805, 89.4312, 'https://maps.google.com/?q=24.6805,89.4312', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["রুট ক্যানেল ট্রিটমেন্ট (RCT) ও মেটাল/পোরসেলিন ক্যাপ","দাঁতের বন্ডিং ও কসমেটিক ফিলিং","মাড়ির রক্তক্ষরণ ও পাইওরিয়ার চিকিৎসা","দাঁতের ডিজিটাল এক্স-রে"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001026', '40001026', 'Shibganj Diabetic & Chronic Care Centre', 'শিবগঞ্জ ডায়াবেটিক অ্যান্ড ক্রনিক কেয়ার সেন্টার',
  'shibganj-diabetic-chronic-care', 'Specialized Healthcare Facilities', 'specialized_diabetic_clinic',
  'Specialized Diabetic Clinic', 'private', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Shibganj Sadar', 'শিবগঞ্জ সদর', 'Thana Mor',
  'থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01712-339944"]'::jsonb, 'shibganjdiabetic@gmail.com', 'http://shibganj.bogra.gov.bd',
  24.9778, 89.3138, 'https://maps.google.com/?q=24.9778,89.3138', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["ডায়াবেটিস রোগীদের নিয়মিত গ্লুকোজ পর্যবেক্ষণ","এইচবিএওয়ানসি ও কিডনি স্ক্রিনিং","ডায়াবেটিক পায়ের যত্ন ও আলসার প্রতিরোধ","বিশেষজ্ঞ ডাক্তারের পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001027', '40001027', 'Mokamtala Eye & Dental Care Centre, Shibganj', 'মোকামতলা চক্ষু ও ডেন্টাল কেয়ার সেন্টার, শিবগঞ্জ',
  'mokamtala-eye-dental-care-shibganj', 'Eye Hospitals', 'specialized_eye_dental_clinic',
  'Specialized Outpatient Clinic', 'private', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Mokamtala', 'মোকামতলা', 'Rangpur Road, Mokamtala Mor',
  'রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01714-226688"]'::jsonb, 'mokamtalaeyedental@gmail.com', 'http://shibganj.bogra.gov.bd',
  25.0042, 89.3542, 'https://maps.google.com/?q=25.0042,89.3542', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["কম্পিউটারে চোখের দৃষ্টি পরীক্ষা ও চশমা","চোখের ছানি পরীক্ষা ও রেফারেল","দাঁতের ফিলিং, স্কেলিং ও রুট ক্যানেল","মুখ ও মাড়ির ব্যথার জরুরি চিকিৎসা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001028', '40001028', 'Sonatala Diabetic Association Sub-Centre', 'সোনাতলা ডায়াবেটিক সমিতি সাব-সেন্টার',
  'sonatala-diabetic-association', 'Specialized Healthcare Facilities', 'specialized_diabetic_clinic',
  'Specialized Diabetic Clinic', 'private', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Sonatala Sadar', 'সোনাতলা সদর', 'Station Road, Sonatala Bazar',
  'স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০', '["01711-662244"]'::jsonb, 'sonataladiabetic@gmail.com', 'http://sonatala.bogra.gov.bd',
  24.9978, 89.4975, 'https://maps.google.com/?q=24.9978,89.4975', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["রুটিন ডায়াবেটিস সনাক্তকরণ ও চিকিৎসা","রক্তচাপ ও কার্ডিওভাসকুলার মনিটরিং","ইনসুলিন সরবরাহ ও খাদ্য নিয়ন্ত্রণ শিক্ষা","নিয়মিত বিশেষজ্ঞ চেম্বার"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-spcl-40001029', '40001029', 'Sonatala Smile Dental Clinic', 'সোনাতলা স্মাইল ডেন্টাল ক্লিনিক',
  'sonatala-smile-dental-clinic', 'Dental Clinics', 'specialized_dental_clinic',
  'Dental Clinic', 'private', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Sonatala Sadar', 'সোনাতলা সদর', 'Sonatala Bazar',
  'সোনাতলা বাজার রোড, সোনাতলা, বগুড়া - ৫৮২০', '["01715-117733"]'::jsonb, 'sonataladental@gmail.com', 'http://sonatala.bogra.gov.bd',
  24.9965, 89.4962, 'https://maps.google.com/?q=24.9965,89.4962', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  '["ব্যথামুক্ত দাঁত তোলা ও চিকিৎসা","কম্পোজিট ফিলিং ও রুট ক্যানেল","দাঁতের স্কেলিং ও মাড়ির প্রদাহের যত্ন","জরুরি দাঁতের ফার্স্ট এইড"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001001', '50001001', 'Surjer Hashi Clinic (SHN), Bogura Sadar', 'সূর্যের হাসি ক্লিনিক, বগুড়া সদর',
  'surjer-hashi-clinic-bogura-sadar', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary & Maternal Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Sutrapur / Malotinagar',
  'সূত্রাপুর, মালতীনগর রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-64582","01711-229944"]'::jsonb, 'bograsadar@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.8425, 89.3735, 'https://maps.google.com/?q=24.8425,89.3735', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা (MCH)","স্বাভাবিক প্রসব সেবা ও রেফারেল","গর্ভকালীন (ANC) ও প্রসবোত্তর (PNC) যত্ন","ইপিআই টিকাদান ও ভিটামিন বিতরণ","পরিবার পরিকল্পনা পরামর্শ ও ক্লিনিক্যাল পদ্ধতি"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001002', '50001002', 'Marie Stopes Clinic, Bogura', 'ম্যারি স্টোপস ক্লিনিক, বগুড়া',
  'marie-stopes-clinic-bogura', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'Reproductive & Maternal Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Jaleshwaritola',
  'জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-69211","09612-600600"]'::jsonb, 'bogra@mariestopesbangladesh.org', 'https://mariestopes.org.bd',
  24.8528, 89.3688, 'https://maps.google.com/?q=24.8528,89.3688', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["নিরাপদ মাতৃত্ব ও স্বাভাবিক প্রসব সেবা","জরায়ুমুখের ক্যান্সার স্ক্রিনিং (VIA Test)","পরিবার পরিকল্পনা সামগ্রী ও স্থায়ী পদ্ধতি","কৈশোরবান্ধব প্রজনন স্বাস্থ্য সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://mariestopes.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001003', '50001003', 'BRAC Health Centre, Bogura Sadar', 'ব্র্যাক স্বাস্থ্য কেন্দ্র, বগুড়া সদর',
  'brac-health-centre-bogura-sadar', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Community Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Erulia', 'এরুলিয়া', 'Erulia Bazar Area',
  'এরুলিয়া বাজার সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '["01713-069811"]'::jsonb, 'health.bogra@brac.net', 'https://brac.net',
  24.8712, 89.3155, 'https://maps.google.com/?q=24.8712,89.3155', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["কমিউনিটি গর্ভবতী চেকআপ","শিশুর পুষ্টি ও বৃদ্ধি পর্যবেক্ষণ","যক্ষ্মা ও সংক্রামক রোগ নিয়ন্ত্রণ স্ক্রিনিং","সাশ্রয়ী মূল্যে প্রাথমিক চিকিৎসা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://brac.net"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001004', '50001004', 'Ghashful Health & Family Welfare Centre, Bogura', 'ঘাসফুল স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র, বগুড়া',
  'ghashful-health-centre-bogura', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Health Sub-Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Fapor', 'ফাঁপোর', 'Fapor Village',
  'ফাঁপোর গ্রাম, বগুড়া সদর, বগুড়া - ৫৮০০', '["01711-447700"]'::jsonb, 'bogra@ghashful-bd.org', 'https://ghashful-bd.org',
  24.8128, 89.3655, 'https://maps.google.com/?q=24.8128,89.3655', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["মাতৃস্বাস্থ্য ও পুষ্টি শিক্ষা","টিকা ও সাধারণ প্রাথমিক চিকিৎসা","কিশোরী স্বাস্থ্য সচেতনতা","জরুরি স্বাস্থ্য পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://ghashful-bd.org"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001005', '50001005', 'Surjer Hashi Clinic, Santahar (Adamdighi)', 'সূর্যের হাসি ক্লিনিক, সান্তাহার (আদমদীঘি)',
  'surjer-hashi-clinic-santahar', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Santahar', 'সান্তাহার', 'Railway Colony, Santahar',
  'রেলওয়ে কলোনি সংলগ্ন, সান্তাহার, আদমদীঘি, বগুড়া - ৫৮৯১', '["01712-446688"]'::jsonb, 'santahar@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.7878, 88.9465, 'https://maps.google.com/?q=24.7878,88.9465', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু প্রাথমিক সেবা","নরমাল ডেলিভারি ও প্রসূতি যত্ন","টিকা ও পুষ্টি কর্মসূচি","পরিবার পরিকল্পনা সামগ্রী"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001006', '50001006', 'TMSS Community Health Centre, Adamdighi', 'টিএমএসএস কমিউনিটি স্বাস্থ্য কেন্দ্র, আদমদীঘি',
  'tmss-health-centre-adamdighi', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Rural Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Adamdighi Sadar', 'আদমদীঘি সদর', 'Bus Stand Area',
  'বাসস্ট্যান্ড রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '["01713-377112"]'::jsonb, 'adamdighi@tmss-health.com', 'https://tmsshealth.com',
  24.7792, 88.9948, 'https://maps.google.com/?q=24.7792,88.9948', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["গ্রামীণ মা ও শিশু স্বাস্থ্য সেবা","বিনামূল্যে পরামর্শ ও সাশ্রয়ী ওষুধ","স্বাভাবিক প্রসব সহায়তা","টিএমএসএস মেডিকেল কলেজ হাসপাতালে রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001007', '50001007', 'Surjer Hashi Clinic, Dhunat', 'সূর্যের হাসি ক্লিনিক, ধুনট',
  'surjer-hashi-clinic-dhunat', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Sadar', 'ধুনট সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স সংলগ্ন, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০', '["01714-771188"]'::jsonb, 'dhunat@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.6768, 89.5412, 'https://maps.google.com/?q=24.6768,89.5412', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী মায়েদের যত্ন ও স্বাভাবিক প্রসব","শিশু পুষ্টি ও টিকাদান","সাধারণ রোগীর আউটডোর চিকিৎসা","পরিবার পরিকল্পনা পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001008', '50001008', 'BRAC Maternal & Child Health Clinic, Dhunat', 'ব্র্যাক মাতৃ ও শিশু স্বাস্থ্য ক্লিনিক, ধুনট',
  'brac-health-clinic-dhunat', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Community Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Chikashi', 'চিকাশী', 'Chikashi Bazar',
  'চিকাশী বাজার, ধুনট, বগুড়া - ৫৮৫০', '["01713-069812"]'::jsonb, 'health.dhunat@brac.net', 'https://brac.net',
  24.7132, 89.5721, 'https://maps.google.com/?q=24.7132,89.5721', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল সংলগ্ন মা ও শিশু স্বাস্থ্য","ডায়রিয়া ও নিউমোনিয়া প্রাথমিক চিকিৎসা","ইপিআই টিকাদান ও ভিটামিন এ ক্যাপসুল","জরুরি রেফারেল সার্ভিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://brac.net"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001009', '50001009', 'Surjer Hashi Clinic, Dhupchanchia', 'সূর্যের হাসি ক্লিনিক, দুপচাঁচিয়া',
  'surjer-hashi-clinic-dhupchanchia', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dhupchanchia Sadar', 'দুপচাঁচিয়া সদর', 'Thana Mor',
  'থানা মোড়, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01712-331199"]'::jsonb, 'dhupchanchia@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.8738, 89.1728, 'https://maps.google.com/?q=24.8738,89.1728', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","নিরাপদ স্বাভাবিক প্রসব","ইপিআই টিকা প্রদান","পরিবার পরিকল্পনা পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001010', '50001010', 'TMSS Health Care Centre, Dhupchanchia', 'টিএমএসএস স্বাস্থ্য সেবা কেন্দ্র, দুপচাঁচিয়া',
  'tmss-health-centre-dhupchanchia', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Health Sub-Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Talora', 'তালোড়া', 'Talora Bazar',
  'তালোড়া বাজার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01713-377113"]'::jsonb, 'dhupchanchia@tmss-health.com', 'https://tmsshealth.com',
  24.8358, 89.1605, 'https://maps.google.com/?q=24.8358,89.1605', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["শিল্প এলাকার শ্রমিকদের প্রাথমিক চিকিৎসা","মাতৃস্বাস্থ্য ও পুষ্টি সেবা","সাধারণ রোগীর আউটডোর কনসালটেশন","রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001011', '50001011', 'Surjer Hashi Clinic, Gabtali', 'সূর্যের হাসি ক্লিনিক, গাবতলী',
  'surjer-hashi-clinic-gabtali', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Gabtali Sadar', 'গাবতলী সদর', 'Thana Mor',
  'থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '["01713-448822"]'::jsonb, 'gabtali@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.8808, 89.4632, 'https://maps.google.com/?q=24.8808,89.4632', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মাতৃ ও শিশু স্বাস্থ্য সেবা","স্বাভাবিক প্রসব সেবা ও পরিবার পরিকল্পনা","শিশুর টিকাদান ও পুষ্টি সহায়তা","সাধারণ চিকিৎসা পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001012', '50001012', 'TMSS Health Centre, Gabtali', 'টিএমএসএস স্বাস্থ্য কেন্দ্র, গাবতলী',
  'tmss-health-centre-gabtali', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Rural Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Baliadighi', 'বালিয়াদিঘী', 'Baliadighi Bazar',
  'বালিয়াদিঘী বাজার, গাবতলী, বগুড়া - ৫৮২০', '["01713-377114"]'::jsonb, 'gabtali@tmss-health.com', 'https://tmsshealth.com',
  24.8632, 89.5135, 'https://maps.google.com/?q=24.8632,89.5135', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["গ্রামীণ কমিউনিটি স্বাস্থ্য সেবা","গর্ভবতী চেকআপ ও মা ও শিশু যত্ন","অল্প খরচে প্রয়োজনীয় ওষুধ বিতরণ","হাসপাতালে জরুরি রোগী রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001013', '50001013', 'Surjer Hashi Clinic, Kahalu', 'সূর্যের হাসি ক্লিনিক, কাহালু',
  'surjer-hashi-clinic-kahalu', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahalu Sadar', 'কাহালু সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '["01711-552277"]'::jsonb, 'kahalu@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.8282, 89.2638, 'https://maps.google.com/?q=24.8282,89.2638', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["গর্ভবতী মায়েদের প্রসবপূর্ব ও প্রসবোত্তর চেকআপ","স্বাভাবিক প্রসব সেবা","শিশুর টিকাদান ও বৃদ্ধি পর্যবেক্ষণ","পরিবার পরিকল্পনা সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001014', '50001014', 'TMSS Health Centre, Kahalu', 'টিএমএসএস স্বাস্থ্য কেন্দ্র, কাহালু',
  'tmss-health-centre-kahalu', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Health Sub-Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Murail', 'মুরইল', 'Murail Bazar',
  'মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০', '["01713-377115"]'::jsonb, 'kahalu@tmss-health.com', 'https://tmsshealth.com',
  24.7992, 89.2418, 'https://maps.google.com/?q=24.7992,89.2418', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য ও মা-শিশু পরামর্শ","স্বাভাবিক প্রসব সহায়তা","ওষুধ সরবরাহ ও কাউন্সেলিং","রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001015', '50001015', 'Surjer Hashi Clinic, Nandigram', 'সূর্যের হাসি ক্লিনিক, নন্দীগ্রাম',
  'surjer-hashi-clinic-nandigram', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Bus Stand Area',
  'বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01712-221177"]'::jsonb, 'nandigram@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.6782, 89.1928, 'https://maps.google.com/?q=24.6782,89.1928', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা","ইপিআই টিকাদান ও ভিটামিন বিতরণ","সাধারণ রোগীর আউটডোর চিকিৎসা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001016', '50001016', 'TMSS Health Centre, Nandigram', 'টিএমএসএস স্বাস্থ্য কেন্দ্র, নন্দীগ্রাম',
  'tmss-health-centre-nandigram', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Health Sub-Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Bhatra', 'ভাটরা', 'Bhatra Bazar',
  'ভাটরা বাজার, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01713-377116"]'::jsonb, 'nandigram@tmss-health.com', 'https://tmsshealth.com',
  24.6225, 89.2162, 'https://maps.google.com/?q=24.6225,89.2162', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["গ্রামীণ কমিউনিটি স্বাস্থ্য সেবা","প্রসূতি যত্ন ও টিকা কার্যক্রম","প্রাথমিক চিকিৎসা ও ফার্স্ট এইড","রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001017', '50001017', 'BRAC Char Health & Nutrition Centre, Sariakandi', 'ব্র্যাক চরাঞ্চল স্বাস্থ্য ও পুষ্টি কেন্দ্র, সারিয়াকান্দি',
  'brac-char-health-centre-sariakandi', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Riverine Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Kutubpur', 'কুতুবপুর', 'Kutubpur Jamuna Char',
  'কুতুবপুর চর সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01713-069813"]'::jsonb, 'health.sariakandi@brac.net', 'https://brac.net',
  24.8725, 89.6215, 'https://maps.google.com/?q=24.8725,89.6215', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["যমুনা চরাঞ্চলের মানুষের জন্য বিশেষ স্বাস্থ্য সেবা","মা ও শিশুর পুষ্টি ও টিকাদান","বন্যা ও দুর্যোগকালীন মেডিকেল সহায়তা","জরুরি নৌ-অ্যাম্বুলেন্স সমন্বয়"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://brac.net"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001018', '50001018', 'TMSS Char Community Clinic, Sariakandi', 'টিএমএসএস চরাঞ্চল কমিউনিটি ক্লিনিক, সারিয়াকান্দি',
  'tmss-char-clinic-sariakandi', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Riverine Community Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Chaluabari', 'চালুয়াবাড়ী', 'Chaluabari Island Char',
  'চালুয়াবাড়ী দ্বীপ চর, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01713-377117"]'::jsonb, 'sariakandi@tmss-health.com', 'https://tmsshealth.com',
  25.0442, 89.6135, 'https://maps.google.com/?q=25.0442,89.6135', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চলের প্রত্যন্ত জনগোষ্ঠীর স্বাস্থ্য সেবা","স্বাভাবিক প্রসব ও নিরাপদ মাতৃত্ব","বিনামূল্যে প্রাথমিক ওষুধ বিতরণ","উপজেলা স্বাস্থ্য কমপ্লেক্সে রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001019', '50001019', 'Surjer Hashi Clinic, Shajahanpur', 'সূর্যের হাসি ক্লিনিক, শাজাহানপুর',
  'surjer-hashi-clinic-shajahanpur', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Majhira', 'মাঝিড়া', 'Majhira Highway Mor',
  'ঢাকা মহাসড়ক সংলগ্ন, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-661133"]'::jsonb, 'shajahanpur@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.7818, 89.3952, 'https://maps.google.com/?q=24.7818,89.3952', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব সেবা ও পরিবার পরিকল্পনা","ইপিআই টিকাদান ও স্বাস্থ্য শিক্ষা","আউটডোর ডাক্তার কনসালটেশন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001020', '50001020', 'TMSS Community Health Centre, Shajahanpur', 'টিএমএসএস কমিউনিটি স্বাস্থ্য কেন্দ্র, শাজাহানপুর',
  'tmss-health-centre-shajahanpur', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Health Sub-Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Aria', 'আড়িয়া', 'Aria Bazar',
  'আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১', '["01713-377118"]'::jsonb, 'shajahanpur@tmss-health.com', 'https://tmsshealth.com',
  24.7652, 89.4118, 'https://maps.google.com/?q=24.7652,89.4118', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["প্রাথমিক স্বাস্থ্য ও মা-শিশু সেবা","স্বাভাবিক প্রসব ও টিকা","সাশ্রয়ী প্যাথলজি টেস্ট ও ওষুধ","রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001021', '50001021', 'Surjer Hashi Clinic, Sherpur', 'সূর্যের হাসি ক্লিনিক, শেরপুর',
  'surjer-hashi-clinic-sherpur', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Dhaka Road, Sherpur Sadar',
  'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '["01711-337722","05029-77312"]'::jsonb, 'sherpur@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.6782, 89.4292, 'https://maps.google.com/?q=24.6782,89.4292', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","২৪ ঘন্টা নিরাপদ প্রসব সেবা","ইপিআই টিকাদান ও ভিটামিন কর্মসূচি","পরিবার পরিকল্পনা সামগ্রী ও পরামর্শ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001022', '50001022', 'Marie Stopes Maternal Centre, Sherpur', 'ম্যারি স্টোপস মাতৃসেবা কেন্দ্র, শেরপুর',
  'marie-stopes-centre-sherpur', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Reproductive Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Bus Stand Road',
  'বাসস্ট্যান্ড রোড, শেরপুর, বগুড়া - ৫৮৪০', '["01712-881144"]'::jsonb, 'sherpur@mariestopesbangladesh.org', 'https://mariestopes.org.bd',
  24.6758, 89.4262, 'https://maps.google.com/?q=24.6758,89.4262', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["নিরাপদ মাতৃত্ব ও স্বাভাবিক প্রসব","জরায়ুমুখের ক্যান্সার স্ক্রিনিং ও প্রজনন স্বাস্থ্য","আধুনিক পরিবার পরিকল্পনা পদ্ধতি","কিশোরী স্বাস্থ্য ও পুষ্টি কাউন্সেলিং"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://mariestopes.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001023', '50001023', 'BRAC Health Centre, Sherpur', 'ব্র্যাক স্বাস্থ্য কেন্দ্র, শেরপুর',
  'brac-health-centre-sherpur', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Community Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Mirzapur', 'মির্জাপুর', 'Mirzapur Bazar',
  'মির্জাপুর বাজার, শেরপুর, বগুড়া - ৫৮৪০', '["01713-069814"]'::jsonb, 'health.sherpur@brac.net', 'https://brac.net',
  24.7125, 89.4352, 'https://maps.google.com/?q=24.7125,89.4352', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '["কমিউনিটি গর্ভবতী চেকআপ","শিশু পুষ্টি ও স্বাভাবিক প্রসব সচেতনতা","সংক্রামক রোগ নিয়ন্ত্রণ ও চিকিৎসা","রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://brac.net"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001024', '50001024', 'Surjer Hashi Clinic, Shibganj', 'সূর্যের হাসি ক্লিনিক, শিবগঞ্জ',
  'surjer-hashi-clinic-shibganj', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Primary Health Clinic', 'ngo', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Shibganj Sadar', 'শিবগঞ্জ সদর', 'Thana Mor',
  'থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01712-774411"]'::jsonb, 'shibganj@surjerhashi.org.bd', 'https://surjerhashi.org.bd',
  24.9782, 89.3142, 'https://maps.google.com/?q=24.9782,89.3142', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য সেবা","স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা","টিকা ও ভিটামিন বিতরণ","সাধারণ রোগীর চিকিৎসা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://surjerhashi.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001025', '50001025', 'BRAC Primary Health Centre, Shibganj', 'ব্র্যাক প্রাথমিক স্বাস্থ্য কেন্দ্র, শিবগঞ্জ',
  'brac-health-centre-shibganj', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Community Health Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Mokamtala', 'মোকামতলা', 'Mokamtala Mor',
  'মোকামতলা মোড় সংলগ্ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01713-069815"]'::jsonb, 'health.shibganj@brac.net', 'https://brac.net',
  25.0028, 89.3528, 'https://maps.google.com/?q=25.0028,89.3528', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["কমিউনিটি গর্ভবতী স্বাস্থ্য পরীক্ষা","শিশু পুষ্টি ও বৃদ্ধি পর্যবেক্ষণ","টিবি ও সাধারণ স্বাস্থ্য পরামর্শ","হাসপাতালে দ্রুত রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://brac.net"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-ngo-50001026', '50001026', 'TMSS Health Care Sub-Centre, Sonatala', 'টিএমএসএস স্বাস্থ্য সেবা সাব-সেন্টার, সোনাতলা',
  'tmss-health-centre-sonatala', 'NGO Healthcare Facilities', 'ngo_health_facility',
  'NGO Rural Health Sub-Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Sonatala Sadar', 'সোনাতলা সদর', 'Station Road, Sonatala Bazar',
  'স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০', '["01713-377119"]'::jsonb, 'sonatala@tmss-health.com', 'https://tmsshealth.com',
  24.9988, 89.4988, 'https://maps.google.com/?q=24.9988,89.4988', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["মা ও শিশু স্বাস্থ্য পরিচর্যা","স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা","টিকা ও পুষ্টি কর্মসূচি","জরুরি রোগী রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001001', '60001001', 'Bangladesh Red Crescent Society Blood Centre, Bogura', 'বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি রক্ত কেন্দ্র, বগুড়া',
  'red-crescent-blood-centre-bogura', 'Blood Banks', 'specialized_blood_bank',
  'Specialized Blood Transfusion Centre', 'ngo', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Sutrapur',
  'রেড ক্রিসেন্ট ভবন, সূত্রাপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-66543","01711-456789"]'::jsonb, 'bogra@redcrescent.org.bd', 'https://redcrescent.org.bd',
  24.8465, 89.3732, 'https://maps.google.com/?q=24.8465,89.3732', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরি রক্ত সরবরাহ ও ব্লাড গ্রুপিং","প্যাকড রেড ব্লাড সেলস (PRBC) সেপারেশন","ফ্রেশ ফ্রোজেন প্লাজমা (FFP) ও প্লেটলেট কনসেনট্রেট","স্ক্রিনিং টেস্ট (এইচআইভি, হেপাটাইটিস বি ও সি, সিফিলিস, ম্যালেরিয়া)","স্বেচ্ছায় রক্তদান কর্মসূচি ও রক্তদাতা ডাটাবেজ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","https://redcrescent.org.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001002', '60001002', 'Sandhani (SZMC Unit) Blood Bank & Eye Donation Centre', 'সন্ধানী (শজিমেক ইউনিট) রক্ত ব্যাংক ও মরণোত্তর চক্ষুদান কেন্দ্র',
  'sandhani-szmc-blood-bank-bogura', 'Blood Banks', 'voluntary_blood_bank',
  'Medical College Voluntary Blood Bank', 'ngo', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'SZMC Campus, Silimpur',
  'শহীদ জিয়াউর রহমান মেডিকেল কলেজ ক্যাম্পাস, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-60862","01712-001122","01711-002233"]'::jsonb, 'sandhani.szmc@gmail.com', 'http://sandhani.org',
  24.8188, 89.3631, 'https://maps.google.com/?q=24.8188,89.3631', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '["২৪ ঘন্টা জরুরি রক্তের গ্রুপ নির্ণয় ও ক্রস-ম্যাচিং","স্বেচ্ছায় রক্তদান সংগ্রহ ও রোগীর জন্য রক্ত সরবরাহ","মরণোত্তর কর্নিয়া সংগ্রহ ও চক্ষু ব্যাংক সংরক্ষণ","থ্যালাসেমিয়া রোগীদের জন্য নিয়মিত রক্ত পরিসঞ্চালন"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://sandhani.org"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001003', '60001003', 'Mohammad Ali Hospital Blood Transfusion Centre', 'মোহাম্মদ আলী হাসপাতাল রক্ত পরিসঞ্চালন কেন্দ্র',
  'mohammad-ali-hospital-blood-transfusion', 'Blood Banks', 'government_blood_bank',
  'Government District Hospital Blood Transfusion Unit', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Hospital Road',
  'মোহাম্মদ আলী হাসপাতাল কম্পাউন্ড, হাসপাতাল রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-66020","01730-324631"]'::jsonb, 'bogra250@hos.dghs.gov.bd', 'http://bogra250bedhospital.gov.bd',
  24.8475, 89.3758, 'https://maps.google.com/?q=24.8475,89.3758', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
  '["হাসপাতালে ভর্তি ও জরুরি রোগীদের নিরাপদ রক্ত পরিসঞ্চালন","ব্লাড গ্রুপিং ও অ্যান্টিবডি স্ক্রিনিং","রক্তের পাঁচ প্রকার সংক্রামক রোগ পরীক্ষা","জরুরি ডেলিভারি ও সার্জারি ব্লাড রিজার্ভ"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://bogra250bedhospital.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001004', '60001004', 'TMSS Blood Bank & Transfusion Medicine Centre', 'টিএমএসএস ব্লাড ব্যাংক ও ট্রান্সফিউশন মেডিসিন সেন্টার',
  'tmss-blood-bank-bogura', 'Blood Banks', 'private_blood_bank',
  'Private Medical College Blood Bank', 'private', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  'Gokul', 'গোকুল', 'Thengamara, Rangpur Road',
  'টিএমএসএস মেডিকেল কলেজ হাসপাতাল, ঠেঙ্গামারা, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-78567","01711-426749"]'::jsonb, 'bloodbank@tmsshealth.com', 'https://tmsshealth.com',
  24.8985, 89.3512, 'https://maps.google.com/?q=24.8985,89.3512', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ সার্বক্ষণিক রক্তের উপাদান পৃথকীকরণ (Blood Components)","ক্রায়োপ্রিসিপিটেট ও ফ্রেশ প্লাজমা প্রস্তুতি","নিরাপদ ক্রস-ম্যাচিং ও স্ক্রিনিং","কার্ডিয়াক সার্জারি ও ডায়ালাইসিস ব্লাড সাপোর্ট"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","https://tmsshealth.com"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001005', '60001005', 'Badhan Blood Donation Network, Bogura District', 'বাঁধন (স্বেচ্ছায় রক্তদাতাদের সংগঠন) — বগুড়া জেলা ইউনিট',
  'badhan-blood-network-bogura', 'Blood Banks', 'voluntary_blood_network',
  'Voluntary Blood Donor Network', 'ngo', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Govt. Azizul Haque College Campus',
  'সরকারি আজিজুল হক কলেজ প্রাঙ্গণ, ফুলবাড়ি, বগুড়া সদর, বগুড়া - ৫৮০০', '["01711-998877","01722-334455"]'::jsonb, 'badhan.bogra@gmail.com', 'https://badhan.org',
  24.8685, 89.3621, 'https://maps.google.com/?q=24.8685,89.3621', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি রোগীর জন্য তাৎক্ষণিক বিনামূল্যে রক্তদাতা ব্যবস্থা","বিনামূল্যে রক্তের গ্রুপ নির্ণয় ক্যাম্পেইন","তরুণ ও শিক্ষার্থীদের মধ্যে স্বেচ্ছায় রক্তদান সচেতনতা","জরুরি ব্লাড হটলাইন সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","https://badhan.org"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001006', '60001006', 'Fire Service & Civil Defence Central Ambulance Unit, Bogura', 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স কেন্দ্রীয় অ্যাম্বুলেন্স ইউনিট, বগুড়া',
  'fire-service-ambulance-unit-bogura', 'Ambulance Services', 'government_emergency_ambulance',
  'Government Emergency Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Station Road, Fire Station',
  'ফায়ার স্টেশন কম্পাউন্ড, স্টেশন রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '["051-65555","01730-336699","16163"]'::jsonb, 'fs_bogra@fireservice.gov.bd', 'http://fireservice.bogra.gov.bd',
  24.8492, 89.3761, 'https://maps.google.com/?q=24.8492,89.3761', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরি দুর্ঘটনা ও ট্রমা পরিবহন (১৬১৬৩ / ৯৯৯)","অক্সিজেন ও ফার্স্ট এইড সজ্জিত অ্যাম্বুলেন্স","বন্যা, অগ্নিকাণ্ড ও দুর্যোগে আহতদের দ্রুত হাসপাতালে স্থানান্তর","সরকারি নির্ধারিত সাশ্রয়ী ভাড়ায় সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://fireservice.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001007', '60001007', 'SZRMCH Critical Care & ICU Ambulance Fleet', 'শজিমেক হাসপাতাল নিবিড় পরিচর্যা (ICU) অ্যাম্বুলেন্স বহর',
  'szrmch-icu-ambulance-fleet', 'Ambulance Services', 'tertiary_icu_ambulance',
  'Hospital Advanced Life Support Ambulance Fleet', 'government', 'Bogura',
  'বগুড়া', 'Bogura Sadar', 'বগুড়া সদর',
  NULL, NULL, 'Silimpur, Medical Road',
  'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল, সিলিমপুর, বগুড়া - ৫৮০০', '["01711-820847","01730-324610","051-60862"]'::jsonb, 'ambulance@szrmc.gov.bd', 'http://szrmc.gov.bd',
  24.8194, 89.3625, 'https://maps.google.com/?q=24.8194,89.3625', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["অ্যাডভান্সড লাইফ সাপোর্ট (ALS) ও পোর্টেবল ভেন্টিলেটর","আইসিইউ অন হুইলস (ICU on Wheels) ঢাকা ও বিভাগীয় স্থানান্তর","কার্ডিয়াক ডিফিব্রিলেটর ও সার্বক্ষণিক প্যারামেডিক","২৪ ঘন্টা জরুরি রেফারেল সেবা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://szrmc.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001008', '60001008', 'Adamdighi Fire Service & Hospital Emergency Ambulance', 'আদমদীঘি ফায়ার সার্ভিস ও হাসপাতাল জরুরি অ্যাম্বুলেন্স',
  'adamdighi-emergency-ambulance', 'Ambulance Services', 'upazila_emergency_ambulance',
  'Upazila Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Adamdighi', 'আদমদীঘি',
  'Adamdighi Sadar', 'আদমদীঘি সদর', 'Hospital Compound, Adamdighi',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স প্রাঙ্গণ, আদমদীঘি, বগুড়া - ৫৮৯২', '["01730-002211","01730-324620"]'::jsonb, 'adamdighi@uhfpo.dghs.gov.bd', 'http://adamdighi.bogra.gov.bd',
  24.7798, 88.9958, 'https://maps.google.com/?q=24.7798,88.9958', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ জরুরি রোগী পরিবহন ও অক্সিজেন সহায়তা","রেলওয়ে জংশন ও মহাসড়ক দুর্ঘটনা রেসপন্স","বগুড়া মেডিকেল কলেজ হাসপাতালে জরুরি রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://adamdighi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001009', '60001009', 'Dhunat Upazila Health Complex Emergency Ambulance', 'ধুনট উপজেলা স্বাস্থ্য কমপ্লেক্স জরুরি অ্যাম্বুলেন্স',
  'dhunat-emergency-ambulance', 'Ambulance Services', 'upazila_emergency_ambulance',
  'Upazila Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Dhunat', 'ধুনট',
  'Dhunat Sadar', 'ধুনট সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স, ধুনট, বগুড়া - ৫৮৫০', '["01730-324621","01712-884499"]'::jsonb, 'dhunat@uhfpo.dghs.gov.bd', 'http://dhunat.bogra.gov.bd',
  24.6772, 89.5408, 'https://maps.google.com/?q=24.6772,89.5408', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["২৪ ঘন্টা জরুরি প্রসূতি ও সাধারণ রোগী পরিবহন","অক্সিজেন সিলিন্ডার ও প্রাথমিক ট্রমা কেয়ার","জরুরি রেফারেল সার্ভিস"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://dhunat.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001010', '60001010', 'Dhupchanchia Fire Service & Hospital Ambulance Unit', 'দুপচাঁচিয়া ফায়ার সার্ভিস ও হাসপাতাল অ্যাম্বুলেন্স ইউনিট',
  'dhupchanchia-emergency-ambulance', 'Ambulance Services', 'upazila_emergency_ambulance',
  'Upazila Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Dhupchanchia', 'দুপচাঁচিয়া',
  'Dhupchanchia Sadar', 'দুপচাঁচিয়া সদর', 'Bogura-Naogaon Highway',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '["01730-002212","01730-324622"]'::jsonb, 'dhupchanchia@uhfpo.dghs.gov.bd', 'http://dhupchanchia.bogra.gov.bd',
  24.8748, 89.1718, 'https://maps.google.com/?q=24.8748,89.1718', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["মহাসড়ক সড়ক দুর্ঘটনার জরুরি রেসপন্স","২৪/৭ রোগী স্থানান্তর ও অক্সিজেন সাপোর্ট","শজিমেক হাসপাতালে জরুরি রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://dhupchanchia.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001011', '60001011', 'Gabtali Upazila Health Complex Ambulance Service', 'গাবতলী উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস',
  'gabtali-emergency-ambulance', 'Ambulance Services', 'upazila_emergency_ambulance',
  'Upazila Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Gabtali', 'গাবতলী',
  'Gabtali Sadar', 'গাবতলী সদর', 'Thana Mor',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স প্রাঙ্গণ, গাবতলী, বগুড়া - ৫৮২০', '["01730-324623","01711-667700"]'::jsonb, 'gabtali@uhfpo.dghs.gov.bd', 'http://gabtali.bogra.gov.bd',
  24.8798, 89.4638, 'https://maps.google.com/?q=24.8798,89.4638', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি প্রসূতি ও জটিল রোগী পরিবহন","২৪/৭ জরুরি অক্সিজেন সুবিধা","বগুড়া সদর হাসপাতালে দ্রুত স্থানান্তর"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://gabtali.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001012', '60001012', 'Kahalu Upazila Health Complex Ambulance Service', 'কাহালু উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস',
  'kahalu-emergency-ambulance', 'Ambulance Services', 'upazila_emergency_ambulance',
  'Upazila Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Kahalu', 'কাহালু',
  'Kahalu Sadar', 'কাহালু সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স, কাহালু, বগুড়া - ৫৮৭০', '["01730-324624","01715-446688"]'::jsonb, 'kahaloo@uhfpo.dghs.gov.bd', 'http://kahalu.bogra.gov.bd',
  24.8288, 89.2628, 'https://maps.google.com/?q=24.8288,89.2628', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["২৪ ঘন্টা জরুরি রোগী পরিবহন","ফার্স্ট এইড ও অক্সিজেন সাপোর্ট","রেফারেল পরিবহন সুবিধা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://kahalu.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001013', '60001013', 'Nandigram Fire Service & Hospital Emergency Ambulance', 'নন্দীগ্রাম ফায়ার সার্ভিস ও হাসপাতাল জরুরি অ্যাম্বুলেন্স',
  'nandigram-emergency-ambulance', 'Ambulance Services', 'upazila_emergency_ambulance',
  'Upazila Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Nandigram', 'নন্দীগ্রাম',
  'Nandigram Sadar', 'নন্দীগ্রাম সদর', 'Bus Stand Area',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '["01730-002213","01730-324625"]'::jsonb, 'nandigram@uhfpo.dghs.gov.bd', 'http://nandigram.bogra.gov.bd',
  24.6788, 89.1918, 'https://maps.google.com/?q=24.6788,89.1918', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["বগুড়া-নাটোর মহাসড়ক জরুরি দুর্ঘটনা রেসপন্স","২৪/৭ জরুরি অক্সিজেন সাপোর্ট অ্যাম্বুলেন্স","মেডিকেল কলেজ হাসপাতালে রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://nandigram.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001014', '60001014', 'Sariakandi Riverine Speedboat & Road Ambulance Service', 'সারিয়াকান্দি নদীমাতৃক স্পিডবোট ও সড়ক অ্যাম্বুলেন্স সার্ভিস',
  'sariakandi-riverine-ambulance', 'Ambulance Services', 'riverine_water_road_ambulance',
  'Specialized Water & Road Ambulance', 'government', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Sariakandi Sadar', 'সারিয়াকান্দি সদর', 'Jamuna River Ghat & Hospital',
  'যমুনা নদী ঘাট ও উপজেলা স্বাস্থ্য কমপ্লেক্স, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01730-324626","01714-889933"]'::jsonb, 'sariakandi@uhfpo.dghs.gov.bd', 'http://sariakandi.bogra.gov.bd',
  24.8888, 89.5678, 'https://maps.google.com/?q=24.8888,89.5678', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["যমুনা চরাঞ্চলের জন্য বিশেষায়িত দ্রুতগামী ওয়াটার অ্যাম্বুলেন্স (Speedboat Ambulance)","২৪/৭ জরুরি বন্যা ও দুর্যোগকালীন রোগী উদ্ধার","সড়ক অ্যাম্বুলেন্স যোগে জেলা হাসপাতালে স্থানান্তর","জরুরি অক্সিজেন ও সর্পদংশন ফাস্ট এইড"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001015', '60001015', 'Sariakandi Voluntary Blood Donor Network', 'সারিয়াকান্দি স্বেচ্ছায় রক্তদাতা নেটওয়ার্ক',
  'sariakandi-blood-donor-network', 'Blood Banks', 'voluntary_blood_network',
  'Char Blood Donor Network', 'ngo', 'Bogura',
  'বগুড়া', 'Sariakandi', 'সারিয়াকান্দি',
  'Sariakandi Sadar', 'সারিয়াকান্দি সদর', 'Thana Road',
  'থানা রোড, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '["01716-448822"]'::jsonb, 'sariakandiblood@gmail.com', 'http://sariakandi.bogra.gov.bd',
  24.8872, 89.5662, 'https://maps.google.com/?q=24.8872,89.5662', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80',
  '["চরাঞ্চল ও নদী তীরবর্তী রোগীদের জন্য তাৎক্ষণিক রক্তদাতা ব্যবস্থা","রক্তের গ্রুপ ও ক্রস-ম্যাচিং সমন্বয়","জরুরি প্রসব ও রক্তক্ষরণে লাইফ সেভিং সহায়তা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://sariakandi.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001016', '60001016', 'Shajahanpur Highway Fire Service & Emergency Ambulance', 'শাজাহানপুর মহাসড়ক ফায়ার সার্ভিস ও জরুরি অ্যাম্বুলেন্স',
  'shajahanpur-highway-ambulance', 'Ambulance Services', 'highway_emergency_ambulance',
  'Highway Emergency Ambulance', 'government', 'Bogura',
  'বগুড়া', 'Shajahanpur', 'শাজাহানপুর',
  'Majhira', 'মাঝিড়া', 'Dhaka Highway, Majhira',
  'ঢাকা মহাসড়ক, মাঝিড়া ফায়ার স্টেশন, শাজাহানপুর, বগুড়া - ৫৮০১', '["01730-002214","01730-324627"]'::jsonb, 'shajahanpur@uhfpo.dghs.gov.bd', 'http://shajahanpur.bogra.gov.bd',
  24.7828, 89.3955, 'https://maps.google.com/?q=24.7828,89.3955', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["২৪/৭ মহাসড়ক দুর্ঘটনা জরুরি রেসপন্স","গুরুতর ট্রমা রোগীদের শজিমেক হাসপাতালে দ্রুত স্থানান্তর","অক্সিজেন ও লাইফ সাপোর্ট সরঞ্জাম"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://shajahanpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001017', '60001017', 'Sherpur Upazila Fire Service & Hospital Ambulance Fleet', 'শেরপুর উপজেলা ফায়ার সার্ভিস ও হাসপাতাল অ্যাম্বুলেন্স বহর',
  'sherpur-emergency-ambulance', 'Ambulance Services', 'upazila_emergency_ambulance',
  'Upazila Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'Dhaka Road, Sherpur',
  'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '["01730-002215","01730-324628"]'::jsonb, 'sherpur@uhfpo.dghs.gov.bd', 'http://sherpur.bogra.gov.bd',
  24.6785, 89.4295, 'https://maps.google.com/?q=24.6785,89.4295', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["ঢাকা-বগুড়া মহাসড়ক এক্সিডেন্ট ইমার্জেন্সি রেসপন্স","২৪/৭ জরুরি রোগী পরিবহন ও অক্সিজেন","বগুড়া সদর ও ঢাকা রেফারেল সহায়তা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001018', '60001018', 'Sherpur Upazila Blood Donation Club', 'শেরপুর উপজেলা রক্তদান ক্লাব',
  'sherpur-blood-donation-club', 'Blood Banks', 'voluntary_blood_network',
  'Community Blood Donor Network', 'ngo', 'Bogura',
  'বগুড়া', 'Sherpur', 'শেরপুর',
  'Sherpur Pourashava', 'শেরপুর পৌরসভা', 'College Road',
  'কলেজ রোড, শেরপুর, বগুড়া - ৫৮৪০', '["01715-334411"]'::jsonb, 'sherpurbloodclub@gmail.com', 'http://sherpur.bogra.gov.bd',
  24.6802, 89.4308, 'https://maps.google.com/?q=24.6802,89.4308', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80',
  '["জরুরি রোগীদের জন্য ২৪ ঘন্টা রক্তদাতা সরবরাহ","রক্তের গ্রুপ পরীক্ষা ও সচেতনতা","থ্যালাসেমিয়া ও প্রসূতি রোগীদের রক্ত সহায়তা"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://sherpur.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001019', '60001019', 'Shibganj Fire Service & Highway Trauma Ambulance Unit', 'শিবগঞ্জ ফায়ার সার্ভিস ও মহাসড়ক ট্রমা অ্যাম্বুলেন্স ইউনিট',
  'shibganj-highway-ambulance', 'Ambulance Services', 'highway_emergency_ambulance',
  'Highway Emergency Ambulance', 'government', 'Bogura',
  'বগুড়া', 'Shibganj', 'শিবগঞ্জ',
  'Mokamtala', 'মোকামতলা', 'Mokamtala Highway Intersection',
  'মোকামতলা মোড়, রংপুর মহাসড়ক, শিবগঞ্জ, বগুড়া - ৫৮১০', '["01730-002216","01730-324629"]'::jsonb, 'shibganj@uhfpo.dghs.gov.bd', 'http://shibganj.bogra.gov.bd',
  25.0022, 89.3522, 'https://maps.google.com/?q=25.0022,89.3522', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["রংপুর-বগুড়া মহাসড়ক দুর্ঘটনা দ্রুত পরিবহন","২৪/৭ জরুরি অক্সিজেন ও ট্রমা ইমোবিলাইজেশন","শজিমেক হাসপাতালে দ্রুত রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://shibganj.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

INSERT INTO public.healthcare_facilities (
  id, dghs_facility_id, name, name_bn, slug, category, facility_type,
  original_facility_type, ownership, district, district_bn, upazila,
  upazila_bn, union_name, union_bn, village_or_area, address, phone,
  email, website, latitude, longitude, google_maps_url, image_url,
  services, source_urls, verification_status, last_verified
) VALUES (
  'dghs-amb-60001020', '60001020', 'Sonatala Upazila Health Complex Ambulance Service', 'সোনাতলা উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস',
  'sonatala-emergency-ambulance', 'Ambulance Services', 'upazila_emergency_ambulance',
  'Upazila Ambulance Service', 'government', 'Bogura',
  'বগুড়া', 'Sonatala', 'সোনাতলা',
  'Sonatala Sadar', 'সোনাতলা সদর', 'Hospital Road',
  'উপজেলা স্বাস্থ্য কমপ্লেক্স, সোনাতলা, বগুড়া - ৫৮২০', '["01730-324630","01712-559922"]'::jsonb, 'sonatala@uhfpo.dghs.gov.bd', 'http://sonatala.bogra.gov.bd',
  24.9982, 89.4982, 'https://maps.google.com/?q=24.9982,89.4982', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
  '["২৪ ঘন্টা জরুরি প্রসূতি ও সাধারণ রোগী পরিবহন","অক্সিজেন সজ্জিত অ্যাম্বুলেন্স সেবা","বগুড়া সদর হাসপাতালে জরুরি রেফারেল"]'::jsonb, '["https://hris.mohfw.gov.bd/public/facility-registry","https://dghs.gov.bd","http://fireservice.gov.bd","http://bogra.gov.bd","http://sonatala.bogra.gov.bd"]'::jsonb, 'verified',
  '2026-11-21'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_bn = EXCLUDED.name_bn,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  services = EXCLUDED.services,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude;

-- ========================================================
-- SEED: HOSPITALS COMPATIBILITY TABLE (352 RECORDS)
-- ========================================================

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আদমদীঘি উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Adamdighi Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'বগুড়া-নওগাঁ মহাসড়ক, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620, 01710-751224', 'জরুরি বিভাগ (২৪ ঘণ্টা), বহির্বিভাগ (OPD), আন্তঃবিভাগ (৫০ শয্যা)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া (সদর) উপজেলা স্বাস্থ্য ও পরিবার পরিকল্পনা কার্যালয়', 'Bogura (Sadar) Upazila Health Office', 'govt',
  'Upazila Health Office', 'ওয়ার্ড নং ১০, বগুড়া পৌরসভা, বগুড়া সদর, বগুড়া - ৫৮০০', '051-66550, 01712-458920', 'উপজেলা স্বাস্থ্য প্রশাসন, ইপিআই ও টিকাদান সমন্বয়, প্রাথমিক স্বাস্থ্যসেবা তদারকি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ধুনট উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Dhunat Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'হাসপাতাল রোড, ১ নং ওয়ার্ড, ধুনট পৌরসভা, ধুনট, বগুড়া - ৫৮৫০', '01730-324621, 01712-889922', 'জরুরি বিভাগ (২৪ ঘণ্টা), বহির্বিভাগ (OPD), আন্তঃবিভাগ (৫০ শয্যা)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দুপচাঁচিয়া উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Dhupchanchia Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'হাসপাতাল রোড, দুপচাঁচিয়া পৌরসভা, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622, 01303-460210', 'জরুরি সেবা (২৪ ঘণ্টা), অ্যাম্বুলেন্স সার্ভিস, বহির্বিভাগ ও আন্তঃবিভাগ (৫০ শয্যা)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাবতলী উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Gabtali Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'বগুড়া-গাবতলী সড়ক, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'জরুরি বিভাগ (২৪ ঘণ্টা), বহির্বিভাগ (OPD), আন্তঃবিভাগ (৫০ শয্যা)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাহালু উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Kahaloo Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'বগুড়া-নওগাঁ মহাসড়ক, কাহালু পৌরসভা, কাহালু, বগুড়া - ৫৮৭০', '01730-324624, 01712-445566', 'জরুরি বিভাগ (২৪ ঘণ্টা), বহির্বিভাগ (OPD), আন্তঃবিভাগ (৫০ শয্যা)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Nandigram Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'বিজরুল, ভাটগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', '২৪ ঘণ্টা জরুরি সেবা, বহির্বিভাগ, ৫০ শয্যা ইনডোর কেয়ার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সারিয়াকান্দি উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Sariakandi Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'সারিয়াকান্দি সদর, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'জরুরি বিভাগ (২৪ ঘণ্টা), বহির্বিভাগ (OPD), ৫০ শয্যা ভর্তি সুবিধা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শাজাহানপুর উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Shajahanpur Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'মাঝিড়া, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646, 01711-301782, 01730-324877', 'জরুরি সেবা (২৪ ঘণ্টা), হাইওয়ে দুর্ঘটনা জরুরি ট্রমা প্রাথমিক সেবা, বহির্বিভাগ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Sherpur Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'শহীদ ছুনু রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '05029-77047, 01701-248647, 01730-324627', 'জরুরি বিভাগ (২৪ ঘণ্টা), বহির্বিভাগ (OPD), ৫০ শয্যা আন্তঃবিভাগ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শিবগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Shibganj Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'বানাইল, শিবগঞ্জ পৌরসভা, শিবগঞ্জ, বগুড়া - ৫৮১০', '05033-69018, 01730-324628, 01701-248648', '২৪ ঘণ্টা জরুরি বিভাগ, বহির্বিভাগ, ৫০ শয্যা ইনডোর কেয়ার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনাতলা উপজেলা স্বাস্থ্য কমপ্লেক্স', 'Sonatala Upazila Health Complex', 'govt',
  'Upazila Health Complex', 'হাসপাতাল রোড, সোনাতলা পৌরসভা, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649, 01717-547622, 01730-324629', 'জরুরি বিভাগ (২৪ ঘণ্টা), বহির্বিভাগ (OPD), ৫০ শয্যা ভর্তি সুবিধা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া সিভিল সার্জন কার্যালয়', 'Bogra Civil Surgeon Office', 'govt',
  'District Health Administration', 'জলেশ্বরীতলা, ওয়ার্ড নং ৭, বগুড়া পৌরসভা, বগুড়া - ৫৮০০', '02589902130, 01712-458920', 'জেলা স্বাস্থ্য প্রশাসন ও সমন্বয়, সিভিল সার্জন মেডিকেল বোর্ড, জরুরি স্বাস্থ্য নিয়ন্ত্রণ কক্ষ (কন্ট্রোল রুম)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া জেলা রিজার্ভ ইপিআই স্টোর ও প্রশিক্ষণ কেন্দ্র', 'Bogra District Reserve EPI Store & Training Centre', 'govt',
  'Vaccine & Cold Chain Logistics', 'সিভিল সার্জন চত্বর, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০', '02589902130', 'টিকা ও কোল্ড চেইন সংরক্ষণ, ১২টি উপজেলার টিকা সরবরাহ, স্বাস্থ্য সহকারী ও টিকাদানকারী প্রশিক্ষণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'হাজারদীঘি (নূনগোলা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Hazardighi (Noongola) Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'হাজারদীঘি, নূনগোলা ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-458920, 051-66550', 'সাধারণ বহির্বিভাগ চিকিৎসা, জরুরি প্রাথমিক চিকিৎসা, গর্ভবতী ও প্রসূতি মায়েদের সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মাদারগঞ্জ (লাহিড়ীপাড়া) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Mothergonj Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'মাদারগঞ্জ বাজার, লাহিড়ীপাড়া ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-458920, 051-66550', 'সাধারণ স্বাস্থ্যসেবা, উপ-সহকারী কমিউনিটি মেডিকেল অফিসার পরামর্শ, প্রসূতি ও ধাত্রীবিদ্যা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নওদাপাড়া (নিশিন্দারা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Nawdapara (Nishindara) Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'নওদাপাড়া, নিশিন্দারা ইউনিয়ন, বগুড়া-রংপুর মহাসড়ক সংলগ্ন, বগুড়া - ৫৮০০', '01712-458920, 051-66550', 'বহির্বিভাগ সেবা (OPD), প্রাথমিক দুর্ঘটনা ও ট্রমা ড্রেসিং, মা ও শিশু স্বাস্থ্য সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'এরুলিয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Erulia Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'এরুলিয়া বাজার, বগুড়া-নওগাঁ সড়ক, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-458920', 'প্রাথমিক চিকিৎসাসেবা, গর্ভকালীন সেবা (ANC), প্রসবোত্তর সেবা (PNC)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ফাপোর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Fapor Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ফাপোর বাজার, ফাপোর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-458920', 'সাধারণ বহির্বিভাগ চিকিৎসা, মা ও শিশু স্বাস্থ্য সেবা, টিকা কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কুন্দগ্রাম ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Kundagram Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'কুন্দগ্রাম বাজার, কুন্দগ্রাম ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620', 'প্রাথমিক চিকিৎসা, গর্ভবতী মায়ের চেকআপ, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চাঁপাপুর (কাঞ্চনপুর) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Champapur (Kanchanpur) Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'কাঞ্চনপুর, চাঁপাপুর ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620', 'সাধারণ বহির্বিভাগ চিকিৎসা, মা ও শিশু পরিচর্যা, ইপিআই টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ছাতিয়ানগ্রাম ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Chhatiangram Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ছাতিয়ানগ্রাম রেলগেট সংলগ্ন, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620', 'সাধারণ বহির্বিভাগ, প্রসূতি সেবা, শিশু রোগ প্রতিরোধ ও টিকা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সান্তাহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Santahar Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ছোটকি, সান্তাহার ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৫০', '01730-324620', 'বহির্বিভাগ সেবা, প্রাথমিক স্বাস্থ্য পরামর্শ, মাতৃত্ব ও প্রসবকালীন সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ভান্ডারবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Bhandarbari Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ভান্ডারবাড়ী বাজার, যমুনা তীরবর্তী এলাকা, ভান্ডারবাড়ী, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'চরাঞ্চলের জরুরি প্রাথমিক চিকিৎসা, বন্যা কালীন জরুরি সেবা, প্রসূতি ও মা-শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গোপালনগর (ছিকর) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Gopalnagar (Chhikar) Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ছিকর, গোপালনগর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'সাধারণ বহির্বিভাগ চিকিৎসা, মা ও শিশু পরিচর্যা, টিকা কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মথুরাপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Mathurapur Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'মথুরাপুর বাজার, মথুরাপুর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'বহির্বিভাগ স্বাস্থ্যসেবা, গর্ভবতী মায়ের পুষ্টি ও চেকআপ, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'এলাঙ্গী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Elangi Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'এলাঙ্গী বাজার, এলাঙ্গী ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'সাধারণ প্রাথমিক চিকিৎসা, মা ও শিশু স্বাস্থ্য সেবা, টিকাদান ও ইপিআই প্রোগ্রাম'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গুণাহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Gunahar Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'গুণাহার তালুকদার বাড়ি সড়ক, গুণাহার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'বহির্বিভাগ চিকিৎসাসেবা, জরুরি ফার্স্ট এইড ও ড্রেসিং, প্রসূতি ও শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'তালোড়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Talora Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'তালোড়া রেলওয়ে বাজার, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'সাধারণ বহির্বিভাগ চিকিৎসা, মাতৃত্ব ও প্রসবকালীন সেবা, শিশু রোগ প্রতিরোধ ও টিকা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গোবিন্দপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Gobindapur Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'গোবিন্দপুর বাজার, গোবিন্দপুর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'সাধারণ স্বাস্থ্যসেবা, গর্ভবতী চেকআপ, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চামরুল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Chamrul Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'চামরুল বাজার, চামরুল ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'প্রাথমিক চিকিৎসা, মা ও শিশু পরিচর্যা, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রামেশ্বরপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Rameshwarpur Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'রামেশ্বরপুর বাজার, রামেশ্বরপুর ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'সাধারণ বহির্বিভাগ চিকিৎসা, প্রসূতি ও শিশু স্বাস্থ্য সেবা, নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনারায় ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Sonaray Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'সোনারায় বাজার, সোনারায় ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'বহির্বিভাগ চিকিৎসাসেবা, গর্ভবতী চেকআপ ও পরামর্শ, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দূর্গাহাটা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Durgahata Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'দূর্গাহাটা বাজার, দূর্গাহাটা ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'সাধারণ প্রাথমিক চিকিৎসা, মা ও শিশু পরিচর্যা, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সুখানপুকুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Sukhanpukur Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'সুখানপুকুর রেল স্টেশন সড়ক, সুখানপুকুর, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'বহির্বিভাগ চিকিৎসাসেবা, জরুরি ফার্স্ট এইড, মাতৃত্ব ও নবজাতক স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পিলকুঞ্জ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Pilkunja Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'পিলকুঞ্জ, মুরইল ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'সাধারণ প্রাথমিক চিকিৎসা, গর্ভবতী মায়ের সেবা, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মালঞ্চা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Malancha Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'মালঞ্চা বাজার, মালঞ্চা ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'বহির্বিভাগ চিকিৎসাসেবা, প্রসূতি ও শিশু স্বাস্থ্য, টিকা কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নারহট্ট ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Narhatta Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'নারহট্ট বাজার, নারহট্ট ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'সাধারণ স্বাস্থ্যসেবা, মাতৃত্ব ও প্রসবকালীন সেবা, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দুর্গাপুর (পাইকড়) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Durgapur (Paikar) Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'দুর্গাপুর, পাইকড় ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'বহির্বিভাগ সেবা, মা ও শিশু পরিচর্যা, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'থালতা মাঝগ্রাম (বাশো) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Thalta Majhgram (Basho) Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'বাশো, থালতা মাঝগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', 'প্রাথমিক চিকিৎসা সেবা, গর্ভবতী মায়ের চেকআপ, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বুড়ইল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Burail Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'বুড়ইল বাজার, বুড়ইল ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', 'বহির্বিভাগ চিকিৎসাসেবা, প্রসূতি ও শিশু স্বাস্থ্য, ইপিআই সম্প্রসারিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ভাটরা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Bhatra Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ভাটরা বাজার, ভাটরা ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', 'সাধারণ প্রাথমিক চিকিৎসা, মা ও শিশু পরিচর্যা, টিকা প্রদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম সদর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Nandigram Sadar Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ওমরপুর, নন্দীগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', 'বহির্বিভাগ সেবা, মাতৃত্ব ও প্রসবকালীন সেবা, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'হাটফুলবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Hatfulbari Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'হাটফুলবাড়ী বাজার, ফুলবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'সাধারণ বহির্বিভাগ চিকিৎসা, বন্যাপ্রবণ এলাকার জরুরি চিকিৎসা, মা ও শিশু পরিচর্যা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'হাটশেরপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Hatsherpur Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'হাটশেরপুর বাজার, হাটশেরপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'প্রাথমিক স্বাস্থ্যসেবা, গর্ভবতী মা ও নবজাতক পরিচর্যা, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'জোড়গাছা (ভেলাবাড়ী) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Jorgacha (Bhelabari) Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'জোড়গাছা, ভেলাবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'সাধারণ বহির্বিভাগ, মা ও শিশু স্বাস্থ্য সেবা, টিকা কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নাওখিলা (চন্দনবাইশা) ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Nawkhila (Chandanbaisha) Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'নাওখিলা, চন্দনবাইশা বাঁধ এলাকা, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'যমুনা চরাঞ্চলের জরুরি স্বাস্থ্যসেবা, গর্ভবতী মায়ের চেকআপ, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আড়িয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Aria Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'আড়িয়া বাজার, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'সাধারণ বহির্বিভাগ, হাইওয়ে দুর্ঘটনা প্রাথমিক ড্রেসিং, মা ও শিশু পরিচর্যা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মাদলা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Madla Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'মাদলা বাজার, মাদলা ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'প্রাথমিক স্বাস্থ্যসেবা, গর্ভবতী চেকআপ, ইপিআই সম্প্রসারিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গোহাইল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Gohail Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'গোহাইল বাজার, গোহাইল ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'সাধারণ বহির্বিভাগ, প্রসূতি ও শিশু স্বাস্থ্য সেবা, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আমরুল ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Amrool Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ডেমাজানী বাজার, আমরুল ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'সাধারণ প্রাথমিক চিকিৎসা, মা ও শিশু পরিচর্যা, টিকা কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ভবানীপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Bhabanipur Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'ভবানীপুর বাজার ও শক্তিপীঠ সড়ক, ভবানীপুর, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647, 05029-77047', 'সাধারণ বহির্বিভাগ, প্রসূতি ও শিশু স্বাস্থ্য সেবা, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সীমাবাড়ী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Shimabari Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'সীমাবাড়ী বাজার, ঢাকা-বগুড়া মহাসড়ক সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647, 05029-77047', 'মহাসড়ক সংলগ্ন জরুরি ট্রমা ড্রেসিং, সাধারণ বহির্বিভাগ, মা ও শিশু পরিচর্যা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মির্জাপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Mirzapur Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'মির্জাপুর বাজার, মির্জাপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647', 'সাধারণ প্রাথমিক চিকিৎসা, গর্ভবতী মা ও নবজাতক সেবা, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাড়ীদহ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Garidaha Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'কালসীমটি, আরডিএ সংলগ্ন, গাড়ীদহ, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647', 'বহির্বিভাগ চিকিৎসাসেবা, মাতৃত্ব ও প্রসবকালীন সেবা, টিকা কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মোকামতলা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Mokamtala Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'মোকামতলা বাজার, রংপুর মহাসড়ক সংলগ্ন, মোকামতলা, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628, 05033-69018', 'মহাসড়ক সংলগ্ন জরুরি ট্রমা ড্রেসিং, সাধারণ বহির্বিভাগ সেবা, প্রসূতি ও শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বুড়িগঞ্জ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Buriganj Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'বুড়িগঞ্জ বাজার, বুড়িগঞ্জ ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'সাধারণ স্বাস্থ্যসেবা, গর্ভবতী মায়ের চেকআপ, ইপিআই সম্প্রসারিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দেউলী ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Deuli Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'দেউলী বাজার, দেউলী ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'সাধারণ বহির্বিভাগ চিকিৎসা, মা ও শিশু পরিচর্যা, টিকা কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বিহার ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Bihar Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'বিহার বাজার, ভাসু বিহার সংলগ্ন, বিহার, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'ঐতিহাসিক জনপদের সাধারণ স্বাস্থ্যসেবা, প্রসূতি ও শিশু স্বাস্থ্য, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দিগদাইড় ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Digdair Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'দিগদাইড় বাজার, দিগদাইড় ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'সাধারণ প্রাথমিক চিকিৎসা, গর্ভবতী মা ও নবজাতক সেবা, ইপিআই নিয়মিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মধুপুর ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Madhupur Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'মধুপুর বাজার, মধুপুর ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'সাধারণ বহির্বিভাগ চিকিৎসা, মা ও শিশু পরিচর্যা, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পাকুল্লা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Pakulla Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'পাকুল্লা বাজার, যমুনা নদী সংলগ্ন এলাকা, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'যমুনা চরাঞ্চলের জরুরি স্বাস্থ্যসেবা, বন্যা প্রতিরোধ প্রাথমিক চিকিৎসা, মা ও শিশু স্বাস্থ্য পরিচর্যা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বালুয়া ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র', 'Balua Union Health Sub Center', 'govt',
  'Union Health Sub-Centre', 'বালুয়া হাট, বালুয়া ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'সাধারণ বহির্বিভাগ চিকিৎসাসেবা, প্রসূতি ও মা-শিশু স্বাস্থ্য, ইপিআই সম্প্রসারিত টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সাবগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Sabgram Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'সাবগ্রাম বাজার সংলগ্ন, সাবগ্রাম ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '01715-632145, 051-66550', 'প্রসূতি ও গর্ভকালীন সেবা (ANC), স্বাভাবিক প্রসব সেবা (২৪/৭ ডেলিভারি), প্রসবোত্তর সেবা (PNC)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শাকপালা (রাজাপুর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Shakpala (Rajapur) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'শাকপালা, রাজাপুর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-458920', 'মা ও শিশু স্বাস্থ্য সেবা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেখেরকোলা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Sekherkola Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'শেখেরকোলা বাজার সংলগ্ন, শেখেরকোলা ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-458920', 'গর্ভকালীন ও প্রসবোত্তর পরিচর্যা, ২৪/৭ স্বাভাবিক প্রসব, সাধারণ রোগী চিকিৎসাসেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বাঘোপাড়া (গোকুল) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Baghopara (Gokul) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'বাঘোপাড়া, গোকুল ইউনিয়ন, বগুড়া-রংপুর মহাসড়ক, বগুড়া - ৫৮০০', '01712-458920', 'প্রসূতি সেবা ও স্বাভাবিক প্রসব, গর্ভবতী মায়েদের পুষ্টি কাউন্সেলিং, পরিবার পরিকল্পনা পদ্ধতি সামগ্রী বিতরণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'এরুলিয়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Erulia Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'এরুলিয়া পরিষদ কমপ্লেক্স সংলগ্ন, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-458920', 'গর্ভকালীন পরীক্ষা (ANC), ২৪ ঘণ্টা স্বাভাবিক ডেলিভারি, প্রসবোত্তর পরীক্ষা (PNC)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ফাপোর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Fapor Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'ফাপোর পশ্চিমপাড়া, ফাপোর ইউনিয়ন, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-458920', 'মা ও শিশু স্বাস্থ্য সেবা, পরিবার পরিকল্পনা পরামর্শ, কৈশোরকালীন সেবা কর্নার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নসরতপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Nasratpur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'নসরতপুর রেলওয়ে স্টেশন সংলগ্ন, নসরতপুর, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620', '২৪/৭ স্বাভাবিক প্রসব, গর্ভকালীন যত্ন (ANC), প্রসবোত্তর যত্ন (PNC)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আদমদীঘি সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Adamdighi Sadar Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'পুরাতন হাসপাতাল রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620', 'মা ও শিশু স্বাস্থ্য সেবা, পরিবার পরিকল্পনা পদ্ধতি ও কাউন্সেলিং, কৈশোর কর্নার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চাঁপাপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Champapur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'চাঁপাপুর বাজার, চাঁপাপুর ইউনিয়ন, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620', 'গর্ভবতী চেকআপ, স্বাভাবিক ডেলিভারি, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ছাতিয়ানগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Chhatiangram Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'পরিষদ চত্বর, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620', 'প্রসূতি সেবা, নরমাল ডেলিভারি, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কুন্দগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kundagram Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কুন্দগ্রাম হাই স্কুল রোড, কুন্দগ্রাম, আদমদীঘি, বগুড়া - ৫৮৪০', '01730-324620', 'স্বাভাবিক প্রসব সেবা, মাতৃত্বকালীন পুষ্টি ও সেবা, পরিবার পরিকল্পনা ক্লিনিক'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চৌকিবাড়ি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Choukibari Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'চৌকিবাড়ি বাজার, চৌকিবাড়ি ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা), গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বেড়েরবাড়ি (গোপালনগর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Bererbari (Gopalnagar) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'বেড়েরবাড়ি, গোপালনগর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নিমগাছি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Nimgachhi Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'নিমগাছি বাজার, নিমগাছি ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কালেরপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kalerpara Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কালেরপাড়া বাজার, কালেরপাড়া ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'গর্ভবতী চেকআপ, নরমাল ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'এলাঙ্গী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Elangi Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'এলাঙ্গী হাই স্কুল রোড, এলাঙ্গী ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মথুরাপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Mathurapur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'মথুরাপুর পুরাতন বাজার, মথুরাপুর ইউনিয়ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324621', 'গর্ভকালীন যত্ন, স্বাভাবিক ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'জিয়ানগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Zianagar Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'জিয়ানগর বাজার, জিয়ানগর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'স্বাভাবিক প্রসব সেবা, গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দুপচাঁচিয়া সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Dupchanchia Sadar Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'খাঁতাখালী, দুপচাঁচিয়া সদর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'মা ও শিশু স্বাস্থ্য সেবা, পরিবার পরিকল্পনা কাউন্সেলিং, কৈশোর কর্নার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গুণাহার ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Gunahar Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'গুণাহার বাজার, গুণাহার ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'স্বাভাবিক প্রসব সেবা, গর্ভকালীন যত্ন, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গোবিন্দপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Gobindapur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'পরিষদ চত্বর, গোবিন্দপুর ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'প্রসূতি সেবা, নরমাল ডেলিভারি, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চামরুল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Chamrul Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'চামরুল স্কুল রোড, চামরুল ইউনিয়ন, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324622', 'স্বাভাবিক প্রসব সেবা, মাতৃত্বকালীন পুষ্টি ও সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আগুনাথিরহাট ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Agunatirhat Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'আগুনাথিরহাট বাজার, নারুয়ামালা ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা), গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বালিয়া দিঘী (কোলাকোপা) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Balia Dighi (Kolakopa) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কোলাকোপা, বালিয়া দিঘী ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাগইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kagail Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কাগইল বাজার, কাগইল ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নাসিপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Nasipur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'নাসিপুর বাজার, নাসিপুর ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'গর্ভবতী চেকআপ, নরমাল ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নেপালতলী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Nepaltali Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'নেপালতলী বাজার, নেপালতলী ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মহিষাবান ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Mahishaban Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'পোড়াদহ সংলগ্ন, মহিষাবান ইউনিয়ন, গাবতলী, বগুড়া - ৫৮২০', '01730-324623', 'গর্ভকালীন যত্ন, স্বাভাবিক ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মুরইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Murail Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'মুরইল বাজার সংলগ্ন, মুরইল ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'স্বাভাবিক প্রসব সেবা, গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কালাই মাঝপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kalai Majhpara Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'মাঝপাড়া বাজার, কালাই মাঝপাড়া ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'মা ও শিশু স্বাস্থ্য সেবা, পরিবার পরিকল্পনা পদ্ধতি, কৈশোর কর্নার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'জামগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Jamgaon Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'জামগ্রাম বাজার, জামগ্রাম ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'স্বাভাবিক প্রসব সেবা, গর্ভকালীন যত্ন, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আঘোর (মালঞ্চা) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Aghor (Malancha) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'আঘোর, মালঞ্চা ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'প্রসূতি সেবা, নরমাল ডেলিভারি, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নারহট্ট ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Narahatta Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'নারহট্ট স্কুল রোড, নারহট্ট ইউনিয়ন, কাহালু, বগুড়া - ৫৮৭০', '01730-324624', 'স্বাভাবিক প্রসব সেবা, মাতৃত্বকালীন পুষ্টি ও সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ভাটরা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Bhatra Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'ভাটরা হাই স্কুল রোড, ভাটরা ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', 'স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা), গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বুড়ইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Burail Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'বুড়ইল পরিষদ কমপ্লেক্স, বুড়ইল ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'থালতা মাঝগ্রাম ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Thalta Majhgram Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'থালতা বাজার, থালতা মাঝগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম সদর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Nandigram Sadar Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'ওমরপুর, নন্দীগ্রাম ইউনিয়ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324625', 'গর্ভবতী চেকআপ, নরমাল ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চালুয়াবাড়ী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Chaluabari Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'চালুয়াবাড়ী যমুনা চর এলাকা, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'চরাঞ্চলের জরুরি স্বাভাবিক প্রসব, গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কর্ণিবাড়ী ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kornibari Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কর্ণিবাড়ী বাজার, কর্ণিবাড়ী ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বোহাইল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Bohail Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'বোহাইল বাজার, যমুনা চর এলাকা, বোহাইল ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'চরাঞ্চল প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাজলা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kazla Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কাজলা বাজার, কাজলা ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'গর্ভবতী চেকআপ, নরমাল ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কামালপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kamalpur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কামালপুর বাজার, কামালপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কুতুবপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kutubpur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কুতুবপুর বাজার, কুতুবপুর ইউনিয়ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626', 'গর্ভকালীন যত্ন, স্বাভাবিক ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'খোট্টাপাড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Khottapara Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'খোট্টাপাড়া বাজার, খোট্টাপাড়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা), গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চোপিনগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Chopinagar Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'চোপিনগর বাজার, চোপিনগর ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আশেকপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Ashekpur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'রাণীরহাট, আশেকপুর ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মাঝিড়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Majhira Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'মাঝিড়া সেনানিবাস সংলগ্ন, মাঝিড়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'গর্ভবতী চেকআপ, নরমাল ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আড়িয়া ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Aria Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'রহিমাবাদ সড়ক, আড়িয়া ইউনিয়ন, শাজাহানপুর, বগুড়া - ৫৮০১', '01701-248646', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কুসুম্বী (আলতাদিঘী) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kusumbi (Altadighi) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'আলতাদিঘী, কুসুম্বী ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647', 'স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা), গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বিশালপুর (পাঁচুয়াল) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Bishalpur (Pachual) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'পাঁচুয়াল, বিশালপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সুঘাট (জয়লাজুয়ান) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Sughat (Joylajowan) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'জয়লাজুয়ান, সুঘাট ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'খামারকান্দি ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Khamarkandi Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'খামারকান্দি বাজার, খামারকান্দি ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647', 'গর্ভবতী চেকআপ, নরমাল ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'খানপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Khanpur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'খানপুর বাজার, খানপুর ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাড়ীদহ (কালসীমটি) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Garidaha (Kalsimati) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কালসীমটি, আরডিএ সংলগ্ন, গাড়ীদহ ইউনিয়ন, শেরপুর, বগুড়া - ৫৮৪০', '01701-248647', 'স্বাভাবিক প্রসব সেবা, মাতৃত্বকালীন পুষ্টি ও সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গঙ্গানগর (সৈয়দপুর) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Ganganagar (Sayedpur) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'গঙ্গানগর, সৈয়দপুর ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা), গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ময়দানহাটা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Maydanhat Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'ময়দানহাটা বাজার, ময়দানহাটা ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পীরব ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Pirab Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'পীরব বাজার, পীরব ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রায়নগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Raynagar Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'রায়নগর বাজার, রায়নগর ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'গর্ভবতী চেকআপ, নরমাল ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আটমূল ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Atmul Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'আটমূল বাজার, আটমূল ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কিচক ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Kichak Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'কিচক বাজার, কিচক ইউনিয়ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324628', 'গর্ভকালীন যত্ন, স্বাভাবিক ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'জোড়গাছা (ভেলুরপাড়া) ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Jorgacha (Valurpara) Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'ভেলুরপাড়া রেল স্টেশন সংলগ্ন, জোড়গাছা ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'স্বাভাবিক প্রসব সেবা (২৪ ঘণ্টা), গর্ভবতী মা ও নবজাতক সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দিগদাইড় ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Digdair Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'দিগদাইড় হাই স্কুল রোড, দিগদাইড় ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মধুপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Madhupur Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'মধুপুর বাজার, মধুপুর ইউনিয়ন, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'প্রসূতি সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পাকুল্লা ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Pakulla Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'পাকুল্লা বাজার, যমুনা বন্যা নিয়ন্ত্রণ বাঁধ, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'চরাঞ্চল প্রসূতি সেবা, নরমাল ডেলিভারি, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'তৈকানী চুকাইনগর ইউনিয়ন স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র', 'Tekani Chukainagar Union Health & Family Welfare Centre', 'govt',
  'Union Health & Family Welfare Centre', 'চুকাইনগর বাজার, যমুনা তীরবর্তী এলাকা, তৈকানী চুকাইনগর, সোনাতলা, বগুড়া - ৫৮২০', '01701-248649', 'চরাঞ্চল মা ও শিশু স্বাস্থ্য সেবা, স্বাভাবিক প্রসব, পরিবার পরিকল্পনা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শিকারপুর কমিউনিটি ক্লিনিক', 'Shikarpur Community Clinic', 'govt',
  'Community Clinic', 'শিকারপুর গ্রাম, এরুলিয়া, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-780101', 'বিনামূল্যে ৩০ প্রকার ওষুধ বিতরণ, প্রাথমিক স্বাস্থ্য সেবা, মা ও শিশু স্বাস্থ্য সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কৈচর কমিউনিটি ক্লিনিক', 'Koichor Community Clinic', 'govt',
  'Community Clinic', 'কৈচর দক্ষিণপাড়া, ফাঁপোর, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-780102', 'বিনামূল্যে প্রয়োজনীয় ওষুধ, সাধারণ রোগের প্রাথমিক চিকিৎসা, গর্ভবতী ও প্রসূতি সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পলাশবাড়ী কমিউনিটি ক্লিনিক', 'Palashbari Community Clinic', 'govt',
  'Community Clinic', 'পলাশবাড়ী গ্রাম, গোকুল, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-780103', 'প্রাথমিক স্বাস্থ্যসেবা, বিনামূল্যে ওষুধ সরবরাহ, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাজীপুর কমিউনিটি ক্লিনিক', 'Kazipur Community Clinic', 'govt',
  'Community Clinic', 'কাজীপুর পশ্চিমপাড়া, লাহিড়ীপাড়া, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-780104', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু স্বাস্থ্য সেবা, স্বাভাবিক প্রসব রেফারেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বাকশৈল কমিউনিটি ক্লিনিক', 'Baksmoil Community Clinic', 'govt',
  'Community Clinic', 'বাকশৈল গ্রাম, নামুজা, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-780105', 'প্রাথমিক চিকিৎসা, জরুরী রেফারেল সেবা, গর্ভকালীন চেকআপ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চকলোকমান কমিউনিটি ক্লিনিক', 'Choklokman Community Clinic', 'govt',
  'Community Clinic', 'চকলোকমান বাজার সংলগ্ন, সাবগ্রাম, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-780106', 'বিনামূল্যে ওষুধ বিতরণ, পরিবার পরিকল্পনা উপাদান বিতরণ, রক্তচাপ ও ডায়াবেটিস স্ক্রিনিং'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শালগ্রাম কমিউনিটি ক্লিনিক', 'Shalgram Community Clinic', 'govt',
  'Community Clinic', 'শালগ্রাম, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '01713-780107', 'প্রাথমিক স্বাস্থ্য সেবা, বিনামূল্যে ওষুধ, টিকা প্রদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'উথরাইল কমিউনিটি ক্লিনিক', 'Uthrail Community Clinic', 'govt',
  'Community Clinic', 'উথরাইল গ্রাম, চাঁপাপুর, আদমদীঘি, বগুড়া - ৫৮৯২', '01713-780108', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু স্বাস্থ্য, পরিবার পরিকল্পনা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বাগবাড়ি কমিউনিটি ক্লিনিক', 'Bagbari Community Clinic', 'govt',
  'Community Clinic', 'বাগবাড়ি গ্রাম, ছাতিয়ানগ্রাম, আদমদীঘি, বগুড়া - ৫৮৯২', '01713-780109', 'সাধারণ রোগীর চিকিৎসা, গর্ভকালীন যত্ন, পুষ্টি কার্যক্রম'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'তারাপুর কমিউনিটি ক্লিনিক', 'Tarapur Community Clinic', 'govt',
  'Community Clinic', 'তারাপুর, কুন্দগ্রাম, আদমদীঘি, বগুড়া - ৫৮৯২', '01713-780110', 'প্রাথমিক স্বাস্থ্য সেবা, ওষুধ বিতরণ, মা ও শিশু যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মুরইল কমিউনিটি ক্লিনিক', 'Murail CC (Nasratpur)', 'govt',
  'Community Clinic', 'মুরইল গ্রাম, নসরতপুর, আদমদীঘি, বগুড়া - ৫৮৯২', '01713-780111', 'বিনামূল্যে ওষুধ, প্রাথমিক চিকিৎসা, গর্ভবতী সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সান্দিড়া কমিউনিটি ক্লিনিক', 'Sandira Community Clinic', 'govt',
  'Community Clinic', 'সান্দিড়া, সান্তাহার গ্রামীণ এলাকা, আদমদীঘি, বগুড়া - ৫৮৯১', '01713-780112', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু স্বাস্থ্য সেবা, কৈশোরবান্ধব সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বৈশাখী চর কমিউনিটি ক্লিনিক', 'Boishakhi Char Community Clinic', 'govt',
  'Community Clinic', 'বৈশাখী চর, যমুনা নদীর অববাহিকা, ভান্ডারবাড়ী, ধুনট, বগুড়া - ৫৮৫০', '01713-780113', 'চরাঞ্চল জরুরী প্রাথমিক স্বাস্থ্য সেবা, বিনামূল্যে ওষুধ, প্রসবপূর্ব পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দিঘলকান্দি কমিউনিটি ক্লিনিক', 'Dighalkandi Community Clinic', 'govt',
  'Community Clinic', 'দিঘলকান্দি, চৌকিবাড়ী, ধুনট, বগুড়া - ৫৮৫০', '01713-780114', 'প্রাথমিক চিকিৎসা, ওষুধ বিতরণ, মা ও শিশু স্বাস্থ্য সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বড়চাপড়া কমিউনিটি ক্লিনিক', 'Boro Chapra Community Clinic', 'govt',
  'Community Clinic', 'বড়চাপড়া, চিকাশী, ধুনট, বগুড়া - ৫৮৫০', '01713-780115', 'বিনামূল্যে ৩০ প্রকার ওষুধ, সাধারণ রোগীর সেবা, গর্ভবতী চেকআপ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বিলকাজুলী কমিউনিটি ক্লিনিক', 'Bilkajuli Community Clinic', 'govt',
  'Community Clinic', 'বিলকাজুলী, এলাঙ্গী, ধুনট, বগুড়া - ৫৮৫০', '01713-780116', 'প্রাথমিক চিকিৎসা, ওষুধ বিতরণ, শিশু পুষ্টি পর্যবেক্ষণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বানিয়াযান কমিউনিটি ক্লিনিক', 'Baniyajan Community Clinic', 'govt',
  'Community Clinic', 'বানিয়াযান, গোসাইবাড়ী, ধুনট, বগুড়া - ৫৮৫০', '01713-780117', 'বিনামূল্যে ওষুধ, মা ও শিশু যত্ন, পরিবার পরিকল্পনা পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নান্দিয়ারপাড়া কমিউনিটি ক্লিনিক', 'Nandiyarpara Community Clinic', 'govt',
  'Community Clinic', 'নান্দিয়ারপাড়া, নিমগাছি, ধুনট, বগুড়া - ৫৮৫০', '01713-780118', 'বিনামূল্যে ওষুধ বিতরণ, প্রাথমিক স্বাস্থ্য সেবা, গর্ভবতী মায়েদের পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ফেঁপি কমিউনিটি ক্লিনিক', 'Phepi Community Clinic', 'govt',
  'Community Clinic', 'ফেঁপি গ্রাম, চামরুল, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01713-780119', 'বিনামূল্যে ওষুধ, প্রাথমিক চিকিৎসা, মা ও শিশু যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কুর্শাহার কমিউনিটি ক্লিনিক', 'Kurshahar Community Clinic', 'govt',
  'Community Clinic', 'কুর্শাহার, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01713-780120', 'প্রাথমিক সেবা, ওষুধ বিতরণ, গর্ভবতী স্বাস্থ্য পরীক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বালুকা কমিউনিটি ক্লিনিক', 'Baluka Community Clinic', 'govt',
  'Community Clinic', 'বালুকা গ্রাম, গোবিন্দপুর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01713-780121', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু স্বাস্থ্য, পরিবার পরিকল্পনা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সুখানগাড়ী কমিউনিটি ক্লিনিক', 'Sukhangari Community Clinic', 'govt',
  'Community Clinic', 'সুখানগাড়ী গ্রাম, গুনাহার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01713-780122', 'প্রাথমিক স্বাস্থ্য সেবা, ওষুধ সরবরাহ, গর্ভবতী সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দেবখন্ড কমিউনিটি ক্লিনিক', 'Debkhanda Community Clinic', 'govt',
  'Community Clinic', 'দেবখন্ড গ্রাম, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01713-780123', 'বিনামূল্যে ওষুধ, মা ও শিশু স্বাস্থ্য সেবা, কৈশোরকালীন পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পোথা কমিউনিটি ক্লিনিক', 'Potha Community Clinic', 'govt',
  'Community Clinic', 'পোথা গ্রাম, জিয়ানগর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01713-780124', 'প্রাথমিক স্বাস্থ্য সেবা, বিনামূল্যে ওষুধ বিতরণ, পরিবার পরিকল্পনা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মালিয়ান্দহ কমিউনিটি ক্লিনিক', 'Maliandaha Community Clinic', 'govt',
  'Community Clinic', 'মালিয়ান্দহ গ্রাম, বালিয়াদিঘী, গাবতলী, বগুড়া - ৫৮২০', '01713-780125', 'বিনামূল্যে ৩০ প্রকার ওষুধ, প্রাথমিক চিকিৎসা, মা ও শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দেওপাড়া কমিউনিটি ক্লিনিক', 'Deopara Community Clinic', 'govt',
  'Community Clinic', 'দেওপাড়া, কাগইল, গাবতলী, বগুড়া - ৫৮২০', '01713-780126', 'প্রাথমিক সেবা, ওষুধ বিতরণ, গর্ভবতী সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পেরী কমিউনিটি ক্লিনিক', 'Peri Community Clinic', 'govt',
  'Community Clinic', 'পেরী গ্রাম, মহিষাবান, গাবতলী, বগুড়া - ৫৮২০', '01713-780127', 'বিনামূল্যে ওষুধ, মা ও শিশু যত্ন, শিশু বৃদ্ধি পর্যবেক্ষণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'উজগ্রাম কমিউনিটি ক্লিনিক', 'Ujgram Community Clinic', 'govt',
  'Community Clinic', 'উজগ্রাম, নাছিপুর, গাবতলী, বগুড়া - ৫৮২০', '01713-780128', 'প্রাথমিক চিকিৎসা, ওষুধ বিতরণ, প্রসবপূর্ব যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পাচকাথিয়া কমিউনিটি ক্লিনিক', 'Pachkathia Community Clinic', 'govt',
  'Community Clinic', 'পাচকাথিয়া গ্রাম, রামেশ্বরপুর, গাবতলী, বগুড়া - ৫৮২০', '01713-780129', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু যত্ন, ইপিআই টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'তিলকপুর কমিউনিটি ক্লিনিক', 'Tilokpur Community Clinic', 'govt',
  'Community Clinic', 'তিলকপুর গ্রাম, সুখানপুকুর, গাবতলী, বগুড়া - ৫৮২০', '01713-780130', 'প্রাথমিক স্বাস্থ্য সেবা, ওষুধ বিতরণ, পরিবার পরিকল্পনা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ভাল্লুক কমিউনিটি ক্লিনিক', 'Bhalluk Community Clinic', 'govt',
  'Community Clinic', 'ভাল্লুক গ্রাম, বীরকেদার, কাহালু, বগুড়া - ৫৮৭০', '01713-780131', 'বিনামূল্যে ৩০ প্রকার ওষুধ, প্রাথমিক স্বাস্থ্য সেবা, গর্ভবতী সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'জামতলী কমিউনিটি ক্লিনিক', 'Jamtoli Community Clinic', 'govt',
  'Community Clinic', 'জামতলী বাজার সংলগ্ন, দুর্গাপুর, কাহালু, বগুড়া - ৫৮৭০', '01713-780132', 'প্রাথমিক সেবা, বিনামূল্যে ওষুধ, মা ও শিশু যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ডিপইল কমিউনিটি ক্লিনিক', 'Dipail Community Clinic', 'govt',
  'Community Clinic', 'ডিপইল গ্রাম, মালঞ্চা, কাহালু, বগুড়া - ৫৮৭০', '01713-780133', 'বিনামূল্যে ওষুধ বিতরণ, মা ও শিশু স্বাস্থ্য, ইপিআই টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পাতাঞ্জ কমিউনিটি ক্লিনিক', 'Patanj Community Clinic', 'govt',
  'Community Clinic', 'পাতাঞ্জ গ্রাম, নারহট্ট, কাহালু, বগুড়া - ৫৮৭০', '01713-780134', 'সাধারণ রোগীর চিকিৎসা, গর্ভকালীন চেকআপ, পুষ্টি শিক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ছাতরা কমিউনিটি ক্লিনিক', 'Chhatra Community Clinic', 'govt',
  'Community Clinic', 'ছাতরা গ্রাম, পাইকর, কাহালু, বগুড়া - ৫৮৭০', '01713-780135', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু যত্ন, টিকা কার্যক্রম'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ঢাকান্টা কমিউনিটি ক্লিনিক', 'Dhakanta Community Clinic', 'govt',
  'Community Clinic', 'ঢাকান্টা, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '01713-780136', 'প্রাথমিক স্বাস্থ্য সেবা, ওষুধ সরবরাহ, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দমদমা কমিউনিটি ক্লিনিক', 'Damdama CC (Bhatra)', 'govt',
  'Community Clinic', 'দমদমা গ্রাম, ভাটরা, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01713-780137', 'বিনামূল্যে ৩০ প্রকার ওষুধ, প্রাথমিক চিকিৎসা, মা ও শিশু যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মুরাদপুর কমিউনিটি ক্লিনিক', 'Muradpur Community Clinic', 'govt',
  'Community Clinic', 'মুরাদপুর গ্রাম, বুড়ইল, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01713-780138', 'প্রাথমিক সেবা, ওষুধ বিতরণ, গর্ভবতী মায়েদের যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাথম কমিউনিটি ক্লিনিক', 'Katham Community Clinic', 'govt',
  'Community Clinic', 'কাথম গ্রাম, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01713-780139', 'বিনামূল্যে ওষুধ, মা ও শিশু স্বাস্থ্য, টিকা প্রদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রনবাঘা কমিউনিটি ক্লিনিক', 'Ranbagha Community Clinic', 'govt',
  'Community Clinic', 'রনবাঘা বাজার সংলগ্ন, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01713-780140', 'প্রাথমিক চিকিৎসা, বিনামূল্যে ওষুধ, গর্ভবতী চেকআপ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নিমাইদিঘী কমিউনিটি ক্লিনিক', 'Nimaidighi Community Clinic', 'govt',
  'Community Clinic', 'নিমাইদিঘী গ্রাম, থালতা মাঝগ্রাম, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01713-780141', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু যত্ন, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'থালতা কমিউনিটি ক্লিনিক', 'Thalta Community Clinic', 'govt',
  'Community Clinic', 'থালতা গ্রাম, থালতা মাঝগ্রাম, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01713-780142', 'প্রাথমিক সেবা, ওষুধ বিতরণ, মা ও শিশু স্বাস্থ্য সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পারতিত পরল কমিউনিটি ক্লিনিক', 'Partitparol Community Clinic', 'govt',
  'Community Clinic', 'পারতিত পরল, ভেলাবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01713-780143', 'বিনামূল্যে ৩০ প্রকার ওষুধ, প্রাথমিক চিকিৎসা, মা ও শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ধারাবর্ষা চর কমিউনিটি ক্লিনিক', 'Dharabarsha Char Community Clinic', 'govt',
  'Community Clinic', 'ধারাবর্ষা চর, যমুনা নদী তীরবর্তী, বোহাইল, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01713-780144', 'চরাঞ্চলের জরুরী স্বাস্থ্য সেবা, ওষুধ বিতরণ, প্রসবপূর্ব যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাজীর চর কমিউনিটি ক্লিনিক', 'Kajir Char Community Clinic', 'govt',
  'Community Clinic', 'কাজীর চর, চালুয়াবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01713-780145', 'বিনামূল্যে ওষুধ, মা ও শিশু স্বাস্থ্য সেবা, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রামচন্দ্রপুর কমিউনিটি ক্লিনিক', 'Ramchandrapur Community Clinic', 'govt',
  'Community Clinic', 'রামচন্দ্রপুর গ্রাম, ফুলবাড়ী, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01713-780146', 'প্রাথমিক সেবা, বিনামূল্যে ওষুধ, গর্ভবতী চেকআপ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নিজবোল কমিউনিটি ক্লিনিক', 'Nijbol Community Clinic', 'govt',
  'Community Clinic', 'নিজবোল গ্রাম, হাটশেরপুর, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01713-780147', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু যত্ন, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চর বেনুপুর কমিউনিটি ক্লিনিক', 'Char Benupur Community Clinic', 'govt',
  'Community Clinic', 'চর বেনুপুর চর এলাকা, কাজলা, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01713-780148', 'চরাঞ্চলের মা ও শিশু স্বাস্থ্য, বিনামূল্যে ওষুধ, স্বাভাবিক প্রসব রেফারেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রানীরহাট কমিউনিটি ক্লিনিক', 'Ranirhat CC (Amrool)', 'govt',
  'Community Clinic', 'রানীরহাট বাজার সংলগ্ন, আমরুল, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-780149', 'বিনামূল্যে ৩০ প্রকার ওষুধ, প্রাথমিক স্বাস্থ্য সেবা, গর্ভবতী মায়েদের যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রহিমাবাদ কমিউনিটি ক্লিনিক', 'Rahimabad Community Clinic', 'govt',
  'Community Clinic', 'রহিমাবাদ গ্রাম, আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-780150', 'প্রাথমিক সেবা, ওষুধ বিতরণ, মা ও শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রানীরপাড়া কমিউনিটি ক্লিনিক', 'Ranirpara Community Clinic', 'govt',
  'Community Clinic', 'রানীরপাড়া, আশেকপুর, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-780151', 'বিনামূল্যে ওষুধ, গর্ভবতী সেবা, শিশু পুষ্টি পর্যবেক্ষণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'খাদাস কমিউনিটি ক্লিনিক', 'Khadas Community Clinic', 'govt',
  'Community Clinic', 'খাদাস গ্রাম, চোপীনগর, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-780152', 'প্রাথমিক স্বাস্থ্য সেবা, বিনামূল্যে ওষুধ, টিকা কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গয়নাবান্দ কমিউনিটি ক্লিনিক', 'Goynaband Community Clinic', 'govt',
  'Community Clinic', 'গয়নাবান্দ গ্রাম, খরনা, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-780153', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু যত্ন, ইপিআই টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বিহিগ্রাম কমিউনিটি ক্লিনিক', 'Bihigram Community Clinic', 'govt',
  'Community Clinic', 'বিহিগ্রাম, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-780154', 'প্রাথমিক সেবা, ওষুধ বিতরণ, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বেলগাড়ী কমিউনিটি ক্লিনিক', 'Belgari Community Clinic', 'govt',
  'Community Clinic', 'বেলগাড়ী গ্রাম, ভবানীপুর, শেরপুর, বগুড়া - ৫৮৪০', '01713-780155', 'বিনামূল্যে ৩০ প্রকার ওষুধ, প্রাথমিক চিকিৎসা, মা ও শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রানীনগর কমিউনিটি ক্লিনিক', 'Raninagar Community Clinic', 'govt',
  'Community Clinic', 'রানীনগর, বিশালপুর, শেরপুর, বগুড়া - ৫৮৪০', '01713-780156', 'প্রাথমিক সেবা, ওষুধ বিতরণ, গর্ভবতী সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চকপাথালিয়া কমিউনিটি ক্লিনিক', 'Chokpathalia Community Clinic', 'govt',
  'Community Clinic', 'চকপাথালিয়া, গাড়ীদহ, শেরপুর, বগুড়া - ৫৮৪০', '01713-780157', 'বিনামূল্যে ওষুধ, মা ও শিশু যত্ন, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বিলনালুয়া কমিউনিটি ক্লিনিক', 'Bilnalua Community Clinic', 'govt',
  'Community Clinic', 'বিলনালুয়া গ্রাম, খানপুর, শেরপুর, বগুড়া - ৫৮৪০', '01713-780158', 'প্রাথমিক স্বাস্থ্য সেবা, ওষুধ সরবরাহ, গর্ভবতী মায়েদের পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কালিশহর কমিউনিটি ক্লিনিক', 'Kalishahar Community Clinic', 'govt',
  'Community Clinic', 'কালিশহর গ্রাম, কুসুম্বী, শেরপুর, বগুড়া - ৫৮৪০', '01713-780159', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু যত্ন, ইপিআই টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চান্দাইকোনা বর্ডার কমিউনিটি ক্লিনিক', 'Chandaikona Border Community Clinic', 'govt',
  'Community Clinic', 'চান্দাইকোনা সীমান্ত সংলগ্ন, সীমাবাড়ী, শেরপুর, বগুড়া - ৫৮৪০', '01713-780160', 'প্রাথমিক সেবা, বিনামূল্যে ওষুধ, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চককানু কমিউনিটি ক্লিনিক', 'Chokkanu Community Clinic', 'govt',
  'Community Clinic', 'চককানু গ্রাম, আটমূল, শিবগঞ্জ, বগুড়া - ৫৮১০', '01713-780161', 'বিনামূল্যে ৩০ প্রকার ওষুধ, প্রাথমিক চিকিৎসা, মা ও শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ভাসুবিহার কমিউনিটি ক্লিনিক', 'Vasu Vihara Community Clinic', 'govt',
  'Community Clinic', 'ভাসুবিহার প্রত্নতাত্ত্বিক এলাকা সংলগ্ন, বিহার, শিবগঞ্জ, বগুড়া - ৫৮১০', '01713-780162', 'প্রাথমিক সেবা, ওষুধ বিতরণ, গর্ভবতী সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চন্ডিহারা কমিউনিটি ক্লিনিক', 'Chondihara Community Clinic', 'govt',
  'Community Clinic', 'চন্ডিহারা গ্রাম, বুড়িগঞ্জ, শিবগঞ্জ, বগুড়া - ৫৮১০', '01713-780163', 'বিনামূল্যে ওষুধ, মা ও শিশু যত্ন, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মহাস্থানগড় কমিউনিটি ক্লিনিক', 'Mahasthangarh Community Clinic', 'govt',
  'Community Clinic', 'মহাস্থানগড় ঐতিহাসিক প্রাচীর সংলগ্ন, দেউলী, শিবগঞ্জ, বগুড়া - ৫৮১০', '01713-780164', 'প্রাথমিক চিকিৎসা, ওষুধ বিতরণ, ট্যুরিস্ট জরুরী ফার্স্ট এইড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'জয়পুর কমিউনিটি ক্লিনিক', 'Joypur Community Clinic', 'govt',
  'Community Clinic', 'জয়পুর গ্রাম, কিচক, শিবগঞ্জ, বগুড়া - ৫৮১০', '01713-780165', 'বিনামূল্যে ৩০ প্রকার ওষুধ, মা ও শিশু যত্ন, ইপিআই টিকাদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'খামারপাড়া কমিউনিটি ক্লিনিক', 'Khamarpara Community Clinic', 'govt',
  'Community Clinic', 'খামারপাড়া গ্রাম, ময়দানহাট্টা, শিবগঞ্জ, বগুড়া - ৫৮১০', '01713-780166', 'প্রাথমিক সেবা, বিনামূল্যে ওষুধ, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নিশ্চিন্তপুর কমিউনিটি ক্লিনিক', 'Nishchintapur Community Clinic', 'govt',
  'Community Clinic', 'নিশ্চিন্তপুর গ্রাম, বালুয়া, সোনাতলা, বগুড়া - ৫৮২০', '01713-780167', 'বিনামূল্যে ৩০ প্রকার ওষুধ, প্রাথমিক চিকিৎসা, মা ও শিশু স্বাস্থ্য'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'তেকানী কমিউনিটি ক্লিনিক', 'Tekani Community Clinic', 'govt',
  'Community Clinic', 'তেকানী গ্রাম, দিগদাইড়, সোনাতলা, বগুড়া - ৫৮২০', '01713-780168', 'প্রাথমিক সেবা, ওষুধ বিতরণ, গর্ভবতী সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কালাইহাটা কমিউনিটি ক্লিনিক', 'Kalaihata Community Clinic', 'govt',
  'Community Clinic', 'কালাইহাটা গ্রাম, জোড়গাছা, সোনাতলা, বগুড়া - ৫৮২০', '01713-780169', 'বিনামূল্যে ওষুধ, মা ও শিশু যত্ন, ইপিআই টিকাদান কেন্দ্র'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'হুয়াকুয়া কমিউনিটি ক্লিনিক', 'Huakuwa Community Clinic', 'govt',
  'Community Clinic', 'হুয়াকুয়া গ্রাম, মধুপুর, সোনাতলা, বগুড়া - ৫৮২০', '01713-780170', 'প্রাথমিক স্বাস্থ্য সেবা, ওষুধ সরবরাহ, গর্ভবতী মায়েদের পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'যমুনা চর কমিউনিটি ক্লিনিক', 'Jamuna Char CC (Pakulla)', 'govt',
  'Community Clinic', 'যমুনা চর ও বাঁধ সংলগ্ন এলাকা, পাকুল্লা, সোনাতলা, বগুড়া - ৫৮২০', '01713-780171', 'চরাঞ্চল জরুরী প্রাথমিক স্বাস্থ্য সেবা, বিনামূল্যে ওষুধ, মা ও শিশু যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চুকাইনগর বাঁধ কমিউনিটি ক্লিনিক', 'Chukainagar Embankment Community Clinic', 'govt',
  'Community Clinic', 'চুকাইনগর বন্যা নিয়ন্ত্রণ বাঁধ সংলগ্ন, তৈকানী চুকাইনগর, সোনাতলা, বগুড়া - ৫৮২০', '01713-780172', 'চরাঞ্চলের মা ও শিশু স্বাস্থ্য সেবা, বিনামূল্যে ৩০ প্রকার ওষুধ, পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল', 'Shaheed Ziaur Rahman Medical College Hospital (SZRMCH)', 'govt',
  'Medical Colleges and Hospitals', 'সিলিমপুর, মেডিকেল রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '051-60862, 01711-820847, 01730-324610', '২৪/৭ জরুরী বিভাগ (Emergency), নিবিড় পরিচর্যা কেন্দ্র (ICU), করোনারি কেয়ার ইউনিট (CCU)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মোহাম্মদ আলী ২৫০ শয্যা বিশিষ্ট জেলা হাসপাতাল, বগুড়া', 'Mohammad Ali 250-Bed District Hospital, Bogura', 'govt',
  'Government District Hospitals', 'হাসপাতাল রোড, রেলওয়ে স্টেশন সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '051-66020, 01730-324631', '২৪/৭ জরুরী সেবা, ২৫০ শয্যা ইনডোর ও আউটডোর চিকিৎসা, জেনারেল সার্জারি ও ল্যাপারোস্কোপিক সার্জারি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া পুলিশ হাসপাতাল', 'Bogura Police Hospital', 'govt',
  'Government Specialized Hospitals', 'পুলিশ লাইন্স কম্পাউন্ড, নিশিন্দারা, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-373801, 051-65522', 'পুলিশ সদস্য ও সাধারণ রোগীদের জরুরী চিকিৎসা, ৫০ শয্যা ইনডোর সেবা, মেডিসিন ও অর্থোপেডিক আউটডোর'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া জেলা কারাগার হাসপাতাল', 'Bogura District Jail Hospital', 'govt',
  'Government Specialized Hospitals', 'বগুড়া জেলা কারাগার প্রাঙ্গণ, বগুড়া সদর, বগুড়া - ৫৮০০', '051-64531', 'কারাবন্দীদের জন্য ২৪/৭ চিকিৎসাসেবা, ইনপেশেন্ট পর্যবেক্ষণ ওয়ার্ড, মানসিক স্বাস্থ্য ও সাইকিয়াট্রিক পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সান্তাহার রেলওয়ে হাসপাতাল, বগুড়া', 'Santahar Railway Hospital, Bogura', 'govt',
  'Government Specialized Hospitals', 'রেলওয়ে স্টেশন কলোনি, সান্তাহার জংশন, আদমদীঘি, বগুড়া - ৫৮৯১', '01711-692140, 0741-62320', 'রেলওয়ে কর্মকর্তা-কর্মচারী ও সাধারণ জনগণের বহির্বিভাগ সেবা, ২০ শয্যা ইনডোর ওয়ার্ড, জরুরী ট্রমা ও প্রাথমিক চিকিৎসা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া বক্ষব্যাধি হাসপাতাল (যক্ষ্মা হাসপাতাল)', 'Bogura Chest Disease Hospital', 'govt',
  'Government Specialized Hospitals', 'মালতীনগর, বগুড়া সদর, বগুড়া - ৫৮০০', '051-65489, 01711-345892', 'বিশেষায়িত বক্ষব্যাধি ও যক্ষ্মা (TB) চিকিৎসা, জিন-এক্সপার্ট (GeneXpert MTB/RIF) ল্যাব টেস্ট, ২০ শয্যা ইনডোর বক্ষব্যাধি কেয়ার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া বক্ষব্যাধি ক্লিনিক (টিবি ক্লিনিক)', 'Bogura Chest Disease Clinic (TB Clinic)', 'govt',
  'Government Specialized Hospitals', 'বড়গোলা, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০', '051-67891', 'বিনামূল্যে ডটস (DOTS) যক্ষ্মা চিকিৎসা ও ওষুধ বিতরণ, কফ ও স্পুটাম মাইক্রোস্কোপি টেস্ট, বক্ষব্যাধি বহির্বিভাগ ও স্বাস্থ্য শিক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মা ও শিশু কল্যাণ কেন্দ্র (MCWC), বগুড়া', 'Maternal and Child Welfare Centre (MCWC), Bogura', 'govt',
  'Government Specialized Hospitals', 'থানা রোড, কাটনারপাড়া সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '051-66712, 01712-458921', '২৪/৭ জরুরি প্রসূতি সেবা (CEmONC), স্বাভাবিক প্রসব ও সিজারিয়ান সেকশন অপারেশন, গর্ভকালীন (ANC) ও প্রসবোত্তর (PNC) যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনাতলা ২০ শয্যা বিশিষ্ট হাসপাতাল', 'Sonatala 20-Bed Specialized Hospital', 'govt',
  'Government Specialized Hospitals', 'বালুয়া হাট সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০', '01730-324632, 01712-985612', '২৪ ঘন্টা জরুরী চিকিৎসা সেবা, ২০ শয্যা অন্তর্বিভাগ চিকিৎসা, স্বাভাবিক প্রসব সেবা ও রেফারেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চন্দনবাইশা ২০ শয্যা বিশিষ্ট হাসপাতাল, সারিয়াকান্দি', 'Chandanbaisha 20-Bed Riverine Hospital, Sariakandi', 'govt',
  'Government Specialized Hospitals', 'চন্দনবাইশা বাজার, যমুনা নদী তীরবর্তী অঞ্চল, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324633, 01714-889922', 'যমুনা চরাঞ্চলের জরুরি চিকিৎসা সেবা, ২০ শয্যা ইনডোর ওয়ার্ড, সাপের কামড়ের অ্যান্টিভেনম চিকিৎসা (Snakebite Management)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'তালোড়া ২০ শয্যা বিশিষ্ট হাসপাতাল, দুপচাঁচিয়া', 'Talora 20-Bed Hospital, Dhupchanchia', 'govt',
  'Government Specialized Hospitals', 'তালোড়া শিল্প এলাকা, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-324634, 01712-441199', 'শিল্প এলাকার শ্রমিক ও জনগণের জরুরী ট্রমা চিকিৎসা, ২০ শয্যা অন্তর্বিভাগ সেবা, বহির্বিভাগে অভিজ্ঞ চিকিৎসক পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ভান্ডারবাড়ী ১০ শয্যা বিশিষ্ট চর হাসপাতাল, ধুনট', 'Bhandarbari 10-Bed Char Hospital, Dhunat', 'govt',
  'Government Specialized Hospitals', 'ভান্ডারবাড়ী বন্যা নিয়ন্ত্রণ বাঁধ সংলগ্ন, ধুনট, বগুড়া - ৫৮৫০', '01730-324635, 01715-662288', 'চরাঞ্চল নদীমাতৃক জরুরী চিকিৎসা সেবা, ১০ শয্যা ইনডোর পর্যবেক্ষণ, ডায়রিয়া ও পানিবাহিত রোগের জরুরি ব্যবস্থাপনা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর মা ও শিশু কল্যাণ কেন্দ্র (MCWC)', 'Sherpur Maternal & Child Welfare Centre (MCWC)', 'govt',
  'Government Specialized Hospitals', 'পৌরসভা রোড, শেরপুর, বগুড়া - ৫৮৪০', '01712-895621, 05029-77210', '২৪/৭ স্বাভাবিক প্রসব ও জরুরি ধাত্রীবিদ্যা, ১০ শয্যা প্রসূতি ইনডোর ওয়ার্ড, গর্ভবতী মায়েদের প্রসবপূর্ব ও প্রসবোত্তর চেকআপ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শিবগঞ্জ ট্রমা ও জরুরী সেবা কেন্দ্র (মোকামতলা)', 'Shibganj Highway Trauma & Emergency Centre', 'govt',
  'Government Specialized Hospitals', 'ঢাকা-বগুড়া-রংপুর মহাসড়ক সংযোগস্থল, মোকামতলা, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-324636, 01716-554433', 'মহাসড়ক সড়ক দুর্ঘটনার জরুরী চিকিৎসা ও ট্রমা রিসাসিটেশন, ফ্র্যাকচার ও অস্থিভঙ্গ জরুরি ইমোবিলাইজেশন, জরুরী রক্তপাত নিয়ন্ত্রণ ও অক্সিজেন সাপোর্ট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাবতলী গ্রামীণ চক্ষু ও বিশেষায়িত সেবা কেন্দ্র', 'Gabtali Rural Eye & Specialized Care Hospital', 'govt',
  'Government Specialized Hospitals', 'থানা মোড়, গাবতলী, বগুড়া - ৫৮২০', '01730-324637, 01712-337711', 'প্রাথমিক চক্ষু চিকিৎসা ও দৃষ্টি পরীক্ষা, ছানিপড়া (Cataract) স্ক্রিনিং ও লেন্স প্রতিস্থাপন রেফারেল, গ্লুকোমা ও অন্ধত্ব প্রতিরোধ কার্যক্রম'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাহালু বিশেষায়িত এনসিডি ও ডায়াবেটিস সেন্টার', 'Kahalu Specialized NCD & Diabetes Centre', 'govt',
  'Government Specialized Hospitals', 'হাসপাতাল রোড, কাহালু, বগুড়া - ৫৮৭০', '01730-324638, 01718-223344', 'ডায়াবেটিস ও উচ্চ রক্তচাপের দীর্ঘমেয়াদী নিয়ন্ত্রণ ও সেবা, হৃদরোগ ও কার্ডিওভাসকুলার রিস্ক স্ক্রিনিং, ইসিজি (ECG) ও বায়োকেমিক্যাল ল্যাব টেস্ট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম গ্রামীণ প্রসূতি সেবা কেন্দ্র', 'Nandigram Rural Maternity Centre', 'govt',
  'Government Specialized Hospitals', 'ওমরপুর বাজার সংলগ্ন, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-324639, 01719-887766', '২৪/৭ স্বাভাবিক প্রসব ও মিডওয়াইফারি কেয়ার, ১০ শয্যা প্রসব পরবর্তী নিবিড় পর্যবেক্ষণ ওয়ার্ড, গর্ভকালীন চেকআপ ও রক্তাল্পতা প্রতিরোধ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শাজাহানপুর মহাসড়ক জরুরী সেবা কেন্দ্র', 'Shajahanpur Highway Emergency Response Unit', 'govt',
  'Government Specialized Hospitals', 'ঢাকা-বগুড়া মহাসড়ক (নয়মাইল মোড়), আড়িয়া, শাজাহানপুর, বগুড়া - ৫৮০১', '01730-324640, 01711-229988', 'মহাসড়ক দ্রুত জরুরী রেসপন্স ও এক্সিডেন্ট ফার্স্ট এইড, মারাত্মক আঘাতপ্রাপ্তদের স্থিতিশীলকরণ ও সিপিআর, জরুরী অক্সিজেন ও রক্তক্ষরণ নিয়ন্ত্রণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস মেডিকেল কলেজ ও রফাতুল্লাহ কমিউনিটি হাসপাতাল', 'TMSS Medical College & Rafatullah Community Hospital (TMC & RCH)', 'private',
  'Medical Colleges and Hospitals', 'ঠেঙ্গামারা, রংপুর রোড, গোকুল, বগুড়া সদর, বগুড়া - ৫৮০০', '051-78567, 01711-426749, 01755-630222', '১০০০ শয্যা বিশেষায়িত ইনডোর ও আউটডোর সেবা, ২৪/৭ জরুরী ও ট্রমা কেয়ার, আইসিইউ (ICU), সিসিইউ (CCU), এনআইসিইউ (NICU)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পপুলার হাসপাতাল ও কনসালটেশন সেন্টার, বগুড়া', 'Popular Hospital & Consultation Centre, Bogura', 'private',
  'Private Hospitals', 'থানা রোড, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০', '051-69361, 01755-667788, 09613-787807', '২৪/৭ জরুরী সেবা ও ইনডোর কেয়ার, মডার্ন অপারেশন থিয়েটার (OT), ল্যাপারোস্কোপিক জেনারেল সার্জারি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ইবনে সিনা হাসপাতাল ও ডায়াগনস্টিক সেন্টার, বগুড়া', 'Ibn Sina Hospital & Diagnostic Centre, Bogura', 'private',
  'Private Hospitals', 'কানোচগাড়ী, শেরপুর রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '051-69234, 01713-334455, 09610-010615', '২৪/৭ বিশেষজ্ঞ চিকিৎসক পরামর্শ ও ইনডোর চিকিৎসা, মডার্ন আইসিইউ (ICU) ও এনআইসিইউ (NICU), হৃদরোগ ও মেডিসিন ইউনিট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া খ্রিস্টান মিশন হাসপাতাল', 'Bogura Christian Mission Hospital', 'private',
  'Private Hospitals', 'থানা রোড, মিশন কম্পাউন্ড, বগুড়া সদর, বগুড়া - ৫৮০০', '051-66432, 01711-987654', 'সুলভ মূল্যে সাধারণ চিকিৎসা ও শয্যা সেবা, মাতৃ ও শিশু স্বাস্থ্য সেবা, স্বাভাবিক প্রসব ও সিজারিয়ান সেকশন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শামসুদ্দীন মেমোরিয়াল হাসপাতাল, বগুড়া', 'Shamsuddin Memorial Hospital, Bogura', 'private',
  'Private Hospitals', 'কালীতলা, স্টেশন রোড সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '051-62890, 01712-113355', '৫০ শয্যা ইনডোর চিকিৎসা, জেনারেল সার্জারি ও ইউরোলজি, গাইনী ও প্রসূতি ওয়ার্ড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'রেইনবো হাসপাতাল ও ডায়াগনস্টিক সেন্টার, বগুড়া', 'Rainbow Hospital & Diagnostic Centre, Bogura', 'private',
  'Private Hospitals', 'মেডিকেল কলেজ রোড, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '01711-223344, 051-64112', '২৪/৭ জরুরী ট্রমা ও ক্যাজুয়ালটি সেবা, মেডিকেল কলেজ সংলগ্ন বিশেষজ্ঞ কনসালটেশন, আধুনিক অপারেশন থিয়েটার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'প্রাইম ক্লিনিক অ্যান্ড হাসপাতাল, বগুড়া', 'Prime Clinic & Hospital, Bogura', 'private',
  'Private Clinics', 'জলেশ্বরীতলা মেইন রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '051-67123, 01715-998811', 'বিশেষজ্ঞ ডাক্তারদের নিয়মিত চেম্বার, ৩০ শয্যা কেবিন ও জেনারেল ওয়ার্ড, ল্যাপারোস্কোপি ও কসমেটিক সার্জারি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সান্তাহার জেনারেল হাসপাতাল ও ক্লিনিক', 'Santahar General Hospital & Clinic', 'private',
  'Private Hospitals', 'রেলগেট এলাকা, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১', '01712-349811, 0741-62450', '২৫ শয্যা ইনডোর ও কেবিন সুবিধা, ২৪ ঘন্টা জরুরী ডেলিভারি ও সিজারিয়ান অপারেশন, জেনারেল সার্জারি ও অর্থোপেডিক ফার্স্ট এইড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সেবা ক্লিনিক অ্যান্ড ডায়াগনস্টিক সেন্টার, আদমদীঘি', 'Sheba Clinic & Diagnostic Centre, Adamdighi', 'private',
  'Private Clinics', 'আদমদীঘি বাসস্ট্যান্ড রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '01718-456712', 'ইনপেশেন্ট কেয়ার ও নরমাল ডেলিভারি, বহির্বিভাগ বিশেষজ্ঞ ডাক্তার কনসালটেশন, আল্ট্রাসনোগ্রাফি ও রক্তের সম্পূর্ণ পরীক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ধুনট সেন্ট্রাল ক্লিনিক অ্যান্ড নার্সিং হোম', 'Dhunat Central Clinic & Nursing Home', 'private',
  'Private Clinics', 'থানা রোড, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০', '01715-442299, 01722-881144', '২৪/৭ জরুরী প্রসূতি ও ডেলিভারি সেবা, সিজারিয়ান সেকশন ও এ্যাপেন্ডিসাইটিস অপারেশন, ২০ শয্যা নার্সিং হোম ওয়ার্ড ও কেবিন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বিক্রমপুর মডেল ক্লিনিক, ধুনট', 'Bikrampur Model Clinic, Dhunat', 'private',
  'Private Clinics', 'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট, বগুড়া - ৫৮৫০', '01716-889900', '১৫ শয্যা ইনডোর কেয়ার, গাইনী ও প্রসূতি কনসালটেশন, সাধারণ রোগীর চিকিৎসা ও ওষুধ বিতরণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দুপচাঁচিয়া জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম', 'Dhupchanchia General Hospital & Nursing Home', 'private',
  'Private Hospitals', 'বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01712-665544, 01720-334411', '৩০ শয্যা ইনডোর ও পোস্ট-অপারেটিভ কেয়ার, ২৪ ঘন্টা অপারেশন থিয়েটার সুবিধা, মহাসড়ক এক্সিডেন্ট ইমার্জেন্সি কেয়ার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'তালোড়া ডিজিটাল ক্লিনিক অ্যান্ড হাসপাতাল', 'Talora Digital Clinic & Hospital', 'private',
  'Private Clinics', 'রেলওয়ে স্টেশন রোড, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01714-332211', '১৫ শয্যা ইনডোর সেবা, স্বাভাবিক প্রসব ও জরুরি রেফারেল, ডিজিটাল এক্স-রে ও বায়োকেমিস্ট্রি টেস্ট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাবতলী সেন্ট্রাল হাসপাতাল ও কনসালটেশন সেন্টার', 'Gabtali Central Hospital & Consultation Centre', 'private',
  'Private Hospitals', 'থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '01713-998877, 01725-112233', '২৫ শয্যা কেবিন ও জেনারেল ইনডোর ওয়ার্ড, ২৪/৭ জরুরী বিভাগ ও ডেলিভারি ইউনিট, জেনারেল সার্জারি ও গাইনী অপারেশন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনারায় হেলথ কেয়ার ক্লিনিক, গাবতলী', 'Sonaray Health Care Clinic, Gabtali', 'private',
  'Private Clinics', 'সোনারায় বাজার রোড, সোনারায়, গাবতলী, বগুড়া - ৫৮২০', '01718-221144', '১৫ শয্যা গ্রামীণ ইনডোর সেবা, মা ও শিশু পরিচর্যা, নরমাল ডেলিভারি ও প্রাথমিক চিকিৎসা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাহালু মডেল ক্লিনিক অ্যান্ড নার্সিং হোম', 'Kahalu Model Clinic & Nursing Home', 'private',
  'Private Clinics', 'রেলগেট সংলগ্ন, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '01711-778899, 01724-556677', '২০ শয্যা ইনডোর ও প্রসূতি সেবা, জরুরী সিজারিয়ান সেকশন ও এ্যাপেন্ডিক্স অপারেশন, আল্ট্রাসনোগ্রাম ও ডিজিটাল এক্স-রে'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মুরইল হেলথ কেয়ার অ্যান্ড ক্লিনিক, কাহালু', 'Murail Health Care & Clinic, Kahalu', 'private',
  'Private Clinics', 'মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০', '01716-334477', '১৫ শয্যা ইনডোর পর্যবেক্ষণ, প্রাথমিক সার্জারি ও ফার্স্ট এইড, স্বাভাবিক প্রসব সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম', 'Nandigram General Hospital & Nursing Home', 'private',
  'Private Hospitals', 'বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01712-887711, 01726-443322', '২৫ শয্যা ইনডোর ও কেবিন চিকিৎসা, ২৪ ঘন্টা জরুরি সেবা ও অপারেশন থিয়েটার, গাইনী ও প্রসূতি সার্জারি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ওমরপুর সেন্ট্রাল ক্লিনিক, নন্দীগ্রাম', 'Omarpur Central Clinic, Nandigram', 'private',
  'Private Clinics', 'বগুড়া-নাটোর মহাসড়ক, ওমরপুর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01715-667788', '১৫ শয্যা ইনডোর ওয়ার্ড, মহাসড়ক জরুরী দুর্ঘটনা চিকিৎসা, স্বাভাবিক প্রসব সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সারিয়াকান্দি যমুনা ক্লিনিক অ্যান্ড নার্সিং হোম', 'Sariakandi Jamuna Clinic & Nursing Home', 'private',
  'Private Clinics', 'থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01714-556677, 01723-998811', '২০ শয্যা ইনডোর ও কেবিন সুবিধা, নদী তীরবর্তী জরুরি প্রসূতি ও ডেলিভারি সেবা, সিজারিয়ান ও জেনারেল সার্জারি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চন্দনবাইশা সেবা ক্লিনিক, সারিয়াকান্দি', 'Chandanbaisha Seba Clinic, Sariakandi', 'private',
  'Private Clinics', 'চন্দনবাইশা বাজার সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01716-443322', '১৫ শয্যা চরাঞ্চল ইনডোর চিকিৎসা, স্বাভাবিক প্রসব সেবা ও মা ও শিশু যত্ন, জরুরী ফার্স্ট এইড ও ড্রেসিং'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মাঝিড়া ক্যান্টনমেন্ট জেনারেল হাসপাতাল অ্যান্ড ক্লিনিক', 'Majhira Cantonment General Hospital & Clinic', 'private',
  'Private Hospitals', 'বগুড়া সেনানিবাস গেট সংলগ্ন, ঢাকা রোড, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-445566, 01727-889900', '৩০ শয্যা ইনডোর ও পোস্ট-অপারেটিভ ওয়ার্ড, ২৪/৭ জরুরী ট্রমা ও ক্যাজুয়ালটি সেবা, জেনারেল সার্জারি ও গাইনী অপারেশন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আড়িয়া মডেল হাসপাতাল অ্যান্ড নার্সিং হোম, শাজাহানপুর', 'Aria Model Hospital & Nursing Home, Shajahanpur', 'private',
  'Private Hospitals', 'ঢাকা-বগুড়া মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১', '01718-990011', '২৫ শয্যা আধুনিক ইনডোর সুবিধা, মহাসড়ক সড়ক দুর্ঘটনার জরুরি চিকিৎসা, স্বাভাবিক ও সিজারিয়ান প্রসব সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর সেন্ট্রাল হাসপাতাল অ্যান্ড ডায়াগনস্টিক সেন্টার', 'Sherpur Central Hospital & Diagnostic Centre', 'private',
  'Private Hospitals', 'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '01711-667788, 05029-77340', '৪০ শয্যা কেবিন ও জেনারেল ওয়ার্ড, ২৪ ঘন্টা অপারেশন থিয়েটার ও সিজারিয়ান সেকশন, মহাসড়ক এক্সিডেন্ট ও জরুরি ট্রমা সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আপন জেনারেল হাসপাতাল অ্যান্ড ক্লিনিক, শেরপুর', 'Apan General Hospital & Clinic, Sherpur', 'private',
  'Private Hospitals', 'বাসস্ট্যান্ড সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০', '01715-223344', '২৫ শয্যা ইনডোর রোগী ভর্তি, জেনারেল সার্জারি ও গাইনী কেয়ার, স্বাভাবিক প্রসব সেবা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সীমাবাড়ী লাইফ কেয়ার ক্লিনিক, শেরপুর', 'Shimabari Life Care Clinic, Sherpur', 'private',
  'Private Clinics', 'ঢাকা-বগুড়া মহাসড়ক, সীমাবাড়ী বাজার, শেরপুর, বগুড়া - ৫৮৪০', '01716-112233', '১৫ শয্যা ইনডোর ও প্রসূতি যত্ন, হাইওয়ে জরুরি ফার্স্ট এইড ও অক্সিজেন সাপোর্ট, স্বাভাবিক প্রসব'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মোকামতলা জেনারেল হাসপাতাল অ্যান্ড ট্রমা সেন্টার', 'Mokamtala General Hospital & Trauma Centre (Private)', 'private',
  'Private Hospitals', 'রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০', '01712-556677, 01721-334455', '৩৫ শয্যা ইনডোর ও কেবিন ওয়ার্ড, ২৪/৭ মহাসড়ক সড়ক দুর্ঘটনা ও অর্থোপেডিক ট্রমা সার্জারি, জরুরী ডেলিভারি ও সিজারিয়ান সেকশন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শিবগঞ্জ মডেল হাসপাতাল অ্যান্ড নার্সিং হোম', 'Shibganj Model Hospital & Nursing Home', 'private',
  'Private Hospitals', 'থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০', '01714-778899', '২৫ শয্যা ইনডোর চিকিৎসা, জেনারেল সার্জারি ও গাইনী কেয়ার, স্বাভাবিক প্রসব ও সিজারিয়ান অপারেশন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনাতলা জেনারেল হাসপাতাল অ্যান্ড নার্সিং হোম', 'Sonatala General Hospital & Nursing Home', 'private',
  'Private Hospitals', 'স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০', '01711-889900, 01728-445566', '২৫ শয্যা ইনডোর ও কেবিন ব্যবস্থা, ২৪ ঘন্টা জরুরী ডেলিভারি ও সিজারিয়ান অপারেশন, জেনারেল সার্জারি ও এ্যাপেন্ডিসাইটিস কেয়ার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বালুয়া মডার্ন ক্লিনিক, সোনাতলা', 'Balua Modern Clinic, Sonatala', 'private',
  'Private Clinics', 'বালুয়া হাট বাজার সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০', '01715-334455', '১৫ শয্যা ইনডোর পর্যবেক্ষণ, স্বাভাবিক প্রসব সেবা, প্রাথমিক চিকিৎসা ও ফার্স্ট এইড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'পপুলার ডায়াগনস্টিক সেন্টার লি., বগুড়া', 'Popular Diagnostic Centre Ltd., Bogura', 'diagnostic',
  'Diagnostic Centres', 'থানা রোড, জলেশ্বরীতলা, বগুড়া সদর, বগুড়া - ৫৮০০', '051-69361, 09613-787807, 01755-667788', '১.৫ টেসলা এমআরআই (1.5T MRI), ১২৮-স্লাইস মাল্টি-ডিটেক্টর সিটি স্ক্যান (128-Slice CT Scan), ফোর-ডি কালার ডপলার আল্ট্রাসনোগ্রাফি (4D USG)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মেদিনোভা মেডিকেল সার্ভিসেস লি., বগুড়া', 'Medinova Medical Services Ltd., Bogura', 'diagnostic',
  'Diagnostic Centres', 'কানোচগাড়ী, শেরপুর রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '051-69123, 01711-567890', 'মাল্টি-স্লাইস স্পাইরাল সিটি স্ক্যান, ডিজিটাল রেডিওলজি ও ফ্লুরোস্কোপি, কার্ডিয়াক ইকোকার্ডিওগ্রাফি ও ইটিটি (ETT)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ল্যাবএইড ডায়াগনস্টিক লি., বগুড়া', 'Labaid Diagnostic Ltd., Bogura', 'diagnostic',
  'Diagnostic Centres', 'জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০', '051-69871, 01766-662233, 10606', 'কার্ডিয়াক ডায়াগনস্টিকস (Eco, ETT, Holter ECG), ডিজিটাল এক্স-রে ও আল্ট্রাসাউন্ড, মলিকুলার বায়োলজি ও আরটি-পিসিআর (RT-PCR)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ডক্টরস ডায়াগনস্টিক সেন্টার, বগুড়া', 'Doctors Diagnostic Centre, Bogura', 'diagnostic',
  'Diagnostic Centres', 'মেডিকেল কলেজ মেইন গেট সংলগ্ন, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '01712-445588, 051-64589', '২৪/৭ জরুরী ল্যাব ইনভেস্টিগেশন, ইলেক্ট্রোলাইটস ও আর্টারিয়াল ব্লাড গ্যাস (ABG), হিমাটোলজি ও কমপ্লিট ব্লাড কাউন্ট (CBC)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'এপেক্স ডায়াগনস্টিক সেন্টার, বগুড়া', 'Apex Diagnostic Centre & Consultation, Bogura', 'diagnostic',
  'Diagnostic Centres', 'বড়গোলা, বগুড়া সদর, বগুড়া - ৫৮০০', '051-64512, 01711-889922', 'রুটিন বায়োকেমিস্ট্রি ও লিভার ফাংশন টেস্ট, ইউরিন ও স্টুল রুটিন মাইক্রোস্কোপি, ডিজিটাল ডেন্টাল ওপিজি এক্স-রে'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মডার্ন ডায়াগনস্টিক সেন্টার, বগুড়া', 'Modern Diagnostic Centre, Bogura', 'diagnostic',
  'Diagnostic Centres', 'স্টেশন রোড, রেলওয়ে স্টেশন সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '051-66219, 01715-332211', 'ক্লিনিক্যাল প্যাথলজি ও হিমাটোলজি, টু-ডি ও ফোর-ডি ইউএসজি (USG), ডিজিটাল ১২-লিড ইসিজি (ECG)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সান্তাহার ডিজিটাল ডায়াগনস্টিক সেন্টার', 'Santahar Digital Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'স্টেশন রোড, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১', '01711-224466, 0741-62410', 'ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসনোগ্রাফি, রুটিন বায়োকেমিস্ট্রি ও রক্তের সম্পূর্ণ পরীক্ষা, ইসিজি ও হার্ট রেট অ্যানালাইসিস'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আদমদীঘি সেন্ট্রাল ডায়াগনস্টিক সেন্টার', 'Adamdighi Central Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'বাসস্ট্যান্ড সংলগ্ন, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '01715-337799', 'রক্তের গ্লুকোজ ও লিপিড প্রোফাইল, লিভার ও কিডনি ফাংশন টেস্ট (LFT, RFT), প্রেগন্যান্সি আল্ট্রাসাউন্ড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ধুনট মডার্ন ডায়াগনস্টিক অ্যান্ড কনসালটেশন সেন্টার', 'Dhunat Modern Diagnostic & Consultation Centre', 'diagnostic',
  'Diagnostic Centres', 'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০', '01714-882211', 'ডিজিটাল এক্স-রে ও কালার ডপলার ইউএসজি, ক্লিনিক্যাল বায়োকেমিস্ট্রি ও ইলেক্ট্রোলাইটস, ডায়াবেটিস ও এইচবিএওয়ানসি (HbA1c) টেস্ট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'যমুনা ডায়াগনস্টিক সেন্টার, ধুনট', 'Jamuna Diagnostic Centre, Dhunat', 'diagnostic',
  'Diagnostic Centres', 'থানা রোড, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০', '01718-993344', 'রুটিন প্যাথলজি ও ব্লাড সিবিসি (CBC with ESR), ইউরিন প্রেগন্যান্সি ও রুটিন এক্সামিনেশন, হোল এবডোমেন আল্ট্রাসনোগ্রাম'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দুপচাঁচিয়া ডিজিটাল ডায়াগনস্টিক সেন্টার', 'Dhupchanchia Digital Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01712-991122, 01725-334488', 'হাই-ফ্রিকোয়েন্সি ডিজিটাল এক্স-রে, ফোর-ডি কালার ডপলার ইউএসজি, অটোমেটেড হিমাটোলজি অ্যানালাইজার'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'তালোড়া মডেল ডায়াগনস্টিক সেন্টার, দুপচাঁচিয়া', 'Talora Model Diagnostic Centre, Dhupchanchia', 'diagnostic',
  'Diagnostic Centres', 'রেলওয়ে বাজার, তালোড়া, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01716-558833', 'ক্লিনিক্যাল প্যাথলজি ও ব্লাড গ্রুপিং, স্পুটাম ও কফ পরীক্ষা, আল্ট্রাসনোগ্রাম ও ডিজিটাল ইসিজি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাবতলী ডিজিটাল ডায়াগনস্টিক সেন্টার', 'Gabtali Digital Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '01713-662288', 'ডিজিটাল এক্স-রে ও চেস্ট রেডিওলজি, হোল এবডোমেন ও প্রেগন্যান্সি আল্ট্রাসাউন্ড, অটোমেটেড বায়োকেমিস্ট্রি টেস্ট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনারায় সেন্ট্রাল ডায়াগনস্টিক সেন্টার, গাবতলী', 'Sonaray Central Diagnostic Centre, Gabtali', 'diagnostic',
  'Diagnostic Centres', 'সোনারায় বাজার, গাবতলী, বগুড়া - ৫৮২০', '01719-441155', 'ক্লিনিক্যাল প্যাথলজি ও ব্লাড স্ক্রিনিং, ইউরিন ও স্টুল রুটিন পরীক্ষা, আল্ট্রাসনোগ্রাফি ও রক্তচাপ পরীক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাহালু ডিজিটাল ডায়াগনস্টিক সেন্টার', 'Kahalu Digital Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '01711-447788, 01724-665522', 'ডিজিটাল এক্স-রে ও কালার ডপলার ইউএসজি, কমপ্লিট ব্লাড কাউন্ট (CBC) ও সিরাম ক্রিয়েটিনিন, লিপিড প্রোফাইল ও ইউরিক এসিড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মুরইল মডেল ডায়াগনস্টিক সেন্টার, কাহালু', 'Murail Model Diagnostic Centre, Kahalu', 'diagnostic',
  'Diagnostic Centres', 'মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০', '01717-882244', 'বেসিক প্যাথলজি ও হেমাটোলজি, রক্তের গ্রুপ ও ক্রস-ম্যাচিং, প্রেগন্যান্সি আল্ট্রাসাউন্ড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম সেন্ট্রাল ডায়াগনস্টিক সেন্টার', 'Nandigram Central Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01712-338800, 01725-778899', 'ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসাউন্ড, বায়োকেমিস্ট্রি অ্যানালাইজার টেস্ট, লিপিড ও লিভার প্রোফাইল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ওমরপুর ডিজিটাল ডায়াগনস্টিক সেন্টার, নন্দীগ্রাম', 'Omarpur Digital Diagnostic Centre, Nandigram', 'diagnostic',
  'Diagnostic Centres', 'বগুড়া-নাটোর মহাসড়ক, ওমরপুর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01715-771133', 'রুটিন ব্লাড টেস্টিং ও মাইক্রোস্কোপি, ইউরিন রুটিন ও স্পুটাম পরীক্ষা, আল্ট্রাসনোগ্রাফি ও ডিজিটাল ইসিজি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সারিয়াকান্দি মডার্ন ডায়াগনস্টিক সেন্টার', 'Sariakandi Modern Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01714-229988', 'ডিজিটাল এক্স-রে ও ফোর-ডি আল্ট্রাসনোগ্রাম, লিভার ও কিডনি ফাংশন টেস্ট, গর্ভবতী মায়েদের নিয়মিত পরীক্ষা ও ইসিজি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'চন্দনবাইশা চরাঞ্চল ডায়াগনস্টিক সেন্টার, সারিয়াকান্দি', 'Chandanbaisha Riverine Diagnostic Centre, Sariakandi', 'diagnostic',
  'Diagnostic Centres', 'চন্দনবাইশা বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01716-119955', 'চরাঞ্চল কোল্ড-চেইন সংরক্ষিত রক্তের টেস্ট, ম্যালেরিয়া, ডেঙ্গু ও টাইফয়েড র‌্যাপিড টেস্ট, বেসিক বায়োকেমিস্ট্রি ও গ্লুকোজ পরীক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মাঝিড়া ক্যান্টনমেন্ট ডায়াগনস্টিক সেন্টার', 'Majhira Cantonment Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'ক্যান্টনমেন্ট গেট সংলগ্ন, ঢাকা রোড, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-118844, 01726-554477', 'মাল্টি-স্লাইস ডিজিটাল রেডিওলজি, ফোর-ডি কালার আল্ট্রাসাউন্ড, কার্ডিয়াক বায়োমার্কার্স (Troponin-I, CK-MB)'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আড়িয়া ডিজিটাল ডায়াগনস্টিক সেন্টার, শাজাহানপুর', 'Aria Digital Diagnostic Centre, Shajahanpur', 'diagnostic',
  'Diagnostic Centres', 'ঢাকা-বগুড়া মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১', '01718-442266', 'মহাসড়ক ট্রমা জরুরি ডিজিটাল এক্স-রে, ব্লাড গ্রুপিং ও ক্রস-ম্যাচিং, সিরাম ইলেক্ট্রোলাইটস ও রুটিন বায়োকেমিস্ট্রি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর মডার্ন ডায়াগনস্টিক সেন্টার', 'Sherpur Modern Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '01711-554422, 05029-77412', '৫০০ এমএ হাই-ফ্রিকোয়েন্সি ডিজিটাল এক্স-রে, ফোর-ডি কালার আল্ট্রাসাউন্ড ও ইকোকার্ডিওগ্রাফি, সম্পূর্ণ অটোমেটেড বায়োকেমিস্ট্রি ও হরমোন টেস্ট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আপন ডায়াগনস্টিক অ্যান্ড কনসালটেশন সেন্টার, শেরপুর', 'Apan Diagnostic & Consultation Centre, Sherpur', 'diagnostic',
  'Diagnostic Centres', 'বাসস্ট্যান্ড সংলগ্ন, শেরপুর, বগুড়া - ৫৮৪০', '01715-993311', 'কমপ্লিট ব্লাড কাউন্ট (CBC) ও পিভিএফ (PBF), থাইরয়েড হরমোন (T3, T4, TSH) টেস্ট, লিভার ও রেনাল প্রোফাইল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সীমাবাড়ী ডিজিটাল ডায়াগনস্টিক সেন্টার, শেরপুর', 'Shimabari Digital Diagnostic Centre, Sherpur', 'diagnostic',
  'Diagnostic Centres', 'ঢাকা-বগুড়া মহাসড়ক, সীমাবাড়ী বাজার, শেরপুর, বগুড়া - ৫৮৪০', '01716-884422', 'মহাসড়ক এক্সিডেন্ট জরুরি রেডিওলজি, রুটিন প্যাথলজি ও ব্লাড সুগার টেস্ট, আল্ট্রাসনোগ্রাফি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মোকামতলা সেন্ট্রাল ডায়াগনস্টিক সেন্টার', 'Mokamtala Central Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০', '01712-448833, 01720-998811', 'ডিজিটাল স্কেলিটাল ও ট্রমা এক্স-রে, জরুরী ট্রমা ইউএসজি ও ফ্লুইড অ্যাসেসমেন্ট, র‌্যাপিড সিবিসি ও ব্লাড ক্রস-ম্যাচিং'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শিবগঞ্জ ডিজিটাল ডায়াগনস্টিক সেন্টার', 'Shibganj Digital Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০', '01714-337711', 'ফোর-ডি কালার আল্ট্রাসনোগ্রাফি, রুটিন বায়োকেমিস্ট্রি ও লিভার প্যানেল, ক্লিনিক্যাল প্যাথলজি ও হরমোন টেস্ট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনাতলা মডার্ন ডায়াগনস্টিক সেন্টার', 'Sonatala Modern Diagnostic Centre', 'diagnostic',
  'Diagnostic Centres', 'স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০', '01711-773355, 01724-112288', 'হাই-রেজোলিউশন ডিজিটাল এক্স-রে, প্রেগন্যান্সি ও অ্যাবডোমেন আল্ট্রাসনোগ্রাম, রক্তের সম্পূর্ণ বায়োকেমিক্যাল পরীক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বালুয়া ডিজিটাল ডায়াগনস্টিক সেন্টার, সোনাতলা', 'Balua Digital Diagnostic Centre, Sonatala', 'diagnostic',
  'Diagnostic Centres', 'বালুয়া হাট সংলগ্ন, সোনাতলা, বগুড়া - ৫৮২০', '01715-228844', 'ক্লিনিক্যাল প্যাথলজি ও ইউরিন/স্টুল মাইক্রোস্কোপি, র‌্যাপিড ডায়াগনস্টিক টেস্ট (ম্যালেরিয়া, ডেঙ্গু), আল্ট্রাসনোগ্রাফি ও রক্ত পরীক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া ডায়াবেটিক সমিতি হাসপাতাল', 'Bogura Diabetic Association Hospital', 'private',
  'Specialized Healthcare Facilities', 'সূত্রাপুর, শেরপুর রোড সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '051-66254, 01711-348921', 'বিশেষায়িত ডায়াবেটিস চিকিৎসা ও গাইডেন্স, ডায়াবেটিক রেটিনোপ্যাথি চক্ষু স্ক্রিনিং, ডায়াবেটিক ফুট কেয়ার ও আলসার সার্জারি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ডা. মতিন চক্ষু হাসপাতাল ও রিসার্চ ইনস্টিটিউট, বগুড়া', 'Dr. Matin Eye Hospital & Research Institute, Bogura', 'private',
  'Eye Hospitals', 'জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০', '051-63821, 01713-375544', 'আধুনিক ফ্যাকো ছানি অপারেশন (Phaco Surgery), রেটিনা ও ভিট্রিও-রেটিনাল লেজার সার্জারি, গ্লুকোমা ও অকুলোপ্লাস্টি অপারেশন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া চক্ষু হাসপাতাল', 'Bogura Eye Hospital', 'private',
  'Eye Hospitals', 'মালতীনগর, বগুড়া সদর, বগুড়া - ৫৮০০', '051-65123, 01712-446699', 'কম্পিউটারাইজড দৃষ্টি পরীক্ষা ও চশমার প্রেসক্রিপশন, মাইক্রো-ইনসিশন ক্যাটারেক্ট সার্জারি (MICS), লেজার ট্রিটমেন্ট ও লো-ভিশন এইড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'স্পেশালাইজড ডেন্টাল কেয়ার অ্যান্ড ওরাল সার্জারি, বগুড়া', 'Specialized Dental Care & Oral Surgery, Bogura', 'private',
  'Dental Clinics', 'শেরপুর রোড, কানোচগাড়ী, বগুড়া সদর, বগুড়া - ৫৮০০', '01711-882233, 051-68912', 'রুট ক্যানেল ট্রিটমেন্ট (RCT) ও ক্রাউন ক্যাপ, ডেন্টাল ইমপ্লান্ট ও ব্রিজিং, অর্থোডন্টিক ব্র্যাকেটস ও বাঁকা দাঁত সোজা করা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বগুড়া বিশেষায়িত শিশু ও মাতৃ হাসপাতাল', 'Bogura Specialized Child & Maternity Hospital', 'private',
  'Specialized Healthcare Facilities', 'মেডিকেল রোড, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-225577, 051-64812', 'নবজাতক নিবিড় পরিচর্যা (NICU) ও ফটোথেরাপি, শিশুরোগ বিশেষজ্ঞ কনসালটেশন ও ইনডোর ওয়ার্ড, পেডিয়াট্রিক সার্জারি ও শিশু সার্জিক্যাল আইসিইউ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সিআরপি (পক্ষাঘাতগ্রস্তদের পুনর্বাসন কেন্দ্র) — বগুড়া', 'Centre for the Rehabilitation of the Paralysed (CRP) - Bogura', 'private',
  'Specialized Healthcare Facilities', 'হাইওয়ে লিংক রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '01730-059588, 051-69850', 'স্ট্রোক ও স্পাইনাল কর্ড ইনজুরি ফিজিওথেরাপি, সেরিব্রাল পালসি (CP) আক্রান্ত শিশুদের পুনর্বাসন, অকুপেশনাল থেরাপি ও স্পিচ থেরাপি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সান্তাহার ডায়াবেটিক ও চক্ষু সেবা কেন্দ্র', 'Santahar Diabetic & Eye Care Centre', 'private',
  'Specialized Healthcare Facilities', 'স্টেশন রোড, সান্তাহার পৌরসভা, আদমদীঘি, বগুড়া - ৫৮৯১', '01712-668811', 'ডায়াবেটিস নিয়মিত চেকআপ ও নিয়ন্ত্রণ, কম্পিউটারাইজড চক্ষু পরীক্ষা ও ছানি স্ক্রিনিং, ডায়াবেটিক রেটিনোপ্যাথি প্রাথমিক মূল্যায়ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আদমদীঘি স্পেশালাইজড ডেন্টাল ক্লিনিক', 'Adamdighi Specialized Dental Clinic', 'private',
  'Dental Clinics', 'বাসস্ট্যান্ড সংলগ্ন, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '01718-335577', 'দাঁতের আধুনিক ফিলিং ও রুট ক্যানেল, আল্ট্রাসনিক ডেন্টাল স্কেলিং ও পলিশিং, ব্যথামুক্ত দাঁত তোলা ও কৃত্রিম দাঁত সংযোজন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ধুনট উপজেলা ডায়াবেটিক সমিতি ক্লিনিক', 'Dhunat Upazila Diabetic Samity Clinic', 'private',
  'Specialized Healthcare Facilities', 'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০', '01715-779922', 'রক্তে শর্করার মাত্রা নিয়মিত পর্যবেক্ষণ, ইনসুলিন গ্রহণ কৌশল প্রশিক্ষণ, উচ্চ রক্তচাপ ও কিডনি জটিলতা স্ক্রিনিং'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ধুনট স্মাইল ডেন্টাল কেয়ার', 'Dhunat Smile Dental Care', 'private',
  'Dental Clinics', 'থানা মোড়, ধুনট বাজার, ধুনট, বগুড়া - ৫৮৫০', '01719-224466', 'ব্যথামুক্ত দাঁত তোলা ও চিকিৎসা, কসমেটিক ফিলিং ও রুট ক্যানেল, স্কেলিং ও মাড়ির রোগের চিকিৎসা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দুপচাঁচিয়া ডায়াবেটিক সমিতি সাব-সেন্টার', 'Dhupchanchia Diabetic Association Sub-Centre', 'private',
  'Specialized Healthcare Facilities', 'থানা মোড়, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01712-558800', 'ডায়াবেটিস শনাক্তকরণ ও নিয়মিত চিকিৎসা, এইচবিএওয়ানসি ও গ্লুকোজ পরীক্ষা, ডায়াবেটিক কার্ড রেজিস্ট্রেশন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দুপচাঁচিয়া চক্ষু ও ডেন্টাল কেয়ার', 'Dhupchanchia Eye & Dental Care', 'private',
  'Eye Hospitals', 'বগুড়া-নওগাঁ মহাসড়ক, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01716-447722', 'কম্পিউটারাইজড চোখের পাওয়ার পরীক্ষা, ছানিপড়া রোগীদের প্রাথমিক মূল্যায়ন, দাঁতের ফিলিং, স্কেলিং ও রুট ক্যানেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাবতলী ডায়াবেটিক কেয়ার সেন্টার', 'Gabtali Diabetic Care Centre', 'private',
  'Specialized Healthcare Facilities', 'থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '01713-881199', 'ডায়াবেটিস রোগীদের সার্বক্ষণিক পর্যবেক্ষণ, ফাস্টিং ও ২ ঘন্টা পরের ব্লাড সুগার টেস্ট, লিপিড ও ব্লাড প্রেশার ট্র্যাকিং'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাবতলী মডার্ন চক্ষু ক্লিনিক', 'Gabtali Modern Eye Clinic', 'private',
  'Eye Hospitals', 'গাবতলী বাজার রোড, গাবতলী, বগুড়া - ৫৮২০', '01718-553311', 'দৃষ্টিশক্তি পরীক্ষা ও চশমার পাওয়ার নির্ধারণ, গ্রামীণ ছানি অপারেশন ক্যাম্প ও রেফারেল, ড্রাই আই ও কনজাংকটিভাইটিস চিকিৎসা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাহালু ডায়াবেটিক কনসালটেশন সেন্টার', 'Kahalu Diabetic Consultation Centre', 'private',
  'Specialized Healthcare Facilities', 'হাসপাতাল রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '01711-669933', 'দীর্ঘস্থায়ী ডায়াবেটিসের বিশেষায়িত চিকিৎসা, রক্তে শর্করার তাৎক্ষণিক পরীক্ষা, ডায়াবেটিক স্নায়বিক জটিলতা নিরূপণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাহালু ডেন্টাল অ্যান্ড ম্যাক্সিলোফেসিয়াল কেয়ার', 'Kahalu Dental & Maxillofacial Care', 'private',
  'Dental Clinics', 'রেলগেট সংলগ্ন, কাহালু, বগুড়া - ৫৮৭০', '01717-336688', 'দাঁত ক্ষয় প্রতিরোধ ও ফিলিং, আল্ট্রাসোনিক স্কেলিং ও দাঁতের যত্ন, মাইনর ওরাল সার্জারি ও দাঁত তোলা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম ডায়াবেটিক অ্যান্ড ক্রনিক কেয়ার সেন্টার', 'Nandigram Diabetic & Chronic Care Centre', 'private',
  'Specialized Healthcare Facilities', 'বাসস্ট্যান্ড, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01712-449911', 'ডায়াবেটিস রোগী মনিটরিং ও খাদ্য পরামর্শ, হাইপারটেনশন ও কার্ডিয়াক রিস্ক স্ক্রিনিং, নিয়মিত ব্লাড সুগার ও লিপিড প্রোফাইল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম স্পেশালাইজড চক্ষু সেবা', 'Nandigram Specialized Eye Care', 'private',
  'Eye Hospitals', 'ওমরপুর মোড়, বগুড়া-নাটোর মহাসড়ক, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01715-882255', 'কম্পিউটারে চোখের দৃষ্টি পরীক্ষা, ছানি রোগী সনাক্তকরণ ও অপারেশন কাউন্সেলিং, গ্লুকোমা স্ক্রিনিং ও চোখের ড্রপ পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সারিয়াকান্দি ডায়াবেটিক ও চরাঞ্চল স্বাস্থ্য কল্যাণ ক্লিনিক', 'Sariakandi Diabetic & Char Health Welfare Clinic', 'private',
  'Specialized Healthcare Facilities', 'থানা রোড, সারিয়াকান্দি বাজার, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01714-338822', 'চরাঞ্চলের রোগীদের বিশেষায়িত ডায়াবেটিস সেবা, ব্লাড গ্লুকোজ ও ব্লাড প্রেশার পরীক্ষা, খাদ্যাভ্যাস ও স্বাস্থ্যকর জীবনযাপন নির্দেশনা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সারিয়াকান্দি নদীমাতৃক চক্ষু সেবা ইউনিট', 'Sariakandi Riverine Eye Care Unit', 'private',
  'Eye Hospitals', 'সারিয়াকান্দি বাজার সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01716-227744', 'যমুনা চরাঞ্চলের মানুষের চোখের ছানি পরীক্ষা, দৃষ্টি ত্রুটি নির্ণয় ও সাশ্রয়ী মূল্যে চশমা বিতরণ, চোখের ইনফেকশন ও অ্যালার্জির চিকিৎসা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শাজাহানপুর ডায়াবেটিক ও এনসিডি পুনর্বাসন কেন্দ্র', 'Shajahanpur Diabetic & NCD Rehabilitation Centre', 'private',
  'Specialized Healthcare Facilities', 'ঢাকা-বগুড়া মহাসড়ক, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-229955', 'ডায়াবেটিস ও দীর্ঘস্থায়ী অসংক্রামক রোগ নিয়ন্ত্রণ, স্ট্রোক পরবর্তী ফিজিওথেরাপি ও পুনর্বাসন, প্যারালাইসিস ও জয়েন্ট পেইনের থেরাপি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আড়িয়া ডেন্টাল অ্যান্ড ওরাল হেলথ ক্লিনিক, শাজাহানপুর', 'Aria Dental & Oral Health Clinic, Shajahanpur', 'private',
  'Dental Clinics', 'ঢাকা মহাসড়ক, আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১', '01718-557733', 'দাঁতের আধুনিক রুট ক্যানেল ও লাইট কিউর ফিলিং, আল্ট্রাসোনিক স্কেলিং ও দাগ দূরীকরণ, আক্কেল দাঁতের জটিল সার্জারি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর ডায়াবেটিক হাসপাতাল', 'Sherpur Diabetic Hospital', 'private',
  'Specialized Healthcare Facilities', 'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '01711-443311, 05029-77510', '৩০ শয্যা বিশেষায়িত ডায়াবেটিস ইনডোর ও ডে-কেয়ার, ডায়াবেটিক নেফ্রোপ্যাথি ও কিডনি জটিলতা চিকিৎসা, ইনসুলিন ব্যাংক ও নিয়মিত ব্লাড সুগার প্রোফাইল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর বিশেষায়িত চক্ষু হাসপাতাল', 'Sherpur Specialized Eye Hospital', 'private',
  'Eye Hospitals', 'বাসস্ট্যান্ড রোড, শেরপুর, বগুড়া - ৫৮৪০', '01715-884466', 'মাইক্রো-সার্জারি ফ্যাকো ছানি অপারেশন, কম্পিউটারাইজড অটো-রিফ্রাকশন ও চশমা, ২৫ শয্যা চক্ষু ইনডোর ওয়ার্ড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর ডেন্টাল কেয়ার অ্যান্ড ওরাল সার্জারি', 'Sherpur Dental Care & Oral Surgery', 'private',
  'Dental Clinics', 'কলেজ রোড, শেরপুর, বগুড়া - ৫৮৪০', '01716-773399', 'রুট ক্যানেল ট্রিটমেন্ট (RCT) ও মেটাল/পোরসেলিন ক্যাপ, দাঁতের বন্ডিং ও কসমেটিক ফিলিং, মাড়ির রক্তক্ষরণ ও পাইওরিয়ার চিকিৎসা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শিবগঞ্জ ডায়াবেটিক অ্যান্ড ক্রনিক কেয়ার সেন্টার', 'Shibganj Diabetic & Chronic Care Centre', 'private',
  'Specialized Healthcare Facilities', 'থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০', '01712-339944', 'ডায়াবেটিস রোগীদের নিয়মিত গ্লুকোজ পর্যবেক্ষণ, এইচবিএওয়ানসি ও কিডনি স্ক্রিনিং, ডায়াবেটিক পায়ের যত্ন ও আলসার প্রতিরোধ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মোকামতলা চক্ষু ও ডেন্টাল কেয়ার সেন্টার, শিবগঞ্জ', 'Mokamtala Eye & Dental Care Centre, Shibganj', 'private',
  'Eye Hospitals', 'রংপুর রোড, মোকামতলা মোড়, শিবগঞ্জ, বগুড়া - ৫৮১০', '01714-226688', 'কম্পিউটারে চোখের দৃষ্টি পরীক্ষা ও চশমা, চোখের ছানি পরীক্ষা ও রেফারেল, দাঁতের ফিলিং, স্কেলিং ও রুট ক্যানেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনাতলা ডায়াবেটিক সমিতি সাব-সেন্টার', 'Sonatala Diabetic Association Sub-Centre', 'private',
  'Specialized Healthcare Facilities', 'স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০', '01711-662244', 'রুটিন ডায়াবেটিস সনাক্তকরণ ও চিকিৎসা, রক্তচাপ ও কার্ডিওভাসকুলার মনিটরিং, ইনসুলিন সরবরাহ ও খাদ্য নিয়ন্ত্রণ শিক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনাতলা স্মাইল ডেন্টাল ক্লিনিক', 'Sonatala Smile Dental Clinic', 'private',
  'Dental Clinics', 'সোনাতলা বাজার রোড, সোনাতলা, বগুড়া - ৫৮২০', '01715-117733', 'ব্যথামুক্ত দাঁত তোলা ও চিকিৎসা, কম্পোজিট ফিলিং ও রুট ক্যানেল, দাঁতের স্কেলিং ও মাড়ির প্রদাহের যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, বগুড়া সদর', 'Surjer Hashi Clinic (SHN), Bogura Sadar', 'private',
  'NGO Healthcare Facilities', 'সূত্রাপুর, মালতীনগর রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '051-64582, 01711-229944', 'মা ও শিশু স্বাস্থ্য সেবা (MCH), স্বাভাবিক প্রসব সেবা ও রেফারেল, গর্ভকালীন (ANC) ও প্রসবোত্তর (PNC) যত্ন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ম্যারি স্টোপস ক্লিনিক, বগুড়া', 'Marie Stopes Clinic, Bogura', 'private',
  'NGO Healthcare Facilities', 'জলেশ্বরীতলা প্রধান সড়ক, বগুড়া সদর, বগুড়া - ৫৮০০', '051-69211, 09612-600600', 'নিরাপদ মাতৃত্ব ও স্বাভাবিক প্রসব সেবা, জরায়ুমুখের ক্যান্সার স্ক্রিনিং (VIA Test), পরিবার পরিকল্পনা সামগ্রী ও স্থায়ী পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ব্র্যাক স্বাস্থ্য কেন্দ্র, বগুড়া সদর', 'BRAC Health Centre, Bogura Sadar', 'private',
  'NGO Healthcare Facilities', 'এরুলিয়া বাজার সংলগ্ন, বগুড়া সদর, বগুড়া - ৫৮০০', '01713-069811', 'কমিউনিটি গর্ভবতী চেকআপ, শিশুর পুষ্টি ও বৃদ্ধি পর্যবেক্ষণ, যক্ষ্মা ও সংক্রামক রোগ নিয়ন্ত্রণ স্ক্রিনিং'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ঘাসফুল স্বাস্থ্য ও পরিবার কল্যাণ কেন্দ্র, বগুড়া', 'Ghashful Health & Family Welfare Centre, Bogura', 'private',
  'NGO Healthcare Facilities', 'ফাঁপোর গ্রাম, বগুড়া সদর, বগুড়া - ৫৮০০', '01711-447700', 'মাতৃস্বাস্থ্য ও পুষ্টি শিক্ষা, টিকা ও সাধারণ প্রাথমিক চিকিৎসা, কিশোরী স্বাস্থ্য সচেতনতা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, সান্তাহার (আদমদীঘি)', 'Surjer Hashi Clinic, Santahar (Adamdighi)', 'private',
  'NGO Healthcare Facilities', 'রেলওয়ে কলোনি সংলগ্ন, সান্তাহার, আদমদীঘি, বগুড়া - ৫৮৯১', '01712-446688', 'মা ও শিশু প্রাথমিক সেবা, নরমাল ডেলিভারি ও প্রসূতি যত্ন, টিকা ও পুষ্টি কর্মসূচি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস কমিউনিটি স্বাস্থ্য কেন্দ্র, আদমদীঘি', 'TMSS Community Health Centre, Adamdighi', 'private',
  'NGO Healthcare Facilities', 'বাসস্ট্যান্ড রোড, আদমদীঘি সদর, আদমদীঘি, বগুড়া - ৫৮৯২', '01713-377112', 'গ্রামীণ মা ও শিশু স্বাস্থ্য সেবা, বিনামূল্যে পরামর্শ ও সাশ্রয়ী ওষুধ, স্বাভাবিক প্রসব সহায়তা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, ধুনট', 'Surjer Hashi Clinic, Dhunat', 'private',
  'NGO Healthcare Facilities', 'উপজেলা স্বাস্থ্য কমপ্লেক্স সংলগ্ন, ধুনট সদর, ধুনট, বগুড়া - ৫৮৫০', '01714-771188', 'গর্ভবতী মায়েদের যত্ন ও স্বাভাবিক প্রসব, শিশু পুষ্টি ও টিকাদান, সাধারণ রোগীর আউটডোর চিকিৎসা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ব্র্যাক মাতৃ ও শিশু স্বাস্থ্য ক্লিনিক, ধুনট', 'BRAC Maternal & Child Health Clinic, Dhunat', 'private',
  'NGO Healthcare Facilities', 'চিকাশী বাজার, ধুনট, বগুড়া - ৫৮৫০', '01713-069812', 'চরাঞ্চল সংলগ্ন মা ও শিশু স্বাস্থ্য, ডায়রিয়া ও নিউমোনিয়া প্রাথমিক চিকিৎসা, ইপিআই টিকাদান ও ভিটামিন এ ক্যাপসুল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, দুপচাঁচিয়া', 'Surjer Hashi Clinic, Dhupchanchia', 'private',
  'NGO Healthcare Facilities', 'থানা মোড়, দুপচাঁচিয়া সদর, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01712-331199', 'মা ও শিশু স্বাস্থ্য সেবা, নিরাপদ স্বাভাবিক প্রসব, ইপিআই টিকা প্রদান'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস স্বাস্থ্য সেবা কেন্দ্র, দুপচাঁচিয়া', 'TMSS Health Care Centre, Dhupchanchia', 'private',
  'NGO Healthcare Facilities', 'তালোড়া বাজার, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01713-377113', 'শিল্প এলাকার শ্রমিকদের প্রাথমিক চিকিৎসা, মাতৃস্বাস্থ্য ও পুষ্টি সেবা, সাধারণ রোগীর আউটডোর কনসালটেশন'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, গাবতলী', 'Surjer Hashi Clinic, Gabtali', 'private',
  'NGO Healthcare Facilities', 'থানা মোড়, গাবতলী সদর, গাবতলী, বগুড়া - ৫৮২০', '01713-448822', 'মাতৃ ও শিশু স্বাস্থ্য সেবা, স্বাভাবিক প্রসব সেবা ও পরিবার পরিকল্পনা, শিশুর টিকাদান ও পুষ্টি সহায়তা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস স্বাস্থ্য কেন্দ্র, গাবতলী', 'TMSS Health Centre, Gabtali', 'private',
  'NGO Healthcare Facilities', 'বালিয়াদিঘী বাজার, গাবতলী, বগুড়া - ৫৮২০', '01713-377114', 'গ্রামীণ কমিউনিটি স্বাস্থ্য সেবা, গর্ভবতী চেকআপ ও মা ও শিশু যত্ন, অল্প খরচে প্রয়োজনীয় ওষুধ বিতরণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, কাহালু', 'Surjer Hashi Clinic, Kahalu', 'private',
  'NGO Healthcare Facilities', 'উপজেলা স্বাস্থ্য কমপ্লেক্স রোড, কাহালু সদর, কাহালু, বগুড়া - ৫৮৭০', '01711-552277', 'গর্ভবতী মায়েদের প্রসবপূর্ব ও প্রসবোত্তর চেকআপ, স্বাভাবিক প্রসব সেবা, শিশুর টিকাদান ও বৃদ্ধি পর্যবেক্ষণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস স্বাস্থ্য কেন্দ্র, কাহালু', 'TMSS Health Centre, Kahalu', 'private',
  'NGO Healthcare Facilities', 'মুরইল বাজার, কাহালু, বগুড়া - ৫৮৭০', '01713-377115', 'প্রাথমিক স্বাস্থ্য ও মা-শিশু পরামর্শ, স্বাভাবিক প্রসব সহায়তা, ওষুধ সরবরাহ ও কাউন্সেলিং'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, নন্দীগ্রাম', 'Surjer Hashi Clinic, Nandigram', 'private',
  'NGO Healthcare Facilities', 'বাসস্ট্যান্ড মোড়, নন্দীগ্রাম সদর, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01712-221177', 'মা ও শিশু স্বাস্থ্য সেবা, স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা, ইপিআই টিকাদান ও ভিটামিন বিতরণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস স্বাস্থ্য কেন্দ্র, নন্দীগ্রাম', 'TMSS Health Centre, Nandigram', 'private',
  'NGO Healthcare Facilities', 'ভাটরা বাজার, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01713-377116', 'গ্রামীণ কমিউনিটি স্বাস্থ্য সেবা, প্রসূতি যত্ন ও টিকা কার্যক্রম, প্রাথমিক চিকিৎসা ও ফার্স্ট এইড'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ব্র্যাক চরাঞ্চল স্বাস্থ্য ও পুষ্টি কেন্দ্র, সারিয়াকান্দি', 'BRAC Char Health & Nutrition Centre, Sariakandi', 'private',
  'NGO Healthcare Facilities', 'কুতুবপুর চর সংলগ্ন, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01713-069813', 'যমুনা চরাঞ্চলের মানুষের জন্য বিশেষ স্বাস্থ্য সেবা, মা ও শিশুর পুষ্টি ও টিকাদান, বন্যা ও দুর্যোগকালীন মেডিকেল সহায়তা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস চরাঞ্চল কমিউনিটি ক্লিনিক, সারিয়াকান্দি', 'TMSS Char Community Clinic, Sariakandi', 'private',
  'NGO Healthcare Facilities', 'চালুয়াবাড়ী দ্বীপ চর, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01713-377117', 'চরাঞ্চলের প্রত্যন্ত জনগোষ্ঠীর স্বাস্থ্য সেবা, স্বাভাবিক প্রসব ও নিরাপদ মাতৃত্ব, বিনামূল্যে প্রাথমিক ওষুধ বিতরণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, শাজাহানপুর', 'Surjer Hashi Clinic, Shajahanpur', 'private',
  'NGO Healthcare Facilities', 'ঢাকা মহাসড়ক সংলগ্ন, মাঝিড়া, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-661133', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব সেবা ও পরিবার পরিকল্পনা, ইপিআই টিকাদান ও স্বাস্থ্য শিক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস কমিউনিটি স্বাস্থ্য কেন্দ্র, শাজাহানপুর', 'TMSS Community Health Centre, Shajahanpur', 'private',
  'NGO Healthcare Facilities', 'আড়িয়া বাজার, শাজাহানপুর, বগুড়া - ৫৮০১', '01713-377118', 'প্রাথমিক স্বাস্থ্য ও মা-শিশু সেবা, স্বাভাবিক প্রসব ও টিকা, সাশ্রয়ী প্যাথলজি টেস্ট ও ওষুধ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, শেরপুর', 'Surjer Hashi Clinic, Sherpur', 'private',
  'NGO Healthcare Facilities', 'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '01711-337722, 05029-77312', 'মা ও শিশু স্বাস্থ্য সেবা, ২৪ ঘন্টা নিরাপদ প্রসব সেবা, ইপিআই টিকাদান ও ভিটামিন কর্মসূচি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ম্যারি স্টোপস মাতৃসেবা কেন্দ্র, শেরপুর', 'Marie Stopes Maternal Centre, Sherpur', 'private',
  'NGO Healthcare Facilities', 'বাসস্ট্যান্ড রোড, শেরপুর, বগুড়া - ৫৮৪০', '01712-881144', 'নিরাপদ মাতৃত্ব ও স্বাভাবিক প্রসব, জরায়ুমুখের ক্যান্সার স্ক্রিনিং ও প্রজনন স্বাস্থ্য, আধুনিক পরিবার পরিকল্পনা পদ্ধতি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ব্র্যাক স্বাস্থ্য কেন্দ্র, শেরপুর', 'BRAC Health Centre, Sherpur', 'private',
  'NGO Healthcare Facilities', 'মির্জাপুর বাজার, শেরপুর, বগুড়া - ৫৮৪০', '01713-069814', 'কমিউনিটি গর্ভবতী চেকআপ, শিশু পুষ্টি ও স্বাভাবিক প্রসব সচেতনতা, সংক্রামক রোগ নিয়ন্ত্রণ ও চিকিৎসা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সূর্যের হাসি ক্লিনিক, শিবগঞ্জ', 'Surjer Hashi Clinic, Shibganj', 'private',
  'NGO Healthcare Facilities', 'থানা মোড়, শিবগঞ্জ সদর, শিবগঞ্জ, বগুড়া - ৫৮১০', '01712-774411', 'মা ও শিশু স্বাস্থ্য সেবা, স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা, টিকা ও ভিটামিন বিতরণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ব্র্যাক প্রাথমিক স্বাস্থ্য কেন্দ্র, শিবগঞ্জ', 'BRAC Primary Health Centre, Shibganj', 'private',
  'NGO Healthcare Facilities', 'মোকামতলা মোড় সংলগ্ন, শিবগঞ্জ, বগুড়া - ৫৮১০', '01713-069815', 'কমিউনিটি গর্ভবতী স্বাস্থ্য পরীক্ষা, শিশু পুষ্টি ও বৃদ্ধি পর্যবেক্ষণ, টিবি ও সাধারণ স্বাস্থ্য পরামর্শ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস স্বাস্থ্য সেবা সাব-সেন্টার, সোনাতলা', 'TMSS Health Care Sub-Centre, Sonatala', 'private',
  'NGO Healthcare Facilities', 'স্টেশন রোড, সোনাতলা বাজার, সোনাতলা, বগুড়া - ৫৮২০', '01713-377119', 'মা ও শিশু স্বাস্থ্য পরিচর্যা, স্বাভাবিক প্রসব ও পরিবার পরিকল্পনা, টিকা ও পুষ্টি কর্মসূচি'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি রক্ত কেন্দ্র, বগুড়া', 'Bangladesh Red Crescent Society Blood Centre, Bogura', 'private',
  'Blood Banks', 'রেড ক্রিসেন্ট ভবন, সূত্রাপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '051-66543, 01711-456789', '২৪/৭ জরুরি রক্ত সরবরাহ ও ব্লাড গ্রুপিং, প্যাকড রেড ব্লাড সেলস (PRBC) সেপারেশন, ফ্রেশ ফ্রোজেন প্লাজমা (FFP) ও প্লেটলেট কনসেনট্রেট'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সন্ধানী (শজিমেক ইউনিট) রক্ত ব্যাংক ও মরণোত্তর চক্ষুদান কেন্দ্র', 'Sandhani (SZMC Unit) Blood Bank & Eye Donation Centre', 'private',
  'Blood Banks', 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ ক্যাম্পাস, সিলিমপুর, বগুড়া সদর, বগুড়া - ৫৮০০', '051-60862, 01712-001122, 01711-002233', '২৪ ঘন্টা জরুরি রক্তের গ্রুপ নির্ণয় ও ক্রস-ম্যাচিং, স্বেচ্ছায় রক্তদান সংগ্রহ ও রোগীর জন্য রক্ত সরবরাহ, মরণোত্তর কর্নিয়া সংগ্রহ ও চক্ষু ব্যাংক সংরক্ষণ'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'মোহাম্মদ আলী হাসপাতাল রক্ত পরিসঞ্চালন কেন্দ্র', 'Mohammad Ali Hospital Blood Transfusion Centre', 'govt',
  'Blood Banks', 'মোহাম্মদ আলী হাসপাতাল কম্পাউন্ড, হাসপাতাল রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '051-66020, 01730-324631', 'হাসপাতালে ভর্তি ও জরুরি রোগীদের নিরাপদ রক্ত পরিসঞ্চালন, ব্লাড গ্রুপিং ও অ্যান্টিবডি স্ক্রিনিং, রক্তের পাঁচ প্রকার সংক্রামক রোগ পরীক্ষা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'টিএমএসএস ব্লাড ব্যাংক ও ট্রান্সফিউশন মেডিসিন সেন্টার', 'TMSS Blood Bank & Transfusion Medicine Centre', 'private',
  'Blood Banks', 'টিএমএসএস মেডিকেল কলেজ হাসপাতাল, ঠেঙ্গামারা, বগুড়া সদর, বগুড়া - ৫৮০০', '051-78567, 01711-426749', '২৪/৭ সার্বক্ষণিক রক্তের উপাদান পৃথকীকরণ (Blood Components), ক্রায়োপ্রিসিপিটেট ও ফ্রেশ প্লাজমা প্রস্তুতি, নিরাপদ ক্রস-ম্যাচিং ও স্ক্রিনিং'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'বাঁধন (স্বেচ্ছায় রক্তদাতাদের সংগঠন) — বগুড়া জেলা ইউনিট', 'Badhan Blood Donation Network, Bogura District', 'private',
  'Blood Banks', 'সরকারি আজিজুল হক কলেজ প্রাঙ্গণ, ফুলবাড়ি, বগুড়া সদর, বগুড়া - ৫৮০০', '01711-998877, 01722-334455', 'জরুরি রোগীর জন্য তাৎক্ষণিক বিনামূল্যে রক্তদাতা ব্যবস্থা, বিনামূল্যে রক্তের গ্রুপ নির্ণয় ক্যাম্পেইন, তরুণ ও শিক্ষার্থীদের মধ্যে স্বেচ্ছায় রক্তদান সচেতনতা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ফায়ার সার্ভিস ও সিভিল ডিফেন্স কেন্দ্রীয় অ্যাম্বুলেন্স ইউনিট, বগুড়া', 'Fire Service & Civil Defence Central Ambulance Unit, Bogura', 'govt',
  'Ambulance Services', 'ফায়ার স্টেশন কম্পাউন্ড, স্টেশন রোড, বগুড়া সদর, বগুড়া - ৫৮০০', '051-65555, 01730-336699, 16163', '২৪/৭ জরুরি দুর্ঘটনা ও ট্রমা পরিবহন (১৬১৬৩ / ৯৯৯), অক্সিজেন ও ফার্স্ট এইড সজ্জিত অ্যাম্বুলেন্স, বন্যা, অগ্নিকাণ্ড ও দুর্যোগে আহতদের দ্রুত হাসপাতালে স্থানান্তর'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শজিমেক হাসপাতাল নিবিড় পরিচর্যা (ICU) অ্যাম্বুলেন্স বহর', 'SZRMCH Critical Care & ICU Ambulance Fleet', 'govt',
  'Ambulance Services', 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল, সিলিমপুর, বগুড়া - ৫৮০০', '01711-820847, 01730-324610, 051-60862', 'অ্যাডভান্সড লাইফ সাপোর্ট (ALS) ও পোর্টেবল ভেন্টিলেটর, আইসিইউ অন হুইলস (ICU on Wheels) ঢাকা ও বিভাগীয় স্থানান্তর, কার্ডিয়াক ডিফিব্রিলেটর ও সার্বক্ষণিক প্যারামেডিক'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'আদমদীঘি ফায়ার সার্ভিস ও হাসপাতাল জরুরি অ্যাম্বুলেন্স', 'Adamdighi Fire Service & Hospital Emergency Ambulance', 'govt',
  'Ambulance Services', 'উপজেলা স্বাস্থ্য কমপ্লেক্স প্রাঙ্গণ, আদমদীঘি, বগুড়া - ৫৮৯২', '01730-002211, 01730-324620', '২৪/৭ জরুরি রোগী পরিবহন ও অক্সিজেন সহায়তা, রেলওয়ে জংশন ও মহাসড়ক দুর্ঘটনা রেসপন্স, বগুড়া মেডিকেল কলেজ হাসপাতালে জরুরি রেফারেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'ধুনট উপজেলা স্বাস্থ্য কমপ্লেক্স জরুরি অ্যাম্বুলেন্স', 'Dhunat Upazila Health Complex Emergency Ambulance', 'govt',
  'Ambulance Services', 'উপজেলা স্বাস্থ্য কমপ্লেক্স, ধুনট, বগুড়া - ৫৮৫০', '01730-324621, 01712-884499', '২৪ ঘন্টা জরুরি প্রসূতি ও সাধারণ রোগী পরিবহন, অক্সিজেন সিলিন্ডার ও প্রাথমিক ট্রমা কেয়ার, জরুরি রেফারেল সার্ভিস'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'দুপচাঁচিয়া ফায়ার সার্ভিস ও হাসপাতাল অ্যাম্বুলেন্স ইউনিট', 'Dhupchanchia Fire Service & Hospital Ambulance Unit', 'govt',
  'Ambulance Services', 'উপজেলা স্বাস্থ্য কমপ্লেক্স, দুপচাঁচিয়া, বগুড়া - ৫৮৮০', '01730-002212, 01730-324622', 'মহাসড়ক সড়ক দুর্ঘটনার জরুরি রেসপন্স, ২৪/৭ রোগী স্থানান্তর ও অক্সিজেন সাপোর্ট, শজিমেক হাসপাতালে জরুরি রেফারেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'গাবতলী উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস', 'Gabtali Upazila Health Complex Ambulance Service', 'govt',
  'Ambulance Services', 'উপজেলা স্বাস্থ্য কমপ্লেক্স প্রাঙ্গণ, গাবতলী, বগুড়া - ৫৮২০', '01730-324623, 01711-667700', 'জরুরি প্রসূতি ও জটিল রোগী পরিবহন, ২৪/৭ জরুরি অক্সিজেন সুবিধা, বগুড়া সদর হাসপাতালে দ্রুত স্থানান্তর'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'কাহালু উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস', 'Kahalu Upazila Health Complex Ambulance Service', 'govt',
  'Ambulance Services', 'উপজেলা স্বাস্থ্য কমপ্লেক্স, কাহালু, বগুড়া - ৫৮৭০', '01730-324624, 01715-446688', '২৪ ঘন্টা জরুরি রোগী পরিবহন, ফার্স্ট এইড ও অক্সিজেন সাপোর্ট, রেফারেল পরিবহন সুবিধা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'নন্দীগ্রাম ফায়ার সার্ভিস ও হাসপাতাল জরুরি অ্যাম্বুলেন্স', 'Nandigram Fire Service & Hospital Emergency Ambulance', 'govt',
  'Ambulance Services', 'উপজেলা স্বাস্থ্য কমপ্লেক্স, নন্দীগ্রাম, বগুড়া - ৫৮৬০', '01730-002213, 01730-324625', 'বগুড়া-নাটোর মহাসড়ক জরুরি দুর্ঘটনা রেসপন্স, ২৪/৭ জরুরি অক্সিজেন সাপোর্ট অ্যাম্বুলেন্স, মেডিকেল কলেজ হাসপাতালে রেফারেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সারিয়াকান্দি নদীমাতৃক স্পিডবোট ও সড়ক অ্যাম্বুলেন্স সার্ভিস', 'Sariakandi Riverine Speedboat & Road Ambulance Service', 'govt',
  'Ambulance Services', 'যমুনা নদী ঘাট ও উপজেলা স্বাস্থ্য কমপ্লেক্স, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01730-324626, 01714-889933', 'যমুনা চরাঞ্চলের জন্য বিশেষায়িত দ্রুতগামী ওয়াটার অ্যাম্বুলেন্স (Speedboat Ambulance), ২৪/৭ জরুরি বন্যা ও দুর্যোগকালীন রোগী উদ্ধার, সড়ক অ্যাম্বুলেন্স যোগে জেলা হাসপাতালে স্থানান্তর'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সারিয়াকান্দি স্বেচ্ছায় রক্তদাতা নেটওয়ার্ক', 'Sariakandi Voluntary Blood Donor Network', 'private',
  'Blood Banks', 'থানা রোড, সারিয়াকান্দি, বগুড়া - ৫৮৩০', '01716-448822', 'চরাঞ্চল ও নদী তীরবর্তী রোগীদের জন্য তাৎক্ষণিক রক্তদাতা ব্যবস্থা, রক্তের গ্রুপ ও ক্রস-ম্যাচিং সমন্বয়, জরুরি প্রসব ও রক্তক্ষরণে লাইফ সেভিং সহায়তা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শাজাহানপুর মহাসড়ক ফায়ার সার্ভিস ও জরুরি অ্যাম্বুলেন্স', 'Shajahanpur Highway Fire Service & Emergency Ambulance', 'govt',
  'Ambulance Services', 'ঢাকা মহাসড়ক, মাঝিড়া ফায়ার স্টেশন, শাজাহানপুর, বগুড়া - ৫৮০১', '01730-002214, 01730-324627', '২৪/৭ মহাসড়ক দুর্ঘটনা জরুরি রেসপন্স, গুরুতর ট্রমা রোগীদের শজিমেক হাসপাতালে দ্রুত স্থানান্তর, অক্সিজেন ও লাইফ সাপোর্ট সরঞ্জাম'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর উপজেলা ফায়ার সার্ভিস ও হাসপাতাল অ্যাম্বুলেন্স বহর', 'Sherpur Upazila Fire Service & Hospital Ambulance Fleet', 'govt',
  'Ambulance Services', 'ঢাকা রোড, শেরপুর পৌরসভা, শেরপুর, বগুড়া - ৫৮৪০', '01730-002215, 01730-324628', 'ঢাকা-বগুড়া মহাসড়ক এক্সিডেন্ট ইমার্জেন্সি রেসপন্স, ২৪/৭ জরুরি রোগী পরিবহন ও অক্সিজেন, বগুড়া সদর ও ঢাকা রেফারেল সহায়তা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শেরপুর উপজেলা রক্তদান ক্লাব', 'Sherpur Upazila Blood Donation Club', 'private',
  'Blood Banks', 'কলেজ রোড, শেরপুর, বগুড়া - ৫৮৪০', '01715-334411', 'জরুরি রোগীদের জন্য ২৪ ঘন্টা রক্তদাতা সরবরাহ, রক্তের গ্রুপ পরীক্ষা ও সচেতনতা, থ্যালাসেমিয়া ও প্রসূতি রোগীদের রক্ত সহায়তা'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'শিবগঞ্জ ফায়ার সার্ভিস ও মহাসড়ক ট্রমা অ্যাম্বুলেন্স ইউনিট', 'Shibganj Fire Service & Highway Trauma Ambulance Unit', 'govt',
  'Ambulance Services', 'মোকামতলা মোড়, রংপুর মহাসড়ক, শিবগঞ্জ, বগুড়া - ৫৮১০', '01730-002216, 01730-324629', 'রংপুর-বগুড়া মহাসড়ক দুর্ঘটনা দ্রুত পরিবহন, ২৪/৭ জরুরি অক্সিজেন ও ট্রমা ইমোবিলাইজেশন, শজিমেক হাসপাতালে দ্রুত রেফারেল'
) ON CONFLICT DO NOTHING;

INSERT INTO public.hospitals (name, en_name, type, type_label, address, phone, emergency)
VALUES (
  'সোনাতলা উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স সার্ভিস', 'Sonatala Upazila Health Complex Ambulance Service', 'govt',
  'Ambulance Services', 'উপজেলা স্বাস্থ্য কমপ্লেক্স, সোনাতলা, বগুড়া - ৫৮২০', '01730-324630, 01712-559922', '২৪ ঘন্টা জরুরি প্রসূতি ও সাধারণ রোগী পরিবহন, অক্সিজেন সজ্জিত অ্যাম্বুলেন্স সেবা, বগুড়া সদর হাসপাতালে জরুরি রেফারেল'
) ON CONFLICT DO NOTHING;