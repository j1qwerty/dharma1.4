import { useEffect, useRef, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../lib/firebase";

/* PhoneLogin — reusable Firebase phone-OTP form (invisible reCAPTCHA).
 * Props: onDone() after successful sign-in, compact (bool) for tighter layout. */
let seq = 0;

export default function PhoneLogin({ onDone, compact = false }) {
  const [step, setStep] = useState("phone");
  const [prefix, setPrefix] = useState("+91");
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const verifierRef = useRef(null);
  const boxRef = useRef(null);
  const idRef = useRef(`dt-recaptcha-${++seq}`);

  useEffect(() => () => { try { verifierRef.current?.clear(); } catch {} verifierRef.current = null; }, []);

  const full = `${prefix.trim()}${number.replace(/\D/g, "")}`;

  const send = async (e) => {
    e?.preventDefault();
    if (!auth) { setError("Firebase not configured."); return; }
    if (number.replace(/\D/g, "").length < 6) { setError("Enter a valid mobile number."); return; }
    setError(null); setBusy(true);
    try {
      try { verifierRef.current?.clear(); } catch {}
      verifierRef.current = new RecaptchaVerifier(auth, idRef.current, { size: "invisible" });
      const conf = await signInWithPhoneNumber(auth, full, verifierRef.current);
      setConfirmation(conf);
      setStep("code");
    } catch (err) {
      setError(friendly(err));
      try { verifierRef.current?.clear(); } catch {}
      verifierRef.current = null;
    }
    setBusy(false);
  };

  const verify = async (e) => {
    e?.preventDefault();
    if (!confirmation || code.trim().length < 4) { setError("Enter the 6-digit code."); return; }
    setError(null); setBusy(true);
    try {
      await confirmation.confirm(code.trim());
      onDone?.();
    } catch (err) { setError(friendly(err)); }
    setBusy(false);
  };

  return (
    <div className={compact ? "" : "mt-2"}>
      <div id={idRef.current} ref={boxRef} />
      {step === "phone" ? (
        <form onSubmit={send} className="grid gap-3">
          <div className="flex gap-2">
            <input value={prefix} onChange={(e) => setPrefix(e.target.value)} aria-label="Country code"
              className="h-11 w-20 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none" />
            <input value={number} onChange={(e) => setNumber(e.target.value)} inputMode="tel"
              placeholder="98765 43210" aria-label="Mobile number"
              className="h-11 min-w-0 flex-1 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none" />
          </div>
          {error && <p style={{ color: "#b3261e", fontSize: 13 }}>{error}</p>}
          <button type="submit" disabled={busy} className="btn-ghost-dt w-full">
            {busy ? "Sending…" : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="grid gap-3">
          <p className="text-xs muted-dt">Code sent to {full}. <button type="button" className="underline" onClick={() => { setStep("phone"); setCode(""); }}>Change number</button></p>
          <input value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" maxLength={6}
            placeholder="6-digit code" aria-label="OTP code"
            className="h-12 rounded-xl border border-dt bg-transparent text-center text-lg tracking-[.3em] outline-none" />
          {error && <p style={{ color: "#b3261e", fontSize: 13 }}>{error}</p>}
          <button type="submit" disabled={busy} className="btn-gold-dt w-full">
            {busy ? "Verifying…" : "Verify & continue"}
          </button>
          <button type="button" disabled={busy} className="text-xs muted-dt underline" onClick={send}>Resend code</button>
        </form>
      )}
    </div>
  );
}

function friendly(err) {
  const code = err?.code || "";
  if (code.includes("invalid-phone-number")) return "That number looks invalid — include country code.";
  if (code.includes("too-many-requests")) return "Too many attempts — try again in a few minutes.";
  if (code.includes("invalid-verification-code")) return "Wrong code — check the SMS and retry.";
  if (code.includes("code-expired")) return "Code expired — resend a fresh one.";
  if (code.includes("captcha") || code.includes("recaptcha")) return "Verification check failed — reload and retry.";
  if (code.includes("billing") || code.includes("project-not-allowed")) return "SMS is blocked on this project (billing/quota) — contact support.";
  return err?.message || "Something went wrong — retry.";
}
