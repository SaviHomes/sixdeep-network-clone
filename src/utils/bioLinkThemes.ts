import { Sparkles, Briefcase, Palette } from "lucide-react";

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