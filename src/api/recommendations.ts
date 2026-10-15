import { Recommendation, UserPreferences } from '../types';
import { MOCK_RECIPES } from './mock/recipes.mock';
import { MOCK_INGREDIENTS } from './mock/ingredients.mock';
import { MOCK_USER_PREFERENCES } from './mock/expenses.mock';
import { delay } from '../lib/utils';

export interface RecommendationQueryParams {
  maxBudgetINR?: number;
  availableIngredientIds?: string[];
  preferences?: Partial<UserPreferences>;
}

/**
 * Returns explainable, budget-aware smart meal recommendations
 * Uses a multi-criteria scoring algorithm (0-100) combining:
 * 1. Budget fit (30%)
 * 2. Dietary & cuisine preference fit (30%)
 * 3. Ingredient availability match (20%)
 * 4. Nutritional goal alignment (20%)
 */
export async function getSmartRecommendations(
  params?: RecommendationQueryParams
): Promise<Recommendation[]> {
  await delay(300);

  const budget = params?.maxBudgetINR ?? MOCK_USER_PREFERENCES.defaultDailyBudgetINR;
  const targetPerMealBudget = budget > 0 ? Math.round(budget / 2) : 60; // per-meal target
  const availableIngIds = new Set(params?.availableIngredientIds || []);
  const userPrefs = { ...MOCK_USER_PREFERENCES, ...params?.preferences };

  // SERVER WILL COMPUTE THIS LATER: The Spring Boot backend rule-engine will rank candidates
  const recommendations: Recommendation[] = MOCK_RECIPES.map((recipe) => {
    // 1. Budget Score (0-100)
    let budgetScore = 100;
    if (recipe.estimatedCostINR > targetPerMealBudget) {
      const overRatio = (recipe.estimatedCostINR - targetPerMealBudget) / targetPerMealBudget;
      budgetScore = Math.max(10, Math.round(100 - overRatio * 80));
    } else {
      budgetScore = 95;
    }

    // 2. Preference Score (0-100)
    let prefScore = 70;
    if (userPrefs.dietaryPreference === recipe.dietaryTag) {
      prefScore += 20;
    } else if (userPrefs.dietaryPreference === 'veg' && recipe.dietaryTag !== 'veg') {
      prefScore = 10; // strict penalty for veg users
    }
    if (userPrefs.preferredCuisines.includes(recipe.cuisine)) {
      prefScore += 10;
    }
    prefScore = Math.min(100, Math.max(10, prefScore));

    // 3. Ingredient Match Score (0-100)
    const recipeIngIds = recipe.ingredients.map((i) => i.ingredientId);
    const matched = recipeIngIds.filter((id) => availableIngIds.has(id));
    const missing = recipeIngIds.filter((id) => !availableIngIds.has(id));

    let ingredientScore = 50;
    if (availableIngIds.size > 0) {
      ingredientScore = Math.round((matched.length / recipeIngIds.length) * 100);
    }

    // 4. Nutrition Score (0-100)
    let nutritionScore = 70;
    if (userPrefs.nutritionalGoal === 'high-protein') {
      nutritionScore = Math.min(100, Math.round((recipe.nutritionEstimates.protein / 25) * 100));
    } else if (userPrefs.nutritionalGoal === 'budget-friendly') {
      nutritionScore = recipe.estimatedCostINR <= 40 ? 95 : 65;
    } else if (userPrefs.nutritionalGoal === 'quick-and-easy') {
      nutritionScore = recipe.prepTimeMinutes + recipe.cookTimeMinutes <= 15 ? 95 : 60;
    }

    // Weighted composite score (0-100)
    // SERVER WILL COMPUTE THIS LATER: Composite multi-factor formula
    const compositeScore = Math.round(
      budgetScore * 0.35 +
      prefScore * 0.25 +
      ingredientScore * 0.20 +
      nutritionScore * 0.20
    );

    // Human-readable rationale
    const matchedNames = matched
      .map((id) => MOCK_INGREDIENTS.find((i) => i.id === id)?.name)
      .filter((n): n is string => Boolean(n));
    const missingNames = missing
      .map((id) => MOCK_INGREDIENTS.find((i) => i.id === id)?.name)
      .filter((n): n is string => Boolean(n));

    let explanation = `Fits nicely within your meal target of ₹${targetPerMealBudget}.`;
    if (recipe.estimatedCostINR <= 35) {
      explanation = `Ultra-budget friendly at ₹${recipe.estimatedCostINR} with high student satisfaction.`;
    } else if (recipe.nutritionEstimates.protein >= 20) {
      explanation = `High protein pick (${recipe.nutritionEstimates.protein}g) aligned with your nutrition goals.`;
    }

    return {
      recipe,
      score: Math.min(100, Math.max(10, compositeScore)),
      breakdown: {
        budget: budgetScore,
        preference: prefScore,
        ingredient: ingredientScore,
        nutrition: nutritionScore,
      },
      matchedIngredients: matchedNames,
      missingIngredients: missingNames,
      explanation,
    };
  });

  // Sort descending by match score
  recommendations.sort((a, b) => b.score - a.score);

  return recommendations;
}
