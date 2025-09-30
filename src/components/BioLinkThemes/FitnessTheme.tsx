import { ExternalLink, Zap, TrendingUp } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface FitnessThemeProps {
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

const FitnessTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: FitnessThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 relative overflow-hidden">
      {/* Dynamic Energy Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      {/* Energy Bursts */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container max-w-3xl mx-auto px-4 py-12 relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          {profile.avatar_url && (
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-2xl opacity-60 animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl" />
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="relative w-40 h-40 rounded-2xl object-cover border-4 border-white shadow-2xl"
              />
              <Zap className="absolute -top-4 -right-4 h-14 w-14 text-yellow-300 animate-bounce drop-shadow-[0_0_10px_rgba(253,224,71,1)]" />
              <TrendingUp className="absolute -bottom-3 -left-3 h-12 w-12 text-white animate-pulse" />
            </div>
          )}
          <h1 className="text-6xl font-black mb-3 text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {profile.full_name || profile.username}
          </h1>
          <p className="text-yellow-200 text-xl font-bold mb-8 tracking-wider">@{profile.username}</p>

          {bioLink.bio && (
            <div className="max-w-2xl mx-auto mb-10 p-8 bg-white/10 backdrop-blur-md border-4 border-white/40 rounded-2xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
              <p className="text-white text-xl font-bold leading-relaxed">
                {bioLink.bio}
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
                  className="p-4 rounded-2xl bg-white/20 backdrop-blur-md border-3 border-white/50 hover:border-yellow-300 hover:bg-white/30 text-white hover:scale-125 transition-all shadow-lg group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
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
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-black text-2xl px-20 py-10 border-4 border-white shadow-2xl group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="h-8 w-8 group-hover:animate-bounce" />
              START YOUR JOURNEY
              <Zap className="h-8 w-8 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }} />
            </span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all" />
          </Button>
        </div>

        {/* Motivational Quote Divider */}
        <div className="text-center my-12 px-8">
          <p className="text-white/80 text-lg font-bold italic">
            "NO PAIN, NO GAIN"
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4" />
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
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                
                <div className="relative bg-white/15 backdrop-blur-md border-4 border-white/40 rounded-2xl overflow-hidden group-hover:border-yellow-300 transition-all">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
                  
                  <div className="flex items-center p-8">
                    {category.image_url && (
                      <div className="w-24 h-24 rounded-2xl overflow-hidden mr-6 flex-shrink-0 border-4 border-white/50">
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-3xl font-black text-white flex items-center justify-between drop-shadow-lg">
                        {category.name}
                        <ExternalLink className="h-8 w-8 text-yellow-300 ml-4 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
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
            className="text-white/80 hover:text-white font-bold border-3 border-white/30 hover:border-white/60 backdrop-blur-sm"
          >
            Share Your Fitness Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FitnessTheme;
