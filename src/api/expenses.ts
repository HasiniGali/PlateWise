import { BudgetSummary, Expense, UserPreferences } from '../types';
import {
  MOCK_EXPENSES,
  MOCK_USER_PREFERENCES,
  computeMockBudgetSummary,
} from './mock/expenses.mock';
import { delay } from '../lib/utils';

let expensesState: Expense[] = [...MOCK_EXPENSES];
let preferencesState: UserPreferences = { ...MOCK_USER_PREFERENCES };

/**
 * Fetches the user's budget summary (daily & weekly totals, breakdowns)
 */
export async function getBudgetSummary(): Promise<BudgetSummary> {
  await delay(300);
  // SERVER WILL COMPUTE THIS LATER: Calculated from database transactions
  return computeMockBudgetSummary(expensesState, preferencesState);
}

/**
 * Fetches the list of all expense records
 */
export async function getExpenses(): Promise<Expense[]> {
  await delay(250);
  return [...expensesState];
}

/**
 * Records a new student food expense
 */
export async function addExpense(
  newExpense: Omit<Expense, 'id'>
): Promise<{ expense: Expense; summary: BudgetSummary }> {
  await delay(300);
  const created: Expense = {
    ...newExpense,
    id: `exp_${Date.now()}`,
  };
  expensesState = [created, ...expensesState];
  const summary = computeMockBudgetSummary(expensesState, preferencesState);
  return { expense: created, summary };
}

/**
 * Deletes an existing expense record by ID
 */
export async function deleteExpense(id: string): Promise<BudgetSummary> {
  await delay(250);
  expensesState = expensesState.filter((e) => e.id !== id);
  return computeMockBudgetSummary(expensesState, preferencesState);
}

/**
 * Updates the user's budget preferences (daily & weekly budget, dietary, etc.)
 */
export async function updatePreferences(
  updates: Partial<UserPreferences>
): Promise<UserPreferences> {
  await delay(300);
  preferencesState = { ...preferencesState, ...updates };
  return { ...preferencesState };
}

/**
 * Retrieves the user's current preferences
 */
export async function getUserPreferences(): Promise<UserPreferences> {
  await delay(200);
  return { ...preferencesState };
}
