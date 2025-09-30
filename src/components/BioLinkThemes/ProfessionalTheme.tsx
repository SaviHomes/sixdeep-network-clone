import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProfessionalThemeProps {
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

const ProfessionalTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onReferralClick,
  onShare
}: ProfessionalThemeProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Bar */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="w-32 h-32 rounded-lg object-cover border-4 border-primary-foreground/20 shadow-2xl"
              />
            )}
            <div className="flex-1 text-center md:text-left">
              <Badge variant="secondary" className="mb-3">Premium Profile</Badge>
              <h1 className="text-4xl font-bold mb-2">
                {profile.full_name || profile.username}
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-4">
                @{profile.username}
              </p>
              {bioLink.bio && (
                <p className="text-primary-foreground/90 max-w-2xl">
                  {bioLink.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Social Links Bar */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mb-12 pb-12 border-b border-border">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 text-foreground transition-all"
              >
                <SocialIcon platform={link.platform} className="h-6 w-6" />
              </a>
            ))}
          </div>
        )}

        {/* Join Network CTA */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Join Our Professional Network
          </h2>
          <Button
            onClick={onReferralClick}
            size="lg"
            className="px-12"
          >
            Get Started
          </Button>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Our Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryClick(category.id)}
                  className="p-6 border-2 border-border rounded-lg hover:border-primary hover:shadow-lg transition-all text-left group bg-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  {category.image_url && (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-md mt-3"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border">
          <Button variant="link" onClick={onShare}>
            Share this profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTheme;