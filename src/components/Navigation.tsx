import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/catalog" },
    { name: "Become an Affiliate", path: "/affiliate" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-xl">6</span>
            </div>
            <span className="text-2xl font-bold">sixdeep</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-primary-foreground/80 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Account Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="secondary" size="sm">
                <User className="w-4 h-4 mr-2" />
                My Account
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 hover:text-primary-foreground/80 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="secondary" size="sm" className="w-full">
                <User className="w-4 h-4 mr-2" />
                My Account
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
