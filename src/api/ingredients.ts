import { Ingredient } from '../types';
import { MOCK_INGREDIENTS } from './mock/ingredients.mock';
import { delay } from '../lib/utils';

/**
 * Fetches all available ingredients for the ingredient finder
 */
export async function getIngredients(): Promise<Ingredient[]> {
  await delay(300);
  return [...MOCK_INGREDIENTS];
}

/**
 * Fetches a single ingredient by ID
 */
export async function getIngredientById(id: string): Promise<Ingredient | null> {
  await delay(300);
  const found = MOCK_INGREDIENTS.find((ing) => ing.id === id);
  return found ? { ...found } : null;
}
