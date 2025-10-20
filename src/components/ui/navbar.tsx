import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: '#hero', label: 'Home' },
  { to: '#about', label: 'About' },
  { to: '#zignasa2k23', label: 'Zignasa2K23' },
  { to: '#gallery', label: 'Gallery' },
  { to: '#acheivements', label: 'Achievements' },
  { to: '#contact', label: 'Contact' },
  { to: '#domains', label: 'Register Now' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id) as HTMLElement | null;
    if (!target) return;
    
    const header = document.querySelector('#navbar') as HTMLElement | null;
    const offset = (header?.offsetHeight ?? 80) + 8;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({ top, behavior: 'smooth' });
    window.location.hash = id;
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out",
        "rounded-full border border-white/20 backdrop-blur-md",
        isScrolled 
          ? "bg-black/60 shadow-lg shadow-black/25" 
          : "bg-gradient-to-r from-black/40 to-black/30"
      )}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-6 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img 
            src="/assets/img/hero-bg-light.png" 
            alt="ZIGNASA Logo" 
            className="w-8 h-8 object-contain filter brightness-110"
          />
          <span className="text-white font-bold text-lg tracking-wide whitespace-nowrap">
            ZIGNASA <span className="text-cyan-400">2K25</span>
          </span>
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={(e) => handleNavClick(e, item.to)}
              className={cn(
                "px-4 py-2 text-sm font-medium text-white/90 rounded-full transition-all duration-200 whitespace-nowrap",
                "hover:bg-white/10 hover:text-white hover:shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-white/20"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        {/* Mobile Logo and Brand */}
        <div className="flex items-center gap-2">
          <img 
            src="/assets/img/hero-bg-light.png" 
            alt="ZIGNASA Logo" 
            className="w-6 h-6 object-contain filter brightness-110"
          />
          <span className="text-white font-bold text-base whitespace-nowrap">
            ZIGNASA <span className="text-cyan-400">2K25</span>
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:bg-white/10"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => handleNavClick(e, item.to)}
                className={cn(
                  "px-4 py-3 text-sm font-medium text-white/90 rounded-lg transition-all duration-200",
                  "hover:bg-white/10 hover:text-white",
                  "focus:outline-none focus:ring-2 focus:ring-white/20"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
