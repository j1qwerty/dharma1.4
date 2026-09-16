import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigured } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import { useSiteSettings } from "../lib/settings";

/* Admin → Settings: feature flags stored in site_settings/global.
 * phoneAuth: { customer: bool (for /auth/*), admin: bool (for /admin/login) }
 * Defaults to hidden (false) when the doc/fields don't exist. */

export default function AdminSettings() {
  const { user, logout } = useAuth();
  const { settings, loading } = useSiteSettings();
  const [customer, setCustomer] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    if (settings) {
      setCustomer(Boolean(settings.phoneAuth?.customer));
      setAdmin(Boolean(settings.phoneAuth?.admin));
    }
  }, [settings]);

  const save = async () => {
    if (!db) return;
    setSaving(true); setSaved(null);
    try {
      await setDoc(doc(db, "site_settings", "global"), {
        phoneAuth: { customer, admin },
        updatedAt: serverTimestamp(),
        updatedBy: user?.email || user?.uid || null,
      }, { merge: true });
      setSaved("Saved — changes apply on next page load.");
    } catch (e) { setSaved(`Save failed: ${e.message}`); }
    setSaving(false);
  };

  return (
    <section style={{ maxWidth: 720, margin: "6vh auto", padding: 24 }}>
      <Link to="/admin" className="text-xs muted-dt underline">← Dashboard</Link>
      <h1 className="display-dt" style={{ fontSize: 44, marginTop: 8 }}>Settings</h1>
      <p className="text-sm muted-dt">Signed in as {user?.email} · <button className="underline" onClick={logout}>Sign out</button></p>

      {!firebaseConfigured && <p className="text-sm mt-4">Firebase not configured.</p>}
      {loading && <p className="text-sm mt-4">Loading…</p>}
      {!loading && (
        <div className="panel-dt p-6 mt-6 grid gap-5">
          <h2 className="text-2xl">Phone (mobile OTP) login</h2>
          <Toggle label="Customer login (/auth/login, /auth/register)"
            desc="Show the mobile OTP option to devotees. Each OTP costs ~$0.01 SMS (Blaze billing)."
            value={customer} onChange={setCustomer} />
          <Toggle label="Admin login (/admin/login)"
            desc="Show the mobile OTP option on the admin login page."
            value={admin} onChange={setAdmin} />
          {saved && <p className="text-xs muted-dt">{saved}</p>}
          <div>
            <button className="btn-gold-dt" disabled={saving} onClick={save}>
              {saving ? "Saving…" : "Save settings"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Toggle({ label, desc, value, onChange }) {
  return (
    <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-gold-500" style={{ width: 18, height: 18 }} />
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs muted-dt mt-1">{desc}</span>
        <span className="block text-[11px] mt-1" style={{ color: value ? "#1e7e34" : "#999" }}>
          {value ? "Enabled" : "Disabled (hidden)"}
        </span>
      </span>
    </label>
  );
}

