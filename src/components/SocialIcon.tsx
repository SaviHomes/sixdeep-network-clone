import { ExternalLink } from "lucide-react";
import { getPlatformByName } from "@/utils/socialPlatforms";

interface SocialIconProps {
  platform: string;
  className?: string;
}

const SocialIcon = ({ platform, className = "h-5 w-5" }: SocialIconProps) => {
  const platformData = getPlatformByName(platform);
  
  if (!platformData) {
    return <ExternalLink className={className} />;
  }
  
  const Icon = platformData.icon;
  return <Icon className={className} />;
};

export default SocialIcon;
