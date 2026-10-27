import React, { useState, useEffect, useCallback } from 'react';
import type { UserSession, UserStats, UserRole, SessionHistoryEntry, ConsentRecord } from '../types/auth';
import { goldTickerData, type GoldTickerItem } from '../data/mockData';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Stats State
  const [stats, setStats] = useState<UserStats>(() => ({
    signalsViewed: 0,
    backtestsRun: 0,
    contractsExplored: 0,
    sessionStartTime: Date.now(),
  }));

  // 2. Consent State
  const [consent, setConsent] = useState<ConsentRecord | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('aux_consent');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isConsentBannerOpen, setIsConsentBannerOpen] = useState(false);

  // 3. Active Session from sessionStorage
  const [session, setSession] = useState<UserSession | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = sessionStorage.getItem('aux_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 4. UI states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // 5. Global Market Data Feed (5-second refresh cycle adhering to MCX tick specs)
  const [tickers, setTickers] = useState<GoldTickerItem[]>(goldTickerData);
  const [flashingSymbol, setFlashingSymbol] = useState<{ symbol: string; direction: 'up' | 'down' } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(() => new Date());
  const [isPolling, setIsPolling] = useState<boolean>(true);
  const dataStatus: 'ACTIVE' | 'PAUSED' | 'STALE' = !isPolling ? 'PAUSED' : 'ACTIVE';

  const executeTick = useCallback(() => {
    setTickers((prev) => {
      // Deterministic selection of eligible contract to update
      const randomIndex = Math.floor(Math.random() * prev.length);
      const item = prev[randomIndex];
      const isUp = Math.random() > 0.48;
      // Realistic MCX tick size: increments of ₹1.00
      const tickDelta = Math.floor(Math.random() * 4 + 1) * (isUp ? 1 : -1);
      const newPrice = Math.max(100, item.price + tickDelta);

      const originalItem = goldTickerData.find((t) => t.symbol === item.symbol);
      const basePrice = originalItem?.price ?? item.price;
      // Strict bounded fluctuation around exchange reference: ±1.2%
      const lowerBound = basePrice * 0.988;
      const upperBound = basePrice * 1.012;
      const clampedPrice = Math.max(lowerBound, Math.min(upperBound, newPrice));
      const clampedChange = clampedPrice - basePrice;
      const clampedPercent = Number(((clampedChange / basePrice) * 100).toFixed(2));

      setFlashingSymbol({
        symbol: item.symbol,
        direction: isUp ? 'up' : 'down',
      });

      setTimeout(() => {
        setFlashingSymbol(null);
      }, 1200);

      return prev.map((t, idx) =>
        idx === randomIndex
          ? { ...t, price: clampedPrice, change: clampedChange, changePercent: clampedPercent }
          : t
      );
    });
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    if (!isPolling) return;
    const tickerInterval = setInterval(executeTick, 5000);
    return () => clearInterval(tickerInterval);
  }, [isPolling, executeTick]);

  const togglePolling = useCallback(() => {
    setIsPolling((prev) => {
      const next = !prev;
      setToastMessage(next ? 'Live market feed resumed (5s interval)' : 'Market feed paused');
      return next;
    });
  }, []);

  const manualRefresh = useCallback(() => {
    executeTick();
    setToastMessage('Market feed refreshed');
  }, [executeTick]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const dismissToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Consent actions
  const acceptConsent = useCallback(() => {
    const record: ConsentRecord = {
      accepted: true,
      version: '1.0',
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem('aux_consent', JSON.stringify(record));
    } catch (err) {
      console.error('Failed to write consent:', err);
    }
    setConsent(record);
    setIsConsentBannerOpen(false);
    showToast('Preferences saved');
  }, [showToast]);

  const declineConsent = useCallback(() => {
    const record: ConsentRecord = {
      accepted: false,
      version: '1.0',
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem('aux_consent', JSON.stringify(record));
      localStorage.removeItem('aux_session_history');
    } catch (err) {
      console.error('Failed to save declined consent:', err);
    }
    setConsent(record);
    setIsConsentBannerOpen(false);
    showToast('Session tracking disabled');
  }, [showToast]);

  const openConsentBanner = useCallback(() => {
    setIsConsentBannerOpen(true);
  }, []);

  const closeConsentBanner = useCallback(() => {
    setIsConsentBannerOpen(false);
  }, []);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem('aux_consent');
    } catch (err) {
      console.error('Failed to clear consent:', err);
    }
    setConsent(null);
    setIsConsentBannerOpen(true);
    showToast('Cookie & Privacy consent reset');
  }, [showToast]);

  const hasConsent = Boolean(consent?.accepted);

  const isConsentBannerVisible =
    (consent === null || isConsentBannerOpen) &&
    session?.role !== 'admin' &&
    (() => {
      try {
        const pu = sessionStorage.getItem('aux_active_session');
        if (pu) {
          const parsed = JSON.parse(pu);
          if (parsed.role === 'admin') return false;
        }
      } catch {}
      return true;
    })();

  // Increment tracking stat
  const incrementStat = useCallback((key: keyof Omit<UserStats, 'sessionStartTime'>) => {
    setStats((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  }, []);

  // Login Handler
  const login = useCallback((name: string, role: UserRole) => {
    const snapshot: UserStats = {
      signalsViewed: stats.signalsViewed,
      backtestsRun: stats.backtestsRun,
      contractsExplored: stats.contractsExplored,
      sessionStartTime: stats.sessionStartTime,
    };

    const newSession: UserSession = {
      name: role === 'admin' ? 'Admin' : name.trim(),
      role,
      loginTime: Date.now(),
      snapshot,
    };

    try {
      sessionStorage.setItem('aux_active_session', JSON.stringify(newSession));
    } catch (e) {
      console.error('Failed to write to sessionStorage:', e);
    }

    setSession(newSession);
    setToastMessage(role === 'admin' ? 'Admin access granted' : `Welcome, ${newSession.name}`);
  }, [stats]);

  // Logout Handler & Snapshot Logic (Gated by Consent)
  const logout = useCallback(() => {
    try {
      const raw = sessionStorage.getItem('aux_active_session');
      const active: UserSession | null = raw ? JSON.parse(raw) : session;

      if (active) {
        // Check consent: must exist and have accepted === true
        let isPermitted = false;
        try {
          const rawConsent = localStorage.getItem('aux_consent');
          if (rawConsent) {
            const parsedConsent = JSON.parse(rawConsent);
            isPermitted = parsedConsent.accepted === true;
          }
        } catch {}

        // Gated: IF role === 'user' AND consent is accepted, record history
        if (active.role === 'user' && isPermitted) {
          const logoutTime = Date.now();
          const duration = Math.max(0, logoutTime - active.loginTime);
          const sessionActivity = {
            signalsViewed: Math.max(0, stats.signalsViewed - (active.snapshot?.signalsViewed ?? 0)),
            backtestsRun: Math.max(0, stats.backtestsRun - (active.snapshot?.backtestsRun ?? 0)),
            contractsExplored: Math.max(0, stats.contractsExplored - (active.snapshot?.contractsExplored ?? 0)),
          };

          const rawHistory = localStorage.getItem('aux_session_history');
          const historyList: SessionHistoryEntry[] = rawHistory ? JSON.parse(rawHistory) : [];

          const newEntry: SessionHistoryEntry = {
            sessionId: `sess-${active.loginTime}-${Math.random().toString(36).substring(2, 7)}`,
            name: active.name,
            role: active.role,
            loginTime: active.loginTime,
            logoutTime,
            duration,
            durationMinutes: Math.round(duration / 60000),
            tasksCompleted: 0,
            tasksCreated: 0,
            hoursLogged: Number((duration / 3600000).toFixed(2)),
            sessionActivity,
            consentAccepted: true,
          };

          // Append newest first, cap at 100 entries
          const updatedHistory = [newEntry, ...historyList].slice(0, 100);
          localStorage.setItem('aux_session_history', JSON.stringify(updatedHistory));
        }
        // IF role === 'admin' or !isPermitted, do NOT log anything!
      }
    } catch (err) {
      console.error('Failed to log session history:', err);
    } finally {
      sessionStorage.removeItem('aux_active_session');
      setSession(null);
      setIsSideMenuOpen(false);
      setIsAdminPanelOpen(false);
    }
  }, [session, stats]);

  return (
    <AuthContext.Provider
      value={{
        session,
        stats,
        consent,
        hasConsent,
        isConsentBannerVisible,
        acceptConsent,
        declineConsent,
        openConsentBanner,
        closeConsentBanner,
        resetConsent,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        incrementStat,
        login,
        logout,
        toastMessage,
        showToast,
        dismissToast,
        isSideMenuOpen,
        setIsSideMenuOpen,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        isCommandOpen,
        setIsCommandOpen,
        tickers,
        flashingSymbol,
        lastUpdated,
        dataStatus,
        isPolling,
        togglePolling,
        manualRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
