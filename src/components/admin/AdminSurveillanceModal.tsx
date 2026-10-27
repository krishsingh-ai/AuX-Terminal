import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Trash2, Database, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import type { SessionHistoryEntry } from '../../types/auth';
import { snappyEase } from '../../utils/motion';

function readSessionHistory(): SessionHistoryEntry[] {
  try {
    const raw = localStorage.getItem('aux_session_history');
    const list: SessionHistoryEntry[] = raw ? JSON.parse(raw) : [];
    return list
      .sort((a, b) => (b.logoutTime || 0) - (a.logoutTime || 0))
      .slice(0, 100);
  } catch (err) {
    console.error('Failed to parse session history:', err);
    return [];
  }
}

export const AdminSurveillanceModal: React.FC = () => {
  const { isAdminPanelOpen, setIsAdminPanelOpen, session } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!isAdminPanelOpen || session?.role !== 'admin') {
    return null;
  }

  // Derive history directly on render
  const history = readSessionHistory();

  const handleClearHistory = () => {
    const confirmed = window.confirm(
      'Are you sure you want to permanently clear all recorded user session history? This action cannot be undone.'
    );
    if (confirmed) {
      localStorage.removeItem('aux_session_history');
      setRefreshKey((k) => k + 1);
    }
  };

  const formatDuration = (ms: number): string => {
    if (!ms || ms < 1000) return '< 1s';
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <AnimatePresence key={refreshKey}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: snappyEase }}
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={() => setIsAdminPanelOpen(false)}
          className="fixed inset-0 bg-black/60"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: snappyEase }}
          className="relative z-10 w-full max-w-5xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#121215] shadow-2xl shadow-black/20 dark:shadow-black/60 text-slate-900 dark:text-slate-100 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Admin Surveillance Console"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-900/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-[#EAB308] dark:text-[#FBBF24]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight">
                  Admin Surveillance Console
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Audit trail of user terminal sessions and delta activity snapshots
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors cursor-pointer shadow-sm [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear History
                </button>
              )}
              <button
                onClick={() => setIsAdminPanelOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body / Table */}
          <div className="flex-1 overflow-auto p-6">
            {history.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Database className="w-10 h-10 mx-auto text-zinc-400 dark:text-zinc-600" />
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  No Session History Recorded
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  User sessions and their activity snapshots are automatically compiled and stored in localStorage upon logout.
                </p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-sm">
                <table className="w-full min-w-[700px] text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 dark:bg-zinc-800/60 border-b border-slate-200 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 font-medium">
                      <th className="py-3 px-4">Operator Name</th>
                      <th className="py-3 px-4">Consent</th>
                      <th className="py-3 px-4">Login Time</th>
                      <th className="py-3 px-4">Logout Time</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4 text-right">Signals</th>
                      <th className="py-3 px-4 text-right">Backtests</th>
                      <th className="py-3 px-4 text-right">Contracts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/80">
                    {history.map((entry, idx) => {
                      let formattedLogin = 'N/A';
                      let formattedLogout = 'N/A';
                      try {
                        formattedLogin = format(new Date(entry.loginTime), 'yyyy-MM-dd HH:mm:ss');
                        formattedLogout = format(new Date(entry.logoutTime), 'yyyy-MM-dd HH:mm:ss');
                      } catch {
                        // ignore formatting fallback
                      }

                      return (
                        <tr
                          key={`${entry.loginTime}-${idx}`}
                          className="even:bg-slate-50/50 dark:even:bg-zinc-800/30 hover:bg-slate-100/50 dark:hover:bg-zinc-800/60 transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                            {entry.name}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {entry.consentAccepted === true ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 font-mono">
                                ✅ Accepted
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 font-mono">
                                ⚠️ Unknown
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600 dark:text-zinc-400 whitespace-nowrap">
                            {formattedLogin}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600 dark:text-zinc-400 whitespace-nowrap">
                            {formattedLogout}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600 dark:text-zinc-400 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-400" />
                              {formatDuration(entry.duration)}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-right font-semibold text-[#EAB308] dark:text-[#FBBF24] whitespace-nowrap">
                            +{entry.sessionActivity?.signalsViewed ?? 0}
                          </td>
                          <td className="py-3 px-4 font-mono text-right font-semibold text-[#EAB308] dark:text-[#FBBF24] whitespace-nowrap">
                            +{entry.sessionActivity?.backtestsRun ?? 0}
                          </td>
                          <td className="py-3 px-4 font-mono text-right font-semibold text-[#EAB308] dark:text-[#FBBF24] whitespace-nowrap">
                            +{entry.sessionActivity?.contractsExplored ?? 0}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-zinc-800/80 bg-slate-50/80 dark:bg-zinc-900/40 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>
              Showing {history.length} {history.length === 1 ? 'entry' : 'entries'} (capped at 100)
            </span>
            <span className="font-mono text-[11px]">
              Storage Key: aux_session_history
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminSurveillanceModal;
