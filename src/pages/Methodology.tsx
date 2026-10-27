import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Scale, Clock, Receipt, AlertTriangle } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pageMotionVariants, pageMotionTransition } from '../utils/motion';

export const Methodology: React.FC = () => {
  useDocumentTitle('Methodology | AuX Terminal');
  return (
    <motion.div
      variants={pageMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageMotionTransition}
      className="max-w-4xl mx-auto space-y-12 py-8"
    >
      {/* Header */}
      <AnimateIn>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-[#121215]/90 text-slate-700 dark:text-zinc-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
            <BookOpen className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
            Mathematical Specifications &amp; Exchange Rules
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Quantitative Methodology
          </h1>
          <p className="text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
            Formal mathematical framework for purity basis normalization, zero look-ahead walk-forward simulations, and statutory transaction cost friction models on the Multi Commodity Exchange of India (MCX).
          </p>
        </div>
      </AnimateIn>

      {/* Section 1: Purity & Basis Normalization */}
      <AnimateIn delay={0.1}>
        <section className="space-y-5 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-[#EAB308]/40 dark:hover:border-[#FBBF24]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24] shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              1. Purity &amp; Basis Normalization
            </h2>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            MCX lists gold contracts across divergent lot sizes (GOLDM 100g, GOLDTEN 10g, GOLDGUINEA 8g, and GOLDPETAL 1g) and purity fineness specifications (995 vs. 999). To evaluate true synthetic arbitrage rather than nominal price disparities, all price series are normalized into pure gold grams equivalents.
          </p>

          {/* Formula Box */}
          <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] font-mono text-xs md:text-sm text-slate-900 dark:text-slate-100 space-y-3 overflow-x-auto shadow-inner">
            <div className="text-slate-400 dark:text-zinc-500 font-sans text-xs font-bold uppercase tracking-wider">
              Formula: Purity Adjustment &amp; Standardized Spread
            </div>
            <div className="text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">
              Pure Gold Content (grams) = Quoted Weight × (Purity / 1000)
            </div>
            <div className="text-slate-700 dark:text-zinc-300 whitespace-nowrap">
              Normalized Basis Spread (S_t) = P_{`{Near, t}`} - P_{`{Far, t}`} × (Weight_{`{Near}`} / Weight_{`{Far}`})
            </div>
            <div className="text-[#EAB308] dark:text-[#FBBF24] font-bold whitespace-nowrap">
              Rolling Z-Score: z_t = (S_t - μ_{`{30D, t}`}) / σ_{`{30D, t}`}
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Where μ_{`{30D, t}`} and σ_{`{30D, t}`} denote the rolling 30-trading-day sample mean and standard deviation of the normalized spread, preventing parameter leakage from future price distributions.
          </p>
        </section>
      </AnimateIn>

      {/* Section 2: Walk-Forward Backtesting */}
      <AnimateIn delay={0.15}>
        <section className="space-y-5 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-[#EAB308]/40 dark:hover:border-[#FBBF24]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24] shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              2. Walk-Forward Backtesting (Zero Look-Ahead Bias)
            </h2>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Traditional backtests suffer from look-ahead bias by tuning entry thresholds over the entire test horizon. AuX enforces strict rolling out-of-sample walk-forward windows: 180 days of historical parameter training followed by 30 days of forward execution.
          </p>

          {/* Formula Box */}
          <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] font-mono text-xs md:text-sm text-slate-900 dark:text-slate-100 space-y-3 overflow-x-auto shadow-inner">
            <div className="text-slate-400 dark:text-zinc-500 font-sans text-xs font-bold uppercase tracking-wider">
              Simulation Regime &amp; Execution Gates
            </div>
            <div className="text-slate-700 dark:text-zinc-300 whitespace-nowrap">
              Calibration Window: T_{`{calib}`} = [t - 180, t]  |  Execution Window: T_{`{exec}`} = [t, t + 30]
            </div>
            <div className="text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">
              Entry Gate: |z_t| &gt; 2.0σ  (Long spread if z &lt; -2.0, Short spread if z &gt; +2.0)
            </div>
            <div className="text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap">
              Exit Gate: |z_t| ≤ 0.25σ (Target Mean Reversion) OR Stop-Loss: |z_t| ≥ 3.5σ
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            All positions undergo mandatory roll-forward liquidation 4 business days prior to tender delivery notice periods to eliminate physical delivery liabilities.
          </p>
        </section>
      </AnimateIn>

      {/* Section 3: Statutory & Exchange Transaction Costs */}
      <AnimateIn delay={0.2}>
        <section className="space-y-5 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-[#EAB308]/40 dark:hover:border-[#FBBF24]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24] shadow-xs">
              <Receipt className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              3. Statutory &amp; Exchange Transaction Costs
            </h2>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            High-frequency relative-value strategies frequently degrade under realistic friction. AuX models real-world institutional Indian regulatory costs at the trade tick level:
          </p>

          {/* Formula Box */}
          <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] font-mono text-xs md:text-sm text-slate-900 dark:text-slate-100 space-y-2.5 overflow-x-auto shadow-inner">
            <div className="text-slate-400 dark:text-zinc-500 font-sans text-xs font-bold uppercase tracking-wider">
              Statutory Friction Schedule (MCX Derivatives)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>• MCX Turnover Fee: 0.0021%</div>
              <div>• CTT (Sell Side): 0.0125%</div>
              <div>• Stamp Duty (Buy Side): 0.002%</div>
              <div>• SEBI Turnover Fee: ₹10 / Cr (0.0001%)</div>
              <div>• GST on Fees: 18.00%</div>
              <div>• Execution Slippage: 1 Minimum Tick (₹0.50/10g)</div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-800/80 text-[#EAB308] dark:text-[#FBBF24] font-bold whitespace-nowrap">
              Round-Trip Cost = ∑(Exchange Fees + CTT + Stamp Duty + Brokerage) × 1.18 + Slippage
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Disclaimer Box */}
      <AnimateIn delay={0.25}>
        <div className="p-6 sm:p-7 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-slate-800 dark:text-zinc-200 space-y-2 shadow-[0_4px_20px_-4px_rgba(245,158,11,0.06)]">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Institutional Research &amp; Regulatory Disclaimer
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            The analytics, volatility surfaces, cointegration z-scores, and walk-forward simulations generated by the AuX Terminal are engineered strictly for quantitative financial research, academic evaluation, and risk surveillance. Backtested returns reflect simulated performance and do not guarantee future profitability. Commodity futures and derivatives trading carries significant market, basis, and liquidity risks.
          </p>
        </div>
      </AnimateIn>
    </motion.div>
  );
};

export default Methodology;
