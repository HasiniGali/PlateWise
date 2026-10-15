import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../api/recipes';
import { Recipe } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { RecipeImage } from '../components/ui/RecipeImage';
import { Skeleton } from '../components/ui/Skeleton';
import { SearchIcon, ClockIcon, FlameIcon } from '../components/ui/Icons';
import { formatINR } from '../lib/currency';

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getRecipes({ search })
      .then((data) => {
        if (isMounted) setRecipes(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
            Hostel Recipe Discovery
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Budget-friendly, quick meals you can make in a hostel room or shared apartment kitchen.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <Input
          placeholder="Search recipes (e.g. Poha, Khichdi, Paneer)..."
          leftIcon={<SearchIcon size={18} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>

      {/* Recipe Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} padding="sm" className="space-y-3">
              <Skeleton className="w-full aspect-[16/10]" />
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
            </Card>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <Card padding="lg" className="text-center py-12">
          <p className="text-text-secondary">No recipes found matching "{search}".</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="group block">
              <Card hoverEffect padding="sm" className="h-full flex flex-col justify-between">
                <div>
                  <RecipeImage
                    slug={recipe.slug}
                    title={recipe.title}
                    emoji={recipe.imagePlaceholderEmoji}
                    gradient={recipe.imagePlaceholderGradient}
                  />
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={recipe.dietaryTag === 'veg' ? 'success' : recipe.dietaryTag === 'egg' ? 'warning' : 'danger'}>
                        {recipe.dietaryTag.toUpperCase()}
                      </Badge>
                      <span className="font-mono font-bold text-primary text-sm">
                        {formatINR(recipe.estimatedCostINR)}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-text-primary group-hover:text-primary transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>
                </div>

                <div className="p-3 pt-0 border-t border-border-subtle/50 mt-2 flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <ClockIcon size={14} />
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
                  </span>
                  <span className="flex items-center gap-1 text-accent-blue font-medium">
                    <FlameIcon size={14} />
                    {recipe.nutritionEstimates.protein}g protein
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
