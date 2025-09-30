import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface MinimalThemeProps {
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

const MinimalTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onReferralClick,
  onShare
}: MinimalThemeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || profile.username}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-border"
            />
          )}
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {profile.full_name || profile.username}
          </h1>
          <p className="text-muted-foreground">@{profile.username}</p>
        </div>

        {/* Bio */}
        {bioLink.bio && (
          <p className="text-center text-foreground mb-8 max-w-md mx-auto">
            {bioLink.bio}
          </p>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <SocialIcon platform={link.platform} className="h-6 w-6" />
              </a>
            ))}
          </div>
        )}

        {/* Join Network Button */}
        <div className="mb-8">
          <Button
            onClick={() => window.location.href = '/auth?tab=registration'}
            className="w-full"
            size="lg"
          >
            Join Our Network
          </Button>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors text-left flex items-center justify-between group"
              >
                <span className="font-medium text-foreground">{category.name}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            Create your own bio link
          </p>
          <Button variant="link" onClick={onShare}>
            Share this page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MinimalTheme;