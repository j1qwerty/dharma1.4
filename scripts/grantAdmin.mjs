// Grant super-admin to an existing Firebase Auth user by UID.
// Sign-in uses an existing admin's email/password.
// Usage:
//   $env:ADMIN_EMAIL="admin@dharmatribe.com"; $env:ADMIN_PASSWORD="..."
//   $env:TARGET_UID="..."; $env:TARGET_EMAIL="du18ck@gmail.com"
//   node scripts/grantAdmin.mjs
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

const cfg = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
};
const { ADMIN_EMAIL, ADMIN_PASSWORD, TARGET_UID, TARGET_EMAIL } = process.env;

if (!cfg.apiKey || !cfg.projectId) { console.error("Missing Firebase config (see firebase.md)."); process.exit(1); }
if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !TARGET_UID) {
  console.error("Set ADMIN_EMAIL, ADMIN_PASSWORD and TARGET_UID env vars.");
  process.exit(1);
}

const app = initializeApp(cfg);
const auth = getAuth(app);
const db = getFirestore(app);

await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
await setDoc(doc(db, "admins", TARGET_UID), {
  email: TARGET_EMAIL || null, role: "super-admin", createdAt: serverTimestamp(),
}, { merge: true });
console.log(`Granted super-admin to ${TARGET_EMAIL || TARGET_UID}.`);
process.exit(0);
