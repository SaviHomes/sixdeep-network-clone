import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, ExternalLink, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SocialIcon from "@/components/SocialIcon";

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
        .select("id, bio, theme_color")
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Bio link not found</h2>
          <p className="text-muted-foreground mb-4">This user hasn't set up their bio link yet.</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Share */}
        <div className="flex justify-end mb-4">
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Profile Section */}
        <Card className="p-8 mb-6 text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="text-2xl">
              {(profile.full_name || profile.username).charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold mb-2">{profile.full_name || profile.username}</h1>
          <p className="text-muted-foreground mb-4">@{profile.username}</p>
          
          {bioLink.bio && (
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{bioLink.bio}</p>
          )}
        </Card>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-110 transition-transform"
                onClick={() => {
                  trackClick("social_click", { platform: link.platform });
                  window.open(link.url, "_blank");
                }}
              >
                <SocialIcon platform={link.platform} />
              </Button>
            ))}
          </div>
        )}

        {/* Join Network Button */}
        <Card className="p-6 mb-6 text-center bg-primary/5 border-primary/20">
          <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
          <h3 className="font-semibold mb-2">Join {profile.full_name || profile.username}'s Network</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sign up using my referral link and start earning commissions!
          </p>
          <Button onClick={handleReferralClick} className="w-full">
            Join Network
          </Button>
        </Card>

        {/* Product Categories */}
        {categories.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Shop My Favorites</h2>
            {categories.map((category) => (
              <Card
                key={category.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center gap-4">
                  {category.image_url && (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">Explore products</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Create your own bio link at SixDeep</p>
          <Button variant="link" onClick={() => navigate("/")}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BioLinkPage;
