import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Percent,
  DollarSign,
  ArrowDownRight,
  Layers,
  PlayCircle,
  Loader2,
  Sliders,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  Clock,
  Scale,
} from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import { useTheme } from '../hooks/useTheme';
import {
  runWalkForwardSimulation,
  type BacktestConfig,
} from '../data/mockData';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAuth } from '../hooks/useAuth';
import { pageMotionVariants, pageMotionTransition } from '../utils/motion';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomEquityTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#18181B] shadow-xl text-xs font-mono space-y-1.5 min-w-[200px]">
        <p className="font-semibold text-slate-500 dark:text-zinc-400 mb-1 border-b border-slate-100 dark:border-zinc-800 pb-1">
          Period: {label}
        </p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex justify-between items-center gap-4">
            <span style={{ color: entry.color }} className="font-medium">
              {entry.name}:
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              ₹{Number(entry.value).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomDrawdownTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = Number(payload[0]?.value ?? 0);
    return (
      <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#18181B] shadow-xl text-xs font-mono space-y-1 min-w-[160px]">
        <p className="font-semibold text-slate-500 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800 pb-1">
          Month: {label}
        </p>
        <div className="flex justify-between items-center gap-4 text-rose-500 font-bold">
          <span>Drawdown:</span>
          <span>{val.toFixed(2)}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export const Backtest: React.FC = () => {
  useDocumentTitle('Walk-Forward Backtest | AuX Terminal');
  const { theme } = useTheme();
  const { incrementStat, showToast } = useAuth();

  // Strategy Configuration State
  const [strategy, setStrategy] = useState<'calendar-spread' | 'purity-basis' | 'term-roll'>('calendar-spread');
  const [lookbackDays, setLookbackDays] = useState<15 | 30 | 60>(30);
  const [entryZ, setEntryZ] = useState<1.5 | 2.0 | 2.5>(2.0);
  const [exitZ, setExitZ] = useState<0.0 | 0.25 | 0.5>(0.25);
  const [stopLossZ, setStopLossZ] = useState<3.0 | 3.5 | 4.0>(3.5);
  const [frictionModel, setFrictionModel] = useState<'statutory' | 'zero' | 'stress'>('statutory');

  // Active Chart View
  const [chartView, setChartView] = useState<'equity' | 'drawdown'>('equity');
  const [isRunning, setIsRunning] = useState(false);

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#27272A' : '#E5E7EB';
  const textColor = isDark ? '#A1A1AA' : '#6B7280';
  const benchmarkColor = isDark ? '#71717A' : '#9CA3AF';

  // Config object memoized
  const activeConfig: BacktestConfig = useMemo(() => ({
    strategy,
    pair: strategy === 'calendar-spread' ? 'GOLDM 26OCT / 26DEC' : strategy === 'purity-basis' ? 'GOLDM 995 / GOLDTEN 999' : 'GOLDM Far Contango',
    lookbackDays,
    entryZ,
    exitZ,
    stopLossZ,
    frictionModel,
  }), [strategy, lookbackDays, entryZ, exitZ, stopLossZ, frictionModel]);

  // Run simulation engine deterministically
  const simulationResult = useMemo(() => {
    return runWalkForwardSimulation(activeConfig);
  }, [activeConfig]);

  const { metrics, equityCurve, drawdownCurve, monthlyBreakdown } = simulationResult;

  const handleRunBacktest = () => {
    setIsRunning(true);
    incrementStat('backtestsRun');
    setTimeout(() => {
      setIsRunning(false);
      showToast(`Simulation updated — ${metrics.totalTrades} trades processed (${metrics.winRate}% win rate)`);
    }, 700);
  };

  return (
    <motion.div
      variants={pageMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageMotionTransition}
      className="space-y-8 py-6"
    >
      {/* Header */}
      <AnimateIn>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-[#121215]/90 text-slate-700 dark:text-zinc-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
            <BarChart3 className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
            Walk-Forward Quantitative Simulation Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Walk-Forward Backtest
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Deterministic out-of-sample backtesting with regulatory transaction cost models, slippage, and zero look-ahead bias across Multi Commodity Exchange of India (MCX) gold derivatives.
          </p>
        </div>
      </AnimateIn>

      {/* Interactive Strategy Configuration Panel */}
      <AnimateIn delay={0.05}>
        <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 sm:p-7 space-y-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24]">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Strategy Calibration &amp; Execution Gates
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Tune mathematical parameters to re-run out-of-sample simulation dynamically
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleRunBacktest}
              disabled={isRunning}
              icon={isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
            >
              {isRunning ? 'Calculating...' : 'Re-run Walk-Forward Simulation'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Strategy Select */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
                Target Quantitative Strategy
              </label>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value as any)}
                className="w-full text-xs font-mono rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181B] px-3 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAB308]/50"
              >
                <option value="calendar-spread">MCX Gold Mini Calendar Spread (GOLDM Oct / Dec)</option>
                <option value="purity-basis">Purity Basis Reversion (GOLDM 995 vs GOLDTEN 999)</option>
                <option value="term-roll">Term Roll Yield (Far-Month Contango Carry)</option>
              </select>
              <p className="text-[11px] text-zinc-500">
                {strategy === 'calendar-spread'
                  ? 'Exploits mean-reverting basis disparities between front and deferred monthly contracts.'
                  : strategy === 'purity-basis'
                  ? 'Captures institutional refinery premiums between 99.5% and 99.9% fineness bars.'
                  : 'Systematic roll capture across upward sloping contango term structures.'}
              </p>
            </div>

            {/* Lookback Window */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
                Rolling Lookback Window (μ, σ)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 30, 60].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setLookbackDays(days as any)}
                    className={`py-2 px-3 text-xs font-mono font-semibold rounded-xl border transition-all ${
                      lookbackDays === days
                        ? 'bg-[#EAB308]/15 border-[#EAB308] text-[#EAB308] dark:text-[#FBBF24]'
                        : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181B] text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-zinc-500">
                Determines the rolling sample window for spread moving average and standard deviation.
              </p>
            </div>

            {/* Friction Model Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
                Transaction Friction Schedule
              </label>
              <select
                value={frictionModel}
                onChange={(e) => setFrictionModel(e.target.value as any)}
                className="w-full text-xs font-mono rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181B] px-3 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAB308]/50"
              >
                <option value="statutory">Full Statutory Schedule (MCX, CTT, SEBI, GST, 0.5 Tick)</option>
                <option value="zero">Zero Friction Baseline (Theoretical Gross)</option>
                <option value="stress">High Slippage Stress Test (1.5 Tick Slippage)</option>
              </select>
              <p className="text-[11px] text-zinc-500">
                {frictionModel === 'statutory'
                  ? 'Standard institutional execution: 0.0021% MCX, 0.0125% CTT, 18% GST + 1 tick slippage.'
                  : frictionModel === 'zero'
                  ? 'Pure mathematical baseline with zero transactional or exchange friction.'
                  : 'Stressed liquidity scenario with triple execution slippage during high-volatility prints.'}
              </p>
            </div>

            {/* Entry Threshold */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Entry Gate (Z-Score Threshold)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1.5, 2.0, 2.5].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setEntryZ(z as any)}
                    className={`py-2 px-3 text-xs font-mono font-semibold rounded-xl border transition-all ${
                      entryZ === z
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181B] text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    |z| &gt; {z.toFixed(1)}σ
                  </button>
                ))}
              </div>
            </div>

            {/* Exit Threshold */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Exit Gate (Mean-Reversion Target)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[0.0, 0.25, 0.5].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setExitZ(z as any)}
                    className={`py-2 px-3 text-xs font-mono font-semibold rounded-xl border transition-all ${
                      exitZ === z
                        ? 'bg-[#EAB308]/15 border-[#EAB308] text-[#EAB308] dark:text-[#FBBF24]'
                        : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181B] text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    |z| ≤ {z.toFixed(2)}σ
                  </button>
                ))}
              </div>
            </div>

            {/* Stop Loss Threshold */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Stop-Loss Threshold (Divergence Cut)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[3.0, 3.5, 4.0].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setStopLossZ(z as any)}
                    className={`py-2 px-3 text-xs font-mono font-semibold rounded-xl border transition-all ${
                      stopLossZ === z
                        ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                        : 'border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181B] text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    |z| ≥ {z.toFixed(1)}σ
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Top Metric Cards: 6-Card Comprehensive Quantitative Performance Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: Total Trades */}
        <AnimateIn delay={0.08}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 space-y-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
              <span className="text-xs font-semibold">Total Trades</span>
              <Layers className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {metrics.totalTrades}
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Deterministic walk-forward fills
            </p>
          </div>
        </AnimateIn>

        {/* Card 2: Win Rate */}
        <AnimateIn delay={0.1}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 space-y-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
              <span className="text-xs font-semibold">Win Rate</span>
              <Percent className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {metrics.winRate}%
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              {Math.round((metrics.totalTrades * metrics.winRate) / 100)}W / {metrics.totalTrades - Math.round((metrics.totalTrades * metrics.winRate) / 100)}L
            </p>
          </div>
        </AnimateIn>

        {/* Card 3: Net Cumulative PnL */}
        <AnimateIn delay={0.12}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 space-y-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
              <span className="text-xs font-semibold">Net P&amp;L (After Drag)</span>
              <DollarSign className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#EAB308] dark:text-[#FBBF24]">
              +₹{(metrics.netPnl / 100000).toFixed(2)}L
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Gross: ₹{(metrics.grossPnl / 100000).toFixed(2)}L (Friction: ₹{(metrics.frictionDrag / 1000).toFixed(0)}k)
            </p>
          </div>
        </AnimateIn>

        {/* Card 4: Sharpe & Sortino */}
        <AnimateIn delay={0.14}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 space-y-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
              <span className="text-xs font-semibold">Sharpe Ratio</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {metrics.sharpeRatio}
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Sortino: {metrics.sortinoRatio} • Calmar: {metrics.calmarRatio}
            </p>
          </div>
        </AnimateIn>

        {/* Card 5: Max Drawdown */}
        <AnimateIn delay={0.16}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 space-y-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
              <span className="text-xs font-semibold">Max Drawdown</span>
              <ArrowDownRight className="w-4 h-4 text-rose-500" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400">
              {metrics.maxDrawdown}%
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Peak-to-trough recovery: 18D
            </p>
          </div>
        </AnimateIn>

        {/* Card 6: Profit Factor & Duration */}
        <AnimateIn delay={0.18}>
          <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 space-y-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
              <span className="text-xs font-semibold">Profit Factor</span>
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {metrics.profitFactor}
            </div>
            <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Avg Hold: {metrics.avgDurationDays} Trading Days
            </p>
          </div>
        </AnimateIn>
      </div>

      {/* Interactive Visualizations: Equity Curve vs Underwater Drawdown */}
      <AnimateIn delay={0.2}>
        <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 sm:p-7 space-y-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800/80">
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {chartView === 'equity'
                  ? 'Walk-Forward Cumulative Equity Curve (₹10.0L Seed Capital)'
                  : 'Underwater Drawdown Profile (% Peak-to-Trough)'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                {chartView === 'equity'
                  ? 'Real-world out-of-sample portfolio growth net of statutory MCX friction vs. passive bullion hold'
                  : 'Historical capital drawdown distribution over the 12-month walk-forward horizon'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-[#18181B] border border-slate-200 dark:border-zinc-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setChartView('equity')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartView === 'equity'
                      ? 'bg-white dark:bg-[#27272A] text-slate-900 dark:text-slate-100 font-bold shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Cumulative Equity
                </button>
                <button
                  type="button"
                  onClick={() => setChartView('drawdown')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartView === 'drawdown'
                      ? 'bg-white dark:bg-[#27272A] text-rose-500 font-bold shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Underwater Drawdown
                </button>
              </div>

              {chartView === 'equity' && (
                <div className="hidden md:flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-2 bg-[#10B981] rounded-xs"></span>
                    <span className="text-slate-700 dark:text-zinc-300 font-semibold">AuX Strategy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dashed border-zinc-400"></span>
                    <span className="text-slate-400">MCX Gold Bullion</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-64 sm:h-80 w-full pt-2">
            {chartView === 'equity' ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityCurve} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="equityEmerald" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis
                    dataKey="month"
                    stroke={textColor}
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: gridColor }}
                    fontFamily="JetBrains Mono"
                  />
                  <YAxis
                    stroke={textColor}
                    fontSize={11}
                    width={52}
                    tickLine={false}
                    axisLine={{ stroke: gridColor }}
                    fontFamily="JetBrains Mono"
                    tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                    domain={['dataMin - 50000', 'dataMax + 50000']}
                  />
                  <Tooltip content={<CustomEquityTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    name="Gold Bullion (Hold)"
                    stroke={benchmarkColor}
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    name="AuX Relative-Value"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#equityEmerald)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={drawdownCurve} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="drawdownRose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis
                    dataKey="month"
                    stroke={textColor}
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: gridColor }}
                    fontFamily="JetBrains Mono"
                  />
                  <YAxis
                    stroke={textColor}
                    fontSize={11}
                    width={46}
                    tickLine={false}
                    axisLine={{ stroke: gridColor }}
                    fontFamily="JetBrains Mono"
                    tickFormatter={(val) => `${val}%`}
                    domain={[-6, 0]}
                  />
                  <Tooltip content={<CustomDrawdownTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="drawdown"
                    name="Peak Drawdown"
                    stroke="#F43F5E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#drawdownRose)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </AnimateIn>

      {/* Monthly Return Breakdown Table */}
      <AnimateIn delay={0.22}>
        <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-5 sm:p-7 space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Monthly Return &amp; Trade Breakdown
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Out-of-sample monthly realization with trade frequency and net cash P&amp;L
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-500">
              Horizon: 12 Rolling Execution Windows
            </div>
          </div>

          <div className="overflow-x-auto -mx-5 sm:mx-0">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-[#18181B] text-slate-500 dark:text-zinc-400 border-y border-slate-200 dark:border-zinc-800">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Month</th>
                  <th className="py-2.5 px-4 font-semibold text-right">AuX Return</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Benchmark</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Net P&amp;L (INR)</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Fills Count</th>
                  <th className="py-2.5 px-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {monthlyBreakdown.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {row.month} 2026
                    </td>
                    <td className={`py-2.5 px-4 text-right font-bold ${row.strategyReturn >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {row.strategyReturn >= 0 ? `+${row.strategyReturn.toFixed(2)}%` : `${row.strategyReturn.toFixed(2)}%`}
                    </td>
                    <td className="py-2.5 px-4 text-right text-zinc-500">
                      {row.benchmarkReturn >= 0 ? `+${row.benchmarkReturn.toFixed(2)}%` : `${row.benchmarkReturn.toFixed(2)}%`}
                    </td>
                    <td className={`py-2.5 px-4 text-right font-semibold ${row.netPnl >= 0 ? 'text-slate-900 dark:text-slate-100' : 'text-rose-500'}`}>
                      {row.netPnl >= 0 ? `+₹${row.netPnl.toLocaleString('en-IN')}` : `-₹${Math.abs(row.netPnl).toLocaleString('en-IN')}`}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-600 dark:text-zinc-400">
                      {row.trades}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.strategyReturn >= 0
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {row.strategyReturn >= 0 ? 'PROFITABLE' : 'DRAWDOWN'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimateIn>

      {/* Alpha Decomposition Section */}
      <div className="space-y-4">
        <AnimateIn delay={0.24}>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Alpha Decomposition &amp; Factor Sensitivity
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Factor attribution separating passive commodity beta drift from genuine idiosyncratic statistical arbitrage edge
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Underlying Gold Drift */}
          <AnimateIn delay={0.26}>
            <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 space-y-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50">
              <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
                <span className="text-xs font-semibold">Underlying Gold Drift</span>
                <TrendingUp className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-mono text-3xl font-bold text-slate-900 dark:text-slate-100">
                +{metrics.alphaDecomposition.underlyingGoldDrift}%
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Passive buy-and-hold capital return of MCX physical gold bullion over the matching 12-month backtest horizon.
              </p>
            </div>
          </AnimateIn>

          {/* Card 2: Net Relative-Value Return */}
          <AnimateIn delay={0.28}>
            <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 space-y-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50">
              <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
                <span className="text-xs font-semibold">Net Relative-Value Return</span>
                <ShieldCheck className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
              </div>
              <div className="font-mono text-3xl font-bold text-[#EAB308] dark:text-[#FBBF24]">
                +{metrics.alphaDecomposition.netRelativeValueReturn}%
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Pure idiosyncratic alpha generated through calendar spread mean-reversion, net of brokerage, exchange turnover fees, and CTT.
              </p>
            </div>
          </AnimateIn>

          {/* Card 3: Market Beta */}
          <AnimateIn delay={0.3}>
            <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 space-y-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50">
              <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
                <span className="text-xs font-semibold">Market Beta (β)</span>
                <BarChart3 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="font-mono text-3xl font-bold text-slate-900 dark:text-slate-100">
                {metrics.alphaDecomposition.marketBeta.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Near-zero directional market sensitivity confirming true market-neutral calendar spread statistical arbitrage.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Strategy Assumptions & Methodology Panel */}
      <AnimateIn delay={0.32}>
        <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-[#09090B] p-6 sm:p-8 space-y-4 shadow-inner">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
            <Clock className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
            Quantitative Assumptions &amp; Model Execution Governance
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-600 dark:text-zinc-400">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#EAB308]" />
                Zero Look-Ahead Bias Protocol
              </span>
              <p className="text-[11px] leading-relaxed">
                Spread cointegration signals are evaluated strictly at day T close. Order execution fills at day T+1 open VWAP with mandatory 1-tick slippage deduction.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#EAB308]" />
                Walk-Forward Window Calibration
              </span>
              <p className="text-[11px] leading-relaxed">
                Rolling 180-day calibration training window followed by a 30-day out-of-sample forward execution test to avoid parameter overfitting.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                Mandatory Contract Roll Policy
              </span>
              <p className="text-[11px] leading-relaxed">
                All open spread positions undergo mandatory liquidation exactly 4 business days prior to tender delivery notice periods to eliminate physical delivery obligations.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-500" />
                Financing &amp; Margin Allocation
              </span>
              <p className="text-[11px] leading-relaxed">
                Unallocated cash balances earn interest at the RBI benchmark repo rate (6.50% annualized). Margin utilization is capped at 65% of available portfolio equity.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </motion.div>
  );
};

export default Backtest;