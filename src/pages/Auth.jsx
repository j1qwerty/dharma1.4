import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, FlowerLotus } from "@phosphor-icons/react";
import Brand from "../components/common/Brand";
import Field from "../components/common/Field";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import { SectionDecor } from "../components/common/decor";
import { postLoginPath, useAuth } from "../lib/auth";
import PhoneLogin from "../components/common/PhoneLogin";
import GoogleIcon from "../components/common/GoogleIcon";
import { useSiteSettings, isPhoneEnabled } from "../lib/settings";

const art =
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=86";
export default function Auth({ mode = "login" }) {
  const nav = useNavigate();
  const { user, isAdmin, loading, configured, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const { settings } = useSiteSettings();
  const showPhone = configured && isPhoneEnabled(settings, "customer");
  const [expectRedirect, setExpectRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [emailBusy, setEmailBusy] = useState(false);

  // Role-aware landing: staff → /admin, customers → /dashboard.
  // Waits for the auth state (incl. admin lookup) to settle after sign-in.
  useEffect(() => {
    if (expectRedirect && !loading && user) {
      setExpectRedirect(false);
      nav(postLoginPath(isAdmin), { replace: true });
    }
  }, [expectRedirect, loading, user, isAdmin, nav]);

  const goGoogle = async () => {
    setEmailErr(null);
    try { await signInWithGoogle(); setExpectRedirect(true); }
    catch (e) { setEmailErr(e.message); }
  };

  const goEmail = async (e) => {
    e?.preventDefault();
    setEmailErr(null);
    if (!email.trim() || password.length < 6) {
      setEmailErr(mode === "register"
        ? "Enter an email and a password of 6+ characters."
        : "Enter your email and password.");
      return;
    }
    setEmailBusy(true);
    try {
      if (mode === "register") await signUpWithEmail(email, password);
      else await signInWithEmail(email, password);
      setExpectRedirect(true);
    } catch (err) {
      setEmailErr(err?.code?.includes("email-already-in-use")
        ? "Account exists — sign in instead."
        : err?.code?.includes("invalid-credential") || err?.code?.includes("wrong-password")
          ? "Wrong email or password."
          : err?.message || "Sign-in failed.");
    }
    setEmailBusy(false);
  };
  const title =
    mode === "login"
      ? "Welcome back."
      : mode === "register"
        ? "Create your account."
        : "Verify your number.";
  return (
    <section className="auth-dt has-decor-dt">
      <SectionDecor />
      <aside className="auth-art-dt relative">
        <ParallaxImage src={art} alt="Temple" className="absolute inset-0 h-full" strength={20} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />
        <div className="absolute left-8 right-8 top-8">
          <Brand dark />
        </div>
        <div className="absolute left-8 right-8 bottom-10">
          <div className="text-[10px] uppercase tracking-[.18em] text-gold-300">DharmaTribe</div>
          <h2 className="display-dt mt-3 text-5xl">Every booking has a place to return to.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
            Track the ritual, open the video, manage your Sankalp and see what comes next.
          </p>
        </div>
      </aside>
      <main className="auth-form-dt">
        <Reveal className="w-full max-w-[430px]">
          <Brand />
          <div className="eyebrow mt-10">
            {mode === "login" ? "My account" : mode === "register" ? "New devotee" : "Verification"}
          </div>
          <h1 className="display-dt mt-3 text-6xl">{title}</h1>
          {mode === "otp" ? (
            <>
              <p className="mt-4 text-sm leading-7 muted-dt">
                Enter the six-digit code we sent to your mobile.
              </p>
              <div className="mt-8 grid grid-cols-6 gap-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <input
                    key={i}
                    maxLength={1}
                    aria-label={`OTP ${i + 1}`}
                    className="h-14 rounded-xl border border-dt bg-transparent text-center text-lg outline-none focus:border-gold-400"
                  />
                ))}
              </div>
              <button onClick={() => nav("/dashboard")} className="btn-gold-dt mt-6 w-full">
                Verify <Check size={15} />
              </button>
            </>
          ) : (
            <>
              <p className="mt-4 max-w-md text-sm leading-7 muted-dt">
                Use your mobile or email to access your bookings and blessings.
              </p>
              <div className="mt-7 grid gap-4">
                {mode === "register" && <Field label="Full name" placeholder="Aarav Mehta" />}
                <Field
                  label={mode === "login" ? "Mobile / Email" : "Email"}
                  placeholder="you@example.com"
                />
                {mode === "register" && <Field label="Mobile" placeholder="+91 98765 43210" />}
              </div>
              <label className="mt-5 flex items-start gap-3 text-xs leading-5 muted-dt">
                <input type="checkbox" defaultChecked className="mt-1 accent-gold-500" />I agree to
                the Terms & Privacy Policy.
              </label>
              <button onClick={() => nav("/auth/otp")} className="btn-gold-dt mt-6 w-full">
                {mode === "login" ? "Send OTP" : "Create account"} <ArrowRight size={15} />
              </button>
              {configured && (
                <>
                  <div className="mt-4 text-center text-xs muted-dt">or continue with</div>
                  <button onClick={goGoogle} className="btn-ghost-dt mt-2 w-full">
                    <GoogleIcon />
                    Continue with Google
                  </button>
                  <form onSubmit={goEmail} className="mt-4 grid gap-3">
                    <input type="email" required placeholder="you@example.com" value={email}
                      onChange={(e) => setEmail(e.target.value)} aria-label="Email"
                      className="h-11 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none" />
                    <input type="password" required placeholder={mode === "register" ? "Create password (6+ characters)" : "Password"} value={password}
                      onChange={(e) => setPassword(e.target.value)} aria-label="Password"
                      className="h-11 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none" />
                    {emailErr && <p style={{ color: "#b3261e", fontSize: 13 }}>{emailErr}</p>}
                    <button type="submit" disabled={emailBusy} className="btn-ghost-dt w-full">
                      {emailBusy ? "Please wait…" : mode === "register" ? "Create account with email" : "Sign in with email"} <ArrowRight size={14} />
                    </button>
                  </form>
                  {showPhone && (
                    <div className="mt-4 border-t border-dt pt-4">
                      <PhoneLogin compact onDone={() => setExpectRedirect(true)} />
                    </div>
                  )}
                </>
              )}
              <div className="mt-8 text-center text-xs muted-dt">
                {mode === "login" ? (
                  <>
                    New here?{" "}
                    <button
                      onClick={() => nav("/auth/register")}
                      className="font-bold text-gold-600"
                    >
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button onClick={() => nav("/auth/login")} className="font-bold text-gold-600">
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </Reveal>
      </main>
    </section>
  );
}
