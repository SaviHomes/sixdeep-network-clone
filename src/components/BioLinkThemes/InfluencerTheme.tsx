import { ExternalLink, Crown } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InfluencerThemeProps {
  profile: {
    avatar_url: string | null;
    full_name: string | null;
    username: string;
  };
  bioLink: {
    bio: string | null;
  };
  socialLinks: Array<{
    id: string;
    platform: string;
    url: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    image_url: string | null;
  }>;
  onCategoryClick: (categoryId: string) => void;
  onReferralClick: () => void;
  onShare: () => void;
}

const InfluencerTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onReferralClick,
  onShare
}: InfluencerThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Story-style Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-full p-1 animate-pulse">
              <div className="bg-background rounded-full p-1">
                {profile.avatar_url && (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || profile.username}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="w-24 h-24 rounded-full" />
            <Crown className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 fill-yellow-500" />
          </div>

          <Badge className="mb-2 bg-gradient-to-r from-pink-500 to-purple-500">
            Verified Influencer
          </Badge>
          
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {profile.full_name || profile.username}
          </h1>
          <p className="text-muted-foreground mb-3">@{profile.username}</p>

          {bioLink.bio && (
            <p className="text-foreground/80 text-sm leading-relaxed mb-6">
              {bioLink.bio}
            </p>
          )}

          {/* Story-style Social Icons */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-2 mb-6 overflow-x-auto pb-2">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 rounded-full blur-sm opacity-50" />
                    <div className="relative p-3 rounded-full bg-background border-2 border-primary/20 hover:border-primary hover:scale-110 transition-all">
                      <SocialIcon platform={link.platform} className="h-5 w-5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <Button
            onClick={onReferralClick}
            size="lg"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg"
          >
            Join My Community
          </Button>
        </div>

        {/* Instagram Story-style Categories */}
        {categories.length > 0 && (
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group cursor-pointer animate-fade-in"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  {category.image_url ? (
                    <div className="aspect-[16/9] relative">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30" />
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold text-lg">
                        {category.name}
                      </h3>
                      <ExternalLink className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            Create your influencer page
          </p>
          <Button variant="link" onClick={onShare} size="sm">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerTheme;