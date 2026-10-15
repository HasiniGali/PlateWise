import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBudgetSummary } from '../api/expenses';
import { getFeaturedRecipes } from '../api/recipes';
import { getCurrentUser } from '../api/auth';
import { BudgetSummary, Recipe, User } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { RecipeImage } from '../components/ui/RecipeImage';
import { SparklesIcon, PlusIcon } from '../components/ui/Icons';
import { formatINR } from '../lib/currency';

export function DashboardPage() {
  const [summary, setSummary] = useState<BudgetSummary | null>(null);
  const [featured, setFeatured] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    Promise.all([getBudgetSummary(), getFeaturedRecipes(3), getCurrentUser()]).then(
      ([bSummary, feat, u]) => {
        setSummary(bSummary);
        setFeatured(feat);
        setUser(u);
      }
    );
  }, []);

  return (
    <div className="space-y-8">
      {/* Student Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
            Welcome back, {user ? user.name.split(' ')[0] : 'Student'}! 👋
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Here is your daily hostel meal spending and suggested options for today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/budget">
            <Button variant="primary" size="sm" leftIcon={<PlusIcon size={16} />}>
              Add Expense
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md" className="space-y-1">
            <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">
              Today's Spent
            </span>
            <div className="text-2xl font-heading font-extrabold text-text-primary">
              {formatINR(summary.dailySpentINR)}
            </div>
            <p className="text-xs text-text-secondary">
              Budget: {formatINR(summary.dailyBudgetINR)}
            </p>
          </Card>

          <Card padding="md" className="space-y-1">
            <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">
              Today's Remaining
            </span>
            <div className="text-2xl font-heading font-extrabold text-accent-emerald">
              {formatINR(summary.dailyRemainingINR)}
            </div>
            <p className="text-xs text-text-secondary">Available for dinner</p>
          </Card>

          <Card padding="md" className="space-y-1">
            <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">
              Weekly Spent
            </span>
            <div className="text-2xl font-heading font-extrabold text-text-primary">
              {formatINR(summary.weeklySpentINR)}
            </div>
            <p className="text-xs text-text-secondary">
              Budget: {formatINR(summary.weeklyBudgetINR)}
            </p>
          </Card>

          <Card padding="md" className="space-y-1">
            <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">
              Weekly Remaining
            </span>
            <div className="text-2xl font-heading font-extrabold text-primary">
              {formatINR(summary.weeklyRemainingINR)}
            </div>
            <p className="text-xs text-text-secondary">Safe through weekend</p>
          </Card>
        </div>
      )}

      {/* Daily Progress Visual */}
      {summary && (
        <Card padding="md" className="space-y-3">
          <ProgressBar
            label="Daily Meal Budget Utilization"
            value={summary.dailySpentINR}
            max={summary.dailyBudgetINR}
            sublabel={`${formatINR(summary.dailySpentINR)} of ${formatINR(summary.dailyBudgetINR)}`}
            size="lg"
          />
        </Card>
      )}

      {/* Quick Meal Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2">
            <SparklesIcon size={18} className="text-primary" /> Recommended for Today
          </h2>
          <Link to="/recommendations" className="text-xs text-primary font-semibold hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="group block">
              <Card hoverEffect padding="sm" className="space-y-2">
                <RecipeImage
                  slug={recipe.slug}
                  title={recipe.title}
                  emoji={recipe.imagePlaceholderEmoji}
                  gradient={recipe.imagePlaceholderGradient}
                />
                <div className="p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-text-primary group-hover:text-primary transition-colors">
                      {recipe.title}
                    </span>
                    <span className="font-mono font-bold text-xs text-primary">
                      {formatINR(recipe.estimatedCostINR)}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins • {recipe.cuisine}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
