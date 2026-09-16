import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "./firebase";
import { ROLES, canAccessAdmin } from "./roles";

const AuthCtx = createContext({ user: null, role: ROLES.CUSTOMER, adminRole: null, isAdmin: false, loading: true, configured: firebaseConfigured });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(ROLES.CUSTOMER);
  const [adminRole, setAdminRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseConfigured || !auth) { setLoading(false); return; }
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) { setRole(ROLES.CUSTOMER); setAdminRole(null); setLoading(false); return; }
      try {
        // Ensure a users/{uid} doc exists; backfill role=customer when missing
        // (never overwrites staff roles).
        const userRef = doc(db, "users", u.uid);
        const userSnap = await getDoc(userRef);
        const existingRole = userSnap.exists() ? userSnap.data().role : null;
        await setDoc(userRef, {
          email: u.email || null,
          displayName: u.displayName || null,
          photoURL: u.photoURL || null,
          ...(existingRole ? {} : { role: ROLES.CUSTOMER }),
          lastLoginAt: serverTimestamp(),
        }, { merge: true });
        setRole(existingRole || ROLES.CUSTOMER);
        const adminSnap = await getDoc(doc(db, "admins", u.uid));
        const aRole = adminSnap.exists() ? (adminSnap.data().role || ROLES.SUPER_ADMIN) : null;
        setAdminRole(aRole);
      } catch { setRole(ROLES.CUSTOMER); setAdminRole(null); }
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

  const signInWithEmail = useCallback(async (email, password) => {
    if (!auth) throw new Error("Firebase not configured — add VITE_FIREBASE_* to .env.local");
    return signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const isAdmin = canAccessAdmin(adminRole);

  const value = useMemo(() => ({
    user, role, adminRole, isAdmin, loading,
    configured: firebaseConfigured,
    signInWithGoogle, signInWithEmail, logout,
  }), [user, role, adminRole, isAdmin, loading, signInWithGoogle, signInWithEmail, logout]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
