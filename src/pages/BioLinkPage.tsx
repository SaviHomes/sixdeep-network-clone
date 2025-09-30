import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MinimalTheme from "@/components/BioLinkThemes/MinimalTheme";
import GradientTheme from "@/components/BioLinkThemes/GradientTheme";
import ModernTheme from "@/components/BioLinkThemes/ModernTheme";
import ProfessionalTheme from "@/components/BioLinkThemes/ProfessionalTheme";
import CreativeTheme from "@/components/BioLinkThemes/CreativeTheme";
import InfluencerTheme from "@/components/BioLinkThemes/InfluencerTheme";
import ClassicTheme from "@/components/BioLinkThemes/ClassicTheme";
import DarkTheme from "@/components/BioLinkThemes/DarkTheme";
import RetroTheme from "@/components/BioLinkThemes/RetroTheme";
import NatureTheme from "@/components/BioLinkThemes/NatureTheme";
import LuxuryTheme from "@/components/BioLinkThemes/LuxuryTheme";
import TechTheme from "@/components/BioLinkThemes/TechTheme";
import GamingTheme from "@/components/BioLinkThemes/GamingTheme";
import FashionTheme from "@/components/BioLinkThemes/FashionTheme";
import MusicTheme from "@/components/BioLinkThemes/MusicTheme";
import FitnessTheme from "@/components/BioLinkThemes/FitnessTheme";
import HalloweenTheme from "@/components/BioLinkThemes/HalloweenTheme";
import ChristmasTheme from "@/components/BioLinkThemes/ChristmasTheme";

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  short_link: string | null;
}

interface BioLinkData {
  id: string;
  bio: string | null;
  theme_color: string;
  theme_template?: string | null;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
}

const BioLinkPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bioLink, setBioLink] = useState<BioLinkData | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBioLinkData();
    trackVisit();
  }, [username]);

  const trackVisit = async () => {
    // Track page visit for analytics
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (profileData) {
      const { data: bioLinkData } = await supabase
        .from("bio_links")
        .select("id")
        .eq("user_id", profileData.id)
        .maybeSingle();

      if (bioLinkData) {
        await supabase.from("bio_link_analytics").insert({
          bio_link_id: bioLinkData.id,
          event_type: "page_view",
          event_data: { username },
        });
      }
    }
  };

  const fetchBioLinkData = async () => {
    try {
      setIsLoading(true);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, full_name, avatar_url, short_link")
        .eq("username", username)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profileData) {
        navigate("/404");
        return;
      }

      setProfile(profileData);

      // Fetch bio link
      const { data: bioLinkData, error: bioLinkError } = await supabase
        .from("bio_links")
        .select("id, bio, theme_color, theme_template")
        .eq("user_id", profileData.id)
        .eq("is_active", true)
        .maybeSingle();

      if (bioLinkError) throw bioLinkError;
      if (bioLinkData) {
        setBioLink(bioLinkData);

        // Fetch social links
        const { data: socialLinksData } = await supabase
          .from("bio_link_social_links")
          .select("platform, url")
          .eq("bio_link_id", bioLinkData.id)
          .eq("is_visible", true)
          .order("display_order");

        setSocialLinks(socialLinksData || []);

        // Fetch categories
        const { data: categoriesData } = await supabase
          .from("bio_link_product_categories")
          .select("category_id, categories(id, name, slug, image_url)")
          .eq("bio_link_id", bioLinkData.id)
          .eq("is_visible", true);

        if (categoriesData) {
          const cats = categoriesData
            .map(item => item.categories)
            .filter(Boolean) as Category[];
          setCategories(cats);
        }
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

  const trackClick = async (eventType: string, eventData: any) => {
    if (bioLink?.id) {
      await supabase.from("bio_link_analytics").insert({
        bio_link_id: bioLink.id,
        event_type: eventType,
        event_data: eventData,
      });
    }
  };


  const handleCategoryClick = (category: Category) => {
    trackClick("category_click", { categoryId: category.id, categoryName: category.name });
    navigate(`/category/${category.slug}`);
  };

  const handleReferralClick = () => {
    trackClick("referral_click", { username });
    navigate("/auth?referrer=" + username);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ url, title: `Check out ${profile?.full_name || username}'s link` });
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: "Share link copied to clipboard" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!profile || !bioLink) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-foreground">Bio link not found</h2>
          <p className="text-muted-foreground mb-4">This user hasn't set up their bio link yet.</p>
        </div>
      </div>
    );
  }

  const themeProps = {
    profile: {
      avatar_url: profile.avatar_url,
      full_name: profile.full_name,
      username: profile.username,
    },
    bioLink,
    socialLinks: socialLinks.map(link => ({ 
      id: link.platform, 
      platform: link.platform, 
      url: link.url 
    })),
    categories: categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      image_url: cat.image_url,
    })),
    onCategoryClick: (categoryId: string) => {
      const category = categories.find(c => c.id === categoryId);
      if (category) handleCategoryClick(category);
    },
    onReferralClick: handleReferralClick,
    onShare: handleShare,
  };

  const renderTheme = () => {
    const theme = bioLink.theme_template || 'gradient';
    
    // Extract props suitable for simplified themes
    const simplifiedProps = {
      bio: bioLink.bio,
      socialLinks: socialLinks.map(link => ({
        id: link.platform,
        platform: link.platform,
        url: link.url,
        display_order: 0,
        is_visible: true
      })),
      avatarUrl: profile.avatar_url,
      fullName: profile.full_name
    };
    
    switch (theme) {
      case 'minimal':
        return <MinimalTheme {...themeProps} />;
      case 'modern':
        return <ModernTheme {...themeProps} />;
      case 'professional':
        return <ProfessionalTheme {...themeProps} />;
      case 'creative':
        return <CreativeTheme {...themeProps} />;
      case 'influencer':
        return <InfluencerTheme {...themeProps} />;
      case 'classic':
        return <ClassicTheme {...themeProps} />;
      case 'dark':
        return <DarkTheme {...themeProps} />;
      case 'retro':
        return <RetroTheme {...themeProps} />;
      case 'nature':
        return <NatureTheme {...themeProps} />;
      case 'halloween':
        return <HalloweenTheme {...simplifiedProps} />;
      case 'christmas':
        return <ChristmasTheme {...simplifiedProps} />;
      case 'luxury':
        return <LuxuryTheme {...themeProps} />;
      case 'tech':
        return <TechTheme {...themeProps} />;
      case 'gaming':
        return <GamingTheme {...themeProps} />;
      case 'fashion':
        return <FashionTheme {...themeProps} />;
      case 'music':
        return <MusicTheme {...themeProps} />;
      case 'fitness':
        return <FitnessTheme {...themeProps} />;
      case 'gradient':
      default:
        return <GradientTheme {...themeProps} />;
    }
  };

  return renderTheme();
};

export default BioLinkPage;
