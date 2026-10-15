import { AuthResponse, User } from '../types';
import { MOCK_USER_PREFERENCES } from './mock/expenses.mock';
import { delay } from '../lib/utils';

const MOCK_USER: User = {
  id: 'usr_student_101',
  name: 'Aarav Sharma',
  email: 'aarav.cse@campus.edu',
  collegeOrHostel: 'Block B, Hostel 4',
  preferences: { ...MOCK_USER_PREFERENCES },
};

let currentUser: User | null = { ...MOCK_USER }; // Start logged-in for smooth dev experience

/**
 * Gets currently logged in user (or null)
 */
export async function getCurrentUser(): Promise<User | null> {
  await delay(150);
  return currentUser ? { ...currentUser } : null;
}

/**
 * Simulates user login
 * NOTE: Mock authentication for frontend demo only, not production-grade security.
 */
export async function login(email: string): Promise<AuthResponse> {
  await delay(400);
  currentUser = {
    ...MOCK_USER,
    email,
    name: email.split('@')[0] || 'Student',
  };
  return {
    user: { ...currentUser },
    token: 'mock-jwt-student-token-xyz',
  };
}

/**
 * Simulates user registration
 */
export async function register(name: string, email: string): Promise<AuthResponse> {
  await delay(400);
  currentUser = {
    ...MOCK_USER,
    name,
    email,
  };
  return {
    user: { ...currentUser },
    token: 'mock-jwt-student-token-xyz',
  };
}

/**
 * Simulates logout
 */
export async function logout(): Promise<void> {
  await delay(200);
  currentUser = null;
}
