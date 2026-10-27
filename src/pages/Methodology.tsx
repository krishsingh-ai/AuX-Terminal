import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Scale,
  Clock,
  Receipt,
  AlertTriangle,
  Layers,
  TrendingUp,
  CheckCircle2,
  FileText,
  Calculator,
} from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pageMotionVariants, pageMotionTransition } from '../utils/motion';
import { contractSpecifications } from '../data/mockData';

export const Methodology: React.FC = () => {
  useDocumentTitle('Methodology & Quantitative Whitepaper | AuX Terminal');

  return (
    <motion.div
      variants={pageMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageMotionTransition}
      className="max-w-5xl mx-auto space-y-12 py-8"
    >
      {/* Header */}
      <AnimateIn>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono border border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-[#121215]/90 text-slate-700 dark:text-zinc-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
            <BookOpen className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
            Quantitative Specifications &amp; Exchange Rules Whitepaper
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Quantitative Methodology
          </h1>
          <p className="text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-3xl font-normal">
            Formal mathematical framework for purity-basis normalization, Ornstein-Uhlenbeck cointegration dynamics, zero look-ahead walk-forward simulations, and statutory transaction cost schedules on the Multi Commodity Exchange of India (MCX).
          </p>
        </div>
      </AnimateIn>

      {/* Section 1: MCX Contract Specifications Matrix */}
      <AnimateIn delay={0.05}>
        <section className="space-y-5 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                1. MCX Gold Derivatives Matrix &amp; Contract Taxonomy
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Official exchange trading units, delivery types, quotation standards, and statutory lot sizes
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            The Multi Commodity Exchange of India (MCX) facilitates gold derivatives across four distinct contract tiers designed for diverse participant categories, ranging from institutional bullion dealers to retail physical jewelers. Cross-contract statistical arbitrage requires precise normalization across lot weights and purity fineness.
          </p>

          <div className="overflow-x-auto -mx-6 sm:mx-0 border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-[#18181B] text-slate-700 dark:text-zinc-300 border-b border-slate-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Contract</th>
                  <th className="py-3 px-4 font-semibold">Trading Unit</th>
                  <th className="py-3 px-4 font-semibold">Quotation Basis</th>
                  <th className="py-3 px-4 font-semibold">Fineness</th>
                  <th className="py-3 px-4 font-semibold">Tick Size</th>
                  <th className="py-3 px-4 font-semibold">Delivery Type</th>
                  <th className="py-3 px-4 font-semibold text-right">Initial Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {contractSpecifications.map((spec) => (
                  <tr key={spec.symbol} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {spec.name} ({spec.symbol})
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-zinc-400">{spec.tradingUnit}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-zinc-400">{spec.quotationUnit}</td>
                    <td className="py-3 px-4 font-bold text-[#EAB308] dark:text-[#FBBF24]">
                      {spec.purityFineness} Fineness
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-zinc-400">₹{spec.tickSize.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {spec.deliveryType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-slate-100">
                      {spec.marginRequirement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </AnimateIn>

      {/* Section 2: Mathematical Formulations & Basis Normalization */}
      <AnimateIn delay={0.1}>
        <section className="space-y-6 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                2. Purity Adjustment &amp; Cointegration Mathematics
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Gram-weight standardized basis spreads and Ornstein-Uhlenbeck mean-reversion modeling
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Raw quotation differences between divergent contracts do not constitute executable arbitrage without adjusting for purity assay differences (995 vs. 999 fineness) and lot weight multipliers. All price series are mapped into standardized fine gold gram equivalents.
          </p>

          {/* Mathematical Formulations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box 1: Purity & Spread Normalization */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#09090B] font-mono text-xs text-slate-900 dark:text-slate-100 space-y-3 shadow-inner">
              <div className="text-slate-400 dark:text-zinc-500 font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-[#EAB308]" />
                Basis Spread Normalization
              </div>
              <div className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-zinc-800">
                <div className="text-slate-500 dark:text-zinc-400 text-[11px]">// Pure Gold Assay Adjustment</div>
                <div className="text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">
                  P_adj = P_raw × (Fineness / 1000)
                </div>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-zinc-800">
                <div className="text-slate-500 dark:text-zinc-400 text-[11px]">// Normalized Pairwise Spread (S_t)</div>
                <div className="text-slate-800 dark:text-zinc-200 whitespace-nowrap">
                  S_t = P_near,t - P_far,t × (W_near / W_far)
                </div>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-zinc-800">
                <div className="text-slate-500 dark:text-zinc-400 text-[11px]">// Rolling Standardized Z-Score</div>
                <div className="text-[#EAB308] dark:text-[#FBBF24] font-bold whitespace-nowrap">
                  z_t = (S_t - μ_N,t) / σ_N,t
                </div>
              </div>
            </div>

            {/* Box 2: Ornstein-Uhlenbeck & Half-Life */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#09090B] font-mono text-xs text-slate-900 dark:text-slate-100 space-y-3 shadow-inner">
              <div className="text-slate-400 dark:text-zinc-500 font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                Mean-Reversion Dynamics
              </div>
              <div className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-zinc-800">
                <div className="text-slate-500 dark:text-zinc-400 text-[11px]">// Ornstein-Uhlenbeck SDE</div>
                <div className="text-slate-800 dark:text-zinc-200 whitespace-nowrap">
                  dS_t = λ(μ - S_t)dt + σ dW_t
                </div>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-zinc-800">
                <div className="text-slate-500 dark:text-zinc-400 text-[11px]">// Mean-Reversion Half-Life (τ)</div>
                <div className="text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">
                  τ = -ln(2) / λ  (Trading Days)
                </div>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-zinc-800">
                <div className="text-slate-500 dark:text-zinc-400 text-[11px]">// Augmented Dickey-Fuller Test</div>
                <div className="text-[#EAB308] dark:text-[#FBBF24] font-bold whitespace-nowrap">
                  ΔS_t = α + β S_t-1 + ∑ γ_i ΔS_t-i + ε_t  (p &lt; 0.05)
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Where μ_N,t and σ_N,t denote the rolling sample mean and standard deviation over an N-day lookback window (15, 30, or 60 trading days). Cointegration stationarity is verified via the Augmented Dickey-Fuller (ADF) test statistic at the 95% confidence level (p &lt; 0.05), ensuring the spread possesses stationary variance and does not enter a random walk regime.
          </p>
        </section>
      </AnimateIn>

      {/* Section 3: Walk-Forward Architecture (Zero Look-Ahead Bias) */}
      <AnimateIn delay={0.15}>
        <section className="space-y-6 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                3. Walk-Forward Simulation Architecture (Zero Look-Ahead Bias)
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Rolling calibration windows, out-of-sample forward execution, and tender roll governance
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Quantitative models frequently degrade in live trading due to parameter overfitting and look-ahead data leakage. AuX enforces a rigorous rolling walk-forward protocol where historical calibration and forward execution are strictly partitioned.
          </p>

          {/* Walk Forward Architecture Visual Flow */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#09090B] space-y-4">
            <div className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Rolling Window Partitioning Protocol
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-4 rounded-lg border border-amber-300/40 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  WINDOW 1: CALIBRATION
                </span>
                <p className="font-bold text-slate-900 dark:text-slate-100">180 Trading Days</p>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                  Parameters (mean, variance, cointegration vector, half-life) estimated strictly on in-sample data [T - 180, T].
                </p>
              </div>

              <div className="p-4 rounded-lg border border-emerald-300/40 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  WINDOW 2: EXECUTION
                </span>
                <p className="font-bold text-slate-900 dark:text-slate-100">30 Trading Days</p>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                  Zero parameters modified. Signals executed out-of-sample on unobserved forward market data [T, T + 30].
                </p>
              </div>

              <div className="p-4 rounded-lg border border-rose-300/40 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 space-y-2">
                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  WINDOW 3: TENDER ROLL
                </span>
                <p className="font-bold text-slate-900 dark:text-slate-100">T - 4 Days to Tender</p>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                  Mandatory square-off or roll into next active contract month to avoid physical delivery liability.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 dark:text-zinc-400">Execution Pricing Mechanism:</span>
              <span className="font-bold text-[#EAB308] dark:text-[#FBBF24]">
                Signal at Day T Close → Executed at Day T+1 Open VWAP + 1-Tick Slippage
              </span>
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Section 4: Statutory & Exchange Transaction Costs Schedule */}
      <AnimateIn delay={0.2}>
        <section className="space-y-6 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24]">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                4. Statutory Transaction Friction &amp; Indian Regulatory Schedule
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Precise fee schedule matching SEBI, MCX, and Ministry of Finance mandates
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Calendar spread and relative-value statistical arbitrage produce frequent rebalancing. Failure to account for exact Indian transaction friction leads to severe performance degradation. AuX simulates execution drag using official exchange rate cards.
          </p>

          {/* Statutory Fee Schedule Table */}
          <div className="overflow-x-auto -mx-6 sm:mx-0 border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-[#18181B] text-slate-700 dark:text-zinc-300 border-b border-slate-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Fee / Levy Component</th>
                  <th className="py-3 px-4 font-semibold">Rate / Tariff</th>
                  <th className="py-3 px-4 font-semibold">Levied Side</th>
                  <th className="py-3 px-4 font-semibold">Statutory Authority</th>
                  <th className="py-3 px-4 font-semibold text-right">Applicability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">MCX Turnover Charge</td>
                  <td className="py-2.5 px-4 font-bold text-[#EAB308] dark:text-[#FBBF24]">0.0021% (₹210 / Cr)</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Both Sides (Buy &amp; Sell)</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Exchange (MCX)</td>
                  <td className="py-2.5 px-4 text-right">All Futures</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Commodity Transaction Tax (CTT)</td>
                  <td className="py-2.5 px-4 font-bold text-[#EAB308] dark:text-[#FBBF24]">0.0125% (₹1,250 / Cr)</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Sell Side Only</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Ministry of Finance (CBDT)</td>
                  <td className="py-2.5 px-4 text-right">Non-Agri Futures</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Stamp Duty</td>
                  <td className="py-2.5 px-4 font-bold text-[#EAB308] dark:text-[#FBBF24]">0.002% (₹200 / Cr)</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Buy Side Only</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Indian Stamp Act 1899</td>
                  <td className="py-2.5 px-4 text-right">State Governments</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">SEBI Regulatory Turnover Fee</td>
                  <td className="py-2.5 px-4 font-bold text-[#EAB308] dark:text-[#FBBF24]">0.0001% (₹10 / Cr)</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Both Sides (Buy &amp; Sell)</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">SEBI</td>
                  <td className="py-2.5 px-4 text-right">Commodity Derivatives</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Goods and Services Tax (GST)</td>
                  <td className="py-2.5 px-4 font-bold text-[#EAB308] dark:text-[#FBBF24]">18.00%</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">On Fees &amp; Brokerage</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">CBIC</td>
                  <td className="py-2.5 px-4 text-right">Turnover + Brokerage</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">Simulated Execution Slippage</td>
                  <td className="py-2.5 px-4 font-bold text-rose-500">1.0 Minimum Tick (₹1.00 / 10g)</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Both Legs (Market Orders)</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-zinc-400">Order Book Microstructure</td>
                  <td className="py-2.5 px-4 text-right">Bid/Ask Half-Spread</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Concrete Cost Calculation Example */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#09090B] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#EAB308]" />
                Concrete Calculation: 1 Round-Trip of 100g GOLDM @ ₹72,500 / 10g
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">Total Contract Value: ₹7,25,000</span>
            </div>
            <div className="text-[11px] font-mono text-slate-600 dark:text-zinc-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-200 dark:border-zinc-800">
              <div>• MCX Turnover: ₹30.45</div>
              <div>• CTT (Sell side): ₹90.63</div>
              <div>• Stamp Duty (Buy): ₹14.50</div>
              <div>• SEBI Fee: ₹1.45</div>
              <div>• GST @ 18%: ₹5.74</div>
              <div>• Brokerage (Flat): ₹40.00</div>
              <div>• 1-Tick Slippage: ₹20.00</div>
              <div className="font-bold text-[#EAB308] dark:text-[#FBBF24]">Total Drag: ₹202.77 / round-trip</div>
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Section 5: Model Limitations & Institutional Governance */}
      <AnimateIn delay={0.25}>
        <section className="space-y-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(245,158,11,0.06)]">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            5. Model Limitations, Execution Assumptions &amp; Regulatory Disclosures
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
            <div className="space-y-1">
              <span className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Basis Divergence &amp; Regime Shifts
              </span>
              <p>
                Cointegration relationships are stationary under standard market regimes, but may break down during systemic geopolitical crises, import duty revisions by the Government of India, or severe refinery supply bottlenecks.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Physical Delivery Tender Protocol
              </span>
              <p>
                AuX strictly operates in the cash-settlement phase. MCX compulsory delivery rules impose significant warehouse vaulting, assay certification, and physical logistics fees if held past the tender start notice.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Simulated Fills vs. Live Liquidity
              </span>
              <p>
                Backtest results assume order execution at the Next-Day Opening Volume-Weighted Average Price (VWAP) with static tick slippage. Real-time market execution may experience wider spreads during illiquid night sessions.
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Research &amp; Surveillance Notice
              </span>
              <p>
                The quantitative models, volatility surfaces, and backtests presented in AuX Terminal are engineered for financial research, risk monitoring, and academic evaluation. Nothing herein constitutes financial or investment advice.
              </p>
            </div>
          </div>
        </section>
      </AnimateIn>
    </motion.div>
  );
};

export default Methodology;