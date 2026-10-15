import { Recipe } from '../types';
import { MOCK_RECIPES } from './mock/recipes.mock';
import { delay } from '../lib/utils';

// Local favorite IDs set
let favoriteIds = new Set<string>(
  MOCK_RECIPES.filter((r) => r.isFavorite).map((r) => r.id)
);

/**
 * Fetches all recipes favorited by the current student user
 */
export async function getFavorites(): Promise<Recipe[]> {
  await delay(300);
  return MOCK_RECIPES.filter((r) => favoriteIds.has(r.id)).map((r) => ({
    ...r,
    isFavorite: true,
  }));
}

/**
 * Toggles a recipe in the user's favorites
 */
export async function toggleFavorite(recipeId: string): Promise<boolean> {
  await delay(200);
  if (favoriteIds.has(recipeId)) {
    favoriteIds.delete(recipeId);
    return false;
  } else {
    favoriteIds.add(recipeId);
    return true;
  }
}

/**
 * Checks if a recipe is currently favorited
 */
export async function isFavorite(recipeId: string): Promise<boolean> {
  await delay(100);
  return favoriteIds.has(recipeId);
}
