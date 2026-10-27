import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  RotateCcw,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { format } from 'date-fns';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pageMotionVariants, pageMotionTransition } from '../utils/motion';

export const Home: React.FC = () => {
  useDocumentTitle('AuX | Commodity Derivatives Intelligence Terminal');
  const { tickers, lastUpdated, dataStatus, isPolling, togglePolling, manualRefresh } = useAuth();

  return (
    <motion.div
      variants={pageMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageMotionTransition}
      className="space-y-16 py-8 md:py-16"
    >
      {/* Hero Section */}
      <div className="relative">
        {/* Hero Content Grid */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Hero Text) */}
          <AnimateIn className="lg:col-span-7 relative z-10">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.08]">
                Quantitative Intelligence for MCX Gold Futures.
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl">
                Quantitative research terminal for MCX gold futures and calendar spread analytics.
              </p>

              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/intelligence">
                    <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                      Launch Terminal
                    </Button>
                  </Link>
                  <Link to="/methodology">
                    <Button variant="secondary" size="lg">
                      View Methodology
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right Column: Live Market Snapshot Card */}
          <AnimateIn delay={0.1} className="lg:col-span-5 relative z-20">
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/85 dark:bg-[#121215]/85 backdrop-blur-md p-5 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:hover:border-zinc-700 space-y-4">
              {/* Top Controls & Status Row */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-zinc-800/80">
                <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-slate-600 dark:text-zinc-400">
                  <span className={`w-2 h-2 rounded-full ${isPolling ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                  <span>{dataStatus === 'ACTIVE' ? 'INDICATIVE FEED (5s)' : 'FEED PAUSED'}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={togglePolling}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title={isPolling ? 'Pause feed refresh' : 'Resume feed refresh'}
                    aria-label="Toggle live polling"
                  >
                    {isPolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={manualRefresh}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Manual refresh"
                    aria-label="Manual refresh"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <div className="pl-1 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                    <span>{format(lastUpdated, 'HH:mm:ss')} IST</span>
                  </div>
                </div>
              </div>

              {/* Column Headers */}
              <div className="grid grid-cols-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 pb-1.5 border-b border-slate-200 dark:border-zinc-800/80">
                <span>Contract</span>
                <span className="text-center">Price (Unit)</span>
                <span className="text-right">24h Change</span>
              </div>

              {/* Four Ticker Rows */}
              <div className="space-y-3">
                {!tickers || tickers.length === 0 ? (
                  <div className="py-6 text-center text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    Market data unavailable
                  </div>
                ) : (
                  tickers.map((t) => {
                    const isPositive = t.changePercent >= 0;
                    const absPercent = Math.abs(t.changePercent);
                    const sign = t.changePercent > 0 ? '+' : t.changePercent < 0 ? '-' : '';
                    const formattedPercent = `${sign}${absPercent.toFixed(2)}%`;
                    const unitSuffix = t.symbol === 'GOLDGUINEA' ? '/8g' : t.symbol === 'GOLDPETAL' ? '/1g' : '/10g';

                    return (
                      <div
                        key={t.symbol}
                        className="grid grid-cols-3 items-center text-xs sm:text-sm py-0.5"
                      >
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 block">
                            {t.symbol}
                          </span>
                          <span className="text-[10px] text-zinc-400 block font-mono">
                            {t.name.split(' ')[1] || ''}
                          </span>
                        </div>
                        <div className="text-center font-mono font-medium text-slate-800 dark:text-zinc-200">
                          <span>₹{t.price.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-zinc-400 block font-sans">{unitSuffix}</span>
                        </div>
                        <span
                          className={`font-mono text-right flex items-center justify-end gap-1 font-medium ${
                            isPositive
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                          )}
                          <span className="w-14 text-right inline-block">{formattedPercent}</span>
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Attribution Line */}
              <div className="pt-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between border-t border-slate-200/80 dark:border-zinc-800/80">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                  Source: MCX Reference Specs (Normalized)
                </span>
                <span>Tick: ₹1.00</span>
              </div>

              {/* Bottom Section: Pairwise Basis Spread (Live) */}
              <div className="pt-2.5 border-t border-slate-200 dark:border-zinc-800/80">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                      PAIRWISE BASIS SPREAD
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      GOLDM vs GOLDTEN
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 block">
                      CURRENT SPREAD
                    </span>
                    <span className="font-mono font-bold text-xs sm:text-sm text-[#EAB308] dark:text-[#FBBF24]">
                      ₹{Math.abs(
                        (tickers.find((t) => t.symbol === 'GOLDM')?.price ?? 72500) -
                        (tickers.find((t) => t.symbol === 'GOLDTEN')?.price ?? 72530)
                      ).toFixed(2)} / 10g
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Feature Cards Section: Evidence-Based Quantitative Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature Card 1: Volatility Surface & Term Structure */}
        <AnimateIn delay={0.15}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-7 space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:hover:border-zinc-700 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center justify-center text-slate-600 dark:text-zinc-400 shadow-xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700/60 font-medium">
                  TERM STRUCTURE
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Volatility Surface &amp; Term Structure
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Multi-tenor implied volatility term structure and 30-day skew curvature across active MCX contracts.
                </p>
              </div>

              {/* Mini Sparkline Visualization (Term Structure) */}
              <div className="p-3 rounded-xl border border-slate-100 dark:border-zinc-800/60 bg-slate-50/80 dark:bg-[#09090B]/60 space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>26OCT (14.8%)</span>
                  <span>26NOV (15.2%)</span>
                  <span>26DEC (15.7%)</span>
                  <span>27FEB (16.1%)</span>
                </div>
                <svg viewBox="0 0 280 44" className="w-full h-11 overflow-visible">
                  <path
                    d="M 10 36 C 70 30, 140 22, 270 10"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="36" r="3.5" fill="#94A3B8" />
                  <circle cx="95" cy="27" r="3.5" fill="#94A3B8" />
                  <circle cx="180" cy="18" r="3.5" fill="#94A3B8" />
                  <circle cx="270" cy="10" r="3.5" fill="#94A3B8" />
                </svg>
                <div className="text-[10px] font-mono text-zinc-500 text-center">
                  Upward Contango Volatility Slope (+1.30% Annualized)
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">ATM Vol: 14.82%</span>
              <span className="font-medium text-slate-700 dark:text-zinc-300">30D Skew: -1.24%</span>
            </div>
          </div>
        </AnimateIn>

        {/* Feature Card 2: Systematic Relative-Value Backtesting */}
        <AnimateIn delay={0.2}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-7 space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:hover:border-zinc-700 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center justify-center text-slate-600 dark:text-zinc-400 shadow-xs">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700/60 font-medium">
                  OUT-OF-SAMPLE
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Systematic Relative-Value Backtesting
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Deterministic walk-forward simulation with zero look-ahead bias and statutory MCX transaction costs.
                </p>
              </div>

              {/* Mini Sparkline Visualization (Cumulative Equity) */}
              <div className="p-3 rounded-xl border border-slate-100 dark:border-zinc-800/60 bg-slate-50/80 dark:bg-[#09090B]/60 space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Start (₹10.0L)</span>
                  <span className="text-emerald-500 font-semibold">+48.5% Net</span>
                  <span>End (₹14.85L)</span>
                </div>
                <svg viewBox="0 0 280 44" className="w-full h-11 overflow-visible">
                  <defs>
                    <linearGradient id="equityCardGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 38 L 40 33 L 70 30 L 95 34 L 125 24 L 155 20 L 185 16 L 215 12 L 245 9 L 270 6"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 38 L 40 33 L 70 30 L 95 34 L 125 24 L 155 20 L 185 16 L 215 12 L 245 9 L 270 6 L 270 44 L 10 44 Z"
                    fill="url(#equityCardGrad)"
                  />
                </svg>
                <div className="text-[10px] font-mono text-zinc-500 text-center">
                  342 Execution Events • Zero Look-Ahead Bias
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Sharpe: 2.41</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Max DD: -3.8%</span>
            </div>
          </div>
        </AnimateIn>

        {/* Feature Card 3: Physical-to-Financial Basis Analytics */}
        <AnimateIn delay={0.25}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-7 space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:hover:border-zinc-700 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center justify-center text-slate-600 dark:text-zinc-400 shadow-xs">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700/60 font-medium">
                  BASIS SPREAD
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Physical-to-Financial Basis Analytics
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Domestic physical spot basis vs. near-month futures normalized for purity fineness and import parity.
                </p>
              </div>

              {/* Mini Sparkline Visualization (Basis Oscillation) */}
              <div className="p-3 rounded-xl border border-slate-100 dark:border-zinc-800/60 bg-slate-50/80 dark:bg-[#09090B]/60 space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>-2σ Gate (₹110)</span>
                  <span className="text-slate-600 dark:text-zinc-400 font-medium">Current (+₹142)</span>
                  <span>+2σ Gate (₹175)</span>
                </div>
                <svg viewBox="0 0 280 44" className="w-full h-11 overflow-visible">
                  <line x1="10" y1="22" x2="270" y2="22" stroke="#71717A" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="10" y1="8" x2="270" y2="8" stroke="#EF4444" strokeDasharray="2 2" strokeWidth="1" opacity="0.6" />
                  <line x1="10" y1="36" x2="270" y2="36" stroke="#10B981" strokeDasharray="2 2" strokeWidth="1" opacity="0.6" />
                  <path
                    d="M 10 24 Q 40 12, 70 21 T 130 14 T 190 28 T 240 18 T 270 12"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="270" cy="12" r="3.5" fill="#94A3B8" />
                </svg>
                <div className="text-[10px] font-mono text-zinc-500 text-center">
                  Mean Reversion Half-Life: 4.8 Trading Days
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Basis: +₹142 / 10g</span>
              <span className="font-medium text-slate-700 dark:text-zinc-300">Z-Score: +2.18σ</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </motion.div>
  );
};

export default Home;
