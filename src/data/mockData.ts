export interface GoldTickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface PairwiseData {
  pair: string;
  zScore: number;
  currentSpread: number;
  rollingMean: number;
  stdDev: number;
  upperBand: number;
  lowerBand: number;
  status: 'NORMAL' | 'DIVERGENT' | 'CONVERGENT';
  unit: string;
  chartData: {
    time: string;
    spread: number;
    mean: number;
    upperBand: number;
    lowerBand: number;
  }[];
}

export interface BacktestMetrics {
  totalTrades: number;
  winRate: number;
  grossPnl: number;
  netPnl: number;
  frictionDrag: number;
  maxDrawdown: number;
  profitFactor: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  avgDurationDays: number;
  annualizedReturn: number;
  alphaDecomposition: {
    underlyingGoldDrift: number;
    netRelativeValueReturn: number;
    marketBeta: number;
  };
}

export interface ContractLifecycleItem {
  symbol: string;
  expiry: string;
  dte: number;
  volume: number;
  openInterest: number;
  closePrice: number;
  status: 'ACTIVE' | 'EXPIRING_SOON';
}

export interface EquityCurvePoint {
  month: string;
  equity: number;
  benchmark: number;
}

// 1. Gold Ticker Data (GOLDM, GOLDTEN, GOLDGUINEA, GOLDPETAL)
export const goldTickerData: GoldTickerItem[] = [
  {
    symbol: 'GOLDM',
    name: 'Gold Mini (100g)',
    price: 72480,
    change: 305,
    changePercent: 0.42,
  },
  {
    symbol: 'GOLDTEN',
    name: 'Gold Ten (10g)',
    price: 72510,
    change: 312,
    changePercent: 0.43,
  },
  {
    symbol: 'GOLDGUINEA',
    name: 'Gold Guinea (8g)',
    price: 58120,
    change: 240,
    changePercent: 0.41,
  },
  {
    symbol: 'GOLDPETAL',
    name: 'Gold Petal (1g)',
    price: 7295,
    change: 32,
    changePercent: 0.44,
  },
];

// 2. Pairwise Intelligence Data
export const pairwiseData: PairwiseData = {
  pair: 'GOLDM - GOLDTEN (MCX)',
  zScore: 1.42,
  currentSpread: 30.0,
  rollingMean: 18.5,
  stdDev: 8.1,
  upperBand: 34.7,
  lowerBand: 2.3,
  status: 'NORMAL',
  unit: 'INR / 10g',
  chartData: [
    { time: '09:15', spread: 18.2, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '09:45', spread: 19.8, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '10:15', spread: 22.4, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '10:45', spread: 21.1, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '11:15', spread: 25.6, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '11:45', spread: 28.3, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '12:15', spread: 31.9, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '12:45', spread: 33.2, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '13:15', spread: 29.5, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '13:45', spread: 26.8, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '14:15', spread: 24.2, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '14:45', spread: 27.5, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '15:15', spread: 29.1, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '15:45', spread: 30.0, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '16:15', spread: 28.7, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
    { time: '16:45', spread: 30.0, mean: 18.5, upperBand: 34.7, lowerBand: 2.3 },
  ],
};

// 3. Backtest Metrics
export const backtestMetrics: BacktestMetrics = {
  totalTrades: 342,
  winRate: 68.4,
  grossPnl: 1485200,
  netPnl: 1246000,
  frictionDrag: 239200,
  maxDrawdown: -3.82,
  profitFactor: 2.18,
  sharpeRatio: 2.41,
  sortinoRatio: 3.18,
  calmarRatio: 6.44,
  avgDurationDays: 7.8,
  annualizedReturn: 24.6,
  alphaDecomposition: {
    underlyingGoldDrift: 14.2,
    netRelativeValueReturn: 28.4,
    marketBeta: 0.12,
  },
};

// 4. Contract Lifecycle Data (10 contracts)
export const contractLifecycleData: ContractLifecycleItem[] = [
  {
    symbol: 'GOLDM 26OCT',
    expiry: '2026-10-25',
    dte: 28,
    volume: 14250,
    openInterest: 45200,
    closePrice: 72480,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDM 26NOV',
    expiry: '2026-11-25',
    dte: 59,
    volume: 8420,
    openInterest: 28100,
    closePrice: 72890,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDM 26DEC',
    expiry: '2026-12-24',
    dte: 88,
    volume: 3850,
    openInterest: 14900,
    closePrice: 73320,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDTEN 26OCT',
    expiry: '2026-10-01',
    dte: 4,
    volume: 22800,
    openInterest: 62400,
    closePrice: 72510,
    status: 'EXPIRING_SOON',
  },
  {
    symbol: 'GOLDTEN 26NOV',
    expiry: '2026-11-01',
    dte: 35,
    volume: 16100,
    openInterest: 38900,
    closePrice: 72940,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDGUINEA 26OCT',
    expiry: '2026-10-02',
    dte: 5,
    volume: 5200,
    openInterest: 11400,
    closePrice: 58120,
    status: 'EXPIRING_SOON',
  },
  {
    symbol: 'GOLDGUINEA 26NOV',
    expiry: '2026-11-02',
    dte: 36,
    volume: 3140,
    openInterest: 7850,
    closePrice: 58480,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDPETAL 26OCT',
    expiry: '2026-09-30',
    dte: 3,
    volume: 31500,
    openInterest: 89200,
    closePrice: 7295,
    status: 'EXPIRING_SOON',
  },
  {
    symbol: 'GOLDPETAL 26NOV',
    expiry: '2026-10-31',
    dte: 34,
    volume: 19800,
    openInterest: 54600,
    closePrice: 7340,
    status: 'ACTIVE',
  },
  {
    symbol: 'GOLDM 27FEB',
    expiry: '2027-02-25',
    dte: 151,
    volume: 1420,
    openInterest: 6800,
    closePrice: 74150,
    status: 'ACTIVE',
  },
];

// 5. Equity Curve Data (12 points)
export const equityCurveData: EquityCurvePoint[] = [
  { month: 'Jan', equity: 1000000, benchmark: 1000000 },
  { month: 'Feb', equity: 1042000, benchmark: 1018000 },
  { month: 'Mar', equity: 1085000, benchmark: 1032000 },
  { month: 'Apr', equity: 1069000, benchmark: 1024000 },
  { month: 'May', equity: 1124000, benchmark: 1056000 },
  { month: 'Jun', equity: 1178000, benchmark: 1072000 },
  { month: 'Jul', equity: 1235000, benchmark: 1089000 },
  { month: 'Aug', equity: 1291000, benchmark: 1104000 },
  { month: 'Sep', equity: 1324000, benchmark: 1098000 },
  { month: 'Oct', equity: 1398000, benchmark: 1121000 },
  { month: 'Nov', equity: 1442000, benchmark: 1134000 },
  { month: 'Dec', equity: 1485200, benchmark: 1142000 },
];

// 6. Contract Specifications (MCX Official Parameters)
export interface ContractSpecification {
  symbol: string;
  name: string;
  tradingUnit: string;
  quotationUnit: string;
  purityFineness: number;
  tickSize: number;
  lotWeightGrams: number;
  deliveryType: string;
  marginRequirement: string;
  description: string;
}

export const contractSpecifications: ContractSpecification[] = [
  {
    symbol: 'GOLDM',
    name: 'Gold Mini Futures',
    tradingUnit: '100 grams',
    quotationUnit: 'INR per 10 grams',
    purityFineness: 995,
    tickSize: 1.0,
    lotWeightGrams: 100,
    deliveryType: 'Compulsory Physical Delivery (Vault Receipts)',
    marginRequirement: '10.5% (~₹76,100 / lot)',
    description: 'Primary liquidity contract on MCX for institutional calendar and relative-value desks.',
  },
  {
    symbol: 'GOLDTEN',
    name: 'Gold Ten Futures',
    tradingUnit: '10 grams',
    quotationUnit: 'INR per 10 grams',
    purityFineness: 999,
    tickSize: 1.0,
    lotWeightGrams: 10,
    deliveryType: 'Physical / Demat Electronic Settlement',
    marginRequirement: '10.5% (~₹7,615 / lot)',
    description: 'Higher purity 999 contract; key constituent in four-fineness purity basis arbitrage.',
  },
  {
    symbol: 'GOLDGUINEA',
    name: 'Gold Guinea Futures',
    tradingUnit: '8 grams',
    quotationUnit: 'INR per 8 grams',
    purityFineness: 999,
    tickSize: 1.0,
    lotWeightGrams: 8,
    deliveryType: 'Compulsory Physical (Standard Coins)',
    marginRequirement: '10.5% (~₹6,100 / lot)',
    description: 'Reflects domestic physical retail coin premium dynamics and fabrication margins.',
  },
  {
    symbol: 'GOLDPETAL',
    name: 'Gold Petal Futures',
    tradingUnit: '1 gram',
    quotationUnit: 'INR per 1 gram',
    purityFineness: 999,
    tickSize: 1.0,
    lotWeightGrams: 1,
    deliveryType: 'Physical Demat / Cash Settlement Tender',
    marginRequirement: '11.0% (~₹802 / lot)',
    description: 'Micro-tenor contract enabling fractional basis hedging and retail liquidity tracking.',
  },
];

// 7. Volatility Term Structure Data
export interface VolatilityPoint {
  expiry: string;
  dte: number;
  atmIv: number;
  callIv25d: number;
  putIv25d: number;
  basisAnnualized: number;
}

export const volatilityTermStructure: VolatilityPoint[] = [
  { expiry: '26OCT', dte: 28, atmIv: 14.82, callIv25d: 15.44, putIv25d: 14.20, basisAnnualized: 5.8 },
  { expiry: '26NOV', dte: 59, atmIv: 15.18, callIv25d: 15.82, putIv25d: 14.55, basisAnnualized: 6.1 },
  { expiry: '26DEC', dte: 88, atmIv: 15.65, callIv25d: 16.30, putIv25d: 15.02, basisAnnualized: 6.4 },
  { expiry: '27FEB', dte: 151, atmIv: 16.12, callIv25d: 16.85, putIv25d: 15.48, basisAnnualized: 6.8 },
];

// 8. Multi-Contract Pairwise Comparisons
export interface PairComparison {
  id: string;
  label: string;
  nearContract: string;
  farContract: string;
  nearPrice: number;
  farPrice: number;
  spread: number; // in INR / 10g pure equivalent
  rollingMean: number;
  stdDev: number;
  zScore: number;
  halfLifeDays: number;
  adfPValue: number;
  signal: 'DIVERGENT (LONG)' | 'DIVERGENT (SHORT)' | 'CONVERGENT (NORMAL)';
  description: string;
}

export const pairComparisons: PairComparison[] = [
  {
    id: 'goldm-goldten',
    label: 'GOLDM vs GOLDTEN (Purity Basis Arbitrage)',
    nearContract: 'GOLDM 26OCT (995 Fineness)',
    farContract: 'GOLDTEN 26OCT (999 Fineness)',
    nearPrice: 72480,
    farPrice: 72510,
    spread: 30.0,
    rollingMean: 18.5,
    stdDev: 8.1,
    zScore: 1.42,
    halfLifeDays: 4.2,
    adfPValue: 0.008,
    signal: 'CONVERGENT (NORMAL)',
    description: 'Tracks the pure metal parity spread between 995 fineness mini contracts and 999 gold ten.',
  },
  {
    id: 'goldm-calendar',
    label: 'GOLDM 26OCT vs GOLDM 26NOV (Calendar Term Roll)',
    nearContract: 'GOLDM 26OCT (Near-Month)',
    farContract: 'GOLDM 26NOV (Far-Month)',
    nearPrice: 72480,
    farPrice: 72890,
    spread: 410.0,
    rollingMean: 385.0,
    stdDev: 11.8,
    zScore: 2.12,
    halfLifeDays: 7.8,
    adfPValue: 0.002,
    signal: 'DIVERGENT (SHORT)',
    description: 'Monitors the forward contango basis between adjacent active monthly contracts against cost-of-carry.',
  },
  {
    id: 'goldm-goldguinea',
    label: 'GOLDM vs GOLDGUINEA (Bullion vs Coin Spread)',
    nearContract: 'GOLDM 26OCT (₹/10g)',
    farContract: 'GOLDGUINEA 26OCT (Normalized ₹/10g)',
    nearPrice: 72480,
    farPrice: 72650,
    spread: 170.0,
    rollingMean: 142.0,
    stdDev: 14.5,
    zScore: 1.93,
    halfLifeDays: 5.6,
    adfPValue: 0.014,
    signal: 'CONVERGENT (NORMAL)',
    description: 'Captures the physical retail minting premium disparity between bullion bars and gold coins.',
  },
];

// 9. Interactive Backtest Simulator Configuration & Engine
export interface BacktestConfig {
  strategy: 'calendar-spread' | 'purity-basis' | 'term-roll';
  pair: string;
  lookbackDays: 15 | 30 | 60;
  entryZ: 1.5 | 2.0 | 2.5;
  exitZ: 0.0 | 0.25 | 0.5;
  stopLossZ: 3.0 | 3.5 | 4.0;
  frictionModel: 'statutory' | 'zero' | 'stress';
}

export interface MonthlyReturnBreakdown {
  month: string;
  strategyReturn: number;
  benchmarkReturn: number;
  netPnl: number;
  trades: number;
}

export interface DrawdownCurvePoint {
  month: string;
  drawdown: number;
}

export interface SimulationResult {
  metrics: BacktestMetrics;
  equityCurve: EquityCurvePoint[];
  drawdownCurve: DrawdownCurvePoint[];
  monthlyBreakdown: MonthlyReturnBreakdown[];
}

export function runWalkForwardSimulation(config: BacktestConfig): SimulationResult {
  // Deterministic quantitative scaling factors based on parameters
  const entryFactor = config.entryZ === 1.5 ? 1.25 : config.entryZ === 2.5 ? 0.78 : 1.0;
  const lookbackFactor = config.lookbackDays === 15 ? 1.15 : config.lookbackDays === 60 ? 0.88 : 1.0;
  const strategyMultiplier = config.strategy === 'purity-basis' ? 0.92 : config.strategy === 'term-roll' ? 1.08 : 1.0;
  const frictionDeduction = config.frictionModel === 'zero' ? 0 : config.frictionModel === 'stress' ? 0.048 : 0.019;

  const totalTrades = Math.round(342 * entryFactor * lookbackFactor * strategyMultiplier);
  const winRate = Number((config.entryZ === 2.5 ? 72.8 : config.entryZ === 1.5 ? 64.2 : 68.4).toFixed(1));
  
  // Base annualized return adjusted by strategy and friction
  let annualizedReturn = 24.6 * strategyMultiplier;
  if (config.frictionModel === 'zero') annualizedReturn += 3.4;
  if (config.frictionModel === 'stress') annualizedReturn -= 5.2;
  if (config.entryZ === 2.5) annualizedReturn += 1.4;
  if (config.entryZ === 1.5) annualizedReturn -= 1.8;
  if (config.lookbackDays === 60) annualizedReturn -= 0.8;
  annualizedReturn = Number(annualizedReturn.toFixed(1));

  const sharpeRatio = Number((annualizedReturn / (config.frictionModel === 'stress' ? 11.2 : 10.2)).toFixed(2));
  const sortinoRatio = Number((sharpeRatio * 1.32).toFixed(2));
  const maxDrawdown = Number((config.frictionModel === 'stress' ? -5.4 : config.entryZ === 1.5 ? -4.6 : -3.82).toFixed(2));
  const calmarRatio = Number((Math.abs(annualizedReturn / maxDrawdown)).toFixed(2));
  const profitFactor = Number((config.frictionModel === 'zero' ? 2.45 : config.frictionModel === 'stress' ? 1.88 : 2.18).toFixed(2));
  const avgDurationDays = Number((config.lookbackDays === 15 ? 4.2 : config.lookbackDays === 30 ? 7.8 : 14.1).toFixed(1));

  // Generate dynamic monthly equity points
  const baseMonthly = [
    { month: 'Jan', rate: 0.042 },
    { month: 'Feb', rate: 0.041 },
    { month: 'Mar', rate: -0.015 },
    { month: 'Apr', rate: 0.051 },
    { month: 'May', rate: 0.048 },
    { month: 'Jun', rate: 0.048 },
    { month: 'Jul', rate: 0.045 },
    { month: 'Aug', rate: 0.025 },
    { month: 'Sep', rate: 0.056 },
    { month: 'Oct', rate: 0.031 },
    { month: 'Nov', rate: 0.030 },
    { month: 'Dec', rate: 0.028 },
  ];

  let currentCapital = 1000000;
  let currentBenchmark = 1000000;
  let peakCapital = 1000000;

  const equityCurve: EquityCurvePoint[] = [{ month: 'Start', equity: 1000000, benchmark: 1000000 }];
  const drawdownCurve: DrawdownCurvePoint[] = [{ month: 'Start', drawdown: 0 }];
  const monthlyBreakdown: MonthlyReturnBreakdown[] = [];

  baseMonthly.forEach((m) => {
    const monthlyReturn = Number(((m.rate * (annualizedReturn / 24.6)) * 100).toFixed(2));
    const benchReturn = Number((monthlyReturn * 0.45).toFixed(2));
    const netPnl = Math.round(currentCapital * (monthlyReturn / 100));
    currentCapital += netPnl;
    currentBenchmark += Math.round(currentBenchmark * (benchReturn / 100));

    if (currentCapital > peakCapital) {
      peakCapital = currentCapital;
    }
    const currentDrawdown = Number((((currentCapital - peakCapital) / peakCapital) * 100).toFixed(2));

    equityCurve.push({
      month: m.month,
      equity: currentCapital,
      benchmark: currentBenchmark,
    });

    drawdownCurve.push({
      month: m.month,
      drawdown: currentDrawdown,
    });

    monthlyBreakdown.push({
      month: m.month,
      strategyReturn: monthlyReturn,
      benchmarkReturn: benchReturn,
      netPnl,
      trades: Math.max(1, Math.round(totalTrades / 12)),
    });
  });

  const netPnl = currentCapital - 1000000;
  const grossPnl = Math.round(netPnl / Math.max(0.01, 1 - frictionDeduction));
  const frictionDrag = grossPnl - netPnl;

  const alphaDecomposition = {
    underlyingGoldDrift: 14.2,
    netRelativeValueReturn: Number((annualizedReturn * 1.15).toFixed(1)),
    marketBeta: Number((config.strategy === 'purity-basis' ? 0.08 : config.strategy === 'term-roll' ? 0.15 : 0.12).toFixed(2)),
  };

  return {
    metrics: {
      totalTrades,
      winRate,
      grossPnl,
      netPnl,
      frictionDrag,
      maxDrawdown,
      profitFactor,
      sharpeRatio,
      sortinoRatio,
      calmarRatio,
      avgDurationDays,
      annualizedReturn,
      alphaDecomposition,
    },
    equityCurve,
    drawdownCurve,
    monthlyBreakdown,
  };
}
