import { Link } from "react-router-dom";
import { Menu, X, User, Shield, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/sixdeep-logo.webp";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, isAdvertiser, isAffiliate, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Sixdeep Logo" className="h-10 w-auto" />
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
            
            {/* Advertise with us dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-primary-foreground hover:text-primary-foreground/80 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent font-medium text-base">
                    Advertise with us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-popover z-50">
                    <ul className="w-48 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/advertise"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-popover-foreground"
                          >
                            <div className="text-sm font-medium leading-none">About Advertising</div>
                            <p className="line-clamp-2 text-sm leading-snug opacity-80">
                              Learn about our platform
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/advertiser-register"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-popover-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Register as Advertiser</div>
                            <p className="line-clamp-2 text-sm leading-snug opacity-80">
                              Sign up to advertise
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/advertiser-login"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-popover-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Advertiser Login</div>
                            <p className="line-clamp-2 text-sm leading-snug opacity-80">
                              Access your dashboard
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/affiliate"
              className="hover:text-primary-foreground/80 transition-colors font-medium"
            >
              Become an Affiliate
            </Link>
          </div>

          {/* Account Button / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <Link to="/auth">
                <Button variant="secondary" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  My Account
                </Button>
              </Link>
            ) : isAdmin ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center cursor-pointer">
                      <Shield className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isAdvertiser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Advertiser
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/advertiser-dashboard" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isAffiliate ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Affiliate
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/affiliate-dashboard" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background z-50">
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
            
            {/* Advertise with us mobile */}
            <div className="py-2">
              <p className="font-medium text-primary-foreground/80 mb-2">Advertise with us</p>
              <Link
                to="/advertise"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block pl-4 py-2 hover:text-primary-foreground/80 transition-colors"
              >
                About Advertising
              </Link>
              <Link
                to="/advertiser-register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block pl-4 py-2 hover:text-primary-foreground/80 transition-colors"
              >
                Register as Advertiser
              </Link>
              <Link
                to="/advertiser-login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block pl-4 py-2 hover:text-primary-foreground/80 transition-colors"
              >
                Advertiser Login
              </Link>
            </div>

            <Link
              to="/affiliate"
              className="block py-2 hover:text-primary-foreground/80 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Become an Affiliate
            </Link>
            {!user ? (
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  My Account
                </Button>
              </Link>
            ) : isAdmin ? (
              <>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : isAdvertiser ? (
              <>
                <Link to="/advertiser-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Advertiser Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : isAffiliate ? (
              <>
                <Link to="/affiliate-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Affiliate Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
