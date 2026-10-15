import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Chip } from '../components/ui/Chip';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { RecipeImage } from '../components/ui/RecipeImage';
import {
  SparklesIcon,
  SearchIcon,
  RupeeIcon,
} from '../components/ui/Icons';
import { formatINR } from '../lib/currency';

export function DesignShowcasePage() {
  const [inputValue, setInputValue] = useState('Maggi & Chai');
  const [activeChip, setActiveChip] = useState('veg');
  const [selectVal, setSelectVal] = useState('lunch');

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6">
        <Badge variant="primary" className="mb-2">
          Hidden Developer Showcase
        </Badge>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary tracking-tight">
          PlateWise Design System & UI Components
        </h1>
        <p className="text-text-secondary text-sm mt-1 max-w-2xl">
          Dark premium theme tokens, accessible interactive states, focus rings, and WCAG AA contrast compliance.
        </p>
      </div>

      {/* 1. Buttons */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" /> 1. Buttons (Variants, States & Sizes)
        </h2>
        <Card padding="md" className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold">
              Variants (Default / Hover / Active)
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary Action</Button>
              <Button variant="primary" leftIcon={<SparklesIcon size={16} />}>
                Smart Recommend
              </Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="ghost">Ghost Action</Button>
              <Button variant="danger">Delete Expense</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold">
              Sizes (sm, md, lg)
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="sm">
                Small (sm)
              </Button>
              <Button variant="secondary" size="md">
                Medium (md)
              </Button>
              <Button variant="secondary" size="lg">
                Large (lg)
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold">
              States (Loading & Disabled)
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" isLoading>
                Saving Expense...
              </Button>
              <Button variant="secondary" isLoading>
                Loading...
              </Button>
              <Button variant="primary" disabled>
                Disabled Primary
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* 2. Form Inputs & Selects */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" /> 2. Form Inputs & Dropdowns
        </h2>
        <Card padding="md" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Search Student Recipes"
            placeholder="e.g. Poha, Khichdi, Egg Fried Rice"
            leftIcon={<SearchIcon size={18} />}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClear={() => setInputValue('')}
            hint="Supports instant keyword matching"
          />

          <Input
            label="Daily Meal Budget"
            type="number"
            placeholder="150"
            leftIcon={<RupeeIcon size={18} />}
            defaultValue="150"
            hint={`Configured budget: ${formatINR(150)}/day`}
          />

          <Input
            label="Expense Amount with Error"
            defaultValue="-50"
            error="Amount must be a positive number greater than ₹0."
          />

          <Select
            label="Meal Type"
            value={selectVal}
            onChange={(e) => setSelectVal(e.target.value)}
            options={[
              { value: 'breakfast', label: 'Breakfast (Morning fuel)' },
              { value: 'lunch', label: 'Lunch (Afternoon main)' },
              { value: 'dinner', label: 'Dinner (Light or hearty)' },
              { value: 'snacks', label: 'Evening Snacks' },
              { value: 'groceries', label: 'Hostel Grocery Stock' },
            ]}
          />
        </Card>
      </section>

      {/* 3. Chips & Badges */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" /> 3. Chips & Dietary Badges
        </h2>
        <Card padding="md" className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold">
              Interactive Filter Chips (Clickable)
            </h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                label="Pure Veg"
                selected={activeChip === 'veg'}
                onSelect={() => setActiveChip('veg')}
              />
              <Chip
                label="Egg Included"
                selected={activeChip === 'egg'}
                onSelect={() => setActiveChip('egg')}
              />
              <Chip
                label="Non-Veg"
                selected={activeChip === 'non-veg'}
                onSelect={() => setActiveChip('non-veg')}
              />
              <Chip
                label="Under ₹40"
                selected={activeChip === 'budget'}
                onSelect={() => setActiveChip('budget')}
              />
              <Chip
                label="High Protein"
                selected={activeChip === 'protein'}
                onSelect={() => setActiveChip('protein')}
              />
              <Chip
                label="Selected Filter (Removable)"
                selected
                onRemove={() => alert('Filter removed')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold">
              Status Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default Gray</Badge>
              <Badge variant="primary">Amber Primary</Badge>
              <Badge variant="success">Emerald Safe</Badge>
              <Badge variant="warning">Amber Caution</Badge>
              <Badge variant="danger">Coral Danger</Badge>
              <Badge variant="info">Blue Info</Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* 4. Progress Bars (Color Shifting) */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" /> 4. Budget Progress Bars (Dynamic Color Shifts)
        </h2>
        <Card padding="md" className="space-y-6">
          <ProgressBar
            label="Safe Daily Spending (< 70%)"
            sublabel={`${formatINR(55)} of ${formatINR(150)} spent`}
            value={55}
            max={150}
          />
          <ProgressBar
            label="Moderate / Warning Spending (70% - 90%)"
            sublabel={`${formatINR(120)} of ${formatINR(150)} spent`}
            value={120}
            max={150}
          />
          <ProgressBar
            label="Critical Spending (> 90%)"
            sublabel={`${formatINR(142)} of ${formatINR(150)} spent`}
            value={142}
            max={150}
          />
          <ProgressBar
            label="Over Budget / Limit Exceeded (> 100%)"
            sublabel={`${formatINR(185)} of ${formatINR(150)} spent`}
            value={185}
            max={150}
          />
        </Card>
      </section>

      {/* 5. Graceful Recipe Image Fallback */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" /> 5. Resilient Recipe Image Fallback
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card padding="sm" className="space-y-2">
            <RecipeImage
              slug="kanda-poha"
              title="Kanda Poha"
              emoji="🍚"
              gradient="from-amber-600/40 via-yellow-700/30 to-slate-900"
            />
            <div className="p-2">
              <h4 className="font-semibold text-sm">Kanda Poha</h4>
              <p className="text-xs text-text-muted">Graceful gradient + emoji avatar</p>
            </div>
          </Card>

          <Card padding="sm" className="space-y-2">
            <RecipeImage
              slug="egg-bhurji"
              title="Egg Bhurji"
              emoji="🍳"
              gradient="from-yellow-600/40 via-orange-800/30 to-slate-950"
            />
            <div className="p-2">
              <h4 className="font-semibold text-sm">Egg Bhurji</h4>
              <p className="text-xs text-text-muted">Zero broken image icon or layout shift</p>
            </div>
          </Card>

          <Card padding="sm" className="space-y-2">
            <RecipeImage
              slug="chicken-curry"
              title="Chicken Curry"
              emoji="🍗"
              gradient="from-red-700/40 via-amber-900/30 to-slate-950"
            />
            <div className="p-2">
              <h4 className="font-semibold text-sm">Chicken Curry</h4>
              <p className="text-xs text-text-muted">Deep obsidian palette integration</p>
            </div>
          </Card>
        </div>
      </section>

      {/* 6. Feedback & Loading States */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" /> 6. Skeletons, Empty & Error States
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="md" className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold">
              Loading Skeletons
            </h3>
            <Skeleton className="w-full h-28" />
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </Card>

          <EmptyState
            title="No Saved Recipes"
            description="Tap the heart icon on any recipe to save it to your hostel favorites."
            actionLabel="Discover Recipes"
            onAction={() => alert('Navigate to /recipes')}
          />

          <ErrorState
            title="Failed to Load Expenses"
            message="Check your connection or mock API state."
            onRetry={() => alert('Retry clicked')}
          />
        </div>
      </section>
    </div>
  );
}
