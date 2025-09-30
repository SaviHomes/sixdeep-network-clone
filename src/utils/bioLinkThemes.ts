import { Sparkles, Briefcase, Palette, BookOpen, Moon, Radio, Leaf, Crown, Cpu, Gamepad2, Shirt, Music, Dumbbell, Skull, Snowflake } from "lucide-react";

export interface BioLinkTheme {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  icon: typeof Sparkles;
  previewImage?: string;
  category: 'free' | 'premium';
}

export const bioLinkThemes: BioLinkTheme[] = [
  // Free Themes
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Modern design with smooth gradients and cards',
    isPremium: false,
    icon: Sparkles,
    category: 'free'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design with maximum clarity',
    isPremium: false,
    icon: Sparkles,
    category: 'free'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Card-based layout with smooth animations',
    isPremium: false,
    icon: Sparkles,
    category: 'free'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless design with elegant serif typography',
    isPremium: false,
    icon: BookOpen,
    category: 'free'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Sleek dark background with neon accent highlights',
    isPremium: false,
    icon: Moon,
    category: 'free'
  },
  {
    id: 'retro',
    name: 'Retro',
    description: 'Nostalgic 80s-90s design with bold vibrant colors',
    isPremium: false,
    icon: Radio,
    category: 'free'
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Organic design with earthy tones and natural feel',
    isPremium: false,
    icon: Leaf,
    category: 'free'
  },
  // Premium Themes
  {
    id: 'halloween',
    name: 'Halloween',
    description: 'Spooky theme with floating pumpkins, bats, and eerie animations',
    isPremium: true,
    icon: Skull,
    category: 'premium'
  },
  {
    id: 'christmas',
    name: 'Christmas',
    description: 'Festive theme with falling snow, twinkling stars, and holiday cheer',
    isPremium: true,
    icon: Snowflake,
    category: 'premium'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Business-focused design with sophisticated layout',
    isPremium: true,
    icon: Briefcase,
    category: 'premium'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic design with unique visual elements',
    isPremium: true,
    icon: Palette,
    category: 'premium'
  },
  {
    id: 'influencer',
    name: 'Influencer',
    description: 'Instagram-inspired design with story highlights',
    isPremium: true,
    icon: Sparkles,
    category: 'premium'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium elegant design with gold accents and animations',
    isPremium: true,
    icon: Crown,
    category: 'premium'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Futuristic design with glowing effects and cyber aesthetics',
    isPremium: true,
    icon: Cpu,
    category: 'premium'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Dynamic gaming design with RGB effects and bold graphics',
    isPremium: true,
    icon: Gamepad2,
    category: 'premium'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Stylish magazine-inspired layout with editorial flair',
    isPremium: true,
    icon: Shirt,
    category: 'premium'
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Audio-focused design with wave patterns and vibrant colors',
    isPremium: true,
    icon: Music,
    category: 'premium'
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Energetic design with motivational elements and bold energy',
    isPremium: true,
    icon: Dumbbell,
    category: 'premium'
  }
];

export const getThemeById = (id: string): BioLinkTheme | undefined => {
  return bioLinkThemes.find(theme => theme.id === id);
};

export const getFreeThemes = (): BioLinkTheme[] => {
  return bioLinkThemes.filter(theme => !theme.isPremium);
};

export const getPremiumThemes = (): BioLinkTheme[] => {
  return bioLinkThemes.filter(theme => theme.isPremium);
};