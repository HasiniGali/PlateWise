import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getRecipes } from '../../api/recipes';
import { toggleFavorite } from '../../api/favorites';
import { Recipe } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { RecipeImage } from '../../components/ui/RecipeImage';
import { Skeleton } from '../../components/ui/Skeleton';
import {
  ClockIcon,
  FlameIcon,
  HeartIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '../../components/ui/Icons';
import { formatINR } from '../../lib/currency';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type CategoryType =
  | 'all'
  | 'south-indian'
  | 'north-indian'
  | 'veg'
  | 'high-protein'
  | 'quick'
  | 'budget'
  | 'snacks'
  | 'desserts'
  | 'healthy-bowls';

interface CategoryOption {
  id: CategoryType;
  label: string;
  emoji: string;
  countTag?: string;
}

export function FeaturedMealsSection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [loading, setLoading] = useState(true);
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getRecipes()
      .then((data) => {
        if (!isMounted) return;
        setRecipes(data);
        const favs: Record<string, boolean> = {};
        data.forEach((r) => {
          favs[r.id] = !!r.isFavorite;
        });
        setFavoriteMap(favs);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleFavorite = async (e: React.MouseEvent, recipeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = await toggleFavorite(recipeId);
    setFavoriteMap((prev) => ({ ...prev, [recipeId]: newStatus }));
  };

  // 9 Required Categories
  const categories: CategoryOption[] = [
    { id: 'all', label: 'All Meals', emoji: '✨' },
    { id: 'south-indian', label: 'South Indian', emoji: '🥥' },
    { id: 'north-indian', label: 'North Indian', emoji: '🍛' },
    { id: 'veg', label: 'Vegetarian', emoji: '🌱' },
    { id: 'high-protein', label: 'High Protein', emoji: '💪' },
    { id: 'quick', label: 'Quick Meals', emoji: '⚡' },
    { id: 'budget', label: 'Budget Friendly', emoji: '🪙' },
    { id: 'snacks', label: 'Snacks', emoji: '🥪' },
    { id: 'desserts', label: 'Desserts & Sweet', emoji: '🍯' },
    { id: 'healthy-bowls', label: 'Healthy Bowls', emoji: '🥗' },
  ];

  // Dynamic filter logic
  const filteredRecipes = recipes.filter((recipe) => {
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    switch (activeCategory) {
      case 'south-indian':
        return recipe.cuisine === 'South Indian';
      case 'north-indian':
        return recipe.cuisine === 'North Indian';
      case 'veg':
        return recipe.dietaryTag === 'veg';
      case 'high-protein':
        return recipe.nutritionEstimates.protein >= 15;
      case 'quick':
        return totalTime <= 15;
      case 'budget':
        return recipe.estimatedCostINR <= 35;
      case 'snacks':
        return recipe.mealType === 'snack';
      case 'desserts':
        return recipe.title.toLowerCase().includes('sweet') || recipe.mealType === 'breakfast';
      case 'healthy-bowls':
        return (
          recipe.title.toLowerCase().includes('bowl') ||
          recipe.title.toLowerCase().includes('khichdi') ||
          recipe.title.toLowerCase().includes('pulao') ||
          recipe.title.toLowerCase().includes('rice')
        );
      default:
        return true;
    }
  });

  return (
    <section className="space-y-8 py-4 text-left">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-default/60 pb-6">
        <div className="space-y-2">
          <Badge variant="primary" size="sm" className="gap-1.5">
            <SparklesIcon size={14} className="text-primary" />
            Curated For Student Life
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Discover Fresh Hostel Recipes
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl">
            Wholesome home-style meals with authentic spices, realistic ₹ costs, and minimal cleanup.
          </p>
        </div>

        <Link to="/recipes">
          <Button
            variant="secondary"
            size="sm"
            rightIcon={<ArrowRightIcon size={14} />}
            className="text-xs font-semibold px-4 py-2"
          >
            Browse All {recipes.length} Meals
          </Button>
        </Link>
      </div>

      {/* 9 Category Filter Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider block font-heading">
          Explore by Category:
        </span>
        <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-pastel-peach text-text-primary font-bold border border-[#F2BA9A] shadow-xs scale-[1.02]'
                    : 'bg-white text-text-secondary border border-border-default hover:border-pastel-peach hover:bg-bg-surface'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Meal Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} padding="sm" className="space-y-3">
              <Skeleton className="w-full aspect-[16/10] rounded-xl" />
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
            </Card>
          ))}
        </div>
      ) : filteredRecipes.length === 0 ? (
        <Card padding="lg" className="text-center py-12 space-y-3 bg-white">
          <p className="text-base text-text-primary font-heading font-semibold">
            No recipes found in this category yet.
          </p>
          <p className="text-xs text-text-secondary">
            Try switching to another category or check the full recipe catalog.
          </p>
          <Button variant="secondary" size="sm" onClick={() => setActiveCategory('all')}>
            Reset Category Filter
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.slice(0, 6).map((recipe, index) => {
            const isFav = !!favoriteMap[recipe.id];
            return (
              <motion.div
                key={recipe.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.05 }}
              >
                <Link to={`/recipes/${recipe.id}`} className="group block h-full">
                  <Card
                    hoverEffect
                    padding="sm"
                    className="h-full flex flex-col justify-between border-border-default bg-white transition-all duration-300 group-hover:shadow-md group-hover:border-pastel-peach"
                  >
                    <div>
                      {/* Image with overlay elements */}
                      <div className="relative">
                        <RecipeImage
                          slug={recipe.slug}
                          title={recipe.title}
                          emoji={recipe.imagePlaceholderEmoji}
                          imageUrl={recipe.imageUrl}
                          gradient={recipe.imagePlaceholderGradient}
                        />

                        {/* Price Badge on Top Left */}
                        <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-border-default shadow-xs text-xs font-mono font-bold text-text-primary">
                          {formatINR(recipe.estimatedCostINR)}
                        </div>

                        {/* Favorite Button on Top Right */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleFavorite(e, recipe.id)}
                          aria-label={isFav ? `Remove ${recipe.title} from favorites` : `Save ${recipe.title} to favorites`}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center ${
                            isFav
                              ? 'bg-pastel-pink text-[#C03E3A] border-[#F5A3B5]'
                              : 'bg-white/90 text-text-muted hover:text-[#C03E3A] border-border-default'
                          }`}
                        >
                          <HeartIcon size={16} filled={isFav} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-3.5 space-y-2 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <Badge
                            variant={
                              recipe.dietaryTag === 'veg'
                                ? 'success'
                                : recipe.dietaryTag === 'egg'
                                ? 'warning'
                                : 'danger'
                            }
                            size="sm"
                          >
                            {recipe.dietaryTag.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-text-muted font-medium">{recipe.cuisine}</span>
                        </div>

                        <h3 className="font-heading font-bold text-base text-text-primary group-hover:text-primary transition-colors leading-snug">
                          {recipe.title}
                        </h3>

                        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                          {recipe.description}
                        </p>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-3.5 pt-2.5 border-t border-border-subtle/80 flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1.5 font-medium text-text-secondary">
                        <ClockIcon size={14} className="text-primary" />
                        {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                      </span>

                      <span className="flex items-center gap-1 font-semibold text-[#2D5A37] bg-pastel-sage/40 px-2.5 py-0.5 rounded-full border border-pastel-sage/60">
                        <FlameIcon size={13} />
                        {recipe.nutritionEstimates.protein}g protein
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
