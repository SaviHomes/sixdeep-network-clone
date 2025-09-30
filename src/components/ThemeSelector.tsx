import { Check, Lock, Sparkles, Eye, CreditCard } from "lucide-react";
import { bioLinkThemes, BioLinkTheme } from "@/utils/bioLinkThemes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeSelect: (themeId: string) => void;
  onPreview?: (themeId: string) => void;
}

const ThemeSelector = ({ currentTheme, onThemeSelect, onPreview }: ThemeSelectorProps) => {
  const { subscriptionStatus, session, refreshSubscription } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      toast.error("Please log in to subscribe");
      return;
    }

    setIsCheckingOut(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast.success("Opening checkout...", {
          description: "Complete your subscription to unlock premium themes"
        });
      }
    } catch (error: any) {
      toast.error("Checkout failed", {
        description: error.message || "Please try again"
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleThemeClick = (theme: BioLinkTheme) => {
    if (theme.isPremium && !subscriptionStatus.subscribed) {
      // Allow preview for premium themes
      if (onPreview) {
        onPreview(theme.id);
        toast.info(`Previewing ${theme.name}`, {
          description: "Subscribe to save this premium theme"
        });
      }
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
          {subscriptionStatus.subscribed ? (
            <Badge className="bg-green-500">Subscribed</Badge>
          ) : (
            <Badge variant="secondary">$9.99/month</Badge>
          )}
        </div>
        
        {!subscriptionStatus.subscribed && (
          <Card className="p-4 mb-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Unlock Premium Themes
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Get access to exclusive seasonal themes like Halloween and Christmas, plus all future premium designs for just $9.99/month.
                </p>
                <Button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  {isCheckingOut ? "Processing..." : "Subscribe Now"}
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        <div className="grid md:grid-cols-3 gap-4">
          {premiumThemes.map((theme) => {
            const Icon = theme.icon;
            const isActive = currentTheme === theme.id;
            const canUse = subscriptionStatus.subscribed;
            
            return (
              <Card
                key={theme.id}
                className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  isActive ? 'ring-2 ring-yellow-500' : ''
                } ${!canUse ? 'opacity-90' : ''}`}
                onClick={() => handleThemeClick(theme)}
              >
                <div className="p-6">
                  {isActive && canUse && (
                    <Badge className="absolute top-3 right-3 bg-primary">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                  
                  {!canUse && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500">
                      <Lock className="h-3 w-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${canUse ? 'bg-yellow-500/10' : 'bg-gray-500/10'}`}>
                      <Icon className={`h-5 w-5 ${canUse ? 'text-yellow-500' : 'text-gray-500'}`} />
                    </div>
                    <h4 className="font-semibold text-foreground">{theme.name}</h4>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {theme.description}
                  </p>
                  
                  <Button
                    variant={isActive && canUse ? "secondary" : "outline"}
                    size="sm"
                    className="w-full gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThemeClick(theme);
                    }}
                  >
                    {canUse ? (
                      <>
                        {isActive ? 'Currently Active' : 'Apply Theme'}
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Preview Theme
                      </>
                    )}
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
          {subscriptionStatus.subscribed ? 'Thank You for Subscribing!' : 'About Premium Themes'}
        </h4>
        <p className="text-sm text-muted-foreground">
          {subscriptionStatus.subscribed 
            ? 'You have full access to all premium themes. Enjoy exclusive designs and seasonal updates!'
            : 'Premium themes offer advanced customization, exclusive seasonal designs, and professional layouts to help you stand out. Try them in preview mode!'
          }
        </p>
        {subscriptionStatus.subscribed && subscriptionStatus.subscription_end && (
          <p className="text-xs text-muted-foreground mt-2">
            Next billing date: {new Date(subscriptionStatus.subscription_end).toLocaleDateString()}
          </p>
        )}
      </Card>
    </div>
  );
};

export default ThemeSelector;