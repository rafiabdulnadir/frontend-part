import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, MessageSquare, User, LogOut, Search, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  activeSection?: string;
  heroRef?: React.RefObject<HTMLDivElement>;
  exploreRef?: React.RefObject<HTMLDivElement>;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, heroRef, exploreRef }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(3);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = isAuthenticated
    ? [
        { path: "/", label: "Home", section: "home" },
        { path: "/", label: "Explore", section: "explore" },
        { path: "/dashboard", label: "Dashboard" },
       
        { path: "/profile", label: "Profile" },
      ]
    : [
        { path: "/", label: "Home", section: "home" },
        { path: "/", label: "Explore", section: "explore" },
      ];

  const isActive = (link: any) => {
    if (activeSection && link.section) return activeSection === link.section;
    return location.pathname === link.path;
  };

  const handleNavClick = (link: any) => {
    if (link.section === "home" && heroRef?.current) {
      heroRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (link.section === "explore" && exploreRef?.current) {
      exploreRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(link.path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Search className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gradient">SkillNet</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant={isActive(link) ? "default" : "ghost"}
                onClick={() => handleNavClick(link)}
              >
                {link.label}
              </Button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <motion.button className="relative rounded-lg p-2 hover:bg-secondary-hover">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs">
                      {notificationCount}
                    </span>
                  )}
                </motion.button>

                <Link to="/messages">
                  <motion.button className="rounded-lg p-2 hover:bg-secondary-hover">
                    <MessageSquare className="h-5 w-5" />
                  </motion.button>
                </Link>

                <Link to="/profile">
                  <motion.button className="rounded-lg p-2 hover:bg-secondary-hover">
                    <User className="h-5 w-5" />
                  </motion.button>
                </Link>

                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>

                <button
                  className="md:hidden rounded-lg p-2 hover:bg-secondary-hover"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  variant={isActive(link) ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleNavClick(link)}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
