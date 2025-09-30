import { ExternalLink, Sparkles } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface LuxuryThemeProps {
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

const LuxuryTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: LuxuryThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.05),transparent_50%)]" />
      
      <div className="container max-w-3xl mx-auto px-6 py-16 relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-16 animate-fade-in">
          {profile.avatar_url && (
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full" />
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="relative w-36 h-36 rounded-full object-cover border-4 border-slate-900 shadow-2xl"
              />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
          )}
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
            {profile.full_name || profile.username}
          </h1>
          <p className="text-amber-400/70 text-lg mb-8 tracking-wider">@{profile.username}</p>

          {bioLink.bio && (
            <div className="max-w-2xl mx-auto mb-10 p-8 bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-yellow-400/20">
              <p className="text-gray-200 text-lg leading-relaxed italic">
                "{bioLink.bio}"
              </p>
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-4 mb-10">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-gradient-to-br from-yellow-400/10 to-amber-600/10 border border-yellow-400/30 hover:border-yellow-400 text-yellow-400 hover:scale-110 transition-all hover:shadow-lg hover:shadow-yellow-400/30"
                >
                  <SocialIcon platform={link.platform} className="h-6 w-6" />
                </a>
              ))}
            </div>
          )}

          {/* Join Button */}
          <Button
            onClick={() => window.location.href = '/auth?tab=registration'}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black font-bold text-lg px-16 py-7 shadow-2xl shadow-yellow-400/30 border-2 border-yellow-300/20"
          >
            Join Exclusive Circle
          </Button>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent w-full max-w-md" />
          <Sparkles className="mx-4 h-5 w-5 text-yellow-400" />
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent w-full max-w-md" />
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all hover:scale-[1.02]"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-amber-600/5 group-hover:from-yellow-400/10 group-hover:to-amber-600/10 transition-all" />
                <div className="absolute inset-0 border border-yellow-400/20 group-hover:border-yellow-400/40 rounded-2xl transition-all" />
                
                <div className="relative flex items-center p-8 backdrop-blur-sm">
                  {category.image_url && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden mr-6 flex-shrink-0 border-2 border-yellow-400/30">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif text-yellow-400 flex items-center justify-between" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {category.name}
                      <ExternalLink className="h-6 w-6 text-yellow-400 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-yellow-400/20">
          <Button variant="ghost" onClick={onShare} className="text-yellow-400/60 hover:text-yellow-400">
            Share this exclusive page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LuxuryTheme;
