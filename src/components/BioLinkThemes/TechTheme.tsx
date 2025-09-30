import { ExternalLink, Zap } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface TechThemeProps {
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

const TechTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: TechThemeProps) => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container max-w-3xl mx-auto px-4 py-12 relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          {profile.avatar_url && (
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-2xl opacity-50 animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }} />
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="relative w-36 h-36 object-cover border-4 border-black"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
              />
              <Zap className="absolute -top-3 -right-3 h-10 w-10 text-cyan-400 animate-pulse" />
            </div>
          )}
          <h1 className="text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {profile.full_name || profile.username}
          </h1>
          <p className="text-cyan-400 text-sm tracking-[0.3em] mb-8 font-mono">@{profile.username}</p>

          {bioLink.bio && (
            <div className="max-w-2xl mx-auto mb-10 p-6 bg-gradient-to-br from-cyan-950/30 to-blue-950/30 backdrop-blur-sm border border-cyan-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <p className="text-cyan-100 leading-relaxed font-mono text-sm">
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
                  className="relative p-4 bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 hover:scale-110 transition-all group overflow-hidden"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <SocialIcon platform={link.platform} className="h-6 w-6 relative z-10" />
                </a>
              ))}
            </div>
          )}

          {/* Join Button */}
          <Button
            onClick={() => window.location.href = '/auth?tab=registration'}
            size="lg"
            className="relative bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold text-lg px-16 py-7 border-2 border-cyan-400/50 overflow-hidden group"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="relative z-10">CONNECT TO NETWORK</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/30 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </Button>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative cursor-pointer transition-all hover:translate-x-2"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all" style={{ clipPath: 'polygon(0 0, 98% 0, 100% 50%, 98% 100%, 0 100%)' }} />
                <div className="absolute inset-0 border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all" style={{ clipPath: 'polygon(0 0, 98% 0, 100% 50%, 98% 100%, 0 100%)' }} />
                
                <div className="relative flex items-center p-6 backdrop-blur-sm">
                  {category.image_url && (
                    <div className="w-16 h-16 overflow-hidden mr-4 flex-shrink-0 border-2 border-cyan-500/50" style={{ clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)' }}>
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-400 flex items-center justify-between font-mono">
                      {category.name}
                      <ExternalLink className="h-5 w-5 text-cyan-400 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <Button variant="ghost" onClick={onShare} className="text-cyan-400/60 hover:text-cyan-400 font-mono text-xs tracking-wider">
            [SHARE_PAGE]
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechTheme;
