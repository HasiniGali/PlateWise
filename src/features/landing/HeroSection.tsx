import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  SparklesIcon,
  SearchIcon,
  ArrowRightIcon,
  ClockIcon,
  RupeeIcon,
} from '../../components/ui/Icons';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { formatINR } from '../../lib/currency';

export function HeroSection() {
  const [budget, setBudget] = useState<number>(150);
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax offsets (disabled when prefersReducedMotion is true)
  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0px', '0px'] : ['0px', '45px']
  );
  const badgePriceY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0px', '0px'] : ['0px', '-35px']
  );
  const badgeTimeY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0px', '0px'] : ['0px', '30px']
  );
  const badgeSavingsY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0px', '0px'] : ['0px', '-25px']
  );

  const presets = [100, 150, 200];

  const handleFindMeals = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/recommendations?budget=${budget}`);
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-6 pb-16 lg:pb-24 overflow-hidden text-left"
    >
      {/* Decorative Pastel Background Blobs */}
      <div
        className="absolute top-10 left-1/4 w-80 h-80 rounded-full bg-pastel-peach/30 blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 right-10 w-96 h-96 rounded-full bg-pastel-butter/40 blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Editorial Headline & Interactive Budget Input */}
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="primary" size="md" className="gap-2 px-3.5 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#E07A5F]" />
              Smart Student Meal Discovery & Budgeting
            </Badge>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-6xl lg:text-[68px] font-heading font-extrabold text-text-primary tracking-tight leading-[1.08]"
            >
              Eat well.{' '}
              <span className="text-[#E07A5F]">Spend smart.</span>{' '}
              <br className="hidden sm:inline" />
              Feel good.
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-normal"
            >
              Discover delicious meals that fit your budget, match your cravings, and make the most of the ingredients you already have.
            </motion.p>
          </div>

          {/* Interactive Budget Form Container */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-border-default shadow-sm space-y-4 max-w-xl"
          >
            <form onSubmit={handleFindMeals} className="space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label
                  htmlFor="hero-budget-input"
                  className="text-xs font-bold text-text-primary uppercase tracking-wider font-heading"
                >
                  What is your daily meal budget?
                </label>

                {/* Presets */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-text-muted">Presets:</span>
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setBudget(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        budget === p
                          ? 'bg-pastel-peach text-text-primary border border-[#F2BA9A] shadow-xs'
                          : 'bg-bg-surface text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {formatINR(p)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input + Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                    <RupeeIcon size={18} />
                  </div>
                  <input
                    id="hero-budget-input"
                    type="number"
                    min={40}
                    max={500}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    aria-label="Daily meal budget"
                    className="w-full bg-bg-surface border border-border-default rounded-xl pl-10 pr-4 py-3 text-sm font-semibold font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter amount (e.g. 150)"
                  />
                </div>

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  leftIcon={<SparklesIcon size={16} />}
                  className="px-6 py-3 justify-center text-sm font-bold shadow-sm"
                >
                  Find My Meals
                </Button>
              </div>
            </form>

            <div className="pt-2 border-t border-border-subtle/80 flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                Allocates ~{formatINR(Math.round(budget * 0.25))} breakfast, ~{formatINR(Math.round(budget * 0.42))} lunch, ~{formatINR(Math.round(budget * 0.33))} dinner
              </span>

              <Link to="/recipes" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Explore Recipes <ArrowRightIcon size={13} />
              </Link>
            </div>
          </motion.div>

          {/* Secondary CTAs & Trust Badges */}
          <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-text-secondary">
            <Link to="/finder">
              <Button variant="secondary" size="sm" leftIcon={<SearchIcon size={15} />}>
                Find by Pantry Ingredients
              </Button>
            </Link>
            <span className="text-text-muted">•</span>
            <span>18+ Authentic Student Recipes</span>
            <span className="text-text-muted">•</span>
            <span className="text-accent-emerald font-semibold">100% Free for Students</span>
          </div>
        </div>

        {/* Right Column: Editorial Food Photograph with Parallax Floating Badges */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Soft decorative background frame */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-[32px] bg-gradient-to-tr from-pastel-peach/40 via-pastel-pink/30 to-pastel-butter/40 -z-10 blur-xl transform -rotate-1" />

            {/* Parallax Hero Main Image */}
            <motion.div
              style={{ y: heroImageY }}
              className="relative rounded-3xl overflow-hidden shadow-xl shadow-black/8 border-4 border-white bg-white group aspect-[4/3] sm:aspect-[16/12]"
            >
              <img
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=85"
                alt="Freshly prepared Kanda Poha garnished with fresh herbs and crunchy peanuts"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md">
                  Hostel Favorite
                </span>
                <h3 className="font-heading font-extrabold text-xl mt-1 drop-shadow-sm">
                  Authentic Kanda Poha
                </h3>
              </div>
            </motion.div>

            {/* Floating Info Badge 1: Meal Price (Parallax Top Right) */}
            <motion.div
              style={{ y: badgePriceY }}
              className="absolute -top-4 -right-2 sm:-right-4 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-border-default shadow-md shadow-black/6 flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-pastel-peach flex items-center justify-center text-primary font-bold text-xs">
                ₹
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">
                  Meal Cost
                </span>
                <span className="font-heading font-extrabold text-sm text-text-primary">
                  Just ₹28
                </span>
              </div>
            </motion.div>

            {/* Floating Info Badge 2: Prep Time (Parallax Bottom Left) */}
            <motion.div
              style={{ y: badgeTimeY }}
              className="absolute -bottom-5 -left-2 sm:-left-4 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-border-default shadow-md shadow-black/6 flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-pastel-butter flex items-center justify-center text-[#735A00]">
                <ClockIcon size={16} />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">
                  Quick Prep
                </span>
                <span className="font-heading font-extrabold text-sm text-text-primary">
                  Ready in 12m
                </span>
              </div>
            </motion.div>

            {/* Floating Info Badge 3: Budget-Friendly Highlight (Parallax Top Left) */}
            <motion.div
              style={{ y: badgeSavingsY }}
              className="hidden sm:flex absolute top-1/3 -left-8 px-3.5 py-2 rounded-xl bg-pastel-sage/90 backdrop-blur-md border border-[#A8CCAA] shadow-sm items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#2D5A37]" />
              <span className="text-xs font-bold text-[#2D5A37]">
                Save ~₹800/mo vs Canteen
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
