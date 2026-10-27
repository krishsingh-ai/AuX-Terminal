import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const ConsentBanner: React.FC = () => {
  const {
    isConsentBannerVisible,
    consent,
    acceptConsent,
    declineConsent,
    closeConsentBanner,
    isPrivacyModalOpen,
    setIsPrivacyModalOpen,
  } = useAuth();

  // Keyboard Navigation: Enter = Accept All, Escape = Decline (only when privacy modal is NOT open)
  useEffect(() => {
    if (!isConsentBannerVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        acceptConsent();
      } else if (e.key === 'Escape' && !isPrivacyModalOpen) {
        e.preventDefault();
        closeConsentBanner();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConsentBannerVisible, isPrivacyModalOpen, acceptConsent, closeConsentBanner]);

  return (
    <AnimatePresence>
      {isConsentBannerVisible && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 pointer-events-none">
          {/* Backdrop for authentic popup appearance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeConsentBanner}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs pointer-events-auto"
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-xl shadow-2xl shadow-black/20 dark:shadow-black/70 p-5 sm:p-6 text-slate-900 dark:text-slate-100 pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Privacy and cookie consent modal"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center shrink-0 text-[#EAB308] dark:text-[#FBBF24]">
                <Shield className="w-5 h-5" />
              </div>

              {/* Content Body */}
              <div className="flex-1 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                      Cookie &amp; Privacy Consent
                    </h2>
                    {consent !== null && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono mt-0.5 text-zinc-500 dark:text-zinc-400">
                        Current Status:{' '}
                        {consent.accepted ? (
                          <span className="text-emerald-500 font-semibold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Accepted
                          </span>
                        ) : (
                          <span className="text-amber-500 font-semibold inline-flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Declined
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  {consent !== null && (
                    <button
                      type="button"
                      onClick={closeConsentBanner}
                      className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      aria-label="Close consent banner"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  We use local storage to persist your sessions, track analytics activity, and store performance snapshots. All data stays strictly in your browser and is never sent to external servers.
                </p>

                {/* Actions: Stacked on mobile, inline on desktop */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <button
                      type="button"
                      onClick={acceptConsent}
                      className="px-4 py-2 rounded-xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-500 dark:to-[#EAB308] dark:hover:from-amber-400 dark:hover:to-amber-500 text-slate-900 text-xs font-semibold transition-all cursor-pointer shadow-sm border border-amber-400/40 dark:border-amber-300/30 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.1)] text-center focus:outline-none focus:ring-2 focus:ring-[#EAB308] dark:focus:ring-[#FBBF24]"
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      onClick={declineConsent}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#18181B] hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-semibold transition-colors cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      Decline
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#EAB308] dark:hover:text-[#FBBF24] underline underline-offset-4 cursor-pointer text-left sm:text-right transition-colors focus:outline-none"
                  >
                    Learn more &amp; full policy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;
