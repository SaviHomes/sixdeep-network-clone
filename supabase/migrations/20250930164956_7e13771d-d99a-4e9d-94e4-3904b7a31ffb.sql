-- Add Awin-specific fields to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS awin_product_id text,
ADD COLUMN IF NOT EXISTS awin_advertiser_id text,
ADD COLUMN IF NOT EXISTS awin_advertiser_name text,
ADD COLUMN IF NOT EXISTS merchant_product_id text,
ADD COLUMN IF NOT EXISTS aw_deep_link text,
ADD COLUMN IF NOT EXISTS aw_image_url text,
ADD COLUMN IF NOT EXISTS search_price numeric,
ADD COLUMN IF NOT EXISTS merchant_name text,
ADD COLUMN IF NOT EXISTS merchant_id text,
ADD COLUMN IF NOT EXISTS currency text DEFAULT 'GBP',
ADD COLUMN IF NOT EXISTS in_stock boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS stock_quantity integer,
ADD COLUMN IF NOT EXISTS last_synced_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS data_feed_id text;

-- Create index for Awin product lookups
CREATE INDEX IF NOT EXISTS idx_products_awin_product_id ON public.products(awin_product_id);
CREATE INDEX IF NOT EXISTS idx_products_awin_advertiser_id ON public.products(awin_advertiser_id);

-- Create table for Awin import logs
CREATE TABLE IF NOT EXISTS public.awin_import_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  status text NOT NULL DEFAULT 'running',
  products_imported integer DEFAULT 0,
  products_updated integer DEFAULT 0,
  products_failed integer DEFAULT 0,
  error_message text,
  category_filter text,
  advertiser_filter text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on import logs
ALTER TABLE public.awin_import_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view import logs
CREATE POLICY "Admins can view import logs"
  ON public.awin_import_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for system to insert import logs
CREATE POLICY "System can insert import logs"
  ON public.awin_import_logs
  FOR INSERT
  WITH CHECK (true);

-- Create policy for system to update import logs
CREATE POLICY "System can update import logs"
  ON public.awin_import_logs
  FOR UPDATE
  USING (true);

-- Create table for Awin category mappings
CREATE TABLE IF NOT EXISTS public.awin_category_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  awin_category_id text NOT NULL,
  awin_category_name text NOT NULL,
  our_category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on category mappings
ALTER TABLE public.awin_category_mappings ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage category mappings
CREATE POLICY "Admins can manage category mappings"
  ON public.awin_category_mappings
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index for category mapping lookups
CREATE INDEX IF NOT EXISTS idx_awin_category_mappings_awin_id ON public.awin_category_mappings(awin_category_id);

-- Add trigger for updated_at
CREATE TRIGGER update_awin_category_mappings_updated_at
  BEFORE UPDATE ON public.awin_category_mappings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();