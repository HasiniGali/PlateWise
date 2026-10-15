import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSmartRecommendations } from '../api/recommendations';
import { Recommendation } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { RecipeImage } from '../components/ui/RecipeImage';
import { Skeleton } from '../components/ui/Skeleton';
import { SparklesIcon } from '../components/ui/Icons';
import { formatINR } from '../lib/currency';

export function SmartRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [budgetCap, setBudgetCap] = useState(150);

  useEffect(() => {
    setLoading(true);
    getSmartRecommendations({ maxBudgetINR: budgetCap })
      .then((data) => setRecommendations(data))
      .finally(() => setLoading(false));
  }, [budgetCap]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 mb-2">
          <Badge variant="primary" size="sm">
            Rule-Based Multi-Criteria Engine
          </Badge>
          <span className="text-xs text-text-muted">Not Blackbox AI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
          Smart Recommendations
        </h1>
        <p className="text-text-secondary text-sm mt-1 max-w-2xl">
          Meals scored from 0–100 using deterministic student rules balancing daily budget fit, dietary preference, pantry ingredients, and protein targets.
        </p>
      </div>

      {/* Target Budget Filter */}
      <Card padding="md" className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-text-muted block">
            Current Daily Meal Budget Target
          </span>
          <span className="text-xl font-heading font-bold text-primary">
            {formatINR(budgetCap)} / day
          </span>
        </div>
        <div className="flex gap-2">
          {[100, 150, 200].map((b) => (
            <Button
              key={b}
              variant={budgetCap === b ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setBudgetCap(b)}
            >
              {formatINR(b)}
            </Button>
          ))}
        </div>
      </Card>

      {/* Recommendations Feed */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md" className="space-y-3">
              <Skeleton className="w-full h-24" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.slice(0, 6).map((rec) => (
            <Card key={rec.recipe.id} hoverEffect padding="md" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-full sm:w-44 shrink-0">
                  <RecipeImage
                    slug={rec.recipe.slug}
                    title={rec.recipe.title}
                    emoji={rec.recipe.imagePlaceholderEmoji}
                    gradient={rec.recipe.imagePlaceholderGradient}
                    aspectRatio="video"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-lg text-text-primary">
                        {rec.recipe.title}
                      </h3>
                      <Badge variant={rec.recipe.dietaryTag === 'veg' ? 'success' : 'warning'}>
                        {rec.recipe.dietaryTag}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-base text-text-primary">
                        {formatINR(rec.recipe.estimatedCostINR)}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/40 font-mono font-bold text-sm">
                        <SparklesIcon size={14} />
                        {rec.score}% Match
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary">{rec.recipe.description}</p>

                  <div className="p-2.5 rounded-lg bg-bg-surface/80 border border-border-subtle text-xs text-text-primary flex items-start gap-2">
                    <span className="text-primary font-bold">Why this:</span>
                    <span>{rec.explanation}</span>
                  </div>

                  {/* Multi-criteria Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <ProgressBar label="Budget Fit" value={rec.breakdown.budget} max={100} size="sm" />
                    <ProgressBar label="Diet Preference" value={rec.breakdown.preference} max={100} size="sm" />
                    <ProgressBar label="Nutrition Goal" value={rec.breakdown.nutrition} max={100} size="sm" />
                    <ProgressBar label="Pantry Match" value={rec.breakdown.ingredient} max={100} size="sm" />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between">
                <span className="text-xs text-text-muted">
                  Ready in {rec.recipe.prepTimeMinutes + rec.recipe.cookTimeMinutes} mins • {rec.recipe.nutritionEstimates.protein}g protein
                </span>
                <Link to={`/recipes/${rec.recipe.id}`}>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                    View Instructions →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
