import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface RetroThemeProps {
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

const RetroTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: RetroThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden">
      {/* Retro Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container max-w-2xl mx-auto px-4 py-12 relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          {profile.avatar_url && (
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 rounded-lg" style={{ transform: 'rotate(2deg)' }} />
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="relative w-32 h-32 rounded-lg object-cover border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          )}
          <h1 className="text-5xl font-black mb-2 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '2rem', lineHeight: '1.5' }}>
            {profile.full_name || profile.username}
          </h1>
          <p className="text-yellow-300 text-xl font-bold mb-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">@{profile.username}</p>

          {bioLink.bio && (
            <div className="bg-black/30 backdrop-blur-sm border-4 border-white p-6 rounded-lg mx-auto max-w-md mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
              <p className="text-white text-lg font-bold">
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
                  className="p-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
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
            className="bg-cyan-400 hover:bg-cyan-300 text-black border-4 border-black font-black text-lg px-12 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
          >
            JOIN NOW!
          </Button>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="grid gap-6 animate-fade-in">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="bg-white border-4 border-black rounded-lg overflow-hidden cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center p-6 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
                  {category.image_url && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0 border-4 border-black">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-black flex items-center justify-between">
                      {category.name}
                      <ExternalLink className="h-6 w-6 ml-4" />
                    </h3>
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
            className="bg-black/30 backdrop-blur-sm text-white border-2 border-white font-bold hover:bg-black/50"
          >
            Share this page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RetroTheme;
