import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  display_order: number;
  is_visible: boolean;
}

export interface BioLink {
  id: string;
  user_id: string;
  bio: string | null;
  theme_color: string;
  is_active: boolean;
}

export const useBioLink = (userId: string | undefined) => {
  const [bioLink, setBioLink] = useState<BioLink | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchBioLink();
    }
  }, [userId]);

  const fetchBioLink = async () => {
    try {
      setIsLoading(true);
      
      // Fetch bio link
      const { data: bioLinkData, error: bioLinkError } = await supabase
        .from("bio_links")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (bioLinkError) throw bioLinkError;

      if (bioLinkData) {
        setBioLink(bioLinkData);

        // Fetch social links
        const { data: socialLinksData, error: socialLinksError } = await supabase
          .from("bio_link_social_links")
          .select("*")
          .eq("bio_link_id", bioLinkData.id)
          .order("display_order");

        if (socialLinksError) throw socialLinksError;
        setSocialLinks(socialLinksData || []);

        // Fetch selected categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("bio_link_product_categories")
          .select("category_id")
          .eq("bio_link_id", bioLinkData.id);

        if (categoriesError) throw categoriesError;
        setSelectedCategories(categoriesData?.map(c => c.category_id) || []);
      }
    } catch (error: any) {
      toast({
        title: "Error loading bio link",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createBioLink = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from("bio_links")
        .insert({ user_id: userId })
        .select()
        .single();

      if (error) throw error;

      setBioLink(data);
      toast({
        title: "Bio link created",
        description: "Your bio link has been created successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error creating bio link",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateBioLink = async (updates: Partial<BioLink>) => {
    if (!bioLink) return;

    try {
      const { error } = await supabase
        .from("bio_links")
        .update(updates)
        .eq("id", bioLink.id);

      if (error) throw error;

      setBioLink({ ...bioLink, ...updates });
      toast({
        title: "Bio link updated",
        description: "Your changes have been saved",
      });
    } catch (error: any) {
      toast({
        title: "Error updating bio link",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addSocialLink = async (platform: string, url: string) => {
    if (!bioLink) return;

    try {
      const { data, error } = await supabase
        .from("bio_link_social_links")
        .insert({
          bio_link_id: bioLink.id,
          platform,
          url,
          display_order: socialLinks.length,
        })
        .select()
        .single();

      if (error) throw error;

      setSocialLinks([...socialLinks, data]);
      toast({
        title: "Social link added",
        description: `${platform} link added successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error adding social link",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeSocialLink = async (linkId: string) => {
    try {
      const { error } = await supabase
        .from("bio_link_social_links")
        .delete()
        .eq("id", linkId);

      if (error) throw error;

      setSocialLinks(socialLinks.filter(link => link.id !== linkId));
      toast({
        title: "Social link removed",
        description: "The social link has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error removing social link",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleCategory = async (categoryId: string) => {
    if (!bioLink) return;

    try {
      const isSelected = selectedCategories.includes(categoryId);

      if (isSelected) {
        const { error } = await supabase
          .from("bio_link_product_categories")
          .delete()
          .eq("bio_link_id", bioLink.id)
          .eq("category_id", categoryId);

        if (error) throw error;
        setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      } else {
        const { error } = await supabase
          .from("bio_link_product_categories")
          .insert({
            bio_link_id: bioLink.id,
            category_id: categoryId,
            display_order: selectedCategories.length,
          });

        if (error) throw error;
        setSelectedCategories([...selectedCategories, categoryId]);
      }

      toast({
        title: isSelected ? "Category removed" : "Category added",
        description: isSelected 
          ? "Category removed from your bio link" 
          : "Category added to your bio link",
      });
    } catch (error: any) {
      toast({
        title: "Error updating categories",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    bioLink,
    socialLinks,
    selectedCategories,
    isLoading,
    createBioLink,
    updateBioLink,
    addSocialLink,
    removeSocialLink,
    toggleCategory,
    refreshBioLink: fetchBioLink,
  };
};
