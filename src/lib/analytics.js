// Firebase Analytics + custom event logging for UX monitoring.
// - logEvent(): wrapper that no-ops gracefully when Analytics isn't available
//   (ad blockers, dev, unconfigured env).
// - logUX(): semantic helper for the events this CMS cares about.
// - logError(): capture client-side errors as analytics events.
//
// Env: VITE_FIREBASE_MEASUREMENT_ID (G-...) alongside the standard
// VITE_FIREBASE_* keys. When the ID is missing, this module stays dormant
// and every call no-ops — the site renders exactly as if analytics didn't exist.
import { app, firebaseConfigured } from "./firebase";

// NOTE: firebase/analytics is NEVER statically imported here. It is loaded
// lazily via dynamic import() inside boot(), so the analytics SDK lives in
// its own chunk and even a catastrophic SDK/blocker failure cannot affect
// module evaluation or first render. The site always loads without analytics.

// Analytics is strictly best-effort: ad blockers, missing measurement ID, or
// offline must NEVER break rendering. Every path below resolves to null or
// swallows — boot() never rejects and no call site can throw.
const MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || null;

let analytics = null;
let analyticsApi = null;
let bootPromise = null;

function boot() {
  if (bootPromise) return bootPromise;
  bootPromise = (async () => {
    try {
      if (!firebaseConfigured || !app || !MEASUREMENT_ID) return null;
      const mod = await import("firebase/analytics");
      const supported = await mod.isSupported();
      if (!supported) return null;
      analytics = mod.getAnalytics(app);
      analyticsApi = mod;
      return analytics;
    } catch {
      analytics = null;
      analyticsApi = null;
      return null;
    }
  })();
  // Belt-and-suspenders: the cached promise can never reject, so floating it
  // at module scope cannot produce unhandled rejections that blank the app.
  bootPromise.catch(() => null);
  return bootPromise;
}

// Fire-and-forget boot on module import so events are ready ASAP.
try { boot(); } catch { /* ignore */ }

/** Low-level: log a custom event with optional params. No-ops if Analytics unavailable. */
export function logEvent(name, params = {}) {
  try {
    if (!analytics || !analyticsApi) {
      // Best-effort: try booting on first call. Never rejects, never throws.
      boot().then(() => {
        if (!analytics || !analyticsApi) return;
        try { analyticsApi.logEvent(analytics, name, params); } catch { /* ignore */ }
      }).catch(() => {});
      return;
    }
    analyticsApi.logEvent(analytics, name, params);
  } catch { /* ignore */ }
}

/** Set the current screen name for funnel tracking. */
export function setScreenName(name) {
  try {
    if (!analytics || !analyticsApi) {
      boot().then(() => {
        if (!analytics || !analyticsApi) return;
        try { analyticsApi.setCurrentScreen(analytics, name); } catch { /* ignore */ }
      }).catch(() => {});
      return;
    }
    analyticsApi.setCurrentScreen(analytics, name);
  } catch { /* ignore */ }
}

/**
 * Semantic UX events for this CMS. Centralised so every call-site uses the
 * same event name + param shape (easier to build funnels in GA).
 */
export function logUX(eventName, params = {}) {
  // Prefix all custom events with `cms_` so they're easy to filter in GA.
  return logEvent(`cms_${eventName}`, {
    // Always include the URL path so we know where the event originated.
    path: typeof location !== "undefined" ? location.pathname : null,
    ...params,
  });
}

/** Convenience: log a client-side error so it shows up in GA as an event. */
export function logError(description, fatal = false) {
  return logUX("error", {
    error_description: String(description || "").slice(0, 100),
    fatal: Boolean(fatal),
  });
}

// Standard UX events this app cares about (mirrors the spec). Importing code
// can call these directly, or call logUX() with a custom name.
export const ux = {
  inquiry: (params) => logUX("inquiry", params),
  bookingStarted: (params) => logUX("booking_started", params),
  bookingCompleted: (params) => logUX("booking_completed", params),
  bookingWhatsappOpened: (params) => logUX("booking_whatsapp_opened", params),
  signup: (method) => logUX("signup", { method: method || "email" }),
  login: (method) => logUX("login", { method: method || "email" }),
  wishlistAdd: (pujaId) => logUX("wishlist_add", { puja_id: pujaId }),
  wishlistRemove: (pujaId) => logUX("wishlist_remove", { puja_id: pujaId }),
  addressAdded: () => logUX("address_added"),
  search: (query) => logUX("search", { query: String(query || "").slice(0, 100) }),
};

// Global error capture: log uncaught errors so they show up in GA.
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    logError(e?.message || "unknown error", false);
  });
  window.addEventListener("unhandledrejection", (e) => {
    logError(`unhandledrejection: ${e?.reason?.message || e?.reason || ""}`, false);
  });
}

export { boot as initAnalytics };
