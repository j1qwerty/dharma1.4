// Create (or sign in) an email/password admin and grant admins/{uid}.
// Usage (password NEVER committed — pass via env):
//   $env:ADMIN_EMAIL="admin@dharmatribe.com"; $env:ADMIN_PASSWORD="..."
//   node scripts/createEmailAdmin.mjs
// Requires: Email/Password provider enabled in Firebase Console → Auth,
// and .env.local (VITE_FIREBASE_*) or FIREBASE_* env vars present.
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

const cfg = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
};
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!cfg.apiKey || !cfg.projectId) { console.error("Missing Firebase config (see firebase.md)."); process.exit(1); }
if (!email || !password) { console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD env vars."); process.exit(1); }

const app = initializeApp(cfg);
const auth = getAuth(app);
const db = getFirestore(app);

let user;
try {
  user = (await createUserWithEmailAndPassword(auth, email, password)).user;
  console.log("Created new user:", user.uid);
} catch (e) {
  if (e.code === "auth/email-already-in-use" || e.code === "auth/operation-not-allowed") {
    if (e.code === "auth/operation-not-allowed") {
      console.error("Email/Password provider is OFF — enable it in Console → Authentication → Sign-in method.");
      process.exit(1);
    }
    user = (await signInWithEmailAndPassword(auth, email, password)).user;
    console.log("User exists, signed in:", user.uid);
  } else throw e;
}

await setDoc(doc(db, "admins", user.uid), {
  email, role: "super-admin", createdAt: serverTimestamp(),
}, { merge: true });
await setDoc(doc(db, "users", user.uid), {
  email, displayName: "Admin", role: "staff", createdAt: serverTimestamp(),
}, { merge: true });
console.log(`Granted super-admin to ${email} (${user.uid}).`);
process.exit(0);
