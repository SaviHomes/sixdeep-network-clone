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
            How Sixdeep Works
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

        {/* Interactive Video Demonstration */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">
            Watch Your Network Grow
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how one referral can turn into exponential earnings across 6 levels
          </p>
          <div className="relative max-w-5xl mx-auto">
            <svg className="w-full h-auto" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
              {/* Level Lines */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              
              {/* You (Center/Top) */}
              <g className="animate-fade-in">
                <circle cx="500" cy="50" r="30" fill="hsl(var(--primary))" className="animate-pulse"/>
                <text x="500" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">YOU</text>
                <text x="500" y="95" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">Start Here</text>
              </g>

              {/* Level 1 - 2 people */}
              <g className="animate-fade-in" style={{animationDelay: '0.5s'}}>
                <line x1="500" y1="80" x2="350" y2="140" stroke="url(#lineGradient)" strokeWidth="2"/>
                <line x1="500" y1="80" x2="650" y2="140" stroke="url(#lineGradient)" strokeWidth="2"/>
                <circle cx="350" cy="160" r="25" fill="#EF4444" className="animate-scale-in" style={{animationDelay: '0.5s'}}/>
                <circle cx="650" cy="160" r="25" fill="#EF4444" className="animate-scale-in" style={{animationDelay: '0.5s'}}/>
                <text x="350" y="165" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">L1</text>
                <text x="650" y="165" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">L1</text>
                <text x="350" y="195" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">10%</text>
                <text x="650" y="195" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">10%</text>
              </g>

              {/* Level 2 - 4 people */}
              <g className="animate-fade-in" style={{animationDelay: '1s'}}>
                <line x1="350" y1="185" x2="250" y2="240" stroke="url(#lineGradient)" strokeWidth="2"/>
                <line x1="350" y1="185" x2="450" y2="240" stroke="url(#lineGradient)" strokeWidth="2"/>
                <line x1="650" y1="185" x2="550" y2="240" stroke="url(#lineGradient)" strokeWidth="2"/>
                <line x1="650" y1="185" x2="750" y2="240" stroke="url(#lineGradient)" strokeWidth="2"/>
                <circle cx="250" cy="260" r="22" fill="#F97316" className="animate-scale-in" style={{animationDelay: '1s'}}/>
                <circle cx="450" cy="260" r="22" fill="#F97316" className="animate-scale-in" style={{animationDelay: '1s'}}/>
                <circle cx="550" cy="260" r="22" fill="#F97316" className="animate-scale-in" style={{animationDelay: '1s'}}/>
                <circle cx="750" cy="260" r="22" fill="#F97316" className="animate-scale-in" style={{animationDelay: '1s'}}/>
                <text x="500" y="295" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">Level 2 - 8%</text>
              </g>

              {/* Level 3 - 8 people (simplified representation) */}
              <g className="animate-fade-in" style={{animationDelay: '1.5s'}}>
                {[150, 250, 350, 450, 550, 650, 750, 850].map((x, i) => (
                  <g key={i}>
                    <line x1={x > 500 ? 650 : 350} y1="285" x2={x} y2="340" stroke="url(#lineGradient)" strokeWidth="1.5"/>
                    <circle cx={x} cy="360" r="18" fill="#FCD34D" className="animate-scale-in" style={{animationDelay: '1.5s'}}/>
                  </g>
                ))}
                <text x="500" y="395" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">Level 3 - 6%</text>
              </g>

              {/* Level 4 - 16 people (dots) */}
              <g className="animate-fade-in" style={{animationDelay: '2s'}}>
                {[100, 170, 240, 310, 380, 450, 520, 590, 660, 730, 800, 870].map((x, i) => (
                  <circle key={i} cx={x} cy="450" r="14" fill="#4ADE80" className="animate-scale-in" style={{animationDelay: '2s'}}/>
                ))}
                <text x="500" y="485" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">Level 4 - 4%</text>
              </g>

              {/* Level 5 - 32 people (smaller dots) */}
              <g className="animate-fade-in" style={{animationDelay: '2.5s'}}>
                {Array.from({length: 16}).map((_, i) => (
                  <circle key={i} cx={80 + i * 60} cy="520" r="10" fill="#60A5FA" className="animate-scale-in" style={{animationDelay: '2.5s'}}/>
                ))}
                <text x="500" y="555" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">Level 5 - 2%</text>
              </g>

              {/* Level 6 - 64+ people (tiny dots) */}
              <g className="animate-fade-in" style={{animationDelay: '3s'}}>
                {Array.from({length: 20}).map((_, i) => (
                  <circle key={i} cx={50 + i * 48} cy="575" r="7" fill="#A78BFA" className="animate-scale-in" style={{animationDelay: '3s'}}/>
                ))}
                <text x="500" y="600" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">Level 6 - 1%</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Example Calculations */}
        <div className="bg-card rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Real Example: Watch Your Earnings Multiply
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg animate-fade-in">
              <p className="text-lg">
                <strong>You refer Sarah</strong> (Level 1) → $100 purchase
              </p>
              <p className="text-2xl font-bold text-primary">+$10</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
              <p className="text-lg">
                <strong>Sarah refers Mike</strong> (Level 2) → $100 purchase
              </p>
              <p className="text-2xl font-bold text-primary">+$8</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg animate-fade-in" style={{animationDelay: '0.4s'}}>
              <p className="text-lg">
                <strong>Mike refers Emma</strong> (Level 3) → $100 purchase
              </p>
              <p className="text-2xl font-bold text-primary">+$6</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg animate-fade-in" style={{animationDelay: '0.6s'}}>
              <p className="text-lg">
                <strong>Emma's network grows</strong> (Levels 4-6)
              </p>
              <p className="text-2xl font-bold text-primary">+$7</p>
            </div>
            <div className="border-t-2 border-primary pt-4 mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">
                  Total Passive Earnings:
                </p>
                <p className="text-4xl font-bold text-primary animate-pulse">$31+</p>
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                From just ONE initial referral → Imagine with 10, 50, or 100 referrals!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
