-- ========================================================
-- AMAR BOGURA (আমার বগুড়া) — SUPABASE DATABASE SCHEMA
-- Free Tier Optimized for PostgreSQL on Supabase
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Upazilas Table
CREATE TABLE IF NOT EXISTS public.upazilas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  serial_bn TEXT NOT NULL,
  serial_en TEXT NOT NULL,
  name TEXT NOT NULL,
  en_name TEXT NOT NULL,
  area TEXT NOT NULL,
  area_en TEXT NOT NULL,
  union_count TEXT NOT NULL,
  union_count_en TEXT NOT NULL,
  unions TEXT NOT NULL,
  pourashava TEXT NOT NULL,
  pourashava_en TEXT NOT NULL,
  has_pourashava BOOLEAN DEFAULT false,
  postal_code TEXT NOT NULL,
  rivers TEXT NOT NULL,
  health_phone TEXT NOT NULL,
  landmark TEXT NOT NULL,
  description TEXT NOT NULL,
  en_description TEXT NOT NULL,
  history_note TEXT NOT NULL,
  union_list JSONB NOT NULL DEFAULT '[]',
  tags JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Hospitals & Diagnostics Table
CREATE TABLE IF NOT EXISTS public.hospitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  en_name TEXT NOT NULL,
  type TEXT CHECK (type IN ('govt', 'private', 'diagnostic')) NOT NULL,
  type_label TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  emergency TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Emergency Contacts Table
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  number TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tourist & Heritage Spots Table
CREATE TABLE IF NOT EXISTS public.tourist_spots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  en_title TEXT NOT NULL,
  location TEXT NOT NULL,
  tag TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Community Posts Table (Blood, Tuition, Rentals, Jobs, Business)
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT CHECK (category IN ('blood', 'tuition', 'rent', 'jobs', 'business')) NOT NULL,
  name TEXT NOT NULL,
  blood_group TEXT,
  blood_role TEXT,
  badge TEXT,
  upazila TEXT NOT NULL,
  detail TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Indexes for fast searches
CREATE INDEX IF NOT EXISTS idx_community_category ON public.community_posts (category);
CREATE INDEX IF NOT EXISTS idx_community_upazila ON public.community_posts (upazila);
CREATE INDEX IF NOT EXISTS idx_community_blood_group ON public.community_posts (blood_group);
CREATE INDEX IF NOT EXISTS idx_upazilas_name ON public.upazilas (name);

-- Row Level Security (RLS)
ALTER TABLE public.upazilas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourist_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access on all directory tables
CREATE POLICY "Public read upazilas" ON public.upazilas FOR SELECT USING (true);
CREATE POLICY "Public read hospitals" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Public read emergency" ON public.emergency_contacts FOR SELECT USING (true);
CREATE POLICY "Public read tourist_spots" ON public.tourist_spots FOR SELECT USING (true);
CREATE POLICY "Public read community_posts" ON public.community_posts FOR SELECT USING (true);

-- Allow public insert on community_posts (so citizens can submit listings)
CREATE POLICY "Public insert community_posts" ON public.community_posts FOR INSERT WITH CHECK (true);

-- ========================================================
-- SEED DATA FOR COMMUNITY POSTS
-- ========================================================
INSERT INTO public.community_posts (category, name, blood_group, blood_role, badge, upazila, detail, phone)
VALUES
  ('blood', 'মোঃ রাশেদুল ইসলাম', 'O+', 'রক্তদাতা', NULL, 'বগুড়া সদর', 'সাতমাথা, বগুড়া · সর্বশেষ দান: ৪ মাস আগে', '01712-458920'),
  ('blood', 'সাদিয়া আফরিন', 'A+', 'রক্তদাতা', NULL, 'শাজাহানপুর', 'শজিমেক ক্যাম্পাস · যেকোনো সময় প্রস্তুত', '01819-334112'),
  ('blood', 'তানভীর হাসান', 'B+', 'রক্তদাতা', NULL, 'শেরপুর', 'শেরপুর পৌরসভা · স্বেচ্ছাসেবী রক্তদাতা', '01715-990231'),
  ('blood', 'মাহমুদুল হক', 'O-', 'রক্তদাতা', NULL, 'শিবগঞ্জ', 'মহাস্থানগড় এলাকা · জরুরি প্রয়োজনে কল করুন', '01911-762340'),
  ('blood', 'নুসরাত জাহান', 'AB+', 'রক্তদাতা', NULL, 'দুপচাঁচিয়া', 'দুপচাঁচিয়া সদর · নিয়মিত রক্তদাতা', '01722-618490'),
  ('blood', 'জরুরি রক্ত প্রয়োজন (শজিমেক)', 'B-', 'জরুরি প্রয়োজন', NULL, 'বগুড়া সদর', 'শজিমেক মেডিসিন ওয়ার্ড · ২ ব্যাগ রক্ত প্রয়োজন', '01738-112233'),
  ('tuition', 'আব্দুল্লাহ আল মামুন (বুয়েট শিক্ষার্থী)', NULL, NULL, 'শিক্ষক উপলব্ধ', 'বগুড়া সদর', 'নবম–দ্বাদশ শ্রেণি: পদার্থবিজ্ঞান ও উচ্চতর গণিত', '01745-882190'),
  ('tuition', 'ফারহানা ইয়াসমিন (রাবি স্নাতকোত্তর)', NULL, NULL, 'শিক্ষিকা উপলব্ধ', 'বগুড়া সদর', 'ইংরেজি ও বিজ্ঞান (৬ষ্ঠ–১০ম শ্রেণি, জলেশ্বরীতলা)', '01823-449012'),
  ('tuition', 'গৃহশিক্ষক প্রয়োজন (৭ম শ্রেণি)', NULL, NULL, 'টিউশন অফার', 'শেরপুর', 'সপ্তাহে ৪ দিন ইংরেজি ও গণিত · সম্মানী আলোচনা সাপেক্ষে', '01711-552310'),
  ('rent', '২ বেডরুম ফ্যামিলি ফ্ল্যাট ভাড়া', NULL, NULL, 'ফ্যামিলি বাসা', 'বগুড়া সদর', 'জলেশ্বরীতলা, বগুড়া · গ্যাস, লিফট ও গ্যারেজ সুবিধা · ভাড়া: ১২,৫০০৳', '01711-334455'),
  ('rent', 'ছাত্র মেস / সিট ভাড়া (শজিমেক সংলগ্ন)', NULL, NULL, 'ছাত্র মেস', 'শাজাহানপুর', 'সিলিমপুর, শজিমেক গেট সংলগ্ন · ওয়াইফাই ও মিল সুবিধা · ২,৮০০৳', '01817-665544'),
  ('jobs', 'মোঃ শফিকুল ইসলাম — দক্ষ ইলেকট্রিশিয়ান', NULL, NULL, 'দক্ষ টেকনিশিয়ান', 'বগুড়া সদর', 'বাসাবাড়ি ও অফিসের ওয়্যারিং, আইপিএস ও এসি সার্ভিসিং', '01725-778899'),
  ('jobs', 'রফিকুল আলম — অভিজ্ঞ প্রাইভেট কার ড্রাইভার', NULL, NULL, 'ড্রাইভার', 'বগুড়া সদর', 'বৈধ পেশাদার লাইসেন্সধারী · ঢাকা ও উত্তরবঙ্গ রুটে অভিজ্ঞ', '01815-123987'),
  ('business', 'এশিয়া সুইটমিট অ্যান্ড কোল্ড ড্রিংকস', NULL, NULL, 'জিআই বগুড়ার দই', 'বগুড়া সদর', 'কবি নজরুল ইসলাম সড়ক, বগুড়া · ঐতিহ্যবাহী শাহী দই ও মিষ্টান্ন', '051-66294'),
  ('business', 'আকবরিয়া গ্র্যান্ড হোটেল অ্যান্ড সুইটস', NULL, NULL, 'শতবর্ষী ঐতিহ্য', 'বগুড়া সদর', 'থানা রোড, বগুড়া · শতবর্ষী ঐতিহ্যবাহী দই, লাচ্ছা সেমাই ও রেস্তোরাঁ', '01711-311222'),
  ('business', 'মহাস্থান দই ঘর ও কটকটি ভান্ডার', NULL, NULL, 'দই ও কটকটি', 'শিবগঞ্জ', 'মহাস্থানগড় বাসস্ট্যান্ড · খাঁটি সরের দই ও প্রসিদ্ধ মহাস্থানের কটকটি', '01718-445566');
