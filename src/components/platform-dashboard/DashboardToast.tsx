import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { motionTransition } from '../../lib/motion';

type ToastItem = { id: number; message: string };

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function DashboardToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.25);

  const showToast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="platform-dashboard-toasts" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className="platform-dashboard-toast"
              role="status"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              transition={transition}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useDashboardToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useDashboardToast must be used within DashboardToastProvider');
  return ctx;
}
