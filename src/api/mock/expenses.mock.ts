import { BudgetSummary, Expense, UserPreferences } from '../../types';

export const MOCK_USER_PREFERENCES: UserPreferences = {
  dietaryPreference: 'veg',
  preferredCuisines: ['North Indian', 'South Indian'],
  nutritionalGoal: 'balanced',
  defaultDailyBudgetINR: 150,
  weeklyBudgetINR: 1050,
  allergies: [],
};

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 'exp_01',
    description: 'Hostel Canteen - Kanda Poha & Chai',
    amountINR: 35,
    category: 'breakfast',
    expenseDate: '2026-10-14',
    notes: 'Morning fuel before lab',
  },
  {
    id: 'exp_02',
    description: 'Mess Tiffin - Dal Tadka & 3 Roti',
    amountINR: 60,
    category: 'lunch',
    expenseDate: '2026-10-14',
    notes: 'Regular lunch plate',
  },
  {
    id: 'exp_03',
    description: 'Tea Stall - Ginger Chai & Biscuits',
    amountINR: 20,
    category: 'snacks',
    expenseDate: '2026-10-14',
  },
  {
    id: 'exp_04',
    description: 'Hostel Grocery Run - Atta & Paneer',
    amountINR: 125,
    category: 'groceries',
    expenseDate: '2026-10-13',
    notes: 'Weekly pantry stock',
  },
  {
    id: 'exp_05',
    description: 'Quick Egg Fried Rice',
    amountINR: 55,
    category: 'dinner',
    expenseDate: '2026-10-13',
  },
  {
    id: 'exp_06',
    description: 'South Indian Canteen - Upma & Sambar',
    amountINR: 30,
    category: 'breakfast',
    expenseDate: '2026-10-12',
  },
  {
    id: 'exp_07',
    description: 'Campus Dhaba - Soya Pulao & Raita',
    amountINR: 50,
    category: 'lunch',
    expenseDate: '2026-10-12',
  },
  {
    id: 'exp_08',
    description: 'Comfort Moong Dal Khichdi at room',
    amountINR: 42,
    category: 'dinner',
    expenseDate: '2026-10-11',
  },
];

// SERVER WILL COMPUTE THIS LATER: Calculates budget summary from expense entries
export function computeMockBudgetSummary(
  expenses: Expense[] = MOCK_EXPENSES,
  prefs: UserPreferences = MOCK_USER_PREFERENCES
): BudgetSummary {
  const today = '2026-10-14';

  // SERVER WILL COMPUTE THIS LATER: Daily calculation
  const todayExpenses = expenses.filter((e) => e.expenseDate === today);
  const dailySpentINR = todayExpenses.reduce((sum, e) => sum + e.amountINR, 0);
  const dailyRemainingINR = Math.max(0, prefs.defaultDailyBudgetINR - dailySpentINR);

  // SERVER WILL COMPUTE THIS LATER: Weekly calculation
  const weeklySpentINR = expenses.reduce((sum, e) => sum + e.amountINR, 0);
  const weeklyRemainingINR = Math.max(0, prefs.weeklyBudgetINR - weeklySpentINR);

  // SERVER WILL COMPUTE THIS LATER: Category breakdown
  const categoryBreakdown: Record<Expense['category'], number> = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snacks: 0,
    groceries: 0,
  };

  expenses.forEach((e) => {
    categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + e.amountINR;
  });

  return {
    dailyBudgetINR: prefs.defaultDailyBudgetINR,
    dailySpentINR,
    dailyRemainingINR,
    weeklyBudgetINR: prefs.weeklyBudgetINR,
    weeklySpentINR,
    weeklyRemainingINR,
    categoryBreakdown,
    recentExpenses: expenses.slice(0, 5),
  };
}
