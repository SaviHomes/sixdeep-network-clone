import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface FashionThemeProps {
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

const FashionTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: FashionThemeProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="container max-w-6xl mx-auto px-6 py-16">
        {/* Magazine Header Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 animate-fade-in">
          {/* Left Column - Image */}
          <div className="relative">
            {profile.avatar_url && (
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || profile.username}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white/60 text-sm tracking-[0.3em] mb-2">FEATURED</p>
                  <h1 className="text-5xl font-light text-white tracking-tight">
                    {profile.full_name || profile.username}
                  </h1>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-400 text-sm tracking-[0.3em] mb-4">@{profile.username}</p>
            
            {bioLink.bio && (
              <div className="mb-8 border-l-2 border-black dark:border-white pl-6">
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light italic">
                  {bioLink.bio}
                </p>
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mb-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-black dark:text-white hover:scale-110 transition-all"
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
              className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-light text-lg tracking-wider py-7"
            >
              JOIN THE COLLECTIVE
            </Button>
          </div>
        </div>

        {/* Editorial Divider */}
        <div className="my-16 flex items-center justify-center">
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-full max-w-xs" />
          <span className="px-6 text-sm tracking-[0.3em] text-gray-400">COLLECTION</span>
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-full max-w-xs" />
        </div>

        {/* Categories - Magazine Grid */}
        {categories.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative cursor-pointer overflow-hidden"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category.image_url ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-3xl font-light text-white tracking-tight flex items-center justify-between">
                        {category.name}
                        <ExternalLink className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 flex items-center justify-center group-hover:border-black dark:group-hover:border-white transition-all">
                    <h3 className="text-3xl font-light text-black dark:text-white tracking-tight flex items-center gap-4">
                      {category.name}
                      <ExternalLink className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-300 dark:border-gray-700">
          <Button 
            variant="ghost" 
            onClick={onShare} 
            className="text-gray-400 hover:text-black dark:hover:text-white tracking-wider"
          >
            SHARE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FashionTheme;
