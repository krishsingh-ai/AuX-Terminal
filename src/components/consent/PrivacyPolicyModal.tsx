import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Eye, Database, Clock, Mail } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const { consent, acceptConsent, declineConsent } = useAuth();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container (~600px wide) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] shadow-2xl shadow-black/20 dark:shadow-black/60 text-slate-900 dark:text-slate-100 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Privacy Policy"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-900/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24]">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold tracking-tight">Privacy Policy</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Client-side surveillance &amp; cookie consent framework
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
              {/* Section 1: What we store */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Database className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                  <h3>What we store</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  We track your session ID, operator name, login and logout timestamps, analytics views, and session duration (along with trading terminal telemetry). This telemetry is retained strictly to maintain user performance records across trading sessions.
                </p>
              </section>

              {/* Section 2: Where it's stored */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Lock className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                  <h3>Where it&apos;s stored</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  All session data and user metrics are stored entirely within your browser&apos;s local storage. No telemetry or personally identifiable information ever leaves your device or transfers to third-party cloud servers.
                </p>
              </section>

              {/* Section 3: Who can see it */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Eye className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                  <h3>Who can see it</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  Information is only visible to authorized administrators through the Admin → Users and Surveillance console on this device. Standard operators and guests cannot view or alter other user histories.
                </p>
              </section>

              {/* Section 4: How long we keep it */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Clock className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                  <h3>How long we keep it</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  We maintain a rolling audit trail of up to the last 100 sessions. Records persist until an administrator executes the &quot;Clear History&quot; action or you clear your browser application storage.
                </p>
              </section>

              {/* Section 5: Your rights */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Shield className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                  <h3>Your rights</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  You have the right to decline consent at any time. When declined, no session activities or analytics tallies will be recorded, and any previously saved surveillance data is erased.
                </p>
              </section>

              {/* Section 6: Contact */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Mail className="w-4 h-4 text-[#EAB308] dark:text-[#FBBF24]" />
                  <h3>Contact</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  For privacy inquiries, audit verification, or rights management, reach out to our team at{' '}
                  <a
                    href="mailto:privacy@aux-terminal.app"
                    className="text-[#EAB308] dark:text-[#FBBF24] hover:underline font-mono"
                  >
                    privacy@aux-terminal.app
                  </a>
                  .
                </p>
              </section>
            </div>

            {/* Footer of modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-900/40">
              <span className="text-xs font-mono text-zinc-400">
                Consent:{' '}
                <strong className={consent?.accepted ? 'text-emerald-500' : consent ? 'text-amber-500' : 'text-zinc-400'}>
                  {consent?.accepted ? 'Accepted' : consent ? 'Declined' : 'Not Set'}
                </strong>
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    acceptConsent();
                    onClose();
                  }}
                >
                  Accept All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    declineConsent();
                    onClose();
                  }}
                >
                  Decline
                </Button>
                <Button variant="secondary" size="sm" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicyModal;
