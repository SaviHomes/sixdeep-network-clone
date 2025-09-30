-- Fix search_path for create_referral_chain function
CREATE OR REPLACE FUNCTION public.create_referral_chain()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;