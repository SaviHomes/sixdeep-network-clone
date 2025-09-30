import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface ClassicThemeProps {
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

const ClassicTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: ClassicThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 dark:from-stone-900 dark:to-stone-950">
      <div className="container max-w-3xl mx-auto px-6 py-16">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || profile.username}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-amber-700/30 shadow-2xl"
            />
          )}
          <h1 className="text-5xl font-serif mb-3 text-stone-900 dark:text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
            {profile.full_name || profile.username}
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 mb-6 italic">@{profile.username}</p>

          {bioLink.bio && (
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
                {bioLink.bio}
              </p>
            </div>
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
                  className="p-3 rounded-full bg-amber-700/10 hover:bg-amber-700/20 text-stone-800 dark:text-stone-200 hover:scale-110 transition-all"
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
            className="px-12 py-6 text-lg bg-amber-700 hover:bg-amber-800 text-white shadow-lg"
          >
            Join Our Circle
          </Button>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center my-12">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent w-full max-w-md" />
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="bg-white dark:bg-stone-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 border border-amber-700/20"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center p-6">
                  {category.image_url && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden mr-6 flex-shrink-0">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif text-stone-900 dark:text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {category.name}
                    </h3>
                  </div>
                  <ExternalLink className="h-5 w-5 text-amber-700 ml-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-amber-700/20">
          <Button variant="ghost" onClick={onShare} className="text-stone-600 dark:text-stone-400">
            Share this page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassicTheme;
