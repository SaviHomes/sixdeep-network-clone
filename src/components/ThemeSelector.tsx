import { Check, Lock, Sparkles } from "lucide-react";
import { bioLinkThemes, BioLinkTheme } from "@/utils/bioLinkThemes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeSelect: (themeId: string) => void;
}

const ThemeSelector = ({ currentTheme, onThemeSelect }: ThemeSelectorProps) => {
  const handleThemeClick = (theme: BioLinkTheme) => {
    if (theme.isPremium) {
      toast.info("Premium themes will be available soon!", {
        description: "Stay tuned for exclusive design options."
      });
      return;
    }
    
    onThemeSelect(theme.id);
    toast.success(`${theme.name} theme applied!`);
  };

  const freeThemes = bioLinkThemes.filter(t => !t.isPremium);
  const premiumThemes = bioLinkThemes.filter(t => t.isPremium);

  return (
    <div className="space-y-8">
      {/* Free Themes Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Free Themes</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {freeThemes.map((theme) => {
            const Icon = theme.icon;
            const isActive = currentTheme === theme.id;
            
            return (
              <Card
                key={theme.id}
                className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  isActive ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleThemeClick(theme)}
              >
                <div className="p-6">
                  {isActive && (
                    <Badge className="absolute top-3 right-3 bg-primary">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{theme.name}</h4>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {theme.description}
                  </p>
                  
                  <Button
                    variant={isActive ? "secondary" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThemeClick(theme);
                    }}
                  >
                    {isActive ? 'Currently Active' : 'Apply Theme'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Premium Themes Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-foreground">Premium Themes</h3>
          <Badge variant="secondary">Coming Soon</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {premiumThemes.map((theme) => {
            const Icon = theme.icon;
            
            return (
              <Card
                key={theme.id}
                className="relative overflow-hidden cursor-pointer opacity-75 hover:opacity-100 transition-all"
                onClick={() => handleThemeClick(theme)}
              >
                <div className="p-6">
                  <Badge className="absolute top-3 right-3 bg-yellow-500">
                    <Lock className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <Icon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <h4 className="font-semibold text-foreground">{theme.name}</h4>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {theme.description}
                  </p>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThemeClick(theme);
                    }}
                  >
                    Preview Theme
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h4 className="font-semibold text-foreground mb-2">
          About Premium Themes
        </h4>
        <p className="text-sm text-muted-foreground">
          Premium themes will offer advanced customization options, exclusive designs, 
          and professional layouts to help you stand out. Stay tuned for the launch!
        </p>
      </Card>
    </div>
  );
};

export default ThemeSelector;