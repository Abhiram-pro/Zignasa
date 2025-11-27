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
  { to: '#gallery', label: 'Gallery' },
  { to: '#contact', label: 'Contact' },
  //{ to: '/open-challenge', label: 'Open Challenge' },//
  { to: '/problem-statements', label: 'Problem Statements' }
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
    // If it's a route (starts with '/'), let React Router handle it
    if (id.startsWith('/')) {
      setIsMobileMenuOpen(false);
      return;
    }

    // For anchor links, check if we're on the main page or need to navigate there
    e.preventDefault();
    const currentPath = window.location.pathname;

    // If we're not on the main page, navigate to main page with the hash
    if (currentPath !== '/') {
      window.location.href = `/${id}`;
      setIsMobileMenuOpen(false);
      return;
    }

    // Otherwise, handle as anchor link for smooth scrolling on the same page
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
    <>
      {/* Main Navigation - Centered with Logo */}
      <nav
        id="navbar"
        className={cn(
          "fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out",
          "rounded-full border border-white/20 backdrop-blur-md max-w-fit",
          "top-4 md:top-4",
          isScrolled
            ? "bg-black/60 shadow-lg shadow-black/25"
            : "bg-gradient-to-r from-black/40 to-black/30"
        )}
        style={{
          top: 'max(env(safe-area-inset-top, 0px) + 1rem, 1rem)'
        }}
      >
        {/* Desktop Navigation - Logo and Links */}
        <div className="hidden md:flex items-center px-6 py-3 min-w-fit gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 pr-4 border-r border-white/20">
            <img
              src="/assets/new_images/icon.png"
              alt="ZIGNASA Logo"
              className="w-8 h-8 object-contain filter brightness-110 flex-shrink-0"
            />
            <span className="font-bold text-lg tracking-wide whitespace-nowrap bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
              ZIGNASA 2K25
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
                  "px-2 py-2 text-sm font-medium text-white/90 rounded-full transition-all duration-200 whitespace-nowrap",
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
        <div className="md:hidden flex items-center justify-between px-4 py-3 min-w-fit">
          {/* Mobile Logo and Brand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/assets/new_images/icon.png"
              alt="ZIGNASA Logo"
              className="w-6 h-6 object-contain filter brightness-110 flex-shrink-0"
            />
            <span className="font-bold text-base whitespace-nowrap bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
              ZIGNASA 2K25
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-white/10 flex-shrink-0 ml-4"
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
    </>
  );
}
