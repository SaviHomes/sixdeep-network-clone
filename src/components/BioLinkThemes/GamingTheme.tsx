import { ExternalLink, Trophy, Star } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface GamingThemeProps {
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

const GamingTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: GamingThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden">
      {/* RGB Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 animate-pulse blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.1),transparent_50%)]" />
      
      <div className="container max-w-3xl mx-auto px-4 py-12 relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          {profile.avatar_url && (
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-xl blur-2xl opacity-75 animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-xl animate-[spin_3s_linear_infinite]" />
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="relative w-40 h-40 rounded-xl object-cover border-4 border-black shadow-2xl"
              />
              <Trophy className="absolute -top-4 -right-4 h-12 w-12 text-yellow-400 animate-bounce" />
              <Star className="absolute -bottom-2 -left-2 h-8 w-8 text-cyan-400 animate-pulse" />
            </div>
          )}
          <h1 className="text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
            {profile.full_name || profile.username}
          </h1>
          <p className="text-cyan-400 text-xl font-bold mb-8 tracking-widest">@{profile.username}</p>

          {bioLink.bio && (
            <div className="max-w-2xl mx-auto mb-10 p-8 bg-black/60 backdrop-blur-md border-4 border-purple-500/50 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" />
              <p className="text-white text-lg font-bold leading-relaxed">
                {bioLink.bio}
              </p>
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-4 mb-10">
              {socialLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-black/60 border-2 border-purple-500/50 hover:border-cyan-400 text-white hover:scale-125 transition-all group shadow-lg hover:shadow-purple-500/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                    <SocialIcon platform={link.platform} className="h-7 w-7 relative z-10" />
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Join Button */}
          <Button
            onClick={() => window.location.href = '/auth?tab=registration'}
            size="lg"
            className="relative bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white font-black text-xl px-20 py-8 border-4 border-cyan-400/50 shadow-2xl shadow-purple-500/50 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              JOIN THE GAME
              <Trophy className="h-6 w-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="grid gap-6 animate-fade-in">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative cursor-pointer transition-all hover:scale-105"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-black/70 backdrop-blur-md border-4 border-purple-500/50 group-hover:border-cyan-400 rounded-2xl overflow-hidden transition-all">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />
                  
                  <div className="flex items-center p-8">
                    {category.image_url && (
                      <div className="w-24 h-24 rounded-xl overflow-hidden mr-6 flex-shrink-0 border-4 border-purple-500/50 group-hover:border-cyan-400 transition-all">
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 flex items-center justify-between">
                        {category.name}
                        <ExternalLink className="h-7 w-7 text-cyan-400 ml-4 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <Button 
            variant="ghost" 
            onClick={onShare} 
            className="text-purple-400 hover:text-cyan-400 font-bold border-2 border-purple-500/30 hover:border-cyan-400/50"
          >
            Share Game Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamingTheme;
