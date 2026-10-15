import { Link } from 'react-router-dom';
import { ChefHatIcon } from '../ui/Icons';

export function Footer() {
  return (
    <footer className="w-full border-t border-border-default/80 bg-bg-surface/60 text-text-secondary text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 text-left">
          {/* Brand Info */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pastel-peach flex items-center justify-center text-primary shadow-xs">
                <ChefHatIcon size={18} />
              </div>
              <span className="font-heading font-extrabold text-lg text-text-primary">PlateWise</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              A student-first meal discovery and smart budget management experience. Cook authentic, delicious meals within your allowance.
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3.5 font-heading">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/recipes" className="hover:text-primary transition-colors">
                  Discover Meals
                </Link>
              </li>
              <li>
                <Link to="/finder" className="hover:text-primary transition-colors">
                  Find by Ingredients
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="hover:text-primary transition-colors">
                  Smart Recommendations
                </Link>
              </li>
              <li>
                <Link to="/budget" className="hover:text-primary transition-colors">
                  Daily & Weekly Budget
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Tools */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3.5 font-heading">
              Student Space
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  Personalized Dashboard
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-primary transition-colors">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-primary transition-colors">
                  Dietary & Budget Settings
                </Link>
              </li>
              <li>
                <Link to="/design" className="text-primary hover:underline transition-colors font-mono font-medium">
                  /design (Pastel UI Kit)
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Disclaimer */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3.5 font-heading">
              CSE Project
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              PlateWise is built for student food discovery. Nutrition values and budget splits are realistic estimates in Indian Rupees (₹).
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border-default/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} PlateWise. Built with React, TypeScript & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-accent-emerald font-medium">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              Pastel Lifestyle Theme Active
            </span>
            <Link to="/design" className="hover:text-text-primary transition-colors">
              UI System
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
