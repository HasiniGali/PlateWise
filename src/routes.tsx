import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { IngredientFinderPage } from './pages/IngredientFinderPage';
import { SmartRecommendationsPage } from './pages/SmartRecommendationsPage';
import { DashboardPage } from './pages/DashboardPage';
import { BudgetPage } from './pages/BudgetPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SettingsPage } from './pages/SettingsPage';
import { DesignShowcasePage } from './pages/DesignShowcasePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'recipes/:id', element: <RecipeDetailPage /> },
      { path: 'finder', element: <IngredientFinderPage /> },
      { path: 'recommendations', element: <SmartRecommendationsPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'budget', element: <BudgetPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'design', element: <DesignShowcasePage /> },
    ],
  },
]);
