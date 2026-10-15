import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import {
  MenuIcon,
  CloseIcon,
  ChefHatIcon,
  SparklesIcon,
  UserIcon,
} from '../ui/Icons';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/recipes', label: 'Discover Meals' },
    { to: '/finder', label: 'Find by Ingredients' },
    { to: '/recommendations', label: 'Smart Recommendations', highlight: true },
    { to: '/budget', label: 'Budget Planner' },
    { to: '/favorites', label: 'Favorites' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-default/70 bg-bg-base/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-pastel-peach border border-[#F2BA9A] flex items-center justify-center text-primary shadow-xs group-hover:scale-105 transition-transform">
            <ChefHatIcon size={22} className="stroke-[2.2]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-extrabold text-xl text-text-primary tracking-tight flex items-center gap-1.5">
              PlateWise
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pastel-butter text-[#6E5400] border border-[#F2DA91]">
                Student
              </span>
            </span>
            <span className="text-[11px] text-text-secondary -mt-0.5 font-medium">Smart Food & Budget</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive
                    ? 'text-primary bg-pastel-peach/40 font-semibold shadow-2xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface',
                  link.highlight && !isActive ? 'text-primary/90 font-semibold' : ''
                )}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions: Login & Recommendation CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<UserIcon size={16} />}
              className="text-xs font-semibold px-4 py-2"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/recommendations">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<SparklesIcon size={15} />}
              className="text-xs font-semibold px-4 py-2"
            >
              Get Recommendations
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link to="/login" className="sm:hidden">
            <Button variant="ghost" size="sm" aria-label="Sign in">
              <UserIcon size={18} />
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border-default bg-bg-base/98 backdrop-blur-xl px-5 pt-3 pb-6 space-y-1.5 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] flex items-center',
                  isActive
                    ? 'bg-pastel-peach/50 text-text-primary font-bold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-border-default/60 flex flex-col gap-2.5">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" size="md" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link to="/recommendations" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full justify-center">
                Get Recommendations
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
