import { Recipe } from '../types';
import { MOCK_RECIPES } from './mock/recipes.mock';
import { delay } from '../lib/utils';

// Local mutable state in memory for mock session
let recipesState: Recipe[] = [...MOCK_RECIPES];

export interface RecipeFilterParams {
  search?: string;
  cuisine?: string;
  dietaryTag?: string;
  mealType?: string;
  maxCostINR?: number;
  maxPrepTimeMinutes?: number;
  sortBy?: 'cost-asc' | 'cost-desc' | 'time' | 'protein' | 'popular';
}

/**
 * Fetches recipes with optional search, filtering, and sorting
 */
export async function getRecipes(params?: RecipeFilterParams): Promise<Recipe[]> {
  await delay(300);

  // SERVER WILL COMPUTE THIS LATER: Filtering and sorting done in database query
  let result = [...recipesState];

  if (params?.search) {
    const q = params.search.toLowerCase().trim();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q)
    );
  }

  if (params?.cuisine && params.cuisine !== 'all') {
    result = result.filter((r) => r.cuisine === params.cuisine);
  }

  if (params?.dietaryTag && params.dietaryTag !== 'all') {
    result = result.filter((r) => r.dietaryTag === params.dietaryTag);
  }

  if (params?.mealType && params.mealType !== 'all') {
    result = result.filter((r) => r.mealType === params.mealType);
  }

  if (params?.maxCostINR) {
    result = result.filter((r) => r.estimatedCostINR <= params.maxCostINR!);
  }

  if (params?.maxPrepTimeMinutes) {
    result = result.filter(
      (r) => r.prepTimeMinutes + r.cookTimeMinutes <= params.maxPrepTimeMinutes!
    );
  }

  if (params?.sortBy) {
    if (params.sortBy === 'cost-asc') {
      result.sort((a, b) => a.estimatedCostINR - b.estimatedCostINR);
    } else if (params.sortBy === 'cost-desc') {
      result.sort((a, b) => b.estimatedCostINR - a.estimatedCostINR);
    } else if (params.sortBy === 'time') {
      result.sort(
        (a, b) => a.prepTimeMinutes + a.cookTimeMinutes - (b.prepTimeMinutes + b.cookTimeMinutes)
      );
    } else if (params.sortBy === 'protein') {
      result.sort((a, b) => b.nutritionEstimates.protein - a.nutritionEstimates.protein);
    }
  }

  return result;
}

/**
 * Fetches a single recipe by its ID
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  await delay(300);
  const found = recipesState.find((r) => r.id === id);
  return found ? { ...found } : null;
}

/**
 * Fetches a single recipe by its slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  await delay(300);
  const found = recipesState.find((r) => r.slug === slug);
  return found ? { ...found } : null;
}

/**
 * Returns featured recipes for landing and dashboard previews
 */
export async function getFeaturedRecipes(limit = 4): Promise<Recipe[]> {
  await delay(300);
  return recipesState.slice(0, limit);
}

/**
 * Toggles the favorite status of a recipe
 */
export async function toggleFavorite(recipeId: string): Promise<boolean> {
  await delay(250);
  const idx = recipesState.findIndex((r) => r.id === recipeId);
  if (idx >= 0) {
    recipesState[idx] = {
      ...recipesState[idx],
      isFavorite: !recipesState[idx].isFavorite,
    };
    return !!recipesState[idx].isFavorite;
  }
  return false;
}
