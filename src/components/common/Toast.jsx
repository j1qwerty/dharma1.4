import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Info, Warning, X, Heart } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ *
 * ToastProvider - a lightweight, accessible toast system.
 * toasts.push({ type, title, desc }) -> auto-dismiss after 3.2s.
 * Rendered through a portal at document.body, reduced-motion safe.
 * ------------------------------------------------------------------ */

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  info: Info,
  warning: Warning,
  favorite: Heart,
};

const TONES = {
  success: "var(--gold-dark)",
  info: "var(--muted)",
  warning: "#b6553a",
  favorite: "var(--gold-dark)",
};

let _id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback(
    (opts) => {
      const id = ++_id;
      const toast = { id, type: "info", ...opts };
      setToasts((prev) => [...prev, toast]);
      timers.current[id] = setTimeout(() => dismiss(id), opts.duration || 3200);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="toast-stack-dt" aria-live="polite" aria-atomic="false">
            <AnimatePresence>
              {toasts.map((t) => {
                const Icon = ICONS[t.type] || Info;
                return (
                  <motion.div
                    key={t.id}
                    className="toast-dt"
                    initial={{ opacity: 0, x: 40, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 40, scale: 0.96 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    role="status"
                  >
                    <span className="toast-icon-dt" style={{ color: TONES[t.type] }}>
                      <Icon size={17} weight={t.type === "favorite" ? "fill" : "regular"} />
                    </span>
                    <div className="toast-body-dt">
                      {t.title && <strong className="toast-title-dt">{t.title}</strong>}
                      {t.desc && <span className="toast-desc-dt">{t.desc}</span>}
                    </div>
                    <button
                      className="toast-close-dt"
                      onClick={() => dismiss(t.id)}
                      aria-label="Dismiss notification"
                    >
                      <X size={13} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
