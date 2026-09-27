-- ====================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR HERITAGE TEMPLE WEBSITE
-- Execute this SQL in your Supabase SQL Editor to provision tables
-- ====================================================================

-- 1. Temple General Info
CREATE TABLE IF NOT EXISTS temple_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  history TEXT,
  architectural_style TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  start_time TEXT,
  end_time TEXT,
  location TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'General',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Festivals Table
CREATE TABLE IF NOT EXISTS festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  historical_significance TEXT,
  image_url TEXT,
  special_timings TEXT,
  is_featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Announcements / Notices Table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  priority TEXT DEFAULT 'normal', -- 'normal', 'important', 'urgent'
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Gallery Albums Table
CREATE TABLE IF NOT EXISTS gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES gallery_albums(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  category TEXT DEFAULT 'Architecture',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Temple Timings Table
CREATE TABLE IF NOT EXISTS temple_timings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day TEXT NOT NULL,
  opening_time TEXT NOT NULL,
  closing_time TEXT NOT NULL,
  morning_aarti TEXT,
  evening_aarti TEXT,
  special_notes TEXT,
  sort_order INT DEFAULT 0
);

-- 8. Nearby Places Table
CREATE TABLE IF NOT EXISTS nearby_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'Historical Places',
  distance TEXT,
  image_url TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Donations Table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  amount NUMERIC NOT NULL,
  payment_id TEXT,
  payment_status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Setup
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE temple_timings ENABLE ROW LEVEL SECURITY;
ALTER TABLE nearby_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Read policies for public
CREATE POLICY "Public items are readable" ON events FOR SELECT USING (published = true);
CREATE POLICY "Public festivals readable" ON festivals FOR SELECT USING (published = true);
CREATE POLICY "Public announcements readable" ON announcements FOR SELECT USING (published = true);
CREATE POLICY "Public gallery images readable" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public temple timings readable" ON temple_timings FOR SELECT USING (true);
CREATE POLICY "Public nearby places readable" ON nearby_places FOR SELECT USING (true);
