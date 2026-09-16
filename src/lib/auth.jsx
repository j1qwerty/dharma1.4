import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
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

  const logout = useCallback(async () => {
    if (auth) {
      try { await signOut(auth); } catch { /* ignore */ }
    }
    // Reset the wishlist on sign-out so the next person on this browser
    // starts clean. FavoritesProvider also listens for "dt:logout" to
    // reset its in-memory state (same-tab storage events don't fire).
    try {
      localStorage.removeItem("dt-favorites");
      window.dispatchEvent(new Event("dt:logout"));
    } catch { /* storage may be unavailable; ignore */ }
  }, []);

  const signInWithEmail = useCallback(async (email, password) => {
    if (!auth) throw new Error("Firebase not configured — add VITE_FIREBASE_* to .env.local");
    return signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signUpWithEmail = useCallback(async (email, password) => {
    if (!auth) throw new Error("Firebase not configured — add VITE_FIREBASE_* to .env.local");
    return createUserWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const isAdmin = canAccessAdmin(adminRole);

  const value = useMemo(() => ({
    user, role, adminRole, isAdmin, loading,
    configured: firebaseConfigured,
    signInWithGoogle, signInWithEmail, signUpWithEmail, logout,
  }), [user, role, adminRole, isAdmin, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logout]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}

/** Post-login landing: staff go to the CMS, everyone else to their account. */
export function postLoginPath(isAdmin) {
  return isAdmin ? "/admin" : "/dashboard";
}
