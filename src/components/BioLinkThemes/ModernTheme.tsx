import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ModernThemeProps {
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

const ModernTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onReferralClick,
  onShare
}: ModernThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-3xl mx-auto px-4 py-12">
        {/* Profile Header with Card */}
        <Card className="p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-6 mb-6">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-border shadow-md"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {profile.full_name || profile.username}
              </h1>
              <p className="text-muted-foreground">@{profile.username}</p>
            </div>
          </div>

          {bioLink.bio && (
            <p className="text-foreground/90 mb-6">
              {bioLink.bio}
            </p>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex gap-3 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-muted hover:bg-primary/10 text-foreground hover:text-primary transition-all hover:scale-110"
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
            className="w-full shadow-md"
          >
            Join Our Network
          </Button>
        </Card>

        {/* Categories Grid */}
        {categories.length > 0 && (
          <div className="grid gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group"
                onClick={() => onCategoryClick(category.id)}
              >
                <div className="flex items-center">
                  {category.image_url && (
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-lg">
                      {category.name}
                    </h3>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
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

export default ModernTheme;