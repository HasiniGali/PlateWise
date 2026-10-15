import { useState, useEffect } from 'react';
import { getBudgetSummary, addExpense, deleteExpense } from '../api/expenses';
import { BudgetSummary, ExpenseCategory } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { formatINR } from '../lib/currency';
import { PlusIcon, RupeeIcon } from '../components/ui/Icons';

export function BudgetPage() {
  const [summary, setSummary] = useState<BudgetSummary | null>(null);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('lunch');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getBudgetSummary().then(setSummary);
  }, []);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!desc.trim() || isNaN(num) || num <= 0) return;

    setIsSubmitting(true);
    try {
      const res = await addExpense({
        description: desc.trim(),
        amountINR: num,
        category,
        expenseDate: '2026-10-14',
      });
      setSummary(res.summary);
      setDesc('');
      setAmount('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const updated = await deleteExpense(id);
    setSummary(updated);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
          Food Expense & Budget Tracker
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Stay on top of your daily hostel mess, canteen, and grocery allowance.
        </p>
      </div>

      {/* Progress Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card padding="md" className="space-y-3">
            <ProgressBar
              label="Daily Budget Utilization"
              value={summary.dailySpentINR}
              max={summary.dailyBudgetINR}
              sublabel={`${formatINR(summary.dailySpentINR)} of ${formatINR(summary.dailyBudgetINR)}`}
              size="lg"
            />
            <div className="flex justify-between text-xs text-text-secondary pt-1">
              <span>Remaining Today:</span>
              <span className="font-bold font-mono text-accent-emerald">
                {formatINR(summary.dailyRemainingINR)}
              </span>
            </div>
          </Card>

          <Card padding="md" className="space-y-3">
            <ProgressBar
              label="Weekly Budget Utilization"
              value={summary.weeklySpentINR}
              max={summary.weeklyBudgetINR}
              sublabel={`${formatINR(summary.weeklySpentINR)} of ${formatINR(summary.weeklyBudgetINR)}`}
              size="lg"
            />
            <div className="flex justify-between text-xs text-text-secondary pt-1">
              <span>Remaining This Week:</span>
              <span className="font-bold font-mono text-primary">
                {formatINR(summary.weeklyRemainingINR)}
              </span>
            </div>
          </Card>
        </div>
      )}

      {/* Add Expense Form */}
      <Card padding="md" className="space-y-4">
        <h2 className="text-base font-heading font-bold text-text-primary flex items-center gap-2">
          <PlusIcon size={18} className="text-primary" /> Log New Food Expense
        </h2>

        <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div className="sm:col-span-2">
            <Input
              label="Description"
              placeholder="e.g. Canteen Poha & Tea"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              label="Amount (₹)"
              type="number"
              placeholder="35"
              leftIcon={<RupeeIcon size={16} />}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
            />
          </div>

          <div>
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              options={[
                { value: 'breakfast', label: 'Breakfast' },
                { value: 'lunch', label: 'Lunch' },
                { value: 'dinner', label: 'Dinner' },
                { value: 'snacks', label: 'Snacks' },
                { value: 'groceries', label: 'Groceries' },
              ]}
            />
          </div>

          <div className="sm:col-span-4 flex justify-end">
            <Button variant="primary" size="md" type="submit" isLoading={isSubmitting}>
              Add Expense Record
            </Button>
          </div>
        </form>
      </Card>

      {/* Recent Expense Entries */}
      {summary && (
        <Card padding="md" className="space-y-4">
          <h2 className="text-base font-heading font-bold text-text-primary">
            Recent Expense Entries
          </h2>

          <div className="divide-y divide-border-subtle/60 text-sm">
            {summary.recentExpenses.map((exp) => (
              <div key={exp.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">{exp.description}</span>
                    <Badge variant="default" size="sm">
                      {exp.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-text-muted">{exp.expenseDate}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-text-primary">
                    {formatINR(exp.amountINR)}
                  </span>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    aria-label={`Delete ${exp.description}`}
                    className="text-xs text-text-muted hover:text-accent-coral cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
