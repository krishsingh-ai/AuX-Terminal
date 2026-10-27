# AuX Terminal

> **Institutional-grade, 100% client-side frontend web application** for tracking, relative-value surveillance, and walk-forward backtesting of MCX Gold futures.

---

## 🚀 Tech Stack

| Layer | Library / Tool |
|---|---|
| UI Framework | **React 19** |
| Build Tool | **Vite 8** |
| Styling | **Tailwind CSS 3** |
| Animations | **Framer Motion 13** |
| Charts | **Recharts 3** |
| Routing | **React Router DOM 7** |
| Command Palette | **cmdk** |
| Icons | **lucide-react** |
| Linter | **oxlint** |
| Language | **TypeScript 6** |

> **This is a 100% frontend client-side application.** There is no backend, no server, no database, and no API calls. All data is simulated via `src/data/mockData.ts`. The app runs entirely in the browser.

---

## 📦 Quick Setup

### Prerequisites
- **Node.js** v18.0.0 or higher (tested on Node v24)
- **npm** v9.0.0 or higher

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open **`http://localhost:5173`** in your browser.

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

### 5. Lint
```bash
npm run lint
```

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── admin/
│   │   └── AdminSurveillanceModal.tsx   # Admin session history panel
│   ├── auth/
│   │   └── AuthModal.tsx                # Forced login modal (User / Admin tabs)
│   ├── consent/
│   │   ├── ConsentBanner.tsx            # First-visit cookie consent banner
│   │   └── PrivacyPolicyModal.tsx       # Privacy policy modal
│   ├── layout/
│   │   ├── Header.tsx                   # Sticky nav bar with gold logo & command palette
│   │   ├── Layout.tsx                   # Root layout wrapping <main>
│   │   ├── Footer.tsx                   # Multi-column footer
│   │   └── SideMenu.tsx                 # Slide-in drawer with live clock & ticker
│   └── ui/
│       ├── AnimateIn.tsx                # Fade-in scroll animation wrapper
│       ├── Button.tsx                   # Framer Motion animated button variants
│       ├── CommandPalette.tsx           # Ctrl+K command palette (cmdk)
│       ├── ErrorBoundary.tsx            # React error boundary
│       └── Toast.tsx                    # Transient status notification
├── context/
│   └── AuthContext.tsx                  # Auth, consent, ticker, and toast state
├── data/
│   └── mockData.ts                      # Simulated MCX gold market data
├── hooks/
│   ├── ThemeContext.tsx                 # Dark/light theme provider
│   ├── useAuth.ts                       # AuthContext hook
│   ├── useDocumentTitle.ts              # Dynamic <title> hook
│   ├── useGreeting.ts                   # Time-based greeting hook
│   └── useTheme.ts                      # Theme hook
├── pages/
│   ├── Home.tsx                         # Landing page with market snapshot card
│   ├── Intelligence.tsx                 # Pairwise Z-score chart & contract table
│   ├── Backtest.tsx                     # Walk-forward equity curve & alpha decomposition
│   ├── Methodology.tsx                  # Formal quantitative methodology documentation
│   ├── About.tsx                        # Team & hackathon submission page
│   └── NotFound.tsx                     # 404 fallback
├── styles/
│   └── global.css                       # Extended Tailwind base styles
├── types/
│   └── auth.ts                          # TypeScript interfaces for auth and sessions
├── utils/
│   ├── cn.ts                            # clsx + tailwind-merge utility
│   └── initials.ts                      # User avatar initials generator
├── App.tsx                              # Root app with providers and routes
└── main.tsx                             # React DOM entry point
```

---

## 🌟 Key Features

1. **Live Simulated Gold Ticker** — GOLDM, GOLDTEN, GOLDGUINEA, GOLDPETAL prices update every 5 seconds with ±3% clamping and directional flash animations.

2. **Pairwise Intelligence Page** — Z-score, basis spread, rolling mean/band metrics and an interactive Recharts line chart for intraday spread surveillance.

3. **Walk-Forward Backtest Page** — Cumulative equity curve area chart vs. passive gold benchmark, alpha decomposition cards (Gold Drift / Net RV Return / Market Beta), and a re-run simulation button.

4. **Quantitative Methodology** — Formal documentation of purity normalization, walk-forward bias prevention, and MCX statutory transaction cost models (CTT, Stamp Duty, SEBI fee, GST).

5. **Session Surveillance** — Admin-only panel viewing session history (name, duration, signals viewed, backtests run, contracts explored). Data stored in `localStorage` with explicit user consent only.

6. **Command Palette** — Global `Ctrl+K` / `⌘K` fuzzy command search powered by `cmdk`.

7. **Dark / Light Theme** — Persistent theme toggle across all pages.

---

## 👥 Team

Built by **Team AuX** for **HACK IN HILLS '26 — Problem Statement 03 (Quantitative FinTech)**:

- **Krish Raj** — Lead Architect & Quant Engineer
- **Ananya Tiwari** — Quant Strategist & Frontend Engineer
- **Kajal Kumari** — Financial Data & Systems Engineer
