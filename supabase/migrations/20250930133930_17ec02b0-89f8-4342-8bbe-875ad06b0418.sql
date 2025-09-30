-- Add theme fields to bio_links table
ALTER TABLE public.bio_links
ADD COLUMN IF NOT EXISTS theme_template TEXT DEFAULT 'gradient',
ADD COLUMN IF NOT EXISTS theme_settings JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_premium_theme BOOLEAN DEFAULT false;

-- Add comment for documentation
COMMENT ON COLUMN public.bio_links.theme_template IS 'Selected theme template name (e.g., minimal, gradient, modern)';
COMMENT ON COLUMN public.bio_links.theme_settings IS 'JSON object storing theme-specific customization settings';
COMMENT ON COLUMN public.bio_links.is_premium_theme IS 'Flag indicating if the current theme is a premium/paid theme';