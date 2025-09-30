import MinimalTheme from "@/components/BioLinkThemes/MinimalTheme";
import GradientTheme from "@/components/BioLinkThemes/GradientTheme";
import ModernTheme from "@/components/BioLinkThemes/ModernTheme";
import ProfessionalTheme from "@/components/BioLinkThemes/ProfessionalTheme";
import CreativeTheme from "@/components/BioLinkThemes/CreativeTheme";
import InfluencerTheme from "@/components/BioLinkThemes/InfluencerTheme";
import ClassicTheme from "@/components/BioLinkThemes/ClassicTheme";
import DarkTheme from "@/components/BioLinkThemes/DarkTheme";
import RetroTheme from "@/components/BioLinkThemes/RetroTheme";
import NatureTheme from "@/components/BioLinkThemes/NatureTheme";
import LuxuryTheme from "@/components/BioLinkThemes/LuxuryTheme";
import TechTheme from "@/components/BioLinkThemes/TechTheme";
import GamingTheme from "@/components/BioLinkThemes/GamingTheme";
import FashionTheme from "@/components/BioLinkThemes/FashionTheme";
import MusicTheme from "@/components/BioLinkThemes/MusicTheme";
import FitnessTheme from "@/components/BioLinkThemes/FitnessTheme";
import HalloweenTheme from "@/components/BioLinkThemes/HalloweenTheme";
import ChristmasTheme from "@/components/BioLinkThemes/ChristmasTheme";
import { SocialLink } from "@/hooks/useBioLink";

interface Profile {
  avatar_url: string | null;
  full_name: string | null;
  username: string;
}

interface BioLinkData {
  bio: string | null;
  theme_color?: string;
}

interface Category {
  id: string;
  name: string;
  image_url: string | null;
}

interface BioLinkPreviewProps {
  theme: string;
  profile: Profile;
  bioLink: BioLinkData;
  socialLinks: SocialLink[];
  categories?: Category[];
}

const BioLinkPreview = ({ 
  theme, 
  profile, 
  bioLink, 
  socialLinks,
  categories = []
}: BioLinkPreviewProps) => {
  const themeProps = {
    profile: {
      avatar_url: profile.avatar_url,
      full_name: profile.full_name,
      username: profile.username,
    },
    bioLink,
    socialLinks: socialLinks
      .filter(link => link.is_visible)
      .sort((a, b) => a.display_order - b.display_order)
      .map(link => ({ 
        id: link.id,
        platform: link.platform, 
        url: link.url 
      })),
    categories: categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      image_url: cat.image_url,
    })),
    onCategoryClick: () => {},
    onReferralClick: () => {},
    onShare: () => {},
  };

  const simplifiedProps = {
    bio: bioLink.bio,
    socialLinks: socialLinks
      .filter(link => link.is_visible)
      .sort((a, b) => a.display_order - b.display_order)
      .map(link => ({
        id: link.id,
        platform: link.platform,
        url: link.url,
        display_order: link.display_order,
        is_visible: link.is_visible
      })),
    avatarUrl: profile.avatar_url,
    fullName: profile.full_name
  };

  const renderTheme = () => {
    switch (theme) {
      case 'minimal':
        return <MinimalTheme {...themeProps} />;
      case 'modern':
        return <ModernTheme {...themeProps} />;
      case 'professional':
        return <ProfessionalTheme {...themeProps} />;
      case 'creative':
        return <CreativeTheme {...themeProps} />;
      case 'influencer':
        return <InfluencerTheme {...themeProps} />;
      case 'classic':
        return <ClassicTheme {...themeProps} />;
      case 'dark':
        return <DarkTheme {...themeProps} />;
      case 'retro':
        return <RetroTheme {...themeProps} />;
      case 'nature':
        return <NatureTheme {...themeProps} />;
      case 'halloween':
        return <HalloweenTheme {...simplifiedProps} />;
      case 'christmas':
        return <ChristmasTheme {...simplifiedProps} />;
      case 'luxury':
        return <LuxuryTheme {...themeProps} />;
      case 'tech':
        return <TechTheme {...themeProps} />;
      case 'gaming':
        return <GamingTheme {...themeProps} />;
      case 'fashion':
        return <FashionTheme {...themeProps} />;
      case 'music':
        return <MusicTheme {...themeProps} />;
      case 'fitness':
        return <FitnessTheme {...themeProps} />;
      case 'gradient':
      default:
        return <GradientTheme {...themeProps} />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden rounded-lg border border-border shadow-lg">
      <div className="w-full h-full scale-[0.8] origin-top-left" style={{ width: '125%', height: '125%' }}>
        {renderTheme()}
      </div>
    </div>
  );
};

export default BioLinkPreview;
