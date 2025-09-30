import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook, 
  Linkedin,
  MessageCircle,
  Send,
  Music,
  Camera,
  Link as LinkIcon,
  Github,
  Twitch,
  Globe,
  LucideIcon
} from "lucide-react";

export interface SocialPlatform {
  id: string;
  name: string;
  icon: LucideIcon;
  placeholder: string;
  urlPattern?: RegExp;
  baseUrl?: string;
}

export const socialPlatforms: SocialPlatform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    placeholder: "https://instagram.com/yourusername",
    urlPattern: /instagram\.com/i,
    baseUrl: "https://instagram.com/"
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Music,
    placeholder: "https://tiktok.com/@yourusername",
    urlPattern: /tiktok\.com/i,
    baseUrl: "https://tiktok.com/@"
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    placeholder: "https://youtube.com/@yourchannel",
    urlPattern: /youtube\.com|youtu\.be/i,
    baseUrl: "https://youtube.com/@"
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: Twitter,
    placeholder: "https://twitter.com/yourusername",
    urlPattern: /twitter\.com|x\.com/i,
    baseUrl: "https://twitter.com/"
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    placeholder: "https://facebook.com/yourprofile",
    urlPattern: /facebook\.com|fb\.com/i,
    baseUrl: "https://facebook.com/"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    placeholder: "https://linkedin.com/in/yourprofile",
    urlPattern: /linkedin\.com/i,
    baseUrl: "https://linkedin.com/in/"
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: Camera,
    placeholder: "https://snapchat.com/add/yourusername",
    urlPattern: /snapchat\.com/i,
    baseUrl: "https://snapchat.com/add/"
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: LinkIcon,
    placeholder: "https://pinterest.com/yourprofile",
    urlPattern: /pinterest\.com/i,
    baseUrl: "https://pinterest.com/"
  },
  {
    id: "discord",
    name: "Discord",
    icon: MessageCircle,
    placeholder: "https://discord.gg/yourinvite",
    urlPattern: /discord\.(gg|com)/i,
    baseUrl: "https://discord.gg/"
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: Twitch,
    placeholder: "https://twitch.tv/yourchannel",
    urlPattern: /twitch\.tv/i,
    baseUrl: "https://twitch.tv/"
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    placeholder: "https://t.me/yourusername",
    urlPattern: /t\.me|telegram\.me/i,
    baseUrl: "https://t.me/"
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
    placeholder: "https://wa.me/1234567890",
    urlPattern: /wa\.me|whatsapp\.com/i,
    baseUrl: "https://wa.me/"
  },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    placeholder: "https://github.com/yourusername",
    urlPattern: /github\.com/i,
    baseUrl: "https://github.com/"
  },
  {
    id: "website",
    name: "Website",
    icon: Globe,
    placeholder: "https://yourwebsite.com",
  }
];

export const getPlatformById = (id: string): SocialPlatform | undefined => {
  return socialPlatforms.find(p => p.id === id);
};

export const getPlatformByName = (name: string): SocialPlatform | undefined => {
  return socialPlatforms.find(p => p.name.toLowerCase() === name.toLowerCase() || p.id === name.toLowerCase());
};
