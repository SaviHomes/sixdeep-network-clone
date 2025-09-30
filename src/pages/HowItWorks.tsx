import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Share2, Users, DollarSign, TrendingUp, Award } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up Free",
      description: "Create your account and get your unique referral link instantly",
    },
    {
      icon: Share2,
      title: "Share Your Link",
      description: "Share your link on social media, blogs, or with your network",
    },
    {
      icon: Users,
      title: "Build Your Network",
      description: "Earn from 6 levels deep as your referrals grow their networks",
    },
    {
      icon: DollarSign,
      title: "Earn Commissions",
      description: "Get paid when anyone in your 6-level network makes a purchase",
    },
    {
      icon: TrendingUp,
      title: "Watch It Grow",
      description: "Your earnings compound as your network expands exponentially",
    },
    {
      icon: Award,
      title: "Unlock Bonuses",
      description: "Reach milestones to unlock special bonuses and higher commission rates",
    },
  ];

  const levels = [
    { level: 1, rate: "10%", color: "bg-red-500" },
    { level: 2, rate: "8%", color: "bg-orange-500" },
    { level: 3, rate: "6%", color: "bg-yellow-500" },
    { level: 4, rate: "4%", color: "bg-green-500" },
    { level: 5, rate: "2%", color: "bg-blue-500" },
    { level: 6, rate: "1%", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How SixDeep Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build your affiliate network and earn commissions 6 levels deep. 
            The more your network grows, the more you earn!
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Commission Structure */}
        <div className="bg-card rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            6-Level Commission Structure
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Earn commissions from purchases made by people in your network, up to 6 levels deep
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {levels.map((item) => (
              <div key={item.level} className="text-center">
                <div className={`${item.color} text-white rounded-lg p-6 mb-2`}>
                  <div className="text-sm font-medium mb-1">Level {item.level}</div>
                  <div className="text-2xl font-bold">{item.rate}</div>
                </div>
                <p className="text-xs text-muted-foreground">Commission</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Real Example
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg">
              <strong>You refer Sarah</strong> (Level 1) → She buys a $100 product → You earn <strong className="text-primary">$10</strong>
            </p>
            <p className="text-lg">
              <strong>Sarah refers Mike</strong> (Level 2) → He buys a $100 product → You earn <strong className="text-primary">$8</strong>
            </p>
            <p className="text-lg">
              <strong>Mike refers Emma</strong> (Level 3) → She buys a $100 product → You earn <strong className="text-primary">$6</strong>
            </p>
            <p className="text-lg font-semibold text-primary mt-6">
              Total earnings from just 3 people: $24 → And this continues through 6 levels!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
