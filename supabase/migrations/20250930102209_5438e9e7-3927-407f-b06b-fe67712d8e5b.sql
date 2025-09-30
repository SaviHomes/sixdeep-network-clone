-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  referrer_id UUID REFERENCES public.profiles(id),
  short_link TEXT UNIQUE,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create product categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  affiliate_link TEXT,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create referrals tracking table
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES public.profiles(id) NOT NULL,
  referred_id UUID REFERENCES public.profiles(id) NOT NULL,
  level INT NOT NULL CHECK (level >= 1 AND level <= 6),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- Create commissions table
CREATE TABLE public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  referral_id UUID REFERENCES public.referrals(id),
  amount DECIMAL(10,2) NOT NULL,
  level INT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  USING (true);

-- Products policies (public read)
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true);

-- Referrals policies
CREATE POLICY "Users can view their referrals"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

-- Commissions policies
CREATE POLICY "Users can view own commissions"
  ON public.commissions FOR SELECT
  USING (auth.uid() = user_id);

-- Function to create referral chain
CREATE OR REPLACE FUNCTION public.create_referral_chain()
RETURNS TRIGGER AS $$
DECLARE
  current_referrer_id UUID;
  current_level INT := 1;
BEGIN
  current_referrer_id := NEW.referrer_id;
  
  -- Create direct referral
  IF current_referrer_id IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_id, level)
    VALUES (current_referrer_id, NEW.id, 1);
    
    -- Create chain up to 6 levels
    WHILE current_level < 6 AND current_referrer_id IS NOT NULL LOOP
      SELECT referrer_id INTO current_referrer_id
      FROM public.profiles
      WHERE id = current_referrer_id;
      
      IF current_referrer_id IS NOT NULL THEN
        current_level := current_level + 1;
        INSERT INTO public.referrals (referrer_id, referred_id, level)
        VALUES (current_referrer_id, NEW.id, current_level);
      END IF;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create referral chain
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_referral_chain();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();