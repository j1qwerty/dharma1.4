// One-off: list admins + users roles. Prints emails/roles only.
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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
for (const coll of ["admins", "users"]) {
  const snap = await getDocs(collection(db, coll));
  console.log(`--- ${coll} (${snap.size}) ---`);
  snap.forEach((d) => console.log(d.id, JSON.stringify({ email: d.data().email, role: d.data().role, savedPujas: d.data().savedPujas?.length ?? undefined })));
}
process.exit(0);
