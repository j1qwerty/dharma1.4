// One-off: find a user by email in `users` and grant super-admin.
// Run: $env:ADMIN_EMAIL=...; $env:ADMIN_PASSWORD=...; $env:TARGET_EMAIL=...; node grantAdminByEmail.mjs
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const cfg = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};
const { ADMIN_EMAIL, ADMIN_PASSWORD, TARGET_EMAIL } = process.env;
if (!cfg.apiKey || !ADMIN_EMAIL || !ADMIN_PASSWORD || !TARGET_EMAIL) {
  console.error("Missing config — set VITE_FIREBASE_* + ADMIN_EMAIL/PASSWORD + TARGET_EMAIL.");
  process.exit(1);
}
const app = initializeApp(cfg);
const auth = getAuth(app);
const db = getFirestore(app);
await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
const snap = await getDocs(query(collection(db, "users"), where("email", "==", TARGET_EMAIL)));
if (snap.empty) {
  console.error(`No users doc for ${TARGET_EMAIL} — ask them to sign in once at /admin/login first.`);
  process.exit(1);
}
const uid = snap.docs[0].id;
await setDoc(doc(db, "admins", uid), { email: TARGET_EMAIL, role: "super-admin", createdAt: serverTimestamp() }, { merge: true });
console.log(`Granted super-admin to ${TARGET_EMAIL} (uid ${uid}).`);
process.exit(0);
