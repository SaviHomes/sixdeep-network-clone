import { SocialLink } from "@/hooks/useBioLink";
import SocialIcon from "../SocialIcon";

interface ChristmasThemeProps {
  bio: string | null;
  socialLinks: SocialLink[];
  avatarUrl?: string | null;
  fullName?: string | null;
}

const ChristmasTheme = ({ bio, socialLinks, avatarUrl, fullName }: ChristmasThemeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-emerald-950 relative overflow-hidden">
      {/* Falling snowflakes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 10}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <span className="text-yellow-200 text-xl">✨</span>
          </div>
        ))}
      </div>

      {/* Holly decorations */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-8 p-4 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-3xl opacity-50">🌿</span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          {avatarUrl && (
            <div className="mb-6 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                <img
                  src={avatarUrl}
                  alt={fullName || "Profile"}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-2xl"
                />
              </div>
            </div>
          )}
          
          {fullName && (
            <h1 className="text-4xl font-bold text-yellow-100 mb-2 drop-shadow-lg font-serif tracking-wider">
              {fullName}
            </h1>
          )}
          
          {bio && (
            <p className="text-green-100 text-lg max-w-md mx-auto drop-shadow-md italic">
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
                className="group block bg-gradient-to-r from-red-600/30 to-green-600/30 backdrop-blur-sm border-2 border-yellow-500/50 rounded-xl p-4 hover:from-red-500/50 hover:to-green-500/50 hover:border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50"
              >
                <div className="flex items-center justify-center gap-3">
                  <SocialIcon platform={link.platform} className="w-6 h-6 text-yellow-100 group-hover:text-white transition-colors" />
                  <span className="text-yellow-100 font-semibold text-lg group-hover:text-white transition-colors capitalize">
                    {link.platform}
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>

      <style>{`
        @keyframes snow {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(100vh) translateX(100px); opacity: 0.3; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-snow {
          animation: snow linear infinite;
          color: white;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChristmasTheme;
