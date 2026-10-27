# Spec: AuX Terminal Final Polish & Design Standards

## 1. Overview & Objectives
This specification governs the final audit, design standardization, and polish of **AuX Terminal**, an institutional-grade, 100% client-side React + Vite commodity derivatives intelligence application.

## 2. Requirements & Scope

### Task 1: Code Audit & Unused Code Removal
- **Goal**: Ensure zero dead code, zero obsolete dependencies, and zero unnecessary console output.
- **Criteria**:
  - Scan `src/` for unused imports, dead functions, and unreferenced components.
  - Verify that only essential error logs remain inside `try/catch` and error boundaries; zero `console.log` or `console.warn`.
  - Validate that all packages in `package.json` are actively imported.

### Task 2: Impeccable Design Language Adherence
- **Goal**: Align all UI surfaces with the Impeccable Institutional FinTech Trading Terminal standards.
- **Criteria**:
  - **Color Architecture**: Consistent dark mode base (`#09090B` / `#18181B`), high-contrast typography, navy blue primary accents (`#1E3A8A` / `#3B82F6`), and gold indicators (`#FBBF24` / `#D97706`).
  - **Data Density**: High-information layout, clean tabular presentation, and monospace alignment (`JetBrains Mono` / font-mono) for all numerical metrics, timestamps, and basis spreads.
  - **Micro-interactions**: Subtle hover state elevations, smooth easing transitions, and non-distracting visual cues for simulated tick updates.
  - **Anti-pattern Prevention**: Eliminate visual noise, low-contrast text, inconsistent spacing, or "AI slop" decorative bloat.

### Task 3: Mobile & Cross-Breakpoint Responsiveness
- **Goal**: Ensure flawless UX from mobile viewports (375px) through institutional ultra-wide displays (1600px+).
- **Criteria**:
  - **Home**: Hero columns stack smoothly; live market ticker card adjusts padding; feature cards grid responds across 1 to 3 columns.
  - **Intelligence**: Metric cards stack cleanly; Recharts pairwise spread chart maintains responsive width; contract lifecycle table enables horizontal scroll on mobile with legible touch targets.
  - **Backtest**: Metric cards format responsively; walk-forward cumulative equity area chart scales correctly; alpha decomposition grid stacks cleanly.
  - **Methodology**: Documentation formula boxes maintain horizontal scrollability on narrow viewports without breaking layout.
  - **About Us**: Team cards grid stacks responsively; problem statement badge rows wrap cleanly.
  - **Navigation**: Persistent hamburger menu and slide-in drawer accessible across all breakpoints.

### Task 4: Root Directory Hygiene
- **Goal**: Guarantee zero backend, database, or temporary files exist in the repository.
- **Criteria**:
  - No Python backend scripts (`main.py`, `app.py`), Node server scripts (`server.js`), or requirement files (`requirements.txt`).
  - No database files (`.db`, `.sqlite`, `.sqlite3`).
  - No stray data dumps outside `src/data/mockData.ts`.

## 3. Verification & Acceptance Criteria
- `npm run build` exits with code 0 (zero TypeScript errors).
- `npm run lint` exits with code 0 (zero lint warnings/errors).
- `npm ls --depth=0` confirms all runtime dependencies are frontend-only.
- All 5 routes (`/`, `/intelligence`, `/backtest`, `/methodology`, `/about`) render properly with full light/dark theme toggle support.
