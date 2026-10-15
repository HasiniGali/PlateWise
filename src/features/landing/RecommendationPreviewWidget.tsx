import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSmartRecommendations } from '../../api/recommendations';
import { Recommendation, DietaryPreference, NutritionalGoal } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { RecipeImage } from '../../components/ui/RecipeImage';
import { Skeleton } from '../../components/ui/Skeleton';
import { SparklesIcon, ArrowRightIcon } from '../../components/ui/Icons';
import { formatINR } from '../../lib/currency';

export function RecommendationPreviewWidget() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [budget, setBudget] = useState<number>(150);
  const [diet, setDiet] = useState<DietaryPreference | 'all'>('veg');
  const [goal, setGoal] = useState<NutritionalGoal>('balanced');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getSmartRecommendations({
      maxBudgetINR: budget,
      preferences: {
        dietaryPreference: diet === 'all' ? undefined : diet,
        nutritionalGoal: goal,
      },
    })
      .then((data) => {
        if (!isMounted) return;
        const filtered = diet === 'all' ? data : data.filter((r) => r.recipe.dietaryTag === diet);
        setRecommendations(filtered.length > 0 ? filtered : data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [budget, diet, goal]);

  const topPick = recommendations[0];

  return (
    <section className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-default/60 pb-5">
        <div>
          <Badge variant="primary" size="sm" className="mb-2">
            Deterministic Rule-Based Engine
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Smart Meal Recommendations
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-1">
            Real transparent scoring that calculates budget suitability, nutritional targets, and ease of hostel cooking.
          </p>
        </div>

        <Link to="/recommendations">
          <Button
            variant="primary"
            size="sm"
            rightIcon={<ArrowRightIcon size={14} />}
            className="text-xs font-bold px-4 py-2"
          >
            Open Full Engine
          </Button>
        </Link>
      </div>

      <Card padding="lg" className="space-y-6 bg-white border-border-default shadow-xs">
        {/* Interactive Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
          {/* Budget Presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-bold uppercase tracking-wider font-heading">
              Budget:
            </span>
            {[100, 150, 200].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  budget === b
                    ? 'bg-pastel-peach text-text-primary border border-[#F2BA9A] shadow-xs'
                    : 'bg-bg-surface text-text-secondary hover:text-text-primary'
                }`}
              >
                {formatINR(b)}
              </button>
            ))}
          </div>

          {/* Diet Filter Chips */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted font-bold uppercase tracking-wider font-heading mr-1">
              Diet:
            </span>
            {(['all', 'veg', 'egg', 'non-veg'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDiet(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  diet === d
                    ? 'bg-pastel-peach text-text-primary font-bold border border-[#F2BA9A] shadow-xs'
                    : 'bg-bg-surface text-text-secondary hover:text-text-primary'
                }`}
              >
                {d === 'all' ? 'All Diets' : d.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Nutritional Goal Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-bold uppercase tracking-wider font-heading">
              Goal:
            </span>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as NutritionalGoal)}
              className="bg-bg-surface border border-border-default rounded-xl px-3 py-1.5 text-xs font-semibold text-text-primary cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="balanced">Balanced Student Fuel</option>
              <option value="high-protein">High Protein (Fitness)</option>
              <option value="budget-friendly">Ultra Budget-Friendly</option>
              <option value="quick-and-easy">Under 15 Mins</option>
            </select>
          </div>
        </div>

        {/* Live Recommendation Output */}
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="w-full h-44 rounded-2xl" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
        ) : !topPick ? (
          <div className="text-center py-8 text-text-secondary">
            No recipes matching this exact criterion. Try relaxing your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Meal Visual & Basics */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative group">
                <RecipeImage
                  slug={topPick.recipe.slug}
                  title={topPick.recipe.title}
                  emoji={topPick.recipe.imagePlaceholderEmoji}
                  imageUrl={topPick.recipe.imageUrl}
                  gradient={topPick.recipe.imagePlaceholderGradient}
                  aspectRatio="video"
                />
                <div className="absolute top-2.5 left-2.5">
                  <Badge variant={topPick.recipe.dietaryTag === 'veg' ? 'success' : 'warning'}>
                    {topPick.recipe.dietaryTag.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-primary">
                    {topPick.recipe.title}
                  </h3>
                  <span className="text-xs text-text-muted font-medium">
                    {topPick.recipe.cuisine} • {topPick.recipe.prepTimeMinutes + topPick.recipe.cookTimeMinutes} mins
                  </span>
                </div>
                <span className="font-mono font-extrabold text-2xl text-primary">
                  {formatINR(topPick.recipe.estimatedCostINR)}
                </span>
              </div>
            </div>

            {/* Score Breakdown & Explanation */}
            <div className="lg:col-span-7 space-y-4 bg-bg-surface p-5 sm:p-6 rounded-2xl border border-border-default">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-pastel-peach flex items-center justify-center font-bold text-primary shadow-2xs">
                    <SparklesIcon size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-text-primary">
                      Composite Recommendation Score
                    </h4>
                    <span className="text-[11px] text-text-muted">Multi-factor rule-based rank</span>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-pastel-peach text-text-primary border border-[#F2BA9A] font-mono font-black text-lg shadow-2xs">
                  {topPick.score}%
                </div>
              </div>

              {/* Rationale Explanation Box */}
              <div className="p-3.5 rounded-xl bg-white border border-border-default text-xs text-text-primary">
                <span className="text-primary font-bold">Why PlateWise picked this: </span>
                <span className="text-text-secondary leading-relaxed">{topPick.explanation}</span>
              </div>

              {/* Multi-criteria Metrics */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <ProgressBar
                  label="Budget Fit"
                  value={topPick.breakdown.budget}
                  max={100}
                  size="sm"
                />
                <ProgressBar
                  label="Diet Alignment"
                  value={topPick.breakdown.preference}
                  max={100}
                  size="sm"
                />
                <ProgressBar
                  label="Nutrition Value"
                  value={topPick.breakdown.nutrition}
                  max={100}
                  size="sm"
                />
                <ProgressBar
                  label="Hostel Ease"
                  value={topPick.breakdown.ingredient}
                  max={100}
                  size="sm"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Link to={`/recipes/${topPick.recipe.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={<ArrowRightIcon size={14} />}
                    className="text-primary hover:text-primary-hover font-bold text-xs"
                  >
                    View Recipe Details & Cooking Steps →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}
