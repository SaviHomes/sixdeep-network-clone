import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { socialPlatforms } from "@/utils/socialPlatforms";

interface SocialPlatformSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const SocialPlatformSelect = ({ value, onValueChange, disabled }: SocialPlatformSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select platform" />
      </SelectTrigger>
      <SelectContent className="bg-background z-50">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <SelectItem key={platform.id} value={platform.id}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{platform.name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SocialPlatformSelect;
