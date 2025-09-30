import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Zap, TrendingUp, Users } from "lucide-react";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seoData";
import { generateBreadcrumbSchema } from "@/utils/seo";

const Affiliate = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Free to Join",
      description: "No signup fees, no monthly costs. Start earning immediately.",
    },
    {
      icon: TrendingUp,
      title: "Passive Income",
      description: "Earn commissions 6 levels deep from your referral network.",
    },
    {
      icon: Users,
      title: "Network Growth",
      description: "Your network grows exponentially as referrals bring in more members.",
    },
    {
      icon: CheckCircle,
      title: "Proven System",
      description: "Join thousands of successful affiliates already earning.",
    },
  ];

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Become an Affiliate", url: "/affiliate" }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={pageSEO.affiliate.title}
        description={pageSEO.affiliate.description}
        keywords={pageSEO.affiliate.keywords}
        structuredData={breadcrumbs}
      />
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become an Affiliate
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Turn your social media presence into a profitable business. 
              Join our affiliate program and start earning today!
            </p>
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Join Sixdeep?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How Much Can You Earn */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                How Much Can You Earn?
              </h2>
              <Card className="bg-card">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <span className="text-lg font-medium">10 Direct Referrals</span>
                      <span className="text-2xl font-bold text-primary">$100+/month</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b">
                      <span className="text-lg font-medium">50 Network Members</span>
                      <span className="text-2xl font-bold text-primary">$500+/month</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b">
                      <span className="text-lg font-medium">200 Network Members</span>
                      <span className="text-2xl font-bold text-primary">$2,000+/month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">1000+ Network Members</span>
                      <span className="text-2xl font-bold text-primary">$10,000+/month</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">
                    *Earnings vary based on network activity and product purchases
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of influencers and content creators already building 
              their passive income with Sixdeep
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Affiliate;
