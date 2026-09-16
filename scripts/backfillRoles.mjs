// One-off: set role=customer on users docs missing a role (never overwrites).
// Usage: $env:ADMIN_EMAIL=...; $env:ADMIN_PASSWORD=...; node scripts/backfillRoles.mjs
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const cfg = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(cfg);
const auth = getAuth(app);
const db = getFirestore(app);
await signInWithEmailAndPassword(auth, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
const snap = await getDocs(collection(db, "users"));
let fixed = 0;
for (const d of snap.docs) {
  if (!d.data().role) {
    await setDoc(doc(db, "users", d.id), { role: "customer" }, { merge: true });
    console.log("customer ←", d.data().email || d.id);
    fixed++;
  }
}
console.log(`done, ${fixed} backfilled, ${snap.size} total.`);
process.exit(0);
