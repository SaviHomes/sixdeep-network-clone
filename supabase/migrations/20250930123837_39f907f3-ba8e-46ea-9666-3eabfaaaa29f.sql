-- Create email templates table
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email template content table (for versioning)
CREATE TABLE public.email_template_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES public.email_templates(id) ON DELETE CASCADE NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  html_content TEXT NOT NULL,
  text_content TEXT,
  is_current BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(template_id, version)
);

-- Create email template variables table
CREATE TABLE public.email_template_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES public.email_templates(id) ON DELETE CASCADE NOT NULL,
  variable_name TEXT NOT NULL,
  variable_description TEXT,
  variable_type TEXT NOT NULL DEFAULT 'text' CHECK (variable_type IN ('text', 'number', 'date', 'boolean', 'url')),
  is_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(template_id, variable_name)
);

-- Create email events table
CREATE TABLE public.email_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT UNIQUE NOT NULL,
  event_description TEXT,
  available_variables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email template events linking table
CREATE TABLE public.email_template_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES public.email_templates(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.email_events(id) ON DELETE CASCADE NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  send_delay_minutes INTEGER DEFAULT 0,
  conditions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(template_id, event_id)
);

-- Create email logs table
CREATE TABLE public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES public.email_templates(id),
  event_id UUID REFERENCES public.email_events(id),
  recipient_email TEXT NOT NULL,
  recipient_user_id UUID REFERENCES auth.users(id),
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'bounced', 'failed', 'opened', 'clicked')),
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_template_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_template_variables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_template_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_templates
CREATE POLICY "Admins can manage all templates"
  ON public.email_templates
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for email_template_content
CREATE POLICY "Admins can manage template content"
  ON public.email_template_content
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for email_template_variables
CREATE POLICY "Admins can manage template variables"
  ON public.email_template_variables
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for email_events
CREATE POLICY "Admins can manage email events"
  ON public.email_events
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for email_template_events
CREATE POLICY "Admins can manage template event mappings"
  ON public.email_template_events
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for email_logs
CREATE POLICY "Admins can view all email logs"
  ON public.email_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert email logs"
  ON public.email_logs
  FOR INSERT
  WITH CHECK (true);

-- Create trigger for updated_at on email_templates
CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Insert default email events
INSERT INTO public.email_events (event_name, event_description, available_variables) VALUES
  ('user_signup', 'Triggered when a new user signs up', '["user_email", "user_name", "verification_link"]'::jsonb),
  ('bio_link_created', 'Triggered when a bio link is created', '["user_email", "user_name", "bio_link_url", "username"]'::jsonb),
  ('commission_earned', 'Triggered when a commission is earned', '["user_email", "user_name", "commission_amount", "commission_level", "referral_name"]'::jsonb),
  ('password_reset', 'Triggered when password reset is requested', '["user_email", "user_name", "reset_link"]'::jsonb),
  ('referral_joined', 'Triggered when someone joins via referral link', '["user_email", "user_name", "referral_name", "referral_level"]'::jsonb);