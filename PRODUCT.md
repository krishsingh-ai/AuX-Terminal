# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Institutional commodity traders, quantitative research desks, risk managers, and trading desk operators tracking MCX Gold futures derivatives.

## Product Purpose

AuX Terminal is an institutional-grade, 100% client-side commodity derivatives intelligence terminal engineered for tracking, relative-value surveillance, and walk-forward backtesting of MCX Gold futures contracts.

## Positioning

An institutional FinTech trading terminal focused on data density, mathematical rigor, and zero look-ahead bias backtesting. By synthesizing domestic spot basis analytics, cross-tenor spreads, and statutory transaction friction models, AuX delivers clarity in gold pricing dynamics without requiring a server backend.

## Operating Context

- **Environment**: Desktop and responsive mobile browser surfaces (100% client-side execution).
- **Design Theme**: Institutional dark theme dominant with navy blue (`#1E3A8A` / `#3B82F6`) and gold (`#FBBF24` / `#D97706` / `#FFD700`) accents.
- **Visual Goal**: High data density, tabular precision, mathematical clarity, and zero "AI slop" or unnecessary visual bloat.

## Capabilities and Constraints

- **Architecture**: 100% client-side React 19 + Vite 8 + Tailwind CSS 3. No server or backend databases.
- **Market Data**: Simulated real-time 5-second MCX gold tick engine with bounded ±3% drift across GOLDM, GOLDTEN, GOLDGUINEA, and GOLDPETAL.
- **Pairwise Intelligence**: Intraday basis spread tracking, rolling mean, and cointegration ±2.0σ Bollinger reversion thresholds rendered via Recharts.
- **Walk-Forward Simulation Engine**: Deterministic backtesting featuring alpha decomposition (Underlying Gold Drift vs. Net Relative-Value Return vs. Market Beta) and statutory Indian transaction costs (CTT, Stamp Duty, SEBI turnover fees, GST, execution slippage).
- **Session Surveillance**: Client-side audit panel logging session activity into `localStorage`, strictly gated behind explicit user consent.
- **Navigation & Shortcuts**: Global Command Palette (`Ctrl+K` / `Cmd+K`), slide-in quick drawer, and high-contrast theme toggle.

## Brand Commitments

- **Name**: AuX Terminal (Commodity Derivatives Intelligence)
- **Identity**: Minimal geometric gold bar emblem with high-contrast amber/gold gradients.
- **Typography**: Clean system sans-serif for UI typography paired with `JetBrains Mono` / monospace for all financial figures, ticks, timestamps, and spread values.

## Evidence on Hand

- `src/data/mockData.ts`: MCX contract specifications, historical basis chart telemetry, backtest metrics, and equity curve points.
- `README.md`: Formal system specification and execution guidance.

## Product Principles

1. **Data Density & Clarity Over Fluff**: Deliver institutional information density with clean tabular structures and crisp visual contrast rather than decorative filler.
2. **Deterministic Mathematical Rigor**: Every metric (Z-score, basis spread, alpha factor, transaction cost) follows documented exchange and econometric formulas.
3. **Transparent Client-Side Execution**: Zero hidden server dependencies; explicit user consent controls for telemetry.
4. **Instantaneous Feedback**: Sub-second UI transitions, seamless keyboard navigation (`Ctrl+K`), and live visual tick alerts.

## Accessibility & Inclusion

- High contrast text on dark backgrounds conforming to WCAG AA.
- Full keyboard accessibility with focus rings and semantic HTML structure.
