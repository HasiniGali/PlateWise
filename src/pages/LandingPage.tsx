import { Link } from 'react-router-dom';
import { HeroSection } from '../features/landing/HeroSection';
import { BudgetCalculatorWidget } from '../features/landing/BudgetCalculatorWidget';
import { FeaturedMealsSection } from '../features/landing/FeaturedMealsSection';
import { HowItWorksSection } from '../features/landing/HowItWorksSection';
import { RecommendationPreviewWidget } from '../features/landing/RecommendationPreviewWidget';
import { Button } from '../components/ui/Button';
import { SparklesIcon, ArrowRightIcon } from '../components/ui/Icons';

export function LandingPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Interactive Budget Calculator */}
      <BudgetCalculatorWidget />

      {/* 3. Featured Student Meals with Filters */}
      <FeaturedMealsSection />

      {/* 4. How It Works (3 Steps) */}
      <HowItWorksSection />

      {/* 5. Live Explainable Recommendation Preview */}
      <RecommendationPreviewWidget />

      {/* 6. Campus Call to Action Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600/20 via-primary/15 to-bg-card border border-primary/30 p-8 sm:p-12 text-center space-y-5">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Stop guessing what to eat or how much to spend.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Join thousands of college students planning quick hostel meals, balancing monthly budgets, and eating healthier every day.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link to="/recommendations">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<SparklesIcon size={18} />}
              rightIcon={<ArrowRightIcon size={18} />}
            >
              Get Your First Recommendation
            </Button>
          </Link>
          <Link to="/budget">
            <Button variant="secondary" size="lg">
              Set Up Food Budget
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
