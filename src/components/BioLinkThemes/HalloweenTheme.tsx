import { SocialLink } from "@/hooks/useBioLink";
import SocialIcon from "../SocialIcon";

interface HalloweenThemeProps {
  bio: string | null;
  socialLinks: SocialLink[];
  avatarUrl?: string | null;
  fullName?: string | null;
}

const HalloweenTheme = ({ bio, socialLinks, avatarUrl, fullName }: HalloweenThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated pumpkins floating */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          >
            <span className="text-4xl opacity-20">🎃</span>
          </div>
        ))}
      </div>

      {/* Animated bats */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bat"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <span className="text-2xl opacity-30">🦇</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          {avatarUrl && (
            <div className="mb-6 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <img
                  src={avatarUrl}
                  alt={fullName || "Profile"}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-2xl"
                />
              </div>
            </div>
          )}
          
          {fullName && (
            <h1 className="text-4xl font-bold text-orange-100 mb-2 drop-shadow-lg font-serif tracking-wider">
              {fullName}
            </h1>
          )}
          
          {bio && (
            <p className="text-orange-200 text-lg max-w-md mx-auto drop-shadow-md italic">
              {bio}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {socialLinks
            .filter((link) => link.is_visible)
            .sort((a, b) => a.display_order - b.display_order)
            .map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-gradient-to-r from-orange-600/30 to-purple-600/30 backdrop-blur-sm border-2 border-orange-500/50 rounded-xl p-4 hover:from-orange-500/50 hover:to-purple-500/50 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
              >
                <div className="flex items-center justify-center gap-3">
                  <SocialIcon platform={link.platform} className="w-6 h-6 text-orange-100 group-hover:text-white transition-colors" />
                  <span className="text-orange-100 font-semibold text-lg group-hover:text-white transition-colors capitalize">
                    {link.platform}
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes bat {
          0%, 100% { transform: translateX(-10px) translateY(0px); }
          50% { transform: translateX(10px) translateY(-15px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-bat {
          animation: bat 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HalloweenTheme;
