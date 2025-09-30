import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useBioLink } from "@/hooks/useBioLink";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  Users, 
  DollarSign, 
  Link2, 
  TrendingUp, 
  ExternalLink,
  Plus,
  Trash2,
  Copy,
  Check,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seoData";
import SocialPlatformSelect from "@/components/SocialPlatformSelect";
import { getPlatformById } from "@/utils/socialPlatforms";
import ThemeSelector from "@/components/ThemeSelector";
import BioLinkPreview from "@/components/BioLinkPreview";

const AffiliateDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [newSocialPlatform, setNewSocialPlatform] = useState<string>("");
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const {
    bioLink,
    socialLinks,
    selectedCategories,
    isLoading: bioLinkLoading,
    currentTheme,
    isPreviewMode,
    previewTheme,
    createBioLink,
    updateBioLink,
    addSocialLink,
    removeSocialLink,
    toggleCategory,
    updateTheme,
    previewThemeChange,
    clearPreview,
  } = useBioLink(user?.id);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchProfile();
      fetchCategories();
    }
  }, [user, isLoading, navigate]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();
    setProfile(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("display_order");
    setCategories(data || []);
  };

  const handleCreateBioLink = async () => {
    await createBioLink();
  };

  const handleUpdateBio = async (bio: string) => {
    await updateBioLink({ bio });
  };

  const handleAddSocialLink = async () => {
    if (!newSocialPlatform || !newSocialUrl.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a platform and enter URL",
        variant: "destructive",
      });
      return;
    }
    const platform = getPlatformById(newSocialPlatform);
    await addSocialLink(platform?.name || newSocialPlatform, newSocialUrl);
    setNewSocialPlatform("");
    setNewSocialUrl("");
  };

  const copyBioLink = () => {
    const bioLinkUrl = `${window.location.origin}/${profile?.username}`;
    navigator.clipboard.writeText(bioLinkUrl);
    setCopied(true);
    toast({ title: "Copied!", description: "Bio link copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const copyReferralLink = () => {
    const referralUrl = `${window.location.origin}/auth?referrer=${profile?.username}`;
    navigator.clipboard.writeText(referralUrl);
    toast({ title: "Copied!", description: "Referral link copied to clipboard" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isLoading || bioLinkLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={pageSEO.affiliateDashboard.title}
        description={pageSEO.affiliateDashboard.description}
        keywords={pageSEO.affiliateDashboard.keywords}
        noindex={true}
      />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">Track your referrals and earnings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Active referral network</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">Lifetime commissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">Current period earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="biolink" className="space-y-6">
          <TabsList>
            <TabsTrigger value="biolink">Bio Link</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>

          <TabsContent value="biolink" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    Your Referral Link
                  </CardTitle>
                  <CardDescription>Share this link to earn commissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Input
                      readOnly
                      value={profile?.username ? `${window.location.origin}/auth?referrer=${profile.username}` : "Set up your username first"}
                      className="flex-1"
                    />
                    <Button size="icon" variant="outline" onClick={copyReferralLink} disabled={!profile?.username}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest referrals and commissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">No activity yet</p>
                </CardContent>
              </Card>
            </div>

            {!bioLink ? (
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Bio Link</CardTitle>
                  <CardDescription>
                    Set up your personalized bio link page to share with your followers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleCreateBioLink}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Bio Link
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Bio Link URL</CardTitle>
                    <CardDescription>Your personal bio link page</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        readOnly
                        value={profile?.username ? `${window.location.origin}/${profile.username}` : ""}
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline" onClick={copyBioLink}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => window.open(`/${profile?.username}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Customize your bio</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Bio</Label>
                      <Textarea
                        placeholder="Tell your followers about yourself..."
                        defaultValue={bioLink.bio || ""}
                        onBlur={(e) => handleUpdateBio(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Add your social media profiles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {socialLinks.map((link) => (
                      <div key={link.id} className="flex items-center gap-2">
                        <Input value={link.platform} disabled className="w-32" />
                        <Input value={link.url} disabled className="flex-1" />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeSocialLink(link.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <div className="flex items-center gap-2">
                      <div className="w-48">
                        <SocialPlatformSelect
                          value={newSocialPlatform}
                          onValueChange={setNewSocialPlatform}
                        />
                      </div>
                      <Input
                        placeholder={getPlatformById(newSocialPlatform)?.placeholder || "Enter URL"}
                        value={newSocialUrl}
                        onChange={(e) => setNewSocialUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="icon" onClick={handleAddSocialLink}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Categories</CardTitle>
                    <CardDescription>Select categories to promote</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {categories.map((category) => (
                        <Card
                          key={category.id}
                          className={`cursor-pointer transition-all ${
                            selectedCategories.includes(category.id)
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                          onClick={() => toggleCategory(category.id)}
                        >
                          <CardContent className="p-4">
                            {category.image_url && (
                              <img
                                src={category.image_url}
                                alt={category.name}
                                className="h-24 w-full object-cover rounded-md mb-2"
                              />
                            )}
                            <h3 className="font-semibold text-sm">{category.name}</h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Theme Selector */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Bio Link Design
                  </CardTitle>
                  <CardDescription>
                    Choose a theme for your bio link page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ThemeSelector 
                    currentTheme={currentTheme}
                    onThemeSelect={updateTheme}
                    onPreview={previewThemeChange}
                    onClearPreview={clearPreview}
                    isPreviewMode={isPreviewMode}
                    previewTheme={previewTheme}
                  />
                </CardContent>
              </Card>

              {/* Live Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>
                    {isPreviewMode 
                      ? "Previewing theme - click 'Apply Theme' to save" 
                      : "See how your bio link looks"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[9/16] max-h-[600px] w-full">
                    {profile && bioLink && (
                      <BioLinkPreview
                        theme={currentTheme}
                        profile={{
                          avatar_url: profile.avatar_url,
                          full_name: profile.full_name,
                          username: profile.username
                        }}
                        bioLink={{
                          bio: bioLink.bio,
                          theme_color: bioLink.theme_color
                        }}
                        socialLinks={socialLinks}
                        categories={categories.filter(cat => 
                          selectedCategories.includes(cat.id)
                        )}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AffiliateDashboard;
