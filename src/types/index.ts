// PlateWise - Core Domain Types
// Strictly typed definitions mirroring planned Java Spring Boot DTOs

export type DietaryPreference = 'veg' | 'non-veg' | 'egg' | 'vegan';

export type CuisineType =
  | 'North Indian'
  | 'South Indian'
  | 'Indo-Chinese'
  | 'Maharashtrian'
  | 'Pan-Indian';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type NutritionalGoal =
  | 'high-protein'
  | 'balanced'
  | 'budget-friendly'
  | 'quick-and-easy'
  | 'low-calorie';

export type IngredientCategory =
  | 'grain'
  | 'legume'
  | 'vegetable'
  | 'dairy'
  | 'poultry'
  | 'egg'
  | 'spice'
  | 'condiment'
  | 'other';

export type ExpenseCategory =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snacks'
  | 'groceries';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  defaultUnit: string;
  estimatedUnitCostINR: number; // Unit price in INR (e.g. ₹ per 100g, per piece, etc.)
}

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface NutritionEstimates {
  calories: number; // kcal
  protein: number;  // grams
  carbs: number;    // grams
  fat: number;      // grams
  fiber: number;    // grams
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  estimatedCostINR: number;
  difficulty: DifficultyLevel;
  mealType: MealType;
  cuisine: CuisineType;
  dietaryTag: DietaryPreference;
  ingredients: RecipeIngredient[];
  instructions: string[];
  nutritionEstimates: NutritionEstimates;
  imagePlaceholderEmoji: string;
  imagePlaceholderGradient: string;
  imageUrl?: string;
  isFavorite?: boolean;
}

export interface UserPreferences {
  dietaryPreference: DietaryPreference;
  preferredCuisines: CuisineType[];
  nutritionalGoal: NutritionalGoal;
  defaultDailyBudgetINR: number;
  weeklyBudgetINR: number;
  allergies?: string[];
}

export interface Expense {
  id: string;
  description: string;
  amountINR: number;
  category: ExpenseCategory;
  expenseDate: string; // ISO 8601 date YYYY-MM-DD
  notes?: string;
}

export interface BudgetSummary {
  dailyBudgetINR: number;
  dailySpentINR: number;
  dailyRemainingINR: number;
  weeklyBudgetINR: number;
  weeklySpentINR: number;
  weeklyRemainingINR: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
  recentExpenses: Expense[];
}

export interface RecommendationBreakdown {
  preference: number; // 0-100
  budget: number;     // 0-100
  ingredient: number; // 0-100
  nutrition: number;  // 0-100
}

export interface Recommendation {
  recipe: Recipe;
  score: number; // Overall composite match score 0-100
  breakdown: RecommendationBreakdown;
  matchedIngredients: string[];
  missingIngredients: string[];
  explanation: string; // Human-readable rationale
}

export interface IngredientMatchResult {
  recipe: Recipe;
  matchPercentage: number; // 0-100
  matchedCount: number;
  totalRequired: number;
  matchedIngredients: Ingredient[];
  missingIngredients: Ingredient[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  collegeOrHostel?: string;
  preferences: UserPreferences;
}

export interface AuthResponse {
  user: User;
  token: string;
}
