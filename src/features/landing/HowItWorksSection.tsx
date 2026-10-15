import { motion } from 'motion/react';
import { Badge } from '../../components/ui/Badge';
import { WalletIcon, ChefHatIcon, SparklesIcon } from '../../components/ui/Icons';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function HowItWorksSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const steps = [
    {
      number: '01',
      title: 'Set your food budget.',
      description:
        'Choose a daily or weekly allowance in Rupees (e.g. ₹150/day). PlateWise safeguards your savings by splitting it into realistic meal allowances.',
      icon: <WalletIcon size={22} className="text-primary" />,
      color: 'bg-pastel-peach/60 border-[#F2BA9A]',
      accentText: 'Zero Month-End Stress',
    },
    {
      number: '02',
      title: 'Choose preferences & ingredients.',
      description:
        'Select your dietary goals (Veg, High Protein, Under 15 mins) and pick items already lying in your hostel room or fridge.',
      icon: <ChefHatIcon size={22} className="text-[#2E603C]" />,
      color: 'bg-pastel-sage/60 border-[#A8CCAA]',
      accentText: 'Pantry Matching',
    },
    {
      number: '03',
      title: 'Discover meals that match your needs.',
      description:
        'Get transparent, rule-based recommendations scored from 0–100, complete with step-by-step instructions and live price breakdowns.',
      icon: <SparklesIcon size={22} className="text-[#735A00]" />,
      color: 'bg-pastel-butter/80 border-[#F2DA91]',
      accentText: 'Instant Clarity',
    },
  ];

  return (
    <section className="py-12 px-6 sm:px-10 rounded-3xl bg-bg-surface/60 border border-border-default/60 relative overflow-hidden text-left">
      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
        <Badge variant="primary" size="sm" className="gap-1.5">
          Simple 3-Step Experience
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text-primary tracking-tight">
          How PlateWise Works
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Engineered to eliminate hostel dining stress, repetitive mess food, and unplanned takeout expenses.
        </p>
      </div>

      {/* 3 Step Editorial Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.1 }}
            className="flex flex-col justify-between space-y-5 bg-white p-6 sm:p-7 rounded-2xl border border-border-default shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs ${step.color}`}
                >
                  {step.icon}
                </div>
                <span className="font-heading font-black text-3xl text-text-muted/30 font-mono">
                  {step.number}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                  {step.accentText}
                </span>
                <h3 className="font-heading font-bold text-lg text-text-primary leading-snug">
                  {step.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle/80 flex items-center gap-2 text-xs text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
              <span>Realistic Indian student tested</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
