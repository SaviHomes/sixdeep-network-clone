import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdvertiser, setIsAdvertiser] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus(session.user.id);
        }, 0);
      } else {
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error checking user roles:', error);
        setIsAdmin(false);
        setIsAdvertiser(false);
        setIsAffiliate(false);
      } else {
        const roles = data?.map(r => r.role) || [];
        setIsAdmin(roles.includes('admin'));
        setIsAdvertiser(roles.includes('advertiser'));
        setIsAffiliate(roles.includes('user'));
      }
    } catch (error) {
      console.error('Error in role check:', error);
      setIsAdmin(false);
      setIsAdvertiser(false);
      setIsAffiliate(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      toast({
        title: "Logged out successfully",
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    session,
    isAdmin,
    isAdvertiser,
    isAffiliate,
    isLoading,
    logout,
  };
};
