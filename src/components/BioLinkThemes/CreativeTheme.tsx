import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CreativeThemeProps {
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

const CreativeTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onReferralClick,
  onShare
}: CreativeThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
      <div className="container max-w-3xl mx-auto px-4 py-12">
        {/* Artistic Profile Header */}
        <div className="relative mb-12">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative text-center">
            {profile.avatar_url && (
              <div className="inline-block relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-lg opacity-50 animate-pulse" />
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || profile.username}
                  className="relative w-32 h-32 rounded-full mx-auto object-cover border-4 border-background shadow-2xl"
                />
              </div>
            )}
            
            <Badge className="mb-3 bg-gradient-to-r from-primary to-secondary">
              Creative Portfolio
            </Badge>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              {profile.full_name || profile.username}
            </h1>
            <p className="text-muted-foreground text-lg mb-4">@{profile.username}</p>

            {bioLink.bio && (
              <p className="text-foreground/80 max-w-md mx-auto mb-6 leading-relaxed">
                {bioLink.bio}
              </p>
            )}

            {/* Artistic Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center gap-3 mb-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-foreground hover:scale-110 transition-all shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <SocialIcon platform={link.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}

            {/* Join Button */}
            <Button
              onClick={onReferralClick}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl"
            >
              Join the Creative Network
            </Button>
          </div>
        </div>

        {/* Artistic Categories Grid */}
        {categories.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group cursor-pointer animate-fade-in"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all" />
                  
                  {category.image_url ? (
                    <div className="aspect-video relative">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30" />
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1 flex items-center justify-between">
                      {category.name}
                      <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <Button variant="ghost" onClick={onShare} className="hover:bg-primary/10">
            Share this creative page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreativeTheme;