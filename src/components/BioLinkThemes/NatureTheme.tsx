import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface NatureThemeProps {
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

const NatureTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: NatureThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
      <div className="container max-w-2xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          {profile.avatar_url && (
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-2xl" />
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-green-600/30 shadow-xl"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-2 text-green-900 dark:text-green-100">
            {profile.full_name || profile.username}
          </h1>
          <p className="text-green-700 dark:text-green-400 mb-6">@{profile.username}</p>

          {bioLink.bio && (
            <div className="max-w-md mx-auto mb-8 p-6 bg-white/50 dark:bg-green-900/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
              <p className="text-green-800 dark:text-green-200 leading-relaxed">
                {bioLink.bio}
              </p>
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-3 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-green-600/10 hover:bg-green-600/20 text-green-800 dark:text-green-200 hover:scale-110 transition-all border border-green-600/20"
                >
                  <SocialIcon platform={link.platform} className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}

          {/* Join Button */}
          <Button
            onClick={() => window.location.href = '/auth?tab=registration'}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 shadow-lg"
          >
            Join Our Community
          </Button>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 group-hover:from-green-400/20 group-hover:to-emerald-400/20 transition-all" />
                
                <div className="relative flex items-center p-6 bg-white/80 dark:bg-green-900/30 backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                  {category.image_url && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden mr-4 flex-shrink-0 border-2 border-green-600/30">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 flex items-center justify-between">
                      {category.name}
                      <ExternalLink className="h-5 w-5 text-green-600 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <Button variant="ghost" onClick={onShare} className="text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200">
            Share this page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NatureTheme;
