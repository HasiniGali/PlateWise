import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../api/recipes';
import { getIngredients } from '../api/ingredients';
import { Recipe, Ingredient } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { RecipeImage } from '../components/ui/RecipeImage';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { formatINR } from '../lib/currency';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredientsMap, setIngredientsMap] = useState<Record<string, Ingredient>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);

    Promise.all([getRecipeById(id), getIngredients()])
      .then(([rec, ings]) => {
        if (!rec) {
          setError(true);
        } else {
          setRecipe(rec);
          const map: Record<string, Ingredient> = {};
          ings.forEach((i) => {
            map[i.id] = i;
          });
          setIngredientsMap(map);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="w-full h-64 rounded-2xl" />
        <Skeleton variant="text" className="w-1/2 h-8" />
        <Skeleton variant="text" className="w-full h-20" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <ErrorState
        title="Recipe Not Found"
        message="The recipe you requested could not be found or has been removed."
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Breadcrumb / Back Link */}
      <Link to="/recipes" className="text-xs text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1">
        ← Back to all recipes
      </Link>

      {/* Hero Header */}
      <div className="relative">
        <RecipeImage
          slug={recipe.slug}
          title={recipe.title}
          emoji={recipe.imagePlaceholderEmoji}
          gradient={recipe.imagePlaceholderGradient}
          aspectRatio="wide"
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant={recipe.dietaryTag === 'veg' ? 'success' : recipe.dietaryTag === 'egg' ? 'warning' : 'danger'} size="md">
              {recipe.dietaryTag.toUpperCase()}
            </Badge>
            <Badge variant="default" size="md">
              {recipe.cuisine}
            </Badge>
            <Badge variant="default" size="md">
              {recipe.difficulty}
            </Badge>
          </div>
          <span className="text-2xl font-bold font-mono text-primary">
            {formatINR(recipe.estimatedCostINR)}
          </span>
        </div>

        <h1 className="text-3xl font-heading font-extrabold text-text-primary tracking-tight">
          {recipe.title}
        </h1>
        <p className="text-text-secondary leading-relaxed text-sm">
          {recipe.description}
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
          <Card padding="sm" className="text-center">
            <span className="text-xs text-text-muted block">Prep Time</span>
            <span className="font-bold text-sm text-text-primary">{recipe.prepTimeMinutes} mins</span>
          </Card>
          <Card padding="sm" className="text-center">
            <span className="text-xs text-text-muted block">Cook Time</span>
            <span className="font-bold text-sm text-text-primary">{recipe.cookTimeMinutes} mins</span>
          </Card>
          <Card padding="sm" className="text-center">
            <span className="text-xs text-text-muted block">Protein</span>
            <span className="font-bold text-sm text-accent-blue">{recipe.nutritionEstimates.protein}g</span>
          </Card>
          <Card padding="sm" className="text-center">
            <span className="text-xs text-text-muted block">Calories (Est.)</span>
            <span className="font-bold text-sm text-text-primary">{recipe.nutritionEstimates.calories} kcal</span>
          </Card>
        </div>
      </div>

      {/* Ingredients Required */}
      <Card padding="md" className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary">
          Ingredients Required ({recipe.ingredients.length})
        </h2>
        <ul className="divide-y divide-border-subtle/50 text-sm">
          {recipe.ingredients.map((item, idx) => {
            const ing = ingredientsMap[item.ingredientId];
            return (
              <li key={idx} className="py-2.5 flex items-center justify-between">
                <span className="text-text-primary font-medium">
                  {ing ? ing.name : item.ingredientId}
                  {item.notes && <span className="text-text-muted text-xs ml-2">({item.notes})</span>}
                </span>
                <span className="text-text-secondary font-mono text-xs">
                  {item.quantity} {item.unit}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Instructions */}
      <Card padding="md" className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary">
          Step-by-Step Hostel Instructions
        </h2>
        <ol className="space-y-3 text-sm">
          {recipe.instructions.map((step, idx) => (
            <li key={idx} className="flex gap-3 leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-text-secondary">{step}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
