
-- 1. Upazilas
CREATE TABLE IF NOT EXISTS public.upazilas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  serial_bn TEXT NOT NULL,
  serial_en TEXT NOT NULL,
  name TEXT NOT NULL,
  en_name TEXT NOT NULL,
  area TEXT NOT NULL,
  area_en TEXT,
  union_count TEXT NOT NULL,
  union_count_en TEXT,
  unions TEXT,
  pourashava TEXT,
  pourashava_en TEXT,
  has_pourashava BOOLEAN DEFAULT false,
  postal_code TEXT,
  rivers TEXT,
  health_phone TEXT,
  landmark TEXT,
  description TEXT,
  en_description TEXT,
  history_note TEXT,
  union_list JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tourist Spots
CREATE TABLE IF NOT EXISTS public.tourist_spots (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  en_title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_bn TEXT NOT NULL,
  location TEXT NOT NULL,
  upazila TEXT NOT NULL,
  tag TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  short_desc TEXT NOT NULL,
  history TEXT NOT NULL,
  architecture TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  timings TEXT NOT NULL,
  entry_fee TEXT NOT NULL,
  best_time TEXT NOT NULL,
  map_coordinates TEXT,
  map_url TEXT,
  is_approved BOOLEAN DEFAULT true,
  contributor JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Spot Reviews
CREATE TABLE IF NOT EXISTS public.spot_reviews (
  id TEXT PRIMARY KEY,
  spot_id TEXT REFERENCES public.tourist_spots(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Community Posts
CREATE TABLE IF NOT EXISTS public.community_posts (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  "group" TEXT,
  badge TEXT,
  upazila TEXT NOT NULL,
  detail TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'approved',
  contributor_name TEXT,
  contributor_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Healthcare Facilities
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
  phone JSONB NOT NULL DEFAULT '[]'::jsonb,
  email TEXT,
  website TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  google_maps_url TEXT NOT NULL,
  image_url TEXT,
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  source_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  verification_status TEXT NOT NULL DEFAULT 'verified',
  last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Educational Institutes (913 Records)
CREATE TABLE IF NOT EXISTS public.educational_institutes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  category TEXT NOT NULL,
  category_bn TEXT NOT NULL,
  upazila TEXT NOT NULL,
  upazila_bn TEXT NOT NULL,
  eiin TEXT,
  established TEXT,
  location TEXT NOT NULL,
  phone TEXT,
  phone_numbers JSONB DEFAULT '[]'::jsonb,
  email TEXT,
  website TEXT,
  cover_image TEXT,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Hospitality Venues (Hotels, Resorts & Restaurants - 41 Records)
CREATE TABLE IF NOT EXISTS public.hospitality_venues (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  upazila TEXT DEFAULT 'বগুড়া সদর',
  url TEXT,
  facilities JSONB DEFAULT '[]'::jsonb,
  phone_number TEXT,
  phone_numbers JSONB DEFAULT '[]'::jsonb,
  banner_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Transport Hubs & Services (22 Records)
CREATE TABLE IF NOT EXISTS public.transport_hubs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  category TEXT NOT NULL,
  category_bn TEXT NOT NULL,
  location TEXT NOT NULL,
  upazila TEXT NOT NULL,
  description TEXT,
  connected_routes JSONB DEFAULT '[]'::jsonb,
  facilities JSONB DEFAULT '[]'::jsonb,
  operating_hours TEXT,
  phone_number TEXT,
  phone_numbers JSONB DEFAULT '[]'::jsonb,
  banner_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.transport_services (
  id TEXT PRIMARY KEY,
  operator_name TEXT NOT NULL,
  operator_name_bn TEXT NOT NULL,
  service_type TEXT NOT NULL,
  service_type_bn TEXT NOT NULL,
  headquarters TEXT,
  online_booking_url TEXT,
  description TEXT,
  facilities JSONB DEFAULT '[]'::jsonb,
  major_routes JSONB DEFAULT '[]'::jsonb,
  counters JSONB DEFAULT '[]'::jsonb,
  phone_number TEXT,
  phone_numbers JSONB DEFAULT '[]'::jsonb,
  banner_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Banks & ATMs (27 Records)
CREATE TABLE IF NOT EXISTS public.banks (
  id TEXT PRIMARY KEY,
  bank_name TEXT NOT NULL,
  bank_name_bn TEXT NOT NULL,
  type TEXT NOT NULL,
  type_bn TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  branch_name_bn TEXT NOT NULL,
  location TEXT NOT NULL,
  upazila TEXT NOT NULL,
  routing_number TEXT,
  swift_code TEXT,
  facilities JSONB DEFAULT '[]'::jsonb,
  has_atm BOOLEAN DEFAULT true,
  has_crm BOOLEAN DEFAULT false,
  operating_hours TEXT,
  hotline TEXT,
  phone_number TEXT,
  phone_numbers JSONB DEFAULT '[]'::jsonb,
  banner_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.atm_booths (
  id TEXT PRIMARY KEY,
  booth_name TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  location TEXT NOT NULL,
  upazila TEXT NOT NULL,
  cards_accepted JSONB DEFAULT '[]'::jsonb,
  services JSONB DEFAULT '[]'::jsonb,
  operating_hours TEXT DEFAULT '24/7',
  hotline TEXT,
  banner_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Blood Donors & Blood Banks (42 Records)
CREATE TABLE IF NOT EXISTS public.blood_banks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  location TEXT NOT NULL,
  upazila TEXT NOT NULL,
  operating_hours TEXT,
  services JSONB DEFAULT '[]'::jsonb,
  hotlines JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blood_donors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  phone TEXT NOT NULL,
  alt_phone TEXT,
  upazila TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL,
  last_donated TEXT,
  total_donations INTEGER DEFAULT 1,
  badge TEXT,
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
