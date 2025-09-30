-- Insert admin role for chris@sixdeep.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('455c79a9-d739-4b5b-8926-4deed24bc723', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;