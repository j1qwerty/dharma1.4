import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "./firebase";

const AuthCtx = createContext({ user: null, isAdmin: false, loading: true, configured: firebaseConfigured });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseConfigured || !auth) { setLoading(false); return; }
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) { setIsAdmin(false); setLoading(false); return; }
      try {
        // Ensure a users/{uid} doc exists for CMS user listing.
        await setDoc(doc(db, "users", u.uid), {
          email: u.email || null,
          displayName: u.displayName || null,
          photoURL: u.photoURL || null,
          lastLoginAt: serverTimestamp(),
        }, { merge: true });
        const adminSnap = await getDoc(doc(db, "admins", u.uid));
        setIsAdmin(adminSnap.exists());
      } catch { setIsAdmin(false); }
      setLoading(false);
    });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!auth) throw new Error("Firebase not configured — add VITE_FIREBASE_* to .env.local");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(() => (auth ? signOut(auth) : Promise.resolve()), []);

  const value = useMemo(() => ({
    user, isAdmin, loading,
    configured: firebaseConfigured,
    signInWithGoogle, logout,
  }), [user, isAdmin, loading, signInWithGoogle, logout]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
