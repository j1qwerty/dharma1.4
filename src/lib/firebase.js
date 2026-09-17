// Firebase init — returns nulls when env is missing so the site
// gracefully falls back to local src/lib/data.js (see src/lib/cms.js).
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // Google Analytics measurement ID (G-...). Optional at runtime: when
  // absent, src/lib/analytics.js stays dormant and the site renders normally.
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

export const firebaseConfigured = Boolean(cfg.apiKey && cfg.projectId && cfg.appId);

let app = null;
if (firebaseConfigured && !getApps().length) app = initializeApp(cfg);
else if (getApps().length) app = getApps()[0];

export { app };
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
