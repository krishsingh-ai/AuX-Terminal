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
} from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import GoldIngotGraphic from '../components/ui/GoldIngotGraphic';
import { useAuth } from '../hooks/useAuth';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pairwiseData } from '../data/mockData';
import { pageMotionVariants, pageMotionTransition } from '../utils/motion';

export const Home: React.FC = () => {
  useDocumentTitle('AuX | Commodity Derivatives Intelligence Terminal');
  const { tickers } = useAuth();

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
        {/* Institutional 3D Gold Bar Atmosphere */}
        <div className="absolute top-0 right-0 w-full lg:w-7/12 h-full z-0 pointer-events-none flex justify-center lg:justify-end items-center overflow-hidden opacity-30 sm:opacity-40 dark:opacity-45">
          <GoldIngotGraphic className="w-[320px] sm:w-[460px] lg:w-[580px] -rotate-6 lg:translate-x-12" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Hero Text) */}
          <AnimateIn className="lg:col-span-7 relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-[#121215]/90 text-slate-700 dark:text-zinc-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Institutional Gold Terminal — Demo
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.08]">
                Next-Generation Gold Derivatives Intelligence.
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                AuX is a next-generation commodity derivatives intelligence platform engineered for quantitative researchers, commodity desks, and institutional traders. By synthesizing multi-tenor implied volatilities, physical inventory flows, and macroeconomic risk factors, AuX delivers uncompromised clarity in gold pricing dynamics.
              </p>

              <div className="space-y-3 pt-2">
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
                <p className="text-xs font-mono text-slate-400 dark:text-zinc-500">
                  Press Ctrl+K for command palette
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Right Column: Live Market Snapshot Card */}
          <AnimateIn delay={0.1} className="lg:col-span-5 relative z-20">
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/85 dark:bg-[#121215]/85 backdrop-blur-md p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 dark:hover:shadow-[0_10px_25px_-3px_rgba(251,191,36,0.15)] space-y-4">
            {/* Top Badge Row */}
            <div className="flex items-center justify-between pb-1">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-slate-600 dark:text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>SAMPLE GOLD FEED (MCX SPECIFICATIONS)</span>
              </div>
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 pb-2 border-b border-slate-200 dark:border-zinc-800/80">
              <span>Symbol</span>
              <span className="text-center">Price</span>
              <span className="text-right">Change</span>
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
                  return (
                    <div
                      key={t.symbol}
                      className="grid grid-cols-3 items-center text-xs sm:text-sm"
                    >
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {t.symbol}
                      </span>
                      <span className="font-mono text-slate-800 dark:text-zinc-200 text-center font-medium">
                        ₹{t.price.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`font-mono text-right flex items-center justify-end gap-1 font-medium ${
                          isPositive
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isPositive ? (
                          <>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                            <span>▲ {t.changePercent}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                            <span>▼ {absPercent}%</span>
                          </>
                        )}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Section: Pairwise Signal */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800/80 space-y-2.5">
              {!pairwiseData ? (
                <div className="py-2 text-center text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  Market data unavailable
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                        PAIRWISE SIGNAL
                      </span>
                      <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        GOLDM vs GOLDTEN
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 text-[#EAB308] dark:text-[#FBBF24]">
                      {pairwiseData.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <span className="text-slate-500 dark:text-zinc-400">Z-Score:</span>
                    <span className="font-mono font-bold text-sm text-[#EAB308] dark:text-[#FBBF24]">
                      +{pairwiseData.zScore.toFixed(2)}σ
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-zinc-400">Current Spread:</span>
                    <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      ₹{pairwiseData.currentSpread.toFixed(2)}/g
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </AnimateIn>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature Card 1 */}
        <AnimateIn delay={0.15}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 space-y-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 dark:hover:shadow-[0_10px_25px_-3px_rgba(251,191,36,0.15)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24] shadow-xs">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Volatility Surface &amp; Term Structure
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Simulated forward basis tracking and cross-tenor spread modeling across active MCX gold contracts.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800/80">
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#EAB308] dark:text-[#FBBF24]">
                ATM Vol: 14.82% • 30D Skew: -1.24%
              </span>
            </div>
          </div>
        </AnimateIn>

        {/* Feature Card 2 */}
        <AnimateIn delay={0.2}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 space-y-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 dark:hover:shadow-[0_10px_25px_-3px_rgba(251,191,36,0.15)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24] shadow-xs">
                <Activity className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Systematic Relative-Value Backtesting
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Deterministic walk-forward backtesting with transaction costs, slippage models, and automated stop-loss regimes tailored for calendar spreads.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800/80">
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#EAB308] dark:text-[#FBBF24]">
                Sharpe: 2.41 • Max DD: -3.8%
              </span>
            </div>
          </div>
        </AnimateIn>

        {/* Feature Card 3 */}
        <AnimateIn delay={0.25}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 space-y-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 dark:hover:shadow-[0_10px_25px_-3px_rgba(251,191,36,0.15)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24] shadow-xs">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Physical-to-Financial Basis Analytics
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Analyze domestic spot basis analytics and cross-tenor spreads across MCX gold futures contracts for relative-value detection.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800/80">
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#EAB308] dark:text-[#FBBF24]">
                Basis: +₹142/10g • Z-Score: +2.18σ
              </span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </motion.div>
  );
};

export default Home;
