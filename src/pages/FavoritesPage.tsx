import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites } from '../api/favorites';
import { Recipe } from '../types';
import { Card } from '../components/ui/Card';
import { RecipeImage } from '../components/ui/RecipeImage';
import { EmptyState } from '../components/ui/EmptyState';
import { formatINR } from '../lib/currency';
import { HeartIcon } from '../components/ui/Icons';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites().then((data) => {
      setFavorites(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
          Saved Favorites
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Your bookmarked student recipes for quick hostel cooking.
        </p>
      </div>

      {!loading && favorites.length === 0 ? (
        <EmptyState
          icon={<HeartIcon size={24} className="text-accent-coral" />}
          title="No Favorites Saved Yet"
          description="Bookmark recipes you love so you can quickly cook them whenever you're hungry."
          actionLabel="Explore Recipes"
          onAction={() => window.location.assign('/recipes')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="group block">
              <Card hoverEffect padding="sm" className="space-y-3">
                <RecipeImage
                  slug={recipe.slug}
                  title={recipe.title}
                  emoji={recipe.imagePlaceholderEmoji}
                  gradient={recipe.imagePlaceholderGradient}
                />
                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-base text-text-primary group-hover:text-primary transition-colors">
                      {recipe.title}
                    </span>
                    <span className="font-mono font-bold text-sm text-primary">
                      {formatINR(recipe.estimatedCostINR)}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">
                    {recipe.cuisine} • {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
