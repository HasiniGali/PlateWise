import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';
import { WalletIcon, ArrowRightIcon, RupeeIcon, CheckCircleIcon } from '../../components/ui/Icons';
import { formatINR } from '../../lib/currency';

interface MealAllocation {
  slot: string;
  sharePercent: number;
  allocatedINR: number;
  sampleMeal: string;
  mealCostINR: number;
  dishType: string;
}

export function BudgetCalculatorWidget() {
  const [dailyBudget, setDailyBudget] = useState<number>(150);

  const presets = [100, 150, 200];

  // Accurate budget calculations
  const allocations: MealAllocation[] = useMemo(() => {
    const breakfast = Math.round(dailyBudget * 0.25);
    const lunch = Math.round(dailyBudget * 0.42);
    const dinner = Math.max(0, dailyBudget - breakfast - lunch);

    let bMeal = 'Kanda Poha';
    let bCost = 28;
    if (breakfast >= 45) {
      bMeal = 'Egg Bhurji with Bread';
      bCost = 45;
    } else if (breakfast >= 32) {
      bMeal = 'Crispy Moong Dal Chilla';
      bCost = 32;
    }

    let lMeal = 'High-Protein Soya Pulao';
    let lCost = 48;
    if (lunch >= 75) {
      lMeal = 'Spiced Paneer Kathi Wrap';
      lCost = 75;
    } else if (lunch < 40) {
      lMeal = 'South Indian Curd Rice';
      lCost = 30;
    }

    let dMeal = 'Comfort Moong Dal Khichdi';
    let dCost = 42;
    if (dinner >= 80) {
      dMeal = 'Hostel Chicken Curry';
      dCost = 95;
    } else if (dinner < 35) {
      dMeal = 'Tomato Rasam with Rice';
      dCost = 30;
    }

    return [
      {
        slot: 'Breakfast',
        sharePercent: 25,
        allocatedINR: breakfast,
        sampleMeal: bMeal,
        mealCostINR: bCost,
        dishType: 'Morning Fuel',
      },
      {
        slot: 'Lunch',
        sharePercent: 42,
        allocatedINR: lunch,
        sampleMeal: lMeal,
        mealCostINR: lCost,
        dishType: 'Main Afternoon Energy',
      },
      {
        slot: 'Dinner',
        sharePercent: 33,
        allocatedINR: dinner,
        sampleMeal: dMeal,
        mealCostINR: dCost,
        dishType: 'Evening Recovery',
      },
    ];
  }, [dailyBudget]);

  const totalMealCost = allocations.reduce((sum, item) => sum + item.mealCostINR, 0);
  const remainingBudget = Math.max(0, dailyBudget - totalMealCost);

  return (
    <section className="space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-default/60 pb-5">
        <div>
          <Badge variant="warning" size="sm" className="mb-2">
            Interactive Planning Tool
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
            Daily Budget & Meal Allocation
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-1 max-w-xl">
            See how your daily food allowance breaks down into practical breakfast, lunch, and dinner options.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted font-bold">Presets:</span>
          {presets.map((preset) => (
            <Button
              key={preset}
              variant={dailyBudget === preset ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setDailyBudget(preset)}
              className="text-xs font-mono font-bold px-3 py-1.5"
            >
              {formatINR(preset)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Slider & Custom Input */}
        <Card padding="lg" className="lg:col-span-5 space-y-6 bg-white border-border-default">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted block font-heading">
              Configure Allowance
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-secondary flex items-center gap-2">
                <WalletIcon size={18} className="text-primary" /> Daily Budget:
              </span>
              <span className="font-heading font-extrabold text-2xl text-text-primary font-mono">
                {formatINR(dailyBudget)}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min={60}
              max={300}
              step={10}
              value={dailyBudget}
              onChange={(e) => setDailyBudget(Number(e.target.value))}
              aria-label="Daily food budget slider"
              className="w-full h-2.5 bg-[#EFE5DB] rounded-lg appearance-none cursor-pointer accent-[#E07A5F] focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="flex justify-between text-xs text-text-muted font-mono">
              <span>{formatINR(60)} (Tight)</span>
              <span>{formatINR(150)} (Balanced)</span>
              <span>{formatINR(300)} (Flexible)</span>
            </div>
          </div>

          {/* Number Input */}
          <div className="pt-2">
            <label htmlFor="custom-budget-input" className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1.5">
              Or Type Custom Amount:
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                <RupeeIcon size={16} />
              </div>
              <input
                id="custom-budget-input"
                type="number"
                min={40}
                max={500}
                value={dailyBudget}
                onChange={(e) => setDailyBudget(Number(e.target.value))}
                className="w-full bg-bg-surface border border-border-default rounded-xl pl-9 pr-3 py-2 text-sm font-mono font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="p-4 rounded-xl bg-bg-surface border border-border-subtle space-y-1 text-xs">
            <span className="text-text-muted font-semibold uppercase tracking-wider block text-[11px]">
              Weekly Total (7 Days):
            </span>
            <div className="text-xl font-heading font-extrabold text-text-primary font-mono">
              {formatINR(dailyBudget * 7)}
            </div>
            <p className="text-text-secondary">
              Keeping to this prevents cash-flow dips before hostel mess dues.
            </p>
          </div>

          {/* Disclaimer (Mandatory Requirement) */}
          <div className="text-[11px] text-text-muted leading-relaxed bg-[#FFF3E6] p-3 rounded-xl border border-[#F2DAC2]">
            <span className="font-bold text-[#E07A5F]">Estimation Note: </span>
            Example allocations are planning estimates for student food budgeting, not clinical or nutritional prescriptions.
          </div>
        </Card>

        {/* Right Column: 3-Meal Allocation Cards & Remaining Budget */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allocations.map((alloc) => (
              <div
                key={alloc.slot}
                className="p-5 rounded-2xl bg-white border border-border-default space-y-3 shadow-xs hover:border-pastel-peach transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-text-primary">
                    {alloc.slot}
                  </span>
                  <Badge variant="primary" size="sm">
                    {alloc.sharePercent}%
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-text-muted uppercase tracking-wider font-semibold block">
                    Target Allowance:
                  </span>
                  <div className="font-mono font-extrabold text-xl text-primary">
                    {formatINR(alloc.allocatedINR)}
                  </div>
                </div>

                <ProgressBar
                  value={alloc.allocatedINR}
                  max={dailyBudget}
                  showPercent={false}
                  size="sm"
                />

                <div className="pt-2 border-t border-border-subtle text-xs space-y-1">
                  <span className="text-[11px] text-text-muted block">Suggested Meal:</span>
                  <p className="font-semibold text-text-primary">{alloc.sampleMeal}</p>
                  <span className="font-mono text-accent-emerald font-bold block text-[11px]">
                    Cost ~{formatINR(alloc.mealCostINR)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining Daily Buffer Card */}
          <div className="p-5 rounded-2xl bg-white border border-border-default flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider font-heading">
                Daily Buffer / Snack Allowance:
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-2xl text-accent-emerald">
                  {formatINR(remainingBudget)}
                </span>
                <span className="text-xs text-text-secondary">
                  remaining after suggested 3-meal plan
                </span>
              </div>
            </div>

            <Link to={`/recommendations?budget=${dailyBudget}`}>
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRightIcon size={16} />}
                className="w-full sm:w-auto text-xs font-bold px-5 py-2.5"
              >
                View Matches for {formatINR(dailyBudget)}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
