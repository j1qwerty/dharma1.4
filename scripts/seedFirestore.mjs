// Seed Firestore from current local content (src/lib/data.js).
// Usage: node scripts/seedFirestore.mjs
// Requires: .env.local with VITE_FIREBASE_* OR FIREBASE_* env vars.
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { pujas, festivals, stories, acharyas } from "../src/lib/data.js";

const cfg = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
};

if (!cfg.apiKey || !cfg.projectId) {
  console.error("Missing Firebase config. Fill .env.local first (see firebase.md).");
  process.exit(1);
}

const app = initializeApp(cfg);
const db = getFirestore(app);

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function main() {
  for (const [i, p] of pujas.entries()) {
    await setDoc(doc(db, "pujas", p.id || slug(p.title)), {
      ...p, status: "published", priority: i,
      version: 1, versions: [], deletedAt: null, deleteAt: null,
      startDate: null, endDate: null, updatedAt: serverTimestamp(),
    }, { merge: true });
  }
  console.log(`pujas: ${pujas.length}`);
  for (const [i, f] of festivals.entries()) {
    await setDoc(doc(db, "festivals", slug(f.name)), {
      ...f, status: "published", priority: i,
      version: 1, versions: [], deletedAt: null, deleteAt: null,
      eventDate: f.date || null, startDate: null, endDate: null,
      visibilityStart: null, visibilityEnd: null,
      linkedPujaIds: [], homepageTakeover: false, updatedAt: serverTimestamp(),
    }, { merge: true });
  }
  console.log(`festivals: ${festivals.length}`);
  for (const s of stories) {
    await setDoc(doc(db, "stories", s.id), {
      ...s, status: "published", version: 1, versions: [],
      deletedAt: null, deleteAt: null, startDate: null, endDate: null,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
  console.log(`stories: ${stories.length}`);
  for (const [i, a] of acharyas.entries()) {
    await setDoc(doc(db, "acharyas", a.id), {
      ...a, status: "published", order: i, version: 1, versions: [],
      deletedAt: null, deleteAt: null, startDate: null, endDate: null,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
  console.log(`acharyas: ${acharyas.length}`);
  // Default homepage sections skeleton (disabled scheduling = always live when enabled)
  // Order matches HOMEPAGE_SECTIONS in src/lib/content.js (mirrors Home.jsx).
  const sections = ["announcementBar","hero","assurance","countdown","acharyasPreview","upcomingPujas","festivalStrip","festivalCalendar","intentions","howItWorks","trustBand","storiesPreview","socialFeed","recurringSeva","templeNetwork","newsletter"];
  for (const [i, key] of sections.entries()) {
    await setDoc(doc(db, "homepage_sections", key), {
      key, enabled: true, order: i, status: "published",
      version: 1, versions: [], deletedAt: null, deleteAt: null,
      title: null, titleHi: null, copy: null, copyHi: null, image: null,
      config: { mode: "auto", limit: 6, pujaIds: [], festivalId: null },
      startDate: null, endDate: null, updatedAt: serverTimestamp(),
    }, { merge: true });
  }
  console.log(`homepage_sections: ${sections.length}`);
  // Site-wide settings defaults (admin-writable, publicly readable).
  await setDoc(doc(db, "site_settings", "global"), {
    phoneAuth: { customer: false, admin: false },
    whatsappNumber: "9958728666",
    announcement: { enabled: false, text: null, textHi: null },
    updatedAt: serverTimestamp(),
  }, { merge: true });
  console.log("site_settings/global: ok");
  console.log("Seed complete.");
}

main().catch((e) => { console.error(e); process.exit(1); });
