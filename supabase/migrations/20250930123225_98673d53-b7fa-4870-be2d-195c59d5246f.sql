-- Create bio_links table for user bio link configuration
CREATE TABLE public.bio_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  bio TEXT,
  theme_color TEXT DEFAULT '#000000',
  display_order JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create bio_link_social_links table
CREATE TABLE public.bio_link_social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio_link_id UUID NOT NULL REFERENCES public.bio_links(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bio_link_product_categories table
CREATE TABLE public.bio_link_product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio_link_id UUID NOT NULL REFERENCES public.bio_links(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(bio_link_id, category_id)
);

-- Create bio_link_analytics table
CREATE TABLE public.bio_link_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio_link_id UUID NOT NULL REFERENCES public.bio_links(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bio_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bio_link_social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bio_link_product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bio_link_analytics ENABLE ROW LEVEL SECURITY;

-- Bio Links RLS Policies
CREATE POLICY "Users can view their own bio link"
  ON public.bio_links FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bio link"
  ON public.bio_links FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bio link"
  ON public.bio_links FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view active bio links"
  ON public.bio_links FOR SELECT
  USING (is_active = true);

-- Social Links RLS Policies
CREATE POLICY "Users can manage their social links"
  ON public.bio_link_social_links FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.bio_links
      WHERE bio_links.id = bio_link_social_links.bio_link_id
      AND bio_links.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view visible social links"
  ON public.bio_link_social_links FOR SELECT
  USING (is_visible = true);

-- Product Categories RLS Policies
CREATE POLICY "Users can manage their product categories"
  ON public.bio_link_product_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.bio_links
      WHERE bio_links.id = bio_link_product_categories.bio_link_id
      AND bio_links.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view visible product categories"
  ON public.bio_link_product_categories FOR SELECT
  USING (is_visible = true);

-- Analytics RLS Policies
CREATE POLICY "Users can view their own analytics"
  ON public.bio_link_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bio_links
      WHERE bio_links.id = bio_link_analytics.bio_link_id
      AND bio_links.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert analytics"
  ON public.bio_link_analytics FOR INSERT
  WITH CHECK (true);

-- Add trigger for bio_links updated_at
CREATE TRIGGER update_bio_links_updated_at
  BEFORE UPDATE ON public.bio_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Generate unique short_link for existing users without one
UPDATE public.profiles 
SET short_link = LOWER(username)
WHERE short_link IS NULL AND username IS NOT NULL;