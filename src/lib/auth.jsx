import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  applyActionCode,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
} from "firebase/auth";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "./firebase";
import { ROLES, canAccessAdmin, canAccessStaff, isSuperAdmin } from "./roles";
import { ux } from "./analytics";

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
        // (never overwrites staff roles). Persist displayName from Google.
        const userRef = doc(db, "users", u.uid);
        const userSnap = await getDoc(userRef);
        const existingRole = userSnap.exists() ? userSnap.data().role : null;
        const update = {
          email: u.email || null,
          displayName: u.displayName || userSnap.data()?.displayName || null,
          photoURL: u.photoURL || null,
          ...(existingRole ? {} : { role: ROLES.CUSTOMER }),
          lastLoginAt: serverTimestamp(),
        };
        // On first Google signup with no displayName, derive from email.
        if (!update.displayName && u.email) {
          update.displayName = u.email.split("@")[0];
        }
        await setDoc(userRef, update, { merge: true });
        setRole(existingRole || ROLES.CUSTOMER);
        const adminSnap = await getDoc(doc(db, "admins", u.uid));
        const aRole = adminSnap.exists() ? (adminSnap.data().role || ROLES.SUPER_ADMIN) : null;
        setAdminRole(aRole);
      } catch { setRole(ROLES.CUSTOMER); setAdminRole(null); }
      setLoading(false);
    });
  }, []);

  const signInWithGoogle = useCallback(async (displayName = null) => {
    if (!auth) throw new Error("Firebase not configured — add VITE_FIREBASE_* to .env.local");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const cred = await signInWithPopup(auth, provider);
    // If a name was provided (e.g. registration form) and Google didn't return one, set it.
    if (displayName && cred?.user && !cred.user.displayName) {
      try {
        await updateProfile(cred.user, { displayName });
        await setDoc(doc(db, "users", cred.user.uid), { displayName }, { merge: true });
      } catch { /* non-fatal */ }
    }
    return cred;
  }, []);

  const logout = useCallback(async () => {
    if (auth) {
      try { await signOut(auth); } catch { /* ignore */ }
    }
    try {
      localStorage.removeItem("dt-favorites");
      window.dispatchEvent(new Event("dt:logout"));
    } catch { /* storage may be unavailable; ignore */ }
  }, []);

  const signInWithEmail = useCallback(async (email, password) => {
    if (!auth) throw new Error("Firebase not configured — add VITE_FIREBASE_* to .env.local");
    return signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signUpWithEmail = useCallback(async (email, password, name = null) => {
    if (!auth) throw new Error("Firebase not configured — add VITE_FIREBASE_* to .env.local");
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    // Persist display name to the auth profile + users doc.
    if (name && cred?.user) {
      try {
        await updateProfile(cred.user, { displayName: name });
        await setDoc(doc(db, "users", cred.user.uid), { displayName: name }, { merge: true });
      } catch { /* non-fatal */ }
    }
    return cred;
  }, []);

  /**
   * Email OTP sign-in: send a sign-in link to the user's email. The link
   * opens /auth/finish?... and completes the sign-in via isSignInWithEmailLink.
   * For OTP-style codes (6 digit), we use the passwordless email-link flow
   * since Firebase Auth doesn't natively support email-based OTP codes.
   */
  const sendEmailOtp = useCallback(async (email) => {
    if (!auth) throw new Error("Firebase not configured");
    const actionCodeSettings = {
      url: `${window.location.origin}/auth/finish`,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email.trim(), actionCodeSettings);
    try { window.localStorage.setItem("dt-email-for-signin", email.trim()); } catch { /* ignore */ }
  }, []);

  /** Complete email-link sign-in (called from /auth/finish). */
  const completeEmailSignIn = useCallback(async (emailIfMissing) => {
    if (!auth) throw new Error("Firebase not configured");
    const { isSignInWithEmailLink, signInWithEmailLink } = await import("firebase/auth");
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      throw new Error("Invalid sign-in link.");
    }
    let email = emailIfMissing || "";
    if (!email) {
      try { email = window.localStorage.getItem("dt-email-for-signin") || ""; } catch { /* ignore */ }
    }
    if (!email) throw new Error("Could not determine which email to sign in with.");
    return signInWithEmailLink(auth, email, window.location.href);
  }, []);

  // ---- Phone OTP (kept for back-compat; not exposed in UI per spec) ----
  const setupRecaptcha = useCallback((containerId = "recaptcha-container") => {
    if (!auth) throw new Error("Firebase not configured");
    if (window.recaptchaVerifier) return window.recaptchaVerifier;
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {},
    });
    return window.recaptchaVerifier;
  }, []);

  const signInWithPhone = useCallback(async (phone) => {
    if (!auth) throw new Error("Firebase not configured");
    const verifier = setupRecaptcha();
    return signInWithPhoneNumber(auth, phone, verifier);
  }, [setupRecaptcha]);

  const isAdmin = canAccessAdmin(adminRole);

  const value = useMemo(() => ({
    user, role, adminRole, isAdmin, loading,
    configured: firebaseConfigured,
    signInWithGoogle, signInWithEmail, signUpWithEmail,
    sendEmailOtp, completeEmailSignIn,
    signInWithPhone,
    logout,
  }), [user, role, adminRole, isAdmin, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, sendEmailOtp, completeEmailSignIn, signInWithPhone, logout]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}

/** Post-login landing: super-admins go to the CMS, staff to the staff
 *  console, everyone else to their account. Accepts an admins/{uid} role
 *  (or legacy boolean isAdmin). */
export function postLoginPath(adminRole) {
  if (adminRole === true || isSuperAdmin(adminRole)) return "/admin";
  if (canAccessStaff(adminRole)) return "/staff";
  return "/dashboard";
}
