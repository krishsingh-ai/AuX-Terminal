import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const ConsentBanner: React.FC = () => {
  const {
    isConsentBannerVisible,
    consent,
    acceptConsent,
    declineConsent,
    closeConsentBanner,
  } = useAuth();

  useEffect(() => {
    if (!isConsentBannerVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        acceptConsent();
      } else if (e.key === 'Escape' && consent !== null) {
        e.preventDefault();
        closeConsentBanner();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConsentBannerVisible, consent, acceptConsent, closeConsentBanner]);

  return (
    <AnimatePresence>
      {isConsentBannerVisible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-40 sm:max-w-md w-auto rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md shadow-xl shadow-black/10 dark:shadow-black/60 p-4 text-slate-900 dark:text-slate-100 pointer-events-auto"
          role="region"
          aria-label="Privacy and local storage notice"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-slate-600 dark:text-zinc-400">
              <Shield className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xs font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Cookie &amp; Privacy Preferences
                </h2>
                {consent !== null && (
                  <button
                    type="button"
                    onClick={closeConsentBanner}
                    className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    aria-label="Close consent notice"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                We store your active session credentials, role preferences, and theme settings locally in browser storage. No data is sent to external servers or third parties.
              </p>

              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={acceptConsent}
                  className="px-3.5 py-1.5 rounded-lg bg-[#EAB308] hover:bg-[#CA8A04] dark:bg-[#FBBF24] dark:hover:bg-[#EAB308] text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={declineConsent}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;
