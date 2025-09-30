import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Build Your Network",
      description: "Grow your affiliate network and earn from 6 levels deep",
    },
    {
      icon: TrendingUp,
      title: "Passive Income",
      description: "Earn commissions automatically as your network grows",
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "Secure, reliable, and proven by thousands of affiliates",
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get your unique link and start sharing in minutes",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 to-slate-700/70" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              The Home of Affiliate Marketing
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
              Turn your influence into income. Join the platform where content creators 
              and influencers build sustainable passive income streams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Why Choose Sixdeep?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Are You a Content Creator?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of influencers on TikTok, Instagram, YouTube, and more 
              who are already earning with Sixdeep
            </p>
            <Link to="/affiliate">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Become an Affiliate
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-xl text-muted-foreground">Active Affiliates</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">$2M+</div>
                <div className="text-xl text-muted-foreground">Commissions Paid</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">6 Levels</div>
                <div className="text-xl text-muted-foreground">Deep Network</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
