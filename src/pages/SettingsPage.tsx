import { useState, useEffect } from 'react';
import { getUserPreferences, updatePreferences } from '../api/expenses';
import { UserPreferences, DietaryPreference, NutritionalGoal } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Chip } from '../components/ui/Chip';
import { formatINR } from '../lib/currency';

export function SettingsPage() {
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [saved, setSaved] = useState(false);
  const [dailyBudget, setDailyBudget] = useState(150);
  const [weeklyBudget, setWeeklyBudget] = useState(1050);

  useEffect(() => {
    getUserPreferences().then((p) => {
      setPrefs(p);
      setDailyBudget(p.defaultDailyBudgetINR);
      setWeeklyBudget(p.weeklyBudgetINR);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prefs) return;
    const updated = await updatePreferences({
      ...prefs,
      defaultDailyBudgetINR: dailyBudget,
      weeklyBudgetINR: weeklyBudget,
    });
    setPrefs(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!prefs) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
          Student Preferences & Budget Settings
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Tune your dietary constraints, default allowances, and nutritional priorities.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card padding="md" className="space-y-4">
          <h2 className="text-base font-heading font-bold text-text-primary">
            Food Budget Defaults
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Daily Target (₹)"
              type="number"
              value={dailyBudget}
              onChange={(e) => setDailyBudget(Number(e.target.value))}
              hint={`Formatted: ${formatINR(dailyBudget)}/day`}
              min="10"
            />
            <Input
              label="Weekly Target (₹)"
              type="number"
              value={weeklyBudget}
              onChange={(e) => setWeeklyBudget(Number(e.target.value))}
              hint={`Formatted: ${formatINR(weeklyBudget)}/week`}
              min="50"
            />
          </div>
        </Card>

        <Card padding="md" className="space-y-4">
          <h2 className="text-base font-heading font-bold text-text-primary">
            Dietary Preference
          </h2>
          <div className="flex flex-wrap gap-2">
            {(['veg', 'egg', 'non-veg', 'vegan'] as DietaryPreference[]).map((tag) => (
              <Chip
                key={tag}
                label={tag.toUpperCase()}
                selected={prefs.dietaryPreference === tag}
                onSelect={() => setPrefs({ ...prefs, dietaryPreference: tag })}
              />
            ))}
          </div>
        </Card>

        <Card padding="md" className="space-y-4">
          <h2 className="text-base font-heading font-bold text-text-primary">
            Nutritional Priority
          </h2>
          <Select
            value={prefs.nutritionalGoal}
            onChange={(e) =>
              setPrefs({ ...prefs, nutritionalGoal: e.target.value as NutritionalGoal })
            }
            options={[
              { value: 'balanced', label: 'Balanced (General Student Wellness)' },
              { value: 'high-protein', label: 'High Protein (Fitness & Energy)' },
              { value: 'budget-friendly', label: 'Ultra Budget-Friendly (Maximum Savings)' },
              { value: 'quick-and-easy', label: 'Quick & Easy (Under 15 mins)' },
              { value: 'low-calorie', label: 'Light & Low Calorie' },
            ]}
          />
        </Card>

        <div className="flex items-center justify-between">
          {saved ? (
            <span className="text-sm font-semibold text-accent-emerald">
              ✓ Preferences saved successfully!
            </span>
          ) : (
            <span />
          )}

          <Button variant="primary" size="md" type="submit">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
