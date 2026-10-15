import { useState, useEffect } from 'react';
import { getIngredients } from '../api/ingredients';
import { getRecipes } from '../api/recipes';
import { Ingredient, Recipe } from '../types';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { Button } from '../components/ui/Button';
import { RecipeImage } from '../components/ui/RecipeImage';
import { ProgressBar } from '../components/ui/ProgressBar';
import { formatINR } from '../lib/currency';
import { Link } from 'react-router-dom';

export function IngredientFinderPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(['ing_poha', 'ing_onion', 'ing_peanuts', 'ing_mustard_seeds'])
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    Promise.all([getIngredients(), getRecipes()]).then(([ings, recs]) => {
      setIngredients(ings);
      setRecipes(recs);
    });
  }, []);

  const toggleIngredient = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Match calculations
  // SERVER WILL COMPUTE THIS LATER: Ingredient match percentage and missing items
  const matchedResults = recipes.map((r) => {
    const requiredIds = r.ingredients.map((i) => i.ingredientId);
    const matchedCount = requiredIds.filter((id) => selectedIds.has(id)).length;
    const matchPercentage = Math.round((matchedCount / requiredIds.length) * 100);
    return {
      recipe: r,
      matchPercentage,
      matchedCount,
      totalCount: requiredIds.length,
    };
  });

  matchedResults.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
          Ingredient-Based Recipe Finder
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Select what you have in your room or hostel pantry to calculate recipe match percentages.
        </p>
      </div>

      {/* Ingredient Selection Panel */}
      <Card padding="md" className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-semibold text-text-muted">
            Available Ingredients ({selectedIds.size} selected)
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedIds(new Set())}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
          {ingredients.map((ing) => {
            const isSelected = selectedIds.has(ing.id);
            return (
              <Chip
                key={ing.id}
                label={ing.name}
                selected={isSelected}
                onSelect={() => toggleIngredient(ing.id)}
                size="sm"
              />
            );
          })}
        </div>
      </Card>

      {/* Matching Recipes Output */}
      <div className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary">
          Matched Student Recipes ({matchedResults.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedResults.slice(0, 6).map(({ recipe, matchedCount, totalCount }) => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="block group">
              <Card hoverEffect padding="sm" className="space-y-3 h-full flex flex-col justify-between">
                <div>
                  <RecipeImage
                    slug={recipe.slug}
                    title={recipe.title}
                    emoji={recipe.imagePlaceholderEmoji}
                    gradient={recipe.imagePlaceholderGradient}
                  />

                  <div className="p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-text-primary group-hover:text-primary transition-colors">
                        {recipe.title}
                      </span>
                      <span className="font-mono font-bold text-sm text-primary">
                        {formatINR(recipe.estimatedCostINR)}
                      </span>
                    </div>

                    <ProgressBar
                      label="Pantry Match"
                      value={matchedCount}
                      max={totalCount}
                      sublabel={`${matchedCount}/${totalCount} ingredients`}
                      size="sm"
                    />
                  </div>
                </div>

                <div className="p-3 pt-0 text-xs text-text-muted flex items-center justify-between">
                  <span>{recipe.cuisine}</span>
                  <span className="text-primary font-semibold">View Recipe →</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
