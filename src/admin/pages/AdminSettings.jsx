import { useEffect, useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigured } from "../../lib/firebase";
import { useSiteSettings } from "../../lib/settings";
import { Field, TextArea, TextInput, Toggle } from "../components/ui";

/* Site-wide settings (site_settings/global) — admin-writable, publicly readable.
 * phoneAuth: { customer, admin } · whatsappNumber · announcement { enabled, text, textHi } */

export default function AdminSettings() {
  const { settings, loading } = useSiteSettings();
  const [customer, setCustomer] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [annEnabled, setAnnEnabled] = useState(false);
  const [annText, setAnnText] = useState("");
  const [annTextHi, setAnnTextHi] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    if (settings) {
      setCustomer(Boolean(settings.phoneAuth?.customer));
      setAdmin(Boolean(settings.phoneAuth?.admin));
      setWhatsapp(settings.whatsappNumber || "");
      setAnnEnabled(Boolean(settings.announcement?.enabled));
      setAnnText(settings.announcement?.text || "");
      setAnnTextHi(settings.announcement?.textHi || "");
    }
  }, [settings]);

  const save = async () => {
    if (!db) return;
    setSaving(true);
    setSaved(null);
    try {
      await setDoc(doc(db, "site_settings", "global"), {
        phoneAuth: { customer, admin },
        whatsappNumber: whatsapp.trim() || null,
        announcement: { enabled: annEnabled, text: annText || null, textHi: annTextHi || null },
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setSaved("Saved — changes apply on next page load.");
    } catch (e) {
      setSaved(`Save failed: ${e.message}`);
    }
    setSaving(false);
  };

  return (
    <section>
      <div className="eyebrow">CMS · settings</div>
      <h1 className="display-dt" style={{ fontSize: 38, marginTop: 8 }}>Settings</h1>
      <p className="text-sm muted-dt mt-2">Site-wide flags — login surfaces, WhatsApp number, announcement bar.</p>

      {!firebaseConfigured && <p className="text-sm mt-4">Firebase not configured.</p>}
      {loading && <p className="text-sm mt-4">Loading current values…</p>}
      {!loading && (
        <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
          <div className="panel-dt p-6 grid gap-5">
            <h2 className="text-2xl">Phone (mobile OTP) login</h2>
            <Toggle
              label="Customer login (/auth/login, /auth/register)"
              desc="Show the mobile OTP option to devotees. Each OTP costs ~$0.01 SMS (Blaze billing)."
              value={customer}
              onChange={setCustomer}
            />
            <Toggle
              label="Admin login (/admin/login)"
              desc="Show the mobile OTP option on the admin login page."
              value={admin}
              onChange={setAdmin}
            />
          </div>

          <div className="panel-dt p-6 grid gap-4">
            <h2 className="text-2xl">WhatsApp</h2>
            <Field label="WhatsApp number (digits only, no +)" hint="Used for booking + inquiry wa.me links. Current code default: 9958728666.">
              <TextInput value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="9958728666" />
            </Field>
          </div>

          <div className="panel-dt p-6 grid gap-4">
            <h2 className="text-2xl">Announcement bar</h2>
            <Toggle
              label="Show announcement bar on homepage"
              desc="Thin strip above the hero (homepage_sections/announcementBar reads this)."
              value={annEnabled}
              onChange={setAnnEnabled}
            />
            <Field label="Announcement (EN)">
              <TextInput value={annText} onChange={(e) => setAnnText(e.target.value)} placeholder="Pitru Paksha bookings open…" />
            </Field>
            <Field label="Announcement (HI)">
              <TextArea rows={2} value={annTextHi} onChange={(e) => setAnnTextHi(e.target.value)} placeholder="पितृ पक्ष बुकिंग खुली है…" />
            </Field>
          </div>

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
