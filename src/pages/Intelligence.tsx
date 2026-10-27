import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  ChevronDown,
  ChevronUp,
  Compass,
  Layers,
  CheckCircle2,
  Loader2,
  Scale,
  Activity,
  FileText,
  AlertCircle,
  Coins,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import { useTheme } from '../hooks/useTheme';
import {
  pairwiseData,
  contractLifecycleData,
  contractSpecifications,
  pairComparisons,
  volatilityTermStructure,
} from '../data/mockData';
import { cn } from '../utils/cn';
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

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#18181B] shadow-xl text-xs font-mono space-y-1">
        <p className="font-semibold text-zinc-500 mb-1">Time: {label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex justify-between gap-4">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              ₹{Number(entry.value).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Intelligence: React.FC = () => {
  useDocumentTitle('Intelligence | AuX Terminal');
  const { theme } = useTheme();
  const { incrementStat } = useAuth();
  const [activeTab, setActiveTab] = useState<'spread' | 'contracts' | 'comparison' | 'volatility'>('spread');
  const [selectedPairId, setSelectedPairId] = useState<string>('goldm-goldten');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const hasCountedSignal = useRef(false);
  const hasCountedContract = useRef(false);

  useEffect(() => {
    if (!hasCountedSignal.current) {
      hasCountedSignal.current = true;
      incrementStat('signalsViewed');
    }
  }, [incrementStat]);

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#27272A' : '#E5E7EB';
  const textColor = isDark ? '#A1A1AA' : '#6B7280';
  const meanColor = isDark ? '#71717A' : '#6B7280';

  const currentPair = pairComparisons.find((p) => p.id === selectedPairId) || pairComparisons[0];

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
            <Compass className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
            Statistical Arbitrage &amp; Spread Surveillance Workspace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Pairwise Intelligence
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-2xl">
            Real-time basis spread analytics, cointegration z-score tracking, contract specifications, and volatility term structure across MCX gold contracts.
          </p>
        </div>
      </AnimateIn>

      {/* Terminal Workspace Tab Selector */}
      <div className="flex border-b border-slate-200 dark:border-zinc-800/80 overflow-x-auto scrollbar-none gap-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('spread')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer',
            activeTab === 'spread'
              ? 'border-[#EAB308] text-[#EAB308] dark:border-[#FBBF24] dark:text-[#FBBF24] font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          )}
        >
          <Activity className="w-4 h-4" />
          <span>Spread &amp; Z-Score Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer',
            activeTab === 'comparison'
              ? 'border-[#EAB308] text-[#EAB308] dark:border-[#FBBF24] dark:text-[#FBBF24] font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          )}
        >
          <Scale className="w-4 h-4" />
          <span>Cross-Contract Comparison</span>
        </button>

        <button
          onClick={() => setActiveTab('contracts')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer',
            activeTab === 'contracts'
              ? 'border-[#EAB308] text-[#EAB308] dark:border-[#FBBF24] dark:text-[#FBBF24] font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          )}
        >
          <FileText className="w-4 h-4" />
          <span>Contract Specifications</span>
        </button>

        <button
          onClick={() => setActiveTab('volatility')}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer',
            activeTab === 'volatility'
              ? 'border-[#EAB308] text-[#EAB308] dark:border-[#FBBF24] dark:text-[#FBBF24] font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
          )}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Volatility Term Structure</span>
        </button>
      </div>

      {/* TAB 1: SPREAD & Z-SCORE ANALYTICS */}
      {activeTab === 'spread' && (
        <div className="space-y-8">
          {/* Top Row: 3 Clean Metric Cards */}
          <AnimateIn delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Z-Score */}
              <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-7 space-y-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 dark:hover:shadow-[0_10px_25px_-3px_rgba(251,191,36,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                    Statistical Z-Score
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    {pairwiseData.status}
                  </span>
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[#EAB308] dark:text-[#FBBF24]">
                  +{pairwiseData.zScore.toFixed(2)}σ
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Within normal 95% stationary bounds (|z| &lt; 2.0). Mean reversion bias active.
                </p>
              </div>

              {/* Card 2: Current Spread */}
              <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-7 space-y-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 dark:hover:shadow-[0_10px_25px_-3px_rgba(251,191,36,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                    Current Spread (Basis)
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {pairwiseData.unit}
                  </span>
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
                  ₹{pairwiseData.currentSpread.toFixed(2)}
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Divergence of <strong className="font-mono text-slate-700 dark:text-zinc-300 font-semibold">+₹11.50</strong> against rolling mean baseline.
                </p>
              </div>

              {/* Card 3: Rolling Mean & Bounds */}
              <div className="h-full rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-7 space-y-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#EAB308]/50 dark:hover:border-[#FBBF24]/50 dark:hover:shadow-[0_10px_25px_-3px_rgba(251,191,36,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                    Rolling Mean (30D)
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Std Dev: ₹{pairwiseData.stdDev.toFixed(2)}
                  </span>
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
                  ₹{pairwiseData.rollingMean.toFixed(2)}
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                  +2σ: ₹{pairwiseData.upperBand.toFixed(1)} • -2σ: ₹{pairwiseData.lowerBand.toFixed(1)}
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Pairwise Intelligence Chart */}
          <AnimateIn delay={0.1}>
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 space-y-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-[#EAB308]/40 dark:hover:border-[#FBBF24]/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800/80">
                <div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Pairwise Intelligence: {pairwiseData.pair}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Intraday basis tracking relative to empirical ±2.0σ Bollinger reversion thresholds (Direction: Near-Month minus Far-Month normalized)
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#06B6D4]"></span>
                    <span className="text-zinc-600 dark:text-zinc-300">Spread</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dashed border-[#A855F7]"></span>
                    <span className="text-[#A855F7]">±2σ Bands</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dotted border-zinc-400"></span>
                    <span className="text-zinc-400">Mean</span>
                  </div>
                </div>
              </div>

              <div className="h-64 sm:h-80 w-full pt-2">
                {!pairwiseData?.chartData || pairwiseData.chartData.length === 0 ? (
                  <div className="h-full w-full flex flex-col items-center justify-center text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    <Loader2 className="w-5 h-5 animate-spin text-[#EAB308] dark:text-[#FBBF24] mb-2" />
                    <span>Loading pairwise chart data...</span>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pairwiseData.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                      <XAxis
                        dataKey="time"
                        stroke={textColor}
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: gridColor }}
                        fontFamily="JetBrains Mono"
                      />
                      <YAxis
                        stroke={textColor}
                        fontSize={11}
                        width={40}
                        tickLine={false}
                        axisLine={{ stroke: gridColor }}
                        fontFamily="JetBrains Mono"
                        domain={['auto', 'auto']}
                      />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="upperBand"
                        name="+2σ Upper Band"
                        stroke="#A855F7"
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="mean"
                        name="Rolling Mean"
                        stroke={meanColor}
                        strokeDasharray="2 2"
                        strokeWidth={1.5}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="lowerBand"
                        name="-2σ Lower Band"
                        stroke="#A855F7"
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="spread"
                        name="Current Spread"
                        stroke="#06B6D4"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5, fill: '#06B6D4' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </AnimateIn>
        </div>
      )}

      {/* TAB 2: CROSS-CONTRACT COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <AnimateIn delay={0.05}>
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800/80">
                <div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Cross-Contract Relative Value Matrix
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Compare normalized price spreads, cointegration p-values, and mean-reversion half-life metrics.
                  </p>
                </div>

                {/* Dropdown Selector */}
                <div className="flex items-center gap-2">
                  <label htmlFor="pair-select" className="text-xs font-mono text-zinc-400">Select Pair:</label>
                  <select
                    id="pair-select"
                    value={selectedPairId}
                    onChange={(e) => setSelectedPairId(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#09090B] text-xs font-mono font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                  >
                    {pairComparisons.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selected Pair Analytical Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-[#09090B]/50 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Normalized Spread</span>
                  <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                    ₹{currentPair.spread.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Mean: ₹{currentPair.rollingMean.toFixed(1)}</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-[#09090B]/50 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Rolling Z-Score</span>
                  <div className="text-2xl font-bold font-mono text-[#EAB308] dark:text-[#FBBF24]">
                    +{currentPair.zScore.toFixed(2)}σ
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Std Dev: ₹{currentPair.stdDev.toFixed(1)}</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-[#09090B]/50 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Mean-Reversion Half-Life</span>
                  <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                    {currentPair.halfLifeDays} Days
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Ornstein-Uhlenbeck fit</span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-[#09090B]/50 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Cointegration (ADF)</span>
                  <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    p = {currentPair.adfPValue}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Stationary at 99% Conf</span>
                </div>
              </div>

              {/* Pair Description & Specification Box */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {currentPair.nearContract} ↔ {currentPair.farContract}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
                    {currentPair.signal}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {currentPair.description}
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      )}

      {/* TAB 3: CONTRACT SPECIFICATIONS & EXPLORER */}
      {activeTab === 'contracts' && (
        <div className="space-y-6">
          <AnimateIn delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contractSpecifications.map((spec) => (
                <div
                  key={spec.symbol}
                  className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-amber-500" />
                        <h3 className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
                          {spec.symbol}
                        </h3>
                      </div>
                      <span className="text-xs text-zinc-500">{spec.name}</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold">
                      Fineness: {spec.purityFineness}/1000
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Trading Unit</span>
                      <span className="font-semibold text-slate-800 dark:text-zinc-200">{spec.tradingUnit}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Quotation Unit</span>
                      <span className="font-semibold text-slate-800 dark:text-zinc-200">{spec.quotationUnit}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Tick Size</span>
                      <span className="font-semibold text-slate-800 dark:text-zinc-200">₹{spec.tickSize.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Lot Weight</span>
                      <span className="font-semibold text-slate-800 dark:text-zinc-200">{spec.lotWeightGrams} Grams</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-zinc-800/80 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Margin:</span>
                      <span className="font-mono font-medium text-slate-700 dark:text-zinc-300">{spec.marginRequirement}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Delivery:</span>
                      <span className="font-mono text-[11px] text-slate-700 dark:text-zinc-300">{spec.deliveryType}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 pt-2 border-t border-slate-200 dark:border-zinc-800/80 leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      )}

      {/* TAB 4: VOLATILITY TERM STRUCTURE */}
      {activeTab === 'volatility' && (
        <div className="space-y-6">
          <AnimateIn delay={0.05}>
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800/80">
                <div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Implied Volatility Term Structure
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Forward volatility term structure modeled across active MCX gold expiries using SVI parametric calibration.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SVI Parametric Fit</span>
                </div>
              </div>

              {/* Term Structure Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-100/80 dark:bg-zinc-800/60 border-b border-slate-200 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 font-semibold">
                      <th className="py-3 px-4">Contract Expiry</th>
                      <th className="py-3 px-4">Days to Expiry (DTE)</th>
                      <th className="py-3 px-4 text-right">ATM Implied Vol (σ)</th>
                      <th className="py-3 px-4 text-right">25Δ Call Vol</th>
                      <th className="py-3 px-4 text-right">25Δ Put Vol</th>
                      <th className="py-3 px-4 text-right">Basis Yield (Ann.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/80">
                    {volatilityTermStructure.map((v) => (
                      <tr key={v.expiry} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{v.expiry}</td>
                        <td className="py-3 px-4 text-zinc-500">{v.dte} Days</td>
                        <td className="py-3 px-4 text-right font-bold text-[#EAB308] dark:text-[#FBBF24]">{v.atmIv.toFixed(2)}%</td>
                        <td className="py-3 px-4 text-right text-slate-700 dark:text-zinc-300">{v.callIv25d.toFixed(2)}%</td>
                        <td className="py-3 px-4 text-right text-slate-700 dark:text-zinc-300">{v.putIv25d.toFixed(2)}%</td>
                        <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400 font-semibold">+{v.basisAnnualized.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Transparent Disclaimer on Exchange Options Feed */}
              <div className="p-4 rounded-xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 text-xs text-slate-700 dark:text-zinc-300 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Exchange Options Telemetry Notice</span>
                </div>
                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Strike-wise implied volatility surfaces require tick-level market data from the MCX Options on Gold Futures segment. Strike volatility interpolation is currently derived from parametric OTC SVI approximations. Full strike surface rendering will activate once exchange options streaming authorization is integrated.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      )}

      {/* Bottom: Contract Lifecycle & Liquidity Accordion Table */}
      <AnimateIn delay={0.2}>
        <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-[#EAB308]/40 dark:hover:border-[#FBBF24]/40">
          {/* Collapsible Header */}
          <button
            onClick={() => {
              if (!isAccordionOpen && !hasCountedContract.current) {
                hasCountedContract.current = true;
                incrementStat('contractsExplored');
              }
              setIsAccordionOpen((prev) => !prev);
            }}
            className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/70 dark:hover:bg-zinc-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#EAB308] dark:text-[#FBBF24]" />
              <div>
                <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Contract Lifecycle &amp; Liquidity
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  {isAccordionOpen
                    ? '10 institutional gold derivative contracts active on exchange'
                    : 'Click to expand: View All Active Contracts'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400">
              <span>{isAccordionOpen ? 'Collapse Table' : 'Expand Table'}</span>
              {isAccordionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {/* Accordion Table Content */}
          {isAccordionOpen && (
            <div className="border-t border-slate-200 dark:border-zinc-800/80 w-full max-w-full overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 dark:bg-zinc-800/60 border-b border-slate-200 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 font-semibold whitespace-nowrap">
                    <th className="py-3 px-3 sm:px-6">Contract Symbol</th>
                    <th className="py-3 px-2 sm:px-4">Expiry Date</th>
                    <th className="py-3 px-2 sm:px-4">Days to Expiry (DTE)</th>
                    <th className="py-3 px-2 sm:px-4 text-right">24h Volume (Lots)</th>
                    <th className="py-3 px-2 sm:px-4 text-right">Open Interest (OI)</th>
                    <th className="py-3 px-2 sm:px-4 text-right">Settlement Price</th>
                    <th className="py-3 px-3 sm:px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/80 whitespace-nowrap">
                  {contractLifecycleData.map((contract) => (
                    <tr
                      key={contract.symbol}
                      className="even:bg-white dark:even:bg-[#121215] odd:bg-slate-50/50 dark:odd:bg-zinc-900/30 transition-colors duration-150 hover:text-[#EAB308] dark:hover:text-[#FBBF24] hover:bg-amber-50/30 dark:hover:bg-amber-950/20"
                    >
                      <td className="py-3 px-3 sm:px-6 font-bold font-mono text-slate-900 dark:text-slate-100">
                        {contract.symbol}
                      </td>
                      <td className="py-3 px-2 sm:px-4 font-mono text-slate-600 dark:text-zinc-400">
                        {contract.expiry}
                      </td>
                      <td className="py-3 px-2 sm:px-4 font-mono">
                        <span className={cn(
                          'px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold',
                          contract.dte <= 5
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                            : 'text-slate-700 dark:text-zinc-300'
                        )}>
                          {contract.dte}d
                        </span>
                      </td>
                      <td className="py-3 px-2 sm:px-4 font-mono text-right text-slate-700 dark:text-zinc-300 font-medium">
                        {contract.volume.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2 sm:px-4 font-mono text-right text-slate-700 dark:text-zinc-300 font-medium">
                        {contract.openInterest.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2 sm:px-4 font-mono text-right font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                        ₹{contract.closePrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 sm:px-6 text-center">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider',
                            contract.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          )}
                        >
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              contract.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'
                            )}
                          />
                          {contract.status === 'ACTIVE' ? 'Active' : 'Expiring Soon'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AnimateIn>
    </motion.div>
  );
};

export default Intelligence;
