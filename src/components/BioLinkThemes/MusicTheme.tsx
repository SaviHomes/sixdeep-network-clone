import { ExternalLink, Music2, Disc3 } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";

interface MusicThemeProps {
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

const MusicTheme = ({
  profile,
  bioLink,
  socialLinks,
  categories,
  onCategoryClick,
  onShare
}: MusicThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 relative overflow-hidden">
      {/* Sound Wave Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wLDUwIFEyNSwwIDUwLDUwIFQ3NSwxMDAgVDEwMCw1MCIgc3Ryb2tlPSJ3aGl0ZSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')]" />
      </div>
      
      {/* Floating Music Notes */}
      <Music2 className="absolute top-20 left-10 h-12 w-12 text-white/20 animate-bounce" style={{ animationDelay: '0s' }} />
      <Music2 className="absolute top-40 right-20 h-16 w-16 text-white/20 animate-bounce" style={{ animationDelay: '1s' }} />
      <Disc3 className="absolute bottom-32 right-32 h-20 w-20 text-white/10 animate-spin" style={{ animationDuration: '10s' }} />
      
      <div className="container max-w-3xl mx-auto px-4 py-12 relative z-10">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          {profile.avatar_url && (
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-full blur-3xl opacity-60 animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-full animate-[spin_3s_linear_infinite]" />
              <img
                src={profile.avatar_url}
                alt={profile.full_name || profile.username}
                className="relative w-40 h-40 rounded-full object-cover border-4 border-black shadow-2xl"
              />
              <Music2 className="absolute -top-3 -right-3 h-12 w-12 text-white animate-pulse" />
            </div>
          )}
          <h1 className="text-6xl font-black mb-3 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
            {profile.full_name || profile.username}
          </h1>
          <p className="text-pink-200 text-xl mb-8 tracking-widest">@{profile.username}</p>

          {bioLink.bio && (
            <div className="max-w-2xl mx-auto mb-10 p-8 bg-black/40 backdrop-blur-lg border-2 border-white/30 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10" />
              <p className="relative text-white text-lg leading-relaxed">
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
                  className="p-4 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white hover:bg-white/20 text-white hover:scale-110 transition-all shadow-lg"
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
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white font-black text-xl px-16 py-8 border-4 border-white/30 shadow-2xl hover:shadow-pink-500/50 group"
          >
            <span className="flex items-center gap-3">
              <Music2 className="h-6 w-6 group-hover:animate-bounce" />
              JOIN THE VIBE
              <Music2 className="h-6 w-6 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }} />
            </span>
          </Button>
        </div>

        {/* Categories - Album Style */}
        {categories.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative cursor-pointer transition-all hover:scale-105"
                onClick={() => onCategoryClick(category.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-orange-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                
                <div className="relative bg-black/40 backdrop-blur-md border-2 border-white/30 rounded-2xl overflow-hidden group-hover:border-white/60 transition-all">
                  {category.image_url && (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-bold text-white flex items-center justify-between">
                      {category.name}
                      <ExternalLink className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            className="text-white/60 hover:text-white border-2 border-white/20 hover:border-white/40"
          >
            Share the Music
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MusicTheme;
