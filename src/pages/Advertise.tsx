import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, TrendingUp, Users, Target, DollarSign, BarChart3 } from "lucide-react";

const Advertise = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                The Home of Influencer Marketing
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Connect with authentic influencers and drive real results for your brand
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/advertiser-login">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Fraud Protection Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-foreground">
                  Eliminating Click Fraud
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Digital advertising fraud is projected to cost online businesses over $170 billion by 2028. Our platform has been developed to eliminate click fraud for our advertising partners.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  We achieve this by favoring a Cost Per Acquisition (CPA) advertising model over Cost Per Click (CPC). In most cases, advertisers only pay when a sale is made.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our advertising model effectively removes the incentive for fraudulent activity, protecting your marketing budget.
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 shadow-lg">
                <Shield className="h-20 w-20 text-primary mb-6 mx-auto" />
                <h3 className="text-2xl font-bold text-center mb-4">Protected Investment</h3>
                <p className="text-center text-muted-foreground">
                  Pay only for real results with our transparent CPA model
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Transparent Results-Driven Network
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Complete visibility over your campaigns and customer interactions
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <BarChart3 className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-3 text-center">Real-Time Analytics</h3>
                  <p className="text-muted-foreground text-center">
                    Track who viewed your products and what they engaged with in real-time
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Target className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-3 text-center">Re-marketing Tools</h3>
                  <p className="text-muted-foreground text-center">
                    Reach customers who didn't checkout and recover abandoned carts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-3 text-center">Special Offers</h3>
                  <p className="text-muted-foreground text-center">
                    Incentivize customers to return with targeted promotions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Micro-Influencer Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-background rounded-lg p-8 shadow-lg">
                <Users className="h-20 w-20 text-primary mb-6 mx-auto" />
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-4">7%</h3>
                  <p className="text-muted-foreground">
                    Average engagement rate for micro-influencers on their feed posts
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6 text-foreground">
                  Higher Engagement with Micro & Nano Influencers
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  73% of people are more likely to be interested in your product when their friends talk about it, compared with 49% when promoted by celebrity influencers.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Micro-influencers with under 25K followers consistently show higher engagement rates regardless of genre or target audience.
                </p>
                <p className="text-lg text-muted-foreground">
                  Quality reigns supreme over quantity in influencer marketing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Growth Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                The Rise of Influencer Marketing
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Influencer marketing has become one of the most effective forms of digital marketing
              </p>
            </div>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-6">
                  <TrendingUp className="h-16 w-16 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-5xl font-bold text-primary mb-4">$21.1B</h3>
                  <p className="text-xl text-muted-foreground mb-4">
                    Global influencer marketing market value as of 2023
                  </p>
                  <p className="text-muted-foreground">
                    The market has more than tripled since 2019, with millions of users browsing social media daily for entertainment, inspiration, and product recommendations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join leading brands using influencer marketing to drive authentic engagement and real results
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/advertiser-login">Advertiser Login</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Advertise;
