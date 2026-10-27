import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, TrendingUp, Shield, LogOut, ArrowRight, BarChart2, Compass, BookOpen, Info } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { useGreeting } from '../../hooks/useGreeting';
import { cn } from '../../utils/cn';
import { getUserInitials } from '../../utils/initials';
import { snappyEase } from '../../utils/motion';

export const SideMenu: React.FC = () => {
  const {
    session,
    logout,
    openConsentBanner,
    isSideMenuOpen,
    setIsSideMenuOpen,
    setIsAdminPanelOpen,
    tickers,
    flashingSymbol,
  } = useAuth();
  const greeting = useGreeting();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Live clock updating every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isSideMenuOpen) {
    return null;
  }

  const displayName = session?.role === 'admin' ? 'Admin' : (session?.name || 'Operator');

  const handleAdminControlClick = () => {
    setIsSideMenuOpen(false);
    setIsAdminPanelOpen(true);
  };

  const handleLinkClick = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSideMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-in Drawer */}
        <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="User navigation drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.25, ease: snappyEase }}
          className="relative z-10 w-[85vw] sm:w-96 max-w-[400px] h-full border-l border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Top & Content Section */}
          <div className="p-5 sm:p-6 space-y-6">
            {/* Header & Close */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-[#EAB308] dark:text-[#FBBF24] font-mono">
                  {session?.role === 'admin' ? 'A' : getUserInitials(session?.name || '')}
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">{displayName}</h3>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {session?.role === 'admin' ? 'Institutional Admin' : 'Trading Desk Operator'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSideMenuOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Time-Based Greeting */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] space-y-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]">
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wider">
                Session Status
              </span>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {greeting}, {displayName}.
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#EAB308] dark:text-[#FBBF24]" />
                <span>{format(currentTime, 'HH:mm:ss')} (IST)</span>
              </div>
            </div>

            {/* Live Gold Ticker */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-[#09090B] space-y-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  Sample Gold Feed (MCX Specifications)
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Simulated 5s Tick
                </span>
              </div>

              <div className="space-y-2">
                {tickers.map((t) => {
                  const isFlashing = flashingSymbol?.symbol === t.symbol;
                  const isPositive = t.changePercent >= 0;

                  return (
                    <div
                      key={t.symbol}
                      className={cn(
                        'flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-mono',
                        isFlashing
                          ? flashingSymbol.direction === 'up'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 transition-none'
                            : 'bg-rose-50 dark:bg-rose-950/40 transition-none'
                          : 'bg-white/70 dark:bg-[#18181B]/70 border border-slate-200/50 dark:border-zinc-800/50 transition-colors duration-1000 ease-out'
                      )}
                    >
                      <div>
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                          {t.symbol}
                        </span>
                        <span className="text-[10px] text-zinc-400 block font-sans">
                          {t.name}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className={cn(
                            'font-bold block',
                            isFlashing
                              ? flashingSymbol.direction === 'up'
                                ? 'text-emerald-600 dark:text-emerald-400 scale-105 transition-none'
                                : 'text-rose-600 dark:text-rose-400 scale-105 transition-none'
                              : 'text-zinc-900 dark:text-zinc-100 transition-colors duration-1000 ease-out'
                          )}
                        >
                          ₹{t.price.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={cn(
                            'text-[10px]',
                            isPositive
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          )}
                        >
                          {isPositive ? '+' : ''}
                          {t.changePercent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Middle: Navigation Shortcuts */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Shortcuts
              </span>
              <div className="grid grid-cols-1 gap-1.5 text-sm">
                <Link
                  to="/intelligence"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/40 hover:border-[#EAB308] dark:hover:border-[#FBBF24] hover:bg-white dark:hover:bg-zinc-800/60 transition-all group shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                    <span className="font-medium text-slate-800 dark:text-zinc-200">
                      Pairwise Intelligence
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#EAB308] dark:group-hover:text-[#FBBF24] transition-all duration-150" />
                </Link>

                <Link
                  to="/backtest"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/40 hover:border-[#EAB308] dark:hover:border-[#FBBF24] hover:bg-white dark:hover:bg-zinc-800/60 transition-all group shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-2.5">
                    <BarChart2 className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                    <span className="font-medium text-slate-800 dark:text-zinc-200">
                      Walk-Forward Backtest
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#EAB308] dark:group-hover:text-[#FBBF24] transition-all duration-150" />
                </Link>

                <Link
                  to="/methodology"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/40 hover:border-[#EAB308] dark:hover:border-[#FBBF24] hover:bg-white dark:hover:bg-zinc-800/60 transition-all group shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                    <span className="font-medium text-slate-800 dark:text-zinc-200">
                      Methodology & Formulations
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#EAB308] dark:group-hover:text-[#FBBF24] transition-all duration-150" />
                </Link>

                <Link
                  to="/about"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/40 hover:border-[#EAB308] dark:hover:border-[#FBBF24] hover:bg-white dark:hover:bg-zinc-800/60 transition-all group shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                    <span className="font-medium text-slate-800 dark:text-zinc-200">
                      About AuX Terminal
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#EAB308] dark:group-hover:text-[#FBBF24] transition-all duration-150" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    handleLinkClick();
                    openConsentBanner();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/40 hover:border-[#EAB308] dark:hover:border-[#FBBF24] hover:bg-white dark:hover:bg-zinc-800/60 transition-all group shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                    <span className="font-medium text-slate-800 dark:text-zinc-200">
                      Cookie &amp; Privacy Consent
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#EAB308] dark:group-hover:text-[#FBBF24] transition-all duration-150" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Actions & Credits */}
          <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/40 space-y-4">
            {/* Admin Control Button: ONLY VISIBLE IF role === 'admin' */}
            {session?.role === 'admin' && (
              <button
                onClick={handleAdminControlClick}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-500 dark:to-[#EAB308] dark:hover:from-amber-400 dark:hover:to-amber-500 text-slate-900 font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm border border-amber-400/40 dark:border-amber-300/30 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_3px_rgba(0,0,0,0.15)]"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Surveillance Control</span>
              </button>
            )}

            {/* Logout Button */}
            <button
              onClick={logout}
              aria-label="Logout"
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#18181B] hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-700 hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400 font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 [box-shadow:0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminate Session (Logout)</span>
            </button>

            {/* Made by Credits */}
            <div className="pt-2 text-center">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-tight">
                Made by: Krish Raj, Ananya Tiwari, Kajal Kumari
              </span>
            </div>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
};

export default SideMenu;
