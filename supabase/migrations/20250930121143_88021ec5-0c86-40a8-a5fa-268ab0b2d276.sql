-- Add 'advertiser' to the app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'advertiser';

-- Create advertisers table for advertiser-specific data
CREATE TABLE public.advertisers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  email TEXT NOT NULL,
  position TEXT NOT NULL,
  company_name TEXT NOT NULL,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS on advertisers table
ALTER TABLE public.advertisers ENABLE ROW LEVEL SECURITY;

-- Policy: Advertisers can view their own data
CREATE POLICY "Advertisers can view own data"
ON public.advertisers
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Advertisers can update their own data
CREATE POLICY "Advertisers can update own data"
ON public.advertisers
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Advertisers can insert their own data
CREATE POLICY "Advertisers can insert own data"
ON public.advertisers
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can view all advertiser data
CREATE POLICY "Admins can view all advertisers"
ON public.advertisers
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_advertisers_updated_at
BEFORE UPDATE ON public.advertisers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();