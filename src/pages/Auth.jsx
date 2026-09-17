import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Check, Envelope } from "@phosphor-icons/react";
import Brand from "../components/common/Brand";
import Field from "../components/common/Field";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import { SectionDecor } from "../components/common/decor";
import { postLoginPath, useAuth } from "../lib/auth";
import GoogleIcon from "../components/common/GoogleIcon";
import { ux } from "../lib/analytics";

const art =
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=86";

export default function Auth({ mode = "login" }) {
  const nav = useNavigate();
  const loc = useLocation();
  const { user, isAdmin, loading, configured, signInWithGoogle, signInWithEmail, signUpWithEmail, sendEmailOtp, completeEmailSignIn } = useAuth();
  const [expectRedirect, setExpectRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [emailBusy, setEmailBusy] = useState(false);

  // OTP state (email-based)
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpBusy, setOtpBusy] = useState(false);
  const [otpErr, setOtpErr] = useState(null);

  // Role-aware landing: staff → /admin, customers → /dashboard (or the page
  // they came from — e.g. clicking the heart icon while logged out).
  useEffect(() => {
    if (expectRedirect && !loading && user) {
      setExpectRedirect(false);
      const from = loc.state?.from;
      nav(from || postLoginPath(isAdmin), { replace: true });
    }
  }, [expectRedirect, loading, user, isAdmin, nav, loc.state]);

  const goGoogle = async () => {
    setEmailErr(null);
    try {
      await signInWithGoogle(name || undefined);
      ux.login("google");
      setExpectRedirect(true);
    } catch (e) { setEmailErr(e.message); }
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
      if (mode === "register") {
        await signUpWithEmail(email, password, name);
        ux.signup("email");
      } else {
        await signInWithEmail(email, password);
        ux.login("email");
      }
      setExpectRedirect(true);
    } catch (err) {
      const code = err?.code || "";
      if (code.includes("email-already-in-use")) {
        setEmailErr("An account already exists with this email. Sign in instead.");
      } else if (code.includes("invalid-credential") || code.includes("wrong-password")) {
        setEmailErr("Wrong email or password.");
      } else if (code.includes("email-not-verified")) {
        // Trigger email OTP and route to /auth/otp
        setEmailErr(null);
        await startOtp();
        return;
      } else {
        setEmailErr(err?.message || "Sign-in failed.");
      }
    }
    setEmailBusy(false);
  };

  // Email OTP flow: send code, route to /auth/otp
  const startOtp = async () => {
    if (!email.trim()) {
      setEmailErr("Enter your email first.");
      return;
    }
    setOtpBusy(true);
    setOtpErr(null);
    try {
      await sendEmailOtp(email.trim());
      nav("/auth/otp", { state: { email: email.trim(), mode: "verify" } });
    } catch (e) {
      setOtpErr(e?.message || "Could not send code.");
    }
    setOtpBusy(false);
  };

  // OTP verify (used on /auth/otp) — email-link flow: user clicks link in
  // their inbox, which redirects back to /auth/finish where we complete the
  // sign-in. This page just confirms the email was sent and waits.
  const onOtpChange = (i, v) => {
    const next = [...otpCode];
    next[i] = v.replace(/[^0-9]/g, "").slice(0, 1);
    setOtpCode(next);
    if (i < 5 && next[i]) {
      const el = document.getElementById(`otp-${i + 1}`);
      if (el) el.focus();
    }
  };

  const verifyOtp = async () => {
    setOtpBusy(true);
    setOtpErr(null);
    try {
      // In email-link mode there's no code to type — instead the user opens
      // the link in their inbox. But we still allow manual completion here
      // for users who pasted the link into the same browser.
      await completeEmailSignIn(email);
      ux.login("email-link");
      setExpectRedirect(true);
    } catch (e) {
      setOtpErr(e?.message || "Could not complete sign-in. Click the link in your email.");
    }
    setOtpBusy(false);
  };

  const title =
    mode === "login"
      ? "Welcome back."
      : mode === "register"
        ? "Create your account."
        : "Verify your email.";

  if (mode === "otp") {
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
          </div>
        </aside>
        <main className="auth-form-dt">
          <Reveal className="w-full max-w-[430px]">
            <Brand />
            <div className="eyebrow mt-10">Verification</div>
            <h1 className="display-dt mt-3 text-6xl">{title}</h1>
            <p className="mt-4 text-sm leading-7 muted-dt">
              Enter the six-digit code we sent to{" "}
              <strong style={{ color: "var(--text)" }}>{email || "your email"}</strong>.
            </p>
            <div className="mt-8 grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }, (_, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={otpCode[i] || ""}
                  onChange={(e) => onOtpChange(i, e.target.value)}
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-label={`OTP digit ${i + 1}`}
                  className="h-14 rounded-xl border border-dt bg-transparent text-center text-lg outline-none focus:border-gold-400"
                />
              ))}
            </div>
            {otpErr && <p className="mt-3" style={{ color: "#b3261e", fontSize: 13 }}>{otpErr}</p>}
            <button
              onClick={verifyOtp}
              disabled={otpBusy || otpCode.join("").length < 6}
              className="btn-gold-dt mt-6 w-full disabled:opacity-50"
            >
              {otpBusy ? "Verifying…" : "Verify email"} <Check size={15} />
            </button>
            <button
              onClick={startOtp}
              className="mt-3 w-full text-xs muted-dt underline"
            >
              Resend code
            </button>
          </Reveal>
        </main>
      </section>
    );
  }

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
            {mode === "login" ? "My account" : "New devotee"}
          </div>
          <h1 className="display-dt mt-3 text-6xl">{title}</h1>
          <p className="mt-4 max-w-md text-sm leading-7 muted-dt">
            Use your email to access your bookings and blessings. New here? Create an account with your name and email.
          </p>

          {/* Form fields */}
          <div className="mt-7 grid gap-4">
            {mode === "register" && (
              <Field
                label="Full name"
                placeholder="Aarav Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Field
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Field
              label="Password"
              placeholder={mode === "register" ? "Create password (6+ characters)" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            {mode === "register" && (
              <Field
                label="Mobile (optional)"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
          </div>

          <label className="mt-5 flex items-start gap-3 text-xs leading-5 muted-dt">
            <input type="checkbox" defaultChecked className="mt-1 accent-gold-500" />I agree to
            the Terms & Privacy Policy.
          </label>

          {emailErr && <p className="mt-3" style={{ color: "#b3261e", fontSize: 13 }}>{emailErr}</p>}

          <form onSubmit={goEmail} className="mt-6 grid gap-3">
            <button
              type="submit"
              disabled={emailBusy}
              className="btn-gold-dt w-full disabled:opacity-50"
            >
              {emailBusy
                ? "Please wait…"
                : mode === "register"
                  ? "Create account"
                  : "Sign in"}
              {" "}<ArrowRight size={14} />
            </button>
          </form>

          {/* Email OTP alternative */}
          {mode === "login" && (
            <button
              onClick={startOtp}
              disabled={otpBusy}
              className="mt-3 w-full text-xs muted-dt underline disabled:opacity-50"
            >
              {otpBusy ? "Sending code…" : "Sign in with email OTP instead"}
            </button>
          )}

          {configured && (
            <>
              <div className="mt-6 text-center text-xs muted-dt">or continue with</div>
              <button onClick={goGoogle} className="btn-ghost-dt mt-2 w-full">
                <GoogleIcon />
                Continue with Google
              </button>
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
        </Reveal>
      </main>
    </section>
  );
}
