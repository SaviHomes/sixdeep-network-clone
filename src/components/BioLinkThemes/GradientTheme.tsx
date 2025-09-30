import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GradientThemeProps {
  profile: {
    avatar_url: string | null;
    full_name: string | null;
    username: string;
  };
  bioLink: {
    bio: string | null;
    theme_color?: string;
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

const GradientTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onReferralClick,
  onShare
}: GradientThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container max-w-2xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <Card className="p-8 mb-8 backdrop-blur-sm bg-card/80 animate-fade-in">
          <div className="text-center">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20 shadow-lg"
              />
            )}
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {profile.full_name || profile.username}
            </h1>
            <p className="text-muted-foreground mb-4">@{profile.username}</p>

            {bioLink.bio && (
              <p className="text-foreground/90 max-w-md mx-auto mb-6">
                {bioLink.bio}
              </p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center gap-4 mb-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-foreground hover:scale-110 transition-all"
                  >
                    <SocialIcon platform={link.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}

            {/* Join Network Button */}
            <Button
              onClick={() => window.location.href = '/auth?tab=registration'}
              size="lg"
              className="w-full max-w-xs"
            >
              Join Our Network
            </Button>
          </div>
        </Card>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:scale-105 group"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category.image_url && (
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold flex items-center justify-between">
                        {category.name}
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </div>
                  </div>
                )}
                {!category.image_url && (
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <h3 className="font-semibold text-foreground flex items-center justify-between">
                      {category.name}
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </h3>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <Button variant="ghost" onClick={onShare}>
            Share this page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GradientTheme;