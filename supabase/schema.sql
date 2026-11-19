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

-- 4. Tourist & Heritage Spots Table (Enhanced with detail info & contributor workflow)
CREATE TABLE IF NOT EXISTS public.tourist_spots (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  en_title TEXT NOT NULL,
  category TEXT CHECK (category IN ('archaeological', 'nature', 'religious', 'heritage')) NOT NULL,
  category_bn TEXT NOT NULL,
  location TEXT NOT NULL,
  upazila TEXT NOT NULL,
  tag TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]',
  short_desc TEXT NOT NULL,
  history TEXT NOT NULL,
  architecture TEXT NOT NULL,
  how_to_reach TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]',
  timings TEXT NOT NULL,
  entry_fee TEXT NOT NULL,
  best_time TEXT NOT NULL,
  map_coordinates TEXT,
  map_url TEXT,
  is_approved BOOLEAN DEFAULT true,
  contributor_name TEXT NOT NULL,
  contributor_phone TEXT,
  contributor_email TEXT,
  contributor_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Spot Reviews & Visitor Feedback Table
CREATE TABLE IF NOT EXISTS public.spot_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spot_id TEXT REFERENCES public.tourist_spots(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Community Posts Table (Blood, Tuition, Rentals, Jobs, Business)
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

-- Create Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_community_category ON public.community_posts (category);
CREATE INDEX IF NOT EXISTS idx_community_upazila ON public.community_posts (upazila);
CREATE INDEX IF NOT EXISTS idx_spots_category ON public.tourist_spots (category);
CREATE INDEX IF NOT EXISTS idx_spots_upazila ON public.tourist_spots (upazila);
CREATE INDEX IF NOT EXISTS idx_spots_approved ON public.tourist_spots (is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_spot ON public.spot_reviews (spot_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.upazilas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourist_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spot_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read upazilas" ON public.upazilas FOR SELECT USING (true);
CREATE POLICY "Public read hospitals" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Public read emergency" ON public.emergency_contacts FOR SELECT USING (true);
CREATE POLICY "Public read tourist_spots" ON public.tourist_spots FOR SELECT USING (true);
CREATE POLICY "Public read spot_reviews" ON public.spot_reviews FOR SELECT USING (true);
CREATE POLICY "Public read community_posts" ON public.community_posts FOR SELECT USING (true);

-- Allow public inserts for community submissions & spot contributions
CREATE POLICY "Public insert tourist_spots" ON public.tourist_spots FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update tourist_spots" ON public.tourist_spots FOR UPDATE USING (true);
CREATE POLICY "Public insert spot_reviews" ON public.spot_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert community_posts" ON public.community_posts FOR INSERT WITH CHECK (true);

-- ========================================================
-- SEED DATA: TOURIST & HERITAGE SPOTS OF BOGURA
-- ========================================================
INSERT INTO public.tourist_spots (
  id, title, en_title, category, category_bn, location, upazila, tag, cover_image,
  gallery, short_desc, history, architecture, how_to_reach, highlights, timings, entry_fee,
  best_time, map_coordinates, map_url, is_approved, contributor_name, contributor_note
) VALUES
(
  'mahasthangarh',
  'মহাস্থানগড় (প্রাচীন পুণ্ড্রনগর)',
  'Mahasthangarh Ancient Citadel',
  'archaeological',
  'প্রত্নতাত্ত্বিক নিদর্শন',
  'মহাস্থান, শিবগঞ্জ উপজেলা, বগুড়া',
  'শিবগঞ্জ',
  'ইউনেস্কো সম্ভাব্য ঐতিহ্য',
  'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80"]',
  'খ্রিস্টপূর্ব ৩য় শতাব্দীর পুণ্ড্রবর্ধন রাজ্যের রাজধানী। করতোয়া নদীর তীরে অবস্থিত বাংলাদেশের প্রাচীনতম সুরক্ষিত নগর সভ্যতার ধ্বংসাবশেষ।',
  'মহাস্থানগড় বাংলাদেশের অন্যতম প্রাচীন প্রত্নতাত্ত্বিক নিদর্শন। খ্রিস্টপূর্ব ৩য় শতক থেকে দ্বাদশ শতক পর্যন্ত এটি পুণ্ড্রবর্ধনের রাজধানী ছিল। ১৮৭৯ সালে স্যার আলেকজান্ডার কানিংহাম এটি চিহ্নিত করেন। এখান থেকে প্রাপ্ত ব্রাহ্মী শিলালিপি প্রাচীনতম লিখিত দলিল।',
  'করতোয়া নদীর তীরে আয়তাকার মাটির দুর্গপ্রাচীর ও পরিখা দ্বারা সুরক্ষিত। এর ভেতরে জিয়ত কুণ্ড, পরশুরামের প্রাসাদ, বৈরাগীর ভিটা, গোবিন্দ ভিটা এবং আধুনিক সরকারি জাদুঘর অবস্থিত।',
  'বগুড়া সাতমাথা অথবা চারমাথা বাস টার্মিনাল থেকে রংপুর মহাসড়ক ধরে ১২ কিমি উত্তরে মহাস্থান বাসস্ট্যান্ড। সিএনজি বা বাসে সময় লাগে ২৫ মিনিট।',
  '["প্রাচীন পুণ্ড্রনগরের সুউচ্চ মাটির দুর্গপ্রাচীর", "পরশুরামের প্রাসাদ ও ঐতিহাসিক জিয়ত কুণ্ড", "করতোয়া নদীর তীরের নান্দনিক গোবিন্দ ভিটা", "প্রত্নতাত্ত্বিক জাদুঘর ও প্রাচীন ব্রাহ্মী লিপি", "ঐতিহ্যবাহী মহাস্থানের কটকটি"]',
  'সকাল ৯টা – বিকেল ৫টা (জাদুঘর রবিবার বন্ধ)',
  'দেশি পর্যটক: ৩০ টাকা, শিক্ষার্থী: ৫ টাকা, বিদেশি: ৫০০ টাকা',
  'অক্টোবর থেকে মার্চ',
  '24.9606° N, 89.3458° E',
  'https://maps.google.com/?q=Mahasthangarh,Bogura',
  true,
  'বগুড়া ইতিহাস পরিষদ',
  'বাংলাদেশ প্রত্নতত্ত্ব অধিদপ্তরের তথ্যসূত্রে সংকলিত'
),
(
  'gokul-medh',
  'বেহুলার বাসর ঘর (গোকুল মেধ)',
  'Gokul Medh (Behula Lakshindar)',
  'archaeological',
  'প্রত্নতাত্ত্বিক নিদর্শন',
  'গোকুল গ্রাম, শিবগঞ্জ উপজেলা, বগুড়া',
  'শিবগঞ্জ',
  'মনসামঙ্গল কিংবদন্তি',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"]',
  'মহাস্থানগড় থেকে ২ কিমি দক্ষিণে অবস্থিত ১৭২টি অন্ধ কুঠুরি বিশিষ্ট অনন্য স্তরভিত্তিক বৌদ্ধ স্তূপ ও স্থাপত্য নিদর্শন।',
  'লোকবিশ্বাস মতে এটি বেহুলা-লখিন্দরের বাসর ঘর হলেও এটি মূলত ৭ম-১১শ শতাব্দীর একটি বৃহৎ বৌদ্ধ স্তূপ। ১৯৩৪-৩৬ সালে ননীগোপাল মজুমদারের প্রত্নতাত্ত্বিক খননে এটি উন্মোচিত হয়।',
  'ইট নির্মিত ১৭২টি সমান্তরাল অন্ধ প্রকোষ্ঠের ওপর পিরামিড সদৃশ স্তরে স্তরে ওপরে উঠেছে এই স্থাপনা।',
  'বগুড়া শহর থেকে উত্তরে মহাস্থানগড় যাওয়ার পথে গোকুল বাসস্ট্যান্ড নেমে পূর্বে ১ কিমি।',
  '["১৭২টি সেলুলার অন্ধ কুঠুরি কাঠামো", "উঁচু ঢিবির ওপর থেকে সবুজ প্রকৃতির দৃশ্য", "বেহুলা-লখিন্দরের রোমাঞ্চকর লোকগাথা"]',
  'সকাল ৯টা – বিকেল ৫টা',
  'প্রবেশ ফি: ২০ টাকা',
  'নভেম্বর থেকে ফেব্রুয়ারি',
  '24.9458° N, 89.3492° E',
  'https://maps.google.com/?q=Gokul+Medh,Bogura',
  true,
  'আরিফুল হক',
  'স্থানীয় ইতিহাস সংগ্রাহক'
),
(
  'kherua-mosque',
  'ঐতিহাসিক খেরুয়া মসজিদ (১৫৮২)',
  'Historic Kherua Mosque',
  'heritage',
  'সুলতানি ও মুঘল স্থাপত্য',
  'খন্দকারটোলা, শেরপুর উপজেলা, বগুড়া',
  'শেরপুর',
  '১৫৮২ সালের স্থাপত্য',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"]',
  '১৫৮২ খ্রিস্টাব্দে নির্মিত তিন গম্বুজ বিশিষ্ট অপূর্ব পোড়ামাটির টেরাকোটা অলংকরণ সমৃদ্ধ সুলতানি-মুঘল ট্রানজিশনাল মসজিদ।',
  'মুঘল সম্রাট আকবরের আমলে ১৫৮২ খ্রিস্টাব্দে মির্জা মুরাদ খান কাকশাল এই অনন্য মসজিদটি নির্মাণ করেন। দরজার ফার্সি শিলালিপিতে এর সুনির্দিষ্ট নির্মাণকাল খোদাই করা আছে।',
  'মসজিদের ছাদে তিনটি গোলাকার গম্বুজ এবং চার কোণে চারটি অষ্টভুজাকার মিনার রয়েছে। দেয়ালের গায়ে চমৎকার জ্যামিতিক ও পোড়ামাটির পদ্মফুল খোদাই করা।',
  'বগুড়া শহর থেকে ঢাকা মহাসড়কে ২২ কিমি দক্ষিণে শেরপুর বাসস্ট্যান্ড থেকে ১ কিমি পশ্চিমে।',
  '["সাড়ে চার শত বছরের প্রাচীন তিন গম্বুজ কাঠামো", "অষ্টভুজাকার কারুকার্যময় মিনার", "মূল ফার্সি শিলালিপি"]',
  'সারাদিন উন্মুক্ত',
  'সম্পূর্ণ বিনামূল্যে',
  'সারা বছর',
  '24.6732° N, 89.4216° E',
  'https://maps.google.com/?q=Kherua+Mosque+Sherpur+Bogura',
  true,
  'শেরপুর ঐতিহ্য পরিষদ',
  'ঐতিহাসিক তথ্যসূত্র যাচাইকৃত'
),
(
  'sariakandi-jamuna-ghat',
  'প্রেম যমুনার ঘাট ও কালিতলা গ্রোয়েন',
  'Sariakandi Jamuna Ghat & Kalitala Groin',
  'nature',
  'নদী পর্যটন ও চরাঞ্চল',
  'কালিতলা, সারিয়াকান্দি উপজেলা, বগুড়া',
  'সারিয়াকান্দি',
  'যমুনার সূর্যাস্ত ও নৌকাভ্রমণ',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"]',
  'যমুনা নদীর বিশাল জলরাশি, কালিতলা স্পার বাঁধ, চরাঞ্চল কৃষি ও সূর্যাস্তের মনোরম প্রাকৃতিক পর্যটন কেন্দ্র।',
  'যমুনা নদীর ভাঙন রোধে নির্মিত কংক্রিট গ্রোয়েন বাঁধটি বর্তমানে উত্তরবঙ্গের অন্যতম নান্দনিক নদী অবকাশ কেন্দ্রে পরিণত হয়েছে।',
  'কংক্রিটের স্পার বাঁধ নদীর গভীরে বিস্তৃত। ঘাট থেকে দেশি কাঠের নৌকায় চরাঞ্চল ঘুরে দেখা যায়।',
  'বগুড়া সাতমাথা থেকে সরাসরি বাস বা সিএনজিতে ২৩ কিমি পূর্বে সারিয়াকান্দি সদর।',
  '["যমুনা নদীর বুকে সূর্যাস্ত ও সূর্যোদয়ের অপূর্ব রূপ", "কালিতলা গ্রোয়েন বাঁধে শীতল হাওয়া", "দেশি কাঠের নৌকায় নদীভ্রমণ", "তাজা নদীর মাছ ভাজা"]',
  'ভোর ৫টা – রাত ৮টা',
  'ঘাট প্রবেশ বিনামূল্যে',
  'জুলাই থেকে ফেব্রুয়ারি',
  '24.8912° N, 89.5824° E',
  'https://maps.google.com/?q=Sariakandi+Jamuna+Ghat,Bogura',
  true,
  'রাশেদুল কবির',
  'সারিয়াকান্দি পর্যটন ফোরাম'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  cover_image = EXCLUDED.cover_image,
  short_desc = EXCLUDED.short_desc,
  history = EXCLUDED.history;
